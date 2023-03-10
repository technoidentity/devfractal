/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button, Flex, Select } from '@chakra-ui/react'
import type { UsersResponse } from '@ui/responses'

import React from 'react'
import invariant from 'tiny-invariant'

type TestLoginViewProps = Readonly<{
  users: UsersResponse
  onLogin(email: string): void
}>

export const TestLoginView = ({ users, onLogin }: TestLoginViewProps) => {
  const [email, setEmail] = React.useState('')

  return (
    <Flex justify="center" align="center" h="100vh" w="600px" m="0 auto">
      <Select
        placeholder="select"
        value={email}
        onChange={evt => setEmail(evt.target.value)}
      >
        {users.map(user => {
          invariant(user.email)

          return (
            <option key={user.email} value={user.email}>
              {user.name}
            </option>
          )
        })}
      </Select>
      <Button
        onClick={async () => {
          onLogin(email)
        }}
      >
        Login
      </Button>
    </Flex>
  )
}
