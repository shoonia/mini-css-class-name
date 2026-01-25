import type { CssModulesOptions } from '../index';

/**
 * Creates a getLocalIdent function for css-loader
 * 
 * Used with Webpack's css-loader to generate minimum size class names for CSS Modules.
 * The function accepts options like prefix, suffix, and excludePattern from mini-css-class-name,
 * plus an optional cache for storing generated names.
 * 
 * @param options - Configuration options
 * @returns Function compatible with css-loader's getLocalIdent option
 */
export default function createLocalIdent(options?: CssModulesOptions): (
  context: {
    resourcePath: string;
  },
  localIdentName: string,
  localName: string
) => string;
