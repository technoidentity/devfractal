import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React from 'react'
import { MdEmail } from 'react-icons/md'

export interface EmailInputFieldProps {
  setEmail(email: string): void
}

export const EmailInputField: React.FC<EmailInputFieldProps> = ({
  setEmail,
}) => (
  <FormControl isRequired>
    <FormLabel>Email address</FormLabel>

    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={MdEmail} color="gray.300" />}
      />
      <Input
        bg="white"
        type="email"
        placeholder="enter your email id here"
        width="md"
        onChange={event => setEmail(event.currentTarget.value)}
      />
    </InputGroup>
  </FormControl>
)
