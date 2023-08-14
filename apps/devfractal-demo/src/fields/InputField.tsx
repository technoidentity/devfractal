import {
  Control,
  FormDescription,
  Field,
  FormLabel,
  FormMessage,
} from 'devfractal'
import { Input } from 'devfractal'
import { cn } from '@/core'
import type { BaseFieldProps } from './common'

export type InputBaseProps = Omit<
  React.ComponentProps<typeof Input>,
  'value' | 'onChange'
>

export const InputBase = (props: InputBaseProps) => (
  <Control>
    <Input {...props} />
  </Control>
)

export type InputFieldProps = InputBaseProps & BaseFieldProps

export const InputField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  ...props
}: InputFieldProps) => {
  return (
    <Field name={name} className={cn('my-2', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

      <InputBase {...props} className={cnField} />

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <FormMessage className={cnMessage} />
    </Field>
  )
}
