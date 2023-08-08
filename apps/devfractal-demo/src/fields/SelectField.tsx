import {
  AriaControl,
  Controller,
  FormDescription,
  Field,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import type { BaseFieldProps } from './common'
import { cn } from '@/core'

type SelectInternalProps = Omit<
  React.ComponentProps<typeof Select>,
  'onValueChange'
> & { onChange?: (value: string) => void }

const SelectInternal = ({ onChange, value, ...props }: SelectInternalProps) => {
  return <Select {...props} onValueChange={onChange} />
}

type SelectBaseProps = Omit<
  React.ComponentProps<typeof Select>,
  'value' | 'onValueChange'
> &
  Readonly<{ className?: string; placeholder: string; cnTrigger?: string }>

export const SelectBase = ({
  cnTrigger,
  placeholder,
  children,
  ...props
}: SelectBaseProps) => {
  return (
    <Controller>
      <SelectInternal {...props}>
        <AriaControl>
          <SelectTrigger className={cn('w-60', cnTrigger)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </AriaControl>
        <SelectContent>{children}</SelectContent>
      </SelectInternal>
    </Controller>
  )
}

export type SelectFieldProps = SelectBaseProps & BaseFieldProps

export const SelectField = ({
  className,
  name,
  label,
  description,
  cnTrigger,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  ...props
}: SelectFieldProps) => {
  return (
    <Field name={name} className={className}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}

      <SelectBase {...props} cnTrigger={cnTrigger} className={cnField} />

      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}

      <FormMessage className={cnMessage} />
    </Field>
  )
}
SelectField.Item = SelectItem
