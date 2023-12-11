import { ParserOptions } from '@typescript-eslint/parser';
import { FlatESLintConfigItem } from 'eslint-define-config';

type ConfigItem = Omit<FlatESLintConfigItem, "plugins"> & {
    /**
     * Custom name of each config item
     */
    name?: string;
    /**
     * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
     *
     * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
     */
    plugins?: Record<string, any>;
};
interface OptionsComponentExts {
    /**
     * Additional extensions for components.
     *
     * @example ['vue']
     * @default []
     */
    componentExts?: string[];
}
interface OptionsTypeScriptParserOptions {
    /**
     * Additional parser options for TypeScript.
     */
    parserOptions?: Partial<ParserOptions>;
}
interface OptionsConfig extends OptionsComponentExts {
    /**
     * Enable TypeScript support.
     *
     * Passing an object to enable TypeScript Language Server support.
     *
     * @default auto-detect based on the dependencies
     */
    typescript?: boolean | OptionsTypeScriptParserOptions;
    /**
     * Enable React support.
     *
     * @default auto-detect based on the dependencies
     */
    react?: boolean;
    /**
     * Provide overrides for rules for each integration.
     */
    overrides?: {
        typescript?: ConfigItem["rules"];
    };
}

declare const rednight: (options?: OptionsConfig & ConfigItem, ...userConfigs: (ConfigItem | ConfigItem[])[]) => ConfigItem[];

export { rednight as default };
