export type Hookify<R extends Record<string, unknown>> = {
  readonly [K in keyof R as `use${Capitalize<K & string>}`]: R[K]
}
