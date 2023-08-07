import {
  AriaControl,
  Controller,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/ui/select'
import type { BaseFieldProps } from './common'

type SelectBaseProps = Omit<
  React.ComponentProps<typeof Select>,
  'onValueChange'
> & { onChange?: (value: string) => void }

const SelectBase = ({ onChange, ...props }: SelectBaseProps) => (
  <Select {...props} onValueChange={onChange} />
)

export type SelectFieldProps = Omit<
  React.ComponentProps<typeof Select>,
  'value' | 'onValueChange'
> &
  BaseFieldProps &
  Readonly<{
    className?: string
    placeholder: string
  }>

export const SelectField = ({
  className,
  placeholder,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  children,
  ...props
}: SelectFieldProps) => {
  return (
    <FormField name={name}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <Controller>
        <SelectBase {...props}>
          <AriaControl className={cnField}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} className={className} />
            </SelectTrigger>
          </AriaControl>
          <SelectContent>{children}</SelectContent>
        </SelectBase>
      </Controller>
      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}
      <FormMessage className={cnMessage} />
    </FormField>
  )
}
