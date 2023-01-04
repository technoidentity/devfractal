export const push = <T>(arr: T[], v: T) => [...arr, v]
export const pop = <T>(arr: T[]) => arr.slice(0, arr.length - 1)

export const unshift = <T>(arr: T[], v: T) => [v, ...arr]
export const shift = <T>(arr: T[]) => arr.slice(1)

export const insert = <T>(arr: T[], index: number, value: T) => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index),
]

export const remove = <T>(arr: T[], index: number) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1),
]
