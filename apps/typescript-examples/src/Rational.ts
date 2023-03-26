import invariant from 'tiny-invariant'

export class Rational {
  constructor(readonly numerator: number, readonly denominator: number) {
    invariant(denominator !== 0)
  }

  add(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator,
    )
  }

  sub(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator,
    )
  }

  mul(other: Rational): Rational {
    return new Rational(
      this.numerator * other.numerator,
      this.denominator * other.denominator,
    )
  }

  div(other: Rational): Rational {
    return new Rational(
      this.numerator * other.denominator,
      this.denominator * other.numerator,
    )
  }

  equals(other: Rational): boolean {
    invariant(other instanceof Rational)
    return (
      this.numerator * other.denominator === other.numerator * this.denominator
    )
  }

  compare(other: Rational): number {
    invariant(other instanceof Rational)
    return (
      this.numerator * other.denominator - other.numerator * this.denominator
    )
  }
}
