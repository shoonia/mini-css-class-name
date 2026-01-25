import type { CssModulesOptions } from '../index';

/**
 * Creates a generateScopedName function for postcss-modules
 * 
 * Used with PostCSS and the postcss-modules plugin to generate minimum size class names for CSS Modules.
 * The function accepts options like prefix, suffix, and excludePattern from mini-css-class-name,
 * plus an optional cache for storing generated names.
 * 
 * @param options - Configuration options
 * @returns Function compatible with postcss-modules' generateScopedName option
 */
export default function generateScopedName(options?: CssModulesOptions): (
  name: string,
  filename: string
) => string;
