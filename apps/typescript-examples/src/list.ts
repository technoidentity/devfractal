export const nil = Symbol('nil')

export type Nil = typeof nil
export type Cons<T> = Readonly<{ head: T; tail: List<T> }>
export type List<T> = Cons<T> | Nil

export function cons<T>(head: T, tail: List<T>): List<T> {
  return { head, tail } as const
}

export function isNil<T>(list: List<T>): list is Nil {
  return list === nil
}

export function isCons<T>(list: List<T>): list is Cons<T> {
  return list !== nil
}

export function head<T>(list: List<T>): T | Nil {
  return list === nil ? list : list.head
}

export function tail<T>(list: List<T>): List<T> {
  return list === nil ? nil : list.tail
}

export function list<T>(...args: T[]): List<T> {
  let result: List<T> = nil

  for (const e of args) {
    result = cons(e, result)
  }

  return result
}

export function match<T1, T2, T3>(
  list: List<T1>,
  onNil: () => T2,
  onCons: (cons: Cons<T1>) => T3,
): T2 | T3 {
  return isCons(list) ? onCons(list) : onNil()
}
