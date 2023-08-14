import { useInt } from 'devfractal'
import { Container, HStack } from 'devfractal'
import { Button } from 'devfractal'
import { Text } from 'devfractal'

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
