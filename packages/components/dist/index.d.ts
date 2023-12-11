import { AnchorHTMLAttributes } from 'react';
import { APP_NAMES } from '@rednight/shared';
import { ComponentPropsWithoutRef } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { PolymorphicPropsWithRef } from 'react-polymorphic-types';
import { ReactNode } from 'react';
import { RednightConfig } from '@rednight/shared';
import { RefAttributes } from 'react';
import { ThemeColorUnion } from '@rednight/shared';
import { ThemeFeatureSetting } from '@rednight/shared';
import { ThemeFontSizeSetting } from '@rednight/shared';
import { ThemeModeSetting } from '@rednight/shared';
import { ThemeSetting } from '@rednight/shared';
import { ThemeTypes } from '@rednight/shared';

export declare const AppLink: ForwardRefExoticComponent<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
    to: string;
    toApp?: APP_NAMES | undefined;
    selfOpening?: boolean | undefined;
} & RefAttributes<HTMLAnchorElement>>;

declare interface AppProps {
    config: RednightConfig;
    children: ReactNode;
}

export declare const Button: ForwardRefExoticComponent<Omit<ButtonProps<ElementType>, "ref"> & RefAttributes<Element>>;

declare interface ButtonOwnProps {
    /**
     * Whether the button should render a loader.
     * Button is disabled when this prop is true.
     */
    loading?: boolean;
    /**
     * Controls the shape of the button.
     * - `ghost` for texted button
     * - `solid` for filled button
     * - `outline` for bordered button
     */
    shape?: ButtonShape;
    /**
     * Controls the colors of the button.
     * Exact styles applied to depend on the chosen shape as well.
     */
    color?: ThemeColorUnion;
    /**
     * Controls how large the button should be.
     */
    size?: ButtonSize;
    /**
     * Controls the width of the button.
     * - `false` for width of text length
     * - `true` for width of parent container
     */
    fullWidth?: boolean;
    /**
     * Puts the button in a disabled state.
     */
    disabled?: boolean;
    /**
     * Locator for e2e tests.
     */
    "data-testid"?: string;
}

declare type ButtonProps<E extends ElementType> = PolymorphicPropsWithRef<ButtonOwnProps, E>;

declare type ButtonShape = "ghost" | "solid" | "outline";

declare type ButtonSize = "small" | "medium" | "large";

export declare const CircleLoader: ({ size, className, ...rest }: CircleLoaderProps) => JSX_2.Element;

declare interface CircleLoaderProps extends ComponentPropsWithoutRef<"svg"> {
    size?: CircleLoaderSize;
}

declare type CircleLoaderSize = "small" | "medium" | "large";

export declare const RednightApp: ({ config, children }: AppProps) => JSX_2.Element;

declare interface ThemeContextInterface {
    setTheme: (themeType: ThemeTypes, mode?: ThemeModeSetting) => void;
    setThemeSetting: (theme?: ThemeSetting) => void;
    setAutoTheme: (enabled: boolean) => void;
    setFontSize: (fontSize: ThemeFontSizeSetting) => void;
    setFeature: (featureBit: ThemeFeatureSetting, toggle: boolean) => void;
    settings: ThemeSetting;
    addListener: (cb: (data: ThemeSetting) => void) => () => void;
}

export declare const useConfig: () => RednightConfig;

export declare const useFocusVisible: () => {
    focusVisible: boolean;
    onInput: () => void;
    onFocus: () => void;
    onBlur: () => void;
};

export declare const useTheme: () => ThemeContextInterface;

export { }
