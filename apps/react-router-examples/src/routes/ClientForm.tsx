import type { Fieldset } from '@conform-to/react'
import { useForm } from '@conform-to/react'
import { parse } from '@conform-to/zod'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import { useSearch } from './4.authors'

export type Obj = Record<string, any>
export type Form<T extends Obj> = ReturnType<typeof useForm<T>>[0]
export type ClientFormState<T extends Obj> = readonly [Form<T>, Fieldset<T>]

const FormContext = React.createContext<
  readonly [Form<any>, Fieldset<any>] | undefined
>(undefined)

function useClientForm<Schema extends z.AnyZodObject>(
  schema: Schema,
  onSuccess: (values: z.infer<Schema>) => void,
): ClientFormState<z.infer<Schema>> {
  const [form, fieldset] = useForm<z.infer<Schema>>({
    shouldValidate: 'onBlur',
    onValidate: ({ formData }) => parse(formData, { schema }),
    onSubmit(event, { formData }) {
      event.preventDefault()

      const submission = parse(formData, { schema })
      if (submission.value) {
        onSuccess(submission.value)
      }
    },
  })

  return [form, fieldset] as const
}

export type ClientFormProps<Schema extends z.AnyZodObject> = Readonly<{
  defaultValues?: Partial<z.infer<Schema>>
  children: React.ReactNode
  onSuccess: (values: z.infer<Schema>) => void
}>

function clientForm<Schema extends z.AnyZodObject>(schema: Schema) {
  return function ClientForm({ children, onSuccess }: ClientFormProps<Schema>) {
    const [form, fieldset] = useClientForm(schema, onSuccess)

    const value = React.useMemo(
      () => [form, fieldset] as const,
      [fieldset, form],
    )

    return (
      <FormContext.Provider value={value}>
        <form {...form.props}>{children}</form>
      </FormContext.Provider>
    )
  }
}

export type SearchFormProps<Schema extends z.AnyZodObject> = Readonly<{
  // defaultValues?: Partial<z.infer<Schema>>
  children: React.ReactNode
  onSuccess?: (values: z.infer<Schema>) => void
}>
export function searchForm<Schema extends z.AnyZodObject>(schema: Schema) {
  const ClientForm = clientForm(schema)

  return function SearchForm<Schema extends z.AnyZodObject>(
    props: SearchFormProps<Schema>,
  ) {
    const [search, setSearch] = useSearch(schema)

    const onSuccess = React.useMemo(() => {
      return (values: z.infer<Schema>) => {
        setSearch(values)
        props.onSuccess?.(values)
      }
    }, [props, setSearch])

    return (
      <ClientForm {...props} onSuccess={onSuccess} defaultValues={search} />
    )
  }
}

const useFormContext = <T extends Obj>() => {
  const context = React.useContext(FormContext)

  invariant(
    context !== undefined,
    'useFormContext must be used within a FormContextProvider',
  )

  return context as ClientFormState<T>
}

export function useFieldset<T extends Obj>() {
  const [, fieldset] = useFormContext<T>()

  return fieldset
}

export function createClientForm<Schema extends z.AnyZodObject>(
  schema: Schema,
) {
  return [clientForm(schema), useFormContext<z.infer<Schema>>] as const
}

export function createSearchForm<Schema extends z.AnyZodObject>(
  schema: Schema,
) {
  return [searchForm(schema), useFormContext<z.infer<Schema>>] as const
}
