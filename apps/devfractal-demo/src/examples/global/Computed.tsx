import { computed, useAction, useValue } from 'devfractal'
import { Provider, atom } from 'jotai'
import { Text } from 'devfractal'

const textAtom = atom('hello')
const textLenAtom = computed(get => get(textAtom).length)
const uppercaseAtom = computed(get => get(textAtom).toUpperCase())

const Input = () => {
  const setText = useAction(textAtom)

  return <input onChange={e => setText(e.target.value)} />
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
