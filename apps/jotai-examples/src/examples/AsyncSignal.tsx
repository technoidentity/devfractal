import { computed, signal, useValue } from '@srtp/jotai'

const urlAtom = signal('https://jsonplaceholder.typicode.com/posts/1')

const fetchUrlAtom = computed(async get => {
  const response = await fetch(get(urlAtom))
  return response.json()
})

export function AsyncSignal() {
  const json = useValue(fetchUrlAtom)

  return (
    <pre>
      <code>{JSON.stringify(json, null, 2)}</code>
    </pre>
  )
}
