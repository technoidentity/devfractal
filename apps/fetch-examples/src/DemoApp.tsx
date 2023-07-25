import { delay } from '@srtp/core'
import { useSafeMutation } from '@srtp/query'
import { jstr } from '@srtp/spec'
import { z } from 'zod'

const Todo = z.object({
  title: z.string(),
  completed: z.boolean(),
})

export const DemoApp = () => {
  const mutationFn = async () => {
    await delay(1000)

    return { title: '', completed: false }
  }
  const { data, mutate, error } = useSafeMutation(Todo, { mutationFn })

  console.log({ error })
  return <h1 onClick={() => mutate()}>HELLO: {jstr(data)}</h1>
}
