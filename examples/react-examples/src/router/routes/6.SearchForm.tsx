import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { createSearchForm } from '@srtp/conform'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
})

const [SearchForm, useSearchForm] = createSearchForm(schema)

const Fields = () => {
  const [, { name, email }] = useSearchForm()

  return (
    <>
      <FormControl isInvalid={Boolean(name.error)}>
        <FormLabel>Name</FormLabel>

        <Input type="text" name={name.name} />
        <FormErrorMessage>{name.error}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(email.error)}>
        <FormLabel>Name</FormLabel>
        <Input
          type="email"
          name={email.name}
          placeholder="username@gmail.com"
          required
        />
        <FormErrorMessage>{email.error}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export const SignupForm = () => {
  return (
    // eslint-disable-next-line no-console
    <SearchForm onSuccess={console.log}>
      <VStack>
        <Fields />
        <Button type="submit" value="Search">
          Seearch
        </Button>
      </VStack>
    </SearchForm>
  )
}
