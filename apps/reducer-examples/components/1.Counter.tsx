import { Button, Container, HStack, Input, Text } from '@chakra-ui/react'
import { int } from '@srtp/core'
import { Handlers, slice$, useSlice$ } from '@srtp/reducer'
import React from 'react'

const initial = { count: 1 }

const handlers = {
  inc(state) {
    state.count++
  },
  dec(state) {
    state.count--
  },
  incBy(state, by: number) {
    state.count += by
  },
} satisfies Handlers<typeof initial>

const counter = slice$(initial, handlers)

export const Counter = () => {
  const [by, setBy] = React.useState(0)
  const [state, actions] = useSlice$(counter)

  return (
    <Container>
      <HStack>
        <Button onClick={actions.inc}>+</Button>
        <Text>{state.count}</Text>
        <Button onClick={actions.dec}>-</Button>
      </HStack>
      <HStack pt="2">
        <Button onClick={() => actions.incBy(int(by))}>Increase By</Button>
        <Input value={by} onChange={evt => setBy(+evt.target.value)} />
      </HStack>
    </Container>
  )
}