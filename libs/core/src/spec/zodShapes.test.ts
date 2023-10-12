import { describe, expect, expectTypeOf, it } from 'vitest'
import * as z from 'zod'

import {
  type UnwrapZodShape,
  getUnwrappedField,
  unwrapZodField,
  unwrapZodShape,
} from './zodShapes'

describe('unwrapZodShape', () => {
  it('should unwrap a simple object schema', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })
    const result = unwrapZodShape(schema)

    expectTypeOf<UnwrapZodShape<typeof schema>>().toEqualTypeOf<{
      name: z.ZodString
      age: z.ZodNumber
    }>()

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)
  })

  it('should unwrap a nullable schema', () => {
    const schema = z
      .object({
        name: z.string(),
        age: z.number(),
      })
      .nullable()

    const result = unwrapZodShape(schema)

    expectTypeOf<UnwrapZodShape<typeof schema>>().toEqualTypeOf<{
      name: z.ZodString
      age: z.ZodNumber
    }>()

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)
  })

  it('should unwrap an optional schema', () => {
    const schema = z
      .object({
        name: z.string(),
        age: z.number(),
      })
      .optional()

    const result = unwrapZodShape(schema)

    expectTypeOf<UnwrapZodShape<typeof schema>>().toEqualTypeOf<{
      name: z.ZodString
      age: z.ZodNumber
    }>()

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)
  })

  it('should unwrap a readonly schema', () => {
    const schema = z.object({ name: z.string(), age: z.number() }).readonly()
    const result = unwrapZodShape(schema)

    expectTypeOf<UnwrapZodShape<typeof schema>>().toEqualTypeOf<{
      name: z.ZodString
      age: z.ZodNumber
    }>()

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)
  })

  it('should unwrap nested schema', () => {
    let result = unwrapZodShape(
      z
        .object({ name: z.string(), age: z.number() })
        .optional()
        .nullable()
        .readonly(),
    )

    expectTypeOf<UnwrapZodShape<typeof result>>().toEqualTypeOf<{
      name: z.ZodString
      age: z.ZodNumber
    }>()

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)

    result = unwrapZodShape(
      z
        .object({ name: z.string(), age: z.number() })
        .nullable()
        .optional()
        .readonly(),
    )

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)

    result = unwrapZodShape(
      z
        .object({ name: z.string(), age: z.number() })
        .optional()
        .readonly()
        .nullable(),
    )

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)

    result = unwrapZodShape(
      z
        .object({ name: z.string(), age: z.number() })
        .readonly()
        .optional()
        .nullable(),
    )

    expect(result.name).toBeInstanceOf(z.ZodString)
    expect(result.age).toBeInstanceOf(z.ZodNumber)
  })
})

describe('unwrapZodField', () => {
  it('should unwrap a simple Zod type', () => {
    const schema = z.string()
    const result = unwrapZodField(schema)
    expect(result).toBeInstanceOf(z.ZodString)
    expectTypeOf(result).toEqualTypeOf<z.ZodString>()
  })

  it('should unwrap a Zod optional type', () => {
    const schema = z.optional(z.string())
    const result = unwrapZodField(schema)
    expect(result).toBeInstanceOf(z.ZodString)
    expectTypeOf(result).toEqualTypeOf<z.ZodString>()
  })

  it('should unwrap a Zod nullable type', () => {
    const schema = z.nullable(z.string())
    const result = unwrapZodField(schema)
    expect(result).toBeInstanceOf(z.ZodString)
    expectTypeOf(result).toEqualTypeOf<z.ZodString>()
  })

  it('should unwrap a Zod optional nullable type', () => {
    const schema = z.optional(z.nullable(z.string()))
    const result = unwrapZodField(schema)
    expect(result).toBeInstanceOf(z.ZodString)
    expectTypeOf(result).toEqualTypeOf<z.ZodString>()
  })

  it.skip('should unwrap a Zod readonly type', () => {
    const schema = z.string().readonly()
    const result = unwrapZodField(schema)
    expect(result).toBeInstanceOf(z.ZodString)
    expectTypeOf(result).toEqualTypeOf<z.ZodString>()
  })

  it('should unwrap a zod nested field', () => {
    const schema = z.string().optional().nullable().readonly()
    const result = unwrapZodField(schema)
    expectTypeOf(result).toEqualTypeOf<z.ZodString>()
    expect(unwrapZodField(schema)).toBeInstanceOf(z.ZodString)
    expect(
      unwrapZodField(z.string().optional().nullable().readonly()),
    ).toBeInstanceOf(z.ZodString)
    expect(
      unwrapZodField(z.string().nullable().optional().readonly()),
    ).toBeInstanceOf(z.ZodString)
  })
})

describe('getUnwrappedField', () => {
  it('should get the unwrapped type of a simple field', () => {
    const schema = z
      .object({
        name: z.string().optional().nullable(),
        age: z.number().optional().nullable(),
      })
      .optional()

      .nullable()

    const name = getUnwrappedField(schema, 'name')
    expect(name).toBeInstanceOf(z.ZodString)
    expectTypeOf(name).toEqualTypeOf<z.ZodString>()

    expect(getUnwrappedField(schema, 'age')).toBeInstanceOf(z.ZodNumber)
    expectTypeOf(getUnwrappedField(schema, 'name')).toEqualTypeOf<z.ZodString>()
  })
})
