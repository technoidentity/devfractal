import { Box, Button, Text } from '@chakra-ui/react'
import { proxy, useSnapshot } from 'valtio'

const state = proxy({ count: 0 })

const inc = () => {
  state.count++
}

const dec = () => {
  state.count--
}

export const Counter = () => {
  const snap = useSnapshot(state)

  return (
    <Box>
      <Button onClick={inc}>+</Button>
      <Text>{snap.count}</Text>
      <Button onClick={dec}>-</Button>
    </Box>
  )
}
