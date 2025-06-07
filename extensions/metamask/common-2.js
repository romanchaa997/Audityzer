LavaPack.loadBundle(
  [
    [
      1582,
      { './helpers': 1585, './internal': 1587, buffer: 4139 },
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
                      i = e('./internal');
                    r.intToHex = function (e) {
                      if (!Number.isSafeInteger(e) || e < 0)
                        throw new Error(`Received an invalid integer type: ${e}`);
                      return `0x${e.toString(16)}`;
                    };
                    r.intToBuffer = function (e) {
                      const n = (0, r.intToHex)(e);
                      return t.from((0, i.padToEven)(n.slice(2)), 'hex');
                    };
                    r.zeros = function (e) {
                      return t.allocUnsafe(e).fill(0);
                    };
                    const s = function (e, t, n) {
                      const i = (0, r.zeros)(t);
                      return n
                        ? e.length < t
                          ? (e.copy(i), i)
                          : e.slice(0, t)
                        : e.length < t
                          ? (e.copy(i, t - e.length), i)
                          : e.slice(-t);
                    };
                    r.setLengthLeft = function (e, t) {
                      return (0, n.assertIsBuffer)(e), s(e, t, !1);
                    };
                    r.setLengthRight = function (e, t) {
                      return (0, n.assertIsBuffer)(e), s(e, t, !0);
                    };
                    const o = function (e) {
                      let t = e[0];
                      for (; e.length > 0 && '0' === t.toString(); ) t = (e = e.slice(1))[0];
                      return e;
                    };
                    r.unpadBuffer = function (e) {
                      return (0, n.assertIsBuffer)(e), o(e);
                    };
                    r.unpadArray = function (e) {
                      return (0, n.assertIsArray)(e), o(e);
                    };
                    r.unpadHexString = function (e) {
                      return (
                        (0, n.assertIsHexString)(e), (e = (0, i.stripHexPrefix)(e)), '0x' + o(e)
                      );
                    };
                    r.toBuffer = function (e) {
                      if (null === e || e === undefined) return t.allocUnsafe(0);
                      if (t.isBuffer(e)) return t.from(e);
                      if (Array.isArray(e) || e instanceof Uint8Array) return t.from(e);
                      if ('string' == typeof e) {
                        if (!(0, i.isHexString)(e))
                          throw new Error(
                            `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${e}`
                          );
                        return t.from((0, i.padToEven)((0, i.stripHexPrefix)(e)), 'hex');
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
                    function a(e) {
                      const t = (0, r.bufferToHex)(e);
                      return '0x' === t ? BigInt(0) : BigInt(t);
                    }
                    function u(e) {
                      return (0, r.toBuffer)('0x' + e.toString(16));
                    }
                    (r.bufferToHex = function (e) {
                      return '0x' + (e = (0, r.toBuffer)(e)).toString('hex');
                    }),
                      (r.bufferToBigInt = a),
                      (r.bigIntToBuffer = u);
                    r.bufferToInt = function (e) {
                      const t = Number(a(e));
                      if (!Number.isSafeInteger(t)) throw new Error('Number exceeds 53 bits');
                      return t;
                    };
                    r.fromSigned = function (e) {
                      return BigInt.asIntN(256, a(e));
                    };
                    r.toUnsigned = function (e) {
                      return u(BigInt.asUintN(256, e));
                    };
                    (r.addHexPrefix = function (e) {
                      return 'string' != typeof e || (0, i.isHexPrefixed)(e) ? e : '0x' + e;
                    }),
                      (r.short = function (e, r = 50) {
                        const n = t.isBuffer(e) ? e.toString('hex') : e;
                        return n.length <= r ? n : n.slice(0, r) + '…';
                      });
                    r.toUtf8 = function (e) {
                      if ((e = (0, i.stripHexPrefix)(e)).length % 2 != 0)
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
                        return (0, r.unpadBuffer)(u(e));
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/bytes.js',
      },
    ],
    [
      1583,
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
                  i = e('ethereum-cryptography/secp256k1');
                (r.MAX_UINT64 = BigInt('0xffffffffffffffff')),
                  (r.MAX_INTEGER = BigInt(
                    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                  )),
                  (r.MAX_INTEGER_BIGINT = BigInt(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                  )),
                  (r.SECP256K1_ORDER = i.secp256k1.CURVE.n),
                  (r.SECP256K1_ORDER_DIV_2 = i.secp256k1.CURVE.n / BigInt(2)),
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/constants.js',
      },
    ],
    [
      1584,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/encoding.js',
      },
    ],
    [
      1585,
      { '../../../../../../../../../is-buffer/index.js': 4723, './internal': 1587 },
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/helpers.js',
      },
    ],
    [
      1586,
      {
        './account': 1579,
        './address': 1580,
        './asyncEventEmitter': 1581,
        './bytes': 1582,
        './constants': 1583,
        './encoding': 1584,
        './internal': 1587,
        './lock': 1588,
        './provider': 1589,
        './signature': 1590,
        './types': 1591,
        './units': 1592,
        './withdrawal': 1593,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
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
                  i(e('./constants'), r),
                  i(e('./units'), r),
                  i(e('./account'), r),
                  i(e('./address'), r),
                  i(e('./withdrawal'), r),
                  i(e('./signature'), r),
                  i(e('./bytes'), r),
                  i(e('./types'), r),
                  i(e('./encoding'), r),
                  i(e('./asyncEventEmitter'), r);
                var s = e('./internal');
                Object.defineProperty(r, 'arrayContainsArray', {
                  enumerable: !0,
                  get: function () {
                    return s.arrayContainsArray;
                  },
                }),
                  Object.defineProperty(r, 'fromAscii', {
                    enumerable: !0,
                    get: function () {
                      return s.fromAscii;
                    },
                  }),
                  Object.defineProperty(r, 'fromUtf8', {
                    enumerable: !0,
                    get: function () {
                      return s.fromUtf8;
                    },
                  }),
                  Object.defineProperty(r, 'getBinarySize', {
                    enumerable: !0,
                    get: function () {
                      return s.getBinarySize;
                    },
                  }),
                  Object.defineProperty(r, 'getKeys', {
                    enumerable: !0,
                    get: function () {
                      return s.getKeys;
                    },
                  }),
                  Object.defineProperty(r, 'isHexPrefixed', {
                    enumerable: !0,
                    get: function () {
                      return s.isHexPrefixed;
                    },
                  }),
                  Object.defineProperty(r, 'isHexString', {
                    enumerable: !0,
                    get: function () {
                      return s.isHexString;
                    },
                  }),
                  Object.defineProperty(r, 'padToEven', {
                    enumerable: !0,
                    get: function () {
                      return s.padToEven;
                    },
                  }),
                  Object.defineProperty(r, 'stripHexPrefix', {
                    enumerable: !0,
                    get: function () {
                      return s.stripHexPrefix;
                    },
                  }),
                  Object.defineProperty(r, 'toAscii', {
                    enumerable: !0,
                    get: function () {
                      return s.toAscii;
                    },
                  }),
                  i(e('./lock'), r),
                  i(e('./provider'), r);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/index.js',
      },
    ],
    [
      1587,
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
                        for (let i = 0; i < e.length; i++) {
                          let s = e[i][t];
                          if (!0 !== r || s) {
                            if ('string' != typeof s)
                              throw new Error(
                                "invalid abi - expected type 'string', received " + typeof s
                              );
                          } else s = '';
                          n.push(s);
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/internal.js',
      },
    ],
    [
      1588,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/lock.js',
      },
    ],
    [
      1589,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/provider.js',
      },
    ],
    [
      1590,
      {
        './bytes': 1582,
        './constants': 1583,
        './helpers': 1585,
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
                      i = e('ethereum-cryptography/secp256k1'),
                      s = e('./bytes'),
                      o = e('./constants'),
                      a = e('./helpers');
                    function u(e, t) {
                      return e === BigInt(0) || e === BigInt(1)
                        ? e
                        : t === undefined
                          ? e - BigInt(27)
                          : e - (t * BigInt(2) + BigInt(35));
                    }
                    function c(e) {
                      return e === BigInt(0) || e === BigInt(1);
                    }
                    r.ecsign = function (e, r, n) {
                      const s = i.secp256k1.sign(e, r),
                        o = s.toCompactRawBytes();
                      return {
                        r: t.from(o.slice(0, 32)),
                        s: t.from(o.slice(32, 64)),
                        v:
                          n === undefined
                            ? BigInt(s.recovery + 27)
                            : BigInt(s.recovery + 35) + BigInt(n) * BigInt(2),
                      };
                    };
                    r.ecrecover = function (e, r, n, o, a) {
                      const f = t.concat(
                          [(0, s.setLengthLeft)(n, 32), (0, s.setLengthLeft)(o, 32)],
                          64
                        ),
                        l = u(r, a);
                      if (!c(l)) throw new Error('Invalid signature v value');
                      const d = i.secp256k1.Signature.fromCompact(f)
                        .addRecoveryBit(Number(l))
                        .recoverPublicKey(e);
                      return t.from(d.toRawBytes(!1).slice(1));
                    };
                    r.toRpcSig = function (e, r, n, i) {
                      if (!c(u(e, i))) throw new Error('Invalid signature v value');
                      return (0, s.bufferToHex)(
                        t.concat([
                          (0, s.setLengthLeft)(r, 32),
                          (0, s.setLengthLeft)(n, 32),
                          (0, s.toBuffer)(e),
                        ])
                      );
                    };
                    r.toCompactSig = function (e, r, n, i) {
                      if (!c(u(e, i))) throw new Error('Invalid signature v value');
                      let o = n;
                      return (
                        ((e > BigInt(28) && e % BigInt(2) === BigInt(1)) ||
                          e === BigInt(1) ||
                          e === BigInt(28)) &&
                          ((o = t.from(n)), (o[0] |= 128)),
                        (0, s.bufferToHex)(
                          t.concat([(0, s.setLengthLeft)(r, 32), (0, s.setLengthLeft)(o, 32)])
                        )
                      );
                    };
                    r.fromRpcSig = function (e) {
                      const t = (0, s.toBuffer)(e);
                      let r, n, i;
                      if (t.length >= 65)
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (i = (0, s.bufferToBigInt)(t.slice(64)));
                      else {
                        if (64 !== t.length) throw new Error('Invalid signature length');
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (i = BigInt((0, s.bufferToInt)(t.slice(32, 33)) >> 7)),
                          (n[0] &= 127);
                      }
                      return i < 27 && (i += BigInt(27)), { v: i, r: r, s: n };
                    };
                    r.isValidSignature = function (e, t, r, n = !0, i) {
                      if (32 !== t.length || 32 !== r.length) return !1;
                      if (!c(u(e, i))) return !1;
                      const a = (0, s.bufferToBigInt)(t),
                        f = (0, s.bufferToBigInt)(r);
                      return (
                        !(
                          a === BigInt(0) ||
                          a >= o.SECP256K1_ORDER ||
                          f === BigInt(0) ||
                          f >= o.SECP256K1_ORDER
                        ) && !(n && f >= o.SECP256K1_ORDER_DIV_2)
                      );
                    };
                    r.hashPersonalMessage = function (e) {
                      (0, a.assertIsBuffer)(e);
                      const r = t.from(`Ethereum Signed Message:\n${e.length}`, 'utf-8');
                      return t.from((0, n.keccak256)(t.concat([r, e])));
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/signature.js',
      },
    ],
    [
      1591,
      { './bytes': 1582, './internal': 1587 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toType = r.TypeOutput = void 0);
                const n = e('./bytes'),
                  i = e('./internal');
                var s;
                !(function (e) {
                  (e[(e.Number = 0)] = 'Number'),
                    (e[(e.BigInt = 1)] = 'BigInt'),
                    (e[(e.Buffer = 2)] = 'Buffer'),
                    (e[(e.PrefixedHexString = 3)] = 'PrefixedHexString');
                })((s = r.TypeOutput || (r.TypeOutput = {}))),
                  (r.toType = function (e, t) {
                    if (null === e) return null;
                    if (e === undefined) return undefined;
                    if ('string' == typeof e && !(0, i.isHexString)(e))
                      throw new Error(`A string must be provided with a 0x-prefix, given: ${e}`);
                    if ('number' == typeof e && !Number.isSafeInteger(e))
                      throw new Error(
                        'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                      );
                    const r = (0, n.toBuffer)(e);
                    switch (t) {
                      case s.Buffer:
                        return r;
                      case s.BigInt:
                        return (0, n.bufferToBigInt)(r);
                      case s.Number: {
                        const e = (0, n.bufferToBigInt)(r);
                        if (e > BigInt(Number.MAX_SAFE_INTEGER))
                          throw new Error(
                            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                          );
                        return Number(e);
                      }
                      case s.PrefixedHexString:
                        return (0, n.bufferToHex)(r);
                      default:
                        throw new Error('unknown outputType');
                    }
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/types.js',
      },
    ],
    [
      1592,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/units.js',
      },
    ],
    [
      1593,
      { './address': 1580, './bytes': 1582, './types': 1591, buffer: 4139 },
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
                      i = e('./bytes'),
                      s = e('./types');
                    class o {
                      constructor(e, t, r, n) {
                        (this.index = e),
                          (this.validatorIndex = t),
                          (this.address = r),
                          (this.amount = n);
                      }
                      static fromWithdrawalData(e) {
                        const { index: t, validatorIndex: r, address: i, amount: a } = e,
                          u = (0, s.toType)(t, s.TypeOutput.BigInt),
                          c = (0, s.toType)(r, s.TypeOutput.BigInt),
                          f = new n.Address((0, s.toType)(i, s.TypeOutput.Buffer)),
                          l = (0, s.toType)(a, s.TypeOutput.BigInt);
                        return new o(u, c, f, l);
                      }
                      static fromValuesArray(e) {
                        if (4 !== e.length)
                          throw Error(
                            `Invalid withdrawalArray length expected=4 actual=${e.length}`
                          );
                        const [t, r, n, i] = e;
                        return o.fromWithdrawalData({
                          index: t,
                          validatorIndex: r,
                          address: n,
                          amount: i,
                        });
                      }
                      static toBufferArray(e) {
                        const { index: r, validatorIndex: i, address: o, amount: a } = e,
                          u =
                            (0, s.toType)(r, s.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, s.toType)(r, s.TypeOutput.Buffer),
                          c =
                            (0, s.toType)(i, s.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, s.toType)(i, s.TypeOutput.Buffer);
                        let f;
                        f = o instanceof n.Address ? o.buf : (0, s.toType)(o, s.TypeOutput.Buffer);
                        return [
                          u,
                          c,
                          f,
                          (0, s.toType)(a, s.TypeOutput.BigInt) === BigInt(0)
                            ? t.alloc(0)
                            : (0, s.toType)(a, s.TypeOutput.Buffer),
                        ];
                      }
                      raw() {
                        return o.toBufferArray(this);
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
                          index: (0, i.bigIntToHex)(this.index),
                          validatorIndex: (0, i.bigIntToHex)(this.validatorIndex),
                          address: '0x' + this.address.buf.toString('hex'),
                          amount: (0, i.bigIntToHex)(this.amount),
                        };
                      }
                    }
                    r.Withdrawal = o;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/withdrawal.js',
      },
    ],
    [
      1594,
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
                function i(e) {
                  return (
                    e instanceof Uint8Array ||
                    (null != e && 'object' == typeof e && 'Uint8Array' === e.constructor.name)
                  );
                }
                function s(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function o(e) {
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
                function a(e = '') {
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
                function u(e, t = '=') {
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
                function c(e) {
                  if ('function' != typeof e) throw new Error('normalize fn should be function');
                  return { encode: e => e, decode: t => e(t) };
                }
                function f(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
                  if (!e.length) return [];
                  let i = 0;
                  const s = [],
                    o = Array.from(e);
                  for (
                    o.forEach(e => {
                      if ((n(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
                    });
                    ;

                  ) {
                    let e = 0,
                      n = !0;
                    for (let s = i; s < o.length; s++) {
                      const a = o[s],
                        u = t * e + a;
                      if (!Number.isSafeInteger(u) || (t * e) / t !== e || u - a != t * e)
                        throw new Error('convertRadix: carry overflow');
                      e = u % r;
                      const c = Math.floor(u / r);
                      if (((o[s] = c), !Number.isSafeInteger(c) || c * r + e !== u))
                        throw new Error('convertRadix: carry overflow');
                      n && (c ? (n = !1) : (i = s));
                    }
                    if ((s.push(e), n)) break;
                  }
                  for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) s.push(0);
                  return s.reverse();
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
                  d = (e, t) => e + (t - l(e, t));
                function h(e, t, r, i) {
                  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
                  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (d(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${d(t, r)}`
                    );
                  let s = 0,
                    o = 0;
                  const a = 2 ** r - 1,
                    u = [];
                  for (const i of e) {
                    if ((n(i), i >= 2 ** t))
                      throw new Error(`convertRadix2: invalid data word=${i} from=${t}`);
                    if (((s = (s << t) | i), o + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
                    for (o += t; o >= r; o -= r) u.push(((s >> (o - r)) & a) >>> 0);
                    s &= 2 ** o - 1;
                  }
                  if (((s = (s << (r - o)) & a), !i && o >= t)) throw new Error('Excess padding');
                  if (!i && s) throw new Error(`Non-zero padding: ${s}`);
                  return i && o > 0 && u.push(s >>> 0), u;
                }
                function p(e) {
                  return (
                    n(e),
                    {
                      encode: t => {
                        if (!i(t)) throw new Error('radix.encode input should be Uint8Array');
                        return f(Array.from(t), 256, e);
                      },
                      decode: t => {
                        if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                          throw new Error('radix.decode input should be array of numbers');
                        return Uint8Array.from(f(t, e, 256));
                      },
                    }
                  );
                }
                function m(e, t = !1) {
                  if ((n(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (d(8, e) > 32 || d(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!i(r)) throw new Error('radix2.encode input should be Uint8Array');
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
                      if (!i(r)) throw new Error('checksum.encode: input should be Uint8Array');
                      const n = t(r).slice(0, e),
                        s = new Uint8Array(r.length + e);
                      return s.set(r), s.set(n, r.length), s;
                    },
                    decode(r) {
                      if (!i(r)) throw new Error('checksum.decode: input should be Uint8Array');
                      const n = r.slice(0, -e),
                        s = t(n).slice(0, e),
                        o = r.slice(-e);
                      for (let t = 0; t < e; t++)
                        if (s[t] !== o[t]) throw new Error('Invalid checksum');
                      return n;
                    },
                  };
                }
                (r.utils = {
                  alphabet: o,
                  chain: s,
                  checksum: y,
                  convertRadix: f,
                  convertRadix2: h,
                  radix: p,
                  radix2: m,
                  join: a,
                  padding: u,
                }),
                  (r.base16 = s(m(4), o('0123456789ABCDEF'), a(''))),
                  (r.base32 = s(m(5), o('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), u(5), a(''))),
                  (r.base32nopad = s(m(5), o('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), a(''))),
                  (r.base32hex = s(m(5), o('0123456789ABCDEFGHIJKLMNOPQRSTUV'), u(5), a(''))),
                  (r.base32hexnopad = s(m(5), o('0123456789ABCDEFGHIJKLMNOPQRSTUV'), a(''))),
                  (r.base32crockford = s(
                    m(5),
                    o('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    a(''),
                    c(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  )),
                  (r.base64 = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    u(6),
                    a('')
                  )),
                  (r.base64nopad = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    a('')
                  )),
                  (r.base64url = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    u(6),
                    a('')
                  )),
                  (r.base64urlnopad = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    a('')
                  ));
                const b = e => s(p(58), o(e), a(''));
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
                      const i = e.subarray(n, n + 8);
                      t += r.base58.encode(i).padStart(w[i.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const i = e.slice(n, n + 11),
                        s = w.indexOf(i.length),
                        o = r.base58.decode(i);
                      for (let e = 0; e < o.length - s; e++)
                        if (0 !== o[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(o.slice(o.length - s)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  s(
                    y(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const k = s(o('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), a('')),
                  v = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function E(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < v.length; e++) 1 == ((t >> e) & 1) && (r ^= v[e]);
                  return r;
                }
                function T(e, t, r = 1) {
                  const n = e.length;
                  let i = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    i = E(i) ^ (r >> 5);
                  }
                  i = E(i);
                  for (let t = 0; t < n; t++) i = E(i) ^ (31 & e.charCodeAt(t));
                  for (let e of t) i = E(i) ^ e;
                  for (let e = 0; e < 6; e++) i = E(i);
                  return (i ^= r), k.encode(h([i % 2 ** 30], 30, 5, !1));
                }
                function x(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = m(5),
                    n = r.decode,
                    i = r.encode,
                    s = g(n);
                  function o(e, r, n = 90) {
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
                    const i = e.length + 7 + r.length;
                    if (!1 !== n && i > n) throw new TypeError(`Length ${i} exceeds limit ${n}`);
                    const s = e.toLowerCase(),
                      o = T(s, r, t);
                    return `${s}1${k.encode(r)}${o}`;
                  }
                  function a(e, r = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.decode input should be string, not ' + typeof e);
                    if (e.length < 8 || (!1 !== r && e.length > r))
                      throw new TypeError(
                        `Wrong string length: ${e.length} (${e}). Expected (8..${r})`
                      );
                    const n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const i = n.lastIndexOf('1');
                    if (0 === i || -1 === i)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const s = n.slice(0, i),
                      o = n.slice(i + 1);
                    if (o.length < 6) throw new Error('Data must be at least 6 characters long');
                    const a = k.decode(o).slice(0, -6),
                      u = T(s, a, t);
                    if (!o.endsWith(u))
                      throw new Error(`Invalid checksum in ${e}: expected "${u}"`);
                    return { prefix: s, words: a };
                  }
                  return {
                    encode: o,
                    decode: a,
                    encodeFromBytes: function (e, t) {
                      return o(e, i(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = a(e, !1);
                      return { prefix: t, words: r, bytes: n(r) };
                    },
                    decodeUnsafe: g(a),
                    fromWords: n,
                    fromWordsUnsafe: s,
                    toWords: i,
                  };
                }
                (r.bech32 = x('bech32')),
                  (r.bech32m = x('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  }),
                  (r.hex = s(
                    m(4),
                    o('0123456789abcdef'),
                    a(''),
                    c(e => {
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
                  A =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !_.hasOwnProperty(e)) throw new TypeError(A);
                  if (!i(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return _[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!_.hasOwnProperty(e)) throw new TypeError(A);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return _[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-hd-keyring>@metamask/eth-sig-util>@scure/base',
        file: 'node_modules/@metamask/eth-hd-keyring/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      1604,
      {
        './fetch-config-from-req': 1606,
        './logging-utils': 1608,
        '@metamask/json-rpc-engine': 1964,
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
                  (r.createInfuraMiddlewareWithoutRpcService = r.createInfuraMiddleware = void 0);
                const n = e('@metamask/json-rpc-engine'),
                  i = e('@metamask/rpc-errors'),
                  s = e('@metamask/utils'),
                  o = e('./fetch-config-from-req'),
                  a = e('./logging-utils'),
                  u = (0, a.createModuleLogger)(a.projectLogger, 'create-infura-middleware'),
                  c = ['Gateway timeout', 'ETIMEDOUT', 'ECONNRESET', 'SyntaxError'];
                function f({
                  network: e = 'mainnet',
                  maxAttempts: t = 5,
                  source: r,
                  projectId: i,
                  headers: s = {},
                }) {
                  if (!i || 'string' != typeof i)
                    throw new Error(`Invalid value for 'projectId': "${i}"`);
                  if (!s || 'object' != typeof s)
                    throw new Error(`Invalid value for 'headers': "${s}"`);
                  if (!t) throw new Error(`Invalid value for 'maxAttempts': "${t}" (${typeof t})`);
                  return (0, n.createAsyncMiddleware)(async (n, o) => {
                    for (let a = 1; a <= t; a++)
                      try {
                        u(
                          'Attempting request to Infura. network = %o, projectId = %s, headers = %o, req = %o',
                          e,
                          i,
                          s,
                          n
                        ),
                          await l(e, i, s, n, o, r);
                        break;
                      } catch (e) {
                        if (!h(e))
                          throw (
                            (u(
                              'Non-retriable request error encountered. req = %o, res = %o, error = %o',
                              n,
                              o,
                              e
                            ),
                            e)
                          );
                        if (!(t - a)) {
                          u(
                            'Retriable request error encountered, but exceeded max attempts. req = %o, res = %o, error = %o',
                            n,
                            o,
                            e
                          );
                          const t = `InfuraProvider - cannot complete request. All retries exhausted.\nOriginal Error:\n${e.toString()}\n\n`;
                          throw new Error(t);
                        }
                        u(
                          'Retriable request error encountered. req = %o, res = %o, error = %o',
                          n,
                          o,
                          e
                        ),
                          u('Waiting 1 second to try again...'),
                          await p(1e3);
                      }
                  });
                }
                async function l(e, t, r, n, s, a) {
                  const { fetchUrl: u, fetchParams: c } = (0, o.fetchConfigFromReq)({
                      network: e,
                      projectId: t,
                      extraHeaders: r,
                      req: n,
                      source: a,
                    }),
                    f = await fetch(u, c),
                    l = await f.text();
                  if (!f.ok)
                    switch (f.status) {
                      case 405:
                        throw i.rpcErrors.methodNotFound();
                      case 429:
                        throw d('Request is being rate limited.');
                      case 503:
                      case 504:
                        throw (function () {
                          let e = 'Gateway timeout. The request took too long to process. ';
                          return (
                            (e +=
                              'This can happen when querying logs over too wide a block range.'),
                            d(e)
                          );
                        })();
                      default:
                        throw d(l);
                    }
                  if ('eth_getBlockByNumber' === n.method && 'Not Found' === l)
                    return void (s.result = null);
                  const h = JSON.parse(l);
                  (s.result = h.result), (s.error = h.error);
                }
                function d(e) {
                  return i.rpcErrors.internal(e);
                }
                function h(e) {
                  const t = e.toString();
                  return c.some(e => t.includes(e));
                }
                async function p(e) {
                  return new Promise(t => {
                    setTimeout(t, e);
                  });
                }
                (r.createInfuraMiddleware = function (e) {
                  return 'rpcService' in e
                    ? (function ({ rpcService: e, options: t = {} }) {
                        const { source: r, headers: i = {} } = t;
                        return (0, n.createAsyncMiddleware)(async (t, n) => {
                          const o =
                              r !== undefined && t.origin !== undefined
                                ? Object.assign(Object.assign({}, i), {
                                    'Infura-Source': `${r}/${t.origin}`,
                                  })
                                : i,
                            a = await e.request(
                              { id: t.id, jsonrpc: t.jsonrpc, method: t.method, params: t.params },
                              { headers: o }
                            );
                          (0, s.isJsonRpcFailure)(a)
                            ? (n.error = a.error)
                            : ((n.result = a.result), (n.error = undefined));
                        });
                      })(e)
                    : f(e);
                }),
                  (r.createInfuraMiddlewareWithoutRpcService = f);
              };
            };
      },
      {
        package: '@metamask/network-controller>@metamask/eth-json-rpc-infura',
        file: 'node_modules/@metamask/eth-json-rpc-infura/dist/create-infura-middleware.js',
      },
    ],
    [
      1605,
      {
        './create-infura-middleware': 1604,
        '@metamask/eth-json-rpc-provider': 1671,
        '@metamask/json-rpc-engine': 1964,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.createProvider = void 0);
                const n = e('@metamask/eth-json-rpc-provider'),
                  i = e('@metamask/json-rpc-engine'),
                  s = e('./create-infura-middleware');
                r.createProvider = function (e) {
                  const t = new i.JsonRpcEngine();
                  return t.push((0, s.createInfuraMiddleware)(e)), (0, n.providerFromEngine)(t);
                };
              };
            };
      },
      {
        package: '@metamask/network-controller>@metamask/eth-json-rpc-infura',
        file: 'node_modules/@metamask/eth-json-rpc-infura/dist/create-provider.js',
      },
    ],
    [
      1606,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e) {
                  return { id: e.id, jsonrpc: e.jsonrpc, method: e.method, params: e.params };
                }
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.fetchConfigFromReq = void 0),
                  (r.fetchConfigFromReq = function ({
                    network: e,
                    projectId: t,
                    extraHeaders: r = {},
                    req: i,
                    source: s,
                  }) {
                    const o = i.origin || 'internal',
                      a = Object.assign({}, r, {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      });
                    return (
                      s && (a['Infura-Source'] = `${s}/${o}`),
                      {
                        fetchUrl: `https://${e}.infura.io/v3/${t}`,
                        fetchParams: { method: 'POST', headers: a, body: JSON.stringify(n(i)) },
                      }
                    );
                  });
              };
            };
      },
      {
        package: '@metamask/network-controller>@metamask/eth-json-rpc-infura',
        file: 'node_modules/@metamask/eth-json-rpc-infura/dist/fetch-config-from-req.js',
      },
    ],
    [
      1607,
      {
        './create-infura-middleware': 1604,
        './create-provider': 1605,
        './fetch-config-from-req': 1606,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  i(e('./create-infura-middleware'), r),
                  i(e('./fetch-config-from-req'), r),
                  i(e('./create-provider'), r);
              };
            };
      },
      {
        package: '@metamask/network-controller>@metamask/eth-json-rpc-infura',
        file: 'node_modules/@metamask/eth-json-rpc-infura/dist/index.js',
      },
    ],
    [
      1608,
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
                  (r.projectLogger = (0, n.createProjectLogger)('eth-json-rpc-infura'));
              };
            };
      },
      {
        package: '@metamask/network-controller>@metamask/eth-json-rpc-infura',
        file: 'node_modules/@metamask/eth-json-rpc-infura/dist/logging-utils.js',
      },
    ],
    [
      1671,
      {
        './provider-from-engine.cjs': 1672,
        './provider-from-middleware.cjs': 1673,
        './safe-event-emitter-provider.cjs': 1674,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.SafeEventEmitterProvider = void 0),
                  i(e('./provider-from-engine.cjs'), r),
                  i(e('./provider-from-middleware.cjs'), r);
                var s = e('./safe-event-emitter-provider.cjs');
                Object.defineProperty(r, 'SafeEventEmitterProvider', {
                  enumerable: !0,
                  get: function () {
                    return s.SafeEventEmitterProvider;
                  },
                });
              };
            };
      },
      {
        package: '@metamask/eth-json-rpc-provider',
        file: 'node_modules/@metamask/eth-json-rpc-provider/dist/index.cjs',
      },
    ],
    [
      1672,
      { './safe-event-emitter-provider.cjs': 1674 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.providerFromEngine = void 0);
                const n = e('./safe-event-emitter-provider.cjs');
                r.providerFromEngine = function (e) {
                  return new n.SafeEventEmitterProvider({ engine: e });
                };
              };
            };
      },
      {
        package: '@metamask/eth-json-rpc-provider',
        file: 'node_modules/@metamask/eth-json-rpc-provider/dist/provider-from-engine.cjs',
      },
    ],
    [
      1673,
      { './provider-from-engine.cjs': 1672, '@metamask/json-rpc-engine': 1964 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.providerFromMiddleware = void 0);
                const n = e('@metamask/json-rpc-engine'),
                  i = e('./provider-from-engine.cjs');
                r.providerFromMiddleware = function (e) {
                  const t = new n.JsonRpcEngine();
                  return t.push(e), (0, i.providerFromEngine)(t);
                };
              };
            };
      },
      {
        package: '@metamask/eth-json-rpc-provider',
        file: 'node_modules/@metamask/eth-json-rpc-provider/dist/provider-from-middleware.cjs',
      },
    ],
    [
      1674,
      { '@metamask/rpc-errors': 2585, '@metamask/safe-event-emitter': 2587, uuid: 5733 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n,
                  i =
                    (this && this.__classPrivateFieldSet) ||
                    function (e, t, r, n, i) {
                      if ('m' === n) throw new TypeError('Private method is not writable');
                      if ('a' === n && !i)
                        throw new TypeError('Private accessor was defined without a setter');
                      if ('function' == typeof t ? e !== t || !i : !t.has(e))
                        throw new TypeError(
                          'Cannot write private member to an object whose class did not declare it'
                        );
                      return 'a' === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
                    },
                  s =
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
                  o =
                    (this && this.__importDefault) ||
                    function (e) {
                      return e && e.__esModule ? e : { default: e };
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.SafeEventEmitterProvider = r.convertEip1193RequestToJsonRpcRequest = void 0);
                const a = e('@metamask/rpc-errors'),
                  u = o(e('@metamask/safe-event-emitter')),
                  c = e('uuid');
                function f(e) {
                  const { id: t = (0, c.v4)(), jsonrpc: r = '2.0', method: n, params: i } = e;
                  return i
                    ? { id: t, jsonrpc: r, method: n, params: i }
                    : { id: t, jsonrpc: r, method: n };
                }
                r.convertEip1193RequestToJsonRpcRequest = f;
                class l extends u.default {
                  constructor({ engine: e }) {
                    super(),
                      n.set(this, void 0),
                      (this.sendAsync = (e, t) => {
                        const r = f(e);
                        s(this, n, 'f').handle(r, t);
                      }),
                      (this.send = (e, t) => {
                        if ('function' != typeof t)
                          throw new Error('Must provide callback to "send" method.');
                        const r = f(e);
                        s(this, n, 'f').handle(r, t);
                      }),
                      i(this, n, e, 'f'),
                      e.on &&
                        e.on('notification', e => {
                          this.emit('data', null, e);
                        });
                  }
                  async request(e) {
                    const t = f(e),
                      r = await s(this, n, 'f').handle(t);
                    if ('result' in r) return r.result;
                    const i = new a.JsonRpcError(r.error.code, r.error.message, r.error.data);
                    throw ('stack' in r.error && (i.stack = r.error.stack), i);
                  }
                }
                (r.SafeEventEmitterProvider = l), (n = new WeakMap());
              };
            };
      },
      {
        package: '@metamask/eth-json-rpc-provider',
        file: 'node_modules/@metamask/eth-json-rpc-provider/dist/safe-event-emitter-provider.cjs',
      },
    ],
    [
      172,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.filterEvents = function ({ getMetaMetricsEnabled: e, log: t }) {
                    return {
                      name: n,
                      processEvent: async r =>
                        (await e()) ? r : (t('Event dropped as metrics disabled'), null),
                    };
                  });
                const n = 'FilterEvents';
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/sentry-filter-events.ts' },
    ],
    [
      1725,
      { 'json-rpc-random-id': 4753, xtend: 5772 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                const n = e('json-rpc-random-id')(),
                  i = e('xtend');
                function s(e) {
                  this.currentProvider = e;
                }
                function o(e) {
                  return function (...t) {
                    const r = t.pop();
                    this.sendAsync({ method: e, params: t }, r);
                  };
                }
                function a(e, t) {
                  return function (...r) {
                    const n = r.pop();
                    r.length < e && r.push('latest'), this.sendAsync({ method: t, params: r }, n);
                  };
                }
                (t.exports = s),
                  (s.prototype.getBalance = a(2, 'eth_getBalance')),
                  (s.prototype.getCode = a(2, 'eth_getCode')),
                  (s.prototype.getTransactionCount = a(2, 'eth_getTransactionCount')),
                  (s.prototype.getStorageAt = a(3, 'eth_getStorageAt')),
                  (s.prototype.call = a(2, 'eth_call')),
                  (s.prototype.protocolVersion = o('eth_protocolVersion')),
                  (s.prototype.syncing = o('eth_syncing')),
                  (s.prototype.coinbase = o('eth_coinbase')),
                  (s.prototype.mining = o('eth_mining')),
                  (s.prototype.hashrate = o('eth_hashrate')),
                  (s.prototype.gasPrice = o('eth_gasPrice')),
                  (s.prototype.accounts = o('eth_accounts')),
                  (s.prototype.blockNumber = o('eth_blockNumber')),
                  (s.prototype.getBlockTransactionCountByHash = o(
                    'eth_getBlockTransactionCountByHash'
                  )),
                  (s.prototype.getBlockTransactionCountByNumber = o(
                    'eth_getBlockTransactionCountByNumber'
                  )),
                  (s.prototype.getUncleCountByBlockHash = o('eth_getUncleCountByBlockHash')),
                  (s.prototype.getUncleCountByBlockNumber = o('eth_getUncleCountByBlockNumber')),
                  (s.prototype.sign = o('eth_sign')),
                  (s.prototype.sendTransaction = o('eth_sendTransaction')),
                  (s.prototype.sendRawTransaction = o('eth_sendRawTransaction')),
                  (s.prototype.estimateGas = o('eth_estimateGas')),
                  (s.prototype.getBlockByHash = o('eth_getBlockByHash')),
                  (s.prototype.getBlockByNumber = o('eth_getBlockByNumber')),
                  (s.prototype.getTransactionByHash = o('eth_getTransactionByHash')),
                  (s.prototype.getTransactionByBlockHashAndIndex = o(
                    'eth_getTransactionByBlockHashAndIndex'
                  )),
                  (s.prototype.getTransactionByBlockNumberAndIndex = o(
                    'eth_getTransactionByBlockNumberAndIndex'
                  )),
                  (s.prototype.getTransactionReceipt = o('eth_getTransactionReceipt')),
                  (s.prototype.getUncleByBlockHashAndIndex = o('eth_getUncleByBlockHashAndIndex')),
                  (s.prototype.getUncleByBlockNumberAndIndex = o(
                    'eth_getUncleByBlockNumberAndIndex'
                  )),
                  (s.prototype.getCompilers = o('eth_getCompilers')),
                  (s.prototype.compileLLL = o('eth_compileLLL')),
                  (s.prototype.compileSolidity = o('eth_compileSolidity')),
                  (s.prototype.compileSerpent = o('eth_compileSerpent')),
                  (s.prototype.newFilter = o('eth_newFilter')),
                  (s.prototype.newBlockFilter = o('eth_newBlockFilter')),
                  (s.prototype.newPendingTransactionFilter = o('eth_newPendingTransactionFilter')),
                  (s.prototype.uninstallFilter = o('eth_uninstallFilter')),
                  (s.prototype.getFilterChanges = o('eth_getFilterChanges')),
                  (s.prototype.getFilterLogs = o('eth_getFilterLogs')),
                  (s.prototype.getLogs = o('eth_getLogs')),
                  (s.prototype.getWork = o('eth_getWork')),
                  (s.prototype.submitWork = o('eth_submitWork')),
                  (s.prototype.submitHashrate = o('eth_submitHashrate')),
                  (s.prototype.sendAsync = function (e, t) {
                    var r;
                    this.currentProvider.sendAsync(
                      ((r = e), i({ id: n(), jsonrpc: '2.0', params: [] }, r)),
                      function (e, r) {
                        let n = e;
                        return (
                          !e &&
                            r.error &&
                            (n = new Error(`EthQuery - RPC Error - ${r.error.message}`)),
                          n ? t(n) : t(null, r.result)
                        );
                      }
                    );
                  });
              };
            };
      },
      {
        package: '@metamask/controller-utils>@metamask/eth-query',
        file: 'node_modules/@metamask/eth-query/index.js',
      },
    ],
    [
      1726,
      { './utils': 1730, '@scure/base': 1768, buffer: 4139, tweetnacl: 5686 },
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
                              var i = Object.getOwnPropertyDescriptor(t, r);
                              (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                                (i = {
                                  enumerable: !0,
                                  get: function () {
                                    return t[r];
                                  },
                                }),
                                Object.defineProperty(e, n, i);
                            }
                          : function (e, t, r, n) {
                              n === undefined && (n = r), (e[n] = t[r]);
                            }),
                      i =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                          ? function (e, t) {
                              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                            }
                          : function (e, t) {
                              e.default = t;
                            }),
                      s =
                        (this && this.__importStar) ||
                        function (e) {
                          if (e && e.__esModule) return e;
                          var t = {};
                          if (null != e)
                            for (var r in e)
                              'default' !== r &&
                                Object.prototype.hasOwnProperty.call(e, r) &&
                                n(t, e, r);
                          return i(t, e), t;
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.getEncryptionPublicKey =
                        r.decryptSafely =
                        r.decrypt =
                        r.encryptSafely =
                        r.encrypt =
                          void 0);
                    const o = e('@scure/base'),
                      a = s(e('tweetnacl')),
                      u = e('./utils');
                    function c({ publicKey: e, data: t, version: r }) {
                      if ((0, u.isNullish)(e)) throw new Error('Missing publicKey parameter');
                      if ((0, u.isNullish)(t)) throw new Error('Missing data parameter');
                      if ((0, u.isNullish)(r)) throw new Error('Missing version parameter');
                      if ('x25519-xsalsa20-poly1305' === r) {
                        if ('string' != typeof t)
                          throw new Error('Message data must be given as a string');
                        const r = a.box.keyPair();
                        let n;
                        try {
                          n = o.base64.decode(e);
                        } catch (e) {
                          throw new Error('Bad public key');
                        }
                        const i = o.utf8.decode(t),
                          s = a.randomBytes(a.box.nonceLength),
                          u = a.box(i, s, n, r.secretKey);
                        return {
                          version: 'x25519-xsalsa20-poly1305',
                          nonce: o.base64.encode(s),
                          ephemPublicKey: o.base64.encode(r.publicKey),
                          ciphertext: o.base64.encode(u),
                        };
                      }
                      throw new Error('Encryption type/version not supported');
                    }
                    function f({ encryptedData: e, privateKey: r }) {
                      if ((0, u.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                      if ((0, u.isNullish)(r)) throw new Error('Missing privateKey parameter');
                      if ('x25519-xsalsa20-poly1305' === e.version) {
                        const n = t.from(r, 'hex'),
                          i = a.box.keyPair.fromSecretKey(n).secretKey,
                          s = o.base64.decode(e.nonce),
                          u = o.base64.decode(e.ciphertext),
                          c = o.base64.decode(e.ephemPublicKey),
                          f = a.box.open(u, s, c, i);
                        try {
                          if (!f) throw new Error();
                          const e = o.utf8.encode(f);
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
                    (r.encrypt = c),
                      (r.encryptSafely = function ({ publicKey: e, data: r, version: n }) {
                        if ((0, u.isNullish)(e)) throw new Error('Missing publicKey parameter');
                        if ((0, u.isNullish)(r)) throw new Error('Missing data parameter');
                        if ((0, u.isNullish)(n)) throw new Error('Missing version parameter');
                        if ('object' == typeof r && r && 'toJSON' in r)
                          throw new Error(
                            'Cannot encrypt with toJSON property.  Please remove toJSON property'
                          );
                        const i = { data: r, padding: '' },
                          s = t.byteLength(JSON.stringify(i), 'utf-8') % 2048;
                        let o = 0;
                        return (
                          s > 0 && (o = 2048 - s - 16),
                          (i.padding = '0'.repeat(o)),
                          c({ publicKey: e, data: JSON.stringify(i), version: n })
                        );
                      }),
                      (r.decrypt = f),
                      (r.decryptSafely = function ({ encryptedData: e, privateKey: t }) {
                        if ((0, u.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                        if ((0, u.isNullish)(t)) throw new Error('Missing privateKey parameter');
                        return JSON.parse(f({ encryptedData: e, privateKey: t })).data;
                      }),
                      (r.getEncryptionPublicKey = function (e) {
                        const r = t.from(e, 'hex'),
                          n = a.box.keyPair.fromSecretKey(r).publicKey;
                        return o.base64.encode(n);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-sig-util/dist/encryption.js',
      },
    ],
    [
      1727,
      { './encryption': 1726, './personal-sign': 1728, './sign-typed-data': 1729, './utils': 1730 },
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.normalize = r.concatSig = void 0),
                  i(e('./personal-sign'), r),
                  i(e('./sign-typed-data'), r),
                  i(e('./encryption'), r);
                var s = e('./utils');
                Object.defineProperty(r, 'concatSig', {
                  enumerable: !0,
                  get: function () {
                    return s.concatSig;
                  },
                }),
                  Object.defineProperty(r, 'normalize', {
                    enumerable: !0,
                    get: function () {
                      return s.normalize;
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-sig-util/dist/index.js',
      },
    ],
    [
      1728,
      { './utils': 1730, '@ethereumjs/util': 1738 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.extractPublicKey = r.recoverPersonalSignature = r.personalSign = void 0);
                const n = e('@ethereumjs/util'),
                  i = e('./utils');
                function s(e, t) {
                  const r = (0, n.hashPersonalMessage)((0, i.legacyToBuffer)(e));
                  return (0, i.recoverPublicKey)(r, t);
                }
                (r.personalSign = function ({ privateKey: e, data: t }) {
                  if ((0, i.isNullish)(t)) throw new Error('Missing data parameter');
                  if ((0, i.isNullish)(e)) throw new Error('Missing privateKey parameter');
                  const r = (0, i.legacyToBuffer)(t),
                    s = (0, n.hashPersonalMessage)(r),
                    o = (0, n.ecsign)(s, e);
                  return (0, i.concatSig)((0, n.toBuffer)(o.v), o.r, o.s);
                }),
                  (r.recoverPersonalSignature = function ({ data: e, signature: t }) {
                    if ((0, i.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, i.isNullish)(t)) throw new Error('Missing signature parameter');
                    const r = s(e, t),
                      o = (0, n.publicToAddress)(r);
                    return (0, n.bufferToHex)(o);
                  }),
                  (r.extractPublicKey = function ({ data: e, signature: t }) {
                    if ((0, i.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, i.isNullish)(t)) throw new Error('Missing signature parameter');
                    return `0x${s(e, t).toString('hex')}`;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-sig-util/dist/personal-sign.js',
      },
    ],
    [
      1729,
      {
        './utils': 1730,
        '@ethereumjs/util': 1738,
        '@metamask/abi-utils': 1274,
        '@metamask/abi-utils/dist/parsers': 1283,
        '@metamask/abi-utils/dist/utils': 1291,
        '@metamask/utils': 1756,
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
                  i = e('@metamask/abi-utils'),
                  s = e('@metamask/abi-utils/dist/parsers'),
                  o = e('@metamask/abi-utils/dist/utils'),
                  a = e('@metamask/utils'),
                  u = e('ethereum-cryptography/keccak'),
                  c = e('./utils');
                var f;
                function l(e, t) {
                  if (!Object.keys(f).includes(e)) throw new Error(`Invalid version: '${e}'`);
                  if (t && !t.includes(e))
                    throw new Error(
                      `SignTypedDataVersion not allowed: '${e}'. Allowed versions are: ${t.join(', ')}`
                    );
                }
                function d(e, t) {
                  (0, a.assert)(
                    null !== t,
                    `Unable to encode value: Invalid number. Expected a valid number value, but received "${t}".`
                  );
                  const r = BigInt(t),
                    n = (0, s.getLength)(e),
                    i = BigInt(2) ** BigInt(n) - BigInt(1);
                  return (
                    (0, a.assert)(
                      r >= -i && r <= i,
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
                  return (0, o.padStart)((0, a.bigIntToBytes)(t), 20);
                }
                function p(e, t, r, s, c) {
                  if ((l(c, [f.V3, f.V4]), e[r] !== undefined))
                    return [
                      'bytes32',
                      c === f.V4 && null == s
                        ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                        : (0, n.arrToBufArr)((0, u.keccak256)(m(r, s, e, c))),
                    ];
                  if ('function' === r) throw new Error('Unsupported or invalid type: "function"');
                  if (s === undefined) throw new Error(`missing value for field ${t} of type ${r}`);
                  if ('address' === r) {
                    if ('number' == typeof s)
                      return ['address', (0, o.padStart)((0, a.numberToBytes)(s), 20)];
                    if ((0, a.isStrictHexString)(s)) return ['address', (0, a.add0x)(s)];
                    if ('string' == typeof s) return ['address', h(s).subarray(0, 20)];
                  }
                  if ('bool' === r) return ['bool', Boolean(s)];
                  if ('bytes' === r)
                    return (
                      'number' == typeof s
                        ? (s = (0, a.numberToBytes)(s))
                        : (0, a.isStrictHexString)(s) || '0x' === s
                          ? (s = (0, a.hexToBytes)(s))
                          : 'string' == typeof s && (s = (0, a.stringToBytes)(s)),
                      ['bytes32', (0, n.arrToBufArr)((0, u.keccak256)(s))]
                    );
                  if (r.startsWith('bytes') && 'bytes' !== r && !r.includes('['))
                    return 'number' == typeof s
                      ? s < 0
                        ? ['bytes32', new Uint8Array(32)]
                        : ['bytes32', (0, a.bigIntToBytes)(BigInt(s))]
                      : (0, a.isStrictHexString)(s)
                        ? ['bytes32', (0, a.hexToBytes)(s)]
                        : ['bytes32', s];
                  if (r.startsWith('int') && !r.includes('[')) {
                    const e = d(r, s);
                    return e >= BigInt(0) ? ['uint256', e] : ['int256', e];
                  }
                  if ('string' === r)
                    return (
                      (s =
                        'number' == typeof s
                          ? (0, a.numberToBytes)(s)
                          : (0, a.stringToBytes)(null != s ? s : '')),
                      ['bytes32', (0, n.arrToBufArr)((0, u.keccak256)(s))]
                    );
                  if (r.endsWith(']')) {
                    if (c === f.V3)
                      throw new Error('Arrays are unimplemented in encodeData; use V4 extension');
                    const o = r.slice(0, r.lastIndexOf('[')),
                      a = s.map(r => p(e, t, o, r, c));
                    return [
                      'bytes32',
                      (0, n.arrToBufArr)(
                        (0, u.keccak256)(
                          (0, i.encode)(
                            a.map(([e]) => e),
                            a.map(([, e]) => e)
                          )
                        )
                      ),
                    ];
                  }
                  return [r, s];
                }
                function m(e, t, r, s) {
                  l(s, [f.V3, f.V4]);
                  const o = ['bytes32'],
                    a = [w(e, r)];
                  for (const n of r[e]) {
                    if (s === f.V3 && t[n.name] === undefined) continue;
                    const [e, i] = p(r, n.name, n.type, t[n.name], s);
                    o.push(e), a.push(i);
                  }
                  return (0, n.arrToBufArr)((0, i.encode)(o, a));
                }
                function g(e, t) {
                  let r = '';
                  const n = y(e, t);
                  n.delete(e);
                  const i = [e, ...Array.from(n).sort()];
                  for (const e of i) {
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
                function b(e, t, r, i) {
                  l(i, [f.V3, f.V4]);
                  const s = m(e, t, r, i),
                    o = (0, u.keccak256)(s);
                  return (0, n.arrToBufArr)(o);
                }
                function w(e, t) {
                  const r = (0, a.stringToBytes)(g(e, t));
                  return (0, n.arrToBufArr)((0, u.keccak256)(r));
                }
                function k(e) {
                  const t = {};
                  for (const n in r.TYPED_MESSAGE_SCHEMA.properties) e[n] && (t[n] = e[n]);
                  return (
                    'types' in t && (t.types = Object.assign({ EIP712Domain: [] }, t.types)), t
                  );
                }
                function v(e, t) {
                  l(t, [f.V3, f.V4]);
                  const r = k(e),
                    { domain: n } = r;
                  return b('EIP712Domain', n, { EIP712Domain: r.types.EIP712Domain }, t);
                }
                function E(e, t) {
                  if ((0, s.isArrayType)(e) && Array.isArray(t)) {
                    const [r] = (0, s.getArrayType)(e);
                    return t.map(e => E(r, e));
                  }
                  if ('address' === e) {
                    if ('number' == typeof t) return (0, o.padStart)((0, a.numberToBytes)(t), 20);
                    if ((0, a.isStrictHexString)(t))
                      return (0, o.padStart)((0, a.hexToBytes)(t).subarray(0, 20), 20);
                    if (t instanceof Uint8Array) return (0, o.padStart)(t.subarray(0, 20), 20);
                  }
                  if ('bool' === e) return Boolean(t);
                  if (e.startsWith('bytes') && 'bytes' !== e) {
                    const r = (0, s.getByteLength)(e);
                    if ('number' == typeof t)
                      return t < 0 ? new Uint8Array() : (0, a.numberToBytes)(t).subarray(0, r);
                    if ((0, a.isStrictHexString)(t)) return (0, a.hexToBytes)(t).subarray(0, r);
                    if (t instanceof Uint8Array) return t.subarray(0, r);
                  }
                  if (e.startsWith('uint') && 'number' == typeof t) return Math.abs(t);
                  if (e.startsWith('int') && 'number' == typeof t) {
                    const r = (0, s.getLength)(e);
                    return BigInt.asIntN(r, BigInt(t));
                  }
                  return t;
                }
                function T(e, t) {
                  return t.map(t => {
                    if ('string' == typeof t || 'number' == typeof t || 'bigint' == typeof t) {
                      const r = d(e, t);
                      if (r >= BigInt(0)) return (0, o.padStart)((0, a.bigIntToBytes)(r), 32);
                      const n = (0, s.getLength)(e),
                        i = BigInt.asIntN(n, r);
                      return (0, a.signedBigIntToBytes)(i, 32);
                    }
                    return t;
                  });
                }
                function x(e) {
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
                                ? (0, o.padStart)((0, a.numberToBytes)(e), 32)
                                : (0, a.isStrictHexString)(e)
                                  ? (0, o.padStart)((0, a.hexToBytes)(e).subarray(0, 32), 32)
                                  : e instanceof Uint8Array
                                    ? (0, o.padStart)(e.subarray(0, 32), 32)
                                    : e
                            )),
                        };
                      var n;
                      if (t.startsWith('int') && (0, s.isArrayType)(t)) {
                        const [n, i] = (0, s.getArrayType)(t);
                        return { name: e, type: `bytes32[${null != i ? i : ''}]`, value: T(n, r) };
                      }
                      return { name: e, type: t, value: E(t, r) };
                    }),
                    f = r.map(e => ('bytes' !== e.type ? e.value : (0, c.legacyToBuffer)(e.value))),
                    l = r.map(e => {
                      if ('function' === e.type)
                        throw new Error('Unsupported or invalid type: "function"');
                      return e.type;
                    }),
                    d = e.map(e => {
                      if (!e.name) throw t;
                      return `${e.type} ${e.name}`;
                    });
                  return (0, n.arrToBufArr)(
                    (0, u.keccak256)(
                      (0, i.encodePacked)(
                        ['bytes32', 'bytes32'],
                        [
                          (0, u.keccak256)((0, i.encodePacked)(['string[]'], [d], !0)),
                          (0, u.keccak256)((0, i.encodePacked)(l, f, !0)),
                        ]
                      )
                    )
                  );
                }
                !(function (e) {
                  (e.V1 = 'V1'), (e.V3 = 'V3'), (e.V4 = 'V4');
                })((f = r.SignTypedDataVersion || (r.SignTypedDataVersion = {}))),
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
                    sanitizeData: k,
                    eip712Hash: function (e, t) {
                      l(t, [f.V3, f.V4]);
                      const r = k(e),
                        i = [(0, a.hexToBytes)('1901')];
                      return (
                        i.push(v(e, t)),
                        'EIP712Domain' !== r.primaryType &&
                          i.push(b(r.primaryType, r.message, r.types, t)),
                        (0, n.arrToBufArr)((0, u.keccak256)((0, a.concatBytes)(i)))
                      );
                    },
                    eip712DomainHash: v,
                  }),
                  (r.typedSignatureHash = function (e) {
                    const t = x(e);
                    return (0, a.bytesToHex)(t);
                  }),
                  (r.signTypedData = function ({ privateKey: e, data: t, version: i }) {
                    if ((l(i), (0, c.isNullish)(t))) throw new Error('Missing data parameter');
                    if ((0, c.isNullish)(e)) throw new Error('Missing private key parameter');
                    const s = i === f.V1 ? x(t) : r.TypedDataUtils.eip712Hash(t, i),
                      o = (0, n.ecsign)(s, e);
                    return (0, c.concatSig)(
                      (0, n.arrToBufArr)((0, a.bigIntToBytes)(o.v)),
                      o.r,
                      o.s
                    );
                  }),
                  (r.recoverTypedSignature = function ({ data: e, signature: t, version: i }) {
                    if ((l(i), (0, c.isNullish)(e))) throw new Error('Missing data parameter');
                    if ((0, c.isNullish)(t)) throw new Error('Missing signature parameter');
                    const s = i === f.V1 ? x(e) : r.TypedDataUtils.eip712Hash(e, i),
                      o = (0, c.recoverPublicKey)(s, t),
                      u = (0, n.publicToAddress)(o);
                    return (0, a.bytesToHex)(u);
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-sig-util/dist/sign-typed-data.js',
      },
    ],
    [
      173,
      {
        '../../../shared/modules/object.utils': 5869,
        '../constants/sentry-state': 8,
        '../platforms/extension': 383,
        './stores/extension-store': 186,
        './stores/persistence-manager': 187,
        './stores/read-only-network-store': 188,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('../../../shared/modules/object.utils'),
                  i = u(e('../platforms/extension')),
                  s = e('../constants/sentry-state'),
                  o = (u(e('./stores/read-only-network-store')), u(e('./stores/extension-store'))),
                  a = e('./stores/persistence-manager');
                function u(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                const c = new i.default(),
                  f = new a.PersistenceManager({ localStore: new o.default() });
                globalThis.stateHooks.getPersistedState = async function () {
                  return await f.get();
                };
                const l = { data: s.SENTRY_BACKGROUND_STATE, meta: { version: !0 } };
                globalThis.stateHooks.getSentryState = function () {
                  const e = { browser: window.navigator.userAgent, version: c.getVersion() };
                  if (globalThis.stateHooks.getSentryAppState)
                    return (
                      f.cleanUpMostRecentRetrievedState(),
                      { ...e, state: globalThis.stateHooks.getSentryAppState() }
                    );
                  if (
                    f.mostRecentRetrievedState ||
                    globalThis.stateHooks.getMostRecentPersistedState
                  ) {
                    const t =
                      f.mostRecentRetrievedState ||
                      globalThis.stateHooks.getMostRecentPersistedState();
                    if (t) return { ...e, persistedState: (0, n.maskObject)(t, l) };
                  }
                  return e;
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/setup-initial-state-hooks.js' },
    ],
    [
      1730,
      { '@ethereumjs/util': 1738, '@metamask/utils': 1756, buffer: 4139 },
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
                      i = e('@metamask/utils');
                    function s(e, t) {
                      if ('' !== e && !/^[a-f0-9]+$/iu.test(e))
                        throw new Error(`Expected an unprefixed hex string. Received: ${e}`);
                      if (t < 0)
                        throw new Error(
                          `Expected a non-negative integer target length. Received: ${t}`
                        );
                      return String.prototype.padStart.call(e, t, '0');
                    }
                    function o(e) {
                      return null === e || e === undefined;
                    }
                    (r.padWithZeroes = s),
                      (r.isNullish = o),
                      (r.legacyToBuffer = function (e) {
                        return 'string' != typeof e || (0, n.isHexString)(e)
                          ? (0, n.toBuffer)(e)
                          : t.from(e);
                      }),
                      (r.concatSig = function (e, t, r) {
                        const o = (0, n.fromSigned)(t),
                          a = (0, n.fromSigned)(r),
                          u = (0, n.bufferToInt)(e),
                          c = s((0, n.toUnsigned)(o).toString('hex'), 64),
                          f = s((0, n.toUnsigned)(a).toString('hex'), 64),
                          l = (0, i.remove0x)((0, i.numberToHex)(u));
                        return (0, i.add0x)(c.concat(f, l));
                      }),
                      (r.recoverPublicKey = function (e, t) {
                        const r = (0, n.fromRpcSig)(t);
                        return (0, n.ecrecover)(e, r.v, r.r, r.s);
                      }),
                      (r.normalize = function (e) {
                        if (o(e)) return undefined;
                        if ('number' == typeof e) {
                          if (e < 0) return '0x';
                          const t = (0, i.numberToBytes)(e);
                          e = (0, i.bytesToHex)(t);
                        }
                        if ('string' != typeof e) {
                          let t = 'eth-sig-util.normalize() requires hex string or integer input.';
                          throw ((t += ` received ${typeof e}: ${e}`), new Error(t));
                        }
                        return (0, i.add0x)(e.toLowerCase());
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-sig-util/dist/utils.js',
      },
    ],
    [
      1731,
      {
        './bytes': 1734,
        './constants': 1735,
        './helpers': 1737,
        './internal': 1739,
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
                      i = e('ethereum-cryptography/keccak'),
                      s = e('ethereum-cryptography/secp256k1'),
                      o = e('ethereum-cryptography/utils'),
                      a = e('./bytes'),
                      u = e('./constants'),
                      c = e('./helpers'),
                      f = e('./internal'),
                      l = BigInt(0);
                    class d {
                      constructor(e = l, t = l, r = u.KECCAK256_RLP, n = u.KECCAK256_NULL) {
                        (this.nonce = e),
                          (this.balance = t),
                          (this.storageRoot = r),
                          (this.codeHash = n),
                          this._validate();
                      }
                      static fromAccountData(e) {
                        const { nonce: t, balance: r, storageRoot: n, codeHash: i } = e;
                        return new d(
                          t !== undefined ? (0, a.bufferToBigInt)((0, a.toBuffer)(t)) : undefined,
                          r !== undefined ? (0, a.bufferToBigInt)((0, a.toBuffer)(r)) : undefined,
                          n !== undefined ? (0, a.toBuffer)(n) : undefined,
                          i !== undefined ? (0, a.toBuffer)(i) : undefined
                        );
                      }
                      static fromRlpSerializedAccount(e) {
                        const t = (0, a.arrToBufArr)(n.RLP.decode(Uint8Array.from(e)));
                        if (!Array.isArray(t))
                          throw new Error('Invalid serialized account input. Must be array');
                        return this.fromValuesArray(t);
                      }
                      static fromValuesArray(e) {
                        const [t, r, n, i] = e;
                        return new d((0, a.bufferToBigInt)(t), (0, a.bufferToBigInt)(r), n, i);
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
                          (0, a.bigIntToUnpaddedBuffer)(this.nonce),
                          (0, a.bigIntToUnpaddedBuffer)(this.balance),
                          this.storageRoot,
                          this.codeHash,
                        ];
                      }
                      serialize() {
                        return t.from(n.RLP.encode((0, a.bufArrToArr)(this.raw())));
                      }
                      isContract() {
                        return !this.codeHash.equals(u.KECCAK256_NULL);
                      }
                      isEmpty() {
                        return (
                          this.balance === l &&
                          this.nonce === l &&
                          this.codeHash.equals(u.KECCAK256_NULL)
                        );
                      }
                    }
                    r.Account = d;
                    r.isValidAddress = function (e) {
                      try {
                        (0, c.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return /^0x[0-9a-fA-F]{40}$/.test(e);
                    };
                    r.toChecksumAddress = function (e, r) {
                      (0, c.assertIsHexString)(e);
                      const n = (0, f.stripHexPrefix)(e).toLowerCase();
                      let s = '';
                      if (r !== undefined) {
                        s = (0, a.bufferToBigInt)((0, a.toBuffer)(r)).toString() + '0x';
                      }
                      const u = t.from(s + n, 'utf8'),
                        l = (0, o.bytesToHex)((0, i.keccak256)(u));
                      let d = '0x';
                      for (let e = 0; e < n.length; e++)
                        parseInt(l[e], 16) >= 8 ? (d += n[e].toUpperCase()) : (d += n[e]);
                      return d;
                    };
                    r.isValidChecksumAddress = function (e, t) {
                      return (0, r.isValidAddress)(e) && (0, r.toChecksumAddress)(e, t) === e;
                    };
                    r.generateAddress = function (e, r) {
                      return (
                        (0, c.assertIsBuffer)(e),
                        (0, c.assertIsBuffer)(r),
                        (0, a.bufferToBigInt)(r) === BigInt(0)
                          ? t
                              .from((0, i.keccak256)(n.RLP.encode((0, a.bufArrToArr)([e, null]))))
                              .slice(-20)
                          : t
                              .from((0, i.keccak256)(n.RLP.encode((0, a.bufArrToArr)([e, r]))))
                              .slice(-20)
                      );
                    };
                    r.generateAddress2 = function (e, r, n) {
                      if (
                        ((0, c.assertIsBuffer)(e),
                        (0, c.assertIsBuffer)(r),
                        (0, c.assertIsBuffer)(n),
                        20 !== e.length)
                      )
                        throw new Error('Expected from to be of length 20');
                      if (32 !== r.length) throw new Error('Expected salt to be of length 32');
                      const s = (0, i.keccak256)(
                        t.concat([t.from('ff', 'hex'), e, r, (0, i.keccak256)(n)])
                      );
                      return (0, a.toBuffer)(s).slice(-20);
                    };
                    r.isValidPrivate = function (e) {
                      return s.secp256k1.utils.isValidPrivateKey(e);
                    };
                    r.isValidPublic = function (e, r = !1) {
                      if (((0, c.assertIsBuffer)(e), 64 === e.length))
                        try {
                          return (
                            s.secp256k1.ProjectivePoint.fromHex(t.concat([t.from([4]), e])), !0
                          );
                        } catch (e) {
                          return !1;
                        }
                      if (!r) return !1;
                      try {
                        return s.secp256k1.ProjectivePoint.fromHex(e), !0;
                      } catch (e) {
                        return !1;
                      }
                    };
                    (r.pubToAddress = function (e, r = !1) {
                      if (
                        ((0, c.assertIsBuffer)(e),
                        r &&
                          64 !== e.length &&
                          (e = t.from(
                            s.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        64 !== e.length)
                      )
                        throw new Error('Expected pubKey to be of length 64');
                      return t.from((0, i.keccak256)(e)).slice(-20);
                    }),
                      (r.publicToAddress = r.pubToAddress);
                    r.privateToPublic = function (e) {
                      return (
                        (0, c.assertIsBuffer)(e),
                        t.from(
                          s.secp256k1.ProjectivePoint.fromPrivateKey(e).toRawBytes(!1).slice(1)
                        )
                      );
                    };
                    r.privateToAddress = function (e) {
                      return (0, r.publicToAddress)((0, r.privateToPublic)(e));
                    };
                    r.importPublic = function (e) {
                      return (
                        (0, c.assertIsBuffer)(e),
                        64 !== e.length &&
                          (e = t.from(
                            s.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        e
                      );
                    };
                    r.zeroAddress = function () {
                      const e = (0, a.zeros)(20);
                      return (0, a.bufferToHex)(e);
                    };
                    function h(e) {
                      const [t, r, n, i] = e;
                      return [
                        t,
                        r,
                        0 === (0, a.arrToBufArr)(n).length ? u.KECCAK256_RLP : n,
                        0 === (0, a.arrToBufArr)(i).length ? u.KECCAK256_NULL : i,
                      ];
                    }
                    (r.isZeroAddress = function (e) {
                      try {
                        (0, c.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return (0, r.zeroAddress)() === e;
                    }),
                      (r.accountBodyFromSlim = h);
                    const p = new Uint8Array(0);
                    (r.accountBodyToSlim = function (e) {
                      const [t, r, n, i] = e;
                      return [
                        t,
                        r,
                        (0, a.arrToBufArr)(n).equals(u.KECCAK256_RLP) ? p : n,
                        (0, a.arrToBufArr)(i).equals(u.KECCAK256_NULL) ? p : i,
                      ];
                    }),
                      (r.accountBodyToRLP = function (e, t = !0) {
                        const r = t ? h(e) : e;
                        return (0, a.arrToBufArr)(n.RLP.encode(r));
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/account.js',
      },
    ],
    [
      1732,
      { './account': 1731, './bytes': 1734, buffer: 4139 },
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
                      i = e('./bytes');
                    class s {
                      constructor(e) {
                        if (20 !== e.length) throw new Error('Invalid address length');
                        this.buf = e;
                      }
                      static zero() {
                        return new s((0, i.zeros)(20));
                      }
                      static fromString(e) {
                        if (!(0, n.isValidAddress)(e)) throw new Error('Invalid address');
                        return new s((0, i.toBuffer)(e));
                      }
                      static fromPublicKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Public key should be Buffer');
                        const r = (0, n.pubToAddress)(e);
                        return new s(r);
                      }
                      static fromPrivateKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Private key should be Buffer');
                        const r = (0, n.privateToAddress)(e);
                        return new s(r);
                      }
                      static generate(e, t) {
                        if ('bigint' != typeof t) throw new Error('Expected nonce to be a bigint');
                        return new s((0, n.generateAddress)(e.buf, (0, i.bigIntToBuffer)(t)));
                      }
                      static generate2(e, r, i) {
                        if (!t.isBuffer(r)) throw new Error('Expected salt to be a Buffer');
                        if (!t.isBuffer(i)) throw new Error('Expected initCode to be a Buffer');
                        return new s((0, n.generateAddress2)(e.buf, r, i));
                      }
                      equals(e) {
                        return this.buf.equals(e.buf);
                      }
                      isZero() {
                        return this.equals(s.zero());
                      }
                      isPrecompileOrSystemAddress() {
                        const e = (0, i.bufferToBigInt)(this.buf),
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
                    r.Address = s;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/address.js',
      },
    ],
    [
      1733,
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
                class i extends n.EventEmitter {
                  emit(e, ...t) {
                    let [r, n] = t;
                    const i = this;
                    let s = i._events[e] ?? [];
                    return (
                      n === undefined && 'function' == typeof r && ((n = r), (r = undefined)),
                      ('newListener' !== e && 'removeListener' !== e) ||
                        ((r = { event: r, fn: n }), (n = undefined)),
                      (s = Array.isArray(s) ? s : [s]),
                      (async function (e, t, r) {
                        let n;
                        for await (const i of t)
                          try {
                            i.length < 2
                              ? i.call(e, r)
                              : await new Promise((t, n) => {
                                  i.call(e, r, e => {
                                    e ? n(e) : t();
                                  });
                                });
                          } catch (e) {
                            n = e;
                          }
                        if (n) throw n;
                      })(i, s.slice(), r)
                        .then(n)
                        .catch(n),
                      i.listenerCount(e) > 0
                    );
                  }
                  once(e, t) {
                    const r = this;
                    let n;
                    if ('function' != typeof t) throw new TypeError('listener must be a function');
                    return (
                      (n =
                        t.length >= 2
                          ? function (i, s) {
                              r.removeListener(e, n), t(i, s);
                            }
                          : function (i) {
                              r.removeListener(e, n), t(i, n);
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
                    let i,
                      s,
                      o = this._events[e] ?? [];
                    const a = 'after' === n ? 1 : 0;
                    if ('function' != typeof r) throw new TypeError('listener must be a function');
                    if ('function' != typeof t) throw new TypeError('target must be a function');
                    for (
                      Array.isArray(o) || (this._events[e] = o = [o]), s = o.length, i = o.length;
                      i--;

                    )
                      if (o[i] === t) {
                        s = i + a;
                        break;
                      }
                    return o.splice(s, 0, r), this;
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
                r.AsyncEventEmitter = i;
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/asyncEventEmitter.js',
      },
    ],
    [
      1734,
      { './helpers': 1737, './internal': 1739, buffer: 4139 },
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
                      i = e('./internal');
                    r.intToHex = function (e) {
                      if (!Number.isSafeInteger(e) || e < 0)
                        throw new Error(`Received an invalid integer type: ${e}`);
                      return `0x${e.toString(16)}`;
                    };
                    r.intToBuffer = function (e) {
                      const n = (0, r.intToHex)(e);
                      return t.from((0, i.padToEven)(n.slice(2)), 'hex');
                    };
                    r.zeros = function (e) {
                      return t.allocUnsafe(e).fill(0);
                    };
                    const s = function (e, t, n) {
                      const i = (0, r.zeros)(t);
                      return n
                        ? e.length < t
                          ? (e.copy(i), i)
                          : e.slice(0, t)
                        : e.length < t
                          ? (e.copy(i, t - e.length), i)
                          : e.slice(-t);
                    };
                    r.setLengthLeft = function (e, t) {
                      return (0, n.assertIsBuffer)(e), s(e, t, !1);
                    };
                    r.setLengthRight = function (e, t) {
                      return (0, n.assertIsBuffer)(e), s(e, t, !0);
                    };
                    const o = function (e) {
                      let t = e[0];
                      for (; e.length > 0 && '0' === t.toString(); ) t = (e = e.slice(1))[0];
                      return e;
                    };
                    r.unpadBuffer = function (e) {
                      return (0, n.assertIsBuffer)(e), o(e);
                    };
                    r.unpadArray = function (e) {
                      return (0, n.assertIsArray)(e), o(e);
                    };
                    r.unpadHexString = function (e) {
                      return (
                        (0, n.assertIsHexString)(e), (e = (0, i.stripHexPrefix)(e)), '0x' + o(e)
                      );
                    };
                    r.toBuffer = function (e) {
                      if (null === e || e === undefined) return t.allocUnsafe(0);
                      if (t.isBuffer(e)) return t.from(e);
                      if (Array.isArray(e) || e instanceof Uint8Array) return t.from(e);
                      if ('string' == typeof e) {
                        if (!(0, i.isHexString)(e))
                          throw new Error(
                            `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${e}`
                          );
                        return t.from((0, i.padToEven)((0, i.stripHexPrefix)(e)), 'hex');
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
                    function a(e) {
                      const t = (0, r.bufferToHex)(e);
                      return '0x' === t ? BigInt(0) : BigInt(t);
                    }
                    function u(e) {
                      return (0, r.toBuffer)('0x' + e.toString(16));
                    }
                    (r.bufferToHex = function (e) {
                      return '0x' + (e = (0, r.toBuffer)(e)).toString('hex');
                    }),
                      (r.bufferToBigInt = a),
                      (r.bigIntToBuffer = u);
                    r.bufferToInt = function (e) {
                      const t = Number(a(e));
                      if (!Number.isSafeInteger(t)) throw new Error('Number exceeds 53 bits');
                      return t;
                    };
                    r.fromSigned = function (e) {
                      return BigInt.asIntN(256, a(e));
                    };
                    r.toUnsigned = function (e) {
                      return u(BigInt.asUintN(256, e));
                    };
                    (r.addHexPrefix = function (e) {
                      return 'string' != typeof e || (0, i.isHexPrefixed)(e) ? e : '0x' + e;
                    }),
                      (r.short = function (e, r = 50) {
                        const n = t.isBuffer(e) ? e.toString('hex') : e;
                        return n.length <= r ? n : n.slice(0, r) + '…';
                      });
                    r.toUtf8 = function (e) {
                      if ((e = (0, i.stripHexPrefix)(e)).length % 2 != 0)
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
                        return (0, r.unpadBuffer)(u(e));
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/bytes.js',
      },
    ],
    [
      1735,
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
                  i = e('ethereum-cryptography/secp256k1');
                (r.MAX_UINT64 = BigInt('0xffffffffffffffff')),
                  (r.MAX_INTEGER = BigInt(
                    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                  )),
                  (r.MAX_INTEGER_BIGINT = BigInt(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                  )),
                  (r.SECP256K1_ORDER = i.secp256k1.CURVE.n),
                  (r.SECP256K1_ORDER_DIV_2 = i.secp256k1.CURVE.n / BigInt(2)),
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/constants.js',
      },
    ],
    [
      1736,
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/encoding.js',
      },
    ],
    [
      1737,
      { '../../../../../../is-buffer/index.js': 4723, './internal': 1739 },
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/helpers.js',
      },
    ],
    [
      1738,
      {
        './account': 1731,
        './address': 1732,
        './asyncEventEmitter': 1733,
        './bytes': 1734,
        './constants': 1735,
        './encoding': 1736,
        './internal': 1739,
        './lock': 1740,
        './provider': 1741,
        './signature': 1742,
        './types': 1743,
        './units': 1744,
        './withdrawal': 1745,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
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
                  i(e('./constants'), r),
                  i(e('./units'), r),
                  i(e('./account'), r),
                  i(e('./address'), r),
                  i(e('./withdrawal'), r),
                  i(e('./signature'), r),
                  i(e('./bytes'), r),
                  i(e('./types'), r),
                  i(e('./encoding'), r),
                  i(e('./asyncEventEmitter'), r);
                var s = e('./internal');
                Object.defineProperty(r, 'arrayContainsArray', {
                  enumerable: !0,
                  get: function () {
                    return s.arrayContainsArray;
                  },
                }),
                  Object.defineProperty(r, 'fromAscii', {
                    enumerable: !0,
                    get: function () {
                      return s.fromAscii;
                    },
                  }),
                  Object.defineProperty(r, 'fromUtf8', {
                    enumerable: !0,
                    get: function () {
                      return s.fromUtf8;
                    },
                  }),
                  Object.defineProperty(r, 'getBinarySize', {
                    enumerable: !0,
                    get: function () {
                      return s.getBinarySize;
                    },
                  }),
                  Object.defineProperty(r, 'getKeys', {
                    enumerable: !0,
                    get: function () {
                      return s.getKeys;
                    },
                  }),
                  Object.defineProperty(r, 'isHexPrefixed', {
                    enumerable: !0,
                    get: function () {
                      return s.isHexPrefixed;
                    },
                  }),
                  Object.defineProperty(r, 'isHexString', {
                    enumerable: !0,
                    get: function () {
                      return s.isHexString;
                    },
                  }),
                  Object.defineProperty(r, 'padToEven', {
                    enumerable: !0,
                    get: function () {
                      return s.padToEven;
                    },
                  }),
                  Object.defineProperty(r, 'stripHexPrefix', {
                    enumerable: !0,
                    get: function () {
                      return s.stripHexPrefix;
                    },
                  }),
                  Object.defineProperty(r, 'toAscii', {
                    enumerable: !0,
                    get: function () {
                      return s.toAscii;
                    },
                  }),
                  i(e('./lock'), r),
                  i(e('./provider'), r);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/index.js',
      },
    ],
    [
      1739,
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
                        for (let i = 0; i < e.length; i++) {
                          let s = e[i][t];
                          if (!0 !== r || s) {
                            if ('string' != typeof s)
                              throw new Error(
                                "invalid abi - expected type 'string', received " + typeof s
                              );
                          } else s = '';
                          n.push(s);
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/internal.js',
      },
    ],
    [
      174,
      {
        '../../../shared/lib/manifestFlags': 5837,
        '../../../shared/modules/mv3.utils': 5867,
        './extractEthjsErrorMessage': 135,
        './sentry-filter-events': 172,
        '@metamask/utils': 2995,
        '@sentry/browser': 3136,
        '@sentry/utils': 3256,
        'webextension-polyfill': 5766,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.ERROR_URL_ALLOWLIST = void 0),
                  (r.beforeBreadcrumb = O),
                  (r.default = function () {
                    if (!k) throw new Error('Missing release');
                    if (!I()) return m('Skipped initialization'), undefined;
                    return (
                      m('Initializing'),
                      o.default.management
                        .getSelf()
                        .then(e => {
                          e.installType && (p = e.installType);
                        })
                        .catch(e => {
                          m('Error getting extension installType', e);
                        }),
                      (function () {
                        if (!b) return;
                        for (const e of ['log', 'error'])
                          s.logger[e] = (...t) => {
                            const r = t[0].replace(`Sentry Logger [${e}]: `, '');
                            g(r, ...t.slice(1));
                          };
                        m('Integrated logging');
                      })(),
                      (function () {
                        const e = (function () {
                            const e = (function () {
                                if ('main' === y) return w;
                                return `${w}-${y}`;
                              })(),
                              t = I();
                            return {
                              beforeBreadcrumb: O(),
                              beforeSend: e => N(e),
                              debug: b,
                              dist: a.isManifestV3 ? 'mv3' : 'mv2',
                              dsn: t,
                              environment: e,
                              integrations: [
                                i.dedupeIntegration(),
                                i.extraErrorDataIntegration(),
                                i.browserTracingIntegration({
                                  shouldCreateSpanForRequest: e =>
                                    !e.match(/^https?:\/\/([\w\d.@-]+\.)?sentry\.io(\/|$)/u),
                                }),
                                (0, f.filterEvents)({ getMetaMetricsEnabled: C, log: m }),
                              ],
                              release: k,
                              sendClientReports: !1,
                              tracesSampleRate: A(t),
                              transport: U,
                            };
                          })(),
                          { dsn: t, environment: r, release: n, tracesSampleRate: s } = e;
                        (globalThis.nw = {}),
                          globalThis.history ?? (globalThis.history = {}),
                          m('Updating client', {
                            environment: r,
                            dsn: t,
                            release: n,
                            tracesSampleRate: s,
                          }),
                          i.registerSpanErrorInstrumentation(),
                          i.init(e),
                          (function () {
                            const { circleci: e } = (0, u.getManifestFlags)();
                            null != e &&
                              e.enabled &&
                              (i.setTag('circleci.enabled', e.enabled),
                              i.setTag('circleci.branch', e.branch),
                              i.setTag('circleci.buildNum', e.buildNum),
                              i.setTag('circleci.job', e.job),
                              i.setTag('circleci.nodeIndex', e.nodeIndex),
                              i.setTag('circleci.prNumber', e.prNumber));
                          })(),
                          (function () {
                            if (!b) return;
                            const e = i.getClient();
                            null == e ||
                              e.on('beforeEnvelope', e => {
                                (function (e) {
                                  var t, r;
                                  const n =
                                      null == e ||
                                      null === (t = e[1]) ||
                                      void 0 === t ||
                                      null === (t = t[0]) ||
                                      void 0 === t ||
                                      null === (t = t[0]) ||
                                      void 0 === t
                                        ? void 0
                                        : t.type,
                                    i =
                                      (null == e ||
                                      null === (r = e[1]) ||
                                      void 0 === r ||
                                      null === (r = r[0]) ||
                                      void 0 === r
                                        ? void 0
                                        : r[1]) ?? {};
                                  return 'session' === n && 'exited' === i.status;
                                })(e) && m('Completed session', e);
                              }),
                              null == e ||
                                e.on('afterSendEvent', e => {
                                  const t = (function (e) {
                                    if ('transaction' === e.type) return 'Trace';
                                    if ('error' === e.level) return 'Error';
                                    return 'Event';
                                  })(e);
                                  m(t, e);
                                }),
                              m('Added debug listeners');
                          })();
                      })(),
                      { ...i, getMetaMetricsEnabled: C }
                    );
                  }),
                  (r.log = void 0),
                  (r.removeUrlsFromBreadCrumb = M),
                  (r.rewriteReport = N);
                var n = e('@metamask/utils'),
                  i = (function (e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                      return { default: e };
                    var r = d(t);
                    if (r && r.has(e)) return r.get(e);
                    var n = { __proto__: null },
                      i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                      if ('default' !== s && {}.hasOwnProperty.call(e, s)) {
                        var o = i ? Object.getOwnPropertyDescriptor(e, s) : null;
                        o && (o.get || o.set) ? Object.defineProperty(n, s, o) : (n[s] = e[s]);
                      }
                    return (n.default = e), r && r.set(e, n), n;
                  })(e('@sentry/browser')),
                  s = e('@sentry/utils'),
                  o = l(e('webextension-polyfill')),
                  a = e('../../../shared/modules/mv3.utils'),
                  u = e('../../../shared/lib/manifestFlags'),
                  c = l(e('./extractEthjsErrorMessage')),
                  f = e('./sentry-filter-events');
                function l(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function d(e) {
                  if ('function' != typeof WeakMap) return null;
                  var t = new WeakMap(),
                    r = new WeakMap();
                  return (d = function (e) {
                    return e ? r : t;
                  })(e);
                }
                const h = (0, n.createProjectLogger)('sentry');
                let p = 'unknown';
                const m = (r.log = (0, n.createModuleLogger)(
                    h,
                    globalThis.document ? 'ui' : 'background'
                  )),
                  g = (0, n.createModuleLogger)(m, 'internal'),
                  y = 'flask',
                  b = !1,
                  w = 'production',
                  k = '12.17.2-flask.0',
                  v = 'https://3567c198f8a8412082d32655da2961d0@sentry.io/273505',
                  E = 'https://f59f3dd640d2429d9d0e2445a87ea8e1@sentry.io/273496',
                  T =
                    'https://f69a0a009aed214608a6007d53d0286a@o124216.ingest.us.sentry.io/4506744588730368',
                  x = 'https://fake@sentry.io/0000000',
                  _ = (r.ERROR_URL_ALLOWLIST = {
                    CRYPTOCOMPARE: 'cryptocompare.com',
                    COINGECKO: 'coingecko.com',
                    ETHERSCAN: 'etherscan.io',
                    CODEFI: 'codefi.network',
                    SEGMENT: 'segment.io',
                  });
                function A(e) {
                  var t;
                  if (e === x) return 1;
                  const r = (0, u.getManifestFlags)();
                  return (null === (t = r.sentry) || void 0 === t ? void 0 : t.tracesSampleRate) !==
                    undefined
                    ? r.sentry.tracesSampleRate
                    : r.circleci
                      ? 'main' === r.circleci.branch
                        ? 0.015
                        : 0
                      : b
                        ? 1
                        : 0.0075;
                }
                function S(e) {
                  return e.persistedState
                    ? B(e.persistedState)
                    : !!e.state &&
                        (e.state.metamask
                          ? Boolean(e.state.metamask.participateInMetaMetrics)
                          : Boolean(
                              null === (t = e.state.MetaMetricsController) || void 0 === t
                                ? void 0
                                : t.participateInMetaMetrics
                            ));
                  var t;
                }
                function B(e) {
                  var t;
                  return Boolean(
                    null == e ||
                      null === (t = e.data) ||
                      void 0 === t ||
                      null === (t = t.MetaMetricsController) ||
                      void 0 === t
                      ? void 0
                      : t.participateInMetaMetrics
                  );
                }
                function j(e) {
                  return e.persistedState
                    ? P(e.persistedState)
                    : !!e.state &&
                        (e.state.metamask
                          ? Boolean(e.state.metamask.completedOnboarding)
                          : Boolean(
                              null === (t = e.state.OnboardingController) || void 0 === t
                                ? void 0
                                : t.completedOnboarding
                            ));
                  var t;
                }
                function P(e) {
                  var t;
                  return Boolean(
                    null === (t = e.data) ||
                      void 0 === t ||
                      null === (t = t.OnboardingController) ||
                      void 0 === t
                      ? void 0
                      : t.completedOnboarding
                  );
                }
                function I() {
                  if ('production' !== w) return E;
                  if ('mmi' === y) return T;
                  if (!v)
                    throw new Error(
                      'Missing SENTRY_DSN environment variable in production environment'
                    );
                  return v;
                }
                async function C() {
                  const e = (0, u.getManifestFlags)();
                  if ('mmi' === y || (e.circleci && e.sentry.forceEnable)) return !0;
                  const t = H();
                  if (t.state || t.persistedState) return S(t) && j(t);
                  try {
                    const e = await globalThis.stateHooks.getPersistedState();
                    return B(e) && P(e);
                  } catch (e) {
                    return m('Error retrieving persisted state', e), !1;
                  }
                }
                function R(e) {
                  return e.match(/^(chrome-extension|moz-extension):\/\//u) ? e : '';
                }
                function O() {
                  return e => {
                    if (!H) return null;
                    const t = H();
                    if (!S(t) || !j(t) || 'ui.input' === (null == e ? void 0 : e.category))
                      return null;
                    return M(e);
                  };
                }
                function M(e) {
                  var t, r, n;
                  return (
                    null != e &&
                      null !== (t = e.data) &&
                      void 0 !== t &&
                      t.url &&
                      (e.data.url = R(e.data.url)),
                    null != e &&
                      null !== (r = e.data) &&
                      void 0 !== r &&
                      r.to &&
                      (e.data.to = R(e.data.to)),
                    null != e &&
                      null !== (n = e.data) &&
                      void 0 !== n &&
                      n.from &&
                      (e.data.from = R(e.data.from)),
                    e
                  );
                }
                function N(e) {
                  try {
                    var t;
                    !(function (e) {
                      L(e, e => {
                        let t = (0, c.default)(e);
                        return (
                          0 === t.indexOf('Transaction Failed: known transaction') &&
                            (t = 'Transaction Failed: known transaction'),
                          t
                        );
                      });
                    })(e),
                      (function (e) {
                        L(e, e => {
                          let t = e;
                          const r = /(([-.+a-zA-Z]+:\/\/)|(www\.))\S+[@:.]\S+/gu;
                          return (
                            (t.match(r) || []).forEach(e => {
                              try {
                                const r = new URL(e),
                                  { hostname: n } = r;
                                Object.values(_).some(e => n === e || n.endsWith(`.${e}`)) ||
                                  (t = t.replace(e, '**'));
                              } catch (r) {
                                t = t.replace(e, '**');
                              }
                            }),
                            t
                          );
                        });
                      })(e),
                      (function (e) {
                        L(e, e => e.replace(/0x[A-Fa-f0-9]{40}/u, '0x**'));
                      })(e),
                      (function (e) {
                        var t;
                        null !== (t = e.request) &&
                          void 0 !== t &&
                          t.url &&
                          (e.request.url = $(e.request.url));
                        e.exception &&
                          e.exception.values &&
                          e.exception.values.forEach(e => {
                            e.stacktrace &&
                              e.stacktrace.frames.forEach(e => {
                                e.filename = $(e.filename);
                              });
                          });
                      })(e);
                    const r = H();
                    e.extra || (e.extra = {}),
                      e.tags || (e.tags = {}),
                      Object.assign(e.extra, {
                        appState: r,
                        installType: p,
                        extensionId:
                          null === (t = o.default.runtime) || void 0 === t ? void 0 : t.id,
                      }),
                      (e.tags.installType = p);
                  } catch (e) {
                    m('Error rewriting report', e);
                  }
                  return e;
                }
                function L(e, t) {
                  'string' == typeof e.message && (e.message = t(e.message)),
                    e.exception &&
                      e.exception.values &&
                      e.exception.values.forEach(e => {
                        'string' == typeof e.value && (e.value = t(e.value));
                      });
                }
                function $(e) {
                  var t;
                  if (null === (t = globalThis.location) || void 0 === t || !t.origin) return e;
                  const r = null == e ? void 0 : e.split(globalThis.location.origin)[1];
                  if (!r) return e;
                  return `/metamask${r}`;
                }
                function H() {
                  var e, t;
                  return (
                    (null === (e = globalThis.stateHooks) ||
                    void 0 === e ||
                    null === (t = e.getSentryState) ||
                    void 0 === t
                      ? void 0
                      : t.call(e)) || {}
                  );
                }
                function U(e) {
                  return i.makeFetchTransport(e, async (...e) => {
                    if (!(await C()))
                      throw new Error('Network request skipped as metrics disabled');
                    return await fetch(...e);
                  });
                }
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/setupSentry.js' },
    ],
    [
      1740,
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/lock.js',
      },
    ],
    [
      1741,
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/provider.js',
      },
    ],
    [
      1742,
      {
        './bytes': 1734,
        './constants': 1735,
        './helpers': 1737,
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
                      i = e('ethereum-cryptography/secp256k1'),
                      s = e('./bytes'),
                      o = e('./constants'),
                      a = e('./helpers');
                    function u(e, t) {
                      return e === BigInt(0) || e === BigInt(1)
                        ? e
                        : t === undefined
                          ? e - BigInt(27)
                          : e - (t * BigInt(2) + BigInt(35));
                    }
                    function c(e) {
                      return e === BigInt(0) || e === BigInt(1);
                    }
                    r.ecsign = function (e, r, n) {
                      const s = i.secp256k1.sign(e, r),
                        o = s.toCompactRawBytes();
                      return {
                        r: t.from(o.slice(0, 32)),
                        s: t.from(o.slice(32, 64)),
                        v:
                          n === undefined
                            ? BigInt(s.recovery + 27)
                            : BigInt(s.recovery + 35) + BigInt(n) * BigInt(2),
                      };
                    };
                    r.ecrecover = function (e, r, n, o, a) {
                      const f = t.concat(
                          [(0, s.setLengthLeft)(n, 32), (0, s.setLengthLeft)(o, 32)],
                          64
                        ),
                        l = u(r, a);
                      if (!c(l)) throw new Error('Invalid signature v value');
                      const d = i.secp256k1.Signature.fromCompact(f)
                        .addRecoveryBit(Number(l))
                        .recoverPublicKey(e);
                      return t.from(d.toRawBytes(!1).slice(1));
                    };
                    r.toRpcSig = function (e, r, n, i) {
                      if (!c(u(e, i))) throw new Error('Invalid signature v value');
                      return (0, s.bufferToHex)(
                        t.concat([
                          (0, s.setLengthLeft)(r, 32),
                          (0, s.setLengthLeft)(n, 32),
                          (0, s.toBuffer)(e),
                        ])
                      );
                    };
                    r.toCompactSig = function (e, r, n, i) {
                      if (!c(u(e, i))) throw new Error('Invalid signature v value');
                      let o = n;
                      return (
                        ((e > BigInt(28) && e % BigInt(2) === BigInt(1)) ||
                          e === BigInt(1) ||
                          e === BigInt(28)) &&
                          ((o = t.from(n)), (o[0] |= 128)),
                        (0, s.bufferToHex)(
                          t.concat([(0, s.setLengthLeft)(r, 32), (0, s.setLengthLeft)(o, 32)])
                        )
                      );
                    };
                    r.fromRpcSig = function (e) {
                      const t = (0, s.toBuffer)(e);
                      let r, n, i;
                      if (t.length >= 65)
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (i = (0, s.bufferToBigInt)(t.slice(64)));
                      else {
                        if (64 !== t.length) throw new Error('Invalid signature length');
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (i = BigInt((0, s.bufferToInt)(t.slice(32, 33)) >> 7)),
                          (n[0] &= 127);
                      }
                      return i < 27 && (i += BigInt(27)), { v: i, r: r, s: n };
                    };
                    r.isValidSignature = function (e, t, r, n = !0, i) {
                      if (32 !== t.length || 32 !== r.length) return !1;
                      if (!c(u(e, i))) return !1;
                      const a = (0, s.bufferToBigInt)(t),
                        f = (0, s.bufferToBigInt)(r);
                      return (
                        !(
                          a === BigInt(0) ||
                          a >= o.SECP256K1_ORDER ||
                          f === BigInt(0) ||
                          f >= o.SECP256K1_ORDER
                        ) && !(n && f >= o.SECP256K1_ORDER_DIV_2)
                      );
                    };
                    r.hashPersonalMessage = function (e) {
                      (0, a.assertIsBuffer)(e);
                      const r = t.from(`Ethereum Signed Message:\n${e.length}`, 'utf-8');
                      return t.from((0, n.keccak256)(t.concat([r, e])));
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/signature.js',
      },
    ],
    [
      1743,
      { './bytes': 1734, './internal': 1739 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toType = r.TypeOutput = void 0);
                const n = e('./bytes'),
                  i = e('./internal');
                var s;
                !(function (e) {
                  (e[(e.Number = 0)] = 'Number'),
                    (e[(e.BigInt = 1)] = 'BigInt'),
                    (e[(e.Buffer = 2)] = 'Buffer'),
                    (e[(e.PrefixedHexString = 3)] = 'PrefixedHexString');
                })((s = r.TypeOutput || (r.TypeOutput = {}))),
                  (r.toType = function (e, t) {
                    if (null === e) return null;
                    if (e === undefined) return undefined;
                    if ('string' == typeof e && !(0, i.isHexString)(e))
                      throw new Error(`A string must be provided with a 0x-prefix, given: ${e}`);
                    if ('number' == typeof e && !Number.isSafeInteger(e))
                      throw new Error(
                        'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                      );
                    const r = (0, n.toBuffer)(e);
                    switch (t) {
                      case s.Buffer:
                        return r;
                      case s.BigInt:
                        return (0, n.bufferToBigInt)(r);
                      case s.Number: {
                        const e = (0, n.bufferToBigInt)(r);
                        if (e > BigInt(Number.MAX_SAFE_INTEGER))
                          throw new Error(
                            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                          );
                        return Number(e);
                      }
                      case s.PrefixedHexString:
                        return (0, n.bufferToHex)(r);
                      default:
                        throw new Error('unknown outputType');
                    }
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/types.js',
      },
    ],
    [
      1744,
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
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/units.js',
      },
    ],
    [
      1745,
      { './address': 1732, './bytes': 1734, './types': 1743, buffer: 4139 },
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
                      i = e('./bytes'),
                      s = e('./types');
                    class o {
                      constructor(e, t, r, n) {
                        (this.index = e),
                          (this.validatorIndex = t),
                          (this.address = r),
                          (this.amount = n);
                      }
                      static fromWithdrawalData(e) {
                        const { index: t, validatorIndex: r, address: i, amount: a } = e,
                          u = (0, s.toType)(t, s.TypeOutput.BigInt),
                          c = (0, s.toType)(r, s.TypeOutput.BigInt),
                          f = new n.Address((0, s.toType)(i, s.TypeOutput.Buffer)),
                          l = (0, s.toType)(a, s.TypeOutput.BigInt);
                        return new o(u, c, f, l);
                      }
                      static fromValuesArray(e) {
                        if (4 !== e.length)
                          throw Error(
                            `Invalid withdrawalArray length expected=4 actual=${e.length}`
                          );
                        const [t, r, n, i] = e;
                        return o.fromWithdrawalData({
                          index: t,
                          validatorIndex: r,
                          address: n,
                          amount: i,
                        });
                      }
                      static toBufferArray(e) {
                        const { index: r, validatorIndex: i, address: o, amount: a } = e,
                          u =
                            (0, s.toType)(r, s.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, s.toType)(r, s.TypeOutput.Buffer),
                          c =
                            (0, s.toType)(i, s.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, s.toType)(i, s.TypeOutput.Buffer);
                        let f;
                        f = o instanceof n.Address ? o.buf : (0, s.toType)(o, s.TypeOutput.Buffer);
                        return [
                          u,
                          c,
                          f,
                          (0, s.toType)(a, s.TypeOutput.BigInt) === BigInt(0)
                            ? t.alloc(0)
                            : (0, s.toType)(a, s.TypeOutput.Buffer),
                        ];
                      }
                      raw() {
                        return o.toBufferArray(this);
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
                          index: (0, i.bigIntToHex)(this.index),
                          validatorIndex: (0, i.bigIntToHex)(this.validatorIndex),
                          address: '0x' + this.address.buf.toString('hex'),
                          amount: (0, i.bigIntToHex)(this.amount),
                        };
                      }
                    }
                    r.Withdrawal = o;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/withdrawal.js',
      },
    ],
    [
      1746,
      { './errors.cjs': 1754, '@metamask/superstruct': 2913 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.assertExhaustive = r.assertStruct = r.assert = r.AssertionError = void 0);
                const n = e('@metamask/superstruct'),
                  i = e('./errors.cjs');
                function s(e, t) {
                  return (
                    (r = e),
                    Boolean('string' == typeof r?.prototype?.constructor?.name)
                      ? new e({ message: t })
                      : e({ message: t })
                  );
                  var r;
                }
                class o extends Error {
                  constructor(e) {
                    super(e.message), (this.code = 'ERR_ASSERTION');
                  }
                }
                (r.AssertionError = o),
                  (r.assert = function (e, t = 'Assertion failed.', r = o) {
                    if (!e) {
                      if (t instanceof Error) throw t;
                      throw s(r, t);
                    }
                  }),
                  (r.assertStruct = function (e, t, r = 'Assertion failed', a = o) {
                    try {
                      (0, n.assert)(e, t);
                    } catch (e) {
                      throw s(
                        a,
                        `${r}: ${(function (e) {
                          return (0, i.getErrorMessage)(e).replace(/\.$/u, '');
                        })(e)}.`
                      );
                    }
                  }),
                  (r.assertExhaustive = function (e) {
                    throw new Error(
                      'Invalid branch reached. Should be detected during compilation.'
                    );
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/assert.cjs',
      },
    ],
    [
      1747,
      { './assert.cjs': 1746, '@metamask/superstruct': 2913 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.base64 = void 0);
                const n = e('@metamask/superstruct'),
                  i = e('./assert.cjs');
                r.base64 = (e, t = {}) => {
                  const r = t.paddingRequired ?? !1,
                    s = t.characterSet ?? 'base64';
                  let o, a;
                  return (
                    'base64' === s
                      ? (o = String.raw`[A-Za-z0-9+\/]`)
                      : ((0, i.assert)('base64url' === s), (o = String.raw`[-_A-Za-z0-9]`)),
                    (a = r
                      ? new RegExp(`^(?:${o}{4})*(?:${o}{3}=|${o}{2}==)?$`, 'u')
                      : new RegExp(`^(?:${o}{4})*(?:${o}{2,3}|${o}{3}=|${o}{2}==)?$`, 'u')),
                    (0, n.pattern)(e, a)
                  );
                };
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/base64.cjs',
      },
    ],
    [
      1748,
      { './assert.cjs': 1746, './hex.cjs': 1755, '@scure/base': 1767, buffer: 4139 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (t) {
                  (function () {
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.createDataView =
                        r.concatBytes =
                        r.valueToBytes =
                        r.base64ToBytes =
                        r.stringToBytes =
                        r.numberToBytes =
                        r.signedBigIntToBytes =
                        r.bigIntToBytes =
                        r.hexToBytes =
                        r.bytesToBase64 =
                        r.bytesToString =
                        r.bytesToNumber =
                        r.bytesToSignedBigInt =
                        r.bytesToBigInt =
                        r.bytesToHex =
                        r.assertIsBytes =
                        r.isBytes =
                          void 0);
                    const n = e('@scure/base'),
                      i = e('./assert.cjs'),
                      s = e('./hex.cjs'),
                      o = 48,
                      a = 58,
                      u = 87;
                    const c = (function () {
                      const e = [];
                      return () => {
                        if (0 === e.length)
                          for (let t = 0; t < 256; t++) e.push(t.toString(16).padStart(2, '0'));
                        return e;
                      };
                    })();
                    function f(e) {
                      return e instanceof Uint8Array;
                    }
                    function l(e) {
                      (0, i.assert)(f(e), 'Value must be a Uint8Array.');
                    }
                    function d(e) {
                      if ((l(e), 0 === e.length)) return '0x';
                      const t = c(),
                        r = new Array(e.length);
                      for (let n = 0; n < e.length; n++) r[n] = t[e[n]];
                      return (0, s.add0x)(r.join(''));
                    }
                    function h(e) {
                      l(e);
                      const t = d(e);
                      return BigInt(t);
                    }
                    function p(e) {
                      if ('0x' === e?.toLowerCase?.()) return new Uint8Array();
                      (0, s.assertIsHexString)(e);
                      const t = (0, s.remove0x)(e).toLowerCase(),
                        r = t.length % 2 == 0 ? t : `0${t}`,
                        n = new Uint8Array(r.length / 2);
                      for (let e = 0; e < n.length; e++) {
                        const t = r.charCodeAt(2 * e),
                          i = r.charCodeAt(2 * e + 1),
                          s = t - (t < a ? o : u),
                          c = i - (i < a ? o : u);
                        n[e] = 16 * s + c;
                      }
                      return n;
                    }
                    function m(e) {
                      (0, i.assert)('bigint' == typeof e, 'Value must be a bigint.'),
                        (0, i.assert)(e >= BigInt(0), 'Value must be a non-negative bigint.');
                      return p(e.toString(16));
                    }
                    function g(e) {
                      (0, i.assert)('number' == typeof e, 'Value must be a number.'),
                        (0, i.assert)(e >= 0, 'Value must be a non-negative number.'),
                        (0, i.assert)(
                          Number.isSafeInteger(e),
                          'Value is not a safe integer. Use `bigIntToBytes` instead.'
                        );
                      return p(e.toString(16));
                    }
                    function y(e) {
                      return (
                        (0, i.assert)('string' == typeof e, 'Value must be a string.'),
                        new TextEncoder().encode(e)
                      );
                    }
                    function b(e) {
                      if ('bigint' == typeof e) return m(e);
                      if ('number' == typeof e) return g(e);
                      if ('string' == typeof e) return e.startsWith('0x') ? p(e) : y(e);
                      if (f(e)) return e;
                      throw new TypeError(`Unsupported value type: "${typeof e}".`);
                    }
                    (r.isBytes = f),
                      (r.assertIsBytes = l),
                      (r.bytesToHex = d),
                      (r.bytesToBigInt = h),
                      (r.bytesToSignedBigInt = function (e) {
                        l(e);
                        let t = BigInt(0);
                        for (const r of e) t = (t << BigInt(8)) + BigInt(r);
                        return BigInt.asIntN(8 * e.length, t);
                      }),
                      (r.bytesToNumber = function (e) {
                        l(e);
                        const t = h(e);
                        return (
                          (0, i.assert)(
                            t <= BigInt(Number.MAX_SAFE_INTEGER),
                            'Number is not a safe integer. Use `bytesToBigInt` instead.'
                          ),
                          Number(t)
                        );
                      }),
                      (r.bytesToString = function (e) {
                        return l(e), new TextDecoder().decode(e);
                      }),
                      (r.bytesToBase64 = function (e) {
                        return l(e), n.base64.encode(e);
                      }),
                      (r.hexToBytes = p),
                      (r.bigIntToBytes = m),
                      (r.signedBigIntToBytes = function (e, t) {
                        (0, i.assert)('bigint' == typeof e, 'Value must be a bigint.'),
                          (0, i.assert)('number' == typeof t, 'Byte length must be a number.'),
                          (0, i.assert)(t > 0, 'Byte length must be greater than 0.'),
                          (0, i.assert)(
                            (function (e, t) {
                              (0, i.assert)(t > 0);
                              const r = e >> BigInt(31);
                              return !(((~e & r) + (e & ~r)) >> BigInt(8 * t - 1));
                            })(e, t),
                            'Byte length is too small to represent the given value.'
                          );
                        let r = e;
                        const n = new Uint8Array(t);
                        for (let e = 0; e < n.length; e++)
                          (n[e] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
                        return n.reverse();
                      }),
                      (r.numberToBytes = g),
                      (r.stringToBytes = y),
                      (r.base64ToBytes = function (e) {
                        return (
                          (0, i.assert)('string' == typeof e, 'Value must be a string.'),
                          n.base64.decode(e)
                        );
                      }),
                      (r.valueToBytes = b),
                      (r.concatBytes = function (e) {
                        const t = new Array(e.length);
                        let r = 0;
                        for (let n = 0; n < e.length; n++) {
                          const i = b(e[n]);
                          (t[n] = i), (r += i.length);
                        }
                        const n = new Uint8Array(r);
                        for (let e = 0, r = 0; e < t.length; e++)
                          n.set(t[e], r), (r += t[e].length);
                        return n;
                      }),
                      (r.createDataView = function (e) {
                        if (void 0 !== t && e instanceof t) {
                          const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
                          return new DataView(t);
                        }
                        return new DataView(e.buffer, e.byteOffset, e.byteLength);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/bytes.cjs',
      },
    ],
    [
      1749,
      { '@metamask/superstruct': 2913 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toCaipChainId =
                    r.parseCaipAccountId =
                    r.parseCaipChainId =
                    r.isCaipAssetId =
                    r.isCaipAssetType =
                    r.isCaipAccountAddress =
                    r.isCaipAccountId =
                    r.isCaipReference =
                    r.isCaipNamespace =
                    r.isCaipChainId =
                    r.KnownCaipNamespace =
                    r.CaipAssetIdStruct =
                    r.CaipAssetTypeStruct =
                    r.CaipAccountAddressStruct =
                    r.CaipAccountIdStruct =
                    r.CaipReferenceStruct =
                    r.CaipNamespaceStruct =
                    r.CaipChainIdStruct =
                    r.CAIP_ASSET_ID_REGEX =
                    r.CAIP_ASSET_TYPE_REGEX =
                    r.CAIP_ACCOUNT_ADDRESS_REGEX =
                    r.CAIP_ACCOUNT_ID_REGEX =
                    r.CAIP_REFERENCE_REGEX =
                    r.CAIP_NAMESPACE_REGEX =
                    r.CAIP_CHAIN_ID_REGEX =
                      void 0);
                const n = e('@metamask/superstruct');
                function i(e) {
                  return (0, n.is)(e, r.CaipNamespaceStruct);
                }
                function s(e) {
                  return (0, n.is)(e, r.CaipReferenceStruct);
                }
                (r.CAIP_CHAIN_ID_REGEX =
                  /^(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})$/u),
                  (r.CAIP_NAMESPACE_REGEX = /^[-a-z0-9]{3,8}$/u),
                  (r.CAIP_REFERENCE_REGEX = /^[-_a-zA-Z0-9]{1,32}$/u),
                  (r.CAIP_ACCOUNT_ID_REGEX =
                    /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32})):(?<accountAddress>[-.%a-zA-Z0-9]{1,128})$/u),
                  (r.CAIP_ACCOUNT_ADDRESS_REGEX = /^[-.%a-zA-Z0-9]{1,128}$/u),
                  (r.CAIP_ASSET_TYPE_REGEX =
                    /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})$/u),
                  (r.CAIP_ASSET_ID_REGEX =
                    /^(?<chainId>(?<namespace>[-a-z0-9]{3,8}):(?<reference>[-_a-zA-Z0-9]{1,32}))\/(?<assetNamespace>[-a-z0-9]{3,8}):(?<assetReference>[-.%a-zA-Z0-9]{1,128})\/(?<tokenId>[-.%a-zA-Z0-9]{1,78})$/u),
                  (r.CaipChainIdStruct = (0, n.pattern)((0, n.string)(), r.CAIP_CHAIN_ID_REGEX)),
                  (r.CaipNamespaceStruct = (0, n.pattern)((0, n.string)(), r.CAIP_NAMESPACE_REGEX)),
                  (r.CaipReferenceStruct = (0, n.pattern)((0, n.string)(), r.CAIP_REFERENCE_REGEX)),
                  (r.CaipAccountIdStruct = (0, n.pattern)(
                    (0, n.string)(),
                    r.CAIP_ACCOUNT_ID_REGEX
                  )),
                  (r.CaipAccountAddressStruct = (0, n.pattern)(
                    (0, n.string)(),
                    r.CAIP_ACCOUNT_ADDRESS_REGEX
                  )),
                  (r.CaipAssetTypeStruct = (0, n.pattern)(
                    (0, n.string)(),
                    r.CAIP_ASSET_TYPE_REGEX
                  )),
                  (r.CaipAssetIdStruct = (0, n.pattern)((0, n.string)(), r.CAIP_ASSET_ID_REGEX)),
                  (function (e) {
                    (e.Bip122 = 'bip122'), (e.Eip155 = 'eip155'), (e.Wallet = 'wallet');
                  })(r.KnownCaipNamespace || (r.KnownCaipNamespace = {})),
                  (r.isCaipChainId = function (e) {
                    return (0, n.is)(e, r.CaipChainIdStruct);
                  }),
                  (r.isCaipNamespace = i),
                  (r.isCaipReference = s),
                  (r.isCaipAccountId = function (e) {
                    return (0, n.is)(e, r.CaipAccountIdStruct);
                  }),
                  (r.isCaipAccountAddress = function (e) {
                    return (0, n.is)(e, r.CaipAccountAddressStruct);
                  }),
                  (r.isCaipAssetType = function (e) {
                    return (0, n.is)(e, r.CaipAssetTypeStruct);
                  }),
                  (r.isCaipAssetId = function (e) {
                    return (0, n.is)(e, r.CaipAssetIdStruct);
                  }),
                  (r.parseCaipChainId = function (e) {
                    const t = r.CAIP_CHAIN_ID_REGEX.exec(e);
                    if (!t?.groups) throw new Error('Invalid CAIP chain ID.');
                    return { namespace: t.groups.namespace, reference: t.groups.reference };
                  }),
                  (r.parseCaipAccountId = function (e) {
                    const t = r.CAIP_ACCOUNT_ID_REGEX.exec(e);
                    if (!t?.groups) throw new Error('Invalid CAIP account ID.');
                    return {
                      address: t.groups.accountAddress,
                      chainId: t.groups.chainId,
                      chain: { namespace: t.groups.namespace, reference: t.groups.reference },
                    };
                  }),
                  (r.toCaipChainId = function (e, t) {
                    if (!i(e))
                      throw new Error(
                        `Invalid "namespace", must match: ${r.CAIP_NAMESPACE_REGEX.toString()}`
                      );
                    if (!s(t))
                      throw new Error(
                        `Invalid "reference", must match: ${r.CAIP_REFERENCE_REGEX.toString()}`
                      );
                    return `${e}:${t}`;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/caip-types.cjs',
      },
    ],
    [
      1750,
      { './base64.cjs': 1747, '@metamask/superstruct': 2913 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.ChecksumStruct = void 0);
                const n = e('@metamask/superstruct'),
                  i = e('./base64.cjs');
                r.ChecksumStruct = (0, n.size)(
                  (0, i.base64)((0, n.string)(), { paddingRequired: !0 }),
                  44,
                  44
                );
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/checksum.cjs',
      },
    ],
    [
      1751,
      {
        './assert.cjs': 1746,
        './bytes.cjs': 1748,
        './hex.cjs': 1755,
        '@metamask/superstruct': 2913,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.createHex = r.createBytes = r.createBigInt = r.createNumber = void 0);
                const n = e('@metamask/superstruct'),
                  i = e('./assert.cjs'),
                  s = e('./bytes.cjs'),
                  o = e('./hex.cjs'),
                  a = (0, n.union)([
                    (0, n.number)(),
                    (0, n.bigint)(),
                    (0, n.string)(),
                    o.StrictHexStruct,
                  ]),
                  u = (0, n.coerce)((0, n.number)(), a, Number),
                  c = (0, n.coerce)((0, n.bigint)(), a, BigInt),
                  f =
                    ((0, n.union)([o.StrictHexStruct, (0, n.instance)(Uint8Array)]),
                    (0, n.coerce)(
                      (0, n.instance)(Uint8Array),
                      (0, n.union)([o.StrictHexStruct]),
                      s.hexToBytes
                    )),
                  l = (0, n.coerce)(o.StrictHexStruct, (0, n.instance)(Uint8Array), s.bytesToHex);
                (r.createNumber = function (e) {
                  try {
                    const t = (0, n.create)(e, u);
                    return (
                      (0, i.assert)(
                        Number.isFinite(t),
                        `Expected a number-like value, got "${e}".`
                      ),
                      t
                    );
                  } catch (t) {
                    if (t instanceof n.StructError)
                      throw new Error(`Expected a number-like value, got "${e}".`);
                    throw t;
                  }
                }),
                  (r.createBigInt = function (e) {
                    try {
                      return (0, n.create)(e, c);
                    } catch (e) {
                      if (e instanceof n.StructError)
                        throw new Error(`Expected a number-like value, got "${String(e.value)}".`);
                      throw e;
                    }
                  }),
                  (r.createBytes = function (e) {
                    if ('string' == typeof e && '0x' === e.toLowerCase()) return new Uint8Array();
                    try {
                      return (0, n.create)(e, f);
                    } catch (e) {
                      if (e instanceof n.StructError)
                        throw new Error(`Expected a bytes-like value, got "${String(e.value)}".`);
                      throw e;
                    }
                  }),
                  (r.createHex = function (e) {
                    if (
                      (e instanceof Uint8Array && 0 === e.length) ||
                      ('string' == typeof e && '0x' === e.toLowerCase())
                    )
                      return '0x';
                    try {
                      return (0, n.create)(e, l);
                    } catch (e) {
                      if (e instanceof n.StructError)
                        throw new Error(`Expected a bytes-like value, got "${String(e.value)}".`);
                      throw e;
                    }
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/coercers.cjs',
      },
    ],
    [
      1752,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n,
                  i,
                  s =
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
                  o =
                    (this && this.__classPrivateFieldSet) ||
                    function (e, t, r, n, i) {
                      if ('m' === n) throw new TypeError('Private method is not writable');
                      if ('a' === n && !i)
                        throw new TypeError('Private accessor was defined without a setter');
                      if ('function' == typeof t ? e !== t || !i : !t.has(e))
                        throw new TypeError(
                          'Cannot write private member to an object whose class did not declare it'
                        );
                      return 'a' === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.FrozenSet = r.FrozenMap = void 0);
                class a {
                  get size() {
                    return s(this, n, 'f').size;
                  }
                  [((n = new WeakMap()), Symbol.iterator)]() {
                    return s(this, n, 'f')[Symbol.iterator]();
                  }
                  constructor(e) {
                    n.set(this, void 0), o(this, n, new Map(e), 'f'), Object.freeze(this);
                  }
                  entries() {
                    return s(this, n, 'f').entries();
                  }
                  forEach(e, t) {
                    return s(this, n, 'f').forEach((r, n, i) => e.call(t, r, n, this));
                  }
                  get(e) {
                    return s(this, n, 'f').get(e);
                  }
                  has(e) {
                    return s(this, n, 'f').has(e);
                  }
                  keys() {
                    return s(this, n, 'f').keys();
                  }
                  values() {
                    return s(this, n, 'f').values();
                  }
                  toString() {
                    return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([e, t]) => `${String(e)} => ${String(t)}`).join(', ')} ` : ''}}`;
                  }
                }
                r.FrozenMap = a;
                class u {
                  get size() {
                    return s(this, i, 'f').size;
                  }
                  [((i = new WeakMap()), Symbol.iterator)]() {
                    return s(this, i, 'f')[Symbol.iterator]();
                  }
                  constructor(e) {
                    i.set(this, void 0), o(this, i, new Set(e), 'f'), Object.freeze(this);
                  }
                  entries() {
                    return s(this, i, 'f').entries();
                  }
                  forEach(e, t) {
                    return s(this, i, 'f').forEach((r, n, i) => e.call(t, r, n, this));
                  }
                  has(e) {
                    return s(this, i, 'f').has(e);
                  }
                  keys() {
                    return s(this, i, 'f').keys();
                  }
                  values() {
                    return s(this, i, 'f').values();
                  }
                  toString() {
                    return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map(e => String(e)).join(', ')} ` : ''}}`;
                  }
                }
                (r.FrozenSet = u),
                  Object.freeze(a),
                  Object.freeze(a.prototype),
                  Object.freeze(u),
                  Object.freeze(u.prototype);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/collections.cjs',
      },
    ],
    [
      1753,
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
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/encryption-types.cjs',
      },
    ],
    [
      1754,
      { './misc.cjs': 1760, 'pony-cause': 5071 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.wrapError =
                    r.getErrorMessage =
                    r.isErrorWithStack =
                    r.isErrorWithMessage =
                    r.isErrorWithCode =
                      void 0);
                const n = e('pony-cause'),
                  i = e('./misc.cjs');
                function s(e) {
                  return 'object' == typeof e && null !== e && 'code' in e;
                }
                function o(e) {
                  return 'object' == typeof e && null !== e && 'message' in e;
                }
                (r.isErrorWithCode = s),
                  (r.isErrorWithMessage = o),
                  (r.isErrorWithStack = function (e) {
                    return 'object' == typeof e && null !== e && 'stack' in e;
                  }),
                  (r.getErrorMessage = function (e) {
                    return o(e) && 'string' == typeof e.message
                      ? e.message
                      : (0, i.isNullOrUndefined)(e)
                        ? ''
                        : String(e);
                  }),
                  (r.wrapError = function (e, t) {
                    if (
                      (r = e) instanceof Error ||
                      ((0, i.isObject)(r) && 'Error' === r.constructor.name)
                    ) {
                      let r;
                      return (
                        (r =
                          2 === Error.length
                            ? new Error(t, { cause: e })
                            : new n.ErrorWithCause(t, { cause: e })),
                        s(e) && (r.code = e.code),
                        r
                      );
                    }
                    var r;
                    return t.length > 0 ? new Error(`${String(e)}: ${t}`) : new Error(String(e));
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/errors.cjs',
      },
    ],
    [
      1755,
      {
        './assert.cjs': 1746,
        './bytes.cjs': 1748,
        '@metamask/superstruct': 2913,
        '@noble/hashes/sha3': 3055,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.remove0x =
                    r.add0x =
                    r.isValidChecksumAddress =
                    r.getChecksumAddress =
                    r.isValidHexAddress =
                    r.assertIsStrictHexString =
                    r.assertIsHexString =
                    r.isStrictHexString =
                    r.isHexString =
                    r.HexChecksumAddressStruct =
                    r.HexAddressStruct =
                    r.StrictHexStruct =
                    r.HexStruct =
                      void 0);
                const n = e('@metamask/superstruct'),
                  i = e('@noble/hashes/sha3'),
                  s = e('./assert.cjs'),
                  o = e('./bytes.cjs');
                function a(e) {
                  return (0, n.is)(e, r.HexStruct);
                }
                function u(e) {
                  return (0, n.is)(e, r.StrictHexStruct);
                }
                function c(e) {
                  (0, s.assert)((0, n.is)(e, r.HexChecksumAddressStruct), 'Invalid hex address.');
                  const t = l(e.toLowerCase()),
                    a = l((0, o.bytesToHex)((0, i.keccak_256)(t)));
                  return `0x${t
                    .split('')
                    .map((e, t) => {
                      const r = a[t];
                      return (
                        (0, s.assert)((0, n.is)(r, (0, n.string)()), 'Hash shorter than address.'),
                        parseInt(r, 16) > 7 ? e.toUpperCase() : e
                      );
                    })
                    .join('')}`;
                }
                function f(e) {
                  return !!(0, n.is)(e, r.HexChecksumAddressStruct) && c(e) === e;
                }
                function l(e) {
                  return e.startsWith('0x') || e.startsWith('0X') ? e.substring(2) : e;
                }
                (r.HexStruct = (0, n.pattern)((0, n.string)(), /^(?:0x)?[0-9a-f]+$/iu)),
                  (r.StrictHexStruct = (0, n.pattern)((0, n.string)(), /^0x[0-9a-f]+$/iu)),
                  (r.HexAddressStruct = (0, n.pattern)((0, n.string)(), /^0x[0-9a-f]{40}$/u)),
                  (r.HexChecksumAddressStruct = (0, n.pattern)(
                    (0, n.string)(),
                    /^0x[0-9a-fA-F]{40}$/u
                  )),
                  (r.isHexString = a),
                  (r.isStrictHexString = u),
                  (r.assertIsHexString = function (e) {
                    (0, s.assert)(a(e), 'Value must be a hexadecimal string.');
                  }),
                  (r.assertIsStrictHexString = function (e) {
                    (0, s.assert)(u(e), 'Value must be a hexadecimal string, starting with "0x".');
                  }),
                  (r.isValidHexAddress = function (e) {
                    return (0, n.is)(e, r.HexAddressStruct) || f(e);
                  }),
                  (r.getChecksumAddress = c),
                  (r.isValidChecksumAddress = f),
                  (r.add0x = function (e) {
                    return e.startsWith('0x')
                      ? e
                      : e.startsWith('0X')
                        ? `0x${e.substring(2)}`
                        : `0x${e}`;
                  }),
                  (r.remove0x = l);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/hex.cjs',
      },
    ],
    [
      1756,
      {
        './assert.cjs': 1746,
        './base64.cjs': 1747,
        './bytes.cjs': 1748,
        './caip-types.cjs': 1749,
        './checksum.cjs': 1750,
        './coercers.cjs': 1751,
        './collections.cjs': 1752,
        './encryption-types.cjs': 1753,
        './errors.cjs': 1754,
        './hex.cjs': 1755,
        './json.cjs': 1757,
        './keyring.cjs': 1758,
        './logging.cjs': 1759,
        './misc.cjs': 1760,
        './number.cjs': 1761,
        './opaque.cjs': 1762,
        './promise.cjs': 1763,
        './time.cjs': 1764,
        './transaction-types.cjs': 1765,
        './versions.cjs': 1766,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  i(e('./assert.cjs'), r),
                  i(e('./base64.cjs'), r),
                  i(e('./bytes.cjs'), r),
                  i(e('./caip-types.cjs'), r),
                  i(e('./checksum.cjs'), r),
                  i(e('./coercers.cjs'), r),
                  i(e('./collections.cjs'), r),
                  i(e('./encryption-types.cjs'), r),
                  i(e('./errors.cjs'), r),
                  i(e('./hex.cjs'), r),
                  i(e('./json.cjs'), r),
                  i(e('./keyring.cjs'), r),
                  i(e('./logging.cjs'), r),
                  i(e('./misc.cjs'), r),
                  i(e('./number.cjs'), r),
                  i(e('./opaque.cjs'), r),
                  i(e('./promise.cjs'), r),
                  i(e('./time.cjs'), r),
                  i(e('./transaction-types.cjs'), r),
                  i(e('./versions.cjs'), r);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/index.cjs',
      },
    ],
    [
      1757,
      { './assert.cjs': 1746, './misc.cjs': 1760, '@metamask/superstruct': 2913 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getJsonRpcIdValidator =
                    r.assertIsJsonRpcError =
                    r.isJsonRpcError =
                    r.assertIsJsonRpcFailure =
                    r.isJsonRpcFailure =
                    r.assertIsJsonRpcSuccess =
                    r.isJsonRpcSuccess =
                    r.assertIsJsonRpcResponse =
                    r.isJsonRpcResponse =
                    r.assertIsPendingJsonRpcResponse =
                    r.isPendingJsonRpcResponse =
                    r.JsonRpcResponseStruct =
                    r.JsonRpcFailureStruct =
                    r.JsonRpcSuccessStruct =
                    r.PendingJsonRpcResponseStruct =
                    r.assertIsJsonRpcRequest =
                    r.isJsonRpcRequest =
                    r.assertIsJsonRpcNotification =
                    r.isJsonRpcNotification =
                    r.JsonRpcNotificationStruct =
                    r.JsonRpcRequestStruct =
                    r.JsonRpcParamsStruct =
                    r.JsonRpcErrorStruct =
                    r.JsonRpcIdStruct =
                    r.JsonRpcVersionStruct =
                    r.jsonrpc2 =
                    r.getJsonSize =
                    r.getSafeJson =
                    r.isValidJson =
                    r.JsonStruct =
                    r.UnsafeJsonStruct =
                    r.exactOptional =
                    r.object =
                      void 0);
                const n = e('@metamask/superstruct'),
                  i = e('./assert.cjs'),
                  s = e('./misc.cjs');
                function o({ path: e, branch: t }) {
                  const r = e[e.length - 1];
                  return (0, s.hasProperty)(t[t.length - 2], r);
                }
                function a(e) {
                  return new n.Struct({
                    ...e,
                    type: `optional ${e.type}`,
                    validator: (t, r) => !o(r) || e.validator(t, r),
                    refiner: (t, r) => !o(r) || e.refiner(t, r),
                  });
                }
                (r.object = e => (0, n.object)(e)), (r.exactOptional = a);
                function u(e) {
                  return (0, n.create)(e, r.JsonStruct);
                }
                (r.UnsafeJsonStruct = (0, n.union)([
                  (0, n.literal)(null),
                  (0, n.boolean)(),
                  (0, n.define)(
                    'finite number',
                    e => (0, n.is)(e, (0, n.number)()) && Number.isFinite(e)
                  ),
                  (0, n.string)(),
                  (0, n.array)((0, n.lazy)(() => r.UnsafeJsonStruct)),
                  (0, n.record)(
                    (0, n.string)(),
                    (0, n.lazy)(() => r.UnsafeJsonStruct)
                  ),
                ])),
                  (r.JsonStruct = (0, n.coerce)(
                    r.UnsafeJsonStruct,
                    (0, n.any)(),
                    e => (
                      (0, i.assertStruct)(e, r.UnsafeJsonStruct),
                      JSON.parse(
                        JSON.stringify(e, (e, t) =>
                          '__proto__' === e || 'constructor' === e ? undefined : t
                        )
                      )
                    )
                  )),
                  (r.isValidJson = function (e) {
                    try {
                      return u(e), !0;
                    } catch {
                      return !1;
                    }
                  }),
                  (r.getSafeJson = u),
                  (r.getJsonSize = function (e) {
                    (0, i.assertStruct)(e, r.JsonStruct, 'Invalid JSON value');
                    const t = JSON.stringify(e);
                    return new TextEncoder().encode(t).byteLength;
                  }),
                  (r.jsonrpc2 = '2.0'),
                  (r.JsonRpcVersionStruct = (0, n.literal)(r.jsonrpc2)),
                  (r.JsonRpcIdStruct = (0, n.nullable)(
                    (0, n.union)([(0, n.number)(), (0, n.string)()])
                  )),
                  (r.JsonRpcErrorStruct = (0, r.object)({
                    code: (0, n.integer)(),
                    message: (0, n.string)(),
                    data: a(r.JsonStruct),
                    stack: a((0, n.string)()),
                  })),
                  (r.JsonRpcParamsStruct = (0, n.union)([
                    (0, n.record)((0, n.string)(), r.JsonStruct),
                    (0, n.array)(r.JsonStruct),
                  ])),
                  (r.JsonRpcRequestStruct = (0, r.object)({
                    id: r.JsonRpcIdStruct,
                    jsonrpc: r.JsonRpcVersionStruct,
                    method: (0, n.string)(),
                    params: a(r.JsonRpcParamsStruct),
                  })),
                  (r.JsonRpcNotificationStruct = (0, r.object)({
                    jsonrpc: r.JsonRpcVersionStruct,
                    method: (0, n.string)(),
                    params: a(r.JsonRpcParamsStruct),
                  })),
                  (r.isJsonRpcNotification = function (e) {
                    return (0, n.is)(e, r.JsonRpcNotificationStruct);
                  }),
                  (r.assertIsJsonRpcNotification = function (e, t) {
                    (0, i.assertStruct)(
                      e,
                      r.JsonRpcNotificationStruct,
                      'Invalid JSON-RPC notification',
                      t
                    );
                  }),
                  (r.isJsonRpcRequest = function (e) {
                    return (0, n.is)(e, r.JsonRpcRequestStruct);
                  }),
                  (r.assertIsJsonRpcRequest = function (e, t) {
                    (0, i.assertStruct)(e, r.JsonRpcRequestStruct, 'Invalid JSON-RPC request', t);
                  }),
                  (r.PendingJsonRpcResponseStruct = (0, n.object)({
                    id: r.JsonRpcIdStruct,
                    jsonrpc: r.JsonRpcVersionStruct,
                    result: (0, n.optional)((0, n.unknown)()),
                    error: (0, n.optional)(r.JsonRpcErrorStruct),
                  })),
                  (r.JsonRpcSuccessStruct = (0, r.object)({
                    id: r.JsonRpcIdStruct,
                    jsonrpc: r.JsonRpcVersionStruct,
                    result: r.JsonStruct,
                  })),
                  (r.JsonRpcFailureStruct = (0, r.object)({
                    id: r.JsonRpcIdStruct,
                    jsonrpc: r.JsonRpcVersionStruct,
                    error: r.JsonRpcErrorStruct,
                  })),
                  (r.JsonRpcResponseStruct = (0, n.union)([
                    r.JsonRpcSuccessStruct,
                    r.JsonRpcFailureStruct,
                  ])),
                  (r.isPendingJsonRpcResponse = function (e) {
                    return (0, n.is)(e, r.PendingJsonRpcResponseStruct);
                  }),
                  (r.assertIsPendingJsonRpcResponse = function (e, t) {
                    (0, i.assertStruct)(
                      e,
                      r.PendingJsonRpcResponseStruct,
                      'Invalid pending JSON-RPC response',
                      t
                    );
                  }),
                  (r.isJsonRpcResponse = function (e) {
                    return (0, n.is)(e, r.JsonRpcResponseStruct);
                  }),
                  (r.assertIsJsonRpcResponse = function (e, t) {
                    (0, i.assertStruct)(e, r.JsonRpcResponseStruct, 'Invalid JSON-RPC response', t);
                  }),
                  (r.isJsonRpcSuccess = function (e) {
                    return (0, n.is)(e, r.JsonRpcSuccessStruct);
                  }),
                  (r.assertIsJsonRpcSuccess = function (e, t) {
                    (0, i.assertStruct)(
                      e,
                      r.JsonRpcSuccessStruct,
                      'Invalid JSON-RPC success response',
                      t
                    );
                  }),
                  (r.isJsonRpcFailure = function (e) {
                    return (0, n.is)(e, r.JsonRpcFailureStruct);
                  }),
                  (r.assertIsJsonRpcFailure = function (e, t) {
                    (0, i.assertStruct)(
                      e,
                      r.JsonRpcFailureStruct,
                      'Invalid JSON-RPC failure response',
                      t
                    );
                  }),
                  (r.isJsonRpcError = function (e) {
                    return (0, n.is)(e, r.JsonRpcErrorStruct);
                  }),
                  (r.assertIsJsonRpcError = function (e, t) {
                    (0, i.assertStruct)(e, r.JsonRpcErrorStruct, 'Invalid JSON-RPC error', t);
                  }),
                  (r.getJsonRpcIdValidator = function (e) {
                    const {
                      permitEmptyString: t,
                      permitFractions: r,
                      permitNull: n,
                    } = { permitEmptyString: !0, permitFractions: !1, permitNull: !0, ...e };
                    return e =>
                      Boolean(
                        ('number' == typeof e && (r || Number.isInteger(e))) ||
                          ('string' == typeof e && (t || e.length > 0)) ||
                          (n && null === e)
                      );
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/json.cjs',
      },
    ],
    [
      1758,
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
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/keyring.cjs',
      },
    ],
    [
      1759,
      { debug: 4292 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.createModuleLogger = r.createProjectLogger = void 0);
                const i = (0, n(e('debug')).default)('metamask');
                (r.createProjectLogger = function (e) {
                  return i.extend(e);
                }),
                  (r.createModuleLogger = function (e, t) {
                    return e.extend(t);
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/logging.cjs',
      },
    ],
    [
      1760,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.calculateNumberSize =
                    r.calculateStringSize =
                    r.isASCII =
                    r.isPlainObject =
                    r.ESCAPE_CHARACTERS_REGEXP =
                    r.JsonSize =
                    r.getKnownPropertyNames =
                    r.hasProperty =
                    r.isObject =
                    r.isNullOrUndefined =
                    r.isNonEmptyArray =
                      void 0),
                  (r.isNonEmptyArray = function (e) {
                    return Array.isArray(e) && e.length > 0;
                  }),
                  (r.isNullOrUndefined = function (e) {
                    return null === e || e === undefined;
                  }),
                  (r.isObject = function (e) {
                    return Boolean(e) && 'object' == typeof e && !Array.isArray(e);
                  });
                function n(e) {
                  return e.charCodeAt(0) <= 127;
                }
                (r.hasProperty = (e, t) => Object.hasOwnProperty.call(e, t)),
                  (r.getKnownPropertyNames = function (e) {
                    return Object.getOwnPropertyNames(e);
                  }),
                  (function (e) {
                    (e[(e.Null = 4)] = 'Null'),
                      (e[(e.Comma = 1)] = 'Comma'),
                      (e[(e.Wrapper = 1)] = 'Wrapper'),
                      (e[(e.True = 4)] = 'True'),
                      (e[(e.False = 5)] = 'False'),
                      (e[(e.Quote = 1)] = 'Quote'),
                      (e[(e.Colon = 1)] = 'Colon'),
                      (e[(e.Date = 24)] = 'Date');
                  })(r.JsonSize || (r.JsonSize = {})),
                  (r.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu),
                  (r.isPlainObject = function (e) {
                    if ('object' != typeof e || null === e) return !1;
                    try {
                      let t = e;
                      for (; null !== Object.getPrototypeOf(t); ) t = Object.getPrototypeOf(t);
                      return Object.getPrototypeOf(e) === t;
                    } catch (e) {
                      return !1;
                    }
                  }),
                  (r.isASCII = n),
                  (r.calculateStringSize = function (e) {
                    return (
                      e.split('').reduce((e, t) => (n(t) ? e + 1 : e + 2), 0) +
                      (e.match(r.ESCAPE_CHARACTERS_REGEXP) ?? []).length
                    );
                  }),
                  (r.calculateNumberSize = function (e) {
                    return e.toString().length;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/misc.cjs',
      },
    ],
    [
      1761,
      { './assert.cjs': 1746, './hex.cjs': 1755 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.hexToBigInt = r.hexToNumber = r.bigIntToHex = r.numberToHex = void 0);
                const n = e('./assert.cjs'),
                  i = e('./hex.cjs');
                r.numberToHex = e => (
                  (0, n.assert)('number' == typeof e, 'Value must be a number.'),
                  (0, n.assert)(e >= 0, 'Value must be a non-negative number.'),
                  (0, n.assert)(
                    Number.isSafeInteger(e),
                    'Value is not a safe integer. Use `bigIntToHex` instead.'
                  ),
                  (0, i.add0x)(e.toString(16))
                );
                r.bigIntToHex = e => (
                  (0, n.assert)('bigint' == typeof e, 'Value must be a bigint.'),
                  (0, n.assert)(e >= 0, 'Value must be a non-negative bigint.'),
                  (0, i.add0x)(e.toString(16))
                );
                r.hexToNumber = e => {
                  (0, i.assertIsHexString)(e);
                  const t = parseInt(e, 16);
                  return (
                    (0, n.assert)(
                      Number.isSafeInteger(t),
                      'Value is not a safe integer. Use `hexToBigInt` instead.'
                    ),
                    t
                  );
                };
                r.hexToBigInt = e => ((0, i.assertIsHexString)(e), BigInt((0, i.add0x)(e)));
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/number.cjs',
      },
    ],
    [
      1762,
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
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/opaque.cjs',
      },
    ],
    [
      1763,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.createDeferredPromise = void 0),
                  (r.createDeferredPromise = function ({
                    suppressUnhandledRejection: e = !1,
                  } = {}) {
                    let t, r;
                    const n = new Promise((e, n) => {
                      (t = e), (r = n);
                    });
                    return e && n.catch(e => {}), { promise: n, resolve: t, reject: r };
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/promise.cjs',
      },
    ],
    [
      1764,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.timeSince = r.inMilliseconds = r.Duration = void 0),
                  (function (e) {
                    (e[(e.Millisecond = 1)] = 'Millisecond'),
                      (e[(e.Second = 1e3)] = 'Second'),
                      (e[(e.Minute = 6e4)] = 'Minute'),
                      (e[(e.Hour = 36e5)] = 'Hour'),
                      (e[(e.Day = 864e5)] = 'Day'),
                      (e[(e.Week = 6048e5)] = 'Week'),
                      (e[(e.Year = 31536e6)] = 'Year');
                  })(r.Duration || (r.Duration = {}));
                const n = (e, t) => {
                  if (!(e => Number.isInteger(e) && e >= 0)(e))
                    throw new Error(`"${t}" must be a non-negative integer. Received: "${e}".`);
                };
                (r.inMilliseconds = function (e, t) {
                  return n(e, 'count'), e * t;
                }),
                  (r.timeSince = function (e) {
                    return n(e, 'timestamp'), Date.now() - e;
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/time.cjs',
      },
    ],
    [
      1765,
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
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/transaction-types.cjs',
      },
    ],
    [
      1766,
      { './assert.cjs': 1746, '@metamask/superstruct': 2913, semver: 5617 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.satisfiesVersionRange =
                    r.gtRange =
                    r.gtVersion =
                    r.assertIsSemVerRange =
                    r.assertIsSemVerVersion =
                    r.isValidSemVerRange =
                    r.isValidSemVerVersion =
                    r.VersionRangeStruct =
                    r.VersionStruct =
                      void 0);
                const n = e('@metamask/superstruct'),
                  i = e('semver'),
                  s = e('./assert.cjs');
                (r.VersionStruct = (0, n.refine)(
                  (0, n.string)(),
                  'Version',
                  e => null !== (0, i.valid)(e) || `Expected SemVer version, got "${e}"`
                )),
                  (r.VersionRangeStruct = (0, n.refine)(
                    (0, n.string)(),
                    'Version range',
                    e => null !== (0, i.validRange)(e) || `Expected SemVer range, got "${e}"`
                  )),
                  (r.isValidSemVerVersion = function (e) {
                    return (0, n.is)(e, r.VersionStruct);
                  }),
                  (r.isValidSemVerRange = function (e) {
                    return (0, n.is)(e, r.VersionRangeStruct);
                  }),
                  (r.assertIsSemVerVersion = function (e) {
                    (0, s.assertStruct)(e, r.VersionStruct);
                  }),
                  (r.assertIsSemVerRange = function (e) {
                    (0, s.assertStruct)(e, r.VersionRangeStruct);
                  }),
                  (r.gtVersion = function (e, t) {
                    return (0, i.gt)(e, t);
                  }),
                  (r.gtRange = function (e, t) {
                    return (0, i.gtr)(e, t);
                  }),
                  (r.satisfiesVersionRange = function (e, t) {
                    return (0, i.satisfies)(e, t, { includePrerelease: !0 });
                  });
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/dist/versions.cjs',
      },
    ],
    [
      1767,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e) {
                  return (
                    e instanceof Uint8Array ||
                    (ArrayBuffer.isView(e) && 'Uint8Array' === e.constructor.name)
                  );
                }
                function i(e, ...t) {
                  if (!n(e)) throw new Error('Uint8Array expected');
                  if (t.length > 0 && !t.includes(e.length))
                    throw new Error(
                      'Uint8Array expected of length ' + t + ', got length=' + e.length
                    );
                }
                function s(e, t) {
                  return (
                    !!Array.isArray(t) &&
                    (0 === t.length ||
                      (e
                        ? t.every(e => 'string' == typeof e)
                        : t.every(e => Number.isSafeInteger(e))))
                  );
                }
                function o(e) {
                  if ('function' != typeof e) throw new Error('function expected');
                  return !0;
                }
                function a(e, t) {
                  if ('string' != typeof t) throw new Error(`${e}: string expected`);
                  return !0;
                }
                function u(e) {
                  if (!Number.isSafeInteger(e)) throw new Error(`invalid integer: ${e}`);
                }
                function c(e) {
                  if (!Array.isArray(e)) throw new Error('array expected');
                }
                function f(e, t) {
                  if (!s(!0, t)) throw new Error(`${e}: array of strings expected`);
                }
                function l(e, t) {
                  if (!s(!1, t)) throw new Error(`${e}: array of numbers expected`);
                }
                function d(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function h(e) {
                  const t = 'string' == typeof e ? e.split('') : e,
                    r = t.length;
                  f('alphabet', t);
                  const n = new Map(t.map((e, t) => [e, t]));
                  return {
                    encode: n => (
                      c(n),
                      n.map(n => {
                        if (!Number.isSafeInteger(n) || n < 0 || n >= r)
                          throw new Error(
                            `alphabet.encode: digit index outside alphabet "${n}". Allowed: ${e}`
                          );
                        return t[n];
                      })
                    ),
                    decode: t => (
                      c(t),
                      t.map(t => {
                        a('alphabet.decode', t);
                        const r = n.get(t);
                        if (r === undefined)
                          throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
                        return r;
                      })
                    ),
                  };
                }
                function p(e = '') {
                  return (
                    a('join', e),
                    {
                      encode: t => (f('join.decode', t), t.join(e)),
                      decode: t => (a('join.decode', t), t.split(e)),
                    }
                  );
                }
                function m(e, t = '=') {
                  return (
                    u(e),
                    a('padding', t),
                    {
                      encode(r) {
                        for (f('padding.encode', r); (r.length * e) % 8; ) r.push(t);
                        return r;
                      },
                      decode(r) {
                        f('padding.decode', r);
                        let n = r.length;
                        if ((n * e) % 8)
                          throw new Error(
                            'padding: invalid, string should have whole number of bytes'
                          );
                        for (; n > 0 && r[n - 1] === t; n--) {
                          if (((n - 1) * e) % 8 == 0)
                            throw new Error('padding: invalid, string has too much padding');
                        }
                        return r.slice(0, n);
                      },
                    }
                  );
                }
                function g(e) {
                  return o(e), { encode: e => e, decode: t => e(t) };
                }
                function y(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: invalid from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: invalid to=${r}, base cannot be less than 2`);
                  if ((c(e), !e.length)) return [];
                  let n = 0;
                  const i = [],
                    s = Array.from(e, e => {
                      if ((u(e), e < 0 || e >= t)) throw new Error(`invalid integer: ${e}`);
                      return e;
                    }),
                    o = s.length;
                  for (;;) {
                    let e = 0,
                      a = !0;
                    for (let i = n; i < o; i++) {
                      const o = s[i],
                        u = t * e,
                        c = u + o;
                      if (!Number.isSafeInteger(c) || u / t !== e || c - o !== u)
                        throw new Error('convertRadix: carry overflow');
                      const f = c / r;
                      e = c % r;
                      const l = Math.floor(f);
                      if (((s[i] = l), !Number.isSafeInteger(l) || l * r + e !== c))
                        throw new Error('convertRadix: carry overflow');
                      a && (l ? (a = !1) : (n = i));
                    }
                    if ((i.push(e), a)) break;
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
                      void 0);
                const b = (e, t) => (0 === t ? e : b(t, e % t)),
                  w = (e, t) => e + (t - b(e, t)),
                  k = (() => {
                    let e = [];
                    for (let t = 0; t < 40; t++) e.push(2 ** t);
                    return e;
                  })();
                function v(e, t, r, n) {
                  if ((c(e), t <= 0 || t > 32)) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (w(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${w(t, r)}`
                    );
                  let i = 0,
                    s = 0;
                  const o = k[t],
                    a = k[r] - 1,
                    f = [];
                  for (const n of e) {
                    if ((u(n), n >= o))
                      throw new Error(`convertRadix2: invalid data word=${n} from=${t}`);
                    if (((i = (i << t) | n), s + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${s} from=${t}`);
                    for (s += t; s >= r; s -= r) f.push(((i >> (s - r)) & a) >>> 0);
                    const e = k[s];
                    if (e === undefined) throw new Error('invalid carry');
                    i &= e - 1;
                  }
                  if (((i = (i << (r - s)) & a), !n && s >= t)) throw new Error('Excess padding');
                  if (!n && i > 0) throw new Error(`Non-zero padding: ${i}`);
                  return n && s > 0 && f.push(i >>> 0), f;
                }
                function E(e) {
                  u(e);
                  return {
                    encode: t => {
                      if (!n(t)) throw new Error('radix.encode input should be Uint8Array');
                      return y(Array.from(t), 256, e);
                    },
                    decode: t => (l('radix.decode', t), Uint8Array.from(y(t, e, 256))),
                  };
                }
                function T(e, t = !1) {
                  if ((u(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (w(8, e) > 32 || w(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!n(r)) throw new Error('radix2.encode input should be Uint8Array');
                      return v(Array.from(r), 8, e, !t);
                    },
                    decode: r => (l('radix2.decode', r), Uint8Array.from(v(r, e, 8, t))),
                  };
                }
                function x(e) {
                  return (
                    o(e),
                    function (...t) {
                      try {
                        return e.apply(null, t);
                      } catch (e) {}
                    }
                  );
                }
                function _(e, t) {
                  return (
                    u(e),
                    o(t),
                    {
                      encode(r) {
                        if (!n(r)) throw new Error('checksum.encode: input should be Uint8Array');
                        const i = t(r).slice(0, e),
                          s = new Uint8Array(r.length + e);
                        return s.set(r), s.set(i, r.length), s;
                      },
                      decode(r) {
                        if (!n(r)) throw new Error('checksum.decode: input should be Uint8Array');
                        const i = r.slice(0, -e),
                          s = r.slice(-e),
                          o = t(i).slice(0, e);
                        for (let t = 0; t < e; t++)
                          if (o[t] !== s[t]) throw new Error('Invalid checksum');
                        return i;
                      },
                    }
                  );
                }
                (r.utils = {
                  alphabet: h,
                  chain: d,
                  checksum: _,
                  convertRadix: y,
                  convertRadix2: v,
                  radix: E,
                  radix2: T,
                  join: p,
                  padding: m,
                }),
                  (r.base16 = d(T(4), h('0123456789ABCDEF'), p(''))),
                  (r.base32 = d(T(5), h('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), m(5), p(''))),
                  (r.base32nopad = d(T(5), h('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), p(''))),
                  (r.base32hex = d(T(5), h('0123456789ABCDEFGHIJKLMNOPQRSTUV'), m(5), p(''))),
                  (r.base32hexnopad = d(T(5), h('0123456789ABCDEFGHIJKLMNOPQRSTUV'), p(''))),
                  (r.base32crockford = d(
                    T(5),
                    h('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    p(''),
                    g(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  ));
                const A = (() =>
                  'function' == typeof Uint8Array.from([]).toBase64 &&
                  'function' == typeof Uint8Array.fromBase64)();
                (r.base64 = A
                  ? {
                      encode: e => (i(e), e.toBase64()),
                      decode: e => (
                        a('base64', e), Uint8Array.fromBase64(e, { lastChunkHandling: 'strict' })
                      ),
                    }
                  : d(
                      T(6),
                      h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                      m(6),
                      p('')
                    )),
                  (r.base64nopad = d(
                    T(6),
                    h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    p('')
                  )),
                  (r.base64url = A
                    ? {
                        encode: e => (i(e), e.toBase64({ alphabet: 'base64url' })),
                        decode: e => (
                          a('base64', e), Uint8Array.fromBase64(e, { alphabet: 'base64url' })
                        ),
                      }
                    : d(
                        T(6),
                        h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                        m(6),
                        p('')
                      )),
                  (r.base64urlnopad = d(
                    T(6),
                    h('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    p('')
                  ));
                const S = e => d(E(58), h(e), p(''));
                (r.base58 = S('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')),
                  (r.base58flickr = S(
                    '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
                  )),
                  (r.base58xrp = S('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz'));
                const B = [0, 2, 3, 5, 6, 7, 9, 10, 11];
                r.base58xmr = {
                  encode(e) {
                    let t = '';
                    for (let n = 0; n < e.length; n += 8) {
                      const i = e.subarray(n, n + 8);
                      t += r.base58.encode(i).padStart(B[i.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const i = e.slice(n, n + 11),
                        s = B.indexOf(i.length),
                        o = r.base58.decode(i);
                      for (let e = 0; e < o.length - s; e++)
                        if (0 !== o[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(o.slice(o.length - s)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  d(
                    _(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const j = d(h('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), p('')),
                  P = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function I(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < P.length; e++) 1 == ((t >> e) & 1) && (r ^= P[e]);
                  return r;
                }
                function C(e, t, r = 1) {
                  const n = e.length;
                  let i = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    i = I(i) ^ (r >> 5);
                  }
                  i = I(i);
                  for (let t = 0; t < n; t++) i = I(i) ^ (31 & e.charCodeAt(t));
                  for (let e of t) i = I(i) ^ e;
                  for (let e = 0; e < 6; e++) i = I(i);
                  return (i ^= r), j.encode(v([i % k[30]], 30, 5, !1));
                }
                function R(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = T(5),
                    i = r.decode,
                    s = r.encode,
                    o = x(i);
                  function u(e, r, i = 90) {
                    a('bech32.encode prefix', e),
                      n(r) && (r = Array.from(r)),
                      l('bech32.encode', r);
                    const s = e.length;
                    if (0 === s) throw new TypeError(`Invalid prefix length ${s}`);
                    const o = s + 7 + r.length;
                    if (!1 !== i && o > i) throw new TypeError(`Length ${o} exceeds limit ${i}`);
                    const u = e.toLowerCase(),
                      c = C(u, r, t);
                    return `${u}1${j.encode(r)}${c}`;
                  }
                  function c(e, r = 90) {
                    a('bech32.decode input', e);
                    const n = e.length;
                    if (n < 8 || (!1 !== r && n > r))
                      throw new TypeError(`invalid string length: ${n} (${e}). Expected (8..${r})`);
                    const i = e.toLowerCase();
                    if (e !== i && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const s = i.lastIndexOf('1');
                    if (0 === s || -1 === s)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const o = i.slice(0, s),
                      u = i.slice(s + 1);
                    if (u.length < 6) throw new Error('Data must be at least 6 characters long');
                    const c = j.decode(u).slice(0, -6),
                      f = C(o, c, t);
                    if (!u.endsWith(f))
                      throw new Error(`Invalid checksum in ${e}: expected "${f}"`);
                    return { prefix: o, words: c };
                  }
                  return {
                    encode: u,
                    decode: c,
                    encodeFromBytes: function (e, t) {
                      return u(e, s(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = c(e, !1);
                      return { prefix: t, words: r, bytes: i(r) };
                    },
                    decodeUnsafe: x(c),
                    fromWords: i,
                    fromWordsUnsafe: o,
                    toWords: s,
                  };
                }
                (r.bech32 = R('bech32')),
                  (r.bech32m = R('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  });
                const O = (() =>
                    'function' == typeof Uint8Array.from([]).toHex &&
                    'function' == typeof Uint8Array.fromHex)(),
                  M = {
                    encode: e => (i(e), e.toHex()),
                    decode: e => (a('hex', e), Uint8Array.fromHex(e)),
                  };
                r.hex = O
                  ? M
                  : d(
                      T(4),
                      h('0123456789abcdef'),
                      p(''),
                      g(e => {
                        if ('string' != typeof e || e.length % 2 != 0)
                          throw new TypeError(
                            `hex.decode: expected string, got ${typeof e} with length ${e.length}`
                          );
                        return e.toLowerCase();
                      })
                    );
                const N = {
                    utf8: r.utf8,
                    hex: r.hex,
                    base16: r.base16,
                    base32: r.base32,
                    base64: r.base64,
                    base64url: r.base64url,
                    base58: r.base58,
                    base58xmr: r.base58xmr,
                  },
                  L =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !N.hasOwnProperty(e)) throw new TypeError(L);
                  if (!n(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return N[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!N.hasOwnProperty(e)) throw new TypeError(L);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return N[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@metamask/utils>@scure/base',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@metamask/utils/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      1768,
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
                function i(e) {
                  return (
                    e instanceof Uint8Array ||
                    (null != e && 'object' == typeof e && 'Uint8Array' === e.constructor.name)
                  );
                }
                function s(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function o(e) {
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
                function a(e = '') {
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
                function u(e, t = '=') {
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
                function c(e) {
                  if ('function' != typeof e) throw new Error('normalize fn should be function');
                  return { encode: e => e, decode: t => e(t) };
                }
                function f(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
                  if (!e.length) return [];
                  let i = 0;
                  const s = [],
                    o = Array.from(e);
                  for (
                    o.forEach(e => {
                      if ((n(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
                    });
                    ;

                  ) {
                    let e = 0,
                      n = !0;
                    for (let s = i; s < o.length; s++) {
                      const a = o[s],
                        u = t * e + a;
                      if (!Number.isSafeInteger(u) || (t * e) / t !== e || u - a != t * e)
                        throw new Error('convertRadix: carry overflow');
                      e = u % r;
                      const c = Math.floor(u / r);
                      if (((o[s] = c), !Number.isSafeInteger(c) || c * r + e !== u))
                        throw new Error('convertRadix: carry overflow');
                      n && (c ? (n = !1) : (i = s));
                    }
                    if ((s.push(e), n)) break;
                  }
                  for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) s.push(0);
                  return s.reverse();
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
                  d = (e, t) => e + (t - l(e, t));
                function h(e, t, r, i) {
                  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
                  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (d(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${d(t, r)}`
                    );
                  let s = 0,
                    o = 0;
                  const a = 2 ** r - 1,
                    u = [];
                  for (const i of e) {
                    if ((n(i), i >= 2 ** t))
                      throw new Error(`convertRadix2: invalid data word=${i} from=${t}`);
                    if (((s = (s << t) | i), o + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
                    for (o += t; o >= r; o -= r) u.push(((s >> (o - r)) & a) >>> 0);
                    s &= 2 ** o - 1;
                  }
                  if (((s = (s << (r - o)) & a), !i && o >= t)) throw new Error('Excess padding');
                  if (!i && s) throw new Error(`Non-zero padding: ${s}`);
                  return i && o > 0 && u.push(s >>> 0), u;
                }
                function p(e) {
                  return (
                    n(e),
                    {
                      encode: t => {
                        if (!i(t)) throw new Error('radix.encode input should be Uint8Array');
                        return f(Array.from(t), 256, e);
                      },
                      decode: t => {
                        if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                          throw new Error('radix.decode input should be array of numbers');
                        return Uint8Array.from(f(t, e, 256));
                      },
                    }
                  );
                }
                function m(e, t = !1) {
                  if ((n(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (d(8, e) > 32 || d(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!i(r)) throw new Error('radix2.encode input should be Uint8Array');
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
                      if (!i(r)) throw new Error('checksum.encode: input should be Uint8Array');
                      const n = t(r).slice(0, e),
                        s = new Uint8Array(r.length + e);
                      return s.set(r), s.set(n, r.length), s;
                    },
                    decode(r) {
                      if (!i(r)) throw new Error('checksum.decode: input should be Uint8Array');
                      const n = r.slice(0, -e),
                        s = t(n).slice(0, e),
                        o = r.slice(-e);
                      for (let t = 0; t < e; t++)
                        if (s[t] !== o[t]) throw new Error('Invalid checksum');
                      return n;
                    },
                  };
                }
                (r.utils = {
                  alphabet: o,
                  chain: s,
                  checksum: y,
                  convertRadix: f,
                  convertRadix2: h,
                  radix: p,
                  radix2: m,
                  join: a,
                  padding: u,
                }),
                  (r.base16 = s(m(4), o('0123456789ABCDEF'), a(''))),
                  (r.base32 = s(m(5), o('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), u(5), a(''))),
                  (r.base32nopad = s(m(5), o('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), a(''))),
                  (r.base32hex = s(m(5), o('0123456789ABCDEFGHIJKLMNOPQRSTUV'), u(5), a(''))),
                  (r.base32hexnopad = s(m(5), o('0123456789ABCDEFGHIJKLMNOPQRSTUV'), a(''))),
                  (r.base32crockford = s(
                    m(5),
                    o('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    a(''),
                    c(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  )),
                  (r.base64 = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    u(6),
                    a('')
                  )),
                  (r.base64nopad = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    a('')
                  )),
                  (r.base64url = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    u(6),
                    a('')
                  )),
                  (r.base64urlnopad = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    a('')
                  ));
                const b = e => s(p(58), o(e), a(''));
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
                      const i = e.subarray(n, n + 8);
                      t += r.base58.encode(i).padStart(w[i.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const i = e.slice(n, n + 11),
                        s = w.indexOf(i.length),
                        o = r.base58.decode(i);
                      for (let e = 0; e < o.length - s; e++)
                        if (0 !== o[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(o.slice(o.length - s)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  s(
                    y(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const k = s(o('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), a('')),
                  v = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function E(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < v.length; e++) 1 == ((t >> e) & 1) && (r ^= v[e]);
                  return r;
                }
                function T(e, t, r = 1) {
                  const n = e.length;
                  let i = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    i = E(i) ^ (r >> 5);
                  }
                  i = E(i);
                  for (let t = 0; t < n; t++) i = E(i) ^ (31 & e.charCodeAt(t));
                  for (let e of t) i = E(i) ^ e;
                  for (let e = 0; e < 6; e++) i = E(i);
                  return (i ^= r), k.encode(h([i % 2 ** 30], 30, 5, !1));
                }
                function x(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = m(5),
                    n = r.decode,
                    i = r.encode,
                    s = g(n);
                  function o(e, r, n = 90) {
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
                    const i = e.length + 7 + r.length;
                    if (!1 !== n && i > n) throw new TypeError(`Length ${i} exceeds limit ${n}`);
                    const s = e.toLowerCase(),
                      o = T(s, r, t);
                    return `${s}1${k.encode(r)}${o}`;
                  }
                  function a(e, r = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.decode input should be string, not ' + typeof e);
                    if (e.length < 8 || (!1 !== r && e.length > r))
                      throw new TypeError(
                        `Wrong string length: ${e.length} (${e}). Expected (8..${r})`
                      );
                    const n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const i = n.lastIndexOf('1');
                    if (0 === i || -1 === i)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const s = n.slice(0, i),
                      o = n.slice(i + 1);
                    if (o.length < 6) throw new Error('Data must be at least 6 characters long');
                    const a = k.decode(o).slice(0, -6),
                      u = T(s, a, t);
                    if (!o.endsWith(u))
                      throw new Error(`Invalid checksum in ${e}: expected "${u}"`);
                    return { prefix: s, words: a };
                  }
                  return {
                    encode: o,
                    decode: a,
                    encodeFromBytes: function (e, t) {
                      return o(e, i(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = a(e, !1);
                      return { prefix: t, words: r, bytes: n(r) };
                    },
                    decodeUnsafe: g(a),
                    fromWords: n,
                    fromWordsUnsafe: s,
                    toWords: i,
                  };
                }
                (r.bech32 = x('bech32')),
                  (r.bech32m = x('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  }),
                  (r.hex = s(
                    m(4),
                    o('0123456789abcdef'),
                    a(''),
                    c(e => {
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
                  A =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !_.hasOwnProperty(e)) throw new TypeError(A);
                  if (!i(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return _[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!_.hasOwnProperty(e)) throw new TypeError(A);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return _[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package: '@metamask/eth-sig-util>@scure/base',
        file: 'node_modules/@metamask/eth-sig-util/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      1769,
      { './simple-keyring.cjs': 1770 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var i = e('./simple-keyring.cjs');
                Object.defineProperty(r, 'default', {
                  enumerable: !0,
                  get: function () {
                    return n(i).default;
                  },
                });
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring',
        file: 'node_modules/@metamask/eth-simple-keyring/dist/index.cjs',
      },
    ],
    [
      1770,
      {
        '@ethereumjs/util': 477,
        '@metamask/eth-sig-util': 1792,
        '@metamask/utils': 2995,
        buffer: 4139,
        'ethereum-cryptography/keccak': 4366,
        randombytes: 5150,
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
                      i,
                      s,
                      o,
                      a =
                        (this && this.__classPrivateFieldSet) ||
                        function (e, t, r, n, i) {
                          if ('m' === n) throw new TypeError('Private method is not writable');
                          if ('a' === n && !i)
                            throw new TypeError('Private accessor was defined without a setter');
                          if ('function' == typeof t ? e !== t || !i : !t.has(e))
                            throw new TypeError(
                              'Cannot write private member to an object whose class did not declare it'
                            );
                          return 'a' === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
                        },
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
                      c =
                        (this && this.__importDefault) ||
                        function (e) {
                          return e && e.__esModule ? e : { default: e };
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 });
                    const f = e('@ethereumjs/util'),
                      l = e('@metamask/eth-sig-util'),
                      d = e('@metamask/utils'),
                      h = e('ethereum-cryptography/keccak'),
                      p = c(e('randombytes')),
                      m = 'Simple Key Pair';
                    class g {
                      constructor(e = []) {
                        n.add(this),
                          i.set(this, void 0),
                          (this.type = m),
                          a(this, i, [], 'f'),
                          this.deserialize(e).catch(e => {
                            throw new Error(`Problem deserializing SimpleKeyring ${e.message}`);
                          });
                      }
                      async serialize() {
                        return u(this, i, 'f').map(e => e.privateKey.toString('hex'));
                      }
                      async deserialize(e) {
                        a(
                          this,
                          i,
                          e.map(e => {
                            const r = (0, f.stripHexPrefix)(e),
                              n = t.from(r, 'hex');
                            return { privateKey: n, publicKey: t.from((0, f.privateToPublic)(n)) };
                          }),
                          'f'
                        );
                      }
                      async addAccounts(e = 1) {
                        const r = [];
                        for (let n = 0; n < e; n++) {
                          const e = y(),
                            n = t.from((0, f.privateToPublic)(e));
                          r.push({ privateKey: e, publicKey: n });
                        }
                        a(this, i, u(this, i, 'f').concat(r), 'f');
                        return r.map(({ publicKey: e }) =>
                          (0, d.add0x)((0, d.bytesToHex)((0, f.publicToAddress)(e)))
                        );
                      }
                      async getAccounts() {
                        return u(this, i, 'f').map(({ publicKey: e }) =>
                          (0, d.add0x)((0, d.bytesToHex)((0, f.publicToAddress)(e)))
                        );
                      }
                      async signTransaction(e, t, r = {}) {
                        const i = u(this, n, 'm', s).call(this, e, r);
                        return t.sign(i) ?? t;
                      }
                      async signEip7702Authorization(e, t, r = {}) {
                        const i = u(this, n, 'm', s).call(this, e, r);
                        return (0, l.signEIP7702Authorization)({ privateKey: i, authorization: t });
                      }
                      async signMessage(e, r, i = { withAppKeyOrigin: '', validateMessage: !0 }) {
                        const o = (0, f.stripHexPrefix)(r);
                        if (i.validateMessage && (0 === o.length || !o.match(/^[a-fA-F0-9]*$/u)))
                          throw new Error('Cannot sign invalid message');
                        const a = u(this, n, 'm', s).call(this, e, i),
                          c = (0, f.ecsign)(t.from(o, 'hex'), a);
                        return (0, l.concatSig)(
                          t.from((0, d.bigIntToBytes)(c.v)),
                          t.from(c.r),
                          t.from(c.s)
                        );
                      }
                      async signPersonalMessage(e, t, r = { withAppKeyOrigin: '' }) {
                        const i = u(this, n, 'm', s).call(this, e, r);
                        return (0, l.personalSign)({ privateKey: i, data: t });
                      }
                      async decryptMessage(e, t) {
                        const r = u(this, n, 'm', o).call(this, e).privateKey.toString('hex');
                        return (0, l.decrypt)({ privateKey: r, encryptedData: t });
                      }
                      async signTypedData(e, t, r = { version: l.SignTypedDataVersion.V1 }) {
                        let i = l.SignTypedDataVersion.V1;
                        r.version &&
                          (function (e) {
                            return e in l.SignTypedDataVersion;
                          })(r.version) &&
                          (i = l.SignTypedDataVersion[r.version]);
                        const o = u(this, n, 'm', s).call(this, e, r);
                        return (0, l.signTypedData)({ privateKey: o, data: t, version: i });
                      }
                      async getEncryptionPublicKey(e, t) {
                        const r = u(this, n, 'm', s).call(this, e, t);
                        return (0, l.getEncryptionPublicKey)(r.toString('hex'));
                      }
                      async getAppKeyAddress(e, t) {
                        if (!t || 'string' != typeof t)
                          throw new Error("'origin' must be a non-empty string");
                        const r = u(this, n, 'm', o).call(this, e, { withAppKeyOrigin: t });
                        return (0, d.add0x)((0, d.bytesToHex)((0, f.publicToAddress)(r.publicKey)));
                      }
                      async exportAccount(e, t = { withAppKeyOrigin: '' }) {
                        return u(this, n, 'm', o).call(this, e, t).privateKey.toString('hex');
                      }
                      removeAccount(e) {
                        if (
                          !u(this, i, 'f')
                            .map(({ publicKey: e }) =>
                              (0, d.bytesToHex)((0, f.publicToAddress)(e)).toLowerCase()
                            )
                            .includes(e.toLowerCase())
                        )
                          throw new Error(`Address ${e} not found in this keyring`);
                        a(
                          this,
                          i,
                          u(this, i, 'f').filter(
                            ({ publicKey: t }) =>
                              (0, d.bytesToHex)((0, f.publicToAddress)(t)).toLowerCase() !==
                              e.toLowerCase()
                          ),
                          'f'
                        );
                      }
                    }
                    function y() {
                      const e = (0, p.default)(32);
                      if (!(0, f.isValidPrivate)(e))
                        throw new Error(
                          'Private key does not satisfy the curve requirements (ie. it is invalid)'
                        );
                      return e;
                    }
                    (i = new WeakMap()),
                      (n = new WeakSet()),
                      (s = function (e, t = { withAppKeyOrigin: '' }) {
                        if (!e) throw new Error('Must specify address.');
                        return u(this, n, 'm', o).call(this, e, t).privateKey;
                      }),
                      (o = function (e, r = {}) {
                        const n = (0, l.normalize)(e);
                        let s = u(this, i, 'f').find(
                          ({ publicKey: e }) => (0, d.bytesToHex)((0, f.publicToAddress)(e)) === n
                        );
                        if (!s)
                          throw new Error('Simple Keyring - Unable to find matching address.');
                        if (r.withAppKeyOrigin) {
                          const { privateKey: e } = s,
                            n = t.from(r.withAppKeyOrigin, 'utf8'),
                            i = t.concat([e, n]),
                            o = (0, h.keccak256)(i),
                            a = (0, f.privateToPublic)(o);
                          s = { privateKey: t.from(o), publicKey: t.from(a) };
                        }
                        return s;
                      }),
                      (g.type = m),
                      (r.default = g);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring',
        file: 'node_modules/@metamask/eth-simple-keyring/dist/simple-keyring.cjs',
      },
    ],
    [
      1771,
      { './errors': 1772, './packer': 1775, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.decodeSingle = r.decode = r.encodePacked = r.encodeSingle = r.encode = void 0);
                const n = e('@metamask/utils'),
                  i = e('./errors'),
                  s = e('./packer');
                r.encode = (e, t, r, n) => {
                  try {
                    return (0, s.pack)({ types: e, values: t, packed: r, tight: n });
                  } catch (e) {
                    if (e instanceof i.ParserError)
                      throw new i.ParserError(`Unable to encode value: ${e.message}`, e);
                    throw new i.ParserError(
                      `An unexpected error occurred: ${(0, i.getErrorMessage)(e)}`,
                      e
                    );
                  }
                };
                r.encodeSingle = (e, t) => (0, r.encode)([e], [t]);
                r.encodePacked = (e, t, n) => (0, r.encode)(e, t, !0, n);
                r.decode = (e, t) => {
                  const r = (0, n.createBytes)(t);
                  try {
                    return (0, s.unpack)(e, r);
                  } catch (e) {
                    if (e instanceof i.ParserError)
                      throw new i.ParserError(`Unable to decode value: ${e.message}`, e);
                    throw new i.ParserError(
                      `An unexpected error occurred: ${(0, i.getErrorMessage)(e)}`,
                      e
                    );
                  }
                };
                r.decodeSingle = (e, t) => {
                  const s = (0, r.decode)([e], t);
                  return (
                    (0, n.assert)(
                      1 === s.length,
                      new i.ParserError('Decoded value array has unexpected length.')
                    ),
                    s[0]
                  );
                };
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/abi.js',
      },
    ],
    [
      1772,
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
                class i extends Error {
                  constructor(e, t) {
                    super(e), (this.name = 'ParserError');
                    const n = (0, r.getErrorStack)(t);
                    n && (this.stack = n);
                  }
                }
                r.ParserError = i;
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/errors.js',
      },
    ],
    [
      1773,
      { './abi': 1771, './errors': 1772, './types': 1788 },
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  i(e('./abi'), r),
                  i(e('./errors'), r),
                  i(e('./types'), r);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/index.js',
      },
    ],
    [
      1774,
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
                    const i = e => {
                        (0, n.assert)(e >= 0, 'Cannot skip a negative number of bytes.'),
                          (0, n.assert)(e % t == 0, 'Length must be a multiple of the size.'),
                          (r += e);
                      },
                      s = e.subarray(r);
                    yield { skip: i, value: s };
                  }
                  return { skip: () => undefined, value: new Uint8Array() };
                };
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/iterator.js',
      },
    ],
    [
      1775,
      {
        './errors': 1772,
        './iterator': 1774,
        './parsers': 1782,
        './utils': 1790,
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
                  i = e('./errors'),
                  s = e('./iterator'),
                  o = e('./parsers'),
                  a = e('./utils');
                r.getParser = e => {
                  const t = {
                      address: o.address,
                      array: o.array,
                      bool: o.bool,
                      bytes: o.bytes,
                      fixedBytes: o.fixedBytes,
                      function: o.fn,
                      number: o.number,
                      string: o.string,
                      tuple: o.tuple,
                    },
                    r = t[e];
                  if (r) return r;
                  const n = Object.values(t).find(t => t.isType(e));
                  if (n) return n;
                  throw new i.ParserError(`The type "${e}" is not supported.`);
                };
                r.isDynamicParser = (e, t) => {
                  const { isDynamic: r } = e;
                  return 'function' == typeof r ? r(t) : r;
                };
                r.pack = ({
                  types: e,
                  values: t,
                  packed: s = !1,
                  tight: o = !1,
                  arrayPacked: u = !1,
                  byteArray: c = new Uint8Array(),
                }) => {
                  (0, n.assert)(
                    e.length === t.length,
                    new i.ParserError(
                      `The number of types (${e.length}) does not match the number of values (${t.length}).`
                    )
                  );
                  const {
                    staticBuffer: f,
                    dynamicBuffer: l,
                    pointers: d,
                  } = e.reduce(
                    ({ staticBuffer: e, dynamicBuffer: i, pointers: a }, c, f) => {
                      const l = (0, r.getParser)(c),
                        d = t[f];
                      if (s || u || !(0, r.isDynamicParser)(l, c))
                        return {
                          staticBuffer: l.encode({
                            buffer: e,
                            value: d,
                            type: c,
                            packed: s,
                            tight: o,
                          }),
                          dynamicBuffer: i,
                          pointers: a,
                        };
                      return {
                        staticBuffer: (0, n.concatBytes)([e, new Uint8Array(32)]),
                        dynamicBuffer: l.encode({
                          buffer: i,
                          value: d,
                          type: c,
                          packed: s,
                          tight: o,
                        }),
                        pointers: [...a, { position: e.length, pointer: i.length }],
                      };
                    },
                    {
                      staticBuffer: new Uint8Array(),
                      dynamicBuffer: new Uint8Array(),
                      pointers: [],
                    }
                  );
                  (0, n.assert)(
                    (!s && !u) || 0 === l.length,
                    new i.ParserError('Invalid pack state.')
                  );
                  const h = f.length,
                    p = d.reduce((e, { pointer: t, position: r }) => {
                      const i = (0, a.padStart)((0, n.numberToBytes)(h + t));
                      return (0, a.set)(e, i, r);
                    }, f);
                  return (0, n.concatBytes)([c, p, l]);
                };
                r.unpack = (e, t) => {
                  const o = (0, s.iterate)(t);
                  return e.map(e => {
                    const {
                      value: { value: s, skip: a },
                      done: u,
                    } = o.next();
                    (0, n.assert)(
                      !u,
                      new i.ParserError(
                        `The encoded value is invalid for the provided types. Reached end of buffer while attempting to parse "${e}".`
                      )
                    );
                    const c = (0, r.getParser)(e);
                    if ((0, r.isDynamicParser)(c, e)) {
                      const r = (0, n.bytesToNumber)(s.subarray(0, 32)),
                        i = t.subarray(r);
                      return c.decode({ type: e, value: i, skip: a });
                    }
                    return c.decode({ type: e, value: s, skip: a });
                  });
                };
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/packer.js',
      },
    ],
    [
      1776,
      { '../errors': 1772, '../utils': 1790, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.address = r.getAddress = void 0);
                const n = e('@metamask/utils'),
                  i = e('../errors'),
                  s = e('../utils');
                (r.getAddress = e => {
                  const t = (0, n.createBytes)(e);
                  return (
                    (0, n.assert)(
                      t.length <= 20,
                      new i.ParserError(
                        `Invalid address value. Expected address to be 20 bytes long, but received ${t.length} bytes.`
                      )
                    ),
                    (0, s.padStart)(t, 20)
                  );
                }),
                  (r.address = {
                    isDynamic: !1,
                    isType: e => 'address' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: i }) {
                      const o = (0, r.getAddress)(t);
                      if (i) return (0, n.concatBytes)([e, o]);
                      const a = (0, s.padStart)(o);
                      return (0, n.concatBytes)([e, a]);
                    },
                    decode: ({ value: e }) => (0, n.add0x)((0, n.bytesToHex)(e.slice(12, 32))),
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/address.js',
      },
    ],
    [
      1777,
      {
        '../errors': 1772,
        '../packer': 1775,
        '../utils': 1790,
        './fixed-bytes': 1780,
        './tuple': 1786,
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
                  i = e('../errors'),
                  s = e('../packer'),
                  o = e('../utils'),
                  a = e('./fixed-bytes'),
                  u = e('./tuple'),
                  c = /^(?<type>.*)\[(?<length>\d*?)\]$/u;
                r.isArrayType = e => c.test(e);
                r.getArrayType = e => {
                  const t = e.match(c);
                  return (
                    (0, n.assert)(
                      t?.groups?.type,
                      new i.ParserError(
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
                      return n === undefined || (0, s.isDynamicParser)((0, s.getParser)(t), t);
                    },
                    isType: e => (0, r.isArrayType)(e),
                    getByteLength(e) {
                      (0, n.assert)(
                        (0, r.isArrayType)(e),
                        new i.ParserError(`Expected an array type, but received "${e}".`)
                      );
                      const [t, o] = (0, r.getArrayType)(e);
                      return (0, s.isDynamicParser)(this, e) || o === undefined
                        ? 32
                        : u.tuple.getByteLength((0, r.getTupleType)(t, o));
                    },
                    encode({ type: e, buffer: t, value: c, packed: f, tight: l }) {
                      const [d, h] = (0, r.getArrayType)(e);
                      if (
                        ((0, n.assert)(
                          !f || !(0, r.isArrayType)(d),
                          new i.ParserError('Cannot pack nested arrays.')
                        ),
                        f && (0, s.isDynamicParser)((0, s.getParser)(d), d))
                      )
                        return (0, s.pack)({
                          types: new Array(c.length).fill(d),
                          values: c,
                          byteArray: t,
                          packed: f,
                          arrayPacked: !0,
                          tight: l,
                        });
                      if (h)
                        return (
                          (0, n.assert)(
                            h === c.length,
                            new i.ParserError(
                              `Array length does not match type length. Expected a length of ${h}, but received ${c.length}.`
                            )
                          ),
                          u.tuple.encode({
                            type: (0, r.getTupleType)(d, h),
                            buffer: t,
                            value: c,
                            packed: a.fixedBytes.isType(d) && l,
                            tight: l,
                          })
                        );
                      if (f)
                        return (0, s.pack)({
                          types: new Array(c.length).fill(d),
                          values: c,
                          byteArray: t,
                          packed: a.fixedBytes.isType(d) && l,
                          arrayPacked: !0,
                          tight: l,
                        });
                      const p = (0, o.padStart)((0, n.numberToBytes)(c.length));
                      return (0, s.pack)({
                        types: new Array(c.length).fill(d),
                        values: c,
                        byteArray: (0, n.concatBytes)([t, p]),
                        packed: f,
                        tight: l,
                      });
                    },
                    decode({ type: e, value: t, ...o }) {
                      const [a, c] = (0, r.getArrayType)(e);
                      if (c) {
                        const e = u.tuple.decode({
                          type: (0, r.getTupleType)(a, c),
                          value: t,
                          ...o,
                        });
                        return (
                          (0, n.assert)(
                            e.length === c,
                            new i.ParserError(
                              `Array length does not match type length. Expected a length of ${c}, but received ${e.length}.`
                            )
                          ),
                          e
                        );
                      }
                      const f = (0, n.bytesToNumber)(t.subarray(0, 32));
                      return (0, s.unpack)(new Array(f).fill(a), t.subarray(32));
                    },
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/array.js',
      },
    ],
    [
      1778,
      {
        '../errors': 1772,
        './number': 1783,
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
                  i = e('@metamask/utils'),
                  s = e('../errors'),
                  o = e('./number'),
                  a = (0, n.coerce)(
                    (0, n.boolean)(),
                    (0, n.union)([(0, n.literal)('true'), (0, n.literal)('false')]),
                    e => 'true' === e
                  );
                (r.getBooleanValue = e => {
                  try {
                    return (0, n.create)(e, a) ? BigInt(1) : BigInt(0);
                  } catch {
                    throw new s.ParserError(
                      `Invalid boolean value. Expected a boolean literal, or the string "true" or "false", but received "${e}".`
                    );
                  }
                }),
                  (r.bool = {
                    isDynamic: !1,
                    isType: e => 'bool' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: n, tight: s }) {
                      const a = (0, r.getBooleanValue)(t);
                      return n
                        ? (0, i.concatBytes)([e, (0, i.bigIntToBytes)(a)])
                        : o.number.encode({
                            type: 'uint256',
                            buffer: e,
                            value: a,
                            packed: n,
                            tight: s,
                          });
                    },
                    decode: e => o.number.decode({ ...e, type: 'uint256' }) === BigInt(1),
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/bool.js',
      },
    ],
    [
      1779,
      { '../utils': 1790, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.bytes = void 0);
                const n = e('@metamask/utils'),
                  i = e('../utils');
                r.bytes = {
                  isDynamic: !0,
                  isType: e => 'bytes' === e,
                  getByteLength: () => 32,
                  encode({ buffer: e, value: t, packed: r }) {
                    const s = (0, n.createBytes)(t);
                    if (r) return (0, n.concatBytes)([e, s]);
                    const o = 32 * Math.ceil(s.byteLength / 32);
                    return (0, n.concatBytes)([
                      e,
                      (0, i.padStart)((0, n.numberToBytes)(s.byteLength)),
                      (0, i.padEnd)(s, o),
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/bytes.js',
      },
    ],
    [
      1780,
      { '../errors': 1772, '../utils': 1790, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.fixedBytes = r.getByteLength = void 0);
                const n = e('@metamask/utils'),
                  i = e('../errors'),
                  s = e('../utils'),
                  o = /^bytes([0-9]{1,2})$/u;
                (r.getByteLength = e => {
                  const t = e.match(o)?.[1];
                  (0, n.assert)(
                    t,
                    `Invalid byte length. Expected a number between 1 and 32, but received "${e}".`
                  );
                  const r = Number(t);
                  return (
                    (0, n.assert)(
                      r > 0 && r <= 32,
                      new i.ParserError(
                        `Invalid byte length. Expected a number between 1 and 32, but received "${e}".`
                      )
                    ),
                    r
                  );
                }),
                  (r.fixedBytes = {
                    isDynamic: !1,
                    isType: e => o.test(e),
                    getByteLength: () => 32,
                    encode({ type: e, buffer: t, value: o, packed: a }) {
                      const u = (0, r.getByteLength)(e),
                        c = (0, n.createBytes)(o);
                      return (
                        (0, n.assert)(
                          c.length <= u,
                          new i.ParserError(
                            `Expected a value of length ${u}, but received a value of length ${c.length}.`
                          )
                        ),
                        a
                          ? (0, n.concatBytes)([t, (0, s.padEnd)(c, u)])
                          : (0, n.concatBytes)([t, (0, s.padEnd)(c)])
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/fixed-bytes.js',
      },
    ],
    [
      1781,
      {
        '../errors': 1772,
        './fixed-bytes': 1780,
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
                  i = e('@metamask/utils'),
                  s = e('../errors'),
                  o = e('./fixed-bytes'),
                  a = (0, n.coerce)(
                    (0, n.object)({ address: i.StrictHexStruct, selector: i.StrictHexStruct }),
                    (0, n.union)([i.StrictHexStruct, (0, n.instance)(Uint8Array)]),
                    e => {
                      const t = (0, i.createBytes)(e);
                      return (
                        (0, i.assert)(
                          24 === t.length,
                          new s.ParserError(
                            `Invalid Solidity function. Expected function to be 24 bytes long, but received ${t.length} bytes.`
                          )
                        ),
                        {
                          address: (0, i.bytesToHex)(t.subarray(0, 20)),
                          selector: (0, i.bytesToHex)(t.subarray(20, 24)),
                        }
                      );
                    }
                  );
                (r.getFunction = e => {
                  const t = (0, n.create)(e, a);
                  return (0, i.concatBytes)([
                    (0, i.hexToBytes)(t.address),
                    (0, i.hexToBytes)(t.selector),
                  ]);
                }),
                  (r.fn = {
                    isDynamic: !1,
                    isType: e => 'function' === e,
                    getByteLength: () => 32,
                    encode({ buffer: e, value: t, packed: n, tight: i }) {
                      const s = (0, r.getFunction)(t);
                      return o.fixedBytes.encode({
                        type: 'bytes24',
                        buffer: e,
                        value: s,
                        packed: n,
                        tight: i,
                      });
                    },
                    decode: ({ value: e }) => ({
                      address: (0, i.bytesToHex)(e.slice(0, 20)),
                      selector: (0, i.bytesToHex)(e.slice(20, 24)),
                    }),
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/function.js',
      },
    ],
    [
      1782,
      {
        './address': 1776,
        './array': 1777,
        './bool': 1778,
        './bytes': 1779,
        './fixed-bytes': 1780,
        './function': 1781,
        './number': 1783,
        './parser': 1784,
        './string': 1785,
        './tuple': 1786,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  i(e('./address'), r),
                  i(e('./array'), r),
                  i(e('./bool'), r),
                  i(e('./bytes'), r),
                  i(e('./fixed-bytes'), r),
                  i(e('./function'), r),
                  i(e('./number'), r),
                  i(e('./parser'), r),
                  i(e('./string'), r),
                  i(e('./tuple'), r);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/index.js',
      },
    ],
    [
      1783,
      { '../errors': 1772, '../utils': 1790, '@metamask/utils': 2995 },
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
                  i = e('../errors'),
                  s = e('../utils'),
                  o = /^u?int(?<length>[0-9]*)?$/u;
                r.isSigned = e => !e.startsWith('u');
                r.getLength = e => {
                  if ('int' === e || 'uint' === e) return 256;
                  const t = e.match(o);
                  (0, n.assert)(
                    t?.groups?.length,
                    new i.ParserError(
                      `Invalid number type. Expected a number type, but received "${e}".`
                    )
                  );
                  const r = parseInt(t.groups.length, 10);
                  return (
                    (0, n.assert)(
                      r >= 8 && r <= 256,
                      new i.ParserError(
                        `Invalid number length. Expected a number between 8 and 256, but received "${e}".`
                      )
                    ),
                    (0, n.assert)(
                      r % 8 == 0,
                      new i.ParserError(
                        `Invalid number length. Expected a multiple of 8, but received "${e}".`
                      )
                    ),
                    r
                  );
                };
                r.assertNumberLength = (e, t) => {
                  const s = (0, r.getLength)(t),
                    o = BigInt(2) ** BigInt(s - ((0, r.isSigned)(t) ? 1 : 0)) - BigInt(1);
                  (0, r.isSigned)(t)
                    ? (0, n.assert)(
                        e >= -(o + BigInt(1)) && e <= o,
                        new i.ParserError(`Number "${e}" is out of range for type "${t}".`)
                      )
                    : (0, n.assert)(
                        e <= o,
                        new i.ParserError(`Number "${e}" is out of range for type "${t}".`)
                      );
                };
                (r.getBigInt = e => {
                  try {
                    return (0, n.createBigInt)(e);
                  } catch {
                    throw new i.ParserError(
                      `Invalid number. Expected a valid number value, but received "${e}".`
                    );
                  }
                }),
                  (r.number = {
                    isDynamic: !1,
                    isType: e => o.test(e),
                    getByteLength: () => 32,
                    encode({ type: e, buffer: t, value: i, packed: o }) {
                      const a = (0, r.getBigInt)(i);
                      if (((0, r.assertNumberLength)(a, e), (0, r.isSigned)(e))) {
                        if (o) {
                          const i = (0, r.getLength)(e) / 8;
                          return (0, n.concatBytes)([t, (0, n.signedBigIntToBytes)(a, i)]);
                        }
                        return (0, n.concatBytes)([
                          t,
                          (0, s.padStart)((0, n.signedBigIntToBytes)(a, 32)),
                        ]);
                      }
                      if (o) {
                        const i = (0, r.getLength)(e) / 8;
                        return (0, n.concatBytes)([t, (0, s.padStart)((0, n.bigIntToBytes)(a), i)]);
                      }
                      return (0, n.concatBytes)([t, (0, s.padStart)((0, n.bigIntToBytes)(a))]);
                    },
                    decode({ type: e, value: t }) {
                      const i = t.subarray(0, 32);
                      if ((0, r.isSigned)(e)) {
                        const t = (0, n.bytesToSignedBigInt)(i);
                        return (0, r.assertNumberLength)(t, e), t;
                      }
                      const s = (0, n.bytesToBigInt)(i);
                      return (0, r.assertNumberLength)(s, e), s;
                    },
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/number.js',
      },
    ],
    [
      1784,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/parser.js',
      },
    ],
    [
      1785,
      { './bytes': 1779, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.string = void 0);
                const n = e('@metamask/utils'),
                  i = e('./bytes');
                r.string = {
                  isDynamic: !0,
                  isType: e => 'string' === e,
                  getByteLength: () => 32,
                  encode: ({ buffer: e, value: t, packed: r, tight: s }) =>
                    i.bytes.encode({
                      type: 'bytes',
                      buffer: e,
                      value: (0, n.stringToBytes)(t),
                      packed: r,
                      tight: s,
                    }),
                  decode: e => (0, n.bytesToString)(i.bytes.decode(e)),
                };
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/string.js',
      },
    ],
    [
      1786,
      { '../errors': 1772, '../packer': 1775, '@metamask/utils': 2995 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.tuple = r.getTupleElements = void 0);
                const n = e('@metamask/utils'),
                  i = e('../errors'),
                  s = e('../packer'),
                  o = /^\((.+)\)$/u;
                (r.getTupleElements = e => {
                  (0, n.assert)(
                    e.startsWith('(') && e.endsWith(')'),
                    new i.ParserError(
                      `Invalid tuple type. Expected tuple type, but received "${e}".`
                    )
                  );
                  const t = [];
                  let r = '',
                    s = 0;
                  for (let n = 1; n < e.length - 1; n++) {
                    const i = e[n];
                    ',' === i && 0 === s
                      ? (t.push(r.trim()), (r = ''))
                      : ((r += i), '(' === i ? (s += 1) : ')' === i && (s -= 1));
                  }
                  return r.trim() && t.push(r.trim()), t;
                }),
                  (r.tuple = {
                    isDynamic: e =>
                      (0, r.getTupleElements)(e).some(e => {
                        const t = (0, s.getParser)(e);
                        return (0, s.isDynamicParser)(t, e);
                      }),
                    isType: e => (e => o.test(e))(e),
                    getByteLength(e) {
                      if ((0, s.isDynamicParser)(this, e)) return 32;
                      return (0, r.getTupleElements)(e).reduce(
                        (e, t) => e + (0, s.getParser)(t).getByteLength(t),
                        0
                      );
                    },
                    encode({ type: e, buffer: t, value: n, packed: i, tight: o }) {
                      const a = (0, r.getTupleElements)(e);
                      return (0, s.pack)({
                        types: a,
                        values: n,
                        byteArray: t,
                        packed: i,
                        tight: o,
                      });
                    },
                    decode({ type: e, value: t, skip: n }) {
                      const i = (0, r.getTupleElements)(e);
                      return n(this.getByteLength(e) - 32), (0, s.unpack)(i, t);
                    },
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/parsers/tuple.js',
      },
    ],
    [
      1787,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/types/abi.js',
      },
    ],
    [
      1788,
      { './abi': 1787 },
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), i(e('./abi'), r);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/types/index.js',
      },
    ],
    [
      1789,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/utils/buffer.js',
      },
    ],
    [
      1790,
      { './buffer': 1789 },
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }), i(e('./buffer'), r);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@metamask/abi-utils',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/abi-utils/dist/utils/index.js',
      },
    ],
    [
      1791,
      { './utils': 1796, '@scure/base': 1812, buffer: 4139, tweetnacl: 5686 },
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
                              var i = Object.getOwnPropertyDescriptor(t, r);
                              (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                                (i = {
                                  enumerable: !0,
                                  get: function () {
                                    return t[r];
                                  },
                                }),
                                Object.defineProperty(e, n, i);
                            }
                          : function (e, t, r, n) {
                              n === undefined && (n = r), (e[n] = t[r]);
                            }),
                      i =
                        (this && this.__setModuleDefault) ||
                        (Object.create
                          ? function (e, t) {
                              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                            }
                          : function (e, t) {
                              e.default = t;
                            }),
                      s =
                        (this && this.__importStar) ||
                        function (e) {
                          if (e && e.__esModule) return e;
                          var t = {};
                          if (null != e)
                            for (var r in e)
                              'default' !== r &&
                                Object.prototype.hasOwnProperty.call(e, r) &&
                                n(t, e, r);
                          return i(t, e), t;
                        };
                    Object.defineProperty(r, '__esModule', { value: !0 }),
                      (r.getEncryptionPublicKey =
                        r.decryptSafely =
                        r.decrypt =
                        r.encryptSafely =
                        r.encrypt =
                          void 0);
                    const o = e('@scure/base'),
                      a = s(e('tweetnacl')),
                      u = e('./utils');
                    function c({ publicKey: e, data: t, version: r }) {
                      if ((0, u.isNullish)(e)) throw new Error('Missing publicKey parameter');
                      if ((0, u.isNullish)(t)) throw new Error('Missing data parameter');
                      if ((0, u.isNullish)(r)) throw new Error('Missing version parameter');
                      if ('x25519-xsalsa20-poly1305' === r) {
                        if ('string' != typeof t)
                          throw new Error('Message data must be given as a string');
                        const r = a.box.keyPair();
                        let n;
                        try {
                          n = o.base64.decode(e);
                        } catch (e) {
                          throw new Error('Bad public key');
                        }
                        const i = o.utf8.decode(t),
                          s = a.randomBytes(a.box.nonceLength),
                          u = a.box(i, s, n, r.secretKey);
                        return {
                          version: 'x25519-xsalsa20-poly1305',
                          nonce: o.base64.encode(s),
                          ephemPublicKey: o.base64.encode(r.publicKey),
                          ciphertext: o.base64.encode(u),
                        };
                      }
                      throw new Error('Encryption type/version not supported');
                    }
                    function f({ encryptedData: e, privateKey: r }) {
                      if ((0, u.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                      if ((0, u.isNullish)(r)) throw new Error('Missing privateKey parameter');
                      if ('x25519-xsalsa20-poly1305' === e.version) {
                        const n = t.from(r, 'hex'),
                          i = a.box.keyPair.fromSecretKey(n).secretKey,
                          s = o.base64.decode(e.nonce),
                          u = o.base64.decode(e.ciphertext),
                          c = o.base64.decode(e.ephemPublicKey),
                          f = a.box.open(u, s, c, i);
                        try {
                          if (!f) throw new Error();
                          const e = o.utf8.encode(f);
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
                    (r.encrypt = c),
                      (r.encryptSafely = function ({ publicKey: e, data: r, version: n }) {
                        if ((0, u.isNullish)(e)) throw new Error('Missing publicKey parameter');
                        if ((0, u.isNullish)(r)) throw new Error('Missing data parameter');
                        if ((0, u.isNullish)(n)) throw new Error('Missing version parameter');
                        if ('object' == typeof r && r && 'toJSON' in r)
                          throw new Error(
                            'Cannot encrypt with toJSON property.  Please remove toJSON property'
                          );
                        const i = { data: r, padding: '' },
                          s = t.byteLength(JSON.stringify(i), 'utf-8') % 2048;
                        let o = 0;
                        return (
                          s > 0 && (o = 2048 - s - 16),
                          (i.padding = '0'.repeat(o)),
                          c({ publicKey: e, data: JSON.stringify(i), version: n })
                        );
                      }),
                      (r.decrypt = f),
                      (r.decryptSafely = function ({ encryptedData: e, privateKey: t }) {
                        if ((0, u.isNullish)(e)) throw new Error('Missing encryptedData parameter');
                        if ((0, u.isNullish)(t)) throw new Error('Missing privateKey parameter');
                        return JSON.parse(f({ encryptedData: e, privateKey: t })).data;
                      }),
                      (r.getEncryptionPublicKey = function (e) {
                        const r = t.from(e, 'hex'),
                          n = a.box.keyPair.fromSecretKey(r).publicKey;
                        return o.base64.encode(n);
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/dist/encryption.js',
      },
    ],
    [
      1792,
      {
        './encryption': 1791,
        './personal-sign': 1793,
        './sign-eip7702-authorization': 1794,
        './sign-typed-data': 1795,
        './utils': 1796,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.normalize = r.concatSig = void 0),
                  i(e('./personal-sign'), r),
                  i(e('./sign-typed-data'), r),
                  i(e('./encryption'), r),
                  i(e('./sign-eip7702-authorization'), r);
                var s = e('./utils');
                Object.defineProperty(r, 'concatSig', {
                  enumerable: !0,
                  get: function () {
                    return s.concatSig;
                  },
                }),
                  Object.defineProperty(r, 'normalize', {
                    enumerable: !0,
                    get: function () {
                      return s.normalize;
                    },
                  });
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/dist/index.js',
      },
    ],
    [
      1793,
      { './utils': 1796, '@ethereumjs/util': 1804 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.extractPublicKey = r.recoverPersonalSignature = r.personalSign = void 0);
                const n = e('@ethereumjs/util'),
                  i = e('./utils');
                function s(e, t) {
                  const r = (0, n.hashPersonalMessage)((0, i.legacyToBuffer)(e));
                  return (0, i.recoverPublicKey)(r, t);
                }
                (r.personalSign = function ({ privateKey: e, data: t }) {
                  if ((0, i.isNullish)(t)) throw new Error('Missing data parameter');
                  if ((0, i.isNullish)(e)) throw new Error('Missing privateKey parameter');
                  const r = (0, i.legacyToBuffer)(t),
                    s = (0, n.hashPersonalMessage)(r),
                    o = (0, n.ecsign)(s, e);
                  return (0, i.concatSig)((0, n.toBuffer)(o.v), o.r, o.s);
                }),
                  (r.recoverPersonalSignature = function ({ data: e, signature: t }) {
                    if ((0, i.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, i.isNullish)(t)) throw new Error('Missing signature parameter');
                    const r = s(e, t),
                      o = (0, n.publicToAddress)(r);
                    return (0, n.bufferToHex)(o);
                  }),
                  (r.extractPublicKey = function ({ data: e, signature: t }) {
                    if ((0, i.isNullish)(e)) throw new Error('Missing data parameter');
                    if ((0, i.isNullish)(t)) throw new Error('Missing signature parameter');
                    return `0x${s(e, t).toString('hex')}`;
                  });
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/dist/personal-sign.js',
      },
    ],
    [
      1794,
      {
        './utils': 1796,
        '@ethereumjs/rlp': 449,
        '@ethereumjs/util': 1804,
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
                      i = e('@ethereumjs/util'),
                      s = e('@metamask/utils'),
                      o = e('ethereum-cryptography/keccak'),
                      a = e('./utils');
                    function u(e) {
                      c(e);
                      const r = (0, n.encode)(e),
                        i = t.concat([t.from('05', 'hex'), r]);
                      return t.from((0, o.keccak256)(i));
                    }
                    function c(e) {
                      if ((0, a.isNullish)(e)) throw new Error('Missing authorization parameter');
                      const [t, r, n] = e;
                      if ((0, a.isNullish)(t)) throw new Error('Missing chainId parameter');
                      if ((0, a.isNullish)(r)) throw new Error('Missing contractAddress parameter');
                      if ((0, a.isNullish)(n)) throw new Error('Missing nonce parameter');
                    }
                    (r.signEIP7702Authorization = function ({ privateKey: e, authorization: t }) {
                      if ((c(t), (0, a.isNullish)(e)))
                        throw new Error('Missing privateKey parameter');
                      const r = u(t),
                        { r: n, s: s, v: o } = (0, i.ecsign)(r, e),
                        f = (0, i.toBuffer)(o);
                      return (0, a.concatSig)(f, n, s);
                    }),
                      (r.recoverEIP7702Authorization = function ({
                        signature: e,
                        authorization: t,
                      }) {
                        if ((c(t), (0, a.isNullish)(e)))
                          throw new Error('Missing signature parameter');
                        const r = u(t),
                          n = (0, a.recoverPublicKey)(r, e),
                          o = (0, i.publicToAddress)(n);
                        return (0, s.bytesToHex)(o);
                      }),
                      (r.hashEIP7702Authorization = u);
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/dist/sign-eip7702-authorization.js',
      },
    ],
    [
      1795,
      {
        './utils': 1796,
        '@ethereumjs/util': 1804,
        '@metamask/abi-utils': 1773,
        '@metamask/abi-utils/dist/parsers': 1782,
        '@metamask/abi-utils/dist/utils': 1790,
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
                  i = e('@metamask/abi-utils'),
                  s = e('@metamask/abi-utils/dist/parsers'),
                  o = e('@metamask/abi-utils/dist/utils'),
                  a = e('@metamask/utils'),
                  u = e('ethereum-cryptography/keccak'),
                  c = e('./utils');
                var f;
                function l(e, t) {
                  if (!Object.keys(f).includes(e)) throw new Error(`Invalid version: '${e}'`);
                  if (t && !t.includes(e))
                    throw new Error(
                      `SignTypedDataVersion not allowed: '${e}'. Allowed versions are: ${t.join(', ')}`
                    );
                }
                function d(e, t) {
                  (0, a.assert)(
                    null !== t,
                    `Unable to encode value: Invalid number. Expected a valid number value, but received "${t}".`
                  );
                  const r = BigInt(t),
                    n = (0, s.getLength)(e),
                    i = BigInt(2) ** BigInt(n) - BigInt(1);
                  return (
                    (0, a.assert)(
                      r >= -i && r <= i,
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
                  return (0, o.padStart)((0, a.bigIntToBytes)(t), 20);
                }
                function p(e, t, r, s, c) {
                  if ((l(c, [f.V3, f.V4]), e[r] !== undefined))
                    return [
                      'bytes32',
                      c === f.V4 && null == s
                        ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                        : (0, n.arrToBufArr)((0, u.keccak256)(m(r, s, e, c))),
                    ];
                  if ('function' === r) throw new Error('Unsupported or invalid type: "function"');
                  if (s === undefined) throw new Error(`missing value for field ${t} of type ${r}`);
                  if ('address' === r) {
                    if ('number' == typeof s)
                      return ['address', (0, o.padStart)((0, a.numberToBytes)(s), 20)];
                    if ((0, a.isStrictHexString)(s)) return ['address', (0, a.add0x)(s)];
                    if ('string' == typeof s) return ['address', h(s).subarray(0, 20)];
                  }
                  if ('bool' === r) return ['bool', Boolean(s)];
                  if ('bytes' === r)
                    return (
                      'number' == typeof s
                        ? (s = (0, a.numberToBytes)(s))
                        : (0, a.isStrictHexString)(s) || '0x' === s
                          ? (s = (0, a.hexToBytes)(s))
                          : 'string' == typeof s && (s = (0, a.stringToBytes)(s)),
                      ['bytes32', (0, n.arrToBufArr)((0, u.keccak256)(s))]
                    );
                  if (r.startsWith('bytes') && 'bytes' !== r && !r.includes('['))
                    return 'number' == typeof s
                      ? s < 0
                        ? ['bytes32', new Uint8Array(32)]
                        : ['bytes32', (0, a.bigIntToBytes)(BigInt(s))]
                      : (0, a.isStrictHexString)(s)
                        ? ['bytes32', (0, a.hexToBytes)(s)]
                        : ['bytes32', s];
                  if (r.startsWith('int') && !r.includes('[')) {
                    const e = d(r, s);
                    return e >= BigInt(0) ? ['uint256', e] : ['int256', e];
                  }
                  if ('string' === r)
                    return (
                      (s =
                        'number' == typeof s
                          ? (0, a.numberToBytes)(s)
                          : (0, a.stringToBytes)(null != s ? s : '')),
                      ['bytes32', (0, n.arrToBufArr)((0, u.keccak256)(s))]
                    );
                  if (r.endsWith(']')) {
                    if (c === f.V3)
                      throw new Error('Arrays are unimplemented in encodeData; use V4 extension');
                    const o = r.slice(0, r.lastIndexOf('[')),
                      a = s.map(r => p(e, t, o, r, c));
                    return [
                      'bytes32',
                      (0, n.arrToBufArr)(
                        (0, u.keccak256)(
                          (0, i.encode)(
                            a.map(([e]) => e),
                            a.map(([, e]) => e)
                          )
                        )
                      ),
                    ];
                  }
                  return [r, s];
                }
                function m(e, t, r, s) {
                  l(s, [f.V3, f.V4]);
                  const o = ['bytes32'],
                    a = [w(e, r)];
                  for (const n of r[e]) {
                    if (s === f.V3 && t[n.name] === undefined) continue;
                    const [e, i] = p(r, n.name, n.type, t[n.name], s);
                    o.push(e), a.push(i);
                  }
                  return (0, n.arrToBufArr)((0, i.encode)(o, a));
                }
                function g(e, t) {
                  let r = '';
                  const n = y(e, t);
                  n.delete(e);
                  const i = [e, ...Array.from(n).sort()];
                  for (const e of i) {
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
                function b(e, t, r, i) {
                  l(i, [f.V3, f.V4]);
                  const s = m(e, t, r, i),
                    o = (0, u.keccak256)(s);
                  return (0, n.arrToBufArr)(o);
                }
                function w(e, t) {
                  const r = (0, a.stringToBytes)(g(e, t));
                  return (0, n.arrToBufArr)((0, u.keccak256)(r));
                }
                function k(e) {
                  const t = {};
                  for (const n in r.TYPED_MESSAGE_SCHEMA.properties) e[n] && (t[n] = e[n]);
                  return (
                    'types' in t && (t.types = Object.assign({ EIP712Domain: [] }, t.types)), t
                  );
                }
                function v(e, t) {
                  l(t, [f.V3, f.V4]);
                  const r = k(e),
                    { domain: n } = r;
                  return b('EIP712Domain', n, { EIP712Domain: r.types.EIP712Domain }, t);
                }
                function E(e, t) {
                  if ((0, s.isArrayType)(e) && Array.isArray(t)) {
                    const [r] = (0, s.getArrayType)(e);
                    return t.map(e => E(r, e));
                  }
                  if ('address' === e) {
                    if ((0, a.isStrictHexString)(t))
                      return (0, o.padStart)((0, a.hexToBytes)(t).subarray(0, 20), 20);
                    if (t instanceof Uint8Array) return (0, o.padStart)(t.subarray(0, 20), 20);
                  }
                  if ('bool' === e) return Boolean(t);
                  if (e.startsWith('bytes') && 'bytes' !== e) {
                    const r = (0, s.getByteLength)(e);
                    if ('number' == typeof t)
                      return t < 0 ? new Uint8Array() : (0, a.numberToBytes)(t).subarray(0, r);
                    if ((0, a.isStrictHexString)(t)) return (0, a.hexToBytes)(t).subarray(0, r);
                    if (t instanceof Uint8Array) return t.subarray(0, r);
                  }
                  if (e.startsWith('uint') && 'number' == typeof t) return Math.abs(t);
                  if (e.startsWith('int') && 'number' == typeof t) {
                    const r = (0, s.getLength)(e);
                    return BigInt.asIntN(r, BigInt(t));
                  }
                  return t;
                }
                function T(e, t) {
                  return t.map(t => {
                    if ('string' == typeof t || 'number' == typeof t || 'bigint' == typeof t) {
                      const r = d(e, t);
                      if (r >= BigInt(0)) return (0, o.padStart)((0, a.bigIntToBytes)(r), 32);
                      const n = (0, s.getLength)(e),
                        i = BigInt.asIntN(n, r);
                      return (0, a.signedBigIntToBytes)(i, 32);
                    }
                    return t;
                  });
                }
                function x(e) {
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
                                ? (0, o.padStart)((0, a.numberToBytes)(e), 32)
                                : (0, a.isStrictHexString)(e)
                                  ? (0, o.padStart)((0, a.hexToBytes)(e).subarray(0, 32), 32)
                                  : e instanceof Uint8Array
                                    ? (0, o.padStart)(e.subarray(0, 32), 32)
                                    : e
                            )),
                        };
                      var n;
                      if (t.startsWith('int') && (0, s.isArrayType)(t)) {
                        const [n, i] = (0, s.getArrayType)(t);
                        return { name: e, type: `bytes32[${null != i ? i : ''}]`, value: T(n, r) };
                      }
                      return { name: e, type: t, value: E(t, r) };
                    }),
                    f = r.map(e => ('bytes' !== e.type ? e.value : (0, c.legacyToBuffer)(e.value))),
                    l = r.map(e => {
                      if ('function' === e.type)
                        throw new Error('Unsupported or invalid type: "function"');
                      return e.type;
                    }),
                    d = e.map(e => {
                      if (!e.name) throw t;
                      return `${e.type} ${e.name}`;
                    });
                  return (0, n.arrToBufArr)(
                    (0, u.keccak256)(
                      (0, i.encodePacked)(
                        ['bytes32', 'bytes32'],
                        [
                          (0, u.keccak256)((0, i.encodePacked)(['string[]'], [d], !0)),
                          (0, u.keccak256)((0, i.encodePacked)(l, f, !0)),
                        ]
                      )
                    )
                  );
                }
                !(function (e) {
                  (e.V1 = 'V1'), (e.V3 = 'V3'), (e.V4 = 'V4');
                })((f = r.SignTypedDataVersion || (r.SignTypedDataVersion = {}))),
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
                    sanitizeData: k,
                    eip712Hash: function (e, t) {
                      l(t, [f.V3, f.V4]);
                      const r = k(e),
                        i = [(0, a.hexToBytes)('1901')];
                      return (
                        i.push(v(e, t)),
                        'EIP712Domain' !== r.primaryType &&
                          i.push(b(r.primaryType, r.message, r.types, t)),
                        (0, n.arrToBufArr)((0, u.keccak256)((0, a.concatBytes)(i)))
                      );
                    },
                    eip712DomainHash: v,
                  }),
                  (r.typedSignatureHash = function (e) {
                    const t = x(e);
                    return (0, a.bytesToHex)(t);
                  }),
                  (r.signTypedData = function ({ privateKey: e, data: t, version: i }) {
                    if ((l(i), (0, c.isNullish)(t))) throw new Error('Missing data parameter');
                    if ((0, c.isNullish)(e)) throw new Error('Missing private key parameter');
                    const s = i === f.V1 ? x(t) : r.TypedDataUtils.eip712Hash(t, i),
                      o = (0, n.ecsign)(s, e);
                    return (0, c.concatSig)(
                      (0, n.arrToBufArr)((0, a.bigIntToBytes)(o.v)),
                      o.r,
                      o.s
                    );
                  }),
                  (r.recoverTypedSignature = function ({ data: e, signature: t, version: i }) {
                    if ((l(i), (0, c.isNullish)(e))) throw new Error('Missing data parameter');
                    if ((0, c.isNullish)(t)) throw new Error('Missing signature parameter');
                    const s = i === f.V1 ? x(e) : r.TypedDataUtils.eip712Hash(e, i),
                      o = (0, c.recoverPublicKey)(s, t),
                      u = (0, n.publicToAddress)(o);
                    return (0, a.bytesToHex)(u);
                  });
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/dist/sign-typed-data.js',
      },
    ],
    [
      1796,
      { '@ethereumjs/util': 1804, '@metamask/utils': 2995, buffer: 4139 },
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
                      i = e('@metamask/utils');
                    function s(e, t) {
                      if ('' !== e && !/^[a-f0-9]+$/iu.test(e))
                        throw new Error(`Expected an unprefixed hex string. Received: ${e}`);
                      if (t < 0)
                        throw new Error(
                          `Expected a non-negative integer target length. Received: ${t}`
                        );
                      return String.prototype.padStart.call(e, t, '0');
                    }
                    function o(e) {
                      return null === e || e === undefined;
                    }
                    (r.padWithZeroes = s),
                      (r.isNullish = o),
                      (r.legacyToBuffer = function (e) {
                        return 'string' != typeof e || (0, n.isHexString)(e)
                          ? (0, n.toBuffer)(e)
                          : t.from(e);
                      }),
                      (r.concatSig = function (e, t, r) {
                        const o = (0, n.fromSigned)(t),
                          a = (0, n.fromSigned)(r),
                          u = (0, n.bufferToInt)(e),
                          c = s((0, n.toUnsigned)(o).toString('hex'), 64),
                          f = s((0, n.toUnsigned)(a).toString('hex'), 64),
                          l = (0, i.remove0x)((0, i.numberToHex)(u));
                        return (0, i.add0x)(c.concat(f, l));
                      }),
                      (r.recoverPublicKey = function (e, t) {
                        const r = (0, n.fromRpcSig)(t);
                        return (0, n.ecrecover)(e, r.v, r.r, r.s);
                      }),
                      (r.normalize = function (e) {
                        if (o(e)) return undefined;
                        if ('number' == typeof e) {
                          if (e < 0) return '0x';
                          const t = (0, i.numberToBytes)(e);
                          e = (0, i.bytesToHex)(t);
                        }
                        if ('string' != typeof e) {
                          let t = 'eth-sig-util.normalize() requires hex string or integer input.';
                          throw ((t += ` received ${typeof e}: ${e}`), new Error(t));
                        }
                        return (0, i.add0x)(e.toLowerCase());
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/dist/utils.js',
      },
    ],
    [
      1797,
      {
        './bytes': 1800,
        './constants': 1801,
        './helpers': 1803,
        './internal': 1805,
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
                      i = e('ethereum-cryptography/keccak'),
                      s = e('ethereum-cryptography/secp256k1'),
                      o = e('ethereum-cryptography/utils'),
                      a = e('./bytes'),
                      u = e('./constants'),
                      c = e('./helpers'),
                      f = e('./internal'),
                      l = BigInt(0);
                    class d {
                      constructor(e = l, t = l, r = u.KECCAK256_RLP, n = u.KECCAK256_NULL) {
                        (this.nonce = e),
                          (this.balance = t),
                          (this.storageRoot = r),
                          (this.codeHash = n),
                          this._validate();
                      }
                      static fromAccountData(e) {
                        const { nonce: t, balance: r, storageRoot: n, codeHash: i } = e;
                        return new d(
                          t !== undefined ? (0, a.bufferToBigInt)((0, a.toBuffer)(t)) : undefined,
                          r !== undefined ? (0, a.bufferToBigInt)((0, a.toBuffer)(r)) : undefined,
                          n !== undefined ? (0, a.toBuffer)(n) : undefined,
                          i !== undefined ? (0, a.toBuffer)(i) : undefined
                        );
                      }
                      static fromRlpSerializedAccount(e) {
                        const t = (0, a.arrToBufArr)(n.RLP.decode(Uint8Array.from(e)));
                        if (!Array.isArray(t))
                          throw new Error('Invalid serialized account input. Must be array');
                        return this.fromValuesArray(t);
                      }
                      static fromValuesArray(e) {
                        const [t, r, n, i] = e;
                        return new d((0, a.bufferToBigInt)(t), (0, a.bufferToBigInt)(r), n, i);
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
                          (0, a.bigIntToUnpaddedBuffer)(this.nonce),
                          (0, a.bigIntToUnpaddedBuffer)(this.balance),
                          this.storageRoot,
                          this.codeHash,
                        ];
                      }
                      serialize() {
                        return t.from(n.RLP.encode((0, a.bufArrToArr)(this.raw())));
                      }
                      isContract() {
                        return !this.codeHash.equals(u.KECCAK256_NULL);
                      }
                      isEmpty() {
                        return (
                          this.balance === l &&
                          this.nonce === l &&
                          this.codeHash.equals(u.KECCAK256_NULL)
                        );
                      }
                    }
                    r.Account = d;
                    r.isValidAddress = function (e) {
                      try {
                        (0, c.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return /^0x[0-9a-fA-F]{40}$/.test(e);
                    };
                    r.toChecksumAddress = function (e, r) {
                      (0, c.assertIsHexString)(e);
                      const n = (0, f.stripHexPrefix)(e).toLowerCase();
                      let s = '';
                      if (r !== undefined) {
                        s = (0, a.bufferToBigInt)((0, a.toBuffer)(r)).toString() + '0x';
                      }
                      const u = t.from(s + n, 'utf8'),
                        l = (0, o.bytesToHex)((0, i.keccak256)(u));
                      let d = '0x';
                      for (let e = 0; e < n.length; e++)
                        parseInt(l[e], 16) >= 8 ? (d += n[e].toUpperCase()) : (d += n[e]);
                      return d;
                    };
                    r.isValidChecksumAddress = function (e, t) {
                      return (0, r.isValidAddress)(e) && (0, r.toChecksumAddress)(e, t) === e;
                    };
                    r.generateAddress = function (e, r) {
                      return (
                        (0, c.assertIsBuffer)(e),
                        (0, c.assertIsBuffer)(r),
                        (0, a.bufferToBigInt)(r) === BigInt(0)
                          ? t
                              .from((0, i.keccak256)(n.RLP.encode((0, a.bufArrToArr)([e, null]))))
                              .slice(-20)
                          : t
                              .from((0, i.keccak256)(n.RLP.encode((0, a.bufArrToArr)([e, r]))))
                              .slice(-20)
                      );
                    };
                    r.generateAddress2 = function (e, r, n) {
                      if (
                        ((0, c.assertIsBuffer)(e),
                        (0, c.assertIsBuffer)(r),
                        (0, c.assertIsBuffer)(n),
                        20 !== e.length)
                      )
                        throw new Error('Expected from to be of length 20');
                      if (32 !== r.length) throw new Error('Expected salt to be of length 32');
                      const s = (0, i.keccak256)(
                        t.concat([t.from('ff', 'hex'), e, r, (0, i.keccak256)(n)])
                      );
                      return (0, a.toBuffer)(s).slice(-20);
                    };
                    r.isValidPrivate = function (e) {
                      return s.secp256k1.utils.isValidPrivateKey(e);
                    };
                    r.isValidPublic = function (e, r = !1) {
                      if (((0, c.assertIsBuffer)(e), 64 === e.length))
                        try {
                          return (
                            s.secp256k1.ProjectivePoint.fromHex(t.concat([t.from([4]), e])), !0
                          );
                        } catch (e) {
                          return !1;
                        }
                      if (!r) return !1;
                      try {
                        return s.secp256k1.ProjectivePoint.fromHex(e), !0;
                      } catch (e) {
                        return !1;
                      }
                    };
                    (r.pubToAddress = function (e, r = !1) {
                      if (
                        ((0, c.assertIsBuffer)(e),
                        r &&
                          64 !== e.length &&
                          (e = t.from(
                            s.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        64 !== e.length)
                      )
                        throw new Error('Expected pubKey to be of length 64');
                      return t.from((0, i.keccak256)(e)).slice(-20);
                    }),
                      (r.publicToAddress = r.pubToAddress);
                    r.privateToPublic = function (e) {
                      return (
                        (0, c.assertIsBuffer)(e),
                        t.from(
                          s.secp256k1.ProjectivePoint.fromPrivateKey(e).toRawBytes(!1).slice(1)
                        )
                      );
                    };
                    r.privateToAddress = function (e) {
                      return (0, r.publicToAddress)((0, r.privateToPublic)(e));
                    };
                    r.importPublic = function (e) {
                      return (
                        (0, c.assertIsBuffer)(e),
                        64 !== e.length &&
                          (e = t.from(
                            s.secp256k1.ProjectivePoint.fromHex(e).toRawBytes(!1).slice(1)
                          )),
                        e
                      );
                    };
                    r.zeroAddress = function () {
                      const e = (0, a.zeros)(20);
                      return (0, a.bufferToHex)(e);
                    };
                    function h(e) {
                      const [t, r, n, i] = e;
                      return [
                        t,
                        r,
                        0 === (0, a.arrToBufArr)(n).length ? u.KECCAK256_RLP : n,
                        0 === (0, a.arrToBufArr)(i).length ? u.KECCAK256_NULL : i,
                      ];
                    }
                    (r.isZeroAddress = function (e) {
                      try {
                        (0, c.assertIsString)(e);
                      } catch (e) {
                        return !1;
                      }
                      return (0, r.zeroAddress)() === e;
                    }),
                      (r.accountBodyFromSlim = h);
                    const p = new Uint8Array(0);
                    (r.accountBodyToSlim = function (e) {
                      const [t, r, n, i] = e;
                      return [
                        t,
                        r,
                        (0, a.arrToBufArr)(n).equals(u.KECCAK256_RLP) ? p : n,
                        (0, a.arrToBufArr)(i).equals(u.KECCAK256_NULL) ? p : i,
                      ];
                    }),
                      (r.accountBodyToRLP = function (e, t = !0) {
                        const r = t ? h(e) : e;
                        return (0, a.arrToBufArr)(n.RLP.encode(r));
                      });
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/account.js',
      },
    ],
    [
      1798,
      { './account': 1797, './bytes': 1800, buffer: 4139 },
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
                      i = e('./bytes');
                    class s {
                      constructor(e) {
                        if (20 !== e.length) throw new Error('Invalid address length');
                        this.buf = e;
                      }
                      static zero() {
                        return new s((0, i.zeros)(20));
                      }
                      static fromString(e) {
                        if (!(0, n.isValidAddress)(e)) throw new Error('Invalid address');
                        return new s((0, i.toBuffer)(e));
                      }
                      static fromPublicKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Public key should be Buffer');
                        const r = (0, n.pubToAddress)(e);
                        return new s(r);
                      }
                      static fromPrivateKey(e) {
                        if (!t.isBuffer(e)) throw new Error('Private key should be Buffer');
                        const r = (0, n.privateToAddress)(e);
                        return new s(r);
                      }
                      static generate(e, t) {
                        if ('bigint' != typeof t) throw new Error('Expected nonce to be a bigint');
                        return new s((0, n.generateAddress)(e.buf, (0, i.bigIntToBuffer)(t)));
                      }
                      static generate2(e, r, i) {
                        if (!t.isBuffer(r)) throw new Error('Expected salt to be a Buffer');
                        if (!t.isBuffer(i)) throw new Error('Expected initCode to be a Buffer');
                        return new s((0, n.generateAddress2)(e.buf, r, i));
                      }
                      equals(e) {
                        return this.buf.equals(e.buf);
                      }
                      isZero() {
                        return this.equals(s.zero());
                      }
                      isPrecompileOrSystemAddress() {
                        const e = (0, i.bufferToBigInt)(this.buf),
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
                    r.Address = s;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/address.js',
      },
    ],
    [
      1799,
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
                class i extends n.EventEmitter {
                  emit(e, ...t) {
                    let [r, n] = t;
                    const i = this;
                    let s = i._events[e] ?? [];
                    return (
                      n === undefined && 'function' == typeof r && ((n = r), (r = undefined)),
                      ('newListener' !== e && 'removeListener' !== e) ||
                        ((r = { event: r, fn: n }), (n = undefined)),
                      (s = Array.isArray(s) ? s : [s]),
                      (async function (e, t, r) {
                        let n;
                        for await (const i of t)
                          try {
                            i.length < 2
                              ? i.call(e, r)
                              : await new Promise((t, n) => {
                                  i.call(e, r, e => {
                                    e ? n(e) : t();
                                  });
                                });
                          } catch (e) {
                            n = e;
                          }
                        if (n) throw n;
                      })(i, s.slice(), r)
                        .then(n)
                        .catch(n),
                      i.listenerCount(e) > 0
                    );
                  }
                  once(e, t) {
                    const r = this;
                    let n;
                    if ('function' != typeof t) throw new TypeError('listener must be a function');
                    return (
                      (n =
                        t.length >= 2
                          ? function (i, s) {
                              r.removeListener(e, n), t(i, s);
                            }
                          : function (i) {
                              r.removeListener(e, n), t(i, n);
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
                    let i,
                      s,
                      o = this._events[e] ?? [];
                    const a = 'after' === n ? 1 : 0;
                    if ('function' != typeof r) throw new TypeError('listener must be a function');
                    if ('function' != typeof t) throw new TypeError('target must be a function');
                    for (
                      Array.isArray(o) || (this._events[e] = o = [o]), s = o.length, i = o.length;
                      i--;

                    )
                      if (o[i] === t) {
                        s = i + a;
                        break;
                      }
                    return o.splice(s, 0, r), this;
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
                r.AsyncEventEmitter = i;
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/asyncEventEmitter.js',
      },
    ],
    [
      1800,
      { './helpers': 1803, './internal': 1805, buffer: 4139 },
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
                      i = e('./internal');
                    r.intToHex = function (e) {
                      if (!Number.isSafeInteger(e) || e < 0)
                        throw new Error(`Received an invalid integer type: ${e}`);
                      return `0x${e.toString(16)}`;
                    };
                    r.intToBuffer = function (e) {
                      const n = (0, r.intToHex)(e);
                      return t.from((0, i.padToEven)(n.slice(2)), 'hex');
                    };
                    r.zeros = function (e) {
                      return t.allocUnsafe(e).fill(0);
                    };
                    const s = function (e, t, n) {
                      const i = (0, r.zeros)(t);
                      return n
                        ? e.length < t
                          ? (e.copy(i), i)
                          : e.slice(0, t)
                        : e.length < t
                          ? (e.copy(i, t - e.length), i)
                          : e.slice(-t);
                    };
                    r.setLengthLeft = function (e, t) {
                      return (0, n.assertIsBuffer)(e), s(e, t, !1);
                    };
                    r.setLengthRight = function (e, t) {
                      return (0, n.assertIsBuffer)(e), s(e, t, !0);
                    };
                    const o = function (e) {
                      let t = e[0];
                      for (; e.length > 0 && '0' === t.toString(); ) t = (e = e.slice(1))[0];
                      return e;
                    };
                    r.unpadBuffer = function (e) {
                      return (0, n.assertIsBuffer)(e), o(e);
                    };
                    r.unpadArray = function (e) {
                      return (0, n.assertIsArray)(e), o(e);
                    };
                    r.unpadHexString = function (e) {
                      return (
                        (0, n.assertIsHexString)(e), (e = (0, i.stripHexPrefix)(e)), '0x' + o(e)
                      );
                    };
                    r.toBuffer = function (e) {
                      if (null === e || e === undefined) return t.allocUnsafe(0);
                      if (t.isBuffer(e)) return t.from(e);
                      if (Array.isArray(e) || e instanceof Uint8Array) return t.from(e);
                      if ('string' == typeof e) {
                        if (!(0, i.isHexString)(e))
                          throw new Error(
                            `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${e}`
                          );
                        return t.from((0, i.padToEven)((0, i.stripHexPrefix)(e)), 'hex');
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
                    function a(e) {
                      const t = (0, r.bufferToHex)(e);
                      return '0x' === t ? BigInt(0) : BigInt(t);
                    }
                    function u(e) {
                      return (0, r.toBuffer)('0x' + e.toString(16));
                    }
                    (r.bufferToHex = function (e) {
                      return '0x' + (e = (0, r.toBuffer)(e)).toString('hex');
                    }),
                      (r.bufferToBigInt = a),
                      (r.bigIntToBuffer = u);
                    r.bufferToInt = function (e) {
                      const t = Number(a(e));
                      if (!Number.isSafeInteger(t)) throw new Error('Number exceeds 53 bits');
                      return t;
                    };
                    r.fromSigned = function (e) {
                      return BigInt.asIntN(256, a(e));
                    };
                    r.toUnsigned = function (e) {
                      return u(BigInt.asUintN(256, e));
                    };
                    (r.addHexPrefix = function (e) {
                      return 'string' != typeof e || (0, i.isHexPrefixed)(e) ? e : '0x' + e;
                    }),
                      (r.short = function (e, r = 50) {
                        const n = t.isBuffer(e) ? e.toString('hex') : e;
                        return n.length <= r ? n : n.slice(0, r) + '…';
                      });
                    r.toUtf8 = function (e) {
                      if ((e = (0, i.stripHexPrefix)(e)).length % 2 != 0)
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
                        return (0, r.unpadBuffer)(u(e));
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/bytes.js',
      },
    ],
    [
      1801,
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
                  i = e('ethereum-cryptography/secp256k1');
                (r.MAX_UINT64 = BigInt('0xffffffffffffffff')),
                  (r.MAX_INTEGER = BigInt(
                    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                  )),
                  (r.MAX_INTEGER_BIGINT = BigInt(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                  )),
                  (r.SECP256K1_ORDER = i.secp256k1.CURVE.n),
                  (r.SECP256K1_ORDER_DIV_2 = i.secp256k1.CURVE.n / BigInt(2)),
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/constants.js',
      },
    ],
    [
      1802,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/encoding.js',
      },
    ],
    [
      1803,
      { '../../../../../../../../../is-buffer/index.js': 4723, './internal': 1805 },
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/helpers.js',
      },
    ],
    [
      1804,
      {
        './account': 1797,
        './address': 1798,
        './asyncEventEmitter': 1799,
        './bytes': 1800,
        './constants': 1801,
        './encoding': 1802,
        './internal': 1805,
        './lock': 1806,
        './provider': 1807,
        './signature': 1808,
        './types': 1809,
        './units': 1810,
        './withdrawal': 1811,
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
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
                  i(e('./constants'), r),
                  i(e('./units'), r),
                  i(e('./account'), r),
                  i(e('./address'), r),
                  i(e('./withdrawal'), r),
                  i(e('./signature'), r),
                  i(e('./bytes'), r),
                  i(e('./types'), r),
                  i(e('./encoding'), r),
                  i(e('./asyncEventEmitter'), r);
                var s = e('./internal');
                Object.defineProperty(r, 'arrayContainsArray', {
                  enumerable: !0,
                  get: function () {
                    return s.arrayContainsArray;
                  },
                }),
                  Object.defineProperty(r, 'fromAscii', {
                    enumerable: !0,
                    get: function () {
                      return s.fromAscii;
                    },
                  }),
                  Object.defineProperty(r, 'fromUtf8', {
                    enumerable: !0,
                    get: function () {
                      return s.fromUtf8;
                    },
                  }),
                  Object.defineProperty(r, 'getBinarySize', {
                    enumerable: !0,
                    get: function () {
                      return s.getBinarySize;
                    },
                  }),
                  Object.defineProperty(r, 'getKeys', {
                    enumerable: !0,
                    get: function () {
                      return s.getKeys;
                    },
                  }),
                  Object.defineProperty(r, 'isHexPrefixed', {
                    enumerable: !0,
                    get: function () {
                      return s.isHexPrefixed;
                    },
                  }),
                  Object.defineProperty(r, 'isHexString', {
                    enumerable: !0,
                    get: function () {
                      return s.isHexString;
                    },
                  }),
                  Object.defineProperty(r, 'padToEven', {
                    enumerable: !0,
                    get: function () {
                      return s.padToEven;
                    },
                  }),
                  Object.defineProperty(r, 'stripHexPrefix', {
                    enumerable: !0,
                    get: function () {
                      return s.stripHexPrefix;
                    },
                  }),
                  Object.defineProperty(r, 'toAscii', {
                    enumerable: !0,
                    get: function () {
                      return s.toAscii;
                    },
                  }),
                  i(e('./lock'), r),
                  i(e('./provider'), r);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/index.js',
      },
    ],
    [
      1805,
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
                        for (let i = 0; i < e.length; i++) {
                          let s = e[i][t];
                          if (!0 !== r || s) {
                            if ('string' != typeof s)
                              throw new Error(
                                "invalid abi - expected type 'string', received " + typeof s
                              );
                          } else s = '';
                          n.push(s);
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/internal.js',
      },
    ],
    [
      1806,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/lock.js',
      },
    ],
    [
      1807,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/provider.js',
      },
    ],
    [
      1808,
      {
        './bytes': 1800,
        './constants': 1801,
        './helpers': 1803,
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
                      i = e('ethereum-cryptography/secp256k1'),
                      s = e('./bytes'),
                      o = e('./constants'),
                      a = e('./helpers');
                    function u(e, t) {
                      return e === BigInt(0) || e === BigInt(1)
                        ? e
                        : t === undefined
                          ? e - BigInt(27)
                          : e - (t * BigInt(2) + BigInt(35));
                    }
                    function c(e) {
                      return e === BigInt(0) || e === BigInt(1);
                    }
                    r.ecsign = function (e, r, n) {
                      const s = i.secp256k1.sign(e, r),
                        o = s.toCompactRawBytes();
                      return {
                        r: t.from(o.slice(0, 32)),
                        s: t.from(o.slice(32, 64)),
                        v:
                          n === undefined
                            ? BigInt(s.recovery + 27)
                            : BigInt(s.recovery + 35) + BigInt(n) * BigInt(2),
                      };
                    };
                    r.ecrecover = function (e, r, n, o, a) {
                      const f = t.concat(
                          [(0, s.setLengthLeft)(n, 32), (0, s.setLengthLeft)(o, 32)],
                          64
                        ),
                        l = u(r, a);
                      if (!c(l)) throw new Error('Invalid signature v value');
                      const d = i.secp256k1.Signature.fromCompact(f)
                        .addRecoveryBit(Number(l))
                        .recoverPublicKey(e);
                      return t.from(d.toRawBytes(!1).slice(1));
                    };
                    r.toRpcSig = function (e, r, n, i) {
                      if (!c(u(e, i))) throw new Error('Invalid signature v value');
                      return (0, s.bufferToHex)(
                        t.concat([
                          (0, s.setLengthLeft)(r, 32),
                          (0, s.setLengthLeft)(n, 32),
                          (0, s.toBuffer)(e),
                        ])
                      );
                    };
                    r.toCompactSig = function (e, r, n, i) {
                      if (!c(u(e, i))) throw new Error('Invalid signature v value');
                      let o = n;
                      return (
                        ((e > BigInt(28) && e % BigInt(2) === BigInt(1)) ||
                          e === BigInt(1) ||
                          e === BigInt(28)) &&
                          ((o = t.from(n)), (o[0] |= 128)),
                        (0, s.bufferToHex)(
                          t.concat([(0, s.setLengthLeft)(r, 32), (0, s.setLengthLeft)(o, 32)])
                        )
                      );
                    };
                    r.fromRpcSig = function (e) {
                      const t = (0, s.toBuffer)(e);
                      let r, n, i;
                      if (t.length >= 65)
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (i = (0, s.bufferToBigInt)(t.slice(64)));
                      else {
                        if (64 !== t.length) throw new Error('Invalid signature length');
                        (r = t.slice(0, 32)),
                          (n = t.slice(32, 64)),
                          (i = BigInt((0, s.bufferToInt)(t.slice(32, 33)) >> 7)),
                          (n[0] &= 127);
                      }
                      return i < 27 && (i += BigInt(27)), { v: i, r: r, s: n };
                    };
                    r.isValidSignature = function (e, t, r, n = !0, i) {
                      if (32 !== t.length || 32 !== r.length) return !1;
                      if (!c(u(e, i))) return !1;
                      const a = (0, s.bufferToBigInt)(t),
                        f = (0, s.bufferToBigInt)(r);
                      return (
                        !(
                          a === BigInt(0) ||
                          a >= o.SECP256K1_ORDER ||
                          f === BigInt(0) ||
                          f >= o.SECP256K1_ORDER
                        ) && !(n && f >= o.SECP256K1_ORDER_DIV_2)
                      );
                    };
                    r.hashPersonalMessage = function (e) {
                      (0, a.assertIsBuffer)(e);
                      const r = t.from(`Ethereum Signed Message:\n${e.length}`, 'utf-8');
                      return t.from((0, n.keccak256)(t.concat([r, e])));
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/signature.js',
      },
    ],
    [
      1809,
      { './bytes': 1800, './internal': 1805 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.toType = r.TypeOutput = void 0);
                const n = e('./bytes'),
                  i = e('./internal');
                var s;
                !(function (e) {
                  (e[(e.Number = 0)] = 'Number'),
                    (e[(e.BigInt = 1)] = 'BigInt'),
                    (e[(e.Buffer = 2)] = 'Buffer'),
                    (e[(e.PrefixedHexString = 3)] = 'PrefixedHexString');
                })((s = r.TypeOutput || (r.TypeOutput = {}))),
                  (r.toType = function (e, t) {
                    if (null === e) return null;
                    if (e === undefined) return undefined;
                    if ('string' == typeof e && !(0, i.isHexString)(e))
                      throw new Error(`A string must be provided with a 0x-prefix, given: ${e}`);
                    if ('number' == typeof e && !Number.isSafeInteger(e))
                      throw new Error(
                        'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                      );
                    const r = (0, n.toBuffer)(e);
                    switch (t) {
                      case s.Buffer:
                        return r;
                      case s.BigInt:
                        return (0, n.bufferToBigInt)(r);
                      case s.Number: {
                        const e = (0, n.bufferToBigInt)(r);
                        if (e > BigInt(Number.MAX_SAFE_INTEGER))
                          throw new Error(
                            'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                          );
                        return Number(e);
                      }
                      case s.PrefixedHexString:
                        return (0, n.bufferToHex)(r);
                      default:
                        throw new Error('unknown outputType');
                    }
                  });
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/types.js',
      },
    ],
    [
      1810,
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
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/units.js',
      },
    ],
    [
      1811,
      { './address': 1798, './bytes': 1800, './types': 1809, buffer: 4139 },
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
                      i = e('./bytes'),
                      s = e('./types');
                    class o {
                      constructor(e, t, r, n) {
                        (this.index = e),
                          (this.validatorIndex = t),
                          (this.address = r),
                          (this.amount = n);
                      }
                      static fromWithdrawalData(e) {
                        const { index: t, validatorIndex: r, address: i, amount: a } = e,
                          u = (0, s.toType)(t, s.TypeOutput.BigInt),
                          c = (0, s.toType)(r, s.TypeOutput.BigInt),
                          f = new n.Address((0, s.toType)(i, s.TypeOutput.Buffer)),
                          l = (0, s.toType)(a, s.TypeOutput.BigInt);
                        return new o(u, c, f, l);
                      }
                      static fromValuesArray(e) {
                        if (4 !== e.length)
                          throw Error(
                            `Invalid withdrawalArray length expected=4 actual=${e.length}`
                          );
                        const [t, r, n, i] = e;
                        return o.fromWithdrawalData({
                          index: t,
                          validatorIndex: r,
                          address: n,
                          amount: i,
                        });
                      }
                      static toBufferArray(e) {
                        const { index: r, validatorIndex: i, address: o, amount: a } = e,
                          u =
                            (0, s.toType)(r, s.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, s.toType)(r, s.TypeOutput.Buffer),
                          c =
                            (0, s.toType)(i, s.TypeOutput.BigInt) === BigInt(0)
                              ? t.alloc(0)
                              : (0, s.toType)(i, s.TypeOutput.Buffer);
                        let f;
                        f = o instanceof n.Address ? o.buf : (0, s.toType)(o, s.TypeOutput.Buffer);
                        return [
                          u,
                          c,
                          f,
                          (0, s.toType)(a, s.TypeOutput.BigInt) === BigInt(0)
                            ? t.alloc(0)
                            : (0, s.toType)(a, s.TypeOutput.Buffer),
                        ];
                      }
                      raw() {
                        return o.toBufferArray(this);
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
                          index: (0, i.bigIntToHex)(this.index),
                          validatorIndex: (0, i.bigIntToHex)(this.validatorIndex),
                          address: '0x' + this.address.buf.toString('hex'),
                          amount: (0, i.bigIntToHex)(this.amount),
                        };
                      }
                    }
                    r.Withdrawal = o;
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@ethereumjs/util',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@metamask/eth-sig-util/node_modules/@ethereumjs/util/dist/withdrawal.js',
      },
    ],
    [
      1812,
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
                function i(e) {
                  return (
                    e instanceof Uint8Array ||
                    (null != e && 'object' == typeof e && 'Uint8Array' === e.constructor.name)
                  );
                }
                function s(...e) {
                  const t = e => e,
                    r = (e, t) => r => e(t(r));
                  return {
                    encode: e.map(e => e.encode).reduceRight(r, t),
                    decode: e.map(e => e.decode).reduce(r, t),
                  };
                }
                function o(e) {
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
                function a(e = '') {
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
                function u(e, t = '=') {
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
                function c(e) {
                  if ('function' != typeof e) throw new Error('normalize fn should be function');
                  return { encode: e => e, decode: t => e(t) };
                }
                function f(e, t, r) {
                  if (t < 2)
                    throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
                  if (r < 2)
                    throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);
                  if (!Array.isArray(e)) throw new Error('convertRadix: data should be array');
                  if (!e.length) return [];
                  let i = 0;
                  const s = [],
                    o = Array.from(e);
                  for (
                    o.forEach(e => {
                      if ((n(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
                    });
                    ;

                  ) {
                    let e = 0,
                      n = !0;
                    for (let s = i; s < o.length; s++) {
                      const a = o[s],
                        u = t * e + a;
                      if (!Number.isSafeInteger(u) || (t * e) / t !== e || u - a != t * e)
                        throw new Error('convertRadix: carry overflow');
                      e = u % r;
                      const c = Math.floor(u / r);
                      if (((o[s] = c), !Number.isSafeInteger(c) || c * r + e !== u))
                        throw new Error('convertRadix: carry overflow');
                      n && (c ? (n = !1) : (i = s));
                    }
                    if ((s.push(e), n)) break;
                  }
                  for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) s.push(0);
                  return s.reverse();
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
                  d = (e, t) => e + (t - l(e, t));
                function h(e, t, r, i) {
                  if (!Array.isArray(e)) throw new Error('convertRadix2: data should be array');
                  if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
                  if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
                  if (d(t, r) > 32)
                    throw new Error(
                      `convertRadix2: carry overflow from=${t} to=${r} carryBits=${d(t, r)}`
                    );
                  let s = 0,
                    o = 0;
                  const a = 2 ** r - 1,
                    u = [];
                  for (const i of e) {
                    if ((n(i), i >= 2 ** t))
                      throw new Error(`convertRadix2: invalid data word=${i} from=${t}`);
                    if (((s = (s << t) | i), o + t > 32))
                      throw new Error(`convertRadix2: carry overflow pos=${o} from=${t}`);
                    for (o += t; o >= r; o -= r) u.push(((s >> (o - r)) & a) >>> 0);
                    s &= 2 ** o - 1;
                  }
                  if (((s = (s << (r - o)) & a), !i && o >= t)) throw new Error('Excess padding');
                  if (!i && s) throw new Error(`Non-zero padding: ${s}`);
                  return i && o > 0 && u.push(s >>> 0), u;
                }
                function p(e) {
                  return (
                    n(e),
                    {
                      encode: t => {
                        if (!i(t)) throw new Error('radix.encode input should be Uint8Array');
                        return f(Array.from(t), 256, e);
                      },
                      decode: t => {
                        if (!Array.isArray(t) || (t.length && 'number' != typeof t[0]))
                          throw new Error('radix.decode input should be array of numbers');
                        return Uint8Array.from(f(t, e, 256));
                      },
                    }
                  );
                }
                function m(e, t = !1) {
                  if ((n(e), e <= 0 || e > 32))
                    throw new Error('radix2: bits should be in (0..32]');
                  if (d(8, e) > 32 || d(e, 8) > 32) throw new Error('radix2: carry overflow');
                  return {
                    encode: r => {
                      if (!i(r)) throw new Error('radix2.encode input should be Uint8Array');
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
                      if (!i(r)) throw new Error('checksum.encode: input should be Uint8Array');
                      const n = t(r).slice(0, e),
                        s = new Uint8Array(r.length + e);
                      return s.set(r), s.set(n, r.length), s;
                    },
                    decode(r) {
                      if (!i(r)) throw new Error('checksum.decode: input should be Uint8Array');
                      const n = r.slice(0, -e),
                        s = t(n).slice(0, e),
                        o = r.slice(-e);
                      for (let t = 0; t < e; t++)
                        if (s[t] !== o[t]) throw new Error('Invalid checksum');
                      return n;
                    },
                  };
                }
                (r.utils = {
                  alphabet: o,
                  chain: s,
                  checksum: y,
                  convertRadix: f,
                  convertRadix2: h,
                  radix: p,
                  radix2: m,
                  join: a,
                  padding: u,
                }),
                  (r.base16 = s(m(4), o('0123456789ABCDEF'), a(''))),
                  (r.base32 = s(m(5), o('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), u(5), a(''))),
                  (r.base32nopad = s(m(5), o('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), a(''))),
                  (r.base32hex = s(m(5), o('0123456789ABCDEFGHIJKLMNOPQRSTUV'), u(5), a(''))),
                  (r.base32hexnopad = s(m(5), o('0123456789ABCDEFGHIJKLMNOPQRSTUV'), a(''))),
                  (r.base32crockford = s(
                    m(5),
                    o('0123456789ABCDEFGHJKMNPQRSTVWXYZ'),
                    a(''),
                    c(e => e.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1'))
                  )),
                  (r.base64 = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    u(6),
                    a('')
                  )),
                  (r.base64nopad = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'),
                    a('')
                  )),
                  (r.base64url = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    u(6),
                    a('')
                  )),
                  (r.base64urlnopad = s(
                    m(6),
                    o('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
                    a('')
                  ));
                const b = e => s(p(58), o(e), a(''));
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
                      const i = e.subarray(n, n + 8);
                      t += r.base58.encode(i).padStart(w[i.length], '1');
                    }
                    return t;
                  },
                  decode(e) {
                    let t = [];
                    for (let n = 0; n < e.length; n += 11) {
                      const i = e.slice(n, n + 11),
                        s = w.indexOf(i.length),
                        o = r.base58.decode(i);
                      for (let e = 0; e < o.length - s; e++)
                        if (0 !== o[e]) throw new Error('base58xmr: wrong padding');
                      t = t.concat(Array.from(o.slice(o.length - s)));
                    }
                    return Uint8Array.from(t);
                  },
                };
                (r.createBase58check = e =>
                  s(
                    y(4, t => e(e(t))),
                    r.base58
                  )),
                  (r.base58check = r.createBase58check);
                const k = s(o('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), a('')),
                  v = [996825010, 642813549, 513874426, 1027748829, 705979059];
                function E(e) {
                  const t = e >> 25;
                  let r = (33554431 & e) << 5;
                  for (let e = 0; e < v.length; e++) 1 == ((t >> e) & 1) && (r ^= v[e]);
                  return r;
                }
                function T(e, t, r = 1) {
                  const n = e.length;
                  let i = 1;
                  for (let t = 0; t < n; t++) {
                    const r = e.charCodeAt(t);
                    if (r < 33 || r > 126) throw new Error(`Invalid prefix (${e})`);
                    i = E(i) ^ (r >> 5);
                  }
                  i = E(i);
                  for (let t = 0; t < n; t++) i = E(i) ^ (31 & e.charCodeAt(t));
                  for (let e of t) i = E(i) ^ e;
                  for (let e = 0; e < 6; e++) i = E(i);
                  return (i ^= r), k.encode(h([i % 2 ** 30], 30, 5, !1));
                }
                function x(e) {
                  const t = 'bech32' === e ? 1 : 734539939,
                    r = m(5),
                    n = r.decode,
                    i = r.encode,
                    s = g(n);
                  function o(e, r, n = 90) {
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
                    const i = e.length + 7 + r.length;
                    if (!1 !== n && i > n) throw new TypeError(`Length ${i} exceeds limit ${n}`);
                    const s = e.toLowerCase(),
                      o = T(s, r, t);
                    return `${s}1${k.encode(r)}${o}`;
                  }
                  function a(e, r = 90) {
                    if ('string' != typeof e)
                      throw new Error('bech32.decode input should be string, not ' + typeof e);
                    if (e.length < 8 || (!1 !== r && e.length > r))
                      throw new TypeError(
                        `Wrong string length: ${e.length} (${e}). Expected (8..${r})`
                      );
                    const n = e.toLowerCase();
                    if (e !== n && e !== e.toUpperCase())
                      throw new Error('String must be lowercase or uppercase');
                    const i = n.lastIndexOf('1');
                    if (0 === i || -1 === i)
                      throw new Error('Letter "1" must be present between prefix and data only');
                    const s = n.slice(0, i),
                      o = n.slice(i + 1);
                    if (o.length < 6) throw new Error('Data must be at least 6 characters long');
                    const a = k.decode(o).slice(0, -6),
                      u = T(s, a, t);
                    if (!o.endsWith(u))
                      throw new Error(`Invalid checksum in ${e}: expected "${u}"`);
                    return { prefix: s, words: a };
                  }
                  return {
                    encode: o,
                    decode: a,
                    encodeFromBytes: function (e, t) {
                      return o(e, i(t));
                    },
                    decodeToBytes: function (e) {
                      const { prefix: t, words: r } = a(e, !1);
                      return { prefix: t, words: r, bytes: n(r) };
                    },
                    decodeUnsafe: g(a),
                    fromWords: n,
                    fromWordsUnsafe: s,
                    toWords: i,
                  };
                }
                (r.bech32 = x('bech32')),
                  (r.bech32m = x('bech32m')),
                  (r.utf8 = {
                    encode: e => new TextDecoder().decode(e),
                    decode: e => new TextEncoder().encode(e),
                  }),
                  (r.hex = s(
                    m(4),
                    o('0123456789abcdef'),
                    a(''),
                    c(e => {
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
                  A =
                    'Invalid encoding type. Available types: utf8, hex, base16, base32, base64, base64url, base58, base58xmr';
                (r.bytesToString = (e, t) => {
                  if ('string' != typeof e || !_.hasOwnProperty(e)) throw new TypeError(A);
                  if (!i(t)) throw new TypeError('bytesToString() expects Uint8Array');
                  return _[e].encode(t);
                }),
                  (r.str = r.bytesToString);
                (r.stringToBytes = (e, t) => {
                  if (!_.hasOwnProperty(e)) throw new TypeError(A);
                  if ('string' != typeof t) throw new TypeError('stringToBytes() expects string');
                  return _[e].decode(t);
                }),
                  (r.bytes = r.stringToBytes);
              };
            };
      },
      {
        package:
          '@metamask/keyring-controller>@metamask/eth-simple-keyring>@metamask/eth-sig-util>@scure/base',
        file: 'node_modules/@metamask/eth-simple-keyring/node_modules/@scure/base/lib/index.js',
      },
    ],
    [
      185,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.BaseStore = void 0);
                r.BaseStore = class {};
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/stores/base-store.ts' },
    ],
    [
      186,
      { './base-store': 185, loglevel: 4929, 'webextension-polyfill': 5766 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n = o(e('webextension-polyfill')),
                  i = o(e('loglevel')),
                  s = e('./base-store');
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function a(e, t, r) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(e, t || 'default');
                          if ('object' != typeof n) return n;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: r,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = r),
                    e
                  );
                }
                class u extends s.BaseStore {
                  constructor() {
                    super(),
                      a(this, 'isSupported', void 0),
                      (this.isSupported = Boolean(n.default.storage.local)),
                      this.isSupported || i.default.error('Storage local API not available.');
                  }
                  async get() {
                    if (!this.isSupported)
                      return i.default.error('Storage local API not available.'), null;
                    const { local: e } = n.default.storage;
                    return await e.get(null);
                  }
                  async set(e) {
                    if (!this.isSupported)
                      throw new Error(
                        'Metamask- cannot persist state to local store as this browser does not support this action'
                      );
                    const { local: t } = n.default.storage;
                    return await t.set(e);
                  }
                }
                r.default = u;
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/stores/extension-store.ts' },
    ],
    [
      187,
      { '@sentry/browser': 3136, lodash: 4921, loglevel: 4929 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.PersistenceManager = void 0);
                var n,
                  i = (n = e('loglevel')) && n.__esModule ? n : { default: n },
                  s = e('@sentry/browser'),
                  o = e('lodash');
                function a(e, t, r) {
                  (function (e, t) {
                    if (t.has(e))
                      throw new TypeError(
                        'Cannot initialize the same private elements twice on an object'
                      );
                  })(e, t),
                    t.set(e, r);
                }
                function u(e, t) {
                  return e.get(f(e, t));
                }
                function c(e, t, r) {
                  return e.set(f(e, t), r), r;
                }
                function f(e, t, r) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : r;
                  throw new TypeError('Private element is not present on this object');
                }
                var l = new WeakMap(),
                  d = new WeakMap(),
                  h = new WeakMap(),
                  p = new WeakMap(),
                  m = new WeakMap();
                r.PersistenceManager = class {
                  constructor({ localStore: e }) {
                    a(this, l, !1),
                      a(this, d, null),
                      a(this, h, void 0),
                      a(this, p, !1),
                      a(this, m, void 0),
                      c(m, this, e);
                  }
                  setMetadata(e) {
                    c(h, this, e);
                  }
                  async set(e) {
                    if (!e) throw new Error('MetaMask - updated state is missing');
                    if (!u(h, this))
                      throw new Error('MetaMask - metadata must be set before calling "set"');
                    try {
                      await u(m, this).set({ data: e, meta: u(h, this) }),
                        u(l, this) && c(l, this, !1);
                    } catch (e) {
                      u(l, this) || (c(l, this, !0), (0, s.captureException)(e)),
                        i.default.error('error setting state in local store:', e);
                    } finally {
                      c(p, this, !0);
                    }
                  }
                  async get() {
                    const e = await u(m, this).get();
                    return (0, o.isEmpty)(e)
                      ? (c(d, this, null), undefined)
                      : (u(p, this) || c(d, this, e), e);
                  }
                  get mostRecentRetrievedState() {
                    return u(d, this);
                  }
                  cleanUpMostRecentRetrievedState() {
                    u(d, this) && c(d, this, null);
                  }
                };
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/stores/persistence-manager.ts' },
    ],
    [
      188,
      {
        '../../../../shared/modules/fetch-with-timeout': 5862,
        './base-store': 185,
        loglevel: 4929,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }), (r.default = void 0);
                var n = o(e('loglevel')),
                  i = o(e('../../../../shared/modules/fetch-with-timeout')),
                  s = e('./base-store');
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function a(e, t, r) {
                  return (
                    (t = (function (e) {
                      var t = (function (e, t) {
                        if ('object' != typeof e || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                          var n = r.call(e, t || 'default');
                          if ('object' != typeof n) return n;
                          throw new TypeError('@@toPrimitive must return a primitive value.');
                        }
                        return ('string' === t ? String : Number)(e);
                      })(e, 'string');
                      return 'symbol' == typeof t ? t : t + '';
                    })(t)) in e
                      ? Object.defineProperty(e, t, {
                          value: r,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (e[t] = r),
                    e
                  );
                }
                function u(e, t, r) {
                  c(e, t), t.set(e, r);
                }
                function c(e, t) {
                  if (t.has(e))
                    throw new TypeError(
                      'Cannot initialize the same private elements twice on an object'
                    );
                }
                function f(e, t) {
                  return e.get(d(e, t));
                }
                function l(e, t, r) {
                  return e.set(d(e, t), r), r;
                }
                function d(e, t, r) {
                  if ('function' == typeof e ? e === t : e.has(t))
                    return arguments.length < 3 ? t : r;
                  throw new TypeError('Private element is not present on this object');
                }
                const h = (0, i.default)();
                var p = new WeakMap(),
                  m = new WeakMap(),
                  g = new WeakMap(),
                  y = new WeakSet();
                class b extends s.BaseStore {
                  constructor() {
                    var e, t;
                    super(),
                      c((e = this), (t = y)),
                      t.add(e),
                      u(this, p, !1),
                      u(this, m, void 0),
                      u(this, g, null),
                      a(this, 'isSupported', !0),
                      l(m, this, d(y, this, w).call(this));
                  }
                  async get() {
                    return f(p, this) || (await f(m, this)), f(g, this);
                  }
                  async set(e) {
                    if (!e) throw new Error('MetaMask - updated state is missing');
                    f(p, this) || (await f(m, this)), l(g, this, e);
                  }
                }
                async function w() {
                  try {
                    const e = await h('http://localhost:12345/state.json');
                    e.ok
                      ? l(g, this, await e.json())
                      : n.default.debug(
                          `Received response with a status of ${e.status} ${e.statusText}`
                        );
                  } catch (e) {
                    console.log('error', e),
                      e instanceof Error
                        ? n.default.debug(`Error loading network state: '${e.message}'`)
                        : n.default.debug('Error loading network state: An unknown error occurred');
                  } finally {
                    l(p, this, !0);
                  }
                }
                r.default = b;
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/stores/read-only-network-store.ts' },
    ],
    [
      189,
      {
        '../../../shared/constants/app': 5789,
        '@metamask/object-multiplex': 2409,
        'readable-stream': 5343,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.isStreamWritable = function (e) {
                    var t;
                    return Boolean(
                      e.writable &&
                        !e.destroyed &&
                        !(null !== (t = e._writableState) && void 0 !== t && t.ended)
                    );
                  }),
                  (r.setupMultiplex = function (e) {
                    const t = new i.default();
                    return (
                      t.ignoreStream(o.EXTENSION_MESSAGES.CONNECTION_READY),
                      (0, s.pipeline)(e, t, e, e => {
                        var t;
                        !e ||
                          (null !== (t = e.message) &&
                            void 0 !== t &&
                            t.match('Premature close')) ||
                          console.error(e);
                      }),
                      t
                    );
                  });
                var n,
                  i = (n = e('@metamask/object-multiplex')) && n.__esModule ? n : { default: n },
                  s = e('readable-stream'),
                  o = e('../../../shared/constants/app');
              };
            };
      },
      { package: '$root$', file: 'app/scripts/lib/stream-utils.js' },
    ],
    [
      1935,
      { './helpers': 1937, './prefix-for-chain': 1939, './prefix-for-network': 1940 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getAccountLink =
                    r.createCustomAccountLink =
                    r.createAccountLinkForChain =
                    r.createAccountLink =
                      void 0);
                const i = e('./helpers'),
                  s = n(e('./prefix-for-chain')),
                  o = n(e('./prefix-for-network'));
                function a(e, t) {
                  const r = o.default(t);
                  return null === r ? '' : `https://${r}etherscan.io/address/${e}`;
                }
                function u(e, t) {
                  const r = s.default(t);
                  return null === r ? '' : `https://${r}etherscan.io/address/${e}`;
                }
                function c(e, t) {
                  return i.addPathToUrl(t, 'address', e);
                }
                (r.createAccountLink = a),
                  (r.createAccountLinkForChain = u),
                  (r.createCustomAccountLink = c),
                  (r.getAccountLink = function (e, t, r = {}, n = '') {
                    return r.blockExplorerUrl ? c(e, r.blockExplorerUrl) : n ? a(e, n) : u(e, t);
                  });
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/account-link.js',
      },
    ],
    [
      1936,
      { './helpers': 1937, './prefix-for-chain': 1939, './prefix-for-network': 1940 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getBlockExplorerLink =
                    r.createExplorerLinkForChain =
                    r.createExplorerLink =
                    r.createCustomExplorerLink =
                      void 0);
                const i = e('./helpers'),
                  s = n(e('./prefix-for-chain')),
                  o = n(e('./prefix-for-network'));
                function a(e, t) {
                  return i.addPathToUrl(t, 'tx', e);
                }
                function u(e, t) {
                  const r = o.default(t);
                  return null === r ? '' : `https://${r}etherscan.io/tx/${e}`;
                }
                function c(e, t) {
                  const r = s.default(t);
                  return null === r ? '' : `https://${r}etherscan.io/tx/${e}`;
                }
                (r.createCustomExplorerLink = a),
                  (r.createExplorerLink = u),
                  (r.createExplorerLinkForChain = c),
                  (r.getBlockExplorerLink = function (e, t = {}) {
                    return t.blockExplorerUrl
                      ? a(e.hash, t.blockExplorerUrl)
                      : e.chainId
                        ? c(e.hash, e.chainId)
                        : u(e.hash, e.metamaskNetworkId);
                  });
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/explorer-link.js',
      },
    ],
    [
      1937,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.addPathToUrl = void 0),
                  (r.addPathToUrl = (e, t, r) => {
                    const {
                        username: n,
                        password: i,
                        protocol: s,
                        host: o,
                        pathname: a,
                        search: u,
                        hash: c,
                      } = new URL(e),
                      f = a.endsWith('/') ? `${a}${t}/${r}` : `${a}/${t}/${r}`;
                    return new URL(`${s}//${n ? `${n}:${i}` : ''}${o}${f}${u}${c}`).toString();
                  });
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/helpers.js',
      },
    ],
    [
      1938,
      { './account-link': 1935, './explorer-link': 1936, './token-tracker-link': 1941 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                const n = e('./account-link'),
                  i = e('./explorer-link'),
                  s = e('./token-tracker-link');
                t.exports = {
                  createExplorerLink: i.createExplorerLink,
                  createCustomExplorerLink: i.createCustomExplorerLink,
                  createExplorerLinkForChain: i.createExplorerLinkForChain,
                  createAccountLink: n.createAccountLink,
                  createCustomAccountLink: n.createCustomAccountLink,
                  createAccountLinkForChain: n.createAccountLinkForChain,
                  createTokenTrackerLink: s.createTokenTrackerLink,
                  createCustomTokenTrackerLink: s.createCustomTokenTrackerLink,
                  createTokenTrackerLinkForChain: s.createTokenTrackerLinkForChain,
                  getBlockExplorerLink: i.getBlockExplorerLink,
                  getAccountLink: n.getAccountLink,
                  getTokenTrackerLink: s.getTokenTrackerLink,
                };
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/index.js',
      },
    ],
    [
      1939,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                t.exports = function (e) {
                  let t;
                  switch (e) {
                    case '0x1':
                      t = '';
                      break;
                    case '0x5':
                      t = 'goerli.';
                      break;
                    case '0xaa36a7':
                      t = 'sepolia.';
                      break;
                    default:
                      t = null;
                  }
                  return t;
                };
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/prefix-for-chain.js',
      },
    ],
    [
      1940,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                t.exports = function (e) {
                  let t;
                  switch (parseInt(e)) {
                    case 1:
                      t = '';
                      break;
                    case 5:
                      t = 'goerli.';
                      break;
                    case 11155111:
                      t = 'sepolia.';
                      break;
                    default:
                      t = null;
                  }
                  return t;
                };
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/prefix-for-network.js',
      },
    ],
    [
      1941,
      { './helpers': 1937, './prefix-for-chain': 1939, './prefix-for-network': 1940 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.getTokenTrackerLink =
                    r.createTokenTrackerLinkForChain =
                    r.createCustomTokenTrackerLink =
                    r.createTokenTrackerLink =
                      void 0);
                const i = e('./helpers'),
                  s = n(e('./prefix-for-chain')),
                  o = n(e('./prefix-for-network'));
                function a(e, t, r) {
                  const n = o.default(t);
                  return null === n
                    ? ''
                    : `https://${n}etherscan.io/token/${e}${r ? `?a=${r}` : ''}`;
                }
                function u(e, t) {
                  return i.addPathToUrl(t, 'token', e);
                }
                function c(e, t, r) {
                  const n = s.default(t);
                  return null === n
                    ? ''
                    : `https://${n}etherscan.io/token/${e}${r ? `?a=${r}` : ''}`;
                }
                (r.createTokenTrackerLink = a),
                  (r.createCustomTokenTrackerLink = u),
                  (r.createTokenTrackerLinkForChain = c),
                  (r.getTokenTrackerLink = function (e, t, r, n, i = {}) {
                    return i.blockExplorerUrl
                      ? u(e, i.blockExplorerUrl)
                      : r
                        ? a(e, r, n)
                        : c(e, t, n);
                  });
              };
            };
      },
      {
        package: '@metamask/etherscan-link',
        file: 'node_modules/@metamask/etherscan-link/dist/token-tracker-link.js',
      },
    ],
    [
      1942,
      {
        './has-tx-object': 1943,
        '@babel/runtime/helpers/asyncToGenerator': 395,
        '@babel/runtime/helpers/interopRequireDefault': 403,
        '@babel/runtime/regenerator': 422,
        '@metamask/ethjs-filter': 1945,
        '@metamask/ethjs-util': 1950,
        'ethjs-abi': 4462,
        'js-sha3': 4751,
        'promise-to-callback': 5078,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('@babel/runtime/helpers/interopRequireDefault'),
                  i = n(e('@babel/runtime/regenerator')),
                  s = n(e('@babel/runtime/helpers/asyncToGenerator')),
                  o = e('ethjs-abi'),
                  a = e('@metamask/ethjs-filter'),
                  u = e('@metamask/ethjs-util').getKeys,
                  c = e('js-sha3').keccak_256,
                  f = e('promise-to-callback'),
                  l = e('./has-tx-object');
                t.exports = function () {
                  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    t = this;
                  function r(e) {
                    return function () {
                      var t,
                        r = [].slice.call(arguments);
                      'function' == typeof r[r.length - 1] && (t = r.pop());
                      var i = (function (e) {
                        return n.apply(this, arguments);
                      })({ methodObject: e, methodArgs: r });
                      return t ? f(i)(t) : i;
                    };
                  }
                  function n() {
                    return (n = (0, s.default)(
                      i.default.mark(function e(r) {
                        var n, s, a, u, c, f, d;
                        return i.default.wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (n = r.methodObject),
                                    (s = r.methodArgs),
                                    (a = 'call'),
                                    (u = {}),
                                    l(s) && (u = s.pop()),
                                    ((c = Object.assign({}, t.defaultTxObject, u, {
                                      to: t.address,
                                    })).data = o.encodeMethod(n, s)),
                                    !1 === n.constant && (a = 'sendTransaction'),
                                    (e.next = 9),
                                    t.query[a](c)
                                  );
                                case 9:
                                  if (((f = e.sent), 'call' !== a)) {
                                    e.next = 20;
                                    break;
                                  }
                                  return (
                                    (e.prev = 11), (d = o.decodeMethod(n, f)), e.abrupt('return', d)
                                  );
                                case 16:
                                  throw (
                                    ((e.prev = 16),
                                    (e.t0 = e.catch(11)),
                                    new Error(
                                      '[ethjs-contract] while formatting incoming raw call data ' +
                                        JSON.stringify(f) +
                                        ' ' +
                                        e.t0
                                    ))
                                  );
                                case 20:
                                  return e.abrupt('return', f);
                                case 21:
                                case 'end':
                                  return e.stop();
                              }
                          },
                          e,
                          null,
                          [[11, 16]]
                        );
                      })
                    )).apply(this, arguments);
                  }
                  (t.abi = e.contractABI || []),
                    (t.query = e.query),
                    (t.address = e.address || '0x'),
                    (t.bytecode = e.contractBytecode || '0x'),
                    (t.defaultTxObject = e.contractDefaultTxObject || {}),
                    (t.filters = new a(t.query)),
                    ((d = t.abi),
                    d.filter(function (e) {
                      return ('function' === e.type || 'event' === e.type) && e.name.length > 0;
                    })).forEach(function (e) {
                      'function' === e.type
                        ? (t[e.name] = r(e))
                        : 'event' === e.type &&
                          (t[e.name] = (function (e) {
                            return function () {
                              var r = [].slice.call(arguments),
                                n = u(e.inputs, 'type', !1),
                                i = ['0x' + c(e.name + '(' + n.join(',') + ')')],
                                s = Object.assign({}, r[0]) || {},
                                a = Object.assign({}, r[0] || {}, { to: t.address, topics: i }),
                                f = Object.assign({}, s, {
                                  decoder: function (t) {
                                    return o.decodeEvent(e, t, i);
                                  },
                                  defaultFilterObject: a,
                                });
                              return new t.filters.Filter(f);
                            };
                          })(e));
                    });
                  var d;
                };
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-contract',
        file: 'node_modules/@metamask/ethjs-contract/lib/contract.js',
      },
    ],
    [
      1943,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = ['from', 'to', 'data', 'value', 'gasPrice', 'gas'];
                t.exports = function (e) {
                  if (!Array.isArray(e) || 0 === e.length) return !1;
                  var t = e[e.length - 1];
                  if (!t) return !1;
                  if ('object' != typeof t) return !1;
                  if (0 === Object.keys(t).length) return !0;
                  var r = Object.keys(t);
                  if (
                    n.some(function (e) {
                      return r.includes(e);
                    })
                  )
                    return !0;
                  return !1;
                };
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-contract',
        file: 'node_modules/@metamask/ethjs-contract/lib/has-tx-object.js',
      },
    ],
    [
      1944,
      {
        './contract': 1942,
        './has-tx-object': 1943,
        '@metamask/ethjs-filter': 1945,
        '@metamask/ethjs-util': 1950,
        'ethjs-abi': 4462,
        'js-sha3': 4751,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('ethjs-abi'),
                  i =
                    (e('js-sha3').keccak_256,
                    e('@metamask/ethjs-filter'),
                    e('@metamask/ethjs-util').getKeys),
                  s = e('./contract'),
                  o = e('./has-tx-object');
                t.exports = function (e) {
                  return function (t, r, a) {
                    if (!Array.isArray(t))
                      throw new Error(
                        '[ethjs-contract] Contract ABI must be type Array, got type ' + typeof t
                      );
                    if (void 0 !== r && 'string' != typeof r)
                      throw new Error(
                        '[ethjs-contract] Contract bytecode must be type String, got type ' +
                          typeof r
                      );
                    if (void 0 !== a && 'object' != typeof a)
                      throw new Error(
                        '[ethjs-contract] Contract default tx object must be type Object, got type ' +
                          typeof t
                      );
                    var u = {
                      at: function (n) {
                        return new s({
                          address: n,
                          query: e,
                          contractBytecode: r,
                          contractDefaultTxObject: a,
                          contractABI: t,
                        });
                      },
                      new: function () {
                        var s = {},
                          u = null,
                          c = [].slice.call(arguments);
                        'function' == typeof c[c.length - 1] && (u = c.pop()),
                          o(c) && (s = c.pop());
                        var f = (function (e) {
                            return e.filter(function (e) {
                              return 'constructor' === e.type;
                            })[0];
                          })(t),
                          l = Object.assign({}, a, s);
                        if ((r && (l.data = r), f)) {
                          var d = n.encodeParams(i(f.inputs, 'type'), c).substring(2);
                          l.data = '' + l.data + d;
                        }
                        return u ? e.sendTransaction(l, u) : e.sendTransaction(l);
                      },
                    };
                    return u;
                  };
                };
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-contract',
        file: 'node_modules/@metamask/ethjs-contract/lib/index.js',
      },
    ],
    [
      1945,
      {},
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                function n(e, t) {
                  function r(e) {
                    var r = this;
                    (r.filterId = null),
                      (r.options = Object.assign(
                        {
                          delay: 300,
                          decoder: function (e) {
                            return e;
                          },
                          defaultFilterObject: {},
                        },
                        e || {}
                      )),
                      (r.watchers = {}),
                      (r.interval = setInterval(function () {
                        null !== r.filterId &&
                          Object.keys(r.watchers).length > 0 &&
                          t.getFilterChanges(r.filterId, function (e, t) {
                            var n = [],
                              i = null;
                            if (!e)
                              try {
                                t.forEach(function (e, i) {
                                  (n[i] = t[i]),
                                    'object' == typeof t[i] &&
                                      (n[i].data = r.options.decoder(n[i].data));
                                });
                              } catch (e) {
                                i = new Error(
                                  "[ethjs-filter] while decoding filter change event data from RPC '" +
                                    JSON.stringify(n) +
                                    "': " +
                                    e
                                );
                              }
                            Object.keys(r.watchers).forEach(function (s) {
                              var o = r.watchers[s];
                              !0 !== o.stop
                                ? i
                                  ? o.callback(i, null)
                                  : e
                                    ? o.callback(e, null)
                                    : Array.isArray(n) && t.length > 0 && o.callback(e, n)
                                : delete r.watchers[s];
                            });
                          });
                      }, r.options.delay));
                  }
                  return (
                    (r.prototype.at = function (e) {
                      this.filterId = e;
                    }),
                    (r.prototype.watch = function (e) {
                      var t = e || function () {},
                        r = this,
                        n = Math.random().toString(36).substring(7);
                      return (
                        (r.watchers[n] = {
                          callback: t,
                          stop: !1,
                          stopWatching: function () {
                            r.watchers[n].stop = !0;
                          },
                        }),
                        r.watchers[n]
                      );
                    }),
                    (r.prototype.uninstall = function (e) {
                      var r = this,
                        n = e || null;
                      (r.watchers = Object.assign({})), clearInterval(r.interval);
                      var i = new Promise(function (e, n) {
                        t.uninstallFilter(r.filterId, function (t, r) {
                          t ? n(t) : e(r);
                        });
                      });
                      return (
                        n &&
                          i
                            .then(function (e) {
                              return n(null, e);
                            })
                            .catch(function (e) {
                              return n(e, null);
                            }),
                        n ? null : i
                      );
                    }),
                    (r.prototype.new = function () {
                      var r = null,
                        n = this,
                        i = [],
                        s = [].slice.call(arguments);
                      'function' == typeof s[s.length - 1] && (r = s.pop()),
                        'Filter' === e &&
                          i.push(
                            Object.assign(n.options.defaultFilterObject, s[s.length - 1] || {})
                          );
                      var o = new Promise(function (r, s) {
                        i.push(function (e, t) {
                          e ? s(e) : ((n.filterId = t), r(t));
                        }),
                          t['new' + e].apply(t, i);
                      });
                      return (
                        r &&
                          o
                            .then(function (e) {
                              return r(null, e);
                            })
                            .catch(function (e) {
                              return r(e, null);
                            }),
                        r ? null : o
                      );
                    }),
                    r
                  );
                }
                t.exports = function e(t) {
                  var r = this;
                  if (!(r instanceof e))
                    throw new Error(
                      'the EthFilter object must be instantiated with `new` flag.. (e.g. `const filters = new EthFilter(query);`)'
                    );
                  if ('object' != typeof t)
                    throw new Error(
                      'the EthFilter object must be instantiated with an EthQuery instance (e.g. `const filters = new EthFilter(new EthQuery(provider));`). See github.com/ethjs/ethjs-query for more details..'
                    );
                  (r.Filter = n('Filter', t)),
                    (r.BlockFilter = n('BlockFilter', t)),
                    (r.PendingTransactionFilter = n('PendingTransactionFilter', t));
                };
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-contract>@metamask/ethjs-filter',
        file: 'node_modules/@metamask/ethjs-filter/lib/index.js',
      },
    ],
    [
      1946,
      {
        '@metamask/ethjs-util': 1950,
        '@metamask/number-to-bn': 2406,
        'ethjs-schema': 4464,
        'strip-hex-prefix': 5668,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('@metamask/number-to-bn'),
                  i = e('ethjs-schema'),
                  s = e('@metamask/ethjs-util'),
                  o = s.arrayContainsArray,
                  a = s.getBinarySize,
                  u = s.padToEven,
                  c = e('strip-hex-prefix');
                function f(e, t, r) {
                  if (-1 === ['string', 'number', 'object'].indexOf(typeof e) || null === e)
                    return e;
                  var i = n(e),
                    s = r && i.toString(16).length % 2 ? '0' : '';
                  if (n(e).isNeg())
                    throw new Error(
                      "[ethjs-format] while formatting quantity '" +
                        i.toString(10) +
                        "', invalid negative number. Number must be positive or zero."
                    );
                  return t ? '0x' + s + i.toString(16) : i;
                }
                function l(e, t) {
                  var r = e;
                  return -1 === i.tags.indexOf(e) && (r = f(e, t)), r;
                }
                function d(e, t) {
                  var r = e,
                    n = 0;
                  if (
                    ('string' == typeof e && ((r = '0x' + u(c(e))), (n = a(r))),
                    '0x00' === r && (r = '0x0'),
                    'number' == typeof t &&
                      null !== e &&
                      '0x' !== r &&
                      '0x0' !== r &&
                      (!/^[0-9A-Fa-f]+$/.test(c(r)) || n !== 2 + 2 * t))
                  )
                    throw new Error(
                      "[ethjs-format] hex string '" +
                        r +
                        "' must be an alphanumeric " +
                        (2 + 2 * t) +
                        ' utf8 byte hex (chars: a-fA-F) string, is ' +
                        n +
                        ' bytes'
                    );
                  return r;
                }
                function h(e, t, r) {
                  var n = Object.assign({}, t),
                    s = null;
                  if (
                    ('string' == typeof e &&
                      (s =
                        'Boolean|EthSyncing' === e
                          ? Object.assign({}, i.objects.EthSyncing)
                          : 'DATA|Transaction' === e
                            ? Object.assign({}, i.objects.Transaction)
                            : Object.assign({}, i.objects[e])),
                    !o(Object.keys(t), s.__required))
                  )
                    throw new Error(
                      '[ethjs-format] object ' +
                        JSON.stringify(t) +
                        ' must contain properties: ' +
                        s.__required.join(', ')
                    );
                  return (
                    Object.keys(s).forEach(function (e) {
                      '__required' !== e && void 0 !== t[e] && (n[e] = m(s[e], t[e], r));
                    }),
                    n
                  );
                }
                function p(e, t, r, n) {
                  var i = t.slice(),
                    s = e;
                  if (
                    ('Array|DATA' === e && (s = ['D']),
                    'FilterChange' === e && 'string' == typeof t[0] && (s = ['D32']),
                    !0 === r && 'number' == typeof n && t.length < n)
                  )
                    throw new Error(
                      'array ' +
                        JSON.stringify(t) +
                        ' must contain at least ' +
                        n +
                        ' params, but only contains ' +
                        t.length +
                        '.'
                    );
                  return (
                    (s = s.slice()),
                    t.forEach(function (e, t) {
                      var n = 0;
                      s.length > 1 && (n = t), (i[t] = m(s[n], e, r));
                    }),
                    i
                  );
                }
                function m(e, t, r, n) {
                  var i = t;
                  return (
                    'Q' === e
                      ? (i = f(t, r))
                      : 'QP' === e
                        ? (i = f(t, r, !0))
                        : 'Q|T' === e
                          ? (i = l(t, r))
                          : 'D' === e
                            ? (i = d(t))
                            : 'D20' === e
                              ? (i = d(t, 20))
                              : 'D32' === e
                                ? (i = d(t, 32))
                                : 'object' == typeof t && null !== t && !1 === Array.isArray(t)
                                  ? (i = h(e, t, r))
                                  : Array.isArray(t) && (i = p(e, t, r, n)),
                    i
                  );
                }
                t.exports = {
                  schema: i,
                  formatQuantity: f,
                  formatQuantityOrTag: l,
                  formatObject: h,
                  formatArray: p,
                  format: m,
                  formatInputs: function (e, t) {
                    return m(i.methods[e][0], t, !0, i.methods[e][2]);
                  },
                  formatOutputs: function (e, t) {
                    return m(i.methods[e][1], t, !1);
                  },
                };
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-query>@metamask/ethjs-format',
        file: 'node_modules/@metamask/ethjs-format/lib/index.js',
      },
    ],
    [
      1947,
      { '@metamask/ethjs-format': 1946, '@metamask/ethjs-rpc': 1948, 'promise-to-callback': 5078 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('@metamask/ethjs-format'),
                  i = e('@metamask/ethjs-rpc'),
                  s = e('promise-to-callback');
                function o(e, t) {
                  var r = this,
                    n = t || {};
                  if (!(this instanceof o))
                    throw new Error(
                      '[ethjs-query] the Eth object requires the "new" flag in order to function normally (i.e. `const eth = new Eth(provider);`).'
                    );
                  if ('object' != typeof e)
                    throw new Error(
                      "[ethjs-query] the Eth object requires that the first input 'provider' must be an object, got '" +
                        typeof e +
                        "' (i.e. 'const eth = new Eth(provider);')"
                    );
                  (r.options = Object.assign({
                    debug: n.debug || !1,
                    logger: n.logger || console,
                    jsonSpace: n.jsonSpace || 0,
                  })),
                    (r.rpc = new i(e)),
                    (r.setProvider = r.rpc.setProvider);
                }
                function a(e, t) {
                  return function () {
                    var r = null,
                      i = null,
                      o = this,
                      a = [].slice.call(arguments),
                      u = e.replace('eth_', '');
                    a.length > 0 && 'function' == typeof a[a.length - 1] && (r = a.pop());
                    var c = function () {
                      var r = this;
                      return new Promise(function (s, c) {
                        if (a.length < t[2])
                          c(
                            new Error(
                              "[ethjs-query] method '" +
                                u +
                                "' requires at least " +
                                t[2] +
                                ' input (format type ' +
                                t[0][0] +
                                '), ' +
                                a.length +
                                ' provided. For more information visit: https://github.com/ethereum/wiki/wiki/JSON-RPC#' +
                                e.toLowerCase()
                            )
                          );
                        else if (a.length > t[0].length)
                          c(
                            new Error(
                              "[ethjs-query] method '" +
                                u +
                                "' requires at most " +
                                t[0].length +
                                ' params, ' +
                                a.length +
                                " provided '" +
                                JSON.stringify(a, null, o.options.jsonSpace) +
                                "'. For more information visit: https://github.com/ethereum/wiki/wiki/JSON-RPC#" +
                                e.toLowerCase()
                            )
                          );
                        else {
                          t[3] && a.length < t[3] && a.push('latest'),
                            r.log(
                              "attempting method formatting for '" +
                                u +
                                "' with inputs " +
                                JSON.stringify(a, null, r.options.jsonSpace)
                            );
                          try {
                            (i = n.formatInputs(e, a)),
                              r.log(
                                "method formatting success for '" +
                                  u +
                                  "' with formatted result: " +
                                  JSON.stringify(i, null, r.options.jsonSpace)
                              );
                          } catch (e) {
                            return void c(
                              new Error(
                                "[ethjs-query] while formatting inputs '" +
                                  JSON.stringify(a, null, r.options.jsonSpace) +
                                  "' for method '" +
                                  u +
                                  "' error: " +
                                  e
                              )
                            );
                          }
                          r.rpc
                            .sendAsync({ method: e, params: i })
                            .then(function (t) {
                              r.log(
                                "attempting method formatting for '" +
                                  u +
                                  "' with raw outputs: " +
                                  JSON.stringify(t, null, r.options.jsonSpace)
                              );
                              var i = n.formatOutputs(e, t);
                              r.log(
                                "method formatting success for '" +
                                  u +
                                  "' formatted result: " +
                                  JSON.stringify(i, null, r.options.jsonSpace)
                              ),
                                s(i);
                            })
                            .catch(function (e) {
                              c(e);
                            });
                        }
                      });
                    }.call(this);
                    return r ? s(c)(r) : c;
                  };
                }
                (t.exports = o),
                  (o.prototype.log = function (e) {
                    this.options.debug && this.options.logger.log('[ethjs-query log] ' + e);
                  }),
                  Object.keys(n.schema.methods).forEach(function (e) {
                    Object.defineProperty(o.prototype, e.replace('eth_', ''), {
                      enumerable: !0,
                      value: a(e, n.schema.methods[e]),
                    });
                  });
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-query',
        file: 'node_modules/@metamask/ethjs-query/lib/index.js',
      },
    ],
    [
      1948,
      { 'promise-to-callback': 5078 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('promise-to-callback');
                function i(e, t) {
                  var r = this,
                    n = t || {};
                  if (!(this instanceof i))
                    throw new Error(
                      '[ethjs-rpc] the EthRPC object requires the "new" flag in order to function normally (i.e. `const eth = new EthRPC(provider);`).'
                    );
                  (r.options = Object.assign({
                    jsonSpace: n.jsonSpace || 0,
                    max: n.max || 9999999999999,
                  })),
                    (r.idCounter = Math.floor(Math.random() * r.options.max)),
                    (r.setProvider = function (e) {
                      if ('object' != typeof e)
                        throw new Error(
                          "[ethjs-rpc] the EthRPC object requires that the first input 'provider' must be an object, got '" +
                            typeof e +
                            "' (i.e. 'const eth = new EthRPC(provider);')"
                        );
                      r.currentProvider = e;
                    }),
                    r.setProvider(e);
                }
                (t.exports = i),
                  (i.prototype.sendAsync = function (e, t) {
                    var r = this;
                    r.idCounter = r.idCounter % r.options.max;
                    var i,
                      s,
                      o =
                        ((i = e),
                        (s = r.idCounter++),
                        Object.assign({}, { id: s, jsonrpc: '2.0', params: [] }, i)),
                      a = new Promise(function (e, t) {
                        r.currentProvider.sendAsync(o, function (n, i) {
                          var s = i || {};
                          if (n || s.error) {
                            var a =
                                '[ethjs-rpc] ' +
                                (s.error ? 'rpc' : '') +
                                ' error with payload ' +
                                JSON.stringify(o, null, r.options.jsonSpace) +
                                ' ' +
                                (n
                                  ? String(n)
                                  : JSON.stringify(s.error, null, r.options.jsonSpace)),
                              u = new Error(a);
                            return (u.value = n || s.error), void t(u);
                          }
                          e(s.result);
                        });
                      });
                    return t ? n(a)(t) : a;
                  });
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-query>@metamask/ethjs-rpc',
        file: 'node_modules/@metamask/ethjs-rpc/lib/index.js',
      },
    ],
    [
      1949,
      { '@metamask/number-to-bn': 2406, 'bn.js': 4078 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n = e('bn.js'),
                  i = e('@metamask/number-to-bn'),
                  s = new n(0),
                  o = new n(-1),
                  a = {
                    noether: '0',
                    wei: '1',
                    kwei: '1000',
                    Kwei: '1000',
                    babbage: '1000',
                    femtoether: '1000',
                    mwei: '1000000',
                    Mwei: '1000000',
                    lovelace: '1000000',
                    picoether: '1000000',
                    gwei: '1000000000',
                    Gwei: '1000000000',
                    shannon: '1000000000',
                    nanoether: '1000000000',
                    nano: '1000000000',
                    szabo: '1000000000000',
                    microether: '1000000000000',
                    micro: '1000000000000',
                    finney: '1000000000000000',
                    milliether: '1000000000000000',
                    milli: '1000000000000000',
                    ether: '1000000000000000000',
                    kether: '1000000000000000000000',
                    grand: '1000000000000000000000',
                    mether: '1000000000000000000000000',
                    gether: '1000000000000000000000000000',
                    tether: '1000000000000000000000000000000',
                  };
                function u(e) {
                  var t = e ? e.toLowerCase() : 'ether',
                    r = a[t];
                  if ('string' != typeof r)
                    throw new Error(
                      '[ethjs-unit] the unit provided ' +
                        e +
                        " doesn't exists, please use the one of the following units " +
                        JSON.stringify(a, null, 2)
                    );
                  return new n(r, 10);
                }
                function c(e) {
                  if ('string' == typeof e) {
                    if (!e.match(/^-?[0-9.]+$/))
                      throw new Error(
                        "while converting number to string, invalid number value '" +
                          e +
                          "', should be a number matching (^-?[0-9.]+)."
                      );
                    return e;
                  }
                  if ('number' == typeof e) return String(e);
                  if ('object' == typeof e && e.toString && (e.toTwos || e.dividedToIntegerBy))
                    return e.toPrecision ? String(e.toPrecision()) : e.toString(10);
                  throw new Error(
                    "while converting number to string, invalid number value '" +
                      e +
                      "' type " +
                      typeof e +
                      '.'
                  );
                }
                t.exports = {
                  unitMap: a,
                  numberToString: c,
                  getValueOfUnit: u,
                  fromWei: function (e, t, r) {
                    var n = i(e),
                      c = n.lt(s),
                      f = u(t),
                      l = a[t].length - 1 || 1,
                      d = r || {};
                    c && (n = n.mul(o));
                    for (var h = n.mod(f).toString(10); h.length < l; ) h = '0' + h;
                    d.pad || (h = h.match(/^([0-9]*[1-9]|0)(0*)/)[1]);
                    var p = n.div(f).toString(10);
                    d.commify && (p = p.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    var m = p + ('0' == h ? '' : '.' + h);
                    return c && (m = '-' + m), m;
                  },
                  toWei: function (e, t) {
                    var r = c(e),
                      i = u(t),
                      s = a[t].length - 1 || 1,
                      f = '-' === r.substring(0, 1);
                    if ((f && (r = r.substring(1)), '.' === r))
                      throw new Error(
                        '[ethjs-unit] while converting number ' + e + ' to wei, invalid value'
                      );
                    var l = r.split('.');
                    if (l.length > 2)
                      throw new Error(
                        '[ethjs-unit] while converting number ' +
                          e +
                          ' to wei,  too many decimal points'
                      );
                    var d = l[0],
                      h = l[1];
                    if ((d || (d = '0'), h || (h = '0'), h.length > s))
                      throw new Error(
                        '[ethjs-unit] while converting number ' +
                          e +
                          ' to wei, too many decimal places'
                      );
                    for (; h.length < s; ) h += '0';
                    (d = new n(d)), (h = new n(h));
                    var p = d.mul(i).add(h);
                    return f && (p = p.mul(o)), new n(p.toString(10), 10);
                  },
                };
              };
            };
      },
      {
        package: '@metamask/controller-utils>@metamask/ethjs-unit',
        file: 'node_modules/@metamask/ethjs-unit/lib/index.js',
      },
    ],
    [
      1950,
      { buffer: 4139, 'is-hex-prefixed': 4728, 'strip-hex-prefix': 5668 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                (function (r) {
                  (function () {
                    var n = e('is-hex-prefixed'),
                      i = e('strip-hex-prefix');
                    function s(e) {
                      var t = e;
                      if ('string' != typeof t)
                        throw new Error(
                          '[ethjs-util] while padding to even, value must be string, is currently ' +
                            typeof t +
                            ', while padToEven.'
                        );
                      return t.length % 2 && (t = '0' + t), t;
                    }
                    function o(e) {
                      return '0x' + e.toString(16);
                    }
                    t.exports = {
                      arrayContainsArray: function (e, t, r) {
                        if (!0 !== Array.isArray(e))
                          throw new Error(
                            "[ethjs-util] method arrayContainsArray requires input 'superset' to be an array got type '" +
                              typeof e +
                              "'"
                          );
                        if (!0 !== Array.isArray(t))
                          throw new Error(
                            "[ethjs-util] method arrayContainsArray requires input 'subset' to be an array got type '" +
                              typeof t +
                              "'"
                          );
                        return t[Boolean(r) ? 'some' : 'every'](function (t) {
                          return e.indexOf(t) >= 0;
                        });
                      },
                      intToBuffer: function (e) {
                        var t = o(e);
                        return r.from(s(t.slice(2)), 'hex');
                      },
                      getBinarySize: function (e) {
                        if ('string' != typeof e)
                          throw new Error(
                            "[ethjs-util] while getting binary size, method getBinarySize requires input 'str' to be type String, got '" +
                              typeof e +
                              "'."
                          );
                        return r.byteLength(e, 'utf8');
                      },
                      isHexPrefixed: n,
                      stripHexPrefix: i,
                      padToEven: s,
                      intToHex: o,
                      fromAscii: function (e) {
                        for (var t = '', r = 0; r < e.length; r++) {
                          var n = e.charCodeAt(r).toString(16);
                          t += n.length < 2 ? '0' + n : n;
                        }
                        return '0x' + t;
                      },
                      fromUtf8: function (e) {
                        return '0x' + s(r.from(e, 'utf8').toString('hex')).replace(/^0+|0+$/g, '');
                      },
                      toAscii: function (e) {
                        var t = '',
                          r = 0,
                          n = e.length;
                        for ('0x' === e.substring(0, 2) && (r = 2); r < n; r += 2) {
                          var i = parseInt(e.substr(r, 2), 16);
                          t += String.fromCharCode(i);
                        }
                        return t;
                      },
                      toUtf8: function (e) {
                        return r.from(s(i(e).replace(/^0+|0+$/g, '')), 'hex').toString('utf8');
                      },
                      getKeys: function (e, t, r) {
                        if (!Array.isArray(e))
                          throw new Error(
                            "[ethjs-util] method getKeys expecting type Array as 'params' input, got '" +
                              typeof e +
                              "'"
                          );
                        if ('string' != typeof t)
                          throw new Error(
                            "[ethjs-util] method getKeys expecting type String for input 'key' got '" +
                              typeof t +
                              "'."
                          );
                        for (var n = [], i = 0; i < e.length; i++) {
                          var s = e[i][t];
                          if (r && !s) s = '';
                          else if ('string' != typeof s) throw new Error('invalid abi');
                          n.push(s);
                        }
                        return n;
                      },
                      isHexString: function (e, t) {
                        return (
                          !('string' != typeof e || !e.match(/^0x[0-9A-Fa-f]*$/)) &&
                          (!t || e.length === 2 + 2 * t)
                        );
                      },
                    };
                  }).call(this);
                }).call(this, e('buffer').Buffer);
              };
            };
      },
      {
        package: 'eth-method-registry>@metamask/ethjs-contract>@metamask/ethjs-util',
        file: 'node_modules/@metamask/ethjs-util/lib/index.js',
      },
    ],
    [
      1951,
      {
        './determineGasFeeCalculations.cjs': 1952,
        './gas-util.cjs': 1953,
        '@metamask/controller-utils': 1515,
        '@metamask/eth-query': 1725,
        '@metamask/polling-controller': 2440,
        uuid: 5733,
      },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n,
                  i,
                  s,
                  o =
                    (this && this.__classPrivateFieldSet) ||
                    function (e, t, r, n, i) {
                      if ('m' === n) throw new TypeError('Private method is not writable');
                      if ('a' === n && !i)
                        throw new TypeError('Private accessor was defined without a setter');
                      if ('function' == typeof t ? e !== t || !i : !t.has(e))
                        throw new TypeError(
                          'Cannot write private member to an object whose class did not declare it'
                        );
                      return 'a' === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
                    },
                  a =
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
                  u =
                    (this && this.__importDefault) ||
                    function (e) {
                      return e && e.__esModule ? e : { default: e };
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.GasFeeController =
                    r.GAS_ESTIMATE_TYPES =
                    r.LEGACY_GAS_PRICES_API_URL =
                      void 0);
                const c = e('@metamask/controller-utils'),
                  f = u(e('@metamask/eth-query')),
                  l = e('@metamask/polling-controller'),
                  d = e('uuid'),
                  h = u(e('./determineGasFeeCalculations.cjs')),
                  p = e('./gas-util.cjs');
                (r.LEGACY_GAS_PRICES_API_URL = 'https://api.metaswap.codefi.network/gasPrices'),
                  (r.GAS_ESTIMATE_TYPES = {
                    FEE_MARKET: 'fee-market',
                    LEGACY: 'legacy',
                    ETH_GASPRICE: 'eth_gasPrice',
                    NONE: 'none',
                  });
                const m = {
                    gasFeeEstimatesByChainId: { persist: !0, anonymous: !1 },
                    gasFeeEstimates: { persist: !0, anonymous: !1 },
                    estimatedGasFeeTimeBounds: { persist: !0, anonymous: !1 },
                    gasEstimateType: { persist: !0, anonymous: !1 },
                    nonRPCGasFeeApisDisabled: { persist: !0, anonymous: !1 },
                  },
                  g = {
                    gasFeeEstimatesByChainId: {},
                    gasFeeEstimates: {},
                    estimatedGasFeeTimeBounds: {},
                    gasEstimateType: r.GAS_ESTIMATE_TYPES.NONE,
                    nonRPCGasFeeApisDisabled: !1,
                  };
                class y extends (0, l.StaticIntervalPollingController)() {
                  constructor({
                    interval: e = 15e3,
                    messenger: t,
                    state: u,
                    getCurrentNetworkEIP1559Compatibility: c,
                    getCurrentAccountEIP1559Compatibility: l,
                    getChainId: d,
                    getCurrentNetworkLegacyGasAPICompatibility: h,
                    getProvider: p,
                    onNetworkDidChange: y,
                    legacyAPIEndpoint: b = r.LEGACY_GAS_PRICES_API_URL,
                    EIP1559APIEndpoint: w,
                    clientId: k,
                  }) {
                    if (
                      (super({
                        name: 'GasFeeController',
                        metadata: m,
                        messenger: t,
                        state: { ...g, ...u },
                      }),
                      n.add(this),
                      i.set(this, void 0),
                      (this.intervalDelay = e),
                      this.setIntervalLength(e),
                      (this.pollTokens = new Set()),
                      (this.getCurrentNetworkEIP1559Compatibility = c),
                      (this.getCurrentNetworkLegacyGasAPICompatibility = h),
                      (this.getCurrentAccountEIP1559Compatibility = l),
                      o(this, i, p, 'f'),
                      (this.EIP1559APIEndpoint = w),
                      (this.legacyAPIEndpoint = b),
                      (this.clientId = k),
                      (this.ethQuery = new f.default(a(this, i, 'f').call(this))),
                      y && d)
                    )
                      (this.currentChainId = d()),
                        y(async e => {
                          await a(this, n, 'm', s).call(this, e);
                        });
                    else {
                      const { selectedNetworkClientId: e } = this.messagingSystem.call(
                        'NetworkController:getState'
                      );
                      (this.currentChainId = this.messagingSystem.call(
                        'NetworkController:getNetworkClientById',
                        e
                      ).configuration.chainId),
                        this.messagingSystem.subscribe(
                          'NetworkController:networkDidChange',
                          async e => {
                            await a(this, n, 'm', s).call(this, e);
                          }
                        );
                    }
                  }
                  async resetPolling() {
                    if (0 !== this.pollTokens.size) {
                      const e = Array.from(this.pollTokens);
                      this.stopPolling(),
                        await this.getGasFeeEstimatesAndStartPolling(e[0]),
                        e.slice(1).forEach(e => {
                          this.pollTokens.add(e);
                        });
                    }
                  }
                  async fetchGasFeeEstimates(e) {
                    return await this._fetchGasFeeEstimateData(e);
                  }
                  async getGasFeeEstimatesAndStartPolling(e) {
                    const t = e || (0, d.v1)();
                    return (
                      this.pollTokens.add(t),
                      1 === this.pollTokens.size &&
                        (await this._fetchGasFeeEstimateData(), this._poll()),
                      t
                    );
                  }
                  async _fetchGasFeeEstimateData(e = {}) {
                    const { shouldUpdateState: t = !0, networkClientId: r } = e;
                    let n, i, s, o;
                    if (r !== undefined) {
                      const e = this.messagingSystem.call(
                        'NetworkController:getNetworkClientById',
                        r
                      );
                      (s = '0x38' === e.configuration.chainId),
                        (o = (0, c.convertHexToDecimal)(e.configuration.chainId));
                      try {
                        i =
                          (await this.messagingSystem.call(
                            'NetworkController:getEIP1559Compatibility',
                            r
                          )) || !1;
                      } catch {
                        i = !1;
                      }
                      n = new f.default(e.provider);
                    }
                    n ?? (n = this.ethQuery),
                      s ?? (s = this.getCurrentNetworkLegacyGasAPICompatibility()),
                      o ?? (o = (0, c.convertHexToDecimal)(this.currentChainId));
                    try {
                      i ?? (i = await this.getEIP1559Compatibility());
                    } catch (e) {
                      console.error(e), i ?? (i = !1);
                    }
                    const a = await (0, h.default)({
                      isEIP1559Compatible: i,
                      isLegacyGasAPICompatible: s,
                      fetchGasEstimates: p.fetchGasEstimates,
                      fetchGasEstimatesUrl: this.EIP1559APIEndpoint.replace('<chain_id>', `${o}`),
                      fetchLegacyGasPriceEstimates: p.fetchLegacyGasPriceEstimates,
                      fetchLegacyGasPriceEstimatesUrl: this.legacyAPIEndpoint.replace(
                        '<chain_id>',
                        `${o}`
                      ),
                      fetchEthGasPriceEstimate: p.fetchEthGasPriceEstimate,
                      calculateTimeEstimate: p.calculateTimeEstimate,
                      clientId: this.clientId,
                      ethQuery: n,
                      nonRPCGasFeeApisDisabled: this.state.nonRPCGasFeeApisDisabled,
                    });
                    if (t) {
                      const e = (0, c.toHex)(o);
                      this.update(t => {
                        this.currentChainId === e &&
                          ((t.gasFeeEstimates = a.gasFeeEstimates),
                          (t.estimatedGasFeeTimeBounds = a.estimatedGasFeeTimeBounds),
                          (t.gasEstimateType = a.gasEstimateType)),
                          t.gasFeeEstimatesByChainId ?? (t.gasFeeEstimatesByChainId = {}),
                          (t.gasFeeEstimatesByChainId[e] = {
                            gasFeeEstimates: a.gasFeeEstimates,
                            estimatedGasFeeTimeBounds: a.estimatedGasFeeTimeBounds,
                            gasEstimateType: a.gasEstimateType,
                          });
                      });
                    }
                    return a;
                  }
                  disconnectPoller(e) {
                    this.pollTokens.delete(e), 0 === this.pollTokens.size && this.stopPolling();
                  }
                  stopPolling() {
                    this.intervalId && clearInterval(this.intervalId),
                      this.pollTokens.clear(),
                      this.resetState();
                  }
                  destroy() {
                    super.destroy(), this.stopPolling();
                  }
                  _poll() {
                    this.intervalId && clearInterval(this.intervalId),
                      (this.intervalId = setInterval(async () => {
                        await (0, c.safelyExecute)(() => this._fetchGasFeeEstimateData());
                      }, this.intervalDelay));
                  }
                  async _executePoll({ networkClientId: e }) {
                    await this._fetchGasFeeEstimateData({ networkClientId: e });
                  }
                  resetState() {
                    this.update(() => g);
                  }
                  async getEIP1559Compatibility() {
                    const e = await this.getCurrentNetworkEIP1559Compatibility(),
                      t = this.getCurrentAccountEIP1559Compatibility?.() ?? !0;
                    return e && t;
                  }
                  getTimeEstimate(e, t) {
                    return this.state.gasFeeEstimates &&
                      this.state.gasEstimateType === r.GAS_ESTIMATE_TYPES.FEE_MARKET
                      ? (0, p.calculateTimeEstimate)(e, t, this.state.gasFeeEstimates)
                      : {};
                  }
                  enableNonRPCGasFeeApis() {
                    this.update(e => {
                      e.nonRPCGasFeeApisDisabled = !1;
                    });
                  }
                  disableNonRPCGasFeeApis() {
                    this.update(e => {
                      e.nonRPCGasFeeApisDisabled = !0;
                    });
                  }
                }
                (r.GasFeeController = y),
                  (i = new WeakMap()),
                  (n = new WeakSet()),
                  (s = async function ({ selectedNetworkClientId: e }) {
                    const t = this.messagingSystem.call('NetworkController:getNetworkClientById', e)
                      .configuration.chainId;
                    t !== this.currentChainId &&
                      ((this.ethQuery = new f.default(a(this, i, 'f').call(this))),
                      await this.resetPolling(),
                      (this.currentChainId = t));
                  }),
                  (r.default = y);
              };
            };
      },
      {
        package: '@metamask/gas-fee-controller',
        file: 'node_modules/@metamask/gas-fee-controller/dist/GasFeeController.cjs',
      },
    ],
    [
      1952,
      { './GasFeeController.cjs': 1951 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                Object.defineProperty(r, '__esModule', { value: !0 });
                const n = e('./GasFeeController.cjs');
                r.default = async function (e) {
                  try {
                    return await (async function (e) {
                      const {
                        isEIP1559Compatible: t,
                        isLegacyGasAPICompatible: r,
                        nonRPCGasFeeApisDisabled: i,
                      } = e;
                      try {
                        if (t && !i)
                          return await (async function (e) {
                            const {
                                fetchGasEstimates: t,
                                fetchGasEstimatesUrl: r,
                                clientId: i,
                                calculateTimeEstimate: s,
                              } = e,
                              o = await t(r, i),
                              { suggestedMaxPriorityFeePerGas: a, suggestedMaxFeePerGas: u } =
                                o.medium,
                              c = s(a, u, o);
                            return {
                              gasFeeEstimates: o,
                              estimatedGasFeeTimeBounds: c,
                              gasEstimateType: n.GAS_ESTIMATE_TYPES.FEE_MARKET,
                            };
                          })(e);
                        if (r && !i)
                          return await (async function (e) {
                            const {
                              fetchLegacyGasPriceEstimates: t,
                              fetchLegacyGasPriceEstimatesUrl: r,
                              clientId: i,
                            } = e;
                            return {
                              gasFeeEstimates: await t(r, i),
                              estimatedGasFeeTimeBounds: {},
                              gasEstimateType: n.GAS_ESTIMATE_TYPES.LEGACY,
                            };
                          })(e);
                        throw new Error('Main gas fee/price estimation failed. Use fallback');
                      } catch {
                        return await (async function (e) {
                          const { ethQuery: t, fetchEthGasPriceEstimate: r } = e;
                          return {
                            gasFeeEstimates: await r(t),
                            estimatedGasFeeTimeBounds: {},
                            gasEstimateType: n.GAS_ESTIMATE_TYPES.ETH_GASPRICE,
                          };
                        })(e);
                      }
                    })(e);
                  } catch (e) {
                    if (e instanceof Error)
                      throw new Error(`Gas fee/price estimation failed. Message: ${e.message}`);
                    throw e;
                  }
                };
              };
            };
      },
      {
        package: '@metamask/gas-fee-controller',
        file: 'node_modules/@metamask/gas-fee-controller/dist/determineGasFeeCalculations.cjs',
      },
    ],
    [
      1953,
      { '@metamask/controller-utils': 1515, 'bn.js': 4078 },
      function () {
        with (this.scopeTerminator)
          with (this.globalThis)
            return function () {
              'use strict';
              return function (e, t, r) {
                var n =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  (r.calculateTimeEstimate =
                    r.fetchEthGasPriceEstimate =
                    r.fetchLegacyGasPriceEstimates =
                    r.fetchGasEstimates =
                    r.normalizeGWEIDecimalNumbers =
                      void 0);
                const i = e('@metamask/controller-utils'),
                  s = n(e('bn.js')),
                  o = e => ({ 'X-Client-Id': e });
                function a(e) {
                  const t = (0, i.gweiDecToWEIBN)(e).toString(16);
                  return (0, i.weiHexToGweiDec)(t);
                }
                (r.normalizeGWEIDecimalNumbers = a),
                  (r.fetchGasEstimates = async function (e, t) {
                    const r = await (0, i.handleFetch)(e, t ? { headers: o(t) } : undefined);
                    return {
                      low: {
                        ...r.low,
                        suggestedMaxPriorityFeePerGas: a(r.low.suggestedMaxPriorityFeePerGas),
                        suggestedMaxFeePerGas: a(r.low.suggestedMaxFeePerGas),
                      },
                      medium: {
                        ...r.medium,
                        suggestedMaxPriorityFeePerGas: a(r.medium.suggestedMaxPriorityFeePerGas),
                        suggestedMaxFeePerGas: a(r.medium.suggestedMaxFeePerGas),
                      },
                      high: {
                        ...r.high,
                        suggestedMaxPriorityFeePerGas: a(r.high.suggestedMaxPriorityFeePerGas),
                        suggestedMaxFeePerGas: a(r.high.suggestedMaxFeePerGas),
                      },
                      estimatedBaseFee: a(r.estimatedBaseFee),
                      historicalBaseFeeRange: r.historicalBaseFeeRange,
                      baseFeeTrend: r.baseFeeTrend,
                      latestPriorityFeeRange: r.latestPriorityFeeRange,
                      historicalPriorityFeeRange: r.historicalPriorityFeeRange,
                      priorityFeeTrend: r.priorityFeeTrend,
                      networkCongestion: r.networkCongestion,
                    };
                  }),
                  (r.fetchLegacyGasPriceEstimates = async function (e, t) {
                    const r = await (0, i.handleFetch)(e, {
                      referrer: e,
                      referrerPolicy: 'no-referrer-when-downgrade',
                      method: 'GET',
                      mode: 'cors',
                      headers: { 'Content-Type': 'application/json', ...(t && o(t)) },
                    });
                    return { low: r.SafeGasPrice, medium: r.ProposeGasPrice, high: r.FastGasPrice };
                  }),
                  (r.fetchEthGasPriceEstimate = async function (e) {
                    const t = await (0, i.query)(e, 'gasPrice');
                    return { gasPrice: (0, i.weiHexToGweiDec)(t).toString() };
                  }),
                  (r.calculateTimeEstimate = function (e, t, r) {
                    const { low: n, medium: o, high: a, estimatedBaseFee: u } = r,
                      c = (0, i.gweiDecToWEIBN)(e),
                      f = (0, i.gweiDecToWEIBN)(t),
                      l = (0, i.gweiDecToWEIBN)(u),
                      d = s.default.min(c, f.sub(l)),
                      h = (0, i.gweiDecToWEIBN)(n.suggestedMaxPriorityFeePerGas),
                      p = (0, i.gweiDecToWEIBN)(o.suggestedMaxPriorityFeePerGas),
                      m = (0, i.gweiDecToWEIBN)(a.suggestedMaxPriorityFeePerGas);
                    let g, y;
                    return (
                      d.lt(h)
                        ? ((g = null), (y = 'unknown'))
                        : d.gte(h) && d.lt(p)
                          ? ((g = n.minWaitTimeEstimate), (y = n.maxWaitTimeEstimate))
                          : d.gte(p) && d.lt(m)
                            ? ((g = o.minWaitTimeEstimate), (y = o.maxWaitTimeEstimate))
                            : d.eq(m)
                              ? ((g = a.minWaitTimeEstimate), (y = a.maxWaitTimeEstimate))
                              : ((g = 0), (y = a.maxWaitTimeEstimate)),
                      { lowerTimeBound: g, upperTimeBound: y }
                    );
                  });
              };
            };
      },
      {
        package: '@metamask/gas-fee-controller',
        file: 'node_modules/@metamask/gas-fee-controller/dist/gas-util.cjs',
      },
    ],
    [
      1954,
      { './GasFeeController.cjs': 1951 },
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
                          var i = Object.getOwnPropertyDescriptor(t, r);
                          (i && !('get' in i ? !t.__esModule : i.writable || i.configurable)) ||
                            (i = {
                              enumerable: !0,
                              get: function () {
                                return t[r];
                              },
                            }),
                            Object.defineProperty(e, n, i);
                        }
                      : function (e, t, r, n) {
                          n === undefined && (n = r), (e[n] = t[r]);
                        }),
                  i =
                    (this && this.__exportStar) ||
                    function (e, t) {
                      for (var r in e)
                        'default' === r || Object.prototype.hasOwnProperty.call(t, r) || n(t, e, r);
                    };
                Object.defineProperty(r, '__esModule', { value: !0 }),
                  i(e('./GasFeeController.cjs'), r);
              };
            };
      },
      {
        package: '@metamask/gas-fee-controller',
        file: 'node_modules/@metamask/gas-fee-controller/dist/index.cjs',
      },
    ],
  ],
  [],
  {}
);
