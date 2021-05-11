import { Heading } from '@chakra-ui/react'
import React from 'react'
import { Header } from '.'

export interface ErrorProps {
  readonly message: string
}
export const Error: React.FC<ErrorProps> = ({ message }) => (
  <>
    <Header />
    <Heading>{message}</Heading>
  </>
)
