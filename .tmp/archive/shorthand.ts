
export type StringOrNumber = string | number;
export type StyleMap = Record<string, undefined | readonly any[]>;
export type PickStyleMapType<M extends StyleMap, K extends keyof M> =
  M[K] extends undefined ? StringOrNumber
  : M[K] extends readonly any[] ? M[K][0] : never;

export type PickStyleMapKey<M extends StyleMap, K extends keyof M> =
M[K] extends undefined ? K : M[K] extends readonly any[] 
? M[K][1] extends readonly any[] ? M[K][1][number] : M[K][1] : never;

export type PickStyleMap<M extends StyleMap, S> = 
Record<PickStyleMapKey<M, Extract<keyof S, string>>, PickStyleMapType<M, Extract<keyof S, string>>>;

const BaseType = '' as StringOrNumber;

const BaseStyleMap = {

  marginx: [BaseType, ['marginLeft', 'marginRight']] as const,
  marginy: [BaseType, ['marginTop', 'marginBottom']] as const,
  m: [BaseType, 'margin'] as const,
  mt: [BaseType, 'marginTop'] as const,
  mr: [BaseType, 'marginRight'] as const,
  mb: [BaseType, 'marginBottom'] as const,
  ml: [BaseType, 'marginLeft'] as const,
  mx: [BaseType, ['marginLeft', 'marginRight']] as const,
  my: [BaseType, ['marginTop', 'marginBottom']] as const,

  paddingx: [BaseType, ['paddingLeft', 'paddingRight']] as const,
  paddingy: [BaseType, ['paddingTop', 'paddingBottom']] as const,
  p: [BaseType, 'padding'] as const,
  pt: [BaseType, 'paddingTop'] as const,
  pr: [BaseType, 'paddingRight'] as const,
  pb: [BaseType, 'paddingBottom'] as const,
  pl: [BaseType, 'paddingLeft'] as const,
  px: [BaseType, ['paddingLeft', 'paddingRight']] as const,
  py: [BaseType, ['paddingTop', 'paddingBottom']] as const,

  h: [BaseType, 'height'] as const,
  w: [BaseType, 'width'] as const,

  minw: [BaseType, 'minWidth'] as const,
  maxw: [BaseType, 'maxWidth'] as const,
  minh: [BaseType, 'minHeight'] as const,
  maxh: [BaseType, 'maxHeight'] as const,

};


export function shorthandToStyles<S extends Record<string, unknown>, M extends StyleMap = typeof BaseStyleMap>(
  source: S, map = BaseStyleMap): PickStyleMap<M, S> {
  const result = {} as any;
  for (const k in source) {
    const value = source[k];
    if (! Object.keys(map).includes(k)) {
      result[k] = value;
    }
    else {
      let conf = map[k as keyof typeof map];
      if (conf && typeof conf[1] !== 'undefined')
        conf = conf[1] as any;
      conf = conf || k;
      const keys = (!Array.isArray(conf) ? [conf] : conf) as string[];
      keys.forEach(key => {
        result[key] = value;
      });
    }
  }
  return result;
}
