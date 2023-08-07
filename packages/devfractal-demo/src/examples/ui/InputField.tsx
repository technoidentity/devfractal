import type { BaseFieldProps } from '@/examples/ui/common'
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { cn } from '@/core'

export type InputFieldProps = React.ComponentProps<typeof Input> &
  BaseFieldProps

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
    <FormField name={name} className={cn('my-12', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

      <FormControl>
        <Input className={cnField} {...props} />
      </FormControl>

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <FormMessage className={cnMessage} />
    </FormField>
  )
}
