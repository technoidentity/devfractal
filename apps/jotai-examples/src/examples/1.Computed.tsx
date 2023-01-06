import { Text } from '@chakra-ui/react'
import { computed, signal, useAction, useValue } from '@srtp/jotai'
import { Provider } from 'jotai'

const textAtom = signal('hello')
const textLenAtom = computed(get => get(textAtom).length)
const uppercaseAtom = computed(get => get(textAtom).toUpperCase())

const Input = () => {
  const text = useValue(textAtom)
  const setText = useAction(textAtom)

  return <input value={text} onChange={e => setText(e.target.value)} />
}

const CharCount = () => {
  const len = useValue(textLenAtom)

  return <Text>Length: {len}</Text>
}

const Uppercase = () => {
  const uppercase = useValue(uppercaseAtom)

  return <Text>Uppercase: {uppercase}</Text>
}

export const Computed = () => (
  <Provider>
    <Input />
    <CharCount />
    <Uppercase />
  </Provider>
)
