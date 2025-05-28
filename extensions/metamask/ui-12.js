LavaPack.loadBundle(
  [
    [
      7506,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/app/app': 6845,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        './security-tab.component': 7505,
        'react-redux': 5286,
        'react-router-dom': 5313,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = e('redux'),
                  i = e('../../../store/actions'),
                  l = e('../../../selectors/selectors'),
                  u = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../ducks/app/app'),
                  d = e('../../../selectors'),
                  p = (n = e('./security-tab.component')) && n.__esModule ? n : { default: n };
                a.default = (0, s.compose)(
                  o.withRouter,
                  (0, r.connect)(
                    e => {
                      const { metamask: t } = e,
                        {
                          participateInMetaMetrics: a,
                          dataCollectionForMarketing: n,
                          usePhishDetect: r,
                          useTokenDetection: o,
                          ipfsGateway: s,
                          useMultiAccountBalanceChecker: i,
                          useSafeChainsListValidation: c,
                          useCurrencyRateCheck: p,
                          useAddressBarEnsResolution: f,
                          openSeaEnabled: m,
                          useNftDetection: h,
                          use4ByteResolution: g,
                          useExternalServices: b,
                          useExternalNameSources: y,
                        } = t,
                        v = (0, u.getNetworkConfigurationsByChainId)(e),
                        _ = (0, d.getMetaMaskHdKeyrings)(e).length > 1;
                      return {
                        networkConfigurations: v,
                        participateInMetaMetrics: a,
                        dataCollectionForMarketing: n,
                        usePhishDetect: r,
                        useTokenDetection: o,
                        ipfsGateway: s,
                        useMultiAccountBalanceChecker: i,
                        useSafeChainsListValidation: c,
                        useCurrencyRateCheck: p,
                        useAddressBarEnsResolution: f,
                        openSeaEnabled: m,
                        useNftDetection: h,
                        use4ByteResolution: g,
                        useExternalNameSources: y,
                        useExternalServices: b,
                        securityAlertsEnabled: (0, l.getIsSecurityAlertsEnabled)(e),
                        useTransactionSimulations: t.useTransactionSimulations,
                        metaMetricsDataDeletionId: (0, l.getMetaMetricsDataDeletionId)(e),
                        hdEntropyIndex: (0, l.getHDEntropyIndex)(e),
                        hasMultipleHdKeyrings: _,
                      };
                    },
                    e => ({
                      setParticipateInMetaMetrics: t => e((0, i.setParticipateInMetaMetrics)(t)),
                      setDataCollectionForMarketing: t =>
                        e((0, i.setDataCollectionForMarketing)(t)),
                      setUsePhishDetect: t => e((0, i.setUsePhishDetect)(t)),
                      setUseCurrencyRateCheck: t => e((0, i.setUseCurrencyRateCheck)(t)),
                      setUseTokenDetection: t => e((0, i.setUseTokenDetection)(t)),
                      setIpfsGateway: t => e((0, i.setIpfsGateway)(t)),
                      setIsIpfsGatewayEnabled: t => e((0, i.setIsIpfsGatewayEnabled)(t)),
                      setUseMultiAccountBalanceChecker: t =>
                        e((0, i.setUseMultiAccountBalanceChecker)(t)),
                      setUseAddressBarEnsResolution: t =>
                        e((0, i.setUseAddressBarEnsResolution)(t)),
                      setUseSafeChainsListValidation: t =>
                        e((0, i.setUseSafeChainsListValidation)(t)),
                      setBasicFunctionalityModalOpen: () => e((0, c.openBasicFunctionalityModal)()),
                      setOpenSeaEnabled: t => e((0, i.setOpenSeaEnabled)(t)),
                      setUseNftDetection: t => e((0, i.setUseNftDetection)(t)),
                      setUse4ByteResolution: t => e((0, i.setUse4ByteResolution)(t)),
                      setUseExternalNameSources: t => e((0, i.setUseExternalNameSources)(t)),
                      toggleExternalServices: t => e((0, i.toggleExternalServices)(t)),
                      setUseTransactionSimulations: t => e((0, i.setUseTransactionSimulations)(t)),
                      updateDataDeletionTaskStatus: () => (0, i.updateDataDeletionTaskStatus)(),
                      setSecurityAlertsEnabled: e => (0, i.setSecurityAlertsEnabled)(e),
                    })
                  )
                )(p.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/security-tab/security-tab.container.js' },
    ],
    [
      7507,
      { './settings-search-list': 7508 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = (n = e('./settings-search-list')) && n.__esModule ? n : { default: n };
                a.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-search-list/index.js' },
    ],
    [
      7508,
      {
        '../../../components/component-library': 6402,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/settings-search': 6915,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = p);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = d(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  s = e('../../../helpers/utils/settings-search'),
                  i = e('../../../contexts/i18n'),
                  l = e('../../../components/component-library'),
                  u = e('../../../helpers/constants/design-system');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (d = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function p({ results: e, onClickSetting: t }) {
                  const a = (0, n.useContext)(i.I18nContext);
                  return (
                    (0, n.useEffect)(s.highlightSearchedText, [e]),
                    n.default.createElement(
                      'div',
                      { className: 'settings-page__header__search__list' },
                      e.slice(0, 5).map(e => {
                        const {
                          icon: r,
                          iconName: s,
                          tabMessage: i,
                          sectionMessage: c,
                          route: d,
                        } = e;
                        return (
                          Boolean(r || i || c) &&
                          n.default.createElement(
                            'div',
                            { key: `settings_${d}` },
                            n.default.createElement(
                              'div',
                              {
                                className: 'settings-page__header__search__list__item',
                                onClick: () => t(e),
                              },
                              s
                                ? n.default.createElement(l.Icon, { name: s })
                                : n.default.createElement('i', {
                                    className: (0, o.default)(
                                      'settings-page__header__search__list__item__icon',
                                      r
                                    ),
                                  }),
                              n.default.createElement(
                                'span',
                                {
                                  id: `menu-tab_${d}`,
                                  className: (0, o.default)(
                                    'settings-page__header__search__list__item__tab',
                                    {
                                      'settings-page__header__search__list__item__tab-multiple-lines':
                                        i(a) === a('securityAndPrivacy'),
                                    }
                                  ),
                                },
                                i(a)
                              ),
                              n.default.createElement(l.Icon, {
                                name: l.IconName.ArrowRight,
                                size: u.Size.SM,
                                className: 'settings-page__header__search__list__item__caret',
                              }),
                              n.default.createElement(
                                'span',
                                {
                                  id: `menu-section_${d}`,
                                  className: (0, o.default)(
                                    'settings-page__header__search__list__item__section',
                                    {
                                      'settings-page__header__search__list__item__section-multiple-lines':
                                        i(a) === a('securityAndPrivacy') || i(a) === a('alerts'),
                                    }
                                  ),
                                },
                                c(a)
                              )
                            )
                          )
                        );
                      }),
                      0 === e.length &&
                        n.default.createElement(
                          'div',
                          {
                            className: 'settings-page__header__search__list__item',
                            style: { cursor: 'auto', display: 'flex' },
                          },
                          n.default.createElement(
                            'span',
                            { className: 'settings-page__header__search__list__item__no-matching' },
                            a('settingsSearchMatchingNotFound')
                          )
                        ),
                      n.default.createElement(
                        'div',
                        {
                          className: 'settings-page__header__search__list__item',
                          style: { cursor: 'auto', display: 'flex' },
                        },
                        n.default.createElement(
                          'span',
                          { className: 'settings-page__header__search__list__item__request' },
                          a('missingSetting')
                        ),
                        n.default.createElement(
                          'a',
                          {
                            href: 'https://community.metamask.io/c/feature-requests-ideas/13',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            key: 'need-help-link',
                            className: 'settings-page__header__search__list__item__link',
                          },
                          a('missingSettingRequest')
                        )
                      )
                    )
                  );
                }
                p.propTypes = { results: r.default.array, onClickSetting: r.default.func };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-search-list/settings-search-list.js' },
    ],
    [
      7509,
      { './settings-search': 7510 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = (n = e('./settings-search')) && n.__esModule ? n : { default: n };
                a.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-search/index.js' },
    ],
    [
      7510,
      {
        '../../../../shared/modules/string-utils': 5878,
        '../../../components/component-library': 6402,
        '../../../components/ui/text-field': 6810,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '@material-ui/core/InputAdornment': 972,
        'fuse.js': 4545,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = m);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = f(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = p(e('prop-types')),
                  o = p(e('fuse.js')),
                  s = p(e('@material-ui/core/InputAdornment')),
                  i = p(e('../../../components/ui/text-field')),
                  l = e('../../../contexts/i18n'),
                  u = e('../../../../shared/modules/string-utils'),
                  c = e('../../../components/component-library'),
                  d = e('../../../helpers/constants/design-system');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (f = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function m({ onSearch: e, error: t, settingsRoutesList: a }) {
                  const r = (0, n.useContext)(l.I18nContext),
                    [p, f] = (0, n.useState)(''),
                    [m, h] = (0, n.useState)(d.IconColor.iconMuted),
                    g = Object.values(a),
                    b = new o.default(g, {
                      shouldSort: !0,
                      threshold: 0.3,
                      location: 0,
                      distance: 100,
                      maxPatternLength: 32,
                      minMatchCharLength: 1,
                      keys: ['tabMessage', 'sectionMessage', 'descriptionMessage'],
                      getFn: (e, t) => e[t](r),
                    }),
                    y = t => {
                      const a = t.trimStart();
                      f(a), h('' === a ? d.IconColor.iconMuted : d.IconColor.iconDefault);
                      const n = b.search(a),
                        r = [
                          ...g.filter(
                            e => e.tabMessage && a && (0, u.isEqualCaseInsensitive)(e.tab, a)
                          ),
                          ...n,
                        ];
                      e({ searchQuery: a, results: r });
                    };
                  return n.default.createElement(i.default, {
                    id: 'search-settings',
                    placeholder: r('search'),
                    type: 'text',
                    value: p,
                    onChange: e => y(e.target.value),
                    error: t,
                    fullWidth: !0,
                    autoFocus: !0,
                    autoComplete: 'off',
                    startAdornment: n.default.createElement(
                      s.default,
                      { position: 'start', style: { marginRight: '12px' } },
                      n.default.createElement(c.Icon, {
                        size: c.IconSize.Sm,
                        name: c.IconName.Search,
                        color: m,
                      })
                    ),
                    endAdornment: n.default.createElement(
                      n.default.Fragment,
                      null,
                      p &&
                        n.default.createElement(
                          s.default,
                          {
                            className: 'imageclosectn',
                            position: 'end',
                            onClick: () => y(''),
                            style: { cursor: 'pointer' },
                          },
                          n.default.createElement(c.Icon, {
                            name: c.IconName.Close,
                            color: d.IconColor.iconDefault,
                            size: c.IconSize.Xs,
                          })
                        )
                    ),
                    theme: 'bordered',
                  });
                }
                m.propTypes = {
                  onSearch: r.default.func,
                  error: r.default.string,
                  settingsRoutesList: r.default.array,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-search/settings-search.js' },
    ],
    [
      7511,
      { './settings-tab.container': 7513 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./settings-tab.container')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-tab/index.js' },
    ],
    [
      7512,
      {
        '../../../../app/_locales/index.json': 2,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/preferences': 5809,
        '../../../components/component-library': 6402,
        '../../../components/ui/dropdown': 6732,
        '../../../components/ui/identicon/blockieIdenticon': 6755,
        '../../../components/ui/jazzicon': 6762,
        '../../../components/ui/toggle-button': 6814,
        '../../../helpers/constants/available-conversions.json': 6869,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/settings-search': 6915,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = y(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = b(e('prop-types')),
                  o = b(e('classnames')),
                  s = b(e('../../../helpers/constants/available-conversions.json')),
                  i = e('../../../helpers/constants/design-system'),
                  l = b(e('../../../components/ui/dropdown')),
                  u = b(e('../../../components/ui/toggle-button')),
                  c = b(e('../../../../app/_locales/index.json')),
                  d = b(e('../../../components/ui/jazzicon')),
                  p = b(e('../../../components/ui/identicon/blockieIdenticon')),
                  f = e('../../../../shared/constants/metametrics'),
                  m = e('../../../helpers/utils/settings-search'),
                  h = e('../../../../shared/constants/preferences'),
                  g = e('../../../components/component-library');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (y = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function v(e, t, a) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                          var n = a.call(e, t || 'default');
                          if ('object' != typeof n) return n;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: a,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = a),
                    e
                  );
                }
                const _ = s.default
                    .sort((e, t) =>
                      e.name.toLocaleLowerCase().localeCompare(t.name.toLocaleLowerCase())
                    )
                    .map(({ code: e, name: t }) => ({
                      name: `${e.toUpperCase()} - ${t}`,
                      value: e,
                    })),
                  w = c.default.map(e => ({ name: `${e.name}`, value: e.code }));
                class E extends n.PureComponent {
                  constructor(...e) {
                    super(...e),
                      v(
                        this,
                        'settingsRefs',
                        Array(
                          (0, m.getNumberOfSettingRoutesInTab)(
                            this.context.t,
                            this.context.t('general')
                          )
                        )
                          .fill(undefined)
                          .map(() => n.default.createRef())
                      );
                  }
                  componentDidUpdate() {
                    const { t: e } = this.context;
                    (0, m.handleSettingsRefs)(e, e('general'), this.settingsRefs);
                  }
                  componentDidMount() {
                    const { t: e } = this.context;
                    (0, m.handleSettingsRefs)(e, e('general'), this.settingsRefs);
                  }
                  renderCurrentConversion() {
                    const { t: e } = this.context,
                      { currentCurrency: t, setCurrentCurrency: a } = this.props;
                    return n.default.createElement(
                      g.Box,
                      {
                        ref: this.settingsRefs[0],
                        className: 'settings-page__content-row',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                      },
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textDefault,
                            className: 'settings-page__content-item__title',
                          },
                          e('currencyConversion')
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          n.default.createElement(l.default, {
                            'data-testid': 'currency-select',
                            id: 'select-currency',
                            options: _,
                            selectedOption: t,
                            onChange: e => {
                              a(e),
                                this.context.trackEvent({
                                  category: f.MetaMetricsEventCategory.Settings,
                                  event: f.MetaMetricsEventName.CurrentCurrency,
                                  properties: { current_currency: e },
                                });
                            },
                            className: 'settings-page__content-item__dropdown',
                          })
                        )
                      )
                    );
                  }
                  renderCurrentLocale() {
                    const { t: e } = this.context,
                      { updateCurrentLocale: t, currentLocale: a } = this.props;
                    return n.default.createElement(
                      g.Box,
                      {
                        ref: this.settingsRefs[2],
                        className: 'settings-page__content-row',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                      },
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textDefault,
                            className: 'settings-page__content-item__title',
                          },
                          e('currentLanguage')
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          n.default.createElement(l.default, {
                            'data-testid': 'locale-select',
                            id: 'select-locale',
                            options: w,
                            selectedOption: a,
                            onChange: async e => t(e),
                          })
                        )
                      )
                    );
                  }
                  renderHideZeroBalanceTokensOptIn() {
                    const { t: e } = this.context,
                      { hideZeroBalanceTokens: t, setHideZeroBalanceTokens: a } = this.props;
                    return n.default.createElement(
                      g.Box,
                      {
                        ref: this.settingsRefs[5],
                        className: 'settings-page__content-row',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Row,
                        justifyContent: i.JustifyContent.spaceBetween,
                        alignItems: i.AlignItems.center,
                        id: 'toggle-zero-balance',
                      },
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textDefault,
                            className: 'settings-page__content-item__title',
                          },
                          e('hideZeroBalanceTokens')
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        n.default.createElement(u.default, {
                          value: t,
                          onToggle: e => a(!e),
                          'data-testid': 'toggle-zero-balance-button',
                        })
                      )
                    );
                  }
                  renderBlockieOptIn() {
                    const { t: e } = this.context,
                      {
                        useBlockie: t,
                        setUseBlockie: a,
                        selectedAddress: r,
                        tokenList: s,
                      } = this.props;
                    return n.default.createElement(
                      g.Box,
                      {
                        ref: this.settingsRefs[4],
                        className: 'settings-page__content-row',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        id: 'blockie-optin',
                      },
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textDefault,
                            className: 'settings-page__content-item__title',
                          },
                          e('accountIdenticon')
                        ),
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textAlternative,
                            marginBottom: 3,
                            className: 'settings-page__content-item__description',
                          },
                          e('jazzAndBlockies')
                        ),
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content-item__identicon' },
                          n.default.createElement(
                            'button',
                            {
                              'data-testid': 'jazz_icon',
                              onClick: () => a(!1),
                              className: 'settings-page__content-item__identicon__item',
                            },
                            n.default.createElement(
                              'div',
                              {
                                className: (0, o.default)(
                                  'settings-page__content-item__identicon__item__icon',
                                  {
                                    'settings-page__content-item__identicon__item__icon--active':
                                      !t,
                                  }
                                ),
                              },
                              n.default.createElement(d.default, {
                                id: 'jazzicon',
                                address: r,
                                diameter: 32,
                                tokenList: s,
                                style: {
                                  display: 'block',
                                  borderRadius: '16px',
                                  width: '32px',
                                  height: '32px',
                                },
                              })
                            ),
                            n.default.createElement(
                              g.Text,
                              {
                                color: i.TextColor.textDefault,
                                variant: i.TextVariant.bodySm,
                                as: 'h6',
                                marginTop: 0,
                                marginRight: 12,
                                marginBottom: 0,
                                marginLeft: 3,
                              },
                              e('jazzicons')
                            )
                          ),
                          n.default.createElement(
                            'button',
                            {
                              'data-testid': 'blockie_icon',
                              onClick: () => a(!0),
                              className: 'settings-page__content-item__identicon__item',
                            },
                            n.default.createElement(
                              'div',
                              {
                                className: (0, o.default)(
                                  'settings-page__content-item__identicon__item__icon',
                                  {
                                    'settings-page__content-item__identicon__item__icon--active': t,
                                  }
                                ),
                              },
                              n.default.createElement(p.default, {
                                id: 'blockies',
                                address: r,
                                diameter: 32,
                                borderRadius: '50%',
                              })
                            ),
                            n.default.createElement(
                              g.Text,
                              {
                                color: i.TextColor.textDefault,
                                variant: i.TextVariant.bodySm,
                                as: 'h6',
                                marginTop: 3,
                                marginRight: 0,
                                marginBottom: 3,
                                marginLeft: 3,
                              },
                              e('blockies')
                            )
                          )
                        )
                      )
                    );
                  }
                  renderShowNativeTokenAsMainBalance() {
                    const { t: e } = this.context,
                      t = e => {
                        this.context.trackEvent({
                          category: f.MetaMetricsEventCategory.Settings,
                          event: f.MetaMetricsEventName.ShowNativeTokenAsMainBalance,
                          properties: { show_native_token_as_main_balance: e },
                        });
                      },
                      {
                        setShowNativeTokenAsMainBalancePreference: a,
                        showNativeTokenAsMainBalance: r,
                      } = this.props;
                    return n.default.createElement(
                      g.Box,
                      {
                        ref: this.settingsRefs[1],
                        className: 'settings-page__content-row',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Row,
                        justifyContent: i.JustifyContent.spaceBetween,
                        alignItems: i.AlignItems.center,
                        id: 'toggle-show-native-token-as-main-balance',
                      },
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textDefault,
                            className: 'settings-page__content-item__title',
                          },
                          e('showNativeTokenAsMainBalance')
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        n.default.createElement(u.default, {
                          className: 'show-native-token-as-main-balance',
                          value: r,
                          onToggle: e => {
                            a(!e), t(!e);
                          },
                        })
                      )
                    );
                  }
                  renderTheme() {
                    const { t: e } = this.context,
                      { theme: t, setTheme: a } = this.props,
                      r = [
                        { name: e('lightTheme'), value: h.ThemeType.light },
                        { name: e('darkTheme'), value: h.ThemeType.dark },
                        { name: e('osTheme'), value: h.ThemeType.os },
                      ];
                    return n.default.createElement(
                      g.Box,
                      {
                        ref: this.settingsRefs[3],
                        className: 'settings-page__content-row',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                      },
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          g.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            color: i.TextColor.textDefault,
                            className: 'settings-page__content-item__title',
                          },
                          this.context.t('theme')
                        ),
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          this.context.t('themeDescription')
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          n.default.createElement(l.default, {
                            id: 'select-theme',
                            options: r,
                            selectedOption: t,
                            onChange: e => {
                              this.context.trackEvent({
                                category: f.MetaMetricsEventCategory.Settings,
                                event: 'Theme Changed',
                                properties: { theme_selected: e },
                              }),
                                a(e);
                            },
                          })
                        )
                      )
                    );
                  }
                  render() {
                    return n.default.createElement(
                      'div',
                      { className: 'settings-page__body' },
                      this.renderCurrentConversion(),
                      this.renderShowNativeTokenAsMainBalance(),
                      this.renderCurrentLocale(),
                      this.renderTheme(),
                      this.renderBlockieOptIn(),
                      this.renderHideZeroBalanceTokensOptIn()
                    );
                  }
                }
                (a.default = E),
                  v(E, 'contextTypes', {
                    t: r.default.func,
                    metricsEvent: r.default.func,
                    trackEvent: r.default.func,
                  }),
                  v(E, 'propTypes', {
                    setUseBlockie: r.default.func,
                    setCurrentCurrency: r.default.func,
                    updateCurrentLocale: r.default.func,
                    currentLocale: r.default.string,
                    useBlockie: r.default.bool,
                    currentCurrency: r.default.string,
                    showNativeTokenAsMainBalance: r.default.bool,
                    setShowNativeTokenAsMainBalancePreference: r.default.func,
                    hideZeroBalanceTokens: r.default.bool,
                    setHideZeroBalanceTokens: r.default.func,
                    selectedAddress: r.default.string,
                    tokenList: r.default.object,
                    theme: r.default.string,
                    setTheme: r.default.func,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-tab/settings-tab.component.js' },
    ],
    [
      7513,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './settings-tab.component': 7512,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = e('react-redux'),
                  o = e('../../../store/actions'),
                  s = e('../../../selectors'),
                  i = e('../../../../shared/modules/selectors/networks'),
                  l = (n = e('./settings-tab.component')) && n.__esModule ? n : { default: n };
                a.default = (0, r.connect)(
                  e => {
                    const { metamask: t } = e,
                      { currentCurrency: a, useBlockie: n, currentLocale: r } = t,
                      { ticker: o } = (0, i.getProviderConfig)(e),
                      { address: l } = (0, s.getSelectedInternalAccount)(e),
                      { hideZeroBalanceTokens: u, showNativeTokenAsMainBalance: c } = (0,
                      s.getPreferences)(e);
                    return {
                      currentLocale: r,
                      currentCurrency: a,
                      nativeCurrency: o,
                      useBlockie: n,
                      showNativeTokenAsMainBalance: c,
                      hideZeroBalanceTokens: u,
                      selectedAddress: l,
                      tokenList: (0, s.getTokenList)(e),
                      theme: (0, s.getTheme)(e),
                    };
                  },
                  e => ({
                    setCurrentCurrency: t => e((0, o.setCurrentCurrency)(t)),
                    setUseBlockie: t => e((0, o.setUseBlockie)(t)),
                    updateCurrentLocale: t => e((0, o.updateCurrentLocale)(t)),
                    setShowNativeTokenAsMainBalancePreference: t =>
                      e((0, o.setShowNativeTokenAsMainBalancePreference)(t)),
                    setParticipateInMetaMetrics: t => e((0, o.setParticipateInMetaMetrics)(t)),
                    setHideZeroBalanceTokens: t => e((0, o.setHideZeroBalanceTokens)(t)),
                    setTheme: t => e((0, o.setTheme)(t)),
                  })
                )(l.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings-tab/settings-tab.container.js' },
    ],
    [
      7514,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/app': 5789,
        '../../components/app/snaps/snap-icon': 6170,
        '../../components/app/snaps/snap-settings-page': 6190,
        '../../components/app/tab-bar': 6286,
        '../../components/component-library': 6402,
        '../../components/ui/metafox-logo': 6777,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../helpers/utils/settings-search': 6915,
        './advanced-tab': 7467,
        './contact-list-tab': 7476,
        './developer-options-tab': 7483,
        './experimental-tab': 7488,
        './info-tab': 7490,
        './security-tab': 7498,
        './security-tab/reveal-srp-list': 7503,
        './settings-search': 7509,
        './settings-search-list': 7507,
        './settings-tab': 7511,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = S(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = C(e('prop-types')),
                  o = e('react-router-dom'),
                  s = C(e('classnames')),
                  i = C(e('../../components/app/tab-bar')),
                  l = e('../../helpers/constants/routes'),
                  u = e('../../helpers/utils/settings-search'),
                  c = e('../../components/component-library'),
                  d = e('../../helpers/constants/design-system'),
                  p = C(e('../../components/ui/metafox-logo')),
                  f = e('../../../app/scripts/lib/util'),
                  m = e('../../../shared/constants/app'),
                  h = e('../../components/app/snaps/snap-icon'),
                  g = e('../../components/app/snaps/snap-settings-page'),
                  b = C(e('./settings-tab')),
                  y = C(e('./advanced-tab')),
                  v = C(e('./info-tab')),
                  _ = C(e('./security-tab')),
                  w = C(e('./contact-list-tab')),
                  E = (C(e('./developer-options-tab')), C(e('./experimental-tab'))),
                  T = C(e('./settings-search')),
                  x = C(e('./settings-search-list')),
                  k = e('./security-tab/reveal-srp-list');
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function S(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (S = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function R() {
                  return (
                    (R = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var a = arguments[t];
                            for (var n in a) ({}).hasOwnProperty.call(a, n) && (e[n] = a[n]);
                          }
                          return e;
                        }),
                    R.apply(null, arguments)
                  );
                }
                function P(e, t, a) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                          var n = a.call(e, t || 'default');
                          if ('object' != typeof n) return n;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: a,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = a),
                    e
                  );
                }
                class O extends n.PureComponent {
                  constructor(...e) {
                    super(...e),
                      P(this, 'state', {
                        isSearchList: !1,
                        lastFetchedConversionDate: null,
                        searchResults: [],
                        searchText: '',
                      });
                  }
                  componentDidMount() {
                    this.handleConversionDate();
                  }
                  componentDidUpdate() {
                    this.handleConversionDate();
                  }
                  handleConversionDate() {
                    const { conversionDate: e } = this.props;
                    null !== e && this.setState({ lastFetchedConversionDate: e });
                  }
                  handleClickSetting(e) {
                    const { history: t } = this.props;
                    t.push(e.route), this.setState({ isSearchList: '', searchResults: '' });
                  }
                  render() {
                    const {
                        history: e,
                        backRoute: t,
                        currentPath: a,
                        mostRecentOverviewPage: r,
                        addNewNetwork: o,
                      } = this.props,
                      { searchResults: i, isSearchList: h, searchText: g } = this.state,
                      { t: b } = this.context,
                      y = (0, f.getEnvironmentType)() === m.ENVIRONMENT_TYPE_POPUP;
                    return n.default.createElement(
                      'div',
                      {
                        className: (0, s.default)('main-container settings-page', {
                          'settings-page--selected': a !== l.SETTINGS_ROUTE,
                        }),
                      },
                      n.default.createElement(
                        c.Box,
                        { className: 'settings-page__header', padding: 4, paddingBottom: [2, 4] },
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__header__title-container' },
                          y &&
                            n.default.createElement(
                              n.default.Fragment,
                              null,
                              a === l.SETTINGS_ROUTE
                                ? n.default.createElement(p.default, {
                                    className:
                                      'settings-page__header__title-container__metamask-logo',
                                    unsetIconHeight: !0,
                                    onClick: async () => e.push(l.DEFAULT_ROUTE),
                                    display: [d.Display.Flex, d.Display.None],
                                  })
                                : n.default.createElement(c.ButtonIcon, {
                                    ariaLabel: b('back'),
                                    iconName: c.IconName.ArrowLeft,
                                    className:
                                      'settings-page__header__title-container__back-button',
                                    color: d.Color.iconDefault,
                                    onClick: () => e.push(t),
                                    display: [d.Display.Flex, d.Display.None],
                                    size: c.ButtonIconSize.Sm,
                                  })
                            ),
                          this.renderTitle(),
                          n.default.createElement(
                            c.Box,
                            {
                              className: 'settings-page__header__title-container__search',
                              display: [d.Display.Block],
                            },
                            n.default.createElement(T.default, {
                              onSearch: ({ searchQuery: e = '', results: t = [] }) => {
                                this.setState({
                                  isSearchList: '' !== e,
                                  searchResults: t,
                                  searchText: e,
                                });
                              },
                              settingsRoutesList: (0, u.getSettingsRoutes)(),
                            }),
                            h &&
                              g.length >= 3 &&
                              n.default.createElement(x.default, {
                                results: i,
                                onClickSetting: e => this.handleClickSetting(e),
                              })
                          ),
                          n.default.createElement(c.ButtonIcon, {
                            className: 'settings-page__header__title-container__close-button',
                            iconName: c.IconName.Close,
                            ariaLabel: b('close'),
                            onClick: () => {
                              o ? e.push(l.NETWORKS_ROUTE) : e.push(r);
                            },
                            size: c.ButtonIconSize.Sm,
                            marginLeft: 'auto',
                          })
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__content' },
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content__tabs' },
                          this.renderTabs()
                        ),
                        n.default.createElement(
                          'div',
                          { className: 'settings-page__content__modules' },
                          this.renderSubHeader(),
                          this.renderContent()
                        )
                      )
                    );
                  }
                  renderTitle() {
                    const { t: e } = this.context,
                      {
                        isPopup: t,
                        pathnameI18nKey: a,
                        addressName: r,
                        snapSettingsTitle: o,
                      } = this.props;
                    let s;
                    return (
                      (s = t && r ? e('details') : a && t ? e(a) : o || e('settings')),
                      n.default.createElement(
                        'div',
                        { className: 'settings-page__header__title-container__title' },
                        n.default.createElement(
                          c.Text,
                          { variant: d.TextVariant.headingMd, ellipsis: !0 },
                          s
                        )
                      )
                    );
                  }
                  renderSubHeader() {
                    const { t: e } = this.context,
                      {
                        currentPath: t,
                        isPopup: a,
                        isAddressEntryPage: r,
                        pathnameI18nKey: o,
                        addressName: i,
                        initialBreadCrumbRoute: u,
                        breadCrumbTextKey: p,
                        history: f,
                        initialBreadCrumbKey: m,
                      } = this.props;
                    let h;
                    return (
                      (h = e(a && r ? 'settings' : r ? 'contacts' : m || o || 'general')),
                      !t.startsWith(l.NETWORKS_ROUTE) &&
                        n.default.createElement(
                          c.Box,
                          {
                            className: 'settings-page__subheader',
                            padding: 4,
                            paddingLeft: 6,
                            paddingRight: 6,
                            display: d.Display.Flex,
                            flexDirection: d.FlexDirection.Row,
                            alignItems: d.AlignItems.center,
                          },
                          n.default.createElement(
                            c.Text,
                            {
                              className: (0, s.default)({ 'settings-page__subheader--link': u }),
                              variant: d.TextVariant.headingSm,
                              onClick: () => u && f.push(u),
                            },
                            h
                          ),
                          p &&
                            n.default.createElement(
                              'div',
                              { className: 'settings-page__subheader--break' },
                              n.default.createElement('span', null, ' > '),
                              e(p)
                            ),
                          r &&
                            n.default.createElement(
                              'div',
                              { className: 'settings-page__subheader--break' },
                              n.default.createElement('span', null, ' > '),
                              i
                            )
                        )
                    );
                  }
                  renderTabs() {
                    const {
                        history: e,
                        currentPath: t,
                        useExternalServices: a,
                        settingsPageSnaps: r,
                      } = this.props,
                      { t: s } = this.context,
                      u = r.map(({ id: e, name: t }) => ({
                        content: t,
                        icon: n.default.createElement(h.SnapIcon, {
                          snapId: e,
                          avatarSize: c.IconSize.Md,
                          style: { '--size': '20px' },
                        }),
                        key: `${l.SNAP_SETTINGS_ROUTE}/${encodeURIComponent(e)}`,
                      })),
                      d = [
                        {
                          content: s('general'),
                          icon: n.default.createElement(c.Icon, { name: c.IconName.Setting }),
                          key: l.GENERAL_ROUTE,
                        },
                        ...u,
                        {
                          content: s('advanced'),
                          icon: n.default.createElement('i', { className: 'fas fa-sliders-h' }),
                          key: l.ADVANCED_ROUTE,
                        },
                        {
                          content: s('contacts'),
                          icon: n.default.createElement(c.Icon, { name: c.IconName.Book }),
                          key: l.CONTACT_LIST_ROUTE,
                        },
                        {
                          content: s('securityAndPrivacy'),
                          icon: n.default.createElement('i', { className: 'fa fa-lock' }),
                          key: l.SECURITY_ROUTE,
                        },
                        {
                          content: s('experimental'),
                          icon: n.default.createElement(c.Icon, { name: c.IconName.Flask }),
                          key: l.EXPERIMENTAL_ROUTE,
                        },
                        {
                          content: s('about'),
                          icon: n.default.createElement(c.Icon, { name: c.IconName.Info }),
                          key: l.ABOUT_US_ROUTE,
                        },
                      ];
                    return (
                      a &&
                        d.splice(4, 0, {
                          content: s('notifications'),
                          icon: n.default.createElement(c.Icon, { name: c.IconName.Notification }),
                          key: l.NOTIFICATIONS_SETTINGS_ROUTE,
                        }),
                      n.default.createElement(i.default, {
                        tabs: d,
                        isActive: e =>
                          (e === l.GENERAL_ROUTE && t === l.SETTINGS_ROUTE) ||
                          !(e !== l.CONTACT_LIST_ROUTE || !t.includes(l.CONTACT_LIST_ROUTE)) ||
                          (0, o.matchPath)(t, { exact: !0, path: e }),
                        onSelect: a => e.push({ pathname: a, state: { fromPage: t } }),
                      })
                    );
                  }
                  renderContent() {
                    return n.default.createElement(
                      o.Switch,
                      null,
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.GENERAL_ROUTE,
                        render: e =>
                          n.default.createElement(
                            b.default,
                            R({}, e, {
                              lastFetchedConversionDate: this.state.lastFetchedConversionDate,
                            })
                          ),
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.ABOUT_US_ROUTE,
                        render: () => n.default.createElement(v.default, null),
                      }),
                      n.default.createElement(o.Route, {
                        path: `${l.SNAP_SETTINGS_ROUTE}/:snapId`,
                        component: g.SnapSettingsRenderer,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.ADVANCED_ROUTE,
                        component: y.default,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.ADD_NETWORK_ROUTE,
                        render: () => (
                          this.props.toggleNetworkMenu({ isAddingNewNetwork: !0 }),
                          n.default.createElement(o.Redirect, { to: { pathname: l.DEFAULT_ROUTE } })
                        ),
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.NETWORKS_ROUTE,
                        render: () => (
                          this.props.toggleNetworkMenu(),
                          n.default.createElement(o.Redirect, { to: { pathname: l.DEFAULT_ROUTE } })
                        ),
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.ADD_POPULAR_CUSTOM_NETWORK,
                        render: () => (
                          this.props.toggleNetworkMenu(),
                          n.default.createElement(o.Redirect, { to: { pathname: l.DEFAULT_ROUTE } })
                        ),
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.SECURITY_ROUTE,
                        component: _.default,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.EXPERIMENTAL_ROUTE,
                        component: E.default,
                      }),
                      !1,
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.CONTACT_LIST_ROUTE,
                        component: w.default,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.CONTACT_ADD_ROUTE,
                        component: w.default,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: `${l.CONTACT_EDIT_ROUTE}/:id`,
                        component: w.default,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: `${l.CONTACT_VIEW_ROUTE}/:id`,
                        component: w.default,
                      }),
                      n.default.createElement(o.Route, {
                        exact: !0,
                        path: l.REVEAL_SRP_LIST_ROUTE,
                        component: k.RevealSrpList,
                      }),
                      n.default.createElement(o.Route, {
                        render: e =>
                          n.default.createElement(
                            b.default,
                            R({}, e, {
                              lastFetchedConversionDate: this.state.lastFetchedConversionDate,
                            })
                          ),
                      })
                    );
                  }
                }
                P(O, 'propTypes', {
                  addNewNetwork: r.default.bool,
                  addressName: r.default.string,
                  backRoute: r.default.string,
                  breadCrumbTextKey: r.default.string,
                  conversionDate: r.default.number,
                  currentPath: r.default.string,
                  history: r.default.object,
                  initialBreadCrumbKey: r.default.string,
                  initialBreadCrumbRoute: r.default.string,
                  isAddressEntryPage: r.default.bool,
                  isPopup: r.default.bool,
                  mostRecentOverviewPage: r.default.string.isRequired,
                  pathnameI18nKey: r.default.string,
                  settingsPageSnaps: r.default.array,
                  snapSettingsTitle: r.default.string,
                  toggleNetworkMenu: r.default.func.isRequired,
                  useExternalServices: r.default.bool,
                }),
                  P(O, 'contextTypes', { t: r.default.func });
                a.default = O;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings.component.js' },
    ],
    [
      7515,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/app': 5789,
        '../../../shared/modules/hexstring-utils': 5864,
        '../../../shared/modules/selectors/networks': 5875,
        '../../ducks/history/history': 6857,
        '../../helpers/constants/routes': 6878,
        '../../helpers/utils/snaps': 6916,
        '../../helpers/utils/util': 6921,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        './settings.component': 7514,
        'react-redux': 5286,
        'react-router-dom': 5313,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = e('redux'),
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  i = e('../../selectors'),
                  l = e('../../../shared/constants/app'),
                  u = e('../../../app/scripts/lib/util'),
                  c = e('../../ducks/history/history'),
                  d = e('../../../shared/modules/hexstring-utils'),
                  p = e('../../helpers/constants/routes'),
                  f = e('../../../shared/modules/selectors/networks'),
                  m = e('../../store/actions'),
                  h = e('../../helpers/utils/util'),
                  g = e('../../helpers/utils/snaps'),
                  b = (n = e('./settings.component')) && n.__esModule ? n : { default: n };
                const y = {
                  [p.ABOUT_US_ROUTE]: 'about',
                  [p.ADD_NETWORK_ROUTE]: 'networks',
                  [p.ADD_POPULAR_CUSTOM_NETWORK]: 'addNetwork',
                  [p.ADVANCED_ROUTE]: 'advanced',
                  [p.CONTACT_ADD_ROUTE]: 'newContact',
                  [p.CONTACT_EDIT_ROUTE]: 'editContact',
                  [p.CONTACT_LIST_ROUTE]: 'contacts',
                  [p.CONTACT_VIEW_ROUTE]: 'viewContact',
                  [p.DEVELOPER_OPTIONS_ROUTE]: 'developerOptions',
                  [p.EXPERIMENTAL_ROUTE]: 'experimental',
                  [p.GENERAL_ROUTE]: 'general',
                  [p.NETWORKS_FORM_ROUTE]: 'networks',
                  [p.NETWORKS_ROUTE]: 'networks',
                  [p.REVEAL_SRP_LIST_ROUTE]: 'revealSecretRecoveryPhrase',
                  [p.SECURITY_ROUTE]: 'securityAndPrivacy',
                };
                a.default = (0, r.compose)(
                  s.withRouter,
                  (0, o.connect)(
                    (e, t) => {
                      var a;
                      const { location: n } = t,
                        { pathname: r } = n,
                        { ticker: o } = (0, f.getProviderConfig)(e),
                        {
                          metamask: { currencyRates: s },
                        } = e,
                        m = (0, i.getSettingsPageSnapsIds)(e),
                        b = (0, i.getSnapsMetadata)(e),
                        v = null === (a = s[o]) || void 0 === a ? void 0 : a.conversionDate,
                        _ = r.match(/[^/]+$/u)[0],
                        w = _.includes('0x'),
                        E = Boolean(r.match(p.CONTACT_ADD_ROUTE)),
                        T = Boolean(r.match(p.CONTACT_EDIT_ROUTE)),
                        x = Boolean(r.match(p.REVEAL_SRP_LIST_ROUTE)),
                        k =
                          Boolean(r.match(p.NETWORKS_FORM_ROUTE)) ||
                          Boolean(r.match(p.ADD_NETWORK_ROUTE)),
                        C = Boolean(r.match(p.ADD_NETWORK_ROUTE)),
                        S = Boolean(r.match(p.ADD_POPULAR_CUSTOM_NETWORK)),
                        R = Boolean(r.match(p.SNAP_SETTINGS_ROUTE)),
                        P = (0, u.getEnvironmentType)() === l.ENVIRONMENT_TYPE_POPUP,
                        O = y[r];
                      let M = p.SETTINGS_ROUTE;
                      T
                        ? (M = `${p.CONTACT_VIEW_ROUTE}/${_}`)
                        : w || E
                          ? (M = p.CONTACT_LIST_ROUTE)
                          : k || S
                            ? (M = p.NETWORKS_ROUTE)
                            : x && (M = p.SECURITY_ROUTE);
                      const N = (0, i.getAddressBookEntryOrAccountName)(
                          e,
                          !(0, d.isBurnAddress)(_) &&
                            (0, d.isValidHexAddress)(_, { mixedCaseUseChecksum: !0 })
                            ? _
                            : ''
                        ),
                        D = (0, i.getUseExternalServices)(e),
                        I = (0, h.getSnapName)(b),
                        A = m.map(e => ({ id: e, name: I(e) })),
                        j = R && I((0, g.decodeSnapIdFromPathname)(r));
                      return {
                        addNewNetwork: C,
                        addressName: N,
                        backRoute: M,
                        conversionDate: v,
                        currentPath: r,
                        initialBreadCrumbKey: undefined,
                        initialBreadCrumbRoute: undefined,
                        isAddressEntryPage: w,
                        isPopup: P,
                        mostRecentOverviewPage: (0, c.getMostRecentOverviewPage)(e),
                        pathnameI18nKey: O,
                        settingsPageSnaps: A,
                        snapSettingsTitle: j,
                        useExternalServices: D,
                      };
                    },
                    function (e) {
                      return { toggleNetworkMenu: t => e((0, m.toggleNetworkMenu)(t)) };
                    }
                  )
                )(b.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/settings.container.js' },
    ],
    [
      7516,
      { './smart-transaction-status-page': 7518 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'SmartTransactionStatusPage', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r =
                    (n = e('./smart-transaction-status-page')) && n.__esModule ? n : { default: n };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/smart-transactions/smart-transaction-status-page/index.ts',
      },
    ],
    [
      7517,
      {
        '../../../components/component-library': 6402,
        '../../../components/component-library/lottie-animation': 6408,
        '../../../helpers/constants/design-system': 6872,
        '@metamask/smart-transactions-controller/dist/types': 2661,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.SmartTransactionStatusAnimation = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = l(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('@metamask/smart-transactions-controller/dist/types'),
                  o = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  i = e('../../../components/component-library/lottie-animation');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (l = function (e) {
                    return e ? a : t;
                  })(e);
                }
                const u = 'images/animations/smart-transaction-status',
                  c = {
                    Failed: { path: `${u}/failed.lottie.json`, loop: !1 },
                    Confirmed: { path: `${u}/confirmed.lottie.json`, loop: !1 },
                    SubmittingIntro: { path: `${u}/submitting-intro.lottie.json`, loop: !1 },
                    SubmittingLoop: { path: `${u}/submitting-loop.lottie.json`, loop: !0 },
                    Processing: { path: `${u}/processing.lottie.json`, loop: !0 },
                  };
                a.SmartTransactionStatusAnimation = ({ status: e }) => {
                  const [t, a] = (0, n.useState)(!0);
                  let l;
                  if (e === r.SmartTransactionStatuses.PENDING)
                    l = t ? c.SubmittingIntro : c.SubmittingLoop;
                  else
                    switch (e) {
                      case r.SmartTransactionStatuses.SUCCESS:
                        l = c.Confirmed;
                        break;
                      case r.SmartTransactionStatuses.REVERTED:
                      case r.SmartTransactionStatuses.UNKNOWN:
                        l = c.Failed;
                        break;
                      default:
                        l = c.Processing;
                    }
                  const u = (0, n.useCallback)(() => {
                    e === r.SmartTransactionStatuses.PENDING && t && a(!1);
                  }, [e, t]);
                  return n.default.createElement(
                    o.Box,
                    { display: s.Display.Flex, style: { width: '96px', height: '96px' } },
                    n.default.createElement(i.LottieAnimation, {
                      path: l.path,
                      loop: l.loop,
                      autoplay: !0,
                      onComplete: u,
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/smart-transactions/smart-transaction-status-page/smart-transaction-status-animation.tsx',
      },
    ],
    [
      7518,
      {
        '../../../../shared/constants/notifications': 5805,
        '../../../../shared/constants/urls': 5820,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../confirmations/components/simulation-details': 7245,
        './smart-transaction-status-animation': 7517,
        '@metamask/smart-transactions-controller/dist/types': 2661,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.showRemainingTimeInMinAndSec =
                    a.default =
                    a.SmartTransactionStatusPage =
                      void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = b(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('@metamask/smart-transactions-controller/dist/types'),
                  s = e('../../../components/component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  u = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../selectors'),
                  d = e('../../../../shared/constants/urls'),
                  p = e('../../../store/actions'),
                  f = e('../../../../shared/modules/conversion.utils'),
                  m = e('../../confirmations/components/simulation-details'),
                  h = e('../../../../shared/constants/notifications'),
                  g = e('./smart-transaction-status-animation');
                function b(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (b = function (e) {
                    return e ? a : t;
                  })(e);
                }
                a.showRemainingTimeInMinAndSec = e => {
                  if (!Number.isInteger(e)) return '0:00';
                  return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, '0')}`;
                };
                const y = ({ description: e }) =>
                    e
                      ? n.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                            alignItems: i.AlignItems.center,
                            className: 'smart-transaction-status-page__description',
                          },
                          n.default.createElement(
                            s.Text,
                            {
                              marginTop: 2,
                              color: i.TextColor.textAlternative,
                              variant: i.TextVariant.bodySm,
                            },
                            e
                          )
                        )
                      : null,
                  v = ({
                    portfolioSmartTransactionStatusUrl: e,
                    isSmartTransactionPending: t,
                    onCloseExtension: a,
                  }) => {
                    const r = (0, l.useI18nContext)();
                    if (!e) return null;
                    const o = (0, n.useCallback)(() => {
                      const n = window.innerWidth > h.NOTIFICATION_WIDTH;
                      (t && !n) || a(), global.platform.openTab({ url: e });
                    }, [t, a, e]);
                    return n.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        marginTop: 2,
                      },
                      n.default.createElement(
                        s.Button,
                        { type: 'link', variant: s.ButtonVariant.Link, onClick: o },
                        r('viewTransaction')
                      )
                    );
                  },
                  _ = ({ isDapp: e, onCloseExtension: t }) => {
                    const a = (0, l.useI18nContext)();
                    return e
                      ? n.default.createElement(
                          s.ButtonSecondary,
                          {
                            'data-testid': 'smart-transaction-status-page-footer-close-button',
                            onClick: t,
                            width: i.BlockSize.Full,
                            marginTop: 3,
                          },
                          a('closeExtension')
                        )
                      : null;
                  },
                  w = ({ isDapp: e, isSmartTransactionPending: t }) => {
                    const a = (0, l.useI18nContext)();
                    return e && t
                      ? n.default.createElement(
                          s.Text,
                          {
                            marginTop: 2,
                            color: i.TextColor.textAlternative,
                            variant: i.TextVariant.bodySm,
                          },
                          a('closeWindowAnytime')
                        )
                      : null;
                  },
                  E = ({ isDapp: e, onViewActivity: t }) => {
                    const a = (0, l.useI18nContext)();
                    return e
                      ? null
                      : n.default.createElement(
                          s.ButtonSecondary,
                          {
                            'data-testid': 'smart-transaction-status-page-footer-close-button',
                            onClick: t,
                            width: i.BlockSize.Full,
                            marginTop: 3,
                          },
                          a('viewActivity')
                        );
                  },
                  T = ({
                    isDapp: e,
                    isSmartTransactionPending: t,
                    onCloseExtension: a,
                    onViewActivity: r,
                  }) =>
                    n.default.createElement(
                      s.Box,
                      {
                        className: 'smart-transaction-status-page__footer',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                        width: i.BlockSize.Full,
                        padding: 4,
                        paddingBottom: 0,
                      },
                      n.default.createElement(w, { isDapp: e, isSmartTransactionPending: t }),
                      n.default.createElement(_, { isDapp: e, onCloseExtension: a }),
                      n.default.createElement(E, { isDapp: e, onViewActivity: r })
                    ),
                  x = ({ title: e }) =>
                    n.default.createElement(
                      s.Text,
                      {
                        color: i.TextColor.textDefault,
                        variant: i.TextVariant.headingMd,
                        as: 'h4',
                        fontWeight: i.FontWeight.Bold,
                      },
                      e
                    ),
                  k = ({
                    requestState: e,
                    onCloseExtension: t = () => null,
                    onViewActivity: a = () => null,
                  }) => {
                    var h, b, _;
                    const w = (0, l.useI18nContext)(),
                      E = (0, r.useDispatch)(),
                      { smartTransaction: k, isDapp: C, txId: S } = e,
                      R = !k || k.status === o.SmartTransactionStatuses.PENDING,
                      P = (null == k ? void 0 : k.status) === o.SmartTransactionStatuses.SUCCESS,
                      O = Boolean(
                        null == k || null === (h = k.status) || void 0 === h
                          ? void 0
                          : h.startsWith(o.SmartTransactionStatuses.CANCELLED)
                      ),
                      M = (0, r.useSelector)(u.getCurrentChainId),
                      N = (0, r.useSelector)(e => (0, c.getFullTxData)(e, S)) || {},
                      { title: D, description: I } = (({
                        t: e,
                        isSmartTransactionPending: t,
                        isSmartTransactionSuccess: a,
                        isSmartTransactionCancelled: n,
                      }) =>
                        t
                          ? {
                              title: e('smartTransactionPending'),
                              iconName: s.IconName.Clock,
                              iconColor: i.IconColor.primaryDefault,
                            }
                          : a
                            ? {
                                title: e('smartTransactionSuccess'),
                                iconName: s.IconName.Confirmation,
                                iconColor: i.IconColor.successDefault,
                              }
                            : n
                              ? {
                                  title: e('smartTransactionCancelled'),
                                  description: e('smartTransactionCancelledDescription'),
                                  iconName: s.IconName.Danger,
                                  iconColor: i.IconColor.errorDefault,
                                }
                              : {
                                  title: e('smartTransactionError'),
                                  description: e('smartTransactionErrorDescription'),
                                  iconName: s.IconName.Danger,
                                  iconColor: i.IconColor.errorDefault,
                                })({
                        t: w,
                        isSmartTransactionPending: R,
                        isSmartTransactionSuccess: P,
                        isSmartTransactionCancelled: O,
                      });
                    (0, n.useEffect)(() => {
                      E((0, p.hideLoadingIndication)());
                    }, []);
                    const A =
                        (null === (b = N.simulationData) ||
                        void 0 === b ||
                        null === (b = b.tokenBalanceChanges) ||
                        void 0 === b
                          ? void 0
                          : b.length) > 0 ||
                        (null === (_ = N.simulationData) || void 0 === _
                          ? void 0
                          : _.nativeBalanceChange),
                      j = null == k ? void 0 : k.uuid,
                      L =
                        j && M
                          ? `${d.BaseUrl.Portfolio}/networks/${Number((0, f.hexToDecimal)(M))}/smart-transactions/${j}`
                          : undefined;
                    return n.default.createElement(
                      s.Box,
                      {
                        className: 'smart-transaction-status-page',
                        height: i.BlockSize.Full,
                        width: i.BlockSize.Full,
                        display: i.Display.Flex,
                        borderStyle: i.BorderStyle.none,
                        flexDirection: i.FlexDirection.Column,
                        alignItems: i.AlignItems.center,
                        marginBottom: 0,
                      },
                      n.default.createElement(
                        s.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          alignItems: i.AlignItems.center,
                          justifyContent: i.JustifyContent.center,
                          paddingLeft: 4,
                          paddingRight: 4,
                          width: i.BlockSize.Full,
                          style: { flexGrow: 1 },
                        },
                        n.default.createElement(
                          s.Box,
                          {
                            display: i.Display.Flex,
                            flexDirection: i.FlexDirection.Column,
                            alignItems: i.AlignItems.center,
                            paddingLeft: 6,
                            paddingRight: 6,
                            width: i.BlockSize.Full,
                          },
                          n.default.createElement(g.SmartTransactionStatusAnimation, {
                            status: null == k ? void 0 : k.status,
                          }),
                          n.default.createElement(x, { title: D }),
                          n.default.createElement(y, { description: I }),
                          n.default.createElement(v, {
                            portfolioSmartTransactionStatusUrl: L,
                            isSmartTransactionPending: R,
                            onCloseExtension: t,
                          })
                        ),
                        A &&
                          n.default.createElement(
                            s.Box,
                            { width: i.BlockSize.Full },
                            n.default.createElement(m.SimulationDetails, { transaction: N })
                          )
                      ),
                      n.default.createElement(T, {
                        isDapp: C,
                        isSmartTransactionPending: R,
                        onCloseExtension: t,
                        onViewActivity: a,
                      })
                    );
                  };
                a.SmartTransactionStatusPage = k;
                a.default = k;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/smart-transactions/smart-transaction-status-page/smart-transaction-status-page.tsx',
      },
    ],
    [
      7519,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n },
                  o = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system');
                const i = ({ url: e, onSubmit: t }) =>
                  r.default.createElement(o.ButtonIcon, {
                    'data-testid': 'snap-account-redirect-url-icon',
                    onClick: () => {
                      global.platform.openTab({ url: e }), null == t || t();
                    },
                    iconName: o.IconName.Export,
                    color: s.IconColor.primaryDefault,
                    size: o.ButtonIconSize.Sm,
                    ariaLabel: '',
                  });
                a.default = r.default.memo(i);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/snap-account-redirect/components/redirect-url-icon.tsx',
      },
    ],
    [
      7520,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        './snap-account-redirect-message': 7521,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = l(e('react')),
                  r = e('../../../components/component-library'),
                  o = e('../../../helpers/constants/design-system'),
                  s = e('../../../hooks/useI18nContext'),
                  i = l(e('./snap-account-redirect-message'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                a.default = ({ url: e, snapName: t, isBlockedUrl: a, message: l, onSubmit: u }) => {
                  const c = (0, s.useI18nContext)();
                  return n.default.createElement(
                    r.Box,
                    {
                      display: o.Display.Flex,
                      flexDirection: o.FlexDirection.Row,
                      justifyContent: o.JustifyContent.spaceBetween,
                      paddingTop: 4,
                    },
                    n.default.createElement(
                      r.Box,
                      {
                        gap: 4,
                        display: o.Display.Flex,
                        flexDirection: o.FlexDirection.Column,
                        alignItems: o.AlignItems.center,
                      },
                      n.default.createElement(
                        r.Text,
                        {
                          'data-testid': 'snap-account-redirect-content-title',
                          textAlign: o.TextAlign.Center,
                          variant: o.TextVariant.headingLg,
                        },
                        c('snapAccountRedirectFinishSigningTitle')
                      ),
                      a
                        ? n.default.createElement(
                            r.Box,
                            { display: o.Display.Flex, paddingLeft: 4, paddingRight: 4 },
                            n.default.createElement(
                              r.BannerAlert,
                              {
                                severity: r.BannerAlertSeverity.Danger,
                                'data-testid': 'snap-account-redirect-content-blocked-url-banner',
                              },
                              n.default.createElement(
                                r.Text,
                                null,
                                c('snapUrlIsBlocked', [
                                  n.default.createElement(
                                    r.Button,
                                    {
                                      variant: r.ButtonVariant.Link,
                                      size: r.ButtonSize.Inherit,
                                      onClick: () =>
                                        global.platform.openTab({
                                          url: 'https://support.metamask.io/troubleshooting/deceptive-site-ahead-when-trying-to-connect-to-a-site/',
                                        }),
                                      key: 'snap-url-is-blocked-learn-more-button',
                                    },
                                    c('learnMore')
                                  ),
                                ])
                              )
                            )
                          )
                        : null,
                      !1 === a
                        ? n.default.createElement(
                            r.Text,
                            {
                              'data-testid': 'snap-account-redirect-content-description',
                              textAlign: o.TextAlign.Center,
                              variant: o.TextVariant.bodyMd,
                            },
                            c('snapAccountRedirectSiteDescription', [t])
                          )
                        : null,
                      (e.length > 0 || l.length > 0) && !1 === a
                        ? n.default.createElement(i.default, {
                            snapName: t,
                            url: e,
                            message: l,
                            onSubmit: u,
                          })
                        : null
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/snap-account-redirect/components/snap-account-redirect-context.tsx',
      },
    ],
    [
      7521,
      {
        '../../../components/app/snaps/snap-delineator': 6164,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        './url-display-box': 7522,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = l(e('react')),
                  r = e('../../../helpers/constants/design-system'),
                  o = e('../../../components/component-library'),
                  s = e('../../../components/app/snaps/snap-delineator'),
                  i = l(e('./url-display-box'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({ snapName: e, url: t, message: a, onSubmit: l }) =>
                  n.default.createElement(
                    s.SnapDelineator,
                    { 'data-testid': 'snap-account-redirect-message-container', snapName: e },
                    '' !== a
                      ? n.default.createElement(
                          o.Text,
                          {
                            variant: r.TextVariant.bodyMd,
                            'data-testid': 'snap-account-redirect-message',
                          },
                          a
                        )
                      : null,
                    t.length > 0
                      ? n.default.createElement(
                          o.Box,
                          { paddingTop: 2, display: r.Display.Flex },
                          n.default.createElement(i.default, { url: t, onSubmit: l })
                        )
                      : null
                  );
                a.default = n.default.memo(u);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/snap-account-redirect/components/snap-account-redirect-message.tsx',
      },
    ],
    [
      7522,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        './redirect-url-icon': 7519,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = i(e('react')),
                  r = e('../../../helpers/constants/design-system'),
                  o = e('../../../components/component-library'),
                  s = i(e('./redirect-url-icon'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const l = ({ url: e, onSubmit: t }) =>
                  n.default.createElement(
                    o.Box,
                    {
                      display: r.Display.InlineFlex,
                      backgroundColor: r.BackgroundColor.backgroundDefault,
                      alignItems: r.AlignItems.center,
                      borderWidth: 1,
                      borderRadius: r.BorderRadius.SM,
                      borderColor: r.BorderColor.borderDefault,
                      paddingRight: 4,
                    },
                    n.default.createElement(
                      o.Text,
                      {
                        'data-testid': 'snap-account-redirect-url-display-box',
                        padding: 2,
                        variant: r.TextVariant.bodyMd,
                        color: r.TextColor.primaryDefault,
                      },
                      e
                    ),
                    n.default.createElement(s.default, { url: e, onSubmit: t })
                  );
                a.default = n.default.memo(l);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snap-account-redirect/components/url-display-box.tsx' },
    ],
    [
      7523,
      { './snap-account-redirect': 7524 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'SnapAccountRedirect', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./snap-account-redirect')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snap-account-redirect/index.ts' },
    ],
    [
      7524,
      {
        '../../components/app/snaps/snap-authorship-header': 6159,
        '../../components/component-library': 6402,
        '../../helpers/constants/design-system': 6872,
        './components/snap-account-redirect-context': 7520,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = l(e('react')),
                  r = e('../../components/component-library'),
                  o = e('../../helpers/constants/design-system'),
                  s = l(e('../../components/app/snaps/snap-authorship-header')),
                  i = l(e('./components/snap-account-redirect-context'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                a.default = ({
                  url: e,
                  snapId: t,
                  snapName: a,
                  isBlockedUrl: l,
                  message: u,
                  onSubmit: c,
                }) =>
                  n.default.createElement(
                    r.Box,
                    {
                      className: 'create-snap-account-page',
                      height: o.BlockSize.Full,
                      width: o.BlockSize.Full,
                      borderStyle: o.BorderStyle.none,
                      flexDirection: o.FlexDirection.Column,
                      alignItems: o.AlignItems.center,
                    },
                    n.default.createElement(s.default, { snapId: t }),
                    n.default.createElement(
                      r.Box,
                      {
                        display: o.Display.Flex,
                        flexDirection: o.FlexDirection.Column,
                        alignItems: o.AlignItems.center,
                        height: o.BlockSize.Full,
                        paddingLeft: 4,
                        paddingRight: 4,
                      },
                      n.default.createElement(i.default, {
                        url: e,
                        onSubmit: c,
                        snapId: t,
                        snapName: a,
                        isBlockedUrl: l,
                        message: u,
                      })
                    )
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snap-account-redirect/snap-account-redirect.tsx' },
    ],
    [
      7525,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.KeyringSnapRemovalResultStatus = void 0);
                a.KeyringSnapRemovalResultStatus = {
                  Success: 'success',
                  Failed: 'failed',
                  None: 'none',
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snaps/snap-view/constants.ts' },
    ],
    [
      7526,
      { './snap-view': 7528 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./snap-view')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snaps/snap-view/index.js' },
    ],
    [
      7527,
      {
        '../../../components/app/connected-sites-list': 6003,
        '../../../components/app/snaps/keyring-snap-removal-warning': 6152,
        '../../../components/app/snaps/show-more': 6155,
        '../../../components/app/snaps/snap-authorship-expanded': 6157,
        '../../../components/app/snaps/snap-delineator': 6164,
        '../../../components/app/snaps/snap-permissions-list': 6184,
        '../../../components/app/snaps/snap-remove-warning': 6188,
        '../../../components/app/snaps/snap-update-alert': 6270,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/constants/snaps': 6881,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './constants': 7525,
        '@metamask/snaps-utils': 2890,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
        semver: 5617,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = C(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = k(e('prop-types')),
                  s = e('react-router-dom'),
                  i = k(e('semver')),
                  l = e('@metamask/snaps-utils'),
                  u = e('../../../hooks/useI18nContext'),
                  c = e('../../../helpers/constants/design-system'),
                  d = k(e('../../../components/app/snaps/snap-authorship-expanded')),
                  p = k(e('../../../components/app/snaps/snap-remove-warning')),
                  f = k(e('../../../components/app/connected-sites-list')),
                  m = k(e('../../../components/app/snaps/keyring-snap-removal-warning')),
                  h = e('../../../store/actions'),
                  g = e('../../../selectors'),
                  b = e('../../../components/component-library'),
                  y = k(e('../../../components/app/snaps/snap-permissions-list')),
                  v = e('../../../components/app/snaps/snap-delineator'),
                  _ = e('../../../helpers/constants/snaps'),
                  w = k(e('../../../components/app/snaps/snap-update-alert')),
                  E = e('../../../helpers/constants/routes'),
                  T = e('../../../components/app/snaps/show-more'),
                  x = e('./constants');
                function k(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function C(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (C = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function S({ snapId: e, initRemove: t, resetInitRemove: a }) {
                  const o = (0, s.useHistory)(),
                    k = (0, u.useI18nContext)(),
                    C = (0, r.useSelector)(g.getSnaps),
                    S = (0, r.useDispatch)(),
                    R = Object.entries(C)
                      .map(([e, t]) => t)
                      .find(t => t.id === e),
                    [P, O] = (0, n.useState)(!1),
                    [M, N] = (0, n.useState)(!1),
                    [D, I] = (0, n.useState)([]),
                    A = (0, r.useSelector)(g.getMemoizedMetaMaskInternalAccounts),
                    j = (0, r.useSelector)(e =>
                      (0, g.getSubjectsWithSnapPermission)(e, null == R ? void 0 : R.id)
                    ),
                    L = (0, r.useSelector)(e => R && (0, g.getPermissions)(e, R.id)),
                    { name: B, description: F } = (0, r.useSelector)(t =>
                      (0, g.getSnapMetadata)(t, e)
                    );
                  let q = !1;
                  (q = Boolean(null == L ? void 0 : L.snap_manageAccounts)),
                    (0, n.useEffect)(() => {
                      q &&
                        (async () => {
                          const e = await (0, h.getSnapAccountsById)(R.id),
                            t = Object.values(A).filter(t => e.includes(t.address.toLowerCase()));
                          I(t);
                        })();
                    }, [null == R ? void 0 : R.id, A, q]);
                  const W = (0, r.useSelector)(e =>
                      R ? (0, g.getSnapLatestVersion)(e, null == R ? void 0 : R.id) : null
                    ),
                    U = !!W && i.default.gt(W, R.version);
                  return (
                    (0, n.useEffect)(() => {
                      t && (O(!0), a());
                    }, [t, a]),
                    n.default.createElement(
                      b.Box,
                      null,
                      U &&
                        n.default.createElement(w.default, {
                          snapName: B,
                          onUpdateClick: async () => {
                            const e = { [R.id]: { version: W } },
                              t = await S((0, h.updateSnap)('MetaMask', e));
                            t && o.push(`${E.CONNECT_ROUTE}/${t}`);
                          },
                          bannerAlertProps: { marginBottom: 4 },
                        }),
                      n.default.createElement(d.default, { snapId: R.id, snap: R }),
                      n.default.createElement(
                        b.Box,
                        { className: 'snap-view__content__description', marginTop: [4, 7] },
                        n.default.createElement(
                          v.SnapDelineator,
                          { type: _.DelineatorType.Description, snapName: B },
                          n.default.createElement(
                            T.ShowMore,
                            { buttonBackground: c.BackgroundColor.backgroundDefault },
                            n.default.createElement(b.Text, null, F)
                          )
                        )
                      ),
                      n.default.createElement(
                        b.Box,
                        { className: 'snap-view__content__permissions', marginTop: 12 },
                        n.default.createElement(
                          b.Text,
                          { variant: c.TextVariant.bodyLgMedium, marginBottom: 1 },
                          k('permissions')
                        ),
                        n.default.createElement(y.default, {
                          snapId: e,
                          snapName: B,
                          permissions: L ?? {},
                          showOptions: !0,
                          showAllPermissions: !0,
                        })
                      ),
                      n.default.createElement(
                        b.Box,
                        { className: 'snap-view__content__connected-sites', marginTop: 12 },
                        n.default.createElement(
                          b.Text,
                          { variant: c.TextVariant.bodyLgMedium, marginBottom: 2 },
                          j.every(e => (0, l.isSnapId)(e.origin))
                            ? k('connectedSnaps')
                            : j.some(e => (0, l.isSnapId)(e.origin))
                              ? k('connectedSitesAndSnaps')
                              : k('connectedSites')
                        ),
                        n.default.createElement(f.default, {
                          connectedSubjects: j,
                          onDisconnect: e => {
                            var t;
                            (t = e), R.id, S((0, h.disconnectOriginFromSnap)(t, R.id));
                          },
                        })
                      ),
                      n.default.createElement(
                        b.Box,
                        { className: 'snap-view__content__remove', marginTop: 12 },
                        n.default.createElement(
                          b.Text,
                          { variant: c.TextVariant.bodyLgMedium, color: c.TextColor.textDefault },
                          k('removeSnap')
                        ),
                        n.default.createElement(
                          b.Text,
                          { variant: c.TextVariant.bodyMd, color: c.TextColor.textDefault },
                          k('removeSnapDescription')
                        ),
                        n.default.createElement(
                          b.Box,
                          {
                            marginTop: 4,
                            display: c.Display.Flex,
                            justifyContent: c.JustifyContent.center,
                          },
                          n.default.createElement(
                            b.Button,
                            {
                              className: 'snap-view__content__remove-button',
                              danger: 'true',
                              variant: b.ButtonVariant.Secondary,
                              width: c.BlockSize.Full,
                              size: b.ButtonSize.Lg,
                              onClick: () => O(!0),
                              'data-testid': 'remove-snap-button',
                              disabled: R.preinstalled && !1 === R.removable,
                            },
                            n.default.createElement(
                              b.Text,
                              {
                                color: c.TextColor.inherit,
                                variant: c.TextVariant.bodyMd,
                                flexWrap: c.FlexWrap.NoWrap,
                                ellipsis: !0,
                                style: { overflow: 'hidden' },
                                paddingTop: 3,
                                paddingBottom: 3,
                              },
                              `${k('remove')} ${B}`
                            )
                          ),
                          n.default.createElement(p.default, {
                            isOpen: P && (!q || 0 === D.length) && !M,
                            onCancel: () => O(!1),
                            onSubmit: async () => {
                              await S((0, h.removeSnap)(R.id));
                            },
                            snapName: B,
                          }),
                          n.default.createElement(
                            n.default.Fragment,
                            null,
                            n.default.createElement(m.default, {
                              snap: R,
                              keyringAccounts: D,
                              snapUrl: R.url,
                              onCancel: () => O(!1),
                              onClose: () => O(!1),
                              onBack: () => O(!1),
                              onSubmit: async () => {
                                try {
                                  N(!0),
                                    await S((0, h.removeSnap)(R.id)),
                                    O(!1),
                                    S(
                                      (0, h.showKeyringSnapRemovalModal)({
                                        snapName: B,
                                        result: x.KeyringSnapRemovalResultStatus.Success,
                                      })
                                    );
                                } catch {
                                  O(!1),
                                    S(
                                      (0, h.showKeyringSnapRemovalModal)({
                                        snapName: B,
                                        result: x.KeyringSnapRemovalResultStatus.Failed,
                                      })
                                    );
                                } finally {
                                  N(!1);
                                }
                              },
                              isOpen: P && q && D.length > 0,
                            })
                          )
                        )
                      )
                    )
                  );
                }
                S.propTypes = {
                  snapId: o.default.string.isRequired,
                  initRemove: o.default.bool,
                  resetInitRemove: o.default.func,
                };
                a.default = S;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snaps/snap-view/snap-settings.js' },
    ],
    [
      7528,
      {
        '../../../components/app/snaps/snap-authorship-header': 6159,
        '../../../components/app/snaps/snap-home-menu': 6166,
        '../../../components/app/snaps/snap-home-page/snap-home-renderer': 6168,
        '../../../components/component-library': 6402,
        '../../../components/multichain/pages/page': 6652,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        './snap-settings': 7527,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = b(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-router-dom'),
                  o = e('react-redux'),
                  s = e('@metamask/utils'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../helpers/constants/routes'),
                  u = e('../../../selectors'),
                  c = e('../../../components/component-library'),
                  d = e('../../../components/multichain/pages/page'),
                  p = g(e('../../../components/app/snaps/snap-authorship-header')),
                  f = g(e('../../../components/app/snaps/snap-home-menu')),
                  m = e('../../../components/app/snaps/snap-home-page/snap-home-renderer'),
                  h = g(e('./snap-settings'));
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function b(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (b = function (e) {
                    return e ? a : t;
                  })(e);
                }
                a.default = function () {
                  const e = (0, r.useHistory)(),
                    t = (0, r.useLocation)(),
                    { pathname: a } = t,
                    g = decodeURIComponent(a.match(/[^/]+$/u)[0]),
                    b = (0, o.useSelector)(u.getSnaps),
                    y = Object.entries(b)
                      .map(([e, t]) => t)
                      .find(e => e.id === g);
                  (0, n.useEffect)(() => {
                    y || e.push(l.SNAPS_ROUTE);
                  }, [e, y]);
                  const v = (0, o.useSelector)(e => y && (0, u.getPermissions)(e, y.id)),
                    _ = v && (0, s.hasProperty)(v, 'endowment:page-home'),
                    [w, E] = (0, n.useState)(!_),
                    [T, x] = (0, n.useState)(!1);
                  if (!y) return null;
                  const k = () => {
                    y.preinstalled && y.hidden
                      ? e.push(l.DEFAULT_ROUTE)
                      : w && _
                        ? E(!1)
                        : e.push(l.SNAPS_ROUTE);
                  };
                  return n.default.createElement(
                    'div',
                    {
                      className: 'snap-view',
                      style: { boxShadow: 'var(--shadow-size-md) var(--color-shadow-default)' },
                    },
                    n.default.createElement(
                      d.Page,
                      { backgroundColor: i.BackgroundColor.backgroundDefault },
                      !y.hideSnapBranding &&
                        n.default.createElement(p.default, {
                          snapId: g,
                          showInfo: !1,
                          startAccessory: n.default.createElement(
                            c.Box,
                            {
                              display: i.Display.Flex,
                              justifyContent: i.JustifyContent.center,
                              alignItems: i.AlignItems.center,
                            },
                            n.default.createElement(c.ButtonIcon, {
                              ariaLabel: 'Back',
                              iconName: 'arrow-left',
                              size: c.ButtonIconSize.Md,
                              onClick: k,
                            })
                          ),
                          endAccessory:
                            !y.hidden &&
                            n.default.createElement(f.default, {
                              snapId: g,
                              onSettingsClick: () => {
                                E(!0);
                              },
                              onRemoveClick: () => {
                                x(!0), E(!0);
                              },
                              isSettingsAvailable: !y.preinstalled,
                            }),
                        }),
                      n.default.createElement(
                        d.Content,
                        {
                          backgroundColor: i.BackgroundColor.backgroundDefault,
                          className: 'snap-view__content',
                          marginTop: w ? 4 : 0,
                          padding: w ? 4 : 0,
                        },
                        w
                          ? n.default.createElement(h.default, {
                              snapId: g,
                              initRemove: T,
                              resetInitRemove: () => {
                                x(!1);
                              },
                            })
                          : n.default.createElement(m.SnapHomeRenderer, { snapId: g })
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snaps/snap-view/snap-view.js' },
    ],
    [
      7529,
      { './snap-list': 7530 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./snap-list')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/snaps/snaps-list/index.js' },
    ],
    [
      7530,
      {
        '../../../components/app/snaps/snap-list-item': 6176,
        '../../../components/component-library': 6402,
        '../../../components/multichain/pages/page': 6652,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/settings-search': 6915,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = g(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  i =
                    (n = e('../../../components/app/snaps/snap-list-item')) && n.__esModule
                      ? n
                      : { default: n },
                  l = e('../../../hooks/useI18nContext'),
                  u = e('../../../helpers/constants/design-system'),
                  c = e('../../../helpers/constants/routes'),
                  d = e('../../../selectors'),
                  p = e('../../../helpers/utils/settings-search'),
                  f = e('../../../components/component-library'),
                  m = e('../../../components/multichain/pages/page'),
                  h = e('../../../helpers/utils/util');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (g = function (e) {
                    return e ? a : t;
                  })(e);
                }
                a.default = () => {
                  const e = (0, l.useI18nContext)(),
                    t = (0, s.useHistory)(),
                    a = (0, r.useRef)();
                  (0, r.useEffect)(() => {
                    (0, p.handleSettingsRefs)(e, e('snaps'), a);
                  }, [a, e]);
                  const n = (0, o.useSelector)(d.getSnapsList),
                    g = (0, o.useSelector)(d.getAllSnapAvailableUpdates);
                  return r.default.createElement(
                    'div',
                    { className: 'snaps' },
                    r.default.createElement(
                      m.Page,
                      { backgroundColor: u.BackgroundColor.backgroundDefault },
                      r.default.createElement(
                        m.Header,
                        {
                          backgroundColor: u.BackgroundColor.backgroundDefault,
                          startAccessory: r.default.createElement(f.ButtonIcon, {
                            ariaLabel: 'Back',
                            iconName: 'arrow-left',
                            size: 'sm',
                            onClick: () => t.push(c.DEFAULT_ROUTE),
                          }),
                        },
                        e('snaps')
                      ),
                      r.default.createElement(
                        m.Content,
                        {
                          backgroundColor: u.BackgroundColor.backgroundDefault,
                          className: 'snaps__content',
                        },
                        r.default.createElement(
                          f.Box,
                          {
                            className: 'snaps__content__list',
                            display: u.Display.Flex,
                            flexDirection: u.FlexDirection.Column,
                            height: u.BlockSize.Full,
                          },
                          n.length > 0 &&
                            r.default.createElement(
                              'div',
                              { className: 'snaps__content__list__body' },
                              r.default.createElement(
                                'div',
                                { className: 'snaps__content__list__wrapper' },
                                n.map(e =>
                                  r.default.createElement(i.default, {
                                    className: 'snaps__content__list-item',
                                    key: e.key,
                                    packageName: e.packageName,
                                    name: e.name,
                                    onClick: () => {
                                      (e => {
                                        t.push((0, h.getSnapRoute)(e.id));
                                      })(e);
                                    },
                                    snapId: e.id,
                                    showUpdateDot: g.get(e.id),
                                  })
                                )
                              )
                            ),
                          n.length <= 5 &&
                            r.default.createElement(
                              f.Box,
                              {
                                display: u.Display.Flex,
                                height: u.BlockSize.Full,
                                flexDirection: u.FlexDirection.Row,
                                flexWrap: u.FlexWrap.Wrap,
                                justifyContent: u.JustifyContent.center,
                                className: 'snaps__content__list__container--snaps-info-content',
                              },
                              n.length < 1 &&
                                r.default.createElement(
                                  f.Box,
                                  {
                                    className: 'snaps__content__list__container--no-snaps_inner',
                                    display: u.Display.Flex,
                                    flexDirection: u.FlexDirection.Column,
                                    justifyContent: u.JustifyContent.center,
                                    alignItems: u.AlignItems.center,
                                  },
                                  r.default.createElement(f.Icon, {
                                    name: f.IconName.Snaps,
                                    color: u.IconColor.iconMuted,
                                    className: 'snaps__content__list__no-snaps_icon',
                                    size: f.IconSize.Inherit,
                                  }),
                                  r.default.createElement(
                                    f.Text,
                                    {
                                      color: u.Color.textMuted,
                                      align: u.TextAlign.Center,
                                      marginTop: 4,
                                    },
                                    e('noSnaps')
                                  )
                                ),
                              r.default.createElement(f.Box, {
                                display: u.Display.Flex,
                                width: u.BlockSize.Full,
                                height: u.BlockSize.Min,
                              }),
                              r.default.createElement(
                                f.Box,
                                {
                                  className: 'snaps__content__list__container--no-snaps_banner-tip',
                                  display: u.Display.Flex,
                                  flexDirection: u.FlexDirection.Column,
                                  justifyContent: u.JustifyContent.flexEnd,
                                  paddingLeft: 4,
                                  paddingRight: 4,
                                  paddingBottom: 4,
                                },
                                r.default.createElement(
                                  f.BannerTip,
                                  {
                                    logoType: f.BannerTipLogoType.Greeting,
                                    description: e('extendWalletWithSnaps'),
                                    descriptionProps: { variant: u.TextVariant.bodyMd },
                                  },
                                  r.default.createElement(
                                    f.ButtonLink,
                                    {
                                      size: u.Size.auto,
                                      href: 'https://snaps.metamask.io/',
                                      target: '_blank',
                                      endIconName: f.IconName.Export,
                                    },
                                    `${e('discoverSnaps')}`
                                  )
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
      { package: '$root$', file: 'ui/pages/snaps/snaps-list/snap-list.js' },
    ],
    [
      7531,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/selectors': 5874,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/pulse-loader': 6791,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../selectors/selectors': 7611,
        '../swaps-footer': 7580,
        './swap-step-icon': 7533,
        'lodash/isEqual': 4908,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    const e = (0, n.useContext)(i.I18nContext),
                      t = (0, o.useHistory)(),
                      a = (0, r.useDispatch)(),
                      _ = (0, r.useSelector)(l.getFetchParams, s.default),
                      { destinationTokenInfo: w, sourceTokenInfo: E } =
                        (null == _ ? void 0 : _.metaData) || {},
                      T = (0, r.useSelector)(l.getApproveTxParams, r.shallowEqual),
                      x = (0, r.useSelector)(u.isHardwareWallet),
                      k = (0, r.useSelector)(u.getHardwareWalletType),
                      C = (0, r.useSelector)(c.getSmartTransactionsOptInStatusForMetrics),
                      S = (0, r.useSelector)(c.getSmartTransactionsEnabled),
                      R = (0, r.useSelector)(l.getCurrentSmartTransactionsEnabled),
                      P = Boolean(T),
                      O = (0, n.useContext)(g.MetaMetricsContext);
                    (0, n.useEffect)(() => {
                      O({
                        event: 'Awaiting Signature(s) on a HW wallet',
                        category: b.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          needs_two_confirmations: P,
                          token_from: null == E ? void 0 : E.symbol,
                          token_from_amount: null == _ ? void 0 : _.value,
                          token_to: null == w ? void 0 : w.symbol,
                          request_type: null != _ && _.balanceError ? 'Quote' : 'Order',
                          slippage: null == _ ? void 0 : _.slippage,
                          custom_slippage: 2 === (null == _ ? void 0 : _.slippage),
                          is_hardware_wallet: x,
                          hardware_wallet_type: k,
                          stx_enabled: S,
                          current_stx_enabled: R,
                          stx_user_opt_in: C,
                        },
                      });
                    }, []);
                    const M = e(P ? 'swapTwoTransactions' : 'swapConfirmWithHwWallet');
                    return n.default.createElement(
                      'div',
                      { className: 'awaiting-signatures' },
                      n.default.createElement(
                        f.default,
                        {
                          paddingLeft: 8,
                          paddingRight: 8,
                          height: m.BLOCK_SIZES.FULL,
                          justifyContent: m.JustifyContent.center,
                          display: m.DISPLAY.FLEX,
                          className: 'awaiting-signatures__content',
                        },
                        n.default.createElement(
                          f.default,
                          { marginTop: 3, marginBottom: 4 },
                          n.default.createElement(p.default, null)
                        ),
                        n.default.createElement(
                          y.Text,
                          {
                            color: m.TextColor.textDefault,
                            variant: m.TextVariant.headingMd,
                            as: 'h3',
                          },
                          M
                        ),
                        P &&
                          n.default.createElement(
                            n.default.Fragment,
                            null,
                            n.default.createElement(
                              y.Text,
                              { variant: m.TextVariant.bodyMdBold, marginTop: 2 },
                              e('swapToConfirmWithHwWallet')
                            ),
                            n.default.createElement(
                              'ul',
                              { className: 'awaiting-signatures__steps' },
                              n.default.createElement(
                                'li',
                                null,
                                n.default.createElement(v.default, { stepNumber: 1 }),
                                e('swapAllowSwappingOf', [
                                  n.default.createElement(
                                    y.Text,
                                    {
                                      as: 'span',
                                      variant: m.TextVariant.bodyMdBold,
                                      key: 'allowToken',
                                    },
                                    null == w ? void 0 : w.symbol
                                  ),
                                ])
                              ),
                              n.default.createElement(
                                'li',
                                null,
                                n.default.createElement(v.default, { stepNumber: 2 }),
                                e('swapFromTo', [
                                  n.default.createElement(
                                    y.Text,
                                    {
                                      as: 'span',
                                      variant: m.TextVariant.bodyMdBold,
                                      key: 'tokenFrom',
                                    },
                                    null == E ? void 0 : E.symbol
                                  ),
                                  n.default.createElement(
                                    y.Text,
                                    {
                                      as: 'span',
                                      variation: m.TextVariant.bodyMdBold,
                                      key: 'tokenTo',
                                    },
                                    null == w ? void 0 : w.symbol
                                  ),
                                ])
                              )
                            ),
                            n.default.createElement(
                              y.Text,
                              { variant: m.TextVariant.bodyMd },
                              e('swapGasFeesSplit')
                            )
                          )
                      ),
                      n.default.createElement(h.default, {
                        onSubmit: async () => {
                          await a((0, l.prepareToLeaveSwaps)()),
                            t.push(d.DEFAULT_ROUTE),
                            t.push(d.PREPARE_SWAP_ROUTE);
                        },
                        submitText: e('cancel'),
                        hideCancel: !0,
                      })
                    );
                  });
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = w(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = _(e('lodash/isEqual')),
                  i = e('../../../contexts/i18n'),
                  l = e('../../../ducks/swaps/swaps'),
                  u = e('../../../selectors/selectors'),
                  c = e('../../../../shared/modules/selectors'),
                  d = e('../../../helpers/constants/routes'),
                  p = _(e('../../../components/ui/pulse-loader')),
                  f = _(e('../../../components/ui/box')),
                  m = e('../../../helpers/constants/design-system'),
                  h = _(e('../swaps-footer')),
                  g = e('../../../contexts/metametrics'),
                  b = e('../../../../shared/constants/metametrics'),
                  y = e('../../../components/component-library'),
                  v = _(e('./swap-step-icon'));
                function _(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function w(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (w = function (e) {
                    return e ? a : t;
                  })(e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-signatures/awaiting-signatures.js' },
    ],
    [
      7532,
      { './awaiting-signatures': 7531 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./awaiting-signatures')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-signatures/index.js' },
    ],
    [
      7533,
      { 'prop-types': 5082, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = s);
                var n = o(e('react')),
                  r = o(e('prop-types'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function s({ stepNumber: e = 1 }) {
                  switch (e) {
                    case 1:
                      return n.default.createElement(
                        'svg',
                        {
                          width: '14',
                          height: '14',
                          viewBox: '0 0 14 14',
                          fill: 'none',
                          xmlns: 'http://www.w3.org/2000/svg',
                        },
                        n.default.createElement('circle', {
                          cx: '7',
                          cy: '7',
                          r: '6.25',
                          stroke: 'var(--color-primary-default)',
                          strokeWidth: '1.5',
                        }),
                        n.default.createElement('path', {
                          d: 'M6.50983 5.192H5.27783L6.14183 4H7.71783V9.68H6.50983V5.192Z',
                          fill: 'var(--color-primary-default)',
                        })
                      );
                    case 2:
                      return n.default.createElement(
                        'svg',
                        {
                          width: '14',
                          height: '14',
                          viewBox: '0 0 14 14',
                          fill: 'none',
                          xmlns: 'http://www.w3.org/2000/svg',
                        },
                        n.default.createElement('circle', {
                          cx: '7',
                          cy: '7',
                          r: '6.25',
                          stroke: 'var(--color-primary-default)',
                          strokeWidth: '1.5',
                        }),
                        n.default.createElement('path', {
                          d: 'M8.92 9.776H5V9.368C5 9.048 5.056 8.77067 5.168 8.536C5.28 8.296 5.42133 8.08533 5.592 7.904C5.768 7.71733 5.96267 7.54933 6.176 7.4C6.39467 7.25067 6.608 7.10133 6.816 6.952C6.928 6.872 7.03467 6.78933 7.136 6.704C7.24267 6.61867 7.33333 6.53067 7.408 6.44C7.488 6.34933 7.552 6.256 7.6 6.16C7.648 6.064 7.672 5.96533 7.672 5.864C7.672 5.67733 7.616 5.52 7.504 5.392C7.39733 5.25867 7.22933 5.192 7 5.192C6.88267 5.192 6.776 5.21333 6.68 5.256C6.584 5.29333 6.50133 5.344 6.432 5.408C6.368 5.472 6.31733 5.54667 6.28 5.632C6.248 5.71733 6.232 5.808 6.232 5.904H5.024C5.024 5.62667 5.07467 5.37067 5.176 5.136C5.27733 4.90133 5.41867 4.70133 5.6 4.536C5.78133 4.36533 5.99467 4.23467 6.24 4.144C6.48533 4.048 6.752 4 7.04 4C7.28 4 7.50933 4.03733 7.728 4.112C7.952 4.18667 8.14933 4.29867 8.32 4.448C8.49067 4.59733 8.62667 4.784 8.728 5.008C8.82933 5.22667 8.88 5.48267 8.88 5.776C8.88 6.032 8.85067 6.25867 8.792 6.456C8.73333 6.648 8.65067 6.824 8.544 6.984C8.44267 7.13867 8.32 7.28 8.176 7.408C8.032 7.536 7.87733 7.66133 7.712 7.784C7.64267 7.832 7.55733 7.888 7.456 7.952C7.36 8.016 7.26133 8.08267 7.16 8.152C7.064 8.22133 6.97333 8.29333 6.888 8.368C6.80267 8.44267 6.74133 8.51467 6.704 8.584H8.92V9.776Z',
                          fill: 'var(--color-primary-default)',
                        })
                      );
                    default:
                      return undefined;
                  }
                }
                s.propTypes = { stepNumber: r.default.number };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-signatures/swap-step-icon.js' },
    ],
    [
      7534,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/swaps': 5815,
        '../../../../shared/lib/ui-utils': 5852,
        '../../../../shared/modules/selectors': 5874,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/modules/swaps.utils': 5879,
        '../../../components/ui/mascot': 6771,
        '../../../components/ui/pulse-loader': 6791,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/build-types': 6897,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../create-new-swap': 7542,
        '../swaps-footer': 7580,
        '../swaps.util': 7583,
        '../view-on-block-explorer': 7585,
        './quotes-timeout-icon': 7536,
        './swap-failure-icon': 7537,
        './swap-success-icon': 7538,
        '@metamask/etherscan-link': 1938,
        events: 4465,
        'lodash/isEqual': 4908,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = L);
                var n = j(e('events')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = A(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = e('react-redux'),
                  s = j(e('prop-types')),
                  i = e('react-router-dom'),
                  l = j(e('lodash/isEqual')),
                  u = e('@metamask/etherscan-link'),
                  c = e('../../../contexts/i18n'),
                  d = e('../../../contexts/metametrics'),
                  p = e('../../../../shared/constants/metametrics'),
                  f = e('../../../../shared/modules/selectors/networks'),
                  m = e('../../../ducks/metamask/metamask'),
                  h = e('../../../selectors'),
                  g = e('../../../selectors/selectors'),
                  b = e('../../../../shared/modules/selectors'),
                  y = e('../../../ducks/swaps/swaps'),
                  v = j(e('../../../components/ui/mascot')),
                  _ = e('../../../../shared/constants/swaps'),
                  w = e('../../../../shared/constants/common'),
                  E = e('../../../../shared/modules/swaps.utils'),
                  T = j(e('../../../components/ui/pulse-loader')),
                  x = e('../../../helpers/utils/build-types'),
                  k = e('../../../helpers/constants/routes'),
                  C = e('../../../store/actions'),
                  S = e('../swaps.util'),
                  R = j(e('../swaps-footer')),
                  P = j(e('../create-new-swap')),
                  O = j(e('../view-on-block-explorer')),
                  M = e('../../../../shared/lib/ui-utils'),
                  N = j(e('./swap-failure-icon')),
                  D = j(e('./swap-success-icon')),
                  I = j(e('./quotes-timeout-icon'));
                function A(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (A = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function j(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function L({
                  swapComplete: e,
                  errorKey: t,
                  txHash: a,
                  tokensReceived: s,
                  submittingSwap: A,
                  txId: j,
                }) {
                  var L, B;
                  const F = (0, r.useContext)(c.I18nContext),
                    q = (0, r.useContext)(d.MetaMetricsContext),
                    W = (0, i.useHistory)(),
                    U = (0, o.useDispatch)(),
                    $ = (0, o.useSelector)(g.getHDEntropyIndex),
                    V = (0, r.useRef)(new n.default()),
                    { swapMetaData: z } = (0, o.useSelector)(e => (0, h.getFullTxData)(e, j)) || {},
                    H = (0, o.useSelector)(y.getFetchParams, l.default),
                    G = (0, o.useSelector)(y.getFromTokenInputValue),
                    Q = (0, o.useSelector)(y.getMaxSlippage),
                    X = (0, o.useSelector)(y.getUsedQuote, l.default),
                    K = (0, o.useSelector)(y.getApproveTxParams, o.shallowEqual),
                    Z = (0, o.useSelector)(y.getUsedSwapsGasPrice),
                    Y = (0, o.useSelector)(m.getCurrentCurrency),
                    J = (0, o.useSelector)(h.getUSDConversionRate),
                    ee = (0, o.useSelector)(f.getCurrentChainId),
                    te = (0, o.useSelector)(h.getRpcPrefsForCurrentProvider, o.shallowEqual),
                    [ae, ne] = (0, r.useState)(!1),
                    re =
                      (null == X || null === (L = X.destinationTokenInfo) || void 0 === L
                        ? void 0
                        : L.symbol) || (null == z ? void 0 : z.token_to);
                  let oe;
                  if (X && Z) {
                    var se, ie;
                    oe = (0, S.getRenderableNetworkFeesForQuote)({
                      tradeGas: X.gasEstimateWithRefund || X.averageGas,
                      approveGas: (null == K ? void 0 : K.gas) || '0x0',
                      gasPrice: Z,
                      currentCurrency: Y,
                      conversionRate: J,
                      tradeValue:
                        null == X || null === (se = X.trade) || void 0 === se ? void 0 : se.value,
                      sourceSymbol:
                        null == X || null === (ie = X.sourceTokenInfo) || void 0 === ie
                          ? void 0
                          : ie.symbol,
                      sourceAmount: X.sourceAmount,
                      chainId: ee,
                    }).rawNetworkFees;
                  }
                  const le = (0, o.useSelector)(h.isHardwareWallet),
                    ue = (0, o.useSelector)(h.getHardwareWalletType),
                    ce = (0, o.useSelector)(b.getSmartTransactionsOptInStatusForMetrics),
                    de = (0, o.useSelector)(b.getSmartTransactionsEnabled),
                    pe = (0, o.useSelector)(y.getCurrentSmartTransactionsEnabled),
                    fe = (null == z ? void 0 : z.slippage) || (null == X ? void 0 : X.slippage),
                    me = {
                      token_from:
                        (null == z ? void 0 : z.token_from) ||
                        (null == X || null === (B = X.sourceTokenInfo) || void 0 === B
                          ? void 0
                          : B.symbol),
                      token_from_amount: null == z ? void 0 : z.token_from_amount,
                      token_to: re,
                      request_type: null != H && H.balanceError ? 'Quote' : 'Order',
                      slippage: fe,
                      custom_slippage: 2 === fe,
                      gas_fees: oe,
                      is_hardware_wallet: le,
                      hardware_wallet_type: ue,
                      stx_enabled: de,
                      current_stx_enabled: pe,
                      stx_user_opt_in: ce,
                    },
                    he =
                      te.blockExplorerUrl ?? w.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[ee] ?? null,
                    ge = (0, u.getBlockExplorerLink)(
                      { hash: a, chainId: ee },
                      { blockExplorerUrl: he }
                    );
                  let be, ye, ve, _e, we;
                  t === _.OFFLINE_FOR_MAINTENANCE
                    ? ((be = F('offlineForMaintenance')),
                      (ve = F('metamaskSwapsOfflineDescription')),
                      (_e = F('close')),
                      (ye = r.default.createElement(N.default, null)))
                    : t === _.SWAP_FAILED_ERROR
                      ? ((be = F('swapFailedErrorTitle')),
                        (ve = F('swapFailedErrorDescriptionWithSupportLink', [
                          r.default.createElement(
                            'a',
                            {
                              className: 'awaiting-swap__support-link',
                              key: 'awaiting-swap-support-link',
                              href: M.SUPPORT_LINK,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              onClick: () => {
                                q(
                                  {
                                    category: p.MetaMetricsEventCategory.Swaps,
                                    event: p.MetaMetricsEventName.SupportLinkClicked,
                                    properties: { url: M.SUPPORT_LINK },
                                  },
                                  {
                                    contextPropsIntoEventProperties: [
                                      p.MetaMetricsContextProp.PageTitle,
                                    ],
                                  }
                                );
                              },
                            },
                            new URL(M.SUPPORT_LINK).hostname
                          ),
                        ])),
                        (_e = F('tryAgain')),
                        (ye = r.default.createElement(N.default, null)),
                        (we =
                          ge &&
                          r.default.createElement(O.default, {
                            blockExplorerUrl: ge,
                            sensitiveTrackingProperties: me,
                          })))
                      : t === _.QUOTES_EXPIRED_ERROR
                        ? ((be = F('swapQuotesExpiredErrorTitle')),
                          (ve = F('swapQuotesExpiredErrorDescription')),
                          (_e = F('tryAgain')),
                          (ye = r.default.createElement(I.default, null)),
                          ae ||
                            (ne(!0),
                            q({
                              event: 'Quotes Timed Out',
                              category: p.MetaMetricsEventCategory.Swaps,
                              sensitiveProperties: me,
                              properties: { hd_entropy_index: $ },
                            })))
                        : t === _.ERROR_FETCHING_QUOTES
                          ? ((be = F('swapFetchingQuotesErrorTitle')),
                            (ve = F('swapFetchingQuotesErrorDescription')),
                            (_e = F('back')),
                            (ye = r.default.createElement(N.default, null)))
                          : t === _.QUOTES_NOT_AVAILABLE_ERROR
                            ? ((be = F('swapQuotesNotAvailableErrorTitle')),
                              (ve = F('swapQuotesNotAvailableErrorDescription')),
                              (_e = F('tryAgain')),
                              (ye = r.default.createElement(N.default, null)))
                            : t === _.CONTRACT_DATA_DISABLED_ERROR
                              ? ((be = F('swapContractDataDisabledErrorTitle')),
                                (ve = F('swapContractDataDisabledErrorDescription')),
                                (_e = F('tryAgain')),
                                (ye = r.default.createElement(N.default, null)))
                              : t || e
                                ? !t &&
                                  e &&
                                  ((be = F('swapTransactionComplete')),
                                  (ye = r.default.createElement(D.default, null)),
                                  (_e = F('close')),
                                  (ve = F('swapTokenAvailable', [
                                    r.default.createElement(
                                      'span',
                                      {
                                        key: 'swapTokenAvailable-2',
                                        className: 'awaiting-swap__amount-and-symbol',
                                      },
                                      `${s || ''} ${re}`
                                    ),
                                  ])),
                                  (we =
                                    ge &&
                                    r.default.createElement(O.default, {
                                      blockExplorerUrl: ge,
                                      sensitiveTrackingProperties: me,
                                    })))
                                : ((be = F('swapProcessing')),
                                  (ye = r.default.createElement(T.default, null)),
                                  (_e = F('swapsViewInActivity')),
                                  (ve = F('swapOnceTransactionHasProcess', [
                                    r.default.createElement(
                                      'span',
                                      {
                                        key: 'swapOnceTransactionHasProcess-1',
                                        className: 'awaiting-swap__amount-and-symbol',
                                        'data-testid': 'awaiting-swap-amount-and-symbol',
                                      },
                                      re
                                    ),
                                  ])),
                                  (we =
                                    ge &&
                                    r.default.createElement(O.default, {
                                      blockExplorerUrl: ge,
                                      sensitiveTrackingProperties: me,
                                    }))),
                    (0, r.useEffect)(() => {
                      t && U((0, C.stopPollingForQuotes)());
                    }, [U, t]);
                  return r.default.createElement(
                    'div',
                    { className: 'awaiting-swap' },
                    r.default.createElement(
                      'div',
                      { className: 'awaiting-swap__content' },
                      !(e || t) &&
                        ((0, x.isFlask)() || (0, x.isBeta)()
                          ? r.default.createElement(
                              'div',
                              { className: 'awaiting-swap__mascot' },
                              r.default.createElement('img', {
                                src: './images/logo/metamask-fox.svg',
                                width: '90',
                                height: '90',
                              })
                            )
                          : r.default.createElement(v.default, {
                              animationEventEmitter: V.current,
                              width: '90',
                              height: '90',
                            })),
                      r.default.createElement(
                        'div',
                        { className: 'awaiting-swap__status-image' },
                        ye
                      ),
                      r.default.createElement(
                        'div',
                        {
                          className: 'awaiting-swap__header',
                          'data-testid': 'awaiting-swap-header',
                        },
                        be
                      ),
                      r.default.createElement(
                        'div',
                        {
                          className: 'awaiting-swap__main-description',
                          'data-testid': 'awaiting-swap-main-description',
                        },
                        ve
                      ),
                      we
                    ),
                    !t && e
                      ? r.default.createElement(P.default, { sensitiveTrackingProperties: me })
                      : null,
                    r.default.createElement(R.default, {
                      onSubmit: async () => {
                        t === _.OFFLINE_FOR_MAINTENANCE
                          ? (await U((0, y.prepareToLeaveSwaps)()), W.push(k.DEFAULT_ROUTE))
                          : t === _.QUOTES_EXPIRED_ERROR
                            ? (U((0, y.prepareForRetryGetQuotes)()),
                              await U((0, y.fetchQuotesAndSetQuoteState)(W, G, Q, q)))
                            : t
                              ? await U((0, y.navigateBackToPrepareSwap)(W))
                              : ((0, E.isSwapsDefaultTokenSymbol)(re, ee) ||
                                  e ||
                                  (await U((0, C.setDefaultHomeActiveTabName)('activity'))),
                                W.push(k.DEFAULT_ROUTE));
                      },
                      onCancel: async () => await U((0, y.navigateBackToPrepareSwap)(W)),
                      submitText: _e,
                      disabled: A,
                      hideCancel: t !== _.QUOTES_EXPIRED_ERROR,
                    })
                  );
                }
                L.propTypes = {
                  swapComplete: s.default.bool,
                  txHash: s.default.string,
                  tokensReceived: s.default.string,
                  errorKey: s.default.oneOf([
                    _.QUOTES_EXPIRED_ERROR,
                    _.SWAP_FAILED_ERROR,
                    _.ERROR_FETCHING_QUOTES,
                    _.QUOTES_NOT_AVAILABLE_ERROR,
                    _.OFFLINE_FOR_MAINTENANCE,
                    _.CONTRACT_DATA_DISABLED_ERROR,
                  ]),
                  submittingSwap: s.default.bool,
                  txId: s.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-swap/awaiting-swap.js' },
    ],
    [
      7535,
      { './awaiting-swap': 7534 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./awaiting-swap')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-swap/index.js' },
    ],
    [
      7536,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '44',
                        height: '44',
                        viewBox: '0 0 44 44',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M22 0C9.96768 0 0.178406 9.78928 0.178406 21.8216C0.178406 33.8539 9.96768 43.6432 22 43.6432C34.0323 43.6432 43.8216 33.8539 43.8216 21.8216C43.8216 9.78929 34.0323 0 22 0ZM22 3.27324C32.2633 3.27324 40.5484 11.5583 40.5484 21.8216C40.5484 32.0849 32.2633 40.3699 22 40.3699C11.7367 40.3699 3.45164 32.0849 3.45164 21.8216C3.45164 11.5583 11.7367 3.27324 22 3.27324ZM22 6.00094C21.0961 6.00094 20.3634 6.73371 20.3634 7.63756V21.8216C20.3634 22.4269 20.6932 22.9534 21.1817 23.2366L32.5187 29.783C33.3014 30.235 34.3001 29.9692 34.752 29.1864C35.2039 28.4036 34.938 27.405 34.1553 26.953L23.6366 20.8839V7.63756C23.6366 6.73371 22.9039 6.00094 22 6.00094Z',
                        fill: 'var(--color-primary-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-swap/quotes-timeout-icon.js' },
    ],
    [
      7537,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '45',
                        height: '39',
                        viewBox: '0 0 45 39',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M22.203 0.424438L0.285706 38.2816H44.1203L22.203 0.424438ZM22.203 8.39436L37.2064 34.2966H7.19961L22.203 8.39436ZM20.2105 16.3643V24.3342H24.1955V16.3643H20.2105ZM20.2105 28.3192V32.3041H24.1955V28.3192',
                        fill: 'var(--color-error-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-swap/swap-failure-icon.js' },
    ],
    [
      7538,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '38',
                        height: '38',
                        viewBox: '0 0 38 38',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M34.1429 19C34.1429 23.0161 32.5474 26.8678 29.7076 29.7076C26.8678 32.5474 23.0161 34.1428 19 34.1428C14.9839 34.1428 11.1322 32.5474 8.29238 29.7076C5.45254 26.8678 3.85714 23.0161 3.85714 19C3.85714 14.9838 5.45254 11.1322 8.29238 8.29237C11.1322 5.45253 14.9839 3.85713 19 3.85713C20.4386 3.85713 21.8393 4.06534 23.1643 4.44391L26.1361 1.47213C23.9404 0.563554 21.5364 0.0714111 19 0.0714111C16.5143 0.0714111 14.0529 0.561013 11.7563 1.51226C9.45983 2.46351 7.37316 3.85778 5.61548 5.61546C2.06568 9.16526 0.0714264 13.9798 0.0714264 19C0.0714264 24.0201 2.06568 28.8347 5.61548 32.3845C7.37316 34.1422 9.45983 35.5364 11.7563 36.4877C14.0529 37.4389 16.5143 37.9286 19 37.9286C24.0202 37.9286 28.8347 35.9343 32.3845 32.3845C35.9343 28.8347 37.9286 24.0201 37.9286 19H34.1429ZM11.2582 15.3657L8.58928 18.0536L17.1071 26.5714L36.0357 7.64284L33.3668 4.95498L17.1071 21.2146L11.2582 15.3657Z',
                        fill: 'var(--color-success-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/awaiting-swap/swap-success-icon.js' },
    ],
    [
      7539,
      {
        '../../../../shared/constants/time': 5817,
        '../../../components/ui/info-tooltip': 6759,
        '../../../contexts/i18n': 6832,
        '../../../ducks/swaps/swaps': 6868,
        classnames: 4168,
        luxon: 4931,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = b);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = f(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = p(e('prop-types')),
                  s = p(e('classnames')),
                  i = e('luxon'),
                  l = e('../../../contexts/i18n'),
                  u = p(e('../../../components/ui/info-tooltip')),
                  c = e('../../../ducks/swaps/swaps'),
                  d = e('../../../../shared/constants/time');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (f = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function m(e, t, a) {
                  return a - (e - t);
                }
                function h(e) {
                  return Math.max(e - d.SECOND, 0);
                }
                function g(e, t) {
                  const [a, n] = t.split(':');
                  return e <= (60 * Number(a) + Number(n)) * d.SECOND;
                }
                function b({
                  timeStarted: e,
                  timeOnly: t,
                  timerBase: a,
                  warningTime: o,
                  labelKey: p,
                  infoTooltipLabelKey: f,
                }) {
                  const b = (0, n.useContext)(l.I18nContext),
                    y = (0, n.useRef)(),
                    v = (0, n.useRef)(),
                    _ = (0, r.useSelector)(c.getSwapsQuoteRefreshTime),
                    w = (0, r.useSelector)(c.getSwapsQuotePrefetchingRefreshTime),
                    E = v.current ? _ : w,
                    T = Number(a) || E,
                    [x, k] = (0, n.useState)(() => Date.now()),
                    [C, S] = (0, n.useState)(() => m(x, e, T));
                  (0, n.useEffect)(
                    () => (
                      y.current === undefined &&
                        (y.current = setInterval(() => {
                          S(h);
                        }, d.SECOND)),
                      function () {
                        clearInterval(y.current);
                      }
                    ),
                    []
                  ),
                    (0, n.useEffect)(() => {
                      if (
                        (v.current || (v.current = e || Date.now()), 0 === C && e !== v.current)
                      ) {
                        v.current = e;
                        const t = Date.now();
                        k(t),
                          S(m(t, e, T)),
                          clearInterval(y.current),
                          (y.current = setInterval(() => {
                            S(h);
                          }, d.SECOND));
                      }
                    }, [e, C, T]);
                  const R = i.Duration.fromMillis(C).toFormat('m:ss');
                  let P;
                  return (
                    t
                      ? (P = n.default.createElement(
                          'div',
                          { className: 'countdown-timer__time' },
                          R
                        ))
                      : p &&
                        (P = b(p, [
                          n.default.createElement(
                            'div',
                            { key: 'countdown-time-1', className: 'countdown-timer__time' },
                            R
                          ),
                        ])),
                    n.default.createElement(
                      'div',
                      { className: 'countdown-timer' },
                      n.default.createElement(
                        'div',
                        {
                          'data-testid': 'countdown-timer__timer-container',
                          className: (0, s.default)('countdown-timer__timer-container', {
                            'countdown-timer__timer-container--warning': o && g(C, o),
                          }),
                        },
                        P
                      ),
                      !t && f
                        ? n.default.createElement(u.default, {
                            position: 'bottom',
                            contentText: b(f),
                          })
                        : null
                    )
                  );
                }
                b.propTypes = {
                  timeStarted: o.default.number,
                  timeOnly: o.default.bool,
                  timerBase: o.default.number,
                  warningTime: o.default.string,
                  labelKey: o.default.string,
                  infoTooltipLabelKey: o.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/countdown-timer/countdown-timer.js' },
    ],
    [
      7540,
      { './countdown-timer': 7539 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./countdown-timer')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/countdown-timer/index.js' },
    ],
    [
      7541,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        'lodash/isEqual': 4908,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = y);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = b(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = g(e('prop-types')),
                  s = e('react-router-dom'),
                  i = g(e('lodash/isEqual')),
                  l = g(e('../../../components/ui/box')),
                  u = e('../../../contexts/i18n'),
                  c = e('../../../contexts/metametrics'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../../ducks/swaps/swaps'),
                  f = e('../../../helpers/constants/routes'),
                  m = e('../../../selectors'),
                  h = e('../../../selectors/selectors');
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function b(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (b = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function y({ sensitiveTrackingProperties: e }) {
                  const t = (0, n.useContext)(u.I18nContext),
                    a = (0, n.useContext)(c.MetaMetricsContext),
                    o = (0, r.useSelector)(h.getHDEntropyIndex),
                    g = (0, r.useDispatch)(),
                    b = (0, s.useHistory)(),
                    y = (0, r.useSelector)(m.getSwapsDefaultToken, i.default);
                  return n.default.createElement(
                    l.default,
                    { marginBottom: 3, className: 'create-new-swap' },
                    n.default.createElement(
                      'button',
                      {
                        onClick: async () => {
                          a({
                            event: d.MetaMetricsEventName.MakeAnotherSwap,
                            category: d.MetaMetricsEventCategory.Swaps,
                            sensitiveProperties: e,
                            properties: { hd_entropy_index: o },
                          }),
                            b.push(f.DEFAULT_ROUTE),
                            await g((0, p.navigateBackToPrepareSwap)(b)),
                            g((0, p.setSwapsFromToken)(y));
                        },
                      },
                      t('makeAnotherSwap')
                    )
                  );
                }
                y.propTypes = { sensitiveTrackingProperties: o.default.object.isRequired };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/create-new-swap/create-new-swap.js' },
    ],
    [
      7542,
      { './create-new-swap': 7541 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./create-new-swap')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/create-new-swap/index.js' },
    ],
    [
      7543,
      {
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../swaps.util': 7583,
        'bignumber.js': 4030,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = h);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = m(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = f(e('prop-types')),
                  o = f(e('bignumber.js')),
                  s = f(e('classnames')),
                  i = e('../swaps.util'),
                  l = e('../../../../shared/lib/transactions-controller-utils'),
                  u = f(e('../../../components/ui/box')),
                  c = e('../../../helpers/constants/design-system'),
                  d = e('../../../components/component-library'),
                  p = e('../../../contexts/i18n');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (m = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function h({
                  primaryTokenValue: e,
                  primaryTokenDecimals: t = 18,
                  primaryTokenSymbol: a,
                  secondaryTokenValue: r,
                  secondaryTokenDecimals: f = 18,
                  secondaryTokenSymbol: m,
                  boldSymbols: h = !0,
                  showIconForSwappingTokens: g = !0,
                  className: b,
                  onQuotesClick: y,
                }) {
                  const [v, _] = (0, n.useState)(!0),
                    w = (0, n.useContext)(p.I18nContext),
                    E = (0, l.calcTokenAmount)(e, t),
                    T = (0, l.calcTokenAmount)(r, f),
                    x = new o.default(T).div(E).round(9).toString(10),
                    k = new o.default(E).div(T).round(9).toString(10),
                    C = v ? a : m,
                    S = v ? m : a,
                    R = v ? x : k;
                  let P,
                    O = '=';
                  new o.default(R, 10).lt('0.00000001', 10)
                    ? ((P = '0.000000001'), (O = '<'))
                    : (P = new o.default(R, 10).lt('0.000001', 10)
                        ? R
                        : (0, i.formatSwapsValueForDisplay)(R));
                  const M = y
                      ? 'exchange-rate-display__quote-rate'
                      : 'exchange-rate-display__quote-rate--no-link',
                    N = y ? c.TextColor.primaryDefault : c.TextColor.textDefault;
                  return n.default.createElement(
                    'div',
                    { className: (0, s.default)('exchange-rate-display', b) },
                    n.default.createElement(
                      u.default,
                      {
                        display: c.DISPLAY.FLEX,
                        justifyContent: c.JustifyContent.center,
                        alignItems: c.AlignItems.center,
                        onClick: y,
                        color: N,
                        className: M,
                        gap: 1,
                        'data-testid': 'exchange-rate-display-quote-rate',
                      },
                      n.default.createElement('span', null, '1'),
                      n.default.createElement(
                        'span',
                        {
                          className: (0, s.default)({ 'exchange-rate-display__bold': h }),
                          'data-testid': 'exchange-rate-display-base-symbol',
                        },
                        C
                      ),
                      n.default.createElement('span', null, O),
                      n.default.createElement('span', null, P),
                      n.default.createElement(
                        'span',
                        { className: (0, s.default)({ 'exchange-rate-display__bold': h }) },
                        S
                      )
                    ),
                    g &&
                      n.default.createElement(d.Icon, {
                        name: d.IconName.SwapHorizontal,
                        onClick: () => {
                          _(!v);
                        },
                        color: c.IconColor.iconAlternative,
                        style: { cursor: 'pointer' },
                        title: w('switch'),
                        'data-testid': 'exchange-rate-display-switch',
                      })
                  );
                }
                h.propTypes = {
                  primaryTokenValue: r.default.oneOfType([
                    r.default.string,
                    r.default.instanceOf(o.default),
                  ]).isRequired,
                  primaryTokenDecimals: r.default.oneOfType([r.default.string, r.default.number]),
                  primaryTokenSymbol: r.default.string.isRequired,
                  secondaryTokenValue: r.default.oneOfType([
                    r.default.string,
                    r.default.instanceOf(o.default),
                  ]).isRequired,
                  secondaryTokenDecimals: r.default.oneOfType([r.default.string, r.default.number]),
                  secondaryTokenSymbol: r.default.string.isRequired,
                  className: r.default.string,
                  boldSymbols: r.default.bool,
                  showIconForSwappingTokens: r.default.bool,
                  onQuotesClick: r.default.func,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/exchange-rate-display/exchange-rate-display.js' },
    ],
    [
      7544,
      { './exchange-rate-display': 7543 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./exchange-rate-display')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/exchange-rate-display/index.js' },
    ],
    [
      7545,
      { '../../../ducks/swaps/swaps': 6868, react: 5328, 'react-redux': 5286 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.useSwapsFeatureFlags = function () {
                    const e = (0, r.useDispatch)();
                    (0, n.useEffect)(() => {
                      (async () => {
                        await e((0, o.fetchSwapsLivenessAndFeatureFlags)());
                      })();
                    }, [e]);
                  });
                var n = e('react'),
                  r = e('react-redux'),
                  o = e('../../../ducks/swaps/swaps');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/hooks/useSwapsFeatureFlags.ts' },
    ],
    [
      7546,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/swaps/swaps': 6868,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../swaps.util': 7583,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    const e = (0, r.useDispatch)(),
                      t = (0, r.useSelector)(l.getCurrentChainId),
                      a = (0, r.useSelector)(u.getIsSwapsChain),
                      c = (0, r.useSelector)(u.checkNetworkAndAccountSupports1559),
                      d = (0, r.useSelector)(u.getUseExternalServices);
                    (0, n.useEffect)(
                      () =>
                        a && d
                          ? ((0, o.fetchTokens)(t)
                              .then(t => {
                                e((0, i.setSwapsTokens)(t));
                              })
                              .catch(e => console.error(e)),
                            (0, o.fetchTopAssets)(t).then(t => {
                              e((0, s.setTopAssets)(t));
                            }),
                            (0, o.fetchAggregatorMetadata)(t).then(t => {
                              e((0, s.setAggregatorMetadata)(t));
                            }),
                            c || e((0, s.fetchAndSetSwapsGasPriceInfo)()),
                            () => {
                              e((0, s.prepareToLeaveSwaps)());
                            })
                          : undefined,
                      [e, t, c, a, d]
                    );
                  });
                var n = e('react'),
                  r = e('react-redux'),
                  o = e('../swaps.util'),
                  s = e('../../../ducks/swaps/swaps'),
                  i = e('../../../store/actions'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  u = e('../../../selectors');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/hooks/useUpdateSwapsState.ts' },
    ],
    [
      7547,
      {
        '../../../components/component-library': 6402,
        '../../../components/component-library/form-text-field/deprecated': 6390,
        '../../../components/component-library/modal-content/deprecated': 6412,
        '../../../components/component-library/modal-header/deprecated': 6421,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = f);
                var n,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = p(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = (n = e('prop-types')) && n.__esModule ? n : { default: n },
                  s = e('../../../contexts/i18n'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../components/component-library'),
                  u = e('../../../components/component-library/form-text-field/deprecated'),
                  c = e('../../../components/component-library/modal-content/deprecated'),
                  d = e('../../../components/component-library/modal-header/deprecated');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (p = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function f({
                  onImportTokenCloseClick: e,
                  onImportTokenClick: t,
                  setIsImportTokenModalOpen: a,
                  tokenForImport: n,
                  isOpen: o,
                }) {
                  const p = (0, r.useContext)(s.I18nContext);
                  return r.default.createElement(
                    l.Modal,
                    { isOpen: o, onClose: () => a(!1) },
                    r.default.createElement(l.ModalOverlay, null),
                    r.default.createElement(
                      c.ModalContent,
                      {
                        modalDialogProps: {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          alignItems: i.AlignItems.center,
                          gap: 4,
                        },
                      },
                      r.default.createElement(
                        d.ModalHeader,
                        { onClose: () => a(!1), width: i.BlockSize.Full },
                        p('importTokenQuestion')
                      ),
                      r.default.createElement(l.BannerAlert, {
                        severity: i.Severity.Danger,
                        description: p('importTokenWarning'),
                      }),
                      r.default.createElement(l.AvatarToken, {
                        src: n.iconUrl,
                        name: n.symbol,
                        size: l.AvatarTokenSize.Xl,
                      }),
                      r.default.createElement(
                        l.Text,
                        { variant: i.TextVariant.headingSm, as: 'h4' },
                        n.name || ''
                      ),
                      r.default.createElement(u.FormTextField, {
                        label: p('contract'),
                        id: 'import-tokens-input',
                        inputProps: { variant: i.TextVariant.bodySm },
                        readOnly: !0,
                        value: n.address || '',
                        width: i.BlockSize.Full,
                      }),
                      r.default.createElement(
                        l.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          gap: 4,
                          width: i.BlockSize.Full,
                        },
                        r.default.createElement(
                          l.Button,
                          {
                            variant: l.BUTTON_VARIANT.SECONDARY,
                            block: !0,
                            size: l.BUTTON_SIZES.LG,
                            onClick: e,
                          },
                          p('cancel')
                        ),
                        r.default.createElement(
                          l.Button,
                          {
                            variant: l.BUTTON_VARIANT.PRIMARY,
                            block: !0,
                            size: l.BUTTON_SIZES.LG,
                            onClick: t,
                            'data-testid': 'import-tokens-import-button',
                          },
                          p('import')
                        )
                      )
                    )
                  );
                }
                f.propTypes = {
                  onImportTokenCloseClick: o.default.func,
                  onImportTokenClick: o.default.func,
                  setIsImportTokenModalOpen: o.default.func,
                  tokenForImport: o.default.object,
                  isOpen: o.default.bool,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/import-token/import-token.js' },
    ],
    [
      7548,
      { './import-token': 7547 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./import-token')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/import-token/index.js' },
    ],
    [
      7549,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/constants/swaps': 5815,
        '../../../shared/lib/transactions-controller-utils': 5851,
        '../../../shared/modules/selectors': 5874,
        '../../../shared/modules/selectors/networks': 5875,
        '../../components/component-library': 6402,
        '../../components/ui/box': 6703,
        '../../contexts/i18n': 6832,
        '../../contexts/metametrics': 6836,
        '../../ducks/swaps/swaps': 6868,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../helpers/higher-order-components/feature-toggled-route': 6889,
        '../../hooks/useGasFeeEstimates': 6982,
        '../../selectors': 7601,
        '../../selectors/selectors': 7611,
        '../../store/actions': 7619,
        './awaiting-signatures': 7532,
        './awaiting-swap': 7535,
        './hooks/useUpdateSwapsState': 7546,
        './loading-swaps-quotes': 7552,
        './notification-page/notification-page': 7555,
        './prepare-swap-page/prepare-swap-page': 7556,
        './smart-transaction-status': 7573,
        '@metamask/transaction-controller': 2946,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    var e, t, a, N;
                    const D = (0, n.useContext)(l.I18nContext),
                      I = (0, o.useHistory)(),
                      A = (0, r.useDispatch)(),
                      j = (0, n.useContext)(_.MetaMetricsContext),
                      L = (0, r.useSelector)(u.getHDEntropyIndex),
                      { pathname: B } = (0, o.useLocation)(),
                      F = B === m.AWAITING_SWAP_ROUTE,
                      q = B === m.AWAITING_SIGNATURES_ROUTE,
                      W = B === m.SWAPS_ERROR_ROUTE,
                      U = B === m.LOADING_QUOTES_ROUTE,
                      $ = B === m.SMART_TRANSACTION_STATUS_ROUTE,
                      V = B === m.PREPARE_SWAP_ROUTE,
                      [z, H] = (0, n.useState)(!1),
                      G = (0, r.useSelector)(d.getFetchParams, s.isEqual),
                      { destinationTokenInfo: Q = {} } = (null == G ? void 0 : G.metaData) || {},
                      X = (0, r.useSelector)(d.getBackgroundSwapRouteState),
                      K = (0, r.useSelector)(u.getSelectedAccount, r.shallowEqual),
                      Z = (0, r.useSelector)(d.getQuotes, s.isEqual),
                      Y = (0, r.useSelector)(d.getLatestAddedTokenTo, s.isEqual),
                      J = (0, r.useSelector)(p.getCurrentNetworkTransactions, r.shallowEqual),
                      ee = (0, r.useSelector)(d.getTradeTxId),
                      te = (0, r.useSelector)(d.getApproveTxId),
                      ae = (0, r.useSelector)(d.getAggregatorMetadata, r.shallowEqual),
                      ne = (0, r.useSelector)(d.getFetchingQuotes);
                    let re = (0, r.useSelector)(d.getSwapsErrorKey);
                    const oe = (0, r.useSelector)(d.getSwapsFeatureIsLive),
                      se = (0, r.useSelector)(c.getCurrentChainId),
                      ie = (0, r.useSelector)(u.getIsSwapsChain),
                      le = (0, r.useSelector)(u.getTokenList, s.isEqual),
                      ue = (0, s.shuffle)(Object.values(le)),
                      ce = (0, r.useSelector)(d.getReviewSwapClickedTimestamp),
                      de = Boolean(ce),
                      pe = (0, r.useSelector)(f.getSmartTransactionsOptInStatusForMetrics),
                      fe = (0, r.useSelector)(f.getSmartTransactionsEnabled),
                      me = (0, r.useSelector)(d.getCurrentSmartTransactionsEnabled),
                      he = (0, r.useSelector)(d.getCurrentSmartTransactionsError);
                    (0, n.useEffect)(() => {
                      ie ||
                        (async () => {
                          await A((0, d.prepareToLeaveSwaps)()), I.push(m.DEFAULT_ROUTE);
                        })();
                    }, [ie, A, I]),
                      (0, b.useGasFeeEstimates)();
                    const { balance: ge, address: be } = K,
                      ye = te && J.find(({ id: e }) => te === e),
                      ve = ee && J.find(({ id: e }) => ee === e),
                      _e =
                        (null == ve ? void 0 : ve.txReceipt) &&
                        (0, w.getSwapsTokensReceivedFromTxMeta)(
                          null == Q ? void 0 : Q.symbol,
                          ve,
                          null == Q ? void 0 : Q.address,
                          be,
                          null == Q ? void 0 : Q.decimals,
                          ye,
                          se
                        ),
                      we = (null == ve ? void 0 : ve.status) === i.TransactionStatus.confirmed,
                      Ee =
                        (null == ye ? void 0 : ye.status) === i.TransactionStatus.failed ||
                        '0x0' ===
                          (null == ye || null === (e = ye.txReceipt) || void 0 === e
                            ? void 0
                            : e.status),
                      Te =
                        (null == ve ? void 0 : ve.status) === i.TransactionStatus.failed ||
                        '0x0' ===
                          (null == ve || null === (t = ve.txReceipt) || void 0 === t
                            ? void 0
                            : t.status),
                      xe = Ee || Te;
                    xe && re !== h.CONTRACT_DATA_DISABLED_ERROR && (re = h.SWAP_FAILED_ERROR);
                    const ke = (0, n.useRef)();
                    (0, n.useEffect)(() => {
                      ke.current = () => {
                        !Y ||
                          (F && !xe) ||
                          A(
                            (0, g.ignoreTokens)({ tokensToIgnore: Y, dontShowLoadingIndicator: !0 })
                          );
                      };
                    }, [xe, A, Y, Q, G, F]),
                      (0, n.useEffect)(
                        () => () => {
                          ke.current();
                        },
                        []
                      ),
                      (0, k.default)();
                    const Ce = (0, r.useSelector)(u.isHardwareWallet),
                      Se = (0, r.useSelector)(u.getHardwareWalletType),
                      Re = (0, n.useRef)();
                    (0, n.useEffect)(() => {
                      Re.current = () => {
                        var e, t;
                        j({
                          event: v.MetaMetricsEventName.ExitedSwaps,
                          category: v.MetaMetricsEventCategory.Swaps,
                          sensitiveProperties: {
                            token_from:
                              null == G || null === (e = G.sourceTokenInfo) || void 0 === e
                                ? void 0
                                : e.symbol,
                            token_from_amount: null == G ? void 0 : G.value,
                            request_type: null == G ? void 0 : G.balanceError,
                            token_to:
                              null == G || null === (t = G.destinationTokenInfo) || void 0 === t
                                ? void 0
                                : t.symbol,
                            slippage: null == G ? void 0 : G.slippage,
                            custom_slippage: 2 !== (null == G ? void 0 : G.slippage),
                            current_screen: B.match(/\/swaps\/(.+)/u)[1],
                            is_hardware_wallet: Ce,
                            hardware_wallet_type: Se,
                            stx_enabled: fe,
                            current_stx_enabled: me,
                            stx_user_opt_in: pe,
                          },
                          properties: { hd_entropy_index: L },
                        });
                      };
                    }),
                      (0, n.useEffect)(
                        () => (
                          (async () => {
                            await A((0, d.fetchSwapsLivenessAndFeatureFlags)());
                          })(),
                          () => {
                            Re.current();
                          }
                        ),
                        [A]
                      ),
                      (0, n.useEffect)(() => {
                        re && !W && de && I.push(m.SWAPS_ERROR_ROUTE);
                      }, [I, re, W, de]);
                    const Pe = (0, n.useRef)();
                    (0, n.useEffect)(() => {
                      const e = () => (ke.current(), U && A((0, d.prepareToLeaveSwaps)()), null);
                      return (
                        U &&
                          !Pe.current &&
                          ((Pe.current = !0), window.addEventListener('beforeunload', e)),
                        () => window.removeEventListener('beforeunload', e)
                      );
                    }, [A, U]);
                    const Oe = (0, n.useCallback)(() => {
                      var e, t;
                      j({
                        event: 'Error Smart Transactions',
                        category: v.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          token_from:
                            null == G || null === (e = G.sourceTokenInfo) || void 0 === e
                              ? void 0
                              : e.symbol,
                          token_from_amount: null == G ? void 0 : G.value,
                          request_type: null == G ? void 0 : G.balanceError,
                          token_to:
                            null == G || null === (t = G.destinationTokenInfo) || void 0 === t
                              ? void 0
                              : t.symbol,
                          slippage: null == G ? void 0 : G.slippage,
                          custom_slippage: 2 !== (null == G ? void 0 : G.slippage),
                          current_screen: B.match(/\/swaps\/(.+)/u)[1],
                          is_hardware_wallet: Ce,
                          hardware_wallet_type: Se,
                          stx_enabled: fe,
                          current_stx_enabled: me,
                          stx_user_opt_in: pe,
                          stx_error: he,
                        },
                      });
                    }, [
                      he,
                      me,
                      j,
                      null == G ? void 0 : G.balanceError,
                      null == G || null === (a = G.destinationTokenInfo) || void 0 === a
                        ? void 0
                        : a.symbol,
                      null == G ? void 0 : G.slippage,
                      null == G || null === (N = G.sourceTokenInfo) || void 0 === N
                        ? void 0
                        : N.symbol,
                      null == G ? void 0 : G.value,
                      Se,
                      Ce,
                      B,
                      fe,
                      pe,
                    ]);
                    if (
                      ((0, n.useEffect)(() => {
                        he && !z && (H(!0), Oe());
                      }, [he, Oe, z]),
                      !ie)
                    )
                      return n.default.createElement(n.default.Fragment, null);
                    const Me = async () => {
                      ke.current(),
                        I.push({ pathname: m.DEFAULT_ROUTE, state: { stayOnHomePage: !0 } }),
                        A((0, d.clearSwapsState)()),
                        await A((0, g.resetBackgroundSwapsState)());
                    };
                    return n.default.createElement(
                      'div',
                      { className: 'swaps' },
                      n.default.createElement(
                        'div',
                        { className: 'swaps__container' },
                        n.default.createElement(
                          'div',
                          { className: 'swaps__header' },
                          n.default.createElement(
                            T.default,
                            {
                              display: x.DISPLAY.FLEX,
                              justifyContent: x.JustifyContent.center,
                              marginLeft: 4,
                              width: x.FRACTIONS.ONE_TWELFTH,
                              tabIndex: '0',
                              onKeyUp: e => {
                                'Enter' === e.key && Me();
                              },
                            },
                            !F &&
                              !q &&
                              !$ &&
                              n.default.createElement(E.Icon, {
                                name: E.IconName.Arrow2Left,
                                size: E.IconSize.Lg,
                                color: x.IconColor.iconAlternative,
                                onClick: Me,
                                style: { cursor: 'pointer' },
                                title: D('cancel'),
                              })
                          ),
                          n.default.createElement('div', { className: 'swaps__title' }, D('swap')),
                          n.default.createElement(
                            T.default,
                            {
                              display: x.DISPLAY.FLEX,
                              justifyContent: x.JustifyContent.center,
                              marginRight: 4,
                              width: x.FRACTIONS.ONE_TWELFTH,
                              tabIndex: '0',
                              onKeyUp: e => {
                                'Enter' === e.key && A((0, d.setTransactionSettingsOpened)(!0));
                              },
                            },
                            V &&
                              n.default.createElement(E.Icon, {
                                name: E.IconName.Setting,
                                size: E.IconSize.Lg,
                                color: x.IconColor.iconAlternative,
                                onClick: () => {
                                  A((0, d.setTransactionSettingsOpened)(!0));
                                },
                                style: { cursor: 'pointer' },
                                title: D('transactionSettings'),
                              })
                          )
                        ),
                        n.default.createElement(
                          'div',
                          { className: 'swaps__content' },
                          n.default.createElement(
                            o.Switch,
                            null,
                            n.default.createElement(y.default, {
                              redirectRoute: m.SWAPS_MAINTENANCE_ROUTE,
                              flag: oe,
                              path: m.PREPARE_SWAP_ROUTE,
                              exact: !0,
                              render: () =>
                                n.default.createElement(O.default, {
                                  ethBalance: ge,
                                  selectedAccountAddress: be,
                                  shuffledTokensList: ue,
                                }),
                            }),
                            n.default.createElement(o.Route, {
                              path: m.SWAPS_ERROR_ROUTE,
                              exact: !0,
                              render: () =>
                                re
                                  ? n.default.createElement(R.default, {
                                      swapComplete: !1,
                                      errorKey: re,
                                      txHash: null == ve ? void 0 : ve.hash,
                                      txId: null == ve ? void 0 : ve.id,
                                      submittedTime: null == ve ? void 0 : ve.submittedTime,
                                    })
                                  : n.default.createElement(o.Redirect, {
                                      to: { pathname: m.PREPARE_SWAP_ROUTE },
                                    }),
                            }),
                            n.default.createElement(o.Route, {
                              path: m.SWAPS_NOTIFICATION_ROUTE,
                              exact: !0,
                              render: () =>
                                re
                                  ? n.default.createElement(M.default, { notificationKey: re })
                                  : n.default.createElement(o.Redirect, {
                                      to: { pathname: m.PREPARE_SWAP_ROUTE },
                                    }),
                            }),
                            n.default.createElement(y.default, {
                              redirectRoute: m.SWAPS_MAINTENANCE_ROUTE,
                              flag: oe,
                              path: m.LOADING_QUOTES_ROUTE,
                              exact: !0,
                              render: () =>
                                ae
                                  ? n.default.createElement(P.default, {
                                      loadingComplete: !ne && Boolean(Object.values(Z).length),
                                      onDone: async () => {
                                        await A((0, g.setBackgroundSwapRouteState)('')),
                                          re === h.ERROR_FETCHING_QUOTES ||
                                          re === h.QUOTES_NOT_AVAILABLE_ERROR
                                            ? (A(
                                                (0, g.setSwapsErrorKey)(
                                                  h.QUOTES_NOT_AVAILABLE_ERROR
                                                )
                                              ),
                                              I.push(m.SWAPS_ERROR_ROUTE))
                                            : I.push(m.PREPARE_SWAP_ROUTE);
                                      },
                                      aggregatorMetadata: ae,
                                    })
                                  : n.default.createElement(o.Redirect, {
                                      to: { pathname: m.PREPARE_SWAP_ROUTE },
                                    }),
                            }),
                            n.default.createElement(o.Route, {
                              path: m.SWAPS_MAINTENANCE_ROUTE,
                              exact: !0,
                              render: () =>
                                !1 === oe
                                  ? n.default.createElement(R.default, {
                                      errorKey: h.OFFLINE_FOR_MAINTENANCE,
                                    })
                                  : n.default.createElement(o.Redirect, {
                                      to: { pathname: m.PREPARE_SWAP_ROUTE },
                                    }),
                            }),
                            n.default.createElement(o.Route, {
                              path: m.AWAITING_SIGNATURES_ROUTE,
                              exact: !0,
                              render: () => n.default.createElement(C.default, null),
                            }),
                            n.default.createElement(o.Route, {
                              path: m.SMART_TRANSACTION_STATUS_ROUTE,
                              exact: !0,
                              render: () =>
                                n.default.createElement(S.default, {
                                  txId: null == ve ? void 0 : ve.id,
                                }),
                            }),
                            n.default.createElement(o.Route, {
                              path: m.AWAITING_SWAP_ROUTE,
                              exact: !0,
                              render: () =>
                                'awaiting' === X || ve
                                  ? n.default.createElement(R.default, {
                                      swapComplete: we,
                                      txHash: null == ve ? void 0 : ve.hash,
                                      tokensReceived: _e,
                                      txId: null == ve ? void 0 : ve.id,
                                      submittingSwap: 'awaiting' === X && !(te || ee),
                                    })
                                  : n.default.createElement(o.Redirect, {
                                      to: { pathname: m.DEFAULT_ROUTE },
                                    }),
                            })
                          )
                        )
                      )
                    );
                  });
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = D(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = e('lodash'),
                  i = e('@metamask/transaction-controller'),
                  l = e('../../contexts/i18n'),
                  u = e('../../selectors/selectors'),
                  c = e('../../../shared/modules/selectors/networks'),
                  d = e('../../ducks/swaps/swaps'),
                  p = e('../../selectors'),
                  f = e('../../../shared/modules/selectors'),
                  m = e('../../helpers/constants/routes'),
                  h = e('../../../shared/constants/swaps'),
                  g = e('../../store/actions'),
                  b = e('../../hooks/useGasFeeEstimates'),
                  y = N(e('../../helpers/higher-order-components/feature-toggled-route')),
                  v = e('../../../shared/constants/metametrics'),
                  _ = e('../../contexts/metametrics'),
                  w = e('../../../shared/lib/transactions-controller-utils'),
                  E = e('../../components/component-library'),
                  T = N(e('../../components/ui/box')),
                  x = e('../../helpers/constants/design-system'),
                  k = N(e('./hooks/useUpdateSwapsState')),
                  C = N(e('./awaiting-signatures')),
                  S = N(e('./smart-transaction-status')),
                  R = N(e('./awaiting-swap')),
                  P = N(e('./loading-swaps-quotes')),
                  O = N(e('./prepare-swap-page/prepare-swap-page')),
                  M = N(e('./notification-page/notification-page'));
                function N(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function D(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (D = function (e) {
                    return e ? a : t;
                  })(e);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/index.js' },
    ],
    [
      7550,
      {
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/component-library': 6402,
        '../../../components/component-library/text-field-search/deprecated': 6454,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../searchable-item-list/item-list': 7561,
        '../swaps.util': 7583,
        lodash: 4921,
        loglevel: 4929,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = _);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = y(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = b(e('prop-types')),
                  s = e('lodash'),
                  i = b(e('loglevel')),
                  l = b(e('../../../components/ui/box')),
                  u = e('../../../helpers/constants/design-system'),
                  c = e('../../../components/component-library'),
                  d = e('../../../components/component-library/text-field-search/deprecated'),
                  p = b(e('../searchable-item-list/item-list')),
                  f = e('../../../../shared/modules/hexstring-utils'),
                  m = e('../../../contexts/i18n'),
                  h = e('../swaps.util'),
                  g = e('../../../../shared/modules/selectors/networks');
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (y = function (e) {
                    return e ? a : t;
                  })(e);
                }
                let v;
                function _({
                  itemsToSearch: e = [],
                  listTitle: t,
                  maxListItems: a,
                  onClickItem: o,
                  onOpenImportTokenModalClick: b,
                  shouldSearchForImports: y,
                  Placeholder: _,
                  hideRightLabels: w,
                  hideItemIf: E,
                  listContainerClassName: T,
                  searchQuery: x,
                  setSearchQuery: k,
                }) {
                  const C = (0, n.useRef)(),
                    S = (0, n.useContext)(m.I18nContext),
                    [R, P] = (0, n.useState)(e),
                    O = (0, r.useSelector)(g.getCurrentChainId),
                    M = async t => {
                      k(t),
                        v && clearTimeout(v),
                        (v = setTimeout(async () => {
                          v = null;
                          const a = t.trim(),
                            n = a.toUpperCase(),
                            r = a.toLowerCase();
                          if (!a) return void P(e);
                          const o = (0, f.isValidHexAddress)(a);
                          let l = [];
                          if (o) {
                            const t = e.find(e => e.address === r);
                            t && l.push(t);
                          } else
                            l = (0, s.filter)(e, function (e) {
                              return e.symbol.includes(n);
                            });
                          const u = '' === t ? e : l;
                          y && 0 === u.length && o
                            ? await (async e => {
                                try {
                                  const t = await (0, h.fetchToken)(e, O);
                                  if (t)
                                    return (
                                      (t.primaryLabel = t.symbol),
                                      (t.secondaryLabel = t.name),
                                      (t.notImported = !0),
                                      void P([t])
                                    );
                                } catch (e) {
                                  i.default.error('Token not found, show 0 results.', e);
                                }
                                P([]);
                              })(a)
                            : P(u);
                        }, 350));
                    };
                  (0, n.useEffect)(() => {
                    M(x);
                  }, [x, e]);
                  return n.default.createElement(
                    l.default,
                    { className: 'list-with-search', width: u.BlockSize.Full, tabIndex: '0' },
                    n.default.createElement(
                      l.default,
                      {
                        style: { gridColumnStart: 1, gridColumnEnd: 3 },
                        display: u.Display.Flex,
                        flexDirection: u.FlexDirection.Column,
                      },
                      n.default.createElement(d.TextFieldSearch, {
                        id: 'list-with-search__text-search',
                        marginBottom: 4,
                        onChange: e => M(e.target.value),
                        clearButtonOnClick: () => {
                          k('');
                        },
                        value: x,
                        placeholder: S('enterTokenNameOrAddress'),
                        inputProps: { marginRight: 0 },
                        className: 'list-with-search__text-search',
                        autoFocus: !0,
                        tabIndex: '0',
                      })
                    ),
                    (null == R ? void 0 : R.length) > 0 &&
                      n.default.createElement(p.default, {
                        searchQuery: x,
                        results: R,
                        onClickItem: o,
                        onOpenImportTokenModalClick: b,
                        Placeholder: _,
                        listTitle: t,
                        maxListItems: a,
                        containerRef: C,
                        hideRightLabels: w,
                        hideItemIf: E,
                        listContainerClassName: T,
                      }),
                    0 === (null == R ? void 0 : R.length) &&
                      n.default.createElement(
                        l.default,
                        {
                          marginTop: 1,
                          marginBottom: 5,
                          display: u.Display.Flex,
                          justifyContent: u.JustifyContent.center,
                          alignItems: u.AlignItems.center,
                        },
                        n.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.bodyMd, as: 'h6' },
                          S('swapNoTokensAvailable', [x])
                        )
                      )
                  );
                }
                _.propTypes = {
                  itemsToSearch: o.default.array,
                  onClickItem: o.default.func,
                  onOpenImportTokenModalClick: o.default.func,
                  Placeholder: o.default.func,
                  listTitle: o.default.string,
                  maxListItems: o.default.number,
                  hideRightLabels: o.default.bool,
                  shouldSearchForImports: o.default.bool,
                  hideItemIf: o.default.func,
                  listContainerClassName: o.default.string,
                  searchQuery: o.default.string,
                  setSearchQuery: o.default.func,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/list-with-search/list-with-search.js' },
    ],
    [
      7551,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      r.default.Fragment,
                      null,
                      r.default.createElement(
                        'div',
                        {
                          className: 'loading-swaps-quotes__background-1',
                          'data-testid': 'loading-swaps-quotes-background-1',
                        },
                        r.default.createElement(
                          'svg',
                          {
                            width: '193',
                            height: '190',
                            viewBox: '0 0 193 190',
                            fill: 'none',
                            xmlns: 'http://www.w3.org/2000/svg',
                          },
                          r.default.createElement('path', {
                            d: 'M153.753 53.876C153.595 53.9493 153.419 54.0161 153.25 54.0651C151.081 54.7451 148.777 53.538 148.086 51.3768C147.763 50.3298 147.851 49.2109 148.361 48.2363C148.87 47.2618 149.732 46.5374 150.78 46.2144C151.828 45.8913 152.948 45.9781 153.923 46.4865C154.898 46.9949 155.622 47.8557 155.944 48.9027C156.567 50.918 155.592 53.0243 153.753 53.876ZM150.817 47.5708C150.245 47.8359 149.782 48.2721 149.495 48.8334C149.144 49.5127 149.073 50.2843 149.303 51.0047C149.774 52.4998 151.375 53.3384 152.877 52.8787C154.374 52.4069 155.215 50.8063 154.756 49.3056C154.526 48.5852 154.027 47.9888 153.36 47.6334C152.68 47.2836 151.908 47.213 151.187 47.4437C151.049 47.4636 150.927 47.52 150.817 47.5708Z',
                            fill: '#86E29B',
                          }),
                          r.default.createElement('path', {
                            d: 'M18.3624 73.9241C18.3015 73.9523 18.2407 73.9805 18.1798 74.0087C17.0495 74.4733 15.8073 74.4728 14.6751 74.0078C12.3517 73.0461 11.2387 70.3567 12.2031 68.0341C13.1676 65.7115 15.8598 64.5971 18.1833 65.5589C19.3155 66.0239 20.1951 66.9013 20.6591 68.0304C21.123 69.1595 21.1215 70.4008 20.6552 71.5326C20.2207 72.6053 19.4093 73.4391 18.3624 73.9241ZM15.0433 66.7921C14.3129 67.1305 13.713 67.7186 13.3766 68.5243C12.6776 70.207 13.4834 72.1377 15.1666 72.8348C15.9849 73.1647 16.8786 73.1789 17.6933 72.831C18.5136 72.4952 19.1388 71.8659 19.4818 71.0424C19.8126 70.2245 19.8276 69.3313 19.4801 68.5175C19.1448 67.6981 18.5155 67.0739 17.6917 66.7319C16.8144 66.3703 15.8589 66.4142 15.0433 66.7921Z',
                            fill: '#FFB0EB',
                          }),
                          r.default.createElement('path', {
                            d: 'M116.617 37.3839C117.397 37.0226 117.736 36.0982 117.375 35.3192C117.015 34.5402 116.09 34.2016 115.31 34.5629C114.53 34.9243 114.19 35.8487 114.551 36.6277C114.912 37.4067 115.837 37.7453 116.617 37.3839Z',
                            fill: 'url(#paint0_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M55.1317 91.7213C55.9116 91.36 56.2512 90.4356 55.8903 89.6566C55.5294 88.8776 54.6046 88.539 53.8247 88.9003C53.0448 89.2617 52.7052 90.1861 53.0661 90.9651C53.427 91.7441 54.3518 92.0827 55.1317 91.7213Z',
                            fill: 'url(#paint1_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M31.9932 126.235C32.7731 125.874 33.1127 124.95 32.7518 124.171C32.3909 123.392 31.4661 123.053 30.6863 123.414C29.9064 123.776 29.5667 124.7 29.9277 125.479C30.2886 126.258 31.2134 126.597 31.9932 126.235Z',
                            fill: 'url(#paint2_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M119.43 132.589C120.21 132.228 120.55 131.304 120.189 130.525C119.828 129.746 118.903 129.407 118.123 129.768C117.344 130.13 117.004 131.054 117.365 131.833C117.726 132.612 118.651 132.951 119.43 132.589Z',
                            fill: 'url(#paint3_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M44.7469 47.3835C46.0108 46.7979 46.5612 45.2997 45.9763 44.0372C45.3914 42.7747 43.8926 42.2259 42.6286 42.8115C41.3647 43.3971 40.8143 44.8953 41.3992 46.1578C41.9841 47.4203 43.4829 47.9691 44.7469 47.3835Z',
                            fill: 'url(#paint4_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M105.107 90.7857C106.371 90.2001 106.922 88.702 106.337 87.4394C105.752 86.1769 104.253 85.6282 102.989 86.2137C101.725 86.7993 101.175 88.2975 101.76 89.56C102.344 90.8226 103.843 91.3713 105.107 90.7857Z',
                            fill: 'url(#paint5_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M95.5179 172.376C96.7818 171.791 97.3322 170.293 96.7473 169.03C96.1624 167.767 94.6636 167.219 93.3996 167.804C92.1357 168.39 91.5853 169.888 92.1702 171.151C92.7551 172.413 94.2539 172.962 95.5179 172.376Z',
                            fill: 'url(#paint6_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M165.098 102.367C166.362 101.781 166.912 100.283 166.327 99.0205C165.742 97.758 164.244 97.2092 162.98 97.7948C161.716 98.3804 161.165 99.8786 161.75 101.141C162.335 102.404 163.834 102.952 165.098 102.367Z',
                            fill: 'url(#paint7_linear)',
                          }),
                          r.default.createElement(
                            'defs',
                            null,
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint0_linear',
                                x1: '114.554',
                                y1: '36.6326',
                                x2: '117.379',
                                y2: '35.3237',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint1_linear',
                                x1: '53.0688',
                                y1: '90.97',
                                x2: '55.8937',
                                y2: '89.6611',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint2_linear',
                                x1: '29.9283',
                                y1: '125.483',
                                x2: '32.7532',
                                y2: '124.174',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint3_linear',
                                x1: '117.365',
                                y1: '131.837',
                                x2: '120.19',
                                y2: '130.528',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint4_linear',
                                x1: '41.4394',
                                y1: '46.2402',
                                x2: '45.947',
                                y2: '43.9537',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint5_linear',
                                x1: '101.8',
                                y1: '89.6425',
                                x2: '106.307',
                                y2: '87.356',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint6_linear',
                                x1: '92.2104',
                                y1: '171.233',
                                x2: '96.718',
                                y2: '168.947',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint7_linear',
                                x1: '161.79',
                                y1: '101.224',
                                x2: '166.298',
                                y2: '98.937',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                            )
                          )
                        )
                      ),
                      r.default.createElement(
                        'div',
                        {
                          className: 'loading-swaps-quotes__background-2',
                          'data-testid': 'loading-swaps-quotes-background-2',
                        },
                        r.default.createElement(
                          'svg',
                          {
                            width: '195',
                            height: '205',
                            viewBox: '0 0 195 205',
                            fill: 'none',
                            xmlns: 'http://www.w3.org/2000/svg',
                          },
                          r.default.createElement('path', {
                            d: 'M29.84 121.982C30.0408 121.969 30.245 122.01 30.4258 122.106L46.4233 130.275C46.8125 130.478 47.0536 130.893 47.0402 131.324C47.0143 131.768 46.7423 132.148 46.3356 132.308L24.5484 140.937C24.1417 141.097 23.6789 141.005 23.3642 140.702C23.0495 140.4 22.9398 139.937 23.0753 139.525L28.8651 122.727C28.9671 122.426 29.2065 122.169 29.5086 122.056C29.614 122.023 29.7194 121.989 29.84 121.982ZM43.1981 131.148L30.5607 124.689L25.9884 137.96L43.1981 131.148Z',
                            fill: '#75C4FD',
                          }),
                          r.default.createElement('path', {
                            d: 'M168.214 54.3381C168.442 54.3238 168.674 54.3764 168.869 54.485C169.217 54.6781 169.44 55.0266 169.465 55.4145L170.59 68.4358C170.631 68.8763 170.416 69.3061 170.041 69.5444C169.666 69.7827 169.182 69.7862 168.805 69.5681L156.14 62.2246C155.763 62.0065 155.535 61.5911 155.548 61.1472C155.56 60.7033 155.818 60.3112 156.209 60.1122L167.75 54.4343C167.908 54.3841 168.067 54.3473 168.214 54.3381ZM168.027 66.3674L167.248 57.3661L159.267 61.2902L168.027 66.3674Z',
                            fill: '#FFB0EB',
                          }),
                          r.default.createElement('path', {
                            d: 'M88.6283 16.6885C88.8694 16.6734 89.1154 16.7385 89.3255 16.873L100.21 24.1133C100.561 24.3464 100.762 24.7635 100.708 25.1832C100.653 25.6028 100.381 25.969 99.9864 26.1146L86.3391 31.4276C85.9449 31.5731 85.5106 31.5064 85.1842 31.2314C84.8712 30.9556 84.7239 30.5352 84.8192 30.1264L87.5815 17.5731C87.666 17.2053 87.9162 16.9076 88.2702 16.7646C88.3882 16.7169 88.5078 16.696 88.6283 16.6885ZM97.1342 24.7894L89.4471 19.6718L87.5021 28.5349L97.1342 24.7894Z',
                            fill: 'url(#paint0_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M117.145 183.156C116.944 183.289 116.698 183.356 116.449 183.344L103.402 182.517C102.982 182.49 102.6 182.229 102.437 181.839C102.274 181.448 102.327 180.995 102.596 180.671L111.758 169.247C112.027 168.923 112.436 168.764 112.856 168.839C113.265 168.921 113.603 169.212 113.725 169.614L117.609 181.866C117.72 182.227 117.652 182.61 117.417 182.911C117.339 183.011 117.246 183.089 117.145 183.156ZM105.728 180.393L114.944 180.981L112.197 172.333L105.728 180.393Z',
                            fill: 'url(#paint1_linear)',
                          }),
                          r.default.createElement('path', {
                            d: 'M38.0816 74.0208C38.1217 74.0183 38.1485 74.0166 38.1887 74.0141C42.3831 73.805 45.9744 77.0577 46.1831 81.2474C46.3919 85.4371 43.1484 89.0241 38.9407 89.234C34.7463 89.4431 31.1549 86.1904 30.9462 82.0007C30.7391 77.8377 33.9307 74.2809 38.0816 74.0208ZM38.9104 87.2486C41.9767 87.0565 44.3523 84.4236 44.1997 81.3448C44.0455 78.2393 41.3949 75.8407 38.2859 75.9952C35.1761 76.1364 32.7753 78.7977 32.9296 81.9033C33.0838 85.0088 35.7344 87.4073 38.8434 87.2528C38.8568 87.252 38.8836 87.2503 38.9104 87.2486Z',
                            fill: '#86E29B',
                          }),
                          r.default.createElement('path', {
                            d: 'M162.178 97.8401C162.218 97.8376 162.245 97.8359 162.285 97.8334C166.48 97.6243 170.071 100.877 170.28 105.067C170.489 109.256 167.245 112.843 163.037 113.053C158.843 113.262 155.252 110.01 155.043 105.82C154.836 101.657 158.027 98.1002 162.178 97.8401ZM163.007 111.068C166.073 110.876 168.449 108.243 168.296 105.164C168.142 102.059 165.492 99.6601 162.383 99.8146C159.273 99.9557 156.872 102.617 157.026 105.723C157.181 108.828 159.831 111.227 162.94 111.072C162.953 111.071 162.98 111.07 163.007 111.068Z',
                            fill: '#86E29B',
                          }),
                          r.default.createElement(
                            'defs',
                            null,
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint0_linear',
                                x1: '100.609',
                                y1: '23.2611',
                                x2: '84.4152',
                                y2: '24.2757',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#FFE466' }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#FFAFEA' })
                            ),
                            r.default.createElement(
                              'linearGradient',
                              {
                                id: 'paint1_linear',
                                x1: '103.812',
                                y1: '183.939',
                                x2: '116.959',
                                y2: '174.66',
                                gradientUnits: 'userSpaceOnUse',
                              },
                              r.default.createElement('stop', { stopColor: '#75C3FC' }),
                              r.default.createElement('stop', {
                                offset: '0.0928503',
                                stopColor: '#81C2F6',
                              }),
                              r.default.createElement('stop', { offset: '1', stopColor: '#F0B8BD' })
                            )
                          )
                        )
                      )
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/loading-swaps-quotes/background-animation.js' },
    ],
    [
      7552,
      { './loading-swaps-quotes': 7553 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./loading-swaps-quotes')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/loading-swaps-quotes/index.js' },
    ],
    [
      7553,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/selectors': 5874,
        '../../../components/component-library': 6402,
        '../../../components/ui/mascot': 6771,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/build-types': 6897,
        '../../../selectors/selectors': 7611,
        '../swaps-footer': 7580,
        './background-animation': 7551,
        events: 4465,
        lodash: 4921,
        'lodash/isEqual': 4908,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = x);
                var n = T(e('events')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = E(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = e('react-redux'),
                  s = T(e('prop-types')),
                  i = e('lodash'),
                  l = e('react-router-dom'),
                  u = T(e('lodash/isEqual')),
                  c = e('../../../ducks/swaps/swaps'),
                  d = e('../../../selectors/selectors'),
                  p = e('../../../../shared/modules/selectors'),
                  f = e('../../../contexts/i18n'),
                  m = e('../../../contexts/metametrics'),
                  h = T(e('../../../components/ui/mascot')),
                  g = e('../../../../shared/constants/metametrics'),
                  b = T(e('../swaps-footer')),
                  y = e('../../../components/component-library'),
                  v = e('../../../helpers/constants/design-system'),
                  _ = e('../../../helpers/utils/build-types'),
                  w = T(e('./background-animation'));
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (E = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function T(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function x({ aggregatorMetadata: e, loadingComplete: t, onDone: a }) {
                  var s, E;
                  const T = (0, r.useContext)(f.I18nContext),
                    x = (0, r.useContext)(m.MetaMetricsContext),
                    k = (0, o.useDispatch)(),
                    C = (0, o.useSelector)(d.getHDEntropyIndex),
                    S = (0, l.useHistory)(),
                    R = (0, r.useRef)(new n.default()),
                    P = (0, o.useSelector)(c.getFetchParams, u.default),
                    O = (0, o.useSelector)(c.getQuotesFetchStartTime),
                    M = (0, o.useSelector)(d.isHardwareWallet),
                    N = (0, o.useSelector)(d.getHardwareWalletType),
                    D = (0, o.useSelector)(p.getSmartTransactionsOptInStatusForMetrics),
                    I = (0, o.useSelector)(p.getSmartTransactionsEnabled),
                    A = (0, o.useSelector)(c.getCurrentSmartTransactionsEnabled),
                    j = {
                      event: 'Quotes Request Cancelled',
                      category: g.MetaMetricsEventCategory.Swaps,
                      sensitiveProperties: {
                        token_from:
                          null == P || null === (s = P.sourceTokenInfo) || void 0 === s
                            ? void 0
                            : s.symbol,
                        token_from_amount: null == P ? void 0 : P.value,
                        request_type: null == P ? void 0 : P.balanceError,
                        token_to:
                          null == P || null === (E = P.destinationTokenInfo) || void 0 === E
                            ? void 0
                            : E.symbol,
                        slippage: null == P ? void 0 : P.slippage,
                        custom_slippage: 2 !== (null == P ? void 0 : P.slippage),
                        response_time: Date.now() - O,
                        is_hardware_wallet: M,
                        hardware_wallet_type: N,
                        stx_enabled: I,
                        current_stx_enabled: A,
                        stx_user_opt_in: D,
                      },
                      properties: { hd_entropy_index: C },
                    },
                    [L] = (0, r.useState)(() => (0, i.shuffle)(Object.keys(e))),
                    B = L.length,
                    F = (0, r.useRef)(),
                    q = F.current,
                    [W, U] = (0, r.useState)(0),
                    [$, V] = (0, r.useState)(null);
                  return (
                    (0, r.useEffect)(() => {
                      let e;
                      e = t ? 20 : 500 + Math.floor(1500 * Math.random());
                      const n = setTimeout(() => {
                        W < B ? U(W + 1) : W === B && t && a();
                      }, e);
                      return function () {
                        clearTimeout(n);
                      };
                    }, [W, t, a, B]),
                    (0, r.useEffect)(() => {
                      if (q) {
                        const { top: e, left: t, width: a, height: n } = q.getBoundingClientRect();
                        V({ x: t + a / 2, y: e + n / 2 });
                      }
                    }, [q]),
                    r.default.createElement(
                      'div',
                      { className: 'loading-swaps-quotes' },
                      r.default.createElement(
                        'div',
                        { className: 'loading-swaps-quotes__content' },
                        r.default.createElement(
                          r.default.Fragment,
                          null,
                          r.default.createElement(
                            y.Text,
                            {
                              variant: v.TextVariant.bodyXs,
                              'data-testid': 'loading-swaps-quotes-quote-counter',
                              color: v.TextColor.textAlternative,
                              marginTop: 1,
                              display: v.Display.Flex,
                              justifyContent: v.JustifyContent.center,
                              width: v.BlockSize.Full,
                              marginBottom: 1,
                            },
                            r.default.createElement(
                              'span',
                              null,
                              T('swapFetchingQuoteNofN', [Math.min(W + 1, B), B])
                            )
                          ),
                          r.default.createElement(
                            y.Text,
                            {
                              variant: v.TextVariant.headingSm,
                              'data-testid': 'loading-swaps-quotes-quote-name-check',
                              color: v.TextColor.textDefault,
                              display: v.Display.Flex,
                              justifyContent: v.JustifyContent.center,
                              width: v.BlockSize.Full,
                              textTransform: v.TextTransform.Capitalize,
                            },
                            r.default.createElement('span', null, T('swapFetchingQuotes'))
                          ),
                          r.default.createElement(
                            'div',
                            { className: 'loading-swaps-quotes__loading-bar-container' },
                            r.default.createElement('div', {
                              className: 'loading-swaps-quotes__loading-bar',
                              style: { width: (100 / B) * W + '%' },
                            })
                          )
                        ),
                        r.default.createElement(
                          'div',
                          { className: 'loading-swaps-quotes__animation' },
                          r.default.createElement(w.default, null),
                          r.default.createElement(
                            'div',
                            { className: 'loading-swaps-quotes__mascot-container', ref: F },
                            (0, _.isFlask)() || (0, _.isBeta)()
                              ? r.default.createElement('img', {
                                  src: './images/logo/metamask-fox.svg',
                                  width: '90',
                                  height: '90',
                                })
                              : r.default.createElement(h.default, {
                                  animationEventEmitter: R.current,
                                  width: '90',
                                  height: '90',
                                  lookAtTarget: $,
                                })
                          )
                        )
                      ),
                      r.default.createElement(b.default, {
                        submitText: T('back'),
                        onSubmit: async () => {
                          x(j), await k((0, c.navigateBackToPrepareSwap)(S));
                        },
                        hideCancel: !0,
                      })
                    )
                  );
                }
                x.propTypes = {
                  loadingComplete: s.default.bool.isRequired,
                  onDone: s.default.func.isRequired,
                  aggregatorMetadata: s.default.objectOf(
                    s.default.shape({
                      title: s.default.string,
                      color: s.default.string,
                      icon: s.default.string,
                    })
                  ),
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/loading-swaps-quotes/loading-swaps-quotes.js' },
    ],
    [
      7554,
      {
        '../../../components/ui/mascot': 6771,
        '../../../helpers/utils/build-types': 6897,
        events: 4465,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = c);
                var n = u(e('events')),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = l(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = u(e('prop-types')),
                  s = u(e('../../../components/ui/mascot')),
                  i = e('../../../helpers/utils/build-types');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (l = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function c({ height: e, width: t }) {
                  const a = (0, r.useRef)(new n.default());
                  return r.default.createElement(
                    'div',
                    { className: 'mascot-background-animation__animation' },
                    r.default.createElement(
                      'div',
                      {
                        className: 'mascot-background-animation__background-1',
                        'data-testid': 'mascot-background-animation-background-1',
                      },
                      r.default.createElement(
                        'svg',
                        {
                          width: '193',
                          height: '190',
                          viewBox: '0 0 193 190',
                          fill: 'none',
                          xmlns: 'http://www.w3.org/2000/svg',
                        },
                        r.default.createElement('path', {
                          d: 'M153.753 53.876C153.595 53.9493 153.419 54.0161 153.25 54.0651C151.081 54.7451 148.777 53.538 148.086 51.3768C147.763 50.3298 147.851 49.2109 148.361 48.2363C148.87 47.2618 149.732 46.5374 150.78 46.2144C151.828 45.8913 152.948 45.9781 153.923 46.4865C154.898 46.9949 155.622 47.8557 155.944 48.9027C156.567 50.918 155.592 53.0243 153.753 53.876ZM150.817 47.5708C150.245 47.8359 149.782 48.2721 149.495 48.8334C149.144 49.5127 149.073 50.2843 149.303 51.0047C149.774 52.4998 151.375 53.3384 152.877 52.8787C154.374 52.4069 155.215 50.8063 154.756 49.3056C154.526 48.5852 154.027 47.9888 153.36 47.6334C152.68 47.2836 151.908 47.213 151.187 47.4437C151.049 47.4636 150.927 47.52 150.817 47.5708Z',
                          fill: '#86E29B',
                        }),
                        r.default.createElement('path', {
                          d: 'M18.3624 73.9241C18.3015 73.9523 18.2407 73.9805 18.1798 74.0087C17.0495 74.4733 15.8073 74.4728 14.6751 74.0078C12.3517 73.0461 11.2387 70.3567 12.2031 68.0341C13.1676 65.7115 15.8598 64.5971 18.1833 65.5589C19.3155 66.0239 20.1951 66.9013 20.6591 68.0304C21.123 69.1595 21.1215 70.4008 20.6552 71.5326C20.2207 72.6053 19.4093 73.4391 18.3624 73.9241ZM15.0433 66.7921C14.3129 67.1305 13.713 67.7186 13.3766 68.5243C12.6776 70.207 13.4834 72.1377 15.1666 72.8348C15.9849 73.1647 16.8786 73.1789 17.6933 72.831C18.5136 72.4952 19.1388 71.8659 19.4818 71.0424C19.8126 70.2245 19.8276 69.3313 19.4801 68.5175C19.1448 67.6981 18.5155 67.0739 17.6917 66.7319C16.8144 66.3703 15.8589 66.4142 15.0433 66.7921Z',
                          fill: '#FFB0EB',
                        }),
                        r.default.createElement('path', {
                          d: 'M116.617 37.3839C117.397 37.0226 117.736 36.0982 117.375 35.3192C117.015 34.5402 116.09 34.2016 115.31 34.5629C114.53 34.9243 114.19 35.8487 114.551 36.6277C114.912 37.4067 115.837 37.7453 116.617 37.3839Z',
                          fill: 'url(#paint0_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M55.1317 91.7213C55.9116 91.36 56.2512 90.4356 55.8903 89.6566C55.5294 88.8776 54.6046 88.539 53.8247 88.9003C53.0448 89.2617 52.7052 90.1861 53.0661 90.9651C53.427 91.7441 54.3518 92.0827 55.1317 91.7213Z',
                          fill: 'url(#paint1_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M31.9932 126.235C32.7731 125.874 33.1127 124.95 32.7518 124.171C32.3909 123.392 31.4661 123.053 30.6863 123.414C29.9064 123.776 29.5667 124.7 29.9277 125.479C30.2886 126.258 31.2134 126.597 31.9932 126.235Z',
                          fill: 'url(#paint2_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M119.43 132.589C120.21 132.228 120.55 131.304 120.189 130.525C119.828 129.746 118.903 129.407 118.123 129.768C117.344 130.13 117.004 131.054 117.365 131.833C117.726 132.612 118.651 132.951 119.43 132.589Z',
                          fill: 'url(#paint3_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M44.7469 47.3835C46.0108 46.7979 46.5612 45.2997 45.9763 44.0372C45.3914 42.7747 43.8926 42.2259 42.6286 42.8115C41.3647 43.3971 40.8143 44.8953 41.3992 46.1578C41.9841 47.4203 43.4829 47.9691 44.7469 47.3835Z',
                          fill: 'url(#paint4_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M105.107 90.7857C106.371 90.2001 106.922 88.702 106.337 87.4394C105.752 86.1769 104.253 85.6282 102.989 86.2137C101.725 86.7993 101.175 88.2975 101.76 89.56C102.344 90.8226 103.843 91.3713 105.107 90.7857Z',
                          fill: 'url(#paint5_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M95.5179 172.376C96.7818 171.791 97.3322 170.293 96.7473 169.03C96.1624 167.767 94.6636 167.219 93.3996 167.804C92.1357 168.39 91.5853 169.888 92.1702 171.151C92.7551 172.413 94.2539 172.962 95.5179 172.376Z',
                          fill: 'url(#paint6_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M165.098 102.367C166.362 101.781 166.912 100.283 166.327 99.0205C165.742 97.758 164.244 97.2092 162.98 97.7948C161.716 98.3804 161.165 99.8786 161.75 101.141C162.335 102.404 163.834 102.952 165.098 102.367Z',
                          fill: 'url(#paint7_linear)',
                        }),
                        r.default.createElement(
                          'defs',
                          null,
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint0_linear',
                              x1: '114.554',
                              y1: '36.6326',
                              x2: '117.379',
                              y2: '35.3237',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint1_linear',
                              x1: '53.0688',
                              y1: '90.97',
                              x2: '55.8937',
                              y2: '89.6611',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint2_linear',
                              x1: '29.9283',
                              y1: '125.483',
                              x2: '32.7532',
                              y2: '124.174',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint3_linear',
                              x1: '117.365',
                              y1: '131.837',
                              x2: '120.19',
                              y2: '130.528',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint4_linear',
                              x1: '41.4394',
                              y1: '46.2402',
                              x2: '45.947',
                              y2: '43.9537',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint5_linear',
                              x1: '101.8',
                              y1: '89.6425',
                              x2: '106.307',
                              y2: '87.356',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint6_linear',
                              x1: '92.2104',
                              y1: '171.233',
                              x2: '96.718',
                              y2: '168.947',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint7_linear',
                              x1: '161.79',
                              y1: '101.224',
                              x2: '166.298',
                              y2: '98.937',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#75C3FC' })
                          )
                        )
                      )
                    ),
                    r.default.createElement(
                      'div',
                      {
                        className: 'mascot-background-animation__background-2',
                        'data-testid': 'mascot-background-animation-background-2',
                      },
                      r.default.createElement(
                        'svg',
                        {
                          width: '195',
                          height: '205',
                          viewBox: '0 0 195 205',
                          fill: 'none',
                          xmlns: 'http://www.w3.org/2000/svg',
                        },
                        r.default.createElement('path', {
                          d: 'M29.84 121.982C30.0408 121.969 30.245 122.01 30.4258 122.106L46.4233 130.275C46.8125 130.478 47.0536 130.893 47.0402 131.324C47.0143 131.768 46.7423 132.148 46.3356 132.308L24.5484 140.937C24.1417 141.097 23.6789 141.005 23.3642 140.702C23.0495 140.4 22.9398 139.937 23.0753 139.525L28.8651 122.727C28.9671 122.426 29.2065 122.169 29.5086 122.056C29.614 122.023 29.7194 121.989 29.84 121.982ZM43.1981 131.148L30.5607 124.689L25.9884 137.96L43.1981 131.148Z',
                          fill: '#75C4FD',
                        }),
                        r.default.createElement('path', {
                          d: 'M168.214 54.3381C168.442 54.3238 168.674 54.3764 168.869 54.485C169.217 54.6781 169.44 55.0266 169.465 55.4145L170.59 68.4358C170.631 68.8763 170.416 69.3061 170.041 69.5444C169.666 69.7827 169.182 69.7862 168.805 69.5681L156.14 62.2246C155.763 62.0065 155.535 61.5911 155.548 61.1472C155.56 60.7033 155.818 60.3112 156.209 60.1122L167.75 54.4343C167.908 54.3841 168.067 54.3473 168.214 54.3381ZM168.027 66.3674L167.248 57.3661L159.267 61.2902L168.027 66.3674Z',
                          fill: '#FFB0EB',
                        }),
                        r.default.createElement('path', {
                          d: 'M88.6283 16.6885C88.8694 16.6734 89.1154 16.7385 89.3255 16.873L100.21 24.1133C100.561 24.3464 100.762 24.7635 100.708 25.1832C100.653 25.6028 100.381 25.969 99.9864 26.1146L86.3391 31.4276C85.9449 31.5731 85.5106 31.5064 85.1842 31.2314C84.8712 30.9556 84.7239 30.5352 84.8192 30.1264L87.5815 17.5731C87.666 17.2053 87.9162 16.9076 88.2702 16.7646C88.3882 16.7169 88.5078 16.696 88.6283 16.6885ZM97.1342 24.7894L89.4471 19.6718L87.5021 28.5349L97.1342 24.7894Z',
                          fill: 'url(#paint0_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M117.145 183.156C116.944 183.289 116.698 183.356 116.449 183.344L103.402 182.517C102.982 182.49 102.6 182.229 102.437 181.839C102.274 181.448 102.327 180.995 102.596 180.671L111.758 169.247C112.027 168.923 112.436 168.764 112.856 168.839C113.265 168.921 113.603 169.212 113.725 169.614L117.609 181.866C117.72 182.227 117.652 182.61 117.417 182.911C117.339 183.011 117.246 183.089 117.145 183.156ZM105.728 180.393L114.944 180.981L112.197 172.333L105.728 180.393Z',
                          fill: 'url(#paint1_linear)',
                        }),
                        r.default.createElement('path', {
                          d: 'M38.0816 74.0208C38.1217 74.0183 38.1485 74.0166 38.1887 74.0141C42.3831 73.805 45.9744 77.0577 46.1831 81.2474C46.3919 85.4371 43.1484 89.0241 38.9407 89.234C34.7463 89.4431 31.1549 86.1904 30.9462 82.0007C30.7391 77.8377 33.9307 74.2809 38.0816 74.0208ZM38.9104 87.2486C41.9767 87.0565 44.3523 84.4236 44.1997 81.3448C44.0455 78.2393 41.3949 75.8407 38.2859 75.9952C35.1761 76.1364 32.7753 78.7977 32.9296 81.9033C33.0838 85.0088 35.7344 87.4073 38.8434 87.2528C38.8568 87.252 38.8836 87.2503 38.9104 87.2486Z',
                          fill: '#86E29B',
                        }),
                        r.default.createElement('path', {
                          d: 'M162.178 97.8401C162.218 97.8376 162.245 97.8359 162.285 97.8334C166.48 97.6243 170.071 100.877 170.28 105.067C170.489 109.256 167.245 112.843 163.037 113.053C158.843 113.262 155.252 110.01 155.043 105.82C154.836 101.657 158.027 98.1002 162.178 97.8401ZM163.007 111.068C166.073 110.876 168.449 108.243 168.296 105.164C168.142 102.059 165.492 99.6601 162.383 99.8146C159.273 99.9557 156.872 102.617 157.026 105.723C157.181 108.828 159.831 111.227 162.94 111.072C162.953 111.071 162.98 111.07 163.007 111.068Z',
                          fill: '#86E29B',
                        }),
                        r.default.createElement(
                          'defs',
                          null,
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint0_linear',
                              x1: '100.609',
                              y1: '23.2611',
                              x2: '84.4152',
                              y2: '24.2757',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#FFE466' }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#FFAFEA' })
                          ),
                          r.default.createElement(
                            'linearGradient',
                            {
                              id: 'paint1_linear',
                              x1: '103.812',
                              y1: '183.939',
                              x2: '116.959',
                              y2: '174.66',
                              gradientUnits: 'userSpaceOnUse',
                            },
                            r.default.createElement('stop', { stopColor: '#75C3FC' }),
                            r.default.createElement('stop', {
                              offset: '0.0928503',
                              stopColor: '#81C2F6',
                            }),
                            r.default.createElement('stop', { offset: '1', stopColor: '#F0B8BD' })
                          )
                        )
                      )
                    ),
                    r.default.createElement(
                      'div',
                      {
                        className: 'mascot-background-animation__mascot-container',
                        'data-testid': 'mascot-background-animation-mascot-container',
                      },
                      (0, i.isFlask)() || (0, i.isBeta)()
                        ? r.default.createElement('img', {
                            src: './images/logo/metamask-fox.svg',
                            width: t ?? '42',
                            height: e ?? '42',
                          })
                        : r.default.createElement(s.default, {
                            animationEventEmitter: a.current,
                            width: t ?? '42',
                            height: e ?? '42',
                            followMouse: !1,
                          })
                    )
                  );
                }
                c.propTypes = { height: o.default.string, width: o.default.string };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/mascot-background-animation/mascot-background-animation.js',
      },
    ],
    [
      7555,
      {
        '../../../../shared/constants/swaps': 5815,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../store/actions': 7619,
        '../swaps-footer': 7580,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = b);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = g(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = h(e('prop-types')),
                  i = e('../../../contexts/i18n'),
                  l = e('../../../store/actions'),
                  u = h(e('../../../components/ui/box')),
                  c = e('../../../helpers/constants/design-system'),
                  d = e('../../../components/component-library'),
                  p = e('../../../helpers/constants/routes'),
                  f = h(e('../swaps-footer')),
                  m = e('../../../../shared/constants/swaps');
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (g = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function b({ notificationKey: e }) {
                  const t = (0, n.useContext)(i.I18nContext),
                    a = (0, o.useHistory)(),
                    s = (0, r.useDispatch)();
                  let h = '',
                    g = '',
                    b = '';
                  return (
                    e === m.QUOTES_EXPIRED_ERROR &&
                      ((h = t('swapAreYouStillThere')),
                      (g = t('swapAreYouStillThereDescription')),
                      (b = t('swapShowLatestQuotes'))),
                    n.default.createElement(
                      'div',
                      { className: 'notification-page' },
                      n.default.createElement(
                        u.default,
                        {
                          alignItems: c.AlignItems.center,
                          display: c.DISPLAY.FLEX,
                          flexDirection: c.FLEX_DIRECTION.COLUMN,
                          marginTop: 10,
                          marginLeft: 4,
                          marginRight: 4,
                          textAlign: c.TEXT_ALIGN.CENTER,
                          className: 'notification-page__content',
                        },
                        n.default.createElement(
                          u.default,
                          { marginTop: 8, marginBottom: 4 },
                          n.default.createElement(d.Icon, {
                            name: d.IconName.Warning,
                            color: c.IconColor.iconMuted,
                            className: 'notification-page__warning-icon',
                          })
                        ),
                        n.default.createElement(
                          d.Text,
                          { variant: c.TextVariant.bodyLgMedium, as: 'h2' },
                          h
                        ),
                        n.default.createElement(
                          d.Text,
                          { variant: c.TextVariant.bodyMd, as: 'h6' },
                          g
                        )
                      ),
                      n.default.createElement(f.default, {
                        onSubmit: async () => {
                          await s((0, l.setSwapsErrorKey)('')), a.push(p.PREPARE_SWAP_ROUTE);
                        },
                        submitText: b,
                        hideCancel: !0,
                        showTermsOfService: !0,
                      })
                    )
                  );
                }
                b.propTypes = { notificationKey: s.default.oneOf([m.QUOTES_EXPIRED_ERROR]) };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/notification-page/notification-page.js' },
    ],
    [
      7556,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/swaps': 5815,
        '../../../../shared/lib/swaps-utils': 5846,
        '../../../../shared/lib/token-util': 5848,
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/selectors': 5874,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/modules/string-utils': 5878,
        '../../../../shared/modules/swaps.utils': 5879,
        '../../../components/component-library': 6402,
        '../../../components/component-library/modal-content/deprecated': 6412,
        '../../../components/component-library/modal-header/deprecated': 6421,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/bridge/useBridging': 6935,
        '../../../hooks/swap/useSwapDefaultToToken': 6964,
        '../../../hooks/useEqualityCheck': 6978,
        '../../../hooks/useEthFiatAmount': 6979,
        '../../../hooks/usePrevious': 7002,
        '../../../hooks/useTokenFiatAmount': 7014,
        '../../../hooks/useTokenTracker': 7017,
        '../../../hooks/useTokensToSearch': 7018,
        '../../../selectors': 7601,
        '../../../store/actionConstants': 7618,
        '../../../store/actions': 7619,
        '../../confirmations/components/smart-transactions-banner-alert': 7252,
        '../import-token': 7548,
        '../list-with-search/list-with-search': 7550,
        '../selected-token/selected-token': 7570,
        '../swaps-banner-alert/swaps-banner-alert': 7579,
        '../swaps-footer': 7580,
        '../swaps.util': 7583,
        '../transaction-settings/transaction-settings': 7584,
        './quotes-loading-animation': 7557,
        './review-quote': 7558,
        '@metamask/etherscan-link': 1938,
        'bignumber.js': 4030,
        classnames: 4168,
        lodash: 4921,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = oe);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = ae(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = te(e('bignumber.js')),
                  o = te(e('prop-types')),
                  s = e('react-redux'),
                  i = e('lodash'),
                  l = e('react-router-dom'),
                  u = e('@metamask/etherscan-link'),
                  c = te(e('classnames')),
                  d = e('../../../contexts/metametrics'),
                  p = e('../../../hooks/useTokensToSearch'),
                  f = e('../../../hooks/useEqualityCheck'),
                  m = e('../../../contexts/i18n'),
                  h = e('../../../ducks/metamask/metamask'),
                  g = te(e('../../../components/ui/box')),
                  b = e('../../../helpers/constants/design-system'),
                  y = e('../../../ducks/swaps/swaps'),
                  v = e('../../../../shared/modules/selectors/networks'),
                  _ = e('../../../selectors'),
                  w = e('../../../../shared/modules/selectors'),
                  E = e('../../../../shared/modules/conversion.utils'),
                  T = e('../../../helpers/utils/util'),
                  x = e('../../../hooks/usePrevious'),
                  k = e('../../../hooks/useTokenTracker'),
                  C = e('../../../hooks/useTokenFiatAmount'),
                  S = e('../../../hooks/useEthFiatAmount'),
                  R = e('../../../../shared/modules/swaps.utils'),
                  P = e('../../../../shared/constants/metametrics'),
                  O = e('../../../../shared/constants/swaps'),
                  M = e('../../../../shared/constants/common'),
                  N = e('../../../store/actions'),
                  D = e('../../../store/actionConstants'),
                  I = e('../swaps.util'),
                  A = e('../../../../shared/lib/token-util'),
                  j = e('../../../../shared/modules/string-utils'),
                  L = e('../../../../shared/lib/transactions-controller-utils'),
                  B = e('../../../../shared/lib/swaps-utils'),
                  F = e('../../../components/component-library'),
                  q = e('../../../components/component-library/modal-content/deprecated'),
                  W = e('../../../components/component-library/modal-header/deprecated'),
                  U = e('../../../helpers/constants/routes'),
                  $ = te(e('../import-token')),
                  V = te(e('../transaction-settings/transaction-settings')),
                  z = te(e('../swaps-banner-alert/swaps-banner-alert')),
                  H = te(e('../swaps-footer')),
                  G = te(e('../selected-token/selected-token')),
                  Q = te(e('../list-with-search/list-with-search')),
                  X = e('../../../../shared/constants/network'),
                  K = te(e('../../../hooks/bridge/useBridging')),
                  Z = te(e('../../../hooks/swap/useSwapDefaultToToken')),
                  Y = e('../../confirmations/components/smart-transactions-banner-alert'),
                  J = te(e('./quotes-loading-animation')),
                  ee = te(e('./review-quote'));
                function te(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function ae(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (ae = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function ne() {
                  return (
                    (ne = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var a = arguments[t];
                            for (var n in a) ({}).hasOwnProperty.call(a, n) && (e[n] = a[n]);
                          }
                          return e;
                        }),
                    ne.apply(null, arguments)
                  );
                }
                let re;
                function oe({ ethBalance: e, selectedAccountAddress: t, shuffledTokensList: a }) {
                  const o = (0, n.useContext)(m.I18nContext),
                    te = (0, s.useDispatch)(),
                    ae = (0, l.useHistory)(),
                    oe = (0, n.useContext)(d.MetaMetricsContext),
                    { openBridgeExperience: se } = (0, K.default)(),
                    [ie, le] = (0, n.useState)(undefined),
                    [ue, ce] = (0, n.useState)(!1),
                    [de, pe] = (0, n.useState)(),
                    [fe, me] = (0, n.useState)(!1),
                    he = () => me(!1),
                    [ge, be] = (0, n.useState)(!1),
                    ye = () => be(!1),
                    [ve, _e] = (0, n.useState)(!1),
                    [we, Ee] = (0, n.useState)(null),
                    [Te, xe] = (0, n.useState)(''),
                    [ke, Ce] = (0, n.useState)(''),
                    [Se, Re] = (0, n.useState)(0),
                    [Pe, Oe] = (0, n.useState)(!1),
                    [Me, Ne] = (0, n.useState)(!1),
                    [De, Ie] = (0, n.useState)(!0),
                    [Ae, je] = (0, n.useState)(!1),
                    Le = (0, s.useSelector)(_.getIsBridgeEnabled),
                    Be = (0, s.useSelector)(y.getIsFeatureFlagLoaded),
                    Fe = (0, s.useSelector)(y.getBalanceError),
                    qe = (0, s.useSelector)(y.getFetchParams, i.isEqual),
                    { sourceTokenInfo: We = {}, destinationTokenInfo: Ue = {} } =
                      (null == qe ? void 0 : qe.metaData) || {},
                    $e = (0, s.useSelector)(h.getTokens, i.isEqual),
                    Ve = (0, s.useSelector)(y.getTopAssets, i.isEqual),
                    ze = (0, s.useSelector)(y.getFromToken, i.isEqual),
                    He = (0, s.useSelector)(y.getFromTokenInputValue),
                    Ge = (0, s.useSelector)(y.getFromTokenError),
                    Qe = (0, s.useSelector)(y.getMaxSlippage),
                    Xe = (0, s.useSelector)(y.getToToken, i.isEqual) || Ue,
                    Ke = (0, s.useSelector)(_.getSwapsDefaultToken, i.isEqual),
                    Ze = (0, s.useSelector)(v.getCurrentChainId),
                    Ye = (0, s.useSelector)(_.getRpcPrefsForCurrentProvider, s.shallowEqual),
                    Je = (0, s.useSelector)(_.getTokenList, i.isEqual),
                    et = (0, s.useSelector)(y.getQuotes, i.isEqual),
                    tt = (0, s.useSelector)(y.getUsedQuote, i.isEqual),
                    at = (0, s.useSelector)(y.getLatestAddedTokenTo, i.isEqual),
                    nt = Object.keys(et).length,
                    rt = nt > 0 && tt,
                    ot = (0, s.useSelector)(y.getSwapsErrorKey),
                    st = (0, s.useSelector)(y.getAggregatorMetadata, s.shallowEqual),
                    { defaultToToken: it } = (0, Z.default)(),
                    lt = (0, s.useSelector)(y.getTransactionSettingsOpened, s.shallowEqual),
                    ut = st ? Object.keys(st).length : 0,
                    ct = (0, s.useSelector)(_.getIsBridgeChain),
                    dt = (0, s.useSelector)(_.getTokenExchangeRates, i.isEqual),
                    pt = (0, s.useSelector)(h.getConversionRate),
                    ft = (0, s.useSelector)(_.isHardwareWallet),
                    mt = (0, s.useSelector)(_.getHardwareWalletType),
                    ht = (0, s.useSelector)(w.getSmartTransactionsOptInStatusForMetrics),
                    gt = (0, s.useSelector)(w.getSmartTransactionsEnabled),
                    bt = (0, s.useSelector)(y.getCurrentSmartTransactionsEnabled),
                    yt = (0, s.useSelector)(w.getSmartTransactionsPreferenceEnabled) && bt,
                    vt = (0, s.useSelector)(h.getCurrentCurrency),
                    _t = (0, s.useSelector)(y.getFetchingQuotes),
                    wt = !_t && rt,
                    Et = (0, R.isSwapsDefaultTokenAddress)(null == We ? void 0 : We.address, Ze)
                      ? Ke
                      : We,
                    { tokensWithBalances: Tt } = (0, k.useTokenTracker)({ tokens: $e }),
                    xt =
                      !(0, R.isSwapsDefaultTokenAddress)(null == ze ? void 0 : ze.address, Ze) &&
                      null != ze &&
                      ze.balance
                        ? [ze]
                        : [],
                    kt = (0, i.uniqBy)([...Tt, ...$e, ...xt], 'address'),
                    Ct = (0, f.useEqualityCheck)(kt),
                    St = (0, p.getRenderableTokenData)(ze || Et, dt, pt, vt, Ze, Je),
                    Rt = (0, p.useTokensToSearch)({
                      usersTokens: Ct,
                      topTokens: Ve,
                      shuffledTokensList: a,
                      tokenBucketPriority: O.TokenBucketPriority.owned,
                    }),
                    Pt = (0, p.useTokensToSearch)({
                      usersTokens: Ct,
                      topTokens: Ve,
                      shuffledTokensList: a,
                      tokenBucketPriority: O.TokenBucketPriority.top,
                    }),
                    Ot =
                      Rt.find(({ address: e }) =>
                        (0, j.isEqualCaseInsensitive)(e, null == Xe ? void 0 : Xe.address)
                      ) || Xe,
                    Mt =
                      (null == Ot ? void 0 : Ot.address) &&
                      !(0, R.isSwapsDefaultTokenAddress)(null == Ot ? void 0 : Ot.address, Ze),
                    Nt = Number(
                      (null == Ot ? void 0 : Ot.occurances) ||
                        (null == Ot ? void 0 : Ot.occurrences) ||
                        0
                    ),
                    { address: Dt, symbol: It, string: At, decimals: jt, balance: Lt } = St || {},
                    { address: Bt } = Ot || {},
                    Ft = Lt && (0, L.calcTokenAmount)(Lt, jt).toString(10),
                    qt = (0, x.usePrevious)(Ft),
                    Wt = (0, C.useTokenFiatAmount)(Dt, He || 0, It, { showFiat: !0 }, !0),
                    Ut = (0, S.useEthFiatAmount)(He || 0, { showFiat: !0 }, !0),
                    $t = (0, R.isSwapsDefaultTokenAddress)(Dt, Ze) ? Ut : Wt,
                    Vt = (0, n.useCallback)(
                      (e, t) => {
                        te((0, y.setFromTokenInputValue)(e));
                        const a = new r.default(e || 0).gt(t || 0);
                        Fe !== a && te((0, y.setBalanceError)(a)),
                          te(
                            (0, y.setFromTokenError)(
                              ze && (0, I.countDecimals)(e) > ze.decimals ? 'tooManyDecimals' : null
                            )
                          );
                      },
                      [te, ze, Fe]
                    );
                  (0, n.useEffect)(() => {
                    let e;
                    if (!Pe) return void Re(0);
                    e = wt ? 20 : 500 + Math.floor(1500 * Math.random());
                    const t = setTimeout(() => {
                      Se < ut
                        ? Re(Se + 1)
                        : Se === ut &&
                          wt &&
                          (async () => {
                            await te((0, N.setBackgroundSwapRouteState)('')),
                              Oe(!1),
                              (ot !== O.ERROR_FETCHING_QUOTES &&
                                ot !== O.QUOTES_NOT_AVAILABLE_ERROR) ||
                                te((0, N.setSwapsErrorKey)(O.QUOTES_NOT_AVAILABLE_ERROR)),
                              Ie(!0);
                          })();
                    }, e);
                    return function () {
                      clearTimeout(t);
                    };
                  }, [_t, Se, wt, nt, te, ae, ot, ut, Pe]),
                    (0, n.useEffect)(() => {
                      Ie(!0);
                    }, [tt]);
                  const zt = e => {
                      null != e && e.address && !$t && null !== ie
                        ? (0, I.fetchTokenPrice)(e.address).then(e => {
                            null !== e && e !== undefined && le(e);
                          })
                        : le(null),
                        null != e &&
                          e.address &&
                          !Ct.find(t => (0, j.isEqualCaseInsensitive)(t.address, e.address)) &&
                          (0, A.fetchTokenBalance)(e.address, t, global.ethereumProvider).then(
                            t => {
                              if (null != t && t.balance) {
                                const a = t.balance.toString(10),
                                  n = (0, L.calcTokenAmount)(a, e.decimals);
                                te(
                                  (0, y.setSwapsFromToken)({
                                    ...e,
                                    string: n.toString(10),
                                    balance: a,
                                  })
                                );
                              }
                            }
                          ),
                        te((0, y.setSwapsFromToken)(e)),
                        Vt(He, e.string, e.decimals);
                    },
                    Ht =
                      Ze === X.CHAIN_IDS.ZKSYNC_ERA
                        ? (0, u.getAccountLink)(Ot.address, Ze, {
                            blockExplorerUrl: M.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[Ze] ?? null,
                          })
                        : (0, u.getTokenTrackerLink)(Ot.address, Ze, null, null, {
                            blockExplorerUrl: M.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[Ze] ?? null,
                          }),
                    Gt = Ye.blockExplorerUrl
                      ? (M.CHAINID_DEFAULT_BLOCK_EXPLORER_HUMAN_READABLE_URL_MAP[Ze] ??
                        o('etherscan'))
                      : o('etherscan'),
                    { address: Qt } = Xe || {},
                    Xt = (0, n.useCallback)(
                      e => {
                        at &&
                          e.address !== Qt &&
                          te(
                            (0, N.ignoreTokens)({
                              tokensToIgnore: Qt,
                              dontShowLoadingIndicator: !0,
                            })
                          ),
                          te((0, y.setSwapToToken)(e)),
                          ce(!1);
                      },
                      [te, at, Qt]
                    ),
                    Kt = Tt.find(e =>
                      (0, j.isEqualCaseInsensitive)(e.address, null == ze ? void 0 : ze.address)
                    ),
                    Zt = (0, x.usePrevious)(Kt);
                  (0, n.useEffect)(() => {
                    const e = !(0, R.isSwapsDefaultTokenAddress)(
                        null == Kt ? void 0 : Kt.address,
                        Ze
                      ),
                      t = (0, j.isEqualCaseInsensitive)(
                        null == Kt ? void 0 : Kt.address,
                        null == Zt ? void 0 : Zt.address
                      ),
                      a = (null == Kt ? void 0 : Kt.balance) !== (null == Zt ? void 0 : Zt.balance);
                    e &&
                      t &&
                      a &&
                      te(
                        (0, y.setSwapsFromToken)({
                          ...ze,
                          balance: null == Kt ? void 0 : Kt.balance,
                          string: null == Kt ? void 0 : Kt.string,
                        })
                      );
                  }, [te, Kt, Zt, ze, Ze]),
                    (0, n.useEffect)(() => {
                      (0, R.isSwapsDefaultTokenAddress)(null == ze ? void 0 : ze.address, Ze) &&
                        (null == ze ? void 0 : ze.balance) !== (0, E.hexToDecimal)(e) &&
                        te(
                          (0, y.setSwapsFromToken)({
                            ...ze,
                            balance: (0, E.hexToDecimal)(e),
                            string: (0, E.getValueFromWeiHex)({
                              value: e,
                              numberOfDecimals: 4,
                              toDenomination: 'ETH',
                            }),
                          })
                        );
                    }, [te, ze, e, Ze]),
                    (0, n.useEffect)(() => {
                      (null != ze && ze.symbol) ||
                        (null != Et && Et.symbol) ||
                        te((0, y.setSwapsFromToken)(Ke));
                    }, []),
                    (0, n.useEffect)(() => {
                      qt !== Ft && Vt(He, Ft);
                    }, [Vt, qt, He, Ft]);
                  const Yt = (0, n.useCallback)(() => {
                    oe({
                      event: 'Prepare Swap Page Loaded',
                      category: P.MetaMetricsEventCategory.Swaps,
                      sensitiveProperties: {
                        is_hardware_wallet: ft,
                        hardware_wallet_type: mt,
                        stx_enabled: gt,
                        current_stx_enabled: bt,
                        stx_user_opt_in: ht,
                      },
                    });
                  }, [oe, ft, mt, gt, bt, ht]);
                  (0, n.useEffect)(() => {
                    te((0, N.resetSwapsPostFetchState)()),
                      te((0, y.setReviewSwapClickedTimestamp)()),
                      Yt();
                  }, [te, Yt]);
                  const Jt = () =>
                      n.default.createElement(
                        'a',
                        {
                          className: 'prepare-swap-page__token-etherscan-link',
                          key: 'prepare-swap-page-etherscan-link',
                          onClick: () => {
                            oe({
                              event: P.MetaMetricsEventName.ExternalLinkClicked,
                              category: P.MetaMetricsEventCategory.Swaps,
                              properties: {
                                link_type: P.MetaMetricsEventLinkType.TokenTracker,
                                location: 'Swaps Confirmation',
                                url_domain: (0, T.getURLHostName)(Ht),
                              },
                            }),
                              global.platform.openTab({ url: Ht });
                          },
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        },
                        Gt
                      ),
                    ea = `${o('balance')}: ${At || '0'}`,
                    ta = `${o('balance')}: ${(null == Ot ? void 0 : Ot.string) || '0'}`,
                    aa = (0, B.shouldEnableDirectWrapping)(Ze, Dt, Ot.address),
                    na =
                      Ge ||
                      !Be ||
                      !Number(He) ||
                      !(null != Ot && Ot.address) ||
                      !Dt ||
                      Number(Qe) < 0 ||
                      Number(Qe) > O.MAX_ALLOWED_SLIPPAGE ||
                      (Mt && Nt < 2 && !ue);
                  let ra;
                  (0, n.useEffect)(() => {
                    te((0, N.clearSwapsQuotes)()), te((0, N.stopPollingForQuotes)());
                    return (
                      (re = setTimeout(() => {
                        (re = null),
                          na ||
                            (yt &&
                              ((0, N.clearSmartTransactionFees)(),
                              te({ type: D.SET_SMART_TRANSACTIONS_ERROR, payload: null })),
                            (async () => {
                              Oe(!0),
                                await te((0, y.fetchQuotesAndSetQuoteState)(ae, He, Qe, oe, !0));
                            })());
                      }, 1e3)),
                      () => clearTimeout(re)
                    );
                  }, [te, ae, Qe, oe, na, He, Dt, Bt, ht, yt]),
                    (ra =
                      ot && ot === O.QUOTES_NOT_AVAILABLE_ERROR
                        ? o('swapQuotesNotAvailableErrorTitle')
                        : na
                          ? null != Ot && Ot.address && Dt
                            ? o('swapEnterAmount')
                            : o('swapSelectToken')
                          : o('swapFetchingQuotes'));
                  const oa = (0, n.useCallback)(
                      e => (0, j.isEqualCaseInsensitive)(e.address, Dt),
                      [Dt]
                    ),
                    sa = (0, n.useCallback)(
                      e =>
                        (0, j.isEqualCaseInsensitive)(e.address, null == Ot ? void 0 : Ot.address),
                      [null == Ot ? void 0 : Ot.address]
                    ),
                    ia = !ot && !na && rt,
                    la = !ot && !na && !rt,
                    ua = !Ge && Fe && It,
                    ca = ct && !ia && !la && !rt,
                    da = 1 === Nt;
                  (0, n.useEffect)(() => {
                    ot === O.QUOTES_EXPIRED_ERROR && ae.push(U.SWAPS_NOTIFICATION_ROUTE);
                  }, [ot, ae]),
                    (0, n.useEffect)(() => {
                      la && pe('');
                    }, [la]),
                    (0, n.useEffect)(() => {
                      null == ze ||
                        !ze.address ||
                        (null != Ot && Ot.address) ||
                        !it ||
                        te((0, y.setSwapToToken)(it));
                    }, [null == ze ? void 0 : ze.address]);
                  const pa = {
                    onImportTokenCloseClick: () => {
                      _e(!1);
                    },
                    onImportTokenClick: () => {
                      oe({
                        event: 'Token Imported',
                        category: P.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          symbol: null == we ? void 0 : we.symbol,
                          address: null == we ? void 0 : we.address,
                          chain_id: Ze,
                          is_hardware_wallet: ft,
                          hardware_wallet_type: mt,
                          stx_enabled: gt,
                          current_stx_enabled: bt,
                          stx_user_opt_in: ht,
                        },
                      }),
                        null == Xt || Xt(we),
                        Ee(null);
                    },
                    setIsImportTokenModalOpen: _e,
                    tokenForImport: we,
                  };
                  let fa, ma, ha;
                  de &&
                    !na &&
                    ((fa = (0, I.formatSwapsValueForDisplay)(de)),
                    (ma = (0, I.getClassNameForCharLength)(
                      fa,
                      'prepare-swap-page__receive-amount'
                    )));
                  const ga =
                      (null == tt ? void 0 : tt.destinationAmount) &&
                      (0, L.calcTokenAmount)(
                        (null == tt ? void 0 : tt.destinationAmount) || '0',
                        Ot.decimals || 18
                      ),
                    ba = (0, C.useTokenFiatAmount)(
                      Ot.address,
                      ga || 0,
                      Ot.symbol,
                      { showFiat: !0 },
                      !0
                    );
                  He &&
                    (ha = (0, I.getClassNameForCharLength)(
                      He,
                      'prepare-swap-page__from-token-amount'
                    ));
                  const ya = !(0, R.isSwapsDefaultTokenAddress)(Dt, Ze),
                    va = It && (yt || (!yt && ya)) && Lt > 0,
                    _a = !(0, R.isSwapsDefaultTokenAddress)(Ot.address, Ze);
                  return n.default.createElement(
                    'div',
                    { className: 'prepare-swap-page' },
                    n.default.createElement(
                      'div',
                      { className: 'prepare-swap-page__content' },
                      we && ve && n.default.createElement($.default, ne({ isOpen: !0 }, pa)),
                      n.default.createElement(
                        g.default,
                        null,
                        n.default.createElement(Y.SmartTransactionsBannerAlert, {
                          marginType: 'onlyTop',
                        })
                      ),
                      n.default.createElement(
                        F.Modal,
                        {
                          onClose: he,
                          isOpen: fe,
                          isClosedOnOutsideClick: !0,
                          isClosedOnEscapeKey: !0,
                          className: 'mm-modal__custom-scrollbar',
                        },
                        n.default.createElement(F.ModalOverlay, null),
                        n.default.createElement(
                          q.ModalContent,
                          null,
                          n.default.createElement(W.ModalHeader, { onClose: he }, o('swapSwapTo')),
                          n.default.createElement(
                            g.default,
                            {
                              paddingTop: 10,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: 0,
                              display: b.DISPLAY.FLEX,
                            },
                            n.default.createElement(Q.default, {
                              selectedItem: Ot,
                              itemsToSearch: Pt,
                              onClickItem: e => {
                                null == Xt || Xt(e), he();
                              },
                              maxListItems: 30,
                              searchQuery: ke,
                              setSearchQuery: Ce,
                              hideItemIf: oa,
                              shouldSearchForImports: !0,
                              onOpenImportTokenModalClick: e => {
                                Ee(e), _e(!0), he(), Ce('');
                              },
                            })
                          )
                        )
                      ),
                      n.default.createElement(
                        F.Modal,
                        {
                          onClose: ye,
                          isOpen: ge,
                          isClosedOnOutsideClick: !0,
                          isClosedOnEscapeKey: !0,
                          className: 'mm-modal__custom-scrollbar',
                        },
                        n.default.createElement(F.ModalOverlay, null),
                        n.default.createElement(
                          q.ModalContent,
                          null,
                          n.default.createElement(
                            W.ModalHeader,
                            { onClose: ye },
                            o('swapSwapFrom')
                          ),
                          n.default.createElement(
                            g.default,
                            {
                              paddingTop: 10,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: 0,
                              display: b.DISPLAY.FLEX,
                            },
                            n.default.createElement(Q.default, {
                              selectedItem: St,
                              itemsToSearch: Rt,
                              onClickItem: e => {
                                null == zt || zt(e), ye();
                              },
                              maxListItems: 30,
                              searchQuery: Te,
                              setSearchQuery: xe,
                              hideItemIf: sa,
                            })
                          )
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'prepare-swap-page__swap-from-content' },
                        n.default.createElement(
                          g.default,
                          {
                            display: b.DISPLAY.FLEX,
                            justifyContent: b.JustifyContent.spaceBetween,
                            alignItems: b.AlignItems.center,
                            gap: 4,
                          },
                          n.default.createElement(G.default, {
                            onClick: () => be(!0),
                            onClose: ye,
                            selectedToken: St,
                            testId: 'prepare-swap-page-swap-from',
                          }),
                          n.default.createElement(
                            g.default,
                            { display: b.DISPLAY.FLEX, alignItems: b.AlignItems.center },
                            n.default.createElement(F.TextField, {
                              className: (0, c.default)('prepare-swap-page__from-token-amount', {
                                [ha]: ha,
                              }),
                              size: F.TextFieldSize.Sm,
                              placeholder: '0',
                              onChange: e => {
                                e.stopPropagation();
                                const t = '.' === e.target.value ? '0.' : e.target.value;
                                '' === t || /^(\.\d+|\d+(\.\d+)?|\d+\.)$/u.test(t)
                                  ? Vt(t, Ft)
                                  : Vt(He || '', Ft);
                              },
                              value: He,
                              truncate: !1,
                              testId: 'prepare-swap-page-from-token-amount',
                            })
                          )
                        ),
                        n.default.createElement(
                          g.default,
                          {
                            display: b.DISPLAY.FLEX,
                            justifyContent: b.JustifyContent.spaceBetween,
                            alignItems: b.AlignItems.stretch,
                          },
                          n.default.createElement(
                            'div',
                            { className: 'prepare-swap-page__balance-message' },
                            It && ea,
                            va &&
                              n.default.createElement(
                                'div',
                                {
                                  className: 'prepare-swap-page__max-balance',
                                  'data-testid': 'prepare-swap-page-max-balance',
                                  onClick: () => Vt(Ft || '0', Ft),
                                },
                                o('max')
                              )
                          ),
                          He &&
                            $t &&
                            n.default.createElement(
                              g.default,
                              {
                                display: b.DISPLAY.FLEX,
                                justifyContent: b.JustifyContent.flexEnd,
                                alignItems: b.AlignItems.flexEnd,
                              },
                              n.default.createElement(
                                F.Text,
                                {
                                  variant: b.TextVariant.bodySm,
                                  color: b.TextColor.textAlternative,
                                },
                                $t
                              )
                            )
                        ),
                        ua &&
                          n.default.createElement(
                            g.default,
                            { display: b.DISPLAY.FLEX, justifyContent: b.JustifyContent.flexStart },
                            n.default.createElement(
                              F.Text,
                              {
                                variant: b.TextVariant.bodySmBold,
                                color: b.TextColor.textAlternative,
                                marginTop: 0,
                              },
                              o('swapsNotEnoughToken', [It])
                            )
                          ),
                        Ge &&
                          n.default.createElement(
                            g.default,
                            { display: b.DISPLAY.FLEX, justifyContent: b.JustifyContent.flexStart },
                            n.default.createElement(
                              F.Text,
                              {
                                variant: b.TextVariant.bodySmBold,
                                color: b.TextColor.textAlternative,
                                marginTop: 0,
                              },
                              o('swapTooManyDecimalsError', [It, jt])
                            )
                          ),
                        n.default.createElement(
                          g.default,
                          { display: b.DISPLAY.FLEX, justifyContent: b.JustifyContent.center },
                          n.default.createElement(
                            'div',
                            {
                              className: (0, c.default)('prepare-swap-page__switch-tokens', {
                                'prepare-swap-page__switch-tokens--rotate': Me,
                                'prepare-swap-page__switch-tokens--disabled': la,
                              }),
                              'data-testid': 'prepare-swap-page-switch-tokens',
                              onClick: () => {
                                la || (Xt(St), zt(Ot), Ne(!Me));
                              },
                              title: o('swapSwapSwitch'),
                            },
                            n.default.createElement(F.Icon, {
                              name: F.IconName.Arrow2Down,
                              size: F.IconSize.Lg,
                            })
                          )
                        )
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'prepare-swap-page__swap-to-content' },
                        n.default.createElement(
                          g.default,
                          {
                            display: b.DISPLAY.FLEX,
                            justifyContent: b.JustifyContent.spaceBetween,
                            alignItems: b.AlignItems.center,
                          },
                          n.default.createElement(G.default, {
                            onClick: () => me(!0),
                            onClose: he,
                            selectedToken: Ot,
                            testId: 'prepare-swap-page-swap-to',
                          }),
                          n.default.createElement(
                            g.default,
                            {
                              display: b.DISPLAY.FLEX,
                              alignItems: b.AlignItems.center,
                              marginLeft: 2,
                              className: 'prepare-swap-page__receive-amount-container',
                            },
                            n.default.createElement(
                              F.Text,
                              {
                                as: 'h6',
                                'data-testid': 'prepare-swap-page-receive-amount',
                                className: (0, c.default)('prepare-swap-page__receive-amount', {
                                  [ma]: ma,
                                }),
                              },
                              fa
                            )
                          )
                        ),
                        n.default.createElement(
                          g.default,
                          {
                            display: b.DISPLAY.FLEX,
                            justifyContent: b.JustifyContent.spaceBetween,
                            alignItems: b.AlignItems.stretch,
                          },
                          n.default.createElement(
                            'div',
                            { className: 'prepare-swap-page__balance-message' },
                            (null == Ot ? void 0 : Ot.string) && ta
                          ),
                          fa &&
                            ba &&
                            n.default.createElement(
                              g.default,
                              {
                                display: b.DISPLAY.FLEX,
                                justifyContent: b.JustifyContent.flexEnd,
                                alignItems: b.AlignItems.flexEnd,
                              },
                              n.default.createElement(
                                F.Text,
                                {
                                  variant: b.TextVariant.bodySm,
                                  color: b.TextColor.textAlternative,
                                },
                                ba
                              )
                            )
                        ),
                        n.default.createElement(
                          g.default,
                          {
                            display: b.DISPLAY.FLEX,
                            justifyContent: b.JustifyContent.spaceBetween,
                            alignItems: b.AlignItems.stretch,
                          },
                          n.default.createElement(
                            'div',
                            { className: 'prepare-swap-page__balance-message' },
                            Ot &&
                              !(0, i.isEmpty)(Ot) &&
                              _a &&
                              o('swapTokenVerifiedSources', [
                                Nt,
                                n.default.createElement(Jt, { key: 'block-explorer-link' }),
                              ])
                          )
                        )
                      ),
                      ca &&
                        n.default.createElement(
                          F.ButtonLink,
                          {
                            endIconName: Le ? undefined : F.IconName.Export,
                            endIconProps: { size: F.IconSize.Xs },
                            variant: b.TextVariant.bodySm,
                            marginTop: 2,
                            fontWeight: b.FontWeight.Normal,
                            onClick: () => {
                              se('Swaps', St);
                            },
                            target: '_blank',
                            'data-testid': 'prepare-swap-page-cross-chain-swaps-link',
                          },
                          o(Le ? 'crossChainSwapsLinkNative' : 'crossChainSwapsLink')
                        ),
                      !ia &&
                        Mt &&
                        Nt < 2 &&
                        n.default.createElement(
                          g.default,
                          { display: b.DISPLAY.FLEX, marginTop: 2 },
                          n.default.createElement(
                            F.BannerAlert,
                            {
                              severity: da ? b.SEVERITIES.WARNING : b.SEVERITIES.DANGER,
                              title: o(
                                da
                                  ? 'swapTokenVerifiedOn1SourceTitle'
                                  : 'swapTokenAddedManuallyTitle'
                              ),
                              titleProps: { 'data-testid': 'swaps-banner-title' },
                              width: b.BLOCK_SIZES.FULL,
                            },
                            n.default.createElement(
                              g.default,
                              null,
                              n.default.createElement(
                                F.Text,
                                {
                                  variant: b.TextVariant.bodyMd,
                                  as: 'h6',
                                  'data-testid': 'mm-banner-alert-notification-text',
                                },
                                da
                                  ? o('swapTokenVerifiedOn1SourceDescription', [
                                      null == Ot ? void 0 : Ot.symbol,
                                      n.default.createElement(Jt, { key: 'block-explorer-link' }),
                                    ])
                                  : o('swapTokenAddedManuallyDescription', [
                                      n.default.createElement(Jt, { key: 'block-explorer-link' }),
                                    ])
                              ),
                              !ue &&
                                n.default.createElement(
                                  F.ButtonLink,
                                  {
                                    size: F.ButtonLinkSize.Inherit,
                                    textProps: {
                                      variant: b.TextVariant.bodyMd,
                                      alignItems: b.AlignItems.flexStart,
                                    },
                                    onClick: e => {
                                      e.preventDefault(), ce(!0);
                                    },
                                  },
                                  o('swapContinueSwapping')
                                )
                            )
                          )
                        ),
                      Ae &&
                        De &&
                        n.default.createElement(F.BannerAlert, {
                          marginTop: 3,
                          title: o('lowEstimatedReturnTooltipTitle'),
                          severity: F.BannerAlertSeverity.Warning,
                          description: o('lowEstimatedReturnTooltipMessage', [
                            100 * O.SWAPS_QUOTE_MAX_RETURN_DIFFERENCE_PERCENTAGE,
                          ]),
                          textAlign: b.TextAlign.Left,
                          onClose: () => Ie(!1),
                        }),
                      ot &&
                        n.default.createElement(
                          g.default,
                          { display: b.DISPLAY.FLEX, marginTop: 2 },
                          n.default.createElement(z.default, {
                            swapsErrorKey: ot,
                            currentSlippage: Qe,
                          })
                        ),
                      lt &&
                        !aa &&
                        n.default.createElement(V.default, {
                          onSelect: e => {
                            te((0, y.setMaxSlippage)(e));
                          },
                          maxAllowedSlippage: O.MAX_ALLOWED_SLIPPAGE,
                          currentSlippage: Qe,
                          isDirectWrappingEnabled: aa,
                          onModalClose: () => {
                            te((0, y.setTransactionSettingsOpened)(!1));
                          },
                          sourceTokenSymbol: null == ze ? void 0 : ze.symbol,
                          destinationTokenSymbol: null == Xe ? void 0 : Xe.symbol,
                        }),
                      la &&
                        n.default.createElement(J.default, {
                          quoteCount: Se,
                          numberOfAggregators: ut,
                        }),
                      ia &&
                        n.default.createElement(ee.default, {
                          setReceiveToAmount: pe,
                          setIsEstimatedReturnLow: je,
                        })
                    ),
                    !rt &&
                      n.default.createElement(H.default, {
                        submitText: ra,
                        disabled: !0,
                        hideCancel: !0,
                        showTermsOfService: !0,
                      })
                  );
                }
                oe.propTypes = {
                  ethBalance: o.default.string,
                  selectedAccountAddress: o.default.string,
                  shuffledTokensList: o.default.array,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/prepare-swap-page/prepare-swap-page.js' },
    ],
    [
      7557,
      {
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../mascot-background-animation/mascot-background-animation': 7554,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = p);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = d(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = c(e('prop-types')),
                  o = e('../../../contexts/i18n'),
                  s = c(e('../../../components/ui/box')),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../components/component-library'),
                  u = c(e('../mascot-background-animation/mascot-background-animation'));
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (d = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function p(e) {
                  const { quoteCount: t, numberOfAggregators: a } = e,
                    r = (0, n.useContext)(o.I18nContext);
                  return n.default.createElement(
                    s.default,
                    {
                      marginTop: 4,
                      display: i.DISPLAY.FLEX,
                      justifyContent: i.JustifyContent.center,
                      alignItems: i.AlignItems.center,
                      flexDirection: i.FLEX_DIRECTION.COLUMN,
                    },
                    n.default.createElement(
                      s.default,
                      {
                        display: i.DISPLAY.FLEX,
                        justifyContent: i.JustifyContent.center,
                        alignItems: i.AlignItems.center,
                      },
                      n.default.createElement(
                        l.Text,
                        {
                          variant: i.TextVariant.bodyMd,
                          as: 'h6',
                          color: i.TextColor.textAlternative,
                          marginLeft: 1,
                          marginRight: 1,
                        },
                        r('swapFetchingQuote')
                      ),
                      n.default.createElement(
                        l.Text,
                        {
                          variant: i.TextVariant.bodyMdBold,
                          as: 'h6',
                          color: i.TextColor.textAlternative,
                        },
                        r('swapQuoteNofM', [Math.min(t + 1, a), a])
                      )
                    ),
                    n.default.createElement(u.default, null)
                  );
                }
                p.propTypes = {
                  quoteCount: r.default.number.isRequired,
                  numberOfAggregators: r.default.number.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/prepare-swap-page/quotes-loading-animation.js' },
    ],
    [
      7558,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/swaps': 5815,
        '../../../../shared/lib/metamask-controller-utils': 5838,
        '../../../../shared/lib/swaps-utils': 5846,
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../../shared/modules/selectors': 5874,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/modules/string-utils': 5878,
        '../../../../shared/modules/transaction.utils': 5880,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/info-tooltip': 6759,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../helpers/utils/token-util': 6918,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
        '../../../hooks/useAsync': 6969,
        '../../../hooks/useEqualityCheck': 6978,
        '../../../hooks/useEthFiatAmount': 6979,
        '../../../hooks/useGasFeeEstimates': 6982,
        '../../../hooks/usePrevious': 7002,
        '../../../hooks/useTokenTracker': 7017,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../../confirmations/confirm-approve/confirm-approve.util': 7259,
        '../countdown-timer': 7540,
        '../exchange-rate-display': 7544,
        '../select-quote-popover': 7563,
        '../swaps-footer': 7580,
        '../swaps.util': 7583,
        './slippage-notification-modal': 7559,
        './view-quote-price-difference': 7560,
        '@sentry/browser': 3136,
        'bignumber.js': 4030,
        classnames: 4168,
        lodash: 4921,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = ne);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = ee(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = J(e('bignumber.js')),
                  i = e('lodash'),
                  l = J(e('classnames')),
                  u = e('@sentry/browser'),
                  c = J(e('prop-types')),
                  d = J(e('../../../helpers/constants/zendesk-url')),
                  p = e('../../../contexts/i18n'),
                  f = J(e('../select-quote-popover')),
                  m = e('../../../hooks/useEthFiatAmount'),
                  h = e('../../../hooks/useEqualityCheck'),
                  g = e('../../../hooks/usePrevious'),
                  b = e('../../../contexts/metametrics'),
                  y = e('../../../ducks/swaps/swaps'),
                  v = e('../../../../shared/modules/selectors/networks'),
                  _ = e('../../../selectors'),
                  w = e('../../../../shared/modules/selectors'),
                  E = e('../../../ducks/metamask/metamask'),
                  T = e('../../../store/actions'),
                  x = e('../../../helpers/constants/routes'),
                  k = e('../../../../shared/modules/conversion.utils'),
                  C = e('../../confirmations/confirm-approve/confirm-approve.util'),
                  S = e('../swaps.util'),
                  R = e('../../../hooks/useTokenTracker'),
                  P = e('../../../../shared/constants/swaps'),
                  O = e('../../../../shared/constants/gas'),
                  M = J(e('../countdown-timer')),
                  N = J(e('../swaps-footer')),
                  D = J(e('../../../components/ui/box')),
                  I = e('../../../helpers/constants/design-system'),
                  A = e('../../../components/component-library'),
                  j = e('../../../../shared/constants/metametrics'),
                  L = e('../../../../shared/modules/string-utils'),
                  B = e('../../../../shared/modules/transaction.utils'),
                  F = e('../../../../shared/lib/metamask-controller-utils'),
                  q = e('../../../../shared/lib/transactions-controller-utils'),
                  W = e('../../../../app/scripts/lib/util'),
                  U = e('../../../../shared/lib/swaps-utils'),
                  $ = J(e('../exchange-rate-display')),
                  V = J(e('../../../components/ui/info-tooltip')),
                  z = J(e('../../../hooks/ramps/useRamps/useRamps')),
                  H = e('../../../helpers/utils/token-util'),
                  G = e('../../../../shared/modules/hexstring-utils'),
                  Q = e('../../../hooks/useAsync'),
                  X = e('../../../hooks/useGasFeeEstimates'),
                  K = e('../../../selectors/selectors'),
                  Z = J(e('./view-quote-price-difference')),
                  Y = J(e('./slippage-notification-modal'));
                function J(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function ee(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (ee = function (e) {
                    return e ? a : t;
                  })(e);
                }
                let te;
                const ae = n.default.memo(function ({
                  trackAllAvailableQuotesOpened: e,
                  setSelectQuotePopoverShown: t,
                  t: a,
                }) {
                  const r = (0, n.useCallback)(() => {
                    e(), t(!0);
                  }, [e, t]);
                  return n.default.createElement(
                    A.ButtonLink,
                    {
                      key: 'view-all-quotes',
                      'data-testid': 'review-quote-view-all-quotes',
                      onClick: r,
                      size: I.Size.inherit,
                    },
                    a('viewAllQuotes')
                  );
                });
                function ne({ setReceiveToAmount: e, setIsEstimatedReturnLow: t }) {
                  var a, c, J, ee, ne, re, oe, se;
                  const ie = (0, o.useHistory)(),
                    le = (0, r.useDispatch)(),
                    ue = (0, n.useContext)(p.I18nContext),
                    ce = (0, n.useContext)(b.MetaMetricsContext),
                    de = (0, r.useSelector)(K.getHDEntropyIndex),
                    [pe, fe] = (0, n.useState)(!1),
                    [me, he] = (0, n.useState)(!1),
                    [ge] = (0, n.useState)(!1),
                    [be, ye] = (0, n.useState)(null),
                    [ve, _e] = (0, n.useState)(null),
                    [we, Ee] = (0, n.useState)(null),
                    [Te] = (0, n.useState)(Date.now()),
                    { openBuyCryptoInPdapp: xe } = (0, z.default)(),
                    [ke, Ce] = (0, n.useState)(!1),
                    [Se, Re] = (0, n.useState)(!1),
                    Pe = [O.GasRecommendations.high, O.GasRecommendations.medium],
                    Oe = (0, r.useSelector)(y.getBackgroundSwapRouteState),
                    Me = (0, r.useSelector)(y.getQuotes, i.isEqual);
                  (0, n.useEffect)(() => {
                    Object.values(Me).length
                      ? 'awaiting' === Oe && ie.push(x.AWAITING_SWAP_ROUTE)
                      : ie.push(x.PREPARE_SWAP_ROUTE);
                  }, [ie, Me, Oe]);
                  const Ne = (0, r.useSelector)(y.getQuotesLastFetched),
                    De = (0, g.usePrevious)(Ne),
                    Ie = (0, r.useSelector)(y.getUsedSwapsGasPrice),
                    Ae = (0, r.useSelector)(y.getCustomSwapsGas),
                    je = (0, r.useSelector)(_.getTokenExchangeRates, i.isEqual),
                    Le = (0, h.useEqualityCheck)(je),
                    { balance: Be } = (0, r.useSelector)(_.getSelectedAccount, r.shallowEqual),
                    Fe = (0, r.useSelector)(_.conversionRateSelector),
                    qe = (0, r.useSelector)(_.getUSDConversionRate),
                    We = (0, r.useSelector)(E.getCurrentCurrency),
                    Ue = (0, r.useSelector)(E.getTokens, i.isEqual),
                    $e = (0, r.useSelector)(_.checkNetworkAndAccountSupports1559),
                    Ve = (0, r.useSelector)(y.getBalanceError),
                    ze = (0, r.useSelector)(y.getFetchParams, i.isEqual),
                    He = (0, r.useSelector)(y.getApproveTxParams, i.isEqual),
                    Ge = (0, r.useSelector)(y.getTopQuote, i.isEqual),
                    Qe = (0, r.useSelector)(y.getUsedQuote, i.isEqual),
                    Xe =
                      (null == Qe || null === (a = Qe.trade) || void 0 === a ? void 0 : a.value) ??
                      '0x0',
                    Ke = (0, r.useSelector)(_.getSwapsDefaultToken, i.isEqual),
                    Ze = (0, r.useSelector)(v.getCurrentChainId),
                    Ye = (0, r.useSelector)(E.getNativeCurrency),
                    Je = (0, r.useSelector)(y.getReviewSwapClickedTimestamp),
                    et = (0, r.useSelector)(w.getSmartTransactionsOptInStatusForMetrics),
                    tt = (0, r.useSelector)(w.getSmartTransactionsPreferenceEnabled),
                    at = (0, r.useSelector)(w.getSmartTransactionsEnabled),
                    nt = (0, r.useSelector)(y.getSwapsSTXLoading),
                    rt = (0, r.useSelector)(y.getCurrentSmartTransactionsError),
                    ot = (0, r.useSelector)(y.getSmartTransactionsError),
                    st = (0, r.useSelector)(y.getCurrentSmartTransactionsEnabled),
                    it = (0, r.useSelector)(y.getSmartTransactionFees, i.isEqual),
                    lt = (0, r.useSelector)(y.getSwapsNetworkConfig, r.shallowEqual),
                    { gasFeeEstimates: ut } = (0, X.useGasFeeEstimates)(),
                    { estimatedBaseFee: ct = '0' } = ut ?? {},
                    dt = (0, Q.useAsyncResult)(
                      async () =>
                        $e
                          ? await (0, S.getSwap1559GasFeeEstimates)(Qe.trade, He, ct, Ze)
                          : undefined,
                      [Qe.trade, He, ct, Ze, $e]
                    ),
                    pt = null === (c = dt.value) || void 0 === c ? void 0 : c.tradeGasFeeEstimates,
                    ft =
                      null === (J = dt.value) || void 0 === J ? void 0 : J.approveGasFeeEstimates,
                    mt = Qe.trade,
                    { isGasIncludedTrade: ht } = Qe,
                    gt = (0, r.useSelector)(w.getSmartTransactionsPreferenceEnabled) && st,
                    [bt] = (0, n.useState)(() => {
                      const e = Number(null == ze ? void 0 : ze.slippage);
                      return e > 0 && e <= 1
                        ? P.SLIPPAGE_LOW_ERROR
                        : e >= 5 && e <= P.MAX_ALLOWED_SLIPPAGE
                          ? P.SLIPPAGE_HIGH_ERROR
                          : '';
                    }),
                    yt = null == ze ? void 0 : ze.sourceToken,
                    vt = {
                      reg_tx_fee_in_usd: undefined,
                      reg_tx_fee_in_eth: undefined,
                      reg_tx_max_fee_in_usd: undefined,
                      reg_tx_max_fee_in_eth: undefined,
                      stx_fee_in_usd: undefined,
                      stx_fee_in_eth: undefined,
                      stx_max_fee_in_usd: undefined,
                      stx_max_fee_in_eth: undefined,
                    },
                    _t =
                      (null == Qe ? void 0 : Qe.gasEstimateWithRefund) ||
                      `0x${(0, k.decimalToHex)((null == Qe ? void 0 : Qe.averageGas) || 0)}`,
                    wt = (0, U.calculateMaxGasLimit)(
                      null == Qe ? void 0 : Qe.gasEstimate,
                      null == Qe ? void 0 : Qe.gasMultiplier,
                      null == Qe ? void 0 : Qe.maxGas,
                      Ae
                    );
                  let Et = (0, q.calcGasTotal)(wt, (null == pt ? void 0 : pt.maxFeePerGas) || Ie);
                  null !== ve && (Et = (0, k.sumHexes)(Et || '0x0', ve || '0x0'));
                  const { tokensWithBalances: Tt } = (0, R.useTokenTracker)({
                      tokens: Ue,
                      includeFailedTokens: !0,
                    }),
                    xt =
                      yt === Ke.address
                        ? Ke
                        : Tt.find(({ address: e }) => (0, L.isEqualCaseInsensitive)(e, yt)),
                    kt = xt || Qe.sourceTokenInfo,
                    Ct =
                      (null == Tt ? void 0 : Tt.length) &&
                      (0, q.calcTokenAmount)(kt.balance || '0x0', kt.decimals).toFixed(9),
                    St = Tt && xt === undefined,
                    Rt = (0, B.parseStandardTokenTransactionData)(null == He ? void 0 : He.data),
                    Pt = Rt && (0, F.getTokenValueParam)(Rt),
                    Ot =
                      Pt &&
                      (null == kt ? void 0 : kt.decimals) !== undefined &&
                      (0, q.calcTokenAmount)(Pt, kt.decimals).toFixed(9),
                    Mt = null == He ? void 0 : He.gas,
                    Nt = $e ? (null == pt ? void 0 : pt.baseAndPriorityFeePerGas) : Ie,
                    Dt = $e ? (null == ft ? void 0 : ft.baseAndPriorityFeePerGas) : Ie,
                    It = (0, n.useMemo)(
                      () =>
                        (0, S.quotesToRenderableData)({
                          quotes: Me,
                          gasPriceTrade: Nt,
                          gasPriceApprove: Dt,
                          conversionRate: Fe,
                          currentCurrency: We,
                          approveGas: Mt,
                          tokenConversionRates: Le,
                          chainId: Ze,
                          smartTransactionEstimatedGas:
                            at && tt && (null == it ? void 0 : it.tradeTxFees),
                          nativeCurrencySymbol: Ye,
                          multiLayerL1ApprovalFeeTotal: we,
                        }),
                      [
                        Me,
                        Nt,
                        Dt,
                        Fe,
                        We,
                        Mt,
                        Le,
                        Ze,
                        null == it ? void 0 : it.tradeTxFees,
                        Ye,
                        at,
                        tt,
                        we,
                      ]
                    ),
                    At = It.find(e => e.aggId === Qe.aggregator),
                    {
                      destinationTokenDecimals: jt,
                      destinationTokenSymbol: Lt,
                      destinationTokenValue: Bt,
                      sourceTokenDecimals: Ft,
                      sourceTokenSymbol: qt,
                      sourceTokenValue: Wt,
                    } = At;
                  let {
                    feeInFiat: Ut,
                    feeInEth: $t,
                    rawEthFee: Vt,
                    feeInUsd: zt,
                    rawNetworkFees: Ht,
                  } = (0, S.getRenderableNetworkFeesForQuote)({
                    tradeGas: _t,
                    approveGas: Mt,
                    gasPriceTrade: Nt,
                    gasPriceApprove: Dt,
                    currentCurrency: We,
                    conversionRate: Fe,
                    USDConversionRate: qe,
                    tradeValue: Xe,
                    sourceSymbol: qt,
                    sourceAmount: Qe.sourceAmount,
                    chainId: Ze,
                    nativeCurrencySymbol: Ye,
                    multiLayerL1FeeTotal: ve,
                  });
                  (vt.reg_tx_fee_in_usd = Number(zt)), (vt.reg_tx_fee_in_eth = Number(Vt));
                  const Gt = (0, S.getRenderableNetworkFeesForQuote)({
                    tradeGas: wt,
                    approveGas: Mt,
                    gasPriceTrade: Nt,
                    gasPriceApprove: Dt,
                    currentCurrency: We,
                    conversionRate: Fe,
                    USDConversionRate: qe,
                    tradeValue: Xe,
                    sourceSymbol: qt,
                    sourceAmount: Qe.sourceAmount,
                    chainId: Ze,
                    nativeCurrencySymbol: Ye,
                    multiLayerL1FeeTotal: ve,
                  });
                  let { feeInFiat: Qt, feeInEth: Xt, rawEthFee: Kt, feeInUsd: Zt } = Gt;
                  if (
                    ((vt.reg_tx_max_fee_in_usd = Number(Zt)),
                    (vt.reg_tx_max_fee_in_eth = Number(Kt)),
                    gt && null != it && it.tradeTxFees)
                  ) {
                    var Yt, Jt;
                    const e =
                        (null == it ? void 0 : it.tradeTxFees.feeEstimate) +
                        ((null == it || null === (Yt = it.approvalTxFees) || void 0 === Yt
                          ? void 0
                          : Yt.feeEstimate) || 0),
                      t =
                        (null == it ? void 0 : it.tradeTxFees.maxFeeEstimate) +
                        ((null == it || null === (Jt = it.approvalTxFees) || void 0 === Jt
                          ? void 0
                          : Jt.maxFeeEstimate) || 0);
                    ({
                      feeInFiat: Ut,
                      feeInEth: $t,
                      rawEthFee: Vt,
                      feeInUsd: zt,
                      rawNetworkFees: Ht,
                    } = (0, S.getFeeForSmartTransaction)({
                      chainId: Ze,
                      currentCurrency: We,
                      conversionRate: Fe,
                      USDConversionRate: qe,
                      nativeCurrencySymbol: Ye,
                      feeInWeiDec: e,
                    })),
                      (vt.stx_fee_in_usd = Number(zt)),
                      (vt.stx_fee_in_eth = Number(Vt)),
                      (vt.estimated_gas = null == it ? void 0 : it.tradeTxFees.gasLimit),
                      ({
                        feeInFiat: Qt,
                        feeInEth: Xt,
                        rawEthFee: Kt,
                        feeInUsd: Zt,
                      } = (0, S.getFeeForSmartTransaction)({
                        chainId: Ze,
                        currentCurrency: We,
                        conversionRate: Fe,
                        USDConversionRate: qe,
                        nativeCurrencySymbol: Ye,
                        feeInWeiDec: t,
                      })),
                      (vt.stx_max_fee_in_usd = Number(Zt)),
                      (vt.stx_max_fee_in_eth = Number(Kt));
                  }
                  const ea = new s.default(Qe.sourceAmount),
                    ta = new s.default(Qe.trade.value || 0, 10).plus(new s.default(Et, 16)),
                    aa =
                      ((null == Tt ? void 0 : Tt.length) || Ve) &&
                      ea.gt(new s.default(kt.balance || '0x0')),
                    na = ta.gt(new s.default(Be || '0x0')),
                    ra = aa
                      ? (0, q.toPrecisionWithoutTrailingZeros)(
                          (0, q.calcTokenAmount)(ea, kt.decimals).minus(Ct).toString(10),
                          6
                        )
                      : null,
                    oa = na
                      ? (0, q.toPrecisionWithoutTrailingZeros)(
                          ta.minus(Be, 16).div('1000000000000000000', 10).toString(10),
                          6
                        )
                      : null;
                  let sa;
                  gt &&
                    null != ot &&
                    ot.balanceNeededWei &&
                    (sa = (0, k.decWEIToDecETH)(ot.balanceNeededWei - ot.currentBalanceWei));
                  const ia = (0, g.usePrevious)(sa),
                    la = (0, r.useSelector)(y.getDestinationTokenInfo, i.isEqual);
                  (0, n.useEffect)(() => {
                    gt
                      ? aa
                        ? le((0, y.setBalanceError)(!0))
                        : Ve && !aa && le((0, y.setBalanceError)(!1))
                      : aa || na
                        ? le((0, y.setBalanceError)(!0))
                        : !Ve || aa || na || le((0, y.setBalanceError)(!1));
                  }, [aa, na, le, gt, Ve]),
                    (0, n.useEffect)(() => {
                      !be && Ot && ye(Ot);
                    }, [be, Ot]);
                  const ua = (Ve || ra || (!gt && oa) || (gt && sa)) && !ge,
                    ca = (0, r.useSelector)(_.isHardwareWallet),
                    da = (0, r.useSelector)(_.getHardwareWalletType),
                    pa = Object.values(Me).length,
                    fa = (0, n.useRef)(),
                    ma = (0, n.useMemo)(
                      () => ({
                        token_from: qt,
                        token_from_amount: Wt,
                        token_to: Lt,
                        token_to_amount: Bt,
                        request_type: null == ze ? void 0 : ze.balanceError,
                        slippage: null == ze ? void 0 : ze.slippage,
                        custom_slippage: 2 !== (null == ze ? void 0 : ze.slippage),
                        response_time: null == ze ? void 0 : ze.responseTime,
                        best_quote_source: null == Ge ? void 0 : Ge.aggregator,
                        available_quotes: pa,
                        is_hardware_wallet: ca,
                        hardware_wallet_type: da,
                        stx_enabled: at,
                        current_stx_enabled: st,
                        stx_user_opt_in: et,
                      }),
                      [
                        qt,
                        Wt,
                        Lt,
                        Bt,
                        null == ze ? void 0 : ze.balanceError,
                        null == ze ? void 0 : ze.slippage,
                        null == ze ? void 0 : ze.responseTime,
                        null == Ge ? void 0 : Ge.aggregator,
                        pa,
                        ca,
                        da,
                        at,
                        st,
                        et,
                      ]
                    ),
                    ha = () => {
                      ce({
                        event: 'All Available Quotes Opened',
                        category: j.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          ...ma,
                          other_quote_selected:
                            (null == Qe ? void 0 : Qe.aggregator) !==
                            (null == Ge ? void 0 : Ge.aggregator),
                          other_quote_selected_source:
                            (null == Qe ? void 0 : Qe.aggregator) ===
                            (null == Ge ? void 0 : Ge.aggregator)
                              ? null
                              : null == Qe
                                ? void 0
                                : Qe.aggregator,
                        },
                      });
                    },
                    ga = (0, n.useCallback)(() => {
                      ce({
                        event: 'Best Quote Reviewed',
                        category: j.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: { ...ma, network_fees: Ut },
                      });
                    }, [ce, ma, Ut]),
                    ba = (0, n.useCallback)(() => {
                      ce({
                        event: 'Review Quote Component Loaded',
                        category: j.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: { ...ma, response_time: Te - Je },
                      });
                    }, [ce, ma, Te, Je]);
                  (0, n.useEffect)(() => {
                    !fa.current &&
                      [qt, Wt, Lt, Bt, ze, Ge, pa, Ut].every(e => null !== e && e !== undefined) &&
                      ((fa.current = !0), ga());
                  }, [ze, Ge, pa, Ut, Lt, Bt, qt, Wt, ga]),
                    (0, n.useEffect)(() => {
                      if (((gt && ia) || !gt) && Ne === De) return;
                      let e;
                      if (gt && sa) e = sa;
                      else {
                        if (gt || !oa) return;
                        e = oa;
                      }
                      ce({
                        event: j.MetaMetricsEventName.SwapError,
                        category: j.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          ...ma,
                          error_type: j.MetaMetricsEventErrorType.InsufficientGas,
                          additional_balance_needed: e,
                        },
                        properties: { hd_entropy_index: de },
                      });
                    }, [Ne, De, sa, gt, ce, ia, oa, ma, de]);
                  const ya = Qe.fee,
                    va = () => {
                      ce({
                        event: 'Edit Spend Limit Opened',
                        category: j.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          ...ma,
                          custom_spend_limit_set: be === Ot,
                          custom_spend_limit_amount: be === Ot ? null : Ot,
                        },
                      }),
                        le(
                          (0, T.showModal)({
                            name: 'EDIT_APPROVAL_PERMISSION',
                            decimals: kt.decimals,
                            origin: 'MetaMask',
                            setCustomAmount: e => {
                              const t = '' === e ? be : e,
                                a = (0, C.getCustomTxParamsData)(He.data, {
                                  customPermissionAmount: t,
                                  decimals: kt.decimals,
                                });
                              null != t &&
                                t.length &&
                                He.data !== a &&
                                le((0, T.setCustomApproveTxData)(a));
                            },
                            tokenAmount: be,
                            customTokenAmount: be === Ot ? null : Ot,
                            tokenBalance: Ct,
                            tokenSymbol: kt.symbol,
                            requiredMinimum: (0, q.calcTokenAmount)(Qe.sourceAmount, kt.decimals),
                          })
                        );
                    },
                    _a = Boolean(sa || oa),
                    wa = St
                      ? ue('swapTokenBalanceUnavailable', [qt])
                      : ue('swapApproveNeedMoreTokens', [
                          n.default.createElement(
                            'span',
                            { key: 'swapApproveNeedMoreTokens-1' },
                            ra || sa || oa
                          ),
                          ra && qt !== Ke.symbol ? qt : Ke.symbol,
                        ]),
                    Ea =
                      null == Qe || null === (ee = Qe.priceSlippage) || void 0 === ee
                        ? void 0
                        : ee.bucket,
                    Ta = (0, g.usePrevious)(Ea);
                  (0, n.useEffect)(() => {
                    ke &&
                      Ta === O.GasRecommendations.medium &&
                      Ea === O.GasRecommendations.high &&
                      Ce(!1);
                  }, [Ea, ke, Ta]);
                  let xa = null;
                  const ka = (0, m.useEthFiatAmount)(
                      (null == Qe || null === (ne = Qe.priceSlippage) || void 0 === ne
                        ? void 0
                        : ne.sourceAmountInETH) || 0,
                      { showFiat: !0 }
                    ),
                    Ca = (0, m.useEthFiatAmount)(
                      (null == Qe || null === (re = Qe.priceSlippage) || void 0 === re
                        ? void 0
                        : re.destinationAmountInETH) || 0,
                      { showFiat: !0 }
                    ),
                    Sa =
                      !ka ||
                      !Ca ||
                      Boolean(
                        null == Qe || null === (oe = Qe.priceSlippage) || void 0 === oe
                          ? void 0
                          : oe.calculationError
                      );
                  let Ra = 0;
                  null != Qe &&
                    null !== (se = Qe.priceSlippage) &&
                    void 0 !== se &&
                    se.ratio &&
                    (Ra = parseFloat(
                      new s.default(Qe.priceSlippage.ratio, 10)
                        .minus(1, 10)
                        .times(100, 10)
                        .toFixed(2),
                      10
                    ));
                  const Pa = (0, g.usePrevious)(Ra),
                    Oa = !St && !ua && Qe && (Pe.includes(Ea) || Sa);
                  Oa &&
                    (xa = n.default.createElement(Z.default, {
                      usedQuote: Qe,
                      sourceTokenValue: Wt,
                      destinationTokenValue: Bt,
                      priceSlippageFromSource: ka,
                      priceSlippageFromDestination: Ca,
                      priceDifferencePercentage: Ra,
                      priceSlippageUnknownFiatValue: Sa,
                      onAcknowledgementClick: () => {
                        Ce(!0);
                      },
                      acknowledged: ke,
                    }));
                  const Ma = ua || Oa,
                    Na = Boolean(
                      pe ||
                        Ve ||
                        St ||
                        (Oa && !ke) ||
                        ($e && (null == pt ? void 0 : pt.baseAndPriorityFeePerGas) === undefined) ||
                        (!$e && (null === Ie || Ie === undefined)) ||
                        (st && (rt || ot)) ||
                        (st && tt && !(null != it && it.tradeTxFees))
                    );
                  (0, n.useEffect)(() => {
                    Oa && ke && Ne !== De && Ra !== Pa && Ce(!1);
                  }, [ke, De, Ne, Oa, Ra, Pa]),
                    (0, n.useEffect)(() => {
                      if (!gt || aa || ht) te && clearInterval(te);
                      else {
                        const e = {
                          from: mt.from,
                          to: mt.to,
                          value: mt.value,
                          data: mt.data,
                          gas: mt.gas,
                          chainId: Ze,
                        };
                        (te = setInterval(() => {
                          nt ||
                            le(
                              (0, y.fetchSwapsSmartTransactionFees)({
                                unsignedTransaction: e,
                                approveTxParams: He,
                                fallbackOnNotEnoughFunds: !1,
                              })
                            );
                        }, lt.stxGetTransactionsRefreshTime)),
                          le(
                            (0, y.fetchSwapsSmartTransactionFees)({
                              unsignedTransaction: e,
                              approveTxParams: He,
                              fallbackOnNotEnoughFunds: !1,
                            })
                          );
                      }
                      return () => clearInterval(te);
                    }, [
                      le,
                      gt,
                      mt.data,
                      mt.from,
                      mt.value,
                      mt.gas,
                      mt.to,
                      Ze,
                      lt.stxGetTransactionsRefreshTime,
                      aa,
                      ht,
                    ]),
                    (0, n.useEffect)(() => {
                      le((0, T.setSwapsQuotesPollingLimitEnabled)(!0)), Je && ba();
                    }, [le, ba, Je]),
                    (0, n.useEffect)(() => {
                      ((!st && rt && pe) || (gt && !nt && pe)) && fe(!1);
                    }, [st, rt, gt, nt, pe]),
                    (0, n.useEffect)(() => {
                      if (null == Qe || !Qe.multiLayerL1TradeFeeTotal) return;
                      (async () => {
                        try {
                          let e = '0x0';
                          He &&
                            ((e = await le(
                              (0, T.getLayer1GasFee)({
                                transactionParams: {
                                  ...He,
                                  gasPrice: (0, W.addHexPrefix)(He.gasPrice),
                                  value: '0x0',
                                },
                                chainId: Ze,
                              })
                            )),
                            Ee(e));
                          const t = (0, k.sumHexes)(Qe.multiLayerL1TradeFeeTotal, e);
                          _e(t);
                        } catch (e) {
                          (0, u.captureException)(e), _e(null), Ee(null);
                        }
                      })();
                    }, [mt, He, Ze, Qe]);
                  const Da = (0, U.calcTokenValue)(Bt, jt),
                    Ia = (0, q.calcTokenAmount)(Da, jt),
                    Aa = (0, S.formatSwapsValueForDisplay)(Ia),
                    ja = Aa.match(/\d+/gu).join('').length;
                  let La = Aa;
                  ja > 20 && (La = `${Aa.slice(0, 20)}...`),
                    (0, n.useEffect)(() => {
                      e(La);
                    }, [La, e]);
                  const Ba = !He || (Ve && !ge),
                    Fa = n.default.createElement(
                      'span',
                      { key: 'fee-card-approve-symbol', className: 'fee-card__bold' },
                      ue('enableToken', [qt])
                    ),
                    qa = ({ acknowledgedSlippage: e = !1 }) => {
                      !bt || e
                        ? (fe(!0),
                          Ve
                            ? la.symbol === Ke.symbol
                              ? ie.push(x.DEFAULT_ROUTE)
                              : ie.push(`${x.ASSET_ROUTE}/${la.address}`)
                            : gt && null != it && it.tradeTxFees
                              ? le(
                                  (0, y.signAndSendSwapsSmartTransaction)({
                                    unsignedTransaction: mt,
                                    trackEvent: ce,
                                    history: ie,
                                    additionalTrackingParams: vt,
                                  })
                                )
                              : le((0, y.signAndSendTransactions)(ie, ce, vt)))
                        : Re(!0);
                    },
                    Wa = (0, n.useMemo)(() => {
                      var e;
                      if (!ht) return undefined;
                      const t =
                        null == it ||
                        null === (e = it.tradeTxFees) ||
                        void 0 === e ||
                        null === (e = e.fees) ||
                        void 0 === e ||
                        null === (e = e[0]) ||
                        void 0 === e ||
                        null === (e = e.tokenFees) ||
                        void 0 === e
                          ? void 0
                          : e[0];
                      if (!t) return undefined;
                      const {
                          token: { address: a, decimals: n, symbol: r } = {},
                          balanceNeededToken: o,
                        } = t,
                        s = (0, G.toChecksumHexAddress)(a),
                        i = Le[s],
                        l = (0, q.calcTokenAmount)((0, k.hexToDecimal)(o), n).toString(10);
                      return (0, H.getTokenFiatAmount)(i, Fe, We, l, r, !0, !0);
                    }, [ht, it, Le, Fe, We]);
                  return (
                    t((0, y.getIsEstimatedReturnLow)({ usedQuote: Qe, rawNetworkFees: Ht })),
                    n.default.createElement(
                      'div',
                      { className: 'review-quote' },
                      n.default.createElement(
                        'div',
                        { className: 'review-quote__content' },
                        n.default.createElement(Y.default, {
                          isOpen: Se,
                          setSlippageNotificationModalOpened: Re,
                          slippageErrorKey: bt,
                          onSwapSubmit: qa,
                          currentSlippage: null == ze ? void 0 : ze.slippage,
                        }),
                        me &&
                          n.default.createElement(f.default, {
                            quoteDataRows: It,
                            onClose: () => he(!1),
                            onSubmit: e => le((0, y.swapsQuoteSelected)(e)),
                            swapToSymbol: Lt,
                            initialAggId: Qe.aggregator,
                            onQuoteDetailsIsOpened: () => {
                              ce({
                                event: 'Quote Details Opened',
                                category: j.MetaMetricsEventCategory.Swaps,
                                sensitiveProperties: {
                                  ...ma,
                                  other_quote_selected:
                                    (null == Qe ? void 0 : Qe.aggregator) !==
                                    (null == Ge ? void 0 : Ge.aggregator),
                                  other_quote_selected_source:
                                    (null == Qe ? void 0 : Qe.aggregator) ===
                                    (null == Ge ? void 0 : Ge.aggregator)
                                      ? null
                                      : null == Qe
                                        ? void 0
                                        : Qe.aggregator,
                                },
                              });
                            },
                            hideEstimatedGasFee: at && tt,
                          }),
                        Ma &&
                          n.default.createElement(
                            n.default.Fragment,
                            null,
                            xa,
                            (ua || St) &&
                              n.default.createElement(A.BannerAlert, {
                                title: ue('notEnoughBalance'),
                                titleProps: { 'data-testid': 'swaps-banner-title' },
                                severity: I.Severity.Info,
                                description: wa,
                                descriptionProps: {
                                  'data-testid': 'mm-banner-alert-notification-text',
                                },
                                actionButtonLabel: _a ? ue('buyMoreAsset', [Ye]) : undefined,
                                actionButtonOnClick: _a ? () => xe() : undefined,
                                marginTop: 2,
                              })
                          ),
                        n.default.createElement(
                          'div',
                          { className: 'review-quote__countdown-timer-container' },
                          n.default.createElement(M.default, {
                            timeStarted: Ne,
                            warningTime: '0:10',
                            labelKey: 'swapNewQuoteIn',
                          })
                        ),
                        n.default.createElement(
                          D.default,
                          {
                            marginTop: 1,
                            marginBottom: 0,
                            display: I.DISPLAY.FLEX,
                            flexDirection: I.FlexDirection.Column,
                            className: 'review-quote__overview',
                          },
                          n.default.createElement(
                            D.default,
                            {
                              display: I.DISPLAY.FLEX,
                              justifyContent: I.JustifyContent.spaceBetween,
                              alignItems: I.AlignItems.center,
                            },
                            n.default.createElement(
                              A.Text,
                              {
                                variant: I.TextVariant.bodyMd,
                                marginRight: 1,
                                color: I.TextColor.textDefault,
                              },
                              ue('quoteRate'),
                              '*'
                            ),
                            n.default.createElement($.default, {
                              primaryTokenValue: (0, U.calcTokenValue)(Wt, Ft),
                              primaryTokenDecimals: Ft,
                              primaryTokenSymbol: qt,
                              secondaryTokenValue: Da,
                              secondaryTokenDecimals: jt,
                              secondaryTokenSymbol: Lt,
                              boldSymbols: !1,
                              className: 'review-quote__exchange-rate-display',
                              showIconForSwappingTokens: !1,
                            })
                          ),
                          ht &&
                            n.default.createElement(
                              D.default,
                              {
                                display: I.DISPLAY.FLEX,
                                justifyContent: I.JustifyContent.spaceBetween,
                                alignItems: I.AlignItems.stretch,
                              },
                              n.default.createElement(
                                D.default,
                                {
                                  display: I.DISPLAY.FLEX,
                                  alignItems: I.AlignItems.center,
                                  width: I.FRACTIONS.SIX_TWELFTHS,
                                },
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodyMd,
                                    as: 'h6',
                                    color: I.TextColor.textDefault,
                                    marginRight: 1,
                                  },
                                  ue('gasFee')
                                ),
                                n.default.createElement(V.default, {
                                  position: 'left',
                                  contentText: n.default.createElement(
                                    n.default.Fragment,
                                    null,
                                    n.default.createElement(
                                      'p',
                                      { className: 'fee-card__info-tooltip-paragraph' },
                                      ue('swapGasIncludedTooltipExplanation')
                                    ),
                                    n.default.createElement(
                                      A.ButtonLink,
                                      {
                                        key: 'learn-more-about-gas-included-link',
                                        size: A.ButtonLinkSize.Inherit,
                                        href: d.default.SWAPS_GAS_FEES,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                        externalLink: !0,
                                        onClick: () => {
                                          ce({
                                            event: 'Clicked "GasIncluded tooltip: Learn More" Link',
                                            category: j.MetaMetricsEventCategory.Swaps,
                                          });
                                        },
                                      },
                                      ue('swapGasIncludedTooltipExplanationLinkText')
                                    )
                                  ),
                                })
                              ),
                              n.default.createElement(
                                D.default,
                                {
                                  display: I.DISPLAY.FLEX,
                                  justifyContent: I.JustifyContent.flexEnd,
                                  alignItems: I.AlignItems.flexEnd,
                                  width: I.FRACTIONS.SIX_TWELFTHS,
                                },
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodyMd,
                                    as: 'h6',
                                    color: I.TextColor.textDefault,
                                    'data-testid': 'review-quote-gas-fee-in-fiat',
                                    textAlign: I.TEXT_ALIGN.RIGHT,
                                    style: { textDecoration: 'line-through' },
                                    marginRight: 1,
                                  },
                                  Wa
                                ),
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodySm,
                                    as: 'h6',
                                    color: I.TextColor.textDefault,
                                    textAlign: I.TEXT_ALIGN.RIGHT,
                                    fontStyle: I.FontStyle.Italic,
                                  },
                                  ue('included')
                                )
                              )
                            ),
                          !ht &&
                            n.default.createElement(
                              D.default,
                              {
                                display: I.DISPLAY.FLEX,
                                justifyContent: I.JustifyContent.spaceBetween,
                                alignItems: I.AlignItems.stretch,
                              },
                              n.default.createElement(
                                D.default,
                                {
                                  display: I.DISPLAY.FLEX,
                                  alignItems: I.AlignItems.center,
                                  width: I.FRACTIONS.SIX_TWELFTHS,
                                },
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodyMd,
                                    as: 'h6',
                                    color: I.TextColor.textDefault,
                                    marginRight: 1,
                                  },
                                  ue('transactionDetailGasHeading')
                                ),
                                n.default.createElement(V.default, {
                                  position: 'left',
                                  contentText: n.default.createElement(
                                    'p',
                                    { className: 'fee-card__info-tooltip-paragraph' },
                                    ue('swapGasFeesExplanation', [
                                      n.default.createElement(
                                        A.ButtonLink,
                                        {
                                          key: 'learn-more-gas-link',
                                          size: A.ButtonLinkSize.Inherit,
                                          href: d.default.GAS_FEES,
                                          target: '_blank',
                                          rel: 'noopener noreferrer',
                                          externalLink: !0,
                                          onClick: () => {
                                            ce({
                                              event: 'Clicked "Gas Fees: Learn More" Link',
                                              category: j.MetaMetricsEventCategory.Swaps,
                                            });
                                          },
                                        },
                                        ue('swapGasFeesExplanationLinkText')
                                      ),
                                    ])
                                  ),
                                })
                              ),
                              n.default.createElement(
                                D.default,
                                {
                                  display: I.DISPLAY.FLEX,
                                  alignItems: I.AlignItems.flexEnd,
                                  width: I.FRACTIONS.SIX_TWELFTHS,
                                },
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodyMd,
                                    as: 'h6',
                                    color: I.TextColor.textDefault,
                                    width: I.FRACTIONS.EIGHT_TWELFTHS,
                                    textAlign: I.TEXT_ALIGN.RIGHT,
                                    paddingRight: 1,
                                  },
                                  $t
                                ),
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodyMdBold,
                                    as: 'h6',
                                    color: I.TextColor.textDefault,
                                    'data-testid': 'review-quote-gas-fee-in-fiat',
                                    width: I.FRACTIONS.FOUR_TWELFTHS,
                                    textAlign: I.TEXT_ALIGN.RIGHT,
                                  },
                                  ` ${Ut}`
                                )
                              )
                            ),
                          !ht &&
                            (Qt || Xt) &&
                            n.default.createElement(
                              D.default,
                              { display: I.DISPLAY.FLEX },
                              n.default.createElement(D.default, {
                                display: I.DISPLAY.FLEX,
                                width: I.FRACTIONS.SIX_TWELFTHS,
                              }),
                              n.default.createElement(
                                D.default,
                                {
                                  display: I.DISPLAY.FLEX,
                                  justifyContent: I.JustifyContent.flexEnd,
                                  width: I.FRACTIONS.SIX_TWELFTHS,
                                },
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodySm,
                                    color: I.TextColor.textDefault,
                                    width: I.FRACTIONS.EIGHT_TWELFTHS,
                                    paddingRight: 1,
                                    textAlign: I.TEXT_ALIGN.RIGHT,
                                  },
                                  `${ue('maxFee')}: `
                                ),
                                n.default.createElement(
                                  A.Text,
                                  {
                                    variant: I.TextVariant.bodySm,
                                    color: I.TextColor.textDefault,
                                    width: I.FRACTIONS.FOUR_TWELFTHS,
                                    textAlign: I.TEXT_ALIGN.RIGHT,
                                  },
                                  Qt || Xt
                                )
                              )
                            ),
                          !Ba &&
                            n.default.createElement(
                              D.default,
                              {
                                display: I.DISPLAY.FLEX,
                                justifyContent: I.JustifyContent.spaceBetween,
                              },
                              n.default.createElement(
                                A.Text,
                                {
                                  variant: I.TextVariant.bodyMd,
                                  as: 'h6',
                                  color: I.TextColor.textDefault,
                                  marginRight: 1,
                                },
                                ue('swapEnableTokenForSwapping', [Fa])
                              ),
                              n.default.createElement(
                                A.Text,
                                { variant: I.TextVariant.bodyMd },
                                n.default.createElement(
                                  A.ButtonLink,
                                  {
                                    onClick: () => va(),
                                    size: I.Size.inherit,
                                    className: 'review-quote__edit-limit',
                                  },
                                  ue('swapEditLimit')
                                )
                              )
                            ),
                          ht &&
                            n.default.createElement(
                              D.default,
                              {
                                display: I.DISPLAY.FLEX,
                                marginTop: 3,
                                justifyContent: I.JustifyContent.center,
                                alignItems: I.AlignItems.center,
                                flexDirection: I.FlexDirection.Column,
                              },
                              n.default.createElement(
                                A.Text,
                                {
                                  variant: I.TextVariant.bodySm,
                                  color: I.TextColor.textAlternative,
                                },
                                '* ',
                                ue('swapIncludesGasAndMetaMaskFee', [ya])
                              ),
                              n.default.createElement(
                                A.Text,
                                { variant: I.TextVariant.bodySm, color: I.TextColor.textDefault },
                                n.default.createElement(ae, {
                                  trackAllAvailableQuotesOpened: ha,
                                  setSelectQuotePopoverShown: he,
                                  t: ue,
                                })
                              )
                            ),
                          !ht &&
                            n.default.createElement(
                              D.default,
                              {
                                display: I.DISPLAY.FLEX,
                                marginTop: 3,
                                justifyContent: I.JustifyContent.center,
                                alignItems: I.AlignItems.center,
                              },
                              n.default.createElement(
                                A.Text,
                                {
                                  variant: I.TextVariant.bodySm,
                                  color: I.TextColor.textAlternative,
                                },
                                '*',
                                ue('swapIncludesMetaMaskFeeViewAllQuotes', [
                                  ya,
                                  n.default.createElement(ae, {
                                    key: 'view-all-quotes',
                                    trackAllAvailableQuotesOpened: ha,
                                    setSelectQuotePopoverShown: he,
                                    t: ue,
                                  }),
                                ])
                              )
                            )
                        )
                      ),
                      n.default.createElement(N.default, {
                        onSubmit: qa,
                        submitText: ue(gt && nt ? 'preparingSwap' : 'swap'),
                        hideCancel: !0,
                        disabled: Na,
                        className: (0, l.default)('review-quote__footer', {
                          'review-quote__thin-swaps-footer': Ma,
                        }),
                        showTopBorder: !0,
                        showTermsOfService: !0,
                      })
                    )
                  );
                }
                (ae.propTypes = {
                  trackAllAvailableQuotesOpened: c.default.func.isRequired,
                  setSelectQuotePopoverShown: c.default.func.isRequired,
                  t: c.default.func.isRequired,
                }),
                  (ne.propTypes = {
                    setReceiveToAmount: c.default.func.isRequired,
                    setIsEstimatedReturnLow: c.default.func.isRequired,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/prepare-swap-page/review-quote.js' },
    ],
    [
      7559,
      {
        '../../../../shared/constants/swaps': 5815,
        '../../../components/component-library': 6402,
        '../../../components/component-library/modal-content/deprecated': 6412,
        '../../../components/component-library/modal-header/deprecated': 6421,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../swaps-banner-alert/swaps-banner-alert': 7579,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function ({
                    isOpen: e,
                    slippageErrorKey: t,
                    setSlippageNotificationModalOpened: a,
                    onSwapSubmit: n,
                    currentSlippage: p,
                  }) {
                    const f = (0, r.useContext)(o.I18nContext),
                      [m, h] = (0, r.useState)(!1),
                      g = f(m ? 'preparingSwap' : 'swapAnyway');
                    return r.default.createElement(
                      i.Modal,
                      {
                        onClose: () => a(!1),
                        isOpen: e,
                        isClosedOnOutsideClick: !0,
                        isClosedOnEscapeKey: !0,
                        className: 'mm-modal__custom-scrollbar',
                      },
                      r.default.createElement(i.ModalOverlay, null),
                      r.default.createElement(
                        l.ModalContent,
                        null,
                        r.default.createElement(
                          u.ModalHeader,
                          { onClose: () => a(!1) },
                          t === c.SLIPPAGE_HIGH_ERROR
                            ? f('swapHighSlippage')
                            : t === c.SLIPPAGE_LOW_ERROR
                              ? f('swapLowSlippage')
                              : ''
                        ),
                        r.default.createElement(
                          i.Box,
                          {
                            display: s.Display.Flex,
                            flexDirection: s.FlexDirection.Column,
                            justifyContent: s.JustifyContent.spaceBetween,
                            alignItems: s.AlignItems.stretch,
                            className: 'high-slippage__content',
                            marginTop: 7,
                          },
                          r.default.createElement(d.default, {
                            swapsErrorKey: t,
                            showTransactionSettingsLink: !0,
                            currentSlippage: p,
                          }),
                          r.default.createElement(
                            i.Box,
                            { marginTop: 5 },
                            r.default.createElement(
                              i.ButtonPrimary,
                              {
                                onClick: () => {
                                  h(!0), n({ acknowledgedSlippage: !0 });
                                },
                                block: !0,
                                'data-testid': 'high-slippage-continue-anyway',
                                disabled: m,
                              },
                              g
                            )
                          )
                        )
                      )
                    );
                  });
                var n,
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = p(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = e('../../../contexts/i18n'),
                  s = e('../../../helpers/constants/design-system'),
                  i = e('../../../components/component-library'),
                  l = e('../../../components/component-library/modal-content/deprecated'),
                  u = e('../../../components/component-library/modal-header/deprecated'),
                  c = e('../../../../shared/constants/swaps'),
                  d =
                    (n = e('../swaps-banner-alert/swaps-banner-alert')) && n.__esModule
                      ? n
                      : { default: n };
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (p = function (e) {
                    return e ? a : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/prepare-swap-page/slippage-notification-modal.tsx',
      },
    ],
    [
      7560,
      {
        '../../../../shared/constants/gas': 5795,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = p);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = d(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = c(e('prop-types')),
                  o = e('../../../contexts/i18n'),
                  s = c(e('../../../components/ui/box')),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../../shared/constants/gas'),
                  u = e('../../../components/component-library');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (d = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function p(e) {
                  const {
                      usedQuote: t,
                      sourceTokenValue: a,
                      destinationTokenValue: r,
                      onAcknowledgementClick: c,
                      acknowledged: d,
                      priceSlippageFromSource: p,
                      priceSlippageFromDestination: f,
                      priceDifferencePercentage: m,
                      priceSlippageUnknownFiatValue: h,
                    } = e,
                    g = (0, n.useContext)(o.I18nContext);
                  let b = g('swapPriceUnavailableTitle'),
                    y = g('swapPriceUnavailableDescription'),
                    v = l.GasRecommendations.high;
                  h ||
                    ((b = g('swapPriceDifferenceTitle', [m])),
                    (y = g('swapPriceDifference', [
                      a,
                      t.sourceTokenInfo.symbol,
                      p,
                      r,
                      t.destinationTokenInfo.symbol,
                      f,
                    ])),
                    (v = t.priceSlippage.bucket));
                  const _ =
                    v === l.GasRecommendations.high ? i.SEVERITIES.DANGER : i.SEVERITIES.WARNING;
                  return n.default.createElement(
                    s.default,
                    { display: i.DISPLAY.FLEX, marginTop: 2 },
                    n.default.createElement(
                      u.BannerAlert,
                      {
                        title: b,
                        titleProps: { 'data-testid': 'swaps-banner-title' },
                        severity: _,
                        width: i.BLOCK_SIZES.FULL,
                        'data-testid': 'mm-banner-alert',
                      },
                      n.default.createElement(
                        s.default,
                        null,
                        n.default.createElement(
                          u.Text,
                          {
                            variant: i.TextVariant.bodyMd,
                            as: 'h6',
                            'data-testid': 'mm-banner-alert-notification-text',
                          },
                          y
                        ),
                        !d &&
                          n.default.createElement(
                            u.ButtonLink,
                            {
                              size: u.ButtonLinkSize.Inherit,
                              textProps: {
                                variant: i.TextVariant.bodyMd,
                                alignItems: i.AlignItems.flexStart,
                              },
                              onClick: c,
                            },
                            g('swapAnyway')
                          )
                      )
                    )
                  );
                }
                p.propTypes = {
                  usedQuote: r.default.object,
                  sourceTokenValue: r.default.string,
                  destinationTokenValue: r.default.string,
                  onAcknowledgementClick: r.default.func,
                  acknowledged: r.default.bool,
                  priceSlippageFromSource: r.default.string,
                  priceSlippageFromDestination: r.default.string,
                  priceDifferencePercentage: r.default.number,
                  priceSlippageUnknownFiatValue: r.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/prepare-swap-page/view-quote-price-difference.js',
      },
    ],
    [
      7561,
      { './item-list.component': 7562 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./item-list.component')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/searchable-item-list/item-list/index.js' },
    ],
    [
      7562,
      {
        '../../../../../shared/constants/common': 5791,
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../components/ui/actionable-message/actionable-message': 6698,
        '../../../../components/ui/button': 6707,
        '../../../../components/ui/identicon': 6758,
        '../../../../components/ui/url-icon': 6827,
        '../../../../contexts/i18n': 6832,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/utils/util': 6921,
        '../../../../selectors': 7601,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = _);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = v(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = y(e('prop-types')),
                  s = y(e('classnames')),
                  i = y(e('../../../../components/ui/identicon')),
                  l = y(e('../../../../components/ui/url-icon')),
                  u = y(e('../../../../components/ui/button')),
                  c = y(e('../../../../components/ui/actionable-message/actionable-message')),
                  d = e('../../../../contexts/i18n'),
                  p = e('../../../../../shared/modules/selectors/networks'),
                  f = e('../../../../selectors'),
                  m = e('../../../../../shared/constants/metametrics'),
                  h = e('../../../../../shared/constants/common'),
                  g = e('../../../../helpers/utils/util'),
                  b = e('../../../../contexts/metametrics');
                function y(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (v = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function _({
                  results: e = [],
                  onClickItem: t,
                  onOpenImportTokenModalClick: a,
                  Placeholder: o,
                  listTitle: y,
                  maxListItems: v = 6,
                  searchQuery: _ = '',
                  containerRef: w,
                  hideRightLabels: E,
                  hideItemIf: T,
                  listContainerClassName: x,
                }) {
                  const k = (0, n.useContext)(d.I18nContext),
                    C = (0, r.useSelector)(p.getCurrentChainId),
                    S =
                      (0, r.useSelector)(f.getRpcPrefsForCurrentProvider).blockExplorerUrl ??
                      h.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[C] ??
                      null,
                    R = (0, r.useSelector)(f.getUseCurrencyRateCheck),
                    P = (0, g.getURLHostName)(S),
                    O = (0, n.useContext)(b.MetaMetricsContext),
                    M = 1 === e.length && e[0].notImported,
                    N = o ? n.default.createElement(o, { searchQuery: _ }) : null;
                  return 0 === e.length
                    ? N
                    : n.default.createElement(
                        'div',
                        { className: 'searchable-item-list' },
                        y
                          ? n.default.createElement(
                              'div',
                              { className: 'searchable-item-list__title' },
                              y
                            )
                          : null,
                        n.default.createElement(
                          'div',
                          {
                            className: (0, s.default)('searchable-item-list__list-container', x),
                            ref: w,
                            'data-testid': 'searchable-item-list-list-container',
                          },
                          e.slice(0, v).map((e, r) => {
                            if (null != T && T(e)) return null;
                            const o = e.balance > 0;
                            if (e.blocked && !o && !_) return null;
                            const c = () => {
                                e.blocked || (e.notImported ? a(e) : null == t || t(e));
                              },
                              {
                                iconUrl: d,
                                identiconAddress: p,
                                selected: f,
                                blocked: m,
                                primaryLabel: h,
                                secondaryLabel: g,
                                rightPrimaryLabel: b,
                                rightSecondaryLabel: y,
                                IconComponent: v,
                              } = e;
                            return n.default.createElement(
                              'div',
                              {
                                tabIndex: '0',
                                className: (0, s.default)('searchable-item-list__item', {
                                  'searchable-item-list__item--selected': f,
                                  'searchable-item-list__item--disabled': m,
                                }),
                                'data-testid': 'searchable-item-list__item',
                                onClick: c,
                                onKeyUp: e => 'Enter' === e.key && c(),
                                key: `searchable-item-list-item-${r}`,
                                title: m ? k('swapTokenNotAvailable') : null,
                              },
                              d || h
                                ? n.default.createElement(l.default, { url: d, name: h })
                                : null,
                              d || h || !p
                                ? null
                                : n.default.createElement(
                                    'div',
                                    { className: 'searchable-item-list__identicon' },
                                    n.default.createElement(i.default, { address: p, diameter: 24 })
                                  ),
                              v ? n.default.createElement(v, null) : null,
                              n.default.createElement(
                                'div',
                                { className: 'searchable-item-list__labels' },
                                n.default.createElement(
                                  'div',
                                  { className: 'searchable-item-list__item-labels' },
                                  h
                                    ? n.default.createElement(
                                        'span',
                                        {
                                          className: 'searchable-item-list__primary-label',
                                          'data-testid': 'searchable-item-list-primary-label',
                                        },
                                        h
                                      )
                                    : null,
                                  g
                                    ? n.default.createElement(
                                        'span',
                                        { className: 'searchable-item-list__secondary-label' },
                                        g
                                      )
                                    : null
                                ),
                                E || (!b && !y)
                                  ? null
                                  : n.default.createElement(
                                      'div',
                                      { className: 'searchable-item-list__right-labels' },
                                      b
                                        ? n.default.createElement(
                                            'span',
                                            {
                                              className:
                                                'searchable-item-list__right-primary-label',
                                            },
                                            b
                                          )
                                        : null,
                                      y && R
                                        ? n.default.createElement(
                                            'span',
                                            {
                                              className:
                                                'searchable-item-list__right-secondary-label',
                                            },
                                            y
                                          )
                                        : null
                                    )
                              ),
                              e.notImported &&
                                n.default.createElement(
                                  u.default,
                                  {
                                    type: 'primary',
                                    onClick: c,
                                    'data-testid': 'searchable-item-list-import-button',
                                  },
                                  k('import')
                                )
                            );
                          }),
                          !M &&
                            S &&
                            n.default.createElement(
                              'div',
                              {
                                tabIndex: '0',
                                className:
                                  'searchable-item-list__item searchable-item-list__item--add-token',
                                key: 'searchable-item-list-item-last',
                              },
                              n.default.createElement(c.default, {
                                message: k('addTokenByContractAddress', [
                                  n.default.createElement(
                                    'a',
                                    {
                                      key: 'searchable-item-list__etherscan-link',
                                      onClick: () => {
                                        O({
                                          event: 'Clicked Block Explorer Link',
                                          category: m.MetaMetricsEventCategory.Swaps,
                                          properties: {
                                            link_type: 'Token Tracker',
                                            action: 'Verify Contract Address',
                                            block_explorer_domain: P,
                                          },
                                        }),
                                          global.platform.openTab({ url: S });
                                      },
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                    },
                                    P
                                  ),
                                ]),
                              })
                            )
                        )
                      );
                }
                _.propTypes = {
                  results: o.default.arrayOf(
                    o.default.shape({
                      iconUrl: o.default.string,
                      selected: o.default.bool,
                      blocked: o.default.bool,
                      primaryLabel: o.default.string,
                      secondaryLabel: o.default.string,
                      rightPrimaryLabel: o.default.string,
                      rightSecondaryLabel: o.default.string,
                    })
                  ),
                  onClickItem: o.default.func,
                  onOpenImportTokenModalClick: o.default.func,
                  Placeholder: o.default.func,
                  listTitle: o.default.string,
                  maxListItems: o.default.number,
                  searchQuery: o.default.string,
                  containerRef: o.default.shape({ current: o.default.instanceOf(window.Element) }),
                  hideRightLabels: o.default.bool,
                  hideItemIf: o.default.func,
                  listContainerClassName: o.default.string,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/searchable-item-list/item-list/item-list.component.js',
      },
    ],
    [
      7563,
      { './select-quote-popover': 7567 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./select-quote-popover')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/select-quote-popover/index.js' },
    ],
    [
      7564,
      { './quote-details': 7565 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./quote-details')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/select-quote-popover/quote-details/index.js' },
    ],
    [
      7565,
      {
        '../../../../components/ui/info-tooltip': 6759,
        '../../../../contexts/i18n': 6832,
        '../../../../selectors': 7601,
        '../../exchange-rate-display': 7544,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = d(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = c(e('prop-types')),
                  s = e('../../../../contexts/i18n'),
                  i = c(e('../../../../components/ui/info-tooltip')),
                  l = c(e('../../exchange-rate-display')),
                  u = e('../../../../selectors');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (d = function (e) {
                    return e ? a : t;
                  })(e);
                }
                const p = ({
                  slippage: e,
                  sourceTokenValue: t,
                  sourceTokenSymbol: a,
                  destinationTokenValue: o,
                  destinationTokenSymbol: c,
                  liquiditySourceKey: d,
                  minimumAmountReceived: p,
                  feeInEth: f,
                  networkFees: m,
                  metaMaskFee: h,
                  hideEstimatedGasFee: g,
                }) => {
                  const b = (0, n.useContext)(s.I18nContext),
                    y = (0, r.useSelector)(u.getUseCurrencyRateCheck);
                  return n.default.createElement(
                    'div',
                    { className: 'quote-details' },
                    n.default.createElement(
                      'div',
                      { className: 'quote-details__row' },
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-header' },
                        b('swapRate')
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-content' },
                        n.default.createElement(l.default, {
                          primaryTokenValue: t,
                          primaryTokenDecimals: 1,
                          primaryTokenSymbol: a,
                          secondaryTokenValue: o,
                          secondaryTokenDecimals: 1,
                          secondaryTokenSymbol: c,
                        })
                      )
                    ),
                    n.default.createElement(
                      'div',
                      { className: 'quote-details__row' },
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-header' },
                        b('swapMaxSlippage'),
                        n.default.createElement(i.default, {
                          position: 'bottom',
                          contentText: b('swapSlippageTooltip'),
                        })
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-content' },
                        `${e}%`
                      )
                    ),
                    n.default.createElement(
                      'div',
                      { className: 'quote-details__row' },
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-header' },
                        b('swapAmountReceived'),
                        n.default.createElement(i.default, {
                          position: 'bottom',
                          contentText: b('swapAmountReceivedInfo'),
                        })
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-content' },
                        n.default.createElement('span', null, p),
                        n.default.createElement(
                          'span',
                          { className: 'quote-details__bold' },
                          ` ${c}`
                        )
                      )
                    ),
                    !g &&
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__row' },
                        n.default.createElement(
                          'div',
                          { className: 'quote-details__detail-header' },
                          b('swapEstimatedNetworkFees'),
                          n.default.createElement(i.default, {
                            position: 'bottom',
                            contentText: b('swapEstimatedNetworkFeesInfo'),
                          })
                        ),
                        n.default.createElement(
                          'div',
                          { className: 'quote-details__detail-content' },
                          n.default.createElement('span', null, f),
                          n.default.createElement(
                            'span',
                            { className: 'quote-details__light-grey' },
                            y && ` (${m})`
                          )
                        )
                      ),
                    n.default.createElement(
                      'div',
                      { className: 'quote-details__row' },
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-header' },
                        b('swapSource'),
                        n.default.createElement(i.default, {
                          position: 'bottom',
                          contentText: b('swapLiquiditySourceInfo'),
                        })
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-content' },
                        b(d)
                      )
                    ),
                    n.default.createElement(
                      'div',
                      { className: 'quote-details__row quote-details__row--high' },
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-header' },
                        n.default.createElement('img', {
                          src: './images/logo/metamask-fox.svg',
                          className: 'quote-details__metafox-logo',
                          alt: '',
                        }),
                        b('swapMetaMaskFee')
                      ),
                      n.default.createElement(
                        'div',
                        { className: 'quote-details__detail-content' },
                        b('swapMetaMaskFeeDescription', [h])
                      )
                    )
                  );
                };
                p.propTypes = {
                  slippage: o.default.number.isRequired,
                  sourceTokenValue: o.default.string.isRequired,
                  sourceTokenSymbol: o.default.string.isRequired,
                  destinationTokenValue: o.default.string.isRequired,
                  destinationTokenSymbol: o.default.string.isRequired,
                  liquiditySourceKey: o.default.string.isRequired,
                  minimumAmountReceived: o.default.string.isRequired,
                  feeInEth: o.default.string.isRequired,
                  networkFees: o.default.string.isRequired,
                  metaMaskFee: o.default.number.isRequired,
                  hideEstimatedGasFee: o.default.bool,
                };
                a.default = p;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/select-quote-popover/quote-details/quote-details.js',
      },
    ],
    [
      7566,
      { 'prop-types': 5082 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.QUOTE_DATA_ROWS_PROPTYPES_SHAPE = void 0);
                var n,
                  r = (n = e('prop-types')) && n.__esModule ? n : { default: n };
                a.QUOTE_DATA_ROWS_PROPTYPES_SHAPE = r.default.shape({
                  aggId: r.default.string.isRequired,
                  amountReceiving: r.default.string.isRequired,
                  destinationTokenDecimals: r.default.number.isRequired,
                  destinationTokenSymbol: r.default.string.isRequired,
                  destinationTokenValue: r.default.string.isRequired,
                  isBestQuote: r.default.bool,
                  networkFees: r.default.string.isRequired,
                  quoteSource: r.default.string.isRequired,
                  rawNetworkFees: r.default.string.isRequired,
                  slippage: r.default.number.isRequired,
                  sourceTokenDecimals: r.default.number.isRequired,
                  sourceTokenSymbol: r.default.string.isRequired,
                  sourceTokenValue: r.default.string.isRequired,
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/select-quote-popover/select-quote-popover-constants.js',
      },
    ],
    [
      7567,
      {
        '../../../components/ui/button': 6707,
        '../../../components/ui/popover': 6789,
        '../../../contexts/i18n': 6832,
        './quote-details': 7564,
        './select-quote-popover-constants': 7566,
        './sort-list': 7568,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = p(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = d(e('prop-types')),
                  o = e('../../../contexts/i18n'),
                  s = d(e('../../../components/ui/popover')),
                  i = d(e('../../../components/ui/button')),
                  l = d(e('./quote-details')),
                  u = d(e('./sort-list')),
                  c = e('./select-quote-popover-constants');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (p = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function f() {
                  return (
                    (f = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var a = arguments[t];
                            for (var n in a) ({}).hasOwnProperty.call(a, n) && (e[n] = a[n]);
                          }
                          return e;
                        }),
                    f.apply(null, arguments)
                  );
                }
                const m = ({
                  quoteDataRows: e = [],
                  onClose: t = null,
                  onSubmit: a = null,
                  swapToSymbol: r,
                  initialAggId: c,
                  onQuoteDetailsIsOpened: d,
                  hideEstimatedGasFee: p,
                }) => {
                  const m = (0, n.useContext)(o.I18nContext),
                    [h, g] = (0, n.useState)(1),
                    [b, y] = (0, n.useState)(null),
                    [v, _] = (0, n.useState)(c),
                    [w, E] = (0, n.useState)('sortList'),
                    [T, x] = (0, n.useState)(null),
                    k = (0, n.useCallback)(() => {
                      a(v), t();
                    }, [v, t, a]),
                    C = (0, n.useCallback)(() => {
                      x(null), E('sortList');
                    }, []),
                    S = (0, n.useCallback)(e => _(e), [_]),
                    R = (0, n.useCallback)(
                      t => {
                        const a = e.find(e => e.aggId === t);
                        E('quoteDetails'), d(), x(a);
                      },
                      [e, d]
                    ),
                    P = (0, n.useCallback)(
                      () =>
                        n.default.createElement('div', {
                          className: 'select-quote-popover__popover-bg',
                          onClick: t,
                        }),
                      [t]
                    ),
                    O = n.default.createElement(
                      n.default.Fragment,
                      null,
                      n.default.createElement(
                        i.default,
                        {
                          type: 'secondary',
                          className: 'page-container__footer-button select-quote-popover__button',
                          onClick: t,
                        },
                        m('close')
                      ),
                      n.default.createElement(
                        i.default,
                        {
                          type: 'primary',
                          className: 'page-container__footer-button select-quote-popover__button',
                          onClick: k,
                        },
                        m('swapSelect')
                      )
                    );
                  return n.default.createElement(
                    'div',
                    { className: 'select-quote-popover' },
                    n.default.createElement(
                      s.default,
                      {
                        title: m('quoteDetails' === w ? 'swapSelectAQuote' : 'swapQuoteDetails'),
                        subtitle: 'sortList' === w ? m('swapSelectQuotePopoverDescription') : null,
                        onClose: t,
                        CustomBackground: P,
                        className: 'select-quote-popover__popover-wrap',
                        footerClassName: 'swaps__footer',
                        footer: 'quoteDetails' === w ? null : O,
                        onBack: 'quoteDetails' === w ? C : null,
                      },
                      'sortList' === w &&
                        n.default.createElement(u.default, {
                          quoteDataRows: e,
                          selectedAggId: v,
                          onSelect: S,
                          onCaretClick: R,
                          swapToSymbol: r,
                          sortDirection: h,
                          setSortDirection: g,
                          sortColumn: b,
                          setSortColumn: y,
                          hideEstimatedGasFee: p,
                        }),
                      'quoteDetails' === w &&
                        T &&
                        n.default.createElement(l.default, f({}, T, { hideEstimatedGasFee: p }))
                    )
                  );
                };
                m.propTypes = {
                  onClose: r.default.func,
                  onSubmit: r.default.func,
                  swapToSymbol: r.default.string,
                  quoteDataRows: r.default.arrayOf(c.QUOTE_DATA_ROWS_PROPTYPES_SHAPE),
                  initialAggId: r.default.string,
                  onQuoteDetailsIsOpened: r.default.func,
                  hideEstimatedGasFee: r.default.bool.isRequired,
                };
                a.default = m;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/select-quote-popover/select-quote-popover.js' },
    ],
    [
      7568,
      { './sort-list': 7569 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./sort-list')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/select-quote-popover/sort-list/index.js' },
    ],
    [
      7569,
      {
        '../../../../components/ui/icon/sun-check-icon.component': 6753,
        '../../../../components/ui/info-tooltip': 6759,
        '../../../../contexts/i18n': 6832,
        '../../../../selectors': 7601,
        '../select-quote-popover-constants': 7566,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = g);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = m(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = f(e('prop-types')),
                  s = f(e('classnames')),
                  i = f(e('bignumber.js')),
                  l = f(e('../../../../components/ui/icon/sun-check-icon.component')),
                  u = e('../../../../contexts/i18n'),
                  c = e('../select-quote-popover-constants'),
                  d = f(e('../../../../components/ui/info-tooltip')),
                  p = e('../../../../selectors');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (m = function (e) {
                    return e ? a : t;
                  })(e);
                }
                const h = () =>
                  n.default.createElement(
                    'svg',
                    {
                      width: '6',
                      height: '9',
                      viewBox: '0 0 6 9',
                      fill: 'none',
                      xmlns: 'http://www.w3.org/2000/svg',
                    },
                    n.default.createElement('path', {
                      d: 'M0.7948 4.96973C0.365112 4.96973 0.150269 5.47754 0.462769 5.77051L2.78699 8.09473C2.96277 8.29004 3.25574 8.29004 3.45105 8.09473L5.77527 5.77051C6.06824 5.47754 5.85339 4.96973 5.44324 4.96973H0.7948ZM5.77527 2.91895L3.45105 0.594727C3.25574 0.418945 2.96277 0.418945 2.78699 0.594727L0.462769 2.91895C0.150269 3.23145 0.365112 3.71973 0.7948 3.71973H5.44324C5.85339 3.71973 6.06824 3.23145 5.77527 2.91895Z',
                      fill: 'var(--color-primary-default)',
                    })
                  );
                function g({
                  quoteDataRows: e,
                  selectedAggId: t,
                  onSelect: a,
                  onCaretClick: o,
                  swapToSymbol: c,
                  sortDirection: f,
                  setSortDirection: m,
                  sortColumn: g = null,
                  setSortColumn: b,
                  hideEstimatedGasFee: y,
                }) {
                  const v = (0, n.useContext)(u.I18nContext),
                    [_, w] = (0, n.useState)(!1),
                    E = (0, r.useSelector)(p.getUseCurrencyRateCheck),
                    T = e => {
                      e === g ? m(-1 * f) : b(e);
                    },
                    x = (0, n.useMemo)(
                      () =>
                        [...e].sort((e, t) => {
                          if (null === g && e.isBestQuote) return -1;
                          if (null === g && t.isBestQuote) return 1;
                          if (null === g) {
                            const a = new i.default(e.destinationTokenValue).toString(16),
                              n = new i.default(t.destinationTokenValue).toString(16);
                            return a[a.length - 1] < n[n.length - 1] ? -1 : 1;
                          }
                          return 'quoteSource' === g
                            ? e[g] > t[g]
                              ? -1 * f
                              : f
                            : new i.default(e[g]).gt(t[g])
                              ? -1 * f
                              : f;
                        }),
                      [e, g, f]
                    ),
                    k = x.findIndex(({ aggId: e }) => t === e);
                  return n.default.createElement(
                    'div',
                    { className: 'select-quote-popover__sort-list' },
                    n.default.createElement(
                      'div',
                      { className: 'select-quote-popover__column-headers' },
                      n.default.createElement(
                        'div',
                        {
                          className:
                            'select-quote-popover__column-header select-quote-popover__receiving',
                          'data-testid': 'select-quote-popover__receiving',
                          onClick: () => T('destinationTokenValue'),
                        },
                        n.default.createElement(
                          'span',
                          { className: 'select-quote-popover__receiving-symbol' },
                          c
                        ),
                        n.default.createElement(
                          'div',
                          { className: 'select-quote-popover__receiving-label' },
                          n.default.createElement('span', null, v('swapReceiving')),
                          n.default.createElement(d.default, {
                            position: 'bottom',
                            contentText: v('swapReceivingInfoTooltip'),
                          }),
                          n.default.createElement(h, null)
                        )
                      ),
                      n.default.createElement(
                        'div',
                        {
                          className:
                            'select-quote-popover__column-header select-quote-popover__network-fees select-quote-popover__network-fees-header',
                          'data-testid': 'select-quote-popover__network-fees-header',
                          onClick: () => T('rawNetworkFees'),
                        },
                        !y &&
                          E &&
                          n.default.createElement(
                            n.default.Fragment,
                            null,
                            n.default.createElement('span', null, v('swapEstimatedNetworkFees')),
                            n.default.createElement(d.default, {
                              position: 'bottom',
                              contentText: v('swapEstimatedNetworkFeesInfo'),
                            }),
                            n.default.createElement(h, null)
                          )
                      ),
                      n.default.createElement(
                        'div',
                        {
                          className:
                            'select-quote-popover__column-header select-quote-popover__quote-source',
                          'data-testid': 'select-quote-popover__quote-source',
                          onClick: () => T('quoteSource'),
                        },
                        v('swapQuoteSource'),
                        n.default.createElement(
                          'div',
                          { className: 'select-quote-popover__quote-source-toggle' },
                          n.default.createElement(h, null)
                        )
                      )
                    ),
                    x.map(
                      (
                        {
                          destinationTokenValue: e,
                          networkFees: t,
                          isBestQuote: r,
                          quoteSource: i,
                          aggId: u,
                        },
                        c
                      ) =>
                        n.default.createElement(
                          'div',
                          {
                            className: (0, s.default)('select-quote-popover__row', {
                              'select-quote-popover__row--selected': k === c,
                              'select-quote-popover__row--no-hover': _,
                            }),
                            onClick: () => a(u),
                            key: `select-quote-popover-row-${c}`,
                            'data-testid': `select-quote-popover-row-${c}`,
                          },
                          n.default.createElement(
                            'div',
                            { className: 'select-quote-popover__receiving' },
                            n.default.createElement(
                              'div',
                              { className: 'select-quote-popover__receiving-value' },
                              r && n.default.createElement(l.default, { reverseColors: k !== c }),
                              n.default.createElement(
                                'div',
                                {
                                  className: 'select-quote-popover__receiving-value-text',
                                  title: e,
                                },
                                e
                              )
                            ),
                            'RFQ' === i &&
                              n.default.createElement(
                                'span',
                                { className: 'select-quote-popover__zero-slippage' },
                                v('swapZeroSlippage')
                              )
                          ),
                          n.default.createElement(
                            'div',
                            { className: 'select-quote-popover__network-fees' },
                            !y && E && t
                          ),
                          n.default.createElement(
                            'div',
                            { className: 'select-quote-popover__quote-source' },
                            n.default.createElement(
                              'div',
                              {
                                className: (0, s.default)(
                                  'select-quote-popover__quote-source-label',
                                  {
                                    'select-quote-popover__quote-source-label--green': 'AGG' === i,
                                    'select-quote-popover__quote-source-label--orange': 'RFQ' === i,
                                    'select-quote-popover__quote-source-label--blue': 'DEX' === i,
                                  }
                                ),
                              },
                              i
                            )
                          ),
                          n.default.createElement(
                            'div',
                            {
                              className: 'select-quote-popover__caret-right',
                              'data-testid': `select-quote-popover__caret-right-${c}`,
                              onClick: e => {
                                e.stopPropagation(), o(u);
                              },
                              onMouseEnter: () => w(!0),
                              onMouseLeave: () => w(!1),
                            },
                            n.default.createElement('i', { className: 'fa fa-angle-up' })
                          )
                        )
                    )
                  );
                }
                g.propTypes = {
                  selectedAggId: o.default.string.isRequired,
                  onSelect: o.default.func.isRequired,
                  onCaretClick: o.default.func.isRequired,
                  swapToSymbol: o.default.string.isRequired,
                  quoteDataRows: o.default.arrayOf(c.QUOTE_DATA_ROWS_PROPTYPES_SHAPE).isRequired,
                  sortDirection: o.default.number.isRequired,
                  setSortDirection: o.default.func.isRequired,
                  sortColumn: o.default.string,
                  setSortColumn: o.default.func.isRequired,
                  hideEstimatedGasFee: o.default.bool.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/select-quote-popover/sort-list/sort-list.js' },
    ],
    [
      757,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                /*!
                 * @kurkle/color v0.3.2
                 * https://github.com/kurkle/color#readme
                 * (c) 2023 Jukka Kurkela
                 * Released under the MIT License
                 */
                !(function (e, n) {
                  'object' == typeof a && void 0 !== t
                    ? (t.exports = n())
                    : 'function' == typeof define && define.amd
                      ? define(n)
                      : ((e = 'undefined' != typeof globalThis ? globalThis : e || self)[
                          '@kurkle/color'
                        ] = n());
                })(this, function () {
                  function e(e) {
                    return (e + 0.5) | 0;
                  }
                  const t = (e, t, a) => Math.max(Math.min(e, a), t);
                  function a(a) {
                    return t(e(2.55 * a), 0, 255);
                  }
                  function n(a) {
                    return t(e(255 * a), 0, 255);
                  }
                  function r(a) {
                    return t(e(a / 2.55) / 100, 0, 1);
                  }
                  function o(a) {
                    return t(e(100 * a), 0, 100);
                  }
                  const s = {
                      0: 0,
                      1: 1,
                      2: 2,
                      3: 3,
                      4: 4,
                      5: 5,
                      6: 6,
                      7: 7,
                      8: 8,
                      9: 9,
                      A: 10,
                      B: 11,
                      C: 12,
                      D: 13,
                      E: 14,
                      F: 15,
                      a: 10,
                      b: 11,
                      c: 12,
                      d: 13,
                      e: 14,
                      f: 15,
                    },
                    i = [...'0123456789ABCDEF'],
                    l = e => i[15 & e],
                    u = e => i[(240 & e) >> 4] + i[15 & e],
                    c = e => (240 & e) >> 4 == (15 & e);
                  function d(e) {
                    var t,
                      a = e.length;
                    return (
                      '#' === e[0] &&
                        (4 === a || 5 === a
                          ? (t = {
                              r: 255 & (17 * s[e[1]]),
                              g: 255 & (17 * s[e[2]]),
                              b: 255 & (17 * s[e[3]]),
                              a: 5 === a ? 17 * s[e[4]] : 255,
                            })
                          : (7 !== a && 9 !== a) ||
                            (t = {
                              r: (s[e[1]] << 4) | s[e[2]],
                              g: (s[e[3]] << 4) | s[e[4]],
                              b: (s[e[5]] << 4) | s[e[6]],
                              a: 9 === a ? (s[e[7]] << 4) | s[e[8]] : 255,
                            })),
                      t
                    );
                  }
                  function p(e) {
                    var t = (e => c(e.r) && c(e.g) && c(e.b) && c(e.a))(e) ? l : u;
                    return e
                      ? '#' + t(e.r) + t(e.g) + t(e.b) + ((e, t) => (e < 255 ? t(e) : ''))(e.a, t)
                      : undefined;
                  }
                  const f =
                    /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
                  function m(e, t, a) {
                    const n = t * Math.min(a, 1 - a),
                      r = (t, r = (t + e / 30) % 12) =>
                        a - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
                    return [r(0), r(8), r(4)];
                  }
                  function h(e, t, a) {
                    const n = (n, r = (n + e / 60) % 6) =>
                      a - a * t * Math.max(Math.min(r, 4 - r, 1), 0);
                    return [n(5), n(3), n(1)];
                  }
                  function g(e, t, a) {
                    const n = m(e, 1, 0.5);
                    let r;
                    for (t + a > 1 && ((r = 1 / (t + a)), (t *= r), (a *= r)), r = 0; r < 3; r++)
                      (n[r] *= 1 - t - a), (n[r] += t);
                    return n;
                  }
                  function b(e) {
                    const t = e.r / 255,
                      a = e.g / 255,
                      n = e.b / 255,
                      r = Math.max(t, a, n),
                      o = Math.min(t, a, n),
                      s = (r + o) / 2;
                    let i, l, u;
                    return (
                      r !== o &&
                        ((u = r - o),
                        (l = s > 0.5 ? u / (2 - r - o) : u / (r + o)),
                        (i = (function (e, t, a, n, r) {
                          return e === r
                            ? (t - a) / n + (t < a ? 6 : 0)
                            : t === r
                              ? (a - e) / n + 2
                              : (e - t) / n + 4;
                        })(t, a, n, u, r)),
                        (i = 60 * i + 0.5)),
                      [0 | i, l || 0, s]
                    );
                  }
                  function y(e, t, a, r) {
                    return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, r)).map(n);
                  }
                  function v(e, t, a) {
                    return y(m, e, t, a);
                  }
                  function _(e, t, a) {
                    return y(g, e, t, a);
                  }
                  function w(e, t, a) {
                    return y(h, e, t, a);
                  }
                  function E(e) {
                    return ((e % 360) + 360) % 360;
                  }
                  function T(e) {
                    const t = f.exec(e);
                    let r,
                      o = 255;
                    if (!t) return;
                    t[5] !== r && (o = t[6] ? a(+t[5]) : n(+t[5]));
                    const s = E(+t[2]),
                      i = +t[3] / 100,
                      l = +t[4] / 100;
                    return (
                      (r = 'hwb' === t[1] ? _(s, i, l) : 'hsv' === t[1] ? w(s, i, l) : v(s, i, l)),
                      { r: r[0], g: r[1], b: r[2], a: o }
                    );
                  }
                  function x(e, t) {
                    var a = b(e);
                    (a[0] = E(a[0] + t)), (a = v(a)), (e.r = a[0]), (e.g = a[1]), (e.b = a[2]);
                  }
                  function k(e) {
                    if (!e) return;
                    const t = b(e),
                      a = t[0],
                      n = o(t[1]),
                      s = o(t[2]);
                    return e.a < 255
                      ? `hsla(${a}, ${n}%, ${s}%, ${r(e.a)})`
                      : `hsl(${a}, ${n}%, ${s}%)`;
                  }
                  const C = {
                      x: 'dark',
                      Z: 'light',
                      Y: 're',
                      X: 'blu',
                      W: 'gr',
                      V: 'medium',
                      U: 'slate',
                      A: 'ee',
                      T: 'ol',
                      S: 'or',
                      B: 'ra',
                      C: 'lateg',
                      D: 'ights',
                      R: 'in',
                      Q: 'turquois',
                      E: 'hi',
                      P: 'ro',
                      O: 'al',
                      N: 'le',
                      M: 'de',
                      L: 'yello',
                      F: 'en',
                      K: 'ch',
                      G: 'arks',
                      H: 'ea',
                      I: 'ightg',
                      J: 'wh',
                    },
                    S = {
                      OiceXe: 'f0f8ff',
                      antiquewEte: 'faebd7',
                      aqua: 'ffff',
                      aquamarRe: '7fffd4',
                      azuY: 'f0ffff',
                      beige: 'f5f5dc',
                      bisque: 'ffe4c4',
                      black: '0',
                      blanKedOmond: 'ffebcd',
                      Xe: 'ff',
                      XeviTet: '8a2be2',
                      bPwn: 'a52a2a',
                      burlywood: 'deb887',
                      caMtXe: '5f9ea0',
                      KartYuse: '7fff00',
                      KocTate: 'd2691e',
                      cSO: 'ff7f50',
                      cSnflowerXe: '6495ed',
                      cSnsilk: 'fff8dc',
                      crimson: 'dc143c',
                      cyan: 'ffff',
                      xXe: '8b',
                      xcyan: '8b8b',
                      xgTMnPd: 'b8860b',
                      xWay: 'a9a9a9',
                      xgYF: '6400',
                      xgYy: 'a9a9a9',
                      xkhaki: 'bdb76b',
                      xmagFta: '8b008b',
                      xTivegYF: '556b2f',
                      xSange: 'ff8c00',
                      xScEd: '9932cc',
                      xYd: '8b0000',
                      xsOmon: 'e9967a',
                      xsHgYF: '8fbc8f',
                      xUXe: '483d8b',
                      xUWay: '2f4f4f',
                      xUgYy: '2f4f4f',
                      xQe: 'ced1',
                      xviTet: '9400d3',
                      dAppRk: 'ff1493',
                      dApskyXe: 'bfff',
                      dimWay: '696969',
                      dimgYy: '696969',
                      dodgerXe: '1e90ff',
                      fiYbrick: 'b22222',
                      flSOwEte: 'fffaf0',
                      foYstWAn: '228b22',
                      fuKsia: 'ff00ff',
                      gaRsbSo: 'dcdcdc',
                      ghostwEte: 'f8f8ff',
                      gTd: 'ffd700',
                      gTMnPd: 'daa520',
                      Way: '808080',
                      gYF: '8000',
                      gYFLw: 'adff2f',
                      gYy: '808080',
                      honeyMw: 'f0fff0',
                      hotpRk: 'ff69b4',
                      RdianYd: 'cd5c5c',
                      Rdigo: '4b0082',
                      ivSy: 'fffff0',
                      khaki: 'f0e68c',
                      lavFMr: 'e6e6fa',
                      lavFMrXsh: 'fff0f5',
                      lawngYF: '7cfc00',
                      NmoncEffon: 'fffacd',
                      ZXe: 'add8e6',
                      ZcSO: 'f08080',
                      Zcyan: 'e0ffff',
                      ZgTMnPdLw: 'fafad2',
                      ZWay: 'd3d3d3',
                      ZgYF: '90ee90',
                      ZgYy: 'd3d3d3',
                      ZpRk: 'ffb6c1',
                      ZsOmon: 'ffa07a',
                      ZsHgYF: '20b2aa',
                      ZskyXe: '87cefa',
                      ZUWay: '778899',
                      ZUgYy: '778899',
                      ZstAlXe: 'b0c4de',
                      ZLw: 'ffffe0',
                      lime: 'ff00',
                      limegYF: '32cd32',
                      lRF: 'faf0e6',
                      magFta: 'ff00ff',
                      maPon: '800000',
                      VaquamarRe: '66cdaa',
                      VXe: 'cd',
                      VScEd: 'ba55d3',
                      VpurpN: '9370db',
                      VsHgYF: '3cb371',
                      VUXe: '7b68ee',
                      VsprRggYF: 'fa9a',
                      VQe: '48d1cc',
                      VviTetYd: 'c71585',
                      midnightXe: '191970',
                      mRtcYam: 'f5fffa',
                      mistyPse: 'ffe4e1',
                      moccasR: 'ffe4b5',
                      navajowEte: 'ffdead',
                      navy: '80',
                      Tdlace: 'fdf5e6',
                      Tive: '808000',
                      TivedBb: '6b8e23',
                      Sange: 'ffa500',
                      SangeYd: 'ff4500',
                      ScEd: 'da70d6',
                      pOegTMnPd: 'eee8aa',
                      pOegYF: '98fb98',
                      pOeQe: 'afeeee',
                      pOeviTetYd: 'db7093',
                      papayawEp: 'ffefd5',
                      pHKpuff: 'ffdab9',
                      peru: 'cd853f',
                      pRk: 'ffc0cb',
                      plum: 'dda0dd',
                      powMrXe: 'b0e0e6',
                      purpN: '800080',
                      YbeccapurpN: '663399',
                      Yd: 'ff0000',
                      Psybrown: 'bc8f8f',
                      PyOXe: '4169e1',
                      saddNbPwn: '8b4513',
                      sOmon: 'fa8072',
                      sandybPwn: 'f4a460',
                      sHgYF: '2e8b57',
                      sHshell: 'fff5ee',
                      siFna: 'a0522d',
                      silver: 'c0c0c0',
                      skyXe: '87ceeb',
                      UXe: '6a5acd',
                      UWay: '708090',
                      UgYy: '708090',
                      snow: 'fffafa',
                      sprRggYF: 'ff7f',
                      stAlXe: '4682b4',
                      tan: 'd2b48c',
                      teO: '8080',
                      tEstN: 'd8bfd8',
                      tomato: 'ff6347',
                      Qe: '40e0d0',
                      viTet: 'ee82ee',
                      JHt: 'f5deb3',
                      wEte: 'ffffff',
                      wEtesmoke: 'f5f5f5',
                      Lw: 'ffff00',
                      LwgYF: '9acd32',
                    };
                  let R;
                  function P(e) {
                    R ||
                      ((R = (function () {
                        const e = {},
                          t = Object.keys(S),
                          a = Object.keys(C);
                        let n, r, o, s, i;
                        for (n = 0; n < t.length; n++) {
                          for (s = i = t[n], r = 0; r < a.length; r++)
                            (o = a[r]), (i = i.replace(o, C[o]));
                          (o = parseInt(S[s], 16)),
                            (e[i] = [(o >> 16) & 255, (o >> 8) & 255, 255 & o]);
                        }
                        return e;
                      })()),
                      (R.transparent = [0, 0, 0, 0]));
                    const t = R[e.toLowerCase()];
                    return t && { r: t[0], g: t[1], b: t[2], a: 4 === t.length ? t[3] : 255 };
                  }
                  const O =
                    /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
                  function M(e) {
                    const n = O.exec(e);
                    let r,
                      o,
                      s,
                      i = 255;
                    if (n) {
                      if (n[7] !== r) {
                        const e = +n[7];
                        i = n[8] ? a(e) : t(255 * e, 0, 255);
                      }
                      return (
                        (r = +n[1]),
                        (o = +n[3]),
                        (s = +n[5]),
                        (r = 255 & (n[2] ? a(r) : t(r, 0, 255))),
                        (o = 255 & (n[4] ? a(o) : t(o, 0, 255))),
                        (s = 255 & (n[6] ? a(s) : t(s, 0, 255))),
                        { r: r, g: o, b: s, a: i }
                      );
                    }
                  }
                  function N(e) {
                    return (
                      e &&
                      (e.a < 255
                        ? `rgba(${e.r}, ${e.g}, ${e.b}, ${r(e.a)})`
                        : `rgb(${e.r}, ${e.g}, ${e.b})`)
                    );
                  }
                  const D = e =>
                      e <= 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055,
                    I = e => (e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4));
                  function A(e, t, a) {
                    if (e) {
                      let n = b(e);
                      (n[t] = Math.max(0, Math.min(n[t] + n[t] * a, 0 === t ? 360 : 1))),
                        (n = v(n)),
                        (e.r = n[0]),
                        (e.g = n[1]),
                        (e.b = n[2]);
                    }
                  }
                  function j(e, t) {
                    return e ? Object.assign(t || {}, e) : e;
                  }
                  function L(e) {
                    var t = { r: 0, g: 0, b: 0, a: 255 };
                    return (
                      Array.isArray(e)
                        ? e.length >= 3 &&
                          ((t = { r: e[0], g: e[1], b: e[2], a: 255 }),
                          e.length > 3 && (t.a = n(e[3])))
                        : ((t = j(e, { r: 0, g: 0, b: 0, a: 1 })).a = n(t.a)),
                      t
                    );
                  }
                  class B {
                    constructor(e) {
                      if (e instanceof B) return e;
                      const t = typeof e;
                      let a;
                      var n;
                      'object' === t
                        ? (a = L(e))
                        : 'string' === t &&
                          (a = d(e) || P(e) || ('r' === (n = e).charAt(0) ? M(n) : T(n))),
                        (this._rgb = a),
                        (this._valid = !!a);
                    }
                    get valid() {
                      return this._valid;
                    }
                    get rgb() {
                      var e = j(this._rgb);
                      return e && (e.a = r(e.a)), e;
                    }
                    set rgb(e) {
                      this._rgb = L(e);
                    }
                    rgbString() {
                      return this._valid ? N(this._rgb) : undefined;
                    }
                    hexString() {
                      return this._valid ? p(this._rgb) : undefined;
                    }
                    hslString() {
                      return this._valid ? k(this._rgb) : undefined;
                    }
                    mix(e, t) {
                      if (e) {
                        const a = this.rgb,
                          n = e.rgb;
                        let r;
                        const o = t === r ? 0.5 : t,
                          s = 2 * o - 1,
                          i = a.a - n.a,
                          l = ((s * i == -1 ? s : (s + i) / (1 + s * i)) + 1) / 2;
                        (r = 1 - l),
                          (a.r = 255 & (l * a.r + r * n.r + 0.5)),
                          (a.g = 255 & (l * a.g + r * n.g + 0.5)),
                          (a.b = 255 & (l * a.b + r * n.b + 0.5)),
                          (a.a = o * a.a + (1 - o) * n.a),
                          (this.rgb = a);
                      }
                      return this;
                    }
                    interpolate(e, t) {
                      return (
                        e &&
                          (this._rgb = (function (e, t, a) {
                            const o = I(r(e.r)),
                              s = I(r(e.g)),
                              i = I(r(e.b));
                            return {
                              r: n(D(o + a * (I(r(t.r)) - o))),
                              g: n(D(s + a * (I(r(t.g)) - s))),
                              b: n(D(i + a * (I(r(t.b)) - i))),
                              a: e.a + a * (t.a - e.a),
                            };
                          })(this._rgb, e._rgb, t)),
                        this
                      );
                    }
                    clone() {
                      return new B(this.rgb);
                    }
                    alpha(e) {
                      return (this._rgb.a = n(e)), this;
                    }
                    clearer(e) {
                      return (this._rgb.a *= 1 - e), this;
                    }
                    greyscale() {
                      const t = this._rgb,
                        a = e(0.3 * t.r + 0.59 * t.g + 0.11 * t.b);
                      return (t.r = t.g = t.b = a), this;
                    }
                    opaquer(e) {
                      return (this._rgb.a *= 1 + e), this;
                    }
                    negate() {
                      const e = this._rgb;
                      return (e.r = 255 - e.r), (e.g = 255 - e.g), (e.b = 255 - e.b), this;
                    }
                    lighten(e) {
                      return A(this._rgb, 2, e), this;
                    }
                    darken(e) {
                      return A(this._rgb, 2, -e), this;
                    }
                    saturate(e) {
                      return A(this._rgb, 1, e), this;
                    }
                    desaturate(e) {
                      return A(this._rgb, 1, -e), this;
                    }
                    rotate(e) {
                      return x(this._rgb, e), this;
                    }
                  }
                  function F(e) {
                    return new B(e);
                  }
                  var q = Object.freeze({
                    __proto__: null,
                    Color: B,
                    default: F,
                    round: e,
                    lim: t,
                    p2b: a,
                    b2p: function (a) {
                      return t(e(a / 2.55), 0, 100);
                    },
                    n2b: n,
                    b2n: r,
                    n2p: o,
                    hexParse: d,
                    hexString: p,
                    rgb2hsl: b,
                    hsl2rgb: v,
                    hwb2rgb: _,
                    hsv2rgb: w,
                    hueParse: T,
                    rotate: x,
                    hslString: k,
                    nameParse: P,
                    rgbParse: M,
                    rgbString: N,
                  });
                  return Object.assign(F, q);
                });
              };
            };
      },
      { package: 'chart.js>@kurkle/color', file: 'node_modules/@kurkle/color/dist/color.cjs' },
    ],
    [
      7570,
      {
        '../../../components/component-library': 6402,
        '../../../components/ui/url-icon': 6827,
        '../../../contexts/i18n': 6832,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = p);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = d(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = c(e('prop-types')),
                  o = c(e('classnames')),
                  s = e('../../../components/component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  l = c(e('../../../components/ui/url-icon')),
                  u = e('../../../contexts/i18n');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (d = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function p({ onClick: e, onClose: t, selectedToken: a, testId: r }) {
                  const c = (0, n.useContext)(u.I18nContext),
                    d = (null == a ? void 0 : a.iconUrl) && (null == a ? void 0 : a.symbol);
                  return n.default.createElement(
                    'div',
                    { className: 'selected-token' },
                    n.default.createElement(
                      'div',
                      {
                        className: (0, o.default)(
                          'selected-token-list',
                          'selected-token-list__selector-closed-container',
                          'selected-token-input-pair__selector--closed'
                        ),
                        'data-testid': 'selected-token-list',
                        tabIndex: '0',
                        onClick: e,
                        onKeyUp: a => {
                          'Escape' === a.key ? t() : 'Enter' === a.key && e(a);
                        },
                      },
                      n.default.createElement(
                        'div',
                        { className: 'selected-token-list__selector-closed' },
                        d &&
                          n.default.createElement(l.default, {
                            url: a.iconUrl,
                            className: 'selected-token-list__selector-closed-icon',
                            name: null == a ? void 0 : a.symbol,
                          }),
                        n.default.createElement(
                          'div',
                          {
                            className: (0, o.default)('selected-token-list__labels', {
                              'selected-token-list__labels--with-icon': d,
                            }),
                          },
                          n.default.createElement(
                            'div',
                            { className: 'selected-token-list__item-labels' },
                            n.default.createElement(
                              'span',
                              {
                                'data-testid': r,
                                className: (0, o.default)(
                                  'selected-token-list__closed-primary-label',
                                  {
                                    'selected-token-list__select-default': !(null != a && a.symbol),
                                  }
                                ),
                              },
                              (null == a ? void 0 : a.symbol) || c('swapSelectAToken')
                            )
                          )
                        )
                      ),
                      n.default.createElement(s.Icon, {
                        name: s.IconName.ArrowDown,
                        size: s.IconSize.Xs,
                        marginRight: 3,
                        color: i.IconColor.iconAlternative,
                      })
                    )
                  );
                }
                p.propTypes = {
                  onClick: r.default.func.isRequired,
                  onClose: r.default.func.isRequired,
                  selectedToken: r.default.object.isRequired,
                  testId: r.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/selected-token/selected-token.js' },
    ],
    [
      7571,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '15',
                        height: '13',
                        viewBox: '0 0 15 13',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M14.4946 6.14779C14.4863 5.93594 14.3991 5.69108 14.2539 5.53666L9.51334 0.49958C9.1921 0.21091 8.57613 0.0917437 8.21709 0.425509C7.86344 0.754237 7.87396 1.39178 8.22627 1.72181L11.5595 5.25889L1.1618 5.25889C0.670919 5.25889 0.272949 5.65687 0.272949 6.14779C0.272949 6.6387 0.670919 7.03668 1.1618 7.03668L11.5595 7.03668L8.22627 10.5738C7.92297 10.8776 7.86691 11.5376 8.21709 11.8701C8.56718 12.2025 9.20529 12.0963 9.51334 11.796L14.2539 6.75891C14.4161 6.58653 14.4952 6.38428 14.4946 6.14779Z',
                        fill: 'var(--color-text-muted)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/arrow-icon.js' },
    ],
    [
      7572,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '41',
                        height: '39',
                        viewBox: '0 0 41 39',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M34.5805 6.55143C36.1394 8.11033 37.3994 9.91222 38.3237 11.8681C38.7066 12.6782 39.0318 13.5148 39.2968 14.3714L39.3242 14.4606C39.4816 14.9785 39.6171 15.5037 39.73 16.0347C40.6511 20.3654 40.0335 24.9029 37.9511 28.8509C35.6001 33.308 31.5749 36.6487 26.7609 38.138C24.3773 38.8754 21.8717 39.1361 19.3873 38.9052C16.9029 38.6743 14.4883 37.9563 12.2813 36.7922C10.2608 35.7264 8.52045 34.3588 7.08333 32.7636C5.61245 31.1448 4.43054 29.2824 3.59178 27.2574C3.32329 26.6092 2.89685 25.2767 2.89685 25.2767H6.89583C7.68667 27.4068 8.96033 29.362 10.6288 30.9609L10.6318 30.96C11.5096 31.8005 12.501 32.5516 13.595 33.1786C15.8742 34.483 18.4736 35.1864 21.1455 35.1864C25.1768 35.1864 29.0429 33.585 31.8935 30.7345C34.744 27.8839 36.3455 24.0177 36.3455 19.9865C36.3455 18.7267 36.1891 17.483 35.8871 16.2814C35.8206 16.017 35.7471 15.7546 35.6666 15.4945C34.4752 11.6432 31.8027 8.42306 28.237 6.54231C24.6713 4.66156 20.5045 4.27429 16.6533 5.46571C12.8837 6.63189 9.71868 9.21706 7.82253 12.6699L12.8961 15.307L3.28331 18.3447L0.245605 8.73191L4.45005 10.9171C6.81537 6.56278 10.7905 3.30177 15.5303 1.83546C17.3658 1.26761 19.2587 0.986653 21.1455 0.986694C26.1846 0.986694 31.0173 2.98824 34.5805 6.55143Z',
                        fill: 'var(--color-primary-default)',
                      }),
                      r.default.createElement('path', {
                        fillRule: 'evenodd',
                        clipRule: 'evenodd',
                        d: 'M18.1252 22.1036L14.7107 18.689L12.0926 21.3257L18.1252 27.3584L30.2322 15.2515L27.614 12.6148L18.1252 22.1036Z',
                        fill: 'var(--color-primary-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/canceled-icon.js' },
    ],
    [
      7573,
      { './smart-transaction-status': 7575 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./smart-transaction-status')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/index.js' },
    ],
    [
      7574,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '41',
                        height: '39',
                        viewBox: '0 0 41 39',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M34.6806 6.55143C36.2395 8.11033 37.4995 9.91222 38.4238 11.8681C38.8067 12.6782 39.1319 13.5148 39.3969 14.3714L39.4243 14.4606C39.5817 14.9785 39.7172 15.5037 39.8301 16.0347C40.7512 20.3654 40.1336 24.9029 38.0512 28.8509C35.7002 33.308 31.675 36.6487 26.861 38.138C24.4773 38.8754 21.9718 39.1361 19.4874 38.9052C17.003 38.6743 14.5884 37.9563 12.3814 36.7922C10.3609 35.7264 8.62055 34.3588 7.18343 32.7636C5.71254 31.1448 4.53064 29.2824 3.69188 27.2574C3.42339 26.6092 2.99695 25.2767 2.99695 25.2767H6.99592C7.78677 27.4068 9.06042 29.362 10.7289 30.9609L10.7319 30.96C11.6097 31.8005 12.6011 32.5516 13.6951 33.1786C15.9743 34.483 18.5737 35.1864 21.2456 35.1864C25.2769 35.1864 29.143 33.585 31.9936 30.7345C34.8441 27.8839 36.4456 24.0177 36.4456 19.9865C36.4456 18.7267 36.2892 17.483 35.9872 16.2814C35.9207 16.017 35.8471 15.7546 35.7667 15.4945C34.5753 11.6432 31.9028 8.42306 28.3371 6.54231C24.7714 4.66156 20.6046 4.27429 16.7534 5.46571C12.9838 6.63189 9.81878 9.21706 7.92263 12.6699L12.9962 15.307L3.3834 18.3447L0.345703 8.73191L4.55015 10.9171C6.91547 6.56278 10.8906 3.30177 15.6304 1.83546C17.4659 1.26761 19.3588 0.986653 21.2456 0.986694C26.2847 0.986694 31.1174 2.98824 34.6806 6.55143Z',
                        fill: 'var(--color-error-default)',
                      }),
                      r.default.createElement('path', {
                        d: 'M18.5849 19.9869L15.1454 23.4264L17.9845 26.2655L21.424 22.826L24.8635 26.2655L27.7026 23.4264L24.2631 19.9869L27.7026 16.5473L24.8635 13.7082L21.424 17.1478L17.9845 13.7082L15.1454 16.5473L18.5849 19.9869Z',
                        fill: 'var(--color-error-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/reverted-icon.js' },
    ],
    [
      7575,
      {
        '../../../../shared/constants/common': 5791,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../shared/modules/selectors': 5874,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/url-icon': 6827,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../create-new-swap': 7542,
        '../swaps-footer': 7580,
        '../swaps.util': 7583,
        '../view-on-block-explorer': 7585,
        './arrow-icon': 7571,
        './canceled-icon': 7572,
        './reverted-icon': 7574,
        './success-icon': 7576,
        './timer-icon': 7577,
        './unknown-icon': 7578,
        '@metamask/etherscan-link': 1938,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    var e, t, a, A, j, L, B, F, q;
                    const [W, U] = (0, n.useState)(!1),
                      $ = (0, n.useContext)(l.I18nContext),
                      V = (0, o.useHistory)(),
                      z = (0, r.useDispatch)(),
                      H = (0, r.useSelector)(R.getHDEntropyIndex),
                      G = (0, r.useSelector)(u.getFetchParams, i.isEqual) || {},
                      { destinationTokenInfo: Q = {}, sourceTokenInfo: X = {} } =
                        (null == G ? void 0 : G.metaData) || {},
                      K = (0, r.useSelector)(d.isHardwareWallet),
                      Z = (0, r.useSelector)(d.getHardwareWalletType),
                      Y = (0, r.useSelector)(u.getUsedQuote, i.isEqual),
                      J = (0, r.useSelector)(u.getCurrentSmartTransactions, i.isEqual),
                      ee = (0, r.useSelector)(c.getCurrentChainId),
                      te = (0, r.useSelector)(d.getRpcPrefsForCurrentProvider, r.shallowEqual),
                      ae = (0, r.useSelector)(u.getSwapsNetworkConfig, r.shallowEqual),
                      ne = (0, r.useSelector)(p.getSmartTransactionsEnabled),
                      re = (0, r.useSelector)(u.getCurrentSmartTransactionsEnabled),
                      oe =
                        te.blockExplorerUrl ?? f.CHAINID_DEFAULT_BLOCK_EXPLORER_URL_MAP[ee] ?? null;
                    let se,
                      ie,
                      le = w.SmartTransactionStatus.pending,
                      ue = {};
                    if (J && J.length > 0) {
                      var ce, de, pe;
                      (ue = J[J.length - 1]),
                        (se = null === (ce = ue) || void 0 === ce ? void 0 : ce.uuid),
                        (le =
                          (null === (de = ue) || void 0 === de ? void 0 : de.status) ||
                          w.SmartTransactionStatus.pending),
                        (ie =
                          null === (pe = ue) ||
                          void 0 === pe ||
                          null === (pe = pe.statusMetadata) ||
                          void 0 === pe
                            ? void 0
                            : pe.cancellationFeeWei);
                    }
                    const [fe, me] = (0, n.useState)(ae.stxStatusDeadline),
                      he = {
                        needs_two_confirmations: !0,
                        token_from:
                          X.symbol ??
                          (null === (e = ue) || void 0 === e ? void 0 : e.sourceTokenSymbol),
                        token_from_amount:
                          (null == G ? void 0 : G.value) ??
                          (null === (t = ue) || void 0 === t ? void 0 : t.swapTokenValue),
                        token_to:
                          Q.symbol ??
                          (null === (a = ue) || void 0 === a ? void 0 : a.destinationTokenSymbol),
                        request_type: null != G && G.balanceError ? 'Quote' : 'Order',
                        slippage: null == G ? void 0 : G.slippage,
                        custom_slippage: 2 === (null == G ? void 0 : G.slippage),
                        is_hardware_wallet: K,
                        hardware_wallet_type: Z,
                        stx_enabled: ne,
                        current_stx_enabled: re,
                        stx_user_opt_in: (0, r.useSelector)(
                          p.getSmartTransactionsOptInStatusForMetrics
                        ),
                      };
                    let ge;
                    var be;
                    null != Y &&
                      Y.destinationAmount &&
                      (ge = (0, S.calcTokenAmount)(
                        null == Y ? void 0 : Y.destinationAmount,
                        Q.decimals ??
                          (null === (be = ue) || void 0 === be
                            ? void 0
                            : be.destinationTokenDecimals)
                      ).toPrecision(8));
                    const ye = (0, n.useContext)(x.MetaMetricsContext),
                      ve = le === w.SmartTransactionStatus.pending,
                      _e = ve || le === w.SmartTransactionStatus.success,
                      we =
                        null === (A = ue) ||
                        void 0 === A ||
                        null === (A = A.statusMetadata) ||
                        void 0 === A
                          ? void 0
                          : A.minedHash;
                    (0, n.useEffect)(() => {
                      ye({
                        event: 'STX Status Page Loaded',
                        category: _.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: he,
                        properties: { hd_entropy_index: H },
                      });
                    }, []),
                      (0, n.useEffect)(() => {
                        let e;
                        if (ve && se) {
                          const t = () => {
                            const t = Math.round((Date.now() - ue.time) / 1e3);
                            if (t > ae.stxStatusDeadline) return me(0), void clearInterval(e);
                            me(ae.stxStatusDeadline - t);
                          };
                          (e = setInterval(t, 1e3)), t();
                        }
                        return () => clearInterval(e);
                      }, [z, ve, se, ue.time, ae.stxStatusDeadline]),
                      (0, n.useEffect)(() => {
                        z((0, v.setBackgroundSwapRouteState)('smartTransactionStatus')),
                          setTimeout(() => {
                            z((0, v.stopPollingForQuotes)());
                          }, 1e3);
                      }, [z]);
                    let Ee,
                      Te,
                      xe,
                      ke,
                      Ce = $('stxPendingPrivatelySubmittingSwap');
                    ve &&
                      (W
                        ? (Ce = $('stxTryingToCancel'))
                        : ie > 0 && (Ce = $('stxPendingPubliclySubmittingSwap')));
                    if (le === w.SmartTransactionStatus.success) {
                      var Se, Re;
                      if (
                        ((Ce = $('stxSuccess')),
                        Q.symbol ||
                          (null !== (Se = ue) && void 0 !== Se && Se.destinationTokenSymbol))
                      )
                        Ee = $('stxSuccessDescription', [
                          Q.symbol ??
                            (null === (Re = ue) || void 0 === Re
                              ? void 0
                              : Re.destinationTokenSymbol),
                        ]);
                      xe = n.default.createElement(P.default, null);
                    } else
                      'cancelled_user_cancelled' === le ||
                      (null === (j = ue) ||
                      void 0 === j ||
                      null === (j = j.statusMetadata) ||
                      void 0 === j
                        ? void 0
                        : j.minedTx) === w.SmartTransactionStatus.cancelled
                        ? ((Ce = $('stxUserCancelled')),
                          (Ee = $('stxUserCancelledDescription')),
                          (xe = n.default.createElement(M.default, null)))
                        : le.startsWith('cancelled') || le.includes('deadline_missed')
                          ? ((Ce = $('stxCancelled')),
                            (Ee = $('stxCancelledDescription')),
                            (Te = $('stxCancelledSubDescription')),
                            (xe = n.default.createElement(M.default, null)))
                          : 'unknown' === le
                            ? ((Ce = $('stxUnknown')),
                              (Ee = $('stxUnknownDescription')),
                              (xe = n.default.createElement(N.default, null)))
                            : 'reverted' === le &&
                              ((Ce = $('stxFailure')),
                              (Ee = $('stxFailureDescription', [
                                n.default.createElement(
                                  'a',
                                  {
                                    className: 'smart-transaction-status__support-link',
                                    key: 'smart-transaction-status-support-link',
                                    href: 'https://support.metamask.io',
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                  },
                                  $('customerSupport')
                                ),
                              ])),
                              (xe = n.default.createElement(O.default, null)));
                    we &&
                      se &&
                      (ke = (0, s.getBlockExplorerLink)(
                        { hash: we, chainId: ee },
                        { blockExplorerUrl: oe }
                      ));
                    const Pe = ue.cancellable && !W,
                      Oe = () =>
                        n.default.createElement(
                          g.default,
                          { marginBottom: 0 },
                          n.default.createElement(
                            'a',
                            {
                              className: 'smart-transaction-status__cancel-swap-link',
                              href: '#',
                              onClick: e => {
                                null == e || e.preventDefault(),
                                  U(!0),
                                  ye({
                                    event: 'Cancel STX',
                                    category: _.MetaMetricsEventCategory.Swaps,
                                    sensitiveProperties: he,
                                    properties: { hd_entropy_index: H },
                                  }),
                                  z((0, u.cancelSwapsSmartTransaction)(se));
                              },
                            },
                            $('attemptToCancelSwapForFree')
                          )
                        );
                    return n.default.createElement(
                      'div',
                      { className: 'smart-transaction-status' },
                      n.default.createElement(
                        g.default,
                        {
                          paddingLeft: 8,
                          paddingRight: 8,
                          height: y.BLOCK_SIZES.FULL,
                          justifyContent: y.JustifyContent.flexStart,
                          display: y.DISPLAY.FLEX,
                          className: 'smart-transaction-status__content',
                        },
                        n.default.createElement(
                          g.default,
                          {
                            marginTop: 10,
                            marginBottom: 0,
                            display: y.DISPLAY.FLEX,
                            justifyContent: y.JustifyContent.center,
                            alignItems: y.AlignItems.center,
                          },
                          n.default.createElement(
                            h.Text,
                            {
                              color: y.TextColor.textAlternative,
                              variant: y.TextVariant.bodySm,
                              as: 'h6',
                            },
                            `${(null == G ? void 0 : G.value) && Number(G.value).toFixed(5)} `
                          ),
                          n.default.createElement(
                            h.Text,
                            {
                              color: y.TextColor.textAlternative,
                              variant: y.TextVariant.bodySmBold,
                              as: 'h6',
                              marginLeft: 1,
                              marginRight: 2,
                            },
                            X.symbol ??
                              (null === (L = ue) || void 0 === L ? void 0 : L.sourceTokenSymbol)
                          ),
                          X.iconUrl
                            ? n.default.createElement(b.default, {
                                url: X.iconUrl,
                                className: 'smart-transactions-status-summary__icon',
                                name:
                                  X.symbol ??
                                  (null === (B = ue) || void 0 === B
                                    ? void 0
                                    : B.destinationTokenSymbol),
                                fallbackClassName:
                                  'smart-transactions-status-summary__icon-fallback',
                              })
                            : null,
                          n.default.createElement(
                            g.default,
                            { display: y.DISPLAY.BLOCK, marginLeft: 2, marginRight: 2 },
                            n.default.createElement(D.default, null)
                          ),
                          Q.iconUrl
                            ? n.default.createElement(b.default, {
                                url: Q.iconUrl,
                                className: 'smart-transactions-status-summary__icon',
                                name:
                                  Q.symbol ??
                                  (null === (F = ue) || void 0 === F
                                    ? void 0
                                    : F.destinationTokenSymbol),
                                fallbackClassName:
                                  'smart-transactions-status-summary__icon-fallback',
                              })
                            : null,
                          n.default.createElement(
                            h.Text,
                            {
                              color: y.TextColor.textAlternative,
                              variant: y.TextVariant.bodySm,
                              as: 'h6',
                              marginLeft: 2,
                            },
                            `~${ge && Number(ge).toFixed(5)} `
                          ),
                          n.default.createElement(
                            h.Text,
                            {
                              color: y.TextColor.textAlternative,
                              variant: y.TextVariant.bodySmBold,
                              as: 'h6',
                              marginLeft: 1,
                            },
                            Q.symbol ??
                              (null === (q = ue) || void 0 === q
                                ? void 0
                                : q.destinationTokenSymbol)
                          )
                        ),
                        n.default.createElement(g.default, {
                          marginTop: 3,
                          className: 'smart-transaction-status__spacer-box--top',
                        }),
                        xe &&
                          n.default.createElement(g.default, { marginTop: 3, marginBottom: 2 }, xe),
                        ve &&
                          n.default.createElement(
                            g.default,
                            {
                              marginTop: 7,
                              marginBottom: 1,
                              display: y.DISPLAY.FLEX,
                              justifyContent: y.JustifyContent.center,
                              alignItems: y.AlignItems.center,
                            },
                            n.default.createElement(I.default, null),
                            n.default.createElement(
                              h.Text,
                              {
                                color: y.TextColor.textAlternative,
                                variant: y.TextVariant.bodySm,
                                as: 'h6',
                                marginLeft: 1,
                              },
                              `${$('stxSwapCompleteIn')} `
                            ),
                            n.default.createElement(
                              h.Text,
                              {
                                color: y.TextColor.textAlternative,
                                variant: y.TextVariant.bodySmBold,
                                as: 'h6',
                                marginLeft: 1,
                                className: 'smart-transaction-status__remaining-time',
                              },
                              (0, T.showRemainingTimeInMinAndSec)(fe)
                            )
                          ),
                        n.default.createElement(
                          h.Text,
                          {
                            'data-testid': 'swap-smart-transaction-status-header',
                            color: y.TextColor.textDefault,
                            variant: y.TextVariant.headingSm,
                            as: 'h4',
                            fontWeight: y.FontWeight.Bold,
                          },
                          Ce
                        ),
                        ve &&
                          n.default.createElement(
                            'div',
                            { className: 'smart-transaction-status__loading-bar-container' },
                            n.default.createElement('div', {
                              className: 'smart-transaction-status__loading-bar',
                              style: {
                                width:
                                  (100 / ae.stxStatusDeadline) * (ae.stxStatusDeadline - fe) + '%',
                              },
                            })
                          ),
                        Ee &&
                          n.default.createElement(
                            h.Text,
                            {
                              'data-testid': 'swap-smart-transaction-status-description',
                              variant: y.TextVariant.bodySm,
                              as: 'h6',
                              marginTop: ke && 1,
                              color: y.TextColor.textAlternative,
                            },
                            Ee
                          ),
                        ke &&
                          n.default.createElement(C.default, {
                            blockExplorerUrl: ke,
                            sensitiveTrackingProperties: he,
                          }),
                        n.default.createElement(g.default, {
                          marginTop: 3,
                          className: 'smart-transaction-status__spacer-box--bottom',
                        }),
                        Te &&
                          n.default.createElement(
                            h.Text,
                            {
                              variant: y.TextVariant.bodySm,
                              as: 'h6',
                              marginTop: 8,
                              color: y.TextColor.textAlternative,
                            },
                            Te
                          )
                      ),
                      Pe && se && ve && n.default.createElement(Oe, null),
                      le === w.SmartTransactionStatus.success
                        ? n.default.createElement(k.default, { sensitiveTrackingProperties: he })
                        : null,
                      n.default.createElement(E.default, {
                        onSubmit: async () => {
                          _e
                            ? (await z((0, u.prepareToLeaveSwaps)()), V.push(m.DEFAULT_ROUTE))
                            : V.push(m.PREPARE_SWAP_ROUTE);
                        },
                        onCancel: async () => {
                          await z((0, u.prepareToLeaveSwaps)()), V.push(m.DEFAULT_ROUTE);
                        },
                        submitText: $(_e ? 'close' : 'tryAgain'),
                        hideCancel: _e,
                        cancelText: $('close'),
                        className: 'smart-transaction-status__swaps-footer',
                      })
                    );
                  });
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = j(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = e('@metamask/etherscan-link'),
                  i = e('lodash'),
                  l = e('../../../contexts/i18n'),
                  u = e('../../../ducks/swaps/swaps'),
                  c = e('../../../../shared/modules/selectors/networks'),
                  d = e('../../../selectors'),
                  p = e('../../../../shared/modules/selectors'),
                  f = e('../../../../shared/constants/common'),
                  m = e('../../../helpers/constants/routes'),
                  h = e('../../../components/component-library'),
                  g = A(e('../../../components/ui/box')),
                  b = A(e('../../../components/ui/url-icon')),
                  y = e('../../../helpers/constants/design-system'),
                  v = e('../../../store/actions'),
                  _ = e('../../../../shared/constants/metametrics'),
                  w = e('../../../../shared/constants/transaction'),
                  E = A(e('../swaps-footer')),
                  T = e('../swaps.util'),
                  x = e('../../../contexts/metametrics'),
                  k = A(e('../create-new-swap')),
                  C = A(e('../view-on-block-explorer')),
                  S = e('../../../../shared/lib/transactions-controller-utils'),
                  R = e('../../../selectors/selectors'),
                  P = A(e('./success-icon')),
                  O = A(e('./reverted-icon')),
                  M = A(e('./canceled-icon')),
                  N = A(e('./unknown-icon')),
                  D = A(e('./arrow-icon')),
                  I = A(e('./timer-icon'));
                function A(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function j(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (j = function (e) {
                    return e ? a : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/smart-transaction-status/smart-transaction-status.js',
      },
    ],
    [
      7576,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '39',
                        height: '39',
                        viewBox: '0 0 39 39',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M34.5457 19.8983C34.5457 23.9296 32.9443 27.7958 30.0937 30.6463C27.2432 33.4969 23.377 35.0983 19.3457 35.0983C15.3144 35.0983 11.4482 33.4969 8.59768 30.6463C5.74713 27.7958 4.1457 23.9296 4.1457 19.8983C4.1457 15.867 5.74713 12.0008 8.59768 9.15029C11.4482 6.29974 15.3144 4.69832 19.3457 4.69832C20.7897 4.69832 22.1957 4.90732 23.5257 5.28732L26.5087 2.30432C24.3047 1.39232 21.8917 0.898315 19.3457 0.898315C16.8506 0.898315 14.3799 1.38977 12.0747 2.3446C9.76953 3.29944 7.67499 4.69897 5.91067 6.46329C2.34748 10.0265 0.345703 14.8592 0.345703 19.8983C0.345703 24.9374 2.34748 29.7702 5.91067 33.3333C7.67499 35.0977 9.76953 36.4972 12.0747 37.452C14.3799 38.4069 16.8506 38.8983 19.3457 38.8983C24.3848 38.8983 29.2175 36.8965 32.7807 33.3333C36.3439 29.7702 38.3457 24.9374 38.3457 19.8983H34.5457ZM11.5747 16.2503L8.8957 18.9483L17.4457 27.4983L36.4457 8.49832L33.7667 5.80032L17.4457 22.1213L11.5747 16.2503Z',
                        fill: 'var(--color-success-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/success-icon.js' },
    ],
    [
      7577,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '15',
                        height: '14',
                        viewBox: '0 0 15 14',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('path', {
                        d: 'M7.36621 0.0810547C3.62012 0.0810547 0.584961 3.11621 0.584961 6.8623C0.584961 10.6084 3.62012 13.6436 7.36621 13.6436C11.1123 13.6436 14.1475 10.6084 14.1475 6.8623C14.1475 3.11621 11.1123 0.0810547 7.36621 0.0810547ZM7.36621 12.3311C4.33105 12.3311 1.89746 9.89746 1.89746 6.8623C1.89746 3.85449 4.33105 1.39355 7.36621 1.39355C10.374 1.39355 12.835 3.85449 12.835 6.8623C12.835 9.89746 10.374 12.3311 7.36621 12.3311ZM9.03418 9.4873C9.19824 9.59668 9.38965 9.56934 9.49902 9.40527L10.0186 8.72168C10.1279 8.55762 10.1006 8.36621 9.93652 8.25684L8.13184 6.91699V3.03418C8.13184 2.87012 7.96777 2.70605 7.80371 2.70605H6.92871C6.7373 2.70605 6.60059 2.87012 6.60059 3.03418V7.5459C6.60059 7.62793 6.62793 7.7373 6.70996 7.79199L9.03418 9.4873Z',
                        fill: 'var(--color-primary-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/timer-icon.js' },
    ],
    [
      7578,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function () {
                    return r.default.createElement(
                      'svg',
                      {
                        width: '39',
                        height: '39',
                        viewBox: '0 0 39 39',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      r.default.createElement('circle', {
                        cx: '19.1533',
                        cy: '19.2715',
                        r: '17.1',
                        stroke: 'var(--color-primary-default)',
                        strokeWidth: '3.8',
                      }),
                      r.default.createElement('path', {
                        d: 'M16.712 21.5034C16.712 20.7834 16.88 20.1834 17.216 19.7034C17.568 19.2074 18.08 18.7274 18.752 18.2634C19.008 18.0874 19.264 17.9274 19.52 17.7834C19.776 17.6394 20 17.4874 20.192 17.3274C20.4 17.1514 20.56 16.9674 20.672 16.7754C20.8 16.5674 20.864 16.3194 20.864 16.0314C20.864 15.5354 20.688 15.1594 20.336 14.9034C20 14.6474 19.592 14.5194 19.112 14.5194C18.616 14.5194 18.16 14.6794 17.744 14.9994C17.344 15.3034 17.144 15.7674 17.144 16.3914H13.52C13.52 15.6394 13.664 14.9354 13.952 14.2794C14.24 13.6074 14.632 13.0314 15.128 12.5514C15.64 12.0554 16.232 11.6634 16.904 11.3754C17.592 11.0874 18.328 10.9434 19.112 10.9434C19.896 10.9434 20.616 11.0794 21.272 11.3514C21.944 11.6234 22.512 11.9834 22.976 12.4314C23.456 12.8794 23.824 13.3994 24.08 13.9914C24.352 14.5674 24.488 15.1754 24.488 15.8154C24.488 16.2314 24.456 16.6234 24.392 16.9914C24.344 17.3594 24.24 17.7114 24.08 18.0474C23.936 18.3834 23.728 18.7114 23.456 19.0314C23.184 19.3514 22.84 19.6634 22.424 19.9674C21.784 20.4474 21.272 20.8234 20.888 21.0954C20.52 21.3674 20.336 21.6474 20.336 21.9354V21.9594H16.712V21.5034ZM18.512 28.4634C18.16 28.4634 17.824 28.3994 17.504 28.2714C17.2 28.1274 16.928 27.9434 16.688 27.7194C16.464 27.4794 16.28 27.2074 16.136 26.9034C16.008 26.5834 15.944 26.2474 15.944 25.8954C15.944 25.5434 16.008 25.2154 16.136 24.9114C16.28 24.5914 16.464 24.3194 16.688 24.0954C16.928 23.8554 17.2 23.6714 17.504 23.5434C17.824 23.3994 18.16 23.3274 18.512 23.3274C18.864 23.3274 19.192 23.3994 19.496 23.5434C19.816 23.6714 20.088 23.8554 20.312 24.0954C20.552 24.3194 20.736 24.5914 20.864 24.9114C21.008 25.2154 21.08 25.5434 21.08 25.8954C21.08 26.2474 21.008 26.5834 20.864 26.9034C20.736 27.2074 20.552 27.4794 20.312 27.7194C20.088 27.9434 19.816 28.1274 19.496 28.2714C19.192 28.3994 18.864 28.4634 18.512 28.4634Z',
                        fill: 'var(--color-primary-default)',
                      })
                    );
                  });
                var n,
                  r = (n = e('react')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/smart-transaction-status/unknown-icon.js' },
    ],
    [
      7579,
      {
        '../../../../shared/constants/swaps': 5815,
        '../../../components/component-library': 6402,
        '../../../components/component-library/banner-alert': 6358,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = h);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = m(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = f(e('prop-types')),
                  s = e('../../../contexts/i18n'),
                  i = e('../../../components/component-library/banner-alert'),
                  l = f(e('../../../components/ui/box')),
                  u = e('../../../helpers/constants/design-system'),
                  c = e('../../../components/component-library'),
                  d = e('../../../../shared/constants/swaps'),
                  p = e('../../../ducks/swaps/swaps');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (m = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function h({
                  swapsErrorKey: e,
                  showTransactionSettingsLink: t,
                  currentSlippage: a,
                }) {
                  const o = (0, n.useContext)(s.I18nContext),
                    f = (0, r.useDispatch)();
                  let m,
                    h,
                    g = u.SEVERITIES.DANGER;
                  const b = n.default.createElement(
                    c.Text,
                    { variant: u.TextVariant.bodyMd },
                    n.default.createElement(
                      c.ButtonLink,
                      {
                        onClick: e => {
                          e.preventDefault(), f((0, p.setTransactionSettingsOpened)(!0));
                        },
                        size: c.ButtonLinkSize.Inherit,
                      },
                      o('swapAdjustSlippage')
                    )
                  );
                  switch (e) {
                    case d.SLIPPAGE_VERY_HIGH_ERROR:
                      (m = o('swapSlippageOverLimitTitle')),
                        (h = n.default.createElement(
                          l.default,
                          null,
                          n.default.createElement(
                            c.Text,
                            { variant: u.TextVariant.bodyMd, as: 'h6' },
                            o('swapSlippageOverLimitDescription')
                          ),
                          b
                        ));
                      break;
                    case d.SLIPPAGE_HIGH_ERROR:
                      (g = u.SEVERITIES.WARNING),
                        (m = o('swapSlippageHighTitle')),
                        (h = n.default.createElement(
                          l.default,
                          null,
                          n.default.createElement(
                            c.Text,
                            { variant: u.TextVariant.bodyMd, as: 'h6' },
                            o('swapSlippageHighDescription', [a])
                          ),
                          t && b
                        ));
                      break;
                    case d.SLIPPAGE_LOW_ERROR:
                      (g = u.SEVERITIES.WARNING),
                        (m = o('swapSlippageLowTitle')),
                        (h = n.default.createElement(
                          l.default,
                          null,
                          n.default.createElement(
                            c.Text,
                            { variant: u.TextVariant.bodyMd, as: 'h6' },
                            o('swapSlippageLowDescription', [a])
                          ),
                          t && b
                        ));
                      break;
                    case d.SLIPPAGE_NEGATIVE_ERROR:
                      (m = o('swapSlippageNegativeTitle')),
                        (h = n.default.createElement(
                          l.default,
                          null,
                          n.default.createElement(
                            c.Text,
                            { variant: u.TextVariant.bodyMd, as: 'h6' },
                            o('swapSlippageNegativeDescription')
                          ),
                          b
                        ));
                      break;
                    case d.QUOTES_NOT_AVAILABLE_ERROR:
                      (m = o('swapQuotesNotAvailableErrorTitle')),
                        (h = n.default.createElement(
                          l.default,
                          null,
                          n.default.createElement(
                            c.Text,
                            { variant: u.TextVariant.bodyMd, as: 'h6' },
                            o('swapQuotesNotAvailableDescription')
                          ),
                          n.default.createElement(
                            c.ButtonLink,
                            {
                              size: c.ButtonLinkSize.Inherit,
                              textProps: {
                                variant: u.TextVariant.bodyMd,
                                alignItems: u.AlignItems.flexStart,
                              },
                              as: 'a',
                              href: 'https://support.metamask.io/token-swaps/user-guide-swaps/',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            },
                            o('swapLearnMore')
                          )
                        ));
                      break;
                    case d.ERROR_FETCHING_QUOTES:
                      (m = o('swapFetchingQuotesErrorTitle')),
                        (h = n.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.bodyMd, as: 'h6' },
                          o('swapFetchingQuotesErrorDescription')
                        ));
                      break;
                    case d.CONTRACT_DATA_DISABLED_ERROR:
                      (m = o('swapContractDataDisabledErrorTitle')),
                        (h = n.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.bodyMd, as: 'h6' },
                          o('swapContractDataDisabledErrorDescription')
                        ));
                      break;
                    case d.QUOTES_EXPIRED_ERROR:
                      (m = o('swapQuotesExpiredErrorTitle')),
                        (h = n.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.bodyMd, as: 'h6' },
                          o('swapQuotesExpiredErrorDescription')
                        ));
                      break;
                    case d.OFFLINE_FOR_MAINTENANCE:
                      (m = o('offlineForMaintenance')),
                        (h = n.default.createElement(
                          c.Text,
                          { variant: u.TextVariant.bodyMd, as: 'h6' },
                          o('metamaskSwapsOfflineDescription')
                        ));
                      break;
                    case d.SWAP_FAILED_ERROR:
                      m = o('swapFailedErrorTitle');
                  }
                  return n.default.createElement(
                    i.BannerAlert,
                    { severity: g, title: m, titleProps: { 'data-testid': 'swaps-banner-title' } },
                    h
                  );
                }
                h.propTypes = {
                  swapsErrorKey: o.default.string,
                  showTransactionSettingsLink: o.default.bool,
                  currentSlippage: o.default.number,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/swaps-banner-alert/swaps-banner-alert.js' },
    ],
    [
      758,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                (() => {
                  var t = {
                      n: e => {
                        var a = e && e.__esModule ? () => e.default : () => e;
                        return t.d(a, { a: a }), a;
                      },
                      d: (e, a) => {
                        for (var n in a)
                          t.o(a, n) &&
                            !t.o(e, n) &&
                            Object.defineProperty(e, n, { enumerable: !0, get: a[n] });
                      },
                      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
                      r: e => {
                        'undefined' != typeof Symbol &&
                          Symbol.toStringTag &&
                          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                          Object.defineProperty(e, '__esModule', { value: !0 });
                      },
                    },
                    n = {};
                  t.r(n), t.d(n, { LavaDome: () => he, toLavaDomeToken: () => me });
                  const r = e('react');
                  var o = t.n(r);
                  const {
                      Object: s,
                      Array: i,
                      Function: l,
                      Math: u,
                      parseInt: c,
                      WeakMap: d,
                      Error: p,
                      JSON: f,
                      navigation: m,
                    } = globalThis,
                    {
                      defineProperties: h,
                      assign: g,
                      getOwnPropertyDescriptor: b,
                      entries: y,
                      create: v,
                      hasOwn: _,
                    } = s,
                    { from: w } = i,
                    { random: E } = u,
                    { stringify: T } = f,
                    x = (e, t, a) => e && l.prototype.call.bind(b(e, t)[a]),
                    k = x(globalThis?.Node?.prototype, 'ownerDocument', 'get'),
                    C = x(globalThis?.EventTarget?.prototype, 'addEventListener', 'value'),
                    S = x(globalThis?.DocumentFragment?.prototype, 'replaceChildren', 'value'),
                    R = x(globalThis?.Element?.prototype, 'attachShadow', 'value'),
                    P = x(globalThis?.Document?.prototype, 'createElement', 'value'),
                    O = x(globalThis?.Node?.prototype, 'appendChild', 'value'),
                    M = x(globalThis?.Node?.prototype, 'textContent', 'set'),
                    N = x(globalThis?.Element?.prototype, 'setAttribute', 'value'),
                    D = x(globalThis?.String?.prototype, 'toUpperCase', 'value'),
                    I = x(globalThis?.String?.prototype, 'includes', 'value'),
                    A = x(globalThis?.Array?.prototype, 'map', 'value'),
                    j = x(globalThis?.Array?.prototype, 'join', 'value'),
                    L = x(globalThis?.Array?.prototype, 'keys', 'value'),
                    B = x(globalThis?.Array?.prototype, 'at', 'value'),
                    F = x(globalThis?.WeakMap?.prototype, 'get', 'value'),
                    q = x(globalThis?.WeakMap?.prototype, 'set', 'value'),
                    W = x(globalThis?.Number?.prototype, 'toFixed', 'value'),
                    U = x(globalThis?.NavigateEvent?.prototype, 'destination', 'get'),
                    $ = x(globalThis?.NavigationDestination?.prototype, 'url', 'get'),
                    V = x(globalThis?.Event?.prototype, 'preventDefault', 'value'),
                    z = x(globalThis?.Event?.prototype, 'stopPropagation', 'value'),
                    H = {
                      isInnerInstance: Symbol('isInnerInstance'),
                      unsafeOpenModeShadow: 'unsafeOpenModeShadow',
                    },
                    G = e =>
                      function (t, a, n) {
                        const r = e[t];
                        return _(e, t) ? (typeof r !== a ? n : r) : n;
                      },
                    Q = 'abcdefghijklmnopqrstuvwxyz',
                    X = '0123456789',
                    K = '!@#$%^&*()?.;:"\'[]{}+=-_/',
                    Z = {
                      letters: Q,
                      digits: X,
                      symbols: K,
                      alphanumeric: Q + X,
                      all: Q + D(Q) + X + K,
                    },
                    { letters: Y, alphanumeric: J, all: ee } = Z,
                    te = (e, t) => e[c(W(E() * t))],
                    ae = e =>
                      te(Y, 26) +
                      j(
                        A(w(L(i(e))), () => te(J, 36)),
                        ''
                      );
                  function ne(e, t, a = '') {
                    return (
                      (e = j(
                        A(y(e), ([e, t]) => `${e}: ${t} !important`),
                        '; '
                      )),
                      function () {
                        const n = P(document, t());
                        return N(n, 'style', e), M(n, a), n;
                      }
                    );
                  }
                  const re = e => () => e(),
                    oe = re(
                      ne(
                        {
                          'font-family': ae(20),
                          '-webkit-user-modify': 'unset',
                          '-webkit-user-select': 'none',
                          'user-select': 'none',
                        },
                        () => ae(7)
                      )
                    ),
                    se = re(
                      ne(
                        { top: '-10px', right: '-10px', position: 'fixed', 'font-size': '1px' },
                        () => 'span',
                        ee
                      )
                    ),
                    ie = re(ne({ display: 'none' }, () => 'iframe')),
                    le = new d();
                  function ue(e, t) {
                    (t = (function (e = {}) {
                      const { unsafeOpenModeShadow: t, isInnerInstance: a } = H,
                        n = G(g(v(null), e)),
                        r = v(null);
                      return (
                        (r.isInnerInstance = n(a, 'boolean', !1)),
                        (r.unsafeOpenModeShadow = n(t, 'boolean', !1)),
                        r
                      );
                    })(t)),
                      h(this, {
                        text: {
                          value: function (e) {
                            if ('string' != typeof e)
                              throw new p(
                                `LavaDomeCore: first argument must be a string, instead got ${T(e)}`
                              );
                            if (void 0 === B(w(e), 1)) return M(r, e);
                            O(a, n),
                              A(w(e), e => {
                                const a = P(document, 'span');
                                (t[H.isInnerInstance] = !0), new ue(a, t).text(e), O(r, a);
                              }),
                              O(r, se());
                          },
                        },
                      });
                    const a = (function (e, t) {
                      const { unsafeOpenModeShadow: a, isInnerInstance: n } = t;
                      let r = F(le, e);
                      if (!r) {
                        const t = { mode: 'closed' };
                        a &&
                          ((t.mode = 'open'),
                          n ||
                            console.warn(
                              'LavaDome:',
                              `Initiated with "${H.unsafeOpenModeShadow}" set to true.`,
                              'This leaves LavaDome fully vulnerable, ONLY USE FOR TESTING!'
                            )),
                          (r = R(e, t)),
                          q(le, e, r);
                      }
                      return r;
                    })(e, t);
                    S(a);
                    const n = ie();
                    C(n, 'load', () => {
                      if (k(n) !== document)
                        throw (
                          (S(a),
                          new p(
                            'LavaDomeCore: The document to which LavaDome was originally introduced must be the same as the one this instance is inserted to'
                          ))
                        );
                    });
                    const r = oe();
                    O(a, r);
                  }
                  m?.addEventListener('navigate', e => {
                    const t = $(U(e));
                    if (I(t, ':~:'))
                      throw (
                        (V(e),
                        z(e),
                        new p(
                          'LavaDomeCore: in-app redirection to text-fragments links is blocked to ensure security'
                        ))
                      );
                  });
                  const { all: ce } = Z,
                    de = new d(),
                    pe = new d(),
                    fe = v(null),
                    me = e => {
                      if ('string' != typeof e)
                        throw new Error(
                          `LavaDomeReact: first argument must be a string, instead got ${T(e)}`
                        );
                      if (!_(fe, e)) {
                        const t = v(null);
                        (fe[e] = t), q(de, t, e);
                      }
                      return fe[e];
                    },
                    he = ({ text: e, unsafeOpenModeShadow: t }) => {
                      const a = e,
                        n = (0, r.useRef)(null);
                      return o().createElement(
                        'span',
                        {
                          ref: n,
                          __source: {
                            fileName:
                              '/Users/weizman/Documents/lavamoat/lavadome/packages/react/src/lavadome.jsx',
                            lineNumber: 57,
                            columnNumber: 9,
                          },
                          __self: void 0,
                        },
                        o().createElement(ge, {
                          host: n,
                          token: a,
                          unsafeOpenModeShadow: t,
                          __source: {
                            fileName:
                              '/Users/weizman/Documents/lavamoat/lavadome/packages/react/src/lavadome.jsx',
                            lineNumber: 58,
                            columnNumber: 13,
                          },
                          __self: void 0,
                        })
                      );
                    };
                  function ge({ host: e, token: t, unsafeOpenModeShadow: a }) {
                    const n = (function (e) {
                        const t = F(de, e);
                        if (!_(fe, t))
                          throw new Error(
                            'LavaDomeReact: first argument must be a valid LavaDome token (replace "text={\'secret\'}" with "text={toLavaDomeToken(\'secret\')}")'
                          );
                        return t;
                      })(t),
                      s = (function (e) {
                        let t = F(pe, e);
                        return t || ((t = v(null)), q(pe, e, t)), t;
                      })(t);
                    return (
                      (0, r.useEffect)(() => {
                        new ue(e.current, { unsafeOpenModeShadow: a }).text(n);
                      }, [s]),
                      o().createElement(o().Fragment, null)
                    );
                  }
                  var be = a;
                  for (var ye in n) be[ye] = n[ye];
                  n.__esModule && Object.defineProperty(be, '__esModule', { value: !0 });
                })();
              };
            };
      },
      {
        package: '@lavamoat/lavadome-react',
        file: 'node_modules/@lavamoat/lavadome-react/build/main.js',
      },
    ],
    [
      7580,
      { './swaps-footer': 7581 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./swaps-footer')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/swaps-footer/index.js' },
    ],
    [
      7581,
      {
        '../../../components/ui/page-container/page-container-footer': 6784,
        '../../../contexts/i18n': 6832,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = c);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = u(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  s = e('../../../contexts/i18n'),
                  i = l(e('../../../components/ui/page-container/page-container-footer'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (u = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function c({
                  onCancel: e,
                  hideCancel: t,
                  onSubmit: a,
                  submitText: r,
                  disabled: l,
                  showTermsOfService: u,
                  showTopBorder: c,
                  className: d = '',
                  cancelText: p,
                }) {
                  const f = (0, n.useContext)(s.I18nContext);
                  return n.default.createElement(
                    'div',
                    { className: 'swaps-footer' },
                    n.default.createElement(
                      'div',
                      {
                        className: (0, o.default)('swaps-footer__buttons', d, {
                          'swaps-footer__buttons--border': c,
                        }),
                      },
                      n.default.createElement(i.default, {
                        onCancel: e,
                        hideCancel: t,
                        cancelText: p || f('back'),
                        onSubmit: a,
                        submitText: r,
                        footerClassName: (0, o.default)(
                          'swaps-footer__custom-page-container-footer-class',
                          d
                        ),
                        footerButtonClassName: (0, o.default)(
                          'swaps-footer__custom-page-container-footer-button-class',
                          { 'swaps-footer__custom-page-container-footer-button-class--single': t }
                        ),
                        disabled: l,
                      })
                    ),
                    u &&
                      n.default.createElement(
                        'div',
                        {
                          className: 'swaps-footer__bottom-text',
                          onClick: () =>
                            global.platform.openTab({ url: 'https://metamask.io/terms.html' }),
                        },
                        f('termsOfService')
                      )
                  );
                }
                c.propTypes = {
                  onCancel: r.default.func,
                  hideCancel: r.default.bool,
                  onSubmit: r.default.func,
                  submitText: r.default.string,
                  disabled: r.default.bool,
                  showTermsOfService: r.default.bool,
                  showTopBorder: r.default.bool,
                  className: r.default.string,
                  cancelText: r.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/swaps-footer/swaps-footer.js' },
    ],
    [
      7584,
      {
        '../../../../shared/constants/swaps': 5815,
        '../../../components/component-library': 6402,
        '../../../components/component-library/modal-content/deprecated': 6412,
        '../../../components/component-library/modal-header/deprecated': 6421,
        '../../../components/ui/box': 6703,
        '../../../components/ui/button': 6707,
        '../../../components/ui/button-group': 6705,
        '../../../components/ui/info-tooltip': 6759,
        '../../../components/ui/typography': 6822,
        '../../../contexts/i18n': 6832,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../store/actions': 7619,
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
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = E);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = w(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = e('react-redux'),
                  o = _(e('prop-types')),
                  s = _(e('classnames')),
                  i = e('../../../contexts/i18n'),
                  l = _(e('../../../components/ui/button-group')),
                  u = _(e('../../../components/ui/button')),
                  c = _(e('../../../components/ui/info-tooltip')),
                  d = _(e('../../../components/ui/box')),
                  p = _(e('../../../components/ui/typography')),
                  f = e('../../../helpers/constants/design-system'),
                  m = e('../../../../shared/constants/swaps'),
                  h = e('../../../components/component-library'),
                  g = e('../../../components/component-library/modal-content/deprecated'),
                  b = e('../../../components/component-library/modal-header/deprecated'),
                  y = e('../../../store/actions'),
                  v = e('../../../ducks/swaps/swaps');
                function _(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function w(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (w = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function E({
                  onSelect: e,
                  onModalClose: t,
                  maxAllowedSlippage: a,
                  currentSlippage: o,
                  isDirectWrappingEnabled: _,
                  sourceTokenSymbol: w,
                  destinationTokenSymbol: E,
                }) {
                  const T = (0, n.useContext)(i.I18nContext),
                    x = (0, r.useDispatch)(),
                    k = (0, r.useSelector)(v.getSwapsErrorKey),
                    [C, S] = (0, n.useState)(() =>
                      'number' != typeof o || Object.values(m.Slippage).includes(o)
                        ? ''
                        : o.toString()
                    ),
                    [R, P] = (0, n.useState)(!1),
                    [O, M] = (0, n.useState)(() =>
                      o === m.Slippage.high
                        ? 1
                        : o === m.Slippage.default || o === m.Slippage.stable
                          ? 0
                          : 'number' == typeof o
                            ? 2
                            : 0
                    ),
                    [N, D] = (0, n.useState)(null),
                    [I, A] = (0, n.useState)(o),
                    j = I !== o;
                  let L = '',
                    B = '',
                    F = f.SEVERITIES.INFO;
                  C &&
                    (Number(C) < 0
                      ? ((F = f.SEVERITIES.DANGER),
                        (L = T('swapSlippageNegativeDescription')),
                        (B = T('swapSlippageNegativeTitle')),
                        x((0, y.setSwapsErrorKey)(m.SLIPPAGE_NEGATIVE_ERROR)))
                      : Number(C) > 0 && Number(C) <= 1
                        ? ((F = f.SEVERITIES.WARNING),
                          (L = T('swapSlippageLowDescription', [I])),
                          (B = T('swapSlippageLowTitle')))
                        : Number(C) >= 5 && Number(C) <= a
                          ? ((F = f.SEVERITIES.WARNING),
                            (L = T('swapSlippageHighDescription', [I])),
                            (B = T('swapSlippageHighTitle')))
                          : Number(C) > a
                            ? ((F = f.SEVERITIES.DANGER),
                              (L = T('swapSlippageOverLimitDescription')),
                              (B = T('swapSlippageOverLimitTitle')),
                              x((0, y.setSwapsErrorKey)(m.SLIPPAGE_VERY_HIGH_ERROR)))
                            : 0 === Number(C)
                              ? ((F = f.SEVERITIES.INFO),
                                (L = T('swapSlippageZeroDescription')),
                                (B = T('swapSlippageZeroTitle')))
                              : k && x((0, y.setSwapsErrorKey)('')));
                  const q = F === f.SEVERITIES.DANGER,
                    W = C || T('swapCustom');
                  return (
                    (0, n.useEffect)(() => {
                      N && R && window.document.activeElement !== N && N.focus();
                    }, [N, R]),
                    (0, n.useEffect)(() => {
                      2 !== O && x((0, y.setSwapsErrorKey)(''));
                    }, [x, O]),
                    n.default.createElement(
                      h.Modal,
                      {
                        onClose: t,
                        isOpen: !0,
                        isClosedOnOutsideClick: !1,
                        isClosedOnEscapeKey: !0,
                        className: 'mm-modal__custom-scrollbar',
                      },
                      n.default.createElement(h.ModalOverlay, null),
                      n.default.createElement(
                        g.ModalContent,
                        null,
                        n.default.createElement(
                          b.ModalHeader,
                          { onClose: t },
                          T('transactionSettings')
                        ),
                        n.default.createElement(
                          d.default,
                          {
                            display: f.DISPLAY.FLEX,
                            flexDirection: f.FlexDirection.Column,
                            justifyContent: f.JustifyContent.spaceBetween,
                            alignItems: f.AlignItems.stretch,
                            className: 'transaction-settings__content',
                          },
                          n.default.createElement(
                            d.default,
                            { marginTop: 7, marginBottom: 5 },
                            n.default.createElement(
                              n.default.Fragment,
                              null,
                              !_ &&
                                n.default.createElement(
                                  n.default.Fragment,
                                  null,
                                  n.default.createElement(
                                    d.default,
                                    { display: f.DISPLAY.FLEX, alignItems: f.AlignItems.center },
                                    n.default.createElement(
                                      p.default,
                                      {
                                        variant: f.TypographyVariant.H6,
                                        boxProps: { paddingRight: 2 },
                                      },
                                      T('swapsMaxSlippage')
                                    ),
                                    n.default.createElement(c.default, {
                                      position: 'top',
                                      iconFillColor: 'var(--color-icon-muted)',
                                      contentText: T('swapSlippageTooltip'),
                                    })
                                  ),
                                  n.default.createElement(
                                    l.default,
                                    {
                                      defaultActiveButtonIndex: 2 !== O || C ? O : 1,
                                      variant: 'radiogroup',
                                      newActiveButtonIndex: O,
                                      className: (0, s.default)(
                                        'transaction-settings__button-group'
                                      ),
                                      style: { width: f.BlockSize.Half },
                                    },
                                    n.default.createElement(
                                      u.default,
                                      {
                                        onClick: () => {
                                          S(''),
                                            P(!1),
                                            M(0),
                                            A(
                                              (0, m.isStablePair)(w, E)
                                                ? m.Slippage.stable
                                                : m.Slippage.default
                                            );
                                        },
                                      },
                                      T('swapSlippagePercent', [
                                        (0, m.isStablePair)(w, E)
                                          ? m.Slippage.stable
                                          : m.Slippage.default,
                                      ])
                                    ),
                                    n.default.createElement(
                                      u.default,
                                      {
                                        onClick: () => {
                                          S(''), P(!1), M(1), A(m.Slippage.high);
                                        },
                                      },
                                      T('swapSlippagePercent', [m.Slippage.high])
                                    ),
                                    n.default.createElement(
                                      u.default,
                                      {
                                        className: (0, s.default)(
                                          'transaction-settings__button-group-custom-button',
                                          { 'radio-button--danger': q }
                                        ),
                                        onClick: () => {
                                          M(2), P(!0);
                                        },
                                      },
                                      R
                                        ? n.default.createElement(
                                            'div',
                                            {
                                              className: (0, s.default)(
                                                'transaction-settings__custom-input',
                                                { 'transaction-settings__custom-input--danger': q }
                                              ),
                                            },
                                            n.default.createElement('input', {
                                              'data-testid': 'transaction-settings-custom-slippage',
                                              onChange: e => {
                                                const { value: t } = e.target;
                                                !isNaN(Number(t)) && (S(t), A(Number(t)));
                                              },
                                              type: 'text',
                                              maxLength: '4',
                                              ref: D,
                                              onBlur: () => {
                                                P(!1);
                                              },
                                              onKeyDown: e => {
                                                'Enter' === e.key && P(!1);
                                              },
                                              value: C || '',
                                            })
                                          )
                                        : W,
                                      (C || R) &&
                                        n.default.createElement(
                                          'div',
                                          { className: 'transaction-settings__percentage-suffix' },
                                          '%'
                                        )
                                    )
                                  )
                                )
                            ),
                            L &&
                              n.default.createElement(
                                d.default,
                                { marginTop: 5 },
                                n.default.createElement(
                                  h.BannerAlert,
                                  {
                                    severity: F,
                                    title: B,
                                    titleProps: { 'data-testid': 'swaps-banner-title' },
                                  },
                                  n.default.createElement(
                                    p.default,
                                    {
                                      variant: f.TypographyVariant.H6,
                                      testId: 'mm-banner-alert-notification-text',
                                    },
                                    L
                                  )
                                )
                              )
                          ),
                          n.default.createElement(
                            d.default,
                            { marginTop: 5 },
                            n.default.createElement(
                              h.ButtonPrimary,
                              {
                                onClick: () => {
                                  I !== o && e(I), t();
                                },
                                block: !0,
                                disabled: !j,
                                'data-testid': 'update-transaction-settings-button',
                              },
                              T('update')
                            )
                          )
                        )
                      )
                    )
                  );
                }
                E.propTypes = {
                  onSelect: o.default.func.isRequired,
                  onModalClose: o.default.func.isRequired,
                  maxAllowedSlippage: o.default.number.isRequired,
                  currentSlippage: o.default.number,
                  isDirectWrappingEnabled: o.default.bool,
                  sourceTokenSymbol: o.default.string,
                  destinationTokenSymbol: o.default.string,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/transaction-settings/transaction-settings.js' },
    ],
    [
      7585,
      { './view-on-block-explorer': 7586 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var n,
                  r = (n = e('./view-on-block-explorer')) && n.__esModule ? n : { default: n };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/swaps/view-on-block-explorer/index.js' },
    ],
    [
      7586,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/ui/box': 6703,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/utils/util': 6921,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = p);
                var n = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = d(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  r = c(e('prop-types')),
                  o = c(e('../../../components/ui/box')),
                  s = e('../../../contexts/i18n'),
                  i = e('../../../helpers/utils/util'),
                  l = e('../../../contexts/metametrics'),
                  u = e('../../../../shared/constants/metametrics');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (d = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function p({ blockExplorerUrl: e, sensitiveTrackingProperties: t }) {
                  const a = (0, n.useContext)(s.I18nContext),
                    r = (0, n.useContext)(l.MetaMetricsContext),
                    c = (0, i.getURLHostName)(e);
                  return n.default.createElement(
                    o.default,
                    { marginTop: 6, className: 'view-on-block-explorer' },
                    n.default.createElement(
                      'button',
                      {
                        onClick: () => {
                          r({
                            event: u.MetaMetricsEventName.ExternalLinkClicked,
                            category: u.MetaMetricsEventCategory.Swaps,
                            sensitiveProperties: t,
                            properties: {
                              link_type: u.MetaMetricsEventLinkType.TransactionBlockExplorer,
                              location: 'Swap Transaction',
                              url_domain: c,
                            },
                          }),
                            global.platform.openTab({ url: e });
                        },
                      },
                      a('viewOnCustomBlockExplorer', [a('blockExplorerSwapAction'), c])
                    )
                  );
                }
                p.propTypes = {
                  blockExplorerUrl: r.default.string.isRequired,
                  sensitiveTrackingProperties: r.default.object.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/swaps/view-on-block-explorer/view-on-block-explorer.js',
      },
    ],
    [
      7587,
      { './unlock-page.container': 7589 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = (n = e('./unlock-page.container')) && n.__esModule ? n : { default: n };
                a.default = r.default;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/unlock-page/index.js' },
    ],
    [
      7588,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../../shared/lib/ui-utils': 5852,
        '../../components/component-library': 6402,
        '../../components/ui/button': 6707,
        '../../components/ui/mascot': 6771,
        '../../components/ui/text-field': 6810,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../helpers/utils/build-types': 6897,
        './unlock-page.util': 7590,
        events: 4465,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n = e('events'),
                  r = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var a = b(t);
                    if (a && a.has(e)) return a.get(e);
                    var n = { __proto__: null },
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(n, o, s) : (n[o] = e[o]);
                      }
                    return (n.default = e), a && a.set(e, n), n;
                  })(e('react')),
                  o = g(e('prop-types')),
                  s = e('../../components/component-library'),
                  i = e('../../helpers/constants/design-system'),
                  l = g(e('../../components/ui/button')),
                  u = g(e('../../components/ui/text-field')),
                  c = g(e('../../components/ui/mascot')),
                  d = e('../../helpers/constants/routes'),
                  p = e('../../../shared/constants/metametrics'),
                  f = e('../../../shared/lib/ui-utils'),
                  m = e('../../helpers/utils/build-types'),
                  h = e('./unlock-page.util');
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function b(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    a = new WeakMap();
                  return (b = function (e) {
                    return e ? a : t;
                  })(e);
                }
                function y(e, t, a) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var a = e[Symbol.toPrimitive];
                        if (void 0 !== a) {
                          var n = a.call(e, t || 'default');
                          if ('object' != typeof n) return n;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: a,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = a),
                    e
                  );
                }
                class v extends r.Component {
                  constructor(...e) {
                    super(...e),
                      y(this, 'state', { password: '', error: null }),
                      y(this, 'submitting', !1),
                      y(this, 'failed_attempts', 0),
                      y(this, 'animationEventEmitter', new n.EventEmitter()),
                      y(this, 'handleSubmit', async e => {
                        e.preventDefault(), e.stopPropagation();
                        const { password: t } = this.state,
                          { onSubmit: a, forceUpdateMetamaskState: n } = this.props;
                        if ('' !== t && !this.submitting) {
                          this.setState({ error: null }), (this.submitting = !0);
                          try {
                            await a(t),
                              this.context.trackEvent(
                                {
                                  category: p.MetaMetricsEventCategory.Navigation,
                                  event: p.MetaMetricsEventName.AppUnlocked,
                                  properties: { failed_attempts: this.failed_attempts },
                                },
                                { isNewVisit: !0 }
                              );
                          } catch ({ message: e }) {
                            (this.failed_attempts += 1),
                              'Incorrect password' === e &&
                                (await n(),
                                this.context.trackEvent({
                                  category: p.MetaMetricsEventCategory.Navigation,
                                  event: p.MetaMetricsEventName.AppUnlockedFailed,
                                  properties: {
                                    reason: 'incorrect_password',
                                    failed_attempts: this.failed_attempts,
                                  },
                                })),
                              this.setState({ error: e }),
                              (this.submitting = !1);
                          }
                        }
                      }),
                      y(this, 'renderMascot', () =>
                        (0, m.isFlask)() || (0, m.isBeta)()
                          ? r.default.createElement('img', {
                              src: './images/logo/metamask-fox.svg',
                              width: '120',
                              height: '120',
                            })
                          : r.default.createElement(c.default, {
                              animationEventEmitter: this.animationEventEmitter,
                              width: '120',
                              height: '120',
                            })
                      );
                  }
                  UNSAFE_componentWillMount() {
                    const { isUnlocked: e, history: t } = this.props;
                    e && t.push(d.DEFAULT_ROUTE);
                  }
                  handleInputChange({ target: e }) {
                    if (
                      (this.setState({ password: e.value, error: null }), e.getBoundingClientRect)
                    ) {
                      const t = e,
                        a = t.getBoundingClientRect(),
                        n = (0, h.getCaretCoordinates)(t, t.selectionEnd);
                      this.animationEventEmitter.emit('point', {
                        x: a.left + n.left - t.scrollLeft,
                        y: a.top + n.top - t.scrollTop,
                      });
                    }
                  }
                  renderSubmitButton() {
                    return r.default.createElement(
                      l.default,
                      {
                        type: 'submit',
                        'data-testid': 'unlock-submit',
                        style: {
                          backgroundColor: 'var(--color-primary-default)',
                          color: 'var(--color-primary-inverse)',
                          marginTop: '20px',
                          height: '60px',
                          fontWeight: '400',
                          boxShadow: 'none',
                          borderRadius: '100px',
                        },
                        disabled: !this.state.password,
                        variant: 'contained',
                        size: 'large',
                        onClick: this.handleSubmit,
                      },
                      this.context.t('unlock')
                    );
                  }
                  render() {
                    const { password: e, error: t } = this.state,
                      { t: a } = this.context,
                      { onRestore: n } = this.props,
                      o = a('needHelpLinkText');
                    return r.default.createElement(
                      'div',
                      { className: 'unlock-page__container' },
                      r.default.createElement(
                        'div',
                        { className: 'unlock-page', 'data-testid': 'unlock-page' },
                        r.default.createElement(
                          'div',
                          { className: 'unlock-page__mascot-container' },
                          this.renderMascot(),
                          (0, m.isBeta)()
                            ? r.default.createElement(
                                'div',
                                { className: 'unlock-page__mascot-container__beta' },
                                a('beta')
                              )
                            : null
                        ),
                        r.default.createElement(
                          s.Text,
                          {
                            'data-testid': 'unlock-page-title',
                            as: 'h1',
                            variant: i.TextVariant.headingLg,
                            marginTop: 1,
                            color: i.TextColor.textDefault,
                          },
                          a('welcomeBack')
                        ),
                        r.default.createElement(
                          s.Text,
                          { color: i.TextColor.textAlternative },
                          a('unlockMessage')
                        ),
                        r.default.createElement(
                          'form',
                          { className: 'unlock-page__form', onSubmit: this.handleSubmit },
                          r.default.createElement(u.default, {
                            id: 'password',
                            'data-testid': 'unlock-password',
                            label: a('password'),
                            type: 'password',
                            value: e,
                            onChange: e => this.handleInputChange(e),
                            error: t,
                            autoFocus: !0,
                            autoComplete: 'current-password',
                            theme: 'material',
                            fullWidth: !0,
                          })
                        ),
                        this.renderSubmitButton(),
                        r.default.createElement(
                          'div',
                          { className: 'unlock-page__links' },
                          r.default.createElement(
                            l.default,
                            {
                              type: 'link',
                              key: 'import-account',
                              className: 'unlock-page__link',
                              onClick: () => n(),
                            },
                            a('forgotPassword')
                          )
                        ),
                        r.default.createElement(
                          'div',
                          { className: 'unlock-page__support' },
                          a('needHelp', [
                            r.default.createElement(
                              'a',
                              {
                                href: f.SUPPORT_LINK,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                key: 'need-help-link',
                                onClick: () => {
                                  this.context.trackEvent(
                                    {
                                      category: p.MetaMetricsEventCategory.Navigation,
                                      event: p.MetaMetricsEventName.SupportLinkClicked,
                                      properties: { url: f.SUPPORT_LINK },
                                    },
                                    {
                                      contextPropsIntoEventProperties: [
                                        p.MetaMetricsContextProp.PageTitle,
                                      ],
                                    }
                                  );
                                },
                              },
                              o
                            ),
                          ])
                        )
                      )
                    );
                  }
                }
                (a.default = v),
                  y(v, 'contextTypes', { trackEvent: o.default.func, t: o.default.func }),
                  y(v, 'propTypes', {
                    history: o.default.object.isRequired,
                    isUnlocked: o.default.bool,
                    onRestore: o.default.func,
                    onSubmit: o.default.func,
                    forceUpdateMetamaskState: o.default.func,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/unlock-page/unlock-page.component.js' },
    ],
    [
      7589,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/app': 5789,
        '../../helpers/constants/routes': 6878,
        '../../store/actions': 7619,
        './unlock-page.component': 7588,
        'react-redux': 5286,
        'react-router-dom': 5313,
        redux: 5346,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var n,
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  s = e('redux'),
                  i = e('../../../app/scripts/lib/util'),
                  l = e('../../../shared/constants/app'),
                  u = e('../../helpers/constants/routes'),
                  c = e('../../store/actions'),
                  d = (n = e('./unlock-page.component')) && n.__esModule ? n : { default: n };
                a.default = (0, s.compose)(
                  o.withRouter,
                  (0, r.connect)(
                    e => {
                      const {
                        metamask: { isUnlocked: t },
                      } = e;
                      return { isUnlocked: t };
                    },
                    e => ({
                      tryUnlockMetamask: t => e((0, c.tryUnlockMetamask)(t)),
                      markPasswordForgotten: () => e((0, c.markPasswordForgotten)()),
                      forceUpdateMetamaskState: () => (0, c.forceUpdateMetamaskState)(e),
                    }),
                    (e, t, a) => {
                      const { markPasswordForgotten: n, tryUnlockMetamask: r, ...o } = t,
                        { history: s, onSubmit: c, ...d } = a;
                      return {
                        ...e,
                        ...o,
                        ...d,
                        onRestore: async () => {
                          await n(),
                            s.push(u.RESTORE_VAULT_ROUTE),
                            (0, i.getEnvironmentType)() === l.ENVIRONMENT_TYPE_POPUP &&
                              global.platform.openExtensionInBrowser(u.RESTORE_VAULT_ROUTE);
                        },
                        onSubmit:
                          c ||
                          (async e => {
                            await r(e), s.push(u.DEFAULT_ROUTE);
                          }),
                        history: s,
                      };
                    }
                  )
                )(d.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/unlock-page/unlock-page.container.js' },
    ],
    [
      7590,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getCaretCoordinates = function (e, t) {
                    const a = document.createElement('div');
                    (a.id = 'password-mirror-div'), document.body.appendChild(a);
                    const n = window.getComputedStyle(e);
                    a.textContent = new Array(t + 1).join('•');
                    const r = document.createElement('span');
                    (r.textContent = '•'), a.appendChild(r);
                    const o = {
                      top: r.offsetTop + parseInt(n.borderTopWidth, 10),
                      left: r.offsetLeft + parseInt(n.borderLeftWidth, 10),
                    };
                    return document.body.removeChild(a), o;
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/unlock-page/unlock-page.util.js' },
    ],
    [
      7591,
      { reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getIsUsingPaymaster = function (e) {
                    var t;
                    const a = s(e);
                    if (!a) return !1;
                    const n =
                      null === (t = a.userOperation) || void 0 === t ? void 0 : t.paymasterAndData;
                    return Boolean(null == n ? void 0 : n.length) && '0x' !== n;
                  }),
                  (a.getUserOperation = s),
                  (a.getUserOperations = r),
                  (a.selectUserOperationMetadata =
                    a.selectPaymasterData =
                    a.selectPaymasterAddress =
                      void 0);
                var n = e('reselect');
                function r(e) {
                  return e.metamask.userOperations || {};
                }
                const o = (a.selectUserOperationMetadata = (0, n.createSelector)(
                  r,
                  (e, t) => t,
                  (e, t) => e[t]
                ));
                function s(e) {
                  var t;
                  const a = null === (t = e.confirmTransaction) || void 0 === t ? void 0 : t.txData;
                  if (!a) return undefined;
                  const { id: n, isUserOperation: o } = a;
                  if (!o) return undefined;
                  return r(e)[n];
                }
                const i = (a.selectPaymasterData = (0, n.createSelector)(o, e => {
                  var t;
                  const a =
                    null == e || null === (t = e.userOperation) || void 0 === t
                      ? void 0
                      : t.paymasterAndData;
                  return '0x' === a ? undefined : a;
                }));
                a.selectPaymasterAddress = (0, n.createSelector)(i, e =>
                  null == e ? void 0 : e.slice(0, 42)
                );
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/account-abstraction.ts' },
    ],
    [
      7593,
      { reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.selectAlerts = r),
                  (a.selectConfirmedAlertKeys = function (e, t) {
                    const { confirmed: a } = e.confirmAlerts ?? {},
                      n = (null == a ? void 0 : a[t]) || {};
                    return Object.keys(n).filter(e => n[e]);
                  }),
                  (a.selectGeneralAlerts = a.selectFieldAlerts = void 0);
                var n = e('reselect');
                function r(e, t) {
                  var a;
                  return (
                    (null === (a = e.confirmAlerts) || void 0 === a ? void 0 : a.alerts[t]) ?? []
                  );
                }
                (a.selectGeneralAlerts = (0, n.createSelector)(
                  (e, t) => r(e, t),
                  e => e.filter(e => !e.field)
                )),
                  (a.selectFieldAlerts = (0, n.createSelector)(
                    (e, t) => r(e, t),
                    e => e.filter(e => e.field)
                  ));
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/alerts.ts' },
    ],
    [
      7595,
      {
        '../../shared/constants/network': 5804,
        '../../shared/modules/selectors/util': 5877,
        '../components/app/assets/util/calculateTokenBalance': 5960,
        '../components/app/assets/util/calculateTokenFiatAmount': 5961,
        '../ducks/metamask/metamask': 6860,
        '../pages/asset/util': 7035,
        './accounts': 7592,
        './multichain': 7605,
        './multichain/networks': 7606,
        './selectors': 7611,
        '@metamask/utils': 2995,
        'bignumber.js': 4030,
        lodash: 4921,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getAccountAssets = g),
                  (a.getAssetsMetadata = b),
                  (a.getAssetsRates = y),
                  (a.getTokenByAccountAndAddressAndChainId =
                    a.getTokenBalancesEvm =
                    a.getMultichainNativeTokenBalance =
                    a.getMultichainNativeAssetType =
                    a.getMultichainAggregatedBalance =
                    a.getMultiChainAssets =
                      void 0);
                var n = e('@metamask/utils'),
                  r = e('bignumber.js'),
                  o = e('lodash'),
                  s = e('../../shared/constants/network'),
                  i = e('../../shared/modules/selectors/util'),
                  l = e('../components/app/assets/util/calculateTokenBalance'),
                  u = e('../components/app/assets/util/calculateTokenFiatAmount'),
                  c = e('../ducks/metamask/metamask'),
                  d = e('../pages/asset/util'),
                  p = e('./accounts'),
                  f = e('./multichain'),
                  m = e('./selectors'),
                  h = e('./multichain/networks');
                function g(e) {
                  return e.metamask.accountsAssets;
                }
                function b(e) {
                  return e.metamask.assetsMetadata;
                }
                function y(e) {
                  return e.metamask.conversionRates;
                }
                a.getTokenBalancesEvm = (0, i.createDeepEqualSelector)(
                  m.getTokensAcrossChainsByAccountAddressSelector,
                  m.getNativeTokenCachedBalanceByChainIdSelector,
                  c.getTokenBalances,
                  (e, t) => t,
                  m.getMarketData,
                  m.getCurrencyRates,
                  m.getPreferences,
                  m.getIsTokenNetworkFilterEqualCurrentNetwork,
                  m.getCurrentNetwork,
                  (e, t, a, n, r, o, i, c, d) => {
                    const { hideZeroBalanceTokens: p } = i,
                      f = a[n],
                      m = s.TEST_CHAINS.includes(d.chainId),
                      h = Object.fromEntries(
                        Object.entries(e).filter(([e]) =>
                          m ? s.TEST_CHAINS.includes(e) : !s.TEST_CHAINS.includes(e)
                        )
                      ),
                      g = [];
                    return (
                      Object.entries(h).forEach(([e, a]) => {
                        const n = e;
                        a.forEach(e => {
                          const { isNative: a, address: s, decimals: i } = e,
                            d =
                              (0, l.calculateTokenBalance)({
                                isNative: a,
                                chainId: n,
                                address: s,
                                decimals: i,
                                nativeBalances: t,
                                selectedAccountTokenBalancesAcrossChains: f,
                              }) || '0',
                            m = (0, u.calculateTokenFiatAmount)({
                              token: e,
                              chainId: n,
                              balance: d,
                              marketData: r,
                              currencyRates: o,
                            });
                          if (!p || '0' !== d || (e.isNative && c)) {
                            let t;
                            (t = e.isNative
                              ? 'ETH' === e.symbol
                                ? 'Ethereum'
                                : e.symbol
                              : e.name || e.symbol),
                              g.push({
                                ...e,
                                address: e.address,
                                balance: d,
                                tokenFiatAmount: m,
                                chainId: n,
                                string: String(d),
                                primary: '',
                                secondary: 0,
                                title: t,
                              });
                          }
                        });
                      }),
                      g
                    );
                  }
                );
                const v = (a.getMultiChainAssets = (0, i.createDeepEqualSelector)(
                    (e, t) => t,
                    f.getMultichainBalances,
                    g,
                    b,
                    y,
                    m.getPreferences,
                    (e, t, a, o, s, i) => {
                      const { hideZeroBalanceTokens: l } = i,
                        u = (null == a ? void 0 : a[e.id]) || [],
                        c = null == t ? void 0 : t[e.id],
                        d = [];
                      return (
                        u.forEach(e => {
                          var t, a;
                          const { chainId: i, assetNamespace: u } = (0, n.parseCaipAssetType)(e),
                            p = 'slip44' === u,
                            f = (null == c ? void 0 : c[e]) || { amount: '0', unit: '' },
                            m =
                              (null == s || null === (t = s[e]) || void 0 === t
                                ? void 0
                                : t.rate) || '0',
                            h = new r.BigNumber(f.amount).times(m),
                            g = {
                              name: f.unit,
                              symbol: f.unit || '',
                              fungible: !0,
                              units: [{ name: e, symbol: f.unit || '', decimals: 0 }],
                            },
                            b = o[e] || g,
                            y =
                              (null === (a = b.units[0]) || void 0 === a ? void 0 : a.decimals) ||
                              0;
                          (l && '0' === f.amount && !p) ||
                            d.push({
                              title: b.name,
                              address: e,
                              symbol: b.symbol,
                              image: b.iconUrl,
                              decimals: y,
                              chainId: i,
                              isNative: p,
                              primary: f.amount,
                              secondary: h.toNumber(),
                              string: '',
                              tokenFiatAmount: h.toNumber(),
                              isStakeable: !1,
                            });
                        }),
                        d
                      );
                    }
                  )),
                  _ =
                    ((a.getTokenByAccountAndAddressAndChainId = (0, i.createDeepEqualSelector)(
                      e => e,
                      (e, t) => t,
                      (e, t, a) => a,
                      (e, t, a, n) => n,
                      (e, t, a, n) => {
                        const r = t ?? (0, p.getSelectedInternalAccount)(e),
                          s = (0, f.getMultichainIsEvm)(e, r)
                            ? (0, m.getSelectedAccountTokensAcrossChains)(e)
                            : (0, o.groupBy)(v(e, r), 'chainId');
                        return (0, d.findAssetByAddress)(s, a, n);
                      }
                    )),
                    { amount: 0, unit: '' }),
                  w =
                    ((a.getMultichainAggregatedBalance = (0, i.createDeepEqualSelector)(
                      (e, t) => t,
                      h.getSelectedMultichainNetworkConfiguration,
                      f.getMultichainBalances,
                      g,
                      y,
                      (e, t, a, o, s) => {
                        const i = (null == o ? void 0 : o[e.id]) || [],
                          l = null == a ? void 0 : a[e.id];
                        let u = new r.BigNumber(0);
                        return (
                          i.forEach(e => {
                            const { chainId: a } = (0, n.parseCaipAssetType)(e);
                            if (a === t.chainId) {
                              var o;
                              const t = (null == l ? void 0 : l[e]) || _,
                                a =
                                  (null == s || null === (o = s[e]) || void 0 === o
                                    ? void 0
                                    : o.rate) || '0',
                                n = new r.BigNumber(t.amount).times(a);
                              u = u.plus(n);
                            }
                          }),
                          u.toNumber()
                        );
                      }
                    )),
                    (a.getMultichainNativeAssetType = (0, i.createDeepEqualSelector)(
                      p.getSelectedInternalAccount,
                      g,
                      h.getSelectedMultichainNetworkConfiguration,
                      (e, t, a) =>
                        ((null == t ? void 0 : t[e.id]) || []).find(e => {
                          const { chainId: t, assetNamespace: r } = (0, n.parseCaipAssetType)(e);
                          return t === a.chainId && 'slip44' === r;
                        })
                    )));
                a.getMultichainNativeTokenBalance = (0, i.createDeepEqualSelector)(
                  (e, t) => t,
                  f.getMultichainBalances,
                  w,
                  (e, t, a) => {
                    const n = null == t ? void 0 : t[e.id];
                    return a && null != n && n[a] ? n[a] : _;
                  }
                );
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/assets.ts' },
    ],
    [
      7599,
      { reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.selectSessionData = a.selectIsSignedIn = void 0);
                var n = e('reselect');
                const r = e => e.metamask;
                (a.selectIsSignedIn = (0, n.createSelector)([r], e => e.isSignedIn)),
                  (a.selectSessionData = (0, n.createSelector)([r], e => e.sessionData));
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/identity/authentication.ts' },
    ],
    [
      7600,
      { reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.selectIsProfileSyncingUpdateLoading =
                    a.selectIsProfileSyncingEnabled =
                    a.selectIsAccountSyncingReadyToBeDispatched =
                      void 0);
                var n = e('reselect');
                const r = e => e.metamask;
                (a.selectIsProfileSyncingEnabled = (0, n.createSelector)(
                  [r],
                  e => e.isProfileSyncingEnabled
                )),
                  (a.selectIsProfileSyncingUpdateLoading = (0, n.createSelector)(
                    [r],
                    e => e.isProfileSyncingUpdateLoading
                  )),
                  (a.selectIsAccountSyncingReadyToBeDispatched = (0, n.createSelector)(
                    [r],
                    e => e.isAccountSyncingReadyToBeDispatched
                  ));
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/identity/profile-syncing.ts' },
    ],
    [
      7602,
      {
        '../../../shared/modules/selectors/util': 5877,
        '@metamask/notification-services-controller': 2401,
        reselect: 5353,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.selectIsMetamaskNotificationsFeatureSeen =
                    a.selectIsMetamaskNotificationsEnabled =
                    a.selectIsFeatureAnnouncementsEnabled =
                    a.isFetchingMetamaskNotifications =
                    a.getValidNotificationAccounts =
                    a.getSnapNotificationsUnreadCount =
                    a.getSnapNotificationsReadCount =
                    a.getOnChainMetamaskNotificationsUnreadCount =
                    a.getOnChainMetamaskNotificationsReadCount =
                    a.getMetamaskNotificationsUnreadCount =
                    a.getMetamaskNotificationsReadList =
                    a.getMetamaskNotifications =
                    a.getMetamaskNotificationById =
                    a.getIsUpdatingMetamaskNotificationsAccount =
                    a.getIsUpdatingMetamaskNotifications =
                    a.getIsCheckingAccountsPresence =
                    a.getFeatureAnnouncementsUnreadCount =
                    a.getFeatureAnnouncementsReadCount =
                      void 0);
                var n = e('reselect'),
                  r = e('@metamask/notification-services-controller'),
                  o = e('../../../shared/modules/selectors/util');
                const { TRIGGER_TYPES: s } = r.NotificationServicesController.Constants,
                  i = e => e.metamask,
                  l = (a.getMetamaskNotifications = (0, n.createSelector)(
                    [i],
                    e => e.metamaskNotificationsList
                  ));
                a.getMetamaskNotificationById = e =>
                  (0, o.createDeepEqualSelector)([l], t => t.find(t => t.id === e));
                (a.getMetamaskNotificationsReadList = (0, n.createSelector)(
                  [i],
                  e => e.metamaskNotificationsReadList
                )),
                  (a.getMetamaskNotificationsUnreadCount = (0, n.createSelector)([l], e =>
                    e ? e.filter(e => !e.isRead).length : 0
                  )),
                  (a.getFeatureAnnouncementsUnreadCount = (0, n.createSelector)([l], e =>
                    e ? e.filter(e => !e.isRead && e.type === s.FEATURES_ANNOUNCEMENT).length : 0
                  )),
                  (a.getFeatureAnnouncementsReadCount = (0, n.createSelector)([l], e =>
                    e ? e.filter(e => e.isRead && e.type === s.FEATURES_ANNOUNCEMENT).length : 0
                  )),
                  (a.getSnapNotificationsUnreadCount = (0, n.createSelector)([l], e =>
                    e ? e.filter(e => !e.isRead && e.type === s.SNAP).length : 0
                  )),
                  (a.getSnapNotificationsReadCount = (0, n.createSelector)([l], e =>
                    e ? e.filter(e => e.isRead && e.type === s.SNAP).length : 0
                  )),
                  (a.getOnChainMetamaskNotificationsUnreadCount = (0, n.createSelector)([l], e =>
                    e
                      ? e.filter(
                          e => !e.isRead && e.type !== s.FEATURES_ANNOUNCEMENT && e.type !== s.SNAP
                        ).length
                      : 0
                  )),
                  (a.getOnChainMetamaskNotificationsReadCount = (0, n.createSelector)([l], e =>
                    e
                      ? e.filter(
                          e => e.isRead && e.type !== s.FEATURES_ANNOUNCEMENT && e.type !== s.SNAP
                        ).length
                      : 0
                  )),
                  (a.selectIsMetamaskNotificationsFeatureSeen = (0, n.createSelector)(
                    [i],
                    e => e.isMetamaskNotificationsFeatureSeen
                  )),
                  (a.selectIsMetamaskNotificationsEnabled = (0, n.createSelector)(
                    [i],
                    e => e.isNotificationServicesEnabled
                  )),
                  (a.selectIsFeatureAnnouncementsEnabled = (0, n.createSelector)(
                    [i],
                    e => e.isFeatureAnnouncementsEnabled
                  )),
                  (a.getIsUpdatingMetamaskNotifications = (0, n.createSelector)(
                    [i],
                    e => e.isUpdatingMetamaskNotifications
                  )),
                  (a.isFetchingMetamaskNotifications = (0, n.createSelector)(
                    [i],
                    e => e.isFetchingMetamaskNotifications
                  )),
                  (a.getIsUpdatingMetamaskNotificationsAccount = (0, n.createSelector)(
                    [i],
                    e => e.isUpdatingMetamaskNotificationsAccount
                  )),
                  (a.getIsCheckingAccountsPresence = (0, n.createSelector)(
                    [i],
                    e => e.isCheckingAccountsPresence
                  )),
                  (a.getValidNotificationAccounts = (0, n.createSelector)(
                    [i],
                    e => e.subscriptionAccountsSeen
                  ));
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/metamask-notifications/metamask-notifications.ts' },
    ],
    [
      7604,
      {
        '..': 7601,
        '../../../shared/lib/accounts/snaps': 5826,
        '../../../shared/modules/selectors/util': 5877,
        '../../../shared/modules/string-utils': 5878,
        '../assets': 7595,
        '@metamask/keyring-api': 2014,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getSnapAccountsByKeyringId = a.getShouldShowSeedPhraseReminder = void 0);
                var n = e('@metamask/keyring-api'),
                  r = e('..'),
                  o = e('../../../shared/modules/selectors/util'),
                  s = e('../assets'),
                  i = e('../../../shared/lib/accounts/snaps'),
                  l = e('../../../shared/modules/string-utils');
                const u = (0, o.createDeepEqualSelector)(
                  (e, t) => t,
                  r.getMetaMaskHdKeyrings,
                  (e, t) => {
                    var a;
                    const [n] = t;
                    return (
                      !!n &&
                      (!!n.accounts.find(t => (0, l.isEqualCaseInsensitive)(e.address, t)) ||
                        !!(0, i.isMultichainWalletSnap)(
                          null === (a = e.metadata.snap) || void 0 === a ? void 0 : a.id
                        ))
                    );
                  }
                );
                (a.getShouldShowSeedPhraseReminder = (0, o.createDeepEqualSelector)(
                  e => e,
                  (e, t) => t,
                  r.getSelectedAccountTokensAcrossChains,
                  r.getCrossChainMetaMaskCachedBalances,
                  (e, t) => (0, s.getMultichainAggregatedBalance)(e, t),
                  (e, t) => u(e, t),
                  (e, t, a, r, o, s) => {
                    const { seedPhraseBackedUp: i, dismissSeedBackUpReminder: l } = e.metamask;
                    if (!t || !s) return !1;
                    let u = !1;
                    u = (0, n.isEvmAccountType)(t.type)
                      ? Object.values(a).some(e =>
                          e.some(e => e.balance && parseInt(e.balance, 16) > 0)
                        ) ||
                        Object.values(r).some(
                          e =>
                            (null == e ? void 0 : e[t.address]) &&
                            parseInt(null == e ? void 0 : e[t.address], 16) > 0
                        )
                      : o > 0;
                    return !1 === i && u && !1 === l;
                  }
                )),
                  (a.getSnapAccountsByKeyringId = (0, o.createDeepEqualSelector)(
                    r.getInternalAccounts,
                    (e, t) => t,
                    (e, t) =>
                      e.filter(e => {
                        var a;
                        return (
                          (null === (a = e.options) || void 0 === a ? void 0 : a.entropySource) ===
                          t
                        );
                      })
                  ));
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/multi-srp/multi-srp.ts' },
    ],
    [
      7607,
      { './selectors': 7611, reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.selectAllNftsFlat =
                    a.getNftContractsByAddressOnCurrentChain =
                    a.getNftContractsByAddressByChain =
                      void 0);
                var n = e('reselect'),
                  r = e('./selectors');
                const o = (a.getNftContractsByAddressByChain = (0, n.createSelector)(
                  function (e) {
                    return e.metamask.allNftContracts ?? {};
                  },
                  e =>
                    Object.keys(e)
                      .map(t =>
                        Object.keys(e[t]).map(a => e[t][a].map(e => ({ ...e, chainId: a })))
                      )
                      .flat()
                      .flat()
                      .reduce((e, t) => {
                        const { chainId: a, ...n } = t,
                          r = e[a] ?? {};
                        return (e[a] = r), (r[n.address.toLowerCase()] = n), e;
                      }, {})
                ));
                (a.getNftContractsByAddressOnCurrentChain = (0, n.createSelector)(
                  e => (0, r.getMemoizedCurrentChainId)(e),
                  o,
                  (e, t) => t[e] ?? {}
                )),
                  (a.selectAllNftsFlat = (0, n.createSelector)(
                    function (e) {
                      return e.metamask.allNfts ?? {};
                    },
                    e =>
                      Object.values(e).reduce((e, t) => {
                        const a = Object.values(t);
                        return e.concat(...a);
                      }, [])
                  ));
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/nft.ts' },
    ],
    [
      7610,
      { './remote-feature-flags': 7609 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getIsRemoteModeEnabled = function (e) {
                    const { vaultRemoteMode: t } = (0, n.getRemoteFeatureFlags)(e);
                    return Boolean(t);
                  });
                var n = e('./remote-feature-flags');
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/remote-mode.ts' },
    ],
    [
      7612,
      { '../../shared/modules/selectors/util': 5877, './transactions': 7617, reselect: 5353 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.selectUnapprovedMessages = a.selectUnapprovedMessage = void 0);
                var n = e('reselect'),
                  r = e('../../shared/modules/selectors/util'),
                  o = e('./transactions');
                const s = (a.selectUnapprovedMessages = (0, n.createSelector)(
                    o.unapprovedPersonalMsgsSelector,
                    o.unapprovedTypedMessagesSelector,
                    (e, t) => ({ ...e, ...t })
                  )),
                  i = (0, n.createSelector)(
                    s,
                    (e, t) => t,
                    (e, t) => e[t]
                  );
                a.selectUnapprovedMessage = (0, r.createDeepEqualSelector)(i, e => e);
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/signatures.ts' },
    ],
    [
      7613,
      {
        '../../../shared/modules/selectors/util': 5877,
        '../accounts': 7592,
        '../selectors': 7611,
        reselect: 5353,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getMemoizedAccountName = a.getAccountNameFromState = void 0);
                var n = e('reselect'),
                  r = e('../selectors'),
                  o = e('../accounts'),
                  s = e('../../../shared/modules/selectors/util');
                const i = (a.getAccountNameFromState = (0, n.createSelector)(
                  [o.getInternalAccounts, (e, t) => t],
                  r.getAccountName
                ));
                a.getMemoizedAccountName = (0, s.createDeepEqualSelector)([i], e => e);
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/snaps/accounts.ts' },
    ],
    [
      7614,
      {
        '../../../shared/modules/selectors/util': 5877,
        '../../../shared/modules/string-utils': 5878,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getMemoizedFullAddressBook =
                    a.getFullAddressBook =
                    a.getAddressBookEntryByNetwork =
                    a.getAddressBookByNetwork =
                      void 0);
                var n = e('../../../shared/modules/selectors/util'),
                  r = e('../../../shared/modules/string-utils');
                const o = e => e.metamask.addressBook;
                a.getFullAddressBook = o;
                const s = (a.getMemoizedFullAddressBook = (0, n.createDeepEqualSelector)(
                    [o],
                    e => e
                  )),
                  i = (a.getAddressBookByNetwork = (0, n.createDeepEqualSelector)(
                    [s, (e, t) => t],
                    (e, t) => (e[t] ? Object.values(e[t]) : [])
                  ));
                a.getAddressBookEntryByNetwork = (0, n.createDeepEqualSelector)(
                  [(e, t, a) => i(e, a), (e, t) => t],
                  (e, t) => e.find(e => (0, r.isEqualCaseInsensitive)(e.address, t))
                );
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/snaps/address-book.ts' },
    ],
    [
      7615,
      { '../../../shared/modules/selectors/util': 5877, '../../ducks/metamask/metamask': 6860 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.getMemoizedCurrentCurrency = void 0);
                var n = e('../../../shared/modules/selectors/util'),
                  r = e('../../ducks/metamask/metamask');
                a.getMemoizedCurrentCurrency = (0, n.createDeepEqualSelector)(
                  [r.getCurrentCurrency],
                  e => e
                );
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/snaps/currency.ts' },
    ],
    [
      7616,
      { './accounts': 7613, './address-book': 7614, './currency': 7615 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 });
                var n = e('./address-book');
                Object.keys(n).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in a && a[e] === n[e]) ||
                      Object.defineProperty(a, e, {
                        enumerable: !0,
                        get: function () {
                          return n[e];
                        },
                      }));
                });
                var r = e('./accounts');
                Object.keys(r).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in a && a[e] === r[e]) ||
                      Object.defineProperty(a, e, {
                        enumerable: !0,
                        get: function () {
                          return r[e];
                        },
                      }));
                });
                var o = e('./currency');
                Object.keys(o).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    ((e in a && a[e] === o[e]) ||
                      Object.defineProperty(a, e, {
                        enumerable: !0,
                        get: function () {
                          return o[e];
                        },
                      }));
                });
              };
            };
      },
      { package: '$root$', file: 'ui/selectors/snaps/index.ts' },
    ],
    [
      7621,
      { '../background-connection': 7620 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.isAtomicBatchSupported = async function (...e) {
                    return await (0, n.submitRequestToBackground)('isAtomicBatchSupported', e);
                  }),
                  (a.updateAtomicBatchData = async function (e) {
                    return await (0, n.submitRequestToBackground)('updateAtomicBatchData', [e]);
                  }),
                  (a.updateBatchTransactions = async function (...e) {
                    return await (0, n.submitRequestToBackground)('updateBatchTransactions', e);
                  }),
                  (a.updateSelectedGasFeeToken = async function (...e) {
                    return await (0, n.submitRequestToBackground)('updateSelectedGasFeeToken', e);
                  });
                var n = e('../background-connection');
              };
            };
      },
      { package: '$root$', file: 'ui/store/controller-actions/transaction-controller.ts' },
    ],
    [
      7622,
      { '../ducks': 6858, '@reduxjs/toolkit': 3073, 'remote-redux-devtools': 4134 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = function (e) {
                    const t = Boolean(!1),
                      a = [];
                    t &&
                      a.push(
                        (0, r.default)({
                          name: 'MetaMask',
                          hostname: 'localhost',
                          port: 8e3,
                          realtime: !0,
                        })
                      );
                    return (0, n.configureStore)({
                      reducer: o.default,
                      middleware: e => e({ serializableCheck: !1, immutableCheck: !1 }),
                      devTools: !1,
                      enhancers: a,
                      preloadedState: e,
                    });
                  });
                var n = e('@reduxjs/toolkit'),
                  r = s(e('remote-redux-devtools')),
                  o = s(e('../ducks'));
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/store/store.ts' },
    ],
    [
      849,
      {
        '../Collapse': 904,
        '../Paper': 1018,
        '../styles/withStyles': 1178,
        '../utils/useControlled': 1201,
        './AccordionContext': 850,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@babel/runtime/helpers/slicedToArray': 415,
        '@babel/runtime/helpers/toArray': 416,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-is': 5181,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/toArray')),
                  i = r(e('@babel/runtime/helpers/slicedToArray')),
                  l = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  u = n(e('react')),
                  c = (e('react-is'), r(e('prop-types')), r(e('clsx'))),
                  d = (e('@material-ui/utils'), r(e('../Collapse'))),
                  p = r(e('../Paper')),
                  f = r(e('../styles/withStyles')),
                  m = r(e('./AccordionContext')),
                  h = r(e('../utils/useControlled')),
                  g = function (e) {
                    var t = { duration: e.transitions.duration.shortest };
                    return {
                      root: {
                        position: 'relative',
                        transition: e.transitions.create(['margin'], t),
                        '&:before': {
                          position: 'absolute',
                          left: 0,
                          top: -1,
                          right: 0,
                          height: 1,
                          content: '""',
                          opacity: 1,
                          backgroundColor: e.palette.divider,
                          transition: e.transitions.create(['opacity', 'background-color'], t),
                        },
                        '&:first-child': { '&:before': { display: 'none' } },
                        '&$expanded': {
                          margin: '16px 0',
                          '&:first-child': { marginTop: 0 },
                          '&:last-child': { marginBottom: 0 },
                          '&:before': { opacity: 0 },
                        },
                        '&$expanded + &': { '&:before': { display: 'none' } },
                        '&$disabled': { backgroundColor: e.palette.action.disabledBackground },
                      },
                      rounded: {
                        borderRadius: 0,
                        '&:first-child': {
                          borderTopLeftRadius: e.shape.borderRadius,
                          borderTopRightRadius: e.shape.borderRadius,
                        },
                        '&:last-child': {
                          borderBottomLeftRadius: e.shape.borderRadius,
                          borderBottomRightRadius: e.shape.borderRadius,
                          '@supports (-ms-ime-align: auto)': {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                        },
                      },
                      expanded: {},
                      disabled: {},
                    };
                  };
                a.styles = g;
                var b = u.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      f = e.defaultExpanded,
                      g = void 0 !== f && f,
                      b = e.disabled,
                      y = void 0 !== b && b,
                      v = e.expanded,
                      _ = e.onChange,
                      w = e.square,
                      E = void 0 !== w && w,
                      T = e.TransitionComponent,
                      x = void 0 === T ? d.default : T,
                      k = e.TransitionProps,
                      C = (0, l.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'defaultExpanded',
                        'disabled',
                        'expanded',
                        'onChange',
                        'square',
                        'TransitionComponent',
                        'TransitionProps',
                      ]),
                      S = (0, h.default)({
                        controlled: v,
                        default: g,
                        name: 'Accordion',
                        state: 'expanded',
                      }),
                      R = (0, i.default)(S, 2),
                      P = R[0],
                      O = R[1],
                      M = u.useCallback(
                        function (e) {
                          O(!P), _ && _(e, !P);
                        },
                        [P, _, O]
                      ),
                      N = u.Children.toArray(a),
                      D = (0, s.default)(N),
                      I = D[0],
                      A = D.slice(1),
                      j = u.useMemo(
                        function () {
                          return { expanded: P, disabled: y, toggle: M };
                        },
                        [P, y, M]
                      );
                    return u.createElement(
                      p.default,
                      (0, o.default)(
                        {
                          className: (0, c.default)(
                            n.root,
                            r,
                            P && n.expanded,
                            y && n.disabled,
                            !E && n.rounded
                          ),
                          ref: t,
                          square: E,
                        },
                        C
                      ),
                      u.createElement(m.default.Provider, { value: j }, I),
                      u.createElement(
                        x,
                        (0, o.default)({ in: P, timeout: 'auto' }, k),
                        u.createElement(
                          'div',
                          {
                            'aria-labelledby': I.props.id,
                            id: I.props['aria-controls'],
                            role: 'region',
                          },
                          A
                        )
                      )
                    );
                  }),
                  y = (0, f.default)(g, { name: 'MuiAccordion' })(b);
                a.default = y;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/Accordion/Accordion.js',
      },
    ],
    [
      850,
      { '@babel/runtime/helpers/interopRequireWildcard': 404, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard');
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var r = n(e('react')).createContext({});
                var o = r;
                a.default = o;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/Accordion/AccordionContext.js',
      },
    ],
    [
      851,
      { './Accordion': 849, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Accordion'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Accordion/index.js' },
    ],
    [
      852,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = {
                    root: {
                      display: 'flex',
                      alignItems: 'center',
                      padding: 8,
                      justifyContent: 'flex-end',
                    },
                    spacing: { '& > :not(:first-child)': { marginLeft: 8 } },
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.disableSpacing,
                      u = void 0 !== r && r,
                      c = (0, s.default)(e, ['classes', 'className', 'disableSpacing']);
                    return i.createElement(
                      'div',
                      (0, o.default)(
                        { className: (0, l.default)(a.root, n, !u && a.spacing), ref: t },
                        c
                      )
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiAccordionActions' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/AccordionActions/AccordionActions.js',
      },
    ],
    [
      853,
      { './AccordionActions': 852, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./AccordionActions'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/AccordionActions/index.js',
      },
    ],
    [
      854,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = function (e) {
                    return { root: { display: 'flex', padding: e.spacing(1, 2, 2) } };
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = (0, s.default)(e, ['classes', 'className']);
                    return i.createElement(
                      'div',
                      (0, o.default)({ className: (0, l.default)(a.root, n), ref: t }, r)
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiAccordionDetails' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/AccordionDetails/AccordionDetails.js',
      },
    ],
    [
      855,
      { './AccordionDetails': 854, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./AccordionDetails'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/AccordionDetails/index.js',
      },
    ],
    [
      856,
      {
        '../Accordion/AccordionContext': 850,
        '../ButtonBase': 880,
        '../IconButton': 968,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../ButtonBase')),
                  c = r(e('../IconButton')),
                  d = r(e('../styles/withStyles')),
                  p = r(e('../Accordion/AccordionContext')),
                  f = function (e) {
                    var t = { duration: e.transitions.duration.shortest };
                    return {
                      root: {
                        display: 'flex',
                        minHeight: 48,
                        transition: e.transitions.create(['min-height', 'background-color'], t),
                        padding: e.spacing(0, 2),
                        '&:hover:not($disabled)': { cursor: 'pointer' },
                        '&$expanded': { minHeight: 64 },
                        '&$focused': { backgroundColor: e.palette.action.focus },
                        '&$disabled': { opacity: e.palette.action.disabledOpacity },
                      },
                      expanded: {},
                      focused: {},
                      disabled: {},
                      content: {
                        display: 'flex',
                        flexGrow: 1,
                        transition: e.transitions.create(['margin'], t),
                        margin: '12px 0',
                        '&$expanded': { margin: '20px 0' },
                      },
                      expandIcon: {
                        transform: 'rotate(0deg)',
                        transition: e.transitions.create('transform', t),
                        '&:hover': { backgroundColor: 'transparent' },
                        '&$expanded': { transform: 'rotate(180deg)' },
                      },
                    };
                  };
                a.styles = f;
                var m = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      d = e.expandIcon,
                      f = e.IconButtonProps,
                      m = e.onBlur,
                      h = e.onClick,
                      g = e.onFocusVisible,
                      b = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'expandIcon',
                        'IconButtonProps',
                        'onBlur',
                        'onClick',
                        'onFocusVisible',
                      ]),
                      y = i.useState(!1),
                      v = y[0],
                      _ = y[1],
                      w = i.useContext(p.default),
                      E = w.disabled,
                      T = void 0 !== E && E,
                      x = w.expanded,
                      k = w.toggle;
                    return i.createElement(
                      u.default,
                      (0, o.default)(
                        {
                          focusRipple: !1,
                          disableRipple: !0,
                          disabled: T,
                          component: 'div',
                          'aria-expanded': x,
                          className: (0, l.default)(
                            n.root,
                            r,
                            T && n.disabled,
                            x && n.expanded,
                            v && n.focused
                          ),
                          onFocusVisible: function (e) {
                            _(!0), g && g(e);
                          },
                          onBlur: function (e) {
                            _(!1), m && m(e);
                          },
                          onClick: function (e) {
                            k && k(e), h && h(e);
                          },
                          ref: t,
                        },
                        b
                      ),
                      i.createElement(
                        'div',
                        { className: (0, l.default)(n.content, x && n.expanded) },
                        a
                      ),
                      d &&
                        i.createElement(
                          c.default,
                          (0, o.default)(
                            {
                              className: (0, l.default)(n.expandIcon, x && n.expanded),
                              edge: 'end',
                              component: 'div',
                              tabIndex: null,
                              role: null,
                              'aria-hidden': !0,
                            },
                            f
                          ),
                          d
                        )
                    );
                  }),
                  h = (0, d.default)(f, { name: 'MuiAccordionSummary' })(m);
                a.default = h;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/AccordionSummary/AccordionSummary.js',
      },
    ],
    [
      857,
      { './AccordionSummary': 856, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./AccordionSummary'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/AccordionSummary/index.js',
      },
    ],
    [
      858,
      {
        '../Paper': 1018,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../utils/capitalize')),
                  d = r(e('../Paper')),
                  p = function (e) {
                    var t = 'light' === e.palette.type ? e.palette.grey[100] : e.palette.grey[900];
                    return {
                      root: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        boxSizing: 'border-box',
                        zIndex: e.zIndex.appBar,
                        flexShrink: 0,
                      },
                      positionFixed: {
                        position: 'fixed',
                        top: 0,
                        left: 'auto',
                        right: 0,
                        '@media print': { position: 'absolute' },
                      },
                      positionAbsolute: { position: 'absolute', top: 0, left: 'auto', right: 0 },
                      positionSticky: { position: 'sticky', top: 0, left: 'auto', right: 0 },
                      positionStatic: { position: 'static' },
                      positionRelative: { position: 'relative' },
                      colorDefault: { backgroundColor: t, color: e.palette.getContrastText(t) },
                      colorPrimary: {
                        backgroundColor: e.palette.primary.main,
                        color: e.palette.primary.contrastText,
                      },
                      colorSecondary: {
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText,
                      },
                      colorInherit: { color: 'inherit' },
                      colorTransparent: { backgroundColor: 'transparent', color: 'inherit' },
                    };
                  };
                a.styles = p;
                var f = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.color,
                      u = void 0 === r ? 'primary' : r,
                      p = e.position,
                      f = void 0 === p ? 'fixed' : p,
                      m = (0, s.default)(e, ['classes', 'className', 'color', 'position']);
                    return i.createElement(
                      d.default,
                      (0, o.default)(
                        {
                          square: !0,
                          component: 'header',
                          elevation: 4,
                          className: (0, l.default)(
                            a.root,
                            a['position'.concat((0, c.default)(f))],
                            a['color'.concat((0, c.default)(u))],
                            n,
                            'fixed' === f && 'mui-fixed'
                          ),
                          ref: t,
                        },
                        m
                      )
                    );
                  }),
                  m = (0, u.default)(p, { name: 'MuiAppBar' })(f);
                a.default = m;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/AppBar/AppBar.js' },
    ],
    [
      859,
      { './AppBar': 858, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./AppBar'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/AppBar/index.js' },
    ],
    [
      860,
      {
        '../internal/svg-icons/Person': 1144,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../internal/svg-icons/Person')),
                  d = function (e) {
                    return {
                      root: {
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        fontFamily: e.typography.fontFamily,
                        fontSize: e.typography.pxToRem(20),
                        lineHeight: 1,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        userSelect: 'none',
                      },
                      colorDefault: {
                        color: e.palette.background.default,
                        backgroundColor:
                          'light' === e.palette.type ? e.palette.grey[400] : e.palette.grey[600],
                      },
                      circle: {},
                      rounded: { borderRadius: e.shape.borderRadius },
                      square: { borderRadius: 0 },
                      img: {
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        objectFit: 'cover',
                        color: 'transparent',
                        textIndent: 1e4,
                      },
                      fallback: { width: '75%', height: '75%' },
                    };
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.alt,
                      n = e.children,
                      r = e.classes,
                      u = e.className,
                      d = e.component,
                      p = void 0 === d ? 'div' : d,
                      f = e.imgProps,
                      m = e.sizes,
                      h = e.src,
                      g = e.srcSet,
                      b = e.variant,
                      y = void 0 === b ? 'circle' : b,
                      v = (0, s.default)(e, [
                        'alt',
                        'children',
                        'classes',
                        'className',
                        'component',
                        'imgProps',
                        'sizes',
                        'src',
                        'srcSet',
                        'variant',
                      ]),
                      _ = null,
                      w = (function (e) {
                        var t = e.src,
                          a = e.srcSet,
                          n = i.useState(!1),
                          r = n[0],
                          o = n[1];
                        return (
                          i.useEffect(
                            function () {
                              if (!t && !a) return undefined;
                              o(!1);
                              var e = !0,
                                n = new Image();
                              return (
                                (n.src = t),
                                (n.srcSet = a),
                                (n.onload = function () {
                                  e && o('loaded');
                                }),
                                (n.onerror = function () {
                                  e && o('error');
                                }),
                                function () {
                                  e = !1;
                                }
                              );
                            },
                            [t, a]
                          ),
                          r
                        );
                      })({ src: h, srcSet: g }),
                      E = h || g,
                      T = E && 'error' !== w;
                    return (
                      (_ = T
                        ? i.createElement(
                            'img',
                            (0, o.default)(
                              { alt: a, src: h, srcSet: g, sizes: m, className: r.img },
                              f
                            )
                          )
                        : null != n
                          ? n
                          : E && a
                            ? a[0]
                            : i.createElement(c.default, { className: r.fallback })),
                      i.createElement(
                        p,
                        (0, o.default)(
                          {
                            className: (0, l.default)(
                              r.root,
                              r.system,
                              r[y],
                              u,
                              !T && r.colorDefault
                            ),
                            ref: t,
                          },
                          v
                        ),
                        _
                      )
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiAvatar' })(p);
                a.default = f;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Avatar/Avatar.js' },
    ],
    [
      861,
      { './Avatar': 860, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Avatar'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Avatar/index.js' },
    ],
    [
      862,
      {
        '../Fade': 935,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../Fade')),
                  d = {
                    root: {
                      zIndex: -1,
                      position: 'fixed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      right: 0,
                      bottom: 0,
                      top: 0,
                      left: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      WebkitTapHighlightColor: 'transparent',
                    },
                    invisible: { backgroundColor: 'transparent' },
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.invisible,
                      d = void 0 !== u && u,
                      p = e.open,
                      f = e.transitionDuration,
                      m = e.TransitionComponent,
                      h = void 0 === m ? c.default : m,
                      g = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'invisible',
                        'open',
                        'transitionDuration',
                        'TransitionComponent',
                      ]);
                    return i.createElement(
                      h,
                      (0, o.default)({ in: p, timeout: f }, g),
                      i.createElement(
                        'div',
                        {
                          className: (0, l.default)(n.root, r, d && n.invisible),
                          'aria-hidden': !0,
                          ref: t,
                        },
                        a
                      )
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiBackdrop' })(p);
                a.default = f;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Backdrop/Backdrop.js' },
    ],
    [
      863,
      { './Backdrop': 862, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Backdrop'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Backdrop/index.js' },
    ],
    [
      864,
      {
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../utils/capitalize')),
                  d = function (e) {
                    return {
                      root: {
                        position: 'relative',
                        display: 'inline-flex',
                        verticalAlign: 'middle',
                        flexShrink: 0,
                      },
                      badge: {
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        boxSizing: 'border-box',
                        fontFamily: e.typography.fontFamily,
                        fontWeight: e.typography.fontWeightMedium,
                        fontSize: e.typography.pxToRem(12),
                        minWidth: 20,
                        lineHeight: 1,
                        padding: '0 6px',
                        height: 20,
                        borderRadius: 10,
                        zIndex: 1,
                        transition: e.transitions.create('transform', {
                          easing: e.transitions.easing.easeInOut,
                          duration: e.transitions.duration.enteringScreen,
                        }),
                      },
                      colorPrimary: {
                        backgroundColor: e.palette.primary.main,
                        color: e.palette.primary.contrastText,
                      },
                      colorSecondary: {
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText,
                      },
                      colorError: {
                        backgroundColor: e.palette.error.main,
                        color: e.palette.error.contrastText,
                      },
                      dot: { borderRadius: 4, height: 8, minWidth: 8, padding: 0 },
                      anchorOriginTopRightRectangle: {
                        top: 0,
                        right: 0,
                        transform: 'scale(1) translate(50%, -50%)',
                        transformOrigin: '100% 0%',
                        '&$invisible': { transform: 'scale(0) translate(50%, -50%)' },
                      },
                      anchorOriginBottomRightRectangle: {
                        bottom: 0,
                        right: 0,
                        transform: 'scale(1) translate(50%, 50%)',
                        transformOrigin: '100% 100%',
                        '&$invisible': { transform: 'scale(0) translate(50%, 50%)' },
                      },
                      anchorOriginTopLeftRectangle: {
                        top: 0,
                        left: 0,
                        transform: 'scale(1) translate(-50%, -50%)',
                        transformOrigin: '0% 0%',
                        '&$invisible': { transform: 'scale(0) translate(-50%, -50%)' },
                      },
                      anchorOriginBottomLeftRectangle: {
                        bottom: 0,
                        left: 0,
                        transform: 'scale(1) translate(-50%, 50%)',
                        transformOrigin: '0% 100%',
                        '&$invisible': { transform: 'scale(0) translate(-50%, 50%)' },
                      },
                      anchorOriginTopRightCircle: {
                        top: '14%',
                        right: '14%',
                        transform: 'scale(1) translate(50%, -50%)',
                        transformOrigin: '100% 0%',
                        '&$invisible': { transform: 'scale(0) translate(50%, -50%)' },
                      },
                      anchorOriginBottomRightCircle: {
                        bottom: '14%',
                        right: '14%',
                        transform: 'scale(1) translate(50%, 50%)',
                        transformOrigin: '100% 100%',
                        '&$invisible': { transform: 'scale(0) translate(50%, 50%)' },
                      },
                      anchorOriginTopLeftCircle: {
                        top: '14%',
                        left: '14%',
                        transform: 'scale(1) translate(-50%, -50%)',
                        transformOrigin: '0% 0%',
                        '&$invisible': { transform: 'scale(0) translate(-50%, -50%)' },
                      },
                      anchorOriginBottomLeftCircle: {
                        bottom: '14%',
                        left: '14%',
                        transform: 'scale(1) translate(-50%, 50%)',
                        transformOrigin: '0% 100%',
                        '&$invisible': { transform: 'scale(0) translate(-50%, 50%)' },
                      },
                      invisible: {
                        transition: e.transitions.create('transform', {
                          easing: e.transitions.easing.easeInOut,
                          duration: e.transitions.duration.leavingScreen,
                        }),
                      },
                    };
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.anchorOrigin,
                      n = void 0 === a ? { vertical: 'top', horizontal: 'right' } : a,
                      r = e.badgeContent,
                      u = e.children,
                      d = e.classes,
                      p = e.className,
                      f = e.color,
                      m = void 0 === f ? 'default' : f,
                      h = e.component,
                      g = void 0 === h ? 'span' : h,
                      b = e.invisible,
                      y = e.max,
                      v = void 0 === y ? 99 : y,
                      _ = e.overlap,
                      w = void 0 === _ ? 'rectangle' : _,
                      E = e.showZero,
                      T = void 0 !== E && E,
                      x = e.variant,
                      k = void 0 === x ? 'standard' : x,
                      C = (0, s.default)(e, [
                        'anchorOrigin',
                        'badgeContent',
                        'children',
                        'classes',
                        'className',
                        'color',
                        'component',
                        'invisible',
                        'max',
                        'overlap',
                        'showZero',
                        'variant',
                      ]),
                      S = b;
                    null == b && ((0 === r && !T) || (null == r && 'dot' !== k)) && (S = !0);
                    var R = '';
                    return (
                      'dot' !== k && (R = r > v ? ''.concat(v, '+') : r),
                      i.createElement(
                        g,
                        (0, o.default)({ className: (0, l.default)(d.root, p), ref: t }, C),
                        u,
                        i.createElement(
                          'span',
                          {
                            className: (0, l.default)(
                              d.badge,
                              d[''.concat(n.horizontal).concat((0, c.default)(n.vertical), '}')],
                              d[
                                'anchorOrigin'
                                  .concat((0, c.default)(n.vertical))
                                  .concat((0, c.default)(n.horizontal))
                                  .concat((0, c.default)(w))
                              ],
                              'default' !== m && d['color'.concat((0, c.default)(m))],
                              S && d.invisible,
                              'dot' === k && d.dot
                            ),
                          },
                          R
                        )
                      )
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiBadge' })(p);
                a.default = f;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Badge/Badge.js' },
    ],
    [
      865,
      { './Badge': 864, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Badge'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Badge/index.js' },
    ],
    [
      866,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-is': 5181,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (e('react-is'), r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = function (e) {
                    return {
                      root: {
                        display: 'flex',
                        justifyContent: 'center',
                        height: 56,
                        backgroundColor: e.palette.background.paper,
                      },
                    };
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.component,
                      c = void 0 === u ? 'div' : u,
                      d = e.onChange,
                      p = e.showLabels,
                      f = void 0 !== p && p,
                      m = e.value,
                      h = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'component',
                        'onChange',
                        'showLabels',
                        'value',
                      ]);
                    return i.createElement(
                      c,
                      (0, o.default)({ className: (0, l.default)(n.root, r), ref: t }, h),
                      i.Children.map(a, function (e, t) {
                        if (!i.isValidElement(e)) return null;
                        var a = e.props.value === undefined ? t : e.props.value;
                        return i.cloneElement(e, {
                          selected: a === m,
                          showLabel: e.props.showLabel !== undefined ? e.props.showLabel : f,
                          value: a,
                          onChange: d,
                        });
                      })
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiBottomNavigation' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/BottomNavigation/BottomNavigation.js',
      },
    ],
    [
      867,
      { './BottomNavigation': 866, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./BottomNavigation'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/BottomNavigation/index.js',
      },
    ],
    [
      868,
      {
        '../ButtonBase': 880,
        '../styles/withStyles': 1178,
        '../utils/unsupportedProp': 1200,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../ButtonBase')),
                  d =
                    (r(e('../utils/unsupportedProp')),
                    function (e) {
                      return {
                        root: {
                          transition: e.transitions.create(['color', 'padding-top'], {
                            duration: e.transitions.duration.short,
                          }),
                          padding: '6px 12px 8px',
                          minWidth: 80,
                          maxWidth: 168,
                          color: e.palette.text.secondary,
                          flex: '1',
                          '&$iconOnly': { paddingTop: 16 },
                          '&$selected': { paddingTop: 6, color: e.palette.primary.main },
                        },
                        selected: {},
                        iconOnly: {},
                        wrapper: {
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          flexDirection: 'column',
                        },
                        label: {
                          fontFamily: e.typography.fontFamily,
                          fontSize: e.typography.pxToRem(12),
                          opacity: 1,
                          transition: 'font-size 0.2s, opacity 0.2s',
                          transitionDelay: '0.1s',
                          '&$iconOnly': { opacity: 0, transitionDelay: '0s' },
                          '&$selected': { fontSize: e.typography.pxToRem(14) },
                        },
                      };
                    });
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.icon,
                      u = e.label,
                      d = e.onChange,
                      p = e.onClick,
                      f = e.selected,
                      m = e.showLabel,
                      h = e.value,
                      g = (0, s.default)(e, [
                        'classes',
                        'className',
                        'icon',
                        'label',
                        'onChange',
                        'onClick',
                        'selected',
                        'showLabel',
                        'value',
                      ]);
                    return i.createElement(
                      c.default,
                      (0, o.default)(
                        {
                          ref: t,
                          className: (0, l.default)(a.root, n, f ? a.selected : !m && a.iconOnly),
                          focusRipple: !0,
                          onClick: function (e) {
                            d && d(e, h), p && p(e);
                          },
                        },
                        g
                      ),
                      i.createElement(
                        'span',
                        { className: a.wrapper },
                        r,
                        i.createElement(
                          'span',
                          { className: (0, l.default)(a.label, f ? a.selected : !m && a.iconOnly) },
                          u
                        )
                      )
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiBottomNavigationAction' })(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/BottomNavigationAction/BottomNavigationAction.js',
      },
    ],
    [
      869,
      { './BottomNavigationAction': 868, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./BottomNavigationAction'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/BottomNavigationAction/index.js',
      },
    ],
    [
      870,
      {
        '../styles/styled': 1175,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@material-ui/system': 1250,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styleFunction = void 0);
                var r = e('@material-ui/system'),
                  o = n(e('../styles/styled')),
                  s = (0, r.css)(
                    (0, r.compose)(
                      r.borders,
                      r.display,
                      r.flexbox,
                      r.grid,
                      r.positions,
                      r.palette,
                      r.shadows,
                      r.sizing,
                      r.spacing,
                      r.typography
                    )
                  );
                a.styleFunction = s;
                var i = (0, o.default)('div')(s, { name: 'MuiBox' });
                a.default = i;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Box/Box.js' },
    ],
    [
      871,
      { './Box': 870, '@babel/runtime/helpers/interopRequireWildcard': 404 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(a, 'styleFunction', {
                    enumerable: !0,
                    get: function () {
                      return r.styleFunction;
                    },
                  });
                var r = n(e('./Box'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Box/index.js' },
    ],
    [
      872,
      {
        '../ButtonBase': 880,
        '../internal/svg-icons/MoreHoriz': 1143,
        '../styles/colorManipulator': 1159,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('../styles/withStyles'))),
                  u = e('../styles/colorManipulator'),
                  c = r(e('../internal/svg-icons/MoreHoriz')),
                  d = r(e('../ButtonBase'));
                function p(e) {
                  var t = e.classes,
                    a = (0, s.default)(e, ['classes']);
                  return i.createElement(
                    d.default,
                    (0, o.default)({ component: 'li', className: t.root, focusRipple: !0 }, a),
                    i.createElement(c.default, { className: t.icon })
                  );
                }
                var f = (0, l.default)(
                  function (e) {
                    return {
                      root: {
                        display: 'flex',
                        marginLeft: e.spacing(0.5),
                        marginRight: e.spacing(0.5),
                        backgroundColor: e.palette.grey[100],
                        color: e.palette.grey[700],
                        borderRadius: 2,
                        cursor: 'pointer',
                        '&:hover, &:focus': { backgroundColor: e.palette.grey[200] },
                        '&:active': {
                          boxShadow: e.shadows[0],
                          backgroundColor: (0, u.emphasize)(e.palette.grey[200], 0.12),
                        },
                      },
                      icon: { width: 24, height: 16 },
                    };
                  },
                  { name: 'PrivateBreadcrumbCollapsed' }
                )(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/Breadcrumbs/BreadcrumbCollapsed.js',
      },
    ],
    [
      873,
      {
        '../Typography': 1105,
        '../styles/withStyles': 1178,
        './BreadcrumbCollapsed': 872,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@babel/runtime/helpers/toConsumableArray': 417,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-is': 5181,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/toConsumableArray')),
                  i = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  l = n(e('react')),
                  u = (e('react-is'), r(e('prop-types')), r(e('clsx'))),
                  c = r(e('../styles/withStyles')),
                  d = r(e('../Typography')),
                  p = r(e('./BreadcrumbCollapsed')),
                  f = {
                    root: {},
                    ol: {
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      padding: 0,
                      margin: 0,
                      listStyle: 'none',
                    },
                    li: {},
                    separator: {
                      display: 'flex',
                      userSelect: 'none',
                      marginLeft: 8,
                      marginRight: 8,
                    },
                  };
                a.styles = f;
                var m = l.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      c = e.component,
                      f = void 0 === c ? 'nav' : c,
                      m = e.expandText,
                      h = void 0 === m ? 'Show path' : m,
                      g = e.itemsAfterCollapse,
                      b = void 0 === g ? 1 : g,
                      y = e.itemsBeforeCollapse,
                      v = void 0 === y ? 1 : y,
                      _ = e.maxItems,
                      w = void 0 === _ ? 8 : _,
                      E = e.separator,
                      T = void 0 === E ? '/' : E,
                      x = (0, i.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'component',
                        'expandText',
                        'itemsAfterCollapse',
                        'itemsBeforeCollapse',
                        'maxItems',
                        'separator',
                      ]),
                      k = l.useState(!1),
                      C = k[0],
                      S = k[1],
                      R = l.Children.toArray(a)
                        .filter(function (e) {
                          return l.isValidElement(e);
                        })
                        .map(function (e, t) {
                          return l.createElement(
                            'li',
                            { className: n.li, key: 'child-'.concat(t) },
                            e
                          );
                        });
                    return l.createElement(
                      d.default,
                      (0, o.default)(
                        {
                          ref: t,
                          component: f,
                          color: 'textSecondary',
                          className: (0, u.default)(n.root, r),
                        },
                        x
                      ),
                      l.createElement(
                        'ol',
                        { className: n.ol },
                        (function (e, t, a) {
                          return e.reduce(function (n, r, o) {
                            return (
                              o < e.length - 1
                                ? (n = n.concat(
                                    r,
                                    l.createElement(
                                      'li',
                                      {
                                        'aria-hidden': !0,
                                        key: 'separator-'.concat(o),
                                        className: t,
                                      },
                                      a
                                    )
                                  ))
                                : n.push(r),
                              n
                            );
                          }, []);
                        })(
                          C || (w && R.length <= w)
                            ? R
                            : (function (e) {
                                return v + b >= e.length
                                  ? e
                                  : [].concat(
                                      (0, s.default)(e.slice(0, v)),
                                      [
                                        l.createElement(p.default, {
                                          'aria-label': h,
                                          key: 'ellipsis',
                                          onClick: function (e) {
                                            S(!0);
                                            var t = e.currentTarget.parentNode.querySelector(
                                              'a[href],button,[tabindex]'
                                            );
                                            t && t.focus();
                                          },
                                        }),
                                      ],
                                      (0, s.default)(e.slice(e.length - b, e.length))
                                    );
                              })(R),
                          n.separator,
                          T
                        )
                      )
                    );
                  }),
                  h = (0, c.default)(f, { name: 'MuiBreadcrumbs' })(m);
                a.default = h;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/Breadcrumbs/Breadcrumbs.js',
      },
    ],
    [
      874,
      { './Breadcrumbs': 873, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Breadcrumbs'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Breadcrumbs/index.js' },
    ],
    [
      875,
      {
        '../ButtonBase': 880,
        '../styles/colorManipulator': 1159,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  s = r(e('@babel/runtime/helpers/extends')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = e('../styles/colorManipulator'),
                  d = r(e('../ButtonBase')),
                  p = r(e('../utils/capitalize')),
                  f = function (e) {
                    return {
                      root: (0, s.default)({}, e.typography.button, {
                        boxSizing: 'border-box',
                        minWidth: 64,
                        padding: '6px 16px',
                        borderRadius: e.shape.borderRadius,
                        color: e.palette.text.primary,
                        transition: e.transitions.create(
                          ['background-color', 'box-shadow', 'border'],
                          { duration: e.transitions.duration.short }
                        ),
                        '&:hover': {
                          textDecoration: 'none',
                          backgroundColor: (0, c.fade)(
                            e.palette.text.primary,
                            e.palette.action.hoverOpacity
                          ),
                          '@media (hover: none)': { backgroundColor: 'transparent' },
                          '&$disabled': { backgroundColor: 'transparent' },
                        },
                        '&$disabled': { color: e.palette.action.disabled },
                      }),
                      label: {
                        width: '100%',
                        display: 'inherit',
                        alignItems: 'inherit',
                        justifyContent: 'inherit',
                      },
                      text: { padding: '6px 8px' },
                      textPrimary: {
                        color: e.palette.primary.main,
                        '&:hover': {
                          backgroundColor: (0, c.fade)(
                            e.palette.primary.main,
                            e.palette.action.hoverOpacity
                          ),
                          '@media (hover: none)': { backgroundColor: 'transparent' },
                        },
                      },
                      textSecondary: {
                        color: e.palette.secondary.main,
                        '&:hover': {
                          backgroundColor: (0, c.fade)(
                            e.palette.secondary.main,
                            e.palette.action.hoverOpacity
                          ),
                          '@media (hover: none)': { backgroundColor: 'transparent' },
                        },
                      },
                      outlined: {
                        padding: '5px 15px',
                        border: '1px solid '.concat(
                          'light' === e.palette.type
                            ? 'rgba(0, 0, 0, 0.23)'
                            : 'rgba(255, 255, 255, 0.23)'
                        ),
                        '&$disabled': {
                          border: '1px solid '.concat(e.palette.action.disabledBackground),
                        },
                      },
                      outlinedPrimary: {
                        color: e.palette.primary.main,
                        border: '1px solid '.concat((0, c.fade)(e.palette.primary.main, 0.5)),
                        '&:hover': {
                          border: '1px solid '.concat(e.palette.primary.main),
                          backgroundColor: (0, c.fade)(
                            e.palette.primary.main,
                            e.palette.action.hoverOpacity
                          ),
                          '@media (hover: none)': { backgroundColor: 'transparent' },
                        },
                      },
                      outlinedSecondary: {
                        color: e.palette.secondary.main,
                        border: '1px solid '.concat((0, c.fade)(e.palette.secondary.main, 0.5)),
                        '&:hover': {
                          border: '1px solid '.concat(e.palette.secondary.main),
                          backgroundColor: (0, c.fade)(
                            e.palette.secondary.main,
                            e.palette.action.hoverOpacity
                          ),
                          '@media (hover: none)': { backgroundColor: 'transparent' },
                        },
                        '&$disabled': { border: '1px solid '.concat(e.palette.action.disabled) },
                      },
                      contained: {
                        color: e.palette.getContrastText(e.palette.grey[300]),
                        backgroundColor: e.palette.grey[300],
                        boxShadow: e.shadows[2],
                        '&:hover': {
                          backgroundColor: e.palette.grey.A100,
                          boxShadow: e.shadows[4],
                          '@media (hover: none)': {
                            boxShadow: e.shadows[2],
                            backgroundColor: e.palette.grey[300],
                          },
                          '&$disabled': { backgroundColor: e.palette.action.disabledBackground },
                        },
                        '&$focusVisible': { boxShadow: e.shadows[6] },
                        '&:active': { boxShadow: e.shadows[8] },
                        '&$disabled': {
                          color: e.palette.action.disabled,
                          boxShadow: e.shadows[0],
                          backgroundColor: e.palette.action.disabledBackground,
                        },
                      },
                      containedPrimary: {
                        color: e.palette.primary.contrastText,
                        backgroundColor: e.palette.primary.main,
                        '&:hover': {
                          backgroundColor: e.palette.primary.dark,
                          '@media (hover: none)': { backgroundColor: e.palette.primary.main },
                        },
                      },
                      containedSecondary: {
                        color: e.palette.secondary.contrastText,
                        backgroundColor: e.palette.secondary.main,
                        '&:hover': {
                          backgroundColor: e.palette.secondary.dark,
                          '@media (hover: none)': { backgroundColor: e.palette.secondary.main },
                        },
                      },
                      disableElevation: {
                        boxShadow: 'none',
                        '&:hover': { boxShadow: 'none' },
                        '&$focusVisible': { boxShadow: 'none' },
                        '&:active': { boxShadow: 'none' },
                        '&$disabled': { boxShadow: 'none' },
                      },
                      focusVisible: {},
                      disabled: {},
                      colorInherit: { color: 'inherit', borderColor: 'currentColor' },
                      textSizeSmall: { padding: '4px 5px', fontSize: e.typography.pxToRem(13) },
                      textSizeLarge: { padding: '8px 11px', fontSize: e.typography.pxToRem(15) },
                      outlinedSizeSmall: { padding: '3px 9px', fontSize: e.typography.pxToRem(13) },
                      outlinedSizeLarge: {
                        padding: '7px 21px',
                        fontSize: e.typography.pxToRem(15),
                      },
                      containedSizeSmall: {
                        padding: '4px 10px',
                        fontSize: e.typography.pxToRem(13),
                      },
                      containedSizeLarge: {
                        padding: '8px 22px',
                        fontSize: e.typography.pxToRem(15),
                      },
                      sizeSmall: {},
                      sizeLarge: {},
                      fullWidth: { width: '100%' },
                      startIcon: {
                        display: 'inherit',
                        marginRight: 8,
                        marginLeft: -4,
                        '&$iconSizeSmall': { marginLeft: -2 },
                      },
                      endIcon: {
                        display: 'inherit',
                        marginRight: -4,
                        marginLeft: 8,
                        '&$iconSizeSmall': { marginRight: -2 },
                      },
                      iconSizeSmall: { '& > *:first-child': { fontSize: 18 } },
                      iconSizeMedium: { '& > *:first-child': { fontSize: 20 } },
                      iconSizeLarge: { '& > *:first-child': { fontSize: 22 } },
                    };
                  };
                a.styles = f;
                var m = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.color,
                      c = void 0 === u ? 'default' : u,
                      f = e.component,
                      m = void 0 === f ? 'button' : f,
                      h = e.disabled,
                      g = void 0 !== h && h,
                      b = e.disableElevation,
                      y = void 0 !== b && b,
                      v = e.disableFocusRipple,
                      _ = void 0 !== v && v,
                      w = e.endIcon,
                      E = e.focusVisibleClassName,
                      T = e.fullWidth,
                      x = void 0 !== T && T,
                      k = e.size,
                      C = void 0 === k ? 'medium' : k,
                      S = e.startIcon,
                      R = e.type,
                      P = void 0 === R ? 'button' : R,
                      O = e.variant,
                      M = void 0 === O ? 'text' : O,
                      N = (0, o.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'color',
                        'component',
                        'disabled',
                        'disableElevation',
                        'disableFocusRipple',
                        'endIcon',
                        'focusVisibleClassName',
                        'fullWidth',
                        'size',
                        'startIcon',
                        'type',
                        'variant',
                      ]),
                      D =
                        S &&
                        i.createElement(
                          'span',
                          {
                            className: (0, l.default)(
                              n.startIcon,
                              n['iconSize'.concat((0, p.default)(C))]
                            ),
                          },
                          S
                        ),
                      I =
                        w &&
                        i.createElement(
                          'span',
                          {
                            className: (0, l.default)(
                              n.endIcon,
                              n['iconSize'.concat((0, p.default)(C))]
                            ),
                          },
                          w
                        );
                    return i.createElement(
                      d.default,
                      (0, s.default)(
                        {
                          className: (0, l.default)(
                            n.root,
                            n[M],
                            r,
                            'inherit' === c
                              ? n.colorInherit
                              : 'default' !== c && n[''.concat(M).concat((0, p.default)(c))],
                            'medium' !== C && [
                              n[''.concat(M, 'Size').concat((0, p.default)(C))],
                              n['size'.concat((0, p.default)(C))],
                            ],
                            y && n.disableElevation,
                            g && n.disabled,
                            x && n.fullWidth
                          ),
                          component: m,
                          disabled: g,
                          focusRipple: !_,
                          focusVisibleClassName: (0, l.default)(n.focusVisible, E),
                          ref: t,
                          type: P,
                        },
                        N
                      ),
                      i.createElement('span', { className: n.label }, D, a, I)
                    );
                  }),
                  h = (0, u.default)(f, { name: 'MuiButton' })(m);
                a.default = h;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Button/Button.js' },
    ],
    [
      876,
      { './Button': 875, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Button'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Button/index.js' },
    ],
    [
      877,
      {
        '../styles/withStyles': 1178,
        '../utils/useEventCallback': 1202,
        '../utils/useForkRef': 1203,
        '../utils/useIsFocusVisible': 1204,
        './TouchRipple': 879,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-dom': 5157,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), n(e('react-dom'))),
                  u = r(e('clsx')),
                  c = (e('@material-ui/utils'), r(e('../utils/useForkRef'))),
                  d = r(e('../utils/useEventCallback')),
                  p = r(e('../styles/withStyles')),
                  f = r(e('../utils/useIsFocusVisible')),
                  m = r(e('./TouchRipple')),
                  h = {
                    root: {
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      WebkitTapHighlightColor: 'transparent',
                      backgroundColor: 'transparent',
                      outline: 0,
                      border: 0,
                      margin: 0,
                      borderRadius: 0,
                      padding: 0,
                      cursor: 'pointer',
                      userSelect: 'none',
                      verticalAlign: 'middle',
                      '-moz-appearance': 'none',
                      '-webkit-appearance': 'none',
                      textDecoration: 'none',
                      color: 'inherit',
                      '&::-moz-focus-inner': { borderStyle: 'none' },
                      '&$disabled': { pointerEvents: 'none', cursor: 'default' },
                      '@media print': { colorAdjust: 'exact' },
                    },
                    disabled: {},
                    focusVisible: {},
                  };
                a.styles = h;
                var g = i.forwardRef(function (e, t) {
                    var a = e.action,
                      n = e.buttonRef,
                      r = e.centerRipple,
                      p = void 0 !== r && r,
                      h = e.children,
                      g = e.classes,
                      b = e.className,
                      y = e.component,
                      v = void 0 === y ? 'button' : y,
                      _ = e.disabled,
                      w = void 0 !== _ && _,
                      E = e.disableRipple,
                      T = void 0 !== E && E,
                      x = e.disableTouchRipple,
                      k = void 0 !== x && x,
                      C = e.focusRipple,
                      S = void 0 !== C && C,
                      R = e.focusVisibleClassName,
                      P = e.onBlur,
                      O = e.onClick,
                      M = e.onFocus,
                      N = e.onFocusVisible,
                      D = e.onKeyDown,
                      I = e.onKeyUp,
                      A = e.onMouseDown,
                      j = e.onMouseLeave,
                      L = e.onMouseUp,
                      B = e.onTouchEnd,
                      F = e.onTouchMove,
                      q = e.onTouchStart,
                      W = e.onDragLeave,
                      U = e.tabIndex,
                      $ = void 0 === U ? 0 : U,
                      V = e.TouchRippleProps,
                      z = e.type,
                      H = void 0 === z ? 'button' : z,
                      G = (0, s.default)(e, [
                        'action',
                        'buttonRef',
                        'centerRipple',
                        'children',
                        'classes',
                        'className',
                        'component',
                        'disabled',
                        'disableRipple',
                        'disableTouchRipple',
                        'focusRipple',
                        'focusVisibleClassName',
                        'onBlur',
                        'onClick',
                        'onFocus',
                        'onFocusVisible',
                        'onKeyDown',
                        'onKeyUp',
                        'onMouseDown',
                        'onMouseLeave',
                        'onMouseUp',
                        'onTouchEnd',
                        'onTouchMove',
                        'onTouchStart',
                        'onDragLeave',
                        'tabIndex',
                        'TouchRippleProps',
                        'type',
                      ]),
                      Q = i.useRef(null);
                    var X = i.useRef(null),
                      K = i.useState(!1),
                      Z = K[0],
                      Y = K[1];
                    w && Z && Y(!1);
                    var J = (0, f.default)(),
                      ee = J.isFocusVisible,
                      te = J.onBlurVisible,
                      ae = J.ref;
                    function ne(e, t) {
                      var a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : k;
                      return (0, d.default)(function (n) {
                        return t && t(n), !a && X.current && X.current[e](n), !0;
                      });
                    }
                    i.useImperativeHandle(
                      a,
                      function () {
                        return {
                          focusVisible: function () {
                            Y(!0), Q.current.focus();
                          },
                        };
                      },
                      []
                    ),
                      i.useEffect(
                        function () {
                          Z && S && !T && X.current.pulsate();
                        },
                        [T, S, Z]
                      );
                    var re = ne('start', A),
                      oe = ne('stop', W),
                      se = ne('stop', L),
                      ie = ne('stop', function (e) {
                        Z && e.preventDefault(), j && j(e);
                      }),
                      le = ne('start', q),
                      ue = ne('stop', B),
                      ce = ne('stop', F),
                      de = ne(
                        'stop',
                        function (e) {
                          Z && (te(e), Y(!1)), P && P(e);
                        },
                        !1
                      ),
                      pe = (0, d.default)(function (e) {
                        Q.current || (Q.current = e.currentTarget),
                          ee(e) && (Y(!0), N && N(e)),
                          M && M(e);
                      }),
                      fe = function () {
                        var e = l.findDOMNode(Q.current);
                        return v && 'button' !== v && !('A' === e.tagName && e.href);
                      },
                      me = i.useRef(!1),
                      he = (0, d.default)(function (e) {
                        S &&
                          !me.current &&
                          Z &&
                          X.current &&
                          ' ' === e.key &&
                          ((me.current = !0),
                          e.persist(),
                          X.current.stop(e, function () {
                            X.current.start(e);
                          })),
                          e.target === e.currentTarget &&
                            fe() &&
                            ' ' === e.key &&
                            e.preventDefault(),
                          D && D(e),
                          e.target === e.currentTarget &&
                            fe() &&
                            'Enter' === e.key &&
                            !w &&
                            (e.preventDefault(), O && O(e));
                      }),
                      ge = (0, d.default)(function (e) {
                        S &&
                          ' ' === e.key &&
                          X.current &&
                          Z &&
                          !e.defaultPrevented &&
                          ((me.current = !1),
                          e.persist(),
                          X.current.stop(e, function () {
                            X.current.pulsate(e);
                          })),
                          I && I(e),
                          O &&
                            e.target === e.currentTarget &&
                            fe() &&
                            ' ' === e.key &&
                            !e.defaultPrevented &&
                            O(e);
                      }),
                      be = v;
                    'button' === be && G.href && (be = 'a');
                    var ye = {};
                    'button' === be
                      ? ((ye.type = H), (ye.disabled = w))
                      : (('a' === be && G.href) || (ye.role = 'button'), (ye['aria-disabled'] = w));
                    var ve = (0, c.default)(n, t),
                      _e = (0, c.default)(ae, Q),
                      we = (0, c.default)(ve, _e),
                      Ee = i.useState(!1),
                      Te = Ee[0],
                      xe = Ee[1];
                    i.useEffect(function () {
                      xe(!0);
                    }, []);
                    var ke = Te && !T && !w;
                    return i.createElement(
                      be,
                      (0, o.default)(
                        {
                          className: (0, u.default)(
                            g.root,
                            b,
                            Z && [g.focusVisible, R],
                            w && g.disabled
                          ),
                          onBlur: de,
                          onClick: O,
                          onFocus: pe,
                          onKeyDown: he,
                          onKeyUp: ge,
                          onMouseDown: re,
                          onMouseLeave: ie,
                          onMouseUp: se,
                          onDragLeave: oe,
                          onTouchEnd: ue,
                          onTouchMove: ce,
                          onTouchStart: le,
                          ref: we,
                          tabIndex: w ? -1 : $,
                        },
                        ye,
                        G
                      ),
                      h,
                      ke
                        ? i.createElement(m.default, (0, o.default)({ ref: X, center: p }, V))
                        : null
                    );
                  }),
                  b = (0, p.default)(h, { name: 'MuiButtonBase' })(g);
                a.default = b;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ButtonBase/ButtonBase.js',
      },
    ],
    [
      878,
      {
        '../utils/useEventCallback': 1202,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault'),
                  r = e('@babel/runtime/helpers/interopRequireWildcard');
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var o = r(e('react')),
                  s = (n(e('prop-types')), n(e('clsx'))),
                  i = n(e('../utils/useEventCallback')),
                  l = 'undefined' == typeof window ? o.useEffect : o.useLayoutEffect;
                function u(e) {
                  var t = e.classes,
                    a = e.pulsate,
                    n = void 0 !== a && a,
                    r = e.rippleX,
                    u = e.rippleY,
                    c = e.rippleSize,
                    d = e.in,
                    p = e.onExited,
                    f = void 0 === p ? function () {} : p,
                    m = e.timeout,
                    h = o.useState(!1),
                    g = h[0],
                    b = h[1],
                    y = (0, s.default)(t.ripple, t.rippleVisible, n && t.ripplePulsate),
                    v = { width: c, height: c, top: -c / 2 + u, left: -c / 2 + r },
                    _ = (0, s.default)(t.child, g && t.childLeaving, n && t.childPulsate),
                    w = (0, i.default)(f);
                  return (
                    l(
                      function () {
                        if (!d) {
                          b(!0);
                          var e = setTimeout(w, m);
                          return function () {
                            clearTimeout(e);
                          };
                        }
                        return undefined;
                      },
                      [w, d, m]
                    ),
                    o.createElement(
                      'span',
                      { className: y, style: v },
                      o.createElement('span', { className: _ })
                    )
                  );
                }
                var c = u;
                a.default = c;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/ButtonBase/Ripple.js' },
    ],
    [
      879,
      {
        '../styles/withStyles': 1178,
        './Ripple': 878,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@babel/runtime/helpers/toConsumableArray': 417,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-transition-group': 1156,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = a.DELAY_RIPPLE = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/toConsumableArray')),
                  i = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  l = n(e('react')),
                  u = (r(e('prop-types')), e('react-transition-group')),
                  c = r(e('clsx')),
                  d = r(e('../styles/withStyles')),
                  p = r(e('./Ripple'));
                a.DELAY_RIPPLE = 80;
                var f = function (e) {
                  return {
                    root: {
                      overflow: 'hidden',
                      pointerEvents: 'none',
                      position: 'absolute',
                      zIndex: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      borderRadius: 'inherit',
                    },
                    ripple: { opacity: 0, position: 'absolute' },
                    rippleVisible: {
                      opacity: 0.3,
                      transform: 'scale(1)',
                      animation: '$enter '
                        .concat(550, 'ms ')
                        .concat(e.transitions.easing.easeInOut),
                    },
                    ripplePulsate: {
                      animationDuration: ''.concat(e.transitions.duration.shorter, 'ms'),
                    },
                    child: {
                      opacity: 1,
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: 'currentColor',
                    },
                    childLeaving: {
                      opacity: 0,
                      animation: '$exit '.concat(550, 'ms ').concat(e.transitions.easing.easeInOut),
                    },
                    childPulsate: {
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      animation: '$pulsate 2500ms '.concat(
                        e.transitions.easing.easeInOut,
                        ' 200ms infinite'
                      ),
                    },
                    '@keyframes enter': {
                      '0%': { transform: 'scale(0)', opacity: 0.1 },
                      '100%': { transform: 'scale(1)', opacity: 0.3 },
                    },
                    '@keyframes exit': { '0%': { opacity: 1 }, '100%': { opacity: 0 } },
                    '@keyframes pulsate': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(0.92)' },
                      '100%': { transform: 'scale(1)' },
                    },
                  };
                };
                a.styles = f;
                var m = l.forwardRef(function (e, t) {
                    var a = e.center,
                      n = void 0 !== a && a,
                      r = e.classes,
                      d = e.className,
                      f = (0, i.default)(e, ['center', 'classes', 'className']),
                      m = l.useState([]),
                      h = m[0],
                      g = m[1],
                      b = l.useRef(0),
                      y = l.useRef(null);
                    l.useEffect(
                      function () {
                        y.current && (y.current(), (y.current = null));
                      },
                      [h]
                    );
                    var v = l.useRef(!1),
                      _ = l.useRef(null),
                      w = l.useRef(null),
                      E = l.useRef(null);
                    l.useEffect(function () {
                      return function () {
                        clearTimeout(_.current);
                      };
                    }, []);
                    var T = l.useCallback(
                        function (e) {
                          var t = e.pulsate,
                            a = e.rippleX,
                            n = e.rippleY,
                            o = e.rippleSize,
                            i = e.cb;
                          g(function (e) {
                            return [].concat((0, s.default)(e), [
                              l.createElement(p.default, {
                                key: b.current,
                                classes: r,
                                timeout: 550,
                                pulsate: t,
                                rippleX: a,
                                rippleY: n,
                                rippleSize: o,
                              }),
                            ]);
                          }),
                            (b.current += 1),
                            (y.current = i);
                        },
                        [r]
                      ),
                      x = l.useCallback(
                        function () {
                          var e =
                              arguments.length > 0 && arguments[0] !== undefined
                                ? arguments[0]
                                : {},
                            t =
                              arguments.length > 1 && arguments[1] !== undefined
                                ? arguments[1]
                                : {},
                            a = arguments.length > 2 ? arguments[2] : undefined,
                            r = t.pulsate,
                            o = void 0 !== r && r,
                            s = t.center,
                            i = void 0 === s ? n || t.pulsate : s,
                            l = t.fakeElement,
                            u = void 0 !== l && l;
                          if ('mousedown' === e.type && v.current) v.current = !1;
                          else {
                            'touchstart' === e.type && (v.current = !0);
                            var c,
                              d,
                              p,
                              f = u ? null : E.current,
                              m = f
                                ? f.getBoundingClientRect()
                                : { width: 0, height: 0, left: 0, top: 0 };
                            if (
                              i ||
                              (0 === e.clientX && 0 === e.clientY) ||
                              (!e.clientX && !e.touches)
                            )
                              (c = Math.round(m.width / 2)), (d = Math.round(m.height / 2));
                            else {
                              var h = e.touches ? e.touches[0] : e,
                                g = h.clientX,
                                b = h.clientY;
                              (c = Math.round(g - m.left)), (d = Math.round(b - m.top));
                            }
                            if (i)
                              (p = Math.sqrt(
                                (2 * Math.pow(m.width, 2) + Math.pow(m.height, 2)) / 3
                              )) %
                                2 ==
                                0 && (p += 1);
                            else {
                              var y = 2 * Math.max(Math.abs((f ? f.clientWidth : 0) - c), c) + 2,
                                x = 2 * Math.max(Math.abs((f ? f.clientHeight : 0) - d), d) + 2;
                              p = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2));
                            }
                            e.touches
                              ? null === w.current &&
                                ((w.current = function () {
                                  T({ pulsate: o, rippleX: c, rippleY: d, rippleSize: p, cb: a });
                                }),
                                (_.current = setTimeout(function () {
                                  w.current && (w.current(), (w.current = null));
                                }, 80)))
                              : T({ pulsate: o, rippleX: c, rippleY: d, rippleSize: p, cb: a });
                          }
                        },
                        [n, T]
                      ),
                      k = l.useCallback(
                        function () {
                          x({}, { pulsate: !0 });
                        },
                        [x]
                      ),
                      C = l.useCallback(function (e, t) {
                        if ((clearTimeout(_.current), 'touchend' === e.type && w.current))
                          return (
                            e.persist(),
                            w.current(),
                            (w.current = null),
                            void (_.current = setTimeout(function () {
                              C(e, t);
                            }))
                          );
                        (w.current = null),
                          g(function (e) {
                            return e.length > 0 ? e.slice(1) : e;
                          }),
                          (y.current = t);
                      }, []);
                    return (
                      l.useImperativeHandle(
                        t,
                        function () {
                          return { pulsate: k, start: x, stop: C };
                        },
                        [k, x, C]
                      ),
                      l.createElement(
                        'span',
                        (0, o.default)({ className: (0, c.default)(r.root, d), ref: E }, f),
                        l.createElement(u.TransitionGroup, { component: null, exit: !0 }, h)
                      )
                    );
                  }),
                  h = (0, d.default)(f, { flip: !1, name: 'MuiTouchRipple' })(l.memo(m));
                a.default = h;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ButtonBase/TouchRipple.js',
      },
    ],
    [
      880,
      { './ButtonBase': 877, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ButtonBase'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/ButtonBase/index.js' },
    ],
    [
      881,
      {
        '../Button': 876,
        '../styles/colorManipulator': 1159,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-is': 5181,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (e('react-is'), r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../utils/capitalize')),
                  c = e('../styles/colorManipulator'),
                  d = r(e('../styles/withStyles'));
                r(e('../Button')).default.styles;
                var p = function (e) {
                  return {
                    root: { display: 'inline-flex', borderRadius: e.shape.borderRadius },
                    contained: { boxShadow: e.shadows[2] },
                    disableElevation: { boxShadow: 'none' },
                    disabled: {},
                    fullWidth: { width: '100%' },
                    vertical: { flexDirection: 'column' },
                    grouped: { minWidth: 40 },
                    groupedHorizontal: {
                      '&:not(:first-child)': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                      '&:not(:last-child)': { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                    },
                    groupedVertical: {
                      '&:not(:first-child)': { borderTopRightRadius: 0, borderTopLeftRadius: 0 },
                      '&:not(:last-child)': {
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                    },
                    groupedText: {},
                    groupedTextHorizontal: {
                      '&:not(:last-child)': {
                        borderRight: '1px solid '.concat(
                          'light' === e.palette.type
                            ? 'rgba(0, 0, 0, 0.23)'
                            : 'rgba(255, 255, 255, 0.23)'
                        ),
                      },
                    },
                    groupedTextVertical: {
                      '&:not(:last-child)': {
                        borderBottom: '1px solid '.concat(
                          'light' === e.palette.type
                            ? 'rgba(0, 0, 0, 0.23)'
                            : 'rgba(255, 255, 255, 0.23)'
                        ),
                      },
                    },
                    groupedTextPrimary: {
                      '&:not(:last-child)': {
                        borderColor: (0, c.fade)(e.palette.primary.main, 0.5),
                      },
                    },
                    groupedTextSecondary: {
                      '&:not(:last-child)': {
                        borderColor: (0, c.fade)(e.palette.secondary.main, 0.5),
                      },
                    },
                    groupedOutlined: {},
                    groupedOutlinedHorizontal: {
                      '&:not(:first-child)': { marginLeft: -1 },
                      '&:not(:last-child)': { borderRightColor: 'transparent' },
                    },
                    groupedOutlinedVertical: {
                      '&:not(:first-child)': { marginTop: -1 },
                      '&:not(:last-child)': { borderBottomColor: 'transparent' },
                    },
                    groupedOutlinedPrimary: { '&:hover': { borderColor: e.palette.primary.main } },
                    groupedOutlinedSecondary: {
                      '&:hover': { borderColor: e.palette.secondary.main },
                    },
                    groupedContained: { boxShadow: 'none' },
                    groupedContainedHorizontal: {
                      '&:not(:last-child)': {
                        borderRight: '1px solid '.concat(e.palette.grey[400]),
                        '&$disabled': {
                          borderRight: '1px solid '.concat(e.palette.action.disabled),
                        },
                      },
                    },
                    groupedContainedVertical: {
                      '&:not(:last-child)': {
                        borderBottom: '1px solid '.concat(e.palette.grey[400]),
                        '&$disabled': {
                          borderBottom: '1px solid '.concat(e.palette.action.disabled),
                        },
                      },
                    },
                    groupedContainedPrimary: {
                      '&:not(:last-child)': { borderColor: e.palette.primary.dark },
                    },
                    groupedContainedSecondary: {
                      '&:not(:last-child)': { borderColor: e.palette.secondary.dark },
                    },
                  };
                };
                a.styles = p;
                var f = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      c = e.color,
                      d = void 0 === c ? 'default' : c,
                      p = e.component,
                      f = void 0 === p ? 'div' : p,
                      m = e.disabled,
                      h = void 0 !== m && m,
                      g = e.disableElevation,
                      b = void 0 !== g && g,
                      y = e.disableFocusRipple,
                      v = void 0 !== y && y,
                      _ = e.disableRipple,
                      w = void 0 !== _ && _,
                      E = e.fullWidth,
                      T = void 0 !== E && E,
                      x = e.orientation,
                      k = void 0 === x ? 'horizontal' : x,
                      C = e.size,
                      S = void 0 === C ? 'medium' : C,
                      R = e.variant,
                      P = void 0 === R ? 'outlined' : R,
                      O = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'color',
                        'component',
                        'disabled',
                        'disableElevation',
                        'disableFocusRipple',
                        'disableRipple',
                        'fullWidth',
                        'orientation',
                        'size',
                        'variant',
                      ]),
                      M = (0, l.default)(
                        n.grouped,
                        n['grouped'.concat((0, u.default)(k))],
                        n['grouped'.concat((0, u.default)(P))],
                        n['grouped'.concat((0, u.default)(P)).concat((0, u.default)(k))],
                        n[
                          'grouped'
                            .concat((0, u.default)(P))
                            .concat('default' !== d ? (0, u.default)(d) : '')
                        ],
                        h && n.disabled
                      );
                    return i.createElement(
                      f,
                      (0, o.default)(
                        {
                          role: 'group',
                          className: (0, l.default)(
                            n.root,
                            r,
                            T && n.fullWidth,
                            b && n.disableElevation,
                            'contained' === P && n.contained,
                            'vertical' === k && n.vertical
                          ),
                          ref: t,
                        },
                        O
                      ),
                      i.Children.map(a, function (e) {
                        return i.isValidElement(e)
                          ? i.cloneElement(e, {
                              className: (0, l.default)(M, e.props.className),
                              color: e.props.color || d,
                              disabled: e.props.disabled || h,
                              disableElevation: e.props.disableElevation || b,
                              disableFocusRipple: v,
                              disableRipple: w,
                              fullWidth: T,
                              size: e.props.size || S,
                              variant: e.props.variant || P,
                            })
                          : null;
                      })
                    );
                  }),
                  m = (0, d.default)(p, { name: 'MuiButtonGroup' })(f);
                a.default = m;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ButtonGroup/ButtonGroup.js',
      },
    ],
    [
      882,
      { './ButtonGroup': 881, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ButtonGroup'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/ButtonGroup/index.js' },
    ],
    [
      883,
      {
        '../Paper': 1018,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../Paper')),
                  c = r(e('../styles/withStyles')),
                  d = { root: { overflow: 'hidden' } };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.raised,
                      c = void 0 !== r && r,
                      d = (0, s.default)(e, ['classes', 'className', 'raised']);
                    return i.createElement(
                      u.default,
                      (0, o.default)(
                        { className: (0, l.default)(a.root, n), elevation: c ? 8 : 1, ref: t },
                        d
                      )
                    );
                  }),
                  f = (0, c.default)(d, { name: 'MuiCard' })(p);
                a.default = f;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Card/Card.js' },
    ],
    [
      884,
      { './Card': 883, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Card'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Card/index.js' },
    ],
    [
      885,
      {
        '../ButtonBase': 880,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../ButtonBase')),
                  d = function (e) {
                    return {
                      root: {
                        display: 'block',
                        textAlign: 'inherit',
                        width: '100%',
                        '&:hover $focusHighlight': { opacity: e.palette.action.hoverOpacity },
                        '&$focusVisible $focusHighlight': { opacity: 0.12 },
                      },
                      focusVisible: {},
                      focusHighlight: {
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        borderRadius: 'inherit',
                        opacity: 0,
                        backgroundColor: 'currentcolor',
                        transition: e.transitions.create('opacity', {
                          duration: e.transitions.duration.short,
                        }),
                      },
                    };
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.focusVisibleClassName,
                      d = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'focusVisibleClassName',
                      ]);
                    return i.createElement(
                      c.default,
                      (0, o.default)(
                        {
                          className: (0, l.default)(n.root, r),
                          focusVisibleClassName: (0, l.default)(u, n.focusVisible),
                          ref: t,
                        },
                        d
                      ),
                      a,
                      i.createElement('span', { className: n.focusHighlight })
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiCardActionArea' })(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CardActionArea/CardActionArea.js',
      },
    ],
    [
      886,
      { './CardActionArea': 885, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CardActionArea'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CardActionArea/index.js',
      },
    ],
    [
      887,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = {
                    root: { display: 'flex', alignItems: 'center', padding: 8 },
                    spacing: { '& > :not(:first-child)': { marginLeft: 8 } },
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.disableSpacing,
                      n = void 0 !== a && a,
                      r = e.classes,
                      u = e.className,
                      c = (0, s.default)(e, ['disableSpacing', 'classes', 'className']);
                    return i.createElement(
                      'div',
                      (0, o.default)(
                        { className: (0, l.default)(r.root, u, !n && r.spacing), ref: t },
                        c
                      )
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiCardActions' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CardActions/CardActions.js',
      },
    ],
    [
      888,
      { './CardActions': 887, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CardActions'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/CardActions/index.js' },
    ],
    [
      889,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = { root: { padding: 16, '&:last-child': { paddingBottom: 24 } } };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.component,
                      u = void 0 === r ? 'div' : r,
                      c = (0, s.default)(e, ['classes', 'className', 'component']);
                    return i.createElement(
                      u,
                      (0, o.default)({ className: (0, l.default)(a.root, n), ref: t }, c)
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiCardContent' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CardContent/CardContent.js',
      },
    ],
    [
      890,
      { './CardContent': 889, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CardContent'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/CardContent/index.js' },
    ],
    [
      891,
      {
        '../Typography': 1105,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../Typography')),
                  d = {
                    root: { display: 'flex', alignItems: 'center', padding: 16 },
                    avatar: { flex: '0 0 auto', marginRight: 16 },
                    action: {
                      flex: '0 0 auto',
                      alignSelf: 'flex-start',
                      marginTop: -8,
                      marginRight: -8,
                    },
                    content: { flex: '1 1 auto' },
                    title: {},
                    subheader: {},
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.action,
                      n = e.avatar,
                      r = e.classes,
                      u = e.className,
                      d = e.component,
                      p = void 0 === d ? 'div' : d,
                      f = e.disableTypography,
                      m = void 0 !== f && f,
                      h = e.subheader,
                      g = e.subheaderTypographyProps,
                      b = e.title,
                      y = e.titleTypographyProps,
                      v = (0, s.default)(e, [
                        'action',
                        'avatar',
                        'classes',
                        'className',
                        'component',
                        'disableTypography',
                        'subheader',
                        'subheaderTypographyProps',
                        'title',
                        'titleTypographyProps',
                      ]),
                      _ = b;
                    null == _ ||
                      _.type === c.default ||
                      m ||
                      (_ = i.createElement(
                        c.default,
                        (0, o.default)(
                          {
                            variant: n ? 'body2' : 'h5',
                            className: r.title,
                            component: 'span',
                            display: 'block',
                          },
                          y
                        ),
                        _
                      ));
                    var w = h;
                    return (
                      null == w ||
                        w.type === c.default ||
                        m ||
                        (w = i.createElement(
                          c.default,
                          (0, o.default)(
                            {
                              variant: n ? 'body2' : 'body1',
                              className: r.subheader,
                              color: 'textSecondary',
                              component: 'span',
                              display: 'block',
                            },
                            g
                          ),
                          w
                        )),
                      i.createElement(
                        p,
                        (0, o.default)({ className: (0, l.default)(r.root, u), ref: t }, v),
                        n && i.createElement('div', { className: r.avatar }, n),
                        i.createElement('div', { className: r.content }, _, w),
                        a && i.createElement('div', { className: r.action }, a)
                      )
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiCardHeader' })(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CardHeader/CardHeader.js',
      },
    ],
    [
      892,
      { './CardHeader': 891, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CardHeader'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/CardHeader/index.js' },
    ],
    [
      893,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c =
                    (e('@material-ui/utils'),
                    {
                      root: {
                        display: 'block',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      },
                      media: { width: '100%' },
                      img: { objectFit: 'cover' },
                    });
                a.styles = c;
                var d = ['video', 'audio', 'picture', 'iframe', 'img'],
                  p = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.component,
                      c = void 0 === u ? 'div' : u,
                      p = e.image,
                      f = e.src,
                      m = e.style,
                      h = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'component',
                        'image',
                        'src',
                        'style',
                      ]),
                      g = -1 !== d.indexOf(c),
                      b =
                        !g && p
                          ? (0, o.default)({ backgroundImage: 'url("'.concat(p, '")') }, m)
                          : m;
                    return i.createElement(
                      c,
                      (0, o.default)(
                        {
                          className: (0, l.default)(
                            n.root,
                            r,
                            g && n.media,
                            -1 !== 'picture img'.indexOf(c) && n.img
                          ),
                          ref: t,
                          style: b,
                          src: g ? p || f : undefined,
                        },
                        h
                      ),
                      a
                    );
                  }),
                  f = (0, u.default)(c, { name: 'MuiCardMedia' })(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CardMedia/CardMedia.js',
      },
    ],
    [
      894,
      { './CardMedia': 893, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CardMedia'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/CardMedia/index.js' },
    ],
    [
      895,
      {
        '../internal/SwitchBase': 1132,
        '../internal/svg-icons/CheckBox': 1137,
        '../internal/svg-icons/CheckBoxOutlineBlank': 1138,
        '../internal/svg-icons/IndeterminateCheckBox': 1140,
        '../styles/colorManipulator': 1159,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = (e('@material-ui/utils'), r(e('../internal/SwitchBase'))),
                  c = r(e('../internal/svg-icons/CheckBoxOutlineBlank')),
                  d = r(e('../internal/svg-icons/CheckBox')),
                  p = e('../styles/colorManipulator'),
                  f = r(e('../internal/svg-icons/IndeterminateCheckBox')),
                  m = r(e('../utils/capitalize')),
                  h = r(e('../styles/withStyles')),
                  g = function (e) {
                    return {
                      root: { color: e.palette.text.secondary },
                      checked: {},
                      disabled: {},
                      indeterminate: {},
                      colorPrimary: {
                        '&$checked': {
                          color: e.palette.primary.main,
                          '&:hover': {
                            backgroundColor: (0, p.fade)(
                              e.palette.primary.main,
                              e.palette.action.hoverOpacity
                            ),
                            '@media (hover: none)': { backgroundColor: 'transparent' },
                          },
                        },
                        '&$disabled': { color: e.palette.action.disabled },
                      },
                      colorSecondary: {
                        '&$checked': {
                          color: e.palette.secondary.main,
                          '&:hover': {
                            backgroundColor: (0, p.fade)(
                              e.palette.secondary.main,
                              e.palette.action.hoverOpacity
                            ),
                            '@media (hover: none)': { backgroundColor: 'transparent' },
                          },
                        },
                        '&$disabled': { color: e.palette.action.disabled },
                      },
                    };
                  };
                a.styles = g;
                var b = i.createElement(d.default, null),
                  y = i.createElement(c.default, null),
                  v = i.createElement(f.default, null),
                  _ = i.forwardRef(function (e, t) {
                    var a = e.checkedIcon,
                      n = void 0 === a ? b : a,
                      r = e.classes,
                      c = e.color,
                      d = void 0 === c ? 'secondary' : c,
                      p = e.icon,
                      f = void 0 === p ? y : p,
                      h = e.indeterminate,
                      g = void 0 !== h && h,
                      _ = e.indeterminateIcon,
                      w = void 0 === _ ? v : _,
                      E = e.inputProps,
                      T = e.size,
                      x = void 0 === T ? 'medium' : T,
                      k = (0, s.default)(e, [
                        'checkedIcon',
                        'classes',
                        'color',
                        'icon',
                        'indeterminate',
                        'indeterminateIcon',
                        'inputProps',
                        'size',
                      ]),
                      C = g ? w : f,
                      S = g ? w : n;
                    return i.createElement(
                      u.default,
                      (0, o.default)(
                        {
                          type: 'checkbox',
                          classes: {
                            root: (0, l.default)(
                              r.root,
                              r['color'.concat((0, m.default)(d))],
                              g && r.indeterminate
                            ),
                            checked: r.checked,
                            disabled: r.disabled,
                          },
                          color: d,
                          inputProps: (0, o.default)({ 'data-indeterminate': g }, E),
                          icon: i.cloneElement(C, {
                            fontSize:
                              C.props.fontSize === undefined && 'small' === x
                                ? x
                                : C.props.fontSize,
                          }),
                          checkedIcon: i.cloneElement(S, {
                            fontSize:
                              S.props.fontSize === undefined && 'small' === x
                                ? x
                                : S.props.fontSize,
                          }),
                          ref: t,
                        },
                        k
                      )
                    );
                  }),
                  w = (0, h.default)(g, { name: 'MuiCheckbox' })(_);
                a.default = w;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Checkbox/Checkbox.js' },
    ],
    [
      896,
      { './Checkbox': 895, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Checkbox'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Checkbox/index.js' },
    ],
    [
      897,
      {
        '../ButtonBase': 880,
        '../internal/svg-icons/Cancel': 1136,
        '../styles/colorManipulator': 1159,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '../utils/unsupportedProp': 1200,
        '../utils/useForkRef': 1203,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../internal/svg-icons/Cancel')),
                  c = r(e('../styles/withStyles')),
                  d = e('../styles/colorManipulator'),
                  p = r(e('../utils/useForkRef')),
                  f = (r(e('../utils/unsupportedProp')), r(e('../utils/capitalize'))),
                  m = r(e('../ButtonBase')),
                  h = function (e) {
                    var t = 'light' === e.palette.type ? e.palette.grey[300] : e.palette.grey[700],
                      a = (0, d.fade)(e.palette.text.primary, 0.26);
                    return {
                      root: {
                        fontFamily: e.typography.fontFamily,
                        fontSize: e.typography.pxToRem(13),
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 32,
                        color: e.palette.getContrastText(t),
                        backgroundColor: t,
                        borderRadius: 16,
                        whiteSpace: 'nowrap',
                        transition: e.transitions.create(['background-color', 'box-shadow']),
                        cursor: 'default',
                        outline: 0,
                        textDecoration: 'none',
                        border: 'none',
                        padding: 0,
                        verticalAlign: 'middle',
                        boxSizing: 'border-box',
                        '&$disabled': { opacity: 0.5, pointerEvents: 'none' },
                        '& $avatar': {
                          marginLeft: 5,
                          marginRight: -6,
                          width: 24,
                          height: 24,
                          color:
                            'light' === e.palette.type ? e.palette.grey[700] : e.palette.grey[300],
                          fontSize: e.typography.pxToRem(12),
                        },
                        '& $avatarColorPrimary': {
                          color: e.palette.primary.contrastText,
                          backgroundColor: e.palette.primary.dark,
                        },
                        '& $avatarColorSecondary': {
                          color: e.palette.secondary.contrastText,
                          backgroundColor: e.palette.secondary.dark,
                        },
                        '& $avatarSmall': {
                          marginLeft: 4,
                          marginRight: -4,
                          width: 18,
                          height: 18,
                          fontSize: e.typography.pxToRem(10),
                        },
                      },
                      sizeSmall: { height: 24 },
                      colorPrimary: {
                        backgroundColor: e.palette.primary.main,
                        color: e.palette.primary.contrastText,
                      },
                      colorSecondary: {
                        backgroundColor: e.palette.secondary.main,
                        color: e.palette.secondary.contrastText,
                      },
                      disabled: {},
                      clickable: {
                        userSelect: 'none',
                        WebkitTapHighlightColor: 'transparent',
                        cursor: 'pointer',
                        '&:hover, &:focus': { backgroundColor: (0, d.emphasize)(t, 0.08) },
                        '&:active': { boxShadow: e.shadows[1] },
                      },
                      clickableColorPrimary: {
                        '&:hover, &:focus': {
                          backgroundColor: (0, d.emphasize)(e.palette.primary.main, 0.08),
                        },
                      },
                      clickableColorSecondary: {
                        '&:hover, &:focus': {
                          backgroundColor: (0, d.emphasize)(e.palette.secondary.main, 0.08),
                        },
                      },
                      deletable: { '&:focus': { backgroundColor: (0, d.emphasize)(t, 0.08) } },
                      deletableColorPrimary: {
                        '&:focus': {
                          backgroundColor: (0, d.emphasize)(e.palette.primary.main, 0.2),
                        },
                      },
                      deletableColorSecondary: {
                        '&:focus': {
                          backgroundColor: (0, d.emphasize)(e.palette.secondary.main, 0.2),
                        },
                      },
                      outlined: {
                        backgroundColor: 'transparent',
                        border: '1px solid '.concat(
                          'light' === e.palette.type
                            ? 'rgba(0, 0, 0, 0.23)'
                            : 'rgba(255, 255, 255, 0.23)'
                        ),
                        '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
                          backgroundColor: (0, d.fade)(
                            e.palette.text.primary,
                            e.palette.action.hoverOpacity
                          ),
                        },
                        '& $avatar': { marginLeft: 4 },
                        '& $avatarSmall': { marginLeft: 2 },
                        '& $icon': { marginLeft: 4 },
                        '& $iconSmall': { marginLeft: 2 },
                        '& $deleteIcon': { marginRight: 5 },
                        '& $deleteIconSmall': { marginRight: 3 },
                      },
                      outlinedPrimary: {
                        color: e.palette.primary.main,
                        border: '1px solid '.concat(e.palette.primary.main),
                        '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
                          backgroundColor: (0, d.fade)(
                            e.palette.primary.main,
                            e.palette.action.hoverOpacity
                          ),
                        },
                      },
                      outlinedSecondary: {
                        color: e.palette.secondary.main,
                        border: '1px solid '.concat(e.palette.secondary.main),
                        '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
                          backgroundColor: (0, d.fade)(
                            e.palette.secondary.main,
                            e.palette.action.hoverOpacity
                          ),
                        },
                      },
                      avatar: {},
                      avatarSmall: {},
                      avatarColorPrimary: {},
                      avatarColorSecondary: {},
                      icon: {
                        color:
                          'light' === e.palette.type ? e.palette.grey[700] : e.palette.grey[300],
                        marginLeft: 5,
                        marginRight: -6,
                      },
                      iconSmall: { width: 18, height: 18, marginLeft: 4, marginRight: -4 },
                      iconColorPrimary: { color: 'inherit' },
                      iconColorSecondary: { color: 'inherit' },
                      label: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        paddingLeft: 12,
                        paddingRight: 12,
                        whiteSpace: 'nowrap',
                      },
                      labelSmall: { paddingLeft: 8, paddingRight: 8 },
                      deleteIcon: {
                        WebkitTapHighlightColor: 'transparent',
                        color: a,
                        height: 22,
                        width: 22,
                        cursor: 'pointer',
                        margin: '0 5px 0 -6px',
                        '&:hover': { color: (0, d.fade)(a, 0.4) },
                      },
                      deleteIconSmall: { height: 16, width: 16, marginRight: 4, marginLeft: -4 },
                      deleteIconColorPrimary: {
                        color: (0, d.fade)(e.palette.primary.contrastText, 0.7),
                        '&:hover, &:active': { color: e.palette.primary.contrastText },
                      },
                      deleteIconColorSecondary: {
                        color: (0, d.fade)(e.palette.secondary.contrastText, 0.7),
                        '&:hover, &:active': { color: e.palette.secondary.contrastText },
                      },
                      deleteIconOutlinedColorPrimary: {
                        color: (0, d.fade)(e.palette.primary.main, 0.7),
                        '&:hover, &:active': { color: e.palette.primary.main },
                      },
                      deleteIconOutlinedColorSecondary: {
                        color: (0, d.fade)(e.palette.secondary.main, 0.7),
                        '&:hover, &:active': { color: e.palette.secondary.main },
                      },
                    };
                  };
                function g(e) {
                  return 'Backspace' === e.key || 'Delete' === e.key;
                }
                a.styles = h;
                var b = i.forwardRef(function (e, t) {
                    var a = e.avatar,
                      n = e.classes,
                      r = e.className,
                      c = e.clickable,
                      d = e.color,
                      h = void 0 === d ? 'default' : d,
                      b = e.component,
                      y = e.deleteIcon,
                      v = e.disabled,
                      _ = void 0 !== v && v,
                      w = e.icon,
                      E = e.label,
                      T = e.onClick,
                      x = e.onDelete,
                      k = e.onKeyDown,
                      C = e.onKeyUp,
                      S = e.size,
                      R = void 0 === S ? 'medium' : S,
                      P = e.variant,
                      O = void 0 === P ? 'default' : P,
                      M = (0, s.default)(e, [
                        'avatar',
                        'classes',
                        'className',
                        'clickable',
                        'color',
                        'component',
                        'deleteIcon',
                        'disabled',
                        'icon',
                        'label',
                        'onClick',
                        'onDelete',
                        'onKeyDown',
                        'onKeyUp',
                        'size',
                        'variant',
                      ]),
                      N = i.useRef(null),
                      D = (0, p.default)(N, t),
                      I = function (e) {
                        e.stopPropagation(), x && x(e);
                      },
                      A = !(!1 === c || !T) || c,
                      j = 'small' === R,
                      L = b || (A ? m.default : 'div'),
                      B = L === m.default ? { component: 'div' } : {},
                      F = null;
                    if (x) {
                      var q = (0, l.default)(
                        'default' !== h &&
                          ('default' === O
                            ? n['deleteIconColor'.concat((0, f.default)(h))]
                            : n['deleteIconOutlinedColor'.concat((0, f.default)(h))]),
                        j && n.deleteIconSmall
                      );
                      F =
                        y && i.isValidElement(y)
                          ? i.cloneElement(y, {
                              className: (0, l.default)(y.props.className, n.deleteIcon, q),
                              onClick: I,
                            })
                          : i.createElement(u.default, {
                              className: (0, l.default)(n.deleteIcon, q),
                              onClick: I,
                            });
                    }
                    var W = null;
                    a &&
                      i.isValidElement(a) &&
                      (W = i.cloneElement(a, {
                        className: (0, l.default)(
                          n.avatar,
                          a.props.className,
                          j && n.avatarSmall,
                          'default' !== h && n['avatarColor'.concat((0, f.default)(h))]
                        ),
                      }));
                    var U = null;
                    return (
                      w &&
                        i.isValidElement(w) &&
                        (U = i.cloneElement(w, {
                          className: (0, l.default)(
                            n.icon,
                            w.props.className,
                            j && n.iconSmall,
                            'default' !== h && n['iconColor'.concat((0, f.default)(h))]
                          ),
                        })),
                      i.createElement(
                        L,
                        (0, o.default)(
                          {
                            role: A || x ? 'button' : undefined,
                            className: (0, l.default)(
                              n.root,
                              r,
                              'default' !== h && [
                                n['color'.concat((0, f.default)(h))],
                                A && n['clickableColor'.concat((0, f.default)(h))],
                                x && n['deletableColor'.concat((0, f.default)(h))],
                              ],
                              'default' !== O && [
                                n.outlined,
                                { primary: n.outlinedPrimary, secondary: n.outlinedSecondary }[h],
                              ],
                              _ && n.disabled,
                              j && n.sizeSmall,
                              A && n.clickable,
                              x && n.deletable
                            ),
                            'aria-disabled': !!_ || undefined,
                            tabIndex: A || x ? 0 : undefined,
                            onClick: T,
                            onKeyDown: function (e) {
                              e.currentTarget === e.target && g(e) && e.preventDefault(), k && k(e);
                            },
                            onKeyUp: function (e) {
                              e.currentTarget === e.target &&
                                (x && g(e)
                                  ? x(e)
                                  : 'Escape' === e.key && N.current && N.current.blur()),
                                C && C(e);
                            },
                            ref: D,
                          },
                          B,
                          M
                        ),
                        W || U,
                        i.createElement(
                          'span',
                          { className: (0, l.default)(n.label, j && n.labelSmall) },
                          E
                        ),
                        F
                      )
                    );
                  }),
                  y = (0, c.default)(h, { name: 'MuiChip' })(b);
                a.default = y;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Chip/Chip.js' },
    ],
    [
      898,
      { './Chip': 897, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Chip'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Chip/index.js' },
    ],
    [
      899,
      {
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = (e('@material-ui/utils'), r(e('../styles/withStyles'))),
                  c = r(e('../utils/capitalize')),
                  d = 44;
                function p(e) {
                  var t, a, n;
                  return (
                    (t = e),
                    (a = 0),
                    (n = 1),
                    (e = (Math.min(Math.max(a, t), n) - a) / (n - a)),
                    (e = (e -= 1) * e * e + 1)
                  );
                }
                var f = function (e) {
                  return {
                    root: { display: 'inline-block' },
                    static: { transition: e.transitions.create('transform') },
                    indeterminate: { animation: '$circular-rotate 1.4s linear infinite' },
                    colorPrimary: { color: e.palette.primary.main },
                    colorSecondary: { color: e.palette.secondary.main },
                    svg: { display: 'block' },
                    circle: { stroke: 'currentColor' },
                    circleStatic: { transition: e.transitions.create('stroke-dashoffset') },
                    circleIndeterminate: {
                      animation: '$circular-dash 1.4s ease-in-out infinite',
                      strokeDasharray: '80px, 200px',
                      strokeDashoffset: '0px',
                    },
                    '@keyframes circular-rotate': {
                      '0%': { transformOrigin: '50% 50%' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                    '@keyframes circular-dash': {
                      '0%': { strokeDasharray: '1px, 200px', strokeDashoffset: '0px' },
                      '50%': { strokeDasharray: '100px, 200px', strokeDashoffset: '-15px' },
                      '100%': { strokeDasharray: '100px, 200px', strokeDashoffset: '-125px' },
                    },
                    circleDisableShrink: { animation: 'none' },
                  };
                };
                a.styles = f;
                var m = i.forwardRef(function (e, t) {
                    var a,
                      n = e.classes,
                      r = e.className,
                      u = e.color,
                      f = void 0 === u ? 'primary' : u,
                      m = e.disableShrink,
                      h = void 0 !== m && m,
                      g = e.size,
                      b = void 0 === g ? 40 : g,
                      y = e.style,
                      v = e.thickness,
                      _ = void 0 === v ? 3.6 : v,
                      w = e.value,
                      E = void 0 === w ? 0 : w,
                      T = e.variant,
                      x = void 0 === T ? 'indeterminate' : T,
                      k = (0, s.default)(e, [
                        'classes',
                        'className',
                        'color',
                        'disableShrink',
                        'size',
                        'style',
                        'thickness',
                        'value',
                        'variant',
                      ]),
                      C = {},
                      S = {},
                      R = {};
                    if ('determinate' === x || 'static' === x) {
                      var P = 2 * Math.PI * ((d - _) / 2);
                      (C.strokeDasharray = P.toFixed(3)),
                        (R['aria-valuenow'] = Math.round(E)),
                        'static' === x
                          ? ((C.strokeDashoffset = ''.concat(
                              (((100 - E) / 100) * P).toFixed(3),
                              'px'
                            )),
                            (S.transform = 'rotate(-90deg)'))
                          : ((C.strokeDashoffset = ''.concat(
                              ((a = (100 - E) / 100), a * a * P).toFixed(3),
                              'px'
                            )),
                            (S.transform = 'rotate('.concat((270 * p(E / 70)).toFixed(3), 'deg)')));
                    }
                    return i.createElement(
                      'div',
                      (0, o.default)(
                        {
                          className: (0, l.default)(
                            n.root,
                            r,
                            'inherit' !== f && n['color'.concat((0, c.default)(f))],
                            { indeterminate: n.indeterminate, static: n.static }[x]
                          ),
                          style: (0, o.default)({ width: b, height: b }, S, y),
                          ref: t,
                          role: 'progressbar',
                        },
                        R,
                        k
                      ),
                      i.createElement(
                        'svg',
                        {
                          className: n.svg,
                          viewBox: ''.concat(22, ' ').concat(22, ' ').concat(d, ' ').concat(d),
                        },
                        i.createElement('circle', {
                          className: (0, l.default)(
                            n.circle,
                            h && n.circleDisableShrink,
                            { indeterminate: n.circleIndeterminate, static: n.circleStatic }[x]
                          ),
                          style: C,
                          cx: d,
                          cy: d,
                          r: (d - _) / 2,
                          fill: 'none',
                          strokeWidth: _,
                        })
                      )
                    );
                  }),
                  h = (0, u.default)(f, { name: 'MuiCircularProgress', flip: !1 })(m);
                a.default = h;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CircularProgress/CircularProgress.js',
      },
    ],
    [
      900,
      { './CircularProgress': 899, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CircularProgress'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CircularProgress/index.js',
      },
    ],
    [
      901,
      {
        '../utils/ownerDocument': 1194,
        '../utils/useEventCallback': 1202,
        '../utils/useForkRef': 1203,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@material-ui/utils': 1269,
        'prop-types': 5082,
        react: 5328,
        'react-dom': 5157,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault'),
                  r = e('@babel/runtime/helpers/interopRequireWildcard');
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var o = r(e('react')),
                  s = r(e('react-dom')),
                  i = (n(e('prop-types')), n(e('../utils/ownerDocument'))),
                  l = n(e('../utils/useForkRef')),
                  u = n(e('../utils/useEventCallback'));
                e('@material-ui/utils');
                function c(e) {
                  return e.substring(2).toLowerCase();
                }
                function d(e) {
                  var t = e.children,
                    a = e.disableReactTree,
                    n = void 0 !== a && a,
                    r = e.mouseEvent,
                    d = void 0 === r ? 'onClick' : r,
                    p = e.onClickAway,
                    f = e.touchEvent,
                    m = void 0 === f ? 'onTouchEnd' : f,
                    h = o.useRef(!1),
                    g = o.useRef(null),
                    b = o.useRef(!1),
                    y = o.useRef(!1);
                  o.useEffect(function () {
                    return (
                      (b.current = !0),
                      function () {
                        b.current = !1;
                      }
                    );
                  }, []);
                  var v = o.useCallback(function (e) {
                      g.current = s.findDOMNode(e);
                    }, []),
                    _ = (0, l.default)(t.ref, v),
                    w = (0, u.default)(function (e) {
                      var t = y.current;
                      if (
                        ((y.current = !1),
                        b.current &&
                          g.current &&
                          !(function (e) {
                            return (
                              document.documentElement.clientWidth < e.clientX ||
                              document.documentElement.clientHeight < e.clientY
                            );
                          })(e))
                      )
                        if (h.current) h.current = !1;
                        else {
                          var a;
                          if (e.composedPath) a = e.composedPath().indexOf(g.current) > -1;
                          else
                            a =
                              !(0, i.default)(g.current).documentElement.contains(e.target) ||
                              g.current.contains(e.target);
                          a || (!n && t) || p(e);
                        }
                    }),
                    E = function (e) {
                      return function (a) {
                        y.current = !0;
                        var n = t.props[e];
                        n && n(a);
                      };
                    },
                    T = { ref: _ };
                  return (
                    !1 !== m && (T[m] = E(m)),
                    o.useEffect(
                      function () {
                        if (!1 !== m) {
                          var e = c(m),
                            t = (0, i.default)(g.current),
                            a = function () {
                              h.current = !0;
                            };
                          return (
                            t.addEventListener(e, w),
                            t.addEventListener('touchmove', a),
                            function () {
                              t.removeEventListener(e, w), t.removeEventListener('touchmove', a);
                            }
                          );
                        }
                        return undefined;
                      },
                      [w, m]
                    ),
                    !1 !== d && (T[d] = E(d)),
                    o.useEffect(
                      function () {
                        if (!1 !== d) {
                          var e = c(d),
                            t = (0, i.default)(g.current);
                          return (
                            t.addEventListener(e, w),
                            function () {
                              t.removeEventListener(e, w);
                            }
                          );
                        }
                        return undefined;
                      },
                      [w, d]
                    ),
                    o.createElement(o.Fragment, null, o.cloneElement(t, T))
                  );
                }
                var p = d;
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ClickAwayListener/ClickAwayListener.js',
      },
    ],
    [
      902,
      { './ClickAwayListener': 901, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ClickAwayListener'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ClickAwayListener/index.js',
      },
    ],
    [
      903,
      {
        '../styles/transitions': 1176,
        '../styles/useTheme': 1177,
        '../styles/withStyles': 1178,
        '../transitions/utils': 1181,
        '../utils': 1192,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@babel/runtime/helpers/slicedToArray': 415,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-transition-group': 1156,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/slicedToArray')),
                  i = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  l = n(e('react')),
                  u = r(e('clsx')),
                  c = (r(e('prop-types')), e('react-transition-group')),
                  d = r(e('../styles/withStyles')),
                  p = e('../styles/transitions'),
                  f = e('../transitions/utils'),
                  m = r(e('../styles/useTheme')),
                  h = e('../utils'),
                  g = function (e) {
                    return {
                      container: {
                        height: 0,
                        overflow: 'hidden',
                        transition: e.transitions.create('height'),
                      },
                      entered: { height: 'auto', overflow: 'visible' },
                      hidden: { visibility: 'hidden' },
                      wrapper: { display: 'flex' },
                      wrapperInner: { width: '100%' },
                    };
                  };
                a.styles = g;
                var b = l.forwardRef(function (e, t) {
                  var a = e.children,
                    n = e.classes,
                    r = e.className,
                    d = e.collapsedHeight,
                    g = void 0 === d ? '0px' : d,
                    b = e.component,
                    y = void 0 === b ? 'div' : b,
                    v = e.disableStrictModeCompat,
                    _ = void 0 !== v && v,
                    w = e.in,
                    E = e.onEnter,
                    T = e.onEntered,
                    x = e.onEntering,
                    k = e.onExit,
                    C = e.onExited,
                    S = e.onExiting,
                    R = e.style,
                    P = e.timeout,
                    O = void 0 === P ? p.duration.standard : P,
                    M = e.TransitionComponent,
                    N = void 0 === M ? c.Transition : M,
                    D = (0, i.default)(e, [
                      'children',
                      'classes',
                      'className',
                      'collapsedHeight',
                      'component',
                      'disableStrictModeCompat',
                      'in',
                      'onEnter',
                      'onEntered',
                      'onEntering',
                      'onExit',
                      'onExited',
                      'onExiting',
                      'style',
                      'timeout',
                      'TransitionComponent',
                    ]),
                    I = (0, m.default)(),
                    A = l.useRef(),
                    j = l.useRef(null),
                    L = l.useRef(),
                    B = 'number' == typeof g ? ''.concat(g, 'px') : g;
                  l.useEffect(function () {
                    return function () {
                      clearTimeout(A.current);
                    };
                  }, []);
                  var F = I.unstable_strictMode && !_,
                    q = l.useRef(null),
                    W = (0, h.useForkRef)(t, F ? q : undefined),
                    U = function (e) {
                      return function (t, a) {
                        if (e) {
                          var n = F ? [q.current, t] : [t, a],
                            r = (0, s.default)(n, 2),
                            o = r[0],
                            i = r[1];
                          i === undefined ? e(o) : e(o, i);
                        }
                      };
                    },
                    $ = U(function (e, t) {
                      (e.style.height = B), E && E(e, t);
                    }),
                    V = U(function (e, t) {
                      var a = j.current ? j.current.clientHeight : 0,
                        n = (0, f.getTransitionProps)(
                          { style: R, timeout: O },
                          { mode: 'enter' }
                        ).duration;
                      if ('auto' === O) {
                        var r = I.transitions.getAutoHeightDuration(a);
                        (e.style.transitionDuration = ''.concat(r, 'ms')), (L.current = r);
                      } else
                        e.style.transitionDuration = 'string' == typeof n ? n : ''.concat(n, 'ms');
                      (e.style.height = ''.concat(a, 'px')), x && x(e, t);
                    }),
                    z = U(function (e, t) {
                      (e.style.height = 'auto'), T && T(e, t);
                    }),
                    H = U(function (e) {
                      var t = j.current ? j.current.clientHeight : 0;
                      (e.style.height = ''.concat(t, 'px')), k && k(e);
                    }),
                    G = U(C),
                    Q = U(function (e) {
                      var t = j.current ? j.current.clientHeight : 0,
                        a = (0, f.getTransitionProps)(
                          { style: R, timeout: O },
                          { mode: 'exit' }
                        ).duration;
                      if ('auto' === O) {
                        var n = I.transitions.getAutoHeightDuration(t);
                        (e.style.transitionDuration = ''.concat(n, 'ms')), (L.current = n);
                      } else
                        e.style.transitionDuration = 'string' == typeof a ? a : ''.concat(a, 'ms');
                      (e.style.height = B), S && S(e);
                    });
                  return l.createElement(
                    N,
                    (0, o.default)(
                      {
                        in: w,
                        onEnter: $,
                        onEntered: z,
                        onEntering: V,
                        onExit: H,
                        onExited: G,
                        onExiting: Q,
                        addEndListener: function (e, t) {
                          var a = F ? e : t;
                          'auto' === O && (A.current = setTimeout(a, L.current || 0));
                        },
                        nodeRef: F ? q : undefined,
                        timeout: 'auto' === O ? null : O,
                      },
                      D
                    ),
                    function (e, t) {
                      return l.createElement(
                        y,
                        (0, o.default)(
                          {
                            className: (0, u.default)(
                              n.container,
                              r,
                              { entered: n.entered, exited: !w && '0px' === B && n.hidden }[e]
                            ),
                            style: (0, o.default)({ minHeight: B }, R),
                            ref: W,
                          },
                          t
                        ),
                        l.createElement(
                          'div',
                          { className: n.wrapper, ref: j },
                          l.createElement('div', { className: n.wrapperInner }, a)
                        )
                      );
                    }
                  );
                });
                b.muiSupportAuto = !0;
                var y = (0, d.default)(g, { name: 'MuiCollapse' })(b);
                a.default = y;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Collapse/Collapse.js' },
    ],
    [
      904,
      { './Collapse': 903, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Collapse'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Collapse/index.js' },
    ],
    [
      905,
      {
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/defineProperty': 398,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = r(e('@babel/runtime/helpers/defineProperty')),
                  l = n(e('react')),
                  u = (r(e('prop-types')), r(e('clsx'))),
                  c = r(e('../styles/withStyles')),
                  d = r(e('../utils/capitalize')),
                  p = function (e) {
                    return {
                      root: (0, i.default)(
                        {
                          width: '100%',
                          marginLeft: 'auto',
                          boxSizing: 'border-box',
                          marginRight: 'auto',
                          paddingLeft: e.spacing(2),
                          paddingRight: e.spacing(2),
                          display: 'block',
                        },
                        e.breakpoints.up('sm'),
                        { paddingLeft: e.spacing(3), paddingRight: e.spacing(3) }
                      ),
                      disableGutters: { paddingLeft: 0, paddingRight: 0 },
                      fixed: Object.keys(e.breakpoints.values).reduce(function (t, a) {
                        var n = e.breakpoints.values[a];
                        return 0 !== n && (t[e.breakpoints.up(a)] = { maxWidth: n }), t;
                      }, {}),
                      maxWidthXs: (0, i.default)({}, e.breakpoints.up('xs'), {
                        maxWidth: Math.max(e.breakpoints.values.xs, 444),
                      }),
                      maxWidthSm: (0, i.default)({}, e.breakpoints.up('sm'), {
                        maxWidth: e.breakpoints.values.sm,
                      }),
                      maxWidthMd: (0, i.default)({}, e.breakpoints.up('md'), {
                        maxWidth: e.breakpoints.values.md,
                      }),
                      maxWidthLg: (0, i.default)({}, e.breakpoints.up('lg'), {
                        maxWidth: e.breakpoints.values.lg,
                      }),
                      maxWidthXl: (0, i.default)({}, e.breakpoints.up('xl'), {
                        maxWidth: e.breakpoints.values.xl,
                      }),
                    };
                  };
                a.styles = p;
                var f = l.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.component,
                      i = void 0 === r ? 'div' : r,
                      c = e.disableGutters,
                      p = void 0 !== c && c,
                      f = e.fixed,
                      m = void 0 !== f && f,
                      h = e.maxWidth,
                      g = void 0 === h ? 'lg' : h,
                      b = (0, s.default)(e, [
                        'classes',
                        'className',
                        'component',
                        'disableGutters',
                        'fixed',
                        'maxWidth',
                      ]);
                    return l.createElement(
                      i,
                      (0, o.default)(
                        {
                          className: (0, u.default)(
                            a.root,
                            n,
                            m && a.fixed,
                            p && a.disableGutters,
                            !1 !== g && a['maxWidth'.concat((0, d.default)(String(g)))]
                          ),
                          ref: t,
                        },
                        b
                      )
                    );
                  }),
                  m = (0, c.default)(p, { name: 'MuiContainer' })(f);
                a.default = m;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/Container/Container.js',
      },
    ],
    [
      906,
      { './Container': 905, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Container'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Container/index.js' },
    ],
    [
      907,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@material-ui/utils': 1269,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = a.body = a.html = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = n(e('react')),
                  i = (r(e('prop-types')), r(e('../styles/withStyles'))),
                  l =
                    (e('@material-ui/utils'),
                    {
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      boxSizing: 'border-box',
                    });
                a.html = l;
                var u = function (e) {
                  return (0, o.default)({ color: e.palette.text.primary }, e.typography.body2, {
                    backgroundColor: e.palette.background.default,
                    '@media print': { backgroundColor: e.palette.common.white },
                  });
                };
                a.body = u;
                var c = function (e) {
                  return {
                    '@global': {
                      html: l,
                      '*, *::before, *::after': { boxSizing: 'inherit' },
                      'strong, b': { fontWeight: e.typography.fontWeightBold },
                      body: (0, o.default)({ margin: 0 }, u(e), {
                        '&::backdrop': { backgroundColor: e.palette.background.default },
                      }),
                    },
                  };
                };
                function d(e) {
                  var t = e.children,
                    a = void 0 === t ? null : t;
                  e.classes;
                  return s.createElement(s.Fragment, null, a);
                }
                a.styles = c;
                var p = (0, i.default)(c, { name: 'MuiCssBaseline' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/CssBaseline/CssBaseline.js',
      },
    ],
    [
      908,
      { './CssBaseline': 907, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./CssBaseline'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/CssBaseline/index.js' },
    ],
    [
      909,
      {
        '../Backdrop': 863,
        '../Fade': 935,
        '../Modal': 1008,
        '../Paper': 1018,
        '../styles/transitions': 1176,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/defineProperty': 398,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = r(e('@babel/runtime/helpers/defineProperty')),
                  l = n(e('react')),
                  u = (r(e('prop-types')), r(e('clsx'))),
                  c = r(e('../styles/withStyles')),
                  d = r(e('../utils/capitalize')),
                  p = r(e('../Modal')),
                  f = r(e('../Backdrop')),
                  m = r(e('../Fade')),
                  h = e('../styles/transitions'),
                  g = r(e('../Paper')),
                  b = function (e) {
                    return {
                      root: { '@media print': { position: 'absolute !important' } },
                      scrollPaper: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      scrollBody: {
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        textAlign: 'center',
                        '&:after': {
                          content: '""',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          height: '100%',
                          width: '0',
                        },
                      },
                      container: { height: '100%', '@media print': { height: 'auto' }, outline: 0 },
                      paper: {
                        margin: 32,
                        position: 'relative',
                        overflowY: 'auto',
                        '@media print': { overflowY: 'visible', boxShadow: 'none' },
                      },
                      paperScrollPaper: {
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 'calc(100% - 64px)',
                      },
                      paperScrollBody: {
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        textAlign: 'left',
                      },
                      paperWidthFalse: { maxWidth: 'calc(100% - 64px)' },
                      paperWidthXs: {
                        maxWidth: Math.max(e.breakpoints.values.xs, 444),
                        '&$paperScrollBody': (0, i.default)(
                          {},
                          e.breakpoints.down(Math.max(e.breakpoints.values.xs, 444) + 64),
                          { maxWidth: 'calc(100% - 64px)' }
                        ),
                      },
                      paperWidthSm: {
                        maxWidth: e.breakpoints.values.sm,
                        '&$paperScrollBody': (0, i.default)(
                          {},
                          e.breakpoints.down(e.breakpoints.values.sm + 64),
                          { maxWidth: 'calc(100% - 64px)' }
                        ),
                      },
                      paperWidthMd: {
                        maxWidth: e.breakpoints.values.md,
                        '&$paperScrollBody': (0, i.default)(
                          {},
                          e.breakpoints.down(e.breakpoints.values.md + 64),
                          { maxWidth: 'calc(100% - 64px)' }
                        ),
                      },
                      paperWidthLg: {
                        maxWidth: e.breakpoints.values.lg,
                        '&$paperScrollBody': (0, i.default)(
                          {},
                          e.breakpoints.down(e.breakpoints.values.lg + 64),
                          { maxWidth: 'calc(100% - 64px)' }
                        ),
                      },
                      paperWidthXl: {
                        maxWidth: e.breakpoints.values.xl,
                        '&$paperScrollBody': (0, i.default)(
                          {},
                          e.breakpoints.down(e.breakpoints.values.xl + 64),
                          { maxWidth: 'calc(100% - 64px)' }
                        ),
                      },
                      paperFullWidth: { width: 'calc(100% - 64px)' },
                      paperFullScreen: {
                        margin: 0,
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        maxHeight: 'none',
                        borderRadius: 0,
                        '&$paperScrollBody': { margin: 0, maxWidth: '100%' },
                      },
                    };
                  };
                a.styles = b;
                var y = { enter: h.duration.enteringScreen, exit: h.duration.leavingScreen },
                  v = l.forwardRef(function (e, t) {
                    var a = e.BackdropProps,
                      n = e.children,
                      r = e.classes,
                      i = e.className,
                      c = e.disableBackdropClick,
                      h = void 0 !== c && c,
                      b = e.disableEscapeKeyDown,
                      v = void 0 !== b && b,
                      _ = e.fullScreen,
                      w = void 0 !== _ && _,
                      E = e.fullWidth,
                      T = void 0 !== E && E,
                      x = e.maxWidth,
                      k = void 0 === x ? 'sm' : x,
                      C = e.onBackdropClick,
                      S = e.onClose,
                      R = e.onEnter,
                      P = e.onEntered,
                      O = e.onEntering,
                      M = e.onEscapeKeyDown,
                      N = e.onExit,
                      D = e.onExited,
                      I = e.onExiting,
                      A = e.open,
                      j = e.PaperComponent,
                      L = void 0 === j ? g.default : j,
                      B = e.PaperProps,
                      F = void 0 === B ? {} : B,
                      q = e.scroll,
                      W = void 0 === q ? 'paper' : q,
                      U = e.TransitionComponent,
                      $ = void 0 === U ? m.default : U,
                      V = e.transitionDuration,
                      z = void 0 === V ? y : V,
                      H = e.TransitionProps,
                      G = e['aria-describedby'],
                      Q = e['aria-labelledby'],
                      X = (0, s.default)(e, [
                        'BackdropProps',
                        'children',
                        'classes',
                        'className',
                        'disableBackdropClick',
                        'disableEscapeKeyDown',
                        'fullScreen',
                        'fullWidth',
                        'maxWidth',
                        'onBackdropClick',
                        'onClose',
                        'onEnter',
                        'onEntered',
                        'onEntering',
                        'onEscapeKeyDown',
                        'onExit',
                        'onExited',
                        'onExiting',
                        'open',
                        'PaperComponent',
                        'PaperProps',
                        'scroll',
                        'TransitionComponent',
                        'transitionDuration',
                        'TransitionProps',
                        'aria-describedby',
                        'aria-labelledby',
                      ]),
                      K = l.useRef();
                    return l.createElement(
                      p.default,
                      (0, o.default)(
                        {
                          className: (0, u.default)(r.root, i),
                          BackdropComponent: f.default,
                          BackdropProps: (0, o.default)({ transitionDuration: z }, a),
                          closeAfterTransition: !0,
                          disableBackdropClick: h,
                          disableEscapeKeyDown: v,
                          onEscapeKeyDown: M,
                          onClose: S,
                          open: A,
                          ref: t,
                        },
                        X
                      ),
                      l.createElement(
                        $,
                        (0, o.default)(
                          {
                            appear: !0,
                            in: A,
                            timeout: z,
                            onEnter: R,
                            onEntering: O,
                            onEntered: P,
                            onExit: N,
                            onExiting: I,
                            onExited: D,
                            role: 'none presentation',
                          },
                          H
                        ),
                        l.createElement(
                          'div',
                          {
                            className: (0, u.default)(
                              r.container,
                              r['scroll'.concat((0, d.default)(W))]
                            ),
                            onMouseUp: function (e) {
                              e.target === e.currentTarget &&
                                e.target === K.current &&
                                ((K.current = null), C && C(e), !h && S && S(e, 'backdropClick'));
                            },
                            onMouseDown: function (e) {
                              K.current = e.target;
                            },
                          },
                          l.createElement(
                            L,
                            (0, o.default)(
                              {
                                elevation: 24,
                                role: 'dialog',
                                'aria-describedby': G,
                                'aria-labelledby': Q,
                              },
                              F,
                              {
                                className: (0, u.default)(
                                  r.paper,
                                  r['paperScroll'.concat((0, d.default)(W))],
                                  r['paperWidth'.concat((0, d.default)(String(k)))],
                                  F.className,
                                  w && r.paperFullScreen,
                                  T && r.paperFullWidth
                                ),
                              }
                            ),
                            n
                          )
                        )
                      )
                    );
                  }),
                  _ = (0, c.default)(b, { name: 'MuiDialog' })(v);
                a.default = _;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Dialog/Dialog.js' },
    ],
    [
      910,
      { './Dialog': 909, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Dialog'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Dialog/index.js' },
    ],
    [
      911,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = {
                    root: {
                      display: 'flex',
                      alignItems: 'center',
                      padding: 8,
                      justifyContent: 'flex-end',
                      flex: '0 0 auto',
                    },
                    spacing: { '& > :not(:first-child)': { marginLeft: 8 } },
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.disableSpacing,
                      n = void 0 !== a && a,
                      r = e.classes,
                      u = e.className,
                      c = (0, s.default)(e, ['disableSpacing', 'classes', 'className']);
                    return i.createElement(
                      'div',
                      (0, o.default)(
                        { className: (0, l.default)(r.root, u, !n && r.spacing), ref: t },
                        c
                      )
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiDialogActions' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogActions/DialogActions.js',
      },
    ],
    [
      912,
      { './DialogActions': 911, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./DialogActions'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogActions/index.js',
      },
    ],
    [
      913,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = function (e) {
                    return {
                      root: {
                        flex: '1 1 auto',
                        WebkitOverflowScrolling: 'touch',
                        overflowY: 'auto',
                        padding: '8px 24px',
                        '&:first-child': { paddingTop: 20 },
                      },
                      dividers: {
                        padding: '16px 24px',
                        borderTop: '1px solid '.concat(e.palette.divider),
                        borderBottom: '1px solid '.concat(e.palette.divider),
                      },
                    };
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.dividers,
                      u = void 0 !== r && r,
                      c = (0, s.default)(e, ['classes', 'className', 'dividers']);
                    return i.createElement(
                      'div',
                      (0, o.default)(
                        { className: (0, l.default)(a.root, n, u && a.dividers), ref: t },
                        c
                      )
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiDialogContent' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogContent/DialogContent.js',
      },
    ],
    [
      914,
      { './DialogContent': 913, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./DialogContent'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogContent/index.js',
      },
    ],
    [
      915,
      {
        '../Typography': 1105,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = n(e('react')),
                  i = (r(e('prop-types')), r(e('../styles/withStyles'))),
                  l = r(e('../Typography')),
                  u = { root: { marginBottom: 12 } };
                a.styles = u;
                var c = s.forwardRef(function (e, t) {
                    return s.createElement(
                      l.default,
                      (0, o.default)(
                        { component: 'p', variant: 'body1', color: 'textSecondary', ref: t },
                        e
                      )
                    );
                  }),
                  d = (0, i.default)(u, { name: 'MuiDialogContentText' })(c);
                a.default = d;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogContentText/DialogContentText.js',
      },
    ],
    [
      916,
      { './DialogContentText': 915, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./DialogContentText'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogContentText/index.js',
      },
    ],
    [
      917,
      {
        '../Typography': 1105,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../Typography')),
                  d = { root: { margin: 0, padding: '16px 24px', flex: '0 0 auto' } };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.disableTypography,
                      d = void 0 !== u && u,
                      p = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'disableTypography',
                      ]);
                    return i.createElement(
                      'div',
                      (0, o.default)({ className: (0, l.default)(n.root, r), ref: t }, p),
                      d ? a : i.createElement(c.default, { component: 'h2', variant: 'h6' }, a)
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiDialogTitle' })(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/DialogTitle/DialogTitle.js',
      },
    ],
    [
      918,
      { './DialogTitle': 917, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./DialogTitle'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/DialogTitle/index.js' },
    ],
    [
      919,
      {
        '../styles/colorManipulator': 1159,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = e('../styles/colorManipulator'),
                  d = function (e) {
                    return {
                      root: {
                        height: 1,
                        margin: 0,
                        border: 'none',
                        flexShrink: 0,
                        backgroundColor: e.palette.divider,
                      },
                      absolute: { position: 'absolute', bottom: 0, left: 0, width: '100%' },
                      inset: { marginLeft: 72 },
                      light: { backgroundColor: (0, c.fade)(e.palette.divider, 0.08) },
                      middle: { marginLeft: e.spacing(2), marginRight: e.spacing(2) },
                      vertical: { height: '100%', width: 1 },
                      flexItem: { alignSelf: 'stretch', height: 'auto' },
                    };
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                    var a = e.absolute,
                      n = void 0 !== a && a,
                      r = e.classes,
                      u = e.className,
                      c = e.component,
                      d = void 0 === c ? 'hr' : c,
                      p = e.flexItem,
                      f = void 0 !== p && p,
                      m = e.light,
                      h = void 0 !== m && m,
                      g = e.orientation,
                      b = void 0 === g ? 'horizontal' : g,
                      y = e.role,
                      v = void 0 === y ? ('hr' !== d ? 'separator' : undefined) : y,
                      _ = e.variant,
                      w = void 0 === _ ? 'fullWidth' : _,
                      E = (0, s.default)(e, [
                        'absolute',
                        'classes',
                        'className',
                        'component',
                        'flexItem',
                        'light',
                        'orientation',
                        'role',
                        'variant',
                      ]);
                    return i.createElement(
                      d,
                      (0, o.default)(
                        {
                          className: (0, l.default)(
                            r.root,
                            u,
                            'fullWidth' !== w && r[w],
                            n && r.absolute,
                            f && r.flexItem,
                            h && r.light,
                            'vertical' === b && r.vertical
                          ),
                          role: v,
                          ref: t,
                        },
                        E
                      )
                    );
                  }),
                  f = (0, u.default)(d, { name: 'MuiDivider' })(p);
                a.default = f;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Divider/Divider.js' },
    ],
    [
      920,
      { './Divider': 919, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Divider'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Divider/index.js' },
    ],
    [
      921,
      {
        '../Backdrop': 863,
        '../Modal': 1008,
        '../Paper': 1018,
        '../Slide': 1038,
        '../styles/transitions': 1176,
        '../styles/useTheme': 1177,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.isHorizontal = v),
                  (a.getAnchor = _),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../Modal')),
                  c = r(e('../Backdrop')),
                  d = r(e('../styles/withStyles')),
                  p = r(e('../Slide')),
                  f = r(e('../Paper')),
                  m = r(e('../utils/capitalize')),
                  h = e('../styles/transitions'),
                  g = r(e('../styles/useTheme')),
                  b = function (e) {
                    return {
                      root: {},
                      docked: { flex: '0 0 auto' },
                      paper: {
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        flex: '1 0 auto',
                        zIndex: e.zIndex.drawer,
                        WebkitOverflowScrolling: 'touch',
                        position: 'fixed',
                        top: 0,
                        outline: 0,
                      },
                      paperAnchorLeft: { left: 0, right: 'auto' },
                      paperAnchorRight: { left: 'auto', right: 0 },
                      paperAnchorTop: {
                        top: 0,
                        left: 0,
                        bottom: 'auto',
                        right: 0,
                        height: 'auto',
                        maxHeight: '100%',
                      },
                      paperAnchorBottom: {
                        top: 'auto',
                        left: 0,
                        bottom: 0,
                        right: 0,
                        height: 'auto',
                        maxHeight: '100%',
                      },
                      paperAnchorDockedLeft: {
                        borderRight: '1px solid '.concat(e.palette.divider),
                      },
                      paperAnchorDockedTop: {
                        borderBottom: '1px solid '.concat(e.palette.divider),
                      },
                      paperAnchorDockedRight: {
                        borderLeft: '1px solid '.concat(e.palette.divider),
                      },
                      paperAnchorDockedBottom: {
                        borderTop: '1px solid '.concat(e.palette.divider),
                      },
                      modal: {},
                    };
                  };
                a.styles = b;
                var y = { left: 'right', right: 'left', top: 'down', bottom: 'up' };
                function v(e) {
                  return -1 !== ['left', 'right'].indexOf(e);
                }
                function _(e, t) {
                  return 'rtl' === e.direction && v(t) ? y[t] : t;
                }
                var w = { enter: h.duration.enteringScreen, exit: h.duration.leavingScreen },
                  E = i.forwardRef(function (e, t) {
                    var a = e.anchor,
                      n = void 0 === a ? 'left' : a,
                      r = e.BackdropProps,
                      d = e.children,
                      h = e.classes,
                      b = e.className,
                      v = e.elevation,
                      E = void 0 === v ? 16 : v,
                      T = e.ModalProps,
                      x = (T = void 0 === T ? {} : T).BackdropProps,
                      k = (0, s.default)(T, ['BackdropProps']),
                      C = e.onClose,
                      S = e.open,
                      R = void 0 !== S && S,
                      P = e.PaperProps,
                      O = void 0 === P ? {} : P,
                      M = e.SlideProps,
                      N = e.TransitionComponent,
                      D = void 0 === N ? p.default : N,
                      I = e.transitionDuration,
                      A = void 0 === I ? w : I,
                      j = e.variant,
                      L = void 0 === j ? 'temporary' : j,
                      B = (0, s.default)(e, [
                        'anchor',
                        'BackdropProps',
                        'children',
                        'classes',
                        'className',
                        'elevation',
                        'ModalProps',
                        'onClose',
                        'open',
                        'PaperProps',
                        'SlideProps',
                        'TransitionComponent',
                        'transitionDuration',
                        'variant',
                      ]),
                      F = (0, g.default)(),
                      q = i.useRef(!1);
                    i.useEffect(function () {
                      q.current = !0;
                    }, []);
                    var W = _(F, n),
                      U = i.createElement(
                        f.default,
                        (0, o.default)({ elevation: 'temporary' === L ? E : 0, square: !0 }, O, {
                          className: (0, l.default)(
                            h.paper,
                            h['paperAnchor'.concat((0, m.default)(W))],
                            O.className,
                            'temporary' !== L && h['paperAnchorDocked'.concat((0, m.default)(W))]
                          ),
                        }),
                        d
                      );
                    if ('permanent' === L)
                      return i.createElement(
                        'div',
                        (0, o.default)(
                          { className: (0, l.default)(h.root, h.docked, b), ref: t },
                          B
                        ),
                        U
                      );
                    var $ = i.createElement(
                      D,
                      (0, o.default)({ in: R, direction: y[W], timeout: A, appear: q.current }, M),
                      U
                    );
                    return 'persistent' === L
                      ? i.createElement(
                          'div',
                          (0, o.default)(
                            { className: (0, l.default)(h.root, h.docked, b), ref: t },
                            B
                          ),
                          $
                        )
                      : i.createElement(
                          u.default,
                          (0, o.default)(
                            {
                              BackdropProps: (0, o.default)({}, r, x, { transitionDuration: A }),
                              BackdropComponent: c.default,
                              className: (0, l.default)(h.root, h.modal, b),
                              open: R,
                              onClose: C,
                              ref: t,
                            },
                            B,
                            k
                          ),
                          $
                        );
                  }),
                  T = (0, d.default)(b, { name: 'MuiDrawer', flip: !1 })(E);
                a.default = T;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Drawer/Drawer.js' },
    ],
    [
      922,
      { './Drawer': 921, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Drawer'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Drawer/index.js' },
    ],
    [
      923,
      {
        '../Collapse': 904,
        '../Paper': 1018,
        '../styles/withStyles': 1178,
        '../utils/useControlled': 1201,
        './ExpansionPanelContext': 924,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@babel/runtime/helpers/slicedToArray': 415,
        '@babel/runtime/helpers/toArray': 416,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
        'react-is': 5181,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/toArray')),
                  i = r(e('@babel/runtime/helpers/slicedToArray')),
                  l = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  u = n(e('react')),
                  c = (e('react-is'), r(e('prop-types')), r(e('clsx'))),
                  d = (e('@material-ui/utils'), r(e('../Collapse'))),
                  p = r(e('../Paper')),
                  f = r(e('../styles/withStyles')),
                  m = r(e('./ExpansionPanelContext')),
                  h = r(e('../utils/useControlled')),
                  g = function (e) {
                    var t = { duration: e.transitions.duration.shortest };
                    return {
                      root: {
                        position: 'relative',
                        transition: e.transitions.create(['margin'], t),
                        '&:before': {
                          position: 'absolute',
                          left: 0,
                          top: -1,
                          right: 0,
                          height: 1,
                          content: '""',
                          opacity: 1,
                          backgroundColor: e.palette.divider,
                          transition: e.transitions.create(['opacity', 'background-color'], t),
                        },
                        '&:first-child': { '&:before': { display: 'none' } },
                        '&$expanded': {
                          margin: '16px 0',
                          '&:first-child': { marginTop: 0 },
                          '&:last-child': { marginBottom: 0 },
                          '&:before': { opacity: 0 },
                        },
                        '&$expanded + &': { '&:before': { display: 'none' } },
                        '&$disabled': { backgroundColor: e.palette.action.disabledBackground },
                      },
                      rounded: {
                        borderRadius: 0,
                        '&:first-child': {
                          borderTopLeftRadius: e.shape.borderRadius,
                          borderTopRightRadius: e.shape.borderRadius,
                        },
                        '&:last-child': {
                          borderBottomLeftRadius: e.shape.borderRadius,
                          borderBottomRightRadius: e.shape.borderRadius,
                          '@supports (-ms-ime-align: auto)': {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                        },
                      },
                      expanded: {},
                      disabled: {},
                    };
                  };
                a.styles = g;
                var b = u.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      f = e.defaultExpanded,
                      g = void 0 !== f && f,
                      b = e.disabled,
                      y = void 0 !== b && b,
                      v = e.expanded,
                      _ = e.onChange,
                      w = e.square,
                      E = void 0 !== w && w,
                      T = e.TransitionComponent,
                      x = void 0 === T ? d.default : T,
                      k = e.TransitionProps,
                      C = (0, l.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'defaultExpanded',
                        'disabled',
                        'expanded',
                        'onChange',
                        'square',
                        'TransitionComponent',
                        'TransitionProps',
                      ]),
                      S = (0, h.default)({
                        controlled: v,
                        default: g,
                        name: 'ExpansionPanel',
                        state: 'expanded',
                      }),
                      R = (0, i.default)(S, 2),
                      P = R[0],
                      O = R[1],
                      M = u.useCallback(
                        function (e) {
                          O(!P), _ && _(e, !P);
                        },
                        [P, _, O]
                      ),
                      N = u.Children.toArray(a),
                      D = (0, s.default)(N),
                      I = D[0],
                      A = D.slice(1),
                      j = u.useMemo(
                        function () {
                          return { expanded: P, disabled: y, toggle: M };
                        },
                        [P, y, M]
                      );
                    return u.createElement(
                      p.default,
                      (0, o.default)(
                        {
                          className: (0, c.default)(
                            n.root,
                            r,
                            P && n.expanded,
                            y && n.disabled,
                            !E && n.rounded
                          ),
                          ref: t,
                          square: E,
                        },
                        C
                      ),
                      u.createElement(m.default.Provider, { value: j }, I),
                      u.createElement(
                        x,
                        (0, o.default)({ in: P, timeout: 'auto' }, k),
                        u.createElement(
                          'div',
                          {
                            'aria-labelledby': I.props.id,
                            id: I.props['aria-controls'],
                            role: 'region',
                          },
                          A
                        )
                      )
                    );
                  }),
                  y = (0, f.default)(g, { name: 'MuiExpansionPanel' })(b);
                a.default = y;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanel/ExpansionPanel.js',
      },
    ],
    [
      924,
      { '@babel/runtime/helpers/interopRequireWildcard': 404, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard');
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var r = n(e('react')).createContext({});
                var o = r;
                a.default = o;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanel/ExpansionPanelContext.js',
      },
    ],
    [
      925,
      { './ExpansionPanel': 923, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ExpansionPanel'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanel/index.js',
      },
    ],
    [
      926,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = {
                    root: {
                      display: 'flex',
                      alignItems: 'center',
                      padding: 8,
                      justifyContent: 'flex-end',
                    },
                    spacing: { '& > :not(:first-child)': { marginLeft: 8 } },
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = e.disableSpacing,
                      u = void 0 !== r && r,
                      c = (0, s.default)(e, ['classes', 'className', 'disableSpacing']);
                    return i.createElement(
                      'div',
                      (0, o.default)(
                        { className: (0, l.default)(a.root, n, !u && a.spacing), ref: t },
                        c
                      )
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiExpansionPanelActions' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanelActions/ExpansionPanelActions.js',
      },
    ],
    [
      927,
      { './ExpansionPanelActions': 926, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ExpansionPanelActions'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanelActions/index.js',
      },
    ],
    [
      928,
      {
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = function (e) {
                    return { root: { display: 'flex', padding: e.spacing(1, 2, 2) } };
                  };
                a.styles = c;
                var d = i.forwardRef(function (e, t) {
                    var a = e.classes,
                      n = e.className,
                      r = (0, s.default)(e, ['classes', 'className']);
                    return i.createElement(
                      'div',
                      (0, o.default)({ className: (0, l.default)(a.root, n), ref: t }, r)
                    );
                  }),
                  p = (0, u.default)(c, { name: 'MuiExpansionPanelDetails' })(d);
                a.default = p;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails.js',
      },
    ],
    [
      929,
      { './ExpansionPanelDetails': 928, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ExpansionPanelDetails'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanelDetails/index.js',
      },
    ],
    [
      930,
      {
        '../ButtonBase': 880,
        '../ExpansionPanel/ExpansionPanelContext': 924,
        '../IconButton': 968,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../ButtonBase')),
                  c = r(e('../IconButton')),
                  d = r(e('../styles/withStyles')),
                  p = r(e('../ExpansionPanel/ExpansionPanelContext')),
                  f = function (e) {
                    var t = { duration: e.transitions.duration.shortest };
                    return {
                      root: {
                        display: 'flex',
                        minHeight: 48,
                        transition: e.transitions.create(['min-height', 'background-color'], t),
                        padding: e.spacing(0, 2),
                        '&:hover:not($disabled)': { cursor: 'pointer' },
                        '&$expanded': { minHeight: 64 },
                        '&$focused': { backgroundColor: e.palette.action.focus },
                        '&$disabled': { opacity: e.palette.action.disabledOpacity },
                      },
                      expanded: {},
                      focused: {},
                      disabled: {},
                      content: {
                        display: 'flex',
                        flexGrow: 1,
                        transition: e.transitions.create(['margin'], t),
                        margin: '12px 0',
                        '&$expanded': { margin: '20px 0' },
                      },
                      expandIcon: {
                        transform: 'rotate(0deg)',
                        transition: e.transitions.create('transform', t),
                        '&:hover': { backgroundColor: 'transparent' },
                        '&$expanded': { transform: 'rotate(180deg)' },
                      },
                    };
                  };
                a.styles = f;
                var m = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      d = e.expandIcon,
                      f = e.IconButtonProps,
                      m = e.onBlur,
                      h = e.onClick,
                      g = e.onFocusVisible,
                      b = (0, s.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'expandIcon',
                        'IconButtonProps',
                        'onBlur',
                        'onClick',
                        'onFocusVisible',
                      ]),
                      y = i.useState(!1),
                      v = y[0],
                      _ = y[1],
                      w = i.useContext(p.default),
                      E = w.disabled,
                      T = void 0 !== E && E,
                      x = w.expanded,
                      k = w.toggle;
                    return i.createElement(
                      u.default,
                      (0, o.default)(
                        {
                          focusRipple: !1,
                          disableRipple: !0,
                          disabled: T,
                          component: 'div',
                          'aria-expanded': x,
                          className: (0, l.default)(
                            n.root,
                            r,
                            T && n.disabled,
                            x && n.expanded,
                            v && n.focused
                          ),
                          onFocusVisible: function (e) {
                            _(!0), g && g(e);
                          },
                          onBlur: function (e) {
                            _(!1), m && m(e);
                          },
                          onClick: function (e) {
                            k && k(e), h && h(e);
                          },
                          ref: t,
                        },
                        b
                      ),
                      i.createElement(
                        'div',
                        { className: (0, l.default)(n.content, x && n.expanded) },
                        a
                      ),
                      d &&
                        i.createElement(
                          c.default,
                          (0, o.default)(
                            {
                              className: (0, l.default)(n.expandIcon, x && n.expanded),
                              edge: 'end',
                              component: 'div',
                              tabIndex: null,
                              role: null,
                              'aria-hidden': !0,
                            },
                            f
                          ),
                          d
                        )
                    );
                  }),
                  h = (0, d.default)(f, { name: 'MuiExpansionPanelSummary' })(m);
                a.default = h;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary.js',
      },
    ],
    [
      931,
      { './ExpansionPanelSummary': 930, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./ExpansionPanelSummary'));
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/ExpansionPanelSummary/index.js',
      },
    ],
    [
      932,
      {
        '../ButtonBase': 880,
        '../styles/withStyles': 1178,
        '../utils/capitalize': 1186,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  s = r(e('@babel/runtime/helpers/extends')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = r(e('../styles/withStyles')),
                  c = r(e('../ButtonBase')),
                  d = r(e('../utils/capitalize')),
                  p = function (e) {
                    return {
                      root: (0, s.default)({}, e.typography.button, {
                        boxSizing: 'border-box',
                        minHeight: 36,
                        transition: e.transitions.create(
                          ['background-color', 'box-shadow', 'border'],
                          { duration: e.transitions.duration.short }
                        ),
                        borderRadius: '50%',
                        padding: 0,
                        minWidth: 0,
                        width: 56,
                        height: 56,
                        boxShadow: e.shadows[6],
                        '&:active': { boxShadow: e.shadows[12] },
                        color: e.palette.getContrastText(e.palette.grey[300]),
                        backgroundColor: e.palette.grey[300],
                        '&:hover': {
                          backgroundColor: e.palette.grey.A100,
                          '@media (hover: none)': { backgroundColor: e.palette.grey[300] },
                          '&$disabled': { backgroundColor: e.palette.action.disabledBackground },
                          textDecoration: 'none',
                        },
                        '&$focusVisible': { boxShadow: e.shadows[6] },
                        '&$disabled': {
                          color: e.palette.action.disabled,
                          boxShadow: e.shadows[0],
                          backgroundColor: e.palette.action.disabledBackground,
                        },
                      }),
                      label: {
                        width: '100%',
                        display: 'inherit',
                        alignItems: 'inherit',
                        justifyContent: 'inherit',
                      },
                      primary: {
                        color: e.palette.primary.contrastText,
                        backgroundColor: e.palette.primary.main,
                        '&:hover': {
                          backgroundColor: e.palette.primary.dark,
                          '@media (hover: none)': { backgroundColor: e.palette.primary.main },
                        },
                      },
                      secondary: {
                        color: e.palette.secondary.contrastText,
                        backgroundColor: e.palette.secondary.main,
                        '&:hover': {
                          backgroundColor: e.palette.secondary.dark,
                          '@media (hover: none)': { backgroundColor: e.palette.secondary.main },
                        },
                      },
                      extended: {
                        borderRadius: 24,
                        padding: '0 16px',
                        width: 'auto',
                        minHeight: 'auto',
                        minWidth: 48,
                        height: 48,
                        '&$sizeSmall': {
                          width: 'auto',
                          padding: '0 8px',
                          borderRadius: 17,
                          minWidth: 34,
                          height: 34,
                        },
                        '&$sizeMedium': {
                          width: 'auto',
                          padding: '0 16px',
                          borderRadius: 20,
                          minWidth: 40,
                          height: 40,
                        },
                      },
                      focusVisible: {},
                      disabled: {},
                      colorInherit: { color: 'inherit' },
                      sizeSmall: { width: 40, height: 40 },
                      sizeMedium: { width: 48, height: 48 },
                    };
                  };
                a.styles = p;
                var f = i.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.classes,
                      r = e.className,
                      u = e.color,
                      p = void 0 === u ? 'default' : u,
                      f = e.component,
                      m = void 0 === f ? 'button' : f,
                      h = e.disabled,
                      g = void 0 !== h && h,
                      b = e.disableFocusRipple,
                      y = void 0 !== b && b,
                      v = e.focusVisibleClassName,
                      _ = e.size,
                      w = void 0 === _ ? 'large' : _,
                      E = e.variant,
                      T = void 0 === E ? 'round' : E,
                      x = (0, o.default)(e, [
                        'children',
                        'classes',
                        'className',
                        'color',
                        'component',
                        'disabled',
                        'disableFocusRipple',
                        'focusVisibleClassName',
                        'size',
                        'variant',
                      ]);
                    return i.createElement(
                      c.default,
                      (0, s.default)(
                        {
                          className: (0, l.default)(
                            n.root,
                            r,
                            'round' !== T && n.extended,
                            'large' !== w && n['size'.concat((0, d.default)(w))],
                            g && n.disabled,
                            { primary: n.primary, secondary: n.secondary, inherit: n.colorInherit }[
                              p
                            ]
                          ),
                          component: m,
                          disabled: g,
                          focusRipple: !y,
                          focusVisibleClassName: (0, l.default)(n.focusVisible, v),
                          ref: t,
                        },
                        x
                      ),
                      i.createElement('span', { className: n.label }, a)
                    );
                  }),
                  m = (0, u.default)(p, { name: 'MuiFab' })(f);
                a.default = m;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Fab/Fab.js' },
    ],
    [
      933,
      { './Fab': 932, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Fab'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Fab/index.js' },
    ],
    [
      934,
      {
        '../styles/transitions': 1176,
        '../styles/useTheme': 1177,
        '../transitions/utils': 1181,
        '../utils/useForkRef': 1203,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@babel/runtime/helpers/slicedToArray': 415,
        'prop-types': 5082,
        react: 5328,
        'react-transition-group': 1156,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/slicedToArray')),
                  i = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  l = n(e('react')),
                  u = (r(e('prop-types')), e('react-transition-group')),
                  c = e('../styles/transitions'),
                  d = r(e('../styles/useTheme')),
                  p = e('../transitions/utils'),
                  f = r(e('../utils/useForkRef')),
                  m = { entering: { opacity: 1 }, entered: { opacity: 1 } },
                  h = { enter: c.duration.enteringScreen, exit: c.duration.leavingScreen },
                  g = l.forwardRef(function (e, t) {
                    var a = e.children,
                      n = e.disableStrictModeCompat,
                      r = void 0 !== n && n,
                      c = e.in,
                      g = e.onEnter,
                      b = e.onEntered,
                      y = e.onEntering,
                      v = e.onExit,
                      _ = e.onExited,
                      w = e.onExiting,
                      E = e.style,
                      T = e.TransitionComponent,
                      x = void 0 === T ? u.Transition : T,
                      k = e.timeout,
                      C = void 0 === k ? h : k,
                      S = (0, i.default)(e, [
                        'children',
                        'disableStrictModeCompat',
                        'in',
                        'onEnter',
                        'onEntered',
                        'onEntering',
                        'onExit',
                        'onExited',
                        'onExiting',
                        'style',
                        'TransitionComponent',
                        'timeout',
                      ]),
                      R = (0, d.default)(),
                      P = R.unstable_strictMode && !r,
                      O = l.useRef(null),
                      M = (0, f.default)(a.ref, t),
                      N = (0, f.default)(P ? O : undefined, M),
                      D = function (e) {
                        return function (t, a) {
                          if (e) {
                            var n = P ? [O.current, t] : [t, a],
                              r = (0, s.default)(n, 2),
                              o = r[0],
                              i = r[1];
                            i === undefined ? e(o) : e(o, i);
                          }
                        };
                      },
                      I = D(y),
                      A = D(function (e, t) {
                        (0, p.reflow)(e);
                        var a = (0, p.getTransitionProps)(
                          { style: E, timeout: C },
                          { mode: 'enter' }
                        );
                        (e.style.webkitTransition = R.transitions.create('opacity', a)),
                          (e.style.transition = R.transitions.create('opacity', a)),
                          g && g(e, t);
                      }),
                      j = D(b),
                      L = D(w),
                      B = D(function (e) {
                        var t = (0, p.getTransitionProps)(
                          { style: E, timeout: C },
                          { mode: 'exit' }
                        );
                        (e.style.webkitTransition = R.transitions.create('opacity', t)),
                          (e.style.transition = R.transitions.create('opacity', t)),
                          v && v(e);
                      }),
                      F = D(_);
                    return l.createElement(
                      x,
                      (0, o.default)(
                        {
                          appear: !0,
                          in: c,
                          nodeRef: P ? O : undefined,
                          onEnter: A,
                          onEntered: j,
                          onEntering: I,
                          onExit: B,
                          onExited: F,
                          onExiting: L,
                          timeout: C,
                        },
                        S
                      ),
                      function (e, t) {
                        return l.cloneElement(
                          a,
                          (0, o.default)(
                            {
                              style: (0, o.default)(
                                {
                                  opacity: 0,
                                  visibility: 'exited' !== e || c ? undefined : 'hidden',
                                },
                                m[e],
                                E,
                                a.props.style
                              ),
                              ref: N,
                            },
                            t
                          )
                        );
                      }
                    );
                  }),
                  b = g;
                a.default = b;
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Fade/Fade.js' },
    ],
    [
      935,
      { './Fade': 934, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./Fade'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/Fade/index.js' },
    ],
    [
      936,
      {
        '../InputBase': 974,
        '../styles/withStyles': 1178,
        '@babel/runtime/helpers/extends': 399,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/helpers/interopRequireWildcard': 404,
        '@babel/runtime/helpers/objectWithoutProperties': 410,
        '@material-ui/utils': 1269,
        clsx: 4170,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireWildcard'),
                  r = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  (a.default = a.styles = void 0);
                var o = r(e('@babel/runtime/helpers/extends')),
                  s = r(e('@babel/runtime/helpers/objectWithoutProperties')),
                  i = n(e('react')),
                  l = (r(e('prop-types')), r(e('clsx'))),
                  u = (e('@material-ui/utils'), r(e('../InputBase'))),
                  c = r(e('../styles/withStyles')),
                  d = function (e) {
                    var t = 'light' === e.palette.type,
                      a = t ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)',
                      n = t ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.09)';
                    return {
                      root: {
                        position: 'relative',
                        backgroundColor: n,
                        borderTopLeftRadius: e.shape.borderRadius,
                        borderTopRightRadius: e.shape.borderRadius,
                        transition: e.transitions.create('background-color', {
                          duration: e.transitions.duration.shorter,
                          easing: e.transitions.easing.easeOut,
                        }),
                        '&:hover': {
                          backgroundColor: t ? 'rgba(0, 0, 0, 0.13)' : 'rgba(255, 255, 255, 0.13)',
                          '@media (hover: none)': { backgroundColor: n },
                        },
                        '&$focused': {
                          backgroundColor: t ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.09)',
                        },
                        '&$disabled': {
                          backgroundColor: t ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
                        },
                      },
                      colorSecondary: {
                        '&$underline:after': { borderBottomColor: e.palette.secondary.main },
                      },
                      underline: {
                        '&:after': {
                          borderBottom: '2px solid '.concat(e.palette.primary.main),
                          left: 0,
                          bottom: 0,
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          transform: 'scaleX(0)',
                          transition: e.transitions.create('transform', {
                            duration: e.transitions.duration.shorter,
                            easing: e.transitions.easing.easeOut,
                          }),
                          pointerEvents: 'none',
                        },
                        '&$focused:after': { transform: 'scaleX(1)' },
                        '&$error:after': {
                          borderBottomColor: e.palette.error.main,
                          transform: 'scaleX(1)',
                        },
                        '&:before': {
                          borderBottom: '1px solid '.concat(a),
                          left: 0,
                          bottom: 0,
                          content: '"\\00a0"',
                          position: 'absolute',
                          right: 0,
                          transition: e.transitions.create('border-bottom-color', {
                            duration: e.transitions.duration.shorter,
                          }),
                          pointerEvents: 'none',
                        },
                        '&:hover:before': {
                          borderBottom: '1px solid '.concat(e.palette.text.primary),
                        },
                        '&$disabled:before': { borderBottomStyle: 'dotted' },
                      },
                      focused: {},
                      disabled: {},
                      adornedStart: { paddingLeft: 12 },
                      adornedEnd: { paddingRight: 12 },
                      error: {},
                      marginDense: {},
                      multiline: {
                        padding: '27px 12px 10px',
                        '&$marginDense': { paddingTop: 23, paddingBottom: 6 },
                      },
                      input: {
                        padding: '27px 12px 10px',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow:
                            'light' === e.palette.type ? null : '0 0 0 100px #266798 inset',
                          WebkitTextFillColor: 'light' === e.palette.type ? null : '#fff',
                          caretColor: 'light' === e.palette.type ? null : '#fff',
                          borderTopLeftRadius: 'inherit',
                          borderTopRightRadius: 'inherit',
                        },
                      },
                      inputMarginDense: { paddingTop: 23, paddingBottom: 6 },
                      inputHiddenLabel: {
                        paddingTop: 18,
                        paddingBottom: 19,
                        '&$inputMarginDense': { paddingTop: 10, paddingBottom: 11 },
                      },
                      inputMultiline: { padding: 0 },
                      inputAdornedStart: { paddingLeft: 0 },
                      inputAdornedEnd: { paddingRight: 0 },
                    };
                  };
                a.styles = d;
                var p = i.forwardRef(function (e, t) {
                  var a = e.disableUnderline,
                    n = e.classes,
                    r = e.fullWidth,
                    c = void 0 !== r && r,
                    d = e.inputComponent,
                    p = void 0 === d ? 'input' : d,
                    f = e.multiline,
                    m = void 0 !== f && f,
                    h = e.type,
                    g = void 0 === h ? 'text' : h,
                    b = (0, s.default)(e, [
                      'disableUnderline',
                      'classes',
                      'fullWidth',
                      'inputComponent',
                      'multiline',
                      'type',
                    ]);
                  return i.createElement(
                    u.default,
                    (0, o.default)(
                      {
                        classes: (0, o.default)({}, n, {
                          root: (0, l.default)(n.root, !a && n.underline),
                          underline: null,
                        }),
                        fullWidth: c,
                        inputComponent: p,
                        multiline: m,
                        ref: t,
                        type: g,
                      },
                      b
                    )
                  );
                });
                p.muiName = 'Input';
                var f = (0, c.default)(d, { name: 'MuiFilledInput' })(p);
                a.default = f;
              };
            };
      },
      {
        package: '@material-ui/core',
        file: 'node_modules/@material-ui/core/FilledInput/FilledInput.js',
      },
    ],
    [
      937,
      { './FilledInput': 936, '@babel/runtime/helpers/interopRequireDefault': 403 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, a) {
                var n = e('@babel/runtime/helpers/interopRequireDefault');
                Object.defineProperty(a, '__esModule', { value: !0 }),
                  Object.defineProperty(a, 'default', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var r = n(e('./FilledInput'));
              };
            };
      },
      { package: '@material-ui/core', file: 'node_modules/@material-ui/core/FilledInput/index.js' },
    ],
  ],
  [],
  {}
);
