import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  InputLabel,
  TextFieldProps,
} from '@material-ui/core'
import {
  ErrorMessage,
  ErrorMessageProps,
  Form,
  Formik,
  FormikConsumer,
  FormikHelpers,
} from 'formik'
import React from 'react'
import { DebugField, required } from 'srtp-core'
import { camelCaseToPhrase, jsonStringify, timeout } from 'srtp-utils'
import {
  date,
  DateSchema,
  // date,
  // DateSchema,
  number,
  NumberSchema,
  ObjectSchema,
  Schema,
  string,
  StringSchema,
} from 'yup'
import {
  CheckboxControlField,
  CheckboxControlFieldProps,
  DateField,
  DateFieldProps,
  InputField,
  InputFieldProps,
  RadioGroupField,
  RadioGroupFieldProps,
  SelectField,
  SelectFieldProps,
} from './fields'

function consoleSubmit<Values extends object>(
  milliseconds: number = 0,
): (values: Values, formikArgs: FormikHelpers<Values>) => Promise<void> {
  return async (values, { setSubmitting }) =>
    timeout(milliseconds, () => {
      console.log(jsonStringify(values))
      setSubmitting(false)
    })
}

const FormikError: React.FC<FormHelperTextProps> = props => (
  <FormHelperText {...props} />
)

export const ErrorField: React.FC<ErrorMessageProps> = props => (
  <ErrorMessage {...props} component={FormikError} />
)

interface Named<Values extends object> {
  readonly name: Extract<keyof Values, string>
}

// @TODO: value must by typed!
interface SimpleInputProps<Values extends object, S extends Schema<any>>
  extends Omit<InputFieldProps, 'name' | 'size'>,
    Named<Values> {
  readonly schema: S
  readonly label?: string
  readonly validations?: ReadonlyArray<(schema: S) => S>
}

interface GenericInputProps<Values extends object, S extends Schema<any>>
  extends Omit<SimpleInputProps<Values, S>, 'type' | 'schema'> {}

function validator<S extends Schema<any>>(
  initialSchema: S,
  validations?: ReadonlyArray<(schema: S) => S>,
): <V>(value: V) => V | undefined {
  return value => {
    if (validations === undefined) {
      return undefined
    }

    let schema: S = initialSchema
    validations.forEach(v => (schema = v(schema)))

    try {
      schema.validateSync(value)
      return undefined
    } catch (err) {
      return err.message
    }
  }
}

function SimpleInput<Values extends object, S extends Schema<any>>(
  args: SimpleInputProps<Values, S>,
): JSX.Element {
  const { schema, label, validations, ...props } = args

  console.log(args.required)
  const lv: typeof validations =
    args.required === true
      ? [required() as (schema: S) => S, ...(validations || [])]
      : validations

  const id: string = props.id || props.name

  const lb: string = label || camelCaseToPhrase(props.name)

  const labelEl: string | JSX.Element = args.required ? (
    <>
      {lb}
      {required && '\u00a0*'}
    </>
  ) : (
    lb
  )

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{labelEl}</InputLabel>
      <InputField
        id={id}
        {...props}
        validate={validator(schema, lv)}
        aria-describedby={`${id}.help}`}
      />
      <ErrorField name={props.name} />
    </FormControl>
  )
}

interface SimpleDateProps<Values extends object>
  extends Omit<DateFieldProps, 'name' | 'size'>,
    Named<Values> {
  readonly validations?: ReadonlyArray<(schema: DateSchema) => DateSchema>
  readonly label?: string
}

function SimpleDate<Values extends object>(
  args: SimpleDateProps<Values>,
): JSX.Element {
  const { label, validations, ...props } = args
  const id: string = props.id || props.name

  return (
    <FormControl>
      <FormLabel htmlFor={id}>
        {label || camelCaseToPhrase(props.name)}
      </FormLabel>
      <DateField id={id} {...props} validate={validator(date(), validations)} />
      <ErrorField name={props.name} />
    </FormControl>
  )
}

