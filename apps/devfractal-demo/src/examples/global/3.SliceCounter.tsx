import { slice, useValue } from 'devfractal'
import { Box, Flex } from 'devfractal'
import { Text } from 'devfractal'
import { Button } from 'devfractal'

const [counterAtom, useActions] = slice(
  { count: 100 },
  {
    inc(draft) {
      draft.count++
    },
    dec(draft) {
      draft.count--
    },
    by(draft, n: number) {
      draft.count += n
    },
  },
)

const Counter = () => {
  const { count } = useValue(counterAtom)

  return <Text className="text-3xl m-2 font-bold">{count}</Text>
}

const Buttons = () => {
  const actions = useActions()

  return (
    <Box className="space-x-2">
      <Button onClick={() => actions.inc()}>+</Button>
      <Button onClick={() => actions.dec()}>-</Button>
      <Button onClick={() => actions.by(10)}>+10</Button>
    </Box>
  )
}

export function SliceCounter() {
  return (
    <Flex direction="col" className="align-start ">
      <Counter />
      <Buttons />
    </Flex>
  )
}
