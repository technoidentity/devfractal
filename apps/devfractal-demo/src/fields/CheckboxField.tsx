import { Checkbox } from '@/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { cn } from '@/core'
import React from 'react'
import type { BaseFieldProps } from './common'

export type CheckboxFieldProps = React.ComponentProps<typeof Checkbox> &
  BaseFieldProps

export const CheckBoxField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnDescription,
  cnMessage,
  ...props
}: CheckboxFieldProps) => {
  return (
    <FormField
      name={name}
      className={cn(
        'flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow',
        className,
      )}
    >
      <FormControl>
        <Checkbox className={cnField} {...props} />
      </FormControl>

      <div className="space-y-1 leading-none">
        {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
        {description && (
          <FormDescription className={cnDescription}>
            {description}
          </FormDescription>
        )}
      </div>
      <FormMessage className={cnMessage} />
    </FormField>
  )
}
