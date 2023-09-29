// copied from our own remix libraries

import type { Result } from '@srtp/core'
import { cast, isFail, isUndefined, resultFromZod } from '@srtp/core'
import { fromSearchParams } from '@srtp/web'
import { json, redirect, type LoaderFunctionArgs } from 'react-router-dom'
import invariant from 'tiny-invariant'
import { z } from 'zod'

// @TODO: `keyof T` means only works with shallow objects.
export type FieldErrors<T extends object> = Record<keyof T, string>

export type FormErrors<T extends object> = Readonly<{
  fieldErrors?: FieldErrors<T>
  formError?: string
}>

export const formErrors = <T extends object>(
  error: z.ZodError<T>,
): FieldErrors<T> => {
  const results: any = {}
  for (const e of error.errors) {
    results[e.path.join('.')] = e.message
  }
  return results
}

type Request = LoaderFunctionArgs['request']

export function badRequest<T extends object>(data: FormErrors<T>) {
  return json(data, { status: 400 })
}

export function badRequestFromResult<T extends object>(
  result: Result<string, T>,
) {
  invariant(isFail(result), 'badRequestFromResult expects a fail result')

  return badRequest<T>({ formError: result.error })
}

export function actionResult<T>(
  result: Result<string, T>,
  options?: { redirectUrl: string },
) {
  return isFail(result)
    ? badRequest({ formError: result.error })
    : isUndefined(options)
    ? json({})
    : redirect(options.redirectUrl)
}

export async function formDataResult<Spec extends z.ZodTypeAny>(
  spec: Spec,
  request: Request,
) {
  const values = Object.fromEntries(await request.clone().formData())

  return resultFromZod(spec.safeParse(values))
}

export async function formData(request: Request): Promise<unknown> {
  return Object.fromEntries(await request.clone().formData())
}

export async function safeFormData<Spec extends z.ZodTypeAny>(
  spec: Spec,
  request: Request,
): Promise<z.infer<Spec>> {
  const values = await formData(request)
  return cast(spec, values)
}

export async function safeAction<Spec extends z.AnyZodObject, R>(
  formDataSpec: Spec,
  { request }: LoaderFunctionArgs,
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
    (args: LoaderFunctionArgs) => unknown
  >,
>(spec: z.ZodEnum<z.Writeable<T>>, args: LoaderFunctionArgs, actions: Actions) {
  const formData = await args.request.clone().formData()
  const actionKey = cast(spec, formData.get('_action'))
  invariant(actionKey in actions, `${actionKey} not supported`)

  return actions[actionKey](args)
}

const HTTPMethods = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
type HTTPMethods = z.infer<typeof HTTPMethods>

export function methods<
  Actions extends Partial<
    Record<HTTPMethods, (args: LoaderFunctionArgs) => unknown>
  >,
>(args: LoaderFunctionArgs, actions: Actions) {
  const method = cast(HTTPMethods, args.request.method)
  const fn = actions[method]
  invariant(fn !== undefined, `${method} not supported`)

  return fn(args)
}

export function onlyMethod<Spec extends z.AnyZodObject, R>(
  args: LoaderFunctionArgs,
  spec: Spec,
  fn: (values: z.infer<typeof spec>) => Promise<Result<string, R>>,
  options?: { redirectUrl: string },
) {
  return safeAction(spec, args, async values =>
    actionResult(await fn(values), options),
  )
}

export function method<Spec extends z.AnyZodObject, R>(
  spec: Spec,
  fn: (values: z.infer<Spec>) => Promise<Result<string, R>>,
) {
  return (args: LoaderFunctionArgs) => onlyMethod(args, spec, fn)
}

export function castSearch<Spec extends z.ZodTypeAny>(
  spec: Spec,
  search: URLSearchParams | Request,
): z.infer<Spec> {
  if (!(search instanceof URLSearchParams)) {
    search = new URL(search.url).searchParams
  }

  return cast(spec, fromSearchParams(search))
}
