import invariant from 'tiny-invariant'

export function maxBy<T extends object>(arr: readonly T[], by: keyof T): T {
  invariant(arr.length > 0, 'maxBy undefined on an empty array')

  let max = arr[0]
  for (let i = 1; i < arr.length; i += 1) {
    const e = arr[i]
    if (e[by] > max[by]) {
      max = e
    }
  }
  return max
}
