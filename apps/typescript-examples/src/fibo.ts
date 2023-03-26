import invariant from 'tiny-invariant'

export function fibo(n: number) {
  let fst = 0
  let snd = 1
  let count = 0

  const hasNext = () => count < n

  const next = () => {
    invariant(hasNext(), 'No more elements')

    const t = snd
    snd = fst + snd
    fst = t

    count += 1

    return fst
  }

  return { next, hasNext }
}
