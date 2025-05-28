LavaPack.loadBundle(
  [
    [
      7230,
      {
        '../../../../../components/component-library': 6402,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../contexts/i18n': 6832,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/gas': 6902,
        '../../../../../helpers/utils/util': 6921,
        './status-slider': 7231,
        './tooltips': 7233,
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
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('../../../../../helpers/constants/design-system'),
                  s = e('../../../../../helpers/utils/util'),
                  i = e('../../../../../helpers/utils/gas'),
                  c = e('../../../../../contexts/i18n'),
                  l = e('../../../../../contexts/gasFee'),
                  u = e('../../../../../components/component-library'),
                  d = e('./tooltips'),
                  m = (a = e('./status-slider')) && a.__esModule ? a : { default: a };
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, o.useContext)(c.I18nContext),
                    { gasFeeEstimates: t } = (0, l.useGasFeeContext)(),
                    n = (0, i.formatGasFeeOrFeeRange)(null == t ? void 0 : t.estimatedBaseFee, {
                      precision: 0,
                    }),
                    a = (0, i.formatGasFeeOrFeeRange)(
                      null == t ? void 0 : t.latestPriorityFeeRange,
                      { precision: [1, 0] }
                    ),
                    f = null == t ? void 0 : t.networkCongestion;
                  return o.default.createElement(
                    'div',
                    { className: 'network-statistics' },
                    o.default.createElement(
                      u.Text,
                      {
                        color: r.TextColor.textAlternative,
                        fontWeight: r.FontWeight.Bold,
                        marginTop: 3,
                        marginBottom: 3,
                        variant: r.TextVariant.bodyXs,
                        as: 'h6',
                      },
                      e('networkStatus')
                    ),
                    o.default.createElement(
                      'div',
                      { className: 'network-statistics__info' },
                      (0, s.isNullish)(n)
                        ? null
                        : o.default.createElement(
                            'div',
                            {
                              className: 'network-statistics__field',
                              'data-testid': 'formatted-latest-base-fee',
                            },
                            o.default.createElement(
                              d.BaseFeeTooltip,
                              null,
                              o.default.createElement(
                                'span',
                                { className: 'network-statistics__field-data' },
                                n
                              ),
                              o.default.createElement(
                                'span',
                                { className: 'network-statistics__field-label' },
                                e('baseFee')
                              )
                            )
                          ),
                      (0, s.isNullish)(a)
                        ? null
                        : o.default.createElement(
                            'div',
                            {
                              className: 'network-statistics__field',
                              'data-testid': 'formatted-latest-priority-fee-range',
                            },
                            o.default.createElement(
                              d.PriorityFeeTooltip,
                              null,
                              o.default.createElement(
                                'span',
                                { className: 'network-statistics__field-data' },
                                a
                              ),
                              o.default.createElement(
                                'span',
                                { className: 'network-statistics__field-label' },
                                e('priorityFee')
                              )
                            )
                          ),
                      (0, s.isNullish)(f)
                        ? null
                        : o.default.createElement(
                            'div',
                            { className: 'network-statistics__field' },
                            o.default.createElement(m.default, null)
                          )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/network-statistics/network-statistics.js',
      },
    ],
    [
      7231,
      { './status-slider': 7232 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./status-slider')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/network-statistics/status-slider/index.js',
      },
    ],
    [
      7232,
      {
        '../../../../../../../shared/constants/gas': 5795,
        '../../../../../../contexts/gasFee': 6831,
        '../../../../../../hooks/useI18nContext': 6985,
        '../tooltips': 7233,
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
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('../../../../../../../shared/constants/gas'),
                  s = e('../../../../../../contexts/gasFee'),
                  i = e('../../../../../../hooks/useI18nContext'),
                  c = e('../tooltips');
                const l = [
                  '#037DD6',
                  '#1876C8',
                  '#2D70BA',
                  '#4369AB',
                  '#57629E',
                  '#6A5D92',
                  '#805683',
                  '#9A4D71',
                  '#B44561',
                  '#C54055',
                  '#D73A49',
                ];
                n.default = () => {
                  const e = (0, i.useI18nContext)(),
                    { gasFeeEstimates: t } = (0, s.useGasFeeContext)(),
                    n = (e => {
                      const t = e ?? 0.5,
                        n = Math.round(10 * t),
                        a = l[n],
                        o = 10 * n;
                      return t >= r.NetworkCongestionThresholds.busy
                        ? {
                            statusLabel: 'busy',
                            tooltipLabel: 'highLowercase',
                            color: a,
                            sliderTickValue: o,
                          }
                        : t >= r.NetworkCongestionThresholds.stable
                          ? {
                              statusLabel: 'stable',
                              tooltipLabel: 'stableLowercase',
                              color: a,
                              sliderTickValue: o,
                            }
                          : {
                              statusLabel: 'notBusy',
                              tooltipLabel: 'lowLowercase',
                              color: a,
                              sliderTickValue: o,
                            };
                    })(t.networkCongestion);
                  return o.default.createElement(
                    c.NetworkStabilityTooltip,
                    { color: n.color, tooltipLabel: n.tooltipLabel },
                    o.default.createElement(
                      'div',
                      { className: 'status-slider' },
                      o.default.createElement(
                        'div',
                        { className: 'status-slider__arrow-container' },
                        o.default.createElement(
                          'div',
                          {
                            className: 'status-slider__arrow-border',
                            style: { marginLeft: `${n.sliderTickValue}%` },
                            'data-testid': 'status-slider-arrow-border',
                          },
                          o.default.createElement('div', {
                            className: 'status-slider__arrow',
                            style: { borderTopColor: n.color },
                            'data-testid': 'status-slider-arrow',
                          })
                        )
                      ),
                      o.default.createElement('div', { className: 'status-slider__line' }),
                      o.default.createElement(
                        'div',
                        {
                          className: 'status-slider__label',
                          style: { color: n.color },
                          'data-testid': 'status-slider-label',
                        },
                        e(n.statusLabel)
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/network-statistics/status-slider/status-slider.js',
      },
    ],
    [
      7233,
      {
        '../../../../../components/ui/box': 6703,
        '../../../../../components/ui/tooltip': 6818,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
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
                  (n.PriorityFeeTooltip = n.NetworkStabilityTooltip = n.BaseFeeTooltip = void 0);
                var a = l(e('react')),
                  o = l(e('prop-types')),
                  r = e('../../../../../hooks/useI18nContext'),
                  s = l(e('../../../../../components/ui/box')),
                  i = l(e('../../../../../components/ui/tooltip')),
                  c = e('../../../../../helpers/constants/design-system');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({ children: e, html: t, title: n }) =>
                  a.default.createElement(
                    i.default,
                    { position: 'top', html: t, title: n },
                    a.default.createElement(
                      s.default,
                      { display: c.DISPLAY.FLEX, flexDirection: c.FLEX_DIRECTION.COLUMN },
                      e
                    )
                  );
                u.propTypes = {
                  children: o.default.node.isRequired,
                  html: o.default.node,
                  title: o.default.string,
                };
                const d = ({ children: e }) => {
                  const t = (0, r.useI18nContext)();
                  return a.default.createElement(
                    u,
                    {
                      html: t('networkStatusBaseFeeTooltip', [
                        a.default.createElement(
                          'strong',
                          {
                            key: 'base_fee_medium_estimate',
                            className: 'network-status__tooltip-label',
                          },
                          t('medium')
                        ),
                        a.default.createElement(
                          'strong',
                          {
                            key: 'base_fee_high_estimate',
                            className: 'network-status__tooltip-label',
                          },
                          t('high')
                        ),
                      ]),
                    },
                    e
                  );
                };
                (n.BaseFeeTooltip = d), (d.propTypes = { children: o.default.node.isRequired });
                const m = ({ children: e }) => {
                  const t = (0, r.useI18nContext)();
                  return a.default.createElement(
                    u,
                    { title: t('networkStatusPriorityFeeTooltip') },
                    e
                  );
                };
                (n.PriorityFeeTooltip = m), (m.propTypes = { children: o.default.node.isRequired });
                const f = ({ children: e, color: t, tooltipLabel: n }) => {
                  const o = (0, r.useI18nContext)();
                  return a.default.createElement(
                    u,
                    {
                      html: o('networkStatusStabilityFeeTooltip', [
                        a.default.createElement(
                          'strong',
                          {
                            key: 'network-status__tooltip',
                            className: 'network-status__tooltip-label',
                            style: { color: t },
                          },
                          o(n)
                        ),
                      ]),
                    },
                    e
                  );
                };
                (n.NetworkStabilityTooltip = f),
                  (f.propTypes = {
                    children: o.default.node.isRequired,
                    color: o.default.string.isRequired,
                    tooltipLabel: o.default.string.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-fee-popover/network-statistics/tooltips.js',
      },
    ],
    [
      7234,
      {
        '../../../../../shared/constants/gas': 5795,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../shared/modules/transaction.utils': 5880,
        '../../../../components/component-library': 6402,
        '../../../../components/component-library/modal-content/deprecated': 6412,
        '../../../../components/component-library/modal-header/deprecated': 6421,
        '../../../../components/ui/loading-heartbeat': 6764,
        '../../../../contexts/i18n': 6832,
        '../../../../store/actions': 7619,
        '../../hooks/useGasFeeInputs': 7337,
        '../../hooks/useIncrementedGasFees': 7340,
        '../edit-gas-display': 7220,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = x);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = T(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = y(e('prop-types')),
                  r = e('react-redux'),
                  s = e('../../hooks/useGasFeeInputs'),
                  i = e('../../../../../shared/modules/transaction.utils'),
                  c = e('../../../../../shared/constants/gas'),
                  l = e('../../../../components/component-library'),
                  u = e('../../../../components/component-library/modal-content/deprecated'),
                  d = e('../../../../components/component-library/modal-header/deprecated'),
                  m = y(e('../edit-gas-display')),
                  f = e('../../../../contexts/i18n'),
                  p = e('../../../../store/actions'),
                  h = y(e('../../../../components/ui/loading-heartbeat')),
                  g = e('../../hooks/useIncrementedGasFees'),
                  v = e('../../../../../shared/modules/conversion.utils');
                function y(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function T(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (T = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function k() {
                  return (
                    (k = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    k.apply(null, arguments)
                  );
                }
                function x({
                  popoverTitle: e = '',
                  confirmButtonText: t = '',
                  editGasDisplayProps: n = {},
                  transaction: o,
                  mode: y,
                  onClose: T,
                  minimumGasLimit: x = c.GAS_LIMITS.SIMPLE,
                }) {
                  const w = (0, a.useContext)(f.I18nContext),
                    E = (0, r.useDispatch)(),
                    [_, b] = (0, a.useState)(!1),
                    C = (0, v.hexToDecimal)(x),
                    A = (0, g.useIncrementedGasFees)(o);
                  let S = o;
                  (y !== c.EditGasModes.speedUp && y !== c.EditGasModes.cancel) ||
                    (S = {
                      ...o,
                      userFeeLevel: c.CUSTOM_GAS_ESTIMATE,
                      txParams: { ...o.txParams, ...A },
                    });
                  const {
                      estimatedMinimumNative: N,
                      gasPrice: P,
                      setGasPrice: M,
                      gasLimit: I,
                      setGasLimit: O,
                      properGasLimit: R,
                      estimateToUse: D,
                      hasGasErrors: F,
                      gasErrors: B,
                      onManualChange: L,
                      balanceError: j,
                    } = (0, s.useGasFeeInputs)(c.GasRecommendations.medium, S, x, y),
                    G = D === c.CUSTOM_GAS_ESTIMATE || (0, i.txParamsAreDappSuggested)(S),
                    $ = (0, a.useCallback)(() => {
                      T ? T() : E((0, p.hideModal)());
                    }, [T, E]),
                    W = (0, a.useCallback)(async () => {
                      (S && y) || $();
                      const e = {
                          gas: (0, v.decimalToHex)(I),
                          gasLimit: (0, v.decimalToHex)(I),
                          estimateUsed: D,
                          gasPrice: (0, v.decGWEIToHexWEI)(P),
                        },
                        t = { ...S.txParams },
                        n = {
                          ...S,
                          userEditedGasLimit: I !== Number(o.originalGasEstimate),
                          userFeeLevel: D || c.CUSTOM_GAS_ESTIMATE,
                          txParams: { ...t, ...e },
                        };
                      switch (y) {
                        case c.EditGasModes.cancel:
                          E((0, p.createCancelTransaction)(S.id, e));
                          break;
                        case c.EditGasModes.speedUp:
                          E((0, p.createSpeedUpTransaction)(S.id, e));
                          break;
                        case c.EditGasModes.modifyInPlace:
                          (e.userEditedGasLimit = n.userEditedGasLimit),
                            (e.userFeeLevel = n.userFeeLevel),
                            E((0, p.showLoadingIndication)()),
                            await E((0, p.updateTransactionGasFees)(n.id, e)),
                            E((0, p.hideLoadingIndication)());
                      }
                      $();
                    }, [S, y, E, $, I, P, o.originalGasEstimate, D]);
                  let U = w('editGasTitle');
                  e
                    ? (U = e)
                    : y === c.EditGasModes.speedUp
                      ? (U = w('speedUpPopoverTitle'))
                      : y === c.EditGasModes.cancel && (U = w('cancelPopoverTitle'));
                  const H = t || w('save');
                  return a.default.createElement(
                    l.Modal,
                    { isOpen: !0, onClose: $ },
                    a.default.createElement(l.ModalOverlay, null),
                    a.default.createElement(
                      u.ModalContent,
                      { autoFocus: !1, className: 'edit-gas-popover' },
                      a.default.createElement(d.ModalHeader, { onClose: $, marginBottom: 4 }, U),
                      a.default.createElement(
                        'div',
                        { className: 'edit-gas-popover__edit-gas-display' },
                        a.default.createElement(h.default, null),
                        a.default.createElement(
                          m.default,
                          k(
                            {
                              dappSuggestedGasFeeAcknowledged: _,
                              setDappSuggestedGasFeeAcknowledged: b,
                              estimatedMinimumNative: N,
                              gasPrice: P,
                              setGasPrice: M,
                              gasLimit: I,
                              setGasLimit: O,
                              properGasLimit: R,
                              mode: y,
                              transaction: S,
                              onManualChange: L,
                              minimumGasLimit: C,
                              balanceError: j,
                              txParamsHaveBeenCustomized: G,
                              gasErrors: B,
                            },
                            n
                          )
                        )
                      ),
                      a.default.createElement(
                        l.Button,
                        {
                          block: !0,
                          variant: l.ButtonVariant.Primary,
                          size: l.ButtonSize.LG,
                          marginTop: 4,
                          onClick: W,
                          disabled: F || j || !G,
                        },
                        H
                      )
                    )
                  );
                }
                x.propTypes = {
                  popoverTitle: o.default.string,
                  editGasDisplayProps: o.default.object,
                  confirmButtonText: o.default.string,
                  onClose: o.default.func,
                  transaction: o.default.object,
                  mode: o.default.oneOf(Object.values(c.EditGasModes)),
                  minimumGasLimit: o.default.string,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/edit-gas-popover/edit-gas-popover.component.js',
      },
    ],
    [
      7235,
      { './edit-gas-popover.component': 7234 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./edit-gas-popover.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/edit-gas-popover/index.js' },
    ],
    [
      7236,
      {
        '../../../../../shared/constants/gas': 5795,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/app/user-preferenced-currency-display': 6317,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/loading-heartbeat': 6764,
        '../../../../components/ui/tooltip': 6818,
        '../../../../contexts/gasFee': 6831,
        '../../../../ducks/send': 6865,
        '../../../../helpers/constants/common': 6870,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../hooks/useDraftTransactionWithTxParams': 7333,
        '../edit-gas-fee-icon/edit-gas-fee-icon': 7221,
        '../gas-timing/gas-timing.component': 7238,
        '../transaction-detail-item/transaction-detail-item.component': 7258,
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
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = E(e('prop-types')),
                  r = E(e('classnames')),
                  s = e('react-redux'),
                  i = e('../../../../components/component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  l = e('../../../../helpers/constants/common'),
                  u = e('../../../../../shared/constants/gas'),
                  d = e('../../../../selectors'),
                  m = e('../../../../ducks/send'),
                  f = e('../../../../../shared/modules/conversion.utils'),
                  p = e('../../hooks/useDraftTransactionWithTxParams'),
                  h = e('../../../../contexts/gasFee'),
                  g = e('../../../../hooks/useI18nContext'),
                  v = E(e('../../../../components/ui/loading-heartbeat')),
                  y = E(e('../edit-gas-fee-icon/edit-gas-fee-icon')),
                  T = E(e('../gas-timing/gas-timing.component')),
                  k = E(e('../transaction-detail-item/transaction-detail-item.component')),
                  x = E(e('../../../../components/app/user-preferenced-currency-display')),
                  w = E(e('../../../../components/ui/tooltip'));
                function E(e) {
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
                const b = ({ 'data-testid': e, userAcknowledgedGasMissing: t = !1 }) => {
                  var n, o;
                  const E = (0, g.useI18nContext)(),
                    _ = (0, s.useSelector)(d.getShouldShowFiat),
                    b = (0, s.useSelector)(d.getTxData),
                    { layer1GasFee: C } = b,
                    A = (0, s.useSelector)(m.getCurrentDraftTransaction),
                    S = (0, p.useDraftTransactionWithTxParams)(),
                    { hexMinimumTransactionFee: N, hexMaximumTransactionFee: P } = (0,
                    s.useSelector)(e => (0, d.transactionFeeSelector)(e, S)),
                    {
                      estimateUsed: M,
                      hasSimulationError: I,
                      isNetworkBusy: O,
                      maximumCostInHexWei: R,
                      minimumCostInHexWei: D,
                      maxPriorityFeePerGas: F,
                      maxFeePerGas: B,
                      supportsEIP1559: L,
                    } = (0, h.useGasFeeContext)(),
                    j = (0, a.useMemo)(() => (C ? (0, f.sumHexes)(D, C) : D), [D, C]),
                    G = (0, a.useMemo)(() => (C ? (0, f.sumHexes)(R, C) : R), [R, C]);
                  if (I && !t) return null;
                  const $ = (
                      F ??
                      (0, f.hexWEIToDecGWEI)(
                        (null === (n = S.txParams) || void 0 === n
                          ? void 0
                          : n.maxPriorityFeePerGas) ?? '0x0'
                      )
                    ).toString(),
                    W = (
                      B ??
                      (0, f.hexWEIToDecGWEI)(
                        (null === (o = S.txParams) || void 0 === o ? void 0 : o.maxFeePerGas) ??
                          '0x0'
                      )
                    ).toString();
                  return a.default.createElement(k.default, {
                    key: 'gas-details-item',
                    'data-testid': e,
                    detailTitle:
                      L && O
                        ? a.default.createElement(
                            a.default.Fragment,
                            null,
                            E('estimatedFee'),
                            a.default.createElement(
                              w.default,
                              {
                                wrapperClassName: 'gas-details-item__dangerTooltip',
                                interactive: !0,
                                position: 'top',
                                html: E('networkIsBusy'),
                              },
                              a.default.createElement(i.Icon, {
                                'data-testid': 'network-busy-tooltip',
                                name: i.IconName.Danger,
                                size: i.IconSize.Sm,
                                color: c.IconColor.errorDefault,
                              })
                            )
                          )
                        : a.default.createElement(a.default.Fragment, null, E('estimatedFee')),
                    detailText:
                      0 === Object.keys(A).length &&
                      a.default.createElement(
                        'div',
                        {
                          className: 'gas-details-item__currency-container',
                          style: { width: '100%' },
                        },
                        a.default.createElement(v.default, { estimateUsed: M }),
                        a.default.createElement(y.default, { userAcknowledgedGasMissing: t }),
                        _ &&
                          a.default.createElement(x.default, {
                            paddingInlineStart: 1,
                            suffixProps: { variant: c.TextVariant.bodyMdBold },
                            textProps: { variant: c.TextVariant.bodyMdBold },
                            type: l.SECONDARY,
                            value: j,
                            hideLabel: !0,
                          })
                      ),
                    detailTotal: a.default.createElement(
                      'div',
                      { className: 'gas-details-item__currency-container' },
                      a.default.createElement(v.default, { estimateUsed: M }),
                      a.default.createElement(x.default, {
                        suffixProps: {
                          variant: c.TextVariant.bodyMd,
                          color: c.TextColor.textAlternative,
                        },
                        textProps: {
                          variant: c.TextVariant.bodyMd,
                          color: c.TextColor.textAlternative,
                        },
                        type: l.PRIMARY,
                        value: j || N,
                      })
                    ),
                    hasDetailTextInSeparateRow: !0,
                    subText: a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        i.Box,
                        {
                          key: 'editGasSubTextFeeLabel',
                          display: 'inline-flex',
                          className: (0, r.default)('gas-details-item__gasfee-label', {
                            'gas-details-item__gas-fee-warning':
                              M === u.PriorityLevels.high ||
                              M === u.PriorityLevels.dappSuggestedHigh,
                          }),
                        },
                        a.default.createElement(v.default, { estimateUsed: M }),
                        a.default.createElement(
                          i.Box,
                          null,
                          a.default.createElement(
                            i.Text,
                            {
                              color: c.TextColor.textAlternative,
                              variant: c.TextVariant.bodySmMedium,
                            },
                            (M === u.PriorityLevels.high ||
                              M === u.PriorityLevels.dappSuggestedHigh) &&
                              '⚠ ',
                            E('editGasSubTextFeeLabel')
                          )
                        ),
                        a.default.createElement(
                          i.Box,
                          {
                            key: 'editGasSubTextFeeValue',
                            className: 'gas-details-item__currency-container',
                            paddingInlineStart: 1,
                          },
                          a.default.createElement(v.default, { estimateUsed: M }),
                          a.default.createElement(x.default, {
                            key: 'editGasSubTextFeeAmount',
                            suffixProps: {
                              color: c.TextColor.textAlternative,
                              variant: c.TextVariant.bodySm,
                            },
                            textProps: {
                              color: c.TextColor.textAlternative,
                              variant: c.TextVariant.bodySm,
                            },
                            type: l.PRIMARY,
                            value: G || P,
                          })
                        )
                      )
                    ),
                    subTitle: a.default.createElement(T.default, {
                      maxPriorityFeePerGas: $,
                      maxFeePerGas: W,
                    }),
                  });
                };
                b.propTypes = {
                  'data-testid': o.default.string,
                  userAcknowledgedGasMissing: o.default.bool,
                };
                n.default = b;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/gas-details-item/gas-details-item.js',
      },
    ],
    [
      7237,
      { './gas-details-item': 7236 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./gas-details-item')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/gas-details-item/index.js' },
    ],
    [
      7238,
      {
        '../../../../../shared/constants/gas': 5795,
        '../../../../components/component-library': 6402,
        '../../../../contexts/gasFee': 6831,
        '../../../../contexts/i18n': 6832,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/gas': 6874,
        '../../../../hooks/usePrevious': 7002,
        '../../../../store/actions': 7619,
        '../../hooks/useDraftTransactionWithTxParams': 7333,
        'bignumber.js': 4030,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = x);
                var a = T(e('bignumber.js')),
                  o = T(e('classnames')),
                  r = T(e('prop-types')),
                  s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  i = e('react-redux'),
                  c = e('../../../../../shared/constants/gas'),
                  l = e('../../../../components/component-library'),
                  u = e('../../../../contexts/gasFee'),
                  d = e('../../../../contexts/i18n'),
                  m = e('../../../../ducks/metamask/metamask'),
                  f = e('../../../../helpers/constants/design-system'),
                  p = e('../../../../helpers/constants/gas'),
                  h = e('../../../../hooks/usePrevious'),
                  g = e('../../../../store/actions'),
                  v = e('../../hooks/useDraftTransactionWithTxParams');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function T(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const k = (e = 1, t) => {
                  const n = Math.ceil(e / 1e3);
                  return n <= 90
                    ? t('gasTimingSecondsShort', [n])
                    : t('gasTimingMinutesShort', [Math.ceil(n / 60)]);
                };
                function x({
                  maxFeePerGas: e = '0',
                  maxPriorityFeePerGas: t = '0',
                  gasWarnings: n,
                }) {
                  const r = (0, i.useSelector)(m.getGasEstimateType),
                    y = (0, i.useSelector)(m.getGasFeeEstimates),
                    T = (0, i.useSelector)(m.getIsGasEstimatesLoading),
                    [x, w] = (0, s.useState)(null),
                    E = (0, s.useContext)(d.I18nContext),
                    { estimateUsed: _ } = (0, u.useGasFeeContext)(),
                    b = (0, v.useDraftTransactionWithTxParams)(),
                    C =
                      (null == y ? void 0 : y.low) &&
                      Number(t) < Number(y.low.suggestedMaxPriorityFeePerGas),
                    A = (0, h.usePrevious)(e),
                    S = (0, h.usePrevious)(t),
                    N = (0, h.usePrevious)(C);
                  if (
                    ((0, s.useEffect)(() => {
                      let n = !0;
                      const o = t,
                        r = e;
                      return (
                        (C || (o && o !== S) || (r && r !== A)) &&
                          (0, g.getGasFeeTimeEstimate)(
                            new a.default(o, 10).toString(10),
                            new a.default(r, 10).toString(10)
                          ).then(a => {
                            e === r && t === o && n && w(a);
                          }),
                        !1 !== C && !0 === N && w(null),
                        () => {
                          n = !1;
                        }
                      );
                    }, [t, e, C, A, S, N]),
                    (null == n ? void 0 : n.maxPriorityFee) ===
                      p.GAS_FORM_ERRORS.MAX_PRIORITY_FEE_TOO_LOW ||
                      (null == n ? void 0 : n.maxFee) === p.GAS_FORM_ERRORS.MAX_FEE_TOO_LOW)
                  )
                    return s.default.createElement(
                      l.Text,
                      {
                        variant: f.TextVariant.bodySm,
                        fontWeight: f.FontWeight.Bold,
                        color: f.TextColor.textAlternative,
                        className: (0, o.default)('gas-timing', 'gas-timing--negative'),
                      },
                      E('editGasTooLow')
                    );
                  if (T || r !== c.GasEstimateTypes.feeMarket) return null;
                  const { low: P = {}, medium: M = {}, high: I = {} } = y,
                    O = _ || b.userFeeLevel || 'medium',
                    R = p.PRIORITY_LEVEL_ICON_MAP[O];
                  let D = `${R} ${E(O)}`,
                    F = '';
                  return (
                    'low' === O && (D = `${R} ${E('gasTimingLow')}`),
                    Number(t) >= Number(M.suggestedMaxPriorityFeePerGas)
                      ? (F =
                          Number(t) < Number(I.suggestedMaxPriorityFeePerGas)
                            ? k(P.maxWaitTimeEstimate, E)
                            : k(I.minWaitTimeEstimate, E))
                      : C
                        ? x &&
                          'unknown' !== x &&
                          'unknown' !== (null == x ? void 0 : x.upperTimeBound)
                          ? (F = k(Number(null == x ? void 0 : x.upperTimeBound), E))
                          : (D = E('editGasTooLow'))
                        : (F = k(P.maxWaitTimeEstimate, E)),
                    s.default.createElement(
                      l.Box,
                      { display: f.Display.Flex, flexWrap: f.FlexWrap.Wrap },
                      D &&
                        s.default.createElement(
                          l.Text,
                          {
                            color: f.TextColor.textAlternative,
                            variant: f.TextVariant.bodyMd,
                            paddingInlineEnd: 1,
                          },
                          D
                        ),
                      F &&
                        s.default.createElement(
                          l.Text,
                          { variant: f.TextVariant.bodyMd, color: f.TextColor.textDefault },
                          s.default.createElement(
                            'span',
                            { 'data-testid': 'gas-timing-time' },
                            '~',
                            F
                          )
                        )
                    )
                  );
                }
                x.propTypes = {
                  maxPriorityFeePerGas: r.default.string,
                  maxFeePerGas: r.default.string,
                  gasWarnings: r.default.object,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/gas-timing/gas-timing.component.js',
      },
    ],
    [
      7239,
      {
        '../../../../../shared/constants/transaction': 5819,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/tooltip': 6818,
        '../../../../ducks/locale/locale': 6859,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        './formatAmount': 7244,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AmountPill = void 0);
                var a = p(e('react')),
                  o = e('react-redux'),
                  r = e('../../../../components/component-library'),
                  s = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../../shared/modules/conversion.utils'),
                  c = e('../../../../../shared/constants/transaction'),
                  l = p(e('../../../../components/ui/tooltip')),
                  u = e('../../../../ducks/locale/locale'),
                  d = e('../../../../helpers/utils/util'),
                  m = e('../../../../hooks/useI18nContext'),
                  f = e('./formatAmount');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.AmountPill = ({
                  asset: e,
                  amount: t,
                  isApproval: n,
                  isAllApproval: p,
                  isUnlimitedApproval: h,
                }) => {
                  const g = (0, m.useI18nContext)(),
                    v = (0, o.useSelector)(u.getIntlLocale),
                    y = (function ({ amount: e, isApproval: t }) {
                      if (t) return s.BackgroundColor.backgroundMuted;
                      return e.isNegative()
                        ? s.BackgroundColor.errorMuted
                        : s.BackgroundColor.successMuted;
                    })({ amount: t, isApproval: n }),
                    T = (function ({ amount: e, isApproval: t }) {
                      if (t) return s.TextColor.textDefault;
                      return e.isNegative()
                        ? s.TextColor.errorAlternative
                        : s.TextColor.successDefault;
                    })({ amount: t, isApproval: n }),
                    k = [],
                    x = [];
                  if (
                    (n || k.push(t.isNegative() ? '-' : '+'),
                    e.standard !== c.TokenStandard.ERC721 && !p)
                  ) {
                    const e = h ? g('unlimited') : (0, f.formatAmount)(v, t.abs()),
                      n = (0, f.formatAmountMaxPrecision)(v, t.abs());
                    k.push(e), x.push(n);
                  }
                  if (e.tokenId) {
                    const t = (0, i.hexToDecimal)(e.tokenId),
                      n = `#${(0, d.shortenString)(t, { truncatedCharLimit: 11, truncatedStartChars: 4, truncatedEndChars: 4, skipCharacterInEnd: !1 })}`,
                      a = `#${t}`;
                    k.push(n), x.push(a);
                  }
                  return (
                    p && (k.push(g('all')), x.push(g('all'))),
                    a.default.createElement(
                      r.Box,
                      {
                        'data-testid': 'simulation-details-amount-pill',
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Row,
                        backgroundColor: y,
                        alignItems: s.AlignItems.center,
                        borderRadius: s.BorderRadius.pill,
                        style: {
                          padding: '0px 8px',
                          flexShrink: 1,
                          flexBasis: 'auto',
                          minWidth: 0,
                        },
                      },
                      a.default.createElement(
                        l.default,
                        {
                          position: 'bottom',
                          title: x.join(' '),
                          wrapperStyle: { minWidth: 0 },
                          theme: 'word-break-all',
                          interactive: !0,
                        },
                        a.default.createElement(
                          r.Text,
                          { ellipsis: !0, variant: s.TextVariant.bodyMd, color: T },
                          k.join(' ')
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
        file: 'ui/pages/confirmations/components/simulation-details/amount-pill.tsx',
      },
    ],
    [
      7240,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../components/app/name': 6109,
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '@metamask/name-controller': 2190,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AssetPill = void 0);
                var a = m(e('react')),
                  o = e('@metamask/name-controller'),
                  r = e('react-redux'),
                  s = e('../../../../components/component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  c = m(e('../../../../components/app/name')),
                  l = e('../../../../../shared/constants/transaction'),
                  u = e('../../../../../shared/modules/selectors/networks'),
                  d = e('../../../../../shared/constants/network');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const f = ({ chainId: e }) => {
                  const t = d.CHAIN_ID_TOKEN_IMAGE_MAP[e],
                    n = (0, r.useSelector)(u.getNetworkConfigurationsByChainId),
                    o = null == n ? void 0 : n[e],
                    { nativeCurrency: c } = o;
                  return a.default.createElement(
                    s.Box,
                    {
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Row,
                      borderRadius: i.BorderRadius.pill,
                      alignItems: i.AlignItems.center,
                      backgroundColor: i.BackgroundColor.backgroundAlternative,
                      gap: 1,
                      style: { padding: '1px 8px 1px 4px' },
                    },
                    a.default.createElement(s.AvatarNetwork, {
                      name: c,
                      size: s.AvatarNetworkSize.Xs,
                      src: t,
                      borderColor: i.BorderColor.borderDefault,
                    }),
                    a.default.createElement(
                      s.Text,
                      { ellipsis: !0, variant: i.TextVariant.bodyMd },
                      c
                    )
                  );
                };
                n.AssetPill = ({ asset: e }) => {
                  const { chainId: t } = e;
                  return a.default.createElement(
                    s.Box,
                    {
                      'data-testid': 'simulation-details-asset-pill',
                      style: { flexShrink: 1, flexBasis: 'auto', minWidth: 0 },
                    },
                    e.standard === l.TokenStandard.none
                      ? a.default.createElement(f, { chainId: t })
                      : a.default.createElement(c.default, {
                          preferContractSymbol: !0,
                          type: o.NameType.ETHEREUM_ADDRESS,
                          value: e.address,
                          variation: t,
                        })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/asset-pill.tsx',
      },
    ],
    [
      7241,
      {
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        './balance-change-row': 7242,
        './fiat-display': 7243,
        './sortBalanceChanges': 7247,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.BalanceChangeList = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('../../../../components/component-library'),
                  r = e('../../../../helpers/constants/design-system'),
                  s = e('./balance-change-row'),
                  i = e('./fiat-display'),
                  c = e('./sortBalanceChanges');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.BalanceChangeList = ({ heading: e, balanceChanges: t, testId: n }) => {
                  const l = (0, a.useMemo)(() => (0, c.sortBalanceChanges)(t), [t]),
                    u = (0, a.useMemo)(() => l.map(e => e.fiatAmount), [l]);
                  if (0 === l.length) return null;
                  const d = l.length > 1;
                  return a.default.createElement(
                    o.Box,
                    null,
                    a.default.createElement(
                      o.Box,
                      {
                        'data-testid': n,
                        display: r.Display.Flex,
                        flexDirection: r.FlexDirection.Column,
                        gap: 3,
                      },
                      l.map((t, n) =>
                        a.default.createElement(s.BalanceChangeRow, {
                          key: n,
                          label: 0 === n ? e : undefined,
                          balanceChange: t,
                          showFiat: !d,
                        })
                      )
                    ),
                    d &&
                      a.default.createElement(
                        o.Box,
                        { display: r.Display.Flex, flexDirection: r.FlexDirection.RowReverse },
                        a.default.createElement(i.TotalFiatDisplay, { fiatAmounts: u })
                      )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/balance-change-list.tsx',
      },
    ],
    [
      7242,
      {
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        './amount-pill': 7239,
        './asset-pill': 7240,
        './fiat-display': 7243,
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
                  (n.BalanceChangeRow = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('@metamask/snaps-sdk/jsx'),
                  s = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../components/component-library'),
                  c = e('../../../../hooks/useI18nContext'),
                  l = e('./asset-pill'),
                  u = e('./amount-pill'),
                  d = e('./fiat-display');
                n.BalanceChangeRow = ({ label: e, showFiat: t, balanceChange: n }) => {
                  const a = (0, c.useI18nContext)(),
                    {
                      asset: m,
                      amount: f,
                      fiatAmount: p,
                      isApproval: h,
                      isAllApproval: g,
                      isUnlimitedApproval: v,
                      onEdit: y,
                    } = n;
                  return o.default.createElement(
                    i.Box,
                    {
                      'data-testid': 'simulation-details-balance-change-row',
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      alignItems: s.AlignItems.flexStart,
                      gap: 1,
                      flexWrap: s.FlexWrap.Wrap,
                    },
                    e &&
                      o.default.createElement(
                        i.Text,
                        { style: { whiteSpace: 'nowrap' }, variant: s.TextVariant.bodyMd },
                        e
                      ),
                    o.default.createElement(
                      i.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Column,
                        gap: 1,
                        marginLeft: 'auto',
                        style: { minWidth: 0 },
                      },
                      o.default.createElement(
                        i.Box,
                        { display: s.Display.Flex, flexDirection: s.FlexDirection.Row, gap: 1 },
                        y &&
                          o.default.createElement(i.ButtonIcon, {
                            'data-testid': 'balance-change-edit',
                            color: s.IconColor.primaryDefault,
                            ariaLabel: a('edit'),
                            iconName: r.IconName.Edit,
                            onClick: y,
                            size: i.ButtonIconSize.Sm,
                            style: { marginRight: '-4px' },
                          }),
                        o.default.createElement(u.AmountPill, {
                          asset: m,
                          amount: f,
                          isApproval: h,
                          isAllApproval: g,
                          isUnlimitedApproval: v,
                        }),
                        o.default.createElement(l.AssetPill, { asset: m })
                      ),
                      t && o.default.createElement(d.IndividualFiatDisplay, { fiatAmount: p })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/balance-change-row.tsx',
      },
    ],
    [
      7243,
      {
        '../../../../components/component-library': 6402,
        '../../../../components/ui/tooltip': 6818,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useFiatFormatter': 6981,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        './types': 7248,
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
                  (n.TotalFiatDisplay = n.IndividualFiatDisplay = void 0),
                  (n.calculateTotalFiat = g);
                var a = m(e('react')),
                  o = e('react-redux'),
                  r = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../components/component-library'),
                  c = m(e('../../../../components/ui/tooltip')),
                  l = e('../../../../hooks/useFiatFormatter'),
                  u = e('../../../../selectors'),
                  d = e('./types');
                function m(e) {
                  return e && e.__esModule ? e : { default: e };
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
                const p = {
                    color: r.TextColor.textAlternative,
                    variant: r.TextVariant.bodySm,
                    paddingRight: 2,
                    textAlign: 'right',
                  },
                  h = () => {
                    const e = (0, s.useI18nContext)();
                    return a.default.createElement(
                      i.Text,
                      p,
                      e('simulationDetailsFiatNotAvailable')
                    );
                  };
                function g(e) {
                  return e.reduce((e, t) => e + (t === d.FIAT_UNAVAILABLE ? 0 : t), 0);
                }
                n.IndividualFiatDisplay = ({ fiatAmount: e, shorten: t = !1 }) => {
                  const n = (0, o.useSelector)(u.getShouldShowFiat),
                    r = (0, l.useFiatFormatter)();
                  if (!n) return null;
                  if (e === d.FIAT_UNAVAILABLE) return null;
                  const s = r(Math.abs(e), { shorten: t });
                  return t
                    ? a.default.createElement(
                        c.default,
                        { position: 'bottom', title: s, interactive: !0 },
                        a.default.createElement(
                          i.Text,
                          f({}, p, { 'data-testid': 'individual-fiat-display' }),
                          s
                        )
                      )
                    : a.default.createElement(
                        i.Text,
                        f({}, p, { 'data-testid': 'individual-fiat-display' }),
                        s
                      );
                };
                n.TotalFiatDisplay = ({ fiatAmounts: e }) => {
                  const t = (0, o.useSelector)(u.getShouldShowFiat),
                    n = (0, s.useI18nContext)(),
                    r = (0, l.useFiatFormatter)(),
                    c = g(e);
                  return t
                    ? 0 === c
                      ? a.default.createElement(h, null)
                      : a.default.createElement(
                          i.Text,
                          p,
                          n('simulationDetailsTotalFiat', [r(Math.abs(c))])
                        )
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/fiat-display.tsx',
      },
    ],
    [
      7245,
      { './simulation-details': 7246 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SimulationDetails', {
                    enumerable: !0,
                    get: function () {
                      return a.SimulationDetails;
                    },
                  });
                var a = e('./simulation-details');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/simulation-details/index.ts' },
    ],
    [
      7246,
      {
        '../../../../components/app/confirm/info/row/alert-row/alert-row': 5976,
        '../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../components/app/confirm/info/row/section': 5986,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/icon/preloader/preloader-icon.component': 6752,
        '../../../../components/ui/tooltip': 6818,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        './balance-change-list': 7241,
        './useBalanceChanges': 7249,
        './useSimulationMetrics': 7251,
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
                  (n.SimulationDetails = void 0);
                var a = e('@metamask/transaction-controller'),
                  o = g(e('react')),
                  r = e('../../../../components/app/confirm/info/row/alert-row/alert-row'),
                  s = e('../../../../components/app/confirm/info/row/constants'),
                  i = e('../../../../components/app/confirm/info/row/section'),
                  c = e('../../../../components/component-library'),
                  l = g(e('../../../../components/ui/icon/preloader/preloader-icon.component')),
                  u = g(e('../../../../components/ui/tooltip')),
                  d = e('../../../../helpers/constants/design-system'),
                  m = e('../../../../hooks/useI18nContext'),
                  f = e('./balance-change-list'),
                  p = e('./useBalanceChanges'),
                  h = e('./useSimulationMetrics');
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function v() {
                  return (
                    (v = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    v.apply(null, arguments)
                  );
                }
                const y = () =>
                    o.default.createElement(
                      'div',
                      { role: 'progressbar' },
                      o.default.createElement(l.default, { size: 20 })
                    ),
                  T = ({ error: e }) => {
                    const t = (0, m.useI18nContext)();
                    return o.default.createElement(
                      c.Text,
                      {
                        color:
                          e.code === a.SimulationErrorCode.Reverted
                            ? d.TextColor.warningDefault
                            : d.TextColor.textDefault,
                        variant: d.TextVariant.bodyMd,
                        display: d.Display.Flex,
                        alignItems: d.AlignItems.center,
                      },
                      e.code === a.SimulationErrorCode.Reverted &&
                        o.default.createElement(c.Icon, {
                          name: c.IconName.Warning,
                          marginInlineEnd: 1,
                        }),
                      e.code === a.SimulationErrorCode.Reverted
                        ? t('simulationDetailsTransactionReverted')
                        : t('simulationDetailsUnavailable')
                    );
                  },
                  k = () => {
                    const e = (0, m.useI18nContext)();
                    return o.default.createElement(
                      c.Text,
                      { color: d.TextColor.textDefault, variant: d.TextVariant.bodyMd },
                      e('simulationDetailsNoChanges')
                    );
                  },
                  x = ({ transactionId: e }) => {
                    const t = (0, m.useI18nContext)();
                    return o.default.createElement(r.ConfirmInfoAlertRow, {
                      alertKey: s.RowAlertKey.Resimulation,
                      label: t('simulationDetailsTitle'),
                      ownerId: e,
                      tooltip: t('simulationDetailsTitleTooltip'),
                      style: { paddingLeft: 0, paddingRight: 0 },
                    });
                  },
                  w = () => {
                    const e = (0, m.useI18nContext)();
                    return o.default.createElement(
                      c.Box,
                      {
                        display: d.Display.Flex,
                        flexDirection: d.FlexDirection.Row,
                        alignItems: d.AlignItems.center,
                        gap: 1,
                      },
                      o.default.createElement(
                        c.Text,
                        { variant: d.TextVariant.bodyMdMedium },
                        e('simulationDetailsTitle')
                      ),
                      o.default.createElement(
                        u.default,
                        {
                          interactive: !0,
                          position: 'top',
                          containerClassName: 'info-tooltip__tooltip-container',
                          tooltipInnerClassName: 'info-tooltip__tooltip-content',
                          tooltipArrowClassName: 'info-tooltip__top-tooltip-arrow',
                          html: e('simulationDetailsTitleTooltip'),
                          theme: 'tippy-tooltip-info',
                          style: { display: d.Display.Flex },
                        },
                        o.default.createElement(c.Icon, {
                          name: c.IconName.Question,
                          marginLeft: 1,
                          color: d.IconColor.iconMuted,
                          size: c.IconSize.Sm,
                        })
                      )
                    );
                  },
                  E = ({ children: e, isTransactionsRedesign: t, transactionId: n }) =>
                    o.default.createElement(
                      c.Box,
                      {
                        display: d.Display.Flex,
                        flexDirection: d.FlexDirection.Row,
                        alignItems: d.AlignItems.center,
                        justifyContent: d.JustifyContent.spaceBetween,
                      },
                      t
                        ? o.default.createElement(x, { transactionId: n })
                        : o.default.createElement(w, null),
                      e
                    ),
                  _ = ({
                    inHeader: e,
                    isTransactionsRedesign: t,
                    transactionId: n,
                    children: a,
                  }) =>
                    t
                      ? o.default.createElement(
                          i.ConfirmInfoSection,
                          { noPadding: !0 },
                          o.default.createElement(
                            c.Box,
                            {
                              'data-testid': 'simulation-details-layout',
                              className: 'simulation-details-layout',
                              display: d.Display.Flex,
                              flexDirection: d.FlexDirection.Column,
                              borderRadius: d.BorderRadius.LG,
                              borderColor: t
                                ? d.BorderColor.transparent
                                : d.BorderColor.borderDefault,
                              padding: 3,
                              margin: t ? null : 4,
                              gap: 3,
                            },
                            o.default.createElement(
                              E,
                              { isTransactionsRedesign: t, transactionId: n },
                              e
                            ),
                            a
                          )
                        )
                      : o.default.createElement(
                          c.Box,
                          {
                            'data-testid': 'simulation-details-layout',
                            className: 'simulation-details-layout',
                            display: d.Display.Flex,
                            flexDirection: d.FlexDirection.Column,
                            borderRadius: d.BorderRadius.LG,
                            borderColor: t
                              ? d.BorderColor.transparent
                              : d.BorderColor.borderDefault,
                            padding: 3,
                            margin: t ? null : 4,
                            gap: 3,
                          },
                          o.default.createElement(
                            E,
                            { isTransactionsRedesign: t, transactionId: n },
                            e
                          ),
                          a
                        );
                n.SimulationDetails = ({
                  transaction: e,
                  enableMetrics: t = !1,
                  isTransactionsRedesign: n = !1,
                  metricsOnly: r = !1,
                  staticRows: s = [],
                }) => {
                  const i = (0, m.useI18nContext)(),
                    { chainId: l, id: u, simulationData: g } = e,
                    x = (0, p.useBalanceChanges)({ chainId: l, simulationData: g }),
                    w = !g || x.pending,
                    E =
                      (null == s ? void 0 : s.length) > 0 &&
                      s.some(e => {
                        var t;
                        return (
                          (null === (t = e.balanceChanges) || void 0 === t ? void 0 : t.length) > 0
                        );
                      });
                  if (
                    ((0, h.useSimulationMetrics)({
                      enableMetrics: t,
                      balanceChanges: x.value,
                      loading: w,
                      simulationData: g,
                      transactionId: u,
                    }),
                    r)
                  )
                    return null;
                  if (w)
                    return o.default.createElement(_, {
                      inHeader: o.default.createElement(y, null),
                      isTransactionsRedesign: n,
                      transactionId: u,
                    });
                  const { error: b } = g;
                  if (
                    [
                      a.SimulationErrorCode.ChainNotSupported,
                      a.SimulationErrorCode.Disabled,
                    ].includes(null == b ? void 0 : b.code) &&
                    !E
                  )
                    return null;
                  if (b && !E) {
                    const e = b.code !== a.SimulationErrorCode.Reverted && {
                      inHeader: o.default.createElement(T, { error: b }),
                    };
                    return o.default.createElement(
                      _,
                      v({ isTransactionsRedesign: n, transactionId: u }, e),
                      b.code === a.SimulationErrorCode.Reverted &&
                        o.default.createElement(T, { error: b })
                    );
                  }
                  const C = x.value;
                  if (0 === C.length && !E)
                    return o.default.createElement(_, {
                      isTransactionsRedesign: n,
                      transactionId: u,
                      inHeader: o.default.createElement(k, null),
                    });
                  const A = C.filter(e => e.amount.isNegative()),
                    S = C.filter(e => !e.amount.isNegative());
                  return o.default.createElement(
                    _,
                    { isTransactionsRedesign: n, transactionId: u },
                    o.default.createElement(
                      c.Box,
                      { display: d.Display.Flex, flexDirection: d.FlexDirection.Column, gap: 3 },
                      s.map((e, t) =>
                        o.default.createElement(f.BalanceChangeList, {
                          key: t,
                          heading: e.label,
                          balanceChanges: e.balanceChanges,
                        })
                      ),
                      o.default.createElement(f.BalanceChangeList, {
                        heading: i('simulationDetailsOutgoingHeading'),
                        balanceChanges: A,
                        testId: 'simulation-rows-outgoing',
                      }),
                      o.default.createElement(f.BalanceChangeList, {
                        heading: i('simulationDetailsIncomingHeading'),
                        balanceChanges: S,
                        testId: 'simulation-rows-incoming',
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/simulation-details.tsx',
      },
    ],
    [
      7247,
      { '../../../../../shared/constants/transaction': 5819, './types': 7248 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.sortBalanceChanges = n.compareBalanceChanges = void 0);
                var a = e('../../../../../shared/constants/transaction'),
                  o = e('./types');
                const r = [
                    a.TokenStandard.none,
                    a.TokenStandard.ERC20,
                    a.TokenStandard.ERC721,
                    a.TokenStandard.ERC1155,
                  ],
                  s = [
                    (e, t) =>
                      e.fiatAmount === t.fiatAmount
                        ? 0
                        : e.fiatAmount === o.FIAT_UNAVAILABLE
                          ? 1
                          : t.fiatAmount === o.FIAT_UNAVAILABLE
                            ? -1
                            : t.fiatAmount - e.fiatAmount,
                    (e, t) => r.indexOf(e.asset.standard) - r.indexOf(t.asset.standard),
                  ],
                  i = (e, t) => {
                    for (const n of s) {
                      const a = n(e, t);
                      if (0 !== a) return a;
                    }
                    return 0;
                  };
                n.compareBalanceChanges = i;
                n.sortBalanceChanges = e => [...e].sort(i);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/sortBalanceChanges.ts',
      },
    ],
    [
      7248,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.FIAT_UNAVAILABLE = void 0);
                n.FIAT_UNAVAILABLE = null;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/components/simulation-details/types.ts' },
    ],
    [
      7249,
      {
        '../../../../../shared/constants/transaction': 5819,
        '../../../../ducks/metamask/metamask': 6860,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useAsync': 6969,
        '../../../../selectors': 7601,
        '../../utils/token': 7365,
        './types': 7248,
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
                  (n.useBalanceChanges = void 0);
                var a = e('react-redux'),
                  o = e('@metamask/transaction-controller'),
                  r = e('bignumber.js'),
                  s = e('../../../../hooks/useAsync'),
                  i = e('../../../../../shared/constants/transaction'),
                  c = e('../../../../ducks/metamask/metamask'),
                  l = e('../../../../selectors'),
                  u = e('../../../../helpers/utils/util'),
                  d = e('../../utils/token'),
                  m = e('./types');
                function f(e) {
                  return String(e);
                }
                function p(e) {
                  switch (e) {
                    case o.SimulationTokenStandard.erc20:
                      return i.TokenStandard.ERC20;
                    case o.SimulationTokenStandard.erc721:
                      return i.TokenStandard.ERC721;
                    case o.SimulationTokenStandard.erc1155:
                      return i.TokenStandard.ERC1155;
                    default:
                      throw new Error(`Unknown token standard: ${e}`);
                  }
                }
                function h({ isDecrease: e, difference: t }, n) {
                  return new r.BigNumber(t, 16).times(e ? -1 : 1).shift(-n);
                }
                n.useBalanceChanges = ({ chainId: e, simulationData: t }) => {
                  const n = (0, a.useSelector)(c.getCurrentCurrency),
                    r = (0, a.useSelector)(t => (0, l.selectConversionRateByChainId)(t, e)),
                    { nativeBalanceChange: g, tokenBalanceChanges: v = [] } = t ?? {},
                    y = v
                      .filter(e => e.standard === o.SimulationTokenStandard.erc20)
                      .map(e => e.address),
                    T = (0, s.useAsyncResultOrThrow)(
                      () =>
                        (async function (e) {
                          const t = [...new Set(e.map(e => e.toLowerCase()))],
                            n = await Promise.all(t.map(d.fetchErc20Decimals));
                          return Object.fromEntries(n.map((e, n) => [t[n], e]));
                        })(y),
                      [JSON.stringify(y)]
                    ),
                    k = (0, s.useAsyncResultOrThrow)(
                      () =>
                        (async function (e, t, n) {
                          const a = await (0, u.fetchTokenExchangeRates)(e, t, n);
                          return Object.fromEntries(
                            Object.entries(a).map(([e, t]) => [e.toLowerCase(), t])
                          );
                        })(n, y, e),
                      [JSON.stringify(y), e, n]
                    );
                  if (T.pending || k.pending || !t) return { pending: !0, value: [] };
                  const x = (function (e, t, n) {
                      if (!e) return undefined;
                      const a = { chainId: n, standard: i.TokenStandard.none },
                        o = h(e, 18),
                        r = t ? o.times(f(t)).toNumber() : m.FIAT_UNAVAILABLE;
                      return { asset: a, amount: o, fiatAmount: r };
                    })(g, r, e),
                    w = (function (e, t, n, a) {
                      return e.map(e => {
                        const o = {
                            chainId: a,
                            standard: p(e.standard),
                            address: e.address.toLowerCase(),
                            tokenId: e.id,
                          },
                          r = h(
                            e,
                            o.standard === i.TokenStandard.ERC20
                              ? (t[o.address] ?? d.ERC20_DEFAULT_DECIMALS)
                              : 0
                          ),
                          s = n[e.address],
                          c = s ? r.times(f(s)).toNumber() : m.FIAT_UNAVAILABLE;
                        return { asset: o, amount: r, fiatAmount: c };
                      });
                    })(v, T.value, k.value, e);
                  return { pending: !1, value: [...(x ? [x] : []), ...w] };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/useBalanceChanges.ts',
      },
    ],
    [
      7250,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useLoadingTime = function () {
                    const [e] = (0, a.useState)(Date.now()),
                      [t, n] = (0, a.useState)();
                    return {
                      loadingTime: t,
                      setLoadingComplete: () => {
                        t === undefined && n((Date.now() - e) / 1e3);
                      },
                    };
                  });
                var a = e('react');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/useLoadingTime.ts',
      },
    ],
    [
      7251,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/constants/transaction': 5819,
        '../../../../contexts/metametrics': 6836,
        '../../../../hooks/useDisplayName': 6977,
        '../../hooks/useTransactionEventFragment': 7350,
        './fiat-display': 7243,
        './useLoadingTime': 7250,
        '@metamask/name-controller': 2190,
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
                  (n.SimulationResponseType = n.PetnameType = n.FiatType = n.AssetType = void 0),
                  (n.useSimulationMetrics = function ({
                    balanceChanges: e,
                    loading: t,
                    simulationData: n,
                    transactionId: c,
                    enableMetrics: d,
                  }) {
                    var p;
                    const { loadingTime: k, setLoadingComplete: x } = (0, m.useLoadingTime)();
                    t || x();
                    const w = e
                        .filter(({ asset: e }) => Boolean(e.address))
                        .map(({ asset: e }) => ({
                          value: e.address,
                          type: r.NameType.ETHEREUM_ADDRESS,
                          preferContractSymbol: !0,
                          variation: e.chainId,
                        })),
                      E = (0, i.useDisplayNames)(w).reduce(
                        (t, n, a) => ({ ...t, [e[a].asset.address ?? '']: n }),
                        {}
                      ),
                      { updateTransactionEventFragment: _ } = (0, s.useTransactionEventFragment)();
                    !(function (e, t) {
                      const n = (0, o.useContext)(l.MetaMetricsContext),
                        [a, r] = (0, o.useState)([]);
                      for (const o of e) {
                        const e = o.asset.address ?? '',
                          s = t[e],
                          i = (o.asset.address && !o.fiatAmount) || T(o, s) === g.Unknown,
                          c = a.includes(e);
                        i &&
                          !c &&
                          (n({
                            event: u.MetaMetricsEventName.SimulationIncompleteAssetDisplayed,
                            category: u.MetaMetricsEventCategory.Transactions,
                            properties: {
                              asset_address: o.asset.address,
                              asset_petname: T(o, s),
                              asset_symbol: null == s ? void 0 : s.contractDisplayName,
                              asset_type: y(o.asset.standard),
                              fiat_conversion_available: o.fiatAmount
                                ? h.Available
                                : h.NotAvailable,
                              location: 'confirmation',
                            },
                          }),
                          r([...a, e]));
                      }
                    })(e, E);
                    const b = e.filter(e => !e.amount.isNegative()),
                      C = e.filter(e => e.amount.isNegative()),
                      A = (function (e) {
                        var t;
                        if (!e) return f.InProgress;
                        if (
                          (null === (t = e.error) || void 0 === t ? void 0 : t.code) ===
                          a.SimulationErrorCode.Reverted
                        )
                          return f.Reverted;
                        if (e.error) return f.Failed;
                        if (
                          !(
                            (null != e && e.nativeBalanceChange) ||
                            (null != e && e.tokenBalanceChanges.length)
                          )
                        )
                          return f.NoChanges;
                        return f.Changes;
                      })(n),
                      S = {
                        simulation_response: A,
                        simulation_latency: k,
                        ...v(b, 'simulation_receiving_assets_', E),
                        ...v(C, 'simulation_sending_assets_', E),
                      },
                      N = { properties: S, sensitiveProperties: {} },
                      P =
                        !d ||
                        [
                          a.SimulationErrorCode.ChainNotSupported,
                          a.SimulationErrorCode.Disabled,
                        ].includes(
                          null == n || null === (p = n.error) || void 0 === p ? void 0 : p.code
                        );
                    (0, o.useEffect)(() => {
                      P || _(N, c);
                    }, [P, _, c, JSON.stringify(N)]);
                  });
                var a = e('@metamask/transaction-controller'),
                  o = e('react'),
                  r = e('@metamask/name-controller'),
                  s = e('../../hooks/useTransactionEventFragment'),
                  i = e('../../../../hooks/useDisplayName'),
                  c = e('../../../../../shared/constants/transaction'),
                  l = e('../../../../contexts/metametrics'),
                  u = e('../../../../../shared/constants/metametrics'),
                  d = e('./fiat-display'),
                  m = e('./useLoadingTime');
                let f = (n.SimulationResponseType = (function (e) {
                    return (
                      (e.Failed = 'failed'),
                      (e.Reverted = 'transaction_revert'),
                      (e.NoChanges = 'no_balance_change'),
                      (e.Changes = 'balance_change'),
                      (e.InProgress = 'simulation_in_progress'),
                      e
                    );
                  })({})),
                  p = (n.AssetType = (function (e) {
                    return (
                      (e.Native = 'native'),
                      (e.ERC20 = 'erc20'),
                      (e.ERC721 = 'erc721'),
                      (e.ERC1155 = 'erc1155'),
                      e
                    );
                  })({})),
                  h = (n.FiatType = (function (e) {
                    return (e.Available = 'available'), (e.NotAvailable = 'not_available'), e;
                  })({})),
                  g = (n.PetnameType = (function (e) {
                    return (e.Saved = 'saved'), (e.Default = 'default'), (e.Unknown = 'unknown'), e;
                  })({}));
                function v(e, t, n) {
                  const a = e.length,
                    o = k(e.map(e => y(e.asset.standard))),
                    r = k(e.map(e => (e.fiatAmount ? h.Available : h.NotAvailable))),
                    s = k(e.map(e => T(e, n[e.asset.address ?? '']))),
                    i = e.map(e => e.fiatAmount),
                    c = (0, d.calculateTotalFiat)(i);
                  return (function (e, t) {
                    return Object.entries(e).reduce((e, [n, a]) => ({ ...e, [`${t}${n}`]: a }), {});
                  })(
                    {
                      petname: s,
                      quantity: a,
                      type: o,
                      value: r,
                      total_value: c ? Math.abs(c) : undefined,
                    },
                    t
                  );
                }
                function y(e) {
                  switch (e) {
                    case c.TokenStandard.ERC20:
                      return p.ERC20;
                    case c.TokenStandard.ERC721:
                      return p.ERC721;
                    case c.TokenStandard.ERC1155:
                      return p.ERC1155;
                    default:
                      return p.Native;
                  }
                }
                function T(e, t = { name: '', hasPetname: !1 }) {
                  return e.asset.standard === c.TokenStandard.none
                    ? g.Default
                    : t.hasPetname
                      ? g.Saved
                      : t.name
                        ? g.Default
                        : g.Unknown;
                }
                function k(e) {
                  return Array.from(new Set(e));
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/simulation-details/useSimulationMetrics.ts',
      },
    ],
    [
      7252,
      { './smart-transactions-banner-alert': 7253 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SmartTransactionsBannerAlert', {
                    enumerable: !0,
                    get: function () {
                      return a.SmartTransactionsBannerAlert;
                    },
                  });
                var a = e('./smart-transactions-banner-alert');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/smart-transactions-banner-alert/index.ts',
      },
    ],
    [
      7253,
      {
        '../../../../../shared/constants/alerts': 5787,
        '../../../../../shared/constants/smartTransactions': 5813,
        '../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../../shared/modules/selectors': 5874,
        '../../../../../shared/modules/selectors/smart-transactions': 5876,
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../store/actions': 7619,
        '../../context/confirm': 7294,
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
                  (n.default = n.SmartTransactionsBannerAlert = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  r = e('../../../../hooks/useI18nContext'),
                  s = e('../../../../components/component-library'),
                  i = e('../../../../store/actions'),
                  c = e('../../../../../shared/constants/alerts'),
                  l = e('../../../../../shared/constants/smartTransactions'),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../context/confirm'),
                  m = e('../../../../../shared/lib/confirmation.utils'),
                  f = e('../../../../../shared/modules/selectors/smart-transactions'),
                  p = e('../../../../../shared/modules/selectors');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const g = (n.SmartTransactionsBannerAlert = a.default.memo(
                  ({ marginType: e = 'default' }) => {
                    var t;
                    const n = (0, r.useI18nContext)();
                    let h;
                    try {
                      const e = (0, d.useConfirmContext)();
                      h = null == e ? void 0 : e.currentConfirmation;
                    } catch {
                      h = null;
                    }
                    const g = (0, o.useSelector)(e => {
                        var t;
                        return (
                          !1 !==
                          (null === (t = e.metamask.alertEnabledness) || void 0 === t
                            ? void 0
                            : t[c.AlertTypes.smartTransactionsMigration])
                        );
                      }),
                      v = (0, o.useSelector)(f.getSmartTransactionsOptInStatusInternal),
                      y = (0, o.useSelector)(f.getSmartTransactionsMigrationAppliedInternal),
                      T = (0, o.useSelector)(p.getChainSupportsSmartTransactions),
                      k = (0, o.useSelector)(p.getSmartTransactionsPreferenceEnabled),
                      x = (0, a.useCallback)(() => {
                        (0, i.setAlertEnabledness)(c.AlertTypes.smartTransactionsMigration, !1);
                      }, []);
                    a.default.useEffect(() => {
                      g && !v && x();
                    }, [g, v, x]);
                    const w = g && v && y && T && k;
                    if (
                      !(null === h
                        ? w
                        : w &&
                          (0, m.isCorrectDeveloperTransactionType)(
                            null === (t = h) || void 0 === t ? void 0 : t.type
                          ))
                    )
                      return null;
                    return a.default.createElement(
                      s.Box,
                      { className: 'transaction-alerts' },
                      a.default.createElement(
                        s.BannerAlert,
                        {
                          severity: s.BannerAlertSeverity.Info,
                          onClose: x,
                          'data-testid': 'smart-transactions-banner-alert',
                          style: (() => {
                            switch (e) {
                              case 'none':
                                return { margin: 0 };
                              case 'noTop':
                                return { marginTop: 0 };
                              case 'onlyTop':
                                return { margin: 0, marginTop: 16 };
                              default:
                                return undefined;
                            }
                          })(),
                        },
                        a.default.createElement(
                          s.Text,
                          { fontWeight: u.FontWeight.Bold },
                          n('smartTransactionsEnabledTitle')
                        ),
                        a.default.createElement(
                          s.Text,
                          { as: 'p' },
                          a.default.createElement(
                            s.ButtonLink,
                            {
                              href: l.SMART_TRANSACTIONS_LEARN_MORE_URL,
                              onClick: x,
                              externalLink: !0,
                              style: { height: 'unset', verticalAlign: 'unset' },
                            },
                            n('smartTransactionsEnabledLink')
                          ),
                          n('smartTransactionsEnabledDescription')
                        )
                      )
                    );
                  }
                ));
                g.displayName = 'SmartTransactionsBannerAlert';
                n.default = g;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/smart-transactions-banner-alert/smart-transactions-banner-alert.tsx',
      },
    ],
    [
      7254,
      {
        '../../../../components/component-library': 6402,
        '../../../../components/ui/actionable-message': 6699,
        '../../../../hooks/useI18nContext': 6985,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = i(e('react')),
                  o = i(e('../../../../components/ui/actionable-message')),
                  r = e('../../../../components/component-library'),
                  s = e('../../../../hooks/useI18nContext');
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = ({ message: e, learnMoreLink: t, error: n }) => {
                  const i = (0, s.useI18nContext)();
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      r.Text,
                      {
                        'data-testid': 'snap-account-error-message-text',
                        style: n ? { marginBottom: 2 } : {},
                      },
                      e,
                      Boolean(t) &&
                        a.default.createElement(
                          a.default.Fragment,
                          null,
                          ' ',
                          a.default.createElement(
                            'a',
                            {
                              'data-testid': 'snap-account-error-message-learn-more-link',
                              href: t,
                              rel: 'noopener noreferrer',
                              target: '_blank',
                            },
                            i('learnMoreUpperCase')
                          )
                        )
                    ),
                    Boolean(n) &&
                      a.default.createElement(o.default, {
                        type: 'danger',
                        message: n,
                        dataTestId: 'snap-account-error-message-error',
                      })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/snap-account-error-message/SnapAccountErrorMessage.tsx',
      },
    ],
    [
      7255,
      { './SnapAccountErrorMessage': 7254 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapAccountErrorMessage', {
                    enumerable: !0,
                    get: function () {
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./SnapAccountErrorMessage')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/snap-account-error-message/index.tsx',
      },
    ],
    [
      7256,
      {
        '../../../../components/component-library': 6402,
        '../../../../hooks/useI18nContext': 6985,
        '../../../remove-snap-account/snap-account-card': 7460,
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
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('../../../../components/component-library'),
                  s = e('../../../../hooks/useI18nContext'),
                  i = e('../../../remove-snap-account/snap-account-card');
                n.default = ({ message: e, address: t, learnMoreLink: n }) => {
                  const a = (0, s.useI18nContext)();
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(i.SnapAccountCard, { address: t }),
                    o.default.createElement(
                      r.Text,
                      { 'data-testid': 'snap-account-success-message-text' },
                      e,
                      Boolean(n) &&
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          ' ',
                          o.default.createElement(
                            'a',
                            {
                              'data-testid': 'snap-account-success-message-learn-more-link',
                              href: n,
                              rel: 'noopener noreferrer',
                              target: '_blank',
                            },
                            a('learnMoreUpperCase')
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
        file: 'ui/pages/confirmations/components/snap-account-success-message/SnapAccountSuccessMessage.tsx',
      },
    ],
    [
      7257,
      { './SnapAccountSuccessMessage': 7256 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapAccountSuccessMessage', {
                    enumerable: !0,
                    get: function () {
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./SnapAccountSuccessMessage')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/snap-account-success-message/index.tsx',
      },
    ],
    [
      7258,
      {
        '../../../../components/component-library': 6402,
        '../../../../helpers/constants/design-system': 6872,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = u);
                var a = c(e('react')),
                  o = c(e('prop-types')),
                  r = c(e('classnames')),
                  s = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../components/component-library');
                function c(e) {
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
                function u({
                  'data-testid': e,
                  detailTitle: t = '',
                  detailText: n,
                  detailTotal: o = '',
                  hasDetailTextInSeparateRow: c = !1,
                  subTitle: u = '',
                  subText: d = '',
                  flexWidthValues: m = !1,
                  ...f
                }) {
                  return a.default.createElement(
                    'div',
                    l({ className: 'transaction-detail-item', 'data-testid': e }, f),
                    a.default.createElement(
                      'div',
                      { className: 'transaction-detail-item__row' },
                      a.default.createElement(
                        i.Text,
                        {
                          as: 'h6',
                          display: s.Display.Flex,
                          flexWrap: s.FlexWrap.NoWrap,
                          paddingBottom: 1,
                          variant: s.TextVariant.bodyMdMedium,
                        },
                        t
                      ),
                      a.default.createElement(
                        'div',
                        {
                          className: (0, r.default)('transaction-detail-item__detail-values', {
                            'transaction-detail-item__detail-values--flex-width': m,
                          }),
                        },
                        n &&
                          a.default.createElement(
                            i.Text,
                            {
                              as: 'h6',
                              color: s.Color.textAlternative,
                              width: c ? s.BlockSize.Full : null,
                            },
                            n
                          ),
                        a.default.createElement(
                          i.Text,
                          {
                            as: 'h6',
                            color: s.Color.textDefault,
                            marginLeft: 1,
                            textAlign: s.TextAlign.Right,
                            variant: s.TextVariant.bodyMd,
                          },
                          o
                        )
                      )
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'transaction-detail-item__row' },
                      a.default.isValidElement(u)
                        ? a.default.createElement('div', null, u)
                        : a.default.createElement(
                            i.Text,
                            {
                              as: 'h6',
                              variant: s.TextVariant.bodySm,
                              color: s.Color.textMuted,
                              style: { flex: '1 0 auto' },
                            },
                            u
                          ),
                      a.default.createElement(
                        i.Text,
                        {
                          as: 'h6',
                          variant: s.TextVariant.bodySm,
                          color: s.Color.textAlternative,
                          textAlign: s.TextAlign.End,
                          className: 'transaction-detail-item__row-subText',
                        },
                        d
                      )
                    )
                  );
                }
                u.propTypes = {
                  'data-testid': o.default.string,
                  detailTitle: o.default.oneOfType([o.default.string, o.default.node]),
                  detailText: o.default.oneOfType([o.default.string, o.default.node]),
                  detailTotal: o.default.oneOfType([o.default.string, o.default.node]),
                  hasDetailTextInSeparateRow: o.default.bool,
                  subTitle: o.default.oneOfType([o.default.string, o.default.node]),
                  subText: o.default.oneOfType([o.default.string, o.default.node]),
                  flexWidthValues: o.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/components/transaction-detail-item/transaction-detail-item.component.js',
      },
    ],
    [
      7259,
      {
        '../../../../shared/lib/swaps-utils': 5846,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/transaction.utils': 5880,
        '../../../helpers/utils/token-util': 6918,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getCustomTxParamsData = function (
                    e,
                    { customPermissionAmount: t, decimals: n }
                  ) {
                    const c = (0, r.parseStandardTokenTransactionData)(e),
                      l = [
                        a.TransactionType.tokenMethodApprove,
                        a.TransactionType.tokenMethodIncreaseAllowance,
                      ];
                    if (!c) throw new Error('Invalid data');
                    if (!l.includes(c.name))
                      throw new Error(
                        `Invalid data; should be ${l.map(e => `'${e}'`).join(' or ')} method, but instead is '${c.name}'`
                      );
                    let u = (0, s.getTokenAddressParam)(c);
                    u.startsWith('0x') && (u = u.substring(2));
                    const [d, m] = e.split(u);
                    if (!d || !m) throw new Error('Invalid data');
                    if (m.length < 64)
                      throw new Error(
                        'Invalid calldata value; must be at least 64 hex digits long'
                      );
                    const f = m.substring(0, 64),
                      p = m.substring(64);
                    let h = (0, i.decimalToHex)((0, o.calcTokenValue)(t, n));
                    if (h.length > 64) throw new Error('Custom value is larger than u256');
                    h = h.padStart(f.length, '0');
                    return `${d}${u}${h}${p}`;
                  });
                var a = e('@metamask/transaction-controller'),
                  o = e('../../../../shared/lib/swaps-utils'),
                  r = e('../../../../shared/modules/transaction.utils'),
                  s = e('../../../helpers/utils/token-util'),
                  i = e('../../../../shared/modules/conversion.utils');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/confirm-approve/confirm-approve.util.js' },
    ],
    [
      7260,
      {
        '../../../../shared/constants/app': 5789,
        '../../../components/ui/loading-screen': 6765,
        '../../../helpers/constants/routes': 6878,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  o,
                  r,
                  s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  i = m(e('prop-types')),
                  c = e('react-router-dom'),
                  l = m(e('../../../components/ui/loading-screen')),
                  u = e('../../../helpers/constants/routes'),
                  d = e('../../../../shared/constants/app');
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
                class p extends s.Component {
                  render() {
                    const { txData: e } = this.props;
                    if (e.msgParams) {
                      let t = `${u.CONFIRM_TRANSACTION_ROUTE}/${e.id}${u.DECRYPT_MESSAGE_REQUEST_PATH}`;
                      return (
                        e.type === d.MESSAGE_TYPE.ETH_GET_ENCRYPTION_PUBLIC_KEY &&
                          (t = `${u.CONFIRM_TRANSACTION_ROUTE}/${e.id}${u.ENCRYPTION_PUBLIC_KEY_REQUEST_PATH}`),
                        s.default.createElement(c.Redirect, { to: { pathname: t } })
                      );
                    }
                    return s.default.createElement(l.default, null);
                  }
                }
                (n.default = p),
                  (a = p),
                  (o = 'propTypes'),
                  (r = { txData: i.default.object }),
                  (o = (function (e) {
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
                  })(o)) in a
                    ? Object.defineProperty(a, o, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (a[o] = r);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirm-transaction-switch/confirm-transaction-switch.component.js',
      },
    ],
    [
      7261,
      {
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        './confirm-transaction-switch.component': 7260,
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
                  o = e('react-redux'),
                  r = e('../../../selectors'),
                  s = e('../../../helpers/constants/routes'),
                  i =
                    (a = e('./confirm-transaction-switch.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = (0, o.connect)((e, t) => {
                  const n = (0, r.getUnapprovedTransactions)(e),
                    {
                      match: { params: a = {}, url: o },
                    } = t,
                    i = `${s.CONFIRM_TRANSACTION_ROUTE}/`,
                    c = o.includes(i) ? o.split(i)[1] : null,
                    { id: l } = a,
                    u = l || c,
                    d = (0, r.unconfirmedTransactionsListSelector)(e);
                  return { txData: d.length ? n[u] || d[0] : {} };
                })(i.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirm-transaction-switch/confirm-transaction-switch.container.js',
      },
    ],
    [
      7262,
      { './confirm-transaction-switch.container': 7261 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  o =
                    (a = e('./confirm-transaction-switch.container')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = o.default;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/confirm-transaction-switch/index.js' },
    ],
    [
      7263,
      { '../confirm-transaction-switch': 7262, react: 5328, 'react-router-dom': 5313 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    return a.default.createElement(
                      o.Switch,
                      null,
                      a.default.createElement(o.Route, { path: '*', component: r.default })
                    );
                  });
                var a = s(e('react')),
                  o = e('react-router-dom'),
                  r = s(e('../confirm-transaction-switch'));
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirm-transaction/confirm-token-transaction-switch.js',
      },
    ],
    [
      7264,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/lib/trace': 5849,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/ui/loading-screen': 6765,
        '../../../ducks/confirm-transaction/confirm-transaction.duck': 6853,
        '../../../ducks/history/history': 6857,
        '../../../ducks/send': 6865,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../hooks/useAsync': 6969,
        '../../../hooks/usePolling': 7001,
        '../../../hooks/usePrevious': 7002,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../confirm-decrypt-message': 7080,
        '../../confirm-encryption-public-key': 7083,
        '../confirm-transaction-switch': 7262,
        '../confirm/confirm': 7266,
        '../hooks/useCurrentConfirmation': 7330,
        './confirm-token-transaction-switch': 7263,
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
                    var n = S(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('../../../../shared/constants/app'),
                  i = A(e('../../../components/ui/loading-screen')),
                  c = e('../../../ducks/confirm-transaction/confirm-transaction.duck'),
                  l = e('../../../ducks/history/history'),
                  u = e('../../../ducks/send'),
                  d = e('../../../../shared/modules/selectors/networks'),
                  m = e('../../../helpers/constants/routes'),
                  f = e('../../../helpers/utils/transactions.util'),
                  p = A(e('../../../hooks/usePolling')),
                  h = e('../../../hooks/usePrevious'),
                  g = e('../../../selectors'),
                  v = e('../../../store/actions'),
                  y = A(e('../../confirm-decrypt-message')),
                  T = A(e('../../confirm-encryption-public-key')),
                  k = A(e('../confirm-transaction-switch')),
                  x = A(e('../confirm/confirm')),
                  w = A(e('../hooks/useCurrentConfirmation')),
                  E = e('../../../../app/scripts/lib/util'),
                  _ = e('../../../hooks/useAsync'),
                  b = e('../../../../shared/lib/trace'),
                  C = A(e('./confirm-token-transaction-switch'));
                function A(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function S(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (S = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, o.useDispatch)(),
                    t = (0, r.useHistory)(),
                    { id: n } = (0, r.useParams)(),
                    A = (0, o.useSelector)(l.getMostRecentOverviewPage),
                    S = (0, o.useSelector)(u.getSendTo),
                    N = (0, o.useSelector)(g.unconfirmedTransactionsListSelector),
                    P = (0, o.useSelector)(g.unconfirmedTransactionsHashSelector),
                    M = (0, o.useSelector)(d.getSelectedNetworkClientId),
                    I = N.length || 0,
                    O = (0, a.useCallback)(() => (I ? P[n] || N[0] : {}), [n, I, P, N]),
                    [R, D] = (0, a.useState)(O),
                    F = (0, o.useSelector)(g.use4ByteResolutionSelector),
                    { currentConfirmation: B } = (0, w.default)();
                  (0, a.useEffect)(() => {
                    const t = O();
                    D(t), null != t && t.id && e((0, c.setTransactionToConfirm)(t.id));
                  }, [e, O, n, I, P, N]);
                  const { id: L, type: j } = R,
                    G = (0, E.getEnvironmentType)() === s.ENVIRONMENT_TYPE_NOTIFICATION;
                  (0, _.useAsyncResult)(async () => {
                    var e;
                    if (!G) return undefined;
                    const t = s.TRACE_ENABLED_SIGN_METHODS.includes(j)
                      ? null === (e = R.msgParams) ||
                        void 0 === e ||
                        null === (e = e.requestId) ||
                        void 0 === e
                        ? void 0
                        : e.toString()
                      : L;
                    return await (0, v.endBackgroundTrace)({
                      name: b.TraceName.NotificationDisplay,
                      id: t,
                    });
                  }, [L, G, j, R.msgParams]);
                  const $ = L,
                    W = (0, f.isTokenMethodAction)(j),
                    U = $ && (!n || n === $),
                    H = (0, h.usePrevious)(n),
                    V = (0, h.usePrevious)($);
                  return (
                    (0, p.default)({
                      startPolling: e =>
                        (0, v.gasFeeStartPollingByNetworkClientId)(e.networkClientId),
                      stopPollingByPollingToken: v.gasFeeStopPollingByPollingToken,
                      input: { networkClientId: R.networkClientId ?? M },
                    }),
                    (0, a.useEffect)(() => {
                      if (I || S) {
                        const { txParams: { data: t } = {}, origin: a } = R;
                        a !== s.ORIGIN_METAMASK && e((0, v.getContractMethodData)(t, F));
                        const o = $ || n;
                        o && e((0, c.setTransactionToConfirm)(o));
                      }
                    }, []),
                    (0, a.useEffect)(() => {
                      if (n && $ && H !== n) {
                        const { txData: { txParams: { data: t } = {}, origin: a } = {} } = R;
                        e((0, c.clearConfirmTransaction)()),
                          e((0, c.setTransactionToConfirm)(n)),
                          a !== s.ORIGIN_METAMASK && e((0, v.getContractMethodData)(t, F));
                      } else
                        !V || $ || I
                          ? V && $ && V !== $ && n !== $ && t.replace(A)
                          : e((0, v.setDefaultHomeActiveTabName)('activity')).then(() => {
                              t.replace(m.DEFAULT_ROUTE);
                            });
                    }, [e, t, A, n, H, V, I, R, $, F]),
                    B
                      ? a.default.createElement(x.default, null)
                      : W && U
                        ? a.default.createElement(C.default, { transaction: R })
                        : U
                          ? a.default.createElement(
                              r.Switch,
                              null,
                              a.default.createElement(r.Route, {
                                exact: !0,
                                path: `${m.CONFIRM_TRANSACTION_ROUTE}/:id?${m.DECRYPT_MESSAGE_REQUEST_PATH}`,
                                component: y.default,
                              }),
                              a.default.createElement(r.Route, {
                                exact: !0,
                                path: `${m.CONFIRM_TRANSACTION_ROUTE}/:id?${m.ENCRYPTION_PUBLIC_KEY_REQUEST_PATH}`,
                                component: T.default,
                              }),
                              a.default.createElement(r.Route, { path: '*', component: k.default })
                            )
                          : a.default.createElement(i.default, null)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirm-transaction/confirm-transaction.component.js',
      },
    ],
    [
      7265,
      { './confirm-transaction.component': 7264 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  o =
                    (a = e('./confirm-transaction.component')) && a.__esModule ? a : { default: a };
                n.default = o.default;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/confirm-transaction/index.js' },
    ],
    [
      7266,
      {
        '../../../components/multichain/pages/page': 6652,
        '../../../contexts/gasFee': 6831,
        '../../../contexts/transaction-modal': 6840,
        '../components/advanced-gas-fee-popover': 7102,
        '../components/confirm/blockaid-loading-indicator': 7104,
        '../components/confirm/confirm-alerts': 7106,
        '../components/confirm/footer': 7108,
        '../components/confirm/header': 7116,
        '../components/confirm/info': 7146,
        '../components/confirm/info/shared/gas-fee-token-toast/gas-fee-token-toast': 7167,
        '../components/confirm/ledger-info': 7195,
        '../components/confirm/nav/nav': 7198,
        '../components/confirm/pluggable-section': 7199,
        '../components/confirm/scroll-to-bottom': 7204,
        '../components/confirm/splash': 7209,
        '../components/confirm/title': 7214,
        '../components/edit-gas-fee-popover': 7228,
        '../components/smart-transactions-banner-alert': 7252,
        '../context/confirm': 7294,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = E(e('react')),
                  o = e('../../../components/multichain/pages/page'),
                  r = e('../../../contexts/gasFee'),
                  s = e('../../../contexts/transaction-modal'),
                  i = E(e('../components/advanced-gas-fee-popover')),
                  c = e('../components/confirm/blockaid-loading-indicator'),
                  l = e('../components/confirm/confirm-alerts'),
                  u = e('../components/confirm/footer'),
                  d = e('../components/confirm/header'),
                  m = e('../components/confirm/info'),
                  f = e('../components/confirm/ledger-info'),
                  p = e('../components/smart-transactions-banner-alert'),
                  h = e('../components/confirm/pluggable-section'),
                  g = E(e('../components/confirm/scroll-to-bottom')),
                  v = e('../components/confirm/title'),
                  y = E(e('../components/edit-gas-fee-popover')),
                  T = e('../context/confirm'),
                  k = e('../components/confirm/nav/nav'),
                  x = e(
                    '../components/confirm/info/shared/gas-fee-token-toast/gas-fee-token-toast'
                  ),
                  w = e('../components/confirm/splash');
                function E(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const _ = () =>
                    a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(y.default, null),
                      a.default.createElement(i.default, null)
                    ),
                  b = ({ children: e }) => {
                    const { currentConfirmation: t } = (0, T.useConfirmContext)();
                    return a.default.createElement(r.GasFeeContextProvider, { transaction: t }, e);
                  };
                n.default = () =>
                  a.default.createElement(
                    T.ConfirmContextProvider,
                    null,
                    a.default.createElement(
                      s.TransactionModalContextProvider,
                      null,
                      a.default.createElement(
                        b,
                        null,
                        a.default.createElement(_, null),
                        a.default.createElement(
                          l.ConfirmAlerts,
                          null,
                          a.default.createElement(
                            o.Page,
                            { className: 'confirm_wrapper' },
                            a.default.createElement(k.ConfirmNav, null),
                            a.default.createElement(d.Header, null),
                            a.default.createElement(p.SmartTransactionsBannerAlert, {
                              marginType: 'noTop',
                            }),
                            a.default.createElement(
                              g.default,
                              null,
                              a.default.createElement(c.BlockaidLoadingIndicator, null),
                              a.default.createElement(f.LedgerInfo, null),
                              a.default.createElement(v.Title, null),
                              a.default.createElement(m.Info, null),
                              a.default.createElement(h.PluggableSection, null)
                            ),
                            a.default.createElement(x.GasFeeTokenToast, null),
                            a.default.createElement(u.Footer, null),
                            a.default.createElement(w.Splash, null)
                          )
                        )
                      )
                    )
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/confirm/confirm.tsx' },
    ],
    [
      7268,
      {
        '../../../../components/app/alert-system/contexts/alertActionHandler': 5905,
        '../../../../components/app/alert-system/contexts/alertMetricsContext': 5906,
        '../../../../components/app/alert-system/multiple-alert-modal': 5909,
        '../../../../hooks/useAlerts': 6968,
        '../../../../selectors': 7601,
        './useAlertsActions': 7269,
        './useTemplateConfirmationAlerts': 7270,
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
                  (n.useTemplateAlertContext =
                    n.TemplateAlertContextProvider =
                    n.TemplateAlertContext =
                      void 0);
                var a,
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  s = (a = e('../../../../hooks/useAlerts')) && a.__esModule ? a : { default: a },
                  i = e('../../../../components/app/alert-system/contexts/alertActionHandler'),
                  c = e('../../../../components/app/alert-system/contexts/alertMetricsContext'),
                  l = e('../../../../components/app/alert-system/multiple-alert-modal'),
                  u = e('../../../../selectors'),
                  d = e('./useTemplateConfirmationAlerts'),
                  m = e('./useAlertsActions');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const p = () => undefined,
                  h = (n.TemplateAlertContext = (0, o.createContext)(undefined));
                n.TemplateAlertContextProvider = ({
                  children: e,
                  confirmationId: t,
                  onSubmit: n,
                }) => {
                  const a = (0, r.useSelector)(u.getMemoizedUnapprovedConfirmations),
                    f = (null == a ? void 0 : a.find(e => e.id === t)) ?? a[0],
                    [g, v] = (0, o.useState)(!1),
                    y = null == f ? void 0 : f.id;
                  (0, d.useTemplateConfirmationAlerts)(f);
                  const { hasAlerts: T } = (0, s.default)(y),
                    k = (0, o.useCallback)(() => {
                      v(!0);
                    }, [v]),
                    x = (0, o.useCallback)(() => {
                      v(!1);
                    }, [v]),
                    w = (0, o.useCallback)(() => {
                      x(), n();
                    }, [x, n]),
                    E = (0, m.useAlertsActions)(x, f);
                  return o.default.createElement(
                    c.AlertMetricsProvider,
                    {
                      metrics: {
                        trackAlertActionClicked: p,
                        trackAlertRender: p,
                        trackInlineAlertClicked: p,
                      },
                    },
                    o.default.createElement(
                      i.AlertActionHandlerProvider,
                      { onProcessAction: E },
                      o.default.createElement(
                        h.Provider,
                        { value: { hasAlerts: T, showAlertsModal: k } },
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          g &&
                            o.default.createElement(l.MultipleAlertModal, {
                              ownerId: y,
                              onFinalAcknowledgeClick: w,
                              onClose: x,
                              showCloseIcon: !1,
                              displayAllAlerts: !0,
                            }),
                          e
                        )
                      )
                    )
                  );
                };
                n.useTemplateAlertContext = () => {
                  const e = (0, o.useContext)(h);
                  if (!e)
                    throw new Error(
                      'useTemplateAlertContext must be used within an TemplateAlertContextProvider'
                    );
                  return e;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/alerts/TemplateAlertContext.tsx',
      },
    ],
    [
      7269,
      {
        '../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../selectors': 7601,
        '../../hooks/useConfirmationNavigation': 7327,
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
                  (n.useAlertsActions = void 0);
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../components/app/confirm/info/row/constants'),
                  s = e('../../hooks/useConfirmationNavigation'),
                  i = e('../../../../selectors');
                n.useAlertsActions = (e, t) => {
                  const n = (0, o.useSelector)(e =>
                      (0, i.getApprovalsByOrigin)(e, null == t ? void 0 : t.origin)
                    ),
                    { getIndex: c, navigateToIndex: l } = (0, s.useConfirmationNavigation)(),
                    u = (0, a.useCallback)(() => {
                      var a;
                      const { id: o } = t,
                        r = null == n ? void 0 : n.filter(e => e.id !== o),
                        s = c(null === (a = r[0]) || void 0 === a ? void 0 : a.id);
                      l(s), e();
                    }, [c, t, n, e, l]);
                  return (0, a.useCallback)(
                    e => {
                      if (e === r.AlertActionKey.ShowPendingConfirmation) u();
                      else console.error('Unknown alert action key:', e);
                    },
                    [u]
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/alerts/useAlertsActions.tsx',
      },
    ],
    [
      7270,
      {
        '../../../../ducks/confirm-alerts/confirm-alerts': 6852,
        './useUpdateEthereumChainAlerts': 7271,
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
                  (n.useTemplateConfirmationAlerts = void 0);
                var a = e('react-redux'),
                  o = e('react'),
                  r = e('../../../../ducks/confirm-alerts/confirm-alerts'),
                  s = e('./useUpdateEthereumChainAlerts');
                n.useTemplateConfirmationAlerts = e => {
                  const t = (0, a.useDispatch)(),
                    n = (0, s.useUpdateEthereumChainAlerts)(e),
                    i = (0, o.useMemo)(() => n, [n]),
                    c = null == e ? void 0 : e.id;
                  (0, o.useEffect)(() => {
                    t((0, r.updateAlerts)(c, i));
                  }, [i, c, t]),
                    (0, o.useEffect)(
                      () => () => {
                        t((0, r.clearAlerts)(c));
                      },
                      [c, t]
                    );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/alerts/useTemplateConfirmationAlerts.ts',
      },
    ],
    [
      7271,
      {
        '../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
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
                  (n.useUpdateEthereumChainAlerts = function (e) {
                    var t;
                    const n = (0, r.useSelector)(t =>
                        (0, c.getApprovalsByOrigin)(t, null == e ? void 0 : e.origin)
                      ),
                      d = (0, l.useI18nContext)();
                    return (0, o.useMemo)(() => {
                      var t;
                      return (null == n ? void 0 : n.length) <= 1 ||
                        (!u.includes(e.type) &&
                          !0 !==
                            (null == e ||
                            null === (t = e.requestData) ||
                            void 0 === t ||
                            null === (t = t.metadata) ||
                            void 0 === t
                              ? void 0
                              : t.isSwitchEthereumChain))
                        ? []
                        : [
                            {
                              actions: [
                                {
                                  key: s.AlertActionKey.ShowPendingConfirmation,
                                  label: d('reviewPendingTransactions'),
                                },
                              ],
                              key: 'pendingConfirmationFromSameOrigin',
                              message: d(
                                e.type === a.ApprovalType.AddEthereumChain
                                  ? 'pendingConfirmationAddNetworkAlertMessage'
                                  : 'pendingConfirmationSwitchNetworkAlertMessage',
                                [n.length - 1]
                              ),
                              reason: d('areYouSure'),
                              severity: i.Severity.Warning,
                            },
                          ];
                    }, [
                      null == e ? void 0 : e.type,
                      null == e || null === (t = e.requestData) || void 0 === t
                        ? void 0
                        : t.metadata,
                      null == n ? void 0 : n.length,
                      d,
                    ]);
                  });
                var a = e('@metamask/controller-utils'),
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../../components/app/confirm/info/row/constants'),
                  i = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../selectors'),
                  l = e('../../../../hooks/useI18nContext');
                const u = [a.ApprovalType.AddEthereumChain, a.ApprovalType.SwitchEthereumChain];
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/alerts/useUpdateEthereumChainAlerts.ts',
      },
    ],
    [
      7272,
      {
        '../../../../../components/component-library': 6402,
        '../../alerts/TemplateAlertContext': 7268,
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
                var a = c(e('react')),
                  o = c(e('prop-types')),
                  r = c(e('classnames')),
                  s = e('../../../../../components/component-library'),
                  i = e('../../alerts/TemplateAlertContext');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function l({
                  onSubmit: e,
                  onCancel: t,
                  submitText: n,
                  cancelText: o,
                  loadingText: c,
                  alerts: l,
                  loading: u,
                  submitAlerts: d,
                  actionsStyle: m,
                  style: f,
                }) {
                  const { hasAlerts: p, showAlertsModal: h } = (0, i.useTemplateAlertContext)(),
                    g = Boolean(t || e);
                  return a.default.createElement(
                    'div',
                    { className: 'confirmation-footer', style: f },
                    l,
                    d,
                    g &&
                      a.default.createElement(
                        'div',
                        { className: 'confirmation-footer__actions', style: m },
                        t
                          ? a.default.createElement(
                              s.Button,
                              {
                                block: !0,
                                'data-testid': 'confirmation-cancel-button',
                                variant: s.ButtonVariant.Secondary,
                                onClick: t,
                                size: s.ButtonSize.Lg,
                              },
                              o
                            )
                          : null,
                        e && n
                          ? a.default.createElement(
                              s.Button,
                              {
                                block: !0,
                                'data-testid': 'confirmation-submit-button',
                                disabled: Boolean(u),
                                onClick: p ? h : e,
                                className: (0, r.default)({ centered: !t }),
                                startIconName: p ? s.IconName.Info : undefined,
                                size: s.ButtonSize.Lg,
                              },
                              u ? c : n
                            )
                          : null
                      )
                  );
                }
                l.propTypes = {
                  alerts: o.default.node,
                  onCancel: o.default.func,
                  cancelText: o.default.string,
                  onSubmit: o.default.func.isRequired,
                  submitText: o.default.string.isRequired,
                  loadingText: o.default.string,
                  loading: o.default.bool,
                  submitAlerts: o.default.node,
                  style: o.default.object,
                  actionsStyle: o.default.object,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/components/confirmation-footer/confirmation-footer.js',
      },
    ],
    [
      7273,
      { './confirmation-footer': 7272 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./confirmation-footer')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/components/confirmation-footer/index.js',
      },
    ],
    [
      7274,
      {
        '../../../../../../shared/constants/network': 5804,
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
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
                var a = c(e('react')),
                  o = c(e('prop-types')),
                  r = e('../../../../../components/component-library'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../../shared/constants/network');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const l = e => ({
                  ...e,
                  name: e.name ?? i.NETWORK_TO_NAME_MAP[e.chainId],
                  iconUrl: e.iconUrl ?? i.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[e.chainId],
                });
                function u({ toNetwork: e, fromNetwork: t }) {
                  const n = l(t),
                    o = l(e);
                  return a.default.createElement(
                    r.Box,
                    {
                      className: 'confirmation-network-switch',
                      display: s.Display.Flex,
                      height: s.BlockSize.Full,
                      justifyContent: s.JustifyContent.center,
                      marginTop: 8,
                    },
                    a.default.createElement(
                      r.Box,
                      { className: 'confirmation-network-switch__icon', display: s.Display.Block },
                      a.default.createElement(r.AvatarNetwork, {
                        src: n.iconUrl,
                        name: n.name,
                        size: r.AvatarNetworkSize.Xl,
                        marginBottom: 2,
                      }),
                      a.default.createElement(
                        r.Text,
                        {
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.center,
                          'data-testid': 'network-switch-from-network',
                        },
                        n.name
                      )
                    ),
                    a.default.createElement(
                      r.Box,
                      {
                        className: 'confirmation-network-switch__center-icon',
                        display: s.Display.Flex,
                        alignItems: s.AlignItems.center,
                        justifyContent: s.JustifyContent.center,
                      },
                      a.default.createElement('i', {
                        className: 'fa fa-angle-right fa-lg confirmation-network-switch__check',
                      }),
                      a.default.createElement('div', {
                        className: 'confirmation-network-switch__dashed-line',
                      })
                    ),
                    a.default.createElement(
                      r.Box,
                      { className: 'confirmation-network-switch__icon', display: s.Display.Block },
                      a.default.createElement(r.AvatarNetwork, {
                        src: o.iconUrl,
                        name: o.name,
                        size: r.AvatarNetworkSize.Xl,
                        marginBottom: 2,
                      }),
                      a.default.createElement(
                        r.Text,
                        {
                          display: s.Display.Flex,
                          justifyContent: s.JustifyContent.center,
                          'data-testid': 'network-switch-to-network',
                        },
                        o.name
                      )
                    )
                  );
                }
                u.propTypes = {
                  toNetwork: o.default.shape({
                    chainId: o.default.string.isRequired,
                    name: o.default.string.isRequired,
                  }),
                  fromNetwork: o.default.shape({
                    chainId: o.default.string.isRequired,
                    name: o.default.string.isRequired,
                  }),
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/components/confirmation-network-switch/confirmation-network-switch.js',
      },
    ],
    [
      7275,
      { './confirmation-network-switch': 7274 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./confirmation-network-switch')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/confirmation/components/confirmation-network-switch/index.js',
      },
    ],
    [
      7276,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/lib/fetch-with-cache': 5834,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/app/metamask-template-renderer': 6045,
        '../../../components/app/snaps/snap-authorship-header': 6159,
        '../../../components/app/snaps/snap-ui-renderer': 6263,
        '../../../components/component-library': 6402,
        '../../../components/ui/callout': 6709,
        '../../../components/ui/loading-screen': 6765,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../components/confirm/nav': 7197,
        '../components/confirmation-warning-modal': 7218,
        '../context/confirm': 7294,
        '../hooks/useConfirmationNavigation': 7327,
        './alerts/TemplateAlertContext': 7268,
        './components/confirmation-footer': 7273,
        './templates': 7282,
        '@metamask/controller-utils': 1515,
        '@metamask/snaps-rpc-methods': 2733,
        immer: 4715,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = G);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = F(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = D(e('prop-types')),
                  r = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('lodash'),
                  c = e('immer'),
                  l = D(e('loglevel')),
                  u = e('@metamask/controller-utils'),
                  d = e('@metamask/snaps-rpc-methods'),
                  m = e('../../../../shared/constants/network'),
                  f = D(e('../../../../shared/lib/fetch-with-cache')),
                  p = e('../../../../shared/constants/metametrics'),
                  h = D(e('../../../components/app/metamask-template-renderer')),
                  g = D(e('../components/confirmation-warning-modal')),
                  v = e('../../../helpers/constants/routes'),
                  y = e('../../../hooks/useI18nContext'),
                  T = e('../../../contexts/metametrics'),
                  k = e('../../../selectors'),
                  x = e('../../../../shared/modules/selectors/networks'),
                  w = D(e('../../../components/ui/callout')),
                  E = e('../../../components/component-library'),
                  _ = D(e('../../../components/ui/loading-screen')),
                  b = D(e('../../../components/app/snaps/snap-authorship-header')),
                  C = e('../../../components/app/snaps/snap-ui-renderer'),
                  A = e('../../../../shared/constants/app'),
                  S = e('../../../../shared/constants/time'),
                  N = e('../components/confirm/nav'),
                  P = e('../context/confirm'),
                  M = e('../hooks/useConfirmationNavigation'),
                  I = e('./alerts/TemplateAlertContext'),
                  O = D(e('./components/confirmation-footer')),
                  R = e('./templates');
                function D(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function F(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (F = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const B = Object.values(d.DIALOG_APPROVAL_TYPES),
                  L = (0, c.produce)((e, t) => {
                    var n;
                    switch (t.type) {
                      case 'dismiss':
                        null != e &&
                          null !== (n = e[t.confirmationId]) &&
                          void 0 !== n &&
                          n[t.alertId] &&
                          (e[t.confirmationId][t.alertId].dismissed = !0);
                        break;
                      case 'set':
                        e[t.confirmationId] || (e[t.confirmationId] = {}),
                          t.alerts.forEach(n => {
                            e[t.confirmationId][n.id] = { ...n, dismissed: !1 };
                          });
                        break;
                      default:
                        throw new Error(
                          'You must provide a type when dispatching an action for alertState'
                        );
                    }
                  });
                function j({ confirmation: e, isSnapCustomUIDialog: t, onCancel: n }) {
                  const { count: o } = (0, M.useConfirmationNavigation)(),
                    { origin: s } = e ?? {},
                    i = (0, r.useSelector)(e => (0, k.getHideSnapBranding)(e, s)),
                    c = t && !i;
                  return o <= 1 && !c
                    ? null
                    : a.default.createElement(
                        E.Box,
                        { style: { width: '100%', position: 'relative', overflow: 'hidden' } },
                        a.default.createElement(N.Nav, {
                          confirmationId: null == e ? void 0 : e.id,
                        }),
                        c && a.default.createElement(b.default, { snapId: s, onCancel: n })
                      );
                }
                function G({ redirectToHomeOnZeroConfirmations: e = !0 }) {
                  var t;
                  const n = (0, y.useI18nContext)(),
                    o = (0, a.useContext)(T.MetaMetricsContext),
                    c = (0, r.useDispatch)(),
                    b = (0, s.useHistory)(),
                    N = (0, r.useSelector)(k.getMemoizedUnapprovedTemplatedConfirmations),
                    M = (0, r.useSelector)(k.getUnapprovedTxCount),
                    D = (0, r.useSelector)(k.getApprovalFlows, i.isEqual),
                    F = (0, r.useSelector)(k.getTotalUnapprovedCount),
                    G = (0, r.useSelector)(k.useSafeChainsListValidationSelector),
                    $ = (0, r.useSelector)(x.getNetworkConfigurationsByChainId),
                    [W, U] = (0, a.useState)(null),
                    { id: H } = (0, s.useParams)(),
                    V = N.find(e => e.id === H) ?? N[0],
                    [z, q] = (0, a.useState)({}),
                    [K, Y] = (0, a.useState)(!1),
                    Q = (null == V ? void 0 : V.type) === u.ApprovalType.AddEthereumChain && !K,
                    [J, X] = (0, a.useState)(null),
                    [Z, ee] = (0, a.useState)(null),
                    [te, ne] = (function (
                      e,
                      {
                        unapprovedTxsCount: t,
                        useSafeChainsListValidation: n,
                        matchedChain: o,
                        providerError: r,
                        preventAlertsForAddChainValidation: s = !1,
                      } = {}
                    ) {
                      const [i, c] = (0, a.useReducer)(L, {});
                      return (
                        (0, a.useEffect)(() => {
                          let a = !0;
                          return (
                            e &&
                              !s &&
                              (0, R.getTemplateAlerts)(e, {
                                unapprovedTxsCount: t,
                                useSafeChainsListValidation: n,
                                matchedChain: o,
                                providerError: r,
                              }).then(t => {
                                a &&
                                  t.length > 0 &&
                                  c({ type: 'set', confirmationId: e.id, alerts: t });
                              }),
                            () => {
                              a = !1;
                            }
                          );
                        }, [e, t, n, o, r, s]),
                        [
                          i,
                          (0, a.useCallback)(
                            t => {
                              c({ type: 'dismiss', confirmationId: e.id, alertId: t });
                            },
                            [e]
                          ),
                        ]
                      );
                    })(V, {
                      unapprovedTxsCount: M,
                      useSafeChainsListValidation: G,
                      matchedChain: z,
                      providerError: Z,
                      preventAlertsForAddChainValidation: Q,
                    }),
                    [ae] = (function (e) {
                      const [t, n] = (0, a.useState)({});
                      return (
                        (0, a.useEffect)(() => {
                          let t = !0;
                          return (
                            e &&
                              (0, R.getTemplateState)(e).then(a => {
                                t && Object.values(a).length > 0 && n(t => ({ ...t, [e.id]: a }));
                              }),
                            () => {
                              t = !1;
                            }
                          );
                        }, [e]),
                        [t]
                      );
                    })(V),
                    [oe, re] = (0, a.useState)(!1),
                    [se, ie] = (0, a.useState)({}),
                    [ce, le] = (0, a.useState)(!1),
                    [ue, de] = (0, a.useState)(),
                    [me, fe] = (0, a.useState)([]),
                    pe =
                      null ===
                        (t = (0, r.useSelector)(k.getSnapsMetadata)[
                          null == V ? void 0 : V.origin
                        ]) || void 0 === t
                        ? void 0
                        : t.name,
                    he = Object.values(d.DIALOG_APPROVAL_TYPES);
                  he.push(...Object.values(A.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES));
                  const ge = he.includes(null == V ? void 0 : V.type),
                    ve = B.includes(null == V ? void 0 : V.type),
                    ye = (null == V ? void 0 : V.type) === u.ApprovalType.SnapDialogPrompt,
                    Te = (null == V ? void 0 : V.type) === d.DIALOG_APPROVAL_TYPES.default,
                    ke = ge && pe,
                    xe = [u.ApprovalType.SnapDialogPrompt],
                    we = (0, a.useMemo)(() => {
                      var e;
                      return V
                        ? (0, R.getTemplateValues)(
                            { snapName: ge && ke, ...V },
                            n,
                            c,
                            b,
                            {
                              matchedChain: z,
                              currencySymbolWarning: J,
                              existingNetworkConfiguration:
                                null == $
                                  ? void 0
                                  : $[
                                      null === (e = V.requestData) || void 0 === e
                                        ? void 0
                                        : e.chainId
                                    ],
                            },
                            { t: n, trackEvent: o }
                          )
                        : {};
                    }, [V, n, c, b, z, J, o, ge, ke, $]);
                  if (
                    ((0, a.useEffect)(() => {
                      we.onLoad && we.onLoad();
                    }, [we]),
                    (0, a.useEffect)(() => {
                      0 !== N.length ||
                        (0 !== D.length && 0 === F) ||
                        !e ||
                        b.push(v.DEFAULT_ROUTE);
                    }, [N, D, F, b, e]),
                    (0, a.useEffect)(() => {
                      const e = D[D.length - 1];
                      U((null == e ? void 0 : e.loadingText) ?? null);
                    }, [D]),
                    (0, a.useEffect)(() => {
                      (null == V ? void 0 : V.type) === u.ApprovalType.AddEthereumChain &&
                        (async function (e) {
                          try {
                            if (G) {
                              var t, a;
                              const r = (
                                await (0, f.default)({
                                  url: m.CHAIN_SPEC_URL,
                                  allowStale: !0,
                                  cacheOptions: { cacheRefreshTime: S.DAY },
                                  functionName: 'getSafeChainsList',
                                })
                              ).find(t => t.chainId === parseInt(e.requestData.chainId, 16));
                              var o;
                              q(r),
                                Y(!0),
                                ee(null),
                                (null == r ||
                                null === (t = r.nativeCurrency) ||
                                void 0 === t ||
                                null === (t = t.symbol) ||
                                void 0 === t
                                  ? void 0
                                  : t.toLowerCase()) ===
                                (null === (a = e.requestData.ticker) || void 0 === a
                                  ? void 0
                                  : a.toLowerCase())
                                  ? X(null)
                                  : X(
                                      n('chainListReturnedDifferentTickerSymbol', [
                                        null == r || null === (o = r.nativeCurrency) || void 0 === o
                                          ? void 0
                                          : o.symbol,
                                      ])
                                    );
                            }
                          } catch (e) {
                            l.default.warn('Failed to fetch the chainList from chainid.network', e),
                              ee(e),
                              q(null),
                              X(null),
                              Y(!0);
                          }
                        })(V);
                    }, [V, n, G, Y]),
                    !V)
                  )
                    return D.length > 0
                      ? a.default.createElement(_.default, { loadingMessage: W })
                      : null;
                  const Ee = e => {
                      (null == e ? void 0 : e.length) > 0
                        ? (de(we.submitText), fe(e), le(!0))
                        : le(!1);
                    },
                    _e = async () => {
                      var e, t, n, a;
                      if (
                        (le(!0),
                        null != V &&
                          null !== (e = V.requestData) &&
                          void 0 !== e &&
                          null !== (e = e.fromNetworkConfiguration) &&
                          void 0 !== e &&
                          e.chainId &&
                          null != V &&
                          null !== (t = V.requestData) &&
                          void 0 !== t &&
                          null !== (t = t.toNetworkConfiguration) &&
                          void 0 !== t &&
                          t.chainId &&
                          o({
                            category: p.MetaMetricsEventCategory.Network,
                            event: p.MetaMetricsEventName.NavNetworkSwitched,
                            properties: {
                              location: 'Switch Modal',
                              from_network: V.requestData.fromNetworkConfiguration.chainId,
                              to_network: V.requestData.toNetworkConfiguration.chainId,
                              referrer: { url: window.location.origin },
                            },
                          }),
                        null !== (n = ae[V.id]) && void 0 !== n && n.useWarningModal)
                      )
                        re(!0);
                      else {
                        const e =
                            ((a = V.type), xe.includes(a) ? (e => se[e] ?? '')(V.type) : null),
                          t = await we.onSubmit(e);
                        Ee(t);
                      }
                    },
                    be =
                      we.onCancel ||
                      ((null == V ? void 0 : V.type) === u.ApprovalType.SnapDialogAlert
                        ? _e
                        : null);
                  return a.default.createElement(
                    P.ConfirmContextProvider,
                    null,
                    a.default.createElement(
                      I.TemplateAlertContextProvider,
                      { confirmationId: V.id, onSubmit: !we.hideSubmitButton && _e },
                      a.default.createElement(
                        'div',
                        { className: 'confirmation-page' },
                        a.default.createElement(j, {
                          confirmation: V,
                          isSnapCustomUIDialog: ve,
                          onCancel: be,
                        }),
                        a.default.createElement(
                          E.Box,
                          {
                            className: 'confirmation-page__content',
                            padding: ve ? 0 : 4,
                            style: { overflowY: 'auto' },
                          },
                          ve
                            ? a.default.createElement(C.SnapUIRenderer, {
                                snapId: null == V ? void 0 : V.origin,
                                interfaceId: null == V ? void 0 : V.requestData.id,
                                isPrompt: ye,
                                inputValue: ye && se[null == V ? void 0 : V.type],
                                onInputChange:
                                  ye &&
                                  (e => {
                                    return (
                                      (t = null == V ? void 0 : V.type),
                                      (n = e.target.value ?? ''),
                                      void ie(e => ({ ...e, [t]: n }))
                                    );
                                    var t, n;
                                  }),
                                placeholder: ye && (null == V ? void 0 : V.requestData.placeholder),
                                onCancel: be,
                                useFooter: Te,
                              })
                            : a.default.createElement(h.default, { sections: we.content }),
                          oe &&
                            a.default.createElement(g.default, {
                              onSubmit: async () => {
                                const e = await we.onSubmit();
                                await Ee(e), re(!1);
                              },
                              onCancel: we.onCancel,
                            })
                        ),
                        !Te &&
                          a.default.createElement(O.default, {
                            alerts:
                              te[V.id] &&
                              Object.values(te[V.id])
                                .filter(e => !1 === e.dismissed)
                                .map((e, t, n) =>
                                  a.default.createElement(
                                    w.default,
                                    {
                                      key: e.id,
                                      severity: e.severity,
                                      dismiss: () => ne(e.id),
                                      isFirst: 0 === t,
                                      isLast: t === n.length - 1,
                                      isMultiple: n.length > 1,
                                    },
                                    a.default.createElement(h.default, { sections: e.content })
                                  )
                                ),
                            style: ge
                              ? { boxShadow: 'var(--shadow-size-lg) var(--color-shadow-default)' }
                              : {},
                            actionsStyle: ge ? { borderTop: 0 } : {},
                            onSubmit: !we.hideSubmitButton && _e,
                            onCancel: we.onCancel,
                            submitText: we.submitText,
                            cancelText: we.cancelText,
                            loadingText: ue || we.loadingText,
                            loading: ce,
                            submitAlerts: me.map((e, t) =>
                              a.default.createElement(
                                w.default,
                                { key: e.id, severity: e.severity, isFirst: 0 === t },
                                a.default.createElement(h.default, { sections: e.content })
                              )
                            ),
                          })
                      )
                    )
                  );
                }
                G.propTypes = { redirectToHomeOnZeroConfirmations: o.default.bool };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/confirmation/confirmation.js' },
    ],
    [
      7277,
      { './confirmation': 7276 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./confirmation')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/confirmation/index.js' },
    ],
    [
      7294,
      {
        '../../hooks/syncConfirmPath': 7319,
        '../../hooks/useCurrentConfirmation': 7330,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useConfirmContext = n.ConfirmContextProvider = n.ConfirmContext = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = i(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = s(e('../../hooks/useCurrentConfirmation')),
                  r = s(e('../../hooks/syncConfirmPath'));
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const c = (n.ConfirmContext = (0, a.createContext)(undefined));
                n.ConfirmContextProvider = ({ children: e }) => {
                  const [t, n] = (0, a.useState)(!0),
                    { currentConfirmation: s } = (0, o.default)();
                  (0, r.default)(s);
                  const i = (0, a.useMemo)(
                    () => ({
                      currentConfirmation: s,
                      isScrollToBottomCompleted: t,
                      setIsScrollToBottomCompleted: n,
                    }),
                    [s, t, n]
                  );
                  return a.default.createElement(c.Provider, { value: i }, e);
                };
                n.useConfirmContext = () => {
                  const e = (0, a.useContext)(c);
                  if (!e)
                    throw new Error(
                      'useConfirmContext must be used within an ConfirmContextProvider'
                    );
                  return e;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/context/confirm/index.tsx' },
    ],
    [
      7295,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AlertsName = void 0);
                n.AlertsName = (function (e) {
                  return (
                    (e.GasEstimateFailed = 'gasEstimateFailed'),
                    (e.GasFeeLow = 'gasFeeLow'),
                    (e.GasTooLow = 'gasTooLow'),
                    (e.InsufficientBalance = 'insufficientBalance'),
                    (e.NetworkBusy = 'networkBusy'),
                    (e.NoGasPrice = 'noGasPrice'),
                    (e.PendingTransaction = 'pendingTransactions'),
                    (e.SigningOrSubmitting = 'signingOrSubmitting'),
                    (e.Blockaid = 'blockaid'),
                    e
                  );
                })({});
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/alerts/constants.ts' },
    ],
    [
      7296,
      {
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../components/confirm/utils': 7216,
        '../../../context/confirm': 7294,
        '../../../utils': 7364,
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
                    var e;
                    const t = (0, s.useI18nContext)(),
                      { currentConfirmation: n } = (0, l.useConfirmContext)(),
                      { from: u } = (0, i.getConfirmationSender)(n),
                      d = (0, c.isSIWESignatureRequest)(n),
                      m =
                        null == n ||
                        null === (e = n.msgParams) ||
                        void 0 === e ||
                        null === (e = e.siwe) ||
                        void 0 === e ||
                        null === (e = e.parsedMessage) ||
                        void 0 === e
                          ? void 0
                          : e.address,
                      f =
                        (null == m ? void 0 : m.toLowerCase()) !==
                        (null == u ? void 0 : u.toLowerCase()),
                      p = d && f;
                    return (0, a.useMemo)(
                      () =>
                        p
                          ? [
                              {
                                field: o.RowAlertKey.SigningInWith,
                                key: 'signingInWith',
                                message: t('alertMessageSignInWrongAccount'),
                                reason: t('alertReasonWrongAccount'),
                                severity: r.Severity.Warning,
                              },
                            ]
                          : [],
                      [p, t]
                    );
                  });
                var a = e('react'),
                  o = e('../../../../../components/app/confirm/info/row/constants'),
                  r = e('../../../../../helpers/constants/design-system'),
                  s = e('../../../../../hooks/useI18nContext'),
                  i = e('../../../components/confirm/utils'),
                  c = e('../../../utils'),
                  l = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/signatures/useAccountMismatchAlerts.ts',
      },
    ],
    [
      7297,
      {
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
        '../../../utils': 7364,
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
                  (n.default = function () {
                    const e = (0, i.useI18nContext)(),
                      { currentConfirmation: t } = (0, l.useConfirmContext)(),
                      { msgParams: n } = t || {},
                      u = (0, c.isSIWESignatureRequest)(t) && !(0, o.isValidSIWEOrigin)(n);
                    return (0, a.useMemo)(
                      () =>
                        u
                          ? [
                              {
                                field: r.RowAlertKey.RequestFrom,
                                key: 'requestFrom',
                                message: e('alertMessageSignInDomainMismatch'),
                                reason: e('alertReasonSignIn'),
                                severity: s.Severity.Danger,
                              },
                            ]
                          : [],
                      [u, e]
                    );
                  });
                var a = e('react'),
                  o = e('@metamask/controller-utils'),
                  r = e('../../../../../components/app/confirm/info/row/constants'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../utils'),
                  l = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/signatures/useDomainMismatchAlerts.ts',
      },
    ],
    [
      7298,
      {
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
        '../../../send/send.utils': 7362,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NonContractAddressAlertMessage = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('../../../../../components/component-library'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../context/confirm'),
                  l = e('../../../send/send.utils');
                n.NonContractAddressAlertMessage = e => {
                  const t = (0, i.useI18nContext)(),
                    { currentConfirmation: n } = (0, c.useConfirmContext)(),
                    a = (null == n ? void 0 : n.chainId) && e[n.chainId].name,
                    u = (0, l.ellipsify)(null == n ? void 0 : n.txParams.to);
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      r.Text,
                      {
                        variant: s.TextVariant.bodyMd,
                        color: s.TextColor.textDefault,
                        'data-testid': 'alert-modal__selected-alert',
                      },
                      t('nonContractAddressAlertDesc')
                    ),
                    o.default.createElement(
                      r.Text,
                      {
                        variant: s.TextVariant.bodyMd,
                        color: s.TextColor.textDefault,
                        marginTop: 2,
                        'data-testid': 'alert-modal__selected-alert',
                      },
                      o.default.createElement('strong', null, 'Network:'),
                      ' ',
                      a
                    ),
                    o.default.createElement(
                      r.Text,
                      {
                        variant: s.TextVariant.bodyMd,
                        color: s.TextColor.textDefault,
                        'data-testid': 'alert-modal__selected-alert',
                      },
                      o.default.createElement('strong', null, 'Address:'),
                      ' ',
                      u
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/NonContractAddressAlertMessage.tsx',
      },
    ],
    [
      7299,
      {
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/constants/zendesk-url': 6885,
        '../../../../../hooks/useI18nContext': 6985,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.PendingTransactionAlertMessage = void 0);
                var a = c(e('react')),
                  o = e('../../../../../components/component-library'),
                  r = e('../../../../../helpers/constants/design-system'),
                  s = c(e('../../../../../helpers/constants/zendesk-url')),
                  i = e('../../../../../hooks/useI18nContext');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.PendingTransactionAlertMessage = () => {
                  const e = (0, i.useI18nContext)();
                  return a.default.createElement(
                    o.Text,
                    {
                      variant: r.TextVariant.bodyMd,
                      color: r.TextColor.textDefault,
                      'data-testid': 'alert-modal__selected-alert',
                    },
                    e('pendingTransactionAlertMessage', [
                      a.default.createElement(
                        o.ButtonLink,
                        {
                          href: s.default.SPEEDUP_CANCEL,
                          key: 'link',
                          target: '_blank',
                          rel: 'noreferrer noopener',
                          color: r.TextColor.primaryDefault,
                        },
                        e('pendingTransactionAlertMessageHyperlink')
                      ),
                    ])
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/PendingTransactionAlertMessage.tsx',
      },
    ],
    [
      7300,
      {
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../components/confirm/info/hooks/useTransferRecipient': 7145,
        '../../../context/confirm': 7294,
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
                  (n.useFirstTimeInteractionAlert = function () {
                    const e = (0, r.useI18nContext)(),
                      { currentConfirmation: t } = (0, c.useConfirmContext)(),
                      n = (0, o.useSelector)(l.getInternalAccounts),
                      d = (0, u.useTransferRecipient)(),
                      { isFirstTimeInteraction: m } = t ?? {},
                      f =
                        !n.some(e => {
                          var t;
                          return (
                            (null === (t = e.address) || void 0 === t
                              ? void 0
                              : t.toLowerCase()) === (null == d ? void 0 : d.toLowerCase())
                          );
                        }) && m;
                    return (0, a.useMemo)(
                      () =>
                        f
                          ? [
                              {
                                actions: [],
                                field: i.RowAlertKey.InteractingWith,
                                isBlocking: !1,
                                key: 'firstTimeInteractionTitle',
                                message: e('alertMessageFirstTimeInteraction'),
                                reason: e('alertReasonFirstTimeInteraction'),
                                severity: s.Severity.Warning,
                              },
                            ]
                          : [],
                      [f, e]
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../../hooks/useI18nContext'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../components/app/confirm/info/row/constants'),
                  c = e('../../../context/confirm'),
                  l = e('../../../../../selectors'),
                  u = e('../../../components/confirm/info/hooks/useTransferRecipient');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useFirstTimeInteractionAlert.ts',
      },
    ],
    [
      7301,
      {
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGasEstimateFailedAlerts = function () {
                    const e = (0, r.useI18nContext)(),
                      { currentConfirmation: t } = (0, i.useConfirmContext)(),
                      n = Boolean(null == t ? void 0 : t.simulationFails);
                    return (0, a.useMemo)(
                      () =>
                        n
                          ? [
                              {
                                actions: [
                                  {
                                    key: s.AlertActionKey.ShowAdvancedGasFeeModal,
                                    label: e('alertActionUpdateGas'),
                                  },
                                ],
                                field: s.RowAlertKey.EstimatedFee,
                                key: 'gasEstimateFailed',
                                message: e('alertMessageGasEstimateFailed'),
                                reason: e('alertReasonGasEstimateFailed'),
                                severity: o.Severity.Warning,
                              },
                            ]
                          : [],
                      [n]
                    );
                  });
                var a = e('react'),
                  o = e('../../../../../helpers/constants/design-system'),
                  r = e('../../../../../hooks/useI18nContext'),
                  s = e('../../../../../components/app/confirm/info/row/constants'),
                  i = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useGasEstimateFailedAlerts.ts',
      },
    ],
    [
      7302,
      {
        '../../../../../../shared/constants/gas': 5795,
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../contexts/gasFee': 6831,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGasFeeLowAlerts = function () {
                    const e = (0, i.useI18nContext)(),
                      { currentConfirmation: t } = (0, l.useConfirmContext)(),
                      { id: n } = t ?? {},
                      { estimateUsed: u, transaction: d } = (0, o.useGasFeeContext)(),
                      m = n === (null == d ? void 0 : d.id) && u === s.PriorityLevels.low;
                    return (0, a.useMemo)(
                      () =>
                        m
                          ? [
                              {
                                actions: [
                                  {
                                    key: c.AlertActionKey.ShowGasFeeModal,
                                    label: e('alertActionUpdateGasFeeLevel'),
                                  },
                                ],
                                field: c.RowAlertKey.EstimatedFee,
                                key: 'gasFeeLow',
                                message: e('alertMessageGasFeeLow'),
                                reason: e('alertReasonGasFeeLow'),
                                severity: r.Severity.Warning,
                              },
                            ]
                          : [],
                      [m]
                    );
                  });
                var a = e('react'),
                  o = e('../../../../../contexts/gasFee'),
                  r = e('../../../../../helpers/constants/design-system'),
                  s = e('../../../../../../shared/constants/gas'),
                  i = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../../../components/app/confirm/info/row/constants'),
                  l = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useGasFeeLowAlerts.ts',
      },
    ],
    [
      7303,
      {
        '../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
        '../../../send/send.constants': 7361,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGasTooLowAlerts = function () {
                    var e;
                    const t = (0, i.useI18nContext)(),
                      { currentConfirmation: n } = (0, l.useConfirmContext)(),
                      u = null == n || null === (e = n.txParams) || void 0 === e ? void 0 : e.gas,
                      d = u && Number((0, r.hexToDecimal)(u)) < Number(o.MIN_GAS_LIMIT_DEC);
                    return (0, a.useMemo)(
                      () =>
                        d
                          ? [
                              {
                                actions: [
                                  {
                                    key: c.AlertActionKey.ShowAdvancedGasFeeModal,
                                    label: t('alertActionUpdateGas'),
                                  },
                                ],
                                field: c.RowAlertKey.EstimatedFee,
                                isBlocking: !0,
                                key: 'gasTooLow',
                                message: t('alertMessageGasTooLow'),
                                reason: t('alertReasonGasTooLow'),
                                severity: s.Severity.Warning,
                              },
                            ]
                          : [],
                      [d]
                    );
                  });
                var a = e('react'),
                  o = e('../../../send/send.constants'),
                  r = e('../../../../../../shared/modules/conversion.utils'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../../../components/app/confirm/info/row/constants'),
                  l = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useGasTooLowAlerts.ts',
      },
    ],
    [
      7304,
      {
        '../../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../../../selectors/multichain': 7605,
        '../../../context/confirm': 7294,
        '../../../send/send.utils': 7362,
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
                  (n.useInsufficientBalanceAlerts = function () {
                    var e;
                    const t = (0, c.useI18nContext)(),
                      { currentConfirmation: n } = (0, d.useConfirmContext)(),
                      { id: f, chainId: p, selectedGasFeeToken: h } = n ?? {},
                      g =
                        (null == n || null === (e = n.nestedTransactions) || void 0 === e
                          ? void 0
                          : e.map(e => e.value ?? 0)) ?? [],
                      v = (0, o.useSelector)(e =>
                        (0, r.selectTransactionAvailableBalance)(e, f, p)
                      ),
                      y = (0, o.useSelector)(e => (0, r.selectTransactionValue)(e, f)),
                      T = (0, m.sumHexes)(y, ...g),
                      { hexMaximumTransactionFee: k } = (0, o.useSelector)(e =>
                        (0, r.selectTransactionFeeById)(e, f)
                      ),
                      x = (0, o.useSelector)(s.getMultichainNativeCurrency),
                      w = !(0, i.isBalanceSufficient)({ amount: T, gasTotal: k, balance: v }) && !h;
                    return (0, a.useMemo)(
                      () =>
                        w
                          ? [
                              {
                                actions: [
                                  {
                                    key: u.AlertActionKey.Buy,
                                    label: t('alertActionBuyWithNativeCurrency', [x]),
                                  },
                                ],
                                field: u.RowAlertKey.EstimatedFee,
                                isBlocking: !0,
                                key: 'insufficientBalance',
                                message: t('alertMessageInsufficientBalanceWithNativeCurrency', [
                                  x,
                                ]),
                                reason: t('alertReasonInsufficientBalance'),
                                severity: l.Severity.Danger,
                              },
                            ]
                          : [],
                      [x, w, t]
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../../selectors'),
                  s = e('../../../../../selectors/multichain'),
                  i = e('../../../send/send.utils'),
                  c = e('../../../../../hooks/useI18nContext'),
                  l = e('../../../../../helpers/constants/design-system'),
                  u = e('../../../../../components/app/confirm/info/row/constants'),
                  d = e('../../../context/confirm'),
                  m = e('../../../../../../shared/modules/conversion.utils');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useInsufficientBalanceAlerts.ts',
      },
    ],
    [
      7305,
      {
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../ducks/metamask/metamask': 6860,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
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
                  (n.useNetworkBusyAlerts = function () {
                    const e = (0, s.useI18nContext)(),
                      { currentConfirmation: t } = (0, l.useConfirmContext)(),
                      n = (0, o.useSelector)(e =>
                        (0, c.getIsNetworkBusyByChainId)(e, null == t ? void 0 : t.chainId)
                      ),
                      u = (null == t ? void 0 : t.chainId) && n;
                    return (0, a.useMemo)(
                      () =>
                        u
                          ? [
                              {
                                field: i.RowAlertKey.EstimatedFee,
                                key: 'networkBusy',
                                message: e('alertMessageNetworkBusy'),
                                reason: e('alertReasonNetworkBusy'),
                                severity: r.Severity.Warning,
                              },
                            ]
                          : [],
                      [u]
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../../helpers/constants/design-system'),
                  s = e('../../../../../hooks/useI18nContext'),
                  i = e('../../../../../components/app/confirm/info/row/constants'),
                  c = e('../../../../../ducks/metamask/metamask'),
                  l = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useNetworkBusyAlerts.ts',
      },
    ],
    [
      7306,
      {
        '../../../../../../shared/modules/transaction.utils': 5880,
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../context/confirm': 7294,
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
                  (n.useNoGasPriceAlerts = function () {
                    const e = (0, u.useI18nContext)(),
                      t = (0, a.useSelector)(l.getNoGasPriceFetched),
                      { currentConfirmation: n } = (0, d.useConfirmContext)(),
                      m =
                        (null == n ? void 0 : n.userFeeLevel) &&
                        n.userFeeLevel !== o.UserFeeLevel.CUSTOM &&
                        !(0, s.txParamsAreDappSuggested)(n) &&
                        t;
                    return (0, r.useMemo)(
                      () =>
                        m
                          ? [
                              {
                                actions: [
                                  {
                                    key: c.AlertActionKey.ShowAdvancedGasFeeModal,
                                    label: e('alertActionUpdateGasFee'),
                                  },
                                ],
                                field: c.RowAlertKey.EstimatedFee,
                                isBlocking: !0,
                                key: 'noGasPrice',
                                message: e('alertMessageNoGasPrice'),
                                reason: e('alertReasonNoGasPrice'),
                                severity: i.Severity.Warning,
                              },
                            ]
                          : [],
                      [m]
                    );
                  });
                var a = e('react-redux'),
                  o = e('@metamask/transaction-controller'),
                  r = e('react'),
                  s = e('../../../../../../shared/modules/transaction.utils'),
                  i = e('../../../../../helpers/constants/design-system'),
                  c = e('../../../../../components/app/confirm/info/row/constants'),
                  l = e('../../../../../selectors'),
                  u = e('../../../../../hooks/useI18nContext'),
                  d = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useNoGasPriceAlerts.ts',
      },
    ],
    [
      7307,
      {
        '../../../../../../shared/modules/contract-utils': 5857,
        '../../../../../../shared/modules/selectors/networks': 5875,
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useAsync': 6969,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../components/confirm/info/hooks/useIsUpgradeTransaction': 7138,
        '../../../context/confirm': 7294,
        './NonContractAddressAlertMessage': 7298,
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
                  (n.useNonContractAddressAlerts = function () {
                    var e, t, n;
                    const h = (0, d.useI18nContext)(),
                      { currentConfirmation: g } = (0, m.useConfirmContext)(),
                      v = (0, r.useSelector)(i.getNetworkConfigurationsByChainId),
                      y = (0, f.useIsUpgradeTransaction)(),
                      T =
                        (null == g || null === (e = g.txParams) || void 0 === e
                          ? void 0
                          : e.data) !== undefined &&
                        '0x' !==
                          (null == g || null === (t = g.txParams) || void 0 === t
                            ? void 0
                            : t.data),
                      { value: k, pending: x } = (0, u.useAsyncResult)(async () => {
                        var e;
                        return await (0, s.readAddressAsContract)(
                          global.ethereumProvider,
                          (null == g || null === (e = g.txParams) || void 0 === e
                            ? void 0
                            : e.to) || '0x'
                        );
                      }, [null == g || null === (n = g.txParams) || void 0 === n ? void 0 : n.to]),
                      w = !x && !1 === (null == k ? void 0 : k.isContractAddress),
                      E = (null == g ? void 0 : g.type) === a.TransactionType.deployContract,
                      _ = T && w && !E;
                    return (0, o.useMemo)(
                      () =>
                        !_ || y
                          ? []
                          : [
                              {
                                field: c.RowAlertKey.InteractingWith,
                                isBlocking: !1,
                                key: 'hexDataWhileInteractingWithNonContractAddress',
                                reason: h('nonContractAddressAlertTitle'),
                                content: (0, p.NonContractAddressAlertMessage)(v),
                                severity: l.Severity.Warning,
                              },
                            ],
                      [_, y]
                    );
                  });
                var a = e('@metamask/transaction-controller'),
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../../../../shared/modules/contract-utils'),
                  i = e('../../../../../../shared/modules/selectors/networks'),
                  c = e('../../../../../components/app/confirm/info/row/constants'),
                  l = e('../../../../../helpers/constants/design-system'),
                  u = e('../../../../../hooks/useAsync'),
                  d = e('../../../../../hooks/useI18nContext'),
                  m = e('../../../context/confirm'),
                  f = e('../../../components/confirm/info/hooks/useIsUpgradeTransaction'),
                  p = e('./NonContractAddressAlertMessage');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useNonContractAddressAlerts.ts',
      },
    ],
    [
      7308,
      {
        '../../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../context/confirm': 7294,
        './PendingTransactionAlertMessage': 7299,
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
                  (n.usePendingTransactionAlerts = function () {
                    const e = (0, c.useI18nContext)(),
                      { currentConfirmation: t } = (0, u.useConfirmContext)(),
                      { type: n } = t ?? {},
                      m = (0, o.useSelector)(l.submittedPendingTransactionsSelector),
                      f = (0, r.isCorrectDeveloperTransactionType)(n) && Boolean(m.length);
                    return (0, a.useMemo)(
                      () =>
                        f
                          ? [
                              {
                                field: s.RowAlertKey.Speed,
                                key: 'pendingTransactions',
                                content: (0, d.PendingTransactionAlertMessage)(),
                                reason: e('alertReasonPendingTransactions'),
                                severity: i.Severity.Warning,
                              },
                            ]
                          : [],
                      [f]
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../../../shared/lib/confirmation.utils'),
                  s = e('../../../../../components/app/confirm/info/row/constants'),
                  i = e('../../../../../helpers/constants/design-system'),
                  c = e('../../../../../hooks/useI18nContext'),
                  l = e('../../../../../selectors'),
                  u = e('../../../context/confirm'),
                  d = e('./PendingTransactionAlertMessage');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/usePendingTransactionAlerts.ts',
      },
    ],
    [
      7309,
      {
        '../../../../../../shared/constants/metametrics': 5800,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../useQueuedConfirmationEvents': 7345,
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
                  (n.useQueuedConfirmationsAlerts = function () {
                    const e = (0, i.useI18nContext)(),
                      t = (0, o.useSelector)(c.getQueuedRequestCount) > 0;
                    return (
                      (0, l.useQueuedConfirmationsEvent)(r.QueueType.QueueController),
                      (0, a.useMemo)(
                        () =>
                          t
                            ? [
                                {
                                  isBlocking: !1,
                                  key: 'queuedConfirmations',
                                  message: e('existingRequestsBannerAlertDesc'),
                                  severity: s.Severity.Info,
                                },
                              ]
                            : [],
                        [t]
                      )
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../../../shared/constants/metametrics'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../../../selectors'),
                  l = e('../../useQueuedConfirmationEvents');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useQueuedConfirmationsAlerts.ts',
      },
    ],
    [
      7310,
      {
        '../../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../context/confirm': 7294,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useResimulationAlert = function () {
                    var e;
                    const t = (0, o.useI18nContext)(),
                      { currentConfirmation: n } = (0, i.useConfirmContext)(),
                      c =
                        null == n || null === (e = n.simulationData) || void 0 === e
                          ? void 0
                          : e.isUpdatedAfterSecurityCheck;
                    return (0, a.useMemo)(
                      () =>
                        c
                          ? [
                              {
                                actions: [],
                                field: s.RowAlertKey.Resimulation,
                                isBlocking: !1,
                                key: 'simulationDetailsTitle',
                                message: t('alertMessageChangeInSimulationResults'),
                                reason: t('alertReasonChangeInSimulationResults'),
                                severity: r.Severity.Danger,
                              },
                            ]
                          : [],
                      [c, t]
                    );
                  });
                var a = e('react'),
                  o = e('../../../../../hooks/useI18nContext'),
                  r = e('../../../../../helpers/constants/design-system'),
                  s = e('../../../../../components/app/confirm/info/row/constants'),
                  i = e('../../../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useResimulationAlert.ts',
      },
    ],
    [
      7311,
      {
        '../../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../hooks/useI18nContext': 6985,
        '../../../../../selectors': 7601,
        '../../../context/confirm': 7294,
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
                  (n.useSigningOrSubmittingAlerts = function () {
                    const e = (0, i.useI18nContext)(),
                      { currentConfirmation: t } = (0, c.useConfirmContext)(),
                      { type: n } = t ?? {},
                      u = (0, o.useSelector)(r.getApprovedAndSignedTransactions),
                      d = (0, l.isCorrectDeveloperTransactionType)(n) && u.length > 0;
                    return (0, a.useMemo)(
                      () =>
                        d
                          ? [
                              {
                                isBlocking: !0,
                                key: 'signingOrSubmitting',
                                message: e('isSigningOrSubmitting'),
                                severity: s.Severity.Danger,
                              },
                            ]
                          : [],
                      [d]
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../../selectors'),
                  s = e('../../../../../helpers/constants/design-system'),
                  i = e('../../../../../hooks/useI18nContext'),
                  c = e('../../../context/confirm'),
                  l = e('../../../../../../shared/lib/confirmation.utils');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/transactions/useSigningOrSubmittingAlerts.ts',
      },
    ],
    [
      7312,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/constants/security-provider': 5811,
        '../../../../../shared/lib/confirmation.utils': 5832,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../hooks/useI18nContext': 6985,
        '../../context/confirm': 7294,
        '../../utils': 7364,
        '../useCurrentSignatureSecurityAlertResponse': 7331,
        './utils': 7316,
        '@blockaid/ppom_release/package.json': 423,
        react: 5328,
        'react-redux': 5286,
        zlib: 4133,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = h(e('@blockaid/ppom_release/package.json')),
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../../../shared/constants/network'),
                  i = e('../../../../../shared/constants/security-provider'),
                  c = h(e('../../../../helpers/constants/zendesk-url')),
                  l = e('../../../../hooks/useI18nContext'),
                  u = e('../../utils'),
                  d = e('../../../../../shared/lib/confirmation.utils'),
                  m = e('../../context/confirm'),
                  f = h(e('../useCurrentSignatureSecurityAlertResponse')),
                  p = e('./utils');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const g = e('zlib'),
                  v = [i.BlockaidResultType.Benign, i.BlockaidResultType.Loading];
                n.default = () => {
                  var e;
                  const t = (0, l.useI18nContext)(),
                    { currentConfirmation: n } = (0, m.useConfirmContext)(),
                    h =
                      null == n || null === (e = n.securityAlertResponse) || void 0 === e
                        ? void 0
                        : e.securityAlertId,
                    y = null == n ? void 0 : n.type,
                    T = (0, f.default)(),
                    k = (0, r.useSelector)(e => {
                      var t;
                      return null ===
                        (t = e.metamask.transactions.find(e => {
                          var t;
                          return (
                            (null === (t = e.securityAlertResponse) || void 0 === t
                              ? void 0
                              : t.securityAlertId) === h
                          );
                        })) || void 0 === t
                        ? void 0
                        : t.securityAlertResponse;
                    }),
                    x = T || k,
                    w =
                      (0, d.isCorrectDeveloperTransactionType)(y) ||
                      u.SIGNATURE_TRANSACTION_TYPES.includes(y),
                    E = v.includes(null == x ? void 0 : x.result_type);
                  let _;
                  if (x && n) {
                    const { block: e, features: t, reason: o, result_type: r } = x,
                      { chainId: c, msgParams: l, origin: u, type: d, txParams: m } = n,
                      f = r === i.BlockaidResultType.Errored,
                      p = {
                        blockNumber: e,
                        blockaidVersion: a.default.version,
                        chain: s.NETWORK_TO_NAME_MAP[c],
                        classification: f ? 'error' : o,
                        domain: u ?? (null == l ? void 0 : l.origin) ?? u,
                        jsonRpcMethod: d,
                        jsonRpcParams: JSON.stringify(m ?? l),
                        resultType: f ? i.BlockaidResultType.Errored : r,
                        reproduce: JSON.stringify(t),
                      };
                    _ = JSON.stringify(p);
                  }
                  return (0, o.useMemo)(() => {
                    if (!w || E || !x) return [];
                    let e = c.default.SUPPORT_URL;
                    if (_) {
                      var n;
                      const t =
                        (null == g || null === (n = g.gzipSync) || void 0 === n
                          ? void 0
                          : n.call(g, _)) ?? _;
                      e = `${i.FALSE_POSITIVE_REPORT_BASE_URL}?data=${encodeURIComponent(t.toString('base64'))}&utm_source=${i.SECURITY_PROVIDER_UTM_SOURCE}`;
                    }
                    return [(0, p.normalizeProviderAlert)(x, t, e)];
                  }, [w, E, x, _, t]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/alerts/useBlockaidAlerts.ts' },
    ],
    [
      7313,
      {
        '../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../context/confirm': 7294,
        '../../utils': 7364,
        '../../utils/confirm': 7363,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react'),
                  o = e('../../../../components/app/confirm/info/row/constants'),
                  r = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext'),
                  i = e('../../utils/confirm'),
                  c = e('../../utils'),
                  l = e('../../context/confirm');
                n.default = () => {
                  var e;
                  const t = (0, s.useI18nContext)(),
                    { currentConfirmation: n } = (0, l.useConfirmContext)(),
                    u = (0, c.isSignatureTransactionType)(n)
                      ? null == n || null === (e = n.msgParams) || void 0 === e
                        ? void 0
                        : e.origin
                      : null == n
                        ? void 0
                        : n.origin,
                    d = u === undefined || 'metamask' === u || (0, i.isValidASCIIURL)(u);
                  return (0, a.useMemo)(
                    () =>
                      d
                        ? []
                        : [
                            {
                              key: 'originSpecialCharacterWarning',
                              reason: t('addressMismatch'),
                              field: o.RowAlertKey.RequestFrom,
                              severity: r.Severity.Warning,
                              message: t('alertMessageAddressMismatchWarning'),
                              alertDetails: [
                                t('addressMismatchOriginal', [u]),
                                t('addressMismatchPunycode', [u ? (0, i.toPunycodeURL)(u) : '']),
                              ],
                            },
                          ],
                    [u, d, t]
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/useConfirmationOriginAlerts.ts',
      },
    ],
    [
      7314,
      {
        '../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../context/confirm': 7294,
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
                  (n.useNetworkAndOriginSwitchingAlerts = void 0);
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../components/app/confirm/info/row/constants'),
                  s = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../store/actions'),
                  c = e('../../../../selectors'),
                  l = e('../../../../hooks/useI18nContext'),
                  u = e('../../context/confirm');
                n.useNetworkAndOriginSwitchingAlerts = () => {
                  var e;
                  const t = (0, l.useI18nContext)(),
                    { currentConfirmation: n } = (0, u.useConfirmContext)(),
                    { chainId: d = '', id: m } = n ?? {},
                    f =
                      (null == n ? void 0 : n.origin) ??
                      (null == n || null === (e = n.msgParams) || void 0 === e
                        ? void 0
                        : e.origin) ??
                      '',
                    p = (0, o.useSelector)(e => (0, c.selectNetworkConfigurationByChainId)(e, d)),
                    [h, g] = (0, a.useState)();
                  (0, a.useEffect)(() => {
                    let e = !0;
                    return (
                      (async () => {
                        const t = await (0, i.getLastInteractedConfirmationInfo)();
                        if (!e) return;
                        g(t);
                        (!t || (null == t ? void 0 : t.id) !== m) &&
                          (0, i.setLastInteractedConfirmationInfo)({
                            id: m,
                            chainId: d,
                            origin: f,
                            timestamp: new Date().getTime(),
                          });
                      })(),
                      () => {
                        e = !1;
                      }
                    );
                  }, [m, d, f, g]);
                  return (0, a.useMemo)(() => {
                    if (!m || !h) return [];
                    const e = [];
                    if (!(new Date().getTime() - h.timestamp <= 6e4)) return [];
                    const { chainId: n, origin: a } = h;
                    return (
                      n !== d &&
                        e.push({
                          key: 'networkSwitchInfo',
                          reason: t('networkChanged'),
                          field: r.RowAlertKey.Network,
                          severity: s.Severity.Info,
                          message: t('networkChangedMessage', [
                            (null == p ? void 0 : p.name) ?? '',
                          ]),
                        }),
                      a !== f &&
                        e.push({
                          key: 'originSwitchInfo',
                          reason: t('originChanged'),
                          field: r.RowAlertKey.RequestFrom,
                          severity: s.Severity.Info,
                          message: t('originChangedMessage', [f ?? '']),
                        }),
                      e
                    );
                  }, [m, h, null == p ? void 0 : p.name, d, f, t]);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/useNetworkAndOriginSwitchingAlerts.ts',
      },
    ],
    [
      7315,
      {
        '../../../../components/app/confirm/info/row/constants': 5977,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../context/confirm': 7294,
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
                  (n.useSelectedAccountAlerts = void 0);
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../components/app/confirm/info/row/constants'),
                  s = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../selectors'),
                  c = e('../../../../hooks/useI18nContext'),
                  l = e('../../context/confirm');
                n.useSelectedAccountAlerts = () => {
                  var e, t, n;
                  const u = (0, c.useI18nContext)(),
                    { currentConfirmation: d } = (0, l.useConfirmContext)(),
                    m = (0, o.useSelector)(i.getSelectedAccount),
                    f =
                      (null == d || null === (e = d.msgParams) || void 0 === e ? void 0 : e.from) ??
                      (null == d || null === (t = d.txParams) || void 0 === t ? void 0 : t.from),
                    p =
                      !f ||
                      f.toLowerCase() ===
                        (null == m || null === (n = m.address) || void 0 === n
                          ? void 0
                          : n.toLowerCase());
                  return (0, a.useMemo)(
                    () =>
                      p
                        ? []
                        : [
                            {
                              key: 'selectedAccountWarning',
                              reason: u('selectedAccountMismatch'),
                              field: r.RowAlertKey.SigningInWith,
                              severity: s.Severity.Warning,
                              message: u('alertSelectedAccountWarning'),
                            },
                          ],
                    [p, u]
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/alerts/useSelectedAccountAlerts.ts',
      },
    ],
    [
      7316,
      {
        '../../../../../shared/constants/security-provider': 5811,
        '../../../../helpers/constants/design-system': 6872,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.REASON_TO_TITLE_TKEY = n.REASON_TO_DESCRIPTION_TKEY = void 0),
                  (n.getProviderAlertSeverity = i),
                  (n.normalizeProviderAlert = function (e, t, n) {
                    return {
                      key: e.securityAlertId || '',
                      reason: t(s[e.reason] || 'blockaidTitleDeceptive'),
                      severity: i(e.result_type),
                      alertDetails: e.features,
                      message: t(r[e.reason] || r.other),
                      provider: a.SecurityProvider.Blockaid,
                      reportUrl: n,
                    };
                  });
                var a = e('../../../../../shared/constants/security-provider'),
                  o = e('../../../../helpers/constants/design-system');
                const r = (n.REASON_TO_DESCRIPTION_TKEY = Object.freeze({
                    [a.BlockaidReason.approvalFarming]: 'blockaidDescriptionApproveFarming',
                    [a.BlockaidReason.permitFarming]: 'blockaidDescriptionApproveFarming',
                    [a.BlockaidReason.setApprovalForAll]: 'blockaidDescriptionApproveFarming',
                    [a.BlockaidReason.blurFarming]: 'blockaidDescriptionBlurFarming',
                    [a.BlockaidReason.errored]: 'blockaidDescriptionErrored',
                    [a.BlockaidReason.seaportFarming]: 'blockaidDescriptionSeaportFarming',
                    [a.BlockaidReason.maliciousDomain]: 'blockaidDescriptionMaliciousDomain',
                    [a.BlockaidReason.rawSignatureFarming]: 'blockaidDescriptionMightLoseAssets',
                    [a.BlockaidReason.tradeOrderFarming]: 'blockaidDescriptionMightLoseAssets',
                    [a.BlockaidReason.rawNativeTokenTransfer]: 'blockaidDescriptionTransferFarming',
                    [a.BlockaidReason.transferFarming]: 'blockaidDescriptionTransferFarming',
                    [a.BlockaidReason.transferFromFarming]: 'blockaidDescriptionTransferFarming',
                    [a.BlockaidReason.other]: 'blockaidDescriptionMightLoseAssets',
                  })),
                  s = (n.REASON_TO_TITLE_TKEY = Object.freeze({
                    [a.BlockaidReason.errored]: 'blockaidTitleMayNotBeSafe',
                    [a.BlockaidReason.rawSignatureFarming]: 'blockaidTitleSuspicious',
                  }));
                function i(e) {
                  switch (e) {
                    case a.BlockaidResultType.Malicious:
                      return o.Severity.Danger;
                    case a.BlockaidResultType.Warning:
                      return o.Severity.Warning;
                    default:
                      return o.Severity.Info;
                  }
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/alerts/utils.ts' },
    ],
    [
      7317,
      {
        '../../../../../shared/modules/selectors': 5874,
        '../../../../hooks/useAsync': 6969,
        '../../../../store/controller-actions/transaction-controller': 7621,
        '../../context/confirm': 7294,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIsGaslessSupported = function () {
                    const { currentConfirmation: e } = (0, i.useConfirmContext)(),
                      t = (0, a.useSelector)(o.getIsSmartTransaction),
                      { chainId: n, txParams: c } = e,
                      { from: l } = c,
                      { value: u } = (0, r.useAsyncResult)(
                        async () => (0, s.isAtomicBatchSupported)({ address: l, chainIds: [n] }),
                        [n, l]
                      ),
                      d =
                        (null == u || u.find(e => e.chainId.toLowerCase() === n.toLowerCase()), t);
                    return d || null;
                  });
                var a = e('react-redux'),
                  o = e('../../../../../shared/modules/selectors'),
                  r = e('../../../../hooks/useAsync'),
                  s = e('../../../../store/controller-actions/transaction-controller'),
                  i = e('../../context/confirm');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/gas/useIsGaslessSupported.ts' },
    ],
    [
      7318,
      {
        '../../../ducks/confirm-alerts/confirm-alerts': 6852,
        '../context/confirm': 7294,
        './useConfirmationAlerts': 7326,
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
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../ducks/confirm-alerts/confirm-alerts'),
                  i = e('../context/confirm'),
                  c = (a = e('./useConfirmationAlerts')) && a.__esModule ? a : { default: a };
                n.default = () => {
                  const e = (0, r.useDispatch)(),
                    { currentConfirmation: t } = (0, i.useConfirmContext)(),
                    n = (0, c.default)(),
                    a = null == t ? void 0 : t.id;
                  (0, o.useEffect)(() => {
                    e((0, s.updateAlerts)(a, n));
                  }, [n, a]),
                    (0, o.useEffect)(
                      () => () => {
                        e((0, s.clearAlerts)(a));
                      },
                      []
                    );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/setConfirmationAlerts.ts' },
    ],
    [
      7319,
      { './useConfirmationNavigation': 7327, react: 5328, 'react-router-dom': 5313 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react'),
                  o = e('react-router-dom'),
                  r = e('./useConfirmationNavigation');
                n.default = e => {
                  const { navigateToId: t } = (0, r.useConfirmationNavigation)(),
                    { id: n } = (0, o.useParams)(),
                    s = null == e ? void 0 : e.id;
                  (0, a.useEffect)(() => {
                    s && (n || t(s));
                  }, [s, n, t]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/syncConfirmPath.ts' },
    ],
    [
      7320,
      {
        '../../../../../shared/modules/selectors': 5874,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        '../../components/confirm/info/hooks/useGasFeeToken': 7137,
        '../../context/confirm': 7294,
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
                  (n.useTransactionConfirm = function () {
                    const e = (0, a.useDispatch)(),
                      t = (0, a.useSelector)(s.getCustomNonceValue),
                      n = (0, c.useSelectedGasFeeToken)(),
                      d = (0, a.useSelector)(u.getIsSmartTransaction),
                      { currentConfirmation: m } = (0, i.useConfirmContext)(),
                      f = (0, r.useMemo)(() => (0, o.cloneDeep)(m), [m]),
                      p = (0, r.useCallback)(() => {
                        n &&
                          ((f.batchTransactions = [n.transferTransaction]),
                          (f.txParams.gas = n.gas),
                          (f.txParams.maxFeePerGas = n.maxFeePerGas),
                          (f.txParams.maxPriorityFeePerGas = n.maxPriorityFeePerGas));
                      }, [n, f]),
                      h = (0, r.useCallback)(() => {
                        f.isExternalSign = !0;
                      }, [f]);
                    return {
                      onTransactionConfirm: (0, r.useCallback)(async () => {
                        (f.customNonceValue = t),
                          d ? p() : n && h(),
                          await e((0, l.updateAndApproveTx)(f, !0, ''));
                      }, [e, h, p, d, f, t]),
                    };
                  });
                var a = e('react-redux'),
                  o = e('lodash'),
                  r = e('react'),
                  s = e('../../../../selectors'),
                  i = e('../../context/confirm'),
                  c = e('../../components/confirm/info/hooks/useGasFeeToken'),
                  l = e('../../../../store/actions'),
                  u = e('../../../../../shared/modules/selectors');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/transactions/useTransactionConfirm.ts',
      },
    ],
    [
      7321,
      {
        '../../../../shared/modules/string-utils': 5878,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/utils/token-util': 6918,
        '../../../hooks/usePrevious': 7002,
        '../../../hooks/useTokenTracker': 7017,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
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
                  (n.useAssetDetails = function (e, t, n, f) {
                    const p = (0, r.useDispatch)(),
                      h = (0, r.useSelector)(e => (0, m.selectNftsByChainId)(e, f)),
                      g = (0, r.useSelector)(s.getTokens, a.isEqual).find(t =>
                        (0, l.isEqualCaseInsensitive)(t.address, e)
                      ),
                      [v, y] = (0, o.useState)(null),
                      { tokensWithBalances: T } = (0, d.useTokenTracker)({ tokens: g ? [g] : [] }),
                      k = (0, u.usePrevious)(e),
                      x = (0, u.usePrevious)(t),
                      w = (0, u.usePrevious)(n),
                      E = (0, u.usePrevious)(T);
                    if (
                      ((0, o.useEffect)(() => {
                        (e || t || n) &&
                          (e !== k || t !== x || n !== w || (E && E !== T)) &&
                          (async function () {
                            p((0, c.showLoadingIndication)());
                            const a = await (0, i.getAssetDetails)(e, t, n, h);
                            y(a), p((0, c.hideLoadingIndication)());
                          })();
                      }, [p, k, w, x, e, t, n, h, T, E]),
                      !e && !t && !n)
                    )
                      return {};
                    if (v) {
                      const {
                        standard: t,
                        symbol: n,
                        image: a,
                        name: o,
                        balance: r,
                        tokenId: s,
                        toAddress: i,
                        tokenAmount: c,
                        decimals: l,
                        tokenURI: u,
                      } = v;
                      return {
                        toAddress: i,
                        tokenId: s,
                        decimals: l,
                        tokenAmount: c,
                        assetAddress: e,
                        assetStandard: t,
                        tokenSymbol: n ?? '',
                        tokenImage: a,
                        userBalance: r,
                        assetName: o,
                        tokenURI: u,
                      };
                    }
                    return {};
                  });
                var a = e('lodash'),
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../ducks/metamask/metamask'),
                  i = e('../../../helpers/utils/token-util'),
                  c = e('../../../store/actions'),
                  l = e('../../../../shared/modules/string-utils'),
                  u = e('../../../hooks/usePrevious'),
                  d = e('../../../hooks/useTokenTracker'),
                  m = e('../../../selectors');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useAssetDetails.js' },
    ],
    [
      7322,
      {
        '../../../hooks/useAsync': 6969,
        '../../../store/actions': 7619,
        '../../../store/controller-actions/transaction-controller': 7621,
        '../context/confirm': 7294,
        './alerts/transactions/useInsufficientBalanceAlerts': 7304,
        './gas/useIsGaslessSupported': 7317,
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
                  (n.useAutomaticGasFeeTokenSelect = function () {
                    var e, t;
                    const n = (0, o.useDispatch)(),
                      d = (0, u.useIsGaslessSupported)(),
                      { currentConfirmation: m } = (0, r.useConfirmContext)(),
                      f = Boolean(
                        null === (e = (0, l.useInsufficientBalanceAlerts)()) || void 0 === e
                          ? void 0
                          : e.length
                      ),
                      { gasFeeTokens: p, id: h, selectedGasFeeToken: g } = m,
                      v =
                        null == p || null === (t = p[0]) || void 0 === t ? void 0 : t.tokenAddress,
                      y = (0, a.useCallback)(async () => {
                        await (0, i.updateSelectedGasFeeToken)(h, v),
                          await (0, c.forceUpdateMetamaskState)(n);
                      }, [n, h, v]),
                      T = d && f && !g && Boolean(v);
                    (0, s.useAsyncResult)(async () => {
                      T && (await y());
                    }, []);
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../context/confirm'),
                  s = e('../../../hooks/useAsync'),
                  i = e('../../../store/controller-actions/transaction-controller'),
                  c = e('../../../store/actions'),
                  l = e('./alerts/transactions/useInsufficientBalanceAlerts'),
                  u = e('./gas/useIsGaslessSupported');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useAutomaticGasFeeTokenSelect.ts' },
    ],
    [
      7323,
      {
        '../../../../shared/constants/network': 5804,
        '../../../hooks/useAccountTotalFiatBalance': 6966,
        '../../../selectors': 7601,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.useBalance = void 0);
                var a = e('react-redux'),
                  o = e('../../../selectors'),
                  r = e('../../../../shared/constants/network'),
                  s = e('../../../hooks/useAccountTotalFiatBalance');
                n.useBalance = e => {
                  const t = (0, a.useSelector)(o.getShouldHideZeroBalanceTokens),
                    n = (0, a.useSelector)(t => (0, o.getInternalAccountByAddress)(t, e)),
                    { totalWeiBalance: i } = (0, s.useAccountTotalFiatBalance)(n, t),
                    c = (0, a.useSelector)(o.getCurrentNetwork),
                    l = (0, a.useSelector)(o.getShowFiatInTestnets),
                    u = r.TEST_NETWORKS.includes(null == c ? void 0 : c.nickname) && !l;
                  let d = i;
                  const m = (0, a.useSelector)(o.getSelectedAccountCachedBalance);
                  return e ? (u && (d = m), { balance: d }) : {};
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useBalance.js' },
    ],
    [
      7324,
      {
        '../../../components/app/confirm/info/row/constants': 5977,
        '../../../contexts/transaction-modal': 6840,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
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
                  o = e('react'),
                  r = e('../../../components/app/confirm/info/row/constants'),
                  s =
                    (a = e('../../../hooks/ramps/useRamps/useRamps')) && a.__esModule
                      ? a
                      : { default: a },
                  i = e('../../../contexts/transaction-modal');
                n.default = () => {
                  const { openBuyCryptoInPdapp: e } = (0, s.default)(),
                    { openModal: t } = (0, i.useTransactionModalContext)();
                  return (0, o.useCallback)(
                    n => {
                      switch (n) {
                        case r.AlertActionKey.Buy:
                          e();
                          break;
                        case r.AlertActionKey.ShowAdvancedGasFeeModal:
                          t('advancedGasFee');
                          break;
                        case r.AlertActionKey.ShowGasFeeModal:
                          t('editGasFee');
                          break;
                        default:
                          console.error('Unknown alert action key:', n);
                      }
                    },
                    [e]
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useConfirmationAlertActions.ts' },
    ],
    [
      7325,
      {
        '../../../hooks/useAlerts': 6968,
        '../context/confirm': 7294,
        '../utils': 7364,
        './alerts/constants': 7295,
        './useSignatureEventFragment': 7346,
        './useTransactionEventFragment': 7350,
        react: 5328,
        uuid: 5733,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ALERTS_NAME_METRICS = void 0),
                  (n.useConfirmationAlertMetrics = function () {
                    const { currentConfirmation: e } = (0, c.useConfirmContext)(),
                      t = (null == e ? void 0 : e.id) ?? '',
                      { alerts: n, isAlertConfirmed: a } = (0, s.default)(t),
                      { updateSignatureEventFragment: r } = (0, u.useSignatureEventFragment)(),
                      { updateTransactionEventFragment: l } = (0, d.useTransactionEventFragment)(),
                      [m, g] = (0, o.useState)({
                        alert_visualized: [],
                        alert_visualized_count: 0,
                        alert_key_clicked: [],
                        alert_action_clicked: [],
                      }),
                      v =
                        n.length > 0
                          ? {
                              alert_triggered_count: n.length,
                              alert_triggered: p(n),
                              alert_resolved_count: n.filter(e => a(e.key)).length,
                              alert_resolved: p(n.filter(e => a(e.key))),
                              ...m,
                            }
                          : undefined,
                      y = (0, o.useCallback)(e => {
                        g(t => {
                          const n = { ...t },
                            a = h(e);
                          return (
                            (n.alert_visualized = f(t.alert_visualized, a)),
                            (n.alert_visualized_count = n.alert_visualized.length),
                            n
                          );
                        });
                      }, []),
                      T = (0, o.useCallback)(e => {
                        g(t => {
                          const n = { ...t },
                            a = h(e);
                          return (n.alert_key_clicked = f(t.alert_key_clicked, a)), n;
                        });
                      }, []),
                      k = (0, o.useCallback)(e => {
                        g(t => {
                          const n = { ...t },
                            a = h(e);
                          return (n.alert_action_clicked = f(t.alert_action_clicked, a)), n;
                        });
                      }, []),
                      x = (0, o.useCallback)(() => {
                        v &&
                          ((0, i.isSignatureTransactionType)(e)
                            ? r({ properties: v })
                            : l({ properties: v }, t));
                      }, [JSON.stringify(v), l, t]);
                    return (
                      (0, o.useEffect)(() => {
                        x();
                      }, [x]),
                      {
                        trackAlertRender: y,
                        trackInlineAlertClicked: T,
                        trackAlertActionClicked: k,
                      }
                    );
                  });
                var a,
                  o = e('react'),
                  r = e('uuid'),
                  s = (a = e('../../../hooks/useAlerts')) && a.__esModule ? a : { default: a },
                  i = e('../utils'),
                  c = e('../context/confirm'),
                  l = e('./alerts/constants'),
                  u = e('./useSignatureEventFragment'),
                  d = e('./useTransactionEventFragment');
                const m = (n.ALERTS_NAME_METRICS = {
                  [l.AlertsName.GasEstimateFailed]: 'gas_estimate_failed',
                  [l.AlertsName.GasFeeLow]: 'gas_fee_low',
                  [l.AlertsName.GasTooLow]: 'gas_too_low',
                  [l.AlertsName.InsufficientBalance]: 'insufficient_balance',
                  [l.AlertsName.NetworkBusy]: 'network_busy',
                  [l.AlertsName.NoGasPrice]: 'no_gas_price',
                  [l.AlertsName.PendingTransaction]: 'pending_transaction',
                  [l.AlertsName.SigningOrSubmitting]: 'signing_or_submitting',
                  [l.AlertsName.Blockaid]: 'blockaid',
                });
                function f(e, t) {
                  return [...new Set([...e, t])];
                }
                function p(e) {
                  return e.map(e => h(e.key));
                }
                function h(e) {
                  return (0, r.validate)(e) ? m[l.AlertsName.Blockaid] : (m[e] ?? e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useConfirmationAlertMetrics.ts' },
    ],
    [
      7326,
      {
        './alerts/signatures/useAccountMismatchAlerts': 7296,
        './alerts/signatures/useDomainMismatchAlerts': 7297,
        './alerts/transactions/useFirstTimeInteractionAlert': 7300,
        './alerts/transactions/useGasEstimateFailedAlerts': 7301,
        './alerts/transactions/useGasFeeLowAlerts': 7302,
        './alerts/transactions/useGasTooLowAlerts': 7303,
        './alerts/transactions/useInsufficientBalanceAlerts': 7304,
        './alerts/transactions/useNetworkBusyAlerts': 7305,
        './alerts/transactions/useNoGasPriceAlerts': 7306,
        './alerts/transactions/useNonContractAddressAlerts': 7307,
        './alerts/transactions/usePendingTransactionAlerts': 7308,
        './alerts/transactions/useQueuedConfirmationsAlerts': 7309,
        './alerts/transactions/useResimulationAlert': 7310,
        './alerts/transactions/useSigningOrSubmittingAlerts': 7311,
        './alerts/useBlockaidAlerts': 7312,
        './alerts/useConfirmationOriginAlerts': 7313,
        './alerts/useNetworkAndOriginSwitchingAlerts': 7314,
        './alerts/useSelectedAccountAlerts': 7315,
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
                    const e = (0, y.default)(),
                      t = (0, v.default)(),
                      n = (function () {
                        const e = (0, o.default)(),
                          t = (0, r.default)();
                        return (0, a.useMemo)(() => [...e, ...t], [e, t]);
                      })(),
                      w = (function () {
                        const e = (0, s.useGasEstimateFailedAlerts)(),
                          t = (0, i.useGasFeeLowAlerts)(),
                          n = (0, c.useGasTooLowAlerts)(),
                          o = (0, l.useInsufficientBalanceAlerts)(),
                          r = (0, u.useNetworkBusyAlerts)(),
                          v = (0, d.useNoGasPriceAlerts)(),
                          y = (0, m.usePendingTransactionAlerts)(),
                          T = (0, p.useResimulationAlert)(),
                          k = (0, h.useFirstTimeInteractionAlert)(),
                          w = (0, g.useSigningOrSubmittingAlerts)(),
                          E = (0, f.useQueuedConfirmationsAlerts)(),
                          _ = (0, x.useNonContractAddressAlerts)();
                        return (0, a.useMemo)(
                          () => [
                            ...e,
                            ...t,
                            ...n,
                            ...o,
                            ...r,
                            ...v,
                            ...y,
                            ...T,
                            ...k,
                            ...w,
                            ...E,
                            ..._,
                          ],
                          [e, t, n, o, r, v, y, T, k, w, E, _]
                        );
                      })(),
                      E = (0, k.useSelectedAccountAlerts)(),
                      _ = (0, T.useNetworkAndOriginSwitchingAlerts)();
                    return (0, a.useMemo)(
                      () => [...e, ...t, ...n, ...w, ...E, ..._],
                      [e, t, n, w, E, _]
                    );
                  });
                var a = e('react'),
                  o = w(e('./alerts/signatures/useAccountMismatchAlerts')),
                  r = w(e('./alerts/signatures/useDomainMismatchAlerts')),
                  s = e('./alerts/transactions/useGasEstimateFailedAlerts'),
                  i = e('./alerts/transactions/useGasFeeLowAlerts'),
                  c = e('./alerts/transactions/useGasTooLowAlerts'),
                  l = e('./alerts/transactions/useInsufficientBalanceAlerts'),
                  u = e('./alerts/transactions/useNetworkBusyAlerts'),
                  d = e('./alerts/transactions/useNoGasPriceAlerts'),
                  m = e('./alerts/transactions/usePendingTransactionAlerts'),
                  f = e('./alerts/transactions/useQueuedConfirmationsAlerts'),
                  p = e('./alerts/transactions/useResimulationAlert'),
                  h = e('./alerts/transactions/useFirstTimeInteractionAlert'),
                  g = e('./alerts/transactions/useSigningOrSubmittingAlerts'),
                  v = w(e('./alerts/useConfirmationOriginAlerts')),
                  y = w(e('./alerts/useBlockaidAlerts')),
                  T = e('./alerts/useNetworkAndOriginSwitchingAlerts'),
                  k = e('./alerts/useSelectedAccountAlerts'),
                  x = e('./alerts/transactions/useNonContractAddressAlerts');
                function w(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useConfirmationAlerts.ts' },
    ],
    [
      7327,
      {
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        '../confirmation/templates': 7282,
        '../utils': 7364,
        '@metamask/controller-utils': 1515,
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
                  (n.navigateToConfirmation = f),
                  (n.useConfirmationNavigation = function () {
                    const e = (0, o.useSelector)(d.selectPendingApprovalsForNavigation),
                      t = (0, o.useSelector)(d.getApprovalFlows, i.isEqual),
                      n = (0, r.useHistory)(),
                      s = (0, a.useCallback)(
                        t => (t ? e.findIndex(({ id: e }) => e === t) : 0),
                        [e]
                      ),
                      c = (0, a.useCallback)(
                        a => {
                          f(a, e, Boolean(null == t ? void 0 : t.length), n);
                        },
                        [e, n]
                      ),
                      l = (0, a.useCallback)(
                        t => {
                          const n = e[t];
                          c(null == n ? void 0 : n.id);
                        },
                        [e, c]
                      ),
                      u = e.length;
                    return {
                      confirmations: e,
                      count: u,
                      getIndex: s,
                      navigateToId: c,
                      navigateToIndex: l,
                    };
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('@metamask/controller-utils'),
                  i = e('lodash'),
                  c = e('../confirmation/templates'),
                  l = e('../../../helpers/constants/routes'),
                  u = e('../utils'),
                  d = e('../../../selectors');
                const m = [
                  s.ApprovalType.WalletRequestPermissions,
                  'wallet_installSnap',
                  'wallet_updateSnap',
                  'wallet_installSnapResult',
                ];
                function f(e, t, n, a) {
                  var o;
                  const r = (null == t ? void 0 : t.length) <= 0 || !e;
                  if (n && r) return void a.replace(`${l.CONFIRMATION_V_NEXT_ROUTE}`);
                  if (r) return;
                  const i = t.find(t => t.id === e);
                  if (!i) return;
                  const d = i.type;
                  if (c.TEMPLATED_CONFIRMATION_APPROVAL_TYPES.includes(d))
                    return void a.replace(`${l.CONFIRMATION_V_NEXT_ROUTE}/${e}`);
                  if ((0, u.isSignatureTransactionType)(i))
                    return void a.replace(
                      `${l.CONFIRM_TRANSACTION_ROUTE}/${e}${l.SIGNATURE_REQUEST_PATH}`
                    );
                  if (d === s.ApprovalType.Transaction)
                    return void a.replace(`${l.CONFIRM_TRANSACTION_ROUTE}/${e}`);
                  if (d === s.ApprovalType.EthDecrypt)
                    return void a.replace(
                      `${l.CONFIRM_TRANSACTION_ROUTE}/${e}${l.DECRYPT_MESSAGE_REQUEST_PATH}`
                    );
                  if (d === s.ApprovalType.EthGetEncryptionPublicKey)
                    return void a.replace(
                      `${l.CONFIRM_TRANSACTION_ROUTE}/${e}${l.ENCRYPTION_PUBLIC_KEY_REQUEST_PATH}`
                    );
                  if (m.includes(d)) return void a.replace(`${l.CONNECT_ROUTE}/${e}`);
                  const f =
                    null == i ||
                    null === (o = i.requestData) ||
                    void 0 === o ||
                    null === (o = o.asset) ||
                    void 0 === o
                      ? void 0
                      : o.tokenId;
                  d !== s.ApprovalType.WatchAsset || f
                    ? d === s.ApprovalType.WatchAsset &&
                      f &&
                      a.replace(`${l.CONFIRM_ADD_SUGGESTED_NFT_ROUTE}`)
                    : a.replace(`${l.CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE}`);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useConfirmationNavigation.ts' },
    ],
    [
      7328,
      {
        '../../../../shared/constants/network': 5804,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../context/confirm': 7294,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  o = e('../../../../shared/constants/network'),
                  r = e('../../../hooks/useI18nContext'),
                  s = e('../context/confirm'),
                  i = e('../../../selectors');
                n.default = function () {
                  const e = (0, r.useI18nContext)(),
                    { currentConfirmation: t } = (0, s.useConfirmContext)(),
                    n = null == t ? void 0 : t.chainId,
                    c = (0, a.useSelector)(e => (0, i.selectNetworkConfigurationByChainId)(e, n));
                  let l = '',
                    u = '';
                  return (
                    t &&
                      ((l =
                        (null == c ? void 0 : c.name) ??
                        o.NETWORK_TO_NAME_MAP[n] ??
                        e('privateNetwork')),
                      (u = o.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[n])),
                    { networkImageUrl: u, networkDisplayName: l }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useConfirmationNetworkInfo.ts' },
    ],
    [
      7329,
      {
        '../../../helpers/utils/util': 6921,
        '../../../selectors': 7601,
        '../components/confirm/utils': 7216,
        '../context/confirm': 7294,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  o = e('../../../helpers/utils/util'),
                  r = e('../../../selectors'),
                  s = e('../components/confirm/utils'),
                  i = e('../context/confirm');
                n.default = function () {
                  const { currentConfirmation: e } = (0, i.useConfirmContext)(),
                    t = (0, a.useSelector)(r.accountsWithSendEtherInfoSelector);
                  let n, c;
                  if (e) {
                    var l;
                    const { from: a } = (0, s.getConfirmationSender)(e),
                      r = (0, o.getAccountByAddress)(t, a);
                    (n = a),
                      (c =
                        null == r || null === (l = r.metadata) || void 0 === l ? void 0 : l.name);
                  }
                  return { senderAddress: n || '', senderName: c || '' };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useConfirmationRecipientInfo.ts' },
    ],
    [
      7330,
      {
        '../../../../shared/lib/confirmation.utils': 5832,
        '../../../selectors': 7601,
        '../../../selectors/signatures': 7612,
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
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('../../../selectors'),
                  i = e('../../../selectors/signatures'),
                  c = e('../../../../shared/lib/confirmation.utils');
                n.default = () => {
                  const { id: e } = (0, r.useParams)(),
                    t = (0, o.useSelector)(s.oldestPendingConfirmationSelector),
                    n = e ?? (null == t ? void 0 : t.id),
                    l = (0, o.useSelector)(e => (0, s.selectPendingApproval)(e, n)),
                    u = (0, o.useSelector)(e => (0, s.getUnapprovedTransaction)(e, n)),
                    d = (0, o.useSelector)(e => (0, i.selectUnapprovedMessage)(e, n)),
                    m = (0, c.shouldUseRedesignForSignatures)({
                      approvalType: null == l ? void 0 : l.type,
                    }),
                    f = (0, c.shouldUseRedesignForTransactions)({
                      transactionMetadataType: null == u ? void 0 : u.type,
                    }),
                    p = m || f;
                  return (0, a.useMemo)(() => {
                    if (!p) return { currentConfirmation: undefined };
                    return { currentConfirmation: u ?? d ?? undefined };
                  }, [u, d, p]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useCurrentConfirmation.ts' },
    ],
    [
      7331,
      { '../context/confirm': 7294, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react-redux'),
                  o = e('../context/confirm');
                n.default = () => {
                  var e;
                  const { currentConfirmation: t } = (0, o.useConfirmContext)(),
                    n =
                      null == t || null === (e = t.securityAlertResponse) || void 0 === e
                        ? void 0
                        : e.securityAlertId;
                  return (0, a.useSelector)(e => {
                    var t;
                    return n === undefined
                      ? undefined
                      : null === (t = e.metamask.signatureSecurityAlertResponses) || void 0 === t
                        ? void 0
                        : t[n];
                  });
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/useCurrentSignatureSecurityAlertResponse.ts',
      },
    ],
    [
      7332,
      {
        '../components/simulation-details/useLoadingTime': 7250,
        '../context/confirm': 7294,
        './useSignatureEventFragment': 7346,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDecodedSignatureMetrics = function (e) {
                    var t;
                    const { updateSignatureEventFragment: n } = (0, s.useSignatureEventFragment)(),
                      { currentConfirmation: c } = (0, o.useConfirmContext)(),
                      { loadingTime: l, setLoadingComplete: u } = (0, r.useLoadingTime)(),
                      { decodingLoading: d, decodingData: m } = c;
                    !1 === d && u();
                    const f = ((null == m ? void 0 : m.stateChanges) ?? []).map(e => e.changeType),
                      p =
                        (null == m || null === (t = m.error) || void 0 === t ? void 0 : t.type) ??
                        (f.length ? i.Change : i.NoChange);
                    (0, a.useEffect)(() => {
                      var t;
                      e &&
                        n(
                          d
                            ? { properties: { decoding_response: i.InProgress } }
                            : {
                                properties: {
                                  decoding_change_types: f,
                                  decoding_description:
                                    (null == m || null === (t = m.error) || void 0 === t
                                      ? void 0
                                      : t.message) ?? null,
                                  decoding_latency: l ?? null,
                                  decoding_response: p,
                                },
                              }
                        );
                    }, [p, d, f, l, n]);
                  });
                var a = e('react'),
                  o = e('../context/confirm'),
                  r = e('../components/simulation-details/useLoadingTime'),
                  s = e('./useSignatureEventFragment'),
                  i = (function (e) {
                    return (
                      (e.Change = 'CHANGE'),
                      (e.NoChange = 'NO_CHANGE'),
                      (e.InProgress = 'decoding_in_progress'),
                      e
                    );
                  })(i || {});
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useDecodedSignatureMetrics.ts' },
    ],
    [
      7333,
      { '../../../ducks/send': 6865, '../../../selectors': 7601, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDraftTransactionWithTxParams = void 0);
                var a = e('react-redux'),
                  o = e('../../../ducks/send'),
                  r = e('../../../selectors');
                n.useDraftTransactionWithTxParams = () => {
                  const e = (0, a.useSelector)(o.getCurrentDraftTransaction),
                    t = (0, a.useSelector)(r.getUnapprovedTransactions);
                  let n = {};
                  if (0 !== Object.keys(e).length) {
                    var s, i, c, l, u, d, m, f, p, h;
                    const a = t[e.id];
                    n = {
                      txParams: {
                        gasPrice: null === (s = e.gas) || void 0 === s ? void 0 : s.gasPrice,
                        gas:
                          null != a && a.userEditedGasLimit
                            ? null == a || null === (i = a.txParams) || void 0 === i
                              ? void 0
                              : i.gas
                            : null === (c = e.gas) || void 0 === c
                              ? void 0
                              : c.gasLimit,
                        maxFeePerGas:
                          null != a && null !== (l = a.txParams) && void 0 !== l && l.maxFeePerGas
                            ? null == a || null === (u = a.txParams) || void 0 === u
                              ? void 0
                              : u.maxFeePerGas
                            : null === (d = e.gas) || void 0 === d
                              ? void 0
                              : d.maxFeePerGas,
                        maxPriorityFeePerGas:
                          null != a &&
                          null !== (m = a.txParams) &&
                          void 0 !== m &&
                          m.maxPriorityFeePerGas
                            ? null == a || null === (f = a.txParams) || void 0 === f
                              ? void 0
                              : f.maxPriorityFeePerGas
                            : null === (p = e.gas) || void 0 === p
                              ? void 0
                              : p.maxPriorityFeePerGas,
                        value: null === (h = e.amount) || void 0 === h ? void 0 : h.value,
                        type: e.transactionType,
                      },
                      userFeeLevel: null == a ? void 0 : a.userFeeLevel,
                    };
                  }
                  return n;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/useDraftTransactionWithTxParams.js',
      },
    ],
    [
      7334,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../store/actions': 7619,
        './useConfirmationNavigation': 7327,
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
                  (n.EIP_7702_REVOKE_ADDRESS = void 0),
                  (n.useEIP7702Account = function ({ onRedirect: e } = {}) {
                    const t = (0, o.useDispatch)(),
                      [n, u] = (0, a.useState)(),
                      { confirmations: d, navigateToId: m } = (0, c.useConfirmationNavigation)(),
                      f = (0, o.useSelector)(i.getSelectedNetworkClientId),
                      p = d.some(e => e.id === n),
                      h = (0, a.useCallback)(
                        async e => {
                          const n = await t(
                            (0, s.addTransactionAndRouteToConfirmationPage)(
                              {
                                authorizationList: [{ address: l }],
                                from: e,
                                to: e,
                                type: r.TransactionEnvelopeType.setCode,
                              },
                              { networkClientId: f, type: r.TransactionType.revokeDelegation }
                            )
                          );
                          u(null == n ? void 0 : n.id);
                        },
                        [t, f]
                      ),
                      g = (0, a.useCallback)(
                        async e => {
                          const t = await (0, s.getCode)(e, f);
                          return (null == t ? void 0 : t.length) > 2;
                        },
                        [f]
                      );
                    return (
                      (0, a.useEffect)(() => {
                        p && (m(n), null == e || e());
                      }, [p, m, n, e]),
                      { isUpgraded: g, downgradeAccount: h }
                    );
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('@metamask/transaction-controller'),
                  s = e('../../../store/actions'),
                  i = e('../../../../shared/modules/selectors/networks'),
                  c = e('./useConfirmationNavigation');
                const l = (n.EIP_7702_REVOKE_ADDRESS =
                  '0x0000000000000000000000000000000000000000');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useEIP7702Account.ts' },
    ],
    [
      7335,
      {
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/gas.utils': 5863,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../hooks/useCurrencyDisplay': 6974,
        '../../../hooks/useUserPreferencedCurrency': 7020,
        '../../../selectors': 7601,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGasEstimates = function ({
                    editGasMode: e,
                    gasEstimateType: t,
                    gasFeeEstimates: n,
                    gasLimit: m,
                    gasPrice: f,
                    maxFeePerGas: p,
                    maxPriorityFeePerGas: h,
                    minimumGasLimit: g,
                    transaction: v,
                  }) {
                    const y =
                        (0, a.useSelector)(e =>
                          (0, i.checkNetworkAndAccountSupports1559)(
                            e,
                            null == v ? void 0 : v.networkClientId
                          )
                        ) && !(0, c.isLegacyTransaction)(null == v ? void 0 : v.txParams),
                      { currency: T, numberOfDecimals: k } = (0, u.useUserPreferencedCurrency)(
                        s.PRIMARY
                      );
                    let x = {
                      gasLimit: (0, d.decimalToHex)(m),
                      gasLimitNoBuffer: null == v ? void 0 : v.gasLimitNoBuffer,
                    };
                    x = y
                      ? {
                          ...x,
                          maxFeePerGas: (0, d.decGWEIToHexWEI)(p || f || '0'),
                          maxPriorityFeePerGas: (0, d.decGWEIToHexWEI)(h || p || f || '0'),
                          baseFeePerGas: (0, d.decGWEIToHexWEI)(
                            (null == n ? void 0 : n.estimatedBaseFee) ?? '0'
                          ),
                        }
                      : {
                          ...x,
                          gasPrice:
                            t === o.GasEstimateTypes.none ? '0x0' : (0, d.decGWEIToHexWEI)(f),
                        };
                    const w = (0, r.getMaximumGasTotalInHexWei)(x);
                    e === o.EditGasModes.swaps && (x = { ...x, gasLimit: g });
                    const E = (0, r.getMinimumGasTotalInHexWei)(x),
                      [_] = (0, l.useCurrencyDisplay)(E, { numberOfDecimals: k, currency: T });
                    return {
                      estimatedMinimumNative: _,
                      maximumCostInHexWei: w,
                      minimumCostInHexWei: E,
                    };
                  });
                var a = e('react-redux'),
                  o = e('../../../../shared/constants/gas'),
                  r = e('../../../../shared/modules/gas.utils'),
                  s = e('../../../helpers/constants/common'),
                  i = e('../../../selectors'),
                  c = e('../../../helpers/utils/transactions.util'),
                  l = e('../../../hooks/useCurrencyDisplay'),
                  u = e('../../../hooks/useUserPreferencedCurrency'),
                  d = e('../../../../shared/modules/conversion.utils');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useGasEstimates.js' },
    ],
    [
      7336,
      {
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/modules/Numeric': 5853,
        '../../../helpers/constants/gas': 6874,
        '../../../helpers/constants/transactions': 6884,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../helpers/utils/util': 6921,
        '../../../selectors': 7601,
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
                  (n.useGasFeeErrors = function ({
                    gasEstimateType: e,
                    gasFeeEstimates: t,
                    isGasEstimatesLoading: n,
                    gasLimit: l,
                    gasPrice: u,
                    maxPriorityFeePerGas: d,
                    maxFeePerGas: k,
                    minimumCostInHexWei: x,
                    minimumGasLimit: w,
                    transaction: E,
                  }) {
                    const _ =
                        (0, o.useSelector)(i.checkNetworkAndAccountSupports1559) &&
                        !(0, c.isLegacyTransaction)(null == E ? void 0 : E.txParams),
                      b = e === s.GasEstimateTypes.feeMarket,
                      C = f(l, w),
                      A = p(d, _),
                      S = h(k, A, d, _),
                      N = g(b, u, _, E),
                      P = v(t, b, n, d, _),
                      M = y(t, n, b, S, A, k, _),
                      I = (0, a.useMemo)(() => {
                        const e = {};
                        return (
                          C && (e.gasLimit = C),
                          A && (e.maxPriorityFee = A),
                          S && (e.maxFee = S),
                          N && (e.gasPrice = N),
                          e
                        );
                      }, [C, A, S, N]),
                      O = (0, a.useMemo)(() => {
                        const e = {};
                        return P && (e.maxPriorityFee = P), M && (e.maxFee = M), e;
                      }, [P, M]),
                      R = Boolean(Object.keys(I).length),
                      D = (0, a.useMemo)(() => ({ ...O, ...I }), [I, O]),
                      F = (0, o.useSelector)(e => {
                        var t;
                        return (0, i.getTargetAccount)(
                          e,
                          null == E || null === (t = E.txParams) || void 0 === t ? void 0 : t.from
                        );
                      }, o.shallowEqual),
                      B =
                        F !== undefined &&
                        (null == E ? void 0 : E.type) !== r.TransactionType.incoming &&
                        (null == E ? void 0 : E.status) in m.PENDING_STATUS_HASH &&
                        T(x, E, F.balance);
                    return {
                      gasErrors: D,
                      hasGasErrors: R,
                      balanceError: B,
                      hasSimulationError: Boolean(null == E ? void 0 : E.simulationFails),
                    };
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('@metamask/transaction-controller'),
                  s = e('../../../../shared/constants/gas'),
                  i = e('../../../selectors'),
                  c = e('../../../helpers/utils/transactions.util'),
                  l = e('../../../helpers/utils/util'),
                  u = e('../../../helpers/constants/gas'),
                  d = e('../../../../shared/modules/Numeric'),
                  m = e('../../../helpers/constants/transactions');
                const f = (e, t) =>
                    new d.Numeric(e, 10).lessThan(new d.Numeric(t || s.GAS_LIMITS.SIMPLE, 16))
                      ? u.GAS_FORM_ERRORS.GAS_LIMIT_OUT_OF_BOUNDS
                      : undefined,
                  p = (e, t) =>
                    t && (0, l.bnLessThan)(e, 0)
                      ? u.GAS_FORM_ERRORS.MAX_PRIORITY_FEE_BELOW_MINIMUM
                      : undefined,
                  h = (e, t, n, a) =>
                    t || !a
                      ? undefined
                      : (0, l.bnGreaterThan)(n, e)
                        ? u.GAS_FORM_ERRORS.MAX_FEE_IMBALANCE
                        : undefined,
                  g = (e, t, n, a) => {
                    var o;
                    return n && e
                      ? undefined
                      : (!n ||
                            (null != a &&
                              null !== (o = a.txParams) &&
                              void 0 !== o &&
                              o.gasPrice)) &&
                          (0, l.bnLessThan)(t || 0, 0)
                        ? u.GAS_FORM_ERRORS.GAS_PRICE_TOO_LOW
                        : undefined;
                  },
                  v = (e, t, n, a, o) => {
                    var r;
                    return o && t && !n
                      ? (0, l.bnLessThan)(
                          a,
                          null == e || null === (r = e.low) || void 0 === r
                            ? void 0
                            : r.suggestedMaxPriorityFeePerGas
                        )
                        ? u.GAS_FORM_ERRORS.MAX_PRIORITY_FEE_TOO_LOW
                        : null != e &&
                            e.high &&
                            (0, l.bnGreaterThan)(a, 1.5 * e.high.suggestedMaxPriorityFeePerGas)
                          ? u.GAS_FORM_ERRORS.MAX_PRIORITY_FEE_HIGH_WARNING
                          : undefined
                      : undefined;
                  },
                  y = (e, t, n, a, o, r, s) => {
                    var i;
                    return o || a || !n || !s || t
                      ? undefined
                      : (0, l.bnLessThan)(
                            r,
                            null == e || null === (i = e.low) || void 0 === i
                              ? void 0
                              : i.suggestedMaxFeePerGas
                          )
                        ? u.GAS_FORM_ERRORS.MAX_FEE_TOO_LOW
                        : null != e &&
                            e.high &&
                            (0, l.bnGreaterThan)(r, 1.5 * e.high.suggestedMaxFeePerGas)
                          ? u.GAS_FORM_ERRORS.MAX_FEE_HIGH_WARNING
                          : undefined;
                  },
                  T = (e, t, n) => {
                    var a;
                    if (e === undefined || n === undefined) return !1;
                    const o = new d.Numeric(e, 16).add(
                        new d.Numeric(
                          (null == t || null === (a = t.txParams) || void 0 === a
                            ? void 0
                            : a.value) || '0x0',
                          16
                        )
                      ),
                      r = new d.Numeric(n, 16);
                    return o.greaterThan(r);
                  };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useGasFeeErrors.js' },
    ],
    [
      7337,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/modules/Numeric': 5853,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/constants/gas': 6874,
        '../../../helpers/utils/gas': 6902,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../hooks/useGasFeeEstimates': 6982,
        '../../../selectors': 7601,
        './useGasEstimates': 7335,
        './useGasFeeErrors': 7336,
        './useGasPriceInput': 7338,
        './useMaxFeePerGasInput': 7342,
        './useMaxPriorityFeePerGasInput': 7343,
        './useTransactionFunctions': 7352,
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
                  (n.useGasFeeInputs = function (
                    e = r.GasRecommendations.medium,
                    t,
                    n = '0x5208',
                    x = r.EditGasModes.modifyInPlace
                  ) {
                    var w;
                    const E = {
                      txParams: null == t ? void 0 : t.txParams,
                      id: null == t ? void 0 : t.id,
                      userFeeLevel: null == t ? void 0 : t.userFeeLevel,
                      originalGasEstimate: null == t ? void 0 : t.originalGasEstimate,
                      userEditedGasLimit: null == t ? void 0 : t.userEditedGasLimit,
                    };
                    null != t &&
                      t.previousGas &&
                      (E.previousGas = null == t ? void 0 : t.previousGas);
                    const [_, b] = (0, a.useState)(E),
                      C = (0, u.editGasModeIsSpeedUpOrCancel)(x) ? _ : t,
                      A = (0, o.useSelector)(e =>
                        (0, i.selectNetworkConfigurationByChainId)(
                          e,
                          null == C ? void 0 : C.chainId
                        )
                      ),
                      S =
                        null == A ||
                        null === (w = A.rpcEndpoints) ||
                        void 0 === w ||
                        null === (w = w[null == A ? void 0 : A.defaultRpcEndpointIndex]) ||
                        void 0 === w
                          ? void 0
                          : w.networkClientId,
                      N =
                        (0, o.useSelector)(i.checkNetworkAndAccountSupports1559) &&
                        !(0, c.isLegacyTransaction)(null == C ? void 0 : C.txParams),
                      {
                        gasEstimateType: P,
                        gasFeeEstimates: M,
                        isGasEstimatesLoading: I,
                        isNetworkBusy: O,
                      } = (0, l.useGasFeeEstimates)(S),
                      R = (0, o.useSelector)(i.getAdvancedInlineGasShown),
                      [D, F] = (0, a.useState)(() => {
                        var t, n;
                        return R &&
                          null != C &&
                          null !== (t = C.txParams) &&
                          void 0 !== t &&
                          t.maxPriorityFeePerGas &&
                          null != C &&
                          null !== (n = C.txParams) &&
                          void 0 !== n &&
                          n.maxFeePerGas
                          ? null
                          : C
                            ? (null == C ? void 0 : C.userFeeLevel) || null
                            : e;
                      }),
                      [B, L] = (0, a.useState)(() => D || r.PriorityLevels.custom),
                      [j, G] = (0, a.useState)(() => {
                        var e, t;
                        return Number(
                          (0, d.hexToDecimal)(
                            (null == C || null === (e = C.txParams) || void 0 === e
                              ? void 0
                              : e.gasLimit) ??
                              (null == C || null === (t = C.txParams) || void 0 === t
                                ? void 0
                                : t.gas) ??
                              '0x0'
                          )
                        );
                      }),
                      $ = Number((0, d.hexToDecimal)(null == C ? void 0 : C.originalGasEstimate));
                    (0, a.useEffect)(() => {
                      if (N) {
                        var e, t, n, a;
                        null != C && C.userFeeLevel && F(null == C ? void 0 : C.userFeeLevel);
                        const o = new m.Numeric(
                            (null == C || null === (e = C.txParams) || void 0 === e
                              ? void 0
                              : e.gas) ?? '0x0',
                            16
                          )
                            .times(
                              new m.Numeric(
                                (null == C || null === (t = C.txParams) || void 0 === t
                                  ? void 0
                                  : t.maxFeePerGas) ?? '0x0',
                                16
                              )
                            )
                            .toPrefixedHexString(),
                          s = new m.Numeric(o, 16, f.EtherDenomination.WEI)
                            .toDenomination(f.EtherDenomination.ETH)
                            .toBase(10)
                            .toString();
                        Number(s) > Number(k)
                          ? L(r.PriorityLevels.dappSuggestedHigh)
                          : null != C && C.userFeeLevel && L(null == C ? void 0 : C.userFeeLevel),
                          G(
                            Number(
                              (0, d.hexToDecimal)(
                                (null == C || null === (n = C.txParams) || void 0 === n
                                  ? void 0
                                  : n.gasLimit) ??
                                  (null == C || null === (a = C.txParams) || void 0 === a
                                    ? void 0
                                    : a.gas) ??
                                  '0x0'
                              )
                            )
                          );
                      }
                    }, [L, G, F, N, C]);
                    const {
                        gasPrice: W,
                        setGasPrice: U,
                        setGasPriceHasBeenManuallySet: H,
                      } = (0, h.useGasPriceInput)({
                        estimateToUse: D,
                        gasEstimateType: P,
                        gasFeeEstimates: M,
                        transaction: C,
                      }),
                      { maxFeePerGas: V, setMaxFeePerGas: z } = (0, g.useMaxFeePerGasInput)({
                        estimateToUse: D,
                        gasEstimateType: P,
                        gasFeeEstimates: M,
                        transaction: C,
                      }),
                      { maxPriorityFeePerGas: q, setMaxPriorityFeePerGas: K } = (0,
                      v.useMaxPriorityFeePerGasInput)({
                        estimateToUse: D,
                        gasEstimateType: P,
                        gasFeeEstimates: M,
                        transaction: C,
                      }),
                      {
                        estimatedMinimumNative: Y,
                        maximumCostInHexWei: Q,
                        minimumCostInHexWei: J,
                      } = (0, y.useGasEstimates)({
                        editGasMode: x,
                        gasEstimateType: P,
                        gasFeeEstimates: M,
                        gasLimit: j,
                        gasPrice: W,
                        maxFeePerGas: V,
                        maxPriorityFeePerGas: q,
                        minimumGasLimit: n,
                        transaction: C,
                      }),
                      {
                        balanceError: X,
                        gasErrors: Z,
                        hasGasErrors: ee,
                        hasSimulationError: te,
                      } = (0, p.useGasFeeErrors)({
                        gasEstimateType: P,
                        gasFeeEstimates: M,
                        isGasEstimatesLoading: I,
                        gasLimit: j,
                        gasPrice: W,
                        maxPriorityFeePerGas: q,
                        maxFeePerGas: V,
                        minimumCostInHexWei: J,
                        minimumGasLimit: n,
                        transaction: C,
                      }),
                      ne = (0, a.useCallback)(() => {
                        if (Z.gasLimit === s.GAS_FORM_ERRORS.GAS_LIMIT_OUT_OF_BOUNDS) {
                          var e;
                          const t = (0, d.hexToDecimal)(
                              null == C || null === (e = C.txParams) || void 0 === e
                                ? void 0
                                : e.gas
                            ),
                            a = (0, d.hexToDecimal)(n);
                          G(t > a ? t : a);
                        }
                      }, [n, Z.gasLimit, C]),
                      {
                        cancelTransaction: ae,
                        speedUpTransaction: oe,
                        updateTransaction: re,
                        updateTransactionToTenPercentIncreasedGasFee: se,
                        updateTransactionUsingDAPPSuggestedValues: ie,
                        updateTransactionUsingEstimate: ce,
                      } = (0, T.useTransactionFunctions)({
                        defaultEstimateToUse: e,
                        editGasMode: x,
                        gasFeeEstimates: M,
                        gasLimit: j,
                        maxPriorityFeePerGas: q,
                        minimumGasLimit: n,
                        transaction: C,
                        setRetryTxMeta: b,
                      }),
                      le = (0, a.useCallback)(() => {
                        F(r.CUSTOM_GAS_ESTIMATE), ne(), U(W), G(j), z(V), K(q), H(!0), L('custom');
                      }, [F, ne, U, W, G, j, z, V, K, q, H]);
                    return {
                      transaction: C,
                      maxFeePerGas: V,
                      maxPriorityFeePerGas: q,
                      gasPrice: W,
                      setGasPrice: U,
                      gasLimit: j,
                      setGasLimit: G,
                      properGasLimit: $,
                      editGasMode: x,
                      estimateToUse: D,
                      estimatedMinimumNative: Y,
                      maximumCostInHexWei: Q,
                      minimumCostInHexWei: J,
                      estimateUsed: B,
                      gasFeeEstimates: M,
                      isNetworkBusy: O,
                      onManualChange: le,
                      balanceError: X,
                      gasErrors: Z,
                      hasGasErrors: ee,
                      hasSimulationError: te,
                      minimumGasLimitDec: (0, d.hexToDecimal)(n),
                      supportsEIP1559: N,
                      cancelTransaction: ae,
                      speedUpTransaction: oe,
                      updateTransaction: re,
                      updateTransactionToTenPercentIncreasedGasFee: se,
                      updateTransactionUsingDAPPSuggestedValues: ie,
                      updateTransactionUsingEstimate: ce,
                    };
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../shared/constants/gas'),
                  s = e('../../../helpers/constants/gas'),
                  i = e('../../../selectors'),
                  c = e('../../../helpers/utils/transactions.util'),
                  l = e('../../../hooks/useGasFeeEstimates'),
                  u = e('../../../helpers/utils/gas'),
                  d = e('../../../../shared/modules/conversion.utils'),
                  m = e('../../../../shared/modules/Numeric'),
                  f = e('../../../../shared/constants/common'),
                  p = e('./useGasFeeErrors'),
                  h = e('./useGasPriceInput'),
                  g = e('./useMaxFeePerGasInput'),
                  v = e('./useMaxPriorityFeePerGasInput'),
                  y = e('./useGasEstimates'),
                  T = e('./useTransactionFunctions');
                const k = '1';
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useGasFeeInputs.js' },
    ],
    [
      7338,
      {
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/utils/transactions.util': 6919,
        './utils': 7355,
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
                  (n.useGasPriceInput = function ({
                    estimateToUse: e,
                    gasEstimateType: t,
                    gasFeeEstimates: n,
                    transaction: u,
                  }) {
                    const [d, m] = (0, a.useState)(
                        (null == u ? void 0 : u.userFeeLevel) === r.CUSTOM_GAS_ESTIMATE
                      ),
                      [f, p] = (0, a.useState)(() => {
                        const { gasPrice: e } = (null == u ? void 0 : u.txParams) || {};
                        return e && (0, c.feeParamsAreCustom)(u)
                          ? Number((0, i.hexWEIToDecGWEI)(e))
                          : null;
                      }),
                      [h] = (0, a.useState)(n),
                      g = (0, o.isEqual)(h, n);
                    return {
                      gasPrice:
                        null !== f &&
                        (d || g || (0, s.isLegacyTransaction)(null == u ? void 0 : u.txParams))
                          ? f
                          : l(n, t, e),
                      setGasPrice: p,
                      setGasPriceHasBeenManuallySet: m,
                    };
                  });
                var a = e('react'),
                  o = e('lodash'),
                  r = e('../../../../shared/constants/gas'),
                  s = e('../../../helpers/utils/transactions.util'),
                  i = e('../../../../shared/modules/conversion.utils'),
                  c = e('./utils');
                function l(e, t, n) {
                  return t === r.GasEstimateTypes.legacy
                    ? ((null == e ? void 0 : e[n]) ?? '0')
                    : t === r.GasEstimateTypes.ethGasPrice
                      ? ((null == e ? void 0 : e.gasPrice) ?? '0')
                      : '0';
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useGasPriceInput.js' },
    ],
    [
      7339,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../hooks/useAsync': 6969,
        '../utils/token': 7365,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useGetTokenStandardAndDetails = void 0);
                var a = e('../../../../shared/constants/transaction'),
                  o = e('../../../hooks/useAsync'),
                  r = e('../utils/token');
                n.useGetTokenStandardAndDetails = e => {
                  const { value: t } = (0, o.useAsyncResult)(
                    async () =>
                      e
                        ? await (0, r.memoizedGetTokenStandardAndDetails)(e)
                        : Promise.resolve(null),
                    [e]
                  );
                  if (!t) return { decimalsNumber: undefined };
                  const { decimals: n, standard: s } = t || {};
                  if (s === a.TokenStandard.ERC20) {
                    const e = (0, r.parseTokenDetailDecimals)(n) ?? r.ERC20_DEFAULT_DECIMALS;
                    t.decimalsNumber = e;
                  }
                  return t;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useGetTokenStandardAndDetails.ts' },
    ],
    [
      7340,
      {
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/transaction.utils': 5880,
        '../../../helpers/utils/gas': 6902,
        '../../../hooks/useGasFeeEstimates': 6982,
        'bignumber.js': 4030,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useIncrementedGasFees = function (e) {
                    const { gasFeeEstimates: t = {} } = (0, l.useGasFeeEstimates)(
                      e.networkClientId
                    );
                    return (0, r.useMemo)(() => {
                      var n, a, o, r;
                      const s = {
                          gasLimit: null === (n = e.txParams) || void 0 === n ? void 0 : n.gas,
                          gas: null === (a = e.txParams) || void 0 === a ? void 0 : a.gas,
                        },
                        c =
                          (null == t || null === (o = t.medium) || void 0 === o
                            ? void 0
                            : o.suggestedMaxFeePerGas) ?? '0',
                        l =
                          (null == t || null === (r = t.medium) || void 0 === r
                            ? void 0
                            : r.suggestedMaxPriorityFeePerGas) ?? '0';
                      if ((0, i.isEIP1559Transaction)(e)) {
                        var d, m;
                        const t =
                            null === (d = e.txParams) || void 0 === d ? void 0 : d.maxFeePerGas,
                          n =
                            null === (m = e.txParams) || void 0 === m
                              ? void 0
                              : m.maxPriorityFeePerGas;
                        (s.maxFeePerGas = t === undefined || t.startsWith('-') ? '0x0' : u(t, c)),
                          (s.maxPriorityFeePerGas =
                            n === undefined || n.startsWith('-') ? '0x0' : u(n, l));
                      } else {
                        var f;
                        const t = null === (f = e.txParams) || void 0 === f ? void 0 : f.gasPrice;
                        s.gasPrice = t === undefined || t.startsWith('-') ? '0x0' : u(t, c);
                      }
                      return s;
                    }, [e, t]);
                  });
                var a,
                  o = (a = e('bignumber.js')) && a.__esModule ? a : { default: a },
                  r = e('react'),
                  s = e('../../../../shared/modules/conversion.utils'),
                  i = e('../../../../shared/modules/transaction.utils'),
                  c = e('../../../helpers/utils/gas'),
                  l = e('../../../hooks/useGasFeeEstimates');
                function u(e, t) {
                  const n = (0, c.addTenPercentAndRound)(e),
                    a = (0, s.decGWEIToHexWEI)(t);
                  return new o.default(n, 16).greaterThan(new o.default(a, 16)) ? n : a;
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useIncrementedGasFees.js' },
    ],
    [
      7341,
      {
        '../../../../shared/constants/hardware-wallets': 5796,
        '../../../ducks/app/app': 6845,
        '../../../ducks/metamask/metamask': 6860,
        '../../../store/actions': 7619,
        '../context/confirm': 7294,
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
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../shared/constants/hardware-wallets'),
                  s = e('../../../ducks/app/app'),
                  i = e('../../../ducks/metamask/metamask'),
                  c = e('../../../store/actions'),
                  l = e('../context/confirm');
                n.default = () => {
                  var e, t;
                  const n = (0, o.useDispatch)(),
                    { currentConfirmation: u } = (0, l.useConfirmContext)(),
                    d = (0, o.useSelector)(i.getLedgerTransportType),
                    m = (0, o.useSelector)(s.getLedgerTransportStatus),
                    f = (0, o.useSelector)(s.getLedgerWebHidConnectedStatus),
                    p =
                      (null == u || null === (e = u.msgParams) || void 0 === e ? void 0 : e.from) ??
                      (null == u || null === (t = u.txParams) || void 0 === t ? void 0 : t.from),
                    h = (0, o.useSelector)(e => p && (0, i.isAddressLedger)(e, p));
                  return (
                    (0, a.useEffect)(() => {
                      if (!h) return;
                      (async () => {
                        if (
                          d === r.LedgerTransportTypes.webhid &&
                          f === r.WebHIDConnectedStatuses.connected &&
                          m === r.HardwareTransportStates.none
                        )
                          try {
                            const e = await (0, c.attemptLedgerTransportCreation)();
                            n(
                              (0, s.setLedgerTransportStatus)(
                                e
                                  ? r.HardwareTransportStates.verified
                                  : r.HardwareTransportStates.unknownFailure
                              )
                            );
                          } catch (e) {
                            e.message.match('Failed to open the device')
                              ? n(
                                  (0, s.setLedgerTransportStatus)(
                                    r.HardwareTransportStates.deviceOpenFailure
                                  )
                                )
                              : e.message.match('the device is already open')
                                ? n(
                                    (0, s.setLedgerTransportStatus)(
                                      r.HardwareTransportStates.verified
                                    )
                                  )
                                : n(
                                    (0, s.setLedgerTransportStatus)(
                                      r.HardwareTransportStates.unknownFailure
                                    )
                                  );
                          }
                      })(),
                        (async () => {
                          if (
                            d === r.LedgerTransportTypes.webhid &&
                            f !== r.WebHIDConnectedStatuses.connected
                          ) {
                            var e;
                            const t = await (null === (e = window.navigator) ||
                              void 0 === e ||
                              null === (e = e.hid) ||
                              void 0 === e
                                ? void 0
                                : e.getDevices()),
                              a =
                                null == t
                                  ? void 0
                                  : t.some(e => e.vendorId === Number(r.LEDGER_USB_VENDOR_ID));
                            n(
                              (0, s.setLedgerWebHidConnectedStatus)(
                                a
                                  ? r.WebHIDConnectedStatuses.connected
                                  : r.WebHIDConnectedStatuses.notConnected
                              )
                            );
                          }
                        })();
                    }, [n, d, h, f, m]),
                    (0, a.useEffect)(
                      () =>
                        h
                          ? () => {
                              n((0, s.setLedgerTransportStatus)(r.HardwareTransportStates.none));
                            }
                          : undefined,
                      [n]
                    ),
                    { isLedgerWallet: h }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useLedgerConnection.ts' },
    ],
    [
      7342,
      {
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../selectors': 7601,
        './utils': 7355,
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
                  (n.useMaxFeePerGasInput = function ({
                    estimateToUse: e,
                    gasEstimateType: t,
                    gasFeeEstimates: n,
                    transaction: i,
                  }) {
                    const u =
                        (0, o.useSelector)(r.checkNetworkAndAccountSupports1559) &&
                        !(0, s.isLegacyTransaction)(null == i ? void 0 : i.txParams),
                      d = u ? l(i, n) : 0,
                      [m, f] = (0, a.useState)(() =>
                        d && (0, c.feeParamsAreCustom)(i) ? d : null
                      );
                    (0, a.useEffect)(() => {
                      u && d && f(d);
                    }, [d, f, u]);
                    return {
                      maxFeePerGas:
                        m ?? (0, c.getGasFeeEstimate)('suggestedMaxFeePerGas', n, t, e, d || 0),
                      setMaxFeePerGas: f,
                    };
                  });
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../selectors'),
                  s = e('../../../helpers/utils/transactions.util'),
                  i = e('../../../../shared/modules/conversion.utils'),
                  c = e('./utils');
                const l = (e, t) => {
                  if (null != t && t[null == e ? void 0 : e.userFeeLevel])
                    return t[e.userFeeLevel].suggestedMaxFeePerGas;
                  const { maxFeePerGas: n, gasPrice: a } = (null == e ? void 0 : e.txParams) || {};
                  return Number((0, i.hexWEIToDecGWEI)(n || a));
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useMaxFeePerGasInput.js' },
    ],
    [
      7343,
      {
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../selectors': 7601,
        './utils': 7355,
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
                  (n.useMaxPriorityFeePerGasInput = function ({
                    estimateToUse: e,
                    gasEstimateType: t,
                    gasFeeEstimates: n,
                    transaction: i,
                  }) {
                    const d =
                        (0, a.useSelector)(r.checkNetworkAndAccountSupports1559) &&
                        !(0, s.isLegacyTransaction)(null == i ? void 0 : i.txParams),
                      m = d ? u(i, n) : null,
                      [f, p] = (0, o.useState)(() =>
                        !l(m) && (0, c.feeParamsAreCustom)(i) ? m : null
                      );
                    (0, o.useEffect)(() => {
                      d && !l(m) && p(m);
                    }, [m, p, d]);
                    return {
                      maxPriorityFeePerGas:
                        f ??
                        (0, c.getGasFeeEstimate)('suggestedMaxPriorityFeePerGas', n, t, e, m || 0),
                      setMaxPriorityFeePerGas: p,
                    };
                  });
                var a = e('react-redux'),
                  o = e('react'),
                  r = e('../../../selectors'),
                  s = e('../../../helpers/utils/transactions.util'),
                  i = e('../../../../shared/modules/conversion.utils'),
                  c = e('./utils');
                const l = e => null === e || e === undefined,
                  u = (e, t) => {
                    if (null != t && t[null == e ? void 0 : e.userFeeLevel])
                      return t[e.userFeeLevel].suggestedMaxPriorityFeePerGas;
                    const {
                        maxPriorityFeePerGas: n,
                        maxFeePerGas: a,
                        gasPrice: o,
                      } = (null == e ? void 0 : e.txParams) || {},
                      r = n || a || o;
                    return r ? Number((0, i.hexWEIToDecGWEI)(r)) : null;
                  };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useMaxPriorityFeePerGasInput.js' },
    ],
    [
      7344,
      {
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './useCurrentConfirmation': 7330,
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
                  (n.useOriginThrottling = function () {
                    var e;
                    const t = (0, r.useDispatch)(),
                      n = (0, r.useSelector)(i.selectThrottledOrigins),
                      { currentConfirmation: a } = (0, c.default)(),
                      u =
                        (null == a ? void 0 : a.origin) ||
                        (null == a || null === (e = a.messageParams) || void 0 === e
                          ? void 0
                          : e.origin),
                      d = n[u],
                      m = l(d),
                      f = (0, o.useCallback)(() => {
                        t(
                          (0, s.updateThrottledOriginState)(u, { rejections: 0, lastRejection: 0 })
                        );
                      }, [t, u]);
                    return { origin: u, resetOrigin: f, shouldThrottleOrigin: m };
                  });
                var a,
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../store/actions'),
                  i = e('../../../selectors'),
                  c = (a = e('./useCurrentConfirmation')) && a.__esModule ? a : { default: a };
                const l = e => {
                  if (!e) return !1;
                  const t = Date.now(),
                    { rejections: n, lastRejection: a } = e;
                  return n + 1 >= 3 && t - a <= 3e4;
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useOriginThrottling.ts' },
    ],
    [
      7345,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
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
                  (n.useQueuedConfirmationsEvent = void 0);
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../../shared/constants/metametrics'),
                  s = e('../../../contexts/metametrics'),
                  i = e('../../../selectors');
                n.useQueuedConfirmationsEvent = e => {
                  const t = (0, o.useSelector)(i.pendingApprovalsSortedSelector),
                    n = (0, o.useSelector)(i.getQueuedRequestCount),
                    c = (0, a.useContext)(s.MetaMetricsContext);
                  (0, a.useEffect)(() => {
                    if (t.length > 0 && n > 0) {
                      const a = {
                        confirmation_type: t[0].type,
                        referrer: t[0].origin,
                        queue_size: n,
                        queue_type: e,
                      };
                      c({
                        event: r.MetaMetricsEventName.ConfirmationQueued,
                        category: r.MetaMetricsEventCategory.Confirmations,
                        properties: a,
                      });
                    }
                  }, [JSON.stringify(t), n, e, c]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useQueuedConfirmationEvents.ts' },
    ],
    [
      7346,
      {
        '../../../helpers/utils/metrics': 6907,
        '../../../store/actions': 7619,
        '../context/confirm': 7294,
        '../utils': 7364,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSignatureEventFragment = void 0);
                var a = e('react'),
                  o = e('../../../helpers/utils/metrics'),
                  r = e('../../../store/actions'),
                  s = e('../context/confirm'),
                  i = e('../utils');
                n.useSignatureEventFragment = () => {
                  var e;
                  const { currentConfirmation: t } = (0, s.useConfirmContext)(),
                    n =
                      (0, i.isSignatureTransactionType)(t) &&
                      (null == t || null === (e = t.msgParams) || void 0 === e
                        ? void 0
                        : e.requestId),
                    c = n ? (0, o.generateSignatureUniqueId)(n) : null;
                  return {
                    updateSignatureEventFragment: (0, a.useCallback)(
                      async e => {
                        c && (0, r.updateEventFragment)(c, e);
                      },
                      [c]
                    ),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useSignatureEventFragment.ts' },
    ],
    [
      7347,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../store/actions': 7619,
        '../context/confirm': 7294,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useSmartAccountActions = function () {
                    const e = (0, r.useDispatch)(),
                      { currentConfirmation: t } = (0, i.useConfirmContext)(),
                      { id: n, chainId: l } = t ?? {};
                    return {
                      handleRejectUpgrade: (0, o.useCallback)(async () => {
                        const t = new a.JsonRpcError(
                            c.EIP5792ErrorCode.RejectedUpgrade,
                            'User rejected account upgrade'
                          ),
                          o = (0, a.serializeError)(t);
                        await (0, s.disableAccountUpgradeForChain)(l),
                          e((0, s.rejectPendingApproval)(n, o));
                      }, [e, n, l]),
                    };
                  });
                var a = e('@metamask/rpc-errors'),
                  o = e('react'),
                  r = e('react-redux'),
                  s = e('../../../store/actions'),
                  i = e('../context/confirm'),
                  c = e('../../../../shared/constants/transaction');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useSmartAccountActions.ts' },
    ],
    [
      7348,
      {
        '../../../../shared/modules/selectors': 5874,
        '../../../store/actions': 7619,
        '../../swaps/swaps.util': 7583,
        '../context/confirm': 7294,
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
                  (n.useSmartTransactionFeatureFlags = function () {
                    const e = (0, o.useDispatch)(),
                      { currentConfirmation: t } = (0, u.useConfirmContext)(),
                      { id: n, txParams: a } = t ?? {},
                      d = Boolean(a),
                      m = (0, o.useSelector)(i.getSmartTransactionsPreferenceEnabled),
                      f = (0, o.useSelector)(i.getChainSupportsSmartTransactions);
                    (0, r.useEffect)(() => {
                      d &&
                        n &&
                        m &&
                        f &&
                        Promise.all([
                          (0, c.fetchSwapsFeatureFlags)(),
                          (0, l.fetchSmartTransactionsLiveness)()(),
                        ])
                          .then(([t]) => {
                            var n;
                            e((0, l.setSwapsFeatureFlags)(t)),
                              e(
                                (0, l.setSmartTransactionsRefreshInterval)(
                                  null === (n = t.smartTransactions) || void 0 === n
                                    ? void 0
                                    : n.batchStatusPollingInterval
                                )
                              );
                          })
                          .catch(e => {
                            s.default.debug('Error updating smart transaction feature flags', e);
                          });
                    }, [d, n, m, f]);
                  });
                var a,
                  o = e('react-redux'),
                  r = e('react'),
                  s = (a = e('loglevel')) && a.__esModule ? a : { default: a },
                  i = e('../../../../shared/modules/selectors'),
                  c = e('../../swaps/swaps.util'),
                  l = e('../../../store/actions'),
                  u = e('../context/confirm');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/useSmartTransactionFeatureFlags.ts',
      },
    ],
    [
      7349,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../contexts/metametrics': 6836,
        '../utils/token': 7365,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('react'),
                  o = e('../../../../shared/constants/metametrics'),
                  r = e('../../../../shared/constants/transaction'),
                  s = e('../../../contexts/metametrics'),
                  i = e('../utils/token');
                n.default = (e, t, n, c = o.MetaMetricsEventLocation.SignatureConfirmation) => {
                  const l = (0, a.useContext)(s.MetaMetricsContext),
                    u = (0, a.useRef)(!1);
                  (0, a.useEffect)(() => {
                    if (e === undefined || n === undefined || u.current) return;
                    const { decimals: a, standard: s } = n || {};
                    if (s !== r.TokenStandard.ERC20) return;
                    (0, i.parseTokenDetailDecimals)(a) === undefined &&
                      (l({
                        event: o.MetaMetricsEventName.SimulationIncompleteAssetDisplayed,
                        category: o.MetaMetricsEventCategory.Confirmations,
                        properties: {
                          token_decimals_available: 'not_available',
                          asset_address: t,
                          asset_type: r.TokenStandard.ERC20,
                          chain_id: e,
                          location: c,
                          ui_customizations: [
                            o.MetaMetricsEventUiCustomization.RedesignedConfirmation,
                          ],
                        },
                      }),
                      (u.current = !0));
                  }, [n, e, c, t, l]);
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/useTrackERC20WithoutDecimalInformation.ts',
      },
    ],
    [
      7350,
      {
        '../../../contexts/gasFee': 6831,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
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
                  (n.useTransactionEventFragment = void 0);
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('../../../contexts/gasFee'),
                  s = e('../../../store/actions'),
                  i = e('../../../selectors');
                n.useTransactionEventFragment = () => {
                  const { transaction: e } = (0, r.useGasFeeContext)(),
                    t = (0, o.useSelector)(t =>
                      (0, i.selectMatchingFragment)(t, {
                        fragmentOptions: {},
                        existingId: `transaction-added-${null == e ? void 0 : e.id}`,
                      })
                    ),
                    n = Boolean(t),
                    c = null == e ? void 0 : e.id;
                  return {
                    updateTransactionEventFragment: (0, a.useCallback)(
                      async (e, t) => {
                        const a = t || c;
                        a &&
                          (n || (await (0, s.createTransactionEventFragment)(a)),
                          (0, s.updateEventFragment)(`transaction-added-${a}`, e),
                          (0, s.updateEventFragment)(`transaction-submitted-${a}`, e));
                      },
                      [n, c]
                    ),
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useTransactionEventFragment.js' },
    ],
    [
      7351,
      {
        '../../../hooks/useWindowFocus': 7021,
        '../../../store/actions': 7619,
        '../context/confirm': 7294,
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
                  (n.useTransactionFocusEffect = void 0);
                var a = e('react'),
                  o = e('react-redux'),
                  r = e('@metamask/transaction-controller'),
                  s = e('../../../store/actions'),
                  i = e('../../../hooks/useWindowFocus'),
                  c = e('../context/confirm');
                const l = new Set([
                  r.TransactionType.contractInteraction,
                  r.TransactionType.deployContract,
                  r.TransactionType.simpleSend,
                  r.TransactionType.smart,
                  r.TransactionType.tokenMethodTransfer,
                  r.TransactionType.tokenMethodTransferFrom,
                  r.TransactionType.tokenMethodSafeTransferFrom,
                ]);
                n.useTransactionFocusEffect = () => {
                  const { currentConfirmation: e } = (0, c.useConfirmContext)(),
                    { id: t, type: n } = e ?? {},
                    r = (0, i.useWindowFocus)(),
                    u = (0, o.useDispatch)(),
                    [d, m] = (0, a.useState)(null),
                    f = (0, a.useCallback)(
                      async (e, t) => {
                        await u((0, s.setTransactionActive)(e, t));
                      },
                      [u]
                    );
                  (0, a.useEffect)(() => {
                    l.has(n)
                      ? r && d !== t
                        ? (d && f(d, !1), m(t), f(t, !0))
                        : !r && d && (f(d, !1), m(null))
                      : d && (f(d, !1), m(null));
                  }, [d, t, r, f, n]);
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useTransactionFocusEffect.ts' },
    ],
    [
      7352,
      {
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/utils/gas': 6902,
        '../../../store/actions': 7619,
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
                  (n.useTransactionFunctions = void 0);
                var a,
                  o = e('react'),
                  r = e('react-redux'),
                  s = (a = e('bignumber.js')) && a.__esModule ? a : { default: a },
                  i = e('../../../../shared/constants/gas'),
                  c = e('../../../helpers/utils/gas'),
                  l = e('../../../store/actions'),
                  u = e('../../../../shared/modules/conversion.utils');
                n.useTransactionFunctions = ({
                  defaultEstimateToUse: e,
                  editGasMode: t,
                  estimatedBaseFee: n,
                  gasFeeEstimates: a,
                  gasLimit: d,
                  maxPriorityFeePerGas: m,
                  transaction: f,
                  setRetryTxMeta: p,
                }) => {
                  const h = (0, r.useDispatch)(),
                    g = (0, o.useCallback)(() => {
                      if (
                        (t !== i.EditGasModes.cancel && t !== i.EditGasModes.speedUp) ||
                        f.previousGas
                      )
                        return {};
                      const {
                        maxFeePerGas: e,
                        maxPriorityFeePerGas: n,
                        gasLimit: a,
                      } = (null == f ? void 0 : f.txParams) ?? {};
                      return {
                        previousGas: { maxFeePerGas: e, maxPriorityFeePerGas: n, gasLimit: a },
                      };
                    }, [t, null == f ? void 0 : f.previousGas, null == f ? void 0 : f.txParams]),
                    v = (0, o.useCallback)(
                      async ({
                        estimateUsed: n,
                        gasLimit: a,
                        maxFeePerGas: o,
                        maxPriorityFeePerGas: r,
                        estimateSuggested: s,
                      }) => {
                        const v = {
                          gas: (0, u.decimalToHex)(a || d),
                          gasLimit: (0, u.decimalToHex)(a || d),
                          estimateSuggested: s || e,
                          estimateUsed: n,
                        };
                        o && (v.maxFeePerGas = o),
                          r && (v.maxPriorityFeePerGas = r || (0, u.decGWEIToHexWEI)(m));
                        const y = g(),
                          T = {
                            ...f,
                            userFeeLevel: n || i.PriorityLevels.custom,
                            txParams: { ...f.txParams, ...v },
                            ...y,
                          };
                        t === i.EditGasModes.swaps
                          ? (h((0, l.updateSwapsUserFeeLevel)(n || i.PriorityLevels.custom)),
                            h((0, l.updateCustomSwapsEIP1559GasParams)(v)))
                          : (0, c.editGasModeIsSpeedUpOrCancel)(t)
                            ? p(T)
                            : ((v.userEditedGasLimit = T.userEditedGasLimit),
                              (v.userFeeLevel = T.userFeeLevel),
                              y &&
                                y.previousGas &&
                                (await h((0, l.updatePreviousGasParams)(T.id, y.previousGas))),
                              await h((0, l.updateTransactionGasFees)(T.id, v)));
                      },
                      [e, h, t, d, g, m, f, p]
                    ),
                    y = (0, o.useCallback)(() => {
                      h((0, l.createCancelTransaction)(f.id, f.txParams, { estimatedBaseFee: n }));
                    }, [h, n, f]),
                    T = (0, o.useCallback)(() => {
                      h((0, l.createSpeedUpTransaction)(f.id, f.txParams, { estimatedBaseFee: n }));
                    }, [h, n, f]),
                    k = (0, o.useCallback)(
                      (t = !1) => {
                        const {
                            gas: n,
                            maxFeePerGas: o,
                            maxPriorityFeePerGas: r,
                          } = f.previousGas || f.txParams,
                          l = new s.default(r, 16).isZero()
                            ? (0, u.decGWEIToHexWEI)(a[e].suggestedMaxPriorityFeePerGas)
                            : r,
                          d =
                            '0x0' === r
                              ? i.CUSTOM_GAS_ESTIMATE
                              : i.PriorityLevels.tenPercentIncreased;
                        a &&
                          v({
                            estimateSuggested: t ? e : i.PriorityLevels.tenPercentIncreased,
                            estimateUsed: d,
                            gasLimit: n,
                            maxFeePerGas: (0, c.addTenPercentAndRound)(o),
                            maxPriorityFeePerGas: (0, c.addTenPercentAndRound)(l),
                          });
                      },
                      [e, a, f, v]
                    ),
                    x = (0, o.useCallback)(
                      e => {
                        if (null == a || !a[e]) return;
                        const { suggestedMaxFeePerGas: t, suggestedMaxPriorityFeePerGas: n } = a[e];
                        v({
                          estimateUsed: e,
                          maxFeePerGas: (0, u.decGWEIToHexWEI)(t),
                          maxPriorityFeePerGas: (0, u.decGWEIToHexWEI)(n),
                        });
                      },
                      [a, v]
                    ),
                    w = (0, o.useCallback)(() => {
                      const { maxFeePerGas: e, maxPriorityFeePerGas: t } =
                        (null == f ? void 0 : f.dappSuggestedGasFees) ?? {};
                      v({
                        estimateUsed: i.PriorityLevels.dAppSuggested,
                        maxFeePerGas: e,
                        maxPriorityFeePerGas: t,
                      });
                    }, [f, v]);
                  return {
                    cancelTransaction: y,
                    speedUpTransaction: T,
                    updateTransaction: v,
                    updateTransactionToTenPercentIncreasedGasFee: k,
                    updateTransactionUsingDAPPSuggestedValues: w,
                    updateTransactionUsingEstimate: x,
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useTransactionFunctions.js' },
    ],
    [
      7353,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/transaction.utils': 5880,
        '../constants': 7293,
        '../utils': 7364,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTypedSignSignatureInfo = void 0);
                var a = e('react'),
                  o = e('../utils'),
                  r = e('../../../../shared/modules/transaction.utils'),
                  s = e('../../../../shared/constants/transaction'),
                  i = e('../../../../shared/constants/app'),
                  c = e('../constants');
                n.useTypedSignSignatureInfo = e => {
                  const t = (0, a.useMemo)(
                      () =>
                        e &&
                        (0, o.isSignatureTransactionType)(e) &&
                        (null == e ? void 0 : e.type) === i.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA
                          ? (0, o.isPermitSignatureRequest)(e)
                            ? c.TypedSignSignaturePrimaryTypes.PERMIT
                            : (0, o.isOrderSignatureRequest)(e)
                              ? c.TypedSignSignaturePrimaryTypes.ORDER
                              : undefined
                          : undefined,
                      [e]
                    ),
                    n = (0, a.useMemo)(() => {
                      var n;
                      if (t !== c.TypedSignSignaturePrimaryTypes.PERMIT) return undefined;
                      const {
                        message: { tokenId: a },
                      } = (0, r.parseTypedDataMessage)(
                        null == e || null === (n = e.msgParams) || void 0 === n ? void 0 : n.data
                      );
                      return a !== undefined ? s.TokenStandard.ERC721 : undefined;
                    }, [e, t]);
                  return { primaryType: t, tokenStandard: n };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/useTypedSignSignatureInfo.ts' },
    ],
    [
      7354,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/modules/transaction.utils': 5880,
        '../context/confirm': 7294,
        '../selectors/preferences': 7357,
        '../utils': 7364,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useTypesSignSimulationEnabledInfo = function () {
                    var e;
                    const { currentConfirmation: t } = (0, c.useConfirmContext)(),
                      n = (0, a.useSelector)(i.selectUseTransactionSimulations),
                      r =
                        null == t || null === (e = t.msgParams) || void 0 === e
                          ? void 0
                          : e.signatureMethod,
                      l =
                        r === o.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V4 ||
                        r === o.MESSAGE_TYPE.ETH_SIGN_TYPED_DATA_V3,
                      d = (0, s.isPermitSignatureRequest)(t),
                      m = l && u(t);
                    if (!t) return undefined;
                    return n && l && (d || m);
                  });
                var a = e('react-redux'),
                  o = e('../../../../shared/constants/app'),
                  r = e('../../../../shared/modules/transaction.utils'),
                  s = e('../utils'),
                  i = e('../selectors/preferences'),
                  c = e('../context/confirm');
                const l = [
                    {
                      domainName: 'Seaport',
                      primaryTypeList: ['BulkOrder'],
                      versionList: ['1.4', '1.5', '1.6'],
                    },
                    { domainName: 'Seaport', primaryTypeList: ['OrderComponents'] },
                  ],
                  u = e => {
                    var t;
                    const n = null === (t = e.msgParams) || void 0 === t ? void 0 : t.data;
                    if (!n) return !1;
                    const {
                      domain: { name: a, version: o },
                      primaryType: s,
                    } = (0, r.parseTypedDataMessage)(n);
                    return l.some(
                      ({ domainName: e, primaryTypeList: t, versionList: n }) =>
                        a === e && t.includes(s) && (!n || n.includes(o))
                    );
                  };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/hooks/useTypesSignSimulationEnabledInfo.ts',
      },
    ],
    [
      7355,
      { '../../../../shared/constants/gas': 5795 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.feeParamsAreCustom = void 0),
                  (n.getGasFeeEstimate = function (e, t, n, o, r = '0') {
                    var s;
                    return n === a.GasEstimateTypes.feeMarket
                      ? ((null == t || null === (s = t[o]) || void 0 === s ? void 0 : s[e]) ??
                          String(r))
                      : String(r);
                  });
                var a = e('../../../../shared/constants/gas');
                n.feeParamsAreCustom = e =>
                  !(null != e && e.userFeeLevel) ||
                  (null == e ? void 0 : e.userFeeLevel) === a.CUSTOM_GAS_ESTIMATE;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/hooks/utils.js' },
    ],
    [
      7357,
      { '../../../selectors': 7601 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.selectConfirmationAdvancedDetailsOpen = function (e) {
                    return Boolean((0, a.getPreferences)(e).showConfirmationAdvancedDetails);
                  }),
                  (n.selectUseTransactionSimulations = void 0);
                var a = e('../../../selectors');
                n.selectUseTransactionSimulations = e => e.metamask.useTransactionSimulations;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/selectors/preferences.ts' },
    ],
    [
      7358,
      {
        '../../../../../../app/scripts/lib/util': 204,
        '../../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../../components/component-library': 6402,
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../../helpers/utils/util': 6921,
        '@metamask/utils': 2995,
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
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = m(e('prop-types')),
                  r = m(e('classnames')),
                  s = e('@metamask/utils'),
                  i = e('../../../../../../app/scripts/lib/util'),
                  c = e('../../../../../helpers/utils/util'),
                  l = e('../../../../../../shared/modules/hexstring-utils'),
                  u = e('../../../../../components/component-library'),
                  d = e('../../../../../helpers/constants/design-system');
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
                class h extends a.Component {
                  constructor(...e) {
                    super(...e),
                      p(this, 'onPaste', e => {
                        var t;
                        if (null !== (t = e.clipboardData.items) && void 0 !== t && t.length) {
                          const t = e.clipboardData.items[0];
                          null == t ||
                            t.getAsString(e => {
                              const t = e.trim();
                              !(0, l.isBurnAddress)(t) &&
                                (0, l.isValidHexAddress)(t, { mixedCaseUseChecksum: !0 }) &&
                                this.props.onPaste((0, i.addHexPrefix)(t));
                            });
                        }
                      }),
                      p(this, 'onChange', ({ target: { value: e } }) => {
                        const {
                            onValidAddressTyped: t,
                            internalSearch: n,
                            onChange: a,
                            lookupDomainName: o,
                            resetDomainResolution: r,
                          } = this.props,
                          c = e.trim();
                        if (n) return a(c), null;
                        if ((0, s.isHexString)(c))
                          if (
                            (r(),
                            t &&
                              !(0, l.isBurnAddress)(c) &&
                              (0, l.isValidHexAddress)(c, { mixedCaseUseChecksum: !0 }))
                          ) {
                            const e = (0, i.addHexPrefix)(c);
                            a(e), t(e);
                          } else a(c);
                        else a(c), o(c);
                        return null;
                      });
                  }
                  componentDidMount() {
                    this.props.initializeDomainSlice();
                  }
                  render() {
                    const { t: e } = this.context,
                      {
                        className: t,
                        selectedAddress: n,
                        selectedName: o,
                        userInput: s,
                        useBlockie: i,
                      } = this.props,
                      m = Boolean(n),
                      f =
                        o && n ? (0, c.shortenAddress)((0, l.toChecksumHexAddress)(n)) : undefined;
                    return a.default.createElement(
                      'div',
                      { className: (0, r.default)('ens-input', t) },
                      a.default.createElement(
                        'div',
                        {
                          className: (0, r.default)('ens-input__wrapper', {
                            'ens-input__wrapper__status-icon--error': !1,
                            'ens-input__wrapper__status-icon--valid': !1,
                            'ens-input__wrapper--valid': m,
                          }),
                        },
                        m
                          ? a.default.createElement(
                              a.default.Fragment,
                              null,
                              a.default.createElement(
                                'div',
                                {
                                  className:
                                    'ens-input__wrapper__input ens-input__wrapper__input--selected',
                                  'data-testid': 'ens-input-selected',
                                },
                                a.default.createElement(u.AvatarAccount, {
                                  variant: i
                                    ? u.AvatarAccountVariant.Blockies
                                    : u.AvatarAccountVariant.Jazzicon,
                                  address: n,
                                  size: d.Size.MD,
                                  borderColor: d.BackgroundColor.backgroundDefault,
                                }),
                                a.default.createElement(
                                  'div',
                                  { className: 'ens-input__selected-input__title' },
                                  o || n,
                                  f
                                    ? a.default.createElement(
                                        u.Text,
                                        {
                                          color: d.TextColor.textAlternative,
                                          variant: d.TextVariant.bodySm,
                                          ellipsis: !0,
                                        },
                                        f
                                      )
                                    : null
                                )
                              ),
                              a.default.createElement(u.ButtonIcon, {
                                iconName: u.IconName.Close,
                                ariaLabel: e('close'),
                                onClick: this.props.onReset,
                                className: 'ens-input__wrapper__action-icon-button',
                                size: u.IconSize.Sm,
                              })
                            )
                          : a.default.createElement(
                              a.default.Fragment,
                              null,
                              a.default.createElement('input', {
                                className: 'ens-input__wrapper__input',
                                type: 'text',
                                dir: 'auto',
                                placeholder: e('recipientAddressPlaceholderNew'),
                                onChange: this.onChange,
                                onPaste: this.onPaste,
                                spellCheck: 'false',
                                value: n || s,
                                autoFocus: !0,
                                'data-testid': 'ens-input',
                              }),
                              a.default.createElement(u.ButtonIcon, {
                                className: 'ens-input__wrapper__action-icon-button',
                                onClick: () => {
                                  (null == s ? void 0 : s.length) > 0
                                    ? this.props.onReset()
                                    : this.props.scanQrCode();
                                },
                                iconName: s ? u.IconName.Close : u.IconName.Scan,
                                ariaLabel: e(s ? 'close' : 'scanQrCode'),
                                color: s ? d.IconColor.iconDefault : d.IconColor.primaryDefault,
                                'data-testid': 'ens-qr-scan-button',
                              })
                            )
                      )
                    );
                  }
                }
                (n.default = h),
                  p(h, 'contextTypes', { t: o.default.func, metricsEvent: o.default.func }),
                  p(h, 'propTypes', {
                    className: o.default.string,
                    useBlockie: o.default.bool,
                    selectedAddress: o.default.string,
                    selectedName: o.default.string,
                    scanQrCode: o.default.func,
                    onPaste: o.default.func,
                    onValidAddressTyped: o.default.func,
                    internalSearch: o.default.bool,
                    userInput: o.default.string,
                    onChange: o.default.func.isRequired,
                    onReset: o.default.func.isRequired,
                    lookupDomainName: o.default.func.isRequired,
                    initializeDomainSlice: o.default.func.isRequired,
                    resetDomainResolution: o.default.func.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/send/send-content/add-recipient/domain-input.component.js',
      },
    ],
    [
      7359,
      {
        '../../../../../ducks/domains': 6854,
        '../../../../../selectors': 7601,
        './domain-input.component': 7358,
        lodash: 4921,
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
                  o = e('lodash'),
                  r = e('react-redux'),
                  s = e('../../../../../ducks/domains'),
                  i = e('../../../../../selectors'),
                  c = (a = e('./domain-input.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.connect)(
                  function (e) {
                    return { useBlockie: (0, i.getUseBlockie)(e) };
                  },
                  function (e) {
                    return {
                      lookupDomainName: (0, o.debounce)(t => e((0, s.lookupDomainName)(t)), 150),
                      initializeDomainSlice: () => e((0, s.initializeDomainSlice)()),
                      resetDomainResolution: (0, o.debounce)(
                        () => e((0, s.resetDomainResolution)()),
                        300
                      ),
                    };
                  }
                )(c.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/send/send-content/add-recipient/domain-input.container.js',
      },
    ],
    [
      7360,
      { './domain-input.container': 7359 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./domain-input.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/confirmations/send/send-content/add-recipient/domain-input.js',
      },
    ],
    [
      7364,
      { './confirm': 7363 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./confirm');
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
      { package: '$root$', file: 'ui/pages/confirmations/utils/index.ts' },
    ],
    [
      7365,
      { '../../../store/actions': 7619, lodash: 4921 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.parseTokenDetailDecimals =
                    n.memoizedGetTokenStandardAndDetails =
                    n.fetchErc20Decimals =
                    n.ERC20_DEFAULT_DECIMALS =
                      void 0);
                var a = e('lodash'),
                  o = e('../../../store/actions');
                const r = (n.ERC20_DEFAULT_DECIMALS = 18),
                  s = e => {
                    if (!e) return undefined;
                    for (const t of [10, 16]) {
                      const n = parseInt(e, t);
                      if (isFinite(n)) return n;
                    }
                    return undefined;
                  };
                n.parseTokenDetailDecimals = s;
                const i = (n.memoizedGetTokenStandardAndDetails = (0, a.memoize)(
                  async (e, t, n) => {
                    try {
                      return e ? await (0, o.getTokenStandardAndDetails)(e, t, n) : {};
                    } catch {
                      return {};
                    }
                  }
                ));
                n.fetchErc20Decimals = async e => {
                  try {
                    const { decimals: t } = await i(e);
                    return s(t) ?? r;
                  } catch {
                    return r;
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/confirmations/utils/token.ts' },
    ],
    [
      7366,
      {
        '../../components/app/connected-accounts-list': 5996,
        '../../components/app/connected-accounts-permissions': 5998,
        '../../components/app/connected-sites-list/connected-snaps': 6002,
        '../../components/component-library': 6402,
        '../../components/ui/popover': 6789,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/utils/util': 6921,
        '../../hooks/useI18nContext': 6985,
        '../../selectors': 7601,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = v);
                var a = g(e('prop-types')),
                  o = g(e('react')),
                  r = e('react-redux'),
                  s = e('@metamask/snaps-utils'),
                  i = g(e('../../components/ui/popover')),
                  c = g(e('../../components/app/connected-accounts-list')),
                  l = g(e('../../components/app/connected-accounts-permissions')),
                  u = e('../../helpers/utils/util'),
                  d = e('../../hooks/useI18nContext'),
                  m = g(e('../../components/app/connected-sites-list/connected-snaps')),
                  f = e('../../helpers/constants/design-system'),
                  p = e('../../components/component-library'),
                  h = e('../../selectors');
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function v({
                  accountToConnect: e = null,
                  activeTabOrigin: t,
                  isActiveTabExtension: n,
                  connectAccount: a,
                  connectedAccounts: g,
                  history: v,
                  mostRecentOverviewPage: y,
                  permissions: T = undefined,
                  selectedAddress: k,
                  removePermittedAccount: x,
                  setSelectedAccount: w,
                  subjectMetadata: E,
                  originOfActiveTab: _,
                  permissionSubjects: b,
                }) {
                  var C, A, S;
                  const N = (0, d.useI18nContext)(),
                    P = (0, r.useSelector)(h.getInternalAccounts),
                    M = E[_],
                    I =
                      (null === (C = b[_]) || void 0 === C ? void 0 : C.origin) ===
                        (null == M ? void 0 : M.origin) &&
                      (null === (A = b[_]) || void 0 === A
                        ? void 0
                        : A.permissions[s.WALLET_SNAP_PERMISSION_KEY]),
                    O =
                      I &&
                      Object.keys(
                        null === (S = b[_]) ||
                          void 0 === S ||
                          null === (S = S.permissions) ||
                          void 0 === S ||
                          null === (S = S.wallet_snap) ||
                          void 0 === S ||
                          null === (S = S.caveats[0]) ||
                          void 0 === S
                          ? void 0
                          : S.value
                      ),
                    R = I && (null == O ? void 0 : O.map(e => E[e])),
                    D =
                      g.length > 0
                        ? N('connectedAccountsDescriptionPlural', [g.length])
                        : N('connectedAccountsDescriptionSingular');
                  let F;
                  return (
                    (F =
                      g.length && !I
                        ? D
                        : I && !g.length
                          ? N('connectedSnapAndNoAccountDescription')
                          : g && I
                            ? null
                            : N('connectedAccountsEmptyDescription')),
                    o.default.createElement(
                      i.default,
                      {
                        title: n ? N('currentExtension') : (0, u.getURLHost)(t),
                        headerProps: { paddingLeft: 4, paddingRight: 4 },
                        subtitle: F,
                        onClose: () => v.push(y),
                        footerClassName: 'connected-accounts__footer',
                        ConnectedAccountsPermissions: {},
                        footer:
                          g.length > 0 && o.default.createElement(l.default, { permissions: T }),
                      },
                      o.default.createElement(
                        p.Box,
                        null,
                        g.length > 0
                          ? o.default.createElement(
                              p.Box,
                              { marginLeft: 4 },
                              o.default.createElement(
                                p.Text,
                                {
                                  variant: f.TextVariant.bodyMdMedium,
                                  color: f.TextColor.textAlternative,
                                },
                                N('accountsConnected'),
                                ' (',
                                g.length,
                                ')'
                              )
                            )
                          : null,
                        o.default.createElement(c.default, {
                          accountToConnect: e,
                          connectAccount: a,
                          connectedAccounts: g,
                          selectedAddress: k,
                          removePermittedAccount: x,
                          setSelectedAddress: e => {
                            const { id: t } = P.find(t => t.address === e);
                            w(t);
                          },
                          shouldRenderListOptions: !0,
                        })
                      ),
                      I &&
                        R.length > 0 &&
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(
                            p.Box,
                            { marginLeft: 4 },
                            o.default.createElement(
                              p.Text,
                              {
                                variant: f.TextVariant.bodyMdMedium,
                                color: f.TextColor.textAlternative,
                              },
                              N('snapsConnected'),
                              ' (',
                              O.length,
                              ')'
                            )
                          ),
                          o.default.createElement(m.default, { connectedSubjects: R })
                        )
                    )
                  );
                }
                v.propTypes = {
                  accountToConnect: a.default.object,
                  activeTabOrigin: a.default.string.isRequired,
                  connectAccount: a.default.func.isRequired,
                  connectedAccounts: a.default.array.isRequired,
                  mostRecentOverviewPage: a.default.string.isRequired,
                  permissions: a.default.array,
                  isActiveTabExtension: a.default.bool.isRequired,
                  selectedAddress: a.default.string.isRequired,
                  removePermittedAccount: a.default.func.isRequired,
                  setSelectedAccount: a.default.func.isRequired,
                  history: a.default.object.isRequired,
                  subjectMetadata: a.default.arrayOf(a.default.object).isRequired,
                  originOfActiveTab: a.default.string,
                  permissionSubjects: a.default.object,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/connected-accounts/connected-accounts.component.js' },
    ],
    [
      7367,
      {
        '../../ducks/history/history': 6857,
        '../../helpers/utils/util': 6921,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        './connected-accounts.component': 7366,
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
                  o = e('react-redux'),
                  r = e('../../selectors'),
                  s = e('../../helpers/utils/util'),
                  i = e('../../store/actions'),
                  c = e('../../ducks/history/history'),
                  l =
                    (a = e('./connected-accounts.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.connect)(
                  e => {
                    var t;
                    const { activeTab: n } = e,
                      a = (0, r.getAccountToConnectToActiveTab)(e),
                      o = (0, r.getOrderedConnectedAccountsForActiveTab)(e),
                      i = (0, r.getInternalAccounts)(e),
                      l = new Map(i.map(e => [e.address, e])),
                      u = o.map(e => {
                        var t;
                        return {
                          ...e,
                          name:
                            null === (t = l.get(e.address)) || void 0 === t
                              ? void 0
                              : t.metadata.name,
                        };
                      }),
                      d = a && {
                        ...a,
                        name:
                          null ===
                            (t = i.find(e => e.address === (null == a ? void 0 : a.address))) ||
                          void 0 === t
                            ? void 0
                            : t.metadata.name,
                      },
                      m = (0, r.getPermissionsForActiveTab)(e),
                      { address: f } = (0, r.getSelectedInternalAccount)(e),
                      p = (0, r.getSubjectMetadata)(e),
                      h = (0, r.getOriginOfCurrentTab)(e),
                      g = (0, r.getPermissionSubjects)(e);
                    return {
                      accountToConnect: d,
                      isActiveTabExtension: (0, s.isExtensionUrl)(n),
                      activeTabOrigin: n.origin,
                      connectedAccounts: u,
                      mostRecentOverviewPage: (0, c.getMostRecentOverviewPage)(e),
                      permissions: m,
                      selectedAddress: f,
                      subjectMetadata: p,
                      originOfActiveTab: h,
                      permissionSubjects: g,
                    };
                  },
                  e => ({
                    addPermittedAccount: (t, n) => e((0, i.addPermittedAccount)(t, n)),
                    removePermittedAccount: (t, n) => e((0, i.removePermittedAccount)(t, n)),
                    setSelectedAccount: t => e((0, i.setSelectedInternalAccount)(t)),
                  }),
                  (e, t, n) => {
                    const { activeTabOrigin: a } = e;
                    return {
                      ...n,
                      ...e,
                      ...t,
                      connectAccount: e => t.addPermittedAccount(a, e),
                      removePermittedAccount: e => t.removePermittedAccount(a, e),
                    };
                  }
                )(l.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/connected-accounts/connected-accounts.container.js' },
    ],
    [
      7368,
      { './connected-accounts.container': 7367 },
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
                      return o.default;
                    },
                  });
                var a,
                  o =
                    (a = e('./connected-accounts.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/connected-accounts/index.js' },
    ],
    [
      7369,
      {
        '../../components/app/connected-sites-list': 6003,
        '../../components/ui/button': 6707,
        '../../components/ui/popover/popover.component': 6790,
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
                var a = l(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = l(e('../../components/app/connected-sites-list')),
                  s = l(e('../../components/ui/popover/popover.component')),
                  i = l(e('../../components/ui/button'));
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
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
                class d extends o.Component {
                  constructor(...e) {
                    super(...e),
                      u(this, 'state', { sitePendingDisconnect: null }),
                      u(this, 'setPendingDisconnect', e => {
                        this.setState({ sitePendingDisconnect: { subjectKey: e } });
                      }),
                      u(this, 'clearPendingDisconnect', () => {
                        this.setState({ sitePendingDisconnect: null });
                      }),
                      u(this, 'disconnectAccount', () => {
                        const { disconnectAccount: e } = this.props,
                          { sitePendingDisconnect: t } = this.state;
                        e(t.subjectKey), this.clearPendingDisconnect();
                      }),
                      u(this, 'disconnectAllAccounts', () => {
                        const { disconnectAllAccounts: e } = this.props,
                          { sitePendingDisconnect: t } = this.state;
                        e(t.subjectKey), this.clearPendingDisconnect();
                      });
                  }
                  componentDidMount() {
                    const { getOpenMetamaskTabsIds: e } = this.props;
                    e();
                  }
                  renderConnectedSitesList() {
                    return o.default.createElement(r.default, {
                      connectedSubjects: this.props.connectedSubjects,
                      onDisconnect: this.setPendingDisconnect,
                    });
                  }
                  renderConnectedSitesPopover() {
                    const {
                        accountLabel: e,
                        closePopover: t,
                        connectedSubjects: n,
                        tabToConnect: a,
                        requestAccountsPermission: r,
                      } = this.props,
                      { t: i } = this.context;
                    return o.default.createElement(
                      s.default,
                      {
                        className: 'connected-sites',
                        title: i('connectedSites'),
                        subtitle: n.length
                          ? i('connectedSitesDescription', [e])
                          : i('connectedSitesEmptyDescription', [e]),
                        onClose: t,
                        footer: a
                          ? o.default.createElement(
                              'a',
                              { className: 'connected-sites__text-button', onClick: r },
                              i('connectManually')
                            )
                          : null,
                        footerClassName: 'connected-sites__add-site-manually',
                      },
                      this.renderConnectedSitesList()
                    );
                  }
                  renderDisconnectPopover() {
                    const { closePopover: e, permittedAccountsByOrigin: t } = this.props,
                      { t: n } = this.context,
                      {
                        sitePendingDisconnect: { subjectKey: a },
                      } = this.state,
                      r = t[a].length;
                    return o.default.createElement(s.default, {
                      className: 'connected-sites',
                      title: n('disconnectPrompt', [a]),
                      subtitle: n('disconnectAllAccountsConfirmationDescription'),
                      onClose: e,
                      footer: o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(
                          'div',
                          { className: 'connected-sites__footer-row' },
                          o.default.createElement(
                            i.default,
                            { type: 'secondary', onClick: this.clearPendingDisconnect },
                            n('cancel')
                          ),
                          o.default.createElement(
                            i.default,
                            { type: 'primary', onClick: this.disconnectAccount },
                            n('disconnect')
                          )
                        ),
                        r > 1
                          ? o.default.createElement(
                              'div',
                              { className: 'connected-sites__footer-row' },
                              o.default.createElement(
                                'a',
                                {
                                  className: 'connected-sites__text-button',
                                  onClick: this.disconnectAllAccounts,
                                },
                                n('disconnectAllAccounts')
                              )
                            )
                          : null
                      ),
                      footerClassName: 'connected-sites__confirmation',
                    });
                  }
                  render() {
                    const { sitePendingDisconnect: e } = this.state;
                    return e ? this.renderDisconnectPopover() : this.renderConnectedSitesPopover();
                  }
                }
                (n.default = d),
                  u(d, 'contextTypes', { t: a.default.func }),
                  u(d, 'defaultProps', { tabToConnect: null }),
                  u(d, 'propTypes', {
                    accountLabel: a.default.string.isRequired,
                    closePopover: a.default.func.isRequired,
                    connectedSubjects: a.default.arrayOf(a.default.object).isRequired,
                    disconnectAllAccounts: a.default.func.isRequired,
                    disconnectAccount: a.default.func.isRequired,
                    getOpenMetamaskTabsIds: a.default.func.isRequired,
                    permittedAccountsByOrigin: a.default.objectOf(
                      a.default.arrayOf(a.default.string)
                    ).isRequired,
                    tabToConnect: a.default.object,
                    requestAccountsPermission: a.default.func.isRequired,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/connected-sites/connected-sites.component.js' },
    ],
    [
      7370,
      {
        '../../ducks/history/history': 6857,
        '../../helpers/constants/routes': 6878,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        './connected-sites.component': 7369,
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
                  o = e('react-redux'),
                  r = e('../../store/actions'),
                  s = e('../../selectors'),
                  i = e('../../helpers/constants/routes'),
                  c = e('../../ducks/history/history'),
                  l = (a = e('./connected-sites.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.connect)(
                  e => {
                    var t;
                    const { openMetaMaskTabs: n } = e.appState,
                      { id: a } = e.activeTab,
                      o = (0, s.getConnectedSubjectsForSelectedAddress)(e),
                      r = (0, s.getOriginOfCurrentTab)(e),
                      i = (0, s.getPermittedAccountsByOrigin)(e),
                      { address: l } = (0, s.getSelectedInternalAccount)(e),
                      u = !(null !== (t = i[r]) && void 0 !== t && t.length);
                    let d;
                    return (
                      r && u && !n[a] && (d = { origin: r }),
                      {
                        accountLabel: (0, s.getSelectedInternalAccount)(e).metadata.name,
                        connectedSubjects: o,
                        subjects: (0, s.getPermissionSubjects)(e),
                        mostRecentOverviewPage: (0, c.getMostRecentOverviewPage)(e),
                        permittedAccountsByOrigin: i,
                        selectedAddress: l,
                        tabToConnect: d,
                      }
                    );
                  },
                  e => ({
                    getOpenMetamaskTabsIds: () => e((0, r.getOpenMetamaskTabsIds)()),
                    disconnectAccount: (t, n) => {
                      e((0, r.removePermittedAccount)(t, n));
                    },
                    disconnectAllAccounts: (t, n) => {
                      const a = Object.values(n.permissions).map(({ parentCapability: e }) => e);
                      e((0, r.removePermissionsFor)({ [t]: a }));
                    },
                    requestAccountsAndChainPermissionsWithId: t =>
                      e((0, r.requestAccountsAndChainPermissionsWithId)(t)),
                  }),
                  (e, t, n) => {
                    const {
                        connectedSubjects: a,
                        subjects: o,
                        mostRecentOverviewPage: r,
                        selectedAddress: s,
                        tabToConnect: c,
                      } = e,
                      {
                        disconnectAccount: l,
                        disconnectAllAccounts: u,
                        requestAccountsAndChainPermissionsWithId: d,
                      } = t,
                      { history: m } = n,
                      f = () => m.push(r);
                    return {
                      ...n,
                      ...e,
                      ...t,
                      closePopover: f,
                      disconnectAccount: e => {
                        l(e, s), 1 === a.length && f();
                      },
                      disconnectAllAccounts: e => {
                        u(e, o[e]), 1 === a.length && f();
                      },
                      requestAccountsPermission: async () => {
                        const e = await d(c.origin);
                        m.push(`${i.CONNECT_ROUTE}/${e}`);
                      },
                    };
                  }
                )(l.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/connected-sites/connected-sites.container.js' },
    ],
    [
      7371,
      { './connected-sites.container': 7370 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./connected-sites.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/connected-sites/index.js' },
    ],
    [
      7372,
      {
        '../../../../shared/constants/hardware-wallets': 5796,
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/ui/button': 6707,
        '../../../components/ui/check-box': 6713,
        '../../../components/ui/dropdown': 6732,
        '../../../helpers/utils/util': 6921,
        '@metamask/etherscan-link': 1938,
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
                var a = f(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('@metamask/etherscan-link'),
                  s = f(e('../../../components/ui/button')),
                  i = f(e('../../../components/ui/check-box')),
                  c = f(e('../../../components/ui/dropdown')),
                  l = e('../../../helpers/utils/util'),
                  u = e('../../../../shared/constants/hardware-wallets'),
                  d = e('../../../../shared/constants/metametrics');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function f(e) {
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
                class h extends o.Component {
                  constructor(...e) {
                    super(...e),
                      p(this, 'state', { pathValue: null }),
                      p(this, 'goToNextPage', () => {
                        5 === this.props.accounts.length
                          ? this.props.getPage(this.props.device, 1, this.props.selectedPath, !1)
                          : this.props.onAccountRestriction();
                      }),
                      p(this, 'goToPreviousPage', () => {
                        this.props.getPage(this.props.device, -1, this.props.selectedPath, !1);
                      });
                  }
                  setPath(e) {
                    this.setState({ pathValue: e });
                  }
                  isFirstPage() {
                    var e;
                    return (
                      0 ===
                      (null === (e = this.props.accounts[0]) || void 0 === e ? void 0 : e.index)
                    );
                  }
                  renderHdPathSelector() {
                    const { device: e, selectedPath: t, hdPaths: n, onPathChange: a } = this.props,
                      { pathValue: r } = this.state;
                    return o.default.createElement(
                      'div',
                      null,
                      o.default.createElement(
                        'h3',
                        { className: 'hw-connect__hdPath__title' },
                        this.context.t('selectHdPath')
                      ),
                      o.default.createElement(
                        'p',
                        { className: 'hw-connect__msg' },
                        this.context.t('selectPathHelp')
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'hw-connect__hdPath' },
                        o.default.createElement(c.default, {
                          className: 'hw-connect__hdPath__select',
                          options: n[e],
                          selectedOption: r || t,
                          onChange: e => {
                            this.setPath(e), a(e);
                          },
                        })
                      )
                    );
                  }
                  capitalizeDevice(e) {
                    return e.slice(0, 1).toUpperCase() + e.slice(1);
                  }
                  renderHeader() {
                    const { device: e } = this.props,
                      t = [
                        u.HardwareDeviceNames.ledger,
                        u.HardwareDeviceNames.lattice,
                        u.HardwareDeviceNames.trezor,
                        u.HardwareDeviceNames.oneKey,
                      ].includes(e);
                    return o.default.createElement(
                      'div',
                      { className: 'hw-connect' },
                      o.default.createElement(
                        'h3',
                        { className: 'hw-connect__unlock-title' },
                        this.context.t('selectAnAccount')
                      ),
                      t ? this.renderHdPathSelector() : null,
                      o.default.createElement(
                        'h3',
                        { className: 'hw-connect__hdPath__title' },
                        this.context.t('selectAnAccount')
                      )
                    );
                  }
                  renderAccounts() {
                    const {
                      accounts: e,
                      connectedAccounts: t,
                      rpcPrefs: n,
                      chainId: a,
                    } = this.props;
                    return o.default.createElement(
                      'div',
                      { className: 'hw-account-list' },
                      e.map((e, s) => {
                        const c = t.includes(e.address.toLowerCase()),
                          u = e.index,
                          m = this.props.selectedAccounts.includes(e.index) || c,
                          f = (0, r.getAccountLink)(e.address, a, n),
                          p = (0, l.getURLHostName)(f);
                        return o.default.createElement(
                          'div',
                          {
                            className: 'hw-account-list__item',
                            key: e.address,
                            'data-testid': 'hw-account-list__item',
                            title: c ? this.context.t('selectAnAccountAlreadyConnected') : '',
                          },
                          o.default.createElement(
                            'div',
                            { className: 'hw-account-list__item__checkbox' },
                            o.default.createElement(i.default, {
                              id: `address-${s}`,
                              checked: m,
                              disabled: c,
                              onClick: () => {
                                this.props.onAccountChange(u);
                              },
                            }),
                            o.default.createElement(
                              'label',
                              {
                                className: 'hw-account-list__item__label',
                                htmlFor: `address-${s}`,
                              },
                              o.default.createElement(
                                'span',
                                { className: 'hw-account-list__item__index' },
                                e.index + 1
                              ),
                              `${e.address.slice(0, 4)}...${e.address.slice(-4)}`,
                              o.default.createElement(
                                'span',
                                { className: 'hw-account-list__item__balance' },
                                `${e.balance}`
                              )
                            )
                          ),
                          o.default.createElement(
                            'a',
                            {
                              className: 'hw-account-list__item__link',
                              onClick: () => {
                                this.context.trackEvent({
                                  category: d.MetaMetricsEventCategory.Accounts,
                                  event: 'Clicked Block Explorer Link',
                                  properties: {
                                    actions: 'Hardware Connect',
                                    link_type: 'Account Tracker',
                                    block_explorer_domain: p,
                                  },
                                }),
                                  global.platform.openTab({ url: f });
                              },
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              title: this.context.t('genericExplorerView', [p]),
                            },
                            o.default.createElement('i', {
                              className: 'fa fa-share-square',
                              style: { color: 'var(--color-icon-default)' },
                            })
                          )
                        );
                      })
                    );
                  }
                  renderPagination() {
                    return o.default.createElement(
                      'div',
                      { className: 'hw-list-pagination' },
                      o.default.createElement(
                        'button',
                        {
                          className: 'hw-list-pagination__button',
                          disabled: this.isFirstPage(),
                          onClick: this.goToPreviousPage,
                          'data-testid': 'hw-list-pagination__prev-button',
                        },
                        `< ${this.context.t('prev')}`
                      ),
                      o.default.createElement(
                        'button',
                        { className: 'hw-list-pagination__button', onClick: this.goToNextPage },
                        `${this.context.t('next')} >`
                      )
                    );
                  }
                  renderButtons() {
                    const e = 0 === this.props.selectedAccounts.length;
                    return (
                      e && ({}.disabled = !0),
                      o.default.createElement(
                        'div',
                        { className: 'new-external-account-form__buttons' },
                        o.default.createElement(
                          s.default,
                          {
                            type: 'secondary',
                            large: !0,
                            className: 'new-external-account-form__button',
                            onClick: this.props.onCancel.bind(this),
                          },
                          this.context.t('cancel')
                        ),
                        o.default.createElement(
                          s.default,
                          {
                            type: 'primary',
                            large: !0,
                            className: 'new-external-account-form__button unlock',
                            disabled: e,
                            onClick: this.props.onUnlockAccounts.bind(
                              this,
                              this.props.device,
                              this.props.selectedPath
                            ),
                          },
                          this.context.t('unlock')
                        )
                      )
                    );
                  }
                  renderForgetDevice() {
                    return o.default.createElement(
                      'div',
                      { className: 'hw-forget-device-container' },
                      o.default.createElement(
                        'a',
                        { onClick: this.props.onForgetDevice.bind(this, this.props.device) },
                        this.context.t('forgetDevice')
                      )
                    );
                  }
                  render() {
                    return o.default.createElement(
                      'div',
                      { className: 'new-external-account-form account-list' },
                      this.renderHeader(),
                      this.renderAccounts(),
                      this.renderPagination(),
                      this.renderButtons(),
                      this.renderForgetDevice()
                    );
                  }
                }
                (h.propTypes = {
                  onPathChange: a.default.func.isRequired,
                  selectedPath: a.default.string.isRequired,
                  device: a.default.string.isRequired,
                  accounts: a.default.array.isRequired,
                  connectedAccounts: a.default.array.isRequired,
                  onAccountChange: a.default.func.isRequired,
                  onForgetDevice: a.default.func.isRequired,
                  getPage: a.default.func.isRequired,
                  chainId: a.default.string,
                  rpcPrefs: a.default.object,
                  selectedAccounts: a.default.array.isRequired,
                  onUnlockAccounts: a.default.func,
                  onCancel: a.default.func,
                  onAccountRestriction: a.default.func,
                  hdPaths: a.default.object.isRequired,
                }),
                  (h.contextTypes = { t: a.default.func, trackEvent: a.default.func });
                n.default = h;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/create-account/connect-hardware/account-list.js' },
    ],
    [
      7373,
      {
        '../../../../shared/constants/hardware-wallets': 5796,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/time': 5817,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/component-library': 6402,
        '../../../ducks/history/history': 6857,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../helpers/utils/util': 6921,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        './account-list': 7372,
        './select-hardware': 7374,
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
                  (n.default = n.TREZOR_HD_PATHS = n.LEDGER_HD_PATHS = n.LATTICE_HD_PATHS = void 0);
                var a = w(e('react')),
                  o = k(e('prop-types')),
                  r = e('react-redux'),
                  s = w(e('../../../store/actions')),
                  i = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../selectors'),
                  l = e('../../../helpers/utils/util'),
                  u = e('../../../ducks/history/history'),
                  d = e('../../../../shared/constants/metametrics'),
                  m = e('../../../../shared/constants/time'),
                  f = e('../../../../shared/constants/hardware-wallets'),
                  p = e('../../../components/component-library'),
                  h = k(e('../../../helpers/constants/zendesk-url')),
                  g = e('../../../helpers/constants/design-system'),
                  v = e('../../../selectors/selectors'),
                  y = k(e('./account-list')),
                  T = k(e('./select-hardware'));
                function k(e) {
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
                function w(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = x(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                      s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                function E(e, t, n) {
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
                const _ = 'U2F',
                  b = {
                    '0x650f': 'ledgerErrorConnectionIssue',
                    '0x5515': 'ledgerErrorDevicedLocked',
                    '0x6501': 'ledgerErrorEthAppNotOpen',
                    '0x6a80': 'ledgerErrorTransactionDataNotPadded',
                  },
                  C = "m/44'/60'/0'",
                  A = "m/44'/60'/0'/0",
                  S = (n.LEDGER_HD_PATHS = [
                    { name: 'Ledger Live', value: "m/44'/60'/0'/0/0" },
                    { name: 'Legacy (MEW / MyCrypto)', value: C },
                    { name: 'BIP44 Standard (e.g. MetaMask, Trezor)', value: A },
                  ]),
                  N = "m/44'/60'/0'/0/x",
                  P = "m/44'/60'/x'/0/0",
                  M = "m/44'/60'/0'/x",
                  I = (n.LATTICE_HD_PATHS = [
                    { name: `Standard (${N})`, value: N },
                    { name: `Ledger Live (${P})`, value: P },
                    { name: `Ledger Legacy (${M})`, value: M },
                  ]),
                  O = (n.TREZOR_HD_PATHS = [
                    { name: 'BIP44 Standard (e.g. MetaMask, Trezor)', value: A },
                    { name: 'Legacy (Ledger / MEW / MyCrypto)', value: C },
                    { name: 'Trezor Testnets', value: "m/44'/1'/0'/0" },
                  ]),
                  R = { ledger: S, lattice: I, trezor: O, oneKey: O },
                  D = (e, t) => {
                    switch (e) {
                      case '0x650f':
                        return t('ledgerErrorConnectionIssue');
                      case '0x5515':
                        return t('ledgerErrorDevicedLocked');
                      case '0x6501':
                        return t('ledgerErrorEthAppNotOpen');
                      case '0x6a80':
                        return t('ledgerErrorTransactionDataNotPadded');
                      default:
                        return e;
                    }
                  };
                class F extends a.Component {
                  constructor(...e) {
                    super(...e),
                      E(this, 'state', {
                        error: null,
                        selectedAccounts: [],
                        accounts: [],
                        browserSupported: !0,
                        unlocked: !1,
                        device: null,
                        isFirefox: !1,
                      }),
                      E(this, 'connectToHardwareWallet', e => {
                        this.setState({ device: e }),
                          this.state.accounts.length ||
                            this.getPage(e, 0, this.props.defaultHdPaths[e], !0);
                      }),
                      E(this, 'onPathChange', e => {
                        this.props.setHardwareWalletDefaultHdPath({
                          device: this.state.device,
                          path: e,
                        }),
                          this.setState({ selectedAccounts: [] }),
                          this.getPage(this.state.device, 0, e);
                      }),
                      E(this, 'onAccountChange', e => {
                        let { selectedAccounts: t } = this.state;
                        t.includes(e) ? (t = t.filter(t => e !== t)) : t.push(e),
                          this.setState({ selectedAccounts: t, error: null });
                      }),
                      E(this, 'onAccountRestriction', () => {
                        this.setState({ error: this.context.t('ledgerAccountRestriction') });
                      }),
                      E(this, 'getPage', (e, t, n, a) => {
                        this.props
                          .connectHardware(e, t, n, a, this.context.t)
                          .then(t => {
                            if (t.length) {
                              0 !== this.state.accounts.length ||
                                this.state.unlocked ||
                                this.showTemporaryAlert();
                              const n = t.map(e => {
                                var t;
                                const n = e.address.toLowerCase(),
                                  a =
                                    (null === (t = this.props.accounts[n]) || void 0 === t
                                      ? void 0
                                      : t.balance) || null;
                                return (e.balance = a ? (0, l.formatBalance)(a, 6) : '...'), e;
                              });
                              this.setState({ accounts: n, unlocked: !0, device: e, error: null });
                            }
                          })
                          .catch(e => {
                            const t = 'string' == typeof e ? e : e.message,
                              n = Object.keys(b).find(e => t.includes(e));
                            'Window blocked' === t
                              ? this.setState({ browserSupported: !1, error: null })
                              : t.includes(_)
                                ? this.setState({ error: _ })
                                : 'LEDGER_LOCKED' === t || 'LEDGER_WRONG_APP' === t
                                  ? this.setState({ error: this.context.t('ledgerLocked') })
                                  : t.includes('timeout')
                                    ? this.setState({ error: this.context.t('ledgerTimeout') })
                                    : n
                                      ? this.setState({ error: `${t} - ${D(n)}` })
                                      : t
                                            .toLowerCase()
                                            .includes(
                                              'KeystoneError#pubkey_account.no_expected_account'.toLowerCase()
                                            )
                                        ? this.setState({
                                            error: this.context.t(
                                              'QRHardwarePubkeyAccountOutOfRange'
                                            ),
                                          })
                                        : 'Window closed' !== t &&
                                          'Popup closed' !== t &&
                                          !1 ===
                                            t
                                              .toLowerCase()
                                              .includes(
                                                'KeystoneError#sync_cancel'.toLowerCase()
                                              ) &&
                                          this.setState({ error: t });
                          });
                      }),
                      E(this, 'onForgetDevice', e => {
                        this.props
                          .forgetDevice(e)
                          .then(e => {
                            this.setState({
                              error: null,
                              selectedAccounts: [],
                              accounts: [],
                              unlocked: !1,
                            });
                          })
                          .catch(e => {
                            this.setState({ error: e.message });
                          });
                      }),
                      E(this, 'onUnlockAccounts', async (e, t) => {
                        const {
                            history: n,
                            mostRecentOverviewPage: a,
                            unlockHardwareWalletAccounts: o,
                            hdEntropyIndex: r,
                          } = this.props,
                          { selectedAccounts: s } = this.state;
                        0 === s.length &&
                          this.setState({ error: this.context.t('accountSelectionRequired') });
                        const i = C === t ? this.context.t('hardwareWalletLegacyDescription') : '';
                        return o(s, e, t || null, i)
                          .then(t => {
                            this.context.trackEvent({
                              category: d.MetaMetricsEventCategory.Accounts,
                              event: d.MetaMetricsEventName.AccountAdded,
                              properties: {
                                account_type: d.MetaMetricsEventAccountType.Hardware,
                                account_hardware_type: e,
                              },
                            }),
                              n.push(a);
                          })
                          .catch(t => {
                            this.context.trackEvent({
                              category: d.MetaMetricsEventCategory.Accounts,
                              event: d.MetaMetricsEventName.AccountAddFailed,
                              properties: {
                                account_type: d.MetaMetricsEventAccountType.Hardware,
                                account_hardware_type: e,
                                error: t.message,
                                hd_entropy_index: r,
                              },
                            }),
                              this.setState({ error: t.message });
                          });
                      }),
                      E(this, 'onCancel', () => {
                        const { history: e, mostRecentOverviewPage: t } = this.props;
                        e.push(t);
                      });
                  }
                  UNSAFE_componentWillReceiveProps(e) {
                    const { accounts: t } = e,
                      n = this.state.accounts.map(e => {
                        var n;
                        const a = e.address.toLowerCase(),
                          o = (null === (n = t[a]) || void 0 === n ? void 0 : n.balance) || null;
                        return (e.balance = o ? (0, l.formatBalance)(o, 6) : '...'), e;
                      });
                    this.setState({ accounts: n });
                  }
                  componentDidMount() {
                    this.checkIfUnlocked();
                    const e = window.navigator.userAgent;
                    /Firefox/u.test(e) && this.setState({ isFirefox: !0 });
                  }
                  async checkIfUnlocked() {
                    for (const e of [
                      f.HardwareDeviceNames.trezor,
                      f.HardwareDeviceNames.oneKey,
                      f.HardwareDeviceNames.ledger,
                      f.HardwareDeviceNames.lattice,
                    ]) {
                      const t = this.props.defaultHdPaths[e];
                      (await this.props.checkHardwareStatus(e, t)) &&
                        this.state.device &&
                        (this.setState({ unlocked: !0 }), this.getPage(e, 0, t));
                    }
                  }
                  showTemporaryAlert() {
                    this.props.showAlert(this.context.t('hardwareWalletConnected')),
                      setTimeout(e => {
                        this.props.hideAlert();
                      }, 5 * m.SECOND);
                  }
                  renderError() {
                    return this.state.error === _
                      ? 'ledger' === this.state.device && this.state.isFirefox
                        ? a.default.createElement(
                            a.default.Fragment,
                            null,
                            a.default.createElement(
                              p.Text,
                              { color: g.TextColor.warningDefault, margin: [5, 5, 2] },
                              this.context.t('troubleConnectingToLedgerU2FOnFirefox', [
                                a.default.createElement(
                                  p.Button,
                                  {
                                    variant: p.BUTTON_VARIANT.LINK,
                                    href: h.default.HARDWARE_CONNECTION,
                                    size: p.BUTTON_SIZES.INHERIT,
                                    key: 'u2f-error-1',
                                    as: 'a',
                                    block: !1,
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                  },
                                  this.context.t('troubleConnectingToLedgerU2FOnFirefox2')
                                ),
                              ])
                            ),
                            a.default.createElement(
                              p.Text,
                              { color: g.TextColor.warningDefault, margin: [5, 5, 2] },
                              this.context.t(
                                'troubleConnectingToLedgerU2FOnFirefoxLedgerSolution',
                                [
                                  a.default.createElement(
                                    p.Button,
                                    {
                                      variant: p.BUTTON_VARIANT.LINK,
                                      href: h.default.LEDGER_FIREFOX_U2F_GUIDE,
                                      size: p.BUTTON_SIZES.INHERIT,
                                      key: 'u2f-error-1',
                                      as: 'a',
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                    },
                                    this.context.t(
                                      'troubleConnectingToLedgerU2FOnFirefoxLedgerSolution2'
                                    )
                                  ),
                                ]
                              )
                            )
                          )
                        : a.default.createElement(
                            p.Text,
                            { color: g.TextColor.warningDefault, margin: [5, 5, 2] },
                            this.context.t('troubleConnectingToWallet', [
                              this.state.device,
                              a.default.createElement(
                                p.Button,
                                {
                                  variant: p.BUTTON_VARIANT.LINK,
                                  href: h.default.HARDWARE_CONNECTION,
                                  key: 'u2f-error-1',
                                },
                                this.context.t('walletConnectionGuide')
                              ),
                            ])
                          )
                      : this.state.error
                        ? a.default.createElement(
                            'span',
                            { className: 'hw-connect__error' },
                            this.state.error
                          )
                        : null;
                  }
                  renderContent() {
                    return this.state.accounts.length
                      ? a.default.createElement(y.default, {
                          onPathChange: this.onPathChange,
                          selectedPath: this.props.defaultHdPaths[this.state.device],
                          device: this.state.device,
                          accounts: this.state.accounts,
                          connectedAccounts: this.props.connectedAccounts,
                          selectedAccounts: this.state.selectedAccounts,
                          onAccountChange: this.onAccountChange,
                          chainId: this.props.chainId,
                          rpcPrefs: this.props.rpcPrefs,
                          getPage: this.getPage,
                          onUnlockAccounts: this.onUnlockAccounts,
                          onForgetDevice: this.onForgetDevice,
                          onCancel: this.onCancel,
                          onAccountRestriction: this.onAccountRestriction,
                          hdPaths: R,
                        })
                      : a.default.createElement(T.default, {
                          connectToHardwareWallet: this.connectToHardwareWallet,
                          browserSupported: this.state.browserSupported,
                          ledgerTransportType: this.props.ledgerTransportType,
                          onCancel: this.onCancel,
                        });
                  }
                  render() {
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      this.renderError(),
                      this.renderContent()
                    );
                  }
                }
                E(F, 'contextTypes', { t: o.default.func }),
                  (F.propTypes = {
                    connectHardware: o.default.func,
                    checkHardwareStatus: o.default.func,
                    forgetDevice: o.default.func,
                    showAlert: o.default.func,
                    hideAlert: o.default.func,
                    unlockHardwareWalletAccounts: o.default.func,
                    setHardwareWalletDefaultHdPath: o.default.func,
                    history: o.default.object,
                    chainId: o.default.string,
                    rpcPrefs: o.default.object,
                    accounts: o.default.object,
                    connectedAccounts: o.default.array.isRequired,
                    defaultHdPaths: o.default.object,
                    mostRecentOverviewPage: o.default.string.isRequired,
                    ledgerTransportType: o.default.oneOf(Object.values(f.LedgerTransportTypes)),
                    hdEntropyIndex: o.default.number,
                  });
                F.contextTypes = { t: o.default.func, trackEvent: o.default.func };
                n.default = (0, r.connect)(
                  e => ({
                    chainId: (0, i.getCurrentChainId)(e),
                    rpcPrefs: (0, c.getRpcPrefsForCurrentProvider)(e),
                    accounts: (0, c.getMetaMaskAccounts)(e),
                    connectedAccounts: (0, c.getMetaMaskAccountsConnected)(e),
                    defaultHdPaths: e.appState.defaultHdPaths,
                    mostRecentOverviewPage: (0, u.getMostRecentOverviewPage)(e),
                    ledgerTransportType: e.metamask.ledgerTransportType,
                    hdEntropyIndex: (0, v.getHDEntropyIndex)(e),
                  }),
                  e => ({
                    setHardwareWalletDefaultHdPath: ({ device: t, path: n }) =>
                      e(s.setHardwareWalletDefaultHdPath({ device: t, path: n })),
                    connectHardware: (t, n, a, o, r) => e(s.connectHardware(t, n, a, o, r)),
                    checkHardwareStatus: (t, n) => e(s.checkHardwareStatus(t, n)),
                    forgetDevice: t => e(s.forgetDevice(t)),
                    unlockHardwareWalletAccounts: (t, n, a, o) =>
                      e(s.unlockHardwareWalletAccounts(t, n, a, o)),
                    showAlert: t => e(s.showAlert(t)),
                    hideAlert: () => e(s.hideAlert()),
                  })
                )(F);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/create-account/connect-hardware/index.js' },
    ],
    [
      7374,
      {
        '../../../../shared/constants/hardware-wallets': 5796,
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../components/ui/logo/logo-lattice': 6767,
        '../../../components/ui/logo/logo-ledger': 6768,
        '../../../components/ui/logo/logo-qr-based': 6769,
        '../../../components/ui/logo/logo-trezor': 6770,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../helpers/utils/window': 6923,
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
                var a = v(e('classnames')),
                  o = v(e('prop-types')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('../../../components/component-library'),
                  i = v(e('../../../components/ui/logo/logo-ledger')),
                  c = v(e('../../../components/ui/logo/logo-qr-based')),
                  l = v(e('../../../components/ui/logo/logo-trezor')),
                  u = v(e('../../../components/ui/logo/logo-lattice')),
                  d = e('../../../../shared/constants/hardware-wallets'),
                  m = v(e('../../../helpers/constants/zendesk-url')),
                  f = e('../../../../shared/constants/metametrics'),
                  p = e('../../../helpers/utils/window'),
                  h = e('../../../helpers/constants/design-system');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function v(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y() {
                  return (
                    (y = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    y.apply(null, arguments)
                  );
                }
                function T(e, t, n) {
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
                const k = window.navigator.usb;
                class x extends r.Component {
                  constructor(...e) {
                    super(...e),
                      T(this, 'state', { selectedDevice: null, trezorRequestDevicePending: !1 }),
                      T(this, 'connect', async () => {
                        const { selectedDevice: e } = this.state;
                        if (e) {
                          if (e === d.HardwareDeviceNames.trezor && k) {
                            this.setState({ trezorRequestDevicePending: !0 });
                            try {
                              await window.navigator.usb.requestDevice({
                                filters: [
                                  { vendorId: 21324, productId: 1 },
                                  { vendorId: 4617, productId: 21440 },
                                  { vendorId: 4617, productId: 21441 },
                                ],
                              });
                            } catch (e) {
                              if (!e.message.match('No device selected')) throw e;
                            } finally {
                              this.setState({ trezorRequestDevicePending: !1 });
                            }
                          }
                          this.props.connectToHardwareWallet(e);
                        }
                        return null;
                      });
                  }
                  renderConnectToTrezorButton() {
                    return r.default.createElement(
                      'button',
                      {
                        'data-testid': 'connect-trezor-btn',
                        className: (0, a.default)('hw-connect__btn', {
                          selected: this.state.selectedDevice === d.HardwareDeviceNames.trezor,
                        }),
                        onClick: e =>
                          this.setState({ selectedDevice: d.HardwareDeviceNames.trezor }),
                      },
                      r.default.createElement(l.default, {
                        className: 'hw-connect__btn__img',
                        ariaLabel: 'Trezor',
                      })
                    );
                  }
                  renderConnectToLatticeButton() {
                    return r.default.createElement(
                      'button',
                      {
                        'data-testid': 'connect-lattice-btn',
                        className: (0, a.default)('hw-connect__btn', {
                          selected: this.state.selectedDevice === d.HardwareDeviceNames.lattice,
                        }),
                        onClick: e =>
                          this.setState({ selectedDevice: d.HardwareDeviceNames.lattice }),
                      },
                      r.default.createElement(u.default, {
                        className: 'hw-connect__btn__img',
                        ariaLabel: 'Lattice',
                      })
                    );
                  }
                  renderConnectToLedgerButton() {
                    return r.default.createElement(
                      'button',
                      {
                        'data-testid': 'connect-ledger-btn',
                        className: (0, a.default)('hw-connect__btn', {
                          selected: this.state.selectedDevice === d.HardwareDeviceNames.ledger,
                        }),
                        onClick: e =>
                          this.setState({ selectedDevice: d.HardwareDeviceNames.ledger }),
                      },
                      r.default.createElement(i.default, {
                        className: 'hw-connect__btn__img',
                        ariaLabel: 'Ledger',
                      })
                    );
                  }
                  renderConnectToQRButton() {
                    return r.default.createElement(
                      'button',
                      {
                        'data-testid': 'connect-qr-btn',
                        className: (0, a.default)('hw-connect__btn', {
                          selected: this.state.selectedDevice === d.HardwareDeviceNames.qr,
                        }),
                        onClick: e => this.setState({ selectedDevice: d.HardwareDeviceNames.qr }),
                      },
                      r.default.createElement(c.default, {
                        className: 'hw-connect__btn__img',
                        ariaLabel: 'QRCode',
                      })
                    );
                  }
                  renderButtons() {
                    return r.default.createElement(
                      r.default.Fragment,
                      null,
                      r.default.createElement(
                        'div',
                        { className: 'hw-connect__btn-wrapper' },
                        this.renderConnectToLedgerButton(),
                        this.renderConnectToTrezorButton()
                      ),
                      r.default.createElement(
                        'div',
                        { className: 'hw-connect__btn-wrapper', style: { margin: '10px 0 0 0' } },
                        this.renderConnectToLatticeButton(),
                        this.renderConnectToQRButton()
                      )
                    );
                  }
                  renderContinueButton() {
                    return r.default.createElement(
                      s.Button,
                      {
                        variant: s.BUTTON_VARIANT.PRIMARY,
                        size: s.BUTTON_SIZES.LG,
                        className: 'hw-connect__connect-btn',
                        onClick: this.connect,
                        disabled:
                          !this.state.selectedDevice || this.state.trezorRequestDevicePending,
                      },
                      this.context.t('continue')
                    );
                  }
                  renderFooter() {
                    return r.default.createElement(
                      s.Text,
                      {
                        color: h.TextColor.textAlternative,
                        variant: h.TextVariant.bodySm,
                        textAlign: h.TextAlign.Center,
                        as: 'h6',
                        marginTop: 4,
                        className: 'new-external-account-form footer',
                      },
                      this.context.t('hardwareWalletsInfo')
                    );
                  }
                  renderUnsupportedBrowser() {
                    return r.default.createElement(
                      s.Box,
                      {
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Column,
                        justifyContent: h.JustifyContent.center,
                        alignItems: h.AlignItems.center,
                        className: 'new-external-account-form unsupported-browser',
                      },
                      r.default.createElement(
                        s.Box,
                        {
                          className: 'hw-connect',
                          display: h.Display.Flex,
                          flexDirection: h.FlexDirection.Column,
                          alignItems: h.AlignItems.center,
                        },
                        r.default.createElement(
                          s.Text,
                          {
                            className: 'hw-connect__title',
                            variant: h.TextVariant.headingMd,
                            as: 'h3',
                            fontWeight: h.FontWeight.Bold,
                            marginTop: 6,
                            marginBottom: 3,
                          },
                          this.context.t('browserNotSupported')
                        ),
                        r.default.createElement(
                          s.Text,
                          {
                            className: 'hw-connect__msg',
                            variant: h.TextVariant.bodyMd,
                            as: 'h5',
                            marginTop: 3,
                            marginBottom: 5,
                          },
                          this.context.t('chromeRequiredForHardwareWallets')
                        )
                      ),
                      r.default.createElement(
                        s.Button,
                        {
                          variant: s.BUTTON_VARIANT.PRIMARY,
                          size: s.BUTTON_SIZES.LG,
                          onClick: () =>
                            global.platform.openTab({ url: 'https://google.com/chrome' }),
                        },
                        this.context.t('downloadGoogleChrome')
                      )
                    );
                  }
                  renderHeader() {
                    return r.default.createElement(
                      s.Box,
                      {
                        className: 'hw-connect__header',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Column,
                        alignItems: h.AlignItems.center,
                      },
                      this.state.selectedDevice === d.HardwareDeviceNames.ledger &&
                        r.default.createElement(
                          s.Box,
                          {
                            display: h.Display.Flex,
                            flexDirection: h.FlexDirection.Row,
                            justifyContent: h.JustifyContent.center,
                            alignItems: h.AlignItems.center,
                            marginTop: 6,
                          },
                          r.default.createElement(
                            s.Text,
                            {
                              className: 'hw-connect__error',
                              variant: h.TextVariant.bodyMd,
                              as: 'h5',
                              marginTop: 5,
                              marginBottom: 3,
                            },
                            this.context.t('ledgerMultipleDevicesUnsupportedErrorMessage')
                          )
                        ),
                      r.default.createElement(
                        s.Box,
                        {
                          display: h.Display.Flex,
                          flexDirection: h.FlexDirection.Row,
                          justifyContent: h.JustifyContent.center,
                          alignItems: h.AlignItems.center,
                          className: 'hw-connect__header__title-wrapper',
                          marginTop: 6,
                        },
                        r.default.createElement(
                          s.Text,
                          {
                            variant: h.TextVariant.headingMd,
                            as: 'h3',
                            fontWeight: h.FontWeight.Bold,
                            marginLeft: 'auto',
                          },
                          this.context.t('hardwareWallets')
                        ),
                        r.default.createElement(s.ButtonIcon, {
                          iconName: s.IconName.Close,
                          ariaLabel: this.context.t('close'),
                          onClick: this.props.onCancel,
                          size: s.ButtonIconSize.Sm,
                          marginLeft: 'auto',
                          'data-testid': 'hardware-connect-close-btn',
                        })
                      ),
                      r.default.createElement(
                        s.Text,
                        {
                          className: 'hw-connect__header__msg',
                          variant: h.TextVariant.bodyMd,
                          as: 'h5',
                          marginTop: 5,
                          marginBottom: 3,
                        },
                        this.context.t('hardwareWalletsMsg')
                      )
                    );
                  }
                  renderTutorialSteps() {
                    switch (this.state.selectedDevice) {
                      case d.HardwareDeviceNames.ledger:
                        return this.renderLedgerTutorialSteps();
                      case d.HardwareDeviceNames.trezor:
                        return this.renderTrezorTutorialSteps();
                      case d.HardwareDeviceNames.lattice:
                        return this.renderLatticeTutorialSteps();
                      case d.HardwareDeviceNames.qr:
                        return this.renderQRHardwareWalletSteps();
                      default:
                        return '';
                    }
                  }
                  renderLedgerTutorialSteps() {
                    const e = [];
                    return (
                      this.props.ledgerTransportType === d.LedgerTransportTypes.live &&
                        e.push({
                          renderButtons: !1,
                          title: this.context.t('step1LedgerWallet'),
                          message: this.context.t('step1LedgerWalletMsg', [
                            r.default.createElement(
                              'a',
                              {
                                className: 'hw-connect__msg-link',
                                href: 'https://www.ledger.com/ledger-live',
                                rel: 'noopener noreferrer',
                                target: '_blank',
                                key: 'ledger-live-app-link',
                              },
                              this.context.t('ledgerLiveApp')
                            ),
                          ]),
                        }),
                      e.push({
                        renderButtons: !0,
                        asset: 'plug-in-wallet',
                        dimensions: { width: '225px', height: '75px' },
                        title: this.context.t('step2LedgerWallet'),
                        message: this.context.t('step2LedgerWalletMsg', [
                          r.default.createElement(
                            'a',
                            {
                              className: 'hw-connect__msg-link',
                              href: m.default.HARDWARE_CONNECTION,
                              rel: 'noopener noreferrer',
                              target: '_blank',
                              key: 'ledger-support-link',
                            },
                            this.context.t('hardwareWalletSupportLinkConversion')
                          ),
                        ]),
                      }),
                      r.default.createElement(
                        'div',
                        { className: 'hw-tutorial' },
                        e.map((e, t) =>
                          r.default.createElement(
                            s.Box,
                            {
                              display: h.Display.Flex,
                              flexDirection: h.FlexDirection.Column,
                              alignItems: h.AlignItems.center,
                              className: 'hw-connect',
                              key: t,
                            },
                            r.default.createElement(
                              'h3',
                              { className: 'hw-connect__title' },
                              e.title
                            ),
                            e.renderButtons
                              ? r.default.createElement(
                                  s.Box,
                                  {
                                    display: h.Display.Flex,
                                    flexDirection: h.FlexDirection.Row,
                                    justifyContent: h.JustifyContent.center,
                                    marginBottom: 2,
                                  },
                                  r.default.createElement(
                                    s.Button,
                                    {
                                      className: 'hw-connect__external-btn-first',
                                      variant: s.BUTTON_VARIANT.SECONDARY,
                                      onClick: () => {
                                        this.context.trackEvent({
                                          category: f.MetaMetricsEventCategory.Navigation,
                                          event: 'Clicked Ledger Buy Now',
                                        }),
                                          (0, p.openWindow)(d.HardwareAffiliateLinks.ledger);
                                      },
                                    },
                                    this.context.t('buyNow')
                                  ),
                                  r.default.createElement(
                                    s.Button,
                                    {
                                      className: 'hw-connect__external-btn',
                                      variant: s.BUTTON_VARIANT.SECONDARY,
                                      onClick: () => {
                                        this.context.trackEvent({
                                          category: f.MetaMetricsEventCategory.Navigation,
                                          event: 'Clicked Ledger Tutorial',
                                        }),
                                          (0, p.openWindow)(
                                            d.HardwareAffiliateTutorialLinks.ledger
                                          );
                                      },
                                    },
                                    this.context.t('tutorial')
                                  )
                                )
                              : null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__msg' },
                              e.message
                            ),
                            e.asset &&
                              r.default.createElement(
                                'img',
                                y(
                                  {
                                    className: 'hw-connect__step-asset',
                                    src: `images/${e.asset}.svg`,
                                  },
                                  e.dimensions,
                                  { alt: '' }
                                )
                              )
                          )
                        )
                      )
                    );
                  }
                  renderLatticeTutorialSteps() {
                    const e = [
                      {
                        asset: 'connect-lattice',
                        dimensions: { width: '225px', height: '75px' },
                        title: this.context.t('step1LatticeWallet'),
                        message: this.context.t('step1LatticeWalletMsg', [
                          r.default.createElement(
                            'a',
                            {
                              className: 'hw-connect__msg-link',
                              href: m.default.HARDWARE_CONNECTION,
                              rel: 'noopener noreferrer',
                              target: '_blank',
                              key: 'lattice-setup-link',
                            },
                            this.context.t('hardwareWalletSupportLinkConversion')
                          ),
                        ]),
                      },
                    ];
                    return r.default.createElement(
                      'div',
                      { className: 'hw-tutorial' },
                      e.map((e, t) =>
                        r.default.createElement(
                          s.Box,
                          {
                            display: h.Display.Flex,
                            flexDirection: h.FlexDirection.Column,
                            alignItems: h.AlignItems.center,
                            className: 'hw-connect',
                            key: t,
                          },
                          r.default.createElement(
                            'h3',
                            { className: 'hw-connect__title' },
                            e.title
                          ),
                          r.default.createElement(
                            s.Box,
                            {
                              display: h.Display.Flex,
                              flexDirection: h.FlexDirection.Row,
                              justifyContent: h.JustifyContent.center,
                              marginBottom: 2,
                            },
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked GridPlus Buy Now',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.gridplus);
                                },
                              },
                              this.context.t('buyNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked GidPlus Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.gridplus);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                          r.default.createElement('p', { className: 'hw-connect__msg' }, e.message),
                          e.asset &&
                            r.default.createElement(
                              'img',
                              y(
                                {
                                  className: 'hw-connect__step-asset',
                                  src: `images/${e.asset}.svg`,
                                },
                                e.dimensions,
                                { alt: '' }
                              )
                            )
                        )
                      )
                    );
                  }
                  renderTrezorTutorialSteps() {
                    const e = [
                      {
                        asset: 'plug-in-wallet',
                        dimensions: { width: '225px', height: '75px' },
                        title: this.context.t('step1TrezorWallet'),
                        message: this.context.t('step1TrezorWalletMsg', [
                          r.default.createElement(
                            'a',
                            {
                              className: 'hw-connect__msg-link',
                              href: m.default.HARDWARE_CONNECTION,
                              rel: 'noopener noreferrer',
                              target: '_blank',
                              key: 'trezor-support-link',
                            },
                            this.context.t('hardwareWalletSupportLinkConversion')
                          ),
                        ]),
                      },
                    ];
                    return r.default.createElement(
                      'div',
                      { className: 'hw-tutorial' },
                      e.map((e, t) =>
                        r.default.createElement(
                          s.Box,
                          {
                            display: h.Display.Flex,
                            flexDirection: h.FlexDirection.Column,
                            alignItems: h.AlignItems.center,
                            className: 'hw-connect',
                            key: t,
                          },
                          r.default.createElement(
                            'h3',
                            { className: 'hw-connect__title' },
                            e.title
                          ),
                          r.default.createElement(
                            s.Box,
                            {
                              display: h.Display.Flex,
                              flexDirection: h.FlexDirection.Row,
                              justifyContent: h.JustifyContent.center,
                              marginBottom: 2,
                            },
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked Trezor Buy Now',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.trezor);
                                },
                              },
                              this.context.t('buyNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked Trezor Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.trezor);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                          r.default.createElement('p', { className: 'hw-connect__msg' }, e.message),
                          e.asset &&
                            r.default.createElement(
                              'img',
                              y(
                                {
                                  className: 'hw-connect__step-asset',
                                  src: `images/${e.asset}.svg`,
                                },
                                e.dimensions,
                                { alt: '' }
                              )
                            )
                        )
                      )
                    );
                  }
                  renderQRHardwareWalletSteps() {
                    const e = [];
                    return (
                      e.push(
                        {
                          title: this.context.t('QRHardwareWalletSteps1Title'),
                          message: this.context.t('QRHardwareWalletSteps1Description'),
                        },
                        {
                          message: r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__QR-subtitle' },
                              this.context.t('keystone')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked Keystone Learn More',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.keystone);
                                },
                              },
                              this.context.t('learnMoreKeystone')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked Keystone Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.keystone);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                        },
                        {
                          message: r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__QR-subtitle' },
                              this.context.t('airgapVault')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked AirGap Vault Buy Now',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.airgap);
                                },
                              },
                              this.context.t('downloadNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked AirGap Vault Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.airgap);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                        },
                        {
                          message: r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__QR-subtitle' },
                              this.context.t('coolWallet')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked CoolWallet Buy Now',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.coolwallet);
                                },
                              },
                              this.context.t('buyNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked CoolWallet Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.coolwallet);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                        },
                        {
                          message: r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__QR-subtitle' },
                              this.context.t('dcent')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked DCent Buy Now',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.dcent);
                                },
                              },
                              this.context.t('buyNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked DCent Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.dcent);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                        },
                        {
                          message: r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__QR-subtitle' },
                              this.context.t('imToken')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked imToken Learn More',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.imtoken);
                                },
                              },
                              this.context.t('downloadNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked imToken Tutorial',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.imtoken);
                                },
                              },
                              this.context.t('tutorial')
                            )
                          ),
                        },
                        {
                          message: r.default.createElement(
                            r.default.Fragment,
                            null,
                            r.default.createElement(
                              'p',
                              { className: 'hw-connect__QR-subtitle' },
                              this.context.t('QRHardwareWalletSteps2Description')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn-first',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked Ngrave Buy Now',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateLinks.ngrave);
                                },
                                'data-testid': 'ngrave-brand-buy-now-btn',
                              },
                              this.context.t('buyNow')
                            ),
                            r.default.createElement(
                              s.Button,
                              {
                                className: 'hw-connect__external-btn',
                                variant: s.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  this.context.trackEvent({
                                    category: f.MetaMetricsEventCategory.Navigation,
                                    event: 'Clicked Ngrave Learn more',
                                  }),
                                    (0, p.openWindow)(d.HardwareAffiliateTutorialLinks.ngrave);
                                },
                                'data-testid': 'ngrave-brand-learn-more-btn',
                              },
                              this.context.t('learnMoreUpperCase')
                            )
                          ),
                        }
                      ),
                      r.default.createElement(
                        'div',
                        { className: 'hw-tutorial' },
                        e.map((e, t) =>
                          r.default.createElement(
                            'div',
                            { className: 'hw-connect', key: t },
                            e.title &&
                              r.default.createElement(
                                'h3',
                                { className: 'hw-connect__title' },
                                e.title
                              ),
                            r.default.createElement(
                              'div',
                              { className: 'hw-connect__msg' },
                              e.message
                            ),
                            e.asset &&
                              r.default.createElement(
                                'img',
                                y(
                                  {
                                    className: 'hw-connect__step-asset',
                                    src: `images/${e.asset}.svg`,
                                  },
                                  e.dimensions,
                                  { alt: '' }
                                )
                              )
                          )
                        )
                      )
                    );
                  }
                  renderConnectScreen() {
                    return r.default.createElement(
                      s.Box,
                      {
                        className: 'new-external-account-form',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Column,
                        alignItems: h.AlignItems.center,
                        justifyContent: h.JustifyContent.center,
                      },
                      this.renderHeader(),
                      this.renderButtons(),
                      this.state.selectedDevice ? this.renderTutorialSteps() : null,
                      this.renderContinueButton(),
                      this.renderFooter()
                    );
                  }
                  render() {
                    return this.props.browserSupported
                      ? this.renderConnectScreen()
                      : this.renderUnsupportedBrowser();
                  }
                }
                (n.default = x),
                  T(x, 'contextTypes', { t: o.default.func, trackEvent: o.default.func }),
                  T(x, 'propTypes', {
                    onCancel: o.default.func.isRequired,
                    connectToHardwareWallet: o.default.func.isRequired,
                    browserSupported: o.default.bool.isRequired,
                    ledgerTransportType: o.default.oneOf(Object.values(d.LedgerTransportTypes)),
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/create-account/connect-hardware/select-hardware.js' },
    ],
    [
      7375,
      {
        '../../components/component-library': 6402,
        '../../helpers/constants/routes': 6878,
        './connect-hardware': 7373,
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
                  (n.default = function () {
                    return a.default.createElement(
                      r.Box,
                      { className: 'new-account-wrapper' },
                      a.default.createElement(
                        o.Switch,
                        null,
                        a.default.createElement(o.Route, {
                          exact: !0,
                          path: s.CONNECT_HARDWARE_ROUTE,
                          component: i.default,
                        })
                      )
                    );
                  });
                var a = c(e('react')),
                  o = e('react-router-dom'),
                  r = e('../../components/component-library'),
                  s = e('../../helpers/constants/routes'),
                  i = c(e('./connect-hardware'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/create-account/create-account.component.js' },
    ],
    [
      7376,
      {
        '../../components/app/snaps/snap-authorship-header': 6159,
        '../../components/component-library': 6402,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/useI18nContext': 6985,
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
                  o = e('../../components/component-library'),
                  r = e('../../helpers/constants/design-system'),
                  s = c(e('../../components/app/snaps/snap-authorship-header')),
                  i = e('../../hooks/useI18nContext');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = ({ snapId: e, snapName: t, onCancel: n }) => {
                  const c = (0, i.useI18nContext)();
                  return a.default.createElement(
                    o.Box,
                    {
                      className: 'create-snap-account-page',
                      height: r.BlockSize.Full,
                      width: r.BlockSize.Full,
                      display: r.Display.Flex,
                      borderStyle: r.BorderStyle.none,
                      flexDirection: r.FlexDirection.Column,
                      alignItems: r.AlignItems.center,
                      marginBottom: 0,
                    },
                    a.default.createElement(s.default, { snapId: e, onCancel: n }),
                    a.default.createElement(
                      o.Box,
                      {
                        display: r.Display.Flex,
                        flexDirection: r.FlexDirection.Column,
                        alignItems: r.AlignItems.center,
                        justifyContent: r.JustifyContent.center,
                        paddingLeft: 4,
                        paddingRight: 4,
                        style: { flexGrow: 1 },
                      },
                      a.default.createElement(
                        o.Box,
                        {
                          display: r.Display.Flex,
                          flexDirection: r.FlexDirection.Column,
                          alignItems: r.AlignItems.center,
                        },
                        a.default.createElement(
                          o.Box,
                          { paddingBottom: 4 },
                          a.default.createElement(o.AvatarIcon, {
                            iconName: o.IconName.UserCircleAdd,
                            size: o.AvatarIconSize.Xl,
                          })
                        ),
                        a.default.createElement(
                          o.Text,
                          {
                            'data-testid': 'create-snap-account-content-title',
                            textAlign: r.TextAlign.Center,
                            variant: r.TextVariant.headingLg,
                          },
                          c('createSnapAccountTitle')
                        ),
                        a.default.createElement(
                          o.Text,
                          {
                            variant: r.TextVariant.bodyMd,
                            textAlign: r.TextAlign.Center,
                            overflowWrap: r.OverflowWrap.Anywhere,
                            'data-testid': 'create-snap-account-content-description',
                          },
                          c('createSnapAccountDescription', [
                            a.default.createElement(
                              o.Text,
                              {
                                color: r.TextColor.inherit,
                                variant: r.TextVariant.inherit,
                                fontWeight: r.FontWeight.Medium,
                                key: '1',
                              },
                              t
                            ),
                          ])
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/create-snap-account/create-snap-account.tsx' },
    ],
    [
      7377,
      { './create-snap-account': 7376 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./create-snap-account')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/create-snap-account/index.ts' },
    ],
    [
      7378,
      {
        '../../components/app/modals/visit-support-data-consent-modal': 6098,
        '../../components/component-library': 6402,
        '../../components/component-library/button/button.types': 6382,
        '../../components/component-library/textarea/textarea': 6466,
        '../../components/component-library/textarea/textarea.types': 6467,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/useI18nContext': 6985,
        '../../selectors': 7601,
        '@sentry/browser': 3136,
        react: 5328,
        'react-redux': 5286,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = v(e('react')),
                  o = e('react-redux'),
                  r = v(e('@sentry/browser')),
                  s = h(e('webextension-polyfill')),
                  i = e('../../selectors'),
                  c = e('../../hooks/useI18nContext'),
                  l = e('../../components/component-library'),
                  u = e('../../helpers/constants/design-system'),
                  d = e('../../components/component-library/textarea/textarea'),
                  m = e('../../components/component-library/textarea/textarea.types'),
                  f = e('../../components/component-library/button/button.types'),
                  p = h(e('../../components/app/modals/visit-support-data-consent-modal'));
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
                function v(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = g(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                      s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                n.default = ({ error: e }) => {
                  const t = (0, c.useI18nContext)(),
                    n = (0, o.useSelector)(i.getParticipateInMetaMetrics),
                    [h, g] = (0, a.useState)(''),
                    [v, y] = (0, a.useState)(!1),
                    [T, k] = (0, a.useState)(!1),
                    [x, w] = (0, a.useState)(!1),
                    E = () => {
                      y(!1);
                    };
                  return (
                    (0, a.useEffect)(() => {
                      if (T) {
                        const e = setTimeout(() => {
                          k(!1);
                        }, 5e3);
                        return () => clearTimeout(e);
                      }
                      return undefined;
                    }, [T]),
                    a.default.createElement(
                      'section',
                      { className: 'error-page' },
                      a.default.createElement(
                        'section',
                        { className: 'error-page__inner-wrapper' },
                        a.default.createElement(
                          l.Box,
                          {
                            className: 'error-page__header',
                            display: u.Display.Flex,
                            flexDirection: u.FlexDirection.Column,
                            alignItems: u.AlignItems.center,
                          },
                          a.default.createElement(l.Icon, {
                            name: l.IconName.Danger,
                            size: l.IconSize.Xl,
                            color: u.IconColor.warningDefault,
                          }),
                          a.default.createElement(
                            l.Text,
                            {
                              color: u.TextColor.inherit,
                              variant: u.TextVariant.headingMd,
                              marginBottom: 4,
                            },
                            t('errorPageTitle')
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'error-page__banner-wrapper' },
                          a.default.createElement(
                            l.BannerAlert,
                            {
                              childrenWrapperProps: { color: u.TextColor.inherit },
                              marginBottom: 4,
                            },
                            t('errorPageInfo')
                          )
                        ),
                        a.default.createElement(
                          l.Text,
                          { color: u.TextColor.inherit, variant: u.TextVariant.bodyMd },
                          t('errorPageMessageTitle')
                        ),
                        a.default.createElement(
                          l.Box,
                          {
                            borderRadius: u.BorderRadius.LG,
                            marginBottom: 2,
                            marginTop: 2,
                            backgroundColor: u.BackgroundColor.errorMuted,
                            display: u.Display.Flex,
                            flexDirection: u.FlexDirection.Column,
                            padding: 2,
                            className: 'error-page__error-message-wrapper',
                          },
                          e.message
                            ? a.default.createElement(
                                l.Text,
                                {
                                  variant: u.TextVariant.bodyXs,
                                  marginBottom: 2,
                                  'data-testid': 'error-page-error-message',
                                  color: u.TextColor.inherit,
                                },
                                t('errorMessage', [e.message])
                              )
                            : null,
                          e.code
                            ? a.default.createElement(
                                l.Text,
                                {
                                  variant: u.TextVariant.bodyXs,
                                  marginBottom: 2,
                                  'data-testid': 'error-page-error-code',
                                  color: u.TextColor.inherit,
                                },
                                t('errorCode', [e.code])
                              )
                            : null,
                          e.name
                            ? a.default.createElement(
                                l.Text,
                                {
                                  variant: u.TextVariant.bodyXs,
                                  marginBottom: 2,
                                  'data-testid': 'error-page-error-name',
                                  color: u.TextColor.inherit,
                                },
                                t('errorName', [e.name])
                              )
                            : null,
                          e.stack
                            ? a.default.createElement(
                                a.default.Fragment,
                                null,
                                a.default.createElement(
                                  l.Text,
                                  {
                                    color: u.TextColor.inherit,
                                    variant: u.TextVariant.bodyXs,
                                    marginBottom: 2,
                                  },
                                  t('errorStack')
                                ),
                                a.default.createElement(
                                  'pre',
                                  {
                                    className: 'error-page__stack',
                                    'data-testid': 'error-page-error-stack',
                                  },
                                  e.stack
                                )
                              )
                            : null
                        ),
                        v &&
                          a.default.createElement(
                            l.Modal,
                            {
                              isOpen: v,
                              onClose: E,
                              'data-testid': 'error-page-sentry-feedback-modal',
                            },
                            a.default.createElement(l.ModalOverlay, null),
                            a.default.createElement(
                              l.ModalContent,
                              null,
                              a.default.createElement(
                                l.ModalHeader,
                                { onClose: E },
                                t('errorPageSentryFormTitle')
                              ),
                              a.default.createElement(
                                l.ModalBody,
                                null,
                                a.default.createElement(d.Textarea, {
                                  resize: m.TextareaResize.Vertical,
                                  required: !0,
                                  autoFocus: !0,
                                  cols: 32,
                                  rows: 6,
                                  placeholder: t('errorPageSentryMessagePlaceholder'),
                                  onChange: e => g(e.target.value),
                                  'data-testid': 'error-page-sentry-feedback-textarea',
                                })
                              ),
                              a.default.createElement(
                                l.ModalFooter,
                                null,
                                a.default.createElement(
                                  l.Box,
                                  { display: u.Display.Flex, gap: 4 },
                                  a.default.createElement(
                                    l.Button,
                                    {
                                      variant: l.ButtonVariant.Secondary,
                                      width: u.BlockSize.Half,
                                      onClick: E,
                                      size: f.ButtonSize.Md,
                                    },
                                    t('cancel')
                                  ),
                                  a.default.createElement(
                                    l.Button,
                                    {
                                      variant: l.ButtonVariant.Primary,
                                      width: u.BlockSize.Half,
                                      onClick: e => {
                                        e.preventDefault();
                                        const t = r.lastEventId();
                                        r.captureFeedback({ message: h, associatedEventId: t }),
                                          E(),
                                          k(!0);
                                      },
                                      size: f.ButtonSize.Md,
                                      'data-testid': 'error-page-sentry-feedback-submit-button',
                                    },
                                    t('submit')
                                  )
                                )
                              )
                            )
                          ),
                        T &&
                          a.default.createElement(
                            l.Modal,
                            {
                              isOpen: T,
                              onClose: () => k(!1),
                              'data-testid': 'error-page-sentry-feedback-success-modal',
                            },
                            a.default.createElement(l.ModalOverlay, null),
                            a.default.createElement(
                              l.ModalContent,
                              null,
                              a.default.createElement(
                                l.ModalBody,
                                {
                                  display: u.Display.Flex,
                                  flexDirection: u.FlexDirection.Row,
                                  alignItems: u.AlignItems.center,
                                  justifyContent: u.JustifyContent.center,
                                  gap: 4,
                                },
                                a.default.createElement(l.Icon, {
                                  name: l.IconName.CheckBold,
                                  color: u.IconColor.successDefault,
                                  size: l.IconSize.Md,
                                  marginRight: 2,
                                }),
                                a.default.createElement(
                                  l.Text,
                                  {
                                    variant: u.TextVariant.bodyMdMedium,
                                    color: u.TextColor.successDefault,
                                  },
                                  t('errorPageSentrySuccessMessageText')
                                )
                              )
                            )
                          ),
                        x &&
                          a.default.createElement(p.default, { isOpen: x, onClose: () => w(!1) }),
                        a.default.createElement(
                          l.Box,
                          {
                            width: u.BlockSize.Full,
                            display: u.Display.Flex,
                            flexDirection: u.FlexDirection.Column,
                            alignItems: u.AlignItems.center,
                            justifyContent: u.JustifyContent.center,
                            marginTop: 4,
                          },
                          n &&
                            a.default.createElement(
                              l.Button,
                              {
                                className: 'error-page__report-to-sentry-button',
                                marginBottom: 2,
                                block: !0,
                                'data-testid': 'error-page-describe-what-happened-button',
                                onClick: () => {
                                  y(!0);
                                },
                              },
                              t('errorPageDescribeUsWhatHappened')
                            ),
                          a.default.createElement(
                            l.Button,
                            {
                              marginBottom: 2,
                              variant: l.ButtonVariant.Secondary,
                              block: !0,
                              'data-testid': 'error-page-contact-support-button',
                              onClick: () => w(!0),
                            },
                            t('errorPageContactSupport')
                          ),
                          a.default.createElement(
                            l.Button,
                            {
                              variant: l.ButtonVariant.Secondary,
                              block: !0,
                              'data-testid': 'error-page-try-again-button',
                              onClick: () => s.default.runtime.reload(),
                            },
                            t('errorPageTryAgain')
                          )
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/error-page/error-page.component.tsx' },
    ],
    [
      7379,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/common': 6870,
        '../../../hooks/useI18nContext': 6985,
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
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('../../../helpers/constants/common'),
                  r = e('../../../hooks/useI18nContext'),
                  s = e('../../../../shared/constants/metametrics'),
                  i = e('../../../contexts/metametrics');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = () => {
                  const e = (0, r.useI18nContext)(),
                    t = (0, a.useContext)(i.MetaMetricsContext);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      'a',
                      {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        href: o.SUPPORT_REQUEST_LINK,
                        onClick: () => {
                          t(
                            {
                              category: s.MetaMetricsEventCategory.Footer,
                              event: s.MetaMetricsEventName.SupportLinkClicked,
                              properties: { url: o.SUPPORT_REQUEST_LINK },
                            },
                            {
                              contextPropsIntoEventProperties: [s.MetaMetricsContextProp.PageTitle],
                            }
                          );
                        },
                      },
                      e('needHelpSubmitTicket')
                    ),
                    ' ',
                    '|',
                    ' ',
                    a.default.createElement(
                      'a',
                      {
                        href: 'https://community.metamask.io/c/developer-discussion/11',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      },
                      e('needHelpFeedback')
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/home/flask/flask-home-footer.component.js' },
    ],
    [
      7380,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/constants/onboarding': 5807,
        '../../../shared/constants/time': 5817,
        '../../../shared/lib/ui-utils': 5852,
        '../../../shared/modules/mv3.utils': 5867,
        '../../components/app/home-notification': 6030,
        '../../components/app/multi-rpc-edit-modal/multi-rpc-edit-modal': 6100,
        '../../components/app/multiple-notifications': 6107,
        '../../components/app/recovery-phrase-reminder': 6145,
        '../../components/app/terms-of-use-popup': 6288,
        '../../components/app/whats-new-modal': 6328,
        '../../components/component-library': 6402,
        '../../components/multichain/account-overview': 6487,
        '../../components/ui/actionable-message/actionable-message': 6698,
        '../../components/ui/button': 6707,
        '../../components/ui/popover': 6789,
        '../../components/ui/typography/typography': 6823,
        '../../helpers/constants/common': 6870,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../helpers/constants/zendesk-url': 6885,
        '../../store/actions': 7619,
        '../confirmations/hooks/useConfirmationNavigation': 7327,
        '../connected-accounts': 7368,
        '../connected-sites': 7371,
        './flask/flask-home-footer.component': 7379,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = I(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = M(e('prop-types')),
                  r = e('react-router-dom'),
                  s = e('../../../shared/constants/metametrics'),
                  i = M(e('../../components/app/terms-of-use-popup')),
                  c = M(e('../../components/app/recovery-phrase-reminder')),
                  l = M(e('../../components/app/whats-new-modal')),
                  u = e('../../../shared/constants/onboarding'),
                  d = M(e('../../components/app/home-notification')),
                  m = M(e('../../components/app/multiple-notifications')),
                  f = M(e('../../components/ui/typography/typography')),
                  p = M(e('../../components/ui/button')),
                  h = M(e('../../components/ui/popover')),
                  g = M(e('../connected-sites')),
                  v = M(e('../connected-accounts')),
                  y = e('../../../shared/modules/mv3.utils'),
                  T = M(e('../../components/ui/actionable-message/actionable-message')),
                  k = e('../../helpers/constants/design-system'),
                  x = e('../../../shared/constants/time'),
                  w = e('../../components/component-library'),
                  E = M(e('../../components/app/multi-rpc-edit-modal/multi-rpc-edit-modal')),
                  _ = e('../../helpers/constants/routes'),
                  b = M(e('../../helpers/constants/zendesk-url')),
                  C = e('../../helpers/constants/common');
                e('../../../shared/lib/ui-utils');
                var A = e('../../components/multichain/account-overview'),
                  S = e('../../store/actions'),
                  N = e('../confirmations/hooks/useConfirmationNavigation'),
                  P = M(e('./flask/flask-home-footer.component'));
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
                function O(e, t, n) {
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
                function R({
                  isNotification: e,
                  totalUnapprovedAndQueuedRequestCount: t,
                  hasApprovalFlows: n,
                  isSigningQRHardwareTransaction: a,
                }) {
                  return e && 0 === t && !n && !a;
                }
                class D extends a.PureComponent {
                  constructor(e) {
                    var t;
                    super(e),
                      O(this, 'state', {
                        canShowBlockageNotification: !0,
                        notificationClosing: !1,
                        redirecting: !1,
                      }),
                      O(this, 'onRecoveryPhraseReminderClose', () => {
                        const {
                          setRecoveryPhraseReminderHasBeenShown: e,
                          setRecoveryPhraseReminderLastShown: t,
                        } = this.props;
                        e(!0), t(new Date().getTime());
                      }),
                      O(this, 'onAcceptTermsOfUse', () => {
                        const { setTermsOfUseLastAgreed: e } = this.props;
                        e(new Date().getTime()),
                          this.context.trackEvent({
                            category: s.MetaMetricsEventCategory.Onboarding,
                            event: s.MetaMetricsEventName.TermsOfUseAccepted,
                            properties: { location: 'Terms Of Use Popover' },
                          });
                      }),
                      O(this, 'onOutdatedBrowserWarningClose', () => {
                        const { setOutdatedBrowserWarningLastShown: e } = this.props;
                        e(new Date().getTime());
                      }),
                      O(this, 'renderOnboardingPopover', () => {
                        const { t: e } = this.context,
                          { setDataCollectionForMarketing: t } = this.props,
                          n = () => {
                            t(!1),
                              this.context.trackEvent({
                                category: s.MetaMetricsEventCategory.Home,
                                event: s.MetaMetricsEventName.AnalyticsPreferenceSelected,
                                properties: {
                                  has_marketing_consent: !1,
                                  location: 'marketing_consent_modal',
                                },
                              });
                          },
                          o = e => {
                            t(e),
                              this.context.trackEvent({
                                category: s.MetaMetricsEventCategory.Home,
                                event: s.MetaMetricsEventName.AnalyticsPreferenceSelected,
                                properties: {
                                  has_marketing_consent: e,
                                  location: 'marketing_consent_modal',
                                },
                              });
                          };
                        return a.default.createElement(
                          w.Modal,
                          { isOpen: !0, onClose: n },
                          a.default.createElement(w.ModalOverlay, null),
                          a.default.createElement(
                            w.ModalContent,
                            null,
                            a.default.createElement(
                              w.ModalHeader,
                              {
                                onClose: n,
                                display: k.Display.Flex,
                                flexDirection: k.FlexDirection.Row,
                                fontWeight: k.FontWeight.Bold,
                                alignItems: k.AlignItems.center,
                                justifyContent: k.JustifyContent.center,
                                gap: 4,
                                size: 18,
                                paddingBottom: 0,
                              },
                              e('onboardedMetametricsTitle')
                            ),
                            a.default.createElement(
                              w.ModalBody,
                              null,
                              a.default.createElement(
                                w.Box,
                                {
                                  display: k.Display.Flex,
                                  flexDirection: k.FlexDirection.Column,
                                  gap: 2,
                                  margin: 4,
                                },
                                a.default.createElement(
                                  f.default,
                                  null,
                                  e('onboardedMetametricsParagraph1', [
                                    a.default.createElement(
                                      'a',
                                      {
                                        href: C.METAMETRICS_SETTINGS_LINK,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                        key: 'retention-link',
                                      },
                                      e('onboardedMetametricsLink')
                                    ),
                                  ])
                                ),
                                a.default.createElement(
                                  f.default,
                                  null,
                                  e('onboardedMetametricsParagraph2')
                                ),
                                a.default.createElement(
                                  'ul',
                                  { className: 'home__onboarding_list' },
                                  a.default.createElement(
                                    'li',
                                    null,
                                    e('onboardedMetametricsKey1')
                                  ),
                                  a.default.createElement(
                                    'li',
                                    null,
                                    e('onboardedMetametricsKey2')
                                  ),
                                  a.default.createElement('li', null, e('onboardedMetametricsKey3'))
                                ),
                                a.default.createElement(
                                  f.default,
                                  null,
                                  e('onboardedMetametricsParagraph3')
                                )
                              )
                            ),
                            a.default.createElement(
                              w.ModalFooter,
                              null,
                              a.default.createElement(
                                w.Box,
                                {
                                  display: k.Display.Flex,
                                  flexDirection: k.FlexDirection.Row,
                                  gap: 2,
                                  width: k.BlockSize.Full,
                                },
                                a.default.createElement(
                                  p.default,
                                  { type: 'secondary', onClick: () => o(!1) },
                                  e('onboardedMetametricsDisagree')
                                ),
                                a.default.createElement(
                                  p.default,
                                  { type: 'primary', onClick: () => o(!0) },
                                  e('onboardedMetametricsAccept')
                                )
                              )
                            )
                          )
                        );
                      }),
                      O(this, 'renderPopover', () => {
                        const { setConnectedStatusPopoverHasBeenShown: e } = this.props,
                          { t: t } = this.context;
                        return a.default.createElement(
                          h.default,
                          {
                            title: t('whatsThis'),
                            onClose: e,
                            className: 'home__connected-status-popover',
                            showArrow: !0,
                            CustomBackground: ({ onClose: e }) =>
                              a.default.createElement(
                                'div',
                                {
                                  className: 'home__connected-status-popover-bg-container',
                                  onClick: e,
                                },
                                a.default.createElement('div', {
                                  className: 'home__connected-status-popover-bg',
                                })
                              ),
                            footer: a.default.createElement(
                              a.default.Fragment,
                              null,
                              a.default.createElement(
                                'a',
                                {
                                  href: b.default.USER_GUIDE_DAPPS,
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                },
                                t('learnMoreUpperCase')
                              ),
                              a.default.createElement(
                                p.default,
                                { type: 'primary', onClick: e },
                                t('dismiss')
                              )
                            ),
                          },
                          a.default.createElement(
                            'main',
                            { className: 'home__connect-status-text' },
                            a.default.createElement(
                              'div',
                              null,
                              t('metaMaskConnectStatusParagraphOne')
                            ),
                            a.default.createElement(
                              'div',
                              null,
                              t('metaMaskConnectStatusParagraphTwo')
                            ),
                            a.default.createElement(
                              'div',
                              null,
                              t('metaMaskConnectStatusParagraphThree')
                            )
                          )
                        );
                      });
                    const {
                        attemptCloseNotificationPopup: n,
                        haveSwapsQuotes: o,
                        haveBridgeQuotes: r,
                        isNotification: i,
                        pendingApprovals: c,
                        showAwaitingSwapScreen: l,
                        swapsFetchParams: u,
                        location: d,
                      } = this.props,
                      m = Boolean(
                        null == d || null === (t = d.state) || void 0 === t
                          ? void 0
                          : t.stayOnHomePage
                      );
                    R(e)
                      ? ((this.state.notificationClosing = !0), n())
                      : (c.length || (!i && !m && (l || o || u || r))) &&
                        (this.state.redirecting = !0);
                  }
                  checkStatusAndNavigate() {
                    var e;
                    const {
                        history: t,
                        isNotification: n,
                        haveSwapsQuotes: a,
                        haveBridgeQuotes: o,
                        showAwaitingSwapScreen: r,
                        swapsFetchParams: s,
                        location: i,
                        pendingApprovals: c,
                        hasApprovalFlows: l,
                      } = this.props,
                      u = Boolean(
                        null == i || null === (e = i.state) || void 0 === e
                          ? void 0
                          : e.stayOnHomePage
                      ),
                      d = !n && !u;
                    if (d && r) t.push(_.AWAITING_SWAP_ROUTE);
                    else if (d && (a || s)) t.push(_.PREPARE_SWAP_ROUTE);
                    else if (d && o) t.push(_.CROSS_CHAIN_SWAP_ROUTE + _.PREPARE_SWAP_ROUTE);
                    else if (c.length || l) {
                      var m;
                      (0, N.navigateToConfirmation)(
                        null == c || null === (m = c[0]) || void 0 === m ? void 0 : m.id,
                        c,
                        l,
                        t
                      );
                    }
                  }
                  componentDidMount() {
                    this.checkStatusAndNavigate(), this.props.fetchBuyableChains();
                  }
                  static getDerivedStateFromProps(e) {
                    return R(e) ? { notificationClosing: !0 } : null;
                  }
                  componentDidUpdate(e, t) {
                    const {
                        attemptCloseNotificationPopup: n,
                        isNotification: a,
                        hasAllowedPopupRedirectApprovals: o,
                        newNetworkAddedConfigurationId: r,
                        setActiveNetwork: s,
                        clearNewNetworkAdded: i,
                      } = this.props,
                      { newNetworkAddedConfigurationId: c } = e,
                      { notificationClosing: l } = this.state;
                    r && c !== r && (s(r), i()),
                      l && !t.notificationClosing ? n() : (a || o) && this.checkStatusAndNavigate();
                  }
                  renderNotifications() {
                    const { t: e } = this.context,
                      {
                        history: t,
                        shouldShowSeedPhraseReminder: n,
                        isPopup: o,
                        shouldShowWeb3ShimUsageNotification: r,
                        setWeb3ShimUsageAlertDismissed: s,
                        originOfCurrentTab: i,
                        disableWeb3ShimUsageAlert: c,
                        infuraBlocked: l,
                        showOutdatedBrowserWarning: u,
                        newNftAddedMessage: f,
                        setNewNftAddedMessage: p,
                        newNetworkAddedName: h,
                        editedNetwork: g,
                        removeNftMessage: v,
                        setRemoveNftMessage: E,
                        newTokensImported: C,
                        newTokensImportedError: A,
                        setNewTokensImported: N,
                        setNewTokensImportedError: P,
                        clearNewNetworkAdded: M,
                        clearEditedNetwork: I,
                      } = this.props,
                      O = () => {
                        p(''), E(''), N(''), P(''), (0, S.setEditedNetwork)();
                      },
                      R = 5 * x.SECOND,
                      D = y.isMv3ButOffscreenDocIsMissing
                        ? a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(w.Text, null, e('outdatedBrowserNotification')),
                            a.default.createElement('br', null),
                            a.default.createElement(
                              w.Text,
                              { fontWeight: k.FontWeight.Bold, color: k.TextColor.warningDefault },
                              e('noHardwareWalletOrSnapsSupport')
                            )
                          )
                        : e('outdatedBrowserNotification'),
                      F = [
                        'success' === f
                          ? a.default.createElement(T.default, {
                              key: 'new-nft-added',
                              type: 'success',
                              className: 'home__new-network-notification',
                              autoHideTime: R,
                              onAutoHide: O,
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement('i', {
                                  className: 'fa fa-check-circle home__new-nft-notification-icon',
                                }),
                                a.default.createElement(
                                  w.Text,
                                  { variant: k.TextVariant.bodySm, as: 'h6' },
                                  e('newNftAddedMessage')
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: O,
                                })
                              ),
                            })
                          : null,
                        'success' === v
                          ? a.default.createElement(T.default, {
                              key: 'remove-nft',
                              type: 'success',
                              className: 'home__new-network-notification',
                              autoHideTime: R,
                              onAutoHide: O,
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement('i', {
                                  className: 'fa fa-check-circle home__new-nft-notification-icon',
                                }),
                                a.default.createElement(
                                  w.Text,
                                  { variant: k.TextVariant.bodySm, as: 'h6' },
                                  e('removeNftMessage')
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: O,
                                })
                              ),
                            })
                          : null,
                        'error' === v
                          ? a.default.createElement(T.default, {
                              key: 'remove-nft-error',
                              type: 'danger',
                              className: 'home__new-network-notification',
                              autoHideTime: R,
                              onAutoHide: O,
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement('i', {
                                  className: 'fa fa-check-circle home__new-nft-notification-icon',
                                }),
                                a.default.createElement(
                                  w.Text,
                                  { variant: k.TextVariant.bodySm, as: 'h6' },
                                  e('removeNftErrorMessage')
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: O,
                                })
                              ),
                            })
                          : null,
                        h
                          ? a.default.createElement(T.default, {
                              key: 'new-network-added',
                              type: 'success',
                              className: 'home__new-network-notification',
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement('i', {
                                  className:
                                    'fa fa-check-circle home__new-network-notification-icon',
                                }),
                                a.default.createElement(
                                  w.Text,
                                  { variant: k.TextVariant.bodySm, as: 'h6' },
                                  e('newNetworkAdded', [h])
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: () => M(),
                                  className: 'home__new-network-notification-close',
                                })
                              ),
                            })
                          : null,
                        null != g && g.editCompleted
                          ? a.default.createElement(T.default, {
                              key: 'edited-network',
                              type: 'success',
                              className: 'home__new-tokens-imported-notification',
                              autoHideTime: R,
                              onAutoHide: O,
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement('i', {
                                  className:
                                    'fa fa-check-circle home__new-network-notification-icon',
                                }),
                                a.default.createElement(
                                  w.Text,
                                  { variant: k.TextVariant.bodySm, as: 'h6' },
                                  g.newNetwork
                                    ? e('newNetworkAdded', [g.nickname])
                                    : e('newNetworkEdited', [g.nickname])
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: () => I(),
                                  className: 'home__new-network-notification-close',
                                })
                              ),
                            })
                          : null,
                        C
                          ? a.default.createElement(T.default, {
                              key: 'new-tokens-imported',
                              type: 'success',
                              autoHideTime: R,
                              onAutoHide: O,
                              className: 'home__new-tokens-imported-notification',
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement('i', {
                                  className:
                                    'fa fa-check-circle home__new-tokens-imported-notification-icon',
                                }),
                                a.default.createElement(
                                  w.Box,
                                  null,
                                  a.default.createElement(
                                    w.Text,
                                    {
                                      className: 'home__new-tokens-imported-notification-title',
                                      variant: k.TextVariant.bodySmBold,
                                      as: 'h6',
                                    },
                                    e('newTokensImportedTitle')
                                  ),
                                  a.default.createElement(
                                    w.Text,
                                    {
                                      className: 'home__new-tokens-imported-notification-message',
                                      variant: k.TextVariant.bodySm,
                                      as: 'h6',
                                    },
                                    e('newTokensImportedMessage', [C])
                                  )
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: () => N(''),
                                  className: 'home__new-tokens-imported-notification-close',
                                })
                              ),
                            })
                          : null,
                        A
                          ? a.default.createElement(T.default, {
                              key: 'new-tokens-imported-error',
                              type: 'danger',
                              className: 'home__new-tokens-imported-notification',
                              autoHideTime: R,
                              onAutoHide: O,
                              message: a.default.createElement(
                                w.Box,
                                { display: k.Display.InlineFlex },
                                a.default.createElement(w.Icon, { name: w.IconName.Danger }),
                                a.default.createElement(
                                  w.Text,
                                  { variant: k.TextVariant.bodySm, as: 'h6' },
                                  e('importTokensError')
                                ),
                                a.default.createElement(w.ButtonIcon, {
                                  iconName: w.IconName.Close,
                                  size: w.ButtonIconSize.Sm,
                                  ariaLabel: e('close'),
                                  onClick: O,
                                })
                              ),
                            })
                          : null,
                        r
                          ? a.default.createElement(d.default, {
                              key: 'show-web3-shim',
                              descriptionText: e('web3ShimUsageNotification', [
                                a.default.createElement(
                                  'span',
                                  {
                                    key: 'web3ShimUsageNotificationLink',
                                    className: 'home-notification__text-link',
                                    onClick: () =>
                                      global.platform.openTab({ url: b.default.LEGACY_WEB3 }),
                                  },
                                  e('here')
                                ),
                              ]),
                              ignoreText: e('dismiss'),
                              onIgnore: e => {
                                s(i), e && c();
                              },
                              checkboxText: e('dontShowThisAgain'),
                              checkboxTooltipText: e('canToggleInSettings'),
                            })
                          : null,
                        n
                          ? a.default.createElement(d.default, {
                              key: 'show-seed-phrase-reminder',
                              descriptionText: e('backupApprovalNotice'),
                              acceptText: e('backupNow'),
                              onAccept: () => {
                                const e = `${_.ONBOARDING_SECURE_YOUR_WALLET_ROUTE}/?isFromReminder=true`;
                                o ? global.platform.openExtensionInBrowser(e) : t.push(e);
                              },
                              infoText: e('backupApprovalInfo'),
                            })
                          : null,
                        l && this.state.canShowBlockageNotification
                          ? a.default.createElement(d.default, {
                              key: 'infura-blocked',
                              descriptionText: e('infuraBlockedNotification', [
                                a.default.createElement(
                                  'span',
                                  {
                                    key: 'infuraBlockedNotificationLink',
                                    className: 'home-notification__text-link',
                                    onClick: () =>
                                      global.platform.openTab({ url: b.default.INFURA_BLOCKAGE }),
                                  },
                                  e('here')
                                ),
                              ]),
                              ignoreText: e('dismiss'),
                              onIgnore: () => {
                                this.setState({ canShowBlockageNotification: !1 });
                              },
                            })
                          : null,
                        u
                          ? a.default.createElement(d.default, {
                              key: 'outdated-browser-notification',
                              descriptionText: D,
                              acceptText: e('gotIt'),
                              onAccept: this.onOutdatedBrowserWarningClose,
                            })
                          : null,
                      ].filter(Boolean);
                    return F.length ? a.default.createElement(m.default, null, F) : null;
                  }
                  render() {
                    const {
                      defaultHomeActiveTabName: e,
                      onTabClick: t,
                      useExternalServices: n,
                      setBasicFunctionalityModalOpen: o,
                      forgottenPassword: s,
                      participateInMetaMetrics: d,
                      dataCollectionForMarketing: m,
                      connectedStatusPopoverHasBeenShown: f,
                      isPopup: p,
                      seedPhraseBackedUp: h,
                      showRecoveryPhraseReminder: y,
                      showTermsOfUsePopup: T,
                      showWhatsNewPopup: k,
                      hideWhatsNewPopup: x,
                      completedOnboarding: w,
                      onboardedInThisUISession: b,
                      announcementsToShow: C,
                      firstTimeFlowType: S,
                      newNetworkAddedConfigurationId: N,
                      showMultiRpcModal: M,
                    } = this.props;
                    if (s)
                      return a.default.createElement(r.Redirect, {
                        to: { pathname: _.RESTORE_VAULT_ROUTE },
                      });
                    if (this.state.notificationClosing || this.state.redirecting) return null;
                    const I = w && (!b || S === u.FirstTimeFlowType.import) && !N,
                      O = I && C && k,
                      R = I && M && !O,
                      D = w && !b && T;
                    return a.default.createElement(
                      'div',
                      { className: 'main-container' },
                      a.default.createElement(r.Route, {
                        path: _.CONNECTED_ROUTE,
                        component: g.default,
                        exact: !0,
                      }),
                      a.default.createElement(r.Route, {
                        path: _.CONNECTED_ACCOUNTS_ROUTE,
                        component: v.default,
                        exact: !0,
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'home__container' },
                        null === m && !0 === d ? this.renderOnboardingPopover() : null,
                        R && a.default.createElement(E.default, null),
                        O ? a.default.createElement(l.default, { onClose: x }) : null,
                        !O && y
                          ? a.default.createElement(c.default, {
                              hasBackedUp: h,
                              onConfirm: this.onRecoveryPhraseReminderClose,
                            })
                          : null,
                        D
                          ? a.default.createElement(i.default, {
                              onAccept: this.onAcceptTermsOfUse,
                            })
                          : null,
                        p && !f ? this.renderPopover() : null,
                        a.default.createElement(
                          'div',
                          { className: 'home__main-view' },
                          a.default.createElement(A.AccountOverview, {
                            onTabClick: t,
                            defaultHomeActiveTabName: e,
                            useExternalServices: n,
                            setBasicFunctionalityModalOpen: o,
                          }),
                          a.default.createElement(
                            'div',
                            { className: 'home__support' },
                            a.default.createElement(P.default, null)
                          )
                        ),
                        this.renderNotifications()
                      )
                    );
                  }
                }
                (n.default = D),
                  O(D, 'contextTypes', { t: o.default.func, trackEvent: o.default.func }),
                  O(D, 'propTypes', {
                    history: o.default.object,
                    forgottenPassword: o.default.bool,
                    setConnectedStatusPopoverHasBeenShown: o.default.func,
                    shouldShowSeedPhraseReminder: o.default.bool.isRequired,
                    isPopup: o.default.bool,
                    connectedStatusPopoverHasBeenShown: o.default.bool,
                    showRecoveryPhraseReminder: o.default.bool.isRequired,
                    showTermsOfUsePopup: o.default.bool.isRequired,
                    seedPhraseBackedUp: e => {
                      if (null !== e.seedPhraseBackedUp && 'boolean' != typeof e.seedPhraseBackedUp)
                        throw new Error(
                          `seedPhraseBackedUp is required to be null or boolean. Received ${e.seedPhraseBackedUp}`
                        );
                    },
                    firstTimeFlowType: o.default.string,
                    completedOnboarding: o.default.bool,
                    showWhatsNewPopup: o.default.bool.isRequired,
                    hideWhatsNewPopup: o.default.func.isRequired,
                    announcementsToShow: o.default.bool.isRequired,
                    onboardedInThisUISession: o.default.bool,
                    showMultiRpcModal: o.default.bool.isRequired,
                    newNetworkAddedConfigurationId: o.default.string,
                    isNotification: o.default.bool.isRequired,
                    totalUnapprovedCount: o.default.number.isRequired,
                    defaultHomeActiveTabName: o.default.string,
                    participateInMetaMetrics: o.default.bool.isRequired,
                    onTabClick: o.default.func.isRequired,
                    haveSwapsQuotes: o.default.bool.isRequired,
                    showAwaitingSwapScreen: o.default.bool.isRequired,
                    haveBridgeQuotes: o.default.bool.isRequired,
                    setDataCollectionForMarketing: o.default.func.isRequired,
                    dataCollectionForMarketing: o.default.bool,
                    swapsFetchParams: o.default.object,
                    location: o.default.object,
                    shouldShowWeb3ShimUsageNotification: o.default.bool.isRequired,
                    setWeb3ShimUsageAlertDismissed: o.default.func.isRequired,
                    originOfCurrentTab: o.default.string,
                    disableWeb3ShimUsageAlert: o.default.func.isRequired,
                    pendingApprovals: o.default.arrayOf(o.default.object).isRequired,
                    hasApprovalFlows: o.default.bool.isRequired,
                    infuraBlocked: o.default.bool.isRequired,
                    setRecoveryPhraseReminderHasBeenShown: o.default.func.isRequired,
                    setRecoveryPhraseReminderLastShown: o.default.func.isRequired,
                    setTermsOfUseLastAgreed: o.default.func.isRequired,
                    showOutdatedBrowserWarning: o.default.bool.isRequired,
                    setOutdatedBrowserWarningLastShown: o.default.func.isRequired,
                    newNetworkAddedName: o.default.string,
                    editedNetwork: o.default.object,
                    isSigningQRHardwareTransaction: o.default.bool.isRequired,
                    newNftAddedMessage: o.default.string,
                    setNewNftAddedMessage: o.default.func.isRequired,
                    removeNftMessage: o.default.string,
                    setRemoveNftMessage: o.default.func.isRequired,
                    attemptCloseNotificationPopup: o.default.func.isRequired,
                    newTokensImported: o.default.string,
                    newTokensImportedError: o.default.string,
                    setNewTokensImported: o.default.func.isRequired,
                    setNewTokensImportedError: o.default.func.isRequired,
                    clearNewNetworkAdded: o.default.func,
                    clearEditedNetwork: o.default.func,
                    setActiveNetwork: o.default.func,
                    hasAllowedPopupRedirectApprovals: o.default.bool.isRequired,
                    useExternalServices: o.default.bool,
                    setBasicFunctionalityModalOpen: o.default.func,
                    fetchBuyableChains: o.default.func.isRequired,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/home/home.component.js' },
    ],
    [
      7381,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/alerts': 5787,
        '../../../shared/constants/app': 5789,
        '../../../shared/modules/selectors/networks': 5875,
        '../../ducks/app/app': 6845,
        '../../ducks/metamask/metamask': 6860,
        '../../ducks/ramps': 6862,
        '../../ducks/swaps/swaps': 6868,
        '../../helpers/utils/util': 6921,
        '../../selectors': 7601,
        '../../selectors/multi-srp/multi-srp': 7604,
        '../../store/actions': 7619,
        './home.component': 7380,
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
                var a,
                  o = e('redux'),
                  r = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('../../selectors'),
                  c = e('../../../shared/modules/selectors/networks'),
                  l = e('../../store/actions'),
                  u = e('../../ducks/app/app'),
                  d = e('../../ducks/metamask/metamask'),
                  m = e('../../ducks/swaps/swaps'),
                  f = e('../../ducks/ramps'),
                  p = e('../../../app/scripts/lib/util'),
                  h = e('../../helpers/utils/util'),
                  g = e('../../../shared/constants/app'),
                  v = e('../../../shared/constants/alerts'),
                  y = e('../../selectors/multi-srp/multi-srp'),
                  T = (a = e('./home.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  s.withRouter,
                  (0, r.connect)(
                    e => {
                      var t;
                      const { metamask: n, appState: a } = e,
                        {
                          seedPhraseBackedUp: o,
                          connectedStatusPopoverHasBeenShown: r,
                          defaultHomeActiveTabName: s,
                          swapsState: l,
                          quotes: u,
                          dataCollectionForMarketing: f,
                          participateInMetaMetrics: T,
                          firstTimeFlowType: k,
                          completedOnboarding: x,
                        } = n,
                        w = (0, i.getSelectedInternalAccount)(e),
                        { address: E } = w,
                        { forgottenPassword: _ } = n,
                        b = (0, i.getTotalUnapprovedCount)(e),
                        C = b + (0, i.getQueuedRequestCount)(e),
                        A = (0, m.getSwapsFeatureIsLive)(e),
                        S = (0, i.selectPendingApprovalsForNavigation)(e),
                        N = (0, p.getEnvironmentType)(),
                        P = N === g.ENVIRONMENT_TYPE_POPUP,
                        M = N === g.ENVIRONMENT_TYPE_NOTIFICATION,
                        I = (0, i.getOriginOfCurrentTab)(e),
                        O =
                          P &&
                          (0, d.getWeb3ShimUsageAlertEnabledness)(e) &&
                          (0, i.activeTabHasPermissions)(e) &&
                          (0, i.getWeb3ShimUsageStateForOrigin)(e, I) ===
                            v.Web3ShimUsageAlertStates.recorded,
                        R = (0, i.hasPendingApprovals)(e, [
                          g.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.confirmAccountCreation,
                          g.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.confirmAccountRemoval,
                          g.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showNameSnapAccount,
                          g.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showSnapAccountRedirect,
                        ]);
                      let D = !0;
                      (0, i.getIsSolanaSupportEnabled)(e) && (D = !1);
                      const F = !D && (0, i.getShowWhatsNewPopup)(e),
                        B = w && (0, y.getShouldShowSeedPhraseReminder)(e, w);
                      return {
                        useExternalServices: (0, i.getUseExternalServices)(e),
                        isBasicConfigurationModalOpen: a.showBasicFunctionalityModal,
                        forgottenPassword: _,
                        swapsEnabled: A,
                        shouldShowSeedPhraseReminder: B,
                        isPopup: P,
                        isNotification: M,
                        dataCollectionForMarketing: f,
                        selectedAddress: E,
                        totalUnapprovedCount: b,
                        totalUnapprovedAndQueuedRequestCount: C,
                        participateInMetaMetrics: T,
                        hasApprovalFlows:
                          (null === (t = (0, i.getApprovalFlows)(e)) || void 0 === t
                            ? void 0
                            : t.length) > 0,
                        connectedStatusPopoverHasBeenShown: r,
                        defaultHomeActiveTabName: s,
                        firstTimeFlowType: k,
                        completedOnboarding: x,
                        haveSwapsQuotes: Boolean(Object.values(l.quotes || {}).length),
                        swapsFetchParams: l.fetchParams,
                        showAwaitingSwapScreen: 'awaiting' === l.routeState,
                        haveBridgeQuotes: Boolean(Object.values(u || {}).length),
                        isMainnet: (0, i.getIsMainnet)(e),
                        originOfCurrentTab: I,
                        shouldShowWeb3ShimUsageNotification: O,
                        pendingApprovals: S,
                        infuraBlocked: (0, c.getInfuraBlocked)(e),
                        announcementsToShow: (0, i.getSortedAnnouncementsToShow)(e).length > 0,
                        showWhatsNewPopup: F,
                        showRecoveryPhraseReminder: (0, i.getShowRecoveryPhraseReminder)(e),
                        showTermsOfUsePopup: (0, i.getShowTermsOfUse)(e),
                        showOutdatedBrowserWarning:
                          (0, h.getIsBrowserDeprecated)() &&
                          (0, i.getShowOutdatedBrowserWarning)(e),
                        seedPhraseBackedUp: o,
                        newNetworkAddedName: (0, i.getNewNetworkAdded)(e),
                        editedNetwork: (0, i.getEditedNetwork)(e),
                        isSigningQRHardwareTransaction: (0, i.getIsSigningQRHardwareTransaction)(e),
                        newNftAddedMessage: (0, i.getNewNftAddedMessage)(e),
                        removeNftMessage: (0, i.getRemoveNftMessage)(e),
                        newTokensImported: (0, i.getNewTokensImported)(e),
                        newTokensImportedError: (0, i.getNewTokensImportedError)(e),
                        newNetworkAddedConfigurationId: a.newNetworkAddedConfigurationId,
                        onboardedInThisUISession: a.onboardedInThisUISession,
                        hasAllowedPopupRedirectApprovals: R,
                        showMultiRpcModal: e.metamask.preferences.showMultiRpcModal,
                      };
                    },
                    e => ({
                      setDataCollectionForMarketing: t =>
                        e((0, l.setDataCollectionForMarketing)(t)),
                      attemptCloseNotificationPopup: () => (0, l.attemptCloseNotificationPopup)(),
                      setConnectedStatusPopoverHasBeenShown: () =>
                        e((0, l.setConnectedStatusPopoverHasBeenShown)()),
                      onTabClick: t => e((0, l.setDefaultHomeActiveTabName)(t)),
                      setWeb3ShimUsageAlertDismissed: e => (0, l.setWeb3ShimUsageAlertDismissed)(e),
                      disableWeb3ShimUsageAlert: () =>
                        (0, l.setAlertEnabledness)(v.AlertTypes.web3ShimUsage, !1),
                      hideWhatsNewPopup: () => e((0, u.hideWhatsNewPopup)()),
                      setRecoveryPhraseReminderHasBeenShown: () =>
                        e((0, l.setRecoveryPhraseReminderHasBeenShown)()),
                      setRecoveryPhraseReminderLastShown: t =>
                        e((0, l.setRecoveryPhraseReminderLastShown)(t)),
                      setTermsOfUseLastAgreed: t => {
                        e((0, l.setTermsOfUseLastAgreed)(t));
                      },
                      setOutdatedBrowserWarningLastShown: t => {
                        e((0, l.setOutdatedBrowserWarningLastShown)(t));
                      },
                      setNewNftAddedMessage: t => {
                        e((0, l.setRemoveNftMessage)('')), e((0, l.setNewNftAddedMessage)(t));
                      },
                      setRemoveNftMessage: t => {
                        e((0, l.setNewNftAddedMessage)('')), e((0, l.setRemoveNftMessage)(t));
                      },
                      setNewTokensImported: t => {
                        e((0, l.setNewTokensImported)(t));
                      },
                      setNewTokensImportedError: t => {
                        e((0, l.setNewTokensImportedError)(t));
                      },
                      clearNewNetworkAdded: () => {
                        e((0, l.setNewNetworkAdded)({}));
                      },
                      clearEditedNetwork: () => {
                        e((0, l.setEditedNetwork)());
                      },
                      setActiveNetwork: t => {
                        e((0, l.setActiveNetwork)(t));
                      },
                      setBasicFunctionalityModalOpen: () => e((0, u.openBasicFunctionalityModal)()),
                      fetchBuyableChains: () => e((0, f.fetchBuyableChains)()),
                    })
                  )
                )(T.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/home/home.container.js' },
    ],
    [
      7382,
      { './home.container': 7381 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./home.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/home/index.js' },
    ],
    [
      7383,
      {
        '../contexts/assetPolling': 6830,
        '../contexts/i18n': 6832,
        '../contexts/identity': 6833,
        '../contexts/metamask-notifications': 6834,
        '../contexts/metametrics': 6836,
        './error-page/error-page.component': 7378,
        './routes': 7461,
        '@sentry/browser': 3136,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
        'react-router-dom-v5-compat': 5308,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = y(e('react')),
                  o = g(e('prop-types')),
                  r = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('react-router-dom-v5-compat'),
                  c = y(e('@sentry/browser')),
                  l = e('../contexts/i18n'),
                  u = e('../contexts/metametrics'),
                  d = e('../contexts/metamask-notifications'),
                  m = e('../contexts/assetPolling'),
                  f = e('../contexts/identity'),
                  p = g(e('./error-page/error-page.component')),
                  h = g(e('./routes'));
                function g(e) {
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
                function y(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = v(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var r in e)
                    if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                      var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                      s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                function T(e, t, n) {
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
                class k extends a.PureComponent {
                  constructor(...e) {
                    super(...e), T(this, 'state', {});
                  }
                  static getDerivedStateFromError(e) {
                    return { error: e };
                  }
                  componentDidCatch(e) {
                    c.captureException(e);
                  }
                  render() {
                    const { error: e } = this.state,
                      { store: t } = this.props;
                    return e
                      ? a.default.createElement(
                          r.Provider,
                          { store: t },
                          a.default.createElement(
                            l.I18nProvider,
                            null,
                            a.default.createElement(
                              l.LegacyI18nProvider,
                              null,
                              a.default.createElement(p.default, { error: e })
                            )
                          )
                        )
                      : a.default.createElement(
                          r.Provider,
                          { store: t },
                          a.default.createElement(
                            s.HashRouter,
                            { hashType: 'noslash' },
                            a.default.createElement(
                              i.CompatRouter,
                              null,
                              a.default.createElement(
                                u.MetaMetricsProvider,
                                null,
                                a.default.createElement(
                                  u.LegacyMetaMetricsProvider,
                                  null,
                                  a.default.createElement(
                                    l.I18nProvider,
                                    null,
                                    a.default.createElement(
                                      l.LegacyI18nProvider,
                                      null,
                                      a.default.createElement(
                                        m.AssetPollingProvider,
                                        null,
                                        a.default.createElement(
                                          f.MetamaskIdentityProvider,
                                          null,
                                          a.default.createElement(
                                            d.MetamaskNotificationsProvider,
                                            null,
                                            a.default.createElement(h.default, null)
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        );
                  }
                }
                k.propTypes = { store: o.default.object };
                n.default = k;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/index.js' },
    ],
    [
      7384,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/app/create-new-vault': 6011,
        '../../components/component-library': 6402,
        '../../components/ui/box': 6703,
        '../../components/ui/button': 6707,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../helpers/constants/zendesk-url': 6885,
        '../../store/actions': 7619,
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
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = h(e('prop-types')),
                  r = e('react-redux'),
                  s = e('../../store/actions'),
                  i = e('../../helpers/constants/routes'),
                  c = h(e('../../components/app/create-new-vault')),
                  l = h(e('../../components/ui/button')),
                  u = h(e('../../components/ui/box')),
                  d = e('../../components/component-library'),
                  m = e('../../helpers/constants/design-system'),
                  f = h(e('../../helpers/constants/zendesk-url')),
                  p = e('../../../shared/constants/metametrics');
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
                function v(e, t, n) {
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
                class y extends a.Component {
                  constructor(...e) {
                    super(...e),
                      v(this, 'handleImport', async (e, t) => {
                        const {
                          createNewVaultAndRestore: n,
                          leaveImportSeedScreenState: a,
                          history: o,
                        } = this.props;
                        a(),
                          await n(e, t),
                          this.context.trackEvent({
                            category: p.MetaMetricsEventCategory.Retention,
                            event: 'onboardingRestoredVault',
                            properties: { action: 'userEntersSeedPhrase', legacy_event: !0 },
                          }),
                          o.push(i.DEFAULT_ROUTE);
                      });
                  }
                  render() {
                    const { t: e } = this.context,
                      { isLoading: t } = this.props;
                    return a.default.createElement(
                      u.default,
                      { className: 'first-view-main-wrapper' },
                      a.default.createElement(
                        u.default,
                        { className: 'first-view-main' },
                        a.default.createElement(
                          u.default,
                          { className: 'import-account' },
                          a.default.createElement(
                            'a',
                            {
                              className: 'import-account__back-button',
                              onClick: e => {
                                e.preventDefault(),
                                  this.props.leaveImportSeedScreenState(),
                                  this.props.history.push(i.DEFAULT_ROUTE);
                              },
                              href: '#',
                            },
                            `< ${e('back')}`
                          ),
                          a.default.createElement(
                            d.Text,
                            { variant: m.TextVariant.displayMd, color: m.TextColor.textDefault },
                            e('resetWallet')
                          ),
                          a.default.createElement(
                            d.Text,
                            { color: m.TextColor.textDefault },
                            e('resetWalletSubHeader')
                          ),
                          a.default.createElement(
                            d.Text,
                            { color: m.TextColor.textDefault, marginTop: 4, marginBottom: 4 },
                            e('resetWalletUsingSRP', [
                              a.default.createElement(
                                l.default,
                                {
                                  type: 'link',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  href: f.default.ADD_MISSING_ACCOUNTS,
                                  key: 'import-account-secretphase',
                                  className: 'import-account__link',
                                },
                                e('reAddAccounts')
                              ),
                              a.default.createElement(
                                l.default,
                                {
                                  type: 'link',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  href: f.default.IMPORT_ACCOUNTS,
                                  key: 'import-account-reimport-accounts',
                                  className: 'import-account__link',
                                },
                                e('reAdded')
                              ),
                              a.default.createElement(
                                l.default,
                                {
                                  type: 'link',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  href: f.default.ADD_CUSTOM_TOKENS,
                                  key: 'import-account-readd-tokens',
                                  className: 'import-account__link',
                                },
                                e('reAdded')
                              ),
                            ])
                          ),
                          a.default.createElement(
                            d.Text,
                            { color: m.TextColor.textDefault, margin: 0, marginBottom: 4 },
                            e('resetWalletWarning')
                          ),
                          a.default.createElement(c.default, {
                            disabled: t,
                            onSubmit: this.handleImport,
                            submitText: e('restore'),
                          })
                        )
                      )
                    );
                  }
                }
                v(y, 'contextTypes', { t: o.default.func, trackEvent: o.default.func }),
                  v(y, 'propTypes', {
                    createNewVaultAndRestore: o.default.func.isRequired,
                    leaveImportSeedScreenState: o.default.func,
                    history: o.default.object,
                    isLoading: o.default.bool,
                  });
                n.default = (0, r.connect)(
                  ({ appState: { isLoading: e } }) => ({ isLoading: e }),
                  e => ({
                    leaveImportSeedScreenState: () => {
                      e((0, s.unMarkPasswordForgotten)());
                    },
                    createNewVaultAndRestore: (t, n) => e((0, s.createNewVaultAndRestore)(t, n)),
                  })
                )(y);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/keychains/restore-vault.js' },
    ],
    [
      7385,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/modules/error': 5860,
        '../../components/app/modals/hold-to-reveal-modal/hold-to-reveal-modal': 6075,
        '../../components/component-library': 6402,
        '../../components/ui/box': 6703,
        '../../components/ui/export-text-container': 6737,
        '../../components/ui/tabs': 6806,
        '../../contexts/metametrics': 6836,
        '../../ducks/history/history': 6857,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/zendesk-url': 6885,
        '../../hooks/useI18nContext': 6985,
        '../../selectors/selectors': 7611,
        '../../store/actions': 7619,
        'qrcode-generator': 5141,
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
                    const e = (0, s.useHistory)(),
                      { keyringId: t } = (0, s.useParams)(),
                      n = (0, r.useDispatch)(),
                      x = (0, y.useI18nContext)(),
                      w = (0, o.useContext)(p.MetaMetricsContext),
                      b = (0, r.useSelector)(k.getHDEntropyIndex),
                      [C, A] = (0, o.useState)(E),
                      [S, N] = (0, o.useState)(''),
                      [P, M] = (0, o.useState)(null),
                      [I, O] = (0, o.useState)(!1),
                      [R, D] = (0, o.useState)(null),
                      F = (0, r.useSelector)(h.getMostRecentOverviewPage),
                      [B, L] = (0, o.useState)(!1),
                      [j, G] = (0, o.useState)(!1),
                      $ = (0, o.useCallback)(() => {
                        w({
                          category: c.MetaMetricsEventCategory.Keys,
                          event: c.MetaMetricsEventName.KeyExportCopied,
                          properties: {
                            key_type: c.MetaMetricsEventKeyType.Srp,
                            copy_method: 'clipboard',
                            hd_entropy_index: b,
                          },
                        }),
                          w({
                            category: c.MetaMetricsEventCategory.Keys,
                            event: c.MetaMetricsEventName.SrpCopiedToClipboard,
                            properties: {
                              key_type: c.MetaMetricsEventKeyType.Srp,
                              copy_method: 'clipboard',
                              hd_entropy_index: b,
                            },
                          });
                      }, [w, b]);
                    (0, o.useEffect)(() => {
                      const e = document.getElementById('password-box');
                      e && e.focus();
                    }, []);
                    const W = () => {
                        const e = (0, a.default)(0, 'L');
                        return e.addData(P), e.make(), e;
                      },
                      U = e => {
                        e.preventDefault(),
                          M(null),
                          O(!1),
                          D(null),
                          n((0, T.requestRevealSeedWords)(S, t))
                            .then(e => {
                              w({
                                category: c.MetaMetricsEventCategory.Keys,
                                event: c.MetaMetricsEventName.KeyExportRevealed,
                                properties: {
                                  key_type: c.MetaMetricsEventKeyType.Srp,
                                  hd_entropy_index: b,
                                },
                              }),
                                M(e),
                                L(!0);
                            })
                            .catch(e => {
                              w({
                                category: c.MetaMetricsEventCategory.Keys,
                                event: c.MetaMetricsEventName.KeyExportFailed,
                                properties: {
                                  key_type: c.MetaMetricsEventKeyType.Srp,
                                  reason: e.message,
                                  hd_entropy_index: b,
                                },
                              }),
                                D((0, i.getErrorMessage)(e));
                            });
                      };
                    return o.default.createElement(
                      d.default,
                      {
                        className: 'page-container',
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 4,
                        paddingRight: 4,
                        gap: 4,
                      },
                      o.default.createElement(
                        u.Text,
                        { variant: g.TextVariant.headingLg },
                        x('secretRecoveryPhrase')
                      ),
                      o.default.createElement(
                        u.Text,
                        { variant: g.TextVariant.bodyMd },
                        x('revealSeedWordsDescription1', [
                          o.default.createElement(
                            u.Button,
                            {
                              key: 'srp-learn-srp',
                              variant: u.BUTTON_VARIANT.LINK,
                              size: u.BUTTON_SIZES.INHERIT,
                              as: 'a',
                              href: v.default.SECRET_RECOVERY_PHRASE,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            },
                            x('revealSeedWordsSRPName')
                          ),
                          o.default.createElement(
                            u.Text,
                            {
                              key: 'reveal-seed-word-part-3',
                              variant: g.TextVariant.bodyMdBold,
                              as: 'strong',
                            },
                            x('revealSeedWordsDescription3')
                          ),
                        ])
                      ),
                      o.default.createElement(
                        u.Text,
                        { variant: g.TextVariant.bodyMd },
                        x('revealSeedWordsDescription2', [
                          o.default.createElement(
                            u.Button,
                            {
                              key: 'srp-learn-more-non-custodial',
                              variant: u.BUTTON_VARIANT.LINK,
                              size: u.BUTTON_SIZES.INHERIT,
                              as: 'a',
                              href: v.default.NON_CUSTODIAL_WALLET,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            },
                            x('revealSeedWordsNonCustodialWallet')
                          ),
                        ])
                      ),
                      o.default.createElement(
                        u.BannerAlert,
                        { severity: g.Severity.Danger },
                        o.default.createElement(
                          u.Text,
                          { variant: g.TextVariant.bodyMd },
                          x('revealSeedWordsWarning', [
                            o.default.createElement(
                              u.Text,
                              {
                                key: 'reveal-seed-words-warning-2',
                                variant: g.TextVariant.bodyMdBold,
                                as: 'strong',
                              },
                              x('revealSeedWordsWarning2')
                            ),
                          ])
                        )
                      ),
                      C !== E && I
                        ? (j ||
                            (w({
                              category: c.MetaMetricsEventCategory.Keys,
                              event: c.MetaMetricsEventName.SrpViewSrpText,
                              properties: { key_type: c.MetaMetricsEventKeyType.Srp },
                            }),
                            G(!0)),
                          o.default.createElement(
                            'div',
                            null,
                            o.default.createElement(
                              f.Tabs,
                              {
                                defaultActiveTabName: x('revealSeedWordsText'),
                                onTabClick: e => {
                                  'text-seed' === e
                                    ? w({
                                        category: c.MetaMetricsEventCategory.Keys,
                                        event: c.MetaMetricsEventName.SrpViewSrpText,
                                        properties: { key_type: c.MetaMetricsEventKeyType.Srp },
                                      })
                                    : 'qr-srp' === e &&
                                      w({
                                        category: c.MetaMetricsEventCategory.Keys,
                                        event: c.MetaMetricsEventName.SrpViewsSrpQR,
                                        properties: { key_type: c.MetaMetricsEventKeyType.Srp },
                                      });
                                },
                              },
                              o.default.createElement(
                                f.Tab,
                                {
                                  name: x('revealSeedWordsText'),
                                  className: 'reveal-seed__tab',
                                  activeClassName: 'reveal-seed__active-tab',
                                  tabKey: 'text-seed',
                                },
                                o.default.createElement(
                                  u.Label,
                                  { marginTop: 4 },
                                  x('yourPrivateSeedPhrase')
                                ),
                                o.default.createElement(m.default, { text: P, onClickCopy: $ })
                              ),
                              o.default.createElement(
                                f.Tab,
                                {
                                  name: x('revealSeedWordsQR'),
                                  className: 'reveal-seed__tab',
                                  activeClassName: 'reveal-seed__active-tab',
                                  tabKey: 'qr-srp',
                                },
                                o.default.createElement(
                                  d.default,
                                  {
                                    display: g.Display.Flex,
                                    justifyContent: g.JustifyContent.center,
                                    alignItems: g.AlignItems.center,
                                    paddingTop: 4,
                                    'data-testid': 'qr-srp',
                                  },
                                  o.default.createElement('div', {
                                    dangerouslySetInnerHTML: { __html: W().createTableTag(5, 15) },
                                  })
                                )
                              )
                            )
                          ))
                        : o.default.createElement(
                            'form',
                            { onSubmit: U },
                            o.default.createElement(
                              u.Label,
                              { htmlFor: 'password-box' },
                              x('enterPasswordContinue')
                            ),
                            o.default.createElement(u.TextField, {
                              inputProps: { 'data-testid': 'input-password' },
                              type: u.TextFieldType.Password,
                              placeholder: x('makeSureNoOneWatching'),
                              id: 'password-box',
                              size: u.TextFieldSize.Large,
                              value: S,
                              onChange: e => N(e.target.value),
                              error: Boolean(R),
                              width: g.BlockSize.Full,
                            }),
                            R &&
                              o.default.createElement(
                                u.HelpText,
                                { severity: u.HelpTextSeverity.Danger },
                                R
                              )
                          ),
                      C !== E && I
                        ? o.default.createElement(
                            d.default,
                            { marginTop: 'auto' },
                            o.default.createElement(
                              u.Button,
                              {
                                variant: u.BUTTON_VARIANT.SECONDARY,
                                width: g.BlockSize.Full,
                                size: g.Size.LG,
                                onClick: () => {
                                  w({
                                    category: c.MetaMetricsEventCategory.Keys,
                                    event: c.MetaMetricsEventName.SrpRevealCloseClicked,
                                    properties: { key_type: c.MetaMetricsEventKeyType.Srp },
                                  }),
                                    e.push(F);
                                },
                              },
                              x('close')
                            )
                          )
                        : o.default.createElement(
                            d.default,
                            { display: g.Display.Flex, marginTop: 'auto', gap: 4 },
                            o.default.createElement(
                              u.Button,
                              {
                                width: g.BlockSize.Full,
                                size: g.Size.LG,
                                variant: u.BUTTON_VARIANT.SECONDARY,
                                onClick: () => {
                                  w({
                                    category: c.MetaMetricsEventCategory.Keys,
                                    event: c.MetaMetricsEventName.KeyExportCanceled,
                                    properties: {
                                      key_type: c.MetaMetricsEventKeyType.Srp,
                                      hd_entropy_index: b,
                                    },
                                  }),
                                    w({
                                      category: c.MetaMetricsEventCategory.Keys,
                                      event: c.MetaMetricsEventName.SrpRevealCancelled,
                                      properties: {
                                        key_type: c.MetaMetricsEventKeyType.Srp,
                                        hd_entropy_index: b,
                                      },
                                    }),
                                    e.push(F);
                                },
                              },
                              x('cancel')
                            ),
                            o.default.createElement(
                              u.Button,
                              {
                                width: g.BlockSize.Full,
                                size: g.Size.LG,
                                onClick: e => {
                                  w({
                                    category: c.MetaMetricsEventCategory.Keys,
                                    event: c.MetaMetricsEventName.KeyExportRequested,
                                    properties: {
                                      key_type: c.MetaMetricsEventKeyType.Srp,
                                      hd_entropy_index: b,
                                    },
                                  }),
                                    w({
                                      category: c.MetaMetricsEventCategory.Keys,
                                      event: c.MetaMetricsEventName.SrpRevealNextClicked,
                                      properties: { key_type: c.MetaMetricsEventKeyType.Srp },
                                    }),
                                    U(e);
                                },
                                disabled: '' === S,
                              },
                              x('next')
                            )
                          ),
                      o.default.createElement(l.default, {
                        isOpen: B,
                        onClose: () => {
                          w({
                            category: c.MetaMetricsEventCategory.Keys,
                            event: c.MetaMetricsEventName.SrpHoldToRevealCloseClicked,
                            properties: { key_type: c.MetaMetricsEventKeyType.Srp },
                          }),
                            L(!1);
                        },
                        onLongPressed: () => {
                          O(!0), L(!1), A(_);
                        },
                        holdToRevealType: 'SRP',
                      })
                    );
                  });
                var a = w(e('qrcode-generator')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = x(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('../../../shared/modules/error'),
                  c = e('../../../shared/constants/metametrics'),
                  l = w(e('../../components/app/modals/hold-to-reveal-modal/hold-to-reveal-modal')),
                  u = e('../../components/component-library'),
                  d = w(e('../../components/ui/box')),
                  m = w(e('../../components/ui/export-text-container')),
                  f = e('../../components/ui/tabs'),
                  p = e('../../contexts/metametrics'),
                  h = e('../../ducks/history/history'),
                  g = e('../../helpers/constants/design-system'),
                  v = w(e('../../helpers/constants/zendesk-url')),
                  y = e('../../hooks/useI18nContext'),
                  T = e('../../store/actions'),
                  k = e('../../selectors/selectors');
                function x(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (x = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function w(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const E = 'PASSWORD_PROMPT_SCREEN',
                  _ = 'REVEAL_SEED_SCREEN';
              };
            };
      },
      { package: '$root$', file: 'ui/pages/keychains/reveal-seed.js' },
    ],
    [
      7386,
      { './lock.container': 7388 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./lock.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/lock/index.js' },
    ],
    [
      7387,
      {
        '../../components/ui/loading-screen': 6765,
        '../../helpers/constants/routes': 6878,
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
                  o,
                  r,
                  s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  i = u(e('prop-types')),
                  c = u(e('../../components/ui/loading-screen')),
                  l = e('../../helpers/constants/routes');
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
                class m extends s.PureComponent {
                  componentDidMount() {
                    const { lockMetamask: e, isUnlocked: t, history: n } = this.props;
                    t ? e().then(() => n.push(l.DEFAULT_ROUTE)) : n.replace(l.DEFAULT_ROUTE);
                  }
                  render() {
                    return s.default.createElement(c.default, null);
                  }
                }
                (n.default = m),
                  (a = m),
                  (o = 'propTypes'),
                  (r = {
                    history: i.default.object,
                    isUnlocked: i.default.bool,
                    lockMetamask: i.default.func,
                  }),
                  (o = (function (e) {
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
                  })(o)) in a
                    ? Object.defineProperty(a, o, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (a[o] = r);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/lock/lock.component.js' },
    ],
    [
      7388,
      {
        '../../store/actions': 7619,
        './lock.component': 7387,
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
                var a,
                  o = e('redux'),
                  r = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('../../store/actions'),
                  c = (a = e('./lock.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  s.withRouter,
                  (0, r.connect)(
                    e => {
                      const {
                        metamask: { isUnlocked: t },
                      } = e;
                      return { isUnlocked: t };
                    },
                    e => ({ lockMetamask: () => e((0, i.lockMetamask)()) })
                  )
                )(c.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/lock/lock.container.js' },
    ],
    [
      7389,
      { './notification-details': 7393 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./notification-details')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notification-details/index.js' },
    ],
    [
      7390,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../notifications/notification-components/types/notifications/notifications': 7416,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailsBody = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  i = e(
                    '../../notifications/notification-components/types/notifications/notifications'
                  );
                n.NotificationDetailsBody = ({ body: e, notification: t }) =>
                  o.default.createElement(
                    r.Box,
                    { display: s.Display.Flex, flexDirection: s.FlexDirection.Column, padding: 0 },
                    e.type === i.NotificationComponentType.AnnouncementBody &&
                      o.default.createElement(
                        o.default.Fragment,
                        null,
                        o.default.createElement(e.Image, { notification: t }),
                        o.default.createElement(e.Description, { notification: t })
                      ),
                    e.type === i.NotificationComponentType.OnChainBody &&
                      o.default.createElement(
                        o.default.Fragment,
                        null,
                        e.Image && o.default.createElement(e.Image, { notification: t }),
                        e.From && o.default.createElement(e.From, { notification: t }),
                        e.To && o.default.createElement(e.To, { notification: t }),
                        e.Account && o.default.createElement(e.Account, { notification: t }),
                        e.Asset && o.default.createElement(e.Asset, { notification: t }),
                        e.AssetReceived &&
                          o.default.createElement(e.AssetReceived, { notification: t }),
                        e.Status && o.default.createElement(e.Status, { notification: t }),
                        e.Network && o.default.createElement(e.Network, { notification: t }),
                        e.Rate && o.default.createElement(e.Rate, { notification: t }),
                        e.Provider && o.default.createElement(e.Provider, { notification: t }),
                        e.NetworkFee && o.default.createElement(e.NetworkFee, { notification: t })
                      ),
                    e.type === i.NotificationComponentType.SnapBody &&
                      o.default.createElement(e.Content, { notification: t })
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notification-details/notification-details-body/notification-details-body.tsx',
      },
    ],
    [
      7391,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../notifications/notification-components/types/notifications/notifications': 7416,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailsFooter = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  i = e(
                    '../../notifications/notification-components/types/notifications/notifications'
                  );
                n.NotificationDetailsFooter = ({ footer: e, notification: t }) =>
                  o.default.createElement(
                    r.Box,
                    {
                      width: s.BlockSize.Full,
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      justifyContent: s.JustifyContent.spaceBetween,
                      padding: 4,
                      gap: 4,
                    },
                    e.type === i.NotificationComponentType.OnChainFooter &&
                      o.default.createElement(e.ScanLink, { notification: t }),
                    e.type === i.NotificationComponentType.AnnouncementFooter &&
                      o.default.createElement(
                        r.Box,
                        {
                          display: s.Display.Flex,
                          gap: 4,
                          flexDirection: s.FlexDirection.Row,
                          width: s.BlockSize.Full,
                        },
                        o.default.createElement(e.ExternalLink, { notification: t }),
                        o.default.createElement(e.ExtensionLink, { notification: t })
                      ),
                    e.type === i.NotificationComponentType.SnapFooter &&
                      o.default.createElement(e.Link, { notification: t })
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notification-details/notification-details-footer/notification-details-footer.tsx',
      },
    ],
    [
      7392,
      { '../../../components/component-library': 6402, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationDetailsHeader = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('../../../components/component-library');
                n.NotificationDetailsHeader = ({ children: e, onClickBack: t }) =>
                  o.default.createElement(
                    r.HeaderBase,
                    {
                      padding: 4,
                      startAccessory: o.default.createElement(r.ButtonIcon, {
                        ariaLabel: 'Back',
                        iconName: r.IconName.ArrowLeft,
                        size: r.ButtonIconSize.Sm,
                        onClick: t,
                      }),
                      endAccessory: null,
                    },
                    e
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notification-details/notification-details-header/notification-details-header.tsx',
      },
    ],
    [
      7393,
      {
        '../../components/component-library': 6402,
        '../../components/multichain': 6574,
        '../../components/multichain/pages/page': 6652,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../hooks/metamask-notifications/useNotifications': 6954,
        '../../hooks/useNotificationTimeouts': 6999,
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../notifications/notification-components': 7408,
        './notification-details-body/notification-details-body': 7390,
        './notification-details-footer/notification-details-footer': 7391,
        './notification-details-header/notification-details-header': 7392,
        './utils/utils': 7394,
        '@metamask/notification-services-controller/notification-services': 2372,
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
                    const { redirectToNotifications: e } = (function () {
                        const e = (0, r.useHistory)(),
                          t = (0, a.useCallback)(() => {
                            e.push(l.NOTIFICATIONS_ROUTE);
                          }, [e]);
                        return { redirectToNotifications: t };
                      })(),
                      { notification: t } = (function () {
                        const { pathname: e } = (0, r.useLocation)(),
                          t = (0, g.getExtractIdentifier)(e),
                          n = (0, o.useSelector)((0, f.getMetamaskNotificationById)(t));
                        return { notification: n };
                      })();
                    if (
                      ((function (e) {
                        const { markNotificationAsRead: t } = (0, m.useMarkNotificationAsRead)(),
                          { setNotificationTimeout: n } = (0, h.useSnapNotificationTimeouts)();
                        (0, a.useEffect)(
                          () => (
                            e && t([{ id: e.id, type: e.type, isRead: e.isRead }]),
                            () => {
                              (null == e ? void 0 : e.type) === s.TRIGGER_TYPES.SNAP && n(e.id);
                            }
                          ),
                          []
                        );
                      })(t),
                      !t)
                    )
                      return e(), null;
                    if (!(0, p.hasNotificationComponents)(t.type)) return e(), null;
                    const n = p.NotificationComponents[t.type];
                    return a.default.createElement(
                      u.NotificationsPage,
                      null,
                      a.default.createElement(
                        v.NotificationDetailsHeader,
                        { onClickBack: e },
                        a.default.createElement(n.details.title, { notification: t })
                      ),
                      a.default.createElement(
                        d.Content,
                        { padding: 0 },
                        a.default.createElement(
                          i.Box,
                          {
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Column,
                            gap: 2,
                            width: c.BlockSize.Full,
                            height: c.BlockSize.Full,
                            justifyContent: c.JustifyContent.spaceBetween,
                          },
                          a.default.createElement(y.NotificationDetailsBody, {
                            body: n.details.body,
                            notification: t,
                          }),
                          a.default.createElement(T.NotificationDetailsFooter, {
                            footer: n.footer,
                            notification: t,
                          })
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
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('@metamask/notification-services-controller/notification-services'),
                  i = e('../../components/component-library'),
                  c = e('../../helpers/constants/design-system'),
                  l = e('../../helpers/constants/routes'),
                  u = e('../../components/multichain'),
                  d = e('../../components/multichain/pages/page'),
                  m = e('../../hooks/metamask-notifications/useNotifications'),
                  f = e('../../selectors/metamask-notifications/metamask-notifications'),
                  p = e('../notifications/notification-components'),
                  h = e('../../hooks/useNotificationTimeouts'),
                  g = e('./utils/utils'),
                  v = e('./notification-details-header/notification-details-header'),
                  y = e('./notification-details-body/notification-details-body'),
                  T = e('./notification-details-footer/notification-details-footer');
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notification-details/notification-details.tsx' },
    ],
    [
      7394,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getExtractIdentifier = function (e) {
                    if ('string' != typeof e) return '';
                    const t = e.split('/');
                    return t.length > 2 ? t[2] : '';
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notification-details/utils/utils.ts' },
    ],
    [
      7395,
      { './notifications-settings': 7399 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./notifications-settings')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications-settings/index.js' },
    ],
    [
      7396,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/component-library': 6402,
        '../../components/multichain': 6574,
        '../../contexts/metamask-notifications/metamask-notifications': 6835,
        '../../contexts/metametrics': 6836,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/metamask-notifications/useNotifications': 6954,
        '../../hooks/useI18nContext': 6985,
        '../../selectors/identity/profile-syncing': 7600,
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
                  (n.NotificationsSettingsAllowNotifications = function ({
                    loading: e,
                    setLoading: t,
                    disabled: n,
                    dataTestId: h,
                  }) {
                    const g = (0, r.useI18nContext)(),
                      v = (0, a.useContext)(s.MetaMetricsContext),
                      { listNotifications: y } = (0, d.useMetamaskNotificationsContext)(),
                      T = (0, o.useSelector)(l.selectIsMetamaskNotificationsEnabled),
                      [k, x] = (0, a.useState)(T),
                      w = (0, o.useSelector)(l.getIsUpdatingMetamaskNotifications),
                      E = (0, o.useSelector)(u.selectIsProfileSyncingEnabled),
                      { enableNotifications: _, error: b } = (0, c.useEnableNotifications)(),
                      { disableNotifications: C, error: A } = (0, c.useDisableNotifications)(),
                      S = b || A;
                    (0, a.useEffect)(() => {
                      t(w);
                    }, [w, t]),
                      (0, a.useEffect)(() => {
                        x(T);
                      }, [T]),
                      (0, a.useEffect)(() => {
                        !S && T && y();
                      }, [T, S, y]);
                    const N = (0, a.useCallback)(async () => {
                        t(!0),
                          T
                            ? (v({
                                category: i.MetaMetricsEventCategory.NotificationSettings,
                                event: i.MetaMetricsEventName.NotificationsSettingsUpdated,
                                properties: {
                                  settings_type: 'notifications',
                                  was_profile_syncing_on: E,
                                  old_value: !0,
                                  new_value: !1,
                                },
                              }),
                              await C())
                            : (v({
                                category: i.MetaMetricsEventCategory.NotificationSettings,
                                event: i.MetaMetricsEventName.NotificationsSettingsUpdated,
                                properties: {
                                  settings_type: 'notifications',
                                  was_profile_syncing_on: E,
                                  old_value: !1,
                                  new_value: !0,
                                },
                              }),
                              await _()),
                          t(!1),
                          x(!k);
                      }, [t, T, C, _, k]),
                      P = (0, a.useMemo)(
                        () =>
                          a.default.createElement(
                            m.Text,
                            {
                              as: 'a',
                              href: 'https://support.metamask.io/privacy-and-security/profile-privacy',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              key: 'privacy-link',
                              color: f.TextColor.infoDefault,
                            },
                            g('notificationsSettingsPageAllowNotificationsLink')
                          ),
                        [g]
                      );
                    return a.default.createElement(
                      m.Box,
                      {
                        display: f.Display.Flex,
                        justifyContent: f.JustifyContent.flexStart,
                        flexDirection: f.FlexDirection.Column,
                        alignItems: f.AlignItems.flexStart,
                        gap: 4,
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingBottom: 8,
                      },
                      a.default.createElement(
                        p.NotificationsSettingsBox,
                        { value: k, onToggle: N, disabled: n, loading: e, dataTestId: h },
                        a.default.createElement(p.NotificationsSettingsType, {
                          title: g('allowNotifications'),
                        })
                      ),
                      a.default.createElement(
                        m.Text,
                        { variant: f.TextVariant.bodyMd, color: f.TextColor.textAlternative },
                        g('notificationsSettingsPageAllowNotifications', [P])
                      ),
                      S &&
                        a.default.createElement(
                          m.Box,
                          null,
                          a.default.createElement(
                            m.Text,
                            { as: 'p', color: f.TextColor.errorDefault },
                            g(
                              T
                                ? 'turnOffMetamaskNotificationsError'
                                : 'turnOnMetamaskNotificationsError'
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
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  r = e('../../hooks/useI18nContext'),
                  s = e('../../contexts/metametrics'),
                  i = e('../../../shared/constants/metametrics'),
                  c = e('../../hooks/metamask-notifications/useNotifications'),
                  l = e('../../selectors/metamask-notifications/metamask-notifications'),
                  u = e('../../selectors/identity/profile-syncing'),
                  d = e('../../contexts/metamask-notifications/metamask-notifications'),
                  m = e('../../components/component-library'),
                  f = e('../../helpers/constants/design-system'),
                  p = e('../../components/multichain');
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
        file: 'ui/pages/notifications-settings/notifications-settings-allow-notifications.tsx',
      },
    ],
    [
      7397,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/multichain': 6574,
        '../../contexts/metametrics': 6836,
        '../../helpers/utils/util': 6921,
        '../../hooks/metamask-notifications/useNotifications': 6954,
        '../../hooks/metamask-notifications/useSwitchNotifications': 6955,
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
                  (n.NotificationsSettingsPerAccount = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('@metamask/controller-utils'),
                  r = e('../../contexts/metametrics'),
                  s = e('../../../shared/constants/metametrics'),
                  i = e('../../hooks/metamask-notifications/useSwitchNotifications'),
                  c = e('../../components/multichain'),
                  l = e('../../hooks/metamask-notifications/useNotifications'),
                  u = e('../../helpers/utils/util');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.NotificationsSettingsPerAccount = ({
                  address: e,
                  name: t,
                  isEnabled: n,
                  isLoading: d,
                  disabledSwitch: m,
                  refetchAccountSettings: f,
                }) => {
                  const p = (0, a.useContext)(r.MetaMetricsContext),
                    {
                      toggleAccount: h,
                      loading: g,
                      error: v,
                    } = (function (e, t) {
                      const { onChange: n, error: o } = (0,
                        i.useSwitchAccountNotificationsChange)(),
                        { listNotifications: r } = (0, l.useListNotifications)(),
                        [s, c] = (0, a.useState)(!1);
                      return {
                        toggleAccount: (0, a.useCallback)(
                          async a => {
                            c(!0);
                            try {
                              await n([e], a), await t(), r();
                            } catch {}
                            c(!1);
                          },
                          [e, r, t, n]
                        ),
                        loading: s,
                        error: o,
                      };
                    })(e, f),
                    y = d || g,
                    T = v,
                    k = (0, a.useCallback)(async () => {
                      p({
                        category: s.MetaMetricsEventCategory.NotificationSettings,
                        event: s.MetaMetricsEventName.NotificationsSettingsUpdated,
                        properties: {
                          settings_type: 'account_notifications',
                          old_value: n,
                          new_value: !n,
                        },
                      }),
                        await h(!n);
                    }, [e, n, h, p]),
                    x = (0, o.toChecksumHexAddress)(e),
                    w = (0, u.shortenAddress)(x);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      c.NotificationsSettingsBox,
                      {
                        value: n ?? !1,
                        onToggle: k,
                        key: e,
                        disabled: m,
                        loading: y,
                        error: T,
                        dataTestId: `${w}-notifications-settings`,
                      },
                      a.default.createElement(c.NotificationsSettingsAccount, {
                        address: e,
                        name: t,
                      })
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications-settings/notifications-settings-per-account.tsx',
      },
    ],
    [
      7398,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/component-library': 6402,
        '../../components/multichain': 6574,
        '../../contexts/metamask-notifications/metamask-notifications': 6835,
        '../../contexts/metametrics': 6836,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/metamask-notifications/useSwitchNotifications': 6955,
        '../../hooks/useI18nContext': 6985,
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
                  (n.NotificationsSettingsTypes = function ({ disabled: e }) {
                    const t = (0, i.useI18nContext)(),
                      { listNotifications: n } = (0, c.useMetamaskNotificationsContext)(),
                      p = (0, a.useContext)(r.MetaMetricsContext),
                      h = (0, o.useSelector)(f.selectIsFeatureAnnouncementsEnabled),
                      { onChange: g, error: v } = (0, l.useSwitchFeatureAnnouncementsChange)(),
                      [y, T] = (0, a.useState)(h);
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        u.Box,
                        {
                          paddingLeft: 8,
                          paddingRight: 8,
                          paddingBottom: 4,
                          paddingTop: 4,
                          'data-testid': 'notifications-settings-per-types',
                        },
                        a.default.createElement(
                          u.Text,
                          { variant: d.TextVariant.bodyMd, color: d.TextColor.textDefault },
                          t('customizeYourNotifications')
                        ),
                        a.default.createElement(
                          u.Text,
                          { variant: d.TextVariant.bodySm, color: d.TextColor.textAlternative },
                          t('customizeYourNotificationsText')
                        )
                      ),
                      a.default.createElement(
                        u.Box,
                        {
                          display: d.Display.Flex,
                          justifyContent: d.JustifyContent.flexStart,
                          flexDirection: d.FlexDirection.Column,
                          alignItems: d.AlignItems.flexStart,
                          gap: 6,
                          paddingLeft: 8,
                          paddingRight: 8,
                          paddingBottom: 4,
                        },
                        a.default.createElement(
                          m.NotificationsSettingsBox,
                          {
                            value: y,
                            onToggle: async () => {
                              T(!y);
                              try {
                                g(!y),
                                  p({
                                    category: s.MetaMetricsEventCategory.NotificationSettings,
                                    event: s.MetaMetricsEventName.NotificationsSettingsUpdated,
                                    properties: {
                                      settings_type: 'product_announcements',
                                      old_value: y,
                                      new_value: !y,
                                    },
                                  }),
                                  n();
                              } catch (e) {
                                T(y);
                              }
                            },
                            error: v,
                            disabled: e,
                            dataTestId: 'product-announcements',
                          },
                          a.default.createElement(m.NotificationsSettingsType, {
                            icon: u.IconName.Star,
                            title: t('productAnnouncements'),
                          })
                        )
                      ),
                      a.default.createElement(u.Box, {
                        borderColor: d.BorderColor.borderMuted,
                        width: d.BlockSize.Full,
                        style: { height: '1px', borderBottomWidth: 0 },
                      })
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  r = e('../../contexts/metametrics'),
                  s = e('../../../shared/constants/metametrics'),
                  i = e('../../hooks/useI18nContext'),
                  c = e('../../contexts/metamask-notifications/metamask-notifications'),
                  l = e('../../hooks/metamask-notifications/useSwitchNotifications'),
                  u = e('../../components/component-library'),
                  d = e('../../helpers/constants/design-system'),
                  m = e('../../components/multichain'),
                  f = e('../../selectors/metamask-notifications/metamask-notifications');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications-settings/notifications-settings-types.tsx',
      },
    ],
    [
      7399,
      {
        '../../components/component-library': 6402,
        '../../components/multichain': 6574,
        '../../components/multichain/pages/page': 6652,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../hooks/metamask-notifications/useSwitchNotifications': 6955,
        '../../hooks/useI18nContext': 6985,
        '../../selectors': 7601,
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        './notifications-settings-allow-notifications': 7396,
        './notifications-settings-per-account': 7397,
        './notifications-settings-types': 7398,
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
                    var e;
                    const t = (0, r.useHistory)(),
                      n = (0, r.useLocation)(),
                      y = (0, s.useI18nContext)(),
                      T = (0, o.useSelector)(m.selectIsMetamaskNotificationsEnabled),
                      k = (0, o.useSelector)(m.getIsUpdatingMetamaskNotifications),
                      x = (function () {
                        const e = (0, o.useSelector)(m.getValidNotificationAccounts),
                          t = (0, o.useSelector)(f.getInternalAccounts),
                          n = (0, a.useMemo)(
                            () =>
                              e
                                .map(e => t.find(t => t.address.toLowerCase() === e.toLowerCase()))
                                .filter(e => Boolean(e)),
                            [e, t]
                          );
                        return n;
                      })(),
                      [w, E] = (0, a.useState)(k),
                      _ = (0, a.useMemo)(() => x.map(e => e.address), [x]),
                      b = (0, p.useAccountSettingsProps)(_),
                      C = b.accountsBeingUpdated.length > 0,
                      A = async () => {
                        await b.update(_);
                      },
                      S = null === (e = n.state) || void 0 === e ? void 0 : e.fromPage;
                    return a.default.createElement(
                      u.NotificationsPage,
                      null,
                      a.default.createElement(
                        d.Header,
                        {
                          startAccessory: a.default.createElement(c.ButtonIcon, {
                            ariaLabel: 'Back',
                            iconName: c.IconName.ArrowLeft,
                            size: c.ButtonIconSize.Sm,
                            onClick: () => (S ? t.push(S) : t.push(i.NOTIFICATIONS_ROUTE)),
                          }),
                          endAccessory: null,
                        },
                        y('notifications')
                      ),
                      a.default.createElement(
                        d.Content,
                        { padding: 0 },
                        a.default.createElement(h.NotificationsSettingsAllowNotifications, {
                          loading: w,
                          setLoading: E,
                          dataTestId: 'notifications-settings-allow',
                          disabled: C,
                        }),
                        a.default.createElement(c.Box, {
                          borderColor: l.BorderColor.borderMuted,
                          width: l.BlockSize.Full,
                          style: { height: '1px', borderBottomWidth: 0 },
                        }),
                        T &&
                          a.default.createElement(
                            a.default.Fragment,
                            null,
                            a.default.createElement(g.NotificationsSettingsTypes, {
                              disabled: w || C,
                            }),
                            a.default.createElement(
                              a.default.Fragment,
                              null,
                              a.default.createElement(
                                c.Box,
                                {
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  paddingBottom: 4,
                                  paddingTop: 4,
                                  'data-testid': 'notifications-settings-per-account',
                                },
                                a.default.createElement(
                                  c.Text,
                                  { variant: l.TextVariant.bodyMd, color: l.TextColor.textDefault },
                                  y('accountActivity')
                                ),
                                a.default.createElement(
                                  c.Text,
                                  {
                                    variant: l.TextVariant.bodySm,
                                    color: l.TextColor.textAlternative,
                                  },
                                  y('accountActivityText')
                                )
                              ),
                              a.default.createElement(
                                c.Box,
                                {
                                  display: l.Display.Flex,
                                  justifyContent: l.JustifyContent.flexStart,
                                  flexDirection: l.FlexDirection.Column,
                                  alignItems: l.AlignItems.flexStart,
                                  gap: 6,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  paddingBottom: 4,
                                },
                                x.map(e => {
                                  var t;
                                  return a.default.createElement(
                                    v.NotificationsSettingsPerAccount,
                                    {
                                      key: e.id,
                                      address: e.address,
                                      name: e.metadata.name,
                                      disabledSwitch: b.initialLoading || C,
                                      isLoading: b.accountsBeingUpdated.includes(e.address),
                                      isEnabled:
                                        (null === (t = b.data) || void 0 === t
                                          ? void 0
                                          : t[e.address.toLowerCase()]) ?? !1,
                                      refetchAccountSettings: A,
                                    }
                                  );
                                })
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
                    var n = y(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  r = e('react-router-dom'),
                  s = e('../../hooks/useI18nContext'),
                  i = e('../../helpers/constants/routes'),
                  c = e('../../components/component-library'),
                  l = e('../../helpers/constants/design-system'),
                  u = e('../../components/multichain'),
                  d = e('../../components/multichain/pages/page'),
                  m = e('../../selectors/metamask-notifications/metamask-notifications'),
                  f = e('../../selectors'),
                  p = e('../../hooks/metamask-notifications/useSwitchNotifications'),
                  h = e('./notifications-settings-allow-notifications'),
                  g = e('./notifications-settings-types'),
                  v = e('./notifications-settings-per-account');
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
      { package: '$root$', file: 'ui/pages/notifications-settings/notifications-settings.tsx' },
    ],
    [
      7400,
      {
        '../../components/component-library': 6402,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/useI18nContext': 6985,
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
                  (n.NewFeatureTag = function () {
                    const e = (0, l.useI18nContext)();
                    if ((0, r.useSelector)(s.selectIsMetamaskNotificationsFeatureSeen)) return null;
                    return o.default.createElement(i.Tag, {
                      backgroundColor: c.BackgroundColor.infoMuted,
                      borderStyle: c.BorderStyle.none,
                      borderRadius: c.BorderRadius.MD,
                      label: e('new'),
                      labelProps: {
                        color: c.TextColor.primaryDefault,
                        variant: c.TextVariant.bodySm,
                      },
                      paddingLeft: 2,
                      paddingRight: 2,
                    });
                  });
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('react-redux'),
                  s = e('../../selectors/metamask-notifications/metamask-notifications'),
                  i = e('../../components/component-library'),
                  c = e('../../helpers/constants/design-system'),
                  l = e('../../hooks/useI18nContext');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/NewFeatureTag.tsx' },
    ],
    [
      7401,
      { './notifications': 7422 },
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
                      return o.default;
                    },
                  });
                var a,
                  o = (a = e('./notifications')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/index.js' },
    ],
    [
      7402,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
        '../../../../helpers/utils/util': 6921,
        '../node-guard': 7411,
        '../types/notifications/notifications': 7416,
        '@metamask/notification-services-controller': 2401,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.components = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('@metamask/notification-services-controller'),
                  s = e('../../../../../app/scripts/translate'),
                  i = e('../node-guard'),
                  c = e('../types/notifications/notifications'),
                  l = e('../../../../helpers/utils/util'),
                  u = e('../../../../../shared/modules/conversion.utils'),
                  d = e('../../../../helpers/utils/notification.util'),
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('../../../../components/multichain'),
                  p = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  h = e('../../../../components/component-library');
                const { TRIGGER_TYPES: g } = r.NotificationServicesController.Constants,
                  v = (0, i.isOfTypeNodeGuard)([g.ERC1155_RECEIVED, g.ERC1155_SENT]),
                  y = e => e.type === g.ERC1155_SENT,
                  T = e =>
                    y(e)
                      ? (0, s.t)('notificationItemNFTSentTo')
                      : (0, s.t)('notificationItemNFTReceivedFrom'),
                  k = e => {
                    const t = (0, l.shortenAddress)(y(e) ? e.data.to : e.data.from);
                    return (0, d.createTextItems)([T(e) || '', t], m.TextVariant.bodySm);
                  };
                n.components = {
                  guardFn: v,
                  item: ({ notification: e, onClick: t }) => {
                    var n, a, r, s, i;
                    return o.default.createElement(f.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type:
                          null !== (n = e.data.nft) && void 0 !== n && n.image
                            ? p.NotificationListItemIconType.Nft
                            : p.NotificationListItemIconType.Token,
                        value:
                          (null === (a = e.data.nft) || void 0 === a ? void 0 : a.image) ||
                          'http://foo.com/bar.png',
                        badge: {
                          icon: y(e) ? h.IconName.Arrow2UpRight : h.IconName.Received,
                          position: h.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title: k(e),
                      description:
                        ((s = e),
                        (0, d.createTextItems)(
                          [
                            (null === (i = s.data.nft) || void 0 === i
                              ? void 0
                              : i.collection.name) || '',
                          ],
                          m.TextVariant.bodyMd
                        )),
                      createdAt: new Date(e.createdAt),
                      amount:
                        (null === (r = e.data.nft) || void 0 === r ? void 0 : r.token_id) || '',
                      onClick: t,
                    });
                  },
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailTitle, {
                        title: `${y(e) ? (0, s.t)('notificationItemSent') : (0, s.t)('notificationItemReceived')} NFT`,
                        date: (0, d.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: c.NotificationComponentType.OnChainBody,
                      Image: ({ notification: e }) => {
                        var t, n, a;
                        const r = (0, u.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: s, nativeCurrencyName: i } = (0,
                          d.getNetworkDetailsByChainId)(`0x${r}`);
                        return o.default.createElement(f.NotificationDetailNft, {
                          networkSrc: s,
                          tokenId:
                            (null === (t = e.data.nft) || void 0 === t ? void 0 : t.token_id) || '',
                          tokenName:
                            (null === (n = e.data.nft) || void 0 === n ? void 0 : n.name) || '',
                          tokenSrc:
                            (null === (a = e.data.nft) || void 0 === a ? void 0 : a.image) || '',
                          networkName: i,
                        });
                      },
                      From: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemFrom')}${y(e) ? ` (${(0, s.t)('you')})` : ''}`,
                          address: e.data.from,
                        }),
                      To: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemTo')}${y(e) ? '' : ` (${(0, s.t)('you')})`}`,
                          address: e.data.to,
                        }),
                      Status: () =>
                        o.default.createElement(f.NotificationDetailInfo, {
                          icon: {
                            iconName: h.IconName.Check,
                            color: m.TextColor.successDefault,
                            backgroundColor: m.BackgroundColor.successMuted,
                          },
                          label: (0, s.t)('notificationItemStatus') || '',
                          detail: (0, s.t)('notificationItemConfirmed') || '',
                        }),
                      Asset: ({ notification: e }) => {
                        var t, n, a;
                        const r = (0, u.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: i } = (0, d.getNetworkDetailsByChainId)(`0x${r}`);
                        return o.default.createElement(f.NotificationDetailCollection, {
                          icon: {
                            src:
                              (null === (t = e.data.nft) || void 0 === t ? void 0 : t.image) || '',
                            badgeSrc: i,
                          },
                          label: (0, s.t)('notificationItemCollection') || '',
                          collection: `${null === (n = e.data.nft) || void 0 === n ? void 0 : n.collection.name} (${null === (a = e.data.nft) || void 0 === a ? void 0 : a.token_id})`,
                        });
                      },
                      Network: ({ notification: e }) => {
                        const t = (0, u.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n, nativeCurrencyName: a } = (0,
                          d.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailAsset, {
                          icon: { src: n },
                          label: (0, s.t)('notificationDetailNetwork') || '',
                          detail: a,
                        });
                      },
                      NetworkFee: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailNetworkFee, {
                          notification: e,
                        }),
                    },
                  },
                  footer: {
                    type: c.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailBlockExplorerButton, {
                        notification: e,
                        chainId: e.chain_id,
                        txHash: e.tx_hash,
                      }),
                  },
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/erc1155-sent-received/erc1155-sent-received.tsx',
      },
    ],
    [
      7403,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
        '../../../../helpers/utils/util': 6921,
        '../node-guard': 7411,
        '../types/notifications/notifications': 7416,
        '@metamask/notification-services-controller': 2401,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.components = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('@metamask/notification-services-controller'),
                  s = e('../../../../../app/scripts/translate'),
                  i = e('../node-guard'),
                  c = e('../types/notifications/notifications'),
                  l = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  u = e('../../../../helpers/utils/util'),
                  d = e('../../../../../shared/modules/conversion.utils'),
                  m = e('../../../../helpers/utils/notification.util'),
                  f = e('../../../../components/multichain'),
                  p = e('../../../../helpers/constants/design-system'),
                  h = e('../../../../components/component-library');
                const { TRIGGER_TYPES: g } = r.NotificationServicesController.Constants,
                  v = (0, i.isOfTypeNodeGuard)([g.ERC20_RECEIVED, g.ERC20_SENT]),
                  y = e => e.type === g.ERC20_SENT,
                  T = e =>
                    y(e)
                      ? (0, s.t)('notificationItemSentTo')
                      : (0, s.t)('notificationItemReceivedFrom'),
                  k = e => {
                    const t = (0, u.shortenAddress)(y(e) ? e.data.to : e.data.from);
                    return (0, m.createTextItems)([T(e) || '', t], p.TextVariant.bodySm);
                  };
                n.components = {
                  guardFn: v,
                  item: ({ notification: e, onClick: t }) => {
                    return o.default.createElement(f.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: l.NotificationListItemIconType.Token,
                        value: e.data.token.image,
                        badge: {
                          icon: y(e) ? h.IconName.Arrow2UpRight : h.IconName.Received,
                          position: h.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title: k(e),
                      description:
                        ((n = e),
                        (0, m.createTextItems)([n.data.token.name], p.TextVariant.bodyMd)),
                      createdAt: new Date(e.createdAt),
                      amount: `${(0, m.getAmount)(e.data.token.amount, e.data.token.decimals, { shouldEllipse: !0 })} ${e.data.token.symbol}`,
                      onClick: t,
                    });
                    var n;
                  },
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailTitle, {
                        title: `${y(e) ? (0, s.t)('notificationItemSent') : (0, s.t)('notificationItemReceived')} ${e.data.token.symbol}`,
                        date: (0, m.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: c.NotificationComponentType.OnChainBody,
                      From: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemFrom')}${y(e) ? ` (${(0, s.t)('you')})` : ''}`,
                          address: e.data.from,
                        }),
                      To: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemTo')}${y(e) ? '' : ` (${(0, s.t)('you')})`}`,
                          address: e.data.to,
                        }),
                      Status: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailInfo, {
                          icon: {
                            iconName: h.IconName.Check,
                            color: p.TextColor.successDefault,
                            backgroundColor: p.BackgroundColor.successMuted,
                          },
                          label: (0, s.t)('notificationItemStatus') || '',
                          detail: (0, s.t)('notificationItemConfirmed') || '',
                          action: o.default.createElement(f.NotificationDetailCopyButton, {
                            notification: e,
                            text: e.tx_hash,
                            displayText: (0, s.t)('notificationItemTransactionId') || '',
                          }),
                        }),
                      Asset: ({ notification: e }) => {
                        const t = (0, d.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, m.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailAsset, {
                          icon: {
                            src: e.data.token.image,
                            badge: { src: n, position: h.BadgeWrapperPosition.topRight },
                          },
                          label: (0, s.t)('asset') || '',
                          detail: e.data.token.symbol,
                          fiatValue: `$${(0, m.getUsdAmount)(e.data.token.amount, e.data.token.decimals, e.data.token.usd)}`,
                          value: `${(0, m.getAmount)(e.data.token.amount, e.data.token.decimals, { shouldEllipse: !0 })} ${e.data.token.symbol}`,
                        });
                      },
                      Network: ({ notification: e }) => {
                        const t = (0, d.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n, nativeCurrencyName: a } = (0,
                          m.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailAsset, {
                          icon: { src: n },
                          label: (0, s.t)('notificationDetailNetwork') || '',
                          detail: a,
                        });
                      },
                      NetworkFee: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailNetworkFee, {
                          notification: e,
                        }),
                    },
                  },
                  footer: {
                    type: c.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailBlockExplorerButton, {
                        notification: e,
                        chainId: e.chain_id,
                        txHash: e.tx_hash,
                      }),
                  },
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/erc20-sent-received/erc20-sent-received.tsx',
      },
    ],
    [
      7404,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
        '../../../../helpers/utils/util': 6921,
        '../node-guard': 7411,
        '../types/notifications/notifications': 7416,
        '@metamask/notification-services-controller': 2401,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.components = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('@metamask/notification-services-controller'),
                  s = e('../../../../../app/scripts/translate'),
                  i = e('../node-guard'),
                  c = e('../types/notifications/notifications'),
                  l = e('../../../../helpers/utils/util'),
                  u = e('../../../../../shared/modules/conversion.utils'),
                  d = e('../../../../helpers/utils/notification.util'),
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('../../../../components/multichain'),
                  p = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  h = e('../../../../components/component-library');
                const { TRIGGER_TYPES: g } = r.NotificationServicesController.Constants,
                  v = (0, i.isOfTypeNodeGuard)([g.ERC721_RECEIVED, g.ERC721_SENT]),
                  y = e => e.type === g.ERC721_SENT,
                  T = e =>
                    y(e)
                      ? (0, s.t)('notificationItemNFTSentTo')
                      : (0, s.t)('notificationItemNFTReceivedFrom'),
                  k = e => {
                    const t = (0, l.shortenAddress)(y(e) ? e.data.to : e.data.from);
                    return (0, d.createTextItems)([T(e) || '', t], m.TextVariant.bodySm);
                  };
                n.components = {
                  guardFn: v,
                  item: ({ notification: e, onClick: t }) => {
                    return o.default.createElement(f.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: p.NotificationListItemIconType.Nft,
                        value: e.data.nft.image,
                        badge: {
                          icon: y(e) ? h.IconName.Arrow2UpRight : h.IconName.Received,
                          position: h.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title: k(e),
                      description:
                        ((n = e),
                        (0, d.createTextItems)([n.data.nft.collection.name], m.TextVariant.bodyMd)),
                      createdAt: new Date(e.createdAt),
                      amount: `#${e.data.nft.token_id}`,
                      onClick: t,
                    });
                    var n;
                  },
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailTitle, {
                        title: `${y(e) ? (0, s.t)('notificationItemSent') : (0, s.t)('notificationItemReceived')} NFT`,
                        date: (0, d.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: c.NotificationComponentType.OnChainBody,
                      Image: ({ notification: e }) => {
                        const t = (0, u.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n, nativeCurrencyName: a } = (0,
                          d.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailNft, {
                          networkSrc: n,
                          tokenId: e.data.nft.token_id,
                          tokenName: e.data.nft.name,
                          tokenSrc: e.data.nft.image,
                          networkName: a,
                        });
                      },
                      From: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemFrom')}${y(e) ? ` (${(0, s.t)('you')})` : ''}`,
                          address: e.data.from,
                        }),
                      To: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemTo')}${y(e) ? '' : ` (${(0, s.t)('you')})`}`,
                          address: e.data.to,
                        }),
                      Status: () =>
                        o.default.createElement(f.NotificationDetailInfo, {
                          icon: {
                            iconName: h.IconName.Check,
                            color: m.TextColor.successDefault,
                            backgroundColor: m.BackgroundColor.successMuted,
                          },
                          label: (0, s.t)('notificationItemStatus') || '',
                          detail: (0, s.t)('notificationItemConfirmed') || '',
                        }),
                      Asset: ({ notification: e }) => {
                        const t = (0, u.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, d.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailCollection, {
                          icon: { src: e.data.nft.image, badgeSrc: n },
                          label: (0, s.t)('notificationItemCollection') || '',
                          collection: `${e.data.nft.collection.name} (${e.data.nft.token_id})`,
                        });
                      },
                      Network: ({ notification: e }) => {
                        const t = (0, u.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n, nativeCurrencyName: a } = (0,
                          d.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailAsset, {
                          icon: { src: n },
                          label: (0, s.t)('notificationDetailNetwork') || '',
                          detail: a,
                        });
                      },
                      NetworkFee: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailNetworkFee, {
                          notification: e,
                        }),
                    },
                  },
                  footer: {
                    type: c.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailBlockExplorerButton, {
                        notification: e,
                        chainId: e.chain_id,
                        txHash: e.tx_hash,
                      }),
                  },
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/erc721-sent-received/erc721-sent-received.tsx',
      },
    ],
    [
      7405,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
        '../../../../helpers/utils/util': 6921,
        '../node-guard': 7411,
        '../types/notifications/notifications': 7416,
        '@metamask/notification-services-controller': 2401,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.components = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('@metamask/notification-services-controller'),
                  s = e('../../../../../app/scripts/translate'),
                  i = e('../node-guard'),
                  c = e('../types/notifications/notifications'),
                  l = e('../../../../../shared/modules/conversion.utils'),
                  u = e('../../../../helpers/utils/util'),
                  d = e('../../../../helpers/utils/notification.util'),
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('../../../../components/multichain'),
                  p = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  h = e('../../../../components/component-library');
                const { TRIGGER_TYPES: g } = r.NotificationServicesController.Constants,
                  v = (0, i.isOfTypeNodeGuard)([g.ETH_RECEIVED, g.ETH_SENT]),
                  y = e => e.type === g.ETH_SENT,
                  T = e =>
                    y(e)
                      ? (0, s.t)('notificationItemSentTo')
                      : (0, s.t)('notificationItemReceivedFrom'),
                  k = e => {
                    const t = (0, l.decimalToHex)(e.chain_id);
                    return (0, d.getNetworkDetailsByChainId)(`0x${t}`);
                  },
                  x = e => {
                    const t = (0, u.shortenAddress)(y(e) ? e.data.to : e.data.from);
                    return (0, d.createTextItems)([T(e) || '', t], m.TextVariant.bodySm);
                  },
                  w = e => {
                    const { nativeCurrencySymbol: t } = k(e);
                    return (0, d.createTextItems)([t], m.TextVariant.bodyMd);
                  };
                n.components = {
                  guardFn: v,
                  item: ({ notification: e, onClick: t }) => {
                    const { nativeCurrencySymbol: n, nativeCurrencyLogo: a } = k(e);
                    return o.default.createElement(f.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: p.NotificationListItemIconType.Token,
                        value: a,
                        badge: {
                          icon: y(e) ? h.IconName.Arrow2UpRight : h.IconName.Received,
                          position: h.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title: x(e),
                      description: w(e),
                      createdAt: new Date(e.createdAt),
                      amount: `${(0, d.formatAmount)(parseFloat(e.data.amount.eth), { shouldEllipse: !0 })} ${n}`,
                      onClick: t,
                    });
                  },
                  details: {
                    title: ({ notification: e }) => {
                      const t = (0, l.decimalToHex)(e.chain_id),
                        { nativeCurrencySymbol: n } = (0, d.getNetworkDetailsByChainId)(`0x${t}`);
                      return o.default.createElement(f.NotificationDetailTitle, {
                        title: `${y(e) ? (0, s.t)('notificationItemSent') : (0, s.t)('notificationItemReceived')} ${n}`,
                        date: (0, d.formatIsoDateString)(e.createdAt),
                      });
                    },
                    body: {
                      type: c.NotificationComponentType.OnChainBody,
                      From: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemFrom')}${y(e) ? ` (${(0, s.t)('you')})` : ''}`,
                          address: e.data.from,
                        }),
                      To: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailAddress, {
                          side: `${(0, s.t)('notificationItemTo')}${y(e) ? '' : ` (${(0, s.t)('you')})`}`,
                          address: e.data.to,
                        }),
                      Status: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailInfo, {
                          icon: {
                            iconName: h.IconName.Check,
                            color: m.TextColor.successDefault,
                            backgroundColor: m.BackgroundColor.successMuted,
                          },
                          label: (0, s.t)('notificationItemStatus') || '',
                          detail: (0, s.t)('notificationItemConfirmed') || '',
                          action: o.default.createElement(f.NotificationDetailCopyButton, {
                            notification: e,
                            text: e.tx_hash,
                            displayText: (0, s.t)('notificationItemTransactionId') || '',
                          }),
                        }),
                      Asset: ({ notification: e }) => {
                        const t = (0, l.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n, nativeCurrencySymbol: a } = (0,
                          d.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailAsset, {
                          icon: {
                            src: n,
                            badge: { src: n, position: h.BadgeWrapperPosition.topRight },
                          },
                          label: (0, s.t)('asset') || '',
                          detail: a,
                          fiatValue: `$${(0, d.formatAmount)(parseFloat(e.data.amount.usd), { shouldEllipse: !0 })}`,
                          value: `${(0, d.formatAmount)(parseFloat(e.data.amount.eth), { shouldEllipse: !0 })} ${a}`,
                        });
                      },
                      Network: ({ notification: e }) => {
                        const t = (0, l.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n, nativeCurrencyName: a } = (0,
                          d.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(f.NotificationDetailAsset, {
                          icon: { src: n },
                          label: (0, s.t)('notificationDetailNetwork') || '',
                          detail: a,
                        });
                      },
                      NetworkFee: ({ notification: e }) =>
                        o.default.createElement(f.NotificationDetailNetworkFee, {
                          notification: e,
                        }),
                    },
                  },
                  footer: {
                    type: c.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(f.NotificationDetailBlockExplorerButton, {
                        notification: e,
                        chainId: e.chain_id,
                        txHash: e.tx_hash,
                      }),
                  },
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/eth-sent-received/eth-sent-received.tsx',
      },
    ],
    [
      7406,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
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
                  (n.ExternalLinkButton = n.ExtensionLinkButton = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = c(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                      if ('default' !== r && {}.hasOwnProperty.call(e, r)) {
                        var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : (a[r] = e[r]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('../../../../../shared/constants/metametrics'),
                  r = e('../../../../contexts/metametrics'),
                  s = e('../../../../components/multichain'),
                  i = e('../../../../components/component-library');
                function c(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (c = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const l = e => {
                  const t = (0, a.useContext)(r.MetaMetricsContext);
                  return (0, a.useCallback)(() => {
                    t({
                      category: o.MetaMetricsEventCategory.NotificationInteraction,
                      event: o.MetaMetricsEventName.NotificationDetailClicked,
                      properties: {
                        notification_id: e.id,
                        notification_type: e.type,
                        clicked_item: e.clickType,
                      },
                    });
                  }, [e.clickType, e.id, e.type, t]);
                };
                n.ExtensionLinkButton = e => {
                  const { notification: t } = e,
                    n = l({ id: t.id, type: t.type, clickType: 'internal_link' });
                  return t.data.extensionLink
                    ? a.default.createElement(s.NotificationDetailButton, {
                        variant: i.ButtonVariant.Primary,
                        text: t.data.extensionLink.extensionLinkText,
                        href: `/${t.data.extensionLink.extensionLinkRoute}`,
                        isExternal: !0,
                        onClick: n,
                      })
                    : null;
                };
                n.ExternalLinkButton = e => {
                  const { notification: t } = e,
                    n = l({ id: t.id, type: t.type, clickType: 'external_link' });
                  return t.data.externalLink
                    ? a.default.createElement(s.NotificationDetailButton, {
                        variant: i.ButtonVariant.Secondary,
                        text: t.data.externalLink.externalLinkText,
                        href: `${t.data.externalLink.externalLinkUrl}`,
                        isExternal: !0,
                        onClick: n,
                      })
                    : null;
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/feature-announcement/annonucement-footer-buttons.tsx',
      },
    ],
    [
      7407,
      {
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
        '../node-guard': 7411,
        '../types/notifications/notifications': 7416,
        './annonucement-footer-buttons': 7406,
        '@metamask/notification-services-controller': 2401,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.components = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  r = e('@metamask/notification-services-controller'),
                  s = e('../node-guard'),
                  i = e('../types/notifications/notifications'),
                  c = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  l = e('../../../../helpers/utils/notification.util'),
                  u = e('../../../../components/component-library'),
                  d = e('../../../../components/multichain'),
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('./annonucement-footer-buttons');
                const { TRIGGER_TYPES: p } = r.NotificationServicesController.Constants,
                  h = (0, s.isOfTypeNodeGuard)([p.FEATURES_ANNOUNCEMENT]),
                  g = e => (0, l.createTextItems)([e.data.shortDescription], m.TextVariant.bodyMd);
                n.components = {
                  guardFn: h,
                  item: ({ notification: e, onClick: t }) => {
                    return o.default.createElement(d.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: c.NotificationListItemIconType.Token,
                        value: './images/product-announcement-logo.svg',
                      },
                      title:
                        ((n = e), (0, l.createTextItems)([n.data.title], m.TextVariant.bodySm)),
                      description: g(e),
                      createdAt: new Date(e.createdAt),
                      onClick: t,
                    });
                    var n;
                  },
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(d.NotificationDetailTitle, {
                        title: e.data.title,
                        date: (0, l.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: i.NotificationComponentType.AnnouncementBody,
                      Image: ({ notification: e }) =>
                        o.default.createElement(
                          u.Box,
                          {
                            display: m.Display.Block,
                            width: m.BlockSize.Full,
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingBottom: 4,
                          },
                          o.default.createElement(u.Box, {
                            as: 'img',
                            src: `https:${e.data.image.url}?fm=jpg&fl=progressive&w=1000&q=80`,
                            alt: e.data.title,
                            title: e.data.title,
                            display: m.Display.Block,
                            justifyContent: m.JustifyContent.center,
                            borderRadius: m.BorderRadius.XL,
                            width: m.BlockSize.Full,
                          })
                        ),
                      Description: ({ notification: e }) =>
                        o.default.createElement(
                          u.Box,
                          { paddingLeft: 4, paddingRight: 4 },
                          o.default.createElement(u.Text, {
                            variant: m.TextVariant.bodyMd,
                            as: 'div',
                            dangerouslySetInnerHTML: { __html: e.data.longDescription },
                          })
                        ),
                    },
                  },
                  footer: {
                    type: i.NotificationComponentType.AnnouncementFooter,
                    ExtensionLink: f.ExtensionLinkButton,
                    ExternalLink: f.ExternalLinkButton,
                  },
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/feature-announcement/feature-announcement.tsx',
      },
    ],
    [
      7408,
      {
        './erc1155-sent-received/erc1155-sent-received': 7402,
        './erc20-sent-received/erc20-sent-received': 7403,
        './erc721-sent-received/erc721-sent-received': 7404,
        './eth-sent-received/eth-sent-received': 7405,
        './feature-announcement/feature-announcement': 7407,
        './lido-stake-ready-to-be-withdrawn/lido-stake-ready-to-be-withdrawn': 7409,
        './lido-withdrawal-requested/lido-withdrawal-requested': 7410,
        './snap/snap': 7413,
        './stake/stake': 7414,
        './swap-completed/swap-completed': 7415,
        '@metamask/notification-services-controller': 2401,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.hasNotificationComponents =
                    n.TRIGGER_TYPES =
                    n.NotificationComponents =
                      void 0);
                var a = e('@metamask/notification-services-controller'),
                  o = e('./erc20-sent-received/erc20-sent-received'),
                  r = e('./erc721-sent-received/erc721-sent-received'),
                  s = e('./erc1155-sent-received/erc1155-sent-received'),
                  i = e('./eth-sent-received/eth-sent-received'),
                  c = e('./feature-announcement/feature-announcement'),
                  l = e('./stake/stake'),
                  u = e('./swap-completed/swap-completed'),
                  d = e('./lido-withdrawal-requested/lido-withdrawal-requested'),
                  m = e('./lido-stake-ready-to-be-withdrawn/lido-stake-ready-to-be-withdrawn'),
                  f = e('./snap/snap');
                const { TRIGGER_TYPES: p } = a.NotificationServicesController.Constants;
                n.TRIGGER_TYPES = p;
                const h = (n.NotificationComponents = {
                  [p.ERC20_SENT]: o.components,
                  [p.ERC20_RECEIVED]: o.components,
                  [p.ERC721_SENT]: r.components,
                  [p.ERC721_RECEIVED]: r.components,
                  [p.ERC1155_SENT]: s.components,
                  [p.ERC1155_RECEIVED]: s.components,
                  [p.ETH_SENT]: i.components,
                  [p.ETH_RECEIVED]: i.components,
                  [p.FEATURES_ANNOUNCEMENT]: c.components,
                  [p.ROCKETPOOL_STAKE_COMPLETED]: l.components,
                  [p.ROCKETPOOL_UNSTAKE_COMPLETED]: l.components,
                  [p.LIDO_STAKE_COMPLETED]: l.components,
                  [p.LIDO_WITHDRAWAL_COMPLETED]: l.components,
                  [p.LIDO_WITHDRAWAL_REQUESTED]: d.components,
                  [p.METAMASK_SWAP_COMPLETED]: u.components,
                  [p.LIDO_STAKE_READY_TO_BE_WITHDRAWN]: m.components,
                  [p.SNAP]: f.components,
                });
                n.hasNotificationComponents = e => e in h;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notification-components/index.ts' },
    ],
  ],
  [],
  {}
);
