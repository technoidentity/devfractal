import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { empty } from './empty'
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
const Circle = z.object({
  shape: z.literal('circle'),
  radius: z.number(),
})

const Square = z.object({
  shape: z.literal('square'),
  sideLength: z.number(),
})
const MySchema = z
  .string()
  .refine(str => str.length >= 5, {
    message: 'String length must be at least 5',
  })
  .transform(str => str.toUpperCase())
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
  test('promise rejects', async () => {
    const rejectedPromise = Promise.reject(new Error())
    expect(rejectedPromise).toBeInstanceOf(Promise)
    await expect(rejectedPromise).rejects.toThrowError()
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
  test('ZodDiscriminatedUnion', () => {
    const Shape = z.union([Circle, Square])
    const result = empty(Shape)
    expect(result).toEqual({ shape: '', radius: 0 })
  })
  test('should handle ZodEffects', () => {
    const result = empty(MySchema)
    expect(result).toBe('')
  })
})
