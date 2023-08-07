import type { BaseFieldProps } from '@/examples/ui/common'
import {
  AriaControl,
  FormField,
  FormLabel,
  FormMessage,
  IdField,
  useControllerProps,
} from '@/ui/form'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { cn } from '@core'

export type RadioFieldProps = React.ComponentProps<typeof RadioGroup> &
  BaseFieldProps

export const RadioField = ({
  className,
  name,
  label,
  description,
  cnField,
  cnLabel,
  cnMessage,
  cnDescription,
  ...props
}: BaseFieldProps) => {
  const field = useControllerProps()

  return (
    <FormField name={name}>
      {label && <FormLabel className={cnLabel}>{label}</FormLabel>}
      <AriaControl>
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className={cn('flex flex-col space-y-1', className)}
        >
          <IdField>
            <AriaControl className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="all" />
            </AriaControl>
            <FormLabel className="font-normal">All new messages</FormLabel>
          </IdField>

          <IdField>
            <AriaControl className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="mentions" />
            </AriaControl>
            <FormLabel className="font-normal">
              Direct messages and mentions
            </FormLabel>
          </IdField>

          <IdField>
            <AriaControl className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="none" />
            </AriaControl>
            <FormLabel className="font-normal">Nothing</FormLabel>
          </IdField>
        </RadioGroup>
      </AriaControl>
      <FormMessage />
    </FormField>
  )
}

export type RadioItemFieldProps = React.ComponentProps<
  typeof RadioGroupItem
> & {
  label?: React.ReactNode
  cnLabel?: string
  cnField?: string
}

export function RadioItemField({
  className,
  label,
  cnLabel,
  cnField,
  ...props
}: RadioFieldProps) {
  const rprops = props as React.ComponentProps<typeof RadioGroupItem>

  return (
    <IdField>
      <AriaControl
        className={cn('flex items-center space-x-3 space-y-0', className)}
      >
        <RadioGroupItem {...rprops} className={cnField} />
      </AriaControl>
      {label && (
        <FormLabel className={cn('font-normal', cnLabel)}>{label}</FormLabel>
      )}
    </IdField>
  )
}

export const RadioExample = () => {
  const field = useControllerProps()

  return (
    <>
      <FormLabel>Notify me about...</FormLabel>
      <AriaControl>
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="flex flex-col space-y-1"
        >
          <IdField>
            <AriaControl className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="all" />
            </AriaControl>
            <FormLabel className="font-normal">All new messages</FormLabel>
          </IdField>

          <IdField>
            <AriaControl className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="mentions" />
            </AriaControl>
            <FormLabel className="font-normal">
              Direct messages and mentions
            </FormLabel>
          </IdField>

          <IdField>
            <AriaControl className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="none" />
            </AriaControl>
            <FormLabel className="font-normal">Nothing</FormLabel>
          </IdField>
        </RadioGroup>
      </AriaControl>
      <FormMessage />
    </>
  )
}
