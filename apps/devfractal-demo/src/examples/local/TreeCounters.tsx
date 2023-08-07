import type { Handlers } from '@srtp/local-state'
import { tree } from '@srtp/local-state'
import { HStack } from '@/cui'
import { Button } from '@/ui/button'
import { Text } from '@/ui/typography'

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

const { Provider, useState, useActions } = tree(initialState, handlers)

const Counter = () => {
  const [{ count }, { inc, dec }] = useState()

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
    <Button className="mt-2" onClick={() => by(10)}>
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
