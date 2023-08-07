import { cn } from '@/core'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import type { DayPickerSingleProps } from 'react-day-picker'
import type { BaseFieldProps } from './common'

export type DatePickerFieldProps = Omit<DayPickerSingleProps, 'mode'> &
  BaseFieldProps &
  Readonly<{
    children?: React.ReactNode
    dateFormat?: string
    triggerLabel?: React.ReactNode
  }>

export const DatePickerField = ({
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
}: DatePickerFieldProps) => {
  return (
    <FormField name={name} className={cn('flex flex-col', className)}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            {/* @TODO: This should be controllable from outside? */}
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !props.selected && 'text-muted-foreground',
              )}
            >
              {props.selected ? (
                format(props.selected, dateFormat ?? 'PPP')
              ) : (
                <span>{triggerLabel ?? 'Pick a date'}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {children}
          <Calendar mode="single" {...props} initialFocus className={cnField} />
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
