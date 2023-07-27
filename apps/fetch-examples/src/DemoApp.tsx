import { delay } from '@srtp/core'
import { epQuery, useSafeMutation } from '@srtp/query'
import { jstr } from '@srtp/spec'
import { z } from 'zod'
import { todoEndpoints } from './todoEndpoints'

const Todo = z.object({
  title: z.string(),
  completed: z.boolean(),
})

const useTodoList = epQuery(todoEndpoints.getTodos, '/api')

export const DemoApp = () => {
  const [todoList] = useTodoList({ request: { limit: 10, page: 1 } })

  const mutationFn = async () => {
    await delay(1000)

    return { title: '', completed: false }
  }

  const { data, mutate } = useSafeMutation(Todo, { mutationFn })

  return (
    <div>
      <h1 onClick={() => mutate()}>HELLO: {jstr(data)}</h1>
      <pre>{JSON.stringify(todoList, null, 2)}</pre>
    </div>
  )
}
