import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from '@srtp/ui-core'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange, type DayPickerRangeProps } from 'react-day-picker'

import type { BaseFieldProps } from './common'
import {
  Field,
  FormDescription,
  FormLabel,
  FormMessage,
  useFieldProps,
} from './form'

type DateRangePickerInternalProps = Omit<
  DayPickerRangeProps,
  'mode' | 'selected' | 'onSelect'
> & {
  value?: DayPickerRangeProps['selected']
  onChange?: DayPickerRangeProps['onSelect']
}

const DateRangePickerInternal = ({
  value,
  onChange,
  ...props
}: DateRangePickerInternalProps) => (
  <Calendar
    defaultMonth={value?.from}
    {...props}
    selected={value}
    onSelect={onChange}
    mode="range"
  />
)

export type DateRangePickerBaseProps = Omit<
  DayPickerRangeProps,
  'mode' | 'selected' | 'onSelect'
> &
  Readonly<{
    children?: React.ReactNode
    dateFormat?: (dateRange?: DateRange) => React.ReactNode
    triggerLabel?: React.ReactNode
  }>

export const DateRangePickerBase = ({
  children,
  dateFormat,
  triggerLabel,
  ...props
}: DateRangePickerBaseProps) => {
  return (
    <Popover>
      <DateRangeTrigger triggerLabel={triggerLabel} dateFormat={dateFormat} />
      <PopoverContent className="w-auto p-0" align="start">
        {children}
        <DateRangePickerInternal initialFocus numberOfMonths={2} {...props} />
      </PopoverContent>
    </Popover>
  )
}

export type DateRangePickerFieldProps = DateRangePickerBaseProps &
  BaseFieldProps

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
  ...props
}: DateRangePickerFieldProps) => {
  return (
    <Field name={name} className={cn('grid gap-2', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <DateRangePickerBase {...props} className={cnField} />

      <FormMessage className={cnMessage} />
    </Field>
  )
}
