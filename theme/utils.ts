import Color from 'color';

export type ColorParams = Parameters<typeof Color>;

const toColor = (...params: ColorParams) => Color(...params);

function asColor(color: string | Color, model?: ColorParams[1]) {
  let result = color as Color;
  if (typeof color === 'string')
    result = toColor(color, model);
  return result;
};

function lighten(color: string | Color, value: number) {
  const clr = asColor(color);
  return clr.lighten(value).toString()
};

function darken(color: string | Color, value: number) {
  const clr = asColor(color);
  return clr.darken(value).toString();
};

function opacity(color: string | Color, value: number) {
  const clr = asColor(color);
  return clr.alpha(value).toString();
};


const utils = {
  asColor,
  lighten,
  darken,
  opacity
};

export default utils;