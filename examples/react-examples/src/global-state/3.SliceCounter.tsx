import { Box, Button, Text } from '@chakra-ui/react'
import { Flex } from '@mantine/core'
import { slice } from '@srtp/react'

const counter = slice(
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
  const { count } = counter.useValue()

  return (
    <Text fontSize="3xl" m="2" fontWeight="bold">
      {count}
    </Text>
  )
}

const Buttons = () => {
  const actions = counter.useActions()

  return (
    <Box>
      <Button ml="2" onClick={() => actions.inc()}>
        +
      </Button>
      <Button ml="2" onClick={() => actions.dec()}>
        -
      </Button>
      <Button ml="2" onClick={() => actions.by(10)}>
        +10
      </Button>
    </Box>
  )
}

export function SliceCounter() {
  return (
    <Flex direction="column" align="flex-start">
      <Counter />
      <Buttons />
    </Flex>
  )
}
