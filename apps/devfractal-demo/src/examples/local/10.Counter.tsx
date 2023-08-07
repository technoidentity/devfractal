import { useInt } from '@srtp/local-state'
import { Container, HStack } from '@/cui'
import { Button } from '@/ui/button'
import { Text } from '@/ui/typography'

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
