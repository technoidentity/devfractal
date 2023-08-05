import { Button } from '@/ui/button'
import {
  FormLabel,
  FormControl,
  FormField,
  createClientForm,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'

import { string } from '@srtp/validator'
import { z } from 'zod'

const Signin = z.object({
  username: string(),
  password: string(),
})

const initialValues = {
  username: '',
  password: '',
}
const [Form] = createClientForm(Signin, initialValues)

export const FormExample = () => {
  return (
    <div className="container">
      <Form onSubmit={form => console.log(Object.fromEntries(form.formData()))}>
        <FormField name="username">
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input />
          </FormControl>
          <FormMessage />
        </FormField>
        <FormField name="password">
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" />
          </FormControl>
          <FormMessage />
        </FormField>
        <Button className="mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
