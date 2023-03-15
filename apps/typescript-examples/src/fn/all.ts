export function all<T>(arr: readonly T[], f: (v: T) => boolean): boolean {
  for (const e of arr) {
    if (!f(e)) {
      return false
    }
  }

  return true
}
