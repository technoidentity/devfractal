/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'redaxios'

type Todo = Readonly<{
  id: number
  title: string
  completed: boolean
}>

type IDType = { id: any }
type Create<T extends IDType> = Omit<T, 'id'>
type Update<T extends IDType> = Pick<T, 'id'> & Partial<Omit<T, 'id'>>
type Delete<T extends IDType> = Pick<T, 'id'>

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
    const { data } = await axios.get<Todo[]>(`${BASE_URL}/todos`)
    return data
  },

  async post(todo: Create<Todo>): Promise<Todo> {
    await delay()
    return axios.post<Todo>(`${BASE_URL}/todos`, todo).then(({ data }) => data)
  },

  async put(todo: Todo): Promise<Todo> {
    await delay()
    return axios
      .put<Todo>(`${BASE_URL}/todos/${todo.id}`, todo)
      .then(({ data }) => data)
  },

  async patch(todo: Update<Todo>): Promise<Todo> {
    await delay()
    const result = await axios
      .patch<Todo>(`${BASE_URL}/todos/${todo.id}`, todo)
      .then(({ data }) => data)

    return result
  },

  async delete(todo: Delete<Todo>): Promise<void> {
    await delay()
    await axios.delete(`${BASE_URL}/todos/${todo.id}`)
  },
}
