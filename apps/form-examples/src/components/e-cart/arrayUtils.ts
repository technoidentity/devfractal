import { pipe, map, range, toArray } from '@srtp/fn'

export function t<T>(arr: T[], index: number, element: T): T[] {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    if (i === index) {
      result.push(element)
      i = i + 1
    }
    result.push(arr[i])
  }
  return result
}

export function t2<T>(arr: T[], index: number, element: T): T[] {
  const arr1 = arr.slice(0, index)
  const newArray = [...arr1, element]
  const arr2 = arr.slice(index + 1)
  return [...newArray, ...arr2]
}

// export const t3 = (
//   arr: T[],
//   index: number,
//   element: number,
// ): T[] => {
// return arr.reduce((acc,v,i)=>{

// },[])
// }

export function insert<T>(
  arr: T[],
  index: number,
  element: number,
): (number | T)[] {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    if (i === index) {
      result.push(element)
    }
    result.push(arr[i])
  }
  return result
}

export function insert2<T>(
  arr: T[],
  index: number,
  element: number,
): (number | T)[] {
  const arr1 = arr.slice(0, index)
  const newArray = [...arr1, element]
  const arr2 = arr.slice(index, arr.length)
  return [...newArray, ...arr2]
}

export function removeAt<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index)
}

export function subArray(start: number, count: number): number[] {
  const result = []
  let item = start
  for (let i = 0; i <= count; i += 1) {
    item = start + i
    result.push(item)
  }
  return result
}

export function subArray2(start: number, count: number): number[] {
  return pipe(
    range(0, count),
    map(i => start + i),
    toArray,
  )
}

export function replaceAt2<T>(arr: T[], ind: number, item: T): T[] {
  const result = []
  for (let i = 0; i < arr.length; i += 1) {
    if (i === ind) {
      result.push(item)
    } else {
      result.push(arr[i])
    }
  }
  return result
  // const copyArray = [...arr]
  // const newArray = copyArray.splice(ind, 1, item)
  // return copyArray
}

// export function filteredArray<T>(arr: T[], id: string | number): T[] {
//   return arr.filter(item => item.id !== id)
// }
