import { cn } from '@/core'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange, type DayPickerRangeProps } from 'react-day-picker'
import { FormDescription, FormField, FormLabel, FormMessage } from '@/ui/form'
import type { BaseFieldProps } from './common'

export type DateRangePickerFieldProps = Omit<DayPickerRangeProps, 'mode'> &
  BaseFieldProps &
  Readonly<{
    children?: React.ReactNode
    dateFormat?: (dateRange?: DateRange) => React.ReactNode
    triggerLabel?: React.ReactNode
  }>

export const DateRangePickerField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  triggerLabel,
  cnDescription,
  dateFormat,
  children,
  ...props
}: DateRangePickerFieldProps) => {
  const dateRange = props.selected

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
    <FormField name={name} className={cn('grid gap-2', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <Popover>
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
        <PopoverContent className="w-auto p-0" align="start">
          {children}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
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
