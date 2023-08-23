import { Textarea } from '../ui'
import { cn } from '../utils'
import type { BaseFieldProps } from './common'
import { Control, Field, FormDescription, FormLabel, FormMessage } from './form'

export type TextareaBaseProps = Omit<
  React.ComponentProps<typeof Textarea>,
  'value' | 'onChange'
>

export const TextareaBase = (props: TextareaBaseProps) => (
  <Control>
    <Textarea {...props} />
  </Control>
)

export type TextareaFieldProps = TextareaBaseProps & BaseFieldProps

export const TextareaField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnDescription,
  cnMessage,
  ...props
}: TextareaFieldProps) => (
  <Field className={className} name={name}>
    {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

    <TextareaBase {...props} className={cn('resize-none', cnField)} />

    {description && (
      <FormDescription className={cnDescription}>{description}</FormDescription>
    )}

    <FormMessage className={cnMessage} />
  </Field>
)
