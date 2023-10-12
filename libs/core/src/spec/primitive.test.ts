import { describe, expect, it } from 'vitest'

import { Primitive } from './primitive'

describe('Primitive', () => {
  it('should accept a string', () => {
    const result = Primitive.parse('hello')
    expect(result).toBe('hello')
  })

  it('should accept a number', () => {
    const result = Primitive.parse(42)
    expect(result).toBe(42)
  })

  it('should accept a boolean', () => {
    const result = Primitive.parse(true)
    expect(result).toBe(true)
  })

  it('should accept a date', () => {
    const result = Primitive.parse(new Date('2021-09-28T15:00:00.000Z'))
    expect(result).toBeInstanceOf(Date)
  })

  it('should accept a big integer', () => {
    const result = Primitive.parse(BigInt(42))
    expect(result).toBe(BigInt(42))
  })

  it('should throw an error for an object', () => {
    expect(() => Primitive.parse({ name: 'John', age: 42 })).toThrow()
  })
})
