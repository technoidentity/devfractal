import type { MantineTheme } from '@mantine/core'
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  Radio,
  Text,
  Textarea,
  Title,
} from '@mantine/core'
import { createForm } from '@srtp/mantine'

import { FormValueSchema, initialValues } from './spec'

const countriesData = [
  { label: 'United States', value: 'US' },
  { label: 'Great Britain', value: 'GB' },
  { label: 'Finland', value: 'FI' },
  { label: 'France', value: 'FR' },
  { label: 'Russia', value: 'RU' },
]

const { Form, Inputs } = createForm(FormValueSchema, initialValues)

export const Submit = (props: any) => {
  return (
    <Button type="submit" {...props}>
      Submit
    </Button>
  )
}

export const MantineForm = () => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme: MantineTheme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily!}`,
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
      <Form onSubmit={console.log}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Inputs.Str
            label="Email"
            placeholder="you@mantine.dev"
            name="email"
          />
          <Inputs.Password
            label="Password"
            placeholder="Your password"
            mt="md"
            name="password"
          />
          <Inputs.Password
            mt="sm"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <Group position="apart" mt="md">
            <Anchor<'a'>
              onClick={event => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Inputs.Enum
            mt={20}
            label="Select Category to avail discount"
            description="This is anonymous"
            withAsterisk
            name="category"
          >
            <Radio value="generalPublic" label="General Public" />
            <Radio value="seniorCitizen" label="Senior Citizen" />
            <Radio value="employee" label="Employee" />
          </Inputs.Enum>

          <Inputs.EnumList
            name="country"
            mt={20}
            data={countriesData}
            label="Countries you visited!"
            placeholder="Pick all that you like"
            searchable
            nothingFound="Nothing found"
          />
          <Textarea
            placeholder="Your comment"
            label="Your comment"
            withAsterisk
            name="comment"
          />
          <Inputs.Number
            defaultValue={18}
            min={18}
            placeholder="Your age"
            label="Your age"
            name="age"
            withAsterisk
          />
          <Inputs.Select
            name="library"
            mt={20}
            label="Your favorite framework/library"
            placeholder="Pick one"
            data={[
              { value: 'react', label: 'React' },
              { value: 'ng', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue', label: 'Vue' },
            ]}
          />
          <Inputs.Switch
            name="agree"
            mt={20}
            label="I agree to sell my privacy"
          />
          <Submit type="submit" fullWidth mt="xl">
            Submit
          </Submit>
        </Paper>
      </Form>
    </Container>
  )
}
