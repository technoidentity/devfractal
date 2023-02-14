/* eslint-disable @typescript-eslint/naming-convention */
<<<<<<< Updated upstream
=======
import {
  AutocompleteProps,
  CheckboxProps,
  ChipProps,
  ColorInputProps,
  FileInputProps,
  Input,
  InputProps,
  MultiSelectProps,
  NumberInputProps,
  PasswordInputProps,
  RadioGroupProps,
  RatingProps,
  SegmentedControlProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TextareaProps,
  TextInputProps,
} from '@mantine/core'
import {
  Autocomplete as MantineAutocomplete,
  Checkbox,
  Chip as MantineChip,
  ColorInput,
  FileInput,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Radio,
  Rating as MantineRating,
  SegmentedControl as MantineSegmentedControl,
  Select as MantineSelect,
  Slider as MantineSlider,
  Switch as MantineSwitch,
  Textarea,
  TextInput,
} from '@mantine/core'
import type { DatePickerProps, TimeInputProps } from '@mantine/dates'
import {
  // Calendar as MantineCalendar,
  // CalendarProps,
  DatePicker as MantineDatePicker,
  TimeInput,
} from '@mantine/dates'
>>>>>>> Stashed changes
import type { UseFormReturnType } from '@mantine/form'
import { createFormContext, useForm, zodResolver } from '@mantine/form'
import type { UseFormInput } from '@mantine/form/lib/types'

import type { FormProps as RemixFormProps } from '@remix-run/react'
import { Form as RemixForm, useSubmit } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import type { FormSchema } from '@srtp/validator'
import { getRawShape } from '@srtp/validator'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import { FormContext, useFormContext } from './FormContext'
import type { InputsType } from './Inputs'
import { Inputs } from './Inputs'
import { useSuccessfulSubmit } from './useSuccessfulSubmit'
import { getFieldError } from './utils'

type MyFormProps<Spec extends FormSchema> = Readonly<{
  onSubmit?: (values: z.infer<Spec>) => void
  children: React.ReactNode
  serverErrors?: Errors<z.infer<Spec>>
}>

type FormProps<Spec extends FormSchema> = MyFormProps<Spec> &
  Omit<RemixFormProps, 'onSubmit'> &
  Omit<UseFormInput<z.infer<Spec>>, 'validate'>

type MyRemixFormProps<Spec extends FormSchema> = RemixFormProps &
  Readonly<{
    onSubmit?: (values: z.infer<Spec>) => void
    form: UseFormReturnType<
      z.TypeOf<Spec>,
      (values: z.TypeOf<Spec>) => z.TypeOf<Spec>
    >
  }>

function useOnSubmitOnSuccess<Spec extends FormSchema>(
  onSubmit?: (values: z.infer<Spec>) => void,
) {
  const { form } = useFormContext()
  const success = useSuccessfulSubmit()

  React.useEffect(() => {
    success && onSubmit?.(form.values)
  }, [form.values, onSubmit, success])
}

function MyRemixForm<Spec extends FormSchema>({
  form,
  children,
  onSubmit,
  ...props
}: MyRemixFormProps<Spec>) {
  const submit = useSubmit()
  useOnSubmitOnSuccess()

  return (
    <RemixForm
      {...props}
      onSubmit={form.onSubmit((_, event) => {
        submit(event.currentTarget, { replace: true, method: props.method })
      })}
    >
      {children}
    </RemixForm>
  )
}

