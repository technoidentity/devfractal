import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { providerHook } from '@srtp/reducer'

const { Provider, useSlice, useAction } = providerHook(
  { count: 0 },
  {
    inc(draft) {
      draft.count++
    },
    dec(draft) {
      draft.count--
    },
  },
)

export const Counter = () => {
  const [{ count }, { inc, dec }] = useSlice()

  const onInc = useAction(inc)
  const onDec = useAction(dec)

  return (
    <HStack>
      <Button onClick={onInc}>+</Button>
      <Text>{count}</Text>
      <Button onClick={onDec}>-</Button>
    </HStack>
  )
}

export const CounterApp = () => (
  <Provider>
    <Counter />
    <Counter />
    <Counter />
    <Counter />
  </Provider>
)
