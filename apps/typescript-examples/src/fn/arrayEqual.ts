import { all } from './all'
import { range } from './range'

export function arrayEqual<T>(fst: readonly T[], snd: readonly T[]): boolean {
  if (fst.length !== snd.length) {
    return false
  }

  return all(range(fst.length), i => fst[i] === snd[i])
}
