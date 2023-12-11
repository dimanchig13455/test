import { stripLeadingAndTrailingSlash as Qt, isTruthy as Pt } from "@rednight/utils";
import { encodeBase64 as Zt, decodeBase64 as St } from "@rednight/crypto";
const It = 1e3, Bt = 60 * It, Jt = 60 * Bt, te = 24 * Jt, ee = 7 * te, re = 4 * ee, ll = 12 * re, ne = 60, ie = 60 * ne, cl = 24 * ie, gl = "john@example.com", ul = "john", Z = "Rednight", fl = `${Z} team`, S = {
  LANDING: "@rednight/landing",
  ACCOUNT: "@rednight/account"
}, U = {
  [S.ACCOUNT]: {
    publicPath: "",
    subdomain: "",
    name: `${Z} Account`,
    bareName: "Account",
    clientID: "web-account",
    icon: "brand-rednight",
    settingsSlug: "account"
  },
  [S.LANDING]: {
    publicPath: "",
    subdomain: "",
    name: `${Z}`,
    bareName: "Landing",
    clientID: "landing",
    icon: "brand-rednight",
    settingsSlug: "account"
  }
}, _l = {
  SWITCH: "/switch",
  LOGIN: "/login",
  RESET_PASSWORD: "/reset-password",
  SIGNUP: "/signup"
};
var ae = /* @__PURE__ */ ((r) => (r[r.OK = 200] = "OK", r[r.BAD_REQUEST = 400] = "BAD_REQUEST", r[r.FORBIDDEN = 403] = "FORBIDDEN", r[r.NOT_FOUND = 404] = "NOT_FOUND", r[r.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", r[r.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", r[r.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", r))(ae || {});
const hl = /(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\da-z]+\.)+[a-z]{2,}))/i, dl = ["https://rednightgames.com"];
var se = /* @__PURE__ */ ((r) => (r.LINUX = "linux", r.MACOS = "macos", r.WINDOWS = "windows", r))(se || {}), oe = /* @__PURE__ */ ((r) => (r.STATUS_PAGE = "https://status.rednightgames.com", r))(oe || {});
const bl = (r, t) => `/${[U[t].publicPath, r].map((n) => Qt(n)).filter((n) => Pt(n)).join("/")}`, pl = () => S.ACCOUNT, vl = (r) => U[r].clientID, ml = (r) => U[r].name, yl = (r) => U[r].bareName;
class s extends Array {
  constructor(t, e) {
    if (super(t), this.sign = e, Object.setPrototypeOf(this, s.prototype), t > s.__kMaxLength)
      throw new RangeError("Maximum BigInt size exceeded");
  }
  static BigInt(t) {
    var e = Math.floor, n = Number.isFinite;
    if (typeof t == "number") {
      if (t === 0)
        return s.__zero();
      if (s.__isOneDigitInt(t))
        return 0 > t ? s.__oneDigit(-t, !0) : s.__oneDigit(t, !1);
      if (!n(t) || e(t) !== t)
        throw new RangeError("The number " + t + " cannot be converted to BigInt because it is not an integer");
      return s.__fromDouble(t);
    }
    if (typeof t == "string") {
      const a = s.__fromString(t);
      if (a === null)
        throw new SyntaxError("Cannot convert " + t + " to a BigInt");
      return a;
    }
    if (typeof t == "boolean")
      return t === !0 ? s.__oneDigit(1, !1) : s.__zero();
    if (typeof t == "object") {
      if (t.constructor === s)
        return t;
      const a = s.__toPrimitive(t);
      return s.BigInt(a);
    }
    throw new TypeError("Cannot convert " + t + " to a BigInt");
  }
  toDebugString() {
    const t = ["BigInt["];
    for (const e of this)
      t.push((e && (e >>> 0).toString(16)) + ", ");
    return t.push("]"), t.join("");
  }
  toString(t = 10) {
    if (2 > t || 36 < t)
      throw new RangeError("toString() radix argument must be between 2 and 36");
    return this.length === 0 ? "0" : t & t - 1 ? s.__toStringGeneric(this, t, !1) : s.__toStringBasePowerOfTwo(this, t);
  }
  valueOf() {
    throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
  }
  static toNumber(t) {
    const e = t.length;
    if (e === 0)
      return 0;
    if (e === 1) {
      const p = t.__unsignedDigit(0);
      return t.sign ? -p : p;
    }
    const n = t.__digit(e - 1), a = s.__clz30(n), i = 30 * e - a;
    if (1024 < i)
      return t.sign ? -1 / 0 : 1 / 0;
    let o = i - 1, l = n, c = e - 1;
    const g = a + 3;
    let _ = g === 32 ? 0 : l << g;
    _ >>>= 12;
    const u = g - 12;
    let f = 12 <= g ? 0 : l << 20 + g, d = 20 + g;
    for (0 < u && 0 < c && (c--, l = t.__digit(c), _ |= l >>> 30 - u, f = l << u + 2, d = u + 2); 0 < d && 0 < c; )
      c--, l = t.__digit(c), f |= 30 <= d ? l << d - 30 : l >>> 30 - d, d -= 30;
    const b = s.__decideRounding(t, d, c, l);
    if ((b === 1 || b === 0 && (1 & f) == 1) && (f = f + 1 >>> 0, f === 0 && (_++, _ >>> 20 != 0 && (_ = 0, o++, 1023 < o))))
      return t.sign ? -1 / 0 : 1 / 0;
    const h = t.sign ? -2147483648 : 0;
    return o = o + 1023 << 20, s.__kBitConversionInts[1] = h | o | _, s.__kBitConversionInts[0] = f, s.__kBitConversionDouble[0];
  }
  static unaryMinus(t) {
    if (t.length === 0)
      return t;
    const e = t.__copy();
    return e.sign = !t.sign, e;
  }
  static bitwiseNot(t) {
    return t.sign ? s.__absoluteSubOne(t).__trim() : s.__absoluteAddOne(t, !0);
  }
  static exponentiate(t, e) {
    if (e.sign)
      throw new RangeError("Exponent must be positive");
    if (e.length === 0)
      return s.__oneDigit(1, !1);
    if (t.length === 0)
      return t;
    if (t.length === 1 && t.__digit(0) === 1)
      return t.sign && !(1 & e.__digit(0)) ? s.unaryMinus(t) : t;
    if (1 < e.length)
      throw new RangeError("BigInt too big");
    let n = e.__unsignedDigit(0);
    if (n === 1)
      return t;
    if (n >= s.__kMaxLengthBits)
      throw new RangeError("BigInt too big");
    if (t.length === 1 && t.__digit(0) === 2) {
      const o = 1 + (0 | n / 30), l = t.sign && (1 & n) != 0, c = new s(o, l);
      c.__initializeDigits();
      const g = 1 << n % 30;
      return c.__setDigit(o - 1, g), c;
    }
    let a = null, i = t;
    for (1 & n && (a = t), n >>= 1; n !== 0; n >>= 1)
      i = s.multiply(i, i), 1 & n && (a === null ? a = i : a = s.multiply(a, i));
    return a;
  }
  static multiply(t, e) {
    if (t.length === 0)
      return t;
    if (e.length === 0)
      return e;
    let n = t.length + e.length;
    30 <= t.__clzmsd() + e.__clzmsd() && n--;
    const a = new s(n, t.sign !== e.sign);
    a.__initializeDigits();
    for (let i = 0; i < t.length; i++)
      s.__multiplyAccumulate(e, t.__digit(i), a, i);
    return a.__trim();
  }
  static divide(t, e) {
    if (e.length === 0)
      throw new RangeError("Division by zero");
    if (0 > s.__absoluteCompare(t, e))
      return s.__zero();
    const n = t.sign !== e.sign, a = e.__unsignedDigit(0);
    let i;
    if (e.length === 1 && 32767 >= a) {
      if (a === 1)
        return n === t.sign ? t : s.unaryMinus(t);
      i = s.__absoluteDivSmall(t, a, null);
    } else
      i = s.__absoluteDivLarge(t, e, !0, !1);
    return i.sign = n, i.__trim();
  }
  static remainder(t, e) {
    if (e.length === 0)
      throw new RangeError("Division by zero");
    if (0 > s.__absoluteCompare(t, e))
      return t;
    const n = e.__unsignedDigit(0);
    if (e.length === 1 && 32767 >= n) {
      if (n === 1)
        return s.__zero();
      const i = s.__absoluteModSmall(t, n);
      return i === 0 ? s.__zero() : s.__oneDigit(i, t.sign);
    }
    const a = s.__absoluteDivLarge(t, e, !1, !0);
    return a.sign = t.sign, a.__trim();
  }
  static add(t, e) {
    const n = t.sign;
    return n === e.sign ? s.__absoluteAdd(t, e, n) : 0 <= s.__absoluteCompare(t, e) ? s.__absoluteSub(t, e, n) : s.__absoluteSub(e, t, !n);
  }
  static subtract(t, e) {
    const n = t.sign;
    return n === e.sign ? 0 <= s.__absoluteCompare(t, e) ? s.__absoluteSub(t, e, n) : s.__absoluteSub(e, t, !n) : s.__absoluteAdd(t, e, n);
  }
  static leftShift(t, e) {
    return e.length === 0 || t.length === 0 ? t : e.sign ? s.__rightShiftByAbsolute(t, e) : s.__leftShiftByAbsolute(t, e);
  }
  static signedRightShift(t, e) {
    return e.length === 0 || t.length === 0 ? t : e.sign ? s.__leftShiftByAbsolute(t, e) : s.__rightShiftByAbsolute(t, e);
  }
  static unsignedRightShift() {
    throw new TypeError("BigInts have no unsigned right shift; use >> instead");
  }
  static lessThan(t, e) {
    return 0 > s.__compareToBigInt(t, e);
  }
  static lessThanOrEqual(t, e) {
    return 0 >= s.__compareToBigInt(t, e);
  }
  static greaterThan(t, e) {
    return 0 < s.__compareToBigInt(t, e);
  }
  static greaterThanOrEqual(t, e) {
    return 0 <= s.__compareToBigInt(t, e);
  }
  static equal(t, e) {
    if (t.sign !== e.sign || t.length !== e.length)
      return !1;
    for (let n = 0; n < t.length; n++)
      if (t.__digit(n) !== e.__digit(n))
        return !1;
    return !0;
  }
  static notEqual(t, e) {
    return !s.equal(t, e);
  }
  static bitwiseAnd(t, e) {
    var n = Math.max;
    if (!t.sign && !e.sign)
      return s.__absoluteAnd(t, e).__trim();
    if (t.sign && e.sign) {
      const a = n(t.length, e.length) + 1;
      let i = s.__absoluteSubOne(t, a);
      const o = s.__absoluteSubOne(e);
      return i = s.__absoluteOr(i, o, i), s.__absoluteAddOne(i, !0, i).__trim();
    }
    return t.sign && ([t, e] = [e, t]), s.__absoluteAndNot(t, s.__absoluteSubOne(e)).__trim();
  }
  static bitwiseXor(t, e) {
    var n = Math.max;
    if (!t.sign && !e.sign)
      return s.__absoluteXor(t, e).__trim();
    if (t.sign && e.sign) {
      const o = n(t.length, e.length), l = s.__absoluteSubOne(t, o), c = s.__absoluteSubOne(e);
      return s.__absoluteXor(l, c, l).__trim();
    }
    const a = n(t.length, e.length) + 1;
    t.sign && ([t, e] = [e, t]);
    let i = s.__absoluteSubOne(e, a);
    return i = s.__absoluteXor(i, t, i), s.__absoluteAddOne(i, !0, i).__trim();
  }
  static bitwiseOr(t, e) {
    var n = Math.max;
    const a = n(t.length, e.length);
    if (!t.sign && !e.sign)
      return s.__absoluteOr(t, e).__trim();
    if (t.sign && e.sign) {
      let o = s.__absoluteSubOne(t, a);
      const l = s.__absoluteSubOne(e);
      return o = s.__absoluteAnd(o, l, o), s.__absoluteAddOne(o, !0, o).__trim();
    }
    t.sign && ([t, e] = [e, t]);
    let i = s.__absoluteSubOne(e, a);
    return i = s.__absoluteAndNot(i, t, i), s.__absoluteAddOne(i, !0, i).__trim();
  }
  static asIntN(t, e) {
    var n = Math.floor;
    if (e.length === 0)
      return e;
    if (t = n(t), 0 > t)
      throw new RangeError("Invalid value: not (convertible to) a safe integer");
    if (t === 0)
      return s.__zero();
    if (t >= s.__kMaxLengthBits)
      return e;
    const a = 0 | (t + 29) / 30;
    if (e.length < a)
      return e;
    const i = e.__unsignedDigit(a - 1), o = 1 << (t - 1) % 30;
    if (e.length === a && i < o)
      return e;
    if ((i & o) !== o)
      return s.__truncateToNBits(t, e);
    if (!e.sign)
      return s.__truncateAndSubFromPowerOfTwo(t, e, !0);
    if (!(i & o - 1)) {
      for (let l = a - 2; 0 <= l; l--)
        if (e.__digit(l) !== 0)
          return s.__truncateAndSubFromPowerOfTwo(t, e, !1);
      return e.length === a && i === o ? e : s.__truncateToNBits(t, e);
    }
    return s.__truncateAndSubFromPowerOfTwo(t, e, !1);
  }
  static asUintN(t, e) {
    var n = Math.floor;
    if (e.length === 0)
      return e;
    if (t = n(t), 0 > t)
      throw new RangeError("Invalid value: not (convertible to) a safe integer");
    if (t === 0)
      return s.__zero();
    if (e.sign) {
      if (t > s.__kMaxLengthBits)
        throw new RangeError("BigInt too big");
      return s.__truncateAndSubFromPowerOfTwo(t, e, !1);
    }
    if (t >= s.__kMaxLengthBits)
      return e;
    const a = 0 | (t + 29) / 30;
    if (e.length < a)
      return e;
    const i = t % 30;
    return e.length == a && (i === 0 || !(e.__digit(a - 1) >>> i)) ? e : s.__truncateToNBits(t, e);
  }
  static ADD(t, e) {
    if (t = s.__toPrimitive(t), e = s.__toPrimitive(e), typeof t == "string")
      return typeof e != "string" && (e = e.toString()), t + e;
    if (typeof e == "string")
      return t.toString() + e;
    if (t = s.__toNumeric(t), e = s.__toNumeric(e), s.__isBigInt(t) && s.__isBigInt(e))
      return s.add(t, e);
    if (typeof t == "number" && typeof e == "number")
      return t + e;
    throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
  }
  static LT(t, e) {
    return s.__compare(t, e, 0);
  }
  static LE(t, e) {
    return s.__compare(t, e, 1);
  }
  static GT(t, e) {
    return s.__compare(t, e, 2);
  }
  static GE(t, e) {
    return s.__compare(t, e, 3);
  }
  static EQ(t, e) {
    for (; ; ) {
      if (s.__isBigInt(t))
        return s.__isBigInt(e) ? s.equal(t, e) : s.EQ(e, t);
      if (typeof t == "number") {
        if (s.__isBigInt(e))
          return s.__equalToNumber(e, t);
        if (typeof e != "object")
          return t == e;
        e = s.__toPrimitive(e);
      } else if (typeof t == "string") {
        if (s.__isBigInt(e))
          return t = s.__fromString(t), t !== null && s.equal(t, e);
        if (typeof e != "object")
          return t == e;
        e = s.__toPrimitive(e);
      } else if (typeof t == "boolean") {
        if (s.__isBigInt(e))
          return s.__equalToNumber(e, +t);
        if (typeof e != "object")
          return t == e;
        e = s.__toPrimitive(e);
      } else if (typeof t == "symbol") {
        if (s.__isBigInt(e))
          return !1;
        if (typeof e != "object")
          return t == e;
        e = s.__toPrimitive(e);
      } else if (typeof t == "object") {
        if (typeof e == "object" && e.constructor !== s)
          return t == e;
        t = s.__toPrimitive(t);
      } else
        return t == e;
    }
  }
  static NE(t, e) {
    return !s.EQ(t, e);
  }
  static DataViewGetBigInt64(t, e, n = !1) {
    return s.asIntN(64, s.DataViewGetBigUint64(t, e, n));
  }
  static DataViewGetBigUint64(t, e, n = !1) {
    const [a, i] = n ? [4, 0] : [0, 4], o = t.getUint32(e + a, n), l = t.getUint32(e + i, n), c = new s(3, !1);
    return c.__setDigit(0, 1073741823 & l), c.__setDigit(1, (268435455 & o) << 2 | l >>> 30), c.__setDigit(2, o >>> 28), c.__trim();
  }
  static DataViewSetBigInt64(t, e, n, a = !1) {
    s.DataViewSetBigUint64(t, e, n, a);
  }
  static DataViewSetBigUint64(t, e, n, a = !1) {
    n = s.asUintN(64, n);
    let i = 0, o = 0;
    if (0 < n.length && (o = n.__digit(0), 1 < n.length)) {
      const g = n.__digit(1);
      o |= g << 30, i = g >>> 2, 2 < n.length && (i |= n.__digit(2) << 28);
    }
    const [l, c] = a ? [4, 0] : [0, 4];
    t.setUint32(e + l, i, a), t.setUint32(e + c, o, a);
  }
  static __zero() {
    return new s(0, !1);
  }
  static __oneDigit(t, e) {
    const n = new s(1, e);
    return n.__setDigit(0, t), n;
  }
  __copy() {
    const t = new s(this.length, this.sign);
    for (let e = 0; e < this.length; e++)
      t[e] = this[e];
    return t;
  }
  __trim() {
    let t = this.length, e = this[t - 1];
    for (; e === 0; )
      t--, e = this[t - 1], this.pop();
    return t === 0 && (this.sign = !1), this;
  }
  __initializeDigits() {
    for (let t = 0; t < this.length; t++)
      this[t] = 0;
  }
  static __decideRounding(t, e, n, a) {
    if (0 < e)
      return -1;
    let i;
    if (0 > e)
      i = -e - 1;
    else {
      if (n === 0)
        return -1;
      n--, a = t.__digit(n), i = 29;
    }
    let o = 1 << i;
    if (!(a & o))
      return -1;
    if (o -= 1, (a & o) != 0)
      return 1;
    for (; 0 < n; )
      if (n--, t.__digit(n) !== 0)
        return 1;
    return 0;
  }
  static __fromDouble(t) {
    s.__kBitConversionDouble[0] = t;
    const e = 2047 & s.__kBitConversionInts[1] >>> 20, n = e - 1023, a = (0 | n / 30) + 1, i = new s(a, 0 > t);
    let o = 1048575 & s.__kBitConversionInts[1] | 1048576, l = s.__kBitConversionInts[0];
    const c = 20, g = n % 30;
    let _, u = 0;
    if (g < 20) {
      const f = c - g;
      u = f + 32, _ = o >>> f, o = o << 32 - f | l >>> f, l <<= 32 - f;
    } else if (g === 20)
      u = 32, _ = o, o = l, l = 0;
    else {
      const f = g - c;
      u = 32 - f, _ = o << f | l >>> 32 - f, o = l << f, l = 0;
    }
    i.__setDigit(a - 1, _);
    for (let f = a - 2; 0 <= f; f--)
      0 < u ? (u -= 30, _ = o >>> 2, o = o << 30 | l >>> 2, l <<= 30) : _ = 0, i.__setDigit(f, _);
    return i.__trim();
  }
  static __isWhitespace(t) {
    return 13 >= t && 9 <= t || (159 >= t ? t == 32 : 131071 >= t ? t == 160 || t == 5760 : 196607 >= t ? (t &= 131071, 10 >= t || t == 40 || t == 41 || t == 47 || t == 95 || t == 4096) : t == 65279);
  }
  static __fromString(t, e = 0) {
    let n = 0;
    const a = t.length;
    let i = 0;
    if (i === a)
      return s.__zero();
    let o = t.charCodeAt(i);
    for (; s.__isWhitespace(o); ) {
      if (++i === a)
        return s.__zero();
      o = t.charCodeAt(i);
    }
    if (o === 43) {
      if (++i === a)
        return null;
      o = t.charCodeAt(i), n = 1;
    } else if (o === 45) {
      if (++i === a)
        return null;
      o = t.charCodeAt(i), n = -1;
    }
    if (e === 0) {
      if (e = 10, o === 48) {
        if (++i === a)
          return s.__zero();
        if (o = t.charCodeAt(i), o === 88 || o === 120) {
          if (e = 16, ++i === a)
            return null;
          o = t.charCodeAt(i);
        } else if (o === 79 || o === 111) {
          if (e = 8, ++i === a)
            return null;
          o = t.charCodeAt(i);
        } else if (o === 66 || o === 98) {
          if (e = 2, ++i === a)
            return null;
          o = t.charCodeAt(i);
        }
      }
    } else if (e === 16 && o === 48) {
      if (++i === a)
        return s.__zero();
      if (o = t.charCodeAt(i), o === 88 || o === 120) {
        if (++i === a)
          return null;
        o = t.charCodeAt(i);
      }
    }
    if (n != 0 && e !== 10)
      return null;
    for (; o === 48; ) {
      if (++i === a)
        return s.__zero();
      o = t.charCodeAt(i);
    }
    const l = a - i;
    let c = s.__kMaxBitsPerChar[e], g = s.__kBitsPerCharTableMultiplier - 1;
    if (l > 1073741824 / c)
      return null;
    const _ = c * l + g >>> s.__kBitsPerCharTableShift, u = new s(0 | (_ + 29) / 30, !1), f = 10 > e ? e : 10, d = 10 < e ? e - 10 : 0;
    if (e & e - 1) {
      u.__initializeDigits();
      let b = !1, h = 0;
      do {
        let p = 0, v = 1;
        for (; ; ) {
          let w;
          if (o - 48 >>> 0 < f)
            w = o - 48;
          else if ((32 | o) - 97 >>> 0 < d)
            w = (32 | o) - 87;
          else {
            b = !0;
            break;
          }
          const D = v * e;
          if (1073741823 < D)
            break;
          if (v = D, p = p * e + w, h++, ++i === a) {
            b = !0;
            break;
          }
          o = t.charCodeAt(i);
        }
        g = 30 * s.__kBitsPerCharTableMultiplier - 1;
        const y = 0 | (c * h + g >>> s.__kBitsPerCharTableShift) / 30;
        u.__inplaceMultiplyAdd(v, p, y);
      } while (!b);
    } else {
      c >>= s.__kBitsPerCharTableShift;
      const b = [], h = [];
      let p = !1;
      do {
        let v = 0, y = 0;
        for (; ; ) {
          let w;
          if (o - 48 >>> 0 < f)
            w = o - 48;
          else if ((32 | o) - 97 >>> 0 < d)
            w = (32 | o) - 87;
          else {
            p = !0;
            break;
          }
          if (y += c, v = v << c | w, ++i === a) {
            p = !0;
            break;
          }
          if (o = t.charCodeAt(i), 30 < y + c)
            break;
        }
        b.push(v), h.push(y);
      } while (!p);
      s.__fillFromParts(u, b, h);
    }
    if (i !== a) {
      if (!s.__isWhitespace(o))
        return null;
      for (i++; i < a; i++)
        if (o = t.charCodeAt(i), !s.__isWhitespace(o))
          return null;
    }
    return u.sign = n == -1, u.__trim();
  }
  static __fillFromParts(t, e, n) {
    let a = 0, i = 0, o = 0;
    for (let l = e.length - 1; 0 <= l; l--) {
      const c = e[l], g = n[l];
      i |= c << o, o += g, o === 30 ? (t.__setDigit(a++, i), o = 0, i = 0) : 30 < o && (t.__setDigit(a++, 1073741823 & i), o -= 30, i = c >>> g - o);
    }
    if (i !== 0) {
      if (a >= t.length)
        throw new Error("implementation bug");
      t.__setDigit(a++, i);
    }
    for (; a < t.length; a++)
      t.__setDigit(a, 0);
  }
  static __toStringBasePowerOfTwo(t, e) {
    const n = t.length;
    let a = e - 1;
    a = (85 & a >>> 1) + (85 & a), a = (51 & a >>> 2) + (51 & a), a = (15 & a >>> 4) + (15 & a);
    const i = a, o = e - 1, l = t.__digit(n - 1), c = s.__clz30(l);
    let g = 0 | (30 * n - c + i - 1) / i;
    if (t.sign && g++, 268435456 < g)
      throw new Error("string too long");
    const _ = Array(g);
    let u = g - 1, f = 0, d = 0;
    for (let h = 0; h < n - 1; h++) {
      const p = t.__digit(h), v = (f | p << d) & o;
      _[u--] = s.__kConversionChars[v];
      const y = i - d;
      for (f = p >>> y, d = 30 - y; d >= i; )
        _[u--] = s.__kConversionChars[f & o], f >>>= i, d -= i;
    }
    const b = (f | l << d) & o;
    for (_[u--] = s.__kConversionChars[b], f = l >>> i - d; f !== 0; )
      _[u--] = s.__kConversionChars[f & o], f >>>= i;
    if (t.sign && (_[u--] = "-"), u != -1)
      throw new Error("implementation bug");
    return _.join("");
  }
  static __toStringGeneric(t, e, n) {
    const a = t.length;
    if (a === 0)
      return "";
    if (a === 1) {
      let h = t.__unsignedDigit(0).toString(e);
      return n === !1 && t.sign && (h = "-" + h), h;
    }
    const i = 30 * a - s.__clz30(t.__digit(a - 1)), o = s.__kMaxBitsPerChar[e], l = o - 1;
    let c = i * s.__kBitsPerCharTableMultiplier;
    c += l - 1, c = 0 | c / l;
    const g = c + 1 >> 1, _ = s.exponentiate(s.__oneDigit(e, !1), s.__oneDigit(g, !1));
    let u, f;
    const d = _.__unsignedDigit(0);
    if (_.length === 1 && 32767 >= d) {
      u = new s(t.length, !1), u.__initializeDigits();
      let h = 0;
      for (let p = 2 * t.length - 1; 0 <= p; p--) {
        const v = h << 15 | t.__halfDigit(p);
        u.__setHalfDigit(p, 0 | v / d), h = 0 | v % d;
      }
      f = h.toString(e);
    } else {
      const h = s.__absoluteDivLarge(t, _, !0, !0);
      u = h.quotient;
      const p = h.remainder.__trim();
      f = s.__toStringGeneric(p, e, !0);
    }
    u.__trim();
    let b = s.__toStringGeneric(u, e, !0);
    for (; f.length < g; )
      f = "0" + f;
    return n === !1 && t.sign && (b = "-" + b), b + f;
  }
  static __unequalSign(t) {
    return t ? -1 : 1;
  }
  static __absoluteGreater(t) {
    return t ? -1 : 1;
  }
  static __absoluteLess(t) {
    return t ? 1 : -1;
  }
  static __compareToBigInt(t, e) {
    const n = t.sign;
    if (n !== e.sign)
      return s.__unequalSign(n);
    const a = s.__absoluteCompare(t, e);
    return 0 < a ? s.__absoluteGreater(n) : 0 > a ? s.__absoluteLess(n) : 0;
  }
  static __compareToNumber(t, e) {
    if (s.__isOneDigitInt(e)) {
      const n = t.sign, a = 0 > e;
      if (n !== a)
        return s.__unequalSign(n);
      if (t.length === 0) {
        if (a)
          throw new Error("implementation bug");
        return e === 0 ? 0 : -1;
      }
      if (1 < t.length)
        return s.__absoluteGreater(n);
      const i = Math.abs(e), o = t.__unsignedDigit(0);
      return o > i ? s.__absoluteGreater(n) : o < i ? s.__absoluteLess(n) : 0;
    }
    return s.__compareToDouble(t, e);
  }
  static __compareToDouble(t, e) {
    if (e !== e)
      return e;
    if (e === 1 / 0)
      return -1;
    if (e === -1 / 0)
      return 1;
    const n = t.sign;
    if (n !== 0 > e)
      return s.__unequalSign(n);
    if (e === 0)
      throw new Error("implementation bug: should be handled elsewhere");
    if (t.length === 0)
      return -1;
    s.__kBitConversionDouble[0] = e;
    const a = 2047 & s.__kBitConversionInts[1] >>> 20;
    if (a == 2047)
      throw new Error("implementation bug: handled elsewhere");
    const i = a - 1023;
    if (0 > i)
      return s.__absoluteGreater(n);
    const o = t.length;
    let l = t.__digit(o - 1);
    const c = s.__clz30(l), g = 30 * o - c, _ = i + 1;
    if (g < _)
      return s.__absoluteLess(n);
    if (g > _)
      return s.__absoluteGreater(n);
    let u = 1048576 | 1048575 & s.__kBitConversionInts[1], f = s.__kBitConversionInts[0];
    const d = 20, b = 29 - c;
    if (b !== (0 | (g - 1) % 30))
      throw new Error("implementation bug");
    let h, p = 0;
    if (20 > b) {
      const v = d - b;
      p = v + 32, h = u >>> v, u = u << 32 - v | f >>> v, f <<= 32 - v;
    } else if (b === 20)
      p = 32, h = u, u = f, f = 0;
    else {
      const v = b - d;
      p = 32 - v, h = u << v | f >>> 32 - v, u = f << v, f = 0;
    }
    if (l >>>= 0, h >>>= 0, l > h)
      return s.__absoluteGreater(n);
    if (l < h)
      return s.__absoluteLess(n);
    for (let v = o - 2; 0 <= v; v--) {
      0 < p ? (p -= 30, h = u >>> 2, u = u << 30 | f >>> 2, f <<= 30) : h = 0;
      const y = t.__unsignedDigit(v);
      if (y > h)
        return s.__absoluteGreater(n);
      if (y < h)
        return s.__absoluteLess(n);
    }
    if (u !== 0 || f !== 0) {
      if (p === 0)
        throw new Error("implementation bug");
      return s.__absoluteLess(n);
    }
    return 0;
  }
  static __equalToNumber(t, e) {
    var n = Math.abs;
    return s.__isOneDigitInt(e) ? e === 0 ? t.length === 0 : t.length === 1 && t.sign === 0 > e && t.__unsignedDigit(0) === n(e) : s.__compareToDouble(t, e) === 0;
  }
  static __comparisonResultToBool(t, e) {
    return e === 0 ? 0 > t : e === 1 ? 0 >= t : e === 2 ? 0 < t : e === 3 ? 0 <= t : void 0;
  }
  static __compare(t, e, n) {
    if (t = s.__toPrimitive(t), e = s.__toPrimitive(e), typeof t == "string" && typeof e == "string")
      switch (n) {
        case 0:
          return t < e;
        case 1:
          return t <= e;
        case 2:
          return t > e;
        case 3:
          return t >= e;
      }
    if (s.__isBigInt(t) && typeof e == "string")
      return e = s.__fromString(e), e !== null && s.__comparisonResultToBool(s.__compareToBigInt(t, e), n);
    if (typeof t == "string" && s.__isBigInt(e))
      return t = s.__fromString(t), t !== null && s.__comparisonResultToBool(s.__compareToBigInt(t, e), n);
    if (t = s.__toNumeric(t), e = s.__toNumeric(e), s.__isBigInt(t)) {
      if (s.__isBigInt(e))
        return s.__comparisonResultToBool(s.__compareToBigInt(t, e), n);
      if (typeof e != "number")
        throw new Error("implementation bug");
      return s.__comparisonResultToBool(s.__compareToNumber(t, e), n);
    }
    if (typeof t != "number")
      throw new Error("implementation bug");
    if (s.__isBigInt(e))
      return s.__comparisonResultToBool(s.__compareToNumber(e, t), 2 ^ n);
    if (typeof e != "number")
      throw new Error("implementation bug");
    return n === 0 ? t < e : n === 1 ? t <= e : n === 2 ? t > e : n === 3 ? t >= e : void 0;
  }
  __clzmsd() {
    return s.__clz30(this.__digit(this.length - 1));
  }
  static __absoluteAdd(t, e, n) {
    if (t.length < e.length)
      return s.__absoluteAdd(e, t, n);
    if (t.length === 0)
      return t;
    if (e.length === 0)
      return t.sign === n ? t : s.unaryMinus(t);
    let a = t.length;
    (t.__clzmsd() === 0 || e.length === t.length && e.__clzmsd() === 0) && a++;
    const i = new s(a, n);
    let o = 0, l = 0;
    for (; l < e.length; l++) {
      const c = t.__digit(l) + e.__digit(l) + o;
      o = c >>> 30, i.__setDigit(l, 1073741823 & c);
    }
    for (; l < t.length; l++) {
      const c = t.__digit(l) + o;
      o = c >>> 30, i.__setDigit(l, 1073741823 & c);
    }
    return l < i.length && i.__setDigit(l, o), i.__trim();
  }
  static __absoluteSub(t, e, n) {
    if (t.length === 0)
      return t;
    if (e.length === 0)
      return t.sign === n ? t : s.unaryMinus(t);
    const a = new s(t.length, n);
    let i = 0, o = 0;
    for (; o < e.length; o++) {
      const l = t.__digit(o) - e.__digit(o) - i;
      i = 1 & l >>> 30, a.__setDigit(o, 1073741823 & l);
    }
    for (; o < t.length; o++) {
      const l = t.__digit(o) - i;
      i = 1 & l >>> 30, a.__setDigit(o, 1073741823 & l);
    }
    return a.__trim();
  }
  static __absoluteAddOne(t, e, n = null) {
    const a = t.length;
    n === null ? n = new s(a, e) : n.sign = e;
    let i = 1;
    for (let o = 0; o < a; o++) {
      const l = t.__digit(o) + i;
      i = l >>> 30, n.__setDigit(o, 1073741823 & l);
    }
    return i != 0 && n.__setDigitGrow(a, 1), n;
  }
  static __absoluteSubOne(t, e) {
    const n = t.length;
    e = e || n;
    const a = new s(e, !1);
    let i = 1;
    for (let o = 0; o < n; o++) {
      const l = t.__digit(o) - i;
      i = 1 & l >>> 30, a.__setDigit(o, 1073741823 & l);
    }
    if (i != 0)
      throw new Error("implementation bug");
    for (let o = n; o < e; o++)
      a.__setDigit(o, 0);
    return a;
  }
  static __absoluteAnd(t, e, n = null) {
    let a = t.length, i = e.length, o = i;
    if (a < i) {
      o = a;
      const g = t, _ = a;
      t = e, a = i, e = g, i = _;
    }
    let l = o;
    n === null ? n = new s(l, !1) : l = n.length;
    let c = 0;
    for (; c < o; c++)
      n.__setDigit(c, t.__digit(c) & e.__digit(c));
    for (; c < l; c++)
      n.__setDigit(c, 0);
    return n;
  }
  static __absoluteAndNot(t, e, n = null) {
    const a = t.length, i = e.length;
    let o = i;
    a < i && (o = a);
    let l = a;
    n === null ? n = new s(l, !1) : l = n.length;
    let c = 0;
    for (; c < o; c++)
      n.__setDigit(c, t.__digit(c) & ~e.__digit(c));
    for (; c < a; c++)
      n.__setDigit(c, t.__digit(c));
    for (; c < l; c++)
      n.__setDigit(c, 0);
    return n;
  }
  static __absoluteOr(t, e, n = null) {
    let a = t.length, i = e.length, o = i;
    if (a < i) {
      o = a;
      const g = t, _ = a;
      t = e, a = i, e = g, i = _;
    }
    let l = a;
    n === null ? n = new s(l, !1) : l = n.length;
    let c = 0;
    for (; c < o; c++)
      n.__setDigit(c, t.__digit(c) | e.__digit(c));
    for (; c < a; c++)
      n.__setDigit(c, t.__digit(c));
    for (; c < l; c++)
      n.__setDigit(c, 0);
    return n;
  }
  static __absoluteXor(t, e, n = null) {
    let a = t.length, i = e.length, o = i;
    if (a < i) {
      o = a;
      const g = t, _ = a;
      t = e, a = i, e = g, i = _;
    }
    let l = a;
    n === null ? n = new s(l, !1) : l = n.length;
    let c = 0;
    for (; c < o; c++)
      n.__setDigit(c, t.__digit(c) ^ e.__digit(c));
    for (; c < a; c++)
      n.__setDigit(c, t.__digit(c));
    for (; c < l; c++)
      n.__setDigit(c, 0);
    return n;
  }
  static __absoluteCompare(t, e) {
    const n = t.length - e.length;
    if (n != 0)
      return n;
    let a = t.length - 1;
    for (; 0 <= a && t.__digit(a) === e.__digit(a); )
      a--;
    return 0 > a ? 0 : t.__unsignedDigit(a) > e.__unsignedDigit(a) ? 1 : -1;
  }
  static __multiplyAccumulate(t, e, n, a) {
    if (e === 0)
      return;
    const i = 32767 & e, o = e >>> 15;
    let l = 0, c = 0;
    for (let g, _ = 0; _ < t.length; _++, a++) {
      g = n.__digit(a);
      const u = t.__digit(_), f = 32767 & u, d = u >>> 15, b = s.__imul(f, i), h = s.__imul(f, o), p = s.__imul(d, i), v = s.__imul(d, o);
      g += c + b + l, l = g >>> 30, g &= 1073741823, g += ((32767 & h) << 15) + ((32767 & p) << 15), l += g >>> 30, c = v + (h >>> 15) + (p >>> 15), n.__setDigit(a, 1073741823 & g);
    }
    for (; l != 0 || c !== 0; a++) {
      let g = n.__digit(a);
      g += l + c, c = 0, l = g >>> 30, n.__setDigit(a, 1073741823 & g);
    }
  }
  static __internalMultiplyAdd(t, e, n, a, i) {
    let o = n, l = 0;
    for (let c = 0; c < a; c++) {
      const g = t.__digit(c), _ = s.__imul(32767 & g, e), u = s.__imul(g >>> 15, e), f = _ + ((32767 & u) << 15) + l + o;
      o = f >>> 30, l = u >>> 15, i.__setDigit(c, 1073741823 & f);
    }
    if (i.length > a)
      for (i.__setDigit(a++, o + l); a < i.length; )
        i.__setDigit(a++, 0);
    else if (o + l !== 0)
      throw new Error("implementation bug");
  }
  __inplaceMultiplyAdd(t, e, n) {
    n > this.length && (n = this.length);
    const a = 32767 & t, i = t >>> 15;
    let o = 0, l = e;
    for (let c = 0; c < n; c++) {
      const g = this.__digit(c), _ = 32767 & g, u = g >>> 15, f = s.__imul(_, a), d = s.__imul(_, i), b = s.__imul(u, a), h = s.__imul(u, i);
      let p = l + f + o;
      o = p >>> 30, p &= 1073741823, p += ((32767 & d) << 15) + ((32767 & b) << 15), o += p >>> 30, l = h + (d >>> 15) + (b >>> 15), this.__setDigit(c, 1073741823 & p);
    }
    if (o != 0 || l !== 0)
      throw new Error("implementation bug");
  }
  static __absoluteDivSmall(t, e, n = null) {
    n === null && (n = new s(t.length, !1));
    let a = 0;
    for (let i, o = 2 * t.length - 1; 0 <= o; o -= 2) {
      i = (a << 15 | t.__halfDigit(o)) >>> 0;
      const l = 0 | i / e;
      a = 0 | i % e, i = (a << 15 | t.__halfDigit(o - 1)) >>> 0;
      const c = 0 | i / e;
      a = 0 | i % e, n.__setDigit(o >>> 1, l << 15 | c);
    }
    return n;
  }
  static __absoluteModSmall(t, e) {
    let n = 0;
    for (let a = 2 * t.length - 1; 0 <= a; a--)
      n = 0 | ((n << 15 | t.__halfDigit(a)) >>> 0) % e;
    return n;
  }
  static __absoluteDivLarge(t, e, n, a) {
    const i = e.__halfDigitLength(), o = e.length, l = t.__halfDigitLength() - i;
    let c = null;
    n && (c = new s(l + 2 >>> 1, !1), c.__initializeDigits());
    const g = new s(i + 2 >>> 1, !1);
    g.__initializeDigits();
    const _ = s.__clz15(e.__halfDigit(i - 1));
    0 < _ && (e = s.__specialLeftShift(e, _, 0));
    const u = s.__specialLeftShift(t, _, 1), f = e.__halfDigit(i - 1);
    let d = 0;
    for (let b, h = l; 0 <= h; h--) {
      b = 32767;
      const p = u.__halfDigit(h + i);
      if (p !== f) {
        const y = (p << 15 | u.__halfDigit(h + i - 1)) >>> 0;
        b = 0 | y / f;
        let w = 0 | y % f;
        const D = e.__halfDigit(i - 2), O = u.__halfDigit(h + i - 2);
        for (; s.__imul(b, D) >>> 0 > (w << 16 | O) >>> 0 && (b--, w += f, !(32767 < w)); )
          ;
      }
      s.__internalMultiplyAdd(e, b, 0, o, g);
      let v = u.__inplaceSub(g, h, i + 1);
      v !== 0 && (v = u.__inplaceAdd(e, h, i), u.__setHalfDigit(h + i, 32767 & u.__halfDigit(h + i) + v), b--), n && (1 & h ? d = b << 15 : c.__setDigit(h >>> 1, d | b));
    }
    if (a)
      return u.__inplaceRightShift(_), n ? { quotient: c, remainder: u } : u;
    if (n)
      return c;
    throw new Error("unreachable");
  }
  static __clz15(t) {
    return s.__clz30(t) - 15;
  }
  __inplaceAdd(t, e, n) {
    let a = 0;
    for (let i = 0; i < n; i++) {
      const o = this.__halfDigit(e + i) + t.__halfDigit(i) + a;
      a = o >>> 15, this.__setHalfDigit(e + i, 32767 & o);
    }
    return a;
  }
  __inplaceSub(t, e, n) {
    let a = 0;
    if (1 & e) {
      e >>= 1;
      let i = this.__digit(e), o = 32767 & i, l = 0;
      for (; l < n - 1 >>> 1; l++) {
        const _ = t.__digit(l), u = (i >>> 15) - (32767 & _) - a;
        a = 1 & u >>> 15, this.__setDigit(e + l, (32767 & u) << 15 | 32767 & o), i = this.__digit(e + l + 1), o = (32767 & i) - (_ >>> 15) - a, a = 1 & o >>> 15;
      }
      const c = t.__digit(l), g = (i >>> 15) - (32767 & c) - a;
      if (a = 1 & g >>> 15, this.__setDigit(e + l, (32767 & g) << 15 | 32767 & o), e + l + 1 >= this.length)
        throw new RangeError("out of bounds");
      !(1 & n) && (i = this.__digit(e + l + 1), o = (32767 & i) - (c >>> 15) - a, a = 1 & o >>> 15, this.__setDigit(e + t.length, 1073709056 & i | 32767 & o));
    } else {
      e >>= 1;
      let i = 0;
      for (; i < t.length - 1; i++) {
        const _ = this.__digit(e + i), u = t.__digit(i), f = (32767 & _) - (32767 & u) - a;
        a = 1 & f >>> 15;
        const d = (_ >>> 15) - (u >>> 15) - a;
        a = 1 & d >>> 15, this.__setDigit(e + i, (32767 & d) << 15 | 32767 & f);
      }
      const o = this.__digit(e + i), l = t.__digit(i), c = (32767 & o) - (32767 & l) - a;
      a = 1 & c >>> 15;
      let g = 0;
      !(1 & n) && (g = (o >>> 15) - (l >>> 15) - a, a = 1 & g >>> 15), this.__setDigit(e + i, (32767 & g) << 15 | 32767 & c);
    }
    return a;
  }
  __inplaceRightShift(t) {
    if (t === 0)
      return;
    let e = this.__digit(0) >>> t;
    const n = this.length - 1;
    for (let a = 0; a < n; a++) {
      const i = this.__digit(a + 1);
      this.__setDigit(a, 1073741823 & i << 30 - t | e), e = i >>> t;
    }
    this.__setDigit(n, e);
  }
  static __specialLeftShift(t, e, n) {
    const a = t.length, i = new s(a + n, !1);
    if (e === 0) {
      for (let l = 0; l < a; l++)
        i.__setDigit(l, t.__digit(l));
      return 0 < n && i.__setDigit(a, 0), i;
    }
    let o = 0;
    for (let l = 0; l < a; l++) {
      const c = t.__digit(l);
      i.__setDigit(l, 1073741823 & c << e | o), o = c >>> 30 - e;
    }
    return 0 < n && i.__setDigit(a, o), i;
  }
  static __leftShiftByAbsolute(t, e) {
    const n = s.__toShiftAmount(e);
    if (0 > n)
      throw new RangeError("BigInt too big");
    const a = 0 | n / 30, i = n % 30, o = t.length, l = i !== 0 && t.__digit(o - 1) >>> 30 - i != 0, c = o + a + (l ? 1 : 0), g = new s(c, t.sign);
    if (i === 0) {
      let _ = 0;
      for (; _ < a; _++)
        g.__setDigit(_, 0);
      for (; _ < c; _++)
        g.__setDigit(_, t.__digit(_ - a));
    } else {
      let _ = 0;
      for (let u = 0; u < a; u++)
        g.__setDigit(u, 0);
      for (let u = 0; u < o; u++) {
        const f = t.__digit(u);
        g.__setDigit(u + a, 1073741823 & f << i | _), _ = f >>> 30 - i;
      }
      if (l)
        g.__setDigit(o + a, _);
      else if (_ !== 0)
        throw new Error("implementation bug");
    }
    return g.__trim();
  }
  static __rightShiftByAbsolute(t, e) {
    const n = t.length, a = t.sign, i = s.__toShiftAmount(e);
    if (0 > i)
      return s.__rightShiftByMaximum(a);
    const o = 0 | i / 30, l = i % 30;
    let c = n - o;
    if (0 >= c)
      return s.__rightShiftByMaximum(a);
    let g = !1;
    if (a) {
      if (t.__digit(o) & (1 << l) - 1)
        g = !0;
      else
        for (let u = 0; u < o; u++)
          if (t.__digit(u) !== 0) {
            g = !0;
            break;
          }
    }
    g && l === 0 && !~t.__digit(n - 1) && c++;
    let _ = new s(c, a);
    if (l === 0) {
      _.__setDigit(c - 1, 0);
      for (let u = o; u < n; u++)
        _.__setDigit(u - o, t.__digit(u));
    } else {
      let u = t.__digit(o) >>> l;
      const f = n - o - 1;
      for (let d = 0; d < f; d++) {
        const b = t.__digit(d + o + 1);
        _.__setDigit(d, 1073741823 & b << 30 - l | u), u = b >>> l;
      }
      _.__setDigit(f, u);
    }
    return g && (_ = s.__absoluteAddOne(_, !0, _)), _.__trim();
  }
  static __rightShiftByMaximum(t) {
    return t ? s.__oneDigit(1, !0) : s.__zero();
  }
  static __toShiftAmount(t) {
    if (1 < t.length)
      return -1;
    const e = t.__unsignedDigit(0);
    return e > s.__kMaxLengthBits ? -1 : e;
  }
  static __toPrimitive(t, e = "default") {
    if (typeof t != "object" || t.constructor === s)
      return t;
    if (typeof Symbol < "u" && typeof Symbol.toPrimitive == "symbol") {
      const i = t[Symbol.toPrimitive];
      if (i) {
        const o = i(e);
        if (typeof o != "object")
          return o;
        throw new TypeError("Cannot convert object to primitive value");
      }
    }
    const n = t.valueOf;
    if (n) {
      const i = n.call(t);
      if (typeof i != "object")
        return i;
    }
    const a = t.toString;
    if (a) {
      const i = a.call(t);
      if (typeof i != "object")
        return i;
    }
    throw new TypeError("Cannot convert object to primitive value");
  }
  static __toNumeric(t) {
    return s.__isBigInt(t) ? t : +t;
  }
  static __isBigInt(t) {
    return typeof t == "object" && t !== null && t.constructor === s;
  }
  static __truncateToNBits(t, e) {
    const n = 0 | (t + 29) / 30, a = new s(n, e.sign), i = n - 1;
    for (let l = 0; l < i; l++)
      a.__setDigit(l, e.__digit(l));
    let o = e.__digit(i);
    if (t % 30 != 0) {
      const l = 32 - t % 30;
      o = o << l >>> l;
    }
    return a.__setDigit(i, o), a.__trim();
  }
  static __truncateAndSubFromPowerOfTwo(t, e, n) {
    var a = Math.min;
    const i = 0 | (t + 29) / 30, o = new s(i, n);
    let l = 0;
    const c = i - 1;
    let g = 0;
    for (const d = a(c, e.length); l < d; l++) {
      const b = 0 - e.__digit(l) - g;
      g = 1 & b >>> 30, o.__setDigit(l, 1073741823 & b);
    }
    for (; l < c; l++)
      o.__setDigit(l, 0 | 1073741823 & -g);
    let _ = c < e.length ? e.__digit(c) : 0;
    const u = t % 30;
    let f;
    if (u == 0)
      f = 0 - _ - g, f &= 1073741823;
    else {
      const d = 32 - u;
      _ = _ << d >>> d;
      const b = 1 << 32 - d;
      f = b - _ - g, f &= b - 1;
    }
    return o.__setDigit(c, f), o.__trim();
  }
  __digit(t) {
    return this[t];
  }
  __unsignedDigit(t) {
    return this[t] >>> 0;
  }
  __setDigit(t, e) {
    this[t] = 0 | e;
  }
  __setDigitGrow(t, e) {
    this[t] = 0 | e;
  }
  __halfDigitLength() {
    const t = this.length;
    return 32767 >= this.__unsignedDigit(t - 1) ? 2 * t - 1 : 2 * t;
  }
  __halfDigit(t) {
    return 32767 & this[t >>> 1] >>> 15 * (1 & t);
  }
  __setHalfDigit(t, e) {
    const n = t >>> 1, a = this.__digit(n), i = 1 & t ? 32767 & a | e << 15 : 1073709056 & a | 32767 & e;
    this.__setDigit(n, i);
  }
  static __digitPow(t, e) {
    let n = 1;
    for (; 0 < e; )
      1 & e && (n *= t), e >>>= 1, t *= t;
    return n;
  }
  static __isOneDigitInt(t) {
    return (1073741823 & t) === t;
  }
}
s.__kMaxLength = 33554432, s.__kMaxLengthBits = s.__kMaxLength << 5, s.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], s.__kBitsPerCharTableShift = 5, s.__kBitsPerCharTableMultiplier = 1 << s.__kBitsPerCharTableShift, s.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], s.__kBitConversionBuffer = new ArrayBuffer(8), s.__kBitConversionDouble = new Float64Array(s.__kBitConversionBuffer), s.__kBitConversionInts = new Int32Array(s.__kBitConversionBuffer), s.__clz30 = Math.clz32 ? function(r) {
  return Math.clz32(r) - 2;
} : function(r) {
  return r === 0 ? 30 : 0 | 29 - (0 | Math.log(r >>> 0) / Math.LN2);
}, s.__imul = Math.imul || function(r, t) {
  return 0 | r * t;
};
const wl = (r = 0, t) => r | t, Dl = (r = 0, t) => r ^ t, Al = (r = 0, t) => r & ~t, le = (r = 0, t) => (r & t) === t, $l = (r = s.BigInt(0), t) => s.equal(s.bitwiseAnd(r, s.BigInt(t)), s.BigInt(t)), Ol = (r) => {
  const t = Math.floor(Math.log2(r)) + 1, e = [];
  for (let n = 0; n <= t; n++) {
    const a = 2 ** n;
    le(r, a) && e.push(a);
  }
  return e;
}, ce = () => {
  let r = [];
  return {
    notify: (...a) => r.map((i) => i(...a)),
    subscribe: (a) => (r.push(a), () => {
      r.splice(r.indexOf(a), 1);
    }),
    clear: () => {
      r = [];
    }
  };
}, Cl = (r = /* @__PURE__ */ new Map()) => {
  const t = ce();
  return {
    get size() {
      return r.size;
    },
    forEach(e, n) {
      return r.forEach(e, n);
    },
    has: (e) => r.has(e),
    get: (e) => r.get(e),
    entries: () => r.entries(),
    keys: () => r.keys(),
    values: () => r.values(),
    [Symbol.iterator]: () => r[Symbol.iterator](),
    get [Symbol.toStringTag]() {
      return r[Symbol.toStringTag];
    },
    clear: () => r.clear(),
    delete: (e) => {
      const n = r.delete(e);
      return t.notify(e, void 0), n;
    },
    set(e, n) {
      return r.set(e, n), t.notify(e, n), this;
    },
    subscribe: t.subscribe,
    clearListeners: t.clear
  };
}, El = () => {
  try {
    return document.cookie.split(";").map((r) => r.trim());
  } catch {
    return [];
  }
}, jl = (r, t = document.cookie) => {
  var e;
  return (e = `; ${t}`.match(`;\\s*${r}=([^;]+)`)) == null ? void 0 : e[1];
};
var ge = /* @__PURE__ */ ((r) => (r.Lax = "lax", r.Strict = "strict", r.None = "none", r))(ge || {});
const ue = ({
  cookieName: r,
  cookieValue: t,
  expirationDate: e,
  path: n,
  cookieDomain: a,
  samesite: i,
  secure: o = !0
}) => {
  const l = t === void 0 ? "" : t;
  let c = e;
  c === "max" && (c = (/* @__PURE__ */ new Date(2147483647e3)).toUTCString()), c = t === void 0 ? (/* @__PURE__ */ new Date(0)).toUTCString() : c, document.cookie = [
    `${r}=${l}`,
    c && `expires=${c}`,
    a && `domain=${a}`,
    n && `path=${n}`,
    o && "secure",
    i && `samesite=${i}`
  ].filter(Pt).join(";");
}, Tl = (r) => {
  ue({
    cookieName: r,
    cookieValue: void 0,
    path: "/"
  });
}, fe = (r, t = !0) => {
  const e = Zt(r).replace(/\+/g, "-").replace(/\//g, "_");
  return t ? e.replace(/=/g, "") : e;
}, _e = (r) => St((r + "===".slice((r.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/"));
var P = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function he(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function de() {
  this.__data__ = [], this.size = 0;
}
var be = de;
function pe(r, t) {
  return r === t || r !== r && t !== t;
}
var xt = pe, ve = xt;
function me(r, t) {
  for (var e = r.length; e--; )
    if (ve(r[e][0], t))
      return e;
  return -1;
}
var F = me, ye = F, we = Array.prototype, De = we.splice;
function Ae(r) {
  var t = this.__data__, e = ye(t, r);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : De.call(t, e, 1), --this.size, !0;
}
var $e = Ae, Oe = F;
function Ce(r) {
  var t = this.__data__, e = Oe(t, r);
  return e < 0 ? void 0 : t[e][1];
}
var Ee = Ce, je = F;
function Te(r) {
  return je(this.__data__, r) > -1;
}
var Le = Te, Ne = F;
function Me(r, t) {
  var e = this.__data__, n = Ne(e, r);
  return n < 0 ? (++this.size, e.push([r, t])) : e[n][1] = t, this;
}
var Pe = Me, xe = be, Re = $e, ke = Ee, Ge = Le, ze = Pe;
function C(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.clear(); ++t < e; ) {
    var n = r[t];
    this.set(n[0], n[1]);
  }
}
C.prototype.clear = xe;
C.prototype.delete = Re;
C.prototype.get = ke;
C.prototype.has = Ge;
C.prototype.set = ze;
var q = C, Ue = q;
function Fe() {
  this.__data__ = new Ue(), this.size = 0;
}
var qe = Fe;
function He(r) {
  var t = this.__data__, e = t.delete(r);
  return this.size = t.size, e;
}
var Ke = He;
function Ve(r) {
  return this.__data__.get(r);
}
var We = Ve;
function Xe(r) {
  return this.__data__.has(r);
}
var Ye = Xe, Qe = typeof P == "object" && P && P.Object === Object && P, Rt = Qe, Ze = Rt, Se = typeof self == "object" && self && self.Object === Object && self, Ie = Ze || Se || Function("return this")(), A = Ie, Be = A, Je = Be.Symbol, nt = Je, ot = nt, kt = Object.prototype, tr = kt.hasOwnProperty, er = kt.toString, M = ot ? ot.toStringTag : void 0;
function rr(r) {
  var t = tr.call(r, M), e = r[M];
  try {
    r[M] = void 0;
    var n = !0;
  } catch {
  }
  var a = er.call(r);
  return n && (t ? r[M] = e : delete r[M]), a;
}
var nr = rr, ir = Object.prototype, ar = ir.toString;
function sr(r) {
  return ar.call(r);
}
var or = sr, lt = nt, lr = nr, cr = or, gr = "[object Null]", ur = "[object Undefined]", ct = lt ? lt.toStringTag : void 0;
function fr(r) {
  return r == null ? r === void 0 ? ur : gr : ct && ct in Object(r) ? lr(r) : cr(r);
}
var H = fr;
function _r(r) {
  var t = typeof r;
  return r != null && (t == "object" || t == "function");
}
var Gt = _r, hr = H, dr = Gt, br = "[object AsyncFunction]", pr = "[object Function]", vr = "[object GeneratorFunction]", mr = "[object Proxy]";
function yr(r) {
  if (!dr(r))
    return !1;
  var t = hr(r);
  return t == pr || t == vr || t == br || t == mr;
}
var zt = yr, wr = A, Dr = wr["__core-js_shared__"], Ar = Dr, X = Ar, gt = function() {
  var r = /[^.]+$/.exec(X && X.keys && X.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function $r(r) {
  return !!gt && gt in r;
}
var Or = $r, Cr = Function.prototype, Er = Cr.toString;
function jr(r) {
  if (r != null) {
    try {
      return Er.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var Ut = jr, Tr = zt, Lr = Or, Nr = Gt, Mr = Ut, Pr = /[\\^$.*+?()[\]{}|]/g, xr = /^\[object .+?Constructor\]$/, Rr = Function.prototype, kr = Object.prototype, Gr = Rr.toString, zr = kr.hasOwnProperty, Ur = RegExp(
  "^" + Gr.call(zr).replace(Pr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fr(r) {
  if (!Nr(r) || Lr(r))
    return !1;
  var t = Tr(r) ? Ur : xr;
  return t.test(Mr(r));
}
var qr = Fr;
function Hr(r, t) {
  return r == null ? void 0 : r[t];
}
var Kr = Hr, Vr = qr, Wr = Kr;
function Xr(r, t) {
  var e = Wr(r, t);
  return Vr(e) ? e : void 0;
}
var E = Xr, Yr = E, Qr = A, Zr = Yr(Qr, "Map"), it = Zr, Sr = E, Ir = Sr(Object, "create"), K = Ir, ut = K;
function Br() {
  this.__data__ = ut ? ut(null) : {}, this.size = 0;
}
var Jr = Br;
function tn(r) {
  var t = this.has(r) && delete this.__data__[r];
  return this.size -= t ? 1 : 0, t;
}
var en = tn, rn = K, nn = "__lodash_hash_undefined__", an = Object.prototype, sn = an.hasOwnProperty;
function on(r) {
  var t = this.__data__;
  if (rn) {
    var e = t[r];
    return e === nn ? void 0 : e;
  }
  return sn.call(t, r) ? t[r] : void 0;
}
var ln = on, cn = K, gn = Object.prototype, un = gn.hasOwnProperty;
function fn(r) {
  var t = this.__data__;
  return cn ? t[r] !== void 0 : un.call(t, r);
}
var _n = fn, hn = K, dn = "__lodash_hash_undefined__";
function bn(r, t) {
  var e = this.__data__;
  return this.size += this.has(r) ? 0 : 1, e[r] = hn && t === void 0 ? dn : t, this;
}
var pn = bn, vn = Jr, mn = en, yn = ln, wn = _n, Dn = pn;
function j(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.clear(); ++t < e; ) {
    var n = r[t];
    this.set(n[0], n[1]);
  }
}
j.prototype.clear = vn;
j.prototype.delete = mn;
j.prototype.get = yn;
j.prototype.has = wn;
j.prototype.set = Dn;
var An = j, ft = An, $n = q, On = it;
function Cn() {
  this.size = 0, this.__data__ = {
    hash: new ft(),
    map: new (On || $n)(),
    string: new ft()
  };
}
var En = Cn;
function jn(r) {
  var t = typeof r;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? r !== "__proto__" : r === null;
}
var Tn = jn, Ln = Tn;
function Nn(r, t) {
  var e = r.__data__;
  return Ln(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
var V = Nn, Mn = V;
function Pn(r) {
  var t = Mn(this, r).delete(r);
  return this.size -= t ? 1 : 0, t;
}
var xn = Pn, Rn = V;
function kn(r) {
  return Rn(this, r).get(r);
}
var Gn = kn, zn = V;
function Un(r) {
  return zn(this, r).has(r);
}
var Fn = Un, qn = V;
function Hn(r, t) {
  var e = qn(this, r), n = e.size;
  return e.set(r, t), this.size += e.size == n ? 0 : 1, this;
}
var Kn = Hn, Vn = En, Wn = xn, Xn = Gn, Yn = Fn, Qn = Kn;
function T(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.clear(); ++t < e; ) {
    var n = r[t];
    this.set(n[0], n[1]);
  }
}
T.prototype.clear = Vn;
T.prototype.delete = Wn;
T.prototype.get = Xn;
T.prototype.has = Yn;
T.prototype.set = Qn;
var Ft = T, Zn = q, Sn = it, In = Ft, Bn = 200;
function Jn(r, t) {
  var e = this.__data__;
  if (e instanceof Zn) {
    var n = e.__data__;
    if (!Sn || n.length < Bn - 1)
      return n.push([r, t]), this.size = ++e.size, this;
    e = this.__data__ = new In(n);
  }
  return e.set(r, t), this.size = e.size, this;
}
var ti = Jn, ei = q, ri = qe, ni = Ke, ii = We, ai = Ye, si = ti;
function L(r) {
  var t = this.__data__ = new ei(r);
  this.size = t.size;
}
L.prototype.clear = ri;
L.prototype.delete = ni;
L.prototype.get = ii;
L.prototype.has = ai;
L.prototype.set = si;
var oi = L, li = "__lodash_hash_undefined__";
function ci(r) {
  return this.__data__.set(r, li), this;
}
var gi = ci;
function ui(r) {
  return this.__data__.has(r);
}
var fi = ui, _i = Ft, hi = gi, di = fi;
function R(r) {
  var t = -1, e = r == null ? 0 : r.length;
  for (this.__data__ = new _i(); ++t < e; )
    this.add(r[t]);
}
R.prototype.add = R.prototype.push = hi;
R.prototype.has = di;
var bi = R;
function pi(r, t) {
  for (var e = -1, n = r == null ? 0 : r.length; ++e < n; )
    if (t(r[e], e, r))
      return !0;
  return !1;
}
var vi = pi;
function mi(r, t) {
  return r.has(t);
}
var yi = mi, wi = bi, Di = vi, Ai = yi, $i = 1, Oi = 2;
function Ci(r, t, e, n, a, i) {
  var o = e & $i, l = r.length, c = t.length;
  if (l != c && !(o && c > l))
    return !1;
  var g = i.get(r), _ = i.get(t);
  if (g && _)
    return g == t && _ == r;
  var u = -1, f = !0, d = e & Oi ? new wi() : void 0;
  for (i.set(r, t), i.set(t, r); ++u < l; ) {
    var b = r[u], h = t[u];
    if (n)
      var p = o ? n(h, b, u, t, r, i) : n(b, h, u, r, t, i);
    if (p !== void 0) {
      if (p)
        continue;
      f = !1;
      break;
    }
    if (d) {
      if (!Di(t, function(v, y) {
        if (!Ai(d, y) && (b === v || a(b, v, e, n, i)))
          return d.push(y);
      })) {
        f = !1;
        break;
      }
    } else if (!(b === h || a(b, h, e, n, i))) {
      f = !1;
      break;
    }
  }
  return i.delete(r), i.delete(t), f;
}
var qt = Ci, Ei = A, ji = Ei.Uint8Array, Ti = ji;
function Li(r) {
  var t = -1, e = Array(r.size);
  return r.forEach(function(n, a) {
    e[++t] = [a, n];
  }), e;
}
var Ni = Li;
function Mi(r) {
  var t = -1, e = Array(r.size);
  return r.forEach(function(n) {
    e[++t] = n;
  }), e;
}
var Pi = Mi, _t = nt, ht = Ti, xi = xt, Ri = qt, ki = Ni, Gi = Pi, zi = 1, Ui = 2, Fi = "[object Boolean]", qi = "[object Date]", Hi = "[object Error]", Ki = "[object Map]", Vi = "[object Number]", Wi = "[object RegExp]", Xi = "[object Set]", Yi = "[object String]", Qi = "[object Symbol]", Zi = "[object ArrayBuffer]", Si = "[object DataView]", dt = _t ? _t.prototype : void 0, Y = dt ? dt.valueOf : void 0;
function Ii(r, t, e, n, a, i, o) {
  switch (e) {
    case Si:
      if (r.byteLength != t.byteLength || r.byteOffset != t.byteOffset)
        return !1;
      r = r.buffer, t = t.buffer;
    case Zi:
      return !(r.byteLength != t.byteLength || !i(new ht(r), new ht(t)));
    case Fi:
    case qi:
    case Vi:
      return xi(+r, +t);
    case Hi:
      return r.name == t.name && r.message == t.message;
    case Wi:
    case Yi:
      return r == t + "";
    case Ki:
      var l = ki;
    case Xi:
      var c = n & zi;
      if (l || (l = Gi), r.size != t.size && !c)
        return !1;
      var g = o.get(r);
      if (g)
        return g == t;
      n |= Ui, o.set(r, t);
      var _ = Ri(l(r), l(t), n, a, i, o);
      return o.delete(r), _;
    case Qi:
      if (Y)
        return Y.call(r) == Y.call(t);
  }
  return !1;
}
var Bi = Ii;
function Ji(r, t) {
  for (var e = -1, n = t.length, a = r.length; ++e < n; )
    r[a + e] = t[e];
  return r;
}
var ta = Ji, ea = Array.isArray, at = ea, ra = ta, na = at;
function ia(r, t, e) {
  var n = t(r);
  return na(r) ? n : ra(n, e(r));
}
var aa = ia;
function sa(r, t) {
  for (var e = -1, n = r == null ? 0 : r.length, a = 0, i = []; ++e < n; ) {
    var o = r[e];
    t(o, e, r) && (i[a++] = o);
  }
  return i;
}
var oa = sa;
function la() {
  return [];
}
var ca = la, ga = oa, ua = ca, fa = Object.prototype, _a = fa.propertyIsEnumerable, bt = Object.getOwnPropertySymbols, ha = bt ? function(r) {
  return r == null ? [] : (r = Object(r), ga(bt(r), function(t) {
    return _a.call(r, t);
  }));
} : ua, da = ha;
function ba(r, t) {
  for (var e = -1, n = Array(r); ++e < r; )
    n[e] = t(e);
  return n;
}
var pa = ba;
function va(r) {
  return r != null && typeof r == "object";
}
var W = va, ma = H, ya = W, wa = "[object Arguments]";
function Da(r) {
  return ya(r) && ma(r) == wa;
}
var Aa = Da, pt = Aa, $a = W, Ht = Object.prototype, Oa = Ht.hasOwnProperty, Ca = Ht.propertyIsEnumerable, Ea = pt(/* @__PURE__ */ function() {
  return arguments;
}()) ? pt : function(r) {
  return $a(r) && Oa.call(r, "callee") && !Ca.call(r, "callee");
}, ja = Ea, k = { exports: {} };
function Ta() {
  return !1;
}
var La = Ta;
k.exports;
(function(r, t) {
  var e = A, n = La, a = t && !t.nodeType && t, i = a && !0 && r && !r.nodeType && r, o = i && i.exports === a, l = o ? e.Buffer : void 0, c = l ? l.isBuffer : void 0, g = c || n;
  r.exports = g;
})(k, k.exports);
var Kt = k.exports, Na = 9007199254740991, Ma = /^(?:0|[1-9]\d*)$/;
function Pa(r, t) {
  var e = typeof r;
  return t = t ?? Na, !!t && (e == "number" || e != "symbol" && Ma.test(r)) && r > -1 && r % 1 == 0 && r < t;
}
var xa = Pa, Ra = 9007199254740991;
function ka(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Ra;
}
var Vt = ka, Ga = H, za = Vt, Ua = W, Fa = "[object Arguments]", qa = "[object Array]", Ha = "[object Boolean]", Ka = "[object Date]", Va = "[object Error]", Wa = "[object Function]", Xa = "[object Map]", Ya = "[object Number]", Qa = "[object Object]", Za = "[object RegExp]", Sa = "[object Set]", Ia = "[object String]", Ba = "[object WeakMap]", Ja = "[object ArrayBuffer]", ts = "[object DataView]", es = "[object Float32Array]", rs = "[object Float64Array]", ns = "[object Int8Array]", is = "[object Int16Array]", as = "[object Int32Array]", ss = "[object Uint8Array]", os = "[object Uint8ClampedArray]", ls = "[object Uint16Array]", cs = "[object Uint32Array]", m = {};
m[es] = m[rs] = m[ns] = m[is] = m[as] = m[ss] = m[os] = m[ls] = m[cs] = !0;
m[Fa] = m[qa] = m[Ja] = m[Ha] = m[ts] = m[Ka] = m[Va] = m[Wa] = m[Xa] = m[Ya] = m[Qa] = m[Za] = m[Sa] = m[Ia] = m[Ba] = !1;
function gs(r) {
  return Ua(r) && za(r.length) && !!m[Ga(r)];
}
var us = gs;
function fs(r) {
  return function(t) {
    return r(t);
  };
}
var _s = fs, G = { exports: {} };
G.exports;
(function(r, t) {
  var e = Rt, n = t && !t.nodeType && t, a = n && !0 && r && !r.nodeType && r, i = a && a.exports === n, o = i && e.process, l = function() {
    try {
      var c = a && a.require && a.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  r.exports = l;
})(G, G.exports);
var hs = G.exports, ds = us, bs = _s, vt = hs, mt = vt && vt.isTypedArray, ps = mt ? bs(mt) : ds, Wt = ps, vs = pa, ms = ja, ys = at, ws = Kt, Ds = xa, As = Wt, $s = Object.prototype, Os = $s.hasOwnProperty;
function Cs(r, t) {
  var e = ys(r), n = !e && ms(r), a = !e && !n && ws(r), i = !e && !n && !a && As(r), o = e || n || a || i, l = o ? vs(r.length, String) : [], c = l.length;
  for (var g in r)
    (t || Os.call(r, g)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
    Ds(g, c))) && l.push(g);
  return l;
}
var Es = Cs, js = Object.prototype;
function Ts(r) {
  var t = r && r.constructor, e = typeof t == "function" && t.prototype || js;
  return r === e;
}
var Ls = Ts;
function Ns(r, t) {
  return function(e) {
    return r(t(e));
  };
}
var Ms = Ns, Ps = Ms, xs = Ps(Object.keys, Object), Rs = xs, ks = Ls, Gs = Rs, zs = Object.prototype, Us = zs.hasOwnProperty;
function Fs(r) {
  if (!ks(r))
    return Gs(r);
  var t = [];
  for (var e in Object(r))
    Us.call(r, e) && e != "constructor" && t.push(e);
  return t;
}
var qs = Fs, Hs = zt, Ks = Vt;
function Vs(r) {
  return r != null && Ks(r.length) && !Hs(r);
}
var Ws = Vs, Xs = Es, Ys = qs, Qs = Ws;
function Zs(r) {
  return Qs(r) ? Xs(r) : Ys(r);
}
var Ss = Zs, Is = aa, Bs = da, Js = Ss;
function to(r) {
  return Is(r, Js, Bs);
}
var eo = to, yt = eo, ro = 1, no = Object.prototype, io = no.hasOwnProperty;
function ao(r, t, e, n, a, i) {
  var o = e & ro, l = yt(r), c = l.length, g = yt(t), _ = g.length;
  if (c != _ && !o)
    return !1;
  for (var u = c; u--; ) {
    var f = l[u];
    if (!(o ? f in t : io.call(t, f)))
      return !1;
  }
  var d = i.get(r), b = i.get(t);
  if (d && b)
    return d == t && b == r;
  var h = !0;
  i.set(r, t), i.set(t, r);
  for (var p = o; ++u < c; ) {
    f = l[u];
    var v = r[f], y = t[f];
    if (n)
      var w = o ? n(y, v, f, t, r, i) : n(v, y, f, r, t, i);
    if (!(w === void 0 ? v === y || a(v, y, e, n, i) : w)) {
      h = !1;
      break;
    }
    p || (p = f == "constructor");
  }
  if (h && !p) {
    var D = r.constructor, O = t.constructor;
    D != O && "constructor" in r && "constructor" in t && !(typeof D == "function" && D instanceof D && typeof O == "function" && O instanceof O) && (h = !1);
  }
  return i.delete(r), i.delete(t), h;
}
var so = ao, oo = E, lo = A, co = oo(lo, "DataView"), go = co, uo = E, fo = A, _o = uo(fo, "Promise"), ho = _o, bo = E, po = A, vo = bo(po, "Set"), mo = vo, yo = E, wo = A, Do = yo(wo, "WeakMap"), Ao = Do, I = go, B = it, J = ho, tt = mo, et = Ao, Xt = H, N = Ut, wt = "[object Map]", $o = "[object Object]", Dt = "[object Promise]", At = "[object Set]", $t = "[object WeakMap]", Ot = "[object DataView]", Oo = N(I), Co = N(B), Eo = N(J), jo = N(tt), To = N(et), $ = Xt;
(I && $(new I(new ArrayBuffer(1))) != Ot || B && $(new B()) != wt || J && $(J.resolve()) != Dt || tt && $(new tt()) != At || et && $(new et()) != $t) && ($ = function(r) {
  var t = Xt(r), e = t == $o ? r.constructor : void 0, n = e ? N(e) : "";
  if (n)
    switch (n) {
      case Oo:
        return Ot;
      case Co:
        return wt;
      case Eo:
        return Dt;
      case jo:
        return At;
      case To:
        return $t;
    }
  return t;
});
var Lo = $, Q = oi, No = qt, Mo = Bi, Po = so, Ct = Lo, Et = at, jt = Kt, xo = Wt, Ro = 1, Tt = "[object Arguments]", Lt = "[object Array]", x = "[object Object]", ko = Object.prototype, Nt = ko.hasOwnProperty;
function Go(r, t, e, n, a, i) {
  var o = Et(r), l = Et(t), c = o ? Lt : Ct(r), g = l ? Lt : Ct(t);
  c = c == Tt ? x : c, g = g == Tt ? x : g;
  var _ = c == x, u = g == x, f = c == g;
  if (f && jt(r)) {
    if (!jt(t))
      return !1;
    o = !0, _ = !1;
  }
  if (f && !_)
    return i || (i = new Q()), o || xo(r) ? No(r, t, e, n, a, i) : Mo(r, t, c, e, n, a, i);
  if (!(e & Ro)) {
    var d = _ && Nt.call(r, "__wrapped__"), b = u && Nt.call(t, "__wrapped__");
    if (d || b) {
      var h = d ? r.value() : r, p = b ? t.value() : t;
      return i || (i = new Q()), a(h, p, e, n, i);
    }
  }
  return f ? (i || (i = new Q()), Po(r, t, e, n, a, i)) : !1;
}
var zo = Go, Uo = zo, Mt = W;
function Yt(r, t, e, n, a) {
  return r === t ? !0 : r == null || t == null || !Mt(r) && !Mt(t) ? r !== r && t !== t : Uo(r, t, e, n, Yt, a);
}
var Fo = Yt, qo = Fo;
function Ho(r, t) {
  return qo(r, t);
}
var Ko = Ho;
const Ll = /* @__PURE__ */ he(Ko), Nl = (r) => r.slice(r.indexOf(".") + 1);
var Vo = /* @__PURE__ */ ((r) => (r.Primary = "primary", r.Secondary = "secondary", r.Danger = "danger", r.Warning = "warning", r.Success = "success", r))(Vo || {});
const Wo = ":root,.ui-standard{--signal-primary-minor-2: #1e0e33;--signal-primary-minor-1: #2d154d;--signal-primary: #9747ff;--signal-primary-major-1: #a159ff;--signal-primary-major-2: #ac6cff;--signal-primary-major-3: #b67eff;--signal-primary-contrast: #ffffff;--signal-secondary-minor-2: #0b0b0c;--signal-secondary-minor-1: #121214;--signal-secondary: #232427;--signal-secondary-major-1: #393a3d;--signal-secondary-major-2: #4f5052;--signal-secondary-major-3: #656668;--signal-secondary-contrast: #ffffff;--signal-danger-minor-2: #310b12;--signal-danger-minor-1: #4a111b;--signal-danger: #f5385a;--signal-danger-major-1: #f64c6b;--signal-danger-major-2: #f7607b;--signal-danger-major-3: #f8748c;--signal-danger-contrast: #ffffff;--signal-warning-minor-2: #331200;--signal-warning-minor-1: #4d1b00;--signal-warning: #ff9900;--signal-warning-major-1: #ffa31a;--signal-warning-major-2: #ffad33;--signal-warning-major-3: #ffb84d;--signal-warning-contrast: #000000;--signal-success-minor-2: #06221b;--signal-success-minor-1: #093228;--signal-success: #1ea885;--signal-success-major-1: #35b191;--signal-success-major-2: #4bb99d;--signal-success-major-3: #62c2aa;--signal-success-contrast: #ffffff;--signal-info-minor-2: #072029;--signal-info-minor-1: #0b2f3e;--signal-info: #239ece;--signal-info-major-1: #39a8d3;--signal-info-major-2: #4fb1d8;--signal-info-major-3: #65bbdd;--signal-info-contrast: #ffffff;--interaction-norm-minor-2: #1e0e33;--interaction-norm-minor-1: #2d154d;--interaction-norm: #9747ff;--interaction-norm-major-1: #a159ff;--interaction-norm-major-2: #ac6cff;--interaction-norm-major-3: #b67eff;--interaction-norm-contrast: #ffffff;--interaction-weak-minor-2: #16151a;--interaction-weak-minor-1: #25232c;--interaction-weak: #4a4658;--interaction-weak-major-1: #5c5969;--interaction-weak-major-2: #6e6b79;--interaction-weak-major-3: #807e8a;--interaction-weak-contrast: #ffffff;--text-norm: white;--text-weak: #a7a4b5;--text-hint: #6d697d;--text-disabled: #5b576b;--text-invert: #1c1b24;--field-norm: #5b576b;--field-hover: #6d697d;--field-disabled: #3f3b4c;--focus-outline: #9747ff;--focus-ring: rgba(151, 71, 255, .3);--border-norm: #4a4658;--border-weak: #343140;--background-norm: #09090d;--background-weak: #121216;--background-strong: #3f3b4c;--background-invert: white;--interaction-default: transparent;--interaction-default-hover: rgb(91 87 107 / .2);--interaction-default-active: rgb(91 87 107 / .4);--shadow-norm-opacity: .5;--shadow-lifted-opacity: .75;--backdrop-norm: rgb(0 0 0 / .48);--optional-scrollbar-thumb-color: #4a4658;--optional-scrollbar-thumb-hover-color: #5b576b}", Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wo
}, Symbol.toStringTag, { value: "Module" })), Yo = ":root,.ui-standard{--primary: #6d4aff;--primary-contrast: white;--signal-danger-minor-2: #fcebee;--signal-danger-minor-1: #f8d6dc;--signal-danger: #dc3251;--signal-danger-major-1: #c62d49;--signal-danger-major-2: #b02841;--signal-danger-major-3: #9a2339;--signal-danger-contrast: #ffffff;--signal-warning-minor-2: #fff5e6;--signal-warning-minor-1: #ffebcc;--signal-warning: #ff9900;--signal-warning-major-1: #f27d00;--signal-warning-major-2: #e66300;--signal-warning-major-3: #d94c00;--signal-warning-contrast: #000000;--signal-success-minor-2: #e9f6f3;--signal-success-minor-1: #d2eee7;--signal-success: #1ea885;--signal-success-major-1: #1b9778;--signal-success-major-2: #18866a;--signal-success-major-3: #15765d;--signal-success-contrast: #ffffff;--signal-info-minor-2: #e9f5fa;--signal-info-minor-1: #d3ecf5;--signal-info: #239ece;--signal-info-major-1: #208eb9;--signal-info-major-2: #1c7ea5;--signal-info-major-3: #196f90;--signal-info-contrast: #ffffff;--interaction-norm-minor-2: #f0edff;--interaction-norm-minor-1: #e2dbff;--interaction-norm: #6d4aff;--interaction-norm-major-1: #6243e6;--interaction-norm-major-2: #573bcc;--interaction-norm-major-3: #4c34b3;--interaction-norm-contrast: #ffffff;--interaction-weak-minor-2: #f9f8f7;--interaction-weak-minor-1: #f5f3f2;--interaction-weak: #eae7e4;--interaction-weak-major-1: #dedbd9;--interaction-weak-major-2: #d3d0cd;--interaction-weak-major-3: #c7c4c2;--interaction-weak-contrast: #000000;--text-norm: #0c0c14;--text-weak: #5c5958;--text-hint: #8f8d8a;--text-disabled: #c2bfbc;--text-invert: white;--field-norm: #adaba8;--field-hover: #8f8d8a;--field-disabled: #d1cfcd;--focus-outline: #6d4aff;--focus-ring: rgb(109 74 255 / .2);--border-norm: #d1cfcd;--border-weak: #eae7e4;--background-norm: #ff0000;--background-weak: #f5f4f2;--background-strong: #e5e4e1;--background-invert: #0c0c14;--interaction-default: transparent;--interaction-default-hover: rgb(194 193 192 / .2);--interaction-default-active: rgb(194 192 190 / .35);--shadow-norm-opacity: .1;--shadow-lifted-opacity: .16;--backdrop-norm: rgb(38 42 51 / .48);--optional-scrollbar-thumb-color: #d1cfcd;--optional-scrollbar-thumb-hover-color: #c2bfbc}", Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yo
}, Symbol.toStringTag, { value: "Module" }));
var Zo = /* @__PURE__ */ ((r) => (r[r.Carbon = 0] = "Carbon", r[r.Snow = 1] = "Snow", r))(Zo || {});
const st = 0, So = {
  0: {
    label: "Carbon",
    identifier: 0,
    theme: Xo
  },
  1: {
    label: "Snow",
    identifier: 1,
    theme: Qo
  }
}, Ml = () => [
  0
  /* Carbon */
], Pl = () => [
  0,
  1
  /* Snow */
].map((r) => So[r]);
var Io = /* @__PURE__ */ ((r) => (r[r.Auto = 0] = "Auto", r[r.Dark = 1] = "Dark", r[r.Light = 2] = "Light", r))(Io || {}), Bo = /* @__PURE__ */ ((r) => (r[r.Dark = 0] = "Dark", r[r.Light = 1] = "Light", r))(Bo || {}), Jo = /* @__PURE__ */ ((r) => (r[r.DEFAULT = 0] = "DEFAULT", r[r.X_SMALL = 1] = "X_SMALL", r[r.SMALL = 2] = "SMALL", r[r.LARGE = 3] = "LARGE", r[r.X_LARGE = 4] = "X_LARGE", r))(Jo || {}), tl = /* @__PURE__ */ ((r) => (r[r.DEFAULT = 0] = "DEFAULT", r[r.SCROLLBARS_OFF = 1] = "SCROLLBARS_OFF", r[r.ANIMATIONS_OFF = 2] = "ANIMATIONS_OFF", r))(tl || {});
const rt = (r) => ({
  Mode: 2,
  LightTheme: r || st,
  DarkTheme: 0,
  FontSize: 0,
  Features: 0
  /* DEFAULT */
}), z = (r) => {
  if (r >= 0 && r <= 1)
    return r;
}, el = (r) => z(Number(r)), rl = (r) => {
  if (r !== void 0 && r >= 0 && r <= 2)
    return r;
}, nl = (r) => {
  if (r !== void 0 && r >= 0 && r <= 4)
    return r;
}, il = (r) => {
  if (r !== void 0 && r >= 0 && r <= 32)
    return r;
}, xl = (r) => {
  if (r && (r == null ? void 0 : r.length) === 1) {
    const e = el(r);
    if (e !== void 0)
      return rt(e);
  }
  const t = rt(st);
  if (r && (r == null ? void 0 : r.length) >= 10)
    try {
      const e = JSON.parse(_e(r));
      return {
        Mode: rl(e.Mode) ?? t.Mode,
        LightTheme: z(e.LightTheme) ?? t.LightTheme,
        DarkTheme: z(e.DarkTheme) ?? t.DarkTheme,
        FontSize: nl(e.FontSize) ?? t.FontSize,
        Features: il(e.Features) ?? t.Features
      };
    } catch {
    }
  return t;
}, al = (r, t) => Object.entries(r).reduce((e, [n, a]) => {
  const i = n, o = t[i];
  return a !== o && (e[i] = o), e;
}, {}), Rl = (r) => {
  const t = al(rt(), r), e = Object.keys(t);
  if (e.length)
    return e.length === 1 && e[0] === "LightTheme" ? `${t.LightTheme}` : fe(JSON.stringify(t));
}, kl = (r, t) => {
  let e;
  switch (r.Mode) {
    case 0:
      e = t === 0 ? r.DarkTheme : r.LightTheme;
      break;
    case 1:
      e = r.DarkTheme;
      break;
    case 2:
      e = r.LightTheme;
      break;
    default:
      e = r.DarkTheme;
      break;
  }
  return z(e) ?? st;
};
export {
  S as APPS,
  U as APPS_CONFIGURATION,
  Z as BRAND_NAME,
  Bo as ColorScheme,
  ge as CookieSameSiteAttribute,
  te as DAY,
  cl as DAY_IN_SECONDS,
  st as DEFAULT_THEME,
  se as DESKTOP_PLATFORMS,
  gl as EMAIL_PLACEHOLDER,
  Jt as HOUR,
  ie as HOUR_IN_SECONDS,
  ae as HTTP_STATUS_CODE,
  Bt as MINUTE,
  ne as MINUTE_IN_SECONDS,
  re as MONTH,
  dl as REDNIGHT_DOMAINS,
  oe as REDNIGHT_WEBSITES,
  hl as REGEX_EMAIL,
  It as SECOND,
  _l as SSO_PATHS,
  fl as TEAM_NAME,
  So as THEMES_MAP,
  Vo as ThemeColor,
  tl as ThemeFeatureSetting,
  Jo as ThemeFontSizeSetting,
  Io as ThemeModeSetting,
  Zo as ThemeTypes,
  ul as USERNAME_PLACEHOLDER,
  ee as WEEK,
  ll as YEAR,
  Al as clearBit,
  Cl as createCache,
  ce as createListeners,
  _e as decodeBase64URL,
  Tl as deleteCookie,
  fe as encodeBase64URL,
  pl as getAccountSettingsApp,
  bl as getAppHrefBundle,
  ml as getAppName,
  yl as getAppShortName,
  Ol as getBits,
  vl as getClientID,
  jl as getCookie,
  El as getCookies,
  Ml as getDarkThemes,
  rt as getDefaultThemeSetting,
  xl as getParsedThemeSetting,
  Nl as getSecondLevelDomain,
  kl as getThemeType,
  Pl as getThemes,
  le as hasBit,
  $l as hasBitBigInt,
  Ll as isDeepEqual,
  Rl as serializeThemeSetting,
  wl as setBit,
  ue as setCookie,
  Dl as toggleBit
};
