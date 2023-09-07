import { isFunction } from '@srtp/core'
import React from 'react'

import { useEvent } from './useEvent'

export class ROArray<V> {
  constructor(private readonly array: ReadonlyArray<V>) {}

  [Symbol.iterator](): IterableIterator<V> {
    return this.array[Symbol.iterator]()
  }

  get length(): number {
    return this.array.length
  }

  at(index: number): V | undefined {
    return this.array.at(index)
  }

  slice(start?: number, end?: number): V[] {
    return this.array.slice(start, end)
  }
}

export function useArray<V>(values?: Iterable<V>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const array = React.useMemo(() => (values ? [...values] : []), [])
  return useBorrowedArray(array)
}

function arrayActions<V>(array: V[]) {
  return {
    push: (value: V) => array.push(value),
    pop: () => array.pop(),
    shift: () => array.shift(),
    unshift: (value: V) => array.unshift(value),
    splice: (start: number, deleteCount: number, ...items: V[]) =>
      array.splice(start, deleteCount, ...items),
    reverse: () => array.reverse(),
    sort: (compareFn?: (a: V, b: V) => number) => array.sort(compareFn),
    clear: () => array.splice(0, array.length),
    set: (index: number, value: V) => (array[index] = value),
    remove: (index: number) => array.splice(index, 1),
    swap: (indexA: number, indexB: number) => {
      const temp = array[indexA]
      array[indexA] = array[indexB]
      array[indexB] = temp
    },
  }
}

type ArrayActions<T> = ReturnType<typeof arrayActions<T>>

export function useBorrowedArray<V>(borrowed: V[] | (() => V[])) {
  const array = React.useMemo(
    () => (isFunction(borrowed) ? borrowed() : borrowed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [roArray, set] = React.useState(() => new ROArray(array))

  const actions = React.useMemo(() => arrayActions(array), [array])

  const mutate = useEvent(
    (fn: (mutators: typeof actions, value: typeof roArray) => void) => {
      fn(actions, roArray)
      set(new ROArray(array))
    },
  )

  return [roArray, mutate] as const
}

export type ArrayStateHandlers<T> = Record<
  string,
  (state: ROArray<T>, actions: ArrayActions<T>, ...payload: any[]) => void
>

type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer R
) => any
  ? R
  : []

export type ArrayStateActions<T, Hs extends ArrayStateHandlers<T>> = {
  [A in keyof Hs]: (payload: Tail<Tail<Parameters<Hs[A]>>>) => void
}

export function arrayState<T, Hs extends ArrayStateHandlers<T>>(
  borrowedState: T[],
  handlers: ArrayActions<T>,
) {
  return function useArrayState() {
    const [state, mutate] = useBorrowedArray(borrowedState)

    const resultHandlers: ArrayStateActions<T, Hs> = React.useMemo(() => {
      const result: any = {}
      for (const key of Object.keys(handlers)) {
        result[key] = (...payload: any[]) =>
          mutate((mutators, value) => {
            ;(handlers as any)[key](value, mutators, ...payload)
          })
      }
      return result
    }, [mutate])

    return [state, resultHandlers] as const
  }
}
