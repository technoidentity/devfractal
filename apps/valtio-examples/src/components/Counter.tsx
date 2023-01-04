import React from 'react'

import { Box, Button, HStack, Text } from '@chakra-ui/react'

type CounterViewProps = {
  count: number
  inc: () => void
  dec: () => void
}

const CounterView = React.memo(({ count, inc, dec }: CounterViewProps) => (
  <HStack>
    <Button onClick={inc}>+</Button>
    <Text>{count}</Text>
    <Button onClick={dec}>-</Button>
  </HStack>
))

type CounterProps = {
  initial?: number
}

const Hello = React.memo(() => <h1>Hello World</h1>)

const Counter = ({ initial }: CounterProps) => {
  const [count, setCount] = React.useState(initial || 0)

  const inc = React.useCallback(() => {
    setCount(count => count + 1)
  }, [])

  const dec = React.useCallback(() => {
    setCount(count => count - 1)
  }, [])

  return (
    <>
      <CounterView count={count} inc={inc} dec={dec} />
      <Hello />
    </>
  )
}

export const App = () => (
  <Box>
    <Counter initial={100} />
    <Counter initial={200} />
    <Counter initial={300} />
  </Box>
)
