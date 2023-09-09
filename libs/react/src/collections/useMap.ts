import { isFunction } from '@srtp/core'
import React from 'react'

import { useEvent } from '../useEvent'

export class ROMap<K, V> implements ReadonlyMap<K, V> {
  constructor(private readonly map: ReadonlyMap<K, V>) {}

  forEach(
    callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
    thisArg?: any,
  ): void {
    return this.map.forEach(callbackfn, thisArg)
  }

  get(key: K): V | undefined {
    return this.map.get(key)
  }

  has(key: K): boolean {
    return this.map.has(key)
  }

  get size(): number {
    return this.map.size
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries()
  }

  keys(): IterableIterator<K> {
    return this.map.keys()
  }

  values(): IterableIterator<V> {
    return this.map.values()
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map[Symbol.iterator]()
  }
}

export function useMap<K, V>(values?: Iterable<[K, V]>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const map = React.useMemo(() => new Map(values), [])

  return useBorrowedMap(map)
}

function mapActions<K, V>(map: Map<K, V>) {
  return {
    set: (key: K, value: V) => {
      map.set(key, value)
    },
    delete: (key: K) => {
      map.delete(key)
    },
    clear: () => {
      map.clear()
    },
  }
}

type MapActions<K, V> = ReturnType<typeof mapActions<K, V>>

export function useBorrowedMap<K, V>(borrowed: Map<K, V> | (() => Map<K, V>)) {
  const map = React.useMemo(
    () => (isFunction(borrowed) ? borrowed() : borrowed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [roMap, set] = React.useState(() => new ROMap(map))

  const actions = React.useMemo(() => mapActions(map), [map])

  const mutate = useEvent(
    (fn: (mutators: typeof actions, value: typeof roMap) => void) => {
      fn(actions, roMap)
      set(new ROMap(map))
    },
  )

  return [roMap, mutate] as const
}

export type MapStateHandlers<K, V> = Record<
  string,
  (value: ROMap<K, V>, mutators: MapActions<K, V>, ...payload: any[]) => void
>

type Tail2<T extends any[]> = ((...args: T) => any) extends (
  first: any,
  second: any,
  ...tail: infer TT
) => any
  ? TT
  : []

type MapStateHandlerPayload<
  Hs extends MapStateHandlers<any, any>,
  A extends keyof Hs,
> = Tail2<Parameters<Hs[A]>>

export type MapStateActions<K, V, Hs extends MapStateHandlers<K, V>> = {
  [A in keyof Hs]: (...payload: MapStateHandlerPayload<Hs, A>) => void
}

export function mapState<K, V, Hs extends MapStateHandlers<K, V>>(
  borrowedState: Map<K, V>,
  handlers: Hs,
) {
  return function useMapState(): readonly [
    value: ROMap<K, V>,
    actions: MapStateActions<K, V, Hs>,
  ] {
    const [state, mutate] = useBorrowedMap(borrowedState)

    const actions: MapStateActions<K, V, Hs> = React.useMemo(() => {
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
