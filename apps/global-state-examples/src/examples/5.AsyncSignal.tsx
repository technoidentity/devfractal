import { computed, useValue } from '@srtp/react'
import { atom } from 'jotai'

const urlSignal = atom('https://jsonplaceholder.typicode.com/posts/1')

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
