import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@srtp/ui-core'
import { cn } from '@srtp/ui-core'

import type { BaseFieldProps } from './common'
import {
  AriaControl,
  Controller,
  Field,
  FormDescription,
  FormLabel,
  FormMessage,
} from './form'

type SelectInternalProps = Omit<
  React.ComponentProps<typeof Select>,
  'onValueChange'
> & { onChange?: (value: string) => void }

const SelectInternal = ({ onChange, ...props }: SelectInternalProps) => {
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

export function SelectField({
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
}: SelectFieldProps): JSX.Element {
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
