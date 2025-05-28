LavaPack.loadBundle(
  [
    [
      6208,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../../../ui/toggle-button': 6814,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUICheckbox = void 0);
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
                  r = c(e('classnames')),
                  o = e('../../../../contexts/snaps'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = c(e('../../../ui/toggle-button'));
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
                n.SnapUICheckbox = ({
                  name: e,
                  variant: t,
                  fieldLabel: n,
                  label: c,
                  error: u,
                  form: p,
                  disabled: m,
                  ...f
                }) => {
                  const { handleInputChange: h, getValue: y } = (0, o.useSnapInterfaceContext)(),
                    g = y(e, p),
                    [b, v] = (0, a.useState)(g ?? !1);
                  (0, a.useEffect)(() => {
                    g !== undefined && null !== g && v(g);
                  }, [g]);
                  const T = () => {
                    v(!b), h(e, !b, p);
                  };
                  return a.default.createElement(
                    s.Box,
                    {
                      className: (0, r.default)('snap-ui-renderer__checkbox', {
                        'snap-ui-renderer__field': c !== undefined,
                      }),
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Column,
                    },
                    n && a.default.createElement(s.Label, { htmlFor: e }, n),
                    'toggle' === t
                      ? a.default.createElement(
                          l.default,
                          d({ onToggle: T, value: b, onLabel: c, offLabel: c, disabled: m }, f)
                        )
                      : a.default.createElement(
                          s.Checkbox,
                          d(
                            {
                              onChange: T,
                              isChecked: b,
                              label: c,
                              inputProps: { borderColor: i.BorderColor.borderMuted },
                              isDisabled: m,
                            },
                            f
                          )
                        ),
                    u &&
                      a.default.createElement(
                        s.HelpText,
                        { severity: s.HelpTextSeverity.Danger, marginTop: 1 },
                        u
                      )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-checkbox/snap-ui-checkbox.tsx' },
    ],
    [
      6209,
      { './snap-ui-dropdown': 6210 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-dropdown');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-dropdown/index.ts' },
    ],
    [
      6210,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../../../ui/dropdown': 6732,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIDropdown = void 0);
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
                  r = c(e('classnames')),
                  o = e('../../../../contexts/snaps'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = c(e('../../../ui/dropdown'));
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
                n.SnapUIDropdown = ({
                  name: e,
                  label: t,
                  error: n,
                  form: c,
                  disabled: u,
                  ...p
                }) => {
                  const { handleInputChange: m, getValue: f } = (0, o.useSnapInterfaceContext)(),
                    h = f(e, c),
                    [y, g] = (0, a.useState)(h ?? '');
                  (0, a.useEffect)(() => {
                    h !== undefined && null !== h && g(h);
                  }, [h]);
                  return a.default.createElement(
                    s.Box,
                    {
                      className: (0, r.default)('snap-ui-renderer__dropdown', {
                        'snap-ui-renderer__field': t !== undefined,
                      }),
                      display: i.Display.Flex,
                      flexDirection: i.FlexDirection.Column,
                    },
                    t && a.default.createElement(s.Label, { htmlFor: e }, t),
                    a.default.createElement(
                      l.default,
                      d(
                        {
                          'data-testid': 'snaps-dropdown',
                          selectedOption: y,
                          onChange: t => {
                            g(t), m(e, t, c);
                          },
                          style: { border: '1px solid var(--color-border-muted)' },
                          disabled: u,
                        },
                        p
                      )
                    ),
                    n &&
                      a.default.createElement(
                        s.HelpText,
                        { severity: s.HelpTextSeverity.Danger, marginTop: 1 },
                        n
                      )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-dropdown/snap-ui-dropdown.tsx' },
    ],
    [
      6211,
      { './snap-ui-file-input': 6212 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-file-input');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-file-input/index.ts' },
    ],
    [
      6212,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../component-library': 6402,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIFileInput = void 0);
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
                  o = (a = e('classnames')) && a.__esModule ? a : { default: a },
                  i = e('../../../../contexts/snaps'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../hooks/useI18nContext');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.SnapUIFileInput = ({
                  name: e,
                  label: t,
                  form: n,
                  accept: a,
                  compact: u,
                  error: d,
                  helpText: p,
                  disabled: m,
                }) => {
                  const f = (0, c.useI18nContext)(),
                    { handleFileChange: h } = (0, i.useSnapInterfaceContext)(),
                    y = (0, r.useRef)(null),
                    [g, b] = (0, r.useState)(!1),
                    v = () => {
                      var e;
                      null === (e = y.current) || void 0 === e || e.click();
                    },
                    T = r.default.createElement(
                      r.default.Fragment,
                      null,
                      t &&
                        r.default.createElement(
                          s.Label,
                          { htmlFor: e, className: (0, o.default)('mm-form-text-field__label') },
                          t
                        ),
                      r.default.createElement('input', {
                        id: e,
                        ref: y,
                        type: 'file',
                        name: e,
                        onChange: t => {
                          var a;
                          const r =
                            (null === (a = t.target.files) || void 0 === a ? void 0 : a[0]) ?? null;
                          h(e, r, n);
                        },
                        accept: null == a ? void 0 : a.join(','),
                        hidden: !0,
                        disabled: m,
                      })
                    ),
                    E = r.default.createElement(
                      r.default.Fragment,
                      null,
                      p &&
                        r.default.createElement(
                          s.HelpText,
                          {
                            severity: d ? s.HelpTextSeverity.Danger : undefined,
                            marginTop: 1,
                            className: 'mm-form-text-field__help-text',
                          },
                          p
                        )
                    );
                  return u
                    ? r.default.createElement(
                        s.Box,
                        {
                          className: (0, o.default)('snap-ui-renderer__file-input', {
                            'snap-ui-renderer__field': t !== undefined,
                          }),
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Column,
                        },
                        T,
                        r.default.createElement(s.ButtonIcon, {
                          type: 'button',
                          iconName: s.IconName.Upload,
                          color: l.IconColor.iconAlternative,
                          size: s.ButtonIconSize.Md,
                          padding: 1,
                          backgroundColor: l.BackgroundColor.backgroundAlternative,
                          borderColor: l.BorderColor.borderMuted,
                          borderStyle: l.BorderStyle.solid,
                          borderWidth: 1,
                          borderRadius: l.BorderRadius.MD,
                          onClick: v,
                          ariaLabel: f('uploadFile'),
                          disabled: m,
                        }),
                        E
                      )
                    : r.default.createElement(
                        s.Box,
                        {
                          className: (0, o.default)('snap-ui-renderer__file-input', {
                            'snap-ui-renderer__field': t !== undefined,
                          }),
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Column,
                        },
                        T,
                        r.default.createElement(
                          s.Box,
                          {
                            className: (0, o.default)('snap-ui-renderer__file-input__drop-zone', {
                              'snap-ui-snap-ui-renderer__file-input__drop-zone--disabled': !0 === m,
                            }),
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Row,
                            justifyContent: l.JustifyContent.center,
                            alignItems: l.AlignItems.center,
                            gap: 1,
                            paddingTop: 5,
                            paddingBottom: 5,
                            textAlign: l.TextAlign.Center,
                            borderColor: l.BorderColor.borderMuted,
                            borderStyle: l.BorderStyle.solid,
                            borderWidth: 1,
                            borderRadius: l.BorderRadius.MD,
                            style: {
                              backgroundColor: g
                                ? 'var(--color-background-default-hover)'
                                : 'var(--color-background-default)',
                            },
                            onClick: v,
                            onDragOver: e => {
                              e.preventDefault(), b(!0);
                            },
                            onDragLeave: e => {
                              e.preventDefault(), b(!1);
                            },
                            onDrop: t => {
                              var a;
                              t.preventDefault(), b(!1);
                              const r =
                                (null === (a = t.dataTransfer) ||
                                void 0 === a ||
                                null === (a = a.files) ||
                                void 0 === a
                                  ? void 0
                                  : a[0]) ?? null;
                              h(e, r, n);
                            },
                          },
                          r.default.createElement(s.Icon, {
                            name: s.IconName.Upload,
                            size: s.IconSize.Md,
                            color: g ? l.IconColor.infoDefault : l.IconColor.iconAlternative,
                          }),
                          r.default.createElement(
                            s.Text,
                            { color: g ? l.IconColor.infoDefault : l.IconColor.iconAlternative },
                            f('uploadDropFile')
                          )
                        ),
                        E
                      );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-file-input/snap-ui-file-input.tsx',
      },
    ],
    [
      6213,
      { './snap-ui-footer-button': 6214 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-footer-button');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-footer-button/index.ts' },
    ],
    [
      6214,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../snap-icon': 6170,
        '@metamask/snaps-sdk': 2779,
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
                  (n.SnapUIFooterButton = void 0);
                var a = p(e('react')),
                  r = e('@metamask/snaps-sdk'),
                  o = e('react-redux'),
                  i = p(e('classnames')),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../contexts/snaps'),
                  u = e('../snap-icon'),
                  d = e('../../../../selectors');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
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
                n.SnapUIFooterButton = ({
                  onCancel: e,
                  name: t,
                  children: n,
                  disabled: p = !1,
                  loading: f = !1,
                  isSnapAction: h = !1,
                  type: y,
                  variant: g = r.ButtonVariant.Primary,
                  snapVariant: b,
                  form: v,
                  ...T
                }) => {
                  const { handleEvent: E, snapId: w } = (0, c.useSnapInterfaceContext)(),
                    S = (0, o.useSelector)(e => (0, d.getHideSnapBranding)(e, w)),
                    x = h
                      ? e => {
                          y === r.ButtonType.Button && e.preventDefault(),
                            E({ event: r.UserInputEventType.ButtonClickEvent, name: t });
                        }
                      : e,
                    C = h ? r.ButtonVariant.Primary : r.ButtonVariant.Secondary,
                    k = S ? g : C;
                  return a.default.createElement(
                    s.Button,
                    m(
                      {
                        className: (0, i.default)('snap-ui-renderer__footer-button', {
                          'snap-ui-renderer__footer-button--disabled': p,
                          'hide-snap-branding': S,
                        }),
                        type: y,
                        form: v,
                      },
                      T,
                      {
                        size: s.ButtonSize.Lg,
                        block: !0,
                        disabled: p,
                        variant: k,
                        onClick: x,
                        textProps: {
                          display: l.Display.Flex,
                          alignItems: l.AlignItems.center,
                          flexDirection: l.FlexDirection.Row,
                        },
                        'data-theme': null,
                        danger: 'destructive' === b,
                      }
                    ),
                    h &&
                      !S &&
                      !f &&
                      a.default.createElement(u.SnapIcon, {
                        snapId: w,
                        avatarSize: s.IconSize.Sm,
                        marginRight: 2,
                      }),
                    f
                      ? a.default.createElement(s.Icon, {
                          name: s.IconName.Loading,
                          style: { animation: 'spin 1.2s linear infinite' },
                        })
                      : n
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-footer-button/snap-ui-footer-button.tsx',
      },
    ],
    [
      6215,
      { './snap-ui-form': 6216 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-form');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-form/index.ts' },
    ],
    [
      6216,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '@metamask/snaps-sdk': 2779,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIForm = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('@metamask/snaps-sdk'),
                  i = e('../../../../contexts/snaps'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system');
                n.SnapUIForm = ({ children: e, name: t }) => {
                  const { handleEvent: n } = (0, i.useSnapInterfaceContext)();
                  return r.default.createElement(
                    s.Box,
                    {
                      as: 'form',
                      className: 'snap-ui-renderer__form',
                      onSubmit: e => {
                        e.preventDefault(),
                          n({ event: o.UserInputEventType.FormSubmitEvent, name: t });
                      },
                      id: t,
                      display: l.Display.Flex,
                      flexDirection: l.FlexDirection.Column,
                      gap: 2,
                    },
                    e
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-form/snap-ui-form.tsx' },
    ],
    [
      6217,
      { './snap-ui-icon': 6218 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-icon');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-icon/index.ts' },
    ],
    [
      6218,
      { '../../../component-library/icon': 6401, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIIcon = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../component-library/icon');
                n.SnapUIIcon = ({ name: e, color: t, size: n }) =>
                  r.default.createElement(o.Icon, {
                    className: 'snap-ui-renderer__icon',
                    name: e,
                    size: n,
                    color: t,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-icon/snap-ui-icon.tsx' },
    ],
    [
      6219,
      { './snap-ui-image': 6220 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-image');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-image/index.ts' },
    ],
    [
      6220,
      { react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIImage = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a };
                n.SnapUIImage = ({ value: e, width: t, height: n, style: a, borderRadius: o }) => {
                  const i = `data:image/svg+xml;utf8,${encodeURIComponent(e)}`;
                  return r.default.createElement('img', {
                    className: 'snap-ui-renderer__image',
                    'data-testid': 'snaps-ui-image',
                    src: i,
                    width: t,
                    height: n,
                    style: { ...a, borderRadius: o },
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-image/snap-ui-image.tsx' },
    ],
    [
      6221,
      { './snap-ui-input': 6222 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-input');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-input/index.ts' },
    ],
    [
      6222,
      {
        '../../../../contexts/snaps': 6837,
        '../../../component-library': 6402,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIInput = void 0);
                var a,
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
                  o = (a = e('classnames')) && a.__esModule ? a : { default: a },
                  i = e('../../../../contexts/snaps'),
                  s = e('../../../component-library');
                function l(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (l = function (e) {
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
                n.SnapUIInput = ({ name: e, form: t, label: n, disabled: a, ...l }) => {
                  const {
                      handleInputChange: u,
                      getValue: d,
                      focusedInput: p,
                      setCurrentFocusedInput: m,
                    } = (0, i.useSnapInterfaceContext)(),
                    f = (0, r.useRef)(null),
                    h = d(e, t),
                    [y, g] = (0, r.useState)(h ?? '');
                  (0, r.useEffect)(() => {
                    h !== undefined && null !== h && g(h);
                  }, [h]),
                    (0, r.useEffect)(() => {
                      f.current && e === p && f.current.querySelector('input').focus();
                    }, [f]);
                  return r.default.createElement(
                    s.FormTextField,
                    c(
                      {
                        ref: f,
                        onFocus: () => m(e),
                        onBlur: () => m(null),
                        className: (0, o.default)('snap-ui-renderer__input', {
                          'snap-ui-renderer__field': n !== undefined,
                        }),
                        id: e,
                        value: y,
                        onChange: n => {
                          g(n.target.value), u(e, n.target.value ?? null, t);
                        },
                        label: n,
                        disabled: a,
                      },
                      l
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-input/snap-ui-input.tsx' },
    ],
    [
      6223,
      { './snap-ui-link': 6224 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapUILink', {
                    enumerable: !0,
                    get: function () {
                      return a.SnapUILink;
                    },
                  });
                var a = e('./snap-ui-link');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-link/index.js' },
    ],
    [
      6224,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/snaps/useSnapNavigation': 6962,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../snap-link-warning': 6174,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUILink = void 0);
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
                  r = p(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = p(e('../snap-link-warning')),
                  c = p(e('../../../../hooks/snaps/useSnapNavigation')),
                  u = e('../../../../contexts/snaps'),
                  d = e('../../../../selectors');
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
                const f = ({ href: e, children: t }) => {
                  const [n, r] = (0, a.useState)(!1),
                    p = e.startsWith('metamask:'),
                    { navigate: m } = (0, c.default)(),
                    { snapId: f } = (0, u.useSnapInterfaceContext)(),
                    h = (0, o.useSelector)(e => (0, d.getHideSnapBranding)(e, f)),
                    y = () => {
                      m(e);
                    };
                  return p
                    ? a.default.createElement(
                        s.ButtonLink,
                        {
                          as: 'a',
                          size: s.ButtonLinkSize.Inherit,
                          className: 'snap-ui-renderer__link',
                          onClick: y,
                        },
                        t
                      )
                    : h
                      ? a.default.createElement(
                          s.ButtonLink,
                          {
                            as: 'a',
                            href: e,
                            externalLink: !0,
                            size: s.ButtonLinkSize.Inherit,
                            display: i.Display.Inline,
                            className: 'snap-ui-renderer__link',
                            style: { width: 'fit-content' },
                            textProps: { display: i.Display.Inline },
                          },
                          t,
                          a.default.createElement(s.Icon, {
                            name: s.IconName.Export,
                            size: s.IconSize.Inherit,
                            marginLeft: 1,
                          })
                        )
                      : a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(l.default, {
                            isOpen: n,
                            onClose: () => {
                              r(!1);
                            },
                            url: e,
                          }),
                          a.default.createElement(
                            s.ButtonLink,
                            {
                              as: 'a',
                              onClick: () => {
                                r(!0);
                              },
                              externalLink: !0,
                              size: s.ButtonLinkSize.Inherit,
                              display: i.Display.Inline,
                              className: 'snap-ui-renderer__link',
                              style: { width: 'fit-content' },
                              textProps: { display: i.Display.Inline },
                            },
                            t,
                            a.default.createElement(s.Icon, {
                              name: s.IconName.Export,
                              size: s.IconSize.Inherit,
                              marginLeft: 1,
                            })
                          )
                        );
                };
                (n.SnapUILink = f),
                  (f.propTypes = { children: r.default.string, href: r.default.string });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-link/snap-ui-link.js' },
    ],
    [
      6225,
      { './snap-ui-markdown': 6226 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapUIMarkdown', {
                    enumerable: !0,
                    get: function () {
                      return a.SnapUIMarkdown;
                    },
                  });
                var a = e('./snap-ui-markdown');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-markdown/index.js' },
    ],
    [
      6226,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/snaps/useSnapNavigation': 6962,
        '../../../component-library': 6402,
        '../snap-link-warning': 6174,
        'prop-types': 5082,
        react: 5328,
        'react-markdown': 5262,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIMarkdown = void 0);
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
                  o = u(e('react-markdown')),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../component-library'),
                  l = u(e('../snap-link-warning')),
                  c = u(e('../../../../hooks/snaps/useSnapNavigation'));
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
                const m = e =>
                    a.default.createElement(
                      s.Text,
                      p({}, e, {
                        variant: i.TextVariant.bodyMd,
                        className: 'snap-ui-markdown__text',
                        'data-testid': 'snap-ui-markdown-text',
                        overflowWrap: i.OverflowWrap.Anywhere,
                        color: i.TextColor.inherit,
                      })
                    ),
                  f = ({ onClick: e, children: t, isMetaMaskUrl: n, ...r }) =>
                    a.default.createElement(
                      s.ButtonLink,
                      p({}, r, {
                        as: 'a',
                        onClick: e,
                        externalLink: !n,
                        size: s.ButtonLinkSize.Inherit,
                        display: i.Display.Inline,
                        className: 'snap-ui-markdown__link',
                      }),
                      t,
                      !n &&
                        a.default.createElement(s.Icon, {
                          name: s.IconName.Export,
                          size: s.IconSize.Inherit,
                          marginLeft: 1,
                        })
                    ),
                  h = e => e.startsWith('metamask:'),
                  y = ({ children: e, markdown: t }) => {
                    const [n, r] = (0, a.useState)(undefined),
                      { navigate: i } = (0, c.default)();
                    if (!1 === t) return a.default.createElement(m, null, e);
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(l.default, {
                        isOpen: Boolean(n),
                        onClose: () => {
                          r(undefined);
                        },
                        url: n,
                      }),
                      a.default.createElement(
                        o.default,
                        {
                          allowedElements: ['p', 'strong', 'em', 'a'],
                          transformLinkUri: e => (h(e) ? e : o.default.uriTransformer(e)),
                          components: {
                            p: m,
                            a: ({ children: e, href: t }) =>
                              a.default.createElement(
                                f,
                                {
                                  onClick: e => {
                                    e.stopPropagation(), h(t) ? i(t) : r(t);
                                  },
                                  isMetaMaskUrl: h(t),
                                },
                                e ?? t
                              ),
                          },
                        },
                        e
                      )
                    );
                  };
                (n.SnapUIMarkdown = y),
                  (y.propTypes = { children: r.default.string, markdown: r.default.bool }),
                  (f.propTypes = {
                    onClick: r.default.func,
                    children: r.default.node,
                    isMetaMaskUrl: r.default.bool,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-markdown/snap-ui-markdown.js' },
    ],
    [
      6227,
      { './snap-ui-radio-group': 6228 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-radio-group');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-radio-group/index.ts' },
    ],
    [
      6228,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
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
                  (n.SnapUIRadioGroup = void 0);
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
                  i = e('../../../../contexts/snaps'),
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
                n.SnapUIRadioGroup = ({
                  name: e,
                  label: t,
                  error: n,
                  form: a,
                  disabled: c,
                  ...u
                }) => {
                  const { handleInputChange: d, getValue: p } = (0, i.useSnapInterfaceContext)(),
                    m = p(e, a),
                    [f, h] = (0, r.useState)(m ?? '');
                  (0, r.useEffect)(() => {
                    m && f !== m && h(m);
                  }, [m]);
                  return r.default.createElement(
                    l.Box,
                    {
                      className: (0, o.default)('snap-ui-renderer__radio', {
                        'snap-ui-renderer__field': t !== undefined,
                      }),
                      display: s.Display.Flex,
                      flexDirection: s.FlexDirection.Column,
                    },
                    t && r.default.createElement(l.Label, { htmlFor: e }, t),
                    u.options.map(t =>
                      r.default.createElement(
                        l.Box,
                        { display: s.Display.Flex, alignItems: s.AlignItems.center },
                        r.default.createElement('input', {
                          type: 'radio',
                          id: t.name,
                          name: e,
                          value: t.value,
                          checked: f === t.value,
                          onChange: () => {
                            return (n = t.value), h(n), void d(e, n, a);
                            var n;
                          },
                          style: { margin: '0' },
                          disabled: c || t.disabled,
                        }),
                        r.default.createElement(
                          l.Text,
                          {
                            className: (0, o.default)({
                              'snap-ui-renderer__radio-label--disabled': c || t.disabled,
                            }),
                            as: 'label',
                            htmlFor: t.name,
                            variant: s.TextVariant.bodyMd,
                            marginLeft: 2,
                          },
                          t.name
                        )
                      )
                    ),
                    n &&
                      r.default.createElement(
                        l.HelpText,
                        { severity: l.HelpTextSeverity.Danger, marginTop: 1 },
                        n
                      )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-radio-group/snap-ui-radio-group.tsx',
      },
    ],
    [
      6229,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.addressInput = void 0);
                n.addressInput = ({ element: e, form: t }) => ({
                  element: 'SnapUIAddressInput',
                  props: {
                    name: e.props.name,
                    placeholder: e.props.placeholder,
                    disabled: e.props.disabled,
                    chainId: e.props.chainId,
                    form: t,
                    displayAvatar: e.props.displayAvatar,
                  },
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/address-input.ts',
      },
    ],
    [
      6230,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.address = void 0);
                n.address = ({ element: e }) => ({
                  element: 'SnapUIAddress',
                  props: {
                    address: e.props.address,
                    avatarSize: 'xs',
                    truncate: e.props.truncate,
                    displayName: e.props.displayName,
                    avatar: e.props.avatar,
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/address.ts' },
    ],
    [
      6231,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.assetSelector = void 0);
                n.assetSelector = ({ element: e, form: t }) => ({
                  element: 'SnapUIAssetSelector',
                  props: {
                    name: e.props.name,
                    addresses: e.props.addresses,
                    chainIds: e.props.chainIds,
                    disabled: e.props.disabled,
                    form: t,
                  },
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/asset-selector.ts',
      },
    ],
    [
      6232,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.avatar = void 0);
                n.avatar = ({ element: e }) => ({
                  element: 'SnapUIAvatar',
                  props: { address: e.props.address, size: e.props.size },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/avatar.ts' },
    ],
    [
      6233,
      { '../utils': 6265, '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.banner = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils');
                n.banner = ({ element: e, ...t }) => ({
                  element: 'SnapUIBanner',
                  children: (0, a.getJsxChildren)(e).map(e =>
                    (0, r.mapToTemplate)({ element: e, ...t })
                  ),
                  props: { title: e.props.title, severity: e.props.severity },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/banner.ts' },
    ],
    [
      6234,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../utils': 6265,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.bold = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils'),
                  o = e('../../../../../helpers/constants/design-system');
                n.bold = ({ element: e, ...t }) => ({
                  element: 'Text',
                  children: (0, r.mapTextToTemplate)((0, a.getJsxChildren)(e), t),
                  props: {
                    variant: o.TextVariant.bodyMd,
                    overflowWrap: o.OverflowWrap.Anywhere,
                    color: o.TextColor.inherit,
                    className: 'snap-ui-renderer__text',
                    as: 'b',
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/bold.ts' },
    ],
    [
      6235,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../utils': 6265,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.box = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../../../../../helpers/constants/design-system'),
                  o = e('../utils');
                function i(e) {
                  switch (e) {
                    default:
                    case 'start':
                      return r.JustifyContent.flexStart;
                    case 'center':
                      return r.JustifyContent.center;
                    case 'end':
                      return r.JustifyContent.flexEnd;
                    case 'space-between':
                      return r.JustifyContent.spaceBetween;
                    case 'space-around':
                      return r.JustifyContent.spaceAround;
                  }
                }
                function s(e, t) {
                  if (t) return r.AlignItems.center;
                  switch (e) {
                    default:
                      return undefined;
                    case 'start':
                      return r.AlignItems.flexStart;
                    case 'center':
                      return r.AlignItems.center;
                    case 'end':
                      return r.AlignItems.flexEnd;
                  }
                }
                n.box = ({ element: e, ...t }) => ({
                  element: 'Box',
                  children: (0, a.getJsxChildren)(e).map(e =>
                    (0, o.mapToTemplate)({ ...t, element: e })
                  ),
                  props: {
                    display: r.Display.Flex,
                    flexDirection:
                      'horizontal' === e.props.direction
                        ? r.FlexDirection.Row
                        : r.FlexDirection.Column,
                    justifyContent: i(e.props.alignment),
                    alignItems: s(e.props.crossAlignment, e.props.center),
                    className: 'snap-ui-renderer__panel',
                    color: r.TextColor.textDefault,
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/box.ts' },
    ],
    [
      6236,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../utils': 6265,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.button = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils'),
                  o = e('../../../../../helpers/constants/design-system');
                n.button = ({ element: e, ...t }) => ({
                  element: 'SnapUIButton',
                  props: {
                    type: e.props.type,
                    form: e.props.form,
                    variant: e.props.variant,
                    name: e.props.name,
                    disabled: e.props.disabled,
                    loading: e.props.loading,
                    textVariant:
                      'sm' === e.props.size ? o.TextVariant.bodySm : o.TextVariant.bodyMd,
                  },
                  children: (0, r.mapTextToTemplate)((0, a.getJsxChildren)(e), t),
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/button.ts' },
    ],
    [
      6237,
      { '../utils': 6265 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.card = void 0);
                var a = e('../utils');
                n.card = ({ element: e, ...t }) =>
                  'string' != typeof e.props.title
                    ? {
                        element: 'SnapUICard',
                        props: {
                          image: e.props.image,
                          description: e.props.description,
                          value: e.props.value,
                          extra: e.props.extra,
                        },
                        propComponents: {
                          title: (0, a.mapToTemplate)({ element: e.props.title, ...t }),
                        },
                      }
                    : {
                        element: 'SnapUICard',
                        props: {
                          image: e.props.image,
                          title: e.props.title,
                          description: e.props.description,
                          value: e.props.value,
                          extra: e.props.extra,
                        },
                      };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/card.ts' },
    ],
    [
      6238,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.checkbox = void 0);
                n.checkbox = ({ element: e, form: t }) => ({
                  element: 'SnapUICheckbox',
                  props: {
                    name: e.props.name,
                    label: e.props.label,
                    variant: e.props.variant,
                    disabled: e.props.disabled,
                    form: t,
                  },
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/checkbox.ts',
      },
    ],
    [
      6239,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../utils': 6265,
        './footer': 6245,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.container = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils'),
                  o = e('../../../../../helpers/constants/design-system'),
                  i = e('./footer');
                n.container = ({
                  element: e,
                  useFooter: t,
                  onCancel: n,
                  promptLegacyProps: s,
                  t: l,
                  ...c
                }) => {
                  const u = (0, a.getJsxChildren)(e);
                  t || 2 !== u.length || u.pop();
                  const d = u.map(e =>
                    (0, r.mapToTemplate)({ useFooter: t, onCancel: n, t: l, ...c, element: e })
                  );
                  return (
                    s &&
                      d.push({
                        element: 'FormTextField',
                        key: 'snap-prompt-input',
                        props: {
                          marginLeft: 4,
                          marginRight: 4,
                          className: 'snap-prompt-input',
                          value: s.inputValue,
                          onChange: s.onInputChange,
                          placeholder: s.placeholder,
                          maxLength: 300,
                        },
                      }),
                    t &&
                      n &&
                      !u[1] &&
                      d.push({
                        ...i.DEFAULT_FOOTER,
                        props: {
                          ...i.DEFAULT_FOOTER.props,
                          className: 'snap-ui-renderer__footer-centered',
                        },
                        children: {
                          element: 'SnapUIFooterButton',
                          key: 'default-button',
                          props: { onCancel: n, isSnapAction: !1 },
                          children: l('close'),
                        },
                      }),
                    {
                      element: 'Box',
                      children: d,
                      props: {
                        display: o.Display.Flex,
                        flexDirection: o.FlexDirection.Column,
                        className: 'snap-ui-renderer__container',
                      },
                    }
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/container.ts',
      },
    ],
    [
      6240,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.copyable = void 0);
                n.copyable = ({ element: e }) => ({
                  element: 'Copyable',
                  props: { text: e.props.value, sensitive: e.props.sensitive },
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/copyable.ts',
      },
    ],
    [
      6241,
      { '../../../../../helpers/constants/design-system': 6872 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.divider = void 0);
                var a = e('../../../../../helpers/constants/design-system');
                n.divider = () => ({
                  element: 'Box',
                  props: {
                    className: 'snap-ui-renderer__divider',
                    backgroundColor: a.BorderColor.borderMuted,
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/divider.ts' },
    ],
    [
      6242,
      { '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.dropdown = void 0);
                var a = e('@metamask/snaps-utils');
                n.dropdown = ({ element: e, form: t }) => {
                  const n = (0, a.getJsxChildren)(e).map(e => ({
                    value: e.props.value,
                    name: e.props.children,
                    disabled: e.props.disabled,
                  }));
                  return {
                    element: 'SnapUIDropdown',
                    props: {
                      id: e.props.name,
                      name: e.props.name,
                      disabled: e.props.disabled,
                      form: t,
                      options: n,
                    },
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/dropdown.ts',
      },
    ],
    [
      6243,
      {
        '../utils': 6265,
        './asset-selector': 6231,
        './checkbox': 6238,
        './dropdown': 6242,
        './input': 6251,
        './radioGroup': 6254,
        './selector': 6257,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.field = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils'),
                  o = e('./dropdown'),
                  i = e('./radioGroup'),
                  s = e('./checkbox'),
                  l = e('./selector'),
                  c = e('./asset-selector'),
                  u = e('./input');
                n.field = ({ element: e, form: t, ...n }) => {
                  const d = (0, a.getJsxChildren)(e),
                    p = (0, r.getPrimaryChildElementIndex)(d),
                    m = d[p];
                  switch (m.type) {
                    case 'AddressInput': {
                      const n = m;
                      return {
                        element: 'SnapUIAddressInput',
                        props: {
                          name: n.props.name,
                          placeholder: n.props.placeholder,
                          chainId: n.props.chainId,
                          displayAvatar: n.props.displayAvatar,
                          label: e.props.label,
                          form: t,
                          error: e.props.error,
                          disabled: n.props.disabled,
                        },
                      };
                    }
                    case 'FileInput':
                      return {
                        element: 'SnapUIFileInput',
                        props: {
                          name: m.props.name,
                          accept: m.props.accept,
                          compact: m.props.compact,
                          label: e.props.label,
                          form: t,
                          error: e.props.error !== undefined,
                          helpText: e.props.error,
                          disabled: m.props.disabled,
                        },
                      };
                    case 'Input': {
                      const a = e => (0, r.mapToTemplate)({ ...n, element: d[e] }),
                        o = m,
                        i =
                          p > 0
                            ? (() => (0, r.mapToTemplate)({ ...n, element: d[0] }))()
                            : undefined;
                      let s;
                      d[2] ? (s = 2) : 0 === p && d[1] && (s = 1);
                      const l = s ? a(s) : undefined;
                      return {
                        element: 'SnapUIInput',
                        props: {
                          id: o.props.name,
                          placeholder: o.props.placeholder,
                          label: e.props.label,
                          ...(0, u.constructInputProps)(o.props),
                          name: o.props.name,
                          form: t,
                          error: e.props.error !== undefined,
                          helpText: e.props.error,
                          disabled: m.props.disabled,
                        },
                        propComponents: {
                          startAccessory: i && { ...i, props: { ...i.props, padding: 0 } },
                          endAccessory: l && { ...l, props: { ...l.props, padding: 0 } },
                        },
                      };
                    }
                    case 'Dropdown': {
                      const n = m;
                      return {
                        element: 'SnapUIDropdown',
                        props: {
                          ...(0, o.dropdown)({ element: n }).props,
                          id: n.props.name,
                          label: e.props.label,
                          name: n.props.name,
                          form: t,
                          error: e.props.error,
                          disabled: m.props.disabled,
                        },
                      };
                    }
                    case 'RadioGroup': {
                      const n = m;
                      return {
                        element: 'SnapUIRadioGroup',
                        props: {
                          ...(0, i.radioGroup)({ element: n }).props,
                          id: n.props.name,
                          label: e.props.label,
                          name: n.props.name,
                          form: t,
                          error: e.props.error,
                          disabled: m.props.disabled,
                        },
                      };
                    }
                    case 'Checkbox': {
                      const n = m;
                      return {
                        element: 'SnapUICheckbox',
                        props: {
                          ...(0, s.checkbox)({ element: n }).props,
                          fieldLabel: e.props.label,
                          form: t,
                          error: e.props.error,
                          disabled: m.props.disabled,
                        },
                      };
                    }
                    case 'Selector': {
                      const a = m,
                        r = (0, l.selector)({ ...n, element: a });
                      return {
                        ...r,
                        element: 'SnapUISelector',
                        props: {
                          ...r.props,
                          label: e.props.label,
                          form: t,
                          error: e.props.error,
                          disabled: m.props.disabled,
                        },
                      };
                    }
                    case 'AssetSelector': {
                      const a = m,
                        r = (0, c.assetSelector)({ ...n, element: a });
                      return {
                        ...r,
                        element: 'SnapUIAssetSelector',
                        props: { ...r.props, label: e.props.label, form: t, error: e.props.error },
                      };
                    }
                    default:
                      throw new Error(`Invalid Field child: ${m.type}`);
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/field.ts' },
    ],
    [
      6244,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.fileInput = void 0);
                n.fileInput = ({ element: e, form: t }) => ({
                  element: 'SnapUIFileInput',
                  props: {
                    name: e.props.name,
                    accept: e.props.accept,
                    compact: e.props.compact,
                    disabled: e.props.disabled,
                    form: t,
                  },
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/file-input.ts',
      },
    ],
    [
      6245,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../component-library': 6402,
        './button': 6236,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.footer = n.DEFAULT_FOOTER = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../../../../../helpers/constants/design-system'),
                  o = e('../../../../component-library'),
                  i = e('./button');
                const s = (n.DEFAULT_FOOTER = {
                  element: 'Box',
                  key: 'default-footer',
                  props: {
                    display: r.Display.Flex,
                    flexDirection: r.FlexDirection.Row,
                    width: r.BlockSize.Full,
                    gap: 4,
                    padding: 4,
                    className: 'snap-ui-renderer__footer',
                    backgroundColor: r.BackgroundColor.backgroundDefault,
                    style: {
                      boxShadow: 'var(--shadow-size-md) var(--color-shadow-default)',
                      height: '80px',
                      position: 'fixed',
                      bottom: 0,
                    },
                  },
                });
                n.footer = ({ element: e, t: t, onCancel: n, ...r }) => {
                  const l = ((e, t, n) =>
                      1 === (0, a.getJsxChildren)(e).length && n
                        ? {
                            element: 'SnapUIFooterButton',
                            key: 'default-button',
                            props: {
                              onCancel: n,
                              variant: o.ButtonVariant.Secondary,
                              isSnapAction: !1,
                            },
                            children: t('cancel'),
                          }
                        : undefined)(e, t, n),
                    c = (0, a.getJsxChildren)(e),
                    u = c.map((e, t) => {
                      var n, a;
                      const s = (0, i.button)({ ...r, element: e });
                      return {
                        element: 'SnapUIFooterButton',
                        key: `snap-footer-button-${(null === (n = s.props) || void 0 === n ? void 0 : n.name) ?? t}`,
                        props: {
                          ...s.props,
                          snapVariant: null === (a = s.props) || void 0 === a ? void 0 : a.variant,
                          variant:
                            2 === c.length && 0 === t
                              ? o.ButtonVariant.Secondary
                              : o.ButtonVariant.Primary,
                          isSnapAction: !0,
                        },
                        children: s.children,
                      };
                    });
                  return l && u.unshift(l), { ...s, children: u };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/footer.ts' },
    ],
    [
      6246,
      { '../utils': 6265, '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.form = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils');
                n.form = ({ element: e, ...t }) => ({
                  element: 'SnapUIForm',
                  children: (0, a.getJsxChildren)(e).map(n =>
                    (0, r.mapToTemplate)({ element: n, form: e.props.name, ...t })
                  ),
                  props: { name: e.props.name },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/form.ts' },
    ],
    [
      6247,
      { '../../../../../helpers/constants/design-system': 6872 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.heading = n.generateSize = void 0);
                var a = e('../../../../../helpers/constants/design-system');
                const r = e => {
                  switch (e) {
                    case 'sm':
                    default:
                      return a.TextVariant.headingSm;
                    case 'md':
                      return a.TextVariant.headingMd;
                    case 'lg':
                      return a.TextVariant.headingLg;
                  }
                };
                n.generateSize = r;
                n.heading = ({ element: e }) => ({
                  element: 'Text',
                  children: e.props.children,
                  props: { variant: r(e.props.size), overflowWrap: a.OverflowWrap.Anywhere },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/heading.ts' },
    ],
    [
      6248,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../../../../component-library': 6402,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.icon = void 0);
                var a = e('../../../../../helpers/constants/design-system'),
                  r = e('../../../../component-library');
                const o = new Set(Object.values(r.IconName));
                n.icon = ({ element: e }) => ({
                  element: 'SnapUIIcon',
                  props: {
                    name: o.has(e.props.name) ? e.props.name : r.IconName.Danger,
                    color: (() => {
                      switch (e.props.color) {
                        case 'muted':
                          return a.IconColor.iconMuted;
                        case 'primary':
                          return a.IconColor.primaryDefault;
                        default:
                          return a.IconColor.iconDefault;
                      }
                    })(),
                    size: 'md' === e.props.size ? r.IconSize.Md : r.IconSize.Inherit,
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/icon.ts' },
    ],
    [
      6249,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                function a(e) {
                  switch (e) {
                    default:
                    case 'none':
                      return '0';
                    case 'medium':
                      return '6px';
                    case 'full':
                      return '50%';
                  }
                }
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.image = void 0);
                n.image = ({ element: e }) => ({
                  element: 'SnapUIImage',
                  props: { value: e.props.src, borderRadius: a(e.props.borderRadius) },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/image.ts' },
    ],
    [
      6250,
      {
        './address': 6230,
        './address-input': 6229,
        './asset-selector': 6231,
        './avatar': 6232,
        './banner': 6233,
        './bold': 6234,
        './box': 6235,
        './button': 6236,
        './card': 6237,
        './checkbox': 6238,
        './container': 6239,
        './copyable': 6240,
        './divider': 6241,
        './dropdown': 6242,
        './field': 6243,
        './file-input': 6244,
        './footer': 6245,
        './form': 6246,
        './heading': 6247,
        './icon': 6248,
        './image': 6249,
        './input': 6251,
        './italic': 6252,
        './link': 6253,
        './radioGroup': 6254,
        './row': 6255,
        './section': 6256,
        './selector': 6257,
        './skeleton': 6258,
        './spinner': 6259,
        './text': 6260,
        './tooltip': 6261,
        './value': 6262,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.COMPONENT_MAPPING = void 0);
                var a = e('./box'),
                  r = e('./heading'),
                  o = e('./text'),
                  i = e('./divider'),
                  s = e('./spinner'),
                  l = e('./image'),
                  c = e('./row'),
                  u = e('./address'),
                  d = e('./copyable'),
                  p = e('./button'),
                  m = e('./file-input'),
                  f = e('./form'),
                  h = e('./input'),
                  y = e('./bold'),
                  g = e('./italic'),
                  b = e('./link'),
                  v = e('./field'),
                  T = e('./dropdown'),
                  E = e('./radioGroup'),
                  w = e('./value'),
                  S = e('./checkbox'),
                  x = e('./tooltip'),
                  C = e('./card'),
                  k = e('./footer'),
                  _ = e('./container'),
                  A = e('./selector'),
                  O = e('./icon'),
                  I = e('./section'),
                  N = e('./avatar'),
                  M = e('./banner'),
                  P = e('./skeleton'),
                  R = e('./address-input'),
                  B = e('./asset-selector');
                n.COMPONENT_MAPPING = {
                  AssetSelector: B.assetSelector,
                  Box: a.box,
                  Heading: r.heading,
                  Text: o.text,
                  Divider: i.divider,
                  Spinner: s.spinner,
                  Icon: O.icon,
                  Image: l.image,
                  Copyable: d.copyable,
                  Row: c.row,
                  Address: u.address,
                  AddressInput: R.addressInput,
                  Avatar: N.avatar,
                  Button: p.button,
                  FileInput: m.fileInput,
                  Form: f.form,
                  Input: h.input,
                  Bold: y.bold,
                  Italic: g.italic,
                  Link: b.link,
                  Field: v.field,
                  Dropdown: T.dropdown,
                  RadioGroup: E.radioGroup,
                  Value: w.value,
                  Checkbox: S.checkbox,
                  Tooltip: x.tooltip,
                  Card: C.card,
                  Footer: k.footer,
                  Container: _.container,
                  Selector: A.selector,
                  Section: I.section,
                  Banner: M.banner,
                  Skeleton: P.skeleton,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/index.ts' },
    ],
    [
      6251,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.input = n.constructInputProps = void 0);
                var a = e('@metamask/utils');
                const r = e => {
                  if (!(0, a.hasProperty)(e, 'type')) return { textFieldProps: { type: 'text' } };
                  if ('number' === e.type) {
                    const { step: t, min: n, max: a, type: r } = e;
                    return {
                      textFieldProps: {
                        type: r,
                        inputProps: {
                          step: null == t ? void 0 : t.toString(),
                          min: null == n ? void 0 : n.toString(),
                          max: null == a ? void 0 : a.toString(),
                        },
                      },
                    };
                  }
                  return { textFieldProps: { type: e.type } };
                };
                n.constructInputProps = r;
                n.input = ({ element: e, form: t }) => ({
                  element: 'SnapUIInput',
                  props: {
                    id: e.props.name,
                    placeholder: e.props.placeholder,
                    disabled: e.props.disabled,
                    ...r(e.props),
                    name: e.props.name,
                    form: t,
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/input.ts' },
    ],
    [
      6252,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../utils': 6265,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.italic = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils'),
                  o = e('../../../../../helpers/constants/design-system');
                n.italic = ({ element: e, ...t }) => ({
                  element: 'Text',
                  children: (0, r.mapTextToTemplate)((0, a.getJsxChildren)(e), t),
                  props: {
                    variant: o.TextVariant.bodyMd,
                    overflowWrap: o.OverflowWrap.Anywhere,
                    color: o.TextColor.inherit,
                    className: 'snap-ui-renderer__text',
                    as: 'i',
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/italic.ts' },
    ],
    [
      6253,
      { '../utils': 6265, '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.link = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils');
                n.link = ({ element: e, ...t }) => ({
                  element: 'SnapUILink',
                  children: (0, r.mapTextToTemplate)((0, a.getJsxChildren)(e), t),
                  props: { href: e.props.href },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/link.ts' },
    ],
    [
      6254,
      { '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.radioGroup = void 0);
                var a = e('@metamask/snaps-utils');
                n.radioGroup = ({ element: e, form: t }) => {
                  const n = (0, a.getJsxChildren)(e).map(e => ({
                    value: e.props.value,
                    name: e.props.children,
                    disabled: e.props.disabled,
                  }));
                  return {
                    element: 'SnapUIRadioGroup',
                    props: {
                      id: e.props.name,
                      name: e.props.name,
                      disabled: e.props.disabled,
                      form: t,
                      options: n,
                    },
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/radioGroup.ts',
      },
    ],
    [
      6255,
      { '../utils': 6265 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.row = void 0);
                var a = e('../utils');
                n.row = ({ element: e, ...t }) => ({
                  element: 'ConfirmInfoRow',
                  children: [(0, a.mapToTemplate)({ ...t, element: e.props.children })],
                  props: {
                    label: e.props.label,
                    variant: e.props.variant,
                    tooltip: e.props.tooltip,
                    style: {
                      marginLeft: '-8px',
                      marginRight: '-8px',
                      marginTop: '0px',
                      marginBottom: '0px',
                    },
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/row.ts' },
    ],
    [
      6256,
      { '../../../../../helpers/constants/design-system': 6872, './box': 6235 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.section = void 0);
                var a = e('../../../../../helpers/constants/design-system'),
                  r = e('./box');
                n.section = ({ element: e, contentBackgroundColor: t, ...n }) => {
                  const { children: o, props: i } = (0, r.box)({ element: e, ...n });
                  return {
                    element: 'Box',
                    children: o,
                    props: {
                      ...i,
                      className: 'snap-ui-renderer__section',
                      padding: 4,
                      gap: 2,
                      backgroundColor:
                        t === a.BackgroundColor.backgroundDefault
                          ? a.BackgroundColor.backgroundAlternative
                          : a.BackgroundColor.backgroundDefault,
                      borderRadius: a.BorderRadius.LG,
                    },
                  };
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/section.ts' },
    ],
    [
      6257,
      { '../utils': 6265, '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.selector = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils');
                n.selector = ({ element: e, form: t, ...n }) => {
                  const o = (0, a.getJsxChildren)(e),
                    i = o.map(e => ({ value: e.props.value, disabled: e.props.disabled })),
                    s = o.map(e =>
                      (0, r.mapToTemplate)({ ...n, form: t, element: e.props.children })
                    );
                  return {
                    element: 'SnapUISelector',
                    props: {
                      id: e.props.name,
                      name: e.props.name,
                      title: e.props.title,
                      disabled: e.props.disabled,
                      form: t,
                      options: i,
                    },
                    propComponents: { optionComponents: s },
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/selector.ts',
      },
    ],
    [
      6258,
      { '../../../../../helpers/constants/design-system': 6872, '../utils': 6265 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.skeleton = void 0);
                var a = e('../../../../../helpers/constants/design-system'),
                  r = e('../utils');
                const o = a.BorderRadius.MD;
                n.skeleton = ({ element: e }) => ({
                  element: 'Skeleton',
                  props: {
                    width: e.props.width ?? '100%',
                    height: e.props.height ?? 22,
                    borderRadius: e.props.borderRadius
                      ? (0, r.mapSnapBorderRadiusToExtensionBorderRadius)(e.props.borderRadius)
                      : o,
                  },
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/snap-ui-renderer/components/skeleton.ts',
      },
    ],
    [
      6259,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.spinner = void 0);
                n.spinner = () => ({
                  element: 'Preloader',
                  props: { className: 'snap-ui-renderer__spinner' },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/spinner.ts' },
    ],
    [
      6260,
      {
        '../../../../../helpers/constants/design-system': 6872,
        '../utils': 6265,
        '@metamask/snaps-utils': 2890,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.text = void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('../utils'),
                  o = e('../../../../../helpers/constants/design-system');
                function i(e) {
                  switch (e) {
                    case 'default':
                      return o.TextColor.textDefault;
                    case 'alternative':
                      return o.TextColor.textAlternative;
                    case 'muted':
                      return o.TextColor.textMuted;
                    case 'error':
                      return o.TextColor.errorDefault;
                    case 'success':
                      return o.TextColor.successDefault;
                    case 'warning':
                      return o.TextColor.warningDefault;
                    default:
                      return o.TextColor.inherit;
                  }
                }
                function s(e) {
                  switch (e) {
                    case 'bold':
                      return o.FontWeight.Bold;
                    case 'medium':
                      return o.FontWeight.Medium;
                    default:
                      return o.FontWeight.Normal;
                  }
                }
                n.text = ({ element: e, ...t }) => ({
                  element: 'Text',
                  children: (0, r.mapTextToTemplate)((0, a.getJsxChildren)(e), t),
                  props: {
                    variant: 'sm' === e.props.size ? o.TextVariant.bodySm : o.TextVariant.bodyMd,
                    fontWeight: s(e.props.fontWeight),
                    overflowWrap: o.OverflowWrap.BreakWord,
                    color: i(e.props.color),
                    className: 'snap-ui-renderer__text',
                    textAlign: e.props.alignment,
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/text.ts' },
    ],
    [
      6261,
      { '../utils': 6265, '@metamask/snaps-sdk/jsx': 2862, '@metamask/snaps-utils': 2890 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.tooltip = void 0);
                var a = e('@metamask/snaps-sdk/jsx'),
                  r = e('@metamask/snaps-utils'),
                  o = e('../utils');
                n.tooltip = ({ element: e, ...t }) => ({
                  element: 'SnapUITooltip',
                  children: (0, r.getJsxChildren)(e).map(e =>
                    (0, o.mapToTemplate)({ element: e, ...t })
                  ),
                  propComponents: {
                    content: (0, o.mapToTemplate)({
                      element:
                        'string' == typeof e.props.content
                          ? (0, a.Text)({ children: e.props.content })
                          : e.props.content,
                      ...t,
                    }),
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/tooltip.ts' },
    ],
    [
      6262,
      { '../utils': 6265 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.value = void 0);
                var a = e('../utils');
                n.value = ({ element: e, ...t }) => ({
                  element: 'ConfirmInfoRowValueDouble',
                  props: {
                    left: 'string' == typeof e.props.extra ? e.props.extra : undefined,
                    right: 'string' == typeof e.props.value ? e.props.value : undefined,
                  },
                  propComponents: {
                    left:
                      'string' == typeof e.props.extra
                        ? undefined
                        : (0, a.mapToTemplate)({ element: e.props.extra, ...t }),
                    right:
                      'string' == typeof e.props.value
                        ? undefined
                        : (0, a.mapToTemplate)({ element: e.props.value, ...t }),
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/components/value.ts' },
    ],
    [
      6263,
      { './snap-ui-renderer': 6264 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SnapUIRenderer', {
                    enumerable: !0,
                    get: function () {
                      return a.SnapUIRenderer;
                    },
                  });
                var a = e('./snap-ui-renderer');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/index.js' },
    ],
    [
      6264,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors': 7601,
        '../../../component-library': 6402,
        '../../../ui/pulse-loader': 6791,
        '../../metamask-template-renderer/metamask-template-renderer': 6046,
        './components': 6250,
        './utils': 6265,
        '@metamask/snaps-sdk/jsx': 2862,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUIRenderer = void 0);
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
                  r = g(e('prop-types')),
                  o = e('react-redux'),
                  i = e('@metamask/snaps-sdk/jsx'),
                  s = e('lodash'),
                  l = g(e('../../metamask-template-renderer/metamask-template-renderer')),
                  c = e('../../../../selectors'),
                  u = e('../../../component-library'),
                  d = e('../../../../contexts/snaps'),
                  p = g(e('../../../ui/pulse-loader')),
                  m = e('../../../../helpers/constants/design-system'),
                  f = e('../../../../hooks/useI18nContext'),
                  h = e('./utils'),
                  y = e('./components');
                function g(e) {
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
                const v = () => {
                    const e = (0, a.useRef)(0);
                    return (
                      (e.current += 1),
                      a.default.createElement('span', {
                        'data-testid': 'performance',
                        'data-renders': e.current,
                      })
                    );
                  },
                  T = ({
                    snapId: e,
                    isLoading: t = !1,
                    isPrompt: n = !1,
                    inputValue: r,
                    onInputChange: g,
                    placeholder: b,
                    interfaceId: T,
                    useFooter: E = !1,
                    onCancel: w,
                    contentBackgroundColor: S,
                    PERF_DEBUG: x,
                  }) => {
                    var C, k;
                    const _ = (0, f.useI18nContext)(),
                      A = (0, o.useSelector)(
                        e => (0, c.getMemoizedInterface)(e, T),
                        (e, t) => (0, s.isEqual)(e.content, t.content)
                      ),
                      O = null == A ? void 0 : A.content,
                      I =
                        'Container' !== (null == O ? void 0 : O.type) && O
                          ? (0, i.Container)({ children: O })
                          : O,
                      N = (0, a.useMemo)(
                        () => n && { inputValue: r, onInputChange: g, placeholder: b },
                        [r, g, b, n]
                      ),
                      M =
                        S ??
                        (0, h.mapToExtensionCompatibleColor)(
                          null == I || null === (C = I.props) || void 0 === C
                            ? void 0
                            : C.backgroundColor
                        ) ??
                        m.BackgroundColor.backgroundAlternative,
                      P = (0, a.useMemo)(
                        () =>
                          I &&
                          (0, h.mapToTemplate)({
                            map: {},
                            element: I,
                            onCancel: w,
                            useFooter: E,
                            promptLegacyProps: N,
                            t: _,
                            contentBackgroundColor: M,
                            componentMap: y.COMPONENT_MAPPING,
                          }),
                        [I, w, E, N, _, M]
                      );
                    if (t || !I)
                      return a.default.createElement(
                        u.Box,
                        {
                          display: m.Display.Flex,
                          justifyContent: m.JustifyContent.center,
                          alignItems: m.AlignItems.center,
                          height: m.BlockSize.Full,
                          width: m.BlockSize.Full,
                        },
                        a.default.createElement(p.default, null)
                      );
                    const { state: R } = A,
                      B =
                        w ||
                        (null == I ||
                        null === (k = I.props) ||
                        void 0 === k ||
                        null === (k = k.children) ||
                        void 0 === k
                          ? void 0
                          : k[1]) !== undefined;
                    return a.default.createElement(
                      d.SnapInterfaceContextProvider,
                      { snapId: e, interfaceId: T, initialState: R },
                      a.default.createElement(
                        u.Box,
                        {
                          className: 'snap-ui-renderer__content',
                          height: m.BlockSize.Full,
                          backgroundColor: M,
                          style: { overflowY: 'auto', marginBottom: E && B ? '80px' : '0' },
                        },
                        a.default.createElement(l.default, { sections: P }),
                        x && a.default.createElement(v, null)
                      )
                    );
                  };
                n.SnapUIRenderer = (0, a.memo)(T, (e, t) => (0, s.isEqual)(e, t));
                T.propTypes = {
                  snapId: r.default.string,
                  isLoading: r.default.bool,
                  isPrompt: r.default.bool,
                  inputValue: r.default.string,
                  onInputChange: r.default.func,
                  placeholder: r.default.string,
                  interfaceId: r.default.string,
                  useFooter: r.default.bool,
                  onCancel: r.default.func,
                  contentBackgroundColor: r.default.string,
                  PERF_DEBUG: r.default.bool,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/snap-ui-renderer.js' },
    ],
    [
      6265,
      {
        '../../../../helpers/constants/design-system': 6872,
        '@metamask/snaps-utils': 2890,
        '@metamask/utils': 2995,
        '@noble/hashes/sha256': 3054,
        he: 4699,
        lodash: 4921,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.mapToTemplate =
                    n.mapToExtensionCompatibleColor =
                    n.mapTextToTemplate =
                    n.mapSnapBorderRadiusToExtensionBorderRadius =
                    n.getPrimaryChildElementIndex =
                    n.FIELD_ELEMENT_TYPES =
                      void 0);
                var a = e('@metamask/snaps-utils'),
                  r = e('lodash'),
                  o = e('@noble/hashes/sha256'),
                  i = e('@metamask/utils'),
                  s = e('he'),
                  l = e('../../../../helpers/constants/design-system');
                const c = (0, r.memoize)(e => {
                  const { type: t, props: n } = e,
                    { name: r } = n,
                    s = (function (e) {
                      if (!(0, a.hasChildren)(e)) return null;
                      const { children: t } = e.props;
                      return 'string' == typeof t
                        ? t.slice(0, 5e3)
                        : Array.isArray(t)
                          ? t.map(e => ({ type: (null == e ? void 0 : e.type) ?? null }))
                          : t;
                    })(e);
                  return (0, i.remove0x)(
                    (0, i.bytesToHex)(
                      (0, o.sha256)(JSON.stringify({ type: t, name: r ?? null, children: s }))
                    )
                  );
                });
                const u = e => {
                  const { type: t, key: n } = e.element,
                    a =
                      n ??
                      (function (e, t) {
                        const n = c(t),
                          a = (e[n] ?? 0) + 1;
                        return (e[n] = a), `${n}_${a}`;
                      })(e.map, e.element);
                  return { ...e.componentMap[t](e), key: a };
                };
                n.mapToTemplate = u;
                n.mapTextToTemplate = (e, t) =>
                  e.map(e => ('string' == typeof e ? (0, s.unescape)(e) : u({ ...t, element: e })));
                const d = (n.FIELD_ELEMENT_TYPES = [
                  'FileInput',
                  'AddressInput',
                  'Input',
                  'Dropdown',
                  'RadioGroup',
                  'Checkbox',
                  'Selector',
                  'AssetSelector',
                ]);
                n.getPrimaryChildElementIndex = e => e.findIndex(e => d.includes(e.type));
                n.mapToExtensionCompatibleColor = e => {
                  const t = {
                    default: l.BackgroundColor.backgroundAlternative,
                    alternative: l.BackgroundColor.backgroundDefault,
                  };
                  return e ? t[e] : undefined;
                };
                n.mapSnapBorderRadiusToExtensionBorderRadius = e => {
                  switch (e) {
                    case 'none':
                    default:
                      return l.BorderRadius.none;
                    case 'medium':
                      return l.BorderRadius.MD;
                    case 'full':
                      return l.BorderRadius.full;
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-renderer/utils.ts' },
    ],
    [
      6266,
      { './snap-ui-selector': 6267 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-selector');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-selector/index.ts' },
    ],
    [
      6267,
      {
        '../../../../contexts/snaps': 6837,
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUISelector = void 0);
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
                  o = (a = e('classnames')) && a.__esModule ? a : { default: a },
                  i = e('@metamask/utils'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../contexts/snaps');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const d = ({ value: e, children: t, selected: n, onSelect: a, disabled: o }) =>
                  r.default.createElement(
                    s.ButtonBase,
                    {
                      className: 'snap-ui-renderer__selector-item',
                      backgroundColor: n
                        ? l.BackgroundColor.primaryMuted
                        : l.BackgroundColor.transparent,
                      borderRadius: l.BorderRadius.LG,
                      paddingTop: 2,
                      paddingBottom: 2,
                      paddingRight: 4,
                      paddingLeft: 4,
                      ellipsis: !0,
                      textProps: { display: l.Display.Flex, width: l.BlockSize.Full },
                      onClick: () => {
                        a(e);
                      },
                      style: {
                        justifyContent: 'inherit',
                        textAlign: 'inherit',
                        height: 'inherit',
                        minHeight: '48px',
                        maxHeight: '58px',
                        position: 'relative',
                      },
                      disabled: o,
                    },
                    t,
                    n &&
                      r.default.createElement(s.Box, {
                        borderRadius: l.BorderRadius.pill,
                        backgroundColor: l.BackgroundColor.primaryDefault,
                        marginRight: 3,
                        style: {
                          position: 'absolute',
                          height: 'calc(100% - 8px)',
                          width: '4px',
                          top: '4px',
                          left: '4px',
                        },
                      })
                  );
                n.SnapUISelector = ({
                  className: e,
                  name: t,
                  title: n,
                  options: a,
                  optionComponents: u,
                  form: p,
                  label: m,
                  error: f,
                  disabled: h,
                }) => {
                  const { handleInputChange: y, getValue: g } = (0, c.useSnapInterfaceContext)(),
                    b = g(t, p),
                    [v, T] = (0, r.useState)(b),
                    [E, w] = (0, r.useState)(!1);
                  (0, r.useEffect)(() => {
                    b !== undefined && null !== b && T(b);
                  }, [b]);
                  const S = () => w(!1),
                    x = e => {
                      T(e), y(t, e, p), S();
                    },
                    C = a.findIndex(e =>
                      e.key && (0, i.isObject)(e.value)
                        ? e.value[e.key] === (null == v ? void 0 : v[e.key])
                        : e.value === v
                    ),
                    k = u[C];
                  return r.default.createElement(
                    r.default.Fragment,
                    null,
                    r.default.createElement(
                      s.Box,
                      {
                        display: l.Display.Flex,
                        flexDirection: l.FlexDirection.Column,
                        className: (0, o.default)({ 'snap-ui-renderer__field': m !== undefined }),
                      },
                      m && r.default.createElement(s.Label, { htmlFor: t }, m),
                      r.default.createElement(
                        s.ButtonBase,
                        {
                          className: e
                            ? (0, o.default)('snap-ui-renderer__selector', e)
                            : 'snap-ui-renderer__selector',
                          backgroundColor: l.BackgroundColor.backgroundDefault,
                          borderRadius: l.BorderRadius.LG,
                          paddingTop: 2,
                          paddingBottom: 2,
                          paddingRight: 4,
                          paddingLeft: 4,
                          ellipsis: !0,
                          textProps: { display: l.Display.Flex, width: l.BlockSize.Full },
                          disabled: h,
                          endIconName: s.IconName.ArrowDown,
                          endIconProps: { color: l.IconColor.primaryDefault, size: s.IconSize.Sm },
                          gap: 2,
                          onClick: e => {
                            e.preventDefault(), w(!0);
                          },
                          style: {
                            justifyContent: 'inherit',
                            textAlign: 'inherit',
                            height: 'inherit',
                            minHeight: '48px',
                            maxHeight: '58px',
                          },
                        },
                        k
                      ),
                      f &&
                        r.default.createElement(
                          s.HelpText,
                          { severity: s.HelpTextSeverity.Danger, marginTop: 1 },
                          f
                        )
                    ),
                    r.default.createElement(
                      s.Modal,
                      { isOpen: E, onClose: S },
                      r.default.createElement(s.ModalOverlay, null),
                      r.default.createElement(
                        s.ModalContent,
                        null,
                        r.default.createElement(
                          s.ModalHeader,
                          { onClose: S },
                          r.default.createElement(
                            s.Text,
                            {
                              variant: l.TextVariant.headingSm,
                              textAlign: l.TextAlign.Center,
                              ellipsis: !0,
                            },
                            n
                          )
                        ),
                        r.default.createElement(
                          s.ModalBody,
                          null,
                          r.default.createElement(
                            s.Box,
                            {
                              display: l.Display.Flex,
                              flexDirection: l.FlexDirection.Column,
                              gap: 2,
                            },
                            u.map((e, t) => {
                              var n;
                              return r.default.createElement(
                                d,
                                {
                                  value: a[t].value,
                                  disabled:
                                    null === (n = a[t]) || void 0 === n ? void 0 : n.disabled,
                                  onSelect: x,
                                  selected: t === C,
                                  key: t,
                                },
                                e
                              );
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-selector/snap-ui-selector.tsx' },
    ],
    [
      6268,
      { './snap-ui-tooltip': 6269 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 });
                var a = e('./snap-ui-tooltip');
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
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-tooltip/index.ts' },
    ],
    [
      6269,
      { '../../../ui/tooltip': 6818, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SnapUITooltip = void 0);
                var a = o(e('react')),
                  r = o(e('../../../ui/tooltip'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.SnapUITooltip = ({ content: e, children: t }) =>
                  a.default.createElement(
                    r.default,
                    { html: e, position: 'bottom', style: { display: 'inline-flex' } },
                    t
                  );
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-ui-tooltip/snap-ui-tooltip.tsx' },
    ],
    [
      6270,
      { './snap-update-alert': 6271 },
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
                  r = (a = e('./snap-update-alert')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-update-alert/index.js' },
    ],
    [
      6271,
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
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = e('../../../component-library'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext');
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
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const u = ({ snapName: e, onUpdateClick: t, bannerAlertProps: n }) => {
                  const r = (0, s.useI18nContext)();
                  return a.default.createElement(
                    o.BannerAlert,
                    c(
                      {
                        title: r('snapUpdateAvailable'),
                        actionButtonLabel: r('update'),
                        actionButtonOnClick: t,
                        actionButtonProps: {
                          endIconName: o.IconName.Download,
                          color: i.TextColor.primaryDefault,
                        },
                      },
                      n
                    ),
                    a.default.createElement(o.Text, null, r('snapUpdateAlertDescription', [e]))
                  );
                };
                u.propTypes = {
                  snapName: r.default.string.isRequired,
                  onUpdateClick: r.default.func.isRequired,
                  bannerAlertProps: r.default.object,
                };
                n.default = u;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-update-alert/snap-update-alert.js' },
    ],
    [
      6272,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../../../ui/icon/preloader/preloader-icon.component': 6752,
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
                  s = l(e('../../../ui/icon/preloader/preloader-icon.component'));
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = ({ value: e, url: t }) =>
                  a.default.createElement(
                    i.ButtonLink,
                    { href: t, target: '_blank', className: 'snap-external-pill', ellipsis: !0 },
                    a.default.createElement(
                      i.Box,
                      {
                        className: 'snap-external-pill__wrapper',
                        display: o.Display.Flex,
                        flexDirection: o.FlexDirection.Row,
                        alignItems: o.AlignItems.center,
                        backgroundColor: o.BackgroundColor.backgroundAlternative,
                        borderRadius: o.BorderRadius.pill,
                        paddingTop: 1,
                        paddingBottom: 1,
                        paddingLeft: 2,
                        paddingRight: 2,
                      },
                      e
                        ? a.default.createElement(
                            i.Text,
                            {
                              color: o.Color.textAlternative,
                              variant: o.TextVariant.bodyMd,
                              ellipsis: !0,
                            },
                            e
                          )
                        : a.default.createElement(s.default, { size: 18 }),
                      a.default.createElement(i.Icon, {
                        name: i.IconName.Export,
                        color: o.Color.textAlternative,
                        size: i.IconSize.Sm,
                        marginLeft: 1,
                      })
                    )
                  );
                c.propTypes = { value: r.default.string, url: r.default.string };
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/snap-version/snap-external-pill.js' },
    ],
    [
      6273,
      { './update-snap-permission-list': 6274 },
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
                  r = (a = e('./update-snap-permission-list')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/snaps/update-snap-permission-list/index.js' },
    ],
    [
      6274,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = y);
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
                  r = e('react-redux'),
                  o = f(e('prop-types')),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../component-library'),
                  l = e('../../../../selectors'),
                  c = f(e('../snap-permission-adapter')),
                  u = e('../../../../helpers/constants/design-system'),
                  d = e('../../../../../shared/constants/permissions'),
                  p = e('../../../../helpers/utils/util'),
                  m = e('../../../../helpers/utils/permission');
                function f(e) {
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
                function y({
                  approvedPermissions: e,
                  revokedPermissions: t,
                  newPermissions: n,
                  approvedConnections: o,
                  revokedConnections: f,
                  newConnections: h,
                  targetSubjectMetadata: y,
                  showAllPermissions: g,
                }) {
                  const b = (0, i.useI18nContext)(),
                    v = y.origin,
                    { name: T } = (0, r.useSelector)(e => (0, l.getSnapMetadata)(e, y.origin)),
                    E = (0, r.useSelector)(e =>
                      (0, l.getMultipleTargetsSubjectMetadata)(e, { ...h, ...o, ...f })
                    ),
                    w = (0, r.useSelector)(l.getSnapsMetadata),
                    S = { ...e, connection_permission: o ?? {} },
                    x = { ...t, connection_permission: f ?? {} },
                    C = { ...n, connection_permission: h ?? {} },
                    k = (0, m.getWeightedPermissions)({
                      t: b,
                      permissions: C,
                      subjectName: T,
                      getSubjectName: (0, p.getSnapName)(w),
                    }),
                    _ = (0, m.getWeightedPermissions)({
                      t: b,
                      permissions: x,
                      subjectName: T,
                      getSubjectName: (0, p.getSnapName)(w),
                    }),
                    A = (0, m.getWeightedPermissions)({
                      t: b,
                      permissions: S,
                      subjectName: T,
                      getSubjectName: (0, p.getSnapName)(w),
                    }),
                    [O, I] = (0, a.useState)(Object.keys(A).length < 1),
                    N = k.length + _.length,
                    M = Math.max(d.MinPermissionAbstractionDisplayCount - N, 0),
                    P = (0, p.getFilteredSnapPermissions)(
                      A,
                      d.PermissionWeightThreshold.snapUpdateApprovedPermissions,
                      M
                    );
                  return a.default.createElement(
                    s.Box,
                    null,
                    a.default.createElement(c.default, {
                      permissions: k,
                      snapId: v,
                      snapName: T,
                      targetSubjectsMetadata: E,
                    }),
                    a.default.createElement(c.default, {
                      permissions: _,
                      snapId: v,
                      snapName: T,
                      targetSubjectsMetadata: E,
                      revoked: !0,
                    }),
                    a.default.createElement(c.default, {
                      permissions: O ? A : P,
                      snapId: v,
                      snapName: T,
                      targetSubjectsMetadata: E,
                      approved: !0,
                    }),
                    O
                      ? null
                      : a.default.createElement(
                          s.Box,
                          {
                            display: u.Display.Flex,
                            justifyContent: u.JustifyContent.center,
                            paddingTop: 2,
                            paddingBottom: 2,
                          },
                          a.default.createElement(
                            s.ButtonLink,
                            { onClick: () => (g(), void I(!0)) },
                            b('seeAllPermissions')
                          )
                        )
                  );
                }
                y.propTypes = {
                  approvedPermissions: o.default.object.isRequired,
                  revokedPermissions: o.default.object.isRequired,
                  newPermissions: o.default.object.isRequired,
                  approvedConnections: o.default.object.isRequired,
                  revokedConnections: o.default.object.isRequired,
                  newConnections: o.default.object.isRequired,
                  showAllPermissions: o.default.func.isRequired,
                  targetSubjectMetadata: o.default.object.isRequired,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/snaps/update-snap-permission-list/update-snap-permission-list.js',
      },
    ],
    [
      6275,
      { './srp-input': 6277 },
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
                  r = (a = e('./srp-input')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-input/index.js' },
    ],
    [
      6276,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.parseSecretRecoveryPhrase = void 0);
                n.parseSecretRecoveryPhrase = e => {
                  var t;
                  return (
                    (null === (t = (e || '').trim().toLowerCase().match(/\w+/gu)) || void 0 === t
                      ? void 0
                      : t.join(' ')) || ''
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-input/parse-secret-recovery-phrase.js' },
    ],
    [
      6277,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/dropdown': 6732,
        '../../ui/show-hide-toggle': 6798,
        '../../ui/text-field': 6810,
        './parse-secret-recovery-phrase': 6276,
        '@ethersproject/hdnode': 538,
        'prop-types': 5082,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = b);
                var a = e('@ethersproject/hdnode'),
                  r = (function (e, t) {
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
                  o = f(e('prop-types')),
                  i = e('../../../hooks/useI18nContext'),
                  s = f(e('../../ui/text-field')),
                  l = e('../../../helpers/utils/util'),
                  c = e('../../component-library'),
                  u = f(e('../../ui/dropdown')),
                  d = f(e('../../ui/show-hide-toggle')),
                  p = e('../../../helpers/constants/design-system'),
                  m = e('./parse-secret-recovery-phrase');
                function f(e) {
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
                const y = 12,
                  g = e => e !== e.toLowerCase();
                function b({ onChange: e, srpText: t }) {
                  const [n, o] = (0, r.useState)(''),
                    [f, h] = (0, r.useState)(!1),
                    [b, v] = (0, r.useState)(new Array(y).fill('')),
                    [T, E] = (0, r.useState)(new Array(y).fill(!1)),
                    [w, S] = (0, r.useState)(y),
                    x = (0, i.useI18nContext)(),
                    C = (0, r.useCallback)(
                      t => {
                        let n = '';
                        const r = t.join(' ').trim();
                        t.some(e => '' !== e) &&
                          (t.some(e => '' === e)
                            ? (n = x('seedPhraseReq'))
                            : g(r)
                              ? (n = x('invalidSeedPhraseCaseSensitive'))
                              : (0, a.isValidMnemonic)(r) || (n = x('invalidSeedPhrase'))),
                          v(t),
                          o(n),
                          e(n ? '' : r);
                      },
                      [v, o, x, e]
                    ),
                    k = (0, r.useCallback)(e => {
                      E(t => {
                        const n = t.slice();
                        return n[e] ? (n[e] = !1) : (n.fill(!1), (n[e] = !0)), n;
                      });
                    }, []),
                    _ = (0, r.useCallback)(
                      (e, t) => {
                        f && h(!1);
                        const n = b.slice();
                        (n[e] = t.trim()), C(n);
                      },
                      [b, C, f]
                    ),
                    A = (0, r.useCallback)(
                      e => {
                        let t = (0, m.parseSecretRecoveryPhrase)(e).split(' ');
                        if (t.length > 24) return void h(!0);
                        f && h(!1);
                        let n = w;
                        t.length !== w &&
                          ((n =
                            t.length < 12
                              ? 12
                              : t.length % 3 == 0
                                ? t.length
                                : t.length + (3 - (t.length % 3))),
                          S(n)),
                          t.length < n && (t = t.concat(new Array(n - t.length).fill(''))),
                          E(new Array(n).fill(!1)),
                          C(t),
                          (0, l.clearClipboard)();
                      },
                      [w, C, f, h]
                    ),
                    O = [];
                  for (let e = 12; e <= 24; e += 3)
                    O.push({ name: x('srpInputNumberOfWords', [`${e}`]), value: `${e}` });
                  const I = (0, r.useCallback)(
                    e => {
                      const t = parseInt(e, 10);
                      if (Number.isNaN(t)) throw new Error('Unable to parse option as integer');
                      let n = b.slice(0, t);
                      n.length < t && (n = n.concat(new Array(t - n.length).fill(''))),
                        S(t),
                        E(new Array(t).fill(!1)),
                        C(n);
                    },
                    [b, C]
                  );
                  return r.default.createElement(
                    'div',
                    { className: 'import-srp__container' },
                    r.default.createElement(
                      'div',
                      { className: 'import-srp__dropdown-container' },
                      r.default.createElement(
                        'label',
                        { className: 'import-srp__srp-label' },
                        t &&
                          r.default.createElement(
                            c.Text,
                            { align: p.TextAlign.Left, variant: p.TextVariant.headingSm, as: 'h4' },
                            t
                          )
                      ),
                      r.default.createElement(c.BannerAlert, {
                        className: 'import-srp__paste-tip',
                        severity: p.Severity.Info,
                        description: x('srpPasteTip'),
                        descriptionProps: { className: 'import-srp__banner-alert-text' },
                      }),
                      r.default.createElement(u.default, {
                        className: 'import-srp__number-of-words-dropdown',
                        onChange: I,
                        options: O,
                        selectedOption: `${w}`,
                      })
                    ),
                    r.default.createElement(
                      'div',
                      { className: 'import-srp__srp' },
                      [...Array(w).keys()].map(e => {
                        const t = `import-srp__srp-word-${e}`;
                        return r.default.createElement(
                          'div',
                          { key: e, className: 'import-srp__srp-word' },
                          r.default.createElement(
                            'label',
                            { htmlFor: t, className: 'import-srp__srp-word-label' },
                            r.default.createElement(c.Text, null, `${e + 1}.`)
                          ),
                          r.default.createElement(s.default, {
                            id: t,
                            'data-testid': t,
                            type: T[e] ? 'text' : 'password',
                            onChange: t => {
                              t.preventDefault(), _(e, t.target.value);
                            },
                            value: b[e],
                            autoComplete: 'off',
                            onPaste: e => {
                              const t = e.clipboardData.getData('text');
                              t.trim().match(/\s/u) && (e.preventDefault(), A(t));
                            },
                          }),
                          r.default.createElement(d.default, {
                            id: `${t}-checkbox`,
                            ariaLabelHidden: x('srpWordHidden'),
                            ariaLabelShown: x('srpWordShown'),
                            shown: T[e],
                            'data-testid': `${t}-checkbox`,
                            onChange: () => k(e),
                            title: x('srpToggleShow'),
                          })
                        );
                      })
                    ),
                    n
                      ? r.default.createElement(c.BannerAlert, {
                          className: 'import-srp__srp-error',
                          severity: p.Severity.Danger,
                          description: n,
                          descriptionProps: { className: 'import-srp__banner-alert-text' },
                        })
                      : null,
                    f
                      ? r.default.createElement(c.BannerAlert, {
                          className: 'import-srp__srp-too-many-words-error',
                          severity: p.Severity.Danger,
                          actionButtonLabel: x('dismiss'),
                          actionButtonOnClick: () => h(!1),
                          description: x('srpPasteFailedTooManyWords'),
                          descriptionProps: { className: 'import-srp__banner-alert-text' },
                        })
                      : null
                  );
                }
                b.propTypes = {
                  onChange: o.default.func.isRequired,
                  srpText: o.default.string.isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-input/srp-input.js' },
    ],
    [
      6278,
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
                  (n.default = function ({
                    icon: e,
                    image: t,
                    content: n,
                    moreContent: a,
                    buttons: l,
                  }) {
                    const c = (0, i.useI18nContext)();
                    return r.default.createElement(
                      r.default.Fragment,
                      null,
                      e &&
                        r.default.createElement(
                          s.Box,
                          {
                            display: o.Display.Flex,
                            flexDirection: o.FlexDirection.Row,
                            alignItems: o.AlignItems.center,
                            justifyContent: o.JustifyContent.center,
                          },
                          e
                        ),
                      t &&
                        r.default.createElement(
                          s.Box,
                          {
                            display: o.Display.Flex,
                            margin: 'auto',
                            textAlign: o.TextAlign.Center,
                          },
                          r.default.createElement('img', {
                            src: t,
                            alt: c('srpSecurityQuizImgAlt'),
                            width: '300',
                            style: { maxWidth: '100%' },
                          })
                        ),
                      r.default.createElement(
                        s.Text,
                        {
                          variant: o.TextVariant.bodyLgMedium,
                          textAlign: o.TextAlign.Center,
                          color: null == e ? void 0 : e.props.color,
                        },
                        n
                      ),
                      a &&
                        r.default.createElement(
                          s.Text,
                          { variant: o.TextVariant.bodyMd, textAlign: o.TextAlign.Center },
                          a
                        ),
                      l.map((e, t) =>
                        r.default.createElement(
                          s.Button,
                          {
                            key: t,
                            size: e.size,
                            onClick: e.onClick,
                            variant: e.variant,
                            width: o.BlockSize.Full,
                            'data-testid': e['data-testid'],
                          },
                          e.label
                        )
                      )
                    );
                  });
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../../hooks/useI18nContext'),
                  s = e('../../../component-library');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-quiz-modal/QuizContent/QuizContent.tsx' },
    ],
    [
      6279,
      { './QuizContent': 6278 },
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
                  r = (a = e('./QuizContent')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-quiz-modal/QuizContent/index.ts' },
    ],
    [
      6280,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../contexts/metametrics': 6836,
        '../../../../helpers/constants/design-system': 6872,
        '../../../../helpers/constants/routes': 6878,
        '../../../../helpers/constants/zendesk-url': 6885,
        '../../../../hooks/useI18nContext': 6985,
        '../../../../selectors/selectors': 7611,
        '../../../component-library': 6402,
        '../../../component-library/modal-content/deprecated': 6412,
        '../../../component-library/modal-header/deprecated': 6421,
        '../QuizContent': 6279,
        '../types': 6283,
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
                  (n.default = function (e) {
                    const [t, n] = (0, a.useState)(y.QuizStage.introduction),
                      u = (0, a.useContext)(s.MetaMetricsContext),
                      b = (0, r.useHistory)(),
                      v = (0, d.useI18nContext)(),
                      S = (0, o.useSelector)(g.getHDEntropyIndex);
                    let x = '';
                    const C = {};
                    (C[y.QuizStage.introduction] = () => (
                      (x = v('srpSecurityQuizTitle')),
                      a.default.createElement(h.default, {
                        image: 'images/reveal-srp.png',
                        content: v('srpSecurityQuizIntroduction'),
                        buttons: [
                          {
                            label: v('srpSecurityQuizGetStarted'),
                            onClick: () => n(y.QuizStage.questionOne),
                            variant: p.ButtonVariant.Primary,
                            size: p.ButtonSize.Lg,
                            'data-testid': 'srp-quiz-get-started',
                          },
                          {
                            label: v('learnMoreUpperCase'),
                            onClick: w,
                            variant: p.ButtonVariant.Link,
                            'data-testid': 'srp-quiz-learn-more',
                          },
                        ],
                      })
                    )),
                      (C[y.QuizStage.questionOne] = () => (
                        (x = `1 ${v('ofTextNofM')} 2`),
                        a.default.createElement(h.default, {
                          content: v('srpSecurityQuizQuestionOneQuestion'),
                          buttons: [
                            {
                              label: v('srpSecurityQuizQuestionOneWrongAnswer'),
                              onClick: () => n(y.QuizStage.wrongAnswerQuestionOne),
                              variant: p.ButtonVariant.Secondary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-wrong-answer',
                            },
                            {
                              label: v('srpSecurityQuizQuestionOneRightAnswer'),
                              onClick: () => n(y.QuizStage.rightAnswerQuestionOne),
                              variant: p.ButtonVariant.Secondary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-right-answer',
                            },
                            {
                              label: v('learnMoreUpperCase'),
                              onClick: w,
                              variant: p.ButtonVariant.Link,
                            },
                          ],
                        })
                      )),
                      (C[y.QuizStage.rightAnswerQuestionOne] = () => (
                        (x = `1 ${v('ofTextNofM')} 2`),
                        a.default.createElement(h.default, {
                          icon: E,
                          content: v('srpSecurityQuizQuestionOneRightAnswerTitle'),
                          moreContent: v('srpSecurityQuizQuestionOneRightAnswerDescription'),
                          buttons: [
                            {
                              label: v('continue'),
                              onClick: () => n(y.QuizStage.questionTwo),
                              variant: p.ButtonVariant.Primary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-continue',
                            },
                            {
                              label: v('learnMoreUpperCase'),
                              onClick: w,
                              variant: p.ButtonVariant.Link,
                            },
                          ],
                        })
                      )),
                      (C[y.QuizStage.wrongAnswerQuestionOne] = () => (
                        (x = `1 ${v('ofTextNofM')} 2`),
                        a.default.createElement(h.default, {
                          icon: T,
                          content: v('srpSecurityQuizQuestionOneWrongAnswerTitle'),
                          moreContent: v('srpSecurityQuizQuestionOneWrongAnswerDescription'),
                          buttons: [
                            {
                              label: v('tryAgain'),
                              onClick: () => n(y.QuizStage.questionOne),
                              variant: p.ButtonVariant.Primary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-try-again',
                            },
                            {
                              label: v('learnMoreUpperCase'),
                              onClick: w,
                              variant: p.ButtonVariant.Link,
                            },
                          ],
                        })
                      )),
                      (C[y.QuizStage.questionTwo] = () => (
                        (x = `2 ${v('ofTextNofM')} 2`),
                        a.default.createElement(h.default, {
                          content: v('srpSecurityQuizQuestionTwoQuestion'),
                          buttons: [
                            {
                              label: v('srpSecurityQuizQuestionTwoRightAnswer'),
                              onClick: () => n(y.QuizStage.rightAnswerQuestionTwo),
                              variant: p.ButtonVariant.Secondary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-right-answer',
                            },
                            {
                              label: v('srpSecurityQuizQuestionTwoWrongAnswer'),
                              onClick: () => n(y.QuizStage.wrongAnswerQuestionTwo),
                              variant: p.ButtonVariant.Secondary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-wrong-answer',
                            },
                            {
                              label: v('learnMoreUpperCase'),
                              onClick: w,
                              variant: p.ButtonVariant.Link,
                            },
                          ],
                        })
                      )),
                      (C[y.QuizStage.rightAnswerQuestionTwo] = () => (
                        (x = `2 ${v('ofTextNofM')} 2`),
                        a.default.createElement(h.default, {
                          icon: E,
                          content: v('srpSecurityQuizQuestionTwoRightAnswerTitle'),
                          moreContent: v('srpSecurityQuizQuestionTwoRightAnswerDescription'),
                          buttons: [
                            {
                              label: v('continue'),
                              onClick: () => {
                                let t = c.REVEAL_SEED_ROUTE;
                                e.keyringId && (t = `${c.REVEAL_SEED_ROUTE}/${e.keyringId}`),
                                  b.push(t),
                                  e.closeAfterCompleting && e.onClose();
                              },
                              variant: p.ButtonVariant.Primary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-continue',
                            },
                            {
                              label: v('learnMoreUpperCase'),
                              onClick: w,
                              variant: p.ButtonVariant.Link,
                            },
                          ],
                        })
                      )),
                      (C[y.QuizStage.wrongAnswerQuestionTwo] = () => (
                        (x = `2 ${v('ofTextNofM')} 2`),
                        a.default.createElement(h.default, {
                          icon: T,
                          content: v('srpSecurityQuizQuestionTwoWrongAnswerTitle'),
                          moreContent: v('srpSecurityQuizQuestionTwoWrongAnswerDescription'),
                          buttons: [
                            {
                              label: v('tryAgain'),
                              onClick: () => n(y.QuizStage.questionTwo),
                              variant: p.ButtonVariant.Primary,
                              size: p.ButtonSize.Lg,
                              'data-testid': 'srp-quiz-try-again',
                            },
                            {
                              label: v('learnMoreUpperCase'),
                              onClick: w,
                              variant: p.ButtonVariant.Link,
                            },
                          ],
                        })
                      ));
                    const k = (0, a.useCallback)(e => {
                      u(
                        {
                          category: i.MetaMetricsEventCategory.Keys,
                          event: i.MetaMetricsEventName.KeyExportSelected,
                          properties: {
                            key_type: i.MetaMetricsEventKeyType.Srp,
                            location: e,
                            hd_entropy_index: S,
                          },
                        },
                        {}
                      );
                    }, []);
                    (0, a.useEffect)(() => {
                      k(`stage_${t}`);
                    }, [t]);
                    const _ = C[t]();
                    return a.default.createElement(
                      p.Modal,
                      { isOpen: e.isOpen, onClose: e.onClose },
                      a.default.createElement(p.ModalOverlay, null),
                      a.default.createElement(
                        m.ModalContent,
                        {
                          modalDialogProps: {
                            display: l.Display.Flex,
                            flexDirection: l.FlexDirection.Column,
                            gap: 4,
                          },
                        },
                        a.default.createElement(
                          f.ModalHeader,
                          { onClose: e.onClose, 'data-testid': 'srp-quiz-header' },
                          x
                        ),
                        a.default.createElement('span', { 'data-testid': `srp_stage_${t}` }),
                        _
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
                      r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                      if ('default' !== o && {}.hasOwnProperty.call(e, o)) {
                        var i = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, o, i) : (a[o] = e[o]);
                      }
                    return (a.default = e), n && n.set(e, a), a;
                  })(e('react')),
                  r = e('react-router-dom'),
                  o = e('react-redux'),
                  i = e('../../../../../shared/constants/metametrics'),
                  s = e('../../../../contexts/metametrics'),
                  l = e('../../../../helpers/constants/design-system'),
                  c = e('../../../../helpers/constants/routes'),
                  u = b(e('../../../../helpers/constants/zendesk-url')),
                  d = e('../../../../hooks/useI18nContext'),
                  p = e('../../../component-library'),
                  m = e('../../../component-library/modal-content/deprecated'),
                  f = e('../../../component-library/modal-header/deprecated'),
                  h = b(e('../QuizContent')),
                  y = e('../types'),
                  g = e('../../../../selectors/selectors');
                function b(e) {
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
                const T = a.default.createElement(p.Icon, {
                    size: p.IconSize.Xl,
                    name: p.IconName.Warning,
                    color: l.IconColor.errorDefault,
                    textAlign: l.TextAlign.Center,
                    width: l.BlockSize.OneTwelfth,
                  }),
                  E = a.default.createElement(p.Icon, {
                    size: p.IconSize.Xl,
                    name: p.IconName.Confirmation,
                    color: l.IconColor.successDefault,
                    textAlign: l.TextAlign.Center,
                    width: l.BlockSize.OneTwelfth,
                  }),
                  w = () => {
                    global.platform.openTab({ url: u.default.PASSWORD_AND_SRP_ARTICLE });
                  };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-quiz-modal/SRPQuiz/SRPQuiz.tsx' },
    ],
    [
      6281,
      { './SRPQuiz': 6280 },
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
                  r = (a = e('./SRPQuiz')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-quiz-modal/SRPQuiz/index.ts' },
    ],
    [
      6282,
      { './SRPQuiz': 6281 },
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
                  r = (a = e('./SRPQuiz')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-quiz-modal/index.ts' },
    ],
    [
      6283,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.QuizStage = void 0);
                n.QuizStage = (function (e) {
                  return (
                    (e.introduction = 'introduction'),
                    (e.questionOne = 'question_one'),
                    (e.wrongAnswerQuestionOne = 'wrong_answer_question_one'),
                    (e.rightAnswerQuestionOne = 'right_answer_question_one'),
                    (e.questionTwo = 'question_two'),
                    (e.wrongAnswerQuestionTwo = 'wrong_answer_question_two'),
                    (e.rightAnswerQuestionTwo = 'right_answer_question_two'),
                    e
                  );
                })({});
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/srp-quiz-modal/types.ts' },
    ],
    [
      6284,
      { './step-progress-bar': 6285 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ThreeStepProgressBar', {
                    enumerable: !0,
                    get: function () {
                      return a.ThreeStepProgressBar;
                    },
                  }),
                  Object.defineProperty(n, 'TwoStepProgressBar', {
                    enumerable: !0,
                    get: function () {
                      return a.TwoStepProgressBar;
                    },
                  }),
                  Object.defineProperty(n, 'threeStepStages', {
                    enumerable: !0,
                    get: function () {
                      return a.threeStepStages;
                    },
                  }),
                  Object.defineProperty(n, 'twoStepStages', {
                    enumerable: !0,
                    get: function () {
                      return a.twoStepStages;
                    },
                  });
                var a = e('./step-progress-bar');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/step-progress-bar/index.js' },
    ],
    [
      6285,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../ui/box': 6703,
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
                  (n.ThreeStepProgressBar = p),
                  (n.TwoStepProgressBar = m),
                  (n.twoStepStages = n.threeStepStages = void 0);
                var a = u(e('react')),
                  r = u(e('classnames')),
                  o = u(e('prop-types')),
                  i = e('lodash'),
                  s = e('../../../hooks/useI18nContext'),
                  l = u(e('../../ui/box')),
                  c = e('../../../helpers/constants/design-system');
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
                (n.threeStepStages = {
                  PASSWORD_CREATE: 1,
                  RECOVERY_PHRASE_VIDEO: 2,
                  RECOVERY_PHRASE_REVIEW: 3,
                  RECOVERY_PHRASE_CONFIRM: 4,
                  ONBOARDING_COMPLETE: 5,
                }),
                  (n.twoStepStages = { RECOVERY_PHRASE_CONFIRM: 1, PASSWORD_CREATE: 2 });
                function p({ stage: e, ...t }) {
                  const n = (0, s.useI18nContext)();
                  return a.default.createElement(
                    l.default,
                    t,
                    a.default.createElement(
                      'ul',
                      { className: 'progressbar' },
                      a.default.createElement(
                        'li',
                        { className: (0, r.default)({ active: e >= 1, complete: e > 1 }) },
                        (0, i.capitalize)(n('createPassword'))
                      ),
                      a.default.createElement(
                        'li',
                        { className: (0, r.default)({ active: e >= 2, complete: e > 3 }) },
                        (0, i.capitalize)(n('secureWallet'))
                      ),
                      a.default.createElement(
                        'li',
                        { className: (0, r.default)({ active: e >= 4, complete: e > 5 }) },
                        (0, i.capitalize)(n('confirmRecoveryPhrase'))
                      )
                    )
                  );
                }
                function m({ stage: e, ...t }) {
                  const n = (0, s.useI18nContext)();
                  return a.default.createElement(
                    l.default,
                    d({ width: c.BLOCK_SIZES.FULL }, t),
                    a.default.createElement(
                      'ul',
                      { className: 'progressbar two-steps' },
                      a.default.createElement(
                        'li',
                        { className: (0, r.default)({ active: e >= 1, complete: e > 1 }) },
                        (0, i.capitalize)(n('confirmRecoveryPhrase'))
                      ),
                      a.default.createElement(
                        'li',
                        {
                          className: (0, r.default)('two-steps', {
                            active: e >= 2,
                            complete: e > 2,
                          }),
                        },
                        (0, i.capitalize)(n('createPassword'))
                      )
                    )
                  );
                }
                (p.propTypes = { stage: o.default.number, ...l.default.propTypes }),
                  (m.propTypes = { stage: o.default.number, ...l.default.propTypes });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/step-progress-bar/step-progress-bar.js' },
    ],
    [
      6286,
      { './tab-bar': 6287 },
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
                  r = (a = e('./tab-bar')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/tab-bar/index.js' },
    ],
    [
      6287,
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
                const c = e => {
                  const { tabs: t = [], onSelect: n, isActive: r } = e;
                  return a.default.createElement(
                    'div',
                    { className: 'tab-bar' },
                    t.map(({ key: e, content: t, icon: l }) =>
                      a.default.createElement(
                        i.Box,
                        {
                          as: 'button',
                          key: e,
                          paddingTop: 5,
                          paddingBottom: 5,
                          paddingLeft: 4,
                          paddingRight: 4,
                          className: (0, o.default)('tab-bar__tab pointer', {
                            'tab-bar__tab--active': r(e, t),
                          }),
                          onClick: () => n(e),
                        },
                        r(e, t) &&
                          a.default.createElement(i.Box, {
                            className: 'tab-bar__tab__selected-indicator',
                            borderRadius: s.BorderRadius.pill,
                            backgroundColor: s.Color.primaryDefault,
                            display: [s.Display.None, s.Display.Block],
                          }),
                        a.default.createElement(
                          'div',
                          { className: 'tab-bar__tab__content' },
                          a.default.createElement(
                            'div',
                            { className: 'tab-bar__tab__content__icon' },
                            l
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'tab-bar__tab__content__title' },
                            t
                          )
                        ),
                        a.default.createElement(i.Icon, {
                          name: i.IconName.ArrowRight,
                          size: i.IconSize.Sm,
                          className: 'tab-bar__tab__caret',
                        })
                      )
                    )
                  );
                };
                c.propTypes = {
                  isActive: r.default.func.isRequired,
                  tabs: r.default.array,
                  onSelect: r.default.func,
                };
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/tab-bar/tab-bar.js' },
    ],
    [
      6288,
      { './terms-of-use-popup': 6289 },
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
                  r = (a = e('./terms-of-use-popup')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/terms-of-use-popup/index.js' },
    ],
    [
      6289,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
        '../../ui/popover': 6789,
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
                  r = p(e('prop-types')),
                  o = e('lodash'),
                  i = e('../../../contexts/i18n'),
                  s = p(e('../../ui/popover')),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../component-library'),
                  u = e('../../../../shared/constants/metametrics'),
                  d = e('../../../contexts/metametrics');
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
                function f({ onAccept: e }) {
                  const t = (0, a.useContext)(i.I18nContext),
                    n = (0, a.useContext)(d.MetaMetricsContext),
                    [r, p] = (0, a.useState)(!1),
                    [m, f] = (0, a.useState)(!0),
                    h = (0, a.useRef)(),
                    y = a.default.createRef(),
                    g = (0, o.debounce)(e => {
                      f(e.scrollHeight - e.scrollTop !== e.clientHeight);
                    }, 100);
                  return (
                    (0, a.useEffect)(() => {
                      n({
                        category: u.MetaMetricsEventCategory.Onboarding,
                        event: u.MetaMetricsEventName.TermsOfUseShown,
                        properties: { location: 'Terms Of Use Popover' },
                      });
                    }, []),
                    a.default.createElement(
                      s.default,
                      {
                        className: 'terms-of-use__popover',
                        popoverRef: h,
                        onScroll: e => {
                          g(e.target);
                        },
                        showScrollDown: m,
                        title: t('termsOfUseTitle'),
                        onScrollDownButtonClick: e => {
                          e.stopPropagation(), y.current.scrollIntoView({ behavior: 'smooth' });
                        },
                        footerProps: {
                          justifyContent: l.AlignItems.center,
                          flexDirection: l.FlexDirection.Column,
                        },
                        footer: a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(
                            c.Button,
                            {
                              variant: c.BUTTON_VARIANT.PRIMARY,
                              className: 'terms-of-use__button',
                              onClick: e,
                              disabled: !r,
                              'data-testid': 'terms-of-use-accept-button',
                            },
                            t('accept')
                          ),
                          a.default.createElement(
                            c.Text,
                            {
                              as: 'p',
                              marginTop: 4,
                              className: 'terms-of-use__footer-text',
                              color: l.TextColor.textAlternative,
                            },
                            t('termsOfUseFooterText')
                          )
                        ),
                      },
                      a.default.createElement(
                        c.Box,
                        { className: 'terms-of-use' },
                        a.default.createElement(
                          c.Box,
                          {
                            className: 'terms-of-use__content',
                            marginBottom: 4,
                            marginLeft: 4,
                            marginRight: 4,
                          },
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED IN SECTION 11. PLEASE READ THE AGREEMENT CAREFULLY.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'ConsenSys Software Inc. (“ConsenSys,” “we,” “us,” or “our”) is the leading blockchain software development company. With a focus on utilizing decentralized technologies, such as Ethereum, our software is powering a revolution in commerce and finance and helping to optimize business processes. ConsenSys hosts a top level domain website, www.consensys.io, that serves information regarding ConsenSys and our Offerings, as defined below, as well as sub-domains for our products or services (the top level domain with the sub-domains collectively referred to as the “Site”), which include text, images, audio, code and other materials or third party information. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'These Terms of Use (the “Terms,” “Terms of Use” or “Agreement”) contain the terms and conditions that govern your access to and use of the Site and Offerings provided by us and is an agreement between us and you or the entity you represent (“you” or “your”). Please read these Terms of Use carefully before using the Site or Offerings. By using the Site, clicking a button or checkbox to accept or agree to these Terms where that option is made available, clicking a button to use or access any of the Offerings, completing an Order, or,  if earlier, using or otherwise accessing the Offerings (the date on which any of the events listed above occur being the “Effective Date”), you (1) accept and agree to these Terms and any additional terms, rules and conditions of participation issued by ConsenSys from time to time and (2) consent to the collection, use, disclosure and other handling of information as described in our',
                            ' ',
                            a.default.createElement(
                              c.ButtonLink,
                              {
                                href: 'https://consensys.io/privacy-policy/',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                color: l.Color.primaryDefault,
                                variant: l.TextVariant.bodySm,
                              },
                              'Privacy Policy.'
                            ),
                            ' ',
                            'If you do not agree to the Terms or perform any and all obligations you accept under the Terms, then you may not access or use the Offerings. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'You represent to us that you are lawfully able to enter into contracts. If you are entering into this Agreement for an entity, such as the company you work for, you represent to us that you have legal authority to bind that entity. Please see Section 13 for definitions of certain capitalized terms used in this Agreement.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'In addition, you represent to us that you and your financial institutions, or any party that owns or controls you or your financial institutions, are (1) not subject to sanctions or otherwise designated on any list of prohibited or restricted parties, including but not limited to the lists maintained by the United Nations Security Council, the U.S. Government (i.e., the Specially Designated Nationals List and Foreign Sanctions Evaders List of the U.S. Department of Treasury and the Entity List of the U.S. Department of Commerce), the European Union or its Member States, or other applicable government authority and (2) not located in any country subject to a comprehensive sanctions program implemented by the United States.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '1. The Offerings.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '1.1 Generally. You may access and use the Offerings in accordance with this Agreement. You agree to comply with the terms of this Agreement and all laws, rules and regulations applicable to your use of the Offerings.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '1.2 Offerings and Access. ConsenSys offers a number of products and services, each an “Offering”, under the ConsenSys brand or brands owned by us. These include Codefi, Quorum, Infura, MetaMask and others. Offerings are generally accessed through the Site or through a third party provider of which we approved, such as the Google Play or Apple App Store, unless otherwise agreed in writing. Some Offerings may require you to create an account, enter a valid form of payment, and select a paid plan (a “Paid Plan”), or initiate an Order. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '1.3 Third-Party Content. In certain Offerings, Third-Party Content may be used by you at your election. Third-Party Content is governed by this Agreement and, if applicable, separate terms and conditions accompanying such Third-Party Content, which terms and conditions may include separate fees and charges.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '1.4 Third-Party Offerings. When you use our Offerings, you may also be using the products or services of one or more third parties. Your use of these third party offerings may be subject to the separate policies, terms of use, and fees of these third parties.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '2. Changes.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '2.1 To the Offerings. We may change or discontinue any or all of the Offerings or change or remove functionality of any or all of the Offerings from time to time. We will use commercially reasonable efforts to communicate to you any material change or discontinuation of an Offering through the Site or public communication channels.  If you are on a Paid Plan, we will use commercially reasonable efforts to communicate to you  any material changes to or discontinuation of the Offering at least 30 days in advance of such change, and we will use commercially reasonable efforts to continue supporting the previous version of the Offering for up to three months after the change or discontinuation, except if doing so (a) would pose an information security or intellectual property issue, (b) is economically or technically burdensome, or (c) would create undue risk of us violating the law.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '2.2 To this Agreement. We reserve the right, at our sole discretion, to modify or replace any part of this Agreement or any Policies at any time. It is your responsibility to check this Agreement periodically for changes, but we will also use commercially reasonable efforts to communicate any material changes to this Agreement through the Site or other public channels. Your continued use of or access to the Offerings following the posting of any changes to this Agreement constitutes acceptance of those changes.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '3. Your Responsibilities.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '3.1 Your Accounts.  For those Offerings that require an account, and except to the extent caused by our breach of this Agreement, (a) you are responsible for all activities that occur under your account, regardless of whether the activities are authorized by you or undertaken by you, your employees or a third party (including your contractors, agents or other End Users), and (b) we and our affiliates are not responsible for unauthorized access to your account, including any access that occurred as a result of fraud, phishing, or other criminal activity perpetrated by third parties.  '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '3.2 Your Use. You are responsible for all activities that occur through your use of those Offerings that do not require an account, except to the extent caused by our breach of this Agreement, regardless of whether the activities are authorized by you or undertaken by you, your employees or a third party (including your contractors, agents or other End Users).  We and our affiliates are not responsible for unauthorized access that may occur during your use of the Offerings, including any access that occurred as a result of fraud, phishing, or other criminal activity perpetrated by third parties.  You will ensure that your use of the Offerings does not violate any applicable law.  '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '3.3 Your Security and Backup. You are solely responsible for properly configuring and using the Offerings and otherwise taking appropriate action to secure, protect and backup your accounts and/or Your Content in a manner that will provide appropriate security and protection, which might include use of encryption.  This includes your obligation under this Agreement to record and securely maintain any passwords or backup security phrases (i.e. “seed” phrases) that relate to your use of the Offerings. You acknowledge that you will not share with us nor any other third party any password or backup/seed phrase that relates to your use of the Offerings, and that we will not be held responsible if you do share any such phrase or password.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '3.4 Log-In Credentials and API Authentication. To the extent we provide you with log-in credentials and API authentication generated by the Offerings, such log-in credentials and API authentication are for your use only and you will not sell, transfer or sublicense them to any other entity or person, except that you may disclose your password or private key to your agents and subcontractors performing work on your behalf.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '3.5 Applicability to MetaMask Offerings. For the avoidance of doubt, the terms of this Section 3 are applicable to all Offerings, including MetaMask and any accounts you create through MetaMask with Third Party Offerings, such as decentralized applications, or blockchain-based accounts themselves.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '4. Fees and Payment.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '4.1 Publicly Available Offerings. Some Offerings may be offered to the public and licensed on a royalty free basis, including Offerings that require a Paid Plan for software licensing fees above a certain threshold of use. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '4.2 Offering Fees.  If your use of an Offering does not require an Order or Paid Plan but software licensing fees are charged contemporaneously with your use of the Offering, those fees will be charged as described on the Site or in the user interface of the Offering.  Such fees may be calculated by combining a fee charged by us and a fee charged by a Third Party Offering that provides certain functionality related to the Offering.  For those Offerings which entail an Order or Paid Plan, we calculate and bill fees and charges according to your Order or Paid Plan. For such Offerings, on the first day of each billing period, you will pay us the applicable fees (the “Base Fees”) and any applicable taxes based on the Offerings in the Paid Plan. In addition, we may, for particular Orders, issue an invoice to you for all charges above the applicable threshold for your Paid Plan which constitute overage fees for the previous billing period. If you make any other changes to the Offerings during a billing period (e.g. upgrading or downgrading your Paid Plan), we will apply any additional charges or credits to the next billing period. We may bill you more frequently for fees accrued at our discretion upon notice to you.  You will pay all fees in U.S. dollars unless the particular Offering specifies a different form of payment or otherwise agreed to in writing. All amounts payable by you under this Agreement will be paid to us without setoff or counterclaim, and without any deduction or withholding. Fees and charges for any new Offering or new feature of an Offering will be effective when we use commercially reasonable efforts to communicate updated fees and charges through our Site or other public channels or, if you are on a Paid Plan, upon commercially reasonable efforts to notify you, unless we expressly state otherwise in a notice. We may increase or add new fees and charges for any existing Offerings you are using by using commercially reasonable efforts to notify users of the Offerings through our Site or other public channels or, if you are on a Paid Plan, by giving you at least 30 days’ prior notice.  Unless otherwise specified in an Order, if you are on a Paid Plan, all amounts due under this Agreement are payable within thirty (30) days following receipt of your invoice.  We may elect to charge you interest at the rate of 1.5% per month (or the highest rate permitted by law, if less) on all late payments.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '4.3 Taxes. Each party will be responsible, as required under applicable law, for identifying and paying all taxes and other governmental fees and charges (and any penalties, interest, and other additions thereto) that are imposed on that party upon or with respect to the transactions and payments under this Agreement. All fees payable by you are exclusive taxes unless otherwise noted. We reserve the right to withhold taxes where required.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '5. Temporary Suspension; Limiting API Requests.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '5.1 Generally. We may suspend your right to access or use any portion or all of the Offerings immediately if we determine:'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(a) your use of the Offerings (i) poses a security risk to the Offerings or any third party, (ii) could adversely impact our systems, the Offerings or the systems of any other user, (iii) could subject us, our affiliates, or any third party to liability, or (iv) could be unlawful;'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(b) you are, or any End User is, in breach of this Agreement;'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(c) you are in breach of your payment obligations under Section 4 and such breach continues for 30 days or longer; or'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(d) for entities, you have ceased to operate in the ordinary course, made an assignment for the benefit of creditors or similar disposition of your assets, or become the subject of any bankruptcy, reorganization, liquidation, dissolution or similar proceeding.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '5.2 Effect of Suspension. If we suspend your right to access or use any portion or all of the Offerings:'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(a) you remain responsible for all fees and charges you incur during the period of suspension; and'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(b) you will not be entitled to any fee credits for any period of suspension.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '5.3 Limiting API Requests. If applicable to a particular Offering, we retain sole discretion to limit your usage of the Offerings (including without limitation by limiting the number of API requests you may submit (“API Requests”)) at any time if your usage of the Offerings exceeds the usage threshold specified in your Paid Plan.   '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '6. Term; Termination.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '6.1 Term. For Offerings subject to a Paid Plan, the term of this Agreement will commence on the Effective Date and will remain in effect until terminated under this Section 6. Any notice of termination of this Agreement by either party to the other must include a Termination Date that complies with the notice periods in Section 6.2.  For Offerings that are not subject to a Paid Plan, the term of this Agreement will commence on the Effective Date and will remain in effect until you stop accessing or using the Offerings. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '6.2 Termination.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(a) Termination for Convenience. If you are not on a Paid Plan, you may terminate this Agreement for any reason by ceasing use of the Offering. If you are on a Paid Plan, each party may terminate this Agreement for any reason by giving the other party at least 30 days’ written notice, subject to the provisions in Section 6.2(b).'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(b) Termination for Cause.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(i) By Either Party. Either party may terminate this Agreement for cause if the other party is in material breach of this Agreement and the material breach remains uncured for a period of 30 days from receipt of notice by the other party. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(ii) By Us. We may also terminate this Agreement immediately (A) for cause if we have the right to suspend under Section 5, (B) if our relationship with a third-party partner who provides software or other technology we use to provide the Offerings expires, terminates or requires us to change the way we provide the software or other technology as part of the Offerings, or (C) in order to avoid undue risk of violating the law.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '6.3 Effect of Termination. Upon the Termination Date:'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(i) all your rights under this Agreement immediately terminate; and'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(ii) each party remains responsible for all fees and charges it has incurred through the Termination Date and are responsible for any fees and charges it incurs during the post-termination period;'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(iii) the terms and conditions of this Agreement shall survive the expiration or termination of this Agreement to the full extent necessary for their enforcement and for the protection of the party in whose favor they operate.  For instance, despite this Agreement between you and us terminating, any dispute raised after you stop accessing or using the Offerings will be subject to the applicable provisions of this Agreement if that dispute relates to your prior access or use.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'For any use of the Offerings after the Termination Date, the terms of this Agreement will again apply and, if your use is under a Paid Plan, you will pay the applicable fees at the rates under Section 4.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '7. Proprietary Rights.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '7.1 Your Content. Depending on the Offering, you may share Content with us. Except as provided in this Section 7, we obtain no rights under this Agreement from you (or your licensors) to Your Content. You consent to our use of Your Content to provide the Offerings to you.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '7.2 Offerings License. We or our licensors own all right, title, and interest in and to the Offerings, and all related technology and intellectual property rights. Subject to the terms of this Agreement, we grant you a limited, revocable, non-exclusive, non-sublicensable, non-transferable license to do the following: (a) access and use the Offerings solely in accordance with this Agreement; and (b) copy and use Our Content solely in connection with your permitted use of the Offerings. Except as provided in this Section 7.2, you obtain no rights under this Agreement from us, our affiliates or our licensors to the Offerings, including any related intellectual property rights. Some of Our Content and Third-Party Content may be provided to you under a separate license, such as the Apache License, Version 2.0, or other open source license. In the event of a conflict between this Agreement and any separate license, the separate license will prevail with respect to Our Content or Third-Party Content that is the subject of such separate license.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '7.3 License Restrictions. Neither you nor any End User will use the Offerings in any manner or for any purpose other than as expressly permitted by this Agreement. Except for as authorized, neither you nor any End User will, or will attempt to (a) modify, distribute, alter, tamper with, repair, or otherwise create derivative works of any Content included in the Offerings (except to the extent Content included in the Offerings is provided to you under a separate license that expressly permits the creation of derivative works), (b) reverse engineer, disassemble, or decompile the Offerings or apply any other process or procedure to derive the source code of any software included in the Offerings (except to the extent applicable law doesn’t allow this restriction), (c) access or use the Offerings in a way intended to avoid incurring fees or exceeding usage limits or quotas, (d) use scraping techniques to mine or otherwise scrape data except as permitted by a Plan, or (e) resell or sublicense the Offerings unless otherwise agreed in writing. You will not use Our Marks unless you obtain our prior written consent. You will not misrepresent or embellish the relationship between us and you (including by expressing or implying that we support, sponsor, endorse, or contribute to you or your business endeavors). You will not imply any relationship or affiliation between us and you except as expressly permitted by this Agreement.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '7.4 Suggestions. If you provide any Suggestions to us or our affiliates, we and our affiliates will be entitled to use the Suggestions without restriction. You hereby irrevocably assign to us all right, title, and interest in and to the Suggestions and agree to provide us any assistance we require to document, perfect, and maintain our rights in the Suggestions.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '7.5 U.S. Government Users. If you are a U.S. Government End User, we are licensing the Offerings to you as a “Commercial Item” as that term is defined in the U.S. Code of Federal Regulations (see 48 C.F.R. § 2.101), and the rights we grant you to the Offerings are the same as the rights we grant to all others under these Terms of Use.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '8. Indemnification.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '8.1 General. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(a) You will defend, indemnify, and hold harmless us, our affiliates and licensors, and each of their respective employees, officers, directors, and representatives from and against any Losses arising out of or relating to any claim concerning: (a) breach of this Agreement or violation of applicable law by you; and (b) a dispute between you and any of your customers or users. You will reimburse us for reasonable attorneys’ fees and expenses, associated with claims described in (a) and (b) above.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(b) We will defend, indemnify, and hold harmless you and your employees, officers, directors, and representatives from and against any Losses arising out of or relating to any claim concerning our material and intentional breach of this Agreement.  We will reimburse you for reasonable attorneys’ fees and expenses associated with the claims described in this paragraph.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '8.2 Intellectual Property.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(a) Subject to the limitations in this Section 8, you will defend ConsenSys, its affiliates, and their respective employees, officers, and directors against any third-party claim alleging that any of Your Content infringes or misappropriates that third party’s intellectual property rights, and will pay the amount of any adverse final judgment or settlement.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(b) Subject to the limitations in this Section 8 and the limitations in Section 10, we will defend you and your employees, officers, and directors against any third-party claim alleging that the Offerings infringe or misappropriate that third party’s intellectual property rights, and will pay the amount of any adverse final judgment or settlement.  However, we will not be required to spend more than $200,000 pursuant to this Section 8, including without limitation attorneys’ fees, court costs, settlements, judgments, and reimbursement costs.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(c) Neither party will have obligations or liability under this Section 8.2 arising from infringement by you combining the Offerings with any other product, service, software, data, content or method. In addition, we will have no obligations or liability arising from your use of the Offerings after we have notified you to discontinue such use. The remedies provided in this Section 8.2 are the sole and exclusive remedies for any third-party claims of infringement or misappropriation of intellectual property rights by the Offerings or by Your Content.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '8.3 Process. In no event will a party agree to any settlement of any claim that involves any commitment, other than the payment of money, without the written consent of the other party.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '9. Disclaimers; Risk.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '9.1 DISCLAIMER. THE OFFERINGS ARE PROVIDED “AS IS.” EXCEPT TO THE EXTENT PROHIBITED BY LAW, OR TO THE EXTENT ANY STATUTORY RIGHTS APPLY THAT CANNOT BE EXCLUDED, LIMITED OR WAIVED, WE AND OUR AFFILIATES AND LICENSORS (A) MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE REGARDING THE OFFERINGS OR THE THIRD-PARTY CONTENT, AND (B) DISCLAIM ALL WARRANTIES, INCLUDING ANY IMPLIED OR EXPRESS WARRANTIES (I) OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR QUIET ENJOYMENT, (II) ARISING OUT OF ANY COURSE OF DEALING OR USAGE OF TRADE, (III) THAT THE OFFERINGS OR THIRD-PARTY CONTENT WILL BE UNINTERRUPTED, ERROR FREE OR FREE OF HARMFUL COMPONENTS, AND (IV) THAT ANY CONTENT WILL BE SECURE OR NOT OTHERWISE LOST OR ALTERED.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '9.2 RISKS. OUR OFFERINGS RELY ON EMERGING TECHNOLOGIES, SUCH AS ETHEREUM. SOME OFFERINGS ARE SUBJECT TO INCREASED RISK THROUGH YOUR POTENTIAL MISUSE OF THINGS SUCH AS PUBLIC/PRIVATE KEY CRYPTOGRAPHY, OR FAILING TO PROPERLY UPDATE OR RUN SOFTWARE TO ACCOMMODATE PROTOCOL UPGRADES, LIKE THE TRANSITION TO PROOF OF STAKE CONSENSUS. BY USING THE OFFERINGS YOU EXPLICITLY ACKNOWLEDGE AND ACCEPT THESE HEIGHTENED RISKS.  YOU REPRESENT THAT YOU ARE FINANCIALLY AND TECHNICALLY SOPHISTICATED ENOUGH TO UNDERSTAND THE INHERENT RISKS ASSOCIATED WITH USING CRYPTOGRAPHIC AND BLOCKCHAIN-BASED SYSTEMS AND UPGRADING YOUR SOFTWARE AND PROCESSES TO ACCOMMODATE PROTOCOL UPGRADES, AND THAT YOU HAVE A WORKING KNOWLEDGE OF THE USAGE AND INTRICACIES OF DIGITAL ASSETS SUCH AS ETHER (ETH) AND OTHER DIGITAL TOKENS, SUCH AS THOSE FOLLOWING THE ERC-20 TOKEN STANDARD.  IN PARTICULAR, YOU UNDERSTAND THAT WE DO NOT OPERATE THE ETHEREUM PROTOCOL OR ANY OTHER BLOCKCHAIN PROTOCOL, COMMUNICATE OR EXECUTE PROTOCOL UPGRADES, OR APPROVE OR PROCESS BLOCKCHAIN TRANSACTIONS ON BEHALF OF YOU.  YOU FURTHER UNDERSTAND THAT BLOCKCHAIN PROTOCOLS PRESENT THEIR OWN RISKS OF USE, THAT SUPPORTING OR PARTICIPATING IN THE PROTOCOL MAY RESULT IN LOSSES IF YOUR PARTICIPATION VIOLATES CERTAIN PROTOCOL RULES, THAT  BLOCKCHAIN-BASED TRANSACTIONS ARE IRREVERSIBLE, THAT YOUR PRIVATE KEY AND BACKUP SEED PHRASE MUST BE KEPT SECRET AT ALL TIMES, THAT CONSENSYS WILL NOT STORE A BACKUP OF, NOR WILL BE ABLE TO DISCOVER OR RECOVER, YOUR PRIVATE KEY OR BACKUP SEED PHRASE, AND THAT YOU ARE SOLELY RESPONSIBLE FOR ANY APPROVALS OR PERMISSIONS YOU PROVIDE BY CRYPTOGRAPHICALLY SIGNING BLOCKCHAIN MESSAGES OR TRANSACTIONS.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'YOU FURTHER UNDERSTAND AND ACCEPT THAT DIGITAL TOKENS PRESENT MARKET VOLATILITY RISK, TECHNICAL SOFTWARE RISKS, REGULATORY RISKS, AND CYBERSECURITY RISKS.  YOU UNDERSTAND THAT THE COST AND SPEED OF A BLOCKCHAIN-BASED SYSTEM IS VARIABLE, THAT COST MAY INCREASE DRAMATICALLY AT ANY TIME, AND THAT COST AND SPEED IS NOT WITHIN THE CAPABILITY OF CONSENSYS TO CONTROL.  YOU UNDERSTAND THAT PROTOCOL UPGRADES MAY INADVERTENTLY CONTAIN BUGS OR SECURITY VULNERABILITIES THAT MAY RESULT IN LOSS OF FUNCTIONALITY AND ULTIMATELY FUNDS.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'YOU UNDERSTAND AND ACCEPT THAT CONSENSYS DOES NOT CONTROL ANY BLOCKCHAIN PROTOCOL, NOR DOES CONSENSYS CONTROL ANY SMART CONTRACT THAT IS NOT OTHERWISE OFFERED BY CONSENSYS AS PART OF THE OFFERINGS.  YOU UNDERSTAND AND ACCEPT THAT CONSENSYS DOES NOT CONTROL AND IS NOT RESPONSIBLE FOR THE TRANSITION OF ANY BLOCKCHAIN PROTOCOL FROM PROOF OF WORK TO PROOF OF STAKE CONSENSUS.  YOU AGREE THAT YOU ALONE, AND NOT CONSENSYS, IS RESPONSIBLE FOR ANY TRANSACTIONS THAT YOU ENGAGE IN WITH REGARD TO SUPPORTING ANY BLOCKCHAIN PROTOCOL WHETHER THROUGH TRANSACTION VALIDATION OR OTHERWISE, OR ANY TRANSACTIONS THAT YOU ENGAGE IN WITHANY THIRD-PARTY-DEVELOPED SMART CONTRACT OR TOKEN, INCLUDING TOKENS THAT WERE CREATED BY A THIRD PARTY FOR THE PURPOSE OF FRAUDULENTLY MISREPRESENTING AFFILIATION WITH ANY BLOCKCHAIN PROJECT.  YOU AGREE THAT CONSENSYS IS NOT RESPONSIBLE FOR THE REGULATORY STATUS OR TREATMENT OF ANY DIGITAL ASSETS THAT YOU MAY ACCESS OR TRANSACT WITH USING CONSENSYS OFFERINGS.  YOU EXPRESSLY ASSUME FULL RESPONSIBILITY FOR ALL OF THE RISKS OF ACCESSING AND USING THE OFFERINGS TO INTERACT WITH BLOCKCHAIN PROTOCOLS. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '10. Limitations of Liability.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '10.1 Limitation of Liability. WITH THE EXCEPTION OF CLAIMS RELATING TO A BREACH OF OUR PROPRIETARY RIGHTS AS GOVERNED BY SECTION 7 AND INTELLECTUAL PROPERTY CLAIMS AS GOVERNED BY SECTION 8, IN NO EVENT SHALL THE AGGREGATE LIABILITY OF EACH PARTY TOGETHER WITH ALL OF ITS AFFILIATES ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL AMOUNT PAID BY YOU HEREUNDER FOR THE OFFERINGS GIVING RISE TO THE LIABILITY IN THE TWELVE MONTHS PRECEDING THE FIRST INCIDENT OUT OF WHICH THE LIABILITY AROSE, OR, IF NO FEES HAVE BEEN PAID, $25,000. THE FOREGOING LIMITATION WILL APPLY WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY, BUT WILL NOT LIMIT YOUR PAYMENT OBLIGATIONS UNDER SECTION 4. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '10.2 Exclusion of Consequential and Related Damages. IN NO EVENT WILL EITHER PARTY OR ITS AFFILIATES HAVE ANY LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT FOR ANY LOST PROFITS, REVENUES, GOODWILL, OR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, COVER, BUSINESS INTERRUPTION OR PUNITIVE DAMAGES, WHETHER AN ACTION IS IN CONTRACT OR TORT AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF A PARTY OR ITS AFFILIATES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR IF A PARTY’S OR ITS AFFILIATES’ REMEDY OTHERWISE FAILS OF ITS ESSENTIAL PURPOSE. THE FOREGOING DISCLAIMER WILL NOT APPLY TO THE EXTENT PROHIBITED BY LAW.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '11. Binding Arbitration and Class Action Waiver.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'PLEASE READ THIS SECTION CAREFULLY – IT MAY SIGNIFICANTLY AFFECT YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '11.1 Binding Arbitration. Any dispute, claim or controversy (“Claim”) relating in any way to this Agreement, the Site, or your use of the Offerings will be resolved by binding arbitration as provided in this Section 11, rather than in court, except that you may assert claims in small claims court if your claims qualify.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '11.1.1 If you are located in the United States: This agreement and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the laws of the State of New York. The Federal Arbitration Act and federal arbitration law apply to this Agreement. There is no judge or jury in arbitration, and court review of an arbitration award is limited. However, an arbitrator can award on an individual basis the same damages and relief as a court (including injunctive and declaratory relief or statutory damages), and must follow the terms of this Agreement as a court would. The arbitration will be conducted in accordance with the expedited procedures set forth in the JAMS Comprehensive Arbitration Rules and Procedures (the “Rules”) as those Rules exist on the effective date of this Agreement, including Rules 16.1 and 16.2 of those Rules. The arbitrator’s decision shall be final, binding, and non-appealable. Judgment upon the award may be entered and enforced in any court having jurisdiction. Neither party shall sue the other party other than as provided herein or for enforcement of this clause or of the arbitrator’s award; any such suit may be brought only in a Federal District Court or a New York state court located in New York County, New York. The arbitrator, and not any federal, state, or local court, shall have exclusive authority to resolve any dispute relating to the interpretation, applicability, unconscionability, arbitrability, enforceability, or formation of this Agreement including any claim that all or any part of the Agreement is void or voidable.  If for any reason a claim proceeds in court rather than in arbitration we and you waive any right to a jury trial. Notwithstanding the foregoing we and you both agree that you or we may bring suit in court to enjoin infringement or other misuse of intellectual property rights. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '11.1.2 If you are located in the United Kingdom: This agreement and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the law of England and Wales. Any dispute, claim or controversy relating in any way to this Agreement, the Offerings, your use of the Offerings, or to any products or services licensed or distributed by us will be resolved by binding arbitration as provided in this clause. Prior to commencing any formal arbitration proceedings, parties shall first seek settlement of any claim by mediation in accordance with the LCIA Mediation Rules, which Rules are deemed to be incorporated by reference into this clause. If the dispute is not settled by mediation within 14 days of the commencement of the mediation, or such further period as the parties shall agree in writing, the dispute shall be referred to and finally resolved by arbitration under the LCIA Rules, which are deemed to be incorporated by reference into this clause. The language to be used in the mediation and in the arbitration shall be English. The seat or legal place of arbitration shall be London.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '11.1.3 If you are located in any territory that is not specifically enumerated in Sections 11.1.1 or 11.1.2, you may elect for either of Section 11.1.1 or 11.1.2 to apply to you, otherwise this Agreement and any Claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the law of Ireland. Any Claim relating in any way to this Agreement, the Offerings, your use of the Offerings, or to any products or services licensed or distributed by us will be resolved by binding arbitration as provided in this clause. Prior to commencing any formal arbitration proceedings, parties shall first seek settlement of any claim by mediation in accordance with the LCIA Mediation Rules, which Rules are deemed to be incorporated by reference into this clause. If the dispute is not settled by mediation within 14 days of the commencement of the mediation, or such further period as the parties shall agree in writing, the Claim shall be referred to and finally resolved by arbitration under the LCIA Rules, which are deemed to be incorporated by reference into this clause. The language to be used in the mediation and in the arbitration shall be English. The seat or legal place of arbitration shall be Dublin, Ireland.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '11.2 Class Action Waiver. YOU AND WE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. YOU AND WE EXPRESSLY WAIVE ANY RIGHT TO FILE A CLASS ACTION OR SEEK RELIEF ON A CLASS BASIS. Unless both you and we agree, no arbitrator or judge may consolidate more than one person’s claims or otherwise preside over any form of a representative or class proceeding. The arbitrator may award injunctive relief only in favor of the individual party seeking relief and only to the extent necessary to provide relief warranted by that party’s individual claim. If a court decides that applicable law precludes enforcement of any of this paragraph’s limitations as to a particular claim for relief, then that claim (and only that claim) must be severed from the arbitration and may be brought in court. If any court or arbitrator determines that the class action waiver set forth in this paragraph is void or unenforceable for any reason or that an arbitration can proceed on a class basis, then the arbitration provision set forth above shall be deemed null and void in its entirety and the parties shall be deemed to have not agreed to arbitrate disputes.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '11.3 30-Day Right to Opt Out. You have the right to opt-out and not be bound by the arbitration and class action waiver provisions set forth above by sending written notice of your decision to opt-out to the email address notices@consensys.net with subject line LEGAL OPT OUT. The notice must be sent within 30 days of your first use of the Offerings, otherwise you shall be bound to arbitrate disputes and will be deemed to have agreed to waive any right to pursue a class action in accordance with the terms of those paragraphs. If you opt-out of these provisions, we will also not be bound by them.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '12. Miscellaneous.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.1 Assignment. You will not assign or otherwise transfer this Agreement or any of your rights and obligations under this Agreement, without our prior written consent. Any assignment or transfer in violation of this Section 12.1 will be void. We may assign this Agreement without your consent (a) in connection with a merger, acquisition or sale of all or substantially all of our assets, or (b) to any Affiliate or as part of a corporate reorganization; and effective upon such assignment, the assignee is deemed substituted for us as a party to this Agreement and we are fully released from all of our obligations and duties to perform under this Agreement. Subject to the foregoing, this Agreement will be binding upon, and inure to the benefit of the parties and their respective permitted successors and assigns.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.2 DAOs. As a blockchain native company, we may interact with and provide certain Offerings to DAOs. Due to the unique nature of DAOs, to the extent the DAO votes in favor of and/or accepts such Offerings from ConsenSys, the DAO has acknowledged and agreed to these Terms in their entirety.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.2 Entire Agreement and Modifications. This Agreement incorporates the Policies by reference and is the entire agreement between you and us regarding the subject matter of this Agreement. If the terms of this document are inconsistent with the terms contained in any Policy, the terms contained in this document will control. Any modification to the terms of this Agreement may only be made in writing.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.3 Force Majeure. Neither party nor their respective affiliates will be liable for any delay or failure to perform any obligation under this Agreement where the delay or failure results from any cause beyond such party’s reasonable control, including but not limited to acts of God, utilities or other telecommunications failures, cyber attacks, earthquake, storms or other elements of nature, pandemics, blockages, embargoes, riots, acts or orders of government, acts of terrorism, or war.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.4 Export and Sanctions Compliance. In connection with this Agreement, you will comply with all applicable import, re-import, sanctions, anti-boycott, export, and re-export control laws and regulations, including all such laws and regulations that may apply. For clarity, you are solely responsible for compliance related to the manner in which you choose to use the Offerings. You may not use any Offering if you are the subject of U.S. sanctions or of sanctions consistent with U.S. law imposed by the governments of the country where you are using the Offering. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.5 Independent Contractors; Non-Exclusive Rights. We and you are independent contractors, and this Agreement will not be construed to create a partnership, joint venture, agency, or employment relationship. Neither party, nor any of their respective affiliates, is an agent of the other for any purpose or has the authority to bind the other. Both parties reserve the right (a) to develop or have developed for it products, services, concepts, systems, or techniques that are similar to or compete with the products, services, concepts, systems, or techniques developed or contemplated by the other party, and (b) to assist third party developers or systems integrators who may offer products or services which compete with the other party’s products or services.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.6 Eligibility. If you are under the age of majority in your jurisdiction of residence, you may use the Site or Offerings only with the consent of or under the supervision of your parent or legal guardian.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'NOTICE TO PARENTS AND GUARDIANS: By granting your minor permission to access the Site or Offerings, you agree to these Terms of Use on behalf of your minor. You are responsible for exercising supervision over your minor’s online activities. If you do not agree to these Terms of Use, do not let your minor use the Site or Offerings.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.7 Language. All communications and notices made or given pursuant to this Agreement must be in the English language. If we provide a translation of the English language version of this Agreement, the English language version of the Agreement will control if there is any conflict.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.8 Notice.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(a) To You. We may provide any notice to you under this Agreement using commercially reasonable means, including: (i) posting a notice on the Site; (ii) sending a message to the email address then associated with your account; or (iii) using public communication channels . Notices we provide by posting on the Site or using public communication channels will be effective upon posting, and notices we provide by email will be effective when we send the email. It is your responsibility to keep your email address current to the extent you have an account. You will be deemed to have received any email sent to the email address then associated with your account when we send the email, whether or not you actually receive the email.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '(b) To Us. To give us notice under this Agreement, you must contact us by email at notices@consensys.net. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.9 No Third-Party Beneficiaries. Except as otherwise set forth herein, this Agreement does not create any third-party beneficiary rights in any individual or entity that is not a party to this Agreement.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.10 No Waivers. The failure by us to enforce any provision of this Agreement will not constitute a present or future waiver of such provision nor limit our right to enforce such provision at a later time. All waivers by us must be in writing to be effective.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.11 Severability. If any portion of this Agreement is held to be invalid or unenforceable, the remaining portions of this Agreement will remain in full force and effect. Any invalid or unenforceable portions will be interpreted to effect and intent of the original portion. If such construction is not possible, the invalid or unenforceable portion will be severed from this Agreement but the rest of the Agreement will remain in full force and effect.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '12.12 Notice and Procedure for Making Claims of Copyright Infringement. If you are a copyright owner or agent of the owner, and you believe that your copyright or the copyright of a person on whose behalf you are authorized to act has been infringed, please provide us a written notice at the address below with the following information:'
                          ),
                          a.default.createElement(
                            c.Box,
                            { as: 'ol', marginLeft: 4, className: 'terms-of-use__terms-list' },
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'a description of the copyrighted work or other intellectual property that you claim has been infringed;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'a description of where the material that you claim is infringing is located with respect to the Offerings;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'your address, telephone number, and email address;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner’s behalf.'
                            )
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'You can reach us at:'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'Email: notices@consensys.net'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'Subject Line: Copyright Notification Mail'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'Attention: Copyright ℅'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            'ConsenSys Software Inc. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '49 Bogart Street Suite 22 Brooklyn, NY 11206'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodyLgMedium, marginBottom: 4 },
                            '13. Definitions.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Acceptable Use Policy” means the policy set forth below, as it may be updated by us from time to time. You agree not to, and not to allow third parties to, use the Offerings:'
                          ),
                          a.default.createElement(
                            c.Box,
                            { as: 'ol', marginLeft: 4, className: 'terms-of-use__terms-list' },
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to violate, or encourage the violation of, the legal rights of others (for example, this may include allowing End Users to infringe or misappropriate the intellectual property rights of others in violation of the Digital Millennium Copyright Act);'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to engage in, promote or encourage any illegal or infringing content;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'for any unlawful, invasive, infringing, defamatory or fraudulent purpose (for example, this may include phishing, creating a pyramid scheme or mirroring a website);'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to intentionally distribute viruses, worms, Trojan horses, corrupted files, hoaxes, or other items of a destructive or deceptive nature;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to interfere with the use of the Offerings, or the equipment used to provide the Offerings, by customers, authorized resellers, or other authorized users;'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to disable, interfere with or circumvent any aspect of the Offerings (for example, any thresholds or limits);'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to generate, distribute, publish or facilitate unsolicited mass email, promotions, advertising or other solicitation; or'
                            ),
                            a.default.createElement(
                              c.Text,
                              { as: 'li', variant: l.TextVariant.bodySm, marginBottom: 2 },
                              'to use the Offerings, or any interfaces provided with the Offerings, to access any other product or service in a manner that violates the terms of service of such other product or service.'
                            )
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“API” means an application program interface.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“API Requests” has the meaning set forth in Section 5.3.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Applicable Threshold” has the meaning set forth in Section 4.2.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Base Fees” has the meaning set forth in Section 4.2.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Content” means any data, text, audio, video or images, software (including machine images), and any documentation.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“DAO” means Decentralized Autonomous Organization.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“End User” means any individual or entity that directly or indirectly through another user: (a) accesses or uses Your Content; or (b) otherwise accesses or uses the Offerings under your account. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Fees” has the meaning set forth in Section 4.2.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Losses” means any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees).’'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Our Content” means any software (including machine images), data, text, audio, video, images, or documentation that we offer in connection with the Offerings. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Our Marks” means any trademarks, service marks, service or trade names, logos, and other designations of ConsenSys Software Inc. and their affiliates or licensors that we may make available to you in connection with this Agreement.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Order” means an order for Offerings executed through an order form directly with ConsenSys, or through a cloud vendor, such as Amazon Web Services, Microsoft Azure, or Google Cloud.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Offerings” means each of the products and services, including but not limited to Codefi, Infura, MetaMask, Quorum and any other features, tools, materials, or services offered from time to time, by us or our affiliates. '
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Policies” means the Acceptable Use Policy, Privacy Policy, any supplemental policies or addendums applicable to any Service as provided to you, and any other policy or terms referenced in or incorporated into this Agreement, each as may be updated by us from time to time.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Privacy Policy” means the privacy policy located at',
                            ' ',
                            a.default.createElement(
                              c.ButtonLink,
                              {
                                href: 'https://consensys.io/privacy-policy',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                color: l.Color.primaryDefault,
                                variant: l.TextVariant.bodySm,
                              },
                              'https://consensys.io/privacy-policy'
                            ),
                            ' ',
                            '(and any successor or related locations designated by us), as it may be updated by us from time to time.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Service Offerings” means the Services (including associated APIs), Our Content, Our Marks, and any other product or service provided by us under this Agreement. Service Offerings do not include Third-Party Content or Third-Party Services.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Suggestions” means all suggested improvements to the Service Offerings that you provide to us..'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Term” means the term of this Agreement described in Section 6.1.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Termination Date” means the effective date of termination provided in accordance with Section 6, in a notice from one party to the other.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Third-Party Content” means Content made available to you by any third party on the Site or in conjunction with the Offerings.'
                          ),
                          a.default.createElement(
                            c.Text,
                            { variant: l.TextVariant.bodySm, marginBottom: 4 },
                            '“Your Content” means content that you or any End User transfers to us, storage or hosting by the Offerings in connection with account and any computational results that you or any End User derive from the foregoing through their use of the Offerings, excluding however any information submitted to a blockchain protocol for processing. '
                          ),
                          a.default.createElement(
                            c.Box,
                            {
                              flexDirection: l.FlexDirection.Row,
                              alignItems: l.AlignItems.flexStart,
                              marginLeft: 3,
                              marginRight: 3,
                              gap: 2,
                            },
                            a.default.createElement(c.Checkbox, {
                              id: 'terms-of-use__checkbox',
                              className: 'terms-of-use__checkbox',
                              'data-testid': 'terms-of-use-checkbox',
                              isChecked: r,
                              onChange: () => {
                                p(!r);
                              },
                              label: t('termsOfUseAgreeText'),
                              ref: y,
                            })
                          )
                        )
                      )
                    )
                  );
                }
                f.propTypes = { onAccept: r.default.func.isRequired };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/terms-of-use-popup/terms-of-use-popup.js' },
    ],
    [
      6290,
      {
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/privacy-policy': 6877,
        '../../../helpers/constants/survey': 6883,
        '../../../selectors': 7601,
        './utils': 6292,
        '@metamask/keyring-api': 2014,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.selectNewSrpAdded = function (e) {
                    return Boolean(e.appState.showNewSrpAddedToast);
                  }),
                  (n.selectNftDetectionEnablementToast = function (e) {
                    var t;
                    return Boolean(
                      null === (t = e.appState) || void 0 === t
                        ? void 0
                        : t.showNftDetectionEnablementToast
                    );
                  }),
                  (n.selectShowConnectAccountToast = function (e, t) {
                    var n;
                    const o = (0, r.getAlertEnabledness)(e).unconnectedAccount,
                      i = (0, s.getPermittedEVMAccountsForCurrentTab)(e),
                      l = (0, a.isEvmAccountType)(null == t ? void 0 : t.type);
                    return (
                      o &&
                      t &&
                      (null === (n = e.activeTab) || void 0 === n ? void 0 : n.origin) &&
                      l &&
                      i.length > 0 &&
                      !i.some(e => e === t.address)
                    );
                  }),
                  (n.selectShowPrivacyPolicyToast = function (e) {
                    const {
                        newPrivacyPolicyToastClickedOrClosed: t,
                        newPrivacyPolicyToastShownDate: n,
                        onboardingDate: a,
                      } = e.metamask || {},
                      r = new Date(o.PRIVACY_POLICY_DATE),
                      i = new Date(Date.now());
                    return {
                      showPrivacyPolicyToast:
                        !t &&
                        i >= r &&
                        (0, l.getIsPrivacyToastRecent)(n) &&
                        (!a || a < r.valueOf()),
                      newPrivacyPolicyToastShownDate: n,
                    };
                  }),
                  (n.selectShowSurveyToast = function (e) {
                    var t;
                    if (
                      null !== (t = e.metamask) &&
                      void 0 !== t &&
                      t.surveyLinkLastClickedOrClosed
                    )
                      return !1;
                    const n = new Date(`${i.SURVEY_DATE} ${i.SURVEY_START_TIME}`).getTime(),
                      a = new Date(`${i.SURVEY_DATE} ${i.SURVEY_END_TIME}`).getTime(),
                      r = Date.now();
                    return r > n && r < a;
                  }),
                  (n.selectSwitchedNetworkNeverShowMessage = function (e) {
                    return Boolean(e.metamask.switchedNetworkNeverShowMessage);
                  });
                var a = e('@metamask/keyring-api'),
                  r = e('../../../ducks/metamask/metamask'),
                  o = e('../../../helpers/constants/privacy-policy'),
                  i = e('../../../helpers/constants/survey'),
                  s = e('../../../selectors'),
                  l = e('./utils');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/toast-master/selectors.ts' },
    ],
    [
      6291,
      {
        '../../../../shared/constants/time': 5817,
        '../../../../shared/lib/ui-utils': 5852,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/usePrevious': 7002,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../multichain': 6574,
        '../../ui/survey-toast': 6804,
        './selectors': 6290,
        './utils': 6292,
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
                  (n.ToastMaster = function () {
                    const e = (0, o.useLocation)(),
                      t = e.pathname === c.DEFAULT_ROUTE,
                      n = e.pathname === c.SEND_ROUTE,
                      r = e.pathname === c.SWAPS_ROUTE || e.pathname === c.PREPARE_SWAP_ROUTE,
                      i = e.pathname === `${c.CROSS_CHAIN_SWAP_ROUTE}${c.PREPARE_SWAP_ROUTE}`;
                    if (t)
                      return a.default.createElement(
                        y.ToastContainer,
                        null,
                        a.default.createElement(g.SurveyToast, null),
                        a.default.createElement(E, null),
                        a.default.createElement(w, null),
                        a.default.createElement(S, null),
                        a.default.createElement(x, null),
                        a.default.createElement(C, null),
                        a.default.createElement(k, null),
                        a.default.createElement(_, null)
                      );
                    if (n || r || i)
                      return a.default.createElement(
                        y.ToastContainer,
                        null,
                        a.default.createElement(x, null)
                      );
                    return null;
                  });
                var a = (function (e, t) {
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
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  i = e('../../../../shared/constants/time'),
                  s = e('../../../../shared/lib/ui-utils'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../helpers/constants/routes'),
                  u = e('../../../helpers/utils/util'),
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../hooks/usePrevious'),
                  m = e('../../../selectors'),
                  f = e('../../../store/actions'),
                  h = e('../../component-library'),
                  y = e('../../multichain'),
                  g = e('../../ui/survey-toast'),
                  b = e('./selectors'),
                  v = e('./utils');
                function T(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (T = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function E() {
                  var e;
                  const t = (0, d.useI18nContext)(),
                    n = (0, r.useDispatch)(),
                    [o, s] = (0, a.useState)(!1),
                    c = (0, r.useSelector)(m.getSelectedAccount),
                    g = (0, p.usePrevious)(null == c ? void 0 : c.address);
                  (null == c ? void 0 : c.address) !== g && o && s(!1);
                  const v = (0, r.useSelector)(e => (0, b.selectShowConnectAccountToast)(e, c)),
                    T = (0, r.useSelector)(m.getOriginOfCurrentTab);
                  return (
                    Boolean(!o && v) &&
                    a.default.createElement(y.Toast, {
                      dataTestId: 'connect-account-toast',
                      key: 'connect-account-toast',
                      startAdornment: a.default.createElement(h.AvatarAccount, {
                        address: c.address,
                        size: h.AvatarAccountSize.Md,
                        borderColor: l.BorderColor.transparent,
                      }),
                      text: t('accountIsntConnectedToastText', [
                        null == c || null === (e = c.metadata) || void 0 === e ? void 0 : e.name,
                        (0, u.getURLHost)(T),
                      ]),
                      actionText: t('connectAccount'),
                      onActionClick: () => {
                        n((0, f.addPermittedAccount)(T, c.address)),
                          setTimeout(() => {
                            var e;
                            null ===
                              (e = document.querySelector(
                                '[data-testid="connection-menu"] [data-tooltipped]'
                              )) ||
                              void 0 === e ||
                              e.dispatchEvent(new CustomEvent('mouseenter', {}));
                          }, 250 * i.MILLISECOND);
                      },
                      onClose: () => s(!0),
                    })
                  );
                }
                function w() {
                  const e = (0, d.useI18nContext)();
                  return (
                    (0, r.useSelector)(b.selectShowSurveyToast) &&
                    a.default.createElement(y.Toast, {
                      key: 'survey-toast',
                      startAdornment: a.default.createElement(h.Icon, {
                        name: h.IconName.Heart,
                        color: l.IconColor.errorDefault,
                      }),
                      text: e('surveyTitle'),
                      actionText: e('surveyConversion'),
                      onActionClick: () => {
                        global.platform.openTab({ url: s.SURVEY_LINK }),
                          (0, v.setSurveyLinkLastClickedOrClosed)(Date.now());
                      },
                      onClose: () => {
                        (0, v.setSurveyLinkLastClickedOrClosed)(Date.now());
                      },
                    })
                  );
                }
                function S() {
                  const e = (0, d.useI18nContext)(),
                    { showPrivacyPolicyToast: t, newPrivacyPolicyToastShownDate: n } = (0,
                    r.useSelector)(b.selectShowPrivacyPolicyToast);
                  return (
                    t && !n && (0, v.setNewPrivacyPolicyToastShownDate)(Date.now()),
                    t &&
                      a.default.createElement(y.Toast, {
                        key: 'privacy-policy-toast',
                        startAdornment: a.default.createElement(h.Icon, {
                          name: h.IconName.Info,
                          color: l.IconColor.iconDefault,
                        }),
                        text: e('newPrivacyPolicyTitle'),
                        actionText: e('newPrivacyPolicyActionButton'),
                        onActionClick: () => {
                          global.platform.openTab({ url: s.PRIVACY_POLICY_LINK }),
                            (0, v.setNewPrivacyPolicyToastClickedOrClosed)();
                        },
                        onClose: v.setNewPrivacyPolicyToastClickedOrClosed,
                      })
                  );
                }
                function x() {
                  const e = (0, d.useI18nContext)(),
                    t = (0, r.useDispatch)(),
                    n = (0, r.useSelector)(m.getSwitchedNetworkDetails),
                    o = (0, r.useSelector)(b.selectSwitchedNetworkNeverShowMessage),
                    i = n && !o,
                    s = Boolean(null == n ? void 0 : n.origin);
                  return (
                    i &&
                    a.default.createElement(y.Toast, {
                      key: 'switched-network-toast',
                      startAdornment: a.default.createElement(h.AvatarNetwork, {
                        size: h.AvatarAccountSize.Md,
                        borderColor: l.BorderColor.transparent,
                        src: (null == n ? void 0 : n.imageUrl) || '',
                        name: null == n ? void 0 : n.nickname,
                      }),
                      text: s
                        ? e('switchedNetworkToastMessage', [
                            n.nickname,
                            (0, u.getURLHost)(n.origin),
                          ])
                        : e('switchedNetworkToastMessageNoOrigin', [n.nickname]),
                      actionText: e('switchedNetworkToastDecline'),
                      onActionClick: v.setSwitchedNetworkNeverShowMessage,
                      onClose: () => t((0, f.clearSwitchedNetworkDetails)()),
                    })
                  );
                }
                function C() {
                  const e = (0, d.useI18nContext)(),
                    t = (0, r.useDispatch)(),
                    n = (0, r.useSelector)(b.selectNftDetectionEnablementToast),
                    o = (0, r.useSelector)(m.getUseNftDetection),
                    s = 5 * i.SECOND;
                  return (
                    n &&
                    o &&
                    a.default.createElement(y.Toast, {
                      key: 'enabled-nft-auto-detection',
                      startAdornment: a.default.createElement(h.Icon, {
                        name: h.IconName.CheckBold,
                        color: l.IconColor.iconDefault,
                      }),
                      text: e('nftAutoDetectionEnabled'),
                      borderRadius: l.BorderRadius.LG,
                      textVariant: l.TextVariant.bodyMd,
                      autoHideTime: s,
                      onAutoHideToast: () => t((0, v.setShowNftDetectionEnablementToast)(!1)),
                    })
                  );
                }
                function k() {
                  const e = (0, d.useI18nContext)(),
                    t = (0, r.useDispatch)(),
                    n = (0, r.useSelector)(e => e.appState.showPermittedNetworkToastOpen),
                    i = (0, r.useSelector)(m.getCurrentNetwork),
                    s = (0, r.useSelector)(m.getOriginOfCurrentTab),
                    p = encodeURIComponent(s),
                    g = (0, o.useHistory)();
                  return (
                    n &&
                    a.default.createElement(y.Toast, {
                      key: 'switched-permitted-network-toast',
                      startAdornment: a.default.createElement(h.AvatarNetwork, {
                        size: h.AvatarAccountSize.Md,
                        borderColor: l.BorderColor.transparent,
                        src: (null == i ? void 0 : i.rpcPrefs.imageUrl) || '',
                        name: null == i ? void 0 : i.nickname,
                      }),
                      text: e('permittedChainToastUpdate', [
                        (0, u.getURLHost)(s),
                        null == i ? void 0 : i.nickname,
                      ]),
                      actionText: e('editPermissions'),
                      onActionClick: () => {
                        t((0, f.hidePermittedNetworkToast)()),
                          g.push(`${c.REVIEW_PERMISSIONS}/${p}`);
                      },
                      onClose: () => t((0, f.hidePermittedNetworkToast)()),
                    })
                  );
                }
                function _() {
                  const e = (0, d.useI18nContext)(),
                    t = (0, r.useDispatch)(),
                    n = (0, r.useSelector)(b.selectNewSrpAdded),
                    o = 5 * i.SECOND,
                    s = (0, r.useSelector)(m.getMetaMaskHdKeyrings).length;
                  return (
                    (0, a.useEffect)(() => {
                      const e = e => {
                        const n = document.querySelector('[data-testid="account-menu-icon"]');
                        n && n.contains(e.target) && t((0, v.setShowNewSrpAddedToast)(!1));
                      };
                      return (
                        document.addEventListener('mousedown', e),
                        () => {
                          document.removeEventListener('mousedown', e);
                        }
                      );
                    }, [t]),
                    n &&
                      a.default.createElement(y.Toast, {
                        key: 'new-srp-added-toast',
                        text: e('importWalletSuccess', [s]),
                        startAdornment: a.default.createElement(h.Icon, {
                          name: h.IconName.CheckBold,
                          color: l.IconColor.iconDefault,
                        }),
                        onClose: () => t((0, v.setShowNewSrpAddedToast)(!1)),
                        autoHideTime: o,
                        onAutoHideToast: () => t((0, v.setShowNewSrpAddedToast)(!1)),
                      })
                  );
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/toast-master/toast-master.js' },
    ],
    [
      6292,
      { '../../../store/actionConstants': 7618, '../../../store/background-connection': 7620 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getIsPrivacyToastRecent = function (e) {
                    if (!e) return !0;
                    const t = new Date(),
                      n = new Date(e);
                    return t.valueOf() - n.valueOf() < 864e5;
                  }),
                  (n.setNewPrivacyPolicyToastClickedOrClosed = function () {
                    o('setNewPrivacyPolicyToastClickedOrClosed');
                  }),
                  (n.setNewPrivacyPolicyToastShownDate = function (e) {
                    o('setNewPrivacyPolicyToastShownDate', [e]);
                  }),
                  (n.setShowNewSrpAddedToast = function (e) {
                    return { type: a.SET_SHOW_NEW_SRP_ADDED_TOAST, payload: e };
                  }),
                  (n.setShowNftDetectionEnablementToast = function (e) {
                    return { type: a.SHOW_NFT_DETECTION_ENABLEMENT_TOAST, payload: e };
                  }),
                  (n.setSurveyLinkLastClickedOrClosed = function (e) {
                    o('setSurveyLinkLastClickedOrClosed', [e]);
                  }),
                  (n.setSwitchedNetworkNeverShowMessage = function () {
                    o('setSwitchedNetworkNeverShowMessage', [!0]);
                  }),
                  (n.submitRequestToBackgroundAndCatch = o);
                var a = e('../../../store/actionConstants'),
                  r = e('../../../store/background-connection');
                function o(e, t) {
                  var n;
                  null === (n = (0, r.submitRequestToBackground)(e, t)) ||
                    void 0 === n ||
                    n.catch(e => {
                      console.error('Error caught in submitRequestToBackground', e);
                    });
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/toast-master/utils.ts' },
    ],
    [
      6293,
      { './transaction-activity-log.container': 6298 },
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
                    (a = e('./transaction-activity-log.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-activity-log/index.js' },
    ],
    [
      6294,
      { './transaction-activity-log-icon.component': 6295 },
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
                    (a = e('./transaction-activity-log-icon.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-activity-log/transaction-activity-log-icon/index.js',
      },
    ],
    [
      6295,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../component-library': 6402,
        '../transaction-activity-log.constants': 6297,
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
                  (n.default = n.ACTIVITY_ICONS = void 0);
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
                  o = c(e('classnames')),
                  i = e('../transaction-activity-log.constants'),
                  s = e('../../../component-library'),
                  l = e('../../../../helpers/constants/design-system');
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
                function d(e, t, n) {
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
                const p = (n.ACTIVITY_ICONS = {
                  [i.TRANSACTION_CREATED_EVENT]: s.IconName.Add,
                  [i.TRANSACTION_SUBMITTED_EVENT]: s.IconName.ArrowUp,
                  [i.TRANSACTION_RESUBMITTED_EVENT]: s.IconName.ProgrammingArrows,
                  [i.TRANSACTION_CONFIRMED_EVENT]: s.IconName.Check,
                  [i.TRANSACTION_DROPPED_EVENT]: s.IconName.Close,
                  [i.TRANSACTION_ERRORED_EVENT]: s.IconName.Danger,
                  [i.TRANSACTION_CANCEL_ATTEMPTED_EVENT]: s.IconName.Close,
                  [i.TRANSACTION_CANCEL_SUCCESS_EVENT]: s.IconName.Close,
                });
                class m extends a.PureComponent {
                  render() {
                    const { className: e, eventKey: t } = this.props,
                      n = p[t];
                    return a.default.createElement(
                      'div',
                      { className: (0, o.default)('transaction-activity-log-icon', e) },
                      n
                        ? a.default.createElement(s.Icon, {
                            name: n,
                            color: l.Color.iconDefault,
                            size: s.IconSize.Sm,
                          })
                        : null
                    );
                  }
                }
                (n.default = m),
                  d(m, 'contextTypes', { t: r.default.func }),
                  d(m, 'propTypes', {
                    className: r.default.string,
                    eventKey: r.default.oneOf(Object.keys(p)),
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-activity-log/transaction-activity-log-icon/transaction-activity-log-icon.component.js',
      },
    ],
    [
      6296,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/utils/util': 6921,
        './transaction-activity-log-icon': 6294,
        './transaction-activity-log.constants': 6297,
        '@metamask/etherscan-link': 1938,
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
                  r = p(e('prop-types')),
                  o = p(e('classnames')),
                  i = e('@metamask/etherscan-link'),
                  s = e('../../../helpers/utils/util'),
                  l = e('../../../../shared/constants/metametrics'),
                  c = e('../../../../shared/modules/conversion.utils'),
                  u = p(e('./transaction-activity-log-icon')),
                  d = e('./transaction-activity-log.constants');
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
                class h extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      f(this, 'handleActivityClick', e => {
                        const { rpcPrefs: t } = this.props,
                          n = (0, i.getBlockExplorerLink)(e, t);
                        this.context.trackEvent({
                          category: l.MetaMetricsEventCategory.Transactions,
                          event: 'Clicked Block Explorer Link',
                          properties: {
                            link_type: 'Transaction Block Explorer',
                            action: 'Activity Details',
                            block_explorer_domain: (0, s.getURLHostName)(n),
                          },
                        }),
                          global.platform.openTab({ url: n });
                      });
                  }
                  renderInlineRetry(e) {
                    const { t: t } = this.context,
                      {
                        inlineRetryIndex: n,
                        primaryTransaction: r = {},
                        onRetry: o,
                        isEarliestNonce: i,
                      } = this.props,
                      { status: s } = r;
                    return i && s !== d.CONFIRMED_STATUS && e === n
                      ? a.default.createElement(
                          'div',
                          { className: 'transaction-activity-log__action-link', onClick: o },
                          t('speedUpTransaction')
                        )
                      : null;
                  }
                  renderInlineCancel(e) {
                    const { t: t } = this.context,
                      {
                        inlineCancelIndex: n,
                        primaryTransaction: r = {},
                        onCancel: o,
                        isEarliestNonce: i,
                      } = this.props,
                      { status: s } = r;
                    return i && s !== d.CONFIRMED_STATUS && e === n
                      ? a.default.createElement(
                          'div',
                          { className: 'transaction-activity-log__action-link', onClick: o },
                          t('speedUpCancellation')
                        )
                      : null;
                  }
                  renderActivity(e, t) {
                    const { conversionRate: n, nativeCurrency: r } = this.props,
                      { eventKey: o, value: i, timestamp: l } = e,
                      d = `${(0, c.getValueFromWeiHex)({ value: i, fromCurrency: 'ETH', toCurrency: 'ETH', conversionRate: n, numberOfDecimals: 6 })} ${r}`,
                      p = (0, s.formatDate)(l, "T 'on' M/d/y"),
                      m = this.context.t(o, [d, p]);
                    return a.default.createElement(
                      'div',
                      { key: t, className: 'transaction-activity-log__activity' },
                      a.default.createElement(u.default, {
                        className: 'transaction-activity-log__activity-icon',
                        eventKey: o,
                      }),
                      a.default.createElement(
                        'div',
                        { className: 'transaction-activity-log__entry-container' },
                        a.default.createElement(
                          'div',
                          {
                            className: 'transaction-activity-log__activity-text',
                            title: m,
                            onClick: () => this.handleActivityClick(e),
                          },
                          m
                        ),
                        this.renderInlineRetry(t),
                        this.renderInlineCancel(t)
                      )
                    );
                  }
                  render() {
                    const { t: e } = this.context,
                      { className: t, activities: n } = this.props;
                    return 0 === n.length
                      ? null
                      : a.default.createElement(
                          'div',
                          { className: (0, o.default)('transaction-activity-log', t) },
                          a.default.createElement(
                            'div',
                            { className: 'transaction-activity-log__title' },
                            e('activityLog')
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'transaction-activity-log__activities-container' },
                            n.map((e, t) => this.renderActivity(e, t))
                          )
                        );
                  }
                }
                (n.default = h),
                  f(h, 'contextTypes', { t: r.default.func, trackEvent: r.default.func }),
                  f(h, 'propTypes', {
                    activities: r.default.array,
                    className: r.default.string,
                    conversionRate: r.default.number,
                    inlineRetryIndex: r.default.number,
                    inlineCancelIndex: r.default.number,
                    nativeCurrency: r.default.string,
                    onCancel: r.default.func,
                    onRetry: r.default.func,
                    primaryTransaction: r.default.object,
                    isEarliestNonce: r.default.bool,
                    rpcPrefs: r.default.object,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-activity-log/transaction-activity-log.component.js',
      },
    ],
    [
      6297,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.TRANSACTION_UPDATED_EVENT =
                    n.TRANSACTION_SUBMITTED_EVENT =
                    n.TRANSACTION_RESUBMITTED_EVENT =
                    n.TRANSACTION_ERRORED_EVENT =
                    n.TRANSACTION_DROPPED_EVENT =
                    n.TRANSACTION_CREATED_EVENT =
                    n.TRANSACTION_CONFIRMED_EVENT =
                    n.TRANSACTION_CANCEL_SUCCESS_EVENT =
                    n.TRANSACTION_CANCEL_ATTEMPTED_EVENT =
                    n.SUBMITTED_STATUS =
                    n.DROPPED_STATUS =
                    n.CONFIRMED_STATUS =
                      void 0);
                (n.TRANSACTION_CREATED_EVENT = 'transactionCreated'),
                  (n.TRANSACTION_SUBMITTED_EVENT = 'transactionSubmitted'),
                  (n.TRANSACTION_RESUBMITTED_EVENT = 'transactionResubmitted'),
                  (n.TRANSACTION_CONFIRMED_EVENT = 'transactionConfirmed'),
                  (n.TRANSACTION_DROPPED_EVENT = 'transactionDropped'),
                  (n.TRANSACTION_UPDATED_EVENT = 'transactionUpdated'),
                  (n.TRANSACTION_ERRORED_EVENT = 'transactionErrored'),
                  (n.TRANSACTION_CANCEL_ATTEMPTED_EVENT = 'transactionCancelAttempted'),
                  (n.TRANSACTION_CANCEL_SUCCESS_EVENT = 'transactionCancelSuccess'),
                  (n.SUBMITTED_STATUS = 'submitted'),
                  (n.CONFIRMED_STATUS = 'confirmed'),
                  (n.DROPPED_STATUS = 'dropped');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-activity-log/transaction-activity-log.constants.js',
      },
    ],
    [
      6298,
      {
        '../../../ducks/metamask/metamask': 6860,
        '../../../selectors': 7601,
        './transaction-activity-log.component': 6296,
        './transaction-activity-log.constants': 6297,
        './transaction-activity-log.util': 6299,
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
                  r = e('react-redux'),
                  o = e('lodash'),
                  i = e('../../../selectors'),
                  s = e('../../../ducks/metamask/metamask'),
                  l =
                    (a = e('./transaction-activity-log.component')) && a.__esModule
                      ? a
                      : { default: a },
                  c = e('./transaction-activity-log.util'),
                  u = e('./transaction-activity-log.constants');
                const d =
                  e =>
                  ({ eventKey: t }) =>
                    t === e;
                n.default = (0, r.connect)(
                  e => ({
                    conversionRate: (0, i.conversionRateSelector)(e),
                    nativeCurrency: (0, s.getNativeCurrency)(e),
                    rpcPrefs: (0, i.getRpcPrefsForCurrentProvider)(e),
                  }),
                  null,
                  (e, t, n) => {
                    const {
                        transactionGroup: { transactions: a = [], primaryTransaction: r } = {},
                        ...i
                      } = n,
                      s = (0, c.combineTransactionHistories)(a);
                    return {
                      ...e,
                      ...t,
                      ...i,
                      activities: s,
                      inlineRetryIndex: (0, o.findLastIndex)(s, d(u.TRANSACTION_RESUBMITTED_EVENT)),
                      inlineCancelIndex: (0, o.findLastIndex)(
                        s,
                        d(u.TRANSACTION_CANCEL_ATTEMPTED_EVENT)
                      ),
                      primaryTransaction: r,
                    };
                  }
                )(l.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-activity-log/transaction-activity-log.container.js',
      },
    ],
    [
      6299,
      {
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../helpers/utils/confirm-tx.util': 6899,
        './transaction-activity-log.constants': 6297,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.combineTransactionHistories = function (e = []) {
                    if (!e.length) return [];
                    const t = [];
                    e.forEach((e, n) => {
                      const a = h(e, 0 === n);
                      t.push(...a);
                    });
                    return (function (e) {
                      const t = [],
                        n = Boolean(
                          e.find(
                            ({ eventKey: e }) =>
                              e === i.TRANSACTION_CONFIRMED_EVENT ||
                              e === i.TRANSACTION_CANCEL_SUCCESS_EVENT
                          )
                        );
                      let a = !1;
                      return (
                        e.forEach(e => {
                          e.eventKey === i.TRANSACTION_DROPPED_EVENT
                            ? n || a || (t.push(e), (a = !0))
                            : t.push(e);
                        }),
                        t
                      );
                    })(t.sort((e, t) => e.timestamp - t.timestamp));
                  }),
                  (n.getActivities = h);
                var a = e('@metamask/transaction-controller'),
                  r = e('../../../../shared/modules/conversion.utils'),
                  o = e('../../../helpers/utils/confirm-tx.util'),
                  i = e('./transaction-activity-log.constants');
                const s = '/status',
                  l = '/txParams/gasPrice',
                  c = '/txParams/gas',
                  u = '/estimatedBaseFee',
                  d = '/blockTimestamp',
                  p = 'replace',
                  m = { [s]: !0, [l]: !0, [c]: !0, [d]: !0 },
                  f = {
                    [i.SUBMITTED_STATUS]: i.TRANSACTION_SUBMITTED_EVENT,
                    [i.CONFIRMED_STATUS]: i.TRANSACTION_CONFIRMED_EVENT,
                    [i.DROPPED_STATUS]: i.TRANSACTION_DROPPED_EVENT,
                  };
                function h(e, t = !1) {
                  const {
                      id: n,
                      chainId: h,
                      hash: y,
                      history: g = [],
                      txParams: { gas: b, gasPrice: v, maxPriorityFeePerGas: T },
                      txReceipt: { status: E } = {},
                      type: w,
                      estimatedBaseFee: S,
                    } = e,
                    x = S && T && (0, r.sumHexes)(S, T);
                  let C = '0x0',
                    k = '0x0';
                  const _ = g.reduce((e, g, T) => {
                    if (0 === T && !Array.isArray(g) && g.txParams) {
                      const {
                          time: a,
                          estimatedBaseFee: o,
                          txParams: {
                            value: s,
                            gas: l = '0x0',
                            gasPrice: c,
                            maxPriorityFeePerGas: u,
                          } = {},
                        } = g,
                        d = o && u && (0, r.sumHexes)(o, u);
                      if (((C = l), (k = d || c || v || '0x0'), t))
                        return e.concat({
                          id: n,
                          hash: y,
                          chainId: h,
                          eventKey: i.TRANSACTION_CREATED_EVENT,
                          timestamp: a,
                          value: s,
                        });
                    } else if (Array.isArray(g)) {
                      const t = [];
                      return (
                        g.forEach(r => {
                          const { op: T, path: E, value: S, timestamp: _ } = r,
                            A = _ || (g[0] && g[0].timestamp);
                          if ((E in m && T === p) || (E === u && 'add' === T))
                            switch (E) {
                              case s: {
                                const e =
                                  '0x0' === C && '0x0' === k
                                    ? (0, o.getHexGasTotal)({ gasLimit: b, gasPrice: x || v })
                                    : (0, o.getHexGasTotal)({ gasLimit: C, gasPrice: k });
                                if (S in f) {
                                  let r = f[S];
                                  S === i.SUBMITTED_STATUS
                                    ? w === a.TransactionType.retry
                                      ? (r = i.TRANSACTION_RESUBMITTED_EVENT)
                                      : w === a.TransactionType.cancel &&
                                        (r = i.TRANSACTION_CANCEL_ATTEMPTED_EVENT)
                                    : S === i.CONFIRMED_STATUS &&
                                      w === a.TransactionType.cancel &&
                                      (r = i.TRANSACTION_CANCEL_SUCCESS_EVENT),
                                    t.push({
                                      id: n,
                                      hash: y,
                                      eventKey: r,
                                      timestamp: A,
                                      chainId: h,
                                      value: e,
                                    });
                                }
                                break;
                              }
                              case l:
                              case c:
                              case u: {
                                const e = t[t.length - 1] || {},
                                  { lastEventKey: n } = e;
                                if (E === c) C = S;
                                else if (E === l) k = S;
                                else if (E === u) {
                                  var O;
                                  (k =
                                    x ||
                                    (null == g || null === (O = g.txParams) || void 0 === O
                                      ? void 0
                                      : O.gasPrice)),
                                    (e.value = (0, o.getHexGasTotal)({ gasLimit: b, gasPrice: k }));
                                }
                                (n !== i.TRANSACTION_SUBMITTED_EVENT &&
                                  n !== i.TRANSACTION_RESUBMITTED_EVENT) ||
                                  (e.value = (0, o.getHexGasTotal)({ gasLimit: C, gasPrice: k }));
                                break;
                              }
                              case d: {
                                const t = e.find(e => e.eventKey === i.TRANSACTION_CONFIRMED_EVENT);
                                t !== undefined &&
                                  (t.timestamp = new Date(1e3 * parseInt(r.value, 16)).getTime());
                                break;
                              }
                              default:
                                t.push({
                                  id: n,
                                  hash: y,
                                  chainId: h,
                                  eventKey: i.TRANSACTION_UPDATED_EVENT,
                                  timestamp: A,
                                });
                            }
                        }),
                        e.concat(t)
                      );
                    }
                    return e;
                  }, []);
                  return '0x0' === E
                    ? _.concat({
                        id: n,
                        hash: y,
                        chainId: h,
                        eventKey: i.TRANSACTION_ERRORED_EVENT,
                      })
                    : _;
                }
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-activity-log/transaction-activity-log.util.js',
      },
    ],
    [
      6300,
      { './transaction-breakdown.container': 6305 },
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
                    (a = e('./transaction-breakdown.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-breakdown/index.js' },
    ],
    [
      6301,
      { './transaction-breakdown-row.component': 6302 },
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
                    (a = e('./transaction-breakdown-row.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-breakdown/transaction-breakdown-row/index.js',
      },
    ],
    [
      6302,
      { classnames: 4168, 'prop-types': 5082, react: 5328 },
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
                  s = c(e('prop-types')),
                  l = c(e('classnames'));
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
                class d extends i.PureComponent {
                  render() {
                    const { title: e, children: t, className: n, divider: a = !1 } = this.props;
                    return i.default.createElement(
                      'div',
                      {
                        className: (0, l.default)(
                          'transaction-breakdown-row',
                          a ? 'transaction-breakdown-row--with-bottom-border' : '',
                          n
                        ),
                        'data-testid': 'transaction-breakdown-row',
                      },
                      i.default.createElement(
                        'div',
                        {
                          className: 'transaction-breakdown-row__title',
                          'data-testid': 'transaction-breakdown-row-title',
                        },
                        e
                      ),
                      i.default.createElement(
                        'div',
                        {
                          className: 'transaction-breakdown-row__value',
                          'data-testid': 'transaction-breakdown-row-value',
                        },
                        t
                      )
                    );
                  }
                }
                (n.default = d),
                  (a = d),
                  (r = 'propTypes'),
                  (o = {
                    title: s.default.string,
                    children: s.default.node,
                    className: s.default.string,
                    divider: s.default.bool,
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
        file: 'ui/components/app/transaction-breakdown/transaction-breakdown-row/transaction-breakdown-row.component.js',
      },
    ],
    [
      6303,
      {
        '../../../../shared/lib/transaction-breakdown-utils': 5850,
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/transaction.utils': 5880,
        '../../../ducks/metamask/metamask': 6860,
        '../../../selectors': 7601,
        '../transaction-activity-log/transaction-activity-log.constants': 6297,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getTransactionBreakdownData = void 0);
                var a = e('@metamask/transaction-controller'),
                  r = e('../../../selectors'),
                  o = e('../../../ducks/metamask/metamask'),
                  i = e('../../../../shared/modules/transaction.utils'),
                  s = e('../../../../shared/modules/conversion.utils'),
                  l = e('../../../../shared/lib/transactions-controller-utils'),
                  c = e('../transaction-activity-log/transaction-activity-log.constants'),
                  u = e('../../../../shared/lib/transaction-breakdown-utils');
                n.getTransactionBreakdownData = ({
                  state: e,
                  transaction: t,
                  isTokenApprove: n,
                }) => {
                  const {
                      txParams: { gas: d, gasPrice: p, maxFeePerGas: m, value: f } = {},
                      txReceipt: { gasUsed: h, effectiveGasPrice: y, l1Fee: g } = {},
                      baseFeePerGas: b,
                      sourceTokenAmount: v,
                      sourceTokenDecimals: T,
                      sourceTokenSymbol: E,
                      destinationTokenAddress: w,
                      destinationTokenAmount: S,
                      destinationTokenDecimals: x,
                      destinationTokenSymbol: C,
                      status: k,
                      type: _,
                    } = t,
                    A = v && T ? (0, l.calcTokenAmount)(v, T).toFixed() : undefined;
                  let O;
                  if (_ === a.TransactionType.swapAndSend && S && x && C)
                    try {
                      if (
                        ((O = (0, l.getSwapsTokensReceivedFromTxMeta)(
                          C,
                          t,
                          w,
                          undefined,
                          x,
                          undefined,
                          undefined,
                          null
                        )),
                        !O)
                      )
                        throw new Error('Actual destination token amount not found');
                    } catch (e) {
                      O = S && x ? (0, l.calcTokenAmount)(S, x).toFixed() : undefined;
                    }
                  const I = A && T && E ? `${A} ${E}` : undefined,
                    N = O && k === c.CONFIRMED_STATUS ? `${O} ${C}` : undefined,
                    M = y && b && (0, s.subtractHexes)(y, b),
                    P = (0, u.calcHexGasTotal)(t),
                    R = (0, s.sumHexes)(P, f, g ?? 0);
                  return {
                    nativeCurrency: (0, o.getNativeCurrency)(e),
                    showFiat: (0, r.getShouldShowFiat)(e),
                    totalInHex: R,
                    gas: d,
                    gasPrice: p,
                    maxFeePerGas: m,
                    gasUsed: h,
                    isTokenApprove: n,
                    hexGasTotal: P,
                    priorityFee: M,
                    baseFee: b,
                    isEIP1559Transaction: (0, i.isEIP1559Transaction)(t),
                    l1HexGasTotal: g,
                    sourceAmountFormatted: I,
                    destinationAmountFormatted: N,
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-breakdown/transaction-breakdown-utils.ts',
      },
    ],
    [
      6304,
      {
        '../../../../shared/constants/common': 5791,
        '../../../helpers/constants/common': 6870,
        '../../ui/currency-display': 6720,
        '../../ui/hex-to-decimal': 6742,
        '../user-preferenced-currency-display': 6317,
        './transaction-breakdown-row': 6301,
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
                  r = p(e('prop-types')),
                  o = p(e('classnames')),
                  i = p(e('../../ui/currency-display')),
                  s = p(e('../user-preferenced-currency-display')),
                  l = p(e('../../ui/hex-to-decimal')),
                  c = e('../../../../shared/constants/common'),
                  u = e('../../../helpers/constants/common'),
                  d = p(e('./transaction-breakdown-row'));
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
                class h extends a.PureComponent {
                  render() {
                    const { t: e } = this.context,
                      {
                        gas: t,
                        gasPrice: n,
                        maxFeePerGas: r,
                        primaryCurrency: p,
                        className: m,
                        nonce: f,
                        nativeCurrency: h,
                        showFiat: y,
                        totalInHex: g,
                        gasUsed: b,
                        isTokenApprove: v,
                        baseFee: T,
                        priorityFee: E,
                        hexGasTotal: w,
                        isEIP1559Transaction: S,
                        l1HexGasTotal: x,
                        sourceAmountFormatted: C,
                        destinationAmountFormatted: k,
                      } = this.props;
                    return a.default.createElement(
                      'div',
                      { className: (0, o.default)('transaction-breakdown', m) },
                      a.default.createElement(
                        'div',
                        { className: 'transaction-breakdown__title' },
                        e('transaction')
                      ),
                      a.default.createElement(
                        d.default,
                        { divider: !0, title: e('nonce') },
                        void 0 === f
                          ? null
                          : a.default.createElement(l.default, {
                              className: 'transaction-breakdown__value',
                              value: f,
                            })
                      ),
                      C &&
                        a.default.createElement(
                          d.default,
                          { title: e('amountSent') },
                          a.default.createElement(
                            'span',
                            {
                              className:
                                'transaction-breakdown__value transaction-breakdown__value--amount',
                              'data-testid': 'transaction-breakdown-value-amount',
                            },
                            C
                          )
                        ),
                      k &&
                        a.default.createElement(
                          d.default,
                          { title: e('amountReceived') },
                          a.default.createElement(
                            'span',
                            {
                              className:
                                'transaction-breakdown__value transaction-breakdown__value--amount',
                              'data-testid': 'transaction-breakdown-value-amount',
                            },
                            k
                          )
                        ),
                      !C &&
                        a.default.createElement(
                          d.default,
                          { title: e(v ? 'spendingCap' : 'amount') },
                          a.default.createElement(
                            'span',
                            {
                              className:
                                'transaction-breakdown__value transaction-breakdown__value--amount',
                              'data-testid': 'transaction-breakdown-value-amount',
                            },
                            p
                          )
                        ),
                      a.default.createElement(
                        d.default,
                        {
                          title: x
                            ? e('transactionHistoryL2GasLimitLabel')
                            : `${e('gasLimit')} (${e('units')})`,
                          className: 'transaction-breakdown__row-title',
                        },
                        void 0 === t
                          ? '?'
                          : a.default.createElement(l.default, {
                              className: 'transaction-breakdown__value',
                              value: t,
                            })
                      ),
                      'string' == typeof b &&
                        a.default.createElement(
                          d.default,
                          {
                            title: `${e('gasUsed')} (${e('units')})`,
                            className: 'transaction-breakdown__row-title',
                          },
                          a.default.createElement(l.default, {
                            className: 'transaction-breakdown__value',
                            value: b,
                          })
                        ),
                      S && void 0 !== T
                        ? a.default.createElement(
                            d.default,
                            { title: e('transactionHistoryBaseFee') },
                            a.default.createElement(i.default, {
                              className: 'transaction-breakdown__value',
                              'data-testid': 'transaction-breakdown__base-fee',
                              currency: h,
                              denomination: c.EtherDenomination.GWEI,
                              value: T,
                              numberOfDecimals: 10,
                              hideLabel: !0,
                            })
                          )
                        : null,
                      S && void 0 !== E
                        ? a.default.createElement(
                            d.default,
                            { title: e('transactionHistoryPriorityFee') },
                            a.default.createElement(i.default, {
                              className: 'transaction-breakdown__value',
                              'data-testid': 'transaction-breakdown__priority-fee',
                              currency: h,
                              denomination: c.EtherDenomination.GWEI,
                              value: E,
                              numberOfDecimals: 10,
                              hideLabel: !0,
                            })
                          )
                        : null,
                      !S &&
                        a.default.createElement(
                          d.default,
                          {
                            title: e(
                              x ? 'transactionHistoryL2GasPriceLabel' : 'advancedGasPriceTitle'
                            ),
                          },
                          void 0 === n
                            ? '?'
                            : a.default.createElement(i.default, {
                                className: 'transaction-breakdown__value',
                                'data-testid': 'transaction-breakdown__gas-price',
                                currency: h,
                                denomination: c.EtherDenomination.GWEI,
                                value: n,
                                numberOfDecimals: 9,
                                hideLabel: !0,
                              })
                        ),
                      S &&
                        a.default.createElement(
                          d.default,
                          { title: e('transactionHistoryTotalGasFee') },
                          a.default.createElement(s.default, {
                            className: 'transaction-breakdown__value',
                            'data-testid': 'transaction-breakdown__effective-gas-price',
                            currency: h,
                            denomination: c.EtherDenomination.ETH,
                            numberOfDecimals: 6,
                            value: w,
                            type: u.PRIMARY,
                          }),
                          y &&
                            a.default.createElement(s.default, {
                              className: 'transaction-breakdown__value',
                              type: u.SECONDARY,
                              value: w,
                            })
                        ),
                      S &&
                        a.default.createElement(
                          d.default,
                          { divider: !0, title: e('transactionHistoryMaxFeePerGas') },
                          a.default.createElement(s.default, {
                            className: 'transaction-breakdown__value',
                            currency: h,
                            denomination: c.EtherDenomination.ETH,
                            numberOfDecimals: 9,
                            value: r,
                            type: u.PRIMARY,
                          }),
                          y &&
                            a.default.createElement(s.default, {
                              className: 'transaction-breakdown__value',
                              type: u.SECONDARY,
                              value: r,
                            })
                        ),
                      x &&
                        a.default.createElement(
                          d.default,
                          { title: e('transactionHistoryL1GasLabel') },
                          a.default.createElement(s.default, {
                            className: 'transaction-breakdown__value',
                            'data-testid': 'transaction-breakdown__l1-gas-total',
                            numberOfDecimals: 18,
                            value: x,
                            type: u.PRIMARY,
                          }),
                          y &&
                            a.default.createElement(s.default, {
                              className: 'transaction-breakdown__value',
                              type: u.SECONDARY,
                              value: x,
                            })
                        ),
                      a.default.createElement(
                        d.default,
                        { title: e('total') },
                        a.default.createElement(s.default, {
                          className:
                            'transaction-breakdown__value transaction-breakdown__value--eth-total',
                          type: u.PRIMARY,
                          value: g,
                          numberOfDecimals: x ? 18 : null,
                        }),
                        y &&
                          a.default.createElement(s.default, {
                            className: 'transaction-breakdown__value',
                            type: u.SECONDARY,
                            value: g,
                          })
                      )
                    );
                  }
                }
                (n.default = h),
                  f(h, 'contextTypes', { t: r.default.func }),
                  f(h, 'propTypes', {
                    className: r.default.string,
                    nativeCurrency: r.default.string,
                    showFiat: r.default.bool,
                    nonce: r.default.string,
                    primaryCurrency: r.default.string,
                    isTokenApprove: r.default.bool,
                    gas: r.default.oneOfType([r.default.string, r.default.number]),
                    gasPrice: r.default.oneOfType([r.default.string, r.default.number]),
                    maxFeePerGas: r.default.oneOfType([r.default.string, r.default.number]),
                    gasUsed: r.default.oneOfType([r.default.string, r.default.number]),
                    totalInHex: r.default.oneOfType([r.default.string, r.default.number]),
                    baseFee: r.default.oneOfType([r.default.string, r.default.number]),
                    priorityFee: r.default.oneOfType([r.default.string, r.default.number]),
                    hexGasTotal: r.default.string,
                    isEIP1559Transaction: r.default.bool,
                    l1HexGasTotal: r.default.string,
                    sourceAmountFormatted: r.default.string,
                    destinationAmountFormatted: r.default.string,
                  }),
                  f(h, 'defaultProps', { showFiat: !0 });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-breakdown/transaction-breakdown.component.js',
      },
    ],
    [
      6305,
      {
        './transaction-breakdown-utils': 6303,
        './transaction-breakdown.component': 6304,
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
                  o =
                    (a = e('./transaction-breakdown.component')) && a.__esModule
                      ? a
                      : { default: a },
                  i = e('./transaction-breakdown-utils');
                n.default = (0, r.connect)((e, t) => {
                  const { transaction: n, isTokenApprove: a } = t;
                  return (0, i.getTransactionBreakdownData)({
                    state: e,
                    transaction: n,
                    isTokenApprove: a,
                  });
                })(o.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-breakdown/transaction-breakdown.container.js',
      },
    ],
    [
      6306,
      { './transaction-icon': 6307 },
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
                  r = (a = e('./transaction-icon')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-icon/index.js' },
    ],
    [
      6307,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../helpers/constants/design-system': 6872,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '@metamask/transaction-controller': 2946,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = h);
                var a = d(e('react')),
                  r = e('react-redux'),
                  o = d(e('prop-types')),
                  i = e('@metamask/transaction-controller'),
                  s = e('../../../../shared/constants/transaction'),
                  l = e('../../../store/actions'),
                  c = e('../../component-library'),
                  u = e('../../../helpers/constants/design-system');
                function d(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const p = {
                    [s.TransactionGroupCategory.approval]: c.IconName.Check,
                    [s.TransactionGroupCategory.interaction]: c.IconName.ProgrammingArrows,
                    [s.TransactionGroupCategory.receive]: c.IconName.Received,
                    [s.TransactionGroupCategory.send]: c.IconName.Arrow2UpRight,
                    [s.TransactionGroupCategory.signatureRequest]: c.IconName.SecurityTick,
                    [s.TransactionGroupCategory.swap]: c.IconName.SwapHorizontal,
                    [s.TransactionGroupCategory.swapAndSend]: c.IconName.Arrow2UpRight,
                    [s.TransactionGroupCategory.bridge]: c.IconName.Bridge,
                    [s.TransactionGroupCategory.redeposit]: c.IconName.Refresh,
                  },
                  m = {
                    [s.TransactionGroupStatus.pending]: u.IconColor.primaryDefault,
                    [s.TransactionGroupStatus.cancelled]: u.IconColor.errorDefault,
                    [i.TransactionStatus.approved]: u.IconColor.primaryDefault,
                    [i.TransactionStatus.dropped]: u.IconColor.errorDefault,
                    [i.TransactionStatus.failed]: u.IconColor.errorDefault,
                    [i.TransactionStatus.rejected]: u.IconColor.errorDefault,
                    [i.TransactionStatus.submitted]: u.IconColor.primaryDefault,
                    [i.TransactionStatus.unapproved]: u.IconColor.primaryDefault,
                  },
                  f = {
                    [s.TransactionGroupStatus.pending]: u.BackgroundColor.primaryMuted,
                    [s.TransactionGroupStatus.cancelled]: u.BackgroundColor.errorMuted,
                    [i.TransactionStatus.approved]: u.BackgroundColor.primaryMuted,
                    [i.TransactionStatus.dropped]: u.BackgroundColor.errorMuted,
                    [i.TransactionStatus.failed]: u.BackgroundColor.errorMuted,
                    [i.TransactionStatus.rejected]: u.BackgroundColor.errorMuted,
                    [i.TransactionStatus.submitted]: u.BackgroundColor.primaryMuted,
                    [i.TransactionStatus.unapproved]: u.BackgroundColor.primaryMuted,
                  };
                function h({ status: e, category: t }) {
                  const n = (0, r.useDispatch)(),
                    o = m[e] || u.IconColor.primaryDefault,
                    i = f[e] || u.BackgroundColor.primaryMuted,
                    s = p[t];
                  return s
                    ? a.default.createElement(c.AvatarIcon, {
                        backgroundColor: i,
                        iconName: s,
                        size: c.AvatarIconSize.Md,
                        color: o,
                      })
                    : (n(
                        (0, l.captureSingleException)(
                          `The category prop passed to TransactionIcon is not supported. The prop is: ${t}`
                        )
                      ),
                      a.default.createElement(c.AvatarIcon, {
                        backgroundColor: u.BackgroundColor.backgroundAlternative,
                        size: c.AvatarIconSize.Md,
                      }));
                }
                h.propTypes = {
                  status: o.default.oneOf([
                    s.TransactionGroupStatus.cancelled,
                    s.TransactionGroupStatus.pending,
                    i.TransactionStatus.approved,
                    i.TransactionStatus.confirmed,
                    i.TransactionStatus.dropped,
                    i.TransactionStatus.failed,
                    i.TransactionStatus.rejected,
                    i.TransactionStatus.submitted,
                    i.TransactionStatus.unapproved,
                  ]).isRequired,
                  category: o.default.oneOf([
                    s.TransactionGroupCategory.approval,
                    s.TransactionGroupCategory.interaction,
                    s.TransactionGroupCategory.receive,
                    s.TransactionGroupCategory.send,
                    s.TransactionGroupCategory.signatureRequest,
                    s.TransactionGroupCategory.swap,
                    s.TransactionGroupCategory.swapAndSend,
                    s.TransactionGroupCategory.bridge,
                  ]).isRequired,
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-icon/transaction-icon.js' },
    ],
    [
      6308,
      { './transaction-list-item-details.container': 6310 },
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
                    (a = e('./transaction-list-item-details.container')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-list-item-details/index.js' },
    ],
    [
      6309,
      {
        '../../../../shared/constants/copy': 5792,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/time': 5817,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/util': 6921,
        '../../component-library/box': 6365,
        '../../ui/button': 6707,
        '../../ui/disclosure': 6730,
        '../../ui/popover': 6789,
        '../../ui/sender-to-recipient': 6795,
        '../../ui/sender-to-recipient/sender-to-recipient.constants': 6797,
        '../../ui/tooltip': 6818,
        '../cancel-button': 5970,
        '../transaction-activity-log': 6293,
        '../transaction-breakdown': 6300,
        '@metamask/etherscan-link': 1938,
        '@metamask/transaction-controller': 2946,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
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
                  r = x(e('prop-types')),
                  o = x(e('copy-to-clipboard')),
                  i = e('@metamask/etherscan-link'),
                  s = e('@metamask/transaction-controller'),
                  l = x(e('../../ui/sender-to-recipient')),
                  c = e('../../ui/sender-to-recipient/sender-to-recipient.constants'),
                  u = x(e('../../ui/disclosure')),
                  d = x(e('../transaction-activity-log')),
                  p = x(e('../transaction-breakdown')),
                  m = x(e('../../ui/button')),
                  f = x(e('../../ui/tooltip')),
                  h = x(e('../cancel-button')),
                  y = x(e('../../ui/popover')),
                  g = e('../../component-library/box'),
                  b = e('../../../../shared/constants/time'),
                  v = e('../../../../shared/constants/metametrics'),
                  T = e('../../../helpers/utils/util'),
                  E = e('../../../helpers/constants/routes'),
                  w = e('../../../../shared/constants/copy'),
                  S = e('../../../../shared/constants/network');
                function x(e) {
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
                function k(e, t, n) {
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
                class _ extends a.PureComponent {
                  constructor(...e) {
                    super(...e),
                      k(this, 'state', { justCopied: !1 }),
                      k(this, 'handleBlockExplorerClick', () => {
                        var e, t;
                        const {
                            transactionGroup: { primaryTransaction: n },
                            networkConfiguration: a,
                            isCustomNetwork: r,
                            history: o,
                            onClose: s,
                            chainId: l,
                          } = this.props,
                          c = {
                            blockExplorerUrl:
                              null == a || null === (e = a[l]) || void 0 === e
                                ? void 0
                                : e.blockExplorerUrls[
                                    null == a || null === (t = a[l]) || void 0 === t
                                      ? void 0
                                      : t.defaultBlockExplorerUrlIndex
                                  ],
                            imageUrl: S.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[l],
                          },
                          u = (0, i.getBlockExplorerLink)(n, c);
                        !c.blockExplorerUrl && r
                          ? (s(), o.push(`${E.NETWORKS_ROUTE}#blockExplorerUrl`))
                          : (this.context.trackEvent({
                              category: v.MetaMetricsEventCategory.Transactions,
                              event: 'Clicked Block Explorer Link',
                              properties: {
                                link_type: 'Transaction Block Explorer',
                                action: 'Transaction Details',
                                block_explorer_domain: (0, T.getURLHostName)(u),
                              },
                            }),
                            global.platform.openTab({ url: u }));
                      }),
                      k(this, 'handleCancel', e => {
                        const { onCancel: t, onClose: n } = this.props;
                        t(e), n();
                      }),
                      k(this, 'handleRetry', e => {
                        const { onClose: t, onRetry: n } = this.props;
                        n(e), t();
                      }),
                      k(this, 'handleCopyTxId', () => {
                        const { transactionGroup: e } = this.props,
                          { primaryTransaction: t } = e,
                          { hash: n } = t;
                        this.context.trackEvent({
                          category: v.MetaMetricsEventCategory.Navigation,
                          event: 'Copied Transaction ID',
                          properties: { action: 'Activity Log', legacy_event: !0 },
                        }),
                          this.setState({ justCopied: !0 }, () => {
                            (0, o.default)(n, w.COPY_OPTIONS),
                              setTimeout(() => this.setState({ justCopied: !1 }), b.SECOND);
                          });
                      });
                  }
                  componentDidMount() {
                    const { recipientAddress: e, tryReverseResolveAddress: t } = this.props;
                    e && t(e);
                  }
                  render() {
                    const { t: e } = this.context,
                      { justCopied: t } = this.state,
                      {
                        transactionGroup: n,
                        primaryCurrency: r,
                        showSpeedUp: o,
                        showRetry: i,
                        recipientAddress: b,
                        recipientName: T,
                        senderAddress: E,
                        isEarliestNonce: w,
                        senderNickname: S,
                        title: x,
                        onClose: C,
                        showCancel: k,
                        transactionStatus: _,
                        blockExplorerLinkText: A,
                      } = this.props,
                      {
                        primaryTransaction: O,
                        initialTransaction: { type: I },
                      } = n,
                      { chainId: N, hash: M } = O;
                    return a.default.createElement(
                      y.default,
                      { title: x, onClose: C },
                      a.default.createElement(
                        'div',
                        { className: 'transaction-list-item-details' },
                        a.default.createElement(
                          'div',
                          { className: 'transaction-list-item-details__operations' },
                          a.default.createElement(
                            'div',
                            { className: 'transaction-list-item-details__header-buttons' },
                            o &&
                              a.default.createElement(
                                m.default,
                                {
                                  type: 'primary',
                                  onClick: this.handleRetry,
                                  className:
                                    'transaction-list-item-details__header-button-rounded-button',
                                  'data-testid': 'speedup-button',
                                },
                                e('speedUp')
                              ),
                            k &&
                              a.default.createElement(h.default, {
                                transaction: O,
                                cancelTransaction: this.handleCancel,
                                detailsModal: !0,
                              }),
                            i &&
                              a.default.createElement(
                                f.default,
                                { title: e('retryTransaction') },
                                a.default.createElement(
                                  m.default,
                                  {
                                    type: 'raised',
                                    onClick: this.handleRetry,
                                    className: 'transaction-list-item-details__header-button',
                                    'data-testid': 'rety-button',
                                  },
                                  a.default.createElement('i', { className: 'fa fa-sync' })
                                )
                              )
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'transaction-list-item-details__header' },
                          a.default.createElement(
                            'div',
                            {
                              className: 'transaction-list-item-details__tx-status',
                              'data-testid': 'transaction-list-item-details-tx-status',
                            },
                            a.default.createElement('div', null, e('status')),
                            a.default.createElement('div', null, a.default.createElement(_, null))
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'transaction-list-item-details__tx-hash' },
                            a.default.createElement(
                              'div',
                              null,
                              a.default.createElement(
                                m.default,
                                {
                                  type: 'link',
                                  onClick: this.handleBlockExplorerClick,
                                  disabled: !M,
                                },
                                'addBlockExplorer' === A.firstPart
                                  ? e('addBlockExplorer')
                                  : e('viewOnBlockExplorer')
                              )
                            ),
                            a.default.createElement(
                              'div',
                              null,
                              a.default.createElement(
                                f.default,
                                {
                                  wrapperClassName: 'transaction-list-item-details__header-button',
                                  containerClassName:
                                    'transaction-list-item-details__header-button-tooltip-container',
                                  title: t ? e('copiedExclamation') : null,
                                },
                                a.default.createElement(
                                  m.default,
                                  { type: 'link', onClick: this.handleCopyTxId, disabled: !M },
                                  e('copyTransactionId')
                                )
                              )
                            )
                          )
                        ),
                        a.default.createElement(
                          'div',
                          { className: 'transaction-list-item-details__body' },
                          a.default.createElement(
                            'div',
                            {
                              className:
                                'transaction-list-item-details__sender-to-recipient-header',
                            },
                            a.default.createElement('div', null, e('from')),
                            a.default.createElement('div', null, e('to'))
                          ),
                          a.default.createElement(
                            'div',
                            {
                              className:
                                'transaction-list-item-details__sender-to-recipient-container',
                            },
                            a.default.createElement(l.default, {
                              warnUserOnAccountMismatch: !1,
                              variant: c.DEFAULT_VARIANT,
                              addressOnly: !0,
                              recipientAddress: b,
                              recipientName: T,
                              senderName: S,
                              senderAddress: E,
                              chainId: N,
                              onRecipientClick: () => {
                                this.context.trackEvent({
                                  category: v.MetaMetricsEventCategory.Navigation,
                                  event: 'Copied "To" Address',
                                  properties: { action: 'Activity Log', legacy_event: !0 },
                                });
                              },
                              onSenderClick: () => {
                                this.context.trackEvent({
                                  category: v.MetaMetricsEventCategory.Navigation,
                                  event: 'Copied "From" Address',
                                  properties: { action: 'Activity Log', legacy_event: !0 },
                                });
                              },
                            })
                          ),
                          a.default.createElement(
                            'div',
                            { className: 'transaction-list-item-details__cards-container' },
                            a.default.createElement(p.default, {
                              nonce: n.initialTransaction.txParams.nonce,
                              isTokenApprove:
                                I === s.TransactionType.tokenMethodApprove ||
                                I === s.TransactionType.tokenMethodSetApprovalForAll,
                              transaction: O,
                              primaryCurrency: r,
                              className: 'transaction-list-item-details__transaction-breakdown',
                              chainId: N,
                            }),
                            n.initialTransaction.type !== s.TransactionType.incoming &&
                              a.default.createElement(
                                g.Box,
                                { marginTop: 3, marginBottom: 3 },
                                a.default.createElement(
                                  u.default,
                                  {
                                    title: e('activityLog'),
                                    size: 'small',
                                    isScrollToBottomOnOpen: !0,
                                  },
                                  a.default.createElement(d.default, {
                                    transactionGroup: n,
                                    className:
                                      'transaction-list-item-details__transaction-activity-log',
                                    onCancel: this.handleCancel,
                                    onRetry: this.handleRetry,
                                    isEarliestNonce: w,
                                  })
                                )
                              )
                          )
                        )
                      )
                    );
                  }
                }
                (n.default = _),
                  k(_, 'contextTypes', { t: r.default.func, trackEvent: r.default.func }),
                  k(_, 'defaultProps', {}),
                  k(_, 'propTypes', {
                    onCancel: r.default.func,
                    onRetry: r.default.func,
                    showCancel: r.default.bool,
                    showSpeedUp: r.default.bool,
                    showRetry: r.default.bool,
                    isEarliestNonce: r.default.bool,
                    primaryCurrency: r.default.string,
                    transactionGroup: r.default.object,
                    title: r.default.string.isRequired,
                    onClose: r.default.func.isRequired,
                    recipientAddress: r.default.string,
                    recipientName: r.default.string,
                    senderAddress: r.default.string.isRequired,
                    tryReverseResolveAddress: r.default.func.isRequired,
                    senderNickname: r.default.string.isRequired,
                    transactionStatus: r.default.func,
                    isCustomNetwork: r.default.bool,
                    history: r.default.object,
                    blockExplorerLinkText: r.default.object,
                    chainId: r.default.string,
                    networkConfiguration: r.default.object,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-list-item-details/transaction-list-item-details.component.js',
      },
    ],
    [
      6310,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './transaction-list-item-details.component': 6309,
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
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  i = e('redux'),
                  s = e('../../../../shared/modules/selectors/networks'),
                  l = e('../../../selectors'),
                  c = e('../../../store/actions'),
                  u =
                    (a = e('./transaction-list-item-details.component')) && a.__esModule
                      ? a
                      : { default: a };
                n.default = (0, i.compose)(
                  o.withRouter,
                  (0, r.connect)(
                    (e, t) => {
                      const { recipientAddress: n, senderAddress: a } = t,
                        r = (0, l.getAddressBook)(e),
                        o = (0, l.getInternalAccounts)(e),
                        i = (0, l.getAccountName)(o, n),
                        c = (0, l.getRpcPrefsForCurrentProvider)(e),
                        u = (0, s.getNetworkConfigurationsByChainId)(e),
                        d = (0, l.getIsCustomNetwork)(e);
                      return {
                        rpcPrefs: c,
                        networkConfiguration: u,
                        senderNickname: (e => {
                          const t = r.find(t => e.toLowerCase() === t.address.toLowerCase());
                          return (t && t.name) || '';
                        })(a),
                        isCustomNetwork: d,
                        blockExplorerLinkText: (0, l.getBlockExplorerLinkText)(e),
                        recipientName: i,
                      };
                    },
                    e => ({ tryReverseResolveAddress: t => e((0, c.tryReverseResolveAddress)(t)) })
                  )
                )(u.default);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-list-item-details/transaction-list-item-details.container.js',
      },
    ],
    [
      6311,
      { './transaction-list-item.component': 6313 },
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
                    (a = e('./transaction-list-item.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-list-item/index.js' },
    ],
    [
      6312,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useTransactionDisplayData': 7019,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../multichain': 6574,
        '../cancel-button': 5970,
        '../transaction-icon': 6306,
        '../transaction-list-item-details': 6308,
        '../transaction-status-label/transaction-status-label': 6316,
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
                var a = (function (e, t) {
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
                  r = b(e('prop-types')),
                  o = e('react-redux'),
                  i = b(e('../transaction-status-label/transaction-status-label')),
                  s = b(e('../transaction-icon')),
                  l = e('../../../hooks/useTransactionDisplayData'),
                  c = e('../../../helpers/utils/util'),
                  u = e('../../../../shared/constants/transaction'),
                  d = b(e('../cancel-button')),
                  p = e('../../../ducks/swaps/swaps'),
                  m = b(e('../transaction-list-item-details')),
                  f = e('../../multichain'),
                  h = e('../../component-library'),
                  y = e('../../../helpers/constants/design-system'),
                  g = e('../../../selectors');
                function b(e) {
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
                function T({
                  smartTransaction: e,
                  transactionGroup: t,
                  isEarliestNonce: n = !1,
                  chainId: r,
                }) {
                  var b;
                  const v = (0, o.useDispatch)(),
                    [T, E] = (0, a.useState)(!1),
                    [w, S] = (0, a.useState)(!1),
                    {
                      title: x,
                      category: C,
                      primaryCurrency: k,
                      recipientAddress: _,
                      isPending: A,
                      senderAddress: O,
                    } = (0, l.useTransactionDisplayData)(t),
                    I = (0, o.useSelector)(g.getCurrentNetwork),
                    { time: N, status: M } = e,
                    P = (0, c.formatDateWithYearContext)(N, 'MMM d, y', 'MMM d');
                  let R;
                  M === u.SmartTransactionStatus.pending
                    ? (R = u.TransactionGroupStatus.pending)
                    : null != M &&
                      M.startsWith(u.SmartTransactionStatus.cancelled) &&
                      (R = u.TransactionGroupStatus.cancelled);
                  const B = e.cancellable && !T,
                    D = (0, a.useCallback)(() => {
                      S(e => !e);
                    }, []);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      f.ActivityListItem,
                      {
                        className: 'transaction-list-item transaction-list-item--unconfirmed',
                        title: x,
                        onClick: D,
                        icon: a.default.createElement(
                          h.BadgeWrapper,
                          {
                            anchorElementShape: h.BadgeWrapperAnchorElementShape.circular,
                            display: y.Display.Block,
                            badge: a.default.createElement(h.AvatarNetwork, {
                              className: 'activity-tx__network-badge',
                              'data-testid': 'activity-tx-network-badge',
                              size: h.AvatarNetworkSize.Xs,
                              name: null == I ? void 0 : I.nickname,
                              src:
                                null == I || null === (b = I.rpcPrefs) || void 0 === b
                                  ? void 0
                                  : b.imageUrl,
                              borderColor: y.BackgroundColor.backgroundDefault,
                            }),
                          },
                          a.default.createElement(s.default, { category: C, status: R })
                        ),
                        subtitle: a.default.createElement(i.default, {
                          isPending: !0,
                          isEarliestNonce: n,
                          date: P,
                          status: R,
                        }),
                      },
                      R === u.TransactionGroupStatus.pending &&
                        B &&
                        a.default.createElement(
                          h.Box,
                          { paddingTop: 4, className: 'transaction-list-item__pending-actions' },
                          a.default.createElement(d.default, {
                            transaction: e.uuid,
                            cancelTransaction: t => {
                              null == t || t.preventDefault(),
                                v((0, p.cancelSwapsSmartTransaction)(e.uuid)),
                                E(!0);
                            },
                          })
                        )
                    ),
                    w &&
                      a.default.createElement(m.default, {
                        title: x,
                        onClose: D,
                        senderAddress: O,
                        recipientAddress: _,
                        primaryCurrency: k,
                        isEarliestNonce: n,
                        transactionGroup: t,
                        transactionStatus: () =>
                          a.default.createElement(i.default, {
                            isPending: A,
                            isEarliestNonce: n,
                            date: P,
                            status: R,
                            statusOnly: !0,
                          }),
                        chainId: r,
                      })
                  );
                }
                T.propTypes = {
                  smartTransaction: r.default.object.isRequired,
                  isEarliestNonce: r.default.bool,
                  transactionGroup: r.default.object,
                  chainId: r.default.string,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-list-item/smart-transaction-list-item.component.js',
      },
    ],
    [
      6313,
      {
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors': 5874,
        '../../../contexts/gasFee': 6831,
        '../../../contexts/metametrics': 6836,
        '../../../contexts/transaction-modal': 6840,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/transactions.util': 6919,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/bridge/useBridgeTxHistoryData': 6934,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useShouldShowSpeedUp': 7006,
        '../../../hooks/useTransactionDisplayData': 7019,
        '../../../pages/bridge/transaction-details/bridge-activity-item-tx-segments': 7064,
        '../../../pages/confirmations/components/advanced-gas-fee-popover': 7102,
        '../../../pages/confirmations/components/edit-gas-fee-popover': 7228,
        '../../../pages/confirmations/components/edit-gas-popover': 7235,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../multichain': 6574,
        '../../ui/button': 6707,
        '../cancel-button': 5970,
        '../cancel-speedup-popover': 5972,
        '../transaction-icon': 6306,
        '../transaction-list-item-details': 6308,
        '../transaction-status-label/transaction-status-label': 6316,
        '@metamask/transaction-controller': 2946,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = U(t);
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
                  r = F(e('prop-types')),
                  o = F(e('classnames')),
                  i = e('react-router-dom'),
                  s = e('react-redux'),
                  l = e('@metamask/transaction-controller'),
                  c = e('../../../hooks/useTransactionDisplayData'),
                  u = e('../../../hooks/useI18nContext'),
                  d = F(e('../cancel-speedup-popover')),
                  p = F(e('../transaction-list-item-details')),
                  m = e('../../../helpers/constants/routes'),
                  f = e('../../../hooks/useShouldShowSpeedUp'),
                  h = F(e('../transaction-status-label/transaction-status-label')),
                  y = F(e('../transaction-icon')),
                  g = e('../../../helpers/constants/design-system'),
                  b = e('../../component-library'),
                  v = e('../../../../shared/constants/metametrics'),
                  T = e('../../../../shared/constants/transaction'),
                  E = e('../../../../shared/constants/gas'),
                  w = e('../../../contexts/gasFee'),
                  S = e('../../../contexts/transaction-modal'),
                  x = e('../../../selectors'),
                  C = e('../../../helpers/utils/transactions.util'),
                  k = e('../../../helpers/utils/util'),
                  _ = F(e('../../ui/button')),
                  A = F(e('../../../pages/confirmations/components/advanced-gas-fee-popover')),
                  O = F(e('../cancel-button')),
                  I = F(e('../../../pages/confirmations/components/edit-gas-fee-popover')),
                  N = F(e('../../../pages/confirmations/components/edit-gas-popover')),
                  M = e('../../../contexts/metametrics'),
                  P = e('../../multichain'),
                  R = e('../../../store/actions'),
                  B = e('../../../../shared/modules/selectors'),
                  D = e('../../../hooks/bridge/useBridgeTxHistoryData'),
                  j = F(
                    e('../../../pages/bridge/transaction-details/bridge-activity-item-tx-segments')
                  ),
                  L = e('../../../../shared/constants/network');
                function F(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function U(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (U = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function $() {
                  return (
                    ($ = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    $.apply(null, arguments)
                  );
                }
                function V({
                  transactionGroup: e,
                  setEditGasMode: t,
                  isEarliestNonce: n = !1,
                  chainId: r,
                }) {
                  const d = (0, u.useI18nContext)(),
                    x = (0, i.useHistory)(),
                    { hasCancelled: C } = e,
                    [A, I] = (0, a.useState)(!1),
                    [F, U] = (0, a.useState)(!1),
                    [$, V] = (0, a.useState)(!1),
                    { supportsEIP1559: H } = (0, w.useGasFeeContext)(),
                    { openModal: z } = (0, S.useTransactionModalContext)(),
                    W = (0, s.useSelector)(B.getIsSmartTransaction),
                    G = (0, s.useDispatch)(),
                    Y = e.initialTransaction.type === l.TransactionType.bridge,
                    {
                      bridgeTxHistoryItem: q,
                      isBridgeComplete: K,
                      showBridgeTxDetails: Q,
                    } = (0, D.useBridgeTxHistoryData)({ transactionGroup: e, isEarliestNonce: n }),
                    {
                      initialTransaction: { id: J },
                      primaryTransaction: { error: X, status: Z },
                    } = e,
                    ee = (0, a.useContext)(M.MetaMetricsContext),
                    te = (0, a.useCallback)(
                      async e => {
                        e.stopPropagation(),
                          ee({
                            event: 'Clicked "Speed Up"',
                            category: v.MetaMetricsEventCategory.Navigation,
                            properties: { action: 'Activity Log', legacy_event: !0 },
                          }),
                          H ? (t(E.EditGasModes.speedUp), z('cancelSpeedUpTransaction')) : V(!0);
                      },
                      [z, t, ee, H]
                    ),
                    ne = (0, a.useCallback)(
                      e => {
                        e.stopPropagation(),
                          ee({
                            event: 'Clicked "Cancel"',
                            category: v.MetaMetricsEventCategory.Navigation,
                            properties: { action: 'Activity Log', legacy_event: !0 },
                          }),
                          Z === l.TransactionStatus.approved
                            ? G((0, R.abortTransactionSigning)(J))
                            : H
                              ? (t(E.EditGasModes.cancel), z('cancelSpeedUpTransaction'))
                              : U(!0);
                      },
                      [ee, z, t, H, Z, G, J]
                    ),
                    ae = (0, f.useShouldShowSpeedUp)(e, n),
                    {
                      title: re,
                      category: oe,
                      primaryCurrency: ie,
                      recipientAddress: se,
                      secondaryCurrency: le,
                      displayedStatusKey: ce,
                      isPending: ue,
                      senderAddress: de,
                    } = (0, c.useTransactionDisplayData)(e),
                    pe = (0, k.formatDateWithYearContext)(
                      e.primaryTransaction.time,
                      'MMM d, y',
                      'MMM d'
                    ),
                    me = oe === T.TransactionGroupCategory.signatureRequest,
                    fe = oe === T.TransactionGroupCategory.approval,
                    he = Z === l.TransactionStatus.unapproved,
                    ye = [
                      T.TransactionGroupCategory.swap,
                      T.TransactionGroupCategory.swapAndSend,
                    ].includes(oe),
                    ge = Z === l.TransactionStatus.approved,
                    be = Z === l.TransactionStatus.signed,
                    ve = (0, o.default)('transaction-list-item', {
                      'transaction-list-item--unconfirmed':
                        ue ||
                        [
                          l.TransactionStatus.failed,
                          l.TransactionStatus.dropped,
                          l.TransactionStatus.rejected,
                        ].includes(ce),
                    }),
                    Te = (0, a.useCallback)(() => {
                      he
                        ? x.push(`${m.CONFIRM_TRANSACTION_ROUTE}/${J}`)
                        : I(
                            e => (
                              ee({
                                event: e
                                  ? v.MetaMetricsEventName.ActivityDetailsClosed
                                  : v.MetaMetricsEventName.ActivityDetailsOpened,
                                category: v.MetaMetricsEventCategory.Navigation,
                                properties: { activity_type: oe },
                              }),
                              !e
                            )
                          );
                    }, [he, x, J, ee, oe]),
                    Ee = (0, a.useMemo)(
                      () =>
                        !ae || !ue || he || ge || be
                          ? null
                          : a.default.createElement(
                              _.default,
                              {
                                'data-testid': 'speed-up-button',
                                type: 'primary',
                                onClick: C ? ne : te,
                                style: C ? { width: 'auto' } : null,
                              },
                              d(C ? 'speedUpCancellation' : 'speedUp')
                            ),
                      [ae, he, d, ue, ge, be, C, te, ne]
                    ),
                    we = !C && ue && !he && !be && !Y;
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      P.ActivityListItem,
                      {
                        'data-testid': 'activity-list-item',
                        onClick: Y && Q ? Q : Te,
                        className: ve,
                        title: re,
                        icon: a.default.createElement(
                          b.BadgeWrapper,
                          {
                            anchorElementShape: b.BadgeWrapperAnchorElementShape.circular,
                            display: g.Display.Block,
                            badge: a.default.createElement(b.AvatarNetwork, {
                              className: 'activity-tx__network-badge',
                              'data-testid': 'activity-tx-network-badge',
                              size: b.AvatarNetworkSize.Xs,
                              name: L.NETWORK_TO_NAME_MAP[r],
                              src: L.CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP[r],
                              borderColor: g.BackgroundColor.backgroundDefault,
                              backgroundColor: (e => {
                                switch (!0) {
                                  case e === l.CHAIN_IDS.GOERLI:
                                    return g.BackgroundColor.goerli;
                                  case e === l.CHAIN_IDS.SEPOLIA:
                                    return g.BackgroundColor.sepolia;
                                  default:
                                    return undefined;
                                }
                              })(r),
                            }),
                          },
                          a.default.createElement(y.default, { category: oe, status: ce })
                        ),
                        subtitle:
                          D.FINAL_NON_CONFIRMED_STATUSES.includes(Z) || !Y || K
                            ? a.default.createElement(h.default, {
                                statusOnly: !0,
                                isPending: ue,
                                isEarliestNonce: n,
                                error: X,
                                date: pe,
                                status: ce,
                              })
                            : a.default.createElement(j.default, {
                                bridgeTxHistoryItem: q,
                                transactionGroup: e,
                              }),
                        rightContent:
                          !me &&
                          !fe &&
                          a.default.createElement(
                            a.default.Fragment,
                            null,
                            a.default.createElement(
                              b.Text,
                              {
                                variant: g.TextVariant.bodyLgMedium,
                                fontWeight: g.FontWeight.Medium,
                                color: g.Color.textDefault,
                                title: ie,
                                textAlign: g.TextAlign.Right,
                                'data-testid': 'transaction-list-item-primary-currency',
                                className: 'activity-list-item__primary-currency',
                                ellipsis: !0,
                              },
                              ie
                            ),
                            a.default.createElement(
                              b.Text,
                              {
                                variant: g.TextVariant.bodyMd,
                                color: g.Color.textAlternative,
                                textAlign: g.TextAlign.Right,
                                'data-testid': 'transaction-list-item-secondary-currency',
                              },
                              le
                            )
                          ),
                      },
                      Boolean(we || Ee) &&
                        a.default.createElement(
                          b.Box,
                          { paddingTop: 4, className: 'transaction-list-item__pending-actions' },
                          we &&
                            a.default.createElement(O.default, {
                              'data-testid': 'cancel-button',
                              transaction: e.primaryTransaction,
                              cancelTransaction: ne,
                            }),
                          Ee
                        )
                    ),
                    A &&
                      a.default.createElement(p.default, {
                        title: re,
                        onClose: Te,
                        transactionGroup: e,
                        primaryCurrency: ie,
                        senderAddress: de,
                        recipientAddress: se,
                        onRetry: te,
                        showRetry: Z === l.TransactionStatus.failed && !ye && !W,
                        showSpeedUp: ae,
                        isEarliestNonce: n,
                        onCancel: ne,
                        transactionStatus: () =>
                          a.default.createElement(h.default, {
                            isPending: ue,
                            isEarliestNonce: n,
                            error: X,
                            date: pe,
                            status: ce,
                            statusOnly: !0,
                          }),
                        chainId: r,
                      }),
                    !H &&
                      $ &&
                      a.default.createElement(N.default, {
                        onClose: () => V(!1),
                        mode: E.EditGasModes.speedUp,
                        transaction: e.primaryTransaction,
                      }),
                    !H &&
                      F &&
                      a.default.createElement(N.default, {
                        onClose: () => U(!1),
                        mode: E.EditGasModes.cancel,
                        transaction: e.primaryTransaction,
                      })
                  );
                }
                V.propTypes = {
                  transactionGroup: r.default.object.isRequired,
                  isEarliestNonce: r.default.bool,
                  setEditGasMode: r.default.func,
                  chainId: r.default.string,
                };
                const H = e => {
                  const { transactionGroup: t } = e,
                    [n, r] = (0, a.useState)(),
                    o = t.primaryTransaction,
                    i =
                      (0, s.useSelector)(x.checkNetworkAndAccountSupports1559) &&
                      !(0, C.isLegacyTransaction)(null == o ? void 0 : o.txParams);
                  return a.default.createElement(
                    w.GasFeeContextProvider,
                    { transaction: t.primaryTransaction, editGasMode: n },
                    a.default.createElement(
                      S.TransactionModalContextProvider,
                      null,
                      a.default.createElement(V, $({}, e, { setEditGasMode: r })),
                      i &&
                        a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(d.default, null),
                          a.default.createElement(I.default, null),
                          a.default.createElement(A.default, null)
                        )
                    )
                  );
                };
                H.propTypes = { transactionGroup: r.default.object.isRequired };
                n.default = H;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-list-item/transaction-list-item.component.js',
      },
    ],
    [
      6314,
      { './transaction-list.component': 6315 },
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
                  r = (a = e('./transaction-list.component')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/transaction-list/index.js' },
    ],
    [
      6315,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/network': 5804,
        '../../../../shared/constants/swaps': 5815,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/lib/trace': 5849,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../../shared/modules/string-utils': 5878,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/ramps': 6862,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/transactions': 6884,
        '../../../helpers/utils/multichain/blockExplorer': 6909,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/bridge/useSolanaBridgeTransactionMapping': 6941,
        '../../../hooks/useAccountTotalFiatBalance': 6966,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../hooks/useMultichainTransactionDisplay': 6994,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../selectors/multichain/networks': 7606,
        '../../../selectors/transactions': 7617,
        '../../component-library': 6402,
        '../../multichain': 6574,
        '../../multichain/menu-items/view-explorer-menu-item': 6577,
        '../../multichain/network-filter-menu': 6586,
        '../../multichain/ramps-card/ramps-card': 6684,
        '../multichain-bridge-transaction-details-modal/multichain-bridge-transaction-details-modal': 6102,
        '../multichain-bridge-transaction-list-item/multichain-bridge-transaction-list-item': 6103,
        '../multichain-transaction-details-modal': 6105,
        '../multichain-transaction-details-modal/helpers': 6104,
        '../transaction-icon': 6306,
        '../transaction-list-item': 6311,
        '../transaction-list-item/smart-transaction-list-item.component': 6312,
        '../transaction-status-label/transaction-status-label': 6316,
        '@metamask/keyring-api': 2014,
        '@metamask/transaction-controller': 2946,
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
                  (n.default = ae),
                  (n.filterTransactionsByToken = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = G(t);
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
                  r = W(e('prop-types')),
                  o = e('react-redux'),
                  i = e('@metamask/transaction-controller'),
                  s = e('@metamask/keyring-api'),
                  l = e('../../../selectors/transactions'),
                  c = e('../../../../shared/modules/selectors/networks'),
                  u = e('../../../selectors'),
                  d = W(e('../../../hooks/bridge/useSolanaBridgeTransactionMapping')),
                  p = W(
                    e(
                      '../multichain-bridge-transaction-list-item/multichain-bridge-transaction-list-item'
                    )
                  ),
                  m = W(
                    e(
                      '../multichain-bridge-transaction-details-modal/multichain-bridge-transaction-details-modal'
                    )
                  ),
                  f = e('../../../hooks/useI18nContext'),
                  h = W(e('../transaction-list-item')),
                  y = W(e('../transaction-list-item/smart-transaction-list-item.component')),
                  g = e('../../../helpers/constants/transactions'),
                  b = e('../../../../shared/constants/swaps'),
                  v = e('../../../../shared/modules/string-utils'),
                  T = e('../../../hooks/useMultichainSelector'),
                  E = e('../../../selectors/multichain'),
                  w = e('../../../selectors/multichain/networks'),
                  S = e('../../component-library'),
                  x = W(e('../transaction-icon')),
                  C = W(e('../transaction-status-label/transaction-status-label')),
                  k = e('../multichain-transaction-details-modal'),
                  _ = e('../multichain-transaction-details-modal/helpers'),
                  A = e('../../../helpers/constants/design-system'),
                  O = e('../../../helpers/utils/util'),
                  I = e('../../../hooks/useAccountTotalFiatBalance'),
                  N = e('../../multichain/ramps-card/ramps-card'),
                  M = e('../../../ducks/ramps'),
                  P = e('../../multichain/menu-items/view-explorer-menu-item'),
                  R = e('../../../helpers/utils/multichain/blockExplorer'),
                  B = e('../../multichain'),
                  D = e('../../../contexts/metametrics'),
                  j = e('../../../hooks/useMultichainTransactionDisplay'),
                  L = e('../../../../shared/constants/transaction'),
                  F = e('../../../../shared/lib/trace'),
                  U = e('../../../../shared/constants/network'),
                  $ = e('../../../../shared/constants/multichain/networks'),
                  V = e('../../../../app/scripts/lib/util'),
                  H = e('../../../../shared/constants/app'),
                  z = e('../../multichain/network-filter-menu');
                function W(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function G(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (G = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function Y() {
                  return (
                    (Y = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    Y.apply(null, arguments)
                  );
                }
                const q = 10,
                  K = ({
                    initialTransaction: {
                      type: e,
                      destinationTokenSymbol: t,
                      sourceTokenSymbol: n,
                    },
                  }) =>
                    !g.TOKEN_CATEGORY_HASH[e] &&
                    (![i.TransactionType.swap, i.TransactionType.swapAndSend].includes(e) ||
                      'ETH' === t ||
                      'ETH' === n),
                  Q = (e, t, n, a) =>
                    t
                      ? e.filter(K)
                      : n
                        ? e.filter(
                            (
                              (e, t) =>
                              ({ initialTransaction: { txParams: n } }) =>
                                (0, v.isEqualCaseInsensitive)(null == n ? void 0 : n.to, e) ||
                                ((null == n ? void 0 : n.to) ===
                                  b.SWAPS_CHAINID_CONTRACT_ADDRESS_MAP[t] &&
                                  n.data.match(e.slice(2)))
                            )(n, a)
                          )
                        : e,
                  J = (e, t, n) => {
                    return t
                      ? e.filter(K)
                      : n
                        ? e.filter(
                            ((a = n),
                            ({ initialTransaction: { txParams: e } }) =>
                              (0, v.isEqualCaseInsensitive)(null == e ? void 0 : e.to, a) ||
                              ((null == e ? void 0 : e.to) ===
                                b.SWAPS_CHAINID_CONTRACT_ADDRESS_MAP &&
                                e.data.match(a.slice(2))))
                          )
                        : e;
                    var a;
                  },
                  X = (e, t) => {
                    const n = [];
                    return e
                      ? (e.forEach(e => {
                          const a = t(e),
                            r = (0, O.formatDateWithYearContext)(a, 'MMM d, y', 'MMM d'),
                            o = n.find(e => e.date === r);
                          o
                            ? (o.transactionGroups.push(e),
                              o.transactionGroups.sort((e, n) => {
                                const a = t(e);
                                return t(n) - a;
                              }))
                            : n.push({ date: r, dateMillis: a, transactionGroups: [e] }),
                            n.sort((e, t) => t.dateMillis - e.dateMillis);
                        }),
                        n)
                      : n;
                  },
                  Z = e => X(e, e => e.primaryTransaction.time),
                  ee = e => X(null == e ? void 0 : e.transactions, e => 1e3 * e.timestamp),
                  te = (e = { transactions: [] }, t) => {
                    if (!t) return e;
                    const n = (e.transactions || []).filter(e =>
                      e.to.some(e => e.asset.type === t)
                    );
                    return { ...e, transactions: n };
                  };
                n.filterTransactionsByToken = te;
                const ne = e => (
                  (e.transactionGroups = e.transactionGroups.filter(
                    e => e.transactions.length > 0
                  )),
                  e
                );
                function ae({
                  hideTokenTransactions: e,
                  tokenAddress: t,
                  boxProps: n,
                  hideNetworkFilter: r,
                }) {
                  const [g, b] = (0, a.useState)(q),
                    v = (0, f.useI18nContext)(),
                    x = (0, o.useSelector)(u.getCurrentNetwork),
                    C = (0, o.useSelector)(u.getIsTokenNetworkFilterEqualCurrentNetwork),
                    _ = (0, o.useSelector)(u.getSelectedAccount),
                    [O, B] = (0, a.useState)(null),
                    j = (0, o.useSelector)(E.getSelectedAccountMultichainTransactions),
                    L = te(j, t),
                    $ = (0, d.default)(L),
                    W = (0, o.useSelector)(l.nonceSortedPendingTransactionsSelector),
                    G = (0, o.useSelector)(l.nonceSortedPendingTransactionsSelectorAllChains),
                    K = (0, a.useMemo)(() => (C ? W : G), [C, G, W]),
                    X = (0, a.useMemo)(() => U.TEST_CHAINS.includes(x.chainId), [x.chainId]),
                    ae = (0, o.useSelector)(l.nonceSortedCompletedTransactionsSelector),
                    oe = (0, o.useSelector)(l.nonceSortedCompletedTransactionsSelectorAllChains),
                    ie = (0, a.useMemo)(() => (C ? ae : oe), [C, oe, ae]),
                    se = (0, o.useSelector)(c.getCurrentChainId),
                    le = (0, o.useSelector)(w.getIsEvmMultichainNetworkSelected),
                    ce = (0, o.useSelector)(u.getShouldHideZeroBalanceTokens),
                    { totalFiatBalance: ue } = (0, I.useAccountTotalFiatBalance)(_, ce),
                    de = 0 === Number(ue),
                    pe = (0, o.useSelector)(M.getIsNativeTokenBuyable) && de,
                    [me, fe] = (0, a.useState)(!1),
                    he = (0, V.getEnvironmentType)(),
                    ye = he !== H.ENVIRONMENT_TYPE_NOTIFICATION && he !== H.ENVIRONMENT_TYPE_POPUP,
                    ge = (e, t) =>
                      0 === e
                        ? a.default.createElement(
                            S.Text,
                            {
                              paddingTop: 2,
                              paddingInline: 4,
                              variant: A.TextVariant.bodyMd,
                              color: A.TextColor.textAlternative,
                              key: t.dateMillis,
                            },
                            t.date
                          )
                        : null,
                    be = (0, a.useMemo)(() => Z(Q(K, e, t, se)), [e, t, K, se]),
                    ve = (0, a.useMemo)(() => Z(J(ie, e, t)), [e, t, ie]),
                    Te = (0, a.useCallback)(() => b(e => e + q), []),
                    Ee = (0, a.useCallback)(() => {
                      fe(!me);
                    }, [me]),
                    we = (0, a.useCallback)(() => {
                      fe(!1);
                    }, []),
                    Se = (0, a.useCallback)(
                      () =>
                        r
                          ? null
                          : le
                            ? a.default.createElement(z.NetworkFilterComponent, {
                                isFullScreen: ye,
                                toggleNetworkFilterPopover: Ee,
                                isTestNetwork: X,
                                currentNetworkConfig: x,
                                isNetworkFilterPopoverOpen: me,
                                closePopover: we,
                                isTokenNetworkFilterEqualCurrentNetwork: C,
                              })
                            : null,
                      [r, le, ye, me, x, C, Ee, we, X]
                    );
                  (0, a.useEffect)(() => {
                    (0, F.endTrace)({ name: F.TraceName.AccountOverviewActivityTab });
                  }, []);
                  const xe = (0, a.useCallback)((e = null) => {
                      B(e);
                    }, []),
                    Ce = (0, o.useSelector)(w.getSelectedMultichainNetworkConfiguration),
                    ke = (0, T.useMultichainSelector)(E.getMultichainNetwork, _),
                    _e = (0, a.useContext)(D.MetaMetricsContext);
                  if (!(0, s.isEvmAccountType)(_.type)) {
                    const e = (0, R.getMultichainAccountUrl)(_.address, ke),
                      t = 'Activity Tab';
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      O &&
                        (O.isBridgeTx && O.bridgeInfo
                          ? a.default.createElement(m.default, {
                              transaction: O,
                              onClose: () => xe(null),
                            })
                          : a.default.createElement(k.MultichainTransactionDetailsModal, {
                              transaction: O,
                              onClose: () => xe(null),
                              userAddress: _.address,
                              networkConfig: Ce,
                            })),
                      a.default.createElement(
                        S.Box,
                        Y({ className: 'transaction-list' }, n),
                        a.default.createElement(
                          S.Box,
                          { className: 'transaction-list__transactions' },
                          (null == j ? void 0 : j.transactions.length) > 0
                            ? a.default.createElement(
                                S.Box,
                                { className: 'transaction-list__completed-transactions' },
                                ee($ || L).map(e =>
                                  a.default.createElement(
                                    a.Fragment,
                                    { key: e.date },
                                    a.default.createElement(
                                      S.Text,
                                      {
                                        paddingTop: 4,
                                        paddingInline: 4,
                                        variant: A.TextVariant.bodyMd,
                                        color: A.TextColor.textDefault,
                                      },
                                      e.date
                                    ),
                                    e.transactionGroups.map(e =>
                                      e.isBridgeOriginated || (e.isBridgeTx && e.bridgeInfo)
                                        ? a.default.createElement(p.default, {
                                            key: `bridge-${e.id}`,
                                            transaction: e,
                                            toggleShowDetails: xe,
                                          })
                                        : a.default.createElement(re, {
                                            key: `${e.id}`,
                                            transaction: e,
                                            networkConfig: Ce,
                                            toggleShowDetails: xe,
                                          })
                                    )
                                  )
                                ),
                                a.default.createElement(
                                  S.Box,
                                  { className: 'transaction-list__view-on-block-explorer' },
                                  a.default.createElement(
                                    S.Button,
                                    {
                                      display: A.Display.Flex,
                                      variant: S.ButtonVariant.Primary,
                                      size: S.ButtonSize.Sm,
                                      endIconName: S.IconName.Export,
                                      onClick: () => (0, P.openBlockExplorer)(e, t, _e),
                                    },
                                    v('viewOnBlockExplorer')
                                  )
                                )
                              )
                            : a.default.createElement(
                                S.Box,
                                { className: 'transaction-list__empty' },
                                a.default.createElement(
                                  S.Box,
                                  { className: 'transaction-list__empty-text' },
                                  v('noTransactions')
                                )
                              )
                        )
                      )
                    );
                  }
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    pe
                      ? a.default.createElement(N.RampsCard, {
                          variant: N.RAMPS_CARD_VARIANT_TYPES.ACTIVITY,
                        })
                      : null,
                    a.default.createElement(
                      S.Box,
                      Y({ className: 'transaction-list' }, n),
                      Se(),
                      a.default.createElement(
                        S.Box,
                        { className: 'transaction-list__transactions' },
                        be.length > 0 &&
                          a.default.createElement(
                            S.Box,
                            { className: 'transaction-list__pending-transactions' },
                            be.map(e =>
                              e.transactionGroups.map((t, n) => {
                                var r;
                                return null !== (r = t.initialTransaction) &&
                                  void 0 !== r &&
                                  r.isSmartTransaction
                                  ? a.default.createElement(
                                      a.Fragment,
                                      { key: `${t.nonce}:${n}` },
                                      ge(n, e),
                                      a.default.createElement(y.default, {
                                        isEarliestNonce: 0 === n,
                                        smartTransaction: t.initialTransaction,
                                        transactionGroup: t,
                                        chainId: t.initialTransaction.chainId,
                                      })
                                    )
                                  : a.default.createElement(
                                      a.Fragment,
                                      { key: `${t.nonce}:${n}` },
                                      ge(n, e),
                                      a.default.createElement(h.default, {
                                        isEarliestNonce: 0 === n,
                                        transactionGroup: t,
                                        chainId: t.initialTransaction.chainId,
                                      })
                                    );
                              })
                            )
                          ),
                        a.default.createElement(
                          S.Box,
                          { className: 'transaction-list__completed-transactions' },
                          ve.length > 0
                            ? ve
                                .map(
                                  e => (
                                    (e.transactionGroups = e.transactionGroups.map(
                                      e => (
                                        (e.transactions = e.transactions.filter(
                                          e =>
                                            !(e =>
                                              e.type === i.TransactionType.incoming &&
                                              e.txParams.to.toLowerCase() !==
                                                _.address.toLowerCase())(e)
                                        )),
                                        e
                                      )
                                    )),
                                    e
                                  )
                                )
                                .map(ne)
                                .filter(e => e.transactionGroups.length > 0)
                                .slice(0, g)
                                .map(e =>
                                  e.transactionGroups.map((t, n) => {
                                    var r;
                                    return a.default.createElement(
                                      a.Fragment,
                                      {
                                        key: `${t.nonce}:${t.initialTransaction ? n : g + n - 10}`,
                                      },
                                      ge(n, e),
                                      null !== (r = t.initialTransaction) &&
                                        void 0 !== r &&
                                        r.isSmartTransaction
                                        ? a.default.createElement(y.default, {
                                            transactionGroup: t,
                                            smartTransaction: t.initialTransaction,
                                            chainId: t.initialTransaction.chainId,
                                          })
                                        : a.default.createElement(h.default, {
                                            transactionGroup: t,
                                            chainId: t.initialTransaction.chainId,
                                          })
                                    );
                                  })
                                )
                            : null,
                          ve.length > g &&
                            a.default.createElement(
                              S.Button,
                              {
                                className: 'transaction-list__view-more',
                                type: 'secondary',
                                onClick: Te,
                              },
                              v('viewMore')
                            )
                        )
                      )
                    )
                  );
                }
                const re = ({ transaction: e, networkConfig: t, toggleShowDetails: n }) => {
                  const r = (0, f.useI18nContext)(),
                    {
                      from: o,
                      to: i,
                      type: l,
                      timestamp: c,
                      isRedeposit: u,
                      title: d,
                    } = (0, j.useMultichainTransactionDisplay)(e, t),
                    p = $.MULTICHAIN_TOKEN_IMAGE_MAP[e.chain],
                    m = j.KEYRING_TRANSACTION_STATUS_KEY[e.status];
                  if (u)
                    return a.default.createElement(B.ActivityListItem, {
                      className: 'custom-class',
                      'data-testid': 'activity-list-item',
                      onClick: () => n(e),
                      icon: a.default.createElement(
                        S.BadgeWrapper,
                        {
                          anchorElementShape: S.BadgeWrapperAnchorElementShape.circular,
                          display: A.Display.Block,
                          badge: a.default.createElement(S.AvatarNetwork, {
                            className: 'activity-tx__network-badge',
                            'data-testid': 'activity-tx-network-badge',
                            size: S.AvatarNetworkSize.Xs,
                            name: e.chain,
                            src: p,
                            borderColor: A.BackgroundColor.backgroundDefault,
                          }),
                        },
                        a.default.createElement(x.default, {
                          category: L.TransactionGroupCategory.redeposit,
                          status: m,
                        })
                      ),
                      title: r('redeposit'),
                      subtitle: a.default.createElement(C.default, {
                        date: (0, _.formatTimestamp)(c),
                        error: {},
                        status: m,
                        statusOnly: !0,
                      }),
                    });
                  let { amount: h, unit: y } = i ?? {},
                    g = l;
                  return (
                    l === s.TransactionType.Swap && ((h = o.amount), (y = o.unit)),
                    l === s.TransactionType.Unknown && (g = L.TransactionGroupCategory.interaction),
                    a.default.createElement(B.ActivityListItem, {
                      className: 'custom-class',
                      'data-testid': 'activity-list-item',
                      onClick: () => n(e),
                      icon: a.default.createElement(
                        S.BadgeWrapper,
                        {
                          anchorElementShape: S.BadgeWrapperAnchorElementShape.circular,
                          display: A.Display.Block,
                          badge: a.default.createElement(S.AvatarNetwork, {
                            className: 'activity-tx__network-badge',
                            'data-testid': 'activity-tx-network-badge',
                            size: S.AvatarNetworkSize.Xs,
                            name: e.chain,
                            src: p,
                            borderColor: A.BackgroundColor.backgroundDefault,
                          }),
                        },
                        a.default.createElement(x.default, { category: g, status: m })
                      ),
                      rightContent: a.default.createElement(
                        S.Text,
                        {
                          className: 'activity-list-item__primary-currency',
                          color: 'text-default',
                          'data-testid': 'transaction-list-item-primary-currency',
                          ellipsis: !0,
                          fontWeight: 'medium',
                          textAlign: 'right',
                          title: 'Primary Currency',
                          variant: 'body-lg-medium',
                        },
                        h,
                        ' ',
                        y
                      ),
                      title: d,
                      subtitle: a.default.createElement(C.default, {
                        date: (0, _.formatTimestamp)(e.timestamp),
                        error: {},
                        status: m,
                        statusOnly: !0,
                      }),
                    })
                  );
                };
                (re.propTypes = {
                  transaction: r.default.object.isRequired,
                  networkConfig: r.default.object.isRequired,
                  toggleShowDetails: r.default.func.isRequired,
                }),
                  (ae.propTypes = {
                    hideTokenTransactions: r.default.bool,
                    tokenAddress: r.default.string,
                    boxProps: r.default.object,
                    tokenChainId: r.default.string,
                    hideNetworkFilter: r.default.bool,
                  }),
                  (ae.defaultProps = {
                    hideTokenTransactions: !1,
                    tokenAddress: undefined,
                    boxProps: undefined,
                    tokenChainId: null,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-list/transaction-list.component.js',
      },
    ],
    [
      6316,
      {
        '../../../../shared/constants/transaction': 5819,
        '../../../hooks/useI18nContext': 6985,
        '../../ui/tooltip': 6818,
        '@metamask/transaction-controller': 2946,
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
                var a = u(e('react')),
                  r = u(e('prop-types')),
                  o = u(e('classnames')),
                  i = e('@metamask/transaction-controller'),
                  s = u(e('../../ui/tooltip')),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../../shared/constants/transaction');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const d = 'queued',
                  p = 'signing',
                  m = {
                    [i.TransactionStatus.submitted]: c.TransactionGroupStatus.pending,
                    [i.TransactionStatus.approved]: c.TransactionGroupStatus.pending,
                  },
                  f = {
                    [i.TransactionStatus.unapproved]: 'transaction-status-label--unapproved',
                    [i.TransactionStatus.rejected]: 'transaction-status-label--rejected',
                    [i.TransactionStatus.failed]: 'transaction-status-label--failed',
                    [i.TransactionStatus.dropped]: 'transaction-status-label--dropped',
                    [c.TransactionGroupStatus.cancelled]: 'transaction-status-label--cancelled',
                    [d]: 'transaction-status-label--queued',
                    [c.TransactionGroupStatus.pending]: 'transaction-status-label--pending',
                  };
                function h({
                  status: e,
                  date: t,
                  error: n,
                  isEarliestNonce: r,
                  className: u,
                  statusOnly: h,
                }) {
                  var y;
                  const g = (0, l.useI18nContext)(),
                    b = (function (e, t) {
                      return e === i.TransactionStatus.approved
                        ? p
                        : m[e]
                          ? t
                            ? c.TransactionGroupStatus.pending
                            : d
                          : e;
                    })(e, r),
                    v =
                      (null == n || null === (y = n.rpc) || void 0 === y ? void 0 : y.message) ||
                      (null == n ? void 0 : n.message);
                  let T = b && g(b);
                  return (
                    b !== i.TransactionStatus.confirmed || h || (T = t),
                    a.default.createElement(
                      s.default,
                      {
                        position: 'top',
                        title: v,
                        wrapperClassName: (0, o.default)(
                          'transaction-status-label',
                          `transaction-status-label--${b}`,
                          u,
                          f[b]
                        ),
                      },
                      T
                    )
                  );
                }
                h.propTypes = {
                  status: r.default.string,
                  className: r.default.string,
                  date: r.default.string,
                  error: r.default.object,
                  isEarliestNonce: r.default.bool,
                  statusOnly: r.default.bool,
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/transaction-status-label/transaction-status-label.js',
      },
    ],
    [
      6317,
      { './user-preferenced-currency-display.component': 6318 },
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
                    (a = e('./user-preferenced-currency-display.component')) && a.__esModule
                      ? a
                      : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/user-preferenced-currency-display/index.js' },
    ],
    [
      6318,
      {
        '../../../../shared/constants/common': 5791,
        '../../../helpers/constants/common': 6870,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../hooks/useUserPreferencedCurrency': 7020,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../component-library': 6402,
        '../../ui/currency-display': 6720,
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
                  r = f(e('prop-types')),
                  o = e('react-redux'),
                  i = e('../../../../shared/constants/common'),
                  s = e('../../../helpers/constants/common'),
                  l = f(e('../../ui/currency-display')),
                  c = e('../../../hooks/useUserPreferencedCurrency'),
                  u = e('../../component-library'),
                  d = e('../../../selectors/multichain'),
                  p = e('../../../hooks/useMultichainSelector'),
                  m = e('../../../selectors');
                function f(e) {
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
                function g({
                  'data-testid': e,
                  account: t,
                  ethNumberOfDecimals: n,
                  fiatNumberOfDecimals: r,
                  numberOfDecimals: i,
                  showEthLogo: s,
                  type: f,
                  showFiat: h,
                  showNative: g,
                  shouldCheckShowNativeToken: b,
                  showCurrencySuffix: v,
                  privacyMode: T = !1,
                  ...E
                }) {
                  var w;
                  const S = (0, o.useSelector)(m.getSelectedEvmInternalAccount),
                    x = t ?? S,
                    C = (0, p.useMultichainSelector)(d.getMultichainCurrentNetwork, x),
                    k = (0, p.useMultichainSelector)(d.getMultichainNativeCurrency, x),
                    { currency: _, numberOfDecimals: A } = (0, c.useUserPreferencedCurrency)(f, {
                      account: x,
                      ethNumberOfDecimals: n,
                      fiatNumberOfDecimals: r,
                      numberOfDecimals: i,
                      showFiatOverride: h,
                      showNativeOverride: g,
                      shouldCheckShowNativeToken: b,
                    }),
                    O = (0, a.useMemo)(() => {
                      var e;
                      return (
                        s &&
                        _ === k &&
                        a.default.createElement(u.AvatarNetwork, {
                          size: u.AvatarNetworkSize.Xs,
                          name: null == C ? void 0 : C.nickname,
                          src:
                            null == C || null === (e = C.rpcPrefs) || void 0 === e
                              ? void 0
                              : e.imageUrl,
                        })
                      );
                    }, [
                      _,
                      s,
                      k,
                      null == C ? void 0 : C.nickname,
                      null == C || null === (w = C.rpcPrefs) || void 0 === w ? void 0 : w.imageUrl,
                    ]);
                  return a.default.createElement(
                    l.default,
                    y({}, E, {
                      account: x,
                      currency: _,
                      'data-testid': e,
                      numberOfDecimals: A,
                      prefixComponent: O,
                      suffix: v && !s && _,
                      privacyMode: T,
                    })
                  );
                }
                const b = {
                  className: r.default.string,
                  account: r.default.object,
                  'data-testid': r.default.string,
                  prefix: r.default.string,
                  value: r.default.string,
                  numberOfDecimals: r.default.oneOfType([r.default.string, r.default.number]),
                  hideLabel: r.default.bool,
                  hideTitle: r.default.bool,
                  style: r.default.object,
                  showEthLogo: r.default.bool,
                  type: r.default.oneOf([s.PRIMARY, s.SECONDARY]),
                  ethNumberOfDecimals: r.default.oneOfType([r.default.string, r.default.number]),
                  fiatNumberOfDecimals: r.default.oneOfType([r.default.string, r.default.number]),
                  showFiat: r.default.bool,
                  showNative: r.default.bool,
                  showCurrencySuffix: r.default.bool,
                  currency: r.default.string,
                  denomination: r.default.oneOf([
                    i.EtherDenomination.GWEI,
                    i.EtherDenomination.ETH,
                  ]),
                  displayValue: r.default.string,
                  prefixComponent: r.default.node,
                  suffix: r.default.oneOfType([r.default.string, r.default.bool]),
                  prefixComponentWrapperProps: r.default.object,
                  textProps: r.default.object,
                  suffixProps: r.default.object,
                  shouldCheckShowNativeToken: r.default.bool,
                  privacyMode: r.default.bool,
                };
                g.propTypes = b;
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/user-preferenced-currency-display/user-preferenced-currency-display.component.js',
      },
    ],
    [
      6319,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useAccountTotalCrossChainFiatBalance': 6965,
        '../../../hooks/useGetFormattedTokensPerChain': 6984,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '@metamask/assets-controllers': 1353,
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
                  (n.AggregatedPercentageOverviewCrossChains = void 0);
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
                  o = e('ethereumjs-util'),
                  i = e('@metamask/assets-controllers'),
                  s = e('../../../selectors'),
                  l = e('../../../ducks/metamask/metamask'),
                  c = e('../../../../app/scripts/lib/util'),
                  u = e('../../../ducks/locale/locale'),
                  d = e('../../../helpers/constants/design-system'),
                  p = e('../../component-library'),
                  m = e('../../../helpers/utils/util'),
                  f = e('../../../hooks/useAccountTotalCrossChainFiatBalance'),
                  h = e('../../../hooks/useGetFormattedTokensPerChain');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.AggregatedPercentageOverviewCrossChains = () => {
                  const e = (0, r.useSelector)(u.getIntlLocale),
                    t = (0, r.useSelector)(l.getCurrentCurrency),
                    { privacyMode: n } = (0, r.useSelector)(s.getPreferences),
                    y = (0, r.useSelector)(s.getSelectedAccount),
                    g = (0, r.useSelector)(s.getShouldHideZeroBalanceTokens),
                    b = (0, r.useSelector)(s.getMarketData),
                    v = (0, r.useSelector)(s.getChainIdsToPoll),
                    { formattedTokensWithBalancesPerChain: T } = (0,
                    h.useGetFormattedTokensPerChain)(y, g, !1, v),
                    { totalFiatBalance: E, tokenFiatBalancesCrossChains: w } = (0,
                    f.useAccountTotalCrossChainFiatBalance)(y, T),
                    S = (0, a.useMemo)(
                      () =>
                        w.reduce((e, t) => {
                          var n;
                          const a =
                            ((r = t.chainId),
                            (s = t.tokenFiatBalances),
                            t.tokensWithBalances.reduce((e, t, n) => {
                              var a;
                              const i =
                                  null == b || null === (a = b[r]) || void 0 === a
                                    ? void 0
                                    : a[(0, o.toChecksumAddress)(t.address)],
                                l = (0, m.getCalculatedTokenAmount1dAgo)(
                                  s[n],
                                  null == i ? void 0 : i.pricePercentChange1d
                                );
                              return e + Number(l);
                            }, 0));
                          var r, s;
                          const l =
                              null == b ||
                              null === (n = b[t.chainId]) ||
                              void 0 === n ||
                              null === (n = n[(0, i.getNativeTokenAddress)(t.chainId)]) ||
                              void 0 === n
                                ? void 0
                                : n.pricePercentChange1d,
                            c = (0, m.getCalculatedTokenAmount1dAgo)(t.nativeFiatValue, l);
                          return e + a + Number(c);
                        }, 0),
                      [w, b]
                    ),
                    x = Number(E) - S,
                    C = (x / S) * 100 || 0,
                    k = (0, c.formatValue)(0 === x ? 0 : C, !0);
                  let _ = '';
                  if ((0, c.isValidAmount)(x)) {
                    _ = x >= 0 ? '+' : '';
                    const n = {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 2,
                    };
                    try {
                      _ += `${Intl.NumberFormat(e, { ...n, style: 'currency', currency: t }).format(x)} `;
                    } catch {
                      _ += `${Intl.NumberFormat(e, { ...n, minimumFractionDigits: 2, style: 'decimal' }).format(x)} `;
                    }
                  }
                  let A = d.TextColor.textDefault;
                  return (
                    (A =
                      !n && (0, c.isValidAmount)(x)
                        ? 0 === x
                          ? d.TextColor.textDefault
                          : x > 0
                            ? d.TextColor.successDefault
                            : d.TextColor.errorDefault
                        : d.TextColor.textAlternative),
                    a.default.createElement(
                      p.Box,
                      { display: d.Display.Flex },
                      a.default.createElement(
                        p.SensitiveText,
                        {
                          variant: d.TextVariant.bodyMdMedium,
                          color: A,
                          'data-testid': 'aggregated-value-change',
                          style: { whiteSpace: 'pre' },
                          isHidden: n,
                          ellipsis: !0,
                          length: '10',
                        },
                        _
                      ),
                      a.default.createElement(
                        p.SensitiveText,
                        {
                          variant: d.TextVariant.bodyMdMedium,
                          color: A,
                          'data-testid': 'aggregated-percentage-change',
                          isHidden: n,
                          ellipsis: !0,
                          length: '10',
                        },
                        k
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/wallet-overview/aggregated-percentage-overview-cross-chains.tsx',
      },
    ],
    [
      6320,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/locale/locale': 6859,
        '../../../ducks/metamask/metamask': 6860,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useAccountTotalFiatBalance': 6966,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '@metamask/assets-controllers': 1353,
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
                  (n.AggregatedPercentageOverview = void 0);
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
                  o = e('ethereumjs-util'),
                  i = e('@metamask/assets-controllers'),
                  s = e('../../../ducks/metamask/metamask'),
                  l = e('../../../selectors'),
                  c = e('../../../../shared/modules/selectors/networks'),
                  u = e('../../../hooks/useAccountTotalFiatBalance'),
                  d = e('../../../../app/scripts/lib/util'),
                  p = e('../../../ducks/locale/locale'),
                  m = e('../../../helpers/constants/design-system'),
                  f = e('../../component-library'),
                  h = e('../../../helpers/utils/util');
                function y(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (y = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.AggregatedPercentageOverview = () => {
                  const e = (0, r.useSelector)(l.getTokensMarketData),
                    t = (0, r.useSelector)(p.getIntlLocale),
                    n = (0, r.useSelector)(s.getCurrentCurrency),
                    { privacyMode: y } = (0, r.useSelector)(l.getPreferences),
                    g = (0, r.useSelector)(l.getSelectedAccount),
                    b = (0, r.useSelector)(c.getCurrentChainId),
                    v = (0, r.useSelector)(l.getShouldHideZeroBalanceTokens),
                    { totalFiatBalance: T, orderedTokenList: E } = (0,
                    u.useAccountTotalFiatBalance)(g, v),
                    w = (0, a.useMemo)(
                      () =>
                        E.reduce((t, n) => {
                          var a;
                          if (n.address) {
                            const a = null == e ? void 0 : e[(0, o.toChecksumAddress)(n.address)],
                              r = (0, h.getCalculatedTokenAmount1dAgo)(
                                n.fiatBalance,
                                null == a ? void 0 : a.pricePercentChange1d
                              );
                            return t + Number(r);
                          }
                          const r =
                              null == e ||
                              null === (a = e[(0, i.getNativeTokenAddress)(b)]) ||
                              void 0 === a
                                ? void 0
                                : a.pricePercentChange1d,
                            s = (0, h.getCalculatedTokenAmount1dAgo)(n.fiatBalance, r);
                          return t + Number(s);
                        }, 0),
                      [E, e, b]
                    ),
                    S = Number(T) - w,
                    x = (S / w) * 100 || 0,
                    C = (0, d.formatValue)(0 === S ? 0 : x, !0);
                  let k = '';
                  if ((0, d.isValidAmount)(S)) {
                    k = S >= 0 ? '+' : '';
                    const e = {
                      notation: 'compact',
                      compactDisplay: 'short',
                      maximumFractionDigits: 2,
                    };
                    try {
                      k += `${Intl.NumberFormat(t, { ...e, style: 'currency', currency: n }).format(S)} `;
                    } catch {
                      k += `${Intl.NumberFormat(t, { ...e, minimumFractionDigits: 2, style: 'decimal' }).format(S)} `;
                    }
                  }
                  let _ = m.TextColor.textAlternative;
                  return (
                    (_ =
                      !y && (0, d.isValidAmount)(S)
                        ? 0 === S
                          ? m.TextColor.textAlternative
                          : S > 0
                            ? m.TextColor.successDefault
                            : m.TextColor.errorDefault
                        : m.TextColor.textAlternative),
                    a.default.createElement(
                      f.Box,
                      { display: m.Display.Flex },
                      a.default.createElement(
                        f.SensitiveText,
                        {
                          variant: m.TextVariant.bodyMdMedium,
                          color: _,
                          'data-testid': 'aggregated-value-change',
                          style: { whiteSpace: 'pre' },
                          isHidden: y,
                          ellipsis: !0,
                          length: '10',
                        },
                        k
                      ),
                      a.default.createElement(
                        f.SensitiveText,
                        {
                          variant: m.TextVariant.bodyMdMedium,
                          color: _,
                          'data-testid': 'aggregated-percentage-change',
                          isHidden: y,
                          ellipsis: !0,
                          length: '10',
                        },
                        C
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/app/wallet-overview/aggregated-percentage-overview.tsx',
      },
    ],
    [
      6321,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../ducks/send': 6865,
        '../../../ducks/swaps/swaps': 6868,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../helpers/utils/hardware': 6903,
        '../../../hooks/bridge/useBridging': 6935,
        '../../../hooks/ramps/useRamps/useRamps': 6957,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../multichain/receive-modal': 6685,
        '../../ui/icon-button': 6744,
        '../../ui/tooltip': 6818,
        './hooks/useHandleSendNonEvm': 6324,
        '@metamask/controller-utils': 1515,
        '@metamask/keyring-api': 2014,
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
                  i = e('@metamask/controller-utils'),
                  s = e('@metamask/utils'),
                  l = e('@metamask/keyring-api'),
                  c = e('../../../contexts/i18n'),
                  u = e('../../../helpers/constants/routes'),
                  d = e('../../../selectors'),
                  p = N(e('../../ui/tooltip')),
                  m = e('../../../ducks/swaps/swaps'),
                  f = e('../../../helpers/utils/hardware'),
                  h = e('../../../../shared/constants/metametrics'),
                  y = e('../../../../shared/constants/transaction'),
                  g = e('../../../contexts/metametrics'),
                  b = e('../../../ducks/send'),
                  v = e('../../../helpers/constants/design-system'),
                  T = e('../../component-library'),
                  E = N(e('../../ui/icon-button')),
                  w = N(e('../../../hooks/ramps/useRamps/useRamps')),
                  S = N(e('../../../hooks/bridge/useBridging')),
                  x = e('../../multichain/receive-modal'),
                  C = e('../../../store/actions'),
                  k = e('../../../selectors/multichain'),
                  _ = e('../../../hooks/useMultichainSelector'),
                  A = e('../../../../shared/modules/selectors/networks'),
                  O = e('../../../../shared/constants/multichain/networks'),
                  I = e('./hooks/useHandleSendNonEvm');
                function N(e) {
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
                n.default = ({
                  account: e,
                  chainId: t,
                  trackingLocation: n,
                  isSwapsChain: N,
                  isSigningEnabled: M,
                  isBridgeChain: P,
                  isBuyableChain: R,
                  defaultSwapsToken: B,
                  classPrefix: D = 'coin',
                  iconButtonClassName: j = '',
                }) => {
                  const L = (0, a.useContext)(c.I18nContext),
                    F = (0, r.useDispatch)(),
                    U = (0, a.useContext)(g.MetaMetricsContext),
                    [$, V] = (0, a.useState)(!1),
                    { address: H } = e,
                    z = (0, o.useHistory)(),
                    W = (0, r.useSelector)(d.getNetworkConfigurationIdByChainId),
                    G = (0, r.useSelector)(A.getCurrentChainId),
                    Y = (0, I.useHandleSendNonEvm)(),
                    q = (0, o.useLocation)(),
                    K = (0, r.useSelector)(d.getCurrentKeyring),
                    Q = (0, f.isHardwareKeyring)(null == K ? void 0 : K.type),
                    { isEvmNetwork: J, chainId: X } = (0, _.useMultichainSelector)(
                      k.getMultichainNetwork,
                      e
                    ),
                    Z = (0, _.useMultichainSelector)(k.getMultichainNativeCurrency, e),
                    ee = J ? 'ETH' : Z,
                    te = (0, r.useSelector)(d.getUseExternalServices),
                    ne = !te && (0, d.isNonEvmAccount)(e),
                    ae = {
                      buyButton: [{ condition: !R, message: '' }],
                      sendButton: [{ condition: !M, message: 'methodNotSupported' }],
                      swapButton: [
                        { condition: !N, message: 'currentlyUnavailable' },
                        { condition: !M, message: 'methodNotSupported' },
                      ],
                      bridgeButton: [
                        { condition: !P, message: 'currentlyUnavailable' },
                        { condition: !M, message: 'methodNotSupported' },
                      ],
                    },
                    re = (e, t) => {
                      const n = ae[e].find(({ condition: e }) => e);
                      return null != n && n.message
                        ? a.default.createElement(
                            p.default,
                            { title: L(n.message), position: 'bottom' },
                            t
                          )
                        : t;
                    },
                    oe = e => {
                      var t;
                      const n = null === (t = e.metadata.snap) || void 0 === t ? void 0 : t.id;
                      return n ? { snap_id: n } : {};
                    },
                    { openBuyCryptoInPdapp: ie } = (0, w.default)(),
                    { openBridgeExperience: se } = (0, S.default)(),
                    le = (0, a.useCallback)(async () => {
                      if (G !== t && X !== t)
                        try {
                          const e = W[t];
                          await F((0, C.setActiveNetworkWithError)(e)),
                            await F((0, C.setSwitchedNetworkDetails)({ networkClientId: e }));
                        } catch (e) {
                          throw (
                            (console.error(
                              `Failed to switch chains.\n        Target chainId: ${t}, Current chainId: ${G}.\n        ${e}`
                            ),
                            e)
                          );
                        }
                    }, [G, t, W, F]),
                    ce = (0, a.useCallback)(async () => {
                      U(
                        {
                          event: h.MetaMetricsEventName.NavSendButtonClicked,
                          category: h.MetaMetricsEventCategory.Navigation,
                          properties: {
                            account_type: e.type,
                            token_symbol: ee,
                            location: 'Home',
                            text: 'Send',
                            chain_id: t,
                            ...oe(e),
                          },
                        },
                        { excludeMetaMetricsId: !1 }
                      ),
                        (0, l.isEvmAccountType)(e.type)
                          ? (await le(),
                            await F((0, b.startNewDraftTransaction)({ type: y.AssetType.native })),
                            z.push(u.SEND_ROUTE))
                          : await Y();
                    }, [t, e, le, Y]),
                    ue = (0, a.useCallback)(() => {
                      ie((0, s.isCaipChainId)(t) ? t : (0, i.toHex)(t)),
                        U({
                          event: h.MetaMetricsEventName.NavBuyButtonClicked,
                          category: h.MetaMetricsEventCategory.Navigation,
                          properties: {
                            account_type: e.type,
                            location: 'Home',
                            text: 'Buy',
                            chain_id: t,
                            token_symbol: B,
                            ...oe(e),
                          },
                        });
                    }, [t, B]),
                    de = (0, a.useCallback)(
                      async e => {
                        B &&
                          (await le(),
                          se(
                            h.MetaMetricsSwapsEventSource.MainView,
                            B,
                            q.pathname.includes('asset') ? '&token=native' : '',
                            e
                          ));
                      },
                      [B, q, se]
                    ),
                    pe = (0, a.useCallback)(async () => {
                      X !== O.MultichainNetworks.SOLANA
                        ? (await le(),
                          N &&
                            (U({
                              event: h.MetaMetricsEventName.NavSwapButtonClicked,
                              category: h.MetaMetricsEventCategory.Swaps,
                              properties: {
                                token_symbol: 'ETH',
                                location: h.MetaMetricsSwapsEventSource.MainView,
                                text: 'Swap',
                                chain_id: t,
                              },
                            }),
                            F((0, m.setSwapsFromToken)(B)),
                            Q
                              ? global.platform.openExtensionInBrowser &&
                                global.platform.openExtensionInBrowser(u.PREPARE_SWAP_ROUTE)
                              : z.push(u.PREPARE_SWAP_ROUTE)))
                        : de(!0);
                    }, [le, N, t, Q, B]);
                  return a.default.createElement(
                    T.Box,
                    {
                      display: v.Display.Flex,
                      justifyContent: v.JustifyContent.spaceEvenly,
                      width: v.BlockSize.Full,
                    },
                    a.default.createElement(E.default, {
                      className: `${D}-overview__button`,
                      iconButtonClassName: j,
                      Icon: a.default.createElement(T.Icon, {
                        name: T.IconName.PlusMinus,
                        color: v.IconColor.primaryInverse,
                        size: T.IconSize.Sm,
                      }),
                      disabled: !R,
                      'data-testid': `${D}-overview-buy`,
                      label: L('buyAndSell'),
                      onClick: ue,
                      tooltipRender: e => re('buyButton', e),
                    }),
                    a.default.createElement(E.default, {
                      className: `${D}-overview__button`,
                      iconButtonClassName: j,
                      disabled: !N || !M || !te,
                      Icon: a.default.createElement(T.Icon, {
                        name: T.IconName.SwapHorizontal,
                        color: v.IconColor.primaryInverse,
                        size: T.IconSize.Sm,
                      }),
                      onClick: pe,
                      label: L('swap'),
                      'data-testid': 'token-overview-button-swap',
                      tooltipRender: e => re('swapButton', e),
                    }),
                    a.default.createElement(E.default, {
                      className: `${D}-overview__button`,
                      iconButtonClassName: j,
                      disabled: !P || !M || ne,
                      'data-testid': `${D}-overview-bridge`,
                      Icon: a.default.createElement(T.Icon, {
                        name: T.IconName.Bridge,
                        color: v.IconColor.primaryInverse,
                        size: T.IconSize.Sm,
                      }),
                      label: L('bridge'),
                      onClick: () => de(!1),
                      tooltipRender: e => re('bridgeButton', e),
                    }),
                    a.default.createElement(E.default, {
                      className: `${D}-overview__button`,
                      iconButtonClassName: j,
                      'data-testid': `${D}-overview-send`,
                      Icon: a.default.createElement(T.Icon, {
                        name: T.IconName.Arrow2UpRight,
                        color: v.IconColor.primaryInverse,
                        size: T.IconSize.Sm,
                      }),
                      disabled: !M || ne,
                      label: L('send'),
                      onClick: ce,
                      tooltipRender: e => re('sendButton', e),
                    }),
                    a.default.createElement(
                      a.default.Fragment,
                      null,
                      $ &&
                        a.default.createElement(x.ReceiveModal, {
                          address: H,
                          onClose: () => V(!1),
                        }),
                      a.default.createElement(E.default, {
                        className: `${D}-overview__button`,
                        iconButtonClassName: j,
                        'data-testid': `${D}-overview-receive`,
                        Icon: a.default.createElement(T.Icon, {
                          name: T.IconName.ScanBarcode,
                          color: v.IconColor.primaryInverse,
                          size: T.IconSize.Sm,
                        }),
                        label: L('receive'),
                        onClick: () => {
                          U({
                            event: h.MetaMetricsEventName.NavReceiveButtonClicked,
                            category: h.MetaMetricsEventCategory.Navigation,
                            properties: { text: 'Receive', location: n, chain_id: t },
                          }),
                            V(!0);
                        },
                      })
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/coin-buttons.tsx' },
    ],
    [
      6322,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/portfolio': 6914,
        '../../../helpers/utils/settings-search': 6915,
        '../../../hooks/useAccountTotalCrossChainFiatBalance': 6965,
        '../../../hooks/useGetFormattedTokensPerChain': 6984,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../hooks/useTheme': 7008,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../multichain/token-list-item/price/percentage-and-amount-change/percentage-and-amount-change': 6690,
        '../../ui/aggregated-balance/aggregated-balance': 6700,
        '../../ui/spinner': 6802,
        '../../ui/tooltip': 6818,
        '../user-preferenced-currency-display': 6317,
        './aggregated-percentage-overview': 6320,
        './aggregated-percentage-overview-cross-chains': 6319,
        './coin-buttons': 6321,
        './wallet-overview': 6327,
        '@metamask/assets-controllers': 1353,
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
                  (n.LegacyAggregatedBalance = n.CoinOverview = void 0);
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
                  o = N(e('classnames')),
                  i = e('@metamask/assets-controllers'),
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../helpers/utils/portfolio'),
                  u = e('../../../contexts/metametrics'),
                  d = e('../../../../shared/constants/metametrics'),
                  p = e('../../../contexts/i18n'),
                  m = N(e('../../ui/tooltip')),
                  f = N(e('../user-preferenced-currency-display')),
                  h = e('../../../helpers/constants/common'),
                  y = e('../../../selectors'),
                  g = N(e('../../ui/spinner')),
                  b = e(
                    '../../multichain/token-list-item/price/percentage-and-amount-change/percentage-and-amount-change'
                  ),
                  v = e('../../../selectors/multichain'),
                  T = e('../../../store/actions'),
                  E = e('../../../hooks/useTheme'),
                  w = e('../../../helpers/utils/settings-search'),
                  S = e('../../../hooks/useAccountTotalCrossChainFiatBalance'),
                  x = e('../../../hooks/useGetFormattedTokensPerChain'),
                  C = e('../../../hooks/useMultichainSelector'),
                  k = e('../../ui/aggregated-balance/aggregated-balance'),
                  _ = N(e('./wallet-overview')),
                  A = N(e('./coin-buttons')),
                  O = e('./aggregated-percentage-overview'),
                  I = e('./aggregated-percentage-overview-cross-chains');
                function N(e) {
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
                const P = ({
                  classPrefix: e,
                  account: t,
                  balance: n,
                  balanceIsCached: i,
                  handleSensitiveToggle: c,
                }) => {
                  const u = (0, r.useSelector)(y.getIsTokenNetworkFilterEqualCurrentNetwork),
                    d = (0, r.useSelector)(y.getShouldHideZeroBalanceTokens),
                    p = (0, r.useSelector)(y.getChainIdsToPoll),
                    m = (0, C.useMultichainSelector)(v.getMultichainShouldShowFiat, t),
                    { privacyMode: b, showNativeTokenAsMainBalance: T } = (0, r.useSelector)(
                      y.getPreferences
                    ),
                    E = (0, r.useSelector)(y.getIsTestnet),
                    { formattedTokensWithBalancesPerChain: w } = (0,
                    x.useGetFormattedTokensPerChain)(t, d, u, p),
                    { totalFiatBalance: k } = (0, S.useAccountTotalCrossChainFiatBalance)(t, w);
                  let _;
                  return (
                    (_ = !m || T || E ? n : k),
                    _
                      ? a.default.createElement(
                          a.default.Fragment,
                          null,
                          a.default.createElement(f.default, {
                            style: { display: 'contents' },
                            account: t,
                            className: (0, o.default)(`${e}-overview__primary-balance`, {
                              [`${e}-overview__cached-balance`]: i,
                            }),
                            'data-testid': `${e}-overview__primary-currency`,
                            value: _,
                            type: h.PRIMARY,
                            ethNumberOfDecimals: 4,
                            hideTitle: !0,
                            shouldCheckShowNativeToken: !0,
                            isAggregatedFiatOverviewBalance: !T && !E && m,
                            privacyMode: b,
                          }),
                          a.default.createElement(s.ButtonIcon, {
                            color: l.IconColor.iconAlternative,
                            marginLeft: 2,
                            size: s.ButtonIconSize.Md,
                            onClick: c,
                            iconName: b ? s.IconName.EyeSlash : s.IconName.Eye,
                            justifyContent: l.JustifyContent.center,
                            ariaLabel: 'Sensitive toggle',
                            'data-testid': 'sensitive-toggle',
                          })
                        )
                      : a.default.createElement(g.default, {
                          className: 'loading-overlay__spinner',
                        })
                  );
                };
                n.LegacyAggregatedBalance = P;
                n.CoinOverview = ({
                  account: e,
                  balance: t,
                  balanceIsCached: n,
                  className: o,
                  classPrefix: f = 'coin',
                  chainId: h,
                  defaultSwapsToken: g,
                  isBridgeChain: S,
                  isBuyableChain: x,
                  isSwapsChain: C,
                  isSigningEnabled: N,
                }) => {
                  if (C && g === undefined) throw new Error('defaultSwapsToken is required');
                  const M = (0, a.useContext)(p.I18nContext),
                    R = (0, a.useContext)(u.MetaMetricsContext),
                    B = (0, r.useSelector)(y.getMetaMetricsId),
                    D = (0, r.useSelector)(y.getParticipateInMetaMetrics),
                    j = (0, r.useSelector)(y.getDataCollectionForMarketing),
                    L = (0, w.getSpecificSettingsRoute)(
                      M,
                      M('general'),
                      M('showNativeTokenAsMainBalance')
                    ),
                    F = (0, E.useTheme)(),
                    U = (0, r.useDispatch)(),
                    $ = (0, r.useSelector)(y.getShouldShowAggregatedBalancePopover),
                    V = (0, r.useSelector)(y.getIsTestnet),
                    {
                      showFiatInTestnets: H,
                      privacyMode: z,
                      showNativeTokenAsMainBalance: W,
                    } = (0, r.useSelector)(y.getPreferences),
                    G = (0, r.useSelector)(y.getIsTokenNetworkFilterEqualCurrentNetwork),
                    Y = (0, r.useSelector)(v.getMultichainIsEvm),
                    q = (0, r.useSelector)(y.getTokensMarketData),
                    [K, Q] = (0, a.useState)(!0),
                    J = () => {
                      Q(!K), U((0, T.setAggregatedBalancePopoverShown)());
                    },
                    X = () => {
                      U((0, T.setPrivacyMode)(!z));
                    },
                    [Z, ee] = (0, a.useState)(null),
                    te = (0, a.useCallback)(() => {
                      const e = (0, c.getPortfolioUrl)('', 'ext_portfolio_button', B, D, j);
                      global.platform.openTab({ url: e }),
                        R({
                          category: d.MetaMetricsEventCategory.Navigation,
                          event: d.MetaMetricsEventName.PortfolioLinkClicked,
                          properties: { location: 'Home', text: 'Portfolio' },
                        });
                    }, [j, D, B, R]);
                  return a.default.createElement(_.default, {
                    balance: a.default.createElement(
                      m.default,
                      { position: 'top', title: M('balanceOutdated'), disabled: !n },
                      a.default.createElement(
                        'div',
                        { className: `${f}-overview__balance` },
                        a.default.createElement(
                          'div',
                          {
                            className: `${f}-overview__primary-container`,
                            onMouseEnter: () => {
                              Q(!0);
                            },
                            ref: e => {
                              e && ee(e);
                            },
                          },
                          Y
                            ? a.default.createElement(P, {
                                classPrefix: f,
                                account: e,
                                balance: t,
                                balanceIsCached: n,
                                handleSensitiveToggle: X,
                              })
                            : a.default.createElement(k.AggregatedBalance, {
                                classPrefix: f,
                                balanceIsCached: n,
                                handleSensitiveToggle: X,
                              }),
                          n &&
                            a.default.createElement(
                              'span',
                              { className: `${f}-overview__cached-star` },
                              '*'
                            )
                        ),
                        $ && (!V || (V && H)) && !W
                          ? a.default.createElement(
                              s.Popover,
                              {
                                referenceElement: Z,
                                isOpen: K,
                                position: s.PopoverPosition.BottomStart,
                                hasArrow: !0,
                                flip: !0,
                                'data-theme': 'light' === F ? 'dark' : 'light',
                                className: 'balance-popover__container',
                                padding: 3,
                                onClickOutside: J,
                                onPressEscKey: J,
                                preventOverflow: !0,
                              },
                              a.default.createElement(
                                s.Box,
                                null,
                                a.default.createElement(
                                  s.Box,
                                  {
                                    display: l.Display.Flex,
                                    justifyContent: l.JustifyContent.spaceBetween,
                                  },
                                  a.default.createElement(
                                    s.Text,
                                    {
                                      variant: l.TextVariant.bodySmBold,
                                      textAlign: l.TextAlign.Left,
                                      alignItems: l.AlignItems.flexStart,
                                    },
                                    M('yourBalanceIsAggregated')
                                  ),
                                  a.default.createElement(s.ButtonIcon, {
                                    size: s.ButtonIconSize.Sm,
                                    onClick: J,
                                    iconName: s.IconName.Close,
                                    justifyContent: l.JustifyContent.center,
                                    ariaLabel: 'close',
                                    'data-testid': 'popover-close',
                                  })
                                ),
                                a.default.createElement(
                                  s.Text,
                                  { variant: l.TextVariant.bodySm },
                                  M('crossChainAggregatedBalancePopover', [
                                    a.default.createElement(
                                      s.ButtonLink,
                                      {
                                        size: s.ButtonLinkSize.Inherit,
                                        textProps: {
                                          variant: l.TextVariant.bodyMd,
                                          alignItems: l.AlignItems.flexStart,
                                        },
                                        as: 'a',
                                        href: `#${L.route}`,
                                        rel: 'noopener noreferrer',
                                        onClick: J,
                                      },
                                      M('settings')
                                    ),
                                  ])
                                )
                              )
                            )
                          : null,
                        (() => {
                          const e = () =>
                            a.default.createElement(
                              s.ButtonLink,
                              {
                                endIconName: s.IconName.Export,
                                onClick: te,
                                as: 'a',
                                'data-testid': 'portfolio-link',
                                textProps: { variant: l.TextVariant.bodyMdMedium },
                              },
                              M('portfolio')
                            );
                          return Y
                            ? W
                              ? a.default.createElement(
                                  s.Box,
                                  { className: 'wallet-overview__currency-wrapper' },
                                  a.default.createElement(b.PercentageAndAmountChange, {
                                    value:
                                      null == q ||
                                      null === (t = q[(0, i.getNativeTokenAddress)(h)]) ||
                                      void 0 === t
                                        ? void 0
                                        : t.pricePercentChange1d,
                                  }),
                                  e()
                                )
                              : a.default.createElement(
                                  s.Box,
                                  { className: 'wallet-overview__currency-wrapper' },
                                  G
                                    ? a.default.createElement(O.AggregatedPercentageOverview, null)
                                    : a.default.createElement(
                                        I.AggregatedPercentageOverviewCrossChains,
                                        null
                                      ),
                                  e()
                                )
                            : a.default.createElement(
                                s.Box,
                                { className: 'wallet-overview__currency-wrapper' },
                                e()
                              );
                          var t;
                        })()
                      )
                    ),
                    buttons: a.default.createElement(A.default, {
                      account: e,
                      trackingLocation: 'home',
                      chainId: h,
                      isSwapsChain: C,
                      isSigningEnabled: N,
                      isBridgeChain: S,
                      isBuyableChain: x,
                      defaultSwapsToken: g,
                      classPrefix: f,
                      iconButtonClassName: `${f}-overview__icon-button`,
                    }),
                    className: o,
                  });
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/coin-overview.tsx' },
    ],
    [
      6323,
      {
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../ducks/ramps': 6862,
        '../../../selectors': 7601,
        './coin-overview': 6322,
        '@metamask/keyring-api': 2014,
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
                var a = p(e('react')),
                  r = p(e('prop-types')),
                  o = e('react-redux'),
                  i = e('@metamask/keyring-api'),
                  s = e('lodash'),
                  l = e('../../../../shared/modules/selectors/networks'),
                  c = e('../../../selectors'),
                  u = e('../../../ducks/ramps'),
                  d = e('./coin-overview');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const m = ({ className: e }) => {
                  const t = (0, o.useSelector)(c.getIsBridgeChain),
                    n = (0, o.useSelector)(u.getIsNativeTokenBuyable),
                    r = (0, o.useSelector)(c.getSwapsDefaultToken, s.isEqual),
                    p = (0, o.useSelector)(c.isBalanceCached),
                    m = (0, o.useSelector)(l.getCurrentChainId),
                    f = (0, o.useSelector)(c.getSelectedAccountCachedBalance),
                    h = (0, o.useSelector)(c.getSelectedInternalAccount, s.isEqual),
                    y = (0, o.useSelector)(c.getIsSwapsChain),
                    g =
                      h.methods.includes(i.EthMethod.SignTransaction) ||
                      h.methods.includes(i.EthMethod.SignUserOperation);
                  return a.default.createElement(d.CoinOverview, {
                    account: h,
                    balance: f,
                    balanceIsCached: p,
                    className: e,
                    classPrefix: 'eth',
                    chainId: m,
                    isSigningEnabled: g,
                    isSwapsChain: y,
                    isBridgeChain: t,
                    isBuyableChain: n,
                    defaultSwapsToken: r,
                  });
                };
                m.propTypes = { className: r.default.string };
                n.default = m;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/eth-overview.js' },
    ],
    [
      6324,
      {
        '../../../../../shared/lib/accounts/snaps': 5826,
        '../../../../helpers/constants/routes': 6878,
        '../../../../selectors': 7601,
        '../../../../selectors/multichain/networks': 7606,
        '../../../../store/actions': 7619,
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
                  (n.useHandleSendNonEvm = void 0);
                var a = e('@metamask/utils'),
                  r = e('react'),
                  o = e('react-redux'),
                  i = e('react-router-dom'),
                  s = e('../../../../store/actions'),
                  l = e('../../../../selectors'),
                  c = e('../../../../selectors/multichain/networks'),
                  u = e('../../../../../shared/lib/accounts/snaps'),
                  d = e('../../../../helpers/constants/routes');
                n.useHandleSendNonEvm = e => {
                  const { nativeCurrency: t } = (0, o.useSelector)(
                      c.getSelectedMultichainNetworkConfiguration
                    ),
                    n = (0, o.useSelector)(l.getSelectedInternalAccount),
                    p = (0, i.useHistory)(),
                    m = (0, o.useDispatch)(),
                    f = (0, o.useSelector)(e => e.metamask.defaultHomeActiveTabName),
                    h = (0, o.useSelector)(l.getMemoizedUnapprovedTemplatedConfirmations);
                  return (
                    (0, r.useEffect)(() => {
                      const e = h.find(
                        e =>
                          'snap_dialog' === e.type &&
                          n.metadata.snap &&
                          n.metadata.snap.id === e.origin &&
                          (0, u.isMultichainWalletSnap)(n.metadata.snap.id)
                      );
                      e && p.push(`${d.CONFIRMATION_V_NEXT_ROUTE}/${e.id}`);
                    }, [h, p, n]),
                    async () => {
                      if (!n.metadata.snap) throw new Error('Non-EVM needs to be Snap accounts');
                      if (!(0, u.isMultichainWalletSnap)(n.metadata.snap.id))
                        throw new Error(`Non-EVM Snap is not whitelisted: ${n.metadata.snap.id}`);
                      const r = (() => {
                          if (e) return e;
                          if (!t)
                            throw new Error(
                              'No CAIP asset type provided, and could not find a fallback native asset for the selected account'
                            );
                          return t;
                        })(),
                        { chainId: o } = (0, a.parseCaipAssetType)(r);
                      try {
                        await m((0, s.setDefaultHomeActiveTabName)('activity')),
                          await (0, s.sendMultichainTransaction)(n.metadata.snap.id, {
                            account: n.id,
                            scope: o,
                            assetType: r,
                          });
                      } catch (e) {
                        await m((0, s.setDefaultHomeActiveTabName)(f));
                      }
                    }
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/hooks/useHandleSendNonEvm.ts' },
    ],
    [
      6325,
      { './eth-overview': 6323, './non-evm-overview': 6326 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'EthOverview', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  }),
                  Object.defineProperty(n, 'NonEvmOverview', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var a = o(e('./eth-overview')),
                  r = o(e('./non-evm-overview'));
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/index.js' },
    ],
    [
      6326,
      {
        '../../../ducks/ramps': 6862,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/multichain': 7605,
        '../../../selectors/multichain/networks': 7606,
        './coin-overview': 6322,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.default = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('@metamask/keyring-api'),
                  s = e('../../../selectors/multichain'),
                  l = e('../../../selectors/multichain/networks'),
                  c = e('../../../ducks/ramps'),
                  u = e('../../../hooks/useMultichainSelector'),
                  d = e('../../../selectors'),
                  p = e('./coin-overview');
                n.default = ({ className: e }) => {
                  const { chainId: t } = (0, o.useSelector)(
                      l.getSelectedMultichainNetworkConfiguration
                    ),
                    n = (0, o.useSelector)(s.getMultichainSelectedAccountCachedBalance),
                    a = (0, o.useSelector)(d.getSelectedInternalAccount),
                    m = (0, u.useMultichainSelector)(s.getMultichainIsMainnet, a),
                    f = (0, o.useSelector)(c.getIsBitcoinBuyable),
                    h = !!(a.type === i.BtcAccountType.P2wpkh) && f && m,
                    y = (0, o.useSelector)(d.getSwapsDefaultToken);
                  let g = !1,
                    b = !1;
                  return (
                    (g = (0, o.useSelector)(e => (0, d.getIsSwapsChain)(e, t))),
                    (b = (0, o.useSelector)(e => (0, d.getIsBridgeChain)(e, t))),
                    r.default.createElement(p.CoinOverview, {
                      account: a,
                      balance: n,
                      balanceIsCached: !1,
                      className: e,
                      chainId: t,
                      isSigningEnabled: !0,
                      isSwapsChain: g,
                      defaultSwapsToken: y,
                      isBridgeChain: b,
                      isBuyableChain: h,
                    })
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/non-evm-overview.tsx' },
    ],
    [
      6327,
      {
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
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
                  i = e('../../../../app/scripts/lib/util'),
                  s = e('../../../../shared/constants/app');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = ({ balance: e, buttons: t, className: n }) =>
                  a.default.createElement(
                    'div',
                    {
                      className: (0, o.default)(
                        'wallet-overview',
                        {
                          'wallet-overview-fullscreen':
                            (0, i.getEnvironmentType)() === s.ENVIRONMENT_TYPE_FULLSCREEN,
                        },
                        n
                      ),
                    },
                    a.default.createElement('div', { className: 'wallet-overview__balance' }, e),
                    a.default.createElement('div', { className: 'wallet-overview__buttons' }, t)
                  );
                c.propTypes = {
                  balance: r.default.element.isRequired,
                  buttons: r.default.element.isRequired,
                  className: r.default.string,
                };
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/wallet-overview/wallet-overview.js' },
    ],
    [
      6328,
      { './whats-new-modal': 6334 },
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
                  r = (a = e('./whats-new-modal')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/index.ts' },
    ],
    [
      6329,
      { '../../../../shared/notifications': 5882, './solana': 6330 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.getTranslatedUINotifications = void 0);
                var a = e('../../../../shared/notifications'),
                  r = e('./solana');
                n.getTranslatedUINotifications = e => ({
                  [a.NOTIFICATION_SOLANA_ON_METAMASK]: {
                    ...a.UI_NOTIFICATIONS[a.NOTIFICATION_SOLANA_ON_METAMASK],
                    title: e('solanaOnMetaMask'),
                    description: '',
                    image: {
                      src: 'images/solana-logo-transparent.svg',
                      width: 'auto',
                      height: '70px',
                    },
                    date: a.UI_NOTIFICATIONS[a.NOTIFICATION_SOLANA_ON_METAMASK].date || '',
                    modal: {
                      header: { component: r.SolanaModalHeader },
                      body: { component: r.SolanaModalBody },
                      footer: { component: r.SolanaModalFooter },
                    },
                  },
                });
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/notifications.ts' },
    ],
    [
      6330,
      { './modal-body': 6331, './modal-footer': 6332, './modal-header': 6333 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'SolanaModalBody', {
                    enumerable: !0,
                    get: function () {
                      return a.SolanaModalBody;
                    },
                  }),
                  Object.defineProperty(n, 'SolanaModalFooter', {
                    enumerable: !0,
                    get: function () {
                      return r.SolanaModalFooter;
                    },
                  }),
                  Object.defineProperty(n, 'SolanaModalHeader', {
                    enumerable: !0,
                    get: function () {
                      return o.SolanaModalHeader;
                    },
                  });
                var a = e('./modal-body'),
                  r = e('./modal-footer'),
                  o = e('./modal-header');
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/solana/index.ts' },
    ],
    [
      6331,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.SolanaModalBody = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library'),
                  s = e('../../../../hooks/useI18nContext');
                n.SolanaModalBody = ({ title: e }) => {
                  const t = (0, s.useI18nContext)(),
                    n = [
                      {
                        title: t('solanaSendReceiveSwapTokens'),
                        description: t('solanaSendReceiveSwapTokensDescription'),
                      },
                      {
                        title: t('solanaImportAccounts'),
                        description: t('solanaImportAccountsDescription'),
                      },
                      {
                        title: t('solanaMoreFeaturesComingSoon'),
                        description: t('solanaMoreFeaturesComingSoonDescription'),
                      },
                    ];
                  return r.default.createElement(
                    i.ModalBody,
                    { 'data-testid': 'solana-modal-body' },
                    r.default.createElement(
                      i.Box,
                      {
                        display: o.Display.Flex,
                        justifyContent: o.JustifyContent.center,
                        paddingTop: 2,
                        paddingBottom: 2,
                      },
                      r.default.createElement(i.Text, { variant: o.TextVariant.headingSm }, e)
                    ),
                    n.map((e, t) =>
                      r.default.createElement(
                        i.Box,
                        {
                          display: o.Display.Flex,
                          gap: 2,
                          key: `feature-block-${t}`,
                          paddingTop: 2,
                          paddingBottom: 2,
                        },
                        r.default.createElement(i.Icon, {
                          name: i.IconName.Info,
                          size: i.IconSize.Md,
                          color: o.IconColor.infoDefault,
                          marginTop: 1,
                        }),
                        r.default.createElement(
                          i.Box,
                          { display: o.Display.Flex, flexDirection: o.FlexDirection.Column },
                          r.default.createElement(
                            i.Text,
                            { variant: o.TextVariant.bodyMdBold },
                            e.title
                          ),
                          r.default.createElement(
                            i.Text,
                            { variant: o.TextVariant.bodyMd, color: o.TextColor.textAlternative },
                            e.description
                          )
                        )
                      )
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/solana/modal-body.tsx' },
    ],
    [
      6332,
      {
        '../../../../../shared/constants/metametrics': 5800,
        '../../../../contexts/metametrics': 6836,
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
                  (n.SolanaModalFooter = void 0);
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
                  o = e('../../../../../shared/constants/metametrics'),
                  i = e('../../../../contexts/metametrics'),
                  s = e('../../../../hooks/useI18nContext'),
                  l = e('../../../../selectors'),
                  c = e('../../../component-library');
                function u(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (u = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const d = 'solana';
                n.SolanaModalFooter = ({ onAction: e, onCancel: t }) => {
                  const n = (0, s.useI18nContext)(),
                    u = (0, r.useSelector)(l.hasCreatedSolanaAccount),
                    p = (0, a.useContext)(i.MetaMetricsContext);
                  return a.default.createElement(
                    c.ModalFooter,
                    { paddingTop: 4, 'data-testid': 'solana-modal-footer' },
                    a.default.createElement(
                      c.Button,
                      {
                        block: !0,
                        size: c.ButtonSize.Md,
                        variant: c.ButtonVariant.Primary,
                        'data-testid': u ? 'got-it-button' : 'create-solana-account-button',
                        onClick: u
                          ? async () => {
                              p({
                                category: o.MetaMetricsEventCategory.Onboarding,
                                event: o.MetaMetricsEventName.WhatsNewClicked,
                                properties: { feature: d, action: 'got-it' },
                              }),
                                t();
                            }
                          : async () => {
                              p({
                                category: o.MetaMetricsEventCategory.Onboarding,
                                event: o.MetaMetricsEventName.WhatsNewClicked,
                                properties: { feature: d, action: 'create-solana-account' },
                              }),
                                await e();
                            },
                      },
                      n(u ? 'gotIt' : 'createSolanaAccount')
                    ),
                    a.default.createElement(
                      c.Button,
                      {
                        block: !0,
                        size: c.ButtonSize.Md,
                        variant: c.ButtonVariant.Link,
                        'data-testid': 'not-now-button',
                        onClick: t,
                      },
                      n('notNow')
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/solana/modal-footer.tsx' },
    ],
    [
      6333,
      {
        '../../../../helpers/constants/design-system': 6872,
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
                  (n.SolanaModalHeader = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../../../helpers/constants/design-system'),
                  i = e('../../../component-library');
                n.SolanaModalHeader = ({ onClose: e, image: t }) => {
                  const n =
                    t &&
                    r.default.createElement('img', {
                      src: t.src,
                      width: t.width,
                      height: t.height,
                    });
                  return r.default.createElement(
                    i.ModalHeader,
                    { onClose: e, paddingTop: 4, paddingBottom: 4 },
                    r.default.createElement(
                      i.Box,
                      {
                        display: o.Display.Flex,
                        flexDirection: o.FlexDirection.Column,
                        alignItems: o.AlignItems.center,
                      },
                      n
                    )
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/solana/modal-header.tsx' },
    ],
    [
      6334,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/i18n': 6832,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../multichain/create-solana-account-modal': 6551,
        './notifications': 6329,
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
                  (n.default = function ({ onClose: e }) {
                    const t = (0, a.useContext)(i.I18nContext),
                      n = (0, a.useContext)(s.MetaMetricsContext),
                      [l, f] = (0, a.useState)(!1),
                      y = (0, r.useSelector)(c.getSortedAnnouncementsToShow),
                      g = async e => {
                        await (0, u.updateViewedNotifications)({ [e]: !0 });
                      },
                      b = async () => {
                        await Promise.all(y.map(({ id: e }) => g(e))),
                          n({
                            category: o.MetaMetricsEventCategory.Home,
                            event: o.MetaMetricsEventName.WhatsNewViewed,
                          }),
                          e();
                      },
                      v = () => {
                        f(!0);
                      };
                    return a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        d.Modal,
                        {
                          onClose: b,
                          'data-testid': 'whats-new-modal',
                          isOpen: y.length > 0 && !l,
                          isClosedOnOutsideClick: !0,
                          isClosedOnEscapeKey: !0,
                          autoFocus: !1,
                        },
                        a.default.createElement(d.ModalOverlay, null),
                        y.map(({ id: n }) => {
                          const a = (0, m.getTranslatedUINotifications)(t)[n];
                          return h({
                            notification: a,
                            onClose: e,
                            onNotificationViewed: g,
                            onCreateSolanaAccount: v,
                          });
                        })
                      ),
                      l &&
                        a.default.createElement(p.CreateSolanaAccountModal, {
                          onClose: () => {
                            f(!1), b();
                          },
                        })
                    );
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
                  o = e('../../../../shared/constants/metametrics'),
                  i = e('../../../contexts/i18n'),
                  s = e('../../../contexts/metametrics'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../selectors'),
                  u = e('../../../store/actions'),
                  d = e('../../component-library'),
                  p = e('../../multichain/create-solana-account-modal'),
                  m = e('./notifications');
                function f(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (f = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const h = ({
                  notification: e,
                  onClose: t,
                  onNotificationViewed: n,
                  onCreateSolanaAccount: r,
                }) => {
                  const { id: o, title: i, image: s, modal: c } = e;
                  return a.default.createElement(
                    d.ModalContent,
                    {
                      modalDialogProps: {
                        display: l.Display.Flex,
                        flexDirection: l.FlexDirection.Column,
                        padding: 4,
                      },
                    },
                    (null == c ? void 0 : c.header) &&
                      a.default.createElement(c.header.component, { onClose: t, image: s }),
                    (null == c ? void 0 : c.body) &&
                      a.default.createElement(c.body.component, { title: i }),
                    (null == c ? void 0 : c.footer) &&
                      a.default.createElement(c.footer.component, {
                        onAction: r,
                        onCancel: async () => {
                          await n(o), t();
                        },
                      })
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/app/whats-new-modal/whats-new-modal.tsx' },
    ],
    [
      6389,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../ui/box/box': 6702,
        '../../help-text': 6398,
        '../../label': 6406,
        '../../text-field': 6459,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.FormTextField = void 0);
                var a = d(e('react')),
                  r = d(e('prop-types')),
                  o = d(e('classnames')),
                  i = e('../../../../helpers/constants/design-system'),
                  s = d(e('../../../ui/box/box')),
                  l = e('../../text-field'),
                  c = e('../../help-text'),
                  u = e('../../label');
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
                const m = ({
                  autoComplete: e,
                  autoFocus: t,
                  className: n,
                  defaultValue: r,
                  disabled: d,
                  error: m,
                  helpText: f,
                  helpTextProps: h,
                  id: y,
                  inputProps: g,
                  inputRef: b,
                  label: v,
                  labelProps: T,
                  startAccessory: E,
                  maxLength: w,
                  name: S,
                  onBlur: x,
                  onChange: C,
                  onFocus: k,
                  placeholder: _,
                  readOnly: A,
                  required: O,
                  endAccessory: I,
                  size: N = i.Size.MD,
                  textFieldProps: M,
                  truncate: P,
                  type: R = 'text',
                  value: B,
                  ...D
                }) =>
                  a.default.createElement(
                    s.default,
                    p(
                      {
                        className: (0, o.default)(
                          'mm-form-text-field',
                          { 'mm-form-text-field--disabled': d },
                          n
                        ),
                        display: i.Display.Flex,
                        flexDirection: i.FlexDirection.Column,
                      },
                      D
                    ),
                    v &&
                      a.default.createElement(
                        u.Label,
                        p({ htmlFor: y }, T, {
                          className: (0, o.default)(
                            'mm-form-text-field__label',
                            null == T ? void 0 : T.className
                          ),
                        }),
                        v
                      ),
                    a.default.createElement(
                      l.TextField,
                      p(
                        {
                          className: (0, o.default)(
                            'mm-form-text-field__text-field',
                            null == M ? void 0 : M.className
                          ),
                          id: y,
                          autoComplete: e,
                          autoFocus: t,
                          defaultValue: r,
                          disabled: d,
                          error: m,
                          id: y,
                          inputProps: g,
                          inputRef: b,
                          startAccessory: E,
                          maxLength: w,
                          name: S,
                          onBlur: x,
                          onChange: C,
                          onFocus: k,
                          placeholder: _,
                          readOnly: A,
                          required: O,
                          endAccessory: I,
                          size: N,
                          truncate: P,
                          type: R,
                          value: B,
                        },
                        M
                      )
                    ),
                    f &&
                      a.default.createElement(
                        c.HelpText,
                        p({ severity: m && c.HelpTextSeverity.Danger, marginTop: 1 }, h, {
                          className: (0, o.default)(
                            'mm-form-text-field__help-text',
                            null == h ? void 0 : h.className
                          ),
                        }),
                        f
                      )
                  );
                (n.FormTextField = m),
                  (m.propTypes = {
                    className: r.default.string,
                    id: (e, t, n) =>
                      e.label && !e[t]
                        ? new Error(
                            `If a label prop exists you must provide an ${t} prop for the label's htmlFor attribute for accessibility. Warning coming from ${n} ui/components/component-library/form-text-field/form-text-field.js`
                          )
                        : null,
                    label: r.default.string,
                    labelProps: r.default.object,
                    helpText: r.default.oneOfType([r.default.node, r.default.string]),
                    helpTextProps: r.default.object,
                    textFieldProps: r.default.object,
                    ...l.TextField.propTypes,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/form-text-field/deprecated/form-text-field.js',
      },
    ],
    [
      6390,
      { './form-text-field': 6389 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'FormTextField', {
                    enumerable: !0,
                    get: function () {
                      return a.FormTextField;
                    },
                  });
                var a = e('./form-text-field');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/form-text-field/deprecated/index.js',
      },
    ],
    [
      6408,
      { './lottie-animation': 6409 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'LottieAnimation', {
                    enumerable: !0,
                    get: function () {
                      return a.LottieAnimation;
                    },
                  });
                var a = e('./lottie-animation');
              };
            };
      },
      { package: '$root$', file: 'ui/components/component-library/lottie-animation/index.ts' },
    ],
    [
      6409,
      { 'lottie-web/build/player/lottie_light': 4930, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.LottieAnimation = void 0);
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
                  o =
                    (a = e('lottie-web/build/player/lottie_light')) && a.__esModule
                      ? a
                      : { default: a };
                function i(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (i = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.LottieAnimation = ({
                  data: e,
                  path: t,
                  loop: n = !0,
                  autoplay: a = !0,
                  style: i = {},
                  className: s = '',
                  onComplete: l = () => null,
                }) => {
                  const c = (0, r.useRef)(null),
                    u = (0, r.useRef)(null);
                  return (
                    (0, r.useEffect)(() => {
                      if (!c.current)
                        return console.error('LottieAnimation: containerRef is null'), () => null;
                      if (Boolean(e) === Boolean(t))
                        return (
                          console.error(
                            'LottieAnimation: Exactly one of data or path must be provided'
                          ),
                          () => null
                        );
                      const r = {
                        container: c.current,
                        renderer: 'svg',
                        loop: n,
                        autoplay: a,
                        ...(e ? { animationData: e } : { path: t }),
                      };
                      try {
                        (u.current = o.default.loadAnimation(r)),
                          u.current.addEventListener('complete', l),
                          u.current.addEventListener('error', e => {
                            console.error('LottieAnimation error:', e);
                          });
                      } catch (e) {
                        console.error('Failed to load animation:', e);
                      }
                      return () => {
                        u.current &&
                          (u.current.removeEventListener('complete', l),
                          u.current.destroy(),
                          (u.current = null));
                      };
                    }, [e, t, n, a, l]),
                    r.default.createElement('div', { ref: c, style: i, className: s })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/lottie-animation/lottie-animation.tsx',
      },
    ],
    [
      6412,
      { '../modal-content.types': 6416, './modal-content': 6413 },
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
                      return a.ModalContent;
                    },
                  }),
                  Object.defineProperty(n, 'ModalContentSize', {
                    enumerable: !0,
                    get: function () {
                      return r.ModalContentSize;
                    },
                  });
                var a = e('./modal-content'),
                  r = e('../modal-content.types');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/modal-content/deprecated/index.ts',
      },
    ],
    [
      6413,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../box': 6365,
        '../../modal-focus': 6417,
        '../../modal/modal.context': 6428,
        '../modal-content.types': 6416,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ModalContent = void 0);
                var a,
                  r = (function (e, t) {
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
                  o = (a = e('classnames')) && a.__esModule ? a : { default: a },
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../box'),
                  l = e('../modal-content.types'),
                  c = e('../../modal/modal.context'),
                  u = e('../../modal-focus');
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
                n.ModalContent = r.default.forwardRef(
                  (
                    {
                      className: e = '',
                      children: t,
                      size: n = l.ModalContentSize.Sm,
                      modalDialogProps: a,
                      ...d
                    },
                    m
                  ) => {
                    const {
                        onClose: f,
                        isClosedOnEscapeKey: h,
                        isClosedOnOutsideClick: y,
                        initialFocusRef: g,
                        finalFocusRef: b,
                        restoreFocus: v,
                        autoFocus: T,
                      } = (0, c.useModalContext)(),
                      E = (0, r.useRef)(null),
                      w = e => {
                        h && 'Escape' === e.key && f();
                      },
                      S = e => {
                        (y && e.target.closest('.mm-popover')) ||
                          (y && null != E && E.current && !E.current.contains(e.target) && f());
                      };
                    return (
                      (0, r.useEffect)(
                        () => (
                          document.addEventListener('keydown', w),
                          document.addEventListener('mousedown', S),
                          () => {
                            document.removeEventListener('keydown', w),
                              document.removeEventListener('mousedown', S);
                          }
                        ),
                        []
                      ),
                      r.default.createElement(
                        u.ModalFocus,
                        { initialFocusRef: g, finalFocusRef: b, restoreFocus: v, autoFocus: T },
                        r.default.createElement(
                          s.Box,
                          p(
                            {
                              className: (0, o.default)('mm-modal-content', e),
                              ref: m,
                              display: i.Display.Flex,
                              width: i.BlockSize.Screen,
                              height: i.BlockSize.Screen,
                              justifyContent: i.JustifyContent.center,
                              alignItems: i.AlignItems.flexStart,
                              paddingRight: 4,
                              paddingLeft: 4,
                              paddingTop: [4, 8, 12],
                              paddingBottom: [4, 8, 12],
                            },
                            d
                          ),
                          r.default.createElement(
                            s.Box,
                            p(
                              {
                                as: 'section',
                                role: 'dialog',
                                'aria-modal': 'true',
                                backgroundColor: i.BackgroundColor.backgroundDefault,
                                borderRadius: i.BorderRadius.LG,
                                width: i.BlockSize.Full,
                                padding: 4,
                                ref: E,
                              },
                              a,
                              {
                                className: (0, o.default)(
                                  'mm-modal-content__dialog',
                                  `mm-modal-content__dialog--size-${n}`,
                                  null == a ? void 0 : a.className
                                ),
                                style: { ...(null == d ? void 0 : d.style), overflowY: 'auto' },
                              }
                            ),
                            t
                          )
                        )
                      )
                    );
                  }
                );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/modal-content/deprecated/modal-content.tsx',
      },
    ],
    [
      6421,
      { './modal-header': 6422 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ModalHeader', {
                    enumerable: !0,
                    get: function () {
                      return a.ModalHeader;
                    },
                  });
                var a = e('./modal-header');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/modal-header/deprecated/index.ts',
      },
    ],
    [
      6422,
      {
        '../../../../helpers/constants/design-system': 6872,
        '../../../../hooks/useI18nContext': 6985,
        '../../button-icon': 6371,
        '../../header-base': 6395,
        '../../icon': 6401,
        '../../text': 6462,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.ModalHeader = void 0);
                var a = d(e('react')),
                  r = d(e('classnames')),
                  o = e('../../text'),
                  i = e('../../../../helpers/constants/design-system'),
                  s = e('../../../../hooks/useI18nContext'),
                  l = e('../../header-base'),
                  c = e('../../button-icon'),
                  u = e('../../icon');
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
                n.ModalHeader = ({
                  children: e,
                  className: t = '',
                  startAccessory: n,
                  endAccessory: d,
                  onClose: m,
                  closeButtonProps: f,
                  onBack: h,
                  backButtonProps: y,
                  ...g
                }) => {
                  const b = (0, s.useI18nContext)();
                  return a.default.createElement(
                    l.HeaderBase,
                    p(
                      {
                        className: (0, r.default)('mm-modal-header', t),
                        startAccessory:
                          n ||
                          (h &&
                            a.default.createElement(
                              c.ButtonIcon,
                              p(
                                {
                                  iconName: u.IconName.ArrowLeft,
                                  ariaLabel: b('back'),
                                  size: c.ButtonIconSize.Sm,
                                  onClick: h,
                                },
                                y
                              )
                            )),
                        endAccessory:
                          d ||
                          (m &&
                            a.default.createElement(
                              c.ButtonIcon,
                              p(
                                {
                                  iconName: u.IconName.Close,
                                  ariaLabel: b('close'),
                                  size: c.ButtonIconSize.Sm,
                                  onClick: m,
                                },
                                f
                              )
                            )),
                      },
                      g
                    ),
                    'string' == typeof e
                      ? a.default.createElement(
                          o.Text,
                          {
                            as: 'header',
                            variant: i.TextVariant.headingSm,
                            textAlign: i.TextAlign.Center,
                          },
                          e
                        )
                      : e
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/modal-header/deprecated/modal-header.tsx',
      },
    ],
    [
      6448,
      { './skeleton': 6449 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Skeleton', {
                    enumerable: !0,
                    get: function () {
                      return a.Skeleton;
                    },
                  });
                var a = e('./skeleton');
              };
            };
      },
      { package: '$root$', file: 'ui/components/component-library/skeleton/index.ts' },
    ],
    [
      6449,
      {
        '../../../helpers/constants/design-system': 6872,
        '../box': 6365,
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
                  (n.default = n.Skeleton = void 0);
                var a = s(e('react')),
                  r = s(e('classnames')),
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../box');
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
                const c = (n.Skeleton = a.default.forwardRef(
                  (
                    { className: e = '', height: t, width: n, children: s, hideChildren: c, ...u },
                    d
                  ) =>
                    a.default.createElement(
                      i.Box,
                      l(
                        {
                          className: (0, r.default)(
                            'mm-skeleton',
                            { 'mm-skeleton--hide-children': c },
                            e
                          ),
                          backgroundColor: o.BackgroundColor.iconAlternative,
                          borderRadius: o.BorderRadius.SM,
                          ref: d,
                        },
                        u,
                        { style: { ...(null == u ? void 0 : u.style), height: t, width: n } }
                      ),
                      s
                    )
                ));
                n.default = c;
              };
            };
      },
      { package: '$root$', file: 'ui/components/component-library/skeleton/skeleton.tsx' },
    ],
    [
      6454,
      { './text-field-search': 6455 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'TextFieldSearch', {
                    enumerable: !0,
                    get: function () {
                      return a.TextFieldSearch;
                    },
                  });
                var a = e('./text-field-search');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/text-field-search/deprecated/index.js',
      },
    ],
    [
      6455,
      {
        '../..': 6402,
        '../../../../hooks/useI18nContext': 6985,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.TextFieldSearch = void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('../..'),
                  s = e('../../../../hooks/useI18nContext');
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
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                const u = ({
                  className: e,
                  showClearButton: t = !0,
                  clearButtonOnClick: n,
                  clearButtonProps: r,
                  endAccessory: l,
                  inputProps: u,
                  value: d,
                  onChange: p,
                  ...m
                }) => {
                  const f = (0, s.useI18nContext)();
                  return a.default.createElement(
                    i.TextField,
                    c(
                      {
                        className: (0, o.default)('mm-text-field-search', e),
                        value: d,
                        onChange: p,
                        type: i.TextFieldType.Search,
                        endAccessory:
                          d && t
                            ? a.default.createElement(
                                a.default.Fragment,
                                null,
                                a.default.createElement(
                                  i.ButtonIcon,
                                  c(
                                    {
                                      className: 'mm-text-field__button-clear',
                                      ariaLabel: f('clear'),
                                      iconName: i.IconName.Close,
                                      size: i.ButtonIconSize.Sm,
                                      onClick: n,
                                    },
                                    r
                                  )
                                ),
                                l
                              )
                            : l,
                        startAccessory: a.default.createElement(i.Icon, {
                          padding: 1,
                          name: i.IconName.Search,
                          size: i.IconSize.Sm,
                        }),
                        inputProps: { ...u },
                      },
                      m
                    )
                  );
                };
                (n.TextFieldSearch = u),
                  (u.propTypes = {
                    value: r.default.oneOfType([r.default.string, r.default.number]),
                    onChange: r.default.func,
                    showClearButton: r.default.bool,
                    clearButtonOnClick: (e, t, n) => {
                      var a;
                      return !e.showClearButton ||
                        (e[t] && null !== (a = e.clearButtonProps) && void 0 !== a && a.onClick)
                        ? null
                        : new Error(
                            `${t} is required unless showClearButton is false. Warning coming from ${n} ui/components/component-library/text-field-search/text-field-search.js`
                          );
                    },
                    clearButtonProps: r.default.object,
                    className: r.default.string,
                    endAccessory: r.default.node,
                    inputProps: r.default.object,
                  }),
                  (u.displayName = 'TextFieldSearch');
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/component-library/text-field-search/deprecated/text-field-search.js',
      },
    ],
    [
      6465,
      { './textarea': 6466, './textarea.types': 6467 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'Textarea', {
                    enumerable: !0,
                    get: function () {
                      return a.Textarea;
                    },
                  }),
                  Object.defineProperty(n, 'TextareaResize', {
                    enumerable: !0,
                    get: function () {
                      return r.TextareaResize;
                    },
                  });
                var a = e('./textarea'),
                  r = e('./textarea.types');
              };
            };
      },
      { package: '$root$', file: 'ui/components/component-library/textarea/index.ts' },
    ],
    [
      6466,
      {
        '../../../helpers/constants/design-system': 6872,
        '../text': 6462,
        './textarea.types': 6467,
        classnames: 4168,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.Textarea = void 0);
                var a = l(e('react')),
                  r = l(e('classnames')),
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../text'),
                  s = e('./textarea.types');
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
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    c.apply(null, arguments)
                  );
                }
                n.Textarea = a.default.forwardRef(
                  (
                    {
                      autoFocus: e,
                      className: t = '',
                      defaultValue: n,
                      isDisabled: l,
                      disabled: u,
                      error: d,
                      id: p,
                      resize: m = s.TextareaResize.Vertical,
                      rows: f,
                      cols: h,
                      maxLength: y,
                      name: g,
                      onBlur: b,
                      onChange: v,
                      onClick: T,
                      onFocus: E,
                      placeholder: w,
                      readOnly: S,
                      required: x,
                      value: C,
                      ...k
                    },
                    _
                  ) =>
                    a.default.createElement(
                      i.Text,
                      c(
                        {
                          className: (0, r.default)(
                            'mm-textarea',
                            `mm-textarea--resize-${m}`,
                            { 'mm-textarea--disabled': Boolean(l || u) },
                            t
                          ),
                          as: 'textarea',
                          ref: _,
                          placeholder: w,
                          readOnly: S,
                          required: x,
                          autoFocus: e,
                          defaultValue: n,
                          disabled: l || u,
                        },
                        d && { 'aria-invalid': d },
                        {
                          id: p,
                          maxLength: y,
                          name: g,
                          value: C,
                          onBlur: e => {
                            null == b || b(e);
                          },
                          onChange: v,
                          onClick: e => {
                            !T || (l && u) || null == T || T(e);
                          },
                          onFocus: e => {
                            null == E || E(e);
                          },
                          resize: m,
                          rows: f,
                          cols: h,
                          backgroundColor: o.BackgroundColor.backgroundDefault,
                          borderColor: d ? o.BorderColor.errorDefault : o.BorderColor.borderDefault,
                          borderRadius: o.BorderRadius.SM,
                          borderWidth: 1,
                          paddingBottom: 1,
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingTop: 1,
                        },
                        k
                      )
                    )
                );
              };
            };
      },
      { package: '$root$', file: 'ui/components/component-library/textarea/textarea.tsx' },
    ],
    [
      6467,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.TextareaResize = void 0);
                n.TextareaResize = (function (e) {
                  return (
                    (e.None = 'none'),
                    (e.Both = 'both'),
                    (e.Horizontal = 'horizontal'),
                    (e.Vertical = 'vertical'),
                    (e.Initial = 'initial'),
                    (e.Inherit = 'inherit'),
                    e
                  );
                })({});
              };
            };
      },
      { package: '$root$', file: 'ui/components/component-library/textarea/textarea.types.ts' },
    ],
    [
      6468,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../component-library/form-text-field/deprecated': 6390,
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
                  (n.AccountDetailsAuthenticate = void 0);
                var a,
                  r = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  o = (function (e, t) {
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
                  i = e('react-redux'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../store/actions'),
                  u = e('../../component-library'),
                  d = e('../../component-library/form-text-field/deprecated');
                function p(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (p = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const m = ({
                  address: e,
                  onCancel: t,
                  setPrivateKey: n,
                  setShowHoldToReveal: a,
                }) => {
                  const r = (0, l.useI18nContext)(),
                    p = (0, i.useDispatch)(),
                    [m, f] = (0, o.useState)(''),
                    h = (0, i.useSelector)(e => e.appState.warning),
                    y = (0, o.useCallback)(() => {
                      p((0, c.exportAccount)(m, e, n, a))
                        .then(e => (p((0, c.hideWarning)()), e))
                        .catch(() => {});
                    }, [p, m, e, n, a]),
                    g = (0, o.useCallback)(
                      e => {
                        'Enter' === e.key && y();
                      },
                      [y]
                    );
                  return o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(d.FormTextField, {
                      marginTop: 6,
                      id: 'account-details-authenticate',
                      label: r('enterYourPassword'),
                      placeholder: r('password'),
                      error: Boolean(h),
                      helpText: h,
                      onChange: e => f(e.target.value),
                      value: m,
                      variant: s.TextVariant.bodySm,
                      type: 'password',
                      inputProps: { onKeyPress: g },
                      labelProps: { fontWeight: s.FontWeight.Medium },
                      autoFocus: !0,
                    }),
                    o.default.createElement(u.BannerAlert, {
                      marginTop: 6,
                      severity: s.Severity.Danger,
                      description: r('privateKeyWarning'),
                    }),
                    o.default.createElement(
                      u.Box,
                      { display: s.Display.Flex, marginTop: 6, gap: 2 },
                      o.default.createElement(
                        u.ButtonSecondary,
                        { onClick: t, block: !0 },
                        r('cancel')
                      ),
                      o.default.createElement(
                        u.ButtonPrimary,
                        { onClick: y, disabled: '' === m, block: !0 },
                        r('confirm')
                      )
                    )
                  );
                };
                (n.AccountDetailsAuthenticate = m),
                  (m.propTypes = {
                    address: r.default.string.isRequired,
                    onCancel: r.default.func.isRequired,
                    setPrivateKey: r.default.func.isRequired,
                    setShowHoldToReveal: r.default.func.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-details/account-details-authenticate.js',
      },
    ],
    [
      6469,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useAsync': 6969,
        '../../../hooks/useI18nContext': 6985,
        '../../../pages/confirmations/hooks/useEIP7702Account': 7334,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/editable-label/editable-label': 6733,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AccountDetailsDisplay = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = E(t);
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
                  r = T(e('prop-types')),
                  o = e('react-redux'),
                  i = T(e('../../ui/qr-code-view')),
                  s = T(e('../../ui/editable-label/editable-label')),
                  l = e('../../../store/actions'),
                  c = e('../../../selectors'),
                  u = e('../../../helpers/utils/util'),
                  d = e('../../component-library'),
                  p = e('../../../helpers/constants/design-system'),
                  m = e('../../../contexts/metametrics'),
                  f = e('../../../../shared/constants/metametrics'),
                  h = e('../../../hooks/useI18nContext'),
                  y = e('../../../../shared/modules/selectors/networks'),
                  g = e('../../../selectors/selectors'),
                  b = e('../../../pages/confirmations/hooks/useEIP7702Account'),
                  v = e('../../../hooks/useAsync');
                function T(e) {
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
                function w({ address: e }) {
                  const t = (0, h.useI18nContext)(),
                    { isUpgraded: n } = (0, b.useEIP7702Account)(),
                    { value: r } = (0, v.useAsyncResult)(() => n(e), [e]);
                  return r
                    ? a.default.createElement(
                        d.Box,
                        {
                          display: p.Display.Flex,
                          flexDirection: p.FlexDirection.Row,
                          backgroundColor: p.BackgroundColor.backgroundAlternative,
                          alignItems: p.AlignItems.center,
                          borderRadius: p.BorderRadius.pill,
                          margin: 4,
                          style: {
                            padding: '0px 8px',
                            flexShrink: 1,
                            flexBasis: 'auto',
                            minWidth: 0,
                          },
                        },
                        a.default.createElement(
                          d.Text,
                          {
                            ellipsis: !0,
                            variant: p.TextVariant.bodyMd,
                            color: p.TextColor.textAlternativeSoft,
                          },
                          t('confirmAccountTypeSmartContract')
                        )
                      )
                    : null;
                }
                function S({ address: e, onClose: t }) {
                  const n = (0, h.useI18nContext)(),
                    { downgradeAccount: r, isUpgraded: o } = (0, b.useEIP7702Account)({
                      onRedirect: t,
                    }),
                    { value: i } = (0, v.useAsyncResult)(() => o(e), [e]),
                    s = (0, a.useCallback)(async () => {
                      await r(e);
                    }, [e, r]);
                  return i
                    ? a.default.createElement(
                        d.ButtonSecondary,
                        {
                          block: !0,
                          size: d.ButtonSecondarySize.Lg,
                          variant: p.TextVariant.bodyMd,
                          marginBottom: 4,
                          onClick: s,
                        },
                        n('accountDetailsRevokeDelegationButton')
                      )
                    : null;
                }
                const x = ({
                  accounts: e,
                  accountName: t,
                  address: n,
                  onExportClick: r,
                  onClose: b,
                }) => {
                  const v = (0, o.useDispatch)(),
                    T = (0, a.useContext)(m.MetaMetricsContext),
                    E = (0, h.useI18nContext)(),
                    x = (0, o.useSelector)(g.getHDEntropyIndex),
                    C = (0, o.useSelector)(e => (0, c.getInternalAccountByAddress)(e, n)),
                    {
                      metadata: { keyring: k },
                    } = C,
                    _ = (0, u.isAbleToExportAccount)(null == k ? void 0 : k.type),
                    A = (0, o.useSelector)(c.getMetaMaskKeyrings),
                    O = (0, u.isAbleToRevealSrp)(C, A),
                    I = (0, o.useSelector)(y.getCurrentChainId),
                    N = (0, o.useSelector)(c.getHardwareWalletType);
                  return a.default.createElement(
                    d.Box,
                    {
                      display: p.Display.Flex,
                      alignItems: p.AlignItems.center,
                      flexDirection: p.FlexDirection.Column,
                    },
                    a.default.createElement(s.default, {
                      defaultValue: t,
                      onSubmit: e => {
                        v((0, l.setAccountLabel)(n, e)),
                          T({
                            category: f.MetaMetricsEventCategory.Accounts,
                            event: f.MetaMetricsEventName.AccountRenamed,
                            properties: {
                              location: 'Account Details Modal',
                              chain_id: I,
                              account_hardware_type: N,
                            },
                          });
                      },
                      accounts: e,
                    }),
                    a.default.createElement(w, { address: n }),
                    a.default.createElement(i.default, { Qr: { data: n } }),
                    a.default.createElement(S, { address: n, onClose: b }),
                    _
                      ? a.default.createElement(
                          d.ButtonSecondary,
                          {
                            'data-testid': 'account-details-display-export-private-key',
                            block: !0,
                            size: d.ButtonSecondarySize.Lg,
                            variant: p.TextVariant.bodyMd,
                            marginBottom: 1,
                            onClick: () => {
                              T({
                                category: f.MetaMetricsEventCategory.Accounts,
                                event: f.MetaMetricsEventName.KeyExportSelected,
                                properties: {
                                  key_type: f.MetaMetricsEventKeyType.Pkey,
                                  location: 'Account Details Modal',
                                  hd_entropy_index: x,
                                },
                              }),
                                r('PrivateKey');
                            },
                          },
                          E('showPrivateKey')
                        )
                      : null,
                    O
                      ? a.default.createElement(
                          d.ButtonSecondary,
                          {
                            'data-testid': 'account-details-display-export-srp',
                            block: !0,
                            size: d.ButtonSecondarySize.Lg,
                            variant: p.TextVariant.bodyMd,
                            onClick: () => {
                              r('SRP');
                            },
                          },
                          E('showSRP')
                        )
                      : null
                  );
                };
                (n.AccountDetailsDisplay = x),
                  (x.propTypes = {
                    accounts: r.default.array.isRequired,
                    accountName: r.default.string.isRequired,
                    address: r.default.string.isRequired,
                    onExportClick: r.default.func.isRequired,
                    onClose: r.default.func.isRequired,
                  }),
                  (w.propTypes = { address: r.default.string.isRequired }),
                  (S.propTypes = {
                    address: r.default.string.isRequired,
                    onClose: r.default.func.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-details/account-details-display.js',
      },
    ],
    [
      6470,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '@lavamoat/lavadome-react': 758,
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
                  (n.AccountDetailsKey = void 0);
                var a,
                  r = (function (e, t) {
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
                  o = e('@lavamoat/lavadome-react'),
                  i = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  s = e('../../component-library'),
                  l = e('../../../helpers/constants/design-system'),
                  c = e('../../../hooks/useI18nContext'),
                  u = e('../../../hooks/useCopyToClipboard');
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (d = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const p = Boolean(!1),
                  m = ({ accountName: e, onClose: t, privateKey: n }) => {
                    const a = (0, c.useI18nContext)(),
                      [i, d] = (0, r.useState)(!1),
                      [m, f] = (0, u.useCopyToClipboard)();
                    return r.default.createElement(
                      r.default.Fragment,
                      null,
                      r.default.createElement(
                        s.Text,
                        {
                          marginTop: 6,
                          variant: l.TextVariant.bodySm,
                          style: { wordBreak: 'break-word' },
                        },
                        a('privateKeyCopyWarning', [e])
                      ),
                      r.default.createElement(
                        s.Box,
                        {
                          display: l.Display.Flex,
                          flexDirection: l.FlexDirection.Row,
                          alignItems: l.AlignItems.center,
                          borderRadius: l.BorderRadius.SM,
                          borderWidth: 1,
                          borderColor: l.BorderColor.default,
                          padding: 4,
                          gap: 4,
                        },
                        r.default.createElement(
                          s.Text,
                          {
                            'data-testid': 'account-details-key',
                            variant: l.TextVariant.bodySm,
                            style: { wordBreak: 'break-word' },
                            onClick: () => d(!0),
                          },
                          r.default.createElement(o.LavaDome, {
                            unsafeOpenModeShadow: p,
                            text: (0, o.toLavaDomeToken)(n),
                          })
                        ),
                        r.default.createElement(s.ButtonIcon, {
                          onClick: () => d(!1) || f(n),
                          iconName: m ? s.IconName.CopySuccess : s.IconName.Copy,
                          ariaLabel: a('copyPrivateKey'),
                        })
                      ),
                      i &&
                        r.default.createElement(
                          s.HelpText,
                          { marginTop: 2, severity: s.HelpTextSeverity.Danger },
                          a('lavaDomeCopyWarning')
                        ),
                      r.default.createElement(
                        s.BannerAlert,
                        { severity: l.Severity.Danger, marginTop: 4 },
                        r.default.createElement(
                          s.Text,
                          { variant: l.TextVariant.bodySm },
                          a('privateKeyWarning')
                        )
                      ),
                      r.default.createElement(
                        s.ButtonPrimary,
                        { marginTop: 6, onClick: t, block: !0 },
                        a('done')
                      )
                    );
                  };
                (n.AccountDetailsKey = m),
                  (m.propTypes = {
                    accountName: i.default.string.isRequired,
                    onClose: i.default.func.isRequired,
                    privateKey: i.default.string.isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-details/account-details-key.js',
      },
    ],
    [
      6471,
      {
        '../../../../shared/constants/accounts': 5785,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/lib/accounts': 5824,
        '../../../../shared/lib/keyring': 5836,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../app/modals/hold-to-reveal-modal/hold-to-reveal-modal': 6075,
        '../../app/srp-quiz-modal': 6282,
        '../../component-library': 6402,
        '../address-copy-button': 6493,
        './account-details-authenticate': 6468,
        './account-details-display': 6469,
        './account-details-key': 6470,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AccountDetails = void 0);
                var a = C(e('prop-types')),
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
                  i = e('@metamask/keyring-controller'),
                  s = e('../../../../shared/constants/metametrics'),
                  l = e('../../../contexts/metametrics'),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../../hooks/useI18nContext'),
                  d = e('../../../selectors'),
                  p = e('../../../store/actions'),
                  m = C(e('../../app/modals/hold-to-reveal-modal/hold-to-reveal-modal')),
                  f = e('../../component-library'),
                  h = e('../address-copy-button'),
                  y = C(e('../../app/srp-quiz-modal')),
                  g = e('../../../../shared/lib/keyring'),
                  b = e('../../../helpers/utils/util'),
                  v = e('../../../../shared/lib/accounts'),
                  T = e('../../../../shared/constants/accounts'),
                  E = e('./account-details-authenticate'),
                  w = e('./account-details-display'),
                  S = e('./account-details-key');
                function x(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (x = function (e) {
                    return e ? n : t;
                  })(e);
                }
                function C(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const k = ({ address: e }) => {
                  var t;
                  const n = (0, o.useDispatch)(),
                    a = (0, u.useI18nContext)(),
                    x = (0, r.useContext)(l.MetaMetricsContext),
                    C = (0, o.useSelector)(d.getHDEntropyIndex),
                    k = (0, o.useSelector)(d.getUseBlockie),
                    _ = (0, o.useSelector)(d.getMetaMaskAccountsOrdered),
                    A = (0, o.useSelector)(t => (0, d.getInternalAccountByAddress)(t, e)),
                    {
                      metadata: {
                        name: O,
                        keyring: { type: I },
                      },
                      options: { entropySource: N },
                    } = A,
                    M = null === (t = A.metadata.snap) || void 0 === t ? void 0 : t.id,
                    [P, R] = (0, r.useState)(!1);
                  let B = !P;
                  const [D, j] = (0, r.useState)(!1);
                  B = !P && !D;
                  const L = (0, o.useSelector)(d.getMetaMaskKeyrings),
                    F = (0, o.useSelector)(d.getMetaMaskKeyringsMetadata),
                    U =
                      I === i.KeyringTypes.snap && (0, v.isMultichainWalletSnap)(M) && N
                        ? N
                        : (0, g.findKeyringId)(L, F, { address: e }),
                    $ = (0, b.isAbleToRevealSrp)(A, L),
                    V = U && $,
                    [H, z] = (0, r.useState)(T.AttemptExportState.None),
                    [W, G] = (0, r.useState)(''),
                    Y = (0, r.useCallback)(() => {
                      n((0, p.setAccountDetailsAddress)('')),
                        n((0, p.clearAccountDetails)()),
                        n((0, p.hideWarning)());
                    }, [n]),
                    q = r.default.createElement(f.AvatarAccount, {
                      variant: k
                        ? f.AvatarAccountVariant.Blockies
                        : f.AvatarAccountVariant.Jazzicon,
                      address: e,
                      size: f.AvatarAccountSize.Lg,
                      style: { margin: '0 auto' },
                    });
                  return r.default.createElement(
                    r.default.Fragment,
                    null,
                    r.default.createElement(
                      f.Modal,
                      { isOpen: B, onClose: Y, 'data-testid': 'account-details-modal' },
                      r.default.createElement(f.ModalOverlay, null),
                      r.default.createElement(
                        f.ModalContent,
                        null,
                        r.default.createElement(
                          f.ModalHeader,
                          {
                            onClose: Y,
                            onBack: () => {
                              H === T.AttemptExportState.PrivateKey
                                ? (n((0, p.hideWarning)()), G(''), z(T.AttemptExportState.None))
                                : H === T.AttemptExportState.None && Y();
                            },
                          },
                          H === T.AttemptExportState.PrivateKey ? a('showPrivateKey') : q
                        ),
                        r.default.createElement(
                          f.ModalBody,
                          null,
                          H === T.AttemptExportState.None &&
                            r.default.createElement(w.AccountDetailsDisplay, {
                              accounts: _,
                              accountName: O,
                              address: e,
                              onExportClick: e => {
                                e === T.AttemptExportState.SRP && j(!0), z(e);
                              },
                              onClose: Y,
                            }),
                          H === T.AttemptExportState.PrivateKey &&
                            r.default.createElement(
                              r.default.Fragment,
                              null,
                              r.default.createElement(
                                f.Box,
                                {
                                  display: c.Display.Flex,
                                  alignItems: c.AlignItems.center,
                                  flexDirection: c.FlexDirection.Column,
                                },
                                q,
                                r.default.createElement(
                                  f.Text,
                                  {
                                    marginTop: 2,
                                    marginBottom: 2,
                                    variant: c.TextVariant.bodyLgMedium,
                                    style: { wordBreak: 'break-word' },
                                  },
                                  O
                                ),
                                r.default.createElement(h.AddressCopyButton, {
                                  address: e,
                                  shorten: !0,
                                })
                              ),
                              W
                                ? r.default.createElement(S.AccountDetailsKey, {
                                    accountName: O,
                                    onClose: Y,
                                    privateKey: W,
                                  })
                                : r.default.createElement(E.AccountDetailsAuthenticate, {
                                    address: e,
                                    onCancel: Y,
                                    setPrivateKey: G,
                                    setShowHoldToReveal: R,
                                  })
                            )
                        )
                      )
                    ),
                    r.default.createElement(m.default, {
                      isOpen: P,
                      onClose: () => {
                        x({
                          category: s.MetaMetricsEventCategory.Keys,
                          event: s.MetaMetricsEventName.KeyExportCanceled,
                          properties: {
                            key_type: s.MetaMetricsEventKeyType.Pkey,
                            hd_entropy_index: C,
                          },
                        }),
                          G(''),
                          R(!1);
                      },
                      onLongPressed: () => {
                        R(!1);
                      },
                      holdToRevealType: 'PrivateKey',
                    }),
                    V &&
                      r.default.createElement(y.default, {
                        keyringId: U,
                        isOpen: D,
                        onClose: () => {
                          j(!1), Y();
                        },
                        closeAfterCompleting: !0,
                      })
                  );
                };
                (n.AccountDetails = k), (k.propTypes = { address: a.default.string });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-details/account-details.tsx' },
    ],
    [
      6472,
      { './account-details': 6471 },
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
                      return a.AccountDetails;
                    },
                  });
                var a = e('./account-details');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-details/index.js' },
    ],
    [
      6473,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/selectors/networks': 5875,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/metrics': 6907,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../selectors/selectors': 7611,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../ui/menu': 6773,
        '../menu-items': 6576,
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
                  (n.AccountListItemMenu = void 0);
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
                  o = e('react-redux'),
                  i = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  s = e('../../../contexts/metametrics'),
                  l = e('../../../hooks/useI18nContext'),
                  c = e('../../../../shared/modules/selectors/networks'),
                  u = e('../../../selectors'),
                  d = e('../../ui/menu'),
                  p = e('../../component-library'),
                  m = e('../../../../shared/constants/metametrics'),
                  f = e('../../../store/actions'),
                  h = e('../../../helpers/constants/design-system'),
                  y = e('../../../helpers/utils/metrics'),
                  g = e('../menu-items'),
                  b = e('../../../selectors/selectors');
                function v(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (v = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const T = 'Account Options',
                  E = ({
                    anchorElement: e,
                    onClose: t,
                    closeMenu: n,
                    isRemovable: a,
                    account: i,
                    isOpen: v,
                    isPinned: E,
                    isHidden: w,
                  }) => {
                    const S = (0, l.useI18nContext)(),
                      x = (0, r.useContext)(s.MetaMetricsContext),
                      C = (0, o.useSelector)(b.getHDEntropyIndex),
                      k = (0, o.useDispatch)(),
                      _ = (0, o.useSelector)(c.getCurrentChainId),
                      A = (0, o.useSelector)(u.getHardwareWalletType),
                      { keyring: O } = i.metadata,
                      I = (0, y.formatAccountType)((0, u.getAccountTypeForKeyring)(O)),
                      N = (0, o.useSelector)(u.getPinnedAccountsList),
                      M = (0, o.useSelector)(u.getHiddenAccountsList),
                      P = (0, r.useRef)(null),
                      R = (0, r.useRef)(null),
                      B = (0, r.useRef)(null),
                      D = (0, r.useRef)(null);
                    (0, r.useEffect)(() => {
                      D.current
                        ? (P.current = D.current)
                        : B.current
                          ? (P.current = B.current)
                          : (P.current = R.current);
                    }, [D.current, B.current, R.current]);
                    const j = (0, r.useCallback)(
                        e => {
                          'Tab' === e.key && e.target === P.current && t();
                        },
                        [t]
                      ),
                      L = (0, r.useRef)(null),
                      F = (0, r.useCallback)(
                        e => {
                          null != L && L.current && !L.current.contains(e.target) && t();
                        },
                        [t]
                      );
                    (0, r.useEffect)(
                      () => (
                        document.addEventListener('mousedown', F),
                        () => {
                          document.removeEventListener('mousedown', F);
                        }
                      ),
                      [F]
                    );
                    const U = e => {
                      const t = N.filter(t => t !== e);
                      k((0, f.updateAccountsList)(t));
                    };
                    return r.default.createElement(
                      p.Popover,
                      {
                        className: 'multichain-account-list-item-menu__popover',
                        referenceElement: e,
                        role: p.PopoverRole.Dialog,
                        position: p.PopoverPosition.Bottom,
                        offset: [0, 0],
                        padding: 0,
                        isOpen: v,
                        isPortal: !0,
                        preventOverflow: !0,
                        flip: !0,
                      },
                      r.default.createElement(
                        p.ModalFocus,
                        { restoreFocus: !0, initialFocusRef: e },
                        r.default.createElement(
                          'div',
                          { onKeyDown: j, ref: L },
                          r.default.createElement(g.AccountDetailsMenuItem, {
                            metricsLocation: T,
                            closeMenu: n,
                            address: i.address,
                            textProps: { variant: h.TextVariant.bodySm },
                          }),
                          r.default.createElement(g.ViewExplorerMenuItem, {
                            metricsLocation: T,
                            closeMenu: n,
                            textProps: { variant: h.TextVariant.bodySm },
                            account: i,
                          }),
                          w
                            ? null
                            : r.default.createElement(
                                d.MenuItem,
                                {
                                  'data-testid': 'account-list-menu-pin',
                                  onClick: () => {
                                    E
                                      ? U(i.address)
                                      : (e => {
                                          const t = [...N, e];
                                          k((0, f.updateAccountsList)(t));
                                        })(i.address),
                                      t();
                                  },
                                  iconName: E ? p.IconName.Unpin : p.IconName.Pin,
                                },
                                r.default.createElement(
                                  p.Text,
                                  { variant: h.TextVariant.bodySm },
                                  S(E ? 'unpin' : 'pinToTop')
                                )
                              ),
                          r.default.createElement(
                            d.MenuItem,
                            {
                              'data-testid': 'account-list-menu-hide',
                              onClick: () => {
                                w
                                  ? (e => {
                                      const t = M.filter(t => t !== e);
                                      k((0, f.updateHiddenAccountsList)(t));
                                    })(i.address)
                                  : (e => {
                                      const t = [...M, e];
                                      N.includes(e) && U(e), k((0, f.updateHiddenAccountsList)(t));
                                    })(i.address),
                                  t();
                              },
                              iconName: w ? p.IconName.Eye : p.IconName.EyeSlash,
                            },
                            r.default.createElement(
                              p.Text,
                              { variant: h.TextVariant.bodySm },
                              S(w ? 'showAccount' : 'hideAccount')
                            )
                          ),
                          a
                            ? r.default.createElement(
                                d.MenuItem,
                                {
                                  ref: B,
                                  'data-testid': 'account-list-menu-remove',
                                  onClick: () => {
                                    k(
                                      (0, f.showModal)({
                                        name: 'CONFIRM_REMOVE_ACCOUNT',
                                        account: i,
                                      })
                                    ),
                                      x({
                                        event: m.MetaMetricsEventName.AccountRemoved,
                                        category: m.MetaMetricsEventCategory.Accounts,
                                        properties: {
                                          account_hardware_type: A,
                                          chain_id: _,
                                          account_type: I,
                                          hd_entropy_index: C,
                                        },
                                      }),
                                      t(),
                                      null == n || n();
                                  },
                                  iconName: p.IconName.Trash,
                                },
                                r.default.createElement(
                                  p.Text,
                                  { variant: h.TextVariant.bodySm },
                                  S('removeAccount')
                                )
                              )
                            : null
                        )
                      )
                    );
                  };
                (n.AccountListItemMenu = E),
                  (E.propTypes = {
                    anchorElement: i.default.instanceOf(window.Element),
                    onClose: i.default.func.isRequired,
                    isOpen: i.default.bool.isRequired,
                    closeMenu: i.default.func,
                    isRemovable: i.default.bool.isRequired,
                    isPinned: i.default.bool,
                    isHidden: i.default.bool,
                    account: i.default.shape({
                      id: i.default.string.isRequired,
                      address: i.default.string.isRequired,
                      balance: i.default.string.isRequired,
                      metadata: i.default.shape({
                        name: i.default.string.isRequired,
                        snap: i.default.shape({
                          id: i.default.string.isRequired,
                          name: i.default.string,
                          enabled: i.default.bool,
                        }),
                        keyring: i.default.shape({ type: i.default.string.isRequired }).isRequired,
                      }).isRequired,
                    }).isRequired,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-list-item-menu/account-list-item-menu.js',
      },
    ],
    [
      6474,
      { './account-list-item-menu': 6473 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountListItemMenu', {
                    enumerable: !0,
                    get: function () {
                      return a.AccountListItemMenu;
                    },
                  });
                var a = e('./account-list-item-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-list-item-menu/index.js' },
    ],
    [
      6475,
      {
        '../../../../app/scripts/lib/multichain/address': 142,
        '../../../../shared/constants/keyring': 5797,
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/common': 6870,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/accounts': 6896,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useAccountTotalCrossChainFiatBalance': 6965,
        '../../../hooks/useGetFormattedTokensPerChain': 6984,
        '../../../hooks/useI18nContext': 6985,
        '../../../hooks/useMultichainAccountTotalFiatBalance': 6991,
        '../../../hooks/useMultichainSelector': 6993,
        '../../../selectors': 7601,
        '../../../selectors/assets': 7595,
        '../../../selectors/multichain': 7605,
        '../../../selectors/selectors': 7611,
        '../../app/user-preferenced-currency-display/user-preferenced-currency-display.component': 6318,
        '../../component-library': 6402,
        '../../ui/tooltip/tooltip': 6819,
        '../account-list-item-menu': 6474,
        '../avatar-group': 6525,
        '../connected-accounts-menu': 6535,
        '../connected-status': 6541,
        './account-list-item.types': 6476,
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
                    var n = P(t);
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
                  r = M(e('prop-types')),
                  o = M(e('classnames')),
                  i = e('react-redux'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../../helpers/utils/util'),
                  c = e('../account-list-item-menu'),
                  u = e('../avatar-group'),
                  d = e('../connected-accounts-menu'),
                  p = e('../../component-library'),
                  m = e('../../../helpers/constants/design-system'),
                  f = e('../../../../shared/constants/keyring'),
                  h = M(
                    e(
                      '../../app/user-preferenced-currency-display/user-preferenced-currency-display.component'
                    )
                  ),
                  y = e('../../../helpers/constants/common'),
                  g = M(e('../../ui/tooltip/tooltip')),
                  b = e('../../../../shared/constants/metametrics'),
                  v = e('../../../contexts/metametrics'),
                  T = e('../../../selectors'),
                  E = e('../../../selectors/multichain'),
                  w = e('../../../hooks/useMultichainAccountTotalFiatBalance'),
                  S = e('../connected-status'),
                  x = e('../../../selectors/selectors'),
                  C = e('../../../../app/scripts/lib/multichain/address'),
                  k = e('../../../hooks/useMultichainSelector'),
                  _ = e('../../../hooks/useGetFormattedTokensPerChain'),
                  A = e('../../../hooks/useAccountTotalCrossChainFiatBalance'),
                  O = e('../../../helpers/utils/accounts'),
                  I = e('../../../selectors/assets'),
                  N = e('./account-list-item.types');
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
                const R = ({
                  account: e,
                  selected: t,
                  onClick: n,
                  closeMenu: r,
                  accountsCount: M,
                  connectedAvatar: P,
                  isPinned: R = !1,
                  menuType: B = N.AccountListItemMenuTypes.None,
                  isHidden: D = !1,
                  currentTabOrigin: j,
                  isActive: L = !1,
                  startAccessory: F,
                  onActionClick: U,
                  shouldScrollToWhenSelected: $ = !0,
                  privacyMode: V = !1,
                }) => {
                  const H = (0, s.useI18nContext)(),
                    z = (0, i.useSelector)(x.getHDEntropyIndex),
                    [W, G] = (0, a.useState)(!1),
                    [Y, q] = (0, a.useState)(),
                    K = (0, i.useSelector)(T.getSnapsMetadata),
                    Q = (0, i.useSelector)(T.getMetaMaskKeyrings),
                    J = (0, a.useMemo)(() => {
                      var t;
                      return (0, O.getAccountLabels)(
                        e.metadata.keyring.type,
                        e,
                        Q,
                        e.metadata.keyring.type === f.KeyringType.snap
                          ? (0, l.getSnapName)(K)(
                              null === (t = e.metadata) ||
                                void 0 === t ||
                                null === (t = t.snap) ||
                                void 0 === t
                                ? void 0
                                : t.id
                            )
                          : null
                      );
                    }, [e, Q, K]),
                    X = (0, i.useSelector)(T.getUseBlockie),
                    { isEvmNetwork: Z } = (0, k.useMultichainSelector)(E.getMultichainNetwork, e),
                    ee = (0, k.useMultichainSelector)(E.getMultichainIsTestnet, e),
                    te = !ee,
                    ne = (0, k.useMultichainSelector)(E.getMultichainShouldShowFiat, e),
                    ae = (0, i.useSelector)(T.getShowFiatInTestnets),
                    re = ne && (te || (ee && ae)),
                    oe = (0, w.useMultichainAccountTotalFiatBalance)(e),
                    ie = (0, i.useSelector)(t => (0, I.getMultichainAggregatedBalance)(t, e)),
                    se = (0, i.useSelector)(T.getShouldHideZeroBalanceTokens),
                    le = (0, i.useSelector)(T.getIsTokenNetworkFilterEqualCurrentNetwork),
                    ce = (0, i.useSelector)(T.getChainIdsToPoll),
                    { formattedTokensWithBalancesPerChain: ue } = (0,
                    _.useGetFormattedTokensPerChain)(e, se, le, ce),
                    { totalFiatBalance: de } = (0, A.useAccountTotalCrossChainFiatBalance)(e, ue),
                    pe = (0, a.useMemo)(
                      () => oe.orderedTokenList.map(e => ({ avatarValue: e.iconUrl })),
                      [oe.orderedTokenList]
                    );
                  let me;
                  me = Z ? (!ne || ee ? e.balance : de) : ie;
                  const fe = (0, a.useRef)(null);
                  (0, a.useEffect)(() => {
                    var e, n;
                    t &&
                      $ &&
                      (null === (e = fe.current) ||
                        void 0 === e ||
                        null === (n = e.scrollIntoView) ||
                        void 0 === n ||
                        n.call(e));
                  }, [fe, t, $]);
                  const he = (0, a.useContext)(v.MetaMetricsContext),
                    ye = (0, k.useMultichainSelector)(E.getMultichainNativeCurrencyImage, e),
                    ge = (0, k.useMultichainSelector)(E.getMultichainNativeCurrency, e),
                    be = (0, i.useSelector)(t =>
                      (0, T.isAccountConnectedToCurrentTab)(t, e.address)
                    ),
                    ve = j && be,
                    Te = 1 === M;
                  return a.default.createElement(
                    p.Box,
                    {
                      display: m.Display.Flex,
                      padding: 4,
                      backgroundColor: t ? m.Color.primaryMuted : m.Color.transparent,
                      className: (0, o.default)('multichain-account-list-item', {
                        'multichain-account-list-item--selected': t,
                        'multichain-account-list-item--connected': Boolean(P),
                        'multichain-account-list-item--clickable': Boolean(n),
                      }),
                      ref: fe,
                      onClick: () => {
                        W || null == n || n(e);
                      },
                    },
                    F
                      ? a.default.createElement(p.Box, { marginInlineEnd: 2, marginTop: 1 }, F)
                      : null,
                    t &&
                      a.default.createElement(p.Box, {
                        className: 'multichain-account-list-item__selected-indicator',
                        borderRadius: m.BorderRadius.pill,
                        backgroundColor: m.Color.primaryDefault,
                      }),
                    a.default.createElement(
                      a.default.Fragment,
                      null,
                      a.default.createElement(
                        p.Box,
                        {
                          display: [m.Display.Flex, m.Display.None],
                          'data-testid': 'account-list-item-badge',
                        },
                        a.default.createElement(S.ConnectedStatus, {
                          address: e.address,
                          isActive: L,
                        })
                      ),
                      a.default.createElement(
                        p.Box,
                        { display: [m.Display.None, m.Display.Flex] },
                        a.default.createElement(p.AvatarAccount, {
                          borderColor: m.BorderColor.transparent,
                          size: m.Size.MD,
                          address: e.address,
                          variant: X
                            ? p.AvatarAccountVariant.Blockies
                            : p.AvatarAccountVariant.Jazzicon,
                          marginInlineEnd: 2,
                        })
                      )
                    ),
                    a.default.createElement(
                      p.Box,
                      {
                        display: m.Display.Flex,
                        flexDirection: m.FlexDirection.Column,
                        className: 'multichain-account-list-item__content',
                      },
                      a.default.createElement(
                        p.Box,
                        { display: m.Display.Flex, flexDirection: m.FlexDirection.Column },
                        a.default.createElement(
                          p.Box,
                          {
                            display: m.Display.Flex,
                            justifyContent: m.JustifyContent.spaceBetween,
                          },
                          a.default.createElement(
                            p.Box,
                            {
                              className: 'multichain-account-list-item__account-name',
                              marginInlineEnd: 2,
                              display: m.Display.Flex,
                              alignItems: m.AlignItems.center,
                              gap: 2,
                            },
                            R
                              ? a.default.createElement(p.Icon, {
                                  name: p.IconName.Pin,
                                  size: p.IconSize.Xs,
                                  className: 'account-pinned-icon',
                                  'data-testid': 'account-pinned-icon',
                                })
                              : null,
                            D
                              ? a.default.createElement(p.Icon, {
                                  name: p.IconName.EyeSlash,
                                  size: p.IconSize.Xs,
                                  className: 'account-hidden-icon',
                                })
                              : null,
                            a.default.createElement(
                              p.Text,
                              {
                                as: 'button',
                                onClick: t => {
                                  t.stopPropagation(), null == n || n(e);
                                },
                                variant: m.TextVariant.bodyMdMedium,
                                className: 'multichain-account-list-item__account-name__button',
                                padding: 0,
                                backgroundColor: m.BackgroundColor.transparent,
                                width: m.BlockSize.Full,
                                textAlign: m.TextAlign.Left,
                                ellipsis: !0,
                              },
                              e.metadata.name.length > 17
                                ? a.default.createElement(
                                    g.default,
                                    {
                                      title: e.metadata.name,
                                      position: 'bottom',
                                      wrapperClassName: 'multichain-account-list-item__tooltip',
                                    },
                                    e.metadata.name
                                  )
                                : e.metadata.name
                            )
                          ),
                          a.default.createElement(
                            p.Text,
                            {
                              as: 'div',
                              className: 'multichain-account-list-item__asset',
                              display: m.Display.Flex,
                              flexDirection: m.FlexDirection.Row,
                              alignItems: m.AlignItems.center,
                              justifyContent: m.JustifyContent.flexEnd,
                              ellipsis: !0,
                              textAlign: m.TextAlign.End,
                            },
                            a.default.createElement(h.default, {
                              account: e,
                              ethNumberOfDecimals: 3,
                              value: me,
                              type: y.PRIMARY,
                              showFiat: re,
                              isAggregatedFiatOverviewBalance: (() => {
                                let e;
                                return (e = (!ee && ne) || !Z), e;
                              })(),
                              'data-testid': 'first-currency-display',
                              privacyMode: V,
                            })
                          )
                        )
                      ),
                      a.default.createElement(
                        p.Box,
                        { display: m.Display.Flex, justifyContent: m.JustifyContent.spaceBetween },
                        a.default.createElement(
                          p.Box,
                          { display: m.Display.Flex, alignItems: m.AlignItems.center },
                          a.default.createElement(
                            p.Text,
                            {
                              variant: m.TextVariant.bodySm,
                              color: m.Color.textAlternative,
                              'data-testid': 'account-list-address',
                            },
                            (0, l.shortenAddress)((0, C.normalizeSafeAddress)(e.address))
                          )
                        ),
                        pe.length > 1
                          ? a.default.createElement(u.AvatarGroup, { members: pe, limit: 4 })
                          : a.default.createElement(
                              p.Box,
                              {
                                display: m.Display.Flex,
                                alignItems: m.AlignItems.center,
                                justifyContent: m.JustifyContent.center,
                                gap: 1,
                                className: 'multichain-account-list-item__avatar-currency',
                              },
                              a.default.createElement(p.AvatarToken, {
                                src: ye,
                                name: ge,
                                size: p.AvatarTokenSize.Xs,
                                borderColor: m.BorderColor.borderDefault,
                              }),
                              a.default.createElement(
                                p.Text,
                                {
                                  variant: m.TextVariant.bodySm,
                                  color: m.TextColor.textAlternative,
                                  textAlign: m.TextAlign.End,
                                  as: 'div',
                                },
                                a.default.createElement(h.default, {
                                  account: e,
                                  ethNumberOfDecimals: 3,
                                  value: (() => {
                                    let t;
                                    return (t = e.balance), t;
                                  })(),
                                  type: y.SECONDARY,
                                  showNative: !0,
                                  'data-testid': 'second-currency-display',
                                  privacyMode: V,
                                })
                              )
                            )
                      ),
                      J.length > 0
                        ? a.default.createElement(
                            p.Box,
                            { flexDirection: m.FlexDirection.Row },
                            J.map(({ label: t, icon: n }) =>
                              a.default.createElement(p.Tag, {
                                'data-testid': `account-list-item-tag-${e.id}-${t}`,
                                key: t,
                                label: t,
                                labelProps: {
                                  variant: m.TextVariant.bodyXs,
                                  color: m.Color.textAlternative,
                                },
                                startIconName: n,
                              })
                            )
                          )
                        : null
                    ),
                    B === N.AccountListItemMenuTypes.None
                      ? null
                      : a.default.createElement(p.ButtonIcon, {
                          ariaLabel: `${e.metadata.name} ${H('options')}`,
                          iconName: p.IconName.MoreVertical,
                          size: p.IconSize.Sm,
                          ref: e => {
                            q(e);
                          },
                          onClick: e => {
                            e.stopPropagation(),
                              W ||
                                he({
                                  event: b.MetaMetricsEventName.AccountDetailMenuOpened,
                                  category: b.MetaMetricsEventCategory.Navigation,
                                  properties: { location: 'Account Options', hd_entropy_index: z },
                                }),
                              G(!W);
                          },
                          'data-testid': 'account-list-item-menu-button',
                        }),
                    B === N.AccountListItemMenuTypes.Account &&
                      a.default.createElement(c.AccountListItemMenu, {
                        anchorElement: Y,
                        account: e,
                        onClose: () => G(!1),
                        isOpen: W,
                        isRemovable: e.metadata.keyring.type !== f.KeyringType.hdKeyTree,
                        closeMenu: r,
                        isPinned: R,
                        isHidden: D,
                        isConnected: ve,
                      }),
                    B === N.AccountListItemMenuTypes.Connection &&
                      a.default.createElement(d.ConnectedAccountsMenu, {
                        anchorElement: Y,
                        account: e,
                        onClose: () => G(!1),
                        disableAccountSwitcher: Te && t,
                        isOpen: W,
                        onActionClick: U,
                        activeTabOrigin: j,
                      })
                  );
                };
                (R.propTypes = {
                  account: r.default.shape({
                    id: r.default.string.isRequired,
                    address: r.default.string.isRequired,
                    balance: r.default.string.isRequired,
                    metadata: r.default.shape({
                      name: r.default.string.isRequired,
                      snap: r.default.shape({
                        id: r.default.string.isRequired,
                        name: r.default.string,
                        enabled: r.default.bool,
                      }),
                      keyring: r.default.shape({ type: r.default.string.isRequired }).isRequired,
                    }).isRequired,
                  }).isRequired,
                  selected: r.default.bool.isRequired,
                  onClick: r.default.func,
                  accountsCount: r.default.number,
                  closeMenu: r.default.func,
                  onActionClick: r.default.func,
                  connectedAvatar: r.default.string,
                  menuType: r.default.string,
                  isPinned: r.default.bool,
                  isHidden: r.default.bool,
                  currentTabOrigin: r.default.string,
                  isActive: r.default.bool,
                  startAccessory: r.default.node,
                  shouldScrollToWhenSelected: r.default.bool,
                  privacyMode: r.default.bool,
                }),
                  (R.displayName = 'AccountListItem');
                n.default = a.default.memo(R);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-list-item/account-list-item.js',
      },
    ],
    [
      6476,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AccountListItemMenuTypes = void 0);
                n.AccountListItemMenuTypes = {
                  None: 'none',
                  Connection: 'connection',
                  Account: 'account',
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-list-item/account-list-item.types.js',
      },
    ],
    [
      6477,
      { './account-list-item': 6475, './account-list-item.types': 6476 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountListItem', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  }),
                  Object.defineProperty(n, 'AccountListItemMenuTypes', {
                    enumerable: !0,
                    get: function () {
                      return o.AccountListItemMenuTypes;
                    },
                  });
                var a,
                  r = (a = e('./account-list-item')) && a.__esModule ? a : { default: a },
                  o = e('./account-list-item.types');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-list-item/index.js' },
    ],
    [
      6478,
      {
        '../../../../app/scripts/lib/snap-keyring/account-watcher-snap': 176,
        '../../../../app/scripts/lib/util': 204,
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/app-state': 5788,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/multichain/networks': 5803,
        '../../../../shared/lib/accounts/institutional-wallet-snap': 5825,
        '../../../../shared/lib/trace': 5849,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/accounts/useMultichainWalletSnapClient': 6925,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../../component-library/modal-content/deprecated': 6412,
        '../../component-library/modal-header': 6423,
        '../../component-library/text-field-search/deprecated': 6454,
        '../account-list-item': 6477,
        '../account-list-item/account-list-item.types': 6476,
        '../create-eth-account': 6545,
        '../create-snap-account': 6549,
        '../import-account': 6566,
        '../multi-srp/import-srp': 6579,
        '../multi-srp/srp-list': 6583,
        './hidden-account-list': 6479,
        '@metamask/keyring-api': 2014,
        'fuse.js': 4545,
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
                  (n.getActionTitle = n.AccountListMenu = void 0);
                var a = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var n = j(t);
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
                  r = D(e('prop-types')),
                  o = e('react-router-dom'),
                  i = D(e('fuse.js')),
                  s = e('react-redux'),
                  l = e('@metamask/keyring-api'),
                  c = e('../../component-library'),
                  u = e('../../component-library/modal-content/deprecated'),
                  d = e('../../component-library/modal-header'),
                  p = e('../../component-library/text-field-search/deprecated'),
                  m = e('../account-list-item'),
                  f = e('../account-list-item/account-list-item.types'),
                  h = e('../../../helpers/constants/design-system'),
                  y = e('../../../hooks/useI18nContext'),
                  g = e('../../../contexts/metametrics'),
                  b = e('../../../selectors'),
                  v = e('../../../store/actions'),
                  T = e('../../../../shared/constants/metametrics'),
                  E = e('../../../helpers/constants/routes'),
                  w = e('../../../../app/scripts/lib/util'),
                  S = e('../../../../shared/constants/app'),
                  x = e('../../../../app/scripts/lib/snap-keyring/account-watcher-snap'),
                  C = e('../../../../shared/constants/multichain/networks'),
                  k = e('../../../hooks/accounts/useMultichainWalletSnapClient'),
                  _ = e('../../../../shared/lib/trace'),
                  A = e('../../../../shared/constants/app-state'),
                  O = e('../create-eth-account'),
                  I = e('../create-snap-account'),
                  N = e('../import-account'),
                  M = e('../multi-srp/import-srp'),
                  P = e('../multi-srp/srp-list'),
                  R = e('../../../../shared/lib/accounts/institutional-wallet-snap'),
                  B = e('./hidden-account-list');
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
                function L() {
                  return (
                    (L = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    L.apply(null, arguments)
                  );
                }
                const F = {
                    LIST: '',
                    MENU: 'menu',
                    ADD: 'add',
                    ADD_WATCH_ONLY: 'add-watch-only',
                    ADD_SOLANA: 'add-solana',
                    IMPORT: 'import',
                    CREATE_SRP: 'create-srp',
                    IMPORT_SRP: 'import-srp',
                    SELECT_SRP: 'select-srp',
                  },
                  U = {
                    [F.ADD_BITCOIN]: {
                      clientType: k.WalletClientType.Bitcoin,
                      chainId: C.MultichainNetworks.BITCOIN,
                    },
                    [F.ADD_BITCOIN_TESTNET]: {
                      clientType: k.WalletClientType.Bitcoin,
                      chainId: C.MultichainNetworks.BITCOIN_TESTNET,
                    },
                    [F.ADD_SOLANA]: {
                      clientType: k.WalletClientType.Solana,
                      chainId: C.MultichainNetworks.SOLANA,
                    },
                  },
                  $ = (e, t) => {
                    switch (t) {
                      case F.ADD:
                        return e('addAccountFromNetwork', ['Ethereum']);
                      case F.MENU:
                        return e('addAccount');
                      case F.ADD_WATCH_ONLY:
                        return e('addAccountFromNetwork', ['Ethereum']);
                      case F.ADD_SOLANA:
                        return e('addAccountFromNetwork', ['Solana']);
                      case F.IMPORT:
                        return e('importPrivateKey');
                      case F.CREATE_SRP:
                        return e('createSecretRecoveryPhrase');
                      case F.IMPORT_SRP:
                        return e('importSecretRecoveryPhrase');
                      case F.SELECT_SRP:
                        return e('selectSecretRecoveryPhrase');
                      default:
                        return e('selectAnAccount');
                    }
                  };
                n.getActionTitle = $;
                const V = ({
                  onClose: e,
                  privacyMode: t = !1,
                  showAccountCreation: n = !0,
                  accountListItemProps: r,
                  allowedAccountTypes: D = [
                    l.EthAccountType.Eoa,
                    l.EthAccountType.Erc4337,
                    l.BtcAccountType.P2wpkh,
                    l.SolAccountType.DataAccount,
                  ],
                }) => {
                  const j = (0, y.useI18nContext)(),
                    V = (0, a.useContext)(g.MetaMetricsContext),
                    H = (0, s.useSelector)(b.getHDEntropyIndex);
                  (0, a.useEffect)(() => {
                    (0, _.endTrace)({ name: _.TraceName.AccountList });
                  }, []);
                  const z = (0, s.useSelector)(b.getMetaMaskAccountsOrdered),
                    W = (0, a.useMemo)(() => z.filter(e => D.includes(e.type)), [z, D]),
                    G = (0, s.useSelector)(b.getSelectedInternalAccount),
                    Y = (0, s.useSelector)(b.getConnectedSubjectsForAllAddresses),
                    q = (0, s.useSelector)(b.getOriginOfCurrentTab),
                    K = (0, o.useHistory)(),
                    Q = (0, s.useDispatch)(),
                    [J, X] = (0, a.useState)(''),
                    [Z, ee] = (0, a.useState)(F.LIST),
                    [te, ne] = (0, a.useState)(F.LIST),
                    ae = (0, s.useSelector)(b.getHiddenAccountsList),
                    re = (0, s.useSelector)(b.getUpdatedAndSortedAccounts),
                    oe = (0, a.useMemo)(() => re.filter(e => D.includes(e.type)), [re, D]),
                    ie = (0, s.useSelector)(b.getDefaultHomeActiveTabName),
                    se = (0, s.useSelector)(b.getIsAddSnapAccountEnabled),
                    le = (0, s.useSelector)(b.getIsWatchEthereumAccountEnabled),
                    ce = (0, a.useCallback)(async () => {
                      await V({
                        category: T.MetaMetricsEventCategory.Navigation,
                        event: T.MetaMetricsEventName.AccountAddSelected,
                        properties: {
                          account_type: T.MetaMetricsEventAccountType.Snap,
                          snap_id: x.ACCOUNT_WATCHER_SNAP_ID,
                          snap_name: x.ACCOUNT_WATCHER_NAME,
                          location: 'Main Menu',
                          hd_entropy_index: H,
                        },
                      }),
                        e(),
                        K.push(`/snaps/view/${encodeURIComponent(x.ACCOUNT_WATCHER_SNAP_ID)}`);
                    }, [V, e, K]),
                    ue = (0, s.useSelector)(b.getIsSolanaSupportEnabled),
                    de = (0, k.useMultichainWalletSnapClient)(k.WalletClientType.Solana),
                    [pe] = (0, s.useSelector)(b.getMetaMaskHdKeyrings),
                    me = (0, s.useSelector)(b.getManageInstitutionalWallets),
                    fe = (0, s.useSelector)(b.getHdKeyringOfSelectedAccountOrPrimaryKeyring),
                    [he, ye] = (0, a.useState)(fe.metadata.id),
                    ge = (0, a.useMemo)(() => {
                      let e = oe;
                      if (J) {
                        const t = new i.default(W, {
                          threshold: 0.2,
                          location: 0,
                          distance: 100,
                          maxPatternLength: 32,
                          minMatchCharLength: 1,
                          keys: ['metadata.name', 'address'],
                        });
                        t.setCollection(W), (e = t.search(J));
                      }
                      return e;
                    }, [W, oe, J]),
                    be = (0, a.useMemo)(() => $(j, Z), [Z, j]);
                  let ve;
                  Z !== F.LIST &&
                    (ve =
                      Z === F.MENU
                        ? () => ee(F.LIST)
                        : Z === F.SELECT_SRP
                          ? () => ee(te)
                          : () => ee(F.MENU));
                  const Te = (0, a.useCallback)(
                      t => {
                        e(),
                          V({
                            category: T.MetaMetricsEventCategory.Navigation,
                            event: T.MetaMetricsEventName.NavAccountSwitched,
                            properties: { location: 'Main Menu', hd_entropy_index: H },
                          }),
                          (0, _.endTrace)({
                            name: A.ACCOUNT_OVERVIEW_TAB_KEY_TO_TRACE_NAME_MAP[ie],
                          }),
                          (0, _.trace)({ name: A.ACCOUNT_OVERVIEW_TAB_KEY_TO_TRACE_NAME_MAP[ie] }),
                          Q((0, v.setSelectedAccount)(t.address));
                      },
                      [Q, e, V, ie, H]
                    ),
                    Ee = (0, a.useMemo)(
                      () =>
                        ge.map(n => {
                          var o;
                          const i =
                              null === (o = Y[n.address]) || void 0 === o
                                ? void 0
                                : o.find(({ origin: e }) => e === q),
                            s = 0 === J.length && n.hidden;
                          return a.default.createElement(
                            c.Box,
                            {
                              className: n.hidden
                                ? 'multichain-account-menu-popover__list--menu-item-hidden'
                                : 'multichain-account-menu-popover__list--menu-item',
                              display: s ? h.Display.None : h.Display.Block,
                              key: n.address,
                            },
                            a.default.createElement(
                              m.AccountListItem,
                              L(
                                {
                                  onClick: Te,
                                  account: n,
                                  key: n.address,
                                  selected: G.address === n.address,
                                  closeMenu: e,
                                  connectedAvatar: null == i ? void 0 : i.iconUrl,
                                  menuType: f.AccountListItemMenuTypes.Account,
                                  isPinned: Boolean(n.pinned),
                                  isHidden: Boolean(n.hidden),
                                  currentTabOrigin: q,
                                  isActive: Boolean(n.active),
                                  privacyMode: t,
                                },
                                r
                              )
                            )
                          );
                        }),
                      [ge, Y, q, t, r, G, e, Te, J]
                    ),
                    we = (0, a.useCallback)(
                      async t => {
                        t ? e() : ee(F.LIST);
                      },
                      [e, ee]
                    ),
                    Se = (0, a.useCallback)(() => {
                      V({
                        category: T.MetaMetricsEventCategory.Accounts,
                        event: T.MetaMetricsEventName.SecretRecoveryPhrasePickerClicked,
                      }),
                        ne(Z),
                        ee(F.SELECT_SRP);
                    }, [ee, Z, V]),
                    { clientType: xe, chainId: Ce } = U[Z] || { clientType: null, chainId: null };
                  return a.default.createElement(
                    c.Modal,
                    { isOpen: !0, onClose: e },
                    a.default.createElement(c.ModalOverlay, null),
                    a.default.createElement(
                      u.ModalContent,
                      {
                        className: 'multichain-account-menu-popover',
                        modalDialogProps: {
                          className: 'multichain-account-menu-popover__dialog',
                          padding: 0,
                          display: h.Display.Flex,
                          flexDirection: h.FlexDirection.Column,
                        },
                      },
                      a.default.createElement(
                        d.ModalHeader,
                        { padding: 4, onClose: e, onBack: ve },
                        be
                      ),
                      Z === F.ADD
                        ? a.default.createElement(
                            c.Box,
                            { paddingLeft: 4, paddingRight: 4, paddingBottom: 4 },
                            a.default.createElement(O.CreateEthAccount, {
                              onActionComplete: we,
                              selectedKeyringId: he,
                              onSelectSrp: Se,
                            })
                          )
                        : null,
                      xe && Ce
                        ? a.default.createElement(
                            c.Box,
                            { paddingLeft: 4, paddingRight: 4, paddingBottom: 4 },
                            a.default.createElement(I.CreateSnapAccount, {
                              onActionComplete: we,
                              selectedKeyringId: he,
                              onSelectSrp: Se,
                              clientType: xe,
                              chainId: Ce,
                            })
                          )
                        : null,
                      Z === F.IMPORT
                        ? a.default.createElement(
                            c.Box,
                            { paddingLeft: 4, paddingRight: 4, paddingBottom: 4, paddingTop: 0 },
                            a.default.createElement(N.ImportAccount, { onActionComplete: we })
                          )
                        : null,
                      Z === F.IMPORT_SRP &&
                        a.default.createElement(
                          c.Box,
                          {
                            paddingLeft: 4,
                            paddingRight: 4,
                            paddingBottom: 4,
                            paddingTop: 0,
                            style: { overflowY: 'scroll' },
                          },
                          a.default.createElement(M.ImportSrp, { onActionComplete: we })
                        ),
                      Z === F.SELECT_SRP &&
                        a.default.createElement(P.SrpList, {
                          onActionComplete: e => {
                            ye(e), ee(te);
                          },
                        }),
                      Z === F.MENU
                        ? a.default.createElement(
                            c.Box,
                            { padding: 4 },
                            a.default.createElement(
                              c.Text,
                              {
                                variant: h.TextVariant.bodySmMedium,
                                marginBottom: 4,
                                color: h.TextColor.textAlternative,
                              },
                              j('createNewAccountHeader')
                            ),
                            a.default.createElement(
                              c.Box,
                              null,
                              a.default.createElement(
                                c.ButtonLink,
                                {
                                  size: c.ButtonLinkSize.Sm,
                                  startIconName: c.IconName.Add,
                                  startIconProps: { size: c.IconSize.Md },
                                  onClick: () => {
                                    V({
                                      category: T.MetaMetricsEventCategory.Navigation,
                                      event: T.MetaMetricsEventName.AccountAddSelected,
                                      properties: {
                                        account_type: T.MetaMetricsEventAccountType.Default,
                                        location: 'Main Menu',
                                        hd_entropy_index: H,
                                      },
                                    }),
                                      ee(F.ADD);
                                  },
                                  'data-testid': 'multichain-account-menu-popover-add-account',
                                },
                                j('addNewEthereumAccountLabel')
                              )
                            ),
                            ue &&
                              a.default.createElement(
                                c.Box,
                                { marginTop: 4 },
                                a.default.createElement(
                                  c.ButtonLink,
                                  {
                                    size: c.ButtonLinkSize.Sm,
                                    startIconName: c.IconName.Add,
                                    startIconProps: { size: c.IconSize.Md },
                                    onClick: async () =>
                                      await (async (e, t, n) => (
                                        V({
                                          category: T.MetaMetricsEventCategory.Navigation,
                                          event: T.MetaMetricsEventName.AccountAddSelected,
                                          properties: {
                                            account_type: T.MetaMetricsEventAccountType.Snap,
                                            snap_id: e.getSnapId(),
                                            snap_name: e.getSnapName(),
                                            location: 'Main Menu',
                                            hd_entropy_index: H,
                                          },
                                        }),
                                        ee(n)
                                      ))(
                                        de,
                                        (C.MultichainNetworks.SOLANA, pe.metadata.id),
                                        F.ADD_SOLANA
                                      ),
                                    'data-testid':
                                      'multichain-account-menu-popover-add-solana-account',
                                  },
                                  j('addNewSolanaAccountLabel')
                                )
                              ),
                            a.default.createElement(
                              c.Text,
                              {
                                variant: h.TextVariant.bodySmMedium,
                                marginTop: 4,
                                marginBottom: 4,
                                color: h.TextColor.textAlternative,
                              },
                              j('importWalletOrAccountHeader')
                            ),
                            a.default.createElement(
                              c.Box,
                              { marginTop: 4 },
                              a.default.createElement(
                                c.ButtonLink,
                                {
                                  size: c.ButtonLinkSize.Sm,
                                  startIconName: c.IconName.Wallet,
                                  startIconProps: { size: c.IconSize.Md },
                                  onClick: () => {
                                    V({
                                      category: T.MetaMetricsEventCategory.Navigation,
                                      event:
                                        T.MetaMetricsEventName.ImportSecretRecoveryPhraseClicked,
                                    }),
                                      ee(F.IMPORT_SRP);
                                  },
                                  'data-testid': 'multichain-account-menu-popover-import-srp',
                                },
                                j('secretRecoveryPhrase')
                              )
                            ),
                            a.default.createElement(
                              c.Box,
                              { marginTop: 4 },
                              a.default.createElement(
                                c.ButtonLink,
                                {
                                  size: c.ButtonLinkSize.Sm,
                                  startIconName: c.IconName.Key,
                                  startIconProps: { size: c.IconSize.Md },
                                  'data-testid':
                                    'multichain-account-menu-popover-add-imported-account',
                                  onClick: () => {
                                    V({
                                      category: T.MetaMetricsEventCategory.Navigation,
                                      event: T.MetaMetricsEventName.AccountAddSelected,
                                      properties: {
                                        account_type: T.MetaMetricsEventAccountType.Imported,
                                        location: 'Main Menu',
                                        hd_entropy_index: H,
                                      },
                                    }),
                                      ee(F.IMPORT);
                                  },
                                },
                                j('importPrivateKey')
                              )
                            ),
                            a.default.createElement(
                              c.Text,
                              {
                                variant: h.TextVariant.bodySmMedium,
                                marginTop: 4,
                                marginBottom: 4,
                                color: h.TextColor.textAlternative,
                              },
                              j('connectAnAccountHeader')
                            ),
                            a.default.createElement(
                              c.Box,
                              { marginTop: 4 },
                              a.default.createElement(
                                c.ButtonLink,
                                {
                                  size: c.ButtonLinkSize.Sm,
                                  startIconName: c.IconName.Hardware,
                                  startIconProps: { size: c.IconSize.Md },
                                  onClick: () => {
                                    var t, n;
                                    (e(),
                                    V({
                                      category: T.MetaMetricsEventCategory.Navigation,
                                      event: T.MetaMetricsEventName.AccountAddSelected,
                                      properties: {
                                        account_type: T.MetaMetricsEventAccountType.Hardware,
                                        location: 'Main Menu',
                                        hd_entropy_index: H,
                                      },
                                    }),
                                    (0, w.getEnvironmentType)() === S.ENVIRONMENT_TYPE_POPUP)
                                      ? null ===
                                          (t = (n = global.platform).openExtensionInBrowser) ||
                                        void 0 === t ||
                                        t.call(n, E.CONNECT_HARDWARE_ROUTE)
                                      : K.push(E.CONNECT_HARDWARE_ROUTE);
                                  },
                                },
                                j('addHardwareWalletLabel')
                              )
                            ),
                            se
                              ? a.default.createElement(
                                  c.Box,
                                  { marginTop: 4 },
                                  a.default.createElement(
                                    c.ButtonLink,
                                    {
                                      size: c.ButtonLinkSize.Sm,
                                      startIconName: c.IconName.Snaps,
                                      startIconProps: { size: c.IconSize.Md },
                                      onClick: () => {
                                        e(),
                                          V({
                                            category: T.MetaMetricsEventCategory.Navigation,
                                            event: T.MetaMetricsEventName.AccountAddSelected,
                                            properties: {
                                              account_type: T.MetaMetricsEventAccountType.Snap,
                                              location: 'Main Menu',
                                              hd_entropy_index: H,
                                            },
                                          }),
                                          global.platform.openTab({
                                            url: 'https://metamask.github.io/snaps-directory-staging/main/account-management',
                                          });
                                      },
                                    },
                                    j('settingAddSnapAccount')
                                  )
                                )
                              : null,
                            le &&
                              a.default.createElement(
                                c.Box,
                                { marginTop: 4 },
                                a.default.createElement(
                                  c.ButtonLink,
                                  {
                                    disabled: !le,
                                    size: c.ButtonLinkSize.Sm,
                                    startIconName: c.IconName.Eye,
                                    startIconProps: { size: c.IconSize.Md },
                                    onClick: ce,
                                    'data-testid':
                                      'multichain-account-menu-popover-add-watch-only-account',
                                  },
                                  j('addEthereumWatchOnlyAccount')
                                )
                              ),
                            me &&
                              a.default.createElement(
                                c.Box,
                                { marginTop: 4 },
                                a.default.createElement(
                                  c.ButtonLink,
                                  {
                                    size: c.ButtonLinkSize.Sm,
                                    startIconName: c.IconName.Add,
                                    onClick: () => {
                                      e(),
                                        K.push(
                                          `/snaps/view/${encodeURIComponent(R.INSTITUTIONAL_WALLET_SNAP_ID)}`
                                        );
                                    },
                                  },
                                  j('manageInstitutionalWallets')
                                )
                              )
                          )
                        : null,
                      Z === F.LIST
                        ? a.default.createElement(
                            a.default.Fragment,
                            null,
                            W.length > 1
                              ? a.default.createElement(
                                  c.Box,
                                  {
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    paddingBottom: 4,
                                    paddingTop: 0,
                                  },
                                  a.default.createElement(p.TextFieldSearch, {
                                    size: h.Size.SM,
                                    width: h.BlockSize.Full,
                                    placeholder: j('searchAccounts'),
                                    value: J,
                                    onChange: e => X(e.target.value),
                                    clearButtonOnClick: () => X(''),
                                    clearButtonProps: { size: h.Size.SM },
                                    inputProps: { autoFocus: !0 },
                                    endAccessory: null,
                                    className: '',
                                  })
                                )
                              : null,
                            a.default.createElement(
                              c.Box,
                              { className: 'multichain-account-menu-popover__list' },
                              0 === ge.length && '' !== J
                                ? a.default.createElement(
                                    c.Text,
                                    {
                                      paddingLeft: 4,
                                      paddingRight: 4,
                                      color: h.TextColor.textMuted,
                                      'data-testid': 'multichain-account-menu-popover-no-results',
                                    },
                                    j('noAccountsFound')
                                  )
                                : null,
                              Ee
                            ),
                            ae.length > 0
                              ? a.default.createElement(B.HiddenAccountList, { onClose: e })
                              : null,
                            n
                              ? a.default.createElement(
                                  c.Box,
                                  {
                                    paddingTop: 2,
                                    paddingBottom: 4,
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                    alignItems: h.AlignItems.center,
                                    display: h.Display.Flex,
                                  },
                                  a.default.createElement(
                                    c.ButtonSecondary,
                                    {
                                      startIconName: c.IconName.Add,
                                      size: c.ButtonSecondarySize.Lg,
                                      block: !0,
                                      onClick: () => ee(F.MENU),
                                      'data-testid':
                                        'multichain-account-menu-popover-action-button',
                                    },
                                    j('addImportAccount')
                                  )
                                )
                              : null
                          )
                        : null
                    )
                  );
                };
                (n.AccountListMenu = V),
                  (V.propTypes = {
                    onClose: r.default.func.isRequired,
                    showAccountCreation: r.default.bool,
                    accountListItemProps: r.default.object,
                    allowedAccountTypes: r.default.array,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-list-menu/account-list-menu.tsx',
      },
    ],
    [
      6479,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/design-system': 6872,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../component-library': 6402,
        '../account-list-item': 6477,
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
                  (n.HiddenAccountList = void 0);
                var a,
                  r = (function (e, t) {
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
                  o = (a = e('prop-types')) && a.__esModule ? a : { default: a },
                  i = e('react-redux'),
                  s = e('../../../../shared/constants/metametrics'),
                  l = e('../../../contexts/metametrics'),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../../hooks/useI18nContext'),
                  d = e('../../../selectors'),
                  p = e('../../../store/actions'),
                  m = e('../../component-library'),
                  f = e('../account-list-item');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                const y = ({ onClose: e }) => {
                  const t = (0, u.useI18nContext)(),
                    n = (0, r.useContext)(l.MetaMetricsContext),
                    a = (0, i.useSelector)(d.getHDEntropyIndex),
                    o = (0, i.useDispatch)(),
                    h = (0, i.useSelector)(d.getHiddenAccountsList),
                    y = (0, i.useSelector)(d.getMetaMaskAccountsOrdered),
                    g = (0, i.useSelector)(d.getSelectedAccount),
                    b = (0, i.useSelector)(d.getConnectedSubjectsForAllAddresses),
                    v = (0, i.useSelector)(d.getOriginOfCurrentTab),
                    T = y.filter(e => h.includes(e.address)),
                    [E, w] = (0, r.useState)(!1);
                  return r.default.createElement(
                    r.default.Fragment,
                    null,
                    r.default.createElement(
                      m.Box,
                      {
                        as: 'button',
                        onClick: () => w(!E),
                        backgroundColor: c.BackgroundColor.backgroundDefault,
                        display: c.Display.Flex,
                        padding: 4,
                        alignItems: c.AlignItems.center,
                        width: c.BlockSize.Full,
                        justifyContent: c.JustifyContent.spaceBetween,
                        className: 'hidden-accounts-list',
                        'data-testid': 'hidden-accounts-list',
                      },
                      r.default.createElement(
                        m.Box,
                        {
                          display: c.Display.Flex,
                          alignItems: c.AlignItems.center,
                          width: c.BlockSize.TwoThirds,
                          gap: 2,
                        },
                        r.default.createElement(m.AvatarIcon, {
                          iconName: m.IconName.EyeSlash,
                          color: c.IconColor.infoDefault,
                          backgroundColor: c.BackgroundColor.infoMuted,
                          size: m.AvatarIconSize.Sm,
                        }),
                        r.default.createElement(
                          m.Box,
                          { display: c.Display.Flex },
                          r.default.createElement(
                            m.Text,
                            { variant: c.TextVariant.bodyMdMedium },
                            t('hiddenAccounts')
                          )
                        )
                      ),
                      r.default.createElement(
                        m.Box,
                        {
                          gap: 2,
                          display: c.Display.Flex,
                          alignItems: c.AlignItems.center,
                          width: c.BlockSize.OneThird,
                          justifyContent: c.JustifyContent.flexEnd,
                        },
                        r.default.createElement(
                          m.Text,
                          { variant: c.TextVariant.bodyMdMedium },
                          h.length
                        ),
                        r.default.createElement(m.Icon, {
                          name: E ? m.IconName.ArrowUp : m.IconName.ArrowDown,
                          size: m.IconSize.Sm,
                          color: c.IconColor.iconDefault,
                        })
                      )
                    ),
                    E
                      ? r.default.createElement(
                          m.Box,
                          null,
                          T.map(t => {
                            var i;
                            const l =
                              null === (i = b[t.address]) || void 0 === i
                                ? void 0
                                : i.find(({ origin: e }) => e === v);
                            return r.default.createElement(
                              m.Box,
                              {
                                className:
                                  'multichain-account-menu-popover__list--menu-item-hidden-account',
                                key: t.address,
                              },
                              r.default.createElement(f.AccountListItem, {
                                onClick: () => {
                                  e(),
                                    n({
                                      category: s.MetaMetricsEventCategory.Navigation,
                                      event: s.MetaMetricsEventName.NavAccountSwitched,
                                      properties: { location: 'Main Menu', hd_entropy_index: a },
                                    }),
                                    o((0, p.setSelectedAccount)(t.address));
                                },
                                account: t,
                                key: t.address,
                                selected: g.address === t.address,
                                closeMenu: e,
                                connectedAvatar: null == l ? void 0 : l.iconUrl,
                                menuType: f.AccountListItemMenuTypes.Account,
                                isPinned: Boolean(t.pinned),
                                isHidden: Boolean(t.hidden),
                              })
                            );
                          })
                        )
                      : null
                  );
                };
                (n.HiddenAccountList = y), (y.propTypes = { onClose: o.default.func.isRequired });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-list-menu/hidden-account-list.js',
      },
    ],
    [
      6480,
      { './account-list-menu': 6478 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountListMenu', {
                    enumerable: !0,
                    get: function () {
                      return a.AccountListMenu;
                    },
                  });
                var a = e('./account-list-menu');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-list-menu/index.js' },
    ],
    [
      6481,
      { '../../app/wallet-overview': 6325, './account-overview-layout': 6482, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AccountOverviewEth = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../app/wallet-overview'),
                  i = e('./account-overview-layout');
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
                n.AccountOverviewEth = e =>
                  r.default.createElement(
                    i.AccountOverviewLayout,
                    s({ showTokens: !0, showNfts: !0, showActivity: !0 }, e),
                    r.default.createElement(o.EthOverview, null)
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-overview/account-overview-eth.tsx',
      },
    ],
    [
      6482,
      {
        '..': 6574,
        '../../../../shared/constants/metametrics': 5800,
        '../../../contexts/metametrics': 6836,
        '../../../hooks/bridge/useBridging': 6935,
        '../../../hooks/useCarouselManagement': 6971,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        './account-overview-tabs': 6484,
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
                  (n.AccountOverviewLayout = void 0);
                var a,
                  r = (function (e, t) {
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
                  o = e('react-redux'),
                  i = e('lodash'),
                  s = e('../../../store/actions'),
                  l = e('..'),
                  c = e('../../../selectors'),
                  u =
                    (a = e('../../../hooks/bridge/useBridging')) && a.__esModule
                      ? a
                      : { default: a },
                  d = e('../../../contexts/metametrics'),
                  p = e('../../../../shared/constants/metametrics'),
                  m = e('../../../hooks/useCarouselManagement'),
                  f = e('./account-overview-tabs');
                function h(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    n = new WeakMap();
                  return (h = function (e) {
                    return e ? n : t;
                  })(e);
                }
                n.AccountOverviewLayout = ({ children: e, ...t }) => {
                  const n = (0, o.useDispatch)(),
                    a = (0, o.useSelector)(c.getAppIsLoading),
                    h = (0, r.useContext)(d.MetaMetricsContext),
                    [y, g] = (0, r.useState)(!1),
                    b = (0, o.useSelector)(c.getSwapsDefaultToken, i.isEqual),
                    { slides: v } = (0, m.useCarouselManagement)(),
                    { openBridgeExperience: T } = (0, u.default)(),
                    E = (0, r.useCallback)(
                      e => {
                        y ||
                          (e.forEach(e => {
                            h({
                              event: p.MetaMetricsEventName.BannerDisplay,
                              category: p.MetaMetricsEventCategory.Banner,
                              properties: { banner_name: e.id },
                            });
                          }),
                          g(!0));
                      },
                      [y, h]
                    );
                  return r.default.createElement(
                    r.default.Fragment,
                    null,
                    r.default.createElement(
                      'div',
                      { className: 'account-overview__balance-wrapper' },
                      e
                    ),
                    r.default.createElement(l.Carousel, {
                      slides: v,
                      isLoading: a,
                      onClick: e => {
                        'bridge' === e &&
                          T(
                            'Carousel',
                            b,
                            location.pathname.includes('asset') ? '&token=native' : ''
                          ),
                          h({
                            event: p.MetaMetricsEventName.BannerSelect,
                            category: p.MetaMetricsEventCategory.Banner,
                            properties: { banner_name: e },
                          });
                      },
                      onClose: (e, t) => {
                        e &&
                          h({
                            event: p.MetaMetricsEventName.BannerCloseAll,
                            category: p.MetaMetricsEventCategory.Banner,
                          }),
                          n((0, s.removeSlide)(t));
                      },
                      onRenderSlides: E,
                    }),
                    r.default.createElement(f.AccountOverviewTabs, t)
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-overview/account-overview-layout.tsx',
      },
    ],
    [
      6483,
      { '../../app/wallet-overview': 6325, './account-overview-layout': 6482, react: 5328 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AccountOverviewNonEvm = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../app/wallet-overview'),
                  i = e('./account-overview-layout');
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
                n.AccountOverviewNonEvm = ({ ...e }) =>
                  r.default.createElement(
                    i.AccountOverviewLayout,
                    s({ showTokens: !0, showTokensLinks: !1, showNfts: !1, showActivity: !0 }, e),
                    r.default.createElement(o.NonEvmOverview, null)
                  );
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-overview/account-overview-non-evm.tsx',
      },
    ],
    [
      6484,
      {
        '../../../../shared/constants/app-state': 5788,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/lib/trace': 5849,
        '../../../../shared/lib/ui-utils': 5852,
        '../../../contexts/metametrics': 6836,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../../store/actions': 7619,
        '../../app/assets/asset-list': 5925,
        '../../app/assets/nfts/nfts-tab': 5948,
        '../../app/transaction-list': 6314,
        '../../component-library': 6402,
        '../../ui/tabs': 6806,
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
                  (n.AccountOverviewTabs = void 0);
                var a = (function (e, t) {
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
                  })(e('react')),
                  r = e('react-redux'),
                  o = e('react-router-dom'),
                  i = e('../../../../shared/lib/trace'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../../helpers/constants/routes');
                e('../../../../shared/lib/ui-utils');
                var c = e('../../../../shared/constants/metametrics'),
                  u = e('../../../contexts/metametrics'),
                  d = v(e('../../app/assets/nfts/nfts-tab')),
                  p = v(e('../../app/assets/asset-list')),
                  m = v(e('../../app/transaction-list')),
                  f = e('../../ui/tabs'),
                  h = e('../../component-library'),
                  y = e('../../../../shared/constants/app-state'),
                  g = e('../../../store/actions'),
                  b = e('../../../selectors');
                function v(e) {
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
                function E() {
                  return (
                    (E = Object.assign
                      ? Object.assign.bind()
                      : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var a in n) ({}).hasOwnProperty.call(n, a) && (e[a] = n[a]);
                          }
                          return e;
                        }),
                    E.apply(null, arguments)
                  );
                }
                n.AccountOverviewTabs = ({
                  onTabClick: e,
                  defaultHomeActiveTabName: t,
                  showTokens: n,
                  showTokensLinks: v,
                  showNfts: T,
                  showActivity: w,
                }) => {
                  const S = (0, o.useHistory)(),
                    x = (0, s.useI18nContext)(),
                    C = (0, a.useContext)(u.MetaMetricsContext),
                    k = (0, r.useDispatch)(),
                    _ = (0, r.useSelector)(b.getAllChainsToPoll),
                    A = (0, a.useMemo)(
                      () => ({
                        activeClassName: 'account-overview__tab--active',
                        className: 'account-overview__tab',
                      }),
                      []
                    ),
                    O = (0, a.useCallback)(
                      n => {
                        e(n),
                          n === y.AccountOverviewTabKey.Nfts && k((0, g.detectNfts)(_)),
                          C({
                            category: c.MetaMetricsEventCategory.Home,
                            event: y.ACCOUNT_OVERVIEW_TAB_KEY_TO_METAMETRICS_EVENT_NAME_MAP[n],
                          }),
                          t &&
                            (0, i.endTrace)({
                              name: y.ACCOUNT_OVERVIEW_TAB_KEY_TO_TRACE_NAME_MAP[t],
                            }),
                          (0, i.trace)({ name: y.ACCOUNT_OVERVIEW_TAB_KEY_TO_TRACE_NAME_MAP[n] });
                      },
                      [e]
                    ),
                    I = (0, a.useCallback)(
                      (e, t) => S.push(`${l.ASSET_ROUTE}/${e}/${encodeURIComponent(t)}`),
                      [S]
                    );
                  return a.default.createElement(
                    h.Box,
                    { style: { flexGrow: '1' } },
                    a.default.createElement(
                      f.Tabs,
                      {
                        defaultActiveTabKey: t,
                        onTabClick: O,
                        tabsClassName: 'account-overview__tabs',
                      },
                      n &&
                        a.default.createElement(
                          f.Tab,
                          E(
                            {
                              name: x('tokens'),
                              tabKey: 'tokens',
                              'data-testid': 'account-overview__asset-tab',
                            },
                            A
                          ),
                          a.default.createElement(
                            h.Box,
                            { marginTop: 2 },
                            a.default.createElement(p.default, {
                              showTokensLinks: v ?? !0,
                              onClickAsset: I,
                            })
                          )
                        ),
                      T &&
                        a.default.createElement(
                          f.Tab,
                          E(
                            {
                              name: x('nfts'),
                              tabKey: 'nfts',
                              'data-testid': 'account-overview__nfts-tab',
                            },
                            A
                          ),
                          a.default.createElement(d.default, null)
                        ),
                      w &&
                        a.default.createElement(
                          f.Tab,
                          E(
                            {
                              name: x('activity'),
                              tabKey: 'activity',
                              'data-testid': 'account-overview__activity-tab',
                            },
                            A
                          ),
                          a.default.createElement(m.default, { boxProps: { paddingTop: 3 } })
                        )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-overview/account-overview-tabs.tsx',
      },
    ],
    [
      6485,
      {
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        './account-overview-layout': 6482,
        react: 5328,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.AccountOverviewUnknown = void 0);
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('../../component-library'),
                  i = e('../../../hooks/useI18nContext'),
                  s = e('./account-overview-layout');
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
                n.AccountOverviewUnknown = e => {
                  const t = (0, i.useI18nContext)();
                  return r.default.createElement(
                    s.AccountOverviewLayout,
                    l({ showTokens: !1, showNfts: !1, showActivity: !0 }, e),
                    r.default.createElement(
                      o.Box,
                      { className: 'account-overview-unknown__empty' },
                      r.default.createElement(
                        o.Box,
                        { className: 'account-overview-unknown__empty-text' },
                        r.default.createElement('span', null, t('accountTypeNotSupported'))
                      )
                    )
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/account-overview/account-overview-unknown.tsx',
      },
    ],
    [
      6486,
      {
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        './account-overview-eth': 6481,
        './account-overview-non-evm': 6483,
        './account-overview-unknown': 6485,
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
                  (n.AccountOverview = function (e) {
                    const t = (0, s.useI18nContext)(),
                      n = (0, o.useSelector)(c.getSelectedInternalAccount),
                      { useExternalServices: a, setBasicFunctionalityModalOpen: m } = e;
                    return r.default.createElement(
                      r.default.Fragment,
                      null,
                      !a &&
                        r.default.createElement(l.BannerAlert, {
                          margin: 4,
                          marginBottom: 0,
                          severity: l.BannerAlertSeverity.Danger,
                          actionButtonLabel: t('basicConfigurationBannerCTA'),
                          actionButtonOnClick: () => {
                            m();
                          },
                          title: t('basicConfigurationBannerTitle'),
                        }),
                      (() => {
                        switch (n.type) {
                          case i.EthAccountType.Eoa:
                          case i.EthAccountType.Erc4337:
                            return r.default.createElement(u.AccountOverviewEth, e);
                          case i.BtcAccountType.P2wpkh:
                          case i.SolAccountType.DataAccount:
                            return r.default.createElement(p.AccountOverviewNonEvm, e);
                          default:
                            return r.default.createElement(d.AccountOverviewUnknown, e);
                        }
                      })()
                    );
                  });
                var a,
                  r = (a = e('react')) && a.__esModule ? a : { default: a },
                  o = e('react-redux'),
                  i = e('@metamask/keyring-api'),
                  s = e('../../../hooks/useI18nContext'),
                  l = e('../../component-library'),
                  c = e('../../../selectors'),
                  u = e('./account-overview-eth'),
                  d = e('./account-overview-unknown'),
                  p = e('./account-overview-non-evm');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-overview/account-overview.tsx' },
    ],
    [
      6487,
      { './account-overview': 6486 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountOverview', {
                    enumerable: !0,
                    get: function () {
                      return a.AccountOverview;
                    },
                  });
                var a = e('./account-overview');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-overview/index.js' },
    ],
    [
      6488,
      {
        '../../../../shared/lib/trace': 5849,
        '../../../../shared/modules/hexstring-utils': 5864,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
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
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AccountPicker = void 0);
                var a = m(e('react')),
                  r = m(e('prop-types')),
                  o = m(e('classnames')),
                  i = e('react-redux'),
                  s = e('../../../../shared/modules/hexstring-utils'),
                  l = e('../../component-library'),
                  c = e('../../../helpers/constants/design-system'),
                  u = e('../../../selectors'),
                  d = e('../../../helpers/utils/util'),
                  p = e('../../../../shared/lib/trace');
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
                const h = ({
                  address: e,
                  name: t,
                  onClick: n,
                  disabled: r = !1,
                  showAddress: m = !1,
                  addressProps: h = {},
                  labelProps: y = {},
                  textProps: g = {},
                  className: b = '',
                  ...v
                }) => {
                  const T = (0, i.useSelector)(u.getUseBlockie),
                    E = (0, d.shortenAddress)((0, s.toChecksumHexAddress)(e));
                  return a.default.createElement(
                    l.ButtonBase,
                    f(
                      {
                        className: (0, o.default)('multichain-account-picker', b),
                        'data-testid': 'account-menu-icon',
                        onClick: () => {
                          (0, p.trace)({ name: p.TraceName.AccountList }), n();
                        },
                        backgroundColor: c.BackgroundColor.transparent,
                        borderRadius: c.BorderRadius.LG,
                        ellipsis: !0,
                        textProps: {
                          display: c.Display.Flex,
                          alignItems: c.AlignItems.center,
                          gap: 2,
                          ...g,
                        },
                        size: m ? l.ButtonBaseSize.Lg : l.ButtonBaseSize.Sm,
                        disabled: r,
                        endIconName: l.IconName.ArrowDown,
                        endIconProps: { color: c.IconColor.iconDefault, size: c.Size.SM },
                      },
                      v,
                      { gap: 1 }
                    ),
                    a.default.createElement(l.AvatarAccount, {
                      variant: T
                        ? l.AvatarAccountVariant.Blockies
                        : l.AvatarAccountVariant.Jazzicon,
                      address: e,
                      size: m ? c.Size.MD : c.Size.XS,
                      borderColor: c.BackgroundColor.backgroundDefault,
                    }),
                    a.default.createElement(
                      l.Text,
                      f({ as: 'span', ellipsis: !0 }, y, {
                        className: (0, o.default)(
                          'multichain-account-picker__label',
                          y.className ?? ''
                        ),
                      }),
                      t,
                      m
                        ? a.default.createElement(
                            l.Text,
                            f(
                              {
                                color: c.TextColor.textAlternative,
                                variant: c.TextVariant.bodySm,
                                ellipsis: !0,
                              },
                              h
                            ),
                            E
                          )
                        : null
                    )
                  );
                };
                (n.AccountPicker = h),
                  (h.propTypes = {
                    name: r.default.string.isRequired,
                    address: r.default.string.isRequired,
                    showAddress: r.default.bool,
                    addressProps: r.default.object,
                    onClick: r.default.func.isRequired,
                    disabled: r.default.bool,
                    block: r.default.bool,
                    labelProps: r.default.object,
                    textProps: r.default.object,
                    className: r.default.string,
                  });
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-picker/account-picker.js' },
    ],
    [
      6489,
      { './account-picker': 6488 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AccountPicker', {
                    enumerable: !0,
                    get: function () {
                      return a.AccountPicker;
                    },
                  });
                var a = e('./account-picker');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/account-picker/index.js' },
    ],
    [
      6490,
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
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  (n.ActivityListItem = void 0);
                var a = l(e('react')),
                  r = l(e('prop-types')),
                  o = l(e('classnames')),
                  i = e('../../../helpers/constants/design-system'),
                  s = e('../../component-library');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = ({
                  topContent: e,
                  icon: t,
                  title: n,
                  subtitle: r,
                  midContent: l,
                  children: c,
                  rightContent: u,
                  onClick: d,
                  className: p,
                  'data-testid': m,
                }) => {
                  const f = (0, o.default)('activity-list-item', p, {
                    'activity-list-item--single-content-row': !(r || c),
                  });
                  return a.default.createElement(
                    s.Box,
                    {
                      tabIndex: 0,
                      backgroundColor: i.BackgroundColor.backgroundDefault,
                      className: f,
                      onClick: d,
                      onKeyPress: e => {
                        'Enter' === e.key && d();
                      },
                      'data-testid': m,
                      padding: 4,
                      display: i.Display.Flex,
                      width: i.BlockSize.Full,
                      flexWrap: i.FlexWrap.Wrap,
                      gap: 4,
                    },
                    e &&
                      a.default.createElement(
                        s.Text,
                        {
                          variant: i.TextVariant.bodyMd,
                          color: i.TextColor.textDefault,
                          display: i.Display.Flex,
                          width: i.BlockSize.Full,
                        },
                        e
                      ),
                    a.default.createElement(
                      s.Box,
                      {
                        display: i.Display.Flex,
                        width: i.BlockSize.Full,
                        flexDirection: i.FlexDirection.Row,
                        gap: 4,
                      },
                      t && a.default.createElement(s.Box, { display: i.Display.InlineFlex }, t),
                      a.default.createElement(
                        s.Box,
                        {
                          display: i.Display.InlineFlex,
                          width: i.BlockSize.Full,
                          justifyContent: i.JustifyContent.spaceBetween,
                          className: 'activity-list-item__content-container',
                        },
                        a.default.createElement(
                          s.Box,
                          {
                            display: i.Display.InlineFlex,
                            flexDirection: i.FlexDirection.Column,
                            className: 'activity-list-item__detail-container',
                            minWidth: '0',
                          },
                          a.default.createElement(
                            s.Text,
                            {
                              ellipsis: !0,
                              textAlign: i.TextAlign.Left,
                              variant: i.TextVariant.bodyLgMedium,
                              fontWeight: i.FontWeight.Medium,
                              'data-testid': 'activity-list-item-action',
                            },
                            n
                          ),
                          r &&
                            a.default.createElement(
                              s.Text,
                              {
                                as: 'div',
                                ellipsis: !0,
                                textAlign: i.TextAlign.Left,
                                variant: i.TextVariant.bodyMd,
                                fontWeight: i.FontWeight.Normal,
                              },
                              r
                            ),
                          c &&
                            a.default.createElement(
                              s.Box,
                              { className: 'activity-list-item__children' },
                              c
                            )
                        ),
                        l &&
                          a.default.createElement(
                            s.Box,
                            {
                              display: i.Display.InlineFlex,
                              className: 'activity-list-item__mid-content',
                            },
                            l
                          ),
                        u &&
                          a.default.createElement(
                            s.Box,
                            {
                              display: i.Display.InlineFlex,
                              height: i.BlockSize.Min,
                              flexDirection: i.FlexDirection.Column,
                              alignItems: i.AlignItems.flexEnd,
                              className: 'activity-list-item__right-content',
                            },
                            u
                          )
                      )
                    )
                  );
                };
                (n.ActivityListItem = c),
                  (c.propTypes = {
                    topContent: r.default.node,
                    icon: r.default.node,
                    title: r.default.oneOfType([r.default.string, r.default.node]),
                    subtitle: r.default.node,
                    midContent: r.default.node,
                    children: r.default.node,
                    rightContent: r.default.node,
                    onClick: r.default.func,
                    className: r.default.string,
                    'data-testid': r.default.string,
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/activity-list-item/activity-list-item.js',
      },
    ],
    [
      6491,
      { './activity-list-item': 6490 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'ActivityListItem', {
                    enumerable: !0,
                    get: function () {
                      return a.ActivityListItem;
                    },
                  });
                var a = e('./activity-list-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/activity-list-item/index.js' },
    ],
    [
      6492,
      {
        '../../../../app/scripts/lib/multichain/address': 142,
        '../../../../shared/constants/time': 5817,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../hooks/useCopyToClipboard': 6973,
        '../../../hooks/useI18nContext': 6985,
        '../../component-library': 6402,
        '../../ui/tooltip/tooltip': 6819,
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
                  r = f(e('prop-types')),
                  o = f(e('classnames')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../hooks/useCopyToClipboard'),
                  c = e('../../../helpers/utils/util'),
                  u = f(e('../../ui/tooltip/tooltip')),
                  d = e('../../../hooks/useI18nContext'),
                  p = e('../../../../shared/constants/time'),
                  m = e('../../../../app/scripts/lib/multichain/address');
                function f(e) {
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
                function y({ address: e, shorten: t = !1, wrap: n = !1 }) {
                  const r = (0, m.normalizeSafeAddress)(e),
                    f = t ? (0, c.shortenAddress)(r) : r,
                    [h, y] = (0, l.useCopyToClipboard)(p.MINUTE),
                    g = (0, d.useI18nContext)(),
                    b = g(h ? 'copiedExclamation' : 'copyToClipboard'),
                    v = (0, a.useCallback)(() => {
                      y(r);
                    }, [y, r]);
                  return a.default.createElement(
                    u.default,
                    { position: 'bottom', title: b },
                    a.default.createElement(
                      i.ButtonBase,
                      {
                        backgroundColor: s.BackgroundColor.primaryMuted,
                        onClick: v,
                        paddingRight: 4,
                        paddingLeft: 4,
                        size: s.Size.SM,
                        variant: s.TextVariant.bodySm,
                        color: s.TextColor.primaryDefault,
                        endIconName: h ? i.IconName.CopySuccess : i.IconName.Copy,
                        className: (0, o.default)('multichain-address-copy-button', {
                          'multichain-address-copy-button__address--wrap': n,
                        }),
                        borderRadius: s.BorderRadius.pill,
                        alignItems: s.AlignItems.center,
                        'data-testid': 'address-copy-button-text',
                      },
                      a.default.createElement(i.Box, { display: s.Display.Flex }, f)
                    )
                  );
                }
                y.propTypes = {
                  address: r.default.string.isRequired,
                  shorten: r.default.bool,
                  wrap: r.default.bool,
                };
                n.default = a.default.memo(y);
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/address-copy-button/address-copy-button.js',
      },
    ],
    [
      6493,
      { './address-copy-button': 6492 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AddressCopyButton', {
                    enumerable: !0,
                    get: function () {
                      return r.default;
                    },
                  });
                var a,
                  r = (a = e('./address-copy-button')) && a.__esModule ? a : { default: a };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/address-copy-button/index.js' },
    ],
    [
      6494,
      {
        '../../../contexts/i18n': 6832,
        '../../../helpers/constants/design-system': 6872,
        '../../../helpers/utils/util': 6921,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/confusable': 6718,
        '../../ui/tooltip': 6818,
        react: 5328,
        'react-redux': 5286,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }), (n.AddressListItem = void 0);
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
                  o = p(e('../../ui/confusable')),
                  i = e('../../component-library'),
                  s = e('../../../helpers/constants/design-system'),
                  l = e('../../../selectors'),
                  c = e('../../../helpers/utils/util'),
                  u = p(e('../../ui/tooltip')),
                  d = e('../../../contexts/i18n');
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
                n.AddressListItem = ({
                  address: e,
                  label: t,
                  useConfusable: n = !1,
                  isDuplicate: p = !1,
                  onClick: m,
                }) => {
                  const f = (0, a.useContext)(d.I18nContext),
                    h = (0, r.useSelector)(l.getUseBlockie);
                  let y = (0, c.shortenAddress)(e);
                  return (
                    t && ((y = t), n && (y = a.default.createElement(o.default, { input: t }))),
                    a.default.createElement(
                      i.Box,
                      {
                        display: s.Display.Flex,
                        padding: 4,
                        as: 'button',
                        onClick: e => {
                          e.stopPropagation(), m();
                        },
                        width: s.BlockSize.Full,
                        backgroundColor: s.BackgroundColor.transparent,
                        className: 'address-list-item',
                        alignItems: s.AlignItems.center,
                      },
                      a.default.createElement(i.AvatarAccount, {
                        borderColor: s.BorderColor.transparent,
                        size: i.AvatarAccountSize.Md,
                        address: e,
                        variant: h
                          ? i.AvatarAccountVariant.Blockies
                          : i.AvatarAccountVariant.Jazzicon,
                        marginInlineEnd: 2,
                      }),
                      a.default.createElement(
                        i.Box,
                        {
                          display: s.Display.Flex,
                          flexDirection: s.FlexDirection.Column,
                          style: { overflow: 'hidden' },
                        },
                        a.default.createElement(
                          i.Text,
                          {
                            variant: s.TextVariant.bodyMdMedium,
                            padding: 0,
                            width: s.BlockSize.Full,
                            textAlign: s.TextAlign.Left,
                            className: 'address-list-item__label',
                            'data-testid': 'address-list-item-label',
                            style: { overflow: 'hidden' },
                            ellipsis: !0,
                          },
                          y
                        ),
                        a.default.createElement(
                          i.Text,
                          {
                            variant: s.TextVariant.bodySm,
                            color: s.TextColor.textAlternative,
                            ellipsis: !0,
                            'data-testid': 'address-list-item-address',
                            as: 'div',
                            display: s.Display.Flex,
                          },
                          a.default.createElement(
                            u.default,
                            { title: e, position: 'bottom' },
                            (0, c.shortenAddress)(e)
                          )
                        )
                      ),
                      p &&
                        a.default.createElement(
                          i.Box,
                          { className: 'address-list-item__duplicate-contact-warning-icon' },
                          a.default.createElement(
                            u.default,
                            { title: f('duplicateContactTooltip'), position: 'top' },
                            a.default.createElement(i.Icon, {
                              name: i.IconName.Danger,
                              color: s.IconColor.warningDefault,
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
        file: 'ui/components/multichain/address-list-item/address-list-item.tsx',
      },
    ],
    [
      6495,
      { './address-list-item': 6494 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, n) {
                Object.defineProperty(n, '__esModule', { value: !0 }),
                  Object.defineProperty(n, 'AddressListItem', {
                    enumerable: !0,
                    get: function () {
                      return a.AddressListItem;
                    },
                  });
                var a = e('./address-list-item');
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/address-list-item/index.ts' },
    ],
    [
      6496,
      {
        '../../../helpers/constants/design-system': 6872,
        '../../component-library': 6402,
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
                  (n.AppHeaderContainer = void 0);
                var a = s(e('react')),
                  r = s(e('classnames')),
                  o = e('../../../helpers/constants/design-system'),
                  i = e('../../component-library');
                function s(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.AppHeaderContainer = ({
                  isUnlocked: e,
                  popupStatus: t,
                  headerBottomMargin: n,
                  children: s,
                }) => {
                  const l =
                    !e || t
                      ? o.BackgroundColor.backgroundDefault
                      : o.BackgroundColor.backgroundAlternative;
                  return a.default.createElement(
                    i.Box,
                    {
                      display: o.Display.Flex,
                      className: (0, r.default)('multichain-app-header', {
                        'multichain-app-header-shadow': !e || t,
                      }),
                      marginBottom: n,
                      alignItems: o.AlignItems.center,
                      width: o.BlockSize.Full,
                      backgroundColor: l,
                    },
                    s
                  );
                };
              };
            };
      },
      { package: '$root$', file: 'ui/components/multichain/app-header/app-header-container.tsx' },
    ],
    [
      6497,
      {
        '../../../../shared/modules/network.utils': 5868,
        '../../../helpers/constants/routes': 6878,
        '../../../hooks/useI18nContext': 6985,
        '../../../selectors': 7601,
        '../../component-library': 6402,
        '../../ui/metafox-logo': 6777,
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
                  (n.AppHeaderLockedContent = void 0);
                var a = p(e('react')),
                  r = e('react-router-dom'),
                  o = e('react-redux'),
                  i = e('../../../hooks/useI18nContext'),
                  s = p(e('../../ui/metafox-logo')),
                  l = e('../../component-library'),
                  c = e('../../../helpers/constants/routes'),
                  u = e('../../../selectors'),
                  d = e('../../../../shared/modules/network.utils');
                function p(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                n.AppHeaderLockedContent = ({ currentNetwork: e, networkOpenCallback: t }) => {
                  const n = (0, i.useI18nContext)(),
                    p = (0, r.useHistory)(),
                    m = (0, o.useSelector)(u.getTestNetworkBackgroundColor),
                    f = (0, d.getNetworkIcon)(e);
                  return a.default.createElement(
                    a.default.Fragment,
                    null,
                    a.default.createElement(
                      'div',
                      null,
                      a.default.createElement(l.PickerNetwork, {
                        avatarNetworkProps: { backgroundColor: m, role: 'img', name: e.name },
                        'aria-label': `${n('networkMenu')} ${e.name}`,
                        label: e.name,
                        src: f,
                        onClick: e => {
                          e.stopPropagation(), e.preventDefault(), t();
                        },
                        className: 'multichain-app-header__contents__network-picker',
                        'data-testid': 'network-display',
                      })
                    ),
                    a.default.createElement(s.default, {
                      unsetIconHeight: !0,
                      onClick: async () => {
                        p.push(c.DEFAULT_ROUTE);
                      },
                    })
                  );
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'ui/components/multichain/app-header/app-header-locked-content.tsx',
      },
    ],
  ],
  [],
  {}
);
