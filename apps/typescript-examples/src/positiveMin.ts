import invariant from 'tiny-invariant'

export function countOccurrences(arr: number[], num: number): number {
  let count = 0
  for (const e of arr) {
    if (e === num) {
      count++
    }
  }

  return count
}

export function positiveMin(arr: number[]): number {
  invariant(arr.length > 0, 'Array must not be empty')

  let min = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min && arr[i] > 0) {
      min = arr[i]
    }
  }

  return min
}

export function sumPairs(arr: number[], sum: number): Array<[number, number]> {
  const pairs: Array<[number, number]> = []

  for (let i = 0; i < arr.length; i++) {
    const num1 = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      const num2 = arr[j]
      if (num1 + num2 === sum) {
        pairs.push([num1, num2])
      }
    }
  }

  return pairs
}

export function cycle<T>(arr: T[]): Iterable<T> {
  return {
    *[Symbol.iterator]() {
      let i = 0

      while (true) {
        yield arr[i]
        i = (i + 1) % arr.length
      }
    },
  }
}
