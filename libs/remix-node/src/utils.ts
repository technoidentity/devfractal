import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { Errors } from '@srtp/remix-core'
import { formErrors } from '@srtp/remix-core'
import type { Writeable, z, ZodSchema, ZodType, ZodTypeDef } from 'zod'

type Request = LoaderArgs['request']

export function badRequest<T extends object>(data: Errors<T>) {
  return json(data, { status: 400 })
}

export async function formData<Output, Input>(
  spec: ZodType<Output, ZodTypeDef, Input>,
  request: Request,
) {
  const values = Object.fromEntries(await request.formData())
  return spec.safeParse(values)
}

export async function safeAction<T extends object, R>(
  formDataSpec: ZodSchema<T>,
  request: LoaderArgs['request'],
  fn: (values: z.infer<typeof formDataSpec>) => R,
) {
  const result = await formData(formDataSpec, request)
  if (!result.success) {
    return badRequest({ fieldErrors: formErrors(result.error) })
  }

  return fn(result.data)
}

export async function safeActions<
  U extends string,
  T extends Readonly<[U, ...U[]]>,
  Actions extends Record<
    z.infer<z.ZodEnum<Writeable<T>>>,
    (request: Request) => unknown
  >,
>(spec: z.ZodEnum<Writeable<T>>, request: Request, actions: Actions) {
  const rc = request.clone()
  const actionKey = spec.parse((await rc.formData()).get('_action'))
  console.log(actionKey, actions)
  const res = await actions[actionKey](request)
  console.log('safeActions', res)
  return res
}
