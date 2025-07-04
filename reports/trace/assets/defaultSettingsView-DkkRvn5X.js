const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['./codeMirrorModule-DwAiTpyC.js', '../codeMirrorModule.C3UTv-Ge.css'])
) => i.map(i => d[i]);
var tx = Object.defineProperty;
var nx = (t, e, n) =>
  e in t ? tx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[e] = n);
var xe = (t, e, n) => nx(t, typeof e != 'symbol' ? e + '' : e, n);
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver(o => {
    for (const l of o)
      if (l.type === 'childList')
        for (const c of l.addedNodes) c.tagName === 'LINK' && c.rel === 'modulepreload' && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const l = {};
    return (
      o.integrity && (l.integrity = o.integrity),
      o.referrerPolicy && (l.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (l.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (l.credentials = 'omit')
          : (l.credentials = 'same-origin'),
      l
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const l = n(o);
    fetch(o.href, l);
  }
})();
function rx(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t;
}
var du = { exports: {} },
  ji = {},
  hu = { exports: {} },
  me = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Up;
function sx() {
  if (Up) return me;
  Up = 1;
  var t = Symbol.for('react.element'),
    e = Symbol.for('react.portal'),
    n = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    o = Symbol.for('react.profiler'),
    l = Symbol.for('react.provider'),
    c = Symbol.for('react.context'),
    u = Symbol.for('react.forward_ref'),
    d = Symbol.for('react.suspense'),
    h = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    v = Symbol.iterator;
  function m(L) {
    return L === null || typeof L != 'object'
      ? null
      : ((L = (v && L[v]) || L['@@iterator']), typeof L == 'function' ? L : null);
  }
  var w = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    S = Object.assign,
    _ = {};
  function b(L, q, fe) {
    (this.props = L), (this.context = q), (this.refs = _), (this.updater = fe || w);
  }
  (b.prototype.isReactComponent = {}),
    (b.prototype.setState = function (L, q) {
      if (typeof L != 'object' && typeof L != 'function' && L != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, L, q, 'setState');
    }),
    (b.prototype.forceUpdate = function (L) {
      this.updater.enqueueForceUpdate(this, L, 'forceUpdate');
    });
  function T() {}
  T.prototype = b.prototype;
  function C(L, q, fe) {
    (this.props = L), (this.context = q), (this.refs = _), (this.updater = fe || w);
  }
  var O = (C.prototype = new T());
  (O.constructor = C), S(O, b.prototype), (O.isPureReactComponent = !0);
  var R = Array.isArray,
    D = Object.prototype.hasOwnProperty,
    F = { current: null },
    U = { key: !0, ref: !0, __self: !0, __source: !0 };
  function B(L, q, fe) {
    var ue,
      ve = {},
      ge = null,
      pe = null;
    if (q != null)
      for (ue in (q.ref !== void 0 && (pe = q.ref), q.key !== void 0 && (ge = '' + q.key), q))
        D.call(q, ue) && !U.hasOwnProperty(ue) && (ve[ue] = q[ue]);
    var Se = arguments.length - 2;
    if (Se === 1) ve.children = fe;
    else if (1 < Se) {
      for (var Ce = Array(Se), ft = 0; ft < Se; ft++) Ce[ft] = arguments[ft + 2];
      ve.children = Ce;
    }
    if (L && L.defaultProps)
      for (ue in ((Se = L.defaultProps), Se)) ve[ue] === void 0 && (ve[ue] = Se[ue]);
    return { $$typeof: t, type: L, key: ge, ref: pe, props: ve, _owner: F.current };
  }
  function I(L, q) {
    return { $$typeof: t, type: L.type, key: q, ref: L.ref, props: L.props, _owner: L._owner };
  }
  function Q(L) {
    return typeof L == 'object' && L !== null && L.$$typeof === t;
  }
  function W(L) {
    var q = { '=': '=0', ':': '=2' };
    return (
      '$' +
      L.replace(/[=:]/g, function (fe) {
        return q[fe];
      })
    );
  }
  var z = /\/+/g;
  function J(L, q) {
    return typeof L == 'object' && L !== null && L.key != null ? W('' + L.key) : q.toString(36);
  }
  function de(L, q, fe, ue, ve) {
    var ge = typeof L;
    (ge === 'undefined' || ge === 'boolean') && (L = null);
    var pe = !1;
    if (L === null) pe = !0;
    else
      switch (ge) {
        case 'string':
        case 'number':
          pe = !0;
          break;
        case 'object':
          switch (L.$$typeof) {
            case t:
            case e:
              pe = !0;
          }
      }
    if (pe)
      return (
        (pe = L),
        (ve = ve(pe)),
        (L = ue === '' ? '.' + J(pe, 0) : ue),
        R(ve)
          ? ((fe = ''),
            L != null && (fe = L.replace(z, '$&/') + '/'),
            de(ve, q, fe, '', function (ft) {
              return ft;
            }))
          : ve != null &&
            (Q(ve) &&
              (ve = I(
                ve,
                fe +
                  (!ve.key || (pe && pe.key === ve.key)
                    ? ''
                    : ('' + ve.key).replace(z, '$&/') + '/') +
                  L
              )),
            q.push(ve)),
        1
      );
    if (((pe = 0), (ue = ue === '' ? '.' : ue + ':'), R(L)))
      for (var Se = 0; Se < L.length; Se++) {
        ge = L[Se];
        var Ce = ue + J(ge, Se);
        pe += de(ge, q, fe, Ce, ve);
      }
    else if (((Ce = m(L)), typeof Ce == 'function'))
      for (L = Ce.call(L), Se = 0; !(ge = L.next()).done; )
        (ge = ge.value), (Ce = ue + J(ge, Se++)), (pe += de(ge, q, fe, Ce, ve));
    else if (ge === 'object')
      throw (
        ((q = String(L)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]' ? 'object with keys {' + Object.keys(L).join(', ') + '}' : q) +
            '). If you meant to render a collection of children, use an array instead.'
        ))
      );
    return pe;
  }
  function Te(L, q, fe) {
    if (L == null) return L;
    var ue = [],
      ve = 0;
    return (
      de(L, ue, '', '', function (ge) {
        return q.call(fe, ge, ve++);
      }),
      ue
    );
  }
  function Le(L) {
    if (L._status === -1) {
      var q = L._result;
      (q = q()),
        q.then(
          function (fe) {
            (L._status === 0 || L._status === -1) && ((L._status = 1), (L._result = fe));
          },
          function (fe) {
            (L._status === 0 || L._status === -1) && ((L._status = 2), (L._result = fe));
          }
        ),
        L._status === -1 && ((L._status = 0), (L._result = q));
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var ye = { current: null },
    X = { transition: null },
    se = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: X, ReactCurrentOwner: F };
  function Z() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  return (
    (me.Children = {
      map: Te,
      forEach: function (L, q, fe) {
        Te(
          L,
          function () {
            q.apply(this, arguments);
          },
          fe
        );
      },
      count: function (L) {
        var q = 0;
        return (
          Te(L, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (L) {
        return (
          Te(L, function (q) {
            return q;
          }) || []
        );
      },
      only: function (L) {
        if (!Q(L))
          throw Error('React.Children.only expected to receive a single React element child.');
        return L;
      },
    }),
    (me.Component = b),
    (me.Fragment = n),
    (me.Profiler = o),
    (me.PureComponent = C),
    (me.StrictMode = s),
    (me.Suspense = d),
    (me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = se),
    (me.act = Z),
    (me.cloneElement = function (L, q, fe) {
      if (L == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' + L + '.'
        );
      var ue = S({}, L.props),
        ve = L.key,
        ge = L.ref,
        pe = L._owner;
      if (q != null) {
        if (
          (q.ref !== void 0 && ((ge = q.ref), (pe = F.current)),
          q.key !== void 0 && (ve = '' + q.key),
          L.type && L.type.defaultProps)
        )
          var Se = L.type.defaultProps;
        for (Ce in q)
          D.call(q, Ce) &&
            !U.hasOwnProperty(Ce) &&
            (ue[Ce] = q[Ce] === void 0 && Se !== void 0 ? Se[Ce] : q[Ce]);
      }
      var Ce = arguments.length - 2;
      if (Ce === 1) ue.children = fe;
      else if (1 < Ce) {
        Se = Array(Ce);
        for (var ft = 0; ft < Ce; ft++) Se[ft] = arguments[ft + 2];
        ue.children = Se;
      }
      return { $$typeof: t, type: L.type, key: ve, ref: ge, props: ue, _owner: pe };
    }),
    (me.createContext = function (L) {
      return (
        (L = {
          $$typeof: c,
          _currentValue: L,
          _currentValue2: L,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (L.Provider = { $$typeof: l, _context: L }),
        (L.Consumer = L)
      );
    }),
    (me.createElement = B),
    (me.createFactory = function (L) {
      var q = B.bind(null, L);
      return (q.type = L), q;
    }),
    (me.createRef = function () {
      return { current: null };
    }),
    (me.forwardRef = function (L) {
      return { $$typeof: u, render: L };
    }),
    (me.isValidElement = Q),
    (me.lazy = function (L) {
      return { $$typeof: y, _payload: { _status: -1, _result: L }, _init: Le };
    }),
    (me.memo = function (L, q) {
      return { $$typeof: h, type: L, compare: q === void 0 ? null : q };
    }),
    (me.startTransition = function (L) {
      var q = X.transition;
      X.transition = {};
      try {
        L();
      } finally {
        X.transition = q;
      }
    }),
    (me.unstable_act = Z),
    (me.useCallback = function (L, q) {
      return ye.current.useCallback(L, q);
    }),
    (me.useContext = function (L) {
      return ye.current.useContext(L);
    }),
    (me.useDebugValue = function () {}),
    (me.useDeferredValue = function (L) {
      return ye.current.useDeferredValue(L);
    }),
    (me.useEffect = function (L, q) {
      return ye.current.useEffect(L, q);
    }),
    (me.useId = function () {
      return ye.current.useId();
    }),
    (me.useImperativeHandle = function (L, q, fe) {
      return ye.current.useImperativeHandle(L, q, fe);
    }),
    (me.useInsertionEffect = function (L, q) {
      return ye.current.useInsertionEffect(L, q);
    }),
    (me.useLayoutEffect = function (L, q) {
      return ye.current.useLayoutEffect(L, q);
    }),
    (me.useMemo = function (L, q) {
      return ye.current.useMemo(L, q);
    }),
    (me.useReducer = function (L, q, fe) {
      return ye.current.useReducer(L, q, fe);
    }),
    (me.useRef = function (L) {
      return ye.current.useRef(L);
    }),
    (me.useState = function (L) {
      return ye.current.useState(L);
    }),
    (me.useSyncExternalStore = function (L, q, fe) {
      return ye.current.useSyncExternalStore(L, q, fe);
    }),
    (me.useTransition = function () {
      return ye.current.useTransition();
    }),
    (me.version = '18.3.1'),
    me
  );
}
var qp;
function uf() {
  return qp || ((qp = 1), (hu.exports = sx())), hu.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hp;
function ix() {
  if (Hp) return ji;
  Hp = 1;
  var t = uf(),
    e = Symbol.for('react.element'),
    n = Symbol.for('react.fragment'),
    s = Object.prototype.hasOwnProperty,
    o = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(u, d, h) {
    var y,
      v = {},
      m = null,
      w = null;
    h !== void 0 && (m = '' + h),
      d.key !== void 0 && (m = '' + d.key),
      d.ref !== void 0 && (w = d.ref);
    for (y in d) s.call(d, y) && !l.hasOwnProperty(y) && (v[y] = d[y]);
    if (u && u.defaultProps) for (y in ((d = u.defaultProps), d)) v[y] === void 0 && (v[y] = d[y]);
    return { $$typeof: e, type: u, key: m, ref: w, props: v, _owner: o.current };
  }
  return (ji.Fragment = n), (ji.jsx = c), (ji.jsxs = c), ji;
}
var Vp;
function ox() {
  return Vp || ((Vp = 1), (du.exports = ix())), du.exports;
}
var x = ox(),
  P = uf();
const jt = rx(P);
function ff(t, e, n, s) {
  const [o, l] = jt.useState(n);
  return (
    jt.useEffect(() => {
      let c = !1;
      return (
        t().then(u => {
          c || l(u);
        }),
        () => {
          c = !0;
        }
      );
    }, e),
    o
  );
}
function Mr() {
  const t = jt.useRef(null),
    [e, n] = jt.useState(new DOMRect(0, 0, 10, 10));
  return (
    jt.useLayoutEffect(() => {
      const s = t.current;
      if (!s) return;
      const o = s.getBoundingClientRect();
      n(new DOMRect(0, 0, o.width, o.height));
      const l = new ResizeObserver(c => {
        const u = c[c.length - 1];
        u && u.contentRect && n(u.contentRect);
      });
      return l.observe(s), () => l.disconnect();
    }, [t]),
    [e, t]
  );
}
function yt(t) {
  if (t < 0 || !isFinite(t)) return '-';
  if (t === 0) return '0';
  if (t < 1e3) return t.toFixed(0) + 'ms';
  const e = t / 1e3;
  if (e < 60) return e.toFixed(1) + 's';
  const n = e / 60;
  if (n < 60) return n.toFixed(1) + 'm';
  const s = n / 60;
  return s < 24 ? s.toFixed(1) + 'h' : (s / 24).toFixed(1) + 'd';
}
function lx(t) {
  if (t < 0 || !isFinite(t)) return '-';
  if (t === 0) return '0';
  if (t < 1e3) return t.toFixed(0);
  const e = t / 1024;
  if (e < 1e3) return e.toFixed(1) + 'K';
  const n = e / 1024;
  return n < 1e3 ? n.toFixed(1) + 'M' : (n / 1024).toFixed(1) + 'G';
}
function og(t, e, n, s, o) {
  let l = 0,
    c = t.length;
  for (; l < c; ) {
    const u = (l + c) >> 1;
    n(e, t[u]) >= 0 ? (l = u + 1) : (c = u);
  }
  return c;
}
function Wp(t) {
  const e = document.createElement('textarea');
  (e.style.position = 'absolute'),
    (e.style.zIndex = '-1000'),
    (e.value = t),
    document.body.appendChild(e),
    e.select(),
    document.execCommand('copy'),
    e.remove();
}
function As(t, e) {
  t && (e = Tr.getObject(t, e));
  const [n, s] = jt.useState(e),
    o = jt.useCallback(
      l => {
        t ? Tr.setObject(t, l) : s(l);
      },
      [t, s]
    );
  return (
    jt.useEffect(() => {
      if (t) {
        const l = () => s(Tr.getObject(t, e));
        return (
          Tr.onChangeEmitter.addEventListener(t, l),
          () => Tr.onChangeEmitter.removeEventListener(t, l)
        );
      }
    }, [e, t]),
    [n, o]
  );
}
class ax {
  constructor() {
    this.onChangeEmitter = new EventTarget();
  }
  getString(e, n) {
    return localStorage[e] || n;
  }
  setString(e, n) {
    var s;
    (localStorage[e] = n),
      this.onChangeEmitter.dispatchEvent(new Event(e)),
      (s = window.saveSettings) == null || s.call(window);
  }
  getObject(e, n) {
    if (!localStorage[e]) return n;
    try {
      return JSON.parse(localStorage[e]);
    } catch {
      return n;
    }
  }
  setObject(e, n) {
    var s;
    (localStorage[e] = JSON.stringify(n)),
      this.onChangeEmitter.dispatchEvent(new Event(e)),
      (s = window.saveSettings) == null || s.call(window);
  }
}
const Tr = new ax();
function Ue(...t) {
  return t.filter(Boolean).join(' ');
}
function lg(t) {
  t &&
    (t != null && t.scrollIntoViewIfNeeded
      ? t.scrollIntoViewIfNeeded(!1)
      : t == null || t.scrollIntoView());
}
const Kp = '\\u0000-\\u0020\\u007f-\\u009f',
  ag = new RegExp(
    '(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|www\\.)[^\\s' +
      Kp +
      '"]{2,}[^\\s' +
      Kp +
      `"')}\\],:;.!?]`,
    'ug'
  );
function cx() {
  const [t, e] = jt.useState(!1),
    n = jt.useCallback(() => {
      const s = [];
      return (
        e(
          o => (
            s.push(setTimeout(() => e(!1), 1e3)), o ? (s.push(setTimeout(() => e(!0), 50)), !1) : !0
          )
        ),
        () => s.forEach(clearTimeout)
      );
    }, [e]);
  return [t, n];
}
function ux() {
  return jt.useMemo(
    () =>
      document.cookie
        .split('; ')
        .filter(e => e.includes('='))
        .map(e => {
          const n = e.indexOf('=');
          return [e.substring(0, n), e.substring(n + 1)];
        }),
    []
  );
}
function mT() {
  if (document.playwrightThemeInitialized) return;
  (document.playwrightThemeInitialized = !0),
    document.defaultView.addEventListener(
      'focus',
      n => {
        n.target.document.nodeType === Node.DOCUMENT_NODE &&
          document.body.classList.remove('inactive');
      },
      !1
    ),
    document.defaultView.addEventListener(
      'blur',
      n => {
        document.body.classList.add('inactive');
      },
      !1
    );
  const t = Tr.getString('theme', 'light-mode'),
    e = window.matchMedia('(prefers-color-scheme: dark)');
  (t === 'dark-mode' || e.matches) && document.body.classList.add('dark-mode');
}
const df = new Set();
function fx() {
  const t = Hu(),
    e = t === 'dark-mode' ? 'light-mode' : 'dark-mode';
  t && document.body.classList.remove(t), document.body.classList.add(e), Tr.setString('theme', e);
  for (const n of df) n(e);
}
function gT(t) {
  df.add(t);
}
function yT(t) {
  df.delete(t);
}
function Hu() {
  return document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
}
function dx() {
  const [t, e] = jt.useState(Hu() === 'dark-mode');
  return [
    t,
    n => {
      (Hu() === 'dark-mode') !== n && fx(), e(n);
    },
  ];
}
var gl = {},
  pu = { exports: {} },
  Et = {},
  mu = { exports: {} },
  gu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qp;
function hx() {
  return (
    Qp ||
      ((Qp = 1),
      (function (t) {
        function e(X, se) {
          var Z = X.length;
          X.push(se);
          e: for (; 0 < Z; ) {
            var L = (Z - 1) >>> 1,
              q = X[L];
            if (0 < o(q, se)) (X[L] = se), (X[Z] = q), (Z = L);
            else break e;
          }
        }
        function n(X) {
          return X.length === 0 ? null : X[0];
        }
        function s(X) {
          if (X.length === 0) return null;
          var se = X[0],
            Z = X.pop();
          if (Z !== se) {
            X[0] = Z;
            e: for (var L = 0, q = X.length, fe = q >>> 1; L < fe; ) {
              var ue = 2 * (L + 1) - 1,
                ve = X[ue],
                ge = ue + 1,
                pe = X[ge];
              if (0 > o(ve, Z))
                ge < q && 0 > o(pe, ve)
                  ? ((X[L] = pe), (X[ge] = Z), (L = ge))
                  : ((X[L] = ve), (X[ue] = Z), (L = ue));
              else if (ge < q && 0 > o(pe, Z)) (X[L] = pe), (X[ge] = Z), (L = ge);
              else break e;
            }
          }
          return se;
        }
        function o(X, se) {
          var Z = X.sortIndex - se.sortIndex;
          return Z !== 0 ? Z : X.id - se.id;
        }
        if (typeof performance == 'object' && typeof performance.now == 'function') {
          var l = performance;
          t.unstable_now = function () {
            return l.now();
          };
        } else {
          var c = Date,
            u = c.now();
          t.unstable_now = function () {
            return c.now() - u;
          };
        }
        var d = [],
          h = [],
          y = 1,
          v = null,
          m = 3,
          w = !1,
          S = !1,
          _ = !1,
          b = typeof setTimeout == 'function' ? setTimeout : null,
          T = typeof clearTimeout == 'function' ? clearTimeout : null,
          C = typeof setImmediate < 'u' ? setImmediate : null;
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function O(X) {
          for (var se = n(h); se !== null; ) {
            if (se.callback === null) s(h);
            else if (se.startTime <= X) s(h), (se.sortIndex = se.expirationTime), e(d, se);
            else break;
            se = n(h);
          }
        }
        function R(X) {
          if (((_ = !1), O(X), !S))
            if (n(d) !== null) (S = !0), Le(D);
            else {
              var se = n(h);
              se !== null && ye(R, se.startTime - X);
            }
        }
        function D(X, se) {
          (S = !1), _ && ((_ = !1), T(B), (B = -1)), (w = !0);
          var Z = m;
          try {
            for (O(se), v = n(d); v !== null && (!(v.expirationTime > se) || (X && !W())); ) {
              var L = v.callback;
              if (typeof L == 'function') {
                (v.callback = null), (m = v.priorityLevel);
                var q = L(v.expirationTime <= se);
                (se = t.unstable_now()),
                  typeof q == 'function' ? (v.callback = q) : v === n(d) && s(d),
                  O(se);
              } else s(d);
              v = n(d);
            }
            if (v !== null) var fe = !0;
            else {
              var ue = n(h);
              ue !== null && ye(R, ue.startTime - se), (fe = !1);
            }
            return fe;
          } finally {
            (v = null), (m = Z), (w = !1);
          }
        }
        var F = !1,
          U = null,
          B = -1,
          I = 5,
          Q = -1;
        function W() {
          return !(t.unstable_now() - Q < I);
        }
        function z() {
          if (U !== null) {
            var X = t.unstable_now();
            Q = X;
            var se = !0;
            try {
              se = U(!0, X);
            } finally {
              se ? J() : ((F = !1), (U = null));
            }
          } else F = !1;
        }
        var J;
        if (typeof C == 'function')
          J = function () {
            C(z);
          };
        else if (typeof MessageChannel < 'u') {
          var de = new MessageChannel(),
            Te = de.port2;
          (de.port1.onmessage = z),
            (J = function () {
              Te.postMessage(null);
            });
        } else
          J = function () {
            b(z, 0);
          };
        function Le(X) {
          (U = X), F || ((F = !0), J());
        }
        function ye(X, se) {
          B = b(function () {
            X(t.unstable_now());
          }, se);
        }
        (t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (X) {
            X.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            S || w || ((S = !0), Le(D));
          }),
          (t.unstable_forceFrameRate = function (X) {
            0 > X || 125 < X
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (I = 0 < X ? Math.floor(1e3 / X) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return m;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return n(d);
          }),
          (t.unstable_next = function (X) {
            switch (m) {
              case 1:
              case 2:
              case 3:
                var se = 3;
                break;
              default:
                se = m;
            }
            var Z = m;
            m = se;
            try {
              return X();
            } finally {
              m = Z;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (X, se) {
            switch (X) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                X = 3;
            }
            var Z = m;
            m = X;
            try {
              return se();
            } finally {
              m = Z;
            }
          }),
          (t.unstable_scheduleCallback = function (X, se, Z) {
            var L = t.unstable_now();
            switch (
              (typeof Z == 'object' && Z !== null
                ? ((Z = Z.delay), (Z = typeof Z == 'number' && 0 < Z ? L + Z : L))
                : (Z = L),
              X)
            ) {
              case 1:
                var q = -1;
                break;
              case 2:
                q = 250;
                break;
              case 5:
                q = 1073741823;
                break;
              case 4:
                q = 1e4;
                break;
              default:
                q = 5e3;
            }
            return (
              (q = Z + q),
              (X = {
                id: y++,
                callback: se,
                priorityLevel: X,
                startTime: Z,
                expirationTime: q,
                sortIndex: -1,
              }),
              Z > L
                ? ((X.sortIndex = Z),
                  e(h, X),
                  n(d) === null && X === n(h) && (_ ? (T(B), (B = -1)) : (_ = !0), ye(R, Z - L)))
                : ((X.sortIndex = q), e(d, X), S || w || ((S = !0), Le(D))),
              X
            );
          }),
          (t.unstable_shouldYield = W),
          (t.unstable_wrapCallback = function (X) {
            var se = m;
            return function () {
              var Z = m;
              m = se;
              try {
                return X.apply(this, arguments);
              } finally {
                m = Z;
              }
            };
          });
      })(gu)),
    gu
  );
}
var Gp;
function px() {
  return Gp || ((Gp = 1), (mu.exports = hx())), mu.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xp;
function mx() {
  if (Xp) return Et;
  Xp = 1;
  var t = uf(),
    e = px();
  function n(r) {
    for (
      var i = 'https://reactjs.org/docs/error-decoder.html?invariant=' + r, a = 1;
      a < arguments.length;
      a++
    )
      i += '&args[]=' + encodeURIComponent(arguments[a]);
    return (
      'Minified React error #' +
      r +
      '; visit ' +
      i +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  var s = new Set(),
    o = {};
  function l(r, i) {
    c(r, i), c(r + 'Capture', i);
  }
  function c(r, i) {
    for (o[r] = i, r = 0; r < i.length; r++) s.add(i[r]);
  }
  var u = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    d = Object.prototype.hasOwnProperty,
    h =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    y = {},
    v = {};
  function m(r) {
    return d.call(v, r) ? !0 : d.call(y, r) ? !1 : h.test(r) ? (v[r] = !0) : ((y[r] = !0), !1);
  }
  function w(r, i, a, f) {
    if (a !== null && a.type === 0) return !1;
    switch (typeof i) {
      case 'function':
      case 'symbol':
        return !0;
      case 'boolean':
        return f
          ? !1
          : a !== null
            ? !a.acceptsBooleans
            : ((r = r.toLowerCase().slice(0, 5)), r !== 'data-' && r !== 'aria-');
      default:
        return !1;
    }
  }
  function S(r, i, a, f) {
    if (i === null || typeof i > 'u' || w(r, i, a, f)) return !0;
    if (f) return !1;
    if (a !== null)
      switch (a.type) {
        case 3:
          return !i;
        case 4:
          return i === !1;
        case 5:
          return isNaN(i);
        case 6:
          return isNaN(i) || 1 > i;
      }
    return !1;
  }
  function _(r, i, a, f, p, g, k) {
    (this.acceptsBooleans = i === 2 || i === 3 || i === 4),
      (this.attributeName = f),
      (this.attributeNamespace = p),
      (this.mustUseProperty = a),
      (this.propertyName = r),
      (this.type = i),
      (this.sanitizeURL = g),
      (this.removeEmptyString = k);
  }
  var b = {};
  'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (r) {
      b[r] = new _(r, 0, !1, r, null, !1, !1);
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (r) {
      var i = r[0];
      b[i] = new _(i, 1, !1, r[1], null, !1, !1);
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (r) {
      b[r] = new _(r, 2, !1, r.toLowerCase(), null, !1, !1);
    }),
    ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(
      function (r) {
        b[r] = new _(r, 2, !1, r, null, !1, !1);
      }
    ),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (r) {
        b[r] = new _(r, 3, !1, r.toLowerCase(), null, !1, !1);
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (r) {
      b[r] = new _(r, 3, !0, r, null, !1, !1);
    }),
    ['capture', 'download'].forEach(function (r) {
      b[r] = new _(r, 4, !1, r, null, !1, !1);
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (r) {
      b[r] = new _(r, 6, !1, r, null, !1, !1);
    }),
    ['rowSpan', 'start'].forEach(function (r) {
      b[r] = new _(r, 5, !1, r.toLowerCase(), null, !1, !1);
    });
  var T = /[\-:]([a-z])/g;
  function C(r) {
    return r[1].toUpperCase();
  }
  'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (r) {
      var i = r.replace(T, C);
      b[i] = new _(i, 1, !1, r, null, !1, !1);
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (r) {
        var i = r.replace(T, C);
        b[i] = new _(i, 1, !1, r, 'http://www.w3.org/1999/xlink', !1, !1);
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (r) {
      var i = r.replace(T, C);
      b[i] = new _(i, 1, !1, r, 'http://www.w3.org/XML/1998/namespace', !1, !1);
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (r) {
      b[r] = new _(r, 1, !1, r.toLowerCase(), null, !1, !1);
    }),
    (b.xlinkHref = new _('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)),
    ['src', 'href', 'action', 'formAction'].forEach(function (r) {
      b[r] = new _(r, 1, !1, r.toLowerCase(), null, !0, !0);
    });
  function O(r, i, a, f) {
    var p = b.hasOwnProperty(i) ? b[i] : null;
    (p !== null
      ? p.type !== 0
      : f || !(2 < i.length) || (i[0] !== 'o' && i[0] !== 'O') || (i[1] !== 'n' && i[1] !== 'N')) &&
      (S(i, a, p, f) && (a = null),
      f || p === null
        ? m(i) && (a === null ? r.removeAttribute(i) : r.setAttribute(i, '' + a))
        : p.mustUseProperty
          ? (r[p.propertyName] = a === null ? (p.type === 3 ? !1 : '') : a)
          : ((i = p.attributeName),
            (f = p.attributeNamespace),
            a === null
              ? r.removeAttribute(i)
              : ((p = p.type),
                (a = p === 3 || (p === 4 && a === !0) ? '' : '' + a),
                f ? r.setAttributeNS(f, i, a) : r.setAttribute(i, a))));
  }
  var R = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    D = Symbol.for('react.element'),
    F = Symbol.for('react.portal'),
    U = Symbol.for('react.fragment'),
    B = Symbol.for('react.strict_mode'),
    I = Symbol.for('react.profiler'),
    Q = Symbol.for('react.provider'),
    W = Symbol.for('react.context'),
    z = Symbol.for('react.forward_ref'),
    J = Symbol.for('react.suspense'),
    de = Symbol.for('react.suspense_list'),
    Te = Symbol.for('react.memo'),
    Le = Symbol.for('react.lazy'),
    ye = Symbol.for('react.offscreen'),
    X = Symbol.iterator;
  function se(r) {
    return r === null || typeof r != 'object'
      ? null
      : ((r = (X && r[X]) || r['@@iterator']), typeof r == 'function' ? r : null);
  }
  var Z = Object.assign,
    L;
  function q(r) {
    if (L === void 0)
      try {
        throw Error();
      } catch (a) {
        var i = a.stack.trim().match(/\n( *(at )?)/);
        L = (i && i[1]) || '';
      }
    return (
      `
` +
      L +
      r
    );
  }
  var fe = !1;
  function ue(r, i) {
    if (!r || fe) return '';
    fe = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (i)
        if (
          ((i = function () {
            throw Error();
          }),
          Object.defineProperty(i.prototype, 'props', {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(i, []);
          } catch ($) {
            var f = $;
          }
          Reflect.construct(r, [], i);
        } else {
          try {
            i.call();
          } catch ($) {
            f = $;
          }
          r.call(i.prototype);
        }
      else {
        try {
          throw Error();
        } catch ($) {
          f = $;
        }
        r();
      }
    } catch ($) {
      if ($ && f && typeof $.stack == 'string') {
        for (
          var p = $.stack.split(`
`),
            g = f.stack.split(`
`),
            k = p.length - 1,
            E = g.length - 1;
          1 <= k && 0 <= E && p[k] !== g[E];

        )
          E--;
        for (; 1 <= k && 0 <= E; k--, E--)
          if (p[k] !== g[E]) {
            if (k !== 1 || E !== 1)
              do
                if ((k--, E--, 0 > E || p[k] !== g[E])) {
                  var N =
                    `
` + p[k].replace(' at new ', ' at ');
                  return (
                    r.displayName &&
                      N.includes('<anonymous>') &&
                      (N = N.replace('<anonymous>', r.displayName)),
                    N
                  );
                }
              while (1 <= k && 0 <= E);
            break;
          }
      }
    } finally {
      (fe = !1), (Error.prepareStackTrace = a);
    }
    return (r = r ? r.displayName || r.name : '') ? q(r) : '';
  }
  function ve(r) {
    switch (r.tag) {
      case 5:
        return q(r.type);
      case 16:
        return q('Lazy');
      case 13:
        return q('Suspense');
      case 19:
        return q('SuspenseList');
      case 0:
      case 2:
      case 15:
        return (r = ue(r.type, !1)), r;
      case 11:
        return (r = ue(r.type.render, !1)), r;
      case 1:
        return (r = ue(r.type, !0)), r;
      default:
        return '';
    }
  }
  function ge(r) {
    if (r == null) return null;
    if (typeof r == 'function') return r.displayName || r.name || null;
    if (typeof r == 'string') return r;
    switch (r) {
      case U:
        return 'Fragment';
      case F:
        return 'Portal';
      case I:
        return 'Profiler';
      case B:
        return 'StrictMode';
      case J:
        return 'Suspense';
      case de:
        return 'SuspenseList';
    }
    if (typeof r == 'object')
      switch (r.$$typeof) {
        case W:
          return (r.displayName || 'Context') + '.Consumer';
        case Q:
          return (r._context.displayName || 'Context') + '.Provider';
        case z:
          var i = r.render;
          return (
            (r = r.displayName),
            r ||
              ((r = i.displayName || i.name || ''),
              (r = r !== '' ? 'ForwardRef(' + r + ')' : 'ForwardRef')),
            r
          );
        case Te:
          return (i = r.displayName || null), i !== null ? i : ge(r.type) || 'Memo';
        case Le:
          (i = r._payload), (r = r._init);
          try {
            return ge(r(i));
          } catch {}
      }
    return null;
  }
  function pe(r) {
    var i = r.type;
    switch (r.tag) {
      case 24:
        return 'Cache';
      case 9:
        return (i.displayName || 'Context') + '.Consumer';
      case 10:
        return (i._context.displayName || 'Context') + '.Provider';
      case 18:
        return 'DehydratedFragment';
      case 11:
        return (
          (r = i.render),
          (r = r.displayName || r.name || ''),
          i.displayName || (r !== '' ? 'ForwardRef(' + r + ')' : 'ForwardRef')
        );
      case 7:
        return 'Fragment';
      case 5:
        return i;
      case 4:
        return 'Portal';
      case 3:
        return 'Root';
      case 6:
        return 'Text';
      case 16:
        return ge(i);
      case 8:
        return i === B ? 'StrictMode' : 'Mode';
      case 22:
        return 'Offscreen';
      case 12:
        return 'Profiler';
      case 21:
        return 'Scope';
      case 13:
        return 'Suspense';
      case 19:
        return 'SuspenseList';
      case 25:
        return 'TracingMarker';
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof i == 'function') return i.displayName || i.name || null;
        if (typeof i == 'string') return i;
    }
    return null;
  }
  function Se(r) {
    switch (typeof r) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return r;
      case 'object':
        return r;
      default:
        return '';
    }
  }
  function Ce(r) {
    var i = r.type;
    return (r = r.nodeName) && r.toLowerCase() === 'input' && (i === 'checkbox' || i === 'radio');
  }
  function ft(r) {
    var i = Ce(r) ? 'checked' : 'value',
      a = Object.getOwnPropertyDescriptor(r.constructor.prototype, i),
      f = '' + r[i];
    if (
      !r.hasOwnProperty(i) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var p = a.get,
        g = a.set;
      return (
        Object.defineProperty(r, i, {
          configurable: !0,
          get: function () {
            return p.call(this);
          },
          set: function (k) {
            (f = '' + k), g.call(this, k);
          },
        }),
        Object.defineProperty(r, i, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return f;
          },
          setValue: function (k) {
            f = '' + k;
          },
          stopTracking: function () {
            (r._valueTracker = null), delete r[i];
          },
        }
      );
    }
  }
  function Mn(r) {
    r._valueTracker || (r._valueTracker = ft(r));
  }
  function Hs(r) {
    if (!r) return !1;
    var i = r._valueTracker;
    if (!i) return !0;
    var a = i.getValue(),
      f = '';
    return (
      r && (f = Ce(r) ? (r.checked ? 'true' : 'false') : r.value),
      (r = f),
      r !== a ? (i.setValue(r), !0) : !1
    );
  }
  function ur(r) {
    if (((r = r || (typeof document < 'u' ? document : void 0)), typeof r > 'u')) return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function cn(r, i) {
    var a = i.checked;
    return Z({}, i, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? r._wrapperState.initialChecked,
    });
  }
  function so(r, i) {
    var a = i.defaultValue == null ? '' : i.defaultValue,
      f = i.checked != null ? i.checked : i.defaultChecked;
    (a = Se(i.value != null ? i.value : a)),
      (r._wrapperState = {
        initialChecked: f,
        initialValue: a,
        controlled:
          i.type === 'checkbox' || i.type === 'radio' ? i.checked != null : i.value != null,
      });
  }
  function io(r, i) {
    (i = i.checked), i != null && O(r, 'checked', i, !1);
  }
  function Vs(r, i) {
    io(r, i);
    var a = Se(i.value),
      f = i.type;
    if (a != null)
      f === 'number'
        ? ((a === 0 && r.value === '') || r.value != a) && (r.value = '' + a)
        : r.value !== '' + a && (r.value = '' + a);
    else if (f === 'submit' || f === 'reset') {
      r.removeAttribute('value');
      return;
    }
    i.hasOwnProperty('value')
      ? Fr(r, i.type, a)
      : i.hasOwnProperty('defaultValue') && Fr(r, i.type, Se(i.defaultValue)),
      i.checked == null && i.defaultChecked != null && (r.defaultChecked = !!i.defaultChecked);
  }
  function oo(r, i, a) {
    if (i.hasOwnProperty('value') || i.hasOwnProperty('defaultValue')) {
      var f = i.type;
      if (!((f !== 'submit' && f !== 'reset') || (i.value !== void 0 && i.value !== null))) return;
      (i = '' + r._wrapperState.initialValue),
        a || i === r.value || (r.value = i),
        (r.defaultValue = i);
    }
    (a = r.name),
      a !== '' && (r.name = ''),
      (r.defaultChecked = !!r._wrapperState.initialChecked),
      a !== '' && (r.name = a);
  }
  function Fr(r, i, a) {
    (i !== 'number' || ur(r.ownerDocument) !== r) &&
      (a == null
        ? (r.defaultValue = '' + r._wrapperState.initialValue)
        : r.defaultValue !== '' + a && (r.defaultValue = '' + a));
  }
  var vn = Array.isArray;
  function $n(r, i, a, f) {
    if (((r = r.options), i)) {
      i = {};
      for (var p = 0; p < a.length; p++) i['$' + a[p]] = !0;
      for (a = 0; a < r.length; a++)
        (p = i.hasOwnProperty('$' + r[a].value)),
          r[a].selected !== p && (r[a].selected = p),
          p && f && (r[a].defaultSelected = !0);
    } else {
      for (a = '' + Se(a), i = null, p = 0; p < r.length; p++) {
        if (r[p].value === a) {
          (r[p].selected = !0), f && (r[p].defaultSelected = !0);
          return;
        }
        i !== null || r[p].disabled || (i = r[p]);
      }
      i !== null && (i.selected = !0);
    }
  }
  function Ws(r, i) {
    if (i.dangerouslySetInnerHTML != null) throw Error(n(91));
    return Z({}, i, {
      value: void 0,
      defaultValue: void 0,
      children: '' + r._wrapperState.initialValue,
    });
  }
  function lo(r, i) {
    var a = i.value;
    if (a == null) {
      if (((a = i.children), (i = i.defaultValue), a != null)) {
        if (i != null) throw Error(n(92));
        if (vn(a)) {
          if (1 < a.length) throw Error(n(93));
          a = a[0];
        }
        i = a;
      }
      i == null && (i = ''), (a = i);
    }
    r._wrapperState = { initialValue: Se(a) };
  }
  function Pn(r, i) {
    var a = Se(i.value),
      f = Se(i.defaultValue);
    a != null &&
      ((a = '' + a),
      a !== r.value && (r.value = a),
      i.defaultValue == null && r.defaultValue !== a && (r.defaultValue = a)),
      f != null && (r.defaultValue = '' + f);
  }
  function zr(r) {
    var i = r.textContent;
    i === r._wrapperState.initialValue && i !== '' && i !== null && (r.value = i);
  }
  function fr(r) {
    switch (r) {
      case 'svg':
        return 'http://www.w3.org/2000/svg';
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML';
      default:
        return 'http://www.w3.org/1999/xhtml';
    }
  }
  function Ks(r, i) {
    return r == null || r === 'http://www.w3.org/1999/xhtml'
      ? fr(i)
      : r === 'http://www.w3.org/2000/svg' && i === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : r;
  }
  var Br,
    Qs = (function (r) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (i, a, f, p) {
            MSApp.execUnsafeLocalFunction(function () {
              return r(i, a, f, p);
            });
          }
        : r;
    })(function (r, i) {
      if (r.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in r) r.innerHTML = i;
      else {
        for (
          Br = Br || document.createElement('div'),
            Br.innerHTML = '<svg>' + i.valueOf().toString() + '</svg>',
            i = Br.firstChild;
          r.firstChild;

        )
          r.removeChild(r.firstChild);
        for (; i.firstChild; ) r.appendChild(i.firstChild);
      }
    });
  function le(r, i) {
    if (i) {
      var a = r.firstChild;
      if (a && a === r.lastChild && a.nodeType === 3) {
        a.nodeValue = i;
        return;
      }
    }
    r.textContent = i;
  }
  var wt = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Jt = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(wt).forEach(function (r) {
    Jt.forEach(function (i) {
      (i = i + r.charAt(0).toUpperCase() + r.substring(1)), (wt[i] = wt[r]);
    });
  });
  function rd(r, i, a) {
    return i == null || typeof i == 'boolean' || i === ''
      ? ''
      : a || typeof i != 'number' || i === 0 || (wt.hasOwnProperty(r) && wt[r])
        ? ('' + i).trim()
        : i + 'px';
  }
  function sd(r, i) {
    r = r.style;
    for (var a in i)
      if (i.hasOwnProperty(a)) {
        var f = a.indexOf('--') === 0,
          p = rd(a, i[a], f);
        a === 'float' && (a = 'cssFloat'), f ? r.setProperty(a, p) : (r[a] = p);
      }
  }
  var ow = Z(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function ba(r, i) {
    if (i) {
      if (ow[r] && (i.children != null || i.dangerouslySetInnerHTML != null))
        throw Error(n(137, r));
      if (i.dangerouslySetInnerHTML != null) {
        if (i.children != null) throw Error(n(60));
        if (
          typeof i.dangerouslySetInnerHTML != 'object' ||
          !('__html' in i.dangerouslySetInnerHTML)
        )
          throw Error(n(61));
      }
      if (i.style != null && typeof i.style != 'object') throw Error(n(62));
    }
  }
  function Ea(r, i) {
    if (r.indexOf('-') === -1) return typeof i.is == 'string';
    switch (r) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var Ta = null;
  function Na(r) {
    return (
      (r = r.target || r.srcElement || window),
      r.correspondingUseElement && (r = r.correspondingUseElement),
      r.nodeType === 3 ? r.parentNode : r
    );
  }
  var Ca = null,
    Ur = null,
    qr = null;
  function id(r) {
    if ((r = gi(r))) {
      if (typeof Ca != 'function') throw Error(n(280));
      var i = r.stateNode;
      i && ((i = jo(i)), Ca(r.stateNode, r.type, i));
    }
  }
  function od(r) {
    Ur ? (qr ? qr.push(r) : (qr = [r])) : (Ur = r);
  }
  function ld() {
    if (Ur) {
      var r = Ur,
        i = qr;
      if (((qr = Ur = null), id(r), i)) for (r = 0; r < i.length; r++) id(i[r]);
    }
  }
  function ad(r, i) {
    return r(i);
  }
  function cd() {}
  var Aa = !1;
  function ud(r, i, a) {
    if (Aa) return r(i, a);
    Aa = !0;
    try {
      return ad(r, i, a);
    } finally {
      (Aa = !1), (Ur !== null || qr !== null) && (cd(), ld());
    }
  }
  function Gs(r, i) {
    var a = r.stateNode;
    if (a === null) return null;
    var f = jo(a);
    if (f === null) return null;
    a = f[i];
    e: switch (i) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        (f = !f.disabled) ||
          ((r = r.type),
          (f = !(r === 'button' || r === 'input' || r === 'select' || r === 'textarea'))),
          (r = !f);
        break e;
      default:
        r = !1;
    }
    if (r) return null;
    if (a && typeof a != 'function') throw Error(n(231, i, typeof a));
    return a;
  }
  var La = !1;
  if (u)
    try {
      var Xs = {};
      Object.defineProperty(Xs, 'passive', {
        get: function () {
          La = !0;
        },
      }),
        window.addEventListener('test', Xs, Xs),
        window.removeEventListener('test', Xs, Xs);
    } catch {
      La = !1;
    }
  function lw(r, i, a, f, p, g, k, E, N) {
    var $ = Array.prototype.slice.call(arguments, 3);
    try {
      i.apply(a, $);
    } catch (V) {
      this.onError(V);
    }
  }
  var Js = !1,
    ao = null,
    co = !1,
    ja = null,
    aw = {
      onError: function (r) {
        (Js = !0), (ao = r);
      },
    };
  function cw(r, i, a, f, p, g, k, E, N) {
    (Js = !1), (ao = null), lw.apply(aw, arguments);
  }
  function uw(r, i, a, f, p, g, k, E, N) {
    if ((cw.apply(this, arguments), Js)) {
      if (Js) {
        var $ = ao;
        (Js = !1), (ao = null);
      } else throw Error(n(198));
      co || ((co = !0), (ja = $));
    }
  }
  function dr(r) {
    var i = r,
      a = r;
    if (r.alternate) for (; i.return; ) i = i.return;
    else {
      r = i;
      do (i = r), (i.flags & 4098) !== 0 && (a = i.return), (r = i.return);
      while (r);
    }
    return i.tag === 3 ? a : null;
  }
  function fd(r) {
    if (r.tag === 13) {
      var i = r.memoizedState;
      if ((i === null && ((r = r.alternate), r !== null && (i = r.memoizedState)), i !== null))
        return i.dehydrated;
    }
    return null;
  }
  function dd(r) {
    if (dr(r) !== r) throw Error(n(188));
  }
  function fw(r) {
    var i = r.alternate;
    if (!i) {
      if (((i = dr(r)), i === null)) throw Error(n(188));
      return i !== r ? null : r;
    }
    for (var a = r, f = i; ; ) {
      var p = a.return;
      if (p === null) break;
      var g = p.alternate;
      if (g === null) {
        if (((f = p.return), f !== null)) {
          a = f;
          continue;
        }
        break;
      }
      if (p.child === g.child) {
        for (g = p.child; g; ) {
          if (g === a) return dd(p), r;
          if (g === f) return dd(p), i;
          g = g.sibling;
        }
        throw Error(n(188));
      }
      if (a.return !== f.return) (a = p), (f = g);
      else {
        for (var k = !1, E = p.child; E; ) {
          if (E === a) {
            (k = !0), (a = p), (f = g);
            break;
          }
          if (E === f) {
            (k = !0), (f = p), (a = g);
            break;
          }
          E = E.sibling;
        }
        if (!k) {
          for (E = g.child; E; ) {
            if (E === a) {
              (k = !0), (a = g), (f = p);
              break;
            }
            if (E === f) {
              (k = !0), (f = g), (a = p);
              break;
            }
            E = E.sibling;
          }
          if (!k) throw Error(n(189));
        }
      }
      if (a.alternate !== f) throw Error(n(190));
    }
    if (a.tag !== 3) throw Error(n(188));
    return a.stateNode.current === a ? r : i;
  }
  function hd(r) {
    return (r = fw(r)), r !== null ? pd(r) : null;
  }
  function pd(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var i = pd(r);
      if (i !== null) return i;
      r = r.sibling;
    }
    return null;
  }
  var md = e.unstable_scheduleCallback,
    gd = e.unstable_cancelCallback,
    dw = e.unstable_shouldYield,
    hw = e.unstable_requestPaint,
    qe = e.unstable_now,
    pw = e.unstable_getCurrentPriorityLevel,
    Ia = e.unstable_ImmediatePriority,
    yd = e.unstable_UserBlockingPriority,
    uo = e.unstable_NormalPriority,
    mw = e.unstable_LowPriority,
    vd = e.unstable_IdlePriority,
    fo = null,
    un = null;
  function gw(r) {
    if (un && typeof un.onCommitFiberRoot == 'function')
      try {
        un.onCommitFiberRoot(fo, r, void 0, (r.current.flags & 128) === 128);
      } catch {}
  }
  var Yt = Math.clz32 ? Math.clz32 : ww,
    yw = Math.log,
    vw = Math.LN2;
  function ww(r) {
    return (r >>>= 0), r === 0 ? 32 : (31 - ((yw(r) / vw) | 0)) | 0;
  }
  var ho = 64,
    po = 4194304;
  function Ys(r) {
    switch (r & -r) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return r & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return r;
    }
  }
  function mo(r, i) {
    var a = r.pendingLanes;
    if (a === 0) return 0;
    var f = 0,
      p = r.suspendedLanes,
      g = r.pingedLanes,
      k = a & 268435455;
    if (k !== 0) {
      var E = k & ~p;
      E !== 0 ? (f = Ys(E)) : ((g &= k), g !== 0 && (f = Ys(g)));
    } else (k = a & ~p), k !== 0 ? (f = Ys(k)) : g !== 0 && (f = Ys(g));
    if (f === 0) return 0;
    if (
      i !== 0 &&
      i !== f &&
      (i & p) === 0 &&
      ((p = f & -f), (g = i & -i), p >= g || (p === 16 && (g & 4194240) !== 0))
    )
      return i;
    if (((f & 4) !== 0 && (f |= a & 16), (i = r.entangledLanes), i !== 0))
      for (r = r.entanglements, i &= f; 0 < i; )
        (a = 31 - Yt(i)), (p = 1 << a), (f |= r[a]), (i &= ~p);
    return f;
  }
  function xw(r, i) {
    switch (r) {
      case 1:
      case 2:
      case 4:
        return i + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return i + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Sw(r, i) {
    for (
      var a = r.suspendedLanes, f = r.pingedLanes, p = r.expirationTimes, g = r.pendingLanes;
      0 < g;

    ) {
      var k = 31 - Yt(g),
        E = 1 << k,
        N = p[k];
      N === -1
        ? ((E & a) === 0 || (E & f) !== 0) && (p[k] = xw(E, i))
        : N <= i && (r.expiredLanes |= E),
        (g &= ~E);
    }
  }
  function Oa(r) {
    return (r = r.pendingLanes & -1073741825), r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function wd() {
    var r = ho;
    return (ho <<= 1), (ho & 4194240) === 0 && (ho = 64), r;
  }
  function Ma(r) {
    for (var i = [], a = 0; 31 > a; a++) i.push(r);
    return i;
  }
  function Zs(r, i, a) {
    (r.pendingLanes |= i),
      i !== 536870912 && ((r.suspendedLanes = 0), (r.pingedLanes = 0)),
      (r = r.eventTimes),
      (i = 31 - Yt(i)),
      (r[i] = a);
  }
  function _w(r, i) {
    var a = r.pendingLanes & ~i;
    (r.pendingLanes = i),
      (r.suspendedLanes = 0),
      (r.pingedLanes = 0),
      (r.expiredLanes &= i),
      (r.mutableReadLanes &= i),
      (r.entangledLanes &= i),
      (i = r.entanglements);
    var f = r.eventTimes;
    for (r = r.expirationTimes; 0 < a; ) {
      var p = 31 - Yt(a),
        g = 1 << p;
      (i[p] = 0), (f[p] = -1), (r[p] = -1), (a &= ~g);
    }
  }
  function $a(r, i) {
    var a = (r.entangledLanes |= i);
    for (r = r.entanglements; a; ) {
      var f = 31 - Yt(a),
        p = 1 << f;
      (p & i) | (r[f] & i) && (r[f] |= i), (a &= ~p);
    }
  }
  var Ee = 0;
  function xd(r) {
    return (r &= -r), 1 < r ? (4 < r ? ((r & 268435455) !== 0 ? 16 : 536870912) : 4) : 1;
  }
  var Sd,
    Pa,
    _d,
    kd,
    bd,
    Ra = !1,
    go = [],
    Rn = null,
    Dn = null,
    Fn = null,
    ei = new Map(),
    ti = new Map(),
    zn = [],
    kw =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      );
  function Ed(r, i) {
    switch (r) {
      case 'focusin':
      case 'focusout':
        Rn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Dn = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Fn = null;
        break;
      case 'pointerover':
      case 'pointerout':
        ei.delete(i.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        ti.delete(i.pointerId);
    }
  }
  function ni(r, i, a, f, p, g) {
    return r === null || r.nativeEvent !== g
      ? ((r = {
          blockedOn: i,
          domEventName: a,
          eventSystemFlags: f,
          nativeEvent: g,
          targetContainers: [p],
        }),
        i !== null && ((i = gi(i)), i !== null && Pa(i)),
        r)
      : ((r.eventSystemFlags |= f),
        (i = r.targetContainers),
        p !== null && i.indexOf(p) === -1 && i.push(p),
        r);
  }
  function bw(r, i, a, f, p) {
    switch (i) {
      case 'focusin':
        return (Rn = ni(Rn, r, i, a, f, p)), !0;
      case 'dragenter':
        return (Dn = ni(Dn, r, i, a, f, p)), !0;
      case 'mouseover':
        return (Fn = ni(Fn, r, i, a, f, p)), !0;
      case 'pointerover':
        var g = p.pointerId;
        return ei.set(g, ni(ei.get(g) || null, r, i, a, f, p)), !0;
      case 'gotpointercapture':
        return (g = p.pointerId), ti.set(g, ni(ti.get(g) || null, r, i, a, f, p)), !0;
    }
    return !1;
  }
  function Td(r) {
    var i = hr(r.target);
    if (i !== null) {
      var a = dr(i);
      if (a !== null) {
        if (((i = a.tag), i === 13)) {
          if (((i = fd(a)), i !== null)) {
            (r.blockedOn = i),
              bd(r.priority, function () {
                _d(a);
              });
            return;
          }
        } else if (i === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          r.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    r.blockedOn = null;
  }
  function yo(r) {
    if (r.blockedOn !== null) return !1;
    for (var i = r.targetContainers; 0 < i.length; ) {
      var a = Fa(r.domEventName, r.eventSystemFlags, i[0], r.nativeEvent);
      if (a === null) {
        a = r.nativeEvent;
        var f = new a.constructor(a.type, a);
        (Ta = f), a.target.dispatchEvent(f), (Ta = null);
      } else return (i = gi(a)), i !== null && Pa(i), (r.blockedOn = a), !1;
      i.shift();
    }
    return !0;
  }
  function Nd(r, i, a) {
    yo(r) && a.delete(i);
  }
  function Ew() {
    (Ra = !1),
      Rn !== null && yo(Rn) && (Rn = null),
      Dn !== null && yo(Dn) && (Dn = null),
      Fn !== null && yo(Fn) && (Fn = null),
      ei.forEach(Nd),
      ti.forEach(Nd);
  }
  function ri(r, i) {
    r.blockedOn === i &&
      ((r.blockedOn = null),
      Ra || ((Ra = !0), e.unstable_scheduleCallback(e.unstable_NormalPriority, Ew)));
  }
  function si(r) {
    function i(p) {
      return ri(p, r);
    }
    if (0 < go.length) {
      ri(go[0], r);
      for (var a = 1; a < go.length; a++) {
        var f = go[a];
        f.blockedOn === r && (f.blockedOn = null);
      }
    }
    for (
      Rn !== null && ri(Rn, r),
        Dn !== null && ri(Dn, r),
        Fn !== null && ri(Fn, r),
        ei.forEach(i),
        ti.forEach(i),
        a = 0;
      a < zn.length;
      a++
    )
      (f = zn[a]), f.blockedOn === r && (f.blockedOn = null);
    for (; 0 < zn.length && ((a = zn[0]), a.blockedOn === null); )
      Td(a), a.blockedOn === null && zn.shift();
  }
  var Hr = R.ReactCurrentBatchConfig,
    vo = !0;
  function Tw(r, i, a, f) {
    var p = Ee,
      g = Hr.transition;
    Hr.transition = null;
    try {
      (Ee = 1), Da(r, i, a, f);
    } finally {
      (Ee = p), (Hr.transition = g);
    }
  }
  function Nw(r, i, a, f) {
    var p = Ee,
      g = Hr.transition;
    Hr.transition = null;
    try {
      (Ee = 4), Da(r, i, a, f);
    } finally {
      (Ee = p), (Hr.transition = g);
    }
  }
  function Da(r, i, a, f) {
    if (vo) {
      var p = Fa(r, i, a, f);
      if (p === null) nc(r, i, f, wo, a), Ed(r, f);
      else if (bw(p, r, i, a, f)) f.stopPropagation();
      else if ((Ed(r, f), i & 4 && -1 < kw.indexOf(r))) {
        for (; p !== null; ) {
          var g = gi(p);
          if (
            (g !== null && Sd(g), (g = Fa(r, i, a, f)), g === null && nc(r, i, f, wo, a), g === p)
          )
            break;
          p = g;
        }
        p !== null && f.stopPropagation();
      } else nc(r, i, f, null, a);
    }
  }
  var wo = null;
  function Fa(r, i, a, f) {
    if (((wo = null), (r = Na(f)), (r = hr(r)), r !== null))
      if (((i = dr(r)), i === null)) r = null;
      else if (((a = i.tag), a === 13)) {
        if (((r = fd(i)), r !== null)) return r;
        r = null;
      } else if (a === 3) {
        if (i.stateNode.current.memoizedState.isDehydrated)
          return i.tag === 3 ? i.stateNode.containerInfo : null;
        r = null;
      } else i !== r && (r = null);
    return (wo = r), null;
  }
  function Cd(r) {
    switch (r) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4;
      case 'message':
        switch (pw()) {
          case Ia:
            return 1;
          case yd:
            return 4;
          case uo:
          case mw:
            return 16;
          case vd:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Bn = null,
    za = null,
    xo = null;
  function Ad() {
    if (xo) return xo;
    var r,
      i = za,
      a = i.length,
      f,
      p = 'value' in Bn ? Bn.value : Bn.textContent,
      g = p.length;
    for (r = 0; r < a && i[r] === p[r]; r++);
    var k = a - r;
    for (f = 1; f <= k && i[a - f] === p[g - f]; f++);
    return (xo = p.slice(r, 1 < f ? 1 - f : void 0));
  }
  function So(r) {
    var i = r.keyCode;
    return (
      'charCode' in r ? ((r = r.charCode), r === 0 && i === 13 && (r = 13)) : (r = i),
      r === 10 && (r = 13),
      32 <= r || r === 13 ? r : 0
    );
  }
  function _o() {
    return !0;
  }
  function Ld() {
    return !1;
  }
  function It(r) {
    function i(a, f, p, g, k) {
      (this._reactName = a),
        (this._targetInst = p),
        (this.type = f),
        (this.nativeEvent = g),
        (this.target = k),
        (this.currentTarget = null);
      for (var E in r) r.hasOwnProperty(E) && ((a = r[E]), (this[E] = a ? a(g) : g[E]));
      return (
        (this.isDefaultPrevented = (
          g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1
        )
          ? _o
          : Ld),
        (this.isPropagationStopped = Ld),
        this
      );
    }
    return (
      Z(i.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = _o));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = _o));
        },
        persist: function () {},
        isPersistent: _o,
      }),
      i
    );
  }
  var Vr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (r) {
        return r.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ba = It(Vr),
    ii = Z({}, Vr, { view: 0, detail: 0 }),
    Cw = It(ii),
    Ua,
    qa,
    oi,
    ko = Z({}, ii, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Va,
      button: 0,
      buttons: 0,
      relatedTarget: function (r) {
        return r.relatedTarget === void 0
          ? r.fromElement === r.srcElement
            ? r.toElement
            : r.fromElement
          : r.relatedTarget;
      },
      movementX: function (r) {
        return 'movementX' in r
          ? r.movementX
          : (r !== oi &&
              (oi && r.type === 'mousemove'
                ? ((Ua = r.screenX - oi.screenX), (qa = r.screenY - oi.screenY))
                : (qa = Ua = 0),
              (oi = r)),
            Ua);
      },
      movementY: function (r) {
        return 'movementY' in r ? r.movementY : qa;
      },
    }),
    jd = It(ko),
    Aw = Z({}, ko, { dataTransfer: 0 }),
    Lw = It(Aw),
    jw = Z({}, ii, { relatedTarget: 0 }),
    Ha = It(jw),
    Iw = Z({}, Vr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ow = It(Iw),
    Mw = Z({}, Vr, {
      clipboardData: function (r) {
        return 'clipboardData' in r ? r.clipboardData : window.clipboardData;
      },
    }),
    $w = It(Mw),
    Pw = Z({}, Vr, { data: 0 }),
    Id = It(Pw),
    Rw = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Dw = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    Fw = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function zw(r) {
    var i = this.nativeEvent;
    return i.getModifierState ? i.getModifierState(r) : (r = Fw[r]) ? !!i[r] : !1;
  }
  function Va() {
    return zw;
  }
  var Bw = Z({}, ii, {
      key: function (r) {
        if (r.key) {
          var i = Rw[r.key] || r.key;
          if (i !== 'Unidentified') return i;
        }
        return r.type === 'keypress'
          ? ((r = So(r)), r === 13 ? 'Enter' : String.fromCharCode(r))
          : r.type === 'keydown' || r.type === 'keyup'
            ? Dw[r.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Va,
      charCode: function (r) {
        return r.type === 'keypress' ? So(r) : 0;
      },
      keyCode: function (r) {
        return r.type === 'keydown' || r.type === 'keyup' ? r.keyCode : 0;
      },
      which: function (r) {
        return r.type === 'keypress'
          ? So(r)
          : r.type === 'keydown' || r.type === 'keyup'
            ? r.keyCode
            : 0;
      },
    }),
    Uw = It(Bw),
    qw = Z({}, ko, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Od = It(qw),
    Hw = Z({}, ii, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Va,
    }),
    Vw = It(Hw),
    Ww = Z({}, Vr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Kw = It(Ww),
    Qw = Z({}, ko, {
      deltaX: function (r) {
        return 'deltaX' in r ? r.deltaX : 'wheelDeltaX' in r ? -r.wheelDeltaX : 0;
      },
      deltaY: function (r) {
        return 'deltaY' in r
          ? r.deltaY
          : 'wheelDeltaY' in r
            ? -r.wheelDeltaY
            : 'wheelDelta' in r
              ? -r.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Gw = It(Qw),
    Xw = [9, 13, 27, 32],
    Wa = u && 'CompositionEvent' in window,
    li = null;
  u && 'documentMode' in document && (li = document.documentMode);
  var Jw = u && 'TextEvent' in window && !li,
    Md = u && (!Wa || (li && 8 < li && 11 >= li)),
    $d = ' ',
    Pd = !1;
  function Rd(r, i) {
    switch (r) {
      case 'keyup':
        return Xw.indexOf(i.keyCode) !== -1;
      case 'keydown':
        return i.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Dd(r) {
    return (r = r.detail), typeof r == 'object' && 'data' in r ? r.data : null;
  }
  var Wr = !1;
  function Yw(r, i) {
    switch (r) {
      case 'compositionend':
        return Dd(i);
      case 'keypress':
        return i.which !== 32 ? null : ((Pd = !0), $d);
      case 'textInput':
        return (r = i.data), r === $d && Pd ? null : r;
      default:
        return null;
    }
  }
  function Zw(r, i) {
    if (Wr)
      return r === 'compositionend' || (!Wa && Rd(r, i))
        ? ((r = Ad()), (xo = za = Bn = null), (Wr = !1), r)
        : null;
    switch (r) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(i.ctrlKey || i.altKey || i.metaKey) || (i.ctrlKey && i.altKey)) {
          if (i.char && 1 < i.char.length) return i.char;
          if (i.which) return String.fromCharCode(i.which);
        }
        return null;
      case 'compositionend':
        return Md && i.locale !== 'ko' ? null : i.data;
      default:
        return null;
    }
  }
  var e0 = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Fd(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return i === 'input' ? !!e0[r.type] : i === 'textarea';
  }
  function zd(r, i, a, f) {
    od(f),
      (i = Co(i, 'onChange')),
      0 < i.length &&
        ((a = new Ba('onChange', 'change', null, a, f)), r.push({ event: a, listeners: i }));
  }
  var ai = null,
    ci = null;
  function t0(r) {
    sh(r, 0);
  }
  function bo(r) {
    var i = Jr(r);
    if (Hs(i)) return r;
  }
  function n0(r, i) {
    if (r === 'change') return i;
  }
  var Bd = !1;
  if (u) {
    var Ka;
    if (u) {
      var Qa = 'oninput' in document;
      if (!Qa) {
        var Ud = document.createElement('div');
        Ud.setAttribute('oninput', 'return;'), (Qa = typeof Ud.oninput == 'function');
      }
      Ka = Qa;
    } else Ka = !1;
    Bd = Ka && (!document.documentMode || 9 < document.documentMode);
  }
  function qd() {
    ai && (ai.detachEvent('onpropertychange', Hd), (ci = ai = null));
  }
  function Hd(r) {
    if (r.propertyName === 'value' && bo(ci)) {
      var i = [];
      zd(i, ci, r, Na(r)), ud(t0, i);
    }
  }
  function r0(r, i, a) {
    r === 'focusin'
      ? (qd(), (ai = i), (ci = a), ai.attachEvent('onpropertychange', Hd))
      : r === 'focusout' && qd();
  }
  function s0(r) {
    if (r === 'selectionchange' || r === 'keyup' || r === 'keydown') return bo(ci);
  }
  function i0(r, i) {
    if (r === 'click') return bo(i);
  }
  function o0(r, i) {
    if (r === 'input' || r === 'change') return bo(i);
  }
  function l0(r, i) {
    return (r === i && (r !== 0 || 1 / r === 1 / i)) || (r !== r && i !== i);
  }
  var Zt = typeof Object.is == 'function' ? Object.is : l0;
  function ui(r, i) {
    if (Zt(r, i)) return !0;
    if (typeof r != 'object' || r === null || typeof i != 'object' || i === null) return !1;
    var a = Object.keys(r),
      f = Object.keys(i);
    if (a.length !== f.length) return !1;
    for (f = 0; f < a.length; f++) {
      var p = a[f];
      if (!d.call(i, p) || !Zt(r[p], i[p])) return !1;
    }
    return !0;
  }
  function Vd(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Wd(r, i) {
    var a = Vd(r);
    r = 0;
    for (var f; a; ) {
      if (a.nodeType === 3) {
        if (((f = r + a.textContent.length), r <= i && f >= i)) return { node: a, offset: i - r };
        r = f;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Vd(a);
    }
  }
  function Kd(r, i) {
    return r && i
      ? r === i
        ? !0
        : r && r.nodeType === 3
          ? !1
          : i && i.nodeType === 3
            ? Kd(r, i.parentNode)
            : 'contains' in r
              ? r.contains(i)
              : r.compareDocumentPosition
                ? !!(r.compareDocumentPosition(i) & 16)
                : !1
      : !1;
  }
  function Qd() {
    for (var r = window, i = ur(); i instanceof r.HTMLIFrameElement; ) {
      try {
        var a = typeof i.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) r = i.contentWindow;
      else break;
      i = ur(r.document);
    }
    return i;
  }
  function Ga(r) {
    var i = r && r.nodeName && r.nodeName.toLowerCase();
    return (
      i &&
      ((i === 'input' &&
        (r.type === 'text' ||
          r.type === 'search' ||
          r.type === 'tel' ||
          r.type === 'url' ||
          r.type === 'password')) ||
        i === 'textarea' ||
        r.contentEditable === 'true')
    );
  }
  function a0(r) {
    var i = Qd(),
      a = r.focusedElem,
      f = r.selectionRange;
    if (i !== a && a && a.ownerDocument && Kd(a.ownerDocument.documentElement, a)) {
      if (f !== null && Ga(a)) {
        if (((i = f.start), (r = f.end), r === void 0 && (r = i), 'selectionStart' in a))
          (a.selectionStart = i), (a.selectionEnd = Math.min(r, a.value.length));
        else if (
          ((r = ((i = a.ownerDocument || document) && i.defaultView) || window), r.getSelection)
        ) {
          r = r.getSelection();
          var p = a.textContent.length,
            g = Math.min(f.start, p);
          (f = f.end === void 0 ? g : Math.min(f.end, p)),
            !r.extend && g > f && ((p = f), (f = g), (g = p)),
            (p = Wd(a, g));
          var k = Wd(a, f);
          p &&
            k &&
            (r.rangeCount !== 1 ||
              r.anchorNode !== p.node ||
              r.anchorOffset !== p.offset ||
              r.focusNode !== k.node ||
              r.focusOffset !== k.offset) &&
            ((i = i.createRange()),
            i.setStart(p.node, p.offset),
            r.removeAllRanges(),
            g > f
              ? (r.addRange(i), r.extend(k.node, k.offset))
              : (i.setEnd(k.node, k.offset), r.addRange(i)));
        }
      }
      for (i = [], r = a; (r = r.parentNode); )
        r.nodeType === 1 && i.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
      for (typeof a.focus == 'function' && a.focus(), a = 0; a < i.length; a++)
        (r = i[a]), (r.element.scrollLeft = r.left), (r.element.scrollTop = r.top);
    }
  }
  var c0 = u && 'documentMode' in document && 11 >= document.documentMode,
    Kr = null,
    Xa = null,
    fi = null,
    Ja = !1;
  function Gd(r, i, a) {
    var f = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Ja ||
      Kr == null ||
      Kr !== ur(f) ||
      ((f = Kr),
      'selectionStart' in f && Ga(f)
        ? (f = { start: f.selectionStart, end: f.selectionEnd })
        : ((f = ((f.ownerDocument && f.ownerDocument.defaultView) || window).getSelection()),
          (f = {
            anchorNode: f.anchorNode,
            anchorOffset: f.anchorOffset,
            focusNode: f.focusNode,
            focusOffset: f.focusOffset,
          })),
      (fi && ui(fi, f)) ||
        ((fi = f),
        (f = Co(Xa, 'onSelect')),
        0 < f.length &&
          ((i = new Ba('onSelect', 'select', null, i, a)),
          r.push({ event: i, listeners: f }),
          (i.target = Kr))));
  }
  function Eo(r, i) {
    var a = {};
    return (
      (a[r.toLowerCase()] = i.toLowerCase()),
      (a['Webkit' + r] = 'webkit' + i),
      (a['Moz' + r] = 'moz' + i),
      a
    );
  }
  var Qr = {
      animationend: Eo('Animation', 'AnimationEnd'),
      animationiteration: Eo('Animation', 'AnimationIteration'),
      animationstart: Eo('Animation', 'AnimationStart'),
      transitionend: Eo('Transition', 'TransitionEnd'),
    },
    Ya = {},
    Xd = {};
  u &&
    ((Xd = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Qr.animationend.animation,
      delete Qr.animationiteration.animation,
      delete Qr.animationstart.animation),
    'TransitionEvent' in window || delete Qr.transitionend.transition);
  function To(r) {
    if (Ya[r]) return Ya[r];
    if (!Qr[r]) return r;
    var i = Qr[r],
      a;
    for (a in i) if (i.hasOwnProperty(a) && a in Xd) return (Ya[r] = i[a]);
    return r;
  }
  var Jd = To('animationend'),
    Yd = To('animationiteration'),
    Zd = To('animationstart'),
    eh = To('transitionend'),
    th = new Map(),
    nh =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  function Un(r, i) {
    th.set(r, i), l(i, [r]);
  }
  for (var Za = 0; Za < nh.length; Za++) {
    var ec = nh[Za],
      u0 = ec.toLowerCase(),
      f0 = ec[0].toUpperCase() + ec.slice(1);
    Un(u0, 'on' + f0);
  }
  Un(Jd, 'onAnimationEnd'),
    Un(Yd, 'onAnimationIteration'),
    Un(Zd, 'onAnimationStart'),
    Un('dblclick', 'onDoubleClick'),
    Un('focusin', 'onFocus'),
    Un('focusout', 'onBlur'),
    Un(eh, 'onTransitionEnd'),
    c('onMouseEnter', ['mouseout', 'mouseover']),
    c('onMouseLeave', ['mouseout', 'mouseover']),
    c('onPointerEnter', ['pointerout', 'pointerover']),
    c('onPointerLeave', ['pointerout', 'pointerover']),
    l('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    l(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    l('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    l('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    l(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    l(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    );
  var di =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    d0 = new Set('cancel close invalid load scroll toggle'.split(' ').concat(di));
  function rh(r, i, a) {
    var f = r.type || 'unknown-event';
    (r.currentTarget = a), uw(f, i, void 0, r), (r.currentTarget = null);
  }
  function sh(r, i) {
    i = (i & 4) !== 0;
    for (var a = 0; a < r.length; a++) {
      var f = r[a],
        p = f.event;
      f = f.listeners;
      e: {
        var g = void 0;
        if (i)
          for (var k = f.length - 1; 0 <= k; k--) {
            var E = f[k],
              N = E.instance,
              $ = E.currentTarget;
            if (((E = E.listener), N !== g && p.isPropagationStopped())) break e;
            rh(p, E, $), (g = N);
          }
        else
          for (k = 0; k < f.length; k++) {
            if (
              ((E = f[k]),
              (N = E.instance),
              ($ = E.currentTarget),
              (E = E.listener),
              N !== g && p.isPropagationStopped())
            )
              break e;
            rh(p, E, $), (g = N);
          }
      }
    }
    if (co) throw ((r = ja), (co = !1), (ja = null), r);
  }
  function je(r, i) {
    var a = i[ac];
    a === void 0 && (a = i[ac] = new Set());
    var f = r + '__bubble';
    a.has(f) || (ih(i, r, 2, !1), a.add(f));
  }
  function tc(r, i, a) {
    var f = 0;
    i && (f |= 4), ih(a, r, f, i);
  }
  var No = '_reactListening' + Math.random().toString(36).slice(2);
  function hi(r) {
    if (!r[No]) {
      (r[No] = !0),
        s.forEach(function (a) {
          a !== 'selectionchange' && (d0.has(a) || tc(a, !1, r), tc(a, !0, r));
        });
      var i = r.nodeType === 9 ? r : r.ownerDocument;
      i === null || i[No] || ((i[No] = !0), tc('selectionchange', !1, i));
    }
  }
  function ih(r, i, a, f) {
    switch (Cd(i)) {
      case 1:
        var p = Tw;
        break;
      case 4:
        p = Nw;
        break;
      default:
        p = Da;
    }
    (a = p.bind(null, i, a, r)),
      (p = void 0),
      !La || (i !== 'touchstart' && i !== 'touchmove' && i !== 'wheel') || (p = !0),
      f
        ? p !== void 0
          ? r.addEventListener(i, a, { capture: !0, passive: p })
          : r.addEventListener(i, a, !0)
        : p !== void 0
          ? r.addEventListener(i, a, { passive: p })
          : r.addEventListener(i, a, !1);
  }
  function nc(r, i, a, f, p) {
    var g = f;
    if ((i & 1) === 0 && (i & 2) === 0 && f !== null)
      e: for (;;) {
        if (f === null) return;
        var k = f.tag;
        if (k === 3 || k === 4) {
          var E = f.stateNode.containerInfo;
          if (E === p || (E.nodeType === 8 && E.parentNode === p)) break;
          if (k === 4)
            for (k = f.return; k !== null; ) {
              var N = k.tag;
              if (
                (N === 3 || N === 4) &&
                ((N = k.stateNode.containerInfo),
                N === p || (N.nodeType === 8 && N.parentNode === p))
              )
                return;
              k = k.return;
            }
          for (; E !== null; ) {
            if (((k = hr(E)), k === null)) return;
            if (((N = k.tag), N === 5 || N === 6)) {
              f = g = k;
              continue e;
            }
            E = E.parentNode;
          }
        }
        f = f.return;
      }
    ud(function () {
      var $ = g,
        V = Na(a),
        K = [];
      e: {
        var H = th.get(r);
        if (H !== void 0) {
          var Y = Ba,
            te = r;
          switch (r) {
            case 'keypress':
              if (So(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              Y = Uw;
              break;
            case 'focusin':
              (te = 'focus'), (Y = Ha);
              break;
            case 'focusout':
              (te = 'blur'), (Y = Ha);
              break;
            case 'beforeblur':
            case 'afterblur':
              Y = Ha;
              break;
            case 'click':
              if (a.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              Y = jd;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              Y = Lw;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              Y = Vw;
              break;
            case Jd:
            case Yd:
            case Zd:
              Y = Ow;
              break;
            case eh:
              Y = Kw;
              break;
            case 'scroll':
              Y = Cw;
              break;
            case 'wheel':
              Y = Gw;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              Y = $w;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              Y = Od;
          }
          var ne = (i & 4) !== 0,
            He = !ne && r === 'scroll',
            j = ne ? (H !== null ? H + 'Capture' : null) : H;
          ne = [];
          for (var A = $, M; A !== null; ) {
            M = A;
            var G = M.stateNode;
            if (
              (M.tag === 5 &&
                G !== null &&
                ((M = G), j !== null && ((G = Gs(A, j)), G != null && ne.push(pi(A, G, M)))),
              He)
            )
              break;
            A = A.return;
          }
          0 < ne.length && ((H = new Y(H, te, null, a, V)), K.push({ event: H, listeners: ne }));
        }
      }
      if ((i & 7) === 0) {
        e: {
          if (
            ((H = r === 'mouseover' || r === 'pointerover'),
            (Y = r === 'mouseout' || r === 'pointerout'),
            H && a !== Ta && (te = a.relatedTarget || a.fromElement) && (hr(te) || te[wn]))
          )
            break e;
          if (
            (Y || H) &&
            ((H =
              V.window === V
                ? V
                : (H = V.ownerDocument)
                  ? H.defaultView || H.parentWindow
                  : window),
            Y
              ? ((te = a.relatedTarget || a.toElement),
                (Y = $),
                (te = te ? hr(te) : null),
                te !== null &&
                  ((He = dr(te)), te !== He || (te.tag !== 5 && te.tag !== 6)) &&
                  (te = null))
              : ((Y = null), (te = $)),
            Y !== te)
          ) {
            if (
              ((ne = jd),
              (G = 'onMouseLeave'),
              (j = 'onMouseEnter'),
              (A = 'mouse'),
              (r === 'pointerout' || r === 'pointerover') &&
                ((ne = Od), (G = 'onPointerLeave'), (j = 'onPointerEnter'), (A = 'pointer')),
              (He = Y == null ? H : Jr(Y)),
              (M = te == null ? H : Jr(te)),
              (H = new ne(G, A + 'leave', Y, a, V)),
              (H.target = He),
              (H.relatedTarget = M),
              (G = null),
              hr(V) === $ &&
                ((ne = new ne(j, A + 'enter', te, a, V)),
                (ne.target = M),
                (ne.relatedTarget = He),
                (G = ne)),
              (He = G),
              Y && te)
            )
              t: {
                for (ne = Y, j = te, A = 0, M = ne; M; M = Gr(M)) A++;
                for (M = 0, G = j; G; G = Gr(G)) M++;
                for (; 0 < A - M; ) (ne = Gr(ne)), A--;
                for (; 0 < M - A; ) (j = Gr(j)), M--;
                for (; A--; ) {
                  if (ne === j || (j !== null && ne === j.alternate)) break t;
                  (ne = Gr(ne)), (j = Gr(j));
                }
                ne = null;
              }
            else ne = null;
            Y !== null && oh(K, H, Y, ne, !1), te !== null && He !== null && oh(K, He, te, ne, !0);
          }
        }
        e: {
          if (
            ((H = $ ? Jr($) : window),
            (Y = H.nodeName && H.nodeName.toLowerCase()),
            Y === 'select' || (Y === 'input' && H.type === 'file'))
          )
            var re = n0;
          else if (Fd(H))
            if (Bd) re = o0;
            else {
              re = s0;
              var ie = r0;
            }
          else
            (Y = H.nodeName) &&
              Y.toLowerCase() === 'input' &&
              (H.type === 'checkbox' || H.type === 'radio') &&
              (re = i0);
          if (re && (re = re(r, $))) {
            zd(K, re, a, V);
            break e;
          }
          ie && ie(r, H, $),
            r === 'focusout' &&
              (ie = H._wrapperState) &&
              ie.controlled &&
              H.type === 'number' &&
              Fr(H, 'number', H.value);
        }
        switch (((ie = $ ? Jr($) : window), r)) {
          case 'focusin':
            (Fd(ie) || ie.contentEditable === 'true') && ((Kr = ie), (Xa = $), (fi = null));
            break;
          case 'focusout':
            fi = Xa = Kr = null;
            break;
          case 'mousedown':
            Ja = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            (Ja = !1), Gd(K, a, V);
            break;
          case 'selectionchange':
            if (c0) break;
          case 'keydown':
          case 'keyup':
            Gd(K, a, V);
        }
        var oe;
        if (Wa)
          e: {
            switch (r) {
              case 'compositionstart':
                var ce = 'onCompositionStart';
                break e;
              case 'compositionend':
                ce = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                ce = 'onCompositionUpdate';
                break e;
            }
            ce = void 0;
          }
        else
          Wr
            ? Rd(r, a) && (ce = 'onCompositionEnd')
            : r === 'keydown' && a.keyCode === 229 && (ce = 'onCompositionStart');
        ce &&
          (Md &&
            a.locale !== 'ko' &&
            (Wr || ce !== 'onCompositionStart'
              ? ce === 'onCompositionEnd' && Wr && (oe = Ad())
              : ((Bn = V), (za = 'value' in Bn ? Bn.value : Bn.textContent), (Wr = !0))),
          (ie = Co($, ce)),
          0 < ie.length &&
            ((ce = new Id(ce, r, null, a, V)),
            K.push({ event: ce, listeners: ie }),
            oe ? (ce.data = oe) : ((oe = Dd(a)), oe !== null && (ce.data = oe)))),
          (oe = Jw ? Yw(r, a) : Zw(r, a)) &&
            (($ = Co($, 'onBeforeInput')),
            0 < $.length &&
              ((V = new Id('onBeforeInput', 'beforeinput', null, a, V)),
              K.push({ event: V, listeners: $ }),
              (V.data = oe)));
      }
      sh(K, i);
    });
  }
  function pi(r, i, a) {
    return { instance: r, listener: i, currentTarget: a };
  }
  function Co(r, i) {
    for (var a = i + 'Capture', f = []; r !== null; ) {
      var p = r,
        g = p.stateNode;
      p.tag === 5 &&
        g !== null &&
        ((p = g),
        (g = Gs(r, a)),
        g != null && f.unshift(pi(r, g, p)),
        (g = Gs(r, i)),
        g != null && f.push(pi(r, g, p))),
        (r = r.return);
    }
    return f;
  }
  function Gr(r) {
    if (r === null) return null;
    do r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function oh(r, i, a, f, p) {
    for (var g = i._reactName, k = []; a !== null && a !== f; ) {
      var E = a,
        N = E.alternate,
        $ = E.stateNode;
      if (N !== null && N === f) break;
      E.tag === 5 &&
        $ !== null &&
        ((E = $),
        p
          ? ((N = Gs(a, g)), N != null && k.unshift(pi(a, N, E)))
          : p || ((N = Gs(a, g)), N != null && k.push(pi(a, N, E)))),
        (a = a.return);
    }
    k.length !== 0 && r.push({ event: i, listeners: k });
  }
  var h0 = /\r\n?/g,
    p0 = /\u0000|\uFFFD/g;
  function lh(r) {
    return (typeof r == 'string' ? r : '' + r)
      .replace(
        h0,
        `
`
      )
      .replace(p0, '');
  }
  function Ao(r, i, a) {
    if (((i = lh(i)), lh(r) !== i && a)) throw Error(n(425));
  }
  function Lo() {}
  var rc = null,
    sc = null;
  function ic(r, i) {
    return (
      r === 'textarea' ||
      r === 'noscript' ||
      typeof i.children == 'string' ||
      typeof i.children == 'number' ||
      (typeof i.dangerouslySetInnerHTML == 'object' &&
        i.dangerouslySetInnerHTML !== null &&
        i.dangerouslySetInnerHTML.__html != null)
    );
  }
  var oc = typeof setTimeout == 'function' ? setTimeout : void 0,
    m0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    ah = typeof Promise == 'function' ? Promise : void 0,
    g0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof ah < 'u'
          ? function (r) {
              return ah.resolve(null).then(r).catch(y0);
            }
          : oc;
  function y0(r) {
    setTimeout(function () {
      throw r;
    });
  }
  function lc(r, i) {
    var a = i,
      f = 0;
    do {
      var p = a.nextSibling;
      if ((r.removeChild(a), p && p.nodeType === 8))
        if (((a = p.data), a === '/$')) {
          if (f === 0) {
            r.removeChild(p), si(i);
            return;
          }
          f--;
        } else (a !== '$' && a !== '$?' && a !== '$!') || f++;
      a = p;
    } while (a);
    si(i);
  }
  function qn(r) {
    for (; r != null; r = r.nextSibling) {
      var i = r.nodeType;
      if (i === 1 || i === 3) break;
      if (i === 8) {
        if (((i = r.data), i === '$' || i === '$!' || i === '$?')) break;
        if (i === '/$') return null;
      }
    }
    return r;
  }
  function ch(r) {
    r = r.previousSibling;
    for (var i = 0; r; ) {
      if (r.nodeType === 8) {
        var a = r.data;
        if (a === '$' || a === '$!' || a === '$?') {
          if (i === 0) return r;
          i--;
        } else a === '/$' && i++;
      }
      r = r.previousSibling;
    }
    return null;
  }
  var Xr = Math.random().toString(36).slice(2),
    fn = '__reactFiber$' + Xr,
    mi = '__reactProps$' + Xr,
    wn = '__reactContainer$' + Xr,
    ac = '__reactEvents$' + Xr,
    v0 = '__reactListeners$' + Xr,
    w0 = '__reactHandles$' + Xr;
  function hr(r) {
    var i = r[fn];
    if (i) return i;
    for (var a = r.parentNode; a; ) {
      if ((i = a[wn] || a[fn])) {
        if (((a = i.alternate), i.child !== null || (a !== null && a.child !== null)))
          for (r = ch(r); r !== null; ) {
            if ((a = r[fn])) return a;
            r = ch(r);
          }
        return i;
      }
      (r = a), (a = r.parentNode);
    }
    return null;
  }
  function gi(r) {
    return (
      (r = r[fn] || r[wn]),
      !r || (r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3) ? null : r
    );
  }
  function Jr(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(n(33));
  }
  function jo(r) {
    return r[mi] || null;
  }
  var cc = [],
    Yr = -1;
  function Hn(r) {
    return { current: r };
  }
  function Ie(r) {
    0 > Yr || ((r.current = cc[Yr]), (cc[Yr] = null), Yr--);
  }
  function Ae(r, i) {
    Yr++, (cc[Yr] = r.current), (r.current = i);
  }
  var Vn = {},
    st = Hn(Vn),
    xt = Hn(!1),
    pr = Vn;
  function Zr(r, i) {
    var a = r.type.contextTypes;
    if (!a) return Vn;
    var f = r.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === i)
      return f.__reactInternalMemoizedMaskedChildContext;
    var p = {},
      g;
    for (g in a) p[g] = i[g];
    return (
      f &&
        ((r = r.stateNode),
        (r.__reactInternalMemoizedUnmaskedChildContext = i),
        (r.__reactInternalMemoizedMaskedChildContext = p)),
      p
    );
  }
  function St(r) {
    return (r = r.childContextTypes), r != null;
  }
  function Io() {
    Ie(xt), Ie(st);
  }
  function uh(r, i, a) {
    if (st.current !== Vn) throw Error(n(168));
    Ae(st, i), Ae(xt, a);
  }
  function fh(r, i, a) {
    var f = r.stateNode;
    if (((i = i.childContextTypes), typeof f.getChildContext != 'function')) return a;
    f = f.getChildContext();
    for (var p in f) if (!(p in i)) throw Error(n(108, pe(r) || 'Unknown', p));
    return Z({}, a, f);
  }
  function Oo(r) {
    return (
      (r = ((r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext) || Vn),
      (pr = st.current),
      Ae(st, r),
      Ae(xt, xt.current),
      !0
    );
  }
  function dh(r, i, a) {
    var f = r.stateNode;
    if (!f) throw Error(n(169));
    a
      ? ((r = fh(r, i, pr)),
        (f.__reactInternalMemoizedMergedChildContext = r),
        Ie(xt),
        Ie(st),
        Ae(st, r))
      : Ie(xt),
      Ae(xt, a);
  }
  var xn = null,
    Mo = !1,
    uc = !1;
  function hh(r) {
    xn === null ? (xn = [r]) : xn.push(r);
  }
  function x0(r) {
    (Mo = !0), hh(r);
  }
  function Wn() {
    if (!uc && xn !== null) {
      uc = !0;
      var r = 0,
        i = Ee;
      try {
        var a = xn;
        for (Ee = 1; r < a.length; r++) {
          var f = a[r];
          do f = f(!0);
          while (f !== null);
        }
        (xn = null), (Mo = !1);
      } catch (p) {
        throw (xn !== null && (xn = xn.slice(r + 1)), md(Ia, Wn), p);
      } finally {
        (Ee = i), (uc = !1);
      }
    }
    return null;
  }
  var es = [],
    ts = 0,
    $o = null,
    Po = 0,
    Ft = [],
    zt = 0,
    mr = null,
    Sn = 1,
    _n = '';
  function gr(r, i) {
    (es[ts++] = Po), (es[ts++] = $o), ($o = r), (Po = i);
  }
  function ph(r, i, a) {
    (Ft[zt++] = Sn), (Ft[zt++] = _n), (Ft[zt++] = mr), (mr = r);
    var f = Sn;
    r = _n;
    var p = 32 - Yt(f) - 1;
    (f &= ~(1 << p)), (a += 1);
    var g = 32 - Yt(i) + p;
    if (30 < g) {
      var k = p - (p % 5);
      (g = (f & ((1 << k) - 1)).toString(32)),
        (f >>= k),
        (p -= k),
        (Sn = (1 << (32 - Yt(i) + p)) | (a << p) | f),
        (_n = g + r);
    } else (Sn = (1 << g) | (a << p) | f), (_n = r);
  }
  function fc(r) {
    r.return !== null && (gr(r, 1), ph(r, 1, 0));
  }
  function dc(r) {
    for (; r === $o; ) ($o = es[--ts]), (es[ts] = null), (Po = es[--ts]), (es[ts] = null);
    for (; r === mr; )
      (mr = Ft[--zt]),
        (Ft[zt] = null),
        (_n = Ft[--zt]),
        (Ft[zt] = null),
        (Sn = Ft[--zt]),
        (Ft[zt] = null);
  }
  var Ot = null,
    Mt = null,
    Oe = !1,
    en = null;
  function mh(r, i) {
    var a = Ht(5, null, null, 0);
    (a.elementType = 'DELETED'),
      (a.stateNode = i),
      (a.return = r),
      (i = r.deletions),
      i === null ? ((r.deletions = [a]), (r.flags |= 16)) : i.push(a);
  }
  function gh(r, i) {
    switch (r.tag) {
      case 5:
        var a = r.type;
        return (
          (i = i.nodeType !== 1 || a.toLowerCase() !== i.nodeName.toLowerCase() ? null : i),
          i !== null ? ((r.stateNode = i), (Ot = r), (Mt = qn(i.firstChild)), !0) : !1
        );
      case 6:
        return (
          (i = r.pendingProps === '' || i.nodeType !== 3 ? null : i),
          i !== null ? ((r.stateNode = i), (Ot = r), (Mt = null), !0) : !1
        );
      case 13:
        return (
          (i = i.nodeType !== 8 ? null : i),
          i !== null
            ? ((a = mr !== null ? { id: Sn, overflow: _n } : null),
              (r.memoizedState = { dehydrated: i, treeContext: a, retryLane: 1073741824 }),
              (a = Ht(18, null, null, 0)),
              (a.stateNode = i),
              (a.return = r),
              (r.child = a),
              (Ot = r),
              (Mt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function hc(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function pc(r) {
    if (Oe) {
      var i = Mt;
      if (i) {
        var a = i;
        if (!gh(r, i)) {
          if (hc(r)) throw Error(n(418));
          i = qn(a.nextSibling);
          var f = Ot;
          i && gh(r, i) ? mh(f, a) : ((r.flags = (r.flags & -4097) | 2), (Oe = !1), (Ot = r));
        }
      } else {
        if (hc(r)) throw Error(n(418));
        (r.flags = (r.flags & -4097) | 2), (Oe = !1), (Ot = r);
      }
    }
  }
  function yh(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    Ot = r;
  }
  function Ro(r) {
    if (r !== Ot) return !1;
    if (!Oe) return yh(r), (Oe = !0), !1;
    var i;
    if (
      ((i = r.tag !== 3) &&
        !(i = r.tag !== 5) &&
        ((i = r.type), (i = i !== 'head' && i !== 'body' && !ic(r.type, r.memoizedProps))),
      i && (i = Mt))
    ) {
      if (hc(r)) throw (vh(), Error(n(418)));
      for (; i; ) mh(r, i), (i = qn(i.nextSibling));
    }
    if ((yh(r), r.tag === 13)) {
      if (((r = r.memoizedState), (r = r !== null ? r.dehydrated : null), !r)) throw Error(n(317));
      e: {
        for (r = r.nextSibling, i = 0; r; ) {
          if (r.nodeType === 8) {
            var a = r.data;
            if (a === '/$') {
              if (i === 0) {
                Mt = qn(r.nextSibling);
                break e;
              }
              i--;
            } else (a !== '$' && a !== '$!' && a !== '$?') || i++;
          }
          r = r.nextSibling;
        }
        Mt = null;
      }
    } else Mt = Ot ? qn(r.stateNode.nextSibling) : null;
    return !0;
  }
  function vh() {
    for (var r = Mt; r; ) r = qn(r.nextSibling);
  }
  function ns() {
    (Mt = Ot = null), (Oe = !1);
  }
  function mc(r) {
    en === null ? (en = [r]) : en.push(r);
  }
  var S0 = R.ReactCurrentBatchConfig;
  function yi(r, i, a) {
    if (((r = a.ref), r !== null && typeof r != 'function' && typeof r != 'object')) {
      if (a._owner) {
        if (((a = a._owner), a)) {
          if (a.tag !== 1) throw Error(n(309));
          var f = a.stateNode;
        }
        if (!f) throw Error(n(147, r));
        var p = f,
          g = '' + r;
        return i !== null && i.ref !== null && typeof i.ref == 'function' && i.ref._stringRef === g
          ? i.ref
          : ((i = function (k) {
              var E = p.refs;
              k === null ? delete E[g] : (E[g] = k);
            }),
            (i._stringRef = g),
            i);
      }
      if (typeof r != 'string') throw Error(n(284));
      if (!a._owner) throw Error(n(290, r));
    }
    return r;
  }
  function Do(r, i) {
    throw (
      ((r = Object.prototype.toString.call(i)),
      Error(
        n(31, r === '[object Object]' ? 'object with keys {' + Object.keys(i).join(', ') + '}' : r)
      ))
    );
  }
  function wh(r) {
    var i = r._init;
    return i(r._payload);
  }
  function xh(r) {
    function i(j, A) {
      if (r) {
        var M = j.deletions;
        M === null ? ((j.deletions = [A]), (j.flags |= 16)) : M.push(A);
      }
    }
    function a(j, A) {
      if (!r) return null;
      for (; A !== null; ) i(j, A), (A = A.sibling);
      return null;
    }
    function f(j, A) {
      for (j = new Map(); A !== null; )
        A.key !== null ? j.set(A.key, A) : j.set(A.index, A), (A = A.sibling);
      return j;
    }
    function p(j, A) {
      return (j = er(j, A)), (j.index = 0), (j.sibling = null), j;
    }
    function g(j, A, M) {
      return (
        (j.index = M),
        r
          ? ((M = j.alternate),
            M !== null ? ((M = M.index), M < A ? ((j.flags |= 2), A) : M) : ((j.flags |= 2), A))
          : ((j.flags |= 1048576), A)
      );
    }
    function k(j) {
      return r && j.alternate === null && (j.flags |= 2), j;
    }
    function E(j, A, M, G) {
      return A === null || A.tag !== 6
        ? ((A = ou(M, j.mode, G)), (A.return = j), A)
        : ((A = p(A, M)), (A.return = j), A);
    }
    function N(j, A, M, G) {
      var re = M.type;
      return re === U
        ? V(j, A, M.props.children, G, M.key)
        : A !== null &&
            (A.elementType === re ||
              (typeof re == 'object' && re !== null && re.$$typeof === Le && wh(re) === A.type))
          ? ((G = p(A, M.props)), (G.ref = yi(j, A, M)), (G.return = j), G)
          : ((G = al(M.type, M.key, M.props, null, j.mode, G)),
            (G.ref = yi(j, A, M)),
            (G.return = j),
            G);
    }
    function $(j, A, M, G) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== M.containerInfo ||
        A.stateNode.implementation !== M.implementation
        ? ((A = lu(M, j.mode, G)), (A.return = j), A)
        : ((A = p(A, M.children || [])), (A.return = j), A);
    }
    function V(j, A, M, G, re) {
      return A === null || A.tag !== 7
        ? ((A = br(M, j.mode, G, re)), (A.return = j), A)
        : ((A = p(A, M)), (A.return = j), A);
    }
    function K(j, A, M) {
      if ((typeof A == 'string' && A !== '') || typeof A == 'number')
        return (A = ou('' + A, j.mode, M)), (A.return = j), A;
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case D:
            return (
              (M = al(A.type, A.key, A.props, null, j.mode, M)),
              (M.ref = yi(j, null, A)),
              (M.return = j),
              M
            );
          case F:
            return (A = lu(A, j.mode, M)), (A.return = j), A;
          case Le:
            var G = A._init;
            return K(j, G(A._payload), M);
        }
        if (vn(A) || se(A)) return (A = br(A, j.mode, M, null)), (A.return = j), A;
        Do(j, A);
      }
      return null;
    }
    function H(j, A, M, G) {
      var re = A !== null ? A.key : null;
      if ((typeof M == 'string' && M !== '') || typeof M == 'number')
        return re !== null ? null : E(j, A, '' + M, G);
      if (typeof M == 'object' && M !== null) {
        switch (M.$$typeof) {
          case D:
            return M.key === re ? N(j, A, M, G) : null;
          case F:
            return M.key === re ? $(j, A, M, G) : null;
          case Le:
            return (re = M._init), H(j, A, re(M._payload), G);
        }
        if (vn(M) || se(M)) return re !== null ? null : V(j, A, M, G, null);
        Do(j, M);
      }
      return null;
    }
    function Y(j, A, M, G, re) {
      if ((typeof G == 'string' && G !== '') || typeof G == 'number')
        return (j = j.get(M) || null), E(A, j, '' + G, re);
      if (typeof G == 'object' && G !== null) {
        switch (G.$$typeof) {
          case D:
            return (j = j.get(G.key === null ? M : G.key) || null), N(A, j, G, re);
          case F:
            return (j = j.get(G.key === null ? M : G.key) || null), $(A, j, G, re);
          case Le:
            var ie = G._init;
            return Y(j, A, M, ie(G._payload), re);
        }
        if (vn(G) || se(G)) return (j = j.get(M) || null), V(A, j, G, re, null);
        Do(A, G);
      }
      return null;
    }
    function te(j, A, M, G) {
      for (
        var re = null, ie = null, oe = A, ce = (A = 0), Ze = null;
        oe !== null && ce < M.length;
        ce++
      ) {
        oe.index > ce ? ((Ze = oe), (oe = null)) : (Ze = oe.sibling);
        var _e = H(j, oe, M[ce], G);
        if (_e === null) {
          oe === null && (oe = Ze);
          break;
        }
        r && oe && _e.alternate === null && i(j, oe),
          (A = g(_e, A, ce)),
          ie === null ? (re = _e) : (ie.sibling = _e),
          (ie = _e),
          (oe = Ze);
      }
      if (ce === M.length) return a(j, oe), Oe && gr(j, ce), re;
      if (oe === null) {
        for (; ce < M.length; ce++)
          (oe = K(j, M[ce], G)),
            oe !== null &&
              ((A = g(oe, A, ce)), ie === null ? (re = oe) : (ie.sibling = oe), (ie = oe));
        return Oe && gr(j, ce), re;
      }
      for (oe = f(j, oe); ce < M.length; ce++)
        (Ze = Y(oe, j, ce, M[ce], G)),
          Ze !== null &&
            (r && Ze.alternate !== null && oe.delete(Ze.key === null ? ce : Ze.key),
            (A = g(Ze, A, ce)),
            ie === null ? (re = Ze) : (ie.sibling = Ze),
            (ie = Ze));
      return (
        r &&
          oe.forEach(function (tr) {
            return i(j, tr);
          }),
        Oe && gr(j, ce),
        re
      );
    }
    function ne(j, A, M, G) {
      var re = se(M);
      if (typeof re != 'function') throw Error(n(150));
      if (((M = re.call(M)), M == null)) throw Error(n(151));
      for (
        var ie = (re = null), oe = A, ce = (A = 0), Ze = null, _e = M.next();
        oe !== null && !_e.done;
        ce++, _e = M.next()
      ) {
        oe.index > ce ? ((Ze = oe), (oe = null)) : (Ze = oe.sibling);
        var tr = H(j, oe, _e.value, G);
        if (tr === null) {
          oe === null && (oe = Ze);
          break;
        }
        r && oe && tr.alternate === null && i(j, oe),
          (A = g(tr, A, ce)),
          ie === null ? (re = tr) : (ie.sibling = tr),
          (ie = tr),
          (oe = Ze);
      }
      if (_e.done) return a(j, oe), Oe && gr(j, ce), re;
      if (oe === null) {
        for (; !_e.done; ce++, _e = M.next())
          (_e = K(j, _e.value, G)),
            _e !== null &&
              ((A = g(_e, A, ce)), ie === null ? (re = _e) : (ie.sibling = _e), (ie = _e));
        return Oe && gr(j, ce), re;
      }
      for (oe = f(j, oe); !_e.done; ce++, _e = M.next())
        (_e = Y(oe, j, ce, _e.value, G)),
          _e !== null &&
            (r && _e.alternate !== null && oe.delete(_e.key === null ? ce : _e.key),
            (A = g(_e, A, ce)),
            ie === null ? (re = _e) : (ie.sibling = _e),
            (ie = _e));
      return (
        r &&
          oe.forEach(function (ex) {
            return i(j, ex);
          }),
        Oe && gr(j, ce),
        re
      );
    }
    function He(j, A, M, G) {
      if (
        (typeof M == 'object' &&
          M !== null &&
          M.type === U &&
          M.key === null &&
          (M = M.props.children),
        typeof M == 'object' && M !== null)
      ) {
        switch (M.$$typeof) {
          case D:
            e: {
              for (var re = M.key, ie = A; ie !== null; ) {
                if (ie.key === re) {
                  if (((re = M.type), re === U)) {
                    if (ie.tag === 7) {
                      a(j, ie.sibling), (A = p(ie, M.props.children)), (A.return = j), (j = A);
                      break e;
                    }
                  } else if (
                    ie.elementType === re ||
                    (typeof re == 'object' &&
                      re !== null &&
                      re.$$typeof === Le &&
                      wh(re) === ie.type)
                  ) {
                    a(j, ie.sibling),
                      (A = p(ie, M.props)),
                      (A.ref = yi(j, ie, M)),
                      (A.return = j),
                      (j = A);
                    break e;
                  }
                  a(j, ie);
                  break;
                } else i(j, ie);
                ie = ie.sibling;
              }
              M.type === U
                ? ((A = br(M.props.children, j.mode, G, M.key)), (A.return = j), (j = A))
                : ((G = al(M.type, M.key, M.props, null, j.mode, G)),
                  (G.ref = yi(j, A, M)),
                  (G.return = j),
                  (j = G));
            }
            return k(j);
          case F:
            e: {
              for (ie = M.key; A !== null; ) {
                if (A.key === ie)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === M.containerInfo &&
                    A.stateNode.implementation === M.implementation
                  ) {
                    a(j, A.sibling), (A = p(A, M.children || [])), (A.return = j), (j = A);
                    break e;
                  } else {
                    a(j, A);
                    break;
                  }
                else i(j, A);
                A = A.sibling;
              }
              (A = lu(M, j.mode, G)), (A.return = j), (j = A);
            }
            return k(j);
          case Le:
            return (ie = M._init), He(j, A, ie(M._payload), G);
        }
        if (vn(M)) return te(j, A, M, G);
        if (se(M)) return ne(j, A, M, G);
        Do(j, M);
      }
      return (typeof M == 'string' && M !== '') || typeof M == 'number'
        ? ((M = '' + M),
          A !== null && A.tag === 6
            ? (a(j, A.sibling), (A = p(A, M)), (A.return = j), (j = A))
            : (a(j, A), (A = ou(M, j.mode, G)), (A.return = j), (j = A)),
          k(j))
        : a(j, A);
    }
    return He;
  }
  var rs = xh(!0),
    Sh = xh(!1),
    Fo = Hn(null),
    zo = null,
    ss = null,
    gc = null;
  function yc() {
    gc = ss = zo = null;
  }
  function vc(r) {
    var i = Fo.current;
    Ie(Fo), (r._currentValue = i);
  }
  function wc(r, i, a) {
    for (; r !== null; ) {
      var f = r.alternate;
      if (
        ((r.childLanes & i) !== i
          ? ((r.childLanes |= i), f !== null && (f.childLanes |= i))
          : f !== null && (f.childLanes & i) !== i && (f.childLanes |= i),
        r === a)
      )
        break;
      r = r.return;
    }
  }
  function is(r, i) {
    (zo = r),
      (gc = ss = null),
      (r = r.dependencies),
      r !== null &&
        r.firstContext !== null &&
        ((r.lanes & i) !== 0 && (_t = !0), (r.firstContext = null));
  }
  function Bt(r) {
    var i = r._currentValue;
    if (gc !== r)
      if (((r = { context: r, memoizedValue: i, next: null }), ss === null)) {
        if (zo === null) throw Error(n(308));
        (ss = r), (zo.dependencies = { lanes: 0, firstContext: r });
      } else ss = ss.next = r;
    return i;
  }
  var yr = null;
  function xc(r) {
    yr === null ? (yr = [r]) : yr.push(r);
  }
  function _h(r, i, a, f) {
    var p = i.interleaved;
    return (
      p === null ? ((a.next = a), xc(i)) : ((a.next = p.next), (p.next = a)),
      (i.interleaved = a),
      kn(r, f)
    );
  }
  function kn(r, i) {
    r.lanes |= i;
    var a = r.alternate;
    for (a !== null && (a.lanes |= i), a = r, r = r.return; r !== null; )
      (r.childLanes |= i),
        (a = r.alternate),
        a !== null && (a.childLanes |= i),
        (a = r),
        (r = r.return);
    return a.tag === 3 ? a.stateNode : null;
  }
  var Kn = !1;
  function Sc(r) {
    r.updateQueue = {
      baseState: r.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function kh(r, i) {
    (r = r.updateQueue),
      i.updateQueue === r &&
        (i.updateQueue = {
          baseState: r.baseState,
          firstBaseUpdate: r.firstBaseUpdate,
          lastBaseUpdate: r.lastBaseUpdate,
          shared: r.shared,
          effects: r.effects,
        });
  }
  function bn(r, i) {
    return { eventTime: r, lane: i, tag: 0, payload: null, callback: null, next: null };
  }
  function Qn(r, i, a) {
    var f = r.updateQueue;
    if (f === null) return null;
    if (((f = f.shared), (we & 2) !== 0)) {
      var p = f.pending;
      return (
        p === null ? (i.next = i) : ((i.next = p.next), (p.next = i)), (f.pending = i), kn(r, a)
      );
    }
    return (
      (p = f.interleaved),
      p === null ? ((i.next = i), xc(f)) : ((i.next = p.next), (p.next = i)),
      (f.interleaved = i),
      kn(r, a)
    );
  }
  function Bo(r, i, a) {
    if (((i = i.updateQueue), i !== null && ((i = i.shared), (a & 4194240) !== 0))) {
      var f = i.lanes;
      (f &= r.pendingLanes), (a |= f), (i.lanes = a), $a(r, a);
    }
  }
  function bh(r, i) {
    var a = r.updateQueue,
      f = r.alternate;
    if (f !== null && ((f = f.updateQueue), a === f)) {
      var p = null,
        g = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var k = {
            eventTime: a.eventTime,
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: a.callback,
            next: null,
          };
          g === null ? (p = g = k) : (g = g.next = k), (a = a.next);
        } while (a !== null);
        g === null ? (p = g = i) : (g = g.next = i);
      } else p = g = i;
      (a = {
        baseState: f.baseState,
        firstBaseUpdate: p,
        lastBaseUpdate: g,
        shared: f.shared,
        effects: f.effects,
      }),
        (r.updateQueue = a);
      return;
    }
    (r = a.lastBaseUpdate),
      r === null ? (a.firstBaseUpdate = i) : (r.next = i),
      (a.lastBaseUpdate = i);
  }
  function Uo(r, i, a, f) {
    var p = r.updateQueue;
    Kn = !1;
    var g = p.firstBaseUpdate,
      k = p.lastBaseUpdate,
      E = p.shared.pending;
    if (E !== null) {
      p.shared.pending = null;
      var N = E,
        $ = N.next;
      (N.next = null), k === null ? (g = $) : (k.next = $), (k = N);
      var V = r.alternate;
      V !== null &&
        ((V = V.updateQueue),
        (E = V.lastBaseUpdate),
        E !== k && (E === null ? (V.firstBaseUpdate = $) : (E.next = $), (V.lastBaseUpdate = N)));
    }
    if (g !== null) {
      var K = p.baseState;
      (k = 0), (V = $ = N = null), (E = g);
      do {
        var H = E.lane,
          Y = E.eventTime;
        if ((f & H) === H) {
          V !== null &&
            (V = V.next =
              {
                eventTime: Y,
                lane: 0,
                tag: E.tag,
                payload: E.payload,
                callback: E.callback,
                next: null,
              });
          e: {
            var te = r,
              ne = E;
            switch (((H = i), (Y = a), ne.tag)) {
              case 1:
                if (((te = ne.payload), typeof te == 'function')) {
                  K = te.call(Y, K, H);
                  break e;
                }
                K = te;
                break e;
              case 3:
                te.flags = (te.flags & -65537) | 128;
              case 0:
                if (
                  ((te = ne.payload),
                  (H = typeof te == 'function' ? te.call(Y, K, H) : te),
                  H == null)
                )
                  break e;
                K = Z({}, K, H);
                break e;
              case 2:
                Kn = !0;
            }
          }
          E.callback !== null &&
            E.lane !== 0 &&
            ((r.flags |= 64), (H = p.effects), H === null ? (p.effects = [E]) : H.push(E));
        } else
          (Y = {
            eventTime: Y,
            lane: H,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null,
          }),
            V === null ? (($ = V = Y), (N = K)) : (V = V.next = Y),
            (k |= H);
        if (((E = E.next), E === null)) {
          if (((E = p.shared.pending), E === null)) break;
          (H = E), (E = H.next), (H.next = null), (p.lastBaseUpdate = H), (p.shared.pending = null);
        }
      } while (!0);
      if (
        (V === null && (N = K),
        (p.baseState = N),
        (p.firstBaseUpdate = $),
        (p.lastBaseUpdate = V),
        (i = p.shared.interleaved),
        i !== null)
      ) {
        p = i;
        do (k |= p.lane), (p = p.next);
        while (p !== i);
      } else g === null && (p.shared.lanes = 0);
      (xr |= k), (r.lanes = k), (r.memoizedState = K);
    }
  }
  function Eh(r, i, a) {
    if (((r = i.effects), (i.effects = null), r !== null))
      for (i = 0; i < r.length; i++) {
        var f = r[i],
          p = f.callback;
        if (p !== null) {
          if (((f.callback = null), (f = a), typeof p != 'function')) throw Error(n(191, p));
          p.call(f);
        }
      }
  }
  var vi = {},
    dn = Hn(vi),
    wi = Hn(vi),
    xi = Hn(vi);
  function vr(r) {
    if (r === vi) throw Error(n(174));
    return r;
  }
  function _c(r, i) {
    switch ((Ae(xi, i), Ae(wi, r), Ae(dn, vi), (r = i.nodeType), r)) {
      case 9:
      case 11:
        i = (i = i.documentElement) ? i.namespaceURI : Ks(null, '');
        break;
      default:
        (r = r === 8 ? i.parentNode : i),
          (i = r.namespaceURI || null),
          (r = r.tagName),
          (i = Ks(i, r));
    }
    Ie(dn), Ae(dn, i);
  }
  function os() {
    Ie(dn), Ie(wi), Ie(xi);
  }
  function Th(r) {
    vr(xi.current);
    var i = vr(dn.current),
      a = Ks(i, r.type);
    i !== a && (Ae(wi, r), Ae(dn, a));
  }
  function kc(r) {
    wi.current === r && (Ie(dn), Ie(wi));
  }
  var Pe = Hn(0);
  function qo(r) {
    for (var i = r; i !== null; ) {
      if (i.tag === 13) {
        var a = i.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || a.data === '$?' || a.data === '$!'))
          return i;
      } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
        if ((i.flags & 128) !== 0) return i;
      } else if (i.child !== null) {
        (i.child.return = i), (i = i.child);
        continue;
      }
      if (i === r) break;
      for (; i.sibling === null; ) {
        if (i.return === null || i.return === r) return null;
        i = i.return;
      }
      (i.sibling.return = i.return), (i = i.sibling);
    }
    return null;
  }
  var bc = [];
  function Ec() {
    for (var r = 0; r < bc.length; r++) bc[r]._workInProgressVersionPrimary = null;
    bc.length = 0;
  }
  var Ho = R.ReactCurrentDispatcher,
    Tc = R.ReactCurrentBatchConfig,
    wr = 0,
    Re = null,
    Qe = null,
    Je = null,
    Vo = !1,
    Si = !1,
    _i = 0,
    _0 = 0;
  function it() {
    throw Error(n(321));
  }
  function Nc(r, i) {
    if (i === null) return !1;
    for (var a = 0; a < i.length && a < r.length; a++) if (!Zt(r[a], i[a])) return !1;
    return !0;
  }
  function Cc(r, i, a, f, p, g) {
    if (
      ((wr = g),
      (Re = i),
      (i.memoizedState = null),
      (i.updateQueue = null),
      (i.lanes = 0),
      (Ho.current = r === null || r.memoizedState === null ? T0 : N0),
      (r = a(f, p)),
      Si)
    ) {
      g = 0;
      do {
        if (((Si = !1), (_i = 0), 25 <= g)) throw Error(n(301));
        (g += 1), (Je = Qe = null), (i.updateQueue = null), (Ho.current = C0), (r = a(f, p));
      } while (Si);
    }
    if (
      ((Ho.current = Qo),
      (i = Qe !== null && Qe.next !== null),
      (wr = 0),
      (Je = Qe = Re = null),
      (Vo = !1),
      i)
    )
      throw Error(n(300));
    return r;
  }
  function Ac() {
    var r = _i !== 0;
    return (_i = 0), r;
  }
  function hn() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Je === null ? (Re.memoizedState = Je = r) : (Je = Je.next = r), Je;
  }
  function Ut() {
    if (Qe === null) {
      var r = Re.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = Qe.next;
    var i = Je === null ? Re.memoizedState : Je.next;
    if (i !== null) (Je = i), (Qe = r);
    else {
      if (r === null) throw Error(n(310));
      (Qe = r),
        (r = {
          memoizedState: Qe.memoizedState,
          baseState: Qe.baseState,
          baseQueue: Qe.baseQueue,
          queue: Qe.queue,
          next: null,
        }),
        Je === null ? (Re.memoizedState = Je = r) : (Je = Je.next = r);
    }
    return Je;
  }
  function ki(r, i) {
    return typeof i == 'function' ? i(r) : i;
  }
  function Lc(r) {
    var i = Ut(),
      a = i.queue;
    if (a === null) throw Error(n(311));
    a.lastRenderedReducer = r;
    var f = Qe,
      p = f.baseQueue,
      g = a.pending;
    if (g !== null) {
      if (p !== null) {
        var k = p.next;
        (p.next = g.next), (g.next = k);
      }
      (f.baseQueue = p = g), (a.pending = null);
    }
    if (p !== null) {
      (g = p.next), (f = f.baseState);
      var E = (k = null),
        N = null,
        $ = g;
      do {
        var V = $.lane;
        if ((wr & V) === V)
          N !== null &&
            (N = N.next =
              {
                lane: 0,
                action: $.action,
                hasEagerState: $.hasEagerState,
                eagerState: $.eagerState,
                next: null,
              }),
            (f = $.hasEagerState ? $.eagerState : r(f, $.action));
        else {
          var K = {
            lane: V,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null,
          };
          N === null ? ((E = N = K), (k = f)) : (N = N.next = K), (Re.lanes |= V), (xr |= V);
        }
        $ = $.next;
      } while ($ !== null && $ !== g);
      N === null ? (k = f) : (N.next = E),
        Zt(f, i.memoizedState) || (_t = !0),
        (i.memoizedState = f),
        (i.baseState = k),
        (i.baseQueue = N),
        (a.lastRenderedState = f);
    }
    if (((r = a.interleaved), r !== null)) {
      p = r;
      do (g = p.lane), (Re.lanes |= g), (xr |= g), (p = p.next);
      while (p !== r);
    } else p === null && (a.lanes = 0);
    return [i.memoizedState, a.dispatch];
  }
  function jc(r) {
    var i = Ut(),
      a = i.queue;
    if (a === null) throw Error(n(311));
    a.lastRenderedReducer = r;
    var f = a.dispatch,
      p = a.pending,
      g = i.memoizedState;
    if (p !== null) {
      a.pending = null;
      var k = (p = p.next);
      do (g = r(g, k.action)), (k = k.next);
      while (k !== p);
      Zt(g, i.memoizedState) || (_t = !0),
        (i.memoizedState = g),
        i.baseQueue === null && (i.baseState = g),
        (a.lastRenderedState = g);
    }
    return [g, f];
  }
  function Nh() {}
  function Ch(r, i) {
    var a = Re,
      f = Ut(),
      p = i(),
      g = !Zt(f.memoizedState, p);
    if (
      (g && ((f.memoizedState = p), (_t = !0)),
      (f = f.queue),
      Ic(jh.bind(null, a, f, r), [r]),
      f.getSnapshot !== i || g || (Je !== null && Je.memoizedState.tag & 1))
    ) {
      if (((a.flags |= 2048), bi(9, Lh.bind(null, a, f, p, i), void 0, null), Ye === null))
        throw Error(n(349));
      (wr & 30) !== 0 || Ah(a, i, p);
    }
    return p;
  }
  function Ah(r, i, a) {
    (r.flags |= 16384),
      (r = { getSnapshot: i, value: a }),
      (i = Re.updateQueue),
      i === null
        ? ((i = { lastEffect: null, stores: null }), (Re.updateQueue = i), (i.stores = [r]))
        : ((a = i.stores), a === null ? (i.stores = [r]) : a.push(r));
  }
  function Lh(r, i, a, f) {
    (i.value = a), (i.getSnapshot = f), Ih(i) && Oh(r);
  }
  function jh(r, i, a) {
    return a(function () {
      Ih(i) && Oh(r);
    });
  }
  function Ih(r) {
    var i = r.getSnapshot;
    r = r.value;
    try {
      var a = i();
      return !Zt(r, a);
    } catch {
      return !0;
    }
  }
  function Oh(r) {
    var i = kn(r, 1);
    i !== null && sn(i, r, 1, -1);
  }
  function Mh(r) {
    var i = hn();
    return (
      typeof r == 'function' && (r = r()),
      (i.memoizedState = i.baseState = r),
      (r = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ki,
        lastRenderedState: r,
      }),
      (i.queue = r),
      (r = r.dispatch = E0.bind(null, Re, r)),
      [i.memoizedState, r]
    );
  }
  function bi(r, i, a, f) {
    return (
      (r = { tag: r, create: i, destroy: a, deps: f, next: null }),
      (i = Re.updateQueue),
      i === null
        ? ((i = { lastEffect: null, stores: null }),
          (Re.updateQueue = i),
          (i.lastEffect = r.next = r))
        : ((a = i.lastEffect),
          a === null
            ? (i.lastEffect = r.next = r)
            : ((f = a.next), (a.next = r), (r.next = f), (i.lastEffect = r))),
      r
    );
  }
  function $h() {
    return Ut().memoizedState;
  }
  function Wo(r, i, a, f) {
    var p = hn();
    (Re.flags |= r), (p.memoizedState = bi(1 | i, a, void 0, f === void 0 ? null : f));
  }
  function Ko(r, i, a, f) {
    var p = Ut();
    f = f === void 0 ? null : f;
    var g = void 0;
    if (Qe !== null) {
      var k = Qe.memoizedState;
      if (((g = k.destroy), f !== null && Nc(f, k.deps))) {
        p.memoizedState = bi(i, a, g, f);
        return;
      }
    }
    (Re.flags |= r), (p.memoizedState = bi(1 | i, a, g, f));
  }
  function Ph(r, i) {
    return Wo(8390656, 8, r, i);
  }
  function Ic(r, i) {
    return Ko(2048, 8, r, i);
  }
  function Rh(r, i) {
    return Ko(4, 2, r, i);
  }
  function Dh(r, i) {
    return Ko(4, 4, r, i);
  }
  function Fh(r, i) {
    if (typeof i == 'function')
      return (
        (r = r()),
        i(r),
        function () {
          i(null);
        }
      );
    if (i != null)
      return (
        (r = r()),
        (i.current = r),
        function () {
          i.current = null;
        }
      );
  }
  function zh(r, i, a) {
    return (a = a != null ? a.concat([r]) : null), Ko(4, 4, Fh.bind(null, i, r), a);
  }
  function Oc() {}
  function Bh(r, i) {
    var a = Ut();
    i = i === void 0 ? null : i;
    var f = a.memoizedState;
    return f !== null && i !== null && Nc(i, f[1]) ? f[0] : ((a.memoizedState = [r, i]), r);
  }
  function Uh(r, i) {
    var a = Ut();
    i = i === void 0 ? null : i;
    var f = a.memoizedState;
    return f !== null && i !== null && Nc(i, f[1])
      ? f[0]
      : ((r = r()), (a.memoizedState = [r, i]), r);
  }
  function qh(r, i, a) {
    return (wr & 21) === 0
      ? (r.baseState && ((r.baseState = !1), (_t = !0)), (r.memoizedState = a))
      : (Zt(a, i) || ((a = wd()), (Re.lanes |= a), (xr |= a), (r.baseState = !0)), i);
  }
  function k0(r, i) {
    var a = Ee;
    (Ee = a !== 0 && 4 > a ? a : 4), r(!0);
    var f = Tc.transition;
    Tc.transition = {};
    try {
      r(!1), i();
    } finally {
      (Ee = a), (Tc.transition = f);
    }
  }
  function Hh() {
    return Ut().memoizedState;
  }
  function b0(r, i, a) {
    var f = Yn(r);
    if (((a = { lane: f, action: a, hasEagerState: !1, eagerState: null, next: null }), Vh(r)))
      Wh(i, a);
    else if (((a = _h(r, i, a, f)), a !== null)) {
      var p = ht();
      sn(a, r, f, p), Kh(a, i, f);
    }
  }
  function E0(r, i, a) {
    var f = Yn(r),
      p = { lane: f, action: a, hasEagerState: !1, eagerState: null, next: null };
    if (Vh(r)) Wh(i, p);
    else {
      var g = r.alternate;
      if (
        r.lanes === 0 &&
        (g === null || g.lanes === 0) &&
        ((g = i.lastRenderedReducer), g !== null)
      )
        try {
          var k = i.lastRenderedState,
            E = g(k, a);
          if (((p.hasEagerState = !0), (p.eagerState = E), Zt(E, k))) {
            var N = i.interleaved;
            N === null ? ((p.next = p), xc(i)) : ((p.next = N.next), (N.next = p)),
              (i.interleaved = p);
            return;
          }
        } catch {
        } finally {
        }
      (a = _h(r, i, p, f)), a !== null && ((p = ht()), sn(a, r, f, p), Kh(a, i, f));
    }
  }
  function Vh(r) {
    var i = r.alternate;
    return r === Re || (i !== null && i === Re);
  }
  function Wh(r, i) {
    Si = Vo = !0;
    var a = r.pending;
    a === null ? (i.next = i) : ((i.next = a.next), (a.next = i)), (r.pending = i);
  }
  function Kh(r, i, a) {
    if ((a & 4194240) !== 0) {
      var f = i.lanes;
      (f &= r.pendingLanes), (a |= f), (i.lanes = a), $a(r, a);
    }
  }
  var Qo = {
      readContext: Bt,
      useCallback: it,
      useContext: it,
      useEffect: it,
      useImperativeHandle: it,
      useInsertionEffect: it,
      useLayoutEffect: it,
      useMemo: it,
      useReducer: it,
      useRef: it,
      useState: it,
      useDebugValue: it,
      useDeferredValue: it,
      useTransition: it,
      useMutableSource: it,
      useSyncExternalStore: it,
      useId: it,
      unstable_isNewReconciler: !1,
    },
    T0 = {
      readContext: Bt,
      useCallback: function (r, i) {
        return (hn().memoizedState = [r, i === void 0 ? null : i]), r;
      },
      useContext: Bt,
      useEffect: Ph,
      useImperativeHandle: function (r, i, a) {
        return (a = a != null ? a.concat([r]) : null), Wo(4194308, 4, Fh.bind(null, i, r), a);
      },
      useLayoutEffect: function (r, i) {
        return Wo(4194308, 4, r, i);
      },
      useInsertionEffect: function (r, i) {
        return Wo(4, 2, r, i);
      },
      useMemo: function (r, i) {
        var a = hn();
        return (i = i === void 0 ? null : i), (r = r()), (a.memoizedState = [r, i]), r;
      },
      useReducer: function (r, i, a) {
        var f = hn();
        return (
          (i = a !== void 0 ? a(i) : i),
          (f.memoizedState = f.baseState = i),
          (r = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: r,
            lastRenderedState: i,
          }),
          (f.queue = r),
          (r = r.dispatch = b0.bind(null, Re, r)),
          [f.memoizedState, r]
        );
      },
      useRef: function (r) {
        var i = hn();
        return (r = { current: r }), (i.memoizedState = r);
      },
      useState: Mh,
      useDebugValue: Oc,
      useDeferredValue: function (r) {
        return (hn().memoizedState = r);
      },
      useTransition: function () {
        var r = Mh(!1),
          i = r[0];
        return (r = k0.bind(null, r[1])), (hn().memoizedState = r), [i, r];
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (r, i, a) {
        var f = Re,
          p = hn();
        if (Oe) {
          if (a === void 0) throw Error(n(407));
          a = a();
        } else {
          if (((a = i()), Ye === null)) throw Error(n(349));
          (wr & 30) !== 0 || Ah(f, i, a);
        }
        p.memoizedState = a;
        var g = { value: a, getSnapshot: i };
        return (
          (p.queue = g),
          Ph(jh.bind(null, f, g, r), [r]),
          (f.flags |= 2048),
          bi(9, Lh.bind(null, f, g, a, i), void 0, null),
          a
        );
      },
      useId: function () {
        var r = hn(),
          i = Ye.identifierPrefix;
        if (Oe) {
          var a = _n,
            f = Sn;
          (a = (f & ~(1 << (32 - Yt(f) - 1))).toString(32) + a),
            (i = ':' + i + 'R' + a),
            (a = _i++),
            0 < a && (i += 'H' + a.toString(32)),
            (i += ':');
        } else (a = _0++), (i = ':' + i + 'r' + a.toString(32) + ':');
        return (r.memoizedState = i);
      },
      unstable_isNewReconciler: !1,
    },
    N0 = {
      readContext: Bt,
      useCallback: Bh,
      useContext: Bt,
      useEffect: Ic,
      useImperativeHandle: zh,
      useInsertionEffect: Rh,
      useLayoutEffect: Dh,
      useMemo: Uh,
      useReducer: Lc,
      useRef: $h,
      useState: function () {
        return Lc(ki);
      },
      useDebugValue: Oc,
      useDeferredValue: function (r) {
        var i = Ut();
        return qh(i, Qe.memoizedState, r);
      },
      useTransition: function () {
        var r = Lc(ki)[0],
          i = Ut().memoizedState;
        return [r, i];
      },
      useMutableSource: Nh,
      useSyncExternalStore: Ch,
      useId: Hh,
      unstable_isNewReconciler: !1,
    },
    C0 = {
      readContext: Bt,
      useCallback: Bh,
      useContext: Bt,
      useEffect: Ic,
      useImperativeHandle: zh,
      useInsertionEffect: Rh,
      useLayoutEffect: Dh,
      useMemo: Uh,
      useReducer: jc,
      useRef: $h,
      useState: function () {
        return jc(ki);
      },
      useDebugValue: Oc,
      useDeferredValue: function (r) {
        var i = Ut();
        return Qe === null ? (i.memoizedState = r) : qh(i, Qe.memoizedState, r);
      },
      useTransition: function () {
        var r = jc(ki)[0],
          i = Ut().memoizedState;
        return [r, i];
      },
      useMutableSource: Nh,
      useSyncExternalStore: Ch,
      useId: Hh,
      unstable_isNewReconciler: !1,
    };
  function tn(r, i) {
    if (r && r.defaultProps) {
      (i = Z({}, i)), (r = r.defaultProps);
      for (var a in r) i[a] === void 0 && (i[a] = r[a]);
      return i;
    }
    return i;
  }
  function Mc(r, i, a, f) {
    (i = r.memoizedState),
      (a = a(f, i)),
      (a = a == null ? i : Z({}, i, a)),
      (r.memoizedState = a),
      r.lanes === 0 && (r.updateQueue.baseState = a);
  }
  var Go = {
    isMounted: function (r) {
      return (r = r._reactInternals) ? dr(r) === r : !1;
    },
    enqueueSetState: function (r, i, a) {
      r = r._reactInternals;
      var f = ht(),
        p = Yn(r),
        g = bn(f, p);
      (g.payload = i),
        a != null && (g.callback = a),
        (i = Qn(r, g, p)),
        i !== null && (sn(i, r, p, f), Bo(i, r, p));
    },
    enqueueReplaceState: function (r, i, a) {
      r = r._reactInternals;
      var f = ht(),
        p = Yn(r),
        g = bn(f, p);
      (g.tag = 1),
        (g.payload = i),
        a != null && (g.callback = a),
        (i = Qn(r, g, p)),
        i !== null && (sn(i, r, p, f), Bo(i, r, p));
    },
    enqueueForceUpdate: function (r, i) {
      r = r._reactInternals;
      var a = ht(),
        f = Yn(r),
        p = bn(a, f);
      (p.tag = 2),
        i != null && (p.callback = i),
        (i = Qn(r, p, f)),
        i !== null && (sn(i, r, f, a), Bo(i, r, f));
    },
  };
  function Qh(r, i, a, f, p, g, k) {
    return (
      (r = r.stateNode),
      typeof r.shouldComponentUpdate == 'function'
        ? r.shouldComponentUpdate(f, g, k)
        : i.prototype && i.prototype.isPureReactComponent
          ? !ui(a, f) || !ui(p, g)
          : !0
    );
  }
  function Gh(r, i, a) {
    var f = !1,
      p = Vn,
      g = i.contextType;
    return (
      typeof g == 'object' && g !== null
        ? (g = Bt(g))
        : ((p = St(i) ? pr : st.current),
          (f = i.contextTypes),
          (g = (f = f != null) ? Zr(r, p) : Vn)),
      (i = new i(a, g)),
      (r.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
      (i.updater = Go),
      (r.stateNode = i),
      (i._reactInternals = r),
      f &&
        ((r = r.stateNode),
        (r.__reactInternalMemoizedUnmaskedChildContext = p),
        (r.__reactInternalMemoizedMaskedChildContext = g)),
      i
    );
  }
  function Xh(r, i, a, f) {
    (r = i.state),
      typeof i.componentWillReceiveProps == 'function' && i.componentWillReceiveProps(a, f),
      typeof i.UNSAFE_componentWillReceiveProps == 'function' &&
        i.UNSAFE_componentWillReceiveProps(a, f),
      i.state !== r && Go.enqueueReplaceState(i, i.state, null);
  }
  function $c(r, i, a, f) {
    var p = r.stateNode;
    (p.props = a), (p.state = r.memoizedState), (p.refs = {}), Sc(r);
    var g = i.contextType;
    typeof g == 'object' && g !== null
      ? (p.context = Bt(g))
      : ((g = St(i) ? pr : st.current), (p.context = Zr(r, g))),
      (p.state = r.memoizedState),
      (g = i.getDerivedStateFromProps),
      typeof g == 'function' && (Mc(r, i, g, a), (p.state = r.memoizedState)),
      typeof i.getDerivedStateFromProps == 'function' ||
        typeof p.getSnapshotBeforeUpdate == 'function' ||
        (typeof p.UNSAFE_componentWillMount != 'function' &&
          typeof p.componentWillMount != 'function') ||
        ((i = p.state),
        typeof p.componentWillMount == 'function' && p.componentWillMount(),
        typeof p.UNSAFE_componentWillMount == 'function' && p.UNSAFE_componentWillMount(),
        i !== p.state && Go.enqueueReplaceState(p, p.state, null),
        Uo(r, a, p, f),
        (p.state = r.memoizedState)),
      typeof p.componentDidMount == 'function' && (r.flags |= 4194308);
  }
  function ls(r, i) {
    try {
      var a = '',
        f = i;
      do (a += ve(f)), (f = f.return);
      while (f);
      var p = a;
    } catch (g) {
      p =
        `
Error generating stack: ` +
        g.message +
        `
` +
        g.stack;
    }
    return { value: r, source: i, stack: p, digest: null };
  }
  function Pc(r, i, a) {
    return { value: r, source: null, stack: a ?? null, digest: i ?? null };
  }
  function Rc(r, i) {
    try {
      console.error(i.value);
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  var A0 = typeof WeakMap == 'function' ? WeakMap : Map;
  function Jh(r, i, a) {
    (a = bn(-1, a)), (a.tag = 3), (a.payload = { element: null });
    var f = i.value;
    return (
      (a.callback = function () {
        nl || ((nl = !0), (Yc = f)), Rc(r, i);
      }),
      a
    );
  }
  function Yh(r, i, a) {
    (a = bn(-1, a)), (a.tag = 3);
    var f = r.type.getDerivedStateFromError;
    if (typeof f == 'function') {
      var p = i.value;
      (a.payload = function () {
        return f(p);
      }),
        (a.callback = function () {
          Rc(r, i);
        });
    }
    var g = r.stateNode;
    return (
      g !== null &&
        typeof g.componentDidCatch == 'function' &&
        (a.callback = function () {
          Rc(r, i), typeof f != 'function' && (Xn === null ? (Xn = new Set([this])) : Xn.add(this));
          var k = i.stack;
          this.componentDidCatch(i.value, { componentStack: k !== null ? k : '' });
        }),
      a
    );
  }
  function Zh(r, i, a) {
    var f = r.pingCache;
    if (f === null) {
      f = r.pingCache = new A0();
      var p = new Set();
      f.set(i, p);
    } else (p = f.get(i)), p === void 0 && ((p = new Set()), f.set(i, p));
    p.has(a) || (p.add(a), (r = q0.bind(null, r, i, a)), i.then(r, r));
  }
  function ep(r) {
    do {
      var i;
      if (
        ((i = r.tag === 13) &&
          ((i = r.memoizedState), (i = i !== null ? i.dehydrated !== null : !0)),
        i)
      )
        return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function tp(r, i, a, f, p) {
    return (r.mode & 1) === 0
      ? (r === i
          ? (r.flags |= 65536)
          : ((r.flags |= 128),
            (a.flags |= 131072),
            (a.flags &= -52805),
            a.tag === 1 &&
              (a.alternate === null ? (a.tag = 17) : ((i = bn(-1, 1)), (i.tag = 2), Qn(a, i, 1))),
            (a.lanes |= 1)),
        r)
      : ((r.flags |= 65536), (r.lanes = p), r);
  }
  var L0 = R.ReactCurrentOwner,
    _t = !1;
  function dt(r, i, a, f) {
    i.child = r === null ? Sh(i, null, a, f) : rs(i, r.child, a, f);
  }
  function np(r, i, a, f, p) {
    a = a.render;
    var g = i.ref;
    return (
      is(i, p),
      (f = Cc(r, i, a, f, g, p)),
      (a = Ac()),
      r !== null && !_t
        ? ((i.updateQueue = r.updateQueue), (i.flags &= -2053), (r.lanes &= ~p), En(r, i, p))
        : (Oe && a && fc(i), (i.flags |= 1), dt(r, i, f, p), i.child)
    );
  }
  function rp(r, i, a, f, p) {
    if (r === null) {
      var g = a.type;
      return typeof g == 'function' &&
        !iu(g) &&
        g.defaultProps === void 0 &&
        a.compare === null &&
        a.defaultProps === void 0
        ? ((i.tag = 15), (i.type = g), sp(r, i, g, f, p))
        : ((r = al(a.type, null, f, i, i.mode, p)), (r.ref = i.ref), (r.return = i), (i.child = r));
    }
    if (((g = r.child), (r.lanes & p) === 0)) {
      var k = g.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : ui), a(k, f) && r.ref === i.ref))
        return En(r, i, p);
    }
    return (i.flags |= 1), (r = er(g, f)), (r.ref = i.ref), (r.return = i), (i.child = r);
  }
  function sp(r, i, a, f, p) {
    if (r !== null) {
      var g = r.memoizedProps;
      if (ui(g, f) && r.ref === i.ref)
        if (((_t = !1), (i.pendingProps = f = g), (r.lanes & p) !== 0))
          (r.flags & 131072) !== 0 && (_t = !0);
        else return (i.lanes = r.lanes), En(r, i, p);
    }
    return Dc(r, i, a, f, p);
  }
  function ip(r, i, a) {
    var f = i.pendingProps,
      p = f.children,
      g = r !== null ? r.memoizedState : null;
    if (f.mode === 'hidden')
      if ((i.mode & 1) === 0)
        (i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          Ae(cs, $t),
          ($t |= a);
      else {
        if ((a & 1073741824) === 0)
          return (
            (r = g !== null ? g.baseLanes | a : a),
            (i.lanes = i.childLanes = 1073741824),
            (i.memoizedState = { baseLanes: r, cachePool: null, transitions: null }),
            (i.updateQueue = null),
            Ae(cs, $t),
            ($t |= r),
            null
          );
        (i.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
          (f = g !== null ? g.baseLanes : a),
          Ae(cs, $t),
          ($t |= f);
      }
    else
      g !== null ? ((f = g.baseLanes | a), (i.memoizedState = null)) : (f = a),
        Ae(cs, $t),
        ($t |= f);
    return dt(r, i, p, a), i.child;
  }
  function op(r, i) {
    var a = i.ref;
    ((r === null && a !== null) || (r !== null && r.ref !== a)) &&
      ((i.flags |= 512), (i.flags |= 2097152));
  }
  function Dc(r, i, a, f, p) {
    var g = St(a) ? pr : st.current;
    return (
      (g = Zr(i, g)),
      is(i, p),
      (a = Cc(r, i, a, f, g, p)),
      (f = Ac()),
      r !== null && !_t
        ? ((i.updateQueue = r.updateQueue), (i.flags &= -2053), (r.lanes &= ~p), En(r, i, p))
        : (Oe && f && fc(i), (i.flags |= 1), dt(r, i, a, p), i.child)
    );
  }
  function lp(r, i, a, f, p) {
    if (St(a)) {
      var g = !0;
      Oo(i);
    } else g = !1;
    if ((is(i, p), i.stateNode === null)) Jo(r, i), Gh(i, a, f), $c(i, a, f, p), (f = !0);
    else if (r === null) {
      var k = i.stateNode,
        E = i.memoizedProps;
      k.props = E;
      var N = k.context,
        $ = a.contextType;
      typeof $ == 'object' && $ !== null
        ? ($ = Bt($))
        : (($ = St(a) ? pr : st.current), ($ = Zr(i, $)));
      var V = a.getDerivedStateFromProps,
        K = typeof V == 'function' || typeof k.getSnapshotBeforeUpdate == 'function';
      K ||
        (typeof k.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof k.componentWillReceiveProps != 'function') ||
        ((E !== f || N !== $) && Xh(i, k, f, $)),
        (Kn = !1);
      var H = i.memoizedState;
      (k.state = H),
        Uo(i, f, k, p),
        (N = i.memoizedState),
        E !== f || H !== N || xt.current || Kn
          ? (typeof V == 'function' && (Mc(i, a, V, f), (N = i.memoizedState)),
            (E = Kn || Qh(i, a, E, f, H, N, $))
              ? (K ||
                  (typeof k.UNSAFE_componentWillMount != 'function' &&
                    typeof k.componentWillMount != 'function') ||
                  (typeof k.componentWillMount == 'function' && k.componentWillMount(),
                  typeof k.UNSAFE_componentWillMount == 'function' &&
                    k.UNSAFE_componentWillMount()),
                typeof k.componentDidMount == 'function' && (i.flags |= 4194308))
              : (typeof k.componentDidMount == 'function' && (i.flags |= 4194308),
                (i.memoizedProps = f),
                (i.memoizedState = N)),
            (k.props = f),
            (k.state = N),
            (k.context = $),
            (f = E))
          : (typeof k.componentDidMount == 'function' && (i.flags |= 4194308), (f = !1));
    } else {
      (k = i.stateNode),
        kh(r, i),
        (E = i.memoizedProps),
        ($ = i.type === i.elementType ? E : tn(i.type, E)),
        (k.props = $),
        (K = i.pendingProps),
        (H = k.context),
        (N = a.contextType),
        typeof N == 'object' && N !== null
          ? (N = Bt(N))
          : ((N = St(a) ? pr : st.current), (N = Zr(i, N)));
      var Y = a.getDerivedStateFromProps;
      (V = typeof Y == 'function' || typeof k.getSnapshotBeforeUpdate == 'function') ||
        (typeof k.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof k.componentWillReceiveProps != 'function') ||
        ((E !== K || H !== N) && Xh(i, k, f, N)),
        (Kn = !1),
        (H = i.memoizedState),
        (k.state = H),
        Uo(i, f, k, p);
      var te = i.memoizedState;
      E !== K || H !== te || xt.current || Kn
        ? (typeof Y == 'function' && (Mc(i, a, Y, f), (te = i.memoizedState)),
          ($ = Kn || Qh(i, a, $, f, H, te, N) || !1)
            ? (V ||
                (typeof k.UNSAFE_componentWillUpdate != 'function' &&
                  typeof k.componentWillUpdate != 'function') ||
                (typeof k.componentWillUpdate == 'function' && k.componentWillUpdate(f, te, N),
                typeof k.UNSAFE_componentWillUpdate == 'function' &&
                  k.UNSAFE_componentWillUpdate(f, te, N)),
              typeof k.componentDidUpdate == 'function' && (i.flags |= 4),
              typeof k.getSnapshotBeforeUpdate == 'function' && (i.flags |= 1024))
            : (typeof k.componentDidUpdate != 'function' ||
                (E === r.memoizedProps && H === r.memoizedState) ||
                (i.flags |= 4),
              typeof k.getSnapshotBeforeUpdate != 'function' ||
                (E === r.memoizedProps && H === r.memoizedState) ||
                (i.flags |= 1024),
              (i.memoizedProps = f),
              (i.memoizedState = te)),
          (k.props = f),
          (k.state = te),
          (k.context = N),
          (f = $))
        : (typeof k.componentDidUpdate != 'function' ||
            (E === r.memoizedProps && H === r.memoizedState) ||
            (i.flags |= 4),
          typeof k.getSnapshotBeforeUpdate != 'function' ||
            (E === r.memoizedProps && H === r.memoizedState) ||
            (i.flags |= 1024),
          (f = !1));
    }
    return Fc(r, i, a, f, g, p);
  }
  function Fc(r, i, a, f, p, g) {
    op(r, i);
    var k = (i.flags & 128) !== 0;
    if (!f && !k) return p && dh(i, a, !1), En(r, i, g);
    (f = i.stateNode), (L0.current = i);
    var E = k && typeof a.getDerivedStateFromError != 'function' ? null : f.render();
    return (
      (i.flags |= 1),
      r !== null && k
        ? ((i.child = rs(i, r.child, null, g)), (i.child = rs(i, null, E, g)))
        : dt(r, i, E, g),
      (i.memoizedState = f.state),
      p && dh(i, a, !0),
      i.child
    );
  }
  function ap(r) {
    var i = r.stateNode;
    i.pendingContext
      ? uh(r, i.pendingContext, i.pendingContext !== i.context)
      : i.context && uh(r, i.context, !1),
      _c(r, i.containerInfo);
  }
  function cp(r, i, a, f, p) {
    return ns(), mc(p), (i.flags |= 256), dt(r, i, a, f), i.child;
  }
  var zc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Bc(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function up(r, i, a) {
    var f = i.pendingProps,
      p = Pe.current,
      g = !1,
      k = (i.flags & 128) !== 0,
      E;
    if (
      ((E = k) || (E = r !== null && r.memoizedState === null ? !1 : (p & 2) !== 0),
      E ? ((g = !0), (i.flags &= -129)) : (r === null || r.memoizedState !== null) && (p |= 1),
      Ae(Pe, p & 1),
      r === null)
    )
      return (
        pc(i),
        (r = i.memoizedState),
        r !== null && ((r = r.dehydrated), r !== null)
          ? ((i.mode & 1) === 0
              ? (i.lanes = 1)
              : r.data === '$!'
                ? (i.lanes = 8)
                : (i.lanes = 1073741824),
            null)
          : ((k = f.children),
            (r = f.fallback),
            g
              ? ((f = i.mode),
                (g = i.child),
                (k = { mode: 'hidden', children: k }),
                (f & 1) === 0 && g !== null
                  ? ((g.childLanes = 0), (g.pendingProps = k))
                  : (g = cl(k, f, 0, null)),
                (r = br(r, f, a, null)),
                (g.return = i),
                (r.return = i),
                (g.sibling = r),
                (i.child = g),
                (i.child.memoizedState = Bc(a)),
                (i.memoizedState = zc),
                r)
              : Uc(i, k))
      );
    if (((p = r.memoizedState), p !== null && ((E = p.dehydrated), E !== null)))
      return j0(r, i, k, f, E, p, a);
    if (g) {
      (g = f.fallback), (k = i.mode), (p = r.child), (E = p.sibling);
      var N = { mode: 'hidden', children: f.children };
      return (
        (k & 1) === 0 && i.child !== p
          ? ((f = i.child), (f.childLanes = 0), (f.pendingProps = N), (i.deletions = null))
          : ((f = er(p, N)), (f.subtreeFlags = p.subtreeFlags & 14680064)),
        E !== null ? (g = er(E, g)) : ((g = br(g, k, a, null)), (g.flags |= 2)),
        (g.return = i),
        (f.return = i),
        (f.sibling = g),
        (i.child = f),
        (f = g),
        (g = i.child),
        (k = r.child.memoizedState),
        (k =
          k === null
            ? Bc(a)
            : { baseLanes: k.baseLanes | a, cachePool: null, transitions: k.transitions }),
        (g.memoizedState = k),
        (g.childLanes = r.childLanes & ~a),
        (i.memoizedState = zc),
        f
      );
    }
    return (
      (g = r.child),
      (r = g.sibling),
      (f = er(g, { mode: 'visible', children: f.children })),
      (i.mode & 1) === 0 && (f.lanes = a),
      (f.return = i),
      (f.sibling = null),
      r !== null &&
        ((a = i.deletions), a === null ? ((i.deletions = [r]), (i.flags |= 16)) : a.push(r)),
      (i.child = f),
      (i.memoizedState = null),
      f
    );
  }
  function Uc(r, i) {
    return (
      (i = cl({ mode: 'visible', children: i }, r.mode, 0, null)), (i.return = r), (r.child = i)
    );
  }
  function Xo(r, i, a, f) {
    return (
      f !== null && mc(f),
      rs(i, r.child, null, a),
      (r = Uc(i, i.pendingProps.children)),
      (r.flags |= 2),
      (i.memoizedState = null),
      r
    );
  }
  function j0(r, i, a, f, p, g, k) {
    if (a)
      return i.flags & 256
        ? ((i.flags &= -257), (f = Pc(Error(n(422)))), Xo(r, i, k, f))
        : i.memoizedState !== null
          ? ((i.child = r.child), (i.flags |= 128), null)
          : ((g = f.fallback),
            (p = i.mode),
            (f = cl({ mode: 'visible', children: f.children }, p, 0, null)),
            (g = br(g, p, k, null)),
            (g.flags |= 2),
            (f.return = i),
            (g.return = i),
            (f.sibling = g),
            (i.child = f),
            (i.mode & 1) !== 0 && rs(i, r.child, null, k),
            (i.child.memoizedState = Bc(k)),
            (i.memoizedState = zc),
            g);
    if ((i.mode & 1) === 0) return Xo(r, i, k, null);
    if (p.data === '$!') {
      if (((f = p.nextSibling && p.nextSibling.dataset), f)) var E = f.dgst;
      return (f = E), (g = Error(n(419))), (f = Pc(g, f, void 0)), Xo(r, i, k, f);
    }
    if (((E = (k & r.childLanes) !== 0), _t || E)) {
      if (((f = Ye), f !== null)) {
        switch (k & -k) {
          case 4:
            p = 2;
            break;
          case 16:
            p = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            p = 32;
            break;
          case 536870912:
            p = 268435456;
            break;
          default:
            p = 0;
        }
        (p = (p & (f.suspendedLanes | k)) !== 0 ? 0 : p),
          p !== 0 && p !== g.retryLane && ((g.retryLane = p), kn(r, p), sn(f, r, p, -1));
      }
      return su(), (f = Pc(Error(n(421)))), Xo(r, i, k, f);
    }
    return p.data === '$?'
      ? ((i.flags |= 128), (i.child = r.child), (i = H0.bind(null, r)), (p._reactRetry = i), null)
      : ((r = g.treeContext),
        (Mt = qn(p.nextSibling)),
        (Ot = i),
        (Oe = !0),
        (en = null),
        r !== null &&
          ((Ft[zt++] = Sn),
          (Ft[zt++] = _n),
          (Ft[zt++] = mr),
          (Sn = r.id),
          (_n = r.overflow),
          (mr = i)),
        (i = Uc(i, f.children)),
        (i.flags |= 4096),
        i);
  }
  function fp(r, i, a) {
    r.lanes |= i;
    var f = r.alternate;
    f !== null && (f.lanes |= i), wc(r.return, i, a);
  }
  function qc(r, i, a, f, p) {
    var g = r.memoizedState;
    g === null
      ? (r.memoizedState = {
          isBackwards: i,
          rendering: null,
          renderingStartTime: 0,
          last: f,
          tail: a,
          tailMode: p,
        })
      : ((g.isBackwards = i),
        (g.rendering = null),
        (g.renderingStartTime = 0),
        (g.last = f),
        (g.tail = a),
        (g.tailMode = p));
  }
  function dp(r, i, a) {
    var f = i.pendingProps,
      p = f.revealOrder,
      g = f.tail;
    if ((dt(r, i, f.children, a), (f = Pe.current), (f & 2) !== 0))
      (f = (f & 1) | 2), (i.flags |= 128);
    else {
      if (r !== null && (r.flags & 128) !== 0)
        e: for (r = i.child; r !== null; ) {
          if (r.tag === 13) r.memoizedState !== null && fp(r, a, i);
          else if (r.tag === 19) fp(r, a, i);
          else if (r.child !== null) {
            (r.child.return = r), (r = r.child);
            continue;
          }
          if (r === i) break e;
          for (; r.sibling === null; ) {
            if (r.return === null || r.return === i) break e;
            r = r.return;
          }
          (r.sibling.return = r.return), (r = r.sibling);
        }
      f &= 1;
    }
    if ((Ae(Pe, f), (i.mode & 1) === 0)) i.memoizedState = null;
    else
      switch (p) {
        case 'forwards':
          for (a = i.child, p = null; a !== null; )
            (r = a.alternate), r !== null && qo(r) === null && (p = a), (a = a.sibling);
          (a = p),
            a === null ? ((p = i.child), (i.child = null)) : ((p = a.sibling), (a.sibling = null)),
            qc(i, !1, p, a, g);
          break;
        case 'backwards':
          for (a = null, p = i.child, i.child = null; p !== null; ) {
            if (((r = p.alternate), r !== null && qo(r) === null)) {
              i.child = p;
              break;
            }
            (r = p.sibling), (p.sibling = a), (a = p), (p = r);
          }
          qc(i, !0, a, null, g);
          break;
        case 'together':
          qc(i, !1, null, null, void 0);
          break;
        default:
          i.memoizedState = null;
      }
    return i.child;
  }
  function Jo(r, i) {
    (i.mode & 1) === 0 &&
      r !== null &&
      ((r.alternate = null), (i.alternate = null), (i.flags |= 2));
  }
  function En(r, i, a) {
    if (
      (r !== null && (i.dependencies = r.dependencies), (xr |= i.lanes), (a & i.childLanes) === 0)
    )
      return null;
    if (r !== null && i.child !== r.child) throw Error(n(153));
    if (i.child !== null) {
      for (r = i.child, a = er(r, r.pendingProps), i.child = a, a.return = i; r.sibling !== null; )
        (r = r.sibling), (a = a.sibling = er(r, r.pendingProps)), (a.return = i);
      a.sibling = null;
    }
    return i.child;
  }
  function I0(r, i, a) {
    switch (i.tag) {
      case 3:
        ap(i), ns();
        break;
      case 5:
        Th(i);
        break;
      case 1:
        St(i.type) && Oo(i);
        break;
      case 4:
        _c(i, i.stateNode.containerInfo);
        break;
      case 10:
        var f = i.type._context,
          p = i.memoizedProps.value;
        Ae(Fo, f._currentValue), (f._currentValue = p);
        break;
      case 13:
        if (((f = i.memoizedState), f !== null))
          return f.dehydrated !== null
            ? (Ae(Pe, Pe.current & 1), (i.flags |= 128), null)
            : (a & i.child.childLanes) !== 0
              ? up(r, i, a)
              : (Ae(Pe, Pe.current & 1), (r = En(r, i, a)), r !== null ? r.sibling : null);
        Ae(Pe, Pe.current & 1);
        break;
      case 19:
        if (((f = (a & i.childLanes) !== 0), (r.flags & 128) !== 0)) {
          if (f) return dp(r, i, a);
          i.flags |= 128;
        }
        if (
          ((p = i.memoizedState),
          p !== null && ((p.rendering = null), (p.tail = null), (p.lastEffect = null)),
          Ae(Pe, Pe.current),
          f)
        )
          break;
        return null;
      case 22:
      case 23:
        return (i.lanes = 0), ip(r, i, a);
    }
    return En(r, i, a);
  }
  var hp, Hc, pp, mp;
  (hp = function (r, i) {
    for (var a = i.child; a !== null; ) {
      if (a.tag === 5 || a.tag === 6) r.appendChild(a.stateNode);
      else if (a.tag !== 4 && a.child !== null) {
        (a.child.return = a), (a = a.child);
        continue;
      }
      if (a === i) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === i) return;
        a = a.return;
      }
      (a.sibling.return = a.return), (a = a.sibling);
    }
  }),
    (Hc = function () {}),
    (pp = function (r, i, a, f) {
      var p = r.memoizedProps;
      if (p !== f) {
        (r = i.stateNode), vr(dn.current);
        var g = null;
        switch (a) {
          case 'input':
            (p = cn(r, p)), (f = cn(r, f)), (g = []);
            break;
          case 'select':
            (p = Z({}, p, { value: void 0 })), (f = Z({}, f, { value: void 0 })), (g = []);
            break;
          case 'textarea':
            (p = Ws(r, p)), (f = Ws(r, f)), (g = []);
            break;
          default:
            typeof p.onClick != 'function' && typeof f.onClick == 'function' && (r.onclick = Lo);
        }
        ba(a, f);
        var k;
        a = null;
        for ($ in p)
          if (!f.hasOwnProperty($) && p.hasOwnProperty($) && p[$] != null)
            if ($ === 'style') {
              var E = p[$];
              for (k in E) E.hasOwnProperty(k) && (a || (a = {}), (a[k] = ''));
            } else
              $ !== 'dangerouslySetInnerHTML' &&
                $ !== 'children' &&
                $ !== 'suppressContentEditableWarning' &&
                $ !== 'suppressHydrationWarning' &&
                $ !== 'autoFocus' &&
                (o.hasOwnProperty($) ? g || (g = []) : (g = g || []).push($, null));
        for ($ in f) {
          var N = f[$];
          if (
            ((E = p != null ? p[$] : void 0),
            f.hasOwnProperty($) && N !== E && (N != null || E != null))
          )
            if ($ === 'style')
              if (E) {
                for (k in E)
                  !E.hasOwnProperty(k) ||
                    (N && N.hasOwnProperty(k)) ||
                    (a || (a = {}), (a[k] = ''));
                for (k in N) N.hasOwnProperty(k) && E[k] !== N[k] && (a || (a = {}), (a[k] = N[k]));
              } else a || (g || (g = []), g.push($, a)), (a = N);
            else
              $ === 'dangerouslySetInnerHTML'
                ? ((N = N ? N.__html : void 0),
                  (E = E ? E.__html : void 0),
                  N != null && E !== N && (g = g || []).push($, N))
                : $ === 'children'
                  ? (typeof N != 'string' && typeof N != 'number') || (g = g || []).push($, '' + N)
                  : $ !== 'suppressContentEditableWarning' &&
                    $ !== 'suppressHydrationWarning' &&
                    (o.hasOwnProperty($)
                      ? (N != null && $ === 'onScroll' && je('scroll', r), g || E === N || (g = []))
                      : (g = g || []).push($, N));
        }
        a && (g = g || []).push('style', a);
        var $ = g;
        (i.updateQueue = $) && (i.flags |= 4);
      }
    }),
    (mp = function (r, i, a, f) {
      a !== f && (i.flags |= 4);
    });
  function Ei(r, i) {
    if (!Oe)
      switch (r.tailMode) {
        case 'hidden':
          i = r.tail;
          for (var a = null; i !== null; ) i.alternate !== null && (a = i), (i = i.sibling);
          a === null ? (r.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = r.tail;
          for (var f = null; a !== null; ) a.alternate !== null && (f = a), (a = a.sibling);
          f === null
            ? i || r.tail === null
              ? (r.tail = null)
              : (r.tail.sibling = null)
            : (f.sibling = null);
      }
  }
  function ot(r) {
    var i = r.alternate !== null && r.alternate.child === r.child,
      a = 0,
      f = 0;
    if (i)
      for (var p = r.child; p !== null; )
        (a |= p.lanes | p.childLanes),
          (f |= p.subtreeFlags & 14680064),
          (f |= p.flags & 14680064),
          (p.return = r),
          (p = p.sibling);
    else
      for (p = r.child; p !== null; )
        (a |= p.lanes | p.childLanes),
          (f |= p.subtreeFlags),
          (f |= p.flags),
          (p.return = r),
          (p = p.sibling);
    return (r.subtreeFlags |= f), (r.childLanes = a), i;
  }
  function O0(r, i, a) {
    var f = i.pendingProps;
    switch ((dc(i), i.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ot(i), null;
      case 1:
        return St(i.type) && Io(), ot(i), null;
      case 3:
        return (
          (f = i.stateNode),
          os(),
          Ie(xt),
          Ie(st),
          Ec(),
          f.pendingContext && ((f.context = f.pendingContext), (f.pendingContext = null)),
          (r === null || r.child === null) &&
            (Ro(i)
              ? (i.flags |= 4)
              : r === null ||
                (r.memoizedState.isDehydrated && (i.flags & 256) === 0) ||
                ((i.flags |= 1024), en !== null && (tu(en), (en = null)))),
          Hc(r, i),
          ot(i),
          null
        );
      case 5:
        kc(i);
        var p = vr(xi.current);
        if (((a = i.type), r !== null && i.stateNode != null))
          pp(r, i, a, f, p), r.ref !== i.ref && ((i.flags |= 512), (i.flags |= 2097152));
        else {
          if (!f) {
            if (i.stateNode === null) throw Error(n(166));
            return ot(i), null;
          }
          if (((r = vr(dn.current)), Ro(i))) {
            (f = i.stateNode), (a = i.type);
            var g = i.memoizedProps;
            switch (((f[fn] = i), (f[mi] = g), (r = (i.mode & 1) !== 0), a)) {
              case 'dialog':
                je('cancel', f), je('close', f);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                je('load', f);
                break;
              case 'video':
              case 'audio':
                for (p = 0; p < di.length; p++) je(di[p], f);
                break;
              case 'source':
                je('error', f);
                break;
              case 'img':
              case 'image':
              case 'link':
                je('error', f), je('load', f);
                break;
              case 'details':
                je('toggle', f);
                break;
              case 'input':
                so(f, g), je('invalid', f);
                break;
              case 'select':
                (f._wrapperState = { wasMultiple: !!g.multiple }), je('invalid', f);
                break;
              case 'textarea':
                lo(f, g), je('invalid', f);
            }
            ba(a, g), (p = null);
            for (var k in g)
              if (g.hasOwnProperty(k)) {
                var E = g[k];
                k === 'children'
                  ? typeof E == 'string'
                    ? f.textContent !== E &&
                      (g.suppressHydrationWarning !== !0 && Ao(f.textContent, E, r),
                      (p = ['children', E]))
                    : typeof E == 'number' &&
                      f.textContent !== '' + E &&
                      (g.suppressHydrationWarning !== !0 && Ao(f.textContent, E, r),
                      (p = ['children', '' + E]))
                  : o.hasOwnProperty(k) && E != null && k === 'onScroll' && je('scroll', f);
              }
            switch (a) {
              case 'input':
                Mn(f), oo(f, g, !0);
                break;
              case 'textarea':
                Mn(f), zr(f);
                break;
              case 'select':
              case 'option':
                break;
              default:
                typeof g.onClick == 'function' && (f.onclick = Lo);
            }
            (f = p), (i.updateQueue = f), f !== null && (i.flags |= 4);
          } else {
            (k = p.nodeType === 9 ? p : p.ownerDocument),
              r === 'http://www.w3.org/1999/xhtml' && (r = fr(a)),
              r === 'http://www.w3.org/1999/xhtml'
                ? a === 'script'
                  ? ((r = k.createElement('div')),
                    (r.innerHTML = '<script><\/script>'),
                    (r = r.removeChild(r.firstChild)))
                  : typeof f.is == 'string'
                    ? (r = k.createElement(a, { is: f.is }))
                    : ((r = k.createElement(a)),
                      a === 'select' &&
                        ((k = r), f.multiple ? (k.multiple = !0) : f.size && (k.size = f.size)))
                : (r = k.createElementNS(r, a)),
              (r[fn] = i),
              (r[mi] = f),
              hp(r, i, !1, !1),
              (i.stateNode = r);
            e: {
              switch (((k = Ea(a, f)), a)) {
                case 'dialog':
                  je('cancel', r), je('close', r), (p = f);
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  je('load', r), (p = f);
                  break;
                case 'video':
                case 'audio':
                  for (p = 0; p < di.length; p++) je(di[p], r);
                  p = f;
                  break;
                case 'source':
                  je('error', r), (p = f);
                  break;
                case 'img':
                case 'image':
                case 'link':
                  je('error', r), je('load', r), (p = f);
                  break;
                case 'details':
                  je('toggle', r), (p = f);
                  break;
                case 'input':
                  so(r, f), (p = cn(r, f)), je('invalid', r);
                  break;
                case 'option':
                  p = f;
                  break;
                case 'select':
                  (r._wrapperState = { wasMultiple: !!f.multiple }),
                    (p = Z({}, f, { value: void 0 })),
                    je('invalid', r);
                  break;
                case 'textarea':
                  lo(r, f), (p = Ws(r, f)), je('invalid', r);
                  break;
                default:
                  p = f;
              }
              ba(a, p), (E = p);
              for (g in E)
                if (E.hasOwnProperty(g)) {
                  var N = E[g];
                  g === 'style'
                    ? sd(r, N)
                    : g === 'dangerouslySetInnerHTML'
                      ? ((N = N ? N.__html : void 0), N != null && Qs(r, N))
                      : g === 'children'
                        ? typeof N == 'string'
                          ? (a !== 'textarea' || N !== '') && le(r, N)
                          : typeof N == 'number' && le(r, '' + N)
                        : g !== 'suppressContentEditableWarning' &&
                          g !== 'suppressHydrationWarning' &&
                          g !== 'autoFocus' &&
                          (o.hasOwnProperty(g)
                            ? N != null && g === 'onScroll' && je('scroll', r)
                            : N != null && O(r, g, N, k));
                }
              switch (a) {
                case 'input':
                  Mn(r), oo(r, f, !1);
                  break;
                case 'textarea':
                  Mn(r), zr(r);
                  break;
                case 'option':
                  f.value != null && r.setAttribute('value', '' + Se(f.value));
                  break;
                case 'select':
                  (r.multiple = !!f.multiple),
                    (g = f.value),
                    g != null
                      ? $n(r, !!f.multiple, g, !1)
                      : f.defaultValue != null && $n(r, !!f.multiple, f.defaultValue, !0);
                  break;
                default:
                  typeof p.onClick == 'function' && (r.onclick = Lo);
              }
              switch (a) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  f = !!f.autoFocus;
                  break e;
                case 'img':
                  f = !0;
                  break e;
                default:
                  f = !1;
              }
            }
            f && (i.flags |= 4);
          }
          i.ref !== null && ((i.flags |= 512), (i.flags |= 2097152));
        }
        return ot(i), null;
      case 6:
        if (r && i.stateNode != null) mp(r, i, r.memoizedProps, f);
        else {
          if (typeof f != 'string' && i.stateNode === null) throw Error(n(166));
          if (((a = vr(xi.current)), vr(dn.current), Ro(i))) {
            if (
              ((f = i.stateNode),
              (a = i.memoizedProps),
              (f[fn] = i),
              (g = f.nodeValue !== a) && ((r = Ot), r !== null))
            )
              switch (r.tag) {
                case 3:
                  Ao(f.nodeValue, a, (r.mode & 1) !== 0);
                  break;
                case 5:
                  r.memoizedProps.suppressHydrationWarning !== !0 &&
                    Ao(f.nodeValue, a, (r.mode & 1) !== 0);
              }
            g && (i.flags |= 4);
          } else
            (f = (a.nodeType === 9 ? a : a.ownerDocument).createTextNode(f)),
              (f[fn] = i),
              (i.stateNode = f);
        }
        return ot(i), null;
      case 13:
        if (
          (Ie(Pe),
          (f = i.memoizedState),
          r === null || (r.memoizedState !== null && r.memoizedState.dehydrated !== null))
        ) {
          if (Oe && Mt !== null && (i.mode & 1) !== 0 && (i.flags & 128) === 0)
            vh(), ns(), (i.flags |= 98560), (g = !1);
          else if (((g = Ro(i)), f !== null && f.dehydrated !== null)) {
            if (r === null) {
              if (!g) throw Error(n(318));
              if (((g = i.memoizedState), (g = g !== null ? g.dehydrated : null), !g))
                throw Error(n(317));
              g[fn] = i;
            } else ns(), (i.flags & 128) === 0 && (i.memoizedState = null), (i.flags |= 4);
            ot(i), (g = !1);
          } else en !== null && (tu(en), (en = null)), (g = !0);
          if (!g) return i.flags & 65536 ? i : null;
        }
        return (i.flags & 128) !== 0
          ? ((i.lanes = a), i)
          : ((f = f !== null),
            f !== (r !== null && r.memoizedState !== null) &&
              f &&
              ((i.child.flags |= 8192),
              (i.mode & 1) !== 0 &&
                (r === null || (Pe.current & 1) !== 0 ? Ge === 0 && (Ge = 3) : su())),
            i.updateQueue !== null && (i.flags |= 4),
            ot(i),
            null);
      case 4:
        return os(), Hc(r, i), r === null && hi(i.stateNode.containerInfo), ot(i), null;
      case 10:
        return vc(i.type._context), ot(i), null;
      case 17:
        return St(i.type) && Io(), ot(i), null;
      case 19:
        if ((Ie(Pe), (g = i.memoizedState), g === null)) return ot(i), null;
        if (((f = (i.flags & 128) !== 0), (k = g.rendering), k === null))
          if (f) Ei(g, !1);
          else {
            if (Ge !== 0 || (r !== null && (r.flags & 128) !== 0))
              for (r = i.child; r !== null; ) {
                if (((k = qo(r)), k !== null)) {
                  for (
                    i.flags |= 128,
                      Ei(g, !1),
                      f = k.updateQueue,
                      f !== null && ((i.updateQueue = f), (i.flags |= 4)),
                      i.subtreeFlags = 0,
                      f = a,
                      a = i.child;
                    a !== null;

                  )
                    (g = a),
                      (r = f),
                      (g.flags &= 14680066),
                      (k = g.alternate),
                      k === null
                        ? ((g.childLanes = 0),
                          (g.lanes = r),
                          (g.child = null),
                          (g.subtreeFlags = 0),
                          (g.memoizedProps = null),
                          (g.memoizedState = null),
                          (g.updateQueue = null),
                          (g.dependencies = null),
                          (g.stateNode = null))
                        : ((g.childLanes = k.childLanes),
                          (g.lanes = k.lanes),
                          (g.child = k.child),
                          (g.subtreeFlags = 0),
                          (g.deletions = null),
                          (g.memoizedProps = k.memoizedProps),
                          (g.memoizedState = k.memoizedState),
                          (g.updateQueue = k.updateQueue),
                          (g.type = k.type),
                          (r = k.dependencies),
                          (g.dependencies =
                            r === null ? null : { lanes: r.lanes, firstContext: r.firstContext })),
                      (a = a.sibling);
                  return Ae(Pe, (Pe.current & 1) | 2), i.child;
                }
                r = r.sibling;
              }
            g.tail !== null &&
              qe() > us &&
              ((i.flags |= 128), (f = !0), Ei(g, !1), (i.lanes = 4194304));
          }
        else {
          if (!f)
            if (((r = qo(k)), r !== null)) {
              if (
                ((i.flags |= 128),
                (f = !0),
                (a = r.updateQueue),
                a !== null && ((i.updateQueue = a), (i.flags |= 4)),
                Ei(g, !0),
                g.tail === null && g.tailMode === 'hidden' && !k.alternate && !Oe)
              )
                return ot(i), null;
            } else
              2 * qe() - g.renderingStartTime > us &&
                a !== 1073741824 &&
                ((i.flags |= 128), (f = !0), Ei(g, !1), (i.lanes = 4194304));
          g.isBackwards
            ? ((k.sibling = i.child), (i.child = k))
            : ((a = g.last), a !== null ? (a.sibling = k) : (i.child = k), (g.last = k));
        }
        return g.tail !== null
          ? ((i = g.tail),
            (g.rendering = i),
            (g.tail = i.sibling),
            (g.renderingStartTime = qe()),
            (i.sibling = null),
            (a = Pe.current),
            Ae(Pe, f ? (a & 1) | 2 : a & 1),
            i)
          : (ot(i), null);
      case 22:
      case 23:
        return (
          ru(),
          (f = i.memoizedState !== null),
          r !== null && (r.memoizedState !== null) !== f && (i.flags |= 8192),
          f && (i.mode & 1) !== 0
            ? ($t & 1073741824) !== 0 && (ot(i), i.subtreeFlags & 6 && (i.flags |= 8192))
            : ot(i),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(n(156, i.tag));
  }
  function M0(r, i) {
    switch ((dc(i), i.tag)) {
      case 1:
        return (
          St(i.type) && Io(), (r = i.flags), r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
        );
      case 3:
        return (
          os(),
          Ie(xt),
          Ie(st),
          Ec(),
          (r = i.flags),
          (r & 65536) !== 0 && (r & 128) === 0 ? ((i.flags = (r & -65537) | 128), i) : null
        );
      case 5:
        return kc(i), null;
      case 13:
        if ((Ie(Pe), (r = i.memoizedState), r !== null && r.dehydrated !== null)) {
          if (i.alternate === null) throw Error(n(340));
          ns();
        }
        return (r = i.flags), r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null;
      case 19:
        return Ie(Pe), null;
      case 4:
        return os(), null;
      case 10:
        return vc(i.type._context), null;
      case 22:
      case 23:
        return ru(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Yo = !1,
    lt = !1,
    $0 = typeof WeakSet == 'function' ? WeakSet : Set,
    ee = null;
  function as(r, i) {
    var a = r.ref;
    if (a !== null)
      if (typeof a == 'function')
        try {
          a(null);
        } catch (f) {
          Be(r, i, f);
        }
      else a.current = null;
  }
  function Vc(r, i, a) {
    try {
      a();
    } catch (f) {
      Be(r, i, f);
    }
  }
  var gp = !1;
  function P0(r, i) {
    if (((rc = vo), (r = Qd()), Ga(r))) {
      if ('selectionStart' in r) var a = { start: r.selectionStart, end: r.selectionEnd };
      else
        e: {
          a = ((a = r.ownerDocument) && a.defaultView) || window;
          var f = a.getSelection && a.getSelection();
          if (f && f.rangeCount !== 0) {
            a = f.anchorNode;
            var p = f.anchorOffset,
              g = f.focusNode;
            f = f.focusOffset;
            try {
              a.nodeType, g.nodeType;
            } catch {
              a = null;
              break e;
            }
            var k = 0,
              E = -1,
              N = -1,
              $ = 0,
              V = 0,
              K = r,
              H = null;
            t: for (;;) {
              for (
                var Y;
                K !== a || (p !== 0 && K.nodeType !== 3) || (E = k + p),
                  K !== g || (f !== 0 && K.nodeType !== 3) || (N = k + f),
                  K.nodeType === 3 && (k += K.nodeValue.length),
                  (Y = K.firstChild) !== null;

              )
                (H = K), (K = Y);
              for (;;) {
                if (K === r) break t;
                if (
                  (H === a && ++$ === p && (E = k),
                  H === g && ++V === f && (N = k),
                  (Y = K.nextSibling) !== null)
                )
                  break;
                (K = H), (H = K.parentNode);
              }
              K = Y;
            }
            a = E === -1 || N === -1 ? null : { start: E, end: N };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (sc = { focusedElem: r, selectionRange: a }, vo = !1, ee = i; ee !== null; )
      if (((i = ee), (r = i.child), (i.subtreeFlags & 1028) !== 0 && r !== null))
        (r.return = i), (ee = r);
      else
        for (; ee !== null; ) {
          i = ee;
          try {
            var te = i.alternate;
            if ((i.flags & 1024) !== 0)
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (te !== null) {
                    var ne = te.memoizedProps,
                      He = te.memoizedState,
                      j = i.stateNode,
                      A = j.getSnapshotBeforeUpdate(
                        i.elementType === i.type ? ne : tn(i.type, ne),
                        He
                      );
                    j.__reactInternalSnapshotBeforeUpdate = A;
                  }
                  break;
                case 3:
                  var M = i.stateNode.containerInfo;
                  M.nodeType === 1
                    ? (M.textContent = '')
                    : M.nodeType === 9 && M.documentElement && M.removeChild(M.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(n(163));
              }
          } catch (G) {
            Be(i, i.return, G);
          }
          if (((r = i.sibling), r !== null)) {
            (r.return = i.return), (ee = r);
            break;
          }
          ee = i.return;
        }
    return (te = gp), (gp = !1), te;
  }
  function Ti(r, i, a) {
    var f = i.updateQueue;
    if (((f = f !== null ? f.lastEffect : null), f !== null)) {
      var p = (f = f.next);
      do {
        if ((p.tag & r) === r) {
          var g = p.destroy;
          (p.destroy = void 0), g !== void 0 && Vc(i, a, g);
        }
        p = p.next;
      } while (p !== f);
    }
  }
  function Zo(r, i) {
    if (((i = i.updateQueue), (i = i !== null ? i.lastEffect : null), i !== null)) {
      var a = (i = i.next);
      do {
        if ((a.tag & r) === r) {
          var f = a.create;
          a.destroy = f();
        }
        a = a.next;
      } while (a !== i);
    }
  }
  function Wc(r) {
    var i = r.ref;
    if (i !== null) {
      var a = r.stateNode;
      switch (r.tag) {
        case 5:
          r = a;
          break;
        default:
          r = a;
      }
      typeof i == 'function' ? i(r) : (i.current = r);
    }
  }
  function yp(r) {
    var i = r.alternate;
    i !== null && ((r.alternate = null), yp(i)),
      (r.child = null),
      (r.deletions = null),
      (r.sibling = null),
      r.tag === 5 &&
        ((i = r.stateNode),
        i !== null && (delete i[fn], delete i[mi], delete i[ac], delete i[v0], delete i[w0])),
      (r.stateNode = null),
      (r.return = null),
      (r.dependencies = null),
      (r.memoizedProps = null),
      (r.memoizedState = null),
      (r.pendingProps = null),
      (r.stateNode = null),
      (r.updateQueue = null);
  }
  function vp(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function wp(r) {
    e: for (;;) {
      for (; r.sibling === null; ) {
        if (r.return === null || vp(r.return)) return null;
        r = r.return;
      }
      for (
        r.sibling.return = r.return, r = r.sibling;
        r.tag !== 5 && r.tag !== 6 && r.tag !== 18;

      ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        (r.child.return = r), (r = r.child);
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function Kc(r, i, a) {
    var f = r.tag;
    if (f === 5 || f === 6)
      (r = r.stateNode),
        i
          ? a.nodeType === 8
            ? a.parentNode.insertBefore(r, i)
            : a.insertBefore(r, i)
          : (a.nodeType === 8
              ? ((i = a.parentNode), i.insertBefore(r, a))
              : ((i = a), i.appendChild(r)),
            (a = a._reactRootContainer),
            a != null || i.onclick !== null || (i.onclick = Lo));
    else if (f !== 4 && ((r = r.child), r !== null))
      for (Kc(r, i, a), r = r.sibling; r !== null; ) Kc(r, i, a), (r = r.sibling);
  }
  function Qc(r, i, a) {
    var f = r.tag;
    if (f === 5 || f === 6) (r = r.stateNode), i ? a.insertBefore(r, i) : a.appendChild(r);
    else if (f !== 4 && ((r = r.child), r !== null))
      for (Qc(r, i, a), r = r.sibling; r !== null; ) Qc(r, i, a), (r = r.sibling);
  }
  var tt = null,
    nn = !1;
  function Gn(r, i, a) {
    for (a = a.child; a !== null; ) xp(r, i, a), (a = a.sibling);
  }
  function xp(r, i, a) {
    if (un && typeof un.onCommitFiberUnmount == 'function')
      try {
        un.onCommitFiberUnmount(fo, a);
      } catch {}
    switch (a.tag) {
      case 5:
        lt || as(a, i);
      case 6:
        var f = tt,
          p = nn;
        (tt = null),
          Gn(r, i, a),
          (tt = f),
          (nn = p),
          tt !== null &&
            (nn
              ? ((r = tt),
                (a = a.stateNode),
                r.nodeType === 8 ? r.parentNode.removeChild(a) : r.removeChild(a))
              : tt.removeChild(a.stateNode));
        break;
      case 18:
        tt !== null &&
          (nn
            ? ((r = tt),
              (a = a.stateNode),
              r.nodeType === 8 ? lc(r.parentNode, a) : r.nodeType === 1 && lc(r, a),
              si(r))
            : lc(tt, a.stateNode));
        break;
      case 4:
        (f = tt),
          (p = nn),
          (tt = a.stateNode.containerInfo),
          (nn = !0),
          Gn(r, i, a),
          (tt = f),
          (nn = p);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!lt && ((f = a.updateQueue), f !== null && ((f = f.lastEffect), f !== null))) {
          p = f = f.next;
          do {
            var g = p,
              k = g.destroy;
            (g = g.tag),
              k !== void 0 && ((g & 2) !== 0 || (g & 4) !== 0) && Vc(a, i, k),
              (p = p.next);
          } while (p !== f);
        }
        Gn(r, i, a);
        break;
      case 1:
        if (!lt && (as(a, i), (f = a.stateNode), typeof f.componentWillUnmount == 'function'))
          try {
            (f.props = a.memoizedProps), (f.state = a.memoizedState), f.componentWillUnmount();
          } catch (E) {
            Be(a, i, E);
          }
        Gn(r, i, a);
        break;
      case 21:
        Gn(r, i, a);
        break;
      case 22:
        a.mode & 1
          ? ((lt = (f = lt) || a.memoizedState !== null), Gn(r, i, a), (lt = f))
          : Gn(r, i, a);
        break;
      default:
        Gn(r, i, a);
    }
  }
  function Sp(r) {
    var i = r.updateQueue;
    if (i !== null) {
      r.updateQueue = null;
      var a = r.stateNode;
      a === null && (a = r.stateNode = new $0()),
        i.forEach(function (f) {
          var p = V0.bind(null, r, f);
          a.has(f) || (a.add(f), f.then(p, p));
        });
    }
  }
  function rn(r, i) {
    var a = i.deletions;
    if (a !== null)
      for (var f = 0; f < a.length; f++) {
        var p = a[f];
        try {
          var g = r,
            k = i,
            E = k;
          e: for (; E !== null; ) {
            switch (E.tag) {
              case 5:
                (tt = E.stateNode), (nn = !1);
                break e;
              case 3:
                (tt = E.stateNode.containerInfo), (nn = !0);
                break e;
              case 4:
                (tt = E.stateNode.containerInfo), (nn = !0);
                break e;
            }
            E = E.return;
          }
          if (tt === null) throw Error(n(160));
          xp(g, k, p), (tt = null), (nn = !1);
          var N = p.alternate;
          N !== null && (N.return = null), (p.return = null);
        } catch ($) {
          Be(p, i, $);
        }
      }
    if (i.subtreeFlags & 12854) for (i = i.child; i !== null; ) _p(i, r), (i = i.sibling);
  }
  function _p(r, i) {
    var a = r.alternate,
      f = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((rn(i, r), pn(r), f & 4)) {
          try {
            Ti(3, r, r.return), Zo(3, r);
          } catch (ne) {
            Be(r, r.return, ne);
          }
          try {
            Ti(5, r, r.return);
          } catch (ne) {
            Be(r, r.return, ne);
          }
        }
        break;
      case 1:
        rn(i, r), pn(r), f & 512 && a !== null && as(a, a.return);
        break;
      case 5:
        if ((rn(i, r), pn(r), f & 512 && a !== null && as(a, a.return), r.flags & 32)) {
          var p = r.stateNode;
          try {
            le(p, '');
          } catch (ne) {
            Be(r, r.return, ne);
          }
        }
        if (f & 4 && ((p = r.stateNode), p != null)) {
          var g = r.memoizedProps,
            k = a !== null ? a.memoizedProps : g,
            E = r.type,
            N = r.updateQueue;
          if (((r.updateQueue = null), N !== null))
            try {
              E === 'input' && g.type === 'radio' && g.name != null && io(p, g), Ea(E, k);
              var $ = Ea(E, g);
              for (k = 0; k < N.length; k += 2) {
                var V = N[k],
                  K = N[k + 1];
                V === 'style'
                  ? sd(p, K)
                  : V === 'dangerouslySetInnerHTML'
                    ? Qs(p, K)
                    : V === 'children'
                      ? le(p, K)
                      : O(p, V, K, $);
              }
              switch (E) {
                case 'input':
                  Vs(p, g);
                  break;
                case 'textarea':
                  Pn(p, g);
                  break;
                case 'select':
                  var H = p._wrapperState.wasMultiple;
                  p._wrapperState.wasMultiple = !!g.multiple;
                  var Y = g.value;
                  Y != null
                    ? $n(p, !!g.multiple, Y, !1)
                    : H !== !!g.multiple &&
                      (g.defaultValue != null
                        ? $n(p, !!g.multiple, g.defaultValue, !0)
                        : $n(p, !!g.multiple, g.multiple ? [] : '', !1));
              }
              p[mi] = g;
            } catch (ne) {
              Be(r, r.return, ne);
            }
        }
        break;
      case 6:
        if ((rn(i, r), pn(r), f & 4)) {
          if (r.stateNode === null) throw Error(n(162));
          (p = r.stateNode), (g = r.memoizedProps);
          try {
            p.nodeValue = g;
          } catch (ne) {
            Be(r, r.return, ne);
          }
        }
        break;
      case 3:
        if ((rn(i, r), pn(r), f & 4 && a !== null && a.memoizedState.isDehydrated))
          try {
            si(i.containerInfo);
          } catch (ne) {
            Be(r, r.return, ne);
          }
        break;
      case 4:
        rn(i, r), pn(r);
        break;
      case 13:
        rn(i, r),
          pn(r),
          (p = r.child),
          p.flags & 8192 &&
            ((g = p.memoizedState !== null),
            (p.stateNode.isHidden = g),
            !g || (p.alternate !== null && p.alternate.memoizedState !== null) || (Jc = qe())),
          f & 4 && Sp(r);
        break;
      case 22:
        if (
          ((V = a !== null && a.memoizedState !== null),
          r.mode & 1 ? ((lt = ($ = lt) || V), rn(i, r), (lt = $)) : rn(i, r),
          pn(r),
          f & 8192)
        ) {
          if (
            (($ = r.memoizedState !== null), (r.stateNode.isHidden = $) && !V && (r.mode & 1) !== 0)
          )
            for (ee = r, V = r.child; V !== null; ) {
              for (K = ee = V; ee !== null; ) {
                switch (((H = ee), (Y = H.child), H.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Ti(4, H, H.return);
                    break;
                  case 1:
                    as(H, H.return);
                    var te = H.stateNode;
                    if (typeof te.componentWillUnmount == 'function') {
                      (f = H), (a = H.return);
                      try {
                        (i = f),
                          (te.props = i.memoizedProps),
                          (te.state = i.memoizedState),
                          te.componentWillUnmount();
                      } catch (ne) {
                        Be(f, a, ne);
                      }
                    }
                    break;
                  case 5:
                    as(H, H.return);
                    break;
                  case 22:
                    if (H.memoizedState !== null) {
                      Ep(K);
                      continue;
                    }
                }
                Y !== null ? ((Y.return = H), (ee = Y)) : Ep(K);
              }
              V = V.sibling;
            }
          e: for (V = null, K = r; ; ) {
            if (K.tag === 5) {
              if (V === null) {
                V = K;
                try {
                  (p = K.stateNode),
                    $
                      ? ((g = p.style),
                        typeof g.setProperty == 'function'
                          ? g.setProperty('display', 'none', 'important')
                          : (g.display = 'none'))
                      : ((E = K.stateNode),
                        (N = K.memoizedProps.style),
                        (k = N != null && N.hasOwnProperty('display') ? N.display : null),
                        (E.style.display = rd('display', k)));
                } catch (ne) {
                  Be(r, r.return, ne);
                }
              }
            } else if (K.tag === 6) {
              if (V === null)
                try {
                  K.stateNode.nodeValue = $ ? '' : K.memoizedProps;
                } catch (ne) {
                  Be(r, r.return, ne);
                }
            } else if (
              ((K.tag !== 22 && K.tag !== 23) || K.memoizedState === null || K === r) &&
              K.child !== null
            ) {
              (K.child.return = K), (K = K.child);
              continue;
            }
            if (K === r) break e;
            for (; K.sibling === null; ) {
              if (K.return === null || K.return === r) break e;
              V === K && (V = null), (K = K.return);
            }
            V === K && (V = null), (K.sibling.return = K.return), (K = K.sibling);
          }
        }
        break;
      case 19:
        rn(i, r), pn(r), f & 4 && Sp(r);
        break;
      case 21:
        break;
      default:
        rn(i, r), pn(r);
    }
  }
  function pn(r) {
    var i = r.flags;
    if (i & 2) {
      try {
        e: {
          for (var a = r.return; a !== null; ) {
            if (vp(a)) {
              var f = a;
              break e;
            }
            a = a.return;
          }
          throw Error(n(160));
        }
        switch (f.tag) {
          case 5:
            var p = f.stateNode;
            f.flags & 32 && (le(p, ''), (f.flags &= -33));
            var g = wp(r);
            Qc(r, g, p);
            break;
          case 3:
          case 4:
            var k = f.stateNode.containerInfo,
              E = wp(r);
            Kc(r, E, k);
            break;
          default:
            throw Error(n(161));
        }
      } catch (N) {
        Be(r, r.return, N);
      }
      r.flags &= -3;
    }
    i & 4096 && (r.flags &= -4097);
  }
  function R0(r, i, a) {
    (ee = r), kp(r);
  }
  function kp(r, i, a) {
    for (var f = (r.mode & 1) !== 0; ee !== null; ) {
      var p = ee,
        g = p.child;
      if (p.tag === 22 && f) {
        var k = p.memoizedState !== null || Yo;
        if (!k) {
          var E = p.alternate,
            N = (E !== null && E.memoizedState !== null) || lt;
          E = Yo;
          var $ = lt;
          if (((Yo = k), (lt = N) && !$))
            for (ee = p; ee !== null; )
              (k = ee),
                (N = k.child),
                k.tag === 22 && k.memoizedState !== null
                  ? Tp(p)
                  : N !== null
                    ? ((N.return = k), (ee = N))
                    : Tp(p);
          for (; g !== null; ) (ee = g), kp(g), (g = g.sibling);
          (ee = p), (Yo = E), (lt = $);
        }
        bp(r);
      } else (p.subtreeFlags & 8772) !== 0 && g !== null ? ((g.return = p), (ee = g)) : bp(r);
    }
  }
  function bp(r) {
    for (; ee !== null; ) {
      var i = ee;
      if ((i.flags & 8772) !== 0) {
        var a = i.alternate;
        try {
          if ((i.flags & 8772) !== 0)
            switch (i.tag) {
              case 0:
              case 11:
              case 15:
                lt || Zo(5, i);
                break;
              case 1:
                var f = i.stateNode;
                if (i.flags & 4 && !lt)
                  if (a === null) f.componentDidMount();
                  else {
                    var p =
                      i.elementType === i.type ? a.memoizedProps : tn(i.type, a.memoizedProps);
                    f.componentDidUpdate(p, a.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
                  }
                var g = i.updateQueue;
                g !== null && Eh(i, g, f);
                break;
              case 3:
                var k = i.updateQueue;
                if (k !== null) {
                  if (((a = null), i.child !== null))
                    switch (i.child.tag) {
                      case 5:
                        a = i.child.stateNode;
                        break;
                      case 1:
                        a = i.child.stateNode;
                    }
                  Eh(i, k, a);
                }
                break;
              case 5:
                var E = i.stateNode;
                if (a === null && i.flags & 4) {
                  a = E;
                  var N = i.memoizedProps;
                  switch (i.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      N.autoFocus && a.focus();
                      break;
                    case 'img':
                      N.src && (a.src = N.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (i.memoizedState === null) {
                  var $ = i.alternate;
                  if ($ !== null) {
                    var V = $.memoizedState;
                    if (V !== null) {
                      var K = V.dehydrated;
                      K !== null && si(K);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(n(163));
            }
          lt || (i.flags & 512 && Wc(i));
        } catch (H) {
          Be(i, i.return, H);
        }
      }
      if (i === r) {
        ee = null;
        break;
      }
      if (((a = i.sibling), a !== null)) {
        (a.return = i.return), (ee = a);
        break;
      }
      ee = i.return;
    }
  }
  function Ep(r) {
    for (; ee !== null; ) {
      var i = ee;
      if (i === r) {
        ee = null;
        break;
      }
      var a = i.sibling;
      if (a !== null) {
        (a.return = i.return), (ee = a);
        break;
      }
      ee = i.return;
    }
  }
  function Tp(r) {
    for (; ee !== null; ) {
      var i = ee;
      try {
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            var a = i.return;
            try {
              Zo(4, i);
            } catch (N) {
              Be(i, a, N);
            }
            break;
          case 1:
            var f = i.stateNode;
            if (typeof f.componentDidMount == 'function') {
              var p = i.return;
              try {
                f.componentDidMount();
              } catch (N) {
                Be(i, p, N);
              }
            }
            var g = i.return;
            try {
              Wc(i);
            } catch (N) {
              Be(i, g, N);
            }
            break;
          case 5:
            var k = i.return;
            try {
              Wc(i);
            } catch (N) {
              Be(i, k, N);
            }
        }
      } catch (N) {
        Be(i, i.return, N);
      }
      if (i === r) {
        ee = null;
        break;
      }
      var E = i.sibling;
      if (E !== null) {
        (E.return = i.return), (ee = E);
        break;
      }
      ee = i.return;
    }
  }
  var D0 = Math.ceil,
    el = R.ReactCurrentDispatcher,
    Gc = R.ReactCurrentOwner,
    qt = R.ReactCurrentBatchConfig,
    we = 0,
    Ye = null,
    We = null,
    nt = 0,
    $t = 0,
    cs = Hn(0),
    Ge = 0,
    Ni = null,
    xr = 0,
    tl = 0,
    Xc = 0,
    Ci = null,
    kt = null,
    Jc = 0,
    us = 1 / 0,
    Tn = null,
    nl = !1,
    Yc = null,
    Xn = null,
    rl = !1,
    Jn = null,
    sl = 0,
    Ai = 0,
    Zc = null,
    il = -1,
    ol = 0;
  function ht() {
    return (we & 6) !== 0 ? qe() : il !== -1 ? il : (il = qe());
  }
  function Yn(r) {
    return (r.mode & 1) === 0
      ? 1
      : (we & 2) !== 0 && nt !== 0
        ? nt & -nt
        : S0.transition !== null
          ? (ol === 0 && (ol = wd()), ol)
          : ((r = Ee), r !== 0 || ((r = window.event), (r = r === void 0 ? 16 : Cd(r.type))), r);
  }
  function sn(r, i, a, f) {
    if (50 < Ai) throw ((Ai = 0), (Zc = null), Error(n(185)));
    Zs(r, a, f),
      ((we & 2) === 0 || r !== Ye) &&
        (r === Ye && ((we & 2) === 0 && (tl |= a), Ge === 4 && Zn(r, nt)),
        bt(r, f),
        a === 1 && we === 0 && (i.mode & 1) === 0 && ((us = qe() + 500), Mo && Wn()));
  }
  function bt(r, i) {
    var a = r.callbackNode;
    Sw(r, i);
    var f = mo(r, r === Ye ? nt : 0);
    if (f === 0) a !== null && gd(a), (r.callbackNode = null), (r.callbackPriority = 0);
    else if (((i = f & -f), r.callbackPriority !== i)) {
      if ((a != null && gd(a), i === 1))
        r.tag === 0 ? x0(Cp.bind(null, r)) : hh(Cp.bind(null, r)),
          g0(function () {
            (we & 6) === 0 && Wn();
          }),
          (a = null);
      else {
        switch (xd(f)) {
          case 1:
            a = Ia;
            break;
          case 4:
            a = yd;
            break;
          case 16:
            a = uo;
            break;
          case 536870912:
            a = vd;
            break;
          default:
            a = uo;
        }
        a = Pp(a, Np.bind(null, r));
      }
      (r.callbackPriority = i), (r.callbackNode = a);
    }
  }
  function Np(r, i) {
    if (((il = -1), (ol = 0), (we & 6) !== 0)) throw Error(n(327));
    var a = r.callbackNode;
    if (fs() && r.callbackNode !== a) return null;
    var f = mo(r, r === Ye ? nt : 0);
    if (f === 0) return null;
    if ((f & 30) !== 0 || (f & r.expiredLanes) !== 0 || i) i = ll(r, f);
    else {
      i = f;
      var p = we;
      we |= 2;
      var g = Lp();
      (Ye !== r || nt !== i) && ((Tn = null), (us = qe() + 500), _r(r, i));
      do
        try {
          B0();
          break;
        } catch (E) {
          Ap(r, E);
        }
      while (!0);
      yc(), (el.current = g), (we = p), We !== null ? (i = 0) : ((Ye = null), (nt = 0), (i = Ge));
    }
    if (i !== 0) {
      if ((i === 2 && ((p = Oa(r)), p !== 0 && ((f = p), (i = eu(r, p)))), i === 1))
        throw ((a = Ni), _r(r, 0), Zn(r, f), bt(r, qe()), a);
      if (i === 6) Zn(r, f);
      else {
        if (
          ((p = r.current.alternate),
          (f & 30) === 0 &&
            !F0(p) &&
            ((i = ll(r, f)),
            i === 2 && ((g = Oa(r)), g !== 0 && ((f = g), (i = eu(r, g)))),
            i === 1))
        )
          throw ((a = Ni), _r(r, 0), Zn(r, f), bt(r, qe()), a);
        switch (((r.finishedWork = p), (r.finishedLanes = f), i)) {
          case 0:
          case 1:
            throw Error(n(345));
          case 2:
            kr(r, kt, Tn);
            break;
          case 3:
            if ((Zn(r, f), (f & 130023424) === f && ((i = Jc + 500 - qe()), 10 < i))) {
              if (mo(r, 0) !== 0) break;
              if (((p = r.suspendedLanes), (p & f) !== f)) {
                ht(), (r.pingedLanes |= r.suspendedLanes & p);
                break;
              }
              r.timeoutHandle = oc(kr.bind(null, r, kt, Tn), i);
              break;
            }
            kr(r, kt, Tn);
            break;
          case 4:
            if ((Zn(r, f), (f & 4194240) === f)) break;
            for (i = r.eventTimes, p = -1; 0 < f; ) {
              var k = 31 - Yt(f);
              (g = 1 << k), (k = i[k]), k > p && (p = k), (f &= ~g);
            }
            if (
              ((f = p),
              (f = qe() - f),
              (f =
                (120 > f
                  ? 120
                  : 480 > f
                    ? 480
                    : 1080 > f
                      ? 1080
                      : 1920 > f
                        ? 1920
                        : 3e3 > f
                          ? 3e3
                          : 4320 > f
                            ? 4320
                            : 1960 * D0(f / 1960)) - f),
              10 < f)
            ) {
              r.timeoutHandle = oc(kr.bind(null, r, kt, Tn), f);
              break;
            }
            kr(r, kt, Tn);
            break;
          case 5:
            kr(r, kt, Tn);
            break;
          default:
            throw Error(n(329));
        }
      }
    }
    return bt(r, qe()), r.callbackNode === a ? Np.bind(null, r) : null;
  }
  function eu(r, i) {
    var a = Ci;
    return (
      r.current.memoizedState.isDehydrated && (_r(r, i).flags |= 256),
      (r = ll(r, i)),
      r !== 2 && ((i = kt), (kt = a), i !== null && tu(i)),
      r
    );
  }
  function tu(r) {
    kt === null ? (kt = r) : kt.push.apply(kt, r);
  }
  function F0(r) {
    for (var i = r; ; ) {
      if (i.flags & 16384) {
        var a = i.updateQueue;
        if (a !== null && ((a = a.stores), a !== null))
          for (var f = 0; f < a.length; f++) {
            var p = a[f],
              g = p.getSnapshot;
            p = p.value;
            try {
              if (!Zt(g(), p)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((a = i.child), i.subtreeFlags & 16384 && a !== null)) (a.return = i), (i = a);
      else {
        if (i === r) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === r) return !0;
          i = i.return;
        }
        (i.sibling.return = i.return), (i = i.sibling);
      }
    }
    return !0;
  }
  function Zn(r, i) {
    for (
      i &= ~Xc, i &= ~tl, r.suspendedLanes |= i, r.pingedLanes &= ~i, r = r.expirationTimes;
      0 < i;

    ) {
      var a = 31 - Yt(i),
        f = 1 << a;
      (r[a] = -1), (i &= ~f);
    }
  }
  function Cp(r) {
    if ((we & 6) !== 0) throw Error(n(327));
    fs();
    var i = mo(r, 0);
    if ((i & 1) === 0) return bt(r, qe()), null;
    var a = ll(r, i);
    if (r.tag !== 0 && a === 2) {
      var f = Oa(r);
      f !== 0 && ((i = f), (a = eu(r, f)));
    }
    if (a === 1) throw ((a = Ni), _r(r, 0), Zn(r, i), bt(r, qe()), a);
    if (a === 6) throw Error(n(345));
    return (
      (r.finishedWork = r.current.alternate),
      (r.finishedLanes = i),
      kr(r, kt, Tn),
      bt(r, qe()),
      null
    );
  }
  function nu(r, i) {
    var a = we;
    we |= 1;
    try {
      return r(i);
    } finally {
      (we = a), we === 0 && ((us = qe() + 500), Mo && Wn());
    }
  }
  function Sr(r) {
    Jn !== null && Jn.tag === 0 && (we & 6) === 0 && fs();
    var i = we;
    we |= 1;
    var a = qt.transition,
      f = Ee;
    try {
      if (((qt.transition = null), (Ee = 1), r)) return r();
    } finally {
      (Ee = f), (qt.transition = a), (we = i), (we & 6) === 0 && Wn();
    }
  }
  function ru() {
    ($t = cs.current), Ie(cs);
  }
  function _r(r, i) {
    (r.finishedWork = null), (r.finishedLanes = 0);
    var a = r.timeoutHandle;
    if ((a !== -1 && ((r.timeoutHandle = -1), m0(a)), We !== null))
      for (a = We.return; a !== null; ) {
        var f = a;
        switch ((dc(f), f.tag)) {
          case 1:
            (f = f.type.childContextTypes), f != null && Io();
            break;
          case 3:
            os(), Ie(xt), Ie(st), Ec();
            break;
          case 5:
            kc(f);
            break;
          case 4:
            os();
            break;
          case 13:
            Ie(Pe);
            break;
          case 19:
            Ie(Pe);
            break;
          case 10:
            vc(f.type._context);
            break;
          case 22:
          case 23:
            ru();
        }
        a = a.return;
      }
    if (
      ((Ye = r),
      (We = r = er(r.current, null)),
      (nt = $t = i),
      (Ge = 0),
      (Ni = null),
      (Xc = tl = xr = 0),
      (kt = Ci = null),
      yr !== null)
    ) {
      for (i = 0; i < yr.length; i++)
        if (((a = yr[i]), (f = a.interleaved), f !== null)) {
          a.interleaved = null;
          var p = f.next,
            g = a.pending;
          if (g !== null) {
            var k = g.next;
            (g.next = p), (f.next = k);
          }
          a.pending = f;
        }
      yr = null;
    }
    return r;
  }
  function Ap(r, i) {
    do {
      var a = We;
      try {
        if ((yc(), (Ho.current = Qo), Vo)) {
          for (var f = Re.memoizedState; f !== null; ) {
            var p = f.queue;
            p !== null && (p.pending = null), (f = f.next);
          }
          Vo = !1;
        }
        if (
          ((wr = 0),
          (Je = Qe = Re = null),
          (Si = !1),
          (_i = 0),
          (Gc.current = null),
          a === null || a.return === null)
        ) {
          (Ge = 1), (Ni = i), (We = null);
          break;
        }
        e: {
          var g = r,
            k = a.return,
            E = a,
            N = i;
          if (
            ((i = nt),
            (E.flags |= 32768),
            N !== null && typeof N == 'object' && typeof N.then == 'function')
          ) {
            var $ = N,
              V = E,
              K = V.tag;
            if ((V.mode & 1) === 0 && (K === 0 || K === 11 || K === 15)) {
              var H = V.alternate;
              H
                ? ((V.updateQueue = H.updateQueue),
                  (V.memoizedState = H.memoizedState),
                  (V.lanes = H.lanes))
                : ((V.updateQueue = null), (V.memoizedState = null));
            }
            var Y = ep(k);
            if (Y !== null) {
              (Y.flags &= -257), tp(Y, k, E, g, i), Y.mode & 1 && Zh(g, $, i), (i = Y), (N = $);
              var te = i.updateQueue;
              if (te === null) {
                var ne = new Set();
                ne.add(N), (i.updateQueue = ne);
              } else te.add(N);
              break e;
            } else {
              if ((i & 1) === 0) {
                Zh(g, $, i), su();
                break e;
              }
              N = Error(n(426));
            }
          } else if (Oe && E.mode & 1) {
            var He = ep(k);
            if (He !== null) {
              (He.flags & 65536) === 0 && (He.flags |= 256), tp(He, k, E, g, i), mc(ls(N, E));
              break e;
            }
          }
          (g = N = ls(N, E)), Ge !== 4 && (Ge = 2), Ci === null ? (Ci = [g]) : Ci.push(g), (g = k);
          do {
            switch (g.tag) {
              case 3:
                (g.flags |= 65536), (i &= -i), (g.lanes |= i);
                var j = Jh(g, N, i);
                bh(g, j);
                break e;
              case 1:
                E = N;
                var A = g.type,
                  M = g.stateNode;
                if (
                  (g.flags & 128) === 0 &&
                  (typeof A.getDerivedStateFromError == 'function' ||
                    (M !== null &&
                      typeof M.componentDidCatch == 'function' &&
                      (Xn === null || !Xn.has(M))))
                ) {
                  (g.flags |= 65536), (i &= -i), (g.lanes |= i);
                  var G = Yh(g, E, i);
                  bh(g, G);
                  break e;
                }
            }
            g = g.return;
          } while (g !== null);
        }
        Ip(a);
      } catch (re) {
        (i = re), We === a && a !== null && (We = a = a.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Lp() {
    var r = el.current;
    return (el.current = Qo), r === null ? Qo : r;
  }
  function su() {
    (Ge === 0 || Ge === 3 || Ge === 2) && (Ge = 4),
      Ye === null || ((xr & 268435455) === 0 && (tl & 268435455) === 0) || Zn(Ye, nt);
  }
  function ll(r, i) {
    var a = we;
    we |= 2;
    var f = Lp();
    (Ye !== r || nt !== i) && ((Tn = null), _r(r, i));
    do
      try {
        z0();
        break;
      } catch (p) {
        Ap(r, p);
      }
    while (!0);
    if ((yc(), (we = a), (el.current = f), We !== null)) throw Error(n(261));
    return (Ye = null), (nt = 0), Ge;
  }
  function z0() {
    for (; We !== null; ) jp(We);
  }
  function B0() {
    for (; We !== null && !dw(); ) jp(We);
  }
  function jp(r) {
    var i = $p(r.alternate, r, $t);
    (r.memoizedProps = r.pendingProps), i === null ? Ip(r) : (We = i), (Gc.current = null);
  }
  function Ip(r) {
    var i = r;
    do {
      var a = i.alternate;
      if (((r = i.return), (i.flags & 32768) === 0)) {
        if (((a = O0(a, i, $t)), a !== null)) {
          We = a;
          return;
        }
      } else {
        if (((a = M0(a, i)), a !== null)) {
          (a.flags &= 32767), (We = a);
          return;
        }
        if (r !== null) (r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null);
        else {
          (Ge = 6), (We = null);
          return;
        }
      }
      if (((i = i.sibling), i !== null)) {
        We = i;
        return;
      }
      We = i = r;
    } while (i !== null);
    Ge === 0 && (Ge = 5);
  }
  function kr(r, i, a) {
    var f = Ee,
      p = qt.transition;
    try {
      (qt.transition = null), (Ee = 1), U0(r, i, a, f);
    } finally {
      (qt.transition = p), (Ee = f);
    }
    return null;
  }
  function U0(r, i, a, f) {
    do fs();
    while (Jn !== null);
    if ((we & 6) !== 0) throw Error(n(327));
    a = r.finishedWork;
    var p = r.finishedLanes;
    if (a === null) return null;
    if (((r.finishedWork = null), (r.finishedLanes = 0), a === r.current)) throw Error(n(177));
    (r.callbackNode = null), (r.callbackPriority = 0);
    var g = a.lanes | a.childLanes;
    if (
      (_w(r, g),
      r === Ye && ((We = Ye = null), (nt = 0)),
      ((a.subtreeFlags & 2064) === 0 && (a.flags & 2064) === 0) ||
        rl ||
        ((rl = !0),
        Pp(uo, function () {
          return fs(), null;
        })),
      (g = (a.flags & 15990) !== 0),
      (a.subtreeFlags & 15990) !== 0 || g)
    ) {
      (g = qt.transition), (qt.transition = null);
      var k = Ee;
      Ee = 1;
      var E = we;
      (we |= 4),
        (Gc.current = null),
        P0(r, a),
        _p(a, r),
        a0(sc),
        (vo = !!rc),
        (sc = rc = null),
        (r.current = a),
        R0(a),
        hw(),
        (we = E),
        (Ee = k),
        (qt.transition = g);
    } else r.current = a;
    if (
      (rl && ((rl = !1), (Jn = r), (sl = p)),
      (g = r.pendingLanes),
      g === 0 && (Xn = null),
      gw(a.stateNode),
      bt(r, qe()),
      i !== null)
    )
      for (f = r.onRecoverableError, a = 0; a < i.length; a++)
        (p = i[a]), f(p.value, { componentStack: p.stack, digest: p.digest });
    if (nl) throw ((nl = !1), (r = Yc), (Yc = null), r);
    return (
      (sl & 1) !== 0 && r.tag !== 0 && fs(),
      (g = r.pendingLanes),
      (g & 1) !== 0 ? (r === Zc ? Ai++ : ((Ai = 0), (Zc = r))) : (Ai = 0),
      Wn(),
      null
    );
  }
  function fs() {
    if (Jn !== null) {
      var r = xd(sl),
        i = qt.transition,
        a = Ee;
      try {
        if (((qt.transition = null), (Ee = 16 > r ? 16 : r), Jn === null)) var f = !1;
        else {
          if (((r = Jn), (Jn = null), (sl = 0), (we & 6) !== 0)) throw Error(n(331));
          var p = we;
          for (we |= 4, ee = r.current; ee !== null; ) {
            var g = ee,
              k = g.child;
            if ((ee.flags & 16) !== 0) {
              var E = g.deletions;
              if (E !== null) {
                for (var N = 0; N < E.length; N++) {
                  var $ = E[N];
                  for (ee = $; ee !== null; ) {
                    var V = ee;
                    switch (V.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ti(8, V, g);
                    }
                    var K = V.child;
                    if (K !== null) (K.return = V), (ee = K);
                    else
                      for (; ee !== null; ) {
                        V = ee;
                        var H = V.sibling,
                          Y = V.return;
                        if ((yp(V), V === $)) {
                          ee = null;
                          break;
                        }
                        if (H !== null) {
                          (H.return = Y), (ee = H);
                          break;
                        }
                        ee = Y;
                      }
                  }
                }
                var te = g.alternate;
                if (te !== null) {
                  var ne = te.child;
                  if (ne !== null) {
                    te.child = null;
                    do {
                      var He = ne.sibling;
                      (ne.sibling = null), (ne = He);
                    } while (ne !== null);
                  }
                }
                ee = g;
              }
            }
            if ((g.subtreeFlags & 2064) !== 0 && k !== null) (k.return = g), (ee = k);
            else
              e: for (; ee !== null; ) {
                if (((g = ee), (g.flags & 2048) !== 0))
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ti(9, g, g.return);
                  }
                var j = g.sibling;
                if (j !== null) {
                  (j.return = g.return), (ee = j);
                  break e;
                }
                ee = g.return;
              }
          }
          var A = r.current;
          for (ee = A; ee !== null; ) {
            k = ee;
            var M = k.child;
            if ((k.subtreeFlags & 2064) !== 0 && M !== null) (M.return = k), (ee = M);
            else
              e: for (k = A; ee !== null; ) {
                if (((E = ee), (E.flags & 2048) !== 0))
                  try {
                    switch (E.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Zo(9, E);
                    }
                  } catch (re) {
                    Be(E, E.return, re);
                  }
                if (E === k) {
                  ee = null;
                  break e;
                }
                var G = E.sibling;
                if (G !== null) {
                  (G.return = E.return), (ee = G);
                  break e;
                }
                ee = E.return;
              }
          }
          if (((we = p), Wn(), un && typeof un.onPostCommitFiberRoot == 'function'))
            try {
              un.onPostCommitFiberRoot(fo, r);
            } catch {}
          f = !0;
        }
        return f;
      } finally {
        (Ee = a), (qt.transition = i);
      }
    }
    return !1;
  }
  function Op(r, i, a) {
    (i = ls(a, i)),
      (i = Jh(r, i, 1)),
      (r = Qn(r, i, 1)),
      (i = ht()),
      r !== null && (Zs(r, 1, i), bt(r, i));
  }
  function Be(r, i, a) {
    if (r.tag === 3) Op(r, r, a);
    else
      for (; i !== null; ) {
        if (i.tag === 3) {
          Op(i, r, a);
          break;
        } else if (i.tag === 1) {
          var f = i.stateNode;
          if (
            typeof i.type.getDerivedStateFromError == 'function' ||
            (typeof f.componentDidCatch == 'function' && (Xn === null || !Xn.has(f)))
          ) {
            (r = ls(a, r)),
              (r = Yh(i, r, 1)),
              (i = Qn(i, r, 1)),
              (r = ht()),
              i !== null && (Zs(i, 1, r), bt(i, r));
            break;
          }
        }
        i = i.return;
      }
  }
  function q0(r, i, a) {
    var f = r.pingCache;
    f !== null && f.delete(i),
      (i = ht()),
      (r.pingedLanes |= r.suspendedLanes & a),
      Ye === r &&
        (nt & a) === a &&
        (Ge === 4 || (Ge === 3 && (nt & 130023424) === nt && 500 > qe() - Jc)
          ? _r(r, 0)
          : (Xc |= a)),
      bt(r, i);
  }
  function Mp(r, i) {
    i === 0 &&
      ((r.mode & 1) === 0
        ? (i = 1)
        : ((i = po), (po <<= 1), (po & 130023424) === 0 && (po = 4194304)));
    var a = ht();
    (r = kn(r, i)), r !== null && (Zs(r, i, a), bt(r, a));
  }
  function H0(r) {
    var i = r.memoizedState,
      a = 0;
    i !== null && (a = i.retryLane), Mp(r, a);
  }
  function V0(r, i) {
    var a = 0;
    switch (r.tag) {
      case 13:
        var f = r.stateNode,
          p = r.memoizedState;
        p !== null && (a = p.retryLane);
        break;
      case 19:
        f = r.stateNode;
        break;
      default:
        throw Error(n(314));
    }
    f !== null && f.delete(i), Mp(r, a);
  }
  var $p;
  $p = function (r, i, a) {
    if (r !== null)
      if (r.memoizedProps !== i.pendingProps || xt.current) _t = !0;
      else {
        if ((r.lanes & a) === 0 && (i.flags & 128) === 0) return (_t = !1), I0(r, i, a);
        _t = (r.flags & 131072) !== 0;
      }
    else (_t = !1), Oe && (i.flags & 1048576) !== 0 && ph(i, Po, i.index);
    switch (((i.lanes = 0), i.tag)) {
      case 2:
        var f = i.type;
        Jo(r, i), (r = i.pendingProps);
        var p = Zr(i, st.current);
        is(i, a), (p = Cc(null, i, f, r, p, a));
        var g = Ac();
        return (
          (i.flags |= 1),
          typeof p == 'object' &&
          p !== null &&
          typeof p.render == 'function' &&
          p.$$typeof === void 0
            ? ((i.tag = 1),
              (i.memoizedState = null),
              (i.updateQueue = null),
              St(f) ? ((g = !0), Oo(i)) : (g = !1),
              (i.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null),
              Sc(i),
              (p.updater = Go),
              (i.stateNode = p),
              (p._reactInternals = i),
              $c(i, f, r, a),
              (i = Fc(null, i, f, !0, g, a)))
            : ((i.tag = 0), Oe && g && fc(i), dt(null, i, p, a), (i = i.child)),
          i
        );
      case 16:
        f = i.elementType;
        e: {
          switch (
            (Jo(r, i),
            (r = i.pendingProps),
            (p = f._init),
            (f = p(f._payload)),
            (i.type = f),
            (p = i.tag = K0(f)),
            (r = tn(f, r)),
            p)
          ) {
            case 0:
              i = Dc(null, i, f, r, a);
              break e;
            case 1:
              i = lp(null, i, f, r, a);
              break e;
            case 11:
              i = np(null, i, f, r, a);
              break e;
            case 14:
              i = rp(null, i, f, tn(f.type, r), a);
              break e;
          }
          throw Error(n(306, f, ''));
        }
        return i;
      case 0:
        return (
          (f = i.type),
          (p = i.pendingProps),
          (p = i.elementType === f ? p : tn(f, p)),
          Dc(r, i, f, p, a)
        );
      case 1:
        return (
          (f = i.type),
          (p = i.pendingProps),
          (p = i.elementType === f ? p : tn(f, p)),
          lp(r, i, f, p, a)
        );
      case 3:
        e: {
          if ((ap(i), r === null)) throw Error(n(387));
          (f = i.pendingProps), (g = i.memoizedState), (p = g.element), kh(r, i), Uo(i, f, null, a);
          var k = i.memoizedState;
          if (((f = k.element), g.isDehydrated))
            if (
              ((g = {
                element: f,
                isDehydrated: !1,
                cache: k.cache,
                pendingSuspenseBoundaries: k.pendingSuspenseBoundaries,
                transitions: k.transitions,
              }),
              (i.updateQueue.baseState = g),
              (i.memoizedState = g),
              i.flags & 256)
            ) {
              (p = ls(Error(n(423)), i)), (i = cp(r, i, f, a, p));
              break e;
            } else if (f !== p) {
              (p = ls(Error(n(424)), i)), (i = cp(r, i, f, a, p));
              break e;
            } else
              for (
                Mt = qn(i.stateNode.containerInfo.firstChild),
                  Ot = i,
                  Oe = !0,
                  en = null,
                  a = Sh(i, null, f, a),
                  i.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
          else {
            if ((ns(), f === p)) {
              i = En(r, i, a);
              break e;
            }
            dt(r, i, f, a);
          }
          i = i.child;
        }
        return i;
      case 5:
        return (
          Th(i),
          r === null && pc(i),
          (f = i.type),
          (p = i.pendingProps),
          (g = r !== null ? r.memoizedProps : null),
          (k = p.children),
          ic(f, p) ? (k = null) : g !== null && ic(f, g) && (i.flags |= 32),
          op(r, i),
          dt(r, i, k, a),
          i.child
        );
      case 6:
        return r === null && pc(i), null;
      case 13:
        return up(r, i, a);
      case 4:
        return (
          _c(i, i.stateNode.containerInfo),
          (f = i.pendingProps),
          r === null ? (i.child = rs(i, null, f, a)) : dt(r, i, f, a),
          i.child
        );
      case 11:
        return (
          (f = i.type),
          (p = i.pendingProps),
          (p = i.elementType === f ? p : tn(f, p)),
          np(r, i, f, p, a)
        );
      case 7:
        return dt(r, i, i.pendingProps, a), i.child;
      case 8:
        return dt(r, i, i.pendingProps.children, a), i.child;
      case 12:
        return dt(r, i, i.pendingProps.children, a), i.child;
      case 10:
        e: {
          if (
            ((f = i.type._context),
            (p = i.pendingProps),
            (g = i.memoizedProps),
            (k = p.value),
            Ae(Fo, f._currentValue),
            (f._currentValue = k),
            g !== null)
          )
            if (Zt(g.value, k)) {
              if (g.children === p.children && !xt.current) {
                i = En(r, i, a);
                break e;
              }
            } else
              for (g = i.child, g !== null && (g.return = i); g !== null; ) {
                var E = g.dependencies;
                if (E !== null) {
                  k = g.child;
                  for (var N = E.firstContext; N !== null; ) {
                    if (N.context === f) {
                      if (g.tag === 1) {
                        (N = bn(-1, a & -a)), (N.tag = 2);
                        var $ = g.updateQueue;
                        if ($ !== null) {
                          $ = $.shared;
                          var V = $.pending;
                          V === null ? (N.next = N) : ((N.next = V.next), (V.next = N)),
                            ($.pending = N);
                        }
                      }
                      (g.lanes |= a),
                        (N = g.alternate),
                        N !== null && (N.lanes |= a),
                        wc(g.return, a, i),
                        (E.lanes |= a);
                      break;
                    }
                    N = N.next;
                  }
                } else if (g.tag === 10) k = g.type === i.type ? null : g.child;
                else if (g.tag === 18) {
                  if (((k = g.return), k === null)) throw Error(n(341));
                  (k.lanes |= a),
                    (E = k.alternate),
                    E !== null && (E.lanes |= a),
                    wc(k, a, i),
                    (k = g.sibling);
                } else k = g.child;
                if (k !== null) k.return = g;
                else
                  for (k = g; k !== null; ) {
                    if (k === i) {
                      k = null;
                      break;
                    }
                    if (((g = k.sibling), g !== null)) {
                      (g.return = k.return), (k = g);
                      break;
                    }
                    k = k.return;
                  }
                g = k;
              }
          dt(r, i, p.children, a), (i = i.child);
        }
        return i;
      case 9:
        return (
          (p = i.type),
          (f = i.pendingProps.children),
          is(i, a),
          (p = Bt(p)),
          (f = f(p)),
          (i.flags |= 1),
          dt(r, i, f, a),
          i.child
        );
      case 14:
        return (f = i.type), (p = tn(f, i.pendingProps)), (p = tn(f.type, p)), rp(r, i, f, p, a);
      case 15:
        return sp(r, i, i.type, i.pendingProps, a);
      case 17:
        return (
          (f = i.type),
          (p = i.pendingProps),
          (p = i.elementType === f ? p : tn(f, p)),
          Jo(r, i),
          (i.tag = 1),
          St(f) ? ((r = !0), Oo(i)) : (r = !1),
          is(i, a),
          Gh(i, f, p),
          $c(i, f, p, a),
          Fc(null, i, f, !0, r, a)
        );
      case 19:
        return dp(r, i, a);
      case 22:
        return ip(r, i, a);
    }
    throw Error(n(156, i.tag));
  };
  function Pp(r, i) {
    return md(r, i);
  }
  function W0(r, i, a, f) {
    (this.tag = r),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = i),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = f),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Ht(r, i, a, f) {
    return new W0(r, i, a, f);
  }
  function iu(r) {
    return (r = r.prototype), !(!r || !r.isReactComponent);
  }
  function K0(r) {
    if (typeof r == 'function') return iu(r) ? 1 : 0;
    if (r != null) {
      if (((r = r.$$typeof), r === z)) return 11;
      if (r === Te) return 14;
    }
    return 2;
  }
  function er(r, i) {
    var a = r.alternate;
    return (
      a === null
        ? ((a = Ht(r.tag, i, r.key, r.mode)),
          (a.elementType = r.elementType),
          (a.type = r.type),
          (a.stateNode = r.stateNode),
          (a.alternate = r),
          (r.alternate = a))
        : ((a.pendingProps = i),
          (a.type = r.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = r.flags & 14680064),
      (a.childLanes = r.childLanes),
      (a.lanes = r.lanes),
      (a.child = r.child),
      (a.memoizedProps = r.memoizedProps),
      (a.memoizedState = r.memoizedState),
      (a.updateQueue = r.updateQueue),
      (i = r.dependencies),
      (a.dependencies = i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }),
      (a.sibling = r.sibling),
      (a.index = r.index),
      (a.ref = r.ref),
      a
    );
  }
  function al(r, i, a, f, p, g) {
    var k = 2;
    if (((f = r), typeof r == 'function')) iu(r) && (k = 1);
    else if (typeof r == 'string') k = 5;
    else
      e: switch (r) {
        case U:
          return br(a.children, p, g, i);
        case B:
          (k = 8), (p |= 8);
          break;
        case I:
          return (r = Ht(12, a, i, p | 2)), (r.elementType = I), (r.lanes = g), r;
        case J:
          return (r = Ht(13, a, i, p)), (r.elementType = J), (r.lanes = g), r;
        case de:
          return (r = Ht(19, a, i, p)), (r.elementType = de), (r.lanes = g), r;
        case ye:
          return cl(a, p, g, i);
        default:
          if (typeof r == 'object' && r !== null)
            switch (r.$$typeof) {
              case Q:
                k = 10;
                break e;
              case W:
                k = 9;
                break e;
              case z:
                k = 11;
                break e;
              case Te:
                k = 14;
                break e;
              case Le:
                (k = 16), (f = null);
                break e;
            }
          throw Error(n(130, r == null ? r : typeof r, ''));
      }
    return (i = Ht(k, a, i, p)), (i.elementType = r), (i.type = f), (i.lanes = g), i;
  }
  function br(r, i, a, f) {
    return (r = Ht(7, r, f, i)), (r.lanes = a), r;
  }
  function cl(r, i, a, f) {
    return (
      (r = Ht(22, r, f, i)),
      (r.elementType = ye),
      (r.lanes = a),
      (r.stateNode = { isHidden: !1 }),
      r
    );
  }
  function ou(r, i, a) {
    return (r = Ht(6, r, null, i)), (r.lanes = a), r;
  }
  function lu(r, i, a) {
    return (
      (i = Ht(4, r.children !== null ? r.children : [], r.key, i)),
      (i.lanes = a),
      (i.stateNode = {
        containerInfo: r.containerInfo,
        pendingChildren: null,
        implementation: r.implementation,
      }),
      i
    );
  }
  function Q0(r, i, a, f, p) {
    (this.tag = i),
      (this.containerInfo = r),
      (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Ma(0)),
      (this.expirationTimes = Ma(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ma(0)),
      (this.identifierPrefix = f),
      (this.onRecoverableError = p),
      (this.mutableSourceEagerHydrationData = null);
  }
  function au(r, i, a, f, p, g, k, E, N) {
    return (
      (r = new Q0(r, i, a, E, N)),
      i === 1 ? ((i = 1), g === !0 && (i |= 8)) : (i = 0),
      (g = Ht(3, null, null, i)),
      (r.current = g),
      (g.stateNode = r),
      (g.memoizedState = {
        element: f,
        isDehydrated: a,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Sc(g),
      r
    );
  }
  function G0(r, i, a) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: F,
      key: f == null ? null : '' + f,
      children: r,
      containerInfo: i,
      implementation: a,
    };
  }
  function Rp(r) {
    if (!r) return Vn;
    r = r._reactInternals;
    e: {
      if (dr(r) !== r || r.tag !== 1) throw Error(n(170));
      var i = r;
      do {
        switch (i.tag) {
          case 3:
            i = i.stateNode.context;
            break e;
          case 1:
            if (St(i.type)) {
              i = i.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        i = i.return;
      } while (i !== null);
      throw Error(n(171));
    }
    if (r.tag === 1) {
      var a = r.type;
      if (St(a)) return fh(r, a, i);
    }
    return i;
  }
  function Dp(r, i, a, f, p, g, k, E, N) {
    return (
      (r = au(a, f, !0, r, p, g, k, E, N)),
      (r.context = Rp(null)),
      (a = r.current),
      (f = ht()),
      (p = Yn(a)),
      (g = bn(f, p)),
      (g.callback = i ?? null),
      Qn(a, g, p),
      (r.current.lanes = p),
      Zs(r, p, f),
      bt(r, f),
      r
    );
  }
  function ul(r, i, a, f) {
    var p = i.current,
      g = ht(),
      k = Yn(p);
    return (
      (a = Rp(a)),
      i.context === null ? (i.context = a) : (i.pendingContext = a),
      (i = bn(g, k)),
      (i.payload = { element: r }),
      (f = f === void 0 ? null : f),
      f !== null && (i.callback = f),
      (r = Qn(p, i, k)),
      r !== null && (sn(r, p, k, g), Bo(r, p, k)),
      k
    );
  }
  function fl(r) {
    if (((r = r.current), !r.child)) return null;
    switch (r.child.tag) {
      case 5:
        return r.child.stateNode;
      default:
        return r.child.stateNode;
    }
  }
  function Fp(r, i) {
    if (((r = r.memoizedState), r !== null && r.dehydrated !== null)) {
      var a = r.retryLane;
      r.retryLane = a !== 0 && a < i ? a : i;
    }
  }
  function cu(r, i) {
    Fp(r, i), (r = r.alternate) && Fp(r, i);
  }
  function X0() {
    return null;
  }
  var zp =
    typeof reportError == 'function'
      ? reportError
      : function (r) {
          console.error(r);
        };
  function uu(r) {
    this._internalRoot = r;
  }
  (dl.prototype.render = uu.prototype.render =
    function (r) {
      var i = this._internalRoot;
      if (i === null) throw Error(n(409));
      ul(r, i, null, null);
    }),
    (dl.prototype.unmount = uu.prototype.unmount =
      function () {
        var r = this._internalRoot;
        if (r !== null) {
          this._internalRoot = null;
          var i = r.containerInfo;
          Sr(function () {
            ul(null, r, null, null);
          }),
            (i[wn] = null);
        }
      });
  function dl(r) {
    this._internalRoot = r;
  }
  dl.prototype.unstable_scheduleHydration = function (r) {
    if (r) {
      var i = kd();
      r = { blockedOn: null, target: r, priority: i };
      for (var a = 0; a < zn.length && i !== 0 && i < zn[a].priority; a++);
      zn.splice(a, 0, r), a === 0 && Td(r);
    }
  };
  function fu(r) {
    return !(!r || (r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11));
  }
  function hl(r) {
    return !(
      !r ||
      (r.nodeType !== 1 &&
        r.nodeType !== 9 &&
        r.nodeType !== 11 &&
        (r.nodeType !== 8 || r.nodeValue !== ' react-mount-point-unstable '))
    );
  }
  function Bp() {}
  function J0(r, i, a, f, p) {
    if (p) {
      if (typeof f == 'function') {
        var g = f;
        f = function () {
          var $ = fl(k);
          g.call($);
        };
      }
      var k = Dp(i, f, r, 0, null, !1, !1, '', Bp);
      return (
        (r._reactRootContainer = k),
        (r[wn] = k.current),
        hi(r.nodeType === 8 ? r.parentNode : r),
        Sr(),
        k
      );
    }
    for (; (p = r.lastChild); ) r.removeChild(p);
    if (typeof f == 'function') {
      var E = f;
      f = function () {
        var $ = fl(N);
        E.call($);
      };
    }
    var N = au(r, 0, !1, null, null, !1, !1, '', Bp);
    return (
      (r._reactRootContainer = N),
      (r[wn] = N.current),
      hi(r.nodeType === 8 ? r.parentNode : r),
      Sr(function () {
        ul(i, N, a, f);
      }),
      N
    );
  }
  function pl(r, i, a, f, p) {
    var g = a._reactRootContainer;
    if (g) {
      var k = g;
      if (typeof p == 'function') {
        var E = p;
        p = function () {
          var N = fl(k);
          E.call(N);
        };
      }
      ul(i, k, r, p);
    } else k = J0(a, i, r, p, f);
    return fl(k);
  }
  (Sd = function (r) {
    switch (r.tag) {
      case 3:
        var i = r.stateNode;
        if (i.current.memoizedState.isDehydrated) {
          var a = Ys(i.pendingLanes);
          a !== 0 && ($a(i, a | 1), bt(i, qe()), (we & 6) === 0 && ((us = qe() + 500), Wn()));
        }
        break;
      case 13:
        Sr(function () {
          var f = kn(r, 1);
          if (f !== null) {
            var p = ht();
            sn(f, r, 1, p);
          }
        }),
          cu(r, 1);
    }
  }),
    (Pa = function (r) {
      if (r.tag === 13) {
        var i = kn(r, 134217728);
        if (i !== null) {
          var a = ht();
          sn(i, r, 134217728, a);
        }
        cu(r, 134217728);
      }
    }),
    (_d = function (r) {
      if (r.tag === 13) {
        var i = Yn(r),
          a = kn(r, i);
        if (a !== null) {
          var f = ht();
          sn(a, r, i, f);
        }
        cu(r, i);
      }
    }),
    (kd = function () {
      return Ee;
    }),
    (bd = function (r, i) {
      var a = Ee;
      try {
        return (Ee = r), i();
      } finally {
        Ee = a;
      }
    }),
    (Ca = function (r, i, a) {
      switch (i) {
        case 'input':
          if ((Vs(r, a), (i = a.name), a.type === 'radio' && i != null)) {
            for (a = r; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll('input[name=' + JSON.stringify('' + i) + '][type="radio"]'),
                i = 0;
              i < a.length;
              i++
            ) {
              var f = a[i];
              if (f !== r && f.form === r.form) {
                var p = jo(f);
                if (!p) throw Error(n(90));
                Hs(f), Vs(f, p);
              }
            }
          }
          break;
        case 'textarea':
          Pn(r, a);
          break;
        case 'select':
          (i = a.value), i != null && $n(r, !!a.multiple, i, !1);
      }
    }),
    (ad = nu),
    (cd = Sr);
  var Y0 = { usingClientEntryPoint: !1, Events: [gi, Jr, jo, od, ld, nu] },
    Li = {
      findFiberByHostInstance: hr,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    Z0 = {
      bundleType: Li.bundleType,
      version: Li.version,
      rendererPackageName: Li.rendererPackageName,
      rendererConfig: Li.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: R.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (r) {
        return (r = hd(r)), r === null ? null : r.stateNode;
      },
      findFiberByHostInstance: Li.findFiberByHostInstance || X0,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ml = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ml.isDisabled && ml.supportsFiber)
      try {
        (fo = ml.inject(Z0)), (un = ml);
      } catch {}
  }
  return (
    (Et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y0),
    (Et.createPortal = function (r, i) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!fu(i)) throw Error(n(200));
      return G0(r, i, null, a);
    }),
    (Et.createRoot = function (r, i) {
      if (!fu(r)) throw Error(n(299));
      var a = !1,
        f = '',
        p = zp;
      return (
        i != null &&
          (i.unstable_strictMode === !0 && (a = !0),
          i.identifierPrefix !== void 0 && (f = i.identifierPrefix),
          i.onRecoverableError !== void 0 && (p = i.onRecoverableError)),
        (i = au(r, 1, !1, null, null, a, !1, f, p)),
        (r[wn] = i.current),
        hi(r.nodeType === 8 ? r.parentNode : r),
        new uu(i)
      );
    }),
    (Et.findDOMNode = function (r) {
      if (r == null) return null;
      if (r.nodeType === 1) return r;
      var i = r._reactInternals;
      if (i === void 0)
        throw typeof r.render == 'function'
          ? Error(n(188))
          : ((r = Object.keys(r).join(',')), Error(n(268, r)));
      return (r = hd(i)), (r = r === null ? null : r.stateNode), r;
    }),
    (Et.flushSync = function (r) {
      return Sr(r);
    }),
    (Et.hydrate = function (r, i, a) {
      if (!hl(i)) throw Error(n(200));
      return pl(null, r, i, !0, a);
    }),
    (Et.hydrateRoot = function (r, i, a) {
      if (!fu(r)) throw Error(n(405));
      var f = (a != null && a.hydratedSources) || null,
        p = !1,
        g = '',
        k = zp;
      if (
        (a != null &&
          (a.unstable_strictMode === !0 && (p = !0),
          a.identifierPrefix !== void 0 && (g = a.identifierPrefix),
          a.onRecoverableError !== void 0 && (k = a.onRecoverableError)),
        (i = Dp(i, null, r, 1, a ?? null, p, !1, g, k)),
        (r[wn] = i.current),
        hi(r),
        f)
      )
        for (r = 0; r < f.length; r++)
          (a = f[r]),
            (p = a._getVersion),
            (p = p(a._source)),
            i.mutableSourceEagerHydrationData == null
              ? (i.mutableSourceEagerHydrationData = [a, p])
              : i.mutableSourceEagerHydrationData.push(a, p);
      return new dl(i);
    }),
    (Et.render = function (r, i, a) {
      if (!hl(i)) throw Error(n(200));
      return pl(null, r, i, !1, a);
    }),
    (Et.unmountComponentAtNode = function (r) {
      if (!hl(r)) throw Error(n(40));
      return r._reactRootContainer
        ? (Sr(function () {
            pl(null, null, r, !1, function () {
              (r._reactRootContainer = null), (r[wn] = null);
            });
          }),
          !0)
        : !1;
    }),
    (Et.unstable_batchedUpdates = nu),
    (Et.unstable_renderSubtreeIntoContainer = function (r, i, a, f) {
      if (!hl(a)) throw Error(n(200));
      if (r == null || r._reactInternals === void 0) throw Error(n(38));
      return pl(r, i, a, !1, f);
    }),
    (Et.version = '18.3.1-next-f1338f8080-20240426'),
    Et
  );
}
var Jp;
function gx() {
  if (Jp) return pu.exports;
  Jp = 1;
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (e) {
        console.error(e);
      }
  }
  return t(), (pu.exports = mx()), pu.exports;
}
var Yp;
function yx() {
  if (Yp) return gl;
  Yp = 1;
  var t = gx();
  return (gl.createRoot = t.createRoot), (gl.hydrateRoot = t.hydrateRoot), gl;
}
var vT = yx();
const vx = '_attach',
  Bi = Symbol('context'),
  cg = Symbol('nextInContext'),
  ug = Symbol('prevByEndTime'),
  fg = Symbol('nextByStartTime'),
  Zp = Symbol('events');
class wT {
  constructor(e) {
    xe(this, 'startTime');
    xe(this, 'endTime');
    xe(this, 'browserName');
    xe(this, 'channel');
    xe(this, 'platform');
    xe(this, 'wallTime');
    xe(this, 'title');
    xe(this, 'options');
    xe(this, 'pages');
    xe(this, 'actions');
    xe(this, 'attachments');
    xe(this, 'visibleAttachments');
    xe(this, 'events');
    xe(this, 'stdio');
    xe(this, 'errors');
    xe(this, 'errorDescriptors');
    xe(this, 'hasSource');
    xe(this, 'hasStepData');
    xe(this, 'sdkLanguage');
    xe(this, 'testIdAttributeName');
    xe(this, 'sources');
    xe(this, 'resources');
    e.forEach(s => wx(s));
    const n = e.find(s => s.origin === 'library');
    (this.browserName = (n == null ? void 0 : n.browserName) || ''),
      (this.sdkLanguage = n == null ? void 0 : n.sdkLanguage),
      (this.channel = n == null ? void 0 : n.channel),
      (this.testIdAttributeName = n == null ? void 0 : n.testIdAttributeName),
      (this.platform = (n == null ? void 0 : n.platform) || ''),
      (this.title = (n == null ? void 0 : n.title) || ''),
      (this.options = (n == null ? void 0 : n.options) || {}),
      (this.actions = xx(e)),
      (this.pages = [].concat(...e.map(s => s.pages))),
      (this.wallTime = e
        .map(s => s.wallTime)
        .reduce((s, o) => Math.min(s || Number.MAX_VALUE, o), Number.MAX_VALUE)),
      (this.startTime = e.map(s => s.startTime).reduce((s, o) => Math.min(s, o), Number.MAX_VALUE)),
      (this.endTime = e.map(s => s.endTime).reduce((s, o) => Math.max(s, o), Number.MIN_VALUE)),
      (this.events = [].concat(...e.map(s => s.events))),
      (this.stdio = [].concat(...e.map(s => s.stdio))),
      (this.errors = [].concat(...e.map(s => s.errors))),
      (this.hasSource = e.some(s => s.hasSource)),
      (this.hasStepData = e.some(s => s.origin === 'testRunner')),
      (this.resources = [...e.map(s => s.resources)].flat()),
      (this.attachments = this.actions.flatMap(s => {
        var o;
        return (
          ((o = s.attachments) == null
            ? void 0
            : o.map(l => ({ ...l, traceUrl: s.context.traceUrl }))) ?? []
        );
      })),
      (this.visibleAttachments = this.attachments.filter(s => !s.name.startsWith('_'))),
      this.events.sort((s, o) => s.time - o.time),
      this.resources.sort((s, o) => s._monotonicTime - o._monotonicTime),
      (this.errorDescriptors = this.hasStepData
        ? this._errorDescriptorsFromTestRunner()
        : this._errorDescriptorsFromActions()),
      (this.sources = Ax(this.actions, this.errorDescriptors));
  }
  failedAction() {
    return this.actions.findLast(e => e.error);
  }
  _errorDescriptorsFromActions() {
    var n;
    const e = [];
    for (const s of this.actions || [])
      (n = s.error) != null &&
        n.message &&
        e.push({ action: s, stack: s.stack, message: s.error.message });
    return e;
  }
  _errorDescriptorsFromTestRunner() {
    return this.errors
      .filter(e => !!e.message)
      .map((e, n) => ({
        stack: e.stack,
        message: e.message,
        context: this.attachments.find(s => s.name === `_error-context-${n}`),
      }));
  }
}
function wx(t) {
  for (const n of t.pages) n[Bi] = t;
  for (let n = 0; n < t.actions.length; ++n) {
    const s = t.actions[n];
    s[Bi] = t;
  }
  let e;
  for (let n = t.actions.length - 1; n >= 0; n--) {
    const s = t.actions[n];
    (s[cg] = e), s.apiName.includes('route.') || (e = s);
  }
  for (const n of t.events) n[Bi] = t;
  for (const n of t.resources) n[Bi] = t;
}
function xx(t) {
  const e = new Map();
  for (const o of t) {
    const l = o.traceUrl;
    let c = e.get(l);
    c || ((c = []), e.set(l, c)), c.push(o);
  }
  const n = [];
  let s = 0;
  for (const [, o] of e) {
    e.size > 1 && Sx(o, ++s);
    const l = _x(o);
    n.push(...l);
  }
  n.sort((o, l) =>
    l.parentId === o.callId ? 1 : o.parentId === l.callId ? -1 : o.endTime - l.endTime
  );
  for (let o = 1; o < n.length; ++o) n[o][ug] = n[o - 1];
  n.sort((o, l) =>
    l.parentId === o.callId ? -1 : o.parentId === l.callId ? 1 : o.startTime - l.startTime
  );
  for (let o = 0; o + 1 < n.length; ++o) n[o][fg] = n[o + 1];
  return n;
}
function Sx(t, e) {
  for (const n of t)
    for (const s of n.actions)
      s.callId && (s.callId = `${e}:${s.callId}`),
        s.parentId && (s.parentId = `${e}:${s.parentId}`);
}
function _x(t) {
  const e = new Map(),
    n = t.filter(u => u.origin === 'library'),
    s = t.filter(u => u.origin === 'testRunner');
  if (!s.length || !n.length) return t.map(u => u.actions.map(d => ({ ...d, context: u }))).flat();
  const o = n.some(u => u.actions.some(d => !!d.stepId));
  for (const u of n)
    for (const d of u.actions) {
      const h = o ? d.stepId : `${d.apiName}@${d.wallTime}`;
      e.set(h, { ...d, context: u });
    }
  const l = bx(s, e, o);
  l && kx(n, l);
  const c = new Map();
  for (const u of s)
    for (const d of u.actions) {
      const h = o ? d.callId : `${d.apiName}@${d.wallTime}`,
        y = e.get(h);
      if (y) {
        c.set(d.callId, y.callId),
          d.error && (y.error = d.error),
          d.attachments && (y.attachments = d.attachments),
          d.annotations && (y.annotations = d.annotations),
          d.parentId && (y.parentId = c.get(d.parentId) ?? d.parentId),
          (y.startTime = d.startTime),
          (y.endTime = d.endTime);
        continue;
      }
      d.parentId && (d.parentId = c.get(d.parentId) ?? d.parentId), e.set(h, { ...d, context: u });
    }
  return [...e.values()];
}
function kx(t, e) {
  for (const n of t) {
    (n.startTime += e), (n.endTime += e);
    for (const s of n.actions) s.startTime && (s.startTime += e), s.endTime && (s.endTime += e);
    for (const s of n.events) s.time += e;
    for (const s of n.stdio) s.timestamp += e;
    for (const s of n.pages) for (const o of s.screencastFrames) o.timestamp += e;
    for (const s of n.resources) s._monotonicTime && (s._monotonicTime += e);
  }
}
function bx(t, e, n) {
  for (const s of t)
    for (const o of s.actions) {
      if (!o.startTime) continue;
      const l = n ? o.callId : `${o.apiName}@${o.wallTime}`,
        c = e.get(l);
      if (c) return o.startTime - c.startTime;
    }
  return 0;
}
function Ex(t) {
  var s;
  const e = new Map();
  for (const o of t) e.set(o.callId, { id: o.callId, parent: void 0, children: [], action: o });
  const n = { id: '', parent: void 0, children: [] };
  for (const o of e.values()) {
    if ((s = o.action) != null && s.apiName.startsWith(vx)) continue;
    const l = (o.action.parentId && e.get(o.action.parentId)) || n;
    l.children.push(o), (o.parent = l);
  }
  return { rootItem: n, itemMap: e };
}
function ql(t) {
  return t[Bi];
}
function Tx(t) {
  return t[cg];
}
function em(t) {
  return t[ug];
}
function tm(t) {
  return t[fg];
}
function Nx(t) {
  let e = 0,
    n = 0;
  for (const s of Cx(t)) {
    if (s.type === 'console') {
      const o = s.messageType;
      o === 'warning' ? ++n : o === 'error' && ++e;
    }
    s.type === 'event' && s.method === 'pageError' && ++e;
  }
  return { errors: e, warnings: n };
}
function Cx(t) {
  let e = t[Zp];
  if (e) return e;
  const n = Tx(t);
  return (
    (e = ql(t).events.filter(s => s.time >= t.startTime && (!n || s.time < n.startTime))),
    (t[Zp] = e),
    e
  );
}
function Ax(t, e) {
  var s;
  const n = new Map();
  for (const o of t)
    for (const l of o.stack || []) {
      let c = n.get(l.file);
      c || ((c = { errors: [], content: void 0 }), n.set(l.file, c));
    }
  for (const o of e) {
    const { action: l, stack: c, message: u } = o;
    !l ||
      !c ||
      (s = n.get(c[0].file)) == null ||
      s.errors.push({ line: c[0].line || 0, message: u });
  }
  return n;
}
const yu = new Set([
  'page.route',
  'page.routefromhar',
  'page.unroute',
  'page.unrouteall',
  'browsercontext.route',
  'browsercontext.routefromhar',
  'browsercontext.unroute',
  'browsercontext.unrouteall',
]);
{
  for (const t of [...yu]) yu.add(t + 'async');
  for (const t of [
    'page.route_from_har',
    'page.unroute_all',
    'context.route_from_har',
    'context.unroute_all',
  ])
    yu.add(t);
}
const Lx = 50,
  Hl = ({
    sidebarSize: t,
    sidebarHidden: e = !1,
    sidebarIsFirst: n = !1,
    orientation: s = 'vertical',
    minSidebarSize: o = Lx,
    settingName: l,
    sidebar: c,
    main: u,
  }) => {
    const d = Math.max(o, t) * window.devicePixelRatio,
      [h, y] = As(l ? l + '.' + s + ':size' : void 0, d),
      [v, m] = As(l ? l + '.' + s + ':size' : void 0, d),
      [w, S] = P.useState(null),
      [_, b] = Mr();
    let T;
    s === 'vertical'
      ? ((T = v / window.devicePixelRatio), _ && _.height < T && (T = _.height - 10))
      : ((T = h / window.devicePixelRatio), _ && _.width < T && (T = _.width - 10)),
      (document.body.style.userSelect = w ? 'none' : 'inherit');
    let C = {};
    return (
      s === 'vertical'
        ? n
          ? (C = { top: w ? 0 : T - 4, bottom: w ? 0 : void 0, height: w ? 'initial' : 8 })
          : (C = { bottom: w ? 0 : T - 4, top: w ? 0 : void 0, height: w ? 'initial' : 8 })
        : n
          ? (C = { left: w ? 0 : T - 4, right: w ? 0 : void 0, width: w ? 'initial' : 8 })
          : (C = { right: w ? 0 : T - 4, left: w ? 0 : void 0, width: w ? 'initial' : 8 }),
      x.jsxs('div', {
        className: Ue('split-view', s, n && 'sidebar-first'),
        ref: b,
        children: [
          x.jsx('div', { className: 'split-view-main', children: u }),
          !e &&
            x.jsx('div', { style: { flexBasis: T }, className: 'split-view-sidebar', children: c }),
          !e &&
            x.jsx('div', {
              style: C,
              className: 'split-view-resizer',
              onMouseDown: O => S({ offset: s === 'vertical' ? O.clientY : O.clientX, size: T }),
              onMouseUp: () => S(null),
              onMouseMove: O => {
                if (!O.buttons) S(null);
                else if (w) {
                  const D = (s === 'vertical' ? O.clientY : O.clientX) - w.offset,
                    F = n ? w.size + D : w.size - D,
                    B = O.target.parentElement.getBoundingClientRect(),
                    I = Math.min(Math.max(o, F), (s === 'vertical' ? B.height : B.width) - o);
                  s === 'vertical'
                    ? m(I * window.devicePixelRatio)
                    : y(I * window.devicePixelRatio);
                }
              },
            }),
        ],
      })
    );
  };
function Vu(t) {
  var e, n, s, o, l, c, u, d, h;
  if (((t = t ?? globalThis), !t.__playwright_builtins__)) {
    const y = {
      setTimeout: (e = t.setTimeout) == null ? void 0 : e.bind(t),
      clearTimeout: (n = t.clearTimeout) == null ? void 0 : n.bind(t),
      setInterval: (s = t.setInterval) == null ? void 0 : s.bind(t),
      clearInterval: (o = t.clearInterval) == null ? void 0 : o.bind(t),
      requestAnimationFrame: (l = t.requestAnimationFrame) == null ? void 0 : l.bind(t),
      cancelAnimationFrame: (c = t.cancelAnimationFrame) == null ? void 0 : c.bind(t),
      requestIdleCallback: (u = t.requestIdleCallback) == null ? void 0 : u.bind(t),
      cancelIdleCallback: (d = t.cancelIdleCallback) == null ? void 0 : d.bind(t),
      performance: t.performance,
      eval: (h = t.eval) == null ? void 0 : h.bind(t),
      Intl: t.Intl,
      Date: t.Date,
      Map: t.Map,
      Set: t.Set,
    };
    Object.defineProperty(t, '__playwright_builtins__', {
      value: y,
      configurable: !1,
      enumerable: !1,
      writable: !1,
    });
  }
  return t.__playwright_builtins__;
}
const Dt = Vu();
Dt.setTimeout;
Dt.clearTimeout;
Dt.setInterval;
Dt.clearInterval;
const Cl = Dt.requestAnimationFrame,
  nm = Dt.cancelAnimationFrame;
Dt.requestIdleCallback;
Dt.cancelIdleCallback;
const jx = Dt.performance;
Dt.Intl;
Dt.Date;
const be = Dt.Map,
  ke = Dt.Set,
  Ke = function (t, e, n) {
    return t >= e && t <= n;
  };
function Tt(t) {
  return Ke(t, 48, 57);
}
function rm(t) {
  return Tt(t) || Ke(t, 65, 70) || Ke(t, 97, 102);
}
function Ix(t) {
  return Ke(t, 65, 90);
}
function Ox(t) {
  return Ke(t, 97, 122);
}
function Mx(t) {
  return Ix(t) || Ox(t);
}
function $x(t) {
  return t >= 128;
}
function Al(t) {
  return Mx(t) || $x(t) || t === 95;
}
function sm(t) {
  return Al(t) || Tt(t) || t === 45;
}
function Px(t) {
  return Ke(t, 0, 8) || t === 11 || Ke(t, 14, 31) || t === 127;
}
function Ll(t) {
  return t === 10;
}
function Nn(t) {
  return Ll(t) || t === 9 || t === 32;
}
const Rx = 1114111;
class hf extends Error {
  constructor(e) {
    super(e), (this.name = 'InvalidCharacterError');
  }
}
function Dx(t) {
  const e = [];
  for (let n = 0; n < t.length; n++) {
    let s = t.charCodeAt(n);
    if (
      (s === 13 && t.charCodeAt(n + 1) === 10 && ((s = 10), n++),
      (s === 13 || s === 12) && (s = 10),
      s === 0 && (s = 65533),
      Ke(s, 55296, 56319) && Ke(t.charCodeAt(n + 1), 56320, 57343))
    ) {
      const o = s - 55296,
        l = t.charCodeAt(n + 1) - 56320;
      (s = Math.pow(2, 16) + o * Math.pow(2, 10) + l), n++;
    }
    e.push(s);
  }
  return e;
}
function Xe(t) {
  if (t <= 65535) return String.fromCharCode(t);
  t -= Math.pow(2, 16);
  const e = Math.floor(t / Math.pow(2, 10)) + 55296,
    n = (t % Math.pow(2, 10)) + 56320;
  return String.fromCharCode(e) + String.fromCharCode(n);
}
function Fx(t) {
  const e = Dx(t);
  let n = -1;
  const s = [];
  let o;
  const l = function (z) {
      return z >= e.length ? -1 : e[z];
    },
    c = function (z) {
      if ((z === void 0 && (z = 1), z > 3))
        throw 'Spec Error: no more than three codepoints of lookahead.';
      return l(n + z);
    },
    u = function (z) {
      return z === void 0 && (z = 1), (n += z), (o = l(n)), !0;
    },
    d = function () {
      return (n -= 1), !0;
    },
    h = function (z) {
      return z === void 0 && (z = o), z === -1;
    },
    y = function () {
      if ((v(), u(), Nn(o))) {
        for (; Nn(c()); ) u();
        return new Wu();
      } else {
        if (o === 34) return S();
        if (o === 35)
          if (sm(c()) || T(c(1), c(2))) {
            const z = new Tg('');
            return O(c(1), c(2), c(3)) && (z.type = 'id'), (z.value = U()), z;
          } else return new at(o);
        else
          return o === 36
            ? c() === 61
              ? (u(), new qx())
              : new at(o)
            : o === 39
              ? S()
              : o === 40
                ? new Sg()
                : o === 41
                  ? new _g()
                  : o === 42
                    ? c() === 61
                      ? (u(), new Hx())
                      : new at(o)
                    : o === 43
                      ? F()
                        ? (d(), m())
                        : new at(o)
                      : o === 44
                        ? new yg()
                        : o === 45
                          ? F()
                            ? (d(), m())
                            : c(1) === 45 && c(2) === 62
                              ? (u(2), new pg())
                              : R()
                                ? (d(), w())
                                : new at(o)
                          : o === 46
                            ? F()
                              ? (d(), m())
                              : new at(o)
                            : o === 58
                              ? new mg()
                              : o === 59
                                ? new gg()
                                : o === 60
                                  ? c(1) === 33 && c(2) === 45 && c(3) === 45
                                    ? (u(3), new hg())
                                    : new at(o)
                                  : o === 64
                                    ? O(c(1), c(2), c(3))
                                      ? new Eg(U())
                                      : new at(o)
                                    : o === 91
                                      ? new xg()
                                      : o === 92
                                        ? C()
                                          ? (d(), w())
                                          : new at(o)
                                        : o === 93
                                          ? new Ku()
                                          : o === 94
                                            ? c() === 61
                                              ? (u(), new Ux())
                                              : new at(o)
                                            : o === 123
                                              ? new vg()
                                              : o === 124
                                                ? c() === 61
                                                  ? (u(), new Bx())
                                                  : c() === 124
                                                    ? (u(), new kg())
                                                    : new at(o)
                                                : o === 125
                                                  ? new wg()
                                                  : o === 126
                                                    ? c() === 61
                                                      ? (u(), new zx())
                                                      : new at(o)
                                                    : Tt(o)
                                                      ? (d(), m())
                                                      : Al(o)
                                                        ? (d(), w())
                                                        : h()
                                                          ? new Il()
                                                          : new at(o);
      }
    },
    v = function () {
      for (; c(1) === 47 && c(2) === 42; )
        for (u(2); ; )
          if ((u(), o === 42 && c() === 47)) {
            u();
            break;
          } else if (h()) return;
    },
    m = function () {
      const z = B();
      if (O(c(1), c(2), c(3))) {
        const J = new Vx();
        return (J.value = z.value), (J.repr = z.repr), (J.type = z.type), (J.unit = U()), J;
      } else if (c() === 37) {
        u();
        const J = new Lg();
        return (J.value = z.value), (J.repr = z.repr), J;
      } else {
        const J = new Ag();
        return (J.value = z.value), (J.repr = z.repr), (J.type = z.type), J;
      }
    },
    w = function () {
      const z = U();
      if (z.toLowerCase() === 'url' && c() === 40) {
        for (u(); Nn(c(1)) && Nn(c(2)); ) u();
        return c() === 34 || c() === 39
          ? new Ol(z)
          : Nn(c()) && (c(2) === 34 || c(2) === 39)
            ? new Ol(z)
            : _();
      } else return c() === 40 ? (u(), new Ol(z)) : new bg(z);
    },
    S = function (z) {
      z === void 0 && (z = o);
      let J = '';
      for (; u(); ) {
        if (o === z || h()) return new Ng(J);
        if (Ll(o)) return d(), new dg();
        o === 92 ? h(c()) || (Ll(c()) ? u() : (J += Xe(b()))) : (J += Xe(o));
      }
      throw new Error('Internal error');
    },
    _ = function () {
      const z = new Cg('');
      for (; Nn(c()); ) u();
      if (h(c())) return z;
      for (; u(); ) {
        if (o === 41 || h()) return z;
        if (Nn(o)) {
          for (; Nn(c()); ) u();
          return c() === 41 || h(c()) ? (u(), z) : (Q(), new jl());
        } else {
          if (o === 34 || o === 39 || o === 40 || Px(o)) return Q(), new jl();
          if (o === 92)
            if (C()) z.value += Xe(b());
            else return Q(), new jl();
          else z.value += Xe(o);
        }
      }
      throw new Error('Internal error');
    },
    b = function () {
      if ((u(), rm(o))) {
        const z = [o];
        for (let de = 0; de < 5 && rm(c()); de++) u(), z.push(o);
        Nn(c()) && u();
        let J = parseInt(
          z
            .map(function (de) {
              return String.fromCharCode(de);
            })
            .join(''),
          16
        );
        return J > Rx && (J = 65533), J;
      } else return h() ? 65533 : o;
    },
    T = function (z, J) {
      return !(z !== 92 || Ll(J));
    },
    C = function () {
      return T(o, c());
    },
    O = function (z, J, de) {
      return z === 45 ? Al(J) || J === 45 || T(J, de) : Al(z) ? !0 : z === 92 ? T(z, J) : !1;
    },
    R = function () {
      return O(o, c(1), c(2));
    },
    D = function (z, J, de) {
      return z === 43 || z === 45
        ? !!(Tt(J) || (J === 46 && Tt(de)))
        : z === 46
          ? !!Tt(J)
          : !!Tt(z);
    },
    F = function () {
      return D(o, c(1), c(2));
    },
    U = function () {
      let z = '';
      for (; u(); )
        if (sm(o)) z += Xe(o);
        else if (C()) z += Xe(b());
        else return d(), z;
      throw new Error('Internal parse error');
    },
    B = function () {
      let z = '',
        J = 'integer';
      for ((c() === 43 || c() === 45) && (u(), (z += Xe(o))); Tt(c()); ) u(), (z += Xe(o));
      if (c(1) === 46 && Tt(c(2)))
        for (u(), z += Xe(o), u(), z += Xe(o), J = 'number'; Tt(c()); ) u(), (z += Xe(o));
      const de = c(1),
        Te = c(2),
        Le = c(3);
      if ((de === 69 || de === 101) && Tt(Te))
        for (u(), z += Xe(o), u(), z += Xe(o), J = 'number'; Tt(c()); ) u(), (z += Xe(o));
      else if ((de === 69 || de === 101) && (Te === 43 || Te === 45) && Tt(Le))
        for (u(), z += Xe(o), u(), z += Xe(o), u(), z += Xe(o), J = 'number'; Tt(c()); )
          u(), (z += Xe(o));
      const ye = I(z);
      return { type: J, value: ye, repr: z };
    },
    I = function (z) {
      return +z;
    },
    Q = function () {
      for (; u(); ) {
        if (o === 41 || h()) return;
        C() && b();
      }
    };
  let W = 0;
  for (; !h(c()); )
    if ((s.push(y()), W++, W > e.length * 2)) throw new Error("I'm infinite-looping!");
  return s;
}
class Ve {
  constructor() {
    this.tokenType = '';
  }
  toJSON() {
    return { token: this.tokenType };
  }
  toString() {
    return this.tokenType;
  }
  toSource() {
    return '' + this;
  }
}
class dg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = 'BADSTRING');
  }
}
class jl extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = 'BADURL');
  }
}
class Wu extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = 'WHITESPACE');
  }
  toString() {
    return 'WS';
  }
  toSource() {
    return ' ';
  }
}
class hg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = 'CDO');
  }
  toSource() {
    return '<!--';
  }
}
class pg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = 'CDC');
  }
  toSource() {
    return '-->';
  }
}
class mg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = ':');
  }
}
class gg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = ';');
  }
}
class yg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = ',');
  }
}
class Ms extends Ve {
  constructor() {
    super(...arguments), (this.value = ''), (this.mirror = '');
  }
}
class vg extends Ms {
  constructor() {
    super(), (this.tokenType = '{'), (this.value = '{'), (this.mirror = '}');
  }
}
class wg extends Ms {
  constructor() {
    super(), (this.tokenType = '}'), (this.value = '}'), (this.mirror = '{');
  }
}
class xg extends Ms {
  constructor() {
    super(), (this.tokenType = '['), (this.value = '['), (this.mirror = ']');
  }
}
class Ku extends Ms {
  constructor() {
    super(), (this.tokenType = ']'), (this.value = ']'), (this.mirror = '[');
  }
}
class Sg extends Ms {
  constructor() {
    super(), (this.tokenType = '('), (this.value = '('), (this.mirror = ')');
  }
}
class _g extends Ms {
  constructor() {
    super(), (this.tokenType = ')'), (this.value = ')'), (this.mirror = '(');
  }
}
class zx extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = '~=');
  }
}
class Bx extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = '|=');
  }
}
class Ux extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = '^=');
  }
}
class qx extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = '$=');
  }
}
class Hx extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = '*=');
  }
}
class kg extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = '||');
  }
}
class Il extends Ve {
  constructor() {
    super(...arguments), (this.tokenType = 'EOF');
  }
  toSource() {
    return '';
  }
}
class at extends Ve {
  constructor(e) {
    super(), (this.tokenType = 'DELIM'), (this.value = ''), (this.value = Xe(e));
  }
  toString() {
    return 'DELIM(' + this.value + ')';
  }
  toJSON() {
    const e = this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (e.value = this.value), e;
  }
  toSource() {
    return this.value === '\\'
      ? `\\
`
      : this.value;
  }
}
class $s extends Ve {
  constructor() {
    super(...arguments), (this.value = '');
  }
  ASCIIMatch(e) {
    return this.value.toLowerCase() === e.toLowerCase();
  }
  toJSON() {
    const e = this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (e.value = this.value), e;
  }
}
class bg extends $s {
  constructor(e) {
    super(), (this.tokenType = 'IDENT'), (this.value = e);
  }
  toString() {
    return 'IDENT(' + this.value + ')';
  }
  toSource() {
    return eo(this.value);
  }
}
class Ol extends $s {
  constructor(e) {
    super(), (this.tokenType = 'FUNCTION'), (this.value = e), (this.mirror = ')');
  }
  toString() {
    return 'FUNCTION(' + this.value + ')';
  }
  toSource() {
    return eo(this.value) + '(';
  }
}
class Eg extends $s {
  constructor(e) {
    super(), (this.tokenType = 'AT-KEYWORD'), (this.value = e);
  }
  toString() {
    return 'AT(' + this.value + ')';
  }
  toSource() {
    return '@' + eo(this.value);
  }
}
class Tg extends $s {
  constructor(e) {
    super(), (this.tokenType = 'HASH'), (this.value = e), (this.type = 'unrestricted');
  }
  toString() {
    return 'HASH(' + this.value + ')';
  }
  toJSON() {
    const e = this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (e.value = this.value), (e.type = this.type), e;
  }
  toSource() {
    return this.type === 'id' ? '#' + eo(this.value) : '#' + Wx(this.value);
  }
}
class Ng extends $s {
  constructor(e) {
    super(), (this.tokenType = 'STRING'), (this.value = e);
  }
  toString() {
    return '"' + jg(this.value) + '"';
  }
}
class Cg extends $s {
  constructor(e) {
    super(), (this.tokenType = 'URL'), (this.value = e);
  }
  toString() {
    return 'URL(' + this.value + ')';
  }
  toSource() {
    return 'url("' + jg(this.value) + '")';
  }
}
class Ag extends Ve {
  constructor() {
    super(), (this.tokenType = 'NUMBER'), (this.type = 'integer'), (this.repr = '');
  }
  toString() {
    return this.type === 'integer' ? 'INT(' + this.value + ')' : 'NUMBER(' + this.value + ')';
  }
  toJSON() {
    const e = super.toJSON();
    return (e.value = this.value), (e.type = this.type), (e.repr = this.repr), e;
  }
  toSource() {
    return this.repr;
  }
}
class Lg extends Ve {
  constructor() {
    super(), (this.tokenType = 'PERCENTAGE'), (this.repr = '');
  }
  toString() {
    return 'PERCENTAGE(' + this.value + ')';
  }
  toJSON() {
    const e = this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (e.value = this.value), (e.repr = this.repr), e;
  }
  toSource() {
    return this.repr + '%';
  }
}
class Vx extends Ve {
  constructor() {
    super(),
      (this.tokenType = 'DIMENSION'),
      (this.type = 'integer'),
      (this.repr = ''),
      (this.unit = '');
  }
  toString() {
    return 'DIM(' + this.value + ',' + this.unit + ')';
  }
  toJSON() {
    const e = this.constructor.prototype.constructor.prototype.toJSON.call(this);
    return (
      (e.value = this.value), (e.type = this.type), (e.repr = this.repr), (e.unit = this.unit), e
    );
  }
  toSource() {
    const e = this.repr;
    let n = eo(this.unit);
    return (
      n[0].toLowerCase() === 'e' &&
        (n[1] === '-' || Ke(n.charCodeAt(1), 48, 57)) &&
        (n = '\\65 ' + n.slice(1, n.length)),
      e + n
    );
  }
}
function eo(t) {
  t = '' + t;
  let e = '';
  const n = t.charCodeAt(0);
  for (let s = 0; s < t.length; s++) {
    const o = t.charCodeAt(s);
    if (o === 0) throw new hf('Invalid character: the input contains U+0000.');
    Ke(o, 1, 31) ||
    o === 127 ||
    (s === 0 && Ke(o, 48, 57)) ||
    (s === 1 && Ke(o, 48, 57) && n === 45)
      ? (e += '\\' + o.toString(16) + ' ')
      : o >= 128 || o === 45 || o === 95 || Ke(o, 48, 57) || Ke(o, 65, 90) || Ke(o, 97, 122)
        ? (e += t[s])
        : (e += '\\' + t[s]);
  }
  return e;
}
function Wx(t) {
  t = '' + t;
  let e = '';
  for (let n = 0; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 0) throw new hf('Invalid character: the input contains U+0000.');
    s >= 128 || s === 45 || s === 95 || Ke(s, 48, 57) || Ke(s, 65, 90) || Ke(s, 97, 122)
      ? (e += t[n])
      : (e += '\\' + s.toString(16) + ' ');
  }
  return e;
}
function jg(t) {
  t = '' + t;
  let e = '';
  for (let n = 0; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 0) throw new hf('Invalid character: the input contains U+0000.');
    Ke(s, 1, 31) || s === 127
      ? (e += '\\' + s.toString(16) + ' ')
      : s === 34 || s === 92
        ? (e += '\\' + t[n])
        : (e += t[n]);
  }
  return e;
}
class Nt extends Error {}
function Kx(t, e) {
  let n;
  try {
    (n = Fx(t)), n[n.length - 1] instanceof Il || n.push(new Il());
  } catch (I) {
    const Q = I.message + ` while parsing css selector "${t}". Did you mean to CSS.escape it?`,
      W = (I.stack || '').indexOf(I.message);
    throw (
      (W !== -1 &&
        (I.stack = I.stack.substring(0, W) + Q + I.stack.substring(W + I.message.length)),
      (I.message = Q),
      I)
    );
  }
  const s = n.find(
    I =>
      I instanceof Eg ||
      I instanceof dg ||
      I instanceof jl ||
      I instanceof kg ||
      I instanceof hg ||
      I instanceof pg ||
      I instanceof gg ||
      I instanceof vg ||
      I instanceof wg ||
      I instanceof Cg ||
      I instanceof Lg
  );
  if (s)
    throw new Nt(
      `Unsupported token "${s.toSource()}" while parsing css selector "${t}". Did you mean to CSS.escape it?`
    );
  let o = 0;
  const l = new ke();
  function c() {
    return new Nt(
      `Unexpected token "${n[o].toSource()}" while parsing css selector "${t}". Did you mean to CSS.escape it?`
    );
  }
  function u() {
    for (; n[o] instanceof Wu; ) o++;
  }
  function d(I = o) {
    return n[I] instanceof bg;
  }
  function h(I = o) {
    return n[I] instanceof Ng;
  }
  function y(I = o) {
    return n[I] instanceof Ag;
  }
  function v(I = o) {
    return n[I] instanceof yg;
  }
  function m(I = o) {
    return n[I] instanceof Sg;
  }
  function w(I = o) {
    return n[I] instanceof _g;
  }
  function S(I = o) {
    return n[I] instanceof Ol;
  }
  function _(I = o) {
    return n[I] instanceof at && n[I].value === '*';
  }
  function b(I = o) {
    return n[I] instanceof Il;
  }
  function T(I = o) {
    return n[I] instanceof at && ['>', '+', '~'].includes(n[I].value);
  }
  function C(I = o) {
    return v(I) || w(I) || b(I) || T(I) || n[I] instanceof Wu;
  }
  function O() {
    const I = [R()];
    for (; u(), !!v(); ) o++, I.push(R());
    return I;
  }
  function R() {
    return u(), y() || h() ? n[o++].value : D();
  }
  function D() {
    const I = { simples: [] };
    for (
      u(),
        T()
          ? I.simples.push({
              selector: { functions: [{ name: 'scope', args: [] }] },
              combinator: '',
            })
          : I.simples.push({ selector: F(), combinator: '' });
      ;

    ) {
      if ((u(), T())) (I.simples[I.simples.length - 1].combinator = n[o++].value), u();
      else if (C()) break;
      I.simples.push({ combinator: '', selector: F() });
    }
    return I;
  }
  function F() {
    let I = '';
    const Q = [];
    for (; !C(); )
      if (d() || _()) I += n[o++].toSource();
      else if (n[o] instanceof Tg) I += n[o++].toSource();
      else if (n[o] instanceof at && n[o].value === '.')
        if ((o++, d())) I += '.' + n[o++].toSource();
        else throw c();
      else if (n[o] instanceof mg)
        if ((o++, d()))
          if (!e.has(n[o].value.toLowerCase())) I += ':' + n[o++].toSource();
          else {
            const W = n[o++].value.toLowerCase();
            Q.push({ name: W, args: [] }), l.add(W);
          }
        else if (S()) {
          const W = n[o++].value.toLowerCase();
          if (
            (e.has(W) ? (Q.push({ name: W, args: O() }), l.add(W)) : (I += `:${W}(${U()})`),
            u(),
            !w())
          )
            throw c();
          o++;
        } else throw c();
      else if (n[o] instanceof xg) {
        for (I += '[', o++; !(n[o] instanceof Ku) && !b(); ) I += n[o++].toSource();
        if (!(n[o] instanceof Ku)) throw c();
        (I += ']'), o++;
      } else throw c();
    if (!I && !Q.length) throw c();
    return { css: I || void 0, functions: Q };
  }
  function U() {
    let I = '',
      Q = 1;
    for (; !b() && ((m() || S()) && Q++, w() && Q--, !!Q); ) I += n[o++].toSource();
    return I;
  }
  const B = O();
  if (!b()) throw c();
  if (B.some(I => typeof I != 'object' || !('simples' in I)))
    throw new Nt(`Error while parsing css selector "${t}". Did you mean to CSS.escape it?`);
  return { selector: B, names: Array.from(l) };
}
const Qu = new ke([
    'internal:has',
    'internal:has-not',
    'internal:and',
    'internal:or',
    'internal:chain',
    'left-of',
    'right-of',
    'above',
    'below',
    'near',
  ]),
  Qx = new ke(['left-of', 'right-of', 'above', 'below', 'near']),
  Ig = new ke([
    'not',
    'is',
    'where',
    'has',
    'scope',
    'light',
    'visible',
    'text',
    'text-matches',
    'text-is',
    'has-text',
    'above',
    'below',
    'right-of',
    'left-of',
    'near',
    'nth-match',
  ]);
function na(t) {
  const e = Jx(t),
    n = [];
  for (const s of e.parts) {
    if (s.name === 'css' || s.name === 'css:light') {
      s.name === 'css:light' && (s.body = ':light(' + s.body + ')');
      const o = Kx(s.body, Ig);
      n.push({ name: 'css', body: o.selector, source: s.body });
      continue;
    }
    if (Qu.has(s.name)) {
      let o, l;
      try {
        const h = JSON.parse('[' + s.body + ']');
        if (!Array.isArray(h) || h.length < 1 || h.length > 2 || typeof h[0] != 'string')
          throw new Nt(`Malformed selector: ${s.name}=` + s.body);
        if (((o = h[0]), h.length === 2)) {
          if (typeof h[1] != 'number' || !Qx.has(s.name))
            throw new Nt(`Malformed selector: ${s.name}=` + s.body);
          l = h[1];
        }
      } catch {
        throw new Nt(`Malformed selector: ${s.name}=` + s.body);
      }
      const c = { name: s.name, source: s.body, body: { parsed: na(o), distance: l } },
        u = [...c.body.parsed.parts]
          .reverse()
          .find(h => h.name === 'internal:control' && h.body === 'enter-frame'),
        d = u ? c.body.parsed.parts.indexOf(u) : -1;
      d !== -1 &&
        Gx(c.body.parsed.parts.slice(0, d + 1), n.slice(0, d + 1)) &&
        c.body.parsed.parts.splice(0, d + 1),
        n.push(c);
      continue;
    }
    n.push({ ...s, source: s.body });
  }
  if (Qu.has(n[0].name)) throw new Nt(`"${n[0].name}" selector cannot be first`);
  return { capture: e.capture, parts: n };
}
function Gx(t, e) {
  return jn({ parts: t }) === jn({ parts: e });
}
function jn(t, e) {
  return typeof t == 'string'
    ? t
    : t.parts
        .map((n, s) => {
          let o = !0;
          !e &&
            s !== t.capture &&
            (n.name === 'css' ||
              (n.name === 'xpath' && n.source.startsWith('//')) ||
              n.source.startsWith('..')) &&
            (o = !1);
          const l = o ? n.name + '=' : '';
          return `${s === t.capture ? '*' : ''}${l}${n.source}`;
        })
        .join(' >> ');
}
function Xx(t, e) {
  const n = (s, o) => {
    for (const l of s.parts) e(l, o), Qu.has(l.name) && n(l.body.parsed, !0);
  };
  n(t, !1);
}
function Jx(t) {
  let e = 0,
    n,
    s = 0;
  const o = { parts: [] },
    l = () => {
      const u = t.substring(s, e).trim(),
        d = u.indexOf('=');
      let h, y;
      d !== -1 &&
      u
        .substring(0, d)
        .trim()
        .match(/^[a-zA-Z_0-9-+:*]+$/)
        ? ((h = u.substring(0, d).trim()), (y = u.substring(d + 1)))
        : (u.length > 1 && u[0] === '"' && u[u.length - 1] === '"') ||
            (u.length > 1 && u[0] === "'" && u[u.length - 1] === "'")
          ? ((h = 'text'), (y = u))
          : /^\(*\/\//.test(u) || u.startsWith('..')
            ? ((h = 'xpath'), (y = u))
            : ((h = 'css'), (y = u));
      let v = !1;
      if (
        (h[0] === '*' && ((v = !0), (h = h.substring(1))), o.parts.push({ name: h, body: y }), v)
      ) {
        if (o.capture !== void 0)
          throw new Nt('Only one of the selectors can capture using * modifier');
        o.capture = o.parts.length - 1;
      }
    };
  if (!t.includes('>>')) return (e = t.length), l(), o;
  const c = () => {
    const d = t.substring(s, e).match(/^\s*text\s*=(.*)$/);
    return !!d && !!d[1];
  };
  for (; e < t.length; ) {
    const u = t[e];
    u === '\\' && e + 1 < t.length
      ? (e += 2)
      : u === n
        ? ((n = void 0), e++)
        : !n && (u === '"' || u === "'" || u === '`') && !c()
          ? ((n = u), e++)
          : !n && u === '>' && t[e + 1] === '>'
            ? (l(), (e += 2), (s = e))
            : e++;
  }
  return l(), o;
}
function Ir(t, e) {
  let n = 0,
    s = t.length === 0;
  const o = () => t[n] || '',
    l = () => {
      const b = o();
      return ++n, (s = n >= t.length), b;
    },
    c = b => {
      throw s
        ? new Nt(`Unexpected end of selector while parsing selector \`${t}\``)
        : new Nt(
            `Error while parsing selector \`${t}\` - unexpected symbol "${o()}" at position ${n}` +
              (b ? ' during ' + b : '')
          );
    };
  function u() {
    for (; !s && /\s/.test(o()); ) l();
  }
  function d(b) {
    return (
      b >= '' ||
      (b >= '0' && b <= '9') ||
      (b >= 'A' && b <= 'Z') ||
      (b >= 'a' && b <= 'z') ||
      (b >= '0' && b <= '9') ||
      b === '_' ||
      b === '-'
    );
  }
  function h() {
    let b = '';
    for (u(); !s && d(o()); ) b += l();
    return b;
  }
  function y(b) {
    let T = l();
    for (T !== b && c('parsing quoted string'); !s && o() !== b; ) o() === '\\' && l(), (T += l());
    return o() !== b && c('parsing quoted string'), (T += l()), T;
  }
  function v() {
    l() !== '/' && c('parsing regular expression');
    let b = '',
      T = !1;
    for (; !s; ) {
      if (o() === '\\') (b += l()), s && c('parsing regular expression');
      else if (T && o() === ']') T = !1;
      else if (!T && o() === '[') T = !0;
      else if (!T && o() === '/') break;
      b += l();
    }
    l() !== '/' && c('parsing regular expression');
    let C = '';
    for (; !s && o().match(/[dgimsuy]/); ) C += l();
    try {
      return new RegExp(b, C);
    } catch (O) {
      throw new Nt(`Error while parsing selector \`${t}\`: ${O.message}`);
    }
  }
  function m() {
    let b = '';
    return (
      u(),
      o() === "'" || o() === '"' ? (b = y(o()).slice(1, -1)) : (b = h()),
      b || c('parsing property path'),
      b
    );
  }
  function w() {
    u();
    let b = '';
    return (
      s || (b += l()),
      !s && b !== '=' && (b += l()),
      ['=', '*=', '^=', '$=', '|=', '~='].includes(b) || c('parsing operator'),
      b
    );
  }
  function S() {
    l();
    const b = [];
    for (b.push(m()), u(); o() === '.'; ) l(), b.push(m()), u();
    if (o() === ']')
      return (
        l(), { name: b.join('.'), jsonPath: b, op: '<truthy>', value: null, caseSensitive: !1 }
      );
    const T = w();
    let C,
      O = !0;
    if ((u(), o() === '/')) {
      if (T !== '=')
        throw new Nt(
          `Error while parsing selector \`${t}\` - cannot use ${T} in attribute with regular expression`
        );
      C = v();
    } else if (o() === "'" || o() === '"')
      (C = y(o()).slice(1, -1)),
        u(),
        o() === 'i' || o() === 'I'
          ? ((O = !1), l())
          : (o() === 's' || o() === 'S') && ((O = !0), l());
    else {
      for (C = ''; !s && (d(o()) || o() === '+' || o() === '.'); ) C += l();
      C === 'true'
        ? (C = !0)
        : C === 'false'
          ? (C = !1)
          : e || ((C = +C), Number.isNaN(C) && c('parsing attribute value'));
    }
    if ((u(), o() !== ']' && c('parsing attribute value'), l(), T !== '=' && typeof C != 'string'))
      throw new Nt(
        `Error while parsing selector \`${t}\` - cannot use ${T} in attribute with non-string matching value - ${C}`
      );
    return { name: b.join('.'), jsonPath: b, op: T, value: C, caseSensitive: O };
  }
  const _ = { name: '', attributes: [] };
  for (_.name = h(), u(); o() === '['; ) _.attributes.push(S()), u();
  if ((s || c(void 0), !_.name && !_.attributes.length))
    throw new Nt(`Error while parsing selector \`${t}\` - selector cannot be empty`);
  return _;
}
function ra(t, e = "'") {
  const n = JSON.stringify(t),
    s = n.substring(1, n.length - 1).replace(/\\"/g, '"');
  if (e === "'") return e + s.replace(/[']/g, "\\'") + e;
  if (e === '"') return e + s.replace(/["]/g, '\\"') + e;
  if (e === '`') return e + s.replace(/[`]/g, '`') + e;
  throw new Error('Invalid escape char');
}
function Vl(t) {
  return t.charAt(0).toUpperCase() + t.substring(1);
}
function Og(t) {
  return t
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}
function Kt(t) {
  let e = '';
  for (let n = 0; n < t.length; n++) e += Yx(t, n);
  return e;
}
function Ii(t) {
  return `"${Kt(t).replace(/\\ /g, ' ')}"`;
}
function Yx(t, e) {
  const n = t.charCodeAt(e);
  return n === 0
    ? '�'
    : (n >= 1 && n <= 31) ||
        (n >= 48 && n <= 57 && (e === 0 || (e === 1 && t.charCodeAt(0) === 45)))
      ? '\\' + n.toString(16) + ' '
      : e === 0 && n === 45 && t.length === 1
        ? '\\' + t.charAt(e)
        : n >= 128 ||
            n === 45 ||
            n === 95 ||
            (n >= 48 && n <= 57) ||
            (n >= 65 && n <= 90) ||
            (n >= 97 && n <= 122)
          ? t.charAt(e)
          : '\\' + t.charAt(e);
}
let Er;
function Zx() {
  Er = new be();
}
function vt(t) {
  let e = Er == null ? void 0 : Er.get(t);
  return (
    e === void 0 &&
      ((e = t
        .replace(/[\u200b\u00ad]/g, '')
        .trim()
        .replace(/\s+/g, ' ')),
      Er == null || Er.set(t, e)),
    e
  );
}
function sa(t) {
  return t.replace(/(^|[^\\])(\\\\)*\\(['"`])/g, '$1$2$3');
}
function Mg(t) {
  return t.unicode || t.unicodeSets
    ? String(t)
    : String(t)
        .replace(/(^|[^\\])(\\\\)*(["'`])/g, '$1$2\\$3')
        .replace(/>>/g, '\\>\\>');
}
function Ct(t, e) {
  return typeof t != 'string' ? Mg(t) : `${JSON.stringify(t)}${e ? 's' : 'i'}`;
}
function mt(t, e) {
  return typeof t != 'string'
    ? Mg(t)
    : `"${t.replace(/\\/g, '\\\\').replace(/["]/g, '\\"')}"${e ? 's' : 'i'}`;
}
function e1(t, e, n = '') {
  if (t.length <= e) return t;
  const s = [...t];
  return s.length > e ? s.slice(0, e - n.length).join('') + n : s.join('');
}
function im(t, e) {
  return e1(t, e, '…');
}
function Wl(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function t1(t, e) {
  const n = t.length,
    s = e.length;
  let o = 0,
    l = 0;
  const c = Array(n + 1)
    .fill(null)
    .map(() => Array(s + 1).fill(0));
  for (let u = 1; u <= n; u++)
    for (let d = 1; d <= s; d++)
      t[u - 1] === e[d - 1] &&
        ((c[u][d] = c[u - 1][d - 1] + 1), c[u][d] > o && ((o = c[u][d]), (l = u)));
  return t.slice(l - o, l);
}
function or(t, e, n = !1) {
  return $g(t, e, n, 1)[0];
}
function $g(t, e, n = !1, s = 20, o) {
  try {
    return ys(new a1[t](o), na(e), n, s);
  } catch {
    return [e];
  }
}
function ys(t, e, n = !1, s = 20) {
  const o = [...e.parts],
    l = [];
  let c = n ? 'frame-locator' : 'page';
  for (let u = 0; u < o.length; u++) {
    const d = o[u],
      h = c;
    if (((c = 'locator'), d.name === 'nth')) {
      d.body === '0'
        ? l.push([t.generateLocator(h, 'first', ''), t.generateLocator(h, 'nth', '0')])
        : d.body === '-1'
          ? l.push([t.generateLocator(h, 'last', ''), t.generateLocator(h, 'nth', '-1')])
          : l.push([t.generateLocator(h, 'nth', d.body)]);
      continue;
    }
    if (d.name === 'visible') {
      l.push([
        t.generateLocator(h, 'visible', d.body),
        t.generateLocator(h, 'default', `visible=${d.body}`),
      ]);
      continue;
    }
    if (d.name === 'internal:text') {
      const { exact: S, text: _ } = Oi(d.body);
      l.push([t.generateLocator(h, 'text', _, { exact: S })]);
      continue;
    }
    if (d.name === 'internal:has-text') {
      const { exact: S, text: _ } = Oi(d.body);
      if (!S) {
        l.push([t.generateLocator(h, 'has-text', _, { exact: S })]);
        continue;
      }
    }
    if (d.name === 'internal:has-not-text') {
      const { exact: S, text: _ } = Oi(d.body);
      if (!S) {
        l.push([t.generateLocator(h, 'has-not-text', _, { exact: S })]);
        continue;
      }
    }
    if (d.name === 'internal:has') {
      const S = ys(t, d.body.parsed, !1, s);
      l.push(S.map(_ => t.generateLocator(h, 'has', _)));
      continue;
    }
    if (d.name === 'internal:has-not') {
      const S = ys(t, d.body.parsed, !1, s);
      l.push(S.map(_ => t.generateLocator(h, 'hasNot', _)));
      continue;
    }
    if (d.name === 'internal:and') {
      const S = ys(t, d.body.parsed, !1, s);
      l.push(S.map(_ => t.generateLocator(h, 'and', _)));
      continue;
    }
    if (d.name === 'internal:or') {
      const S = ys(t, d.body.parsed, !1, s);
      l.push(S.map(_ => t.generateLocator(h, 'or', _)));
      continue;
    }
    if (d.name === 'internal:chain') {
      const S = ys(t, d.body.parsed, !1, s);
      l.push(S.map(_ => t.generateLocator(h, 'chain', _)));
      continue;
    }
    if (d.name === 'internal:label') {
      const { exact: S, text: _ } = Oi(d.body);
      l.push([t.generateLocator(h, 'label', _, { exact: S })]);
      continue;
    }
    if (d.name === 'internal:role') {
      const S = Ir(d.body, !0),
        _ = { attrs: [] };
      for (const b of S.attributes)
        b.name === 'name'
          ? ((_.exact = b.caseSensitive), (_.name = b.value))
          : (b.name === 'level' && typeof b.value == 'string' && (b.value = +b.value),
            _.attrs.push({
              name: b.name === 'include-hidden' ? 'includeHidden' : b.name,
              value: b.value,
            }));
      l.push([t.generateLocator(h, 'role', S.name, _)]);
      continue;
    }
    if (d.name === 'internal:testid') {
      const S = Ir(d.body, !0),
        { value: _ } = S.attributes[0];
      l.push([t.generateLocator(h, 'test-id', _)]);
      continue;
    }
    if (d.name === 'internal:attr') {
      const S = Ir(d.body, !0),
        { name: _, value: b, caseSensitive: T } = S.attributes[0],
        C = b,
        O = !!T;
      if (_ === 'placeholder') {
        l.push([t.generateLocator(h, 'placeholder', C, { exact: O })]);
        continue;
      }
      if (_ === 'alt') {
        l.push([t.generateLocator(h, 'alt', C, { exact: O })]);
        continue;
      }
      if (_ === 'title') {
        l.push([t.generateLocator(h, 'title', C, { exact: O })]);
        continue;
      }
    }
    if (d.name === 'internal:control' && d.body === 'enter-frame') {
      const S = l[l.length - 1],
        _ = o[u - 1],
        b = S.map(T => t.chainLocators([T, t.generateLocator(h, 'frame', '')]));
      ['xpath', 'css'].includes(_.name) &&
        b.push(
          t.generateLocator(h, 'frame-locator', jn({ parts: [_] })),
          t.generateLocator(h, 'frame-locator', jn({ parts: [_] }, !0))
        ),
        S.splice(0, S.length, ...b),
        (c = 'frame-locator');
      continue;
    }
    const y = o[u + 1],
      v = jn({ parts: [d] }),
      m = t.generateLocator(h, 'default', v);
    if (y && ['internal:has-text', 'internal:has-not-text'].includes(y.name)) {
      const { exact: S, text: _ } = Oi(y.body);
      if (!S) {
        const b = t.generateLocator(
            'locator',
            y.name === 'internal:has-text' ? 'has-text' : 'has-not-text',
            _,
            { exact: S }
          ),
          T = {};
        y.name === 'internal:has-text' ? (T.hasText = _) : (T.hasNotText = _);
        const C = t.generateLocator(h, 'default', v, T);
        l.push([t.chainLocators([m, b]), C]), u++;
        continue;
      }
    }
    let w;
    if (['xpath', 'css'].includes(d.name)) {
      const S = jn({ parts: [d] }, !0);
      w = t.generateLocator(h, 'default', S);
    }
    l.push([m, w].filter(Boolean));
  }
  return n1(t, l, s);
}
function n1(t, e, n) {
  const s = e.map(() => ''),
    o = [],
    l = c => {
      if (c === e.length) return o.push(t.chainLocators(s)), o.length < n;
      for (const u of e[c]) if (((s[c] = u), !l(c + 1))) return !1;
      return !0;
    };
  return l(0), o;
}
function Oi(t) {
  let e = !1;
  const n = t.match(/^\/(.*)\/([igm]*)$/);
  return n
    ? { text: new RegExp(n[1], n[2]) }
    : (t.endsWith('"')
        ? ((t = JSON.parse(t)), (e = !0))
        : t.endsWith('"s')
          ? ((t = JSON.parse(t.substring(0, t.length - 1))), (e = !0))
          : t.endsWith('"i') && ((t = JSON.parse(t.substring(0, t.length - 1))), (e = !1)),
      { exact: e, text: t });
}
class r1 {
  constructor(e) {
    this.preferredQuote = e;
  }
  generateLocator(e, n, s, o = {}) {
    switch (n) {
      case 'default':
        return o.hasText !== void 0
          ? `locator(${this.quote(s)}, { hasText: ${this.toHasText(o.hasText)} })`
          : o.hasNotText !== void 0
            ? `locator(${this.quote(s)}, { hasNotText: ${this.toHasText(o.hasNotText)} })`
            : `locator(${this.quote(s)})`;
      case 'frame-locator':
        return `frameLocator(${this.quote(s)})`;
      case 'frame':
        return 'contentFrame()';
      case 'nth':
        return `nth(${s})`;
      case 'first':
        return 'first()';
      case 'last':
        return 'last()';
      case 'visible':
        return `filter({ visible: ${s === 'true' ? 'true' : 'false'} })`;
      case 'role':
        const l = [];
        rt(o.name)
          ? l.push(`name: ${this.regexToSourceString(o.name)}`)
          : typeof o.name == 'string' &&
            (l.push(`name: ${this.quote(o.name)}`), o.exact && l.push('exact: true'));
        for (const { name: u, value: d } of o.attrs)
          l.push(`${u}: ${typeof d == 'string' ? this.quote(d) : d}`);
        const c = l.length ? `, { ${l.join(', ')} }` : '';
        return `getByRole(${this.quote(s)}${c})`;
      case 'has-text':
        return `filter({ hasText: ${this.toHasText(s)} })`;
      case 'has-not-text':
        return `filter({ hasNotText: ${this.toHasText(s)} })`;
      case 'has':
        return `filter({ has: ${s} })`;
      case 'hasNot':
        return `filter({ hasNot: ${s} })`;
      case 'and':
        return `and(${s})`;
      case 'or':
        return `or(${s})`;
      case 'chain':
        return `locator(${s})`;
      case 'test-id':
        return `getByTestId(${this.toTestIdValue(s)})`;
      case 'text':
        return this.toCallWithExact('getByText', s, !!o.exact);
      case 'alt':
        return this.toCallWithExact('getByAltText', s, !!o.exact);
      case 'placeholder':
        return this.toCallWithExact('getByPlaceholder', s, !!o.exact);
      case 'label':
        return this.toCallWithExact('getByLabel', s, !!o.exact);
      case 'title':
        return this.toCallWithExact('getByTitle', s, !!o.exact);
      default:
        throw new Error('Unknown selector kind ' + n);
    }
  }
  chainLocators(e) {
    return e.join('.');
  }
  regexToSourceString(e) {
    return sa(String(e));
  }
  toCallWithExact(e, n, s) {
    return rt(n)
      ? `${e}(${this.regexToSourceString(n)})`
      : s
        ? `${e}(${this.quote(n)}, { exact: true })`
        : `${e}(${this.quote(n)})`;
  }
  toHasText(e) {
    return rt(e) ? this.regexToSourceString(e) : this.quote(e);
  }
  toTestIdValue(e) {
    return rt(e) ? this.regexToSourceString(e) : this.quote(e);
  }
  quote(e) {
    return ra(e, this.preferredQuote ?? "'");
  }
}
class s1 {
  generateLocator(e, n, s, o = {}) {
    switch (n) {
      case 'default':
        return o.hasText !== void 0
          ? `locator(${this.quote(s)}, has_text=${this.toHasText(o.hasText)})`
          : o.hasNotText !== void 0
            ? `locator(${this.quote(s)}, has_not_text=${this.toHasText(o.hasNotText)})`
            : `locator(${this.quote(s)})`;
      case 'frame-locator':
        return `frame_locator(${this.quote(s)})`;
      case 'frame':
        return 'content_frame';
      case 'nth':
        return `nth(${s})`;
      case 'first':
        return 'first';
      case 'last':
        return 'last';
      case 'visible':
        return `filter(visible=${s === 'true' ? 'True' : 'False'})`;
      case 'role':
        const l = [];
        rt(o.name)
          ? l.push(`name=${this.regexToString(o.name)}`)
          : typeof o.name == 'string' &&
            (l.push(`name=${this.quote(o.name)}`), o.exact && l.push('exact=True'));
        for (const { name: u, value: d } of o.attrs) {
          let h = typeof d == 'string' ? this.quote(d) : d;
          typeof d == 'boolean' && (h = d ? 'True' : 'False'), l.push(`${Og(u)}=${h}`);
        }
        const c = l.length ? `, ${l.join(', ')}` : '';
        return `get_by_role(${this.quote(s)}${c})`;
      case 'has-text':
        return `filter(has_text=${this.toHasText(s)})`;
      case 'has-not-text':
        return `filter(has_not_text=${this.toHasText(s)})`;
      case 'has':
        return `filter(has=${s})`;
      case 'hasNot':
        return `filter(has_not=${s})`;
      case 'and':
        return `and_(${s})`;
      case 'or':
        return `or_(${s})`;
      case 'chain':
        return `locator(${s})`;
      case 'test-id':
        return `get_by_test_id(${this.toTestIdValue(s)})`;
      case 'text':
        return this.toCallWithExact('get_by_text', s, !!o.exact);
      case 'alt':
        return this.toCallWithExact('get_by_alt_text', s, !!o.exact);
      case 'placeholder':
        return this.toCallWithExact('get_by_placeholder', s, !!o.exact);
      case 'label':
        return this.toCallWithExact('get_by_label', s, !!o.exact);
      case 'title':
        return this.toCallWithExact('get_by_title', s, !!o.exact);
      default:
        throw new Error('Unknown selector kind ' + n);
    }
  }
  chainLocators(e) {
    return e.join('.');
  }
  regexToString(e) {
    const n = e.flags.includes('i') ? ', re.IGNORECASE' : '';
    return `re.compile(r"${sa(e.source).replace(/\\\//, '/').replace(/"/g, '\\"')}"${n})`;
  }
  toCallWithExact(e, n, s) {
    return rt(n)
      ? `${e}(${this.regexToString(n)})`
      : s
        ? `${e}(${this.quote(n)}, exact=True)`
        : `${e}(${this.quote(n)})`;
  }
  toHasText(e) {
    return rt(e) ? this.regexToString(e) : `${this.quote(e)}`;
  }
  toTestIdValue(e) {
    return rt(e) ? this.regexToString(e) : this.quote(e);
  }
  quote(e) {
    return ra(e, '"');
  }
}
class i1 {
  generateLocator(e, n, s, o = {}) {
    let l;
    switch (e) {
      case 'page':
        l = 'Page';
        break;
      case 'frame-locator':
        l = 'FrameLocator';
        break;
      case 'locator':
        l = 'Locator';
        break;
    }
    switch (n) {
      case 'default':
        return o.hasText !== void 0
          ? `locator(${this.quote(s)}, new ${l}.LocatorOptions().setHasText(${this.toHasText(o.hasText)}))`
          : o.hasNotText !== void 0
            ? `locator(${this.quote(s)}, new ${l}.LocatorOptions().setHasNotText(${this.toHasText(o.hasNotText)}))`
            : `locator(${this.quote(s)})`;
      case 'frame-locator':
        return `frameLocator(${this.quote(s)})`;
      case 'frame':
        return 'contentFrame()';
      case 'nth':
        return `nth(${s})`;
      case 'first':
        return 'first()';
      case 'last':
        return 'last()';
      case 'visible':
        return `filter(new ${l}.FilterOptions().setVisible(${s === 'true' ? 'true' : 'false'}))`;
      case 'role':
        const c = [];
        rt(o.name)
          ? c.push(`.setName(${this.regexToString(o.name)})`)
          : typeof o.name == 'string' &&
            (c.push(`.setName(${this.quote(o.name)})`), o.exact && c.push('.setExact(true)'));
        for (const { name: d, value: h } of o.attrs)
          c.push(`.set${Vl(d)}(${typeof h == 'string' ? this.quote(h) : h})`);
        const u = c.length ? `, new ${l}.GetByRoleOptions()${c.join('')}` : '';
        return `getByRole(AriaRole.${Og(s).toUpperCase()}${u})`;
      case 'has-text':
        return `filter(new ${l}.FilterOptions().setHasText(${this.toHasText(s)}))`;
      case 'has-not-text':
        return `filter(new ${l}.FilterOptions().setHasNotText(${this.toHasText(s)}))`;
      case 'has':
        return `filter(new ${l}.FilterOptions().setHas(${s}))`;
      case 'hasNot':
        return `filter(new ${l}.FilterOptions().setHasNot(${s}))`;
      case 'and':
        return `and(${s})`;
      case 'or':
        return `or(${s})`;
      case 'chain':
        return `locator(${s})`;
      case 'test-id':
        return `getByTestId(${this.toTestIdValue(s)})`;
      case 'text':
        return this.toCallWithExact(l, 'getByText', s, !!o.exact);
      case 'alt':
        return this.toCallWithExact(l, 'getByAltText', s, !!o.exact);
      case 'placeholder':
        return this.toCallWithExact(l, 'getByPlaceholder', s, !!o.exact);
      case 'label':
        return this.toCallWithExact(l, 'getByLabel', s, !!o.exact);
      case 'title':
        return this.toCallWithExact(l, 'getByTitle', s, !!o.exact);
      default:
        throw new Error('Unknown selector kind ' + n);
    }
  }
  chainLocators(e) {
    return e.join('.');
  }
  regexToString(e) {
    const n = e.flags.includes('i') ? ', Pattern.CASE_INSENSITIVE' : '';
    return `Pattern.compile(${this.quote(sa(e.source))}${n})`;
  }
  toCallWithExact(e, n, s, o) {
    return rt(s)
      ? `${n}(${this.regexToString(s)})`
      : o
        ? `${n}(${this.quote(s)}, new ${e}.${Vl(n)}Options().setExact(true))`
        : `${n}(${this.quote(s)})`;
  }
  toHasText(e) {
    return rt(e) ? this.regexToString(e) : this.quote(e);
  }
  toTestIdValue(e) {
    return rt(e) ? this.regexToString(e) : this.quote(e);
  }
  quote(e) {
    return ra(e, '"');
  }
}
class o1 {
  generateLocator(e, n, s, o = {}) {
    switch (n) {
      case 'default':
        return o.hasText !== void 0
          ? `Locator(${this.quote(s)}, new() { ${this.toHasText(o.hasText)} })`
          : o.hasNotText !== void 0
            ? `Locator(${this.quote(s)}, new() { ${this.toHasNotText(o.hasNotText)} })`
            : `Locator(${this.quote(s)})`;
      case 'frame-locator':
        return `FrameLocator(${this.quote(s)})`;
      case 'frame':
        return 'ContentFrame';
      case 'nth':
        return `Nth(${s})`;
      case 'first':
        return 'First';
      case 'last':
        return 'Last';
      case 'visible':
        return `Filter(new() { Visible = ${s === 'true' ? 'true' : 'false'} })`;
      case 'role':
        const l = [];
        rt(o.name)
          ? l.push(`NameRegex = ${this.regexToString(o.name)}`)
          : typeof o.name == 'string' &&
            (l.push(`Name = ${this.quote(o.name)}`), o.exact && l.push('Exact = true'));
        for (const { name: u, value: d } of o.attrs)
          l.push(`${Vl(u)} = ${typeof d == 'string' ? this.quote(d) : d}`);
        const c = l.length ? `, new() { ${l.join(', ')} }` : '';
        return `GetByRole(AriaRole.${Vl(s)}${c})`;
      case 'has-text':
        return `Filter(new() { ${this.toHasText(s)} })`;
      case 'has-not-text':
        return `Filter(new() { ${this.toHasNotText(s)} })`;
      case 'has':
        return `Filter(new() { Has = ${s} })`;
      case 'hasNot':
        return `Filter(new() { HasNot = ${s} })`;
      case 'and':
        return `And(${s})`;
      case 'or':
        return `Or(${s})`;
      case 'chain':
        return `Locator(${s})`;
      case 'test-id':
        return `GetByTestId(${this.toTestIdValue(s)})`;
      case 'text':
        return this.toCallWithExact('GetByText', s, !!o.exact);
      case 'alt':
        return this.toCallWithExact('GetByAltText', s, !!o.exact);
      case 'placeholder':
        return this.toCallWithExact('GetByPlaceholder', s, !!o.exact);
      case 'label':
        return this.toCallWithExact('GetByLabel', s, !!o.exact);
      case 'title':
        return this.toCallWithExact('GetByTitle', s, !!o.exact);
      default:
        throw new Error('Unknown selector kind ' + n);
    }
  }
  chainLocators(e) {
    return e.join('.');
  }
  regexToString(e) {
    const n = e.flags.includes('i') ? ', RegexOptions.IgnoreCase' : '';
    return `new Regex(${this.quote(sa(e.source))}${n})`;
  }
  toCallWithExact(e, n, s) {
    return rt(n)
      ? `${e}(${this.regexToString(n)})`
      : s
        ? `${e}(${this.quote(n)}, new() { Exact = true })`
        : `${e}(${this.quote(n)})`;
  }
  toHasText(e) {
    return rt(e) ? `HasTextRegex = ${this.regexToString(e)}` : `HasText = ${this.quote(e)}`;
  }
  toTestIdValue(e) {
    return rt(e) ? this.regexToString(e) : this.quote(e);
  }
  toHasNotText(e) {
    return rt(e) ? `HasNotTextRegex = ${this.regexToString(e)}` : `HasNotText = ${this.quote(e)}`;
  }
  quote(e) {
    return ra(e, '"');
  }
}
class l1 {
  generateLocator(e, n, s, o = {}) {
    return JSON.stringify({ kind: n, body: s, options: o });
  }
  chainLocators(e) {
    const n = e.map(s => JSON.parse(s));
    for (let s = 0; s < n.length - 1; ++s) n[s].next = n[s + 1];
    return JSON.stringify(n[0]);
  }
}
const a1 = { javascript: r1, python: s1, java: i1, csharp: o1, jsonl: l1 };
function rt(t) {
  return t instanceof RegExp;
}
const om = new Map();
function c1({
  name: t,
  rootItem: e,
  render: n,
  title: s,
  icon: o,
  isError: l,
  isVisible: c,
  selectedItem: u,
  onAccepted: d,
  onSelected: h,
  onHighlighted: y,
  treeState: v,
  setTreeState: m,
  noItemsMessage: w,
  dataTestId: S,
  autoExpandDepth: _,
}) {
  const b = P.useMemo(() => u1(e, u, v.expandedItems, _ || 0, c), [e, u, v, _, c]),
    T = P.useRef(null),
    [C, O] = P.useState(),
    [R, D] = P.useState(!1);
  P.useEffect(() => {
    y == null || y(C);
  }, [y, C]),
    P.useEffect(() => {
      const U = T.current;
      if (!U) return;
      const B = () => {
        om.set(t, U.scrollTop);
      };
      return (
        U.addEventListener('scroll', B, { passive: !0 }), () => U.removeEventListener('scroll', B)
      );
    }, [t]),
    P.useEffect(() => {
      T.current && (T.current.scrollTop = om.get(t) || 0);
    }, [t]);
  const F = P.useCallback(
    U => {
      const { expanded: B } = b.get(U);
      if (B) {
        for (let I = u; I; I = I.parent)
          if (I === U) {
            h == null || h(U);
            break;
          }
        v.expandedItems.set(U.id, !1);
      } else v.expandedItems.set(U.id, !0);
      m({ ...v });
    },
    [b, u, h, v, m]
  );
  return x.jsx('div', {
    className: Ue('tree-view vbox', t + '-tree-view'),
    role: 'tree',
    'data-testid': S || t + '-tree',
    children: x.jsxs('div', {
      className: Ue('tree-view-content'),
      tabIndex: 0,
      onKeyDown: U => {
        if (u && U.key === 'Enter') {
          d == null || d(u);
          return;
        }
        if (
          U.key !== 'ArrowDown' &&
          U.key !== 'ArrowUp' &&
          U.key !== 'ArrowLeft' &&
          U.key !== 'ArrowRight'
        )
          return;
        if ((U.stopPropagation(), U.preventDefault(), u && U.key === 'ArrowLeft')) {
          const { expanded: I, parent: Q } = b.get(u);
          I ? (v.expandedItems.set(u.id, !1), m({ ...v })) : Q && (h == null || h(Q));
          return;
        }
        if (u && U.key === 'ArrowRight') {
          u.children.length && (v.expandedItems.set(u.id, !0), m({ ...v }));
          return;
        }
        let B = u;
        if (
          (U.key === 'ArrowDown' && (u ? (B = b.get(u).next) : b.size && (B = [...b.keys()][0])),
          U.key === 'ArrowUp')
        ) {
          if (u) B = b.get(u).prev;
          else if (b.size) {
            const I = [...b.keys()];
            B = I[I.length - 1];
          }
        }
        y == null || y(void 0), B && (D(!0), h == null || h(B)), O(void 0);
      },
      ref: T,
      children: [
        w && b.size === 0 && x.jsx('div', { className: 'tree-view-empty', children: w }),
        e.children.map(
          U =>
            b.get(U) &&
            x.jsx(
              Pg,
              {
                item: U,
                treeItems: b,
                selectedItem: u,
                onSelected: h,
                onAccepted: d,
                isError: l,
                toggleExpanded: F,
                highlightedItem: C,
                setHighlightedItem: O,
                render: n,
                icon: o,
                title: s,
                isKeyboardNavigation: R,
                setIsKeyboardNavigation: D,
              },
              U.id
            )
        ),
      ],
    }),
  });
}
function Pg({
  item: t,
  treeItems: e,
  selectedItem: n,
  onSelected: s,
  highlightedItem: o,
  setHighlightedItem: l,
  isError: c,
  onAccepted: u,
  toggleExpanded: d,
  render: h,
  title: y,
  icon: v,
  isKeyboardNavigation: m,
  setIsKeyboardNavigation: w,
}) {
  const S = P.useId(),
    _ = P.useRef(null);
  P.useEffect(() => {
    n === t && m && _.current && (lg(_.current), w(!1));
  }, [t, n, m, w]);
  const b = e.get(t),
    T = b.depth,
    C = b.expanded;
  let O = 'codicon-blank';
  typeof C == 'boolean' && (O = C ? 'codicon-chevron-down' : 'codicon-chevron-right');
  const R = h(t),
    D = C && t.children.length ? t.children : [],
    F = y == null ? void 0 : y(t),
    U = (v == null ? void 0 : v(t)) || 'codicon-blank';
  return x.jsxs('div', {
    ref: _,
    role: 'treeitem',
    'aria-selected': t === n,
    'aria-expanded': C,
    'aria-controls': S,
    title: F,
    className: 'vbox',
    style: { flex: 'none' },
    children: [
      x.jsxs('div', {
        onDoubleClick: () => (u == null ? void 0 : u(t)),
        className: Ue(
          'tree-view-entry',
          n === t && 'selected',
          o === t && 'highlighted',
          (c == null ? void 0 : c(t)) && 'error'
        ),
        onClick: () => (s == null ? void 0 : s(t)),
        onMouseEnter: () => l(t),
        onMouseLeave: () => l(void 0),
        children: [
          T
            ? new Array(T)
                .fill(0)
                .map((B, I) => x.jsx('div', { className: 'tree-view-indent' }, 'indent-' + I))
            : void 0,
          x.jsx('div', {
            'aria-hidden': 'true',
            className: 'codicon ' + O,
            style: { minWidth: 16, marginRight: 4 },
            onDoubleClick: B => {
              B.preventDefault(), B.stopPropagation();
            },
            onClick: B => {
              B.stopPropagation(), B.preventDefault(), d(t);
            },
          }),
          v &&
            x.jsx('div', {
              className: 'codicon ' + U,
              style: { minWidth: 16, marginRight: 4 },
              'aria-label': '[' + U.replace('codicon', 'icon') + ']',
            }),
          typeof R == 'string'
            ? x.jsx('div', { style: { textOverflow: 'ellipsis', overflow: 'hidden' }, children: R })
            : R,
        ],
      }),
      !!D.length &&
        x.jsx('div', {
          id: S,
          role: 'group',
          children: D.map(
            B =>
              e.get(B) &&
              x.jsx(
                Pg,
                {
                  item: B,
                  treeItems: e,
                  selectedItem: n,
                  onSelected: s,
                  onAccepted: u,
                  isError: c,
                  toggleExpanded: d,
                  highlightedItem: o,
                  setHighlightedItem: l,
                  render: h,
                  title: y,
                  icon: v,
                  isKeyboardNavigation: m,
                  setIsKeyboardNavigation: w,
                },
                B.id
              )
          ),
        }),
    ],
  });
}
function u1(t, e, n, s, o = () => !0) {
  if (!o(t)) return new Map();
  const l = new Map(),
    c = new Set();
  for (let h = e == null ? void 0 : e.parent; h; h = h.parent) c.add(h.id);
  let u = null;
  const d = (h, y) => {
    for (const v of h.children) {
      if (!o(v)) continue;
      const m = c.has(v.id) || n.get(v.id),
        w = s > y && l.size < 25 && m !== !1,
        S = v.children.length ? (m ?? w) : void 0,
        _ = { depth: y, expanded: S, parent: t === h ? null : h, next: null, prev: u };
      u && (l.get(u).next = v), (u = v), l.set(v, _), S && d(v, y + 1);
    }
  };
  return d(t, 0), l;
}
const Rt = P.forwardRef(function (
    {
      children: e,
      title: n = '',
      icon: s,
      disabled: o = !1,
      toggled: l = !1,
      onClick: c = () => {},
      style: u,
      testId: d,
      className: h,
      ariaLabel: y,
    },
    v
  ) {
    return x.jsxs('button', {
      ref: v,
      className: Ue(h, 'toolbar-button', s, l && 'toggled'),
      onMouseDown: lm,
      onClick: c,
      onDoubleClick: lm,
      title: n,
      disabled: !!o,
      style: u,
      'data-testid': d,
      'aria-label': y || n,
      children: [
        s &&
          x.jsx('span', { className: `codicon codicon-${s}`, style: e ? { marginRight: 5 } : {} }),
        e,
      ],
    });
  }),
  lm = t => {
    t.stopPropagation(), t.preventDefault();
  };
function Rg(t) {
  return t === 'scheduled'
    ? 'codicon-clock'
    : t === 'running'
      ? 'codicon-loading'
      : t === 'failed'
        ? 'codicon-error'
        : t === 'passed'
          ? 'codicon-check'
          : t === 'skipped'
            ? 'codicon-circle-slash'
            : 'codicon-circle-outline';
}
function f1(t) {
  return t === 'scheduled'
    ? 'Pending'
    : t === 'running'
      ? 'Running'
      : t === 'failed'
        ? 'Failed'
        : t === 'passed'
          ? 'Passed'
          : t === 'skipped'
            ? 'Skipped'
            : 'Did not run';
}
const d1 = c1,
  h1 = ({
    actions: t,
    selectedAction: e,
    selectedTime: n,
    setSelectedTime: s,
    sdkLanguage: o,
    onSelected: l,
    onHighlighted: c,
    revealConsole: u,
    revealAttachment: d,
    isLive: h,
  }) => {
    const [y, v] = P.useState({ expandedItems: new Map() }),
      { rootItem: m, itemMap: w } = P.useMemo(() => Ex(t), [t]),
      { selectedItem: S } = P.useMemo(
        () => ({ selectedItem: e ? w.get(e.callId) : void 0 }),
        [w, e]
      ),
      _ = P.useCallback(D => {
        var F, U;
        return !!((U = (F = D.action) == null ? void 0 : F.error) != null && U.message);
      }, []),
      b = P.useCallback(D => s({ minimum: D.action.startTime, maximum: D.action.endTime }), [s]),
      T = P.useCallback(
        D =>
          pf(D.action, {
            sdkLanguage: o,
            revealConsole: u,
            revealAttachment: d,
            isLive: h,
            showDuration: !0,
            showBadges: !0,
          }),
        [h, u, d, o]
      ),
      C = P.useCallback(
        D => !n || !D.action || (D.action.startTime <= n.maximum && D.action.endTime >= n.minimum),
        [n]
      ),
      O = P.useCallback(
        D => {
          l == null || l(D.action);
        },
        [l]
      ),
      R = P.useCallback(
        D => {
          c == null || c(D == null ? void 0 : D.action);
        },
        [c]
      );
    return x.jsxs('div', {
      className: 'vbox',
      children: [
        n &&
          x.jsxs('div', {
            className: 'action-list-show-all',
            onClick: () => s(void 0),
            children: [x.jsx('span', { className: 'codicon codicon-triangle-left' }), 'Show all'],
          }),
        x.jsx(d1, {
          name: 'actions',
          rootItem: m,
          treeState: y,
          setTreeState: v,
          selectedItem: S,
          onSelected: O,
          onHighlighted: R,
          onAccepted: b,
          isError: _,
          isVisible: C,
          render: T,
        }),
      ],
    });
  },
  pf = (t, e) => {
    var S, _;
    const {
        sdkLanguage: n,
        revealConsole: s,
        revealAttachment: o,
        isLive: l,
        showDuration: c,
        showBadges: u,
      } = e,
      { errors: d, warnings: h } = Nx(t),
      y = !!((S = t.attachments) != null && S.length) && !!o,
      v = Dg(t, n || 'javascript'),
      m =
        t.class === 'Test' &&
        t.method === 'step' &&
        ((_ = t.annotations) == null ? void 0 : _.some(b => b.type === 'skip'));
    let w = '';
    return (
      t.endTime ? (w = yt(t.endTime - t.startTime)) : t.error ? (w = 'Timed out') : l || (w = '-'),
      x.jsxs(x.Fragment, {
        children: [
          x.jsxs('div', {
            className: 'action-title',
            title: t.apiName,
            children: [
              x.jsx('span', { children: t.apiName }),
              v &&
                (v.type === 'locator'
                  ? x.jsxs(x.Fragment, {
                      children: [
                        x.jsx('span', {
                          className: 'action-parameter action-locator-parameter',
                          children: v.value,
                        }),
                        v.childDisplayString &&
                          x.jsx('span', {
                            className: 'action-parameter action-generic-parameter',
                            children: v.childDisplayString.value,
                          }),
                      ],
                    })
                  : x.jsx('span', {
                      className: 'action-parameter action-generic-parameter',
                      children: v.value,
                    })),
              t.method === 'goto' &&
                t.params.url &&
                x.jsx('div', {
                  className: 'action-url',
                  title: t.params.url,
                  children: t.params.url,
                }),
              t.class === 'APIRequestContext' &&
                t.params.url &&
                x.jsx('div', {
                  className: 'action-url',
                  title: t.params.url,
                  children: p1(t.params.url),
                }),
            ],
          }),
          (c || u || y || m) && x.jsx('div', { className: 'spacer' }),
          y &&
            x.jsx(Rt, {
              icon: 'attach',
              title: 'Open Attachment',
              onClick: () => o(t.attachments[0]),
            }),
          c &&
            !m &&
            x.jsx('div', {
              className: 'action-duration',
              children: w || x.jsx('span', { className: 'codicon codicon-loading' }),
            }),
          m &&
            x.jsx('span', {
              className: Ue('action-skipped', 'codicon', Rg('skipped')),
              title: 'skipped',
            }),
          u &&
            x.jsxs('div', {
              className: 'action-icons',
              onClick: () => (s == null ? void 0 : s()),
              children: [
                !!d &&
                  x.jsxs('div', {
                    className: 'action-icon',
                    children: [
                      x.jsx('span', { className: 'codicon codicon-error' }),
                      x.jsx('span', { className: 'action-icon-value', children: d }),
                    ],
                  }),
                !!h &&
                  x.jsxs('div', {
                    className: 'action-icon',
                    children: [
                      x.jsx('span', { className: 'codicon codicon-warning' }),
                      x.jsx('span', { className: 'action-icon-value', children: h }),
                    ],
                  }),
              ],
            }),
        ],
      })
    );
  };
function p1(t) {
  try {
    const e = new URL(t);
    return e.pathname + e.search;
  } catch {
    return t;
  }
}
const m1 = t => {
    switch (t.method) {
      case 'clockPauseAt':
      case 'clockSetFixedTime':
      case 'clockSetSystemTime':
        return t.params.timeString === void 0 && t.params.timeNumber === void 0
          ? void 0
          : {
              type: 'generic',
              value: new Date(t.params.timeString ?? t.params.timeNumber).toLocaleString(void 0, {
                timeZone: 'UTC',
              }),
            };
      case 'clockFastForward':
      case 'clockRunFor':
        return t.params.ticksNumber === void 0 && t.params.ticksString === void 0
          ? void 0
          : { type: 'generic', value: t.params.ticksString ?? `${t.params.ticksNumber}ms` };
    }
  },
  g1 = t => {
    switch (t.method) {
      case 'press':
      case 'keyboardPress':
      case 'keyboardDown':
      case 'keyboardUp':
        return t.params.key === void 0 ? void 0 : { type: 'generic', value: t.params.key };
      case 'type':
      case 'fill':
      case 'keyboardType':
      case 'keyboardInsertText': {
        const e = t.params.text ?? t.params.value;
        return e === void 0 ? void 0 : { type: 'generic', value: `"${e}"` };
      }
    }
  },
  y1 = t => {
    switch (t.method) {
      case 'click':
      case 'dblclick':
      case 'mouseClick':
      case 'mouseMove':
        return t.params.x === void 0 || t.params.y === void 0
          ? void 0
          : { type: 'generic', value: `(${t.params.x}, ${t.params.y})` };
      case 'mouseWheel':
        return t.params.deltaX === void 0 || t.params.deltaY === void 0
          ? void 0
          : { type: 'generic', value: `(${t.params.deltaX}, ${t.params.deltaY})` };
    }
  },
  v1 = t => {
    switch (t.method) {
      case 'tap':
        return t.params.x === void 0 || t.params.y === void 0
          ? void 0
          : { type: 'generic', value: `(${t.params.x}, ${t.params.y})` };
    }
  },
  Dg = (t, e, n = !1) => {
    const s = t.params;
    if (!n && s.selector !== void 0)
      return { type: 'locator', value: or(e, s.selector), childDisplayString: Dg(t, e, !0) };
    switch (t.class.toLowerCase()) {
      case 'browsercontext':
        return m1(t);
      case 'page':
      case 'frame':
      case 'elementhandle':
        return g1(t) ?? y1(t) ?? v1(t);
    }
  },
  mf = ({ value: t, description: e }) => {
    const [n, s] = P.useState('copy'),
      o = P.useCallback(() => {
        (typeof t == 'function' ? t() : Promise.resolve(t)).then(
          c => {
            navigator.clipboard.writeText(c).then(
              () => {
                s('check'),
                  setTimeout(() => {
                    s('copy');
                  }, 3e3);
              },
              () => {
                s('close');
              }
            );
          },
          () => {
            s('close');
          }
        );
      }, [t]);
    return x.jsx(Rt, { title: e || 'Copy', icon: n, onClick: o });
  },
  Ml = ({ value: t, description: e, copiedDescription: n = e, style: s }) => {
    const [o, l] = P.useState(!1),
      c = P.useCallback(async () => {
        const u = typeof t == 'function' ? await t() : t;
        await navigator.clipboard.writeText(u), l(!0), setTimeout(() => l(!1), 3e3);
      }, [t]);
    return x.jsx(Rt, {
      style: s,
      title: e,
      onClick: c,
      className: 'copy-to-clipboard-text-button',
      children: o ? n : e,
    });
  },
  $r = ({ text: t }) =>
    x.jsx('div', {
      className: 'fill',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.5,
      },
      children: t,
    }),
  w1 = ({ action: t, startTimeOffset: e, sdkLanguage: n }) => {
    const s = P.useMemo(
      () => Object.keys((t == null ? void 0 : t.params) ?? {}).filter(c => c !== 'info'),
      [t]
    );
    if (!t) return x.jsx($r, { text: 'No action selected' });
    const o = t.startTime - e,
      l = yt(o);
    return x.jsxs('div', {
      className: 'call-tab',
      children: [
        x.jsx('div', { className: 'call-line', children: t.apiName }),
        x.jsx('div', { className: 'call-section', children: 'Time' }),
        x.jsx(am, { name: 'start:', value: l }),
        x.jsx(am, { name: 'duration:', value: x1(t) }),
        !!s.length &&
          x.jsxs(x.Fragment, {
            children: [
              x.jsx('div', { className: 'call-section', children: 'Parameters' }),
              s.map(c => cm(um(t, c, t.params[c], n))),
            ],
          }),
        !!t.result &&
          x.jsxs(x.Fragment, {
            children: [
              x.jsx('div', { className: 'call-section', children: 'Return value' }),
              Object.keys(t.result).map(c => cm(um(t, c, t.result[c], n))),
            ],
          }),
      ],
    });
  },
  am = ({ name: t, value: e }) =>
    x.jsxs('div', {
      className: 'call-line',
      children: [t, x.jsx('span', { className: 'call-value datetime', title: e, children: e })],
    });
function x1(t) {
  return t.endTime ? yt(t.endTime - t.startTime) : t.error ? 'Timed Out' : 'Running';
}
function cm(t) {
  let e = t.text.replace(/\n/g, '↵');
  return (
    t.type === 'string' && (e = `"${e}"`),
    x.jsxs(
      'div',
      {
        className: 'call-line',
        children: [
          t.name,
          ':',
          x.jsx('span', { className: Ue('call-value', t.type), title: t.text, children: e }),
          ['string', 'number', 'object', 'locator'].includes(t.type) &&
            x.jsx(mf, { value: t.text }),
        ],
      },
      t.name
    )
  );
}
function um(t, e, n, s) {
  const o = t.method.includes('eval') || t.method === 'waitForFunction';
  if (e === 'files') return { text: '<files>', type: 'string', name: e };
  if (
    ((e === 'eventInit' || e === 'expectedValue' || (e === 'arg' && o)) &&
      (n = Kl(n.value, new Array(10).fill({ handle: '<handle>' }))),
    ((e === 'value' && o) || (e === 'received' && t.method === 'expect')) &&
      (n = Kl(n, new Array(10).fill({ handle: '<handle>' }))),
    e === 'selector')
  )
    return { text: or(s || 'javascript', t.params.selector), type: 'locator', name: 'locator' };
  const l = typeof n;
  return l !== 'object' || n === null
    ? { text: String(n), type: l, name: e }
    : n.guid
      ? { text: '<handle>', type: 'handle', name: e }
      : { text: JSON.stringify(n).slice(0, 1e3), type: 'object', name: e };
}
function Kl(t, e) {
  if (t.n !== void 0) return t.n;
  if (t.s !== void 0) return t.s;
  if (t.b !== void 0) return t.b;
  if (t.v !== void 0) {
    if (t.v === 'undefined') return;
    if (t.v === 'null') return null;
    if (t.v === 'NaN') return NaN;
    if (t.v === 'Infinity') return 1 / 0;
    if (t.v === '-Infinity') return -1 / 0;
    if (t.v === '-0') return -0;
  }
  if (t.d !== void 0) return new Date(t.d);
  if (t.r !== void 0) return new RegExp(t.r.p, t.r.f);
  if (t.a !== void 0) return t.a.map(n => Kl(n, e));
  if (t.o !== void 0) {
    const n = {};
    for (const { k: s, v: o } of t.o) n[s] = Kl(o, e);
    return n;
  }
  return t.h !== void 0 ? (e === void 0 ? '<object>' : e[t.h]) : '<object>';
}
const fm = new Map();
function ia({
  name: t,
  items: e = [],
  id: n,
  render: s,
  icon: o,
  isError: l,
  isWarning: c,
  isInfo: u,
  selectedItem: d,
  onAccepted: h,
  onSelected: y,
  onHighlighted: v,
  onIconClicked: m,
  noItemsMessage: w,
  dataTestId: S,
  notSelectable: _,
}) {
  const b = P.useRef(null),
    [T, C] = P.useState();
  return (
    P.useEffect(() => {
      v == null || v(T);
    }, [v, T]),
    P.useEffect(() => {
      const O = b.current;
      if (!O) return;
      const R = () => {
        fm.set(t, O.scrollTop);
      };
      return (
        O.addEventListener('scroll', R, { passive: !0 }), () => O.removeEventListener('scroll', R)
      );
    }, [t]),
    P.useEffect(() => {
      b.current && (b.current.scrollTop = fm.get(t) || 0);
    }, [t]),
    x.jsx('div', {
      className: Ue('list-view vbox', t + '-list-view'),
      role: e.length > 0 ? 'list' : void 0,
      'data-testid': S || t + '-list',
      children: x.jsxs('div', {
        className: Ue('list-view-content', _ && 'not-selectable'),
        tabIndex: 0,
        onKeyDown: O => {
          var U;
          if (d && O.key === 'Enter') {
            h == null || h(d, e.indexOf(d));
            return;
          }
          if (O.key !== 'ArrowDown' && O.key !== 'ArrowUp') return;
          O.stopPropagation(), O.preventDefault();
          const R = d ? e.indexOf(d) : -1;
          let D = R;
          O.key === 'ArrowDown' && (R === -1 ? (D = 0) : (D = Math.min(R + 1, e.length - 1))),
            O.key === 'ArrowUp' && (R === -1 ? (D = e.length - 1) : (D = Math.max(R - 1, 0)));
          const F = (U = b.current) == null ? void 0 : U.children.item(D);
          lg(F || void 0), v == null || v(void 0), y == null || y(e[D], D), C(void 0);
        },
        ref: b,
        children: [
          w && e.length === 0 && x.jsx('div', { className: 'list-view-empty', children: w }),
          e.map((O, R) => {
            const D = s(O, R);
            return x.jsxs(
              'div',
              {
                onDoubleClick: () => (h == null ? void 0 : h(O, R)),
                role: 'listitem',
                className: Ue(
                  'list-view-entry',
                  d === O && 'selected',
                  !_ && T === O && 'highlighted',
                  (l == null ? void 0 : l(O, R)) && 'error',
                  (c == null ? void 0 : c(O, R)) && 'warning',
                  (u == null ? void 0 : u(O, R)) && 'info'
                ),
                onClick: () => (y == null ? void 0 : y(O, R)),
                onMouseEnter: () => C(O),
                onMouseLeave: () => C(void 0),
                children: [
                  o &&
                    x.jsx('div', {
                      className: 'codicon ' + (o(O, R) || 'codicon-blank'),
                      style: { minWidth: 16, marginRight: 4 },
                      onDoubleClick: F => {
                        F.preventDefault(), F.stopPropagation();
                      },
                      onClick: F => {
                        F.stopPropagation(), F.preventDefault(), m == null || m(O, R);
                      },
                    }),
                  typeof D == 'string'
                    ? x.jsx('div', {
                        style: { textOverflow: 'ellipsis', overflow: 'hidden' },
                        children: D,
                      })
                    : D,
                ],
              },
              (n == null ? void 0 : n(O, R)) || R
            );
          }),
        ],
      }),
    })
  );
}
const S1 = ia,
  _1 = ({ action: t, isLive: e }) => {
    const n = P.useMemo(() => {
      var c;
      if (!t || !t.log.length) return [];
      const s = t.log,
        o = t.context.wallTime - t.context.startTime,
        l = [];
      for (let u = 0; u < s.length; ++u) {
        let d = '';
        if (s[u].time !== -1) {
          const h = (c = s[u]) == null ? void 0 : c.time;
          u + 1 < s.length
            ? (d = yt(s[u + 1].time - h))
            : t.endTime > 0
              ? (d = yt(t.endTime - h))
              : e
                ? (d = yt(Date.now() - o - h))
                : (d = '-');
        }
        l.push({ message: s[u].message, time: d });
      }
      return l;
    }, [t, e]);
    return n.length
      ? x.jsx(S1, {
          name: 'log',
          items: n,
          render: s =>
            x.jsxs('div', {
              className: 'log-list-item',
              children: [
                x.jsx('span', { className: 'log-list-duration', children: s.time }),
                s.message,
              ],
            }),
          notSelectable: !0,
        })
      : x.jsx($r, { text: 'No log entries' });
  };
function Qi(t, e) {
  const n = /(\x1b\[(\d+(;\d+)*)m)|([^\x1b]+)/g,
    s = [];
  let o,
    l = {},
    c = !1,
    u = e == null ? void 0 : e.fg,
    d = e == null ? void 0 : e.bg;
  for (; (o = n.exec(t)) !== null; ) {
    const [, , h, , y] = o;
    if (h) {
      const v = +h;
      switch (v) {
        case 0:
          l = {};
          break;
        case 1:
          l['font-weight'] = 'bold';
          break;
        case 2:
          l.opacity = '0.8';
          break;
        case 3:
          l['font-style'] = 'italic';
          break;
        case 4:
          l['text-decoration'] = 'underline';
          break;
        case 7:
          c = !0;
          break;
        case 8:
          l.display = 'none';
          break;
        case 9:
          l['text-decoration'] = 'line-through';
          break;
        case 22:
          delete l['font-weight'],
            delete l['font-style'],
            delete l.opacity,
            delete l['text-decoration'];
          break;
        case 23:
          delete l['font-weight'], delete l['font-style'], delete l.opacity;
          break;
        case 24:
          delete l['text-decoration'];
          break;
        case 27:
          c = !1;
          break;
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
          u = dm[v - 30];
          break;
        case 39:
          u = e == null ? void 0 : e.fg;
          break;
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
          d = dm[v - 40];
          break;
        case 49:
          d = e == null ? void 0 : e.bg;
          break;
        case 53:
          l['text-decoration'] = 'overline';
          break;
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 97:
          u = hm[v - 90];
          break;
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
          d = hm[v - 100];
          break;
      }
    } else if (y) {
      const v = { ...l },
        m = c ? d : u;
      m !== void 0 && (v.color = m);
      const w = c ? u : d;
      w !== void 0 && (v['background-color'] = w), s.push(`<span style="${b1(v)}">${k1(y)}</span>`);
    }
  }
  return s.join('');
}
const dm = {
    0: 'var(--vscode-terminal-ansiBlack)',
    1: 'var(--vscode-terminal-ansiRed)',
    2: 'var(--vscode-terminal-ansiGreen)',
    3: 'var(--vscode-terminal-ansiYellow)',
    4: 'var(--vscode-terminal-ansiBlue)',
    5: 'var(--vscode-terminal-ansiMagenta)',
    6: 'var(--vscode-terminal-ansiCyan)',
    7: 'var(--vscode-terminal-ansiWhite)',
  },
  hm = {
    0: 'var(--vscode-terminal-ansiBrightBlack)',
    1: 'var(--vscode-terminal-ansiBrightRed)',
    2: 'var(--vscode-terminal-ansiBrightGreen)',
    3: 'var(--vscode-terminal-ansiBrightYellow)',
    4: 'var(--vscode-terminal-ansiBrightBlue)',
    5: 'var(--vscode-terminal-ansiBrightMagenta)',
    6: 'var(--vscode-terminal-ansiBrightCyan)',
    7: 'var(--vscode-terminal-ansiBrightWhite)',
  };
function k1(t) {
  return t.replace(/[&"<>]/g, e => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[e]);
}
function b1(t) {
  return Object.entries(t)
    .map(([e, n]) => `${e}: ${n}`)
    .join('; ');
}
const E1 = ({ error: t }) => {
  const e = P.useMemo(() => Qi(t), [t]);
  return x.jsx('div', { className: 'error-message', dangerouslySetInnerHTML: { __html: e || '' } });
};
function Nr() {
  return (
    (Nr = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
          }
          return t;
        }),
    Nr.apply(this, arguments)
  );
}
const T1 = ['children', 'options'],
  ae = {
    blockQuote: '0',
    breakLine: '1',
    breakThematic: '2',
    codeBlock: '3',
    codeFenced: '4',
    codeInline: '5',
    footnote: '6',
    footnoteReference: '7',
    gfmTask: '8',
    heading: '9',
    headingSetext: '10',
    htmlBlock: '11',
    htmlComment: '12',
    htmlSelfClosing: '13',
    image: '14',
    link: '15',
    linkAngleBraceStyleDetector: '16',
    linkBareUrlDetector: '17',
    linkMailtoDetector: '18',
    newlineCoalescer: '19',
    orderedList: '20',
    paragraph: '21',
    ref: '22',
    refImage: '23',
    refLink: '24',
    table: '25',
    text: '27',
    textBolded: '28',
    textEmphasized: '29',
    textEscaped: '30',
    textMarked: '31',
    textStrikethroughed: '32',
    unorderedList: '33',
  };
var pm;
(function (t) {
  (t[(t.MAX = 0)] = 'MAX'),
    (t[(t.HIGH = 1)] = 'HIGH'),
    (t[(t.MED = 2)] = 'MED'),
    (t[(t.LOW = 3)] = 'LOW'),
    (t[(t.MIN = 4)] = 'MIN');
})(pm || (pm = {}));
const mm = [
    'allowFullScreen',
    'allowTransparency',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'classId',
    'colSpan',
    'contentEditable',
    'contextMenu',
    'crossOrigin',
    'encType',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'hrefLang',
    'inputMode',
    'keyParams',
    'keyType',
    'marginHeight',
    'marginWidth',
    'maxLength',
    'mediaGroup',
    'minLength',
    'noValidate',
    'radioGroup',
    'readOnly',
    'rowSpan',
    'spellCheck',
    'srcDoc',
    'srcLang',
    'srcSet',
    'tabIndex',
    'useMap',
  ].reduce((t, e) => ((t[e.toLowerCase()] = e), t), { class: 'className', for: 'htmlFor' }),
  gm = { amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '“' },
  N1 = ['style', 'script'],
  C1 =
    /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,
  A1 = /mailto:/i,
  L1 = /\n{2,}$/,
  Fg = /^(\s*>[\s\S]*?)(?=\n\n|$)/,
  j1 = /^ *> ?/gm,
  I1 = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/,
  O1 = /^ {2,}\n/,
  M1 = /^(?:( *[-*_])){3,} *(?:\n *)+\n/,
  zg = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/,
  Bg = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,
  $1 = /^(`+)((?:\\`|[^`])+)\1/,
  P1 = /^(?:\n *)*\n/,
  R1 = /\r\n?/g,
  D1 = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/,
  F1 = /^\[\^([^\]]+)]/,
  z1 = /\f/g,
  B1 = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,
  U1 = /^\s*?\[(x|\s)\]/,
  Ug = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
  qg = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
  Hg = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,
  Gu =
    /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,
  q1 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
  Vg = /^<!--[\s\S]*?(?:-->)/,
  H1 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/,
  Xu = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,
  V1 = /^\{.*\}$/,
  W1 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  K1 = /^<([^ >]+@[^ >]+)>/,
  Q1 = /^<([^ >]+:\/[^ >]+)>/,
  G1 = /-([a-z])?/gi,
  Wg = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/,
  X1 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,
  J1 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/,
  Y1 = /^\[([^\]]*)\] ?\[([^\]]*)\]/,
  Z1 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,
  eS = /\t/g,
  tS = /(^ *\||\| *$)/g,
  nS = /^ *:-+: *$/,
  rS = /^ *:-+ *$/,
  sS = /^ *-+: *$/,
  oa = '((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)',
  iS = new RegExp(`^([*_])\\1${oa}\\1\\1(?!\\1)`),
  oS = new RegExp(`^([*_])${oa}\\1(?!\\1)`),
  lS = new RegExp(`^(==)${oa}\\1`),
  aS = new RegExp(`^(~~)${oa}\\1`),
  cS = /^\\([^0-9A-Za-z\s])/,
  vu = /\\([^0-9A-Za-z\s])/g,
  uS = /^([\s\S](?:(?! {2}|[0-9]\.)[^*_~\-\n<`\\\[!])*)/,
  fS = /^\n+/,
  dS = /^([ \t]*)/,
  hS = /\\([^\\])/g,
  pS = /(?:^|\n)( *)$/,
  gf = '(?:\\d+\\.)',
  yf = '(?:[*+-])';
function Kg(t) {
  return '( *)(' + (t === 1 ? gf : yf) + ') +';
}
const Qg = Kg(1),
  Gg = Kg(2);
function Xg(t) {
  return new RegExp('^' + (t === 1 ? Qg : Gg));
}
const mS = Xg(1),
  gS = Xg(2);
function Jg(t) {
  return new RegExp(
    '^' + (t === 1 ? Qg : Gg) + '[^\\n]*(?:\\n(?!\\1' + (t === 1 ? gf : yf) + ' )[^\\n]*)*(\\n|$)',
    'gm'
  );
}
const yS = Jg(1),
  vS = Jg(2);
function Yg(t) {
  const e = t === 1 ? gf : yf;
  return new RegExp(
    '^( *)(' + e + ') [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1' + e + ' (?!' + e + ' ))\\n*|\\s*\\n*$)'
  );
}
const Zg = Yg(1),
  ey = Yg(2);
function ym(t, e) {
  const n = e === 1,
    s = n ? Zg : ey,
    o = n ? yS : vS,
    l = n ? mS : gS;
  return {
    match: Ls(function (c, u) {
      const d = pS.exec(u.prevCapture);
      return d && (u.list || (!u.inline && !u.simple)) ? s.exec((c = d[1] + c)) : null;
    }),
    order: 1,
    parse(c, u, d) {
      const h = n ? +c[2] : void 0,
        y = c[0]
          .replace(
            L1,
            `
`
          )
          .match(o);
      let v = !1;
      return {
        items: y.map(function (m, w) {
          const S = l.exec(m)[0].length,
            _ = new RegExp('^ {1,' + S + '}', 'gm'),
            b = m.replace(_, '').replace(l, ''),
            T = w === y.length - 1,
            C =
              b.indexOf(`

`) !== -1 ||
              (T && v);
          v = C;
          const O = d.inline,
            R = d.list;
          let D;
          (d.list = !0),
            C
              ? ((d.inline = !1),
                (D =
                  Gi(b) +
                  `

`))
              : ((d.inline = !0), (D = Gi(b)));
          const F = u(D, d);
          return (d.inline = O), (d.list = R), F;
        }),
        ordered: n,
        start: h,
      };
    },
    render: (c, u, d) =>
      t(
        c.ordered ? 'ol' : 'ul',
        { key: d.key, start: c.type === ae.orderedList ? c.start : void 0 },
        c.items.map(function (h, y) {
          return t('li', { key: y }, u(h, d));
        })
      ),
  };
}
const wS = new RegExp(
    `^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`
  ),
  xS = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,
  ty = [Fg, zg, Bg, Ug, Hg, qg, Wg, Zg, ey],
  SS = [...ty, /^[^\n]+(?: {2}\n|\n{2,})/, Gu, Vg, Xu];
function Gi(t) {
  let e = t.length;
  for (; e > 0 && t[e - 1] <= ' '; ) e--;
  return t.slice(0, e);
}
function Mi(t) {
  return t
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, 'a')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ðÐ]/g, 'd')
    .replace(/[ÈÉÊËéèêë]/g, 'e')
    .replace(/[ÏïÎîÍíÌì]/g, 'i')
    .replace(/[Ññ]/g, 'n')
    .replace(/[øØœŒÕõÔôÓóÒò]/g, 'o')
    .replace(/[ÜüÛûÚúÙù]/g, 'u')
    .replace(/[ŸÿÝý]/g, 'y')
    .replace(/[^a-z0-9- ]/gi, '')
    .replace(/ /gi, '-')
    .toLowerCase();
}
function _S(t) {
  return sS.test(t) ? 'right' : nS.test(t) ? 'center' : rS.test(t) ? 'left' : null;
}
function vm(t, e, n, s) {
  const o = n.inTable;
  n.inTable = !0;
  let l = [[]],
    c = '';
  function u() {
    if (!c) return;
    const d = l[l.length - 1];
    d.push.apply(d, e(c, n)), (c = '');
  }
  return (
    t
      .trim()
      .split(/(`[^`]*`|\\\||\|)/)
      .filter(Boolean)
      .forEach((d, h, y) => {
        d.trim() === '|' && (u(), s) ? h !== 0 && h !== y.length - 1 && l.push([]) : (c += d);
      }),
    u(),
    (n.inTable = o),
    l
  );
}
function kS(t, e, n) {
  n.inline = !0;
  const s = t[2] ? t[2].replace(tS, '').split('|').map(_S) : [],
    o = t[3]
      ? (function (c, u, d) {
          return c
            .trim()
            .split(
              `
`
            )
            .map(function (h) {
              return vm(h, u, d, !0);
            });
        })(t[3], e, n)
      : [],
    l = vm(t[1], e, n, !!o.length);
  return (
    (n.inline = !1),
    o.length
      ? { align: s, cells: o, header: l, type: ae.table }
      : { children: l, type: ae.paragraph }
  );
}
function wm(t, e) {
  return t.align[e] == null ? {} : { textAlign: t.align[e] };
}
function Ls(t) {
  return (t.inline = 1), t;
}
function nr(t) {
  return Ls(function (e, n) {
    return n.inline ? t.exec(e) : null;
  });
}
function rr(t) {
  return Ls(function (e, n) {
    return n.inline || n.simple ? t.exec(e) : null;
  });
}
function Cn(t) {
  return function (e, n) {
    return n.inline || n.simple ? null : t.exec(e);
  };
}
function $i(t) {
  return Ls(function (e) {
    return t.exec(e);
  });
}
function bS(t, e) {
  if (e.inline || e.simple) return null;
  let n = '';
  t.split(
    `
`
  ).every(
    o => (
      (o += `
`),
      !ty.some(l => l.test(o)) && ((n += o), !!o.trim())
    )
  );
  const s = Gi(n);
  return s == '' ? null : [n, , s];
}
function ES(t) {
  try {
    if (
      decodeURIComponent(t)
        .replace(/[^A-Za-z0-9/:]/g, '')
        .match(/^\s*(javascript|vbscript|data(?!:image)):/i)
    )
      return null;
  } catch {
    return null;
  }
  return t;
}
function xm(t) {
  return t.replace(hS, '$1');
}
function $l(t, e, n) {
  const s = n.inline || !1,
    o = n.simple || !1;
  (n.inline = !0), (n.simple = !0);
  const l = t(e, n);
  return (n.inline = s), (n.simple = o), l;
}
function TS(t, e, n) {
  const s = n.inline || !1,
    o = n.simple || !1;
  (n.inline = !1), (n.simple = !0);
  const l = t(e, n);
  return (n.inline = s), (n.simple = o), l;
}
function NS(t, e, n) {
  const s = n.inline || !1;
  n.inline = !1;
  const o = t(e, n);
  return (n.inline = s), o;
}
const wu = (t, e, n) => ({ children: $l(e, t[2], n) });
function xu() {
  return {};
}
function Su() {
  return null;
}
function CS(...t) {
  return t.filter(Boolean).join(' ');
}
function _u(t, e, n) {
  let s = t;
  const o = e.split('.');
  for (; o.length && ((s = s[o[0]]), s !== void 0); ) o.shift();
  return s || n;
}
function AS(t = '', e = {}) {
  function n(m, w, ...S) {
    const _ = _u(e.overrides, `${m}.props`, {});
    return e.createElement(
      (function (b, T) {
        const C = _u(T, b);
        return C
          ? typeof C == 'function' || (typeof C == 'object' && 'render' in C)
            ? C
            : _u(T, `${b}.component`, b)
          : b;
      })(m, e.overrides),
      Nr({}, w, _, { className: CS(w == null ? void 0 : w.className, _.className) || void 0 }),
      ...S
    );
  }
  function s(m) {
    m = m.replace(B1, '');
    let w = !1;
    e.forceInline ? (w = !0) : e.forceBlock || (w = Z1.test(m) === !1);
    const S = h(
      d(
        w
          ? m
          : `${Gi(m).replace(fS, '')}

`,
        { inline: w }
      )
    );
    for (; typeof S[S.length - 1] == 'string' && !S[S.length - 1].trim(); ) S.pop();
    if (e.wrapper === null) return S;
    const _ = e.wrapper || (w ? 'span' : 'div');
    let b;
    if (S.length > 1 || e.forceWrapper) b = S;
    else {
      if (S.length === 1)
        return (b = S[0]), typeof b == 'string' ? n('span', { key: 'outer' }, b) : b;
      b = null;
    }
    return e.createElement(_, { key: 'outer' }, b);
  }
  function o(m, w) {
    const S = w.match(C1);
    return S
      ? S.reduce(function (_, b) {
          const T = b.indexOf('=');
          if (T !== -1) {
            const C = (function (F) {
                return (
                  F.indexOf('-') !== -1 &&
                    F.match(H1) === null &&
                    (F = F.replace(G1, function (U, B) {
                      return B.toUpperCase();
                    })),
                  F
                );
              })(b.slice(0, T)).trim(),
              O = (function (F) {
                const U = F[0];
                return (U === '"' || U === "'") && F.length >= 2 && F[F.length - 1] === U
                  ? F.slice(1, -1)
                  : F;
              })(b.slice(T + 1).trim()),
              R = mm[C] || C;
            if (R === 'ref') return _;
            const D = (_[R] = (function (F, U, B, I) {
              return U === 'style'
                ? B.split(/;\s?/).reduce(function (Q, W) {
                    const z = W.slice(0, W.indexOf(':'));
                    return (
                      (Q[z.trim().replace(/(-[a-z])/g, J => J[1].toUpperCase())] = W.slice(
                        z.length + 1
                      ).trim()),
                      Q
                    );
                  }, {})
                : U === 'href' || U === 'src'
                  ? I(B, F, U)
                  : (B.match(V1) && (B = B.slice(1, B.length - 1)),
                    B === 'true' || (B !== 'false' && B));
            })(m, C, O, e.sanitizer));
            typeof D == 'string' && (Gu.test(D) || Xu.test(D)) && (_[R] = s(D.trim()));
          } else b !== 'style' && (_[mm[b] || b] = !0);
          return _;
        }, {})
      : null;
  }
  (e.overrides = e.overrides || {}),
    (e.sanitizer = e.sanitizer || ES),
    (e.slugify = e.slugify || Mi),
    (e.namedCodesToUnicode = e.namedCodesToUnicode ? Nr({}, gm, e.namedCodesToUnicode) : gm),
    (e.createElement = e.createElement || P.createElement);
  const l = [],
    c = {},
    u = {
      [ae.blockQuote]: {
        match: Cn(Fg),
        order: 1,
        parse(m, w, S) {
          const [, _, b] = m[0].replace(j1, '').match(I1);
          return { alert: _, children: w(b, S) };
        },
        render(m, w, S) {
          const _ = { key: S.key };
          return (
            m.alert &&
              ((_.className = 'markdown-alert-' + e.slugify(m.alert.toLowerCase(), Mi)),
              m.children.unshift({
                attrs: {},
                children: [{ type: ae.text, text: m.alert }],
                noInnerParse: !0,
                type: ae.htmlBlock,
                tag: 'header',
              })),
            n('blockquote', _, w(m.children, S))
          );
        },
      },
      [ae.breakLine]: {
        match: $i(O1),
        order: 1,
        parse: xu,
        render: (m, w, S) => n('br', { key: S.key }),
      },
      [ae.breakThematic]: {
        match: Cn(M1),
        order: 1,
        parse: xu,
        render: (m, w, S) => n('hr', { key: S.key }),
      },
      [ae.codeBlock]: {
        match: Cn(Bg),
        order: 0,
        parse: m => ({ lang: void 0, text: Gi(m[0].replace(/^ {4}/gm, '')).replace(vu, '$1') }),
        render: (m, w, S) =>
          n(
            'pre',
            { key: S.key },
            n('code', Nr({}, m.attrs, { className: m.lang ? `lang-${m.lang}` : '' }), m.text)
          ),
      },
      [ae.codeFenced]: {
        match: Cn(zg),
        order: 0,
        parse: m => ({
          attrs: o('code', m[3] || ''),
          lang: m[2] || void 0,
          text: m[4].replace(vu, '$1'),
          type: ae.codeBlock,
        }),
      },
      [ae.codeInline]: {
        match: rr($1),
        order: 3,
        parse: m => ({ text: m[2].replace(vu, '$1') }),
        render: (m, w, S) => n('code', { key: S.key }, m.text),
      },
      [ae.footnote]: {
        match: Cn(D1),
        order: 0,
        parse: m => (l.push({ footnote: m[2], identifier: m[1] }), {}),
        render: Su,
      },
      [ae.footnoteReference]: {
        match: nr(F1),
        order: 1,
        parse: m => ({ target: `#${e.slugify(m[1], Mi)}`, text: m[1] }),
        render: (m, w, S) =>
          n(
            'a',
            { key: S.key, href: e.sanitizer(m.target, 'a', 'href') },
            n('sup', { key: S.key }, m.text)
          ),
      },
      [ae.gfmTask]: {
        match: nr(U1),
        order: 1,
        parse: m => ({ completed: m[1].toLowerCase() === 'x' }),
        render: (m, w, S) =>
          n('input', { checked: m.completed, key: S.key, readOnly: !0, type: 'checkbox' }),
      },
      [ae.heading]: {
        match: Cn(e.enforceAtxHeadings ? qg : Ug),
        order: 1,
        parse: (m, w, S) => ({
          children: $l(w, m[2], S),
          id: e.slugify(m[2], Mi),
          level: m[1].length,
        }),
        render: (m, w, S) => n(`h${m.level}`, { id: m.id, key: S.key }, w(m.children, S)),
      },
      [ae.headingSetext]: {
        match: Cn(Hg),
        order: 0,
        parse: (m, w, S) => ({
          children: $l(w, m[1], S),
          level: m[2] === '=' ? 1 : 2,
          type: ae.heading,
        }),
      },
      [ae.htmlBlock]: {
        match: $i(Gu),
        order: 1,
        parse(m, w, S) {
          const [, _] = m[3].match(dS),
            b = new RegExp(`^${_}`, 'gm'),
            T = m[3].replace(b, ''),
            C = ((O = T), SS.some(B => B.test(O)) ? NS : $l);
          var O;
          const R = m[1].toLowerCase(),
            D = N1.indexOf(R) !== -1,
            F = (D ? R : m[1]).trim(),
            U = { attrs: o(F, m[2]), noInnerParse: D, tag: F };
          return (
            (S.inAnchor = S.inAnchor || R === 'a'),
            D ? (U.text = m[3]) : (U.children = C(w, T, S)),
            (S.inAnchor = !1),
            U
          );
        },
        render: (m, w, S) =>
          n(m.tag, Nr({ key: S.key }, m.attrs), m.text || (m.children ? w(m.children, S) : '')),
      },
      [ae.htmlSelfClosing]: {
        match: $i(Xu),
        order: 1,
        parse(m) {
          const w = m[1].trim();
          return { attrs: o(w, m[2] || ''), tag: w };
        },
        render: (m, w, S) => n(m.tag, Nr({}, m.attrs, { key: S.key })),
      },
      [ae.htmlComment]: { match: $i(Vg), order: 1, parse: () => ({}), render: Su },
      [ae.image]: {
        match: rr(xS),
        order: 1,
        parse: m => ({ alt: m[1], target: xm(m[2]), title: m[3] }),
        render: (m, w, S) =>
          n('img', {
            key: S.key,
            alt: m.alt || void 0,
            title: m.title || void 0,
            src: e.sanitizer(m.target, 'img', 'src'),
          }),
      },
      [ae.link]: {
        match: nr(wS),
        order: 3,
        parse: (m, w, S) => ({ children: TS(w, m[1], S), target: xm(m[2]), title: m[3] }),
        render: (m, w, S) =>
          n(
            'a',
            { key: S.key, href: e.sanitizer(m.target, 'a', 'href'), title: m.title },
            w(m.children, S)
          ),
      },
      [ae.linkAngleBraceStyleDetector]: {
        match: nr(Q1),
        order: 0,
        parse: m => ({ children: [{ text: m[1], type: ae.text }], target: m[1], type: ae.link }),
      },
      [ae.linkBareUrlDetector]: {
        match: Ls((m, w) => (w.inAnchor || e.disableAutoLink ? null : nr(W1)(m, w))),
        order: 0,
        parse: m => ({
          children: [{ text: m[1], type: ae.text }],
          target: m[1],
          title: void 0,
          type: ae.link,
        }),
      },
      [ae.linkMailtoDetector]: {
        match: nr(K1),
        order: 0,
        parse(m) {
          let w = m[1],
            S = m[1];
          return (
            A1.test(S) || (S = 'mailto:' + S),
            {
              children: [{ text: w.replace('mailto:', ''), type: ae.text }],
              target: S,
              type: ae.link,
            }
          );
        },
      },
      [ae.orderedList]: ym(n, 1),
      [ae.unorderedList]: ym(n, 2),
      [ae.newlineCoalescer]: {
        match: Cn(P1),
        order: 3,
        parse: xu,
        render: () => `
`,
      },
      [ae.paragraph]: {
        match: Ls(bS),
        order: 3,
        parse: wu,
        render: (m, w, S) => n('p', { key: S.key }, w(m.children, S)),
      },
      [ae.ref]: {
        match: nr(X1),
        order: 0,
        parse: m => ((c[m[1]] = { target: m[2], title: m[4] }), {}),
        render: Su,
      },
      [ae.refImage]: {
        match: rr(J1),
        order: 0,
        parse: m => ({ alt: m[1] || void 0, ref: m[2] }),
        render: (m, w, S) =>
          c[m.ref]
            ? n('img', {
                key: S.key,
                alt: m.alt,
                src: e.sanitizer(c[m.ref].target, 'img', 'src'),
                title: c[m.ref].title,
              })
            : null,
      },
      [ae.refLink]: {
        match: nr(Y1),
        order: 0,
        parse: (m, w, S) => ({ children: w(m[1], S), fallbackChildren: m[0], ref: m[2] }),
        render: (m, w, S) =>
          c[m.ref]
            ? n(
                'a',
                {
                  key: S.key,
                  href: e.sanitizer(c[m.ref].target, 'a', 'href'),
                  title: c[m.ref].title,
                },
                w(m.children, S)
              )
            : n('span', { key: S.key }, m.fallbackChildren),
      },
      [ae.table]: {
        match: Cn(Wg),
        order: 1,
        parse: kS,
        render(m, w, S) {
          const _ = m;
          return n(
            'table',
            { key: S.key },
            n(
              'thead',
              null,
              n(
                'tr',
                null,
                _.header.map(function (b, T) {
                  return n('th', { key: T, style: wm(_, T) }, w(b, S));
                })
              )
            ),
            n(
              'tbody',
              null,
              _.cells.map(function (b, T) {
                return n(
                  'tr',
                  { key: T },
                  b.map(function (C, O) {
                    return n('td', { key: O, style: wm(_, O) }, w(C, S));
                  })
                );
              })
            )
          );
        },
      },
      [ae.text]: {
        match: $i(uS),
        order: 4,
        parse: m => ({
          text: m[0].replace(q1, (w, S) =>
            e.namedCodesToUnicode[S] ? e.namedCodesToUnicode[S] : w
          ),
        }),
        render: m => m.text,
      },
      [ae.textBolded]: {
        match: rr(iS),
        order: 2,
        parse: (m, w, S) => ({ children: w(m[2], S) }),
        render: (m, w, S) => n('strong', { key: S.key }, w(m.children, S)),
      },
      [ae.textEmphasized]: {
        match: rr(oS),
        order: 3,
        parse: (m, w, S) => ({ children: w(m[2], S) }),
        render: (m, w, S) => n('em', { key: S.key }, w(m.children, S)),
      },
      [ae.textEscaped]: { match: rr(cS), order: 1, parse: m => ({ text: m[1], type: ae.text }) },
      [ae.textMarked]: {
        match: rr(lS),
        order: 3,
        parse: wu,
        render: (m, w, S) => n('mark', { key: S.key }, w(m.children, S)),
      },
      [ae.textStrikethroughed]: {
        match: rr(aS),
        order: 3,
        parse: wu,
        render: (m, w, S) => n('del', { key: S.key }, w(m.children, S)),
      },
    };
  e.disableParsingRawHTML === !0 && (delete u[ae.htmlBlock], delete u[ae.htmlSelfClosing]);
  const d = (function (m) {
      let w = Object.keys(m);
      function S(_, b) {
        let T,
          C,
          O = [],
          R = '',
          D = '';
        for (b.prevCapture = b.prevCapture || ''; _; ) {
          let F = 0;
          for (; F < w.length; ) {
            if (((R = w[F]), (T = m[R]), b.inline && !T.match.inline)) {
              F++;
              continue;
            }
            const U = T.match(_, b);
            if (U) {
              (D = U[0]),
                (b.prevCapture += D),
                (_ = _.substring(D.length)),
                (C = T.parse(U, S, b)),
                C.type == null && (C.type = R),
                O.push(C);
              break;
            }
            F++;
          }
        }
        return (b.prevCapture = ''), O;
      }
      return (
        w.sort(function (_, b) {
          let T = m[_].order,
            C = m[b].order;
          return T !== C ? T - C : _ < b ? -1 : 1;
        }),
        function (_, b) {
          return S(
            (function (T) {
              return T.replace(
                R1,
                `
`
              )
                .replace(z1, '')
                .replace(eS, '    ');
            })(_),
            b
          );
        }
      );
    })(u),
    h =
      ((y = (function (m, w) {
        return function (S, _, b) {
          const T = m[S.type].render;
          return w ? w(() => T(S, _, b), S, _, b) : T(S, _, b);
        };
      })(u, e.renderRule)),
      function m(w, S = {}) {
        if (Array.isArray(w)) {
          const _ = S.key,
            b = [];
          let T = !1;
          for (let C = 0; C < w.length; C++) {
            S.key = C;
            const O = m(w[C], S),
              R = typeof O == 'string';
            R && T ? (b[b.length - 1] += O) : O !== null && b.push(O), (T = R);
          }
          return (S.key = _), b;
        }
        return y(w, m, S);
      });
  var y;
  const v = s(t);
  return l.length
    ? n(
        'div',
        null,
        v,
        n(
          'footer',
          { key: 'footer' },
          l.map(function (m) {
            return n(
              'div',
              { id: e.slugify(m.identifier, Mi), key: m.identifier },
              m.identifier,
              h(d(m.footnote, { inline: !0 }))
            );
          })
        )
      )
    : v;
}
const LS = t => {
  let { children: e = '', options: n } = t,
    s = (function (o, l) {
      if (o == null) return {};
      var c,
        u,
        d = {},
        h = Object.keys(o);
      for (u = 0; u < h.length; u++) l.indexOf((c = h[u])) >= 0 || (d[c] = o[c]);
      return d;
    })(t, T1);
  return P.cloneElement(AS(e, n), s);
};
var Sm;
(t => {
  function e(n) {
    for (const s of n.splice(0)) s.dispose();
  }
  t.disposeAll = e;
})(Sm || (Sm = {}));
class vs {
  constructor() {
    (this._listeners = new Set()),
      (this.event = (e, n) => {
        this._listeners.add(e);
        let s = !1;
        const o = this,
          l = {
            dispose() {
              s || ((s = !0), o._listeners.delete(e));
            },
          };
        return n && n.push(l), l;
      });
  }
  fire(e) {
    const n = !this._deliveryQueue;
    this._deliveryQueue || (this._deliveryQueue = []);
    for (const s of this._listeners) this._deliveryQueue.push({ listener: s, event: e });
    if (n) {
      for (let s = 0; s < this._deliveryQueue.length; s++) {
        const { listener: o, event: l } = this._deliveryQueue[s];
        o.call(null, l);
      }
      this._deliveryQueue = void 0;
    }
  }
  dispose() {
    this._listeners.clear(), this._deliveryQueue && (this._deliveryQueue = []);
  }
}
async function* ny(t) {
  const e = t.pipeThrough(new TextDecoderStream()).getReader();
  let n = '',
    s = '',
    o = '',
    l = '';
  for (;;) {
    const { value: c, done: u } = await e.read();
    if (u) break;
    n += c;
    const d = n.split(`
`);
    n = d.pop();
    for (const h of d) {
      if (h.length === 0) {
        if (l === '') {
          (l = ''), (o = '');
          continue;
        }
        l[l.length - 1] ===
          `
` && (l = l.substring(0, l.length - 1));
        const w = { type: o || 'message', data: l, id: s };
        (o = ''), (l = ''), yield w;
      }
      if (h[0] === ':') continue;
      let y = '',
        v = '';
      const m = h.indexOf(':');
      switch (
        (m === -1
          ? (y = h)
          : ((y = h.substring(0, m)),
            (v = h[m + 1] === ' ' ? h.substring(m + 2) : h.substring(m + 1))),
        y)
      ) {
        case 'event':
          o = v;
          break;
        case 'data':
          l +=
            v +
            `
`;
          break;
        case 'id':
          s = v;
          break;
      }
    }
  }
}
class jS {
  constructor(e, n = 'https://api.openai.com') {
    xe(this, 'name', 'OpenAI');
    (this.apiKey = e), (this.baseURL = n);
  }
  async *chatCompletion(e, n) {
    const s = new URL('./v1/chat/completions', this.baseURL),
      o = await fetch(s, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          'x-pw-serviceworker': 'forward',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: e.map(({ role: l, content: c }) => ({ role: l, content: c })),
          stream: !0,
        }),
        signal: n,
      });
    if (o.status !== 200 || !o.body)
      throw new Error(
        'Failed to chat with OpenAI, unexpected status: ' + o.status + (await o.text())
      );
    for await (const l of ny(o.body)) {
      const c = JSON.parse(l.data);
      if (c.object === 'chat.completion.chunk') {
        if (c.choices[0].finish_reason) break;
        yield c.choices[0].delta.content;
      }
    }
  }
}
class IS {
  constructor(e, n = 'https://api.anthropic.com') {
    xe(this, 'name', 'Anthropic');
    (this.apiKey = e), (this.baseURL = n);
  }
  async *chatCompletion(e, n) {
    var o;
    const s = await fetch(new URL('./v1/messages', this.baseURL), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'x-pw-serviceworker': 'forward',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        messages: e
          .filter(({ role: l }) => l !== 'developer')
          .map(({ role: l, content: c }) => ({ role: l, content: c })),
        system: (o = e.find(({ role: l }) => l === 'developer')) == null ? void 0 : o.content,
        max_tokens: 1024,
        stream: !0,
      }),
      signal: n,
    });
    if (s.status !== 200 || !s.body)
      throw new Error(
        'Failed to chat with Anthropic, unexpected status: ' + s.status + (await s.text())
      );
    for await (const l of ny(s.body)) {
      const c = JSON.parse(l.data);
      c.type === 'content_block_delta' && (yield c.delta.text);
    }
  }
}
class _m {
  constructor(e) {
    xe(this, 'conversations', new Map());
    this.api = e;
  }
  getConversation(e) {
    return this.conversations.get(e);
  }
  startConversation(e, n) {
    const s = new OS(this, n);
    return this.conversations.set(e, s), s;
  }
}
class OS {
  constructor(e, n) {
    xe(this, 'history');
    xe(this, 'onChange', new vs());
    xe(this, '_abortControllers', new Set());
    (this.chat = e), (this.history = [{ role: 'developer', content: n }]);
  }
  async send(e, n) {
    const s = { role: 'assistant', content: '' };
    this.history.push({ role: 'user', content: e, displayContent: n }, s);
    const o = new AbortController();
    this._abortControllers.add(o), this.onChange.fire();
    try {
      for await (const l of this.chat.api.chatCompletion(this.history, o.signal))
        (s.content += l), this.onChange.fire();
    } finally {
      this._abortControllers.delete(o), this.onChange.fire();
    }
  }
  isSending() {
    return this._abortControllers.size > 0;
  }
  abortSending() {
    for (const e of this._abortControllers) e.abort();
    this._abortControllers.clear(), this.onChange.fire();
  }
  isEmpty() {
    return this.history.length < 2;
  }
}
const vf = P.createContext(void 0);
function xT({ children: t }) {
  const e = ux(),
    n = P.useMemo(() => {
      const s = Object.fromEntries(e);
      if (s.openai_api_key) return new _m(new jS(s.openai_api_key, s.openai_base_url));
      if (s.anthropic_api_key) return new _m(new IS(s.anthropic_api_key, s.anthropic_base_url));
    }, [e]);
  return x.jsx(vf.Provider, { value: n, children: t });
}
function ry() {
  const t = P.useContext(vf);
  if (!t) throw new Error('No LLM chat available, make sure theres a LLMProvider above');
  return t;
}
function MS() {
  return !!P.useContext(vf);
}
function $S(t) {
  const e = ry().getConversation(t);
  if (!e) throw new Error('No conversation found for id: ' + t);
  const [n, s] = P.useState(e.history);
  return (
    P.useEffect(() => {
      function o() {
        s([...e.history]);
      }
      return o(), e.onChange.event(o).dispose;
    }, [e]),
    [n, e]
  );
}
function PS({ conversationId: t }) {
  const [e, n] = $S(t),
    [s, o] = P.useState(''),
    l = P.useCallback(() => {
      o(c => (n.send(c), ''));
    }, [n]);
  return x.jsxs('div', {
    className: 'chat-container',
    children: [
      x.jsxs('p', {
        className: 'chat-disclaimer',
        children: ['Chat based on ', n.chat.api.name, '. Check for mistakes.'],
      }),
      x.jsx('hr', {}),
      x.jsx('div', {
        className: 'messages-container',
        children: e
          .filter(({ role: c }) => c !== 'developer')
          .map((c, u) =>
            x.jsxs(
              'div',
              {
                className: Ue('message', c.role === 'user' && 'user-message'),
                children: [
                  c.role === 'assistant' &&
                    x.jsx('div', {
                      className: 'message-icon',
                      children: x.jsx('img', { src: 'playwright-logo.svg' }),
                    }),
                  x.jsx('div', {
                    className: 'message-content',
                    children: x.jsx(LS, {
                      options: { disableParsingRawHTML: !0 },
                      children: c.displayContent ?? c.content,
                    }),
                  }),
                ],
              },
              '' + u
            )
          ),
      }),
      x.jsxs('div', {
        className: 'input-form',
        children: [
          x.jsx('textarea', {
            name: 'content',
            value: s,
            onChange: c => o(c.target.value),
            onKeyDown: c => {
              c.key === 'Enter' && !c.shiftKey && (c.preventDefault(), l());
            },
            placeholder: 'Ask a question...',
            className: 'message-input',
          }),
          n.isSending()
            ? x.jsx('button', {
                type: 'button',
                className: 'send-button',
                onClick: c => {
                  c.preventDefault(), n.abortSending();
                },
                children: 'Cancel',
              })
            : x.jsx('button', {
                className: 'send-button',
                disabled: !s.trim(),
                onClick: l,
                children: 'Send',
              }),
        ],
      }),
    ],
  });
}
const sy = ({ cursor: t, onPaneMouseMove: e, onPaneMouseUp: n, onPaneDoubleClick: s }) => (
    jt.useEffect(() => {
      const o = document.createElement('div');
      return (
        (o.style.position = 'fixed'),
        (o.style.top = '0'),
        (o.style.right = '0'),
        (o.style.bottom = '0'),
        (o.style.left = '0'),
        (o.style.zIndex = '9999'),
        (o.style.cursor = t),
        document.body.appendChild(o),
        e && o.addEventListener('mousemove', e),
        n && o.addEventListener('mouseup', n),
        s && document.body.addEventListener('dblclick', s),
        () => {
          e && o.removeEventListener('mousemove', e),
            n && o.removeEventListener('mouseup', n),
            s && document.body.removeEventListener('dblclick', s),
            document.body.removeChild(o);
        }
      );
    }, [t, e, n, s]),
    x.jsx(x.Fragment, {})
  ),
  RS = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  iy = ({
    orientation: t,
    offsets: e,
    setOffsets: n,
    resizerColor: s,
    resizerWidth: o,
    minColumnWidth: l,
  }) => {
    const c = l || 0,
      [u, d] = jt.useState(null),
      [h, y] = Mr(),
      v = {
        position: 'absolute',
        right: t === 'horizontal' ? void 0 : 0,
        bottom: t === 'horizontal' ? 0 : void 0,
        width: t === 'horizontal' ? 7 : void 0,
        height: t === 'horizontal' ? void 0 : 7,
        borderTopWidth: t === 'horizontal' ? void 0 : (7 - o) / 2,
        borderRightWidth: t === 'horizontal' ? (7 - o) / 2 : void 0,
        borderBottomWidth: t === 'horizontal' ? void 0 : (7 - o) / 2,
        borderLeftWidth: t === 'horizontal' ? (7 - o) / 2 : void 0,
        borderColor: 'transparent',
        borderStyle: 'solid',
        cursor: t === 'horizontal' ? 'ew-resize' : 'ns-resize',
      };
    return x.jsxs('div', {
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: -(7 - o) / 2,
        zIndex: 100,
        pointerEvents: 'none',
      },
      ref: y,
      children: [
        !!u &&
          x.jsx(sy, {
            cursor: t === 'horizontal' ? 'ew-resize' : 'ns-resize',
            onPaneMouseUp: () => d(null),
            onPaneMouseMove: m => {
              if (!m.buttons) d(null);
              else if (u) {
                const w = t === 'horizontal' ? m.clientX - u.clientX : m.clientY - u.clientY,
                  S = u.offset + w,
                  _ = u.index > 0 ? e[u.index - 1] : 0,
                  b = t === 'horizontal' ? h.width : h.height,
                  T = Math.min(Math.max(_ + c, S), b - c) - e[u.index];
                for (let C = u.index; C < e.length; ++C) e[C] = e[C] + T;
                n([...e]);
              }
            },
          }),
        e.map((m, w) =>
          x.jsx(
            'div',
            {
              style: {
                ...v,
                top: t === 'horizontal' ? 0 : m,
                left: t === 'horizontal' ? m : 0,
                pointerEvents: 'initial',
              },
              onMouseDown: S => d({ clientX: S.clientX, clientY: S.clientY, offset: m, index: w }),
              children: x.jsx('div', { style: { ...RS, background: s } }),
            },
            w
          )
        ),
      ],
    });
  };
async function ku(t) {
  const e = new Image();
  return (
    t &&
      ((e.src = t),
      await new Promise((n, s) => {
        (e.onload = n), (e.onerror = n);
      })),
    e
  );
}
const Ju = {
    backgroundImage: `linear-gradient(45deg, #80808020 25%, transparent 25%),
                    linear-gradient(-45deg, #80808020 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #80808020 75%),
                    linear-gradient(-45deg, transparent 75%, #80808020 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    boxShadow: `rgb(0 0 0 / 10%) 0px 1.8px 1.9px,
              rgb(0 0 0 / 15%) 0px 6.1px 6.3px,
              rgb(0 0 0 / 10%) 0px -2px 4px,
              rgb(0 0 0 / 15%) 0px -6.1px 12px,
              rgb(0 0 0 / 25%) 0px 6px 12px`,
  },
  DS = ({ diff: t, noTargetBlank: e, hideDetails: n }) => {
    const [s, o] = P.useState(t.diff ? 'diff' : 'actual'),
      [l, c] = P.useState(!1),
      [u, d] = P.useState(null),
      [h, y] = P.useState('Expected'),
      [v, m] = P.useState(null),
      [w, S] = P.useState(null),
      [_, b] = Mr();
    P.useEffect(() => {
      (async () => {
        var I, Q, W, z;
        d(await ku((I = t.expected) == null ? void 0 : I.attachment.path)),
          y(((Q = t.expected) == null ? void 0 : Q.title) || 'Expected'),
          m(await ku((W = t.actual) == null ? void 0 : W.attachment.path)),
          S(await ku((z = t.diff) == null ? void 0 : z.attachment.path));
      })();
    }, [t]);
    const T = u && v && w,
      C = T ? Math.max(u.naturalWidth, v.naturalWidth, 200) : 500,
      O = T ? Math.max(u.naturalHeight, v.naturalHeight, 200) : 500,
      R = Math.min(1, (_.width - 30) / C),
      D = Math.min(1, (_.width - 50) / C / 2),
      F = C * R,
      U = O * R,
      B = { flex: 'none', margin: '0 10px', cursor: 'pointer', userSelect: 'none' };
    return x.jsx('div', {
      'data-testid': 'test-result-image-mismatch',
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'auto' },
      ref: b,
      children:
        T &&
        x.jsxs(x.Fragment, {
          children: [
            x.jsxs('div', {
              'data-testid': 'test-result-image-mismatch-tabs',
              style: { display: 'flex', margin: '10px 0 20px' },
              children: [
                t.diff &&
                  x.jsx('div', {
                    style: { ...B, fontWeight: s === 'diff' ? 600 : 'initial' },
                    onClick: () => o('diff'),
                    children: 'Diff',
                  }),
                x.jsx('div', {
                  style: { ...B, fontWeight: s === 'actual' ? 600 : 'initial' },
                  onClick: () => o('actual'),
                  children: 'Actual',
                }),
                x.jsx('div', {
                  style: { ...B, fontWeight: s === 'expected' ? 600 : 'initial' },
                  onClick: () => o('expected'),
                  children: h,
                }),
                x.jsx('div', {
                  style: { ...B, fontWeight: s === 'sxs' ? 600 : 'initial' },
                  onClick: () => o('sxs'),
                  children: 'Side by side',
                }),
                x.jsx('div', {
                  style: { ...B, fontWeight: s === 'slider' ? 600 : 'initial' },
                  onClick: () => o('slider'),
                  children: 'Slider',
                }),
              ],
            }),
            x.jsxs('div', {
              style: { display: 'flex', justifyContent: 'center', flex: 'auto', minHeight: U + 60 },
              children: [
                t.diff &&
                  s === 'diff' &&
                  x.jsx(An, {
                    image: w,
                    alt: 'Diff',
                    hideSize: n,
                    canvasWidth: F,
                    canvasHeight: U,
                    scale: R,
                  }),
                t.diff &&
                  s === 'actual' &&
                  x.jsx(An, {
                    image: v,
                    alt: 'Actual',
                    hideSize: n,
                    canvasWidth: F,
                    canvasHeight: U,
                    scale: R,
                  }),
                t.diff &&
                  s === 'expected' &&
                  x.jsx(An, {
                    image: u,
                    alt: h,
                    hideSize: n,
                    canvasWidth: F,
                    canvasHeight: U,
                    scale: R,
                  }),
                t.diff &&
                  s === 'slider' &&
                  x.jsx(FS, {
                    expectedImage: u,
                    actualImage: v,
                    hideSize: n,
                    canvasWidth: F,
                    canvasHeight: U,
                    scale: R,
                    expectedTitle: h,
                  }),
                t.diff &&
                  s === 'sxs' &&
                  x.jsxs('div', {
                    style: { display: 'flex' },
                    children: [
                      x.jsx(An, {
                        image: u,
                        title: h,
                        hideSize: n,
                        canvasWidth: D * C,
                        canvasHeight: D * O,
                        scale: D,
                      }),
                      x.jsx(An, {
                        image: l ? w : v,
                        title: l ? 'Diff' : 'Actual',
                        onClick: () => c(!l),
                        hideSize: n,
                        canvasWidth: D * C,
                        canvasHeight: D * O,
                        scale: D,
                      }),
                    ],
                  }),
                !t.diff &&
                  s === 'actual' &&
                  x.jsx(An, {
                    image: v,
                    title: 'Actual',
                    hideSize: n,
                    canvasWidth: F,
                    canvasHeight: U,
                    scale: R,
                  }),
                !t.diff &&
                  s === 'expected' &&
                  x.jsx(An, {
                    image: u,
                    title: h,
                    hideSize: n,
                    canvasWidth: F,
                    canvasHeight: U,
                    scale: R,
                  }),
                !t.diff &&
                  s === 'sxs' &&
                  x.jsxs('div', {
                    style: { display: 'flex' },
                    children: [
                      x.jsx(An, {
                        image: u,
                        title: h,
                        canvasWidth: D * C,
                        canvasHeight: D * O,
                        scale: D,
                      }),
                      x.jsx(An, {
                        image: v,
                        title: 'Actual',
                        canvasWidth: D * C,
                        canvasHeight: D * O,
                        scale: D,
                      }),
                    ],
                  }),
              ],
            }),
            !n &&
              x.jsxs('div', {
                style: { alignSelf: 'start', lineHeight: '18px', marginLeft: '15px' },
                children: [
                  x.jsx('div', {
                    children:
                      t.diff &&
                      x.jsx('a', {
                        target: '_blank',
                        href: t.diff.attachment.path,
                        rel: 'noreferrer',
                        children: t.diff.attachment.name,
                      }),
                  }),
                  x.jsx('div', {
                    children: x.jsx('a', {
                      target: e ? '' : '_blank',
                      href: t.actual.attachment.path,
                      rel: 'noreferrer',
                      children: t.actual.attachment.name,
                    }),
                  }),
                  x.jsx('div', {
                    children: x.jsx('a', {
                      target: e ? '' : '_blank',
                      href: t.expected.attachment.path,
                      rel: 'noreferrer',
                      children: t.expected.attachment.name,
                    }),
                  }),
                ],
              }),
          ],
        }),
    });
  },
  FS = ({
    expectedImage: t,
    actualImage: e,
    canvasWidth: n,
    canvasHeight: s,
    scale: o,
    expectedTitle: l,
    hideSize: c,
  }) => {
    const u = { position: 'absolute', top: 0, left: 0 },
      [d, h] = P.useState(n / 2),
      y = t.naturalWidth === e.naturalWidth && t.naturalHeight === e.naturalHeight;
    return x.jsxs('div', {
      style: {
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        userSelect: 'none',
      },
      children: [
        !c &&
          x.jsxs('div', {
            style: { margin: 5 },
            children: [
              !y &&
                x.jsx('span', { style: { flex: 'none', margin: '0 5px' }, children: 'Expected ' }),
              x.jsx('span', { children: t.naturalWidth }),
              x.jsx('span', { style: { flex: 'none', margin: '0 5px' }, children: 'x' }),
              x.jsx('span', { children: t.naturalHeight }),
              !y &&
                x.jsx('span', {
                  style: { flex: 'none', margin: '0 5px 0 15px' },
                  children: 'Actual ',
                }),
              !y && x.jsx('span', { children: e.naturalWidth }),
              !y && x.jsx('span', { style: { flex: 'none', margin: '0 5px' }, children: 'x' }),
              !y && x.jsx('span', { children: e.naturalHeight }),
            ],
          }),
        x.jsxs('div', {
          style: { position: 'relative', width: n, height: s, margin: 15, ...Ju },
          children: [
            x.jsx(iy, {
              orientation: 'horizontal',
              offsets: [d],
              setOffsets: v => h(v[0]),
              resizerColor: '#57606a80',
              resizerWidth: 6,
            }),
            x.jsx('img', {
              alt: l,
              style: { width: t.naturalWidth * o, height: t.naturalHeight * o },
              draggable: 'false',
              src: t.src,
            }),
            x.jsx('div', {
              style: { ...u, bottom: 0, overflow: 'hidden', width: d, ...Ju },
              children: x.jsx('img', {
                alt: 'Actual',
                style: { width: e.naturalWidth * o, height: e.naturalHeight * o },
                draggable: 'false',
                src: e.src,
              }),
            }),
          ],
        }),
      ],
    });
  },
  An = ({
    image: t,
    title: e,
    alt: n,
    hideSize: s,
    canvasWidth: o,
    canvasHeight: l,
    scale: c,
    onClick: u,
  }) =>
    x.jsxs('div', {
      style: { flex: 'none', display: 'flex', alignItems: 'center', flexDirection: 'column' },
      children: [
        !s &&
          x.jsxs('div', {
            style: { margin: 5 },
            children: [
              e && x.jsx('span', { style: { flex: 'none', margin: '0 5px' }, children: e }),
              x.jsx('span', { children: t.naturalWidth }),
              x.jsx('span', { style: { flex: 'none', margin: '0 5px' }, children: 'x' }),
              x.jsx('span', { children: t.naturalHeight }),
            ],
          }),
        x.jsx('div', {
          style: { display: 'flex', flex: 'none', width: o, height: l, margin: 15, ...Ju },
          children: x.jsx('img', {
            width: t.naturalWidth * c,
            height: t.naturalHeight * c,
            alt: e || n,
            style: { cursor: u ? 'pointer' : 'initial' },
            draggable: 'false',
            src: t.src,
            onClick: u,
          }),
        }),
      ],
    }),
  zS = 'modulepreload',
  BS = function (t, e) {
    return new URL(t, e).href;
  },
  km = {},
  US = function (e, n, s) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      const c = document.getElementsByTagName('link'),
        u = document.querySelector('meta[property=csp-nonce]'),
        d = (u == null ? void 0 : u.nonce) || (u == null ? void 0 : u.getAttribute('nonce'));
      o = Promise.allSettled(
        n.map(h => {
          if (((h = BS(h, s)), h in km)) return;
          km[h] = !0;
          const y = h.endsWith('.css'),
            v = y ? '[rel="stylesheet"]' : '';
          if (s)
            for (let S = c.length - 1; S >= 0; S--) {
              const _ = c[S];
              if (_.href === h && (!y || _.rel === 'stylesheet')) return;
            }
          else if (document.querySelector(`link[href="${h}"]${v}`)) return;
          const w = document.createElement('link');
          if (
            ((w.rel = y ? 'stylesheet' : zS),
            y || (w.as = 'script'),
            (w.crossOrigin = ''),
            (w.href = h),
            d && w.setAttribute('nonce', d),
            document.head.appendChild(w),
            y)
          )
            return new Promise((S, _) => {
              w.addEventListener('load', S),
                w.addEventListener('error', () => _(new Error(`Unable to preload CSS for ${h}`)));
            });
        })
      );
    }
    function l(c) {
      const u = new Event('vite:preloadError', { cancelable: !0 });
      if (((u.payload = c), window.dispatchEvent(u), !u.defaultPrevented)) throw c;
    }
    return o.then(c => {
      for (const u of c || []) u.status === 'rejected' && l(u.reason);
      return e().catch(l);
    });
  },
  qS = 20,
  js = ({
    text: t,
    language: e,
    mimeType: n,
    linkify: s,
    readOnly: o,
    highlight: l,
    revealLine: c,
    lineNumbers: u,
    isFocused: d,
    focusOnChange: h,
    wrapLines: y,
    onChange: v,
    dataTestId: m,
    placeholder: w,
  }) => {
    const [S, _] = Mr(),
      [b] = P.useState(
        US(
          () => import('./codeMirrorModule-DwAiTpyC.js'),
          __vite__mapDeps([0, 1]),
          import.meta.url
        ).then(R => R.default)
      ),
      T = P.useRef(null),
      [C, O] = P.useState();
    return (
      P.useEffect(() => {
        (async () => {
          var B, I;
          const R = await b;
          VS(R);
          const D = _.current;
          if (!D) return;
          const F = KS(e) || WS(n) || (s ? 'text/linkified' : '');
          if (
            T.current &&
            F === T.current.cm.getOption('mode') &&
            !!o === T.current.cm.getOption('readOnly') &&
            u === T.current.cm.getOption('lineNumbers') &&
            y === T.current.cm.getOption('lineWrapping') &&
            w === T.current.cm.getOption('placeholder')
          )
            return;
          (I = (B = T.current) == null ? void 0 : B.cm) == null || I.getWrapperElement().remove();
          const U = R(D, {
            value: '',
            mode: F,
            readOnly: !!o,
            lineNumbers: u,
            lineWrapping: y,
            placeholder: w,
          });
          return (T.current = { cm: U }), d && U.focus(), O(U), U;
        })();
      }, [b, C, _, e, n, s, u, y, o, d, w]),
      P.useEffect(() => {
        T.current && T.current.cm.setSize(S.width, S.height);
      }, [S]),
      P.useLayoutEffect(() => {
        var F;
        if (!C) return;
        let R = !1;
        if (
          (C.getValue() !== t &&
            (C.setValue(t), (R = !0), h && (C.execCommand('selectAll'), C.focus())),
          R || JSON.stringify(l) !== JSON.stringify(T.current.highlight))
        ) {
          for (const I of T.current.highlight || []) C.removeLineClass(I.line - 1, 'wrap');
          for (const I of l || []) C.addLineClass(I.line - 1, 'wrap', `source-line-${I.type}`);
          for (const I of T.current.widgets || []) C.removeLineWidget(I);
          for (const I of T.current.markers || []) I.clear();
          const U = [],
            B = [];
          for (const I of l || []) {
            if (I.type !== 'subtle-error' && I.type !== 'error') continue;
            const Q = (F = T.current) == null ? void 0 : F.cm.getLine(I.line - 1);
            if (Q) {
              const W = {};
              (W.title = I.message || ''),
                B.push(
                  C.markText(
                    { line: I.line - 1, ch: 0 },
                    { line: I.line - 1, ch: I.column || Q.length },
                    { className: 'source-line-error-underline', attributes: W }
                  )
                );
            }
            if (I.type === 'error') {
              const W = document.createElement('div');
              (W.innerHTML = Qi(I.message || '')),
                (W.className = 'source-line-error-widget'),
                U.push(C.addLineWidget(I.line, W, { above: !0, coverGutter: !1 }));
            }
          }
          (T.current.highlight = l), (T.current.widgets = U), (T.current.markers = B);
        }
        typeof c == 'number' &&
          T.current.cm.lineCount() >= c &&
          C.scrollIntoView({ line: Math.max(0, c - 1), ch: 0 }, 50);
        let D;
        return (
          v && ((D = () => v(C.getValue())), C.on('change', D)),
          () => {
            D && C.off('change', D);
          }
        );
      }, [C, t, l, c, h, v]),
      x.jsx('div', { 'data-testid': m, className: 'cm-wrapper', ref: _, onClick: HS })
    );
  };
function HS(t) {
  var n;
  if (!(t.target instanceof HTMLElement)) return;
  let e;
  t.target.classList.contains('cm-linkified')
    ? (e = t.target.textContent)
    : t.target.classList.contains('cm-link') &&
      (n = t.target.nextElementSibling) != null &&
      n.classList.contains('cm-url') &&
      (e = t.target.nextElementSibling.textContent.slice(1, -1)),
    e && (t.preventDefault(), t.stopPropagation(), window.open(e, '_blank'));
}
let bm = !1;
function VS(t) {
  bm ||
    ((bm = !0),
    t.defineSimpleMode('text/linkified', { start: [{ regex: ag, token: 'linkified' }] }));
}
function WS(t) {
  if (t) {
    if (t.includes('javascript') || t.includes('json')) return 'javascript';
    if (t.includes('python')) return 'python';
    if (t.includes('csharp')) return 'text/x-csharp';
    if (t.includes('java')) return 'text/x-java';
    if (t.includes('markdown')) return 'markdown';
    if (t.includes('html') || t.includes('svg')) return 'htmlmixed';
    if (t.includes('css')) return 'css';
  }
}
function KS(t) {
  if (t)
    return {
      javascript: 'javascript',
      jsonl: 'javascript',
      python: 'python',
      csharp: 'text/x-csharp',
      java: 'text/x-java',
      markdown: 'markdown',
      html: 'htmlmixed',
      css: 'css',
      yaml: 'yaml',
    }[t];
}
function QS(t) {
  return !!t.match(
    /^(text\/.*?|application\/(json|(x-)?javascript|xml.*?|ecmascript|graphql|x-www-form-urlencoded)|image\/svg(\+xml)?|application\/.*?(\+json|\+xml))(;\s*charset=.*)?$/
  );
}
new be([
  ['ez', 'application/andrew-inset'],
  ['aw', 'application/applixware'],
  ['atom', 'application/atom+xml'],
  ['atomcat', 'application/atomcat+xml'],
  ['atomdeleted', 'application/atomdeleted+xml'],
  ['atomsvc', 'application/atomsvc+xml'],
  ['dwd', 'application/atsc-dwd+xml'],
  ['held', 'application/atsc-held+xml'],
  ['rsat', 'application/atsc-rsat+xml'],
  ['bdoc', 'application/bdoc'],
  ['xcs', 'application/calendar+xml'],
  ['ccxml', 'application/ccxml+xml'],
  ['cdfx', 'application/cdfx+xml'],
  ['cdmia', 'application/cdmi-capability'],
  ['cdmic', 'application/cdmi-container'],
  ['cdmid', 'application/cdmi-domain'],
  ['cdmio', 'application/cdmi-object'],
  ['cdmiq', 'application/cdmi-queue'],
  ['cu', 'application/cu-seeme'],
  ['mpd', 'application/dash+xml'],
  ['davmount', 'application/davmount+xml'],
  ['dbk', 'application/docbook+xml'],
  ['dssc', 'application/dssc+der'],
  ['xdssc', 'application/dssc+xml'],
  ['ecma', 'application/ecmascript'],
  ['es', 'application/ecmascript'],
  ['emma', 'application/emma+xml'],
  ['emotionml', 'application/emotionml+xml'],
  ['epub', 'application/epub+zip'],
  ['exi', 'application/exi'],
  ['exp', 'application/express'],
  ['fdt', 'application/fdt+xml'],
  ['pfr', 'application/font-tdpfr'],
  ['geojson', 'application/geo+json'],
  ['gml', 'application/gml+xml'],
  ['gpx', 'application/gpx+xml'],
  ['gxf', 'application/gxf'],
  ['gz', 'application/gzip'],
  ['hjson', 'application/hjson'],
  ['stk', 'application/hyperstudio'],
  ['ink', 'application/inkml+xml'],
  ['inkml', 'application/inkml+xml'],
  ['ipfix', 'application/ipfix'],
  ['its', 'application/its+xml'],
  ['ear', 'application/java-archive'],
  ['jar', 'application/java-archive'],
  ['war', 'application/java-archive'],
  ['ser', 'application/java-serialized-object'],
  ['class', 'application/java-vm'],
  ['js', 'application/javascript'],
  ['mjs', 'application/javascript'],
  ['json', 'application/json'],
  ['map', 'application/json'],
  ['json5', 'application/json5'],
  ['jsonml', 'application/jsonml+json'],
  ['jsonld', 'application/ld+json'],
  ['lgr', 'application/lgr+xml'],
  ['lostxml', 'application/lost+xml'],
  ['hqx', 'application/mac-binhex40'],
  ['cpt', 'application/mac-compactpro'],
  ['mads', 'application/mads+xml'],
  ['webmanifest', 'application/manifest+json'],
  ['mrc', 'application/marc'],
  ['mrcx', 'application/marcxml+xml'],
  ['ma', 'application/mathematica'],
  ['mb', 'application/mathematica'],
  ['nb', 'application/mathematica'],
  ['mathml', 'application/mathml+xml'],
  ['mbox', 'application/mbox'],
  ['mscml', 'application/mediaservercontrol+xml'],
  ['metalink', 'application/metalink+xml'],
  ['meta4', 'application/metalink4+xml'],
  ['mets', 'application/mets+xml'],
  ['maei', 'application/mmt-aei+xml'],
  ['musd', 'application/mmt-usd+xml'],
  ['mods', 'application/mods+xml'],
  ['m21', 'application/mp21'],
  ['mp21', 'application/mp21'],
  ['m4p', 'application/mp4'],
  ['mp4s', 'application/mp4'],
  ['doc', 'application/msword'],
  ['dot', 'application/msword'],
  ['mxf', 'application/mxf'],
  ['nq', 'application/n-quads'],
  ['nt', 'application/n-triples'],
  ['cjs', 'application/node'],
  ['bin', 'application/octet-stream'],
  ['bpk', 'application/octet-stream'],
  ['buffer', 'application/octet-stream'],
  ['deb', 'application/octet-stream'],
  ['deploy', 'application/octet-stream'],
  ['dist', 'application/octet-stream'],
  ['distz', 'application/octet-stream'],
  ['dll', 'application/octet-stream'],
  ['dmg', 'application/octet-stream'],
  ['dms', 'application/octet-stream'],
  ['dump', 'application/octet-stream'],
  ['elc', 'application/octet-stream'],
  ['exe', 'application/octet-stream'],
  ['img', 'application/octet-stream'],
  ['iso', 'application/octet-stream'],
  ['lrf', 'application/octet-stream'],
  ['mar', 'application/octet-stream'],
  ['msi', 'application/octet-stream'],
  ['msm', 'application/octet-stream'],
  ['msp', 'application/octet-stream'],
  ['pkg', 'application/octet-stream'],
  ['so', 'application/octet-stream'],
  ['oda', 'application/oda'],
  ['opf', 'application/oebps-package+xml'],
  ['ogx', 'application/ogg'],
  ['omdoc', 'application/omdoc+xml'],
  ['onepkg', 'application/onenote'],
  ['onetmp', 'application/onenote'],
  ['onetoc', 'application/onenote'],
  ['onetoc2', 'application/onenote'],
  ['oxps', 'application/oxps'],
  ['relo', 'application/p2p-overlay+xml'],
  ['xer', 'application/patch-ops-error+xml'],
  ['pdf', 'application/pdf'],
  ['pgp', 'application/pgp-encrypted'],
  ['asc', 'application/pgp-signature'],
  ['sig', 'application/pgp-signature'],
  ['prf', 'application/pics-rules'],
  ['p10', 'application/pkcs10'],
  ['p7c', 'application/pkcs7-mime'],
  ['p7m', 'application/pkcs7-mime'],
  ['p7s', 'application/pkcs7-signature'],
  ['p8', 'application/pkcs8'],
  ['ac', 'application/pkix-attr-cert'],
  ['cer', 'application/pkix-cert'],
  ['crl', 'application/pkix-crl'],
  ['pkipath', 'application/pkix-pkipath'],
  ['pki', 'application/pkixcmp'],
  ['pls', 'application/pls+xml'],
  ['ai', 'application/postscript'],
  ['eps', 'application/postscript'],
  ['ps', 'application/postscript'],
  ['provx', 'application/provenance+xml'],
  ['pskcxml', 'application/pskc+xml'],
  ['raml', 'application/raml+yaml'],
  ['owl', 'application/rdf+xml'],
  ['rdf', 'application/rdf+xml'],
  ['rif', 'application/reginfo+xml'],
  ['rnc', 'application/relax-ng-compact-syntax'],
  ['rl', 'application/resource-lists+xml'],
  ['rld', 'application/resource-lists-diff+xml'],
  ['rs', 'application/rls-services+xml'],
  ['rapd', 'application/route-apd+xml'],
  ['sls', 'application/route-s-tsid+xml'],
  ['rusd', 'application/route-usd+xml'],
  ['gbr', 'application/rpki-ghostbusters'],
  ['mft', 'application/rpki-manifest'],
  ['roa', 'application/rpki-roa'],
  ['rsd', 'application/rsd+xml'],
  ['rss', 'application/rss+xml'],
  ['rtf', 'application/rtf'],
  ['sbml', 'application/sbml+xml'],
  ['scq', 'application/scvp-cv-request'],
  ['scs', 'application/scvp-cv-response'],
  ['spq', 'application/scvp-vp-request'],
  ['spp', 'application/scvp-vp-response'],
  ['sdp', 'application/sdp'],
  ['senmlx', 'application/senml+xml'],
  ['sensmlx', 'application/sensml+xml'],
  ['setpay', 'application/set-payment-initiation'],
  ['setreg', 'application/set-registration-initiation'],
  ['shf', 'application/shf+xml'],
  ['sieve', 'application/sieve'],
  ['siv', 'application/sieve'],
  ['smi', 'application/smil+xml'],
  ['smil', 'application/smil+xml'],
  ['rq', 'application/sparql-query'],
  ['srx', 'application/sparql-results+xml'],
  ['gram', 'application/srgs'],
  ['grxml', 'application/srgs+xml'],
  ['sru', 'application/sru+xml'],
  ['ssdl', 'application/ssdl+xml'],
  ['ssml', 'application/ssml+xml'],
  ['swidtag', 'application/swid+xml'],
  ['tei', 'application/tei+xml'],
  ['teicorpus', 'application/tei+xml'],
  ['tfi', 'application/thraud+xml'],
  ['tsd', 'application/timestamped-data'],
  ['toml', 'application/toml'],
  ['trig', 'application/trig'],
  ['ttml', 'application/ttml+xml'],
  ['ubj', 'application/ubjson'],
  ['rsheet', 'application/urc-ressheet+xml'],
  ['td', 'application/urc-targetdesc+xml'],
  ['vxml', 'application/voicexml+xml'],
  ['wasm', 'application/wasm'],
  ['wgt', 'application/widget'],
  ['hlp', 'application/winhlp'],
  ['wsdl', 'application/wsdl+xml'],
  ['wspolicy', 'application/wspolicy+xml'],
  ['xaml', 'application/xaml+xml'],
  ['xav', 'application/xcap-att+xml'],
  ['xca', 'application/xcap-caps+xml'],
  ['xdf', 'application/xcap-diff+xml'],
  ['xel', 'application/xcap-el+xml'],
  ['xns', 'application/xcap-ns+xml'],
  ['xenc', 'application/xenc+xml'],
  ['xht', 'application/xhtml+xml'],
  ['xhtml', 'application/xhtml+xml'],
  ['xlf', 'application/xliff+xml'],
  ['rng', 'application/xml'],
  ['xml', 'application/xml'],
  ['xsd', 'application/xml'],
  ['xsl', 'application/xml'],
  ['dtd', 'application/xml-dtd'],
  ['xop', 'application/xop+xml'],
  ['xpl', 'application/xproc+xml'],
  ['*xsl', 'application/xslt+xml'],
  ['xslt', 'application/xslt+xml'],
  ['xspf', 'application/xspf+xml'],
  ['mxml', 'application/xv+xml'],
  ['xhvml', 'application/xv+xml'],
  ['xvm', 'application/xv+xml'],
  ['xvml', 'application/xv+xml'],
  ['yang', 'application/yang'],
  ['yin', 'application/yin+xml'],
  ['zip', 'application/zip'],
  ['*3gpp', 'audio/3gpp'],
  ['adp', 'audio/adpcm'],
  ['amr', 'audio/amr'],
  ['au', 'audio/basic'],
  ['snd', 'audio/basic'],
  ['kar', 'audio/midi'],
  ['mid', 'audio/midi'],
  ['midi', 'audio/midi'],
  ['rmi', 'audio/midi'],
  ['mxmf', 'audio/mobile-xmf'],
  ['*mp3', 'audio/mp3'],
  ['m4a', 'audio/mp4'],
  ['mp4a', 'audio/mp4'],
  ['m2a', 'audio/mpeg'],
  ['m3a', 'audio/mpeg'],
  ['mp2', 'audio/mpeg'],
  ['mp2a', 'audio/mpeg'],
  ['mp3', 'audio/mpeg'],
  ['mpga', 'audio/mpeg'],
  ['oga', 'audio/ogg'],
  ['ogg', 'audio/ogg'],
  ['opus', 'audio/ogg'],
  ['spx', 'audio/ogg'],
  ['s3m', 'audio/s3m'],
  ['sil', 'audio/silk'],
  ['wav', 'audio/wav'],
  ['*wav', 'audio/wave'],
  ['weba', 'audio/webm'],
  ['xm', 'audio/xm'],
  ['ttc', 'font/collection'],
  ['otf', 'font/otf'],
  ['ttf', 'font/ttf'],
  ['woff', 'font/woff'],
  ['woff2', 'font/woff2'],
  ['exr', 'image/aces'],
  ['apng', 'image/apng'],
  ['avif', 'image/avif'],
  ['bmp', 'image/bmp'],
  ['cgm', 'image/cgm'],
  ['drle', 'image/dicom-rle'],
  ['emf', 'image/emf'],
  ['fits', 'image/fits'],
  ['g3', 'image/g3fax'],
  ['gif', 'image/gif'],
  ['heic', 'image/heic'],
  ['heics', 'image/heic-sequence'],
  ['heif', 'image/heif'],
  ['heifs', 'image/heif-sequence'],
  ['hej2', 'image/hej2k'],
  ['hsj2', 'image/hsj2'],
  ['ief', 'image/ief'],
  ['jls', 'image/jls'],
  ['jp2', 'image/jp2'],
  ['jpg2', 'image/jp2'],
  ['jpe', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['jpg', 'image/jpeg'],
  ['jph', 'image/jph'],
  ['jhc', 'image/jphc'],
  ['jpm', 'image/jpm'],
  ['jpf', 'image/jpx'],
  ['jpx', 'image/jpx'],
  ['jxr', 'image/jxr'],
  ['jxra', 'image/jxra'],
  ['jxrs', 'image/jxrs'],
  ['jxs', 'image/jxs'],
  ['jxsc', 'image/jxsc'],
  ['jxsi', 'image/jxsi'],
  ['jxss', 'image/jxss'],
  ['ktx', 'image/ktx'],
  ['ktx2', 'image/ktx2'],
  ['png', 'image/png'],
  ['sgi', 'image/sgi'],
  ['svg', 'image/svg+xml'],
  ['svgz', 'image/svg+xml'],
  ['t38', 'image/t38'],
  ['tif', 'image/tiff'],
  ['tiff', 'image/tiff'],
  ['tfx', 'image/tiff-fx'],
  ['webp', 'image/webp'],
  ['wmf', 'image/wmf'],
  ['disposition-notification', 'message/disposition-notification'],
  ['u8msg', 'message/global'],
  ['u8dsn', 'message/global-delivery-status'],
  ['u8mdn', 'message/global-disposition-notification'],
  ['u8hdr', 'message/global-headers'],
  ['eml', 'message/rfc822'],
  ['mime', 'message/rfc822'],
  ['3mf', 'model/3mf'],
  ['gltf', 'model/gltf+json'],
  ['glb', 'model/gltf-binary'],
  ['iges', 'model/iges'],
  ['igs', 'model/iges'],
  ['mesh', 'model/mesh'],
  ['msh', 'model/mesh'],
  ['silo', 'model/mesh'],
  ['mtl', 'model/mtl'],
  ['obj', 'model/obj'],
  ['stpx', 'model/step+xml'],
  ['stpz', 'model/step+zip'],
  ['stpxz', 'model/step-xml+zip'],
  ['stl', 'model/stl'],
  ['vrml', 'model/vrml'],
  ['wrl', 'model/vrml'],
  ['*x3db', 'model/x3d+binary'],
  ['x3dbz', 'model/x3d+binary'],
  ['x3db', 'model/x3d+fastinfoset'],
  ['*x3dv', 'model/x3d+vrml'],
  ['x3dvz', 'model/x3d+vrml'],
  ['x3d', 'model/x3d+xml'],
  ['x3dz', 'model/x3d+xml'],
  ['x3dv', 'model/x3d-vrml'],
  ['appcache', 'text/cache-manifest'],
  ['manifest', 'text/cache-manifest'],
  ['ics', 'text/calendar'],
  ['ifb', 'text/calendar'],
  ['coffee', 'text/coffeescript'],
  ['litcoffee', 'text/coffeescript'],
  ['css', 'text/css'],
  ['csv', 'text/csv'],
  ['htm', 'text/html'],
  ['html', 'text/html'],
  ['shtml', 'text/html'],
  ['jade', 'text/jade'],
  ['jsx', 'text/jsx'],
  ['less', 'text/less'],
  ['markdown', 'text/markdown'],
  ['md', 'text/markdown'],
  ['mml', 'text/mathml'],
  ['mdx', 'text/mdx'],
  ['n3', 'text/n3'],
  ['conf', 'text/plain'],
  ['def', 'text/plain'],
  ['in', 'text/plain'],
  ['ini', 'text/plain'],
  ['list', 'text/plain'],
  ['log', 'text/plain'],
  ['text', 'text/plain'],
  ['txt', 'text/plain'],
  ['rtx', 'text/richtext'],
  ['*rtf', 'text/rtf'],
  ['sgm', 'text/sgml'],
  ['sgml', 'text/sgml'],
  ['shex', 'text/shex'],
  ['slim', 'text/slim'],
  ['slm', 'text/slim'],
  ['spdx', 'text/spdx'],
  ['styl', 'text/stylus'],
  ['stylus', 'text/stylus'],
  ['tsv', 'text/tab-separated-values'],
  ['man', 'text/troff'],
  ['me', 'text/troff'],
  ['ms', 'text/troff'],
  ['roff', 'text/troff'],
  ['t', 'text/troff'],
  ['tr', 'text/troff'],
  ['ttl', 'text/turtle'],
  ['uri', 'text/uri-list'],
  ['uris', 'text/uri-list'],
  ['urls', 'text/uri-list'],
  ['vcard', 'text/vcard'],
  ['vtt', 'text/vtt'],
  ['*xml', 'text/xml'],
  ['yaml', 'text/yaml'],
  ['yml', 'text/yaml'],
  ['3gp', 'video/3gpp'],
  ['3gpp', 'video/3gpp'],
  ['3g2', 'video/3gpp2'],
  ['h261', 'video/h261'],
  ['h263', 'video/h263'],
  ['h264', 'video/h264'],
  ['m4s', 'video/iso.segment'],
  ['jpgv', 'video/jpeg'],
  ['jpm', 'video/jpm'],
  ['jpgm', 'video/jpm'],
  ['mj2', 'video/mj2'],
  ['mjp2', 'video/mj2'],
  ['ts', 'video/mp2t'],
  ['mp4', 'video/mp4'],
  ['mp4v', 'video/mp4'],
  ['mpg4', 'video/mp4'],
  ['m1v', 'video/mpeg'],
  ['m2v', 'video/mpeg'],
  ['mpe', 'video/mpeg'],
  ['mpeg', 'video/mpeg'],
  ['mpg', 'video/mpeg'],
  ['ogv', 'video/ogg'],
  ['mov', 'video/quicktime'],
  ['qt', 'video/quicktime'],
  ['webm', 'video/webm'],
]);
const GS = ({ title: t, children: e, setExpanded: n, expanded: s, expandOnTitleClick: o }) => {
  const l = P.useId();
  return x.jsxs('div', {
    className: Ue('expandable', s && 'expanded'),
    children: [
      x.jsxs('div', {
        role: 'button',
        'aria-expanded': s,
        'aria-controls': l,
        className: 'expandable-title',
        onClick: () => o && n(!s),
        children: [
          x.jsx('div', {
            className: Ue('codicon', s ? 'codicon-chevron-down' : 'codicon-chevron-right'),
            style: { cursor: 'pointer', color: 'var(--vscode-foreground)', marginLeft: '5px' },
            onClick: () => !o && n(!s),
          }),
          t,
        ],
      }),
      s && x.jsx('div', { id: l, role: 'region', style: { marginLeft: 25 }, children: e }),
    ],
  });
};
function oy(t) {
  const e = [];
  let n = 0,
    s;
  for (; (s = ag.exec(t)) !== null; ) {
    const l = t.substring(n, s.index);
    l && e.push(l);
    const c = s[0];
    e.push(XS(c)), (n = s.index + c.length);
  }
  const o = t.substring(n);
  return o && e.push(o), e;
}
function XS(t) {
  let e = t;
  return (
    e.startsWith('www.') && (e = 'https://' + e),
    x.jsx('a', { href: e, target: '_blank', rel: 'noopener noreferrer', children: t })
  );
}
const JS = ({ attachment: t, reveal: e }) => {
    const [n, s] = P.useState(!1),
      [o, l] = P.useState(null),
      [c, u] = P.useState(null),
      [d, h] = cx(),
      y = P.useRef(null),
      v = QS(t.contentType),
      m = !!t.sha1 || !!t.path;
    P.useEffect(() => {
      var _;
      if (e) return (_ = y.current) == null || _.scrollIntoView({ behavior: 'smooth' }), h();
    }, [e, h]),
      P.useEffect(() => {
        n &&
          o === null &&
          c === null &&
          (u('Loading ...'),
          fetch(la(t))
            .then(_ => _.text())
            .then(_ => {
              l(_), u(null);
            })
            .catch(_ => {
              u('Failed to load: ' + _.message);
            }));
      }, [n, o, c, t]);
    const w = P.useMemo(() => {
        const _ = o
          ? o.split(`
`).length
          : 0;
        return Math.min(Math.max(5, _), 20) * qS;
      }, [o]),
      S = x.jsxs('span', {
        style: { marginLeft: 5 },
        ref: y,
        'aria-label': t.name,
        children: [
          x.jsx('span', { children: oy(t.name) }),
          m && x.jsx('a', { style: { marginLeft: 5 }, href: Pl(t), children: 'download' }),
        ],
      });
    return !v || !m
      ? x.jsx('div', { style: { marginLeft: 20 }, children: S })
      : x.jsxs('div', {
          className: Ue(d && 'yellow-flash'),
          children: [
            x.jsx(GS, {
              title: S,
              expanded: n,
              setExpanded: s,
              expandOnTitleClick: !0,
              children: c && x.jsx('i', { children: c }),
            }),
            n &&
              o !== null &&
              x.jsx('div', {
                className: 'vbox',
                style: { height: w },
                children: x.jsx(js, {
                  text: o,
                  readOnly: !0,
                  mimeType: t.contentType,
                  linkify: !0,
                  lineNumbers: !0,
                  wrapLines: !1,
                }),
              }),
          ],
        });
  },
  YS = ({ model: t, revealedAttachment: e }) => {
    const {
      diffMap: n,
      screenshots: s,
      attachments: o,
    } = P.useMemo(() => {
      const l = new Set((t == null ? void 0 : t.visibleAttachments) ?? []),
        c = new Set(),
        u = new Map();
      for (const d of l) {
        if (!d.path && !d.sha1) continue;
        const h = d.name.match(/^(.*)-(expected|actual|diff)\.png$/);
        if (h) {
          const y = h[1],
            v = h[2],
            m = u.get(y) || { expected: void 0, actual: void 0, diff: void 0 };
          (m[v] = d), u.set(y, m), l.delete(d);
        } else d.contentType.startsWith('image/') && (c.add(d), l.delete(d));
      }
      return { diffMap: u, attachments: l, screenshots: c };
    }, [t]);
    return !n.size && !s.size && !o.size
      ? x.jsx($r, { text: 'No attachments' })
      : x.jsxs('div', {
          className: 'attachments-tab',
          children: [
            [...n.values()].map(({ expected: l, actual: c, diff: u }) =>
              x.jsxs(x.Fragment, {
                children: [
                  l &&
                    c &&
                    x.jsx('div', { className: 'attachments-section', children: 'Image diff' }),
                  l &&
                    c &&
                    x.jsx(DS, {
                      noTargetBlank: !0,
                      diff: {
                        name: 'Image diff',
                        expected: { attachment: { ...l, path: Pl(l) }, title: 'Expected' },
                        actual: { attachment: { ...c, path: Pl(c) } },
                        diff: u ? { attachment: { ...u, path: Pl(u) } } : void 0,
                      },
                    }),
                ],
              })
            ),
            s.size
              ? x.jsx('div', { className: 'attachments-section', children: 'Screenshots' })
              : void 0,
            [...s.values()].map((l, c) => {
              const u = la(l);
              return x.jsxs(
                'div',
                {
                  className: 'attachment-item',
                  children: [
                    x.jsx('div', { children: x.jsx('img', { draggable: 'false', src: u }) }),
                    x.jsx('div', {
                      children: x.jsx('a', {
                        target: '_blank',
                        href: u,
                        rel: 'noreferrer',
                        children: l.name,
                      }),
                    }),
                  ],
                },
                `screenshot-${c}`
              );
            }),
            o.size
              ? x.jsx('div', { className: 'attachments-section', children: 'Attachments' })
              : void 0,
            [...o.values()].map((l, c) =>
              x.jsx(
                'div',
                {
                  className: 'attachment-item',
                  children: x.jsx(JS, { attachment: l, reveal: e && ZS(l, e[0]) ? e : void 0 }),
                },
                e_(l, c)
              )
            ),
          ],
        });
  };
function ZS(t, e) {
  return t.name === e.name && t.path === e.path && t.sha1 === e.sha1;
}
function la(t, e = {}) {
  const n = new URLSearchParams(e);
  return t.sha1
    ? (n.set('trace', t.traceUrl), 'sha1/' + t.sha1 + '?' + n.toString())
    : (n.set('path', t.path), 'file?' + n.toString());
}
function Pl(t) {
  const e = { dn: t.name };
  return t.contentType && (e.dct = t.contentType), la(t, e);
}
function e_(t, e) {
  return e + '-' + (t.sha1 ? 'sha1-' + t.sha1 : 'path-' + t.path);
}
const t_ = `
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.
`.trimStart(),
  n_ = ({ prompt: t }) =>
    x.jsx(Ml, {
      value: t,
      description: 'Copy prompt',
      copiedDescription: x.jsxs(x.Fragment, {
        children: [
          'Copied ',
          x.jsx('span', { className: 'codicon codicon-copy', style: { marginLeft: '5px' } }),
        ],
      }),
      style: { width: '120px', justifyContent: 'center' },
    });
function r_(t) {
  return P.useMemo(() => {
    if (!t) return { errors: new Map() };
    const e = new Map();
    for (const n of t.errorDescriptors) e.set(n.message, n);
    return { errors: e };
  }, [t]);
}
function s_({ message: t, error: e, errorId: n, sdkLanguage: s, revealInSource: o }) {
  var m;
  const [l, c] = P.useState(!1),
    u = MS();
  let d, h;
  const y = (m = e.stack) == null ? void 0 : m[0];
  y && ((d = y.file.replace(/.*[/\\](.*)/, '$1') + ':' + y.line), (h = y.file + ':' + y.line));
  const v = ff(
    async () => {
      if (!e.context) return;
      const w = await fetch(la(e.context));
      return t_ + (await w.text());
    },
    [e],
    void 0
  );
  return x.jsxs('div', {
    style: { display: 'flex', flexDirection: 'column', overflowX: 'clip' },
    children: [
      x.jsxs('div', {
        className: 'hbox',
        style: {
          alignItems: 'center',
          padding: '5px 10px',
          minHeight: 36,
          fontWeight: 'bold',
          color: 'var(--vscode-errorForeground)',
          flex: 0,
        },
        children: [
          e.action && pf(e.action, { sdkLanguage: s }),
          d &&
            x.jsxs('div', {
              className: 'action-location',
              children: ['@ ', x.jsx('span', { title: h, onClick: () => o(e), children: d })],
            }),
          x.jsx('span', {
            style: { position: 'absolute', right: '5px' },
            children:
              v &&
              (u
                ? x.jsx(i_, { conversationId: n, onChange: c, value: l, prompt: v })
                : x.jsx(n_, { prompt: v })),
          }),
        ],
      }),
      x.jsx(E1, { error: t }),
      l && x.jsx(PS, { conversationId: n }),
    ],
  });
}
function i_({ conversationId: t, value: e, onChange: n, prompt: s }) {
  const o = ry();
  return x.jsx(Rt, {
    onClick: () => {
      if (!o.getConversation(t)) {
        const l = o.startConversation(
          t,
          [
            "My Playwright test failed. What's going wrong?",
            'Please give me a suggestion how to fix it, and then explain what went wrong. Be very concise and apply Playwright best practices.',
            "Don't include many headings in your output. Make sure what you're saying is correct, and take into account whether there might be a bug in the app.",
          ].join(`
`)
        );
        let c = 'Help me with the error above.';
        const u = s.includes('Local changes:'),
          d = s.includes('Page snapshot:');
        u
          ? (c += ` Take the code diff${d ? ' and page snapshot' : ''} into account.`)
          : d && (c += ' Take the page snapshot into account.'),
          l.send(s, c);
      }
      n(l => !l);
    },
    style: { width: '96px', justifyContent: 'center' },
    title: 'Fix with AI',
    className: 'copy-to-clipboard-text-button',
    children: e ? 'Hide AI' : 'Fix with AI',
  });
}
const o_ = ({ errorsModel: t, sdkLanguage: e, revealInSource: n, wallTime: s }) =>
    t.errors.size
      ? x.jsx('div', {
          className: 'fill',
          style: { overflow: 'auto' },
          children: [...t.errors.entries()].map(([o, l]) => {
            const c = `error-${s}-${o}`;
            return x.jsx(
              s_,
              { errorId: c, message: o, error: l, revealInSource: n, sdkLanguage: e },
              c
            );
          }),
        })
      : x.jsx($r, { text: 'No errors' }),
  l_ = ia;
function a_(t, e) {
  const { entries: n } = P.useMemo(() => {
    if (!t) return { entries: [] };
    const o = [];
    function l(u) {
      var y, v, m, w, S, _;
      const d = o[o.length - 1];
      d &&
      ((y = u.browserMessage) == null ? void 0 : y.bodyString) ===
        ((v = d.browserMessage) == null ? void 0 : v.bodyString) &&
      ((m = u.browserMessage) == null ? void 0 : m.location) ===
        ((w = d.browserMessage) == null ? void 0 : w.location) &&
      u.browserError === d.browserError &&
      ((S = u.nodeMessage) == null ? void 0 : S.html) ===
        ((_ = d.nodeMessage) == null ? void 0 : _.html) &&
      u.isError === d.isError &&
      u.isWarning === d.isWarning &&
      u.timestamp - d.timestamp < 1e3
        ? d.repeat++
        : o.push({ ...u, repeat: 1 });
    }
    const c = [...t.events, ...t.stdio].sort((u, d) => {
      const h = 'time' in u ? u.time : u.timestamp,
        y = 'time' in d ? d.time : d.timestamp;
      return h - y;
    });
    for (const u of c) {
      if (u.type === 'console') {
        const d = u.args && u.args.length ? u_(u.args) : ly(u.text),
          h = u.location.url,
          v = `${h ? h.substring(h.lastIndexOf('/') + 1) : '<anonymous>'}:${u.location.lineNumber}`;
        l({
          browserMessage: { body: d, bodyString: u.text, location: v },
          isError: u.messageType === 'error',
          isWarning: u.messageType === 'warning',
          timestamp: u.time,
        });
      }
      if (
        (u.type === 'event' &&
          u.method === 'pageError' &&
          l({ browserError: u.params.error, isError: !0, isWarning: !1, timestamp: u.time }),
        u.type === 'stderr' || u.type === 'stdout')
      ) {
        let d = '';
        u.text && (d = Qi(u.text.trim()) || ''),
          u.base64 && (d = Qi(atob(u.base64).trim()) || ''),
          l({
            nodeMessage: { html: d },
            isError: u.type === 'stderr',
            isWarning: !1,
            timestamp: u.timestamp,
          });
      }
    }
    return { entries: o };
  }, [t]);
  return {
    entries: P.useMemo(
      () => (e ? n.filter(o => o.timestamp >= e.minimum && o.timestamp <= e.maximum) : n),
      [n, e]
    ),
  };
}
const c_ = ({ consoleModel: t, boundaries: e, onEntryHovered: n, onAccepted: s }) =>
  t.entries.length
    ? x.jsx('div', {
        className: 'console-tab',
        children: x.jsx(l_, {
          name: 'console',
          onAccepted: s,
          onHighlighted: n,
          items: t.entries,
          isError: o => o.isError,
          isWarning: o => o.isWarning,
          render: o => {
            const l = yt(o.timestamp - e.minimum),
              c = x.jsx('span', { className: 'console-time', children: l }),
              u = o.isError ? 'status-error' : o.isWarning ? 'status-warning' : 'status-none',
              d =
                o.browserMessage || o.browserError
                  ? x.jsx('span', {
                      className: Ue('codicon', 'codicon-browser', u),
                      title: 'Browser message',
                    })
                  : x.jsx('span', {
                      className: Ue('codicon', 'codicon-file', u),
                      title: 'Runner message',
                    });
            let h, y, v, m;
            const { browserMessage: w, browserError: S, nodeMessage: _ } = o;
            if ((w && ((h = w.location), (y = w.body)), S)) {
              const { error: b, value: T } = S;
              b ? ((y = b.message), (m = b.stack)) : (y = String(T));
            }
            return (
              _ && (v = _.html),
              x.jsxs('div', {
                className: 'console-line',
                children: [
                  c,
                  d,
                  h && x.jsx('span', { className: 'console-location', children: h }),
                  o.repeat > 1 &&
                    x.jsx('span', { className: 'console-repeat', children: o.repeat }),
                  y && x.jsx('span', { className: 'console-line-message', children: y }),
                  v &&
                    x.jsx('span', {
                      className: 'console-line-message',
                      dangerouslySetInnerHTML: { __html: v },
                    }),
                  m && x.jsx('div', { className: 'console-stack', children: m }),
                ],
              })
            );
          },
        }),
      })
    : x.jsx($r, { text: 'No console entries' });
function u_(t) {
  if (t.length === 1) return ly(t[0].preview);
  const e = typeof t[0].value == 'string' && t[0].value.includes('%'),
    n = e ? t[0].value : '',
    s = e ? t.slice(1) : t;
  let o = 0;
  const l = /%([%sdifoOc])/g;
  let c;
  const u = [];
  let d = [];
  u.push(x.jsx('span', { children: d }, u.length + 1));
  let h = 0;
  for (; (c = l.exec(n)) !== null; ) {
    const y = n.substring(h, c.index);
    d.push(x.jsx('span', { children: y }, d.length + 1)), (h = c.index + 2);
    const v = c[0][1];
    if (v === '%') d.push(x.jsx('span', { children: '%' }, d.length + 1));
    else if (v === 's' || v === 'o' || v === 'O' || v === 'd' || v === 'i' || v === 'f') {
      const m = s[o++],
        w = {};
      typeof (m == null ? void 0 : m.value) != 'string' &&
        (w.color = 'var(--vscode-debugTokenExpression-number)'),
        d.push(
          x.jsx(
            'span',
            { style: w, children: (m == null ? void 0 : m.preview) || '' },
            d.length + 1
          )
        );
    } else if (v === 'c') {
      d = [];
      const m = s[o++],
        w = m ? f_(m.preview) : {};
      u.push(x.jsx('span', { style: w, children: d }, u.length + 1));
    }
  }
  for (
    h < n.length && d.push(x.jsx('span', { children: n.substring(h) }, d.length + 1));
    o < s.length;
    o++
  ) {
    const y = s[o],
      v = {};
    d.length && d.push(x.jsx('span', { children: ' ' }, d.length + 1)),
      typeof (y == null ? void 0 : y.value) != 'string' &&
        (v.color = 'var(--vscode-debugTokenExpression-number)'),
      d.push(
        x.jsx('span', { style: v, children: (y == null ? void 0 : y.preview) || '' }, d.length + 1)
      );
  }
  return u;
}
function ly(t) {
  return [x.jsx('span', { dangerouslySetInnerHTML: { __html: Qi(t.trim()) } })];
}
function f_(t) {
  try {
    const e = {},
      n = t.split(';');
    for (const s of n) {
      const o = s.trim();
      if (!o) continue;
      let [l, c] = o.split(':');
      if (((l = l.trim()), (c = c.trim()), !d_(l))) continue;
      const u = l.replace(/-([a-z])/g, d => d[1].toUpperCase());
      e[u] = c;
    }
    return e;
  } catch {
    return {};
  }
}
function d_(t) {
  return ['background', 'border', 'color', 'font', 'line', 'margin', 'padding', 'text'].some(n =>
    t.startsWith(n)
  );
}
const wf = ({
    noShadow: t,
    children: e,
    noMinHeight: n,
    className: s,
    sidebarBackground: o,
    onClick: l,
  }) =>
    x.jsx('div', {
      className: Ue(
        'toolbar',
        t && 'no-shadow',
        n && 'no-min-height',
        s,
        o && 'toolbar-sidebar-background'
      ),
      onClick: l,
      children: e,
    }),
  Yu = ({
    tabs: t,
    selectedTab: e,
    setSelectedTab: n,
    leftToolbar: s,
    rightToolbar: o,
    dataTestId: l,
    mode: c,
  }) => {
    const u = P.useId();
    return (
      e || (e = t[0].id),
      c || (c = 'default'),
      x.jsx('div', {
        className: 'tabbed-pane',
        'data-testid': l,
        children: x.jsxs('div', {
          className: 'vbox',
          children: [
            x.jsxs(wf, {
              children: [
                s &&
                  x.jsxs('div', {
                    style: { flex: 'none', display: 'flex', margin: '0 4px', alignItems: 'center' },
                    children: [...s],
                  }),
                c === 'default' &&
                  x.jsx('div', {
                    style: { flex: 'auto', display: 'flex', height: '100%', overflow: 'hidden' },
                    role: 'tablist',
                    children: [
                      ...t.map(d =>
                        x.jsx(
                          ay,
                          {
                            id: d.id,
                            ariaControls: `${u}-${d.id}`,
                            title: d.title,
                            count: d.count,
                            errorCount: d.errorCount,
                            selected: e === d.id,
                            onSelect: n,
                          },
                          d.id
                        )
                      ),
                    ],
                  }),
                c === 'select' &&
                  x.jsx('div', {
                    style: { flex: 'auto', display: 'flex', height: '100%', overflow: 'hidden' },
                    role: 'tablist',
                    children: x.jsx('select', {
                      style: { width: '100%', background: 'none', cursor: 'pointer' },
                      value: e,
                      onChange: d => {
                        n == null || n(t[d.currentTarget.selectedIndex].id);
                      },
                      children: t.map(d => {
                        let h = '';
                        return (
                          d.count && (h = ` (${d.count})`),
                          d.errorCount && (h = ` (${d.errorCount})`),
                          x.jsxs(
                            'option',
                            {
                              value: d.id,
                              role: 'tab',
                              'aria-controls': `${u}-${d.id}`,
                              children: [d.title, h],
                            },
                            d.id
                          )
                        );
                      }),
                    }),
                  }),
                o &&
                  x.jsxs('div', {
                    style: { flex: 'none', display: 'flex', alignItems: 'center' },
                    children: [...o],
                  }),
              ],
            }),
            t.map(d => {
              const h = 'tab-content tab-' + d.id;
              if (d.component)
                return x.jsx(
                  'div',
                  {
                    id: `${u}-${d.id}`,
                    role: 'tabpanel',
                    'aria-label': d.title,
                    className: h,
                    style: { display: e === d.id ? 'inherit' : 'none' },
                    children: d.component,
                  },
                  d.id
                );
              if (e === d.id)
                return x.jsx(
                  'div',
                  {
                    id: `${u}-${d.id}`,
                    role: 'tabpanel',
                    'aria-label': d.title,
                    className: h,
                    children: d.render(),
                  },
                  d.id
                );
            }),
          ],
        }),
      })
    );
  },
  ay = ({ id: t, title: e, count: n, errorCount: s, selected: o, onSelect: l, ariaControls: c }) =>
    x.jsxs('div', {
      className: Ue('tabbed-pane-tab', o && 'selected'),
      onClick: () => (l == null ? void 0 : l(t)),
      role: 'tab',
      title: e,
      'aria-controls': c,
      children: [
        x.jsx('div', { className: 'tabbed-pane-tab-label', children: e }),
        !!n && x.jsx('div', { className: 'tabbed-pane-tab-counter', children: n }),
        !!s && x.jsx('div', { className: 'tabbed-pane-tab-counter error', children: s }),
      ],
    });
async function h_(t) {
  const e = navigator.platform.includes('Win') ? 'win' : 'unix';
  let n = [];
  const s = new Set([
    'accept-encoding',
    'host',
    'method',
    'path',
    'scheme',
    'version',
    'authority',
    'protocol',
  ]);
  function o(v) {
    const m = '^"';
    return (
      m +
      v
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/[^a-zA-Z0-9\s_\-:=+~'\/.',?;()*`]/g, '^$&')
        .replace(/%(?=[a-zA-Z0-9_])/g, '%^')
        .replace(
          /\r?\n/g,
          `^

`
        ) +
      m
    );
  }
  function l(v) {
    function m(w) {
      let _ = w.charCodeAt(0).toString(16);
      for (; _.length < 4; ) _ = '0' + _;
      return '\\u' + _;
    }
    return /[\0-\x1F\x7F-\x9F!]|\'/.test(v)
      ? "$'" +
          v
            .replace(/\\/g, '\\\\')
            .replace(/\'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\0-\x1F\x7F-\x9F!]/g, m) +
          "'"
      : "'" + v + "'";
  }
  const c = e === 'win' ? o : l;
  n.push(c(t.request.url).replace(/[[{}\]]/g, '\\$&'));
  let u = 'GET';
  const d = [],
    h = await cy(t);
  h && (d.push('--data-raw ' + c(h)), s.add('content-length'), (u = 'POST')),
    t.request.method !== u && n.push('-X ' + c(t.request.method));
  const y = t.request.headers;
  for (let v = 0; v < y.length; v++) {
    const m = y[v],
      w = m.name.replace(/^:/, '');
    s.has(w.toLowerCase()) ||
      (m.value.trim() ? n.push('-H ' + c(w + ': ' + m.value)) : n.push('-H ' + c(w + ';')));
  }
  return (
    (n = n.concat(d)),
    'curl ' +
      n.join(
        n.length >= 3
          ? e === 'win'
            ? ` ^
  `
            : ` \\
  `
          : ' '
      )
  );
}
async function p_(t, e = 0) {
  const n = new Set([
      'method',
      'path',
      'scheme',
      'version',
      'accept-charset',
      'accept-encoding',
      'access-control-request-headers',
      'access-control-request-method',
      'connection',
      'content-length',
      'cookie',
      'cookie2',
      'date',
      'dnt',
      'expect',
      'host',
      'keep-alive',
      'origin',
      'referer',
      'te',
      'trailer',
      'transfer-encoding',
      'upgrade',
      'via',
      'user-agent',
    ]),
    s = new Set(['cookie', 'authorization']),
    o = JSON.stringify(t.request.url),
    l = t.request.headers,
    c = l.reduce((S, _) => {
      const b = _.name;
      return !n.has(b.toLowerCase()) && !b.includes(':') && S.append(b, _.value), S;
    }, new Headers()),
    u = {};
  for (const S of c) u[S[0]] = S[1];
  const d =
      t.request.cookies.length || l.some(({ name: S }) => s.has(S.toLowerCase()))
        ? 'include'
        : 'omit',
    h = l.find(({ name: S }) => S.toLowerCase() === 'referer'),
    y = h ? h.value : void 0,
    v = await cy(t),
    m = {
      headers: Object.keys(u).length ? u : void 0,
      referrer: y,
      body: v,
      method: t.request.method,
      mode: 'cors',
    };
  if (e === 1) {
    const S = l.find(b => b.name.toLowerCase() === 'cookie'),
      _ = {};
    delete m.mode,
      S && (_.cookie = S.value),
      y && (delete m.referrer, (_.Referer = y)),
      Object.keys(_).length && (m.headers = { ...u, ..._ });
  } else m.credentials = d;
  const w = JSON.stringify(m, null, 2);
  return `fetch(${o}, ${w});`;
}
async function cy(t) {
  var e, n;
  return (e = t.request.postData) != null && e._sha1
    ? await fetch(`sha1/${t.request.postData._sha1}`).then(s => s.text())
    : (n = t.request.postData) == null
      ? void 0
      : n.text;
}
class m_ {
  generatePlaywrightRequestCall(e, n) {
    let s = e.method.toLowerCase();
    const o = new URL(e.url),
      l = `${o.origin}${o.pathname}`,
      c = {};
    ['delete', 'get', 'head', 'post', 'put', 'patch'].includes(s) ||
      ((c.method = s), (s = 'fetch')),
      o.searchParams.size && (c.params = Object.fromEntries(o.searchParams.entries())),
      n && (c.data = n),
      e.headers.length && (c.headers = Object.fromEntries(e.headers.map(h => [h.name, h.value])));
    const u = [`'${l}'`];
    return (
      Object.keys(c).length > 0 && u.push(this.prettyPrintObject(c)),
      `await page.request.${s}(${u.join(', ')});`
    );
  }
  prettyPrintObject(e, n = 2, s = 0) {
    if (e === null) return 'null';
    if (e === void 0) return 'undefined';
    if (typeof e != 'object') return typeof e == 'string' ? this.stringLiteral(e) : String(e);
    if (Array.isArray(e)) {
      if (e.length === 0) return '[]';
      const u = ' '.repeat(s * n),
        d = ' '.repeat((s + 1) * n);
      return `[
${e.map(y => `${d}${this.prettyPrintObject(y, n, s + 1)}`).join(`,
`)}
${u}]`;
    }
    if (Object.keys(e).length === 0) return '{}';
    const o = ' '.repeat(s * n),
      l = ' '.repeat((s + 1) * n);
    return `{
${Object.entries(e).map(([u, d]) => {
  const h = this.prettyPrintObject(d, n, s + 1),
    y = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(u) ? u : this.stringLiteral(u);
  return `${l}${y}: ${h}`;
}).join(`,
`)}
${o}}`;
  }
  stringLiteral(e) {
    return (
      (e = e.replace(/\\/g, '\\\\').replace(/'/g, "\\'")),
      e.includes(`
`) ||
      e.includes('\r') ||
      e.includes('	')
        ? '`' + e + '`'
        : `'${e}'`
    );
  }
}
class g_ {
  generatePlaywrightRequestCall(e, n) {
    const s = new URL(e.url),
      l = [`"${`${s.origin}${s.pathname}`}"`];
    let c = e.method.toLowerCase();
    ['delete', 'get', 'head', 'post', 'put', 'patch'].includes(c) ||
      (l.push(`method="${c}"`), (c = 'fetch')),
      s.searchParams.size &&
        l.push(`params=${this.prettyPrintObject(Object.fromEntries(s.searchParams.entries()))}`),
      n && l.push(`data=${this.prettyPrintObject(n)}`),
      e.headers.length &&
        l.push(
          `headers=${this.prettyPrintObject(Object.fromEntries(e.headers.map(d => [d.name, d.value])))}`
        );
    const u =
      l.length === 1
        ? l[0]
        : `
${l.map(d => this.indent(d, 2)).join(`,
`)}
`;
    return `await page.request.${c}(${u})`;
  }
  indent(e, n) {
    return e
      .split(
        `
`
      )
      .map(s => ' '.repeat(n) + s).join(`
`);
  }
  prettyPrintObject(e, n = 2, s = 0) {
    if (e === null || e === void 0) return 'None';
    if (typeof e != 'object')
      return typeof e == 'string'
        ? this.stringLiteral(e)
        : typeof e == 'boolean'
          ? e
            ? 'True'
            : 'False'
          : String(e);
    if (Array.isArray(e)) {
      if (e.length === 0) return '[]';
      const u = ' '.repeat(s * n),
        d = ' '.repeat((s + 1) * n);
      return `[
${e.map(y => `${d}${this.prettyPrintObject(y, n, s + 1)}`).join(`,
`)}
${u}]`;
    }
    if (Object.keys(e).length === 0) return '{}';
    const o = ' '.repeat(s * n),
      l = ' '.repeat((s + 1) * n);
    return `{
${Object.entries(e).map(([u, d]) => {
  const h = this.prettyPrintObject(d, n, s + 1);
  return `${l}${this.stringLiteral(u)}: ${h}`;
}).join(`,
`)}
${o}}`;
  }
  stringLiteral(e) {
    return JSON.stringify(e);
  }
}
class y_ {
  generatePlaywrightRequestCall(e, n) {
    const s = new URL(e.url),
      o = `${s.origin}${s.pathname}`,
      l = {},
      c = [];
    let u = e.method.toLowerCase();
    ['delete', 'get', 'head', 'post', 'put', 'patch'].includes(u) ||
      ((l.Method = u), (u = 'fetch')),
      s.searchParams.size && (l.Params = Object.fromEntries(s.searchParams.entries())),
      n && (l.Data = n),
      e.headers.length && (l.Headers = Object.fromEntries(e.headers.map(y => [y.name, y.value])));
    const d = [`"${o}"`];
    return (
      Object.keys(l).length > 0 && d.push(this.prettyPrintObject(l)),
      `${c.join(`
`)}${
        c.length
          ? `
`
          : ''
      }await request.${this.toFunctionName(u)}(${d.join(', ')});`
    );
  }
  toFunctionName(e) {
    return e[0].toUpperCase() + e.slice(1) + 'Async';
  }
  prettyPrintObject(e, n = 2, s = 0) {
    if (e === null || e === void 0) return 'null';
    if (typeof e != 'object')
      return typeof e == 'string'
        ? this.stringLiteral(e)
        : typeof e == 'boolean'
          ? e
            ? 'true'
            : 'false'
          : String(e);
    if (Array.isArray(e)) {
      if (e.length === 0) return 'new object[] {}';
      const u = ' '.repeat(s * n),
        d = ' '.repeat((s + 1) * n);
      return `new object[] {
${e.map(y => `${d}${this.prettyPrintObject(y, n, s + 1)}`).join(`,
`)}
${u}}`;
    }
    if (Object.keys(e).length === 0) return 'new {}';
    const o = ' '.repeat(s * n),
      l = ' '.repeat((s + 1) * n);
    return `new() {
${Object.entries(e).map(([u, d]) => {
  const h = this.prettyPrintObject(d, n, s + 1),
    y = s === 0 ? u : `[${this.stringLiteral(u)}]`;
  return `${l}${y} = ${h}`;
}).join(`,
`)}
${o}}`;
  }
  stringLiteral(e) {
    return JSON.stringify(e);
  }
}
class v_ {
  generatePlaywrightRequestCall(e, n) {
    const s = new URL(e.url),
      o = [`"${s.origin}${s.pathname}"`],
      l = [];
    let c = e.method.toLowerCase();
    ['delete', 'get', 'head', 'post', 'put', 'patch'].includes(c) ||
      (l.push(`setMethod("${c}")`), (c = 'fetch'));
    for (const [u, d] of s.searchParams)
      l.push(`setQueryParam(${this.stringLiteral(u)}, ${this.stringLiteral(d)})`);
    n && l.push(`setData(${this.stringLiteral(n)})`);
    for (const u of e.headers)
      l.push(`setHeader(${this.stringLiteral(u.name)}, ${this.stringLiteral(u.value)})`);
    return (
      l.length > 0 &&
        o.push(`RequestOptions.create()
  .${l.join(`
  .`)}
`),
      `request.${c}(${o.join(', ')});`
    );
  }
  stringLiteral(e) {
    return JSON.stringify(e);
  }
}
function w_(t) {
  if (t === 'javascript') return new m_();
  if (t === 'python') return new g_();
  if (t === 'csharp') return new y_();
  if (t === 'java') return new v_();
  throw new Error('Unsupported language: ' + t);
}
const x_ = ({ resource: t, sdkLanguage: e, startTimeOffset: n, onClose: s }) => {
    const [o, l] = P.useState('request'),
      c = ff(
        async () => {
          if (t.request.postData) {
            const u = t.request.headers.find(h => h.name.toLowerCase() === 'content-type'),
              d = u ? u.value : '';
            if (t.request.postData._sha1) {
              const h = await fetch(`sha1/${t.request.postData._sha1}`);
              return { text: Zu(await h.text(), d), mimeType: d };
            } else return { text: Zu(t.request.postData.text, d), mimeType: d };
          } else return null;
        },
        [t],
        null
      );
    return x.jsx(Yu, {
      dataTestId: 'network-request-details',
      leftToolbar: [x.jsx(Rt, { icon: 'close', title: 'Close', onClick: s }, 'close')],
      rightToolbar: [x.jsx(S_, { requestBody: c, resource: t, sdkLanguage: e }, 'dropdown')],
      tabs: [
        {
          id: 'request',
          title: 'Request',
          render: () => x.jsx(__, { resource: t, startTimeOffset: n, requestBody: c }),
        },
        { id: 'response', title: 'Response', render: () => x.jsx(k_, { resource: t }) },
        { id: 'body', title: 'Body', render: () => x.jsx(b_, { resource: t }) },
      ],
      selectedTab: o,
      setSelectedTab: l,
    });
  },
  S_ = ({ resource: t, sdkLanguage: e, requestBody: n }) => {
    const s = x.jsxs(x.Fragment, {
        children: [
          x.jsx('span', { className: 'codicon codicon-check', style: { marginRight: '5px' } }),
          ' Copied ',
        ],
      }),
      o = async () => w_(e).generatePlaywrightRequestCall(t.request, n == null ? void 0 : n.text);
    return x.jsxs('div', {
      className: 'copy-request-dropdown',
      children: [
        x.jsxs(Rt, {
          className: 'copy-request-dropdown-toggle',
          children: [
            x.jsx('span', { className: 'codicon codicon-copy', style: { marginRight: '5px' } }),
            'Copy request',
            x.jsx('span', {
              className: 'codicon codicon-chevron-down',
              style: { marginLeft: '5px' },
            }),
          ],
        }),
        x.jsxs('div', {
          className: 'copy-request-dropdown-menu',
          children: [
            x.jsx(Ml, { description: 'Copy as cURL', copiedDescription: s, value: () => h_(t) }),
            x.jsx(Ml, { description: 'Copy as Fetch', copiedDescription: s, value: () => p_(t) }),
            x.jsx(Ml, { description: 'Copy as Playwright', copiedDescription: s, value: o }),
          ],
        }),
      ],
    });
  },
  __ = ({ resource: t, startTimeOffset: e, requestBody: n }) =>
    x.jsxs('div', {
      className: 'network-request-details-tab',
      children: [
        x.jsx('div', { className: 'network-request-details-header', children: 'General' }),
        x.jsx('div', {
          className: 'network-request-details-url',
          children: `URL: ${t.request.url}`,
        }),
        x.jsx('div', {
          className: 'network-request-details-general',
          children: `Method: ${t.request.method}`,
        }),
        t.response.status !== -1 &&
          x.jsxs('div', {
            className: 'network-request-details-general',
            style: { display: 'flex' },
            children: [
              'Status Code: ',
              x.jsx('span', {
                className: T_(t.response.status),
                style: { display: 'inline-flex' },
                children: `${t.response.status} ${t.response.statusText}`,
              }),
            ],
          }),
        t.request.queryString.length
          ? x.jsxs(x.Fragment, {
              children: [
                x.jsx('div', {
                  className: 'network-request-details-header',
                  children: 'Query String Parameters',
                }),
                x.jsx('div', {
                  className: 'network-request-details-headers',
                  children: t.request.queryString.map(s => `${s.name}: ${s.value}`).join(`
`),
                }),
              ],
            })
          : null,
        x.jsx('div', { className: 'network-request-details-header', children: 'Request Headers' }),
        x.jsx('div', {
          className: 'network-request-details-headers',
          children: t.request.headers.map(s => `${s.name}: ${s.value}`).join(`
`),
        }),
        x.jsx('div', { className: 'network-request-details-header', children: 'Time' }),
        x.jsx('div', { className: 'network-request-details-general', children: `Start: ${yt(e)}` }),
        x.jsx('div', {
          className: 'network-request-details-general',
          children: `Duration: ${yt(t.time)}`,
        }),
        n &&
          x.jsx('div', { className: 'network-request-details-header', children: 'Request Body' }),
        n && x.jsx(js, { text: n.text, mimeType: n.mimeType, readOnly: !0, lineNumbers: !0 }),
      ],
    }),
  k_ = ({ resource: t }) =>
    x.jsxs('div', {
      className: 'network-request-details-tab',
      children: [
        x.jsx('div', { className: 'network-request-details-header', children: 'Response Headers' }),
        x.jsx('div', {
          className: 'network-request-details-headers',
          children: t.response.headers.map(e => `${e.name}: ${e.value}`).join(`
`),
        }),
      ],
    }),
  b_ = ({ resource: t }) => {
    const [e, n] = P.useState(null);
    return (
      P.useEffect(() => {
        (async () => {
          if (t.response.content._sha1) {
            const o = t.response.content.mimeType.includes('image'),
              l = t.response.content.mimeType.includes('font'),
              c = await fetch(`sha1/${t.response.content._sha1}`);
            if (o) {
              const u = await c.blob(),
                d = new FileReader(),
                h = new Promise(y => (d.onload = y));
              d.readAsDataURL(u), n({ dataUrl: (await h).target.result });
            } else if (l) {
              const u = await c.arrayBuffer();
              n({ font: u });
            } else {
              const u = Zu(await c.text(), t.response.content.mimeType);
              n({ text: u, mimeType: t.response.content.mimeType });
            }
          } else n(null);
        })();
      }, [t]),
      x.jsxs('div', {
        className: 'network-request-details-tab',
        children: [
          !t.response.content._sha1 &&
            x.jsx('div', { children: 'Response body is not available for this request.' }),
          e && e.font && x.jsx(E_, { font: e.font }),
          e && e.dataUrl && x.jsx('img', { draggable: 'false', src: e.dataUrl }),
          e &&
            e.text &&
            x.jsx(js, { text: e.text, mimeType: e.mimeType, readOnly: !0, lineNumbers: !0 }),
        ],
      })
    );
  },
  E_ = ({ font: t }) => {
    const [e, n] = P.useState(!1);
    return (
      P.useEffect(() => {
        let s;
        try {
          (s = new FontFace('font-preview', t)),
            s.status === 'loaded' && document.fonts.add(s),
            s.status === 'error' && n(!0);
        } catch {
          n(!0);
        }
        return () => {
          document.fonts.delete(s);
        };
      }, [t]),
      e
        ? x.jsx('div', {
            className: 'network-font-preview-error',
            children: 'Could not load font preview',
          })
        : x.jsxs('div', {
            className: 'network-font-preview',
            children: [
              'ABCDEFGHIJKLM',
              x.jsx('br', {}),
              'NOPQRSTUVWXYZ',
              x.jsx('br', {}),
              'abcdefghijklm',
              x.jsx('br', {}),
              'nopqrstuvwxyz',
              x.jsx('br', {}),
              '1234567890',
            ],
          })
    );
  };
function T_(t) {
  return t < 300 || t === 304 ? 'green-circle' : t < 400 ? 'yellow-circle' : 'red-circle';
}
function Zu(t, e) {
  if (t === null) return 'Loading...';
  const n = t;
  if (n === '') return '<Empty>';
  if (e.includes('application/json'))
    try {
      return JSON.stringify(JSON.parse(n), null, 2);
    } catch {
      return n;
    }
  return e.includes('application/x-www-form-urlencoded') ? decodeURIComponent(n) : n;
}
function N_(t) {
  const [e, n] = P.useState([]);
  P.useEffect(() => {
    const l = [];
    for (let c = 0; c < t.columns.length - 1; ++c) {
      const u = t.columns[c];
      l[c] = (l[c - 1] || 0) + t.columnWidths.get(u);
    }
    n(l);
  }, [t.columns, t.columnWidths]);
  function s(l) {
    const c = new Map(t.columnWidths.entries());
    for (let u = 0; u < l.length; ++u) {
      const d = l[u] - (l[u - 1] || 0),
        h = t.columns[u];
      c.set(h, d);
    }
    t.setColumnWidths(c);
  }
  const o = P.useCallback(
    l => {
      var c, u;
      (u = t.setSorting) == null ||
        u.call(t, {
          by: l,
          negate: ((c = t.sorting) == null ? void 0 : c.by) === l ? !t.sorting.negate : !1,
        });
    },
    [t]
  );
  return x.jsxs('div', {
    className: `grid-view ${t.name}-grid-view`,
    children: [
      x.jsx(iy, {
        orientation: 'horizontal',
        offsets: e,
        setOffsets: s,
        resizerColor: 'var(--vscode-panel-border)',
        resizerWidth: 1,
        minColumnWidth: 25,
      }),
      x.jsxs('div', {
        className: 'vbox',
        children: [
          x.jsx('div', {
            className: 'grid-view-header',
            children: t.columns.map((l, c) =>
              x.jsxs(
                'div',
                {
                  className: 'grid-view-header-cell ' + C_(l, t.sorting),
                  style: { width: c < t.columns.length - 1 ? t.columnWidths.get(l) : void 0 },
                  onClick: () => t.setSorting && o(l),
                  children: [
                    x.jsx('span', {
                      className: 'grid-view-header-cell-title',
                      children: t.columnTitle(l),
                    }),
                    x.jsx('span', { className: 'codicon codicon-triangle-up' }),
                    x.jsx('span', { className: 'codicon codicon-triangle-down' }),
                  ],
                },
                t.columnTitle(l)
              )
            ),
          }),
          x.jsx(ia, {
            name: t.name,
            items: t.items,
            id: t.id,
            render: (l, c) =>
              x.jsx(x.Fragment, {
                children: t.columns.map((u, d) => {
                  const { body: h, title: y } = t.render(l, u, c);
                  return x.jsx(
                    'div',
                    {
                      className: `grid-view-cell grid-view-column-${String(u)}`,
                      title: y,
                      style: { width: d < t.columns.length - 1 ? t.columnWidths.get(u) : void 0 },
                      children: h,
                    },
                    t.columnTitle(u)
                  );
                }),
              }),
            icon: t.icon,
            isError: t.isError,
            isWarning: t.isWarning,
            isInfo: t.isInfo,
            selectedItem: t.selectedItem,
            onAccepted: t.onAccepted,
            onSelected: t.onSelected,
            onHighlighted: t.onHighlighted,
            onIconClicked: t.onIconClicked,
            noItemsMessage: t.noItemsMessage,
            dataTestId: t.dataTestId,
            notSelectable: t.notSelectable,
          }),
        ],
      }),
    ],
  });
}
function C_(t, e) {
  return t === (e == null ? void 0 : e.by) ? ' filter-' + (e.negate ? 'negative' : 'positive') : '';
}
const A_ = ['All', 'Fetch', 'HTML', 'JS', 'CSS', 'Font', 'Image'],
  L_ = { searchValue: '', resourceType: 'All' },
  j_ = ({ filterState: t, onFilterStateChange: e }) =>
    x.jsxs('div', {
      className: 'network-filters',
      children: [
        x.jsx('input', {
          type: 'search',
          placeholder: 'Filter network',
          spellCheck: !1,
          value: t.searchValue,
          onChange: n => e({ ...t, searchValue: n.target.value }),
        }),
        x.jsx('div', {
          className: 'network-filters-resource-types',
          children: A_.map(n =>
            x.jsx(
              'div',
              {
                title: n,
                onClick: () => e({ ...t, resourceType: n }),
                className: `network-filters-resource-type ${t.resourceType === n ? 'selected' : ''}`,
                children: n,
              },
              n
            )
          ),
        }),
      ],
    }),
  I_ = N_;
function O_(t, e) {
  const n = P.useMemo(
      () =>
        ((t == null ? void 0 : t.resources) || []).filter(c =>
          e
            ? !!c._monotonicTime && c._monotonicTime >= e.minimum && c._monotonicTime <= e.maximum
            : !0
        ),
      [t, e]
    ),
    s = P.useMemo(() => new F_(t), [t]);
  return { resources: n, contextIdMap: s };
}
const M_ = ({ boundaries: t, networkModel: e, onEntryHovered: n, sdkLanguage: s }) => {
    const [o, l] = P.useState(void 0),
      [c, u] = P.useState(void 0),
      [d, h] = P.useState(L_),
      { renderedEntries: y } = P.useMemo(() => {
        const _ = e.resources.map(b => z_(b, t, e.contextIdMap)).filter(V_(d));
        return o && U_(_, o), { renderedEntries: _ };
      }, [e.resources, e.contextIdMap, d, o, t]),
      [v, m] = P.useState(() => new Map(uy().map(_ => [_, P_(_)]))),
      w = P.useCallback(_ => {
        h(_), u(void 0);
      }, []);
    if (!e.resources.length) return x.jsx($r, { text: 'No network calls' });
    const S = x.jsx(I_, {
      name: 'network',
      items: y,
      selectedItem: c,
      onSelected: _ => u(_),
      onHighlighted: _ => (n == null ? void 0 : n(_ == null ? void 0 : _.resource)),
      columns: R_(!!c, y),
      columnTitle: $_,
      columnWidths: v,
      setColumnWidths: m,
      isError: _ => _.status.code >= 400 || _.status.code === -1,
      isInfo: _ => !!_.route,
      render: (_, b) => D_(_, b),
      sorting: o,
      setSorting: l,
    });
    return x.jsxs(x.Fragment, {
      children: [
        x.jsx(j_, { filterState: d, onFilterStateChange: w }),
        !c && S,
        c &&
          x.jsx(Hl, {
            sidebarSize: v.get('name'),
            sidebarIsFirst: !0,
            orientation: 'horizontal',
            settingName: 'networkResourceDetails',
            main: x.jsx(x_, {
              resource: c.resource,
              sdkLanguage: s,
              startTimeOffset: c.start,
              onClose: () => u(void 0),
            }),
            sidebar: S,
          }),
      ],
    });
  },
  $_ = t =>
    t === 'contextId'
      ? 'Source'
      : t === 'name'
        ? 'Name'
        : t === 'method'
          ? 'Method'
          : t === 'status'
            ? 'Status'
            : t === 'contentType'
              ? 'Content Type'
              : t === 'duration'
                ? 'Duration'
                : t === 'size'
                  ? 'Size'
                  : t === 'start'
                    ? 'Start'
                    : t === 'route'
                      ? 'Route'
                      : '',
  P_ = t =>
    t === 'name'
      ? 200
      : t === 'method' || t === 'status'
        ? 60
        : t === 'contentType'
          ? 200
          : t === 'contextId'
            ? 60
            : 100;
function R_(t, e) {
  if (t) {
    const s = ['name'];
    return Em(e) && s.unshift('contextId'), s;
  }
  let n = uy();
  return Em(e) || (n = n.filter(s => s !== 'contextId')), n;
}
function uy() {
  return [
    'contextId',
    'name',
    'method',
    'status',
    'contentType',
    'duration',
    'size',
    'start',
    'route',
  ];
}
const D_ = (t, e) =>
  e === 'contextId'
    ? { body: t.contextId, title: t.name.url }
    : e === 'name'
      ? { body: t.name.name, title: t.name.url }
      : e === 'method'
        ? { body: t.method }
        : e === 'status'
          ? { body: t.status.code > 0 ? t.status.code : '', title: t.status.text }
          : e === 'contentType'
            ? { body: t.contentType }
            : e === 'duration'
              ? { body: yt(t.duration) }
              : e === 'size'
                ? { body: lx(t.size) }
                : e === 'start'
                  ? { body: yt(t.start) }
                  : e === 'route'
                    ? { body: t.route }
                    : { body: '' };
class F_ {
  constructor(e) {
    xe(this, '_pagerefToShortId', new Map());
    xe(this, '_contextToId', new Map());
    xe(this, '_lastPageId', 0);
    xe(this, '_lastApiRequestContextId', 0);
  }
  contextId(e) {
    return e.pageref ? this._pageId(e.pageref) : e._apiRequest ? this._apiRequestContextId(e) : '';
  }
  _pageId(e) {
    let n = this._pagerefToShortId.get(e);
    return (
      n || (++this._lastPageId, (n = 'page#' + this._lastPageId), this._pagerefToShortId.set(e, n)),
      n
    );
  }
  _apiRequestContextId(e) {
    const n = ql(e);
    if (!n) return '';
    let s = this._contextToId.get(n);
    return (
      s ||
        (++this._lastApiRequestContextId,
        (s = 'api#' + this._lastApiRequestContextId),
        this._contextToId.set(n, s)),
      s
    );
  }
}
function Em(t) {
  const e = new Set();
  for (const n of t) if ((e.add(n.contextId), e.size > 1)) return !0;
  return !1;
}
const z_ = (t, e, n) => {
  const s = B_(t);
  let o;
  try {
    const u = new URL(t.request.url);
    (o = u.pathname.substring(u.pathname.lastIndexOf('/') + 1)),
      o || (o = u.host),
      u.search && (o += u.search);
  } catch {
    o = t.request.url;
  }
  let l = t.response.content.mimeType;
  const c = l.match(/^(.*);\s*charset=.*$/);
  return (
    c && (l = c[1]),
    {
      name: { name: o, url: t.request.url },
      method: t.request.method,
      status: { code: t.response.status, text: t.response.statusText },
      contentType: l,
      duration: t.time,
      size: t.response._transferSize > 0 ? t.response._transferSize : t.response.bodySize,
      start: t._monotonicTime - e.minimum,
      route: s,
      resource: t,
      contextId: n.contextId(t),
    }
  );
};
function B_(t) {
  return t._wasAborted
    ? 'aborted'
    : t._wasContinued
      ? 'continued'
      : t._wasFulfilled
        ? 'fulfilled'
        : t._apiRequest
          ? 'api'
          : '';
}
function U_(t, e) {
  const n = q_(e == null ? void 0 : e.by);
  n && t.sort(n), e.negate && t.reverse();
}
function q_(t) {
  if (t === 'start') return (e, n) => e.start - n.start;
  if (t === 'duration') return (e, n) => e.duration - n.duration;
  if (t === 'status') return (e, n) => e.status.code - n.status.code;
  if (t === 'method')
    return (e, n) => {
      const s = e.method,
        o = n.method;
      return s.localeCompare(o);
    };
  if (t === 'size') return (e, n) => e.size - n.size;
  if (t === 'contentType') return (e, n) => e.contentType.localeCompare(n.contentType);
  if (t === 'name') return (e, n) => e.name.name.localeCompare(n.name.name);
  if (t === 'route') return (e, n) => e.route.localeCompare(n.route);
  if (t === 'contextId') return (e, n) => e.contextId.localeCompare(n.contextId);
}
const H_ = {
  All: () => !0,
  Fetch: t => t === 'application/json',
  HTML: t => t === 'text/html',
  CSS: t => t === 'text/css',
  JS: t => t.includes('javascript'),
  Font: t => t.includes('font'),
  Image: t => t.includes('image'),
};
function V_({ searchValue: t, resourceType: e }) {
  return n => {
    const s = H_[e];
    return s(n.contentType) && n.name.url.toLowerCase().includes(t.toLowerCase());
  };
}
function xf(t, e, n = {}) {
  var m;
  const s = new t.LineCounter(),
    o = { keepSourceTokens: !0, lineCounter: s, ...n },
    l = t.parseDocument(e, o),
    c = [],
    u = w => [s.linePos(w[0]), s.linePos(w[1])],
    d = w => {
      c.push({ message: w.message, range: [s.linePos(w.pos[0]), s.linePos(w.pos[1])] });
    },
    h = (w, S) => {
      for (const _ of S.items) {
        if (_ instanceof t.Scalar && typeof _.value == 'string') {
          const C = Ql.parse(_, o, c);
          C && ((w.children = w.children || []), w.children.push(C));
          continue;
        }
        if (_ instanceof t.YAMLMap) {
          y(w, _);
          continue;
        }
        c.push({
          message: 'Sequence items should be strings or maps',
          range: u(_.range || S.range),
        });
      }
    },
    y = (w, S) => {
      for (const _ of S.items) {
        if (
          ((w.children = w.children || []),
          !(_.key instanceof t.Scalar && typeof _.key.value == 'string'))
        ) {
          c.push({ message: 'Only string keys are supported', range: u(_.key.range || S.range) });
          continue;
        }
        const T = _.key,
          C = _.value;
        if (T.value === 'text') {
          if (!(C instanceof t.Scalar && typeof C.value == 'string')) {
            c.push({
              message: 'Text value should be a string',
              range: u(_.value.range || S.range),
            });
            continue;
          }
          w.children.push({ kind: 'text', text: bu(C.value) });
          continue;
        }
        if (T.value === '/children') {
          if (
            !(C instanceof t.Scalar && typeof C.value == 'string') ||
            (C.value !== 'contain' && C.value !== 'equal' && C.value !== 'deep-equal')
          ) {
            c.push({
              message: 'Strict value should be "contain", "equal" or "deep-equal"',
              range: u(_.value.range || S.range),
            });
            continue;
          }
          w.containerMode = C.value;
          continue;
        }
        if (T.value.startsWith('/')) {
          if (!(C instanceof t.Scalar && typeof C.value == 'string')) {
            c.push({
              message: 'Property value should be a string',
              range: u(_.value.range || S.range),
            });
            continue;
          }
          (w.props = w.props ?? {}), (w.props[T.value.slice(1)] = bu(C.value));
          continue;
        }
        const O = Ql.parse(T, o, c);
        if (!O) continue;
        if (C instanceof t.Scalar) {
          const F = typeof C.value;
          if (F !== 'string' && F !== 'number' && F !== 'boolean') {
            c.push({
              message: 'Node value should be a string or a sequence',
              range: u(_.value.range || S.range),
            });
            continue;
          }
          w.children.push({ ...O, children: [{ kind: 'text', text: bu(String(C.value)) }] });
          continue;
        }
        if (C instanceof t.YAMLSeq) {
          w.children.push(O), h(O, C);
          continue;
        }
        c.push({
          message: 'Map values should be strings or sequences',
          range: u(_.value.range || S.range),
        });
      }
    },
    v = { kind: 'role', role: 'fragment' };
  return (
    l.errors.forEach(d),
    c.length
      ? { errors: c, fragment: v }
      : (l.contents instanceof t.YAMLSeq ||
          c.push({
            message: 'Aria snapshot must be a YAML sequence, elements starting with " -"',
            range: l.contents
              ? u(l.contents.range)
              : [
                  { line: 0, col: 0 },
                  { line: 0, col: 0 },
                ],
          }),
        c.length
          ? { errors: c, fragment: v }
          : (h(v, l.contents),
            c.length
              ? { errors: c, fragment: W_ }
              : ((m = v.children) == null ? void 0 : m.length) === 1
                ? { fragment: v.children[0], errors: c }
                : { fragment: v, errors: c }))
  );
}
const W_ = { kind: 'role', role: 'fragment' };
function fy(t) {
  return t
    .replace(/[\u200b\u00ad]/g, '')
    .replace(/[\r\n\s\t]+/g, ' ')
    .trim();
}
function bu(t) {
  return t.startsWith('/') && t.endsWith('/') && t.length > 1 ? { pattern: t.slice(1, -1) } : fy(t);
}
class Ql {
  static parse(e, n, s) {
    try {
      return new Ql(e.value)._parse();
    } catch (o) {
      if (o instanceof Tm) {
        const l =
          n.prettyErrors === !1
            ? o.message
            : o.message +
              `:

` +
              e.value +
              `
` +
              ' '.repeat(o.pos) +
              `^
`;
        return (
          s.push({
            message: l,
            range: [n.lineCounter.linePos(e.range[0]), n.lineCounter.linePos(e.range[0] + o.pos)],
          }),
          null
        );
      }
      throw o;
    }
  }
  constructor(e) {
    (this._input = e), (this._pos = 0), (this._length = e.length);
  }
  _peek() {
    return this._input[this._pos] || '';
  }
  _next() {
    return this._pos < this._length ? this._input[this._pos++] : null;
  }
  _eof() {
    return this._pos >= this._length;
  }
  _isWhitespace() {
    return !this._eof() && /\s/.test(this._peek());
  }
  _skipWhitespace() {
    for (; this._isWhitespace(); ) this._pos++;
  }
  _readIdentifier(e) {
    this._eof() && this._throwError(`Unexpected end of input when expecting ${e}`);
    const n = this._pos;
    for (; !this._eof() && /[a-zA-Z]/.test(this._peek()); ) this._pos++;
    return this._input.slice(n, this._pos);
  }
  _readString() {
    let e = '',
      n = !1;
    for (; !this._eof(); ) {
      const s = this._next();
      if (n) (e += s), (n = !1);
      else if (s === '\\') n = !0;
      else {
        if (s === '"') return e;
        e += s;
      }
    }
    this._throwError('Unterminated string');
  }
  _throwError(e, n = 0) {
    throw new Tm(e, n || this._pos);
  }
  _readRegex() {
    let e = '',
      n = !1,
      s = !1;
    for (; !this._eof(); ) {
      const o = this._next();
      if (n) (e += o), (n = !1);
      else if (o === '\\') (n = !0), (e += o);
      else {
        if (o === '/' && !s) return { pattern: e };
        o === '[' ? ((s = !0), (e += o)) : o === ']' && s ? ((e += o), (s = !1)) : (e += o);
      }
    }
    this._throwError('Unterminated regex');
  }
  _readStringOrRegex() {
    const e = this._peek();
    return e === '"'
      ? (this._next(), fy(this._readString()))
      : e === '/'
        ? (this._next(), this._readRegex())
        : null;
  }
  _readAttributes(e) {
    let n = this._pos;
    for (; this._skipWhitespace(), this._peek() === '['; ) {
      this._next(), this._skipWhitespace(), (n = this._pos);
      const s = this._readIdentifier('attribute');
      this._skipWhitespace();
      let o = '';
      if (this._peek() === '=')
        for (
          this._next(), this._skipWhitespace(), n = this._pos;
          this._peek() !== ']' && !this._isWhitespace() && !this._eof();

        )
          o += this._next();
      this._skipWhitespace(),
        this._peek() !== ']' && this._throwError('Expected ]'),
        this._next(),
        this._applyAttribute(e, s, o || 'true', n);
    }
  }
  _parse() {
    this._skipWhitespace();
    const e = this._readIdentifier('role');
    this._skipWhitespace();
    const n = this._readStringOrRegex() || '',
      s = { kind: 'role', role: e, name: n };
    return (
      this._readAttributes(s),
      this._skipWhitespace(),
      this._eof() || this._throwError('Unexpected input'),
      s
    );
  }
  _applyAttribute(e, n, s, o) {
    if (n === 'checked') {
      this._assert(
        s === 'true' || s === 'false' || s === 'mixed',
        'Value of "checked" attribute must be a boolean or "mixed"',
        o
      ),
        (e.checked = s === 'true' ? !0 : s === 'false' ? !1 : 'mixed');
      return;
    }
    if (n === 'disabled') {
      this._assert(
        s === 'true' || s === 'false',
        'Value of "disabled" attribute must be a boolean',
        o
      ),
        (e.disabled = s === 'true');
      return;
    }
    if (n === 'expanded') {
      this._assert(
        s === 'true' || s === 'false',
        'Value of "expanded" attribute must be a boolean',
        o
      ),
        (e.expanded = s === 'true');
      return;
    }
    if (n === 'level') {
      this._assert(!isNaN(Number(s)), 'Value of "level" attribute must be a number', o),
        (e.level = Number(s));
      return;
    }
    if (n === 'pressed') {
      this._assert(
        s === 'true' || s === 'false' || s === 'mixed',
        'Value of "pressed" attribute must be a boolean or "mixed"',
        o
      ),
        (e.pressed = s === 'true' ? !0 : s === 'false' ? !1 : 'mixed');
      return;
    }
    if (n === 'selected') {
      this._assert(
        s === 'true' || s === 'false',
        'Value of "selected" attribute must be a boolean',
        o
      ),
        (e.selected = s === 'true');
      return;
    }
    this._assert(!1, `Unsupported attribute [${n}]`, o);
  }
  _assert(e, n, s) {
    e || this._throwError(n || 'Assertion error', s);
  }
}
class Tm extends Error {
  constructor(e, n) {
    super(e), (this.pos = n);
  }
}
let Sf = {};
function K_(t) {
  Sf = t;
}
function _f() {
  return Sf;
}
function aa(t, e) {
  for (; e; ) {
    if (t.contains(e)) return !0;
    e = hy(e);
  }
  return !1;
}
function gt(t) {
  if (t.parentElement) return t.parentElement;
  if (t.parentNode && t.parentNode.nodeType === 11 && t.parentNode.host) return t.parentNode.host;
}
function dy(t) {
  let e = t;
  for (; e.parentNode; ) e = e.parentNode;
  if (e.nodeType === 11 || e.nodeType === 9) return e;
}
function hy(t) {
  for (; t.parentElement; ) t = t.parentElement;
  return gt(t);
}
function Ui(t, e, n) {
  for (; t; ) {
    const s = t.closest(e);
    if (n && s !== n && s != null && s.contains(n)) return;
    if (s) return s;
    t = hy(t);
  }
}
function Pr(t, e) {
  return t.ownerDocument && t.ownerDocument.defaultView
    ? t.ownerDocument.defaultView.getComputedStyle(t, e)
    : void 0;
}
function py(t, e) {
  if (((e = e ?? Pr(t)), !e)) return !0;
  if (Element.prototype.checkVisibility && Sf.browserNameForWorkarounds !== 'webkit') {
    if (!t.checkVisibility()) return !1;
  } else {
    const n = t.closest('details,summary');
    if (n !== t && (n == null ? void 0 : n.nodeName) === 'DETAILS' && !n.open) return !1;
  }
  return e.visibility === 'visible';
}
function Ts(t) {
  const e = Pr(t);
  if (!e) return !0;
  if (e.display === 'contents') {
    for (let s = t.firstChild; s; s = s.nextSibling)
      if ((s.nodeType === 1 && Ts(s)) || (s.nodeType === 3 && my(s))) return !0;
    return !1;
  }
  if (!py(t, e)) return !1;
  const n = t.getBoundingClientRect();
  return n.width > 0 && n.height > 0;
}
function my(t) {
  const e = t.ownerDocument.createRange();
  e.selectNode(t);
  const n = e.getBoundingClientRect();
  return n.width > 0 && n.height > 0;
}
function ct(t) {
  return t instanceof HTMLFormElement ? 'FORM' : t.tagName.toUpperCase();
}
function Nm(t) {
  return t.hasAttribute('aria-label') || t.hasAttribute('aria-labelledby');
}
const Cm =
    'article:not([role]), aside:not([role]), main:not([role]), nav:not([role]), section:not([role]), [role=article], [role=complementary], [role=main], [role=navigation], [role=region]',
  Q_ = [
    ['aria-atomic', void 0],
    ['aria-busy', void 0],
    ['aria-controls', void 0],
    ['aria-current', void 0],
    ['aria-describedby', void 0],
    ['aria-details', void 0],
    ['aria-dropeffect', void 0],
    ['aria-flowto', void 0],
    ['aria-grabbed', void 0],
    ['aria-hidden', void 0],
    ['aria-keyshortcuts', void 0],
    [
      'aria-label',
      [
        'caption',
        'code',
        'deletion',
        'emphasis',
        'generic',
        'insertion',
        'paragraph',
        'presentation',
        'strong',
        'subscript',
        'superscript',
      ],
    ],
    [
      'aria-labelledby',
      [
        'caption',
        'code',
        'deletion',
        'emphasis',
        'generic',
        'insertion',
        'paragraph',
        'presentation',
        'strong',
        'subscript',
        'superscript',
      ],
    ],
    ['aria-live', void 0],
    ['aria-owns', void 0],
    ['aria-relevant', void 0],
    ['aria-roledescription', ['generic']],
  ];
function gy(t, e) {
  return Q_.some(([n, s]) => !(s != null && s.includes(e || '')) && t.hasAttribute(n));
}
function yy(t) {
  return !Number.isNaN(Number(String(t.getAttribute('tabindex'))));
}
function G_(t) {
  return !Ay(t) && (X_(t) || yy(t));
}
function X_(t) {
  const e = ct(t);
  return ['BUTTON', 'DETAILS', 'SELECT', 'TEXTAREA'].includes(e)
    ? !0
    : e === 'A' || e === 'AREA'
      ? t.hasAttribute('href')
      : e === 'INPUT'
        ? !t.hidden
        : !1;
}
const Eu = {
    A: t => (t.hasAttribute('href') ? 'link' : null),
    AREA: t => (t.hasAttribute('href') ? 'link' : null),
    ARTICLE: () => 'article',
    ASIDE: () => 'complementary',
    BLOCKQUOTE: () => 'blockquote',
    BUTTON: () => 'button',
    CAPTION: () => 'caption',
    CODE: () => 'code',
    DATALIST: () => 'listbox',
    DD: () => 'definition',
    DEL: () => 'deletion',
    DETAILS: () => 'group',
    DFN: () => 'term',
    DIALOG: () => 'dialog',
    DT: () => 'term',
    EM: () => 'emphasis',
    FIELDSET: () => 'group',
    FIGURE: () => 'figure',
    FOOTER: t => (Ui(t, Cm) ? null : 'contentinfo'),
    FORM: t => (Nm(t) ? 'form' : null),
    H1: () => 'heading',
    H2: () => 'heading',
    H3: () => 'heading',
    H4: () => 'heading',
    H5: () => 'heading',
    H6: () => 'heading',
    HEADER: t => (Ui(t, Cm) ? null : 'banner'),
    HR: () => 'separator',
    HTML: () => 'document',
    IMG: t =>
      t.getAttribute('alt') === '' && !t.getAttribute('title') && !gy(t) && !yy(t)
        ? 'presentation'
        : 'img',
    INPUT: t => {
      const e = t.type.toLowerCase();
      if (e === 'search') return t.hasAttribute('list') ? 'combobox' : 'searchbox';
      if (['email', 'tel', 'text', 'url', ''].includes(e)) {
        const n = Ps(t, t.getAttribute('list'))[0];
        return n && ct(n) === 'DATALIST' ? 'combobox' : 'textbox';
      }
      return e === 'hidden'
        ? null
        : e === 'file' && !_f().inputFileRoleTextbox
          ? 'button'
          : fk[e] || 'textbox';
    },
    INS: () => 'insertion',
    LI: () => 'listitem',
    MAIN: () => 'main',
    MARK: () => 'mark',
    MATH: () => 'math',
    MENU: () => 'list',
    METER: () => 'meter',
    NAV: () => 'navigation',
    OL: () => 'list',
    OPTGROUP: () => 'group',
    OPTION: () => 'option',
    OUTPUT: () => 'status',
    P: () => 'paragraph',
    PROGRESS: () => 'progressbar',
    SECTION: t => (Nm(t) ? 'region' : null),
    SELECT: t => (t.hasAttribute('multiple') || t.size > 1 ? 'listbox' : 'combobox'),
    STRONG: () => 'strong',
    SUB: () => 'subscript',
    SUP: () => 'superscript',
    SVG: () => 'img',
    TABLE: () => 'table',
    TBODY: () => 'rowgroup',
    TD: t => {
      const e = Ui(t, 'table'),
        n = e ? Gl(e) : '';
      return n === 'grid' || n === 'treegrid' ? 'gridcell' : 'cell';
    },
    TEXTAREA: () => 'textbox',
    TFOOT: () => 'rowgroup',
    TH: t => {
      if (t.getAttribute('scope') === 'col') return 'columnheader';
      if (t.getAttribute('scope') === 'row') return 'rowheader';
      const e = Ui(t, 'table'),
        n = e ? Gl(e) : '';
      return n === 'grid' || n === 'treegrid' ? 'gridcell' : 'cell';
    },
    THEAD: () => 'rowgroup',
    TIME: () => 'time',
    TR: () => 'row',
    UL: () => 'list',
  },
  J_ = {
    DD: ['DL', 'DIV'],
    DIV: ['DL'],
    DT: ['DL', 'DIV'],
    LI: ['OL', 'UL'],
    TBODY: ['TABLE'],
    TD: ['TR'],
    TFOOT: ['TABLE'],
    TH: ['TR'],
    THEAD: ['TABLE'],
    TR: ['THEAD', 'TBODY', 'TFOOT', 'TABLE'],
  };
function Am(t) {
  var s;
  const e = ((s = Eu[ct(t)]) == null ? void 0 : s.call(Eu, t)) || '';
  if (!e) return null;
  let n = t;
  for (; n; ) {
    const o = gt(n),
      l = J_[ct(n)];
    if (!l || !o || !l.includes(ct(o))) break;
    const c = Gl(o);
    if ((c === 'none' || c === 'presentation') && !vy(o, c)) return c;
    n = o;
  }
  return e;
}
const Y_ = [
  'alert',
  'alertdialog',
  'application',
  'article',
  'banner',
  'blockquote',
  'button',
  'caption',
  'cell',
  'checkbox',
  'code',
  'columnheader',
  'combobox',
  'complementary',
  'contentinfo',
  'definition',
  'deletion',
  'dialog',
  'directory',
  'document',
  'emphasis',
  'feed',
  'figure',
  'form',
  'generic',
  'grid',
  'gridcell',
  'group',
  'heading',
  'img',
  'insertion',
  'link',
  'list',
  'listbox',
  'listitem',
  'log',
  'main',
  'mark',
  'marquee',
  'math',
  'meter',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'navigation',
  'none',
  'note',
  'option',
  'paragraph',
  'presentation',
  'progressbar',
  'radio',
  'radiogroup',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'scrollbar',
  'search',
  'searchbox',
  'separator',
  'slider',
  'spinbutton',
  'status',
  'strong',
  'subscript',
  'superscript',
  'switch',
  'tab',
  'table',
  'tablist',
  'tabpanel',
  'term',
  'textbox',
  'time',
  'timer',
  'toolbar',
  'tooltip',
  'tree',
  'treegrid',
  'treeitem',
];
function Gl(t) {
  return (
    (t.getAttribute('role') || '')
      .split(' ')
      .map(n => n.trim())
      .find(n => Y_.includes(n)) || null
  );
}
function vy(t, e) {
  return gy(t, e) || G_(t);
}
function et(t) {
  const e = Gl(t);
  if (!e) return Am(t);
  if (e === 'none' || e === 'presentation') {
    const n = Am(t);
    if (vy(t, n)) return n;
  }
  return e;
}
function wy(t) {
  return t === null ? void 0 : t.toLowerCase() === 'true';
}
function xy(t) {
  return ['STYLE', 'SCRIPT', 'NOSCRIPT', 'TEMPLATE'].includes(ct(t));
}
function Wt(t) {
  if (xy(t)) return !0;
  const e = Pr(t),
    n = t.nodeName === 'SLOT';
  if ((e == null ? void 0 : e.display) === 'contents' && !n) {
    for (let o = t.firstChild; o; o = o.nextSibling)
      if ((o.nodeType === 1 && !Wt(o)) || (o.nodeType === 3 && my(o))) return !1;
    return !0;
  }
  return !(t.nodeName === 'OPTION' && !!t.closest('select')) && !n && !py(t, e) ? !0 : Sy(t);
}
function Sy(t) {
  let e = sr == null ? void 0 : sr.get(t);
  if (e === void 0) {
    if (
      ((e = !1), t.parentElement && t.parentElement.shadowRoot && !t.assignedSlot && (e = !0), !e)
    ) {
      const n = Pr(t);
      e = !n || n.display === 'none' || wy(t.getAttribute('aria-hidden')) === !0;
    }
    if (!e) {
      const n = gt(t);
      n && (e = Sy(n));
    }
    sr == null || sr.set(t, e);
  }
  return e;
}
function Ps(t, e) {
  if (!e) return [];
  const n = dy(t);
  if (!n) return [];
  try {
    const s = e.split(' ').filter(l => !!l),
      o = [];
    for (const l of s) {
      const c = n.querySelector('#' + CSS.escape(l));
      c && !o.includes(c) && o.push(c);
    }
    return o;
  } catch {
    return [];
  }
}
function Ln(t) {
  return t.trim();
}
function Wi(t) {
  return t
    .split(' ')
    .map(e =>
      e
        .replace(
          /\r\n/g,
          `
`
        )
        .replace(/[\u200b\u00ad]/g, '')
        .replace(/\s\s*/g, ' ')
    )
    .join(' ')
    .trim();
}
function Lm(t, e) {
  const n = [...t.querySelectorAll(e)];
  for (const s of Ps(t, t.getAttribute('aria-owns')))
    s.matches(e) && n.push(s), n.push(...s.querySelectorAll(e));
  return n;
}
function Xl(t, e) {
  const n = e === '::before' ? Of : Mf;
  if (n != null && n.has(t)) return (n == null ? void 0 : n.get(t)) || '';
  const s = Pr(t, e),
    o = Z_(t, s);
  return n && n.set(t, o), o;
}
function Z_(t, e) {
  if (!e || e.display === 'none' || e.visibility === 'hidden') return '';
  const n = e.content;
  let s;
  if ((n[0] === "'" && n[n.length - 1] === "'") || (n[0] === '"' && n[n.length - 1] === '"'))
    s = n.substring(1, n.length - 1);
  else if (n.startsWith('attr(') && n.endsWith(')')) {
    const o = n.substring(5, n.length - 1).trim();
    s = t.getAttribute(o) || '';
  }
  return s !== void 0 ? ((e.display || 'inline') !== 'inline' ? ' ' + s + ' ' : s) : '';
}
function _y(t) {
  const e = t.getAttribute('aria-labelledby');
  if (e === null) return null;
  const n = Ps(t, e);
  return n.length ? n : null;
}
function ek(t, e) {
  const n = [
      'button',
      'cell',
      'checkbox',
      'columnheader',
      'gridcell',
      'heading',
      'link',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio',
      'option',
      'radio',
      'row',
      'rowheader',
      'switch',
      'tab',
      'tooltip',
      'treeitem',
    ].includes(t),
    s =
      e &&
      [
        '',
        'caption',
        'code',
        'contentinfo',
        'definition',
        'deletion',
        'emphasis',
        'insertion',
        'list',
        'listitem',
        'mark',
        'none',
        'paragraph',
        'presentation',
        'region',
        'row',
        'rowgroup',
        'section',
        'strong',
        'subscript',
        'superscript',
        'table',
        'term',
        'time',
      ].includes(t);
  return n || s;
}
function Xi(t, e) {
  const n = e ? Lf : Af;
  let s = n == null ? void 0 : n.get(t);
  return (
    s === void 0 &&
      ((s = ''),
      [
        'caption',
        'code',
        'definition',
        'deletion',
        'emphasis',
        'generic',
        'insertion',
        'mark',
        'paragraph',
        'presentation',
        'strong',
        'subscript',
        'suggestion',
        'superscript',
        'term',
        'time',
      ].includes(et(t) || '') ||
        (s = Wi(
          ln(t, { includeHidden: e, visitedElements: new ke(), embeddedInTargetElement: 'self' })
        )),
      n == null || n.set(t, s)),
    s
  );
}
function jm(t, e) {
  const n = e ? If : jf;
  let s = n == null ? void 0 : n.get(t);
  if (s === void 0) {
    if (((s = ''), t.hasAttribute('aria-describedby'))) {
      const o = Ps(t, t.getAttribute('aria-describedby'));
      s = Wi(
        o
          .map(l =>
            ln(l, {
              includeHidden: e,
              visitedElements: new ke(),
              embeddedInDescribedBy: { element: l, hidden: Wt(l) },
            })
          )
          .join(' ')
      );
    } else
      t.hasAttribute('aria-description')
        ? (s = Wi(t.getAttribute('aria-description') || ''))
        : (s = Wi(t.getAttribute('title') || ''));
    n == null || n.set(t, s);
  }
  return s;
}
const tk = [
  'application',
  'checkbox',
  'combobox',
  'gridcell',
  'listbox',
  'radiogroup',
  'slider',
  'spinbutton',
  'textbox',
  'tree',
  'columnheader',
  'rowheader',
  'searchbox',
  'switch',
  'treegrid',
];
function nk(t) {
  const e = et(t) || '';
  if (!e || !tk.includes(e)) return 'false';
  const n = t.getAttribute('aria-invalid');
  return !n || n.trim() === '' || n.toLocaleLowerCase() === 'false'
    ? 'false'
    : n === 'true' || n === 'grammar' || n === 'spelling'
      ? n
      : 'true';
}
function rk(t) {
  if ('validity' in t) {
    const e = t.validity;
    return (e == null ? void 0 : e.valid) === !1;
  }
  return !1;
}
function sk(t) {
  const e = xs;
  let n = xs == null ? void 0 : xs.get(t);
  if (n === void 0) {
    n = '';
    const s = nk(t) !== 'false',
      o = rk(t);
    if (s || o) {
      const l = t.getAttribute('aria-errormessage');
      n = Ps(t, l)
        .map(d =>
          Wi(
            ln(d, {
              visitedElements: new ke(),
              embeddedInDescribedBy: { element: d, hidden: Wt(d) },
            })
          )
        )
        .join(' ')
        .trim();
    }
    e == null || e.set(t, n);
  }
  return n;
}
function ln(t, e) {
  var d, h, y, v;
  if (e.visitedElements.has(t)) return '';
  const n = {
    ...e,
    embeddedInTargetElement:
      e.embeddedInTargetElement === 'self' ? 'descendant' : e.embeddedInTargetElement,
  };
  if (!e.includeHidden) {
    const m =
      !!((d = e.embeddedInLabelledBy) != null && d.hidden) ||
      !!((h = e.embeddedInDescribedBy) != null && h.hidden) ||
      !!((y = e.embeddedInNativeTextAlternative) != null && y.hidden) ||
      !!((v = e.embeddedInLabel) != null && v.hidden);
    if (xy(t) || (!m && Wt(t))) return e.visitedElements.add(t), '';
  }
  const s = _y(t);
  if (!e.embeddedInLabelledBy) {
    const m = (s || [])
      .map(w =>
        ln(w, {
          ...e,
          embeddedInLabelledBy: { element: w, hidden: Wt(w) },
          embeddedInDescribedBy: void 0,
          embeddedInTargetElement: void 0,
          embeddedInLabel: void 0,
          embeddedInNativeTextAlternative: void 0,
        })
      )
      .join(' ');
    if (m) return m;
  }
  const o = et(t) || '',
    l = ct(t);
  if (e.embeddedInLabel || e.embeddedInLabelledBy || e.embeddedInTargetElement === 'descendant') {
    const m = [...(t.labels || [])].includes(t),
      w = (s || []).includes(t);
    if (!m && !w) {
      if (o === 'textbox')
        return (
          e.visitedElements.add(t),
          l === 'INPUT' || l === 'TEXTAREA' ? t.value : t.textContent || ''
        );
      if (['combobox', 'listbox'].includes(o)) {
        e.visitedElements.add(t);
        let S;
        if (l === 'SELECT')
          (S = [...t.selectedOptions]), !S.length && t.options.length && S.push(t.options[0]);
        else {
          const _ = o === 'combobox' ? Lm(t, '*').find(b => et(b) === 'listbox') : t;
          S = _ ? Lm(_, '[aria-selected="true"]').filter(b => et(b) === 'option') : [];
        }
        return !S.length && l === 'INPUT' ? t.value : S.map(_ => ln(_, n)).join(' ');
      }
      if (['progressbar', 'scrollbar', 'slider', 'spinbutton', 'meter'].includes(o))
        return (
          e.visitedElements.add(t),
          t.hasAttribute('aria-valuetext')
            ? t.getAttribute('aria-valuetext') || ''
            : t.hasAttribute('aria-valuenow')
              ? t.getAttribute('aria-valuenow') || ''
              : t.getAttribute('value') || ''
        );
      if (['menu'].includes(o)) return e.visitedElements.add(t), '';
    }
  }
  const c = t.getAttribute('aria-label') || '';
  if (Ln(c)) return e.visitedElements.add(t), c;
  if (!['presentation', 'none'].includes(o)) {
    if (l === 'INPUT' && ['button', 'submit', 'reset'].includes(t.type)) {
      e.visitedElements.add(t);
      const m = t.value || '';
      return Ln(m)
        ? m
        : t.type === 'submit'
          ? 'Submit'
          : t.type === 'reset'
            ? 'Reset'
            : t.getAttribute('title') || '';
    }
    if (!_f().inputFileRoleTextbox && l === 'INPUT' && t.type === 'file') {
      e.visitedElements.add(t);
      const m = t.labels || [];
      return m.length && !e.embeddedInLabelledBy ? Pi(m, e) : 'Choose File';
    }
    if (l === 'INPUT' && t.type === 'image') {
      e.visitedElements.add(t);
      const m = t.labels || [];
      if (m.length && !e.embeddedInLabelledBy) return Pi(m, e);
      const w = t.getAttribute('alt') || '';
      if (Ln(w)) return w;
      const S = t.getAttribute('title') || '';
      return Ln(S) ? S : 'Submit';
    }
    if (!s && l === 'BUTTON') {
      e.visitedElements.add(t);
      const m = t.labels || [];
      if (m.length) return Pi(m, e);
    }
    if (!s && l === 'OUTPUT') {
      e.visitedElements.add(t);
      const m = t.labels || [];
      return m.length ? Pi(m, e) : t.getAttribute('title') || '';
    }
    if (!s && (l === 'TEXTAREA' || l === 'SELECT' || l === 'INPUT')) {
      e.visitedElements.add(t);
      const m = t.labels || [];
      if (m.length) return Pi(m, e);
      const w =
          (l === 'INPUT' &&
            ['text', 'password', 'search', 'tel', 'email', 'url'].includes(t.type)) ||
          l === 'TEXTAREA',
        S = t.getAttribute('placeholder') || '',
        _ = t.getAttribute('title') || '';
      return !w || _ ? _ : S;
    }
    if (!s && l === 'FIELDSET') {
      e.visitedElements.add(t);
      for (let w = t.firstElementChild; w; w = w.nextElementSibling)
        if (ct(w) === 'LEGEND')
          return ln(w, { ...n, embeddedInNativeTextAlternative: { element: w, hidden: Wt(w) } });
      return t.getAttribute('title') || '';
    }
    if (!s && l === 'FIGURE') {
      e.visitedElements.add(t);
      for (let w = t.firstElementChild; w; w = w.nextElementSibling)
        if (ct(w) === 'FIGCAPTION')
          return ln(w, { ...n, embeddedInNativeTextAlternative: { element: w, hidden: Wt(w) } });
      return t.getAttribute('title') || '';
    }
    if (l === 'IMG') {
      e.visitedElements.add(t);
      const m = t.getAttribute('alt') || '';
      return Ln(m) ? m : t.getAttribute('title') || '';
    }
    if (l === 'TABLE') {
      e.visitedElements.add(t);
      for (let w = t.firstElementChild; w; w = w.nextElementSibling)
        if (ct(w) === 'CAPTION')
          return ln(w, { ...n, embeddedInNativeTextAlternative: { element: w, hidden: Wt(w) } });
      const m = t.getAttribute('summary') || '';
      if (m) return m;
    }
    if (l === 'AREA') {
      e.visitedElements.add(t);
      const m = t.getAttribute('alt') || '';
      return Ln(m) ? m : t.getAttribute('title') || '';
    }
    if (l === 'SVG' || t.ownerSVGElement) {
      e.visitedElements.add(t);
      for (let m = t.firstElementChild; m; m = m.nextElementSibling)
        if (ct(m) === 'TITLE' && m.ownerSVGElement)
          return ln(m, { ...n, embeddedInLabelledBy: { element: m, hidden: Wt(m) } });
    }
    if (t.ownerSVGElement && l === 'A') {
      const m = t.getAttribute('xlink:title') || '';
      if (Ln(m)) return e.visitedElements.add(t), m;
    }
  }
  const u = l === 'SUMMARY' && !['presentation', 'none'].includes(o);
  if (
    ek(o, e.embeddedInTargetElement === 'descendant') ||
    u ||
    e.embeddedInLabelledBy ||
    e.embeddedInDescribedBy ||
    e.embeddedInLabel ||
    e.embeddedInNativeTextAlternative
  ) {
    e.visitedElements.add(t);
    const m = ik(t, n);
    if (e.embeddedInTargetElement === 'self' ? Ln(m) : m) return m;
  }
  if (!['presentation', 'none'].includes(o) || l === 'IFRAME') {
    e.visitedElements.add(t);
    const m = t.getAttribute('title') || '';
    if (Ln(m)) return m;
  }
  return e.visitedElements.add(t), '';
}
function ik(t, e) {
  const n = [],
    s = (l, c) => {
      var u;
      if (!(c && l.assignedSlot))
        if (l.nodeType === 1) {
          const d = ((u = Pr(l)) == null ? void 0 : u.display) || 'inline';
          let h = ln(l, e);
          (d !== 'inline' || l.nodeName === 'BR') && (h = ' ' + h + ' '), n.push(h);
        } else l.nodeType === 3 && n.push(l.textContent || '');
    };
  n.push(Xl(t, '::before'));
  const o = t.nodeName === 'SLOT' ? t.assignedNodes() : [];
  if (o.length) for (const l of o) s(l, !1);
  else {
    for (let l = t.firstChild; l; l = l.nextSibling) s(l, !0);
    if (t.shadowRoot) for (let l = t.shadowRoot.firstChild; l; l = l.nextSibling) s(l, !0);
    for (const l of Ps(t, t.getAttribute('aria-owns'))) s(l, !0);
  }
  return n.push(Xl(t, '::after')), n.join('');
}
const kf = ['gridcell', 'option', 'row', 'tab', 'rowheader', 'columnheader', 'treeitem'];
function ky(t) {
  return ct(t) === 'OPTION'
    ? t.selected
    : kf.includes(et(t) || '')
      ? wy(t.getAttribute('aria-selected')) === !0
      : !1;
}
const bf = [
  'checkbox',
  'menuitemcheckbox',
  'option',
  'radio',
  'switch',
  'menuitemradio',
  'treeitem',
];
function by(t) {
  const e = Ef(t, !0);
  return e === 'error' ? !1 : e;
}
function ok(t) {
  return Ef(t, !0);
}
function lk(t) {
  return Ef(t, !1);
}
function Ef(t, e) {
  const n = ct(t);
  if (e && n === 'INPUT' && t.indeterminate) return 'mixed';
  if (n === 'INPUT' && ['checkbox', 'radio'].includes(t.type)) return t.checked;
  if (bf.includes(et(t) || '')) {
    const s = t.getAttribute('aria-checked');
    return s === 'true' ? !0 : e && s === 'mixed' ? 'mixed' : !1;
  }
  return 'error';
}
const ak = [
  'checkbox',
  'combobox',
  'grid',
  'gridcell',
  'listbox',
  'radiogroup',
  'slider',
  'spinbutton',
  'textbox',
  'columnheader',
  'rowheader',
  'searchbox',
  'switch',
  'treegrid',
];
function ck(t) {
  const e = ct(t);
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(e)
    ? t.hasAttribute('readonly')
    : ak.includes(et(t) || '')
      ? t.getAttribute('aria-readonly') === 'true'
      : t.isContentEditable
        ? !1
        : 'error';
}
const Tf = ['button'];
function Ey(t) {
  if (Tf.includes(et(t) || '')) {
    const e = t.getAttribute('aria-pressed');
    if (e === 'true') return !0;
    if (e === 'mixed') return 'mixed';
  }
  return !1;
}
const Nf = [
  'application',
  'button',
  'checkbox',
  'combobox',
  'gridcell',
  'link',
  'listbox',
  'menuitem',
  'row',
  'rowheader',
  'tab',
  'treeitem',
  'columnheader',
  'menuitemcheckbox',
  'menuitemradio',
  'rowheader',
  'switch',
];
function Ty(t) {
  if (ct(t) === 'DETAILS') return t.open;
  if (Nf.includes(et(t) || '')) {
    const e = t.getAttribute('aria-expanded');
    return e === null ? void 0 : e === 'true';
  }
}
const Cf = ['heading', 'listitem', 'row', 'treeitem'];
function Ny(t) {
  const e = { H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6 }[ct(t)];
  if (e) return e;
  if (Cf.includes(et(t) || '')) {
    const n = t.getAttribute('aria-level'),
      s = n === null ? Number.NaN : Number(n);
    if (Number.isInteger(s) && s >= 1) return s;
  }
  return 0;
}
const Cy = [
  'application',
  'button',
  'composite',
  'gridcell',
  'group',
  'input',
  'link',
  'menuitem',
  'scrollbar',
  'separator',
  'tab',
  'checkbox',
  'columnheader',
  'combobox',
  'grid',
  'listbox',
  'menu',
  'menubar',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'radio',
  'radiogroup',
  'row',
  'rowheader',
  'searchbox',
  'select',
  'slider',
  'spinbutton',
  'switch',
  'tablist',
  'textbox',
  'toolbar',
  'tree',
  'treegrid',
  'treeitem',
];
function Jl(t) {
  return Ay(t) || Ly(t);
}
function Ay(t) {
  return (
    ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'OPTION', 'OPTGROUP'].includes(t.tagName) &&
    (t.hasAttribute('disabled') || uk(t))
  );
}
function uk(t) {
  const e = t == null ? void 0 : t.closest('FIELDSET[DISABLED]');
  if (!e) return !1;
  const n = e.querySelector(':scope > LEGEND');
  return !n || !n.contains(t);
}
function Ly(t, e = !1) {
  if (!t) return !1;
  if (e || Cy.includes(et(t) || '')) {
    const n = (t.getAttribute('aria-disabled') || '').toLowerCase();
    return n === 'true' ? !0 : n === 'false' ? !1 : Ly(gt(t), !0);
  }
  return !1;
}
function Pi(t, e) {
  return [...t]
    .map(n =>
      ln(n, {
        ...e,
        embeddedInLabel: { element: n, hidden: Wt(n) },
        embeddedInNativeTextAlternative: void 0,
        embeddedInLabelledBy: void 0,
        embeddedInDescribedBy: void 0,
        embeddedInTargetElement: void 0,
      })
    )
    .filter(n => !!n)
    .join(' ');
}
let Af,
  Lf,
  jf,
  If,
  xs,
  sr,
  Of,
  Mf,
  jy = 0;
function $f() {
  ++jy,
    Af ?? (Af = new be()),
    Lf ?? (Lf = new be()),
    jf ?? (jf = new be()),
    If ?? (If = new be()),
    xs ?? (xs = new be()),
    sr ?? (sr = new be()),
    Of ?? (Of = new be()),
    Mf ?? (Mf = new be());
}
function Pf() {
  --jy ||
    ((Af = void 0),
    (Lf = void 0),
    (jf = void 0),
    (If = void 0),
    (xs = void 0),
    (sr = void 0),
    (Of = void 0),
    (Mf = void 0));
}
const fk = {
  button: 'button',
  checkbox: 'checkbox',
  image: 'button',
  number: 'spinbutton',
  radio: 'radio',
  range: 'slider',
  reset: 'button',
  submit: 'button',
};
function dk(t) {
  return Iy(t) ? "'" + t.replace(/'/g, "''") + "'" : t;
}
function Tu(t) {
  return Iy(t)
    ? '"' +
        t.replace(/[\\"\x00-\x1f\x7f-\x9f]/g, e => {
          switch (e) {
            case '\\':
              return '\\\\';
            case '"':
              return '\\"';
            case '\b':
              return '\\b';
            case '\f':
              return '\\f';
            case `
`:
              return '\\n';
            case '\r':
              return '\\r';
            case '	':
              return '\\t';
            default:
              return '\\x' + e.charCodeAt(0).toString(16).padStart(2, '0');
          }
        }) +
        '"'
    : t;
}
function Iy(t) {
  return !!(
    t.length === 0 ||
    /^\s|\s$/.test(t) ||
    /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]/.test(t) ||
    /^-/.test(t) ||
    /[\n:](\s|$)/.test(t) ||
    /\s#/.test(t) ||
    /[\n\r]/.test(t) ||
    /^[&*\],?!>|@"'#%]/.test(t) ||
    /[{}`]/.test(t) ||
    /^\[/.test(t) ||
    !isNaN(Number(t)) ||
    ['y', 'n', 'yes', 'no', 'true', 'false', 'on', 'off', 'null'].includes(t.toLowerCase())
  );
}
function Rf(t, e) {
  const n = new ke(),
    s = {
      root: { role: 'fragment', name: '', children: [], element: t, props: {} },
      elements: new be(),
      generation: e,
      ids: new be(),
    },
    o = u => {
      const d = s.elements.size + 1;
      s.elements.set(d, u), s.ids.set(u, d);
    };
  o(t);
  const l = (u, d) => {
    if (n.has(d)) return;
    if ((n.add(d), d.nodeType === Node.TEXT_NODE && d.nodeValue)) {
      const m = d.nodeValue;
      u.role !== 'textbox' && m && u.children.push(d.nodeValue || '');
      return;
    }
    if (d.nodeType !== Node.ELEMENT_NODE) return;
    const h = d;
    if (Wt(h)) return;
    const y = [];
    if (h.hasAttribute('aria-owns')) {
      const m = h.getAttribute('aria-owns').split(/\s+/);
      for (const w of m) {
        const S = t.ownerDocument.getElementById(w);
        S && y.push(S);
      }
    }
    o(h);
    const v = hk(h);
    v && u.children.push(v), c(v || u, h, y);
  };
  function c(u, d, h = []) {
    var w;
    const v =
      (((w = Pr(d)) == null ? void 0 : w.display) || 'inline') !== 'inline' || d.nodeName === 'BR'
        ? ' '
        : '';
    v && u.children.push(v), u.children.push(Xl(d, '::before'));
    const m = d.nodeName === 'SLOT' ? d.assignedNodes() : [];
    if (m.length) for (const S of m) l(u, S);
    else {
      for (let S = d.firstChild; S; S = S.nextSibling) S.assignedSlot || l(u, S);
      if (d.shadowRoot) for (let S = d.shadowRoot.firstChild; S; S = S.nextSibling) l(u, S);
    }
    for (const S of h) l(u, S);
    if (
      (u.children.push(Xl(d, '::after')),
      v && u.children.push(v),
      u.children.length === 1 && u.name === u.children[0] && (u.children = []),
      u.role === 'link' && d.hasAttribute('href'))
    ) {
      const S = d.getAttribute('href');
      u.props.url = S;
    }
  }
  $f();
  try {
    l(s.root, t);
  } finally {
    Pf();
  }
  return pk(s.root), s;
}
function hk(t) {
  if (t.nodeName === 'IFRAME')
    return { role: 'iframe', name: '', children: [], props: {}, element: t };
  const e = et(t);
  if (!e || e === 'presentation' || e === 'none') return null;
  const n = vt(Xi(t, !1) || ''),
    s = { role: e, name: n, children: [], props: {}, element: t };
  return (
    bf.includes(e) && (s.checked = by(t)),
    Cy.includes(e) && (s.disabled = Jl(t)),
    Nf.includes(e) && (s.expanded = Ty(t)),
    Cf.includes(e) && (s.level = Ny(t)),
    Tf.includes(e) && (s.pressed = Ey(t)),
    kf.includes(e) && (s.selected = ky(t)),
    (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) &&
      t.type !== 'checkbox' &&
      t.type !== 'radio' &&
      (t.type !== 'file' || _f().inputFileRoleTextbox) &&
      (s.children = [t.value]),
    s
  );
}
function pk(t) {
  const e = (s, o) => {
      if (!s.length) return;
      const l = vt(s.join(''));
      l && o.push(l), (s.length = 0);
    },
    n = s => {
      const o = [],
        l = [];
      for (const c of s.children || [])
        typeof c == 'string' ? l.push(c) : (e(l, o), n(c), o.push(c));
      e(l, o),
        (s.children = o.length ? o : []),
        s.children.length === 1 && s.children[0] === s.name && (s.children = []);
    };
  n(t);
}
function Df(t, e) {
  return e ? (t ? (typeof e == 'string' ? t === e : !!t.match(new RegExp(e.pattern))) : !1) : !0;
}
function mk(t, e) {
  return Df(t, e.text);
}
function gk(t, e) {
  return Df(t, e.name);
}
function yk(t, e) {
  const n = Rf(t, 0);
  return {
    matches: Oy(n.root, e, !1, !1),
    received: { raw: ef(n, { mode: 'raw' }), regex: ef(n, { mode: 'regex' }) },
  };
}
function vk(t, e) {
  const n = Rf(t, 0).root;
  return Oy(n, e, !0, !1).map(o => o.element);
}
function Ff(t, e, n) {
  var s;
  return typeof t == 'string' && e.kind === 'text'
    ? mk(t, e)
    : t === null ||
        typeof t != 'object' ||
        e.kind !== 'role' ||
        (e.role !== 'fragment' && e.role !== t.role) ||
        (e.checked !== void 0 && e.checked !== t.checked) ||
        (e.disabled !== void 0 && e.disabled !== t.disabled) ||
        (e.expanded !== void 0 && e.expanded !== t.expanded) ||
        (e.level !== void 0 && e.level !== t.level) ||
        (e.pressed !== void 0 && e.pressed !== t.pressed) ||
        (e.selected !== void 0 && e.selected !== t.selected) ||
        !gk(t.name, e) ||
        !Df(t.props.url, (s = e.props) == null ? void 0 : s.url)
      ? !1
      : e.containerMode === 'contain'
        ? Om(t.children || [], e.children || [])
        : e.containerMode === 'equal'
          ? Im(t.children || [], e.children || [], !1)
          : e.containerMode === 'deep-equal' || n
            ? Im(t.children || [], e.children || [], !0)
            : Om(t.children || [], e.children || []);
}
function Im(t, e, n) {
  if (e.length !== t.length) return !1;
  for (let s = 0; s < e.length; ++s) if (!Ff(t[s], e[s], n)) return !1;
  return !0;
}
function Om(t, e) {
  if (e.length > t.length) return !1;
  const n = t.slice(),
    s = e.slice();
  for (const o of s) {
    let l = n.shift();
    for (; l && !Ff(l, o, !1); ) l = n.shift();
    if (!l) return !1;
  }
  return !0;
}
function Oy(t, e, n, s) {
  const o = [],
    l = (c, u) => {
      if (Ff(c, e, s)) {
        const d = typeof c == 'string' ? u : c;
        return d && o.push(d), !n;
      }
      if (typeof c == 'string') return !1;
      for (const d of c.children || []) if (l(d, c)) return !0;
      return !1;
    };
  return l(t, null), o;
}
function ef(t, e) {
  const n = [],
    s = (e == null ? void 0 : e.mode) === 'regex' ? xk : () => !0,
    o = (e == null ? void 0 : e.mode) === 'regex' ? wk : u => u,
    l = (u, d, h) => {
      if (typeof u == 'string') {
        if (d && !s(d, u)) return;
        const w = Tu(o(u));
        w && n.push(h + '- text: ' + w);
        return;
      }
      let y = u.role;
      if (u.name && u.name.length <= 900) {
        const w = o(u.name);
        if (w) {
          const S = w.startsWith('/') && w.endsWith('/') ? w : JSON.stringify(w);
          y += ' ' + S;
        }
      }
      if (
        (u.checked === 'mixed' && (y += ' [checked=mixed]'),
        u.checked === !0 && (y += ' [checked]'),
        u.disabled && (y += ' [disabled]'),
        u.expanded && (y += ' [expanded]'),
        u.level && (y += ` [level=${u.level}]`),
        u.pressed === 'mixed' && (y += ' [pressed=mixed]'),
        u.pressed === !0 && (y += ' [pressed]'),
        u.selected === !0 && (y += ' [selected]'),
        e != null && e.ref)
      ) {
        const w = t.ids.get(u.element);
        w && (y += ` [ref=s${t.generation}e${w}]`);
      }
      const v = h + '- ' + dk(y),
        m = !!Object.keys(u.props).length;
      if (!u.children.length && !m) n.push(v);
      else if (u.children.length === 1 && typeof u.children[0] == 'string' && !m) {
        const w = s(u, u.children[0]) ? o(u.children[0]) : null;
        w ? n.push(v + ': ' + Tu(w)) : n.push(v);
      } else {
        n.push(v + ':');
        for (const [w, S] of Object.entries(u.props)) n.push(h + '  - /' + w + ': ' + Tu(S));
        for (const w of u.children || []) l(w, u, h + '  ');
      }
    },
    c = t.root;
  if (c.role === 'fragment') for (const u of c.children || []) l(u, c, '');
  else l(c, null, '');
  return n.join(`
`);
}
function wk(t) {
  const e = [
    { regex: /\b[\d,.]+[bkmBKM]+\b/, replacement: '[\\d,.]+[bkmBKM]+' },
    { regex: /\b\d+[hmsp]+\b/, replacement: '\\d+[hmsp]+' },
    { regex: /\b[\d,.]+[hmsp]+\b/, replacement: '[\\d,.]+[hmsp]+' },
    { regex: /\b\d+,\d+\b/, replacement: '\\d+,\\d+' },
    { regex: /\b\d+\.\d{2,}\b/, replacement: '\\d+\\.\\d+' },
    { regex: /\b\d{2,}\.\d+\b/, replacement: '\\d+\\.\\d+' },
    { regex: /\b\d{2,}\b/, replacement: '\\d+' },
  ];
  let n = '',
    s = 0;
  const o = new RegExp(e.map(l => '(' + l.regex.source + ')').join('|'), 'g');
  return (
    t.replace(o, (l, ...c) => {
      const u = c[c.length - 2],
        d = c.slice(0, -2);
      n += Wl(t.slice(s, u));
      for (let h = 0; h < d.length; h++)
        if (d[h]) {
          const { replacement: y } = e[h];
          n += y;
          break;
        }
      return (s = u + l.length), l;
    }),
    n ? ((n += Wl(t.slice(s))), String(new RegExp(n))) : t
  );
}
function xk(t, e) {
  if (!e.length) return !1;
  if (!t.name) return !0;
  if (t.name.length > e.length) return !1;
  const n = e.length <= 200 && t.name.length <= 200 ? t1(e, t.name) : '';
  let s = e;
  for (; n && s.includes(n); ) s = s.replace(n, '');
  return s.trim().length / e.length > 0.1;
}
const Mm =
  ':host{font-size:13px;font-family:system-ui,Ubuntu,Droid Sans,sans-serif;color:#333}svg{position:absolute;height:0}x-pw-tooltip{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background-color:#fff;border-radius:6px;box-shadow:0 .5rem 1.2rem #0000004d;display:none;font-size:12.8px;font-weight:400;left:0;line-height:1.5;max-width:600px;position:absolute;top:0;padding:0;flex-direction:column;overflow:hidden}x-pw-tooltip-line{display:flex;max-width:600px;padding:6px;-webkit-user-select:none;user-select:none;cursor:pointer}x-pw-tooltip-line.selectable:hover{background-color:#f2f2f2;overflow:hidden}x-pw-tooltip-footer{display:flex;max-width:600px;padding:6px;-webkit-user-select:none;user-select:none;color:#777}x-pw-dialog{background-color:#fff;pointer-events:auto;border-radius:6px;box-shadow:0 .5rem 1.2rem #0000004d;display:flex;flex-direction:column;position:absolute;width:400px;height:150px;z-index:10;font-size:13px}x-pw-dialog-body{display:flex;flex-direction:column;flex:auto}x-pw-dialog-body label{margin:5px 8px;display:flex;flex-direction:row;align-items:center}x-pw-highlight{position:absolute;top:0;left:0;width:0;height:0}x-pw-action-point{position:absolute;width:20px;height:20px;background:red;border-radius:10px;margin:-10px 0 0 -10px;z-index:2}x-pw-separator{height:1px;margin:6px 9px;background:#949494e5}x-pw-tool-gripper{height:28px;width:24px;margin:2px 0;cursor:grab}x-pw-tool-gripper:active{cursor:grabbing}x-pw-tool-gripper>x-div{width:16px;height:16px;margin:6px 4px;clip-path:url(#icon-gripper);background-color:#555}x-pw-tools-list>label{display:flex;align-items:center;margin:0 10px;-webkit-user-select:none;user-select:none}x-pw-tools-list{display:flex;width:100%;border-bottom:1px solid #dddddd}x-pw-tool-item{pointer-events:auto;height:28px;width:28px;border-radius:3px}x-pw-tool-item:not(.disabled){cursor:pointer}x-pw-tool-item:not(.disabled):hover{background-color:#dbdbdb}x-pw-tool-item.toggled{background-color:#8acae480}x-pw-tool-item.toggled:not(.disabled):hover{background-color:#8acae4c4}x-pw-tool-item>x-div{width:16px;height:16px;margin:6px;background-color:#3a3a3a}x-pw-tool-item.disabled>x-div{background-color:#61616180;cursor:default}x-pw-tool-item.record.toggled{background-color:transparent}x-pw-tool-item.record.toggled:not(.disabled):hover{background-color:#dbdbdb}x-pw-tool-item.record.toggled>x-div{background-color:#a1260d}x-pw-tool-item.record.disabled.toggled>x-div{opacity:.8}x-pw-tool-item.accept>x-div{background-color:#388a34}x-pw-tool-item.record>x-div{clip-path:url(#icon-circle-large-filled)}x-pw-tool-item.pick-locator>x-div{clip-path:url(#icon-inspect)}x-pw-tool-item.text>x-div{clip-path:url(#icon-whole-word)}x-pw-tool-item.visibility>x-div{clip-path:url(#icon-eye)}x-pw-tool-item.value>x-div{clip-path:url(#icon-symbol-constant)}x-pw-tool-item.snapshot>x-div{clip-path:url(#icon-gist)}x-pw-tool-item.accept>x-div{clip-path:url(#icon-check)}x-pw-tool-item.cancel>x-div{clip-path:url(#icon-close)}x-pw-tool-item.succeeded>x-div{clip-path:url(#icon-pass);background-color:#388a34!important}x-pw-overlay{position:absolute;top:0;max-width:min-content;z-index:2147483647;background:transparent;pointer-events:auto}x-pw-overlay x-pw-tools-list{background-color:#fffd;box-shadow:#0000001a 0 5px 5px;border-radius:3px;border-bottom:none}x-pw-overlay x-pw-tool-item{margin:2px}textarea.text-editor{font-family:system-ui,Ubuntu,Droid Sans,sans-serif;flex:auto;border:none;margin:6px 10px;color:#333;outline:1px solid transparent!important;resize:none;padding:0;font-size:13px}textarea.text-editor.does-not-match{outline:1px solid red!important}x-div{display:block}x-spacer{flex:auto}*{box-sizing:border-box}*[hidden]{display:none!important}x-locator-editor{flex:none;width:100%;height:60px;padding:4px;border-bottom:1px solid #dddddd;outline:1px solid transparent}x-locator-editor.does-not-match{outline:1px solid red}.CodeMirror{width:100%!important;height:100%!important}';
class Nu {
  constructor(e) {
    (this._renderedEntries = []), (this._language = 'javascript'), (this._injectedScript = e);
    const n = e.document;
    (this._isUnderTest = e.isUnderTest),
      (this._glassPaneElement = n.createElement('x-pw-glass')),
      (this._glassPaneElement.style.position = 'fixed'),
      (this._glassPaneElement.style.top = '0'),
      (this._glassPaneElement.style.right = '0'),
      (this._glassPaneElement.style.bottom = '0'),
      (this._glassPaneElement.style.left = '0'),
      (this._glassPaneElement.style.zIndex = '2147483646'),
      (this._glassPaneElement.style.pointerEvents = 'none'),
      (this._glassPaneElement.style.display = 'flex'),
      (this._glassPaneElement.style.backgroundColor = 'transparent');
    for (const s of [
      'click',
      'auxclick',
      'dragstart',
      'input',
      'keydown',
      'keyup',
      'pointerdown',
      'pointerup',
      'mousedown',
      'mouseup',
      'mouseleave',
      'focus',
      'scroll',
    ])
      this._glassPaneElement.addEventListener(s, o => {
        o.stopPropagation(), o.stopImmediatePropagation();
      });
    if (
      ((this._actionPointElement = n.createElement('x-pw-action-point')),
      this._actionPointElement.setAttribute('hidden', 'true'),
      (this._glassPaneShadow = this._glassPaneElement.attachShadow({
        mode: this._isUnderTest ? 'open' : 'closed',
      })),
      typeof this._glassPaneShadow.adoptedStyleSheets.push == 'function')
    ) {
      const s = new this._injectedScript.window.CSSStyleSheet();
      s.replaceSync(Mm), this._glassPaneShadow.adoptedStyleSheets.push(s);
    } else {
      const s = this._injectedScript.document.createElement('style');
      (s.textContent = Mm), this._glassPaneShadow.appendChild(s);
    }
    this._glassPaneShadow.appendChild(this._actionPointElement);
  }
  install() {
    this._injectedScript.document.documentElement &&
      !this._injectedScript.document.documentElement.contains(this._glassPaneElement) &&
      this._injectedScript.document.documentElement.appendChild(this._glassPaneElement);
  }
  setLanguage(e) {
    this._language = e;
  }
  runHighlightOnRaf(e) {
    this._rafRequest && nm(this._rafRequest);
    const n = this._injectedScript.querySelectorAll(
        e,
        this._injectedScript.document.documentElement
      ),
      s = or(this._language, jn(e)),
      o = n.length > 1 ? '#f6b26b7f' : '#6fa8dc7f';
    this.updateHighlight(
      n.map((l, c) => {
        const u = n.length > 1 ? ` [${c + 1} of ${n.length}]` : '';
        return { element: l, color: o, tooltipText: s + u };
      })
    ),
      (this._rafRequest = Cl(() => this.runHighlightOnRaf(e)));
  }
  uninstall() {
    this._rafRequest && nm(this._rafRequest), this._glassPaneElement.remove();
  }
  showActionPoint(e, n) {
    (this._actionPointElement.style.top = n + 'px'),
      (this._actionPointElement.style.left = e + 'px'),
      (this._actionPointElement.hidden = !1);
  }
  hideActionPoint() {
    this._actionPointElement.hidden = !0;
  }
  clearHighlight() {
    var e, n;
    for (const s of this._renderedEntries)
      (e = s.highlightElement) == null || e.remove(), (n = s.tooltipElement) == null || n.remove();
    this._renderedEntries = [];
  }
  maskElements(e, n) {
    this.updateHighlight(e.map(s => ({ element: s, color: n })));
  }
  updateHighlight(e) {
    if (!this._highlightIsUpToDate(e)) {
      this.clearHighlight();
      for (const n of e) {
        const s = this._createHighlightElement();
        this._glassPaneShadow.appendChild(s);
        let o;
        if (n.tooltipText) {
          (o = this._injectedScript.document.createElement('x-pw-tooltip')),
            this._glassPaneShadow.appendChild(o),
            (o.style.top = '0'),
            (o.style.left = '0'),
            (o.style.display = 'flex');
          const l = this._injectedScript.document.createElement('x-pw-tooltip-line');
          (l.textContent = n.tooltipText), o.appendChild(l);
        }
        this._renderedEntries.push({
          targetElement: n.element,
          color: n.color,
          tooltipElement: o,
          highlightElement: s,
        });
      }
      for (const n of this._renderedEntries) {
        if (((n.box = n.targetElement.getBoundingClientRect()), !n.tooltipElement)) continue;
        const { anchorLeft: s, anchorTop: o } = this.tooltipPosition(n.box, n.tooltipElement);
        (n.tooltipTop = o), (n.tooltipLeft = s);
      }
      for (const n of this._renderedEntries) {
        n.tooltipElement &&
          ((n.tooltipElement.style.top = n.tooltipTop + 'px'),
          (n.tooltipElement.style.left = n.tooltipLeft + 'px'));
        const s = n.box;
        (n.highlightElement.style.backgroundColor = n.color),
          (n.highlightElement.style.left = s.x + 'px'),
          (n.highlightElement.style.top = s.y + 'px'),
          (n.highlightElement.style.width = s.width + 'px'),
          (n.highlightElement.style.height = s.height + 'px'),
          (n.highlightElement.style.display = 'block'),
          this._isUnderTest &&
            console.error(
              'Highlight box for test: ' +
                JSON.stringify({ x: s.x, y: s.y, width: s.width, height: s.height })
            );
      }
    }
  }
  firstBox() {
    var e;
    return (e = this._renderedEntries[0]) == null ? void 0 : e.box;
  }
  tooltipPosition(e, n) {
    const s = n.offsetWidth,
      o = n.offsetHeight,
      l = this._glassPaneElement.offsetWidth,
      c = this._glassPaneElement.offsetHeight;
    let u = e.left;
    u + s > l - 5 && (u = l - s - 5);
    let d = e.bottom + 5;
    return (
      d + o > c - 5 && (e.top > o + 5 ? (d = e.top - o - 5) : (d = c - 5 - o)),
      { anchorLeft: u, anchorTop: d }
    );
  }
  _highlightIsUpToDate(e) {
    if (e.length !== this._renderedEntries.length) return !1;
    for (let n = 0; n < this._renderedEntries.length; ++n) {
      if (
        e[n].element !== this._renderedEntries[n].targetElement ||
        e[n].color !== this._renderedEntries[n].color
      )
        return !1;
      const s = this._renderedEntries[n].box;
      if (!s) return !1;
      const o = e[n].element.getBoundingClientRect();
      if (o.top !== s.top || o.right !== s.right || o.bottom !== s.bottom || o.left !== s.left)
        return !1;
    }
    return !0;
  }
  _createHighlightElement() {
    return this._injectedScript.document.createElement('x-pw-highlight');
  }
  appendChild(e) {
    this._glassPaneShadow.appendChild(e);
  }
}
function Sk(t, e, n) {
  const s = t.left - e.right;
  if (!(s < 0 || (n !== void 0 && s > n)))
    return s + Math.max(e.bottom - t.bottom, 0) + Math.max(t.top - e.top, 0);
}
function _k(t, e, n) {
  const s = e.left - t.right;
  if (!(s < 0 || (n !== void 0 && s > n)))
    return s + Math.max(e.bottom - t.bottom, 0) + Math.max(t.top - e.top, 0);
}
function kk(t, e, n) {
  const s = e.top - t.bottom;
  if (!(s < 0 || (n !== void 0 && s > n)))
    return s + Math.max(t.left - e.left, 0) + Math.max(e.right - t.right, 0);
}
function bk(t, e, n) {
  const s = t.top - e.bottom;
  if (!(s < 0 || (n !== void 0 && s > n)))
    return s + Math.max(t.left - e.left, 0) + Math.max(e.right - t.right, 0);
}
function Ek(t, e, n) {
  const s = n === void 0 ? 50 : n;
  let o = 0;
  return (
    t.left - e.right >= 0 && (o += t.left - e.right),
    e.left - t.right >= 0 && (o += e.left - t.right),
    e.top - t.bottom >= 0 && (o += e.top - t.bottom),
    t.top - e.bottom >= 0 && (o += t.top - e.bottom),
    o > s ? void 0 : o
  );
}
const Tk = ['left-of', 'right-of', 'above', 'below', 'near'];
function My(t, e, n, s) {
  const o = e.getBoundingClientRect(),
    l = { 'left-of': _k, 'right-of': Sk, above: kk, below: bk, near: Ek }[t];
  let c;
  for (const u of n) {
    if (u === e) continue;
    const d = l(o, u.getBoundingClientRect(), s);
    d !== void 0 && (c === void 0 || d < c) && (c = d);
  }
  return c;
}
function $y(t, e) {
  for (const n of e.jsonPath) t != null && (t = t[n]);
  return Py(t, e);
}
function Py(t, e) {
  const n = typeof t == 'string' && !e.caseSensitive ? t.toUpperCase() : t,
    s = typeof e.value == 'string' && !e.caseSensitive ? e.value.toUpperCase() : e.value;
  return e.op === '<truthy>'
    ? !!n
    : e.op === '='
      ? s instanceof RegExp
        ? typeof n == 'string' && !!n.match(s)
        : n === s
      : typeof n != 'string' || typeof s != 'string'
        ? !1
        : e.op === '*='
          ? n.includes(s)
          : e.op === '^='
            ? n.startsWith(s)
            : e.op === '$='
              ? n.endsWith(s)
              : e.op === '|='
                ? n === s || n.startsWith(s + '-')
                : e.op === '~='
                  ? n.split(' ').includes(s)
                  : !1;
}
function zf(t) {
  const e = t.ownerDocument;
  return (
    t.nodeName === 'SCRIPT' ||
    t.nodeName === 'NOSCRIPT' ||
    t.nodeName === 'STYLE' ||
    (e.head && e.head.contains(t))
  );
}
function Lt(t, e) {
  let n = t.get(e);
  if (n === void 0) {
    if (((n = { full: '', normalized: '', immediate: [] }), !zf(e))) {
      let s = '';
      if (e instanceof HTMLInputElement && (e.type === 'submit' || e.type === 'button'))
        n = { full: e.value, normalized: vt(e.value), immediate: [e.value] };
      else {
        for (let o = e.firstChild; o; o = o.nextSibling)
          if (o.nodeType === Node.TEXT_NODE)
            (n.full += o.nodeValue || ''), (s += o.nodeValue || '');
          else {
            if (o.nodeType === Node.COMMENT_NODE) continue;
            s && n.immediate.push(s),
              (s = ''),
              o.nodeType === Node.ELEMENT_NODE && (n.full += Lt(t, o).full);
          }
        s && n.immediate.push(s),
          e.shadowRoot && (n.full += Lt(t, e.shadowRoot).full),
          n.full && (n.normalized = vt(n.full));
      }
    }
    t.set(e, n);
  }
  return n;
}
function ca(t, e, n) {
  if (zf(e) || !n(Lt(t, e))) return 'none';
  for (let s = e.firstChild; s; s = s.nextSibling)
    if (s.nodeType === Node.ELEMENT_NODE && n(Lt(t, s))) return 'selfAndChildren';
  return e.shadowRoot && n(Lt(t, e.shadowRoot)) ? 'selfAndChildren' : 'self';
}
function Ry(t, e) {
  const n = _y(e);
  if (n) return n.map(l => Lt(t, l));
  const s = e.getAttribute('aria-label');
  if (s !== null && s.trim()) return [{ full: s, normalized: vt(s), immediate: [s] }];
  const o = e.nodeName === 'INPUT' && e.type !== 'hidden';
  if (['BUTTON', 'METER', 'OUTPUT', 'PROGRESS', 'SELECT', 'TEXTAREA'].includes(e.nodeName) || o) {
    const l = e.labels;
    if (l) return [...l].map(c => Lt(t, c));
  }
  return [];
}
function $m(t) {
  return t.displayName || t.name || 'Anonymous';
}
function Nk(t) {
  if (t.type)
    switch (typeof t.type) {
      case 'function':
        return $m(t.type);
      case 'string':
        return t.type;
      case 'object':
        return t.type.displayName || (t.type.render ? $m(t.type.render) : '');
    }
  if (t._currentElement) {
    const e = t._currentElement.type;
    if (typeof e == 'string') return e;
    if (typeof e == 'function') return e.displayName || e.name || 'Anonymous';
  }
  return '';
}
function Ck(t) {
  var e;
  return t.key ?? ((e = t._currentElement) == null ? void 0 : e.key);
}
function Ak(t) {
  if (t.child) {
    const n = [];
    for (let s = t.child; s; s = s.sibling) n.push(s);
    return n;
  }
  if (!t._currentElement) return [];
  const e = n => {
    var o;
    const s = (o = n._currentElement) == null ? void 0 : o.type;
    return typeof s == 'function' || typeof s == 'string';
  };
  if (t._renderedComponent) {
    const n = t._renderedComponent;
    return e(n) ? [n] : [];
  }
  return t._renderedChildren ? [...Object.values(t._renderedChildren)].filter(e) : [];
}
function Lk(t) {
  var s;
  const e = t.memoizedProps || ((s = t._currentElement) == null ? void 0 : s.props);
  if (!e || typeof e == 'string') return e;
  const n = { ...e };
  return delete n.children, n;
}
function Dy(t) {
  var s;
  const e = { key: Ck(t), name: Nk(t), children: Ak(t).map(Dy), rootElements: [], props: Lk(t) },
    n = t.stateNode || t._hostNode || ((s = t._renderedComponent) == null ? void 0 : s._hostNode);
  if (n instanceof Element) e.rootElements.push(n);
  else for (const o of e.children) e.rootElements.push(...o.rootElements);
  return e;
}
function Fy(t, e, n = []) {
  e(t) && n.push(t);
  for (const s of t.children) Fy(s, e, n);
  return n;
}
function zy(t, e = []) {
  const s = (t.ownerDocument || t).createTreeWalker(t, NodeFilter.SHOW_ELEMENT);
  do {
    const o = s.currentNode,
      l = o,
      c = Object.keys(l).find(d => d.startsWith('__reactContainer') && l[d] !== null);
    if (c) e.push(l[c].stateNode.current);
    else {
      const d = '_reactRootContainer';
      l.hasOwnProperty(d) && l[d] !== null && e.push(l[d]._internalRoot.current);
    }
    if (o instanceof Element && o.hasAttribute('data-reactroot'))
      for (const d of Object.keys(o))
        (d.startsWith('__reactInternalInstance') || d.startsWith('__reactFiber')) && e.push(o[d]);
    const u = o instanceof Element ? o.shadowRoot : null;
    u && zy(u, e);
  } while (s.nextNode());
  return e;
}
const jk = () => ({
    queryAll(t, e) {
      const { name: n, attributes: s } = Ir(e, !1),
        c = zy(t.ownerDocument || t)
          .map(d => Dy(d))
          .map(d =>
            Fy(d, h => {
              const y = h.props ?? {};
              if (
                (h.key !== void 0 && (y.key = h.key),
                (n && h.name !== n) || h.rootElements.some(v => !aa(t, v)))
              )
                return !1;
              for (const v of s) if (!$y(y, v)) return !1;
              return !0;
            })
          )
          .flat(),
        u = new ke();
      for (const d of c) for (const h of d.rootElements) u.add(h);
      return [...u];
    },
  }),
  By = [
    'selected',
    'checked',
    'pressed',
    'expanded',
    'level',
    'disabled',
    'name',
    'include-hidden',
  ];
By.sort();
function Ri(t, e, n) {
  if (!e.includes(n))
    throw new Error(
      `"${t}" attribute is only supported for roles: ${e
        .slice()
        .sort()
        .map(s => `"${s}"`)
        .join(', ')}`
    );
}
function ds(t, e) {
  if (t.op !== '<truthy>' && !e.includes(t.value))
    throw new Error(`"${t.name}" must be one of ${e.map(n => JSON.stringify(n)).join(', ')}`);
}
function hs(t, e) {
  if (!e.includes(t.op)) throw new Error(`"${t.name}" does not support "${t.op}" matcher`);
}
function Ik(t, e) {
  const n = { role: e };
  for (const s of t)
    switch (s.name) {
      case 'checked': {
        Ri(s.name, bf, e),
          ds(s, [!0, !1, 'mixed']),
          hs(s, ['<truthy>', '=']),
          (n.checked = s.op === '<truthy>' ? !0 : s.value);
        break;
      }
      case 'pressed': {
        Ri(s.name, Tf, e),
          ds(s, [!0, !1, 'mixed']),
          hs(s, ['<truthy>', '=']),
          (n.pressed = s.op === '<truthy>' ? !0 : s.value);
        break;
      }
      case 'selected': {
        Ri(s.name, kf, e),
          ds(s, [!0, !1]),
          hs(s, ['<truthy>', '=']),
          (n.selected = s.op === '<truthy>' ? !0 : s.value);
        break;
      }
      case 'expanded': {
        Ri(s.name, Nf, e),
          ds(s, [!0, !1]),
          hs(s, ['<truthy>', '=']),
          (n.expanded = s.op === '<truthy>' ? !0 : s.value);
        break;
      }
      case 'level': {
        if (
          (Ri(s.name, Cf, e),
          typeof s.value == 'string' && (s.value = +s.value),
          s.op !== '=' || typeof s.value != 'number' || Number.isNaN(s.value))
        )
          throw new Error('"level" attribute must be compared to a number');
        n.level = s.value;
        break;
      }
      case 'disabled': {
        ds(s, [!0, !1]),
          hs(s, ['<truthy>', '=']),
          (n.disabled = s.op === '<truthy>' ? !0 : s.value);
        break;
      }
      case 'name': {
        if (s.op === '<truthy>') throw new Error('"name" attribute must have a value');
        if (typeof s.value != 'string' && !(s.value instanceof RegExp))
          throw new Error('"name" attribute must be a string or a regular expression');
        (n.name = s.value), (n.nameOp = s.op), (n.exact = s.caseSensitive);
        break;
      }
      case 'include-hidden': {
        ds(s, [!0, !1]),
          hs(s, ['<truthy>', '=']),
          (n.includeHidden = s.op === '<truthy>' ? !0 : s.value);
        break;
      }
      default:
        throw new Error(
          `Unknown attribute "${s.name}", must be one of ${By.map(o => `"${o}"`).join(', ')}.`
        );
    }
  return n;
}
function Ok(t, e, n) {
  const s = [],
    o = c => {
      if (
        et(c) === e.role &&
        !(e.selected !== void 0 && ky(c) !== e.selected) &&
        !(e.checked !== void 0 && by(c) !== e.checked) &&
        !(e.pressed !== void 0 && Ey(c) !== e.pressed) &&
        !(e.expanded !== void 0 && Ty(c) !== e.expanded) &&
        !(e.level !== void 0 && Ny(c) !== e.level) &&
        !(e.disabled !== void 0 && Jl(c) !== e.disabled) &&
        !(!e.includeHidden && Wt(c))
      ) {
        if (e.name !== void 0) {
          const u = vt(Xi(c, !!e.includeHidden));
          if (
            (typeof e.name == 'string' && (e.name = vt(e.name)),
            n && !e.exact && e.nameOp === '=' && (e.nameOp = '*='),
            !Py(u, { op: e.nameOp || '=', value: e.name, caseSensitive: !!e.exact }))
          )
            return;
        }
        s.push(c);
      }
    },
    l = c => {
      const u = [];
      c.shadowRoot && u.push(c.shadowRoot);
      for (const d of c.querySelectorAll('*')) o(d), d.shadowRoot && u.push(d.shadowRoot);
      u.forEach(l);
    };
  return l(t), s;
}
function Pm(t) {
  return {
    queryAll: (e, n) => {
      const s = Ir(n, !0),
        o = s.name.toLowerCase();
      if (!o) throw new Error('Role must not be empty');
      const l = Ik(s.attributes, o);
      $f();
      try {
        return Ok(e, l, t);
      } finally {
        Pf();
      }
    },
  };
}
class Mk {
  constructor() {
    (this._retainCacheCounter = 0),
      (this._cacheText = new be()),
      (this._cacheQueryCSS = new be()),
      (this._cacheMatches = new be()),
      (this._cacheQuery = new be()),
      (this._cacheMatchesSimple = new be()),
      (this._cacheMatchesParents = new be()),
      (this._cacheCallMatches = new be()),
      (this._cacheCallQuery = new be()),
      (this._cacheQuerySimple = new be()),
      (this._engines = new be()),
      this._engines.set('not', Rk),
      this._engines.set('is', qi),
      this._engines.set('where', qi),
      this._engines.set('has', $k),
      this._engines.set('scope', Pk),
      this._engines.set('light', Dk),
      this._engines.set('visible', Fk),
      this._engines.set('text', zk),
      this._engines.set('text-is', Bk),
      this._engines.set('text-matches', Uk),
      this._engines.set('has-text', qk),
      this._engines.set('right-of', Di('right-of')),
      this._engines.set('left-of', Di('left-of')),
      this._engines.set('above', Di('above')),
      this._engines.set('below', Di('below')),
      this._engines.set('near', Di('near')),
      this._engines.set('nth-match', Hk);
    const e = [...this._engines.keys()];
    e.sort();
    const n = [...Ig];
    if ((n.sort(), e.join('|') !== n.join('|')))
      throw new Error(
        `Please keep customCSSNames in sync with evaluator engines: ${e.join('|')} vs ${n.join('|')}`
      );
  }
  begin() {
    ++this._retainCacheCounter;
  }
  end() {
    --this._retainCacheCounter,
      this._retainCacheCounter ||
        (this._cacheQueryCSS.clear(),
        this._cacheMatches.clear(),
        this._cacheQuery.clear(),
        this._cacheMatchesSimple.clear(),
        this._cacheMatchesParents.clear(),
        this._cacheCallMatches.clear(),
        this._cacheCallQuery.clear(),
        this._cacheQuerySimple.clear(),
        this._cacheText.clear());
  }
  _cached(e, n, s, o) {
    e.has(n) || e.set(n, []);
    const l = e.get(n),
      c = l.find(d => s.every((h, y) => d.rest[y] === h));
    if (c) return c.result;
    const u = o();
    return l.push({ rest: s, result: u }), u;
  }
  _checkSelector(e) {
    if (!(typeof e == 'object' && e && (Array.isArray(e) || ('simples' in e && e.simples.length))))
      throw new Error(`Malformed selector "${e}"`);
    return e;
  }
  matches(e, n, s) {
    const o = this._checkSelector(n);
    this.begin();
    try {
      return this._cached(
        this._cacheMatches,
        e,
        [o, s.scope, s.pierceShadow, s.originalScope],
        () =>
          Array.isArray(o)
            ? this._matchesEngine(qi, e, o, s)
            : (this._hasScopeClause(o) && (s = this._expandContextForScopeMatching(s)),
              this._matchesSimple(e, o.simples[o.simples.length - 1].selector, s)
                ? this._matchesParents(e, o, o.simples.length - 2, s)
                : !1)
      );
    } finally {
      this.end();
    }
  }
  query(e, n) {
    const s = this._checkSelector(n);
    this.begin();
    try {
      return this._cached(this._cacheQuery, s, [e.scope, e.pierceShadow, e.originalScope], () => {
        if (Array.isArray(s)) return this._queryEngine(qi, e, s);
        this._hasScopeClause(s) && (e = this._expandContextForScopeMatching(e));
        const o = this._scoreMap;
        this._scoreMap = new be();
        let l = this._querySimple(e, s.simples[s.simples.length - 1].selector);
        return (
          (l = l.filter(c => this._matchesParents(c, s, s.simples.length - 2, e))),
          this._scoreMap.size &&
            l.sort((c, u) => {
              const d = this._scoreMap.get(c),
                h = this._scoreMap.get(u);
              return d === h ? 0 : d === void 0 ? 1 : h === void 0 ? -1 : d - h;
            }),
          (this._scoreMap = o),
          l
        );
      });
    } finally {
      this.end();
    }
  }
  _markScore(e, n) {
    this._scoreMap && this._scoreMap.set(e, n);
  }
  _hasScopeClause(e) {
    return e.simples.some(n => n.selector.functions.some(s => s.name === 'scope'));
  }
  _expandContextForScopeMatching(e) {
    if (e.scope.nodeType !== 1) return e;
    const n = gt(e.scope);
    return n ? { ...e, scope: n, originalScope: e.originalScope || e.scope } : e;
  }
  _matchesSimple(e, n, s) {
    return this._cached(
      this._cacheMatchesSimple,
      e,
      [n, s.scope, s.pierceShadow, s.originalScope],
      () => {
        if (e === s.scope || (n.css && !this._matchesCSS(e, n.css))) return !1;
        for (const o of n.functions)
          if (!this._matchesEngine(this._getEngine(o.name), e, o.args, s)) return !1;
        return !0;
      }
    );
  }
  _querySimple(e, n) {
    return n.functions.length
      ? this._cached(this._cacheQuerySimple, n, [e.scope, e.pierceShadow, e.originalScope], () => {
          let s = n.css;
          const o = n.functions;
          s === '*' && o.length && (s = void 0);
          let l,
            c = -1;
          s !== void 0
            ? (l = this._queryCSS(e, s))
            : ((c = o.findIndex(u => this._getEngine(u.name).query !== void 0)),
              c === -1 && (c = 0),
              (l = this._queryEngine(this._getEngine(o[c].name), e, o[c].args)));
          for (let u = 0; u < o.length; u++) {
            if (u === c) continue;
            const d = this._getEngine(o[u].name);
            d.matches !== void 0 && (l = l.filter(h => this._matchesEngine(d, h, o[u].args, e)));
          }
          for (let u = 0; u < o.length; u++) {
            if (u === c) continue;
            const d = this._getEngine(o[u].name);
            d.matches === void 0 && (l = l.filter(h => this._matchesEngine(d, h, o[u].args, e)));
          }
          return l;
        })
      : this._queryCSS(e, n.css || '*');
  }
  _matchesParents(e, n, s, o) {
    return s < 0
      ? !0
      : this._cached(
          this._cacheMatchesParents,
          e,
          [n, s, o.scope, o.pierceShadow, o.originalScope],
          () => {
            const { selector: l, combinator: c } = n.simples[s];
            if (c === '>') {
              const u = yl(e, o);
              return !u || !this._matchesSimple(u, l, o)
                ? !1
                : this._matchesParents(u, n, s - 1, o);
            }
            if (c === '+') {
              const u = Cu(e, o);
              return !u || !this._matchesSimple(u, l, o)
                ? !1
                : this._matchesParents(u, n, s - 1, o);
            }
            if (c === '') {
              let u = yl(e, o);
              for (; u; ) {
                if (this._matchesSimple(u, l, o)) {
                  if (this._matchesParents(u, n, s - 1, o)) return !0;
                  if (n.simples[s - 1].combinator === '') break;
                }
                u = yl(u, o);
              }
              return !1;
            }
            if (c === '~') {
              let u = Cu(e, o);
              for (; u; ) {
                if (this._matchesSimple(u, l, o)) {
                  if (this._matchesParents(u, n, s - 1, o)) return !0;
                  if (n.simples[s - 1].combinator === '~') break;
                }
                u = Cu(u, o);
              }
              return !1;
            }
            if (c === '>=') {
              let u = e;
              for (; u; ) {
                if (this._matchesSimple(u, l, o)) {
                  if (this._matchesParents(u, n, s - 1, o)) return !0;
                  if (n.simples[s - 1].combinator === '') break;
                }
                u = yl(u, o);
              }
              return !1;
            }
            throw new Error(`Unsupported combinator "${c}"`);
          }
        );
  }
  _matchesEngine(e, n, s, o) {
    if (e.matches) return this._callMatches(e, n, s, o);
    if (e.query) return this._callQuery(e, s, o).includes(n);
    throw new Error('Selector engine should implement "matches" or "query"');
  }
  _queryEngine(e, n, s) {
    if (e.query) return this._callQuery(e, s, n);
    if (e.matches) return this._queryCSS(n, '*').filter(o => this._callMatches(e, o, s, n));
    throw new Error('Selector engine should implement "matches" or "query"');
  }
  _callMatches(e, n, s, o) {
    return this._cached(
      this._cacheCallMatches,
      n,
      [e, o.scope, o.pierceShadow, o.originalScope, ...s],
      () => e.matches(n, s, o, this)
    );
  }
  _callQuery(e, n, s) {
    return this._cached(
      this._cacheCallQuery,
      e,
      [s.scope, s.pierceShadow, s.originalScope, ...n],
      () => e.query(s, n, this)
    );
  }
  _matchesCSS(e, n) {
    return e.matches(n);
  }
  _queryCSS(e, n) {
    return this._cached(this._cacheQueryCSS, n, [e.scope, e.pierceShadow, e.originalScope], () => {
      let s = [];
      function o(l) {
        if (((s = s.concat([...l.querySelectorAll(n)])), !!e.pierceShadow)) {
          l.shadowRoot && o(l.shadowRoot);
          for (const c of l.querySelectorAll('*')) c.shadowRoot && o(c.shadowRoot);
        }
      }
      return o(e.scope), s;
    });
  }
  _getEngine(e) {
    const n = this._engines.get(e);
    if (!n) throw new Error(`Unknown selector engine "${e}"`);
    return n;
  }
}
const qi = {
    matches(t, e, n, s) {
      if (e.length === 0) throw new Error('"is" engine expects non-empty selector list');
      return e.some(o => s.matches(t, o, n));
    },
    query(t, e, n) {
      if (e.length === 0) throw new Error('"is" engine expects non-empty selector list');
      let s = [];
      for (const o of e) s = s.concat(n.query(t, o));
      return e.length === 1 ? s : Uy(s);
    },
  },
  $k = {
    matches(t, e, n, s) {
      if (e.length === 0) throw new Error('"has" engine expects non-empty selector list');
      return s.query({ ...n, scope: t }, e).length > 0;
    },
  },
  Pk = {
    matches(t, e, n, s) {
      if (e.length !== 0) throw new Error('"scope" engine expects no arguments');
      const o = n.originalScope || n.scope;
      return o.nodeType === 9 ? t === o.documentElement : t === o;
    },
    query(t, e, n) {
      if (e.length !== 0) throw new Error('"scope" engine expects no arguments');
      const s = t.originalScope || t.scope;
      if (s.nodeType === 9) {
        const o = s.documentElement;
        return o ? [o] : [];
      }
      return s.nodeType === 1 ? [s] : [];
    },
  },
  Rk = {
    matches(t, e, n, s) {
      if (e.length === 0) throw new Error('"not" engine expects non-empty selector list');
      return !s.matches(t, e, n);
    },
  },
  Dk = {
    query(t, e, n) {
      return n.query({ ...t, pierceShadow: !1 }, e);
    },
    matches(t, e, n, s) {
      return s.matches(t, e, { ...n, pierceShadow: !1 });
    },
  },
  Fk = {
    matches(t, e, n, s) {
      if (e.length) throw new Error('"visible" engine expects no arguments');
      return Ts(t);
    },
  },
  zk = {
    matches(t, e, n, s) {
      if (e.length !== 1 || typeof e[0] != 'string')
        throw new Error('"text" engine expects a single string');
      const o = vt(e[0]).toLowerCase(),
        l = c => c.normalized.toLowerCase().includes(o);
      return ca(s._cacheText, t, l) === 'self';
    },
  },
  Bk = {
    matches(t, e, n, s) {
      if (e.length !== 1 || typeof e[0] != 'string')
        throw new Error('"text-is" engine expects a single string');
      const o = vt(e[0]),
        l = c => (!o && !c.immediate.length ? !0 : c.immediate.some(u => vt(u) === o));
      return ca(s._cacheText, t, l) !== 'none';
    },
  },
  Uk = {
    matches(t, e, n, s) {
      if (
        e.length === 0 ||
        typeof e[0] != 'string' ||
        e.length > 2 ||
        (e.length === 2 && typeof e[1] != 'string')
      )
        throw new Error('"text-matches" engine expects a regexp body and optional regexp flags');
      const o = new RegExp(e[0], e.length === 2 ? e[1] : void 0),
        l = c => o.test(c.full);
      return ca(s._cacheText, t, l) === 'self';
    },
  },
  qk = {
    matches(t, e, n, s) {
      if (e.length !== 1 || typeof e[0] != 'string')
        throw new Error('"has-text" engine expects a single string');
      if (zf(t)) return !1;
      const o = vt(e[0]).toLowerCase();
      return (c => c.normalized.toLowerCase().includes(o))(Lt(s._cacheText, t));
    },
  };
function Di(t) {
  return {
    matches(e, n, s, o) {
      const l = n.length && typeof n[n.length - 1] == 'number' ? n[n.length - 1] : void 0,
        c = l === void 0 ? n : n.slice(0, n.length - 1);
      if (n.length < 1 + (l === void 0 ? 0 : 1))
        throw new Error(
          `"${t}" engine expects a selector list and optional maximum distance in pixels`
        );
      const u = o.query(s, c),
        d = My(t, e, u, l);
      return d === void 0 ? !1 : (o._markScore(e, d), !0);
    },
  };
}
const Hk = {
  query(t, e, n) {
    let s = e[e.length - 1];
    if (e.length < 2)
      throw new Error('"nth-match" engine expects non-empty selector list and an index argument');
    if (typeof s != 'number' || s < 1)
      throw new Error('"nth-match" engine expects a one-based index as the last argument');
    const o = qi.query(t, e.slice(0, e.length - 1), n);
    return s--, s < o.length ? [o[s]] : [];
  },
};
function yl(t, e) {
  if (t !== e.scope) return e.pierceShadow ? gt(t) : t.parentElement || void 0;
}
function Cu(t, e) {
  if (t !== e.scope) return t.previousElementSibling || void 0;
}
function Uy(t) {
  const e = new be(),
    n = [],
    s = [];
  function o(c) {
    let u = e.get(c);
    if (u) return u;
    const d = gt(c);
    return d ? o(d).children.push(c) : n.push(c), (u = { children: [], taken: !1 }), e.set(c, u), u;
  }
  for (const c of t) o(c).taken = !0;
  function l(c) {
    const u = e.get(c);
    if ((u.taken && s.push(c), u.children.length > 1)) {
      const d = new ke(u.children);
      u.children = [];
      let h = c.firstElementChild;
      for (; h && u.children.length < d.size; )
        d.has(h) && u.children.push(h), (h = h.nextElementSibling);
      for (
        h = c.shadowRoot ? c.shadowRoot.firstElementChild : null;
        h && u.children.length < d.size;

      )
        d.has(h) && u.children.push(h), (h = h.nextElementSibling);
    }
    u.children.forEach(l);
  }
  return n.forEach(l), s;
}
const qy = 10,
  Rs = qy / 2,
  Rm = 1,
  Vk = 2,
  Wk = 10,
  Kk = 50,
  Hy = 100,
  Vy = 120,
  Wy = 140,
  Ky = 160,
  Rl = 180,
  Qy = 200,
  Dm = 250,
  Qk = Vy + Rs,
  Gk = Wy + Rs,
  Xk = Hy + Rs,
  Jk = Ky + Rs,
  Yk = Rl + Rs,
  Zk = Qy + Rs,
  eb = 300,
  tb = 500,
  Gy = 510,
  Au = 520,
  Xy = 530,
  Jy = 1e4,
  nb = 1e7,
  rb = 1e3;
function Fm(t, e, n) {
  t._evaluator.begin();
  const s = { allowText: new be(), disallowText: new be() };
  $f();
  try {
    let o = [];
    if (n.forTextExpect) {
      let u = vl(t, e.ownerDocument.documentElement, n);
      for (let d = e; d; d = gt(d)) {
        const h = ps(s, t, d, { ...n, noText: !0 });
        if (!h) continue;
        if (ir(h) <= rb) {
          u = h;
          break;
        }
      }
      o = [Dl(u)];
    } else {
      if (!e.matches('input,textarea,select') && !e.isContentEditable) {
        const u = Ui(
          e,
          'button,select,input,[role=button],[role=checkbox],[role=radio],a,[role=link]',
          n.root
        );
        u && Ts(u) && (e = u);
      }
      if (n.multiple) {
        const u = ps(s, t, e, n),
          d = ps(s, t, e, { ...n, noText: !0 });
        let h = [u, d];
        if (
          (s.allowText.clear(),
          s.disallowText.clear(),
          u && Lu(u) && h.push(ps(s, t, e, { ...n, noCSSId: !0 })),
          d && Lu(d) && h.push(ps(s, t, e, { ...n, noText: !0, noCSSId: !0 })),
          (h = h.filter(Boolean)),
          !h.length)
        ) {
          const y = vl(t, e, n);
          h.push(y), Lu(y) && h.push(vl(t, e, { ...n, noCSSId: !0 }));
        }
        o = [...new ke(h.map(y => Dl(y)))];
      } else {
        const u = ps(s, t, e, n) || vl(t, e, n);
        o = [Dl(u)];
      }
    }
    const l = o[0],
      c = t.parseSelector(l);
    return {
      selector: l,
      selectors: o,
      elements: t.querySelectorAll(c, n.root ?? e.ownerDocument),
    };
  } finally {
    Pf(), t._evaluator.end();
  }
}
function zm(t) {
  return t.filter(e => e[0].selector[0] !== '/');
}
function ps(t, e, n, s) {
  if (s.root && !aa(s.root, n)) throw new Error("Target element must belong to the root's subtree");
  if (n === s.root) return [{ engine: 'css', selector: ':scope', score: 1 }];
  if (n.ownerDocument.documentElement === n) return [{ engine: 'css', selector: 'html', score: 1 }];
  const o = (c, u) => {
      const d = c === n;
      let h = u ? ib(e, c, c === n) : [];
      c !== n && (h = zm(h));
      const y = sb(e, c, s)
        .filter(w => !s.omitInternalEngines || !w.engine.startsWith('internal:'))
        .map(w => [w]);
      let v = Bm(e, s.root ?? n.ownerDocument, c, [...h, ...y], d);
      h = zm(h);
      const m = w => {
        const S = u && !w.length,
          _ = [...w, ...y].filter(T => (v ? ir(T) < ir(v) : !0));
        let b = _[0];
        if (b)
          for (let T = gt(c); T && T !== s.root; T = gt(T)) {
            const C = l(T, S);
            if (!C || (v && ir([...C, ...b]) >= ir(v))) continue;
            if (((b = Bm(e, T, c, _, d)), !b)) return;
            const O = [...C, ...b];
            (!v || ir(O) < ir(v)) && (v = O);
          }
      };
      return m(h), c === n && h.length && m([]), v;
    },
    l = (c, u) => {
      const d = u ? t.allowText : t.disallowText;
      let h = d.get(c);
      return h === void 0 && ((h = o(c, u)), d.set(c, h)), h;
    };
  return o(n, !s.noText);
}
function sb(t, e, n) {
  const s = [];
  {
    for (const c of ['data-testid', 'data-test-id', 'data-test'])
      c !== n.testIdAttributeName &&
        e.getAttribute(c) &&
        s.push({ engine: 'css', selector: `[${c}=${Ii(e.getAttribute(c))}]`, score: Vk });
    if (!n.noCSSId) {
      const c = e.getAttribute('id');
      c && !ob(c) && s.push({ engine: 'css', selector: Yy(c), score: tb });
    }
    s.push({ engine: 'css', selector: Kt(e.nodeName.toLowerCase()), score: Xy });
  }
  if (e.nodeName === 'IFRAME') {
    for (const c of ['name', 'title'])
      e.getAttribute(c) &&
        s.push({
          engine: 'css',
          selector: `${Kt(e.nodeName.toLowerCase())}[${c}=${Ii(e.getAttribute(c))}]`,
          score: Wk,
        });
    return (
      e.getAttribute(n.testIdAttributeName) &&
        s.push({
          engine: 'css',
          selector: `[${n.testIdAttributeName}=${Ii(e.getAttribute(n.testIdAttributeName))}]`,
          score: Rm,
        }),
      tf([s]),
      s
    );
  }
  if (
    (e.getAttribute(n.testIdAttributeName) &&
      s.push({
        engine: 'internal:testid',
        selector: `[${n.testIdAttributeName}=${mt(e.getAttribute(n.testIdAttributeName), !0)}]`,
        score: Rm,
      }),
    e.nodeName === 'INPUT' || e.nodeName === 'TEXTAREA')
  ) {
    const c = e;
    if (c.placeholder) {
      s.push({
        engine: 'internal:attr',
        selector: `[placeholder=${mt(c.placeholder, !0)}]`,
        score: Qk,
      });
      for (const u of Ss(c.placeholder))
        s.push({
          engine: 'internal:attr',
          selector: `[placeholder=${mt(u.text, !1)}]`,
          score: Vy - u.scoreBonus,
        });
    }
  }
  const o = Ry(t._evaluator._cacheText, e);
  for (const c of o) {
    const u = c.normalized;
    s.push({ engine: 'internal:label', selector: Ct(u, !0), score: Gk });
    for (const d of Ss(u))
      s.push({ engine: 'internal:label', selector: Ct(d.text, !1), score: Wy - d.scoreBonus });
  }
  const l = et(e);
  return (
    l &&
      !['none', 'presentation'].includes(l) &&
      s.push({ engine: 'internal:role', selector: l, score: Gy }),
    e.getAttribute('name') &&
      [
        'BUTTON',
        'FORM',
        'FIELDSET',
        'FRAME',
        'IFRAME',
        'INPUT',
        'KEYGEN',
        'OBJECT',
        'OUTPUT',
        'SELECT',
        'TEXTAREA',
        'MAP',
        'META',
        'PARAM',
      ].includes(e.nodeName) &&
      s.push({
        engine: 'css',
        selector: `${Kt(e.nodeName.toLowerCase())}[name=${Ii(e.getAttribute('name'))}]`,
        score: Au,
      }),
    ['INPUT', 'TEXTAREA'].includes(e.nodeName) &&
      e.getAttribute('type') !== 'hidden' &&
      e.getAttribute('type') &&
      s.push({
        engine: 'css',
        selector: `${Kt(e.nodeName.toLowerCase())}[type=${Ii(e.getAttribute('type'))}]`,
        score: Au,
      }),
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.nodeName) &&
      e.getAttribute('type') !== 'hidden' &&
      s.push({ engine: 'css', selector: Kt(e.nodeName.toLowerCase()), score: Au + 1 }),
    tf([s]),
    s
  );
}
function ib(t, e, n) {
  if (e.nodeName === 'SELECT') return [];
  const s = [],
    o = e.getAttribute('title');
  if (o) {
    s.push([{ engine: 'internal:attr', selector: `[title=${mt(o, !0)}]`, score: Zk }]);
    for (const h of Ss(o))
      s.push([
        {
          engine: 'internal:attr',
          selector: `[title=${mt(h.text, !1)}]`,
          score: Qy - h.scoreBonus,
        },
      ]);
  }
  const l = e.getAttribute('alt');
  if (l && ['APPLET', 'AREA', 'IMG', 'INPUT'].includes(e.nodeName)) {
    s.push([{ engine: 'internal:attr', selector: `[alt=${mt(l, !0)}]`, score: Jk }]);
    for (const h of Ss(l))
      s.push([
        { engine: 'internal:attr', selector: `[alt=${mt(h.text, !1)}]`, score: Ky - h.scoreBonus },
      ]);
  }
  const c = Lt(t._evaluator._cacheText, e).normalized,
    u = c ? Ss(c) : [];
  if (c) {
    if (n) {
      c.length <= 80 && s.push([{ engine: 'internal:text', selector: Ct(c, !0), score: Yk }]);
      for (const y of u)
        s.push([{ engine: 'internal:text', selector: Ct(y.text, !1), score: Rl - y.scoreBonus }]);
    }
    const h = { engine: 'css', selector: Kt(e.nodeName.toLowerCase()), score: Xy };
    for (const y of u)
      s.push([
        h,
        { engine: 'internal:has-text', selector: Ct(y.text, !1), score: Rl - y.scoreBonus },
      ]);
    if (c.length <= 80) {
      const y = new RegExp('^' + Wl(c) + '$');
      s.push([h, { engine: 'internal:has-text', selector: Ct(y, !1), score: Dm }]);
    }
  }
  const d = et(e);
  if (d && !['none', 'presentation'].includes(d)) {
    const h = Xi(e, !1);
    if (h) {
      const y = { engine: 'internal:role', selector: `${d}[name=${mt(h, !0)}]`, score: Xk };
      s.push([y]);
      for (const v of Ss(h))
        s.push([
          {
            engine: 'internal:role',
            selector: `${d}[name=${mt(v.text, !1)}]`,
            score: Hy - v.scoreBonus,
          },
        ]);
    } else {
      const y = { engine: 'internal:role', selector: `${d}`, score: Gy };
      for (const v of u)
        s.push([
          y,
          { engine: 'internal:has-text', selector: Ct(v.text, !1), score: Rl - v.scoreBonus },
        ]);
      if (c.length <= 80) {
        const v = new RegExp('^' + Wl(c) + '$');
        s.push([y, { engine: 'internal:has-text', selector: Ct(v, !1), score: Dm }]);
      }
    }
  }
  return tf(s), s;
}
function Yy(t) {
  return /^[a-zA-Z][a-zA-Z0-9\-\_]+$/.test(t) ? '#' + t : `[id="${Kt(t)}"]`;
}
function Lu(t) {
  return t.some(
    e => e.engine === 'css' && (e.selector.startsWith('#') || e.selector.startsWith('[id="'))
  );
}
function vl(t, e, n) {
  const s = n.root ?? e.ownerDocument,
    o = [];
  function l(u) {
    const d = o.slice();
    u && d.unshift(u);
    const h = d.join(' > '),
      y = t.parseSelector(h);
    return t.querySelector(y, s, !1) === e ? h : void 0;
  }
  function c(u) {
    const d = { engine: 'css', selector: u, score: nb },
      h = t.parseSelector(u),
      y = t.querySelectorAll(h, s);
    if (y.length === 1) return [d];
    const v = { engine: 'nth', selector: String(y.indexOf(e)), score: Jy };
    return [d, v];
  }
  for (let u = e; u && u !== s; u = gt(u)) {
    const d = u.nodeName.toLowerCase();
    let h = '';
    if (u.id && !n.noCSSId) {
      const m = Yy(u.id),
        w = l(m);
      if (w) return c(w);
      h = m;
    }
    const y = u.parentNode,
      v = [...u.classList];
    for (let m = 0; m < v.length; ++m) {
      const w = '.' + Kt(v.slice(0, m + 1).join('.')),
        S = l(w);
      if (S) return c(S);
      !h && y && y.querySelectorAll(w).length === 1 && (h = w);
    }
    if (y) {
      const m = [...y.children],
        S =
          m.filter(b => b.nodeName.toLowerCase() === d).indexOf(u) === 0
            ? Kt(d)
            : `${Kt(d)}:nth-child(${1 + m.indexOf(u)})`,
        _ = l(S);
      if (_) return c(_);
      h || (h = S);
    } else h || (h = Kt(d));
    o.unshift(h);
  }
  return c(l());
}
function tf(t) {
  for (const e of t)
    for (const n of e)
      n.score > Kk && n.score < eb && (n.score += Math.min(qy, (n.selector.length / 10) | 0));
}
function Dl(t) {
  const e = [];
  let n = '';
  for (const { engine: s, selector: o } of t)
    e.length && (n !== 'css' || s !== 'css' || o.startsWith(':nth-match(')) && e.push('>>'),
      (n = s),
      s === 'css' ? e.push(o) : e.push(`${s}=${o}`);
  return e.join(' ');
}
function ir(t) {
  let e = 0;
  for (let n = 0; n < t.length; n++) e += t[n].score * (t.length - n);
  return e;
}
function Bm(t, e, n, s, o) {
  const l = s.map(u => ({ tokens: u, score: ir(u) }));
  l.sort((u, d) => u.score - d.score);
  let c = null;
  for (const { tokens: u } of l) {
    const d = t.parseSelector(Dl(u)),
      h = t.querySelectorAll(d, e);
    if (h[0] === n && h.length === 1) return u;
    const y = h.indexOf(n);
    if (!o || c || y === -1 || h.length > 5) continue;
    const v = { engine: 'nth', selector: String(y), score: Jy };
    c = [...u, v];
  }
  return c;
}
function ob(t) {
  let e,
    n = 0;
  for (let s = 0; s < t.length; ++s) {
    const o = t[s];
    let l;
    if (!(o === '-' || o === '_')) {
      if (
        (o >= 'a' && o <= 'z'
          ? (l = 'lower')
          : o >= 'A' && o <= 'Z'
            ? (l = 'upper')
            : o >= '0' && o <= '9'
              ? (l = 'digit')
              : (l = 'other'),
        l === 'lower' && e === 'upper')
      ) {
        e = l;
        continue;
      }
      e && e !== l && ++n, (e = l);
    }
  }
  return n >= t.length / 4;
}
function wl(t, e) {
  if (t.length <= e) return t;
  t = t.substring(0, e);
  const n = t.match(/^(.*)\b(.+?)$/);
  return n ? n[1].trimEnd() : '';
}
function Ss(t) {
  let e = [];
  {
    const n = t.match(/^([\d.,]+)[^.,\w]/),
      s = n ? n[1].length : 0;
    if (s) {
      const o = wl(t.substring(s).trimStart(), 80);
      e.push({ text: o, scoreBonus: o.length <= 30 ? 2 : 1 });
    }
  }
  {
    const n = t.match(/[^.,\w]([\d.,]+)$/),
      s = n ? n[1].length : 0;
    if (s) {
      const o = wl(t.substring(0, t.length - s).trimEnd(), 80);
      e.push({ text: o, scoreBonus: o.length <= 30 ? 2 : 1 });
    }
  }
  return (
    t.length <= 30
      ? e.push({ text: t, scoreBonus: 0 })
      : (e.push({ text: wl(t, 80), scoreBonus: 0 }), e.push({ text: wl(t, 30), scoreBonus: 1 })),
    (e = e.filter(n => n.text)),
    e.length || e.push({ text: t.substring(0, 80), scoreBonus: 0 }),
    e
  );
}
function Zy(t, e) {
  const n = t.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/');
  let s = n.substring(n.lastIndexOf('/') + 1);
  return s.endsWith(e) && (s = s.substring(0, s.length - e.length)), s;
}
function lb(t, e) {
  return e ? e.toUpperCase() : '';
}
const ab = /(?:^|[-_/])(\w)/g,
  ev = t => t && t.replace(ab, lb);
function cb(t) {
  function e(y) {
    const v = y.name || y._componentTag || y.__playwright_guessedName;
    if (v) return v;
    const m = y.__file;
    if (m) return ev(Zy(m, '.vue'));
  }
  function n(y, v) {
    return (y.type.__playwright_guessedName = v), v;
  }
  function s(y) {
    var m, w, S, _;
    const v = e(y.type || {});
    if (v) return v;
    if (y.root === y) return 'Root';
    for (const b in (w = (m = y.parent) == null ? void 0 : m.type) == null ? void 0 : w.components)
      if (((S = y.parent) == null ? void 0 : S.type.components[b]) === y.type) return n(y, b);
    for (const b in (_ = y.appContext) == null ? void 0 : _.components)
      if (y.appContext.components[b] === y.type) return n(y, b);
    return 'Anonymous Component';
  }
  function o(y) {
    return y._isBeingDestroyed || y.isUnmounted;
  }
  function l(y) {
    return y.subTree.type.toString() === 'Symbol(Fragment)';
  }
  function c(y) {
    const v = [];
    return (
      y.component && v.push(y.component),
      y.suspense && v.push(...c(y.suspense.activeBranch)),
      Array.isArray(y.children) &&
        y.children.forEach(m => {
          m.component ? v.push(m.component) : v.push(...c(m));
        }),
      v.filter(m => {
        var w;
        return !o(m) && !((w = m.type.devtools) != null && w.hide);
      })
    );
  }
  function u(y) {
    return l(y) ? d(y.subTree) : [y.subTree.el];
  }
  function d(y) {
    if (!y.children) return [];
    const v = [];
    for (let m = 0, w = y.children.length; m < w; m++) {
      const S = y.children[m];
      S.component ? v.push(...u(S.component)) : S.el && v.push(S.el);
    }
    return v;
  }
  function h(y) {
    return { name: s(y), children: c(y.subTree).map(h), rootElements: u(y), props: y.props };
  }
  return h(t);
}
function ub(t) {
  function e(l) {
    const c = l.displayName || l.name || l._componentTag;
    if (c) return c;
    const u = l.__file;
    if (u) return ev(Zy(u, '.vue'));
  }
  function n(l) {
    const c = e(l.$options || l.fnOptions || {});
    return c || (l.$root === l ? 'Root' : 'Anonymous Component');
  }
  function s(l) {
    return l.$children
      ? l.$children
      : Array.isArray(l.subTree.children)
        ? l.subTree.children.filter(c => !!c.component).map(c => c.component)
        : [];
  }
  function o(l) {
    return { name: n(l), children: s(l).map(o), rootElements: [l.$el], props: l._props };
  }
  return o(t);
}
function tv(t, e, n = []) {
  e(t) && n.push(t);
  for (const s of t.children) tv(s, e, n);
  return n;
}
function nv(t, e = []) {
  const s = (t.ownerDocument || t).createTreeWalker(t, NodeFilter.SHOW_ELEMENT),
    o = new ke();
  do {
    const l = s.currentNode;
    l.__vue__ && o.add(l.__vue__.$root),
      l.__vue_app__ &&
        l._vnode &&
        l._vnode.component &&
        e.push({ root: l._vnode.component, version: 3 });
    const c = l instanceof Element ? l.shadowRoot : null;
    c && nv(c, e);
  } while (s.nextNode());
  for (const l of o) e.push({ version: 2, root: l });
  return e;
}
const fb = () => ({
    queryAll(t, e) {
      const n = t.ownerDocument || t,
        { name: s, attributes: o } = Ir(e, !1),
        u = nv(n)
          .map(h => (h.version === 3 ? cb(h.root) : ub(h.root)))
          .map(h =>
            tv(h, y => {
              if ((s && y.name !== s) || y.rootElements.some(v => !aa(t, v))) return !1;
              for (const v of o) if (!$y(y.props, v)) return !1;
              return !0;
            })
          )
          .flat(),
        d = new ke();
      for (const h of u) for (const y of h.rootElements) d.add(y);
      return [...d];
    },
  }),
  Um = {
    queryAll(t, e) {
      e.startsWith('/') && t.nodeType !== Node.DOCUMENT_NODE && (e = '.' + e);
      const n = [],
        s = t.ownerDocument || t;
      if (!s) return n;
      const o = s.evaluate(e, t, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
      for (let l = o.iterateNext(); l; l = o.iterateNext())
        l.nodeType === Node.ELEMENT_NODE && n.push(l);
      return n;
    },
  };
class rv {
  constructor(e, n, s, o, l, c, u, d) {
    (this._testIdAttributeNameForStrictErrorAndConsoleCodegen = 'data-testid'),
      (this.utils = {
        asLocator: or,
        cacheNormalizedWhitespaces: Zx,
        elementText: Lt,
        getAriaRole: et,
        getElementAccessibleDescription: jm,
        getElementAccessibleName: Xi,
        isElementVisible: Ts,
        isInsideScope: aa,
        normalizeWhiteSpace: vt,
        parseAriaSnapshot: xf,
        builtins: Vu(),
      }),
      (this.window = e),
      (this.document = e.document),
      (this.isUnderTest = n),
      (this.utils.builtins = Vu(e)),
      (this._sdkLanguage = s),
      (this._testIdAttributeNameForStrictErrorAndConsoleCodegen = o),
      (this._evaluator = new Mk()),
      (this.onGlobalListenersRemoved = new ke()),
      (this._autoClosingTags = new ke([
        'AREA',
        'BASE',
        'BR',
        'COL',
        'COMMAND',
        'EMBED',
        'HR',
        'IMG',
        'INPUT',
        'KEYGEN',
        'LINK',
        'MENUITEM',
        'META',
        'PARAM',
        'SOURCE',
        'TRACK',
        'WBR',
      ])),
      (this._booleanAttributes = new ke([
        'checked',
        'selected',
        'disabled',
        'readonly',
        'multiple',
      ])),
      (this._eventTypes = new be([
        ['auxclick', 'mouse'],
        ['click', 'mouse'],
        ['dblclick', 'mouse'],
        ['mousedown', 'mouse'],
        ['mouseeenter', 'mouse'],
        ['mouseleave', 'mouse'],
        ['mousemove', 'mouse'],
        ['mouseout', 'mouse'],
        ['mouseover', 'mouse'],
        ['mouseup', 'mouse'],
        ['mouseleave', 'mouse'],
        ['mousewheel', 'mouse'],
        ['keydown', 'keyboard'],
        ['keyup', 'keyboard'],
        ['keypress', 'keyboard'],
        ['textInput', 'keyboard'],
        ['touchstart', 'touch'],
        ['touchmove', 'touch'],
        ['touchend', 'touch'],
        ['touchcancel', 'touch'],
        ['pointerover', 'pointer'],
        ['pointerout', 'pointer'],
        ['pointerenter', 'pointer'],
        ['pointerleave', 'pointer'],
        ['pointerdown', 'pointer'],
        ['pointerup', 'pointer'],
        ['pointermove', 'pointer'],
        ['pointercancel', 'pointer'],
        ['gotpointercapture', 'pointer'],
        ['lostpointercapture', 'pointer'],
        ['focus', 'focus'],
        ['blur', 'focus'],
        ['drag', 'drag'],
        ['dragstart', 'drag'],
        ['dragend', 'drag'],
        ['dragover', 'drag'],
        ['dragenter', 'drag'],
        ['dragleave', 'drag'],
        ['dragexit', 'drag'],
        ['drop', 'drag'],
        ['wheel', 'wheel'],
        ['deviceorientation', 'deviceorientation'],
        ['deviceorientationabsolute', 'deviceorientation'],
        ['devicemotion', 'devicemotion'],
      ])),
      (this._hoverHitTargetInterceptorEvents = new ke(['mousemove'])),
      (this._tapHitTargetInterceptorEvents = new ke([
        'pointerdown',
        'pointerup',
        'touchstart',
        'touchend',
        'touchcancel',
      ])),
      (this._mouseHitTargetInterceptorEvents = new ke([
        'mousedown',
        'mouseup',
        'pointerdown',
        'pointerup',
        'click',
        'auxclick',
        'dblclick',
        'contextmenu',
      ])),
      (this._allHitTargetInterceptorEvents = new ke([
        ...this._hoverHitTargetInterceptorEvents,
        ...this._tapHitTargetInterceptorEvents,
        ...this._mouseHitTargetInterceptorEvents,
      ])),
      (this._engines = new be()),
      this._engines.set('xpath', Um),
      this._engines.set('xpath:light', Um),
      this._engines.set('_react', jk()),
      this._engines.set('_vue', fb()),
      this._engines.set('role', Pm(!1)),
      this._engines.set('text', this._createTextEngine(!0, !1)),
      this._engines.set('text:light', this._createTextEngine(!1, !1)),
      this._engines.set('id', this._createAttributeEngine('id', !0)),
      this._engines.set('id:light', this._createAttributeEngine('id', !1)),
      this._engines.set('data-testid', this._createAttributeEngine('data-testid', !0)),
      this._engines.set('data-testid:light', this._createAttributeEngine('data-testid', !1)),
      this._engines.set('data-test-id', this._createAttributeEngine('data-test-id', !0)),
      this._engines.set('data-test-id:light', this._createAttributeEngine('data-test-id', !1)),
      this._engines.set('data-test', this._createAttributeEngine('data-test', !0)),
      this._engines.set('data-test:light', this._createAttributeEngine('data-test', !1)),
      this._engines.set('css', this._createCSSEngine()),
      this._engines.set('nth', { queryAll: () => [] }),
      this._engines.set('visible', this._createVisibleEngine()),
      this._engines.set('internal:control', this._createControlEngine()),
      this._engines.set('internal:has', this._createHasEngine()),
      this._engines.set('internal:has-not', this._createHasNotEngine()),
      this._engines.set('internal:and', { queryAll: () => [] }),
      this._engines.set('internal:or', { queryAll: () => [] }),
      this._engines.set('internal:chain', this._createInternalChainEngine()),
      this._engines.set('internal:label', this._createInternalLabelEngine()),
      this._engines.set('internal:text', this._createTextEngine(!0, !0)),
      this._engines.set('internal:has-text', this._createInternalHasTextEngine()),
      this._engines.set('internal:has-not-text', this._createInternalHasNotTextEngine()),
      this._engines.set('internal:attr', this._createNamedAttributeEngine()),
      this._engines.set('internal:testid', this._createNamedAttributeEngine()),
      this._engines.set('internal:role', Pm(!0)),
      this._engines.set('aria-ref', this._createAriaIdEngine());
    for (const { name: h, engine: y } of d) this._engines.set(h, y);
    (this._stableRafCount = l),
      (this._browserName = c),
      K_({ browserNameForWorkarounds: c, inputFileRoleTextbox: u }),
      this._setupGlobalListenersRemovalDetection(),
      this._setupHitTargetInterceptors(),
      n && (this.window.__injectedScript = this);
  }
  eval(e) {
    return this.window.eval(e);
  }
  testIdAttributeNameForStrictErrorAndConsoleCodegen() {
    return this._testIdAttributeNameForStrictErrorAndConsoleCodegen;
  }
  parseSelector(e) {
    const n = na(e);
    return (
      Xx(n, s => {
        if (!this._engines.has(s.name))
          throw this.createStacklessError(`Unknown engine "${s.name}" while parsing selector ${e}`);
      }),
      n
    );
  }
  generateSelector(e, n) {
    return Fm(this, e, n);
  }
  generateSelectorSimple(e, n) {
    return Fm(this, e, {
      ...n,
      testIdAttributeName: this._testIdAttributeNameForStrictErrorAndConsoleCodegen,
    }).selector;
  }
  querySelector(e, n, s) {
    const o = this.querySelectorAll(e, n);
    if (s && o.length > 1) throw this.strictModeViolationError(e, o);
    return o[0];
  }
  _queryNth(e, n) {
    const s = [...e];
    let o = +n.body;
    return o === -1 && (o = s.length - 1), new ke(s.slice(o, o + 1));
  }
  _queryLayoutSelector(e, n, s) {
    const o = n.name,
      l = n.body,
      c = [],
      u = this.querySelectorAll(l.parsed, s);
    for (const d of e) {
      const h = My(o, d, u, l.distance);
      h !== void 0 && c.push({ element: d, score: h });
    }
    return c.sort((d, h) => d.score - h.score), new ke(c.map(d => d.element));
  }
  ariaSnapshot(e, n) {
    var o;
    if (e.nodeType !== Node.ELEMENT_NODE)
      throw this.createStacklessError('Can only capture aria snapshot of Element nodes.');
    const s = (((o = this._lastAriaSnapshot) == null ? void 0 : o.generation) || 0) + 1;
    return (this._lastAriaSnapshot = Rf(e, s)), ef(this._lastAriaSnapshot, n);
  }
  ariaSnapshotElement(e, n) {
    return e.elements.get(n) || null;
  }
  getAllByAria(e, n) {
    return vk(e.documentElement, n);
  }
  querySelectorAll(e, n) {
    if (e.capture !== void 0) {
      if (e.parts.some(o => o.name === 'nth'))
        throw this.createStacklessError("Can't query n-th element in a request with the capture.");
      const s = { parts: e.parts.slice(0, e.capture + 1) };
      if (e.capture < e.parts.length - 1) {
        const o = { parts: e.parts.slice(e.capture + 1) },
          l = { name: 'internal:has', body: { parsed: o }, source: jn(o) };
        s.parts.push(l);
      }
      return this.querySelectorAll(s, n);
    }
    if (!n.querySelectorAll) throw this.createStacklessError('Node is not queryable.');
    if (e.capture !== void 0)
      throw this.createStacklessError(
        'Internal error: there should not be a capture in the selector.'
      );
    if (
      n.nodeType === 11 &&
      e.parts.length === 1 &&
      e.parts[0].name === 'css' &&
      e.parts[0].source === ':scope'
    )
      return [n];
    this._evaluator.begin();
    try {
      let s = new ke([n]);
      for (const o of e.parts)
        if (o.name === 'nth') s = this._queryNth(s, o);
        else if (o.name === 'internal:and') {
          const l = this.querySelectorAll(o.body.parsed, n);
          s = new ke(l.filter(c => s.has(c)));
        } else if (o.name === 'internal:or') {
          const l = this.querySelectorAll(o.body.parsed, n);
          s = new ke(Uy(new ke([...s, ...l])));
        } else if (Tk.includes(o.name)) s = this._queryLayoutSelector(s, o, n);
        else {
          const l = new ke();
          for (const c of s) {
            const u = this._queryEngineAll(o, c);
            for (const d of u) l.add(d);
          }
          s = l;
        }
      return [...s];
    } finally {
      this._evaluator.end();
    }
  }
  _queryEngineAll(e, n) {
    const s = this._engines.get(e.name).queryAll(n, e.body);
    for (const o of s)
      if (!('nodeName' in o))
        throw this.createStacklessError(
          `Expected a Node but got ${Object.prototype.toString.call(o)}`
        );
    return s;
  }
  _createAttributeEngine(e, n) {
    const s = o => [
      {
        simples: [
          { selector: { css: `[${e}=${JSON.stringify(o)}]`, functions: [] }, combinator: '' },
        ],
      },
    ];
    return { queryAll: (o, l) => this._evaluator.query({ scope: o, pierceShadow: n }, s(l)) };
  }
  _createCSSEngine() {
    return { queryAll: (e, n) => this._evaluator.query({ scope: e, pierceShadow: !0 }, n) };
  }
  _createTextEngine(e, n) {
    return {
      queryAll: (o, l) => {
        const { matcher: c, kind: u } = Sl(l, n),
          d = [];
        let h = null;
        const y = m => {
          if (u === 'lax' && h && h.contains(m)) return !1;
          const w = ca(this._evaluator._cacheText, m, c);
          w === 'none' && (h = m),
            (w === 'self' || (w === 'selfAndChildren' && u === 'strict' && !n)) && d.push(m);
        };
        o.nodeType === Node.ELEMENT_NODE && y(o);
        const v = this._evaluator._queryCSS({ scope: o, pierceShadow: e }, '*');
        for (const m of v) y(m);
        return d;
      },
    };
  }
  _createInternalHasTextEngine() {
    return {
      queryAll: (e, n) => {
        if (e.nodeType !== 1) return [];
        const s = e,
          o = Lt(this._evaluator._cacheText, s),
          { matcher: l } = Sl(n, !0);
        return l(o) ? [s] : [];
      },
    };
  }
  _createInternalHasNotTextEngine() {
    return {
      queryAll: (e, n) => {
        if (e.nodeType !== 1) return [];
        const s = e,
          o = Lt(this._evaluator._cacheText, s),
          { matcher: l } = Sl(n, !0);
        return l(o) ? [] : [s];
      },
    };
  }
  _createInternalLabelEngine() {
    return {
      queryAll: (e, n) => {
        const { matcher: s } = Sl(n, !0);
        return this._evaluator
          ._queryCSS({ scope: e, pierceShadow: !0 }, '*')
          .filter(l => Ry(this._evaluator._cacheText, l).some(c => s(c)));
      },
    };
  }
  _createNamedAttributeEngine() {
    return {
      queryAll: (n, s) => {
        const o = Ir(s, !0);
        if (o.name || o.attributes.length !== 1)
          throw new Error('Malformed attribute selector: ' + s);
        const { name: l, value: c, caseSensitive: u } = o.attributes[0],
          d = u ? null : c.toLowerCase();
        let h;
        return (
          c instanceof RegExp
            ? (h = v => !!v.match(c))
            : u
              ? (h = v => v === c)
              : (h = v => v.toLowerCase().includes(d)),
          this._evaluator
            ._queryCSS({ scope: n, pierceShadow: !0 }, `[${l}]`)
            .filter(v => h(v.getAttribute(l)))
        );
      },
    };
  }
  _createControlEngine() {
    return {
      queryAll(e, n) {
        if (n === 'enter-frame') return [];
        if (n === 'return-empty') return [];
        if (n === 'component')
          return e.nodeType !== 1 ? [] : [e.childElementCount === 1 ? e.firstElementChild : e];
        throw new Error(`Internal error, unknown internal:control selector ${n}`);
      },
    };
  }
  _createHasEngine() {
    return {
      queryAll: (n, s) =>
        n.nodeType !== 1 ? [] : this.querySelector(s.parsed, n, !1) ? [n] : [],
    };
  }
  _createHasNotEngine() {
    return {
      queryAll: (n, s) =>
        n.nodeType !== 1 ? [] : this.querySelector(s.parsed, n, !1) ? [] : [n],
    };
  }
  _createVisibleEngine() {
    return {
      queryAll: (n, s) => {
        if (n.nodeType !== 1) return [];
        const o = s === 'true';
        return Ts(n) === o ? [n] : [];
      },
    };
  }
  _createInternalChainEngine() {
    return { queryAll: (n, s) => this.querySelectorAll(s.parsed, n) };
  }
  extend(e, n) {
    const s = this.window.eval(`
    (() => {
      const module = {};
      ${e}
      return module.exports.default();
    })()`);
    return new s(this, n);
  }
  async viewportRatio(e) {
    return await new Promise(n => {
      const s = new IntersectionObserver(o => {
        n(o[0].intersectionRatio), s.disconnect();
      });
      s.observe(e), Cl(() => {});
    });
  }
  getElementBorderWidth(e) {
    if (e.nodeType !== Node.ELEMENT_NODE || !e.ownerDocument || !e.ownerDocument.defaultView)
      return { left: 0, top: 0 };
    const n = e.ownerDocument.defaultView.getComputedStyle(e);
    return {
      left: parseInt(n.borderLeftWidth || '', 10),
      top: parseInt(n.borderTopWidth || '', 10),
    };
  }
  describeIFrameStyle(e) {
    if (!e.ownerDocument || !e.ownerDocument.defaultView) return 'error:notconnected';
    const n = e.ownerDocument.defaultView;
    for (let o = e; o; o = gt(o))
      if (n.getComputedStyle(o).transform !== 'none') return 'transformed';
    const s = n.getComputedStyle(e);
    return {
      left: parseInt(s.borderLeftWidth || '', 10) + parseInt(s.paddingLeft || '', 10),
      top: parseInt(s.borderTopWidth || '', 10) + parseInt(s.paddingTop || '', 10),
    };
  }
  retarget(e, n) {
    let s = e.nodeType === Node.ELEMENT_NODE ? e : e.parentElement;
    if (!s) return null;
    if (n === 'none') return s;
    if (
      (!s.matches('input, textarea, select') &&
        !s.isContentEditable &&
        (n === 'button-link'
          ? (s = s.closest('button, [role=button], a, [role=link]') || s)
          : (s = s.closest('button, [role=button], [role=checkbox], [role=radio]') || s)),
      n === 'follow-label' &&
        !s.matches(
          'a, input, textarea, button, select, [role=link], [role=button], [role=checkbox], [role=radio]'
        ) &&
        !s.isContentEditable)
    ) {
      const o = s.closest('label');
      o && o.control && (s = o.control);
    }
    return s;
  }
  async checkElementStates(e, n) {
    if (n.includes('stable')) {
      const s = await this._checkElementIsStable(e);
      if (s === !1) return { missingState: 'stable' };
      if (s === 'error:notconnected') return 'error:notconnected';
    }
    for (const s of n)
      if (s !== 'stable') {
        const o = this.elementState(e, s);
        if (o.received === 'error:notconnected') return 'error:notconnected';
        if (!o.matches) return { missingState: s };
      }
  }
  async _checkElementIsStable(e) {
    const n = Symbol('continuePolling');
    let s,
      o = 0,
      l = 0;
    const c = () => {
      const v = this.retarget(e, 'no-follow-label');
      if (!v) return 'error:notconnected';
      const m = jx.now();
      if (this._stableRafCount > 1 && m - l < 15) return n;
      l = m;
      const w = v.getBoundingClientRect(),
        S = { x: w.top, y: w.left, width: w.width, height: w.height };
      if (s) {
        if (!(S.x === s.x && S.y === s.y && S.width === s.width && S.height === s.height))
          return !1;
        if (++o >= this._stableRafCount) return !0;
      }
      return (s = S), n;
    };
    let u, d;
    const h = new Promise((v, m) => {
        (u = v), (d = m);
      }),
      y = () => {
        try {
          const v = c();
          v !== n ? u(v) : Cl(y);
        } catch (v) {
          d(v);
        }
      };
    return Cl(y), h;
  }
  _createAriaIdEngine() {
    return {
      queryAll: (n, s) => {
        var d, h, y, v;
        const o = s.match(/^s(\d+)e(\d+)$/);
        if (!o)
          throw this.createStacklessError(
            'Invalid aria-ref selector, should be of form s<number>e<number>'
          );
        const [, l, c] = o;
        if (((d = this._lastAriaSnapshot) == null ? void 0 : d.generation) !== +l)
          throw this.createStacklessError(
            `Stale aria-ref, expected s${(h = this._lastAriaSnapshot) == null ? void 0 : h.generation}e{number}, got ${s}`
          );
        const u =
          (v = (y = this._lastAriaSnapshot) == null ? void 0 : y.elements) == null
            ? void 0
            : v.get(+c);
        return u && u.isConnected ? [u] : [];
      },
    };
  }
  elementState(e, n) {
    const s = this.retarget(e, ['visible', 'hidden'].includes(n) ? 'none' : 'follow-label');
    if (!s || !s.isConnected)
      return n === 'hidden'
        ? { matches: !0, received: 'hidden' }
        : { matches: !1, received: 'error:notconnected' };
    if (n === 'visible' || n === 'hidden') {
      const o = Ts(s);
      return { matches: n === 'visible' ? o : !o, received: o ? 'visible' : 'hidden' };
    }
    if (n === 'disabled' || n === 'enabled') {
      const o = Jl(s);
      return { matches: n === 'disabled' ? o : !o, received: o ? 'disabled' : 'enabled' };
    }
    if (n === 'editable') {
      const o = Jl(s),
        l = ck(s);
      if (l === 'error')
        throw this.createStacklessError(
          'Element is not an <input>, <textarea>, <select> or [contenteditable] and does not have a role allowing [aria-readonly]'
        );
      return { matches: !o && !l, received: o ? 'disabled' : l ? 'readOnly' : 'editable' };
    }
    if (n === 'checked' || n === 'unchecked') {
      const o = n === 'checked',
        l = lk(s);
      if (l === 'error') throw this.createStacklessError('Not a checkbox or radio button');
      return { matches: o === l, received: l ? 'checked' : 'unchecked' };
    }
    if (n === 'indeterminate') {
      const o = ok(s);
      if (o === 'error') throw this.createStacklessError('Not a checkbox or radio button');
      return {
        matches: o === 'mixed',
        received: o === !0 ? 'checked' : o === !1 ? 'unchecked' : 'mixed',
      };
    }
    throw this.createStacklessError(`Unexpected element state "${n}"`);
  }
  selectOptions(e, n) {
    const s = this.retarget(e, 'follow-label');
    if (!s) return 'error:notconnected';
    if (s.nodeName.toLowerCase() !== 'select')
      throw this.createStacklessError('Element is not a <select> element');
    const o = s,
      l = [...o.options],
      c = [];
    let u = n.slice();
    for (let d = 0; d < l.length; d++) {
      const h = l[d],
        y = v => {
          if (v instanceof Node) return h === v;
          let m = !0;
          return (
            v.valueOrLabel !== void 0 &&
              (m = m && (v.valueOrLabel === h.value || v.valueOrLabel === h.label)),
            v.value !== void 0 && (m = m && v.value === h.value),
            v.label !== void 0 && (m = m && v.label === h.label),
            v.index !== void 0 && (m = m && v.index === d),
            m
          );
        };
      if (u.some(y))
        if ((c.push(h), o.multiple)) u = u.filter(v => !y(v));
        else {
          u = [];
          break;
        }
    }
    return u.length
      ? 'error:optionsnotfound'
      : ((o.value = void 0),
        c.forEach(d => (d.selected = !0)),
        o.dispatchEvent(new Event('input', { bubbles: !0, composed: !0 })),
        o.dispatchEvent(new Event('change', { bubbles: !0 })),
        c.map(d => d.value));
  }
  fill(e, n) {
    const s = this.retarget(e, 'follow-label');
    if (!s) return 'error:notconnected';
    if (s.nodeName.toLowerCase() === 'input') {
      const o = s,
        l = o.type.toLowerCase(),
        c = new ke(['color', 'date', 'time', 'datetime-local', 'month', 'range', 'week']);
      if (
        !new ke(['', 'email', 'number', 'password', 'search', 'tel', 'text', 'url']).has(l) &&
        !c.has(l)
      )
        throw this.createStacklessError(`Input of type "${l}" cannot be filled`);
      if (l === 'number' && ((n = n.trim()), isNaN(Number(n))))
        throw this.createStacklessError('Cannot type text into input[type=number]');
      if (c.has(l)) {
        if (((n = n.trim()), o.focus(), (o.value = n), o.value !== n))
          throw this.createStacklessError('Malformed value');
        return (
          s.dispatchEvent(new Event('input', { bubbles: !0, composed: !0 })),
          s.dispatchEvent(new Event('change', { bubbles: !0 })),
          'done'
        );
      }
    } else if (s.nodeName.toLowerCase() !== 'textarea') {
      if (!s.isContentEditable)
        throw this.createStacklessError(
          'Element is not an <input>, <textarea> or [contenteditable] element'
        );
    }
    return this.selectText(s), 'needsinput';
  }
  selectText(e) {
    const n = this.retarget(e, 'follow-label');
    if (!n) return 'error:notconnected';
    if (n.nodeName.toLowerCase() === 'input') {
      const l = n;
      return l.select(), l.focus(), 'done';
    }
    if (n.nodeName.toLowerCase() === 'textarea') {
      const l = n;
      return (l.selectionStart = 0), (l.selectionEnd = l.value.length), l.focus(), 'done';
    }
    const s = n.ownerDocument.createRange();
    s.selectNodeContents(n);
    const o = n.ownerDocument.defaultView.getSelection();
    return o && (o.removeAllRanges(), o.addRange(s)), n.focus(), 'done';
  }
  _activelyFocused(e) {
    const n = e.getRootNode().activeElement,
      s = n === e && !!e.ownerDocument && e.ownerDocument.hasFocus();
    return { activeElement: n, isFocused: s };
  }
  focusNode(e, n) {
    if (!e.isConnected) return 'error:notconnected';
    if (e.nodeType !== Node.ELEMENT_NODE) throw this.createStacklessError('Node is not an element');
    const { activeElement: s, isFocused: o } = this._activelyFocused(e);
    if (
      (e.isContentEditable && !o && s && s.blur && s.blur(),
      e.focus(),
      e.focus(),
      n && !o && e.nodeName.toLowerCase() === 'input')
    )
      try {
        e.setSelectionRange(0, 0);
      } catch {}
    return 'done';
  }
  blurNode(e) {
    if (!e.isConnected) return 'error:notconnected';
    if (e.nodeType !== Node.ELEMENT_NODE) throw this.createStacklessError('Node is not an element');
    return e.blur(), 'done';
  }
  setInputFiles(e, n) {
    if (e.nodeType !== Node.ELEMENT_NODE) return 'Node is not of type HTMLElement';
    const s = e;
    if (s.nodeName !== 'INPUT') return 'Not an <input> element';
    const o = s;
    if ((o.getAttribute('type') || '').toLowerCase() !== 'file')
      return 'Not an input[type=file] element';
    const c = n.map(d => {
        const h = Uint8Array.from(atob(d.buffer), y => y.charCodeAt(0));
        return new File([h], d.name, { type: d.mimeType, lastModified: d.lastModifiedMs });
      }),
      u = new DataTransfer();
    for (const d of c) u.items.add(d);
    (o.files = u.files),
      o.dispatchEvent(new Event('input', { bubbles: !0, composed: !0 })),
      o.dispatchEvent(new Event('change', { bubbles: !0 }));
  }
  expectHitTarget(e, n) {
    const s = [];
    let o = n;
    for (; o; ) {
      const y = dy(o);
      if (!y || (s.push(y), y.nodeType === 9)) break;
      o = y.host;
    }
    let l;
    for (let y = s.length - 1; y >= 0; y--) {
      const v = s[y],
        m = v.elementsFromPoint(e.x, e.y),
        w = v.elementFromPoint(e.x, e.y);
      if (w && m[0] && gt(w) === m[0]) {
        const _ = this.window.getComputedStyle(w);
        (_ == null ? void 0 : _.display) === 'contents' && m.unshift(w);
      }
      m[0] && m[0].shadowRoot === v && m[1] === w && m.shift();
      const S = m[0];
      if (!S || ((l = S), y && S !== s[y - 1].host)) break;
    }
    const c = [];
    for (; l && l !== n; ) c.push(l), (l = gt(l));
    if (l === n) return 'done';
    const u = this.previewNode(c[0] || this.document.documentElement);
    let d,
      h = n;
    for (; h; ) {
      const y = c.indexOf(h);
      if (y !== -1) {
        y > 1 && (d = this.previewNode(c[y - 1]));
        break;
      }
      h = gt(h);
    }
    return d ? { hitTargetDescription: `${u} from ${d} subtree` } : { hitTargetDescription: u };
  }
  setupHitTargetInterceptor(e, n, s, o) {
    const l = this.retarget(e, 'button-link');
    if (!l || !l.isConnected) return 'error:notconnected';
    if (s) {
      const y = this.expectHitTarget(s, l);
      if (y !== 'done') return y.hitTargetDescription;
    }
    if (n === 'drag') return { stop: () => 'done' };
    const c = {
      hover: this._hoverHitTargetInterceptorEvents,
      tap: this._tapHitTargetInterceptorEvents,
      mouse: this._mouseHitTargetInterceptorEvents,
    }[n];
    let u;
    const d = y => {
        if (!c.has(y.type) || !y.isTrusted) return;
        const v = this.window.TouchEvent && y instanceof this.window.TouchEvent ? y.touches[0] : y;
        u === void 0 && v && (u = this.expectHitTarget({ x: v.clientX, y: v.clientY }, l)),
          (o || (u !== 'done' && u !== void 0)) &&
            (y.preventDefault(), y.stopPropagation(), y.stopImmediatePropagation());
      },
      h = () => (
        this._hitTargetInterceptor === d && (this._hitTargetInterceptor = void 0), u || 'done'
      );
    return (this._hitTargetInterceptor = d), { stop: h };
  }
  dispatchEvent(e, n, s) {
    var c, u, d;
    let o;
    const l = { bubbles: !0, cancelable: !0, composed: !0, ...s };
    switch (this._eventTypes.get(n)) {
      case 'mouse':
        o = new MouseEvent(n, l);
        break;
      case 'keyboard':
        o = new KeyboardEvent(n, l);
        break;
      case 'touch': {
        if (this._browserName === 'webkit') {
          const h = v => {
              var S, _;
              if (v instanceof Touch) return v;
              let m = v.pageX;
              m === void 0 &&
                v.clientX !== void 0 &&
                (m =
                  v.clientX +
                  (((S = this.document.scrollingElement) == null ? void 0 : S.scrollLeft) || 0));
              let w = v.pageY;
              return (
                w === void 0 &&
                  v.clientY !== void 0 &&
                  (w =
                    v.clientY +
                    (((_ = this.document.scrollingElement) == null ? void 0 : _.scrollTop) || 0)),
                this.document.createTouch(
                  this.window,
                  v.target ?? e,
                  v.identifier,
                  m,
                  w,
                  v.screenX,
                  v.screenY,
                  v.radiusX,
                  v.radiusY,
                  v.rotationAngle,
                  v.force
                )
              );
            },
            y = v =>
              v instanceof TouchList || !v ? v : this.document.createTouchList(...v.map(h));
          l.target ?? (l.target = e),
            (l.touches = y(l.touches)),
            (l.targetTouches = y(l.targetTouches)),
            (l.changedTouches = y(l.changedTouches)),
            (o = new TouchEvent(n, l));
        } else
          l.target ?? (l.target = e),
            (l.touches =
              (c = l.touches) == null
                ? void 0
                : c.map(h =>
                    h instanceof Touch ? h : new Touch({ ...h, target: h.target ?? e })
                  )),
            (l.targetTouches =
              (u = l.targetTouches) == null
                ? void 0
                : u.map(h =>
                    h instanceof Touch ? h : new Touch({ ...h, target: h.target ?? e })
                  )),
            (l.changedTouches =
              (d = l.changedTouches) == null
                ? void 0
                : d.map(h =>
                    h instanceof Touch ? h : new Touch({ ...h, target: h.target ?? e })
                  )),
            (o = new TouchEvent(n, l));
        break;
      }
      case 'pointer':
        o = new PointerEvent(n, l);
        break;
      case 'focus':
        o = new FocusEvent(n, l);
        break;
      case 'drag':
        o = new DragEvent(n, l);
        break;
      case 'wheel':
        o = new WheelEvent(n, l);
        break;
      case 'deviceorientation':
        try {
          o = new DeviceOrientationEvent(n, l);
        } catch {
          const { bubbles: h, cancelable: y, alpha: v, beta: m, gamma: w, absolute: S } = l;
          (o = this.document.createEvent('DeviceOrientationEvent')),
            o.initDeviceOrientationEvent(n, h, y, v, m, w, S);
        }
        break;
      case 'devicemotion':
        try {
          o = new DeviceMotionEvent(n, l);
        } catch {
          const {
            bubbles: h,
            cancelable: y,
            acceleration: v,
            accelerationIncludingGravity: m,
            rotationRate: w,
            interval: S,
          } = l;
          (o = this.document.createEvent('DeviceMotionEvent')),
            o.initDeviceMotionEvent(n, h, y, v, m, w, S);
        }
        break;
      default:
        o = new Event(n, l);
        break;
    }
    e.dispatchEvent(o);
  }
  previewNode(e) {
    if (e.nodeType === Node.TEXT_NODE) return xl(`#text=${e.nodeValue || ''}`);
    if (e.nodeType !== Node.ELEMENT_NODE) return xl(`<${e.nodeName.toLowerCase()} />`);
    const n = e,
      s = [];
    for (let d = 0; d < n.attributes.length; d++) {
      const { name: h, value: y } = n.attributes[d];
      h !== 'style' &&
        (!y && this._booleanAttributes.has(h) ? s.push(` ${h}`) : s.push(` ${h}="${y}"`));
    }
    s.sort((d, h) => d.length - h.length);
    const o = im(s.join(''), 500);
    if (this._autoClosingTags.has(n.nodeName)) return xl(`<${n.nodeName.toLowerCase()}${o}/>`);
    const l = n.childNodes;
    let c = !1;
    if (l.length <= 5) {
      c = !0;
      for (let d = 0; d < l.length; d++) c = c && l[d].nodeType === Node.TEXT_NODE;
    }
    const u = c ? n.textContent || '' : l.length ? '…' : '';
    return xl(`<${n.nodeName.toLowerCase()}${o}>${im(u, 50)}</${n.nodeName.toLowerCase()}>`);
  }
  strictModeViolationError(e, n) {
    const s = n
        .slice(0, 10)
        .map(l => ({ preview: this.previewNode(l), selector: this.generateSelectorSimple(l) })),
      o = s.map(
        (l, c) => `
    ${c + 1}) ${l.preview} aka ${or(this._sdkLanguage, l.selector)}`
      );
    return (
      s.length < n.length &&
        o.push(`
    ...`),
      this
        .createStacklessError(`strict mode violation: ${or(this._sdkLanguage, jn(e))} resolved to ${n.length} elements:${o.join('')}
`)
    );
  }
  createStacklessError(e) {
    if (this._browserName === 'firefox') {
      const s = new Error('Error: ' + e);
      return (s.stack = ''), s;
    }
    const n = new Error(e);
    return delete n.stack, n;
  }
  createHighlight() {
    return new Nu(this);
  }
  maskSelectors(e, n) {
    this._highlight && this.hideHighlight(),
      (this._highlight = new Nu(this)),
      this._highlight.install();
    const s = [];
    for (const o of e) s.push(this.querySelectorAll(o, this.document.documentElement));
    this._highlight.maskElements(s.flat(), n);
  }
  highlight(e) {
    this._highlight || ((this._highlight = new Nu(this)), this._highlight.install()),
      this._highlight.runHighlightOnRaf(e);
  }
  hideHighlight() {
    this._highlight && (this._highlight.uninstall(), delete this._highlight);
  }
  markTargetElements(e, n) {
    var c, u;
    ((c = this._markedElements) == null ? void 0 : c.callId) !== n &&
      (this._markedElements = void 0);
    const s = ((u = this._markedElements) == null ? void 0 : u.elements) || new ke(),
      o = new CustomEvent('__playwright_unmark_target__', {
        bubbles: !0,
        cancelable: !0,
        detail: n,
        composed: !0,
      });
    for (const d of s) e.has(d) || d.dispatchEvent(o);
    const l = new CustomEvent('__playwright_mark_target__', {
      bubbles: !0,
      cancelable: !0,
      detail: n,
      composed: !0,
    });
    for (const d of e) s.has(d) || d.dispatchEvent(l);
    this._markedElements = { callId: n, elements: e };
  }
  _setupGlobalListenersRemovalDetection() {
    const e = '__playwright_global_listeners_check__';
    let n = !1;
    const s = () => (n = !0);
    this.window.addEventListener(e, s),
      new MutationObserver(o => {
        if (
          o.some(c => Array.from(c.addedNodes).includes(this.document.documentElement)) &&
          ((n = !1), this.window.dispatchEvent(new CustomEvent(e)), !n)
        ) {
          this.window.addEventListener(e, s);
          for (const c of this.onGlobalListenersRemoved) c();
        }
      }).observe(this.document, { childList: !0 });
  }
  _setupHitTargetInterceptors() {
    const e = s => {
        var o;
        return (o = this._hitTargetInterceptor) == null ? void 0 : o.call(this, s);
      },
      n = () => {
        for (const s of this._allHitTargetInterceptorEvents)
          this.window.addEventListener(s, e, { capture: !0, passive: !1 });
      };
    n(), this.onGlobalListenersRemoved.add(n);
  }
  async expect(e, n, s) {
    return n.expression === 'to.have.count' || n.expression.endsWith('.array')
      ? this.expectArray(s, n)
      : e
        ? await this.expectSingleElement(e, n)
        : !n.isNot && n.expression === 'to.be.hidden'
          ? { matches: !0 }
          : n.isNot && n.expression === 'to.be.visible'
            ? { matches: !1 }
            : !n.isNot && n.expression === 'to.be.detached'
              ? { matches: !0 }
              : n.isNot && n.expression === 'to.be.attached'
                ? { matches: !1 }
                : n.isNot && n.expression === 'to.be.in.viewport'
                  ? { matches: !1 }
                  : { matches: n.isNot, missingReceived: !0 };
  }
  async expectSingleElement(e, n) {
    var o;
    const s = n.expression;
    {
      let l;
      if (s === 'to.have.attribute') {
        const c = e.hasAttribute(n.expressionArg);
        l = { matches: c, received: c ? 'attribute present' : 'attribute not present' };
      } else if (s === 'to.be.checked') {
        const { checked: c, indeterminate: u } = n.expectedValue;
        if (u) {
          if (c !== void 0)
            throw this.createStacklessError(
              "Can't assert indeterminate and checked at the same time"
            );
          l = this.elementState(e, 'indeterminate');
        } else l = this.elementState(e, c === !1 ? 'unchecked' : 'checked');
      } else if (s === 'to.be.disabled') l = this.elementState(e, 'disabled');
      else if (s === 'to.be.editable') l = this.elementState(e, 'editable');
      else if (s === 'to.be.readonly')
        (l = this.elementState(e, 'editable')), (l.matches = !l.matches);
      else if (s === 'to.be.empty')
        if (e.nodeName === 'INPUT' || e.nodeName === 'TEXTAREA') {
          const c = e.value;
          l = { matches: !c, received: c ? 'notEmpty' : 'empty' };
        } else {
          const c = (o = e.textContent) == null ? void 0 : o.trim();
          l = { matches: !c, received: c ? 'notEmpty' : 'empty' };
        }
      else if (s === 'to.be.enabled') l = this.elementState(e, 'enabled');
      else if (s === 'to.be.focused') {
        const c = this._activelyFocused(e).isFocused;
        l = { matches: c, received: c ? 'focused' : 'inactive' };
      } else
        s === 'to.be.hidden'
          ? (l = this.elementState(e, 'hidden'))
          : s === 'to.be.visible'
            ? (l = this.elementState(e, 'visible'))
            : s === 'to.be.attached'
              ? (l = { matches: !0, received: 'attached' })
              : s === 'to.be.detached' && (l = { matches: !1, received: 'attached' });
      if (l) {
        if (l.received === 'error:notconnected')
          throw this.createStacklessError('Element is not connected');
        return l;
      }
    }
    if (s === 'to.have.property') {
      let l = e;
      const c = n.expressionArg.split('.');
      for (let h = 0; h < c.length - 1; h++) {
        if (typeof l != 'object' || !(c[h] in l)) return { received: void 0, matches: !1 };
        l = l[c[h]];
      }
      const u = l[c[c.length - 1]],
        d = nf(u, n.expectedValue);
      return { received: u, matches: d };
    }
    if (s === 'to.be.in.viewport') {
      const l = await this.viewportRatio(e);
      return {
        received: `viewport ratio ${l}`,
        matches: l > 0 && l > (n.expectedNumber ?? 0) - 1e-9,
      };
    }
    if (s === 'to.have.values') {
      if (((e = this.retarget(e, 'follow-label')), e.nodeName !== 'SELECT' || !e.multiple))
        throw this.createStacklessError('Not a select element with a multiple attribute');
      const l = [...e.selectedOptions].map(c => c.value);
      return l.length !== n.expectedText.length
        ? { received: l, matches: !1 }
        : {
            received: l,
            matches: l.map((c, u) => new _l(n.expectedText[u]).matches(c)).every(Boolean),
          };
    }
    if (s === 'to.match.aria') {
      const l = yk(e, n.expectedValue);
      return { received: l.received, matches: !!l.matches.length };
    }
    {
      let l;
      if (s === 'to.have.attribute.value') {
        const c = e.getAttribute(n.expressionArg);
        if (c === null) return { received: null, matches: !1 };
        l = c;
      } else if (['to.have.class', 'to.contain.class'].includes(s)) {
        if (!n.expectedText)
          throw this.createStacklessError('Expected text is not provided for ' + s);
        return {
          received: e.classList.toString(),
          matches: new _l(n.expectedText[0]).matchesClassList(
            this,
            e.classList,
            s === 'to.contain.class'
          ),
        };
      } else if (s === 'to.have.css')
        l = this.window.getComputedStyle(e).getPropertyValue(n.expressionArg);
      else if (s === 'to.have.id') l = e.id;
      else if (s === 'to.have.text') l = n.useInnerText ? e.innerText : Lt(new be(), e).full;
      else if (s === 'to.have.accessible.name') l = Xi(e, !1);
      else if (s === 'to.have.accessible.description') l = jm(e, !1);
      else if (s === 'to.have.accessible.error.message') l = sk(e);
      else if (s === 'to.have.role') l = et(e) || '';
      else if (s === 'to.have.title') l = this.document.title;
      else if (s === 'to.have.url') l = this.document.location.href;
      else if (s === 'to.have.value') {
        if (
          ((e = this.retarget(e, 'follow-label')),
          e.nodeName !== 'INPUT' && e.nodeName !== 'TEXTAREA' && e.nodeName !== 'SELECT')
        )
          throw this.createStacklessError('Not an input element');
        l = e.value;
      }
      if (l !== void 0 && n.expectedText) {
        const c = new _l(n.expectedText[0]);
        return { received: l, matches: c.matches(l) };
      }
    }
    throw this.createStacklessError('Unknown expect matcher: ' + s);
  }
  expectArray(e, n) {
    const s = n.expression;
    if (s === 'to.have.count') {
      const d = e.length,
        h = d === n.expectedNumber;
      return { received: d, matches: h };
    }
    if (!n.expectedText) throw this.createStacklessError('Expected text is not provided for ' + s);
    if (['to.have.class.array', 'to.contain.class.array'].includes(s)) {
      const d = e.map(v => v.classList),
        h = d.map(String);
      if (d.length !== n.expectedText.length) return { received: h, matches: !1 };
      const y = this._matchSequentially(n.expectedText, d, (v, m) =>
        v.matchesClassList(this, m, s === 'to.contain.class.array')
      );
      return { received: h, matches: y };
    }
    if (!['to.contain.text.array', 'to.have.text.array'].includes(s))
      throw this.createStacklessError('Unknown expect matcher: ' + s);
    const o = e.map(d => (n.useInnerText ? d.innerText : Lt(new be(), d).full)),
      l = s !== 'to.contain.text.array';
    if (!(o.length === n.expectedText.length || !l)) return { received: o, matches: !1 };
    const u = this._matchSequentially(n.expectedText, o, (d, h) => d.matches(h));
    return { received: o, matches: u };
  }
  _matchSequentially(e, n, s) {
    const o = e.map(u => new _l(u));
    let l = 0,
      c = 0;
    for (; l < o.length && c < n.length; ) s(o[l], n[c]) && ++l, ++c;
    return l === o.length;
  }
}
function xl(t) {
  return t.replace(/\n/g, '↵').replace(/\t/g, '⇆');
}
function db(t) {
  if (((t = t.substring(1, t.length - 1)), !t.includes('\\'))) return t;
  const e = [];
  let n = 0;
  for (; n < t.length; ) t[n] === '\\' && n + 1 < t.length && n++, e.push(t[n++]);
  return e.join('');
}
function Sl(t, e) {
  if (t[0] === '/' && t.lastIndexOf('/') > 0) {
    const o = t.lastIndexOf('/'),
      l = new RegExp(t.substring(1, o), t.substring(o + 1));
    return { matcher: c => l.test(c.full), kind: 'regex' };
  }
  const n = e ? JSON.parse.bind(JSON) : db;
  let s = !1;
  return (
    t.length > 1 && t[0] === '"' && t[t.length - 1] === '"'
      ? ((t = n(t)), (s = !0))
      : e && t.length > 1 && t[0] === '"' && t[t.length - 2] === '"' && t[t.length - 1] === 'i'
        ? ((t = n(t.substring(0, t.length - 1))), (s = !1))
        : e && t.length > 1 && t[0] === '"' && t[t.length - 2] === '"' && t[t.length - 1] === 's'
          ? ((t = n(t.substring(0, t.length - 1))), (s = !0))
          : t.length > 1 && t[0] === "'" && t[t.length - 1] === "'" && ((t = n(t)), (s = !0)),
    (t = vt(t)),
    s
      ? e
        ? { kind: 'strict', matcher: l => l.normalized === t }
        : {
            matcher: l => (!t && !l.immediate.length ? !0 : l.immediate.some(c => vt(c) === t)),
            kind: 'strict',
          }
      : ((t = t.toLowerCase()),
        { kind: 'lax', matcher: o => o.normalized.toLowerCase().includes(t) })
  );
}
class _l {
  constructor(e) {
    if (
      ((this._normalizeWhiteSpace = e.normalizeWhiteSpace),
      (this._ignoreCase = e.ignoreCase),
      (this._string = e.matchSubstring ? void 0 : this.normalize(e.string)),
      (this._substring = e.matchSubstring ? this.normalize(e.string) : void 0),
      e.regexSource)
    ) {
      const n = new ke((e.regexFlags || '').split(''));
      e.ignoreCase === !1 && n.delete('i'),
        e.ignoreCase === !0 && n.add('i'),
        (this._regex = new RegExp(e.regexSource, [...n].join('')));
    }
  }
  matches(e) {
    return (
      this._regex || (e = this.normalize(e)),
      this._string !== void 0
        ? e === this._string
        : this._substring !== void 0
          ? e.includes(this._substring)
          : this._regex
            ? !!this._regex.test(e)
            : !1
    );
  }
  matchesClassList(e, n, s) {
    if (s) {
      if (this._regex)
        throw e.createStacklessError(
          'Partial matching does not support regular expressions. Please provide a string value.'
        );
      return this._string
        .split(/\s+/g)
        .filter(Boolean)
        .every(o => n.contains(o));
    }
    return this.matches(n.toString());
  }
  normalize(e) {
    return (
      e &&
      (this._normalizeWhiteSpace && (e = vt(e)), this._ignoreCase && (e = e.toLocaleLowerCase()), e)
    );
  }
}
function nf(t, e) {
  if (t === e) return !0;
  if (t && e && typeof t == 'object' && typeof e == 'object') {
    if (t.constructor !== e.constructor) return !1;
    if (Array.isArray(t)) {
      if (t.length !== e.length) return !1;
      for (let s = 0; s < t.length; ++s) if (!nf(t[s], e[s])) return !1;
      return !0;
    }
    if (t instanceof RegExp) return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === e.toString();
    const n = Object.keys(t);
    if (n.length !== Object.keys(e).length) return !1;
    for (let s = 0; s < n.length; ++s) if (!e.hasOwnProperty(n[s])) return !1;
    for (const s of n) if (!nf(t[s], e[s])) return !1;
    return !0;
  }
  return typeof t == 'number' && typeof e == 'number' ? isNaN(t) && isNaN(e) : !1;
}
const hb = {
    tagName: 'svg',
    children: [
      {
        tagName: 'defs',
        children: [
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-gripper',
            },
            children: [
              {
                tagName: 'path',
                attrs: { d: 'M5 3h2v2H5zm0 4h2v2H5zm0 4h2v2H5zm4-8h2v2H9zm0 4h2v2H9zm0 4h2v2H9z' },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-circle-large-filled',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  d: 'M8 1a6.8 6.8 0 0 1 1.86.253 6.899 6.899 0 0 1 3.083 1.805 6.903 6.903 0 0 1 1.804 3.083C14.916 6.738 15 7.357 15 8s-.084 1.262-.253 1.86a6.9 6.9 0 0 1-.704 1.674 7.157 7.157 0 0 1-2.516 2.509 6.966 6.966 0 0 1-1.668.71A6.984 6.984 0 0 1 8 15a6.984 6.984 0 0 1-1.86-.246 7.098 7.098 0 0 1-1.674-.711 7.3 7.3 0 0 1-1.415-1.094 7.295 7.295 0 0 1-1.094-1.415 7.098 7.098 0 0 1-.71-1.675A6.985 6.985 0 0 1 1 8c0-.643.082-1.262.246-1.86a6.968 6.968 0 0 1 .711-1.667 7.156 7.156 0 0 1 2.509-2.516 6.895 6.895 0 0 1 1.675-.704A6.808 6.808 0 0 1 8 1z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-inspect',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M1 3l1-1h12l1 1v6h-1V3H2v8h5v1H2l-1-1V3zm14.707 9.707L9 6v9.414l2.707-2.707h4zM10 13V8.414l3.293 3.293h-2L10 13z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-whole-word',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M0 11H1V13H15V11H16V14H15H1H0V11Z',
                },
              },
              {
                tagName: 'path',
                attrs: {
                  d: 'M6.84048 11H5.95963V10.1406H5.93814C5.555 10.7995 4.99104 11.1289 4.24625 11.1289C3.69839 11.1289 3.26871 10.9839 2.95718 10.6938C2.64924 10.4038 2.49527 10.0189 2.49527 9.53906C2.49527 8.51139 3.10041 7.91341 4.3107 7.74512L5.95963 7.51416C5.95963 6.57959 5.58186 6.1123 4.82632 6.1123C4.16389 6.1123 3.56591 6.33789 3.03238 6.78906V5.88672C3.57307 5.54297 4.19612 5.37109 4.90152 5.37109C6.19416 5.37109 6.84048 6.05501 6.84048 7.42285V11ZM5.95963 8.21777L4.63297 8.40039C4.22476 8.45768 3.91682 8.55973 3.70914 8.70654C3.50145 8.84977 3.39761 9.10579 3.39761 9.47461C3.39761 9.74316 3.4925 9.96338 3.68228 10.1353C3.87564 10.3035 4.13166 10.3877 4.45035 10.3877C4.8872 10.3877 5.24706 10.2355 5.52994 9.93115C5.8164 9.62321 5.95963 9.2347 5.95963 8.76562V8.21777Z',
                },
              },
              {
                tagName: 'path',
                attrs: {
                  d: 'M9.3475 10.2051H9.32601V11H8.44515V2.85742H9.32601V6.4668H9.3475C9.78076 5.73633 10.4146 5.37109 11.2489 5.37109C11.9543 5.37109 12.5057 5.61816 12.9032 6.1123C13.3042 6.60286 13.5047 7.26172 13.5047 8.08887C13.5047 9.00911 13.2809 9.74674 12.8333 10.3018C12.3857 10.8532 11.7734 11.1289 10.9964 11.1289C10.2695 11.1289 9.71989 10.821 9.3475 10.2051ZM9.32601 7.98682V8.75488C9.32601 9.20964 9.47282 9.59635 9.76644 9.91504C10.0636 10.2301 10.4396 10.3877 10.8944 10.3877C11.4279 10.3877 11.8451 10.1836 12.1458 9.77539C12.4502 9.36719 12.6024 8.79964 12.6024 8.07275C12.6024 7.46045 12.4609 6.98063 12.1781 6.6333C11.8952 6.28597 11.512 6.1123 11.0286 6.1123C10.5166 6.1123 10.1048 6.29134 9.7933 6.64941C9.48177 7.00391 9.32601 7.44971 9.32601 7.98682Z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-eye',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  d: 'M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-symbol-constant',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M4 6h8v1H4V6zm8 3H4v1h8V9z',
                },
              },
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M1 4l1-1h12l1 1v8l-1 1H2l-1-1V4zm1 0v8h12V4H2z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-check',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-close',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-pass',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  d: 'M6.27 10.87h.71l4.56-4.56-.71-.71-4.2 4.21-1.92-1.92L4 8.6l2.27 2.27z',
                },
              },
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z',
                },
              },
            ],
          },
          {
            tagName: 'clipPath',
            attrs: {
              width: '16',
              height: '16',
              viewBox: '0 0 16 16',
              fill: 'currentColor',
              id: 'icon-gist',
            },
            children: [
              {
                tagName: 'path',
                attrs: {
                  'fill-rule': 'evenodd',
                  'clip-rule': 'evenodd',
                  d: 'M10.57 1.14l3.28 3.3.15.36v9.7l-.5.5h-11l-.5-.5v-13l.5-.5h7.72l.35.14zM10 5h3l-3-3v3zM3 2v12h10V6H9.5L9 5.5V2H3zm2.062 7.533l1.817-1.828L6.17 7 4 9.179v.707l2.171 2.174.707-.707-1.816-1.82zM8.8 7.714l.7-.709 2.189 2.175v.709L9.5 12.062l-.705-.709 1.831-1.82L8.8 7.714z',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  Qt = { multiple: '#f6b26b7f', single: '#6fa8dc7f', assert: '#8acae480', action: '#dc6f6f7f' };
class qm {
  cursor() {
    return 'default';
  }
}
class ju {
  constructor(e, n) {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      (this._recorder = e),
      (this._assertVisibility = n);
  }
  cursor() {
    return 'pointer';
  }
  cleanup() {
    (this._hoveredModel = null), (this._hoveredElement = null);
  }
  onClick(e) {
    var n;
    De(e),
      e.button === 0 &&
        (n = this._hoveredModel) != null &&
        n.selector &&
        this._commit(this._hoveredModel.selector, this._hoveredModel);
  }
  onPointerDown(e) {
    De(e);
  }
  onPointerUp(e) {
    De(e);
  }
  onMouseDown(e) {
    De(e);
  }
  onMouseUp(e) {
    De(e);
  }
  onMouseMove(e) {
    var o;
    De(e);
    let n = this._recorder.deepEventTarget(e);
    if ((n.isConnected || (n = null), this._hoveredElement === n)) return;
    this._hoveredElement = n;
    let s = null;
    if (this._hoveredElement) {
      const l = this._recorder.injectedScript.generateSelector(this._hoveredElement, {
        testIdAttributeName: this._recorder.state.testIdAttributeName,
        multiple: !1,
      });
      s = {
        selector: l.selector,
        elements: l.elements,
        tooltipText: this._recorder.injectedScript.utils.asLocator(
          this._recorder.state.language,
          l.selector
        ),
        color: this._assertVisibility ? Qt.assert : Qt.single,
      };
    }
    ((o = this._hoveredModel) == null ? void 0 : o.selector) !==
      (s == null ? void 0 : s.selector) &&
      ((this._hoveredModel = s), this._recorder.updateHighlight(s, !0));
  }
  onMouseEnter(e) {
    De(e);
  }
  onMouseLeave(e) {
    De(e);
    const n = this._recorder.injectedScript.window;
    n.top !== n &&
      this._recorder.deepEventTarget(e).nodeType === Node.DOCUMENT_NODE &&
      this._reset(!0);
  }
  onKeyDown(e) {
    De(e), e.key === 'Escape' && this._assertVisibility && this._recorder.setMode('recording');
  }
  onKeyUp(e) {
    De(e);
  }
  onScroll(e) {
    this._reset(!1);
  }
  _commit(e, n) {
    var s;
    this._assertVisibility
      ? (this._recorder.recordAction({ name: 'assertVisible', selector: e, signals: [] }),
        this._recorder.setMode('recording'),
        (s = this._recorder.overlay) == null || s.flashToolSucceeded('assertingVisibility'))
      : this._recorder.elementPicked(e, n);
  }
  _reset(e) {
    (this._hoveredElement = null),
      (this._hoveredModel = null),
      this._recorder.updateHighlight(null, e);
  }
}
class pb {
  constructor(e) {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      (this._activeModel = null),
      (this._expectProgrammaticKeyUp = !1),
      (this._recorder = e),
      (this._performingActions = new e.injectedScript.utils.builtins.Set());
  }
  cursor() {
    return 'pointer';
  }
  cleanup() {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      (this._activeModel = null),
      (this._expectProgrammaticKeyUp = !1);
  }
  onClick(e) {
    if (
      Pu(this._hoveredElement) ||
      (e.button === 2 && e.type === 'auxclick') ||
      this._shouldIgnoreMouseEvent(e) ||
      this._actionInProgress(e) ||
      this._consumedDueToNoModel(e, this._hoveredModel)
    )
      return;
    const n = $u(this._recorder.deepEventTarget(e));
    if (n) {
      this._performAction({
        name: n.checked ? 'check' : 'uncheck',
        selector: this._hoveredModel.selector,
        signals: [],
      });
      return;
    }
    this._cancelPendingClickAction(),
      e.detail === 1 &&
        (this._pendingClickAction = {
          action: {
            name: 'click',
            selector: this._hoveredModel.selector,
            position: Mu(e),
            signals: [],
            button: Hm(e),
            modifiers: Ou(e),
            clickCount: e.detail,
          },
          timeout: this._recorder.injectedScript.utils.builtins.setTimeout(
            () => this._commitPendingClickAction(),
            200
          ),
        });
  }
  onDblClick(e) {
    Pu(this._hoveredElement) ||
      this._shouldIgnoreMouseEvent(e) ||
      this._actionInProgress(e) ||
      this._consumedDueToNoModel(e, this._hoveredModel) ||
      (this._cancelPendingClickAction(),
      this._performAction({
        name: 'click',
        selector: this._hoveredModel.selector,
        position: Mu(e),
        signals: [],
        button: Hm(e),
        modifiers: Ou(e),
        clickCount: e.detail,
      }));
  }
  _commitPendingClickAction() {
    this._pendingClickAction && this._performAction(this._pendingClickAction.action),
      this._cancelPendingClickAction();
  }
  _cancelPendingClickAction() {
    this._pendingClickAction &&
      this._recorder.injectedScript.utils.builtins.clearTimeout(this._pendingClickAction.timeout),
      (this._pendingClickAction = void 0);
  }
  onContextMenu(e) {
    this._shouldIgnoreMouseEvent(e) ||
      this._actionInProgress(e) ||
      this._consumedDueToNoModel(e, this._hoveredModel) ||
      this._performAction({
        name: 'click',
        selector: this._hoveredModel.selector,
        position: Mu(e),
        signals: [],
        button: 'right',
        modifiers: 0,
        clickCount: 0,
      });
  }
  onPointerDown(e) {
    this._shouldIgnoreMouseEvent(e) || this._performingActions.size || De(e);
  }
  onPointerUp(e) {
    this._shouldIgnoreMouseEvent(e) || this._performingActions.size || De(e);
  }
  onMouseDown(e) {
    this._shouldIgnoreMouseEvent(e) ||
      (this._performingActions.size || De(e), (this._activeModel = this._hoveredModel));
  }
  onMouseUp(e) {
    this._shouldIgnoreMouseEvent(e) || this._performingActions.size || De(e);
  }
  onMouseMove(e) {
    const n = this._recorder.deepEventTarget(e);
    this._hoveredElement !== n &&
      ((this._hoveredElement = n), this._updateModelForHoveredElement());
  }
  onMouseLeave(e) {
    const n = this._recorder.injectedScript.window;
    n.top !== n &&
      this._recorder.deepEventTarget(e).nodeType === Node.DOCUMENT_NODE &&
      ((this._hoveredElement = null), this._updateModelForHoveredElement());
  }
  onFocus(e) {
    this._onFocus(!0);
  }
  onInput(e) {
    const n = this._recorder.deepEventTarget(e);
    if (n.nodeName === 'INPUT' && n.type.toLowerCase() === 'file') {
      this._recorder.recordAction({
        name: 'setInputFiles',
        selector: this._activeModel.selector,
        signals: [],
        files: [...(n.files || [])].map(s => s.name),
      });
      return;
    }
    if (Pu(n)) {
      this._recorder.recordAction({
        name: 'fill',
        selector: this._hoveredModel.selector,
        signals: [],
        text: n.value,
      });
      return;
    }
    if (['INPUT', 'TEXTAREA'].includes(n.nodeName) || n.isContentEditable) {
      if (
        (n.nodeName === 'INPUT' && ['checkbox', 'radio'].includes(n.type.toLowerCase())) ||
        this._consumedDueWrongTarget(e)
      )
        return;
      this._recorder.recordAction({
        name: 'fill',
        selector: this._activeModel.selector,
        signals: [],
        text: n.isContentEditable ? n.innerText : n.value,
      });
    }
    if (n.nodeName === 'SELECT') {
      const s = n;
      if (this._actionInProgress(e)) return;
      this._performAction({
        name: 'select',
        selector: this._activeModel.selector,
        options: [...s.selectedOptions].map(o => o.value),
        signals: [],
      });
    }
  }
  onKeyDown(e) {
    if (this._shouldGenerateKeyPressFor(e)) {
      if (this._actionInProgress(e)) {
        this._expectProgrammaticKeyUp = !0;
        return;
      }
      if (!this._consumedDueWrongTarget(e)) {
        if (e.key === ' ') {
          const n = $u(this._recorder.deepEventTarget(e));
          if (n) {
            this._performAction({
              name: n.checked ? 'uncheck' : 'check',
              selector: this._activeModel.selector,
              signals: [],
            });
            return;
          }
        }
        this._performAction({
          name: 'press',
          selector: this._activeModel.selector,
          signals: [],
          key: e.key,
          modifiers: Ou(e),
        });
      }
    }
  }
  onKeyUp(e) {
    if (this._shouldGenerateKeyPressFor(e)) {
      if (!this._expectProgrammaticKeyUp) {
        De(e);
        return;
      }
      this._expectProgrammaticKeyUp = !1;
    }
  }
  onScroll(e) {
    (this._hoveredModel = null),
      (this._hoveredElement = null),
      this._recorder.updateHighlight(null, !1);
  }
  _onFocus(e) {
    const n = vb(this._recorder.document);
    if (e && n === this._recorder.document.body) return;
    const s = n
      ? this._recorder.injectedScript.generateSelector(n, {
          testIdAttributeName: this._recorder.state.testIdAttributeName,
        })
      : null;
    (this._activeModel = s && s.selector ? { ...s, color: Qt.action } : null),
      e && ((this._hoveredElement = n), this._updateModelForHoveredElement());
  }
  _shouldIgnoreMouseEvent(e) {
    const n = this._recorder.deepEventTarget(e),
      s = n.nodeName;
    return !!(
      s === 'SELECT' ||
      s === 'OPTION' ||
      (s === 'INPUT' && ['date', 'range'].includes(n.type))
    );
  }
  _actionInProgress(e) {
    const n = e instanceof KeyboardEvent,
      s = e instanceof MouseEvent || e instanceof PointerEvent;
    for (const o of this._performingActions)
      if (
        (n && o.name === 'press' && e.key === o.key) ||
        (s && (o.name === 'click' || o.name === 'check' || o.name === 'uncheck'))
      )
        return !0;
    return De(e), !1;
  }
  _consumedDueToNoModel(e, n) {
    return n ? !1 : (De(e), !0);
  }
  _consumedDueWrongTarget(e) {
    return this._activeModel && this._activeModel.elements[0] === this._recorder.deepEventTarget(e)
      ? !1
      : (De(e), !0);
  }
  _performAction(e) {
    (this._hoveredElement = null),
      (this._hoveredModel = null),
      (this._activeModel = null),
      this._recorder.updateHighlight(null, !1),
      this._performingActions.add(e),
      this._recorder.performAction(e).then(() => {
        this._performingActions.delete(e),
          this._onFocus(!1),
          this._recorder.injectedScript.isUnderTest &&
            console.error(
              'Action performed for test: ' +
                JSON.stringify({
                  hovered: this._hoveredModel ? this._hoveredModel.selector : null,
                  active: this._activeModel ? this._activeModel.selector : null,
                })
            );
      });
  }
  _shouldGenerateKeyPressFor(e) {
    if (
      (e.key === 'Enter' &&
        (this._recorder.deepEventTarget(e).nodeName === 'TEXTAREA' ||
          this._recorder.deepEventTarget(e).isContentEditable)) ||
      ['Backspace', 'Delete', 'AltGraph'].includes(e.key) ||
      (e.key === '@' && e.code === 'KeyL')
    )
      return !1;
    if (navigator.platform.includes('Mac')) {
      if (e.key === 'v' && e.metaKey) return !1;
    } else if ((e.key === 'v' && e.ctrlKey) || (e.key === 'Insert' && e.shiftKey)) return !1;
    if (['Shift', 'Control', 'Meta', 'Alt', 'Process'].includes(e.key)) return !1;
    const n = e.ctrlKey || e.altKey || e.metaKey;
    return e.key.length === 1 && !n ? !!$u(this._recorder.deepEventTarget(e)) : !0;
  }
  _updateModelForHoveredElement() {
    if (this._performingActions.size) return;
    if (!this._hoveredElement || !this._hoveredElement.isConnected) {
      (this._hoveredModel = null),
        (this._hoveredElement = null),
        this._recorder.updateHighlight(null, !0);
      return;
    }
    const { selector: e, elements: n } = this._recorder.injectedScript.generateSelector(
      this._hoveredElement,
      { testIdAttributeName: this._recorder.state.testIdAttributeName }
    );
    (this._hoveredModel && this._hoveredModel.selector === e) ||
      ((this._hoveredModel = e ? { selector: e, elements: n, color: Qt.action } : null),
      this._recorder.updateHighlight(this._hoveredModel, !0));
  }
}
class Iu {
  constructor(e, n) {
    (this._hoverHighlight = null),
      (this._action = null),
      (this._recorder = e),
      (this._textCache = new e.injectedScript.utils.builtins.Map()),
      (this._kind = n),
      (this._dialog = new yb(e));
  }
  cursor() {
    return 'pointer';
  }
  cleanup() {
    this._dialog.close(), (this._hoverHighlight = null);
  }
  onClick(e) {
    De(e),
      this._kind === 'value'
        ? this._commitAssertValue()
        : this._dialog.isShowing() || this._showDialog();
  }
  onMouseDown(e) {
    const n = this._recorder.deepEventTarget(e);
    this._elementHasValue(n) && e.preventDefault();
  }
  onPointerUp(e) {
    var s;
    const n = (s = this._hoverHighlight) == null ? void 0 : s.elements[0];
    this._kind === 'value' &&
      n &&
      (n.nodeName === 'INPUT' || n.nodeName === 'SELECT') &&
      n.disabled &&
      this._commitAssertValue();
  }
  onMouseMove(e) {
    var s;
    if (this._dialog.isShowing()) return;
    const n = this._recorder.deepEventTarget(e);
    if (((s = this._hoverHighlight) == null ? void 0 : s.elements[0]) !== n) {
      if (this._kind === 'text' || this._kind === 'snapshot')
        this._hoverHighlight = this._recorder.injectedScript.utils.elementText(this._textCache, n)
          .full
          ? { elements: [n], selector: '', color: Qt.assert }
          : null;
      else if (this._elementHasValue(n)) {
        const o = this._recorder.injectedScript.generateSelector(n, {
          testIdAttributeName: this._recorder.state.testIdAttributeName,
        });
        this._hoverHighlight = { selector: o.selector, elements: o.elements, color: Qt.assert };
      } else this._hoverHighlight = null;
      this._recorder.updateHighlight(this._hoverHighlight, !0);
    }
  }
  onKeyDown(e) {
    e.key === 'Escape' && this._recorder.setMode('recording'), De(e);
  }
  onScroll(e) {
    this._recorder.updateHighlight(this._hoverHighlight, !1);
  }
  _elementHasValue(e) {
    return (
      e.nodeName === 'TEXTAREA' ||
      e.nodeName === 'SELECT' ||
      (e.nodeName === 'INPUT' && !['button', 'image', 'reset', 'submit'].includes(e.type))
    );
  }
  _generateAction() {
    var n;
    this._textCache.clear();
    const e = (n = this._hoverHighlight) == null ? void 0 : n.elements[0];
    if (!e) return null;
    if (this._kind === 'value') {
      if (!this._elementHasValue(e)) return null;
      const { selector: s } = this._recorder.injectedScript.generateSelector(e, {
        testIdAttributeName: this._recorder.state.testIdAttributeName,
      });
      return e.nodeName === 'INPUT' && ['checkbox', 'radio'].includes(e.type.toLowerCase())
        ? { name: 'assertChecked', selector: s, signals: [], checked: !e.checked }
        : { name: 'assertValue', selector: s, signals: [], value: e.value };
    } else if (this._kind === 'snapshot') {
      const s = this._recorder.injectedScript.generateSelector(e, {
        testIdAttributeName: this._recorder.state.testIdAttributeName,
        forTextExpect: !0,
      });
      return (
        (this._hoverHighlight = { selector: s.selector, elements: s.elements, color: Qt.assert }),
        this._recorder.updateHighlight(this._hoverHighlight, !0),
        {
          name: 'assertSnapshot',
          selector: this._hoverHighlight.selector,
          signals: [],
          snapshot: this._recorder.injectedScript.ariaSnapshot(e, { mode: 'regex' }),
        }
      );
    } else {
      const s = this._recorder.injectedScript.generateSelector(e, {
        testIdAttributeName: this._recorder.state.testIdAttributeName,
        forTextExpect: !0,
      });
      return (
        (this._hoverHighlight = { selector: s.selector, elements: s.elements, color: Qt.assert }),
        this._recorder.updateHighlight(this._hoverHighlight, !0),
        {
          name: 'assertText',
          selector: this._hoverHighlight.selector,
          signals: [],
          text: this._recorder.injectedScript.utils.elementText(this._textCache, e).normalized,
          substring: !0,
        }
      );
    }
  }
  _renderValue(e) {
    return (e == null ? void 0 : e.name) === 'assertText'
      ? this._recorder.injectedScript.utils.normalizeWhiteSpace(e.text)
      : (e == null ? void 0 : e.name) === 'assertChecked'
        ? String(e.checked)
        : (e == null ? void 0 : e.name) === 'assertValue'
          ? e.value
          : (e == null ? void 0 : e.name) === 'assertSnapshot'
            ? e.snapshot
            : '';
  }
  _commit() {
    !this._action ||
      !this._dialog.isShowing() ||
      (this._dialog.close(),
      this._recorder.recordAction(this._action),
      this._recorder.setMode('recording'));
  }
  _showDialog() {
    var e, n, s, o;
    (e = this._hoverHighlight) != null &&
      e.elements[0] &&
      ((this._action = this._generateAction()),
      ((n = this._action) == null ? void 0 : n.name) === 'assertText'
        ? this._showTextDialog(this._action)
        : ((s = this._action) == null ? void 0 : s.name) === 'assertSnapshot' &&
          (this._recorder.recordAction(this._action),
          this._recorder.setMode('recording'),
          (o = this._recorder.overlay) == null || o.flashToolSucceeded('assertingSnapshot')));
  }
  _showTextDialog(e) {
    const n = this._recorder.document.createElement('textarea');
    n.setAttribute('spellcheck', 'false'),
      (n.value = this._renderValue(e)),
      n.classList.add('text-editor');
    const s = () => {
      var v;
      const u = this._recorder.injectedScript.utils.normalizeWhiteSpace(n.value),
        d = (v = this._hoverHighlight) == null ? void 0 : v.elements[0];
      if (!d) return;
      e.text = u;
      const h = this._recorder.injectedScript.utils.elementText(this._textCache, d).normalized,
        y = u && h.includes(u);
      n.classList.toggle('does-not-match', !y);
    };
    n.addEventListener('input', s);
    const l = this._dialog.show({
        label: 'Assert that element contains text',
        body: n,
        onCommit: () => this._commit(),
      }),
      c = this._recorder.highlight.tooltipPosition(this._recorder.highlight.firstBox(), l);
    this._dialog.moveTo(c.anchorTop, c.anchorLeft), n.focus();
  }
  _commitAssertValue() {
    var n;
    if (this._kind !== 'value') return;
    const e = this._generateAction();
    e &&
      (this._recorder.recordAction(e),
      this._recorder.setMode('recording'),
      (n = this._recorder.overlay) == null || n.flashToolSucceeded('assertingValue'));
  }
}
class mb {
  constructor(e) {
    (this._listeners = []),
      (this._offsetX = 0),
      (this._measure = { width: 0, height: 0 }),
      (this._recorder = e);
    const n = this._recorder.document;
    this._overlayElement = n.createElement('x-pw-overlay');
    const s = n.createElement('x-pw-tools-list');
    this._overlayElement.appendChild(s),
      (this._dragHandle = n.createElement('x-pw-tool-gripper')),
      this._dragHandle.appendChild(n.createElement('x-div')),
      s.appendChild(this._dragHandle),
      (this._recordToggle = this._recorder.document.createElement('x-pw-tool-item')),
      (this._recordToggle.title = 'Record'),
      this._recordToggle.classList.add('record'),
      this._recordToggle.appendChild(this._recorder.document.createElement('x-div')),
      s.appendChild(this._recordToggle),
      (this._pickLocatorToggle = this._recorder.document.createElement('x-pw-tool-item')),
      (this._pickLocatorToggle.title = 'Pick locator'),
      this._pickLocatorToggle.classList.add('pick-locator'),
      this._pickLocatorToggle.appendChild(this._recorder.document.createElement('x-div')),
      s.appendChild(this._pickLocatorToggle),
      (this._assertVisibilityToggle = this._recorder.document.createElement('x-pw-tool-item')),
      (this._assertVisibilityToggle.title = 'Assert visibility'),
      this._assertVisibilityToggle.classList.add('visibility'),
      this._assertVisibilityToggle.appendChild(this._recorder.document.createElement('x-div')),
      s.appendChild(this._assertVisibilityToggle),
      (this._assertTextToggle = this._recorder.document.createElement('x-pw-tool-item')),
      (this._assertTextToggle.title = 'Assert text'),
      this._assertTextToggle.classList.add('text'),
      this._assertTextToggle.appendChild(this._recorder.document.createElement('x-div')),
      s.appendChild(this._assertTextToggle),
      (this._assertValuesToggle = this._recorder.document.createElement('x-pw-tool-item')),
      (this._assertValuesToggle.title = 'Assert value'),
      this._assertValuesToggle.classList.add('value'),
      this._assertValuesToggle.appendChild(this._recorder.document.createElement('x-div')),
      s.appendChild(this._assertValuesToggle),
      (this._assertSnapshotToggle = this._recorder.document.createElement('x-pw-tool-item')),
      (this._assertSnapshotToggle.title = 'Assert snapshot'),
      this._assertSnapshotToggle.classList.add('snapshot'),
      this._assertSnapshotToggle.appendChild(this._recorder.document.createElement('x-div')),
      s.appendChild(this._assertSnapshotToggle),
      this._updateVisualPosition(),
      this._refreshListeners();
  }
  _refreshListeners() {
    sv(this._listeners),
      (this._listeners = [
        Me(this._dragHandle, 'mousedown', e => {
          this._dragState = { offsetX: this._offsetX, dragStart: { x: e.clientX, y: 0 } };
        }),
        Me(this._recordToggle, 'click', () => {
          this._recordToggle.classList.contains('disabled') ||
            this._recorder.setMode(
              this._recorder.state.mode === 'none' ||
                this._recorder.state.mode === 'standby' ||
                this._recorder.state.mode === 'inspecting'
                ? 'recording'
                : 'standby'
            );
        }),
        Me(this._pickLocatorToggle, 'click', () => {
          if (this._pickLocatorToggle.classList.contains('disabled')) return;
          const e = {
            inspecting: 'standby',
            none: 'inspecting',
            standby: 'inspecting',
            recording: 'recording-inspecting',
            'recording-inspecting': 'recording',
            assertingText: 'recording-inspecting',
            assertingVisibility: 'recording-inspecting',
            assertingValue: 'recording-inspecting',
            assertingSnapshot: 'recording-inspecting',
          };
          this._recorder.setMode(e[this._recorder.state.mode]);
        }),
        Me(this._assertVisibilityToggle, 'click', () => {
          this._assertVisibilityToggle.classList.contains('disabled') ||
            this._recorder.setMode(
              this._recorder.state.mode === 'assertingVisibility'
                ? 'recording'
                : 'assertingVisibility'
            );
        }),
        Me(this._assertTextToggle, 'click', () => {
          this._assertTextToggle.classList.contains('disabled') ||
            this._recorder.setMode(
              this._recorder.state.mode === 'assertingText' ? 'recording' : 'assertingText'
            );
        }),
        Me(this._assertValuesToggle, 'click', () => {
          this._assertValuesToggle.classList.contains('disabled') ||
            this._recorder.setMode(
              this._recorder.state.mode === 'assertingValue' ? 'recording' : 'assertingValue'
            );
        }),
        Me(this._assertSnapshotToggle, 'click', () => {
          this._assertSnapshotToggle.classList.contains('disabled') ||
            this._recorder.setMode(
              this._recorder.state.mode === 'assertingSnapshot' ? 'recording' : 'assertingSnapshot'
            );
        }),
      ]);
  }
  install() {
    this._recorder.highlight.appendChild(this._overlayElement),
      this._refreshListeners(),
      this._updateVisualPosition();
  }
  contains(e) {
    return this._recorder.injectedScript.utils.isInsideScope(this._overlayElement, e);
  }
  setUIState(e) {
    this._recordToggle.classList.toggle(
      'toggled',
      e.mode === 'recording' ||
        e.mode === 'assertingText' ||
        e.mode === 'assertingVisibility' ||
        e.mode === 'assertingValue' ||
        e.mode === 'assertingSnapshot' ||
        e.mode === 'recording-inspecting'
    ),
      this._pickLocatorToggle.classList.toggle(
        'toggled',
        e.mode === 'inspecting' || e.mode === 'recording-inspecting'
      ),
      this._assertVisibilityToggle.classList.toggle('toggled', e.mode === 'assertingVisibility'),
      this._assertVisibilityToggle.classList.toggle(
        'disabled',
        e.mode === 'none' || e.mode === 'standby' || e.mode === 'inspecting'
      ),
      this._assertTextToggle.classList.toggle('toggled', e.mode === 'assertingText'),
      this._assertTextToggle.classList.toggle(
        'disabled',
        e.mode === 'none' || e.mode === 'standby' || e.mode === 'inspecting'
      ),
      this._assertValuesToggle.classList.toggle('toggled', e.mode === 'assertingValue'),
      this._assertValuesToggle.classList.toggle(
        'disabled',
        e.mode === 'none' || e.mode === 'standby' || e.mode === 'inspecting'
      ),
      this._assertSnapshotToggle.classList.toggle('toggled', e.mode === 'assertingSnapshot'),
      this._assertSnapshotToggle.classList.toggle(
        'disabled',
        e.mode === 'none' || e.mode === 'standby' || e.mode === 'inspecting'
      ),
      this._offsetX !== e.overlay.offsetX &&
        ((this._offsetX = e.overlay.offsetX), this._updateVisualPosition()),
      e.mode === 'none' ? this._hideOverlay() : this._showOverlay();
  }
  flashToolSucceeded(e) {
    let n;
    e === 'assertingVisibility'
      ? (n = this._assertVisibilityToggle)
      : e === 'assertingSnapshot'
        ? (n = this._assertSnapshotToggle)
        : (n = this._assertValuesToggle),
      n.classList.add('succeeded'),
      this._recorder.injectedScript.utils.builtins.setTimeout(
        () => n.classList.remove('succeeded'),
        2e3
      );
  }
  _hideOverlay() {
    this._overlayElement.setAttribute('hidden', 'true');
  }
  _showOverlay() {
    this._overlayElement.hasAttribute('hidden') &&
      (this._overlayElement.removeAttribute('hidden'), this._updateVisualPosition());
  }
  _updateVisualPosition() {
    (this._measure = this._overlayElement.getBoundingClientRect()),
      (this._overlayElement.style.left =
        (this._recorder.injectedScript.window.innerWidth - this._measure.width) / 2 +
        this._offsetX +
        'px');
  }
  onMouseMove(e) {
    if (!e.buttons) return (this._dragState = void 0), !1;
    if (this._dragState) {
      this._offsetX = this._dragState.offsetX + e.clientX - this._dragState.dragStart.x;
      const n = (this._recorder.injectedScript.window.innerWidth - this._measure.width) / 2 - 10;
      return (
        (this._offsetX = Math.max(-n, Math.min(n, this._offsetX))),
        this._updateVisualPosition(),
        this._recorder.setOverlayState({ offsetX: this._offsetX }),
        De(e),
        !0
      );
    }
    return !1;
  }
  onMouseUp(e) {
    return this._dragState ? (De(e), !0) : !1;
  }
  onClick(e) {
    return this._dragState ? ((this._dragState = void 0), De(e), !0) : !1;
  }
  onDblClick(e) {
    return !1;
  }
}
class gb {
  constructor(e) {
    (this._listeners = []),
      (this._lastHighlightedSelector = void 0),
      (this._lastHighlightedAriaTemplateJSON = 'undefined'),
      (this.state = {
        mode: 'none',
        testIdAttributeName: 'data-testid',
        language: 'javascript',
        overlay: { offsetX: 0 },
      }),
      (this._delegate = {}),
      (this.document = e.document),
      (this.injectedScript = e),
      (this.highlight = e.createHighlight()),
      (this._tools = {
        none: new qm(),
        standby: new qm(),
        inspecting: new ju(this, !1),
        recording: new pb(this),
        'recording-inspecting': new ju(this, !1),
        assertingText: new Iu(this, 'text'),
        assertingVisibility: new ju(this, !0),
        assertingValue: new Iu(this, 'value'),
        assertingSnapshot: new Iu(this, 'snapshot'),
      }),
      (this._currentTool = this._tools.none),
      e.window.top === e.window &&
        ((this.overlay = new mb(this)), this.overlay.setUIState(this.state)),
      (this._stylesheet = new e.window.CSSStyleSheet()),
      this._stylesheet.replaceSync(`
      body[data-pw-cursor=pointer] *, body[data-pw-cursor=pointer] *::after { cursor: pointer !important; }
      body[data-pw-cursor=text] *, body[data-pw-cursor=text] *::after { cursor: text !important; }
    `),
      this.installListeners(),
      e.utils.cacheNormalizedWhitespaces(),
      e.isUnderTest && console.error('Recorder script ready for test');
  }
  installListeners() {
    var s;
    sv(this._listeners),
      (this._listeners = [
        Me(this.document, 'click', o => this._onClick(o), !0),
        Me(this.document, 'auxclick', o => this._onClick(o), !0),
        Me(this.document, 'dblclick', o => this._onDblClick(o), !0),
        Me(this.document, 'contextmenu', o => this._onContextMenu(o), !0),
        Me(this.document, 'dragstart', o => this._onDragStart(o), !0),
        Me(this.document, 'input', o => this._onInput(o), !0),
        Me(this.document, 'keydown', o => this._onKeyDown(o), !0),
        Me(this.document, 'keyup', o => this._onKeyUp(o), !0),
        Me(this.document, 'pointerdown', o => this._onPointerDown(o), !0),
        Me(this.document, 'pointerup', o => this._onPointerUp(o), !0),
        Me(this.document, 'mousedown', o => this._onMouseDown(o), !0),
        Me(this.document, 'mouseup', o => this._onMouseUp(o), !0),
        Me(this.document, 'mousemove', o => this._onMouseMove(o), !0),
        Me(this.document, 'mouseleave', o => this._onMouseLeave(o), !0),
        Me(this.document, 'mouseenter', o => this._onMouseEnter(o), !0),
        Me(this.document, 'focus', o => this._onFocus(o), !0),
        Me(this.document, 'scroll', o => this._onScroll(o), !0),
      ]),
      this.highlight.install();
    let e;
    const n = () => {
      this.highlight.install(), (e = this.injectedScript.utils.builtins.setTimeout(n, 500));
    };
    (e = this.injectedScript.utils.builtins.setTimeout(n, 500)),
      this._listeners.push(() => this.injectedScript.utils.builtins.clearTimeout(e)),
      this.highlight.appendChild(iv(this.document, hb)),
      (s = this.overlay) == null || s.install(),
      this.document.adoptedStyleSheets.push(this._stylesheet);
  }
  _switchCurrentTool() {
    var n, s, o;
    const e = this._tools[this.state.mode];
    e !== this._currentTool &&
      ((s = (n = this._currentTool).cleanup) == null || s.call(n),
      this.clearHighlight(),
      (this._currentTool = e),
      (o = this.injectedScript.document.body) == null ||
        o.setAttribute('data-pw-cursor', e.cursor()));
  }
  setUIState(e, n) {
    var l;
    (this._delegate = n),
      (e.actionPoint &&
        this.state.actionPoint &&
        e.actionPoint.x === this.state.actionPoint.x &&
        e.actionPoint.y === this.state.actionPoint.y) ||
        (!e.actionPoint && !this.state.actionPoint) ||
        (e.actionPoint
          ? this.highlight.showActionPoint(e.actionPoint.x, e.actionPoint.y)
          : this.highlight.hideActionPoint()),
      (this.state = e),
      this.highlight.setLanguage(e.language),
      this._switchCurrentTool(),
      (l = this.overlay) == null || l.setUIState(e);
    let s = 'noop';
    if (e.actionSelector !== this._lastHighlightedSelector) {
      const c = e.actionSelector
        ? wb(this.injectedScript, e.language, e.actionSelector, this.document)
        : null;
      (s = c != null && c.length ? c : 'clear'),
        (this._lastHighlightedSelector = c != null && c.length ? e.actionSelector : void 0);
    }
    const o = JSON.stringify(e.ariaTemplate);
    if (this._lastHighlightedAriaTemplateJSON !== o) {
      const c = e.ariaTemplate
        ? this.injectedScript.getAllByAria(this.document, e.ariaTemplate)
        : [];
      if (c.length) {
        const u = c.length > 1 ? Qt.multiple : Qt.single;
        (s = c.map(d => ({ element: d, color: u }))), (this._lastHighlightedAriaTemplateJSON = o);
      } else
        this._lastHighlightedSelector || (s = 'clear'),
          (this._lastHighlightedAriaTemplateJSON = 'undefined');
    }
    s === 'clear'
      ? this.highlight.clearHighlight()
      : s !== 'noop' && this.highlight.updateHighlight(s);
  }
  clearHighlight() {
    this.updateHighlight(null, !1);
  }
  _onClick(e) {
    var n, s, o;
    e.isTrusted &&
      (((n = this.overlay) != null && n.onClick(e)) ||
        this._ignoreOverlayEvent(e) ||
        (o = (s = this._currentTool).onClick) == null ||
        o.call(s, e));
  }
  _onDblClick(e) {
    var n, s, o;
    e.isTrusted &&
      (((n = this.overlay) != null && n.onDblClick(e)) ||
        this._ignoreOverlayEvent(e) ||
        (o = (s = this._currentTool).onDblClick) == null ||
        o.call(s, e));
  }
  _onContextMenu(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onContextMenu) == null ||
        s.call(n, e));
  }
  _onDragStart(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onDragStart) == null ||
        s.call(n, e));
  }
  _onPointerDown(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onPointerDown) == null ||
        s.call(n, e));
  }
  _onPointerUp(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onPointerUp) == null ||
        s.call(n, e));
  }
  _onMouseDown(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onMouseDown) == null ||
        s.call(n, e));
  }
  _onMouseUp(e) {
    var n, s, o;
    e.isTrusted &&
      (((n = this.overlay) != null && n.onMouseUp(e)) ||
        this._ignoreOverlayEvent(e) ||
        (o = (s = this._currentTool).onMouseUp) == null ||
        o.call(s, e));
  }
  _onMouseMove(e) {
    var n, s, o;
    e.isTrusted &&
      (((n = this.overlay) != null && n.onMouseMove(e)) ||
        this._ignoreOverlayEvent(e) ||
        (o = (s = this._currentTool).onMouseMove) == null ||
        o.call(s, e));
  }
  _onMouseEnter(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onMouseEnter) == null ||
        s.call(n, e));
  }
  _onMouseLeave(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onMouseLeave) == null ||
        s.call(n, e));
  }
  _onFocus(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onFocus) == null ||
        s.call(n, e));
  }
  _onScroll(e) {
    var n, s;
    e.isTrusted &&
      ((this._lastHighlightedSelector = void 0),
      (this._lastHighlightedAriaTemplateJSON = 'undefined'),
      this.highlight.hideActionPoint(),
      (s = (n = this._currentTool).onScroll) == null || s.call(n, e));
  }
  _onInput(e) {
    var n, s;
    this._ignoreOverlayEvent(e) || (s = (n = this._currentTool).onInput) == null || s.call(n, e);
  }
  _onKeyDown(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onKeyDown) == null ||
        s.call(n, e));
  }
  _onKeyUp(e) {
    var n, s;
    e.isTrusted &&
      (this._ignoreOverlayEvent(e) ||
        (s = (n = this._currentTool).onKeyUp) == null ||
        s.call(n, e));
  }
  updateHighlight(e, n) {
    (this._lastHighlightedSelector = void 0),
      (this._lastHighlightedAriaTemplateJSON = 'undefined'),
      this._updateHighlight(e, n);
  }
  _updateHighlight(e, n) {
    var o, l;
    let s = e == null ? void 0 : e.tooltipText;
    s === void 0 &&
      e != null &&
      e.selector &&
      (s = this.injectedScript.utils.asLocator(this.state.language, e.selector)),
      e
        ? this.highlight.updateHighlight(
            e.elements.map(c => ({ element: c, color: e.color, tooltipText: s }))
          )
        : this.highlight.clearHighlight(),
      n && ((l = (o = this._delegate).highlightUpdated) == null || l.call(o));
  }
  _ignoreOverlayEvent(e) {
    return e.composedPath().some(n => (n.nodeName || '').toLowerCase() === 'x-pw-glass');
  }
  deepEventTarget(e) {
    var n;
    for (const s of e.composedPath()) if (!((n = this.overlay) != null && n.contains(s))) return s;
    return e.composedPath()[0];
  }
  setMode(e) {
    var n, s;
    (s = (n = this._delegate).setMode) == null || s.call(n, e);
  }
  async performAction(e) {
    var n, s;
    await ((s = (n = this._delegate).performAction) == null
      ? void 0
      : s.call(n, e).catch(() => {}));
  }
  recordAction(e) {
    var n, s;
    (s = (n = this._delegate).recordAction) == null || s.call(n, e);
  }
  setOverlayState(e) {
    var n, s;
    (s = (n = this._delegate).setOverlayState) == null || s.call(n, e);
  }
  elementPicked(e, n) {
    var o, l;
    const s = this.injectedScript.ariaSnapshot(n.elements[0]);
    (l = (o = this._delegate).elementPicked) == null || l.call(o, { selector: e, ariaSnapshot: s });
  }
}
class yb {
  constructor(e) {
    (this._dialogElement = null), (this._recorder = e);
  }
  isShowing() {
    return !!this._dialogElement;
  }
  show(e) {
    const n = this._recorder.document.createElement('x-pw-tool-item');
    (n.title = 'Accept'),
      n.classList.add('accept'),
      n.appendChild(this._recorder.document.createElement('x-div')),
      n.addEventListener('click', () => e.onCommit());
    const s = this._recorder.document.createElement('x-pw-tool-item');
    (s.title = 'Close'),
      s.classList.add('cancel'),
      s.appendChild(this._recorder.document.createElement('x-div')),
      s.addEventListener('click', () => {
        var u;
        this.close(), (u = e.onCancel) == null || u.call(e);
      }),
      (this._dialogElement = this._recorder.document.createElement('x-pw-dialog')),
      (this._keyboardListener = u => {
        var d;
        if (u.key === 'Escape') {
          this.close(), (d = e.onCancel) == null || d.call(e);
          return;
        }
        if (u.key === 'Enter' && (u.ctrlKey || u.metaKey)) {
          this._dialogElement && e.onCommit();
          return;
        }
      }),
      this._recorder.document.addEventListener('keydown', this._keyboardListener, !0);
    const o = this._recorder.document.createElement('x-pw-tools-list'),
      l = this._recorder.document.createElement('label');
    (l.textContent = e.label),
      o.appendChild(l),
      o.appendChild(this._recorder.document.createElement('x-spacer')),
      o.appendChild(n),
      o.appendChild(s),
      this._dialogElement.appendChild(o);
    const c = this._recorder.document.createElement('x-pw-dialog-body');
    return (
      c.appendChild(e.body),
      this._dialogElement.appendChild(c),
      this._recorder.highlight.appendChild(this._dialogElement),
      this._dialogElement
    );
  }
  moveTo(e, n) {
    this._dialogElement &&
      ((this._dialogElement.style.top = e + 'px'), (this._dialogElement.style.left = n + 'px'));
  }
  close() {
    this._dialogElement &&
      (this._dialogElement.remove(),
      this._recorder.document.removeEventListener('keydown', this._keyboardListener),
      (this._dialogElement = null));
  }
}
function vb(t) {
  let e = t.activeElement;
  for (; e && e.shadowRoot && e.shadowRoot.activeElement; ) e = e.shadowRoot.activeElement;
  return e;
}
function Ou(t) {
  return (t.altKey ? 1 : 0) | (t.ctrlKey ? 2 : 0) | (t.metaKey ? 4 : 0) | (t.shiftKey ? 8 : 0);
}
function Hm(t) {
  switch (t.which) {
    case 1:
      return 'left';
    case 2:
      return 'middle';
    case 3:
      return 'right';
  }
  return 'left';
}
function Mu(t) {
  if (t.target.nodeName === 'CANVAS') return { x: t.offsetX, y: t.offsetY };
}
function De(t) {
  t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation();
}
function $u(t) {
  if (!t || t.nodeName !== 'INPUT') return null;
  const e = t;
  return ['checkbox', 'radio'].includes(e.type) ? e : null;
}
function Pu(t) {
  return !t || t.nodeName !== 'INPUT' ? !1 : t.type.toLowerCase() === 'range';
}
function Me(t, e, n, s) {
  return (
    t.addEventListener(e, n, s),
    () => {
      t.removeEventListener(e, n, s);
    }
  );
}
function sv(t) {
  for (const e of t) e();
  t.splice(0, t.length);
}
function wb(t, e, n, s) {
  try {
    const o = t.parseSelector(n),
      l = t.querySelectorAll(o, s),
      c = l.length > 1 ? Qt.multiple : Qt.single,
      u = t.utils.asLocator(e, n);
    return l.map((d, h) => {
      const y = l.length > 1 ? ` [${h + 1} of ${l.length}]` : '';
      return { element: d, color: c, tooltipText: u + y };
    });
  } catch {
    return [];
  }
}
function iv(t, { tagName: e, attrs: n, children: s }) {
  const o = t.createElementNS('http://www.w3.org/2000/svg', e);
  if (n) for (const [l, c] of Object.entries(n)) o.setAttribute(l, c);
  if (s) for (const l of s) o.appendChild(iv(t, l));
  return o;
}
function Bf(t, e, n) {
  return `internal:attr=[${t}=${mt(e, (n == null ? void 0 : n.exact) || !1)}]`;
}
function xb(t, e) {
  return `internal:testid=[${t}=${mt(e, !0)}]`;
}
function Sb(t, e) {
  return 'internal:label=' + Ct(t, !!(e != null && e.exact));
}
function _b(t, e) {
  return Bf('alt', t, e);
}
function kb(t, e) {
  return Bf('title', t, e);
}
function bb(t, e) {
  return Bf('placeholder', t, e);
}
function Eb(t, e) {
  return 'internal:text=' + Ct(t, !!(e != null && e.exact));
}
function Tb(t, e = {}) {
  const n = [];
  return (
    e.checked !== void 0 && n.push(['checked', String(e.checked)]),
    e.disabled !== void 0 && n.push(['disabled', String(e.disabled)]),
    e.selected !== void 0 && n.push(['selected', String(e.selected)]),
    e.expanded !== void 0 && n.push(['expanded', String(e.expanded)]),
    e.includeHidden !== void 0 && n.push(['include-hidden', String(e.includeHidden)]),
    e.level !== void 0 && n.push(['level', String(e.level)]),
    e.name !== void 0 && n.push(['name', mt(e.name, !!e.exact)]),
    e.pressed !== void 0 && n.push(['pressed', String(e.pressed)]),
    `internal:role=${t}${n.map(([s, o]) => `[${s}=${o}]`).join('')}`
  );
}
const Fi = Symbol('selector'),
  Nb = class Hi {
    constructor(e, n, s) {
      if (
        (s != null && s.hasText && (n += ` >> internal:has-text=${Ct(s.hasText, !1)}`),
        s != null && s.hasNotText && (n += ` >> internal:has-not-text=${Ct(s.hasNotText, !1)}`),
        s != null && s.has && (n += ' >> internal:has=' + JSON.stringify(s.has[Fi])),
        s != null && s.hasNot && (n += ' >> internal:has-not=' + JSON.stringify(s.hasNot[Fi])),
        (s == null ? void 0 : s.visible) !== void 0 &&
          (n += ` >> visible=${s.visible ? 'true' : 'false'}`),
        (this[Fi] = n),
        n)
      ) {
        const c = e.parseSelector(n);
        (this.element = e.querySelector(c, e.document, !1)),
          (this.elements = e.querySelectorAll(c, e.document));
      }
      const o = n,
        l = this;
      (l.locator = (c, u) => new Hi(e, o ? o + ' >> ' + c : c, u)),
        (l.getByTestId = c =>
          l.locator(xb(e.testIdAttributeNameForStrictErrorAndConsoleCodegen(), c))),
        (l.getByAltText = (c, u) => l.locator(_b(c, u))),
        (l.getByLabel = (c, u) => l.locator(Sb(c, u))),
        (l.getByPlaceholder = (c, u) => l.locator(bb(c, u))),
        (l.getByText = (c, u) => l.locator(Eb(c, u))),
        (l.getByTitle = (c, u) => l.locator(kb(c, u))),
        (l.getByRole = (c, u = {}) => l.locator(Tb(c, u))),
        (l.filter = c => new Hi(e, n, c)),
        (l.first = () => l.locator('nth=0')),
        (l.last = () => l.locator('nth=-1')),
        (l.nth = c => l.locator(`nth=${c}`)),
        (l.and = c => new Hi(e, o + ' >> internal:and=' + JSON.stringify(c[Fi]))),
        (l.or = c => new Hi(e, o + ' >> internal:or=' + JSON.stringify(c[Fi])));
    }
  };
let Cb = Nb;
class Ab {
  constructor(e) {
    (this._injectedScript = e),
      !this._injectedScript.window.playwright &&
        ((this._injectedScript.window.playwright = {
          $: (n, s) => this._querySelector(n, !!s),
          $$: n => this._querySelectorAll(n),
          inspect: n => this._inspect(n),
          selector: n => this._selector(n),
          generateLocator: (n, s) => this._generateLocator(n, s),
          ariaSnapshot: (n, s) =>
            this._injectedScript.ariaSnapshot(n || this._injectedScript.document.body, s),
          resume: () => this._resume(),
          ...new Cb(e, ''),
        }),
        delete this._injectedScript.window.playwright.filter,
        delete this._injectedScript.window.playwright.first,
        delete this._injectedScript.window.playwright.last,
        delete this._injectedScript.window.playwright.nth,
        delete this._injectedScript.window.playwright.and,
        delete this._injectedScript.window.playwright.or);
  }
  _querySelector(e, n) {
    if (typeof e != 'string') throw new Error("Usage: playwright.query('Playwright >> selector').");
    const s = this._injectedScript.parseSelector(e);
    return this._injectedScript.querySelector(s, this._injectedScript.document, n);
  }
  _querySelectorAll(e) {
    if (typeof e != 'string') throw new Error("Usage: playwright.$$('Playwright >> selector').");
    const n = this._injectedScript.parseSelector(e);
    return this._injectedScript.querySelectorAll(n, this._injectedScript.document);
  }
  _inspect(e) {
    if (typeof e != 'string')
      throw new Error("Usage: playwright.inspect('Playwright >> selector').");
    this._injectedScript.window.inspect(this._querySelector(e, !1));
  }
  _selector(e) {
    if (!(e instanceof Element)) throw new Error('Usage: playwright.selector(element).');
    return this._injectedScript.generateSelectorSimple(e);
  }
  _generateLocator(e, n) {
    if (!(e instanceof Element)) throw new Error('Usage: playwright.locator(element).');
    const s = this._injectedScript.generateSelectorSimple(e);
    return or(n || 'javascript', s);
  }
  _resume() {
    this._injectedScript.window.__pw_resume().catch(() => {});
  }
}
function Lb(t, e) {
  t = t
    .replace(/AriaRole\s*\.\s*([\w]+)/g, (l, c) => c.toLowerCase())
    .replace(
      /(get_by_role|getByRole)\s*\(\s*(?:["'`])([^'"`]+)['"`]/g,
      (l, c, u) => `${c}(${u.toLowerCase()}`
    );
  const n = [];
  let s = '';
  for (let l = 0; l < t.length; ++l) {
    const c = t[l];
    if (c !== '"' && c !== "'" && c !== '`' && c !== '/') {
      s += c;
      continue;
    }
    const u = t[l - 1] === 'r' || t[l] === '/';
    ++l;
    let d = '';
    for (; l < t.length; ) {
      if (t[l] === '\\') {
        u
          ? (t[l + 1] !== c && (d += t[l]), ++l, (d += t[l]))
          : (++l,
            t[l] === 'n'
              ? (d += `
`)
              : t[l] === 'r'
                ? (d += '\r')
                : t[l] === 't'
                  ? (d += '	')
                  : (d += t[l])),
          ++l;
        continue;
      }
      if (t[l] !== c) {
        d += t[l++];
        continue;
      }
      break;
    }
    n.push({ quote: c, text: d }), (s += (c === '/' ? 'r' : '') + '$' + n.length);
  }
  s = s
    .toLowerCase()
    .replace(/get_by_alt_text/g, 'getbyalttext')
    .replace(/get_by_test_id/g, 'getbytestid')
    .replace(/get_by_([\w]+)/g, 'getby$1')
    .replace(/has_not_text/g, 'hasnottext')
    .replace(/has_text/g, 'hastext')
    .replace(/has_not/g, 'hasnot')
    .replace(/frame_locator/g, 'framelocator')
    .replace(/content_frame/g, 'contentframe')
    .replace(/[{}\s]/g, '')
    .replace(/new\(\)/g, '')
    .replace(/new[\w]+\.[\w]+options\(\)/g, '')
    .replace(/\.set/g, ',set')
    .replace(/\.or_\(/g, 'or(')
    .replace(/\.and_\(/g, 'and(')
    .replace(/:/g, '=')
    .replace(/,re\.ignorecase/g, 'i')
    .replace(/,pattern.case_insensitive/g, 'i')
    .replace(/,regexoptions.ignorecase/g, 'i')
    .replace(/re.compile\(([^)]+)\)/g, '$1')
    .replace(/pattern.compile\(([^)]+)\)/g, 'r$1')
    .replace(/newregex\(([^)]+)\)/g, 'r$1')
    .replace(/string=/g, '=')
    .replace(/regex=/g, '=')
    .replace(/,,/g, ',')
    .replace(/,\)/g, ')');
  const o = n.map(l => l.quote).filter(l => '\'"`'.includes(l))[0];
  return { selector: ov(s, n, e), preferredQuote: o };
}
function Vm(t) {
  return [...t.matchAll(/\$\d+/g)].length;
}
function Wm(t, e) {
  return t.replace(/\$(\d+)/g, (n, s) => `$${s - e}`);
}
function ov(t, e, n) {
  for (;;) {
    const o = t.match(/filter\(,?(has=|hasnot=|sethas\(|sethasnot\()/);
    if (!o) break;
    const l = o.index + o[0].length;
    let c = 0,
      u = l;
    for (; u < t.length && (t[u] === '(' ? c++ : t[u] === ')' && c--, !(c < 0)); u++);
    let d = t.substring(0, l),
      h = 0;
    ['sethas(', 'sethasnot('].includes(o[1]) &&
      ((h = 1), (d = d.replace(/sethas\($/, 'has=').replace(/sethasnot\($/, 'hasnot=')));
    const y = Vm(t.substring(0, l)),
      v = Wm(t.substring(l, u), y),
      m = Vm(v),
      w = e.slice(y, y + m),
      S = JSON.stringify(ov(v, w, n));
    t = d.replace(/=$/, '2=') + `$${y + 1}` + Wm(t.substring(u + h), m - 1);
    const _ = e.slice(0, y),
      b = e.slice(y + m);
    e = _.concat([{ quote: '"', text: S }]).concat(b);
  }
  t = t
    .replace(/\,set([\w]+)\(([^)]+)\)/g, (o, l, c) => ',' + l.toLowerCase() + '=' + c.toLowerCase())
    .replace(/framelocator\(([^)]+)\)/g, '$1.internal:control=enter-frame')
    .replace(/contentframe(\(\))?/g, 'internal:control=enter-frame')
    .replace(/locator\(([^)]+),hastext=([^),]+)\)/g, 'locator($1).internal:has-text=$2')
    .replace(/locator\(([^)]+),hasnottext=([^),]+)\)/g, 'locator($1).internal:has-not-text=$2')
    .replace(/locator\(([^)]+),hastext=([^),]+)\)/g, 'locator($1).internal:has-text=$2')
    .replace(/locator\(([^)]+)\)/g, '$1')
    .replace(/getbyrole\(([^)]+)\)/g, 'internal:role=$1')
    .replace(/getbytext\(([^)]+)\)/g, 'internal:text=$1')
    .replace(/getbylabel\(([^)]+)\)/g, 'internal:label=$1')
    .replace(/getbytestid\(([^)]+)\)/g, `internal:testid=[${n}=$1]`)
    .replace(/getby(placeholder|alt|title)(?:text)?\(([^)]+)\)/g, 'internal:attr=[$1=$2]')
    .replace(/first(\(\))?/g, 'nth=0')
    .replace(/last(\(\))?/g, 'nth=-1')
    .replace(/nth\(([^)]+)\)/g, 'nth=$1')
    .replace(/filter\(,?visible=true\)/g, 'visible=true')
    .replace(/filter\(,?visible=false\)/g, 'visible=false')
    .replace(/filter\(,?hastext=([^)]+)\)/g, 'internal:has-text=$1')
    .replace(/filter\(,?hasnottext=([^)]+)\)/g, 'internal:has-not-text=$1')
    .replace(/filter\(,?has2=([^)]+)\)/g, 'internal:has=$1')
    .replace(/filter\(,?hasnot2=([^)]+)\)/g, 'internal:has-not=$1')
    .replace(/,exact=false/g, '')
    .replace(/,exact=true/g, 's')
    .replace(/,includehidden=/g, ',include-hidden=')
    .replace(/\,/g, '][');
  const s = t.split('.');
  for (let o = 0; o < s.length - 1; o++)
    if (s[o] === 'internal:control=enter-frame' && s[o + 1].startsWith('nth=')) {
      const [l] = s.splice(o, 1);
      s.splice(o + 1, 0, l);
    }
  return s
    .map(o =>
      !o.startsWith('internal:') || o === 'internal:control'
        ? o.replace(/\$(\d+)/g, (l, c) => e[+c - 1].text)
        : ((o = o.includes('[') ? o.replace(/\]/, '') + ']' : o),
          (o = o
            .replace(/(?:r)\$(\d+)(i)?/g, (l, c, u) => {
              const d = e[+c - 1];
              return o.startsWith('internal:attr') ||
                o.startsWith('internal:testid') ||
                o.startsWith('internal:role')
                ? mt(new RegExp(d.text), !1) + (u || '')
                : Ct(new RegExp(d.text, u), !1);
            })
            .replace(/\$(\d+)(i|s)?/g, (l, c, u) => {
              const d = e[+c - 1];
              return o.startsWith('internal:has=') || o.startsWith('internal:has-not=')
                ? d.text
                : o.startsWith('internal:testid')
                  ? mt(d.text, !0)
                  : o.startsWith('internal:attr') || o.startsWith('internal:role')
                    ? mt(d.text, u === 's')
                    : Ct(d.text, u === 's');
            })),
          o)
    )
    .join(' >> ');
}
function jb(t, e, n) {
  try {
    return Ib(t, e, n);
  } catch {
    return '';
  }
}
function Ib(t, e, n) {
  try {
    return na(e), e;
  } catch {}
  const { selector: s, preferredQuote: o } = Lb(e, n),
    l = $g(t, s, void 0, void 0, o),
    c = Km(t, e);
  return l.some(u => Km(t, u) === c) ? s : '';
}
function Km(t, e) {
  return (
    (e = e.replace(/\s/g, '')),
    t === 'javascript' && (e = e.replace(/\\?["`]/g, "'").replace(/,{}/g, '')),
    e
  );
}
const Ob = ({ url: t }) =>
    x.jsxs('div', {
      className: 'browser-frame-header',
      children: [
        x.jsxs('div', {
          style: { whiteSpace: 'nowrap' },
          children: [
            x.jsx('span', {
              className: 'browser-frame-dot',
              style: { backgroundColor: 'rgb(242, 95, 88)' },
            }),
            x.jsx('span', {
              className: 'browser-frame-dot',
              style: { backgroundColor: 'rgb(251, 190, 60)' },
            }),
            x.jsx('span', {
              className: 'browser-frame-dot',
              style: { backgroundColor: 'rgb(88, 203, 66)' },
            }),
          ],
        }),
        x.jsxs('div', {
          className: 'browser-frame-address-bar',
          title: t || 'about:blank',
          children: [t || 'about:blank', t && x.jsx(mf, { value: t })],
        }),
        x.jsx('div', {
          style: { marginLeft: 'auto' },
          children: x.jsxs('div', {
            children: [
              x.jsx('span', { className: 'browser-frame-menu-bar' }),
              x.jsx('span', { className: 'browser-frame-menu-bar' }),
              x.jsx('span', { className: 'browser-frame-menu-bar' }),
            ],
          }),
        }),
      ],
    }),
  Uf = Symbol.for('yaml.alias'),
  rf = Symbol.for('yaml.document'),
  lr = Symbol.for('yaml.map'),
  lv = Symbol.for('yaml.pair'),
  yn = Symbol.for('yaml.scalar'),
  Ds = Symbol.for('yaml.seq'),
  Xt = Symbol.for('yaml.node.type'),
  Rr = t => !!t && typeof t == 'object' && t[Xt] === Uf,
  Dr = t => !!t && typeof t == 'object' && t[Xt] === rf,
  Fs = t => !!t && typeof t == 'object' && t[Xt] === lr,
  $e = t => !!t && typeof t == 'object' && t[Xt] === lv,
  Ne = t => !!t && typeof t == 'object' && t[Xt] === yn,
  zs = t => !!t && typeof t == 'object' && t[Xt] === Ds;
function Fe(t) {
  if (t && typeof t == 'object')
    switch (t[Xt]) {
      case lr:
      case Ds:
        return !0;
    }
  return !1;
}
function ze(t) {
  if (t && typeof t == 'object')
    switch (t[Xt]) {
      case Uf:
      case lr:
      case yn:
      case Ds:
        return !0;
    }
  return !1;
}
const Mb = t => (Ne(t) || Fe(t)) && !!t.anchor,
  At = Symbol('break visit'),
  av = Symbol('skip children'),
  gn = Symbol('remove node');
function ar(t, e) {
  const n = cv(e);
  Dr(t)
    ? _s(null, t.contents, n, Object.freeze([t])) === gn && (t.contents = null)
    : _s(null, t, n, Object.freeze([]));
}
ar.BREAK = At;
ar.SKIP = av;
ar.REMOVE = gn;
function _s(t, e, n, s) {
  const o = uv(t, e, n, s);
  if (ze(o) || $e(o)) return fv(t, s, o), _s(t, o, n, s);
  if (typeof o != 'symbol') {
    if (Fe(e)) {
      s = Object.freeze(s.concat(e));
      for (let l = 0; l < e.items.length; ++l) {
        const c = _s(l, e.items[l], n, s);
        if (typeof c == 'number') l = c - 1;
        else {
          if (c === At) return At;
          c === gn && (e.items.splice(l, 1), (l -= 1));
        }
      }
    } else if ($e(e)) {
      s = Object.freeze(s.concat(e));
      const l = _s('key', e.key, n, s);
      if (l === At) return At;
      l === gn && (e.key = null);
      const c = _s('value', e.value, n, s);
      if (c === At) return At;
      c === gn && (e.value = null);
    }
  }
  return o;
}
async function ua(t, e) {
  const n = cv(e);
  Dr(t)
    ? (await ks(null, t.contents, n, Object.freeze([t]))) === gn && (t.contents = null)
    : await ks(null, t, n, Object.freeze([]));
}
ua.BREAK = At;
ua.SKIP = av;
ua.REMOVE = gn;
async function ks(t, e, n, s) {
  const o = await uv(t, e, n, s);
  if (ze(o) || $e(o)) return fv(t, s, o), ks(t, o, n, s);
  if (typeof o != 'symbol') {
    if (Fe(e)) {
      s = Object.freeze(s.concat(e));
      for (let l = 0; l < e.items.length; ++l) {
        const c = await ks(l, e.items[l], n, s);
        if (typeof c == 'number') l = c - 1;
        else {
          if (c === At) return At;
          c === gn && (e.items.splice(l, 1), (l -= 1));
        }
      }
    } else if ($e(e)) {
      s = Object.freeze(s.concat(e));
      const l = await ks('key', e.key, n, s);
      if (l === At) return At;
      l === gn && (e.key = null);
      const c = await ks('value', e.value, n, s);
      if (c === At) return At;
      c === gn && (e.value = null);
    }
  }
  return o;
}
function cv(t) {
  return typeof t == 'object' && (t.Collection || t.Node || t.Value)
    ? Object.assign(
        { Alias: t.Node, Map: t.Node, Scalar: t.Node, Seq: t.Node },
        t.Value && { Map: t.Value, Scalar: t.Value, Seq: t.Value },
        t.Collection && { Map: t.Collection, Seq: t.Collection },
        t
      )
    : t;
}
function uv(t, e, n, s) {
  var o, l, c, u, d;
  if (typeof n == 'function') return n(t, e, s);
  if (Fs(e)) return (o = n.Map) == null ? void 0 : o.call(n, t, e, s);
  if (zs(e)) return (l = n.Seq) == null ? void 0 : l.call(n, t, e, s);
  if ($e(e)) return (c = n.Pair) == null ? void 0 : c.call(n, t, e, s);
  if (Ne(e)) return (u = n.Scalar) == null ? void 0 : u.call(n, t, e, s);
  if (Rr(e)) return (d = n.Alias) == null ? void 0 : d.call(n, t, e, s);
}
function fv(t, e, n) {
  const s = e[e.length - 1];
  if (Fe(s)) s.items[t] = n;
  else if ($e(s)) t === 'key' ? (s.key = n) : (s.value = n);
  else if (Dr(s)) s.contents = n;
  else {
    const o = Rr(s) ? 'alias' : 'scalar';
    throw new Error(`Cannot replace node with ${o} parent`);
  }
}
const $b = { '!': '%21', ',': '%2C', '[': '%5B', ']': '%5D', '{': '%7B', '}': '%7D' },
  Pb = t => t.replace(/[!,[\]{}]/g, e => $b[e]);
class pt {
  constructor(e, n) {
    (this.docStart = null),
      (this.docEnd = !1),
      (this.yaml = Object.assign({}, pt.defaultYaml, e)),
      (this.tags = Object.assign({}, pt.defaultTags, n));
  }
  clone() {
    const e = new pt(this.yaml, this.tags);
    return (e.docStart = this.docStart), e;
  }
  atDocument() {
    const e = new pt(this.yaml, this.tags);
    switch (this.yaml.version) {
      case '1.1':
        this.atNextDocument = !0;
        break;
      case '1.2':
        (this.atNextDocument = !1),
          (this.yaml = { explicit: pt.defaultYaml.explicit, version: '1.2' }),
          (this.tags = Object.assign({}, pt.defaultTags));
        break;
    }
    return e;
  }
  add(e, n) {
    this.atNextDocument &&
      ((this.yaml = { explicit: pt.defaultYaml.explicit, version: '1.1' }),
      (this.tags = Object.assign({}, pt.defaultTags)),
      (this.atNextDocument = !1));
    const s = e.trim().split(/[ \t]+/),
      o = s.shift();
    switch (o) {
      case '%TAG': {
        if (
          s.length !== 2 &&
          (n(0, '%TAG directive should contain exactly two parts'), s.length < 2)
        )
          return !1;
        const [l, c] = s;
        return (this.tags[l] = c), !0;
      }
      case '%YAML': {
        if (((this.yaml.explicit = !0), s.length !== 1))
          return n(0, '%YAML directive should contain exactly one part'), !1;
        const [l] = s;
        if (l === '1.1' || l === '1.2') return (this.yaml.version = l), !0;
        {
          const c = /^\d+\.\d+$/.test(l);
          return n(6, `Unsupported YAML version ${l}`, c), !1;
        }
      }
      default:
        return n(0, `Unknown directive ${o}`, !0), !1;
    }
  }
  tagName(e, n) {
    if (e === '!') return '!';
    if (e[0] !== '!') return n(`Not a valid tag: ${e}`), null;
    if (e[1] === '<') {
      const c = e.slice(2, -1);
      return c === '!' || c === '!!'
        ? (n(`Verbatim tags aren't resolved, so ${e} is invalid.`), null)
        : (e[e.length - 1] !== '>' && n('Verbatim tags must end with a >'), c);
    }
    const [, s, o] = e.match(/^(.*!)([^!]*)$/s);
    o || n(`The ${e} tag has no suffix`);
    const l = this.tags[s];
    if (l)
      try {
        return l + decodeURIComponent(o);
      } catch (c) {
        return n(String(c)), null;
      }
    return s === '!' ? e : (n(`Could not resolve tag: ${e}`), null);
  }
  tagString(e) {
    for (const [n, s] of Object.entries(this.tags))
      if (e.startsWith(s)) return n + Pb(e.substring(s.length));
    return e[0] === '!' ? e : `!<${e}>`;
  }
  toString(e) {
    const n = this.yaml.explicit ? [`%YAML ${this.yaml.version || '1.2'}`] : [],
      s = Object.entries(this.tags);
    let o;
    if (e && s.length > 0 && ze(e.contents)) {
      const l = {};
      ar(e.contents, (c, u) => {
        ze(u) && u.tag && (l[u.tag] = !0);
      }),
        (o = Object.keys(l));
    } else o = [];
    for (const [l, c] of s)
      (l === '!!' && c === 'tag:yaml.org,2002:') ||
        ((!e || o.some(u => u.startsWith(c))) && n.push(`%TAG ${l} ${c}`));
    return n.join(`
`);
  }
}
pt.defaultYaml = { explicit: !1, version: '1.2' };
pt.defaultTags = { '!!': 'tag:yaml.org,2002:' };
function dv(t) {
  if (/[\x00-\x19\s,[\]{}]/.test(t)) {
    const n = `Anchor must not contain whitespace or control characters: ${JSON.stringify(t)}`;
    throw new Error(n);
  }
  return !0;
}
function hv(t) {
  const e = new Set();
  return (
    ar(t, {
      Value(n, s) {
        s.anchor && e.add(s.anchor);
      },
    }),
    e
  );
}
function pv(t, e) {
  for (let n = 1; ; ++n) {
    const s = `${t}${n}`;
    if (!e.has(s)) return s;
  }
}
function Rb(t, e) {
  const n = [],
    s = new Map();
  let o = null;
  return {
    onAnchor: l => {
      n.push(l), o || (o = hv(t));
      const c = pv(e, o);
      return o.add(c), c;
    },
    setAnchors: () => {
      for (const l of n) {
        const c = s.get(l);
        if (typeof c == 'object' && c.anchor && (Ne(c.node) || Fe(c.node)))
          c.node.anchor = c.anchor;
        else {
          const u = new Error('Failed to resolve repeated object (this should not happen)');
          throw ((u.source = l), u);
        }
      }
    },
    sourceObjects: s,
  };
}
function bs(t, e, n, s) {
  if (s && typeof s == 'object')
    if (Array.isArray(s))
      for (let o = 0, l = s.length; o < l; ++o) {
        const c = s[o],
          u = bs(t, s, String(o), c);
        u === void 0 ? delete s[o] : u !== c && (s[o] = u);
      }
    else if (s instanceof Map)
      for (const o of Array.from(s.keys())) {
        const l = s.get(o),
          c = bs(t, s, o, l);
        c === void 0 ? s.delete(o) : c !== l && s.set(o, c);
      }
    else if (s instanceof Set)
      for (const o of Array.from(s)) {
        const l = bs(t, s, o, o);
        l === void 0 ? s.delete(o) : l !== o && (s.delete(o), s.add(l));
      }
    else
      for (const [o, l] of Object.entries(s)) {
        const c = bs(t, s, o, l);
        c === void 0 ? delete s[o] : c !== l && (s[o] = c);
      }
  return t.call(e, n, s);
}
function Gt(t, e, n) {
  if (Array.isArray(t)) return t.map((s, o) => Gt(s, String(o), n));
  if (t && typeof t.toJSON == 'function') {
    if (!n || !Mb(t)) return t.toJSON(e, n);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    n.anchors.set(t, s),
      (n.onCreate = l => {
        (s.res = l), delete n.onCreate;
      });
    const o = t.toJSON(e, n);
    return n.onCreate && n.onCreate(o), o;
  }
  return typeof t == 'bigint' && !(n != null && n.keep) ? Number(t) : t;
}
class qf {
  constructor(e) {
    Object.defineProperty(this, Xt, { value: e });
  }
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  toJS(e, { mapAsMap: n, maxAliasCount: s, onAnchor: o, reviver: l } = {}) {
    if (!Dr(e)) throw new TypeError('A document argument is required');
    const c = {
        anchors: new Map(),
        doc: e,
        keep: !0,
        mapAsMap: n === !0,
        mapKeyWarned: !1,
        maxAliasCount: typeof s == 'number' ? s : 100,
      },
      u = Gt(this, '', c);
    if (typeof o == 'function') for (const { count: d, res: h } of c.anchors.values()) o(h, d);
    return typeof l == 'function' ? bs(l, { '': u }, '', u) : u;
  }
}
class fa extends qf {
  constructor(e) {
    super(Uf),
      (this.source = e),
      Object.defineProperty(this, 'tag', {
        set() {
          throw new Error('Alias nodes cannot have tags');
        },
      });
  }
  resolve(e) {
    let n;
    return (
      ar(e, {
        Node: (s, o) => {
          if (o === this) return ar.BREAK;
          o.anchor === this.source && (n = o);
        },
      }),
      n
    );
  }
  toJSON(e, n) {
    if (!n) return { source: this.source };
    const { anchors: s, doc: o, maxAliasCount: l } = n,
      c = this.resolve(o);
    if (!c) {
      const d = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(d);
    }
    let u = s.get(c);
    if ((u || (Gt(c, null, n), (u = s.get(c))), !u || u.res === void 0)) {
      const d = 'This should not happen: Alias anchor was not resolved?';
      throw new ReferenceError(d);
    }
    if (
      l >= 0 &&
      ((u.count += 1),
      u.aliasCount === 0 && (u.aliasCount = Fl(o, c, s)),
      u.count * u.aliasCount > l)
    ) {
      const d = 'Excessive alias count indicates a resource exhaustion attack';
      throw new ReferenceError(d);
    }
    return u.res;
  }
  toString(e, n, s) {
    const o = `*${this.source}`;
    if (e) {
      if ((dv(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source))) {
        const l = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(l);
      }
      if (e.implicitKey) return `${o} `;
    }
    return o;
  }
}
function Fl(t, e, n) {
  if (Rr(e)) {
    const s = e.resolve(t),
      o = n && s && n.get(s);
    return o ? o.count * o.aliasCount : 0;
  } else if (Fe(e)) {
    let s = 0;
    for (const o of e.items) {
      const l = Fl(t, o, n);
      l > s && (s = l);
    }
    return s;
  } else if ($e(e)) {
    const s = Fl(t, e.key, n),
      o = Fl(t, e.value, n);
    return Math.max(s, o);
  }
  return 1;
}
const mv = t => !t || (typeof t != 'function' && typeof t != 'object');
class he extends qf {
  constructor(e) {
    super(yn), (this.value = e);
  }
  toJSON(e, n) {
    return n != null && n.keep ? this.value : Gt(this.value, e, n);
  }
  toString() {
    return String(this.value);
  }
}
he.BLOCK_FOLDED = 'BLOCK_FOLDED';
he.BLOCK_LITERAL = 'BLOCK_LITERAL';
he.PLAIN = 'PLAIN';
he.QUOTE_DOUBLE = 'QUOTE_DOUBLE';
he.QUOTE_SINGLE = 'QUOTE_SINGLE';
const Db = 'tag:yaml.org,2002:';
function Fb(t, e, n) {
  if (e) {
    const s = n.filter(l => l.tag === e),
      o = s.find(l => !l.format) ?? s[0];
    if (!o) throw new Error(`Tag ${e} not found`);
    return o;
  }
  return n.find(s => {
    var o;
    return ((o = s.identify) == null ? void 0 : o.call(s, t)) && !s.format;
  });
}
function Ji(t, e, n) {
  var v, m, w;
  if ((Dr(t) && (t = t.contents), ze(t))) return t;
  if ($e(t)) {
    const S = (m = (v = n.schema[lr]).createNode) == null ? void 0 : m.call(v, n.schema, null, n);
    return S.items.push(t), S;
  }
  (t instanceof String ||
    t instanceof Number ||
    t instanceof Boolean ||
    (typeof BigInt < 'u' && t instanceof BigInt)) &&
    (t = t.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: o, onTagObj: l, schema: c, sourceObjects: u } = n;
  let d;
  if (s && t && typeof t == 'object') {
    if (((d = u.get(t)), d)) return d.anchor || (d.anchor = o(t)), new fa(d.anchor);
    (d = { anchor: null, node: null }), u.set(t, d);
  }
  e != null && e.startsWith('!!') && (e = Db + e.slice(2));
  let h = Fb(t, e, c.tags);
  if (!h) {
    if ((t && typeof t.toJSON == 'function' && (t = t.toJSON()), !t || typeof t != 'object')) {
      const S = new he(t);
      return d && (d.node = S), S;
    }
    h = t instanceof Map ? c[lr] : Symbol.iterator in Object(t) ? c[Ds] : c[lr];
  }
  l && (l(h), delete n.onTagObj);
  const y =
    h != null && h.createNode
      ? h.createNode(n.schema, t, n)
      : typeof ((w = h == null ? void 0 : h.nodeClass) == null ? void 0 : w.from) == 'function'
        ? h.nodeClass.from(n.schema, t, n)
        : new he(t);
  return e ? (y.tag = e) : h.default || (y.tag = h.tag), d && (d.node = y), y;
}
function Yl(t, e, n) {
  let s = n;
  for (let o = e.length - 1; o >= 0; --o) {
    const l = e[o];
    if (typeof l == 'number' && Number.isInteger(l) && l >= 0) {
      const c = [];
      (c[l] = s), (s = c);
    } else s = new Map([[l, s]]);
  }
  return Ji(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error('This should not happen, please report a bug.');
    },
    schema: t,
    sourceObjects: new Map(),
  });
}
const Vi = t => t == null || (typeof t == 'object' && !!t[Symbol.iterator]().next().done);
class gv extends qf {
  constructor(e, n) {
    super(e),
      Object.defineProperty(this, 'schema', {
        value: n,
        configurable: !0,
        enumerable: !1,
        writable: !0,
      });
  }
  clone(e) {
    const n = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return (
      e && (n.schema = e),
      (n.items = n.items.map(s => (ze(s) || $e(s) ? s.clone(e) : s))),
      this.range && (n.range = this.range.slice()),
      n
    );
  }
  addIn(e, n) {
    if (Vi(e)) this.add(n);
    else {
      const [s, ...o] = e,
        l = this.get(s, !0);
      if (Fe(l)) l.addIn(o, n);
      else if (l === void 0 && this.schema) this.set(s, Yl(this.schema, o, n));
      else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${o}`);
    }
  }
  deleteIn(e) {
    const [n, ...s] = e;
    if (s.length === 0) return this.delete(n);
    const o = this.get(n, !0);
    if (Fe(o)) return o.deleteIn(s);
    throw new Error(`Expected YAML collection at ${n}. Remaining path: ${s}`);
  }
  getIn(e, n) {
    const [s, ...o] = e,
      l = this.get(s, !0);
    return o.length === 0 ? (!n && Ne(l) ? l.value : l) : Fe(l) ? l.getIn(o, n) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every(n => {
      if (!$e(n)) return !1;
      const s = n.value;
      return (
        s == null || (e && Ne(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag)
      );
    });
  }
  hasIn(e) {
    const [n, ...s] = e;
    if (s.length === 0) return this.has(n);
    const o = this.get(n, !0);
    return Fe(o) ? o.hasIn(s) : !1;
  }
  setIn(e, n) {
    const [s, ...o] = e;
    if (o.length === 0) this.set(s, n);
    else {
      const l = this.get(s, !0);
      if (Fe(l)) l.setIn(o, n);
      else if (l === void 0 && this.schema) this.set(s, Yl(this.schema, o, n));
      else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${o}`);
    }
  }
}
const zb = t => t.replace(/^(?!$)(?: $)?/gm, '#');
function In(t, e) {
  return /^\n+$/.test(t) ? t.substring(1) : e ? t.replace(/^(?! *$)/gm, e) : t;
}
const Ar = (t, e, n) =>
    t.endsWith(`
`)
      ? In(n, e)
      : n.includes(`
`)
        ? `
` + In(n, e)
        : (t.endsWith(' ') ? '' : ' ') + n,
  yv = 'flow',
  sf = 'block',
  zl = 'quoted';
function da(
  t,
  e,
  n = 'flow',
  { indentAtStart: s, lineWidth: o = 80, minContentWidth: l = 20, onFold: c, onOverflow: u } = {}
) {
  if (!o || o < 0) return t;
  o < l && (l = 0);
  const d = Math.max(1 + l, 1 + o - e.length);
  if (t.length <= d) return t;
  const h = [],
    y = {};
  let v = o - e.length;
  typeof s == 'number' && (s > o - Math.max(2, l) ? h.push(0) : (v = o - s));
  let m,
    w,
    S = !1,
    _ = -1,
    b = -1,
    T = -1;
  n === sf && ((_ = Qm(t, _, e.length)), _ !== -1 && (v = _ + d));
  for (let O; (O = t[(_ += 1)]); ) {
    if (n === zl && O === '\\') {
      switch (((b = _), t[_ + 1])) {
        case 'x':
          _ += 3;
          break;
        case 'u':
          _ += 5;
          break;
        case 'U':
          _ += 9;
          break;
        default:
          _ += 1;
      }
      T = _;
    }
    if (
      O ===
      `
`
    )
      n === sf && (_ = Qm(t, _, e.length)), (v = _ + e.length + d), (m = void 0);
    else {
      if (
        O === ' ' &&
        w &&
        w !== ' ' &&
        w !==
          `
` &&
        w !== '	'
      ) {
        const R = t[_ + 1];
        R &&
          R !== ' ' &&
          R !==
            `
` &&
          R !== '	' &&
          (m = _);
      }
      if (_ >= v)
        if (m) h.push(m), (v = m + d), (m = void 0);
        else if (n === zl) {
          for (; w === ' ' || w === '	'; ) (w = O), (O = t[(_ += 1)]), (S = !0);
          const R = _ > T + 1 ? _ - 2 : b - 1;
          if (y[R]) return t;
          h.push(R), (y[R] = !0), (v = R + d), (m = void 0);
        } else S = !0;
    }
    w = O;
  }
  if ((S && u && u(), h.length === 0)) return t;
  c && c();
  let C = t.slice(0, h[0]);
  for (let O = 0; O < h.length; ++O) {
    const R = h[O],
      D = h[O + 1] || t.length;
    R === 0
      ? (C = `
${e}${t.slice(0, D)}`)
      : (n === zl && y[R] && (C += `${t[R]}\\`),
        (C += `
${e}${t.slice(R + 1, D)}`));
  }
  return C;
}
function Qm(t, e, n) {
  let s = e,
    o = e + 1,
    l = t[o];
  for (; l === ' ' || l === '	'; )
    if (e < o + n) l = t[++e];
    else {
      do l = t[++e];
      while (
        l &&
        l !==
          `
`
      );
      (s = e), (o = e + 1), (l = t[o]);
    }
  return s;
}
const ha = (t, e) => ({
    indentAtStart: e ? t.indent.length : t.indentAtStart,
    lineWidth: t.options.lineWidth,
    minContentWidth: t.options.minContentWidth,
  }),
  pa = t => /^(%|---|\.\.\.)/m.test(t);
function Bb(t, e, n) {
  if (!e || e < 0) return !1;
  const s = e - n,
    o = t.length;
  if (o <= s) return !1;
  for (let l = 0, c = 0; l < o; ++l)
    if (
      t[l] ===
      `
`
    ) {
      if (l - c > s) return !0;
      if (((c = l + 1), o - c <= s)) return !1;
    }
  return !0;
}
function Ki(t, e) {
  const n = JSON.stringify(t);
  if (e.options.doubleQuotedAsJSON) return n;
  const { implicitKey: s } = e,
    o = e.options.doubleQuotedMinMultiLineLength,
    l = e.indent || (pa(t) ? '  ' : '');
  let c = '',
    u = 0;
  for (let d = 0, h = n[d]; h; h = n[++d])
    if (
      (h === ' ' &&
        n[d + 1] === '\\' &&
        n[d + 2] === 'n' &&
        ((c += n.slice(u, d) + '\\ '), (d += 1), (u = d), (h = '\\')),
      h === '\\')
    )
      switch (n[d + 1]) {
        case 'u':
          {
            c += n.slice(u, d);
            const y = n.substr(d + 2, 4);
            switch (y) {
              case '0000':
                c += '\\0';
                break;
              case '0007':
                c += '\\a';
                break;
              case '000b':
                c += '\\v';
                break;
              case '001b':
                c += '\\e';
                break;
              case '0085':
                c += '\\N';
                break;
              case '00a0':
                c += '\\_';
                break;
              case '2028':
                c += '\\L';
                break;
              case '2029':
                c += '\\P';
                break;
              default:
                y.substr(0, 2) === '00' ? (c += '\\x' + y.substr(2)) : (c += n.substr(d, 6));
            }
            (d += 5), (u = d + 1);
          }
          break;
        case 'n':
          if (s || n[d + 2] === '"' || n.length < o) d += 1;
          else {
            for (
              c +=
                n.slice(u, d) +
                `

`;
              n[d + 2] === '\\' && n[d + 3] === 'n' && n[d + 4] !== '"';

            )
              (c += `
`),
                (d += 2);
            (c += l), n[d + 2] === ' ' && (c += '\\'), (d += 1), (u = d + 1);
          }
          break;
        default:
          d += 1;
      }
  return (c = u ? c + n.slice(u) : n), s ? c : da(c, l, zl, ha(e, !1));
}
function of(t, e) {
  if (
    e.options.singleQuote === !1 ||
    (e.implicitKey &&
      t.includes(`
`)) ||
    /[ \t]\n|\n[ \t]/.test(t)
  )
    return Ki(t, e);
  const n = e.indent || (pa(t) ? '  ' : ''),
    s =
      "'" +
      t.replace(/'/g, "''").replace(
        /\n+/g,
        `$&
${n}`
      ) +
      "'";
  return e.implicitKey ? s : da(s, n, yv, ha(e, !1));
}
function Es(t, e) {
  const { singleQuote: n } = e.options;
  let s;
  if (n === !1) s = Ki;
  else {
    const o = t.includes('"'),
      l = t.includes("'");
    o && !l ? (s = of) : l && !o ? (s = Ki) : (s = n ? of : Ki);
  }
  return s(t, e);
}
let lf;
try {
  lf = new RegExp(
    `(^|(?<!
))
+(?!
|$)`,
    'g'
  );
} catch {
  lf = /\n+(?!\n|$)/g;
}
function Bl({ comment: t, type: e, value: n }, s, o, l) {
  const { blockQuote: c, commentString: u, lineWidth: d } = s.options;
  if (!c || /\n[\t ]+$/.test(n) || /^\s*$/.test(n)) return Es(n, s);
  const h = s.indent || (s.forceBlockIndent || pa(n) ? '  ' : ''),
    y =
      c === 'literal'
        ? !0
        : c === 'folded' || e === he.BLOCK_FOLDED
          ? !1
          : e === he.BLOCK_LITERAL
            ? !0
            : !Bb(n, d, h.length);
  if (!n)
    return y
      ? `|
`
      : `>
`;
  let v, m;
  for (m = n.length; m > 0; --m) {
    const F = n[m - 1];
    if (
      F !==
        `
` &&
      F !== '	' &&
      F !== ' '
    )
      break;
  }
  let w = n.substring(m);
  const S = w.indexOf(`
`);
  S === -1 ? (v = '-') : n === w || S !== w.length - 1 ? ((v = '+'), l && l()) : (v = ''),
    w &&
      ((n = n.slice(0, -w.length)),
      w[w.length - 1] ===
        `
` && (w = w.slice(0, -1)),
      (w = w.replace(lf, `$&${h}`)));
  let _ = !1,
    b,
    T = -1;
  for (b = 0; b < n.length; ++b) {
    const F = n[b];
    if (F === ' ') _ = !0;
    else if (
      F ===
      `
`
    )
      T = b;
    else break;
  }
  let C = n.substring(0, T < b ? T + 1 : b);
  C && ((n = n.substring(C.length)), (C = C.replace(/\n+/g, `$&${h}`)));
  let R = (y ? '|' : '>') + (_ ? (h ? '2' : '1') : '') + v;
  if ((t && ((R += ' ' + u(t.replace(/ ?[\r\n]+/g, ' '))), o && o()), y))
    return (
      (n = n.replace(/\n+/g, `$&${h}`)),
      `${R}
${h}${C}${n}${w}`
    );
  n = n
    .replace(
      /\n+/g,
      `
$&`
    )
    .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2')
    .replace(/\n+/g, `$&${h}`);
  const D = da(`${C}${n}${w}`, h, sf, ha(s, !0));
  return `${R}
${h}${D}`;
}
function Ub(t, e, n, s) {
  const { type: o, value: l } = t,
    { actualString: c, implicitKey: u, indent: d, indentStep: h, inFlow: y } = e;
  if (
    (u &&
      l.includes(`
`)) ||
    (y && /[[\]{},]/.test(l))
  )
    return Es(l, e);
  if (
    !l ||
    /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(l)
  )
    return u ||
      y ||
      !l.includes(`
`)
      ? Es(l, e)
      : Bl(t, e, n, s);
  if (
    !u &&
    !y &&
    o !== he.PLAIN &&
    l.includes(`
`)
  )
    return Bl(t, e, n, s);
  if (pa(l)) {
    if (d === '') return (e.forceBlockIndent = !0), Bl(t, e, n, s);
    if (u && d === h) return Es(l, e);
  }
  const v = l.replace(
    /\n+/g,
    `$&
${d}`
  );
  if (c) {
    const m = _ => {
        var b;
        return (
          _.default &&
          _.tag !== 'tag:yaml.org,2002:str' &&
          ((b = _.test) == null ? void 0 : b.test(v))
        );
      },
      { compat: w, tags: S } = e.doc.schema;
    if (S.some(m) || (w != null && w.some(m))) return Es(l, e);
  }
  return u ? v : da(v, d, yv, ha(e, !1));
}
function to(t, e, n, s) {
  const { implicitKey: o, inFlow: l } = e,
    c = typeof t.value == 'string' ? t : Object.assign({}, t, { value: String(t.value) });
  let { type: u } = t;
  u !== he.QUOTE_DOUBLE &&
    /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(c.value) &&
    (u = he.QUOTE_DOUBLE);
  const d = y => {
    switch (y) {
      case he.BLOCK_FOLDED:
      case he.BLOCK_LITERAL:
        return o || l ? Es(c.value, e) : Bl(c, e, n, s);
      case he.QUOTE_DOUBLE:
        return Ki(c.value, e);
      case he.QUOTE_SINGLE:
        return of(c.value, e);
      case he.PLAIN:
        return Ub(c, e, n, s);
      default:
        return null;
    }
  };
  let h = d(u);
  if (h === null) {
    const { defaultKeyType: y, defaultStringType: v } = e.options,
      m = (o && y) || v;
    if (((h = d(m)), h === null)) throw new Error(`Unsupported default string type ${m}`);
  }
  return h;
}
function vv(t, e) {
  const n = Object.assign(
    {
      blockQuote: !0,
      commentString: zb,
      defaultKeyType: null,
      defaultStringType: 'PLAIN',
      directives: null,
      doubleQuotedAsJSON: !1,
      doubleQuotedMinMultiLineLength: 40,
      falseStr: 'false',
      flowCollectionPadding: !0,
      indentSeq: !0,
      lineWidth: 80,
      minContentWidth: 20,
      nullStr: 'null',
      simpleKeys: !1,
      singleQuote: null,
      trueStr: 'true',
      verifyAliasOrder: !0,
    },
    t.schema.toStringOptions,
    e
  );
  let s;
  switch (n.collectionStyle) {
    case 'block':
      s = !1;
      break;
    case 'flow':
      s = !0;
      break;
    default:
      s = null;
  }
  return {
    anchors: new Set(),
    doc: t,
    flowCollectionPadding: n.flowCollectionPadding ? ' ' : '',
    indent: '',
    indentStep: typeof n.indent == 'number' ? ' '.repeat(n.indent) : '  ',
    inFlow: s,
    options: n,
  };
}
function qb(t, e) {
  var o;
  if (e.tag) {
    const l = t.filter(c => c.tag === e.tag);
    if (l.length > 0) return l.find(c => c.format === e.format) ?? l[0];
  }
  let n, s;
  if (Ne(e)) {
    s = e.value;
    let l = t.filter(c => {
      var u;
      return (u = c.identify) == null ? void 0 : u.call(c, s);
    });
    if (l.length > 1) {
      const c = l.filter(u => u.test);
      c.length > 0 && (l = c);
    }
    n = l.find(c => c.format === e.format) ?? l.find(c => !c.format);
  } else (s = e), (n = t.find(l => l.nodeClass && s instanceof l.nodeClass));
  if (!n) {
    const l = ((o = s == null ? void 0 : s.constructor) == null ? void 0 : o.name) ?? typeof s;
    throw new Error(`Tag not resolved for ${l} value`);
  }
  return n;
}
function Hb(t, e, { anchors: n, doc: s }) {
  if (!s.directives) return '';
  const o = [],
    l = (Ne(t) || Fe(t)) && t.anchor;
  l && dv(l) && (n.add(l), o.push(`&${l}`));
  const c = t.tag ? t.tag : e.default ? null : e.tag;
  return c && o.push(s.directives.tagString(c)), o.join(' ');
}
function Is(t, e, n, s) {
  var d;
  if ($e(t)) return t.toString(e, n, s);
  if (Rr(t)) {
    if (e.doc.directives) return t.toString(e);
    if ((d = e.resolvedAliases) != null && d.has(t))
      throw new TypeError('Cannot stringify circular structure without alias nodes');
    e.resolvedAliases ? e.resolvedAliases.add(t) : (e.resolvedAliases = new Set([t])),
      (t = t.resolve(e.doc));
  }
  let o;
  const l = ze(t) ? t : e.doc.createNode(t, { onTagObj: h => (o = h) });
  o || (o = qb(e.doc.schema.tags, l));
  const c = Hb(l, o, e);
  c.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + c.length + 1);
  const u =
    typeof o.stringify == 'function'
      ? o.stringify(l, e, n, s)
      : Ne(l)
        ? to(l, e, n, s)
        : l.toString(e, n, s);
  return c
    ? Ne(l) || u[0] === '{' || u[0] === '['
      ? `${c} ${u}`
      : `${c}
${e.indent}${u}`
    : u;
}
function Vb({ key: t, value: e }, n, s, o) {
  const {
    allNullValues: l,
    doc: c,
    indent: u,
    indentStep: d,
    options: { commentString: h, indentSeq: y, simpleKeys: v },
  } = n;
  let m = (ze(t) && t.comment) || null;
  if (v) {
    if (m) throw new Error('With simple keys, key nodes cannot have comments');
    if (Fe(t) || (!ze(t) && typeof t == 'object')) {
      const U = 'With simple keys, collection cannot be used as a key value';
      throw new Error(U);
    }
  }
  let w =
    !v &&
    (!t ||
      (m && e == null && !n.inFlow) ||
      Fe(t) ||
      (Ne(t) ? t.type === he.BLOCK_FOLDED || t.type === he.BLOCK_LITERAL : typeof t == 'object'));
  n = Object.assign({}, n, { allNullValues: !1, implicitKey: !w && (v || !l), indent: u + d });
  let S = !1,
    _ = !1,
    b = Is(
      t,
      n,
      () => (S = !0),
      () => (_ = !0)
    );
  if (!w && !n.inFlow && b.length > 1024) {
    if (v)
      throw new Error(
        'With simple keys, single line scalar must not span more than 1024 characters'
      );
    w = !0;
  }
  if (n.inFlow) {
    if (l || e == null) return S && s && s(), b === '' ? '?' : w ? `? ${b}` : b;
  } else if ((l && !v) || (e == null && w))
    return (b = `? ${b}`), m && !S ? (b += Ar(b, n.indent, h(m))) : _ && o && o(), b;
  S && (m = null),
    w
      ? (m && (b += Ar(b, n.indent, h(m))),
        (b = `? ${b}
${u}:`))
      : ((b = `${b}:`), m && (b += Ar(b, n.indent, h(m))));
  let T, C, O;
  ze(e)
    ? ((T = !!e.spaceBefore), (C = e.commentBefore), (O = e.comment))
    : ((T = !1), (C = null), (O = null), e && typeof e == 'object' && (e = c.createNode(e))),
    (n.implicitKey = !1),
    !w && !m && Ne(e) && (n.indentAtStart = b.length + 1),
    (_ = !1),
    !y &&
      d.length >= 2 &&
      !n.inFlow &&
      !w &&
      zs(e) &&
      !e.flow &&
      !e.tag &&
      !e.anchor &&
      (n.indent = n.indent.substring(2));
  let R = !1;
  const D = Is(
    e,
    n,
    () => (R = !0),
    () => (_ = !0)
  );
  let F = ' ';
  if (m || T || C) {
    if (
      ((F = T
        ? `
`
        : ''),
      C)
    ) {
      const U = h(C);
      F += `
${In(U, n.indent)}`;
    }
    D === '' && !n.inFlow
      ? F ===
          `
` &&
        (F = `

`)
      : (F += `
${n.indent}`);
  } else if (!w && Fe(e)) {
    const U = D[0],
      B = D.indexOf(`
`),
      I = B !== -1,
      Q = n.inFlow ?? e.flow ?? e.items.length === 0;
    if (I || !Q) {
      let W = !1;
      if (I && (U === '&' || U === '!')) {
        let z = D.indexOf(' ');
        U === '&' && z !== -1 && z < B && D[z + 1] === '!' && (z = D.indexOf(' ', z + 1)),
          (z === -1 || B < z) && (W = !0);
      }
      W ||
        (F = `
${n.indent}`);
    }
  } else
    (D === '' ||
      D[0] ===
        `
`) &&
      (F = '');
  return (
    (b += F + D),
    n.inFlow ? R && s && s() : O && !R ? (b += Ar(b, n.indent, h(O))) : _ && o && o(),
    b
  );
}
function wv(t, e) {
  (t === 'debug' || t === 'warn') &&
    (typeof process < 'u' && process.emitWarning ? process.emitWarning(e) : console.warn(e));
}
const kl = '<<',
  On = {
    identify: t => t === kl || (typeof t == 'symbol' && t.description === kl),
    default: 'key',
    tag: 'tag:yaml.org,2002:merge',
    test: /^<<$/,
    resolve: () => Object.assign(new he(Symbol(kl)), { addToJSMap: xv }),
    stringify: () => kl,
  },
  Wb = (t, e) =>
    (On.identify(e) || (Ne(e) && (!e.type || e.type === he.PLAIN) && On.identify(e.value))) &&
    (t == null ? void 0 : t.doc.schema.tags.some(n => n.tag === On.tag && n.default));
function xv(t, e, n) {
  if (((n = t && Rr(n) ? n.resolve(t.doc) : n), zs(n))) for (const s of n.items) Ru(t, e, s);
  else if (Array.isArray(n)) for (const s of n) Ru(t, e, s);
  else Ru(t, e, n);
}
function Ru(t, e, n) {
  const s = t && Rr(n) ? n.resolve(t.doc) : n;
  if (!Fs(s)) throw new Error('Merge sources must be maps or map aliases');
  const o = s.toJSON(null, t, Map);
  for (const [l, c] of o)
    e instanceof Map
      ? e.has(l) || e.set(l, c)
      : e instanceof Set
        ? e.add(l)
        : Object.prototype.hasOwnProperty.call(e, l) ||
          Object.defineProperty(e, l, { value: c, writable: !0, enumerable: !0, configurable: !0 });
  return e;
}
function Sv(t, e, { key: n, value: s }) {
  if (ze(n) && n.addToJSMap) n.addToJSMap(t, e, s);
  else if (Wb(t, n)) xv(t, e, s);
  else {
    const o = Gt(n, '', t);
    if (e instanceof Map) e.set(o, Gt(s, o, t));
    else if (e instanceof Set) e.add(o);
    else {
      const l = Kb(n, o, t),
        c = Gt(s, l, t);
      l in e
        ? Object.defineProperty(e, l, { value: c, writable: !0, enumerable: !0, configurable: !0 })
        : (e[l] = c);
    }
  }
  return e;
}
function Kb(t, e, n) {
  if (e === null) return '';
  if (typeof e != 'object') return String(e);
  if (ze(t) && n != null && n.doc) {
    const s = vv(n.doc, {});
    s.anchors = new Set();
    for (const l of n.anchors.keys()) s.anchors.add(l.anchor);
    (s.inFlow = !0), (s.inStringifyKey = !0);
    const o = t.toString(s);
    if (!n.mapKeyWarned) {
      let l = JSON.stringify(o);
      l.length > 40 && (l = l.substring(0, 36) + '..."'),
        wv(
          n.doc.options.logLevel,
          `Keys with collection values will be stringified due to JS Object restrictions: ${l}. Set mapAsMap: true to use object keys.`
        ),
        (n.mapKeyWarned = !0);
    }
    return o;
  }
  return JSON.stringify(e);
}
function Hf(t, e, n) {
  const s = Ji(t, void 0, n),
    o = Ji(e, void 0, n);
  return new ut(s, o);
}
class ut {
  constructor(e, n = null) {
    Object.defineProperty(this, Xt, { value: lv }), (this.key = e), (this.value = n);
  }
  clone(e) {
    let { key: n, value: s } = this;
    return ze(n) && (n = n.clone(e)), ze(s) && (s = s.clone(e)), new ut(n, s);
  }
  toJSON(e, n) {
    const s = n != null && n.mapAsMap ? new Map() : {};
    return Sv(n, s, this);
  }
  toString(e, n, s) {
    return e != null && e.doc ? Vb(this, e, n, s) : JSON.stringify(this);
  }
}
function _v(t, e, n) {
  return ((e.inFlow ?? t.flow) ? Gb : Qb)(t, e, n);
}
function Qb(
  { comment: t, items: e },
  n,
  { blockItemPrefix: s, flowChars: o, itemIndent: l, onChompKeep: c, onComment: u }
) {
  const {
      indent: d,
      options: { commentString: h },
    } = n,
    y = Object.assign({}, n, { indent: l, type: null });
  let v = !1;
  const m = [];
  for (let S = 0; S < e.length; ++S) {
    const _ = e[S];
    let b = null;
    if (ze(_))
      !v && _.spaceBefore && m.push(''), Zl(n, m, _.commentBefore, v), _.comment && (b = _.comment);
    else if ($e(_)) {
      const C = ze(_.key) ? _.key : null;
      C && (!v && C.spaceBefore && m.push(''), Zl(n, m, C.commentBefore, v));
    }
    v = !1;
    let T = Is(
      _,
      y,
      () => (b = null),
      () => (v = !0)
    );
    b && (T += Ar(T, l, h(b))), v && b && (v = !1), m.push(s + T);
  }
  let w;
  if (m.length === 0) w = o.start + o.end;
  else {
    w = m[0];
    for (let S = 1; S < m.length; ++S) {
      const _ = m[S];
      w += _
        ? `
${d}${_}`
        : `
`;
    }
  }
  return (
    t
      ? ((w +=
          `
` + In(h(t), d)),
        u && u())
      : v && c && c(),
    w
  );
}
function Gb({ items: t }, e, { flowChars: n, itemIndent: s }) {
  const {
    indent: o,
    indentStep: l,
    flowCollectionPadding: c,
    options: { commentString: u },
  } = e;
  s += l;
  const d = Object.assign({}, e, { indent: s, inFlow: !0, type: null });
  let h = !1,
    y = 0;
  const v = [];
  for (let S = 0; S < t.length; ++S) {
    const _ = t[S];
    let b = null;
    if (ze(_))
      _.spaceBefore && v.push(''), Zl(e, v, _.commentBefore, !1), _.comment && (b = _.comment);
    else if ($e(_)) {
      const C = ze(_.key) ? _.key : null;
      C && (C.spaceBefore && v.push(''), Zl(e, v, C.commentBefore, !1), C.comment && (h = !0));
      const O = ze(_.value) ? _.value : null;
      O
        ? (O.comment && (b = O.comment), O.commentBefore && (h = !0))
        : _.value == null && C != null && C.comment && (b = C.comment);
    }
    b && (h = !0);
    let T = Is(_, d, () => (b = null));
    S < t.length - 1 && (T += ','),
      b && (T += Ar(T, s, u(b))),
      !h &&
        (v.length > y ||
          T.includes(`
`)) &&
        (h = !0),
      v.push(T),
      (y = v.length);
  }
  const { start: m, end: w } = n;
  if (v.length === 0) return m + w;
  if (!h) {
    const S = v.reduce((_, b) => _ + b.length + 2, 2);
    h = e.options.lineWidth > 0 && S > e.options.lineWidth;
  }
  if (h) {
    let S = m;
    for (const _ of v)
      S += _
        ? `
${l}${o}${_}`
        : `
`;
    return `${S}
${o}${w}`;
  } else return `${m}${c}${v.join(' ')}${c}${w}`;
}
function Zl({ indent: t, options: { commentString: e } }, n, s, o) {
  if ((s && o && (s = s.replace(/^\n+/, '')), s)) {
    const l = In(e(s), t);
    n.push(l.trimStart());
  }
}
function Lr(t, e) {
  const n = Ne(e) ? e.value : e;
  for (const s of t)
    if ($e(s) && (s.key === e || s.key === n || (Ne(s.key) && s.key.value === n))) return s;
}
class Pt extends gv {
  static get tagName() {
    return 'tag:yaml.org,2002:map';
  }
  constructor(e) {
    super(lr, e), (this.items = []);
  }
  static from(e, n, s) {
    const { keepUndefined: o, replacer: l } = s,
      c = new this(e),
      u = (d, h) => {
        if (typeof l == 'function') h = l.call(n, d, h);
        else if (Array.isArray(l) && !l.includes(d)) return;
        (h !== void 0 || o) && c.items.push(Hf(d, h, s));
      };
    if (n instanceof Map) for (const [d, h] of n) u(d, h);
    else if (n && typeof n == 'object') for (const d of Object.keys(n)) u(d, n[d]);
    return typeof e.sortMapEntries == 'function' && c.items.sort(e.sortMapEntries), c;
  }
  add(e, n) {
    var c;
    let s;
    $e(e)
      ? (s = e)
      : !e || typeof e != 'object' || !('key' in e)
        ? (s = new ut(e, e == null ? void 0 : e.value))
        : (s = new ut(e.key, e.value));
    const o = Lr(this.items, s.key),
      l = (c = this.schema) == null ? void 0 : c.sortMapEntries;
    if (o) {
      if (!n) throw new Error(`Key ${s.key} already set`);
      Ne(o.value) && mv(s.value) ? (o.value.value = s.value) : (o.value = s.value);
    } else if (l) {
      const u = this.items.findIndex(d => l(s, d) < 0);
      u === -1 ? this.items.push(s) : this.items.splice(u, 0, s);
    } else this.items.push(s);
  }
  delete(e) {
    const n = Lr(this.items, e);
    return n ? this.items.splice(this.items.indexOf(n), 1).length > 0 : !1;
  }
  get(e, n) {
    const s = Lr(this.items, e),
      o = s == null ? void 0 : s.value;
    return (!n && Ne(o) ? o.value : o) ?? void 0;
  }
  has(e) {
    return !!Lr(this.items, e);
  }
  set(e, n) {
    this.add(new ut(e, n), !0);
  }
  toJSON(e, n, s) {
    const o = s ? new s() : n != null && n.mapAsMap ? new Map() : {};
    n != null && n.onCreate && n.onCreate(o);
    for (const l of this.items) Sv(n, o, l);
    return o;
  }
  toString(e, n, s) {
    if (!e) return JSON.stringify(this);
    for (const o of this.items)
      if (!$e(o))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(o)} instead`);
    return (
      !e.allNullValues &&
        this.hasAllNullValues(!1) &&
        (e = Object.assign({}, e, { allNullValues: !0 })),
      _v(this, e, {
        blockItemPrefix: '',
        flowChars: { start: '{', end: '}' },
        itemIndent: e.indent || '',
        onChompKeep: s,
        onComment: n,
      })
    );
  }
}
const Bs = {
  collection: 'map',
  default: !0,
  nodeClass: Pt,
  tag: 'tag:yaml.org,2002:map',
  resolve(t, e) {
    return Fs(t) || e('Expected a mapping for this tag'), t;
  },
  createNode: (t, e, n) => Pt.from(t, e, n),
};
class cr extends gv {
  static get tagName() {
    return 'tag:yaml.org,2002:seq';
  }
  constructor(e) {
    super(Ds, e), (this.items = []);
  }
  add(e) {
    this.items.push(e);
  }
  delete(e) {
    const n = bl(e);
    return typeof n != 'number' ? !1 : this.items.splice(n, 1).length > 0;
  }
  get(e, n) {
    const s = bl(e);
    if (typeof s != 'number') return;
    const o = this.items[s];
    return !n && Ne(o) ? o.value : o;
  }
  has(e) {
    const n = bl(e);
    return typeof n == 'number' && n < this.items.length;
  }
  set(e, n) {
    const s = bl(e);
    if (typeof s != 'number') throw new Error(`Expected a valid index, not ${e}.`);
    const o = this.items[s];
    Ne(o) && mv(n) ? (o.value = n) : (this.items[s] = n);
  }
  toJSON(e, n) {
    const s = [];
    n != null && n.onCreate && n.onCreate(s);
    let o = 0;
    for (const l of this.items) s.push(Gt(l, String(o++), n));
    return s;
  }
  toString(e, n, s) {
    return e
      ? _v(this, e, {
          blockItemPrefix: '- ',
          flowChars: { start: '[', end: ']' },
          itemIndent: (e.indent || '') + '  ',
          onChompKeep: s,
          onComment: n,
        })
      : JSON.stringify(this);
  }
  static from(e, n, s) {
    const { replacer: o } = s,
      l = new this(e);
    if (n && Symbol.iterator in Object(n)) {
      let c = 0;
      for (let u of n) {
        if (typeof o == 'function') {
          const d = n instanceof Set ? u : String(c++);
          u = o.call(n, d, u);
        }
        l.items.push(Ji(u, void 0, s));
      }
    }
    return l;
  }
}
function bl(t) {
  let e = Ne(t) ? t.value : t;
  return (
    e && typeof e == 'string' && (e = Number(e)),
    typeof e == 'number' && Number.isInteger(e) && e >= 0 ? e : null
  );
}
const Us = {
    collection: 'seq',
    default: !0,
    nodeClass: cr,
    tag: 'tag:yaml.org,2002:seq',
    resolve(t, e) {
      return zs(t) || e('Expected a sequence for this tag'), t;
    },
    createNode: (t, e, n) => cr.from(t, e, n),
  },
  ma = {
    identify: t => typeof t == 'string',
    default: !0,
    tag: 'tag:yaml.org,2002:str',
    resolve: t => t,
    stringify(t, e, n, s) {
      return (e = Object.assign({ actualString: !0 }, e)), to(t, e, n, s);
    },
  },
  ga = {
    identify: t => t == null,
    createNode: () => new he(null),
    default: !0,
    tag: 'tag:yaml.org,2002:null',
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new he(null),
    stringify: ({ source: t }, e) =>
      typeof t == 'string' && ga.test.test(t) ? t : e.options.nullStr,
  },
  Vf = {
    identify: t => typeof t == 'boolean',
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: t => new he(t[0] === 't' || t[0] === 'T'),
    stringify({ source: t, value: e }, n) {
      if (t && Vf.test.test(t)) {
        const s = t[0] === 't' || t[0] === 'T';
        if (e === s) return t;
      }
      return e ? n.options.trueStr : n.options.falseStr;
    },
  };
function an({ format: t, minFractionDigits: e, tag: n, value: s }) {
  if (typeof s == 'bigint') return String(s);
  const o = typeof s == 'number' ? s : Number(s);
  if (!isFinite(o)) return isNaN(o) ? '.nan' : o < 0 ? '-.inf' : '.inf';
  let l = JSON.stringify(s);
  if (!t && e && (!n || n === 'tag:yaml.org,2002:float') && /^\d/.test(l)) {
    let c = l.indexOf('.');
    c < 0 && ((c = l.length), (l += '.'));
    let u = e - (l.length - c - 1);
    for (; u-- > 0; ) l += '0';
  }
  return l;
}
const kv = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: t =>
      t.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : t[0] === '-'
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
    stringify: an,
  },
  bv = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: t => parseFloat(t),
    stringify(t) {
      const e = Number(t.value);
      return isFinite(e) ? e.toExponential() : an(t);
    },
  },
  Ev = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(t) {
      const e = new he(parseFloat(t)),
        n = t.indexOf('.');
      return n !== -1 && t[t.length - 1] === '0' && (e.minFractionDigits = t.length - n - 1), e;
    },
    stringify: an,
  },
  ya = t => typeof t == 'bigint' || Number.isInteger(t),
  Wf = (t, e, n, { intAsBigInt: s }) => (s ? BigInt(t) : parseInt(t.substring(e), n));
function Tv(t, e, n) {
  const { value: s } = t;
  return ya(s) && s >= 0 ? n + s.toString(e) : an(t);
}
const Nv = {
    identify: t => ya(t) && t >= 0,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^0o[0-7]+$/,
    resolve: (t, e, n) => Wf(t, 2, 8, n),
    stringify: t => Tv(t, 8, '0o'),
  },
  Cv = {
    identify: ya,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9]+$/,
    resolve: (t, e, n) => Wf(t, 0, 10, n),
    stringify: an,
  },
  Av = {
    identify: t => ya(t) && t >= 0,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (t, e, n) => Wf(t, 2, 16, n),
    stringify: t => Tv(t, 16, '0x'),
  },
  Xb = [Bs, Us, ma, ga, Vf, Nv, Cv, Av, kv, bv, Ev];
function Gm(t) {
  return typeof t == 'bigint' || Number.isInteger(t);
}
const El = ({ value: t }) => JSON.stringify(t),
  Jb = [
    {
      identify: t => typeof t == 'string',
      default: !0,
      tag: 'tag:yaml.org,2002:str',
      resolve: t => t,
      stringify: El,
    },
    {
      identify: t => t == null,
      createNode: () => new he(null),
      default: !0,
      tag: 'tag:yaml.org,2002:null',
      test: /^null$/,
      resolve: () => null,
      stringify: El,
    },
    {
      identify: t => typeof t == 'boolean',
      default: !0,
      tag: 'tag:yaml.org,2002:bool',
      test: /^true|false$/,
      resolve: t => t === 'true',
      stringify: El,
    },
    {
      identify: Gm,
      default: !0,
      tag: 'tag:yaml.org,2002:int',
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: (t, e, { intAsBigInt: n }) => (n ? BigInt(t) : parseInt(t, 10)),
      stringify: ({ value: t }) => (Gm(t) ? t.toString() : JSON.stringify(t)),
    },
    {
      identify: t => typeof t == 'number',
      default: !0,
      tag: 'tag:yaml.org,2002:float',
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: t => parseFloat(t),
      stringify: El,
    },
  ],
  Yb = {
    default: !0,
    tag: '',
    test: /^/,
    resolve(t, e) {
      return e(`Unresolved plain scalar ${JSON.stringify(t)}`), t;
    },
  },
  Zb = [Bs, Us].concat(Jb, Yb),
  Kf = {
    identify: t => t instanceof Uint8Array,
    default: !1,
    tag: 'tag:yaml.org,2002:binary',
    resolve(t, e) {
      if (typeof Buffer == 'function') return Buffer.from(t, 'base64');
      if (typeof atob == 'function') {
        const n = atob(t.replace(/[\n\r]/g, '')),
          s = new Uint8Array(n.length);
        for (let o = 0; o < n.length; ++o) s[o] = n.charCodeAt(o);
        return s;
      } else
        return (
          e(
            'This environment does not support reading binary tags; either Buffer or atob is required'
          ),
          t
        );
    },
    stringify({ comment: t, type: e, value: n }, s, o, l) {
      const c = n;
      let u;
      if (typeof Buffer == 'function')
        u = c instanceof Buffer ? c.toString('base64') : Buffer.from(c.buffer).toString('base64');
      else if (typeof btoa == 'function') {
        let d = '';
        for (let h = 0; h < c.length; ++h) d += String.fromCharCode(c[h]);
        u = btoa(d);
      } else
        throw new Error(
          'This environment does not support writing binary tags; either Buffer or btoa is required'
        );
      if ((e || (e = he.BLOCK_LITERAL), e !== he.QUOTE_DOUBLE)) {
        const d = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth),
          h = Math.ceil(u.length / d),
          y = new Array(h);
        for (let v = 0, m = 0; v < h; ++v, m += d) y[v] = u.substr(m, d);
        u = y.join(
          e === he.BLOCK_LITERAL
            ? `
`
            : ' '
        );
      }
      return to({ comment: t, type: e, value: u }, s, o, l);
    },
  };
function Lv(t, e) {
  if (zs(t))
    for (let n = 0; n < t.items.length; ++n) {
      let s = t.items[n];
      if (!$e(s)) {
        if (Fs(s)) {
          s.items.length > 1 && e('Each pair must have its own sequence indicator');
          const o = s.items[0] || new ut(new he(null));
          if (
            (s.commentBefore &&
              (o.key.commentBefore = o.key.commentBefore
                ? `${s.commentBefore}
${o.key.commentBefore}`
                : s.commentBefore),
            s.comment)
          ) {
            const l = o.value ?? o.key;
            l.comment = l.comment
              ? `${s.comment}
${l.comment}`
              : s.comment;
          }
          s = o;
        }
        t.items[n] = $e(s) ? s : new ut(s);
      }
    }
  else e('Expected a sequence for this tag');
  return t;
}
function jv(t, e, n) {
  const { replacer: s } = n,
    o = new cr(t);
  o.tag = 'tag:yaml.org,2002:pairs';
  let l = 0;
  if (e && Symbol.iterator in Object(e))
    for (let c of e) {
      typeof s == 'function' && (c = s.call(e, String(l++), c));
      let u, d;
      if (Array.isArray(c))
        if (c.length === 2) (u = c[0]), (d = c[1]);
        else throw new TypeError(`Expected [key, value] tuple: ${c}`);
      else if (c && c instanceof Object) {
        const h = Object.keys(c);
        if (h.length === 1) (u = h[0]), (d = c[u]);
        else throw new TypeError(`Expected tuple with one key, not ${h.length} keys`);
      } else u = c;
      o.items.push(Hf(u, d, n));
    }
  return o;
}
const Qf = {
  collection: 'seq',
  default: !1,
  tag: 'tag:yaml.org,2002:pairs',
  resolve: Lv,
  createNode: jv,
};
class Ns extends cr {
  constructor() {
    super(),
      (this.add = Pt.prototype.add.bind(this)),
      (this.delete = Pt.prototype.delete.bind(this)),
      (this.get = Pt.prototype.get.bind(this)),
      (this.has = Pt.prototype.has.bind(this)),
      (this.set = Pt.prototype.set.bind(this)),
      (this.tag = Ns.tag);
  }
  toJSON(e, n) {
    if (!n) return super.toJSON(e);
    const s = new Map();
    n != null && n.onCreate && n.onCreate(s);
    for (const o of this.items) {
      let l, c;
      if (
        ($e(o) ? ((l = Gt(o.key, '', n)), (c = Gt(o.value, l, n))) : (l = Gt(o, '', n)), s.has(l))
      )
        throw new Error('Ordered maps must not include duplicate keys');
      s.set(l, c);
    }
    return s;
  }
  static from(e, n, s) {
    const o = jv(e, n, s),
      l = new this();
    return (l.items = o.items), l;
  }
}
Ns.tag = 'tag:yaml.org,2002:omap';
const Gf = {
  collection: 'seq',
  identify: t => t instanceof Map,
  nodeClass: Ns,
  default: !1,
  tag: 'tag:yaml.org,2002:omap',
  resolve(t, e) {
    const n = Lv(t, e),
      s = [];
    for (const { key: o } of n.items)
      Ne(o) &&
        (s.includes(o.value)
          ? e(`Ordered maps must not include duplicate keys: ${o.value}`)
          : s.push(o.value));
    return Object.assign(new Ns(), n);
  },
  createNode: (t, e, n) => Ns.from(t, e, n),
};
function Iv({ value: t, source: e }, n) {
  return e && (t ? Ov : Mv).test.test(e) ? e : t ? n.options.trueStr : n.options.falseStr;
}
const Ov = {
    identify: t => t === !0,
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new he(!0),
    stringify: Iv,
  },
  Mv = {
    identify: t => t === !1,
    default: !0,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new he(!1),
    stringify: Iv,
  },
  eE = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: t =>
      t.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : t[0] === '-'
          ? Number.NEGATIVE_INFINITY
          : Number.POSITIVE_INFINITY,
    stringify: an,
  },
  tE = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: t => parseFloat(t.replace(/_/g, '')),
    stringify(t) {
      const e = Number(t.value);
      return isFinite(e) ? e.toExponential() : an(t);
    },
  },
  nE = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(t) {
      const e = new he(parseFloat(t.replace(/_/g, ''))),
        n = t.indexOf('.');
      if (n !== -1) {
        const s = t.substring(n + 1).replace(/_/g, '');
        s[s.length - 1] === '0' && (e.minFractionDigits = s.length);
      }
      return e;
    },
    stringify: an,
  },
  no = t => typeof t == 'bigint' || Number.isInteger(t);
function va(t, e, n, { intAsBigInt: s }) {
  const o = t[0];
  if (((o === '-' || o === '+') && (e += 1), (t = t.substring(e).replace(/_/g, '')), s)) {
    switch (n) {
      case 2:
        t = `0b${t}`;
        break;
      case 8:
        t = `0o${t}`;
        break;
      case 16:
        t = `0x${t}`;
        break;
    }
    const c = BigInt(t);
    return o === '-' ? BigInt(-1) * c : c;
  }
  const l = parseInt(t, n);
  return o === '-' ? -1 * l : l;
}
function Xf(t, e, n) {
  const { value: s } = t;
  if (no(s)) {
    const o = s.toString(e);
    return s < 0 ? '-' + n + o.substr(1) : n + o;
  }
  return an(t);
}
const rE = {
    identify: no,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'BIN',
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (t, e, n) => va(t, 2, 2, n),
    stringify: t => Xf(t, 2, '0b'),
  },
  sE = {
    identify: no,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^[-+]?0[0-7_]+$/,
    resolve: (t, e, n) => va(t, 1, 8, n),
    stringify: t => Xf(t, 8, '0'),
  },
  iE = {
    identify: no,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (t, e, n) => va(t, 0, 10, n),
    stringify: an,
  },
  oE = {
    identify: no,
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (t, e, n) => va(t, 2, 16, n),
    stringify: t => Xf(t, 16, '0x'),
  };
class Cs extends Pt {
  constructor(e) {
    super(e), (this.tag = Cs.tag);
  }
  add(e) {
    let n;
    $e(e)
      ? (n = e)
      : e && typeof e == 'object' && 'key' in e && 'value' in e && e.value === null
        ? (n = new ut(e.key, null))
        : (n = new ut(e, null)),
      Lr(this.items, n.key) || this.items.push(n);
  }
  get(e, n) {
    const s = Lr(this.items, e);
    return !n && $e(s) ? (Ne(s.key) ? s.key.value : s.key) : s;
  }
  set(e, n) {
    if (typeof n != 'boolean')
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof n}`);
    const s = Lr(this.items, e);
    s && !n ? this.items.splice(this.items.indexOf(s), 1) : !s && n && this.items.push(new ut(e));
  }
  toJSON(e, n) {
    return super.toJSON(e, n, Set);
  }
  toString(e, n, s) {
    if (!e) return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), n, s);
    throw new Error('Set items must all have null values');
  }
  static from(e, n, s) {
    const { replacer: o } = s,
      l = new this(e);
    if (n && Symbol.iterator in Object(n))
      for (let c of n)
        typeof o == 'function' && (c = o.call(n, c, c)), l.items.push(Hf(c, null, s));
    return l;
  }
}
Cs.tag = 'tag:yaml.org,2002:set';
const Jf = {
  collection: 'map',
  identify: t => t instanceof Set,
  nodeClass: Cs,
  default: !1,
  tag: 'tag:yaml.org,2002:set',
  createNode: (t, e, n) => Cs.from(t, e, n),
  resolve(t, e) {
    if (Fs(t)) {
      if (t.hasAllNullValues(!0)) return Object.assign(new Cs(), t);
      e('Set items must all have null values');
    } else e('Expected a mapping for this tag');
    return t;
  },
};
function Yf(t, e) {
  const n = t[0],
    s = n === '-' || n === '+' ? t.substring(1) : t,
    o = c => (e ? BigInt(c) : Number(c)),
    l = s
      .replace(/_/g, '')
      .split(':')
      .reduce((c, u) => c * o(60) + o(u), o(0));
  return n === '-' ? o(-1) * l : l;
}
function $v(t) {
  let { value: e } = t,
    n = c => c;
  if (typeof e == 'bigint') n = c => BigInt(c);
  else if (isNaN(e) || !isFinite(e)) return an(t);
  let s = '';
  e < 0 && ((s = '-'), (e *= n(-1)));
  const o = n(60),
    l = [e % o];
  return (
    e < 60
      ? l.unshift(0)
      : ((e = (e - l[0]) / o), l.unshift(e % o), e >= 60 && ((e = (e - l[0]) / o), l.unshift(e))),
    s +
      l
        .map(c => String(c).padStart(2, '0'))
        .join(':')
        .replace(/000000\d*$/, '')
  );
}
const Pv = {
    identify: t => typeof t == 'bigint' || Number.isInteger(t),
    default: !0,
    tag: 'tag:yaml.org,2002:int',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (t, e, { intAsBigInt: n }) => Yf(t, n),
    stringify: $v,
  },
  Rv = {
    identify: t => typeof t == 'number',
    default: !0,
    tag: 'tag:yaml.org,2002:float',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: t => Yf(t, !1),
    stringify: $v,
  },
  wa = {
    identify: t => t instanceof Date,
    default: !0,
    tag: 'tag:yaml.org,2002:timestamp',
    test: RegExp(
      '^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$'
    ),
    resolve(t) {
      const e = t.match(wa.test);
      if (!e) throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd');
      const [, n, s, o, l, c, u] = e.map(Number),
        d = e[7] ? Number((e[7] + '00').substr(1, 3)) : 0;
      let h = Date.UTC(n, s - 1, o, l || 0, c || 0, u || 0, d);
      const y = e[8];
      if (y && y !== 'Z') {
        let v = Yf(y, !1);
        Math.abs(v) < 30 && (v *= 60), (h -= 6e4 * v);
      }
      return new Date(h);
    },
    stringify: ({ value: t }) => t.toISOString().replace(/((T00:00)?:00)?\.000Z$/, ''),
  },
  Xm = [Bs, Us, ma, ga, Ov, Mv, rE, sE, iE, oE, eE, tE, nE, Kf, On, Gf, Qf, Jf, Pv, Rv, wa],
  Jm = new Map([
    ['core', Xb],
    ['failsafe', [Bs, Us, ma]],
    ['json', Zb],
    ['yaml11', Xm],
    ['yaml-1.1', Xm],
  ]),
  Ym = {
    binary: Kf,
    bool: Vf,
    float: Ev,
    floatExp: bv,
    floatNaN: kv,
    floatTime: Rv,
    int: Cv,
    intHex: Av,
    intOct: Nv,
    intTime: Pv,
    map: Bs,
    merge: On,
    null: ga,
    omap: Gf,
    pairs: Qf,
    seq: Us,
    set: Jf,
    timestamp: wa,
  },
  lE = {
    'tag:yaml.org,2002:binary': Kf,
    'tag:yaml.org,2002:merge': On,
    'tag:yaml.org,2002:omap': Gf,
    'tag:yaml.org,2002:pairs': Qf,
    'tag:yaml.org,2002:set': Jf,
    'tag:yaml.org,2002:timestamp': wa,
  };
function Du(t, e, n) {
  const s = Jm.get(e);
  if (s && !t) return n && !s.includes(On) ? s.concat(On) : s.slice();
  let o = s;
  if (!o)
    if (Array.isArray(t)) o = [];
    else {
      const l = Array.from(Jm.keys())
        .filter(c => c !== 'yaml11')
        .map(c => JSON.stringify(c))
        .join(', ');
      throw new Error(`Unknown schema "${e}"; use one of ${l} or define customTags array`);
    }
  if (Array.isArray(t)) for (const l of t) o = o.concat(l);
  else typeof t == 'function' && (o = t(o.slice()));
  return (
    n && (o = o.concat(On)),
    o.reduce((l, c) => {
      const u = typeof c == 'string' ? Ym[c] : c;
      if (!u) {
        const d = JSON.stringify(c),
          h = Object.keys(Ym)
            .map(y => JSON.stringify(y))
            .join(', ');
        throw new Error(`Unknown custom tag ${d}; use one of ${h}`);
      }
      return l.includes(u) || l.push(u), l;
    }, [])
  );
}
const aE = (t, e) => (t.key < e.key ? -1 : t.key > e.key ? 1 : 0);
class xa {
  constructor({
    compat: e,
    customTags: n,
    merge: s,
    resolveKnownTags: o,
    schema: l,
    sortMapEntries: c,
    toStringDefaults: u,
  }) {
    (this.compat = Array.isArray(e) ? Du(e, 'compat') : e ? Du(null, e) : null),
      (this.name = (typeof l == 'string' && l) || 'core'),
      (this.knownTags = o ? lE : {}),
      (this.tags = Du(n, this.name, s)),
      (this.toStringOptions = u ?? null),
      Object.defineProperty(this, lr, { value: Bs }),
      Object.defineProperty(this, yn, { value: ma }),
      Object.defineProperty(this, Ds, { value: Us }),
      (this.sortMapEntries = typeof c == 'function' ? c : c === !0 ? aE : null);
  }
  clone() {
    const e = Object.create(xa.prototype, Object.getOwnPropertyDescriptors(this));
    return (e.tags = this.tags.slice()), e;
  }
}
function cE(t, e) {
  var d;
  const n = [];
  let s = e.directives === !0;
  if (e.directives !== !1 && t.directives) {
    const h = t.directives.toString(t);
    h ? (n.push(h), (s = !0)) : t.directives.docStart && (s = !0);
  }
  s && n.push('---');
  const o = vv(t, e),
    { commentString: l } = o.options;
  if (t.commentBefore) {
    n.length !== 1 && n.unshift('');
    const h = l(t.commentBefore);
    n.unshift(In(h, ''));
  }
  let c = !1,
    u = null;
  if (t.contents) {
    if (ze(t.contents)) {
      if ((t.contents.spaceBefore && s && n.push(''), t.contents.commentBefore)) {
        const v = l(t.contents.commentBefore);
        n.push(In(v, ''));
      }
      (o.forceBlockIndent = !!t.comment), (u = t.contents.comment);
    }
    const h = u ? void 0 : () => (c = !0);
    let y = Is(t.contents, o, () => (u = null), h);
    u && (y += Ar(y, '', l(u))),
      (y[0] === '|' || y[0] === '>') && n[n.length - 1] === '---'
        ? (n[n.length - 1] = `--- ${y}`)
        : n.push(y);
  } else n.push(Is(t.contents, o));
  if ((d = t.directives) != null && d.docEnd)
    if (t.comment) {
      const h = l(t.comment);
      h.includes(`
`)
        ? (n.push('...'), n.push(In(h, '')))
        : n.push(`... ${h}`);
    } else n.push('...');
  else {
    let h = t.comment;
    h && c && (h = h.replace(/^\n+/, '')),
      h && ((!c || u) && n[n.length - 1] !== '' && n.push(''), n.push(In(l(h), '')));
  }
  return (
    n.join(`
`) +
    `
`
  );
}
class qs {
  constructor(e, n, s) {
    (this.commentBefore = null),
      (this.comment = null),
      (this.errors = []),
      (this.warnings = []),
      Object.defineProperty(this, Xt, { value: rf });
    let o = null;
    typeof n == 'function' || Array.isArray(n)
      ? (o = n)
      : s === void 0 && n && ((s = n), (n = void 0));
    const l = Object.assign(
      {
        intAsBigInt: !1,
        keepSourceTokens: !1,
        logLevel: 'warn',
        prettyErrors: !0,
        strict: !0,
        stringKeys: !1,
        uniqueKeys: !0,
        version: '1.2',
      },
      s
    );
    this.options = l;
    let { version: c } = l;
    s != null && s._directives
      ? ((this.directives = s._directives.atDocument()),
        this.directives.yaml.explicit && (c = this.directives.yaml.version))
      : (this.directives = new pt({ version: c })),
      this.setSchema(c, s),
      (this.contents = e === void 0 ? null : this.createNode(e, o, s));
  }
  clone() {
    const e = Object.create(qs.prototype, { [Xt]: { value: rf } });
    return (
      (e.commentBefore = this.commentBefore),
      (e.comment = this.comment),
      (e.errors = this.errors.slice()),
      (e.warnings = this.warnings.slice()),
      (e.options = Object.assign({}, this.options)),
      this.directives && (e.directives = this.directives.clone()),
      (e.schema = this.schema.clone()),
      (e.contents = ze(this.contents) ? this.contents.clone(e.schema) : this.contents),
      this.range && (e.range = this.range.slice()),
      e
    );
  }
  add(e) {
    ms(this.contents) && this.contents.add(e);
  }
  addIn(e, n) {
    ms(this.contents) && this.contents.addIn(e, n);
  }
  createAlias(e, n) {
    if (!e.anchor) {
      const s = hv(this);
      e.anchor = !n || s.has(n) ? pv(n || 'a', s) : n;
    }
    return new fa(e.anchor);
  }
  createNode(e, n, s) {
    let o;
    if (typeof n == 'function') (e = n.call({ '': e }, '', e)), (o = n);
    else if (Array.isArray(n)) {
      const b = C => typeof C == 'number' || C instanceof String || C instanceof Number,
        T = n.filter(b).map(String);
      T.length > 0 && (n = n.concat(T)), (o = n);
    } else s === void 0 && n && ((s = n), (n = void 0));
    const {
        aliasDuplicateObjects: l,
        anchorPrefix: c,
        flow: u,
        keepUndefined: d,
        onTagObj: h,
        tag: y,
      } = s ?? {},
      { onAnchor: v, setAnchors: m, sourceObjects: w } = Rb(this, c || 'a'),
      S = {
        aliasDuplicateObjects: l ?? !0,
        keepUndefined: d ?? !1,
        onAnchor: v,
        onTagObj: h,
        replacer: o,
        schema: this.schema,
        sourceObjects: w,
      },
      _ = Ji(e, y, S);
    return u && Fe(_) && (_.flow = !0), m(), _;
  }
  createPair(e, n, s = {}) {
    const o = this.createNode(e, null, s),
      l = this.createNode(n, null, s);
    return new ut(o, l);
  }
  delete(e) {
    return ms(this.contents) ? this.contents.delete(e) : !1;
  }
  deleteIn(e) {
    return Vi(e)
      ? this.contents == null
        ? !1
        : ((this.contents = null), !0)
      : ms(this.contents)
        ? this.contents.deleteIn(e)
        : !1;
  }
  get(e, n) {
    return Fe(this.contents) ? this.contents.get(e, n) : void 0;
  }
  getIn(e, n) {
    return Vi(e)
      ? !n && Ne(this.contents)
        ? this.contents.value
        : this.contents
      : Fe(this.contents)
        ? this.contents.getIn(e, n)
        : void 0;
  }
  has(e) {
    return Fe(this.contents) ? this.contents.has(e) : !1;
  }
  hasIn(e) {
    return Vi(e) ? this.contents !== void 0 : Fe(this.contents) ? this.contents.hasIn(e) : !1;
  }
  set(e, n) {
    this.contents == null
      ? (this.contents = Yl(this.schema, [e], n))
      : ms(this.contents) && this.contents.set(e, n);
  }
  setIn(e, n) {
    Vi(e)
      ? (this.contents = n)
      : this.contents == null
        ? (this.contents = Yl(this.schema, Array.from(e), n))
        : ms(this.contents) && this.contents.setIn(e, n);
  }
  setSchema(e, n = {}) {
    typeof e == 'number' && (e = String(e));
    let s;
    switch (e) {
      case '1.1':
        this.directives
          ? (this.directives.yaml.version = '1.1')
          : (this.directives = new pt({ version: '1.1' })),
          (s = { resolveKnownTags: !1, schema: 'yaml-1.1' });
        break;
      case '1.2':
      case 'next':
        this.directives
          ? (this.directives.yaml.version = e)
          : (this.directives = new pt({ version: e })),
          (s = { resolveKnownTags: !0, schema: 'core' });
        break;
      case null:
        this.directives && delete this.directives, (s = null);
        break;
      default: {
        const o = JSON.stringify(e);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${o}`);
      }
    }
    if (n.schema instanceof Object) this.schema = n.schema;
    else if (s) this.schema = new xa(Object.assign(s, n));
    else throw new Error('With a null YAML version, the { schema: Schema } option is required');
  }
  toJS({ json: e, jsonArg: n, mapAsMap: s, maxAliasCount: o, onAnchor: l, reviver: c } = {}) {
    const u = {
        anchors: new Map(),
        doc: this,
        keep: !e,
        mapAsMap: s === !0,
        mapKeyWarned: !1,
        maxAliasCount: typeof o == 'number' ? o : 100,
      },
      d = Gt(this.contents, n ?? '', u);
    if (typeof l == 'function') for (const { count: h, res: y } of u.anchors.values()) l(y, h);
    return typeof c == 'function' ? bs(c, { '': d }, '', d) : d;
  }
  toJSON(e, n) {
    return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: n });
  }
  toString(e = {}) {
    if (this.errors.length > 0) throw new Error('Document with errors cannot be stringified');
    if ('indent' in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
      const n = JSON.stringify(e.indent);
      throw new Error(`"indent" option must be a positive integer, not ${n}`);
    }
    return cE(this, e);
  }
}
function ms(t) {
  if (Fe(t)) return !0;
  throw new Error('Expected a YAML collection as document contents');
}
class Zf extends Error {
  constructor(e, n, s, o) {
    super(), (this.name = e), (this.code = s), (this.message = o), (this.pos = n);
  }
}
class jr extends Zf {
  constructor(e, n, s) {
    super('YAMLParseError', e, n, s);
  }
}
class Dv extends Zf {
  constructor(e, n, s) {
    super('YAMLWarning', e, n, s);
  }
}
const ea = (t, e) => n => {
  if (n.pos[0] === -1) return;
  n.linePos = n.pos.map(u => e.linePos(u));
  const { line: s, col: o } = n.linePos[0];
  n.message += ` at line ${s}, column ${o}`;
  let l = o - 1,
    c = t.substring(e.lineStarts[s - 1], e.lineStarts[s]).replace(/[\n\r]+$/, '');
  if (l >= 60 && c.length > 80) {
    const u = Math.min(l - 39, c.length - 79);
    (c = '…' + c.substring(u)), (l -= u - 1);
  }
  if ((c.length > 80 && (c = c.substring(0, 79) + '…'), s > 1 && /^ *$/.test(c.substring(0, l)))) {
    let u = t.substring(e.lineStarts[s - 2], e.lineStarts[s - 1]);
    u.length > 80 &&
      (u =
        u.substring(0, 79) +
        `…
`),
      (c = u + c);
  }
  if (/[^ ]/.test(c)) {
    let u = 1;
    const d = n.linePos[1];
    d && d.line === s && d.col > o && (u = Math.max(1, Math.min(d.col - o, 80 - l)));
    const h = ' '.repeat(l) + '^'.repeat(u);
    n.message += `:

${c}
${h}
`;
  }
};
function Os(
  t,
  { flow: e, indicator: n, next: s, offset: o, onError: l, parentIndent: c, startOnNewline: u }
) {
  let d = !1,
    h = u,
    y = u,
    v = '',
    m = '',
    w = !1,
    S = !1,
    _ = null,
    b = null,
    T = null,
    C = null,
    O = null,
    R = null,
    D = null;
  for (const B of t)
    switch (
      (S &&
        (B.type !== 'space' &&
          B.type !== 'newline' &&
          B.type !== 'comma' &&
          l(
            B.offset,
            'MISSING_CHAR',
            'Tags and anchors must be separated from the next token by white space'
          ),
        (S = !1)),
      _ &&
        (h &&
          B.type !== 'comment' &&
          B.type !== 'newline' &&
          l(_, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation'),
        (_ = null)),
      B.type)
    ) {
      case 'space':
        !e &&
          (n !== 'doc-start' || (s == null ? void 0 : s.type) !== 'flow-collection') &&
          B.source.includes('	') &&
          (_ = B),
          (y = !0);
        break;
      case 'comment': {
        y ||
          l(
            B,
            'MISSING_CHAR',
            'Comments must be separated from other tokens by white space characters'
          );
        const I = B.source.substring(1) || ' ';
        v ? (v += m + I) : (v = I), (m = ''), (h = !1);
        break;
      }
      case 'newline':
        h ? (v ? (v += B.source) : (d = !0)) : (m += B.source),
          (h = !0),
          (w = !0),
          (b || T) && (C = B),
          (y = !0);
        break;
      case 'anchor':
        b && l(B, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor'),
          B.source.endsWith(':') &&
            l(B.offset + B.source.length - 1, 'BAD_ALIAS', 'Anchor ending in : is ambiguous', !0),
          (b = B),
          D === null && (D = B.offset),
          (h = !1),
          (y = !1),
          (S = !0);
        break;
      case 'tag': {
        T && l(B, 'MULTIPLE_TAGS', 'A node can have at most one tag'),
          (T = B),
          D === null && (D = B.offset),
          (h = !1),
          (y = !1),
          (S = !0);
        break;
      }
      case n:
        (b || T) &&
          l(B, 'BAD_PROP_ORDER', `Anchors and tags must be after the ${B.source} indicator`),
          R && l(B, 'UNEXPECTED_TOKEN', `Unexpected ${B.source} in ${e ?? 'collection'}`),
          (R = B),
          (h = n === 'seq-item-ind' || n === 'explicit-key-ind'),
          (y = !1);
        break;
      case 'comma':
        if (e) {
          O && l(B, 'UNEXPECTED_TOKEN', `Unexpected , in ${e}`), (O = B), (h = !1), (y = !1);
          break;
        }
      default:
        l(B, 'UNEXPECTED_TOKEN', `Unexpected ${B.type} token`), (h = !1), (y = !1);
    }
  const F = t[t.length - 1],
    U = F ? F.offset + F.source.length : o;
  return (
    S &&
      s &&
      s.type !== 'space' &&
      s.type !== 'newline' &&
      s.type !== 'comma' &&
      (s.type !== 'scalar' || s.source !== '') &&
      l(
        s.offset,
        'MISSING_CHAR',
        'Tags and anchors must be separated from the next token by white space'
      ),
    _ &&
      ((h && _.indent <= c) ||
        (s == null ? void 0 : s.type) === 'block-map' ||
        (s == null ? void 0 : s.type) === 'block-seq') &&
      l(_, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation'),
    {
      comma: O,
      found: R,
      spaceBefore: d,
      comment: v,
      hasNewline: w,
      anchor: b,
      tag: T,
      newlineAfterProp: C,
      end: U,
      start: D ?? U,
    }
  );
}
function Yi(t) {
  if (!t) return null;
  switch (t.type) {
    case 'alias':
    case 'scalar':
    case 'double-quoted-scalar':
    case 'single-quoted-scalar':
      if (
        t.source.includes(`
`)
      )
        return !0;
      if (t.end) {
        for (const e of t.end) if (e.type === 'newline') return !0;
      }
      return !1;
    case 'flow-collection':
      for (const e of t.items) {
        for (const n of e.start) if (n.type === 'newline') return !0;
        if (e.sep) {
          for (const n of e.sep) if (n.type === 'newline') return !0;
        }
        if (Yi(e.key) || Yi(e.value)) return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function af(t, e, n) {
  if ((e == null ? void 0 : e.type) === 'flow-collection') {
    const s = e.end[0];
    s.indent === t &&
      (s.source === ']' || s.source === '}') &&
      Yi(e) &&
      n(s, 'BAD_INDENT', 'Flow end indicator should be more indented than parent', !0);
  }
}
function Fv(t, e, n) {
  const { uniqueKeys: s } = t.options;
  if (s === !1) return !1;
  const o =
    typeof s == 'function' ? s : (l, c) => l === c || (Ne(l) && Ne(c) && l.value === c.value);
  return e.some(l => o(l.key, n));
}
const Zm = 'All mapping items must start at the same column';
function uE({ composeNode: t, composeEmptyNode: e }, n, s, o, l) {
  var y;
  const c = (l == null ? void 0 : l.nodeClass) ?? Pt,
    u = new c(n.schema);
  n.atRoot && (n.atRoot = !1);
  let d = s.offset,
    h = null;
  for (const v of s.items) {
    const { start: m, key: w, sep: S, value: _ } = v,
      b = Os(m, {
        indicator: 'explicit-key-ind',
        next: w ?? (S == null ? void 0 : S[0]),
        offset: d,
        onError: o,
        parentIndent: s.indent,
        startOnNewline: !0,
      }),
      T = !b.found;
    if (T) {
      if (
        (w &&
          (w.type === 'block-seq'
            ? o(
                d,
                'BLOCK_AS_IMPLICIT_KEY',
                'A block sequence may not be used as an implicit map key'
              )
            : 'indent' in w && w.indent !== s.indent && o(d, 'BAD_INDENT', Zm)),
        !b.anchor && !b.tag && !S)
      ) {
        (h = b.end),
          b.comment &&
            (u.comment
              ? (u.comment +=
                  `
` + b.comment)
              : (u.comment = b.comment));
        continue;
      }
      (b.newlineAfterProp || Yi(w)) &&
        o(
          w ?? m[m.length - 1],
          'MULTILINE_IMPLICIT_KEY',
          'Implicit keys need to be on a single line'
        );
    } else ((y = b.found) == null ? void 0 : y.indent) !== s.indent && o(d, 'BAD_INDENT', Zm);
    n.atKey = !0;
    const C = b.end,
      O = w ? t(n, w, b, o) : e(n, C, m, null, b, o);
    n.schema.compat && af(s.indent, w, o),
      (n.atKey = !1),
      Fv(n, u.items, O) && o(C, 'DUPLICATE_KEY', 'Map keys must be unique');
    const R = Os(S ?? [], {
      indicator: 'map-value-ind',
      next: _,
      offset: O.range[2],
      onError: o,
      parentIndent: s.indent,
      startOnNewline: !w || w.type === 'block-scalar',
    });
    if (((d = R.end), R.found)) {
      T &&
        ((_ == null ? void 0 : _.type) === 'block-map' &&
          !R.hasNewline &&
          o(d, 'BLOCK_AS_IMPLICIT_KEY', 'Nested mappings are not allowed in compact mappings'),
        n.options.strict &&
          b.start < R.found.offset - 1024 &&
          o(
            O.range,
            'KEY_OVER_1024_CHARS',
            'The : indicator must be at most 1024 chars after the start of an implicit block mapping key'
          ));
      const D = _ ? t(n, _, R, o) : e(n, d, S, null, R, o);
      n.schema.compat && af(s.indent, _, o), (d = D.range[2]);
      const F = new ut(O, D);
      n.options.keepSourceTokens && (F.srcToken = v), u.items.push(F);
    } else {
      T && o(O.range, 'MISSING_CHAR', 'Implicit map keys need to be followed by map values'),
        R.comment &&
          (O.comment
            ? (O.comment +=
                `
` + R.comment)
            : (O.comment = R.comment));
      const D = new ut(O);
      n.options.keepSourceTokens && (D.srcToken = v), u.items.push(D);
    }
  }
  return (
    h && h < d && o(h, 'IMPOSSIBLE', 'Map comment with trailing content'),
    (u.range = [s.offset, d, h ?? d]),
    u
  );
}
function fE({ composeNode: t, composeEmptyNode: e }, n, s, o, l) {
  const c = (l == null ? void 0 : l.nodeClass) ?? cr,
    u = new c(n.schema);
  n.atRoot && (n.atRoot = !1), n.atKey && (n.atKey = !1);
  let d = s.offset,
    h = null;
  for (const { start: y, value: v } of s.items) {
    const m = Os(y, {
      indicator: 'seq-item-ind',
      next: v,
      offset: d,
      onError: o,
      parentIndent: s.indent,
      startOnNewline: !0,
    });
    if (!m.found)
      if (m.anchor || m.tag || v)
        v && v.type === 'block-seq'
          ? o(m.end, 'BAD_INDENT', 'All sequence items must start at the same column')
          : o(d, 'MISSING_CHAR', 'Sequence item without - indicator');
      else {
        (h = m.end), m.comment && (u.comment = m.comment);
        continue;
      }
    const w = v ? t(n, v, m, o) : e(n, m.end, y, null, m, o);
    n.schema.compat && af(s.indent, v, o), (d = w.range[2]), u.items.push(w);
  }
  return (u.range = [s.offset, d, h ?? d]), u;
}
function ro(t, e, n, s) {
  let o = '';
  if (t) {
    let l = !1,
      c = '';
    for (const u of t) {
      const { source: d, type: h } = u;
      switch (h) {
        case 'space':
          l = !0;
          break;
        case 'comment': {
          n &&
            !l &&
            s(
              u,
              'MISSING_CHAR',
              'Comments must be separated from other tokens by white space characters'
            );
          const y = d.substring(1) || ' ';
          o ? (o += c + y) : (o = y), (c = '');
          break;
        }
        case 'newline':
          o && (c += d), (l = !0);
          break;
        default:
          s(u, 'UNEXPECTED_TOKEN', `Unexpected ${h} at node end`);
      }
      e += d.length;
    }
  }
  return { comment: o, offset: e };
}
const Fu = 'Block collections are not allowed within flow collections',
  zu = t => t && (t.type === 'block-map' || t.type === 'block-seq');
function dE({ composeNode: t, composeEmptyNode: e }, n, s, o, l) {
  const c = s.start.source === '{',
    u = c ? 'flow map' : 'flow sequence',
    d = (l == null ? void 0 : l.nodeClass) ?? (c ? Pt : cr),
    h = new d(n.schema);
  h.flow = !0;
  const y = n.atRoot;
  y && (n.atRoot = !1), n.atKey && (n.atKey = !1);
  let v = s.offset + s.start.source.length;
  for (let b = 0; b < s.items.length; ++b) {
    const T = s.items[b],
      { start: C, key: O, sep: R, value: D } = T,
      F = Os(C, {
        flow: u,
        indicator: 'explicit-key-ind',
        next: O ?? (R == null ? void 0 : R[0]),
        offset: v,
        onError: o,
        parentIndent: s.indent,
        startOnNewline: !1,
      });
    if (!F.found) {
      if (!F.anchor && !F.tag && !R && !D) {
        b === 0 && F.comma
          ? o(F.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${u}`)
          : b < s.items.length - 1 &&
            o(F.start, 'UNEXPECTED_TOKEN', `Unexpected empty item in ${u}`),
          F.comment &&
            (h.comment
              ? (h.comment +=
                  `
` + F.comment)
              : (h.comment = F.comment)),
          (v = F.end);
        continue;
      }
      !c &&
        n.options.strict &&
        Yi(O) &&
        o(
          O,
          'MULTILINE_IMPLICIT_KEY',
          'Implicit keys of flow sequence pairs need to be on a single line'
        );
    }
    if (b === 0) F.comma && o(F.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${u}`);
    else if ((F.comma || o(F.start, 'MISSING_CHAR', `Missing , between ${u} items`), F.comment)) {
      let U = '';
      e: for (const B of C)
        switch (B.type) {
          case 'comma':
          case 'space':
            break;
          case 'comment':
            U = B.source.substring(1);
            break e;
          default:
            break e;
        }
      if (U) {
        let B = h.items[h.items.length - 1];
        $e(B) && (B = B.value ?? B.key),
          B.comment
            ? (B.comment +=
                `
` + U)
            : (B.comment = U),
          (F.comment = F.comment.substring(U.length + 1));
      }
    }
    if (!c && !R && !F.found) {
      const U = D ? t(n, D, F, o) : e(n, F.end, R, null, F, o);
      h.items.push(U), (v = U.range[2]), zu(D) && o(U.range, 'BLOCK_IN_FLOW', Fu);
    } else {
      n.atKey = !0;
      const U = F.end,
        B = O ? t(n, O, F, o) : e(n, U, C, null, F, o);
      zu(O) && o(B.range, 'BLOCK_IN_FLOW', Fu), (n.atKey = !1);
      const I = Os(R ?? [], {
        flow: u,
        indicator: 'map-value-ind',
        next: D,
        offset: B.range[2],
        onError: o,
        parentIndent: s.indent,
        startOnNewline: !1,
      });
      if (I.found) {
        if (!c && !F.found && n.options.strict) {
          if (R)
            for (const z of R) {
              if (z === I.found) break;
              if (z.type === 'newline') {
                o(
                  z,
                  'MULTILINE_IMPLICIT_KEY',
                  'Implicit keys of flow sequence pairs need to be on a single line'
                );
                break;
              }
            }
          F.start < I.found.offset - 1024 &&
            o(
              I.found,
              'KEY_OVER_1024_CHARS',
              'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key'
            );
        }
      } else
        D &&
          ('source' in D && D.source && D.source[0] === ':'
            ? o(D, 'MISSING_CHAR', `Missing space after : in ${u}`)
            : o(I.start, 'MISSING_CHAR', `Missing , or : between ${u} items`));
      const Q = D ? t(n, D, I, o) : I.found ? e(n, I.end, R, null, I, o) : null;
      Q
        ? zu(D) && o(Q.range, 'BLOCK_IN_FLOW', Fu)
        : I.comment &&
          (B.comment
            ? (B.comment +=
                `
` + I.comment)
            : (B.comment = I.comment));
      const W = new ut(B, Q);
      if ((n.options.keepSourceTokens && (W.srcToken = T), c)) {
        const z = h;
        Fv(n, z.items, B) && o(U, 'DUPLICATE_KEY', 'Map keys must be unique'), z.items.push(W);
      } else {
        const z = new Pt(n.schema);
        (z.flow = !0), z.items.push(W);
        const J = (Q ?? B).range;
        (z.range = [B.range[0], J[1], J[2]]), h.items.push(z);
      }
      v = Q ? Q.range[2] : I.end;
    }
  }
  const m = c ? '}' : ']',
    [w, ...S] = s.end;
  let _ = v;
  if (w && w.source === m) _ = w.offset + w.source.length;
  else {
    const b = u[0].toUpperCase() + u.substring(1),
      T = y
        ? `${b} must end with a ${m}`
        : `${b} in block collection must be sufficiently indented and end with a ${m}`;
    o(v, y ? 'MISSING_CHAR' : 'BAD_INDENT', T), w && w.source.length !== 1 && S.unshift(w);
  }
  if (S.length > 0) {
    const b = ro(S, _, n.options.strict, o);
    b.comment &&
      (h.comment
        ? (h.comment +=
            `
` + b.comment)
        : (h.comment = b.comment)),
      (h.range = [s.offset, _, b.offset]);
  } else h.range = [s.offset, _, _];
  return h;
}
function Bu(t, e, n, s, o, l) {
  const c =
      n.type === 'block-map'
        ? uE(t, e, n, s, l)
        : n.type === 'block-seq'
          ? fE(t, e, n, s, l)
          : dE(t, e, n, s, l),
    u = c.constructor;
  return o === '!' || o === u.tagName ? ((c.tag = u.tagName), c) : (o && (c.tag = o), c);
}
function hE(t, e, n, s, o) {
  var m;
  const l = s.tag,
    c = l ? e.directives.tagName(l.source, w => o(l, 'TAG_RESOLVE_FAILED', w)) : null;
  if (n.type === 'block-seq') {
    const { anchor: w, newlineAfterProp: S } = s,
      _ = w && l ? (w.offset > l.offset ? w : l) : (w ?? l);
    _ &&
      (!S || S.offset < _.offset) &&
      o(_, 'MISSING_CHAR', 'Missing newline after block sequence props');
  }
  const u =
    n.type === 'block-map'
      ? 'map'
      : n.type === 'block-seq'
        ? 'seq'
        : n.start.source === '{'
          ? 'map'
          : 'seq';
  if (
    !l ||
    !c ||
    c === '!' ||
    (c === Pt.tagName && u === 'map') ||
    (c === cr.tagName && u === 'seq')
  )
    return Bu(t, e, n, o, c);
  let d = e.schema.tags.find(w => w.tag === c && w.collection === u);
  if (!d) {
    const w = e.schema.knownTags[c];
    if (w && w.collection === u) e.schema.tags.push(Object.assign({}, w, { default: !1 })), (d = w);
    else
      return (
        w != null && w.collection
          ? o(
              l,
              'BAD_COLLECTION_TYPE',
              `${w.tag} used for ${u} collection, but expects ${w.collection}`,
              !0
            )
          : o(l, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${c}`, !0),
        Bu(t, e, n, o, c)
      );
  }
  const h = Bu(t, e, n, o, c, d),
    y =
      ((m = d.resolve) == null
        ? void 0
        : m.call(d, h, w => o(l, 'TAG_RESOLVE_FAILED', w), e.options)) ?? h,
    v = ze(y) ? y : new he(y);
  return (v.range = h.range), (v.tag = c), d != null && d.format && (v.format = d.format), v;
}
function zv(t, e, n) {
  const s = e.offset,
    o = pE(e, t.options.strict, n);
  if (!o) return { value: '', type: null, comment: '', range: [s, s, s] };
  const l = o.mode === '>' ? he.BLOCK_FOLDED : he.BLOCK_LITERAL,
    c = e.source ? mE(e.source) : [];
  let u = c.length;
  for (let _ = c.length - 1; _ >= 0; --_) {
    const b = c[_][1];
    if (b === '' || b === '\r') u = _;
    else break;
  }
  if (u === 0) {
    const _ =
      o.chomp === '+' && c.length > 0
        ? `
`.repeat(Math.max(1, c.length - 1))
        : '';
    let b = s + o.length;
    return (
      e.source && (b += e.source.length),
      { value: _, type: l, comment: o.comment, range: [s, b, b] }
    );
  }
  let d = e.indent + o.indent,
    h = e.offset + o.length,
    y = 0;
  for (let _ = 0; _ < u; ++_) {
    const [b, T] = c[_];
    if (T === '' || T === '\r') o.indent === 0 && b.length > d && (d = b.length);
    else {
      b.length < d &&
        n(
          h + b.length,
          'MISSING_CHAR',
          'Block scalars with more-indented leading empty lines must use an explicit indentation indicator'
        ),
        o.indent === 0 && (d = b.length),
        (y = _),
        d === 0 &&
          !t.atRoot &&
          n(h, 'BAD_INDENT', 'Block scalar values in collections must be indented');
      break;
    }
    h += b.length + T.length + 1;
  }
  for (let _ = c.length - 1; _ >= u; --_) c[_][0].length > d && (u = _ + 1);
  let v = '',
    m = '',
    w = !1;
  for (let _ = 0; _ < y; ++_)
    v +=
      c[_][0].slice(d) +
      `
`;
  for (let _ = y; _ < u; ++_) {
    let [b, T] = c[_];
    h += b.length + T.length + 1;
    const C = T[T.length - 1] === '\r';
    if ((C && (T = T.slice(0, -1)), T && b.length < d)) {
      const R = `Block scalar lines must not be less indented than their ${o.indent ? 'explicit indentation indicator' : 'first line'}`;
      n(h - T.length - (C ? 2 : 1), 'BAD_INDENT', R), (b = '');
    }
    l === he.BLOCK_LITERAL
      ? ((v += m + b.slice(d) + T),
        (m = `
`))
      : b.length > d || T[0] === '	'
        ? (m === ' '
            ? (m = `
`)
            : !w &&
              m ===
                `
` &&
              (m = `

`),
          (v += m + b.slice(d) + T),
          (m = `
`),
          (w = !0))
        : T === ''
          ? m ===
            `
`
            ? (v += `
`)
            : (m = `
`)
          : ((v += m + T), (m = ' '), (w = !1));
  }
  switch (o.chomp) {
    case '-':
      break;
    case '+':
      for (let _ = u; _ < c.length; ++_)
        v +=
          `
` + c[_][0].slice(d);
      v[v.length - 1] !==
        `
` &&
        (v += `
`);
      break;
    default:
      v += `
`;
  }
  const S = s + o.length + e.source.length;
  return { value: v, type: l, comment: o.comment, range: [s, S, S] };
}
function pE({ offset: t, props: e }, n, s) {
  if (e[0].type !== 'block-scalar-header')
    return s(e[0], 'IMPOSSIBLE', 'Block scalar header not found'), null;
  const { source: o } = e[0],
    l = o[0];
  let c = 0,
    u = '',
    d = -1;
  for (let m = 1; m < o.length; ++m) {
    const w = o[m];
    if (!u && (w === '-' || w === '+')) u = w;
    else {
      const S = Number(w);
      !c && S ? (c = S) : d === -1 && (d = t + m);
    }
  }
  d !== -1 && s(d, 'UNEXPECTED_TOKEN', `Block scalar header includes extra characters: ${o}`);
  let h = !1,
    y = '',
    v = o.length;
  for (let m = 1; m < e.length; ++m) {
    const w = e[m];
    switch (w.type) {
      case 'space':
        h = !0;
      case 'newline':
        v += w.source.length;
        break;
      case 'comment':
        n &&
          !h &&
          s(
            w,
            'MISSING_CHAR',
            'Comments must be separated from other tokens by white space characters'
          ),
          (v += w.source.length),
          (y = w.source.substring(1));
        break;
      case 'error':
        s(w, 'UNEXPECTED_TOKEN', w.message), (v += w.source.length);
        break;
      default: {
        const S = `Unexpected token in block scalar header: ${w.type}`;
        s(w, 'UNEXPECTED_TOKEN', S);
        const _ = w.source;
        _ && typeof _ == 'string' && (v += _.length);
      }
    }
  }
  return { mode: l, indent: c, chomp: u, comment: y, length: v };
}
function mE(t) {
  const e = t.split(/\n( *)/),
    n = e[0],
    s = n.match(/^( *)/),
    l = [s != null && s[1] ? [s[1], n.slice(s[1].length)] : ['', n]];
  for (let c = 1; c < e.length; c += 2) l.push([e[c], e[c + 1]]);
  return l;
}
function Bv(t, e, n) {
  const { offset: s, type: o, source: l, end: c } = t;
  let u, d;
  const h = (m, w, S) => n(s + m, w, S);
  switch (o) {
    case 'scalar':
      (u = he.PLAIN), (d = gE(l, h));
      break;
    case 'single-quoted-scalar':
      (u = he.QUOTE_SINGLE), (d = yE(l, h));
      break;
    case 'double-quoted-scalar':
      (u = he.QUOTE_DOUBLE), (d = vE(l, h));
      break;
    default:
      return (
        n(t, 'UNEXPECTED_TOKEN', `Expected a flow scalar value, but found: ${o}`),
        { value: '', type: null, comment: '', range: [s, s + l.length, s + l.length] }
      );
  }
  const y = s + l.length,
    v = ro(c, y, e, n);
  return { value: d, type: u, comment: v.comment, range: [s, y, v.offset] };
}
function gE(t, e) {
  let n = '';
  switch (t[0]) {
    case '	':
      n = 'a tab character';
      break;
    case ',':
      n = 'flow indicator character ,';
      break;
    case '%':
      n = 'directive indicator character %';
      break;
    case '|':
    case '>': {
      n = `block scalar indicator ${t[0]}`;
      break;
    }
    case '@':
    case '`': {
      n = `reserved character ${t[0]}`;
      break;
    }
  }
  return n && e(0, 'BAD_SCALAR_START', `Plain value cannot start with ${n}`), Uv(t);
}
function yE(t, e) {
  return (
    (t[t.length - 1] !== "'" || t.length === 1) &&
      e(t.length, 'MISSING_CHAR', "Missing closing 'quote"),
    Uv(t.slice(1, -1)).replace(/''/g, "'")
  );
}
function Uv(t) {
  let e, n;
  try {
    (e = new RegExp(
      `(.*?)(?<![ 	])[ 	]*\r?
`,
      'sy'
    )),
      (n = new RegExp(
        `[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,
        'sy'
      ));
  } catch {
    (e = /(.*?)[ \t]*\r?\n/sy), (n = /[ \t]*(.*?)[ \t]*\r?\n/sy);
  }
  let s = e.exec(t);
  if (!s) return t;
  let o = s[1],
    l = ' ',
    c = e.lastIndex;
  for (n.lastIndex = c; (s = n.exec(t)); )
    s[1] === ''
      ? l ===
        `
`
        ? (o += l)
        : (l = `
`)
      : ((o += l + s[1]), (l = ' ')),
      (c = n.lastIndex);
  const u = /[ \t]*(.*)/sy;
  return (u.lastIndex = c), (s = u.exec(t)), o + l + ((s == null ? void 0 : s[1]) ?? '');
}
function vE(t, e) {
  let n = '';
  for (let s = 1; s < t.length - 1; ++s) {
    const o = t[s];
    if (
      !(
        o === '\r' &&
        t[s + 1] ===
          `
`
      )
    )
      if (
        o ===
        `
`
      ) {
        const { fold: l, offset: c } = wE(t, s);
        (n += l), (s = c);
      } else if (o === '\\') {
        let l = t[++s];
        const c = xE[l];
        if (c) n += c;
        else if (
          l ===
          `
`
        )
          for (l = t[s + 1]; l === ' ' || l === '	'; ) l = t[++s + 1];
        else if (
          l === '\r' &&
          t[s + 1] ===
            `
`
        )
          for (l = t[++s + 1]; l === ' ' || l === '	'; ) l = t[++s + 1];
        else if (l === 'x' || l === 'u' || l === 'U') {
          const u = { x: 2, u: 4, U: 8 }[l];
          (n += SE(t, s + 1, u, e)), (s += u);
        } else {
          const u = t.substr(s - 1, 2);
          e(s - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${u}`), (n += u);
        }
      } else if (o === ' ' || o === '	') {
        const l = s;
        let c = t[s + 1];
        for (; c === ' ' || c === '	'; ) c = t[++s + 1];
        c !==
          `
` &&
          !(
            c === '\r' &&
            t[s + 2] ===
              `
`
          ) &&
          (n += s > l ? t.slice(l, s + 1) : o);
      } else n += o;
  }
  return (
    (t[t.length - 1] !== '"' || t.length === 1) &&
      e(t.length, 'MISSING_CHAR', 'Missing closing "quote'),
    n
  );
}
function wE(t, e) {
  let n = '',
    s = t[e + 1];
  for (
    ;
    (s === ' ' ||
      s === '	' ||
      s ===
        `
` ||
      s === '\r') &&
    !(
      s === '\r' &&
      t[e + 2] !==
        `
`
    );

  )
    s ===
      `
` &&
      (n += `
`),
      (e += 1),
      (s = t[e + 1]);
  return n || (n = ' '), { fold: n, offset: e };
}
const xE = {
  0: '\0',
  a: '\x07',
  b: '\b',
  e: '\x1B',
  f: '\f',
  n: `
`,
  r: '\r',
  t: '	',
  v: '\v',
  N: '',
  _: ' ',
  L: '\u2028',
  P: '\u2029',
  ' ': ' ',
  '"': '"',
  '/': '/',
  '\\': '\\',
  '	': '	',
};
function SE(t, e, n, s) {
  const o = t.substr(e, n),
    c = o.length === n && /^[0-9a-fA-F]+$/.test(o) ? parseInt(o, 16) : NaN;
  if (isNaN(c)) {
    const u = t.substr(e - 2, n + 2);
    return s(e - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${u}`), u;
  }
  return String.fromCodePoint(c);
}
function qv(t, e, n, s) {
  const {
      value: o,
      type: l,
      comment: c,
      range: u,
    } = e.type === 'block-scalar' ? zv(t, e, s) : Bv(e, t.options.strict, s),
    d = n ? t.directives.tagName(n.source, v => s(n, 'TAG_RESOLVE_FAILED', v)) : null;
  let h;
  t.options.stringKeys && t.atKey
    ? (h = t.schema[yn])
    : d
      ? (h = _E(t.schema, o, d, n, s))
      : e.type === 'scalar'
        ? (h = kE(t, o, e, s))
        : (h = t.schema[yn]);
  let y;
  try {
    const v = h.resolve(o, m => s(n ?? e, 'TAG_RESOLVE_FAILED', m), t.options);
    y = Ne(v) ? v : new he(v);
  } catch (v) {
    const m = v instanceof Error ? v.message : String(v);
    s(n ?? e, 'TAG_RESOLVE_FAILED', m), (y = new he(o));
  }
  return (
    (y.range = u),
    (y.source = o),
    l && (y.type = l),
    d && (y.tag = d),
    h.format && (y.format = h.format),
    c && (y.comment = c),
    y
  );
}
function _E(t, e, n, s, o) {
  var u;
  if (n === '!') return t[yn];
  const l = [];
  for (const d of t.tags)
    if (!d.collection && d.tag === n)
      if (d.default && d.test) l.push(d);
      else return d;
  for (const d of l) if ((u = d.test) != null && u.test(e)) return d;
  const c = t.knownTags[n];
  return c && !c.collection
    ? (t.tags.push(Object.assign({}, c, { default: !1, test: void 0 })), c)
    : (o(s, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${n}`, n !== 'tag:yaml.org,2002:str'), t[yn]);
}
function kE({ atKey: t, directives: e, schema: n }, s, o, l) {
  const c =
    n.tags.find(u => {
      var d;
      return (
        (u.default === !0 || (t && u.default === 'key')) &&
        ((d = u.test) == null ? void 0 : d.test(s))
      );
    }) || n[yn];
  if (n.compat) {
    const u =
      n.compat.find(d => {
        var h;
        return d.default && ((h = d.test) == null ? void 0 : h.test(s));
      }) ?? n[yn];
    if (c.tag !== u.tag) {
      const d = e.tagString(c.tag),
        h = e.tagString(u.tag),
        y = `Value may be parsed as either ${d} or ${h}`;
      l(o, 'TAG_RESOLVE_FAILED', y, !0);
    }
  }
  return c;
}
function bE(t, e, n) {
  if (e) {
    n === null && (n = e.length);
    for (let s = n - 1; s >= 0; --s) {
      let o = e[s];
      switch (o.type) {
        case 'space':
        case 'comment':
        case 'newline':
          t -= o.source.length;
          continue;
      }
      for (o = e[++s]; (o == null ? void 0 : o.type) === 'space'; )
        (t += o.source.length), (o = e[++s]);
      break;
    }
  }
  return t;
}
const EE = { composeNode: Hv, composeEmptyNode: ed };
function Hv(t, e, n, s) {
  const o = t.atKey,
    { spaceBefore: l, comment: c, anchor: u, tag: d } = n;
  let h,
    y = !0;
  switch (e.type) {
    case 'alias':
      (h = TE(t, e, s)),
        (u || d) && s(e, 'ALIAS_PROPS', 'An alias node must not specify any properties');
      break;
    case 'scalar':
    case 'single-quoted-scalar':
    case 'double-quoted-scalar':
    case 'block-scalar':
      (h = qv(t, e, d, s)), u && (h.anchor = u.source.substring(1));
      break;
    case 'block-map':
    case 'block-seq':
    case 'flow-collection':
      (h = hE(EE, t, e, n, s)), u && (h.anchor = u.source.substring(1));
      break;
    default: {
      const v = e.type === 'error' ? e.message : `Unsupported token (type: ${e.type})`;
      s(e, 'UNEXPECTED_TOKEN', v), (h = ed(t, e.offset, void 0, null, n, s)), (y = !1);
    }
  }
  return (
    u && h.anchor === '' && s(u, 'BAD_ALIAS', 'Anchor cannot be an empty string'),
    o &&
      t.options.stringKeys &&
      (!Ne(h) || typeof h.value != 'string' || (h.tag && h.tag !== 'tag:yaml.org,2002:str')) &&
      s(d ?? e, 'NON_STRING_KEY', 'With stringKeys, all keys must be strings'),
    l && (h.spaceBefore = !0),
    c && (e.type === 'scalar' && e.source === '' ? (h.comment = c) : (h.commentBefore = c)),
    t.options.keepSourceTokens && y && (h.srcToken = e),
    h
  );
}
function ed(t, e, n, s, { spaceBefore: o, comment: l, anchor: c, tag: u, end: d }, h) {
  const y = { type: 'scalar', offset: bE(e, n, s), indent: -1, source: '' },
    v = qv(t, y, u, h);
  return (
    c &&
      ((v.anchor = c.source.substring(1)),
      v.anchor === '' && h(c, 'BAD_ALIAS', 'Anchor cannot be an empty string')),
    o && (v.spaceBefore = !0),
    l && ((v.comment = l), (v.range[2] = d)),
    v
  );
}
function TE({ options: t }, { offset: e, source: n, end: s }, o) {
  const l = new fa(n.substring(1));
  l.source === '' && o(e, 'BAD_ALIAS', 'Alias cannot be an empty string'),
    l.source.endsWith(':') &&
      o(e + n.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', !0);
  const c = e + n.length,
    u = ro(s, c, t.strict, o);
  return (l.range = [e, c, u.offset]), u.comment && (l.comment = u.comment), l;
}
function NE(t, e, { offset: n, start: s, value: o, end: l }, c) {
  const u = Object.assign({ _directives: e }, t),
    d = new qs(void 0, u),
    h = { atKey: !1, atRoot: !0, directives: d.directives, options: d.options, schema: d.schema },
    y = Os(s, {
      indicator: 'doc-start',
      next: o ?? (l == null ? void 0 : l[0]),
      offset: n,
      onError: c,
      parentIndent: 0,
      startOnNewline: !0,
    });
  y.found &&
    ((d.directives.docStart = !0),
    o &&
      (o.type === 'block-map' || o.type === 'block-seq') &&
      !y.hasNewline &&
      c(
        y.end,
        'MISSING_CHAR',
        'Block collection cannot start on same line with directives-end marker'
      )),
    (d.contents = o ? Hv(h, o, y, c) : ed(h, y.end, s, null, y, c));
  const v = d.contents.range[2],
    m = ro(l, v, !1, c);
  return m.comment && (d.comment = m.comment), (d.range = [n, v, m.offset]), d;
}
function zi(t) {
  if (typeof t == 'number') return [t, t + 1];
  if (Array.isArray(t)) return t.length === 2 ? t : [t[0], t[1]];
  const { offset: e, source: n } = t;
  return [e, e + (typeof n == 'string' ? n.length : 1)];
}
function eg(t) {
  var o;
  let e = '',
    n = !1,
    s = !1;
  for (let l = 0; l < t.length; ++l) {
    const c = t[l];
    switch (c[0]) {
      case '#':
        (e +=
          (e === ''
            ? ''
            : s
              ? `

`
              : `
`) + (c.substring(1) || ' ')),
          (n = !0),
          (s = !1);
        break;
      case '%':
        ((o = t[l + 1]) == null ? void 0 : o[0]) !== '#' && (l += 1), (n = !1);
        break;
      default:
        n || (s = !0), (n = !1);
    }
  }
  return { comment: e, afterEmptyLine: s };
}
class td {
  constructor(e = {}) {
    (this.doc = null),
      (this.atDirectives = !1),
      (this.prelude = []),
      (this.errors = []),
      (this.warnings = []),
      (this.onError = (n, s, o, l) => {
        const c = zi(n);
        l ? this.warnings.push(new Dv(c, s, o)) : this.errors.push(new jr(c, s, o));
      }),
      (this.directives = new pt({ version: e.version || '1.2' })),
      (this.options = e);
  }
  decorate(e, n) {
    const { comment: s, afterEmptyLine: o } = eg(this.prelude);
    if (s) {
      const l = e.contents;
      if (n)
        e.comment = e.comment
          ? `${e.comment}
${s}`
          : s;
      else if (o || e.directives.docStart || !l) e.commentBefore = s;
      else if (Fe(l) && !l.flow && l.items.length > 0) {
        let c = l.items[0];
        $e(c) && (c = c.key);
        const u = c.commentBefore;
        c.commentBefore = u
          ? `${s}
${u}`
          : s;
      } else {
        const c = l.commentBefore;
        l.commentBefore = c
          ? `${s}
${c}`
          : s;
      }
    }
    n
      ? (Array.prototype.push.apply(e.errors, this.errors),
        Array.prototype.push.apply(e.warnings, this.warnings))
      : ((e.errors = this.errors), (e.warnings = this.warnings)),
      (this.prelude = []),
      (this.errors = []),
      (this.warnings = []);
  }
  streamInfo() {
    return {
      comment: eg(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings,
    };
  }
  *compose(e, n = !1, s = -1) {
    for (const o of e) yield* this.next(o);
    yield* this.end(n, s);
  }
  *next(e) {
    switch (e.type) {
      case 'directive':
        this.directives.add(e.source, (n, s, o) => {
          const l = zi(e);
          (l[0] += n), this.onError(l, 'BAD_DIRECTIVE', s, o);
        }),
          this.prelude.push(e.source),
          (this.atDirectives = !0);
        break;
      case 'document': {
        const n = NE(this.options, this.directives, e, this.onError);
        this.atDirectives &&
          !n.directives.docStart &&
          this.onError(e, 'MISSING_CHAR', 'Missing directives-end/doc-start indicator line'),
          this.decorate(n, !1),
          this.doc && (yield this.doc),
          (this.doc = n),
          (this.atDirectives = !1);
        break;
      }
      case 'byte-order-mark':
      case 'space':
        break;
      case 'comment':
      case 'newline':
        this.prelude.push(e.source);
        break;
      case 'error': {
        const n = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message,
          s = new jr(zi(e), 'UNEXPECTED_TOKEN', n);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case 'doc-end': {
        if (!this.doc) {
          const s = 'Unexpected doc-end without preceding document';
          this.errors.push(new jr(zi(e), 'UNEXPECTED_TOKEN', s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const n = ro(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if ((this.decorate(this.doc, !0), n.comment)) {
          const s = this.doc.comment;
          this.doc.comment = s
            ? `${s}
${n.comment}`
            : n.comment;
        }
        this.doc.range[2] = n.offset;
        break;
      }
      default:
        this.errors.push(new jr(zi(e), 'UNEXPECTED_TOKEN', `Unsupported token ${e.type}`));
    }
  }
  *end(e = !1, n = -1) {
    if (this.doc) this.decorate(this.doc, !0), yield this.doc, (this.doc = null);
    else if (e) {
      const s = Object.assign({ _directives: this.directives }, this.options),
        o = new qs(void 0, s);
      this.atDirectives && this.onError(n, 'MISSING_CHAR', 'Missing directives-end indicator line'),
        (o.range = [0, n, n]),
        this.decorate(o, !1),
        yield o;
    }
  }
}
function CE(t, e = !0, n) {
  if (t) {
    const s = (o, l, c) => {
      const u = typeof o == 'number' ? o : Array.isArray(o) ? o[0] : o.offset;
      if (n) n(u, l, c);
      else throw new jr([u, u + 1], l, c);
    };
    switch (t.type) {
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return Bv(t, e, s);
      case 'block-scalar':
        return zv({ options: { strict: e } }, t, s);
    }
  }
  return null;
}
function AE(t, e) {
  const { implicitKey: n = !1, indent: s, inFlow: o = !1, offset: l = -1, type: c = 'PLAIN' } = e,
    u = to(
      { type: c, value: t },
      {
        implicitKey: n,
        indent: s > 0 ? ' '.repeat(s) : '',
        inFlow: o,
        options: { blockQuote: !0, lineWidth: -1 },
      }
    ),
    d = e.end ?? [
      {
        type: 'newline',
        offset: -1,
        indent: s,
        source: `
`,
      },
    ];
  switch (u[0]) {
    case '|':
    case '>': {
      const h = u.indexOf(`
`),
        y = u.substring(0, h),
        v =
          u.substring(h + 1) +
          `
`,
        m = [{ type: 'block-scalar-header', offset: l, indent: s, source: y }];
      return (
        Vv(m, d) ||
          m.push({
            type: 'newline',
            offset: -1,
            indent: s,
            source: `
`,
          }),
        { type: 'block-scalar', offset: l, indent: s, props: m, source: v }
      );
    }
    case '"':
      return { type: 'double-quoted-scalar', offset: l, indent: s, source: u, end: d };
    case "'":
      return { type: 'single-quoted-scalar', offset: l, indent: s, source: u, end: d };
    default:
      return { type: 'scalar', offset: l, indent: s, source: u, end: d };
  }
}
function LE(t, e, n = {}) {
  let { afterKey: s = !1, implicitKey: o = !1, inFlow: l = !1, type: c } = n,
    u = 'indent' in t ? t.indent : null;
  if ((s && typeof u == 'number' && (u += 2), !c))
    switch (t.type) {
      case 'single-quoted-scalar':
        c = 'QUOTE_SINGLE';
        break;
      case 'double-quoted-scalar':
        c = 'QUOTE_DOUBLE';
        break;
      case 'block-scalar': {
        const h = t.props[0];
        if (h.type !== 'block-scalar-header') throw new Error('Invalid block scalar header');
        c = h.source[0] === '>' ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL';
        break;
      }
      default:
        c = 'PLAIN';
    }
  const d = to(
    { type: c, value: e },
    {
      implicitKey: o || u === null,
      indent: u !== null && u > 0 ? ' '.repeat(u) : '',
      inFlow: l,
      options: { blockQuote: !0, lineWidth: -1 },
    }
  );
  switch (d[0]) {
    case '|':
    case '>':
      jE(t, d);
      break;
    case '"':
      Uu(t, d, 'double-quoted-scalar');
      break;
    case "'":
      Uu(t, d, 'single-quoted-scalar');
      break;
    default:
      Uu(t, d, 'scalar');
  }
}
function jE(t, e) {
  const n = e.indexOf(`
`),
    s = e.substring(0, n),
    o =
      e.substring(n + 1) +
      `
`;
  if (t.type === 'block-scalar') {
    const l = t.props[0];
    if (l.type !== 'block-scalar-header') throw new Error('Invalid block scalar header');
    (l.source = s), (t.source = o);
  } else {
    const { offset: l } = t,
      c = 'indent' in t ? t.indent : -1,
      u = [{ type: 'block-scalar-header', offset: l, indent: c, source: s }];
    Vv(u, 'end' in t ? t.end : void 0) ||
      u.push({
        type: 'newline',
        offset: -1,
        indent: c,
        source: `
`,
      });
    for (const d of Object.keys(t)) d !== 'type' && d !== 'offset' && delete t[d];
    Object.assign(t, { type: 'block-scalar', indent: c, props: u, source: o });
  }
}
function Vv(t, e) {
  if (e)
    for (const n of e)
      switch (n.type) {
        case 'space':
        case 'comment':
          t.push(n);
          break;
        case 'newline':
          return t.push(n), !0;
      }
  return !1;
}
function Uu(t, e, n) {
  switch (t.type) {
    case 'scalar':
    case 'double-quoted-scalar':
    case 'single-quoted-scalar':
      (t.type = n), (t.source = e);
      break;
    case 'block-scalar': {
      const s = t.props.slice(1);
      let o = e.length;
      t.props[0].type === 'block-scalar-header' && (o -= t.props[0].source.length);
      for (const l of s) l.offset += o;
      delete t.props, Object.assign(t, { type: n, source: e, end: s });
      break;
    }
    case 'block-map':
    case 'block-seq': {
      const o = {
        type: 'newline',
        offset: t.offset + e.length,
        indent: t.indent,
        source: `
`,
      };
      delete t.items, Object.assign(t, { type: n, source: e, end: [o] });
      break;
    }
    default: {
      const s = 'indent' in t ? t.indent : -1,
        o =
          'end' in t && Array.isArray(t.end)
            ? t.end.filter(l => l.type === 'space' || l.type === 'comment' || l.type === 'newline')
            : [];
      for (const l of Object.keys(t)) l !== 'type' && l !== 'offset' && delete t[l];
      Object.assign(t, { type: n, indent: s, source: e, end: o });
    }
  }
}
const IE = t => ('type' in t ? ta(t) : Ul(t));
function ta(t) {
  switch (t.type) {
    case 'block-scalar': {
      let e = '';
      for (const n of t.props) e += ta(n);
      return e + t.source;
    }
    case 'block-map':
    case 'block-seq': {
      let e = '';
      for (const n of t.items) e += Ul(n);
      return e;
    }
    case 'flow-collection': {
      let e = t.start.source;
      for (const n of t.items) e += Ul(n);
      for (const n of t.end) e += n.source;
      return e;
    }
    case 'document': {
      let e = Ul(t);
      if (t.end) for (const n of t.end) e += n.source;
      return e;
    }
    default: {
      let e = t.source;
      if ('end' in t && t.end) for (const n of t.end) e += n.source;
      return e;
    }
  }
}
function Ul({ start: t, key: e, sep: n, value: s }) {
  let o = '';
  for (const l of t) o += l.source;
  if ((e && (o += ta(e)), n)) for (const l of n) o += l.source;
  return s && (o += ta(s)), o;
}
const cf = Symbol('break visit'),
  OE = Symbol('skip children'),
  Wv = Symbol('remove item');
function Or(t, e) {
  'type' in t && t.type === 'document' && (t = { start: t.start, value: t.value }),
    Kv(Object.freeze([]), t, e);
}
Or.BREAK = cf;
Or.SKIP = OE;
Or.REMOVE = Wv;
Or.itemAtPath = (t, e) => {
  let n = t;
  for (const [s, o] of e) {
    const l = n == null ? void 0 : n[s];
    if (l && 'items' in l) n = l.items[o];
    else return;
  }
  return n;
};
Or.parentCollection = (t, e) => {
  const n = Or.itemAtPath(t, e.slice(0, -1)),
    s = e[e.length - 1][0],
    o = n == null ? void 0 : n[s];
  if (o && 'items' in o) return o;
  throw new Error('Parent collection not found');
};
function Kv(t, e, n) {
  let s = n(e, t);
  if (typeof s == 'symbol') return s;
  for (const o of ['key', 'value']) {
    const l = e[o];
    if (l && 'items' in l) {
      for (let c = 0; c < l.items.length; ++c) {
        const u = Kv(Object.freeze(t.concat([[o, c]])), l.items[c], n);
        if (typeof u == 'number') c = u - 1;
        else {
          if (u === cf) return cf;
          u === Wv && (l.items.splice(c, 1), (c -= 1));
        }
      }
      typeof s == 'function' && o === 'key' && (s = s(e, t));
    }
  }
  return typeof s == 'function' ? s(e, t) : s;
}
const Sa = '\uFEFF',
  _a = '',
  ka = '',
  Zi = '',
  ME = t => !!t && 'items' in t,
  $E = t =>
    !!t &&
    (t.type === 'scalar' ||
      t.type === 'single-quoted-scalar' ||
      t.type === 'double-quoted-scalar' ||
      t.type === 'block-scalar');
function PE(t) {
  switch (t) {
    case Sa:
      return '<BOM>';
    case _a:
      return '<DOC>';
    case ka:
      return '<FLOW_END>';
    case Zi:
      return '<SCALAR>';
    default:
      return JSON.stringify(t);
  }
}
function Qv(t) {
  switch (t) {
    case Sa:
      return 'byte-order-mark';
    case _a:
      return 'doc-mode';
    case ka:
      return 'flow-error-end';
    case Zi:
      return 'scalar';
    case '---':
      return 'doc-start';
    case '...':
      return 'doc-end';
    case '':
    case `
`:
    case `\r
`:
      return 'newline';
    case '-':
      return 'seq-item-ind';
    case '?':
      return 'explicit-key-ind';
    case ':':
      return 'map-value-ind';
    case '{':
      return 'flow-map-start';
    case '}':
      return 'flow-map-end';
    case '[':
      return 'flow-seq-start';
    case ']':
      return 'flow-seq-end';
    case ',':
      return 'comma';
  }
  switch (t[0]) {
    case ' ':
    case '	':
      return 'space';
    case '#':
      return 'comment';
    case '%':
      return 'directive-line';
    case '*':
      return 'alias';
    case '&':
      return 'anchor';
    case '!':
      return 'tag';
    case "'":
      return 'single-quoted-scalar';
    case '"':
      return 'double-quoted-scalar';
    case '|':
    case '>':
      return 'block-scalar-header';
  }
  return null;
}
const RE = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      BOM: Sa,
      DOCUMENT: _a,
      FLOW_END: ka,
      SCALAR: Zi,
      createScalarToken: AE,
      isCollection: ME,
      isScalar: $E,
      prettyToken: PE,
      resolveAsScalar: CE,
      setScalarValue: LE,
      stringify: IE,
      tokenType: Qv,
      visit: Or,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function on(t) {
  switch (t) {
    case void 0:
    case ' ':
    case `
`:
    case '\r':
    case '	':
      return !0;
    default:
      return !1;
  }
}
const tg = new Set('0123456789ABCDEFabcdef'),
  DE = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),
  Tl = new Set(',[]{}'),
  FE = new Set(` ,[]{}
\r	`),
  qu = t => !t || FE.has(t);
class Gv {
  constructor() {
    (this.atEnd = !1),
      (this.blockScalarIndent = -1),
      (this.blockScalarKeep = !1),
      (this.buffer = ''),
      (this.flowKey = !1),
      (this.flowLevel = 0),
      (this.indentNext = 0),
      (this.indentValue = 0),
      (this.lineEndPos = null),
      (this.next = null),
      (this.pos = 0);
  }
  *lex(e, n = !1) {
    if (e) {
      if (typeof e != 'string') throw TypeError('source is not a string');
      (this.buffer = this.buffer ? this.buffer + e : e), (this.lineEndPos = null);
    }
    this.atEnd = !n;
    let s = this.next ?? 'stream';
    for (; s && (n || this.hasChars(1)); ) s = yield* this.parseNext(s);
  }
  atLineEnd() {
    let e = this.pos,
      n = this.buffer[e];
    for (; n === ' ' || n === '	'; ) n = this.buffer[++e];
    return !n ||
      n === '#' ||
      n ===
        `
`
      ? !0
      : n === '\r'
        ? this.buffer[e + 1] ===
          `
`
        : !1;
  }
  charAt(e) {
    return this.buffer[this.pos + e];
  }
  continueScalar(e) {
    let n = this.buffer[e];
    if (this.indentNext > 0) {
      let s = 0;
      for (; n === ' '; ) n = this.buffer[++s + e];
      if (n === '\r') {
        const o = this.buffer[s + e + 1];
        if (
          o ===
            `
` ||
          (!o && !this.atEnd)
        )
          return e + s + 1;
      }
      return n ===
        `
` ||
        s >= this.indentNext ||
        (!n && !this.atEnd)
        ? e + s
        : -1;
    }
    if (n === '-' || n === '.') {
      const s = this.buffer.substr(e, 3);
      if ((s === '---' || s === '...') && on(this.buffer[e + 3])) return -1;
    }
    return e;
  }
  getLine() {
    let e = this.lineEndPos;
    return (
      (typeof e != 'number' || (e !== -1 && e < this.pos)) &&
        ((e = this.buffer.indexOf(
          `
`,
          this.pos
        )),
        (this.lineEndPos = e)),
      e === -1
        ? this.atEnd
          ? this.buffer.substring(this.pos)
          : null
        : (this.buffer[e - 1] === '\r' && (e -= 1), this.buffer.substring(this.pos, e))
    );
  }
  hasChars(e) {
    return this.pos + e <= this.buffer.length;
  }
  setNext(e) {
    return (
      (this.buffer = this.buffer.substring(this.pos)),
      (this.pos = 0),
      (this.lineEndPos = null),
      (this.next = e),
      null
    );
  }
  peek(e) {
    return this.buffer.substr(this.pos, e);
  }
  *parseNext(e) {
    switch (e) {
      case 'stream':
        return yield* this.parseStream();
      case 'line-start':
        return yield* this.parseLineStart();
      case 'block-start':
        return yield* this.parseBlockStart();
      case 'doc':
        return yield* this.parseDocument();
      case 'flow':
        return yield* this.parseFlowCollection();
      case 'quoted-scalar':
        return yield* this.parseQuotedScalar();
      case 'block-scalar':
        return yield* this.parseBlockScalar();
      case 'plain-scalar':
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let e = this.getLine();
    if (e === null) return this.setNext('stream');
    if ((e[0] === Sa && (yield* this.pushCount(1), (e = e.substring(1))), e[0] === '%')) {
      let n = e.length,
        s = e.indexOf('#');
      for (; s !== -1; ) {
        const l = e[s - 1];
        if (l === ' ' || l === '	') {
          n = s - 1;
          break;
        } else s = e.indexOf('#', s + 1);
      }
      for (;;) {
        const l = e[n - 1];
        if (l === ' ' || l === '	') n -= 1;
        else break;
      }
      const o = (yield* this.pushCount(n)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(e.length - o), this.pushNewline(), 'stream';
    }
    if (this.atLineEnd()) {
      const n = yield* this.pushSpaces(!0);
      return yield* this.pushCount(e.length - n), yield* this.pushNewline(), 'stream';
    }
    return yield _a, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd) return this.setNext('line-start');
    if (e === '-' || e === '.') {
      if (!this.atEnd && !this.hasChars(4)) return this.setNext('line-start');
      const n = this.peek(3);
      if ((n === '---' || n === '...') && on(this.charAt(3)))
        return (
          yield* this.pushCount(3),
          (this.indentValue = 0),
          (this.indentNext = 0),
          n === '---' ? 'doc' : 'stream'
        );
    }
    return (
      (this.indentValue = yield* this.pushSpaces(!1)),
      this.indentNext > this.indentValue &&
        !on(this.charAt(1)) &&
        (this.indentNext = this.indentValue),
      yield* this.parseBlockStart()
    );
  }
  *parseBlockStart() {
    const [e, n] = this.peek(2);
    if (!n && !this.atEnd) return this.setNext('block-start');
    if ((e === '-' || e === '?' || e === ':') && on(n)) {
      const s = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return (
        (this.indentNext = this.indentValue + 1),
        (this.indentValue += s),
        yield* this.parseBlockStart()
      );
    }
    return 'doc';
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const e = this.getLine();
    if (e === null) return this.setNext('doc');
    let n = yield* this.pushIndicators();
    switch (e[n]) {
      case '#':
        yield* this.pushCount(e.length - n);
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case '{':
      case '[':
        return yield* this.pushCount(1), (this.flowKey = !1), (this.flowLevel = 1), 'flow';
      case '}':
      case ']':
        return yield* this.pushCount(1), 'doc';
      case '*':
        return yield* this.pushUntil(qu), 'doc';
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case '|':
      case '>':
        return (
          (n += yield* this.parseBlockScalarHeader()),
          (n += yield* this.pushSpaces(!0)),
          yield* this.pushCount(e.length - n),
          yield* this.pushNewline(),
          yield* this.parseBlockScalar()
        );
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let e,
      n,
      s = -1;
    do
      (e = yield* this.pushNewline()),
        e > 0 ? ((n = yield* this.pushSpaces(!1)), (this.indentValue = s = n)) : (n = 0),
        (n += yield* this.pushSpaces(!0));
    while (e + n > 0);
    const o = this.getLine();
    if (o === null) return this.setNext('flow');
    if (
      ((s !== -1 && s < this.indentNext && o[0] !== '#') ||
        (s === 0 && (o.startsWith('---') || o.startsWith('...')) && on(o[3]))) &&
      !(s === this.indentNext - 1 && this.flowLevel === 1 && (o[0] === ']' || o[0] === '}'))
    )
      return (this.flowLevel = 0), yield ka, yield* this.parseLineStart();
    let l = 0;
    for (; o[l] === ','; )
      (l += yield* this.pushCount(1)), (l += yield* this.pushSpaces(!0)), (this.flowKey = !1);
    switch (((l += yield* this.pushIndicators()), o[l])) {
      case void 0:
        return 'flow';
      case '#':
        return yield* this.pushCount(o.length - l), 'flow';
      case '{':
      case '[':
        return yield* this.pushCount(1), (this.flowKey = !1), (this.flowLevel += 1), 'flow';
      case '}':
      case ']':
        return (
          yield* this.pushCount(1),
          (this.flowKey = !0),
          (this.flowLevel -= 1),
          this.flowLevel ? 'flow' : 'doc'
        );
      case '*':
        return yield* this.pushUntil(qu), 'flow';
      case '"':
      case "'":
        return (this.flowKey = !0), yield* this.parseQuotedScalar();
      case ':': {
        const c = this.charAt(1);
        if (this.flowKey || on(c) || c === ',')
          return (this.flowKey = !1), yield* this.pushCount(1), yield* this.pushSpaces(!0), 'flow';
      }
      default:
        return (this.flowKey = !1), yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const e = this.charAt(0);
    let n = this.buffer.indexOf(e, this.pos + 1);
    if (e === "'")
      for (; n !== -1 && this.buffer[n + 1] === "'"; ) n = this.buffer.indexOf("'", n + 2);
    else
      for (; n !== -1; ) {
        let l = 0;
        for (; this.buffer[n - 1 - l] === '\\'; ) l += 1;
        if (l % 2 === 0) break;
        n = this.buffer.indexOf('"', n + 1);
      }
    const s = this.buffer.substring(0, n);
    let o = s.indexOf(
      `
`,
      this.pos
    );
    if (o !== -1) {
      for (; o !== -1; ) {
        const l = this.continueScalar(o + 1);
        if (l === -1) break;
        o = s.indexOf(
          `
`,
          l
        );
      }
      o !== -1 && (n = o - (s[o - 1] === '\r' ? 2 : 1));
    }
    if (n === -1) {
      if (!this.atEnd) return this.setNext('quoted-scalar');
      n = this.buffer.length;
    }
    return yield* this.pushToIndex(n + 1, !1), this.flowLevel ? 'flow' : 'doc';
  }
  *parseBlockScalarHeader() {
    (this.blockScalarIndent = -1), (this.blockScalarKeep = !1);
    let e = this.pos;
    for (;;) {
      const n = this.buffer[++e];
      if (n === '+') this.blockScalarKeep = !0;
      else if (n > '0' && n <= '9') this.blockScalarIndent = Number(n) - 1;
      else if (n !== '-') break;
    }
    return yield* this.pushUntil(n => on(n) || n === '#');
  }
  *parseBlockScalar() {
    let e = this.pos - 1,
      n = 0,
      s;
    e: for (let l = this.pos; (s = this.buffer[l]); ++l)
      switch (s) {
        case ' ':
          n += 1;
          break;
        case `
`:
          (e = l), (n = 0);
          break;
        case '\r': {
          const c = this.buffer[l + 1];
          if (!c && !this.atEnd) return this.setNext('block-scalar');
          if (
            c ===
            `
`
          )
            break;
        }
        default:
          break e;
      }
    if (!s && !this.atEnd) return this.setNext('block-scalar');
    if (n >= this.indentNext) {
      this.blockScalarIndent === -1
        ? (this.indentNext = n)
        : (this.indentNext =
            this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext));
      do {
        const l = this.continueScalar(e + 1);
        if (l === -1) break;
        e = this.buffer.indexOf(
          `
`,
          l
        );
      } while (e !== -1);
      if (e === -1) {
        if (!this.atEnd) return this.setNext('block-scalar');
        e = this.buffer.length;
      }
    }
    let o = e + 1;
    for (s = this.buffer[o]; s === ' '; ) s = this.buffer[++o];
    if (s === '	') {
      for (
        ;
        s === '	' ||
        s === ' ' ||
        s === '\r' ||
        s ===
          `
`;

      )
        s = this.buffer[++o];
      e = o - 1;
    } else if (!this.blockScalarKeep)
      do {
        let l = e - 1,
          c = this.buffer[l];
        c === '\r' && (c = this.buffer[--l]);
        const u = l;
        for (; c === ' '; ) c = this.buffer[--l];
        if (
          c ===
            `
` &&
          l >= this.pos &&
          l + 1 + n > u
        )
          e = l;
        else break;
      } while (!0);
    return yield Zi, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let n = this.pos - 1,
      s = this.pos - 1,
      o;
    for (; (o = this.buffer[++s]); )
      if (o === ':') {
        const l = this.buffer[s + 1];
        if (on(l) || (e && Tl.has(l))) break;
        n = s;
      } else if (on(o)) {
        let l = this.buffer[s + 1];
        if (
          (o === '\r' &&
            (l ===
            `
`
              ? ((s += 1),
                (o = `
`),
                (l = this.buffer[s + 1]))
              : (n = s)),
          l === '#' || (e && Tl.has(l)))
        )
          break;
        if (
          o ===
          `
`
        ) {
          const c = this.continueScalar(s + 1);
          if (c === -1) break;
          s = Math.max(s, c - 2);
        }
      } else {
        if (e && Tl.has(o)) break;
        n = s;
      }
    return !o && !this.atEnd
      ? this.setNext('plain-scalar')
      : (yield Zi, yield* this.pushToIndex(n + 1, !0), e ? 'flow' : 'doc');
  }
  *pushCount(e) {
    return e > 0 ? (yield this.buffer.substr(this.pos, e), (this.pos += e), e) : 0;
  }
  *pushToIndex(e, n) {
    const s = this.buffer.slice(this.pos, e);
    return s ? (yield s, (this.pos += s.length), s.length) : (n && (yield ''), 0);
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case '!':
        return (
          (yield* this.pushTag()) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators())
        );
      case '&':
        return (
          (yield* this.pushUntil(qu)) +
          (yield* this.pushSpaces(!0)) +
          (yield* this.pushIndicators())
        );
      case '-':
      case '?':
      case ':': {
        const e = this.flowLevel > 0,
          n = this.charAt(1);
        if (on(n) || (e && Tl.has(n)))
          return (
            e ? this.flowKey && (this.flowKey = !1) : (this.indentNext = this.indentValue + 1),
            (yield* this.pushCount(1)) +
              (yield* this.pushSpaces(!0)) +
              (yield* this.pushIndicators())
          );
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === '<') {
      let e = this.pos + 2,
        n = this.buffer[e];
      for (; !on(n) && n !== '>'; ) n = this.buffer[++e];
      return yield* this.pushToIndex(n === '>' ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1,
        n = this.buffer[e];
      for (; n; )
        if (DE.has(n)) n = this.buffer[++e];
        else if (n === '%' && tg.has(this.buffer[e + 1]) && tg.has(this.buffer[e + 2]))
          n = this.buffer[(e += 3)];
        else break;
      return yield* this.pushToIndex(e, !1);
    }
  }
  *pushNewline() {
    const e = this.buffer[this.pos];
    return e ===
      `
`
      ? yield* this.pushCount(1)
      : e === '\r' &&
          this.charAt(1) ===
            `
`
        ? yield* this.pushCount(2)
        : 0;
  }
  *pushSpaces(e) {
    let n = this.pos - 1,
      s;
    do s = this.buffer[++n];
    while (s === ' ' || (e && s === '	'));
    const o = n - this.pos;
    return o > 0 && (yield this.buffer.substr(this.pos, o), (this.pos = n)), o;
  }
  *pushUntil(e) {
    let n = this.pos,
      s = this.buffer[n];
    for (; !e(s); ) s = this.buffer[++n];
    return yield* this.pushToIndex(n, !1);
  }
}
class Xv {
  constructor() {
    (this.lineStarts = []),
      (this.addNewLine = e => this.lineStarts.push(e)),
      (this.linePos = e => {
        let n = 0,
          s = this.lineStarts.length;
        for (; n < s; ) {
          const l = (n + s) >> 1;
          this.lineStarts[l] < e ? (n = l + 1) : (s = l);
        }
        if (this.lineStarts[n] === e) return { line: n + 1, col: 1 };
        if (n === 0) return { line: 0, col: e };
        const o = this.lineStarts[n - 1];
        return { line: n, col: e - o + 1 };
      });
  }
}
function Cr(t, e) {
  for (let n = 0; n < t.length; ++n) if (t[n].type === e) return !0;
  return !1;
}
function ng(t) {
  for (let e = 0; e < t.length; ++e)
    switch (t[e].type) {
      case 'space':
      case 'comment':
      case 'newline':
        break;
      default:
        return e;
    }
  return -1;
}
function Jv(t) {
  switch (t == null ? void 0 : t.type) {
    case 'alias':
    case 'scalar':
    case 'single-quoted-scalar':
    case 'double-quoted-scalar':
    case 'flow-collection':
      return !0;
    default:
      return !1;
  }
}
function Nl(t) {
  switch (t.type) {
    case 'document':
      return t.start;
    case 'block-map': {
      const e = t.items[t.items.length - 1];
      return e.sep ?? e.start;
    }
    case 'block-seq':
      return t.items[t.items.length - 1].start;
    default:
      return [];
  }
}
function gs(t) {
  var n;
  if (t.length === 0) return [];
  let e = t.length;
  e: for (; --e >= 0; )
    switch (t[e].type) {
      case 'doc-start':
      case 'explicit-key-ind':
      case 'map-value-ind':
      case 'seq-item-ind':
      case 'newline':
        break e;
    }
  for (; ((n = t[++e]) == null ? void 0 : n.type) === 'space'; );
  return t.splice(e, t.length);
}
function rg(t) {
  if (t.start.type === 'flow-seq-start')
    for (const e of t.items)
      e.sep &&
        !e.value &&
        !Cr(e.start, 'explicit-key-ind') &&
        !Cr(e.sep, 'map-value-ind') &&
        (e.key && (e.value = e.key),
        delete e.key,
        Jv(e.value)
          ? e.value.end
            ? Array.prototype.push.apply(e.value.end, e.sep)
            : (e.value.end = e.sep)
          : Array.prototype.push.apply(e.start, e.sep),
        delete e.sep);
}
class nd {
  constructor(e) {
    (this.atNewLine = !0),
      (this.atScalar = !1),
      (this.indent = 0),
      (this.offset = 0),
      (this.onKeyLine = !1),
      (this.stack = []),
      (this.source = ''),
      (this.type = ''),
      (this.lexer = new Gv()),
      (this.onNewLine = e);
  }
  *parse(e, n = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const s of this.lexer.lex(e, n)) yield* this.next(s);
    n || (yield* this.end());
  }
  *next(e) {
    if (((this.source = e), this.atScalar)) {
      (this.atScalar = !1), yield* this.step(), (this.offset += e.length);
      return;
    }
    const n = Qv(e);
    if (n)
      if (n === 'scalar') (this.atNewLine = !1), (this.atScalar = !0), (this.type = 'scalar');
      else {
        switch (((this.type = n), yield* this.step(), n)) {
          case 'newline':
            (this.atNewLine = !0),
              (this.indent = 0),
              this.onNewLine && this.onNewLine(this.offset + e.length);
            break;
          case 'space':
            this.atNewLine && e[0] === ' ' && (this.indent += e.length);
            break;
          case 'explicit-key-ind':
          case 'map-value-ind':
          case 'seq-item-ind':
            this.atNewLine && (this.indent += e.length);
            break;
          case 'doc-mode':
          case 'flow-error-end':
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += e.length;
      }
    else {
      const s = `Not a YAML token: ${e}`;
      yield* this.pop({ type: 'error', offset: this.offset, message: s, source: e }),
        (this.offset += e.length);
    }
  }
  *end() {
    for (; this.stack.length > 0; ) yield* this.pop();
  }
  get sourceToken() {
    return { type: this.type, offset: this.offset, indent: this.indent, source: this.source };
  }
  *step() {
    const e = this.peek(1);
    if (this.type === 'doc-end' && (!e || e.type !== 'doc-end')) {
      for (; this.stack.length > 0; ) yield* this.pop();
      this.stack.push({ type: 'doc-end', offset: this.offset, source: this.source });
      return;
    }
    if (!e) return yield* this.stream();
    switch (e.type) {
      case 'document':
        return yield* this.document(e);
      case 'alias':
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return yield* this.scalar(e);
      case 'block-scalar':
        return yield* this.blockScalar(e);
      case 'block-map':
        return yield* this.blockMap(e);
      case 'block-seq':
        return yield* this.blockSequence(e);
      case 'flow-collection':
        return yield* this.flowCollection(e);
      case 'doc-end':
        return yield* this.documentEnd(e);
    }
    yield* this.pop();
  }
  peek(e) {
    return this.stack[this.stack.length - e];
  }
  *pop(e) {
    const n = e ?? this.stack.pop();
    if (!n)
      yield {
        type: 'error',
        offset: this.offset,
        source: '',
        message: 'Tried to pop an empty stack',
      };
    else if (this.stack.length === 0) yield n;
    else {
      const s = this.peek(1);
      switch (
        (n.type === 'block-scalar'
          ? (n.indent = 'indent' in s ? s.indent : 0)
          : n.type === 'flow-collection' && s.type === 'document' && (n.indent = 0),
        n.type === 'flow-collection' && rg(n),
        s.type)
      ) {
        case 'document':
          s.value = n;
          break;
        case 'block-scalar':
          s.props.push(n);
          break;
        case 'block-map': {
          const o = s.items[s.items.length - 1];
          if (o.value) {
            s.items.push({ start: [], key: n, sep: [] }), (this.onKeyLine = !0);
            return;
          } else if (o.sep) o.value = n;
          else {
            Object.assign(o, { key: n, sep: [] }), (this.onKeyLine = !o.explicitKey);
            return;
          }
          break;
        }
        case 'block-seq': {
          const o = s.items[s.items.length - 1];
          o.value ? s.items.push({ start: [], value: n }) : (o.value = n);
          break;
        }
        case 'flow-collection': {
          const o = s.items[s.items.length - 1];
          !o || o.value
            ? s.items.push({ start: [], key: n, sep: [] })
            : o.sep
              ? (o.value = n)
              : Object.assign(o, { key: n, sep: [] });
          return;
        }
        default:
          yield* this.pop(), yield* this.pop(n);
      }
      if (
        (s.type === 'document' || s.type === 'block-map' || s.type === 'block-seq') &&
        (n.type === 'block-map' || n.type === 'block-seq')
      ) {
        const o = n.items[n.items.length - 1];
        o &&
          !o.sep &&
          !o.value &&
          o.start.length > 0 &&
          ng(o.start) === -1 &&
          (n.indent === 0 || o.start.every(l => l.type !== 'comment' || l.indent < n.indent)) &&
          (s.type === 'document' ? (s.end = o.start) : s.items.push({ start: o.start }),
          n.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case 'directive-line':
        yield { type: 'directive', offset: this.offset, source: this.source };
        return;
      case 'byte-order-mark':
      case 'space':
      case 'comment':
      case 'newline':
        yield this.sourceToken;
        return;
      case 'doc-mode':
      case 'doc-start': {
        const e = { type: 'document', offset: this.offset, start: [] };
        this.type === 'doc-start' && e.start.push(this.sourceToken), this.stack.push(e);
        return;
      }
    }
    yield {
      type: 'error',
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source,
    };
  }
  *document(e) {
    if (e.value) return yield* this.lineEnd(e);
    switch (this.type) {
      case 'doc-start': {
        ng(e.start) !== -1
          ? (yield* this.pop(), yield* this.step())
          : e.start.push(this.sourceToken);
        return;
      }
      case 'anchor':
      case 'tag':
      case 'space':
      case 'comment':
      case 'newline':
        e.start.push(this.sourceToken);
        return;
    }
    const n = this.startBlockValue(e);
    n
      ? this.stack.push(n)
      : yield {
          type: 'error',
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML document`,
          source: this.source,
        };
  }
  *scalar(e) {
    if (this.type === 'map-value-ind') {
      const n = Nl(this.peek(2)),
        s = gs(n);
      let o;
      e.end ? ((o = e.end), o.push(this.sourceToken), delete e.end) : (o = [this.sourceToken]);
      const l = {
        type: 'block-map',
        offset: e.offset,
        indent: e.indent,
        items: [{ start: s, key: e, sep: o }],
      };
      (this.onKeyLine = !0), (this.stack[this.stack.length - 1] = l);
    } else yield* this.lineEnd(e);
  }
  *blockScalar(e) {
    switch (this.type) {
      case 'space':
      case 'comment':
      case 'newline':
        e.props.push(this.sourceToken);
        return;
      case 'scalar':
        if (((e.source = this.source), (this.atNewLine = !0), (this.indent = 0), this.onNewLine)) {
          let n =
            this.source.indexOf(`
`) + 1;
          for (; n !== 0; )
            this.onNewLine(this.offset + n),
              (n =
                this.source.indexOf(
                  `
`,
                  n
                ) + 1);
        }
        yield* this.pop();
        break;
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(e) {
    var s;
    const n = e.items[e.items.length - 1];
    switch (this.type) {
      case 'newline':
        if (((this.onKeyLine = !1), n.value)) {
          const o = 'end' in n.value ? n.value.end : void 0,
            l = Array.isArray(o) ? o[o.length - 1] : void 0;
          (l == null ? void 0 : l.type) === 'comment'
            ? o == null || o.push(this.sourceToken)
            : e.items.push({ start: [this.sourceToken] });
        } else n.sep ? n.sep.push(this.sourceToken) : n.start.push(this.sourceToken);
        return;
      case 'space':
      case 'comment':
        if (n.value) e.items.push({ start: [this.sourceToken] });
        else if (n.sep) n.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(n.start, e.indent)) {
            const o = e.items[e.items.length - 2],
              l = (s = o == null ? void 0 : o.value) == null ? void 0 : s.end;
            if (Array.isArray(l)) {
              Array.prototype.push.apply(l, n.start), l.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          n.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= e.indent) {
      const o = !this.onKeyLine && this.indent === e.indent,
        l = o && (n.sep || n.explicitKey) && this.type !== 'seq-item-ind';
      let c = [];
      if (l && n.sep && !n.value) {
        const u = [];
        for (let d = 0; d < n.sep.length; ++d) {
          const h = n.sep[d];
          switch (h.type) {
            case 'newline':
              u.push(d);
              break;
            case 'space':
              break;
            case 'comment':
              h.indent > e.indent && (u.length = 0);
              break;
            default:
              u.length = 0;
          }
        }
        u.length >= 2 && (c = n.sep.splice(u[1]));
      }
      switch (this.type) {
        case 'anchor':
        case 'tag':
          l || n.value
            ? (c.push(this.sourceToken), e.items.push({ start: c }), (this.onKeyLine = !0))
            : n.sep
              ? n.sep.push(this.sourceToken)
              : n.start.push(this.sourceToken);
          return;
        case 'explicit-key-ind':
          !n.sep && !n.explicitKey
            ? (n.start.push(this.sourceToken), (n.explicitKey = !0))
            : l || n.value
              ? (c.push(this.sourceToken), e.items.push({ start: c, explicitKey: !0 }))
              : this.stack.push({
                  type: 'block-map',
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: !0 }],
                }),
            (this.onKeyLine = !0);
          return;
        case 'map-value-ind':
          if (n.explicitKey)
            if (n.sep)
              if (n.value) e.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (Cr(n.sep, 'map-value-ind'))
                this.stack.push({
                  type: 'block-map',
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: c, key: null, sep: [this.sourceToken] }],
                });
              else if (Jv(n.key) && !Cr(n.sep, 'newline')) {
                const u = gs(n.start),
                  d = n.key,
                  h = n.sep;
                h.push(this.sourceToken),
                  delete n.key,
                  delete n.sep,
                  this.stack.push({
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: u, key: d, sep: h }],
                  });
              } else
                c.length > 0
                  ? (n.sep = n.sep.concat(c, this.sourceToken))
                  : n.sep.push(this.sourceToken);
            else if (Cr(n.start, 'newline'))
              Object.assign(n, { key: null, sep: [this.sourceToken] });
            else {
              const u = gs(n.start);
              this.stack.push({
                type: 'block-map',
                offset: this.offset,
                indent: this.indent,
                items: [{ start: u, key: null, sep: [this.sourceToken] }],
              });
            }
          else
            n.sep
              ? n.value || l
                ? e.items.push({ start: c, key: null, sep: [this.sourceToken] })
                : Cr(n.sep, 'map-value-ind')
                  ? this.stack.push({
                      type: 'block-map',
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: [], key: null, sep: [this.sourceToken] }],
                    })
                  : n.sep.push(this.sourceToken)
              : Object.assign(n, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar': {
          const u = this.flowScalar(this.type);
          l || n.value
            ? (e.items.push({ start: c, key: u, sep: [] }), (this.onKeyLine = !0))
            : n.sep
              ? this.stack.push(u)
              : (Object.assign(n, { key: u, sep: [] }), (this.onKeyLine = !0));
          return;
        }
        default: {
          const u = this.startBlockValue(e);
          if (u) {
            o && u.type !== 'block-seq' && e.items.push({ start: c }), this.stack.push(u);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(e) {
    var s;
    const n = e.items[e.items.length - 1];
    switch (this.type) {
      case 'newline':
        if (n.value) {
          const o = 'end' in n.value ? n.value.end : void 0,
            l = Array.isArray(o) ? o[o.length - 1] : void 0;
          (l == null ? void 0 : l.type) === 'comment'
            ? o == null || o.push(this.sourceToken)
            : e.items.push({ start: [this.sourceToken] });
        } else n.start.push(this.sourceToken);
        return;
      case 'space':
      case 'comment':
        if (n.value) e.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(n.start, e.indent)) {
            const o = e.items[e.items.length - 2],
              l = (s = o == null ? void 0 : o.value) == null ? void 0 : s.end;
            if (Array.isArray(l)) {
              Array.prototype.push.apply(l, n.start), l.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          n.start.push(this.sourceToken);
        }
        return;
      case 'anchor':
      case 'tag':
        if (n.value || this.indent <= e.indent) break;
        n.start.push(this.sourceToken);
        return;
      case 'seq-item-ind':
        if (this.indent !== e.indent) break;
        n.value || Cr(n.start, 'seq-item-ind')
          ? e.items.push({ start: [this.sourceToken] })
          : n.start.push(this.sourceToken);
        return;
    }
    if (this.indent > e.indent) {
      const o = this.startBlockValue(e);
      if (o) {
        this.stack.push(o);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(e) {
    const n = e.items[e.items.length - 1];
    if (this.type === 'flow-error-end') {
      let s;
      do yield* this.pop(), (s = this.peek(1));
      while (s && s.type === 'flow-collection');
    } else if (e.end.length === 0) {
      switch (this.type) {
        case 'comma':
        case 'explicit-key-ind':
          !n || n.sep
            ? e.items.push({ start: [this.sourceToken] })
            : n.start.push(this.sourceToken);
          return;
        case 'map-value-ind':
          !n || n.value
            ? e.items.push({ start: [], key: null, sep: [this.sourceToken] })
            : n.sep
              ? n.sep.push(this.sourceToken)
              : Object.assign(n, { key: null, sep: [this.sourceToken] });
          return;
        case 'space':
        case 'comment':
        case 'newline':
        case 'anchor':
        case 'tag':
          !n || n.value
            ? e.items.push({ start: [this.sourceToken] })
            : n.sep
              ? n.sep.push(this.sourceToken)
              : n.start.push(this.sourceToken);
          return;
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar': {
          const o = this.flowScalar(this.type);
          !n || n.value
            ? e.items.push({ start: [], key: o, sep: [] })
            : n.sep
              ? this.stack.push(o)
              : Object.assign(n, { key: o, sep: [] });
          return;
        }
        case 'flow-map-end':
        case 'flow-seq-end':
          e.end.push(this.sourceToken);
          return;
      }
      const s = this.startBlockValue(e);
      s ? this.stack.push(s) : (yield* this.pop(), yield* this.step());
    } else {
      const s = this.peek(2);
      if (
        s.type === 'block-map' &&
        ((this.type === 'map-value-ind' && s.indent === e.indent) ||
          (this.type === 'newline' && !s.items[s.items.length - 1].sep))
      )
        yield* this.pop(), yield* this.step();
      else if (this.type === 'map-value-ind' && s.type !== 'flow-collection') {
        const o = Nl(s),
          l = gs(o);
        rg(e);
        const c = e.end.splice(1, e.end.length);
        c.push(this.sourceToken);
        const u = {
          type: 'block-map',
          offset: e.offset,
          indent: e.indent,
          items: [{ start: l, key: e, sep: c }],
        };
        (this.onKeyLine = !0), (this.stack[this.stack.length - 1] = u);
      } else yield* this.lineEnd(e);
    }
  }
  flowScalar(e) {
    if (this.onNewLine) {
      let n =
        this.source.indexOf(`
`) + 1;
      for (; n !== 0; )
        this.onNewLine(this.offset + n),
          (n =
            this.source.indexOf(
              `
`,
              n
            ) + 1);
    }
    return { type: e, offset: this.offset, indent: this.indent, source: this.source };
  }
  startBlockValue(e) {
    switch (this.type) {
      case 'alias':
      case 'scalar':
      case 'single-quoted-scalar':
      case 'double-quoted-scalar':
        return this.flowScalar(this.type);
      case 'block-scalar-header':
        return {
          type: 'block-scalar',
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: '',
        };
      case 'flow-map-start':
      case 'flow-seq-start':
        return {
          type: 'flow-collection',
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: [],
        };
      case 'seq-item-ind':
        return {
          type: 'block-seq',
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }],
        };
      case 'explicit-key-ind': {
        this.onKeyLine = !0;
        const n = Nl(e),
          s = gs(n);
        return (
          s.push(this.sourceToken),
          {
            type: 'block-map',
            offset: this.offset,
            indent: this.indent,
            items: [{ start: s, explicitKey: !0 }],
          }
        );
      }
      case 'map-value-ind': {
        this.onKeyLine = !0;
        const n = Nl(e),
          s = gs(n);
        return {
          type: 'block-map',
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, key: null, sep: [this.sourceToken] }],
        };
      }
    }
    return null;
  }
  atIndentedComment(e, n) {
    return this.type !== 'comment' || this.indent <= n
      ? !1
      : e.every(s => s.type === 'newline' || s.type === 'space');
  }
  *documentEnd(e) {
    this.type !== 'doc-mode' &&
      (e.end ? e.end.push(this.sourceToken) : (e.end = [this.sourceToken]),
      this.type === 'newline' && (yield* this.pop()));
  }
  *lineEnd(e) {
    switch (this.type) {
      case 'comma':
      case 'doc-start':
      case 'doc-end':
      case 'flow-seq-end':
      case 'flow-map-end':
      case 'map-value-ind':
        yield* this.pop(), yield* this.step();
        break;
      case 'newline':
        this.onKeyLine = !1;
      case 'space':
      case 'comment':
      default:
        e.end ? e.end.push(this.sourceToken) : (e.end = [this.sourceToken]),
          this.type === 'newline' && (yield* this.pop());
    }
  }
}
function Yv(t) {
  const e = t.prettyErrors !== !1;
  return { lineCounter: t.lineCounter || (e && new Xv()) || null, prettyErrors: e };
}
function zE(t, e = {}) {
  const { lineCounter: n, prettyErrors: s } = Yv(e),
    o = new nd(n == null ? void 0 : n.addNewLine),
    l = new td(e),
    c = Array.from(l.compose(o.parse(t)));
  if (s && n) for (const u of c) u.errors.forEach(ea(t, n)), u.warnings.forEach(ea(t, n));
  return c.length > 0 ? c : Object.assign([], { empty: !0 }, l.streamInfo());
}
function Zv(t, e = {}) {
  const { lineCounter: n, prettyErrors: s } = Yv(e),
    o = new nd(n == null ? void 0 : n.addNewLine),
    l = new td(e);
  let c = null;
  for (const u of l.compose(o.parse(t), !0, t.length))
    if (!c) c = u;
    else if (c.options.logLevel !== 'silent') {
      c.errors.push(
        new jr(
          u.range.slice(0, 2),
          'MULTIPLE_DOCS',
          'Source contains multiple documents; please use YAML.parseAllDocuments()'
        )
      );
      break;
    }
  return s && n && (c.errors.forEach(ea(t, n)), c.warnings.forEach(ea(t, n))), c;
}
function BE(t, e, n) {
  let s;
  typeof e == 'function' ? (s = e) : n === void 0 && e && typeof e == 'object' && (n = e);
  const o = Zv(t, n);
  if (!o) return null;
  if ((o.warnings.forEach(l => wv(o.options.logLevel, l)), o.errors.length > 0)) {
    if (o.options.logLevel !== 'silent') throw o.errors[0];
    o.errors = [];
  }
  return o.toJS(Object.assign({ reviver: s }, n));
}
function UE(t, e, n) {
  let s = null;
  if (
    (typeof e == 'function' || Array.isArray(e) ? (s = e) : n === void 0 && e && (n = e),
    typeof n == 'string' && (n = n.length),
    typeof n == 'number')
  ) {
    const o = Math.round(n);
    n = o < 1 ? void 0 : o > 8 ? { indent: 8 } : { indent: o };
  }
  if (t === void 0) {
    const { keepUndefined: o } = n ?? e ?? {};
    if (!o) return;
  }
  return Dr(t) && !s ? t.toString(n) : new qs(t, s, n).toString(n);
}
const ew = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Alias: fa,
        CST: RE,
        Composer: td,
        Document: qs,
        Lexer: Gv,
        LineCounter: Xv,
        Pair: ut,
        Parser: nd,
        Scalar: he,
        Schema: xa,
        YAMLError: Zf,
        YAMLMap: Pt,
        YAMLParseError: jr,
        YAMLSeq: cr,
        YAMLWarning: Dv,
        isAlias: Rr,
        isCollection: Fe,
        isDocument: Dr,
        isMap: Fs,
        isNode: ze,
        isPair: $e,
        isScalar: Ne,
        isSeq: zs,
        parse: BE,
        parseAllDocuments: zE,
        parseDocument: Zv,
        stringify: UE,
        visit: ar,
        visitAsync: ua,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  qE = ({
    action: t,
    sdkLanguage: e,
    testIdAttributeName: n,
    isInspecting: s,
    setIsInspecting: o,
    highlightedElement: l,
    setHighlightedElement: c,
  }) => {
    const [u, d] = P.useState('action'),
      [h, y] = As('shouldPopulateCanvasFromScreenshot', !1),
      v = P.useMemo(() => KE(t), [t]),
      m = P.useMemo(() => {
        const w = v[u];
        return w ? GE(w, h) : void 0;
      }, [v, u, h]);
    return x.jsxs('div', {
      className: 'snapshot-tab vbox',
      children: [
        x.jsxs(wf, {
          children: [
            x.jsx(Rt, {
              className: 'pick-locator',
              title: 'Pick locator',
              icon: 'target',
              toggled: s,
              onClick: () => o(!s),
            }),
            ['action', 'before', 'after'].map(w =>
              x.jsx(ay, { id: w, title: WE(w), selected: u === w, onSelect: () => d(w) }, w)
            ),
            x.jsx('div', { style: { flex: 'auto' } }),
            x.jsx(Rt, {
              icon: 'link-external',
              title: 'Open snapshot in a new tab',
              disabled: !(m != null && m.popoutUrl),
              onClick: () => {
                const w = window.open((m == null ? void 0 : m.popoutUrl) || '', '_blank');
                w == null ||
                  w.addEventListener('DOMContentLoaded', () => {
                    const S = new rv(w, !1, e, n, 1, 'chromium', !1, []);
                    new Ab(S);
                  });
              },
            }),
          ],
        }),
        x.jsx(HE, {
          snapshotUrls: m,
          sdkLanguage: e,
          testIdAttributeName: n,
          isInspecting: s,
          setIsInspecting: o,
          highlightedElement: l,
          setHighlightedElement: c,
        }),
      ],
    });
  },
  HE = ({
    snapshotUrls: t,
    sdkLanguage: e,
    testIdAttributeName: n,
    isInspecting: s,
    setIsInspecting: o,
    highlightedElement: l,
    setHighlightedElement: c,
  }) => {
    const u = P.useRef(null),
      d = P.useRef(null),
      [h, y] = P.useState({ viewport: nw, url: '' }),
      v = P.useRef({ iteration: 0, visibleIframe: 0 });
    return (
      P.useEffect(() => {
        (async () => {
          const m = v.current.iteration + 1,
            w = 1 - v.current.visibleIframe;
          v.current.iteration = m;
          const S = await XE(t == null ? void 0 : t.snapshotInfoUrl);
          if (v.current.iteration !== m) return;
          const _ = [u, d][w].current;
          if (_) {
            let b = () => {};
            const T = new Promise(C => (b = C));
            try {
              _.addEventListener('load', b), _.addEventListener('error', b);
              const C = (t == null ? void 0 : t.snapshotUrl) || JE;
              _.contentWindow ? _.contentWindow.location.replace(C) : (_.src = C), await T;
            } catch {
            } finally {
              _.removeEventListener('load', b), _.removeEventListener('error', b);
            }
          }
          v.current.iteration === m && ((v.current.visibleIframe = w), y(S));
        })();
      }, [t]),
      x.jsxs('div', {
        className: 'vbox',
        tabIndex: 0,
        onKeyDown: m => {
          m.key === 'Escape' && s && o(!1);
        },
        children: [
          x.jsx(sg, {
            isInspecting: s,
            sdkLanguage: e,
            testIdAttributeName: n,
            highlightedElement: l,
            setHighlightedElement: c,
            iframe: u.current,
            iteration: v.current.iteration,
          }),
          x.jsx(sg, {
            isInspecting: s,
            sdkLanguage: e,
            testIdAttributeName: n,
            highlightedElement: l,
            setHighlightedElement: c,
            iframe: d.current,
            iteration: v.current.iteration,
          }),
          x.jsx(VE, {
            snapshotInfo: h,
            children: x.jsxs('div', {
              className: 'snapshot-switcher',
              children: [
                x.jsx('iframe', {
                  ref: u,
                  name: 'snapshot',
                  title: 'DOM Snapshot',
                  className: Ue(v.current.visibleIframe === 0 && 'snapshot-visible'),
                }),
                x.jsx('iframe', {
                  ref: d,
                  name: 'snapshot',
                  title: 'DOM Snapshot',
                  className: Ue(v.current.visibleIframe === 1 && 'snapshot-visible'),
                }),
              ],
            }),
          }),
        ],
      })
    );
  },
  VE = ({ snapshotInfo: t, children: e }) => {
    const [n, s] = Mr(),
      l = { width: t.viewport.width, height: t.viewport.height + 40 },
      c = Math.min(n.width / l.width, n.height / l.height, 1),
      u = { x: (n.width - l.width) / 2, y: (n.height - l.height) / 2 };
    return x.jsx('div', {
      ref: s,
      className: 'snapshot-wrapper',
      children: x.jsxs('div', {
        className: 'snapshot-container',
        style: {
          width: l.width + 'px',
          height: l.height + 'px',
          transform: `translate(${u.x}px, ${u.y}px) scale(${c})`,
        },
        children: [x.jsx(Ob, { url: t.url }), e],
      }),
    });
  };
function WE(t) {
  return t === 'before' ? 'Before' : t === 'after' ? 'After' : t === 'action' ? 'Action' : t;
}
const sg = ({
  iframe: t,
  isInspecting: e,
  sdkLanguage: n,
  testIdAttributeName: s,
  highlightedElement: o,
  setHighlightedElement: l,
  iteration: c,
}) => (
  P.useEffect(() => {
    const u = [],
      d = new URLSearchParams(window.location.search).get('isUnderTest') === 'true';
    try {
      tw(u, n, s, d, '', t == null ? void 0 : t.contentWindow);
    } catch {}
    const h = o.lastEdited === 'ariaSnapshot' && o.ariaSnapshot ? xf(ew, o.ariaSnapshot) : void 0,
      y = o.lastEdited === 'locator' && o.locator ? jb(n, o.locator, s) : void 0;
    for (const { recorder: v, frameSelector: m } of u) {
      const w = y != null && y.startsWith(m) ? y.substring(m.length).trim() : void 0,
        S = (h == null ? void 0 : h.errors.length) === 0 ? h.fragment : void 0;
      v.setUIState(
        {
          mode: e ? 'inspecting' : 'none',
          actionSelector: w,
          ariaTemplate: S,
          language: n,
          testIdAttributeName: s,
          overlay: { offsetX: 0 },
        },
        {
          async elementPicked(_) {
            l({ locator: or(n, m + _.selector), ariaSnapshot: _.ariaSnapshot, lastEdited: 'none' });
          },
          highlightUpdated() {
            for (const _ of u) _.recorder !== v && _.recorder.clearHighlight();
          },
        }
      );
    }
  }, [t, e, o, l, n, s, c]),
  x.jsx(x.Fragment, {})
);
function tw(t, e, n, s, o, l) {
  if (!l) return;
  const c = l;
  if (!c._recorder) {
    const u = new rv(l, s, e, n, 1, 'chromium', !1, []),
      d = new gb(u);
    (c._injectedScript = u),
      (c._recorder = { recorder: d, frameSelector: o }),
      s &&
        ((window._weakRecordersForTest = window._weakRecordersForTest || new Set()),
        window._weakRecordersForTest.add(new WeakRef(d)));
  }
  t.push(c._recorder);
  for (let u = 0; u < l.frames.length; ++u) {
    const d = l.frames[u],
      h = d.frameElement
        ? c._injectedScript.generateSelectorSimple(d.frameElement, {
            omitInternalEngines: !0,
            testIdAttributeName: n,
          }) + ' >> internal:control=enter-frame >> '
        : '';
    tw(t, e, n, s, o + h, d);
  }
}
function KE(t) {
  if (!t) return {};
  let e = t.beforeSnapshot ? { action: t, snapshotName: t.beforeSnapshot } : void 0;
  if (!e) {
    for (let o = em(t); o; o = em(o))
      if (o.endTime <= t.startTime && o.afterSnapshot) {
        e = { action: o, snapshotName: o.afterSnapshot };
        break;
      }
  }
  let n = t.afterSnapshot ? { action: t, snapshotName: t.afterSnapshot } : void 0;
  if (!n) {
    let o;
    for (let l = tm(t); l && l.startTime <= t.endTime; l = tm(l))
      l.endTime > t.endTime || !l.afterSnapshot || (o && o.endTime > l.endTime) || (o = l);
    o ? (n = { action: o, snapshotName: o.afterSnapshot }) : (n = e);
  }
  const s = t.inputSnapshot ? { action: t, snapshotName: t.inputSnapshot, hasInputTarget: !0 } : n;
  return s && (s.point = t.point), { action: s, before: e, after: n };
}
const QE = new URLSearchParams(window.location.search).has('isUnderTest'),
  ig = new URLSearchParams(window.location.search).get('server');
function GE(t, e) {
  const n = new URLSearchParams();
  n.set('trace', ql(t.action).traceUrl),
    n.set('name', t.snapshotName),
    QE && n.set('isUnderTest', 'true'),
    t.point &&
      (n.set('pointX', String(t.point.x)),
      n.set('pointY', String(t.point.y)),
      t.hasInputTarget && n.set('hasInputTarget', '1')),
    e && n.set('shouldPopulateCanvasFromScreenshot', '1');
  const s = new URL(`snapshot/${t.action.pageId}?${n.toString()}`, window.location.href).toString(),
    o = new URL(`snapshotInfo/${t.action.pageId}?${n.toString()}`, window.location.href).toString(),
    l = new URLSearchParams();
  l.set('r', s),
    ig && l.set('server', ig),
    l.set('trace', ql(t.action).traceUrl),
    t.point &&
      (l.set('pointX', String(t.point.x)),
      l.set('pointY', String(t.point.y)),
      t.hasInputTarget && n.set('hasInputTarget', '1'));
  const c = new URL(`snapshot.html?${l.toString()}`, window.location.href).toString();
  return { snapshotInfoUrl: o, snapshotUrl: s, popoutUrl: c };
}
async function XE(t) {
  const e = { url: '', viewport: nw, timestamp: void 0, wallTime: void 0 };
  if (t) {
    const s = await (await fetch(t)).json();
    s.error ||
      ((e.url = s.url),
      (e.viewport = s.viewport),
      (e.timestamp = s.timestamp),
      (e.wallTime = s.wallTime));
  }
  return e;
}
const nw = { width: 1280, height: 720 },
  JE = 'data:text/html,<body style="background: #ddd"></body>',
  YE = ia,
  ZE = ({ stack: t, setSelectedFrame: e, selectedFrame: n }) => {
    const s = t || [];
    return x.jsx(YE, {
      name: 'stack-trace',
      items: s,
      selectedItem: s[n],
      render: o => {
        const l = o.file[1] === ':' ? '\\' : '/';
        return x.jsxs(x.Fragment, {
          children: [
            x.jsx('span', {
              className: 'stack-trace-frame-function',
              children: o.function || '(anonymous)',
            }),
            x.jsx('span', {
              className: 'stack-trace-frame-location',
              children: o.file.split(l).pop(),
            }),
            x.jsx('span', { className: 'stack-trace-frame-line', children: ':' + o.line }),
          ],
        });
      },
      onSelected: o => e(s.indexOf(o)),
    });
  };
function eT(t, e, n, s, o) {
  return ff(
    async () => {
      var m, w, S, _;
      const l = t == null ? void 0 : t[e],
        c = l != null && l.file ? l : o;
      if (!c)
        return { source: { file: '', errors: [], content: void 0 }, targetLine: 0, highlight: [] };
      const u = c.file;
      let d = n.get(u);
      d ||
        ((d = {
          errors: ((m = o == null ? void 0 : o.source) == null ? void 0 : m.errors) || [],
          content: (w = o == null ? void 0 : o.source) == null ? void 0 : w.content,
        }),
        n.set(u, d));
      const h = (c == null ? void 0 : c.line) || ((S = d.errors[0]) == null ? void 0 : S.line) || 0,
        y = s && u.startsWith(s) ? u.substring(s.length + 1) : u,
        v = d.errors.map(b => ({ type: 'error', line: b.line, message: b.message }));
      if (
        (v.push({ line: h, type: 'running' }),
        ((_ = o == null ? void 0 : o.source) == null ? void 0 : _.content) !== void 0)
      )
        d.content = o.source.content;
      else if (d.content === void 0 || c === o) {
        const b = await nT(u);
        try {
          let T = await fetch(`sha1/src@${b}.txt`);
          T.status === 404 && (T = await fetch(`file?path=${encodeURIComponent(u)}`)),
            T.status >= 400
              ? (d.content = `<Unable to read "${u}">`)
              : (d.content = await T.text());
        } catch {
          d.content = `<Unable to read "${u}">`;
        }
      }
      return { source: d, highlight: v, targetLine: h, fileName: y, location: c };
    },
    [t, e, s, o],
    { source: { errors: [], content: 'Loading…' }, highlight: [] }
  );
}
const tT = ({
  stack: t,
  sources: e,
  rootDir: n,
  fallbackLocation: s,
  stackFrameLocation: o,
  onOpenExternally: l,
}) => {
  const [c, u] = P.useState(),
    [d, h] = P.useState(0);
  P.useEffect(() => {
    c !== t && (u(t), h(0));
  }, [t, c, u, h]);
  const { source: y, highlight: v, targetLine: m, fileName: w, location: S } = eT(t, d, e, n, s),
    _ = P.useCallback(() => {
      S && (l ? l(S) : (window.location.href = `vscode://file//${S.file}:${S.line}`));
    }, [l, S]),
    b = ((t == null ? void 0 : t.length) ?? 0) > 1,
    T = rT(w);
  return x.jsx(Hl, {
    sidebarSize: 200,
    orientation: o === 'bottom' ? 'vertical' : 'horizontal',
    sidebarHidden: !b,
    main: x.jsxs('div', {
      className: 'vbox',
      'data-testid': 'source-code',
      children: [
        w &&
          x.jsxs(wf, {
            children: [
              x.jsx('div', {
                className: 'source-tab-file-name',
                title: w,
                children: x.jsx('div', { children: T }),
              }),
              x.jsx(mf, { description: 'Copy filename', value: T }),
              S && x.jsx(Rt, { icon: 'link-external', title: 'Open in VS Code', onClick: _ }),
            ],
          }),
        x.jsx(js, {
          text: y.content || '',
          language: 'javascript',
          highlight: v,
          revealLine: m,
          readOnly: !0,
          lineNumbers: !0,
          dataTestId: 'source-code-mirror',
        }),
      ],
    }),
    sidebar: x.jsx(ZE, { stack: t, selectedFrame: d, setSelectedFrame: h }),
  });
};
async function nT(t) {
  const e = new TextEncoder().encode(t),
    n = await crypto.subtle.digest('SHA-1', e),
    s = [],
    o = new DataView(n);
  for (let l = 0; l < o.byteLength; l += 1) {
    const c = o.getUint8(l).toString(16).padStart(2, '0');
    s.push(c);
  }
  return s.join('');
}
function rT(t) {
  if (!t) return '';
  const e = t != null && t.includes('/') ? '/' : '\\';
  return (t == null ? void 0 : t.split(e).pop()) ?? '';
}
const rw = { width: 200, height: 45 },
  ws = 2.5,
  sT = rw.height + ws * 2,
  iT = ({ model: t, boundaries: e, previewPoint: n }) => {
    var y, v;
    const [s, o] = Mr(),
      l = P.useRef(null);
    let c = 0;
    if (l.current && n) {
      const m = l.current.getBoundingClientRect();
      c = ((n.clientY - m.top + l.current.scrollTop) / sT) | 0;
    }
    const u =
      (v = (y = t == null ? void 0 : t.pages) == null ? void 0 : y[c]) == null
        ? void 0
        : v.screencastFrames;
    let d, h;
    if (n !== void 0 && u && u.length) {
      const m = e.minimum + ((e.maximum - e.minimum) * n.x) / s.width;
      d = u[og(u, m, sw) - 1];
      const w = {
        width: Math.min(800, (window.innerWidth / 2) | 0),
        height: Math.min(800, (window.innerHeight / 2) | 0),
      };
      h = d ? iw({ width: d.width, height: d.height }, w) : void 0;
    }
    return x.jsxs('div', {
      className: 'film-strip',
      ref: o,
      children: [
        x.jsx('div', {
          className: 'film-strip-lanes',
          ref: l,
          children:
            t == null
              ? void 0
              : t.pages.map((m, w) =>
                  m.screencastFrames.length
                    ? x.jsx(oT, { boundaries: e, page: m, width: s.width }, w)
                    : null
                ),
        }),
        (n == null ? void 0 : n.x) !== void 0 &&
          x.jsxs('div', {
            className: 'film-strip-hover',
            style: { top: s.bottom + 5, left: Math.min(n.x, s.width - (h ? h.width : 0) - 10) },
            children: [
              n.action &&
                x.jsx('div', { className: 'film-strip-hover-title', children: pf(n.action, n) }),
              d &&
                h &&
                x.jsx('div', {
                  style: { width: h.width, height: h.height },
                  children: x.jsx('img', {
                    src: `sha1/${d.sha1}`,
                    width: h.width,
                    height: h.height,
                  }),
                }),
            ],
          }),
      ],
    });
  },
  oT = ({ boundaries: t, page: e, width: n }) => {
    const s = { width: 0, height: 0 },
      o = e.screencastFrames;
    for (const _ of o)
      (s.width = Math.max(s.width, _.width)), (s.height = Math.max(s.height, _.height));
    const l = iw(s, rw),
      c = o[0].timestamp,
      u = o[o.length - 1].timestamp,
      d = t.maximum - t.minimum,
      h = ((c - t.minimum) / d) * n,
      y = ((t.maximum - u) / d) * n,
      m = ((((u - c) / d) * n) / (l.width + 2 * ws)) | 0,
      w = (u - c) / m,
      S = [];
    for (let _ = 0; c && w && _ < m; ++_) {
      const b = c + w * _,
        T = og(o, b, sw) - 1;
      S.push(
        x.jsx(
          'div',
          {
            className: 'film-strip-frame',
            style: {
              width: l.width,
              height: l.height,
              backgroundImage: `url(sha1/${o[T].sha1})`,
              backgroundSize: `${l.width}px ${l.height}px`,
              margin: ws,
              marginRight: ws,
            },
          },
          _
        )
      );
    }
    return (
      S.push(
        x.jsx(
          'div',
          {
            className: 'film-strip-frame',
            style: {
              width: l.width,
              height: l.height,
              backgroundImage: `url(sha1/${o[o.length - 1].sha1})`,
              backgroundSize: `${l.width}px ${l.height}px`,
              margin: ws,
              marginRight: ws,
            },
          },
          S.length
        )
      ),
      x.jsx('div', {
        className: 'film-strip-lane',
        style: { marginLeft: h + 'px', marginRight: y + 'px' },
        children: S,
      })
    );
  };
function sw(t, e) {
  return t - e.timestamp;
}
function iw(t, e) {
  const n = Math.max(t.width / e.width, t.height / e.height);
  return { width: (t.width / n) | 0, height: (t.height / n) | 0 };
}
const lT = ({
  model: t,
  boundaries: e,
  consoleEntries: n,
  onSelected: s,
  highlightedAction: o,
  highlightedEntry: l,
  highlightedConsoleEntry: c,
  selectedTime: u,
  setSelectedTime: d,
  sdkLanguage: h,
}) => {
  const [y, v] = Mr(),
    [m, w] = P.useState(),
    [S, _] = P.useState(),
    {
      offsets: b,
      curtainLeft: T,
      curtainRight: C,
    } = P.useMemo(() => {
      let Q = u || e;
      if (m && m.startX !== m.endX) {
        const de = mn(y.width, e, m.startX),
          Te = mn(y.width, e, m.endX);
        Q = { minimum: Math.min(de, Te), maximum: Math.max(de, Te) };
      }
      const W = Vt(y.width, e, Q.minimum),
        J = Vt(y.width, e, e.maximum) - Vt(y.width, e, Q.maximum);
      return { offsets: aT(y.width, e), curtainLeft: W, curtainRight: J };
    }, [u, e, m, y]),
    O = P.useMemo(() => {
      const Q = [];
      for (const W of (t == null ? void 0 : t.actions) || [])
        W.class !== 'Test' &&
          Q.push({
            action: W,
            leftTime: W.startTime,
            rightTime: W.endTime || e.maximum,
            leftPosition: Vt(y.width, e, W.startTime),
            rightPosition: Vt(y.width, e, W.endTime || e.maximum),
            active: !1,
            error: !!W.error,
          });
      for (const W of (t == null ? void 0 : t.resources) || []) {
        const z = W._monotonicTime,
          J = W._monotonicTime + W.time;
        Q.push({
          resource: W,
          leftTime: z,
          rightTime: J,
          leftPosition: Vt(y.width, e, z),
          rightPosition: Vt(y.width, e, J),
          active: !1,
          error: !1,
        });
      }
      for (const W of n || [])
        Q.push({
          consoleMessage: W,
          leftTime: W.timestamp,
          rightTime: W.timestamp,
          leftPosition: Vt(y.width, e, W.timestamp),
          rightPosition: Vt(y.width, e, W.timestamp),
          active: !1,
          error: W.isError,
        });
      return Q;
    }, [t, n, e, y]);
  P.useMemo(() => {
    for (const Q of O)
      o
        ? (Q.active = Q.action === o)
        : l
          ? (Q.active = Q.resource === l)
          : c
            ? (Q.active = Q.consoleMessage === c)
            : (Q.active = !1);
  }, [O, o, l, c]);
  const R = P.useCallback(
      Q => {
        if ((_(void 0), !v.current)) return;
        const W = Q.clientX - v.current.getBoundingClientRect().left,
          z = mn(y.width, e, W),
          J = u ? Vt(y.width, e, u.minimum) : 0,
          de = u ? Vt(y.width, e, u.maximum) : 0;
        u && Math.abs(W - J) < 10
          ? w({ startX: de, endX: W, type: 'resize' })
          : u && Math.abs(W - de) < 10
            ? w({ startX: J, endX: W, type: 'resize' })
            : u &&
                z > u.minimum &&
                z < u.maximum &&
                Q.clientY - v.current.getBoundingClientRect().top < 20
              ? w({ startX: J, endX: de, pivot: W, type: 'move' })
              : w({ startX: W, endX: W, type: 'resize' });
      },
      [e, y, v, u]
    ),
    D = P.useCallback(
      Q => {
        if (!v.current) return;
        const W = Q.clientX - v.current.getBoundingClientRect().left,
          z = mn(y.width, e, W),
          J = t == null ? void 0 : t.actions.findLast(ye => ye.startTime <= z);
        if (!Q.buttons) {
          w(void 0);
          return;
        }
        if ((J && s(J), !m)) return;
        let de = m;
        if (m.type === 'resize') de = { ...m, endX: W };
        else {
          const ye = W - m.pivot;
          let X = m.startX + ye,
            se = m.endX + ye;
          X < 0 && ((X = 0), (se = X + (m.endX - m.startX))),
            se > y.width && ((se = y.width), (X = se - (m.endX - m.startX))),
            (de = { ...m, startX: X, endX: se, pivot: W });
        }
        w(de);
        const Te = mn(y.width, e, de.startX),
          Le = mn(y.width, e, de.endX);
        Te !== Le && d({ minimum: Math.min(Te, Le), maximum: Math.max(Te, Le) });
      },
      [e, m, y, t, s, v, d]
    ),
    F = P.useCallback(() => {
      if ((_(void 0), !!m)) {
        if (m.startX !== m.endX) {
          const Q = mn(y.width, e, m.startX),
            W = mn(y.width, e, m.endX);
          d({ minimum: Math.min(Q, W), maximum: Math.max(Q, W) });
        } else {
          const Q = mn(y.width, e, m.startX),
            W = t == null ? void 0 : t.actions.findLast(z => z.startTime <= Q);
          W && s(W), d(void 0);
        }
        w(void 0);
      }
    }, [e, m, y, t, d, s]),
    U = P.useCallback(
      Q => {
        if (!v.current) return;
        const W = Q.clientX - v.current.getBoundingClientRect().left,
          z = mn(y.width, e, W),
          J = t == null ? void 0 : t.actions.findLast(de => de.startTime <= z);
        _({ x: W, clientY: Q.clientY, action: J, sdkLanguage: h });
      },
      [e, y, t, v, h]
    ),
    B = P.useCallback(() => {
      _(void 0);
    }, []),
    I = P.useCallback(() => {
      d(void 0);
    }, [d]);
  return x.jsxs('div', {
    style: { flex: 'none', borderBottom: '1px solid var(--vscode-panel-border)' },
    children: [
      !!m &&
        x.jsx(sy, {
          cursor: (m == null ? void 0 : m.type) === 'resize' ? 'ew-resize' : 'grab',
          onPaneMouseUp: F,
          onPaneMouseMove: D,
          onPaneDoubleClick: I,
        }),
      x.jsxs('div', {
        ref: v,
        className: 'timeline-view',
        onMouseDown: R,
        onMouseMove: U,
        onMouseLeave: B,
        children: [
          x.jsx('div', {
            className: 'timeline-grid',
            children: b.map((Q, W) =>
              x.jsx(
                'div',
                {
                  className: 'timeline-divider',
                  style: { left: Q.position + 'px' },
                  children: x.jsx('div', {
                    className: 'timeline-time',
                    children: yt(Q.time - e.minimum),
                  }),
                },
                W
              )
            ),
          }),
          x.jsx('div', { style: { height: 8 } }),
          x.jsx(iT, { model: t, boundaries: e, previewPoint: S }),
          x.jsx('div', {
            className: 'timeline-bars',
            children: O.map((Q, W) =>
              x.jsx(
                'div',
                {
                  className: Ue(
                    'timeline-bar',
                    Q.action && 'action',
                    Q.resource && 'network',
                    Q.consoleMessage && 'console-message',
                    Q.active && 'active',
                    Q.error && 'error'
                  ),
                  style: {
                    left: Q.leftPosition,
                    width: Math.max(5, Q.rightPosition - Q.leftPosition),
                    top: cT(Q),
                    bottom: 0,
                  },
                },
                W
              )
            ),
          }),
          x.jsx('div', {
            className: 'timeline-marker',
            style: {
              display: S !== void 0 ? 'block' : 'none',
              left: ((S == null ? void 0 : S.x) || 0) + 'px',
            },
          }),
          u &&
            x.jsxs('div', {
              className: 'timeline-window',
              children: [
                x.jsx('div', { className: 'timeline-window-curtain left', style: { width: T } }),
                x.jsx('div', { className: 'timeline-window-resizer', style: { left: -5 } }),
                x.jsx('div', {
                  className: 'timeline-window-center',
                  children: x.jsx('div', { className: 'timeline-window-drag' }),
                }),
                x.jsx('div', { className: 'timeline-window-resizer', style: { left: 5 } }),
                x.jsx('div', { className: 'timeline-window-curtain right', style: { width: C } }),
              ],
            }),
        ],
      }),
    ],
  });
};
function aT(t, e) {
  let s = t / 64;
  const o = e.maximum - e.minimum,
    l = t / o;
  let c = o / s;
  const u = Math.ceil(Math.log(c) / Math.LN10);
  (c = Math.pow(10, u)), c * l >= 5 * 64 && (c = c / 5), c * l >= 2 * 64 && (c = c / 2);
  const d = e.minimum;
  let h = e.maximum;
  (h += 64 / l), (s = Math.ceil((h - d) / c)), c || (s = 0);
  const y = [];
  for (let v = 0; v < s; ++v) {
    const m = d + c * v;
    y.push({ position: Vt(t, e, m), time: m });
  }
  return y;
}
function Vt(t, e, n) {
  return ((n - e.minimum) / (e.maximum - e.minimum)) * t;
}
function mn(t, e, n) {
  return (n / t) * (e.maximum - e.minimum) + e.minimum;
}
function cT(t) {
  return t.resource ? 25 : 20;
}
const uT = ({ model: t }) => {
    var n, s;
    if (!t) return x.jsx(x.Fragment, {});
    const e =
      t.wallTime !== void 0
        ? new Date(t.wallTime).toLocaleString(void 0, { timeZoneName: 'short' })
        : void 0;
    return x.jsxs('div', {
      'data-testid': 'metadata-view',
      className: 'vbox',
      style: { flexShrink: 0 },
      children: [
        x.jsx('div', { className: 'call-section', style: { paddingTop: 2 }, children: 'Time' }),
        !!e &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'start time:',
              x.jsx('span', { className: 'call-value datetime', title: e, children: e }),
            ],
          }),
        x.jsxs('div', {
          className: 'call-line',
          children: [
            'duration:',
            x.jsx('span', {
              className: 'call-value number',
              title: yt(t.endTime - t.startTime),
              children: yt(t.endTime - t.startTime),
            }),
          ],
        }),
        x.jsx('div', { className: 'call-section', children: 'Browser' }),
        x.jsxs('div', {
          className: 'call-line',
          children: [
            'engine:',
            x.jsx('span', {
              className: 'call-value string',
              title: t.browserName,
              children: t.browserName,
            }),
          ],
        }),
        t.channel &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'channel:',
              x.jsx('span', {
                className: 'call-value string',
                title: t.channel,
                children: t.channel,
              }),
            ],
          }),
        t.platform &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'platform:',
              x.jsx('span', {
                className: 'call-value string',
                title: t.platform,
                children: t.platform,
              }),
            ],
          }),
        t.options.userAgent &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'user agent:',
              x.jsx('span', {
                className: 'call-value datetime',
                title: t.options.userAgent,
                children: t.options.userAgent,
              }),
            ],
          }),
        t.options.baseURL &&
          x.jsxs(x.Fragment, {
            children: [
              x.jsx('div', {
                className: 'call-section',
                style: { paddingTop: 2 },
                children: 'Config',
              }),
              x.jsxs('div', {
                className: 'call-line',
                children: [
                  'baseURL:',
                  x.jsx('a', {
                    className: 'call-value string',
                    href: t.options.baseURL,
                    title: t.options.baseURL,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    children: t.options.baseURL,
                  }),
                ],
              }),
            ],
          }),
        x.jsx('div', { className: 'call-section', children: 'Viewport' }),
        t.options.viewport &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'width:',
              x.jsx('span', {
                className: 'call-value number',
                title: String(!!((n = t.options.viewport) != null && n.width)),
                children: t.options.viewport.width,
              }),
            ],
          }),
        t.options.viewport &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'height:',
              x.jsx('span', {
                className: 'call-value number',
                title: String(!!((s = t.options.viewport) != null && s.height)),
                children: t.options.viewport.height,
              }),
            ],
          }),
        x.jsxs('div', {
          className: 'call-line',
          children: [
            'is mobile:',
            x.jsx('span', {
              className: 'call-value boolean',
              title: String(!!t.options.isMobile),
              children: String(!!t.options.isMobile),
            }),
          ],
        }),
        t.options.deviceScaleFactor &&
          x.jsxs('div', {
            className: 'call-line',
            children: [
              'device scale:',
              x.jsx('span', {
                className: 'call-value number',
                title: String(t.options.deviceScaleFactor),
                children: String(t.options.deviceScaleFactor),
              }),
            ],
          }),
        x.jsx('div', { className: 'call-section', children: 'Counts' }),
        x.jsxs('div', {
          className: 'call-line',
          children: [
            'pages:',
            x.jsx('span', { className: 'call-value number', children: t.pages.length }),
          ],
        }),
        x.jsxs('div', {
          className: 'call-line',
          children: [
            'actions:',
            x.jsx('span', { className: 'call-value number', children: t.actions.length }),
          ],
        }),
        x.jsxs('div', {
          className: 'call-line',
          children: [
            'events:',
            x.jsx('span', { className: 'call-value number', children: t.events.length }),
          ],
        }),
      ],
    });
  },
  fT = ({ annotations: t }) =>
    t.length
      ? x.jsx('div', {
          className: 'annotations-tab',
          children: t.map((e, n) =>
            x.jsxs(
              'div',
              {
                className: 'annotation-item',
                children: [
                  x.jsx('span', { style: { fontWeight: 'bold' }, children: e.type }),
                  e.description && x.jsxs('span', { children: [': ', oy(e.description)] }),
                ],
              },
              `annotation-${n}`
            )
          ),
        })
      : x.jsx($r, { text: 'No annotations' }),
  dT = ({
    sdkLanguage: t,
    setIsInspecting: e,
    highlightedElement: n,
    setHighlightedElement: s,
  }) => {
    const [o, l] = P.useState(),
      c = P.useCallback(
        u => {
          const { errors: d } = xf(ew, u, { prettyErrors: !1 }),
            h = d.map(y => ({
              message: y.message,
              line: y.range[1].line,
              column: y.range[1].col,
              type: 'subtle-error',
            }));
          l(h), s({ ...n, ariaSnapshot: u, lastEdited: 'ariaSnapshot' }), e(!1);
        },
        [n, s, e]
      );
    return x.jsxs('div', {
      style: {
        flex: 'auto',
        backgroundColor: 'var(--vscode-sideBar-background)',
        padding: '0 10px 10px 10px',
        overflow: 'auto',
      },
      children: [
        x.jsxs('div', {
          className: 'hbox',
          style: { lineHeight: '28px', color: 'var(--vscode-editorCodeLens-foreground)' },
          children: [
            x.jsx('div', { style: { flex: 'auto' }, children: 'Locator' }),
            x.jsx(Rt, {
              icon: 'files',
              title: 'Copy locator',
              onClick: () => {
                Wp(n.locator || '');
              },
            }),
          ],
        }),
        x.jsx('div', {
          style: { height: 50 },
          children: x.jsx(js, {
            text: n.locator || '',
            language: t,
            isFocused: !0,
            wrapLines: !0,
            onChange: u => {
              s({ ...n, locator: u, lastEdited: 'locator' }), e(!1);
            },
          }),
        }),
        x.jsxs('div', {
          className: 'hbox',
          style: { lineHeight: '28px', color: 'var(--vscode-editorCodeLens-foreground)' },
          children: [
            x.jsx('div', { style: { flex: 'auto' }, children: 'Aria snapshot' }),
            x.jsx(Rt, {
              icon: 'files',
              title: 'Copy snapshot',
              onClick: () => {
                Wp(n.ariaSnapshot || '');
              },
            }),
          ],
        }),
        x.jsx('div', {
          style: { height: 150 },
          children: x.jsx(js, {
            text: n.ariaSnapshot || '',
            language: 'yaml',
            wrapLines: !1,
            highlight: o,
            onChange: c,
          }),
        }),
      ],
    });
  },
  ST = ({
    model: t,
    showSourcesFirst: e,
    rootDir: n,
    fallbackLocation: s,
    isLive: o,
    hideTimeline: l,
    status: c,
    annotations: u,
    inert: d,
    onOpenExternally: h,
    revealSource: y,
  }) => {
    var Qs;
    const [v, m] = P.useState(void 0),
      [w, S] = P.useState(void 0),
      [_, b] = P.useState(void 0),
      [T, C] = P.useState(),
      [O, R] = P.useState(),
      [D, F] = P.useState(),
      [U, B] = P.useState('actions'),
      [I, Q] = As('propertiesTab', e ? 'source' : 'call'),
      [W, z] = P.useState(!1),
      [J, de] = P.useState({ lastEdited: 'none' }),
      [Te, Le] = P.useState(),
      [ye, X] = As('propertiesSidebarLocation', 'bottom'),
      se = P.useCallback(le => {
        m(le == null ? void 0 : le.callId), S(void 0);
      }, []),
      Z = P.useMemo(() => (t == null ? void 0 : t.actions.find(le => le.callId === T)), [t, T]),
      L = P.useCallback(le => {
        C(le == null ? void 0 : le.callId);
      }, []),
      q = P.useMemo(() => (t == null ? void 0 : t.sources) || new Map(), [t]);
    P.useEffect(() => {
      Le(void 0), S(void 0);
    }, [t]);
    const fe = P.useMemo(() => {
        if (v) {
          const wt = t == null ? void 0 : t.actions.find(Jt => Jt.callId === v);
          if (wt) return wt;
        }
        const le = t == null ? void 0 : t.failedAction();
        if (le) return le;
        if (t != null && t.actions.length) {
          let wt = t.actions.length - 1;
          for (let Jt = 0; Jt < t.actions.length; ++Jt)
            if (t.actions[Jt].apiName === 'After Hooks' && Jt) {
              wt = Jt - 1;
              break;
            }
          return t.actions[wt];
        }
      }, [t, v]),
      ue = P.useMemo(() => Z || fe, [fe, Z]),
      ve = P.useMemo(() => (w ? w.stack : ue == null ? void 0 : ue.stack), [ue, w]),
      ge = P.useCallback(
        le => {
          se(le), L(void 0);
        },
        [se, L]
      ),
      pe = P.useCallback(
        le => {
          Q(le), le !== 'inspector' && z(!1);
        },
        [Q]
      ),
      Se = P.useCallback(
        le => {
          !W && le && pe('inspector'), z(le);
        },
        [z, pe, W]
      ),
      Ce = P.useCallback(
        le => {
          de(le), pe('inspector');
        },
        [pe]
      ),
      ft = P.useCallback(
        le => {
          pe('attachments'),
            b(wt => {
              if (!wt) return [le, 0];
              const Jt = wt[1];
              return [le, Jt + 1];
            });
        },
        [pe]
      );
    P.useEffect(() => {
      y && pe('source');
    }, [y, pe]);
    const Mn = a_(t, Te),
      Hs = O_(t, Te),
      ur = r_(t),
      cn = (t == null ? void 0 : t.sdkLanguage) || 'javascript',
      so = {
        id: 'inspector',
        title: 'Locator',
        render: () =>
          x.jsx(dT, {
            sdkLanguage: cn,
            setIsInspecting: Se,
            highlightedElement: J,
            setHighlightedElement: de,
          }),
      },
      io = {
        id: 'call',
        title: 'Call',
        render: () =>
          x.jsx(w1, {
            action: ue,
            startTimeOffset: (t == null ? void 0 : t.startTime) ?? 0,
            sdkLanguage: cn,
          }),
      },
      Vs = { id: 'log', title: 'Log', render: () => x.jsx(_1, { action: ue, isLive: o }) },
      oo = {
        id: 'errors',
        title: 'Errors',
        errorCount: ur.errors.size,
        render: () =>
          x.jsx(o_, {
            errorsModel: ur,
            sdkLanguage: cn,
            revealInSource: le => {
              le.action ? se(le.action) : S(le), pe('source');
            },
            wallTime: (t == null ? void 0 : t.wallTime) ?? 0,
          }),
      };
    let Fr;
    !fe && s && (Fr = (Qs = s.source) == null ? void 0 : Qs.errors.length);
    const vn = {
        id: 'source',
        title: 'Source',
        errorCount: Fr,
        render: () =>
          x.jsx(tT, {
            stack: ve,
            sources: q,
            rootDir: n,
            stackFrameLocation: ye === 'bottom' ? 'right' : 'bottom',
            fallbackLocation: s,
            onOpenExternally: h,
          }),
      },
      $n = {
        id: 'console',
        title: 'Console',
        count: Mn.entries.length,
        render: () =>
          x.jsx(c_, {
            consoleModel: Mn,
            boundaries: zr,
            selectedTime: Te,
            onAccepted: le => Le({ minimum: le.timestamp, maximum: le.timestamp }),
            onEntryHovered: F,
          }),
      },
      Ws = {
        id: 'network',
        title: 'Network',
        count: Hs.resources.length,
        render: () =>
          x.jsx(M_, {
            boundaries: zr,
            networkModel: Hs,
            onEntryHovered: R,
            sdkLanguage: (t == null ? void 0 : t.sdkLanguage) ?? 'javascript',
          }),
      },
      lo = {
        id: 'attachments',
        title: 'Attachments',
        count: t == null ? void 0 : t.visibleAttachments.length,
        render: () => x.jsx(YS, { model: t, revealedAttachment: _ }),
      },
      Pn = [so, io, Vs, oo, $n, Ws, vn, lo];
    if (u !== void 0) {
      const le = {
        id: 'annotations',
        title: 'Annotations',
        count: u.length,
        render: () => x.jsx(fT, { annotations: u }),
      };
      Pn.push(le);
    }
    if (e) {
      const le = Pn.indexOf(vn);
      Pn.splice(le, 1), Pn.splice(1, 0, vn);
    }
    const { boundaries: zr } = P.useMemo(() => {
      const le = {
        minimum: (t == null ? void 0 : t.startTime) || 0,
        maximum: (t == null ? void 0 : t.endTime) || 3e4,
      };
      return (
        le.minimum > le.maximum && ((le.minimum = 0), (le.maximum = 3e4)),
        (le.maximum += (le.maximum - le.minimum) / 20),
        { boundaries: le }
      );
    }, [t]);
    let fr = 0;
    !o && t && t.endTime >= 0
      ? (fr = t.endTime - t.startTime)
      : t && t.wallTime && (fr = Date.now() - t.wallTime);
    const Ks = {
        id: 'actions',
        title: 'Actions',
        component: x.jsxs('div', {
          className: 'vbox',
          children: [
            c &&
              x.jsxs('div', {
                className: 'workbench-run-status',
                children: [
                  x.jsx('span', { className: Ue('codicon', Rg(c)) }),
                  x.jsx('div', { children: f1(c) }),
                  x.jsx('div', { className: 'spacer' }),
                  x.jsx('div', { className: 'workbench-run-duration', children: fr ? yt(fr) : '' }),
                ],
              }),
            x.jsx(h1, {
              sdkLanguage: cn,
              actions: (t == null ? void 0 : t.actions) || [],
              selectedAction: t ? fe : void 0,
              selectedTime: Te,
              setSelectedTime: Le,
              onSelected: ge,
              onHighlighted: L,
              revealAttachment: ft,
              revealConsole: () => pe('console'),
              isLive: o,
            }),
          ],
        }),
      },
      Br = { id: 'metadata', title: 'Metadata', component: x.jsx(uT, { model: t }) };
    return x.jsxs('div', {
      className: 'vbox workbench',
      ...(d ? { inert: 'true' } : {}),
      children: [
        !l &&
          x.jsx(lT, {
            model: t,
            consoleEntries: Mn.entries,
            boundaries: zr,
            highlightedAction: Z,
            highlightedEntry: O,
            highlightedConsoleEntry: D,
            onSelected: ge,
            sdkLanguage: cn,
            selectedTime: Te,
            setSelectedTime: Le,
          }),
        x.jsx(Hl, {
          sidebarSize: 250,
          orientation: ye === 'bottom' ? 'vertical' : 'horizontal',
          settingName: 'propertiesSidebar',
          main: x.jsx(Hl, {
            sidebarSize: 250,
            orientation: 'horizontal',
            sidebarIsFirst: !0,
            settingName: 'actionListSidebar',
            main: x.jsx(qE, {
              action: ue,
              model: t,
              sdkLanguage: cn,
              testIdAttributeName: (t == null ? void 0 : t.testIdAttributeName) || 'data-testid',
              isInspecting: W,
              setIsInspecting: Se,
              highlightedElement: J,
              setHighlightedElement: Ce,
            }),
            sidebar: x.jsx(Yu, { tabs: [Ks, Br], selectedTab: U, setSelectedTab: B }),
          }),
          sidebar: x.jsx(Yu, {
            tabs: Pn,
            selectedTab: I,
            setSelectedTab: pe,
            rightToolbar: [
              ye === 'bottom'
                ? x.jsx(Rt, {
                    title: 'Dock to right',
                    icon: 'layout-sidebar-right-off',
                    onClick: () => {
                      X('right');
                    },
                  })
                : x.jsx(Rt, {
                    title: 'Dock to bottom',
                    icon: 'layout-panel-off',
                    onClick: () => {
                      X('bottom');
                    },
                  }),
            ],
            mode: ye === 'bottom' ? 'default' : 'select',
          }),
        }),
      ],
    });
  };
class _T {
  constructor(e) {
    this._ws = new WebSocket(e);
  }
  onmessage(e) {
    this._ws.addEventListener('message', n => e(n.data.toString()));
  }
  onopen(e) {
    this._ws.addEventListener('open', e);
  }
  onerror(e) {
    this._ws.addEventListener('error', e);
  }
  onclose(e) {
    this._ws.addEventListener('close', e);
  }
  send(e) {
    this._ws.send(e);
  }
  close() {
    this._ws.close();
  }
}
class kT {
  constructor(e) {
    (this._onCloseEmitter = new vs()),
      (this._onReportEmitter = new vs()),
      (this._onStdioEmitter = new vs()),
      (this._onTestFilesChangedEmitter = new vs()),
      (this._onLoadTraceRequestedEmitter = new vs()),
      (this._lastId = 0),
      (this._callbacks = new Map()),
      (this._isClosed = !1),
      (this.onClose = this._onCloseEmitter.event),
      (this.onReport = this._onReportEmitter.event),
      (this.onStdio = this._onStdioEmitter.event),
      (this.onTestFilesChanged = this._onTestFilesChangedEmitter.event),
      (this.onLoadTraceRequested = this._onLoadTraceRequestedEmitter.event),
      (this._transport = e),
      this._transport.onmessage(s => {
        const o = JSON.parse(s),
          { id: l, result: c, error: u, method: d, params: h } = o;
        if (l) {
          const y = this._callbacks.get(l);
          if (!y) return;
          this._callbacks.delete(l), u ? y.reject(new Error(u)) : y.resolve(c);
        } else this._dispatchEvent(d, h);
      });
    const n = setInterval(() => this._sendMessage('ping').catch(() => {}), 3e4);
    (this._connectedPromise = new Promise((s, o) => {
      this._transport.onopen(s), this._transport.onerror(o);
    })),
      this._transport.onclose(() => {
        (this._isClosed = !0), this._onCloseEmitter.fire(), clearInterval(n);
      });
  }
  isClosed() {
    return this._isClosed;
  }
  async _sendMessage(e, n) {
    const s = globalThis.__logForTest;
    s == null || s({ method: e, params: n }), await this._connectedPromise;
    const o = ++this._lastId,
      l = { id: o, method: e, params: n };
    return (
      this._transport.send(JSON.stringify(l)),
      new Promise((c, u) => {
        this._callbacks.set(o, { resolve: c, reject: u });
      })
    );
  }
  _sendMessageNoReply(e, n) {
    this._sendMessage(e, n).catch(() => {});
  }
  _dispatchEvent(e, n) {
    e === 'report'
      ? this._onReportEmitter.fire(n)
      : e === 'stdio'
        ? this._onStdioEmitter.fire(n)
        : e === 'testFilesChanged'
          ? this._onTestFilesChangedEmitter.fire(n)
          : e === 'loadTraceRequested' && this._onLoadTraceRequestedEmitter.fire(n);
  }
  async initialize(e) {
    await this._sendMessage('initialize', e);
  }
  async ping(e) {
    await this._sendMessage('ping', e);
  }
  async pingNoReply(e) {
    this._sendMessageNoReply('ping', e);
  }
  async watch(e) {
    await this._sendMessage('watch', e);
  }
  watchNoReply(e) {
    this._sendMessageNoReply('watch', e);
  }
  async open(e) {
    await this._sendMessage('open', e);
  }
  openNoReply(e) {
    this._sendMessageNoReply('open', e);
  }
  async resizeTerminal(e) {
    await this._sendMessage('resizeTerminal', e);
  }
  resizeTerminalNoReply(e) {
    this._sendMessageNoReply('resizeTerminal', e);
  }
  async checkBrowsers(e) {
    return await this._sendMessage('checkBrowsers', e);
  }
  async installBrowsers(e) {
    await this._sendMessage('installBrowsers', e);
  }
  async runGlobalSetup(e) {
    return await this._sendMessage('runGlobalSetup', e);
  }
  async runGlobalTeardown(e) {
    return await this._sendMessage('runGlobalTeardown', e);
  }
  async startDevServer(e) {
    return await this._sendMessage('startDevServer', e);
  }
  async stopDevServer(e) {
    return await this._sendMessage('stopDevServer', e);
  }
  async clearCache(e) {
    return await this._sendMessage('clearCache', e);
  }
  async listFiles(e) {
    return await this._sendMessage('listFiles', e);
  }
  async listTests(e) {
    return await this._sendMessage('listTests', e);
  }
  async runTests(e) {
    return await this._sendMessage('runTests', e);
  }
  async findRelatedTestFiles(e) {
    return await this._sendMessage('findRelatedTestFiles', e);
  }
  async stopTests(e) {
    await this._sendMessage('stopTests', e);
  }
  stopTestsNoReply(e) {
    this._sendMessageNoReply('stopTests', e);
  }
  async closeGracefully(e) {
    await this._sendMessage('closeGracefully', e);
  }
  close() {
    try {
      this._transport.close();
    } catch {}
  }
}
const hT = ({ settings: t }) =>
    x.jsx('div', {
      className: 'vbox settings-view',
      children: t.map(({ value: e, set: n, name: s, title: o }) => {
        const l = `setting-${s}`;
        return x.jsxs(
          'div',
          {
            className: 'setting',
            title: o,
            children: [
              x.jsx('input', { type: 'checkbox', id: l, checked: e, onChange: () => n(!e) }),
              x.jsx('label', { htmlFor: l, children: s }),
            ],
          },
          s
        );
      }),
    }),
  bT = () => {
    const [t, e] = As('shouldPopulateCanvasFromScreenshot', !1),
      [n, s] = dx();
    return x.jsx(hT, {
      settings: [
        { value: n, set: s, name: 'Dark mode' },
        {
          value: t,
          set: e,
          name: 'Display canvas content',
          title:
            'Attempt to display the captured canvas appearance in the snapshot preview. May not be accurate.',
        },
      ],
    });
  };
export {
  bT as D,
  GS as E,
  xT as L,
  wT as M,
  jt as R,
  Hl as S,
  Rt as T,
  _T as W,
  US as _,
  kT as a,
  ST as b,
  mT as c,
  vT as d,
  Hu as e,
  gT as f,
  yT as g,
  Ue as h,
  c1 as i,
  x as j,
  wf as k,
  As as l,
  yt as m,
  rx as n,
  P as r,
  Tr as s,
  Rg as t,
  Mr as u,
};
