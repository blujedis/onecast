import { TinyColor, ColorInput, TinyColorOptions } from '@ctrl/tinycolor';

/**
 * Creates a TinyColor instance for manipulating color.
 * 
 * @param color the color input to convert to TinyColor instance.
 * @param options optional TinyColor options in creating instance.
 */
export const createColor = (color?: ColorInput | undefined, options?: Partial<TinyColorOptions>) => {
  return new TinyColor(color, options);
};

