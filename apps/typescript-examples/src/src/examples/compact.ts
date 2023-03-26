import { bool } from '@srtp/fn'

export function compact<T extends readonly unknown[]>(arr: T): T {
  return arr.filter(bool) as any as T
}
