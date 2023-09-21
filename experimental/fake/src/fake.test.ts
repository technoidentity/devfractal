import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'

import { empty, fake } from './fake'
const Gender = z.enum(['male', 'female'])

const person = z.object({
  id: z.string().uuid(),
  employed: z.boolean(),
  age: z.number().int(),
  name: z
    .string()
    .refine(x => x)
    .transform(x => x),
  dateOfBirth: z.date(),
  gender: Gender,
  address: z.array(
    z.object({
      street: z.string(),
      city: z.string(),
      state: z.nullable(z.string()),
      zip: z.optional(z.string()),
    }),
  ),
})

const schema = z.tuple([
  z.union([z.string(), z.number()]),
  z.map(z.string(), z.number()),
  z.record(z.string(), z.number()),
  z.set(z.string()),
  z.undefined(),
  z.null(),
  z.any(),
  z.unknown(),
  z.literal('foo'),
  z.intersection(z.object({ x: z.string() }), z.object({ y: z.number() })),
  z.object({ x: z.date(), y: z.boolean() }).partial(),
])

describe('fake', () => {
  test('object', () => {
    const p = fake(person)
    const s = fake(schema)

    expect(() => person.parse(p)).not.toThrow()
    expect(() => schema.parse(s)).not.toThrow()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(global.console, 'warn').mockImplementation(() => {})
    expect(() => fake(z.never()).parse(undefined)).toThrow()
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
})
describe('empty', () => {
  test('string', () => {
    const result = empty(z.string())
    expect(result).toBe('')
  })
  test('ZodNumber', () => {
    const result = empty(z.number())
    expect(result).toBe(0)
  })

  test('ZodBoolean', () => {
    const result = empty(z.boolean())
    expect(result).toBe(false)
  })

  test('ZodDate', () => {
    const result = empty(z.date())
    expect(result).toBeInstanceOf(Date)
  })

  test('ZodArray', () => {
    const result = empty(z.array(z.string()))
    expect(result).toEqual([])
  })
  test('ZodObject', () => {
    const result = empty(person)
    expect(result).toEqual({
      id: '',
      employed: false,
      age: 0,
      name: '',
      dateOfBirth: expect.any(Date),
      gender: 'male',
      address: [],
    })
  })
  test(' ZodMap', () => {
    const result = empty(z.map(z.string(), z.string()))
    expect(result).toBeInstanceOf(Map)
    expect(result.size).toBe(0)
  })
  test('should return a resolved Promise with an empty value for ZodPromise', async () => {
    const result = empty(z.promise(z.string()))
    expect(result).toBeInstanceOf(Promise)
    const resolvedValue = await result
    expect(resolvedValue).toEqual('')
  })
  test('ZodSet', () => {
    const result = empty(z.set(z.string()))
    expect(result).toBeInstanceOf(Set)
    expect(result.size).toBe(0)
  })
  test(' ZodRecord', () => {
    const result = empty(z.record(z.string()))
    expect(result).toEqual({})
  })
  test('ZodOptional', () => {
    const result = empty(z.string().optional())
    expect(result).toBe(undefined)
  })

  test('ZodNullable', () => {
    const result = empty(z.string().nullable())
    expect(result).toBe(null)
  })
  test(' ZodUndefined', () => {
    const result = empty(z.undefined())
    expect(result).toBe(undefined)
  })
  test('ZodNull', () => {
    const result = empty(z.null())
    expect(result).toBe(null)
  })
  test(' ZodUnknown', () => {
    const result = empty(z.unknown())
    expect(result).toBe(null)
  })
  test(' ZodAny', () => {
    const result = empty(z.any())
    expect(result).toBe(null)
  })
})
