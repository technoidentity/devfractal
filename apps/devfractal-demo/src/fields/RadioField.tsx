import { cn } from '@/core'
import {
  AriaControl,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  IdField,
} from '@/ui/form'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import React from 'react'
import type { BaseFieldProps } from './common'

type RadioGroupProps = React.ComponentProps<typeof RadioGroup>

type RadioFieldBaseProps = Omit<
  RadioGroupProps,
  'onValueChange' | 'onChange'
> & {
  onChange?: RadioGroupProps['onValueChange']
}

const RadioFieldBase = ({ onChange, ...props }: RadioFieldBaseProps) => {
  return <RadioGroup {...props} onValueChange={onChange} />
}

export type RadioFieldProps = Omit<
  React.ComponentProps<typeof RadioGroup>,
  'value' | 'onValueChange' | 'onChange'
> &
  BaseFieldProps

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
    <FormField name={name} className={className}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <FormControl>
        <RadioFieldBase
          className={cn('flex flex-col space-y-1', cnField)}
          {...props}
        >
          {children}
        </RadioFieldBase>
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

export type RadioItemFieldProps = React.ComponentProps<
  typeof RadioGroupItem
> & {
  label?: React.ReactNode
  cnLabel?: string
  cnField?: string
}

export function RadioItemField({
  className,
  label,
  cnLabel,
  cnField,
  ...props
}: RadioItemFieldProps) {
  const rprops = props as React.ComponentProps<typeof RadioGroupItem>

  return (
    <IdField>
      <AriaControl
        className={cn('flex items-center space-x-3 space-y-0', className)}
      >
        <RadioGroupItem {...rprops} className={cnField} />
      </AriaControl>
      {label && (
        <FormLabel className={cn('font-normal', cnLabel)}>{label}</FormLabel>
      )}
    </IdField>
  )
}