export function createForm<Spec extends FormSchema>(
  spec: Spec,
  initial?: z.infer<Spec>,
) {
  type T = z.infer<Spec>
  const [Provider, useContext] = createFormContext<T>()

  const Form = ({
    initialValues,
    onSubmit,
    children,
    serverErrors,
    ...props
  }: FormProps<Spec>) => {
    invariant(
      initialValues !== undefined || initial !== undefined,
      'You must provide initialValues to form',
    )
    const form = useForm({
      initialValues: initialValues || initial,
      validateInputOnBlur: true,
      ...props,
      validate: zodResolver(spec),
    })

    // @TODO: use form.setErrors or initialErrors instead?
    // Unfortunately globally available FormContext can't be typesafe. So any
    const errMsg = getFieldError(serverErrors, form) as any

    const value = {
      form,
      useContext,
      serverErrors,
      errMsg,
      spec: getRawShape(spec),
    } as const

    return (
      <Provider form={form}>
        <FormContext.Provider value={value}>
          <MyRemixForm {...props} onSubmit={onSubmit} form={form}>
            {children}
          </MyRemixForm>
        </FormContext.Provider>
      </Provider>
    )
  }

<<<<<<< Updated upstream
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { Form, useFormContext: useForm, Inputs: Inputs as InputsType<Spec> }
=======
  const Inputs: Inputs<Spec> = {
    Action,
    Autocomplete,
    Bool,
    Chip,
    Switch,
    Color,
    Content,
    DatePicker,
    Enum,
    EnumList,
    DynamicSelect,
    DynamicEnumList,
    Select,
    File,
    Hidden,
    Number,
    Password,
    SegmentedControl,
    Slider,
    Rating,
    Str,
    Time,
    // Calendar,
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { Form, useFormContext: useForm, Inputs }
}

const useFormContext = <Spec extends FormSchema>() => {
  const ctx = React.useContext(MyContext)
  invariant(ctx, 'use FormProvider')
  return ctx as FormContext<Spec>
}

type Named<T, Name = string> = T & Readonly<{ name: Name }>

export const Str = <Spec extends FormSchema>(props: Named<TextInputProps>) => {
  const { form, errMsg, spec } = useFormContext<Spec>()

  return (
    <TextInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Content = (props: Named<TextareaProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <Textarea
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Password = (props: Named<PasswordInputProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <PasswordInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Number = (props: Named<NumberInputProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <NumberInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Bool = (props: Named<CheckboxProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <Checkbox
      label="Remember me"
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Rating = (props: Named<RatingProps>) => {
  const { form } = useFormContext()
  return (
    <MantineRating
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg(props.name)}
    />
  )
}

export const Enum = (props: Named<RadioGroupProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <Radio.Group
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    >
      {props.children}
    </Radio.Group>
  )
}

export const EnumList = (props: Named<MultiSelectProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <MultiSelect
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const DynamicEnumList = (props: Named<MultiSelectProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <MultiSelect
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}
export const Select = (props: Named<SelectProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <MantineSelect
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const DynamicSelect = (props: Named<SelectProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <MantineSelect
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Switch = (props: Named<SwitchProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <MantineSwitch
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Chip = (props: Named<ChipProps>) => {
  const { form } = useFormContext()

  return (
    <MantineChip
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg(props.name)}
    />
  )
}

// export const Calendar = <Multiple extends boolean>(
//   props: Named<CalendarProps<Multiple>>,
// ) => {
//   const {form, errMsg} = useFormContext()

//   return <MantineCalendar {...props} {...form.getInputProps(props.name)} error={errMsg(props.name)}/>
// }

export const SegmentedControl = (props: Named<SegmentedControlProps>) => {
  const { form } = useFormContext()

  return (
    <MantineSegmentedControl
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg(props.name)}
    />
  )
}

export const Slider = (props: Named<SliderProps>) => {
  const { form } = useFormContext()

  return (
    <MantineSlider
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg(props.name)}
    />
  )
}

export const File = (props: Named<FileInputProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <FileInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Color = (props: Named<ColorInputProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <ColorInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const DatePicker = (props: Named<DatePickerProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <MantineDatePicker
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Autocomplete = (props: Named<AutocompleteProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <MantineAutocomplete
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Time = (props: Named<TimeInputProps>) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <TimeInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export type HiddenProps = Omit<InputProps, 'type'>

export const Hidden = (props: Named<HiddenProps>) => {
  const { form } = useFormContext()

  return <Input {...props} type="hidden" {...form.getInputProps(props.name)} />
}

export type ActionProps = Omit<HiddenProps, 'value'> &
  Readonly<{ action: string }>

export const Action = ({ action, ...props }: ActionProps) => {
  return <Input {...props} type="hidden" name="_action" value={action} />
}
type EnumKeys<Spec extends FormSchema> = ConditionalKeys<
  GetRawShape<Spec>,
  z.ZodEnum<any> | z.ZodNativeEnum<any>
>
type EnumArrayKeys<Spec extends FormSchema> = ConditionalKeys<
  GetRawShape<Spec>,
  z.ZodArray<z.ZodString>
>
export type Inputs<Spec extends FormSchema> = {
  Str: (
    props: Named<TextInputProps, ConditionalKeys<GetRawShape<Spec>, ZodString>>,
  ) => JSX.Element
  Content: (
    props: Named<TextareaProps, ConditionalKeys<GetRawShape<Spec>, ZodString>>,
  ) => JSX.Element
  Password: (
    props: Named<
      PasswordInputProps,
      ConditionalKeys<GetRawShape<Spec>, ZodString>
    >,
  ) => JSX.Element
  Number: (
    props: Named<
      NumberInputProps,
      ConditionalKeys<GetRawShape<Spec>, ZodNumber>
    >,
  ) => JSX.Element
  Bool: (
    props: Named<CheckboxProps, ConditionalKeys<GetRawShape<Spec>, ZodBoolean>>,
  ) => JSX.Element
  Rating: (
    props: Named<RatingProps, ConditionalKeys<GetRawShape<Spec>, ZodNumber>>,
  ) => JSX.Element
  Enum: (
    props: Named<RadioGroupProps, EnumKeys<Spec>> & {
      values?: readonly string[]
    },
  ) => JSX.Element
  DynamicEnumList: (
    props: Named<
      MultiSelectProps,
      ConditionalKeys<
        GetRawShape<Spec>,
        z.ZodArray<z.ZodString> | z.ZodArray<z.ZodNumber>
      >
    >,
  ) => JSX.Element
  Select: (props: Named<SelectProps, EnumKeys<Spec>>) => JSX.Element
  DynamicSelect: (
    props: Named<
      SelectProps,
      ConditionalKeys<GetRawShape<Spec>, ZodString | ZodNumber>
    >,
  ) => JSX.Element
  EnumList: (props: Named<MultiSelectProps, EnumArrayKeys<Spec>>) => JSX.Element

  Switch: (
    props: Named<SwitchProps, ConditionalKeys<GetRawShape<Spec>, ZodBoolean>>,
  ) => JSX.Element
  Chip: (
    props: Named<ChipProps, ConditionalKeys<GetRawShape<Spec>, ZodBoolean>>,
  ) => JSX.Element
  Slider: (
    props: Named<SliderProps, ConditionalKeys<GetRawShape<Spec>, ZodNumber>>,
  ) => JSX.Element
  File: (
    props: Named<FileInputProps, ConditionalKeys<z.infer<Spec>, File>>,
  ) => JSX.Element
  Color: (
    props: Named<
      ColorInputProps,
      ConditionalKeys<GetRawShape<Spec>, ZodString>
    >,
  ) => JSX.Element
  DatePicker: (
    props: Named<DatePickerProps, ConditionalKeys<GetRawShape<Spec>, ZodDate>>,
  ) => JSX.Element
  Autocomplete: (
    props: Named<
      AutocompleteProps,
      ConditionalKeys<GetRawShape<Spec>, ZodString>
    >,
  ) => JSX.Element
  Time: (
    props: Named<
      TimeInputProps,
      ConditionalKeys<GetRawShape<Spec>, [ZodDate, ZodDate]>
    >,
  ) => JSX.Element
  SegmentedControl: (
    props: Named<
      SegmentedControlProps,
      ConditionalKeys<GetRawShape<Spec>, z.ZodEnum<any> | z.ZodNativeEnum<any>>
    >,
  ) => JSX.Element
  Action: (props: ActionProps) => JSX.Element
  Hidden: (props: Named<HiddenProps>) => JSX.Element
  // Calendar: <Multiple extends boolean = false>(
  //   props: Named<
  //     CalendarProps<Multiple>,
  //     ConditionalKeys<GetRawShape<Spec>, Date[] | Date>
  //   >,
  // ) => JSX.Element
>>>>>>> Stashed changes
}
