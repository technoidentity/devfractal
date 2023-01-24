/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  MultiSelect,
  Radio,
  Switch,
  NumberInput,
  Rating,
  Select,
  Textarea,
  MantineTheme,
} from '@mantine/core'
import { FormValueSchema, initialValues } from './spec'
import { useForm, zodResolver } from '@mantine/form'

const countriesData = [
  { label: 'United States', value: 'US' },
  { label: 'Great Britain', value: 'GB' },
  { label: 'Finland', value: 'FI' },
  { label: 'France', value: 'FR' },
  { label: 'Russia', value: 'RU' },
]

export const MantineForm = () => {
  const form = useForm({
    validate: zodResolver(FormValueSchema),
    initialValues,
  })

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme: MantineTheme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Register here!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor href="#" size="sm" onClick={event => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>
      <form
        onSubmit={form.onSubmit(values => {
          console.log(values)
        })}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" {...form.getInputProps('remember')} />
            <Anchor<'a'>
              onClick={event => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Radio.Group
            mt={20}
            name="category"
            label="Select Category to avail discount"
            description="This is anonymous"
            withAsterisk
            {...form.getInputProps('category')}
          >
            <Radio value="generalPublic" label="General Public" />
            <Radio value="seniorCitizen" label="Senior Citizen" />
            <Radio value="employee" label="Employee" />
          </Radio.Group>

          <MultiSelect
            mt={20}
            data={countriesData}
            label="Countries you visited!"
            placeholder="Pick all that you like"
            searchable
            nothingFound="Nothing found"
            {...form.getInputProps('country')}
          />
          <Textarea
            placeholder="Your comment"
            label="Your comment"
            withAsterisk
            {...form.getInputProps('comment')}
          />
          <NumberInput
            defaultValue={18}
            min={18}
            placeholder="Your age"
            label="Your age"
            withAsterisk
            {...form.getInputProps('age')}
          />
          <Rating defaultValue={2} mt={20} {...form.getInputProps('rating')} />
          <Select
            mt={20}
            label="Your favorite framework/library"
            placeholder="Pick one"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
            {...form.getInputProps('library')}
          />
          <Switch
            mt={20}
            label="I agree to sell my privacy"
            {...form.getInputProps('agree')}
          />
          <Button type="submit" fullWidth mt="xl">
            Submit
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
