import { slice, useValue } from '@srtp/global-state'
import { Box, Flex } from '@/cui'
import { Text } from '@/ui/typography'
import { Button } from '@/ui/button'

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
    <Box className="gap-2">
      <Button onClick={() => actions.inc()}>+</Button>
      <Button onClick={() => actions.dec()}>-</Button>
      <Button onClick={() => actions.by(10)}>+10</Button>
    </Box>
  )
}

export function SliceCounter() {
  return (
    <Flex direction="col" align="start">
      <Counter />
      <Buttons />
    </Flex>
  )
}
