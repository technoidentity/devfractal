import { Button, Container, HStack, Text } from '@chakra-ui/react'
import { state } from '@srtp/local-state'

const useCounter = state(
  { count: 1 },
  {
    inc: state => state.count++,
    dec: state => state.count--,
  },
)

export const Counter = () => {
  const [state, actions] = useCounter()

  return (
    <Container>
      <HStack>
        <Button onClick={actions.inc}>+</Button>
        <Text>{state.count}</Text>
        <Button onClick={actions.dec}>-</Button>
      </HStack>
    </Container>
  )
}
