import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react'

import { EmailIcon } from '@chakra-ui/icons'

export interface EmailInputFieldProps {
  setEmail(email: string): void
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({ setEmail }) => (
  <FormControl isRequired>
    <FormLabel>Email address</FormLabel>

    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<EmailIcon color="gray.300" />}
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

export default EmailInputField
