import invariant from 'tiny-invariant'

import { isPrime } from './simple'

export class PrimeGenerator {
  private cnt = 0
  private cur = 2
  public constructor(private readonly n: number) {}

  hasNext(): boolean {
    return this.cnt < this.n
  }

  next(): number | undefined {
    invariant(this.hasNext())

    while (!isPrime(this.cur)) {
      this.cur += 1
    }

    this.cnt += 1
    return this.cur
  }
}
