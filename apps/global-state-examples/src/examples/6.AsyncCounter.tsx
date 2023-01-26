/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, Button, Text } from '@chakra-ui/react'
import { delay } from '@srtp/core'
import {
  asyncSignal,
  computed,
  derived,
  signal,
  useAction,
  useValue,
} from '@srtp/global-state'
import { Suspense } from 'react'

const countAtom = signal(1)

const asyncAtom = asyncSignal(async get => {
  await delay(300)
  return get(countAtom) * 2
})

const asyncIncrementAtom = derived(
  get => get(countAtom),
  async (get, set) => {
    await delay(100)
    const r = get(countAtom) + 1
    set(countAtom, r)
  },
)

const anotherAtom = computed(get => get(asyncAtom) / 2)

const Component = () => {
  const count = useValue(asyncIncrementAtom)
  const increment = useAction(asyncIncrementAtom)
  const another = useValue(anotherAtom)
  const handleClick = () => {
    increment()
  }

  return (
    <Box>
      <Text>doubled: {count}</Text>
      <Text>another: {another}</Text>
      <Button onClick={handleClick}>Increment</Button>
    </Box>
  )
}

export const AysncCounter = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Component />
    </Suspense>
  )
}