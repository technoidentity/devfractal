import { parse } from '@conform-to/zod'
import { type ActionFunctionArgs, json } from 'react-router-dom'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

export function formAction<Schema extends z.AnyZodObject>(
  schema: Schema,

  // @TODO: what should be the return type of this function? navigateTo?
  action: <T>(values: z.infer<Schema>, args: ActionFunctionArgs) => Promise<T>,
) {
  return async (args: ActionFunctionArgs) => {
    const formData = await args.request.clone().formData()
    const submission = parse(formData, { schema })

    if (!submission.value || submission.intent !== 'submit') {
      return json(submission)
    }

    return action(submission.value, args)
  }
}

// @TODO: export function formActions

export async function formActions<
  U extends string,
  T extends Readonly<[U, ...U[]]>,
  Actions extends Record<
    z.infer<z.ZodEnum<z.Writeable<T>>>,
    (args: ActionFunctionArgs) => unknown
  >,
>(spec: z.ZodEnum<z.Writeable<T>>, args: ActionFunctionArgs, actions: Actions) {
  const formData = await args.request.clone().formData()
  const actionKey = spec.parse(formData.get('_action'))
  invariant(actionKey in actions, `${actionKey} not supported`)

  return actions[actionKey](args)
}
