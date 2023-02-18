import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { Result } from '@srtp/core'
import { isFail } from '@srtp/core'
import type { Errors } from '@srtp/remix-core'
import { formErrors } from '@srtp/remix-core'
import invariant from 'tiny-invariant'
import { z } from 'zod'

type Request = LoaderArgs['request']

export function badRequest<T extends object>(data: Errors<T>) {
  return json(data, { status: 400 })
}

export function getSchema<Spec extends z.ZodRawShape | z.ZodTypeAny>(
  schema: Spec,
) {
  return schema instanceof z.ZodType ? schema : z.object(schema)
}

export async function safeFormData<Output, Input>(
  spec: z.ZodType<Output, z.ZodTypeDef, Input>,
  request: Request,
) {
  const values = Object.fromEntries(await request.clone().formData())
  return spec.safeParse(values)
}

export async function safeAction<Spec extends z.AnyZodObject, R>(
  formDataSpec: Spec,
  { request }: LoaderArgs,
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
    z.infer<z.ZodEnum<z.Writeable<T>>>,
    (args: LoaderArgs) => unknown
  >,
>(spec: z.ZodEnum<z.Writeable<T>>, args: LoaderArgs, actions: Actions) {
  const formData = await args.request.clone().formData()
  const actionKey = spec.parse(formData.get('_action'))

  return actions[actionKey](args)
}

const HTTPMethods = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
type HTTPMethods = z.infer<typeof HTTPMethods>

export async function methods<
  Actions extends Partial<Record<HTTPMethods, (args: LoaderArgs) => unknown>>,
>(args: LoaderArgs, actions: Actions) {
  const method = HTTPMethods.parse(args.request.method)
  const fn = actions[method]
  invariant(fn !== undefined, `${method} not supported`)

  return fn(args)
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

export function handleResult<T>(r: Result<string, T>) {
  return isFail(r) ? badRequest({ error: r.fail }) : json({})
}

export function safeResultAction<Spec extends z.AnyZodObject, R>(
  spec: Spec,
  args: LoaderArgs,
  fn: (values: z.infer<typeof spec>) => Promise<Result<string, R>>,
) {
  return safeAction(spec, args, async values => handleResult(await fn(values)))
}

export function method<Spec extends z.AnyZodObject, R>(
  spec: Spec,
  fn: (values: z.infer<Spec>) => Promise<Result<string, R>>,
) {
  return (args: LoaderArgs) => safeResultAction(spec, args, fn)
}
