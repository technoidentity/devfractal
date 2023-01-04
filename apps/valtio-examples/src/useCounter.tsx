import { Box, Button, Text } from '@chakra-ui/react'
import { sliceHook } from '@srtp/reducer'

export const useCounter = sliceHook(
  { count: 0 },
  {
    onInc(state) {
      state.count++
    },
    onDec(state) {
      state.count--
    },
  },
)

export const Counter = () => {
  const [state, { onDec, onInc }] = useCounter()

  return (
    <Box>
      <Button onClick={onInc}>+</Button>
      <Text>{state.count}</Text>
      <Button onClick={onDec}>-</Button>
    </Box>
  )
}
