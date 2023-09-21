/* eslint-disable @typescript-eslint/naming-convention */
import { boolean, email, string } from '@srtp/core'
import {
  Button,
  CheckBoxField,
  Control,
  DatePickerField,
  Field,
  FormDescription,
  FormLabel,
  InputField,
  RadioField,
  SelectField,
  Switch,
  SwitchField,
  TextareaField,
  ThemeSelector,
  createClientForm,
} from '@srtp/ui'
import { z } from 'zod'

const Signin = z.object({
  username: string(),
  password: string(),
  mobileSettings: boolean(),
  email: email(),
  marketingEmails: z.boolean().default(false).optional(),
  securityEmails: z.boolean(),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  kind: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
})

const initialValues = {
  username: '',
  password: '',
  mobileSettings: false,
  email: '',
  marketingEmails: false,
  securityEmails: true,
  bio: '',
  dob: new Date(),
  kind: 'all' as any,
}

const [Form] = createClientForm(Signin, initialValues)

export const RadioExample = () => {
  return (
    <RadioField defaultValue="all" name="notify" label="Notify me about...">
      <RadioField.Item value="all" label="All new messages" />

      <RadioField.Item value="mentions" label="Direct messages and mentions" />

      <RadioField.Item value="none" label="Nothing" />
    </RadioField>
  )
}

export function DatePickerExample() {
  return (
    <DatePickerField
      className="my-2"
      name="dob"
      label="Date of birth"
      disabled={date => date > new Date() || date < new Date('1900-01-01')}
      description="Your date of birth is used to calculate your age"
    />
  )
}
export const InputExample = () => (
  <InputField
    name="username"
    label="Username"
    placeholder="Alex Stepanov"
    description="This is your public display name."
  />
)

export const PasswordExample = () => (
  <InputField name="password" label="Password" type="password" />
)

export const CheckboxExample = () => {
  return (
    <CheckBoxField
      className="border rounded-md"
      name="mobileSettings"
      label="Use different settings for my mobile devices"
      description={
        <div>
          You can manage your mobile notifications in the{' '}
          <a href="/examples/forms">mobile settings</a> page.
        </div>
      }
    />
  )
}

export const SwitchExample = () => (
  <SwitchField
    className="rounded-lg border my-2"
    name="marketingEmails"
    label="Marketing emails"
    description="Receive emails about new products, features, and more."
  />
)

export const SelectExample = () => {
  return (
    <SelectField
      name="email"
      label="Email"
      cnTrigger="w-full"
      className="my-2"
      placeholder="Select a verified email to display"
      description={
        <div>
          You can manage email addresses in your
          <a href="/examples/forms">email settings</a>.
        </div>
      }
    >
      <SelectField.Item value="m@example.com">m@example.com</SelectField.Item>
      <SelectField.Item value="m@google.com">m@google.com</SelectField.Item>
      <SelectField.Item value="m@support.com">m@support.com</SelectField.Item>
    </SelectField>
  )
}

export const TextareaExample = () => (
  <TextareaField
    name="bio"
    label="Bio"
    placeholder="Tell us a little bit about yourself"
    className="my-2"
    cnField="resize-none"
    description={
      <div>
        You can <span>@mention</span> other users and organizations.
      </div>
    }
  />
)

export const FormExample = () => {
  return (
    <div className="container">
      <ThemeSelector className="my-2" />

      {/* eslint-disable-next-line no-console */}
      <Form onSubmit={console.log}>
        <InputExample />
        <PasswordExample />
        <CheckboxExample />
        <TextareaExample />
        <SwitchExample />
        <Field
          name="securityEmails"
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <div className="space-y-0.5">
            <FormLabel>Security emails</FormLabel>
            <FormDescription>
              Receive emails about your account security.
            </FormDescription>
          </div>
          <Control>
            <Switch disabled aria-readonly />
          </Control>
        </Field>

        <SelectExample />
        <DatePickerExample />
        <RadioExample />

        <Button className="my-2 mr-2" type="submit">
          Submit
        </Button>

        <Button className="mt-2" type="submit">
          Reset
        </Button>
      </Form>
    </div>
  )
}
