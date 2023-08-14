import { createFormContext, useForm, zodResolver } from '@mantine/form'
import type { UseFormInput, UseFormReturnType } from '@mantine/form/lib/types'
import type LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { context } from '@srtp/react'
import { getRawShape } from '@srtp/spec'
import React, { type ComponentProps } from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import { cn } from '@srtp/ui/src/utils'
import { Label } from '@srtp/ui/src/ui/label'

type FormSpec = z.ZodEffects<any> | z.AnyZodObject

type FormType<Spec extends FormSpec> = UseFormReturnType<
  z.infer<Spec>,
  (values: z.infer<Spec>) => z.infer<Spec>
>

export type FormContext<Spec extends FormSpec> = {
  form: FormType<Spec>
  spec: Spec
  useContext: () => FormType<Spec>
}

export const [FormContext, useFormContext] = context<FormContext<any>>({
  errorMessage: 'use Form',
})

export type FormProps<Spec extends FormSpec> = ComponentProps<'form'> &
  Readonly<{
    onSubmit?: (values: z.infer<Spec>) => void
    children: React.ReactNode
  }> &
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
          <form
            {...props}
            onSubmit={form.onSubmit(values => onSubmit?.(values))}
          >
            {children}
          </form>
        </FormContext>
      </Provider>
    )
  }

  return [Form, useFormContext] as const
}

type IdContext = Readonly<{ id: string }>

const [IdContext, useIdContext] = context<IdContext>({
  errorMessage: 'useIdContext must be used within a IdContext',
})

export type IdFieldProps = React.HTMLAttributes<HTMLDivElement>

export const IdField = React.forwardRef<HTMLDivElement, IdFieldProps>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    const value = React.useMemo(() => ({ id }) as const, [id])

    return (
      <IdContext value={value}>
        <div ref={ref} className={className} {...props} />
      </IdContext>
    )
  },
)
IdField.displayName = 'IdField'

type FieldContext = Readonly<{
  type: 'input' | 'checkbox'
  name: string
}>

const [FieldContext, useField] = context<FieldContext>({
  errorMessage: 'useField must be used within a FieldContext',
})

export type FormFieldProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<FieldContext, 'name'> & { type?: 'input' | 'checkbox' }

export const Field = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => {
    const fieldValue = React.useMemo(
      () => ({ name: props.name, type: props.type ?? 'input' }),
      [props.name, props.type],
    )

    return (
      <IdField>
        <FieldContext value={fieldValue}>
          <div ref={ref} className={cn('space-y-2', className)} {...props} />
        </FieldContext>
      </IdField>
    )
  },
)
Field.displayName = 'Field'

export function useFieldProps() {
  const { name, type } = useField()
  const { form } = useFormContext()
  const fieldProps = form.getInputProps(name, { type })
  return { name, fieldProps }
}

const useFormField = () => {
  const { id } = useIdContext()
  const { name, fieldProps } = useFieldProps()

  const error = fieldProps.error

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
  }
}

export function useAriaProps() {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  const ariaProps = {
    id: formItemId,
    'aria-describedby': !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    'aria-invalid': !!error,
  }

  return ariaProps
}

export const AriaControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  const slotProps = useAriaProps()

  return <Slot {...slotProps} {...props} ref={ref} />
})
AriaControl.displayName = 'AriaControl'

export function useControllerProps() {
  const { name, fieldProps } = useFieldProps()

  return { name, ...fieldProps }
}

export const Controller = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const slotProps = useControllerProps()
  return <Slot {...slotProps} {...props} ref={ref} />
})
Controller.displayName = 'Controller'

export const Control = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const controllerProps = useControllerProps()
  const ariaProps = useAriaProps()

  return <Slot {...controllerProps} {...ariaProps} {...props} ref={ref} />
})
Control.displayName = 'Control'

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField()
  const { fieldProps } = useFieldProps()

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

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <div
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
  const { formMessageId } = useFormField()
  const { fieldProps } = useFieldProps()

  const body = fieldProps.error ? String(fieldProps.error?.message) : children

  if (!body) {
    return null
  }

  return (
    <div
      ref={ref}
      id={formMessageId}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </div>
  )
})
FormMessage.displayName = 'FormMessage'
