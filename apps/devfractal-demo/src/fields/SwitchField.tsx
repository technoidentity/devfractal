import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Switch } from '@/ui/switch'
import { cn } from '@/core'
import type { BaseFieldProps } from './common'

type SwitchBaseProps = Omit<
  React.ComponentProps<typeof Switch>,
  'checked' | 'onCheckedChange'
> &
  Readonly<{
    onChange?: (value: boolean) => void
    value?: boolean
  }>

const SwitchBase = ({ onChange, value, ...props }: SwitchBaseProps) => (
  <Switch {...props} checked={value} onCheckedChange={onChange} />
)

export type SwitchFieldProps = Omit<
  React.ComponentProps<typeof Switch>,
  'value' | 'onChange' | 'checked' | 'onCheckedChange'
> &
  BaseFieldProps

// @TODO: This should be different thatn this for sure :-)
export const SwitchField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnDescription,
  cnMessage,
  ...props
}: SwitchFieldProps) => (
  <FormField
    name={name}
    className={cn(
      'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm',
      className,
    )}
  >
    <div className="space-y-0.5">
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      {description && (
        <FormDescription className={cnDescription}>
          {description}
        </FormDescription>
      )}
    </div>
    <FormMessage className={cnMessage} />
    <FormControl>
      <SwitchBase {...props} className={cnField} />
    </FormControl>
  </FormField>
)
