import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { Errors } from '@srtp/remix-core'
import { formErrors } from '@srtp/remix-core'
import type { Writeable, ZodSchema, ZodTypeDef } from 'zod'
import { z, ZodType } from 'zod'

type Request = LoaderArgs['request']

export function badRequest<T extends object>(data: Errors<T>) {
  return json(data, { status: 400 })
}

export function getSchema<Spec extends z.ZodRawShape | z.ZodTypeAny>(
  schema: Spec,
) {
  return schema instanceof ZodType ? schema : z.object(schema)
}

export async function safeFormData<Output, Input>(
  spec: ZodType<Output, ZodTypeDef, Input>,
  request: Request,
) {
  const values = Object.fromEntries(await request.clone().formData())
  return spec.safeParse(values)
}

export async function safeAction<T extends object, R>(
  formDataSpec: ZodSchema<T>,
  request: LoaderArgs['request'],
  fn: (values: z.infer<typeof formDataSpec>) => R,
) {
  const result = await safeFormData(formDataSpec, request)
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
  const formData = await request.clone().formData()
  const actionKey = spec.parse(formData.get('_action'))

  return await actions[actionKey](request)
}

export function safeParams<Spec extends z.ZodRawShape | z.ZodTypeAny>(
  schema: Spec,
  params: LoaderArgs['params'],
) {
  return getSchema(schema).parse(params)
}

// @TODO: use query-string to support arrays etc
export function safeQuery<Spec extends z.ZodRawShape | z.ZodTypeAny>(
  schema: Spec,
  request: Request,
) {
  return getSchema(schema).parse(
    Object.fromEntries(new URL(request.url).searchParams),
  )
}