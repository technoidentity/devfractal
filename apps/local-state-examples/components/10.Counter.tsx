import { Button, Container, HStack, Text } from '@chakra-ui/react'
import { useInt } from '@srtp/react'

export const Counter = () => {
  const [count, setCount] = useInt()

  console.log('render', count)

  return (
    <Container>
      <HStack>
        <Button onClick={() => setCount(count => count + 1)}>+</Button>
        <Text>{count}</Text>
        <Button onClick={() => setCount(count => count - 1)}>-</Button>
      </HStack>
    </Container>
  )
}
