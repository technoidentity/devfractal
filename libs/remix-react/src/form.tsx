/* eslint-disable @typescript-eslint/naming-convention */
import type {
  AutocompleteProps,
  CheckboxProps,
  ChipProps,
  ColorInputProps,
  FileInputProps,
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
import type { UseFormReturnType } from '@mantine/form'
import { createFormContext, useForm, zodResolver } from '@mantine/form'
import type { UseFormInput } from '@mantine/form/lib/types'

import type { FormProps as RemixFormProps } from '@remix-run/react'
import { Form as RemixForm, useNavigation, useSubmit } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import type { FormSchema, GetRawShape } from '@srtp/validator'
import React from 'react'
import invariant from 'tiny-invariant'
import type { ConditionalKeys } from 'type-fest'
import type { z, ZodBoolean, ZodDate, ZodNumber, ZodString } from 'zod'
import { getFieldError } from './utils'

export const useSuccessfulSubmit = () => {
  const { serverErrors } = useFormContext()
  const [success, set] = React.useState(false)
  const navigate = useNavigation()

  React.useEffect(() => {
    if (
      navigate.state === 'loading' &&
      Object.keys(serverErrors?.fieldErrors || {}).length === 0
    ) {
      set(true)
    }
  }, [serverErrors, navigate.state])

  return success
}

type FormContext<Spec extends FormSchema> = {
  form: UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  useContext: () => UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  serverErrors: Errors<z.infer<Spec>>
  errMsg: (key: keyof z.infer<Spec>) => string | undefined
}

const MyContext = React.createContext<FormContext<any> | undefined>(undefined)

type FormProps<Spec extends FormSchema> = Readonly<{
  onSubmit?: (values: z.infer<Spec>) => void
  children: React.ReactNode
  serverErrors: Errors<z.infer<Spec>>
}> &
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

function MyRemixForm<Spec extends FormSchema>({
  form,
  children,
  onSubmit,
  ...props
}: MyRemixFormProps<Spec>) {
  const submit = useSubmit()
  const success = useSuccessfulSubmit()

  return (
    <RemixForm
      {...props}
      onSubmit={form.onSubmit((values, event) => {
        submit(event.currentTarget, { replace: true })
        if (success) {
          onSubmit?.(values)
        }
      })}
    >
      {children}
    </RemixForm>
  )
}
// T extends object? FormSchema<T>?
export function createForm<Spec extends FormSchema>(
  spec: Spec,
  initial?: z.infer<Spec>,
) {
  type T = z.infer<Spec>
  const [Provider, useContext] = createFormContext<T>()

  const Form = ({
    onSubmit,
    children,
    serverErrors,
    ...props
  }: FormProps<Spec>) => {
    const form = useForm({
      initialValues: initial,
      validateInputOnBlur: true,
      ...props,
      validate: zodResolver(spec),
    })

    // @TODO: use form.setErrors or initialErrors instead?
    // Unfortunately globally available MyContext can't be typesafe. So any
    const errMsg = getFieldError(serverErrors, form) as any

    const value = { form, useContext, serverErrors, errMsg } as const

    return (
      <Provider form={form}>
        <MyContext.Provider value={value}>
          <MyRemixForm {...props} onSubmit={onSubmit} form={form}>
            {children}
          </MyRemixForm>
        </MyContext.Provider>
      </Provider>
    )
  }

  const Inputs: Inputs<Spec> = {
    Autocomplete,
    Bool,
    Chip,
    Switch,
    Color,
    Content,
    DatePicker,
    Enum,
    EnumList,
    Select,
    File,
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

const useFormContext = () => {
  const ctx = React.useContext(MyContext)
  invariant(ctx, 'use FormProvider')
  return ctx
}

type Named<T, Name = string> = T & Readonly<{ name: Name }>

export const Str = (props: Named<TextInputProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <TextInput
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Content = (props: Named<TextareaProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <Textarea
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Password = (props: Named<PasswordInputProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <PasswordInput
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Number = (props: Named<NumberInputProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <NumberInput
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

export const Enum = (
  props: Named<RadioGroupProps> & { values?: readonly string[] },
) => {
  const { form, errMsg } = useFormContext()

  return (
    <Radio.Group
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    >
      {props.values ? (
        props.values.map((v: string) => <Radio key={v} value={v} />)
      ) : (
        <>
          <Radio value="generalPublic" label="General Public" />
          <Radio value="seniorCitizen" label="Senior Citizen" />
          <Radio value="employee" label="Employee" />
        </>
      )}
    </Radio.Group>
  )
}

export const EnumList = (props: Named<MultiSelectProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <MultiSelect
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Select = (props: Named<SelectProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <MantineSelect
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
  const { form, errMsg } = useFormContext()

  return (
    <FileInput
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Color = (props: Named<ColorInputProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <ColorInput
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const DatePicker = (props: Named<DatePickerProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <MantineDatePicker
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Autocomplete = (props: Named<AutocompleteProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <MantineAutocomplete
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

export const Time = (props: Named<TimeInputProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <TimeInput
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg(props.name)}
    />
  )
}

type EnumKeys<Spec extends FormSchema> = ConditionalKeys<
  GetRawShape<Spec>,
  z.ZodEnum<any>
>
type EnumArrayKeys<Spec extends FormSchema> = ConditionalKeys<
  GetRawShape<Spec>,
  z.ZodArray<z.ZodString>
>
type Inputs<Spec extends FormSchema> = {
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
  EnumList: (props: Named<MultiSelectProps, EnumArrayKeys<Spec>>) => JSX.Element
  Select: (props: Named<SelectProps, EnumKeys<Spec>>) => JSX.Element
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
      ConditionalKeys<GetRawShape<Spec>, z.ZodEnum<any>>
    >,
  ) => JSX.Element
  // Calendar: <Multiple extends boolean = false>(
  //   props: Named<
  //     CalendarProps<Multiple>,
  //     ConditionalKeys<GetRawShape<Spec>, Date[] | Date>
  //   >,
  // ) => JSX.Element
}
