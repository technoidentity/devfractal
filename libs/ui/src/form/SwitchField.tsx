import { Switch, cn } from '@srtp/ui-core'

import type { BaseFieldProps } from './common'
import { Control, Field, FormDescription, FormLabel, FormMessage } from './form'

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
