/* eslint-disable @typescript-eslint/ban-types */
import { describe, expectTypeOf, test } from 'vitest'

import {
  AllOrNothing,
  type Booleanify,
  type ExactKeys,
  type IsDefined,
  type IsEmptyObject,
  type IsEqual,
  type IsNever,
  type IsNonEmptyObject,
  type IsNullish,
  type IsSimilar,
  type IsUndefined,
  type KeyOf,
  type MakeUndefinedOptional,
  type MergeUnion,
  type OptionalIfEmpty,
  type PickDefined,
  type PickRequired,
  type Prettify,
  type RemoveIfEmpty,
  type RequiredKeys,
  type Stringify,
  type Tail,
} from './types'

describe('types', () => {
  test('MergeUnion', () => {
    expectTypeOf<
      MergeUnion<{ a: number } | { b: string; c?: any[] }>
    >().toEqualTypeOf<{ a: number; b: string; c?: any[] }>()
  })

  test('Prettify', () => {
    expectTypeOf<
      Prettify<{ a: number } & { b: string } & { c?: any[] } & { d: number }>
    >().toEqualTypeOf<{ a: number; b: string; c?: any[]; d: number }>()
  })

  test('PickDefined', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = PickDefined<T>
    type Expected = { a: number; b: string }
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()

    type Actual2 = PickDefined<{ a?: number; b?: string }>
    type Expected2 = {}
    expectTypeOf<Actual2>().toEqualTypeOf<Expected2>()

    type Actual3 = PickDefined<{ a: number; b: string; c: any[] }>
    type Expected3 = { a: number; b: string; c: any[] }
    expectTypeOf<Actual3>().toEqualTypeOf<Expected3>()
  })

  test('RequiredKeys', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = RequiredKeys<T>
    type Expected = 'a' | 'b'
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()
  })

  test('IsSame', () => {
    type T = { a: number; b: string; c?: any[] }
    expectTypeOf<IsSimilar<T, T>>().toEqualTypeOf<true>()

    expectTypeOf<IsSimilar<T, { a: number; b: string }>>().toEqualTypeOf<true>()

    expectTypeOf<
      IsSimilar<T, { a: number; b: string; c: any[] }>
    >().toEqualTypeOf<false>()

    expectTypeOf<
      IsSimilar<T, { a: number; c?: any[] }>
    >().toEqualTypeOf<false>()
  })

  test('IsEqual', () => {
    type T = { a: number; b: string; c?: any[]; (x: number): void }

    expectTypeOf<IsEqual<T, T>>().toEqualTypeOf<true>()

    expectTypeOf<IsEqual<T, { a: number; b: string }>>().toEqualTypeOf<false>()

    expectTypeOf<
      IsEqual<T, { a: number; b: string; c: any[] }>
    >().toEqualTypeOf<false>()

    expectTypeOf<IsEqual<T, { a: number; c?: any[] }>>().toEqualTypeOf<false>()

    expectTypeOf<
      IsEqual<T, { a: number; b: string; c?: any[]; (x: number): void }>
    >().toEqualTypeOf<true>()
  })

  test('OptionalIfEmpty', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = OptionalIfEmpty<T, number>
    type Expected = (options: T) => number
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()

    type Actual2 = OptionalIfEmpty<{}, number>
    type Expected2 = (options?: {}) => number
    expectTypeOf<Actual2>().toEqualTypeOf<Expected2>()

    type T3 = { a?: number; b?: string; c?: any[] }
    type Actual3 = OptionalIfEmpty<T3, number>
    type Expected3 = (options?: T3) => number
    expectTypeOf<Actual3>().toEqualTypeOf<Expected3>()

    type Actual4 = OptionalIfEmpty<undefined, number>
    type Expected4 = (options?: undefined) => number
    expectTypeOf<Actual4>().toEqualTypeOf<Expected4>()
  })

  test('Stringify', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = Stringify<T>
    type Expected = { a: string; b: string; c?: string }
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()
  })

  test('Boolify', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = Booleanify<T>
    type Expected = { a: boolean; b: boolean; c?: boolean }
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()
  })

  test('Tail', () => {
    type Actual = Tail<[number, string, boolean]>
    type Expected = [string, boolean]
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()

    type Actual2 = Tail<[number]>
    type Expected2 = []
    expectTypeOf<Actual2>().toEqualTypeOf<Expected2>()

    type Actual3 = Tail<[]>
    type Expected3 = []
    expectTypeOf<Actual3>().toEqualTypeOf<Expected3>()
  })

  test('PickRequired', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = PickRequired<T>
    type Expected = { a: number; b: string }
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()

    type Actual2 = PickRequired<{ a?: number; b?: string }>
    type Expected2 = {}
    expectTypeOf<Actual2>().toEqualTypeOf<Expected2>()

    type Actual3 = PickRequired<{ a: number; b: string; c: any[] }>
    type Expected3 = { a: number; b: string; c: any[] }
    expectTypeOf<Actual3>().toEqualTypeOf<Expected3>()
  })

  test('RemoveEmptyFn', () => {
    type T = { a: number; b: string; c?: any[] }
    type Actual = RemoveIfEmpty<T, number>
    type Expected = (args: T) => number
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()

    type Actual3 = RemoveIfEmpty<{}, number>
    type Expected3 = () => number
    expectTypeOf<Actual3>().toEqualTypeOf<Expected3>()
  })

  test('KeyOf', () => {
    const s = Symbol()

    type T = {
      a: number
      b: string
      c?: any[]
      [x: number]: number
      [s]: number
    }
    expectTypeOf<keyof T>().toEqualTypeOf<'a' | 'b' | 'c' | number | typeof s>()
    expectTypeOf<KeyOf<T>>().toEqualTypeOf<'a' | 'b' | 'c'>()
    expectTypeOf<KeyOf<{}>>().toEqualTypeOf<never>()
  })

  test('MakeUndefinedOptional', () => {
    type T = { a: number; b: string; c: any[] | undefined }
    type Actual = MakeUndefinedOptional<T>
    type Expected = { a: number; b: string; c?: any[] | undefined }
    expectTypeOf<Actual>().toEqualTypeOf<Expected>()

    type T2 = { a: number; b: string; c?: any[] | undefined }
    type Actual2 = MakeUndefinedOptional<T2>
    type Expected2 = { a: number; b: string; c?: any[] }
    expectTypeOf<Actual2>().toEqualTypeOf<Expected2>()

    expectTypeOf<MakeUndefinedOptional<{}>>().toEqualTypeOf<{}>()
  })

  test('is', () => {
    expectTypeOf<IsEmptyObject<{}>>().toEqualTypeOf<true>()
    expectTypeOf<IsEmptyObject<{ a: number }>>().toEqualTypeOf<false>()
    expectTypeOf<IsEmptyObject<{ a?: number }>>().toEqualTypeOf<false>()

    expectTypeOf<IsNonEmptyObject<{}>>().toEqualTypeOf<false>()
    expectTypeOf<IsNonEmptyObject<{ a: number }>>().toEqualTypeOf<true>()
    expectTypeOf<IsNonEmptyObject<{ a?: number }>>().toEqualTypeOf<true>()

    expectTypeOf<IsUndefined<undefined>>().toEqualTypeOf<true>()
    expectTypeOf<IsUndefined<null>>().toEqualTypeOf<false>()
    expectTypeOf<IsUndefined<{}>>().toEqualTypeOf<false>()
    expectTypeOf<IsUndefined<{ a?: number }>>().toEqualTypeOf<false>()

    expectTypeOf<IsDefined<undefined>>().toEqualTypeOf<false>()
    expectTypeOf<IsDefined<null>>().toEqualTypeOf<true>()
    expectTypeOf<IsDefined<{}>>().toEqualTypeOf<true>()

    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>()
    expectTypeOf<IsNever<undefined>>().toEqualTypeOf<false>()
    expectTypeOf<IsNever<{}>>().toEqualTypeOf<false>()

    expectTypeOf<IsNullish<null>>().toEqualTypeOf<true>()
    expectTypeOf<IsNullish<undefined>>().toEqualTypeOf<true>()
    expectTypeOf<IsNullish<{}>>().toEqualTypeOf<false>()
  })

  // test('GetArgOptional', () => {
  //   type T = { a: number; b: string; c?: any[] }
  //   type Actual = GetOptionalArg<T, 'a'>
  //   type Expected = { a: number }
  //   expectTypeOf<Actual>().toEqualTypeOf<Expected>()

  //   type Actual2 = GetOptionalArg<T, 'c'>
  //   type Expected2 = { c?: any[] }
  //   expectTypeOf<Actual2>().toEqualTypeOf<Expected2>()

  //   type Actual3 = GetOptionalArg<T, 'd'>
  //   type Expected3 = { d?: undefined }
  //   expectTypeOf<Actual3>().toEqualTypeOf<Expected3>()
  // })

  test('ExactKeys', () => {
    type T = { a: number; b: string; c?: any[] }
    type U = { a: number; b: string; c: any[] }

    expectTypeOf<ExactKeys<T, U>>().toEqualTypeOf<{
      a: number
      b: string
      c?: any[]
    }>()

    expectTypeOf<ExactKeys<U, T>>().toEqualTypeOf<{
      a: number
      b: string
      c: any[]
    }>()

    expectTypeOf<ExactKeys<{ a: number; b: string }, T>>().toEqualTypeOf<{
      a: number
      b: string
    }>()

    expectTypeOf<ExactKeys<T, { a: number; b: string }>>().toEqualTypeOf<{
      a: number
      b: string
    }>()
  })
})
