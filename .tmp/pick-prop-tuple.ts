
export type PickPropertyTuple<P extends string, I extends number = number, T extends readonly string[] = typeof propertyTuple> = I extends undefined | null ? never : `${P}${T[I]}`;

export type RecordProps<P extends string, T extends Record<string, unknown>> = Record<
  T[keyof T] extends undefined | null 
  ? never : T[keyof T] extends any[] 
  ? PickPropertyTuple<P> : keyof T
, T[keyof T]>;