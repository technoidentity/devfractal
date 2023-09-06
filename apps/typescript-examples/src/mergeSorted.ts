import { iterChain$, cons$, empty, iterator, snoc } from '@srtp/fn'
import invariant from 'tiny-invariant'

export function mergeSorted<T>(fst: Iterable<T>, snd: Iterable<T>) {
  return impl(iterator(fst), iterator(snd))
}

function impl<T>(
  fst: Iterator<T>,
  snd: Iterator<T>,
  result: Iterable<T> = empty(),
): Iterable<T> {
  const [h, t] = snoc(fst)
  const [h2, t2] = snoc(snd)
  if (h == null && h2 == null) {
    return result
  }

  if (h == null) {
    invariant(h2 != null, 'impossible: h2 cannot be null or undefined')

    return iterChain$(result, cons$(t2, h2))
  } else if (h2 == null) {
    return iterChain$(result, cons$(t, h))
  }

  return h <= h2
    ? impl(t, cons$(t2, h2), iterChain$(result, [h]))
    : impl(cons$(t, h), t2, iterChain$(result, [h2]))
}
