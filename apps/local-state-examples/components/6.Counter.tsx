import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { int } from '@srtp/spec'
import type { Handlers } from '@srtp/local-state'
import { state } from '@srtp/local-state'
import React from 'react'

const createUseCounter = (
  min: number = 0,
  max: number = 10,
  count: number = 1,
) => {
  const initial = { count: Math.min(max, Math.max(count, min)), min, max }

  const handlers = {
    inc(state) {
      state.count = Math.min(max, state.count + 1)
    },
    dec(state) {
      state.count = Math.max(min, state.count - 1)
    },
    incBy(state, by: number) {
      state.count = Math.min(max, state.count + by)
    },
    reset() {
      return initial
    },
  } satisfies Handlers<typeof initial>

  const useCounter = state(initial, handlers)

  return useCounter
}

type CounterProps = {
  min: number
  max: number
}

export const Counter = ({ min, max }: CounterProps) => {
  const useCounter = React.useMemo(() => createUseCounter(min, max), [min, max])
  const [by, setBy] = React.useState(0)
  const [state, { inc, dec, incBy, reset }] = useCounter()

  return (
    <VStack p="8">
      <Center>
        <Heading color="teal">Counter</Heading>
      </Center>
      <HStack p="2">
        <Button colorScheme="green" onClick={inc}>
          +
        </Button>
        <Text>{state.count}</Text>
        <Button colorScheme="purple" onClick={dec}>
          -
        </Button>
      </HStack>
      <HStack p={2}>
        <Input
          borderColor="orange"
          value={by}
          onChange={evt => setBy(+evt.target.value)}
        />{' '}
        <Button colorScheme="blue" onClick={() => incBy(int(by))}>
          Inc By
        </Button>
      </HStack>
      <Button colorScheme="red" onClick={reset}>
        Reset
      </Button>
    </VStack>
  )
}
