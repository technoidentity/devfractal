import invariant from 'tiny-invariant'

export class FibonacciGenerator {
  private fst = 0
  private snd = 1
  private cnt = 0

  public constructor(private readonly n: number) {
    invariant(n >= 0)
  }

  hasNext(): boolean {
    return this.cnt < this.n
  }

  next(): number | undefined {
    invariant(this.hasNext())

    this.snd = this.snd + this.fst
    this.fst = this.snd - this.fst

    this.cnt += 1
    return this.fst
  }
}
