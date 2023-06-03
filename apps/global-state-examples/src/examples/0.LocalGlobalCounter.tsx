import { Input, Text } from '@chakra-ui/react'
import { useLocal } from '@srtp/global-state'
import { useEvent } from '@srtp/local-state'
import { Provider } from 'jotai'

// const Input = () => {
//   const text = useValue(textAtom)
//   const setText = useAction(textAtom)

//   return <input value={text} onChange={e => setText(e.target.value)} />
// }

const CharCount = ({ len }: { len: number }) => {
  return <Text>Length: {len}</Text>
}

const Uppercase = ({ uppercase }: { uppercase: string }) => {
  return <Text>Uppercase: {uppercase}</Text>
}

export const Computed = () => {
  const [value, set, useComputed] = useLocal('hello')

  const textLen = useComputed(text => text.length)
  const uppercase = useComputed(text => text.toUpperCase())

  const onChange = useEvent((e: React.ChangeEvent<HTMLInputElement>) =>
    set(e.target.value),
  )

  return (
    <>
      <Input value={value} onChange={onChange} />
      <CharCount len={textLen} />
      <Uppercase uppercase={uppercase} />
    </>
  )
}

export const App = () => {
  return (
    <Provider>
      <Computed />
    </Provider>
  )
}
