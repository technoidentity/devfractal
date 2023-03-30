export function not<T extends (...args: any[]) => any>(f: T) {
  return (...args: Parameters<T>) => !f(...args)
}

export function dropWhile<T>(arr: readonly T[], pred: (x: T) => boolean): T[] {
  const i = arr.findIndex(pred)
  return i === -1 ? [] : arr.slice(i)
}

export function takeWhile<T>(
  arr: readonly T[],
  pred: (x: T) => boolean,
): readonly T[] {
  const i = arr.findIndex(not(pred))
  return i === -1 ? arr : arr.slice(0, i)
}