export interface SimpleCheckboxProps<Values extends object>
  extends Omit<CheckboxControlFieldProps, 'name' | 'size' | 'label'>,
    Named<Values> {
  readonly label?: CheckboxControlFieldProps['label']
  readonly noLabel?: boolean
}

export interface SimpleRadioGroupProps<Values extends object>
  extends Omit<RadioGroupFieldProps, 'name' | 'size'>,
    Named<Values> {
  readonly label?: string
}

// export interface SimpleMultiCheckboxProps<Values extends object>
//   extends Omit<ElProps, 'name'>,
//     Named<Values>,
//     FieldProps {
//   readonly label?: string
// }

// export interface CheckboxItemProps
//   extends Omit<CheckboxFieldProps, 'name' | 'size'> {}

export interface SimpleSelectProps<Values extends object>
  extends Omit<SelectFieldProps, 'name' | 'size' | 'multiple'>,
    Named<Values> {
  readonly label?: string
}

// @TODO: validations must be array validations?
export interface SimpleMultiSelectProps<Values extends object>
  extends Omit<SelectFieldProps, 'name' | 'size' | 'value' | 'multiple'>,
    Named<Values> {
  readonly value?: readonly string[]
  readonly label?: string
}

export interface SimpleFormButtonsProps {
  readonly submit?: boolean | string
  readonly reset?: boolean | string
}

const SimpleFormButtons: React.FC<SimpleFormButtonsProps> = ({
  submit = 'Submit',
  reset = 'Reset',
}) => (
  <FormikConsumer>
    {({ dirty, isSubmitting, handleReset }) => (
      <ButtonGroup>
        {submit !== false && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {submit}
          </Button>
        )}
        {reset !== false && (
          <Button
            disabled={!dirty || isSubmitting}
            variant="contained"
            color="secondary"
            type="reset"
            onClick={handleReset}
          >
            {reset}
          </Button>
        )}
      </ButtonGroup>
    )}
  </FormikConsumer>
)

export interface SimpleFormProps<Values> {
  readonly initialValues: Values
  readonly validationSchema?: ObjectSchema<Partial<Values>>
  onSubmit?(values: Values, actions: FormikHelpers<Values>): void
}

export interface SimpleTextAreaProps<Values extends object>
  extends Omit<GenericInputProps<Values, StringSchema>, 'multiline'> {
  readonly label?: string
  readonly rows: TextFieldProps['rows']
  readonly validations?: ReadonlyArray<(schema: StringSchema) => StringSchema>
}

export interface TypedForm<Values extends object> {
  readonly Text: React.FC<GenericInputProps<Values, StringSchema>>
  readonly TextArea: React.FC<SimpleTextAreaProps<Values>>
  readonly Date: React.FC<SimpleDateProps<Values>>
  readonly Number: React.FC<GenericInputProps<Values, NumberSchema>>
  readonly Password: React.FC<GenericInputProps<Values, StringSchema>>
  readonly Email: React.FC<GenericInputProps<Values, StringSchema>>
  readonly Checkbox: React.FC<SimpleCheckboxProps<Values>>
  readonly Telephone: React.FC<GenericInputProps<Values, NumberSchema>>
  readonly Url: React.FC<GenericInputProps<Values, StringSchema>>
  readonly RadioGroup: React.FC<SimpleRadioGroupProps<Values>>

  readonly Select: React.FC<SimpleSelectProps<Values>>
  readonly MultiSelect: React.FC<SimpleMultiSelectProps<Values>>
  // readonly MultiCheckbox: React.FC<SimpleMultiCheckboxProps<Values>>
  // readonly CheckboxItem: React.FC<CheckboxItemProps>
  readonly Form: React.FC<SimpleFormProps<Values>>
  readonly FormButtons: React.FC<SimpleFormButtonsProps>
  readonly Debug: typeof DebugField
}

