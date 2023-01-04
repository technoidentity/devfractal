/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Text } from '@chakra-ui/react'
import { delay } from '@srtp/core'
import {
  action,
  asyncSignal,
  computed,
  derived,
  signal,
  useAction,
  useValue,
} from '@srtp/jotai'
import { Suspense } from 'react'

const countAtom = signal(1)

const asyncAtom = asyncSignal(async get => {
  const cnt = get(countAtom)

  return cnt * 2
})

const asyncIncrementAtom = derived(
  get => get(countAtom),
  async (get, set) => {
    await delay(100)
    const r = get(countAtom) + 1
    set(countAtom, r)
  },
)

export const ComponentUsingAsyncAtoms = () => {
  const num = useValue(asyncAtom)

  return <Text>{num}</Text>
}

const App = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <ComponentUsingAsyncAtoms />
    </Suspense>
  )
}

const anotherAtom = computed(get => get(asyncAtom) / 2)

const Component = () => {
  const count = useValue(asyncIncrementAtom)
  const increment = useAction(asyncIncrementAtom)

  const handleClick = () => {
    increment()
  }

  return <Text>{count}</Text>
}
