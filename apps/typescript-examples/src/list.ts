export const nil = Symbol('nil')

export type Nil = typeof nil
export type Tail<T> = () => List<T>
export type Cons<T> = Readonly<{ head: T; tail: Tail<T> }>
export type List<T> = Cons<T> | Nil

export function cons<T>(head: T, tail: Tail<T> | Nil): List<T> {
  return { head, tail: tail === nil ? () => nil : tail } as const
}

export function fcons<T>(head: T, tail: Tail<T> | Nil): Tail<T> {
  return () => ({ head, tail: tail === nil ? () => nil : tail }) as const
}

export function isNil<T>(list: List<T>): list is Nil {
  return list === nil
}

export function isCons<T>(list: List<T>): list is Cons<T> {
  return list !== nil
}

export function head<T>(list: List<T>): T | undefined {
  return list === nil ? undefined : list.head
}

export function tail<T>(list: List<T>): List<T> {
  return list === nil ? nil : list.tail()
}

export function match<T1, T2, T3>(
  list: List<T1>,
  onNil: () => T2,
  onCons: (cons: Cons<T1>) => T3,
): T2 | T3 {
  return isCons(list) ? onCons(list) : onNil()
}

export function* iter<T>(list: List<T>): Iterable<T> {
  for (let current = list; isCons(current); current = current.tail()) {
    yield current.head
  }
}

export function toArray<T>(list: List<T>): T[] {
  return [...iter(list)]
}

export function fromArray<T>(array: T[]): List<T> {
  return array.length === 0
    ? nil
    : cons(array[0], () => fromArray(array.slice(1)))
}

export function list<T>(...args: T[]): List<T> {
  return fromArray(args)
}

export function map<T1, T2>(f: (e: T1) => T2, list: List<T1>): List<T2> {
  return match(
    list,
    () => nil,
    c => cons(f(c.head), () => map(f, c.tail())),
  )
}

export function filter<T>(f: (e: T) => boolean, list: List<T>): List<T> {
  return match(
    list,
    () => nil,
    c =>
      f(c.head) ? cons(c.head, () => filter(f, c.tail())) : filter(f, c.tail()),
  )
}

export function reduce<T1, T2>(
  f: (acc: T2, e: T1) => T2,
  initial: T2,
  list: List<T1>,
): T2 {
  return match(
    list,
    () => initial,
    c => reduce(f, f(initial, c.head), c.tail()),
  )
}
