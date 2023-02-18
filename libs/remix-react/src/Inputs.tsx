import type {
  AutocompleteProps,
  CheckboxProps,
  ChipProps,
  ColorInputProps,
  FileInputProps,
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
  Input,
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
import { DatePicker as MantineDatePicker, TimeInput } from '@mantine/dates'
import type { FormSchema, GetRawShape } from '@srtp/validator'
import type { ConditionalKeys } from 'type-fest'
import type { z, ZodBoolean, ZodDate, ZodNumber, ZodString } from 'zod'
import { ZodOptional } from 'zod'
import { useFormContext } from './FormContext'

type Named<T, Name = string> = T & Readonly<{ name: Name }>

export const Str = <Spec extends FormSchema>(props: Named<TextInputProps>) => {
  const { form, errMsg, spec } = useFormContext<Spec>()

  return (
    <TextInput
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
    />
  )
}

export const Bool = (props: Named<CheckboxProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <Checkbox
      label="Remember me"
      {...form.getInputProps(props.name)}
      error={errMsg?.(props.name)}
    />
  )
}

export const Rating = (props: Named<RatingProps>) => {
  const { form } = useFormContext()
  return (
    <MantineRating
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg?.(props.name)}
    />
  )
}

export const Enum = ({
  children,
  ...props
}: Named<RadioGroupProps> & { values?: readonly string[] }) => {
  const { form, errMsg, spec } = useFormContext()

  return (
    <Radio.Group
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg?.(props.name)}
    >
      {props.values
        ? props.values.map(v => <Radio key={v} value={v} />)
        : children}
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
      error={errMsg?.(props.name)}
    />
  )
}

export const Select = (props: Named<SelectProps>) => {
  const { form, errMsg, spec } = useFormContext()

  const fp = form.getInputProps(props.name)
  const formProps = { ...fp, value: fp.value.toString() }

  return (
    <MantineSelect
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...formProps}
      error={errMsg?.(props.name)}
    />
  )
}

export const Switch = (props: Named<SwitchProps>) => {
  const { form, errMsg } = useFormContext()

  return (
    <MantineSwitch
      {...props}
      {...form.getInputProps(props.name)}
      error={errMsg?.(props.name)}
    />
  )
}

export const Chip = (props: Named<ChipProps>) => {
  const { form } = useFormContext()

  return (
    <MantineChip
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg?.(props.name)}
    />
  )
}

export const SegmentedControl = (props: Named<SegmentedControlProps>) => {
  const { form } = useFormContext()

  return (
    <MantineSegmentedControl
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg?.(props.name)}
    />
  )
}

export const Slider = (props: Named<SliderProps>) => {
  const { form } = useFormContext()

  return (
    <MantineSlider
      {...props}
      {...form.getInputProps(props.name)}
      // @TODO: error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
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
      error={errMsg?.(props.name)}
    />
  )
}

export const DynamicSelect = (props: Named<SelectProps>) => {
  const { form, errMsg, spec } = useFormContext()

  const fp = form.getInputProps(props.name)
  const formProps = { ...fp, value: fp.value.toString() }

  return (
    <MantineSelect
      withAsterisk={!(spec[props.name] instanceof ZodOptional)}
      {...props}
      {...formProps}
      error={errMsg?.(props.name)}
    />
  )
}

export type HiddenProps = InputProps

export const Hidden = (props: Named<HiddenProps>) => {
  const { form } = useFormContext()

  return <Input type="hidden" {...props} {...form.getInputProps(props.name)} />
}

export type ActionProps = Omit<InputProps, 'value'> &
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
export type InputsType<Spec extends FormSchema> = {
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
      ConditionalKeys<GetRawShape<Spec>, z.ZodEnum<any> | z.ZodNativeEnum<any>>
    >,
  ) => JSX.Element
  Action: (props: ActionProps) => JSX.Element
  Hidden: (props: Named<HiddenProps>) => JSX.Element

  DynamicEnumList: (
    props: Named<
      MultiSelectProps,
      ConditionalKeys<
        GetRawShape<Spec>,
        z.ZodArray<z.ZodString> | z.ZodArray<z.ZodNumber>
      >
    >,
  ) => JSX.Element
  DynamicSelect: (
    props: Named<
      SelectProps,
      ConditionalKeys<GetRawShape<Spec>, ZodString | ZodNumber>
    >,
  ) => JSX.Element
  // Calendar: <Multiple extends boolean = false>(
  //   props: Named<
  //     CalendarProps<Multiple>,
  //     ConditionalKeys<GetRawShape<Spec>, Date[] | Date>
  //   >,
  // ) => JSX.Element
}

export const Inputs: InputsType<any> = {
  Action,
  Autocomplete,
  Bool,
  Chip,
  Color,
  Content,
  DatePicker,
  DynamicEnumList,
  DynamicSelect,
  Enum,
  EnumList,
  File,
  Hidden,
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