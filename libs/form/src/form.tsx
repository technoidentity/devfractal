/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete as MantineAutocomplete,
  AutocompleteProps,
  Checkbox,
  CheckboxProps,
  Chip as MantineChip,
  ChipProps,
  ColorInput,
  ColorInputProps,
  FileInput,
  FileInputProps,
  MultiSelect,
  MultiSelectProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Radio,
  RadioGroupProps,
  Rating as MantineRating,
  RatingProps,
  SegmentedControl as MantineSegmentedControl,
  SegmentedControlProps,
  Select as MantineSelect,
  SelectProps,
  Slider as MantineSlider,
  SliderProps,
  Switch as MantineSwitch,
  SwitchProps,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from '@mantine/core'
import {
  // Calendar as MantineCalendar,
  // CalendarProps,
  DatePicker as MantineDatePicker,
  DatePickerProps,
  TimeInput,
  TimeInputProps,
} from '@mantine/dates'
import {
  createFormContext,
  useForm,
  UseFormReturnType,
  zodResolver,
} from '@mantine/form'
import { FormSchema, GetRawShape } from '@srtp/validator'
import { capitalize } from 'lodash'
import React from 'react'
import invariant from 'tiny-invariant'
import type { ConditionalKeys } from 'type-fest'
import { z, ZodArray, ZodBoolean, ZodDate, ZodNumber, ZodString } from 'zod'

// const Spec = z.object({
//   name: z.string(),
//   salary: z.number(),
//   choice: z.enum(['yes', 'no']),
// })

type FormContext<Spec extends FormSchema> = [
  UseFormReturnType<z.TypeOf<Spec>, (values: z.TypeOf<Spec>) => z.TypeOf<Spec>>,
  () => UseFormReturnType<
    z.TypeOf<Spec>,
    (values: z.TypeOf<Spec>) => z.TypeOf<Spec>
  >,
]

const MyContext = React.createContext<FormContext<any> | undefined>(undefined)

const useFormContext = () => {
  const ctx = React.useContext(MyContext)
  invariant(ctx, 'use FormProvider')
  return ctx
}

type Named<T, Name = string> = T & Readonly<{ name: Name }>

export const Str = (props: Named<TextInputProps>) => {
  const [form] = useFormContext()

  return <TextInput {...props} {...form.getInputProps(props.name)} />
}

export const Content = (props: Named<TextareaProps>) => {
  const [form] = useFormContext()

  return <Textarea {...props} {...form.getInputProps(props.name)} />
}

export const Password = (props: Named<PasswordInputProps>) => {
  const [form] = useFormContext()

  return <PasswordInput {...props} {...form.getInputProps(props.name)} />
}

export const Number = (props: Named<NumberInputProps>) => {
  const [form] = useFormContext()

  return (
    <NumberInput
      {...props}
      {...form.getInputProps(props.name)}
      label={props.label || capitalize(props.name)}
    />
  )
}

export const Bool = (props: Named<CheckboxProps>) => {
  const [form] = useFormContext()

  return <Checkbox label="Remember me" {...form.getInputProps(props.name)} />
}

export const Rating = (props: Named<RatingProps>) => {
  const [form] = useFormContext()
  return <MantineRating {...props} {...form.getInputProps(props.name)} />
}

export const Enum = (
  props: Named<RadioGroupProps> & { values?: readonly string[] },
) => {
  const [form] = useFormContext()

  return (
    <Radio.Group {...props} {...form.getInputProps(props.name)}>
      {props.values ? (
        props.values.map((v: string) => (
          <Radio key={v} value={v} label={capitalize(v)} />
        ))
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
  const [form] = useFormContext()

  return <MultiSelect {...props} {...form.getInputProps(props.name)} />
}

export const Select = (props: Named<SelectProps>) => {
  const [form] = useFormContext()

  return <MantineSelect {...props} {...form.getInputProps(props.name)} />
}

export const Switch = (props: Named<SwitchProps>) => {
  const [form] = useFormContext()

  return <MantineSwitch {...props} {...form.getInputProps(props.name)} />
}

export const Chip = (props: Named<ChipProps>) => {
  const [form] = useFormContext()

  return (
    <MantineChip {...props} {...form.getInputProps(props.name)}></MantineChip>
  )
}

// export const Calendar = <Multiple extends ZodBoolean>(
//   props: Named<CalendarProps<Multiple>>,
// ) => {
//   const [form] = useFormContext()

//   return <MantineCalendar {...props} {...form.getInputProps(props.name)} />
// }

export const SegmentedControl = (props: Named<SegmentedControlProps>) => {
  const [form] = useFormContext()

  return (
    <MantineSegmentedControl {...props} {...form.getInputProps(props.name)} />
  )
}

export const Slider = (props: Named<SliderProps>) => {
  const [form] = useFormContext()

  return <MantineSlider {...props} {...form.getInputProps(props.name)} />
}

export const File = (props: Named<FileInputProps>) => {
  const [form] = useFormContext()

  return <FileInput {...props} {...form.getInputProps(props.name)} />
}

export const Color = (props: Named<ColorInputProps>) => {
  const [form] = useFormContext()

  return <ColorInput {...props} {...form.getInputProps(props.name)} />
}

export const DatePicker = (props: Named<DatePickerProps>) => {
  const [form] = useFormContext()

  return <MantineDatePicker {...props} {...form.getInputProps(props.name)} />
}

export const Autocomplete = (props: Named<AutocompleteProps>) => {
  const [form] = useFormContext()

  return <MantineAutocomplete {...props} {...form.getInputProps(props.name)} />
}

export const Time = (props: Named<TimeInputProps>) => {
  const [form] = useFormContext()

  return <TimeInput {...props} {...form.getInputProps(props.name)} />
}

type EnumKeys<Spec extends FormSchema> = ConditionalKeys<
  GetRawShape<Spec>,
  z.ZodEnum<any> | z.ZodNativeEnum<any>
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
  DynamicEnumList: (
    props: Named<
      MultiSelectProps,
      ConditionalKeys<GetRawShape<Spec>, ZodArray<ZodString>>
    >,
  ) => JSX.Element
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
    props: Named<FileInputProps, ConditionalKeys<GetRawShape<Spec>, File>>,
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

  // Calendar: <Multiple extends ZodBoolean = false>(
  //   props: Named<
  //     CalendarProps<Multiple>,
  //     ConditionalKeys<GetRawShape<Spec>, Date[] | Date>
  //   >,
  // ) => JSX.Element
}

export function createForm<Spec extends FormSchema>(
  spec: Spec,
  initial?: z.infer<Spec>,
) {
  const [Provider, useContext] = createFormContext<z.infer<Spec>>()

  const Form = ({
    onSubmit,
    children,
    initialValues,
  }: {
    onSubmit: (values: z.infer<Spec>) => void
    children: React.ReactNode
    initialValues?: z.infer<Spec>
  }) => {
    const form = useForm({
      initialValues: initialValues || initial,
      validate: zodResolver(spec),
    })

    return (
      <Provider form={form}>
        <MyContext.Provider value={[form, useContext]}>
          <form onSubmit={form.onSubmit(onSubmit)}>{children}</form>
        </MyContext.Provider>
      </Provider>
    )
  }

  const Inputs: Inputs<Spec> = {
    Autocomplete,
    Bool,
    Chip,
    Color,
    Content,
    DatePicker,
    Enum,
    EnumList,
    File,

    Number,
    Password,
    Rating,
    SegmentedControl,
    Select,
    Slider,
    Str,
    Switch,
    Time,
    // Calendar,
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { Form, useFormContext: useForm, Inputs }
}
