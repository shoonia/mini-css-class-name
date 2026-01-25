/**
 * Options for mini-css-class-name generator
 */
export interface Options {
  /**
   * A custom prefix will be added to each class name
   * @default ''
   */
  prefix?: string;
  /**
   * A custom suffix will be added to each class name
   * @default ''
   */
  suffix?: string;
  /**
   * A regular expression for removing characters from the template string
   * @default null
   */
  excludePattern?: RegExp | null;
}

/**
 * Cache map interface for storing generated class names
 */
export interface CacheMap {
  has(key: string): boolean;
  get(key: string): string;
  set(key: string, value: string): CacheMap | void;
}

export interface CssModulesOptions extends Options {
  /**
   * Cache map for storing generated class names
   * Useful for performance optimization to avoid regenerating names for the same files and classes
   */
  cache?: CacheMap;
}

/**
 * Generate function that returns unique CSS class names
 */
export interface GenerateFunction {
  (): string;
  /**
   * Get the current accumulator state
   */
  getAccumulator(): number[];
  /**
   * Set the accumulator state
   */
  setAccumulator(acc: number[]): number[];
  /**
   * Reset the accumulator to initial state
   */
  reset(): void;
}

/**
 * Creates a generator function for minimum size unique CSS class names
 * @param options - Configuration options
 * @returns Generator function that creates unique class names
 */
export default function miniCssClassName(options?: Options): GenerateFunction;
