import { TypeOf, z, ZodSchema } from 'zod'

function is<T extends ZodSchema>(spec: T, value: unknown): value is TypeOf<T> {
  return spec.safeParse(value).success
}

export function equal(x: unknown, y: unknown): boolean {
  if (is(z.array(z.any()), x) && is(z.array(z.any()), y)) {
    return x.every((x, i) => equal(x, y[i]))
  }

  if (
    is(z.record(z.string(), z.any()), x) &&
    is(z.record(z.string(), z.any()), y)
  ) {
    return Object.keys(x).every(key => equal(x[key], y[key]))
  }

  return x === y
}
