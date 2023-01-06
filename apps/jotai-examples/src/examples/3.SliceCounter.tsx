import { Box, Button, Container, Text } from '@chakra-ui/react'
import { signalSlice, useDispatch, useValue } from '@srtp/jotai'

const counter = signalSlice(
  { count: 100 },
  {
    inc(draft) {
      draft.count++
    },
    dec(draft) {
      draft.count--
    },
  },
)

const Counter = () => {
  const { count } = useValue(counter)

  return <Text>{count}</Text>
}

const Buttons = () => {
  const dispatch = useDispatch(counter)

  return (
    <Box>
      <Button onClick={() => dispatch({ type: 'inc' })}>+</Button>
      <Button onClick={() => dispatch({ type: 'dec' })}>-</Button>
    </Box>
  )
}

export function SliceCounter() {
  return (
    <Container>
      <Counter />
      <Buttons />
    </Container>
  )
}
