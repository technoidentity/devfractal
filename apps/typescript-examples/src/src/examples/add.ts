function add(x: number, y: number): number {
  return x + y
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('add', () => {
    expect(add(1, 2)).toBe(3)
  })
}
