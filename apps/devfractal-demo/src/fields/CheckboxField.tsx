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

type CheckboxProps = React.ComponentProps<typeof Checkbox>

type CheckboxBaseProps = Omit<CheckboxProps, 'checked'> & {
  value?: CheckboxProps['checked']
  onChange?: CheckboxProps['onCheckedChange']
}

const CheckboxBase = ({ value, onChange, ...props }: CheckboxBaseProps) => {
  return <Checkbox {...props} checked={value} onCheckedChange={onChange} />
}

export type CheckboxFieldProps = Omit<
  CheckboxBaseProps,
  'checked' | 'onChange'
> &
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
        <CheckboxBase className={cnField} {...props} />
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
