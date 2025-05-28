LavaPack.loadBundle(
  [
    [
      7409,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
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
                  s = e('@metamask/notification-services-controller'),
                  r = e('../node-guard'),
                  i = e('../types/notifications/notifications'),
                  l = e('../../../../components/multichain'),
                  c = e('../../../../../app/scripts/translate'),
                  u = e('../../../../helpers/utils/notification.util'),
                  d = e('../../../../helpers/constants/design-system'),
                  p = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  m = e('../../../../components/component-library'),
                  f = e('../../../../../shared/modules/conversion.utils');
                const { TRIGGER_TYPES: g } = s.NotificationServicesController.Constants,
                  h = (0, r.isOfTypeNodeGuard)([g.LIDO_STAKE_READY_TO_BE_WITHDRAWN]),
                  y = e => {
                    const t = (0, u.formatAmount)(parseFloat(e.data.staked_eth.amount), {
                        shouldEllipse: !0,
                      }),
                      n =
                        (0, c.t)('notificationItemLidoStakeReadyToBeWithdrawnMessage', [
                          `${t} ${e.data.staked_eth.symbol}`,
                        ]) || '';
                    return (0, u.createTextItems)([n], d.TextVariant.bodyMd);
                  };
                n.components = {
                  guardFn: h,
                  item: ({ notification: e, onClick: t }) =>
                    o.default.createElement(l.NotificationListItem, {
                      id: e.trigger_id,
                      isRead: e.isRead,
                      icon: {
                        type: p.NotificationListItemIconType.Token,
                        value: e.data.staked_eth.image,
                        badge: {
                          icon: m.IconName.Stake,
                          position: m.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title: (0, u.createTextItems)(
                        [(0, c.t)('notificationItemLidoStakeReadyToBeWithdrawn') || ''],
                        d.TextVariant.bodySm
                      ),
                      description: y(e),
                      createdAt: new Date(e.createdAt),
                      onClick: t,
                    }),
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(l.NotificationDetailTitle, {
                        title: (0, c.t)('notificationItemLidoStakeReadyToBeWithdrawn') || '',
                        date: (0, u.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: i.NotificationComponentType.OnChainBody,
                      Account: ({ notification: e }) =>
                        e.address
                          ? o.default.createElement(l.NotificationDetailAddress, {
                              side: (0, c.t)('account') || '',
                              address: e.address,
                            })
                          : null,
                      Status: () =>
                        o.default.createElement(l.NotificationDetailInfo, {
                          icon: {
                            iconName: m.IconName.Check,
                            color: d.TextColor.successDefault,
                            backgroundColor: d.BackgroundColor.successMuted,
                          },
                          label: (0, c.t)('notificationItemStatus') || '',
                          detail: (0, c.t)('notificationItemConfirmed') || '',
                        }),
                      Asset: ({ notification: e }) => {
                        const t = (0, f.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, u.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(l.NotificationDetailAsset, {
                          icon: {
                            src: e.data.staked_eth.image,
                            badge: { src: n, position: m.BadgeWrapperPosition.topRight },
                          },
                          label: (0, c.t)('notificationItemLidoStakeReadyToBeWithdrawn') || '',
                          detail: e.data.staked_eth.symbol,
                          fiatValue: `$${(0, u.formatAmount)(parseFloat(e.data.staked_eth.usd), { shouldEllipse: !0 })}`,
                          value: `${(0, u.formatAmount)(parseFloat(e.data.staked_eth.amount), { shouldEllipse: !0 })} ${e.data.staked_eth.symbol}`,
                        });
                      },
                      AssetReceived: ({ notification: e }) => {
                        const t = (0, f.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, u.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(l.NotificationDetailAsset, {
                          icon: {
                            src: e.data.staked_eth.image,
                            badge: { src: n, position: m.BadgeWrapperPosition.topRight },
                          },
                          label: (0, c.t)('notificationItemStakingProvider') || '',
                          detail: e.data.staked_eth.symbol,
                        });
                      },
                    },
                  },
                  footer: {
                    type: i.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(l.NotificationDetailBlockExplorerButton, {
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
        file: 'ui/pages/notifications/notification-components/lido-stake-ready-to-be-withdrawn/lido-stake-ready-to-be-withdrawn.tsx',
      },
    ],
    [
      7410,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
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
                  s = e('@metamask/notification-services-controller'),
                  r = e('../node-guard'),
                  i = e('../types/notifications/notifications'),
                  l = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  c = e('../../../../components/multichain'),
                  u = e('../../../../helpers/utils/notification.util'),
                  d = e('../../../../../app/scripts/translate'),
                  p = e('../../../../helpers/constants/design-system'),
                  m = e('../../../../components/component-library'),
                  f = e('../../../../../shared/modules/conversion.utils');
                const { TRIGGER_TYPES: g } = s.NotificationServicesController.Constants,
                  h = (0, r.isOfTypeNodeGuard)([g.LIDO_WITHDRAWAL_REQUESTED]),
                  y = e => {
                    const t = (0, u.getAmount)(e.data.stake_in.amount, e.data.stake_in.decimals, {
                        shouldEllipse: !0,
                      }),
                      n =
                        (0, d.t)('notificationItemLidoWithdrawalRequestedMessage', [
                          `${t} ${e.data.stake_in.symbol}`,
                        ]) || '';
                    return (0, u.createTextItems)([n], p.TextVariant.bodyMd);
                  };
                n.components = {
                  guardFn: h,
                  item: ({ notification: e, onClick: t }) =>
                    o.default.createElement(c.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: l.NotificationListItemIconType.Token,
                        value: e.data.stake_in.image,
                        badge: {
                          icon: m.IconName.Stake,
                          position: m.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title: (0, u.createTextItems)(
                        [(0, d.t)('notificationItemUnStakingRequested') || ''],
                        p.TextVariant.bodySm
                      ),
                      description: y(e),
                      createdAt: new Date(e.createdAt),
                      amount: `${(0, u.getAmount)(e.data.stake_in.amount, e.data.stake_in.decimals, { shouldEllipse: !0 })} ${e.data.stake_in.symbol}`,
                      onClick: t,
                    }),
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(c.NotificationDetailTitle, {
                        title: (0, d.t)('notificationItemUnStakingRequested') || '',
                        date: (0, u.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: i.NotificationComponentType.OnChainBody,
                      Account: ({ notification: e }) =>
                        e.address
                          ? o.default.createElement(c.NotificationDetailAddress, {
                              side: (0, d.t)('account') || '',
                              address: e.address,
                            })
                          : null,
                      Status: ({ notification: e }) =>
                        o.default.createElement(c.NotificationDetailInfo, {
                          icon: {
                            iconName: m.IconName.Check,
                            color: p.TextColor.successDefault,
                            backgroundColor: p.BackgroundColor.successMuted,
                          },
                          label: (0, d.t)('notificationItemStatus') || '',
                          detail: (0, d.t)('notificationItemConfirmed') || '',
                          action: o.default.createElement(c.NotificationDetailCopyButton, {
                            notification: e,
                            text: e.tx_hash,
                            displayText: (0, d.t)('notificationItemTransactionId') || '',
                          }),
                        }),
                      Asset: ({ notification: e }) => {
                        const t = (0, f.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, u.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.stake_in.image,
                            badge: { src: n, position: m.BadgeWrapperPosition.topRight },
                          },
                          label: (0, d.t)('notificationItemUnStakingRequested') || '',
                          detail: e.data.stake_in.symbol,
                          fiatValue: `$${(0, u.getUsdAmount)(e.data.stake_in.amount, e.data.stake_in.decimals, e.data.stake_in.usd)}`,
                          value: `${(0, u.getAmount)(e.data.stake_in.amount, e.data.stake_in.decimals, { shouldEllipse: !0 })} ${e.data.stake_in.symbol}`,
                        });
                      },
                      AssetReceived: ({ notification: e }) => {
                        const t = (0, f.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, u.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.stake_in.image,
                            badge: { src: n, position: m.BadgeWrapperPosition.topRight },
                          },
                          label: (0, d.t)('notificationItemStakingProvider') || '',
                          detail: 'Lido-staked ETH',
                        });
                      },
                    },
                  },
                  footer: {
                    type: i.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(c.NotificationDetailBlockExplorerButton, {
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
        file: 'ui/pages/notifications/notification-components/lido-withdrawal-requested/lido-withdrawal-requested.tsx',
      },
    ],
    [
      7411,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.isOfTypeNodeGuard = void 0);
                n.isOfTypeNodeGuard = e => t => e.includes(t.type);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notification-components/node-guard.ts' },
    ],
    [
      7412,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../components/app/snaps/snap-link-warning': 6174,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../contexts/metametrics': 6836,
        '../../../../hooks/snaps/useSnapNavigation': 6962,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.SnapFooterButton = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = d(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = u(e('../../../../hooks/snaps/useSnapNavigation')),
                  s = u(e('../../../../components/app/snaps/snap-link-warning')),
                  r = e('../../../../components/multichain'),
                  i = e('../../../../components/component-library'),
                  l = e('../../../../contexts/metametrics'),
                  c = e('../../../../../shared/constants/metametrics');
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
                n.SnapFooterButton = e => {
                  var t;
                  const n = (0, a.useContext)(l.MetaMetricsContext),
                    { navigate: u } = (0, o.default)(),
                    [d, p] = (0, a.useState)(!1),
                    m = e.notification.data,
                    f =
                      null == m || null === (t = m.detailedView) || void 0 === t
                        ? void 0
                        : t.footerLink,
                    g = (0, a.useCallback)(() => {
                      p(!1);
                    }, []),
                    h = (0, a.useCallback)(
                      (t, a) => {
                        n({
                          category: c.MetaMetricsEventCategory.NotificationInteraction,
                          event: c.MetaMetricsEventName.NotificationDetailClicked,
                          properties: {
                            notification_id: e.notification.id,
                            notification_type: e.notification.type,
                            clicked_item: a ? 'external_link' : 'internal_link',
                          },
                        }),
                          a ? p(!0) : u(t);
                      },
                      [u, e.notification.id, e.notification.type, n]
                    );
                  if (!f) return null;
                  const { href: y, text: E } = f,
                    v = !y.startsWith('metamask:');
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(s.default, { isOpen: d, onClose: g, url: y }),
                    a.default.createElement(r.NotificationDetailButton, {
                      variant: i.ButtonVariant.Secondary,
                      isExternal: v,
                      text: E,
                      onClick: () => h(y, v),
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/snap/snap-footer-button.tsx',
      },
    ],
    [
      7413,
      {
        '../../../../components/app/snaps/snap-icon': 6170,
        '../../../../components/app/snaps/snap-ui-markdown': 6225,
        '../../../../components/app/snaps/snap-ui-renderer': 6263,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/metamask-notifications/useNotifications': 6954,
        '../../../../selectors': 7601,
        '../node-guard': 7411,
        '../types/notifications/notifications': 7416,
        './snap-footer-button': 7412,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.components = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('@metamask/notification-services-controller/notification-services'),
                  l = e('../../../../components/multichain'),
                  c = e('../../../../selectors'),
                  u = e('../../../../helpers/utils/util'),
                  d = e('../types/notifications/notifications'),
                  p = e('../../../../helpers/utils/notification.util'),
                  m = e('../../../../components/app/snaps/snap-ui-renderer'),
                  f = e('../../../../helpers/constants/design-system'),
                  g = e('../../../../components/component-library'),
                  h = e('../node-guard'),
                  y = e('../../../../components/app/snaps/snap-icon'),
                  E = e('../../../../hooks/metamask-notifications/useNotifications'),
                  v = e('../../../../components/app/snaps/snap-ui-markdown'),
                  b = e('./snap-footer-button');
                n.components = {
                  guardFn: (0, h.isOfTypeNodeGuard)([i.TRIGGER_TYPES.SNAP]),
                  item: ({ notification: e, onClick: t }) => {
                    const n = (0, r.useHistory)(),
                      a = (0, s.useSelector)(c.getSnapsMetadata),
                      i = (0, u.getSnapName)(a),
                      { markNotificationAsRead: d } = (0, E.useMarkNotificationAsRead)();
                    return o.default.createElement(l.NotificationListItemSnap, {
                      id: e.id,
                      snapId: e.data.origin,
                      isRead: e.isRead,
                      createdAt: new Date(e.createdAt),
                      title: { items: [{ text: i(e.data.origin) }] },
                      snapMessage: e.data.message,
                      handleSnapClick: t,
                      handleSnapButton: () => {
                        e.isRead || d([{ id: e.id, type: e.type, isRead: e.isRead }]),
                          n.push((0, u.getSnapRoute)(e.data.origin));
                      },
                    });
                  },
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(l.NotificationDetailTitle, {
                        title: e.data.detailedView.title,
                        date: (0, p.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: d.NotificationComponentType.SnapBody,
                      Content: ({ notification: e }) => {
                        const t = (0, s.useSelector)(c.getSnapsMetadata),
                          n = (0, u.getSnapName)(t),
                          a = e.data.origin;
                        return o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(
                            g.Box,
                            {
                              display: f.Display.Flex,
                              style: { borderBottom: '1px solid var(--color-border-muted)' },
                              flexDirection: f.FlexDirection.Column,
                              padding: [4, 2, 4, 4],
                            },
                            o.default.createElement(
                              g.Box,
                              {
                                display: f.Display.Flex,
                                alignItems: f.AlignItems.center,
                                paddingBottom: 2,
                              },
                              o.default.createElement(y.SnapIcon, {
                                snapId: a,
                                avatarSize: g.IconSize.Xl,
                              }),
                              o.default.createElement(
                                g.Text,
                                { paddingLeft: 4, fontWeight: f.FontWeight.Medium },
                                n(a)
                              )
                            ),
                            o.default.createElement(
                              v.SnapUIMarkdown,
                              { markdown: !0 },
                              e.data.message
                            )
                          ),
                          o.default.createElement(
                            g.Box,
                            { paddingLeft: 1, paddingRight: 1 },
                            o.default.createElement(m.SnapUIRenderer, {
                              snapId: e.data.origin,
                              interfaceId: e.data.detailedView.interfaceId,
                              contentBackgroundColor: f.BackgroundColor.backgroundDefault,
                            })
                          )
                        );
                      },
                    },
                  },
                  footer: {
                    type: d.NotificationComponentType.SnapFooter,
                    Link: b.SnapFooterButton,
                  },
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notification-components/snap/snap.tsx' },
    ],
    [
      7414,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
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
                  s = e('@metamask/notification-services-controller'),
                  r = e('../../../../../app/scripts/translate'),
                  i = e('../node-guard'),
                  l = e('../types/notifications/notifications'),
                  c = e('../../../../components/multichain'),
                  u = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  d = e('../../../../components/component-library'),
                  p = e('../../../../helpers/utils/notification.util'),
                  m = e('../../../../../shared/modules/conversion.utils'),
                  f = e('../../../../helpers/constants/design-system');
                const { TRIGGER_TYPES: g } = s.NotificationServicesController.Constants,
                  h = (0, i.isOfTypeNodeGuard)([
                    g.ROCKETPOOL_STAKE_COMPLETED,
                    g.ROCKETPOOL_UNSTAKE_COMPLETED,
                    g.LIDO_STAKE_COMPLETED,
                    g.LIDO_WITHDRAWAL_COMPLETED,
                  ]),
                  y = {
                    [g.LIDO_STAKE_COMPLETED]: (0, r.t)('notificationItemStaked'),
                    [g.LIDO_WITHDRAWAL_COMPLETED]: (0, r.t)('notificationItemUnStakeCompleted'),
                    [g.ROCKETPOOL_STAKE_COMPLETED]: (0, r.t)('notificationItemStakeCompleted'),
                    [g.ROCKETPOOL_UNSTAKE_COMPLETED]: (0, r.t)('notificationItemUnStakeCompleted'),
                  },
                  E = {
                    [g.ROCKETPOOL_STAKE_COMPLETED]: 'staked',
                    [g.ROCKETPOOL_UNSTAKE_COMPLETED]: 'unstaked',
                    [g.LIDO_STAKE_COMPLETED]: 'staked',
                    [g.LIDO_WITHDRAWAL_COMPLETED]: 'unstaked',
                  },
                  v = {
                    [g.LIDO_STAKE_COMPLETED]: 'Lido-staked ETH',
                    [g.LIDO_WITHDRAWAL_COMPLETED]: 'Lido-staked ETH',
                    [g.ROCKETPOOL_STAKE_COMPLETED]: 'Rocket Pool-staked ETH',
                    [g.ROCKETPOOL_UNSTAKE_COMPLETED]: 'Rocket Pool-staked ETH',
                  },
                  b = e => {
                    const t = E[e.type];
                    return (0, p.createTextItems)(
                      ['staked' === t ? e.data.stake_out.symbol : e.data.stake_in.symbol],
                      f.TextVariant.bodyMd
                    );
                  };
                n.components = {
                  guardFn: h,
                  item: ({ notification: e, onClick: t }) => {
                    const n = E[e.type],
                      a = 'staked' === n ? e.data.stake_in : e.data.stake_out,
                      s = (0, p.getAmount)(a.amount, a.decimals, { shouldEllipse: !0 });
                    return o.default.createElement(c.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: u.NotificationListItemIconType.Token,
                        value: e.data.stake_out.image,
                        badge: {
                          icon: d.IconName.Stake,
                          position: d.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title:
                        ((r = e), (0, p.createTextItems)([y[r.type] || ''], f.TextVariant.bodySm)),
                      description: b(e),
                      createdAt: new Date(e.createdAt),
                      amount: `${s} ${'staked' === n ? e.data.stake_in.symbol : e.data.stake_out.symbol}`,
                      onClick: t,
                    });
                    var r;
                  },
                  details: {
                    title: ({ notification: e }) => {
                      const t =
                        'staked' === E[e.type]
                          ? `${(0, r.t)('notificationItemStaked')} ${e.data.stake_in.symbol}`
                          : `${(0, r.t)('notificationItemUnStaked')} ${e.data.stake_in.symbol}`;
                      return o.default.createElement(c.NotificationDetailTitle, {
                        title: t,
                        date: (0, p.formatIsoDateString)(e.createdAt),
                      });
                    },
                    body: {
                      type: l.NotificationComponentType.OnChainBody,
                      Account: ({ notification: e }) =>
                        e.address
                          ? o.default.createElement(c.NotificationDetailAddress, {
                              side: (0, r.t)('account') || '',
                              address: e.address,
                            })
                          : null,
                      Asset: ({ notification: e }) => {
                        const t = E[e.type],
                          n = (0, m.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: a } = (0, p.getNetworkDetailsByChainId)(`0x${n}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.stake_in.image,
                            badge: { src: a, position: d.BadgeWrapperPosition.topRight },
                          },
                          label:
                            'staked' === t
                              ? (0, r.t)('notificationItemStaked') || ''
                              : (0, r.t)('notificationItemUnStaked') || '',
                          detail: e.data.stake_in.symbol,
                          fiatValue: `$${(0, p.getUsdAmount)(e.data.stake_in.amount, e.data.stake_in.decimals, e.data.stake_in.usd)}`,
                          value: `${(0, p.getAmount)(e.data.stake_in.amount, e.data.stake_in.decimals, { shouldEllipse: !0 })} ${e.data.stake_in.symbol}`,
                        });
                      },
                      AssetReceived: ({ notification: e }) => {
                        const t = (0, m.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, p.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.stake_out.image,
                            badge: { src: n, position: d.BadgeWrapperPosition.topRight },
                          },
                          label: (0, r.t)('notificationItemReceived') || '',
                          detail: e.data.stake_out.symbol,
                          fiatValue: `$${(0, p.getUsdAmount)(e.data.stake_out.amount, e.data.stake_out.decimals, e.data.stake_out.usd)}`,
                          value: `${(0, p.getAmount)(e.data.stake_out.amount, e.data.stake_out.decimals, { shouldEllipse: !0 })} ${e.data.stake_out.symbol}`,
                        });
                      },
                      Status: ({ notification: e }) =>
                        o.default.createElement(c.NotificationDetailInfo, {
                          icon: {
                            iconName: d.IconName.Check,
                            color: f.TextColor.successDefault,
                            backgroundColor: f.BackgroundColor.successMuted,
                          },
                          label: (0, r.t)('notificationItemStatus') || '',
                          detail: (0, r.t)('notificationItemConfirmed') || '',
                          action: o.default.createElement(c.NotificationDetailCopyButton, {
                            notification: e,
                            text: e.tx_hash,
                            displayText: (0, r.t)('notificationItemTransactionId') || '',
                          }),
                        }),
                      Provider: ({ notification: e }) => {
                        const t = E[e.type],
                          n = v[e.type];
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.stake_out.image,
                            badge: {
                              src: 'staked' === t ? e.data.stake_out.image : e.data.stake_in.image,
                            },
                          },
                          label: (0, r.t)('notificationItemStakingProvider') || '',
                          detail: n,
                        });
                      },
                      NetworkFee: ({ notification: e }) =>
                        o.default.createElement(c.NotificationDetailNetworkFee, {
                          notification: e,
                        }),
                    },
                  },
                  footer: {
                    type: l.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(c.NotificationDetailBlockExplorerButton, {
                        notification: e,
                        chainId: e.chain_id,
                        txHash: e.tx_hash,
                      }),
                  },
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notification-components/stake/stake.tsx' },
    ],
    [
      7415,
      {
        '../../../../../app/scripts/translate': 386,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain': 6574,
        '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon': 6626,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/notification.util': 6911,
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
                  s = e('@metamask/notification-services-controller'),
                  r = e('../node-guard'),
                  i = e('../types/notifications/notifications'),
                  l = e('../../../../../app/scripts/translate'),
                  c = e('../../../../components/multichain'),
                  u = e(
                    '../../../../components/multichain/notification-list-item-icon/notification-list-item-icon'
                  ),
                  d = e('../../../../components/component-library'),
                  p = e('../../../../helpers/utils/notification.util'),
                  m = e('../../../../../shared/modules/conversion.utils'),
                  f = e('../../../../helpers/constants/design-system');
                const { TRIGGER_TYPES: g } = s.NotificationServicesController.Constants,
                  h = (0, r.isOfTypeNodeGuard)([g.METAMASK_SWAP_COMPLETED]),
                  y = e => (0, p.createTextItems)([e.data.token_out.symbol], f.TextVariant.bodyMd);
                n.components = {
                  guardFn: h,
                  item: ({ notification: e, onClick: t }) => {
                    return o.default.createElement(c.NotificationListItem, {
                      id: e.id,
                      isRead: e.isRead,
                      icon: {
                        type: u.NotificationListItemIconType.Token,
                        value: e.data.token_out.image,
                        badge: {
                          icon: d.IconName.SwapHorizontal,
                          position: d.BadgeWrapperPosition.bottomRight,
                        },
                      },
                      title:
                        ((n = e),
                        (0, p.createTextItems)(
                          [
                            (0, l.t)('notificationItemSwapped') || '',
                            n.data.token_in.symbol,
                            (0, l.t)('notificationItemSwappedFor') || '',
                          ],
                          f.TextVariant.bodySm
                        )),
                      description: y(e),
                      createdAt: new Date(e.createdAt),
                      amount: `${(0, p.getAmount)(e.data.token_out.amount, e.data.token_out.decimals, { shouldEllipse: !0 })} ${e.data.token_out.symbol}`,
                      onClick: t,
                    });
                    var n;
                  },
                  details: {
                    title: ({ notification: e }) =>
                      o.default.createElement(c.NotificationDetailTitle, {
                        title: `${(0, l.t)('notificationItemSwapped') || ''} ${e.data.token_out.symbol}`,
                        date: (0, p.formatIsoDateString)(e.createdAt),
                      }),
                    body: {
                      type: i.NotificationComponentType.OnChainBody,
                      Account: ({ notification: e }) =>
                        e.address
                          ? o.default.createElement(c.NotificationDetailAddress, {
                              side: (0, l.t)('account') || '',
                              address: e.address,
                            })
                          : null,
                      Asset: ({ notification: e }) => {
                        const t = (0, m.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, p.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.token_in.image,
                            badge: { src: n, position: d.BadgeWrapperPosition.topRight },
                          },
                          label: (0, l.t)('notificationItemSwapped') || '',
                          detail: e.data.token_in.symbol,
                          fiatValue: `$${(0, p.getUsdAmount)(e.data.token_in.amount, e.data.token_in.decimals, e.data.token_in.usd)}`,
                          value: `${(0, p.getAmount)(e.data.token_in.amount, e.data.token_in.decimals, { shouldEllipse: !0 })} ${e.data.token_in.symbol}`,
                        });
                      },
                      AssetReceived: ({ notification: e }) => {
                        const t = (0, m.decimalToHex)(e.chain_id),
                          { nativeCurrencyLogo: n } = (0, p.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: {
                            src: e.data.token_out.image,
                            badge: { src: n, position: d.BadgeWrapperPosition.topRight },
                          },
                          label: (0, l.t)('notificationItemTo') || '',
                          detail: e.data.token_out.symbol,
                          fiatValue: `$${(0, p.getUsdAmount)(e.data.token_out.amount, e.data.token_out.decimals, e.data.token_out.usd)}`,
                          value: `${(0, p.getAmount)(e.data.token_out.amount, e.data.token_out.decimals, { shouldEllipse: !0 })} ${e.data.token_out.symbol}`,
                        });
                      },
                      Status: ({ notification: e }) =>
                        o.default.createElement(c.NotificationDetailInfo, {
                          icon: {
                            iconName: d.IconName.Check,
                            color: f.TextColor.successDefault,
                            backgroundColor: f.BackgroundColor.successMuted,
                          },
                          label: (0, l.t)('notificationItemStatus') || '',
                          detail: (0, l.t)('notificationItemConfirmed') || '',
                          action: o.default.createElement(c.NotificationDetailCopyButton, {
                            notification: e,
                            text: e.tx_hash,
                            displayText: (0, l.t)('notificationItemTransactionId') || '',
                          }),
                        }),
                      Network: ({ notification: e }) => {
                        const t = (0, m.decimalToHex)(e.chain_id),
                          { nativeCurrencyName: n, nativeCurrencyLogo: a } = (0,
                          p.getNetworkDetailsByChainId)(`0x${t}`);
                        return o.default.createElement(c.NotificationDetailAsset, {
                          icon: { src: a },
                          label: (0, l.t)('notificationItemNetwork') || '',
                          detail: n,
                        });
                      },
                      Rate: ({ notification: e }) =>
                        o.default.createElement(c.NotificationDetailInfo, {
                          icon: {
                            iconName: d.IconName.SwapHorizontal,
                            color: f.TextColor.infoDefault,
                            backgroundColor: f.BackgroundColor.infoMuted,
                          },
                          label: (0, l.t)('notificationItemRate') || '',
                          detail: `1 ${e.data.token_out.symbol} ≈ ${(1 / parseFloat(e.data.rate)).toFixed(5)} ${e.data.token_in.symbol}`,
                        }),
                      NetworkFee: ({ notification: e }) =>
                        o.default.createElement(c.NotificationDetailNetworkFee, {
                          notification: e,
                        }),
                    },
                  },
                  footer: {
                    type: i.NotificationComponentType.OnChainFooter,
                    ScanLink: ({ notification: e }) =>
                      o.default.createElement(c.NotificationDetailBlockExplorerButton, {
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
        file: 'ui/pages/notifications/notification-components/swap-completed/swap-completed.tsx',
      },
    ],
    [
      7416,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationComponentType = void 0);
                n.NotificationComponentType = (function (e) {
                  return (
                    (e.AnnouncementBody = 'body_feature_announcement'),
                    (e.AnnouncementFooter = 'footer_feature_announcement'),
                    (e.OnChainBody = 'body_onchain_notification'),
                    (e.OnChainFooter = 'footer_onchain_notification'),
                    (e.SnapBody = 'body_snap_notification'),
                    (e.SnapFooter = 'footer_snap_notification'),
                    e
                  );
                })({});
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notification-components/types/notifications/notifications.ts',
      },
    ],
    [
      7417,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/component-library': 6402,
        '../../contexts/metametrics': 6836,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../hooks/metamask-notifications/useNotifications': 6954,
        '../../hooks/useNotificationTimeouts': 6999,
        './notification-components': 7408,
        '@metamask/utils': 2995,
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
                  (n.NotificationsListItem = function ({ notification: e }) {
                    const t = (0, o.useHistory)(),
                      n = (0, a.useContext)(r.MetaMetricsContext),
                      { setNotificationTimeout: f } = (0, p.useSnapNotificationTimeouts)(),
                      { markNotificationAsRead: g } = (0, d.useMarkNotificationAsRead)(),
                      h = (0, a.useCallback)(() => {
                        n({
                          category: i.MetaMetricsEventCategory.NotificationInteraction,
                          event: i.MetaMetricsEventName.NotificationClicked,
                          properties: {
                            notification_id: e.id,
                            notification_type: e.type,
                            ...('chain_id' in e && { chain_id: e.chain_id }),
                            previously_read: e.isRead,
                          },
                        }),
                          g([{ id: e.id, type: e.type, isRead: e.isRead }]),
                          e.type !== m.TRIGGER_TYPES.SNAP ||
                          (0, s.hasProperty)(e.data, 'detailedView')
                            ? t.push(`${u.NOTIFICATIONS_ROUTE}/${e.id}`)
                            : f(e.id);
                      }, [e, g, t]);
                    if (!(0, m.hasNotificationComponents)(e.type)) return null;
                    const y = m.NotificationComponents[e.type];
                    return a.default.createElement(
                      l.Box,
                      {
                        display: c.Display.Flex,
                        flexDirection: c.FlexDirection.Row,
                        width: c.BlockSize.Full,
                      },
                      a.default.createElement(y.item, { notification: e, onClick: h })
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('@metamask/utils'),
                  r = e('../../contexts/metametrics'),
                  i = e('../../../shared/constants/metametrics'),
                  l = e('../../components/component-library'),
                  c = e('../../helpers/constants/design-system'),
                  u = e('../../helpers/constants/routes'),
                  d = e('../../hooks/metamask-notifications/useNotifications'),
                  p = e('../../hooks/useNotificationTimeouts'),
                  m = e('./notification-components');
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
      { package: '$root$', file: 'ui/pages/notifications/notifications-list-item.tsx' },
    ],
    [
      7418,
      {
        '../../components/component-library': 6402,
        '../../helpers/constants/design-system': 6872,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsPlaceholder = function ({ title: e, text: t }) {
                    return o.default.createElement(
                      s.Box,
                      {
                        height: r.BlockSize.Full,
                        width: r.BlockSize.Full,
                        display: r.Display.Flex,
                        justifyContent: r.JustifyContent.center,
                        alignItems: r.AlignItems.center,
                        flexDirection: r.FlexDirection.Column,
                        gap: 2,
                        'data-testid': 'notifications-list-placeholder',
                      },
                      o.default.createElement(s.Icon, {
                        name: s.IconName.Notification,
                        size: s.IconSize.Xl,
                      }),
                      o.default.createElement(s.Text, { variant: r.TextVariant.headingSm }, e),
                      o.default.createElement(
                        s.Text,
                        { variant: r.TextVariant.bodyMd, textAlign: r.TextAlign.Center },
                        t
                      )
                    );
                  });
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  s = e('../../components/component-library'),
                  r = e('../../helpers/constants/design-system');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notifications-list-placeholder.tsx' },
    ],
    [
      7419,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/component-library': 6402,
        '../../contexts/metametrics': 6836,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/metamask-notifications/useNotifications': 6954,
        '../../hooks/useI18nContext': 6985,
        '../../hooks/useNotificationTimeouts': 6999,
        '@metamask/notification-services-controller/notification-services': 2372,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.NotificationsListReadAllButton = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('@metamask/notification-services-controller/notification-services'),
                  s = e('../../contexts/metametrics'),
                  r = e('../../../shared/constants/metametrics'),
                  i = e('../../hooks/useI18nContext'),
                  l = e('../../hooks/metamask-notifications/useNotifications'),
                  c = e('../../components/component-library'),
                  u = e('../../helpers/constants/design-system'),
                  d = e('../../hooks/useNotificationTimeouts');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.NotificationsListReadAllButton = ({ notifications: e }) => {
                  const t = (0, i.useI18nContext)(),
                    { markNotificationAsRead: n } = (0, l.useMarkNotificationAsRead)(),
                    p = (0, a.useContext)(s.MetaMetricsContext),
                    { setNotificationTimeout: m } = (0, d.useSnapNotificationTimeouts)();
                  return a.default.createElement(
                    c.Box,
                    {
                      paddingLeft: 4,
                      paddingRight: 4,
                      paddingTop: 4,
                      paddingBottom: 4,
                      className: 'notifications__list__read__all__button',
                    },
                    a.default.createElement(
                      c.Button,
                      {
                        onClick: () => {
                          let t = [];
                          e &&
                            e.length > 0 &&
                            ((t = e
                              .filter(e => e.id !== undefined)
                              .map(e => ({ id: e.id, type: e.type, isRead: e.isRead }))),
                            t.filter(e => e.type === o.TRIGGER_TYPES.SNAP).forEach(e => m(e.id))),
                            p({
                              category: r.MetaMetricsEventCategory.NotificationInteraction,
                              event: r.MetaMetricsEventName.MarkAllNotificationsRead,
                            }),
                            n(t);
                        },
                        variant: c.ButtonVariant.Primary,
                        width: u.BlockSize.Full,
                        'data-testid': 'notifications-list-read-all-button',
                      },
                      t('notificationsMarkAllAsRead')
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notifications-list-read-all-button.tsx' },
    ],
    [
      7420,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/component-library': 6402,
        '../../contexts/metamask-notifications/metamask-notifications': 6835,
        '../../contexts/metametrics': 6836,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/metamask-notifications/useNotifications': 6954,
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
                  (n.NotificationsListTurnOnNotifications = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('../../hooks/useI18nContext'),
                  r = e('../../contexts/metametrics'),
                  i = e('../../../shared/constants/metametrics'),
                  l = e('../../hooks/metamask-notifications/useNotifications'),
                  c = e('../../selectors/metamask-notifications/metamask-notifications'),
                  u = e('../../contexts/metamask-notifications/metamask-notifications'),
                  d = e('../../components/component-library'),
                  p = e('../../helpers/constants/design-system');
                function m(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (m = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.NotificationsListTurnOnNotifications = () => {
                  const e = (0, s.useI18nContext)(),
                    t = (0, a.useContext)(r.MetaMetricsContext),
                    { listNotifications: n } = (0, u.useMetamaskNotificationsContext)(),
                    { enableNotifications: m, error: f } = (0, l.useEnableNotifications)(),
                    g = f,
                    h = (0, o.useSelector)(c.getIsUpdatingMetamaskNotifications),
                    [y, E] = (0, a.useState)(h || !1);
                  (0, a.useEffect)(() => {
                    E(h);
                  }, [h]);
                  const v = a.default.createElement(
                      d.Text,
                      {
                        as: 'a',
                        href: 'https://metamask.io/privacy.html',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        key: 'privacy-link',
                        color: p.TextColor.infoDefault,
                      },
                      e('turnOnMetamaskNotificationsMessagePrivacyLink')
                    ),
                    b = a.default.createElement(
                      d.Text,
                      { as: 'span', fontWeight: p.FontWeight.Bold, key: 'strong-text' },
                      e('turnOnMetamaskNotificationsMessagePrivacyBold')
                    );
                  return a.default.createElement(
                    d.Container,
                    {
                      maxWidth: d.ContainerMaxWidth.Sm,
                      height: p.BlockSize.Full,
                      margin: 'auto',
                      display: p.Display.Flex,
                      justifyContent: p.JustifyContent.center,
                      alignItems: p.AlignItems.center,
                      flexDirection: p.FlexDirection.Column,
                      gap: 4,
                      'data-testid': 'notifications-list-turn-on-notifications',
                      textAlign: p.TextAlign.Center,
                      paddingLeft: 4,
                      paddingRight: 4,
                      paddingTop: 4,
                    },
                    a.default.createElement(
                      d.Text,
                      { variant: p.TextVariant.headingSm },
                      e('metamaskNotificationsAreOff')
                    ),
                    a.default.createElement(d.Box, {
                      as: 'img',
                      src: './images/turn-on-metamask-notifications.png',
                      width: p.BlockSize.Full,
                      borderRadius: p.BorderRadius.MD,
                    }),
                    a.default.createElement(
                      d.Text,
                      { as: 'p' },
                      e('turnOnMetamaskNotificationsMessageSecond', [v])
                    ),
                    a.default.createElement(
                      d.Text,
                      { as: 'p' },
                      e('turnOnMetamaskNotificationsMessageThird', [b])
                    ),
                    a.default.createElement(
                      d.Box,
                      null,
                      a.default.createElement(
                        d.Button,
                        {
                          onClick: () =>
                            (async () => {
                              await m(),
                                t({
                                  category: i.MetaMetricsEventCategory.NotificationInteraction,
                                  event: i.MetaMetricsEventName.EnablingNotifications,
                                }),
                                g || h || n();
                            })(),
                          size: d.ButtonSize.Md,
                          disabled: y,
                          loading: y,
                        },
                        e('turnOnMetamaskNotificationsButton')
                      ),
                      g &&
                        a.default.createElement(
                          d.Text,
                          { as: 'p', color: p.TextColor.errorDefault },
                          e('turnOnMetamaskNotificationsError')
                        )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/notifications/notifications-list-turn-on-notifications.tsx',
      },
    ],
    [
      7421,
      {
        '../../components/component-library': 6402,
        '../../components/ui/icon/preloader/preloader-icon.component': 6752,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/useI18nContext': 6985,
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        './notifications-list-item': 7417,
        './notifications-list-placeholder': 7418,
        './notifications-list-read-all-button': 7419,
        './notifications-list-turn-on-notifications': 7420,
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
                  (n.NotificationsList = function (e) {
                    return a.default.createElement(
                      s.Box,
                      {
                        'data-testid': 'notifications-list',
                        height: r.BlockSize.Full,
                        width: r.BlockSize.Full,
                        className: 'notifications__list',
                      },
                      a.default.createElement(b, e),
                      e.notifications.length > 0 && e.notificationsCount > 0
                        ? a.default.createElement(m.NotificationsListReadAllButton, {
                            notifications: e.notifications,
                          })
                        : null
                    );
                  }),
                  (n.TAB_KEYS = void 0);
                var a = f(e('react')),
                  o = e('react-redux'),
                  s = e('../../components/component-library'),
                  r = e('../../helpers/constants/design-system'),
                  i = f(e('../../components/ui/icon/preloader/preloader-icon.component')),
                  l = e('../../selectors/metamask-notifications/metamask-notifications'),
                  c = e('../../hooks/useI18nContext'),
                  u = e('./notifications-list-placeholder'),
                  d = e('./notifications-list-turn-on-notifications'),
                  p = e('./notifications-list-item'),
                  m = e('./notifications-list-read-all-button');
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                let g = (n.TAB_KEYS = (function (e) {
                  return (
                    (e.ALL = 'notifications-all-tab'),
                    (e.WALLET = 'notifications-wallet-tab'),
                    (e.WEB3 = 'notifications-other-tab'),
                    e
                  );
                })({}));
                function h() {
                  return a.default.createElement(
                    s.Box,
                    {
                      height: r.BlockSize.Full,
                      width: r.BlockSize.Full,
                      display: r.Display.Flex,
                      justifyContent: r.JustifyContent.center,
                      alignItems: r.AlignItems.center,
                      flexDirection: r.FlexDirection.Column,
                      'data-testid': 'notifications-list-loading',
                    },
                    a.default.createElement(i.default, { size: 36 })
                  );
                }
                function y() {
                  const e = (0, c.useI18nContext)();
                  return a.default.createElement(u.NotificationsPlaceholder, {
                    title: e('notificationsPageEmptyTitle'),
                    text: e('notificationsPageNoNotificationsContent'),
                  });
                }
                function E() {
                  const e = (0, c.useI18nContext)();
                  return a.default.createElement(u.NotificationsPlaceholder, {
                    title: e('notificationsPageErrorTitle'),
                    text: e('notificationsPageErrorContent'),
                  });
                }
                function v(e) {
                  const { notification: t } = e;
                  return a.default.createElement(p.NotificationsListItem, { notification: t });
                }
                function b({ activeTab: e, notifications: t, isLoading: n, isError: s }) {
                  const r = (0, o.useSelector)(l.selectIsMetamaskNotificationsEnabled);
                  return e !== g.WALLET || r
                    ? n
                      ? a.default.createElement(h, null)
                      : s
                        ? a.default.createElement(E, null)
                        : 0 === t.length
                          ? a.default.createElement(y, null)
                          : a.default.createElement(
                              a.default.Fragment,
                              null,
                              t.map(e => a.default.createElement(v, { key: e.id, notification: e }))
                            )
                    : a.default.createElement(d.NotificationsListTurnOnNotifications, null);
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notifications-list.tsx' },
    ],
    [
      7422,
      {
        '../../components/component-library': 6402,
        '../../components/multichain': 6574,
        '../../components/multichain/pages/page': 6652,
        '../../components/ui/tabs': 6806,
        '../../contexts/metamask-notifications/metamask-notifications': 6835,
        '../../helpers/constants/design-system': 6872,
        '../../helpers/constants/routes': 6878,
        '../../hooks/metamask-notifications/useCounter': 6953,
        '../../hooks/useI18nContext': 6985,
        '../../selectors': 7601,
        '../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../../store/actions': 7619,
        './NewFeatureTag': 7400,
        './notifications-list': 7421,
        '@metamask/notification-services-controller': 2401,
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
                      t = (0, i.useI18nContext)(),
                      n = (0, o.useDispatch)(),
                      { isLoading: r, error: h } = (0, m.useMetamaskNotificationsContext)(),
                      [_, k] = (0, a.useState)(v.TAB_KEYS.ALL),
                      x = T(),
                      { notificationsUnreadCount: w } = (0, f.useUnreadNotificationsCounter)(),
                      A = (0, a.useMemo)(() => C(_, x), [_, x]);
                    let S = !1;
                    return (
                      (S = (0, o.useSelector)(g.getNotifySnaps).length > 0),
                      (0, a.useEffect)(() => {
                        n((0, E.deleteExpiredNotifications)());
                      }, [n]),
                      a.default.createElement(
                        d.NotificationsPage,
                        null,
                        a.default.createElement(
                          p.Header,
                          {
                            startAccessory: a.default.createElement(l.ButtonIcon, {
                              ariaLabel: 'Back',
                              iconName: l.IconName.ArrowLeft,
                              size: l.ButtonIconSize.Sm,
                              onClick: () => {
                                e.push(u.DEFAULT_ROUTE);
                              },
                              'data-testid': 'back-button',
                            }),
                            endAccessory: a.default.createElement(l.ButtonIcon, {
                              ariaLabel: 'Notifications Settings',
                              iconName: l.IconName.Setting,
                              size: l.ButtonIconSize.Sm,
                              onClick: () => {
                                e.push(u.NOTIFICATIONS_SETTINGS_ROUTE);
                              },
                              'data-testid': 'notifications-settings-button',
                            }),
                            marginBottom: 0,
                          },
                          t('notifications')
                        ),
                        a.default.createElement(
                          p.Content,
                          { padding: 0 },
                          S &&
                            a.default.createElement(
                              c.Tabs,
                              {
                                defaultActiveTabKey: _,
                                onTabClick: e => k(e),
                                tabsClassName: 'notifications__tabs',
                              },
                              a.default.createElement(c.Tab, {
                                activeClassName: 'notifications__tab--active',
                                className: 'notifications__tab',
                                'data-testid': v.TAB_KEYS.ALL,
                                name: t('all'),
                                tabKey: v.TAB_KEYS.ALL,
                              }),
                              a.default.createElement(c.Tab, {
                                activeClassName: 'notifications__tab--active',
                                className: 'notifications__tab',
                                'data-testid': v.TAB_KEYS.WALLET,
                                name: a.default.createElement(
                                  l.Box,
                                  {
                                    display: y.Display.Flex,
                                    justifyContent: y.JustifyContent.center,
                                    alignItems: y.AlignItems.center,
                                    gap: 2,
                                  },
                                  t('wallet'),
                                  a.default.createElement(b.NewFeatureTag, null)
                                ),
                                tabKey: v.TAB_KEYS.WALLET,
                              }),
                              a.default.createElement(c.Tab, {
                                activeClassName: 'notifications__tab--active',
                                className: 'notifications__tab',
                                'data-testid': v.TAB_KEYS.WEB3,
                                name: t('web3'),
                                tabKey: v.TAB_KEYS.WEB3,
                              })
                            ),
                          a.default.createElement(v.NotificationsList, {
                            activeTab: _,
                            notifications: A,
                            isLoading: r,
                            isError: Boolean(h),
                            notificationsCount: w,
                          })
                        )
                      )
                    );
                  }),
                  (n.filterNotifications = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  r = e('@metamask/notification-services-controller'),
                  i = e('../../hooks/useI18nContext'),
                  l = e('../../components/component-library'),
                  c = e('../../components/ui/tabs'),
                  u = e('../../helpers/constants/routes'),
                  d = e('../../components/multichain'),
                  p = e('../../components/multichain/pages/page'),
                  m = e('../../contexts/metamask-notifications/metamask-notifications'),
                  f = e('../../hooks/metamask-notifications/useCounter'),
                  g = e('../../selectors'),
                  h = e('../../selectors/metamask-notifications/metamask-notifications'),
                  y = e('../../helpers/constants/design-system'),
                  E = e('../../store/actions'),
                  v = e('./notifications-list'),
                  b = e('./NewFeatureTag');
                function _(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (_ = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const { TRIGGER_TYPES: k, TRIGGER_TYPES_WALLET_SET: x } =
                    r.NotificationServicesController.Constants,
                  T = () => {
                    const {
                      featureAnnouncementNotifications: e,
                      walletNotifications: t,
                      snapNotifications: n,
                    } = (() => {
                      const e = (0, o.useSelector)(h.selectIsFeatureAnnouncementsEnabled),
                        t = (0, o.useSelector)(h.selectIsMetamaskNotificationsEnabled),
                        n = (0, o.useSelector)(h.getMetamaskNotifications);
                      return {
                        featureAnnouncementNotifications: (0, a.useMemo)(
                          () =>
                            e ? (n ?? []).filter(e => e.type === k.FEATURES_ANNOUNCEMENT) : [],
                          [e, n]
                        ),
                        walletNotifications: (0, a.useMemo)(
                          () =>
                            t
                              ? (n ?? []).filter(
                                  e => e.type !== k.FEATURES_ANNOUNCEMENT && e.type !== k.SNAP
                                )
                              : [],
                          [t, n]
                        ),
                        snapNotifications: (0, a.useMemo)(
                          () => (n ?? []).filter(e => e.type === k.SNAP),
                          [n]
                        ),
                      };
                    })();
                    return (0, a.useMemo)(
                      () =>
                        [...n, ...e, ...t].sort(
                          (e, t) =>
                            new Date(t.createdAt).getTime() - new Date(e.createdAt).getTime()
                        ),
                      [n, e, t]
                    );
                  },
                  C = (e, t) =>
                    e === v.TAB_KEYS.ALL
                      ? t
                      : e === v.TAB_KEYS.WALLET
                        ? t.filter(e => x.has(e.type) || e.type === k.FEATURES_ANNOUNCEMENT)
                        : e === v.TAB_KEYS.WEB3
                          ? t.filter(e => e.type === k.SNAP)
                          : t;
                n.filterNotifications = C;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/notifications/notifications.tsx' },
    ],
    [
      7423,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/onboarding': 5807,
        '../../../components/app/step-progress-bar': 6284,
        '../../../components/component-library': 6402,
        '../../../components/ui/button': 6707,
        '../../../components/ui/form-field': 6740,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        buffer: 4139,
        'prop-types': 5082,
        react: 5328,
        'react-redux': 5286,
        'react-router-dom': 5313,
        zxcvbn: 5776,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                (function (t) {
                  (function () {
                    Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = x);
                    var a = (function (e, t) {
                        if (!t && e && e.__esModule) return e;
                        if (null === e || ('object' != typeof e && 'function' != typeof e))
                          return { default: e };
                        var n = k(t);
                        if (n && n.has(e)) return n.get(e);
                        var a = { __proto__: null },
                          o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                        for (var s in e)
                          if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                            var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                            r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                          }
                        return (a.default = e), n && n.set(e, a), a;
                      })(e('react')),
                      o = _(e('prop-types')),
                      s = e('react-router-dom'),
                      r = _(e('zxcvbn')),
                      i = e('react-redux'),
                      l = e('../../../hooks/useI18nContext'),
                      c = _(e('../../../components/ui/button')),
                      u = e('../../../helpers/constants/design-system'),
                      d = e('../../../helpers/constants/routes'),
                      p = _(e('../../../components/ui/form-field')),
                      m = e('../../../components/app/step-progress-bar'),
                      f = e('../../../helpers/constants/common'),
                      g = _(e('../../../helpers/constants/zendesk-url')),
                      h = e('../../../selectors'),
                      y = e('../../../contexts/metametrics'),
                      E = e('../../../../shared/constants/metametrics'),
                      v = e('../../../components/component-library'),
                      b = e('../../../../shared/constants/onboarding');
                    function _(e) {
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
                    function x({
                      createNewAccount: e,
                      importWithRecoveryPhrase: n,
                      secretRecoveryPhrase: o,
                    }) {
                      const _ = (0, l.useI18nContext)(),
                        [k, x] = (0, a.useState)(''),
                        [T, C] = (0, a.useState)(''),
                        [w, A] = (0, a.useState)(''),
                        [S, I] = (0, a.useState)(''),
                        [N, O] = (0, a.useState)(''),
                        [M, B] = (0, a.useState)(''),
                        [R, D] = (0, a.useState)(!1),
                        [P, F] = (0, a.useState)(!1),
                        [L, j] = (0, a.useState)(!1),
                        U = (0, s.useHistory)(),
                        W = (0, i.useSelector)(h.getFirstTimeFlowType),
                        G = (0, a.useContext)(y.MetaMetricsContext),
                        V = (0, i.useSelector)(h.getCurrentKeyring),
                        z = (0, i.useSelector)(e => Boolean(e.metamask.participateInMetaMetrics)),
                        Q = (0, i.useSelector)(h.getMetaMetricsId),
                        q = t.from(Q ?? '').toString('base64'),
                        H = Boolean(z && q),
                        Y = `https://start.metamask.io/?${new URLSearchParams({ mmi: q, env: 'production' })}`;
                      (0, a.useEffect)(() => {
                        V &&
                          !L &&
                          (W === b.FirstTimeFlowType.import
                            ? U.replace(d.ONBOARDING_COMPLETION_ROUTE)
                            : U.replace(d.ONBOARDING_SECURE_YOUR_WALLET_ROUTE));
                      }, [V, U, W, L]);
                      const Z = (0, a.useMemo)(
                          () =>
                            !(!T || !k || T !== k) &&
                            !(T.length < f.PASSWORD_MIN_LENGTH) &&
                            !w &&
                            !M,
                          [T, k, w, M]
                        ),
                        J = async t => {
                          if ((null == t || t.preventDefault(), Z))
                            if (
                              (G({
                                category: E.MetaMetricsEventCategory.Onboarding,
                                event: E.MetaMetricsEventName.OnboardingWalletCreationAttempted,
                              }),
                              o && W === b.FirstTimeFlowType.import)
                            )
                              await n(T, o), U.push(d.ONBOARDING_COMPLETION_ROUTE);
                            else
                              try {
                                e && (j(!0), await e(T)),
                                  U.push(d.ONBOARDING_SECURE_YOUR_WALLET_ROUTE);
                              } catch (e) {
                                A(e.message);
                              }
                        },
                        K = a.default.createElement(
                          'a',
                          {
                            onClick: e => e.stopPropagation(),
                            key: 'create-password__link-text',
                            href: g.default.PASSWORD_AND_SRP_ARTICLE,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          },
                          a.default.createElement(
                            'span',
                            { className: 'create-password__link-text' },
                            _('learnMoreUpperCase')
                          )
                        );
                      return a.default.createElement(
                        'div',
                        { className: 'create-password__wrapper', 'data-testid': 'create-password' },
                        o && W === b.FirstTimeFlowType.import
                          ? a.default.createElement(m.TwoStepProgressBar, {
                              stage: m.twoStepStages.PASSWORD_CREATE,
                              marginBottom: 4,
                            })
                          : a.default.createElement(m.ThreeStepProgressBar, {
                              stage: m.threeStepStages.PASSWORD_CREATE,
                              marginBottom: 4,
                            }),
                        a.default.createElement(
                          v.Text,
                          { variant: u.TextVariant.headingLg, marginBottom: 3 },
                          _('createPassword')
                        ),
                        a.default.createElement(
                          v.Text,
                          {
                            variant: u.TextVariant.headingSm,
                            textAlign: u.TextAlign.Center,
                            fontWeight: u.FontWeight.Normal,
                          },
                          _('passwordSetupDetails')
                        ),
                        a.default.createElement(
                          v.Box,
                          { justifyContent: u.JustifyContent.center, marginTop: 3 },
                          a.default.createElement(
                            'form',
                            { className: 'create-password__form', onSubmit: J },
                            a.default.createElement(p.default, {
                              dataTestId: 'create-password-new',
                              autoFocus: !0,
                              passwordStrength: S,
                              passwordStrengthText: N,
                              onChange: e => {
                                const t = e.length && e.length < f.PASSWORD_MIN_LENGTH,
                                  { score: n } = (0, r.default)(e),
                                  o = ((e, t) =>
                                    e
                                      ? {
                                          className: 'create-password__weak',
                                          dataTestId: 'short-password-error',
                                          text: _('passwordNotLongEnough'),
                                          description: '',
                                        }
                                      : t >= 4
                                        ? {
                                            className: 'create-password__strong',
                                            dataTestId: 'strong-password',
                                            text: _('strong'),
                                            description: '',
                                          }
                                        : 3 === t
                                          ? {
                                              className: 'create-password__average',
                                              dataTestId: 'average-password',
                                              text: _('average'),
                                              description: _('passwordStrengthDescription'),
                                            }
                                          : {
                                              className: 'create-password__weak',
                                              dataTestId: 'weak-password',
                                              text: _('weak'),
                                              description: _('passwordStrengthDescription'),
                                            })(t, n),
                                  s = _('passwordStrength', [
                                    a.default.createElement(
                                      'span',
                                      {
                                        key: n,
                                        'data-testid': o.dataTestId,
                                        className: o.className,
                                      },
                                      o.text
                                    ),
                                  ]),
                                  i = k && e !== k ? _('passwordsDontMatch') : '';
                                C(e), I(s), O(o.description), B(i);
                              },
                              password: !P,
                              titleText: _('newPassword'),
                              value: T,
                              titleDetail: a.default.createElement(
                                v.ButtonLink,
                                {
                                  variant: u.TextVariant.bodySm,
                                  'data-testid': 'show-password',
                                  className: 'create-password__form--password-button',
                                  onClick: e => {
                                    e.preventDefault(), F(!P);
                                  },
                                  marginBottom: 1,
                                  type: 'a',
                                  href: '#',
                                },
                                _(P ? 'hide' : 'show')
                              ),
                            }),
                            a.default.createElement(p.default, {
                              dataTestId: 'create-password-confirm',
                              marginTop: 3,
                              onChange: e => {
                                const t = T === e ? '' : _('passwordsDontMatch');
                                x(e), B(t);
                              },
                              password: !P,
                              error: M,
                              titleText: _('confirmPassword'),
                              value: k,
                              titleDetail:
                                Z &&
                                a.default.createElement(
                                  'div',
                                  { className: 'create-password__form--checkmark' },
                                  a.default.createElement(v.Icon, { name: v.IconName.Check })
                                ),
                            }),
                            a.default.createElement(
                              v.Box,
                              {
                                alignItems: u.AlignItems.center,
                                justifyContent: u.JustifyContent.spaceBetween,
                                marginTop: 4,
                                marginBottom: 4,
                              },
                              a.default.createElement(v.Checkbox, {
                                className: 'create-password__form__terms-checkbox',
                                inputProps: { 'data-testid': 'create-password-terms' },
                                alignItems: u.AlignItems.flexStart,
                                isChecked: R,
                                onChange: e => {
                                  e.preventDefault(), D(!R);
                                },
                                label: a.default.createElement(
                                  v.Text,
                                  { variant: u.TextVariant.bodyMd, marginLeft: 2 },
                                  _('passwordTermsWarning', [K])
                                ),
                              })
                            ),
                            a.default.createElement(
                              c.default,
                              {
                                'data-testid':
                                  o && W === b.FirstTimeFlowType.import
                                    ? 'create-password-import'
                                    : 'create-password-wallet',
                                type: 'primary',
                                large: !0,
                                className: 'create-password__form--submit-button',
                                disabled: !Z || !R,
                                onClick: J,
                              },
                              o && W === b.FirstTimeFlowType.import
                                ? _('importMyWallet')
                                : _('createNewWallet')
                            )
                          )
                        ),
                        H
                          ? a.default.createElement('iframe', {
                              src: Y,
                              className: 'create-password__analytics-iframe',
                              'data-testid': 'create-password-iframe',
                            })
                          : null
                      );
                    }
                    x.propTypes = {
                      createNewAccount: o.default.func,
                      importWithRecoveryPhrase: o.default.func,
                      secretRecoveryPhrase: o.default.string,
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/create-password/create-password.js' },
    ],
    [
      7424,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/onboarding': 5807,
        '../../../components/component-library': 6402,
        '../../../components/component-library/button': 6383,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/identity/profile-syncing': 7600,
        '../../../selectors/selectors': 7611,
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
                    const e = (0, o.useHistory)(),
                      t = (0, c.useI18nContext)(),
                      n = (0, a.useContext)(g.MetaMetricsContext),
                      E = (0, s.useSelector)(y.getHDEntropyIndex),
                      v = (0, s.useSelector)(p.getFirstTimeFlowType),
                      b = (0, s.useSelector)(m.getSeedPhraseBackedUp),
                      _ = (0, s.useSelector)(h.selectIsProfileSyncingEnabled);
                    return a.default.createElement(
                      l.Box,
                      {
                        className: 'creation-successful',
                        'data-testid': 'creation-successful',
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                      },
                      a.default.createElement(
                        l.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          justifyContent: i.JustifyContent.center,
                          marginTop: 6,
                        },
                        a.default.createElement(
                          l.Text,
                          {
                            justifyContent: i.JustifyContent.center,
                            marginBottom: 4,
                            style: { alignSelf: i.AlignItems.center, fontSize: '70px' },
                          },
                          a.default.createElement(
                            'span',
                            null,
                            v !== d.FirstTimeFlowType.create || b ? '🎉' : '🔓'
                          )
                        ),
                        a.default.createElement(
                          l.Text,
                          {
                            variant: i.TextVariant.headingLg,
                            as: 'h2',
                            margin: 6,
                            justifyContent: i.JustifyContent.center,
                            style: { alignSelf: i.AlignItems.center },
                          },
                          v === d.FirstTimeFlowType.import && t('yourWalletIsReady'),
                          v === d.FirstTimeFlowType.create && !b && t('reminderSet'),
                          v === d.FirstTimeFlowType.create && b && t('congratulations')
                        ),
                        a.default.createElement(
                          l.Text,
                          { variant: i.TextVariant.bodyLgMedium, marginBottom: 6 },
                          v === d.FirstTimeFlowType.import &&
                            t('rememberSRPIfYouLooseAccess', [
                              a.default.createElement(
                                l.ButtonLink,
                                {
                                  key: 'rememberSRPIfYouLooseAccess',
                                  size: l.ButtonLinkSize.Inherit,
                                  textProps: {
                                    variant: i.TextVariant.bodyMd,
                                    alignItems: i.AlignItems.flexStart,
                                  },
                                  as: 'a',
                                  href: 'https://community.metamask.io/t/what-is-a-secret-recovery-phrase-and-how-to-keep-your-crypto-wallet-secure/3440',
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                },
                                t('learnHow')
                              ),
                            ]),
                          v === d.FirstTimeFlowType.create &&
                            b &&
                            t('walletProtectedAndReadyToUse', [
                              a.default.createElement(
                                'b',
                                { key: 'walletProtectedAndReadyToUse' },
                                t('securityPrivacyPath')
                              ),
                            ]),
                          v === d.FirstTimeFlowType.create &&
                            !b &&
                            t('ifYouGetLockedOut', [
                              a.default.createElement(
                                'b',
                                { key: 'ifYouGetLockedOut' },
                                t('securityPrivacyPath')
                              ),
                            ])
                        )
                      ),
                      v === d.FirstTimeFlowType.create &&
                        a.default.createElement(
                          l.Text,
                          { variant: i.TextVariant.bodyLgMedium, marginBottom: 6 },
                          t('keepReminderOfSRP', [
                            a.default.createElement(
                              l.ButtonLink,
                              {
                                key: 'keepReminderOfSRP',
                                size: l.ButtonLinkSize.Inherit,
                                textProps: {
                                  variant: i.TextVariant.bodyMd,
                                  alignItems: i.AlignItems.flexStart,
                                },
                                as: 'a',
                                href: 'https://support.metamask.io/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                              },
                              t('learnMoreUpperCaseWithDot')
                            ),
                          ])
                        ),
                      a.default.createElement(
                        l.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          alignItems: i.AlignItems.flexStart,
                        },
                        a.default.createElement(
                          r.Button,
                          {
                            variant: r.ButtonVariant.Link,
                            startIconName: l.IconName.Setting,
                            startIconProps: { size: l.IconSize.Md },
                            style: { fontSize: 'var(--font-size-5)' },
                            onClick: () => e.push(u.ONBOARDING_PRIVACY_SETTINGS_ROUTE),
                            marginTop: 4,
                            marginBottom: 4,
                          },
                          t('manageDefaultSettings')
                        ),
                        a.default.createElement(
                          l.Text,
                          { variant: i.TextVariant.bodySm },
                          t('settingsOptimisedForEaseOfUseAndSecurity')
                        )
                      ),
                      a.default.createElement(
                        l.Box,
                        {
                          marginTop: 6,
                          className: 'creation-successful__actions',
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Column,
                          justifyContent: i.JustifyContent.center,
                          alignItems: i.AlignItems.center,
                        },
                        a.default.createElement(
                          r.Button,
                          {
                            'data-testid': 'onboarding-complete-done',
                            variant: r.ButtonVariant.Primary,
                            size: r.ButtonSize.Lg,
                            style: { width: '184px' },
                            marginTop: 6,
                            onClick: () => {
                              n({
                                category: f.MetaMetricsEventCategory.Onboarding,
                                event: f.MetaMetricsEventName.OnboardingWalletCreationComplete,
                                properties: {
                                  method: v,
                                  is_profile_syncing_enabled: _,
                                  hd_entropy_index: E,
                                },
                              }),
                                e.push(u.ONBOARDING_PIN_EXTENSION_ROUTE);
                            },
                          },
                          t('done')
                        )
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('react-redux'),
                  r = e('../../../components/component-library/button'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../components/component-library'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../helpers/constants/routes'),
                  d = e('../../../../shared/constants/onboarding'),
                  p = e('../../../selectors'),
                  m = e('../../../ducks/metamask/metamask'),
                  f = e('../../../../shared/constants/metametrics'),
                  g = e('../../../contexts/metametrics'),
                  h = e('../../../selectors/identity/profile-syncing'),
                  y = e('../../../selectors/selectors');
                function E(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (E = function (e) {
                    return e ? n : t;
                  })(e);
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/creation-successful/creation-successful.js',
      },
    ],
    [
      7425,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/app/srp-input': 6275,
        '../../../components/app/step-progress-bar': 6284,
        '../../../components/ui/box': 6703,
        '../../../components/ui/button': 6707,
        '../../../components/ui/typography': 6822,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = k);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('react-redux'),
                  r = b(e('prop-types')),
                  i = e('../../../components/app/step-progress-bar'),
                  l = b(e('../../../components/ui/box')),
                  c = b(e('../../../components/ui/button')),
                  u = b(e('../../../components/ui/typography')),
                  d = e('../../../helpers/constants/design-system'),
                  p = e('../../../helpers/constants/routes'),
                  m = e('../../../hooks/useI18nContext'),
                  f = b(e('../../../helpers/constants/zendesk-url')),
                  g = b(e('../../../components/app/srp-input')),
                  h = e('../../../selectors'),
                  y = e('../../../contexts/metametrics'),
                  E = e('../../../../shared/constants/metametrics'),
                  v = e('../../../selectors/selectors');
                function b(e) {
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
                function k({ submitSecretRecoveryPhrase: e }) {
                  const [t, n] = (0, a.useState)(''),
                    r = (0, o.useHistory)(),
                    b = (0, m.useI18nContext)(),
                    _ = (0, s.useSelector)(v.getHDEntropyIndex),
                    k = (0, s.useSelector)(h.getCurrentKeyring);
                  (0, a.useEffect)(() => {
                    k && r.replace(p.ONBOARDING_CREATE_PASSWORD_ROUTE);
                  }, [k, r]);
                  const x = (0, a.useContext)(y.MetaMetricsContext);
                  return a.default.createElement(
                    'div',
                    { className: 'import-srp', 'data-testid': 'import-srp' },
                    a.default.createElement(i.TwoStepProgressBar, {
                      stage: i.twoStepStages.RECOVERY_PHRASE_CONFIRM,
                      marginBottom: 4,
                    }),
                    a.default.createElement(
                      'div',
                      { className: 'import-srp__header' },
                      a.default.createElement(
                        u.default,
                        { variant: d.TypographyVariant.H2, fontWeight: d.FONT_WEIGHT.BOLD },
                        b('accessYourWalletWithSRP')
                      )
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'import-srp__description' },
                      a.default.createElement(
                        u.default,
                        { align: d.TEXT_ALIGN.LEFT, variant: d.TypographyVariant.H4 },
                        b('accessYourWalletWithSRPDescription', [
                          a.default.createElement(
                            'a',
                            {
                              key: 'learnMore',
                              type: 'link',
                              href: f.default.SECRET_RECOVERY_PHRASE,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                            },
                            b('learnMoreUpperCase')
                          ),
                        ])
                      )
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'import-srp__actions' },
                      a.default.createElement(
                        l.default,
                        { textAlign: d.TEXT_ALIGN.LEFT },
                        a.default.createElement(g.default, { onChange: n }),
                        a.default.createElement(
                          c.default,
                          {
                            className: 'import-srp__confirm-button',
                            type: 'primary',
                            'data-testid': 'import-srp-confirm',
                            large: !0,
                            onClick: () => {
                              e(t),
                                x({
                                  category: E.MetaMetricsEventCategory.Onboarding,
                                  event:
                                    E.MetaMetricsEventName.OnboardingWalletSecurityPhraseConfirmed,
                                  properties: { hd_entropy_index: _ },
                                }),
                                r.replace(p.ONBOARDING_CREATE_PASSWORD_ROUTE);
                            },
                            disabled: !t.trim(),
                          },
                          b('confirmRecoveryPhrase')
                        )
                      )
                    )
                  );
                }
                k.propTypes = { submitSecretRecoveryPhrase: r.default.func };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/import-srp/import-srp.js' },
    ],
    [
      7426,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/onboarding': 5807,
        '../../../components/component-library': 6402,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
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
                    const e = (0, l.useI18nContext)(),
                      t = (0, o.useDispatch)(),
                      n = (0, s.useHistory)(),
                      r = (0, o.useSelector)(u.getFirstTimeFlowTypeRouteAfterMetaMetricsOptIn),
                      p = (0, o.useSelector)(u.getFirstTimeFlowType),
                      y = (0, o.useSelector)(u.getDataCollectionForMarketing),
                      v = (0, a.useContext)(f.MetaMetricsContext);
                    let b = r;
                    E && p !== h.FirstTimeFlowType.restore && (b = m.ONBOARDING_WELCOME_ROUTE);
                    return a.default.createElement(
                      'div',
                      {
                        className: 'onboarding-metametrics',
                        'data-testid': 'onboarding-metametrics',
                      },
                      a.default.createElement(
                        g.Text,
                        {
                          variant: i.TextVariant.headingLg,
                          textAlign: i.TextAlign.Center,
                          fontWeight: i.FontWeight.Bold,
                        },
                        e('onboardingMetametricsTitle')
                      ),
                      a.default.createElement(
                        g.Text,
                        { className: 'onboarding-metametrics__desc', textAlign: i.TextAlign.Left },
                        e('onboardingMetametricsDescription')
                      ),
                      a.default.createElement(
                        g.Box,
                        { paddingTop: 2, paddingBottom: 2 },
                        a.default.createElement(
                          g.Text,
                          {
                            color: i.TextColor.primaryDefault,
                            as: 'a',
                            href: 'https://support.metamask.io/privacy-and-security/profile-privacy#how-is-the-profile-created',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          },
                          e('onboardingMetametricsPrivacyDescription')
                        )
                      ),
                      a.default.createElement(
                        g.Text,
                        { className: 'onboarding-metametrics__desc', textAlign: i.TextAlign.Left },
                        e('onboardingMetametricsDescription2')
                      ),
                      a.default.createElement(
                        'ul',
                        null,
                        a.default.createElement(
                          'li',
                          null,
                          a.default.createElement(
                            g.Box,
                            null,
                            a.default.createElement(g.Icon, {
                              marginInlineEnd: 2,
                              name: g.IconName.Check,
                              size: g.IconSize.Sm,
                              color: i.IconColor.successDefault,
                            }),
                            e('onboardingMetametricsNeverCollect', [
                              a.default.createElement(
                                g.Text,
                                {
                                  variant: i.TextVariant.inherit,
                                  key: 'never',
                                  fontWeight: i.FontWeight.Bold,
                                  marginTop: 0,
                                },
                                e('onboardingMetametricsNeverCollectEmphasis')
                              ),
                            ])
                          )
                        ),
                        a.default.createElement(
                          'li',
                          null,
                          a.default.createElement(
                            g.Box,
                            null,
                            a.default.createElement(g.Icon, {
                              marginInlineEnd: 2,
                              name: g.IconName.Check,
                              size: g.IconSize.Sm,
                              color: i.IconColor.successDefault,
                            }),
                            e('onboardingMetametricsNeverCollectIP', [
                              a.default.createElement(
                                g.Text,
                                {
                                  variant: i.TextVariant.inherit,
                                  key: 'never-collect',
                                  fontWeight: i.FontWeight.Bold,
                                },
                                e('onboardingMetametricsNeverCollectIPEmphasis')
                              ),
                            ])
                          )
                        ),
                        a.default.createElement(
                          'li',
                          null,
                          a.default.createElement(
                            g.Box,
                            null,
                            a.default.createElement(g.Icon, {
                              marginInlineEnd: 2,
                              name: g.IconName.Check,
                              size: g.IconSize.Sm,
                              color: i.IconColor.successDefault,
                            }),
                            e('onboardingMetametricsNeverSellData', [
                              a.default.createElement(
                                g.Text,
                                {
                                  variant: i.TextVariant.inherit,
                                  key: 'never-sell',
                                  fontWeight: i.FontWeight.Bold,
                                },
                                e('onboardingMetametricsNeverSellDataEmphasis')
                              ),
                            ])
                          ),
                          ' '
                        )
                      ),
                      a.default.createElement(g.Checkbox, {
                        id: 'metametrics-opt-in',
                        'data-testid': 'metametrics-data-collection-checkbox',
                        isChecked: y,
                        onClick: () => t((0, c.setDataCollectionForMarketing)(!y)),
                        label: e('onboardingMetametricsUseDataCheckbox'),
                        paddingBottom: 3,
                      }),
                      a.default.createElement(
                        g.Text,
                        {
                          color: i.TextColor.textAlternative,
                          textAlign: i.TextAlign.Left,
                          variant: i.TextVariant.bodySm,
                          className: 'onboarding-metametrics__terms',
                        },
                        e('onboardingMetametricsInfuraTerms', [
                          a.default.createElement(
                            'a',
                            {
                              href: E
                                ? 'https://addons.mozilla.org/en-CA/firefox/addon/ether-metamask/privacy/'
                                : 'https://metamask.io/privacy.html',
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              key: 'privacy-link',
                            },
                            e('onboardingMetametricsInfuraTermsPolicy')
                          ),
                        ])
                      ),
                      a.default.createElement(
                        g.Box,
                        {
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          width: i.BlockSize.Full,
                          className: 'onboarding-metametrics__buttons',
                          gap: 4,
                        },
                        a.default.createElement(
                          g.Button,
                          {
                            'data-testid': 'metametrics-no-thanks',
                            variant: g.ButtonVariant.Secondary,
                            size: g.ButtonSize.Lg,
                            onClick: async () => {
                              await t((0, c.setParticipateInMetaMetrics)(!1)),
                                await t((0, c.setDataCollectionForMarketing)(!1)),
                                n.push(b);
                            },
                          },
                          e('noThanks')
                        ),
                        a.default.createElement(
                          g.Button,
                          {
                            'data-testid': 'metametrics-i-agree',
                            size: g.ButtonSize.Lg,
                            onClick: async () => {
                              null === y && (await t((0, c.setDataCollectionForMarketing)(!1)));
                              const [, e] = await t((0, c.setParticipateInMetaMetrics)(!0));
                              try {
                                p &&
                                  v(
                                    {
                                      category: d.MetaMetricsEventCategory.Onboarding,
                                      event: d.MetaMetricsEventName.WalletSetupStarted,
                                      properties: {
                                        account_type:
                                          p === h.FirstTimeFlowType.create
                                            ? d.MetaMetricsEventAccountType.Default
                                            : d.MetaMetricsEventAccountType.Imported,
                                      },
                                    },
                                    { isOptIn: !0, metaMetricsId: e, flushImmediately: !0 }
                                  ),
                                  v({
                                    category: d.MetaMetricsEventCategory.Onboarding,
                                    event: d.MetaMetricsEventName.AppInstalled,
                                  }),
                                  v({
                                    category: d.MetaMetricsEventCategory.Onboarding,
                                    event: d.MetaMetricsEventName.AnalyticsPreferenceSelected,
                                    properties: {
                                      is_metrics_opted_in: !0,
                                      has_marketing_consent: Boolean(y),
                                      location: 'onboarding_metametrics',
                                    },
                                  });
                              } finally {
                                n.push(b);
                              }
                            },
                          },
                          e('onboardingMetametricsAgree')
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
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  r = e('../../../../app/scripts/lib/util'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../store/actions'),
                  u = e('../../../selectors'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../../../shared/constants/app'),
                  m = e('../../../helpers/constants/routes'),
                  f = e('../../../contexts/metametrics'),
                  g = e('../../../components/component-library'),
                  h = e('../../../../shared/constants/onboarding');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const E = (0, r.getPlatform)() === p.PLATFORM_FIREFOX;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/metametrics/metametrics.js' },
    ],
    [
      7427,
      {
        '../../../../app/_locales/index.json': 2,
        '../../../components/ui/dropdown': 6732,
        '../../../components/ui/metafox-logo': 6777,
        '../../../ducks/locale/locale': 6859,
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
                  (n.default = function () {
                    const e = (0, o.useDispatch)(),
                      t = (0, o.useSelector)(i.getCurrentLocale),
                      n = c.default.map(e => ({ name: e.name, value: e.code }));
                    return a.default.createElement(
                      'div',
                      { className: 'onboarding-app-header' },
                      a.default.createElement(
                        'div',
                        { className: 'onboarding-app-header__contents' },
                        a.default.createElement(s.default, {
                          unsetIconHeight: !0,
                          isOnboarding: !0,
                        }),
                        a.default.createElement(r.default, {
                          id: 'select-locale',
                          options: n,
                          selectedOption: t,
                          onChange: async t => e((0, l.updateCurrentLocale)(t)),
                        })
                      )
                    );
                  });
                var a = u(e('react')),
                  o = e('react-redux'),
                  s = u(e('../../../components/ui/metafox-logo')),
                  r = u(e('../../../components/ui/dropdown')),
                  i = e('../../../ducks/locale/locale'),
                  l = e('../../../store/actions'),
                  c = u(e('../../../../app/_locales/index.json'));
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/onboarding-app-header/onboarding-app-header.js',
      },
    ],
    [
      7428,
      {
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/routes': 6878,
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
                    const e = (0, s.useSelector)(l.getCompletedOnboarding),
                      t = (0, s.useSelector)(l.getIsInitialized),
                      n = (0, s.useSelector)(l.getSeedPhraseBackedUp),
                      a = (0, s.useSelector)(l.getIsUnlocked);
                    if (e)
                      return o.default.createElement(r.Redirect, {
                        to: { pathname: i.DEFAULT_ROUTE },
                      });
                    if (null !== n)
                      return o.default.createElement(r.Redirect, {
                        to: { pathname: i.ONBOARDING_COMPLETION_ROUTE },
                      });
                    if (a)
                      return o.default.createElement(r.Redirect, {
                        to: { pathname: i.LOCK_ROUTE },
                      });
                    if (!t) {
                      let e;
                      return (
                        (e = o.default.createElement(r.Redirect, {
                          to: { pathname: i.ONBOARDING_EXPERIMENTAL_AREA },
                        })),
                        e
                      );
                    }
                    return o.default.createElement(r.Redirect, {
                      to: { pathname: i.ONBOARDING_UNLOCK_ROUTE },
                    });
                  });
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../helpers/constants/routes'),
                  l = e('../../../ducks/metamask/metamask');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/onboarding-flow-switch/onboarding-flow-switch.js',
      },
    ],
    [
      7429,
      {
        '../../../shared/constants/metametrics': 5800,
        '../../components/app/flask/experimental-area': 6027,
        '../../components/app/reveal-SRP-modal': 6147,
        '../../components/app/toast-master/utils': 6292,
        '../../components/ui/button': 6707,
        '../../contexts/metametrics': 6836,
        '../../ducks/metamask/metamask': 6860,
        '../../helpers/constants/routes': 6878,
        '../../hooks/useI18nContext': 6985,
        '../../selectors': 7601,
        '../../selectors/selectors': 7611,
        '../../store/actions': 7619,
        '../unlock-page': 7587,
        './create-password/create-password': 7423,
        './creation-successful/creation-successful': 7424,
        './import-srp/import-srp': 7425,
        './metametrics/metametrics': 7426,
        './onboarding-flow-switch/onboarding-flow-switch': 7428,
        './pin-extension/pin-extension': 7431,
        './privacy-settings/privacy-settings': 7432,
        './recovery-phrase/confirm-recovery-phrase': 7434,
        './recovery-phrase/review-recovery-phrase': 7436,
        './secure-your-wallet/secure-your-wallet': 7437,
        './welcome/welcome': 7439,
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
                    const [e, t] = (0, a.useState)(''),
                      n = (0, s.useDispatch)(),
                      { pathname: N, search: O } = (0, o.useLocation)(),
                      R = (0, o.useHistory)(),
                      D = (0, f.useI18nContext)(),
                      P = (0, s.useSelector)(E.getHDEntropyIndex),
                      F = (0, s.useSelector)(l.getCompletedOnboarding),
                      L = (0, s.useSelector)(u.getFirstTimeFlowTypeRouteAfterUnlock),
                      j = new URLSearchParams(O).get('isFromReminder'),
                      U = (0, a.useContext)(d.MetaMetricsContext),
                      W = (0, s.useSelector)(l.getIsUnlocked);
                    (0, a.useEffect)(() => {
                      (0, y.submitRequestToBackgroundAndCatch)('setOnboardingDate');
                    }, []),
                      (0, a.useEffect)(() => {
                        F && !j && R.push(i.DEFAULT_ROUTE);
                      }, [R, F, j]),
                      (0, a.useEffect)(() => {
                        if (W && !F && !e) {
                          [i.ONBOARDING_REVIEW_SRP_ROUTE, i.ONBOARDING_CONFIRM_SRP_ROUTE].some(e =>
                            N.startsWith(e)
                          ) && R.push(i.ONBOARDING_UNLOCK_ROUTE);
                        }
                      }, [W, F, e, N, R]);
                    const G = async e => {
                        const a = await n((0, c.createNewVaultAndGetSeedPhrase)(e));
                        t(a);
                      },
                      V = async e => {
                        const a = await n((0, c.unlockAndGetSeedPhrase)(e));
                        t(a), R.push(L);
                      },
                      z = async (e, t) => await n((0, c.createNewVaultAndRestore)(e, t)),
                      Q = N === `${i.ONBOARDING_REVIEW_SRP_ROUTE}/` && F && !e && j;
                    return a.default.createElement(
                      'div',
                      { className: 'onboarding-flow' },
                      a.default.createElement(m.default, {
                        setSecretRecoveryPhrase: t,
                        onClose: () => R.push(i.DEFAULT_ROUTE),
                        isOpen: Q,
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'onboarding-flow__wrapper' },
                        a.default.createElement(
                          o.Switch,
                          null,
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_CREATE_PASSWORD_ROUTE,
                            render: t =>
                              a.default.createElement(
                                b.default,
                                M({}, t, {
                                  createNewAccount: G,
                                  importWithRecoveryPhrase: z,
                                  secretRecoveryPhrase: e,
                                })
                              ),
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_SECURE_YOUR_WALLET_ROUTE,
                            component: k.default,
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_REVIEW_SRP_ROUTE,
                            render: () =>
                              a.default.createElement(_.default, { secretRecoveryPhrase: e }),
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_CONFIRM_SRP_ROUTE,
                            render: () =>
                              a.default.createElement(x.default, { secretRecoveryPhrase: e }),
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_IMPORT_WITH_SRP_ROUTE,
                            render: e =>
                              a.default.createElement(
                                A.default,
                                M({}, e, { submitSecretRecoveryPhrase: t })
                              ),
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_UNLOCK_ROUTE,
                            render: e =>
                              a.default.createElement(r.default, M({}, e, { onSubmit: V })),
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_PRIVACY_SETTINGS_ROUTE,
                            component: T.default,
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_COMPLETION_ROUTE,
                            component: C.default,
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_WELCOME_ROUTE,
                            component: w.default,
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_PIN_EXTENSION_ROUTE,
                            component: S.default,
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_METAMETRICS,
                            component: I.default,
                          }),
                          a.default.createElement(o.Route, {
                            path: i.ONBOARDING_EXPERIMENTAL_AREA,
                            render: e =>
                              a.default.createElement(
                                h.default,
                                M({}, e, { redirectTo: i.ONBOARDING_WELCOME_ROUTE })
                              ),
                          }),
                          a.default.createElement(o.Route, {
                            exact: !0,
                            path: '*',
                            component: v.default,
                          })
                        )
                      ),
                      N === i.ONBOARDING_COMPLETION_ROUTE &&
                        a.default.createElement(
                          p.default,
                          {
                            className: 'onboarding-flow__twitter-button',
                            type: 'link',
                            href: B,
                            onClick: () => {
                              U({
                                category: g.MetaMetricsEventCategory.Onboarding,
                                event: g.MetaMetricsEventName.OnboardingTwitterClick,
                                properties: {
                                  text: D('followUsOnTwitter'),
                                  location: g.MetaMetricsEventName.OnboardingWalletCreationComplete,
                                  url: B,
                                  hd_entropy_index: P,
                                },
                              });
                            },
                            target: '_blank',
                          },
                          a.default.createElement('span', null, D('followUsOnTwitter')),
                          a.default.createElement('i', {
                            className: 'fab fa-twitter onboarding-flow__twitter-button__icon',
                          })
                        )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = O(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('react-redux'),
                  r = N(e('../unlock-page')),
                  i = e('../../helpers/constants/routes'),
                  l = e('../../ducks/metamask/metamask'),
                  c = e('../../store/actions'),
                  u = e('../../selectors'),
                  d = e('../../contexts/metametrics'),
                  p = N(e('../../components/ui/button')),
                  m = N(e('../../components/app/reveal-SRP-modal')),
                  f = e('../../hooks/useI18nContext'),
                  g = e('../../../shared/constants/metametrics'),
                  h = N(e('../../components/app/flask/experimental-area')),
                  y = e('../../components/app/toast-master/utils'),
                  E = e('../../selectors/selectors'),
                  v = N(e('./onboarding-flow-switch/onboarding-flow-switch')),
                  b = N(e('./create-password/create-password')),
                  _ = N(e('./recovery-phrase/review-recovery-phrase')),
                  k = N(e('./secure-your-wallet/secure-your-wallet')),
                  x = N(e('./recovery-phrase/confirm-recovery-phrase')),
                  T = N(e('./privacy-settings/privacy-settings')),
                  C = N(e('./creation-successful/creation-successful')),
                  w = N(e('./welcome/welcome')),
                  A = N(e('./import-srp/import-srp')),
                  S = N(e('./pin-extension/pin-extension')),
                  I = N(e('./metametrics/metametrics'));
                function N(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function O(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (O = function (e) {
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
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    M.apply(null, arguments)
                  );
                }
                const B = 'https://twitter.com/MetaMask';
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/onboarding-flow.js' },
    ],
    [
      7430,
      { '../../../hooks/useI18nContext': 6985, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.default = function () {
                    const e = (0, s.useI18nContext)();
                    return o.default.createElement(
                      'svg',
                      {
                        width: '100%',
                        height: '320',
                        viewBox: '0 0 799 320',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        xmlnsXlink: 'http://www.w3.org/1999/xlink',
                      },
                      o.default.createElement(
                        'g',
                        { filter: 'url(#filter0_d_2133:17259)' },
                        o.default.createElement('rect', {
                          x: '31',
                          y: '71',
                          width: '270',
                          height: '148',
                          rx: '8',
                          fill: 'url(#pattern0)',
                        })
                      ),
                      o.default.createElement('circle', {
                        cx: '54.5',
                        cy: '24.5',
                        r: '24.5',
                        fill: 'url(#paint0_linear_2133:17259)',
                      }),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'white',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'CentraNo1',
                          fontSize: '29',
                          fontWeight: 'bold',
                          letterSpacing: '0em',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '48.9917', y: '35.114' },
                          e('onboardingPinExtensionStep1')
                        )
                      ),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'var(--color-text-default)',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'CentraNo1',
                          fontSize: '18',
                          letterSpacing: '0em',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '95', y: '31.088' },
                          e('onboardingPinExtensionChrome')
                        )
                      ),
                      o.default.createElement('circle', {
                        cx: '522.5',
                        cy: '102.5',
                        r: '24.5',
                        fill: 'url(#paint1_linear_2133:17259)',
                      }),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'white',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'CentraNo1',
                          fontSize: '29',
                          fontWeight: 'bold',
                          letterSpacing: '0em',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '514.131', y: '113.114' },
                          e('onboardingPinExtensionStep2')
                        )
                      ),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'var(--color-text-default)',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'CentraNo1',
                          fontSize: '18',
                          letterSpacing: '0em',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '563', y: '109.088' },
                          e('onboardingPinExtensionLabel')
                        )
                      ),
                      o.default.createElement('path', {
                        d: 'M301 137H373.953C388.865 137 400.953 149.088 400.953 164V190C400.953 204.912 413.042 217 427.953 217H498',
                        stroke: '#037DD6',
                        strokeWidth: '2',
                      }),
                      o.default.createElement(
                        'g',
                        { filter: 'url(#filter1_d_2133:17259)' },
                        o.default.createElement('rect', {
                          x: '498',
                          y: '149',
                          width: '270',
                          height: '136',
                          rx: '8',
                          fill: '#292A2D',
                        })
                      ),
                      o.default.createElement(
                        'g',
                        { filter: 'url(#filter2_d_2133:17259)' },
                        o.default.createElement('ellipse', {
                          cx: '703.613',
                          cy: '266.5',
                          rx: '30.6134',
                          ry: '30.5',
                          fill: 'white',
                        }),
                        o.default.createElement('path', {
                          d: 'M703.613 298C721.069 298 735.227 283.9 735.227 266.5C735.227 249.1 721.069 235 703.613 235C686.157 235 672 249.1 672 266.5C672 283.9 686.157 298 703.613 298Z',
                          stroke: 'white',
                          strokeWidth: '2',
                        })
                      ),
                      o.default.createElement(
                        'mask',
                        {
                          id: 'mask0_2133:17259',
                          style: { maskType: 'alpha' },
                          maskUnits: 'userSpaceOnUse',
                          x: '673',
                          y: '236',
                          width: '62',
                          height: '61',
                        },
                        o.default.createElement('path', {
                          d: 'M703.614 296C719.961 296 733.22 282.796 733.22 266.5C733.22 250.204 719.961 237 703.614 237C687.266 237 674.008 250.204 674.008 266.5C674.008 282.796 687.266 296 703.614 296Z',
                          fill: 'white',
                          stroke: 'white',
                          strokeWidth: '2',
                        })
                      ),
                      o.default.createElement(
                        'g',
                        { mask: 'url(#mask0_2133:17259)' },
                        o.default.createElement('rect', {
                          x: '646.903',
                          y: '221',
                          width: '121.45',
                          height: '106',
                          fill: 'url(#pattern1)',
                        })
                      ),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'white',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'Open Sans',
                          fontSize: '12',
                          fontWeight: '600',
                          letterSpacing: '0px',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '514', y: '180.155' },
                          e('onboardingPinExtensionBillboardTitle')
                        )
                      ),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'white',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'Open Sans',
                          fontSize: '10',
                          fontWeight: 'bold',
                          letterSpacing: '-0.4px',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '514', y: '205.879' },
                          e('onboardingPinExtensionBillboardAccess')
                        )
                      ),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'white',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'Open Sans',
                          fontSize: '9',
                          fontWeight: 'bold',
                          letterSpacing: '0px',
                        },
                        o.default.createElement('tspan', { x: '538', y: '262.991' }, e('appName'))
                      ),
                      o.default.createElement(
                        'text',
                        {
                          fill: 'white',
                          xmlSpace: 'preserve',
                          style: { whiteSpace: 'pre' },
                          fontFamily: 'Open Sans',
                          fontSize: '10',
                          letterSpacing: '-0.3px',
                        },
                        o.default.createElement(
                          'tspan',
                          { x: '514', y: '223.379' },
                          e('onboardingPinExtensionBillboardDescription')
                        ),
                        o.default.createElement(
                          'tspan',
                          { x: '514', y: '238.379' },
                          e('onboardingPinExtensionBillboardDescription2')
                        )
                      ),
                      o.default.createElement('path', {
                        d: 'M744.188 177.988L746.888 175.313C747.038 175.163 747.038 174.888 746.888 174.738L746.263 174.113C746.113 173.962 745.838 173.962 745.688 174.113L743.013 176.813L740.313 174.113C740.163 173.962 739.888 173.962 739.738 174.113L739.113 174.738C738.962 174.888 738.962 175.163 739.113 175.313L741.813 177.988L739.113 180.688C738.962 180.838 738.962 181.113 739.113 181.263L739.738 181.888C739.888 182.038 740.163 182.038 740.313 181.888L743.013 179.188L745.688 181.888C745.838 182.038 746.113 182.038 746.263 181.888L746.888 181.263C747.038 181.113 747.038 180.838 746.888 180.688L744.188 177.988Z',
                        fill: '#BBC0C5',
                      }),
                      o.default.createElement('path', {
                        d: 'M742 257.875C741.367 257.875 740.875 258.391 740.875 259C740.875 259.633 741.367 260.125 742 260.125C742.609 260.125 743.125 259.633 743.125 259C743.125 258.391 742.609 257.875 742 257.875ZM740.875 255.438C740.875 256.07 741.367 256.562 742 256.562C742.609 256.562 743.125 256.07 743.125 255.438C743.125 254.828 742.609 254.312 742 254.312C741.367 254.312 740.875 254.828 740.875 255.438ZM740.875 262.562C740.875 263.195 741.367 263.688 742 263.688C742.609 263.688 743.125 263.195 743.125 262.562C743.125 261.953 742.609 261.438 742 261.438C741.367 261.438 740.875 261.953 740.875 262.562Z',
                        fill: '#BBC0C5',
                      }),
                      o.default.createElement(
                        'g',
                        { transform: 'translate(515, 254)' },
                        o.default.createElement('path', {
                          d: 'M13.0831 12.9841L10.0675 12.0896L7.79333 13.4438L6.20667 13.4431L3.93117 12.0896L0.916901 12.9841L0 9.90084L0.916901 6.47889L0 3.58572L0.916901 0L5.62695 2.80307H8.37305L13.0831 0L14 3.58572L13.0831 6.47889L14 9.90084L13.0831 12.9841Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M0.91748 0L5.62753 2.80504L5.4402 4.73009L0.91748 0Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M3.93188 9.9021L6.00428 11.4746L3.93188 12.0896V9.9021Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M5.83861 7.30235L5.4403 4.73145L2.89072 6.47958L2.8894 6.47892V6.48024L2.89729 8.27967L3.93119 7.30235H3.93185H5.83861Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M13.0831 0L8.37305 2.80504L8.55971 4.73009L13.0831 0Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M10.0687 9.9021L7.99634 11.4746L10.0687 12.0896V9.9021Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M11.1104 6.48024H11.1111H11.1104V6.47892L11.1098 6.47958L8.56018 4.73145L8.16187 7.30235H10.0686L11.1032 8.27967L11.1104 6.48024Z',
                          fill: '#FF5C16',
                        }),
                        o.default.createElement('path', {
                          d: 'M3.93117 12.0896L0.916901 12.984L0 9.9021H3.93117V12.0896Z',
                          fill: '#E34807',
                        }),
                        o.default.createElement('path', {
                          d: 'M5.83797 7.30176L6.41374 11.0184L5.61581 8.9519L2.896 8.27974L3.93055 7.30176H5.83731H5.83797Z',
                          fill: '#E34807',
                        }),
                        o.default.createElement('path', {
                          d: 'M10.0688 12.0896L13.0831 12.984L14 9.9021H10.0688V12.0896Z',
                          fill: '#E34807',
                        }),
                        o.default.createElement('path', {
                          d: 'M8.16196 7.30176L7.58618 11.0184L8.38412 8.9519L11.1039 8.27974L10.0687 7.30176H8.16196Z',
                          fill: '#E34807',
                        }),
                        o.default.createElement('path', {
                          d: 'M0 9.90071L0.916901 6.47876H2.88873L2.89596 8.27885L5.61578 8.95101L6.41371 11.0175L6.00357 11.4726L3.93117 9.90005H0V9.90071Z',
                          fill: '#FF8D5D',
                        }),
                        o.default.createElement('path', {
                          d: 'M13.9999 9.90071L13.083 6.47876H11.1112L11.1039 8.27885L8.38412 8.95101L7.58618 11.0175L7.99632 11.4726L10.0687 9.90005H13.9999V9.90071Z',
                          fill: '#FF8D5D',
                        }),
                        o.default.createElement('path', {
                          d: 'M8.3732 2.80298H7.00015H5.6271L5.44043 4.72803L6.41386 11.0155H7.58644L8.56052 4.72803L8.3732 2.80298Z',
                          fill: '#FF8D5D',
                        }),
                        o.default.createElement('path', {
                          d: 'M0.916901 0L0 3.58572L0.916901 6.47889H2.88873L5.43962 4.73009L0.916901 0Z',
                          fill: '#661800',
                        }),
                        o.default.createElement('path', {
                          d: 'M5.26805 8.04827H4.37481L3.88843 8.52312L5.61641 8.94996L5.26805 8.04761V8.04827Z',
                          fill: '#661800',
                        }),
                        o.default.createElement('path', {
                          d: 'M13.083 0L13.9999 3.58572L13.083 6.47889H11.1112L8.5603 4.73009L13.083 0Z',
                          fill: '#661800',
                        }),
                        o.default.createElement('path', {
                          d: 'M8.73329 8.04827H9.62784L10.1142 8.52377L8.38428 8.95127L8.73329 8.04761V8.04827Z',
                          fill: '#661800',
                        }),
                        o.default.createElement('path', {
                          d: 'M7.7927 12.2174L7.99645 11.4742L7.58631 11.019H6.41307L6.00293 11.4742L6.20669 12.2174',
                          fill: '#661800',
                        }),
                        o.default.createElement('path', {
                          d: 'M7.7928 12.2173V13.4445H6.20679V12.2173H7.7928Z',
                          fill: '#C0C4CD',
                        }),
                        o.default.createElement('path', {
                          d: 'M3.93188 12.0883L6.20803 13.4438V12.2166L6.00428 11.4734L3.93188 12.0883Z',
                          fill: '#E7EBF6',
                        }),
                        o.default.createElement('path', {
                          d: 'M10.0689 12.0883L7.79272 13.4438V12.2166L7.99648 11.4734L10.0689 12.0883Z',
                          fill: '#E7EBF6',
                        })
                      ),
                      o.default.createElement(
                        'defs',
                        null,
                        o.default.createElement(
                          'filter',
                          {
                            id: 'filter0_d_2133:17259',
                            x: '0',
                            y: '44',
                            width: '332',
                            height: '210',
                            filterUnits: 'userSpaceOnUse',
                            colorInterpolationFilters: 'sRGB',
                          },
                          o.default.createElement('feFlood', {
                            floodOpacity: '0',
                            result: 'BackgroundImageFix',
                          }),
                          o.default.createElement('feColorMatrix', {
                            in: 'SourceAlpha',
                            type: 'matrix',
                            values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0',
                            result: 'hardAlpha',
                          }),
                          o.default.createElement('feMorphology', {
                            radius: '6',
                            operator: 'dilate',
                            in: 'SourceAlpha',
                            result: 'effect1_dropShadow_2133:17259',
                          }),
                          o.default.createElement('feOffset', { dy: '4' }),
                          o.default.createElement('feGaussianBlur', { stdDeviation: '12.5' }),
                          o.default.createElement('feColorMatrix', {
                            type: 'matrix',
                            values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0',
                          }),
                          o.default.createElement('feBlend', {
                            mode: 'normal',
                            in2: 'BackgroundImageFix',
                            result: 'effect1_dropShadow_2133:17259',
                          }),
                          o.default.createElement('feBlend', {
                            mode: 'normal',
                            in: 'SourceGraphic',
                            in2: 'effect1_dropShadow_2133:17259',
                            result: 'shape',
                          })
                        ),
                        o.default.createElement(
                          'pattern',
                          {
                            id: 'pattern0',
                            patternContentUnits: 'objectBoundingBox',
                            width: '1',
                            height: '1',
                          },
                          o.default.createElement('use', {
                            xlinkHref: '#image0_2133:17259',
                            transform: 'translate(0 -0.0770822) scale(0.00170068 0.00310259)',
                          })
                        ),
                        o.default.createElement(
                          'filter',
                          {
                            id: 'filter1_d_2133:17259',
                            x: '467',
                            y: '122',
                            width: '332',
                            height: '198',
                            filterUnits: 'userSpaceOnUse',
                            colorInterpolationFilters: 'sRGB',
                          },
                          o.default.createElement('feFlood', {
                            floodOpacity: '0',
                            result: 'BackgroundImageFix',
                          }),
                          o.default.createElement('feColorMatrix', {
                            in: 'SourceAlpha',
                            type: 'matrix',
                            values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0',
                            result: 'hardAlpha',
                          }),
                          o.default.createElement('feMorphology', {
                            radius: '6',
                            operator: 'dilate',
                            in: 'SourceAlpha',
                            result: 'effect1_dropShadow_2133:17259',
                          }),
                          o.default.createElement('feOffset', { dy: '4' }),
                          o.default.createElement('feGaussianBlur', { stdDeviation: '12.5' }),
                          o.default.createElement('feColorMatrix', {
                            type: 'matrix',
                            values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0',
                          }),
                          o.default.createElement('feBlend', {
                            mode: 'normal',
                            in2: 'BackgroundImageFix',
                            result: 'effect1_dropShadow_2133:17259',
                          }),
                          o.default.createElement('feBlend', {
                            mode: 'normal',
                            in: 'SourceGraphic',
                            in2: 'effect1_dropShadow_2133:17259',
                            result: 'shape',
                          })
                        ),
                        o.default.createElement(
                          'filter',
                          {
                            id: 'filter2_d_2133:17259',
                            x: '666',
                            y: '229',
                            width: '75.2266',
                            height: '75',
                            filterUnits: 'userSpaceOnUse',
                            colorInterpolationFilters: 'sRGB',
                          },
                          o.default.createElement('feFlood', {
                            floodOpacity: '0',
                            result: 'BackgroundImageFix',
                          }),
                          o.default.createElement('feColorMatrix', {
                            in: 'SourceAlpha',
                            type: 'matrix',
                            values: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0',
                            result: 'hardAlpha',
                          }),
                          o.default.createElement('feOffset', null),
                          o.default.createElement('feGaussianBlur', { stdDeviation: '2.5' }),
                          o.default.createElement('feColorMatrix', {
                            type: 'matrix',
                            values:
                              '0 0 0 0 0.916667 0 0 0 0 0.916667 0 0 0 0 0.916667 0 0 0 0.26 0',
                          }),
                          o.default.createElement('feBlend', {
                            mode: 'normal',
                            in2: 'BackgroundImageFix',
                            result: 'effect1_dropShadow_2133:17259',
                          }),
                          o.default.createElement('feBlend', {
                            mode: 'normal',
                            in: 'SourceGraphic',
                            in2: 'effect1_dropShadow_2133:17259',
                            result: 'shape',
                          })
                        ),
                        o.default.createElement(
                          'pattern',
                          {
                            id: 'pattern1',
                            patternContentUnits: 'objectBoundingBox',
                            width: '1',
                            height: '1',
                          },
                          o.default.createElement('use', {
                            xlinkHref: '#image1_2133:17259',
                            transform: 'translate(0 -0.000404155) scale(0.00301205 0.00345106)',
                          })
                        ),
                        o.default.createElement(
                          'linearGradient',
                          {
                            id: 'paint0_linear_2133:17259',
                            x1: '30',
                            y1: '20.1898',
                            x2: '79.0003',
                            y2: '20.3',
                            gradientUnits: 'userSpaceOnUse',
                          },
                          o.default.createElement('stop', { stopColor: '#FF5C16' }),
                          o.default.createElement('stop', { offset: '1', stopColor: '#FF5C16' })
                        ),
                        o.default.createElement(
                          'linearGradient',
                          {
                            id: 'paint1_linear_2133:17259',
                            x1: '498',
                            y1: '98.1898',
                            x2: '547',
                            y2: '98.3',
                            gradientUnits: 'userSpaceOnUse',
                          },
                          o.default.createElement('stop', { stopColor: '#FF5C16' }),
                          o.default.createElement('stop', { offset: '1', stopColor: '#FF5C16' })
                        ),
                        o.default.createElement('image', {
                          id: 'image0_2133:17259',
                          width: '588',
                          height: '372',
                          xlinkHref:
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkwAAAF0CAIAAABex/HJAAAy0ElEQVR42u2d2XNr13Wn80+0Hzo9vOShHztVXanqqn5MP6Uf0i+pdpK224ktW4NtWVIsy5auJtuRLMuW5Cmx40mWZSvyJNuSrCGWJ11dEgMHzAAJEASJeZ4BDrfXwSY3Nw84gCBAgMT3q1+prnjvxQUPDvd31tprrf1HN//2XRhjjPGV9B9xCTDGGAM5jDHGGMhhjDHGQA5jjDEGchhjjDGQwxhjjIEcxhhjIIcxxhgDOYwxxhjIYYwxxkAOY4wxBnIYY4wxkMMYYwzkMMYYYyCHMcYYAzmMMcYYyGGMMcZADmOMMQZyGGOMgRzGGGMM5DDGGGMghzHGGAM5jDHGGMhhjDHGQA5jjDEGchhjjIEcxhhjDOQwxhhjIIcxxhgDOYwxxhjIYYwxxkAOY4wxkMMYY4yBHMYYYwzkMMYYYyCHMcYYAzmMMcYYyGGMMQZyGGOMMZDDGGOMgRzGGGMM5DDGGGMghzHGGAM5jDHGGMhhjDEGchhjjDGQwxhjjIEcxhhjDOQwxhhjIIcxxhgDOYwxxkAOY4yH8+75zAXEQA5jPHUw2/kbu7fP4v6/DvwwkMMYT4Zq/STb2nf3rw/c+et/N4jNv6Jfp59/MA8DOYzxGKlm8szEWPvdllv7bu678X8Gsv7z+hXUC5oINMkH8zCQwxifl202sJlI0zCzKPV//7h55581H/nL1pc+1H72WuelL3V//f0tx6vb/uvba96dzNpuJbfbrN7sdm7u7twUyX+7HfmKfF1+V/6M/En58/K35O/KK8jryKvJa8orKwRq8mnsHQc8Pj4M5DDGZwPbIaq99z837/tzi2cvfq77uxe3Q46tYqba3sk3tuud3fbW7s1zS16n3Nqpd3bkleX15V+Rf8si331/bv3rh5kH8DCQwxifgjfNNhvYVKzWvOd/tJ75YOdnT2+5X29nEoXmdqm10xoFzwaX/Iu1zo786/Ie5J3I+5F3peM8G/BM2vERAzmMMWw7xDYLHnf999ZXbuu8+g2JpYrVVqm1fXOaVO/u1hpteW/yDuV9yruV9wztMJDDGLbt4c3GNito+5t/33r0f7df+MethTdLxXKxOQzYtra2Op1uq9Wu1RviUrmqnMuXTOuvV6p1+WPy58Xyd4cDXqVUlvcs71zev3wXzaNoRxoTyGGMZyh0O4jb/vaPm5/9q87Pnu4GHena1oB5yJ2dXYGZwphAazOVS2xmYvHk+R1PpOXVMtlioVgRBAr85N8aPKvZDTnle5HvSL4vHdsR2AE5jPEVx5sO3XROsvXgX3Re/FzLPydB26lsE9IIb4Q6grRR8exM5Eul8wLURrO1tXV6iFnt7LT9c9Z39+Bf6Exmf2DH7QHkMMZXBG8Hack7/rT9jbu35l9OFuons02BTSIqAcwFU+1kC2WFtRJHngq8Sq0p36l8v/JdN/sCO1AH5DDGVwFvqlSy9eD/6rz0TCkaSlVP2v3qdLoSsU0b2E4GnsD4hO+o1tmprYXle5croAoyQR2QwxhfbrypohIrM/nud7WefG/3Nz9MZUvN40M3FbRdfCpyhCnNTLYo4d0Je3iVckWug1wN65rsF6eAOiCHMb6U0Vvjvf+p9eVbu/Mv5xvbJ7CtVK4KIS4p2460xHaNZuu4b7nR3ZVrIlfGuj5EdUAOY3wp8fbVO5quNzK1reP22y5RTvI8mczj9u3q3d2W6w25SqAOyGGMp5dwdry9+13WQBDHr9LH4E2lJa9Y6HayheW1euO4KWItx6/kiukEpok6bjAghzGecACnGwOskorH/7rzhx9n69vH4e1qh26nBnbHFWQ2urty3eTqNY1mA0I6IIcxnorqEuuomk/+z86r34inS0eXF9Ybs4y3AXOYzVpNrqFcySY1KUAOYzzxAG6vN+CW/9J+7qHMaqTZ3T0Sb5e3YHLcxSlHoq64tiLXU66qzl7COSCHMb7oAG4vP/nkeyvzb1TaO0ek4Jot8HaqC8XKkairO9+Ua6uzl4R0QA5jfLEB3J1/1nnpS7Fkkb238ycwS+XqEU8J1apcYbnOhHRADmN8ESWUBwHc0x/ILlzv7+yWoAS8nacspR91Zc8Nudr9IR23JZDDGI84RWkFcLf/185Pn1pJlvr73q5eT/fFO5Mt9mcv67W6XHO58i1Sl0AOYzymFKUVwH32rwpzb/QfYdpqtdl+G6GPzF5WHW/K9W+SugRyGOORpygb735X+zuf3Fhb7w/gCsUKWBpH9rI/pGtmNuVTsD4LUpdADmM8EsJZKcqP/Lf2q1/frGwRwE08pLNOqnv16/KJtOAckMMYn7+KsvXIX2ZvvFFobhPATU9IV3a8KZ8LVZdADmN8vk24L98aDwT6SygJ4C7YlWrdzrlYWD4dtuiAHMb4zIRTfQLtZ69F1nP2E9EqdUooJzUhxXZSXb1Uks9IdRfAOSCHMT6FcAedcH/3J52fPpWrd0lRTnnqsr21Y3UX/N2f6FIUOAfkMMYnEu6OP62+9qytT0DW1s1UDsxMw/njtp5xCe7qr39PPjU4N12Qi61tnuYNfIkdw1PqaDQhXl1dX1mJr6yshUJRfyDi9QQWFzxO54L8N5vNb20dKqTsdLpswk151WW5XFlYWJ6fcy0uepY9fn8gLJ9sOByTT1k+a7F86IPeJL0fYU8o8fprf/j9Ew9sveePIRaQw3Du0lgtebL2RSJ2wi0veXO5ws7OoWnLtVqDTbjpnOxs26KrVqtLS16Hw72wIJwL+PzhYGg1srLHuejqunrEGYRwNr/jif/661+BW0AOA7lpj+FshAv0CLe06HXMuz0ev0QDNsJJxABOptabqZxti65Wq8uTytycs8c5v+KcjudUEH8K5078oX7rn56BXkAOA7mpTlQeEC64oggnMZzXK4Qr2zJgEO4ylqLUGw2Pxzc/715c9PbylhErnjM4N0QkZ7Pr2gdgGJDDcG4KCbcXxgnhZOE7HMPZCZfLl0DI5eWcxHM9zll5yz3ORdZO59zAP9pvOlbAGJDDoGVKnNgvNokrwlkxnC+kCLe87INwV5JzS0ue/XguEAhGQoNw7iw/3dc9cUh2TsjBOSCHR5OiVFlKHcP5/GEhnMu1uLjgyeXytmY4WgUuaWtBp7N1eH+utrCw7HAsCOe83qA82djiuSNQtwbngBwGcpeQcCpLGQ7HgsEVIdyyx+9yLi64l7LZnFlpAuGuGOfK5Yp80MK5pSWfp8c5uQcU56JHcm4NzgE5DOcuG+GsMC6yJkubiuE83oDbveR0LKTSGVs/XCZbBBWXnXO2vGWxVHY4XE6nxTmvL6iKLeVmWI3Go7HDnBv2Z/z1198GaUAOyOFJ9gwowvkDEc+yf8FttQxvbKRshGMf7qruz+Vy+RvvOFyuxeVlv9cXknhON88dylue48fc+dAHoRqQA3J4MmNNDmK4HuHkuX5tbX17+9A6yFDKq825jY3k3JzT7V4Wzvn8oWBoRW/OrfaaxM8JueVQAqoBOTiHL45werKJ2RK3uOBxzLvDoZVWq00/3JXnnDkPZWdnJ7oam5tzqWEo/U0F1j1zvh9zkpbDQQ7OATk81Fbc3mjK/TDOG1xe8jmdCz5foFqr247OAQlXdR6K+UF3u12/Pzg/bw398vpCwjldhDISzkXXNjrv+Y+wDcgBOXyRicqYSlQue/xup9UwUCodaomTkA4YXO0j6MyPu9FouN1LvWJLr9e3V2y5srp2aOLXOX7Sf//kg7ANyME5fBHFJjqG08Umc3POZCptNgxwwPcMnldQLJbeuT7vdi0tL/skngv2cY6dOSCHgdwl6PsWwsnidbAV53DFYnGz2GRnZxfCzYgbzZatCOXGOw5VhBIIHtqci62dN2PZfc9/AG9ADs7h8dabGInKvdldAX+ofvikTVriZrZ5bmtrKxxamZ+3Tp7zeIO9zbmo2sE9f9KSjCWQA3J47MNNVEWlnmzidi0VD2/FUU4548WWzWbT5Vp0OhZ6Scv9zblRVKC89uJPwNtZIQfngBw+W71JKLQaDFmJSuuo6HnXxkbS3IprtdqB8CqeNaczeXuH+A2ny9qcs44R18ernnNbjilfQA7O4XGdM9AjnBrfteLzBlWiMhQId7tdM1UVXUuEIqt4Bl2tHnSP7O7urlqdc055EvJ4rc65cCRqP1t1qG058AbkgBwe+3CTvRHMC0uVyqHiulKplESzqnQ6bRYftdttPb7ZqrQMjSBpCeSAHJzDY4ScqqiUB3OrZ+CGc3MzeeiMsXqdhX7Glc8fSlrm80UjaRkJhaN7s5uBHJDDQG4aG+Osk3T2KyoDoY6RqJRHeHmQZ5VH8qxjJi1XeklLVWlpbw+PJYDcxUAOzgE5fOQ5zocqKnut39YUZrdryeVaLBZLh5/Z86zvqD9p2Wy2HPMup3Nxef8snoNZX0AOyGE4NzWH6VgHonq8Vuv3/Jwrvr5hnqTTaDRY3NFxSctMJnvjhtOa3dxLWqq2ub0DCs7YHg7kgByGTGM8Ls6qN7GODfMJ1cxEZSaTYWVHxyUt5Q7xePwOh7s30/JwBUoMyAE5DOcmV2/SG1SxN8Fr70DUeVcymaKiEp2atNzd3TVukvKNG71ZX56DChSrbS52tp05IDc05OAckMMnDWK22gaWfI55t98XMGc4tVotFnR0pOTpx3wYWo3GerO+vLoCxaq0PGMwB+SAHIZzI6g30WeiruwPYpaFaWFh+cY7jkKhdHi7hUQlOladTsfYuG1evz5vVaDodoJe0lJBbkDUATkgh4HcSMO4cCykwrhln8PhDgUjZhhHvQk6UwXK2tp6r51ABXMRNehLBXNADshhOHdx7oVxB+fpqLaB+TmX2TZAvQkaRGaNUrPZnLvh7AVzPn8gvNcb3ssZALkLgBycA3J4P5IzduO8vtDSklfCOHnwNtsGqtUqKzg6VfIkZFagxNcT+wMt1Sk8MX3U3CCcA3JADsO50eQqzTBOnTZg7sZJGMfyjQaUPA/pO6fT6cxZg76sYM7nD4d6veG9ASjrQA7IYSB3oYfGWacN+EOqqDIUiphhHG0DaOh2gnjc2plbsnbmAoHgXjAXjQ20MwfkgByGc6MM47wSxrmWbEWVhHHoPMFcs1dmaQVzHr/fHw7vT23uJS2J5MYLOTgH5CDcuhHG7RVVBgIhwjg0wmAuGlvTZZYHA1CipwdzQA7IYTh3znTlXsmJLqqcu+HM54uEcWiEwVy93nznHUffETzrpCuBHAZyYz83TpabUCiqRpy4HAsej98M4yqVCus1Gi6YM3vmIiurjnm3BHPe3gCUAad8ATkgh+HceRvA93bjfKHFBY9jzpVKpRlxgkYis2euXK7cuOF0uw96CXQwdwLngNz5IQfn4Nws94AfjGNe9gRcrkW3e7FWqzPiBI1E5gCU7e1tt3vJ4XDv9RIYI5uJ5IAcBnIjjuHUlBPj+O/eOOY5VzQWJ4xDI5Q5zTKTyZlTvvYODT9xZw7IATkM54Zvj9ufcnIwjtksOWm326zR6JwqFovmERb7I5t9VsYyEj11Ww7IATkM5IYuOdkbVmmFcR6/07HgWfaZJSf1eiOXy6cJ5tDoegkikdV5VX7iC5rnEhzHOSA3EsjBOTg3o+1xK1Zd5arPbw2rnJ9zbW4eHI66s7NbrTWUy5VaoVgidYmGk3loeKFQmptzut1LHm9Aj7K0CAfkgByGc6PtHNivq4wsewKy6MjSY5acdLtbGnLalWpdFil5NmfhRsOVn2xtbTnmXTpjaTbMHRnMATkgh4Hc8M0De+1xvVyl1xvodrsHucpGsx9y2sViGdSh4cpPVlatE8OXlnrTT4Ir6pA5NcoSyI0PcnAOzs1WJGcerLO44JmfcyWT6SNzlaehjhwmOl3m9JNarX7jhqN3+E5ABXNqxBfpSiCHgdyIIafa4xZc9lxl56hc5XHO5wupVIp1HJ1cfmJmLOfn905S9R3MayaSA3IYzo12lFc46g9Y7XFWrtLj73a3BsxV9rtcqRLSobNkLFetjKVVYxkKqhPmjtmWA3IjhBycg3Mz4IMwLha06irDapTXxjF1lWeyhHQs5WiQjGWpVN4/LjwQCFqHElgn7xwVzAE5IIeB3BkjOWNepccbdLuW3rk+L6HYcLlKm0vlCqlLdKQymYyZsbx+fa53XLh/r5FgFcgBOQznRnpEqiwuy56A07Gw4F7qtA9SSY1ma2jI9ThXpfASHant7W19mwWD4fl5PcdyNbJiZSz7OQfkDiC3El2fDscxHotXR+NIJNbbjYt4vIHFRc/cnHNlJaqXnt3d3fMQbr+drsYWHeqX2RWeSmXm5no1lh6/cC4YXg2vxAR1tts+Eo2Dtz3I+UORszkYxnim7AuExF5fwOP1Ly55nK6FG3Pzv/3t71OHK9/OD7l9zhHPoUMyu8Krtdpbv/nd9XfmHE73wuLysse37PN7/UH7TRsMg7f9SG41OntexXhQr1j/DUdWQuFIIBj0+fxLS8tOh/P629crRkVAq9UZCeSI59DJjQQ7OztvX5enLOfi0rLX5wsEQ8FwOByJRA7ft/K/4G0PcsnNTYxxcnPjSG9uJMQbifX1+Fp8Lba6EgkG/MtWEbd38EEnZ+ZchXgOHdtIEA6HFtzugN+3EgmvxWLr8fhGQu5SuVc39P0sAm9ADuPTUWdCbi0WlWVFILe0uCC/Pn/zwGn1lleKc+vrCafL9fOf//Lll1+ddzjh1tDbcpl0esHt8vu84VAwFo0K5OT2FM6ZdzKQA3IYD4o6gVxiPS6Qi0VXI+GQLC6yxGQPF3aPHHLiQrF0ZdZon9//qQce/n9//0Hl973/Q88+9zzoGm5bToDncjp9Xo9ALrq6Kk9fQA7IYTwk6lQkJ5ATxgnkZFmRxcXtcpktuq12ZxyQE+dy+SuwQK+uRj92972acNo/+dnPodcQ23LyUOV0OJaXFoMB/+rKityYQA7IYTykbRtyoWDA61lecLtbrdaoOuROLEKpX4HNue9893v9hBPf9Q+fkAsMwM7aLbe7uyuEW1pc0NtyCnLsyQE5jIeHnJWs7FWdeJaXfD6f2Z87JsLtbc6VKpd6aQ6GQn9/y21HQk7sdLqg14BqNBr6lovH44sLe7UnelsOyAE5jM9sIZyt6kQWl3h8zSzpHivkxNls7vIuzT984cXjCCd+4cUfQ68BValU9F2Xy2bdroPaE70tpzkH5IAcxoNGcqrqxIrjelUnArn0GNrAT05aJpOXdbLltYc/fQLknnrmK9BriNqTaqXicjq9nmVVe6ILLIEckMP4zJGcqjoRyMmCIpCTJ+hSqXQBVSeHTyooXsZ1OZFI3HLrh0+A3AMPPgK9hqg9abfbCnKhYEAgp7rlhHOkK4EcxmfekNP9A6rqRBYXc3ek2WpfAOQkmLuMxxT4/IETCGfVntzzCeg1uHZ3d3WS3O1yLi8tBvw+VWBp25YDckAO44EshEsoxO1XnUgkZ46fGO2sk5PaCfKXr53g1V+9fjLk3v/B21dXo9BrQG1tHZzQK7eigpxt7gmQs0OuUChijI90Pl/I5/KZTCaVTMkKEovFgsFgIBC4sNLKw8eI16YkmItGY6+9/vqvXjvFP/rxT+/46N0nQ66XsXz0ly+/cuqr/fqtt+T6U2Cpb7xYNHpCgSWQO4Cc/WepWscYK1cqtXK5WiyWc7l8KpVOJDYk7FhbWxvrQK8TyyyzE19n4/H4vffdfyq6xuF/fPzJGYecOYJAnroW3G6/zxsJh3SBJZAbAHJwDmODcD3IlQRy6XR6fT0RiayY+//b2zsXCbniFPTM+fz+iRBOfMdH75pxyJkVTyd3EQA5IIfx6ZATl0oVBTmJ5OLxdYGcWcnd7W5dJOSqVvlJGsjRRSCqlMsCOZ/XEwoGTMgRyQE5jM8QyfUgV85mcz3IxSORSLlcPqjk7nQvFHLWNMsckJtZZYyx4I1G44QxzUDuRMjBOYxVJNeDXKFQ6kEutbYWD4VClWrtgpvkDh1NUCgCOVrljmyVY08OyGE8TCQnkMtksslkD3LBUK1Wv+AmOVuNJZCjVU61yjkdDs/ykjqLgD05IIfxuSAnz8e9SC7caDQ15F565Y1vPvuvQ/jFn71SkX9lKM6lJnouAZCbrMyzCNwul4acrVUOyJ0GOTiHgdxhyG1sbEajsUAg2DY6wb/41W/edvcDZ/WX/vm76xupSzqvGchNST+4QG5xccE8VU4gJ4RT23JADshhPGiTXG9PLi+Qi8XW/P5Au93WkFvfTMUTyVO9tr75zWdfELzdfs+1t35/o1Asn2uO5US35YDcZKWn7ViQW3DvDz2J2E6VA3IDQA7OYSDXi+Ty+WImk1GRnECu2+1qyNXqp8/02khlv/AVK+B76B+fCq3ERtAtVywDOSAn8no8+0enRnS6kkgOyGE8OOQqe5BLZ1QkFwyGzPmBpwLJveT71KOf/8i9D331m8+VK7UR1Z5UgdzMypzs5fN6gRyQw3gUkVz6IJIbEHLpbP75F39++z3X7n3o8evz7qHLTI45Xg7IAblDkFP94KQrzwg5OIdnG3KqE7yXrsxuJDZ6kPMPArlofOPxp/7ptrsfeOTxZ2JriZE3EkxwkY3GYu97/4cmArm/v+W2DVnBgdwx6UpzfCWQA3IYn6HwRFVXxgaL5F554zf3PviYxHAvv/ZWLl8cR7fcZI8jeOXV1+6/9vCtd9x58Zx7/Ikn//D22z6fP5FIADn25EYBOTiHZx5ye5HcfgvBCZDLlypf/84PJIATyHkDkfG1hKfT6YmvthJULS4u/ejHP3nokU9fPO0+fOfdjz/xhd/9/g+kK3W60jxtB8gBOYzPmK7c25M7Nl3pD6088JkvCOGe/qdvJ9PZsc49mQbImXI4nPc/+MhEcpiPfOaxYDAE5BTk1J6cZSAH5DA+UySX2O+T64dcoVj+2S9f/9h9j9x9/2defuOtEdaYXBbIiWRV/d5zz0+Ec3f/w33hcGTG05Vm4QmQOyPk4Bxm4slButIOucRm+qmvfUu1wa3G4hczwXJKjgjv59xDj352Ipz7/vM/BHKM9QJyGA+ZrtyfeGIvPKnVm//87eeFcP/y7AvjTlFOSQvByfrFL1+ZCOQ+8akHZ6Tw0mwGPy5dCeTODjk4hxnQvGmlKyWSaxljvQRyb/72bYHcb9+ev7CDCKYZcsvL3olA7tY77pRHkJmC3O7urmd5ub+6EsgBOYzP3AyuZ1cGgyETcvVGM7IaF8h95V++d2GQK5UrU7sEu1zuiUDuwx+9e9YiOYGcEM6zvCSQ4xQCIIfxefrkivo8OYFcvX6wKdJotuSn49HPPfORex8+59jlM5ybOtHZlSfrO88+NxHIfevb352RPTl91M7Ozo7b5fJ6lm1H7XBo6rCQg3N49mxATp8MHjYh12pZJ4P/7OU3JJi7Pu++GMjl8oXpXH99fv9H7/r4BKorP35fOByeEcjpQ1OFdrZDU9VRO0RyQA7jM+/JZbN5ieTi8Xg4HKlUKjbIxRNJgdyzP/zpxUAuk81O4eLrcDg/dve9F0+4T93/kMfjmZ0+OePea7mcTonkQsGAeTI4kdw5IAfn8KxCLpcrpNOZeHw9Eo4Ui0W90LQ7XfWj8dgXv3bfI0/k8qULqDqZqv4BAf+//fqthyfROSBMfe31N2Q1nx3CZTKZg/3gel0g5/N6wqGQKq1kTw7IYXzmdKXKWArkUqn0+npCIrlsNqcXmm53S/1o/OLVf5NgbmHJN27ITfacHQ221157/bnv/+Bzn//iLbd++CLB9r73f+jaQ49++7vfuzE3n5w95fN5fe9VKhWBnN/nlUhOdYJzaOooIAfn8GxDbnV1NZFI6IVma2sPcomNlEDuu8//eOxVJxM9Ftwi3Pr6/dcenkh1iRDuF798JTnDMrMI2Uxmwe0WyEkkF11dNY8gAHJADuOzFFgWSvm8la7c2NhcWVmNRqN6odnZ2dU/Gp998qv3PfzEuGssJY6ceHXJpM6Tu/0jH0vOtsz9YAnaFOQi4bBtcCWQOx/k4ByeGcLtdxGU9sZX9o6UCwSCOzs7uldJ/1w8/6NfWBnLZf8YN+QqtYlvyHFo6gRVr9c15ELB4HFHEAA5IIfxEDOac0eetlOrN9XPhccfvv2ea9/47gvj7JArTUOfAJCbhk5wNbgyGPD3jzsBckAO4wG8H8ntT/bK9frBraEnjUZTQ67Zaqufi2Kpcu2zX7j3ocfH2DyQyVx2yH3gQ3d84IN3ALlzdoLLL9wul2d5KRQKasgRyY0OcnAOz4r7IWdvlfvt2/P+0Mp+xvLnt939QHhl7arWVZ4Hcp997Im5XkmkrL835uY/89jjQO5MSqfT+q7rtNsup1NBTo07MUsrgRyQw/hsZxGoVjlVYBmJrOSMLoJ35t0Ctn/96Svlat0XjNx+z7UfvfTqlSw5OQ/kvvEv37I1tG1sbDz5xaeB3HD9A9Ve/4DP6xHIqf4Bc6YXkBsF5OAcnqV+cNVFoPrBV1ZW1+MHXQSValUdCP7Fr35rbX3zocee+tSjnx9DGFebkqV2CMjdcuuHI5EjDjVd9niB3HCllalkcsHtFsip0kpb/wCQA3IYD1N7IpBLJKzak3AorJeb3d3dfLH8/Rdfkhjuk4888dBjTwvwQqux0UJOnuIvL+S+/NV/Pu7VPvGpa0BuiNLKlUjkyJPkSFeOFHJwDs/SmGZbgaV5dmW9YRVYXp933/vgY0I48Qs/+eVod+OmZ5TXEJD77e9+d9yrPfvc94HcWUsrd3Z2PL2j5I48SQ7IATmMzww5daqcQE4WEFV7UqvVbGOaxWvrm5//0jcEcvd/+gtXdSJzMBg6E+Hef8tt0eOPM33rrd8M/lJ33vXxWYacOWen//wBIDceyME5PGO1J9ZZBD3IZbPZ/gmWyi+98ubt91zzBMJXY45Xv57/wQ9v/8hdt3/4Y6f6zrs//tIvXj751b70la8N8lIfvevjP/jhv1J1YladmAO9gByQw/hckCvunUVgzT3pDfeKHTncS9kfWnnzN2+P4syBWjqdnsI1Nx6Px9bWTvX6+vqoXm3Al5qFqhNh2OLCwUAvIDdmyME5PEO1J4VMJqeGe/n9AT3cy5x7Muq2gXwSocOzToKBwNLigkDOVnWiCQfkgBzGZx5iqWtPNpPJ/bknjf5tuZFWVBZY3JGSeSC4mnWiNuTMqhMiubFBDs7h2eiWU3NPUql0PL4eDkcEQsdty53fxVKFlR31b8jVajXbhhyR3CmQkx/UIZ3LYzwLzomzuUwma9XxbybX19flCdrvtwbjmt1yIyRcqVwVlLK4I6VqtXqwIZdMnrohB+QOQc68LhjjIy0riKwj67KixKKrK5FgwO9ZXnI6HOZxBKpbbiTDTVJpCIeO3pDzeb26Dfy4XCWQA3IYDw85oVw4FPR5PW6Xq1g4yFi2O92RnBiXhnDIUCaTMbLiXT2XWSCncpW2gV5ADshhPAzkxLKaxOXhOboaCYfkUXpxwR0zTgnf3t6+SpNN0JSoVCrpe0weqtRp4Hous8pVHnHHAjkgh/FZIzmxQE6CuZVIWCC3vLQonNNHfJ2zkaBUrkA4dHKuMhIOq+YBtSGnwzgiOSCH8QgiOXNbTmUsXS6XOTa31e4M1fFdLxRLEA6dnKvc2toSwlnNA8HAyRtyQA7IYTxkMKcylopyKmMpXzxPxlIIl83lWM3RqbnKcqmkjtcJhYK2aV5ADshhPDLIqWBOKKdqLM+TsSyVK5SZoMFzlYsLe7lKCeP0GXL9hANyQA7j4WtPBHISzEksFwoGvJ5ll9NZN04kGLDGslypTclJ3+iy5Crlgao/V6nuTCAH5DAeccYyFl0Nh4LyWC2RXHR1dfCu8Eq1ls8X2IFDp8ocylzo1VWqQSe2ukogB+QwHiXnesHc3sacqrG0dYU3mq3jordCocgoEzSgdBpc11UGAn41lPnkXCWQA3IYjyCYUxlLCebcLpd5vJwAz1ZaUipXsrkc0RsaXOa8ykajoeZVhkJBPZQZyAE5jMfVSKAzlqphrjdmya/nxKvyE8W2fL5AaQkaQs1mU4dx8nCkesBPnlepHY9vrMU3wBuQw/g8NZZ7GcuD8hOjYU4evWEbGknJyfb2tjxFLS8tmiUnJ4dxQrjoGpDbh9w2utra2sIj9Fa3q9xutZqNRq1aLRWL2UxGyGdmLHd2doAcOn8YZ2UFqlVBWiadLhYK1UpF7jq597qdjtyEx/3QJzZSQO4AcjcRmqx2dy+Xd4VgvacHWWhkuanXasI5WYPk+dpsmCuVSizWaLgwTt9I6mkpnUoJ4eRO67TbCm+7PR33IwXkgByCc+eCnMk5ebKW5+tCPp/c3DRrvrvdLus1GkLmlBMJ6TYSiVw2Wy6VGvW6QE4FcEAOyCFQN5lgTn5Hf0N5IR9C5+gckJtKHp4kjKtVq61mU+43+V3zHgNyQA6BunFBTiyP1fJwrYK5fC4n61HVCOY6nQ5LNho6jGu32/1hnNx6J8RwQA7IITg34oylLD3yiK2DucT6OsEcGkkYl81kbGGcgtypnEtspIEckEOgbjQZSzOYk4duK5irVgnm0EjCOOGchHG65EThbYBIDsgBOQTqRsQ5gZysPjqYS6dSsjaZwRxlluisRZUqjEslk/1hHJADcgjUXWjSUgdzjXq9Ui7v7cwZwZysXPTMoVNVM86yaLVaifV1vRvXbrVUUeUgG3JADsghUDeWMktzZ84qszR65oR5LOLo5DBO3y1yT8ktdFwYN8gPCpADcgjUjRhyqgJFHrp1mWW5XDaXLYI5dILMEScSxplFlWcN44AckEOgbow9c7IqqZ25xPp6t9vV77der7OUoyOVy+XM5LYK4wr5vDwwSRhndQ5sbQ24GwfkgBwCdeNqJ9BllpVyudDrHMgbi9dN2gnQaW0DIrl5kpubKoxTRZWKcIOHcUAOyCFQN3rIqQoUHczJCiXr1EYi0Wq19Ntk0Bc6ud5EeLa5saFmMavdOIHcmRKVQA7IIVA33p45Nc1SVigJ5tKplDyVm8tTpVJhWUdmvYm+PeQXajdX/lutVPZGnJwxUQnkgBwCdeNtJxDI6XYCCebkwbxyuAJF1jUWd6RkBvryayGchHEqUWmdpzPALGYgB+QQtJvA0QS6nSCbyQjn5Cv6fTEDBSmZZ1aoehM1xGvoehMgB+QQqLvQCpS9I3iSyWw2S9ISnZColOhN1ZtI3L83xMtoGwByQA6hyaNOQ06sK1B00tKcgSJ/KpfLsdDPssz2EjNRWatWdaLyrPUmQA7IIWg3dtQpyJlJy2KhIOvXRiLRMZKWzPqiotJMVOr5Jv31JkNwDsgBOQTtxr4zpwdaHiQtM5ldY3Az7eGzKbP1W26ZQqGgKipVotJWb0IkB+QQmi7a2SpQTqi0ZHNuNrfizNZvnahUhLPGVJ5jKw7IATmExk473Rt+ZKXlRiJhTimko2DWZKasVet3OpVSFZXNRsMaU2nMNwFyQA6haaRdf9JSVVrKWiYrmqxr5rO8/DqxsRFfT+Arb9sBTJneiXGFfF7CuL1BzFtb56k3AXJADqGLo13/aXN7BxSo8nFjc67RaPpDK/hqO509tBVXLpflccc8auA8jXFADsghdNHA0+0EataXraNA1jhzIavVGoViCV9hm4RrNptqRmWpWNTFJkMMYgZyQA6hiQHvhM05Wd1kjTPryNHsSBebFPJ51TNgS1QCOSCH0OUA3pGbc7KuqQPnNhKJtjG6EM2C5EZIJZPmVpwebnKengEgB+QQmgzzbMFc/xkF5uQLdLUld4E+Z8A2hXlUiUogB+QQumjsmTMtxWpzTneIpw6fmYmuqqxZbtmseSCq6oo753ATIAfkEJo05oxTVfXBqrLGVcpl9VyfzWR2jGJLdCUJp0cw2wg3wq04IAfkEJok58yDVVURiuacRHUjXOPQtAXztVptc2NDnmZKxaI5oHIkXXFADsghNEWcM8/iEc7Jc706c65YLMK5K0k4a0hpr5xSjWBWk01GMr4LyAE5hKY3ntOck6f7vea5UgnOXTHC6ZY4TThVTjmqvm8gB+QQmlLOqfHNqthSVkAVz5Xg3NUinG6Jq1YqqiVurDEckANyCE2ec+aZc3DuahNOz1/WhBvJCGYgB+QQmmopzqkzxM0mcTUMhf25y044tQ8nTy39Td9jxRuQA3IITUs811+Hojin61DoK7iUjy87O7VaTVea6BMGzKZvBUIgB+QQusqQu7mfurTlLRXnrL6CQgHOXTrCWf1wyaQinM5Syoc7pm4BIAfkEJr2eE4VW+oTeVRfgTUdI5lMp1Lym1yoSyHBmDXFphfDqX64Iwd3XQDngByQQ2iKIGcOQzH759ThcxuJhHmcNJpOybOI6uuXpxOz49usNLmwNwPkgBxCU4c6PdxSc07NQ1GHibfbbUpRpvTj292VpxCJ3vTULhvh9AkDQA7IITSjkLu5X29pHlagOKfOK+g/ZxVNCeFarZY6PUcIJ5+X2fF9wVlKIAfkEJrq5VJzzjxMvFqp6BY6+QVHFkyP5LOQT0cNNFGtAmoTrr/j+4KfToAckENoSjmnUXck55Kbm2zRTYnkUUQ9eahCSn0+nHw6trMFLj7+BnJADqHphZySLZ6rVauqFEWlLmu1GqnLCX5M7XY7lUzqMhN5CjEJZ6YoJ/IxATkgh9AliOc058xSlEI+L6GDxHOkLicilaJU87rUAd+qzOTIkV2TehABckAOocsR0h15BJ1OXUpI12q1COku7EOR5w115c1NOPlc5OvTQzggB+QQuqycs6UuU70uugIh3YUEcJVeAKeqKHWvtyacWUg58XcL5IAcQpeVc2bqUg8As0K6ZpOQbkyfQrvdNgM4VWMiTxtyzc1OuItvFQByQA6hK4I6xTk9FUVCOlln9WAUHdLJmssVG6EEYPIwodvgbDUmU5WiBHJADqFLzLmb+410ZupSQjqJJ9QunTXrshfSyf+SvTy/5BrK1VUllDqAU43etj6BaSMckANyCF3WeE5HdYpzqhrF3KVTw6XSqZR8nRMMhpNcNwmV9YBsPalL7cDpRu/JdsIBOSCH0JVFnW0wis5eViuVUrEoi7LKXgrwqL086+WVKyrPChIQq/ykOhBOF5hMeQAH5IAcQlcnpNvpFTvokE4VXirUydKsN+qymQzDnQfEm1w3iYPVid5qiImZn9Q1JtOMNyAH5BC6IpxTv1Ahhd6l06izbdSBupPxJjxLp1I2vNl64DThzI8AyAE5hNCYQ7qeVPZSpS7NjTrVOW4mMNmrU5LrIABTx5zaqkv09pvOT16KAA7IATmErhrnNO005/Qunaq9VKiT5VuiOjX3UlZz+S3V2jWbF02+d1VaIldDRW9H4q0/P3lZvkcgB+QQuppRnZ7srGmnhoHJ8q3mXmrUSWxXKhblz84O6qwtzF7fm+rsliug8aa636xz4HpZX52fNIeYADkghxCaPOTMqK4/galRp5oNVL9B40oHdjp0s85w6H3X8r3rykkTb8dVl1y6KwPkgBxCM4E6XZMiqFNRnUad6qtT23UqsBP4CQ2vDO002yRgVUUlKjMp37V8RR3hrfB2ZHXJ5SUckANyCM0K6nRNijkPTKHOlsPUtBMeWLRrNi9pJlPlJOUbFY7raFWFbmZmUk2eVJlJ1dx9NfAG5IAcQjNHu5196QSmrkxRqJOlX4Ib1XKgwKBiu0wmI0hQDJjmFV8FbfI+hd3qXNnk/jguzTbV061CN1VXoionbXtvl5ptQA7IITS7tDOjOjOHadJOpTEV7VRsp4EnX5kq4NnAdojN6bR8Rdgm5NY1kyotqVoJbZnJK0Y4IAfkEJpdzh3Qric9LaU/jaloZyYzhSIbiYTESfK/wg/5w3oM/7jZoN62orO8U/nX5Y2l02nVA6DApoI2Hbcptum0pK0roB9vV+njBnJADqGZTmAeiu16457NBjuhgort1JAwG/AEJwp4yV6DuZBGTTG2ihUrldZ+nHTW7ulDpaH7gznl1QS7akqZkDW9v8emGwBUIYkK2lSppBm36YGTNrbt9umKfdBADsghBO0Obddp2qnYTtFOd5Sr8E7t3pnAU0Gewp7ObaqcoZBPxXyKT/JfZaGRaf11sX619D5HVaCmYzX5XfWP6ohNFZKYQZvZym22ux2Jt6v6+QI5IIcQnLNHdWbXgUk7M7zTEZ4K8hRmFPaUTfIpC+o0Ao+0+l3FRfVXNMwU/IRn8spqg03tsSmbEZuuJVF409WS5okBNw+P/bzCHy6QA3IIodPTmGrTrh94/czT4KmUyyq9qayKNtUWms0KiuoX+n81yZRVSaTima6NPAQ2eUuHgzZdKmkrJ5mpGWZADsghhAalnYrt9NbdkUGeiT2d4dTws4FQLFGgthmZKctfF+tXO4S0fZtgsxWS2OK2GRzRCeSAHELoJNSdADxFO8WVPeAZMjmkYj7FP0UpTax+a1gqmJn/1S+uY7XtfWmkzWzQBuSAHEJoZLHdkczbA95hdQ/LZJX6tfkVU/qv632142I1E2mwDcgBOYTQaIK8m4crOPoLNTX8jqSgyS3b/5qyveBxdf+wDcgBOYTQRUd7/VgyCzhNKNr+8JFIA2ZADsghhKY32rt5uAykPxCEZ0AOyCGEEAJyQA4hhIAchANyCCEE5IAcQgghIAfkEEIIATkghxBCCMgBOYQQQkAOyCGEEAJyQA4hhIAckEMIIQTkgBxCCCEgB+QQQggBOSCHEEIIyAE5hBBCQA7IIYTQjEFuE7wBOYQQAnJADiGEEJADcgghhIAckEMIIQTkgBxCCCEgB+QQQggBOSCHEEJADsghhBACckAOIYQQkANyCCGEgByQQwghBOSAHEIIISAH5BBCCMgBOYQQQkAOyCGEEAJyQA4hhBCQA3IIIYSAHJBDCCEE5IAcQggBOQzkEEIIyAE5hBBCQA7IIYQQAnJADiGEEJADcgghhIAckEMIIQTkgBxCCAE5IIcQQgjIATmEEEJADsghhBACckAOIYQQkANyCCGEgByQQwghIAfkEEIIATkghxBCCMgBOYQQQkAOyCGEEAJyQA4hhBCQA3IIIQTkgBxCCCEgB+QQQggBOSCHEEIIyAE5hBBCQA7IIYQQAnJADiGEgByQA3IIIQTkgBxCCCEgB+QQQggBOSCHEEIIyAE5hBBCQA7IIYQQAnJADiGEgByQQwghBOSAHEIIISAH5BBCCAE5IIcQQgjIATmEEEJADsghhBCQA3IIIYSAHJBDCCEE5IAcQgghIAfkEEIIATkghxBCCMgBOYQQAnIYyCGEEJADcgghhIAckEMIIQTkgBxCCCEgB+QQQggBOSCHEEIIyAE5hBACckAOIYQQkANyCCGEgByQQwghBOSAHEIIISAH5BBCCAG5E/z/Ad1Fkej1CUcQAAAAAElFTkSuQmCC',
                        }),
                        o.default.createElement('image', {
                          id: 'image1_2133:17259',
                          width: '332',
                          height: '290',
                          xlinkHref:
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAAEiCAYAAACSkOt1AAAQIUlEQVR4Ae3dz26c53UH4DOcIYf/acWmWMN1mwYIiiTwps0FBOiiQO6id9K76QV0WXTTRTfZFNk0QGsbkeMYoiRKFEWRnD+c4BtVtoSK9iuSc8JDPgMQkkbvfOd8z3nxA4cz/Kb3s59/Ngs3AgQIEPhBgaUfXGEBAQIECMwFBKaNQIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRgGB2QhlGQECBASmPUCAAIFGAYHZCGUZAQIEBKY9QIAAgUYBgdkIZRkBAgQEpj1AgACBRoFB4zrLCBAgkCawtLQUS/1+fPwXH8fOzgexu3c/+v3+vP7Z6Wns7+/H48eP4snjx2k9dYUEZir37So2GKzE2vaHsbQ0iH5/+dpPbjw+mR/z6OCbaz+2A95sgeXllRiuDmNtfT1W11ZjMBhEb6k3b3qwPJjfv7GxEacnJ3F6ehrT6TTlhARmCvPtLLJz/8fxk89+FWsb92Jt8961n+TBwy/i7OQofvsf/3Ltx3bAmy2ws7MT9/f2Ynd3N7a2t99qdnW4Gltb27G1uRnb2zvx5Refx/Hx8VtrFvUPP8NclKzjEiBwaYHh6mps7+zEysrKhcdYGQ5jc3Mz+v287/vyKl142v6DAAECbwsMh8P5zy77/Yu/p+vCtLe19e3PNt8+wmL+JTAX43onjno+OYvT42fR6/XmX8O1regtvfrB/FUARidHcX4+nR97dJrzVOsq/Xrsn0/g1U818+pfHN95PahUVOB8Oo3x2cmrr9FJdP++jttkMorx6NVxJ6PT6zikYxC4FgHfYV4L4908yNHhw3j523//9kWfn/7dP8bG8u6VMb7+n9/E8fPH0b3o43Y3BQ4Pn8WD3385f+Gne4HnXbejo+fx9OAgRuPRu/57IfcJzIWw3o2Dnk/G0X0NBsMYLA/nf7+OM59OxzE+ezn/uo7jOUY9gfPz85hMJtH9edHt9ZrZ96y56LGXvV9gXlbO4wgQWJhA94b07uvFi+O4d+9e3L//3RvXu/dd7u8/jMf/t2ZhTbzjwALzHSjuIkDgZgiMRqM4fvEinq4sR/fbP91tPBrHy5cvYzIepzcpMNPJFSRAoFXg0f7DeNQt/rL1EYtd51Xyxfo6OgECt0hAYN6iYToVAgQWKyAwF+vr6AQI3CIBgXmLhulUCBBYrIDAXKyvoxMgcIsEvEp+i4bpVAjcFoH574j3evO3EnVvJ+oPvrtGwex8Nn9De3cNzO97Y/siLATmIlQdkwCBKwn0XHH9Sn4eTIDAHRJwxfU7NGynSoDA1QRccf1qfh5NgMAdEnDF9Ts0bKdKgMDVBFxx/Wp+Hn0DBXq97qNQB/HB3l/H3qe/iOH6zrV0ufdXv4h7938ch0/+ELNZxPk073qH13ICDpImkH3Fda+Sp432NhbqPppiKVaGG7G+/eG1fRjVcH07Biur82NHzG4jnHMqKtDf3d3756K9a/vPJdDrRX8wjB99/JP421/+Oj785KexsfVR9PqD+Wf7XLWtLixXhuux/dEncW/vb+LJN5/Pw3M2u/hislet6fE3S6B73+VkMp5/amT39Pxdt+6q7I/29+PJwZMYj3KehfgO812TcN8PCqyub8fq+k6sbXwQyyvr0Vu6vq3UfdcavaX5sZeW+tHV6q7APprmX//wByEsWIhAd7X1k5OTGJ2NYrw2jsEbH67XvVn9fDaL0dnZfE3mFdd7P/v5Z57zLGTkt/eg3VPmv/+Hf4rl4Vqsrn+w0BPtPj3y+PBh7H/13/G///VvC63l4DdP4JO//NQV12/eWHT0vgL9wUos9Zff92GXWj+vNcipdakGPWhhAq64vjBaB84S6J4mr299mFLuVa2P5i8spRRU5EYJuOL6jRqHZggQINAu4PJu7VZWEiBwxwWu76XNOw55l05/Oh7F737zr02n3L39aLi2GTsffTr/ev2gB7/7z5jNZnHy4uD1Xd/759HBN9/7//6TQIaAwMxQvmU1JpOzaA2w7pX06eTs//3M8+XRk5i/Av5sv0nn7ORF0zqLCCxSQGAuUveWHvt8Oolnjx80nd1wdTMm41Fs/+iTt9a/eLYf3XEOn3z11v0X/SPzvXYX9eB+AgLTHriUQBd2Lbdu3ex8On/6/eb6+X3n03lovnm/vxPoBFxx3T4gQIBAo4ArrjdCWUaAAIHV1bVYW1+Lre3t2NzaiuXl5egtvbo20XB1GNs7O9H9+uT5dBrPnz+P7vN9Mm6ekmcoq0GAwHsJbG5uxv29vdjd3Z2H5lsPXhnG+vpGrA6Hsba2FqMvPo/j4+O3lizqH96HuShZxyVA4NICrrh+aToPJEDgrgnc1Cuu+w7zru1E50vgFglkX3FdYN6izeNUCBBYrIDAXKyvoxMgcAmB7mrqD37/ZRwfX/wbXkdHz+OPf/w6RuOcq613p+FV8ksM00MIEFiswE294rrAXOzcHZ0AgUsIPD04iO7r7GzkiuuX8POQogLdZ690F+s4n47nF9t4fRqv7st5s/Hrmv6sJzB/Sj6bzd+Y/vqN69PJNA4PD+Ps9DT9hHyHmU5+twqen4/nH2A2Hp/GdPLdh5h1H2rmUyDv1l64zNk+e/o0uq+vv/7DZR5+7Y8RmNdO6oBvCnS/ujYencTho69iaem7z+Xp7ouZz99708rfb76AwLz5MyrdYXdVosloGs8ePYiTF0+/PZfJKP/p1LfF/YXAJQUE5iXhPOz9BCajl/MLCb/fo6wmcLMEBObNmset7aa7unp0X24ECgt443rh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVwBgZnrrRoBAoUFBGbh4WmdAIFcAYGZ660aAQKFBQRm4eFpnQCBXAGBmeutGgEChQUEZuHhaZ0AgVyBPwGst3vTioecKwAAAABJRU5ErkJggg==',
                        })
                      )
                    );
                  });
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  s = e('../../../hooks/useI18nContext');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/pin-extension/pin-billboard.js' },
    ],
    [
      7431,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/onboarding': 5807,
        '../../../components/component-library': 6402,
        '../../../components/ui/button': 6707,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './pin-billboard': 7430,
        react: 5328,
        'react-redux': 5286,
        'react-responsive-carousel': 5305,
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
                    const e = (0, l.useI18nContext)(),
                      t = (0, o.useHistory)(),
                      [n, E] = (0, a.useState)(0),
                      v = (0, s.useDispatch)(),
                      b = (0, a.useContext)(m.MetaMetricsContext),
                      _ = (0, s.useSelector)(f.getFirstTimeFlowType),
                      k = (0, s.useSelector)(f.getExternalServicesOnboardingToggleState);
                    return a.default.createElement(
                      'div',
                      {
                        className: 'onboarding-pin-extension',
                        'data-testid': 'onboarding-pin-extension',
                      },
                      a.default.createElement(
                        a.default.Fragment,
                        null,
                        a.default.createElement(
                          p.Text,
                          {
                            variant: u.TextVariant.headingLg,
                            as: 'h2',
                            align: u.TextAlign.Center,
                            fontWeight: u.FontWeight.Bold,
                          },
                          e('onboardingPinExtensionTitle')
                        ),
                        a.default.createElement(
                          r.Carousel,
                          {
                            selectedItem: n,
                            showThumbs: !1,
                            showStatus: !1,
                            showArrows: !1,
                            onChange: e => E(e),
                          },
                          a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(
                              p.Text,
                              { align: u.TextAlign.Center },
                              e('onboardingPinExtensionDescription')
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'onboarding-pin-extension__diagram' },
                              a.default.createElement(y.default, null)
                            )
                          ),
                          a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(
                              p.Text,
                              { align: u.TextAlign.Center },
                              e('onboardingPinExtensionDescription2')
                            ),
                            a.default.createElement(
                              p.Text,
                              { align: u.TextAlign.Center },
                              e('onboardingPinExtensionDescription3')
                            ),
                            a.default.createElement('img', {
                              src: '/images/onboarding-pin-browser.svg',
                              width: '799',
                              height: '320',
                              alt: '',
                            })
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'onboarding-pin-extension__buttons' },
                          a.default.createElement(
                            c.default,
                            {
                              'data-testid': 0 === n ? 'pin-extension-next' : 'pin-extension-done',
                              type: 'primary',
                              onClick: async () => {
                                0 === n
                                  ? E(1)
                                  : (await v((0, i.toggleExternalServices)(k)),
                                    await v((0, i.setCompletedOnboarding)()),
                                    b({
                                      category: g.MetaMetricsEventCategory.Onboarding,
                                      event: g.MetaMetricsEventName.OnboardingWalletSetupComplete,
                                      properties: {
                                        wallet_setup_type:
                                          _ === h.FirstTimeFlowType.import ? 'import' : 'new',
                                        new_wallet: _ === h.FirstTimeFlowType.create,
                                      },
                                    }),
                                    t.push(d.DEFAULT_ROUTE));
                              },
                            },
                            e(0 === n ? 'next' : 'done')
                          )
                        )
                      )
                    );
                  });
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('react-redux'),
                  r = e('react-responsive-carousel'),
                  i = e('../../../store/actions'),
                  l = e('../../../hooks/useI18nContext'),
                  c = E(e('../../../components/ui/button')),
                  u = e('../../../helpers/constants/design-system'),
                  d = e('../../../helpers/constants/routes'),
                  p = e('../../../components/component-library'),
                  m = e('../../../contexts/metametrics'),
                  f = e('../../../selectors'),
                  g = e('../../../../shared/constants/metametrics'),
                  h = e('../../../../shared/constants/onboarding'),
                  y = E(e('./pin-billboard'));
                function E(e) {
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
      { package: '$root$', file: 'ui/pages/onboarding-flow/pin-extension/pin-extension.js' },
    ],
    [
      7432,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/lib/ui-utils': 5852,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../components/component-library': 6402,
        '../../../components/ui/button': 6707,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/app/app': 6845,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/identity/useProfileSyncing': 6951,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/identity/profile-syncing': 7600,
        '../../../store/actions': 7619,
        './setting': 7433,
        '@metamask/snaps-sdk': 2779,
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
                  (n.default = function () {
                    const e = (0, y.useI18nContext)(),
                      t = (0, o.useDispatch)(),
                      n = (0, s.useHistory)(),
                      [C, w] = (0, a.useState)(!1),
                      [S, I] = (0, a.useState)(null),
                      [N, O] = (0, a.useState)(!0),
                      M = (0, o.useSelector)(e => e.metamask),
                      {
                        use4ByteResolution: B,
                        useTokenDetection: R,
                        useCurrencyRateCheck: D,
                        useMultiAccountBalanceChecker: P,
                        ipfsGateway: F,
                        useAddressBarEnsResolution: L,
                        useTransactionSimulations: j,
                      } = M,
                      U = (0, o.useSelector)(E.getUseExternalNameSources),
                      [W, G] = (0, a.useState)(B),
                      [V, z] = (0, a.useState)(R),
                      [Q, q] = (0, a.useState)(D),
                      [H, Y] = (0, a.useState)(P),
                      [Z, J] = (0, a.useState)(j),
                      [K, X] = (0, a.useState)(F),
                      [$, ee] = (0, a.useState)(null),
                      [te, ne] = (0, a.useState)(L),
                      [ae, oe] = (0, a.useState)(U),
                      se = (0, a.useContext)(f.MetaMetricsContext),
                      re = (0, o.useSelector)(v.getNetworkConfigurationsByChainId),
                      ie = (0, o.useSelector)(E.getExternalServicesOnboardingToggleState),
                      le = (0, o.useSelector)(x.selectIsProfileSyncingEnabled),
                      { enableProfileSyncing: ce, error: ue } = (0, c.useEnableProfileSyncing)(),
                      { disableProfileSyncing: de, error: pe } = (0, c.useDisableProfileSyncing)();
                    (0, a.useEffect)(() => {
                      ie ? ce() : de();
                    }, [ie, ce, de]);
                    const me = e => {
                        I(e),
                          w(!0),
                          setTimeout(() => {
                            O(!1);
                          }, A);
                      },
                      fe = [
                        { id: 1, title: e('general'), subtitle: e('generalDescription') },
                        { id: 2, title: e('assets'), subtitle: e('assetsDescription') },
                        { id: 3, title: e('security'), subtitle: e('securityDescription') },
                      ];
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        'div',
                        { className: 'privacy-settings', 'data-testid': 'privacy-settings' },
                        a.default.createElement(
                          'div',
                          {
                            className: (0, r.default)('container', {
                              'show-detail': C,
                              'show-list': !C,
                            }),
                          },
                          a.default.createElement(
                            'div',
                            { className: 'list-view' },
                            a.default.createElement(
                              m.Box,
                              {
                                className: 'privacy-settings__header',
                                marginTop: 6,
                                marginBottom: 6,
                                display: g.Display.Flex,
                                flexDirection: g.FlexDirection.Column,
                                justifyContent: g.JustifyContent.flexStart,
                              },
                              a.default.createElement(
                                m.Box,
                                {
                                  display: g.Display.Flex,
                                  alignItems: g.AlignItems.center,
                                  flexDirection: g.FlexDirection.Row,
                                  justifyContent: g.JustifyContent.flexStart,
                                },
                                a.default.createElement(p.default, {
                                  type: 'inline',
                                  icon: a.default.createElement(m.Icon, {
                                    name: m.IconName.ArrowLeft,
                                    size: m.IconSize.Lg,
                                    color: g.IconColor.iconDefault,
                                  }),
                                  'data-testid': 'privacy-settings-back-button',
                                  onClick: () => {
                                    if (
                                      (t((0, b.setUse4ByteResolution)(W)),
                                      t((0, b.setUseTokenDetection)(V)),
                                      t((0, b.setUseMultiAccountBalanceChecker)(H)),
                                      t((0, b.setUseCurrencyRateCheck)(Q)),
                                      t((0, b.setUseAddressBarEnsResolution)(te)),
                                      (0, b.setUseTransactionSimulations)(Z),
                                      (0, b.setUseExternalNameSources)(ae),
                                      ie || de(),
                                      K && !$)
                                    ) {
                                      const { host: e } = new URL((0, l.addUrlProtocolPrefix)(K));
                                      t((0, b.setIpfsGateway)(e));
                                    }
                                    se({
                                      category: u.MetaMetricsEventCategory.Onboarding,
                                      event:
                                        u.MetaMetricsEventName.OnboardingWalletAdvancedSettings,
                                      properties: {
                                        settings_group: 'onboarding_advanced_configuration',
                                        is_profile_syncing_enabled: le,
                                        is_basic_functionality_enabled: ie,
                                        turnon_token_detection: V,
                                      },
                                    }),
                                      console.log('go back man'),
                                      n.push(h.ONBOARDING_COMPLETION_ROUTE);
                                  },
                                }),
                                a.default.createElement(
                                  m.Box,
                                  {
                                    display: g.Display.Flex,
                                    alignItems: g.AlignItems.center,
                                    justifyContent: g.JustifyContent.center,
                                    width: g.BlockSize.Full,
                                  },
                                  a.default.createElement(
                                    m.Text,
                                    { variant: g.TextVariant.headingLg, as: 'h2' },
                                    e('defaultSettingsTitle')
                                  )
                                )
                              ),
                              a.default.createElement(
                                m.Text,
                                { variant: g.TextVariant.bodyLgMedium, marginTop: 5 },
                                e('defaultSettingsSubTitle')
                              ),
                              a.default.createElement(
                                'a',
                                {
                                  href: 'https://support.metamask.io/privacy-and-security/privacy-best-practices',
                                  target: '_blank',
                                  rel: 'noreferrer',
                                  key: 'learnMoreAboutPrivacy',
                                  style: { fontSize: 'var(--font-size-5)' },
                                },
                                e('learnMoreAboutPrivacy')
                              )
                            ),
                            a.default.createElement(
                              m.Box,
                              null,
                              a.default.createElement(
                                m.Box,
                                {
                                  as: 'ul',
                                  marginTop: 4,
                                  marginBottom: 4,
                                  style: { listStyleType: 'none' },
                                  className: 'privacy-settings__categories-list',
                                },
                                fe.map(e =>
                                  a.default.createElement(
                                    m.Box,
                                    {
                                      marginTop: 5,
                                      marginBottom: 5,
                                      key: e.id,
                                      className: 'categories-item',
                                      onClick: () => me(e),
                                    },
                                    a.default.createElement(
                                      m.Box,
                                      {
                                        display: g.Display.Flex,
                                        alignItems: g.AlignItems.flexStart,
                                        justifyContent: g.JustifyContent.spaceBetween,
                                        'data-testid': `category-item-${e.title}`,
                                      },
                                      a.default.createElement(
                                        m.Text,
                                        { variant: g.TextVariant.bodyLgMedium },
                                        e.title
                                      ),
                                      a.default.createElement(p.default, {
                                        type: 'inline',
                                        icon: a.default.createElement(m.Icon, {
                                          name: m.IconName.ArrowRight,
                                          color: g.IconColor.iconDefault,
                                        }),
                                        onClick: () => me(e),
                                      })
                                    ),
                                    a.default.createElement(
                                      m.Text,
                                      {
                                        className: 'description',
                                        variant: g.TextVariant.bodyMd,
                                        color: g.TextColor.textAlternative,
                                      },
                                      e.subtitle
                                    )
                                  )
                                )
                              )
                            )
                          ),
                          a.default.createElement(
                            'div',
                            { className: (0, r.default)('detail-view', { hidden: !C && N }) },
                            a.default.createElement(
                              m.Box,
                              {
                                className: 'privacy-settings__header',
                                marginTop: 6,
                                marginBottom: 5,
                                display: g.Display.Flex,
                                flexDirection: g.FlexDirection.Row,
                                justifyContent: g.JustifyContent.flexStart,
                              },
                              a.default.createElement(p.default, {
                                'data-testid': 'category-back-button',
                                type: 'inline',
                                icon: a.default.createElement(m.Icon, {
                                  name: m.IconName.ArrowLeft,
                                  size: m.IconSize.Lg,
                                  color: g.IconColor.iconDefault,
                                }),
                                onClick: () => {
                                  w(!1),
                                    setTimeout(() => {
                                      O(!0);
                                    }, A);
                                },
                              }),
                              a.default.createElement(
                                m.Box,
                                {
                                  display: g.Display.Flex,
                                  alignItems: g.AlignItems.center,
                                  justifyContent: g.JustifyContent.center,
                                  width: g.BlockSize.Full,
                                },
                                a.default.createElement(
                                  m.Text,
                                  { variant: g.TextVariant.headingLg, as: 'h2' },
                                  null == S ? void 0 : S.title
                                )
                              )
                            ),
                            a.default.createElement(
                              'div',
                              {
                                className: 'privacy-settings__settings',
                                'data-testid': 'privacy-settings-settings',
                              },
                              1 === (null == S ? void 0 : S.id)
                                ? a.default.createElement(
                                    a.default.Fragment,
                                    null,
                                    a.default.createElement(T.Setting, {
                                      dataTestId: 'basic-functionality-toggle',
                                      value: ie,
                                      setValue: e => {
                                        e
                                          ? (t((0, _.onboardingToggleBasicFunctionalityOn)()),
                                            se({
                                              category: u.MetaMetricsEventCategory.Onboarding,
                                              event: u.MetaMetricsEventName.SettingsUpdated,
                                              properties: {
                                                settings_group: 'onboarding_advanced_configuration',
                                                settings_type: 'basic_functionality',
                                                old_value: !1,
                                                new_value: !0,
                                                was_profile_syncing_on: !1,
                                              },
                                            }))
                                          : t((0, _.openBasicFunctionalityModal)());
                                      },
                                      title: e('basicConfigurationLabel'),
                                      description: e('basicConfigurationDescription', [
                                        a.default.createElement(
                                          'a',
                                          {
                                            href: 'https://consensys.io/privacy-policy',
                                            key: 'link',
                                            target: '_blank',
                                            rel: 'noreferrer noopener',
                                          },
                                          e('privacyMsg')
                                        ),
                                      ]),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      dataTestId: 'profile-sync-toggle',
                                      disabled: !ie,
                                      value: le,
                                      setValue: async () => {
                                        le
                                          ? t(
                                              (0, b.showModal)({
                                                name: 'CONFIRM_TURN_OFF_PROFILE_SYNCING',
                                                turnOffProfileSyncing: () => {
                                                  de();
                                                },
                                              })
                                            )
                                          : ce();
                                      },
                                      title: e('profileSync'),
                                      description: e('profileSyncDescription', [
                                        a.default.createElement(
                                          'a',
                                          {
                                            href: 'https://support.metamask.io/privacy-and-security/profile-privacy',
                                            key: 'link',
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                          },
                                          e('profileSyncPrivacyLink')
                                        ),
                                      ]),
                                    }),
                                    (ue || pe) &&
                                      a.default.createElement(
                                        m.Box,
                                        { paddingBottom: 4 },
                                        a.default.createElement(
                                          m.Text,
                                          {
                                            as: 'p',
                                            color: g.TextColor.errorDefault,
                                            variant: g.TextVariant.bodySm,
                                          },
                                          e('notificationsSettingsBoxError')
                                        )
                                      ),
                                    a.default.createElement(T.Setting, {
                                      title: e('onboardingAdvancedPrivacyNetworkTitle'),
                                      showToggle: !1,
                                      description: a.default.createElement(
                                        a.default.Fragment,
                                        null,
                                        e('onboardingAdvancedPrivacyNetworkDescription', [
                                          a.default.createElement(
                                            'a',
                                            {
                                              href: 'https://consensys.io/privacy-policy/',
                                              key: 'link',
                                              target: '_blank',
                                              rel: 'noopener noreferrer',
                                            },
                                            e('privacyMsg')
                                          ),
                                        ]),
                                        a.default.createElement(
                                          m.Box,
                                          { paddingTop: 4 },
                                          a.default.createElement(
                                            m.Box,
                                            {
                                              display: g.Display.Flex,
                                              flexDirection: g.FlexDirection.Column,
                                              gap: 5,
                                            },
                                            Object.values(re)
                                              .filter(
                                                ({ chainId: e }) => !k.TEST_CHAINS.includes(e)
                                              )
                                              .map(e => {
                                                var n, o;
                                                return a.default.createElement(
                                                  m.Box,
                                                  {
                                                    key: e.chainId,
                                                    className:
                                                      'privacy-settings__customizable-network',
                                                    onClick: () => {
                                                      t(
                                                        (0, b.setEditedNetwork)({
                                                          chainId: e.chainId,
                                                        })
                                                      ),
                                                        t((0, b.toggleNetworkMenu)());
                                                    },
                                                    display: g.Display.Flex,
                                                    alignItems: g.AlignItems.center,
                                                    justifyContent: g.JustifyContent.spaceBetween,
                                                  },
                                                  a.default.createElement(
                                                    m.Box,
                                                    {
                                                      display: g.Display.Flex,
                                                      alignItems: g.AlignItems.center,
                                                    },
                                                    a.default.createElement(m.AvatarNetwork, {
                                                      src: k.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[
                                                        e.chainId
                                                      ],
                                                    }),
                                                    a.default.createElement(
                                                      m.Box,
                                                      {
                                                        textAlign: g.TextAlign.Left,
                                                        marginLeft: 3,
                                                      },
                                                      a.default.createElement(
                                                        m.Text,
                                                        { variant: g.TextVariant.bodySmMedium },
                                                        e.name
                                                      ),
                                                      a.default.createElement(
                                                        m.Text,
                                                        {
                                                          variant: g.TextVariant.bodyXs,
                                                          color: g.TextColor.textAlternative,
                                                        },
                                                        null ===
                                                          (n = new URL(
                                                            null == e ||
                                                            null ===
                                                              (o =
                                                                e.rpcEndpoints[
                                                                  null == e
                                                                    ? void 0
                                                                    : e.defaultRpcEndpointIndex
                                                                ]) ||
                                                            void 0 === o
                                                              ? void 0
                                                              : o.url
                                                          )) || void 0 === n
                                                          ? void 0
                                                          : n.origin
                                                      )
                                                    )
                                                  ),
                                                  a.default.createElement(m.ButtonIcon, {
                                                    iconName: m.IconName.ArrowRight,
                                                    size: m.IconSize.Md,
                                                  })
                                                );
                                              }),
                                            a.default.createElement(
                                              m.ButtonLink,
                                              {
                                                onClick: () => {
                                                  t(
                                                    (0, b.toggleNetworkMenu)({
                                                      isAddingNewNetwork: !0,
                                                    })
                                                  );
                                                },
                                                justifyContent: g.JustifyContent.Left,
                                                variant: i.ButtonVariant.link,
                                              },
                                              a.default.createElement(
                                                m.Box,
                                                {
                                                  display: g.Display.Flex,
                                                  alignItems: g.AlignItems.center,
                                                },
                                                a.default.createElement(m.Icon, {
                                                  name: m.IconName.Add,
                                                  marginRight: 3,
                                                }),
                                                a.default.createElement(
                                                  m.Text,
                                                  { color: g.TextColor.primaryDefault },
                                                  e('addANetwork')
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ),
                                    })
                                  )
                                : null,
                              2 === (null == S ? void 0 : S.id)
                                ? a.default.createElement(
                                    a.default.Fragment,
                                    null,
                                    a.default.createElement(T.Setting, {
                                      value: V,
                                      setValue: z,
                                      title: e('turnOnTokenDetection'),
                                      description: e('useTokenDetectionPrivacyDesc'),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      value: Z,
                                      setValue: J,
                                      title: e('simulationsSettingSubHeader'),
                                      description: e('simulationsSettingDescription', [
                                        a.default.createElement(
                                          'a',
                                          {
                                            key: 'learn_more_link',
                                            href: d.TRANSACTION_SIMULATIONS_LEARN_MORE_LINK,
                                            rel: 'noreferrer',
                                            target: '_blank',
                                          },
                                          e('learnMoreUpperCase')
                                        ),
                                      ]),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      title: e('onboardingAdvancedPrivacyIPFSTitle'),
                                      showToggle: !1,
                                      description: a.default.createElement(
                                        a.default.Fragment,
                                        null,
                                        e('onboardingAdvancedPrivacyIPFSDescription'),
                                        a.default.createElement(
                                          m.Box,
                                          { paddingTop: 2 },
                                          a.default.createElement(m.TextField, {
                                            value: K,
                                            style: { width: '100%' },
                                            inputProps: { 'data-testid': 'ipfs-input' },
                                            onChange: t => {
                                              (t => {
                                                X(t);
                                                try {
                                                  const { host: e } = new URL(
                                                    (0, l.addUrlProtocolPrefix)(t)
                                                  );
                                                  if (!e || 'gateway.ipfs.io' === e)
                                                    throw new Error();
                                                  ee(null);
                                                } catch (t) {
                                                  ee(e('onboardingAdvancedPrivacyIPFSInvalid'));
                                                }
                                              })(t.target.value);
                                            },
                                          }),
                                          K
                                            ? a.default.createElement(
                                                m.Text,
                                                {
                                                  variant: g.TextVariant.bodySm,
                                                  color: $
                                                    ? g.TextColor.errorDefault
                                                    : g.TextColor.successDefault,
                                                },
                                                $ || e('onboardingAdvancedPrivacyIPFSValid')
                                              )
                                            : null
                                        )
                                      ),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      value: Q,
                                      setValue: q,
                                      title: e('currencyRateCheckToggle'),
                                      dataTestId: 'currency-rate-check-toggle',
                                      description: e('currencyRateCheckToggleDescription', [
                                        a.default.createElement(
                                          'a',
                                          {
                                            key: 'coingecko_link',
                                            href: d.COINGECKO_LINK,
                                            rel: 'noreferrer',
                                            target: '_blank',
                                          },
                                          e('coingecko')
                                        ),
                                        a.default.createElement(
                                          'a',
                                          {
                                            key: 'cryptocompare_link',
                                            href: d.CRYPTOCOMPARE_LINK,
                                            rel: 'noreferrer',
                                            target: '_blank',
                                          },
                                          e('cryptoCompare')
                                        ),
                                        a.default.createElement(
                                          'a',
                                          {
                                            key: 'privacy_policy_link',
                                            href: d.PRIVACY_POLICY_LINK,
                                            rel: 'noreferrer',
                                            target: '_blank',
                                          },
                                          e('privacyMsg')
                                        ),
                                      ]),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      value: te,
                                      setValue: ne,
                                      title: e('ensDomainsSettingTitle'),
                                      description: a.default.createElement(
                                        a.default.Fragment,
                                        null,
                                        a.default.createElement(
                                          m.Text,
                                          { variant: g.TextVariant.inherit },
                                          e('ensDomainsSettingDescriptionIntroduction')
                                        ),
                                        a.default.createElement(
                                          m.Box,
                                          {
                                            as: 'ul',
                                            marginTop: 4,
                                            marginBottom: 4,
                                            paddingInlineStart: 4,
                                            style: { listStyleType: 'circle' },
                                          },
                                          a.default.createElement(
                                            m.Text,
                                            { variant: g.TextVariant.inherit, as: 'li' },
                                            e('ensDomainsSettingDescriptionPart1')
                                          ),
                                          a.default.createElement(
                                            m.Text,
                                            { variant: g.TextVariant.inherit, as: 'li' },
                                            e('ensDomainsSettingDescriptionPart2')
                                          )
                                        ),
                                        a.default.createElement(
                                          m.Text,
                                          { variant: g.TextVariant.inherit },
                                          e('ensDomainsSettingDescriptionOutroduction')
                                        )
                                      ),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      value: H,
                                      setValue: Y,
                                      title: e('useMultiAccountBalanceChecker'),
                                      description: e(
                                        'useMultiAccountBalanceCheckerSettingDescription'
                                      ),
                                    })
                                  )
                                : null,
                              3 === (null == S ? void 0 : S.id)
                                ? a.default.createElement(
                                    a.default.Fragment,
                                    null,
                                    a.default.createElement(T.Setting, {
                                      value: W,
                                      setValue: G,
                                      title: e('use4ByteResolution'),
                                      description: e('toggleDecodeDescription'),
                                    }),
                                    a.default.createElement(T.Setting, {
                                      value: ae,
                                      setValue: oe,
                                      title: e('externalNameSourcesSetting'),
                                      description: e('externalNameSourcesSettingDescription'),
                                    })
                                  )
                                : null
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
                    var n = w(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  r = C(e('classnames')),
                  i = e('@metamask/snaps-sdk'),
                  l = e('../../../../app/scripts/lib/util'),
                  c = e('../../../hooks/identity/useProfileSyncing'),
                  u = e('../../../../shared/constants/metametrics'),
                  d = e('../../../../shared/lib/ui-utils'),
                  p = C(e('../../../components/ui/button')),
                  m = e('../../../components/component-library'),
                  f = e('../../../contexts/metametrics'),
                  g = e('../../../helpers/constants/design-system'),
                  h = e('../../../helpers/constants/routes'),
                  y = e('../../../hooks/useI18nContext'),
                  E = e('../../../selectors'),
                  v = e('../../../../shared/modules/selectors/networks'),
                  b = e('../../../store/actions'),
                  _ = e('../../../ducks/app/app'),
                  k = e('../../../../shared/constants/network'),
                  x = e('../../../selectors/identity/profile-syncing'),
                  T = e('./setting');
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function w(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (w = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const A = 500;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/privacy-settings/privacy-settings.js' },
    ],
    [
      7433,
      {
        '../../../components/component-library': 6402,
        '../../../components/ui/toggle-button': 6814,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Setting = void 0);
                var a = c(e('react')),
                  o = c(e('prop-types')),
                  s = e('../../../components/component-library'),
                  r = c(e('../../../components/ui/toggle-button')),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const u = ({
                  value: e,
                  setValue: t,
                  title: n,
                  description: o,
                  showToggle: c = !0,
                  dataTestId: u,
                  disabled: d = !1,
                }) => {
                  const p = (0, l.useI18nContext)();
                  return a.default.createElement(
                    s.Box,
                    {
                      display: i.Display.Flex,
                      justifyContent: i.JustifyContent.spaceBetween,
                      alignItems: i.AlignItems.flexStart,
                      marginTop: 3,
                      marginBottom: 3,
                      className: 'privacy-settings__setting__wrapper',
                      'data-testid': u,
                    },
                    a.default.createElement(
                      'div',
                      { className: 'privacy-settings__setting' },
                      a.default.createElement(s.Text, { variant: i.TextVariant.bodyMdMedium }, n),
                      a.default.createElement(
                        s.Text,
                        {
                          variant: i.TextVariant.bodySm,
                          color: i.TextColor.textAlternative,
                          as: 'div',
                        },
                        o
                      )
                    ),
                    c
                      ? a.default.createElement(
                          'div',
                          { className: 'privacy-settings__setting__toggle' },
                          a.default.createElement(r.default, {
                            value: e,
                            onToggle: e => t(!e),
                            offLabel: p('off'),
                            onLabel: p('on'),
                            disabled: d,
                          })
                        )
                      : null
                  );
                };
                (n.Setting = u),
                  (u.propTypes = {
                    value: o.default.bool,
                    setValue: o.default.func,
                    title: o.default.string,
                    description: o.default.oneOfType([o.default.object, o.default.string]),
                    showToggle: o.default.bool,
                    dataTestId: o.default.string,
                    disabled: o.default.bool,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/privacy-settings/setting.js' },
    ],
    [
      7434,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/app/step-progress-bar': 6284,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/button': 6707,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        './recovery-phrase-chips': 7435,
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
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = k);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = _(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('react-redux'),
                  r = e('lodash'),
                  i = b(e('prop-types')),
                  l = b(e('../../../components/ui/box')),
                  c = b(e('../../../components/ui/button')),
                  u = e('../../../components/component-library'),
                  d = e('../../../helpers/constants/design-system'),
                  p = e('../../../components/app/step-progress-bar'),
                  m = e('../../../helpers/constants/routes'),
                  f = e('../../../hooks/useI18nContext'),
                  g = e('../../../store/actions'),
                  h = e('../../../contexts/metametrics'),
                  y = e('../../../../shared/constants/metametrics'),
                  E = e('../../../selectors/selectors'),
                  v = b(e('./recovery-phrase-chips'));
                function b(e) {
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
                function k({ secretRecoveryPhrase: e = '' }) {
                  const t = (0, o.useHistory)(),
                    n = (0, f.useI18nContext)(),
                    i = (0, s.useDispatch)(),
                    b = (0, s.useSelector)(E.getHDEntropyIndex),
                    _ = e.split(' '),
                    k = [2, 3, 7],
                    [x, T] = (0, a.useState)(!1),
                    C = (0, a.useContext)(h.MetaMetricsContext),
                    [w, A] = (0, a.useState)(
                      (() => {
                        const e = { ..._ };
                        return (
                          k.forEach(t => {
                            e[t] = '';
                          }),
                          e
                        );
                      })()
                    ),
                    S = (0, a.useMemo)(
                      () =>
                        (0, r.debounce)(t => {
                          T(Object.values(t).join(' ') === e);
                        }, 500),
                      [T, e]
                    );
                  return a.default.createElement(
                    'div',
                    {
                      className: 'recovery-phrase__confirm',
                      'data-testid': 'confirm-recovery-phrase',
                    },
                    a.default.createElement(p.ThreeStepProgressBar, {
                      stage: p.threeStepStages.RECOVERY_PHRASE_CONFIRM,
                      marginBottom: 4,
                    }),
                    a.default.createElement(
                      l.default,
                      {
                        justifyContent: d.JustifyContent.center,
                        textAlign: d.TextAlign.Center,
                        marginBottom: 4,
                      },
                      a.default.createElement(
                        u.Text,
                        { variant: d.TextVariant.headingLg, fontWeight: d.FontWeight.Bold },
                        n('seedPhraseConfirm')
                      )
                    ),
                    a.default.createElement(
                      l.default,
                      {
                        justifyContent: d.JustifyContent.center,
                        textAlign: d.TextAlign.Center,
                        marginBottom: 4,
                      },
                      a.default.createElement(
                        u.Text,
                        { variant: d.TextVariant.headingSm, fontWeight: d.FontWeight.Normal },
                        n('seedPhraseEnterMissingWords')
                      )
                    ),
                    a.default.createElement(v.default, {
                      secretRecoveryPhrase: _,
                      confirmPhase: !0,
                      setInputValue: e => {
                        A(e), S(e);
                      },
                      inputValue: w,
                      indicesToCheck: k,
                    }),
                    a.default.createElement(
                      'div',
                      { className: 'recovery-phrase__footer__confirm' },
                      a.default.createElement(
                        c.default,
                        {
                          'data-testid': 'recovery-phrase-confirm',
                          type: 'primary',
                          large: !0,
                          className: 'recovery-phrase__footer__confirm--button',
                          onClick: async () => {
                            await i((0, g.setSeedPhraseBackedUp)(!0)),
                              C({
                                category: y.MetaMetricsEventCategory.Onboarding,
                                event:
                                  y.MetaMetricsEventName.OnboardingWalletSecurityPhraseConfirmed,
                                properties: { hd_entropy_index: b },
                              }),
                              t.push(m.ONBOARDING_COMPLETION_ROUTE);
                          },
                          disabled: !x,
                        },
                        n('confirm')
                      )
                    )
                  );
                }
                k.propTypes = { secretRecoveryPhrase: i.default.string };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/recovery-phrase/confirm-recovery-phrase.js',
      },
    ],
    [
      7435,
      {
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/chip': 6716,
        '../../../components/ui/chip/chip-with-input': 6714,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = m);
                var a = p(e('react')),
                  o = p(e('classnames')),
                  s = p(e('prop-types')),
                  r = p(e('../../../components/ui/chip')),
                  i = p(e('../../../components/ui/box')),
                  l = e('../../../components/component-library'),
                  c = e('../../../components/ui/chip/chip-with-input'),
                  u = e('../../../hooks/useI18nContext'),
                  d = e('../../../helpers/constants/design-system');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m({
                  secretRecoveryPhrase: e,
                  phraseRevealed: t,
                  confirmPhase: n,
                  setInputValue: s,
                  inputValue: p,
                  indicesToCheck: m,
                  hiddenPhrase: f,
                }) {
                  const g = (0, u.useI18nContext)(),
                    h = !1 === t;
                  return a.default.createElement(
                    i.default,
                    {
                      borderColor: d.BorderColor.borderMuted,
                      borderStyle: d.BorderStyle.solid,
                      padding: 4,
                      borderWidth: 1,
                      borderRadius: d.Size.MD,
                      display: d.DISPLAY.GRID,
                      marginBottom: 4,
                      className: 'recovery-phrase__secret',
                    },
                    a.default.createElement(
                      'div',
                      {
                        'data-testid': 'recovery-phrase-chips',
                        className: (0, o.default)('recovery-phrase__chips', {
                          'recovery-phrase__chips--hidden': h,
                        }),
                      },
                      e.map((e, t) =>
                        n && m && m.includes(t)
                          ? a.default.createElement(
                              'div',
                              { className: 'recovery-phrase__chip-item', key: t },
                              a.default.createElement(
                                'div',
                                { className: 'recovery-phrase__chip-item__number' },
                                `${t + 1}.`
                              ),
                              a.default.createElement(c.ChipWithInput, {
                                dataTestId: `recovery-phrase-input-${t}`,
                                borderColor: d.BorderColor.primaryDefault,
                                className: 'recovery-phrase__chip--with-input',
                                inputValue: p[t],
                                setInputValue: e => {
                                  s({ ...p, [t]: e });
                                },
                              })
                            )
                          : a.default.createElement(
                              'div',
                              { className: 'recovery-phrase__chip-item', key: t },
                              a.default.createElement(
                                'div',
                                { className: 'recovery-phrase__chip-item__number' },
                                `${t + 1}.`
                              ),
                              a.default.createElement(
                                r.default,
                                {
                                  dataTestId: `recovery-phrase-chip-${t}`,
                                  className: 'recovery-phrase__chip',
                                  borderColor: d.BorderColor.borderDefault,
                                },
                                e
                              )
                            )
                      )
                    ),
                    h &&
                      a.default.createElement(
                        'div',
                        { className: 'recovery-phrase__secret-blocker' },
                        !f &&
                          a.default.createElement(
                            a.default.Fragment,
                            null,
                            a.default.createElement('i', {
                              className: 'far fa-eye',
                              color: 'white',
                            }),
                            a.default.createElement(
                              l.Text,
                              {
                                variant: d.TextVariant.bodySm,
                                color: d.Color.overlayInverse,
                                className: 'recovery-phrase__secret-blocker--text',
                              },
                              g('makeSureNoOneWatching')
                            )
                          )
                      )
                  );
                }
                m.propTypes = {
                  secretRecoveryPhrase: s.default.array,
                  phraseRevealed: s.default.bool,
                  confirmPhase: s.default.bool,
                  setInputValue: s.default.func,
                  inputValue: s.default.object,
                  indicesToCheck: s.default.array,
                  hiddenPhrase: s.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/recovery-phrase/recovery-phrase-chips.js',
      },
    ],
    [
      7436,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/app/step-progress-bar': 6284,
        '../../../components/component-library': 6402,
        '../../../components/ui/button': 6707,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        './recovery-phrase-chips': 7435,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = b);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-router-dom'),
                  s = e('react-redux'),
                  r = E(e('prop-types')),
                  i = E(e('../../../components/ui/button')),
                  l = e('../../../hooks/useCopyToClipboard'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../helpers/constants/routes'),
                  d = e('../../../components/component-library'),
                  p = e('../../../helpers/constants/design-system'),
                  m = e('../../../components/app/step-progress-bar'),
                  f = e('../../../../shared/constants/metametrics'),
                  g = e('../../../contexts/metametrics'),
                  h = e('../../../selectors/selectors'),
                  y = E(e('./recovery-phrase-chips'));
                function E(e) {
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
                function b({ secretRecoveryPhrase: e }) {
                  const t = (0, o.useHistory)(),
                    n = (0, c.useI18nContext)(),
                    { search: r } = (0, o.useLocation)(),
                    E = (0, s.useSelector)(h.getHDEntropyIndex),
                    [v, b] = (0, l.useCopyToClipboard)(),
                    [_, k] = (0, a.useState)(!1),
                    [x, T] = (0, a.useState)(!1),
                    C = new URLSearchParams(r).get('isFromReminder') ? '/?isFromReminder=true' : '',
                    w = (0, a.useContext)(g.MetaMetricsContext);
                  return a.default.createElement(
                    'div',
                    { className: 'recovery-phrase', 'data-testid': 'recovery-phrase' },
                    a.default.createElement(m.ThreeStepProgressBar, {
                      stage: m.threeStepStages.RECOVERY_PHRASE_REVIEW,
                    }),
                    a.default.createElement(
                      d.Box,
                      {
                        justifyContent: p.JustifyContent.center,
                        textAlign: p.TextAlign.Center,
                        marginBottom: 4,
                      },
                      a.default.createElement(
                        d.Text,
                        {
                          variant: p.TextVariant.headingLg,
                          fontWeight: p.FontWeight.Bold,
                          className: 'recovery-phrase__header',
                        },
                        n('seedPhraseWriteDownHeader')
                      )
                    ),
                    a.default.createElement(
                      d.Box,
                      {
                        justifyContent: p.JustifyContent.center,
                        textAlign: p.TextAlign.Center,
                        marginBottom: 4,
                      },
                      a.default.createElement(
                        d.Text,
                        { variant: p.TextVariant.headingSm, fontWeight: p.FontWeight.Normal },
                        n('seedPhraseWriteDownDetails')
                      )
                    ),
                    a.default.createElement(
                      d.Box,
                      {
                        textAlign: p.TextAlign.Left,
                        marginBottom: 4,
                        className: 'recovery-phrase__tips',
                      },
                      a.default.createElement(
                        d.Text,
                        { variant: p.TextVariant.headingSm },
                        n('tips'),
                        ':'
                      ),
                      a.default.createElement(
                        'ul',
                        null,
                        a.default.createElement(
                          'li',
                          null,
                          a.default.createElement(
                            d.Text,
                            { variant: p.TextVariant.headingSm, fontWeight: p.FontWeight.Normal },
                            n('seedPhraseIntroSidebarBulletOne')
                          )
                        ),
                        a.default.createElement(
                          'li',
                          null,
                          a.default.createElement(
                            d.Text,
                            { variant: p.TextVariant.headingSm, fontWeight: p.FontWeight.Normal },
                            n('seedPhraseIntroSidebarBulletTwo')
                          )
                        )
                      )
                    ),
                    a.default.createElement(y.default, {
                      secretRecoveryPhrase: e.split(' '),
                      phraseRevealed: _ && !x,
                      hiddenPhrase: x,
                    }),
                    a.default.createElement(
                      'div',
                      { className: 'recovery-phrase__footer' },
                      _
                        ? a.default.createElement(
                            'div',
                            { className: 'recovery-phrase__footer__copy-and-hide' },
                            a.default.createElement(
                              'div',
                              { className: 'recovery-phrase__footer__copy-and-hide__area' },
                              a.default.createElement(
                                i.default,
                                {
                                  type: 'link',
                                  icon: a.default.createElement('i', {
                                    className: 'far fa-eye' + (x ? '' : '-slash'),
                                    color: 'var(--color-primary-default)',
                                  }),
                                  className:
                                    'recovery-phrase__footer__copy-and-hide__button recovery-phrase__footer__copy-and-hide__button__hide-seed',
                                  onClick: () => {
                                    T(!x);
                                  },
                                },
                                n(x ? 'revealTheSeedPhrase' : 'hideSeedPhrase')
                              ),
                              a.default.createElement(
                                i.default,
                                {
                                  onClick: () => {
                                    b(e);
                                  },
                                  icon: a.default.createElement(d.Icon, {
                                    name: v ? d.IconName.CopySuccess : d.IconName.Copy,
                                    color: p.IconColor.primaryDefault,
                                  }),
                                  className:
                                    'recovery-phrase__footer__copy-and-hide__button recovery-phrase__footer__copy-and-hide__button__copy-to-clipboard',
                                  type: 'link',
                                },
                                n(v ? 'copiedExclamation' : 'copyToClipboard')
                              )
                            ),
                            a.default.createElement(
                              i.default,
                              {
                                'data-testid': 'recovery-phrase-next',
                                type: 'primary',
                                className: 'recovery-phrase__footer--button',
                                onClick: () => {
                                  w({
                                    category: f.MetaMetricsEventCategory.Onboarding,
                                    event:
                                      f.MetaMetricsEventName
                                        .OnboardingWalletSecurityPhraseWrittenDown,
                                    properties: { hd_entropy_index: E },
                                  }),
                                    t.push(`${u.ONBOARDING_CONFIRM_SRP_ROUTE}${C}`);
                                },
                              },
                              n('next')
                            )
                          )
                        : a.default.createElement(
                            i.default,
                            {
                              'data-testid': 'recovery-phrase-reveal',
                              type: 'primary',
                              className: 'recovery-phrase__footer--button',
                              onClick: () => {
                                w({
                                  category: f.MetaMetricsEventCategory.Onboarding,
                                  event:
                                    f.MetaMetricsEventName.OnboardingWalletSecurityPhraseRevealed,
                                  properties: { hd_entropy_index: E },
                                }),
                                  k(!0);
                              },
                            },
                            n('revealSeedWords')
                          )
                    )
                  );
                }
                b.propTypes = { secretRecoveryPhrase: r.default.string };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/recovery-phrase/review-recovery-phrase.js',
      },
    ],
    [
      7437,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/app/step-progress-bar': 6284,
        '../../../components/component-library': 6402,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        './skip-srp-backup-popover': 7438,
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
                      t = (0, c.useI18nContext)(),
                      { search: n } = (0, s.useLocation)(),
                      a = (0, r.useSelector)(f.getHDEntropyIndex),
                      [h, y] = (0, o.useState)(!1),
                      E = new URLSearchParams(n).get('isFromReminder')
                        ? '/?isFromReminder=true'
                        : '',
                      v = (0, o.useContext)(u.MetaMetricsContext);
                    return o.default.createElement(
                      m.Box,
                      {
                        display: i.Display.Flex,
                        justifyContent: i.JustifyContent.center,
                        alignItems: i.AlignItems.center,
                        flexDirection: i.FlexDirection.Column,
                        className: 'secure-your-wallet',
                        'data-testid': 'secure-your-wallet',
                      },
                      h && o.default.createElement(g.default, { handleClose: () => y(!1) }),
                      o.default.createElement(l.ThreeStepProgressBar, {
                        stage: l.threeStepStages.RECOVERY_PHRASE_VIDEO,
                        marginBottom: 4,
                      }),
                      o.default.createElement(
                        m.Text,
                        {
                          variant: i.TextVariant.headingLg,
                          as: 'h2',
                          marginBottom: 4,
                          textAlign: i.TextAlign.Center,
                        },
                        t('seedPhraseIntroTitle')
                      ),
                      o.default.createElement(
                        m.Box,
                        { className: 'secure-your-wallet__srp-design-container' },
                        o.default.createElement('img', {
                          className: 'secure-your-wallet__srp-design-image',
                          src: './images/srp-lock-design.png',
                          alt: 'SRP Design',
                        })
                      ),
                      o.default.createElement(
                        m.Box,
                        {
                          className: 'secure-your-wallet__actions',
                          marginBottom: 8,
                          width: i.BlockSize.Full,
                          display: i.Display.Flex,
                          flexDirection: [i.FlexDirection.Column, i.FlexDirection.Row],
                          justifyContent: i.JustifyContent.spaceBetween,
                          gap: 4,
                        },
                        o.default.createElement(
                          m.Button,
                          {
                            'data-testid': 'secure-wallet-later',
                            variant: m.BUTTON_VARIANT.SECONDARY,
                            size: m.BUTTON_SIZES.LG,
                            block: !0,
                            onClick: () => {
                              v({
                                category: p.MetaMetricsEventCategory.Onboarding,
                                event: p.MetaMetricsEventName.OnboardingWalletSecuritySkipInitiated,
                                properties: { hd_entropy_index: a },
                              }),
                                y(!0);
                            },
                          },
                          t('seedPhraseIntroNotRecommendedButtonCopy')
                        ),
                        o.default.createElement(
                          m.Button,
                          {
                            'data-testid': 'secure-wallet-recommended',
                            size: m.BUTTON_SIZES.LG,
                            block: !0,
                            onClick: () => {
                              v({
                                category: p.MetaMetricsEventCategory.Onboarding,
                                event: p.MetaMetricsEventName.OnboardingWalletSecurityStarted,
                                properties: { hd_entropy_index: a },
                              }),
                                e.push(`${d.ONBOARDING_REVIEW_SRP_ROUTE}${E}`);
                            },
                          },
                          t('seedPhraseIntroRecommendedButtonCopy')
                        )
                      ),
                      o.default.createElement(
                        m.Box,
                        { className: 'secure-your-wallet__desc' },
                        o.default.createElement(
                          m.Text,
                          { as: 'h3', variant: i.TextVariant.headingSm },
                          t('seedPhraseIntroSidebarTitleOne')
                        ),
                        o.default.createElement(
                          m.Text,
                          { marginBottom: 4 },
                          t('seedPhraseIntroSidebarCopyOne')
                        ),
                        o.default.createElement(
                          m.Text,
                          { as: 'h3', variant: i.TextVariant.headingSm },
                          t('seedPhraseIntroSidebarTitleTwo')
                        ),
                        o.default.createElement(
                          m.Box,
                          { as: 'ul', className: 'secure-your-wallet__list', marginBottom: 4 },
                          o.default.createElement(
                            m.Text,
                            { as: 'li' },
                            t('seedPhraseIntroSidebarBulletOne')
                          ),
                          o.default.createElement(
                            m.Text,
                            { as: 'li' },
                            t('seedPhraseIntroSidebarBulletTwo')
                          )
                        ),
                        o.default.createElement(
                          m.Text,
                          { as: 'h3', variant: i.TextVariant.headingSm },
                          t('seedPhraseIntroSidebarTitleThree')
                        ),
                        o.default.createElement(
                          m.Text,
                          { as: 'p', marginBottom: 4 },
                          t('seedPhraseIntroSidebarCopyTwo')
                        ),
                        o.default.createElement(
                          m.Text,
                          {
                            as: 'h3',
                            variant: i.TextVariant.headingSm,
                            backgroundColor: i.BackgroundColor.primaryMuted,
                            padding: 4,
                            borderRadius: i.BorderRadius.LG,
                          },
                          t('seedPhraseIntroSidebarCopyThree')
                        )
                      )
                    );
                  });
                var a,
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-router-dom'),
                  r = e('react-redux'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../components/app/step-progress-bar'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../helpers/constants/routes'),
                  p = e('../../../../shared/constants/metametrics'),
                  m = e('../../../components/component-library'),
                  f = e('../../../selectors/selectors'),
                  g = (a = e('./skip-srp-backup-popover')) && a.__esModule ? a : { default: a };
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
        file: 'ui/pages/onboarding-flow/secure-your-wallet/secure-your-wallet.js',
      },
    ],
    [
      7438,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/button': 6707,
        '../../../components/ui/check-box': 6713,
        '../../../components/ui/popover': 6789,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = _);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = b(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = v(e('prop-types')),
                  s = e('react-router-dom'),
                  r = e('react-redux'),
                  i = e('../../../hooks/useI18nContext'),
                  l = v(e('../../../components/ui/button')),
                  c = v(e('../../../components/ui/popover')),
                  u = v(e('../../../components/ui/box')),
                  d = e('../../../components/component-library'),
                  p = e('../../../helpers/constants/design-system'),
                  m = e('../../../store/actions'),
                  f = v(e('../../../components/ui/check-box')),
                  g = e('../../../helpers/constants/routes'),
                  h = e('../../../../shared/constants/metametrics'),
                  y = e('../../../contexts/metametrics'),
                  E = e('../../../selectors/selectors');
                function v(e) {
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
                function _({ handleClose: e }) {
                  const [t, n] = (0, a.useState)(!1),
                    o = (0, i.useI18nContext)(),
                    v = (0, s.useHistory)(),
                    b = (0, r.useDispatch)(),
                    _ = (0, r.useSelector)(E.getHDEntropyIndex),
                    k = (0, a.useContext)(y.MetaMetricsContext);
                  return a.default.createElement(
                    c.default,
                    {
                      className: 'skip-srp-backup-popover',
                      footer: a.default.createElement(
                        u.default,
                        {
                          className: 'skip-srp-backup-popover__footer',
                          justifyContent: p.JustifyContent.center,
                          alignItems: p.AlignItems.center,
                        },
                        a.default.createElement(
                          l.default,
                          {
                            onClick: () => {
                              k({
                                category: h.MetaMetricsEventCategory.Onboarding,
                                event: h.MetaMetricsEventName.OnboardingWalletSecuritySkipCanceled,
                                properties: { hd_entropy_index: _ },
                              }),
                                e();
                            },
                            type: 'secondary',
                            rounded: !0,
                          },
                          o('goBack')
                        ),
                        a.default.createElement(
                          l.default,
                          {
                            'data-testid': 'skip-srp-backup',
                            disabled: !t,
                            type: 'primary',
                            rounded: !0,
                            onClick: async () => {
                              await b((0, m.setSeedPhraseBackedUp)(!1)),
                                k({
                                  category: h.MetaMetricsEventCategory.Onboarding,
                                  event:
                                    h.MetaMetricsEventName.OnboardingWalletSecuritySkipConfirmed,
                                  properties: { hd_entropy_index: _ },
                                }),
                                v.push(g.ONBOARDING_COMPLETION_ROUTE);
                            },
                          },
                          o('skip')
                        )
                      ),
                    },
                    a.default.createElement(
                      u.default,
                      {
                        flexDirection: p.FLEX_DIRECTION.COLUMN,
                        alignItems: p.AlignItems.center,
                        justifyContent: p.JustifyContent.center,
                        margin: 4,
                      },
                      a.default.createElement(d.Icon, {
                        name: d.IconName.Danger,
                        size: d.IconSize.Xl,
                        className: 'skip-srp-backup-popover__icon',
                        color: p.IconColor.errorDefault,
                      }),
                      a.default.createElement(
                        d.Text,
                        { variant: p.TextVariant.headingMd },
                        o('skipAccountSecurity')
                      ),
                      a.default.createElement(
                        u.default,
                        { justifyContent: p.JustifyContent.center, margin: 3 },
                        a.default.createElement(
                          'label',
                          { className: 'skip-srp-backup-popover__label' },
                          a.default.createElement(f.default, {
                            className: 'skip-srp-backup-popover__checkbox',
                            onClick: () => n(!t),
                            checked: t,
                            dataTestId: 'skip-srp-backup-popover-checkbox',
                          }),
                          a.default.createElement(
                            d.Text,
                            { className: 'skip-srp-backup-popover__details' },
                            o('skipAccountSecurityDetails')
                          )
                        )
                      )
                    )
                  );
                }
                _.propTypes = { handleClose: o.default.func };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/onboarding-flow/secure-your-wallet/skip-srp-backup-popover.js',
      },
    ],
    [
      7439,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/onboarding': 5807,
        '../../../components/component-library': 6402,
        '../../../components/ui/box': 6703,
        '../../../components/ui/button': 6707,
        '../../../components/ui/check-box': 6713,
        '../../../components/ui/mascot': 6771,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/build-types': 6897,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        events: 4465,
        react: 5328,
        'react-redux': 5286,
        'react-responsive-carousel': 5305,
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
                    const e = (0, h.useI18nContext)(),
                      t = (0, s.useDispatch)(),
                      n = (0, r.useHistory)(),
                      [T] = (0, o.useState)(new a.default()),
                      C = (0, s.useSelector)(_.getCurrentKeyring),
                      w = (0, s.useSelector)(_.getFirstTimeFlowType),
                      [A, S] = (0, o.useState)(!1),
                      [I, N] = (0, o.useState)(!1);
                    (0, o.useEffect)(() => {
                      C &&
                        !I &&
                        (w === k.FirstTimeFlowType.import &&
                          n.replace(b.ONBOARDING_COMPLETION_ROUTE),
                        w === k.FirstTimeFlowType.restore
                          ? n.replace(b.ONBOARDING_COMPLETION_ROUTE)
                          : n.replace(b.ONBOARDING_SECURE_YOUR_WALLET_ROUTE));
                    }, [C, n, w, I]);
                    const O = (0, o.useContext)(y.MetaMetricsContext),
                      M = e('agreeTermsOfUse', [
                        o.default.createElement(
                          'a',
                          {
                            className: 'create-new-vault__terms-link',
                            key: 'create-new-vault__link-text',
                            href: 'https://metamask.io/terms.html',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          },
                          e('terms')
                        ),
                      ]);
                    return o.default.createElement(
                      'div',
                      { className: 'onboarding-welcome', 'data-testid': 'onboarding-welcome' },
                      o.default.createElement(
                        i.Carousel,
                        { showThumbs: !1, showStatus: !1, showArrows: !0 },
                        o.default.createElement(
                          'div',
                          null,
                          o.default.createElement(
                            p.Text,
                            {
                              variant: g.TextVariant.headingLg,
                              as: 'h2',
                              textAlign: g.TextAlign.Center,
                              fontWeight: g.FontWeight.Bold,
                            },
                            e('welcomeToMetaMask')
                          ),
                          o.default.createElement(
                            p.Text,
                            { textAlign: g.TextAlign.Center, marginLeft: 6, marginRight: 6 },
                            e('welcomeToMetaMaskIntro')
                          ),
                          o.default.createElement(
                            'div',
                            { className: 'onboarding-welcome__mascot' },
                            (0, x.isFlask)() || (0, x.isBeta)()
                              ? o.default.createElement('img', {
                                  src: './images/logo/metamask-fox.svg',
                                  width: '240',
                                  height: '240',
                                })
                              : o.default.createElement(u.default, {
                                  animationEventEmitter: T,
                                  width: '250',
                                  height: '300',
                                })
                          )
                        ),
                        o.default.createElement(
                          'div',
                          null,
                          o.default.createElement(
                            p.Text,
                            {
                              variant: g.TextVariant.headingLg,
                              as: 'h2',
                              textAlign: g.TextAlign.Center,
                              fontWeight: g.FontWeight.Bold,
                            },
                            e('welcomeExploreTitle')
                          ),
                          o.default.createElement(
                            p.Text,
                            { textAlign: g.TextAlign.Center },
                            e('welcomeExploreDescription')
                          ),
                          o.default.createElement(
                            'div',
                            { className: 'onboarding-welcome__image' },
                            o.default.createElement('img', {
                              src: '/images/onboarding-welcome-say-hello.png',
                              width: '200',
                              height: '275',
                              style: { objectFit: 'contain' },
                              alt: 'onboarding-welcome-say-hello',
                            })
                          )
                        ),
                        o.default.createElement(
                          'div',
                          null,
                          o.default.createElement(
                            p.Text,
                            {
                              variant: g.TextVariant.headingLg,
                              as: 'h2',
                              textAlign: g.TextAlign.Center,
                              fontWeight: g.FontWeight.Bold,
                            },
                            e('welcomeLoginTitle')
                          ),
                          o.default.createElement(
                            p.Text,
                            { textAlign: g.TextAlign.Center },
                            e('welcomeLoginDescription')
                          ),
                          o.default.createElement(
                            'div',
                            { className: 'onboarding-welcome__image' },
                            o.default.createElement('img', {
                              src: '/images/onboarding-welcome-decentralised-apps.png',
                              width: '200',
                              height: '275',
                              alt: 'onboarding-welcome-decentralised-apps',
                              style: { objectFit: 'contain' },
                            })
                          )
                        )
                      ),
                      o.default.createElement(
                        'ul',
                        { className: 'onboarding-welcome__buttons' },
                        o.default.createElement(
                          'li',
                          null,
                          o.default.createElement(
                            f.default,
                            {
                              alignItems: g.AlignItems.center,
                              className: 'onboarding__terms-of-use',
                            },
                            o.default.createElement(m.default, {
                              id: 'onboarding__terms-checkbox',
                              className: 'onboarding__terms-checkbox',
                              dataTestId: 'onboarding-terms-checkbox',
                              checked: A,
                              onClick: () => {
                                S(e => !e);
                              },
                            }),
                            o.default.createElement(
                              'label',
                              {
                                className: 'onboarding__terms-label',
                                htmlFor: 'onboarding__terms-checkbox',
                              },
                              o.default.createElement(
                                p.Text,
                                { variant: g.TextVariant.bodyMd, marginLeft: 2, as: 'span' },
                                M
                              )
                            )
                          )
                        ),
                        o.default.createElement(
                          'li',
                          null,
                          o.default.createElement(
                            d.default,
                            {
                              'data-testid': 'onboarding-create-wallet',
                              type: 'primary',
                              onClick: async () => {
                                N(!0),
                                  t((0, v.setFirstTimeFlowType)(k.FirstTimeFlowType.create)),
                                  O({
                                    category: E.MetaMetricsEventCategory.Onboarding,
                                    event: E.MetaMetricsEventName.OnboardingWalletCreationStarted,
                                    properties: { account_type: 'metamask' },
                                  }),
                                  t((0, v.setTermsOfUseLastAgreed)(new Date().getTime())),
                                  n.push(
                                    (0, l.getPlatform)() === c.PLATFORM_FIREFOX
                                      ? b.ONBOARDING_CREATE_PASSWORD_ROUTE
                                      : b.ONBOARDING_METAMETRICS
                                  );
                              },
                              disabled: !A,
                            },
                            e('onboardingCreateWallet')
                          )
                        ),
                        o.default.createElement(
                          'li',
                          null,
                          o.default.createElement(
                            d.default,
                            {
                              'data-testid': 'onboarding-import-wallet',
                              type: 'secondary',
                              onClick: async () => {
                                await t((0, v.setFirstTimeFlowType)(k.FirstTimeFlowType.import)),
                                  O({
                                    category: E.MetaMetricsEventCategory.Onboarding,
                                    event: E.MetaMetricsEventName.OnboardingWalletImportStarted,
                                    properties: { account_type: 'imported' },
                                  }),
                                  t((0, v.setTermsOfUseLastAgreed)(new Date().getTime())),
                                  n.push(
                                    (0, l.getPlatform)() === c.PLATFORM_FIREFOX
                                      ? b.ONBOARDING_IMPORT_WITH_SRP_ROUTE
                                      : b.ONBOARDING_METAMETRICS
                                  );
                              },
                              disabled: !A,
                            },
                            e('onboardingImportWallet')
                          )
                        )
                      )
                    );
                  });
                var a = C(e('events')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = T(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('react-responsive-carousel'),
                  l = e('../../../../app/scripts/lib/util'),
                  c = e('../../../../shared/constants/app'),
                  u = C(e('../../../components/ui/mascot')),
                  d = C(e('../../../components/ui/button')),
                  p = e('../../../components/component-library'),
                  m = C(e('../../../components/ui/check-box')),
                  f = C(e('../../../components/ui/box')),
                  g = e('../../../helpers/constants/design-system'),
                  h = e('../../../hooks/useI18nContext'),
                  y = e('../../../contexts/metametrics'),
                  E = e('../../../../shared/constants/metametrics'),
                  v = e('../../../store/actions'),
                  b = e('../../../helpers/constants/routes'),
                  _ = e('../../../selectors'),
                  k = e('../../../../shared/constants/onboarding'),
                  x = e('../../../helpers/utils/build-types');
                function T(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (T = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/onboarding-flow/welcome/welcome.js' },
    ],
    [
      7440,
      {
        '../../../components/app/permissions-connect-footer': 6131,
        '../../../components/component-library': 6402,
        '../../../components/ui/account-list': 6696,
        '../../../components/ui/page-container': 6783,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '@metamask/keyring-api': 2014,
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
                var a = f(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = m(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('@metamask/permission-controller'),
                  r = e('@metamask/keyring-api'),
                  i = e('../../../hooks/useI18nContext'),
                  l = f(e('../../../components/app/permissions-connect-footer')),
                  c = f(e('../../../components/ui/account-list')),
                  u = e('../../../components/ui/page-container'),
                  d = e('../../../helpers/constants/design-system'),
                  p = e('../../../components/component-library');
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
                const g = ({
                  selectedAccountAddresses: e,
                  addressLastConnectedMap: t = {},
                  accounts: n,
                  selectAccounts: a,
                  selectNewAccountViaModal: m,
                  cancelPermissionsRequest: f,
                  permissionsRequestId: g,
                  targetSubjectMetadata: h,
                  nativeCurrency: y,
                }) => {
                  const [E, v] = (0, o.useState)(e),
                    b = n.filter(e => (0, r.isEvmAccountType)(e.type)),
                    _ = (0, i.useI18nContext)(),
                    k = Object.keys(e).length > b.length,
                    x =
                      0 === n.length
                        ? _('connectAccountOrCreate')
                        : (null == h ? void 0 : h.subjectType) === s.SubjectType.Snap
                          ? _('selectAccountsForSnap')
                          : _('selectAccounts');
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      p.Box,
                      {
                        className: 'permissions-connect-choose-account__content',
                        display: d.Display.Flex,
                        flexDirection: d.FlexDirection.Column,
                        backgroundColor: d.BackgroundColor.backgroundAlternative,
                        width: d.BlockSize.Full,
                        height: d.BlockSize.Full,
                        paddingLeft: 6,
                        paddingRight: 6,
                      },
                      o.default.createElement(
                        p.Box,
                        {
                          display: d.Display.Flex,
                          flexDirection: d.FlexDirection.Column,
                          justifyContent: d.JustifyContent.center,
                          alignItems: d.AlignItems.center,
                          paddingTop: 4,
                          paddingBottom: 4,
                        },
                        o.default.createElement(
                          p.Text,
                          { variant: d.TextVariant.headingMd },
                          _('connectWithMetaMask')
                        ),
                        o.default.createElement(p.Text, { variant: d.TextVariant.bodyMd }, x)
                      ),
                      o.default.createElement(c.default, {
                        accounts: n,
                        selectNewAccountViaModal: m,
                        addressLastConnectedMap: t,
                        nativeCurrency: y,
                        selectedAccounts: E,
                        allAreSelected: () => b.length === E.size,
                        deselectAll: () => {
                          v(new Set());
                        },
                        selectAll: () => {
                          const e = new Set(b.map(e => e.address));
                          v(e);
                        },
                        handleAccountClick: e => {
                          const t = new Set(E);
                          t.has(e) ? t.delete(e) : t.add(e), v(t);
                        },
                      })
                    ),
                    o.default.createElement(
                      p.Box,
                      {
                        backgroundColor: d.BackgroundColor.backgroundAlternative,
                        className: 'permissions-connect-choose-account__footer',
                        paddingTop: 4,
                      },
                      (null == h ? void 0 : h.subjectType) !== s.SubjectType.Snap &&
                        o.default.createElement(l.default, null),
                      o.default.createElement(u.PageContainerFooter, {
                        cancelButtonType: 'default',
                        onCancel: () => f(g),
                        cancelText: _('cancel'),
                        onSubmit: () => a(E),
                        submitText: _('next'),
                        disabled: k || 0 === E.size,
                      })
                    )
                  );
                };
                g.propTypes = {
                  accounts: a.default.arrayOf(
                    a.default.shape({
                      address: a.default.string,
                      addressLabel: a.default.string,
                      lastConnectedDate: a.default.string,
                      balance: a.default.string,
                    })
                  ).isRequired,
                  selectAccounts: a.default.func.isRequired,
                  selectNewAccountViaModal: a.default.func.isRequired,
                  nativeCurrency: a.default.string.isRequired,
                  addressLastConnectedMap: a.default.object,
                  cancelPermissionsRequest: a.default.func.isRequired,
                  permissionsRequestId: a.default.string.isRequired,
                  selectedAccountAddresses: a.default.object.isRequired,
                  targetSubjectMetadata: a.default.shape({
                    extensionId: a.default.string,
                    iconUrl: a.default.string,
                    name: a.default.string,
                    origin: a.default.string.isRequired,
                    subjectType: a.default.string,
                  }),
                };
                n.default = g;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/choose-account/choose-account.js' },
    ],
    [
      7441,
      { './choose-account': 7440 },
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
                  o = (a = e('./choose-account')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/choose-account/index.js' },
    ],
    [
      7442,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts': 5840,
        '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-chainids': 5841,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/modules/string-utils': 5878,
        '../../../components/component-library': 6402,
        '../../../components/multichain': 6574,
        '../../../components/multichain/create-solana-account-modal/create-solana-account-modal': 6550,
        '../../../components/multichain/pages/page': 6652,
        '../../../components/multichain/pages/review-permissions-page/site-cell/site-cell': 6659,
        '../../../components/ui/tabs': 6806,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        './utils': 7443,
        '@metamask/chain-agnostic-permission': 1498,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ConnectPage = void 0);
                var a,
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = S(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-redux'),
                  r = e('@metamask/chain-agnostic-permission'),
                  i = e('@metamask/utils'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../selectors'),
                  u = e('../../../../shared/modules/selectors/networks'),
                  d = e('../../../components/component-library'),
                  p = e('../../../components/multichain/pages/page'),
                  m = e(
                    '../../../components/multichain/pages/review-permissions-page/site-cell/site-cell'
                  ),
                  f = e('../../../helpers/constants/design-system'),
                  g = e('../../../../shared/constants/network'),
                  h = e('../../../selectors/multichain'),
                  y = e('../../../components/ui/tabs'),
                  E = e('../../../components/multichain'),
                  v = e('../../../helpers/utils/util'),
                  b =
                    (a = e('../../../helpers/constants/zendesk-url')) && a.__esModule
                      ? a
                      : { default: a },
                  _ = e('../../../../shared/constants/metametrics'),
                  k = e('../../../contexts/metametrics'),
                  x = e(
                    '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-chainids'
                  ),
                  T = e(
                    '../../../../shared/lib/multichain/chain-agnostic-permission-utils/caip-accounts'
                  ),
                  C = e('../../../../shared/modules/string-utils'),
                  w = e(
                    '../../../components/multichain/create-solana-account-modal/create-solana-account-modal'
                  ),
                  A = e('./utils');
                function S(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (S = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.ConnectPage = ({
                  request: e,
                  permissionsRequestId: t,
                  rejectPermissionsRequest: n,
                  approveConnection: a,
                  targetSubjectMetadata: S,
                }) => {
                  var I;
                  const N = (0, l.useI18nContext)(),
                    O = (0, o.useContext)(k.MetaMetricsContext),
                    M = (0, A.getRequestedCaip25CaveatValue)(e.permissions),
                    B = (0, T.getCaipAccountIdsFromCaip25CaveatValue)(M),
                    R = (0, x.getAllScopesFromCaip25CaveatValue)(M),
                    D =
                      null === (I = e.metadata) || void 0 === I
                        ? void 0
                        : I.promptToCreateSolanaAccount,
                    P = (0, s.useSelector)(u.getAllNetworkConfigurationsByCaipChainId),
                    [F, L] = (0, o.useMemo)(
                      () =>
                        Object.entries(P).reduce(
                          ([e, t], [n, a]) => {
                            const o = n;
                            return (
                              (g.CAIP_FORMATTED_EVM_TEST_CHAINS.includes(o) ? t : e).push({
                                ...a,
                                caipChainId: o,
                              }),
                              [e, t]
                            );
                          },
                          [[], []]
                        ),
                      [P]
                    ),
                    j = (0, o.useMemo)(() => [...F, ...L].map(({ caipChainId: e }) => e), [F, L]),
                    U = R.filter(e => j.includes(e)),
                    [W, G] = (0, o.useState)(!1),
                    [V, z] = (0, o.useState)(!1),
                    Q = (0, s.useSelector)(h.getMultichainNetwork).chainId,
                    q = L.find(e => e.caipChainId === Q),
                    H = q
                      ? [...F, q].map(({ caipChainId: e }) => e)
                      : F.map(({ caipChainId: e }) => e),
                    Y = U.length > 0 ? U : H,
                    [Z, J] = (0, o.useState)(Y),
                    K = (0, s.useSelector)(c.getUpdatedAndSortedAccountsWithCaipAccountId),
                    X = (0, x.getAllNonWalletNamespacesFromCaip25CaveatValue)(M),
                    $ = K.filter(e => {
                      const {
                        chain: { namespace: t },
                      } = (0, i.parseCaipAccountId)(e.caipAccountId);
                      return X.includes(t);
                    }),
                    ee = B.reduce((e, t) => {
                      const n = $.find(({ caipAccountId: e }) => {
                        const {
                          chain: { namespace: n },
                        } = (0, i.parseCaipAccountId)(e);
                        return n === i.KnownCaipNamespace.Eip155
                          ? (0, C.isEqualCaseInsensitive)(e, t)
                          : e === t;
                      });
                      return n && e.push(n), e;
                    }, []),
                    te = (0, A.getDefaultAccounts)(X, ee, $).map(({ caipAccountId: e }) => e),
                    [ne, ae] = (0, o.useState)(te),
                    oe = (0, o.useCallback)(
                      e => {
                        let t = [...Z];
                        e.forEach(e => {
                          const {
                            chain: { namespace: n },
                          } = (0, i.parseCaipAccountId)(e);
                          if (
                            !t.some(e => {
                              try {
                                const { namespace: t } = (0, i.parseCaipChainId)(e);
                                return n === t;
                              } catch (e) {
                                return !1;
                              }
                            })
                          ) {
                            const e = j.filter(e => {
                              try {
                                const { namespace: t } = (0, i.parseCaipChainId)(e);
                                return n === t;
                              } catch (e) {
                                return !1;
                              }
                            });
                            t = [...t, ...e];
                          }
                        }),
                          J(t),
                          ae(e);
                      },
                      [ae, Z, J, j]
                    ),
                    se = K.filter(({ caipAccountId: e }) => ne.some(t => t === e)),
                    re = (0, o.useMemo)(
                      () =>
                        K.some(({ caipAccountId: e }) => {
                          const { chain: t } = (0, i.parseCaipAccountId)(e);
                          return t.namespace === i.KnownCaipNamespace.Solana;
                        }),
                      [K]
                    ),
                    ie = (0, o.useCallback)(() => {
                      G(!0),
                        O({
                          category: _.MetaMetricsEventCategory.Navigation,
                          event: _.MetaMetricsEventName.ViewPermissionedAccounts,
                          properties: {
                            location:
                              'Connect view (accounts tab), Permissions toast, Permissions (dapp)',
                          },
                        });
                    }, [O]),
                    le = (0, o.useCallback)(() => {
                      z(!0);
                    }, []),
                    ce = (0, o.useCallback)(() => {
                      z(!1);
                    }, []),
                    ue = (0, o.useCallback)(() => {
                      G(!1);
                    }, []),
                    de = (0, o.useCallback)(() => {
                      n(t);
                    }, [t, n]),
                    pe = (0, o.useCallback)(() => {
                      const t = {
                        ...e,
                        permissions: { ...e.permissions, ...(0, r.generateCaip25Caveat)(M, ne, Z) },
                      };
                      a(t);
                    }, [e, M, ne, Z, a]),
                    me = (0, v.transformOriginToTitle)(S.origin);
                  return o.default.createElement(
                    p.Page,
                    {
                      'data-testid': 'connect-page',
                      className: 'main-container connect-page',
                      backgroundColor: f.BackgroundColor.backgroundAlternative,
                    },
                    o.default.createElement(
                      p.Header,
                      { paddingBottom: 0 },
                      o.default.createElement(
                        d.Box,
                        {
                          display: f.Display.Flex,
                          justifyContent: f.JustifyContent.center,
                          marginBottom: 2,
                        },
                        S.iconUrl
                          ? o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                d.Box,
                                {
                                  style: {
                                    filter: 'blur(20px) brightness(1.2)',
                                    position: 'absolute',
                                  },
                                },
                                o.default.createElement(d.AvatarFavicon, {
                                  backgroundColor: f.BackgroundColor.backgroundAlternative,
                                  size: d.AvatarFaviconSize.Xl,
                                  src: S.iconUrl,
                                  name: me,
                                })
                              ),
                              o.default.createElement(d.AvatarFavicon, {
                                backgroundColor: f.BackgroundColor.backgroundAlternative,
                                size: d.AvatarFaviconSize.Lg,
                                src: S.iconUrl,
                                name: me,
                                style: { zIndex: 1, background: 'transparent' },
                              })
                            )
                          : o.default.createElement(
                              d.AvatarBase,
                              {
                                size: d.AvatarBaseSize.Lg,
                                display: f.Display.Flex,
                                alignItems: f.AlignItems.center,
                                justifyContent: f.JustifyContent.center,
                                color: f.TextColor.textAlternative,
                                style: { borderWidth: '0px' },
                                backgroundColor: f.BackgroundColor.backgroundAlternativeSoft,
                              },
                              (0, v.isIpAddress)(me) ? '?' : (0, v.getAvatarFallbackLetter)(me)
                            )
                      ),
                      o.default.createElement(
                        d.Text,
                        { variant: f.TextVariant.headingLg, marginTop: 2, marginBottom: 2 },
                        me
                      ),
                      o.default.createElement(
                        d.Box,
                        { display: f.Display.Flex, justifyContent: f.JustifyContent.center },
                        o.default.createElement(d.Text, null, N('connectionDescription')),
                        o.default.createElement(
                          d.ButtonLink,
                          {
                            paddingLeft: 1,
                            key: 'permission-connect-footer-learn-more-link',
                            size: d.ButtonLinkSize.Inherit,
                            target: '_blank',
                            onClick: () => {
                              global.platform.openTab({ url: b.default.USER_GUIDE_DAPPS });
                            },
                          },
                          N('learnMoreUpperCase')
                        )
                      )
                    ),
                    o.default.createElement(
                      p.Content,
                      {
                        paddingLeft: 4,
                        paddingRight: 4,
                        backgroundColor: f.BackgroundColor.transparent,
                      },
                      o.default.createElement(
                        y.Tabs,
                        {
                          onTabClick: () => null,
                          backgroundColor: f.BackgroundColor.transparent,
                          justifyContent: f.JustifyContent.center,
                          defaultActiveTabKey: 'accounts',
                          tabListProps: { backgroundColor: f.BackgroundColor.transparent },
                        },
                        o.default.createElement(
                          y.Tab,
                          {
                            name: N('accounts'),
                            tabKey: 'accounts',
                            width: f.BlockSize.Full,
                            'data-testid': 'accounts-tab',
                          },
                          o.default.createElement(
                            d.Box,
                            { marginTop: 4 },
                            o.default.createElement(
                              d.Box,
                              {
                                backgroundColor: f.BackgroundColor.backgroundDefault,
                                borderRadius: f.BorderRadius.XL,
                                style: {
                                  overflow: 'auto',
                                  maxHeight: '268px',
                                  scrollbarColor: 'var(--color-icon-muted) transparent',
                                },
                              },
                              se.map(e =>
                                o.default.createElement(E.AccountListItem, {
                                  account: e,
                                  key: e.caipAccountId,
                                  selected: !1,
                                })
                              ),
                              0 === se.length &&
                                !D &&
                                o.default.createElement(
                                  d.Box,
                                  {
                                    className: 'connect-page__accounts-empty',
                                    display: f.Display.Flex,
                                    justifyContent: f.JustifyContent.center,
                                    alignItems: f.AlignItems.center,
                                    borderRadius: f.BorderRadius.XL,
                                  },
                                  o.default.createElement(
                                    d.ButtonLink,
                                    { onClick: ie, 'data-testid': 'edit' },
                                    N('selectAccountToConnect')
                                  )
                                )
                            ),
                            se.length > 0 &&
                              o.default.createElement(
                                d.Box,
                                {
                                  marginTop: 4,
                                  display: f.Display.Flex,
                                  justifyContent: f.JustifyContent.center,
                                },
                                o.default.createElement(
                                  d.ButtonLink,
                                  { onClick: ie, 'data-testid': 'edit' },
                                  N('editAccounts')
                                )
                              ),
                            D &&
                              !re &&
                              o.default.createElement(
                                d.Box,
                                {
                                  display: f.Display.Flex,
                                  flexDirection: f.FlexDirection.Column,
                                  justifyContent: f.JustifyContent.center,
                                  alignItems: f.AlignItems.center,
                                  marginTop: 4,
                                  gap: 2,
                                },
                                o.default.createElement(
                                  d.Text,
                                  {
                                    variant: f.TextVariant.bodyMd,
                                    color: f.TextColor.textAlternative,
                                    textAlign: f.TextAlign.Center,
                                  },
                                  0 === se.length
                                    ? N('solanaAccountRequired')
                                    : N('solanaAccountRequested')
                                ),
                                o.default.createElement(
                                  d.Button,
                                  {
                                    variant: d.ButtonVariant.Secondary,
                                    width: f.BlockSize.Full,
                                    size: d.ButtonSize.Lg,
                                    onClick: le,
                                    'data-testid': 'create-solana-account',
                                  },
                                  N('createSolanaAccount')
                                )
                              ),
                            V &&
                              o.default.createElement(w.CreateSolanaAccountModal, { onClose: ce }),
                            W &&
                              o.default.createElement(E.EditAccountsModal, {
                                accounts: K,
                                defaultSelectedAccountAddresses: ne,
                                onClose: ue,
                                onSubmit: oe,
                              })
                          )
                        ),
                        o.default.createElement(
                          y.Tab,
                          {
                            name: N('permissions'),
                            tabKey: 'permissions',
                            width: f.BlockSize.Full,
                            'data-testid': 'permissions-tab',
                            disabled: D && !re && 0 === se.length,
                          },
                          o.default.createElement(
                            d.Box,
                            { marginTop: 4 },
                            o.default.createElement(m.SiteCell, {
                              nonTestNetworks: F,
                              testNetworks: L,
                              accounts: K,
                              onSelectAccountAddresses: oe,
                              onSelectChainIds: J,
                              selectedAccountAddresses: ne,
                              selectedChainIds: Z,
                              isConnectFlow: !0,
                            })
                          )
                        )
                      )
                    ),
                    o.default.createElement(
                      p.Footer,
                      null,
                      o.default.createElement(
                        d.Box,
                        {
                          display: f.Display.Flex,
                          flexDirection: f.FlexDirection.Column,
                          gap: 4,
                          width: f.BlockSize.Full,
                        },
                        o.default.createElement(
                          d.Box,
                          { display: f.Display.Flex, gap: 4, width: f.BlockSize.Full },
                          o.default.createElement(
                            d.Button,
                            {
                              block: !0,
                              variant: d.ButtonVariant.Secondary,
                              size: d.ButtonSize.Lg,
                              'data-testid': 'cancel-btn',
                              onClick: de,
                            },
                            N('cancel')
                          ),
                          o.default.createElement(
                            d.Button,
                            {
                              block: !0,
                              'data-testid': 'confirm-btn',
                              size: d.ButtonSize.Lg,
                              onClick: pe,
                              disabled: 0 === ne.length || 0 === Z.length,
                            },
                            N('connect')
                          )
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/connect-page/connect-page.tsx' },
    ],
    [
      7443,
      {
        '../../../helpers/utils/util': 6921,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getCaip25PermissionsResponse = function (e, t, n) {
                    const a = (0, o.setPermittedEthChainIds)(e, n),
                      s = (0, o.setEthAccounts)(a, t);
                    return {
                      [o.Caip25EndowmentPermissionName]: {
                        caveats: [{ type: o.Caip25CaveatType, value: s }],
                      },
                    };
                  }),
                  (n.getDefaultAccounts = function (e, t, n) {
                    const o = [],
                      r = new Set();
                    t.forEach(t => {
                      const {
                        chain: { namespace: n },
                      } = (0, a.parseCaipAccountId)(t.caipAccountId);
                      e.includes(n) && (o.push(t), r.add(n));
                    });
                    const i = e.filter(e => !r.has(e));
                    if (i.length > 0) {
                      const e = (0, s.sortSelectedInternalAccounts)(n);
                      for (const t of i) {
                        const n = e.find(e => {
                          const {
                            chain: { namespace: n },
                          } = (0, a.parseCaipAccountId)(e.caipAccountId);
                          return n === t;
                        });
                        n && o.push(n);
                      }
                    }
                    return o;
                  }),
                  (n.getRequestedCaip25CaveatValue = function (e) {
                    var t;
                    return (
                      (null == e ||
                      null === (t = e[o.Caip25EndowmentPermissionName]) ||
                      void 0 === t ||
                      null === (t = t.caveats) ||
                      void 0 === t ||
                      null === (t = t.find(e => e.type === o.Caip25CaveatType)) ||
                      void 0 === t
                        ? void 0
                        : t.value) ?? {
                        optionalScopes: {},
                        requiredScopes: {},
                        sessionProperties: {},
                        isMultichainOrigin: !1,
                      }
                    );
                  });
                var a = e('@metamask/utils'),
                  o = e('@metamask/chain-agnostic-permission'),
                  s = e('../../../helpers/utils/util');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/connect-page/utils.ts' },
    ],
    [
      7444,
      { './permissions-connect.container': 7446 },
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
                    (a = e('./permissions-connect.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/index.js' },
    ],
    [
      7445,
      {
        '../../../app/scripts/lib/multichain/address': 142,
        '../../../shared/constants/time': 5817,
        '../../components/app/permission-page-container': 6125,
        '../../components/app/snaps/snap-authorship-header/snap-authorship-header': 6160,
        '../../components/component-library': 6402,
        '../../helpers/constants/routes': 6878,
        './choose-account': 7441,
        './connect-page/connect-page': 7442,
        './connect-page/utils': 7443,
        './redirect': 7447,
        './snaps/snap-install': 7449,
        './snaps/snap-result': 7451,
        './snaps/snap-update': 7453,
        './snaps/snaps-connect': 7455,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/permission-controller': 2421,
        '@metamask/rpc-errors': 2585,
        '@metamask/snaps-utils': 2890,
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
                var a = C(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = T(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-router-dom'),
                  r = e('@metamask/rpc-errors'),
                  i = e('@metamask/permission-controller'),
                  l = e('@metamask/snaps-utils'),
                  c = e('@metamask/chain-agnostic-permission'),
                  u = e('../../../app/scripts/lib/multichain/address'),
                  d = e('../../../shared/constants/time'),
                  p = e('../../helpers/constants/routes'),
                  m = C(e('../../components/app/permission-page-container')),
                  f = e('../../components/component-library'),
                  g = C(
                    e('../../components/app/snaps/snap-authorship-header/snap-authorship-header')
                  ),
                  h = C(e('./choose-account')),
                  y = C(e('./redirect')),
                  E = C(e('./snaps/snaps-connect')),
                  v = C(e('./snaps/snap-install')),
                  b = C(e('./snaps/snap-update')),
                  _ = C(e('./snaps/snap-result')),
                  k = e('./connect-page/connect-page'),
                  x = e('./connect-page/utils');
                function T(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (T = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function w(e, t, n) {
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
                const A = 1200 * d.MILLISECOND;
                function S(e, t) {
                  const n = (0, x.getRequestedCaip25CaveatValue)(t),
                    a = (0, c.getEthAccounts)(n);
                  return a.length > 0
                    ? new Set(a.map(e => e.toLowerCase()).filter(u.isEthAddress))
                    : new Set((0, u.isEthAddress)(e) ? [e] : []);
                }
                function I(e) {
                  const t = (0, x.getRequestedCaip25CaveatValue)(e);
                  return (0, c.getPermittedEthChainIds)(t);
                }
                class N extends o.Component {
                  constructor(...e) {
                    var t;
                    super(...e),
                      w(this, 'state', {
                        redirecting: !1,
                        selectedAccountAddresses: S(
                          this.props.currentAddress,
                          null === (t = this.props.permissionsRequest) || void 0 === t
                            ? void 0
                            : t.permissions
                        ),
                        permissionsApproved: null,
                        origin: this.props.origin,
                        targetSubjectMetadata: this.props.targetSubjectMetadata || {},
                        snapsInstallPrivacyWarningShown: this.props.snapsInstallPrivacyWarningShown,
                      }),
                      w(this, 'selectAccounts', e => {
                        const {
                          confirmPermissionPath: t,
                          requestType: n,
                          snapsConnectPath: a,
                          snapInstallPath: o,
                          snapUpdatePath: s,
                          snapResultPath: r,
                        } = this.props;
                        this.setState({ selectedAccountAddresses: e }, () => {
                          switch (n) {
                            case 'wallet_installSnap':
                              this.props.history.push(o);
                              break;
                            case 'wallet_updateSnap':
                              this.props.history.push(s);
                              break;
                            case 'wallet_installSnapResult':
                              this.props.history.push(r);
                              break;
                            case 'wallet_connectSnaps':
                              this.props.history.replace(a);
                              break;
                            default:
                              this.props.history.push(t);
                          }
                        });
                      }),
                      w(this, 'cancelPermissionsRequest', async e => {
                        const { rejectPermissionsRequest: t } = this.props;
                        e && (await t(e), this.redirect(!1));
                      }),
                      w(this, 'approveConnection', (...e) => {
                        const { approvePermissionsRequest: t } = this.props;
                        t(...e), this.redirect(!0);
                      });
                  }
                  componentDidMount() {
                    const {
                      connectPath: e,
                      confirmPermissionPath: t,
                      snapsConnectPath: n,
                      snapInstallPath: a,
                      snapUpdatePath: o,
                      snapResultPath: s,
                      requestType: r,
                      getRequestAccountTabIds: i,
                      permissionsRequest: l,
                      history: c,
                      isRequestingAccounts: u,
                    } = this.props;
                    if ((i(), l)) {
                      if (c.location.pathname === e && !u)
                        switch (r) {
                          case 'wallet_installSnap':
                            c.replace(a);
                            break;
                          case 'wallet_updateSnap':
                            c.replace(o);
                            break;
                          case 'wallet_installSnapResult':
                            c.replace(s);
                            break;
                          case 'wallet_connectSnaps':
                            c.replace(n);
                            break;
                          default:
                            c.replace(t);
                        }
                    } else c.replace(p.DEFAULT_ROUTE);
                  }
                  componentDidUpdate(e) {
                    var t;
                    const {
                        permissionsRequest: n,
                        lastConnectedInfo: a,
                        targetSubjectMetadata: o,
                      } = this.props,
                      { redirecting: s, origin: r } = this.state;
                    if (
                      (null != o &&
                        o.origin &&
                        (null === (t = e.targetSubjectMetadata) || void 0 === t
                          ? void 0
                          : t.origin) !== (null == o ? void 0 : o.origin) &&
                        this.setState({ targetSubjectMetadata: o }),
                      !n && e.permissionsRequest && !s)
                    ) {
                      var i, l;
                      const t =
                        ((null === (i = a[r]) || void 0 === i ? void 0 : i.lastApproved) || 0) >
                        ((null === (l = e.lastConnectedInfo[r]) || void 0 === l
                          ? void 0
                          : l.lastApproved) || 0);
                      this.redirect(t);
                    }
                  }
                  redirect(e) {
                    const { history: t, permissionsRequest: n } = this.props;
                    let a = !0;
                    (a = !(
                      (null == n ? void 0 : n.permissions) &&
                      Object.keys(n.permissions).includes('wallet_snap')
                    )),
                      this.setState({ redirecting: a, permissionsApproved: e }),
                      a && e
                        ? setTimeout(() => t.push(p.DEFAULT_ROUTE), A)
                        : t.push(p.DEFAULT_ROUTE);
                  }
                  goBack() {
                    const { history: e, connectPath: t } = this.props;
                    e.push(t);
                  }
                  renderTopBar(e) {
                    const { targetSubjectMetadata: t } = this.state;
                    return o.default.createElement(
                      f.Box,
                      {
                        style: {
                          boxShadow:
                            t.subjectType === i.SubjectType.Snap &&
                            'var(--shadow-size-lg) var(--color-shadow-default)',
                        },
                      },
                      t.subjectType === i.SubjectType.Snap &&
                        o.default.createElement(g.default, {
                          snapId: t.origin,
                          boxShadow: 'none',
                          onCancel: () => {
                            this.cancelPermissionsRequest(e);
                          },
                        })
                    );
                  }
                  render() {
                    var e;
                    const {
                        accounts: t,
                        showNewAccountModal: n,
                        newAccountNumber: a,
                        nativeCurrency: i,
                        permissionsRequest: c,
                        addressLastConnectedMap: u,
                        permissionsRequestId: d,
                        connectPath: p,
                        confirmPermissionPath: f,
                        hideTopBar: g,
                        targetSubjectMetadata: x,
                        snapsConnectPath: T,
                        snapInstallPath: C,
                        snapUpdatePath: w,
                        snapResultPath: A,
                        requestState: S,
                        approvePendingApproval: N,
                        rejectPendingApproval: O,
                        setSnapsInstallPrivacyWarningShownStatus: M,
                        approvePermissionsRequest: B,
                        history: R,
                      } = this.props,
                      {
                        selectedAccountAddresses: D,
                        permissionsApproved: P,
                        redirecting: F,
                        snapsInstallPrivacyWarningShown: L,
                      } = this.state,
                      j = (0, l.isSnapId)(
                        null == c || null === (e = c.metadata) || void 0 === e ? void 0 : e.origin
                      );
                    return o.default.createElement(
                      'div',
                      { className: 'permissions-connect' },
                      !g && this.renderTopBar(d),
                      F && P
                        ? o.default.createElement(y.default, { subjectMetadata: x })
                        : o.default.createElement(
                            s.Switch,
                            null,
                            o.default.createElement(s.Route, {
                              path: p,
                              exact: !0,
                              render: () =>
                                j
                                  ? o.default.createElement(h.default, {
                                      accounts: t,
                                      nativeCurrency: i,
                                      selectAccounts: e => this.selectAccounts(e),
                                      selectNewAccountViaModal: e => {
                                        n({ onCreateNewAccount: t => e(t), newAccountNumber: a });
                                      },
                                      addressLastConnectedMap: u,
                                      cancelPermissionsRequest: e =>
                                        this.cancelPermissionsRequest(e),
                                      permissionsRequestId: d,
                                      selectedAccountAddresses: D,
                                      targetSubjectMetadata: x,
                                    })
                                  : o.default.createElement(k.ConnectPage, {
                                      rejectPermissionsRequest: e =>
                                        this.cancelPermissionsRequest(e),
                                      activeTabOrigin: this.state.origin,
                                      request: c || {},
                                      permissionsRequestId: d,
                                      approveConnection: this.approveConnection,
                                      targetSubjectMetadata: x,
                                    }),
                            }),
                            o.default.createElement(s.Route, {
                              path: f,
                              exact: !0,
                              render: () =>
                                o.default.createElement(m.default, {
                                  request: c || {},
                                  approvePermissionsRequest: (...e) => {
                                    B(...e), this.redirect(!0);
                                  },
                                  rejectPermissionsRequest: e => this.cancelPermissionsRequest(e),
                                  selectedAccounts: t.filter(e => D.has(e.address)),
                                  requestedChainIds: I(null == c ? void 0 : c.permissions),
                                  targetSubjectMetadata: x,
                                  history: R,
                                  connectPath: p,
                                  snapsInstallPrivacyWarningShown: L,
                                  setSnapsInstallPrivacyWarningShownStatus: M,
                                }),
                            }),
                            o.default.createElement(s.Route, {
                              path: T,
                              exact: !0,
                              render: () =>
                                o.default.createElement(E.default, {
                                  request: c || {},
                                  approveConnection: this.approveConnection,
                                  rejectConnection: e => this.cancelPermissionsRequest(e),
                                  targetSubjectMetadata: x,
                                  snapsInstallPrivacyWarningShown: L,
                                  setSnapsInstallPrivacyWarningShownStatus: M,
                                }),
                            }),
                            o.default.createElement(s.Route, {
                              path: C,
                              exact: !0,
                              render: () =>
                                o.default.createElement(v.default, {
                                  request: c || {},
                                  requestState: S || {},
                                  approveSnapInstall: e => {
                                    N(e, {
                                      ...c,
                                      permissions: S.permissions,
                                      approvedAccounts: [...D],
                                    }),
                                      this.setState({ permissionsApproved: !0 });
                                  },
                                  rejectSnapInstall: e => {
                                    O(
                                      e,
                                      (0, r.serializeError)(r.providerErrors.userRejectedRequest())
                                    ),
                                      this.setState({ permissionsApproved: !0 });
                                  },
                                  targetSubjectMetadata: x,
                                }),
                            }),
                            o.default.createElement(s.Route, {
                              path: w,
                              exact: !0,
                              render: () =>
                                o.default.createElement(b.default, {
                                  request: c || {},
                                  requestState: S || {},
                                  approveSnapUpdate: e => {
                                    N(e, {
                                      ...c,
                                      permissions: S.permissions,
                                      approvedAccounts: [...D],
                                    }),
                                      this.setState({ permissionsApproved: !0 });
                                  },
                                  rejectSnapUpdate: e => {
                                    O(
                                      e,
                                      (0, r.serializeError)(r.providerErrors.userRejectedRequest())
                                    ),
                                      this.setState({ permissionsApproved: !1 });
                                  },
                                  targetSubjectMetadata: x,
                                }),
                            }),
                            o.default.createElement(s.Route, {
                              path: A,
                              exact: !0,
                              render: () =>
                                o.default.createElement(_.default, {
                                  request: c || {},
                                  requestState: S || {},
                                  approveSnapResult: e => {
                                    N(e), this.setState({ permissionsApproved: !0 });
                                  },
                                  targetSubjectMetadata: x,
                                }),
                            })
                          )
                    );
                  }
                }
                (n.default = N),
                  w(N, 'propTypes', {
                    approvePermissionsRequest: a.default.func.isRequired,
                    rejectPermissionsRequest: a.default.func.isRequired,
                    getRequestAccountTabIds: a.default.func.isRequired,
                    accounts: a.default.arrayOf(
                      a.default.shape({
                        id: a.default.string.isRequired,
                        address: a.default.string.isRequired,
                        metadata: a.default.shape({
                          name: a.default.string.isRequired,
                          snap: a.default.shape({
                            id: a.default.string.isRequired,
                            name: a.default.string,
                            enabled: a.default.bool,
                          }),
                          keyring: a.default.shape({ type: a.default.string.isRequired })
                            .isRequired,
                        }).isRequired,
                        addressLabel: a.default.string.isRequired,
                        label: a.default.string.isRequired,
                        balance: a.default.string.isRequired,
                      })
                    ).isRequired,
                    currentAddress: a.default.string.isRequired,
                    origin: a.default.string,
                    showNewAccountModal: a.default.func.isRequired,
                    newAccountNumber: a.default.number.isRequired,
                    nativeCurrency: a.default.string,
                    permissionsRequest: a.default.object,
                    addressLastConnectedMap: a.default.object.isRequired,
                    lastConnectedInfo: a.default.object.isRequired,
                    permissionsRequestId: a.default.string,
                    history: a.default.object.isRequired,
                    connectPath: a.default.string.isRequired,
                    confirmPermissionPath: a.default.string.isRequired,
                    requestType: a.default.string.isRequired,
                    snapsConnectPath: a.default.string.isRequired,
                    snapInstallPath: a.default.string.isRequired,
                    snapUpdatePath: a.default.string.isRequired,
                    snapResultPath: a.default.string.isRequired,
                    requestState: a.default.object.isRequired,
                    approvePendingApproval: a.default.func.isRequired,
                    rejectPendingApproval: a.default.func.isRequired,
                    setSnapsInstallPrivacyWarningShownStatus: a.default.func.isRequired,
                    snapsInstallPrivacyWarningShown: a.default.bool.isRequired,
                    hideTopBar: a.default.bool,
                    targetSubjectMetadata: a.default.shape({
                      extensionId: a.default.string,
                      iconUrl: a.default.string,
                      name: a.default.string,
                      origin: a.default.string,
                      subjectType: a.default.string,
                    }),
                    isRequestingAccounts: a.default.bool.isRequired,
                  }),
                  w(N, 'defaultProps', {
                    origin: '',
                    nativeCurrency: '',
                    permissionsRequest: undefined,
                    permissionsRequestId: '',
                  }),
                  w(N, 'contextTypes', { t: a.default.func });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/permissions-connect.component.js' },
    ],
    [
      7446,
      {
        '../../ducks/metamask/metamask': 6860,
        '../../helpers/constants/routes': 6878,
        '../../helpers/utils/util': 6921,
        '../../selectors': 7601,
        '../../store/actions': 7619,
        './permissions-connect.component': 7445,
        '@metamask/chain-agnostic-permission': 1498,
        '@metamask/keyring-api': 2014,
        '@metamask/permission-controller': 2421,
        '@metamask/snaps-rpc-methods': 2733,
        'prop-types': 5082,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = e('@metamask/permission-controller'),
                  o = e('@metamask/snaps-rpc-methods'),
                  s = e('react-redux'),
                  r = g(e('prop-types')),
                  i = e('@metamask/keyring-api'),
                  l = e('@metamask/chain-agnostic-permission'),
                  c = e('../../selectors'),
                  u = e('../../ducks/metamask/metamask'),
                  d = e('../../helpers/utils/util'),
                  p = e('../../store/actions'),
                  m = e('../../helpers/constants/routes'),
                  f = g(e('./permissions-connect.component'));
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const h = (0, s.connect)(
                  (e, t) => {
                    var n, s, r;
                    const {
                      match: {
                        params: { id: p },
                      },
                      location: { pathname: f },
                    } = t;
                    let g = (0, c.getPermissionsRequests)(e);
                    g = [...g, ...(0, c.getSnapInstallOrUpdateRequests)(e)];
                    const { address: h } = (0, c.getSelectedInternalAccount)(e),
                      y = g.find(e => e.metadata.id === p),
                      { metadata: E = {}, diff: v = {} } = y || {},
                      { origin: b } = E,
                      _ = (0, u.getNativeCurrency)(e),
                      k = Boolean(null == v ? void 0 : v.permissionDiffMap),
                      x = Boolean(
                        (null == y || null === (n = y.permissions) || void 0 === n
                          ? void 0
                          : n[l.Caip25EndowmentPermissionName]) && !k
                      ),
                      T = (0, c.getTargetSubjectMetadata)(e, b) ?? {
                        name: (0, d.getURLHostName)(b) || b,
                        origin: b,
                        iconUrl: null,
                        extensionId: null,
                        subjectType: a.SubjectType.Unknown,
                      };
                    let C = (0, c.getRequestType)(e, p);
                    y &&
                      1 === Object.keys(y.permissions || {}).length &&
                      null !== (s = y.permissions) &&
                      void 0 !== s &&
                      s[o.WALLET_SNAP_PERMISSION_KEY] &&
                      (C = 'wallet_connectSnaps');
                    const w = (0, c.getRequestState)(e, p) || {},
                      A = (0, c.getAccountsWithLabels)(e).filter(e =>
                        (0, i.isEvmAccountType)(e.type)
                      ),
                      S = (0, c.getLastConnectedInfo)(e) || {},
                      I = (null === (r = S[b]) || void 0 === r ? void 0 : r.accounts) || {};
                    Object.keys(I).forEach(e => {
                      I[e] = (0, d.formatDate)(I[e], 'yyyy-MM-dd');
                    });
                    const N = `${m.CONNECT_ROUTE}/${p}`,
                      O = `${m.CONNECT_ROUTE}/${p}${m.CONNECT_CONFIRM_PERMISSIONS_ROUTE}`,
                      M = `${m.CONNECT_ROUTE}/${p}${m.CONNECT_SNAPS_CONNECT_ROUTE}`,
                      B = `${m.CONNECT_ROUTE}/${p}${m.CONNECT_SNAP_INSTALL_ROUTE}`,
                      R = `${m.CONNECT_ROUTE}/${p}${m.CONNECT_SNAP_UPDATE_ROUTE}`,
                      D = `${m.CONNECT_ROUTE}/${p}${m.CONNECT_SNAP_RESULT_ROUTE}`,
                      P = f === B || f === R || f === D;
                    let F = 1 + x;
                    (F += P), (F = F.toString());
                    let L = '';
                    if (f === N) L = '1';
                    else if (f === O) L = x ? '2' : '1';
                    else if (P) L = x ? '3' : '2';
                    else {
                      if (f !== M)
                        throw new Error('Incorrect path for permissions-connect component');
                      L = 1;
                    }
                    return {
                      isRequestingAccounts: x,
                      requestType: C,
                      snapsConnectPath: M,
                      snapInstallPath: B,
                      snapUpdatePath: R,
                      snapResultPath: D,
                      requestState: w,
                      hideTopBar: P,
                      snapsInstallPrivacyWarningShown: (0, c.getSnapsInstallPrivacyWarningShown)(e),
                      permissionsRequest: y,
                      permissionsRequestId: p,
                      accounts: A,
                      currentAddress: h,
                      origin: b,
                      newAccountNumber: A.length + 1,
                      nativeCurrency: _,
                      addressLastConnectedMap: I,
                      lastConnectedInfo: S,
                      connectPath: N,
                      confirmPermissionPath: O,
                      totalPages: F,
                      page: L,
                      targetSubjectMetadata: T,
                    };
                  },
                  e => ({
                    approvePermissionsRequest: t => e((0, p.approvePermissionsRequest)(t)),
                    rejectPermissionsRequest: t => e((0, p.rejectPermissionsRequest)(t)),
                    approvePendingApproval: (t, n) => e((0, p.resolvePendingApproval)(t, n)),
                    rejectPendingApproval: (t, n) => e((0, p.rejectPendingApproval)(t, n)),
                    setSnapsInstallPrivacyWarningShownStatus: t => {
                      e((0, p.setSnapsInstallPrivacyWarningShownStatus)(t));
                    },
                    showNewAccountModal: ({ onCreateNewAccount: t, newAccountNumber: n }) =>
                      e(
                        (0, p.showModal)({
                          name: 'NEW_ACCOUNT',
                          onCreateNewAccount: t,
                          newAccountNumber: n,
                        })
                      ),
                    getRequestAccountTabIds: () => e((0, p.getRequestAccountTabIds)()),
                  })
                )(f.default);
                h.propTypes = {
                  history: r.default.object.isRequired,
                  match: r.default.shape({
                    params: r.default.shape({ id: r.default.string }).isRequired,
                  }).isRequired,
                };
                n.default = h;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/permissions-connect.container.js' },
    ],
    [
      7447,
      { './permissions-redirect.component': 7448 },
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
                    (a = e('./permissions-redirect.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/redirect/index.js' },
    ],
    [
      7448,
      {
        '../../../components/app/permissions-connect-footer': 6131,
        '../../../components/component-library': 6402,
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
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = d);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = c(e('prop-types')),
                  s = e('../../../helpers/constants/design-system'),
                  r = e('../../../contexts/i18n'),
                  i = e('../../../components/component-library'),
                  l = c(e('../../../components/app/permissions-connect-footer'));
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
                function d({ subjectMetadata: e }) {
                  const t = (0, a.useContext)(r.I18nContext),
                    [n, o] = (0, a.useState)(e);
                  return (
                    (0, a.useEffect)(() => {
                      e && e.origin && o(e);
                    }, [e]),
                    a.default.createElement(
                      i.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Column,
                        width: s.BlockSize.Full,
                        height: s.BlockSize.Full,
                        justifyContent: s.JustifyContent.spaceBetween,
                      },
                      a.default.createElement(
                        i.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          alignItems: s.AlignItems.center,
                          justifyContent: s.JustifyContent.center,
                          width: s.BlockSize.Full,
                          height: s.BlockSize.Full,
                          backgroundColor: s.BackgroundColor.backgroundAlternative,
                        },
                        a.default.createElement(
                          i.Box,
                          { display: s.Display.Flex, marginBottom: 4 },
                          a.default.createElement(
                            i.Text,
                            { variant: s.TextVariant.headingMd },
                            t('connecting')
                          )
                        ),
                        a.default.createElement(
                          i.Box,
                          {
                            display: s.Display.Flex,
                            backgroundColor: s.BackgroundColor.infoMuted,
                            borderRadius: s.BorderRadius.pill,
                            padding: 2,
                          },
                          a.default.createElement(i.AvatarToken, {
                            src: n.iconUrl,
                            name: n.name,
                            size: i.AvatarTokenSize.Lg,
                          }),
                          a.default.createElement(
                            i.Box,
                            {
                              display: s.Display.Flex,
                              alignItems: s.AlignItems.center,
                              justifyContent: s.JustifyContent.center,
                              paddingLeft: 4,
                              paddingRight: 4,
                            },
                            a.default.createElement(i.Icon, {
                              name: i.IconName.Confirmation,
                              size: i.IconSize.Xl,
                              color: s.IconColor.infoDefault,
                            })
                          ),
                          a.default.createElement(i.AvatarToken, {
                            src: '/images/logo/metamask-fox.svg',
                            size: i.AvatarTokenSize.Lg,
                            name: 'metamask-fox',
                          })
                        )
                      ),
                      a.default.createElement(
                        i.Box,
                        { backgroundColor: s.BackgroundColor.backgroundAlternative, padding: 4 },
                        a.default.createElement(
                          i.Box,
                          { display: s.Display.Flex, flexDirection: s.FlexDirection.Column },
                          a.default.createElement(l.default, null),
                          a.default.createElement(
                            i.Box,
                            {
                              display: s.Display.Flex,
                              paddingTop: 4,
                              width: s.BlockSize.Full,
                              justifyContent: s.JustifyContent.center,
                              alignItems: s.AlignItems.center,
                            },
                            a.default.createElement(
                              i.Button,
                              {
                                variant: i.ButtonVariant.Secondary,
                                size: i.ButtonSize.Lg,
                                width: s.BlockSize.Full,
                                marginRight: 2,
                                disabled: !0,
                              },
                              t('back')
                            ),
                            a.default.createElement(
                              i.Button,
                              {
                                variant: i.ButtonVariant.Primary,
                                size: i.ButtonSize.Lg,
                                width: s.BlockSize.Full,
                                marginLeft: 2,
                                disabled: !0,
                                loading: !0,
                              },
                              a.default.createElement(i.Icon, {
                                name: i.IconName.Loading,
                                size: i.IconSize.Lg,
                                color: s.IconColor.infoDefault,
                              })
                            )
                          )
                        )
                      )
                    )
                  );
                }
                d.propTypes = {
                  subjectMetadata: o.default.shape({
                    extensionId: o.default.string,
                    iconUrl: o.default.string,
                    subjectType: o.default.string,
                    name: o.default.string.isRequired,
                    origin: o.default.string.isRequired,
                  }),
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/permissions-connect/redirect/permissions-redirect.component.js',
      },
    ],
    [
      7449,
      { './snap-install': 7450 },
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
                  o = (a = e('./snap-install')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/snap-install/index.js' },
    ],
    [
      7450,
      {
        '../../../../components/app/permission-connect-header': 6123,
        '../../../../components/app/snaps/install-error/install-error': 6151,
        '../../../../components/app/snaps/snap-authorship-header': 6159,
        '../../../../components/app/snaps/snap-install-warning': 6172,
        '../../../../components/app/snaps/snap-permissions-list': 6184,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/page-container': 6783,
        '../../../../components/ui/pulse-loader/pulse-loader': 6792,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useOriginMetadata': 7e3,
        '../../../../hooks/useScrollRequired': 7003,
        '../../../../selectors': 7601,
        '../util': 7457,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = T);
                var a = x(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = k(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-redux'),
                  r = e('@metamask/snaps-utils'),
                  i = e('../../../../components/ui/page-container'),
                  l = e('../../../../hooks/useI18nContext'),
                  c = x(e('../../../../components/app/snaps/snap-install-warning')),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../util'),
                  p = x(e('../../../../components/ui/pulse-loader/pulse-loader')),
                  m = x(e('../../../../components/app/snaps/snap-authorship-header')),
                  f = e('../../../../components/component-library'),
                  g = x(e('../../../../components/app/snaps/snap-permissions-list')),
                  h = e('../../../../hooks/useScrollRequired'),
                  y = x(e('../../../../components/app/snaps/install-error/install-error')),
                  E = e('../../../../hooks/useOriginMetadata'),
                  v = e('../../../../selectors'),
                  b = e('../../../../helpers/utils/util'),
                  _ = x(e('../../../../components/app/permission-connect-header'));
                function k(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (k = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function x(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function T({
                  request: e,
                  requestState: t,
                  approveSnapInstall: n,
                  rejectSnapInstall: a,
                  targetSubjectMetadata: k,
                }) {
                  var x, T, C;
                  const w = (0, l.useI18nContext)(),
                    A =
                      (0, E.useOriginMetadata)(
                        null == e || null === (x = e.metadata) || void 0 === x
                          ? void 0
                          : x.dappOrigin
                      ) || {},
                    { origin: S, iconUrl: I } = A,
                    [N, O] = (0, o.useState)(!1),
                    M = (0, s.useSelector)(v.getSnapsMetadata),
                    [B, R] = (0, o.useState)(!1),
                    {
                      isScrollable: D,
                      hasScrolledToBottom: P,
                      scrollToBottom: F,
                      ref: L,
                      onScroll: j,
                    } = (0, h.useScrollRequired)([t]),
                    U = (0, o.useCallback)(() => a(e.metadata.id), [e, a]),
                    W = (0, o.useCallback)(() => n(e.metadata.id), [e, n]),
                    { name: G } = (0, s.useSelector)(e => (0, v.getSnapMetadata)(e, k.origin)),
                    V = !t.loading && t.error,
                    z = t.loading,
                    Q = (0, r.isSnapId)(
                      null == e || null === (T = e.metadata) || void 0 === T ? void 0 : T.dappOrigin
                    ),
                    q = (0, d.getSnapInstallWarnings)(
                      (null == t ? void 0 : t.permissions) ?? {},
                      w,
                      G,
                      (0, b.getSnapName)(M)
                    ),
                    H = q.length > 0;
                  return o.default.createElement(
                    f.Box,
                    {
                      className: 'snap-install',
                      display: u.Display.Flex,
                      justifyContent: u.JustifyContent.spaceBetween,
                      height: u.BlockSize.Full,
                      borderStyle: u.BorderStyle.none,
                      flexDirection: u.FlexDirection.Column,
                      backgroundColor: u.BackgroundColor.backgroundAlternative,
                    },
                    (!z && !V) || Q
                      ? o.default.createElement(m.default, {
                          snapId:
                            z && Q
                              ? null == e || null === (C = e.metadata) || void 0 === C
                                ? void 0
                                : C.dappOrigin
                              : k.origin,
                          onCancel: U,
                        })
                      : o.default.createElement(_.default, { origin: S, iconUrl: I }),
                    o.default.createElement(
                      f.Box,
                      {
                        ref: z || V ? undefined : L,
                        onScroll: j,
                        className: 'snap-install__content',
                        style: { overflowY: 'auto', flex: !z && !V && '1' },
                        paddingLeft: 4,
                        paddingRight: 4,
                      },
                      z &&
                        o.default.createElement(
                          f.Box,
                          {
                            display: u.Display.Flex,
                            className: 'snap-install__content__loader-container',
                            flexDirection: u.FlexDirection.Column,
                            alignItems: u.AlignItems.center,
                            justifyContent: u.JustifyContent.center,
                          },
                          o.default.createElement(p.default, null)
                        ),
                      V &&
                        o.default.createElement(y.default, {
                          iconName: f.IconName.Warning,
                          title: w('connectionFailed'),
                          description: w('connectionFailedDescription', [
                            o.default.createElement(
                              f.Text,
                              { as: 'span', key: '1', fontWeight: u.FontWeight.Medium },
                              G
                            ),
                          ]),
                          error: t.error,
                        }),
                      !V &&
                        !z &&
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(
                            f.Text,
                            {
                              variant: u.TextVariant.headingMd,
                              paddingTop: 4,
                              paddingBottom: 2,
                              textAlign: 'center',
                            },
                            w('installRequest')
                          ),
                          o.default.createElement(
                            f.Text,
                            {
                              className: 'snap-install__content__permission-description',
                              paddingBottom: 4,
                              paddingLeft: 4,
                              paddingRight: 4,
                              textAlign: u.TextAlign.Center,
                            },
                            w('snapInstallRequest', [
                              o.default.createElement(
                                f.Text,
                                {
                                  as: 'span',
                                  key: '2',
                                  variant: u.TextVariant.bodyMd,
                                  fontWeight: u.FontWeight.Medium,
                                },
                                G
                              ),
                            ])
                          ),
                          o.default.createElement(
                            f.Box,
                            {
                              display: u.Display.Flex,
                              backgroundColor: u.BackgroundColor.backgroundDefault,
                              paddingLeft: 4,
                              paddingRight: 4,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius: u.BorderRadius.XL,
                            },
                            o.default.createElement(g.default, {
                              snapId: k.origin,
                              snapName: G,
                              permissions: t.permissions || {},
                              connections: t.connections || {},
                              onShowAllPermissions: () => {
                                R(!0);
                              },
                            })
                          ),
                          o.default.createElement(
                            f.Box,
                            { className: 'snap-install__scroll-button-area' },
                            !D || P || B
                              ? null
                              : o.default.createElement(f.AvatarIcon, {
                                  className: 'snap-install__scroll-button',
                                  'data-testid': 'snap-install-scroll',
                                  iconName: f.IconName.Arrow2Down,
                                  backgroundColor: u.BackgroundColor.infoDefault,
                                  color: u.IconColor.primaryInverse,
                                  onClick: F,
                                  style: { cursor: 'pointer' },
                                })
                          )
                        )
                    ),
                    o.default.createElement(
                      f.Box,
                      {
                        className: 'snap-install__footer',
                        display: u.Display.Flex,
                        alignItems: u.AlignItems.center,
                        flexDirection: u.FlexDirection.Column,
                        backgroundColor: u.BackgroundColor.backgroundAlternative,
                      },
                      o.default.createElement(i.PageContainerFooter, {
                        cancelButtonType: 'default',
                        hideCancel: V,
                        disabled: z || (!V && D && !P),
                        onCancel: U,
                        cancelText: w('cancel'),
                        onSubmit: () => {
                          !V && H ? O(!0) : V ? U() : W();
                        },
                        submitText: w(V ? 'ok' : z ? 'connect' : 'confirm'),
                      })
                    ),
                    N &&
                      o.default.createElement(c.default, {
                        onCancel: () => O(!1),
                        onSubmit: W,
                        warnings: q,
                        snapName: G,
                      })
                  );
                }
                T.propTypes = {
                  request: a.default.object.isRequired,
                  requestState: a.default.object.isRequired,
                  approveSnapInstall: a.default.func.isRequired,
                  rejectSnapInstall: a.default.func.isRequired,
                  targetSubjectMetadata: a.default.shape({
                    iconUrl: a.default.string,
                    name: a.default.string,
                    origin: a.default.string.isRequired,
                    sourceCode: a.default.string,
                    version: a.default.string,
                  }).isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/permissions-connect/snaps/snap-install/snap-install.js',
      },
    ],
    [
      7451,
      { './snap-result': 7452 },
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
                  o = (a = e('./snap-result')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/snap-result/index.js' },
    ],
    [
      7452,
      {
        '../../../../components/app/snaps/install-error/install-error': 6151,
        '../../../../components/app/snaps/snap-authorship-header': 6159,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/box/box': 6702,
        '../../../../components/ui/page-container': 6783,
        '../../../../components/ui/pulse-loader/pulse-loader': 6792,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = y);
                var a = h(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-redux'),
                  r = e('../../../../components/ui/page-container'),
                  i = e('../../../../hooks/useI18nContext'),
                  l = h(e('../../../../components/ui/box/box')),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../components/component-library'),
                  d = h(e('../../../../components/ui/pulse-loader/pulse-loader')),
                  p = h(e('../../../../components/app/snaps/install-error/install-error')),
                  m = h(e('../../../../components/app/snaps/snap-authorship-header')),
                  f = e('../../../../selectors');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y({
                  request: e,
                  requestState: t,
                  approveSnapResult: n,
                  targetSubjectMetadata: a,
                }) {
                  const g = (0, i.useI18nContext)(),
                    h = (0, o.useCallback)(() => n(e.metadata.id), [e, n]),
                    y = !t.loading && t.error,
                    E = t.loading,
                    { name: v } = (0, s.useSelector)(e => (0, f.getSnapMetadata)(e, a.origin));
                  return o.default.createElement(
                    l.default,
                    {
                      className: 'page-container snap-result',
                      justifyContent: c.JustifyContent.spaceBetween,
                      height: c.BlockSize.Full,
                      borderStyle: c.BorderStyle.none,
                      flexDirection: c.FlexDirection.Column,
                      backgroundColor: c.BackgroundColor.backgroundAlternative,
                    },
                    o.default.createElement(m.default, { snapId: a.origin, onCancel: h }),
                    o.default.createElement(
                      l.default,
                      {
                        className: 'snap-result__content',
                        paddingLeft: 4,
                        paddingRight: 4,
                        alignItems: c.AlignItems.center,
                        flexDirection: c.FlexDirection.Column,
                        style: { overflowY: 'auto' },
                        backgroundColor: c.BackgroundColor.backgroundAlternative,
                        height: c.BlockSize.Full,
                      },
                      E &&
                        o.default.createElement(
                          l.default,
                          {
                            className: 'snap-result__content__loader-container',
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Column,
                            alignItems: c.AlignItems.center,
                            justifyContent: c.JustifyContent.center,
                            height: c.BlockSize.Full,
                          },
                          o.default.createElement(d.default, null)
                        ),
                      !E &&
                        !y &&
                        (function (e, t) {
                          let n;
                          switch (e) {
                            case 'wallet_installSnap':
                              n = g('snapInstallSuccess');
                              break;
                            case 'wallet_updateSnap':
                              n = g('snapUpdateSuccess');
                              break;
                            default:
                              n = g('snapResultSuccess');
                          }
                          return o.default.createElement(
                            l.default,
                            {
                              flexDirection: c.FlexDirection.Column,
                              alignItems: c.AlignItems.center,
                              justifyContent: c.JustifyContent.center,
                              height: c.BlockSize.Full,
                              paddingTop: 2,
                              paddingBottom: 2,
                              backgroundColor: c.BackgroundColor.backgroundAlternative,
                            },
                            o.default.createElement(u.AvatarIcon, {
                              className: 'snap-result__header__icon',
                              iconName: u.IconName.Confirmation,
                              size: u.AvatarIconSize.Xl,
                              color: c.IconColor.successDefault,
                              backgroundColor: c.BackgroundColor.successMuted,
                            }),
                            o.default.createElement(
                              u.Text,
                              {
                                fontWeight: c.FontWeight.Bold,
                                variant: c.TextVariant.headingLg,
                                paddingBottom: 2,
                                marginTop: 4,
                              },
                              n
                            ),
                            o.default.createElement(
                              u.Text,
                              { textAlign: c.TextAlign.Center },
                              g('snapResultSuccessDescription', [
                                o.default.createElement(
                                  u.Text,
                                  { as: 'span', key: '1', fontWeight: c.FontWeight.Medium },
                                  t
                                ),
                              ])
                            )
                          );
                        })(t.type, v),
                      y &&
                        (function (e, n) {
                          let a, s;
                          switch (e) {
                            case 'wallet_installSnap':
                              (a = g('snapInstallationErrorTitle')),
                                (s = g('snapInstallationErrorDescription', [
                                  o.default.createElement(
                                    u.Text,
                                    { as: 'span', key: '1', fontWeight: c.FontWeight.Medium },
                                    n
                                  ),
                                ]));
                              break;
                            case 'wallet_updateSnap':
                              (a = g('snapUpdateErrorTitle')),
                                (s = g('snapUpdateErrorDescription', [
                                  o.default.createElement(
                                    u.Text,
                                    { as: 'span', key: '1', fontWeight: c.FontWeight.Medium },
                                    n
                                  ),
                                ]));
                              break;
                            default:
                              a = g('snapResultError');
                          }
                          return o.default.createElement(p.default, {
                            error: t.error,
                            title: a,
                            description: s,
                            iconName: u.IconName.Warning,
                          });
                        })(t.type, v)
                    ),
                    o.default.createElement(
                      l.default,
                      {
                        className: 'snap-result__footer',
                        alignItems: c.AlignItems.center,
                        flexDirection: c.FlexDirection.Column,
                        backgroundColor: c.BackgroundColor.backgroundAlternative,
                      },
                      o.default.createElement(r.PageContainerFooter, {
                        hideCancel: !0,
                        disabled: E,
                        onSubmit: h,
                        submitText: g('ok').toUpperCase(),
                      })
                    )
                  );
                }
                y.propTypes = {
                  request: a.default.object.isRequired,
                  requestState: a.default.object.isRequired,
                  approveSnapResult: a.default.func.isRequired,
                  targetSubjectMetadata: a.default.shape({
                    iconUrl: a.default.string,
                    name: a.default.string,
                    origin: a.default.string.isRequired,
                    sourceCode: a.default.string,
                    version: a.default.string,
                  }).isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/snap-result/snap-result.js' },
    ],
    [
      7453,
      { './snap-update': 7454 },
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
                  o = (a = e('./snap-update')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/snap-update/index.js' },
    ],
    [
      7454,
      {
        '../../../../components/app/snaps/install-error/install-error': 6151,
        '../../../../components/app/snaps/snap-authorship-header': 6159,
        '../../../../components/app/snaps/snap-install-warning': 6172,
        '../../../../components/app/snaps/update-snap-permission-list': 6273,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/page-container': 6783,
        '../../../../components/ui/pulse-loader/pulse-loader': 6792,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useScrollRequired': 7003,
        '../../../../selectors': 7601,
        '../util': 7457,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = _);
                var a = b(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-redux'),
                  r = e('../../../../components/ui/page-container'),
                  i = e('../../../../hooks/useI18nContext'),
                  l = b(e('../../../../components/app/snaps/snap-install-warning')),
                  c = e('../../../../helpers/constants/design-system'),
                  u = b(e('../../../../components/app/snaps/update-snap-permission-list')),
                  d = e('../util'),
                  p = b(e('../../../../components/ui/pulse-loader/pulse-loader')),
                  m = b(e('../../../../components/app/snaps/install-error/install-error')),
                  f = b(e('../../../../components/app/snaps/snap-authorship-header')),
                  g = e('../../../../components/component-library'),
                  h = e('../../../../hooks/useScrollRequired'),
                  y = e('../../../../selectors'),
                  E = e('../../../../helpers/utils/util');
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (v = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function b(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function _({
                  request: e,
                  requestState: t,
                  approveSnapUpdate: n,
                  rejectSnapUpdate: a,
                  targetSubjectMetadata: v,
                }) {
                  const b = (0, i.useI18nContext)(),
                    [_, k] = (0, o.useState)(!1),
                    [x, T] = (0, o.useState)(!1),
                    {
                      isScrollable: C,
                      hasScrolledToBottom: w,
                      scrollToBottom: A,
                      ref: S,
                      onScroll: I,
                    } = (0, h.useScrollRequired)([t]),
                    N = (0, s.useSelector)(y.getSnapsMetadata),
                    O = (0, o.useCallback)(() => a(e.metadata.id), [e, a]),
                    M = (0, o.useCallback)(() => n(e.metadata.id), [e, n]),
                    { name: B } = (0, s.useSelector)(e => (0, y.getSnapMetadata)(e, v.origin)),
                    R = t.approvedPermissions ?? {},
                    D = t.unusedPermissions ?? {},
                    P = t.newPermissions ?? {},
                    F = t.approvedConnections ?? {},
                    L = t.unusedConnections ?? {},
                    j = t.newConnections ?? {},
                    { newVersion: U } = t,
                    W = t.loading,
                    G = !W && t.error,
                    V = (0, d.getSnapInstallWarnings)(P, b, B, (0, E.getSnapName)(N)),
                    z = V.length > 0;
                  return o.default.createElement(
                    g.Box,
                    {
                      className: 'snap-update',
                      display: c.Display.Flex,
                      justifyContent: c.JustifyContent.spaceBetween,
                      height: c.BlockSize.Full,
                      borderStyle: c.BorderStyle.none,
                      flexDirection: c.FlexDirection.Column,
                      backgroundColor: c.BackgroundColor.backgroundAlternative,
                    },
                    o.default.createElement(f.default, { snapId: v.origin, onCancel: O }),
                    o.default.createElement(
                      g.Box,
                      {
                        ref: S,
                        onScroll: I,
                        className: 'snap-update__content',
                        style: { overflowY: 'auto', flex: !W && '1' },
                        paddingLeft: 4,
                        paddingRight: 4,
                      },
                      !W &&
                        !G &&
                        o.default.createElement(
                          g.Text,
                          {
                            paddingTop: 4,
                            paddingBottom: 2,
                            variant: c.TextVariant.headingMd,
                            textAlign: 'center',
                          },
                          b('updateRequest')
                        ),
                      W &&
                        o.default.createElement(
                          g.Box,
                          {
                            className: 'snap-update__content__loader-container',
                            display: c.Display.Flex,
                            flexDirection: c.FlexDirection.Column,
                            alignItems: c.AlignItems.center,
                            justifyContent: c.JustifyContent.center,
                          },
                          o.default.createElement(p.default, null)
                        ),
                      G &&
                        o.default.createElement(m.default, {
                          iconName: g.IconName.Warning,
                          error: t.error,
                          title: b('snapUpdateErrorTitle'),
                          description: b('snapUpdateErrorDescription', [
                            o.default.createElement(
                              g.Text,
                              { as: 'span', key: '1', fontWeight: c.FontWeight.Medium },
                              B
                            ),
                          ]),
                        }),
                      !G &&
                        !W &&
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(
                            g.Text,
                            {
                              className: 'snap-update__content__permission-description',
                              paddingBottom: 4,
                              paddingLeft: 4,
                              paddingRight: 4,
                              textAlign: c.TextAlign.Center,
                            },
                            b('snapUpdateRequest', [
                              o.default.createElement(
                                g.Text,
                                {
                                  as: 'span',
                                  key: '2',
                                  variant: c.TextVariant.bodyMd,
                                  fontWeight: c.FontWeight.Medium,
                                },
                                B
                              ),
                              o.default.createElement(
                                g.Text,
                                {
                                  as: 'span',
                                  key: '3',
                                  variant: c.TextVariant.bodyMd,
                                  fontWeight: c.FontWeight.Medium,
                                },
                                U
                              ),
                            ])
                          ),
                          o.default.createElement(
                            g.Box,
                            {
                              display: c.Display.Flex,
                              backgroundColor: c.BackgroundColor.backgroundDefault,
                              paddingLeft: 4,
                              paddingRight: 4,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius: c.BorderRadius.XL,
                            },
                            o.default.createElement(u.default, {
                              approvedPermissions: R,
                              revokedPermissions: D,
                              newPermissions: P,
                              approvedConnections: F,
                              revokedConnections: L,
                              newConnections: j,
                              targetSubjectMetadata: v,
                              showAllPermissions: () => {
                                T(!0);
                              },
                            })
                          ),
                          o.default.createElement(
                            g.Box,
                            { className: 'snap-update__scroll-button-area' },
                            !C || w || x
                              ? null
                              : o.default.createElement(g.AvatarIcon, {
                                  className: 'snap-install__scroll-button',
                                  'data-testid': 'snap-update-scroll',
                                  iconName: g.IconName.Arrow2Down,
                                  backgroundColor: c.BackgroundColor.infoDefault,
                                  color: c.IconColor.primaryInverse,
                                  onClick: A,
                                  style: { cursor: 'pointer' },
                                })
                          )
                        )
                    ),
                    o.default.createElement(
                      g.Box,
                      {
                        className: 'snap-update__footer',
                        display: c.Display.Flex,
                        alignItems: c.AlignItems.center,
                        flexDirection: c.FlexDirection.Column,
                        backgroundColor: c.BackgroundColor.backgroundAlternative,
                      },
                      o.default.createElement(r.PageContainerFooter, {
                        cancelButtonType: 'default',
                        hideCancel: G,
                        disabled: W || (!G && C && !w),
                        onCancel: O,
                        cancelText: b('cancel'),
                        onSubmit: () => {
                          !G && z ? k(!0) : G ? O() : M();
                        },
                        submitText: b(G ? 'ok' : 'confirm'),
                      })
                    ),
                    _ &&
                      o.default.createElement(l.default, {
                        onCancel: () => k(!1),
                        onSubmit: M,
                        snapName: B,
                        warnings: V,
                      })
                  );
                }
                _.propTypes = {
                  request: a.default.object.isRequired,
                  requestState: a.default.object.isRequired,
                  approveSnapUpdate: a.default.func.isRequired,
                  rejectSnapUpdate: a.default.func.isRequired,
                  targetSubjectMetadata: a.default.shape({
                    iconUrl: a.default.string,
                    name: a.default.string,
                    origin: a.default.string.isRequired,
                    sourceCode: a.default.string,
                    version: a.default.string,
                  }).isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/snap-update/snap-update.js' },
    ],
    [
      7455,
      { './snaps-connect': 7456 },
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
                  o = (a = e('./snaps-connect')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/snaps-connect/index.js' },
    ],
    [
      7456,
      {
        '../../../../components/app/snaps/snap-connect-cell/snap-connect-cell': 6163,
        '../../../../components/app/snaps/snap-icon': 6170,
        '../../../../components/app/snaps/snap-privacy-warning/snap-privacy-warning': 6187,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/page-container': 6783,
        '../../../../components/ui/pulse-loader/pulse-loader': 6792,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useOriginMetadata': 7e3,
        '../../../../selectors': 7601,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = b);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = E(e('prop-types')),
                  r = e('@metamask/snaps-utils'),
                  i = e('../../../../hooks/useI18nContext'),
                  l = e('../../../../components/component-library'),
                  c = e('../../../../helpers/constants/design-system'),
                  u = e('../../../../components/ui/page-container'),
                  d = E(e('../../../../components/app/snaps/snap-connect-cell/snap-connect-cell')),
                  p = e('../../../../helpers/utils/util'),
                  m = E(e('../../../../components/ui/pulse-loader/pulse-loader')),
                  f = E(
                    e('../../../../components/app/snaps/snap-privacy-warning/snap-privacy-warning')
                  ),
                  g = e('../../../../selectors'),
                  h = e('../../../../hooks/useOriginMetadata'),
                  y = e('../../../../components/app/snaps/snap-icon');
                function E(e) {
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
                function b({
                  request: e,
                  approveConnection: t,
                  rejectConnection: n,
                  targetSubjectMetadata: s,
                  snapsInstallPrivacyWarningShown: E,
                  setSnapsInstallPrivacyWarningShownStatus: v,
                }) {
                  const b = (0, i.useI18nContext)(),
                    { origin: _ } = s,
                    [k, x] = (0, a.useState)(!1),
                    T = (0, o.useSelector)(t => {
                      var n;
                      return (0, g.getPermissions)(
                        t,
                        null == e || null === (n = e.metadata) || void 0 === n ? void 0 : n.origin
                      );
                    }),
                    C = (0, o.useSelector)(g.getPreinstalledSnaps),
                    w = (0, p.getDedupedSnaps)(e, T),
                    A = w[0],
                    { name: S } = (0, o.useSelector)(e => (0, g.getSnapMetadata)(e, A)),
                    I = Object.keys(C).includes(A),
                    [N, O] = (0, a.useState)(!I && !E),
                    M = (0, a.useCallback)(() => {
                      n(e.metadata.id);
                    }, [e, n]),
                    B = (0, a.useCallback)(() => {
                      try {
                        x(!0), t(e);
                      } finally {
                        x(!1);
                      }
                    }, [e, t]),
                    R = () => {
                      var e;
                      let t =
                        null === (e = (0, h.useOriginMetadata)(_) || {}) || void 0 === e
                          ? void 0
                          : e.hostname;
                      const { name: n } = (0, o.useSelector)(e =>
                        (0, g.getSnapMetadata)(e, (0, r.isSnapId)(_) ? _ : `npm:${_}`)
                      );
                      return (
                        (0, r.isSnapId)(_) && (t = n),
                        k
                          ? a.default.createElement(
                              l.Box,
                              {
                                display: c.Display.Flex,
                                flexDirection: c.FlexDirection.Column,
                                alignItems: c.AlignItems.center,
                                justifyContent: c.JustifyContent.center,
                                width: c.BlockSize.Full,
                                height: c.BlockSize.Full,
                              },
                              a.default.createElement(m.default, null)
                            )
                          : (null == w ? void 0 : w.length) > 1
                            ? a.default.createElement(
                                l.Box,
                                {
                                  flexDirection: c.FlexDirection.Column,
                                  justifyContent: c.JustifyContent.center,
                                  alignItems: c.AlignItems.center,
                                  paddingTop: 4,
                                  width: c.BlockSize.Full,
                                  style: { overflowY: 'hidden' },
                                  backgroundColor: c.BackgroundColor.backgroundAlternative,
                                },
                                a.default.createElement(
                                  l.Text,
                                  {
                                    paddingBottom: 2,
                                    variant: c.TextVariant.headingMd,
                                    textAlign: c.TextAlign.Center,
                                  },
                                  b('connectionRequest')
                                ),
                                a.default.createElement(
                                  l.Text,
                                  { variant: c.TextVariant.bodyMd, textAlign: c.TextAlign.Center },
                                  b('multipleSnapConnectionWarning', [
                                    a.default.createElement(
                                      l.Text,
                                      {
                                        as: 'span',
                                        key: '1',
                                        variant: c.TextVariant.bodyMd,
                                        fontWeight: c.FontWeight.Medium,
                                      },
                                      t
                                    ),
                                    a.default.createElement(
                                      l.Text,
                                      {
                                        as: 'span',
                                        key: '2',
                                        variant: c.TextVariant.bodyMd,
                                        fontWeight: c.FontWeight.Medium,
                                      },
                                      null == w ? void 0 : w.length
                                    ),
                                  ])
                                ),
                                a.default.createElement(
                                  l.Box,
                                  {
                                    flexDirection: c.FlexDirection.Column,
                                    display: c.Display.Flex,
                                    marginTop: 4,
                                    width: c.BlockSize.Full,
                                    style: { overflowY: 'auto', flex: 1 },
                                  },
                                  w.map(e =>
                                    a.default.createElement(d.default, {
                                      key: `snaps-connect-${e}`,
                                      snapId: e,
                                      origin: t,
                                    })
                                  )
                                )
                              )
                            : 1 === (null == w ? void 0 : w.length)
                              ? a.default.createElement(
                                  l.Box,
                                  {
                                    display: c.Display.Flex,
                                    flexDirection: c.FlexDirection.Column,
                                    justifyContent: c.JustifyContent.center,
                                    alignItems: c.AlignItems.center,
                                    width: c.BlockSize.Full,
                                    height: c.BlockSize.Full,
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    backgroundColor: c.BackgroundColor.backgroundAlternative,
                                  },
                                  a.default.createElement(
                                    l.Box,
                                    { paddingBottom: 2 },
                                    a.default.createElement(y.SnapIcon, {
                                      snapId: w[0],
                                      avatarSize: l.IconSize.Xl,
                                    })
                                  ),
                                  a.default.createElement(
                                    l.Text,
                                    { paddingBottom: 2, variant: c.TextVariant.headingMd },
                                    b('connectionRequest')
                                  ),
                                  a.default.createElement(
                                    l.Text,
                                    {
                                      variant: c.TextVariant.bodyMd,
                                      textAlign: c.TextAlign.Center,
                                      padding: [0, 4],
                                      overflowWrap: c.OverflowWrap.Anywhere,
                                    },
                                    b('snapConnectionWarning', [
                                      a.default.createElement(
                                        l.Text,
                                        {
                                          as: 'span',
                                          key: '1',
                                          variant: c.TextVariant.bodyMd,
                                          fontWeight: c.FontWeight.Medium,
                                        },
                                        t
                                      ),
                                      a.default.createElement(
                                        l.Text,
                                        {
                                          as: 'span',
                                          key: '2',
                                          variant: c.TextVariant.bodyMd,
                                          fontWeight: c.FontWeight.Medium,
                                        },
                                        S
                                      ),
                                    ])
                                  )
                                )
                              : null
                      );
                    };
                  return a.default.createElement(
                    l.Box,
                    {
                      className: 'snaps-connect',
                      display: c.Display.Flex,
                      flexDirection: c.FlexDirection.Column,
                      alignItems: c.AlignItems.center,
                      height: c.BlockSize.Full,
                      width: c.BlockSize.Full,
                      backgroundColor: c.BackgroundColor.backgroundAlternative,
                    },
                    N &&
                      a.default.createElement(f.default, {
                        onAccepted: () => {
                          O(!1), v(!0);
                        },
                        onCanceled: M,
                      }),
                    a.default.createElement(
                      l.Box,
                      {
                        display: c.Display.Flex,
                        height: c.BlockSize.Full,
                        width: c.BlockSize.Full,
                        paddingLeft: 4,
                        paddingRight: 4,
                      },
                      a.default.createElement(R, null)
                    ),
                    a.default.createElement(u.PageContainerFooter, {
                      cancelButtonType: 'default',
                      hideCancel: !1,
                      disabled: k,
                      onCancel: M,
                      cancelText: b('cancel'),
                      onSubmit: B,
                      submitText: b('connect'),
                    })
                  );
                }
                b.propTypes = {
                  request: s.default.object.isRequired,
                  approveConnection: s.default.func.isRequired,
                  rejectConnection: s.default.func.isRequired,
                  targetSubjectMetadata: s.default.shape({
                    extensionId: s.default.string,
                    iconUrl: s.default.string,
                    name: s.default.string,
                    origin: s.default.string,
                    subjectType: s.default.string,
                  }),
                  snapsInstallPrivacyWarningShown: s.default.bool.isRequired,
                  setSnapsInstallPrivacyWarningShownStatus: s.default.func,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/permissions-connect/snaps/snaps-connect/snaps-connect.js',
      },
    ],
    [
      7457,
      { '../../../helpers/utils/permission': 6912 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getSnapInstallWarnings = function (e, t, n, o) {
                    return Object.entries(e).reduce((e, [s, r]) => {
                      const i = (0, a.getPermissionDescription)({
                        t: t,
                        permissionName: s,
                        permissionValue: r,
                        subjectName: n,
                        getSubjectName: o,
                      });
                      return e.concat(i.filter(e => e.weight <= 2));
                    }, []);
                  });
                var a = e('../../../helpers/utils/permission');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/permissions-connect/snaps/util.js' },
    ],
    [
      7458,
      { './remove-snap-account': 7459, './snap-account-card': 7460 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = { RemoveSnapAccount: !0 };
                Object.defineProperty(n, 'RemoveSnapAccount', {
                  enumerable: !0,
                  get: function () {
                    return s.default;
                  },
                });
                var o,
                  s = (o = e('./remove-snap-account')) && o.__esModule ? o : { default: o },
                  r = e('./snap-account-card');
                Object.keys(r).forEach(function (e) {
                  'default' !== e &&
                    '__esModule' !== e &&
                    (Object.prototype.hasOwnProperty.call(a, e) ||
                      (e in n && n[e] === r[e]) ||
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
      { package: '$root$', file: 'ui/pages/remove-snap-account/index.ts' },
    ],
    [
      7459,
      {
        '../../components/app/snaps/snap-authorship-header': 6159,
        '../../components/component-library': 6402,
        '../../helpers/constants/design-system': 6872,
        '../../hooks/useI18nContext': 6985,
        './snap-account-card': 7460,
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
                  s = e('../../helpers/constants/design-system'),
                  r = e('../../hooks/useI18nContext'),
                  i = c(e('../../components/app/snaps/snap-authorship-header')),
                  l = e('./snap-account-card');
                function c(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = ({ snapId: e, publicAddress: t, onCancel: n }) => {
                  const c = (0, r.useI18nContext)();
                  return a.default.createElement(
                    o.Box,
                    {
                      className: 'remove-snap-account-page',
                      height: s.BlockSize.Full,
                      width: s.BlockSize.Full,
                      display: s.Display.Flex,
                      borderStyle: s.BorderStyle.none,
                      flexDirection: s.FlexDirection.Column,
                      alignItems: s.AlignItems.center,
                      marginBottom: 0,
                    },
                    a.default.createElement(i.default, { snapId: e, onCancel: n }),
                    a.default.createElement(
                      o.Box,
                      {
                        display: s.Display.Flex,
                        flexDirection: s.FlexDirection.Column,
                        alignItems: s.AlignItems.center,
                        justifyContent: s.JustifyContent.center,
                        paddingLeft: 4,
                        paddingRight: 4,
                        style: { flexGrow: 1 },
                      },
                      a.default.createElement(
                        o.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Row,
                          justifyContent: s.JustifyContent.spaceBetween,
                        },
                        a.default.createElement(
                          o.Box,
                          {
                            display: s.Display.Flex,
                            flexDirection: s.FlexDirection.Column,
                            alignItems: s.AlignItems.center,
                          },
                          a.default.createElement(
                            o.Box,
                            { paddingBottom: 2 },
                            a.default.createElement(o.AvatarIcon, {
                              iconName: o.IconName.UserCircleRemove,
                              color: s.IconColor.errorDefault,
                              backgroundColor: s.BackgroundColor.errorMuted,
                              size: o.AvatarIconSize.Xl,
                            })
                          ),
                          a.default.createElement(
                            o.Text,
                            { textAlign: s.TextAlign.Center, variant: s.TextVariant.headingLg },
                            c('removeSnapAccountTitle')
                          ),
                          a.default.createElement(l.SnapAccountCard, { address: t, remove: !0 }),
                          a.default.createElement(
                            o.Text,
                            {
                              variant: s.TextVariant.bodyMd,
                              textAlign: s.TextAlign.Center,
                              overflowWrap: s.OverflowWrap.Anywhere,
                            },
                            c('removeSnapAccountDescription')
                          )
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/remove-snap-account/remove-snap-account.tsx' },
    ],
    [
      7460,
      {
        '../../components/component-library': 6402,
        '../../components/multichain/account-list-item': 6477,
        '../../helpers/constants/design-system': 6872,
        '../../selectors': 7601,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapAccountCard = void 0);
                var a,
                  o = (a = e('react')) && a.__esModule ? a : { default: a },
                  s = e('react-redux'),
                  r = e('../../selectors'),
                  i = e('../../helpers/constants/design-system'),
                  l = e('../../components/component-library'),
                  c = e('../../components/multichain/account-list-item');
                n.SnapAccountCard = ({ address: e, remove: t }) => {
                  const n = (0, s.useSelector)(r.getMetaMaskAccountsOrdered).find(
                    t => t.address === e
                  );
                  return o.default.createElement(
                    l.Box,
                    {
                      className: t ? 'snap-account-card-remove' : 'snap-account-card',
                      borderRadius: i.BorderRadius.LG,
                      marginTop: 4,
                      marginBottom: 4,
                      width: i.BlockSize.Full,
                      style: { boxShadow: 'var(--shadow-size-lg) var(--color-shadow-default)' },
                    },
                    o.default.createElement(c.AccountListItem, { account: n, selected: t || !1 })
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/remove-snap-account/snap-account-card.tsx' },
    ],
    [
      7461,
      { './routes.container': 7463 },
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
                  o = (a = e('./routes.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/routes/index.js' },
    ],
    [
      7462,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/app': 5789,
        '../../../shared/lib/confirmation.utils': 5832,
        '../../components/app/alerts': 5913,
        '../../components/app/assets/nfts/nft-default-image/toggle-ipfs-modal': 5936,
        '../../components/app/assets/nfts/nft-details/nft-full-image': 5941,
        '../../components/app/basic-configuration-modal': 5968,
        '../../components/app/loading-network-screen': 6042,
        '../../components/app/modals': 6076,
        '../../components/app/modals/keyring-snap-removal-modal': 6077,
        '../../components/app/qr-hardware-popover': 6137,
        '../../components/app/toast-master/toast-master': 6291,
        '../../components/component-library': 6402,
        '../../components/multichain': 6574,
        '../../components/multichain/app-header/multichain-meta-fox-logo': 6501,
        '../../components/multichain/network-list-menu/network-confirmation-popover/network-confirmation-popover': 6595,
        '../../components/multichain/pages/connections': 6645,
        '../../components/multichain/pages/permissions-page/permissions-page': 6655,
        '../../components/multichain/pages/review-permissions-page/review-permissions-page': 6656,
        '../../components/multichain/pages/send': 6676,
        '../../components/ui/alert': 6701,
        '../../components/ui/deprecated-networks/deprecated-networks': 6727,
        '../../components/ui/loading-screen': 6765,
        '../../helpers/constants/routes': 6878,
        '../../helpers/higher-order-components/authenticated': 6888,
        '../../helpers/higher-order-components/initialized': 6890,
        '../../helpers/utils/mm-lazy': 6908,
        '../asset': 7033,
        '../bridge': 7047,
        '../bridge/transaction-details/transaction-details': 7073,
        '../confirm-add-suggested-nft': 7076,
        '../confirm-add-suggested-token': 7078,
        '../confirmations/confirm-transaction': 7265,
        '../confirmations/confirmation': 7277,
        '../create-account/create-account.component': 7375,
        '../home': 7382,
        '../keychains/restore-vault': 7384,
        '../keychains/reveal-seed': 7385,
        '../lock': 7386,
        '../notification-details': 7389,
        '../notifications': 7401,
        '../notifications-settings': 7395,
        '../onboarding-flow/onboarding-app-header/onboarding-app-header': 7427,
        '../onboarding-flow/onboarding-flow': 7429,
        '../permissions-connect': 7444,
        '../settings': 7489,
        '../settings/deprecated-network-modal/DeprecatedNetworkModal': 7480,
        '../snaps/snap-view': 7526,
        '../snaps/snaps-list': 7529,
        '../swaps': 7549,
        '../unlock-page': 7587,
        './utils': 7464,
        classnames: 4168,
        'prop-types': 5082,
        react: 5328,
        'react-idle-timer': 5178,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = D(e('classnames')),
                  o = D(e('prop-types')),
                  s = L(e('react')),
                  r = e('react-router-dom'),
                  i = D(e('react-idle-timer')),
                  l = D(e('../../helpers/higher-order-components/authenticated')),
                  c = D(e('../../helpers/higher-order-components/initialized')),
                  u = D(e('../permissions-connect')),
                  d = D(e('../../components/ui/loading-screen')),
                  p = D(e('../../components/app/loading-network-screen')),
                  m = e('../../components/app/modals'),
                  f = D(e('../../components/ui/alert')),
                  g = e('../../components/multichain'),
                  h = D(e('../../components/app/alerts')),
                  y = D(e('../onboarding-flow/onboarding-app-header/onboarding-app-header')),
                  E = e('../../helpers/constants/routes'),
                  v = e('../../../shared/constants/app'),
                  b = e('../../../app/scripts/lib/util'),
                  _ = D(e('../../components/app/qr-hardware-popover')),
                  k = D(e('../../components/ui/deprecated-networks/deprecated-networks')),
                  x = e('../../components/component-library'),
                  T = e('../../components/app/assets/nfts/nft-default-image/toggle-ipfs-modal'),
                  C = e('../../components/app/basic-configuration-modal'),
                  w = D(e('../../components/app/modals/keyring-snap-removal-modal')),
                  A = e('../settings/deprecated-network-modal/DeprecatedNetworkModal'),
                  S = e('../../components/multichain/app-header/multichain-meta-fox-logo'),
                  I = D(
                    e(
                      '../../components/multichain/network-list-menu/network-confirmation-popover/network-confirmation-popover'
                    )
                  ),
                  N = e('../../components/app/toast-master/toast-master'),
                  O = e('../../helpers/utils/mm-lazy'),
                  M = D(e('../bridge/transaction-details/transaction-details')),
                  B = e('../../../shared/lib/confirmation.utils'),
                  R = e('./utils');
                function D(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function P(e, t, n) {
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
                function F(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (F = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function L(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = F(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var s in e)
                    if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                      var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                      r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                const j = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../onboarding-flow/onboarding-flow')))
                  ),
                  U = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../lock')))),
                  W = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../unlock-page')))),
                  G = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../keychains/restore-vault')))
                  ),
                  V = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../keychains/reveal-seed')))
                  ),
                  z = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../settings')))),
                  Q = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../notifications-settings')))
                  ),
                  q = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../notification-details')))
                  ),
                  H = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../notifications')))),
                  Y = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../snaps/snaps-list')))
                  ),
                  Z = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../snaps/snap-view')))),
                  J = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../confirmations/confirm-transaction')))
                  ),
                  K = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../../components/multichain/pages/send')))
                  ),
                  X = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../swaps')))),
                  $ = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../bridge')))),
                  ee = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../confirm-add-suggested-token')))
                  ),
                  te = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../confirm-add-suggested-nft')))
                  ),
                  ne = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../confirmations/confirmation')))
                  ),
                  ae = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() => L(e('../create-account/create-account.component')))
                  ),
                  oe = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() =>
                      L(e('../../components/app/assets/nfts/nft-details/nft-full-image'))
                    )
                  ),
                  se = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../asset')))),
                  re = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() =>
                      L(e('../../components/multichain/pages/permissions-page/permissions-page'))
                    )
                  ),
                  ie = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() =>
                      L(e('../../components/multichain/pages/connections'))
                    )
                  ),
                  le = (0, O.mmLazy)(() =>
                    Promise.resolve().then(() =>
                      L(
                        e(
                          '../../components/multichain/pages/review-permissions-page/review-permissions-page'
                        )
                      )
                    )
                  ),
                  ce = (0, O.mmLazy)(() => Promise.resolve().then(() => L(e('../home'))));
                class ue extends s.Component {
                  componentDidUpdate(e) {
                    const {
                      theme: t,
                      networkToAutomaticallySwitchTo: n,
                      activeTabOrigin: a,
                      totalUnapprovedConfirmationCount: o,
                      isUnlocked: s,
                      currentExtensionPopupId: r,
                    } = this.props;
                    t !== e.theme && (0, R.setTheme)(t),
                      n &&
                        0 === o &&
                        (e.totalUnapprovedConfirmationCount > 0 || (!1 === e.isUnlocked && s)) &&
                        this.props.automaticallySwitchNetwork(n, a),
                      r !== undefined &&
                        global.metamask.id !== undefined &&
                        r !== global.metamask.id &&
                        window.close();
                  }
                  UNSAFE_componentWillMount() {
                    const {
                        currentCurrency: e,
                        pageChanged: t,
                        setCurrentCurrencyToUSD: n,
                        history: a,
                        showExtensionInFullSizeView: o,
                      } = this.props,
                      s = (0, b.getEnvironmentType)();
                    o && s === v.ENVIRONMENT_TYPE_POPUP && global.platform.openExtensionInBrowser(),
                      e || n(),
                      a.listen((e, n) => {
                        'PUSH' === n && t(e.pathname);
                      }),
                      (0, R.setTheme)(this.props.theme);
                  }
                  renderRoutes() {
                    const {
                        autoLockTimeLimit: e,
                        setLastActiveTime: t,
                        forgottenPassword: n,
                      } = this.props,
                      a = n ? r.Route : c.default,
                      o = s.default.createElement(
                        s.Suspense,
                        { fallback: null },
                        s.default.createElement(
                          r.Switch,
                          null,
                          s.default.createElement(r.Route, {
                            path: E.ONBOARDING_ROUTE,
                            component: j,
                          }),
                          s.default.createElement(r.Route, {
                            path: E.LOCK_ROUTE,
                            component: U,
                            exact: !0,
                          }),
                          s.default.createElement(c.default, {
                            path: E.UNLOCK_ROUTE,
                            component: W,
                            exact: !0,
                          }),
                          s.default.createElement(a, {
                            path: E.RESTORE_VAULT_ROUTE,
                            component: G,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.REVEAL_SEED_ROUTE}/:keyringId?`,
                            component: V,
                          }),
                          s.default.createElement(l.default, {
                            path: E.SETTINGS_ROUTE,
                            component: z,
                          }),
                          s.default.createElement(l.default, {
                            path: E.NOTIFICATIONS_SETTINGS_ROUTE,
                            component: Q,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.NOTIFICATIONS_ROUTE}/:uuid`,
                            component: q,
                          }),
                          s.default.createElement(l.default, {
                            path: E.NOTIFICATIONS_ROUTE,
                            component: H,
                          }),
                          s.default.createElement(l.default, {
                            exact: !0,
                            path: E.SNAPS_ROUTE,
                            component: Y,
                          }),
                          s.default.createElement(l.default, {
                            path: E.SNAPS_VIEW_ROUTE,
                            component: Z,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.CONFIRM_TRANSACTION_ROUTE}/:id?`,
                            component: J,
                          }),
                          s.default.createElement(l.default, {
                            path: E.SEND_ROUTE,
                            component: K,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, { path: E.SWAPS_ROUTE, component: X }),
                          s.default.createElement(l.default, {
                            path: `${E.CROSS_CHAIN_SWAP_TX_DETAILS_ROUTE}/:srcTxMetaId`,
                            component: M.default,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, {
                            path: E.CROSS_CHAIN_SWAP_ROUTE,
                            component: $,
                          }),
                          s.default.createElement(l.default, {
                            path: E.CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE,
                            component: ee,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, {
                            path: E.CONFIRM_ADD_SUGGESTED_NFT_ROUTE,
                            component: te,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.CONFIRMATION_V_NEXT_ROUTE}/:id?`,
                            component: ne,
                          }),
                          s.default.createElement(l.default, {
                            path: E.NEW_ACCOUNT_ROUTE,
                            component: ae,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.CONNECT_ROUTE}/:id`,
                            component: u.default,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.ASSET_ROUTE}/image/:asset/:id`,
                            component: oe,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.ASSET_ROUTE}/:chainId/:asset/:id`,
                            component: se,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.ASSET_ROUTE}/:chainId/:asset/`,
                            component: se,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.ASSET_ROUTE}/:chainId`,
                            component: se,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.CONNECTIONS}/:origin`,
                            component: ie,
                          }),
                          s.default.createElement(l.default, {
                            path: E.PERMISSIONS,
                            component: re,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, {
                            path: `${E.REVIEW_PERMISSIONS}/:origin`,
                            component: le,
                            exact: !0,
                          }),
                          s.default.createElement(l.default, {
                            path: E.DEFAULT_ROUTE,
                            component: ce,
                          })
                        )
                      );
                    return e > 0
                      ? s.default.createElement(i.default, { onAction: t, throttle: 1e3 }, o)
                      : o;
                  }
                  render() {
                    var e;
                    const {
                        isLoading: t,
                        isUnlocked: n,
                        alertMessage: o,
                        textDirection: r,
                        loadingMessage: i,
                        isNetworkLoading: l,
                        browserEnvironmentOs: c,
                        browserEnvironmentBrowser: u,
                        shouldShowSeedPhraseReminder: E,
                        completedOnboarding: O,
                        isAccountMenuOpen: M,
                        toggleAccountMenu: D,
                        isNetworkMenuOpen: P,
                        accountDetailsAddress: F,
                        isImportTokensModalOpen: L,
                        isDeprecatedNetworkModalOpen: j,
                        location: U,
                        isImportNftsModalOpen: W,
                        hideImportNftsModal: G,
                        isIpfsModalOpen: V,
                        isBasicConfigurationModalOpen: z,
                        hideIpfsModal: Q,
                        hideImportTokensModal: q,
                        hideDeprecatedNetworkModal: H,
                        clearSwitchedNetworkDetails: Y,
                        networkMenuClose: Z,
                        privacyMode: J,
                        oldestPendingApproval: K,
                        pendingApprovals: X,
                        transactionsMetadata: $,
                        switchedNetworkDetails: ee,
                        switchedNetworkNeverShowMessage: te,
                        isShowKeyringSnapRemovalResultModal: ne,
                        hideShowKeyringSnapRemovalResultModal: ae,
                        pendingConfirmations: oe,
                      } = this.props,
                      se = i || l ? (0, R.getConnectingLabel)(i, this.props, this.context) : null,
                      re =
                        (0, b.getEnvironmentType)() !== v.ENVIRONMENT_TYPE_NOTIFICATION && n && !E,
                      ie =
                        U.pathname.split('/confirm-transaction/')[1] ?? (null == K ? void 0 : K.id),
                      le = X.find(e => e.id === ie),
                      ce = (0, B.isCorrectSignatureApprovalType)(null == le ? void 0 : le.type),
                      ue = (0, B.isCorrectDeveloperTransactionType)(
                        null === (e = $[ie]) || void 0 === e ? void 0 : e.type
                      );
                    let de = t && O && !ce && !ue;
                    return (
                      (de =
                        t &&
                        O &&
                        !oe.some(
                          e =>
                            e.type ===
                            v.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showSnapAccountRedirect
                        ) &&
                        !ce &&
                        !ue),
                      s.default.createElement(
                        'div',
                        {
                          className: (0, a.default)('app', { [`os-${c}`]: c, [`browser-${u}`]: u }),
                          dir: r,
                          onMouseUp: ee && !te ? Y : undefined,
                        },
                        re ? s.default.createElement(k.default, null) : null,
                        s.default.createElement(_.default, null),
                        s.default.createElement(m.Modal, null),
                        s.default.createElement(f.default, {
                          visible: this.props.alertOpen,
                          msg: o,
                        }),
                        !(0, R.hideAppHeader)(this.props) &&
                          s.default.createElement(g.AppHeader, { location: U }),
                        (0, R.isConfirmTransactionRoute)(this.pathname) &&
                          s.default.createElement(S.MultichainMetaFoxLogo, null),
                        (0, R.showOnboardingHeader)(U) && s.default.createElement(y.default, null),
                        M
                          ? s.default.createElement(g.AccountListMenu, {
                              onClose: D,
                              privacyMode: J,
                            })
                          : null,
                        P ? s.default.createElement(g.NetworkListMenu, { onClose: Z }) : null,
                        s.default.createElement(I.default, null),
                        F ? s.default.createElement(g.AccountDetails, { address: F }) : null,
                        W ? s.default.createElement(g.ImportNftsModal, { onClose: G }) : null,
                        V ? s.default.createElement(T.ToggleIpfsModal, { onClose: Q }) : null,
                        z ? s.default.createElement(C.BasicConfigurationModal, null) : null,
                        L ? s.default.createElement(g.ImportTokensModal, { onClose: q }) : null,
                        j
                          ? s.default.createElement(A.DeprecatedNetworkModal, { onClose: H })
                          : null,
                        ne && s.default.createElement(w.default, { isOpen: ne, onClose: ae }),
                        s.default.createElement(
                          x.Box,
                          { className: 'main-container-wrapper' },
                          de ? s.default.createElement(d.default, { loadingMessage: se }) : null,
                          !t && l && O ? s.default.createElement(p.default, null) : null,
                          this.renderRoutes()
                        ),
                        n
                          ? s.default.createElement(h.default, { history: this.props.history })
                          : null,
                        s.default.createElement(N.ToastMaster, null)
                      )
                    );
                  }
                }
                (n.default = ue),
                  P(ue, 'propTypes', {
                    currentCurrency: o.default.string,
                    activeTabOrigin: o.default.string,
                    setCurrentCurrencyToUSD: o.default.func,
                    isLoading: o.default.bool,
                    loadingMessage: o.default.string,
                    alertMessage: o.default.string,
                    textDirection: o.default.string,
                    isNetworkLoading: o.default.bool,
                    alertOpen: o.default.bool,
                    isUnlocked: o.default.bool,
                    setLastActiveTime: o.default.func,
                    history: o.default.object,
                    location: o.default.object,
                    autoLockTimeLimit: o.default.number,
                    privacyMode: o.default.bool,
                    pageChanged: o.default.func.isRequired,
                    browserEnvironmentOs: o.default.string,
                    browserEnvironmentBrowser: o.default.string,
                    theme: o.default.string,
                    showExtensionInFullSizeView: o.default.bool,
                    shouldShowSeedPhraseReminder: o.default.bool,
                    forgottenPassword: o.default.bool,
                    completedOnboarding: o.default.bool,
                    isAccountMenuOpen: o.default.bool,
                    toggleAccountMenu: o.default.func,
                    isNetworkMenuOpen: o.default.bool,
                    networkMenuClose: o.default.func,
                    accountDetailsAddress: o.default.string,
                    isImportNftsModalOpen: o.default.bool.isRequired,
                    hideImportNftsModal: o.default.func.isRequired,
                    isIpfsModalOpen: o.default.bool.isRequired,
                    isBasicConfigurationModalOpen: o.default.bool.isRequired,
                    hideIpfsModal: o.default.func.isRequired,
                    isImportTokensModalOpen: o.default.bool.isRequired,
                    hideImportTokensModal: o.default.func.isRequired,
                    isDeprecatedNetworkModalOpen: o.default.bool.isRequired,
                    hideDeprecatedNetworkModal: o.default.func.isRequired,
                    clearSwitchedNetworkDetails: o.default.func.isRequired,
                    switchedNetworkDetails: o.default.oneOf([
                      null,
                      o.default.shape({
                        origin: o.default.string.isRequired,
                        networkClientId: o.default.string.isRequired,
                      }),
                    ]),
                    switchedNetworkNeverShowMessage: o.default.bool,
                    networkToAutomaticallySwitchTo: o.default.object,
                    automaticallySwitchNetwork: o.default.func.isRequired,
                    totalUnapprovedConfirmationCount: o.default.number.isRequired,
                    currentExtensionPopupId: o.default.number,
                    oldestPendingApproval: o.default.object,
                    pendingApprovals: o.default.arrayOf(o.default.object).isRequired,
                    transactionsMetadata: o.default.object.isRequired,
                    isShowKeyringSnapRemovalResultModal: o.default.bool.isRequired,
                    hideShowKeyringSnapRemovalResultModal: o.default.func.isRequired,
                    pendingConfirmations: o.default.array.isRequired,
                  }),
                  P(ue, 'contextTypes', { t: o.default.func, metricsEvent: o.default.func });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/routes/routes.component.js' },
    ],
    [
      7463,
      {
        '../../../shared/constants/preferences': 5809,
        '../../../shared/modules/selectors/networks': 5875,
        '../../components/app/toast-master/selectors': 6290,
        '../../ducks/history/history': 6857,
        '../../ducks/metamask/metamask': 6860,
        '../../ducks/send': 6865,
        '../../ducks/swaps/swaps': 6868,
        '../../selectors': 7601,
        '../../selectors/multi-srp/multi-srp': 7604,
        '../../store/actions': 7619,
        './routes.component': 7462,
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
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  r = e('redux'),
                  i = e('../../../shared/modules/selectors/networks'),
                  l = e('../../selectors'),
                  c = e('../../store/actions'),
                  u = e('../../ducks/history/history'),
                  d = e('../../ducks/swaps/swaps'),
                  p = e('../../ducks/send'),
                  m = e('../../ducks/metamask/metamask'),
                  f = e('../../../shared/constants/preferences'),
                  g = e('../../components/app/toast-master/selectors'),
                  h = e('../../selectors/multi-srp/multi-srp'),
                  y = (a = e('./routes.component')) && a.__esModule ? a : { default: a };
                n.default = (0, r.compose)(
                  s.withRouter,
                  (0, o.connect)(
                    function (e) {
                      var t, n;
                      const { activeTab: a, appState: o } = e,
                        { alertOpen: s, alertMessage: r, isLoading: c, loadingMessage: u } = o,
                        { autoLockTimeLimit: d = f.DEFAULT_AUTO_LOCK_TIME_LIMIT, privacyMode: y } =
                          (0, l.getPreferences)(e),
                        { completedOnboarding: E } = e.metamask,
                        v = (0, l.getSelectedInternalAccount)(e),
                        b = null == a ? void 0 : a.origin,
                        _ = (0, l.getCurrentNetwork)(e),
                        k = (0, l.getNetworkToAutomaticallySwitchTo)(e),
                        x = (0, l.getSwitchedNetworkDetails)(e),
                        T = (0, l.oldestPendingConfirmationSelector)(e),
                        C = (0, l.getPendingApprovals)(e),
                        w = (0, l.getUnapprovedTransactions)(e),
                        A = v && (0, h.getShouldShowSeedPhraseReminder)(e, v);
                      return {
                        alertOpen: s,
                        alertMessage: r,
                        account: v,
                        activeTabOrigin: b,
                        textDirection: e.metamask.textDirection,
                        isLoading: c,
                        loadingMessage: u,
                        isUnlocked: (0, m.getIsUnlocked)(e),
                        isNetworkLoading: (0, i.isNetworkLoading)(e),
                        currentCurrency: e.metamask.currentCurrency,
                        autoLockTimeLimit: d,
                        privacyMode: y,
                        browserEnvironmentOs:
                          null === (t = e.metamask.browserEnvironment) || void 0 === t
                            ? void 0
                            : t.os,
                        browserEnvironmentContainter:
                          null === (n = e.metamask.browserEnvironment) || void 0 === n
                            ? void 0
                            : n.browser,
                        providerId: (0, l.getNetworkIdentifier)(e),
                        providerType: (0, i.getProviderConfig)(e).type,
                        theme: (0, l.getTheme)(e),
                        sendStage: (0, p.getSendStage)(e),
                        allAccountsOnNetworkAreEmpty: (0, l.getAllAccountsOnNetworkAreEmpty)(e),
                        isTestNet: (0, l.getIsTestnet)(e),
                        showExtensionInFullSizeView: (0, l.getShowExtensionInFullSizeView)(e),
                        currentChainId: (0, i.getCurrentChainId)(e),
                        shouldShowSeedPhraseReminder: A,
                        forgottenPassword: e.metamask.forgottenPassword,
                        isCurrentProviderCustom: (0, l.isCurrentProviderCustom)(e),
                        completedOnboarding: E,
                        isAccountMenuOpen: e.appState.isAccountMenuOpen,
                        isNetworkMenuOpen: e.appState.isNetworkMenuOpen,
                        isImportTokensModalOpen: e.appState.importTokensModalOpen,
                        isBasicConfigurationModalOpen: e.appState.showBasicFunctionalityModal,
                        isDeprecatedNetworkModalOpen: e.appState.deprecatedNetworkModalOpen,
                        accountDetailsAddress: e.appState.accountDetailsAddress,
                        isImportNftsModalOpen: e.appState.importNftsModal.open,
                        isIpfsModalOpen: e.appState.showIpfsModalOpen,
                        switchedNetworkDetails: x,
                        networkToAutomaticallySwitchTo: k,
                        currentNetwork: _,
                        totalUnapprovedConfirmationCount: (0,
                        l.getNumberOfAllUnapprovedTransactionsAndMessages)(e),
                        switchedNetworkNeverShowMessage: (0,
                        g.selectSwitchedNetworkNeverShowMessage)(e),
                        currentExtensionPopupId: e.metamask.currentExtensionPopupId,
                        oldestPendingApproval: T,
                        pendingApprovals: C,
                        transactionsMetadata: w,
                        isShowKeyringSnapRemovalResultModal: e.appState.showKeyringRemovalSnapModal,
                        pendingConfirmations: (0, l.getUnapprovedConfirmations)(e),
                      };
                    },
                    function (e) {
                      return {
                        lockMetaMask: () => e((0, c.lockMetamask)(!1)),
                        setCurrentCurrencyToUSD: () => e((0, c.setCurrentCurrency)('usd')),
                        setLastActiveTime: () => e((0, c.setLastActiveTime)()),
                        pageChanged: t => e((0, u.pageChanged)(t)),
                        prepareToLeaveSwaps: () => e((0, d.prepareToLeaveSwaps)()),
                        toggleAccountMenu: () => e((0, c.toggleAccountMenu)()),
                        toggleNetworkMenu: () => e((0, c.toggleNetworkMenu)()),
                        hideImportNftsModal: () => e((0, c.hideImportNftsModal)()),
                        hideIpfsModal: () => e((0, c.hideIpfsModal)()),
                        hideImportTokensModal: () => e((0, c.hideImportTokensModal)()),
                        hideDeprecatedNetworkModal: () => e((0, c.hideDeprecatedNetworkModal)()),
                        addPermittedAccount: (t, n) => e((0, c.addPermittedAccount)(t, n)),
                        clearSwitchedNetworkDetails: () => e((0, c.clearSwitchedNetworkDetails)()),
                        automaticallySwitchNetwork: (t, n) =>
                          e((0, c.automaticallySwitchNetwork)(t, n)),
                        networkMenuClose: () => {
                          e((0, c.toggleNetworkMenu)()), e((0, c.setEditedNetwork)());
                        },
                        hideShowKeyringSnapRemovalResultModal: () =>
                          e((0, c.hideKeyringRemovalResultModal)()),
                      };
                    }
                  )
                )(y.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/routes/routes.container.js' },
    ],
    [
      7464,
      {
        '../../../app/scripts/lib/util': 204,
        '../../../shared/constants/app': 5789,
        '../../../shared/constants/network': 5804,
        '../../../shared/constants/preferences': 5809,
        '../../helpers/constants/routes': 6878,
        'react-router-dom': 5313,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getConnectingLabel = function (e, t, n) {
                    if (e) return e;
                    const { providerType: a, providerId: o } = t,
                      { t: s } = n;
                    switch (a) {
                      case r.NETWORK_TYPES.MAINNET:
                        return s('connectingToMainnet');
                      case r.NETWORK_TYPES.GOERLI:
                        return s('connectingToGoerli');
                      case r.NETWORK_TYPES.SEPOLIA:
                        return s('connectingToSepolia');
                      case r.NETWORK_TYPES.LINEA_GOERLI:
                        return s('connectingToLineaGoerli');
                      case r.NETWORK_TYPES.LINEA_SEPOLIA:
                        return s('connectingToLineaSepolia');
                      case r.NETWORK_TYPES.LINEA_MAINNET:
                        return s('connectingToLineaMainnet');
                      default:
                        return s('connectingTo', [o]);
                    }
                  }),
                  (n.hideAppHeader = function (e) {
                    const { location: t } = e;
                    if (
                      Boolean(
                        (0, a.matchPath)(t.pathname, {
                          path: `${l.NOTIFICATIONS_ROUTE}`,
                          exact: !1,
                        })
                      )
                    )
                      return !0;
                    if (
                      Boolean(
                        (0, a.matchPath)(t.pathname, { path: l.ONBOARDING_ROUTE, exact: !1 })
                      ) &&
                      !(function (e) {
                        const { location: t } = e;
                        return Boolean(
                          (0, a.matchPath)(t.pathname, {
                            path: l.ONBOARDING_UNLOCK_ROUTE,
                            exact: !0,
                          })
                        );
                      })(e)
                    )
                      return !0;
                    const n = (0, o.getEnvironmentType)();
                    if (n === s.ENVIRONMENT_TYPE_NOTIFICATION) return !0;
                    if (Boolean((0, a.matchPath)(t.pathname, { path: l.PERMISSIONS, exact: !1 })))
                      return !0;
                    if (Boolean((0, a.matchPath)(t.pathname, { path: l.CONNECTIONS, exact: !1 })))
                      return !0;
                    if (
                      Boolean(
                        (0, a.matchPath)(t.pathname, { path: l.REVIEW_PERMISSIONS, exact: !1 })
                      )
                    )
                      return !0;
                    if (
                      n === s.ENVIRONMENT_TYPE_POPUP &&
                      (function (e) {
                        const { location: t } = e;
                        return Boolean(
                          (0, a.matchPath)(t.pathname, {
                            path: l.CONFIRM_TRANSACTION_ROUTE,
                            exact: !1,
                          })
                        );
                      })(e)
                    )
                      return !0;
                    const r = Boolean(
                      (0, a.matchPath)(t.pathname, { path: l.CONNECT_ROUTE, exact: !1 })
                    );
                    if (Boolean((0, a.matchPath)(t.pathname, { path: l.SEND_ROUTE, exact: !1 })))
                      return !0;
                    if (
                      Boolean((0, a.matchPath)(t.pathname, { path: l.SNAPS_VIEW_ROUTE, exact: !1 }))
                    )
                      return !0;
                    if (
                      Boolean(
                        (0, a.matchPath)(t.pathname, {
                          path: `${l.CROSS_CHAIN_SWAP_ROUTE}`,
                          exact: !1,
                        })
                      )
                    )
                      return !0;
                    const i = Boolean(
                      (0, a.matchPath)(t.pathname, { path: l.CONFIRMATION_V_NEXT_ROUTE, exact: !1 })
                    );
                    return r || i || c(t.pathname);
                  }),
                  (n.isConfirmTransactionRoute = c),
                  (n.setTheme = function (e) {
                    document.documentElement.setAttribute(
                      'data-theme',
                      (function (e) {
                        if (e === i.ThemeType.os) {
                          var t;
                          return null !== (t = window) &&
                            void 0 !== t &&
                            null !== (t = t.matchMedia('(prefers-color-scheme: dark)')) &&
                            void 0 !== t &&
                            t.matches
                            ? i.ThemeType.dark
                            : i.ThemeType.light;
                        }
                        return e;
                      })(e)
                    );
                  }),
                  (n.showOnboardingHeader = function (e) {
                    return Boolean(
                      (0, a.matchPath)(e.pathname, { path: l.ONBOARDING_ROUTE, exact: !1 })
                    );
                  });
                var a = e('react-router-dom'),
                  o = e('../../../app/scripts/lib/util'),
                  s = e('../../../shared/constants/app'),
                  r = e('../../../shared/constants/network'),
                  i = e('../../../shared/constants/preferences'),
                  l = e('../../helpers/constants/routes');
                function c(e) {
                  return Boolean(
                    (0, a.matchPath)(e, { path: l.CONFIRM_TRANSACTION_ROUTE, exact: !1 })
                  );
                }
              };
            };
      },
      { package: '$root$', file: 'ui/pages/routes/utils.js' },
    ],
    [
      7465,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/preferences': 5809,
        '../../../../shared/constants/smartTransactions': 5813,
        '../../../components/component-library': 6402,
        '../../../components/ui/button': 6707,
        '../../../components/ui/text-field': 6810,
        '../../../components/ui/toggle-button': 6814,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/export-utils': 6900,
        '../../../helpers/utils/settings-search': 6915,
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
                var a = h(e('prop-types')),
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('../../../../shared/constants/metametrics'),
                  r = e('../../../../shared/constants/preferences'),
                  i = e('../../../../shared/constants/smartTransactions'),
                  l = e('../../../components/component-library'),
                  c = h(e('../../../components/ui/button')),
                  u = h(e('../../../components/ui/text-field')),
                  d = h(e('../../../components/ui/toggle-button')),
                  p = e('../../../helpers/constants/design-system'),
                  m = e('../../../helpers/utils/export-utils'),
                  f = e('../../../helpers/utils/settings-search');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function h(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function y(e, t, n) {
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
                class E extends o.PureComponent {
                  constructor(...e) {
                    super(...e),
                      y(this, 'state', {
                        autoLockTimeLimit: this.props.autoLockTimeLimit,
                        autoLockTimeLimitBeforeNormalization: this.props.autoLockTimeLimit,
                        lockTimeError: '',
                      }),
                      y(
                        this,
                        'settingsRefs',
                        Array(
                          (0, f.getNumberOfSettingRoutesInTab)(
                            this.context.t,
                            this.context.t('advanced')
                          )
                        )
                          .fill(undefined)
                          .map(() => o.default.createRef())
                      ),
                      y(this, 'backupUserData', async () => {
                        const { fileName: e, data: t } = await this.props.backupUserData();
                        (0, m.exportAsFile)(e, t, m.ExportableContentType.JSON),
                          this.context.trackEvent({
                            event: 'User Data Exported',
                            category: 'Backup',
                            properties: {},
                          });
                      });
                  }
                  componentDidUpdate() {
                    const { t: e } = this.context;
                    (0, f.handleSettingsRefs)(e, e('advanced'), this.settingsRefs);
                  }
                  componentDidMount() {
                    const { t: e } = this.context,
                      { hideErrorInSettings: t } = this.props;
                    (0, f.handleSettingsRefs)(e, e('advanced'), this.settingsRefs), t();
                  }
                  async getTextFromFile(e) {
                    return new Promise((t, n) => {
                      const a = new window.FileReader();
                      (a.onload = e => {
                        const n = e.target.result;
                        t(n);
                      }),
                        (a.onerror = e => {
                          n(e);
                        }),
                        a.readAsText(e);
                    });
                  }
                  renderStateLogs() {
                    const { t: e } = this.context,
                      { displayErrorInSettings: t } = this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        className: 'settings-page__content-row',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Column,
                        ref: this.settingsRefs[0],
                        'data-testid': 'advanced-setting-state-logs',
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('stateLogs')),
                        o.default.createElement(
                          'span',
                          { className: 'settings-page__content-description' },
                          e('stateLogsDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          o.default.createElement(
                            c.default,
                            {
                              type: 'secondary',
                              large: !0,
                              'data-testid': 'advanced-setting-state-logs-button',
                              onClick: () => {
                                window.logStateString(async (n, a) => {
                                  if (n) t(e('stateLogError'));
                                  else
                                    try {
                                      await (0, m.exportAsFile)(
                                        `${e('stateLogFileName')}.json`,
                                        a,
                                        m.ExportableContentType.JSON
                                      );
                                    } catch (e) {
                                      t(e.message);
                                    }
                                });
                              },
                            },
                            e('downloadStateLogs')
                          )
                        )
                      )
                    );
                  }
                  renderResetAccount() {
                    const { t: e } = this.context,
                      { showResetAccountConfirmationModal: t } = this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[1],
                        className: 'settings-page__content-row',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Column,
                        'data-testid': 'advanced-setting-reset-account',
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('clearActivity')),
                        o.default.createElement(
                          'span',
                          { className: 'settings-page__content-description' },
                          e('clearActivityDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          o.default.createElement(
                            c.default,
                            {
                              type: 'danger',
                              large: !0,
                              className: 'settings-tab__button--red',
                              onClick: e => {
                                e.preventDefault(),
                                  this.context.trackEvent({
                                    category: s.MetaMetricsEventCategory.Settings,
                                    event: s.MetaMetricsEventName.AccountReset,
                                    properties: {},
                                  }),
                                  t();
                              },
                            },
                            e('clearActivityButton')
                          )
                        )
                      )
                    );
                  }
                  renderToggleDismissSmartAccountSuggestion() {
                    const { t: e } = this.context,
                      {
                        dismissSmartAccountSuggestionEnabled: t,
                        setDismissSmartAccountSuggestionEnabled: n,
                      } = this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[2],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-dismiss-smart-account-suggestion-enabled',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement(
                          'span',
                          null,
                          ' ',
                          e('dismissSmartAccountSuggestionEnabledTitle')
                        ),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('dismissSmartAccountSuggestionEnabledDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => {
                            n(!e);
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                          dataTestId:
                            'settings-page-dismiss-smart-account-suggestion-enabled-toggle',
                        })
                      )
                    );
                  }
                  renderToggleStxOptIn() {
                    const { t: e } = this.context,
                      { smartTransactionsEnabled: t, setSmartTransactionsEnabled: n } = this.props,
                      a = o.default.createElement(
                        l.ButtonLink,
                        {
                          size: l.ButtonLinkSize.Inherit,
                          textProps: {
                            variant: p.TextVariant.bodyMd,
                            alignItems: p.AlignItems.flexStart,
                          },
                          as: 'a',
                          href: i.SMART_TRANSACTIONS_LEARN_MORE_URL,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        },
                        e('learnMoreUpperCase')
                      );
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[2],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-enable-smart-transactions',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('smartTransactions')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('stxOptInSupportedNetworksDescription', [a])
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => {
                            n(!e);
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                          dataTestId: 'settings-page-stx-opt-in-toggle',
                        })
                      )
                    );
                  }
                  renderHexDataOptIn() {
                    const { t: e } = this.context,
                      { sendHexData: t, setHexDataFeatureFlag: n } = this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[3],
                        className: 'settings-page__content-row',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                        'data-testid': 'advanced-setting-hex-data',
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('showHexData')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('showHexDataDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                          className: 'hex-data-toggle',
                        })
                      )
                    );
                  }
                  renderShowConversionInTestnets() {
                    const { t: e } = this.context,
                      { showFiatInTestnets: t, setShowFiatConversionOnTestnetsPreference: n } =
                        this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[4],
                        className: 'settings-page__content-row',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                        'data-testid': 'advanced-setting-show-testnet-conversion',
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('showFiatConversionInTestnets')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('showFiatConversionInTestnetsDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                          className: 'show-fiat-on-testnets-toggle',
                        })
                      )
                    );
                  }
                  renderToggleTestNetworks() {
                    const { t: e } = this.context,
                      { showTestNetworks: t, setShowTestNetworks: n } = this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[5],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-show-testnet-conversion',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('showTestnetNetworks')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('showTestnetNetworksDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderToggleExtensionInFullSizeView() {
                    const { t: e } = this.context,
                      { showExtensionInFullSizeView: t, setShowExtensionInFullSizeView: n } =
                        this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[8],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-show-extension-in-full-size-view',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('showExtensionInFullSizeView')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('showExtensionInFullSizeViewDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderAutoLockTimeLimit() {
                    const { t: e } = this.context,
                      { lockTimeError: t } = this.state,
                      { setAutoLockTimeLimit: n } = this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[7],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-auto-lock',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Column,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('autoLockTimeLimit')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('autoLockTimeLimitDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          o.default.createElement(u.default, {
                            id: 'autoTimeout',
                            'data-testid': 'auto-lockout-time',
                            placeholder: '0',
                            value: this.state.autoLockTimeLimitBeforeNormalization,
                            onChange: e => this.handleLockChange(e.target.value),
                            error: t,
                            fullWidth: !0,
                            margin: 'dense',
                            min: 0,
                          }),
                          o.default.createElement(
                            c.default,
                            {
                              type: 'primary',
                              'data-testid': 'auto-lockout-button',
                              className: 'settings-tab__rpc-save-button',
                              disabled: '' !== t,
                              onClick: () => {
                                n(this.state.autoLockTimeLimit);
                              },
                            },
                            e('save')
                          )
                        )
                      )
                    );
                  }
                  renderDismissSeedBackupReminderControl() {
                    const { t: e } = this.context,
                      { dismissSeedBackUpReminder: t, setDismissSeedBackUpReminder: n } =
                        this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[9],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-dismiss-reminder',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('dismissReminderField')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('dismissReminderDescriptionField')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  handleLockChange(e) {
                    const { t: t } = this.context;
                    if ('' === e)
                      return void this.setState({
                        autoLockTimeLimitBeforeNormalization: e,
                        autoLockTimeLimit: r.DEFAULT_AUTO_LOCK_TIME_LIMIT,
                        lockTimeError: '',
                      });
                    const n = Number(e);
                    if (Number.isNaN(n) || n < 0 || n > 10080)
                      return void this.setState({
                        autoLockTimeLimitBeforeNormalization: e,
                        autoLockTimeLimit: null,
                        lockTimeError: t('lockTimeInvalid'),
                      });
                    const a = n;
                    this.setState({
                      autoLockTimeLimitBeforeNormalization: e,
                      autoLockTimeLimit: a,
                      lockTimeError: '',
                    });
                  }
                  renderUserDataBackup() {
                    const { t: e } = this.context;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[10],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-data-backup',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Column,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('exportYourData')),
                        o.default.createElement(
                          'span',
                          { className: 'settings-page__content-description' },
                          e('exportYourDataDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          o.default.createElement(
                            c.default,
                            {
                              'data-testid': 'export-data-button',
                              type: 'secondary',
                              large: !0,
                              onClick: this.backupUserData,
                            },
                            e('exportYourDataButton')
                          )
                        )
                      )
                    );
                  }
                  renderManageInstitutionalWallets() {
                    const { t: e } = this.context,
                      { manageInstitutionalWallets: t, setManageInstitutionalWallets: n } =
                        this.props;
                    return o.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[9],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-dismiss-reminder',
                        display: p.Display.Flex,
                        flexDirection: p.FlexDirection.Row,
                        justifyContent: p.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, e('manageInstitutionalWallets')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('manageInstitutionalWalletsDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        o.default.createElement(d.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  render() {
                    const { errorInSettings: e } = this.props;
                    return o.default.createElement(
                      'div',
                      { className: 'settings-page__body' },
                      e
                        ? o.default.createElement('div', { className: 'settings-tab__error' }, e)
                        : null,
                      this.renderStateLogs(),
                      this.renderResetAccount(),
                      this.renderToggleDismissSmartAccountSuggestion(),
                      this.renderToggleStxOptIn(),
                      this.renderHexDataOptIn(),
                      this.renderShowConversionInTestnets(),
                      this.renderToggleTestNetworks(),
                      this.renderManageInstitutionalWallets(),
                      this.renderToggleExtensionInFullSizeView(),
                      this.renderAutoLockTimeLimit(),
                      this.renderUserDataBackup(),
                      this.renderDismissSeedBackupReminderControl()
                    );
                  }
                }
                (n.default = E),
                  y(E, 'contextTypes', { t: a.default.func, trackEvent: a.default.func }),
                  y(E, 'propTypes', {
                    setHexDataFeatureFlag: a.default.func,
                    displayErrorInSettings: a.default.func,
                    hideErrorInSettings: a.default.func,
                    showResetAccountConfirmationModal: a.default.func,
                    errorInSettings: a.default.string,
                    sendHexData: a.default.bool,
                    showFiatInTestnets: a.default.bool,
                    showTestNetworks: a.default.bool,
                    smartTransactionsEnabled: a.default.bool,
                    autoLockTimeLimit: a.default.number,
                    setAutoLockTimeLimit: a.default.func.isRequired,
                    setShowFiatConversionOnTestnetsPreference: a.default.func.isRequired,
                    setShowTestNetworks: a.default.func.isRequired,
                    setSmartTransactionsEnabled: a.default.func.isRequired,
                    setDismissSeedBackUpReminder: a.default.func.isRequired,
                    dismissSeedBackUpReminder: a.default.bool.isRequired,
                    backupUserData: a.default.func.isRequired,
                    showExtensionInFullSizeView: a.default.bool,
                    setShowExtensionInFullSizeView: a.default.func.isRequired,
                    manageInstitutionalWallets: a.default.bool,
                    setManageInstitutionalWallets: a.default.func.isRequired,
                    dismissSmartAccountSuggestionEnabled: a.default.bool.isRequired,
                    setDismissSmartAccountSuggestionEnabled: a.default.func.isRequired,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/advanced-tab/advanced-tab.component.js' },
    ],
    [
      7466,
      {
        '../../../../shared/constants/preferences': 5809,
        '../../../../shared/modules/selectors': 5874,
        '../../../ducks/app/app': 6845,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './advanced-tab.component': 7465,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.mapStateToProps = n.mapDispatchToProps = n.default = void 0);
                var a,
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  r = e('redux'),
                  i = e('../../../../shared/constants/preferences'),
                  l = e('../../../selectors'),
                  c = e('../../../store/actions'),
                  u = e('../../../../shared/modules/selectors'),
                  d = e('../../../ducks/app/app'),
                  p = (a = e('./advanced-tab.component')) && a.__esModule ? a : { default: a };
                const m = e => {
                  const {
                      appState: { errorInSettings: t },
                      metamask: n,
                    } = e,
                    {
                      featureFlags: { sendHexData: a } = {},
                      dismissSeedBackUpReminder: o,
                      manageInstitutionalWallets: s,
                    } = n,
                    {
                      showFiatInTestnets: r,
                      showTestNetworks: c,
                      showExtensionInFullSizeView: d,
                      autoLockTimeLimit: p = i.DEFAULT_AUTO_LOCK_TIME_LIMIT,
                      dismissSmartAccountSuggestionEnabled: m,
                    } = (0, l.getPreferences)(e);
                  return {
                    errorInSettings: t,
                    sendHexData: a,
                    showFiatInTestnets: r,
                    showTestNetworks: c,
                    showExtensionInFullSizeView: d,
                    smartTransactionsEnabled: (0, u.getSmartTransactionsPreferenceEnabled)(e),
                    autoLockTimeLimit: p,
                    dismissSeedBackUpReminder: o,
                    manageInstitutionalWallets: s,
                    dismissSmartAccountSuggestionEnabled: m,
                  };
                };
                n.mapStateToProps = m;
                const f = e => ({
                  backupUserData: () => (0, c.backupUserData)(),
                  setHexDataFeatureFlag: t => e((0, c.setFeatureFlag)('sendHexData', t)),
                  displayErrorInSettings: t => e((0, d.displayErrorInSettings)(t)),
                  hideErrorInSettings: () => e((0, d.hideErrorInSettings)()),
                  showResetAccountConfirmationModal: () =>
                    e((0, c.showModal)({ name: 'CONFIRM_RESET_ACCOUNT' })),
                  setShowFiatConversionOnTestnetsPreference: t =>
                    e((0, c.setShowFiatConversionOnTestnetsPreference)(t)),
                  setShowTestNetworks: t => e((0, c.setShowTestNetworks)(t)),
                  setShowExtensionInFullSizeView: t => e((0, c.setShowExtensionInFullSizeView)(t)),
                  setSmartTransactionsEnabled: t =>
                    e((0, c.setSmartTransactionsPreferenceEnabled)(t)),
                  setAutoLockTimeLimit: t => e((0, c.setAutoLockTimeLimit)(t)),
                  setDismissSeedBackUpReminder: t => e((0, c.setDismissSeedBackUpReminder)(t)),
                  setManageInstitutionalWallets: t => e((0, c.setManageInstitutionalWallets)(t)),
                  setDismissSmartAccountSuggestionEnabled: t =>
                    e((0, c.setDismissSmartAccountSuggestionEnabled)(t)),
                });
                n.mapDispatchToProps = f;
                n.default = (0, r.compose)(s.withRouter, (0, o.connect)(m, f))(p.default);
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/advanced-tab/advanced-tab.container.js' },
    ],
    [
      7467,
      { './advanced-tab.container': 7466 },
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
                  o = (a = e('./advanced-tab.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/advanced-tab/index.js' },
    ],
    [
      7468,
      {
        '../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../components/app/contact-list/utils': 6009,
        '../../../../components/multichain/pages/send/components': 6664,
        '../../../../components/ui/page-container/page-container-footer': 6784,
        '../../../../components/ui/text-field': 6810,
        '../../../../helpers/constants/routes': 6878,
        '../../../../helpers/utils/util': 6921,
        '../../../confirmations/send/send-content/add-recipient/domain-input': 7360,
        '../../../confirmations/send/send.constants': 7361,
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
                    var n = h(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = g(e('prop-types')),
                  s = e('lodash'),
                  r = g(e('../../../../components/ui/text-field')),
                  i = e('../../../../helpers/constants/routes'),
                  l = e('../../../../helpers/utils/util'),
                  c = g(e('../../../confirmations/send/send-content/add-recipient/domain-input')),
                  u = g(e('../../../../components/ui/page-container/page-container-footer')),
                  d = e('../../../../../shared/modules/hexstring-utils'),
                  p = e('../../../confirmations/send/send.constants'),
                  m = e('../../../../components/multichain/pages/send/components'),
                  f = e('../../../../components/app/contact-list/utils');
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
                function y(e, t, n) {
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
                class E extends a.PureComponent {
                  constructor(e) {
                    super(e),
                      y(this, 'state', {
                        newName: '',
                        selectedAddress: '',
                        addressInputError: '',
                        nameInputError: '',
                        input: '',
                      }),
                      y(this, 'validate', e => {
                        const t =
                          !(0, d.isBurnAddress)(e) &&
                          (0, d.isValidHexAddress)(e, { mixedCaseUseChecksum: !0 });
                        (0, l.isValidDomainName)(e) || t
                          ? this.setState({ addressInputError: null })
                          : this.setState({ addressInputError: p.INVALID_RECIPIENT_ADDRESS_ERROR });
                      }),
                      y(this, 'onChange', e => {
                        this.setState({ input: e }), this.dValidate(e);
                      }),
                      y(this, 'validateName', e => {
                        const { addressBook: t, internalAccounts: n } = this.props;
                        return !(0, f.isDuplicateContact)(t, n, e);
                      }),
                      y(this, 'handleNameChange', e => {
                        const t = this.validateName(e);
                        this.setState({
                          nameInputError: t ? null : this.context.t('nameAlreadyInUse'),
                        }),
                          this.setState({ newName: e });
                      }),
                      (this.dValidate = (0, s.debounce)(this.validate, 500));
                  }
                  UNSAFE_componentWillReceiveProps(e) {
                    if (e.qrCodeData && 'address' === e.qrCodeData.type) {
                      const { domainResolutions: t } = this.props,
                        n = e.qrCodeData.values.address.toLowerCase();
                      [...t.map(({ resolvedAddress: e }) => e), this.state.ethAddress]
                        .map(e => e.toLowerCase())
                        .some(e => e === n) ||
                        (this.setState({ input: n }),
                        this.validate(n),
                        this.props.qrCodeDetected(null));
                    }
                  }
                  renderInput() {
                    return a.default.createElement(c.default, {
                      scanQrCode: e => {
                        this.props.scanQrCode();
                      },
                      onChange: this.onChange,
                      onPaste: e => {
                        this.setState({ input: e }), this.validate(e);
                      },
                      onReset: () => {
                        this.props.resetDomainResolution(),
                          this.setState({ input: '', selectedAddress: '' });
                      },
                      userInput: this.state.selectedAddress || this.state.input,
                    });
                  }
                  render() {
                    const { t: e } = this.context,
                      {
                        history: t,
                        addToAddressBook: n,
                        domainError: o,
                        domainResolutions: s,
                      } = this.props,
                      l = o || this.state.addressInputError,
                      c = this.state.selectedAddress || this.state.input,
                      p =
                        !(0, d.isBurnAddress)(c) &&
                        (0, d.isValidHexAddress)(c, { mixedCaseUseChecksum: !0 });
                    return a.default.createElement(
                      'div',
                      { className: 'settings-page__content-row address-book__add-contact' },
                      a.default.createElement(
                        'div',
                        { className: 'address-book__add-contact__content' },
                        a.default.createElement(
                          'div',
                          {
                            className:
                              'address-book__view-contact__group address-book__add-contact__content__username',
                          },
                          a.default.createElement(
                            'div',
                            { className: 'address-book__view-contact__group__label' },
                            e('userName')
                          ),
                          a.default.createElement(r.default, {
                            type: 'text',
                            id: 'nickname',
                            placeholder: this.context.t('addAlias'),
                            value: this.state.newName,
                            onChange: e => this.handleNameChange(e.target.value),
                            fullWidth: !0,
                            margin: 'dense',
                            error: this.state.nameInputError,
                          })
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'address-book__view-contact__group' },
                          a.default.createElement(
                            'div',
                            { className: 'address-book__view-contact__group__label' },
                            e('ethereumPublicAddress')
                          ),
                          this.renderInput(),
                          a.default.createElement(
                            'div',
                            {
                              className: `address-book__view-contact__group__${1 === (null == s ? void 0 : s.length) ? 'single-' : ''}resolution-list`,
                            },
                            null == s
                              ? void 0
                              : s.map(e => {
                                  const {
                                    resolvedAddress: t,
                                    resolvingSnap: n,
                                    addressBookEntryName: o,
                                    protocol: s,
                                    domainName: r,
                                  } = e;
                                  return a.default.createElement(m.DomainInputResolutionCell, {
                                    key: `${t}${n}${s}`,
                                    address: t,
                                    domainName: o ?? r,
                                    onClick: () => {
                                      this.handleNameChange(r),
                                        this.setState({ input: t }),
                                        this.props.resetDomainResolution();
                                    },
                                    protocol: s,
                                    resolvingSnap: n,
                                  });
                                })
                          ),
                          l &&
                            a.default.createElement(
                              'div',
                              { className: 'address-book__add-contact__error' },
                              e(l)
                            )
                        )
                      ),
                      a.default.createElement(u.default, {
                        cancelText: this.context.t('cancel'),
                        disabled: Boolean(
                          this.state.addressInputError ||
                            this.state.nameInputError ||
                            !p ||
                            !this.state.newName.trim()
                        ),
                        onSubmit: async () => {
                          await n(c, this.state.newName), t.push(i.CONTACT_LIST_ROUTE);
                        },
                        onCancel: () => {
                          t.push(i.CONTACT_LIST_ROUTE);
                        },
                        submitText: this.context.t('save'),
                      })
                    );
                  }
                }
                (n.default = E),
                  y(E, 'contextTypes', { t: o.default.func }),
                  y(E, 'propTypes', {
                    addressBook: o.default.array,
                    internalAccounts: o.default.array,
                    addToAddressBook: o.default.func,
                    history: o.default.object,
                    scanQrCode: o.default.func,
                    qrCodeData: o.default.object,
                    qrCodeDetected: o.default.func,
                    domainResolutions: o.default.arrayOf(o.default.object),
                    domainError: o.default.string,
                    resetDomainResolution: o.default.func,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/add-contact/add-contact.component.js',
      },
    ],
    [
      7469,
      {
        '../../../../ducks/app/app': 6845,
        '../../../../ducks/domains': 6854,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        './add-contact.component': 7468,
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
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../../store/actions'),
                  l = e('../../../../ducks/app/app'),
                  c = e('../../../../ducks/domains'),
                  u = e('../../../../selectors'),
                  d = (a = e('./add-contact.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  r.withRouter,
                  (0, s.connect)(
                    e => ({
                      addressBook: (0, u.getAddressBook)(e),
                      internalAccounts: (0, u.getInternalAccounts)(e),
                      qrCodeData: (0, l.getQrCodeData)(e),
                      domainError: (0, c.getDomainError)(e),
                      domainResolutions: (0, c.getDomainResolutions)(e),
                    }),
                    e => ({
                      addToAddressBook: (t, n) => e((0, i.addToAddressBook)(t, n)),
                      scanQrCode: () => e((0, i.showQrScanner)()),
                      qrCodeDetected: t => e((0, i.qrCodeDetected)(t)),
                      resetDomainResolution: () => e((0, c.resetDomainResolution)()),
                    })
                  )
                )(d.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/add-contact/add-contact.container.js',
      },
    ],
    [
      7470,
      { './add-contact.container': 7469 },
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
                  o = (a = e('./add-contact.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/contact-list-tab/add-contact/index.js' },
    ],
    [
      7471,
      {
        '../../../components/app/contact-list': 6007,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/settings-search': 6915,
        './add-contact': 7470,
        './edit-contact': 7475,
        './view-contact': 7477,
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
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = f(e('prop-types')),
                  s = f(e('classnames')),
                  r = f(e('../../../components/app/contact-list')),
                  i = e('../../../helpers/constants/routes'),
                  l = e('../../../helpers/utils/settings-search'),
                  c = e('../../../components/component-library'),
                  u = e('../../../helpers/constants/design-system'),
                  d = f(e('./edit-contact')),
                  p = f(e('./add-contact')),
                  m = f(e('./view-contact'));
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
                class y extends a.Component {
                  constructor(...e) {
                    super(...e),
                      h(
                        this,
                        'settingsRefs',
                        Array(
                          (0, l.getNumberOfSettingRoutesInTab)(
                            this.context.t,
                            this.context.t('contacts')
                          )
                        )
                          .fill(undefined)
                          .map(() => a.default.createRef())
                      );
                  }
                  componentDidUpdate() {
                    const { t: e } = this.context;
                    (0, l.handleSettingsRefs)(e, e('contacts'), this.settingsRefs);
                  }
                  componentDidMount() {
                    const { t: e } = this.context;
                    (0, l.handleSettingsRefs)(e, e('contacts'), this.settingsRefs);
                  }
                  renderAddresses() {
                    const {
                        addressBook: e,
                        internalAccounts: t,
                        history: n,
                        selectedAddress: o,
                      } = this.props,
                      s = e.filter(({ name: e }) => Boolean(e)),
                      l = e.filter(({ name: e }) => !e),
                      { t: d } = this.context;
                    return e.length
                      ? a.default.createElement(
                          'div',
                          null,
                          a.default.createElement(r.default, {
                            addressBook: e,
                            internalAccounts: t,
                            searchForContacts: () => s,
                            searchForRecents: () => l,
                            selectRecipient: e => {
                              n.push(`${i.CONTACT_VIEW_ROUTE}/${e}`);
                            },
                            selectedAddress: o,
                          })
                        )
                      : a.default.createElement(
                          'div',
                          { className: 'address-book__container' },
                          a.default.createElement(
                            'div',
                            null,
                            a.default.createElement(c.Icon, {
                              name: c.IconName.Book,
                              color: u.IconColor.iconMuted,
                              className: 'address-book__icon',
                              size: c.IconSize.Xl,
                            }),
                            a.default.createElement(
                              'h4',
                              { className: 'address-book__title' },
                              d('buildContactList')
                            ),
                            a.default.createElement(
                              'p',
                              { className: 'address-book__sub-title' },
                              d('addFriendsAndAddresses')
                            ),
                            a.default.createElement(
                              'button',
                              {
                                className: 'address-book__link',
                                onClick: () => {
                                  n.push(i.CONTACT_ADD_ROUTE);
                                },
                              },
                              '+ ',
                              d('addContact')
                            )
                          )
                        );
                  }
                  renderAddButton() {
                    const { history: e, viewingContact: t, editingContact: n } = this.props;
                    return a.default.createElement(
                      c.ButtonPrimary,
                      {
                        className: (0, s.default)('address-book-add-button__button', {
                          'address-book-add-button__button--hidden': t || n,
                        }),
                        onClick: () => {
                          e.push(i.CONTACT_ADD_ROUTE);
                        },
                        margin: 4,
                        size: u.Size.LG,
                      },
                      this.context.t('addContact')
                    );
                  }
                  renderContactContent() {
                    const { viewingContact: e, editingContact: t, addingContact: n } = this.props;
                    let o = null;
                    return (
                      e ? (o = m.default) : t ? (o = d.default) : n && (o = p.default),
                      o &&
                        a.default.createElement(
                          'div',
                          { className: 'address-book-contact-content' },
                          a.default.createElement(o, null)
                        )
                    );
                  }
                  renderAddressBookContent() {
                    const { hideAddressBook: e } = this.props;
                    return e
                      ? null
                      : a.default.createElement(
                          'div',
                          { ref: this.settingsRefs[0], className: 'address-book' },
                          this.renderAddresses()
                        );
                  }
                  render() {
                    const { addingContact: e, addressBook: t, currentPath: n } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: 'address-book-wrapper' },
                      this.renderAddressBookContent(),
                      this.renderContactContent(),
                      n === i.CONTACT_LIST_ROUTE && !e && t.length > 0
                        ? this.renderAddButton()
                        : null
                    );
                  }
                }
                (n.default = y),
                  h(y, 'contextTypes', { t: o.default.func }),
                  h(y, 'propTypes', {
                    addressBook: o.default.array,
                    internalAccounts: o.default.array,
                    history: o.default.object,
                    selectedAddress: o.default.string,
                    viewingContact: o.default.bool,
                    editingContact: o.default.bool,
                    addingContact: o.default.bool,
                    hideAddressBook: o.default.bool,
                    currentPath: o.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/contact-list-tab.component.js',
      },
    ],
    [
      7472,
      {
        '../../../helpers/constants/routes': 6878,
        '../../../selectors': 7601,
        './contact-list-tab.component': 7471,
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
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../selectors'),
                  l = e('../../../helpers/constants/routes'),
                  c = (a = e('./contact-list-tab.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  r.withRouter,
                  (0, s.connect)((e, t) => {
                    const { location: n } = t,
                      { pathname: a } = n,
                      o = a.match(/[^/]+$/u)[0],
                      s = o.includes('0x'),
                      r = Boolean(a.match(l.CONTACT_VIEW_ROUTE)),
                      c = Boolean(a.match(l.CONTACT_EDIT_ROUTE)),
                      u = Boolean(a.match(l.CONTACT_ADD_ROUTE)),
                      d = r || c || u;
                    return {
                      viewingContact: r,
                      editingContact: c,
                      addingContact: u,
                      addressBook: (0, i.getAddressBook)(e),
                      internalAccounts: (0, i.getInternalAccounts)(e),
                      selectedAddress: s ? o : '',
                      hideAddressBook: d,
                      currentPath: a,
                    };
                  })
                )(c.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/contact-list-tab.container.js',
      },
    ],
    [
      7473,
      {
        '../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../components/app/contact-list/utils': 6009,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/button/button.component': 6706,
        '../../../../components/ui/page-container/page-container-footer': 6784,
        '../../../../components/ui/text-field': 6810,
        '../../../../helpers/constants/design-system': 6872,
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
                    var n = f(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = m(e('prop-types')),
                  s = e('react-router-dom'),
                  r = m(e('../../../../components/ui/button/button.component')),
                  i = m(e('../../../../components/ui/text-field')),
                  l = m(e('../../../../components/ui/page-container/page-container-footer')),
                  c = e('../../../../../shared/modules/hexstring-utils'),
                  u = e('../../../../components/component-library'),
                  d = e('../../../../helpers/constants/design-system'),
                  p = e('../../../../components/app/contact-list/utils');
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
                function g(e, t, n) {
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
                      g(this, 'state', {
                        newName: this.props.name,
                        newAddress: this.props.address,
                        newMemo: this.props.memo,
                        nameError: '',
                        addressError: '',
                      }),
                      g(this, 'validateName', e => {
                        if (e === this.props.name) return !0;
                        const { addressBook: t, internalAccounts: n } = this.props;
                        return !(0, p.isDuplicateContact)(t, n, e);
                      }),
                      g(this, 'handleNameChange', e => {
                        const t = e.target.value,
                          n = this.validateName(t);
                        this.setState({ nameError: n ? null : this.context.t('nameAlreadyInUse') }),
                          this.setState({ newName: t });
                      });
                  }
                  render() {
                    const { t: e } = this.context,
                      {
                        address: t,
                        addToAddressBook: n,
                        chainId: o,
                        history: p,
                        listRoute: m,
                        memo: f,
                        name: g,
                        removeFromAddressBook: h,
                        viewRoute: y,
                      } = this.props;
                    return t
                      ? a.default.createElement(
                          'div',
                          { className: 'settings-page__content-row address-book__edit-contact' },
                          a.default.createElement(
                            u.Box,
                            {
                              className: 'settings-page__header address-book__header--edit',
                              paddingLeft: 6,
                              paddingRight: 6,
                              width: d.BlockSize.Full,
                              alignItems: d.AlignItems.center,
                            },
                            a.default.createElement(
                              u.Box,
                              {
                                display: d.Display.Flex,
                                alignItems: d.AlignItems.center,
                                style: { overflow: 'hidden' },
                                paddingRight: 2,
                              },
                              a.default.createElement(u.AvatarAccount, {
                                size: u.AvatarAccountSize.Lg,
                                address: t,
                              }),
                              a.default.createElement(
                                u.Text,
                                {
                                  className: 'address-book__header__name',
                                  variant: d.TextVariant.bodyLgMedium,
                                  marginInlineStart: 4,
                                  style: { overflow: 'hidden' },
                                  ellipsis: !0,
                                },
                                g || t
                              )
                            ),
                            a.default.createElement(
                              u.Box,
                              { className: 'settings-page__address-book-button' },
                              a.default.createElement(
                                r.default,
                                {
                                  type: 'link',
                                  onClick: async () => {
                                    await h(o, t), p.push(m);
                                  },
                                  style: { display: 'contents' },
                                },
                                e('deleteContact')
                              )
                            )
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'address-book__edit-contact__content' },
                            a.default.createElement(
                              'div',
                              { className: 'address-book__view-contact__group' },
                              a.default.createElement(
                                'div',
                                { className: 'address-book__view-contact__group__label' },
                                e('userName')
                              ),
                              a.default.createElement(i.default, {
                                type: 'text',
                                id: 'nickname',
                                placeholder: this.context.t('addAlias'),
                                value: this.state.newName,
                                onChange: this.handleNameChange,
                                fullWidth: !0,
                                margin: 'dense',
                                error: this.state.nameError,
                              })
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'address-book__view-contact__group' },
                              a.default.createElement(
                                'div',
                                { className: 'address-book__view-contact__group__label' },
                                e('ethereumPublicAddress')
                              ),
                              a.default.createElement(i.default, {
                                type: 'text',
                                id: 'address',
                                value: this.state.newAddress,
                                error: this.state.addressError,
                                onChange: e => this.setState({ newAddress: e.target.value }),
                                fullWidth: !0,
                                multiline: !0,
                                rows: 4,
                                margin: 'dense',
                                classes: {
                                  inputMultiline: 'address-book__view-contact__address__text-area',
                                  inputRoot: 'address-book__view-contact__address',
                                },
                              })
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'address-book__view-contact__group' },
                              a.default.createElement(
                                'div',
                                {
                                  className:
                                    'address-book__view-contact__group__label--capitalized',
                                },
                                e('memo')
                              ),
                              a.default.createElement(i.default, {
                                type: 'text',
                                id: 'memo',
                                placeholder: f,
                                value: this.state.newMemo,
                                onChange: e => this.setState({ newMemo: e.target.value }),
                                fullWidth: !0,
                                margin: 'dense',
                                multiline: !0,
                                rows: 3,
                                classes: {
                                  inputMultiline: 'address-book__view-contact__text-area',
                                  inputRoot: 'address-book__view-contact__text-area-wrapper',
                                },
                              })
                            )
                          ),
                          a.default.createElement(l.default, {
                            cancelText: this.context.t('cancel'),
                            onSubmit: async () => {
                              '' !== this.state.newAddress && this.state.newAddress !== t
                                ? !(0, c.isBurnAddress)(this.state.newAddress) &&
                                  (0, c.isValidHexAddress)(this.state.newAddress, {
                                    mixedCaseUseChecksum: !0,
                                  })
                                  ? (await h(o, t),
                                    await n(
                                      this.state.newAddress,
                                      this.state.newName || g,
                                      this.state.newMemo || f
                                    ),
                                    p.push(m))
                                  : this.setState({
                                      addressError: this.context.t('invalidAddress'),
                                    })
                                : (await n(t, this.state.newName || g, this.state.newMemo || f),
                                  p.push(m));
                            },
                            onCancel: () => {
                              p.push(`${y}/${t}`);
                            },
                            submitText: this.context.t('save'),
                            disabled: Boolean(
                              (this.state.newName === g &&
                                this.state.newAddress === t &&
                                this.state.newMemo === f) ||
                                !this.state.newName.trim() ||
                                this.state.nameError
                            ),
                          })
                        )
                      : a.default.createElement(s.Redirect, { to: { pathname: m } });
                  }
                }
                (n.default = h),
                  g(h, 'contextTypes', { t: o.default.func }),
                  g(h, 'propTypes', {
                    addressBook: o.default.array,
                    internalAccounts: o.default.array,
                    addToAddressBook: o.default.func,
                    removeFromAddressBook: o.default.func,
                    history: o.default.object,
                    name: o.default.string,
                    address: o.default.string,
                    chainId: o.default.string,
                    memo: o.default.string,
                    viewRoute: o.default.string,
                    listRoute: o.default.string,
                  }),
                  g(h, 'defaultProps', { name: '', memo: '' });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/edit-contact/edit-contact.component.js',
      },
    ],
    [
      7474,
      {
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../helpers/constants/routes': 6878,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        './edit-contact.component': 7473,
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
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../../selectors'),
                  l = e('../../../../../shared/modules/selectors/networks'),
                  c = e('../../../../helpers/constants/routes'),
                  u = e('../../../../store/actions'),
                  d = (a = e('./edit-contact.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  r.withRouter,
                  (0, s.connect)(
                    (e, t) => {
                      var n;
                      const { location: a } = t,
                        { pathname: o } = a,
                        s = o.match(/[^/]+$/u)[0],
                        r = s.includes('0x') ? s.toLowerCase() : t.match.params.id,
                        u = (0, i.getAddressBookEntry)(e, r),
                        { memo: d } = u || {},
                        p =
                          (null == u ? void 0 : u.name) ||
                          (null === (n = (0, i.getInternalAccountByAddress)(e, r)) || void 0 === n
                            ? void 0
                            : n.metadata.name),
                        { chainId: m } = (0, l.getProviderConfig)(e);
                      return {
                        address: u ? r : null,
                        addressBook: (0, i.getAddressBook)(e),
                        internalAccounts: (0, i.getInternalAccounts)(e),
                        chainId: m,
                        name: p,
                        memo: d,
                        viewRoute: c.CONTACT_VIEW_ROUTE,
                        listRoute: c.CONTACT_LIST_ROUTE,
                      };
                    },
                    e => ({
                      addToAddressBook: (t, n, a) => e((0, u.addToAddressBook)(t, n, a)),
                      removeFromAddressBook: (t, n) => e((0, u.removeFromAddressBook)(t, n)),
                    })
                  )
                )(d.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/edit-contact/edit-contact.container.js',
      },
    ],
    [
      7475,
      { './edit-contact.container': 7474 },
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
                  o = (a = e('./edit-contact.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/contact-list-tab/edit-contact/index.js' },
    ],
    [
      7476,
      { './contact-list-tab.container': 7472 },
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
                  o = (a = e('./contact-list-tab.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/contact-list-tab/index.js' },
    ],
    [
      7477,
      { './view-contact.container': 7479 },
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
                  o = (a = e('./view-contact.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/contact-list-tab/view-contact/index.js' },
    ],
    [
      7478,
      {
        '../../../../components/component-library': 6402,
        '../../../../components/ui/button/button.component': 6706,
        '../../../../components/ui/tooltip': 6818,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useCopyToClipboard': 6973,
        '../../../../hooks/useI18nContext': 6985,
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
                var a = p(e('react')),
                  o = p(e('prop-types')),
                  s = e('react-router-dom'),
                  r = p(e('../../../../components/ui/button/button.component')),
                  i = e('../../../../components/component-library'),
                  l = p(e('../../../../components/ui/tooltip')),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../hooks/useCopyToClipboard'),
                  d = e('../../../../helpers/constants/design-system');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function m({
                  history: e,
                  name: t,
                  address: n,
                  checkSummedAddress: o,
                  memo: p,
                  editRoute: m,
                  listRoute: f,
                }) {
                  const g = (0, c.useI18nContext)(),
                    [h, y] = (0, u.useCopyToClipboard)();
                  return n
                    ? a.default.createElement(
                        'div',
                        { className: 'settings-page__content-row' },
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          a.default.createElement(
                            i.Box,
                            {
                              className: 'settings-page__header address-book__header',
                              paddingLeft: 6,
                              paddingRight: 6,
                            },
                            a.default.createElement(i.AvatarAccount, {
                              size: i.AvatarAccountSize.Lg,
                              address: n,
                            }),
                            a.default.createElement(
                              i.Text,
                              {
                                className: 'address-book__header__name',
                                variant: d.TextVariant.bodyLgMedium,
                                marginInlineStart: 4,
                                style: { overflow: 'hidden' },
                                ellipsis: !0,
                              },
                              t || n
                            )
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'address-book__view-contact__group' },
                            a.default.createElement(
                              r.default,
                              {
                                type: 'secondary',
                                onClick: () => {
                                  e.push(`${m}/${n}`);
                                },
                              },
                              g('edit')
                            )
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'address-book__view-contact__group' },
                            a.default.createElement(
                              'div',
                              { className: 'address-book__view-contact__group__label' },
                              g('ethereumPublicAddress')
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'address-book__view-contact__group__value' },
                              a.default.createElement(
                                'div',
                                { className: 'address-book__view-contact__group__static-address' },
                                (function (e) {
                                  return `0x${e
                                    .slice(2)
                                    .match(/.{1,4}/gu)
                                    .join('')}`;
                                })(o)
                              ),
                              a.default.createElement(
                                l.default,
                                {
                                  position: 'bottom',
                                  title: g(h ? 'copiedExclamation' : 'copyToClipboard'),
                                },
                                a.default.createElement(i.ButtonIcon, {
                                  ariaLabel: 'copy',
                                  className:
                                    'address-book__view-contact__group__static-address--copy-icon',
                                  onClick: () => {
                                    y(o);
                                  },
                                  iconName: h ? i.IconName.CopySuccess : i.IconName.Copy,
                                  size: i.ButtonIconSize.Lg,
                                  color: d.IconColor.primaryDefault,
                                })
                              )
                            )
                          ),
                          p.length > 0
                            ? a.default.createElement(
                                'div',
                                { className: 'address-book__view-contact__group' },
                                a.default.createElement(
                                  'div',
                                  {
                                    className:
                                      'address-book__view-contact__group__label--capitalized',
                                  },
                                  g('memo')
                                ),
                                a.default.createElement(
                                  'div',
                                  {
                                    className: 'address-book__view-contact__group__static-address',
                                  },
                                  p
                                )
                              )
                            : null
                        )
                      )
                    : a.default.createElement(s.Redirect, { to: { pathname: f } });
                }
                m.propTypes = {
                  name: o.default.string,
                  address: o.default.string,
                  history: o.default.object,
                  checkSummedAddress: o.default.string,
                  memo: o.default.string,
                  editRoute: o.default.string,
                  listRoute: o.default.string.isRequired,
                };
                n.default = a.default.memo(m);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/view-contact/view-contact.component.js',
      },
    ],
    [
      7479,
      {
        '../../../../../shared/modules/hexstring-utils': 5864,
        '../../../../helpers/constants/routes': 6878,
        '../../../../selectors': 7601,
        './view-contact.component': 7478,
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
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../../selectors'),
                  l = e('../../../../helpers/constants/routes'),
                  c = e('../../../../../shared/modules/hexstring-utils'),
                  u = (a = e('./view-contact.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  r.withRouter,
                  (0, s.connect)((e, t) => {
                    const { location: n } = t,
                      { pathname: a } = n,
                      o = a.match(/[^/]+$/u)[0],
                      s = o.includes('0x') ? o.toLowerCase() : t.match.params.id,
                      r = (0, i.getInternalAccountByAddress)(e, s),
                      u = (0, i.getAddressBookEntry)(e, s),
                      { memo: d } = u || {};
                    return {
                      name: (null == u ? void 0 : u.name) || r.metadata.name,
                      address: u ? s : null,
                      checkSummedAddress: (0, c.toChecksumHexAddress)(s),
                      memo: d,
                      editRoute: l.CONTACT_EDIT_ROUTE,
                      listRoute: l.CONTACT_LIST_ROUTE,
                    };
                  })
                )(u.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/contact-list-tab/view-contact/view-contact.container.js',
      },
    ],
    [
      7480,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/zendesk-url': 6885,
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
                  (n.DeprecatedNetworkModal = void 0);
                var a = l(e('react')),
                  o = e('../../../hooks/useI18nContext'),
                  s = e('../../../components/component-library'),
                  r = e('../../../helpers/constants/design-system'),
                  i = l(e('../../../helpers/constants/zendesk-url'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.DeprecatedNetworkModal = ({ onClose: e }) => {
                  const t = (0, o.useI18nContext)();
                  return a.default.createElement(
                    s.Modal,
                    { isOpen: !0, isClosedOnOutsideClick: !1, onClose: e },
                    a.default.createElement(s.ModalOverlay, null),
                    a.default.createElement(
                      s.ModalContent,
                      null,
                      a.default.createElement(
                        s.ModalHeader,
                        { paddingTop: 2, paddingBottom: 2 },
                        t('deprecatedNetwork')
                      ),
                      a.default.createElement(
                        s.ModalBody,
                        null,
                        a.default.createElement(
                          s.Box,
                          { paddingBottom: 2 },
                          a.default.createElement(
                            s.Text,
                            {
                              textAlign: r.TextAlign.Center,
                              variant: r.TextVariant.bodyMd,
                              fontWeight: r.FontWeight.Normal,
                            },
                            t('deprecatedNetworkDescription', [
                              a.default.createElement(
                                s.ButtonLink,
                                {
                                  key: 'import-token-fake-token-warning',
                                  rel: 'noopener noreferrer',
                                  target: '_blank',
                                  href: i.default.NETWORK_DEPRECATED,
                                  variant: r.TextVariant.bodySm,
                                  fontWeight: r.FontWeight.Normal,
                                },
                                t('learnMoreUpperCase')
                              ),
                            ])
                          )
                        )
                      ),
                      a.default.createElement(
                        s.Box,
                        {
                          display: r.Display.Flex,
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingBottom: 2,
                        },
                        a.default.createElement(
                          s.ButtonPrimary,
                          {
                            block: !0,
                            size: s.ButtonPrimarySize.Lg,
                            onClick: e,
                            textProps: { variant: r.TextVariant.bodyMdMedium },
                            style: { fontSize: '14px' },
                          },
                          t('deprecatedNetworkButtonMsg')
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
        file: 'ui/pages/settings/deprecated-network-modal/DeprecatedNetworkModal.tsx',
      },
    ],
    [
      7481,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/settings-search': 6915,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './developer-options-toggle-row-component': 7482,
        './profile-sync': 7484,
        './sentry-test': 7485,
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
                    var n = v(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('react-router-dom'),
                  r = e('../../../components/component-library'),
                  i = e('../../../helpers/constants/design-system'),
                  l = e('../../../helpers/constants/routes'),
                  c = e('../../../helpers/utils/settings-search'),
                  u = e('../../../hooks/useI18nContext'),
                  d = e('../../../store/actions'),
                  p = e('../../../../app/scripts/lib/util'),
                  m = e('../../../../shared/constants/app'),
                  f = e('../../../selectors'),
                  g = E(e('./developer-options-toggle-row-component')),
                  h = E(e('./sentry-test')),
                  y = e('./profile-sync');
                function E(e) {
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
                  const e = (0, u.useI18nContext)(),
                    t = (0, o.useDispatch)(),
                    n = (0, s.useHistory)(),
                    [E, v] = (0, a.useState)(!1),
                    [b, _] = (0, a.useState)(!1),
                    [k, x] = (0, a.useState)(!0),
                    T = Array((0, c.getNumberOfSettingRoutesInTab)(e, e('developerOptions')))
                      .fill(undefined)
                      .map(() => a.default.createRef());
                  (0, a.useEffect)(() => {
                    (0, c.handleSettingsRefs)(e, e('developerOptions'), T);
                  }, [e, T]);
                  const C = (0, a.useCallback)(() => {
                      (0, d.resetViewedNotifications)(), v(!0);
                    }, []),
                    w = (0, a.useCallback)(async () => {
                      await t((0, d.resetOnboarding)()), _(!0);
                      const e = `${l.ONBOARDING_SECURE_YOUR_WALLET_ROUTE}/?isFromReminder=true`;
                      if ((0, p.getEnvironmentType)() === m.ENVIRONMENT_TYPE_POPUP) {
                        const { platform: t } = global;
                        null != t &&
                          t.openExtensionInBrowser &&
                          (null == t || t.openExtensionInBrowser(e, null, !0));
                      } else n.push(e);
                    }, [t, n]),
                    A = (0, o.useSelector)(f.getRemoteFeatureFlags);
                  return a.default.createElement(
                    'div',
                    { className: 'settings-page__body' },
                    a.default.createElement(
                      r.Text,
                      { className: 'settings-page__security-tab-sub-header__bold' },
                      'States'
                    ),
                    a.default.createElement(
                      r.Text,
                      {
                        className: 'settings-page__security-tab-sub-header',
                        color: i.TextColor.textAlternative,
                        paddingTop: 6,
                        ref: T[0],
                      },
                      'Current States'
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-padded' },
                      a.default.createElement(
                        r.Box,
                        {
                          className: 'settings-page__content-row',
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          justifyContent: i.JustifyContent.spaceBetween,
                          gap: 4,
                        },
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          a.default.createElement('span', null, 'Remote feature flags'),
                          a.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            'Remote feature flag values come from LaunchDarkly by default. If you need to update feature flag values locally for development purposes, you can change feature flag values in .manifest-overrides.json, which will override values coming from LaunchDarkly.'
                          )
                        ),
                        a.default.createElement(
                          'div',
                          {
                            className: 'settings-page__content-description',
                            'data-testid': 'developer-options-remote-feature-flags',
                          },
                          JSON.stringify(A)
                        )
                      )
                    ),
                    a.default.createElement(
                      r.Text,
                      {
                        className: 'settings-page__security-tab-sub-header',
                        color: i.TextColor.textAlternative,
                        paddingTop: 6,
                        ref: T[0],
                      },
                      'Reset States'
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-padded' },
                      a.default.createElement(
                        r.Box,
                        {
                          ref: T[1],
                          className: 'settings-page__content-row',
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          justifyContent: i.JustifyContent.spaceBetween,
                          gap: 4,
                        },
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          a.default.createElement('span', null, 'Announcements'),
                          a.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            "Resets isShown boolean to false for all announcements. Announcements are the notifications shown in the What's New popup modal."
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(
                            r.Button,
                            { variant: r.ButtonVariant.Primary, onClick: C },
                            'Reset'
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(
                            r.Box,
                            {
                              display: i.Display.Flex,
                              alignItems: i.AlignItems.center,
                              paddingLeft: 2,
                              paddingRight: 2,
                              style: { height: '40px', width: '40px' },
                            },
                            a.default.createElement(r.Icon, {
                              className: 'settings-page-developer-options__icon-check',
                              name: r.IconName.Check,
                              color: i.IconColor.successDefault,
                              size: r.IconSize.Lg,
                              hidden: !E,
                            })
                          )
                        )
                      ),
                      a.default.createElement(
                        r.Box,
                        {
                          ref: T[2],
                          className: 'settings-page__content-row',
                          display: i.Display.Flex,
                          flexDirection: i.FlexDirection.Row,
                          justifyContent: i.JustifyContent.spaceBetween,
                          gap: 4,
                        },
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item', style: { flex: '1 1 auto' } },
                          a.default.createElement('span', null, 'Onboarding'),
                          a.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            'Resets various states related to onboarding and redirects to the "Secure Your Wallet" onboarding page.'
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(
                            r.Button,
                            { variant: r.ButtonVariant.Primary, onClick: w },
                            'Reset'
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(
                            r.Box,
                            {
                              display: i.Display.Flex,
                              alignItems: i.AlignItems.center,
                              paddingLeft: 2,
                              paddingRight: 2,
                              style: { height: '40px', width: '40px' },
                            },
                            a.default.createElement(r.Icon, {
                              className: 'settings-page-developer-options__icon-check',
                              name: r.IconName.Check,
                              color: i.IconColor.successDefault,
                              size: r.IconSize.Lg,
                              hidden: !b,
                            })
                          )
                        )
                      ),
                      a.default.createElement(g.default, {
                        title: 'Service Worker Keep Alive',
                        description:
                          'Results in a timestamp being continuously saved to session.storage',
                        isEnabled: k,
                        onToggle: e =>
                          (async e => {
                            await t((0, d.setServiceWorkerKeepAlivePreference)(e)), x(e);
                          })(!e),
                        dataTestId: 'developer-options-service-worker-alive-toggle',
                        settingsRef: T[3],
                      })
                    ),
                    a.default.createElement(y.ProfileSyncDevSettings, null),
                    a.default.createElement(h.default, null)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/developer-options-tab/developer-options-tab.tsx',
      },
    ],
    [
      7482,
      {
        '../../../components/component-library': 6402,
        '../../../components/ui/toggle-button': 6814,
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
                var a = i(e('react')),
                  o = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  r = i(e('../../../components/ui/toggle-button'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.default = ({
                  title: e,
                  description: t,
                  isEnabled: n,
                  onToggle: i,
                  dataTestId: l,
                  settingsRef: c,
                }) =>
                  a.default.createElement(
                    o.Box,
                    {
                      ref: c,
                      className: 'settings-page__content-row',
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Row,
                      justifyContent: s.JustifyContent.spaceBetween,
                      gap: 4,
                    },
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-item' },
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-description' },
                        a.default.createElement('span', null, e),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          t
                        )
                      )
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-item-col' },
                      a.default.createElement(r.default, {
                        value: n,
                        onToggle: i,
                        offLabel: 'Off',
                        onLabel: 'On',
                        dataTestId: l,
                      })
                    )
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/developer-options-tab/developer-options-toggle-row-component.tsx',
      },
    ],
    [
      7483,
      { './developer-options-tab': 7481 },
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
                  o = (a = e('./developer-options-tab')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/developer-options-tab/index.tsx' },
    ],
    [
      7484,
      {
        '../../../components/component-library': 6402,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/identity/useAccountSyncing': 6944,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useDeleteAccountSyncDataProps = n.ProfileSyncDevSettings = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = i(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('../../../components/component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  r = e('../../../hooks/identity/useAccountSyncing');
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const l = ({ onDelete: e, deleteSuccessful: t, title: n, description: r }) =>
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-padded' },
                      a.default.createElement(
                        o.Box,
                        {
                          className: 'settings-page__content-row',
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Row,
                          justifyContent: s.JustifyContent.spaceBetween,
                          gap: 4,
                        },
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          a.default.createElement('span', null, n),
                          a.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            r
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(
                            o.Button,
                            { variant: o.ButtonVariant.Primary, onClick: e },
                            'Reset'
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(
                            o.Box,
                            {
                              display: s.Display.Flex,
                              alignItems: s.AlignItems.center,
                              paddingLeft: 2,
                              paddingRight: 2,
                              style: { height: '40px', width: '40px' },
                            },
                            a.default.createElement(o.Icon, {
                              className: 'settings-page-developer-options__icon-check',
                              name: o.IconName.Check,
                              color: s.IconColor.successDefault,
                              size: o.IconSize.Lg,
                              hidden: !t,
                            })
                          )
                        )
                      )
                    ),
                  c = () => {
                    const [e, t] = (0, a.useState)(!1),
                      { dispatchDeleteAccountSyncingData: n } = (0,
                      r.useDeleteAccountSyncingDataFromUserStorage)();
                    return {
                      deleteSuccessful: e,
                      onDelete: (0, a.useCallback)(async () => {
                        await n(), t(!0);
                      }, [n, t]),
                      title: 'Account syncing',
                      description:
                        'Deletes all user storage entries for the current SRP. This can help if you tested Account Syncing early on and have corrupted data. This will not remove internal accounts already created and renamed. If you want to start from scratch with only the first account and restart syncing from this point on, you will need to reinstall the extension after this action.',
                    };
                  };
                n.useDeleteAccountSyncDataProps = c;
                n.ProfileSyncDevSettings = () =>
                  a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      o.Text,
                      { className: 'settings-page__security-tab-sub-header__bold' },
                      'Profile Sync'
                    ),
                    a.default.createElement(l, c())
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/developer-options-tab/profile-sync.tsx' },
    ],
    [
      7485,
      {
        '../../../../shared/lib/trace': 5849,
        '../../../../shared/modules/i18n': 5865,
        '../../../components/component-library': 6402,
        '../../../components/component-library/button/button.types': 6382,
        '../../../ducks/locale/locale': 6859,
        '../../../helpers/constants/design-system': 6872,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = p(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('../../../components/component-library'),
                  r = e('../../../helpers/constants/design-system'),
                  i = e('../../../../shared/lib/trace'),
                  l = e('../../../components/component-library/button/button.types'),
                  c = e('../../../store/actions'),
                  u = e('../../../../shared/modules/i18n'),
                  d = e('../../../ducks/locale/locale');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function m(e) {
                  return new Promise(t => setTimeout(t, e));
                }
                function f() {
                  const e = (0, a.useCallback)(async () => {
                    var e, t;
                    await (null === (e = (t = window.stateHooks).throwTestError) || void 0 === e
                      ? void 0
                      : e.call(t, 'Developer Options'));
                  }, []);
                  return a.default.createElement(E, {
                    name: 'Generate UI Error',
                    description: a.default.createElement(
                      'span',
                      null,
                      'Generate an unhandled ',
                      a.default.createElement('b', null, 'TestError'),
                      ' in this window.'
                    ),
                    onClick: e,
                    expectError: !0,
                  });
                }
                function g() {
                  const e = (0, a.useCallback)(async () => {
                    var e, t;
                    await (null === (e = (t = window.stateHooks).throwTestBackgroundError) ||
                    void 0 === e
                      ? void 0
                      : e.call(t, 'Developer Options'));
                  }, []);
                  return a.default.createElement(E, {
                    name: 'Generate Background Error',
                    description: a.default.createElement(
                      'span',
                      null,
                      'Generate an unhandled ',
                      a.default.createElement('b', null, 'TestError'),
                      ' in the service worker.'
                    ),
                    onClick: e,
                    expectError: !0,
                  });
                }
                function h() {
                  const e = (0, a.useCallback)(async () => {
                    await (0, i.trace)(
                      {
                        name: i.TraceName.DeveloperTest,
                        data: { 'test.data.number': 123 },
                        tags: { 'test.tag.number': 123 },
                      },
                      async e => {
                        await (0, i.trace)(
                          {
                            name: i.TraceName.NestedTest1,
                            data: { 'test.data.boolean': !0 },
                            tags: { 'test.tag.boolean': !0 },
                            parentContext: e,
                          },
                          () => m(1e3)
                        ),
                          await (0, i.trace)(
                            {
                              name: i.TraceName.NestedTest2,
                              data: { 'test.data.string': 'test' },
                              tags: { 'test.tag.string': 'test' },
                              parentContext: e,
                            },
                            () => m(500)
                          );
                      }
                    );
                  }, []);
                  return a.default.createElement(E, {
                    name: 'Generate Trace',
                    description: a.default.createElement(
                      'span',
                      null,
                      'Generate a ',
                      a.default.createElement('b', null, 'Developer Test'),
                      ' Sentry trace.'
                    ),
                    onClick: e,
                  });
                }
                function y({ currentLocale: e }) {
                  const t = (0, o.useDispatch)();
                  return a.default.createElement(E, {
                    name: 'Generate A Page Crash',
                    description: a.default.createElement(
                      'span',
                      null,
                      'Trigger the crash on extension to send user feedback to sentry. You can click "Try again" to reload extension'
                    ),
                    onClick: async () => {
                      const n = await (0, u.fetchLocale)(e);
                      await t((0, c.setCurrentLocale)(e, { ...n, developerOptions: undefined })),
                        await (0, c.forceUpdateMetamaskState)(t);
                    },
                    expectError: !0,
                    testId: 'developer-options-generate-page-crash-button',
                  });
                }
                function E({ name: e, description: t, onClick: n, expectError: o, testId: i }) {
                  const [c, u] = (0, a.useState)(!1),
                    d = (0, a.useCallback)(async () => {
                      let e = !1;
                      try {
                        await n();
                      } catch (t) {
                        throw ((e = !0), t);
                      } finally {
                        (!o && e) || u(!0);
                      }
                    }, [n]);
                  return a.default.createElement(
                    s.Box,
                    {
                      className: 'settings-page__content-row',
                      display: r.Display.Flex,
                      flexDirection: r.FlexDirection.Row,
                      justifyContent: r.JustifyContent.spaceBetween,
                      gap: 4,
                    },
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-item' },
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-description' },
                        t
                      )
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-item-col' },
                      a.default.createElement(
                        s.Button,
                        {
                          variant: s.ButtonVariant.Primary,
                          onClick: d,
                          size: l.ButtonSize.Lg,
                          'data-testid': i,
                        },
                        e
                      )
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-item-col' },
                      a.default.createElement(
                        s.Box,
                        {
                          display: r.Display.Flex,
                          alignItems: r.AlignItems.center,
                          paddingLeft: 2,
                          paddingRight: 2,
                          style: { height: '40px', width: '40px' },
                        },
                        a.default.createElement(s.Icon, {
                          className: 'settings-page-developer-options__icon-check',
                          name: s.IconName.Check,
                          color: r.IconColor.successDefault,
                          size: s.IconSize.Lg,
                          hidden: !c,
                        })
                      )
                    )
                  );
                }
                n.default = () => {
                  const e = (0, o.useSelector)(d.getCurrentLocale) || u.FALLBACK_LOCALE;
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      s.Text,
                      { className: 'settings-page__security-tab-sub-header__bold' },
                      'Sentry'
                    ),
                    a.default.createElement(
                      'div',
                      { className: 'settings-page__content-padded' },
                      a.default.createElement(f, null),
                      a.default.createElement(g, null),
                      a.default.createElement(h, null),
                      a.default.createElement(y, { currentLocale: e })
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/developer-options-tab/sentry-test.tsx' },
    ],
    [
      7486,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/component-library': 6402,
        '../../../components/ui/toggle-button': 6814,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/settings-search': 6915,
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
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = u(e('prop-types')),
                  s = u(e('../../../components/ui/toggle-button')),
                  r = e('../../../helpers/utils/settings-search'),
                  i = e('../../../../shared/constants/metametrics'),
                  l = e('../../../components/component-library'),
                  c = e('../../../helpers/constants/design-system');
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
                class m extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      p(
                        this,
                        'settingsRefs',
                        Array(
                          (0, r.getNumberOfSettingRoutesInTab)(
                            this.context.t,
                            this.context.t('experimental')
                          )
                        )
                          .fill(undefined)
                          .map(() => a.default.createRef())
                      );
                  }
                  componentDidUpdate() {
                    const { t: e } = this.context;
                    (0, r.handleSettingsRefs)(e, e('experimental'), this.settingsRefs);
                  }
                  componentDidMount() {
                    const { t: e } = this.context;
                    (0, r.handleSettingsRefs)(e, e('experimental'), this.settingsRefs);
                  }
                  renderToggleSection({
                    title: e,
                    description: t,
                    toggleValue: n,
                    toggleCallback: o,
                    toggleDataTestId: r,
                    toggleContainerDataTestId: i,
                    toggleOffLabel: c,
                    toggleOnLabel: u,
                  }) {
                    return a.default.createElement(
                      l.Box,
                      {
                        ref: this.settingsRefs[0],
                        className:
                          'settings-page__content-row settings-page__content-row-experimental',
                      },
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        a.default.createElement('span', null, e),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          t
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col', 'data-testid': i },
                        a.default.createElement(s.default, {
                          value: n,
                          onToggle: o,
                          offLabel: c,
                          onLabel: u,
                          dataTestId: r,
                        })
                      )
                    );
                  }
                  renderKeyringSnapsToggle() {
                    const { t: e, trackEvent: t } = this.context,
                      { addSnapAccountEnabled: n, setAddSnapAccountEnabled: o } = this.props;
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        l.Text,
                        {
                          variant: c.TextVariant.headingSm,
                          as: 'h4',
                          color: c.TextColor.textAlternative,
                          marginBottom: 2,
                          fontWeight: c.FontWeight.Bold,
                        },
                        e('snaps')
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        a.default.createElement('span', null, e('snapAccounts')),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          a.default.createElement(
                            l.Text,
                            {
                              variant: c.TextVariant.bodySm,
                              as: 'h6',
                              color: c.TextColor.textAlternative,
                            },
                            e('snapAccountsDescription')
                          )
                        )
                      ),
                      this.renderToggleSection({
                        title: e('addSnapAccountToggle'),
                        description: e('addSnapAccountsDescription'),
                        toggleValue: n,
                        toggleCallback: e => {
                          t({
                            event: i.MetaMetricsEventName.AddSnapAccountEnabled,
                            category: i.MetaMetricsEventCategory.Settings,
                            properties: { enabled: !e },
                          }),
                            o(!e);
                        },
                        toggleContainerDataTestId: 'add-account-snap-toggle-div',
                        toggleDataTestId: 'add-account-snap-toggle-button',
                        toggleOffLabel: e('off'),
                        toggleOnLabel: e('on'),
                      })
                    );
                  }
                  renderNotificationsToggle() {
                    const { t: e } = this.context,
                      { featureNotificationsEnabled: t, setFeatureNotificationsEnabled: n } =
                        this.props;
                    return this.renderToggleSection({
                      title: e('notificationsFeatureToggle'),
                      description: e('notificationsFeatureToggleDescription'),
                      toggleValue: t,
                      toggleCallback: e => n(!e),
                      toggleDataTestId: 'toggle-notifications',
                      toggleOffLabel: e('off'),
                      toggleOnLabel: e('on'),
                    });
                  }
                  renderWatchAccountToggle() {
                    const { t: e, trackEvent: t } = this.context,
                      { watchAccountEnabled: n, setWatchAccountEnabled: o } = this.props;
                    return this.renderToggleSection({
                      title: e('watchEthereumAccountsToggle'),
                      description: e('watchEthereumAccountsDescription', [
                        a.default.createElement(
                          'a',
                          {
                            key: 'watch-account-feedback-form__link-text',
                            href: 'https://www.getfeedback.com/r/7Je8ckkq',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          },
                          e('form')
                        ),
                      ]),
                      toggleValue: n,
                      toggleCallback: e => {
                        t({
                          event: i.MetaMetricsEventName.WatchEthereumAccountsToggled,
                          category: i.MetaMetricsEventCategory.Settings,
                          properties: { enabled: !e },
                        }),
                          o(!e);
                      },
                      toggleContainerDataTestId: 'watch-account-toggle-div',
                      toggleDataTestId: 'watch-account-toggle',
                      toggleOffLabel: e('off'),
                      toggleOnLabel: e('on'),
                    });
                  }
                  render() {
                    return a.default.createElement(
                      'div',
                      { className: 'settings-page__body' },
                      null,
                      this.renderKeyringSnapsToggle(),
                      this.renderWatchAccountToggle()
                    );
                  }
                }
                (n.default = m),
                  p(m, 'contextTypes', { t: o.default.func, trackEvent: o.default.func });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/experimental-tab/experimental-tab.component.tsx',
      },
    ],
    [
      7487,
      {
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './experimental-tab.component': 7486,
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
                  s = e('react-redux'),
                  r = e('react-router-dom'),
                  i = e('../../../store/actions'),
                  l = e('../../../selectors'),
                  c = (a = e('./experimental-tab.component')) && a.__esModule ? a : { default: a };
                n.default = (0, o.compose)(
                  r.withRouter,
                  (0, s.connect)(
                    e => {
                      const t = (0, l.getFeatureNotificationsEnabled)(e);
                      return {
                        watchAccountEnabled: (0, l.getIsWatchEthereumAccountEnabled)(e),
                        addSnapAccountEnabled: (0, l.getIsAddSnapAccountEnabled)(e),
                        featureNotificationsEnabled: t,
                      };
                    },
                    e => ({
                      setWatchAccountEnabled: e => (0, i.setWatchEthereumAccountEnabled)(e),
                      setAddSnapAccountEnabled: e => (0, i.setAddSnapAccountEnabled)(e),
                      setFeatureNotificationsEnabled: t =>
                        e((0, i.setFeatureNotificationsEnabled)(t)),
                    })
                  )
                )(c.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/experimental-tab/experimental-tab.container.ts',
      },
    ],
    [
      7488,
      { './experimental-tab.container': 7487 },
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
                  o = (a = e('./experimental-tab.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/experimental-tab/index.js' },
    ],
    [
      7489,
      { './settings.container': 7515 },
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
                  o = (a = e('./settings.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/index.js' },
    ],
    [
      7490,
      { './info-tab.component': 7491 },
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
                  o = (a = e('./info-tab.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/info-tab/index.js' },
    ],
    [
      7491,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../components/app/modals/visit-support-data-consent-modal': 6098,
        '../../../components/component-library': 6402,
        '../../../components/ui/button': 6707,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/utils/build-types': 6897,
        '../../../helpers/utils/settings-search': 6915,
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
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = p(e('prop-types')),
                  s = p(e('../../../components/ui/button')),
                  r = e('../../../components/component-library'),
                  i = e('../../../helpers/constants/common'),
                  l = e('../../../helpers/utils/build-types'),
                  c = e('../../../helpers/utils/settings-search'),
                  u = e('../../../../shared/constants/metametrics'),
                  d = p(e('../../../components/app/modals/visit-support-data-consent-modal'));
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
                class g extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      f(this, 'state', {
                        version: '12.17.2-flask.0',
                        isVisitSupportDataConsentModalOpen: !1,
                      }),
                      f(
                        this,
                        'settingsRefs',
                        Array(
                          (0, c.getNumberOfSettingRoutesInTab)(
                            this.context.t,
                            this.context.t('about')
                          )
                        )
                          .fill(undefined)
                          .map(() => a.default.createRef())
                      ),
                      f(this, 'toggleVisitSupportDataConsentModal', () => {
                        this.setState(e => ({
                          isVisitSupportDataConsentModalOpen: !e.isVisitSupportDataConsentModalOpen,
                        }));
                      });
                  }
                  componentDidUpdate() {
                    const { t: e } = this.context;
                    (0, c.handleSettingsRefs)(e, e('about'), this.settingsRefs);
                  }
                  componentDidMount() {
                    const { t: e } = this.context;
                    (0, c.handleSettingsRefs)(e, e('about'), this.settingsRefs);
                  }
                  renderInfoLinks() {
                    const { t: e } = this.context;
                    return a.default.createElement(
                      'div',
                      {
                        className:
                          'settings-page__content-item settings-page__content-item--without-height',
                      },
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[1], className: 'info-tab__link-header' },
                        e('links')
                      ),
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[2], className: 'info-tab__link-item' },
                        a.default.createElement(
                          s.default,
                          {
                            type: 'link',
                            href: 'https://metamask.io/privacy.html',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'info-tab__link-text',
                          },
                          e('privacyMsg')
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[3], className: 'info-tab__link-item' },
                        a.default.createElement(
                          s.default,
                          {
                            type: 'link',
                            href: 'https://metamask.io/terms.html',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'info-tab__link-text',
                          },
                          e('terms')
                        )
                      ),
                      (0, l.isBeta)()
                        ? a.default.createElement(
                            'div',
                            { ref: this.settingsRefs[8], className: 'info-tab__link-item' },
                            a.default.createElement(
                              s.default,
                              {
                                type: 'link',
                                href: 'https://metamask.io/beta-terms.html',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                className: 'info-tab__link-text',
                              },
                              e('betaTerms'),
                              a.default.createElement(r.Tag, {
                                label: e('new'),
                                className: 'info-tab__tag',
                              })
                            )
                          )
                        : null,
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[4], className: 'info-tab__link-item' },
                        a.default.createElement(
                          s.default,
                          {
                            type: 'link',
                            href: `https://raw.githubusercontent.com/MetaMask/metamask-extension/v${this.state.version}/attribution.txt`,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'info-tab__link-text',
                          },
                          e('attributions')
                        )
                      ),
                      a.default.createElement('hr', { className: 'info-tab__separator' }),
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[5], className: 'info-tab__link-item' },
                        a.default.createElement(
                          s.default,
                          {
                            type: 'link',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'info-tab__link-text',
                            onClick: this.toggleVisitSupportDataConsentModal,
                          },
                          e('supportCenter')
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[6], className: 'info-tab__link-item' },
                        a.default.createElement(
                          s.default,
                          {
                            type: 'link',
                            href: 'https://metamask.io/',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'info-tab__link-text',
                          },
                          e('visitWebSite')
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { ref: this.settingsRefs[7], className: 'info-tab__link-item' },
                        a.default.createElement(
                          s.default,
                          {
                            type: 'link',
                            href: i.SUPPORT_REQUEST_LINK,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: 'info-tab__link-text',
                            onClick: () => {
                              this.context.trackEvent(
                                {
                                  category: u.MetaMetricsEventCategory.Settings,
                                  event: u.MetaMetricsEventName.SupportLinkClicked,
                                  properties: { url: i.SUPPORT_REQUEST_LINK },
                                },
                                {
                                  contextPropsIntoEventProperties: [
                                    u.MetaMetricsContextProp.PageTitle,
                                  ],
                                }
                              );
                            },
                          },
                          e('contactUs')
                        )
                      )
                    );
                  }
                  render() {
                    const { t: e } = this.context;
                    return a.default.createElement(
                      'div',
                      { className: 'settings-page__body' },
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-row' },
                        a.default.createElement(
                          'div',
                          {
                            className:
                              'settings-page__content-item settings-page__content-item--without-height',
                          },
                          a.default.createElement(
                            'div',
                            { className: 'info-tab__item' },
                            a.default.createElement(
                              'div',
                              { ref: this.settingsRefs[0], className: 'info-tab__version-header' },
                              (0, l.isBeta)() ? e('betaMetamaskVersion') : e('metamaskVersion')
                            ),
                            a.default.createElement(
                              'div',
                              { className: 'info-tab__version-number' },
                              this.state.version
                            )
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'info-tab__item' },
                            a.default.createElement(
                              'div',
                              { className: 'info-tab__about' },
                              e('builtAroundTheWorld')
                            )
                          )
                        ),
                        this.renderInfoLinks()
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'info-tab__logo-wrapper' },
                        a.default.createElement('img', {
                          src: './images/logo/metamask-fox.svg',
                          className: 'info-tab__logo',
                          alt: 'MetaMask Logo',
                        })
                      ),
                      this.state.isVisitSupportDataConsentModalOpen &&
                        a.default.createElement(d.default, {
                          isOpen: this.state.isVisitSupportDataConsentModalOpen,
                          onClose: this.toggleVisitSupportDataConsentModal,
                        })
                    );
                  }
                }
                (n.default = g),
                  f(g, 'contextTypes', { t: o.default.func, trackEvent: o.default.func });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/info-tab/info-tab.component.js' },
    ],
    [
      7492,
      { './networks-form': 7494 },
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
                  o = (a = e('./networks-form')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/networks-tab/networks-form/index.js' },
    ],
    [
      7493,
      { '../../../../../shared/modules/conversion.utils': 5858, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.useNetworkFormState = void 0);
                var a = e('react'),
                  o = e('../../../../../shared/modules/conversion.utils');
                n.useNetworkFormState = e => {
                  const [t, n] = (0, a.useState)(''),
                    [s, r] = (0, a.useState)(''),
                    [i, l] = (0, a.useState)(''),
                    [c, u] = (0, a.useState)({
                      rpcEndpoints: [],
                      defaultRpcEndpointIndex: undefined,
                    }),
                    [d, p] = (0, a.useState)({
                      blockExplorerUrls: [],
                      defaultBlockExplorerUrlIndex: undefined,
                    });
                  return (
                    (0, a.useEffect)(() => {
                      n((null == e ? void 0 : e.name) ?? ''),
                        r(e ? (0, o.hexToDecimal)(e.chainId) : ''),
                        l((null == e ? void 0 : e.nativeCurrency) ?? ''),
                        u({
                          rpcEndpoints: (null == e ? void 0 : e.rpcEndpoints) ?? [],
                          defaultRpcEndpointIndex: null == e ? void 0 : e.defaultRpcEndpointIndex,
                        }),
                        p({
                          blockExplorerUrls: (null == e ? void 0 : e.blockExplorerUrls) ?? [],
                          defaultBlockExplorerUrlIndex:
                            null == e ? void 0 : e.defaultBlockExplorerUrlIndex,
                        });
                    }, [null == e ? void 0 : e.chainId]),
                    {
                      name: t,
                      setName: n,
                      chainId: s,
                      setChainId: r,
                      ticker: i,
                      setTicker: l,
                      rpcUrls: c,
                      setRpcUrls: u,
                      blockExplorers: d,
                      setBlockExplorers: p,
                      clear: () => {
                        n(''),
                          r(''),
                          l(''),
                          u({ rpcEndpoints: [], defaultRpcEndpointIndex: undefined }),
                          p({ blockExplorerUrls: [], defaultBlockExplorerUrlIndex: undefined });
                      },
                    }
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/networks-tab/networks-form/networks-form-state.ts',
      },
    ],
    [
      7494,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/modules/conversion.utils': 5858,
        '../../../../../shared/modules/network.utils': 5868,
        '../../../../../shared/modules/rpc.utils': 5871,
        '../../../../../shared/modules/selectors/networks': 5875,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain/dropdown-editor/dropdown-editor': 6555,
        '../../../../components/multichain/network-list-menu/rpc-list-item': 6599,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../store/actions': 7619,
        './use-safe-chains': 7495,
        '@metamask/network-controller': 2202,
        '@metamask/utils': 2995,
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
                  (n.default = n.NetworksForm = void 0);
                var a,
                  o = (a = e('loglevel')) && a.__esModule ? a : { default: a },
                  s = C(e('react')),
                  r = e('react-redux'),
                  i = e('@metamask/network-controller'),
                  l = e('@metamask/utils'),
                  c = e('../../../../../shared/constants/metametrics'),
                  u = e('../../../../../shared/constants/network'),
                  d = e('../../../../../shared/modules/conversion.utils'),
                  p = e('../../../../../shared/modules/network.utils'),
                  m = e('../../../../../shared/modules/rpc.utils'),
                  f = e('../../../../contexts/metametrics'),
                  g = e('../../../../hooks/useI18nContext'),
                  h = e('../../../../../shared/modules/selectors/networks'),
                  y = e('../../../../store/actions'),
                  E = e('../../../../components/component-library'),
                  v = e('../../../../helpers/constants/design-system'),
                  b = C(e('../../../../components/multichain/network-list-menu/rpc-list-item')),
                  _ = e('../../../../components/multichain/dropdown-editor/dropdown-editor'),
                  k = e('../../../../selectors'),
                  x = e('./use-safe-chains');
                function T(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (T = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function C(e, t) {
                  if (!t && e && e.__esModule) return e;
                  if (null === e || ('object' != typeof e && 'function' != typeof e))
                    return { default: e };
                  var n = T(t);
                  if (n && n.has(e)) return n.get(e);
                  var a = { __proto__: null },
                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                  for (var s in e)
                    if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                      var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                      r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                    }
                  return (a.default = e), n && n.set(e, a), a;
                }
                const w = ({
                  networkFormState: e,
                  existingNetwork: t,
                  onRpcAdd: n,
                  onBlockExplorerAdd: a,
                }) => {
                  var l, T, C, w, S, I, N, O;
                  const M = (0, g.useI18nContext)(),
                    B = (0, r.useDispatch)(),
                    R = (0, s.useContext)(f.MetaMetricsContext),
                    D = (0, s.useRef)(null),
                    P = (0, r.useSelector)(h.getNetworkConfigurationsByChainId),
                    {
                      name: F,
                      setName: L,
                      chainId: j,
                      setChainId: U,
                      ticker: W,
                      setTicker: G,
                      rpcUrls: V,
                      setRpcUrls: z,
                      blockExplorers: Q,
                      setBlockExplorers: q,
                    } = e,
                    { safeChains: H } = (0, x.useSafeChains)(),
                    [Y, Z] = (0, s.useState)({}),
                    [J, K] = (0, s.useState)({}),
                    [X, $] = (0, s.useState)(),
                    [ee, te] = (0, s.useState)(),
                    [ne, ae] = (0, s.useState)(),
                    oe = (0, r.useSelector)(k.getTokenNetworkFilter);
                  (0, s.useEffect)(() => {
                    var e;
                    const t = j ? A(j) : undefined,
                      n = t
                        ? (u.NETWORK_TO_NAME_MAP[t] ??
                          (null == H ||
                          null === (e = H.find(e => A(e.chainId) === t)) ||
                          void 0 === e
                            ? void 0
                            : e.name))
                        : undefined,
                      a = n && n !== F;
                    $(a ? n : undefined),
                      K(e => ({
                        ...e,
                        name: a
                          ? { key: 'wrongNetworkName', msg: M('wrongNetworkName') }
                          : undefined,
                      }));
                  }, [j, F, H]),
                    (0, s.useEffect)(() => {
                      var e;
                      const t = j ? A(j) : undefined,
                        n = t
                          ? (u.CHAIN_ID_TO_CURRENCY_SYMBOL_MAP[t] ??
                            (null == H ||
                            null === (e = H.find(e => A(e.chainId) === t)) ||
                            void 0 === e ||
                            null === (e = e.nativeCurrency) ||
                            void 0 === e
                              ? void 0
                              : e.symbol))
                          : undefined,
                        a = n && n !== W;
                      te(a ? n : undefined),
                        K(e => ({
                          ...e,
                          ticker: a
                            ? {
                                key: 'chainListReturnedDifferentTickerSymbol',
                                msg: M('chainListReturnedDifferentTickerSymbol'),
                              }
                            : undefined,
                        }));
                    }, [j, W, H]),
                    (0, s.useEffect)(() => {
                      let e;
                      j === undefined || '' === j
                        ? (e = undefined)
                        : j.startsWith('0x')
                          ? /^0x[0-9a-f]+$/iu.test(j)
                            ? (0, p.isPrefixedFormattedHexString)(j) ||
                              (e = ['invalidHexNumber', M('invalidHexNumberLeadingZeros')])
                            : (e = ['invalidHexNumber', M('invalidHexNumber')])
                          : /^[0-9]+$/u.test(j)
                            ? j.startsWith('0') &&
                              (e = ['invalidNumberLeadingZeros', M('invalidNumberLeadingZeros')])
                            : (e = ['invalidNumber', M('invalidNumber')]),
                        !j ||
                          e ||
                          (0, p.isSafeChainId)(parseInt(j, j.startsWith('0x') ? 16 : 10)) ||
                          (e = ['invalidChainIdTooBig', M('invalidChainIdTooBig')]);
                      const n = A(j);
                      if (!e && !t) {
                        const t = n ? P[n] : undefined;
                        t && (e = ['existingChainId', M('chainIdExistsErrorMsg', [t.name])]);
                      }
                      let a;
                      ne &&
                        n &&
                        ne !== n &&
                        (a = [
                          'endpointReturnedDifferentChainId',
                          M('endpointReturnedDifferentChainId', [(0, d.hexToDecimal)(ne)]),
                        ]),
                        Z(t => ({
                          ...t,
                          chainId: e ? { key: e[0], msg: e[1] } : undefined,
                          rpcUrl: a ? { key: a[0], msg: a[1] } : undefined,
                        }));
                    }, [j, ne, null == t ? void 0 : t.chainId]),
                    (0, s.useEffect)(() => {
                      var e;
                      const t =
                        null == V ||
                        null === (e = V.rpcEndpoints) ||
                        void 0 === e ||
                        null === (e = e[(null == V ? void 0 : V.defaultRpcEndpointIndex) ?? -1]) ||
                        void 0 === e
                          ? void 0
                          : e.url;
                      var n;
                      t &&
                        (0, m.jsonRpcRequest)(
                          ((n = t),
                          n.endsWith('{infuraProjectId}')
                            ? n.replace('{infuraProjectId}', u.infuraProjectId ?? '')
                            : n),
                          'eth_chainId'
                        )
                          .then(e => {
                            ae(e);
                          })
                          .catch(e => {
                            ae(undefined),
                              o.default.warn('Failed to fetch the chainId from the endpoint.', e),
                              Z(e => ({
                                ...e,
                                rpcUrl: {
                                  key: 'failedToFetchChainId',
                                  msg: M('failedToFetchChainId'),
                                },
                              }));
                          });
                    }, [j, V]);
                  return s.default.createElement(
                    E.Box,
                    {
                      height: v.BlockSize.Full,
                      display: v.Display.Flex,
                      justifyContent: v.JustifyContent.spaceBetween,
                      flexDirection: v.FlexDirection.Column,
                      alignItems: v.AlignItems.center,
                      ref: D,
                      className: 'networks-tab__scrollable',
                    },
                    s.default.createElement(
                      E.Box,
                      {
                        width: v.BlockSize.Full,
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 2,
                      },
                      s.default.createElement(E.FormTextField, {
                        id: 'networkName',
                        size: E.FormTextFieldSize.Lg,
                        placeholder: M('enterNetworkName'),
                        'data-testid': 'network-form-name-input',
                        autoFocus: !0,
                        helpText:
                          ((F &&
                            (null == J || null === (l = J.name) || void 0 === l
                              ? void 0
                              : l.msg)) ||
                            X) &&
                          s.default.createElement(
                            s.default.Fragment,
                            null,
                            F &&
                              (null == J || null === (T = J.name) || void 0 === T
                                ? void 0
                                : T.msg) &&
                              s.default.createElement(
                                E.HelpText,
                                {
                                  variant: v.TextVariant.bodySm,
                                  severity: E.HelpTextSeverity.Warning,
                                },
                                J.name.msg
                              ),
                            X &&
                              s.default.createElement(
                                E.Text,
                                {
                                  as: 'span',
                                  variant: v.TextVariant.bodySm,
                                  color: v.TextColor.textDefault,
                                  'data-testid': 'network-form-name-suggestion',
                                },
                                M('suggestedTokenName'),
                                s.default.createElement(
                                  E.ButtonLink,
                                  {
                                    as: 'button',
                                    variant: v.TextVariant.bodySm,
                                    color: v.TextColor.primaryDefault,
                                    onClick: () => {
                                      L(X);
                                    },
                                    paddingLeft: 1,
                                    paddingRight: 1,
                                    style: { verticalAlign: 'baseline' },
                                  },
                                  X
                                )
                              )
                          ),
                        onChange: e => {
                          var t;
                          L(null === (t = e.target) || void 0 === t ? void 0 : t.value);
                        },
                        label: M('networkName'),
                        labelProps: { children: undefined, variant: v.TextVariant.bodyMdMedium },
                        textFieldProps: { borderRadius: v.BorderRadius.LG },
                        inputProps: { 'data-testid': 'network-form-network-name' },
                        value: F,
                      }),
                      s.default.createElement(_.DropdownEditor, {
                        title: M('defaultRpcUrl'),
                        placeholder: M('addAUrl'),
                        style: _.DropdownEditorStyle.PopoverStyle,
                        items: V.rpcEndpoints,
                        itemKey: e => e.url,
                        selectedItemIndex: V.defaultRpcEndpointIndex,
                        error: Boolean(Y.rpcUrl),
                        buttonDataTestId: 'test-add-rpc-drop-down',
                        renderItem: (e, t) =>
                          t ||
                          (null != e && e.name) ||
                          (null == e ? void 0 : e.type) === i.RpcEndpointType.Infura
                            ? s.default.createElement(b.default, { rpcEndpoint: e })
                            : s.default.createElement(
                                E.Text,
                                {
                                  ellipsis: !0,
                                  variant: v.TextVariant.bodyMd,
                                  paddingTop: 3,
                                  paddingBottom: 3,
                                },
                                (0, b.stripProtocol)((0, b.stripKeyFromInfuraUrl)(e.url))
                              ),
                        renderTooltip: (e, t) => {
                          const n = (0, b.stripKeyFromInfuraUrl)(e.url);
                          return n.length > (t ? 37 : 35) ? n : undefined;
                        },
                        addButtonText: M('addRpcUrl'),
                        itemIsDeletable: e => e.type !== i.RpcEndpointType.Infura,
                        onItemAdd: n,
                        onItemSelected: e => z(t => ({ ...t, defaultRpcEndpointIndex: e })),
                        onItemDeleted: (e, t) => {
                          var n;
                          z({
                            rpcEndpoints:
                              null === (n = V.rpcEndpoints) || void 0 === n
                                ? void 0
                                : n.slice(0, e).concat(V.rpcEndpoints.slice(e + 1)),
                            defaultRpcEndpointIndex: t,
                          });
                        },
                      }),
                      (null === (C = Y.rpcUrl) || void 0 === C ? void 0 : C.msg) &&
                        s.default.createElement(
                          E.Box,
                          null,
                          s.default.createElement(
                            E.HelpText,
                            {
                              variant: v.TextVariant.bodySm,
                              severity: E.HelpTextSeverity.Danger,
                              'data-testid': 'network-form-chain-id-error',
                            },
                            null === (w = Y.rpcUrl) || void 0 === w ? void 0 : w.msg
                          )
                        ),
                      s.default.createElement(E.FormTextField, {
                        id: 'chainId',
                        size: E.FormTextFieldSize.Lg,
                        placeholder: M('enterChainId'),
                        paddingTop: 4,
                        'data-testid': 'network-form-chain-id-input',
                        onChange: e => {
                          var t;
                          U(null === (t = e.target) || void 0 === t ? void 0 : t.value.trim());
                        },
                        error: Boolean(null == Y ? void 0 : Y.chainId),
                        label: M('chainId'),
                        labelProps: { children: undefined, variant: v.TextVariant.bodyMdMedium },
                        textFieldProps: { borderRadius: v.BorderRadius.LG },
                        inputProps: { 'data-testid': 'network-form-chain-id' },
                        value: j,
                        disabled: Boolean(t),
                      }),
                      null !== (S = Y.chainId) && void 0 !== S && S.msg
                        ? s.default.createElement(
                            E.HelpText,
                            {
                              variant: v.TextVariant.bodySm,
                              severity: E.HelpTextSeverity.Danger,
                              'data-testid': 'network-form-chain-id-error',
                            },
                            Y.chainId.msg
                          )
                        : null,
                      'existingChainId' ===
                        (null === (I = Y.chainId) || void 0 === I ? void 0 : I.key)
                        ? s.default.createElement(
                            E.Box,
                            null,
                            s.default.createElement(
                              E.HelpText,
                              {
                                variant: v.TextVariant.bodySm,
                                severity: E.HelpTextSeverity.Danger,
                                'data-testid': 'network-form-chain-id-error',
                              },
                              M('updateOrEditNetworkInformations'),
                              ' ',
                              s.default.createElement(
                                E.ButtonLink,
                                {
                                  as: 'button',
                                  variant: v.TextVariant.bodySm,
                                  color: v.TextColor.primaryDefault,
                                  onClick: () => {
                                    const e = A(j);
                                    e && B((0, y.setEditedNetwork)({ chainId: e }));
                                  },
                                },
                                M('editNetworkLink')
                              )
                            )
                          )
                        : null,
                      s.default.createElement(E.FormTextField, {
                        id: 'nativeCurrency',
                        size: E.FormTextFieldSize.Lg,
                        placeholder: M('enterSymbol'),
                        paddingTop: 4,
                        'data-testid': 'network-form-ticker',
                        helpText: ee
                          ? s.default.createElement(
                              E.Text,
                              {
                                as: 'span',
                                variant: v.TextVariant.bodySm,
                                color: v.TextColor.textDefault,
                                'data-testid': 'network-form-ticker-suggestion',
                              },
                              M('suggestedCurrencySymbol'),
                              s.default.createElement(
                                E.ButtonLink,
                                {
                                  as: 'button',
                                  variant: v.TextVariant.bodySm,
                                  color: v.TextColor.primaryDefault,
                                  onClick: () => {
                                    G(ee);
                                  },
                                  paddingLeft: 1,
                                  paddingRight: 1,
                                  style: { verticalAlign: 'baseline' },
                                },
                                ee
                              )
                            )
                          : null,
                        onChange: e => {
                          var t;
                          G(null === (t = e.target) || void 0 === t ? void 0 : t.value);
                        },
                        label: M('currencySymbol'),
                        labelProps: { children: undefined, variant: v.TextVariant.bodyMdMedium },
                        textFieldProps: { borderRadius: v.BorderRadius.LG },
                        inputProps: { 'data-testid': 'network-form-ticker-input' },
                        value: W,
                      }),
                      W && null !== (N = J.ticker) && void 0 !== N && N.msg
                        ? s.default.createElement(
                            E.HelpText,
                            {
                              variant: v.TextVariant.bodySm,
                              severity: E.HelpTextSeverity.Warning,
                              'data-testid': 'network-form-ticker-warning',
                            },
                            J.ticker.msg
                          )
                        : null,
                      s.default.createElement(_.DropdownEditor, {
                        title: M('blockExplorerUrl'),
                        placeholder: M('addAUrl'),
                        style: _.DropdownEditorStyle.BoxStyle,
                        items: Q.blockExplorerUrls,
                        itemKey: e => `${e}`,
                        selectedItemIndex: Q.defaultBlockExplorerUrlIndex,
                        addButtonText: M('addBlockExplorerUrl'),
                        onItemAdd: a,
                        buttonDataTestId: 'test-explorer-drop-down',
                        onItemSelected: e => q(t => ({ ...t, defaultBlockExplorerUrlIndex: e })),
                        onItemDeleted: (e, t) => {
                          var n;
                          q({
                            blockExplorerUrls:
                              null === (n = Q.blockExplorerUrls) || void 0 === n
                                ? void 0
                                : n.slice(0, e).concat(Q.blockExplorerUrls.slice(e + 1)),
                            defaultBlockExplorerUrlIndex: t,
                          });
                        },
                        onDropdownOpened: () => {
                          D.current && (D.current.scrollTop = D.current.scrollHeight);
                        },
                        renderItem: e =>
                          s.default.createElement(
                            E.Text,
                            {
                              as: 'button',
                              paddingLeft: 0,
                              paddingRight: 0,
                              paddingTop: 3,
                              paddingBottom: 3,
                              color: v.TextColor.textDefault,
                              variant: v.TextVariant.bodyMd,
                              backgroundColor: v.BackgroundColor.transparent,
                              ellipsis: !0,
                            },
                            (0, b.stripProtocol)(e)
                          ),
                        renderTooltip: e => (e.length > 36 ? e : undefined),
                      })
                    ),
                    s.default.createElement(
                      E.Box,
                      {
                        className: 'networks-tab__network-form__footer',
                        backgroundColor: v.BackgroundColor.backgroundDefault,
                        padding: 4,
                        width: v.BlockSize.Full,
                      },
                      s.default.createElement(
                        E.ButtonPrimary,
                        {
                          disabled:
                            !F ||
                            !j ||
                            !W ||
                            !(
                              null != V &&
                              null !== (O = V.rpcEndpoints) &&
                              void 0 !== O &&
                              O.length
                            ) ||
                            Object.values(Y).some(e => e),
                          onClick: async () => {
                            try {
                              const a = j ? A(j) : undefined;
                              if (a === u.CHAIN_IDS.GOERLI) B((0, y.showDeprecatedNetworkModal)());
                              else if (a) {
                                var e, n;
                                const o = {
                                  chainId: a,
                                  name: F,
                                  nativeCurrency: W,
                                  rpcEndpoints: null == V ? void 0 : V.rpcEndpoints,
                                  defaultRpcEndpointIndex:
                                    (null == V ? void 0 : V.defaultRpcEndpointIndex) ?? 0,
                                  blockExplorerUrls: null == Q ? void 0 : Q.blockExplorerUrls,
                                  defaultBlockExplorerUrlIndex:
                                    null == Q ? void 0 : Q.defaultBlockExplorerUrlIndex,
                                };
                                if (t) {
                                  const e = {
                                    replacementSelectedRpcEndpointIndex:
                                      a === t.chainId
                                        ? null == V
                                          ? void 0
                                          : V.defaultRpcEndpointIndex
                                        : undefined,
                                  };
                                  await B((0, y.updateNetwork)(o, e)),
                                    1 === Object.keys(oe).length &&
                                      (await B((0, y.setTokenNetworkFilter)({ [t.chainId]: !0 })));
                                } else await B((0, y.addNetwork)(o));
                                R({
                                  event: c.MetaMetricsEventName.CustomNetworkAdded,
                                  category: c.MetaMetricsEventCategory.Network,
                                  properties: {
                                    block_explorer_url:
                                      null == Q ||
                                      null === (e = Q.blockExplorerUrls) ||
                                      void 0 === e
                                        ? void 0
                                        : e[
                                            (null == Q ? void 0 : Q.defaultBlockExplorerUrlIndex) ??
                                              -1
                                          ],
                                    chain_id: a,
                                    network_name: F,
                                    source_connection_method:
                                      c.MetaMetricsNetworkEventSource.CustomNetworkForm,
                                    token_symbol: W,
                                  },
                                  sensitiveProperties: {
                                    rpcUrl: (0, x.rpcIdentifierUtility)(
                                      null == V ||
                                        null ===
                                          (n = V.rpcEndpoints[V.defaultRpcEndpointIndex ?? -1]) ||
                                        void 0 === n
                                        ? void 0
                                        : n.url,
                                      H ?? []
                                    ),
                                  },
                                }),
                                  B(
                                    (0, y.setEditedNetwork)({
                                      chainId: a,
                                      nickname: F,
                                      editCompleted: !0,
                                      newNetwork: !t,
                                    })
                                  );
                              }
                            } catch (e) {
                              console.error(e);
                            } finally {
                              B((0, y.toggleNetworkMenu)());
                            }
                          },
                          size: E.ButtonPrimarySize.Lg,
                          width: v.BlockSize.Full,
                        },
                        M('save')
                      )
                    )
                  );
                };
                function A(e) {
                  return (0, l.isStrictHexString)(e)
                    ? e
                    : /^\d+$/u.test(e)
                      ? `0x${(0, d.decimalToHex)(e)}`
                      : undefined;
                }
                n.NetworksForm = w;
                n.default = w;
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/networks-tab/networks-form/networks-form.tsx' },
    ],
    [
      7495,
      {
        '../../../../../shared/constants/network': 5804,
        '../../../../../shared/constants/time': 5817,
        '../../../../../shared/lib/fetch-with-cache': 5834,
        '../../../../selectors': 7601,
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
                  (n.useSafeChains = n.rpcIdentifierUtility = void 0);
                var a,
                  o = e('react'),
                  s = e('react-redux'),
                  r = e('../../../../selectors'),
                  i =
                    (a = e('../../../../../shared/lib/fetch-with-cache')) && a.__esModule
                      ? a
                      : { default: a },
                  l = e('../../../../../shared/constants/network'),
                  c = e('../../../../../shared/constants/time');
                n.useSafeChains = () => {
                  const e = (0, s.useSelector)(r.useSafeChainsListValidationSelector),
                    [t, n] = (0, o.useState)({ safeChains: [] });
                  return (
                    e &&
                      (0, o.useEffect)(() => {
                        (0, i.default)({
                          url: l.CHAIN_SPEC_URL,
                          functionName: 'getSafeChainsList',
                          allowStale: !0,
                          cacheOptions: { cacheRefreshTime: c.DAY },
                        })
                          .then(e => {
                            n({ safeChains: e });
                          })
                          .catch(e => {
                            n({ error: e });
                          });
                      }, []),
                    t
                  );
                };
                n.rpcIdentifierUtility = (e, t) => {
                  const { host: n } = new URL(e);
                  for (const e of t)
                    for (const t of e.rpc)
                      try {
                        if (n === new URL(t).host) return n;
                      } catch {
                        continue;
                      }
                  return 'Unknown rpcUrl';
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/networks-tab/networks-form/use-safe-chains.ts',
      },
    ],
    [
      7496,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../../shared/lib/ui-utils': 5852,
        '../../../../components/app/clear-metametrics-data': 5974,
        '../../../../components/app/data-deletion-error-modal': 6018,
        '../../../../components/component-library': 6402,
        '../../../../ducks/app/app': 6845,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/utils/util': 6921,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
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
                var a = g(e('react')),
                  o = e('react-redux'),
                  s = e('../../../../../shared/lib/ui-utils'),
                  r = g(e('../../../../components/app/clear-metametrics-data')),
                  i = e('../../../../components/component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext'),
                  u = e('../../../../selectors'),
                  d = e('../../../../ducks/app/app'),
                  p = g(e('../../../../components/app/data-deletion-error-modal')),
                  m = e('../../../../helpers/utils/util'),
                  f = e('../../../../../shared/constants/metametrics');
                function g(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const h = a.default.forwardRef(({ ...e }, t) => {
                  const n = (0, c.useI18nContext)(),
                    g = (0, o.useDispatch)(),
                    h = (0, o.useSelector)(u.getMetaMetricsId),
                    y = (0, o.useSelector)(u.getMetaMetricsDataDeletionStatus),
                    E = (0, o.useSelector)(u.getMetaMetricsDataDeletionTimestamp),
                    v = (0, m.formatDate)(E, 'd/MM/y'),
                    b = (0, o.useSelector)(u.getShowDeleteMetaMetricsDataModal),
                    _ = (0, o.useSelector)(u.getShowDataDeletionErrorModal),
                    k = (0, o.useSelector)(u.getLatestMetricsEventTimestamp);
                  let x = !(0, o.useSelector)(u.getParticipateInMetaMetrics);
                  !x &&
                    y &&
                    (x =
                      [
                        f.DeleteRegulationStatus.Initialized,
                        f.DeleteRegulationStatus.Running,
                        f.DeleteRegulationStatus.Finished,
                      ].includes(y) && E > k);
                  const T = a.default.createElement(
                    'a',
                    {
                      href: s.CONSENSYS_PRIVACY_LINK,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      key: 'metametrics-consensys-privacy-link',
                    },
                    n('privacyMsg')
                  );
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      i.Box,
                      {
                        ref: t,
                        className: 'settings-page__content-row',
                        display: l.Display.Flex,
                        flexDirection: l.FlexDirection.Column,
                        gap: 4,
                      },
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        a.default.createElement('span', null, n('deleteMetaMetricsData')),
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          x && Boolean(h)
                            ? n('deleteMetaMetricsDataRequestedDescription', [v, T])
                            : n('deleteMetaMetricsDataDescription', [T])
                        )
                      ),
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        Boolean(!h) &&
                          a.default.createElement(
                            i.Box,
                            { display: l.Display.InlineFlex },
                            a.default.createElement(i.Icon, {
                              name: i.IconName.Info,
                              size: i.IconSize.Sm,
                            }),
                            a.default.createElement(
                              i.Text,
                              { variant: l.TextVariant.bodyXs, marginLeft: 1, marginBottom: 2 },
                              n('metaMetricsIdNotAvailableError')
                            )
                          ),
                        a.default.createElement(
                          i.ButtonPrimary,
                          {
                            'data-testid': 'delete-metametrics-data-button',
                            className: 'settings-page__button',
                            onClick: () => {
                              g((0, d.openDeleteMetaMetricsDataModal)());
                            },
                            disabled: x,
                          },
                          n('deleteMetaMetricsData')
                        )
                      )
                    ),
                    b && a.default.createElement(r.default, null),
                    _ && a.default.createElement(p.default, null)
                  );
                });
                n.default = h;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/security-tab/delete-metametrics-data-button/delete-metametrics-data-button.tsx',
      },
    ],
    [
      7497,
      { './delete-metametrics-data-button': 7496 },
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
                    (a = e('./delete-metametrics-data-button')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/security-tab/delete-metametrics-data-button/index.ts',
      },
    ],
    [
      7498,
      { './security-tab.container': 7506 },
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
                  o = (a = e('./security-tab.container')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/security-tab/index.js' },
    ],
    [
      7499,
      { './metametrics-toggle': 7500 },
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
                  o = (a = e('./metametrics-toggle')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/security-tab/metametrics-toggle/index.ts' },
    ],
    [
      7500,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/toggle-button': 6814,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../hooks/useMetametrics': 6988,
        '../../../../selectors': 7601,
        '../../../../selectors/identity/profile-syncing': 7600,
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
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = g(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('react-redux'),
                  r = e('../../../../hooks/useI18nContext'),
                  i = e('../../../../contexts/metametrics'),
                  l = e('../../../../hooks/useMetametrics'),
                  c = e('../../../../selectors/identity/profile-syncing'),
                  u = e('../../../../../shared/constants/metametrics'),
                  d = e('../../../../components/component-library'),
                  p =
                    (a = e('../../../../components/ui/toggle-button')) && a.__esModule
                      ? a
                      : { default: a },
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('../../../../selectors');
                function g(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (g = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.default = ({
                  dataCollectionForMarketing: e,
                  setDataCollectionForMarketing: t,
                }) => {
                  const n = (0, r.useI18nContext)(),
                    a = (0, o.useContext)(i.MetaMetricsContext),
                    { enableMetametrics: g, error: h } = (0, l.useEnableMetametrics)(),
                    { disableMetametrics: y, error: E } = (0, l.useDisableMetametrics)(),
                    v = h || E,
                    b = (0, s.useSelector)(c.selectIsProfileSyncingEnabled),
                    _ = (0, s.useSelector)(f.getParticipateInMetaMetrics),
                    k = (0, s.useSelector)(f.getUseExternalServices);
                  return o.default.createElement(
                    d.Box,
                    null,
                    o.default.createElement(
                      d.Box,
                      {
                        className: 'settings-page__content-row',
                        display: m.Display.Flex,
                        flexDirection: m.FlexDirection.Row,
                        justifyContent: m.JustifyContent.spaceBetween,
                        gap: 4,
                        'data-testid': 'participate-in-meta-metrics-container',
                      },
                      o.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        o.default.createElement('span', null, n('participateInMetaMetrics')),
                        o.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          n('participateInMetaMetricsDescription')
                        )
                      ),
                      o.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'participate-in-meta-metrics-toggle',
                        },
                        o.default.createElement(p.default, {
                          value: _,
                          disabled: !k,
                          onToggle: async () => {
                            console.log('handleUseParticipateInMetaMetrics', _),
                              _
                                ? (await y(),
                                  a({
                                    category: u.MetaMetricsEventCategory.Settings,
                                    event: u.MetaMetricsEventName.TurnOffMetaMetrics,
                                    properties: {
                                      isProfileSyncingEnabled: b,
                                      participateInMetaMetrics: _,
                                    },
                                  }),
                                  a({
                                    category: u.MetaMetricsEventCategory.Settings,
                                    event: u.MetaMetricsEventName.AnalyticsPreferenceSelected,
                                    properties: {
                                      is_metrics_opted_in: !1,
                                      has_marketing_consent: !1,
                                      location: 'Settings',
                                    },
                                  }))
                                : (await g(),
                                  a({
                                    category: u.MetaMetricsEventCategory.Settings,
                                    event: u.MetaMetricsEventName.TurnOnMetaMetrics,
                                    properties: {
                                      isProfileSyncingEnabled: b,
                                      participateInMetaMetrics: _,
                                    },
                                  })),
                              e && t(!1);
                          },
                          offLabel: n('off'),
                          onLabel: n('on'),
                        })
                      )
                    ),
                    v &&
                      o.default.createElement(
                        d.Box,
                        { paddingBottom: 4 },
                        o.default.createElement(
                          d.Text,
                          {
                            as: 'p',
                            color: m.TextColor.errorDefault,
                            variant: m.TextVariant.bodySm,
                          },
                          n('notificationsSettingsBoxError')
                        )
                      )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/security-tab/metametrics-toggle/metametrics-toggle.tsx',
      },
    ],
    [
      7501,
      { './profile-sync-toggle': 7502 },
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
                  o = (a = e('./profile-sync-toggle')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/security-tab/profile-sync-toggle/index.ts' },
    ],
    [
      7502,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../components/component-library': 6402,
        '../../../../components/ui/icon/preloader/preloader-icon.component': 6752,
        '../../../../components/ui/toggle-button': 6814,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/identity/useProfileSyncing': 6951,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../../selectors/identity/profile-syncing': 7600,
        '../../../../selectors/metamask-notifications/metamask-notifications': 7602,
        '../../../../store/actions': 7619,
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
                    var n = E(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  o = e('react-redux'),
                  s = e('../../../../hooks/useI18nContext'),
                  r = e('../../../../contexts/metametrics'),
                  i = e('../../../../hooks/identity/useProfileSyncing'),
                  l = e('../../../../../shared/constants/metametrics'),
                  c = e('../../../../selectors/identity/profile-syncing'),
                  u = e('../../../../selectors/metamask-notifications/metamask-notifications'),
                  d = e('../../../../store/actions'),
                  p = e('../../../../components/component-library'),
                  m = y(e('../../../../components/ui/toggle-button')),
                  f = e('../../../../helpers/constants/design-system'),
                  g = y(e('../../../../components/ui/icon/preloader/preloader-icon.component')),
                  h = e('../../../../selectors');
                function y(e) {
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
                  const e = (0, a.useContext)(r.MetaMetricsContext),
                    t = (0, s.useI18nContext)(),
                    n = (0, o.useDispatch)(),
                    y = (0, o.useSelector)(h.getUseExternalServices),
                    { enableProfileSyncing: E, error: v } = (0, i.useEnableProfileSyncing)(),
                    { disableProfileSyncing: b, error: _ } = (0, i.useDisableProfileSyncing)(),
                    k = (0, o.useSelector)(c.selectIsProfileSyncingEnabled),
                    x = v || _,
                    T = (0, o.useSelector)(c.selectIsProfileSyncingUpdateLoading),
                    C = (0, o.useSelector)(u.selectIsMetamaskNotificationsEnabled);
                  (0, a.useEffect)(() => {
                    !1 === y && b();
                  }, [y, b]);
                  return a.default.createElement(
                    p.Box,
                    null,
                    a.default.createElement(
                      p.Box,
                      {
                        className: 'settings-page__content-row',
                        display: f.Display.Flex,
                        flexDirection: f.FlexDirection.Row,
                        justifyContent: f.JustifyContent.spaceBetween,
                        gap: 4,
                        'data-testid': 'profileSyncToggle',
                      },
                      a.default.createElement(
                        'div',
                        { className: 'settings-page__content-item', id: 'profileSyncLabel' },
                        a.default.createElement('span', null, t('profileSync')),
                        a.default.createElement(
                          'div',
                          {
                            className: 'settings-page__content-description',
                            'data-testid': 'profileSyncDescription',
                          },
                          t('profileSyncDescription', [
                            a.default.createElement(
                              'a',
                              {
                                href: 'https://support.metamask.io/privacy-and-security/profile-privacy',
                                key: 'link',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                'data-testid': 'privacyPolicyLink',
                              },
                              t('profileSyncPrivacyLink')
                            ),
                          ])
                        )
                      ),
                      T &&
                        a.default.createElement(
                          p.Box,
                          { paddingLeft: 5, paddingRight: 5 },
                          a.default.createElement(g.default, { size: 36 })
                        ),
                      !T &&
                        a.default.createElement(
                          'div',
                          { className: 'settings-page__content-item-col' },
                          a.default.createElement(m.default, {
                            disabled: !y,
                            value: k,
                            onToggle: async () => {
                              k
                                ? n(
                                    (0, d.showModal)({
                                      name: 'CONFIRM_TURN_OFF_PROFILE_SYNCING',
                                      turnOffProfileSyncing: () => {
                                        e({
                                          category: l.MetaMetricsEventCategory.Settings,
                                          event: l.MetaMetricsEventName.SettingsUpdated,
                                          properties: {
                                            settings_group: 'security_privacy',
                                            settings_type: 'profile_syncing',
                                            old_value: !0,
                                            new_value: !1,
                                            was_notifications_on: C,
                                          },
                                        }),
                                          b();
                                      },
                                    })
                                  )
                                : (e({
                                    category: l.MetaMetricsEventCategory.Settings,
                                    event: l.MetaMetricsEventName.SettingsUpdated,
                                    properties: {
                                      settings_group: 'security_privacy',
                                      settings_type: 'profile_syncing',
                                      old_value: !1,
                                      new_value: !0,
                                      was_notifications_on: C,
                                    },
                                  }),
                                  await E());
                            },
                            offLabel: t('off'),
                            onLabel: t('on'),
                            dataTestId: 'toggleButton',
                          })
                        )
                    ),
                    x &&
                      a.default.createElement(
                        p.Box,
                        { paddingBottom: 4 },
                        a.default.createElement(
                          p.Text,
                          {
                            as: 'p',
                            color: f.TextColor.errorDefault,
                            variant: f.TextVariant.bodySm,
                          },
                          t('notificationsSettingsBoxError')
                        )
                      )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/security-tab/profile-sync-toggle/profile-sync-toggle.tsx',
      },
    ],
    [
      7503,
      { './reveal-srp-list': 7504 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'RevealSrpList', {
                    enumerable: !0,
                    get: function () {
                      return a.RevealSrpList;
                    },
                  });
                var a = e('./reveal-srp-list');
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/security-tab/reveal-srp-list/index.ts' },
    ],
    [
      7504,
      {
        '../../../../components/app/srp-quiz-modal/SRPQuiz': 6281,
        '../../../../components/component-library': 6402,
        '../../../../components/multichain/multi-srp/srp-list/srp-list': 6585,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.RevealSrpList = void 0);
                var a,
                  o = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  s = e('../../../../components/component-library'),
                  r =
                    (a = e('../../../../components/app/srp-quiz-modal/SRPQuiz')) && a.__esModule
                      ? a
                      : { default: a },
                  i = e('../../../../components/multichain/multi-srp/srp-list/srp-list');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.RevealSrpList = () => {
                  const [e, t] = (0, o.useState)(!1),
                    [n, a] = (0, o.useState)('');
                  return o.default.createElement(
                    s.Box,
                    null,
                    o.default.createElement(i.SrpList, {
                      onActionComplete: e => {
                        a(e), t(!0);
                      },
                      hideShowAccounts: !1,
                    }),
                    e &&
                      n &&
                      o.default.createElement(r.default, {
                        keyringId: n,
                        isOpen: e,
                        onClose: () => t(!1),
                      })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/pages/settings/security-tab/reveal-srp-list/reveal-srp-list.tsx',
      },
    ],
    [
      7505,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/lib/ui-utils': 5852,
        '../../../components/app/srp-quiz-modal/SRPQuiz': 6281,
        '../../../components/component-library': 6402,
        '../../../components/ui/popover': 6789,
        '../../../components/ui/text-field': 6810,
        '../../../components/ui/toggle-button': 6814,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/settings-search': 6915,
        '../../../store/actions': 7619,
        './delete-metametrics-data-button': 7497,
        './metametrics-toggle': 7499,
        './profile-sync-toggle': 7501,
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
                var a = e('lodash'),
                  o = T(e('prop-types')),
                  s = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = x(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = { __proto__: null },
                      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var r = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                        r && (r.get || r.set) ? Object.defineProperty(a, s, r) : (a[s] = e[s]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('../../../../app/scripts/lib/util'),
                  i = e('../../../../shared/constants/app'),
                  l = e('../../../../shared/constants/metametrics'),
                  c = e('../../../../shared/constants/network'),
                  u = e('../../../../shared/lib/ui-utils'),
                  d = T(e('../../../components/app/srp-quiz-modal/SRPQuiz')),
                  p = e('../../../components/component-library'),
                  m = T(e('../../../components/ui/text-field')),
                  f = T(e('../../../components/ui/toggle-button')),
                  g = T(e('../../../components/ui/popover')),
                  h = e('../../../helpers/constants/design-system'),
                  y = e('../../../helpers/constants/routes'),
                  E = e('../../../helpers/utils/settings-search'),
                  v = e('../../../store/actions'),
                  b = T(e('./metametrics-toggle')),
                  _ = T(e('./profile-sync-toggle')),
                  k = T(e('./delete-metametrics-data-button'));
                function x(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (x = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function T(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function C(e, t, n) {
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
                class w extends s.PureComponent {
                  constructor(...e) {
                    super(...e),
                      C(this, 'state', {
                        ipfsGateway: this.props.ipfsGateway || c.IPFS_DEFAULT_GATEWAY_URL,
                        ipfsGatewayError: '',
                        srpQuizModalVisible: !1,
                        showDataCollectionDisclaimer: !1,
                        ipfsToggle: this.props.ipfsGateway.length > 0,
                      }),
                      C(this, 'settingsRefCounter', 0),
                      C(
                        this,
                        'settingsRefs',
                        Array(
                          (0, E.getNumberOfSettingRoutesInTab)(
                            this.context.t,
                            this.context.t('securityAndPrivacy')
                          )
                        )
                          .fill(undefined)
                          .map(() => s.default.createRef())
                      ),
                      C(this, 'hideSrpQuizModal', () => this.setState({ srpQuizModalVisible: !1 })),
                      C(this, 'renderDataCollectionWarning', () => {
                        const { t: e } = this.context;
                        return s.default.createElement(
                          g.default,
                          {
                            wrapTitle: !0,
                            centerTitle: !0,
                            onClose: () => this.setState({ showDataCollectionDisclaimer: !1 }),
                            title: s.default.createElement(p.Icon, {
                              size: p.IconSize.Xl,
                              name: p.IconName.Danger,
                              color: h.IconColor.warningDefault,
                            }),
                            footer: s.default.createElement(
                              p.Button,
                              {
                                width: h.BlockSize.Full,
                                type: 'primary',
                                onClick: () => this.setState({ showDataCollectionDisclaimer: !1 }),
                              },
                              e('dataCollectionWarningPopoverButton')
                            ),
                          },
                          s.default.createElement(
                            p.Box,
                            {
                              display: h.Display.Flex,
                              flexDirection: h.FlexDirection.Column,
                              gap: 2,
                              margin: 4,
                            },
                            s.default.createElement(
                              p.Text,
                              null,
                              e('dataCollectionWarningPopoverDescription')
                            )
                          )
                        );
                      });
                  }
                  componentDidUpdate(e) {
                    const { t: t } = this.context;
                    (0, E.handleSettingsRefs)(t, t('securityAndPrivacy'), this.settingsRefs),
                      !0 === e.dataCollectionForMarketing &&
                        !0 === this.props.participateInMetaMetrics &&
                        !1 === this.props.dataCollectionForMarketing &&
                        this.setState({ showDataCollectionDisclaimer: !0 });
                  }
                  async componentDidMount() {
                    const { t: e } = this.context;
                    (0, E.handleSettingsRefs)(e, e('securityAndPrivacy'), this.settingsRefs),
                      this.props.metaMetricsDataDeletionId &&
                        (await (0, v.updateDataDeletionTaskStatus)());
                  }
                  toggleSetting(e, t, n, a) {
                    this.context.trackEvent({
                      category: l.MetaMetricsEventCategory.Settings,
                      event: t,
                      properties: { action: n, legacy_event: !0 },
                    }),
                      a(!e);
                  }
                  renderSeedWords() {
                    const { t: e } = this.context,
                      { history: t, hasMultipleHdKeyrings: n } = this.props;
                    return s.default.createElement(
                      s.default.Fragment,
                      null,
                      s.default.createElement(
                        'div',
                        {
                          ref: this.settingsRefs[1],
                          className: 'settings-page__security-tab-sub-header',
                        },
                        e('secretRecoveryPhrase')
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        s.default.createElement(
                          p.Button,
                          {
                            'data-testid': 'reveal-seed-words',
                            type: 'danger',
                            size: p.ButtonSize.Lg,
                            onClick: e => {
                              e.preventDefault(),
                                this.context.trackEvent({
                                  category: l.MetaMetricsEventCategory.Settings,
                                  event: l.MetaMetricsEventName.KeyExportSelected,
                                  properties: {
                                    key_type: l.MetaMetricsEventKeyType.Srp,
                                    location: 'Settings',
                                    hd_entropy_index: this.props.hdEntropyIndex,
                                  },
                                }),
                                this.context.trackEvent({
                                  category: l.MetaMetricsEventCategory.Settings,
                                  event: l.MetaMetricsEventName.SrpRevealClicked,
                                  properties: {
                                    key_type: l.MetaMetricsEventKeyType.Srp,
                                    location: 'Settings',
                                  },
                                }),
                                n
                                  ? t.push({ pathname: y.REVEAL_SRP_LIST_ROUTE })
                                  : this.setState({ srpQuizModalVisible: !0 });
                            },
                          },
                          e('revealSeedWords')
                        ),
                        this.state.srpQuizModalVisible &&
                          s.default.createElement(d.default, {
                            isOpen: this.state.srpQuizModalVisible,
                            onClose: this.hideSrpQuizModal,
                          })
                      )
                    );
                  }
                  renderSecurityAlertsToggle() {
                    const { t: e } = this.context,
                      { securityAlertsEnabled: t } = this.props;
                    return s.default.createElement(
                      s.default.Fragment,
                      null,
                      s.default.createElement(
                        'div',
                        { ref: this.settingsRefs[16] },
                        s.default.createElement(
                          'span',
                          { className: 'settings-page__security-tab-sub-header' },
                          e('securityAlerts')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        s.default.createElement(
                          p.Box,
                          {
                            ref: this.settingsRefs[3],
                            className: 'settings-page__content-row',
                            display: h.Display.Flex,
                            flexDirection: h.FlexDirection.Row,
                            justifyContent: h.JustifyContent.spaceBetween,
                            gap: 4,
                          },
                          s.default.createElement(
                            'div',
                            { className: 'settings-page__content-item' },
                            s.default.createElement(
                              'div',
                              { className: 'settings-page__content-description' },
                              e('securityAlertsDescription', [
                                s.default.createElement(
                                  'a',
                                  {
                                    key: 'learn_more_link',
                                    href: u.SECURITY_ALERTS_LEARN_MORE_LINK,
                                    rel: 'noreferrer',
                                    target: '_blank',
                                  },
                                  e('learnMoreUpperCase')
                                ),
                              ])
                            )
                          ),
                          s.default.createElement(
                            'div',
                            {
                              className: 'settings-page__content-item-col',
                              'data-testid': 'securityAlert',
                            },
                            s.default.createElement(f.default, {
                              value: t,
                              onToggle: this.toggleSecurityAlert.bind(this),
                              offLabel: e('off'),
                              onLabel: e('on'),
                            })
                          )
                        )
                      )
                    );
                  }
                  renderPhishingDetectionToggle() {
                    const { t: e } = this.context,
                      { usePhishDetect: t, setUsePhishDetect: n } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[3],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('usePhishingDetection')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('usePhishingDetectionDescription')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'usePhishingDetection',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderUse4ByteResolutionToggle() {
                    const { t: e } = this.context,
                      { use4ByteResolution: t, setUse4ByteResolution: n } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[4],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('use4ByteResolution')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('toggleDecodeDescription')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': '4byte-resolution-container',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderDataCollectionForMarketing() {
                    const { t: e } = this.context,
                      {
                        dataCollectionForMarketing: t,
                        participateInMetaMetrics: n,
                        setDataCollectionForMarketing: a,
                        setParticipateInMetaMetrics: o,
                        useExternalServices: r,
                      } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[19],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('dataCollectionForMarketing')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          s.default.createElement(
                            'span',
                            null,
                            e('dataCollectionForMarketingDescription')
                          )
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'data-collection-for-marketing-toggle',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          disabled: !r,
                          onToggle: e => {
                            const t = Boolean(!e);
                            a(t),
                              n
                                ? this.context.trackEvent({
                                    category: l.MetaMetricsEventCategory.Settings,
                                    event: l.MetaMetricsEventName.AnalyticsPreferenceSelected,
                                    properties: {
                                      is_metrics_opted_in: !0,
                                      has_marketing_consent: Boolean(t),
                                      location: 'Settings',
                                    },
                                  })
                                : o(!0);
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderChooseYourNetworkButton() {
                    const { t: e } = this.context;
                    return s.default.createElement(
                      p.Box,
                      {
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-choose-your-network',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Column,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('chooseYourNetwork')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('chooseYourNetworkDescription', [
                            s.default.createElement(
                              'a',
                              {
                                href: u.CONSENSYS_PRIVACY_LINK,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                key: 'cyn-consensys-privacy-link',
                              },
                              e('privacyMsg')
                            ),
                          ])
                        )
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item-col' },
                        s.default.createElement(
                          p.Button,
                          {
                            type: 'secondary',
                            className: 'settings-page__button',
                            onClick: () => {
                              (0, r.getEnvironmentType)() === i.ENVIRONMENT_TYPE_POPUP
                                ? global.platform.openExtensionInBrowser(
                                    y.ADD_POPULAR_CUSTOM_NETWORK
                                  )
                                : this.props.history.push(y.ADD_POPULAR_CUSTOM_NETWORK);
                            },
                          },
                          e('addCustomNetwork')
                        )
                      )
                    );
                  }
                  renderSafeChainsListValidationToggle() {
                    const { t: e } = this.context,
                      { useSafeChainsListValidation: t, setUseSafeChainsListValidation: n } =
                        this.props,
                      a = e('useSafeChainsListValidationWebsite');
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[14],
                        className: 'settings-page__content-row',
                        'data-testid': 'setting-safe-chains-validation',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Column,
                        gap: 4,
                      },
                      s.default.createElement(
                        p.Box,
                        {
                          className: 'settings-page__content-row',
                          gap: 4,
                          display: h.Display.Flex,
                          flexDirection: h.FlexDirection.Row,
                          justifyContent: h.JustifyContent.spaceBetween,
                        },
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          s.default.createElement('span', null, e('useSafeChainsListValidation')),
                          s.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            e('useSafeChainsListValidationDescription', [
                              s.default.createElement(
                                'b',
                                { key: 'safechain-list-validation-website' },
                                a
                              ),
                            ])
                          )
                        ),
                        s.default.createElement(
                          'div',
                          {
                            className: 'settings-page__content-item-col',
                            'data-testid': 'useSafeChainsListValidation',
                          },
                          s.default.createElement(f.default, {
                            value: t,
                            onToggle: e => n(!e),
                            offLabel: e('off'),
                            onLabel: e('on'),
                          })
                        )
                      )
                    );
                  }
                  renderIpfsGatewayControl() {
                    const { t: e } = this.context;
                    let t = '';
                    const n = n => {
                      if (n.length > 0)
                        try {
                          const a = (0, r.addUrlProtocolPrefix)(n);
                          a || (t = e('invalidIpfsGateway'));
                          const o = new URL(a);
                          'gateway.ipfs.io' === o.host && (t = e('forbiddenIpfsGateway')),
                            0 === t.length && this.props.setIpfsGateway(o.host);
                        } catch (n) {
                          t = e('invalidIpfsGateway');
                        }
                      else t = e('invalidIpfsGateway');
                      this.setState({ ipfsGateway: n, ipfsGatewayError: t });
                    };
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[7],
                        className: 'settings-page__content-row',
                        'data-testid': 'setting-ipfs-gateway',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Column,
                        gap: 4,
                      },
                      s.default.createElement(
                        p.Box,
                        {
                          className: 'settings-page__content-row',
                          gap: 4,
                          display: h.Display.Flex,
                          flexDirection: h.FlexDirection.Row,
                          justifyContent: h.JustifyContent.spaceBetween,
                        },
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          s.default.createElement('span', null, e('ipfsGateway')),
                          s.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            e('ipfsGatewayDescription')
                          )
                        ),
                        s.default.createElement(
                          'div',
                          {
                            className: 'settings-page__content-item-col',
                            'data-testid': 'ipfsToggle',
                          },
                          s.default.createElement(f.default, {
                            value: this.state.ipfsToggle,
                            onToggle: e => {
                              e
                                ? (this.props.setIsIpfsGatewayEnabled(!1),
                                  this.props.setIpfsGateway(''))
                                : (this.props.setIsIpfsGatewayEnabled(!0),
                                  n(this.state.ipfsGateway)),
                                this.setState({ ipfsToggle: !e });
                            },
                            offLabel: e('off'),
                            onLabel: e('on'),
                          })
                        )
                      ),
                      this.state.ipfsToggle &&
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-item' },
                          s.default.createElement('span', null, e('addIPFSGateway')),
                          s.default.createElement(
                            'div',
                            { className: 'settings-page__content-item-col' },
                            s.default.createElement(m.default, {
                              type: 'text',
                              value: this.state.ipfsGateway,
                              onChange: e => n(e.target.value),
                              error: this.state.ipfsGatewayError,
                              fullWidth: !0,
                              margin: 'dense',
                            })
                          )
                        ),
                      s.default.createElement(
                        p.Box,
                        {
                          className: 'settings-page__content-row',
                          display: h.Display.Flex,
                          flexDirection: h.FlexDirection.Row,
                          justifyContent: h.JustifyContent.spaceBetween,
                          gap: 4,
                          ref: this.settingsRefs[11],
                          marginTop: 3,
                          id: 'ens-domains',
                        },
                        s.default.createElement(
                          'div',
                          null,
                          e('ensDomainsSettingTitle'),
                          s.default.createElement(
                            'div',
                            { className: 'settings-page__content-description' },
                            s.default.createElement(
                              p.Text,
                              { color: h.TextColor.inherit, variant: h.TextVariant.inherit },
                              e('ensDomainsSettingDescriptionIntroduction')
                            ),
                            s.default.createElement(
                              p.Box,
                              {
                                as: 'ul',
                                marginTop: 4,
                                marginBottom: 4,
                                paddingInlineStart: 4,
                                style: { listStyleType: 'circle' },
                              },
                              s.default.createElement(
                                p.Text,
                                {
                                  as: 'li',
                                  color: h.TextColor.inherit,
                                  variant: h.TextVariant.inherit,
                                },
                                e('ensDomainsSettingDescriptionPart1')
                              ),
                              s.default.createElement(
                                p.Text,
                                {
                                  as: 'li',
                                  color: h.TextColor.inherit,
                                  variant: h.TextVariant.inherit,
                                },
                                e('ensDomainsSettingDescriptionPart2')
                              )
                            ),
                            s.default.createElement(
                              p.Text,
                              { color: h.TextColor.inherit, variant: h.TextVariant.inherit },
                              e('ensDomainsSettingDescriptionOutroduction')
                            )
                          )
                        ),
                        s.default.createElement(
                          'div',
                          {
                            className: 'settings-page__content-item-col',
                            'data-testid': 'ipfs-gateway-resolution-container',
                          },
                          s.default.createElement(f.default, {
                            value: this.props.useAddressBarEnsResolution,
                            onToggle: e => this.props.setUseAddressBarEnsResolution(!e),
                            offLabel: e('off'),
                            onLabel: e('on'),
                          })
                        )
                      )
                    );
                  }
                  renderAutoDetectTokensToggle() {
                    const { t: e } = this.context,
                      { useTokenDetection: t, setUseTokenDetection: n } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[8],
                        className: 'settings-page__content-row',
                        'data-testid': 'advanced-setting-gas-fee-estimation',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                        id: 'advanced-settings-autodetect-tokens',
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('autoDetectTokens')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('autoDetectTokensDescription', [
                            s.default.createElement(
                              'a',
                              {
                                href: u.AUTO_DETECT_TOKEN_LEARN_MORE_LINK,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                key: 'cyn-consensys-privacy-link',
                              },
                              (0, a.startCase)(e('learnMore'))
                            ),
                          ])
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'autoDetectTokens',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => {
                            this.toggleSetting(
                              e,
                              l.MetaMetricsEventName.KeyAutoDetectTokens,
                              l.MetaMetricsEventName.KeyAutoDetectTokens,
                              n
                            );
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderBatchAccountBalanceRequestsToggle() {
                    const { t: e } = this.context,
                      { useMultiAccountBalanceChecker: t, setUseMultiAccountBalanceChecker: n } =
                        this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[9],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('useMultiAccountBalanceChecker')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('useMultiAccountBalanceCheckerSettingDescription')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'useMultiAccountBalanceChecker',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => {
                            this.toggleSetting(
                              e,
                              l.MetaMetricsEventName.KeyBatchAccountBalanceRequests,
                              l.MetaMetricsEventName.KeyBatchAccountBalanceRequests,
                              n
                            );
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderCurrencyRateCheckToggle() {
                    const { t: e } = this.context,
                      { useCurrencyRateCheck: t, setUseCurrencyRateCheck: n } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[10],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('currencyRateCheckToggle')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('currencyRateCheckToggleDescription', [
                            s.default.createElement(
                              'a',
                              {
                                key: 'coingecko_link',
                                href: u.COINGECKO_LINK,
                                rel: 'noreferrer',
                                target: '_blank',
                              },
                              e('coingecko')
                            ),
                            s.default.createElement(
                              'a',
                              {
                                key: 'cryptocompare_link',
                                href: u.CRYPTOCOMPARE_LINK,
                                rel: 'noreferrer',
                                target: '_blank',
                              },
                              e('cryptoCompare')
                            ),
                            s.default.createElement(
                              'a',
                              {
                                key: 'privacy_policy_link',
                                href: u.PRIVACY_POLICY_LINK,
                                rel: 'noreferrer',
                                target: '_blank',
                              },
                              e('privacyMsg')
                            ),
                          ])
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'currencyRateCheckToggle',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderDisplayNftMediaToggle() {
                    const { t: e } = this.context,
                      {
                        openSeaEnabled: t,
                        setOpenSeaEnabled: n,
                        useNftDetection: a,
                        setUseNftDetection: o,
                      } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[12],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                        id: 'display-nft-media',
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('displayNftMedia')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('displayNftMediaDescription')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'displayNftMedia',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => {
                            this.context.trackEvent({
                              category: l.MetaMetricsEventCategory.Settings,
                              event: 'Enabled/Disable OpenSea',
                              properties: { action: 'Enabled/Disable OpenSea', legacy_event: !0 },
                            }),
                              e && a && o(!1),
                              n(!e);
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderNftDetectionToggle() {
                    const { t: e } = this.context,
                      {
                        openSeaEnabled: t,
                        setOpenSeaEnabled: n,
                        useNftDetection: a,
                        setUseNftDetection: o,
                      } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[13],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('useNftDetection')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('useNftDetectionDescriptionText')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'useNftDetection',
                        },
                        s.default.createElement(f.default, {
                          value: a,
                          onToggle: e => {
                            this.context.trackEvent({
                              category: l.MetaMetricsEventCategory.Settings,
                              event: 'NFT Detected',
                              properties: { action: 'NFT Detected', legacy_event: !0 },
                            }),
                              e || t || n(!e),
                              o(!e);
                          },
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderExternalNameSourcesToggle() {
                    const { t: e } = this.context,
                      { useExternalNameSources: t, setUseExternalNameSources: n } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[15],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('externalNameSourcesSetting')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('externalNameSourcesSettingDescription')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'useExternalNameSources',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  renderSimulationsToggle() {
                    const { t: e } = this.context,
                      { useTransactionSimulations: t, setUseTransactionSimulations: n } =
                        this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[17],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement('span', null, e('simulationsSettingSubHeader')),
                        s.default.createElement(
                          'div',
                          { className: 'settings-page__content-description' },
                          e('simulationsSettingDescription', [
                            s.default.createElement(
                              'a',
                              {
                                key: 'learn_more_link',
                                href: u.TRANSACTION_SIMULATIONS_LEARN_MORE_LINK,
                                rel: 'noreferrer',
                                target: '_blank',
                              },
                              e('learnMoreUpperCase')
                            ),
                          ])
                        )
                      ),
                      s.default.createElement(
                        'div',
                        {
                          className: 'settings-page__content-item-col',
                          'data-testid': 'useTransactionSimulations',
                        },
                        s.default.createElement(f.default, {
                          value: t,
                          onToggle: e => n(!e),
                          offLabel: e('off'),
                          onLabel: e('on'),
                        })
                      )
                    );
                  }
                  toggleSecurityAlert(e) {
                    const t = !e,
                      { setSecurityAlertsEnabled: n } = this.props;
                    this.context.trackEvent({
                      category: l.MetaMetricsEventCategory.Settings,
                      event: l.MetaMetricsEventName.SettingsUpdated,
                      properties: { blockaid_alerts_enabled: t },
                    }),
                      n(t);
                  }
                  renderUseExternalServices() {
                    const { t: e } = this.context,
                      {
                        useExternalServices: t,
                        toggleExternalServices: n,
                        setBasicFunctionalityModalOpen: a,
                      } = this.props;
                    return s.default.createElement(
                      p.Box,
                      {
                        ref: this.settingsRefs[0],
                        className: 'settings-page__content-row',
                        display: h.Display.Flex,
                        flexDirection: h.FlexDirection.Row,
                        justifyContent: h.JustifyContent.spaceBetween,
                        gap: 4,
                        'data-testid': 'advanced-setting-show-testnet-conversion',
                      },
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-item' },
                        s.default.createElement(
                          p.Box,
                          {
                            display: h.Display.Flex,
                            justifyContent: h.JustifyContent.spaceBetween,
                            alignItems: h.AlignItems.center,
                            marginBottom: 2,
                          },
                          s.default.createElement(
                            p.Text,
                            { variant: h.TextVariant.headingSm },
                            e('basicConfigurationLabel')
                          ),
                          s.default.createElement(f.default, {
                            value: t,
                            onToggle: () => {
                              t
                                ? a()
                                : (n(!0),
                                  this.context.trackEvent({
                                    category: l.MetaMetricsEventCategory.Settings,
                                    event: l.MetaMetricsEventName.SettingsUpdated,
                                    properties: {
                                      settings_group: 'security_privacy',
                                      settings_type: 'basic_functionality',
                                      old_value: !1,
                                      new_value: !0,
                                      was_notifications_on: !1,
                                      was_profile_syncing_on: !1,
                                    },
                                  }));
                            },
                            offLabel: e('off'),
                            onLabel: e('on'),
                          })
                        ),
                        s.default.createElement(
                          p.Text,
                          { marginBottom: 2, color: h.TextColor.textAlternative },
                          e('basicConfigurationDescription', [
                            s.default.createElement(
                              'a',
                              {
                                href: 'https://consensys.io/privacy-policy',
                                key: 'link',
                                target: '_blank',
                                rel: 'noreferrer noopener',
                              },
                              e('privacyMsg')
                            ),
                          ])
                        )
                      ),
                      s.default.createElement('div', {
                        className: 'settings-page__content-item-col',
                      })
                    );
                  }
                  render() {
                    const {
                        petnamesEnabled: e,
                        dataCollectionForMarketing: t,
                        setDataCollectionForMarketing: n,
                      } = this.props,
                      { showDataCollectionDisclaimer: a } = this.state;
                    return s.default.createElement(
                      'div',
                      { className: 'settings-page__body' },
                      this.renderUseExternalServices(),
                      a ? this.renderDataCollectionWarning() : null,
                      s.default.createElement(
                        'span',
                        { className: 'settings-page__security-tab-sub-header__bold' },
                        this.context.t('security')
                      ),
                      this.renderSeedWords(),
                      this.renderSecurityAlertsToggle(),
                      s.default.createElement(
                        'span',
                        { className: 'settings-page__security-tab-sub-header__bold' },
                        this.context.t('privacy')
                      ),
                      s.default.createElement(
                        'div',
                        {
                          ref: this.settingsRefs[21],
                          className: 'settings-page__content-padded',
                          'data-testid': 'profile-sync',
                        },
                        s.default.createElement(_.default, null)
                      ),
                      s.default.createElement(
                        'div',
                        null,
                        s.default.createElement(
                          'span',
                          { className: 'settings-page__security-tab-sub-header' },
                          this.context.t('alerts')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        this.renderPhishingDetectionToggle()
                      ),
                      s.default.createElement(
                        'div',
                        null,
                        s.default.createElement(
                          'span',
                          { className: 'settings-page__security-tab-sub-header' },
                          this.context.t('smartContracts')
                        )
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        this.renderUse4ByteResolutionToggle()
                      ),
                      s.default.createElement(
                        'span',
                        { className: 'settings-page__security-tab-sub-header' },
                        this.context.t('transactions')
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        this.renderCurrencyRateCheckToggle(),
                        this.renderSimulationsToggle()
                      ),
                      s.default.createElement(
                        'span',
                        {
                          className: 'settings-page__security-tab-sub-header',
                          ref: this.settingsRefs[6],
                        },
                        this.context.t('networkProvider')
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        this.renderChooseYourNetworkButton(),
                        this.renderSafeChainsListValidationToggle(),
                        this.renderIpfsGatewayControl()
                      ),
                      s.default.createElement(
                        'span',
                        { className: 'settings-page__security-tab-sub-header' },
                        this.context.t('tokenAutoDetection')
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        this.renderAutoDetectTokensToggle(),
                        this.renderBatchAccountBalanceRequestsToggle(),
                        this.renderDisplayNftMediaToggle(),
                        this.renderNftDetectionToggle()
                      ),
                      e &&
                        s.default.createElement(
                          s.default.Fragment,
                          null,
                          s.default.createElement(
                            'span',
                            { className: 'settings-page__security-tab-sub-header' },
                            this.context.t('settingsSubHeadingSignaturesAndTransactions')
                          ),
                          s.default.createElement(
                            'div',
                            { className: 'settings-page__content-padded' },
                            this.renderExternalNameSourcesToggle()
                          )
                        ),
                      s.default.createElement(
                        'span',
                        { className: 'settings-page__security-tab-sub-header' },
                        this.context.t('metrics')
                      ),
                      s.default.createElement(
                        'div',
                        { className: 'settings-page__content-padded' },
                        s.default.createElement(b.default, {
                          dataCollectionForMarketing: t,
                          setDataCollectionForMarketing: n,
                        }),
                        this.renderDataCollectionForMarketing(),
                        s.default.createElement(k.default, { ref: this.settingsRefs[20] })
                      )
                    );
                  }
                }
                (n.default = w),
                  C(w, 'contextTypes', { t: o.default.func, trackEvent: o.default.func }),
                  C(w, 'propTypes', {
                    history: o.default.object,
                    openSeaEnabled: o.default.bool,
                    setOpenSeaEnabled: o.default.func,
                    useNftDetection: o.default.bool,
                    setUseNftDetection: o.default.func,
                    dataCollectionForMarketing: o.default.bool,
                    setDataCollectionForMarketing: o.default.func.isRequired,
                    participateInMetaMetrics: o.default.bool.isRequired,
                    setParticipateInMetaMetrics: o.default.func.isRequired,
                    setUsePhishDetect: o.default.func.isRequired,
                    usePhishDetect: o.default.bool.isRequired,
                    setUse4ByteResolution: o.default.func.isRequired,
                    use4ByteResolution: o.default.bool.isRequired,
                    useTokenDetection: o.default.bool.isRequired,
                    setUseTokenDetection: o.default.func.isRequired,
                    setIpfsGateway: o.default.func.isRequired,
                    setIsIpfsGatewayEnabled: o.default.func.isRequired,
                    ipfsGateway: o.default.string.isRequired,
                    useMultiAccountBalanceChecker: o.default.bool.isRequired,
                    setUseMultiAccountBalanceChecker: o.default.func.isRequired,
                    useSafeChainsListValidation: o.default.bool.isRequired,
                    setUseSafeChainsListValidation: o.default.func.isRequired,
                    useCurrencyRateCheck: o.default.bool.isRequired,
                    setUseCurrencyRateCheck: o.default.func.isRequired,
                    useAddressBarEnsResolution: o.default.bool.isRequired,
                    setUseAddressBarEnsResolution: o.default.func.isRequired,
                    useExternalNameSources: o.default.bool.isRequired,
                    setUseExternalNameSources: o.default.func.isRequired,
                    setBasicFunctionalityModalOpen: o.default.func.isRequired,
                    setUseTransactionSimulations: o.default.func.isRequired,
                    useTransactionSimulations: o.default.bool.isRequired,
                    petnamesEnabled: o.default.bool.isRequired,
                    securityAlertsEnabled: o.default.bool,
                    useExternalServices: o.default.bool,
                    toggleExternalServices: o.default.func,
                    setSecurityAlertsEnabled: o.default.func,
                    metaMetricsDataDeletionId: o.default.string,
                    hdEntropyIndex: o.default.number,
                    hasMultipleHdKeyrings: o.default.bool,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/pages/settings/security-tab/security-tab.component.js' },
    ],
  ],
  [],
  {}
);
