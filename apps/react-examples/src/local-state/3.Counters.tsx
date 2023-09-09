import { Button, HStack, Text } from '@chakra-ui/react'
import type { Handlers } from '@srtp/react'
import { tree } from '@srtp/react'

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
} satisfies Handlers<typeof initialState>

const counter = tree(initialState, handlers)

const Counter = () => {
  const [{ count }, { inc, dec }] = counter.useState()

  return (
    <HStack>
      <Button onClick={inc}>+</Button>
      <Text>{count}</Text>
      <Button onClick={dec}>-</Button>
    </HStack>
  )
}

const Add10 = () => {
  const { by } = counter.useActions()

  return (
    <Button mt="2" onClick={() => by(10)}>
      Add 10
    </Button>
  )
}

export const Counters = () => (
  <counter.Provider>
    <Counter />
    <Counter />
    <Add10 />
  </counter.Provider>
)

export const DoubleCounters = () => (
  <>
    <Counters />
    <Counters />
  </>
)
