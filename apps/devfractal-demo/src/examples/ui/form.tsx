import { cn } from '@/core'
import { CheckBoxField } from '@/examples/ui/CheckboxField'
import { InputField } from '@/examples/ui/InputField'
import { RadioExample } from '@/examples/ui/RadioField'
import { SelectField } from '@/examples/ui/SelectField'
import { SwitchField } from '@/examples/ui/SwitchField'
import { TextareaField } from '@/examples/ui/TextArea'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import {
  AriaControl,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  createClientForm,
  useControllerProps,
} from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { SelectItem } from '@/ui/select'
import { Switch } from '@/ui/switch'
import { ThemeSelector } from '@/ui/theme-toggle'
import { CalendarIcon } from '@radix-ui/react-icons'
import { boolean, email, string } from '@srtp/validator'
import { format } from 'date-fns'
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

const DatePickerExample = () => {
  const field = useControllerProps()

  return (
    <>
      <FormLabel>Date of birth</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <AriaControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value ? (
                format(field.value, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </AriaControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={date =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormDescription>
        Your date of birth is used to calculate your age.
      </FormDescription>
      <FormMessage />
    </>
  )
}

export const SelectExample2 = () => {
  return (
    <SelectField
      name="email"
      label="Email"
      placeholder="Select a verified email to display"
      description={
        <div>
          {' '}
          You can manage email addresses in your{' '}
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

        <FormField name="email">
          <SelectExample />
        </FormField>
        <FormField name="dob" className="flex flex-col">
          <DatePickerExample />
        </FormField>
        <FormField name="" className="space-y-3">
          <RadioExample />
        </FormField>
        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
