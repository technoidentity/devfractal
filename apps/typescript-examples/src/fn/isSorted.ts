export function isSorted<T>(arr: T[]): boolean {
  return arr.every((_, i) => i === 0 || arr[i - 1] <= arr[i])
}
