import { map, pipe } from '@srtp/fn'

export function entries<T extends object>(obj: T) {
  return pipe(
    Object.keys(obj),
    map(key => [key, (obj as any)[key]] as const),
  )
}

export function pick<T extends object, K extends keyof T>(
  object: T,
  ...keys: K[]
): Pick<T, K> {
  return pipe(
    Object.entries(object).filter(([key, _value]) => keys.includes(key as K)),
    Object.fromEntries,
  ) as Pick<T, K>
}

export function omit<T extends object, K extends keyof T>(
  object: T,
  ...keys: K[]
): Omit<T, K> {
  return pipe(
    Object.entries(object).filter(([key, _value]) => !keys.includes(key as K)),
    Object.fromEntries,
  ) as Omit<T, K>
}

export function invert(object: Record<string, any>): Record<string, any> {
  const reversedEntries = Object.entries(object).map(([key, value]) => [
    value,
    key,
  ])
  return Object.fromEntries(reversedEntries)
}
