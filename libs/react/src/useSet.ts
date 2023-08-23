import { isFunction } from '@srtp/core'
import React from 'react'
import { useEvent } from './useEvent'

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

export function useSet<K>(values?: Iterable<K>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const set = React.useMemo(() => new Set(values), [])

  return useSetCollection(set)
}

export function useSetCollection<K>(borrowed: Set<K>) {
  const set = React.useMemo(
    () => (isFunction(borrowed) ? borrowed() : borrowed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [roSet, setSet] = React.useState(() => new ROSet(set))

  const actions = React.useMemo(() => {
    return {
      add: (value: K) => set.add(value),
      delete: (value: K) => set.delete(value),
      clear: () => set.clear(),
    }
  }, [set])

  const mutate = useEvent(
    (fn: (mutators: typeof actions, value: typeof roSet) => void) => {
      fn(set, roSet)
      setSet(new ROSet(set))
    },
  )

  return [roSet, mutate] as const
}
