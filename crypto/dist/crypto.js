const o = (e) => (t) => t !== void 0 ? e(t) : void 0, n = o((e) => encodeURIComponent(e)), c = o((e) => decodeURIComponent(e)), d = o((e) => btoa(e).trim()), s = o((e) => atob(e.trim())), r = o((e) => d(n(e))), a = o((e) => c(s(e)));
export {
  s as decodeBase64,
  c as decodeUtf8,
  a as decodeUtf8Base64,
  d as encodeBase64,
  n as encodeUtf8,
  r as encodeUtf8Base64
};
