import {
  Control,
  FormDescription,
  Field,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Textarea } from '@/ui/textarea'
import { cn } from '@/core'
import type { BaseFieldProps } from './common'

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
