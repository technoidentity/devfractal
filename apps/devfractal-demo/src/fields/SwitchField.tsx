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

export type SwitchFieldProps = React.ComponentProps<typeof Switch> &
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
      <Switch {...props} className={cnField} />
    </FormControl>
  </FormField>
)
