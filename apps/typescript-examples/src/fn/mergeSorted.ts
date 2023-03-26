import { chain$, cons$, empty, iterator, scon } from '@srtp/fn'
import invariant from 'tiny-invariant'

export function mergeSorted<T>(fst: Iterable<T>, snd: Iterable<T>) {
  return impl(iterator(fst), iterator(snd))
}

function impl<T>(
  fst: Iterator<T>,
  snd: Iterator<T>,
  result: Iterable<T> = empty(),
): Iterable<T> {
  const [h, t] = scon(fst)
  const [h2, t2] = scon(snd)
  if (h == null && h2 == null) {
    return result
  }

  if (h == null) {
    invariant(h2 != null, 'impossible: h2 cannot be null or undefined')

    return chain$(result, cons$(t2, h2))
  } else if (h2 == null) {
    return chain$(result, cons$(t, h))
  }

  return h <= h2
    ? impl(t, cons$(t2, h2), chain$(result, [h]))
    : impl(cons$(t, h), t2, chain$(result, [h2]))
}
