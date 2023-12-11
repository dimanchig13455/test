import "./index.css";
import { jsxs as F, jsx as a } from "react/jsx-runtime";
import { ThemeColor as H, DEFAULT_THEME as k, ThemeModeSetting as v, ThemeFontSizeSetting as I, ThemeFeatureSetting as K, getCookie as z, createListeners as U, getDarkThemes as q, getParsedThemeSetting as R, isDeepEqual as j, getDefaultThemeSetting as O, getThemeType as G, THEMES_MAP as x, ColorScheme as D, setBit as J, clearBit as Q, serializeThemeSetting as W, setCookie as X, getSecondLevelDomain as Y, getAppHrefBundle as Z } from "@rednight/shared";
import { generateUID as ee, clsx as P, noop as g } from "@rednight/utils";
import { forwardRef as N, createContext as A, useContext as M, useState as T, useEffect as p, useCallback as te, useLayoutEffect as oe, useMemo as ne } from "react";
import { Link as re, BrowserRouter as se } from "react-router-dom";
const ie = ({ size: o, className: e, ...i }) => {
  const n = ee("circle_loader");
  return /* @__PURE__ */ F(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: P("circle-loader", o && `is-${o}`, e),
      viewBox: "0 0 16 16",
      "data-testid": "circle_loader",
      ...i,
      children: [
        /* @__PURE__ */ a("defs", { children: /* @__PURE__ */ a(
          "circle",
          {
            id: n,
            cx: "8",
            cy: "8",
            r: "7"
          }
        ) }),
        /* @__PURE__ */ a(
          "use",
          {
            href: `#${n}`,
            className: "circle-loader-track"
          }
        ),
        /* @__PURE__ */ a(
          "use",
          {
            href: `#${n}`,
            className: "circle-loader-circle"
          }
        )
      ]
    }
  );
}, ce = "button", ue = ({
  loading: o = !1,
  disabled: e = !1,
  fullWidth: i = !1,
  className: n,
  tabIndex: u,
  children: d,
  shape: c = "solid",
  color: r = H.Primary,
  size: m = "medium",
  as: E,
  "data-testid": y,
  ...f
}, w) => {
  const t = o || e, s = E || ce, l = P(
    "button",
    i && "w-full",
    m !== "medium" && `button-${m}`,
    `button-${c}-${r}`,
    s !== "button" && "inline-block text-center",
    n
  ), L = f.onClick && !f.type ? { role: "button" } : void 0;
  return /* @__PURE__ */ F(
    s,
    {
      ref: w,
      className: l,
      disabled: t,
      tabIndex: t ? -1 : u,
      "aria-busy": o,
      "data-testid": y,
      ...L,
      ...f,
      children: [
        d,
        o && /* @__PURE__ */ a("span", { className: "button-loader-container", children: /* @__PURE__ */ a(ie, {}) })
      ]
    }
  );
}, we = N(ue), _ = A(null), ae = ({ config: o, children: e }) => /* @__PURE__ */ a(_.Provider, { value: o, children: e }), de = () => M(_), B = A(!0), b = [
  "mousemove",
  "mousedown",
  "mouseup",
  "pointermove",
  "pointerdown",
  "pointerup",
  "touchmove",
  "touchstart",
  "touchend"
], me = ({ children: o }) => {
  const [e, i] = T(!0);
  return p(() => {
    const n = () => {
      i(!1);
    }, u = (r) => {
      const m = r.target;
      m.nodeName && m.nodeName.toLowerCase() === "html" || (i(!1), b.map((E) => {
        document.removeEventListener(E, u);
      }));
    }, d = (r) => {
      r.key === "Tab" && i(!0);
    }, c = () => {
      document.visibilityState === "hidden" && (i(!0), b.map((r) => {
        document.addEventListener(r, u);
      }));
    };
    return document.addEventListener("keydown", d, !0), document.addEventListener("mousedown", n, !0), document.addEventListener("pointerdown", n, !0), document.addEventListener("touchstart", n, !0), document.addEventListener("visibilitychange", c, !0), b.map((r) => {
      document.addEventListener(r, u);
    }), () => {
      document.removeEventListener("keydown", d, !0), document.removeEventListener("mousedown", n, !0), document.removeEventListener("pointerdown", n, !0), document.removeEventListener("touchstart", n, !0), document.removeEventListener(
        "visibilitychange",
        c,
        !0
      ), b.map((r) => {
        document.removeEventListener(r, u);
      });
    };
  }, [i]), /* @__PURE__ */ a(B.Provider, { value: e, children: o });
}, Ce = () => {
  const [o, e] = T(!1), [i, n] = T(!1), u = M(B), d = () => {
    i || (n(!1), e(!1));
  }, c = () => {
    e(!0);
  }, r = () => {
    e(!1);
  };
  return p(() => {
    n(u && o);
  }, [u, o]), {
    focusVisible: i,
    onInput: d,
    onFocus: c,
    onBlur: r
  };
}, V = A({
  setTheme: g,
  setThemeSetting: g,
  setAutoTheme: g,
  setFontSize: g,
  setFeature: g,
  settings: {
    LightTheme: k,
    DarkTheme: k,
    Mode: v.Dark,
    FontSize: I.DEFAULT,
    Features: K.DEFAULT
  },
  addListener: () => g
}), le = (o = k) => {
  var e;
  return ((e = x[o]) == null ? void 0 : e.theme) || x[k].theme;
}, $ = "theme", he = z($), ve = "theme-root", h = window.matchMedia("(prefers-color-scheme: dark)"), C = (o) => o ? D.Dark : D.Light, S = U(), fe = q(), ge = ({ children: o }) => {
  const [e, i] = T(() => R(he)), n = te((t = O()) => {
    i((s) => j(t, s) ? s : t);
  }, []), [u, d] = T(() => C(h.matches));
  oe(() => {
    var s;
    d(C(h.matches));
    const t = (l) => {
      d(C(l.matches));
    };
    return (s = h.addEventListener) == null || s.call(h, "change", t), () => {
      var l;
      (l = h.removeEventListener) == null || l.call(h, "change", t);
    };
  }, []);
  const c = (t) => {
    S.notify(t), n(t);
  }, r = (t, s) => {
    if (s) {
      c({
        ...e,
        Mode: v.Auto,
        [s === v.Dark ? "DarkTheme" : "LightTheme"]: t
      });
      return;
    }
    fe.includes(t) ? c({ ...e, Mode: v.Dark, DarkTheme: t }) : c({ ...e, Mode: v.Light, LightTheme: t });
  }, m = (t) => {
    c(t ? { ...e, Mode: v.Auto } : {
      ...e,
      Mode: u === D.Light ? v.Light : v.Dark
    });
  }, E = (t) => {
    c({ ...e, FontSize: t });
  }, y = (t, s) => {
    c({
      ...e,
      Features: s ? J(e.Features, t) : Q(e.Features, t)
    });
  }, f = G(e, u), w = le(f);
  return p(() => {
    (() => {
      const s = document.querySelector('meta[name="theme-color"]'), l = document.querySelector(".ui-prominent"), L = l ? window.getComputedStyle(l).getPropertyValue("--background-norm").trim() : "";
      s && L && s.setAttribute("content", L);
    })();
  }, [f]), p(() => () => {
    S.clear();
  }, []), p(() => {
    (() => {
      const s = W(e);
      X({
        cookieName: $,
        cookieValue: s,
        cookieDomain: Y(window.location.hostname),
        path: "/",
        expirationDate: "max"
      });
    })();
  }, [e]), /* @__PURE__ */ F(
    V.Provider,
    {
      value: ne(() => ({
        settings: e,
        setTheme: r,
        setThemeSetting: n,
        setAutoTheme: m,
        setFontSize: E,
        setFeature: y,
        addListener: S.subscribe
      }), []),
      children: [
        /* @__PURE__ */ a("style", { id: ve, children: w.default }),
        o
      ]
    }
  );
}, Se = () => M(V), Ee = ({ to: o, toApp: e, selfOpening: i = !1, children: n, ...u }, d) => {
  const { APP_NAME: c } = de(), r = i ? c : e;
  if (r && (r !== c || i)) {
    const m = Z(o, r);
    return /* @__PURE__ */ a(
      "a",
      {
        ref: d,
        target: "_self",
        ...u,
        href: m,
        children: n
      }
    );
  }
  return /* @__PURE__ */ a(
    re,
    {
      ref: d,
      to: o,
      ...u,
      children: n
    }
  );
}, De = N(Ee), Fe = ({ config: o, children: e }) => /* @__PURE__ */ a(ae, { config: o, children: /* @__PURE__ */ a(ge, { children: /* @__PURE__ */ a(me, { children: /* @__PURE__ */ a(se, { children: e }) }) }) });
export {
  De as AppLink,
  we as Button,
  ie as CircleLoader,
  Fe as RednightApp,
  de as useConfig,
  Ce as useFocusVisible,
  Se as useTheme
};
