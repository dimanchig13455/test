import { default as isDeepEqual } from 'lodash/isEqual';
import JSBI from 'jsbi';

export declare type APP_KEYS = keyof typeof APPS;

export declare type APP_NAMES = (typeof APPS)[APP_KEYS];

declare interface AppConfiguration {
    publicPath: string;
    subdomain: string;
    name: string;
    bareName: string;
    clientID: string;
    icon: string;
    settingsSlug: string;
}

export declare const APPS: {
    readonly LANDING: "@rednight/landing";
    readonly ACCOUNT: "@rednight/account";
};

export declare const APPS_CONFIGURATION: {
    [key in APP_NAMES]: AppConfiguration;
};

export declare const BRAND_NAME = "Rednight";

declare interface Cache_2<K, V> extends Pick<Listeners<[K, V | undefined], void>, "subscribe">, Map<K, V> {
    clearListeners: () => void;
}
export { Cache_2 as Cache }

/**
 * Clear a bit from the number
 */
export declare const clearBit: (number: number | undefined, mask: number) => number;

export declare enum ColorScheme {
    Dark = 0,
    Light = 1
}

export declare enum CookieSameSiteAttribute {
    Lax = "lax",
    Strict = "strict",
    None = "none"
}

/**
 * Wraps a map with support for subscribe/unsubscribe on changes.
 */
export declare const createCache: <K, V>(map?: Map<K, V>) => Cache_2<K, V>;

export declare const createListeners: <A extends any[], R = void>() => Listeners<A, R>;

export declare const DAY: number;

export declare const DAY_IN_SECONDS: number;

/**
 * Convert a string encoded in base64 URL into a binary string
 * @param str
 */
export declare const decodeBase64URL: (str: string) => string;

export declare const DEFAULT_THEME = ThemeTypes.Carbon;

export declare const deleteCookie: (cookieName: string) => void;

export declare enum DESKTOP_PLATFORMS {
    LINUX = "linux",
    MACOS = "macos",
    WINDOWS = "windows"
}

export declare const EMAIL_PLACEHOLDER = "john@example.com";

/**
 * Encode a binary string in the so-called base64 URL (https://tools.ietf.org/html/rfc4648#section-5)
 * @dev Each character in a binary string can only be one of the characters in a reduced 255 ASCII alphabet. I.e. morally each character is one byte
 * @dev This function will fail if the argument contains characters which are not in this alphabet
 * @dev This encoding works by converting groups of three "bytes" into groups of four base64 characters (2 ** 6 ** 4 is also three bytes)
 * @dev Therefore, if the argument string has a length not divisible by three, the returned string will be padded with one or two '=' characters
 */
export declare const encodeBase64URL: (str: string, removePadding?: boolean) => string;

export declare const getAccountSettingsApp: () => "@rednight/account";

export declare const getAppHrefBundle: (to: string, toApp: APP_NAMES) => string;

export declare const getAppName: (appName: APP_NAMES) => string;

export declare const getAppShortName: (appName: APP_NAMES) => string;

/**
 * Get all bits which are toggled on in the respective bitmap
 */
export declare const getBits: (bitmap: number) => number[];

export declare const getClientID: (appName: APP_NAMES) => string;

export declare const getCookie: (name: string, cookies?: string) => string | undefined;

export declare const getCookies: () => string[];

export declare const getDarkThemes: () => ThemeTypes[];

export declare const getDefaultThemeSetting: (themeType?: ThemeTypes) => ThemeSetting;

export declare const getParsedThemeSetting: (storedThemeSetting: string | undefined) => ThemeSetting;

export declare const getSecondLevelDomain: (hostname: string) => string;

export declare const getThemes: () => ({
    label: string;
    identifier: ThemeTypes;
    theme: any;
} | {
    label: string;
    identifier: ThemeTypes;
    theme: any;
})[];

