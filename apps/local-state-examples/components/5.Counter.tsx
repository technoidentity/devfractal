import { Button, Container, HStack, Input, Text } from '@chakra-ui/react'
import { toInt } from '@srtp/spec'
import type { Handlers } from '@srtp/local-state'
import { state$, useState$ } from '@srtp/local-state'
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

const counter = state$(initial, handlers)

export const Counter = () => {
  const [by, setBy] = React.useState(0)
  const [state, actions] = useState$(counter)

  return (
    <Container>
      <HStack>
        <Button onClick={actions.inc}>+</Button>
        <Text>{state.count}</Text>
        <Button onClick={actions.dec}>-</Button>
      </HStack>
      <HStack pt="2">
        <Button onClick={() => actions.incBy(toInt(by))}>Increase By</Button>
        <Input value={by} onChange={evt => setBy(+evt.target.value)} />
      </HStack>
    </Container>
  )
}
