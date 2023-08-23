import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { cn } from '../utils'
import type { BaseFieldProps } from './common'
import { Control, Field, FormDescription, FormLabel, FormMessage } from './form'

type CheckboxProps = React.ComponentProps<typeof Checkbox>

type CheckboxInternalProps = Omit<
  CheckboxProps,
  'checked' | 'onCheckedChange'
> & {
  value?: CheckboxProps['checked']
  onChange?: CheckboxProps['onCheckedChange']
}

export type CheckboxBaseProps = Omit<
  CheckboxInternalProps,
  'checked' | 'onChange'
>

export const CheckboxBase = (props: CheckboxBaseProps) => (
  <Control>
    <CheckboxInternal {...props} />
  </Control>
)

const CheckboxInternal = ({
  value,
  onChange,
  ...props
}: CheckboxInternalProps) => (
  <Checkbox {...props} checked={value} onCheckedChange={onChange} />
)

export type CheckboxFieldProps = CheckboxBaseProps & BaseFieldProps

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
    <Field
      name={name}
      className={cn('flex flex-row space-x-3 space-y-0 p-4', className)}
    >
      <CheckboxBase {...props} className={cnField} />

      <div className="space-y-1 leading-none">
        {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

        {description && (
          <FormDescription className={cnDescription}>
            {description}
          </FormDescription>
        )}
      </div>

      <FormMessage className={cnMessage} />
    </Field>
  )
}
