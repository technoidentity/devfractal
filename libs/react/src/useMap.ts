import { isFunction } from '@srtp/core'
import React from 'react'

import { useEvent } from './useEvent'

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

  return useBorrowed(map)
}

export function useBorrowed<K, V>(borrowed: Map<K, V> | (() => Map<K, V>)) {
  const map = React.useMemo(
    () => (isFunction(borrowed) ? borrowed() : borrowed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [roMap, set] = React.useState(() => new ROMap(map))

  const actions = React.useMemo(() => {
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
  }, [map])

  const mutate = useEvent(
    (fn: (mutators: typeof actions, value: typeof roMap) => void) => {
      fn(actions, roMap)
      set(new ROMap(map))
    },
  )

  return [roMap, mutate] as const
}
