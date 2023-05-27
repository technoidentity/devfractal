import {
  FormConfig,
  conform,
  Submission,
  Fieldset,
  FieldConfig,
} from '@conform-to/react'
import { useForm, validateConstraint } from '@conform-to/react'
import { KeysOf, type ResolveType } from '@conform-to/dom'
import { parse } from '@conform-to/zod'
import {
  ActionFunctionArgs,
  Form,
  json,
  redirect,
  useActionData,
} from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

interface Login {
  email: string
  password: string
  remember: string
}

async function isAuthenticated(email: string, password: string) {
  return Promise.resolve(
    email === 'conform@example.com' && password === '12345',
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const submission = parse(formData, { schema })

  if (
    !(await isAuthenticated(
      submission.payload.email,
      submission.payload.password,
    ))
  ) {
    return json({
      ...submission,
      // '' denote the root which is treated as form error
      error: { '': 'Invalid credential' },
    })
  }

  return redirect('/')
}

export function useDfForm<
  Output extends Record<string, any>,
  Input extends Record<string, any> = Output,
>(config?: FormConfig<Output, Input>) {
  const lastSubmission = useActionData() as Submission
  return useForm({
    lastSubmission,
    shouldValidate: 'onBlur',
    onValidate(context) {
      return validateConstraint(context)
    },
    ...config,
  })
}

type FormType = ReturnType<typeof useForm>[0]
type FormErrorProps = {
  form: FormType
}

export function FormError({ form }: FormErrorProps) {
  return <div className="form-error">{form.error}</div>
}

type FieldProps<
  Schema extends Record<string, any>,
  Key extends KeysOf<Schema>,
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
> = {
  field: FieldConfig<ResolveType<Schema, Key>>
} & React.ComponentProps<T>

type EmailProps<
  Schema extends Record<string, any>,
  Key extends KeysOf<Schema>,
> = FieldProps<Schema, Key, 'input'>

export function Email<
  Schema extends Record<string, any>,
  Key extends KeysOf<Schema>,
>({ field }: EmailProps<Schema, Key>) {
  return (
    <label>
      <div>Email</div>
      <input
        type="email"
        pattern="[^@]+@[^@]+\.[^@]+"
        {...conform.input(field)}
      />
      {field.error === 'required' ? (
        <div>Field is required</div>
      ) : field.error === 'type' || field.error === 'pattern' ? (
        <div>Field is invalid</div>
      ) : null}
    </label>
  )
}

type PasswordProps<
  Schema extends Record<string, any>,
  Key extends KeysOf<Schema>,
> = FieldProps<Schema, Key, 'input'>

export function Password<
  Schema extends Record<string, any>,
  Key extends KeysOf<Schema>,
>({ field, ...props }: PasswordProps<Schema, Key>) {
  return (
    <label>
      <div>Password</div>
      <input type="password" {...conform.input(field)} {...props} />
      {field.error === 'required' ? <div>Password is required</div> : null}
    </label>
  )
}

export type DfFormProps = React.ComponentProps<typeof Form> & {
  form: ReturnType<typeof useForm>[0]
  children: React.ReactNode
}

export function DfForm({ form, ...props }: DfFormProps) {
  return <Form {...form.props} {...props} />
}

export function Component() {
  const [form, { email, password }] = useDfForm<Login>()

  return (
    <DfForm method="post" form={form}>
      <FormError form={form} />
      <Email field={email} className={email.error ? 'error' : ''} />
      <Password field={password} className={password.error ? 'error' : ''} />
      <label>
        <div>
          <span>Remember me</span>
          <input name="remember" type="checkbox" value="yes" />
        </div>
      </label>
      <hr />
      <button>Login</button>
    </DfForm>
  )
}
