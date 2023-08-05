import { cn } from '@/core'
import { createFormContext, useForm, zodResolver } from '@mantine/form'
import type { UseFormInput, UseFormReturnType } from '@mantine/form/lib/types'
import type LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { context } from '@srtp/react'
import { getRawShape } from '@srtp/spec'
import React from 'react'
import { Form as RouterForm } from 'react-router-dom'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import { Label } from './label'

type TypeOfForm<Spec extends FormSpec> = UseFormReturnType<
  z.infer<Spec>,
  (values: z.infer<Spec>) => z.infer<Spec>
>

export type FormContext<Spec extends FormSpec> = {
  form: TypeOfForm<Spec>
  useContext: () => UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  spec: Spec
}

export const [FormContext, useFormContext] = context<FormContext<any>>({
  errorMessage: 'use FormContext Provider',
})

type FormSpec = z.ZodEffects<any> | z.AnyZodObject

export type FormProps<Spec extends FormSpec> = Readonly<{
  onSubmit?: (values: z.infer<Spec>) => void
  children: React.ReactNode
}> &
  Omit<React.ComponentProps<typeof RouterForm>, 'onSubmit'> &
  Omit<UseFormInput<z.infer<Spec>>, 'validate'>

export function createClientForm<Spec extends FormSpec>(
  spec: Spec,
  initial?: z.infer<Spec>,
) {
  type T = z.infer<Spec>
  const [Provider, useContext] = createFormContext<T>()

  const Form = ({
    initialValues,
    onSubmit,
    children,
    ...props
  }: FormProps<Spec>) => {
    invariant(
      initialValues !== undefined || initial !== undefined,
      'You must provide initialValues to form',
    )

    const form = useForm({
      initialValues: initialValues ?? initial,
      validateInputOnBlur: true,
      ...props,
      validate: zodResolver(spec),
    })

    const value = React.useMemo(
      () =>
        ({
          form,
          useContext,
          spec: getRawShape(spec),
        }) as const,
      [form],
    )

    return (
      <Provider form={form}>
        <FormContext value={value}>
          <RouterForm {...props} onSubmit={onSubmit}>
            {children}
          </RouterForm>
        </FormContext>
      </Provider>
    )
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  return [Form, useFormContext] as const
}

type FieldContext = Readonly<{
  name: string
  id: string
}>

const [FieldContext, useField] = context<FieldContext>({
  errorMessage: 'useFormContext must be used within a Form',
})

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { fieldProps, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(fieldProps.error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

export type FormFieldProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<FieldContext, 'name'>

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FieldContext value={{ id, name: props.name }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props} />
      </FieldContext>
    )
  },
)
FormField.displayName = 'FormField'

const useFormField = () => {
  const { name, id } = useField()
  const { form } = useFormContext()
  const fieldProps = form.getInputProps(name)

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    fieldProps,
  }
}

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { fieldProps, formItemId, formDescriptionId, formMessageId } =
    useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !fieldProps.error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!fieldProps.error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { fieldProps, formMessageId } = useFormField()
  const body = fieldProps.error ? String(fieldProps.error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'
