import { axios, urlcat } from '@srtp/web'

type Todo = Readonly<{
  id: number
  title: string
  completed: boolean
}>

export type IDType = { id: any }
export type Create<T extends IDType> = Omit<T, 'id'>
export type Update<T extends IDType> = Pick<T, 'id'> & Partial<Omit<T, 'id'>>
export type Delete<T extends IDType> = Pick<T, 'id'>

// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_URL = '/api'

const delay = () => {
  const ms = 1000 + Math.floor(1000 * Math.random())
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const todoApi = {
  async getAll() {
    await delay()
    const [data] = await axios({
      method: 'get',
      url: urlcat(BASE_URL, '/todos'),
    })

    return data as Todo[]
  },

  async post(todo: Create<Todo>): Promise<Todo> {
    await delay()
    return (
      await axios({
        method: 'post',
        url: urlcat(BASE_URL, '/todos'),
        body: todo,
      })
    )[0] as Todo
  },

  async put(todo: Todo): Promise<Todo> {
    await delay()
    return (
      await axios({
        method: 'put',
        url: urlcat(BASE_URL, `todos/${todo.id}`),
        body: todo,
      })
    )[0] as Todo
  },

  async patch(todo: Update<Todo>): Promise<Todo> {
    await delay()
    const result = (
      await axios({
        method: 'patch',
        url: urlcat(BASE_URL, `/todos/${todo.id}`),
        body: todo,
      })
    )[0] as Todo

    return result
  },

  async delete(todo: Delete<Todo>): Promise<void> {
    await delay()
    await axios({
      method: 'delete',
      url: urlcat(BASE_URL, `/todos/${todo.id}`),
    })
  },
}
