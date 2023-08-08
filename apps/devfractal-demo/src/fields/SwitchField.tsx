import {
  Control,
  FormDescription,
  Field,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Switch } from '@/ui/switch'
import { cn } from '@/core'
import type { BaseFieldProps } from './common'

export type SwitchBaseProps = Omit<
  React.ComponentProps<typeof Switch>,
  'value' | 'onChange' | 'checked' | 'onCheckedChange'
>

export const SwitchBase = (props: SwitchBaseProps) => (
  <Control>
    <SwitchInternal {...props} />
  </Control>
)

type SwitchInternalProps = Omit<
  React.ComponentProps<typeof Switch>,
  'checked' | 'onCheckedChange'
> &
  Readonly<{
    onChange?: (value: boolean) => void
    value?: boolean
  }>

const SwitchInternal = ({ onChange, value, ...props }: SwitchInternalProps) => (
  <Switch {...props} checked={value} onCheckedChange={onChange} />
)

export type SwitchFieldProps = SwitchBaseProps & BaseFieldProps

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
  <Field
    name={name}
    className={cn(
      'flex flex-row items-center justify-between p-3 shadow-sm',
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

    <SwitchBase {...props} className={cnField} />
  </Field>
)
