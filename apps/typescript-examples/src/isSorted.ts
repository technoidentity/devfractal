export const isSorted = <T>(arr: T[]) =>
  arr.every((_, i) => i <= 1 || arr[i - 1] <= arr[i])
