import { Button, Container, HStack, Text } from '@chakra-ui/react'
import type { Handlers } from '@srtp/local-state'
import { state } from '@srtp/local-state'

const initialState = { count: 1 }

const handlers = {
  inc: state => {
    state.count++
  },
  dec: state => {
    state.count--
  },
} satisfies Handlers<typeof initialState>

const useCounter = state(initialState, handlers)

export const Counter = () => {
  const [{ count }, { inc, dec }] = useCounter()

  return (
    <Container>
      <HStack>
        <Button onClick={inc}>+</Button>
        <Text>{count}</Text>
        <Button onClick={dec}>-</Button>
      </HStack>
    </Container>
  )
}
