/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { fake } from './fake'
const Gender = z.enum(['male', 'female'])

enum ColorEnum {
  Red = 100,
  Green = 200,
  Blue = 300,
}

const Color = z.nativeEnum(ColorEnum)

const person = z.object({
  id: z.string().uuid(),
  employed: z.boolean(),
  age: z.number().int(),
  name: z
    .string()
    .refine(x => x)
    .transform(x => x),
  // dateOfBirth: z.date(),
  foo: z
    .string()
    .transform(val => val.length)
    .pipe(z.number().min(5)),
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

const schema = z.tuple([
  Color,
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
  z.object({ x: z.number(), y: z.boolean() }).partial(),
  z.promise(z.string()),
  z.string().default('hello'),
  foobar,
])

describe('fake', () => {
  test('object', () => {
    faker.seed(123)

    const p = fake(person)
    const s = fake(schema)

    expect(p).toMatchInlineSnapshot(`
      {
        "address": [
          {
            "city": "Zachary Farrell",
            "state": "Ora Runolfsson",
            "street": "Dan Johnson",
            "zip": "Andre Keeling",
          },
          {
            "city": "Cecil Trantow",
            "state": "Dwayne Kohler",
            "street": "Lori Blick",
            "zip": "Gerald Hamill",
          },
          {
            "city": "Glenda Yost",
            "state": "Brad Rolfson",
            "street": "Kristine Von",
            "zip": "Angelina Mitchell",
          },
          {
            "city": "Dr. Tonya Parker",
            "state": "Mabel Ortiz",
            "street": "Andre Altenwerth",
            "zip": "Jake Glover",
          },
          {
            "city": "Doyle Davis",
            "state": "Becky Boyer",
            "street": "Taylor Boehm",
            "zip": "Carlos VonRueden",
          },
          {
            "city": "Hugh Goyette",
            "state": "Willis Hamill",
            "street": "Joseph Mertz",
            "zip": "Ramiro Erdman",
          },
          {
            "city": "Sue Feeney",
            "state": "Jeanne Purdy",
            "street": "Sophie Spinka",
            "zip": "Robert Nienow",
          },
          {
            "city": "Jeanne Fisher",
            "state": "Cristina Barrows",
            "street": "Sherri Pouros Sr.",
            "zip": "Jack Christiansen II",
          },
        ],
        "age": 18,
        "employed": false,
        "foo": "Mr. Cecil Gulgowski",
        "gender": "female",
        "id": "bb463b8b-b76c-4f6a-a972-665ab5730b69",
        "name": "Bonnie Lemke",
      }
    `)
    expect(s).toMatchInlineSnapshot(`
      [
        300,
        19,
        Map {
          "Olga Steuber" => 38,
          "Mr. Bill Hermann" => 42,
          "Jeffrey Kris" => 52,
          "Tracy Hagenes" => 92,
          "Lyle Heller" => 54,
          "Arlene Grady II" => 99,
          "Jesus Maggio" => 81,
          "Mrs. Elsie Renner" => 16,
          "Santos Heller PhD" => 8,
        },
        {},
        Set {
          "Gladys Klein V",
          "Dr. Frances Gulgowski",
          "Miriam Koch",
          "Javier Lang",
        },
        undefined,
        null,
        false,
        84,
        "foo",
        {
          "x": "Ms. Louise Sauer",
          "y": 69,
        },
        {
          "x": 30,
          "y": false,
        },
        Promise {},
        "Gretchen Predovic",
        {
          "foo": "Charlene Runolfsdottir",
          "type": "foo",
        },
      ]
    `)

    expect(() => person.parse(p)).not.toThrow()
    expect(() => schema.parse(s)).not.toThrow()

    expect(() => fake(z.never()).parse(undefined)).toThrow()
  })
})
