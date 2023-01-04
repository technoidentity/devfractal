import { Response } from 'redaxios'
import { Filter, Todo } from '@srtp/todo'

export const limit = 15

export const itemCount = (res: Response<any>) =>
  Math.floor(Number(res.headers.get('X-Total-Count') ?? 1))

export const pageCount = (itemCount: number, limit: number) =>
  Math.floor((itemCount + limit - 1) / limit)

export const pageFromLink = (res: Response<any>, rel: string) => {
  const link = res.headers
    .get('Link')
    ?.split(', ')
    .find(h => h.includes(`rel="${rel}"`))
    ?.split('; ')[0]
    .slice(1, -1)

  return link && Number(link.slice(link.lastIndexOf('_page=') + 6))
}

export const filteredTodos = (todoList: readonly Todo[], filter: Filter) =>
  todoList.filter(
    t =>
      filter === 'All' || (filter === 'Completed' ? t.completed : !t.completed),
  )
