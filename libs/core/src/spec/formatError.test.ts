import invariant from 'tiny-invariant'
import { describe, expect, it } from 'vitest'
import * as z from 'zod'
import { formatErrors } from './formatError'

describe('formatErrors', () => {
  it('should format a simple error', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })
    const data = { name: 'John', age: '42' }
    const result = schema.safeParse(data)
    expect(result.success).toBe(false)
    invariant(!result.success)
    expect(formatErrors(result.error)).toMatchInlineSnapshot(`
      {
        "age": "Expected number, received string",
      }
    `)
  })

  it('should format a nested error', () => {
    const schema1 = z.object({ name: z.string() })
    const schema2 = z.object({ age: z.number() })

    const schema = z.object({ person: z.intersection(schema1, schema2) })
    const data = { person: { name: 'John', age: '42' } }
    const result = schema.safeParse(data)
    expect(result.success).toBe(false)
    invariant(!result.success)
    expect(formatErrors(result.error)).toMatchInlineSnapshot(`
      {
        "person.age": "Expected number, received string",
      }
    `)
  })

  it('should format multiple errors', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })
    const data = { name: 42, age: 'John' }
    const result = schema.safeParse(data)
    expect(result.success).toBe(false)
    invariant(!result.success)
    expect(formatErrors(result.error)).toMatchInlineSnapshot(`
      {
        "age": "Expected number, received string",
        "name": "Expected string, received number",
      }
    `)
  })

  it('should remove duplicate errors', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })
    const data = { name: 42, age: 'John' }
    const result = schema.safeParse(data)
    expect(result.success).toBe(false)
    invariant(!result.success)
    const errors = formatErrors(result.error)
    expect(Object.keys(errors)).toHaveLength(2)
    expect(errors).toMatchInlineSnapshot(`
      {
        "age": "Expected number, received string",
        "name": "Expected string, received number",
      }
    `)
  })
})
