import { isUndefined } from '@srtp/core'
import { filter, iterSlice, pipe, sorted, toArray } from '@srtp/fn'

import type { Search, Task } from './specs'

export function paginate<T>(page: number, limit: number) {
  return (list: Iterable<T>) => {
    return pipe(list, iterSlice((page - 1) * limit, page * limit))
  }
}

export function applySearch(
  list: Iterable<Task>,
  { limit, page, completed, search }: Search,
) {
  const input = toArray(list)

  const result = pipe(
    input,
    sorted((a, b) => a.id - b.id),
    filter(t => isUndefined(completed) || t.completed === completed),
    filter(t => isUndefined(search) || t.title.includes(search)),
    paginate(page, limit),
    toArray,
  )

  return result
}
