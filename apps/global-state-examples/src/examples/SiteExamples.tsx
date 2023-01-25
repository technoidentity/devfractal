/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  action,
  computed,
  derived,
  signal,
  useAction,
  useValue,
} from '@srtp/global-state'

const countAtom = signal(0)

export const countryAtom = signal('Japan')
export const citiesAtom = signal(['Tokyo', 'Kyoto', 'Osaka'])
export const mangaAtom = signal({
  'Dragon Ball': 1984,
  'One Piece': 1997,
  Naruto: 1999,
})

export function SiteCounter() {
  const count = useValue(countAtom)
  const setCount = useAction(countAtom)
  return (
    <h1>
      {count}
      <button onClick={() => setCount(c => c + 1)}>one up</button>
    </h1>
  )
}

const doubledCountAtom = computed(get => get(countAtom) * 2)

export function DoubleCounter() {
  const doubledCount = useValue(doubledCountAtom)
  return <h2>{doubledCount}</h2>
}

const count1 = signal(1)
const count2 = signal(2)
const count3 = signal(3)

export const sum = computed(get => get(count1) + get(count2) + get(count3))

const decrementCountAtom = derived(
  get => get(countAtom),
  (get, set) => set(countAtom, get(countAtom) - 1),
)

export function DecCounter() {
  const count = useValue(decrementCountAtom)
  const decrement = useAction(decrementCountAtom)

  return (
    <h1>
      {count}
      <button onClick={() => decrement()}>Decrease</button>
    </h1>
  )
}

const multiplyCountAtom = action((get, set, by: number) =>
  set(countAtom, get(countAtom) * by),
)

export function Controls() {
  const multiply = useAction(multiplyCountAtom)
  return <button onClick={() => multiply(3)}>triple</button>
}

const urlAtom = signal('https://json.host.com')
const fetchUrlAtom = computed(async get => {
  const response = await fetch(get(urlAtom))
  return await response.json()
})

export function Status() {
  const json = useValue(fetchUrlAtom)
  return <pre>{JSON.stringify(json, null, 2)}</pre>
}

const fetchCountAtom = derived(
  get => get(countAtom),
  async (_get, set, url: string) => {
    const response = await fetch(url)
    set(countAtom, (await response.json()).count)
  },
)

export function FetchControls() {
  const compute = useAction(fetchCountAtom)
  return (
    <button onClick={() => compute('http://count.host.com')}>compute</button>
  )
}
