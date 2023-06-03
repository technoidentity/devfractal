import { Box, Button, Text } from '@chakra-ui/react'
import { derived, useAction, useValue } from '@srtp/global-state'
import { atom } from 'jotai'

const countAtom = atom(100)

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
