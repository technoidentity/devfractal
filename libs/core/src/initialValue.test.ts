/* eslint-disable @typescript-eslint/naming-convention */
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { initialValue } from './initialValue'
import { cast } from './spec'
const Gender = z.enum(['male', 'female'])

enum ColorEnum {
  Red = 100,
  Green = 200,
  Blue = 300,
}

const Color = z.nativeEnum(ColorEnum)

const person = z.object({
  id: z.string(),
  employed: z.boolean(),
  age: z.number().int(),
  name: z.string().transform(x => x),
  // dateOfBirth: z.date(),
  foo: z
    .string()
    .transform(val => val.length)
    .pipe(z.number()),
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

const foobar = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('foo'),
    foo: z.string(),
  }),
  z.object({
    type: z.literal('bar'),
    bar: z.number(),
  }),
])

const schema = z.object({
  a: Color,
  b: z.union([z.string(), z.number()]),
  c: z.map(z.string(), z.number()),
  d: z.record(z.string(), z.number()),
  e: z.set(z.string()),
  f: z.undefined(),
  g: z.null(),
  h: z.any(),
  i: z.unknown(),
  j: z.literal('foo'),
  k: z.intersection(z.object({ x: z.string() }), z.object({ y: z.number() })),
  l: z.object({ x: z.number(), y: z.boolean() }).partial(),
  m: z.promise(z.string()),
  n: z.string().default('hello'),
  o: foobar,
  p: z.tuple([z.string(), z.number()]),
})

describe('initialValue', () => {
  test('object', () => {
    const p = initialValue(person)
    const s = initialValue(schema)

    expect(p).toMatchInlineSnapshot(`
      {
        "address": [],
        "age": 0,
        "employed": false,
        "foo": "",
        "gender": "male",
        "id": "",
        "name": "",
      }
    `)

    expect(s).toMatchInlineSnapshot(`
      {
        "a": 100,
        "b": "",
        "c": Map {},
        "d": {},
        "e": Set {},
        "f": undefined,
        "g": null,
        "h": "",
        "i": "",
        "j": "foo",
        "k": {
          "x": "",
          "y": 0,
        },
        "l": {
          "x": 0,
          "y": false,
        },
        "m": Promise {},
        "n": "hello",
        "o": {
          "foo": "",
          "type": "foo",
        },
        "p": [
          "",
          0,
        ],
      }
    `)

    expect(() => cast(person, p)).not.toThrow()
    expect(() => cast(schema, s)).not.toThrow()
  })
})
