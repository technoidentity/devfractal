import { FormField, useControllerProps } from '@/ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/ui/select'

import type { BaseFieldProps } from '@/examples/ui/common'
import { AriaControl, FormDescription, FormLabel, FormMessage } from '@/ui/form'

export type SelectFieldProps = React.ComponentProps<typeof Select> &
  BaseFieldProps & {
    className?: string
    placeholder: string
  }

export const SelectField = ({
  className,
  placeholder,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  children,
  ...props
}: SelectFieldProps) => {
  const field = useControllerProps()

  return (
    <FormField name={name}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <Select {...props} onValueChange={field.onChange} value={field.value}>
        <AriaControl className={cnField}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} className={className} />
          </SelectTrigger>
        </AriaControl>
        <SelectContent>{children}</SelectContent>
      </Select>
      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <FormMessage className={cnMessage} />
    </FormField>
  )
}
