import { Button, Container, HStack, Text, useInt } from 'devfractal'

export const Counter = () => {
  const [count, setCount] = useInt()

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
