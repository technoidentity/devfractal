import { cn } from '@/core'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import {
  AriaControl,
  Controller,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  useFieldProps,
} from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useEvent } from '@srtp/react'
import { format } from 'date-fns'
import type { DayPickerSingleProps } from 'react-day-picker'
import type { BaseFieldProps } from './common'

type DatePickerBaseProps = Omit<
  DayPickerSingleProps,
  'mode' | 'selected' | 'onSelect'
> & {
  value?: DayPickerSingleProps['selected']
  onChange?: (selectedDay: Date) => void
}

const DatePickerBase = ({ value, onChange, ...props }: DatePickerBaseProps) => {
  const handleChange: DayPickerSingleProps['onSelect'] = (_, value) => {
    onChange?.(value)
  }
  return (
    <Calendar
      {...props}
      selected={value}
      onSelect={handleChange}
      mode="single"
      initialFocus
    />
  )
}

export type DatePickerFieldProps = Omit<DayPickerSingleProps, 'mode'> &
  BaseFieldProps &
  Readonly<{
    children?: React.ReactNode
    dateFormat?: string
    triggerLabel?: React.ReactNode
  }>

type DatePickerTriggerProps = {
  dateFormat?: DatePickerFieldProps['dateFormat']
  triggerLabel?: DatePickerFieldProps['triggerLabel']
}

const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const { fieldProps: field } = useFieldProps()

  const formatted = useEvent((value: any) =>
    value ? (
      format(field.value, props.dateFormat ?? 'PPP')
    ) : (
      <span>{props.triggerLabel ?? 'Pick a date'}</span>
    ),
  )

  return (
    <PopoverTrigger asChild>
      <AriaControl>
        {/* @TODO: This should be controllable from outside? */}
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] pl-3 text-left font-normal',
            !field.value && 'text-muted-foreground',
          )}
        >
          {formatted(field.value)}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </AriaControl>
    </PopoverTrigger>
  )
}

export const DatePickerField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  dateFormat,
  triggerLabel,
  children,
  ...props
}: DatePickerFieldProps) => {
  return (
    <FormField name={name} className={cn('flex flex-col', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <Popover>
        <DatePickerTrigger
          dateFormat={dateFormat}
          triggerLabel={triggerLabel}
        />

        <PopoverContent className="w-auto p-0" align="start">
          {children}
          <Controller>
            <DatePickerBase {...props} className={cnField} />
          </Controller>
        </PopoverContent>
      </Popover>

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <FormMessage className={cnMessage} />
    </FormField>
  )
}