export declare const getThemeType: (theme: ThemeSetting, colorScheme: ColorScheme) => ThemeTypes;

/**
 * Check if a bit is set in the number
 */
export declare const hasBit: (number: number | undefined, mask: number) => boolean;

export declare const hasBitBigInt: (number: JSBI | undefined, mask: JSBI) => boolean;

export declare const HOUR: number;

export declare const HOUR_IN_SECONDS: number;

export declare enum HTTP_STATUS_CODE {
    OK = 200,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500
}

export { isDeepEqual }

export declare type Listener<A extends any[], R> = (...args: A) => R;

export declare interface Listeners<A extends any[], R> {
    notify: (...args: A) => R[];
    subscribe: (listener: Listener<A, R>) => () => void;
    clear: () => void;
}

export declare const MINUTE: number;

export declare const MINUTE_IN_SECONDS = 60;

export declare const MONTH: number;

export declare const REDNIGHT_DOMAINS: string[];

export declare enum REDNIGHT_WEBSITES {
    STATUS_PAGE = "https://status.rednightgames.com"
}

export declare interface RednightConfig {
    CLIENT_SECRET: string;
    APP_VERSION: string;
    APP_NAME: APP_NAMES;
    API_URL: string;
    LOCALES: Record<string, string>;
    DATE_VERSION: string;
    COMMIT: string;
    BRANCH: string;
    VERSION_PATH: string;
}

export declare const REGEX_EMAIL: RegExp;

export declare const SECOND = 1000;

export declare const serializeThemeSetting: (themeSetting: ThemeSetting) => string | undefined;

/**
 * Set a bit on the number
 */
export declare const setBit: (number: number | undefined, mask: number) => number;

export declare const setCookie: ({ cookieName, cookieValue: maybeCookieValue, expirationDate: maybeExpirationDate, path, cookieDomain, samesite, secure, }: SetCookieArguments) => void;

export declare interface SetCookieArguments {
    cookieName: string;
    cookieValue: string | undefined;
    cookieDomain?: string;
    expirationDate?: string;
    path?: string;
    secure?: boolean;
    samesite?: CookieSameSiteAttribute;
}

export declare const SSO_PATHS: {
    readonly SWITCH: "/switch";
    readonly LOGIN: "/login";
    readonly RESET_PASSWORD: "/reset-password";
    readonly SIGNUP: "/signup";
};

export declare const TEAM_NAME = "Rednight team";

export declare enum ThemeColor {
    Primary = "primary",
    Secondary = "secondary",
    Danger = "danger",
    Warning = "warning",
    Success = "success"
}

export declare type ThemeColorUnion = `${ThemeColor}`;

export declare enum ThemeFeatureSetting {
    DEFAULT = 0,
    SCROLLBARS_OFF = 1,
    ANIMATIONS_OFF = 2
}

export declare enum ThemeFontSizeSetting {
    DEFAULT = 0,
    X_SMALL = 1,
    SMALL = 2,
    LARGE = 3,
    X_LARGE = 4
}

export declare enum ThemeModeSetting {
    Auto = 0,
    Dark = 1,
    Light = 2
}

export declare const THEMES_MAP: {
    0: {
        label: string;
        identifier: ThemeTypes;
        theme: any;
    };
    1: {
        label: string;
        identifier: ThemeTypes;
        theme: any;
    };
};

export declare interface ThemeSetting {
    Mode: ThemeModeSetting;
    LightTheme: ThemeTypes;
    DarkTheme: ThemeTypes;
    FontSize: ThemeFontSizeSetting;
    Features: ThemeFeatureSetting;
}

export declare enum ThemeTypes {
    Carbon = 0,
    Snow = 1
}

/**
 * Toggle a bit from the number
 */
export declare const toggleBit: (number: number | undefined, mask: number) => number;

export declare const USERNAME_PLACEHOLDER = "john";

export declare const WEEK: number;

export declare const YEAR: number;

export { }
