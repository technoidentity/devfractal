export {}

console.log('hello world')

function factorial(n: number): number {
  if (n < 0) {
    throw new Error(`factorial of negative value: ${n} is undefined`)
  }
  let fact = 1

  for (let i = 2; i <= n; i += 1) {
    fact *= i
  }

  return fact
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('factorial', () => {
    expect(() => factorial(-1)).toThrow()
    expect(factorial(0)).toBe(1)
    expect(factorial(1)).toBe(1)
    expect(factorial(5)).toBe(120)
  })
}
