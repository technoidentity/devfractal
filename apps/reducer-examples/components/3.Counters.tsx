import { Button, HStack, Text } from '@chakra-ui/react'
import { Handlers, provider } from '@srtp/reducer'

const initialState = { count: 0 }

const handlers = {
  inc(draft) {
    draft.count++
  },
  dec(draft) {
    draft.count--
  },
  by(state, step: number) {
    state.count += step
  },
} as const satisfies Handlers<typeof initialState>

const { Provider, useSlice, useActions } = provider(initialState, handlers)

const Counter = () => {
  const [{ count }, { inc, dec }] = useSlice()

  return (
    <HStack>
      <Button onClick={inc}>+</Button>
      <Text>{count}</Text>
      <Button onClick={dec}>-</Button>
    </HStack>
  )
}

const Add10 = () => {
  const { by } = useActions()

  return (
    <Button mt="2" onClick={() => by(10)}>
      Add 10
    </Button>
  )
}

export const Counters = () => (
  <Provider>
    <Counter />
    <Counter />
    <Add10 />
  </Provider>
)
