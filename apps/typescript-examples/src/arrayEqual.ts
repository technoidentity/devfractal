import { all, pipe, range } from '@srtp/fn'

export function arrayEqual<T>(fst: readonly T[], snd: readonly T[]): boolean {
  if (fst.length !== snd.length) {
    return false
  }

  return pipe(
    range(fst.length),
    all(i => fst[i] === snd[i]),
  )
}
