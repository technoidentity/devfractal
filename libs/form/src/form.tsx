import {
  Checkbox,
  CheckboxProps,
  MultiSelect,
  MultiSelectProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Radio,
  RadioGroupProps,
  Rating,
  RatingProps,
  Select,
  SelectProps,
  Switch,
  SwitchProps,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from '@mantine/core'
import {
  createFormContext,
  useForm,
  UseFormReturnType,
  zodResolver,
} from '@mantine/form'
import { capitalize } from 'lodash'
import React from 'react'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import type { ConditionalKeys } from 'type-fest'

type ZodSchema = z.ZodEffects<z.ZodObject<z.ZodRawShape>>

type FormContext<Spec extends ZodSchema> = [
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

export const Num = (props: Named<NumberInputProps>) => {
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

export const StarRating = (props: Named<RatingProps>) => {
  const [form] = useFormContext()
  return <Rating {...props} {...form.getInputProps(props.name)} />
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

export const EnumSelect = (props: Named<SelectProps>) => {
  const [form] = useFormContext()

  return <Select {...props} {...form.getInputProps(props.name)} />
}

export const BoolSwitch = (props: Named<SwitchProps>) => {
  const [form] = useFormContext()

  return <Switch {...props} {...form.getInputProps(props.name)} />
}

type EnumKeys<Spec extends ZodSchema> = ConditionalKeys<
  Spec['_def']['schema']['shape'],
  z.ZodEnum<any>
>
type EnumArrayKeys<Spec extends ZodSchema> = ConditionalKeys<
  Spec['_def']['schema']['shape'],
  z.ZodArray<z.ZodString, 'many'>
>
type Inputs<Spec extends ZodSchema> = {
  Str: (
    props: Named<TextInputProps, ConditionalKeys<z.infer<Spec>, string>>,
  ) => JSX.Element
  Content: (
    props: Named<TextareaProps, ConditionalKeys<z.infer<Spec>, string>>,
  ) => JSX.Element
  Password: (
    props: Named<PasswordInputProps, ConditionalKeys<z.infer<Spec>, string>>,
  ) => JSX.Element
  Num: (
    props: Named<NumberInputProps, ConditionalKeys<z.infer<Spec>, number>>,
  ) => JSX.Element
  Bool: (
    props: Named<CheckboxProps, ConditionalKeys<z.infer<Spec>, boolean>>,
  ) => JSX.Element
  StarRating: (
    props: Named<RatingProps, ConditionalKeys<z.infer<Spec>, number>>,
  ) => JSX.Element
  Enum: (
    props: Named<RadioGroupProps, EnumKeys<Spec>> & {
      values?: readonly string[]
    },
  ) => JSX.Element
  EnumList: (props: Named<MultiSelectProps, EnumArrayKeys<Spec>>) => JSX.Element
  EnumSelect: (props: Named<SelectProps, EnumKeys<Spec>>) => JSX.Element
  BoolSwitch: (
    props: Named<SwitchProps, ConditionalKeys<z.infer<Spec>, boolean>>,
  ) => JSX.Element
}

export function createForm<Spec extends ZodSchema>(
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
    Str,
    Content,
    Bool,
    BoolSwitch,
    Enum,
    EnumList,
    EnumSelect,
    Num,
    Password,
    StarRating,
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { Form, useFormContext: useForm, Inputs }
}
