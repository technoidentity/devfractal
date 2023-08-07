import {
  AriaControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  IdField,
  useControllerProps,
} from '@/ui/form'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { cn } from '@core'
import React from 'react'
import type { BaseFieldProps } from './common'

export type RadioFieldProps = React.ComponentProps<typeof RadioGroup> &
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
  const field = useControllerProps()

  return (
    <FormField name={name} className={className}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <AriaControl>
        <RadioGroup
          {...props}
          onValueChange={field.onChange}
          value={field.value}
          className={cn('flex flex-col space-y-1', cnField)}
        >
          {children}
        </RadioGroup>
      </AriaControl>
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