interface MultiCheckContext {
  readonly name: string
}

const MultiCheckContext: React.Context<MultiCheckContext> = React.createContext(
  undefined as any,
)

function typedFormInternal<Values extends object>(): TypedForm<Values> {
  const Text: React.FC<GenericInputProps<Values, StringSchema>> = props => (
    <SimpleInput {...props} type="text" schema={string()} />
  )

  return {
    Text,
    TextArea: props => <Text multiline={true} {...props} />,
    Date: props => <SimpleDate {...props} />,
    Number: props => <SimpleInput schema={number()} {...props} type="number" />,

    Password: props => (
      <SimpleInput schema={string()} {...props} type="password" />
    ),

    Email: props => <SimpleInput {...props} type="email" schema={string()} />,

    // @TODO: I think Telephone shouldn't be no?
    Telephone: props => <SimpleInput schema={number()} {...props} type="tel" />,

    Url: props => <SimpleInput schema={string()} {...props} type="url" />,

    Checkbox: ({ children, noLabel, ...props }) => {
      const id: string = props.id || props.name

      return (
        <FormControl>
          <CheckboxControlField
            id={id}
            label={
              children || (!noLabel && ` ${camelCaseToPhrase(props.name)}`)
            }
            {...props}
          />
          {/* <ErrorField name={props.name} /> */}
        </FormControl>
      )
    },

    RadioGroup: ({ children, label, ...props }) => {
      const id: string = props.id || props.name

      return (
        <FormControl>
          <FormLabel htmlFor={id}>
            {label || camelCaseToPhrase(props.name)}
          </FormLabel>
          <RadioGroupField {...props}>{children}</RadioGroupField>
          {/* <ErrorField name={props.name} /> */}
        </FormControl>
      )
    },

    Select: ({ label, ...props }) => {
      const id: string = props.id || props.name

      return (
        <FormControl>
          <InputLabel htmlFor={id}>
            {label || camelCaseToPhrase(props.name)}
          </InputLabel>
          <SelectField id={id} {...props} />
          <ErrorField name={props.name} />
        </FormControl>
      )
    },

    MultiSelect: ({ label, ...props }) => {
      const id: string = props.id || props.name

      return (
        <FormControl>
          <InputLabel htmlFor={id}>
            {label || camelCaseToPhrase(props.name)}
          </InputLabel>
          <SelectField id={id} {...props} multiple={true} />
          <ErrorField name={props.name} />
        </FormControl>
      )
    },

    // MultiCheckbox: ({ label, children, ...rest }) => {
    //   const [fieldProps, props] = splitFieldProps(rest)
    //   const id: string = props.id || props.name
    //   return (
    //     <Field {...fieldProps}>
    //       <Label htmlFor={id}>{label || camelCaseToPhrase(props.name)}</Label>
    //       <MultiCheckContext.Provider value={{ name: props.name }}>
    //         {children}
    //       </MultiCheckContext.Provider>
    //       <ErrorField name={props.name} />
    //     </Field>
    //   )
    // },

    // CheckboxItem: props => {
    //   const id: string = props.id || `${props.value}`
    //   const { name } = React.useContext(MultiCheckContext)
    //   return <CheckboxField name={name} id={id} {...props} />
    // },

    Form: ({
      initialValues,
      validationSchema,
      onSubmit = consoleSubmit<Values>(0),
      children,
    }) => (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>{children}</Form>
      </Formik>
    ),
    FormButtons: SimpleFormButtons,
    Debug: DebugField,
  }
}

// tslint:disable-next-line: no-let
let form: TypedForm<any> | undefined

export function typedForm<Values extends object>(): TypedForm<Values> {
  if (form) {
    return form
  }
  form = typedFormInternal()
  return form
}

// tslint:disable-next-line:typedef
export const Simple = typedForm<any>()
