import { filter, iterSlice, pipe, sorted, toArray } from '@srtp/fn'
import type { Filters, Todo } from './todoDb'

export function paginate<T>(page: number, limit: number) {
  return (list: Iterable<T>) => {
    const start = (page - 1) * limit
    const end = page * limit
    return pipe(list, iterSlice(start, end))
  }
}

export function applyFilters(
  list: Iterable<Todo>,
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
