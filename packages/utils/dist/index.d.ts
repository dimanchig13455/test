export declare function clsx(args: V[]): string;

export declare function clsx(...args: V[]): string;

export declare const generateUID: (prefix?: string) => string;

/**
 * Tells whether a given value is between two other given min and max values,
 * including the min value, but excluding the max value.
 */
export declare const isBetween: (value: number, min: number, max: number) => boolean;

export declare const isTruthy: <T>(t: number | false | void | T | null | undefined) => t is T;

export declare const noop: () => undefined;

/**
 * Returns "percent" percent of "n".
 */
export declare const percentOf: (percent: number, n: number) => number;

export declare const stripLeadingAndTrailingSlash: (str_: string) => string;

declare type V = string | boolean | null | undefined;

export { }
