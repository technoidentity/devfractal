import { isFunction } from '@srtp/core'
import React from 'react'

import { useEvent } from '../useEvent'

export class ROSet<K> implements ReadonlySet<K> {
  constructor(private readonly set: ReadonlySet<K>) {}

  forEach(
    callbackfn: (value: K, value2: K, set: ReadonlySet<K>) => void,
    thisArg?: any,
  ): void {
    return this.set.forEach(callbackfn, thisArg)
  }

  has(value: K): boolean {
    return this.set.has(value)
  }

  get size(): number {
    return this.set.size
  }

  entries(): IterableIterator<[K, K]> {
    return this.set.entries()
  }

  keys(): IterableIterator<K> {
    return this.set.keys()
  }

  values(): IterableIterator<K> {
    return this.set.values()
  }

  [Symbol.iterator](): IterableIterator<K> {
    return this.set[Symbol.iterator]()
  }
}

function setActions<K>(set: Set<K>) {
  return {
    add: (value: K) => set.add(value),
    delete: (value: K) => set.delete(value),
    clear: () => set.clear(),
  }
}

type SetActions<T> = ReturnType<typeof setActions<T>>

export function useBorrowedSet<K>(
  borrowed: Set<K> | (() => Set<K>),
): readonly [
  value: ROSet<K>,
  mutate: (fn: (mutators: SetActions<K>, value: ROSet<K>) => void) => void,
] {
  const set = React.useMemo(
    () => (isFunction(borrowed) ? borrowed() : borrowed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [roSet, setSet] = React.useState(() => new ROSet(set))

  const actions = React.useMemo(() => setActions(set), [set])
  const mutate = useEvent(
    (fn: (mutators: typeof actions, value: typeof roSet) => void) => {
      fn(set, roSet)
      setSet(new ROSet(set))
    },
  )

  return [roSet, mutate] as const
}

export function useSet<K>(values?: Iterable<K>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const set = React.useMemo(() => new Set(values), [])

  return useBorrowedSet(set)
}

export type SetStateHandlers<T> = Record<
  string,
  (value: ROSet<T>, mutators: SetActions<T>, ...payload: any[]) => void
>

type Tail2<T extends any[]> = ((...args: T) => any) extends (
  first: any,
  second: any,
  ...tail: infer TT
) => any
  ? TT
  : []

type SetStateHandlerPayload<
  Hs extends SetStateHandlers<any>,
  A extends keyof Hs,
> = Tail2<Parameters<Hs[A]>>

export type SetStateActions<T, Hs extends SetStateHandlers<T>> = {
  [A in keyof Hs]: (...payload: SetStateHandlerPayload<Hs, A>) => void
}

export function setState<T, Hs extends SetStateHandlers<T>>(
  borrowedState: Set<T>,
  handlers: Hs,
) {
  return function useSetState(): readonly [
    value: ROSet<T>,
    actions: SetStateActions<T, Hs>,
  ] {
    const [state, mutate] = useBorrowedSet(borrowedState)

    const actions: SetStateActions<T, Hs> = React.useMemo(() => {
      const result: any = {}
      for (const key of Object.keys(handlers)) {
        result[key] = (...payload: any[]) =>
          mutate((mutators, value) => {
            ;(handlers as any)[key](value, mutators, ...payload)
          })
      }
      return result
    }, [mutate])

    return [state, actions] as const
  }
}
