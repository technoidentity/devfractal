import { RadioGroup, RadioGroupItem, cn } from '@srtp/ui-core'
import React from 'react'

import type { BaseFieldProps } from './common'
import {
  AriaControl,
  Control,
  Field,
  FormDescription,
  FormLabel,
  FormMessage,
  IdField,
} from './form'

type RadioItemProps = React.ComponentProps<typeof RadioGroupItem>

export type RadioItemFieldProps = RadioItemProps & {
  label?: React.ReactNode
  cnLabel?: string
  cnField?: string
}

function RadioItemField({
  className,
  label,
  cnLabel,
  cnField,
  ...props
}: RadioItemFieldProps) {
  const rprops = props as React.ComponentProps<typeof RadioGroupItem>

  return (
    <IdField className={cn('flex items-center space-x-3 space-y-0', className)}>
      <AriaControl>
        <RadioGroupItem {...rprops} className={cnField} />
      </AriaControl>
      {label && (
        <FormLabel className={cn('font-normal', cnLabel)}>{label}</FormLabel>
      )}
    </IdField>
  )
}

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>

type RadioInternalProps = Omit<
  RadioGroupProps,
  'onValueChange' | 'onChange'
> & {
  onChange?: RadioGroupProps['onValueChange']
}

const RadioInternal = ({ onChange, ...props }: RadioInternalProps) => {
  return <RadioGroup {...props} onValueChange={onChange} />
}

export type RadioBaseProps = Omit<
  React.ComponentProps<typeof RadioGroup>,
  'value' | 'onValueChange' | 'onChange'
>

export const RadioBase = (props: RadioBaseProps) => (
  <Control>
    <RadioInternal {...props} />
  </Control>
)

export type RadioFieldProps = RadioBaseProps & BaseFieldProps

export const RadioField = ({
  className,
  name,
  label,
  cnField,
  cnLabel,
  cnMessage,
  description,
  cnDescription,
  children,
  ...props
}: RadioFieldProps) => {
  return (
    <Field name={name} className={className}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <RadioBase {...props} className={cn('flex flex-col space-y-1', cnField)}>
        {children}
      </RadioBase>

      <FormMessage className={cnMessage} />
    </Field>
  )
}
RadioField.Item = RadioItemField
