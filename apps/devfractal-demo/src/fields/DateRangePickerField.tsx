import { cn } from '@/core'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange, type DayPickerRangeProps } from 'react-day-picker'
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  useFieldProps,
} from '@/ui/form'
import type { BaseFieldProps } from './common'

type DateRangePickerBaseProps = Omit<
  DayPickerRangeProps,
  'mode' | 'selected' | 'onSelect'
> & {
  value?: DayPickerRangeProps['selected']
  onChange?: DayPickerRangeProps['onSelect']
}

const DateRangePickerBase = ({
  value,
  onChange,
  ...props
}: DateRangePickerBaseProps) => (
  <Calendar
    defaultMonth={value?.from}
    {...props}
    selected={value}
    onSelect={onChange}
    mode="range"
  />
)

export type DateRangePickerFieldProps = Omit<
  DayPickerRangeProps,
  'mode' | 'selected' | 'onSelect'
> &
  BaseFieldProps &
  Readonly<{
    children?: React.ReactNode
    dateFormat?: (dateRange?: DateRange) => React.ReactNode
    triggerLabel?: React.ReactNode
  }>

type DateRangeTriggerProps = {
  dateFormat?: DateRangePickerFieldProps['dateFormat']
  triggerLabel?: DateRangePickerFieldProps['triggerLabel']
}
const DateRangeTrigger = ({
  dateFormat,
  triggerLabel,
}: DateRangeTriggerProps) => {
  const { fieldProps: field } = useFieldProps()
  const dateRange = field.value

  const formattedDate = dateFormat ? (
    dateFormat(dateRange)
  ) : dateRange?.from ? (
    dateRange.to ? (
      <>
        {format(dateRange.from, 'LLL dd, y')} -{' '}
        {format(dateRange.to, 'LLL dd, y')}
      </>
    ) : (
      format(dateRange.from, 'LLL dd, y')
    )
  ) : (
    <span>{triggerLabel ?? 'Pick a date'}</span>
  )

  return (
    <PopoverTrigger asChild>
      <Button
        id="date"
        variant={'outline'}
        className={cn(
          'w-[300px] justify-start text-left font-normal',
          !dateRange && 'text-muted-foreground',
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {formattedDate}
      </Button>
    </PopoverTrigger>
  )
}
export const DateRangePickerField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  triggerLabel,
  dateFormat,
  children,
  ...props
}: DateRangePickerFieldProps) => {
  return (
    <FormField name={name} className={cn('grid gap-2', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <Popover>
        <DateRangeTrigger triggerLabel={triggerLabel} dateFormat={dateFormat} />
        <PopoverContent className="w-auto p-0" align="start">
          {children}
          <DateRangePickerBase
            initialFocus
            numberOfMonths={2}
            className={cnField}
            {...props}
          />
        </PopoverContent>
      </Popover>{' '}
      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}
      <FormMessage className={cnMessage} />
    </FormField>
  )
}
