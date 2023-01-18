export function insertAt<T>(
  arr: readonly T[],
  idx: number,
  item: T,
): readonly T[] {
  return [...arr.slice(0, idx), item, ...arr.slice(idx)]
}

export function removeAt<T>(arr: readonly T[], idx: number): readonly T[] {
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
}

export function replaceAt<T>(
  arr: readonly T[],
  idx: number,
  item: T,
): readonly T[] {
  return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)]
}

// export const movingList = (
//   arr1: readonly number[],
//   arr2: readonly number[],
//   srcIdx: number,
//   desIdx: number,
// ) => {
//   const del = arr1[srcIdx]
//   const ar = removeAt(arr1, srcIdx)
//   const newArr = insertAt(arr2, desIdx, del)
//   return newArr
// }

// export function movingListGen<T>(
//   arr1: readonly T[],
//   arr2: readonly T[],
//   srcIdx: number,
//   desIdx: number,
// ): readonly T[] {
//   const del = arr1[srcIdx]
//   // eslint-disable-next-line no-unused-vars
//   const ar = removeAt(arr1, srcIdx)
//   const newArr = insertAt(arr2, desIdx, del)
//   return newArr
// }
