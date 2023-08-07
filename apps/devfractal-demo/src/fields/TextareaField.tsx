import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Textarea } from '@/ui/textarea'
import { cn } from '@core'
import type { BaseFieldProps } from './common'

export type TextareaFieldProps = React.ComponentProps<typeof Textarea> &
  BaseFieldProps

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
  <FormField className={className} name={name}>
    {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
    <FormControl>
      <Textarea className={cn('resize-none', cnField)} {...props} />
    </FormControl>
    {description && (
      <FormDescription className={cnDescription}>{description}</FormDescription>
    )}
    <FormMessage className={cnMessage} />
  </FormField>
)
