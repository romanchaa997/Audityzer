LavaPack.loadBundle(
  [
    [
      1724,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e) {
                  if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
                }
                function s(e) {
                  return (
                    e instanceof Uint8Array ||
                    (null != e && 'object' == typeof e && 'Uint8Array' === e.constructor.name)
                  );
                }
                function i(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function a(e) {
                  return {
                    encode: t => {
                      if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                        throw new Error('alphabet.encode input should be an array of numbers');
                      return t.map(t => {
                        if ((n(t), t < 0 || t >= e.length))
                          throw new Error(
                            `Digit index outside alphabet: ${t} (alphabet: ${e.length})`
                          );
                        return e[t];
                      });
                    },
                    decode: t => {
                      if (!Array.isArray(t) || (t.length && 'string' != typeof t[0]))
                        throw new Error('alphabet.decode input should be array of strings');
                      return t.map(t => {
                        if ('string' != typeof t)
                          throw new Error(`alphabet.decode: not string element=${t}`);
                        const r = e.indexOf(t);
                        if (-1 === r) throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                        return r;
                      });
                    },
                  };
                }
                function o(e = '') {
                  if ('string' != typeof e) throw new Error('join separator should be string');
                  return {
                    encode: t => {
                      if (!Array.isArray(t) || (t.length && 'string' != typeof t[0]))
                        throw new Error('join.encode input should be array of strings');
                      for (let e of t)
                        if ('string' != typeof e)
                          throw new Error(`join.encode: non-string input=${e}`);
                      return t.join(e);
                    },
                    decode: t => {
                      if ('string' != typeof t)
                        throw new Error('join.decode input should be string');
                      return t.split(e);
                    },
                  };
                }
                function c(e, t = '=') {
                  if ((n(e), 'string' != typeof t)) throw new Error('padding chr should be string');
                  return {
                    encode(r) {
                      if (!Array.isArray(r) || (r.length && 'string' != typeof r[0]))
                        throw new Error('padding.encode input should be array of strings');
                      for (let e of r)
                        if ('string' != typeof e)
                          throw new Error(`padding.encode: non-string input=${e}`);
                      for (; (r.length * e) % 8; ) r.push(t);
                      return r;
                    },
                    decode(r) {
                      if (!Array.isArray(r) || (r.length && 'string' != typeof r[0]))
                        throw new Error('padding.encode input should be array of strings');
                      for (let e of r)
                        if ('string' != typeof e)
                          throw new Error(`padding.decode: non-string input=${e}`);
                      let n = r.length;
                      if ((n * e) % 8)
                        throw new Error(
                          'Invalid padding: string should have whole number of bytes'
                        );
                      for (; n > 0 && r[n - 1] === t; n--)
                        if (!(((n - 1) * e) % 8))
                          throw new Error('Invalid padding: string has too much padding');
                      return r.slice(0, n);
                    },
                  };
                }
                function u(e) {
                  if ('function' != typeof e) throw new Error('normalize fn should be function');
                  return { encode: e => e, decode: t => e(t) };
                }
                function d(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
                  if (!e.length) return [];
                  let s = 0;
                  const i = [],
                    a = Array.from(e);
                  for (
                    a.forEach(e => {
                      if ((n(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
                    });
                    ;

                  ) {
                    let e = 0,
                      n = !0;
                    for (let i = s; i < a.length; i++) {
                      const o = a[i],
                        c = t * e + o;
                      if (!Number.isSafeInteger(c) || (t * e) / t !== e || c - o != t * e)
                        throw new Error('convertRadix: carry overflow');
                      e = c % r;
                      const u = Math.floor(c / r);
                      if (((a[i] = u), !Number.isSafeInteger(u) || u * r + e !== c))
                        throw new Error('convertRadix: carry overflow');
                      n && (u ? (n = !1) : (s = i));
                    }
                    if ((i.push(e), n)) break;
                  }
                  for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) i.push(0);
                  return i.reverse();
                }
                /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.bytes =
                    r.stringToBytes =
                    r.str =
                    r.bytesToString =
                    r.hex =
                    r.utf8 =
                    r.bech32m =
                    r.bech32 =
                    r.base58check =
                    r.createBase58check =
                    r.base58xmr =
                    r.base58xrp =
                    r.base58flickr =
                    r.base58 =
                    r.base64urlnopad =
                    r.base64url =
                    r.base64nopad =
                    r.base64 =
                    r.base32crockford =
                    r.base32hexnopad =
                    r.base32hex =
                    r.base32nopad =
                    r.base32 =
                    r.base16 =
                    r.utils =
                      void 0),
                  (r.assertNumber = n);
                const l = (e, t) => (t ? l(t, e % t) : e),
                  f = (e, t) => e + (t - l(e, t));
                function h(e, t, r, s) {
                  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
                  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (f(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${f(t, r)}`
                    );
                  let i = 0,
                    a = 0;
                  const o = 2 ** r - 1,
                    c = [];
                  for (const s of e) {
                    if ((n(s), s >= 2 ** t))
                      throw new Error(`convertRadix2: invalid data word=${s} from=${t}`);
                    if (((i = (i << t) | s), a + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${a} from=${t}`);
                    for (a += t; a >= r; a -= r) c.push(((i >> (a - r)) & o) >>> 0);
                    i &= 2 ** a - 1;
                  }
                  if (((i = (i << (r - a)) & o), !s && a >= t)) throw new Error('Excess padding');
                  if (!s && i) throw new Error(`Non-zero padding: ${i}`);
                  return s && a > 0 && c.push(i >>> 0), c;
                }
                function p(e) {
                  return (
                    n(e),
                    {
                      encode: t => {
                        if (!s(t)) throw new Error('radix.encode input should be Uint8Array');
                        return d(Array.from(t), 256, e);
                      },
                      decode: t => {
                        if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                          throw new Error('radix.decode input should be array of numbers');
                        return Uint8Array.from(d(t, e, 256));
                      },
                    }
                  );
                }
                function m(e, t = !1) {
                  if ((n(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (f(8, e) > 32 || f(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!s(r)) throw new Error('radix2.encode input should be Uint8Array');
                      return h(Array.from(r), 8, e, !t);
                    },
                    decode: r => {
                      if (!Array.isArray(r) || (r.length && 'number' != typeof r[0]))
                        throw new Error('radix2.decode input should be array of numbers');
                      return Uint8Array.from(h(r, e, 8, t));
                    },
                  };
                }
                function g(e) {
                  if ('function' != typeof e)
                    throw new Error('unsafeWrapper fn should be function');
                  return function (...t) {
                    try {
                      return e.apply(null, t);
                    } catch (e) {}
                  };
                }
                function y(e, t) {
                  if ((n(e), 'function' != typeof t))
                    throw new Error('checksum fn should be function');
                  return {
                    encode(r) {
                      if (!s(r)) throw new Error('checksum.encode: input should be Uint8Array');
                      const n = t(r).slice(0, e),
                        i = new Uint8Array(r.length + e);
                      return i.set(r), i.set(n, r.length), i;
                    },
                    decode(r) {
                      if (!s(r)) throw new Error('checksum.decode: input should be Uint8Array');
                      const n = r.slice(0, -e),
                        i = t(n).slice(0, e),
                        a = r.slice(-e);
                      for (let t = 0; t < e; t++)
                        if (i[t] !== a[t]) throw new Error('Invalid checksum');
                      return n;
                    },
                  };
                }
                (r.utils = {
                  alphabet: a,
                  chain: i,
                  checksum: y,
                  convertRadix: d,
                  convertRadix2: h,
                  radix: p,
                  radix2: m,
                  join: o,
                  padding: c,
                }),
                  (r.base16 = i(m(4), a('0123456789ABCDEF'), o(''))),
                  (r.base32 = i(m(5), a('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), c(5), o(''))),
                  (r.base32nopad = i(m(5), a('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), o(''))),
                  (r.base32hex = i(m(5), a('0123456789ABCDEFGHIJKLMNOPQRSTUV'), c(5), o(''))),
                  (r.base32hexnopad = i(m(5), a('0123456789ABCDEFGHIJKLMNOPQRSTUV'), o(''))),
                  (r.base32crockford = i(
                    m(5),
                    a('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    o(''),
                    u(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  )),
                  (r.base64 = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    c(6),
                    o('')
                  )),
                  (r.base64nopad = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    o('')
                  )),
                  (r.base64url = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    c(6),
                    o('')
                  )),
                  (r.base64urlnopad = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    o('')
                  ));
                const b = e => i(p(58), a(e), o(''));
                (r.base58 = b('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')),
                  (r.base58flickr = b(
                    '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
                  )),
                  (r.base58xrp = b('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'));
                const w = [0, 2, 3, 5, 6, 7, 9, 10, 11];
                r.base58xmr = {
                  encode(e) {
                    let t = '';
                    for (let n = 0; n < e.length; n += 8) {
                      const s = e.subarray(n, n + 8);
                      t += r.base58.encode(s).padStart(w[s.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const s = e.slice(n, n + 11),
                        i = w.indexOf(s.length),
                        a = r.base58.decode(s);
                      for (let e = 0; e < a.length - i; e++)
                        if (0 !== a[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(a.slice(a.length - i)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  i(
                    y(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const v = i(a('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), o('')),
                  k = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function T(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < k.length; e++) 1 == ((t >> e) & 1) && (r ^= k[e]);
                  return r;
                }
                function E(e, t, r = 1) {
                  const n = e.length;
                  let s = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    s = T(s) ^ (r >> 5);
                  }
                  s = T(s);
                  for (let t = 0; t < n; t++) s = T(s) ^ (31 & e.charCodeAt(t));
                  for (let e of t) s = T(s) ^ e;
                  for (let e = 0; e < 6; e++) s = T(s);
                  return (s ^= r), v.encode(h([s % 2 ** 30], 30, 5, !1));
                }
                function A(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = m(5),
                    n = r.decode,
                    s = r.encode,
                    i = g(n);
                  function a(e, r, n = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.encode prefix should be string, not ' + typeof e);
                    if (
                      (r instanceof Uint8Array && (r = Array.from(r)),
                      !Array.isArray(r) || (r.length && 'number' != typeof r[0]))
                    )
                      throw new Error(
                        'bech32.encode words should be array of numbers, not ' + typeof r
                      );
                    if (0 === e.length) throw new TypeError(`Invalid prefix length ${e.length}`);
                    const s = e.length + 7 + r.length;
                    if (!1 !== n && s > n) throw new TypeError(`Length ${s} exceeds limit ${n}`);
                    const i = e.toLowerCase(),
                      a = E(i, r, t);
                    return `${i}1${v.encode(r)}${a}`;
                  }
                  function o(e, r = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.decode input should be string, not ' + typeof e);
                    if (e.length < 8 || (!1 !== r && e.length > r))
                      throw new TypeError(
                        `Wrong string length: ${e.length} (${e}). Expected (8..${r})`
                      );
                    const n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const s = n.lastIndexOf('1');
                    if (0 === s || -1 === s)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const i = n.slice(0, s),
                      a = n.slice(s + 1);
                    if (a.length < 6) throw new Error('Data must be at least 6 characters long');
                    const o = v.decode(a).slice(0, -6),
                      c = E(i, o, t);
                    if (!a.endsWith(c))
                      throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
                    return { prefix: i, words: o };
                  }
                  return {
                    encode: a,
                    decode: o,
                    encodeFromBytes: function (e, t) {
                      return a(e, s(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = o(e, !1);
                      return { prefix: t, words: r, bytes: n(r) };
                    },
                    decodeUnsafe: g(o),
                    fromWords: n,
                    fromWordsUnsafe: i,
                    toWords: s,
                  };
                }
                (r.bech32 = A('bech32')),
                  (r.bech32m = A('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  }),
                  (r.hex = i(
                    m(4),
                    a('0123456789abcdef'),
                    o(''),
                    u(e => {
                      if ('string' != typeof e || e.length % 2)
                        throw new TypeError(
                          `hex.decode: expected string, got ${typeof e} with length ${e.length}`
                        );
                      return e.toLowerCase();
                    })
                  ));
                const _ = {
                    utf8: r.utf8,
                    hex: r.hex,
                    base16: r.base16,
                    base32: r.base32,
                    base64: r.base64,
                    base64url: r.base64url,
                    base58: r.base58,
                    base58xmr: r.base58xmr,
                  },
                  x =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !_.hasOwnProperty(e)) throw new TypeError(x);
                  if (!s(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return _[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!_.hasOwnProperty(e)) throw new TypeError(x);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return _[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package: '@metamask/eth-ledger-bridge-keyring>@metamask/eth-sig-util>@scure/base',
        file: 'node_modules/@metamask/eth-ledger-bridge-keyring/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      175,
      { '../../../../shared/lib/trace': 5849 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.addPersonalMessage = async function ({
                    signatureParams: e,
                    signatureController: t,
                  }) {
                    return s(e, t, 'newUnsignedPersonalMessage');
                  }),
                  (r.addTypedMessage = async function ({
                    signatureParams: e,
                    signatureController: t,
                  }) {
                    return s(e, t, 'newUnsignedTypedMessage');
                  });
                var n = e('../../../../shared/lib/trace');
                async function s(e, t, r) {
                  const [, s] = e,
                    { id: i } = s,
                    a = null == i ? void 0 : i.toString();
                  (0, n.endTrace)({ name: n.TraceName.Middleware, id: a });
                  const o = await t[r](...e);
                  return (0, n.endTrace)({ name: n.TraceName.Signature, id: a }), o;
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/signature/util.ts' },
    ],
    [
      177,
      { './snap-keyring': 180, './utils': 181 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  Object.defineProperty(r, 'getAccountsBySnapId', {
                    enumerable: !0,
                    get: function () {
                      return s.getAccountsBySnapId;
                    },
                  }),
                  Object.defineProperty(r, 'snapKeyringBuilder', {
                    enumerable: !0,
                    get: function () {
                      return n.snapKeyringBuilder;
                    },
                  });
                var n = e('./snap-keyring'),
                  s = e('./utils');
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/index.ts' },
    ],
    [
      178,
      { '@metamask/keyring-api': 2014, '@metamask/permission-controller': 2421 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.isProtocolAllowed = d),
                  (r.keyringSnapPermissionsBuilder = function (e, t) {
                    return () => {
                      if ('metamask' === t) return a;
                      if (i.includes(t)) return c;
                      const r = e.getSubjectMetadata(t);
                      return (null == r ? void 0 : r.subjectType) === s.SubjectType.Website && d(t)
                        ? o
                        : [];
                    };
                  });
                var n = e('@metamask/keyring-api'),
                  s = e('@metamask/permission-controller');
                const i = [
                    'https://portfolio.metamask.io',
                    'https://dev.portfolio.metamask.io',
                    'https://stage.portfolio.metamask.io',
                    'https://ramps-dev.portfolio.metamask.io',
                    'https://portfolio-builds.metafi-dev.codefi.network',
                  ],
                  a = [
                    n.KeyringRpcMethod.ListAccounts,
                    n.KeyringRpcMethod.GetAccount,
                    n.KeyringRpcMethod.FilterAccountChains,
                    n.KeyringRpcMethod.DeleteAccount,
                    n.KeyringRpcMethod.ListRequests,
                    n.KeyringRpcMethod.GetRequest,
                    n.KeyringRpcMethod.SubmitRequest,
                    n.KeyringRpcMethod.RejectRequest,
                  ],
                  o = [
                    n.KeyringRpcMethod.ListAccounts,
                    n.KeyringRpcMethod.GetAccount,
                    n.KeyringRpcMethod.CreateAccount,
                    n.KeyringRpcMethod.FilterAccountChains,
                    n.KeyringRpcMethod.UpdateAccount,
                    n.KeyringRpcMethod.DeleteAccount,
                    n.KeyringRpcMethod.ExportAccount,
                    n.KeyringRpcMethod.ListRequests,
                    n.KeyringRpcMethod.GetRequest,
                    n.KeyringRpcMethod.ApproveRequest,
                    n.KeyringRpcMethod.RejectRequest,
                  ],
                  c = [
                    n.KeyringRpcMethod.ListAccounts,
                    n.KeyringRpcMethod.GetAccount,
                    n.KeyringRpcMethod.GetAccountBalances,
                    n.KeyringRpcMethod.SubmitRequest,
                  ],
                  u = ['https:', 'http:'];
                function d(e) {
                  try {
                    const t = new URL(e);
                    return u.includes(t.protocol);
                  } catch (e) {
                    return !1;
                  }
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/keyring-snaps-permissions.ts' },
    ],
    [
      179,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getSnapAndHardwareInfoForMetrics = async function (e, t, r, n) {
                    var s, i, a;
                    if (!n) return {};
                    const o = n.call('AccountsController:getSelectedAccount'),
                      c = o.address;
                    let u;
                    var d;
                    null !== (s = o.metadata.snap) &&
                      void 0 !== s &&
                      s.id &&
                      (u = n.call(
                        'SnapController:get',
                        null === (d = o.metadata.snap) || void 0 === d ? void 0 : d.id
                      ));
                    return {
                      account_type: await e(c),
                      device_model: await t(c),
                      account_hardware_type: await r(c),
                      account_snap_type: null === (i = u) || void 0 === i ? void 0 : i.id,
                      account_snap_version: null === (a = u) || void 0 === a ? void 0 : a.version,
                    };
                  });
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/metrics.ts' },
    ],
    [
      18,
      {
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/modules/environment': 5859,
        '@metamask/profile-sync-controller/user-storage': 2472,
        '@sentry/browser': 3136,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.UserStorageControllerInit = void 0);
                var n = e('@metamask/profile-sync-controller/user-storage'),
                  s = e('@sentry/browser'),
                  i = e('../../../../shared/modules/environment'),
                  a = e('../../../../shared/constants/metametrics');
                r.UserStorageControllerInit = e => {
                  const { controllerMessenger: t, persistedState: r, trackEvent: o } = e;
                  return {
                    controller: new n.Controller({
                      messenger: t,
                      state: r.UserStorageController,
                      config: {
                        accountSyncing: {
                          maxNumberOfAccountsToAdd: (0, i.isProduction)() ? undefined : 100,
                          onAccountAdded: e => {
                            o({
                              category: a.MetaMetricsEventCategory.ProfileSyncing,
                              event: a.MetaMetricsEventName.AccountsSyncAdded,
                              properties: { profile_id: e },
                            });
                          },
                          onAccountNameUpdated: e => {
                            o({
                              category: a.MetaMetricsEventCategory.ProfileSyncing,
                              event: a.MetaMetricsEventName.AccountsSyncNameUpdated,
                              properties: { profile_id: e },
                            });
                          },
                          onAccountSyncErroneousSituation: (e, t, r) => {
                            (0, s.captureException)(new Error(`Account sync - ${t}`), r),
                              o({
                                category: a.MetaMetricsEventCategory.ProfileSyncing,
                                event: a.MetaMetricsEventName.AccountsSyncErroneousSituation,
                                properties: { profile_id: e, situation_message: t },
                              });
                          },
                        },
                      },
                      env: { isAccountSyncingEnabled: !0 },
                    }),
                  };
                };
              };
            };
      },
      {
        package: '$root$',
        file: 'app/scripts/controller-init/identity/user-storage-controller-init.ts',
      },
    ],
    [
      180,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/lib/accounts': 5824,
        '../../../../shared/lib/accounts/snaps': 5826,
        '../../../../shared/lib/snaps/snaps': 5844,
        '../../../../ui/components/component-library/icon': 6401,
        '../../translate': 386,
        './utils/isBlockedUrl': 182,
        './utils/showResult': 183,
        '@metamask/eth-snap-keyring': 1819,
        '@metamask/snaps-utils': 2890,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.showAccountCreationDialog = k),
                  (r.showAccountNameSuggestionDialog = T),
                  (r.snapKeyringBuilder = function (e, t) {
                    const r = () => new s.SnapKeyring(e, new S(e, t));
                    return (r.type = s.SnapKeyring.type), r;
                  });
                var n,
                  s = e('@metamask/eth-snap-keyring'),
                  i = (n = e('webextension-polyfill')) && n.__esModule ? n : { default: n },
                  a = e('@metamask/snaps-utils'),
                  o = e('../../../../shared/constants/metametrics'),
                  c = e('../../../../shared/constants/app'),
                  u = e('../../translate'),
                  d = e('../../../../ui/components/component-library/icon'),
                  l = e('../../../../shared/lib/accounts'),
                  f = e('../../../../shared/lib/snaps/snaps'),
                  h = e('../../../../shared/lib/accounts/snaps'),
                  p = e('./utils/isBlockedUrl'),
                  m = e('./utils/showResult');
                function g(e, t, r) {
                  y(e, t), t.set(e, r);
                }
                function y(e, t) {
                  if (t.has(e))
                    throw new TypeError(
                      'Cannot initialize the same private elements twice on an object'
                    );
                }
                function b(e, t) {
                  return e.get(v(e, t));
                }
                function w(e, t, r) {
                  return e.set(v(e, t), r), r;
                }
                function v(e, t, r) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : r;
                  throw new TypeError('Private element is not present on this object');
                }
                async function k(e, t) {
                  try {
                    return Boolean(
                      await t.call(
                        'ApprovalController:addRequest',
                        {
                          origin: e,
                          type: c.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.confirmAccountCreation,
                        },
                        !0
                      )
                    );
                  } catch (e) {
                    throw new Error(`Error occurred while showing account creation dialog.\n${e}`);
                  }
                }
                async function T(e, t, r) {
                  try {
                    return await t.call(
                      'ApprovalController:addRequest',
                      {
                        origin: e,
                        type: c.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showNameSnapAccount,
                        requestData: { snapSuggestedAccountName: r },
                      },
                      !0
                    );
                  } catch (e) {
                    throw new Error(`Error occurred while showing name account dialog.\n${e}`);
                  }
                }
                var E = new WeakMap(),
                  A = new WeakMap(),
                  _ = new WeakMap(),
                  x = new WeakMap(),
                  P = new WeakSet();
                class S {
                  constructor(
                    e,
                    { trackEvent: t, persistKeyringHelper: r, removeAccountHelper: n }
                  ) {
                    !(function (e, t) {
                      y(e, t), t.add(e);
                    })(this, P),
                      g(this, E, void 0),
                      g(this, A, void 0),
                      g(this, _, void 0),
                      g(this, x, void 0),
                      w(E, this, e),
                      w(A, this, t),
                      w(_, this, r),
                      w(x, this, n);
                  }
                  async addressExists(e) {
                    return (await b(E, this).call('KeyringController:getAccounts')).includes(
                      e.toLowerCase()
                    );
                  }
                  async redirectUser(e, t, r) {
                    if (t.length > 0 || r.length > 0) {
                      const n = await (0, p.isBlockedUrl)(
                          t,
                          async () => await b(E, this).call('PhishingController:maybeUpdateState'),
                          e => b(E, this).call('PhishingController:testOrigin', e)
                        ),
                        s = await b(E, this).call(
                          'ApprovalController:addRequest',
                          {
                            origin: e,
                            requestData: { url: t, message: r, isBlockedUrl: n },
                            type: c.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.showSnapAccountRedirect,
                          },
                          !0
                        );
                      Boolean(s) && t.length > 0
                        ? i.default.tabs.create({ url: t })
                        : console.log('User refused snap account redirection to:', t);
                    } else
                      console.log(
                        'Error occurred when redirecting snap account. url or message must be defined'
                      );
                  }
                  async saveState() {
                    await b(_, this).call(this);
                  }
                  async addAccount(
                    e,
                    t,
                    r,
                    n,
                    i = '',
                    {
                      displayConfirmation: o,
                      displayAccountNameSuggestion: c,
                      setSelectedAccount: u,
                    } = (0, s.getDefaultInternalOptions)()
                  ) {
                    (0, a.assertIsValidSnapId)(t);
                    const d = (0, f.isSnapPreinstalled)(t) && !o,
                      l = (0, f.isSnapPreinstalled)(t) && !c,
                      h = (0, f.isSnapPreinstalled)(t) && !u,
                      { accountName: p } = await v(P, this, M).call(this, {
                        snapId: t,
                        skipConfirmationDialog: d,
                        skipAccountNameSuggestionDialog: l,
                        accountNameSuggestion: i,
                        handleUserInput: r,
                      });
                    v(P, this, C).call(this, {
                      address: e,
                      snapId: t,
                      skipConfirmationDialog: d,
                      skipSetSelectedAccountStep: h,
                      accountName: p,
                      onceSaved: n,
                    });
                  }
                  async removeAccount(e, t, r) {
                    (0, a.assertIsValidSnapId)(t);
                    const n = (0, h.getSnapName)(t, b(E, this)),
                      { id: s } = b(E, this).call('ApprovalController:startFlow'),
                      i =
                        'https://support.metamask.io/managing-my-wallet/accounts-and-addresses/how-to-remove-an-account-from-your-metamask-wallet/',
                      l = e => {
                        b(A, this).call(this, {
                          event: e,
                          category: o.MetaMetricsEventCategory.Accounts,
                          properties: {
                            account_type: o.MetaMetricsEventAccountType.Snap,
                            snap_id: t,
                            snap_name: n,
                          },
                        });
                      };
                    let f = !1;
                    try {
                      if (
                        ((f = Boolean(
                          await b(E, this).call(
                            'ApprovalController:addRequest',
                            {
                              origin: t,
                              type: c.SNAP_MANAGE_ACCOUNTS_CONFIRMATION_TYPES.confirmAccountRemoval,
                              requestData: { publicAddress: e },
                            },
                            !0
                          )
                        )),
                        !f)
                      )
                        throw (await r(f), new Error('User denied account removal'));
                      try {
                        await b(x, this).call(this, e),
                          await r(f),
                          await b(_, this).call(this),
                          l(o.MetaMetricsEventName.RemoveSnapAccountSuccessViewed),
                          await (0, m.showError)(
                            b(E, this),
                            t,
                            {
                              icon: d.IconName.UserCircleRemove,
                              title: (0, u.t)('snapAccountRemoved'),
                            },
                            { message: (0, u.t)('snapAccountRemovedDescription'), learnMoreLink: i }
                          ),
                          l(o.MetaMetricsEventName.RemoveSnapAccountSuccessClicked);
                      } catch (e) {
                        const r = e.message;
                        throw (
                          (await (0, m.showError)(
                            b(E, this),
                            t,
                            {
                              icon: d.IconName.UserCircleRemove,
                              title: (0, u.t)('snapAccountRemovalFailed'),
                            },
                            {
                              message: (0, u.t)('snapAccountRemovalFailedDescription', n),
                              learnMoreLink: i,
                              error: r,
                            }
                          ),
                          l(o.MetaMetricsEventName.AccountRemoveFailed),
                          new Error(`Error occurred while removing snap account: ${r}`))
                        );
                      }
                    } finally {
                      f && l(o.MetaMetricsEventName.AccountRemoved),
                        b(E, this).call('ApprovalController:endFlow', { id: s });
                    }
                  }
                }
                async function I(e) {
                  const { id: t } = b(E, this).call('ApprovalController:startFlow');
                  try {
                    return await e(t);
                  } finally {
                    b(E, this).call('ApprovalController:endFlow', { id: t });
                  }
                }
                async function B(e, t) {
                  const { success: r, name: n } = await T(e, b(E, this), t);
                  return { success: r, accountName: n };
                }
                async function j(e) {
                  const t = await b(E, this).call('AccountsController:listMultichainAccounts');
                  return { success: !0, accountName: (0, l.getUniqueAccountName)(t, e) };
                }
                async function M({
                  snapId: e,
                  skipConfirmationDialog: t,
                  skipAccountNameSuggestionDialog: r,
                  handleUserInput: n,
                  accountNameSuggestion: s,
                }) {
                  return await v(P, this, I).call(this, async i => {
                    {
                      const r = t || (await k(e, b(E, this)));
                      if (!r) throw (await n(r), new Error('User denied account creation'));
                    }
                    {
                      const { success: t, accountName: i } = r
                        ? await v(P, this, j).call(this, s)
                        : await v(P, this, B).call(this, e, s);
                      if ((await n(t), !t)) throw new Error('User denied account creation');
                      return { accountName: i };
                    }
                  });
                }
                async function C({
                  address: e,
                  snapId: t,
                  skipConfirmationDialog: r,
                  skipSetSelectedAccountStep: n,
                  accountName: s,
                  onceSaved: i,
                }) {
                  const a =
                      'https://support.metamask.io/managing-my-wallet/accounts-and-addresses/how-to-add-accounts-in-your-wallet/',
                    c = (0, h.getSnapName)(t, b(E, this)),
                    l = e => {
                      b(A, this).call(this, {
                        event: e,
                        category: o.MetaMetricsEventCategory.Accounts,
                        properties: {
                          account_type: o.MetaMetricsEventAccountType.Snap,
                          snap_id: t,
                          snap_name: c,
                        },
                      });
                    };
                  await v(P, this, I).call(this, async f => {
                    try {
                      const c = await i;
                      n || b(E, this).call('AccountsController:setSelectedAccount', c),
                        s && b(E, this).call('AccountsController:setAccountName', c, s),
                        r ||
                          (l(o.MetaMetricsEventName.AddSnapAccountSuccessViewed),
                          await (0, m.showSuccess)(
                            b(E, this),
                            t,
                            {
                              icon: d.IconName.UserCircleAdd,
                              title: (0, u.t)('snapAccountCreated'),
                            },
                            {
                              message: (0, u.t)('snapAccountCreatedDescription'),
                              address: e,
                              learnMoreLink: a,
                            }
                          ),
                          l(o.MetaMetricsEventName.AddSnapAccountSuccessClicked)),
                        l(o.MetaMetricsEventName.AccountAdded);
                    } catch (e) {
                      const r = e.message;
                      await (0, m.showError)(
                        b(E, this),
                        t,
                        {
                          icon: d.IconName.UserCircleAdd,
                          title: (0, u.t)('snapAccountCreationFailed'),
                        },
                        {
                          message: (0, u.t)('snapAccountCreationFailedDescription', c),
                          learnMoreLink: a,
                          error: r,
                        }
                      ),
                        console.error('Error occurred while creating snap account:', r);
                    }
                  });
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/snap-keyring.ts' },
    ],
    [
      181,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getAccountsBySnapId = void 0);
                r.getAccountsBySnapId = async (e, t) => {
                  const r = await e();
                  return await r.getAccountsBySnapId(t);
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/utils.ts' },
    ],
    [
      1813,
      { './util.cjs': 1825 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.CaseInsensitiveMap = void 0);
                const n = e('./util.cjs');
                class s extends Map {
                  static fromObject(e) {
                    return new s(Object.entries(e));
                  }
                  toObject() {
                    return Object.fromEntries(this.entries());
                  }
                  get(e) {
                    return super.get(e.toLowerCase());
                  }
                  getOrThrow(e, t = 'Key') {
                    return this.get(e) ?? (0, n.throwError)(`${t} '${e}' not found`);
                  }
                  has(e) {
                    return super.has(e.toLowerCase());
                  }
                  set(e, t) {
                    return super.set(e.toLowerCase(), t);
                  }
                  delete(e) {
                    return super.delete(e.toLowerCase());
                  }
                }
                r.CaseInsensitiveMap = s;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/CaseInsensitiveMap.cjs',
      },
    ],
    [
      1814,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.DeferredPromise = void 0);
                r.DeferredPromise = class {
                  constructor() {
                    if (
                      ((this.resolve = undefined),
                      (this.reject = undefined),
                      (this.promise = new Promise((e, t) => {
                        (this.resolve = e), (this.reject = t);
                      })),
                      !this.resolve || !this.reject)
                    )
                      throw new Error('Promise constructor failed');
                  }
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/DeferredPromise.cjs',
      },
    ],
    [
      1815,
      { './CaseInsensitiveMap.cjs': 1813 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n,
                  s =
                    (this && this.__classPrivateFieldSet) ||
                    function (e, t, r, n, s) {
                      if ('m' === n) throw new TypeError('Private method is not writable');
                      if ('a' === n && !s)
                        throw new TypeError('Private accessor was defined without a setter');
                      if ('function' == typeof t ? e !== t || !s : !t.has(e))
                        throw new TypeError(
                          'Cannot write private member to an object whose class did not declare it'
                        );
                      return 'a' === n ? s.call(e, r) : s ? (s.value = r) : t.set(e, r), r;
                    },
                  i =
                    (this && this.__classPrivateFieldGet) ||
                    function (e, t, r, n) {
                      if ('a' === r && !n)
                        throw new TypeError('Private accessor was defined without a getter');
                      if ('function' == typeof t ? e !== t || !n : !t.has(e))
                        throw new TypeError(
                          'Cannot read private member from an object whose class did not declare it'
                        );
                      return 'm' === r ? n : 'a' === r ? n.call(e) : n ? n.value : t.get(e);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.SnapIdMap = r.InvalidSnapIdError = void 0);
                const a = e('./CaseInsensitiveMap.cjs');
                class o extends Error {
                  constructor(e, t) {
                    super(`Snap "${e}" is not allowed to set "${t}"`),
                      (this.name = 'InvalidSnapIdError'),
                      (this.snapId = e),
                      (this.key = t);
                  }
                }
                r.InvalidSnapIdError = o;
                class c {
                  constructor(e) {
                    n.set(this, void 0), s(this, n, new a.CaseInsensitiveMap(e), 'f');
                  }
                  toObject() {
                    return i(this, n, 'f').toObject();
                  }
                  static fromObject(e) {
                    return new c(Object.entries(e));
                  }
                  get(e, t) {
                    const r = i(this, n, 'f').get(t);
                    return r?.snapId === e ? r : undefined;
                  }
                  pop(e, t) {
                    const r = this.get(e, t);
                    return this.delete(e, t), r;
                  }
                  has(e, t) {
                    return this.get(e, t) !== undefined;
                  }
                  hasSnapId(e) {
                    return [...i(this, n, 'f').values()].some(t => t.snapId === e);
                  }
                  delete(e, t) {
                    return this.has(e, t) && i(this, n, 'f').delete(t);
                  }
                  set(e, t) {
                    if (i(this, n, 'f').has(e) && !this.has(t.snapId, e)) throw new o(t.snapId, e);
                    return i(this, n, 'f').set(e, t), this;
                  }
                  values() {
                    return i(this, n, 'f').values();
                  }
                  get size() {
                    return i(this, n, 'f').size;
                  }
                }
                (r.SnapIdMap = c), (n = new WeakMap());
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/SnapIdMap.cjs',
      },
    ],
    [
      1816,
      {
        './DeferredPromise.cjs': 1814,
        './SnapIdMap.cjs': 1815,
        './account.cjs': 1817,
        './events.cjs': 1818,
        './logger.cjs': 1820,
        './migrations/index.cjs': 1821,
        './options.cjs': 1823,
        './types.cjs': 1824,
        './util.cjs': 1825,
        '@ethereumjs/tx': 462,
        '@metamask/eth-sig-util': 1862,
        '@metamask/keyring-api': 2014,
        '@metamask/keyring-internal-snap-client': 2065,
        '@metamask/keyring-utils': 2088,
        '@metamask/superstruct': 2913,
        '@metamask/utils': 2995,
        events: 4465,
        uuid: 1868,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n,
                  s,
                  i,
                  a,
                  o,
                  c,
                  u,
                  d,
                  l,
                  f,
                  h,
                  p,
                  m,
                  g,
                  y,
                  b,
                  w,
                  v,
                  k,
                  T,
                  E,
                  A,
                  _,
                  x,
                  P,
                  S,
                  I,
                  B,
                  j,
                  M,
                  C,
                  O,
                  R =
                    (this && this.__classPrivateFieldSet) ||
                    function (e, t, r, n, s) {
                      if ('m' === n) throw new TypeError('Private method is not writable');
                      if ('a' === n && !s)
                        throw new TypeError('Private accessor was defined without a setter');
                      if ('function' == typeof t ? e !== t || !s : !t.has(e))
                        throw new TypeError(
                          'Cannot write private member to an object whose class did not declare it'
                        );
                      return 'a' === n ? s.call(e, r) : s ? (s.value = r) : t.set(e, r), r;
                    },
                  N =
                    (this && this.__classPrivateFieldGet) ||
                    function (e, t, r, n) {
                      if ('a' === r && !n)
                        throw new TypeError('Private accessor was defined without a getter');
                      if ('function' == typeof t ? e !== t || !n : !t.has(e))
                        throw new TypeError(
                          'Cannot read private member from an object whose class did not declare it'
                        );
                      return 'm' === r ? n : 'a' === r ? n.call(e) : n ? n.value : t.get(e);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.SnapKeyring = r.SNAP_KEYRING_TYPE = void 0);
                const D = e('@ethereumjs/tx'),
                  $ = e('@metamask/eth-sig-util'),
                  L = e('@metamask/keyring-api'),
                  U = e('@metamask/keyring-internal-snap-client'),
                  H = e('@metamask/keyring-utils'),
                  K = e('@metamask/superstruct'),
                  z = e('@metamask/utils'),
                  F = e('events'),
                  V = e('uuid'),
                  W = e('./account.cjs'),
                  G = e('./DeferredPromise.cjs'),
                  q = e('./events.cjs'),
                  Y = e('./logger.cjs'),
                  J = e('./migrations/index.cjs'),
                  X = e('./options.cjs'),
                  Z = e('./SnapIdMap.cjs'),
                  Q = e('./types.cjs'),
                  ee = e('./util.cjs');
                function te(e) {
                  return (0, L.isEvmAccountType)(e.type) ? e.address.toLowerCase() : e.address;
                }
                r.SNAP_KEYRING_TYPE = 'Snap Keyring';
                class re extends F.EventEmitter {
                  constructor(e, t) {
                    super(),
                      n.add(this),
                      s.set(this, void 0),
                      i.set(this, void 0),
                      a.set(this, void 0),
                      o.set(this, void 0),
                      c.set(this, void 0),
                      u.set(this, void 0),
                      (this.type = re.type),
                      R(this, s, e, 'f'),
                      R(this, i, new U.KeyringInternalSnapClient({ messenger: e }), 'f'),
                      R(this, o, new Z.SnapIdMap(), 'f'),
                      R(this, a, new Z.SnapIdMap(), 'f'),
                      R(this, c, new Z.SnapIdMap(), 'f'),
                      R(this, u, t, 'f');
                  }
                  async handleKeyringSnapMessage(e, t) {
                    switch (((0, K.assert)(t, Q.SnapMessageStruct), t.method)) {
                      case `${L.KeyringEvent.AccountCreated}`:
                        return N(this, n, 'm', l).call(this, e, t);
                      case `${L.KeyringEvent.AccountUpdated}`:
                        return N(this, n, 'm', f).call(this, e, t);
                      case `${L.KeyringEvent.AccountDeleted}`:
                        return N(this, n, 'm', h).call(this, e, t);
                      case `${L.KeyringEvent.RequestApproved}`:
                        return N(this, n, 'm', p).call(this, e, t);
                      case `${L.KeyringEvent.RequestRejected}`:
                        return N(this, n, 'm', m).call(this, e, t);
                      case `${L.KeyringEvent.AccountBalancesUpdated}`:
                        return N(this, n, 'm', y).call(this, e, t);
                      case `${L.KeyringEvent.AccountAssetListUpdated}`:
                        return N(this, n, 'm', b).call(this, e, t);
                      case `${L.KeyringEvent.AccountTransactionsUpdated}`:
                        return N(this, n, 'm', w).call(this, e, t);
                      default:
                        throw new Error(`Method not supported: ${t.method}`);
                    }
                  }
                  async serialize() {
                    return { accounts: N(this, a, 'f').toObject() };
                  }
                  async deserialize(e) {
                    if (e === undefined) return;
                    const t = {};
                    for (const [r, n] of Object.entries(e.accounts))
                      (0, J.isAccountV1)(n.account)
                        ? (console.info(
                            `SnapKeyring - Found a KeyringAccountV1, migrating to V2: ${n.account.id}`
                          ),
                          (t[r] = { ...n, account: (0, J.migrateAccountV1)(n.account) }))
                        : (t[r] = n);
                    R(this, a, Z.SnapIdMap.fromObject(t), 'f');
                  }
                  async getAccounts() {
                    return (0, ee.unique)(
                      [...N(this, a, 'f').values()].map(({ account: e }) => te(e))
                    );
                  }
                  async getAccountsBySnapId(e) {
                    return (0, ee.unique)(
                      [...N(this, a, 'f').values()]
                        .filter(({ snapId: t }) => t === e)
                        .map(({ account: e }) => te(e))
                    );
                  }
                  async createAccount(e, t, r) {
                    const n = new U.KeyringInternalSnapClient({
                        messenger: N(this, s, 'f'),
                        snapId: e,
                      }),
                      i = 'metamask';
                    if ((0, z.hasProperty)(t, i))
                      throw new Error(`The '${i}' property is reserved for internal use`);
                    if (!r) return await n.createAccount(t);
                    const a = (0, V.v4)();
                    return (
                      N(this, c, 'f').set(a, { snapId: e, options: r }),
                      await n.createAccount({ ...t, metamask: { correlationId: a } })
                    );
                  }
                  hasSnapId(e) {
                    return N(this, a, 'f').hasSnapId(e);
                  }
                  async resolveAccountAddress(e, t, r) {
                    if (!this.hasSnapId(e))
                      throw new Error(`Unable to resolve account address: unknown Snap ID: ${e}`);
                    return await N(this, i, 'f').withSnapId(e).resolveAccountAddress(t, r);
                  }
                  async submitRequest({ account: e, method: t, params: r, scope: s }) {
                    const { account: i, snapId: a } = N(this, n, 'm', v).call(this, e);
                    return await N(this, n, 'm', T).call(this, {
                      snapId: a,
                      account: i,
                      method: t,
                      params: r,
                      scope: s,
                      noPending: !0,
                    });
                  }
                  async signTransaction(e, t, r = {}) {
                    const s = t.common.chainId(),
                      i = (0, ee.toJson)({
                        ...t.toJSON(),
                        from: e,
                        type: `0x${t.type.toString(16)}`,
                        chainId: (0, z.bigIntToHex)(s),
                      }),
                      a = await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: L.EthMethod.SignTransaction,
                        params: [i],
                        scope: (0, z.toCaipChainId)(z.KnownCaipNamespace.Eip155, `${s}`),
                      }),
                      o = (0, K.mask)(
                        a,
                        (0, K.object)({
                          r: (0, K.string)(),
                          s: (0, K.string)(),
                          v: (0, K.string)(),
                        })
                      );
                    return D.TransactionFactory.fromTxData({ ...i, r: o.r, s: o.s, v: o.v });
                  }
                  async signTypedData(e, t, r = { version: $.SignTypedDataVersion.V1 }) {
                    const s =
                        {
                          [$.SignTypedDataVersion.V1]: L.EthMethod.SignTypedDataV1,
                          [$.SignTypedDataVersion.V3]: L.EthMethod.SignTypedDataV3,
                          [$.SignTypedDataVersion.V4]: L.EthMethod.SignTypedDataV4,
                        }[r.version] || L.EthMethod.SignTypedDataV1,
                      i = t.domain?.chainId;
                    return (0, H.strictMask)(
                      await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: s,
                        params: (0, ee.toJson)([e, t]),
                        ...(i === undefined
                          ? {}
                          : { scope: (0, z.toCaipChainId)(z.KnownCaipNamespace.Eip155, `${i}`) }),
                      }),
                      L.EthBytesStruct
                    );
                  }
                  async signMessage(e, t) {
                    return (0, H.strictMask)(
                      await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: L.EthMethod.Sign,
                        params: (0, ee.toJson)([e, t]),
                      }),
                      L.EthBytesStruct
                    );
                  }
                  async signPersonalMessage(e, t) {
                    return (0, H.strictMask)(
                      await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: L.EthMethod.PersonalSign,
                        params: (0, ee.toJson)([t, e]),
                      }),
                      L.EthBytesStruct
                    );
                  }
                  async prepareUserOperation(e, t, r) {
                    return (0, H.strictMask)(
                      await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: L.EthMethod.PrepareUserOperation,
                        params: (0, ee.toJson)(t),
                        noPending: !0,
                        scope: (0, z.toCaipChainId)(z.KnownCaipNamespace.Eip155, r.chainId),
                      }),
                      L.EthBaseUserOperationStruct
                    );
                  }
                  async patchUserOperation(e, t, r) {
                    return (0, H.strictMask)(
                      await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: L.EthMethod.PatchUserOperation,
                        params: (0, ee.toJson)([t]),
                        noPending: !0,
                        scope: (0, z.toCaipChainId)(z.KnownCaipNamespace.Eip155, r.chainId),
                      }),
                      L.EthUserOperationPatchStruct
                    );
                  }
                  async signUserOperation(e, t, r) {
                    return (0, H.strictMask)(
                      await N(this, n, 'm', k).call(this, {
                        address: e,
                        method: L.EthMethod.SignUserOperation,
                        params: (0, ee.toJson)([t]),
                        scope: (0, z.toCaipChainId)(z.KnownCaipNamespace.Eip155, r.chainId),
                      }),
                      L.EthBytesStruct
                    );
                  }
                  exportAccount(e) {
                    throw new Error('Exporting accounts from snaps is not supported.');
                  }
                  async removeAccount(e) {
                    const { account: t, snapId: r } = N(this, n, 'm', j).call(this, e);
                    await N(this, n, 'm', B).call(this, r, t);
                  }
                  getAccountByAddress(e) {
                    return this.listAccounts().find(({ address: t }) =>
                      (0, ee.equalsIgnoreCase)(t, e)
                    );
                  }
                  listAccounts() {
                    return [...N(this, a, 'f').values()].map(({ account: e, snapId: t }) => {
                      const r = N(this, n, 'm', C).call(this, t);
                      return {
                        ...e,
                        address: te(e),
                        metadata: {
                          name: '',
                          importTime: 0,
                          keyring: { type: this.type },
                          ...(r !== undefined && { snap: r }),
                        },
                      };
                    });
                  }
                }
                (r.SnapKeyring = re),
                  (s = new WeakMap()),
                  (i = new WeakMap()),
                  (a = new WeakMap()),
                  (o = new WeakMap()),
                  (c = new WeakMap()),
                  (u = new WeakMap()),
                  (n = new WeakSet()),
                  (d = function (e, t) {
                    if (t) {
                      const r = N(this, c, 'f').pop(e, t);
                      if (r) return r.options;
                      console.warn(`SnapKeyring - Received unmapped correlation ID: "${t}"`);
                    }
                    return undefined;
                  }),
                  (l = async function (e, t) {
                    (0, K.assert)(t, q.AccountCreatedEventStruct);
                    const {
                        metamask: r,
                        account: s,
                        accountNameSuggestion: i,
                        displayAccountNameSuggestion: o,
                        displayConfirmation: c,
                      } = t.params,
                      l = (0, W.transformAccount)(s),
                      f = te(l);
                    if (await N(this, u, 'f').addressExists(f))
                      throw new Error(`Account address '${f}' already exists`);
                    if (N(this, a, 'f').has(e, l.id))
                      throw new Error(`Account '${l.id}' already exists`);
                    const h = new G.DeferredPromise();
                    return (
                      await N(this, u, 'f').addAccount(
                        f,
                        e,
                        async t => {
                          t &&
                            (N(this, a, 'f').set(l.id, { account: l, snapId: e }),
                            N(this, u, 'f')
                              .saveState()
                              .then(() => {
                                h.resolve(l.id);
                              })
                              .catch(async t => {
                                await N(this, n, 'm', B).call(this, e, l), h.reject(t);
                              }));
                        },
                        h.promise,
                        i,
                        (0, X.getInternalOptionsOf)([
                          N(this, n, 'm', d).call(this, e, r?.correlationId) ?? {},
                          { displayConfirmation: c, displayAccountNameSuggestion: o },
                        ])
                      ),
                      null
                    );
                  }),
                  (f = async function (e, t) {
                    (0, K.assert)(t, q.AccountUpdatedEventStruct);
                    const { account: r } = t.params,
                      { account: n } =
                        N(this, a, 'f').get(e, r.id) ??
                        (0, ee.throwError)(`Account '${r.id}' not found`),
                      s = (0, W.transformAccount)(r);
                    if (!(0, ee.equalsIgnoreCase)(n.address, s.address))
                      throw new Error(`Cannot change address of account '${s.id}'`);
                    return (
                      N(this, a, 'f').set(s.id, { account: s, snapId: e }),
                      await N(this, u, 'f').saveState(),
                      null
                    );
                  }),
                  (h = async function (e, t) {
                    (0, K.assert)(t, q.AccountDeletedEventStruct);
                    const { id: r } = t.params,
                      n = N(this, a, 'f').get(e, r);
                    if (n === undefined) return null;
                    const { account: s } = n;
                    return (
                      await N(this, u, 'f').removeAccount(te(s), e, async e => {
                        e && (await N(this, u, 'f').saveState());
                      }),
                      null
                    );
                  }),
                  (p = async function (e, t) {
                    (0, K.assert)(t, q.RequestApprovedEventStruct);
                    const { id: r, result: n } = t.params,
                      { promise: s } =
                        N(this, o, 'f').get(e, r) ?? (0, ee.throwError)(`Request '${r}' not found`);
                    return N(this, o, 'f').delete(e, r), s.resolve(n), null;
                  }),
                  (m = async function (e, t) {
                    (0, K.assert)(t, q.RequestRejectedEventStruct);
                    const { id: r } = t.params,
                      { promise: n } =
                        N(this, o, 'f').get(e, r) ?? (0, ee.throwError)(`Request '${r}' not found`);
                    return (
                      N(this, o, 'f').delete(e, r),
                      n.reject(new Error('Request rejected by user or snap.')),
                      null
                    );
                  }),
                  (g = async function (e, t, r) {
                    return (
                      N(this, s, 'f').publish(
                        t,
                        ...r(r =>
                          Object.entries(r).reduce(
                            (r, [n, s]) => (
                              N(this, a, 'f').has(e, n)
                                ? (r[n] = s)
                                : console.warn(
                                    `SnapKeyring - ${t} - Found an unknown account ID "${n}" for Snap ID "${e}". Skipping.`
                                  ),
                              r
                            ),
                            {}
                          )
                        )
                      ),
                      null
                    );
                  }),
                  (y = async function (e, t) {
                    (0, K.assert)(t, L.AccountBalancesUpdatedEventStruct);
                    const r = t.params;
                    return N(this, n, 'm', g).call(
                      this,
                      e,
                      'SnapKeyring:accountBalancesUpdated',
                      e => ((r.balances = e(r.balances)), [r])
                    );
                  }),
                  (b = async function (e, t) {
                    (0, K.assert)(t, L.AccountAssetListUpdatedEventStruct);
                    const r = t.params;
                    return N(this, n, 'm', g).call(
                      this,
                      e,
                      'SnapKeyring:accountAssetListUpdated',
                      e => ((r.assets = e(r.assets)), [r])
                    );
                  }),
                  (w = async function (e, t) {
                    (0, K.assert)(t, L.AccountTransactionsUpdatedEventStruct);
                    const r = t.params;
                    return N(this, n, 'm', g).call(
                      this,
                      e,
                      'SnapKeyring:accountTransactionsUpdated',
                      e => ((r.transactions = e(r.transactions)), [r])
                    );
                  }),
                  (v = function (e) {
                    const t = [...N(this, a, 'f').values()].find(t => t.account.id === e);
                    if (!t) throw new Error(`Unable to get account: unknown account ID: '${e}'`);
                    return t;
                  }),
                  (k = async function ({
                    address: e,
                    method: t,
                    params: r,
                    scope: s = '',
                    noPending: i = !1,
                  }) {
                    const { account: a, snapId: o } = N(this, n, 'm', j).call(this, e);
                    return await N(this, n, 'm', T).call(this, {
                      snapId: o,
                      account: a,
                      method: t,
                      params: r,
                      scope: s,
                      noPending: i,
                    });
                  }),
                  (T = async function ({
                    snapId: e,
                    account: t,
                    method: r,
                    params: s,
                    scope: a,
                    noPending: o,
                  }) {
                    if (!N(this, n, 'm', E).call(this, t, r))
                      throw new Error(`Method '${r}' not supported for account ${t.address}`);
                    const c = (0, V.v4)(),
                      u = N(this, n, 'm', A).call(this, c, e);
                    try {
                      const d = {
                        id: c,
                        scope: a,
                        account: t.id,
                        request: { method: r, ...(s !== undefined && { params: s }) },
                      };
                      (0, Y.projectLogger)('Submit Snap request: ', d);
                      const l = await N(this, i, 'f').withSnapId(e).submitRequest(d);
                      if (o && l.pending)
                        throw new Error(
                          `Request '${c}' to Snap '${e}' is pending and noPending is true.`
                        );
                      return l.pending
                        ? ((l.redirect?.message || l.redirect?.url) &&
                            (await N(this, n, 'm', P).call(this, l.redirect, e)),
                          u.promise)
                        : N(this, n, 'm', x).call(this, l, c, e);
                    } catch (t) {
                      throw (
                        ((0, Y.projectLogger)('Snap Request failed: ', { requestId: c }),
                        N(this, n, 'm', _).call(this, c, e),
                        t)
                      );
                    }
                  }),
                  (E = function (e, t) {
                    return e.methods.includes(t);
                  }),
                  (A = function (e, t) {
                    const r = new G.DeferredPromise();
                    return N(this, o, 'f').set(e, { promise: r, snapId: t }), r;
                  }),
                  (_ = function (e, t) {
                    N(this, o, 'f').delete(t, e);
                  }),
                  (x = function (e, t, r) {
                    return N(this, o, 'f').delete(r, t), e.result;
                  }),
                  (P = async function (e, t) {
                    const { message: r = '', url: s = '' } = e,
                      i = N(this, n, 'm', S).call(this, s);
                    i && N(this, n, 'm', I).call(this, i, t),
                      await N(this, u, 'f').redirectUser(t, i, r);
                  }),
                  (S = function (e) {
                    return e ? (0, ee.sanitizeUrl)(e) : e;
                  }),
                  (I = function (e, t) {
                    const { origin: r } = new URL(e),
                      s = N(this, n, 'm', M).call(this, t);
                    if (!s) throw new Error(`Snap '${t}' not found.`);
                    if (!N(this, n, 'm', O).call(this, s).includes(r))
                      throw new Error(
                        `Redirect URL domain '${r}' is not an allowed origin by snap '${t}'`
                      );
                  }),
                  (B = async function (e, t) {
                    N(this, a, 'f').delete(e, t.id);
                    try {
                      await N(this, i, 'f').withSnapId(e).deleteAccount(t.id);
                    } catch (r) {
                      console.error(
                        `Account '${t.address}' may not have been removed from snap '${e}':`,
                        r
                      );
                    }
                  }),
                  (j = function (e) {
                    return (
                      [...N(this, a, 'f').values()].find(({ account: t }) =>
                        (0, ee.equalsIgnoreCase)(t.address, e)
                      ) ?? (0, ee.throwError)(`Account '${e}' not found`)
                    );
                  }),
                  (M = function (e) {
                    return N(this, s, 'f').call('SnapController:get', e);
                  }),
                  (C = function (e) {
                    const t = N(this, n, 'm', M).call(this, e);
                    return t
                      ? { id: e, name: t.manifest.proposedName, enabled: t.enabled }
                      : undefined;
                  }),
                  (O = function (e) {
                    return e.manifest.initialPermissions['endowment:keyring']?.allowedOrigins ?? [];
                  }),
                  (re.type = r.SNAP_KEYRING_TYPE);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/SnapKeyring.cjs',
      },
    ],
    [
      1817,
      {
        './migrations/index.cjs': 1821,
        '@metamask/keyring-api': 2014,
        '@metamask/superstruct': 2913,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.KeyringAccountV1Struct = void 0),
                  (r.assertKeyringAccount = a),
                  (r.transformAccount = function (e) {
                    return a((0, i.isAccountV1)(e) ? (0, i.transformAccountV1)(e) : e);
                  });
                const n = e('@metamask/keyring-api'),
                  s = e('@metamask/superstruct'),
                  i = e('./migrations/index.cjs');
                function a(e) {
                  switch (e.type) {
                    case n.BtcAccountType.P2wpkh:
                      return (0, s.assert)(e, n.BtcP2wpkhAccountStruct), e;
                    case n.SolAccountType.DataAccount:
                      return (0, s.assert)(e, n.SolDataAccountStruct), e;
                    case n.EthAccountType.Erc4337:
                      return (0, s.assert)(e, n.EthErc4337AccountStruct), e;
                    case n.EthAccountType.Eoa:
                      return (0, s.assert)(e, n.EthEoaAccountStruct), e;
                    default:
                      throw new Error(`Unknown account type: '${e.type}'`);
                  }
                }
                r.KeyringAccountV1Struct = (0, s.omit)(n.KeyringAccountStruct, ['scopes']);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/account.cjs',
      },
    ],
    [
      1818,
      {
        './account.cjs': 1817,
        '@metamask/keyring-api': 2014,
        '@metamask/keyring-utils': 2088,
        '@metamask/superstruct': 2913,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.RequestRejectedEventStruct =
                    r.RequestApprovedEventStruct =
                    r.AccountDeletedEventStruct =
                    r.AccountUpdatedEventStruct =
                    r.AccountCreatedEventStruct =
                      void 0);
                const n = e('@metamask/keyring-api');
                Object.defineProperty(r, 'AccountDeletedEventStruct', {
                  enumerable: !0,
                  get: function () {
                    return n.AccountDeletedEventStruct;
                  },
                }),
                  Object.defineProperty(r, 'RequestApprovedEventStruct', {
                    enumerable: !0,
                    get: function () {
                      return n.RequestApprovedEventStruct;
                    },
                  }),
                  Object.defineProperty(r, 'RequestRejectedEventStruct', {
                    enumerable: !0,
                    get: function () {
                      return n.RequestRejectedEventStruct;
                    },
                  });
                const s = e('@metamask/keyring-utils'),
                  i = e('@metamask/superstruct'),
                  a = e('./account.cjs');
                (r.AccountCreatedEventStruct = (0, s.object)({
                  ...n.AccountCreatedEventStruct.schema,
                  params: (0, s.object)({
                    ...n.AccountCreatedEventStruct.schema.params.schema,
                    account: (0, i.union)([a.KeyringAccountV1Struct, n.KeyringAccountStruct]),
                  }),
                })),
                  (r.AccountUpdatedEventStruct = (0, s.object)({
                    ...n.AccountUpdatedEventStruct.schema,
                    params: (0, s.object)({
                      ...n.AccountUpdatedEventStruct.schema.params.schema,
                      account: (0, i.union)([a.KeyringAccountV1Struct, n.KeyringAccountStruct]),
                    }),
                  }));
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/events.cjs',
      },
    ],
    [
      1819,
      { './SnapKeyring.cjs': 1816, './options.cjs': 1823, './types.cjs': 1824 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  s(e('./options.cjs'), r),
                  s(e('./types.cjs'), r),
                  s(e('./SnapKeyring.cjs'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/index.cjs',
      },
    ],
    [
      182,
      { '../keyring-snaps-permissions': 178 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.isBlockedUrl = void 0);
                var n = e('../keyring-snaps-permissions');
                r.isBlockedUrl = async (e, t, r) => {
                  try {
                    return !(0, n.isProtocolAllowed)(e) || (await t(), r(e).result);
                  } catch (e) {
                    return console.error('Invalid URL passed into snap-keyring:', e), !1;
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/utils/isBlockedUrl.ts' },
    ],
    [
      1820,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.createModuleLogger = r.projectLogger = void 0);
                const n = e('@metamask/utils');
                Object.defineProperty(r, 'createModuleLogger', {
                  enumerable: !0,
                  get: function () {
                    return n.createModuleLogger;
                  },
                }),
                  (r.projectLogger = (0, n.createProjectLogger)('eth-snap-keyring'));
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/logger.cjs',
      },
    ],
    [
      1821,
      { './v1.cjs': 1822 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), s(e('./v1.cjs'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/migrations/index.cjs',
      },
    ],
    [
      1822,
      {
        '../account.cjs': 1817,
        '@metamask/keyring-api': 2014,
        '@metamask/keyring-utils': 2088,
        '@metamask/superstruct': 2913,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.isAccountV1 = o),
                  (r.getScopesForAccountV1 = c),
                  (r.transformAccountV1 = function (e) {
                    const { type: t } = e;
                    if (t === n.EthAccountType.Eoa) return { ...e, scopes: c(e) };
                    return (0, a.assertKeyringAccount)(e);
                  }),
                  (r.migrateAccountV1 = function (e) {
                    if (!o(e)) return e;
                    return { ...e, scopes: c(e) };
                  });
                const n = e('@metamask/keyring-api'),
                  s = e('@metamask/keyring-utils'),
                  i = e('@metamask/superstruct'),
                  a = e('../account.cjs');
                function o(e) {
                  return (0, i.is)(e, a.KeyringAccountV1Struct);
                }
                function c(e) {
                  switch (e.type) {
                    case n.EthAccountType.Eoa:
                      return [n.EthScope.Eoa];
                    case n.EthAccountType.Erc4337:
                      return [n.EthScope.Testnet];
                    case n.BtcAccountType.P2wpkh:
                      return [
                        (0, s.isBtcMainnetAddress)(e.address)
                          ? n.BtcScope.Mainnet
                          : n.BtcScope.Testnet,
                      ];
                    case n.SolAccountType.DataAccount:
                      return [n.SolScope.Mainnet, n.SolScope.Testnet, n.SolScope.Devnet];
                    default:
                      return [n.EthScope.Eoa];
                  }
                }
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/migrations/v1.cjs',
      },
    ],
    [
      1823,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n() {
                  return {
                    displayAccountNameSuggestion: !0,
                    displayConfirmation: !0,
                    setSelectedAccount: !0,
                  };
                }
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getDefaultInternalOptions = n),
                  (r.getInternalOptionsOf = function (e) {
                    const t = {},
                      r = {
                        displayAccountNameSuggestion: !0,
                        displayConfirmation: !0,
                        setSelectedAccount: !0,
                      },
                      n = Object.keys(r);
                    for (const s of n) {
                      t[s] = undefined;
                      for (const n of [...e, r])
                        n[s] !== undefined && t[s] === undefined && (t[s] = n[s]);
                    }
                    return t;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/options.cjs',
      },
    ],
    [
      1824,
      { '@metamask/superstruct': 2913, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.SnapMessageStruct = void 0);
                const n = e('@metamask/superstruct'),
                  s = e('@metamask/utils');
                r.SnapMessageStruct = (0, n.object)({
                  method: (0, n.string)(),
                  params: (0, n.optional)(
                    (0, n.union)([
                      (0, n.array)(s.JsonStruct),
                      (0, n.record)((0, n.string)(), s.JsonStruct),
                    ])
                  ),
                });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/types.cjs',
      },
    ],
    [
      1825,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.unique = function (e) {
                    return [...new Set(e)];
                  }),
                  (r.toJson = function (e) {
                    return JSON.parse(JSON.stringify(e));
                  }),
                  (r.ensureDefined = function (e) {
                    if (e === undefined) throw new Error('Argument is undefined');
                  }),
                  (r.throwError = function (e) {
                    throw new Error(e);
                  }),
                  (r.equalsIgnoreCase = function (e, t) {
                    return e.toLowerCase() === t.toLowerCase();
                  }),
                  (r.sanitizeUrl = function (e) {
                    return new URL(e).toString();
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring',
        file: 'node_modules/@metamask/eth-snap-keyring/dist/util.cjs',
      },
    ],
    [
      1826,
      {
        './bytes': 1829,
        './constants': 1830,
        './helpers': 1832,
        './internal': 1834,
        '@ethereumjs/rlp': 449,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
        'ethereum-cryptography/secp256k1': 4383,
        'ethereum-cryptography/utils': 4385,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.accountBodyToRLP =
                        r.accountBodyToSlim =
                        r.accountBodyFromSlim =
                        r.isZeroAddress =
                        r.zeroAddress =
                        r.importPublic =
                        r.privateToAddress =
                        r.privateToPublic =
                        r.publicToAddress =
                        r.pubToAddress =
                        r.isValidPublic =
                        r.isValidPrivate =
                        r.generateAddress2 =
                        r.generateAddress =
                        r.isValidChecksumAddress =
                        r.toChecksumAddress =
                        r.isValidAddress =
                        r.Account =
                          void 0);
                    const n = e('@ethereumjs/rlp'),
                      s = e('ethereum-cryptography/keccak'),
                      i = e('ethereum-cryptography/secp256k1'),
                      a = e('ethereum-cryptography/utils'),
                      o = e('./bytes'),
                      c = e('./constants'),
                      u = e('./helpers'),
                      d = e('./internal'),
                      l = BigInt(0);
                    class f {
                      constructor(e = l, t = l, r = c.KECCAK256_RLP, n = c.KECCAK256_NULL) {
                        (this.nonce = e),
                          (this.balance = t),
                          (this.storageRoot = r),
                          (this.codeHash = n),
                          this._validate();
                      }
                      static fromAccountData(e) {
                        const { nonce: t, balance: r, storageRoot: n, codeHash: s } = e;
                        return new f(
                          t !== undefined ? (0, o.bufferToBigInt)((0, o.toBuffer)(t)) : undefined,
                          r !== undefined ? (0, o.bufferToBigInt)((0, o.toBuffer)(r)) : undefined,
                          n !== undefined ? (0, o.toBuffer)(n) : undefined,
                          s !== undefined ? (0, o.toBuffer)(s) : undefined
                        );
                      }
                      static fromRlpSerializedAccount(e) {
                        const t = (0, o.arrToBufArr)(n.RLP.decode(Uint8Array.from(e)));
                        if (!Array.isArray(t))
                          throw new Error('Invalid serialized account input. Must be array');
                        return this.fromValuesArray(t);
                      }
                      static fromValuesArray(e) {
                        const [t, r, n, s] = e;
                        return new f((0, o.bufferToBigInt)(t), (0, o.bufferToBigInt)(r), n, s);
                      }
                      _validate() {
                        if (this.nonce < l) throw new Error('nonce must be greater than zero');
                        if (this.balance < l) throw new Error('balance must be greater than zero');
                        if (32 !== this.storageRoot.length)
                          throw new Error('storageRoot must have a length of 32');
                        if (32 !== this.codeHash.length)
                          throw new Error('codeHash must have a length of 32');
                      }
                      raw() {
                        return [
                          (0, o.bigIntToUnpaddedBuffer)(this.nonce),
                          (0, o.bigIntToUnpaddedBuffer)(this.balance),
                          this.storageRoot,
                          this.codeHash,
                        ];
                      }
                      serialize() {
                        return t.from(n.RLP.encode((0, o.bufArrToArr)(this.raw())));
                      }
                      isContract() {
                        return !this.codeHash.equals(c.KECCAK256_NULL);
                      }
                      isEmpty() {
                        return (
                          this.balance === l &&
                          this.nonce === l &&
                          this.codeHash.equals(c.KECCAK256_NULL)
                        );
                      }
                    }
                    r.Account = f;
                    r.isValidAddress = function (e) {
                      try {
                        (0, u.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return /^0x[0-9a-fA-F]{40}$/.test(e);
                    };
                    r.toChecksumAddress = function (e, r) {
                      (0, u.assertIsHexString)(e);
                      const n = (0, d.stripHexPrefix)(e).toLowerCase();
                      let i = '';
                      if (r !== undefined) {
                        i = (0, o.bufferToBigInt)((0, o.toBuffer)(r)).toString() + '0x';
                      }
                      const c = t.from(i + n, 'utf8'),
                        l = (0, a.bytesToHex)((0, s.keccak256)(c));
                      let f = '0x';
                      for (let e = 0; e < n.length; e++)
                        parseInt(l[e], 16) >= 8 ? (f += n[e].toUpperCase()) : (f += n[e]);
                      return f;
                    };
                    r.isValidChecksumAddress = function (e, t) {
                      return (0, r.isValidAddress)(e) && (0, r.toChecksumAddress)(e, t) === e;
                    };
                    r.generateAddress = function (e, r) {
                      return (
                        (0, u.assertIsBuffer)(e),
                        (0, u.assertIsBuffer)(r),
                        (0, o.bufferToBigInt)(r) === BigInt(0)
                          ? t
                              .from((0, s.keccak256)(n.RLP.encode((0, o.bufArrToArr)([e, null]))))
                              .slice(-20)
                          : t
                              .from((0, s.keccak256)(n.RLP.encode((0, o.bufArrToArr)([e, r]))))
                              .slice(-20)
                      );
                    };
                    r.generateAddress2 = function (e, r, n) {
                      if (
                        ((0, u.assertIsBuffer)(e),
                        (0, u.assertIsBuffer)(r),
                        (0, u.assertIsBuffer)(n),
                        20 !== e.length)
                      )
                        throw new Error('Expected from to be of length 20');
                      if (32 !== r.length) throw new Error('Expected salt to be of length 32');
                      const i = (0, s.keccak256)(
                        t.concat([t.from('ff', 'hex'), e, r, (0, s.keccak256)(n)])
                      );
                      return (0, o.toBuffer)(i).slice(-20);
                    };
                    r.isValidPrivate = function (e) {
                      return i.secp256k1.utils.isValidPrivateKey(e);
                    };
                    r.isValidPublic = function (e, r = !1) {
                      if (((0, u.assertIsBuffer)(e), 64 === e.length))
                        try {
                          return (
                            i.secp256k1.ProjectivePoint.fromHex(t.concat([t.from([4]), e])), !0
                          );
                        } catch (e) {
                          return !1;
                        }
                      if (!r) return !1;
                      try {
                        return i.secp256k1.ProjectivePoint.fromHex(e), !0;
                      } catch (e) {
                        return !1;
                      }
                    };
                    (r.pubToAddress = function (e, r = !1) {
                      if (
                        ((0, u.assertIsBuffer)(e),
                        r &&
                          64 !== e.length &&
                          (e = t.from(
                            i.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        64 !== e.length)
                      )
                        throw new Error('Expected pubKey to be of length 64');
                      return t.from((0, s.keccak256)(e)).slice(-20);
                    }),
                      (r.publicToAddress = r.pubToAddress);
                    r.privateToPublic = function (e) {
                      return (
                        (0, u.assertIsBuffer)(e),
                        t.from(
                          i.secp256k1.ProjectivePoint.fromPrivateKey(e).toRawBytes(!1).slice(1)
                        )
                      );
                    };
                    r.privateToAddress = function (e) {
                      return (0, r.publicToAddress)((0, r.privateToPublic)(e));
                    };
                    r.importPublic = function (e) {
                      return (
                        (0, u.assertIsBuffer)(e),
                        64 !== e.length &&
                          (e = t.from(
                            i.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        e
                      );
                    };
                    r.zeroAddress = function () {
                      const e = (0, o.zeros)(20);
                      return (0, o.bufferToHex)(e);
                    };
                    function h(e) {
                      const [t, r, n, s] = e;
                      return [
                        t,
                        r,
                        0 === (0, o.arrToBufArr)(n).length ? c.KECCAK256_RLP : n,
                        0 === (0, o.arrToBufArr)(s).length ? c.KECCAK256_NULL : s,
                      ];
                    }
                    (r.isZeroAddress = function (e) {
                      try {
                        (0, u.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return (0, r.zeroAddress)() === e;
                    }),
                      (r.accountBodyFromSlim = h);
                    const p = new Uint8Array(0);
                    (r.accountBodyToSlim = function (e) {
                      const [t, r, n, s] = e;
                      return [
                        t,
                        r,
                        (0, o.arrToBufArr)(n).equals(c.KECCAK256_RLP) ? p : n,
                        (0, o.arrToBufArr)(s).equals(c.KECCAK256_NULL) ? p : s,
                      ];
                    }),
                      (r.accountBodyToRLP = function (e, t = !0) {
                        const r = t ? h(e) : e;
                        return (0, o.arrToBufArr)(n.RLP.encode(r));
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/account.js',
      },
    ],
    [
      1827,
      { './account': 1826, './bytes': 1829, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }), (r.Address = void 0);
                    const n = e('./account'),
                      s = e('./bytes');
                    class i {
                      constructor(e) {
                        if (20 !== e.length) throw new Error('Invalid address length');
                        this.buf = e;
                      }
                      static zero() {
                        return new i((0, s.zeros)(20));
                      }
                      static fromString(e) {
                        if (!(0, n.isValidAddress)(e)) throw new Error('Invalid address');
                        return new i((0, s.toBuffer)(e));
                      }
                      static fromPublicKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Public key should be Buffer');
                        const r = (0, n.pubToAddress)(e);
                        return new i(r);
                      }
                      static fromPrivateKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Private key should be Buffer');
                        const r = (0, n.privateToAddress)(e);
                        return new i(r);
                      }
                      static generate(e, t) {
                        if ('bigint' != typeof t) throw new Error('Expected nonce to be a bigint');
                        return new i((0, n.generateAddress)(e.buf, (0, s.bigIntToBuffer)(t)));
                      }
                      static generate2(e, r, s) {
                        if (!t.isBuffer(r)) throw new Error('Expected salt to be a Buffer');
                        if (!t.isBuffer(s)) throw new Error('Expected initCode to be a Buffer');
                        return new i((0, n.generateAddress2)(e.buf, r, s));
                      }
                      equals(e) {
                        return this.buf.equals(e.buf);
                      }
                      isZero() {
                        return this.equals(i.zero());
                      }
                      isPrecompileOrSystemAddress() {
                        const e = (0, s.bufferToBigInt)(this.buf),
                          t = BigInt(0),
                          r = BigInt('0xffff');
                        return e >= t && e <= r;
                      }
                      toString() {
                        return '0x' + this.buf.toString('hex');
                      }
                      toBuffer() {
                        return t.from(this.buf);
                      }
                    }
                    r.Address = i;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/address.js',
      },
    ],
    [
      1828,
      { events: 4465 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.AsyncEventEmitter = void 0);
                const n = e('events');
                class s extends n.EventEmitter {
                  emit(e, ...t) {
                    let [r, n] = t;
                    const s = this;
                    let i = s._events[e] ?? [];
                    return (
                      n === undefined && 'function' == typeof r && ((n = r), (r = undefined)),
                      ('newListener' !== e && 'removeListener' !== e) ||
                        ((r = { event: r, fn: n }), (n = undefined)),
                      (i = Array.isArray(i) ? i : [i]),
                      (async function (e, t, r) {
                        let n;
                        for await (const s of t)
                          try {
                            s.length < 2
                              ? s.call(e, r)
                              : await new Promise((t, n) => {
                                  s.call(e, r, e => {
                                    e ? n(e) : t();
                                  });
                                });
                          } catch (e) {
                            n = e;
                          }
                        if (n) throw n;
                      })(s, i.slice(), r)
                        .then(n)
                        .catch(n),
                      s.listenerCount(e) > 0
                    );
                  }
                  once(e, t) {
                    const r = this;
                    let n;
                    if ('function' != typeof t) throw new TypeError('listener must be a function');
                    return (
                      (n =
                        t.length >= 2
                          ? function (s, i) {
                              r.removeListener(e, n), t(s, i);
                            }
                          : function (s) {
                              r.removeListener(e, n), t(s, n);
                            }),
                      r.on(e, n),
                      r
                    );
                  }
                  first(e, t) {
                    let r = this._events[e] ?? [];
                    if ('function' != typeof t) throw new TypeError('listener must be a function');
                    return Array.isArray(r) || (this._events[e] = r = [r]), r.unshift(t), this;
                  }
                  before(e, t, r) {
                    return this.beforeOrAfter(e, t, r);
                  }
                  after(e, t, r) {
                    return this.beforeOrAfter(e, t, r, 'after');
                  }
                  beforeOrAfter(e, t, r, n) {
                    let s,
                      i,
                      a = this._events[e] ?? [];
                    const o = 'after' === n ? 1 : 0;
                    if ('function' != typeof r) throw new TypeError('listener must be a function');
                    if ('function' != typeof t) throw new TypeError('target must be a function');
                    for (
                      Array.isArray(a) || (this._events[e] = a = [a]), i = a.length, s = a.length;
                      s--;

                    )
                      if (a[s] === t) {
                        i = s + o;
                        break;
                      }
                    return a.splice(i, 0, r), this;
                  }
                  on(e, t) {
                    return super.on(e, t);
                  }
                  addListener(e, t) {
                    return super.addListener(e, t);
                  }
                  prependListener(e, t) {
                    return super.prependListener(e, t);
                  }
                  prependOnceListener(e, t) {
                    return super.prependOnceListener(e, t);
                  }
                  removeAllListeners(e) {
                    return super.removeAllListeners(e);
                  }
                  removeListener(e, t) {
                    return super.removeListener(e, t);
                  }
                  eventNames() {
                    return super.eventNames();
                  }
                  listeners(e) {
                    return super.listeners(e);
                  }
                  listenerCount(e) {
                    return super.listenerCount(e);
                  }
                  getMaxListeners() {
                    return super.getMaxListeners();
                  }
                  setMaxListeners(e) {
                    return super.setMaxListeners(e);
                  }
                }
                r.AsyncEventEmitter = s;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/asyncEventEmitter.js',
      },
    ],
    [
      1829,
      { './helpers': 1832, './internal': 1834, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.intToUnpaddedBuffer =
                        r.bigIntToUnpaddedBuffer =
                        r.bigIntToHex =
                        r.bufArrToArr =
                        r.arrToBufArr =
                        r.validateNoLeadingZeroes =
                        r.baToJSON =
                        r.toUtf8 =
                        r.short =
                        r.addHexPrefix =
                        r.toUnsigned =
                        r.fromSigned =
                        r.bufferToInt =
                        r.bigIntToBuffer =
                        r.bufferToBigInt =
                        r.bufferToHex =
                        r.toBuffer =
                        r.unpadHexString =
                        r.unpadArray =
                        r.unpadBuffer =
                        r.setLengthRight =
                        r.setLengthLeft =
                        r.zeros =
                        r.intToBuffer =
                        r.intToHex =
                          void 0);
                    const n = e('./helpers'),
                      s = e('./internal');
                    r.intToHex = function (e) {
                      if (!Number.isSafeInteger(e) || e < 0)
                        throw new Error(`Received an invalid integer type: ${e}`);
                      return `0x${e.toString(16)}`;
                    };
                    r.intToBuffer = function (e) {
                      const n = (0, r.intToHex)(e);
                      return t.from((0, s.padToEven)(n.slice(2)), 'hex');
                    };
                    r.zeros = function (e) {
                      return t.allocUnsafe(e).fill(0);
                    };
                    const i = function (e, t, n) {
                      const s = (0, r.zeros)(t);
                      return n
                        ? e.length < t
                          ? (e.copy(s), s)
                          : e.slice(0, t)
                        : e.length < t
                          ? (e.copy(s, t - e.length), s)
                          : e.slice(-t);
                    };
                    r.setLengthLeft = function (e, t) {
                      return (0, n.assertIsBuffer)(e), i(e, t, !1);
                    };
                    r.setLengthRight = function (e, t) {
                      return (0, n.assertIsBuffer)(e), i(e, t, !0);
                    };
                    const a = function (e) {
                      let t = e[0];
                      for (; e.length > 0 && '0' === t.toString(); ) t = (e = e.slice(1))[0];
                      return e;
                    };
                    r.unpadBuffer = function (e) {
                      return (0, n.assertIsBuffer)(e), a(e);
                    };
                    r.unpadArray = function (e) {
                      return (0, n.assertIsArray)(e), a(e);
                    };
                    r.unpadHexString = function (e) {
                      return (
                        (0, n.assertIsHexString)(e), (e = (0, s.stripHexPrefix)(e)), '0x' + a(e)
                      );
                    };
                    r.toBuffer = function (e) {
                      if (null === e || e === undefined) return t.allocUnsafe(0);
                      if (t.isBuffer(e)) return t.from(e);
                      if (Array.isArray(e) || e instanceof Uint8Array) return t.from(e);
                      if ('string' == typeof e) {
                        if (!(0, s.isHexString)(e))
                          throw new Error(
                            `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${e}`
                          );
                        return t.from((0, s.padToEven)((0, s.stripHexPrefix)(e)), 'hex');
                      }
                      if ('number' == typeof e) return (0, r.intToBuffer)(e);
                      if ('bigint' == typeof e) {
                        if (e < BigInt(0))
                          throw new Error(`Cannot convert negative bigint to buffer. Given: ${e}`);
                        let r = e.toString(16);
                        return r.length % 2 && (r = '0' + r), t.from(r, 'hex');
                      }
                      if (e.toArray) return t.from(e.toArray());
                      if (e.toBuffer) return t.from(e.toBuffer());
                      throw new Error('invalid type');
                    };
                    function o(e) {
                      const t = (0, r.bufferToHex)(e);
                      return '0x' === t ? BigInt(0) : BigInt(t);
                    }
                    function c(e) {
                      return (0, r.toBuffer)('0x' + e.toString(16));
                    }
                    (r.bufferToHex = function (e) {
                      return '0x' + (e = (0, r.toBuffer)(e)).toString('hex');
                    }),
                      (r.bufferToBigInt = o),
                      (r.bigIntToBuffer = c);
                    r.bufferToInt = function (e) {
                      const t = Number(o(e));
                      if (!Number.isSafeInteger(t)) throw new Error('Number exceeds 53 bits');
                      return t;
                    };
                    r.fromSigned = function (e) {
                      return BigInt.asIntN(256, o(e));
                    };
                    r.toUnsigned = function (e) {
                      return c(BigInt.asUintN(256, e));
                    };
                    (r.addHexPrefix = function (e) {
                      return 'string' != typeof e || (0, s.isHexPrefixed)(e) ? e : '0x' + e;
                    }),
                      (r.short = function (e, r = 50) {
                        const n = t.isBuffer(e) ? e.toString('hex') : e;
                        return n.length <= r ? n : n.slice(0, r) + '…';
                      });
                    r.toUtf8 = function (e) {
                      if ((e = (0, s.stripHexPrefix)(e)).length % 2 != 0)
                        throw new Error('Invalid non-even hex string input for toUtf8() provided');
                      return t.from(e.replace(/^(00)+|(00)+$/g, ''), 'hex').toString('utf8');
                    };
                    r.baToJSON = function (e) {
                      if (t.isBuffer(e)) return `0x${e.toString('hex')}`;
                      if (e instanceof Array) {
                        const t = [];
                        for (let n = 0; n < e.length; n++) t.push((0, r.baToJSON)(e[n]));
                        return t;
                      }
                    };
                    (r.validateNoLeadingZeroes = function (e) {
                      for (const [t, r] of Object.entries(e))
                        if (r !== undefined && r.length > 0 && 0 === r[0])
                          throw new Error(
                            `${t} cannot have leading zeroes, received: ${r.toString('hex')}`
                          );
                    }),
                      (r.arrToBufArr = function e(r) {
                        return Array.isArray(r) ? r.map(t => e(t)) : t.from(r);
                      }),
                      (r.bufArrToArr = function e(t) {
                        return Array.isArray(t) ? t.map(t => e(t)) : Uint8Array.from(t ?? []);
                      });
                    (r.bigIntToHex = e => '0x' + e.toString(16)),
                      (r.bigIntToUnpaddedBuffer = function (e) {
                        return (0, r.unpadBuffer)(c(e));
                      }),
                      (r.intToUnpaddedBuffer = function (e) {
                        return (0, r.unpadBuffer)((0, r.intToBuffer)(e));
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/bytes.js',
      },
    ],
    [
      183,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.showSuccess = r.showError = void 0);
                const n = e => ({
                  name: 'SnapAuthorshipHeader',
                  key: 'snapHeader',
                  properties: { snapId: e },
                });
                r.showError = (e, t, r, s) =>
                  e.call('ApprovalController:showError', {
                    header: [n(t)],
                    title: r.title,
                    icon: r.icon,
                    error: {
                      key: 'snapAccountErrorMessage',
                      name: 'SnapAccountErrorMessage',
                      properties: s,
                    },
                  });
                r.showSuccess = (e, t, r, s) =>
                  e.call('ApprovalController:showSuccess', {
                    header: [n(t)],
                    title: r.title,
                    icon: r.icon,
                    message: {
                      key: 'snapAccountSuccessMessage',
                      name: 'SnapAccountSuccessMessage',
                      properties: s,
                    },
                  });
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/snap-keyring/utils/showResult.ts' },
    ],
    [
      1830,
      { buffer: 4139, 'ethereum-cryptography/secp256k1': 4383 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.MAX_WITHDRAWALS_PER_PAYLOAD =
                    r.RLP_EMPTY_STRING =
                    r.KECCAK256_RLP =
                    r.KECCAK256_RLP_S =
                    r.KECCAK256_RLP_ARRAY =
                    r.KECCAK256_RLP_ARRAY_S =
                    r.KECCAK256_NULL =
                    r.KECCAK256_NULL_S =
                    r.TWO_POW256 =
                    r.SECP256K1_ORDER_DIV_2 =
                    r.SECP256K1_ORDER =
                    r.MAX_INTEGER_BIGINT =
                    r.MAX_INTEGER =
                    r.MAX_UINT64 =
                      void 0);
                const n = e('buffer'),
                  s = e('ethereum-cryptography/secp256k1');
                (r.MAX_UINT64 = BigInt('0xffffffffffffffff')),
                  (r.MAX_INTEGER = BigInt(
                    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                  )),
                  (r.MAX_INTEGER_BIGINT = BigInt(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                  )),
                  (r.SECP256K1_ORDER = s.secp256k1.CURVE.n),
                  (r.SECP256K1_ORDER_DIV_2 = s.secp256k1.CURVE.n / BigInt(2)),
                  (r.TWO_POW256 = BigInt(
                    '0x10000000000000000000000000000000000000000000000000000000000000000'
                  )),
                  (r.KECCAK256_NULL_S =
                    'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'),
                  (r.KECCAK256_NULL = n.Buffer.from(r.KECCAK256_NULL_S, 'hex')),
                  (r.KECCAK256_RLP_ARRAY_S =
                    '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
                  (r.KECCAK256_RLP_ARRAY = n.Buffer.from(r.KECCAK256_RLP_ARRAY_S, 'hex')),
                  (r.KECCAK256_RLP_S =
                    '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'),
                  (r.KECCAK256_RLP = n.Buffer.from(r.KECCAK256_RLP_S, 'hex')),
                  (r.RLP_EMPTY_STRING = n.Buffer.from([128])),
                  (r.MAX_WITHDRAWALS_PER_PAYLOAD = 16);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/constants.js',
      },
    ],
    [
      1831,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.compactBytesToNibbles =
                    r.bytesToNibbles =
                    r.nibblesToCompactBytes =
                    r.nibblesToBytes =
                    r.hasTerminator =
                      void 0);
                r.hasTerminator = e => e.length > 0 && 16 === e[e.length - 1];
                r.nibblesToBytes = (e, t) => {
                  for (let r = 0, n = 0; n < e.length; r += 1, n += 2)
                    t[r] = (e[n] << 4) | e[n + 1];
                };
                r.nibblesToCompactBytes = e => {
                  let t = 0;
                  (0, r.hasTerminator)(e) && ((t = 1), (e = e.subarray(0, e.length - 1)));
                  const n = new Uint8Array(e.length / 2 + 1);
                  return (
                    (n[0] = t << 5),
                    1 & ~e.length || ((n[0] |= 16), (n[0] |= e[0]), (e = e.subarray(1))),
                    (0, r.nibblesToBytes)(e, n.subarray(1)),
                    n
                  );
                };
                r.bytesToNibbles = e => {
                  const t = 2 * e.length + 1,
                    r = new Uint8Array(t);
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    (r[2 * t] = n / 16), (r[2 * t + 1] = n % 16);
                  }
                  return (r[t - 1] = 16), r;
                };
                r.compactBytesToNibbles = e => {
                  if (0 === e.length) return e;
                  let t = (0, r.bytesToNibbles)(e);
                  t[0] < 2 && (t = t.subarray(0, t.length - 1));
                  const n = 2 - (1 & t[0]);
                  return t.subarray(n);
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/encoding.js',
      },
    ],
    [
      1832,
      { '../../../../../../is-buffer/index.js': 4723, './internal': 1834 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.assertIsString =
                        r.assertIsArray =
                        r.assertIsBuffer =
                        r.assertIsHexString =
                          void 0);
                    const n = e('./internal');
                    r.assertIsHexString = function (e) {
                      if (!(0, n.isHexString)(e)) {
                        throw new Error(
                          `This method only supports 0x-prefixed hex strings but input was: ${e}`
                        );
                      }
                    };
                    r.assertIsBuffer = function (e) {
                      if (!t.isBuffer(e)) {
                        throw new Error(`This method only supports Buffer but input was: ${e}`);
                      }
                    };
                    r.assertIsArray = function (e) {
                      if (!Array.isArray(e)) {
                        throw new Error(
                          `This method only supports number arrays but input was: ${e}`
                        );
                      }
                    };
                    r.assertIsString = function (e) {
                      if ('string' != typeof e) {
                        throw new Error(`This method only supports strings but input was: ${e}`);
                      }
                    };
                  }).call(this);
                }).call(this, { isBuffer: e('../../../../../../is-buffer/index.js') });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/helpers.js',
      },
    ],
    [
      1833,
      {
        './account': 1826,
        './address': 1827,
        './asyncEventEmitter': 1828,
        './bytes': 1829,
        './constants': 1830,
        './encoding': 1831,
        './internal': 1834,
        './lock': 1835,
        './provider': 1836,
        './signature': 1837,
        './types': 1838,
        './units': 1839,
        './withdrawal': 1840,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toAscii =
                    r.stripHexPrefix =
                    r.padToEven =
                    r.isHexString =
                    r.isHexPrefixed =
                    r.getKeys =
                    r.getBinarySize =
                    r.fromUtf8 =
                    r.fromAscii =
                    r.arrayContainsArray =
                      void 0),
                  s(e('./constants'), r),
                  s(e('./units'), r),
                  s(e('./account'), r),
                  s(e('./address'), r),
                  s(e('./withdrawal'), r),
                  s(e('./signature'), r),
                  s(e('./bytes'), r),
                  s(e('./types'), r),
                  s(e('./encoding'), r),
                  s(e('./asyncEventEmitter'), r);
                var i = e('./internal');
                Object.defineProperty(r, 'arrayContainsArray', {
                  enumerable: !0,
                  get: function () {
                    return i.arrayContainsArray;
                  },
                }),
                  Object.defineProperty(r, 'fromAscii', {
                    enumerable: !0,
                    get: function () {
                      return i.fromAscii;
                    },
                  }),
                  Object.defineProperty(r, 'fromUtf8', {
                    enumerable: !0,
                    get: function () {
                      return i.fromUtf8;
                    },
                  }),
                  Object.defineProperty(r, 'getBinarySize', {
                    enumerable: !0,
                    get: function () {
                      return i.getBinarySize;
                    },
                  }),
                  Object.defineProperty(r, 'getKeys', {
                    enumerable: !0,
                    get: function () {
                      return i.getKeys;
                    },
                  }),
                  Object.defineProperty(r, 'isHexPrefixed', {
                    enumerable: !0,
                    get: function () {
                      return i.isHexPrefixed;
                    },
                  }),
                  Object.defineProperty(r, 'isHexString', {
                    enumerable: !0,
                    get: function () {
                      return i.isHexString;
                    },
                  }),
                  Object.defineProperty(r, 'padToEven', {
                    enumerable: !0,
                    get: function () {
                      return i.padToEven;
                    },
                  }),
                  Object.defineProperty(r, 'stripHexPrefix', {
                    enumerable: !0,
                    get: function () {
                      return i.stripHexPrefix;
                    },
                  }),
                  Object.defineProperty(r, 'toAscii', {
                    enumerable: !0,
                    get: function () {
                      return i.toAscii;
                    },
                  }),
                  s(e('./lock'), r),
                  s(e('./provider'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/index.js',
      },
    ],
    [
      1834,
      { buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (e) {
                  (function () {
                    function t(e) {
                      if ('string' != typeof e)
                        throw new Error(
                          "[isHexPrefixed] input must be type 'string', received type " + typeof e
                        );
                      return '0' === e[0] && 'x' === e[1];
                    }
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.isHexString =
                        r.getKeys =
                        r.fromAscii =
                        r.fromUtf8 =
                        r.toAscii =
                        r.arrayContainsArray =
                        r.getBinarySize =
                        r.padToEven =
                        r.stripHexPrefix =
                        r.isHexPrefixed =
                          void 0),
                      (r.isHexPrefixed = t);
                    function n(e) {
                      let t = e;
                      if ('string' != typeof t)
                        throw new Error(
                          "[padToEven] value must be type 'string', received " + typeof t
                        );
                      return t.length % 2 && (t = `0${t}`), t;
                    }
                    (r.stripHexPrefix = e => {
                      if ('string' != typeof e)
                        throw new Error(
                          "[stripHexPrefix] input must be type 'string', received " + typeof e
                        );
                      return t(e) ? e.slice(2) : e;
                    }),
                      (r.padToEven = n),
                      (r.getBinarySize = function (t) {
                        if ('string' != typeof t)
                          throw new Error(
                            "[getBinarySize] method requires input type 'string', received " +
                              typeof t
                          );
                        return e.byteLength(t, 'utf8');
                      }),
                      (r.arrayContainsArray = function (e, t, r) {
                        if (!0 !== Array.isArray(e))
                          throw new Error(
                            `[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof e}'`
                          );
                        if (!0 !== Array.isArray(t))
                          throw new Error(
                            `[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof t}'`
                          );
                        return t[!0 === r ? 'some' : 'every'](t => e.indexOf(t) >= 0);
                      }),
                      (r.toAscii = function (e) {
                        let t = '',
                          r = 0;
                        const n = e.length;
                        for ('0x' === e.substring(0, 2) && (r = 2); r < n; r += 2) {
                          const n = parseInt(e.substr(r, 2), 16);
                          t += String.fromCharCode(n);
                        }
                        return t;
                      }),
                      (r.fromUtf8 = function (t) {
                        return `0x${n(e.from(t, 'utf8').toString('hex')).replace(/^0+|0+$/g, '')}`;
                      }),
                      (r.fromAscii = function (e) {
                        let t = '';
                        for (let r = 0; r < e.length; r++) {
                          const n = e.charCodeAt(r).toString(16);
                          t += n.length < 2 ? `0${n}` : n;
                        }
                        return `0x${t}`;
                      }),
                      (r.getKeys = function (e, t, r) {
                        if (!Array.isArray(e))
                          throw new Error(
                            "[getKeys] method expects input 'params' to be an array, got " +
                              typeof e
                          );
                        if ('string' != typeof t)
                          throw new Error(
                            "[getKeys] method expects input 'key' to be type 'string', got " +
                              typeof e
                          );
                        const n = [];
                        for (let s = 0; s < e.length; s++) {
                          let i = e[s][t];
                          if (!0 !== r || i) {
                            if ('string' != typeof i)
                              throw new Error(
                                "invalid abi - expected type 'string', received " + typeof i
                              );
                          } else i = '';
                          n.push(i);
                        }
                        return n;
                      }),
                      (r.isHexString = function (e, t) {
                        return (
                          !('string' != typeof e || !e.match(/^0x[0-9A-Fa-f]*$/)) &&
                          !(void 0 !== t && t > 0 && e.length !== 2 + 2 * t)
                        );
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/internal.js',
      },
    ],
    [
      1835,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.Lock = void 0);
                r.Lock = class {
                  constructor() {
                    (this.permits = 1), (this.promiseResolverQueue = []);
                  }
                  async acquire() {
                    return this.permits > 0
                      ? ((this.permits -= 1), Promise.resolve(!0))
                      : new Promise(e => this.promiseResolverQueue.push(e));
                  }
                  release() {
                    if (
                      ((this.permits += 1),
                      this.permits > 1 && this.promiseResolverQueue.length > 0)
                    )
                      console.warn(
                        'Lock.permits should never be > 0 when there is someone waiting.'
                      );
                    else if (1 === this.permits && this.promiseResolverQueue.length > 0) {
                      this.permits -= 1;
                      const e = this.promiseResolverQueue.shift();
                      e && e(!0);
                    }
                  }
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/lock.js',
      },
    ],
    [
      1836,
      { 'micro-ftch': 4977 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getProvider = r.fetchFromProvider = void 0);
                const n = e('micro-ftch');
                r.fetchFromProvider = async (e, t) =>
                  (
                    await (0, n.default)(e, {
                      headers: { 'content-type': 'application/json' },
                      type: 'json',
                      data: { method: t.method, params: t.params, jsonrpc: '2.0', id: 1 },
                    })
                  ).result;
                r.getProvider = e => {
                  if ('string' == typeof e) return e;
                  if (e?.connection?.url !== undefined) return e.connection.url;
                  throw new Error('Must provide valid provider URL or Web3Provider');
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/provider.js',
      },
    ],
    [
      1837,
      {
        './bytes': 1829,
        './constants': 1830,
        './helpers': 1832,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
        'ethereum-cryptography/secp256k1': 4383,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.hashPersonalMessage =
                        r.isValidSignature =
                        r.fromRpcSig =
                        r.toCompactSig =
                        r.toRpcSig =
                        r.ecrecover =
                        r.ecsign =
                          void 0);
                    const n = e('ethereum-cryptography/keccak'),
                      s = e('ethereum-cryptography/secp256k1'),
                      i = e('./bytes'),
                      a = e('./constants'),
                      o = e('./helpers');
                    function c(e, t) {
                      return e === BigInt(0) || e === BigInt(1)
                        ? e
                        : t === undefined
                          ? e - BigInt(27)
                          : e - (t * BigInt(2) + BigInt(35));
                    }
                    function u(e) {
                      return e === BigInt(0) || e === BigInt(1);
                    }
                    r.ecsign = function (e, r, n) {
                      const i = s.secp256k1.sign(e, r),
                        a = i.toCompactRawBytes();
                      return {
                        r: t.from(a.slice(0, 32)),
                        s: t.from(a.slice(32, 64)),
                        v:
                          n === undefined
                            ? BigInt(i.recovery + 27)
                            : BigInt(i.recovery + 35) + BigInt(n) * BigInt(2),
                      };
                    };
                    r.ecrecover = function (e, r, n, a, o) {
                      const d = t.concat(
                          [(0, i.setLengthLeft)(n, 32), (0, i.setLengthLeft)(a, 32)],
                          64
                        ),
                        l = c(r, o);
                      if (!u(l)) throw new Error('Invalid signature v value');
                      const f = s.secp256k1.Signature.fromCompact(d)
                        .addRecoveryBit(Number(l))
                        .recoverPublicKey(e);
                      return t.from(f.toRawBytes(!1).slice(1));
                    };
                    r.toRpcSig = function (e, r, n, s) {
                      if (!u(c(e, s))) throw new Error('Invalid signature v value');
                      return (0, i.bufferToHex)(
                        t.concat([
                          (0, i.setLengthLeft)(r, 32),
                          (0, i.setLengthLeft)(n, 32),
                          (0, i.toBuffer)(e),
                        ])
                      );
                    };
                    r.toCompactSig = function (e, r, n, s) {
                      if (!u(c(e, s))) throw new Error('Invalid signature v value');
                      let a = n;
                      return (
                        ((e > BigInt(28) && e % BigInt(2) === BigInt(1)) ||
                          e === BigInt(1) ||
                          e === BigInt(28)) &&
                          ((a = t.from(n)), (a[0] |= 128)),
                        (0, i.bufferToHex)(
                          t.concat([(0, i.setLengthLeft)(r, 32), (0, i.setLengthLeft)(a, 32)])
                        )
                      );
                    };
                    r.fromRpcSig = function (e) {
                      const t = (0, i.toBuffer)(e);
                      let r, n, s;
                      if (t.length >= 65)
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (s = (0, i.bufferToBigInt)(t.slice(64)));
                      else {
                        if (64 !== t.length) throw new Error('Invalid signature length');
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (s = BigInt((0, i.bufferToInt)(t.slice(32, 33)) >> 7)),
                          (n[0] &= 127);
                      }
                      return s < 27 && (s += BigInt(27)), { v: s, r: r, s: n };
                    };
                    r.isValidSignature = function (e, t, r, n = !0, s) {
                      if (32 !== t.length || 32 !== r.length) return !1;
                      if (!u(c(e, s))) return !1;
                      const o = (0, i.bufferToBigInt)(t),
                        d = (0, i.bufferToBigInt)(r);
                      return (
                        !(
                          o === BigInt(0) ||
                          o >= a.SECP256K1_ORDER ||
                          d === BigInt(0) ||
                          d >= a.SECP256K1_ORDER
                        ) && !(n && d >= a.SECP256K1_ORDER_DIV_2)
                      );
                    };
                    r.hashPersonalMessage = function (e) {
                      (0, o.assertIsBuffer)(e);
                      const r = t.from(`Ethereum Signed Message:\n${e.length}`, 'utf-8');
                      return t.from((0, n.keccak256)(t.concat([r, e])));
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/signature.js',
      },
    ],
    [
      1838,
      { './bytes': 1829, './internal': 1834 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toType = r.TypeOutput = void 0);
                const n = e('./bytes'),
                  s = e('./internal');
                var i;
                !(function (e) {
                  (e[(e.Number = 0)] = 'Number'),
                    (e[(e.BigInt = 1)] = 'BigInt'),
                    (e[(e.Buffer = 2)] = 'Buffer'),
                    (e[(e.PrefixedHexString = 3)] = 'PrefixedHexString');
                })((i = r.TypeOutput || (r.TypeOutput = {}))),
                  (r.toType = function (e, t) {
                    if (null === e) return null;
                    if (e === undefined) return undefined;
                    if ('string' == typeof e && !(0, s.isHexString)(e))
                      throw new Error(`A string must be provided with a 0x-prefix, given: ${e}`);
                    if ('number' == typeof e && !Number.isSafeInteger(e))
                      throw new Error(
                        'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                      );
                    const r = (0, n.toBuffer)(e);
                    switch (t) {
                      case i.Buffer:
                        return r;
                      case i.BigInt:
                        return (0, n.bufferToBigInt)(r);
                      case i.Number: {
                        const e = (0, n.bufferToBigInt)(r);
                        if (e > BigInt(Number.MAX_SAFE_INTEGER))
                          throw new Error(
                            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                          );
                        return Number(e);
                      }
                      case i.PrefixedHexString:
                        return (0, n.bufferToHex)(r);
                      default:
                        throw new Error('unknown outputType');
                    }
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/types.js',
      },
    ],
    [
      1839,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.GWEI_TO_WEI = void 0),
                  (r.GWEI_TO_WEI = BigInt(1e9));
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/units.js',
      },
    ],
    [
      184,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.sanitizeUIState = function (e) {
                    const t = { ...e };
                    for (const e of n) delete t[e];
                    return (
                      (function (e) {
                        const t = e.snaps;
                        if (!t) return;
                        e.snaps = Object.values(t).reduce(
                          (e, t) => (
                            (e[t.id] = (function (e) {
                              const t = { ...e };
                              return delete t.sourceCode, delete t.auxiliaryFiles, t;
                            })(t)),
                            e
                          ),
                          {}
                        );
                      })(t),
                      t
                    );
                  });
                const n = ['snapStates', 'unencryptedSnapStates', 'vault'];
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/state-utils.ts' },
    ],
    [
      1840,
      { './address': 1827, './bytes': 1829, './types': 1838, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }), (r.Withdrawal = void 0);
                    const n = e('./address'),
                      s = e('./bytes'),
                      i = e('./types');
                    class a {
                      constructor(e, t, r, n) {
                        (this.index = e),
                          (this.validatorIndex = t),
                          (this.address = r),
                          (this.amount = n);
                      }
                      static fromWithdrawalData(e) {
                        const { index: t, validatorIndex: r, address: s, amount: o } = e,
                          c = (0, i.toType)(t, i.TypeOutput.BigInt),
                          u = (0, i.toType)(r, i.TypeOutput.BigInt),
                          d = new n.Address((0, i.toType)(s, i.TypeOutput.Buffer)),
                          l = (0, i.toType)(o, i.TypeOutput.BigInt);
                        return new a(c, u, d, l);
                      }
                      static fromValuesArray(e) {
                        if (4 !== e.length)
                          throw Error(
                            `Invalid withdrawalArray length expected=4 actual=${e.length}`
                          );
                        const [t, r, n, s] = e;
                        return a.fromWithdrawalData({
                          index: t,
                          validatorIndex: r,
                          address: n,
                          amount: s,
                        });
                      }
                      static toBufferArray(e) {
                        const { index: r, validatorIndex: s, address: a, amount: o } = e,
                          c =
                            (0, i.toType)(r, i.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, i.toType)(r, i.TypeOutput.Buffer),
                          u =
                            (0, i.toType)(s, i.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, i.toType)(s, i.TypeOutput.Buffer);
                        let d;
                        d = a instanceof n.Address ? a.buf : (0, i.toType)(a, i.TypeOutput.Buffer);
                        return [
                          c,
                          u,
                          d,
                          (0, i.toType)(o, i.TypeOutput.BigInt) === BigInt(0)
                            ? t.alloc(0)
                            : (0, i.toType)(o, i.TypeOutput.Buffer),
                        ];
                      }
                      raw() {
                        return a.toBufferArray(this);
                      }
                      toValue() {
                        return {
                          index: this.index,
                          validatorIndex: this.validatorIndex,
                          address: this.address.buf,
                          amount: this.amount,
                        };
                      }
                      toJSON() {
                        return {
                          index: (0, s.bigIntToHex)(this.index),
                          validatorIndex: (0, s.bigIntToHex)(this.validatorIndex),
                          address: '0x' + this.address.buf.toString('hex'),
                          amount: (0, s.bigIntToHex)(this.amount),
                        };
                      }
                    }
                    r.Withdrawal = a;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@ethereumjs/util/dist/withdrawal.js',
      },
    ],
    [
      1841,
      { './errors': 1842, './packer': 1845, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.decodeSingle = r.decode = r.encodePacked = r.encodeSingle = r.encode = void 0);
                const n = e('@metamask/utils'),
                  s = e('./errors'),
                  i = e('./packer');
                r.encode = (e, t, r, n) => {
                  try {
                    return (0, i.pack)({ types: e, values: t, packed: r, tight: n });
                  } catch (e) {
                    if (e instanceof s.ParserError)
                      throw new s.ParserError(`Unable to encode value: ${e.message}`, e);
                    throw new s.ParserError(
                      `An unexpected error occurred: ${(0, s.getErrorMessage)(e)}`,
                      e
                    );
                  }
                };
                r.encodeSingle = (e, t) => (0, r.encode)([e], [t]);
                r.encodePacked = (e, t, n) => (0, r.encode)(e, t, !0, n);
                r.decode = (e, t) => {
                  const r = (0, n.createBytes)(t);
                  try {
                    return (0, i.unpack)(e, r);
                  } catch (e) {
                    if (e instanceof s.ParserError)
                      throw new s.ParserError(`Unable to decode value: ${e.message}`, e);
                    throw new s.ParserError(
                      `An unexpected error occurred: ${(0, s.getErrorMessage)(e)}`,
                      e
                    );
                  }
                };
                r.decodeSingle = (e, t) => {
                  const i = (0, r.decode)([e], t);
                  return (
                    (0, n.assert)(
                      1 === i.length,
                      new s.ParserError('Decoded value array has unexpected length.')
                    ),
                    i[0]
                  );
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/abi.js',
      },
    ],
    [
      1842,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.ParserError = r.getErrorStack = r.getErrorMessage = void 0);
                const n = e('@metamask/utils');
                r.getErrorMessage = e =>
                  'string' == typeof e
                    ? e
                    : e instanceof Error ||
                        ((0, n.isObject)(e) &&
                          (0, n.hasProperty)(e, 'message') &&
                          'string' == typeof e.message)
                      ? e.message
                      : 'Unknown error.';
                r.getErrorStack = e => (e instanceof Error ? e.stack : undefined);
                class s extends Error {
                  constructor(e, t) {
                    super(e), (this.name = 'ParserError');
                    const n = (0, r.getErrorStack)(t);
                    n && (this.stack = n);
                  }
                }
                r.ParserError = s;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/errors.js',
      },
    ],
    [
      1843,
      { './abi': 1841, './errors': 1842, './types': 1858 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  s(e('./abi'), r),
                  s(e('./errors'), r),
                  s(e('./types'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/index.js',
      },
    ],
    [
      1844,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.iterate = void 0);
                const n = e('@metamask/utils');
                r.iterate = function* (e, t = 32) {
                  for (let r = 0; r < e.length; r += t) {
                    const s = e => {
                        (0, n.assert)(e >= 0, 'Cannot skip a negative number of bytes.'),
                          (0, n.assert)(e % t == 0, 'Length must be a multiple of the size.'),
                          (r += e);
                      },
                      i = e.subarray(r);
                    yield { skip: s, value: i };
                  }
                  return { skip: () => undefined, value: new Uint8Array() };
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/iterator.js',
      },
    ],
    [
      1845,
      {
        './errors': 1842,
        './iterator': 1844,
        './parsers': 1852,
        './utils': 1860,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.unpack = r.pack = r.isDynamicParser = r.getParser = void 0);
                const n = e('@metamask/utils'),
                  s = e('./errors'),
                  i = e('./iterator'),
                  a = e('./parsers'),
                  o = e('./utils');
                r.getParser = e => {
                  const t = {
                      address: a.address,
                      array: a.array,
                      bool: a.bool,
                      bytes: a.bytes,
                      fixedBytes: a.fixedBytes,
                      function: a.fn,
                      number: a.number,
                      string: a.string,
                      tuple: a.tuple,
                    },
                    r = t[e];
                  if (r) return r;
                  const n = Object.values(t).find(t => t.isType(e));
                  if (n) return n;
                  throw new s.ParserError(`The type "${e}" is not supported.`);
                };
                r.isDynamicParser = (e, t) => {
                  const { isDynamic: r } = e;
                  return 'function' == typeof r ? r(t) : r;
                };
                r.pack = ({
                  types: e,
                  values: t,
                  packed: i = !1,
                  tight: a = !1,
                  arrayPacked: c = !1,
                  byteArray: u = new Uint8Array(),
                }) => {
                  (0, n.assert)(
                    e.length === t.length,
                    new s.ParserError(
                      `The number of types (${e.length}) does not match the number of values (${t.length}).`
                    )
                  );
                  const {
                    staticBuffer: d,
                    dynamicBuffer: l,
                    pointers: f,
                  } = e.reduce(
                    ({ staticBuffer: e, dynamicBuffer: s, pointers: o }, u, d) => {
                      const l = (0, r.getParser)(u),
                        f = t[d];
                      if (i || c || !(0, r.isDynamicParser)(l, u))
                        return {
                          staticBuffer: l.encode({
                            buffer: e,
                            value: f,
                            type: u,
                            packed: i,
                            tight: a,
                          }),
                          dynamicBuffer: s,
                          pointers: o,
                        };
                      return {
                        staticBuffer: (0, n.concatBytes)([e, new Uint8Array(32)]),
                        dynamicBuffer: l.encode({
                          buffer: s,
                          value: f,
                          type: u,
                          packed: i,
                          tight: a,
                        }),
                        pointers: [...o, { position: e.length, pointer: s.length }],
                      };
                    },
                    {
                      staticBuffer: new Uint8Array(),
                      dynamicBuffer: new Uint8Array(),
                      pointers: [],
                    }
                  );
                  (0, n.assert)(
                    (!i && !c) || 0 === l.length,
                    new s.ParserError('Invalid pack state.')
                  );
                  const h = d.length,
                    p = f.reduce((e, { pointer: t, position: r }) => {
                      const s = (0, o.padStart)((0, n.numberToBytes)(h + t));
                      return (0, o.set)(e, s, r);
                    }, d);
                  return (0, n.concatBytes)([u, p, l]);
                };
                r.unpack = (e, t) => {
                  const a = (0, i.iterate)(t);
                  return e.map(e => {
                    const {
                      value: { value: i, skip: o },
                      done: c,
                    } = a.next();
                    (0, n.assert)(
                      !c,
                      new s.ParserError(
                        `The encoded value is invalid for the provided types. Reached end of buffer while attempting to parse "${e}".`
                      )
                    );
                    const u = (0, r.getParser)(e);
                    if ((0, r.isDynamicParser)(u, e)) {
                      const r = (0, n.bytesToNumber)(i.subarray(0, 32)),
                        s = t.subarray(r);
                      return u.decode({ type: e, value: s, skip: o });
                    }
                    return u.decode({ type: e, value: i, skip: o });
                  });
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/packer.js',
      },
    ],
    [
      1846,
      { '../errors': 1842, '../utils': 1860, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.address = r.getAddress = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../utils');
                (r.getAddress = e => {
                  const t = (0, n.createBytes)(e);
                  return (
                    (0, n.assert)(
                      t.length <= 20,
                      new s.ParserError(
                        `Invalid address value. Expected address to be 20 bytes long, but received ${t.length} bytes.`
                      )
                    ),
                    (0, i.padStart)(t, 20)
                  );
                }),
                  (r.address = {
                    isDynamic: !1,
                    isType: e => 'address' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: s }) {
                      const a = (0, r.getAddress)(t);
                      if (s) return (0, n.concatBytes)([e, a]);
                      const o = (0, i.padStart)(a);
                      return (0, n.concatBytes)([e, o]);
                    },
                    decode: ({ value: e }) => (0, n.add0x)((0, n.bytesToHex)(e.slice(12, 32))),
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/address.js',
      },
    ],
    [
      1847,
      {
        '../errors': 1842,
        '../packer': 1845,
        '../utils': 1860,
        './fixed-bytes': 1850,
        './tuple': 1856,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.array = r.getTupleType = r.getArrayType = r.isArrayType = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../packer'),
                  a = e('../utils'),
                  o = e('./fixed-bytes'),
                  c = e('./tuple'),
                  u = /^(?<type>.*)\[(?<length>\d*?)\]$/u;
                r.isArrayType = e => u.test(e);
                r.getArrayType = e => {
                  const t = e.match(u);
                  return (
                    (0, n.assert)(
                      t?.groups?.type,
                      new s.ParserError(
                        `Invalid array type. Expected an array type, but received "${e}".`
                      )
                    ),
                    [t.groups.type, t.groups.length ? parseInt(t.groups.length, 10) : undefined]
                  );
                };
                (r.getTupleType = (e, t) => `(${new Array(t).fill(e).join(',')})`),
                  (r.array = {
                    isDynamic(e) {
                      const [t, n] = (0, r.getArrayType)(e);
                      return n === undefined || (0, i.isDynamicParser)((0, i.getParser)(t), t);
                    },
                    isType: e => (0, r.isArrayType)(e),
                    getByteLength(e) {
                      (0, n.assert)(
                        (0, r.isArrayType)(e),
                        new s.ParserError(`Expected an array type, but received "${e}".`)
                      );
                      const [t, a] = (0, r.getArrayType)(e);
                      return (0, i.isDynamicParser)(this, e) || a === undefined
                        ? 32
                        : c.tuple.getByteLength((0, r.getTupleType)(t, a));
                    },
                    encode({ type: e, buffer: t, value: u, packed: d, tight: l }) {
                      const [f, h] = (0, r.getArrayType)(e);
                      if (
                        ((0, n.assert)(
                          !d || !(0, r.isArrayType)(f),
                          new s.ParserError('Cannot pack nested arrays.')
                        ),
                        d && (0, i.isDynamicParser)((0, i.getParser)(f), f))
                      )
                        return (0, i.pack)({
                          types: new Array(u.length).fill(f),
                          values: u,
                          byteArray: t,
                          packed: d,
                          arrayPacked: !0,
                          tight: l,
                        });
                      if (h)
                        return (
                          (0, n.assert)(
                            h === u.length,
                            new s.ParserError(
                              `Array length does not match type length. Expected a length of ${h}, but received ${u.length}.`
                            )
                          ),
                          c.tuple.encode({
                            type: (0, r.getTupleType)(f, h),
                            buffer: t,
                            value: u,
                            packed: o.fixedBytes.isType(f) && l,
                            tight: l,
                          })
                        );
                      if (d)
                        return (0, i.pack)({
                          types: new Array(u.length).fill(f),
                          values: u,
                          byteArray: t,
                          packed: o.fixedBytes.isType(f) && l,
                          arrayPacked: !0,
                          tight: l,
                        });
                      const p = (0, a.padStart)((0, n.numberToBytes)(u.length));
                      return (0, i.pack)({
                        types: new Array(u.length).fill(f),
                        values: u,
                        byteArray: (0, n.concatBytes)([t, p]),
                        packed: d,
                        tight: l,
                      });
                    },
                    decode({ type: e, value: t, ...a }) {
                      const [o, u] = (0, r.getArrayType)(e);
                      if (u) {
                        const e = c.tuple.decode({
                          type: (0, r.getTupleType)(o, u),
                          value: t,
                          ...a,
                        });
                        return (
                          (0, n.assert)(
                            e.length === u,
                            new s.ParserError(
                              `Array length does not match type length. Expected a length of ${u}, but received ${e.length}.`
                            )
                          ),
                          e
                        );
                      }
                      const d = (0, n.bytesToNumber)(t.subarray(0, 32));
                      return (0, i.unpack)(new Array(d).fill(o), t.subarray(32));
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/array.js',
      },
    ],
    [
      1848,
      {
        '../errors': 1842,
        './number': 1853,
        '@metamask/superstruct': 2913,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.bool = r.getBooleanValue = void 0);
                const n = e('@metamask/superstruct'),
                  s = e('@metamask/utils'),
                  i = e('../errors'),
                  a = e('./number'),
                  o = (0, n.coerce)(
                    (0, n.boolean)(),
                    (0, n.union)([(0, n.literal)('true'), (0, n.literal)('false')]),
                    e => 'true' === e
                  );
                (r.getBooleanValue = e => {
                  try {
                    return (0, n.create)(e, o) ? BigInt(1) : BigInt(0);
                  } catch {
                    throw new i.ParserError(
                      `Invalid boolean value. Expected a boolean literal, or the string "true" or "false", but received "${e}".`
                    );
                  }
                }),
                  (r.bool = {
                    isDynamic: !1,
                    isType: e => 'bool' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: n, tight: i }) {
                      const o = (0, r.getBooleanValue)(t);
                      return n
                        ? (0, s.concatBytes)([e, (0, s.bigIntToBytes)(o)])
                        : a.number.encode({
                            type: 'uint256',
                            buffer: e,
                            value: o,
                            packed: n,
                            tight: i,
                          });
                    },
                    decode: e => a.number.decode({ ...e, type: 'uint256' }) === BigInt(1),
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/bool.js',
      },
    ],
    [
      1849,
      { '../utils': 1860, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.bytes = void 0);
                const n = e('@metamask/utils'),
                  s = e('../utils');
                r.bytes = {
                  isDynamic: !0,
                  isType: e => 'bytes' === e,
                  getByteLength: () => 32,
                  encode({ buffer: e, value: t, packed: r }) {
                    const i = (0, n.createBytes)(t);
                    if (r) return (0, n.concatBytes)([e, i]);
                    const a = 32 * Math.ceil(i.byteLength / 32);
                    return (0, n.concatBytes)([
                      e,
                      (0, s.padStart)((0, n.numberToBytes)(i.byteLength)),
                      (0, s.padEnd)(i, a),
                    ]);
                  },
                  decode({ value: e }) {
                    const t = e.subarray(0, 32),
                      r = (0, n.bytesToNumber)(t);
                    return e.slice(32, 32 + r);
                  },
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/bytes.js',
      },
    ],
    [
      1850,
      { '../errors': 1842, '../utils': 1860, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.fixedBytes = r.getByteLength = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../utils'),
                  a = /^bytes([0-9]{1,2})$/u;
                (r.getByteLength = e => {
                  const t = e.match(a)?.[1];
                  (0, n.assert)(
                    t,
                    `Invalid byte length. Expected a number between 1 and 32, but received "${e}".`
                  );
                  const r = Number(t);
                  return (
                    (0, n.assert)(
                      r > 0 && r <= 32,
                      new s.ParserError(
                        `Invalid byte length. Expected a number between 1 and 32, but received "${e}".`
                      )
                    ),
                    r
                  );
                }),
                  (r.fixedBytes = {
                    isDynamic: !1,
                    isType: e => a.test(e),
                    getByteLength: () => 32,
                    encode({ type: e, buffer: t, value: a, packed: o }) {
                      const c = (0, r.getByteLength)(e),
                        u = (0, n.createBytes)(a);
                      return (
                        (0, n.assert)(
                          u.length <= c,
                          new s.ParserError(
                            `Expected a value of length ${c}, but received a value of length ${u.length}.`
                          )
                        ),
                        o
                          ? (0, n.concatBytes)([t, (0, i.padEnd)(u, c)])
                          : (0, n.concatBytes)([t, (0, i.padEnd)(u)])
                      );
                    },
                    decode({ type: e, value: t }) {
                      const n = (0, r.getByteLength)(e);
                      return t.slice(0, n);
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/fixed-bytes.js',
      },
    ],
    [
      1851,
      {
        '../errors': 1842,
        './fixed-bytes': 1850,
        '@metamask/superstruct': 2913,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.fn = r.getFunction = void 0);
                const n = e('@metamask/superstruct'),
                  s = e('@metamask/utils'),
                  i = e('../errors'),
                  a = e('./fixed-bytes'),
                  o = (0, n.coerce)(
                    (0, n.object)({ address: s.StrictHexStruct, selector: s.StrictHexStruct }),
                    (0, n.union)([s.StrictHexStruct, (0, n.instance)(Uint8Array)]),
                    e => {
                      const t = (0, s.createBytes)(e);
                      return (
                        (0, s.assert)(
                          24 === t.length,
                          new i.ParserError(
                            `Invalid Solidity function. Expected function to be 24 bytes long, but received ${t.length} bytes.`
                          )
                        ),
                        {
                          address: (0, s.bytesToHex)(t.subarray(0, 20)),
                          selector: (0, s.bytesToHex)(t.subarray(20, 24)),
                        }
                      );
                    }
                  );
                (r.getFunction = e => {
                  const t = (0, n.create)(e, o);
                  return (0, s.concatBytes)([
                    (0, s.hexToBytes)(t.address),
                    (0, s.hexToBytes)(t.selector),
                  ]);
                }),
                  (r.fn = {
                    isDynamic: !1,
                    isType: e => 'function' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: n, tight: s }) {
                      const i = (0, r.getFunction)(t);
                      return a.fixedBytes.encode({
                        type: 'bytes24',
                        buffer: e,
                        value: i,
                        packed: n,
                        tight: s,
                      });
                    },
                    decode: ({ value: e }) => ({
                      address: (0, s.bytesToHex)(e.slice(0, 20)),
                      selector: (0, s.bytesToHex)(e.slice(20, 24)),
                    }),
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/function.js',
      },
    ],
    [
      1852,
      {
        './address': 1846,
        './array': 1847,
        './bool': 1848,
        './bytes': 1849,
        './fixed-bytes': 1850,
        './function': 1851,
        './number': 1853,
        './parser': 1854,
        './string': 1855,
        './tuple': 1856,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  s(e('./address'), r),
                  s(e('./array'), r),
                  s(e('./bool'), r),
                  s(e('./bytes'), r),
                  s(e('./fixed-bytes'), r),
                  s(e('./function'), r),
                  s(e('./number'), r),
                  s(e('./parser'), r),
                  s(e('./string'), r),
                  s(e('./tuple'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/index.js',
      },
    ],
    [
      1853,
      { '../errors': 1842, '../utils': 1860, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.number =
                    r.getBigInt =
                    r.assertNumberLength =
                    r.getLength =
                    r.isSigned =
                      void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../utils'),
                  a = /^u?int(?<length>[0-9]*)?$/u;
                r.isSigned = e => !e.startsWith('u');
                r.getLength = e => {
                  if ('int' === e || 'uint' === e) return 256;
                  const t = e.match(a);
                  (0, n.assert)(
                    t?.groups?.length,
                    new s.ParserError(
                      `Invalid number type. Expected a number type, but received "${e}".`
                    )
                  );
                  const r = parseInt(t.groups.length, 10);
                  return (
                    (0, n.assert)(
                      r >= 8 && r <= 256,
                      new s.ParserError(
                        `Invalid number length. Expected a number between 8 and 256, but received "${e}".`
                      )
                    ),
                    (0, n.assert)(
                      r % 8 == 0,
                      new s.ParserError(
                        `Invalid number length. Expected a multiple of 8, but received "${e}".`
                      )
                    ),
                    r
                  );
                };
                r.assertNumberLength = (e, t) => {
                  const i = (0, r.getLength)(t),
                    a = BigInt(2) ** BigInt(i - ((0, r.isSigned)(t) ? 1 : 0)) - BigInt(1);
                  (0, r.isSigned)(t)
                    ? (0, n.assert)(
                        e >= -(a + BigInt(1)) && e <= a,
                        new s.ParserError(`Number "${e}" is out of range for type "${t}".`)
                      )
                    : (0, n.assert)(
                        e <= a,
                        new s.ParserError(`Number "${e}" is out of range for type "${t}".`)
                      );
                };
                (r.getBigInt = e => {
                  try {
                    return (0, n.createBigInt)(e);
                  } catch {
                    throw new s.ParserError(
                      `Invalid number. Expected a valid number value, but received "${e}".`
                    );
                  }
                }),
                  (r.number = {
                    isDynamic: !1,
                    isType: e => a.test(e),
                    getByteLength: () => 32,
                    encode({ type: e, buffer: t, value: s, packed: a }) {
                      const o = (0, r.getBigInt)(s);
                      if (((0, r.assertNumberLength)(o, e), (0, r.isSigned)(e))) {
                        if (a) {
                          const s = (0, r.getLength)(e) / 8;
                          return (0, n.concatBytes)([t, (0, n.signedBigIntToBytes)(o, s)]);
                        }
                        return (0, n.concatBytes)([
                          t,
                          (0, i.padStart)((0, n.signedBigIntToBytes)(o, 32)),
                        ]);
                      }
                      if (a) {
                        const s = (0, r.getLength)(e) / 8;
                        return (0, n.concatBytes)([t, (0, i.padStart)((0, n.bigIntToBytes)(o), s)]);
                      }
                      return (0, n.concatBytes)([t, (0, i.padStart)((0, n.bigIntToBytes)(o))]);
                    },
                    decode({ type: e, value: t }) {
                      const s = t.subarray(0, 32);
                      if ((0, r.isSigned)(e)) {
                        const t = (0, n.bytesToSignedBigInt)(s);
                        return (0, r.assertNumberLength)(t, e), t;
                      }
                      const i = (0, n.bytesToBigInt)(s);
                      return (0, r.assertNumberLength)(i, e), i;
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/number.js',
      },
    ],
    [
      1854,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/parser.js',
      },
    ],
    [
      1855,
      { './bytes': 1849, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.string = void 0);
                const n = e('@metamask/utils'),
                  s = e('./bytes');
                r.string = {
                  isDynamic: !0,
                  isType: e => 'string' === e,
                  getByteLength: () => 32,
                  encode: ({ buffer: e, value: t, packed: r, tight: i }) =>
                    s.bytes.encode({
                      type: 'bytes',
                      buffer: e,
                      value: (0, n.stringToBytes)(t),
                      packed: r,
                      tight: i,
                    }),
                  decode: e => (0, n.bytesToString)(s.bytes.decode(e)),
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/string.js',
      },
    ],
    [
      1856,
      { '../errors': 1842, '../packer': 1845, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.tuple = r.getTupleElements = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../packer'),
                  a = /^\((.+)\)$/u;
                (r.getTupleElements = e => {
                  (0, n.assert)(
                    e.startsWith('(') && e.endsWith(')'),
                    new s.ParserError(
                      `Invalid tuple type. Expected tuple type, but received "${e}".`
                    )
                  );
                  const t = [];
                  let r = '',
                    i = 0;
                  for (let n = 1; n < e.length - 1; n++) {
                    const s = e[n];
                    ',' === s && 0 === i
                      ? (t.push(r.trim()), (r = ''))
                      : ((r += s), '(' === s ? (i += 1) : ')' === s && (i -= 1));
                  }
                  return r.trim() && t.push(r.trim()), t;
                }),
                  (r.tuple = {
                    isDynamic: e =>
                      (0, r.getTupleElements)(e).some(e => {
                        const t = (0, i.getParser)(e);
                        return (0, i.isDynamicParser)(t, e);
                      }),
                    isType: e => (e => a.test(e))(e),
                    getByteLength(e) {
                      if ((0, i.isDynamicParser)(this, e)) return 32;
                      return (0, r.getTupleElements)(e).reduce(
                        (e, t) => e + (0, i.getParser)(t).getByteLength(t),
                        0
                      );
                    },
                    encode({ type: e, buffer: t, value: n, packed: s, tight: a }) {
                      const o = (0, r.getTupleElements)(e);
                      return (0, i.pack)({
                        types: o,
                        values: n,
                        byteArray: t,
                        packed: s,
                        tight: a,
                      });
                    },
                    decode({ type: e, value: t, skip: n }) {
                      const s = (0, r.getTupleElements)(e);
                      return n(this.getByteLength(e) - 32), (0, i.unpack)(s, t);
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/parsers/tuple.js',
      },
    ],
    [
      1857,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/types/abi.js',
      },
    ],
    [
      1858,
      { './abi': 1857 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), s(e('./abi'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/types/index.js',
      },
    ],
    [
      1859,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.padEnd = r.padStart = r.set = void 0);
                const n = e('@metamask/utils');
                r.set = (e, t, r) =>
                  (0, n.concatBytes)([e.subarray(0, r), t, e.subarray(r + t.length)]);
                r.padStart = (e, t = 32) => {
                  const r = new Uint8Array(Math.max(t - e.length, 0)).fill(0);
                  return (0, n.concatBytes)([r, e]);
                };
                r.padEnd = (e, t = 32) => {
                  const r = new Uint8Array(Math.max(t - e.length, 0)).fill(0);
                  return (0, n.concatBytes)([e, r]);
                };
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/utils/buffer.js',
      },
    ],
    [
      1860,
      { './buffer': 1859 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), s(e('./buffer'), r);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/abi-utils/dist/utils/index.js',
      },
    ],
    [
      1861,
      { './utils': 1866, '@scure/base': 1867, buffer: 4139, tweetnacl: 5686 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    var n =
                        (this && this.__createBinding) ||
                        (Object.create
                          ? function (e, t, r, n) {
                              n === undefined && (n = r);
                              var s = Object.getOwnPropertyDescriptor(t, r);
                              (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                                (s = {
                                  enumerable: !0,
                                  get: function () {
                                    return t[r];
                                  },
                                }),
                                Object.defineProperty(e, n, s);
                            }
                          : function (e, t, r, n) {
                              n === undefined && (n = r), (e[n] = t[r]);
                            }),
                      s =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                          ? function (e, t) {
                              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                            }
                          : function (e, t) {
                              e.default = t;
                            }),
                      i =
                        (this && this.__importStar) ||
                        function (e) {
                          if (e && e.__esModule) return e;
                          var t = {};
                          if (null != e)
                            for (var r in e)
                              'default' !== r &&
                                Object.prototype.hasOwnProperty.call(e, r) &&
                                n(t, e, r);
                          return s(t, e), t;
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.getEncryptionPublicKey =
                        r.decryptSafely =
                        r.decrypt =
                        r.encryptSafely =
                        r.encrypt =
                          void 0);
                    const a = e('@scure/base'),
                      o = i(e('tweetnacl')),
                      c = e('./utils');
                    function u({ publicKey: e, data: t, version: r }) {
                      if ((0, c.isNullish)(e)) throw new Error('Missing publicKey parameter');
                      if ((0, c.isNullish)(t)) throw new Error('Missing data parameter');
                      if ((0, c.isNullish)(r)) throw new Error('Missing version parameter');
                      if ('x25519-xsalsa20-poly1305' === r) {
                        if ('string' != typeof t)
                          throw new Error('Message data must be given as a string');
                        const r = o.box.keyPair();
                        let n;
                        try {
                          n = a.base64.decode(e);
                        } catch (e) {
                          throw new Error('Bad public key');
                        }
                        const s = a.utf8.decode(t),
                          i = o.randomBytes(o.box.nonceLength),
                          c = o.box(s, i, n, r.secretKey);
                        return {
                          version: 'x25519-xsalsa20-poly1305',
                          nonce: a.base64.encode(i),
                          ephemPublicKey: a.base64.encode(r.publicKey),
                          ciphertext: a.base64.encode(c),
                        };
                      }
                      throw new Error('Encryption type/version not supported');
                    }
                    function d({ encryptedData: e, privateKey: r }) {
                      if ((0, c.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                      if ((0, c.isNullish)(r)) throw new Error('Missing privateKey parameter');
                      if ('x25519-xsalsa20-poly1305' === e.version) {
                        const n = t.from(r, 'hex'),
                          s = o.box.keyPair.fromSecretKey(n).secretKey,
                          i = a.base64.decode(e.nonce),
                          c = a.base64.decode(e.ciphertext),
                          u = a.base64.decode(e.ephemPublicKey),
                          d = o.box.open(c, i, u, s);
                        try {
                          if (!d) throw new Error();
                          const e = a.utf8.encode(d);
                          if (!e) throw new Error();
                          return e;
                        } catch (e) {
                          if (e && 'string' == typeof e.message && e.message.length)
                            throw new Error(`Decryption failed: ${e.message}`);
                          throw new Error('Decryption failed.');
                        }
                      }
                      throw new Error('Encryption type/version not supported.');
                    }
                    (r.encrypt = u),
                      (r.encryptSafely = function ({ publicKey: e, data: r, version: n }) {
                        if ((0, c.isNullish)(e)) throw new Error('Missing publicKey parameter');
                        if ((0, c.isNullish)(r)) throw new Error('Missing data parameter');
                        if ((0, c.isNullish)(n)) throw new Error('Missing version parameter');
                        if ('object' == typeof r && r && 'toJSON' in r)
                          throw new Error(
                            'Cannot encrypt with toJSON property.  Please remove toJSON property'
                          );
                        const s = { data: r, padding: '' },
                          i = t.byteLength(JSON.stringify(s), 'utf-8') % 2048;
                        let a = 0;
                        return (
                          i > 0 && (a = 2048 - i - 16),
                          (s.padding = '0'.repeat(a)),
                          u({ publicKey: e, data: JSON.stringify(s), version: n })
                        );
                      }),
                      (r.decrypt = d),
                      (r.decryptSafely = function ({ encryptedData: e, privateKey: t }) {
                        if ((0, c.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                        if ((0, c.isNullish)(t)) throw new Error('Missing privateKey parameter');
                        return JSON.parse(d({ encryptedData: e, privateKey: t })).data;
                      }),
                      (r.getEncryptionPublicKey = function (e) {
                        const r = t.from(e, 'hex'),
                          n = o.box.keyPair.fromSecretKey(r).publicKey;
                        return a.base64.encode(n);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/eth-sig-util/dist/encryption.js',
      },
    ],
    [
      1862,
      {
        './encryption': 1861,
        './personal-sign': 1863,
        './sign-eip7702-authorization': 1864,
        './sign-typed-data': 1865,
        './utils': 1866,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.normalize = r.concatSig = void 0),
                  s(e('./personal-sign'), r),
                  s(e('./sign-typed-data'), r),
                  s(e('./encryption'), r),
                  s(e('./sign-eip7702-authorization'), r);
                var i = e('./utils');
                Object.defineProperty(r, 'concatSig', {
                  enumerable: !0,
                  get: function () {
                    return i.concatSig;
                  },
                }),
                  Object.defineProperty(r, 'normalize', {
                    enumerable: !0,
                    get: function () {
                      return i.normalize;
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/eth-sig-util/dist/index.js',
      },
    ],
    [
      1863,
      { './utils': 1866, '@ethereumjs/util': 1833 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.extractPublicKey = r.recoverPersonalSignature = r.personalSign = void 0);
                const n = e('@ethereumjs/util'),
                  s = e('./utils');
                function i(e, t) {
                  const r = (0, n.hashPersonalMessage)((0, s.legacyToBuffer)(e));
                  return (0, s.recoverPublicKey)(r, t);
                }
                (r.personalSign = function ({ privateKey: e, data: t }) {
                  if ((0, s.isNullish)(t)) throw new Error('Missing data parameter');
                  if ((0, s.isNullish)(e)) throw new Error('Missing privateKey parameter');
                  const r = (0, s.legacyToBuffer)(t),
                    i = (0, n.hashPersonalMessage)(r),
                    a = (0, n.ecsign)(i, e);
                  return (0, s.concatSig)((0, n.toBuffer)(a.v), a.r, a.s);
                }),
                  (r.recoverPersonalSignature = function ({ data: e, signature: t }) {
                    if ((0, s.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, s.isNullish)(t)) throw new Error('Missing signature parameter');
                    const r = i(e, t),
                      a = (0, n.publicToAddress)(r);
                    return (0, n.bufferToHex)(a);
                  }),
                  (r.extractPublicKey = function ({ data: e, signature: t }) {
                    if ((0, s.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, s.isNullish)(t)) throw new Error('Missing signature parameter');
                    return `0x${i(e, t).toString('hex')}`;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/eth-sig-util/dist/personal-sign.js',
      },
    ],
    [
      1864,
      {
        './utils': 1866,
        '@ethereumjs/rlp': 449,
        '@ethereumjs/util': 1833,
        '@metamask/utils': 2995,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.hashEIP7702Authorization =
                        r.recoverEIP7702Authorization =
                        r.signEIP7702Authorization =
                          void 0);
                    const n = e('@ethereumjs/rlp'),
                      s = e('@ethereumjs/util'),
                      i = e('@metamask/utils'),
                      a = e('ethereum-cryptography/keccak'),
                      o = e('./utils');
                    function c(e) {
                      u(e);
                      const r = (0, n.encode)(e),
                        s = t.concat([t.from('05', 'hex'), r]);
                      return t.from((0, a.keccak256)(s));
                    }
                    function u(e) {
                      if ((0, o.isNullish)(e)) throw new Error('Missing authorization parameter');
                      const [t, r, n] = e;
                      if ((0, o.isNullish)(t)) throw new Error('Missing chainId parameter');
                      if ((0, o.isNullish)(r)) throw new Error('Missing contractAddress parameter');
                      if ((0, o.isNullish)(n)) throw new Error('Missing nonce parameter');
                    }
                    (r.signEIP7702Authorization = function ({ privateKey: e, authorization: t }) {
                      if ((u(t), (0, o.isNullish)(e)))
                        throw new Error('Missing privateKey parameter');
                      const r = c(t),
                        { r: n, s: i, v: a } = (0, s.ecsign)(r, e),
                        d = (0, s.toBuffer)(a);
                      return (0, o.concatSig)(d, n, i);
                    }),
                      (r.recoverEIP7702Authorization = function ({
                        signature: e,
                        authorization: t,
                      }) {
                        if ((u(t), (0, o.isNullish)(e)))
                          throw new Error('Missing signature parameter');
                        const r = c(t),
                          n = (0, o.recoverPublicKey)(r, e),
                          a = (0, s.publicToAddress)(n);
                        return (0, i.bytesToHex)(a);
                      }),
                      (r.hashEIP7702Authorization = c);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/eth-sig-util/dist/sign-eip7702-authorization.js',
      },
    ],
    [
      1865,
      {
        './utils': 1866,
        '@ethereumjs/util': 1833,
        '@metamask/abi-utils': 1843,
        '@metamask/abi-utils/dist/parsers': 1852,
        '@metamask/abi-utils/dist/utils': 1860,
        '@metamask/utils': 2995,
        'ethereum-cryptography/keccak': 4366,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.recoverTypedSignature =
                    r.signTypedData =
                    r.typedSignatureHash =
                    r.TypedDataUtils =
                    r.TYPED_MESSAGE_SCHEMA =
                    r.SignTypedDataVersion =
                      void 0);
                const n = e('@ethereumjs/util'),
                  s = e('@metamask/abi-utils'),
                  i = e('@metamask/abi-utils/dist/parsers'),
                  a = e('@metamask/abi-utils/dist/utils'),
                  o = e('@metamask/utils'),
                  c = e('ethereum-cryptography/keccak'),
                  u = e('./utils');
                var d;
                function l(e, t) {
                  if (!Object.keys(d).includes(e)) throw new Error(`Invalid version: '${e}'`);
                  if (t && !t.includes(e))
                    throw new Error(
                      `SignTypedDataVersion not allowed: '${e}'. Allowed versions are: ${t.join(', ')}`
                    );
                }
                function f(e, t) {
                  (0, o.assert)(
                    null !== t,
                    `Unable to encode value: Invalid number. Expected a valid number value, but received "${t}".`
                  );
                  const r = BigInt(t),
                    n = (0, i.getLength)(e),
                    s = BigInt(2) ** BigInt(n) - BigInt(1);
                  return (
                    (0, o.assert)(
                      r >= -s && r <= s,
                      `Unable to encode value: Number "${t}" is out of range for type "${e}".`
                    ),
                    r
                  );
                }
                function h(e) {
                  let t = BigInt(0);
                  for (let r = 0; r < e.length; r++) {
                    const n = BigInt(e.charCodeAt(r) - 48);
                    (t *= BigInt(10)),
                      (t +=
                        n >= 49
                          ? n - BigInt(49) + BigInt(10)
                          : n >= 17
                            ? n - BigInt(17) + BigInt(10)
                            : n);
                  }
                  return (0, a.padStart)((0, o.bigIntToBytes)(t), 20);
                }
                function p(e, t, r, i, u) {
                  if ((l(u, [d.V3, d.V4]), e[r] !== undefined))
                    return [
                      'bytes32',
                      u === d.V4 && null == i
                        ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                        : (0, n.arrToBufArr)((0, c.keccak256)(m(r, i, e, u))),
                    ];
                  if ('function' === r) throw new Error('Unsupported or invalid type: "function"');
                  if (i === undefined) throw new Error(`missing value for field ${t} of type ${r}`);
                  if ('address' === r) {
                    if ('number' == typeof i)
                      return ['address', (0, a.padStart)((0, o.numberToBytes)(i), 20)];
                    if ((0, o.isStrictHexString)(i)) return ['address', (0, o.add0x)(i)];
                    if ('string' == typeof i) return ['address', h(i).subarray(0, 20)];
                  }
                  if ('bool' === r) return ['bool', Boolean(i)];
                  if ('bytes' === r)
                    return (
                      'number' == typeof i
                        ? (i = (0, o.numberToBytes)(i))
                        : (0, o.isStrictHexString)(i) || '0x' === i
                          ? (i = (0, o.hexToBytes)(i))
                          : 'string' == typeof i && (i = (0, o.stringToBytes)(i)),
                      ['bytes32', (0, n.arrToBufArr)((0, c.keccak256)(i))]
                    );
                  if (r.startsWith('bytes') && 'bytes' !== r && !r.includes('['))
                    return 'number' == typeof i
                      ? i < 0
                        ? ['bytes32', new Uint8Array(32)]
                        : ['bytes32', (0, o.bigIntToBytes)(BigInt(i))]
                      : (0, o.isStrictHexString)(i)
                        ? ['bytes32', (0, o.hexToBytes)(i)]
                        : ['bytes32', i];
                  if (r.startsWith('int') && !r.includes('[')) {
                    const e = f(r, i);
                    return e >= BigInt(0) ? ['uint256', e] : ['int256', e];
                  }
                  if ('string' === r)
                    return (
                      (i =
                        'number' == typeof i
                          ? (0, o.numberToBytes)(i)
                          : (0, o.stringToBytes)(null != i ? i : '')),
                      ['bytes32', (0, n.arrToBufArr)((0, c.keccak256)(i))]
                    );
                  if (r.endsWith(']')) {
                    if (u === d.V3)
                      throw new Error('Arrays are unimplemented in encodeData; use V4 extension');
                    const a = r.slice(0, r.lastIndexOf('[')),
                      o = i.map(r => p(e, t, a, r, u));
                    return [
                      'bytes32',
                      (0, n.arrToBufArr)(
                        (0, c.keccak256)(
                          (0, s.encode)(
                            o.map(([e]) => e),
                            o.map(([, e]) => e)
                          )
                        )
                      ),
                    ];
                  }
                  return [r, i];
                }
                function m(e, t, r, i) {
                  l(i, [d.V3, d.V4]);
                  const a = ['bytes32'],
                    o = [w(e, r)];
                  for (const n of r[e]) {
                    if (i === d.V3 && t[n.name] === undefined) continue;
                    const [e, s] = p(r, n.name, n.type, t[n.name], i);
                    a.push(e), o.push(s);
                  }
                  return (0, n.arrToBufArr)((0, s.encode)(a, o));
                }
                function g(e, t) {
                  let r = '';
                  const n = y(e, t);
                  n.delete(e);
                  const s = [e, ...Array.from(n).sort()];
                  for (const e of s) {
                    if (!t[e]) throw new Error(`No type definition specified: ${e}`);
                    r += `${e}(${t[e].map(({ name: e, type: t }) => `${t} ${e}`).join(',')})`;
                  }
                  return r;
                }
                function y(e, t, r = new Set()) {
                  if ('string' != typeof e)
                    throw new Error(`Invalid findTypeDependencies input ${JSON.stringify(e)}`);
                  const n = e.match(/^\w*/u);
                  if ((([e] = n), r.has(e) || t[e] === undefined)) return r;
                  r.add(e);
                  for (const n of t[e]) y(n.type, t, r);
                  return r;
                }
                function b(e, t, r, s) {
                  l(s, [d.V3, d.V4]);
                  const i = m(e, t, r, s),
                    a = (0, c.keccak256)(i);
                  return (0, n.arrToBufArr)(a);
                }
                function w(e, t) {
                  const r = (0, o.stringToBytes)(g(e, t));
                  return (0, n.arrToBufArr)((0, c.keccak256)(r));
                }
                function v(e) {
                  const t = {};
                  for (const n in r.TYPED_MESSAGE_SCHEMA.properties) e[n] && (t[n] = e[n]);
                  return (
                    'types' in t && (t.types = Object.assign({ EIP712Domain: [] }, t.types)), t
                  );
                }
                function k(e, t) {
                  l(t, [d.V3, d.V4]);
                  const r = v(e),
                    { domain: n } = r;
                  return b('EIP712Domain', n, { EIP712Domain: r.types.EIP712Domain }, t);
                }
                function T(e, t) {
                  if ((0, i.isArrayType)(e) && Array.isArray(t)) {
                    const [r] = (0, i.getArrayType)(e);
                    return t.map(e => T(r, e));
                  }
                  if ('address' === e) {
                    if ((0, o.isStrictHexString)(t))
                      return (0, a.padStart)((0, o.hexToBytes)(t).subarray(0, 20), 20);
                    if (t instanceof Uint8Array) return (0, a.padStart)(t.subarray(0, 20), 20);
                  }
                  if ('bool' === e) return Boolean(t);
                  if (e.startsWith('bytes') && 'bytes' !== e) {
                    const r = (0, i.getByteLength)(e);
                    if ('number' == typeof t)
                      return t < 0 ? new Uint8Array() : (0, o.numberToBytes)(t).subarray(0, r);
                    if ((0, o.isStrictHexString)(t)) return (0, o.hexToBytes)(t).subarray(0, r);
                    if (t instanceof Uint8Array) return t.subarray(0, r);
                  }
                  if (e.startsWith('uint') && 'number' == typeof t) return Math.abs(t);
                  if (e.startsWith('int') && 'number' == typeof t) {
                    const r = (0, i.getLength)(e);
                    return BigInt.asIntN(r, BigInt(t));
                  }
                  return t;
                }
                function E(e, t) {
                  return t.map(t => {
                    if ('string' == typeof t || 'number' == typeof t || 'bigint' == typeof t) {
                      const r = f(e, t);
                      if (r >= BigInt(0)) return (0, a.padStart)((0, o.bigIntToBytes)(r), 32);
                      const n = (0, i.getLength)(e),
                        s = BigInt.asIntN(n, r);
                      return (0, o.signedBigIntToBytes)(s, 32);
                    }
                    return t;
                  });
                }
                function A(e) {
                  const t = new Error('Expect argument to be non-empty array');
                  if ('object' != typeof e || !('length' in e) || !e.length) throw t;
                  const r = e.map(({ name: e, type: t, value: r }) => {
                      if ('address[]' === t)
                        return {
                          name: e,
                          type: 'bytes32[]',
                          value:
                            ((n = r),
                            n.map(e =>
                              'number' == typeof e
                                ? (0, a.padStart)((0, o.numberToBytes)(e), 32)
                                : (0, o.isStrictHexString)(e)
                                  ? (0, a.padStart)((0, o.hexToBytes)(e).subarray(0, 32), 32)
                                  : e instanceof Uint8Array
                                    ? (0, a.padStart)(e.subarray(0, 32), 32)
                                    : e
                            )),
                        };
                      var n;
                      if (t.startsWith('int') && (0, i.isArrayType)(t)) {
                        const [n, s] = (0, i.getArrayType)(t);
                        return { name: e, type: `bytes32[${null != s ? s : ''}]`, value: E(n, r) };
                      }
                      return { name: e, type: t, value: T(t, r) };
                    }),
                    d = r.map(e => ('bytes' !== e.type ? e.value : (0, u.legacyToBuffer)(e.value))),
                    l = r.map(e => {
                      if ('function' === e.type)
                        throw new Error('Unsupported or invalid type: "function"');
                      return e.type;
                    }),
                    f = e.map(e => {
                      if (!e.name) throw t;
                      return `${e.type} ${e.name}`;
                    });
                  return (0, n.arrToBufArr)(
                    (0, c.keccak256)(
                      (0, s.encodePacked)(
                        ['bytes32', 'bytes32'],
                        [
                          (0, c.keccak256)((0, s.encodePacked)(['string[]'], [f], !0)),
                          (0, c.keccak256)((0, s.encodePacked)(l, d, !0)),
                        ]
                      )
                    )
                  );
                }
                !(function (e) {
                  (e.V1 = 'V1'), (e.V3 = 'V3'), (e.V4 = 'V4');
                })((d = r.SignTypedDataVersion || (r.SignTypedDataVersion = {}))),
                  (r.TYPED_MESSAGE_SCHEMA = {
                    type: 'object',
                    properties: {
                      types: {
                        type: 'object',
                        additionalProperties: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: { name: { type: 'string' }, type: { type: 'string' } },
                            required: ['name', 'type'],
                          },
                        },
                      },
                      primaryType: { type: 'string' },
                      domain: { type: 'object' },
                      message: { type: 'object' },
                    },
                    required: ['types', 'primaryType', 'domain', 'message'],
                  }),
                  (r.TypedDataUtils = {
                    encodeData: m,
                    encodeType: g,
                    findTypeDependencies: y,
                    hashStruct: b,
                    hashType: w,
                    sanitizeData: v,
                    eip712Hash: function (e, t) {
                      l(t, [d.V3, d.V4]);
                      const r = v(e),
                        s = [(0, o.hexToBytes)('1901')];
                      return (
                        s.push(k(e, t)),
                        'EIP712Domain' !== r.primaryType &&
                          s.push(b(r.primaryType, r.message, r.types, t)),
                        (0, n.arrToBufArr)((0, c.keccak256)((0, o.concatBytes)(s)))
                      );
                    },
                    eip712DomainHash: k,
                  }),
                  (r.typedSignatureHash = function (e) {
                    const t = A(e);
                    return (0, o.bytesToHex)(t);
                  }),
                  (r.signTypedData = function ({ privateKey: e, data: t, version: s }) {
                    if ((l(s), (0, u.isNullish)(t))) throw new Error('Missing data parameter');
                    if ((0, u.isNullish)(e)) throw new Error('Missing private key parameter');
                    const i = s === d.V1 ? A(t) : r.TypedDataUtils.eip712Hash(t, s),
                      a = (0, n.ecsign)(i, e);
                    return (0, u.concatSig)(
                      (0, n.arrToBufArr)((0, o.bigIntToBytes)(a.v)),
                      a.r,
                      a.s
                    );
                  }),
                  (r.recoverTypedSignature = function ({ data: e, signature: t, version: s }) {
                    if ((l(s), (0, u.isNullish)(e))) throw new Error('Missing data parameter');
                    if ((0, u.isNullish)(t)) throw new Error('Missing signature parameter');
                    const i = s === d.V1 ? A(e) : r.TypedDataUtils.eip712Hash(e, s),
                      a = (0, u.recoverPublicKey)(i, t),
                      c = (0, n.publicToAddress)(a);
                    return (0, o.bytesToHex)(c);
                  });
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/eth-sig-util/dist/sign-typed-data.js',
      },
    ],
    [
      1866,
      { '@ethereumjs/util': 1833, '@metamask/utils': 2995, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.normalize =
                        r.recoverPublicKey =
                        r.concatSig =
                        r.legacyToBuffer =
                        r.isNullish =
                        r.padWithZeroes =
                          void 0);
                    const n = e('@ethereumjs/util'),
                      s = e('@metamask/utils');
                    function i(e, t) {
                      if ('' !== e && !/^[a-f0-9]+$/iu.test(e))
                        throw new Error(`Expected an unprefixed hex string. Received: ${e}`);
                      if (t < 0)
                        throw new Error(
                          `Expected a non-negative integer target length. Received: ${t}`
                        );
                      return String.prototype.padStart.call(e, t, '0');
                    }
                    function a(e) {
                      return null === e || e === undefined;
                    }
                    (r.padWithZeroes = i),
                      (r.isNullish = a),
                      (r.legacyToBuffer = function (e) {
                        return 'string' != typeof e || (0, n.isHexString)(e)
                          ? (0, n.toBuffer)(e)
                          : t.from(e);
                      }),
                      (r.concatSig = function (e, t, r) {
                        const a = (0, n.fromSigned)(t),
                          o = (0, n.fromSigned)(r),
                          c = (0, n.bufferToInt)(e),
                          u = i((0, n.toUnsigned)(a).toString('hex'), 64),
                          d = i((0, n.toUnsigned)(o).toString('hex'), 64),
                          l = (0, s.remove0x)((0, s.numberToHex)(c));
                        return (0, s.add0x)(u.concat(d, l));
                      }),
                      (r.recoverPublicKey = function (e, t) {
                        const r = (0, n.fromRpcSig)(t);
                        return (0, n.ecrecover)(e, r.v, r.r, r.s);
                      }),
                      (r.normalize = function (e) {
                        if (a(e)) return undefined;
                        if ('number' == typeof e) {
                          if (e < 0) return '0x';
                          const t = (0, s.numberToBytes)(e);
                          e = (0, s.bytesToHex)(t);
                        }
                        if ('string' != typeof e) {
                          let t = 'eth-sig-util.normalize() requires hex string or integer input.';
                          throw ((t += ` received ${typeof e}: ${e}`), new Error(t));
                        }
                        return (0, s.add0x)(e.toLowerCase());
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@metamask/eth-sig-util/dist/utils.js',
      },
    ],
    [
      1867,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e) {
                  if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
                }
                function s(e) {
                  return (
                    e instanceof Uint8Array ||
                    (null != e && 'object' == typeof e && 'Uint8Array' === e.constructor.name)
                  );
                }
                function i(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function a(e) {
                  return {
                    encode: t => {
                      if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                        throw new Error('alphabet.encode input should be an array of numbers');
                      return t.map(t => {
                        if ((n(t), t < 0 || t >= e.length))
                          throw new Error(
                            `Digit index outside alphabet: ${t} (alphabet: ${e.length})`
                          );
                        return e[t];
                      });
                    },
                    decode: t => {
                      if (!Array.isArray(t) || (t.length && 'string' != typeof t[0]))
                        throw new Error('alphabet.decode input should be array of strings');
                      return t.map(t => {
                        if ('string' != typeof t)
                          throw new Error(`alphabet.decode: not string element=${t}`);
                        const r = e.indexOf(t);
                        if (-1 === r) throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                        return r;
                      });
                    },
                  };
                }
                function o(e = '') {
                  if ('string' != typeof e) throw new Error('join separator should be string');
                  return {
                    encode: t => {
                      if (!Array.isArray(t) || (t.length && 'string' != typeof t[0]))
                        throw new Error('join.encode input should be array of strings');
                      for (let e of t)
                        if ('string' != typeof e)
                          throw new Error(`join.encode: non-string input=${e}`);
                      return t.join(e);
                    },
                    decode: t => {
                      if ('string' != typeof t)
                        throw new Error('join.decode input should be string');
                      return t.split(e);
                    },
                  };
                }
                function c(e, t = '=') {
                  if ((n(e), 'string' != typeof t)) throw new Error('padding chr should be string');
                  return {
                    encode(r) {
                      if (!Array.isArray(r) || (r.length && 'string' != typeof r[0]))
                        throw new Error('padding.encode input should be array of strings');
                      for (let e of r)
                        if ('string' != typeof e)
                          throw new Error(`padding.encode: non-string input=${e}`);
                      for (; (r.length * e) % 8; ) r.push(t);
                      return r;
                    },
                    decode(r) {
                      if (!Array.isArray(r) || (r.length && 'string' != typeof r[0]))
                        throw new Error('padding.encode input should be array of strings');
                      for (let e of r)
                        if ('string' != typeof e)
                          throw new Error(`padding.decode: non-string input=${e}`);
                      let n = r.length;
                      if ((n * e) % 8)
                        throw new Error(
                          'Invalid padding: string should have whole number of bytes'
                        );
                      for (; n > 0 && r[n - 1] === t; n--)
                        if (!(((n - 1) * e) % 8))
                          throw new Error('Invalid padding: string has too much padding');
                      return r.slice(0, n);
                    },
                  };
                }
                function u(e) {
                  if ('function' != typeof e) throw new Error('normalize fn should be function');
                  return { encode: e => e, decode: t => e(t) };
                }
                function d(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
                  if (!e.length) return [];
                  let s = 0;
                  const i = [],
                    a = Array.from(e);
                  for (
                    a.forEach(e => {
                      if ((n(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
                    });
                    ;

                  ) {
                    let e = 0,
                      n = !0;
                    for (let i = s; i < a.length; i++) {
                      const o = a[i],
                        c = t * e + o;
                      if (!Number.isSafeInteger(c) || (t * e) / t !== e || c - o != t * e)
                        throw new Error('convertRadix: carry overflow');
                      e = c % r;
                      const u = Math.floor(c / r);
                      if (((a[i] = u), !Number.isSafeInteger(u) || u * r + e !== c))
                        throw new Error('convertRadix: carry overflow');
                      n && (u ? (n = !1) : (s = i));
                    }
                    if ((i.push(e), n)) break;
                  }
                  for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) i.push(0);
                  return i.reverse();
                }
                /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.bytes =
                    r.stringToBytes =
                    r.str =
                    r.bytesToString =
                    r.hex =
                    r.utf8 =
                    r.bech32m =
                    r.bech32 =
                    r.base58check =
                    r.createBase58check =
                    r.base58xmr =
                    r.base58xrp =
                    r.base58flickr =
                    r.base58 =
                    r.base64urlnopad =
                    r.base64url =
                    r.base64nopad =
                    r.base64 =
                    r.base32crockford =
                    r.base32hexnopad =
                    r.base32hex =
                    r.base32nopad =
                    r.base32 =
                    r.base16 =
                    r.utils =
                      void 0),
                  (r.assertNumber = n);
                const l = (e, t) => (t ? l(t, e % t) : e),
                  f = (e, t) => e + (t - l(e, t));
                function h(e, t, r, s) {
                  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
                  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (f(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${f(t, r)}`
                    );
                  let i = 0,
                    a = 0;
                  const o = 2 ** r - 1,
                    c = [];
                  for (const s of e) {
                    if ((n(s), s >= 2 ** t))
                      throw new Error(`convertRadix2: invalid data word=${s} from=${t}`);
                    if (((i = (i << t) | s), a + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${a} from=${t}`);
                    for (a += t; a >= r; a -= r) c.push(((i >> (a - r)) & o) >>> 0);
                    i &= 2 ** a - 1;
                  }
                  if (((i = (i << (r - a)) & o), !s && a >= t)) throw new Error('Excess padding');
                  if (!s && i) throw new Error(`Non-zero padding: ${i}`);
                  return s && a > 0 && c.push(i >>> 0), c;
                }
                function p(e) {
                  return (
                    n(e),
                    {
                      encode: t => {
                        if (!s(t)) throw new Error('radix.encode input should be Uint8Array');
                        return d(Array.from(t), 256, e);
                      },
                      decode: t => {
                        if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                          throw new Error('radix.decode input should be array of numbers');
                        return Uint8Array.from(d(t, e, 256));
                      },
                    }
                  );
                }
                function m(e, t = !1) {
                  if ((n(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (f(8, e) > 32 || f(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!s(r)) throw new Error('radix2.encode input should be Uint8Array');
                      return h(Array.from(r), 8, e, !t);
                    },
                    decode: r => {
                      if (!Array.isArray(r) || (r.length && 'number' != typeof r[0]))
                        throw new Error('radix2.decode input should be array of numbers');
                      return Uint8Array.from(h(r, e, 8, t));
                    },
                  };
                }
                function g(e) {
                  if ('function' != typeof e)
                    throw new Error('unsafeWrapper fn should be function');
                  return function (...t) {
                    try {
                      return e.apply(null, t);
                    } catch (e) {}
                  };
                }
                function y(e, t) {
                  if ((n(e), 'function' != typeof t))
                    throw new Error('checksum fn should be function');
                  return {
                    encode(r) {
                      if (!s(r)) throw new Error('checksum.encode: input should be Uint8Array');
                      const n = t(r).slice(0, e),
                        i = new Uint8Array(r.length + e);
                      return i.set(r), i.set(n, r.length), i;
                    },
                    decode(r) {
                      if (!s(r)) throw new Error('checksum.decode: input should be Uint8Array');
                      const n = r.slice(0, -e),
                        i = t(n).slice(0, e),
                        a = r.slice(-e);
                      for (let t = 0; t < e; t++)
                        if (i[t] !== a[t]) throw new Error('Invalid checksum');
                      return n;
                    },
                  };
                }
                (r.utils = {
                  alphabet: a,
                  chain: i,
                  checksum: y,
                  convertRadix: d,
                  convertRadix2: h,
                  radix: p,
                  radix2: m,
                  join: o,
                  padding: c,
                }),
                  (r.base16 = i(m(4), a('0123456789ABCDEF'), o(''))),
                  (r.base32 = i(m(5), a('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), c(5), o(''))),
                  (r.base32nopad = i(m(5), a('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), o(''))),
                  (r.base32hex = i(m(5), a('0123456789ABCDEFGHIJKLMNOPQRSTUV'), c(5), o(''))),
                  (r.base32hexnopad = i(m(5), a('0123456789ABCDEFGHIJKLMNOPQRSTUV'), o(''))),
                  (r.base32crockford = i(
                    m(5),
                    a('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    o(''),
                    u(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  )),
                  (r.base64 = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    c(6),
                    o('')
                  )),
                  (r.base64nopad = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    o('')
                  )),
                  (r.base64url = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    c(6),
                    o('')
                  )),
                  (r.base64urlnopad = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    o('')
                  ));
                const b = e => i(p(58), a(e), o(''));
                (r.base58 = b('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')),
                  (r.base58flickr = b(
                    '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
                  )),
                  (r.base58xrp = b('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'));
                const w = [0, 2, 3, 5, 6, 7, 9, 10, 11];
                r.base58xmr = {
                  encode(e) {
                    let t = '';
                    for (let n = 0; n < e.length; n += 8) {
                      const s = e.subarray(n, n + 8);
                      t += r.base58.encode(s).padStart(w[s.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const s = e.slice(n, n + 11),
                        i = w.indexOf(s.length),
                        a = r.base58.decode(s);
                      for (let e = 0; e < a.length - i; e++)
                        if (0 !== a[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(a.slice(a.length - i)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  i(
                    y(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const v = i(a('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), o('')),
                  k = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function T(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < k.length; e++) 1 == ((t >> e) & 1) && (r ^= k[e]);
                  return r;
                }
                function E(e, t, r = 1) {
                  const n = e.length;
                  let s = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    s = T(s) ^ (r >> 5);
                  }
                  s = T(s);
                  for (let t = 0; t < n; t++) s = T(s) ^ (31 & e.charCodeAt(t));
                  for (let e of t) s = T(s) ^ e;
                  for (let e = 0; e < 6; e++) s = T(s);
                  return (s ^= r), v.encode(h([s % 2 ** 30], 30, 5, !1));
                }
                function A(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = m(5),
                    n = r.decode,
                    s = r.encode,
                    i = g(n);
                  function a(e, r, n = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.encode prefix should be string, not ' + typeof e);
                    if (
                      (r instanceof Uint8Array && (r = Array.from(r)),
                      !Array.isArray(r) || (r.length && 'number' != typeof r[0]))
                    )
                      throw new Error(
                        'bech32.encode words should be array of numbers, not ' + typeof r
                      );
                    if (0 === e.length) throw new TypeError(`Invalid prefix length ${e.length}`);
                    const s = e.length + 7 + r.length;
                    if (!1 !== n && s > n) throw new TypeError(`Length ${s} exceeds limit ${n}`);
                    const i = e.toLowerCase(),
                      a = E(i, r, t);
                    return `${i}1${v.encode(r)}${a}`;
                  }
                  function o(e, r = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.decode input should be string, not ' + typeof e);
                    if (e.length < 8 || (!1 !== r && e.length > r))
                      throw new TypeError(
                        `Wrong string length: ${e.length} (${e}). Expected (8..${r})`
                      );
                    const n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const s = n.lastIndexOf('1');
                    if (0 === s || -1 === s)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const i = n.slice(0, s),
                      a = n.slice(s + 1);
                    if (a.length < 6) throw new Error('Data must be at least 6 characters long');
                    const o = v.decode(a).slice(0, -6),
                      c = E(i, o, t);
                    if (!a.endsWith(c))
                      throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
                    return { prefix: i, words: o };
                  }
                  return {
                    encode: a,
                    decode: o,
                    encodeFromBytes: function (e, t) {
                      return a(e, s(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = o(e, !1);
                      return { prefix: t, words: r, bytes: n(r) };
                    },
                    decodeUnsafe: g(o),
                    fromWords: n,
                    fromWordsUnsafe: i,
                    toWords: s,
                  };
                }
                (r.bech32 = A('bech32')),
                  (r.bech32m = A('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  }),
                  (r.hex = i(
                    m(4),
                    a('0123456789abcdef'),
                    o(''),
                    u(e => {
                      if ('string' != typeof e || e.length % 2)
                        throw new TypeError(
                          `hex.decode: expected string, got ${typeof e} with length ${e.length}`
                        );
                      return e.toLowerCase();
                    })
                  ));
                const _ = {
                    utf8: r.utf8,
                    hex: r.hex,
                    base16: r.base16,
                    base32: r.base32,
                    base64: r.base64,
                    base64url: r.base64url,
                    base58: r.base58,
                    base58xmr: r.base58xmr,
                  },
                  x =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !_.hasOwnProperty(e)) throw new TypeError(x);
                  if (!s(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return _[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!_.hasOwnProperty(e)) throw new TypeError(x);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return _[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>@metamask/eth-sig-util>@scure/base',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      1868,
      {
        './nil.js': 1871,
        './parse.js': 1872,
        './stringify.js': 1876,
        './v1.js': 1877,
        './v3.js': 1878,
        './v4.js': 1880,
        './v5.js': 1881,
        './validate.js': 1882,
        './version.js': 1883,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  Object.defineProperty(r, 'NIL', {
                    enumerable: !0,
                    get: function () {
                      return o.default;
                    },
                  }),
                  Object.defineProperty(r, 'parse', {
                    enumerable: !0,
                    get: function () {
                      return l.default;
                    },
                  }),
                  Object.defineProperty(r, 'stringify', {
                    enumerable: !0,
                    get: function () {
                      return d.default;
                    },
                  }),
                  Object.defineProperty(r, 'v1', {
                    enumerable: !0,
                    get: function () {
                      return n.default;
                    },
                  }),
                  Object.defineProperty(r, 'v3', {
                    enumerable: !0,
                    get: function () {
                      return s.default;
                    },
                  }),
                  Object.defineProperty(r, 'v4', {
                    enumerable: !0,
                    get: function () {
                      return i.default;
                    },
                  }),
                  Object.defineProperty(r, 'v5', {
                    enumerable: !0,
                    get: function () {
                      return a.default;
                    },
                  }),
                  Object.defineProperty(r, 'validate', {
                    enumerable: !0,
                    get: function () {
                      return u.default;
                    },
                  }),
                  Object.defineProperty(r, 'version', {
                    enumerable: !0,
                    get: function () {
                      return c.default;
                    },
                  });
                var n = f(e('./v1.js')),
                  s = f(e('./v3.js')),
                  i = f(e('./v4.js')),
                  a = f(e('./v5.js')),
                  o = f(e('./nil.js')),
                  c = f(e('./version.js')),
                  u = f(e('./validate.js')),
                  d = f(e('./stringify.js')),
                  l = f(e('./parse.js'));
                function f(e) {
                  return e && e.__esModule ? e : { default: e };
                }
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/index.js',
      },
    ],
    [
      1869,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e) {
                  return 14 + (((e + 64) >>> 9) << 4) + 1;
                }
                function s(e, t) {
                  const r = (65535 & e) + (65535 & t);
                  return (((e >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
                }
                function i(e, t, r, n, i, a) {
                  return s(((o = s(s(t, e), s(n, a))) << (c = i)) | (o >>> (32 - c)), r);
                  var o, c;
                }
                function a(e, t, r, n, s, a, o) {
                  return i((t & r) | (~t & n), e, t, s, a, o);
                }
                function o(e, t, r, n, s, a, o) {
                  return i((t & n) | (r & ~n), e, t, s, a, o);
                }
                function c(e, t, r, n, s, a, o) {
                  return i(t ^ r ^ n, e, t, s, a, o);
                }
                function u(e, t, r, n, s, a, o) {
                  return i(r ^ (t | ~n), e, t, s, a, o);
                }
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var d = function (e) {
                  if ('string' == typeof e) {
                    const t = unescape(encodeURIComponent(e));
                    e = new Uint8Array(t.length);
                    for (let r = 0; r < t.length; ++r) e[r] = t.charCodeAt(r);
                  }
                  return (function (e) {
                    const t = [],
                      r = 32 * e.length,
                      n = '0123456789abcdef';
                    for (let s = 0; s < r; s += 8) {
                      const r = (e[s >> 5] >>> s % 32) & 255,
                        i = parseInt(n.charAt((r >>> 4) & 15) + n.charAt(15 & r), 16);
                      t.push(i);
                    }
                    return t;
                  })(
                    (function (e, t) {
                      (e[t >> 5] |= 128 << t % 32), (e[n(t) - 1] = t);
                      let r = 1732584193,
                        i = -271733879,
                        d = -1732584194,
                        l = 271733878;
                      for (let t = 0; t < e.length; t += 16) {
                        const n = r,
                          f = i,
                          h = d,
                          p = l;
                        (r = a(r, i, d, l, e[t], 7, -680876936)),
                          (l = a(l, r, i, d, e[t + 1], 12, -389564586)),
                          (d = a(d, l, r, i, e[t + 2], 17, 606105819)),
                          (i = a(i, d, l, r, e[t + 3], 22, -1044525330)),
                          (r = a(r, i, d, l, e[t + 4], 7, -176418897)),
                          (l = a(l, r, i, d, e[t + 5], 12, 1200080426)),
                          (d = a(d, l, r, i, e[t + 6], 17, -1473231341)),
                          (i = a(i, d, l, r, e[t + 7], 22, -45705983)),
                          (r = a(r, i, d, l, e[t + 8], 7, 1770035416)),
                          (l = a(l, r, i, d, e[t + 9], 12, -1958414417)),
                          (d = a(d, l, r, i, e[t + 10], 17, -42063)),
                          (i = a(i, d, l, r, e[t + 11], 22, -1990404162)),
                          (r = a(r, i, d, l, e[t + 12], 7, 1804603682)),
                          (l = a(l, r, i, d, e[t + 13], 12, -40341101)),
                          (d = a(d, l, r, i, e[t + 14], 17, -1502002290)),
                          (i = a(i, d, l, r, e[t + 15], 22, 1236535329)),
                          (r = o(r, i, d, l, e[t + 1], 5, -165796510)),
                          (l = o(l, r, i, d, e[t + 6], 9, -1069501632)),
                          (d = o(d, l, r, i, e[t + 11], 14, 643717713)),
                          (i = o(i, d, l, r, e[t], 20, -373897302)),
                          (r = o(r, i, d, l, e[t + 5], 5, -701558691)),
                          (l = o(l, r, i, d, e[t + 10], 9, 38016083)),
                          (d = o(d, l, r, i, e[t + 15], 14, -660478335)),
                          (i = o(i, d, l, r, e[t + 4], 20, -405537848)),
                          (r = o(r, i, d, l, e[t + 9], 5, 568446438)),
                          (l = o(l, r, i, d, e[t + 14], 9, -1019803690)),
                          (d = o(d, l, r, i, e[t + 3], 14, -187363961)),
                          (i = o(i, d, l, r, e[t + 8], 20, 1163531501)),
                          (r = o(r, i, d, l, e[t + 13], 5, -1444681467)),
                          (l = o(l, r, i, d, e[t + 2], 9, -51403784)),
                          (d = o(d, l, r, i, e[t + 7], 14, 1735328473)),
                          (i = o(i, d, l, r, e[t + 12], 20, -1926607734)),
                          (r = c(r, i, d, l, e[t + 5], 4, -378558)),
                          (l = c(l, r, i, d, e[t + 8], 11, -2022574463)),
                          (d = c(d, l, r, i, e[t + 11], 16, 1839030562)),
                          (i = c(i, d, l, r, e[t + 14], 23, -35309556)),
                          (r = c(r, i, d, l, e[t + 1], 4, -1530992060)),
                          (l = c(l, r, i, d, e[t + 4], 11, 1272893353)),
                          (d = c(d, l, r, i, e[t + 7], 16, -155497632)),
                          (i = c(i, d, l, r, e[t + 10], 23, -1094730640)),
                          (r = c(r, i, d, l, e[t + 13], 4, 681279174)),
                          (l = c(l, r, i, d, e[t], 11, -358537222)),
                          (d = c(d, l, r, i, e[t + 3], 16, -722521979)),
                          (i = c(i, d, l, r, e[t + 6], 23, 76029189)),
                          (r = c(r, i, d, l, e[t + 9], 4, -640364487)),
                          (l = c(l, r, i, d, e[t + 12], 11, -421815835)),
                          (d = c(d, l, r, i, e[t + 15], 16, 530742520)),
                          (i = c(i, d, l, r, e[t + 2], 23, -995338651)),
                          (r = u(r, i, d, l, e[t], 6, -198630844)),
                          (l = u(l, r, i, d, e[t + 7], 10, 1126891415)),
                          (d = u(d, l, r, i, e[t + 14], 15, -1416354905)),
                          (i = u(i, d, l, r, e[t + 5], 21, -57434055)),
                          (r = u(r, i, d, l, e[t + 12], 6, 1700485571)),
                          (l = u(l, r, i, d, e[t + 3], 10, -1894986606)),
                          (d = u(d, l, r, i, e[t + 10], 15, -1051523)),
                          (i = u(i, d, l, r, e[t + 1], 21, -2054922799)),
                          (r = u(r, i, d, l, e[t + 8], 6, 1873313359)),
                          (l = u(l, r, i, d, e[t + 15], 10, -30611744)),
                          (d = u(d, l, r, i, e[t + 6], 15, -1560198380)),
                          (i = u(i, d, l, r, e[t + 13], 21, 1309151649)),
                          (r = u(r, i, d, l, e[t + 4], 6, -145523070)),
                          (l = u(l, r, i, d, e[t + 11], 10, -1120210379)),
                          (d = u(d, l, r, i, e[t + 2], 15, 718787259)),
                          (i = u(i, d, l, r, e[t + 9], 21, -343485551)),
                          (r = s(r, n)),
                          (i = s(i, f)),
                          (d = s(d, h)),
                          (l = s(l, p));
                      }
                      return [r, i, d, l];
                    })(
                      (function (e) {
                        if (0 === e.length) return [];
                        const t = 8 * e.length,
                          r = new Uint32Array(n(t));
                        for (let n = 0; n < t; n += 8) r[n >> 5] |= (255 & e[n / 8]) << n % 32;
                        return r;
                      })(e),
                      8 * e.length
                    )
                  );
                };
                r.default = d;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/md5-browser.js',
      },
    ],
    [
      1870,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n = {
                  randomUUID:
                    'undefined' != typeof crypto &&
                    crypto.randomUUID &&
                    crypto.randomUUID.bind(crypto),
                };
                r.default = n;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/native-browser.js',
      },
    ],
    [
      1871,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                r.default = '00000000-0000-0000-0000-000000000000';
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/nil.js',
      },
    ],
    [
      1872,
      { './validate.js': 1882 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n,
                  s = (n = e('./validate.js')) && n.__esModule ? n : { default: n };
                var i = function (e) {
                  if (!(0, s.default)(e)) throw TypeError('Invalid UUID');
                  let t;
                  const r = new Uint8Array(16);
                  return (
                    (r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24),
                    (r[1] = (t >>> 16) & 255),
                    (r[2] = (t >>> 8) & 255),
                    (r[3] = 255 & t),
                    (r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8),
                    (r[5] = 255 & t),
                    (r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8),
                    (r[7] = 255 & t),
                    (r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8),
                    (r[9] = 255 & t),
                    (r[10] = ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
                    (r[11] = (t / 4294967296) & 255),
                    (r[12] = (t >>> 24) & 255),
                    (r[13] = (t >>> 16) & 255),
                    (r[14] = (t >>> 8) & 255),
                    (r[15] = 255 & t),
                    r
                  );
                };
                r.default = i;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/parse.js',
      },
    ],
    [
      1873,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                r.default =
                  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/regex.js',
      },
    ],
    [
      1874,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                let n;
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.default = function () {
                    if (
                      !n &&
                      ((n =
                        'undefined' != typeof crypto &&
                        crypto.getRandomValues &&
                        crypto.getRandomValues.bind(crypto)),
                      !n)
                    )
                      throw new Error(
                        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
                      );
                    return n(s);
                  });
                const s = new Uint8Array(16);
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/rng-browser.js',
      },
    ],
    [
      1875,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e, t, r, n) {
                  switch (e) {
                    case 0:
                      return (t & r) ^ (~t & n);
                    case 1:
                    case 3:
                      return t ^ r ^ n;
                    case 2:
                      return (t & r) ^ (t & n) ^ (r & n);
                  }
                }
                function s(e, t) {
                  return (e << t) | (e >>> (32 - t));
                }
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var i = function (e) {
                  const t = [1518500249, 1859775393, 2400959708, 3395469782],
                    r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                  if ('string' == typeof e) {
                    const t = unescape(encodeURIComponent(e));
                    e = [];
                    for (let r = 0; r < t.length; ++r) e.push(t.charCodeAt(r));
                  } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
                  e.push(128);
                  const i = e.length / 4 + 2,
                    a = Math.ceil(i / 16),
                    o = new Array(a);
                  for (let t = 0; t < a; ++t) {
                    const r = new Uint32Array(16);
                    for (let n = 0; n < 16; ++n)
                      r[n] =
                        (e[64 * t + 4 * n] << 24) |
                        (e[64 * t + 4 * n + 1] << 16) |
                        (e[64 * t + 4 * n + 2] << 8) |
                        e[64 * t + 4 * n + 3];
                    o[t] = r;
                  }
                  (o[a - 1][14] = (8 * (e.length - 1)) / Math.pow(2, 32)),
                    (o[a - 1][14] = Math.floor(o[a - 1][14])),
                    (o[a - 1][15] = (8 * (e.length - 1)) & 4294967295);
                  for (let e = 0; e < a; ++e) {
                    const i = new Uint32Array(80);
                    for (let t = 0; t < 16; ++t) i[t] = o[e][t];
                    for (let e = 16; e < 80; ++e)
                      i[e] = s(i[e - 3] ^ i[e - 8] ^ i[e - 14] ^ i[e - 16], 1);
                    let a = r[0],
                      c = r[1],
                      u = r[2],
                      d = r[3],
                      l = r[4];
                    for (let e = 0; e < 80; ++e) {
                      const r = Math.floor(e / 20),
                        o = (s(a, 5) + n(r, c, u, d) + l + t[r] + i[e]) >>> 0;
                      (l = d), (d = u), (u = s(c, 30) >>> 0), (c = a), (a = o);
                    }
                    (r[0] = (r[0] + a) >>> 0),
                      (r[1] = (r[1] + c) >>> 0),
                      (r[2] = (r[2] + u) >>> 0),
                      (r[3] = (r[3] + d) >>> 0),
                      (r[4] = (r[4] + l) >>> 0);
                  }
                  return [
                    (r[0] >> 24) & 255,
                    (r[0] >> 16) & 255,
                    (r[0] >> 8) & 255,
                    255 & r[0],
                    (r[1] >> 24) & 255,
                    (r[1] >> 16) & 255,
                    (r[1] >> 8) & 255,
                    255 & r[1],
                    (r[2] >> 24) & 255,
                    (r[2] >> 16) & 255,
                    (r[2] >> 8) & 255,
                    255 & r[2],
                    (r[3] >> 24) & 255,
                    (r[3] >> 16) & 255,
                    (r[3] >> 8) & 255,
                    255 & r[3],
                    (r[4] >> 24) & 255,
                    (r[4] >> 16) & 255,
                    (r[4] >> 8) & 255,
                    255 & r[4],
                  ];
                };
                r.default = i;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/sha1-browser.js',
      },
    ],
    [
      1876,
      { './validate.js': 1882 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.default = void 0),
                  (r.unsafeStringify = a);
                var n,
                  s = (n = e('./validate.js')) && n.__esModule ? n : { default: n };
                const i = [];
                for (let e = 0; e < 256; ++e) i.push((e + 256).toString(16).slice(1));
                function a(e, t = 0) {
                  return (
                    i[e[t + 0]] +
                    i[e[t + 1]] +
                    i[e[t + 2]] +
                    i[e[t + 3]] +
                    '-' +
                    i[e[t + 4]] +
                    i[e[t + 5]] +
                    '-' +
                    i[e[t + 6]] +
                    i[e[t + 7]] +
                    '-' +
                    i[e[t + 8]] +
                    i[e[t + 9]] +
                    '-' +
                    i[e[t + 10]] +
                    i[e[t + 11]] +
                    i[e[t + 12]] +
                    i[e[t + 13]] +
                    i[e[t + 14]] +
                    i[e[t + 15]]
                  );
                }
                var o = function (e, t = 0) {
                  const r = a(e, t);
                  if (!(0, s.default)(r)) throw TypeError('Stringified UUID is invalid');
                  return r;
                };
                r.default = o;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/stringify.js',
      },
    ],
    [
      1877,
      { './rng.js': 1874, './stringify.js': 1876 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n,
                  s = (n = e('./rng.js')) && n.__esModule ? n : { default: n },
                  i = e('./stringify.js');
                let a,
                  o,
                  c = 0,
                  u = 0;
                var d = function (e, t, r) {
                  let n = (t && r) || 0;
                  const d = t || new Array(16);
                  let l = (e = e || {}).node || a,
                    f = e.clockseq !== undefined ? e.clockseq : o;
                  if (null == l || null == f) {
                    const t = e.random || (e.rng || s.default)();
                    null == l && (l = a = [1 | t[0], t[1], t[2], t[3], t[4], t[5]]),
                      null == f && (f = o = 16383 & ((t[6] << 8) | t[7]));
                  }
                  let h = e.msecs !== undefined ? e.msecs : Date.now(),
                    p = e.nsecs !== undefined ? e.nsecs : u + 1;
                  const m = h - c + (p - u) / 1e4;
                  if (
                    (m < 0 && e.clockseq === undefined && (f = (f + 1) & 16383),
                    (m < 0 || h > c) && e.nsecs === undefined && (p = 0),
                    p >= 1e4)
                  )
                    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                  (c = h), (u = p), (o = f), (h += 122192928e5);
                  const g = (1e4 * (268435455 & h) + p) % 4294967296;
                  (d[n++] = (g >>> 24) & 255),
                    (d[n++] = (g >>> 16) & 255),
                    (d[n++] = (g >>> 8) & 255),
                    (d[n++] = 255 & g);
                  const y = ((h / 4294967296) * 1e4) & 268435455;
                  (d[n++] = (y >>> 8) & 255),
                    (d[n++] = 255 & y),
                    (d[n++] = ((y >>> 24) & 15) | 16),
                    (d[n++] = (y >>> 16) & 255),
                    (d[n++] = (f >>> 8) | 128),
                    (d[n++] = 255 & f);
                  for (let e = 0; e < 6; ++e) d[n + e] = l[e];
                  return t || (0, i.unsafeStringify)(d);
                };
                r.default = d;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/v1.js',
      },
    ],
    [
      1878,
      { './md5.js': 1869, './v35.js': 1879 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n = i(e('./v35.js')),
                  s = i(e('./md5.js'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                var a = (0, n.default)('v3', 48, s.default);
                r.default = a;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/v3.js',
      },
    ],
    [
      1879,
      { './parse.js': 1872, './stringify.js': 1876 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.URL = r.DNS = void 0),
                  (r.default = function (e, t, r) {
                    function n(e, n, a, o) {
                      var c;
                      if (
                        ('string' == typeof e &&
                          (e = (function (e) {
                            e = unescape(encodeURIComponent(e));
                            const t = [];
                            for (let r = 0; r < e.length; ++r) t.push(e.charCodeAt(r));
                            return t;
                          })(e)),
                        'string' == typeof n && (n = (0, i.default)(n)),
                        16 !== (null === (c = n) || void 0 === c ? void 0 : c.length))
                      )
                        throw TypeError(
                          'Namespace must be array-like (16 iterable integer values, 0-255)'
                        );
                      let u = new Uint8Array(16 + e.length);
                      if (
                        (u.set(n),
                        u.set(e, n.length),
                        (u = r(u)),
                        (u[6] = (15 & u[6]) | t),
                        (u[8] = (63 & u[8]) | 128),
                        a)
                      ) {
                        o = o || 0;
                        for (let e = 0; e < 16; ++e) a[o + e] = u[e];
                        return a;
                      }
                      return (0, s.unsafeStringify)(u);
                    }
                    try {
                      n.name = e;
                    } catch (e) {}
                    return (n.DNS = a), (n.URL = o), n;
                  });
                var n,
                  s = e('./stringify.js'),
                  i = (n = e('./parse.js')) && n.__esModule ? n : { default: n };
                const a = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
                r.DNS = a;
                const o = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
                r.URL = o;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/v35.js',
      },
    ],
    [
      1880,
      { './native.js': 1870, './rng.js': 1874, './stringify.js': 1876 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n = a(e('./native.js')),
                  s = a(e('./rng.js')),
                  i = e('./stringify.js');
                function a(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                var o = function (e, t, r) {
                  if (n.default.randomUUID && !t && !e) return n.default.randomUUID();
                  const a = (e = e || {}).random || (e.rng || s.default)();
                  if (((a[6] = (15 & a[6]) | 64), (a[8] = (63 & a[8]) | 128), t)) {
                    r = r || 0;
                    for (let e = 0; e < 16; ++e) t[r + e] = a[e];
                    return t;
                  }
                  return (0, i.unsafeStringify)(a);
                };
                r.default = o;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/v4.js',
      },
    ],
    [
      1881,
      { './sha1.js': 1875, './v35.js': 1879 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n = i(e('./v35.js')),
                  s = i(e('./sha1.js'));
                function i(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                var a = (0, n.default)('v5', 80, s.default);
                r.default = a;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/v5.js',
      },
    ],
    [
      1882,
      { './regex.js': 1873 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n,
                  s = (n = e('./regex.js')) && n.__esModule ? n : { default: n };
                var i = function (e) {
                  return 'string' == typeof e && s.default.test(e);
                };
                r.default = i;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/validate.js',
      },
    ],
    [
      1883,
      { './validate.js': 1882 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n,
                  s = (n = e('./validate.js')) && n.__esModule ? n : { default: n };
                var i = function (e) {
                  if (!(0, s.default)(e)) throw TypeError('Invalid UUID');
                  return parseInt(e.slice(14, 15), 16);
                };
                r.default = i;
              };
            };
      },
      {
        package: '@metamask/eth-snap-keyring>uuid',
        file: 'node_modules/@metamask/eth-snap-keyring/node_modules/uuid/dist/version.js',
      },
    ],
    [
      1888,
      {
        './onekey-keyring.cjs': 1889,
        './trezor-connect-bridge.cjs': 1890,
        './trezor-keyring.cjs': 1891,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  s(e('./trezor-keyring.cjs'), r),
                  s(e('./onekey-keyring.cjs'), r),
                  s(e('./trezor-connect-bridge.cjs'), r);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring',
        file: 'node_modules/@metamask/eth-trezor-keyring/dist/index.cjs',
      },
    ],
    [
      1889,
      { './trezor-keyring.cjs': 1891 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.OneKeyKeyring = void 0);
                const n = e('./trezor-keyring.cjs'),
                  s = 'OneKey Hardware';
                class i extends n.TrezorKeyring {
                  constructor() {
                    super(...arguments), (this.type = s);
                  }
                }
                (r.OneKeyKeyring = i), (i.type = s);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring',
        file: 'node_modules/@metamask/eth-trezor-keyring/dist/onekey-keyring.cjs',
      },
    ],
    [
      1890,
      { '@trezor/connect-web': 3321 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__setModuleDefault) ||
                    (Object.create
                      ? function (e, t) {
                          Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                        }
                      : function (e, t) {
                          e.default = t;
                        }),
                  i =
                    (this && this.__importStar) ||
                    function (e) {
                      if (e && e.__esModule) return e;
                      var t = {};
                      if (null != e)
                        for (var r in e)
                          'default' !== r &&
                            Object.prototype.hasOwnProperty.call(e, r) &&
                            n(t, e, r);
                      return s(t, e), t;
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.TrezorConnectBridge = void 0);
                const a = i(e('@trezor/connect-web'));
                r.TrezorConnectBridge = class {
                  constructor() {
                    this.trezorConnectInitiated = !1;
                  }
                  async init(e) {
                    a.default.on(a.DEVICE_EVENT, e => {
                      var t;
                      e.type === a.DEVICE.CONNECT &&
                        (this.model =
                          null === (t = e.payload.features) || void 0 === t ? void 0 : t.model);
                    }),
                      this.trezorConnectInitiated ||
                        (await a.default.init(e), (this.trezorConnectInitiated = !0));
                  }
                  async dispose() {
                    return a.default.dispose(), Promise.resolve();
                  }
                  getPublicKey(e) {
                    return a.default.getPublicKey(e);
                  }
                  ethereumSignTransaction(e) {
                    return a.default.ethereumSignTransaction(e);
                  }
                  ethereumSignMessage(e) {
                    return a.default.ethereumSignMessage(e);
                  }
                  ethereumSignTypedData(e) {
                    return a.default.ethereumSignTypedData(e);
                  }
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring',
        file: 'node_modules/@metamask/eth-trezor-keyring/dist/trezor-connect-bridge.cjs',
      },
    ],
    [
      1891,
      {
        '@ethereumjs/tx': 462,
        '@ethereumjs/util': 477,
        '@metamask/eth-sig-util': 1913,
        '@metamask/utils': 2995,
        '@trezor/connect-plugin-ethereum': 1934,
        buffer: 4139,
        hdkey: 4698,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    var n,
                      s,
                      i,
                      a,
                      o,
                      c,
                      u =
                        (this && this.__classPrivateFieldGet) ||
                        function (e, t, r, n) {
                          if ('a' === r && !n)
                            throw new TypeError('Private accessor was defined without a getter');
                          if ('function' == typeof t ? e !== t || !n : !t.has(e))
                            throw new TypeError(
                              'Cannot read private member from an object whose class did not declare it'
                            );
                          return 'm' === r ? n : 'a' === r ? n.call(e) : n ? n.value : t.get(e);
                        },
                      d =
                        (this && this.__importDefault) ||
                        function (e) {
                          return e && e.__esModule ? e : { default: e };
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.TrezorKeyring = r.TREZOR_CONNECT_MANIFEST = void 0);
                    const l = e('@ethereumjs/tx'),
                      f = e('@ethereumjs/util'),
                      h = e('@metamask/eth-sig-util'),
                      p = e('@metamask/utils'),
                      m = e('@trezor/connect-plugin-ethereum'),
                      g = d(e('hdkey')),
                      y = "m/44'/60'/0'/0",
                      b = { [y]: !0, "m/44'/60'/0'": !0, "m/44'/1'/0'/0": !0 },
                      w = 'Trezor Hardware',
                      v = 1e3;
                    async function k(e) {
                      return new Promise(t => setTimeout(t, e));
                    }
                    function T(e) {
                      return 'function' == typeof e.getChainId;
                    }
                    r.TREZOR_CONNECT_MANIFEST = {
                      email: 'support@metamask.io',
                      appUrl: 'https://metamask.io',
                    };
                    class E {
                      constructor({ bridge: e }) {
                        if (
                          (n.add(this),
                          (this.type = w),
                          (this.accounts = []),
                          (this.hdk = new g.default()),
                          (this.hdPath = y),
                          (this.page = 0),
                          (this.perPage = 5),
                          (this.unlockedAccount = 0),
                          (this.paths = {}),
                          !e)
                        )
                          throw new Error('Bridge is a required dependency for the keyring');
                        this.bridge = e;
                      }
                      getModel() {
                        return this.bridge.model;
                      }
                      async init() {
                        return this.bridge.init({
                          manifest: r.TREZOR_CONNECT_MANIFEST,
                          lazyLoad: !0,
                        });
                      }
                      async destroy() {
                        return this.bridge.dispose();
                      }
                      async serialize() {
                        return Promise.resolve({
                          hdPath: this.hdPath,
                          accounts: this.accounts.slice(),
                          page: this.page,
                          paths: this.paths,
                          perPage: this.perPage,
                          unlockedAccount: this.unlockedAccount,
                        });
                      }
                      async deserialize(e) {
                        var t, r, n, s;
                        return (
                          (this.hdPath = null !== (t = e.hdPath) && void 0 !== t ? t : y),
                          (this.accounts = null !== (r = e.accounts) && void 0 !== r ? r : []),
                          (this.page = null !== (n = e.page) && void 0 !== n ? n : 0),
                          (this.perPage = null !== (s = e.perPage) && void 0 !== s ? s : 5),
                          Promise.resolve()
                        );
                      }
                      isUnlocked() {
                        var e;
                        return Boolean(
                          null === (e = this.hdk) || void 0 === e ? void 0 : e.publicKey
                        );
                      }
                      async unlock() {
                        return this.isUnlocked()
                          ? Promise.resolve('already unlocked')
                          : new Promise((e, r) => {
                              this.bridge
                                .getPublicKey({ path: this.hdPath, coin: 'ETH' })
                                .then(n => {
                                  var s;
                                  n.success
                                    ? ((this.hdk.publicKey = t.from(n.payload.publicKey, 'hex')),
                                      (this.hdk.chainCode = t.from(n.payload.chainCode, 'hex')),
                                      e('just unlocked'))
                                    : r(
                                        new Error(
                                          (null === (s = n.payload) || void 0 === s
                                            ? void 0
                                            : s.error) || 'Unknown error'
                                        )
                                      );
                                })
                                .catch(e => {
                                  r(
                                    new Error(
                                      (null == e ? void 0 : e.toString()) || 'Unknown error'
                                    )
                                  );
                                });
                            });
                      }
                      setAccountToUnlock(e) {
                        this.unlockedAccount = parseInt(String(e), 10);
                      }
                      async addAccounts(e) {
                        return new Promise((t, r) => {
                          this.unlock()
                            .then(r => {
                              const s = this.unlockedAccount,
                                i = s + e,
                                a = [];
                              for (let e = s; e < i; e++) {
                                const t = u(this, n, 'm', o).call(this, 'm', e);
                                this.accounts.includes(t) ||
                                  ((this.accounts = [...this.accounts, t]), a.push(t)),
                                  (this.page = 0);
                              }
                              t(a);
                            })
                            .catch(e => {
                              r(e);
                            });
                        });
                      }
                      async getFirstPage() {
                        return (this.page = 0), u(this, n, 'm', s).call(this, 1);
                      }
                      async getNextPage() {
                        return u(this, n, 'm', s).call(this, 1);
                      }
                      async getPreviousPage() {
                        return u(this, n, 'm', s).call(this, -1);
                      }
                      async getAccounts() {
                        return Promise.resolve(this.accounts.slice());
                      }
                      removeAccount(e) {
                        if (!this.accounts.map(e => e.toLowerCase()).includes(e.toLowerCase()))
                          throw new Error(`Address ${e} not found in this keyring`);
                        this.accounts = this.accounts.filter(
                          t => t.toLowerCase() !== e.toLowerCase()
                        );
                      }
                      async signTransaction(e, r) {
                        return T(r)
                          ? u(this, n, 'm', i).call(
                              this,
                              e,
                              r.getChainId(),
                              r,
                              e => (
                                (r.v = t.from(e.v, 'hex')),
                                (r.r = t.from(e.r, 'hex')),
                                (r.s = t.from(e.s, 'hex')),
                                r
                              )
                            )
                          : u(this, n, 'm', i).call(this, e, Number(r.common.chainId()), r, e => {
                              const t = r.toJSON();
                              return (
                                (t.type = r.type),
                                (t.v = (0, p.add0x)(e.v)),
                                (t.r = (0, p.add0x)(e.r)),
                                (t.s = (0, p.add0x)(e.s)),
                                l.TransactionFactory.fromTxData(t, {
                                  common: r.common,
                                  freeze: Object.isFrozen(r),
                                })
                              );
                            });
                      }
                      async signMessage(e, t) {
                        return this.signPersonalMessage(e, t);
                      }
                      async signPersonalMessage(e, t) {
                        return new Promise((r, s) => {
                          this.unlock()
                            .then(i => {
                              setTimeout(
                                () => {
                                  this.bridge
                                    .ethereumSignMessage({
                                      path: u(this, n, 'm', c).call(this, e),
                                      message: (0, p.remove0x)(t),
                                      hex: !0,
                                    })
                                    .then(t => {
                                      var n;
                                      if (t.success) {
                                        t.payload.address !== (0, p.getChecksumAddress)(e) &&
                                          s(new Error('signature doesnt match the right address'));
                                        const n = `0x${t.payload.signature}`;
                                        r(n);
                                      } else
                                        s(
                                          new Error(
                                            (null === (n = t.payload) || void 0 === n
                                              ? void 0
                                              : n.error) || 'Unknown error'
                                          )
                                        );
                                    })
                                    .catch(e => {
                                      s(
                                        new Error(
                                          (null == e ? void 0 : e.toString()) || 'Unknown error'
                                        )
                                      );
                                    });
                                },
                                'just unlocked' === i ? v : 0
                              );
                            })
                            .catch(e => {
                              s(new Error((null == e ? void 0 : e.toString()) || 'Unknown error'));
                            });
                        });
                      }
                      async signTypedData(e, t, { version: r }) {
                        var s, i;
                        const a = (0, m.transformTypedData)(t, r === h.SignTypedDataVersion.V4),
                          {
                            types: o,
                            message: d = {},
                            domain: l = {},
                            primaryType: f,
                            domain_separator_hash: g,
                            message_hash: y,
                          } = a,
                          b = await this.unlock();
                        await k('just unlocked' === b ? v : 0);
                        const w = await this.bridge.ethereumSignTypedData({
                          path: u(this, n, 'm', c).call(this, e),
                          data: {
                            types: Object.assign(Object.assign({}, o), {
                              EIP712Domain: null !== (s = o.EIP712Domain) && void 0 !== s ? s : [],
                            }),
                            message: d,
                            domain: l,
                            primaryType: f,
                          },
                          metamask_v4_compat: !0,
                          domain_separator_hash: g,
                          message_hash: null != y ? y : '',
                        });
                        if (w.success) {
                          if ((0, p.getChecksumAddress)(e) !== w.payload.address)
                            throw new Error('signature doesnt match the right address');
                          return w.payload.signature;
                        }
                        throw new Error(
                          (null === (i = w.payload) || void 0 === i ? void 0 : i.error) ||
                            'Unknown error'
                        );
                      }
                      forgetDevice() {
                        (this.accounts = []),
                          (this.hdk = new g.default()),
                          (this.page = 0),
                          (this.unlockedAccount = 0),
                          (this.paths = {});
                      }
                      setHdPath(e) {
                        if (!b[e])
                          throw new Error(
                            `The setHdPath method does not support setting HD Path to ${e}`
                          );
                        this.hdPath !== e &&
                          ((this.hdk = new g.default()),
                          (this.accounts = []),
                          (this.page = 0),
                          (this.perPage = 5),
                          (this.unlockedAccount = 0),
                          (this.paths = {})),
                          (this.hdPath = e);
                      }
                    }
                    (r.TrezorKeyring = E),
                      (n = new WeakSet()),
                      (s = async function (e) {
                        return (
                          (this.page += e),
                          this.page <= 0 && (this.page = 1),
                          new Promise((e, t) => {
                            this.unlock()
                              .then(t => {
                                const r = (this.page - 1) * this.perPage,
                                  s = r + this.perPage,
                                  i = [];
                                for (let e = r; e < s; e++) {
                                  const t = u(this, n, 'm', o).call(this, 'm', e);
                                  i.push({ address: t, balance: null, index: e }),
                                    (this.paths[(0, p.getChecksumAddress)(t)] = e);
                                }
                                e(i);
                              })
                              .catch(e => {
                                t(e);
                              });
                          })
                        );
                      }),
                      (i = async function (e, r, s, i) {
                        var o, d, l, f;
                        let h;
                        h = T(s)
                          ? {
                              to: u(this, n, 'm', a).call(this, s.to),
                              value: u(this, n, 'm', a).call(this, s.value),
                              data: u(this, n, 'm', a).call(this, s.data),
                              chainId: r,
                              nonce: u(this, n, 'm', a).call(this, s.nonce),
                              gasLimit: u(this, n, 'm', a).call(this, s.gasLimit),
                              gasPrice: u(this, n, 'm', a).call(this, s.gasPrice),
                            }
                          : Object.assign(Object.assign({}, s.toJSON()), {
                              chainId: r,
                              to: u(this, n, 'm', a).call(
                                this,
                                t.from(
                                  null !==
                                    (d = null === (o = s.to) || void 0 === o ? void 0 : o.bytes) &&
                                    void 0 !== d
                                    ? d
                                    : []
                                )
                              ),
                            });
                        try {
                          const t = await this.unlock();
                          await k('just unlocked' === t ? v : 0);
                          const r = await this.bridge.ethereumSignTransaction({
                            path: u(this, n, 'm', c).call(this, e),
                            transaction: h,
                          });
                          if (r.success) {
                            const t = i(r.payload),
                              n = (0, p.getChecksumAddress)(
                                (0, p.add0x)(t.getSenderAddress().toString('hex'))
                              );
                            if (n !== (0, p.getChecksumAddress)(e))
                              throw new Error("signature doesn't match the right address");
                            return t;
                          }
                          throw new Error(
                            (null === (l = r.payload) || void 0 === l ? void 0 : l.error) ||
                              'Unknown error'
                          );
                        } catch (e) {
                          throw new Error(
                            null !== (f = null == e ? void 0 : e.toString()) && void 0 !== f
                              ? f
                              : 'Unknown error'
                          );
                        }
                      }),
                      (a = function (e) {
                        return (0, p.bytesToHex)(e);
                      }),
                      (o = function (e, t) {
                        const r = this.hdk.derive(`${e}/${t}`),
                          n = (0, p.bytesToHex)((0, f.publicToAddress)(r.publicKey, !0));
                        return (0, f.toChecksumAddress)(n);
                      }),
                      (c = function (e) {
                        const t = (0, p.getChecksumAddress)(e);
                        let r = this.paths[t];
                        if (void 0 === r)
                          for (let e = 0; e < 1e3; e++)
                            if (t === u(this, n, 'm', o).call(this, 'm', e)) {
                              r = e;
                              break;
                            }
                        if (void 0 === r) throw new Error('Unknown address');
                        return `${this.hdPath}/${r}`;
                      }),
                      (E.type = w);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring',
        file: 'node_modules/@metamask/eth-trezor-keyring/dist/trezor-keyring.cjs',
      },
    ],
    [
      1892,
      { './errors': 1893, './packer': 1896, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.decodeSingle = r.decode = r.encodePacked = r.encodeSingle = r.encode = void 0);
                const n = e('@metamask/utils'),
                  s = e('./errors'),
                  i = e('./packer');
                r.encode = (e, t, r, n) => {
                  try {
                    return (0, i.pack)({ types: e, values: t, packed: r, tight: n });
                  } catch (e) {
                    if (e instanceof s.ParserError)
                      throw new s.ParserError(`Unable to encode value: ${e.message}`, e);
                    throw new s.ParserError(
                      `An unexpected error occurred: ${(0, s.getErrorMessage)(e)}`,
                      e
                    );
                  }
                };
                r.encodeSingle = (e, t) => (0, r.encode)([e], [t]);
                r.encodePacked = (e, t, n) => (0, r.encode)(e, t, !0, n);
                r.decode = (e, t) => {
                  const r = (0, n.createBytes)(t);
                  try {
                    return (0, i.unpack)(e, r);
                  } catch (e) {
                    if (e instanceof s.ParserError)
                      throw new s.ParserError(`Unable to decode value: ${e.message}`, e);
                    throw new s.ParserError(
                      `An unexpected error occurred: ${(0, s.getErrorMessage)(e)}`,
                      e
                    );
                  }
                };
                r.decodeSingle = (e, t) => {
                  const i = (0, r.decode)([e], t);
                  return (
                    (0, n.assert)(
                      1 === i.length,
                      new s.ParserError('Decoded value array has unexpected length.')
                    ),
                    i[0]
                  );
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/abi.js',
      },
    ],
    [
      1893,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.ParserError = r.getErrorStack = r.getErrorMessage = void 0);
                const n = e('@metamask/utils');
                r.getErrorMessage = e =>
                  'string' == typeof e
                    ? e
                    : e instanceof Error ||
                        ((0, n.isObject)(e) &&
                          (0, n.hasProperty)(e, 'message') &&
                          'string' == typeof e.message)
                      ? e.message
                      : 'Unknown error.';
                r.getErrorStack = e => (e instanceof Error ? e.stack : undefined);
                class s extends Error {
                  constructor(e, t) {
                    super(e), (this.name = 'ParserError');
                    const n = (0, r.getErrorStack)(t);
                    n && (this.stack = n);
                  }
                }
                r.ParserError = s;
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/errors.js',
      },
    ],
    [
      1894,
      { './abi': 1892, './errors': 1893, './types': 1909 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  s(e('./abi'), r),
                  s(e('./errors'), r),
                  s(e('./types'), r);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/index.js',
      },
    ],
    [
      1895,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.iterate = void 0);
                const n = e('@metamask/utils');
                r.iterate = function* (e, t = 32) {
                  for (let r = 0; r < e.length; r += t) {
                    const s = e => {
                        (0, n.assert)(e >= 0, 'Cannot skip a negative number of bytes.'),
                          (0, n.assert)(e % t == 0, 'Length must be a multiple of the size.'),
                          (r += e);
                      },
                      i = e.subarray(r);
                    yield { skip: s, value: i };
                  }
                  return { skip: () => undefined, value: new Uint8Array() };
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/iterator.js',
      },
    ],
    [
      1896,
      {
        './errors': 1893,
        './iterator': 1895,
        './parsers': 1903,
        './utils': 1911,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.unpack = r.pack = r.isDynamicParser = r.getParser = void 0);
                const n = e('@metamask/utils'),
                  s = e('./errors'),
                  i = e('./iterator'),
                  a = e('./parsers'),
                  o = e('./utils');
                r.getParser = e => {
                  const t = {
                      address: a.address,
                      array: a.array,
                      bool: a.bool,
                      bytes: a.bytes,
                      fixedBytes: a.fixedBytes,
                      function: a.fn,
                      number: a.number,
                      string: a.string,
                      tuple: a.tuple,
                    },
                    r = t[e];
                  if (r) return r;
                  const n = Object.values(t).find(t => t.isType(e));
                  if (n) return n;
                  throw new s.ParserError(`The type "${e}" is not supported.`);
                };
                r.isDynamicParser = (e, t) => {
                  const { isDynamic: r } = e;
                  return 'function' == typeof r ? r(t) : r;
                };
                r.pack = ({
                  types: e,
                  values: t,
                  packed: i = !1,
                  tight: a = !1,
                  arrayPacked: c = !1,
                  byteArray: u = new Uint8Array(),
                }) => {
                  (0, n.assert)(
                    e.length === t.length,
                    new s.ParserError(
                      `The number of types (${e.length}) does not match the number of values (${t.length}).`
                    )
                  );
                  const {
                    staticBuffer: d,
                    dynamicBuffer: l,
                    pointers: f,
                  } = e.reduce(
                    ({ staticBuffer: e, dynamicBuffer: s, pointers: o }, u, d) => {
                      const l = (0, r.getParser)(u),
                        f = t[d];
                      if (i || c || !(0, r.isDynamicParser)(l, u))
                        return {
                          staticBuffer: l.encode({
                            buffer: e,
                            value: f,
                            type: u,
                            packed: i,
                            tight: a,
                          }),
                          dynamicBuffer: s,
                          pointers: o,
                        };
                      return {
                        staticBuffer: (0, n.concatBytes)([e, new Uint8Array(32)]),
                        dynamicBuffer: l.encode({
                          buffer: s,
                          value: f,
                          type: u,
                          packed: i,
                          tight: a,
                        }),
                        pointers: [...o, { position: e.length, pointer: s.length }],
                      };
                    },
                    {
                      staticBuffer: new Uint8Array(),
                      dynamicBuffer: new Uint8Array(),
                      pointers: [],
                    }
                  );
                  (0, n.assert)(
                    (!i && !c) || 0 === l.length,
                    new s.ParserError('Invalid pack state.')
                  );
                  const h = d.length,
                    p = f.reduce((e, { pointer: t, position: r }) => {
                      const s = (0, o.padStart)((0, n.numberToBytes)(h + t));
                      return (0, o.set)(e, s, r);
                    }, d);
                  return (0, n.concatBytes)([u, p, l]);
                };
                r.unpack = (e, t) => {
                  const a = (0, i.iterate)(t);
                  return e.map(e => {
                    const {
                      value: { value: i, skip: o },
                      done: c,
                    } = a.next();
                    (0, n.assert)(
                      !c,
                      new s.ParserError(
                        `The encoded value is invalid for the provided types. Reached end of buffer while attempting to parse "${e}".`
                      )
                    );
                    const u = (0, r.getParser)(e);
                    if ((0, r.isDynamicParser)(u, e)) {
                      const r = (0, n.bytesToNumber)(i.subarray(0, 32)),
                        s = t.subarray(r);
                      return u.decode({ type: e, value: s, skip: o });
                    }
                    return u.decode({ type: e, value: i, skip: o });
                  });
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/packer.js',
      },
    ],
    [
      1897,
      { '../errors': 1893, '../utils': 1911, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.address = r.getAddress = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../utils');
                (r.getAddress = e => {
                  const t = (0, n.createBytes)(e);
                  return (
                    (0, n.assert)(
                      t.length <= 20,
                      new s.ParserError(
                        `Invalid address value. Expected address to be 20 bytes long, but received ${t.length} bytes.`
                      )
                    ),
                    (0, i.padStart)(t, 20)
                  );
                }),
                  (r.address = {
                    isDynamic: !1,
                    isType: e => 'address' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: s }) {
                      const a = (0, r.getAddress)(t);
                      if (s) return (0, n.concatBytes)([e, a]);
                      const o = (0, i.padStart)(a);
                      return (0, n.concatBytes)([e, o]);
                    },
                    decode: ({ value: e }) => (0, n.add0x)((0, n.bytesToHex)(e.slice(12, 32))),
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/address.js',
      },
    ],
    [
      1898,
      {
        '../errors': 1893,
        '../packer': 1896,
        '../utils': 1911,
        './fixed-bytes': 1901,
        './tuple': 1907,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.array = r.getTupleType = r.getArrayType = r.isArrayType = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../packer'),
                  a = e('../utils'),
                  o = e('./fixed-bytes'),
                  c = e('./tuple'),
                  u = /^(?<type>.*)\[(?<length>\d*?)\]$/u;
                r.isArrayType = e => u.test(e);
                r.getArrayType = e => {
                  const t = e.match(u);
                  return (
                    (0, n.assert)(
                      t?.groups?.type,
                      new s.ParserError(
                        `Invalid array type. Expected an array type, but received "${e}".`
                      )
                    ),
                    [t.groups.type, t.groups.length ? parseInt(t.groups.length, 10) : undefined]
                  );
                };
                (r.getTupleType = (e, t) => `(${new Array(t).fill(e).join(',')})`),
                  (r.array = {
                    isDynamic(e) {
                      const [t, n] = (0, r.getArrayType)(e);
                      return n === undefined || (0, i.isDynamicParser)((0, i.getParser)(t), t);
                    },
                    isType: e => (0, r.isArrayType)(e),
                    getByteLength(e) {
                      (0, n.assert)(
                        (0, r.isArrayType)(e),
                        new s.ParserError(`Expected an array type, but received "${e}".`)
                      );
                      const [t, a] = (0, r.getArrayType)(e);
                      return (0, i.isDynamicParser)(this, e) || a === undefined
                        ? 32
                        : c.tuple.getByteLength((0, r.getTupleType)(t, a));
                    },
                    encode({ type: e, buffer: t, value: u, packed: d, tight: l }) {
                      const [f, h] = (0, r.getArrayType)(e);
                      if (
                        ((0, n.assert)(
                          !d || !(0, r.isArrayType)(f),
                          new s.ParserError('Cannot pack nested arrays.')
                        ),
                        d && (0, i.isDynamicParser)((0, i.getParser)(f), f))
                      )
                        return (0, i.pack)({
                          types: new Array(u.length).fill(f),
                          values: u,
                          byteArray: t,
                          packed: d,
                          arrayPacked: !0,
                          tight: l,
                        });
                      if (h)
                        return (
                          (0, n.assert)(
                            h === u.length,
                            new s.ParserError(
                              `Array length does not match type length. Expected a length of ${h}, but received ${u.length}.`
                            )
                          ),
                          c.tuple.encode({
                            type: (0, r.getTupleType)(f, h),
                            buffer: t,
                            value: u,
                            packed: o.fixedBytes.isType(f) && l,
                            tight: l,
                          })
                        );
                      if (d)
                        return (0, i.pack)({
                          types: new Array(u.length).fill(f),
                          values: u,
                          byteArray: t,
                          packed: o.fixedBytes.isType(f) && l,
                          arrayPacked: !0,
                          tight: l,
                        });
                      const p = (0, a.padStart)((0, n.numberToBytes)(u.length));
                      return (0, i.pack)({
                        types: new Array(u.length).fill(f),
                        values: u,
                        byteArray: (0, n.concatBytes)([t, p]),
                        packed: d,
                        tight: l,
                      });
                    },
                    decode({ type: e, value: t, ...a }) {
                      const [o, u] = (0, r.getArrayType)(e);
                      if (u) {
                        const e = c.tuple.decode({
                          type: (0, r.getTupleType)(o, u),
                          value: t,
                          ...a,
                        });
                        return (
                          (0, n.assert)(
                            e.length === u,
                            new s.ParserError(
                              `Array length does not match type length. Expected a length of ${u}, but received ${e.length}.`
                            )
                          ),
                          e
                        );
                      }
                      const d = (0, n.bytesToNumber)(t.subarray(0, 32));
                      return (0, i.unpack)(new Array(d).fill(o), t.subarray(32));
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/array.js',
      },
    ],
    [
      1899,
      {
        '../errors': 1893,
        './number': 1904,
        '@metamask/superstruct': 2913,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.bool = r.getBooleanValue = void 0);
                const n = e('@metamask/superstruct'),
                  s = e('@metamask/utils'),
                  i = e('../errors'),
                  a = e('./number'),
                  o = (0, n.coerce)(
                    (0, n.boolean)(),
                    (0, n.union)([(0, n.literal)('true'), (0, n.literal)('false')]),
                    e => 'true' === e
                  );
                (r.getBooleanValue = e => {
                  try {
                    return (0, n.create)(e, o) ? BigInt(1) : BigInt(0);
                  } catch {
                    throw new i.ParserError(
                      `Invalid boolean value. Expected a boolean literal, or the string "true" or "false", but received "${e}".`
                    );
                  }
                }),
                  (r.bool = {
                    isDynamic: !1,
                    isType: e => 'bool' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: n, tight: i }) {
                      const o = (0, r.getBooleanValue)(t);
                      return n
                        ? (0, s.concatBytes)([e, (0, s.bigIntToBytes)(o)])
                        : a.number.encode({
                            type: 'uint256',
                            buffer: e,
                            value: o,
                            packed: n,
                            tight: i,
                          });
                    },
                    decode: e => a.number.decode({ ...e, type: 'uint256' }) === BigInt(1),
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/bool.js',
      },
    ],
    [
      19,
      { '../../controllers/institutional-snap/InstitutionalSnapController': 78 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.InstitutionalSnapControllerInit = void 0);
                var n = e('../../controllers/institutional-snap/InstitutionalSnapController');
                r.InstitutionalSnapControllerInit = e => ({
                  controller: new n.InstitutionalSnapController({
                    messenger: e.controllerMessenger,
                  }),
                });
              };
            };
      },
      {
        package: '$root$',
        file: 'app/scripts/controller-init/institutional-snap/institutional-snap-controller-init.ts',
      },
    ],
    [
      190,
      {
        '../../../../../shared/lib/four-byte': 5835,
        '@ethersproject/abi': 504,
        '@metamask/utils': 2995,
        'ethereumjs-util': 4393,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.decodeTransactionDataWithFourByte = async function (e) {
                    const t = e.slice(0, 10),
                      r = await (0, a.getMethodFrom4Byte)(t);
                    if (!r) return undefined;
                    const i = r.split('(')[0],
                      l = (function (e) {
                        let t = e.slice(e.indexOf('(') + 1, -1);
                        const r = [];
                        for (; t.includes('('); ) {
                          const e = d(t);
                          if (!e) break;
                          r.push(e.value),
                            (t = `${t.slice(0, e.start)}${r.length - 1}#${t.slice(e.end + 1)}`);
                        }
                        return u(t, r);
                      })(r);
                    o('Generated inputs', l);
                    const f = (0, n.addHexPrefix)(e.slice(10)),
                      h = s.Interface.getAbiCoder().decode(l, f),
                      p = l.map((e, t) => c(e, t, h));
                    return { name: i, params: p };
                  });
                var n = e('ethereumjs-util'),
                  s = e('@ethersproject/abi'),
                  i = e('@metamask/utils'),
                  a = e('../../../../../shared/lib/four-byte');
                const o = (0, i.createProjectLogger)('four-byte');
                function c(e, t, r) {
                  var n;
                  const s = r[t],
                    { type: i, name: a } = e;
                  let o =
                    null === (n = e.components) || void 0 === n
                      ? void 0
                      : n.map((e, t) => c(e, t, s));
                  if (i.endsWith('[]')) {
                    const t = i.slice(0, -2);
                    o = s.map((r, n) => {
                      const i = `Item ${n + 1}`;
                      return c({ ...e, name: i, type: t }, n, s);
                    });
                  }
                  return { name: a, type: i, value: s, children: o };
                }
                function u(e, t) {
                  return e.split(',').map(e => {
                    const r = e.split('#'),
                      n = r.length > 1 ? parseInt(r[0], 10) : undefined;
                    return {
                      type: n === undefined ? e : `tuple${r[1] ?? ''}`,
                      components: n === undefined ? undefined : u(t[n], t),
                    };
                  });
                }
                function d(e) {
                  let t = -1;
                  for (let r = 0; r < e.length; r++)
                    if ('(' === e[r]) t = r;
                    else if (')' === e[r] && -1 !== t)
                      return { start: t, end: r, value: e.slice(t + 1, r) };
                  return undefined;
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/decode/four-byte.ts' },
    ],
    [
      1900,
      { '../utils': 1911, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.bytes = void 0);
                const n = e('@metamask/utils'),
                  s = e('../utils');
                r.bytes = {
                  isDynamic: !0,
                  isType: e => 'bytes' === e,
                  getByteLength: () => 32,
                  encode({ buffer: e, value: t, packed: r }) {
                    const i = (0, n.createBytes)(t);
                    if (r) return (0, n.concatBytes)([e, i]);
                    const a = 32 * Math.ceil(i.byteLength / 32);
                    return (0, n.concatBytes)([
                      e,
                      (0, s.padStart)((0, n.numberToBytes)(i.byteLength)),
                      (0, s.padEnd)(i, a),
                    ]);
                  },
                  decode({ value: e }) {
                    const t = e.subarray(0, 32),
                      r = (0, n.bytesToNumber)(t);
                    return e.slice(32, 32 + r);
                  },
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/bytes.js',
      },
    ],
    [
      1901,
      { '../errors': 1893, '../utils': 1911, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.fixedBytes = r.getByteLength = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../utils'),
                  a = /^bytes([0-9]{1,2})$/u;
                (r.getByteLength = e => {
                  const t = e.match(a)?.[1];
                  (0, n.assert)(
                    t,
                    `Invalid byte length. Expected a number between 1 and 32, but received "${e}".`
                  );
                  const r = Number(t);
                  return (
                    (0, n.assert)(
                      r > 0 && r <= 32,
                      new s.ParserError(
                        `Invalid byte length. Expected a number between 1 and 32, but received "${e}".`
                      )
                    ),
                    r
                  );
                }),
                  (r.fixedBytes = {
                    isDynamic: !1,
                    isType: e => a.test(e),
                    getByteLength: () => 32,
                    encode({ type: e, buffer: t, value: a, packed: o }) {
                      const c = (0, r.getByteLength)(e),
                        u = (0, n.createBytes)(a);
                      return (
                        (0, n.assert)(
                          u.length <= c,
                          new s.ParserError(
                            `Expected a value of length ${c}, but received a value of length ${u.length}.`
                          )
                        ),
                        o
                          ? (0, n.concatBytes)([t, (0, i.padEnd)(u, c)])
                          : (0, n.concatBytes)([t, (0, i.padEnd)(u)])
                      );
                    },
                    decode({ type: e, value: t }) {
                      const n = (0, r.getByteLength)(e);
                      return t.slice(0, n);
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/fixed-bytes.js',
      },
    ],
    [
      1902,
      {
        '../errors': 1893,
        './fixed-bytes': 1901,
        '@metamask/superstruct': 2913,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.fn = r.getFunction = void 0);
                const n = e('@metamask/superstruct'),
                  s = e('@metamask/utils'),
                  i = e('../errors'),
                  a = e('./fixed-bytes'),
                  o = (0, n.coerce)(
                    (0, n.object)({ address: s.StrictHexStruct, selector: s.StrictHexStruct }),
                    (0, n.union)([s.StrictHexStruct, (0, n.instance)(Uint8Array)]),
                    e => {
                      const t = (0, s.createBytes)(e);
                      return (
                        (0, s.assert)(
                          24 === t.length,
                          new i.ParserError(
                            `Invalid Solidity function. Expected function to be 24 bytes long, but received ${t.length} bytes.`
                          )
                        ),
                        {
                          address: (0, s.bytesToHex)(t.subarray(0, 20)),
                          selector: (0, s.bytesToHex)(t.subarray(20, 24)),
                        }
                      );
                    }
                  );
                (r.getFunction = e => {
                  const t = (0, n.create)(e, o);
                  return (0, s.concatBytes)([
                    (0, s.hexToBytes)(t.address),
                    (0, s.hexToBytes)(t.selector),
                  ]);
                }),
                  (r.fn = {
                    isDynamic: !1,
                    isType: e => 'function' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: n, tight: s }) {
                      const i = (0, r.getFunction)(t);
                      return a.fixedBytes.encode({
                        type: 'bytes24',
                        buffer: e,
                        value: i,
                        packed: n,
                        tight: s,
                      });
                    },
                    decode: ({ value: e }) => ({
                      address: (0, s.bytesToHex)(e.slice(0, 20)),
                      selector: (0, s.bytesToHex)(e.slice(20, 24)),
                    }),
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/function.js',
      },
    ],
    [
      1903,
      {
        './address': 1897,
        './array': 1898,
        './bool': 1899,
        './bytes': 1900,
        './fixed-bytes': 1901,
        './function': 1902,
        './number': 1904,
        './parser': 1905,
        './string': 1906,
        './tuple': 1907,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  s(e('./address'), r),
                  s(e('./array'), r),
                  s(e('./bool'), r),
                  s(e('./bytes'), r),
                  s(e('./fixed-bytes'), r),
                  s(e('./function'), r),
                  s(e('./number'), r),
                  s(e('./parser'), r),
                  s(e('./string'), r),
                  s(e('./tuple'), r);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/index.js',
      },
    ],
    [
      1904,
      { '../errors': 1893, '../utils': 1911, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.number =
                    r.getBigInt =
                    r.assertNumberLength =
                    r.getLength =
                    r.isSigned =
                      void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../utils'),
                  a = /^u?int(?<length>[0-9]*)?$/u;
                r.isSigned = e => !e.startsWith('u');
                r.getLength = e => {
                  if ('int' === e || 'uint' === e) return 256;
                  const t = e.match(a);
                  (0, n.assert)(
                    t?.groups?.length,
                    new s.ParserError(
                      `Invalid number type. Expected a number type, but received "${e}".`
                    )
                  );
                  const r = parseInt(t.groups.length, 10);
                  return (
                    (0, n.assert)(
                      r >= 8 && r <= 256,
                      new s.ParserError(
                        `Invalid number length. Expected a number between 8 and 256, but received "${e}".`
                      )
                    ),
                    (0, n.assert)(
                      r % 8 == 0,
                      new s.ParserError(
                        `Invalid number length. Expected a multiple of 8, but received "${e}".`
                      )
                    ),
                    r
                  );
                };
                r.assertNumberLength = (e, t) => {
                  const i = (0, r.getLength)(t),
                    a = BigInt(2) ** BigInt(i - ((0, r.isSigned)(t) ? 1 : 0)) - BigInt(1);
                  (0, r.isSigned)(t)
                    ? (0, n.assert)(
                        e >= -(a + BigInt(1)) && e <= a,
                        new s.ParserError(`Number "${e}" is out of range for type "${t}".`)
                      )
                    : (0, n.assert)(
                        e <= a,
                        new s.ParserError(`Number "${e}" is out of range for type "${t}".`)
                      );
                };
                (r.getBigInt = e => {
                  try {
                    return (0, n.createBigInt)(e);
                  } catch {
                    throw new s.ParserError(
                      `Invalid number. Expected a valid number value, but received "${e}".`
                    );
                  }
                }),
                  (r.number = {
                    isDynamic: !1,
                    isType: e => a.test(e),
                    getByteLength: () => 32,
                    encode({ type: e, buffer: t, value: s, packed: a }) {
                      const o = (0, r.getBigInt)(s);
                      if (((0, r.assertNumberLength)(o, e), (0, r.isSigned)(e))) {
                        if (a) {
                          const s = (0, r.getLength)(e) / 8;
                          return (0, n.concatBytes)([t, (0, n.signedBigIntToBytes)(o, s)]);
                        }
                        return (0, n.concatBytes)([
                          t,
                          (0, i.padStart)((0, n.signedBigIntToBytes)(o, 32)),
                        ]);
                      }
                      if (a) {
                        const s = (0, r.getLength)(e) / 8;
                        return (0, n.concatBytes)([t, (0, i.padStart)((0, n.bigIntToBytes)(o), s)]);
                      }
                      return (0, n.concatBytes)([t, (0, i.padStart)((0, n.bigIntToBytes)(o))]);
                    },
                    decode({ type: e, value: t }) {
                      const s = t.subarray(0, 32);
                      if ((0, r.isSigned)(e)) {
                        const t = (0, n.bytesToSignedBigInt)(s);
                        return (0, r.assertNumberLength)(t, e), t;
                      }
                      const i = (0, n.bytesToBigInt)(s);
                      return (0, r.assertNumberLength)(i, e), i;
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/number.js',
      },
    ],
    [
      1905,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/parser.js',
      },
    ],
    [
      1906,
      { './bytes': 1900, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.string = void 0);
                const n = e('@metamask/utils'),
                  s = e('./bytes');
                r.string = {
                  isDynamic: !0,
                  isType: e => 'string' === e,
                  getByteLength: () => 32,
                  encode: ({ buffer: e, value: t, packed: r, tight: i }) =>
                    s.bytes.encode({
                      type: 'bytes',
                      buffer: e,
                      value: (0, n.stringToBytes)(t),
                      packed: r,
                      tight: i,
                    }),
                  decode: e => (0, n.bytesToString)(s.bytes.decode(e)),
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/string.js',
      },
    ],
    [
      1907,
      { '../errors': 1893, '../packer': 1896, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.tuple = r.getTupleElements = void 0);
                const n = e('@metamask/utils'),
                  s = e('../errors'),
                  i = e('../packer'),
                  a = /^\((.+)\)$/u;
                (r.getTupleElements = e => {
                  (0, n.assert)(
                    e.startsWith('(') && e.endsWith(')'),
                    new s.ParserError(
                      `Invalid tuple type. Expected tuple type, but received "${e}".`
                    )
                  );
                  const t = [];
                  let r = '',
                    i = 0;
                  for (let n = 1; n < e.length - 1; n++) {
                    const s = e[n];
                    ',' === s && 0 === i
                      ? (t.push(r.trim()), (r = ''))
                      : ((r += s), '(' === s ? (i += 1) : ')' === s && (i -= 1));
                  }
                  return r.trim() && t.push(r.trim()), t;
                }),
                  (r.tuple = {
                    isDynamic: e =>
                      (0, r.getTupleElements)(e).some(e => {
                        const t = (0, i.getParser)(e);
                        return (0, i.isDynamicParser)(t, e);
                      }),
                    isType: e => (e => a.test(e))(e),
                    getByteLength(e) {
                      if ((0, i.isDynamicParser)(this, e)) return 32;
                      return (0, r.getTupleElements)(e).reduce(
                        (e, t) => e + (0, i.getParser)(t).getByteLength(t),
                        0
                      );
                    },
                    encode({ type: e, buffer: t, value: n, packed: s, tight: a }) {
                      const o = (0, r.getTupleElements)(e);
                      return (0, i.pack)({
                        types: o,
                        values: n,
                        byteArray: t,
                        packed: s,
                        tight: a,
                      });
                    },
                    decode({ type: e, value: t, skip: n }) {
                      const s = (0, r.getTupleElements)(e);
                      return n(this.getByteLength(e) - 32), (0, i.unpack)(s, t);
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/parsers/tuple.js',
      },
    ],
    [
      1908,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/types/abi.js',
      },
    ],
    [
      1909,
      { './abi': 1908 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), s(e('./abi'), r);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/types/index.js',
      },
    ],
    [
      191,
      { 'ethereumjs-util': 4393 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getContractProxyAddress = async function (e, t) {
                    const r = (
                      await Promise.all(
                        s.map(r =>
                          t.request({ method: 'eth_getStorageAt', params: [e, r, 'latest'] })
                        )
                      )
                    ).find(e => (0, n.stripHexPrefix)(e) !== i);
                    return r && (0, n.addHexPrefix)(r.slice(26));
                  });
                var n = e('ethereumjs-util');
                const s = [
                    '0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3',
                    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc',
                  ],
                  i = '0'.padEnd(64, '0');
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/decode/proxy.ts' },
    ],
    [
      1910,
      { '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.padEnd = r.padStart = r.set = void 0);
                const n = e('@metamask/utils');
                r.set = (e, t, r) =>
                  (0, n.concatBytes)([e.subarray(0, r), t, e.subarray(r + t.length)]);
                r.padStart = (e, t = 32) => {
                  const r = new Uint8Array(Math.max(t - e.length, 0)).fill(0);
                  return (0, n.concatBytes)([r, e]);
                };
                r.padEnd = (e, t = 32) => {
                  const r = new Uint8Array(Math.max(t - e.length, 0)).fill(0);
                  return (0, n.concatBytes)([e, r]);
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/utils/buffer.js',
      },
    ],
    [
      1911,
      { './buffer': 1910 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), s(e('./buffer'), r);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/abi-utils/dist/utils/index.js',
      },
    ],
    [
      1912,
      { './utils': 1917, '@scure/base': 1933, buffer: 4139, tweetnacl: 5686 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    var n =
                        (this && this.__createBinding) ||
                        (Object.create
                          ? function (e, t, r, n) {
                              n === undefined && (n = r);
                              var s = Object.getOwnPropertyDescriptor(t, r);
                              (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                                (s = {
                                  enumerable: !0,
                                  get: function () {
                                    return t[r];
                                  },
                                }),
                                Object.defineProperty(e, n, s);
                            }
                          : function (e, t, r, n) {
                              n === undefined && (n = r), (e[n] = t[r]);
                            }),
                      s =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                          ? function (e, t) {
                              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                            }
                          : function (e, t) {
                              e.default = t;
                            }),
                      i =
                        (this && this.__importStar) ||
                        function (e) {
                          if (e && e.__esModule) return e;
                          var t = {};
                          if (null != e)
                            for (var r in e)
                              'default' !== r &&
                                Object.prototype.hasOwnProperty.call(e, r) &&
                                n(t, e, r);
                          return s(t, e), t;
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.getEncryptionPublicKey =
                        r.decryptSafely =
                        r.decrypt =
                        r.encryptSafely =
                        r.encrypt =
                          void 0);
                    const a = e('@scure/base'),
                      o = i(e('tweetnacl')),
                      c = e('./utils');
                    function u({ publicKey: e, data: t, version: r }) {
                      if ((0, c.isNullish)(e)) throw new Error('Missing publicKey parameter');
                      if ((0, c.isNullish)(t)) throw new Error('Missing data parameter');
                      if ((0, c.isNullish)(r)) throw new Error('Missing version parameter');
                      if ('x25519-xsalsa20-poly1305' === r) {
                        if ('string' != typeof t)
                          throw new Error('Message data must be given as a string');
                        const r = o.box.keyPair();
                        let n;
                        try {
                          n = a.base64.decode(e);
                        } catch (e) {
                          throw new Error('Bad public key');
                        }
                        const s = a.utf8.decode(t),
                          i = o.randomBytes(o.box.nonceLength),
                          c = o.box(s, i, n, r.secretKey);
                        return {
                          version: 'x25519-xsalsa20-poly1305',
                          nonce: a.base64.encode(i),
                          ephemPublicKey: a.base64.encode(r.publicKey),
                          ciphertext: a.base64.encode(c),
                        };
                      }
                      throw new Error('Encryption type/version not supported');
                    }
                    function d({ encryptedData: e, privateKey: r }) {
                      if ((0, c.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                      if ((0, c.isNullish)(r)) throw new Error('Missing privateKey parameter');
                      if ('x25519-xsalsa20-poly1305' === e.version) {
                        const n = t.from(r, 'hex'),
                          s = o.box.keyPair.fromSecretKey(n).secretKey,
                          i = a.base64.decode(e.nonce),
                          c = a.base64.decode(e.ciphertext),
                          u = a.base64.decode(e.ephemPublicKey),
                          d = o.box.open(c, i, u, s);
                        try {
                          if (!d) throw new Error();
                          const e = a.utf8.encode(d);
                          if (!e) throw new Error();
                          return e;
                        } catch (e) {
                          if (e && 'string' == typeof e.message && e.message.length)
                            throw new Error(`Decryption failed: ${e.message}`);
                          throw new Error('Decryption failed.');
                        }
                      }
                      throw new Error('Encryption type/version not supported.');
                    }
                    (r.encrypt = u),
                      (r.encryptSafely = function ({ publicKey: e, data: r, version: n }) {
                        if ((0, c.isNullish)(e)) throw new Error('Missing publicKey parameter');
                        if ((0, c.isNullish)(r)) throw new Error('Missing data parameter');
                        if ((0, c.isNullish)(n)) throw new Error('Missing version parameter');
                        if ('object' == typeof r && r && 'toJSON' in r)
                          throw new Error(
                            'Cannot encrypt with toJSON property.  Please remove toJSON property'
                          );
                        const s = { data: r, padding: '' },
                          i = t.byteLength(JSON.stringify(s), 'utf-8') % 2048;
                        let a = 0;
                        return (
                          i > 0 && (a = 2048 - i - 16),
                          (s.padding = '0'.repeat(a)),
                          u({ publicKey: e, data: JSON.stringify(s), version: n })
                        );
                      }),
                      (r.decrypt = d),
                      (r.decryptSafely = function ({ encryptedData: e, privateKey: t }) {
                        if ((0, c.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                        if ((0, c.isNullish)(t)) throw new Error('Missing privateKey parameter');
                        return JSON.parse(d({ encryptedData: e, privateKey: t })).data;
                      }),
                      (r.getEncryptionPublicKey = function (e) {
                        const r = t.from(e, 'hex'),
                          n = o.box.keyPair.fromSecretKey(r).publicKey;
                        return a.base64.encode(n);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/dist/encryption.js',
      },
    ],
    [
      1913,
      {
        './encryption': 1912,
        './personal-sign': 1914,
        './sign-eip7702-authorization': 1915,
        './sign-typed-data': 1916,
        './utils': 1917,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.normalize = r.concatSig = void 0),
                  s(e('./personal-sign'), r),
                  s(e('./sign-typed-data'), r),
                  s(e('./encryption'), r),
                  s(e('./sign-eip7702-authorization'), r);
                var i = e('./utils');
                Object.defineProperty(r, 'concatSig', {
                  enumerable: !0,
                  get: function () {
                    return i.concatSig;
                  },
                }),
                  Object.defineProperty(r, 'normalize', {
                    enumerable: !0,
                    get: function () {
                      return i.normalize;
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/dist/index.js',
      },
    ],
    [
      1914,
      { './utils': 1917, '@ethereumjs/util': 1925 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.extractPublicKey = r.recoverPersonalSignature = r.personalSign = void 0);
                const n = e('@ethereumjs/util'),
                  s = e('./utils');
                function i(e, t) {
                  const r = (0, n.hashPersonalMessage)((0, s.legacyToBuffer)(e));
                  return (0, s.recoverPublicKey)(r, t);
                }
                (r.personalSign = function ({ privateKey: e, data: t }) {
                  if ((0, s.isNullish)(t)) throw new Error('Missing data parameter');
                  if ((0, s.isNullish)(e)) throw new Error('Missing privateKey parameter');
                  const r = (0, s.legacyToBuffer)(t),
                    i = (0, n.hashPersonalMessage)(r),
                    a = (0, n.ecsign)(i, e);
                  return (0, s.concatSig)((0, n.toBuffer)(a.v), a.r, a.s);
                }),
                  (r.recoverPersonalSignature = function ({ data: e, signature: t }) {
                    if ((0, s.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, s.isNullish)(t)) throw new Error('Missing signature parameter');
                    const r = i(e, t),
                      a = (0, n.publicToAddress)(r);
                    return (0, n.bufferToHex)(a);
                  }),
                  (r.extractPublicKey = function ({ data: e, signature: t }) {
                    if ((0, s.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, s.isNullish)(t)) throw new Error('Missing signature parameter');
                    return `0x${i(e, t).toString('hex')}`;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/dist/personal-sign.js',
      },
    ],
    [
      1915,
      {
        './utils': 1917,
        '@ethereumjs/rlp': 449,
        '@ethereumjs/util': 1925,
        '@metamask/utils': 2995,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.hashEIP7702Authorization =
                        r.recoverEIP7702Authorization =
                        r.signEIP7702Authorization =
                          void 0);
                    const n = e('@ethereumjs/rlp'),
                      s = e('@ethereumjs/util'),
                      i = e('@metamask/utils'),
                      a = e('ethereum-cryptography/keccak'),
                      o = e('./utils');
                    function c(e) {
                      u(e);
                      const r = (0, n.encode)(e),
                        s = t.concat([t.from('05', 'hex'), r]);
                      return t.from((0, a.keccak256)(s));
                    }
                    function u(e) {
                      if ((0, o.isNullish)(e)) throw new Error('Missing authorization parameter');
                      const [t, r, n] = e;
                      if ((0, o.isNullish)(t)) throw new Error('Missing chainId parameter');
                      if ((0, o.isNullish)(r)) throw new Error('Missing contractAddress parameter');
                      if ((0, o.isNullish)(n)) throw new Error('Missing nonce parameter');
                    }
                    (r.signEIP7702Authorization = function ({ privateKey: e, authorization: t }) {
                      if ((u(t), (0, o.isNullish)(e)))
                        throw new Error('Missing privateKey parameter');
                      const r = c(t),
                        { r: n, s: i, v: a } = (0, s.ecsign)(r, e),
                        d = (0, s.toBuffer)(a);
                      return (0, o.concatSig)(d, n, i);
                    }),
                      (r.recoverEIP7702Authorization = function ({
                        signature: e,
                        authorization: t,
                      }) {
                        if ((u(t), (0, o.isNullish)(e)))
                          throw new Error('Missing signature parameter');
                        const r = c(t),
                          n = (0, o.recoverPublicKey)(r, e),
                          a = (0, s.publicToAddress)(n);
                        return (0, i.bytesToHex)(a);
                      }),
                      (r.hashEIP7702Authorization = c);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/dist/sign-eip7702-authorization.js',
      },
    ],
    [
      1916,
      {
        './utils': 1917,
        '@ethereumjs/util': 1925,
        '@metamask/abi-utils': 1894,
        '@metamask/abi-utils/dist/parsers': 1903,
        '@metamask/abi-utils/dist/utils': 1911,
        '@metamask/utils': 2995,
        'ethereum-cryptography/keccak': 4366,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.recoverTypedSignature =
                    r.signTypedData =
                    r.typedSignatureHash =
                    r.TypedDataUtils =
                    r.TYPED_MESSAGE_SCHEMA =
                    r.SignTypedDataVersion =
                      void 0);
                const n = e('@ethereumjs/util'),
                  s = e('@metamask/abi-utils'),
                  i = e('@metamask/abi-utils/dist/parsers'),
                  a = e('@metamask/abi-utils/dist/utils'),
                  o = e('@metamask/utils'),
                  c = e('ethereum-cryptography/keccak'),
                  u = e('./utils');
                var d;
                function l(e, t) {
                  if (!Object.keys(d).includes(e)) throw new Error(`Invalid version: '${e}'`);
                  if (t && !t.includes(e))
                    throw new Error(
                      `SignTypedDataVersion not allowed: '${e}'. Allowed versions are: ${t.join(', ')}`
                    );
                }
                function f(e, t) {
                  (0, o.assert)(
                    null !== t,
                    `Unable to encode value: Invalid number. Expected a valid number value, but received "${t}".`
                  );
                  const r = BigInt(t),
                    n = (0, i.getLength)(e),
                    s = BigInt(2) ** BigInt(n) - BigInt(1);
                  return (
                    (0, o.assert)(
                      r >= -s && r <= s,
                      `Unable to encode value: Number "${t}" is out of range for type "${e}".`
                    ),
                    r
                  );
                }
                function h(e) {
                  let t = BigInt(0);
                  for (let r = 0; r < e.length; r++) {
                    const n = BigInt(e.charCodeAt(r) - 48);
                    (t *= BigInt(10)),
                      (t +=
                        n >= 49
                          ? n - BigInt(49) + BigInt(10)
                          : n >= 17
                            ? n - BigInt(17) + BigInt(10)
                            : n);
                  }
                  return (0, a.padStart)((0, o.bigIntToBytes)(t), 20);
                }
                function p(e, t, r, i, u) {
                  if ((l(u, [d.V3, d.V4]), e[r] !== undefined))
                    return [
                      'bytes32',
                      u === d.V4 && null == i
                        ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                        : (0, n.arrToBufArr)((0, c.keccak256)(m(r, i, e, u))),
                    ];
                  if ('function' === r) throw new Error('Unsupported or invalid type: "function"');
                  if (i === undefined) throw new Error(`missing value for field ${t} of type ${r}`);
                  if ('address' === r) {
                    if ('number' == typeof i)
                      return ['address', (0, a.padStart)((0, o.numberToBytes)(i), 20)];
                    if ((0, o.isStrictHexString)(i)) return ['address', (0, o.add0x)(i)];
                    if ('string' == typeof i) return ['address', h(i).subarray(0, 20)];
                  }
                  if ('bool' === r) return ['bool', Boolean(i)];
                  if ('bytes' === r)
                    return (
                      'number' == typeof i
                        ? (i = (0, o.numberToBytes)(i))
                        : (0, o.isStrictHexString)(i) || '0x' === i
                          ? (i = (0, o.hexToBytes)(i))
                          : 'string' == typeof i && (i = (0, o.stringToBytes)(i)),
                      ['bytes32', (0, n.arrToBufArr)((0, c.keccak256)(i))]
                    );
                  if (r.startsWith('bytes') && 'bytes' !== r && !r.includes('['))
                    return 'number' == typeof i
                      ? i < 0
                        ? ['bytes32', new Uint8Array(32)]
                        : ['bytes32', (0, o.bigIntToBytes)(BigInt(i))]
                      : (0, o.isStrictHexString)(i)
                        ? ['bytes32', (0, o.hexToBytes)(i)]
                        : ['bytes32', i];
                  if (r.startsWith('int') && !r.includes('[')) {
                    const e = f(r, i);
                    return e >= BigInt(0) ? ['uint256', e] : ['int256', e];
                  }
                  if ('string' === r)
                    return (
                      (i =
                        'number' == typeof i
                          ? (0, o.numberToBytes)(i)
                          : (0, o.stringToBytes)(null != i ? i : '')),
                      ['bytes32', (0, n.arrToBufArr)((0, c.keccak256)(i))]
                    );
                  if (r.endsWith(']')) {
                    if (u === d.V3)
                      throw new Error('Arrays are unimplemented in encodeData; use V4 extension');
                    const a = r.slice(0, r.lastIndexOf('[')),
                      o = i.map(r => p(e, t, a, r, u));
                    return [
                      'bytes32',
                      (0, n.arrToBufArr)(
                        (0, c.keccak256)(
                          (0, s.encode)(
                            o.map(([e]) => e),
                            o.map(([, e]) => e)
                          )
                        )
                      ),
                    ];
                  }
                  return [r, i];
                }
                function m(e, t, r, i) {
                  l(i, [d.V3, d.V4]);
                  const a = ['bytes32'],
                    o = [w(e, r)];
                  for (const n of r[e]) {
                    if (i === d.V3 && t[n.name] === undefined) continue;
                    const [e, s] = p(r, n.name, n.type, t[n.name], i);
                    a.push(e), o.push(s);
                  }
                  return (0, n.arrToBufArr)((0, s.encode)(a, o));
                }
                function g(e, t) {
                  let r = '';
                  const n = y(e, t);
                  n.delete(e);
                  const s = [e, ...Array.from(n).sort()];
                  for (const e of s) {
                    if (!t[e]) throw new Error(`No type definition specified: ${e}`);
                    r += `${e}(${t[e].map(({ name: e, type: t }) => `${t} ${e}`).join(',')})`;
                  }
                  return r;
                }
                function y(e, t, r = new Set()) {
                  if ('string' != typeof e)
                    throw new Error(`Invalid findTypeDependencies input ${JSON.stringify(e)}`);
                  const n = e.match(/^\w*/u);
                  if ((([e] = n), r.has(e) || t[e] === undefined)) return r;
                  r.add(e);
                  for (const n of t[e]) y(n.type, t, r);
                  return r;
                }
                function b(e, t, r, s) {
                  l(s, [d.V3, d.V4]);
                  const i = m(e, t, r, s),
                    a = (0, c.keccak256)(i);
                  return (0, n.arrToBufArr)(a);
                }
                function w(e, t) {
                  const r = (0, o.stringToBytes)(g(e, t));
                  return (0, n.arrToBufArr)((0, c.keccak256)(r));
                }
                function v(e) {
                  const t = {};
                  for (const n in r.TYPED_MESSAGE_SCHEMA.properties) e[n] && (t[n] = e[n]);
                  return (
                    'types' in t && (t.types = Object.assign({ EIP712Domain: [] }, t.types)), t
                  );
                }
                function k(e, t) {
                  l(t, [d.V3, d.V4]);
                  const r = v(e),
                    { domain: n } = r;
                  return b('EIP712Domain', n, { EIP712Domain: r.types.EIP712Domain }, t);
                }
                function T(e, t) {
                  if ((0, i.isArrayType)(e) && Array.isArray(t)) {
                    const [r] = (0, i.getArrayType)(e);
                    return t.map(e => T(r, e));
                  }
                  if ('address' === e) {
                    if ((0, o.isStrictHexString)(t))
                      return (0, a.padStart)((0, o.hexToBytes)(t).subarray(0, 20), 20);
                    if (t instanceof Uint8Array) return (0, a.padStart)(t.subarray(0, 20), 20);
                  }
                  if ('bool' === e) return Boolean(t);
                  if (e.startsWith('bytes') && 'bytes' !== e) {
                    const r = (0, i.getByteLength)(e);
                    if ('number' == typeof t)
                      return t < 0 ? new Uint8Array() : (0, o.numberToBytes)(t).subarray(0, r);
                    if ((0, o.isStrictHexString)(t)) return (0, o.hexToBytes)(t).subarray(0, r);
                    if (t instanceof Uint8Array) return t.subarray(0, r);
                  }
                  if (e.startsWith('uint') && 'number' == typeof t) return Math.abs(t);
                  if (e.startsWith('int') && 'number' == typeof t) {
                    const r = (0, i.getLength)(e);
                    return BigInt.asIntN(r, BigInt(t));
                  }
                  return t;
                }
                function E(e, t) {
                  return t.map(t => {
                    if ('string' == typeof t || 'number' == typeof t || 'bigint' == typeof t) {
                      const r = f(e, t);
                      if (r >= BigInt(0)) return (0, a.padStart)((0, o.bigIntToBytes)(r), 32);
                      const n = (0, i.getLength)(e),
                        s = BigInt.asIntN(n, r);
                      return (0, o.signedBigIntToBytes)(s, 32);
                    }
                    return t;
                  });
                }
                function A(e) {
                  const t = new Error('Expect argument to be non-empty array');
                  if ('object' != typeof e || !('length' in e) || !e.length) throw t;
                  const r = e.map(({ name: e, type: t, value: r }) => {
                      if ('address[]' === t)
                        return {
                          name: e,
                          type: 'bytes32[]',
                          value:
                            ((n = r),
                            n.map(e =>
                              'number' == typeof e
                                ? (0, a.padStart)((0, o.numberToBytes)(e), 32)
                                : (0, o.isStrictHexString)(e)
                                  ? (0, a.padStart)((0, o.hexToBytes)(e).subarray(0, 32), 32)
                                  : e instanceof Uint8Array
                                    ? (0, a.padStart)(e.subarray(0, 32), 32)
                                    : e
                            )),
                        };
                      var n;
                      if (t.startsWith('int') && (0, i.isArrayType)(t)) {
                        const [n, s] = (0, i.getArrayType)(t);
                        return { name: e, type: `bytes32[${null != s ? s : ''}]`, value: E(n, r) };
                      }
                      return { name: e, type: t, value: T(t, r) };
                    }),
                    d = r.map(e => ('bytes' !== e.type ? e.value : (0, u.legacyToBuffer)(e.value))),
                    l = r.map(e => {
                      if ('function' === e.type)
                        throw new Error('Unsupported or invalid type: "function"');
                      return e.type;
                    }),
                    f = e.map(e => {
                      if (!e.name) throw t;
                      return `${e.type} ${e.name}`;
                    });
                  return (0, n.arrToBufArr)(
                    (0, c.keccak256)(
                      (0, s.encodePacked)(
                        ['bytes32', 'bytes32'],
                        [
                          (0, c.keccak256)((0, s.encodePacked)(['string[]'], [f], !0)),
                          (0, c.keccak256)((0, s.encodePacked)(l, d, !0)),
                        ]
                      )
                    )
                  );
                }
                !(function (e) {
                  (e.V1 = 'V1'), (e.V3 = 'V3'), (e.V4 = 'V4');
                })((d = r.SignTypedDataVersion || (r.SignTypedDataVersion = {}))),
                  (r.TYPED_MESSAGE_SCHEMA = {
                    type: 'object',
                    properties: {
                      types: {
                        type: 'object',
                        additionalProperties: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: { name: { type: 'string' }, type: { type: 'string' } },
                            required: ['name', 'type'],
                          },
                        },
                      },
                      primaryType: { type: 'string' },
                      domain: { type: 'object' },
                      message: { type: 'object' },
                    },
                    required: ['types', 'primaryType', 'domain', 'message'],
                  }),
                  (r.TypedDataUtils = {
                    encodeData: m,
                    encodeType: g,
                    findTypeDependencies: y,
                    hashStruct: b,
                    hashType: w,
                    sanitizeData: v,
                    eip712Hash: function (e, t) {
                      l(t, [d.V3, d.V4]);
                      const r = v(e),
                        s = [(0, o.hexToBytes)('1901')];
                      return (
                        s.push(k(e, t)),
                        'EIP712Domain' !== r.primaryType &&
                          s.push(b(r.primaryType, r.message, r.types, t)),
                        (0, n.arrToBufArr)((0, c.keccak256)((0, o.concatBytes)(s)))
                      );
                    },
                    eip712DomainHash: k,
                  }),
                  (r.typedSignatureHash = function (e) {
                    const t = A(e);
                    return (0, o.bytesToHex)(t);
                  }),
                  (r.signTypedData = function ({ privateKey: e, data: t, version: s }) {
                    if ((l(s), (0, u.isNullish)(t))) throw new Error('Missing data parameter');
                    if ((0, u.isNullish)(e)) throw new Error('Missing private key parameter');
                    const i = s === d.V1 ? A(t) : r.TypedDataUtils.eip712Hash(t, s),
                      a = (0, n.ecsign)(i, e);
                    return (0, u.concatSig)(
                      (0, n.arrToBufArr)((0, o.bigIntToBytes)(a.v)),
                      a.r,
                      a.s
                    );
                  }),
                  (r.recoverTypedSignature = function ({ data: e, signature: t, version: s }) {
                    if ((l(s), (0, u.isNullish)(e))) throw new Error('Missing data parameter');
                    if ((0, u.isNullish)(t)) throw new Error('Missing signature parameter');
                    const i = s === d.V1 ? A(e) : r.TypedDataUtils.eip712Hash(e, s),
                      a = (0, u.recoverPublicKey)(i, t),
                      c = (0, n.publicToAddress)(a);
                    return (0, o.bytesToHex)(c);
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/dist/sign-typed-data.js',
      },
    ],
    [
      1917,
      { '@ethereumjs/util': 1925, '@metamask/utils': 2995, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.normalize =
                        r.recoverPublicKey =
                        r.concatSig =
                        r.legacyToBuffer =
                        r.isNullish =
                        r.padWithZeroes =
                          void 0);
                    const n = e('@ethereumjs/util'),
                      s = e('@metamask/utils');
                    function i(e, t) {
                      if ('' !== e && !/^[a-f0-9]+$/iu.test(e))
                        throw new Error(`Expected an unprefixed hex string. Received: ${e}`);
                      if (t < 0)
                        throw new Error(
                          `Expected a non-negative integer target length. Received: ${t}`
                        );
                      return String.prototype.padStart.call(e, t, '0');
                    }
                    function a(e) {
                      return null === e || e === undefined;
                    }
                    (r.padWithZeroes = i),
                      (r.isNullish = a),
                      (r.legacyToBuffer = function (e) {
                        return 'string' != typeof e || (0, n.isHexString)(e)
                          ? (0, n.toBuffer)(e)
                          : t.from(e);
                      }),
                      (r.concatSig = function (e, t, r) {
                        const a = (0, n.fromSigned)(t),
                          o = (0, n.fromSigned)(r),
                          c = (0, n.bufferToInt)(e),
                          u = i((0, n.toUnsigned)(a).toString('hex'), 64),
                          d = i((0, n.toUnsigned)(o).toString('hex'), 64),
                          l = (0, s.remove0x)((0, s.numberToHex)(c));
                        return (0, s.add0x)(u.concat(d, l));
                      }),
                      (r.recoverPublicKey = function (e, t) {
                        const r = (0, n.fromRpcSig)(t);
                        return (0, n.ecrecover)(e, r.v, r.r, r.s);
                      }),
                      (r.normalize = function (e) {
                        if (a(e)) return undefined;
                        if ('number' == typeof e) {
                          if (e < 0) return '0x';
                          const t = (0, s.numberToBytes)(e);
                          e = (0, s.bytesToHex)(t);
                        }
                        if ('string' != typeof e) {
                          let t = 'eth-sig-util.normalize() requires hex string or integer input.';
                          throw ((t += ` received ${typeof e}: ${e}`), new Error(t));
                        }
                        return (0, s.add0x)(e.toLowerCase());
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/dist/utils.js',
      },
    ],
    [
      1918,
      {
        './bytes': 1921,
        './constants': 1922,
        './helpers': 1924,
        './internal': 1926,
        '@ethereumjs/rlp': 449,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
        'ethereum-cryptography/secp256k1': 4383,
        'ethereum-cryptography/utils': 4385,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.accountBodyToRLP =
                        r.accountBodyToSlim =
                        r.accountBodyFromSlim =
                        r.isZeroAddress =
                        r.zeroAddress =
                        r.importPublic =
                        r.privateToAddress =
                        r.privateToPublic =
                        r.publicToAddress =
                        r.pubToAddress =
                        r.isValidPublic =
                        r.isValidPrivate =
                        r.generateAddress2 =
                        r.generateAddress =
                        r.isValidChecksumAddress =
                        r.toChecksumAddress =
                        r.isValidAddress =
                        r.Account =
                          void 0);
                    const n = e('@ethereumjs/rlp'),
                      s = e('ethereum-cryptography/keccak'),
                      i = e('ethereum-cryptography/secp256k1'),
                      a = e('ethereum-cryptography/utils'),
                      o = e('./bytes'),
                      c = e('./constants'),
                      u = e('./helpers'),
                      d = e('./internal'),
                      l = BigInt(0);
                    class f {
                      constructor(e = l, t = l, r = c.KECCAK256_RLP, n = c.KECCAK256_NULL) {
                        (this.nonce = e),
                          (this.balance = t),
                          (this.storageRoot = r),
                          (this.codeHash = n),
                          this._validate();
                      }
                      static fromAccountData(e) {
                        const { nonce: t, balance: r, storageRoot: n, codeHash: s } = e;
                        return new f(
                          t !== undefined ? (0, o.bufferToBigInt)((0, o.toBuffer)(t)) : undefined,
                          r !== undefined ? (0, o.bufferToBigInt)((0, o.toBuffer)(r)) : undefined,
                          n !== undefined ? (0, o.toBuffer)(n) : undefined,
                          s !== undefined ? (0, o.toBuffer)(s) : undefined
                        );
                      }
                      static fromRlpSerializedAccount(e) {
                        const t = (0, o.arrToBufArr)(n.RLP.decode(Uint8Array.from(e)));
                        if (!Array.isArray(t))
                          throw new Error('Invalid serialized account input. Must be array');
                        return this.fromValuesArray(t);
                      }
                      static fromValuesArray(e) {
                        const [t, r, n, s] = e;
                        return new f((0, o.bufferToBigInt)(t), (0, o.bufferToBigInt)(r), n, s);
                      }
                      _validate() {
                        if (this.nonce < l) throw new Error('nonce must be greater than zero');
                        if (this.balance < l) throw new Error('balance must be greater than zero');
                        if (32 !== this.storageRoot.length)
                          throw new Error('storageRoot must have a length of 32');
                        if (32 !== this.codeHash.length)
                          throw new Error('codeHash must have a length of 32');
                      }
                      raw() {
                        return [
                          (0, o.bigIntToUnpaddedBuffer)(this.nonce),
                          (0, o.bigIntToUnpaddedBuffer)(this.balance),
                          this.storageRoot,
                          this.codeHash,
                        ];
                      }
                      serialize() {
                        return t.from(n.RLP.encode((0, o.bufArrToArr)(this.raw())));
                      }
                      isContract() {
                        return !this.codeHash.equals(c.KECCAK256_NULL);
                      }
                      isEmpty() {
                        return (
                          this.balance === l &&
                          this.nonce === l &&
                          this.codeHash.equals(c.KECCAK256_NULL)
                        );
                      }
                    }
                    r.Account = f;
                    r.isValidAddress = function (e) {
                      try {
                        (0, u.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return /^0x[0-9a-fA-F]{40}$/.test(e);
                    };
                    r.toChecksumAddress = function (e, r) {
                      (0, u.assertIsHexString)(e);
                      const n = (0, d.stripHexPrefix)(e).toLowerCase();
                      let i = '';
                      if (r !== undefined) {
                        i = (0, o.bufferToBigInt)((0, o.toBuffer)(r)).toString() + '0x';
                      }
                      const c = t.from(i + n, 'utf8'),
                        l = (0, a.bytesToHex)((0, s.keccak256)(c));
                      let f = '0x';
                      for (let e = 0; e < n.length; e++)
                        parseInt(l[e], 16) >= 8 ? (f += n[e].toUpperCase()) : (f += n[e]);
                      return f;
                    };
                    r.isValidChecksumAddress = function (e, t) {
                      return (0, r.isValidAddress)(e) && (0, r.toChecksumAddress)(e, t) === e;
                    };
                    r.generateAddress = function (e, r) {
                      return (
                        (0, u.assertIsBuffer)(e),
                        (0, u.assertIsBuffer)(r),
                        (0, o.bufferToBigInt)(r) === BigInt(0)
                          ? t
                              .from((0, s.keccak256)(n.RLP.encode((0, o.bufArrToArr)([e, null]))))
                              .slice(-20)
                          : t
                              .from((0, s.keccak256)(n.RLP.encode((0, o.bufArrToArr)([e, r]))))
                              .slice(-20)
                      );
                    };
                    r.generateAddress2 = function (e, r, n) {
                      if (
                        ((0, u.assertIsBuffer)(e),
                        (0, u.assertIsBuffer)(r),
                        (0, u.assertIsBuffer)(n),
                        20 !== e.length)
                      )
                        throw new Error('Expected from to be of length 20');
                      if (32 !== r.length) throw new Error('Expected salt to be of length 32');
                      const i = (0, s.keccak256)(
                        t.concat([t.from('ff', 'hex'), e, r, (0, s.keccak256)(n)])
                      );
                      return (0, o.toBuffer)(i).slice(-20);
                    };
                    r.isValidPrivate = function (e) {
                      return i.secp256k1.utils.isValidPrivateKey(e);
                    };
                    r.isValidPublic = function (e, r = !1) {
                      if (((0, u.assertIsBuffer)(e), 64 === e.length))
                        try {
                          return (
                            i.secp256k1.ProjectivePoint.fromHex(t.concat([t.from([4]), e])), !0
                          );
                        } catch (e) {
                          return !1;
                        }
                      if (!r) return !1;
                      try {
                        return i.secp256k1.ProjectivePoint.fromHex(e), !0;
                      } catch (e) {
                        return !1;
                      }
                    };
                    (r.pubToAddress = function (e, r = !1) {
                      if (
                        ((0, u.assertIsBuffer)(e),
                        r &&
                          64 !== e.length &&
                          (e = t.from(
                            i.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        64 !== e.length)
                      )
                        throw new Error('Expected pubKey to be of length 64');
                      return t.from((0, s.keccak256)(e)).slice(-20);
                    }),
                      (r.publicToAddress = r.pubToAddress);
                    r.privateToPublic = function (e) {
                      return (
                        (0, u.assertIsBuffer)(e),
                        t.from(
                          i.secp256k1.ProjectivePoint.fromPrivateKey(e).toRawBytes(!1).slice(1)
                        )
                      );
                    };
                    r.privateToAddress = function (e) {
                      return (0, r.publicToAddress)((0, r.privateToPublic)(e));
                    };
                    r.importPublic = function (e) {
                      return (
                        (0, u.assertIsBuffer)(e),
                        64 !== e.length &&
                          (e = t.from(
                            i.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        e
                      );
                    };
                    r.zeroAddress = function () {
                      const e = (0, o.zeros)(20);
                      return (0, o.bufferToHex)(e);
                    };
                    function h(e) {
                      const [t, r, n, s] = e;
                      return [
                        t,
                        r,
                        0 === (0, o.arrToBufArr)(n).length ? c.KECCAK256_RLP : n,
                        0 === (0, o.arrToBufArr)(s).length ? c.KECCAK256_NULL : s,
                      ];
                    }
                    (r.isZeroAddress = function (e) {
                      try {
                        (0, u.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return (0, r.zeroAddress)() === e;
                    }),
                      (r.accountBodyFromSlim = h);
                    const p = new Uint8Array(0);
                    (r.accountBodyToSlim = function (e) {
                      const [t, r, n, s] = e;
                      return [
                        t,
                        r,
                        (0, o.arrToBufArr)(n).equals(c.KECCAK256_RLP) ? p : n,
                        (0, o.arrToBufArr)(s).equals(c.KECCAK256_NULL) ? p : s,
                      ];
                    }),
                      (r.accountBodyToRLP = function (e, t = !0) {
                        const r = t ? h(e) : e;
                        return (0, o.arrToBufArr)(n.RLP.encode(r));
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/account.js',
      },
    ],
    [
      1919,
      { './account': 1918, './bytes': 1921, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }), (r.Address = void 0);
                    const n = e('./account'),
                      s = e('./bytes');
                    class i {
                      constructor(e) {
                        if (20 !== e.length) throw new Error('Invalid address length');
                        this.buf = e;
                      }
                      static zero() {
                        return new i((0, s.zeros)(20));
                      }
                      static fromString(e) {
                        if (!(0, n.isValidAddress)(e)) throw new Error('Invalid address');
                        return new i((0, s.toBuffer)(e));
                      }
                      static fromPublicKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Public key should be Buffer');
                        const r = (0, n.pubToAddress)(e);
                        return new i(r);
                      }
                      static fromPrivateKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Private key should be Buffer');
                        const r = (0, n.privateToAddress)(e);
                        return new i(r);
                      }
                      static generate(e, t) {
                        if ('bigint' != typeof t) throw new Error('Expected nonce to be a bigint');
                        return new i((0, n.generateAddress)(e.buf, (0, s.bigIntToBuffer)(t)));
                      }
                      static generate2(e, r, s) {
                        if (!t.isBuffer(r)) throw new Error('Expected salt to be a Buffer');
                        if (!t.isBuffer(s)) throw new Error('Expected initCode to be a Buffer');
                        return new i((0, n.generateAddress2)(e.buf, r, s));
                      }
                      equals(e) {
                        return this.buf.equals(e.buf);
                      }
                      isZero() {
                        return this.equals(i.zero());
                      }
                      isPrecompileOrSystemAddress() {
                        const e = (0, s.bufferToBigInt)(this.buf),
                          t = BigInt(0),
                          r = BigInt('0xffff');
                        return e >= t && e <= r;
                      }
                      toString() {
                        return '0x' + this.buf.toString('hex');
                      }
                      toBuffer() {
                        return t.from(this.buf);
                      }
                    }
                    r.Address = i;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/address.js',
      },
    ],
    [
      192,
      { '@ethersproject/abi': 504, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.decodeTransactionDataWithSourcify = async function (e, t, r) {
                    var o, c;
                    const u = await (async function (e, t) {
                      var r;
                      const n = await (async function (e, t) {
                          const r = parseInt(t, 16),
                            n = await fetch(`https://sourcify.dev/server/files/any/${r}/${e}`);
                          if (!n.ok) throw new Error('Failed to fetch Sourcify files');
                          return n.json();
                        })(e, t),
                        s =
                          null === (r = n.files) || void 0 === r
                            ? void 0
                            : r.find(e => e.name.includes('metadata.json'));
                      if (!s) throw new Error('Metadata not found');
                      return JSON.parse(s.content);
                    })(t, r);
                    s('Retrieved Sourcify metadata', {
                      contractAddress: t,
                      chainId: r,
                      metadata: u,
                    });
                    const { abi: d } = u.output,
                      l = new n.Interface(d),
                      f = e.slice(0, 10);
                    let h;
                    try {
                      h = l.getFunction(f);
                    } catch (e) {}
                    if (!h) return s('Failed to find function in ABI', f, d), undefined;
                    const { name: p, inputs: m } = h,
                      g = a(p, m),
                      y = null === (o = u.output.userdoc) || void 0 === o ? void 0 : o.methods[g],
                      b = null === (c = u.output.devdoc) || void 0 === c ? void 0 : c.methods[g],
                      w = (null == y ? void 0 : y.notice) ?? (null == b ? void 0 : b.details);
                    s('Extracted NatSpec', { signature: g, userDoc: y, devDoc: b });
                    const v = l.decodeFunctionData(f, e),
                      k = m.map((e, t) => i(e, t, v, y, b));
                    return { name: p, description: w, params: k };
                  });
                var n = e('@ethersproject/abi');
                const s = (0, e('@metamask/utils').createProjectLogger)('sourcify');
                function i(e, t, r, n, s) {
                  var a, o;
                  const { name: c, type: u, components: d } = e,
                    l =
                      (null == n || null === (a = n.params) || void 0 === a ? void 0 : a[c]) ??
                      (null == s || null === (o = s.params) || void 0 === o ? void 0 : o[c]),
                    f = r[t];
                  let h = null == d ? void 0 : d.map((e, t) => i(e, t, f, {}, {}));
                  if (u.endsWith('[]')) {
                    const t = u.slice(0, -2);
                    h = f.map((r, n) => {
                      const s = `Item ${n + 1}`;
                      return i({ ...e, name: s, type: t }, n, f, {}, {});
                    });
                  }
                  return { name: c, description: l, type: u, value: f, children: h };
                }
                function a(e, t) {
                  return `${e ?? ''}(${t
                    .map(e => {
                      var t;
                      return null !== (t = e.components) && void 0 !== t && t.length
                        ? `${a(undefined, e.components)}${e.type.endsWith('[]') ? '[]' : ''}`
                        : e.type;
                    })
                    .join(',')})`;
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/decode/sourcify.ts' },
    ],
    [
      1920,
      { events: 4465 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.AsyncEventEmitter = void 0);
                const n = e('events');
                class s extends n.EventEmitter {
                  emit(e, ...t) {
                    let [r, n] = t;
                    const s = this;
                    let i = s._events[e] ?? [];
                    return (
                      n === undefined && 'function' == typeof r && ((n = r), (r = undefined)),
                      ('newListener' !== e && 'removeListener' !== e) ||
                        ((r = { event: r, fn: n }), (n = undefined)),
                      (i = Array.isArray(i) ? i : [i]),
                      (async function (e, t, r) {
                        let n;
                        for await (const s of t)
                          try {
                            s.length < 2
                              ? s.call(e, r)
                              : await new Promise((t, n) => {
                                  s.call(e, r, e => {
                                    e ? n(e) : t();
                                  });
                                });
                          } catch (e) {
                            n = e;
                          }
                        if (n) throw n;
                      })(s, i.slice(), r)
                        .then(n)
                        .catch(n),
                      s.listenerCount(e) > 0
                    );
                  }
                  once(e, t) {
                    const r = this;
                    let n;
                    if ('function' != typeof t) throw new TypeError('listener must be a function');
                    return (
                      (n =
                        t.length >= 2
                          ? function (s, i) {
                              r.removeListener(e, n), t(s, i);
                            }
                          : function (s) {
                              r.removeListener(e, n), t(s, n);
                            }),
                      r.on(e, n),
                      r
                    );
                  }
                  first(e, t) {
                    let r = this._events[e] ?? [];
                    if ('function' != typeof t) throw new TypeError('listener must be a function');
                    return Array.isArray(r) || (this._events[e] = r = [r]), r.unshift(t), this;
                  }
                  before(e, t, r) {
                    return this.beforeOrAfter(e, t, r);
                  }
                  after(e, t, r) {
                    return this.beforeOrAfter(e, t, r, 'after');
                  }
                  beforeOrAfter(e, t, r, n) {
                    let s,
                      i,
                      a = this._events[e] ?? [];
                    const o = 'after' === n ? 1 : 0;
                    if ('function' != typeof r) throw new TypeError('listener must be a function');
                    if ('function' != typeof t) throw new TypeError('target must be a function');
                    for (
                      Array.isArray(a) || (this._events[e] = a = [a]), i = a.length, s = a.length;
                      s--;

                    )
                      if (a[s] === t) {
                        i = s + o;
                        break;
                      }
                    return a.splice(i, 0, r), this;
                  }
                  on(e, t) {
                    return super.on(e, t);
                  }
                  addListener(e, t) {
                    return super.addListener(e, t);
                  }
                  prependListener(e, t) {
                    return super.prependListener(e, t);
                  }
                  prependOnceListener(e, t) {
                    return super.prependOnceListener(e, t);
                  }
                  removeAllListeners(e) {
                    return super.removeAllListeners(e);
                  }
                  removeListener(e, t) {
                    return super.removeListener(e, t);
                  }
                  eventNames() {
                    return super.eventNames();
                  }
                  listeners(e) {
                    return super.listeners(e);
                  }
                  listenerCount(e) {
                    return super.listenerCount(e);
                  }
                  getMaxListeners() {
                    return super.getMaxListeners();
                  }
                  setMaxListeners(e) {
                    return super.setMaxListeners(e);
                  }
                }
                r.AsyncEventEmitter = s;
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/asyncEventEmitter.js',
      },
    ],
    [
      1921,
      { './helpers': 1924, './internal': 1926, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.intToUnpaddedBuffer =
                        r.bigIntToUnpaddedBuffer =
                        r.bigIntToHex =
                        r.bufArrToArr =
                        r.arrToBufArr =
                        r.validateNoLeadingZeroes =
                        r.baToJSON =
                        r.toUtf8 =
                        r.short =
                        r.addHexPrefix =
                        r.toUnsigned =
                        r.fromSigned =
                        r.bufferToInt =
                        r.bigIntToBuffer =
                        r.bufferToBigInt =
                        r.bufferToHex =
                        r.toBuffer =
                        r.unpadHexString =
                        r.unpadArray =
                        r.unpadBuffer =
                        r.setLengthRight =
                        r.setLengthLeft =
                        r.zeros =
                        r.intToBuffer =
                        r.intToHex =
                          void 0);
                    const n = e('./helpers'),
                      s = e('./internal');
                    r.intToHex = function (e) {
                      if (!Number.isSafeInteger(e) || e < 0)
                        throw new Error(`Received an invalid integer type: ${e}`);
                      return `0x${e.toString(16)}`;
                    };
                    r.intToBuffer = function (e) {
                      const n = (0, r.intToHex)(e);
                      return t.from((0, s.padToEven)(n.slice(2)), 'hex');
                    };
                    r.zeros = function (e) {
                      return t.allocUnsafe(e).fill(0);
                    };
                    const i = function (e, t, n) {
                      const s = (0, r.zeros)(t);
                      return n
                        ? e.length < t
                          ? (e.copy(s), s)
                          : e.slice(0, t)
                        : e.length < t
                          ? (e.copy(s, t - e.length), s)
                          : e.slice(-t);
                    };
                    r.setLengthLeft = function (e, t) {
                      return (0, n.assertIsBuffer)(e), i(e, t, !1);
                    };
                    r.setLengthRight = function (e, t) {
                      return (0, n.assertIsBuffer)(e), i(e, t, !0);
                    };
                    const a = function (e) {
                      let t = e[0];
                      for (; e.length > 0 && '0' === t.toString(); ) t = (e = e.slice(1))[0];
                      return e;
                    };
                    r.unpadBuffer = function (e) {
                      return (0, n.assertIsBuffer)(e), a(e);
                    };
                    r.unpadArray = function (e) {
                      return (0, n.assertIsArray)(e), a(e);
                    };
                    r.unpadHexString = function (e) {
                      return (
                        (0, n.assertIsHexString)(e), (e = (0, s.stripHexPrefix)(e)), '0x' + a(e)
                      );
                    };
                    r.toBuffer = function (e) {
                      if (null === e || e === undefined) return t.allocUnsafe(0);
                      if (t.isBuffer(e)) return t.from(e);
                      if (Array.isArray(e) || e instanceof Uint8Array) return t.from(e);
                      if ('string' == typeof e) {
                        if (!(0, s.isHexString)(e))
                          throw new Error(
                            `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${e}`
                          );
                        return t.from((0, s.padToEven)((0, s.stripHexPrefix)(e)), 'hex');
                      }
                      if ('number' == typeof e) return (0, r.intToBuffer)(e);
                      if ('bigint' == typeof e) {
                        if (e < BigInt(0))
                          throw new Error(`Cannot convert negative bigint to buffer. Given: ${e}`);
                        let r = e.toString(16);
                        return r.length % 2 && (r = '0' + r), t.from(r, 'hex');
                      }
                      if (e.toArray) return t.from(e.toArray());
                      if (e.toBuffer) return t.from(e.toBuffer());
                      throw new Error('invalid type');
                    };
                    function o(e) {
                      const t = (0, r.bufferToHex)(e);
                      return '0x' === t ? BigInt(0) : BigInt(t);
                    }
                    function c(e) {
                      return (0, r.toBuffer)('0x' + e.toString(16));
                    }
                    (r.bufferToHex = function (e) {
                      return '0x' + (e = (0, r.toBuffer)(e)).toString('hex');
                    }),
                      (r.bufferToBigInt = o),
                      (r.bigIntToBuffer = c);
                    r.bufferToInt = function (e) {
                      const t = Number(o(e));
                      if (!Number.isSafeInteger(t)) throw new Error('Number exceeds 53 bits');
                      return t;
                    };
                    r.fromSigned = function (e) {
                      return BigInt.asIntN(256, o(e));
                    };
                    r.toUnsigned = function (e) {
                      return c(BigInt.asUintN(256, e));
                    };
                    (r.addHexPrefix = function (e) {
                      return 'string' != typeof e || (0, s.isHexPrefixed)(e) ? e : '0x' + e;
                    }),
                      (r.short = function (e, r = 50) {
                        const n = t.isBuffer(e) ? e.toString('hex') : e;
                        return n.length <= r ? n : n.slice(0, r) + '…';
                      });
                    r.toUtf8 = function (e) {
                      if ((e = (0, s.stripHexPrefix)(e)).length % 2 != 0)
                        throw new Error('Invalid non-even hex string input for toUtf8() provided');
                      return t.from(e.replace(/^(00)+|(00)+$/g, ''), 'hex').toString('utf8');
                    };
                    r.baToJSON = function (e) {
                      if (t.isBuffer(e)) return `0x${e.toString('hex')}`;
                      if (e instanceof Array) {
                        const t = [];
                        for (let n = 0; n < e.length; n++) t.push((0, r.baToJSON)(e[n]));
                        return t;
                      }
                    };
                    (r.validateNoLeadingZeroes = function (e) {
                      for (const [t, r] of Object.entries(e))
                        if (r !== undefined && r.length > 0 && 0 === r[0])
                          throw new Error(
                            `${t} cannot have leading zeroes, received: ${r.toString('hex')}`
                          );
                    }),
                      (r.arrToBufArr = function e(r) {
                        return Array.isArray(r) ? r.map(t => e(t)) : t.from(r);
                      }),
                      (r.bufArrToArr = function e(t) {
                        return Array.isArray(t) ? t.map(t => e(t)) : Uint8Array.from(t ?? []);
                      });
                    (r.bigIntToHex = e => '0x' + e.toString(16)),
                      (r.bigIntToUnpaddedBuffer = function (e) {
                        return (0, r.unpadBuffer)(c(e));
                      }),
                      (r.intToUnpaddedBuffer = function (e) {
                        return (0, r.unpadBuffer)((0, r.intToBuffer)(e));
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/bytes.js',
      },
    ],
    [
      1922,
      { buffer: 4139, 'ethereum-cryptography/secp256k1': 4383 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.MAX_WITHDRAWALS_PER_PAYLOAD =
                    r.RLP_EMPTY_STRING =
                    r.KECCAK256_RLP =
                    r.KECCAK256_RLP_S =
                    r.KECCAK256_RLP_ARRAY =
                    r.KECCAK256_RLP_ARRAY_S =
                    r.KECCAK256_NULL =
                    r.KECCAK256_NULL_S =
                    r.TWO_POW256 =
                    r.SECP256K1_ORDER_DIV_2 =
                    r.SECP256K1_ORDER =
                    r.MAX_INTEGER_BIGINT =
                    r.MAX_INTEGER =
                    r.MAX_UINT64 =
                      void 0);
                const n = e('buffer'),
                  s = e('ethereum-cryptography/secp256k1');
                (r.MAX_UINT64 = BigInt('0xffffffffffffffff')),
                  (r.MAX_INTEGER = BigInt(
                    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                  )),
                  (r.MAX_INTEGER_BIGINT = BigInt(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                  )),
                  (r.SECP256K1_ORDER = s.secp256k1.CURVE.n),
                  (r.SECP256K1_ORDER_DIV_2 = s.secp256k1.CURVE.n / BigInt(2)),
                  (r.TWO_POW256 = BigInt(
                    '0x10000000000000000000000000000000000000000000000000000000000000000'
                  )),
                  (r.KECCAK256_NULL_S =
                    'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'),
                  (r.KECCAK256_NULL = n.Buffer.from(r.KECCAK256_NULL_S, 'hex')),
                  (r.KECCAK256_RLP_ARRAY_S =
                    '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
                  (r.KECCAK256_RLP_ARRAY = n.Buffer.from(r.KECCAK256_RLP_ARRAY_S, 'hex')),
                  (r.KECCAK256_RLP_S =
                    '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'),
                  (r.KECCAK256_RLP = n.Buffer.from(r.KECCAK256_RLP_S, 'hex')),
                  (r.RLP_EMPTY_STRING = n.Buffer.from([128])),
                  (r.MAX_WITHDRAWALS_PER_PAYLOAD = 16);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/constants.js',
      },
    ],
    [
      1923,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.compactBytesToNibbles =
                    r.bytesToNibbles =
                    r.nibblesToCompactBytes =
                    r.nibblesToBytes =
                    r.hasTerminator =
                      void 0);
                r.hasTerminator = e => e.length > 0 && 16 === e[e.length - 1];
                r.nibblesToBytes = (e, t) => {
                  for (let r = 0, n = 0; n < e.length; r += 1, n += 2)
                    t[r] = (e[n] << 4) | e[n + 1];
                };
                r.nibblesToCompactBytes = e => {
                  let t = 0;
                  (0, r.hasTerminator)(e) && ((t = 1), (e = e.subarray(0, e.length - 1)));
                  const n = new Uint8Array(e.length / 2 + 1);
                  return (
                    (n[0] = t << 5),
                    1 & ~e.length || ((n[0] |= 16), (n[0] |= e[0]), (e = e.subarray(1))),
                    (0, r.nibblesToBytes)(e, n.subarray(1)),
                    n
                  );
                };
                r.bytesToNibbles = e => {
                  const t = 2 * e.length + 1,
                    r = new Uint8Array(t);
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    (r[2 * t] = n / 16), (r[2 * t + 1] = n % 16);
                  }
                  return (r[t - 1] = 16), r;
                };
                r.compactBytesToNibbles = e => {
                  if (0 === e.length) return e;
                  let t = (0, r.bytesToNibbles)(e);
                  t[0] < 2 && (t = t.subarray(0, t.length - 1));
                  const n = 2 - (1 & t[0]);
                  return t.subarray(n);
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/encoding.js',
      },
    ],
    [
      1924,
      { '../../../../../../../../../is-buffer/index.js': 4723, './internal': 1926 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.assertIsString =
                        r.assertIsArray =
                        r.assertIsBuffer =
                        r.assertIsHexString =
                          void 0);
                    const n = e('./internal');
                    r.assertIsHexString = function (e) {
                      if (!(0, n.isHexString)(e)) {
                        throw new Error(
                          `This method only supports 0x-prefixed hex strings but input was: ${e}`
                        );
                      }
                    };
                    r.assertIsBuffer = function (e) {
                      if (!t.isBuffer(e)) {
                        throw new Error(`This method only supports Buffer but input was: ${e}`);
                      }
                    };
                    r.assertIsArray = function (e) {
                      if (!Array.isArray(e)) {
                        throw new Error(
                          `This method only supports number arrays but input was: ${e}`
                        );
                      }
                    };
                    r.assertIsString = function (e) {
                      if ('string' != typeof e) {
                        throw new Error(`This method only supports strings but input was: ${e}`);
                      }
                    };
                  }).call(this);
                }).call(this, { isBuffer: e('../../../../../../../../../is-buffer/index.js') });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/helpers.js',
      },
    ],
    [
      1925,
      {
        './account': 1918,
        './address': 1919,
        './asyncEventEmitter': 1920,
        './bytes': 1921,
        './constants': 1922,
        './encoding': 1923,
        './internal': 1926,
        './lock': 1927,
        './provider': 1928,
        './signature': 1929,
        './types': 1930,
        './units': 1931,
        './withdrawal': 1932,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                    (this && this.__createBinding) ||
                    (Object.create
                      ? function (e, t, r, n) {
                          n === undefined && (n = r);
                          var s = Object.getOwnPropertyDescriptor(t, r);
                          (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                            (s = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, s);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  s =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toAscii =
                    r.stripHexPrefix =
                    r.padToEven =
                    r.isHexString =
                    r.isHexPrefixed =
                    r.getKeys =
                    r.getBinarySize =
                    r.fromUtf8 =
                    r.fromAscii =
                    r.arrayContainsArray =
                      void 0),
                  s(e('./constants'), r),
                  s(e('./units'), r),
                  s(e('./account'), r),
                  s(e('./address'), r),
                  s(e('./withdrawal'), r),
                  s(e('./signature'), r),
                  s(e('./bytes'), r),
                  s(e('./types'), r),
                  s(e('./encoding'), r),
                  s(e('./asyncEventEmitter'), r);
                var i = e('./internal');
                Object.defineProperty(r, 'arrayContainsArray', {
                  enumerable: !0,
                  get: function () {
                    return i.arrayContainsArray;
                  },
                }),
                  Object.defineProperty(r, 'fromAscii', {
                    enumerable: !0,
                    get: function () {
                      return i.fromAscii;
                    },
                  }),
                  Object.defineProperty(r, 'fromUtf8', {
                    enumerable: !0,
                    get: function () {
                      return i.fromUtf8;
                    },
                  }),
                  Object.defineProperty(r, 'getBinarySize', {
                    enumerable: !0,
                    get: function () {
                      return i.getBinarySize;
                    },
                  }),
                  Object.defineProperty(r, 'getKeys', {
                    enumerable: !0,
                    get: function () {
                      return i.getKeys;
                    },
                  }),
                  Object.defineProperty(r, 'isHexPrefixed', {
                    enumerable: !0,
                    get: function () {
                      return i.isHexPrefixed;
                    },
                  }),
                  Object.defineProperty(r, 'isHexString', {
                    enumerable: !0,
                    get: function () {
                      return i.isHexString;
                    },
                  }),
                  Object.defineProperty(r, 'padToEven', {
                    enumerable: !0,
                    get: function () {
                      return i.padToEven;
                    },
                  }),
                  Object.defineProperty(r, 'stripHexPrefix', {
                    enumerable: !0,
                    get: function () {
                      return i.stripHexPrefix;
                    },
                  }),
                  Object.defineProperty(r, 'toAscii', {
                    enumerable: !0,
                    get: function () {
                      return i.toAscii;
                    },
                  }),
                  s(e('./lock'), r),
                  s(e('./provider'), r);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/index.js',
      },
    ],
    [
      1926,
      { buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (e) {
                  (function () {
                    function t(e) {
                      if ('string' != typeof e)
                        throw new Error(
                          "[isHexPrefixed] input must be type 'string', received type " + typeof e
                        );
                      return '0' === e[0] && 'x' === e[1];
                    }
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.isHexString =
                        r.getKeys =
                        r.fromAscii =
                        r.fromUtf8 =
                        r.toAscii =
                        r.arrayContainsArray =
                        r.getBinarySize =
                        r.padToEven =
                        r.stripHexPrefix =
                        r.isHexPrefixed =
                          void 0),
                      (r.isHexPrefixed = t);
                    function n(e) {
                      let t = e;
                      if ('string' != typeof t)
                        throw new Error(
                          "[padToEven] value must be type 'string', received " + typeof t
                        );
                      return t.length % 2 && (t = `0${t}`), t;
                    }
                    (r.stripHexPrefix = e => {
                      if ('string' != typeof e)
                        throw new Error(
                          "[stripHexPrefix] input must be type 'string', received " + typeof e
                        );
                      return t(e) ? e.slice(2) : e;
                    }),
                      (r.padToEven = n),
                      (r.getBinarySize = function (t) {
                        if ('string' != typeof t)
                          throw new Error(
                            "[getBinarySize] method requires input type 'string', received " +
                              typeof t
                          );
                        return e.byteLength(t, 'utf8');
                      }),
                      (r.arrayContainsArray = function (e, t, r) {
                        if (!0 !== Array.isArray(e))
                          throw new Error(
                            `[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof e}'`
                          );
                        if (!0 !== Array.isArray(t))
                          throw new Error(
                            `[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof t}'`
                          );
                        return t[!0 === r ? 'some' : 'every'](t => e.indexOf(t) >= 0);
                      }),
                      (r.toAscii = function (e) {
                        let t = '',
                          r = 0;
                        const n = e.length;
                        for ('0x' === e.substring(0, 2) && (r = 2); r < n; r += 2) {
                          const n = parseInt(e.substr(r, 2), 16);
                          t += String.fromCharCode(n);
                        }
                        return t;
                      }),
                      (r.fromUtf8 = function (t) {
                        return `0x${n(e.from(t, 'utf8').toString('hex')).replace(/^0+|0+$/g, '')}`;
                      }),
                      (r.fromAscii = function (e) {
                        let t = '';
                        for (let r = 0; r < e.length; r++) {
                          const n = e.charCodeAt(r).toString(16);
                          t += n.length < 2 ? `0${n}` : n;
                        }
                        return `0x${t}`;
                      }),
                      (r.getKeys = function (e, t, r) {
                        if (!Array.isArray(e))
                          throw new Error(
                            "[getKeys] method expects input 'params' to be an array, got " +
                              typeof e
                          );
                        if ('string' != typeof t)
                          throw new Error(
                            "[getKeys] method expects input 'key' to be type 'string', got " +
                              typeof e
                          );
                        const n = [];
                        for (let s = 0; s < e.length; s++) {
                          let i = e[s][t];
                          if (!0 !== r || i) {
                            if ('string' != typeof i)
                              throw new Error(
                                "invalid abi - expected type 'string', received " + typeof i
                              );
                          } else i = '';
                          n.push(i);
                        }
                        return n;
                      }),
                      (r.isHexString = function (e, t) {
                        return (
                          !('string' != typeof e || !e.match(/^0x[0-9A-Fa-f]*$/)) &&
                          !(void 0 !== t && t > 0 && e.length !== 2 + 2 * t)
                        );
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/internal.js',
      },
    ],
    [
      1927,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.Lock = void 0);
                r.Lock = class {
                  constructor() {
                    (this.permits = 1), (this.promiseResolverQueue = []);
                  }
                  async acquire() {
                    return this.permits > 0
                      ? ((this.permits -= 1), Promise.resolve(!0))
                      : new Promise(e => this.promiseResolverQueue.push(e));
                  }
                  release() {
                    if (
                      ((this.permits += 1),
                      this.permits > 1 && this.promiseResolverQueue.length > 0)
                    )
                      console.warn(
                        'Lock.permits should never be > 0 when there is someone waiting.'
                      );
                    else if (1 === this.permits && this.promiseResolverQueue.length > 0) {
                      this.permits -= 1;
                      const e = this.promiseResolverQueue.shift();
                      e && e(!0);
                    }
                  }
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/lock.js',
      },
    ],
    [
      1928,
      { 'micro-ftch': 4977 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getProvider = r.fetchFromProvider = void 0);
                const n = e('micro-ftch');
                r.fetchFromProvider = async (e, t) =>
                  (
                    await (0, n.default)(e, {
                      headers: { 'content-type': 'application/json' },
                      type: 'json',
                      data: { method: t.method, params: t.params, jsonrpc: '2.0', id: 1 },
                    })
                  ).result;
                r.getProvider = e => {
                  if ('string' == typeof e) return e;
                  if (e?.connection?.url !== undefined) return e.connection.url;
                  throw new Error('Must provide valid provider URL or Web3Provider');
                };
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/provider.js',
      },
    ],
    [
      1929,
      {
        './bytes': 1921,
        './constants': 1922,
        './helpers': 1924,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
        'ethereum-cryptography/secp256k1': 4383,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.hashPersonalMessage =
                        r.isValidSignature =
                        r.fromRpcSig =
                        r.toCompactSig =
                        r.toRpcSig =
                        r.ecrecover =
                        r.ecsign =
                          void 0);
                    const n = e('ethereum-cryptography/keccak'),
                      s = e('ethereum-cryptography/secp256k1'),
                      i = e('./bytes'),
                      a = e('./constants'),
                      o = e('./helpers');
                    function c(e, t) {
                      return e === BigInt(0) || e === BigInt(1)
                        ? e
                        : t === undefined
                          ? e - BigInt(27)
                          : e - (t * BigInt(2) + BigInt(35));
                    }
                    function u(e) {
                      return e === BigInt(0) || e === BigInt(1);
                    }
                    r.ecsign = function (e, r, n) {
                      const i = s.secp256k1.sign(e, r),
                        a = i.toCompactRawBytes();
                      return {
                        r: t.from(a.slice(0, 32)),
                        s: t.from(a.slice(32, 64)),
                        v:
                          n === undefined
                            ? BigInt(i.recovery + 27)
                            : BigInt(i.recovery + 35) + BigInt(n) * BigInt(2),
                      };
                    };
                    r.ecrecover = function (e, r, n, a, o) {
                      const d = t.concat(
                          [(0, i.setLengthLeft)(n, 32), (0, i.setLengthLeft)(a, 32)],
                          64
                        ),
                        l = c(r, o);
                      if (!u(l)) throw new Error('Invalid signature v value');
                      const f = s.secp256k1.Signature.fromCompact(d)
                        .addRecoveryBit(Number(l))
                        .recoverPublicKey(e);
                      return t.from(f.toRawBytes(!1).slice(1));
                    };
                    r.toRpcSig = function (e, r, n, s) {
                      if (!u(c(e, s))) throw new Error('Invalid signature v value');
                      return (0, i.bufferToHex)(
                        t.concat([
                          (0, i.setLengthLeft)(r, 32),
                          (0, i.setLengthLeft)(n, 32),
                          (0, i.toBuffer)(e),
                        ])
                      );
                    };
                    r.toCompactSig = function (e, r, n, s) {
                      if (!u(c(e, s))) throw new Error('Invalid signature v value');
                      let a = n;
                      return (
                        ((e > BigInt(28) && e % BigInt(2) === BigInt(1)) ||
                          e === BigInt(1) ||
                          e === BigInt(28)) &&
                          ((a = t.from(n)), (a[0] |= 128)),
                        (0, i.bufferToHex)(
                          t.concat([(0, i.setLengthLeft)(r, 32), (0, i.setLengthLeft)(a, 32)])
                        )
                      );
                    };
                    r.fromRpcSig = function (e) {
                      const t = (0, i.toBuffer)(e);
                      let r, n, s;
                      if (t.length >= 65)
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (s = (0, i.bufferToBigInt)(t.slice(64)));
                      else {
                        if (64 !== t.length) throw new Error('Invalid signature length');
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (s = BigInt((0, i.bufferToInt)(t.slice(32, 33)) >> 7)),
                          (n[0] &= 127);
                      }
                      return s < 27 && (s += BigInt(27)), { v: s, r: r, s: n };
                    };
                    r.isValidSignature = function (e, t, r, n = !0, s) {
                      if (32 !== t.length || 32 !== r.length) return !1;
                      if (!u(c(e, s))) return !1;
                      const o = (0, i.bufferToBigInt)(t),
                        d = (0, i.bufferToBigInt)(r);
                      return (
                        !(
                          o === BigInt(0) ||
                          o >= a.SECP256K1_ORDER ||
                          d === BigInt(0) ||
                          d >= a.SECP256K1_ORDER
                        ) && !(n && d >= a.SECP256K1_ORDER_DIV_2)
                      );
                    };
                    r.hashPersonalMessage = function (e) {
                      (0, o.assertIsBuffer)(e);
                      const r = t.from(`Ethereum Signed Message:\n${e.length}`, 'utf-8');
                      return t.from((0, n.keccak256)(t.concat([r, e])));
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/signature.js',
      },
    ],
    [
      193,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.UNISWAP_ROUTER_COMMANDS = void 0);
                r.UNISWAP_ROUTER_COMMANDS = {
                  0: {
                    name: 'V3_SWAP_EXACT_IN',
                    params: [
                      {
                        type: 'address',
                        description: 'The recipient of the output of the trade',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The amount of input tokens for the trade',
                        name: 'amountIn',
                      },
                      {
                        type: 'uint256',
                        description: 'The minimum amount of output tokens the user wants',
                        name: 'amountOutMin',
                      },
                      {
                        type: 'bytes',
                        description: 'The UniswapV3 encoded path to trade along',
                        name: 'path',
                      },
                      {
                        type: 'bool',
                        description:
                          'A flag for whether the input tokens should come from the msg.sender (through Permit2) or whether the funds are already in the UniversalRouter',
                        name: 'payerIsUser',
                      },
                    ],
                  },
                  1: {
                    name: 'V3_SWAP_EXACT_OUT',
                    params: [
                      {
                        type: 'address',
                        description: 'The recipient of the output of the trade',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The amount of output tokens to receive',
                        name: 'amountOut',
                      },
                      {
                        type: 'uint256',
                        description: 'The maximum number of input tokens that should be spent',
                        name: 'amountInMax',
                      },
                      {
                        type: 'bytes',
                        description: 'The UniswapV3 encoded path to trade along',
                        name: 'path',
                      },
                      {
                        type: 'bool',
                        description:
                          'A flag for whether the input tokens should come from the msg.sender (through Permit2) or whether the funds are already in the UniversalRouter',
                        name: 'payerIsUser',
                      },
                    ],
                  },
                  2: {
                    name: 'PERMIT2_TRANSFER_FROM',
                    params: [
                      {
                        type: 'address',
                        description: 'The token to fetch from Permit2',
                        name: 'token',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the tokens fetched',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The amount of token to fetch',
                        name: 'amount',
                      },
                    ],
                  },
                  3: {
                    name: 'PERMIT2_PERMIT_BATCH',
                    params: [
                      {
                        type: 'bytes',
                        description:
                          'A PermitBatch struct outlining all of the Permit2 permits to execute.',
                        name: 'batch',
                      },
                      {
                        type: 'bytes',
                        description: 'The signature to provide to Permit2',
                        name: 'data',
                      },
                    ],
                  },
                  4: {
                    name: 'SWEEP',
                    params: [
                      {
                        type: 'address',
                        description: 'The ERC20 token to sweep (or Constants.ETH for ETH)',
                        name: 'token',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the sweep',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The minimum required tokens to receive from the sweep',
                        name: 'amountMin',
                      },
                    ],
                  },
                  5: {
                    name: 'TRANSFER',
                    params: [
                      {
                        type: 'address',
                        description: 'The ERC20 token to transfer (or Constants.ETH for ETH)',
                        name: 'token',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the transfer',
                        name: 'recipient',
                      },
                      { type: 'uint256', description: 'The amount to transfer', name: 'value' },
                    ],
                  },
                  6: {
                    name: 'PAY_PORTION',
                    params: [
                      {
                        type: 'address',
                        description: 'The ERC20 token to transfer (or Constants.ETH for ETH)',
                        name: 'token',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the transfer',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description:
                          'In basis points, the percentage of the contract’s balance to transfer',
                        name: 'bips',
                      },
                    ],
                  },
                  8: {
                    name: 'V2_SWAP_EXACT_IN',
                    params: [
                      {
                        type: 'address',
                        description: 'The recipient of the output of the trade',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The amount of input tokens for the trade',
                        name: 'amountIn',
                      },
                      {
                        type: 'uint256',
                        description: 'The minimum amount of output tokens the user wants',
                        name: 'amountOutMin',
                      },
                      {
                        type: 'address[]',
                        description: 'The UniswapV2 token path to trade along',
                        name: 'path',
                      },
                      {
                        type: 'bool',
                        description:
                          'A flag for whether the input tokens should come from the msg.sender (through Permit2) or whether the funds are already in the UniversalRouter',
                        name: 'payerIsUser',
                      },
                    ],
                  },
                  9: {
                    name: 'V2_SWAP_EXACT_OUT',
                    params: [
                      {
                        type: 'address',
                        description: 'The recipient of the output of the trade',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The amount of output tokens to receive',
                        name: 'amountOut',
                      },
                      {
                        type: 'uint256',
                        description: 'The maximum number of input tokens that should be spent',
                        name: 'amountInMax',
                      },
                      {
                        type: 'address[]',
                        description: 'The UniswapV2 token path to trade along',
                        name: 'path',
                      },
                      {
                        type: 'bool',
                        description:
                          'A flag for whether the input tokens should come from the msg.sender (through Permit2) or whether the funds are already in the UniversalRouter',
                        name: 'payerIsUser',
                      },
                    ],
                  },
                  10: {
                    name: 'PERMIT2_PERMIT',
                    params: [
                      {
                        type: 'bytes',
                        description:
                          'A PermitSingle struct outlining the Permit2 permit to execute',
                        name: 'permitSingle',
                      },
                      {
                        type: 'bytes',
                        description: 'The signature to provide to Permit2',
                        name: 'signature',
                      },
                    ],
                  },
                  11: {
                    name: 'WRAP_ETH',
                    params: [
                      {
                        type: 'address',
                        description: 'The recipient of the WETH',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The amount of ETH to wrap',
                        name: 'amountMin',
                      },
                    ],
                  },
                  12: {
                    name: 'UNWRAP_WETH',
                    params: [
                      {
                        type: 'address',
                        description: 'The recipient of the ETH',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The minimum required ETH to receive from the unwrapping',
                        name: 'amountMin',
                      },
                    ],
                  },
                  13: {
                    name: 'PERMIT2_TRANSFER_FROM_BATCH',
                    params: [
                      {
                        type: 'bytes',
                        description:
                          'An array of AllowanceTransferDetails structs that each describe a Permit2 transfer to perform',
                        name: 'batchDetails',
                      },
                    ],
                  },
                  16: {
                    name: 'SEAPORT',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the Seaport contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the Seaport contract',
                        name: 'data',
                      },
                    ],
                  },
                  17: {
                    name: 'LOOKS_RARE_721',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the LooksRare contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the LooksRare contract',
                        name: 'data',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the ERC721',
                        name: 'recipient',
                      },
                      { type: 'address', description: 'The ERC721 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC721', name: 'id' },
                    ],
                  },
                  18: {
                    name: 'NFTX',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the NFTX contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the NFTX contract',
                        name: 'data',
                      },
                    ],
                  },
                  19: {
                    name: 'CRYPTOPUNKS',
                    params: [
                      { type: 'uint256', description: 'The PunkID to purchase', name: 'punkId' },
                      {
                        type: 'address',
                        description: 'The recipient for the cryptopunk',
                        name: 'recipient',
                      },
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the Cryptopunks contract',
                        name: 'value',
                      },
                    ],
                  },
                  20: {
                    name: 'LOOKS_RARE_1155',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the LooksRare contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the LooksRare contract',
                        name: 'data',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the ERC1155',
                        name: 'recipient',
                      },
                      { type: 'address', description: 'The ERC1155 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC1155', name: 'id' },
                      {
                        type: 'uint256',
                        description: 'The amount of the ERC1155 to transfer',
                        name: 'amount',
                      },
                    ],
                  },
                  21: {
                    name: 'OWNER_CHECK_721',
                    params: [
                      {
                        type: 'address',
                        description: 'The required owner of the ERC721',
                        name: 'owner',
                      },
                      { type: 'address', description: 'The ERC721 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC721', name: 'id' },
                    ],
                  },
                  22: {
                    name: 'OWNER_CHECK_1155',
                    params: [
                      {
                        type: 'address',
                        description: 'The required owner of the ERC1155',
                        name: 'owner',
                      },
                      { type: 'address', description: 'The ERC721 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC1155', name: 'id' },
                      {
                        type: 'uint256',
                        description: 'The minimum required amount of the ERC1155',
                        name: 'minBalance',
                      },
                    ],
                  },
                  23: {
                    name: 'SWEEP_ERC721',
                    params: [
                      {
                        type: 'address',
                        description: 'The ERC721 token address to transfer',
                        name: 'token',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the transfer',
                        name: 'recipient',
                      },
                      { type: 'uint256', description: 'The token ID to transfer', name: 'id' },
                    ],
                  },
                  24: {
                    name: 'X2Y2_721',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the X2Y2 contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the X2Y2 contract',
                        name: 'data',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the ERC721',
                        name: 'recipient',
                      },
                      { type: 'address', description: 'The ERC721 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC721', name: 'id' },
                    ],
                  },
                  25: {
                    name: 'SUDOSWAP',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the Sudoswap contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the Sudoswap contract',
                        name: 'data',
                      },
                    ],
                  },
                  26: {
                    name: 'NFT20',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the NFT20 contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the NFT20 contract',
                        name: 'data',
                      },
                    ],
                  },
                  27: {
                    name: 'X2Y2_1155',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the X2Y2 contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the X2Y2 contract',
                        name: 'data',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the ERC1155',
                        name: 'recipient',
                      },
                      { type: 'address', description: 'The ERC1155 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC1155', name: 'id' },
                      {
                        type: 'uint256',
                        description: 'The amount of the ERC1155 to transfer',
                        name: 'amount',
                      },
                    ],
                  },
                  28: {
                    name: 'FOUNDATION',
                    params: [
                      {
                        type: 'uint256',
                        description: 'The ETH value to forward to the Foundation contract',
                        name: 'value',
                      },
                      {
                        type: 'bytes',
                        description: 'The calldata to use to call the Foundation contract',
                        name: 'data',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the ERC721',
                        name: 'recipient',
                      },
                      { type: 'address', description: 'The ERC721 token address', name: 'token' },
                      { type: 'uint256', description: 'The ID of the ERC721', name: 'id' },
                    ],
                  },
                  29: {
                    name: 'SWEEP_ERC1155',
                    params: [
                      {
                        type: 'address',
                        description: 'The ERC1155 token address to sweep',
                        name: 'token',
                      },
                      {
                        type: 'address',
                        description: 'The recipient of the sweep',
                        name: 'recipient',
                      },
                      { type: 'uint256', description: 'The token ID to sweep', name: 'id' },
                      {
                        type: 'uint256',
                        description: 'The minimum required tokens to receive from the sweep',
                        name: 'amount',
                      },
                    ],
                  },
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/decode/uniswap-commands.ts' },
    ],
    [
      1930,
      { './bytes': 1921, './internal': 1926 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toType = r.TypeOutput = void 0);
                const n = e('./bytes'),
                  s = e('./internal');
                var i;
                !(function (e) {
                  (e[(e.Number = 0)] = 'Number'),
                    (e[(e.BigInt = 1)] = 'BigInt'),
                    (e[(e.Buffer = 2)] = 'Buffer'),
                    (e[(e.PrefixedHexString = 3)] = 'PrefixedHexString');
                })((i = r.TypeOutput || (r.TypeOutput = {}))),
                  (r.toType = function (e, t) {
                    if (null === e) return null;
                    if (e === undefined) return undefined;
                    if ('string' == typeof e && !(0, s.isHexString)(e))
                      throw new Error(`A string must be provided with a 0x-prefix, given: ${e}`);
                    if ('number' == typeof e && !Number.isSafeInteger(e))
                      throw new Error(
                        'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                      );
                    const r = (0, n.toBuffer)(e);
                    switch (t) {
                      case i.Buffer:
                        return r;
                      case i.BigInt:
                        return (0, n.bufferToBigInt)(r);
                      case i.Number: {
                        const e = (0, n.bufferToBigInt)(r);
                        if (e > BigInt(Number.MAX_SAFE_INTEGER))
                          throw new Error(
                            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                          );
                        return Number(e);
                      }
                      case i.PrefixedHexString:
                        return (0, n.bufferToHex)(r);
                      default:
                        throw new Error('unknown outputType');
                    }
                  });
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/types.js',
      },
    ],
    [
      1931,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.GWEI_TO_WEI = void 0),
                  (r.GWEI_TO_WEI = BigInt(1e9));
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/units.js',
      },
    ],
    [
      1932,
      { './address': 1919, './bytes': 1921, './types': 1930, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }), (r.Withdrawal = void 0);
                    const n = e('./address'),
                      s = e('./bytes'),
                      i = e('./types');
                    class a {
                      constructor(e, t, r, n) {
                        (this.index = e),
                          (this.validatorIndex = t),
                          (this.address = r),
                          (this.amount = n);
                      }
                      static fromWithdrawalData(e) {
                        const { index: t, validatorIndex: r, address: s, amount: o } = e,
                          c = (0, i.toType)(t, i.TypeOutput.BigInt),
                          u = (0, i.toType)(r, i.TypeOutput.BigInt),
                          d = new n.Address((0, i.toType)(s, i.TypeOutput.Buffer)),
                          l = (0, i.toType)(o, i.TypeOutput.BigInt);
                        return new a(c, u, d, l);
                      }
                      static fromValuesArray(e) {
                        if (4 !== e.length)
                          throw Error(
                            `Invalid withdrawalArray length expected=4 actual=${e.length}`
                          );
                        const [t, r, n, s] = e;
                        return a.fromWithdrawalData({
                          index: t,
                          validatorIndex: r,
                          address: n,
                          amount: s,
                        });
                      }
                      static toBufferArray(e) {
                        const { index: r, validatorIndex: s, address: a, amount: o } = e,
                          c =
                            (0, i.toType)(r, i.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, i.toType)(r, i.TypeOutput.Buffer),
                          u =
                            (0, i.toType)(s, i.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, i.toType)(s, i.TypeOutput.Buffer);
                        let d;
                        d = a instanceof n.Address ? a.buf : (0, i.toType)(a, i.TypeOutput.Buffer);
                        return [
                          c,
                          u,
                          d,
                          (0, i.toType)(o, i.TypeOutput.BigInt) === BigInt(0)
                            ? t.alloc(0)
                            : (0, i.toType)(o, i.TypeOutput.Buffer),
                        ];
                      }
                      raw() {
                        return a.toBufferArray(this);
                      }
                      toValue() {
                        return {
                          index: this.index,
                          validatorIndex: this.validatorIndex,
                          address: this.address.buf,
                          amount: this.amount,
                        };
                      }
                      toJSON() {
                        return {
                          index: (0, s.bigIntToHex)(this.index),
                          validatorIndex: (0, s.bigIntToHex)(this.validatorIndex),
                          address: '0x' + this.address.buf.toString('hex'),
                          amount: (0, s.bigIntToHex)(this.amount),
                        };
                      }
                    }
                    r.Withdrawal = a;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/withdrawal.js',
      },
    ],
    [
      1933,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e) {
                  if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
                }
                function s(e) {
                  return (
                    e instanceof Uint8Array ||
                    (null != e && 'object' == typeof e && 'Uint8Array' === e.constructor.name)
                  );
                }
                function i(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function a(e) {
                  return {
                    encode: t => {
                      if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                        throw new Error('alphabet.encode input should be an array of numbers');
                      return t.map(t => {
                        if ((n(t), t < 0 || t >= e.length))
                          throw new Error(
                            `Digit index outside alphabet: ${t} (alphabet: ${e.length})`
                          );
                        return e[t];
                      });
                    },
                    decode: t => {
                      if (!Array.isArray(t) || (t.length && 'string' != typeof t[0]))
                        throw new Error('alphabet.decode input should be array of strings');
                      return t.map(t => {
                        if ('string' != typeof t)
                          throw new Error(`alphabet.decode: not string element=${t}`);
                        const r = e.indexOf(t);
                        if (-1 === r) throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                        return r;
                      });
                    },
                  };
                }
                function o(e = '') {
                  if ('string' != typeof e) throw new Error('join separator should be string');
                  return {
                    encode: t => {
                      if (!Array.isArray(t) || (t.length && 'string' != typeof t[0]))
                        throw new Error('join.encode input should be array of strings');
                      for (let e of t)
                        if ('string' != typeof e)
                          throw new Error(`join.encode: non-string input=${e}`);
                      return t.join(e);
                    },
                    decode: t => {
                      if ('string' != typeof t)
                        throw new Error('join.decode input should be string');
                      return t.split(e);
                    },
                  };
                }
                function c(e, t = '=') {
                  if ((n(e), 'string' != typeof t)) throw new Error('padding chr should be string');
                  return {
                    encode(r) {
                      if (!Array.isArray(r) || (r.length && 'string' != typeof r[0]))
                        throw new Error('padding.encode input should be array of strings');
                      for (let e of r)
                        if ('string' != typeof e)
                          throw new Error(`padding.encode: non-string input=${e}`);
                      for (; (r.length * e) % 8; ) r.push(t);
                      return r;
                    },
                    decode(r) {
                      if (!Array.isArray(r) || (r.length && 'string' != typeof r[0]))
                        throw new Error('padding.encode input should be array of strings');
                      for (let e of r)
                        if ('string' != typeof e)
                          throw new Error(`padding.decode: non-string input=${e}`);
                      let n = r.length;
                      if ((n * e) % 8)
                        throw new Error(
                          'Invalid padding: string should have whole number of bytes'
                        );
                      for (; n > 0 && r[n - 1] === t; n--)
                        if (!(((n - 1) * e) % 8))
                          throw new Error('Invalid padding: string has too much padding');
                      return r.slice(0, n);
                    },
                  };
                }
                function u(e) {
                  if ('function' != typeof e) throw new Error('normalize fn should be function');
                  return { encode: e => e, decode: t => e(t) };
                }
                function d(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
                  if (!e.length) return [];
                  let s = 0;
                  const i = [],
                    a = Array.from(e);
                  for (
                    a.forEach(e => {
                      if ((n(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
                    });
                    ;

                  ) {
                    let e = 0,
                      n = !0;
                    for (let i = s; i < a.length; i++) {
                      const o = a[i],
                        c = t * e + o;
                      if (!Number.isSafeInteger(c) || (t * e) / t !== e || c - o != t * e)
                        throw new Error('convertRadix: carry overflow');
                      e = c % r;
                      const u = Math.floor(c / r);
                      if (((a[i] = u), !Number.isSafeInteger(u) || u * r + e !== c))
                        throw new Error('convertRadix: carry overflow');
                      n && (u ? (n = !1) : (s = i));
                    }
                    if ((i.push(e), n)) break;
                  }
                  for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) i.push(0);
                  return i.reverse();
                }
                /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.bytes =
                    r.stringToBytes =
                    r.str =
                    r.bytesToString =
                    r.hex =
                    r.utf8 =
                    r.bech32m =
                    r.bech32 =
                    r.base58check =
                    r.createBase58check =
                    r.base58xmr =
                    r.base58xrp =
                    r.base58flickr =
                    r.base58 =
                    r.base64urlnopad =
                    r.base64url =
                    r.base64nopad =
                    r.base64 =
                    r.base32crockford =
                    r.base32hexnopad =
                    r.base32hex =
                    r.base32nopad =
                    r.base32 =
                    r.base16 =
                    r.utils =
                      void 0),
                  (r.assertNumber = n);
                const l = (e, t) => (t ? l(t, e % t) : e),
                  f = (e, t) => e + (t - l(e, t));
                function h(e, t, r, s) {
                  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
                  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (f(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${f(t, r)}`
                    );
                  let i = 0,
                    a = 0;
                  const o = 2 ** r - 1,
                    c = [];
                  for (const s of e) {
                    if ((n(s), s >= 2 ** t))
                      throw new Error(`convertRadix2: invalid data word=${s} from=${t}`);
                    if (((i = (i << t) | s), a + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${a} from=${t}`);
                    for (a += t; a >= r; a -= r) c.push(((i >> (a - r)) & o) >>> 0);
                    i &= 2 ** a - 1;
                  }
                  if (((i = (i << (r - a)) & o), !s && a >= t)) throw new Error('Excess padding');
                  if (!s && i) throw new Error(`Non-zero padding: ${i}`);
                  return s && a > 0 && c.push(i >>> 0), c;
                }
                function p(e) {
                  return (
                    n(e),
                    {
                      encode: t => {
                        if (!s(t)) throw new Error('radix.encode input should be Uint8Array');
                        return d(Array.from(t), 256, e);
                      },
                      decode: t => {
                        if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                          throw new Error('radix.decode input should be array of numbers');
                        return Uint8Array.from(d(t, e, 256));
                      },
                    }
                  );
                }
                function m(e, t = !1) {
                  if ((n(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (f(8, e) > 32 || f(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!s(r)) throw new Error('radix2.encode input should be Uint8Array');
                      return h(Array.from(r), 8, e, !t);
                    },
                    decode: r => {
                      if (!Array.isArray(r) || (r.length && 'number' != typeof r[0]))
                        throw new Error('radix2.decode input should be array of numbers');
                      return Uint8Array.from(h(r, e, 8, t));
                    },
                  };
                }
                function g(e) {
                  if ('function' != typeof e)
                    throw new Error('unsafeWrapper fn should be function');
                  return function (...t) {
                    try {
                      return e.apply(null, t);
                    } catch (e) {}
                  };
                }
                function y(e, t) {
                  if ((n(e), 'function' != typeof t))
                    throw new Error('checksum fn should be function');
                  return {
                    encode(r) {
                      if (!s(r)) throw new Error('checksum.encode: input should be Uint8Array');
                      const n = t(r).slice(0, e),
                        i = new Uint8Array(r.length + e);
                      return i.set(r), i.set(n, r.length), i;
                    },
                    decode(r) {
                      if (!s(r)) throw new Error('checksum.decode: input should be Uint8Array');
                      const n = r.slice(0, -e),
                        i = t(n).slice(0, e),
                        a = r.slice(-e);
                      for (let t = 0; t < e; t++)
                        if (i[t] !== a[t]) throw new Error('Invalid checksum');
                      return n;
                    },
                  };
                }
                (r.utils = {
                  alphabet: a,
                  chain: i,
                  checksum: y,
                  convertRadix: d,
                  convertRadix2: h,
                  radix: p,
                  radix2: m,
                  join: o,
                  padding: c,
                }),
                  (r.base16 = i(m(4), a('0123456789ABCDEF'), o(''))),
                  (r.base32 = i(m(5), a('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), c(5), o(''))),
                  (r.base32nopad = i(m(5), a('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), o(''))),
                  (r.base32hex = i(m(5), a('0123456789ABCDEFGHIJKLMNOPQRSTUV'), c(5), o(''))),
                  (r.base32hexnopad = i(m(5), a('0123456789ABCDEFGHIJKLMNOPQRSTUV'), o(''))),
                  (r.base32crockford = i(
                    m(5),
                    a('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    o(''),
                    u(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  )),
                  (r.base64 = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    c(6),
                    o('')
                  )),
                  (r.base64nopad = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    o('')
                  )),
                  (r.base64url = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    c(6),
                    o('')
                  )),
                  (r.base64urlnopad = i(
                    m(6),
                    a('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    o('')
                  ));
                const b = e => i(p(58), a(e), o(''));
                (r.base58 = b('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')),
                  (r.base58flickr = b(
                    '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
                  )),
                  (r.base58xrp = b('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'));
                const w = [0, 2, 3, 5, 6, 7, 9, 10, 11];
                r.base58xmr = {
                  encode(e) {
                    let t = '';
                    for (let n = 0; n < e.length; n += 8) {
                      const s = e.subarray(n, n + 8);
                      t += r.base58.encode(s).padStart(w[s.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const s = e.slice(n, n + 11),
                        i = w.indexOf(s.length),
                        a = r.base58.decode(s);
                      for (let e = 0; e < a.length - i; e++)
                        if (0 !== a[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(a.slice(a.length - i)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  i(
                    y(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const v = i(a('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), o('')),
                  k = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function T(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < k.length; e++) 1 == ((t >> e) & 1) && (r ^= k[e]);
                  return r;
                }
                function E(e, t, r = 1) {
                  const n = e.length;
                  let s = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    s = T(s) ^ (r >> 5);
                  }
                  s = T(s);
                  for (let t = 0; t < n; t++) s = T(s) ^ (31 & e.charCodeAt(t));
                  for (let e of t) s = T(s) ^ e;
                  for (let e = 0; e < 6; e++) s = T(s);
                  return (s ^= r), v.encode(h([s % 2 ** 30], 30, 5, !1));
                }
                function A(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = m(5),
                    n = r.decode,
                    s = r.encode,
                    i = g(n);
                  function a(e, r, n = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.encode prefix should be string, not ' + typeof e);
                    if (
                      (r instanceof Uint8Array && (r = Array.from(r)),
                      !Array.isArray(r) || (r.length && 'number' != typeof r[0]))
                    )
                      throw new Error(
                        'bech32.encode words should be array of numbers, not ' + typeof r
                      );
                    if (0 === e.length) throw new TypeError(`Invalid prefix length ${e.length}`);
                    const s = e.length + 7 + r.length;
                    if (!1 !== n && s > n) throw new TypeError(`Length ${s} exceeds limit ${n}`);
                    const i = e.toLowerCase(),
                      a = E(i, r, t);
                    return `${i}1${v.encode(r)}${a}`;
                  }
                  function o(e, r = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.decode input should be string, not ' + typeof e);
                    if (e.length < 8 || (!1 !== r && e.length > r))
                      throw new TypeError(
                        `Wrong string length: ${e.length} (${e}). Expected (8..${r})`
                      );
                    const n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const s = n.lastIndexOf('1');
                    if (0 === s || -1 === s)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const i = n.slice(0, s),
                      a = n.slice(s + 1);
                    if (a.length < 6) throw new Error('Data must be at least 6 characters long');
                    const o = v.decode(a).slice(0, -6),
                      c = E(i, o, t);
                    if (!a.endsWith(c))
                      throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
                    return { prefix: i, words: o };
                  }
                  return {
                    encode: a,
                    decode: o,
                    encodeFromBytes: function (e, t) {
                      return a(e, s(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = o(e, !1);
                      return { prefix: t, words: r, bytes: n(r) };
                    },
                    decodeUnsafe: g(o),
                    fromWords: n,
                    fromWordsUnsafe: i,
                    toWords: s,
                  };
                }
                (r.bech32 = A('bech32')),
                  (r.bech32m = A('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  }),
                  (r.hex = i(
                    m(4),
                    a('0123456789abcdef'),
                    o(''),
                    u(e => {
                      if ('string' != typeof e || e.length % 2)
                        throw new TypeError(
                          `hex.decode: expected string, got ${typeof e} with length ${e.length}`
                        );
                      return e.toLowerCase();
                    })
                  ));
                const _ = {
                    utf8: r.utf8,
                    hex: r.hex,
                    base16: r.base16,
                    base32: r.base32,
                    base64: r.base64,
                    base64url: r.base64url,
                    base58: r.base58,
                    base58xmr: r.base58xmr,
                  },
                  x =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !_.hasOwnProperty(e)) throw new TypeError(x);
                  if (!s(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return _[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!_.hasOwnProperty(e)) throw new TypeError(x);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return _[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@metamask/eth-sig-util>@scure/base',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      1934,
      { '@metamask/eth-sig-util': 1913, tslib: 5685 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.transformTypedData = void 0);
                const n = e('tslib').__importStar(e('@metamask/eth-sig-util'));
                function s(e) {
                  switch (Object.prototype.toString.call(e)) {
                    case '[object Object]': {
                      const t = Object.keys(e).map(t => [t, s(e[t])]);
                      return Object.fromEntries(t);
                    }
                    case '[object Array]':
                      return e.map(e => s(e));
                    case '[object BigInt]':
                      return e.toString();
                    default:
                      return e;
                  }
                }
                (r.transformTypedData = (e, t) => {
                  if (!t)
                    throw new Error('Trezor: Only version 4 of typed data signing is supported');
                  const r = n.SignTypedDataVersion.V4,
                    {
                      types: i,
                      primaryType: a,
                      domain: o,
                      message: c,
                    } = n.TypedDataUtils.sanitizeData(e),
                    u = n.TypedDataUtils.hashStruct('EIP712Domain', s(o), i, r).toString('hex');
                  let d = null;
                  return (
                    'EIP712Domain' !== a &&
                      (d = n.TypedDataUtils.hashStruct(a, s(c), i, r).toString('hex')),
                    Object.assign({ domain_separator_hash: u, message_hash: d }, e)
                  );
                }),
                  (r.default = r.transformTypedData);
              };
            };
      },
      {
        package: '@metamask/eth-trezor-keyring>@trezor/connect-plugin-ethereum',
        file: 'node_modules/@metamask/eth-trezor-keyring/node_modules/@trezor/connect-plugin-ethereum/lib/index.js',
      },
    ],
    [
      194,
      {
        '../../../../../shared/constants/network': 5804,
        './uniswap-commands': 193,
        '@ethersproject/abi': 504,
        'ethereumjs-util': 4393,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.UNISWAP_UNIVERSAL_ROUTER_ADDRESSES = void 0),
                  (r.decodeUniswapRouterTransactionData = function ({
                    transactionData: e,
                    contractAddress: t,
                    chainId: r,
                  }) {
                    const i = u[r];
                    if (null == i || !i.map(e => e.toLowerCase()).includes(t.toLowerCase()))
                      return undefined;
                    const l = new n.Interface(d);
                    let f;
                    try {
                      f = l.parseTransaction({ data: e });
                    } catch (e) {
                      return undefined;
                    }
                    const h = f.args.commands,
                      p = f.args.inputs;
                    return h
                      .slice(2)
                      .match(/.{1,2}/gu)
                      .map((e, t) =>
                        (function (e, t) {
                          const r = parseInt(e, 16),
                            i = 31 & r,
                            u = a.UNISWAP_ROUTER_COMMANDS[String(i)];
                          if (!u) return undefined;
                          const d = u.params.map(e => e.type),
                            l = n.Interface.getAbiCoder().decode(d, t),
                            { name: f } = u,
                            h = u.params.map((e, t) => {
                              const { name: r, type: n, description: i } = e,
                                a = l[t];
                              return {
                                name: r,
                                type: n,
                                value:
                                  'path' === r
                                    ? (function (e) {
                                        const t = [];
                                        let r = (0, s.stripHexPrefix)(e),
                                          n = {},
                                          i = !0;
                                        for (; r.length; ) {
                                          if (i) {
                                            const e = (0, s.addHexPrefix)(r.slice(0, o));
                                            n.firstAddress
                                              ? ((n.secondAddress = e),
                                                t.push(n),
                                                (n = { firstAddress: e }))
                                              : (n.firstAddress = e),
                                              (r = r.slice(o));
                                          } else
                                            (n.tickSpacing = parseInt(r.slice(0, c), 16)),
                                              (r = r.slice(c));
                                          i = !i;
                                        }
                                        return t;
                                      })(a)
                                    : a,
                                description: i,
                              };
                            });
                          return { name: f, params: h };
                        })(e, p[t])
                      )
                      .filter(e => e !== undefined);
                  });
                var n = e('@ethersproject/abi'),
                  s = e('ethereumjs-util'),
                  i = e('../../../../../shared/constants/network'),
                  a = e('./uniswap-commands');
                const o = 40,
                  c = 6,
                  u = (r.UNISWAP_UNIVERSAL_ROUTER_ADDRESSES = {
                    [i.CHAIN_IDS.ARBITRUM]: [
                      '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
                      '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
                      '0x5E325eDA8064b456f4781070C0738d849c824258',
                    ],
                    [i.CHAIN_IDS.AVALANCHE]: [
                      '0x82635AF6146972cD6601161c4472ffe97237D292',
                      '0x4Dae2f939ACf50408e13d58534Ff8c2776d45265',
                    ],
                    [i.CHAIN_IDS.BASE]: [
                      '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
                      '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
                    ],
                    [i.CHAIN_IDS.BSC]: [
                      '0x5Dc88340E1c5c6366864Ee415d6034cadd1A9897',
                      '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
                      '0x4Dae2f939ACf50408e13d58534Ff8c2776d45265',
                    ],
                    [i.CHAIN_IDS.MAINNET]: [
                      '0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B',
                      '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
                    ],
                    [i.CHAIN_IDS.OPTIMISM]: [
                      '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654',
                      '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
                      '0xCb1355ff08Ab38bBCE60111F1bb2B784bE25D7e8',
                    ],
                    [i.CHAIN_IDS.POLYGON]: [
                      '0x4C60051384bd2d3C01bfc845Cf5F4b44bcbE9de5',
                      '0x643770E279d5D0733F21d6DC03A8efbABf3255B4',
                      '0xec7BE89e9d109e7e3Fec59c222CF297125FEFda2',
                    ],
                    [i.CHAIN_IDS.SEPOLIA]: ['0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'],
                  }),
                  d = [
                    {
                      constant: !0,
                      inputs: [
                        { name: 'commands', type: 'bytes' },
                        { name: 'inputs', type: 'bytes[]' },
                        { name: 'deadline', type: 'uint256' },
                      ],
                      name: 'execute',
                      type: 'function',
                    },
                    {
                      constant: !0,
                      inputs: [
                        { name: 'commands', type: 'bytes' },
                        { name: 'inputs', type: 'bytes[]' },
                      ],
                      name: 'execute',
                      type: 'function',
                    },
                  ];
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/decode/uniswap.ts' },
    ],
    [
      195,
      {
        '../../../../../shared/types/transaction-decode': 5885,
        './four-byte': 190,
        './proxy': 191,
        './sourcify': 192,
        './uniswap': 194,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.decodeTransactionData = async function ({
                    transactionData: e,
                    contractAddress: t,
                    chainId: r,
                    provider: n,
                  }) {
                    u('Decoding transaction data', {
                      transactionData: e,
                      contractAddress: t,
                      chainId: r,
                    });
                    const l = (0, i.decodeUniswapRouterTransactionData)({
                      transactionData: e,
                      contractAddress: t,
                      chainId: r,
                    });
                    if (l)
                      return (
                        u('Decoded with Uniswap commands', l),
                        { data: d(l), source: s.DecodedTransactionDataSource.Uniswap }
                      );
                    const f = await (0, o.getContractProxyAddress)(t, n);
                    f && u('Retrieved proxy implementation address', f);
                    const h = f ?? t,
                      p = (0, a.decodeTransactionDataWithSourcify)(e, h, r),
                      m = (0, c.decodeTransactionDataWithFourByte)(e),
                      [g, y] = await Promise.allSettled([p, m]);
                    if ('fulfilled' === g.status && g.value)
                      return (
                        u('Decoded data with Sourcify', g.value),
                        { data: d([g.value]), source: s.DecodedTransactionDataSource.Sourcify }
                      );
                    if (
                      (u('Failed to decode data with Sourcify', g),
                      'fulfilled' === y.status && y.value)
                    )
                      return (
                        u('Decoded data with 4Byte', y.value),
                        { data: d([y.value]), source: s.DecodedTransactionDataSource.FourByte }
                      );
                    return u('Failed to decode data with 4Byte', y), undefined;
                  });
                var n = e('@metamask/utils'),
                  s = e('../../../../../shared/types/transaction-decode'),
                  i = e('./uniswap'),
                  a = e('./sourcify'),
                  o = e('./proxy'),
                  c = e('./four-byte');
                const u = (0, n.createProjectLogger)('transaction-decode');
                function d(e) {
                  return e.map(e =>
                    (function (e) {
                      return { ...e, params: e.params.map(e => l(e)) };
                    })(e)
                  );
                }
                function l(e) {
                  var t;
                  return {
                    ...e,
                    value: f(e.value),
                    children: null === (t = e.children) || void 0 === t ? void 0 : t.map(e => l(e)),
                  };
                }
                function f(e) {
                  const t = e._hex;
                  return t ? BigInt(t).toString() : e;
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/decode/util.ts' },
    ],
    [
      196,
      { '@ethersproject/abi': 504, '@metamask/keyring-controller': 2021, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.ROOT_AUTHORITY = r.ExecutionMode = r.ANY_BENEFICIARY = void 0),
                  (r.encodeRedeemDelegations = function (e, t, r) {
                    return new i.Interface(d).encodeFunctionData('redeemDelegations', [
                      f(e),
                      t,
                      ((n = r), n.map(h)),
                    ]);
                    var n;
                  }),
                  (r.signDelegation = async function ({
                    chainId: e,
                    delegation: t,
                    from: r,
                    messenger: i,
                  }) {
                    const c = {
                      types: l,
                      primaryType: a,
                      domain: {
                        chainId: String((0, n.hexToNumber)(e)),
                        name: o,
                        version: '1',
                        verifyingContract: null,
                      },
                      message: { ...t, chainId: (0, n.hexToNumber)(e) },
                    };
                    return await i.call(
                      'KeyringController:signTypedMessage',
                      { from: r, data: c },
                      s.SignTypedDataVersion.V4
                    );
                  });
                var n = e('@metamask/utils'),
                  s = e('@metamask/keyring-controller'),
                  i = e('@ethersproject/abi');
                r.ExecutionMode = (function (e) {
                  return (
                    (e.BATCH_DEFAULT_MODE =
                      '0x0100000000000000000000000000000000000000000000000000000000000000'),
                    e
                  );
                })({});
                (r.ROOT_AUTHORITY =
                  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
                  (r.ANY_BENEFICIARY = '0x0000000000000000000000000000000000000a11');
                const a = 'Delegation',
                  o = 'DelegationManager',
                  c = [
                    { type: 'address', name: 'delegate' },
                    { type: 'address', name: 'delegator' },
                    { type: 'bytes32', name: 'authority' },
                    {
                      type: 'tuple[]',
                      name: 'caveats',
                      components: [
                        { type: 'address', name: 'enforcer' },
                        { type: 'bytes', name: 'terms' },
                        { type: 'bytes', name: 'args' },
                      ],
                    },
                    { type: 'uint256', name: 'salt' },
                    { type: 'bytes', name: 'signature' },
                  ],
                  u = [
                    { type: 'address', name: 'target' },
                    { type: 'uint256', name: 'value' },
                    { type: 'bytes', name: 'callData' },
                  ],
                  d = [
                    {
                      type: 'function',
                      name: 'redeemDelegations',
                      inputs: [
                        { name: '_permissionContexts', type: 'bytes[]', internalType: 'bytes[]' },
                        { name: '_modes', type: 'bytes32[]', internalType: 'ModeCode[]' },
                        { name: '_executionCallDatas', type: 'bytes[]', internalType: 'bytes[]' },
                      ],
                      outputs: [],
                      stateMutability: 'nonpayable',
                    },
                  ],
                  l = {
                    EIP712Domain: [
                      { name: 'name', type: 'string' },
                      { name: 'version', type: 'string' },
                      { name: 'chainId', type: 'uint256' },
                      { name: 'verifyingContract', type: 'address' },
                    ],
                    Caveat: [
                      { name: 'enforcer', type: 'address' },
                      { name: 'terms', type: 'bytes' },
                    ],
                    Delegation: [
                      { name: 'delegate', type: 'address' },
                      { name: 'delegator', type: 'address' },
                      { name: 'authority', type: 'bytes32' },
                      { name: 'caveats', type: 'Caveat[]' },
                      { name: 'salt', type: 'uint256' },
                    ],
                  };
                function f(e) {
                  return e.map(e => {
                    return (
                      (t = e),
                      i.defaultAbiCoder.encode(
                        [i.ParamType.from({ components: c, name: 'delegations', type: 'tuple[]' })],
                        [t]
                      )
                    );
                    var t;
                  });
                }
                function h(e) {
                  return i.defaultAbiCoder.encode(
                    [i.ParamType.from({ components: u, name: 'executions', type: 'tuple[]' })],
                    [e]
                  );
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/delegation.ts' },
    ],
    [
      197,
      {
        '../../../../shared/constants/transaction': 5819,
        '../ppom/ppom-util': 149,
        '@metamask/eth-json-rpc-middleware': 1614,
        '@metamask/rpc-errors': 2585,
        '@metamask/transaction-controller': 2946,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.AtomicCapabilityStatus = void 0),
                  (r.getCallsStatus = function (e, t) {
                    const r = e
                      .call('TransactionController:getState')
                      .transactions.filter(e => e.batchId === t);
                    if (null == r || !r.length)
                      throw new n.JsonRpcError(
                        o.EIP5792ErrorCode.UnknownBundleId,
                        'No matching bundle found'
                      );
                    const a = r[0],
                      { chainId: c, txReceipt: d } = a,
                      l = (function (e) {
                        const { hash: t, status: r } = e;
                        if (r === s.TransactionStatus.confirmed)
                          return i.GetCallsStatusCode.CONFIRMED;
                        if (r === s.TransactionStatus.failed)
                          return t
                            ? i.GetCallsStatusCode.REVERTED
                            : i.GetCallsStatusCode.FAILED_OFFCHAIN;
                        if (r === s.TransactionStatus.dropped) return i.GetCallsStatusCode.REVERTED;
                        return i.GetCallsStatusCode.PENDING;
                      })(a),
                      f = d,
                      h = (null == f ? void 0 : f.logs) ?? [],
                      p = f && [
                        {
                          blockHash: f.blockHash,
                          blockNumber: f.blockNumber,
                          gasUsed: f.gasUsed,
                          logs: h.map(e => ({
                            address: e.address,
                            data: e.data,
                            topics: e.topics,
                          })),
                          status: f.status,
                          transactionHash: f.transactionHash,
                        },
                      ];
                    return { version: u, id: t, chainId: c, atomic: !0, status: l, receipts: p };
                  }),
                  (r.getCapabilities = async function (e, t, r) {
                    const {
                        getDisabledAccountUpgradeChains: n,
                        getDismissSmartAccountSuggestionEnabled: s,
                        isAtomicBatchSupported: i,
                      } = e,
                      a = null == r ? void 0 : r.map(e => e.toLowerCase());
                    return (await i({ address: t, chainIds: a })).reduce((e, t) => {
                      var r;
                      const { chainId: i } = t,
                        { delegationAddress: a, isSupported: o, upgradeContractAddress: u } = t,
                        d = (null === (r = n()) || void 0 === r ? void 0 : r.includes(i)) || s();
                      if (!o && !(!d && u && !a)) return e;
                      const l = o ? c.Supported : c.Ready;
                      return (e[i] = { atomic: { status: l } }), e;
                    }, {});
                  }),
                  (r.processSendCalls = async function (e, t, r, s) {
                    const {
                        addTransactionBatch: i,
                        getDisabledAccountUpgradeChains: c,
                        isAtomicBatchSupported: d,
                        validateSecurity: l,
                        getDismissSmartAccountSuggestionEnabled: f,
                      } = e,
                      { calls: h, from: p } = r,
                      { networkClientId: m, origin: g } = s,
                      y = h.map(e => ({ params: e })),
                      b = t.call('NetworkController:getNetworkClientById', m).configuration.chainId,
                      w = p ?? t.call('AccountsController:getSelectedAccount').address,
                      v = c(),
                      k = f(),
                      T = await d({ address: w, chainIds: [b] }),
                      E = null == T ? void 0 : T[0];
                    !(function (e, t, r, s, i, a) {
                      (function (e) {
                        const { version: t } = e;
                        if (t !== u)
                          throw n.rpcErrors.invalidInput(
                            `Version not supported: Got ${t}, expected ${u}`
                          );
                      })(e),
                        (function (e, t, r) {
                          const { chainId: s } = e;
                          if (s && s.toLowerCase() !== t.toLowerCase())
                            throw n.rpcErrors.invalidParams(
                              `Chain ID must match the dApp selected network: Got ${s}, expected ${t}`
                            );
                          if (!r)
                            throw new n.JsonRpcError(
                              o.EIP5792ErrorCode.UnsupportedChainId,
                              `EIP-7702 not supported on chain: ${t}`
                            );
                        })(e, r, a),
                        (function (e) {
                          const { calls: t, capabilities: r } = e,
                            s = Object.keys(r ?? {}).filter(
                              e => !0 !== (null == r ? void 0 : r[e].optional)
                            ),
                            i = t.flatMap(e =>
                              Object.keys(e.capabilities ?? {}).filter(t => {
                                var r;
                                return (
                                  !0 !==
                                  (null === (r = e.capabilities) || void 0 === r
                                    ? void 0
                                    : r[t].optional)
                                );
                              })
                            ),
                            a = [...s, ...i];
                          if (null != a && a.length)
                            throw new n.JsonRpcError(
                              o.EIP5792ErrorCode.UnsupportedNonOptionalCapability,
                              `Unsupported non-optional capabilities: ${a.join(', ')}`
                            );
                        })(e),
                        (function (e, t, r, s, i) {
                          if (null != i && i.delegationAddress) return;
                          const a = t.includes(r);
                          if (a || s)
                            throw new n.JsonRpcError(
                              o.EIP5792ErrorCode.RejectedUpgrade,
                              `EIP-7702 upgrade rejected for this chain and account - Chain ID: ${r}, Account: ${e}`
                            );
                        })(t, s, r, i, a);
                    })(r, w, b, v, k, E);
                    const A = (0, a.generateSecurityAlertId)(),
                      _ = l.bind(null, A),
                      { batchId: x } = await i({
                        from: w,
                        networkClientId: m,
                        origin: g,
                        securityAlertId: A,
                        transactions: y,
                        validateSecurity: _,
                      });
                    return { id: x };
                  });
                var n = e('@metamask/rpc-errors'),
                  s = e('@metamask/transaction-controller'),
                  i = e('@metamask/eth-json-rpc-middleware'),
                  a = e('../ppom/ppom-util'),
                  o = e('../../../../shared/constants/transaction');
                let c = (r.AtomicCapabilityStatus = (function (e) {
                  return (
                    (e.Supported = 'supported'),
                    (e.Ready = 'ready'),
                    (e.Unsupported = 'unsupported'),
                    e
                  );
                })({}));
                const u = '2.0.0';
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/eip5792.ts' },
    ],
    [
      198,
      {
        '../delegation': 196,
        '../transaction-relay': 201,
        '@ethersproject/abi': 504,
        '@metamask/metamask-eth-abis': 2113,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.Delegation7702PublishHook = void 0);
                var n = e('@metamask/utils'),
                  s = e('@metamask/metamask-eth-abis'),
                  i = e('@ethersproject/abi'),
                  a = e('../delegation'),
                  o = e('../transaction-relay');
                function c(e, t, r) {
                  u(e, t), t.set(e, r);
                }
                function u(e, t) {
                  if (t.has(e))
                    throw new TypeError(
                      'Cannot initialize the same private elements twice on an object'
                    );
                }
                function d(e, t) {
                  return e.get(f(e, t));
                }
                function l(e, t, r) {
                  return e.set(f(e, t), r), r;
                }
                function f(e, t, r) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : r;
                  throw new TypeError('Private element is not present on this object');
                }
                const h = '0x',
                  p = { transactionHash: undefined },
                  m = (0, n.createProjectLogger)('delegation-7702-publish-hook');
                var g = new WeakMap(),
                  y = new WeakMap(),
                  b = new WeakSet();
                async function w(e, t) {
                  try {
                    return await f(b, this, v).call(this, e, t);
                  } catch (e) {
                    throw (m('Error', e), e);
                  }
                }
                async function v(e, t) {
                  const { chainId: r, gasFeeTokens: n, selectedGasFeeToken: s, txParams: i } = e,
                    { from: c, maxFeePerGas: u, maxPriorityFeePerGas: l } = i,
                    h = (await d(g, this).call(this, { address: c, chainIds: [r] })).find(
                      e => e.chainId.toLowerCase() === r.toLowerCase()
                    );
                  if (!(h && (!h.delegationAddress || h.isSupported)))
                    return m('Skipping as EIP-7702 is not supported', { from: c, chainId: r }), p;
                  const { delegationAddress: y, upgradeContractAddress: w } = h;
                  if (!s || null == n || !n.length)
                    return m('Skipping as no selected gas fee token'), p;
                  const v = n.find(e => e.tokenAddress.toLowerCase() === s.toLowerCase());
                  if (!v) throw new Error('Selected gas fee token not found');
                  const E = await f(b, this, T).call(this, e, v),
                    _ = f(b, this, k).call(this, e, v),
                    x = {
                      data: (0, a.encodeRedeemDelegations)(
                        [[E]],
                        [a.ExecutionMode.BATCH_DEFAULT_MODE],
                        [_]
                      ),
                      maxFeePerGas: u,
                      maxPriorityFeePerGas: l,
                      to: null,
                    };
                  y || (x.authorizationList = await f(b, this, A).call(this, e, w)),
                    m('Relay request', x);
                  const { transactionHash: P } = await (0, o.submitRelayTransaction)(x);
                  return { transactionHash: P };
                }
                function k(e, t) {
                  const { txParams: r } = e,
                    { data: n, to: s, value: i } = r;
                  return [
                    { target: s, value: i ?? '0x0', callData: n ?? h },
                    {
                      target: t.tokenAddress,
                      value: '0x0',
                      callData: f(b, this, _).call(this, t.recipient, t.amount),
                    },
                  ];
                }
                async function T(e, t) {
                  const { chainId: r, txParams: n } = e,
                    { from: s } = n,
                    i = f(b, this, E).call(this, n, t);
                  m('Caveats', i);
                  const o = {
                    authority: a.ROOT_AUTHORITY,
                    caveats: i,
                    delegate: a.ANY_BENEFICIARY,
                    delegator: s,
                    salt: new Date().getTime(),
                  };
                  m('Unsigned delegation', o);
                  const c = await (0, a.signDelegation)({
                    chainId: r,
                    delegation: o,
                    from: s,
                    messenger: d(y, this),
                  });
                  return m('Delegation signature', c), { ...o, signature: c };
                }
                function E(e, t) {
                  const { amount: r, recipient: s, tokenAddress: i } = t,
                    { data: a, to: o } = e,
                    c = (0, n.add0x)((0, n.remove0x)(r).padStart(64, '0'));
                  return [
                    {
                      enforcer: null,
                      terms: (0, n.add0x)([i, s, c, o, a ?? h].map(n.remove0x).join('')),
                      args: h,
                    },
                  ];
                }
                async function A(e, t) {
                  const { chainId: r, txParams: n } = e,
                    { from: s, nonce: i } = n;
                  if ((m('Including authorization as not upgraded'), !t))
                    throw new Error('Upgrade contract address not found');
                  const a = await d(y, this).call('KeyringController:signEip7702Authorization', {
                      chainId: parseInt(r, 16),
                      contractAddress: t,
                      from: s,
                      nonce: parseInt(i, 16),
                    }),
                    { r: o, s: c, yParity: u } = f(b, this, x).call(this, a);
                  return (
                    m('Authorization signature', {
                      authorizationSignature: a,
                      r: o,
                      s: c,
                      yParity: u,
                    }),
                    [{ address: t, chainId: r, nonce: i, r: o, s: c, yParity: u }]
                  );
                }
                function _(e, t) {
                  return new i.Interface(s.abiERC20).encodeFunctionData('transfer', [e, t]);
                }
                function x(e) {
                  return {
                    r: e.slice(0, 66),
                    s: `0x${e.slice(66, 130)}`,
                    yParity: parseInt(e.slice(130, 132), 16) - 27 == 0 ? '0x' : '0x1',
                  };
                }
                r.Delegation7702PublishHook = class {
                  constructor({ isAtomicBatchSupported: e, messenger: t }) {
                    var r, n;
                    u((r = this), (n = b)),
                      n.add(r),
                      c(this, g, void 0),
                      c(this, y, void 0),
                      l(g, this, e),
                      l(y, this, t);
                  }
                  getHook() {
                    return f(b, this, w).bind(this);
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/hooks/delegation-7702-publish.ts' },
    ],
    [
      199,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/gas': 5795,
        '../../../../shared/constants/metametrics': 5800,
        '../../../../shared/constants/transaction': 5819,
        '../../../../shared/lib/confirmation.utils': 5832,
        '../../../../shared/lib/transactions-controller-utils': 5851,
        '../../../../shared/modules/Numeric': 5853,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/gas.utils': 5863,
        '../../../../shared/modules/metametrics': 5866,
        '../../../../shared/modules/transaction.utils': 5880,
        '../../../../ui/helpers/utils/metrics': 6907,
        '../snap-keyring/metrics': 179,
        '@metamask/rpc-errors': 2585,
        '@metamask/transaction-controller': 2946,
        '@metamask/utils': 2995,
        'bignumber.js': 4030,
        'ethereumjs-util': 4393,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.handleTransactionSubmitted =
                    r.handleTransactionRejected =
                    r.handleTransactionFailed =
                    r.handleTransactionDropped =
                    r.handleTransactionConfirmed =
                    r.handleTransactionApproved =
                    r.handleTransactionAdded =
                    r.handlePostTransactionBalanceUpdate =
                    r.createTransactionEventFragmentWithTxId =
                    r.METRICS_STATUS_FAILED =
                      void 0);
                var n = e('bignumber.js'),
                  s = e('ethereumjs-util'),
                  i = e('@metamask/transaction-controller'),
                  a = e('@metamask/utils'),
                  o = e('@metamask/rpc-errors'),
                  c = e('../../../../shared/constants/app'),
                  u = e('../../../../shared/constants/gas'),
                  d = e('../../../../shared/constants/metametrics'),
                  l = e('../../../../shared/constants/transaction'),
                  f = e('../../../../shared/lib/transactions-controller-utils'),
                  h = e('../../../../shared/modules/conversion.utils'),
                  p = e('../../../../shared/modules/metametrics'),
                  m = e('../../../../shared/modules/transaction.utils'),
                  g = e('../../../../ui/helpers/utils/metrics'),
                  y = e('../snap-keyring/metrics'),
                  b = e('../../../../shared/lib/confirmation.utils'),
                  w = e('../../../../shared/modules/gas.utils'),
                  v = e('../../../../shared/modules/Numeric');
                const k = (r.METRICS_STATUS_FAILED = 'failed on-chain');
                r.handleTransactionAdded = async (e, t) => {
                  if (!t.transactionMeta) return;
                  const { properties: r, sensitiveProperties: n } = await _({
                    transactionEventPayload: t,
                    transactionMetricsRequest: e,
                  });
                  T({
                    eventName: l.TransactionMetaMetricsEvent.added,
                    transactionEventPayload: t,
                    transactionMetricsRequest: e,
                    payload: { properties: r, sensitiveProperties: n },
                  });
                };
                r.handleTransactionApproved = async (e, t) => {
                  t.transactionMeta &&
                    (await E({
                      eventName: l.TransactionMetaMetricsEvent.approved,
                      transactionEventPayload: t,
                      transactionMetricsRequest: e,
                    }));
                };
                r.handleTransactionFailed = async (e, t) => {
                  if (!t.transactionMeta) return;
                  const r = {};
                  t.error && (r.error = t.error),
                    await E({
                      eventName: l.TransactionMetaMetricsEvent.finalized,
                      extraParams: r,
                      transactionEventPayload: t,
                      transactionMetricsRequest: e,
                    });
                };
                r.handleTransactionConfirmed = async (e, t) => {
                  if (0 === Object.keys(t).length) return;
                  const r = {},
                    n = { ...t },
                    { txReceipt: s } = n;
                  (r.gas_used = null == s ? void 0 : s.gasUsed),
                    (r.block_number =
                      (null == s ? void 0 : s.blockNumber) && (0, h.hexToDecimal)(s.blockNumber));
                  const { submittedTime: i, blockTimestamp: a } = n;
                  i &&
                    (r.completion_time = (function (e) {
                      return Math.round((Date.now() - e) / 1e3).toString();
                    })(i)),
                    i &&
                      a &&
                      (r.completion_time_onchain = (function (e, t) {
                        const r = 2,
                          n = Number((0, h.hexToDecimal)(t)) - e / 1e3;
                        return (Math.round(n * 10 ** r) / 10 ** r).toString();
                      })(i, a)),
                    '0x0' === (null == s ? void 0 : s.status) && (r.status = k),
                    await E({
                      eventName: l.TransactionMetaMetricsEvent.finalized,
                      extraParams: r,
                      transactionEventPayload: { actionId: n.actionId, transactionMeta: n },
                      transactionMetricsRequest: e,
                    });
                };
                r.handleTransactionDropped = async (e, t) => {
                  if (!t.transactionMeta) return;
                  await E({
                    eventName: l.TransactionMetaMetricsEvent.finalized,
                    extraParams: { dropped: !0 },
                    transactionEventPayload: t,
                    transactionMetricsRequest: e,
                  });
                };
                r.handleTransactionRejected = async (e, t) => {
                  t.transactionMeta &&
                    (await E({
                      eventName: l.TransactionMetaMetricsEvent.rejected,
                      transactionEventPayload: t,
                      transactionMetricsRequest: e,
                    }));
                };
                r.handleTransactionSubmitted = async (e, t) => {
                  if (!t.transactionMeta) return;
                  const { properties: r, sensitiveProperties: n } = await _({
                    transactionEventPayload: t,
                    transactionMetricsRequest: e,
                  });
                  T({
                    eventName: l.TransactionMetaMetricsEvent.submitted,
                    transactionEventPayload: t,
                    transactionMetricsRequest: e,
                    payload: { properties: r, sensitiveProperties: n },
                  });
                };
                r.createTransactionEventFragmentWithTxId = async (
                  e,
                  { transactionId: t, actionId: r }
                ) => {
                  const n = { ...e.getTransaction(t), actionId: r },
                    { properties: s, sensitiveProperties: i } = await _({
                      transactionEventPayload: { transactionMeta: n },
                      transactionMetricsRequest: e,
                    });
                  T({
                    eventName: l.TransactionMetaMetricsEvent.approved,
                    transactionEventPayload: { actionId: n.actionId, transactionMeta: n },
                    transactionMetricsRequest: e,
                    payload: { properties: s, sensitiveProperties: i },
                  });
                };
                function T({
                  eventName: e,
                  transactionEventPayload: { transactionMeta: t, actionId: r },
                  transactionMetricsRequest: n,
                  payload: s,
                }) {
                  if (
                    (function (e, t, r) {
                      const n = A(t, r.id);
                      return void 0 !== e(n);
                    })(n.getEventFragmentById, e, t) &&
                    e !== l.TransactionMetaMetricsEvent.submitted
                  )
                    return;
                  const i = A(e, t.id);
                  switch (e) {
                    case l.TransactionMetaMetricsEvent.added:
                      n.createEventFragment({
                        category: d.MetaMetricsEventCategory.Transactions,
                        initialEvent: l.TransactionMetaMetricsEvent.added,
                        successEvent: l.TransactionMetaMetricsEvent.approved,
                        failureEvent: l.TransactionMetaMetricsEvent.rejected,
                        properties: s.properties,
                        sensitiveProperties: s.sensitiveProperties,
                        actionId: r,
                        uniqueIdentifier: i,
                        persist: !0,
                      });
                      break;
                    case l.TransactionMetaMetricsEvent.approved:
                    case l.TransactionMetaMetricsEvent.rejected:
                      n.createEventFragment({
                        category: d.MetaMetricsEventCategory.Transactions,
                        successEvent: l.TransactionMetaMetricsEvent.approved,
                        failureEvent: l.TransactionMetaMetricsEvent.rejected,
                        properties: s.properties,
                        sensitiveProperties: s.sensitiveProperties,
                        actionId: r,
                        uniqueIdentifier: i,
                        persist: !0,
                      });
                      break;
                    case l.TransactionMetaMetricsEvent.submitted:
                      n.createEventFragment({
                        category: d.MetaMetricsEventCategory.Transactions,
                        initialEvent: l.TransactionMetaMetricsEvent.submitted,
                        successEvent: l.TransactionMetaMetricsEvent.finalized,
                        properties: s.properties,
                        sensitiveProperties: s.sensitiveProperties,
                        actionId: r,
                        uniqueIdentifier: i,
                        persist: !0,
                      });
                      break;
                    case l.TransactionMetaMetricsEvent.finalized:
                      n.createEventFragment({
                        category: d.MetaMetricsEventCategory.Transactions,
                        successEvent: l.TransactionMetaMetricsEvent.finalized,
                        properties: s.properties,
                        sensitiveProperties: s.sensitiveProperties,
                        actionId: r,
                        uniqueIdentifier: i,
                        persist: !0,
                      });
                  }
                }
                async function E({
                  eventName: e,
                  transactionEventPayload: t,
                  transactionMetricsRequest: r,
                  extraParams: n = {},
                }) {
                  const { properties: s, sensitiveProperties: i } = await _({
                    transactionEventPayload: t,
                    transactionMetricsRequest: r,
                    extraParams: n,
                  });
                  T({
                    eventName: e,
                    transactionEventPayload: t,
                    transactionMetricsRequest: r,
                    payload: { properties: s, sensitiveProperties: i },
                  }),
                    (function ({
                      eventName: e,
                      transactionEventPayload: { transactionMeta: t },
                      transactionMetricsRequest: r,
                      payload: n,
                    }) {
                      const s = A(e, t.id);
                      switch (e) {
                        case l.TransactionMetaMetricsEvent.approved:
                        case l.TransactionMetaMetricsEvent.rejected:
                        case l.TransactionMetaMetricsEvent.finalized:
                          r.updateEventFragment(s, {
                            properties: n.properties,
                            sensitiveProperties: n.sensitiveProperties,
                          });
                      }
                    })({
                      eventName: e,
                      transactionEventPayload: t,
                      transactionMetricsRequest: r,
                      payload: { properties: s, sensitiveProperties: i },
                    }),
                    (function ({
                      eventName: e,
                      transactionMetricsRequest: t,
                      transactionEventPayload: { transactionMeta: r },
                    }) {
                      const n = A(e, r.id);
                      switch (e) {
                        case l.TransactionMetaMetricsEvent.approved:
                        case l.TransactionMetaMetricsEvent.finalized:
                          t.finalizeEventFragment(n);
                          break;
                        case l.TransactionMetaMetricsEvent.rejected:
                          t.finalizeEventFragment(n, { abandoned: !0 });
                      }
                    })({ eventName: e, transactionEventPayload: t, transactionMetricsRequest: r });
                }
                function A(e, t) {
                  return `transaction-${e === l.TransactionMetaMetricsEvent.finalized || e === l.TransactionMetaMetricsEvent.submitted ? 'submitted' : 'added'}-${t}`;
                }
                async function _({
                  transactionEventPayload: { transactionMeta: e },
                  transactionMetricsRequest: t,
                  extraParams: r = {},
                }) {
                  var k;
                  const {
                      type: T,
                      time: E,
                      status: A,
                      chainId: _,
                      origin: x,
                      txParams: {
                        gasPrice: P,
                        gas: S,
                        maxFeePerGas: I,
                        maxPriorityFeePerGas: B,
                        estimateSuggested: j,
                        estimateUsed: M,
                      },
                      defaultGasEstimates: C,
                      originalType: O,
                      replacedById: R,
                      customTokenAmount: N,
                      dappProposedTokenAmount: D,
                      currentTokenBalance: $,
                      originalApprovalAmount: L,
                      finalApprovalAmount: U,
                      securityProviderResponse: H,
                      simulationFails: K,
                      id: z,
                      userFeeLevel: F,
                    } = e,
                    V = x === c.ORIGIN_METAMASK ? 'user' : 'dapp',
                    W = 'dappSuggested' === F ? 'dapp_proposed' : F,
                    { assetType: G, tokenStandard: q } = await (0, m.determineTransactionAssetType)(
                      e,
                      t.provider,
                      t.getTokenStandardAndDetails
                    );
                  let Y;
                  if (e.txParams.data) {
                    const r = await t.getMethodData(e.txParams.data);
                    Y = null == r ? void 0 : r.name;
                  }
                  const J = {};
                  if (
                    ((0, m.isEIP1559Transaction)(e)
                      ? ((J.max_fee_per_gas = I), (J.max_priority_fee_per_gas = B))
                      : ((J.gas_price = P),
                        (J.default_estimate =
                          d.MetaMetricsEventTransactionEstimateType.DefaultEstimate)),
                    C)
                  ) {
                    var X, Z;
                    const { estimateType: r } = C;
                    if (r) {
                      var Q, ee;
                      J.default_estimate =
                        r === u.PriorityLevels.dAppSuggested
                          ? d.MetaMetricsEventTransactionEstimateType.DappProposed
                          : r;
                      let n =
                          null === (Q = e.defaultGasEstimates) || void 0 === Q
                            ? void 0
                            : Q.maxFeePerGas,
                        s =
                          null === (ee = e.defaultGasEstimates) || void 0 === ee
                            ? void 0
                            : ee.maxPriorityFeePerGas;
                      if (
                        [
                          u.GasRecommendations.low,
                          u.GasRecommendations.medium,
                          u.GasRecommendations.high,
                        ].includes(r)
                      ) {
                        var te, re;
                        const { gasFeeEstimates: e } = await t.getEIP1559GasFeeEstimates();
                        var ne, se;
                        if (
                          null != e &&
                          null !== (te = e[r]) &&
                          void 0 !== te &&
                          te.suggestedMaxFeePerGas
                        )
                          (n =
                            null === (ne = e[r]) || void 0 === ne
                              ? void 0
                              : ne.suggestedMaxFeePerGas),
                            (J.default_max_fee_per_gas = n);
                        if (
                          null != e &&
                          null !== (re = e[r]) &&
                          void 0 !== re &&
                          re.suggestedMaxPriorityFeePerGas
                        )
                          (s =
                            null === (se = e[r]) || void 0 === se
                              ? void 0
                              : se.suggestedMaxPriorityFeePerGas),
                            (J.default_max_priority_fee_per_gas = s);
                      }
                    }
                    null !== (X = e.defaultGasEstimates) &&
                      void 0 !== X &&
                      X.gas &&
                      (J.default_gas = e.defaultGasEstimates.gas),
                      null !== (Z = e.defaultGasEstimates) &&
                        void 0 !== Z &&
                        Z.gasPrice &&
                        (J.default_gas_price = e.defaultGasEstimates.gasPrice);
                  }
                  j && (J.estimate_suggested = j),
                    M && (J.estimate_used = M),
                    null != r && r.gas_used && (J.gas_used = r.gas_used);
                  const ie = (function (e) {
                    const t = {};
                    for (const r in e)
                      (0, s.isHexString)(e[r])
                        ? (t[r] = (0, h.hexWEIToDecGWEI)(e[r]))
                        : (t[r] = e[r]);
                    return t;
                  })(J);
                  let ae = '0';
                  e.txParams.maxFeePerGas && (ae = '2');
                  const oe =
                      T &&
                      [
                        i.TransactionType.contractInteraction,
                        i.TransactionType.tokenMethodApprove,
                        i.TransactionType.tokenMethodIncreaseAllowance,
                        i.TransactionType.tokenMethodSafeTransferFrom,
                        i.TransactionType.tokenMethodSetApprovalForAll,
                        i.TransactionType.tokenMethodTransfer,
                        i.TransactionType.tokenMethodTransferFrom,
                        i.TransactionType.swap,
                        i.TransactionType.swapAndSend,
                        i.TransactionType.swapApproval,
                      ].includes(T),
                    ce = 'Approve';
                  let ue,
                    de,
                    le,
                    fe,
                    he,
                    pe,
                    me = i.TransactionType.simpleSend;
                  if (T === i.TransactionType.swapAndSend) me = i.TransactionType.swapAndSend;
                  else if (T === i.TransactionType.cancel) me = i.TransactionType.cancel;
                  else if (T === i.TransactionType.retry && O) me = O;
                  else if (T === i.TransactionType.deployContract)
                    me = i.TransactionType.deployContract;
                  else if (oe) {
                    var ge, ye;
                    (me = i.TransactionType.contractInteraction),
                      (de = Y),
                      (he = null === (ge = e.txParams) || void 0 === ge ? void 0 : ge.to),
                      (pe =
                        null === (ye = e.txParams) ||
                        void 0 === ye ||
                        null === (ye = ye.data) ||
                        void 0 === ye
                          ? void 0
                          : ye.slice(0, 10)),
                      de === ce &&
                        q === l.TokenStandard.ERC20 &&
                        ('0' === D || '0' === N
                          ? (ue = l.TransactionApprovalAmountType.revoke)
                          : N && N !== D
                            ? (ue = l.TransactionApprovalAmountType.custom)
                            : D && (ue = l.TransactionApprovalAmountType.dappProposed),
                        (le = (function (e, t, r) {
                          if (e === l.TransactionApprovalAmountType.custom && t && r)
                            return `${new n.BigNumber(t, 10).div(r, 10).times(100).round(2)}`;
                          return null;
                        })(ue, L, U)),
                        (fe = (function (e, t, r) {
                          if (
                            (e === l.TransactionApprovalAmountType.custom ||
                              e === l.TransactionApprovalAmountType.dappProposed) &&
                            t &&
                            r
                          )
                            return `${new n.BigNumber(t, 16).div(r, 10).times(100).round(2)}`;
                          return null;
                        })(ue, D, $)));
                  }
                  const be = t.getTransaction(R),
                    we = {
                      RETRY: i.TransactionType.retry,
                      CANCEL: i.TransactionType.cancel,
                      SAME_NONCE: 'other',
                    };
                  let ve;
                  null != r &&
                    r.dropped &&
                    ((ve = we.SAME_NONCE),
                    (null == be ? void 0 : be.type) === i.TransactionType.cancel
                      ? (ve = we.CANCEL)
                      : (null == be ? void 0 : be.type) === i.TransactionType.retry &&
                        (ve = we.RETRY));
                  const ke = [];
                  let Te = null;
                  1 === (null == H ? void 0 : H.flagAsDangerous)
                    ? ke.push(d.MetaMetricsEventUiCustomization.FlaggedAsMalicious)
                    : 2 === (null == H ? void 0 : H.flagAsDangerous) &&
                      ke.push(d.MetaMetricsEventUiCustomization.FlaggedAsSafetyUnknown);
                  const Ee = (0, g.getBlockaidMetricsProps)(e);
                  (null == Ee || null === (k = Ee.ui_customizations) || void 0 === k
                    ? void 0
                    : k.length) > 0 && ke.push(...Ee.ui_customizations),
                    K && ke.push(d.MetaMetricsEventUiCustomization.GasEstimationFailed);
                  (0, b.shouldUseRedesignForTransactions)({ transactionMetadataType: e.type }) &&
                    (ke.push(d.MetaMetricsEventUiCustomization.RedesignedConfirmation),
                    (Te = t.getIsConfirmationAdvancedDetailsOpen()));
                  const Ae = (0, p.getSmartTransactionMetricsProperties)(t, e),
                    _e = (0, g.getSwapAndSendMetricsProps)(e),
                    xe = { hd_entropy_index: t.getHDEntropyIndex() };
                  let Pe = {
                    chain_id: _,
                    referrer: x,
                    source: V,
                    status: A,
                    network: `${parseInt(_, 16)}`,
                    eip_1559_version: ae,
                    gas_edit_type: 'none',
                    gas_edit_attempted: 'none',
                    gas_estimation_failed: Boolean(K),
                    account_type: await t.getAccountType(t.getSelectedAddress()),
                    device_model: await t.getDeviceModel(t.getSelectedAddress()),
                    asset_type: G,
                    token_standard: q,
                    transaction_type: me,
                    transaction_speed_up: T === i.TransactionType.retry,
                    transaction_internal_id: z,
                    gas_fee_selected: W,
                    ...Ee,
                    ui_customizations: ke.length > 0 ? ke : null,
                    transaction_advanced_view: Te,
                    transaction_contract_method: de ? [de] : [],
                    ...Ae,
                    ..._e,
                    ...xe,
                  };
                  const Se = await (0, y.getSnapAndHardwareInfoForMetrics)(
                    t.getAccountType,
                    t.getDeviceModel,
                    t.getHardwareTypeForMetric,
                    t.snapAndHardwareMessenger
                  );
                  Object.assign(Pe, Se),
                    de === ce && (Pe = { ...Pe, transaction_approval_amount_type: ue });
                  let Ie = {
                    transaction_envelope_type: (0, m.isEIP1559Transaction)(e)
                      ? f.TRANSACTION_ENVELOPE_TYPE_NAMES.FEE_MARKET
                      : f.TRANSACTION_ENVELOPE_TYPE_NAMES.LEGACY,
                    first_seen: E,
                    gas_limit: S,
                    transaction_replaced: ve,
                    transaction_contract_address: he ? [he] : [],
                    transaction_contract_method_4byte: pe,
                    ...r,
                    ...ie,
                  };
                  return (
                    de === ce &&
                      (Ie = {
                        ...Ie,
                        transaction_approval_amount_vs_balance_ratio: fe,
                        transaction_approval_amount_vs_proposed_ratio: le,
                      }),
                    await (async function (e, t, r, n) {
                      const s = origin && origin !== c.ORIGIN_METAMASK,
                        { delegationAddress: a, nestedTransactions: u, txParams: d } = e,
                        { authorizationList: l } = d,
                        f = Boolean(null == u ? void 0 : u.length),
                        h = Boolean(null == l ? void 0 : l.length);
                      s &&
                        (r.api_method = f
                          ? c.MESSAGE_TYPE.WALLET_SEND_CALLS
                          : c.MESSAGE_TYPE.ETH_SEND_TRANSACTION);
                      f &&
                        ((r.batch_transaction_count = null == u ? void 0 : u.length),
                        (r.batch_transaction_method = 'eip7702'),
                        (r.transaction_contract_method = await (async function (e, t) {
                          const r = e
                              .filter(
                                e => e.type === i.TransactionType.contractInteraction && e.data
                              )
                              .map(e => e.data),
                            n = await Promise.all(r.map(e => t(e)));
                          return n
                            .map(e => (null == e ? void 0 : e.name))
                            .filter(e => (null == e ? void 0 : e.length));
                        })(u ?? [], t)),
                        (n.transaction_contract_address =
                          null == u
                            ? void 0
                            : u
                                .filter(e => {
                                  var t;
                                  return (
                                    e.type === i.TransactionType.contractInteraction &&
                                    (null === (t = e.to) || void 0 === t ? void 0 : t.length)
                                  );
                                })
                                .map(e => e.to)));
                      if (e.status === i.TransactionStatus.rejected) {
                        const { error: t } = e;
                        r.eip7702_upgrade_rejection =
                          h && t.code === o.errorCodes.rpc.methodNotSupported;
                      }
                      (r.eip7702_upgrade_transaction = h), (n.account_eip7702_upgraded = a);
                    })(e, t.getMethodData, Pe, Ie),
                    (function (e, t, r, n) {
                      var s;
                      const {
                        batchId: i,
                        batchTransactions: o,
                        gasFeeTokens: c,
                        nestedTransactions: u,
                        selectedGasFeeToken: d,
                      } = e;
                      (t.gas_payment_tokens_available = null == c ? void 0 : c.map(e => e.symbol)),
                        (t.gas_paid_with =
                          null == c ||
                          null ===
                            (s = c.find(
                              e =>
                                e.tokenAddress.toLowerCase() ===
                                (null == d ? void 0 : d.toLowerCase())
                            )) ||
                          void 0 === s
                            ? void 0
                            : s.symbol),
                        (t.gas_insufficient_native_asset = (function (e, t) {
                          const { chainId: r, txParams: n } = e,
                            { from: s, gas: i, gasPrice: o, maxFeePerGas: c, value: u } = n,
                            d = t(s, r),
                            l = (0, w.getMaximumGasTotalInHexWei)({
                              gasLimit: i,
                              gasPrice: o,
                              maxFeePerGas: c,
                            }),
                            f = (0, a.add0x)((0, h.addHexes)(l, u ?? '0x0'));
                          return new v.Numeric(f, 16).greaterThan(new v.Numeric(d, 16));
                        })(e, n)),
                        !i ||
                          (null != o && o.length) ||
                          (null != u && u.length) ||
                          (t.transaction_type = 'gas_payment');
                    })(e, Pe, 0, t.getAccountBalance),
                    { properties: Pe, sensitiveProperties: Ie }
                  );
                }
                r.handlePostTransactionBalanceUpdate = async (
                  { getParticipateInMetrics: e, trackEvent: t, getHDEntropyIndex: r },
                  { transactionMeta: s, approvalTransactionMeta: i }
                ) => {
                  var a;
                  if (e() && s.swapMetaData)
                    if ('0x0' === (null === (a = s.txReceipt) || void 0 === a ? void 0 : a.status))
                      t({
                        event: d.MetaMetricsEventName.SwapFailed,
                        category: d.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: { ...s.swapMetaData },
                        properties: { hd_entropy_index: r() },
                      });
                    else {
                      var o;
                      const e = (0, f.getSwapsTokensReceivedFromTxMeta)(
                          s.destinationTokenSymbol,
                          s,
                          s.destinationTokenAddress,
                          s.txParams.from,
                          s.destinationTokenDecimals,
                          i,
                          s.chainId
                        ),
                        a = e
                          ? `${new n.BigNumber(e, 10).div(s.swapMetaData.token_to_amount, 10).times(100).round(2)}%`
                          : null,
                        c =
                          null !== (o = s.txReceipt) &&
                          void 0 !== o &&
                          o.gasUsed &&
                          s.swapMetaData.estimated_gas
                            ? `${new n.BigNumber(s.txReceipt.gasUsed, 16).div(s.swapMetaData.estimated_gas, 10).times(100).round(2)}%`
                            : null,
                        u = (function (e, t) {
                          var r, s;
                          let i = '0x0';
                          null != t &&
                            t.txReceipt &&
                            (i = (0, f.calcGasTotal)(
                              t.txReceipt.gasUsed,
                              t.txReceipt.effectiveGasPrice
                            ));
                          const a = (0, f.calcGasTotal)(
                              null === (r = e.txReceipt) || void 0 === r ? void 0 : r.gasUsed,
                              null === (s = e.txReceipt) || void 0 === s
                                ? void 0
                                : s.effectiveGasPrice
                            ),
                            o = new n.BigNumber(a, 16).plus(i, 16).toString(16);
                          return {
                            approvalGasCostInEth: Number((0, h.hexWEIToDecETH)(i)),
                            tradeGasCostInEth: Number((0, h.hexWEIToDecETH)(a)),
                            tradeAndApprovalGasCostInEth: Number((0, h.hexWEIToDecETH)(o)),
                          };
                        })(s, i);
                      t({
                        event: d.MetaMetricsEventName.SwapCompleted,
                        category: d.MetaMetricsEventCategory.Swaps,
                        sensitiveProperties: {
                          ...s.swapMetaData,
                          token_to_amount_received: e,
                          quote_vs_executionRatio: a,
                          estimated_vs_used_gasRatio: c,
                          approval_gas_cost_in_eth: u.approvalGasCostInEth,
                          trade_gas_cost_in_eth: u.tradeGasCostInEth,
                          trade_and_approval_gas_cost_in_eth: u.tradeAndApprovalGasCostInEth,
                          token_to_amount: s.swapMetaData.token_to_amount.toString(10),
                        },
                        properties: { hd_entropy_index: r() },
                      });
                    }
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/metrics.ts' },
    ],
    [
      20,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getInstitutionalSnapControllerMessenger = function (e) {
                    return e.getRestricted({
                      name: 'InstitutionalSnapController',
                      allowedActions: [
                        'AccountsController:getAccountByAddress',
                        'SnapController:handleRequest',
                        'TransactionController:updateCustodialTransaction',
                      ],
                      allowedEvents: [],
                    });
                  });
              };
            };
      },
      {
        package: '$root$',
        file: 'app/scripts/controller-init/messengers/accounts/institutional-snap-controller-messenger.ts',
      },
    ],
    [
      200,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/smartTransactions': 5813,
        '../../../../shared/modules/conversion.utils': 5858,
        '../../../../shared/modules/transaction.utils': 5880,
        '@metamask/smart-transactions-controller/dist/types': 2661,
        '@metamask/transaction-controller': 2946,
        loglevel: 4929,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.submitSmartTransactionHook = r.submitBatchSmartTransactionHook = void 0);
                var n,
                  s = e('@metamask/smart-transactions-controller/dist/types'),
                  i = e('@metamask/transaction-controller'),
                  a = (n = e('loglevel')) && n.__esModule ? n : { default: n },
                  o = e('../../../../shared/modules/conversion.utils'),
                  c = e('../../../../shared/constants/smartTransactions'),
                  u = e('../../../../shared/modules/transaction.utils'),
                  d = e('../../../../shared/constants/app');
                function l(e, t, r) {
                  f(e, t), t.set(e, r);
                }
                function f(e, t) {
                  if (t.has(e))
                    throw new TypeError(
                      'Cannot initialize the same private elements twice on an object'
                    );
                }
                function h(e, t) {
                  return e.get(m(e, t));
                }
                function p(e, t, r) {
                  return e.set(m(e, t), r), r;
                }
                function m(e, t, r) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : r;
                  throw new TypeError('Private element is not present on this object');
                }
                var g = new WeakMap(),
                  y = new WeakMap(),
                  b = new WeakMap(),
                  w = new WeakMap(),
                  v = new WeakMap(),
                  k = new WeakMap(),
                  T = new WeakMap(),
                  E = new WeakMap(),
                  A = new WeakMap(),
                  _ = new WeakMap(),
                  x = new WeakMap(),
                  P = new WeakMap(),
                  S = new WeakMap(),
                  I = new WeakMap(),
                  B = new WeakSet();
                class j {
                  constructor(e) {
                    !(function (e, t) {
                      f(e, t), t.add(e);
                    })(this, B),
                      l(this, g, void 0),
                      l(this, y, void 0),
                      l(this, b, void 0),
                      l(this, w, void 0),
                      l(this, v, void 0),
                      l(this, k, void 0),
                      l(this, T, void 0),
                      l(this, E, void 0),
                      l(this, A, void 0),
                      l(this, _, void 0),
                      l(this, x, void 0),
                      l(this, P, void 0),
                      l(this, S, void 0),
                      l(this, I, void 0);
                    const {
                      transactionMeta: t,
                      signedTransactionInHex: r,
                      smartTransactionsController: n,
                      transactionController: s,
                      isSmartTransaction: a,
                      controllerMessenger: o,
                      featureFlags: c,
                      transactions: u,
                    } = e;
                    p(y, this, ''),
                      p(g, this, !1),
                      p(_, this, t),
                      p(x, this, r),
                      p(E, this, n),
                      p(A, this, s),
                      p(T, this, a),
                      p(w, this, o),
                      p(v, this, c),
                      p(k, this, t.origin !== d.ORIGIN_METAMASK),
                      p(b, this, t.chainId),
                      p(S, this, t.txParams),
                      p(P, this, u),
                      p(
                        I,
                        this,
                        Boolean(
                          t.type !== i.TransactionType.bridge ||
                            (h(P, this) && h(P, this).length > 0)
                        )
                      );
                  }
                  async submit() {
                    const e =
                        !!h(_, this).type &&
                        [
                          i.TransactionType.swapAndSend,
                          i.TransactionType.swapApproval,
                          i.TransactionType.bridgeApproval,
                        ].includes(h(_, this).type),
                      t = { transactionHash: undefined };
                    if (!h(T, this) || e || (0, u.isLegacyTransaction)(h(_, this))) return t;
                    let r;
                    h(I, this) && (await m(B, this, O).call(this));
                    try {
                      r = await h(E, this).getFees(
                        { ...h(S, this), chainId: h(b, this) },
                        undefined,
                        { networkClientId: h(_, this).networkClientId }
                      );
                    } catch (e) {
                      return (
                        a.default.error(
                          'Error in smart transaction publish hook, falling back to regular transaction submission',
                          e
                        ),
                        m(B, this, N).call(this),
                        t
                      );
                    }
                    try {
                      var n;
                      const e = await m(B, this, H).call(this, { getFeesResponse: r }),
                        t = null == e ? void 0 : e.uuid;
                      if (!t) throw new Error('No smart transaction UUID');
                      await m(B, this, R).call(this, t);
                      let s;
                      if (
                        ((s =
                          (null === (n = h(v, this)) ||
                          void 0 === n ||
                          null === (n = n.smartTransactions) ||
                          void 0 === n
                            ? void 0
                            : n.extensionReturnTxHashAsap) &&
                          null != e &&
                          e.txHash
                            ? e.txHash
                            : await m(B, this, U).call(this, { uuid: t })),
                        null === s)
                      )
                        throw new Error(
                          'Transaction does not have a transaction hash, there was a problem'
                        );
                      return { transactionHash: s };
                    } catch (e) {
                      throw (
                        (a.default.error('Error in smart transaction publish hook', e),
                        m(B, this, N).call(this),
                        e)
                      );
                    }
                  }
                  async submitBatch() {
                    if (!h(T, this))
                      throw new Error(
                        'submitBatch: Smart Transaction is required for batch submissions'
                      );
                    h(I, this) && (await m(B, this, O).call(this));
                    try {
                      const e = await m(B, this, H).call(this),
                        t = null == e ? void 0 : e.uuid;
                      if (!t) throw new Error('submitBatch: No smart transaction UUID');
                      await m(B, this, R).call(this, t);
                      if (null === (await m(B, this, U).call(this, { uuid: t })))
                        throw new Error(
                          'submitBatch: Transaction does not have a transaction hash, there was a problem'
                        );
                      let r;
                      return (
                        (r =
                          null != e && e.txHashes
                            ? { results: e.txHashes.map(e => ({ transactionHash: e })) }
                            : { results: [] }),
                        r
                      );
                    } catch (e) {
                      throw (
                        (a.default.error(
                          'submitBatch: Error in smart transaction publish batch hook',
                          e
                        ),
                        m(B, this, N).call(this),
                        e)
                      );
                    }
                  }
                }
                async function M(e) {
                  try {
                    await h(w, this).call('ApprovalController:endFlow', { id: e });
                  } catch (e) {}
                }
                async function C(e) {
                  try {
                    await m(B, this, M).call(this, e),
                      await h(w, this).call('ApprovalController:acceptRequest', e),
                      (F._ = '');
                  } catch (e) {
                    a.default.error('Error ending existing approval flow', e);
                  }
                }
                async function O() {
                  F._ && (await m(B, this, C).call(this, F._));
                  const { id: e } = await h(w, this).call('ApprovalController:startFlow');
                  p(y, this, e), (F._ = e);
                }
                async function R(e) {
                  h(I, this) &&
                    (m(B, this, D).call(this, { uuid: e }), m(B, this, L).call(this, { uuid: e }));
                }
                function N() {
                  h(I, this) &&
                    !h(g, this) &&
                    (p(g, this, !0),
                    m(B, this, M).call(this, h(y, this)),
                    F._ === h(y, this) && (F._ = ''));
                }
                function D({ uuid: e }) {
                  const t = () => {
                    m(B, this, N).call(this);
                  };
                  h(w, this)
                    .call(
                      'ApprovalController:addRequest',
                      {
                        id: h(y, this),
                        origin: origin,
                        type: d.SMART_TRANSACTION_CONFIRMATION_TYPES.showSmartTransactionStatusPage,
                        requestState: {
                          smartTransaction: {
                            status: s.SmartTransactionStatuses.PENDING,
                            creationTime: Date.now(),
                            uuid: e,
                          },
                          isDapp: h(k, this),
                          txId: h(_, this).id,
                        },
                      },
                      !0
                    )
                    .then(t, t);
                }
                async function $({ smartTransaction: e }) {
                  return await h(w, this).call('ApprovalController:updateRequestState', {
                    id: h(y, this),
                    requestState: { smartTransaction: e, isDapp: h(k, this), txId: h(_, this).id },
                  });
                }
                async function L({ uuid: e }) {
                  h(w, this).subscribe('SmartTransactionsController:smartTransaction', async t => {
                    if (t.uuid === e) {
                      const { status: e } = t;
                      if (!e || e === s.SmartTransactionStatuses.PENDING) return;
                      h(g, this) || (await m(B, this, $).call(this, { smartTransaction: t }));
                    }
                  });
                }
                function U({ uuid: e }) {
                  return new Promise(t => {
                    h(w, this).subscribe(
                      'SmartTransactionsController:smartTransaction',
                      async r => {
                        if (r.uuid === e) {
                          const { status: e, statusMetadata: n } = r;
                          if (!e || e === s.SmartTransactionStatuses.PENDING) return;
                          a.default.debug('Smart Transaction: ', r),
                            null != n && n.minedHash
                              ? (a.default.debug(
                                  'Smart Transaction - Received tx hash: ',
                                  null == n ? void 0 : n.minedHash
                                ),
                                t(n.minedHash))
                              : t(null);
                        }
                      }
                    );
                  });
                }
                async function H({ getFeesResponse: e } = {}) {
                  let t = [];
                  if (h(P, this) && Array.isArray(h(P, this)) && h(P, this).length > 0)
                    t = h(P, this)
                      .filter(e => (null == e ? void 0 : e.signedTx))
                      .map(e => e.signedTx);
                  else if (h(x, this)) t = [h(x, this)];
                  else if (e) {
                    var r;
                    t = await m(B, this, z).call(
                      this,
                      (null === (r = e.tradeTxFees) || void 0 === r ? void 0 : r.fees) ?? [],
                      !1
                    );
                  }
                  return await h(E, this).submitSignedTransactions({
                    signedTransactions: t,
                    signedCanceledTransactions: [],
                    txParams: h(S, this),
                    transactionMeta: h(_, this),
                    networkClientId: h(_, this).networkClientId,
                  });
                }
                function K(e, t) {
                  if (!h(S, this)) throw new Error('Transaction params are required');
                  const r = {
                    ...h(S, this),
                    maxFeePerGas: `0x${(0, o.decimalToHex)(e.maxFeePerGas)}`,
                    maxPriorityFeePerGas: `0x${(0, o.decimalToHex)(e.maxPriorityFeePerGas)}`,
                    gas: t ? `0x${(0, o.decimalToHex)(c.CANCEL_GAS_LIMIT_DEC)}` : h(S, this).gas,
                  };
                  return t && ((r.to = r.from), (r.data = '0x')), r;
                }
                async function z(e, t) {
                  if (!h(S, this) || !h(b, this))
                    throw new Error('Transaction params and chainId are required');
                  const r = e
                    .map(e => m(B, this, K).call(this, e, t))
                    .map(e => ({ ...e, chainId: e.chainId || h(b, this) }));
                  return await h(A, this).approveTransactionsWithSameNonce(r, { hasNonce: !0 });
                }
                var F = { _: '' };
                r.submitSmartTransactionHook = e => new j(e).submit();
                r.submitBatchSmartTransactionHook = e => new j(e).submitBatch();
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/smart-transactions.ts' },
    ],
    [
      201,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.submitRelayTransaction = async function (e) {
                    const t = await fetch(null, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(e),
                    });
                    if (!t.ok) {
                      const e = await t.text();
                      throw new Error(
                        `Transaction relay submit failed with status: ${t.status} - ${e}`
                      );
                    }
                    return await t.json();
                  });
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/transaction-relay.ts' },
    ],
    [
      202,
      {
        '../../../../shared/constants/security-provider': 5811,
        '../../../../shared/lib/trace': 5849,
        '../ppom/ppom-util': 149,
        '@metamask/keyring-api': 2014,
        'ethereumjs-util': 4393,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.addDappTransaction = async function (e) {
                    const { dappRequest: t } = e,
                      { id: r, method: n, origin: s } = t,
                      { securityAlertResponse: i, traceContext: a } = t,
                      u = {
                        actionId: r,
                        method: n,
                        origin: s,
                        requireApproval: !0,
                        securityAlertResponse: i,
                      };
                    (0, o.endTrace)({ name: o.TraceName.Middleware, id: r });
                    const { waitForHash: d } = await c({
                        ...e,
                        transactionOptions: { ...u, traceContext: a },
                      }),
                      l = await d();
                    return (0, o.endTrace)({ name: o.TraceName.Transaction, id: r }), l;
                  }),
                  (r.addTransaction = async function (e) {
                    await (async function (e) {
                      const {
                          chainId: t,
                          ppomController: r,
                          securityAlertsEnabled: n,
                          transactionOptions: s,
                          transactionParams: o,
                          updateSecurityAlertResponse: c,
                          internalAccounts: u,
                        } = e,
                        { type: d } = s,
                        l = a.SECURITY_PROVIDER_EXCLUDED_TRANSACTION_TYPES.includes(d);
                      if (!n || l) return;
                      if (
                        u.some(({ address: e }) => {
                          var t;
                          return (
                            e.toLowerCase() ===
                            (null === (t = o.to) || void 0 === t ? void 0 : t.toLowerCase())
                          );
                        })
                      )
                        return;
                      try {
                        const { from: n, to: u, value: d, data: l } = o,
                          { actionId: f, origin: h } = s,
                          p = {
                            method: 'eth_sendTransaction',
                            id: f ?? '',
                            origin: h ?? '',
                            params: [{ from: n, to: u ?? '', value: d ?? '', data: l ?? '' }],
                            jsonrpc: '2.0',
                          },
                          m = (0, i.generateSecurityAlertId)();
                        (0, i.validateRequestWithPPOM)({
                          ppomController: r,
                          request: p,
                          securityAlertId: m,
                          chainId: t,
                          updateSecurityAlertResponse: c,
                        });
                        const g = { ...a.LOADING_SECURITY_ALERT_RESPONSE, securityAlertId: m };
                        e.transactionOptions.securityAlertResponse = g;
                      } catch (e) {
                        (0, i.handlePPOMError)(e, 'Error validating JSON RPC using PPOM: ');
                      }
                    })(e);
                    const { transactionMeta: t, waitForHash: r } = await c(e);
                    if (!e.waitForSubmit) return r().catch(() => {}), t;
                    const n = await r();
                    return (function (e, t) {
                      return t.state.transactions.find(t => t.hash === e);
                    })(n, e.transactionController);
                  }),
                  (r.getTransactionById = u);
                var n = e('@metamask/keyring-api'),
                  s = e('ethereumjs-util'),
                  i = e('../ppom/ppom-util'),
                  a = e('../../../../shared/constants/security-provider'),
                  o = e('../../../../shared/lib/trace');
                async function c(e) {
                  const { selectedAccount: t } = e;
                  return t.type === n.EthAccountType.Erc4337
                    ? (async function (e) {
                        var t;
                        const {
                            networkClientId: r,
                            transactionController: n,
                            transactionOptions: i,
                            transactionParams: a,
                            userOperationController: o,
                          } = e,
                          { maxFeePerGas: c, maxPriorityFeePerGas: d } = a,
                          { origin: l, requireApproval: f, type: h } = i,
                          p = {
                            ...a,
                            maxFeePerGas: (0, s.addHexPrefix)(c),
                            maxPriorityFeePerGas: (0, s.addHexPrefix)(d),
                          },
                          m = null == i || null === (t = i.swaps) || void 0 === t ? void 0 : t.meta;
                        null != m && m.type && delete m.type;
                        const g = {
                            networkClientId: r,
                            origin: l,
                            requireApproval: f,
                            swaps: m,
                            type: h,
                          },
                          y = await o.addUserOperationFromTransaction(p, g);
                        o.startPollingByNetworkClientId(r);
                        return { transactionMeta: u(y.id, n), waitForHash: y.transactionHash };
                      })(e)
                    : (async function (e) {
                        const {
                            transactionController: t,
                            transactionOptions: r,
                            transactionParams: n,
                            networkClientId: s,
                          } = e,
                          { result: i, transactionMeta: a } = await t.addTransaction(n, {
                            ...r,
                            networkClientId: s,
                          });
                        return { transactionMeta: a, waitForHash: () => i };
                      })(e);
                }
                function u(e, t) {
                  return t.state.transactions.find(t => t.id === e);
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/transaction/util.ts' },
    ],
    [
      203,
      {
        '../../../../shared/constants/app': 5789,
        '../../../../shared/constants/verification': 5821,
        '../../../../shared/modules/selectors/networks': 5875,
        '@ethersproject/hash': 533,
        '@ethersproject/wallet': 600,
        '@metamask/rpc-errors': 2585,
        '@metamask/utils': 2995,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.createTxVerificationMiddleware = function (e, t = o.TRUSTED_SIGNERS) {
                    return function (r, d, l, f) {
                      if (
                        r.method !== c.MESSAGE_TYPE.ETH_SEND_TRANSACTION ||
                        !Array.isArray(r.params) ||
                        !(function (e) {
                          return (
                            (0, a.isObject)(e[0]) &&
                            'string' == typeof e[0].data &&
                            'string' == typeof e[0].from &&
                            'string' == typeof e[0].to &&
                            'string' == typeof e[0].value &&
                            (!(0, a.hasProperty)(e[0], 'chainId') ||
                              ('string' == typeof e[0].chainId && e[0].chainId.startsWith('0x')))
                          );
                        })(r.params)
                      )
                        return l();
                      const h = r.params[0],
                        p =
                          'string' == typeof h.chainId
                            ? h.chainId.toLowerCase()
                            : (0, u.getCurrentChainId)({ metamask: e.state }),
                        m = (0, o.getExperience)(h.to.toLowerCase(), p);
                      if (!m || !o.EXPERIENCES_TO_VERIFY.includes(m)) return l();
                      const g = `0x${h.data.slice(-o.TX_SIG_LEN)}`,
                        y = (0, s.verifyMessage)(
                          (function (e) {
                            const t = {
                              to: (0, n.hashMessage)(e.to.toLowerCase()),
                              from: (0, n.hashMessage)(e.from.toLowerCase()),
                              data: (0, n.hashMessage)(
                                e.data.toLowerCase().slice(0, e.data.length - o.TX_SIG_LEN)
                              ),
                              value: (0, n.hashMessage)(e.value.toLowerCase()),
                            };
                            return (0, n.hashMessage)(JSON.stringify(t));
                          })(h),
                          g
                        );
                      return y !== t[m]
                        ? f(i.rpcErrors.invalidParams('Invalid transaction signature.'))
                        : l();
                    };
                  });
                var n = e('@ethersproject/hash'),
                  s = e('@ethersproject/wallet'),
                  i = e('@metamask/rpc-errors'),
                  a = e('@metamask/utils'),
                  o = e('../../../../shared/constants/verification'),
                  c = e('../../../../shared/constants/app'),
                  u = e('../../../../shared/modules/selectors/networks');
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/tx-verification/tx-verification-middleware.ts' },
    ],
  ],
  [],
  {}
);
