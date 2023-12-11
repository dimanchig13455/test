function i(...t) {
  return t.flat().filter((n) => typeof n == "string").map((n) => n.trim()).filter((n) => n !== "").join(" ");
}
let e = 0;
const o = (t) => `${t || "id"}_${e++}`, s = (t, n, r) => t >= n && t < r, c = (t) => !!t, l = () => {
}, p = (t, n) => n * (t * 0.01), u = (t) => t.replaceAll(/^\/+|\/+$/g, "");
export {
  i as clsx,
  o as generateUID,
  s as isBetween,
  c as isTruthy,
  l as noop,
  p as percentOf,
  u as stripLeadingAndTrailingSlash
};
