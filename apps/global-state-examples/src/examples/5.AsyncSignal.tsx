import { computed, signal, useValue } from '@srtp/global-state'

const urlSignal = signal('https://jsonplaceholder.typicode.com/posts/1')

const fetchUrlSignal = computed(async get => {
  const response = await fetch(get(urlSignal))
  return response.json()
})

export function AsyncSignal() {
  const json = useValue(fetchUrlSignal)

  return (
    <pre>
      <code>{JSON.stringify(json, null, 2)}</code>
    </pre>
  )
}
