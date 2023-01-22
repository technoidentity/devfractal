import { equal } from './equal'

const eqClass = new Map()

export const addTypeClass = (type, eq) => {
  eqClass.set(type, eq)
}

export function indexOf(arr, value) {
  let i = 0
  for (const e of arr) {
    if (equal(e, value)) {
      return i
    }
    i++
  }

  return -1
}
