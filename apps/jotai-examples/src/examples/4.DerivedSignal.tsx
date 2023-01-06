import { Box, Button, Text } from '@chakra-ui/react'
import { derived, signal, useAction, useValue } from '@srtp/jotai'

const countAtom = signal(100)

const decrementCountAtom = derived(
  get => get(countAtom),
  (get, set) => set(countAtom, get(countAtom) - 1),
)

export function DerivedSignal() {
  const count = useValue(decrementCountAtom)
  const decrement = useAction(decrementCountAtom)

  return (
    <Box>
      <Text>{count}</Text>
      <Button onClick={() => decrement()}>Decrease</Button>
    </Box>
  )
}
