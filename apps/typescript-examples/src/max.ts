type Comparable = string | number | Date

export function max2<T extends Comparable>(x: T, y: T): T {
  return x > y ? x : y
}

export function max<T extends Comparable>(first: T, ...rest: T[]): T {
  if (rest.length === 0) {
    return first
  }

  const [fst, ...rst] = rest
  return max2(first, max(fst, ...rst))
}
