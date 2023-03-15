export function any<T>(arr: readonly T[], f: (v: T) => boolean): boolean {
  for (const e of arr) {
    if (f(e)) {
      return true
    }
  }

  return false
}
