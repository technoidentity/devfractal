import { cn } from '@srtp/ui'
import { Button } from '@srtp/ui'
import { Calendar } from '@srtp/ui'
import {
  AriaControl,
  Controller,
  Field,
  FormDescription,
  FormLabel,
  FormMessage,
  useFieldProps,
} from './form'
import { Popover, PopoverContent, PopoverTrigger } from '@srtp/ui'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import type { DayPickerSingleProps } from 'react-day-picker'
import type { BaseFieldProps } from './common'

type DatePickerInternalProps = Omit<
  DayPickerSingleProps,
  'mode' | 'selected' | 'onSelect'
> & {
  value?: DayPickerSingleProps['selected']
  onChange?: (selectedDay: Date) => void
}

const DatePickerInternal = ({
  value,
  onChange,
  ...props
}: DatePickerInternalProps) => {
  const handleChange: DayPickerSingleProps['onSelect'] = value => {
    if (value) {
      onChange?.(value)
    }
  }

  return (
    <Calendar
      initialFocus
      {...props}
      selected={value}
      onSelect={handleChange}
      mode="single"
    />
  )
}

export type DatePickerBaseProps = Omit<DayPickerSingleProps, 'mode'> &
  Readonly<{
    children?: React.ReactNode
    dateFormat?: string
    triggerLabel?: React.ReactNode
    cnField?: string
    cnTrigger?: string
  }>

export const DatePickerBase = ({
  children,
  dateFormat,
  triggerLabel,
  cnField,
  cnTrigger,
  ...props
}: DatePickerBaseProps) => (
  <Popover>
    <DatePickerTrigger
      dateFormat={dateFormat}
      triggerLabel={triggerLabel}
      cnTrigger={cnTrigger}
    />

    <PopoverContent className="w-auto p-0" align="start">
      {children}
      <Controller>
        <DatePickerInternal {...props} className={cnField} />
      </Controller>
    </PopoverContent>
  </Popover>
)

export type DatePickerFieldProps = DatePickerBaseProps & BaseFieldProps

export type DatePickerTriggerProps = {
  cnTrigger?: string
  dateFormat?: DatePickerFieldProps['dateFormat']
  triggerLabel?: DatePickerFieldProps['triggerLabel']
}

export const DatePickerTrigger = ({
  cnTrigger,
  dateFormat,
  triggerLabel,
}: DatePickerTriggerProps) => {
  const { fieldProps: field } = useFieldProps()

  const formatted = (value: any) =>
    value ? (
      format(field.value, dateFormat ?? 'PPP')
    ) : (
      <span>{triggerLabel ?? 'Pick a date'}</span>
    )

  return (
    <PopoverTrigger asChild>
      <AriaControl>
        {/* @TODO: This should be controllable from outside? */}
        <Button
          variant={'outline'}
          className={cn(
            'w-60 pl-3 text-left font-normal',
            !field.value && 'text-muted-foreground',
            cnTrigger,
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
  cnLabel,
  cnMessage,
  cnDescription,
  ...props
}: DatePickerFieldProps) => {
  return (
    <Field name={name} className={cn('flex flex-col', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

      <DatePickerBase {...props} />

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <FormMessage className={cnMessage} />
    </Field>
  )
}
