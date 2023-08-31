import type { Task, TaskFilter } from '@srtp/fake-tasks'

export const limit = 15

export const itemCount = (res: Response) =>
  Math.floor(Number(res.headers.get('X-Total-Count') ?? 1))

export const pageCount = (itemCount: number, limit: number) =>
  Math.floor((itemCount + limit - 1) / limit)

export const pageFromLink = (res: Response, rel: string) => {
  const link = res.headers
    .get('Link')
    ?.split(', ')
    .find(h => h.includes(`rel="${rel}"`))
    ?.split('; ')[0]
    .slice(1, -1)

  return link && Number(link.slice(link.lastIndexOf('_page=') + 6))
}

export const filteredTodos = (todoList: readonly Task[], filter: TaskFilter) =>
  todoList.filter(
    t =>
      filter === 'All' || (filter === 'Completed' ? t.completed : !t.completed),
  )
