import { bool } from '@srtp/fn'

export const compact = <T extends unknown[]>(arr: T): T =>
  arr.filter(bool) as any as T
