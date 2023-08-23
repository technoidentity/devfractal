import { isUndefined } from '@srtp/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

type ErrorsContext<T> = Readonly<{ errors: T | undefined }>

type FormProps<FormValues, ServerResult> = Readonly<{
  readonly navigateTo?: string
  readonly onResponse?: (response: unknown) => void
  readonly action: string | ((values: FormValues) => Promise<ServerResult>)
  children: React.ReactNode
}>

export function createForm<
  FormSpec extends z.AnyZodObject,
  ErrorsSpec extends z.AnyZodObject,
>(formSpec: FormSpec, errorsSpec: ErrorsSpec) {
  type FormValues = z.infer<FormSpec>
  type Errors = z.infer<ErrorsSpec>

  const FormContext = React.createContext<
    ErrorsContext<FormValues> | undefined
  >(undefined)

  function Form({
    children,
    action,
    navigateTo,
  }: FormProps<FormValues, Errors>) {
    const navigate = useNavigate()
    const [errors, set] = React.useState<Errors | undefined>(undefined)

    const setErrors = React.useCallback(
      (errors: unknown) => {
        set(isUndefined(errors) ? undefined : errorsSpec.parse(errors))
      },
      [set],
    )

    const defaultAction = React.useCallback(
      (values: any) => {
        invariant(typeof action === 'string', 'action must be a string')

        return fetch(action, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
          },
        })
      },
      [action],
    )

    const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
      evt => {
        evt.preventDefault()

        const formData = new FormData(evt.currentTarget)
        const result = formSpec.safeParse(
          Object.fromEntries(formData.entries()),
        )
        if (!result.success) {
          setErrors(result.error)
          return
        }

        const values = result.data
        const fn = typeof action === 'string' ? defaultAction : action

        fn(values)
          .then(response => {
            if (response.ok && navigateTo) {
              navigate(navigateTo)
              return undefined
            }
            return response.json()
          })
          .catch(setErrors)
          .catch(setErrors)
      },
      [action, defaultAction, navigate, navigateTo, setErrors],
    )

    const value = React.useMemo(() => ({ errors }), [errors])

    return (
      <FormContext.Provider value={value}>
        <form onSubmit={onSubmit}>{children}</form>
      </FormContext.Provider>
    )
  }

  const useFormData = () => {
    const context = React.useContext(FormContext)
    invariant(
      isUndefined(context),
      'useFormData must be used within a FormContext',
    )

    return context
  }

  return [Form, useFormData] as const
}
