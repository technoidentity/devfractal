import { filter, iterSlice, pipe, sorted, toArray } from '@srtp/fn'
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
  return pipe(
    list,
    sorted((a, b) => a.id - b.id),
    filter(t => completed === undefined || t.completed === completed),
    filter(t => search === undefined || t.title.includes(search)),
    paginate(page, limit),
    toArray,
  )
}
