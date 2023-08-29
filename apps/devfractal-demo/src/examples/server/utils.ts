import {
  filter,
  isUndefined,
  iterSlice,
  pipe,
  sorted,
  toArray,
} from 'devfractal'

import type { Filters, Task } from '../specs'

export function paginate<T>(page: number, limit: number) {
  return (list: Iterable<T>) => {
    return pipe(list, iterSlice((page - 1) * limit, page * limit))
  }
}

export function applyFilters(
  list: Iterable<Task>,
  { limit, page, completed, search }: Filters,
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
