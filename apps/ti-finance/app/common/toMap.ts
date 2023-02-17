export function objectListToMap<
  T extends object,
  Select extends [keyof T, keyof T],
>(objList: readonly T[], select: Select): Map<T[Select[0]], T[Select[1]]> {
  const map = new Map(
    objList.map(obj => [obj[select[0]], obj[select[1]]] as const),
  )

  return map
}
