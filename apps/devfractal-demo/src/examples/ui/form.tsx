import { Button } from '@/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  createClientForm,
} from '@/ui/form'
import { SelectItem } from '@/ui/select'
import { Switch } from '@/ui/switch'
import { ThemeSelector } from '@/ui/theme-selector'
import { boolean, email, string } from '@srtp/validator'
import { z } from 'zod'
import {
  CheckBoxField,
  DatePickerField,
  InputField,
  RadioField,
  RadioItemField,
  SelectField,
  SwitchField,
  TextareaField,
} from '@/fields'

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

export function DatePickerExample() {
  return (
    <DatePickerField
      name="dob"
      label="Date of birth"
      disabled={date => date > new Date() || date < new Date('1900-01-01')}
      description="Your date of birth is used to calculate your age"
    />
  )
}

export const RadioExample = () => {
  return (
    <RadioField name="notify" label="Notify me about...">
      <RadioItemField
        value="all"
        className="flex items-center space-x-3 space-y-0"
        label="All new messages"
      />

      <RadioItemField
        value="mentions"
        className="flex items-center space-x-3 space-y-0"
        label="Direct messages and mentions"
      />

      <RadioItemField
        value="none"
        className="flex items-center space-x-3 space-y-0"
        label="Nothing"
      />
    </RadioField>
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
      placeholder="Select a verified email to display"
      description={
        <div>
          You can manage email addresses in your
          <a href="/examples/forms">email settings</a>.
        </div>
      }
    >
      <SelectItem value="m@example.com">m@example.com</SelectItem>
      <SelectItem value="m@google.com">m@google.com</SelectItem>
      <SelectItem value="m@support.com">m@support.com</SelectItem>
    </SelectField>
  )
}

export const TextareaExample = () => (
  <TextareaField
    className="my-12"
    name="bio"
    label="Bio"
    placeholder="Tell us a little bit about yourself"
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
      <Form onSubmit={console.log}>
        <InputExample />
        <PasswordExample />
        <CheckboxExample />
        <TextareaExample />

        <SwitchExample />
        <FormField
          name="securityEmails"
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <div className="space-y-0.5">
            <FormLabel>Security emails</FormLabel>
            <FormDescription>
              Receive emails about your account security.
            </FormDescription>
          </div>
          <FormControl>
            <Switch disabled aria-readonly />
          </FormControl>
        </FormField>

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
