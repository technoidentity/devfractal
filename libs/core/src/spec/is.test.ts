import { isDate } from 'util/types'

import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import {
  isArray,
  isBool,
  isDefined,
  isFloat,
  isFunction,
  isInt,
  isNil,
  isNilSpec,
  isNull,
  isStr,
  isUndefined,
} from './is'

describe('is', () => {
  test('isNilSpec', () => {
    expect(isNilSpec(z.null())).toBe(true)
    expect(isNilSpec(z.undefined())).toBe(true)
    expect(isNilSpec(z.never())).toBe(true)
    expect(isNilSpec(z.void())).toBe(true)
    expect(isNilSpec(z.undefined().nullable())).toBe(true)
    expect(isNilSpec(z.number().nullish())).toBe(false)
    expect(isNilSpec(z.number().optional())).toBe(false)
    expect(isNilSpec(z.null().optional())).toBe(true)
  })

  test('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray({})).toBe(false)
    expect(isArray(1)).toBe(false)
  })

  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
  })

  test('isDefined', () => {
    expect(isDefined(undefined)).toBe(false)
    expect(isDefined(null)).toBe(true)
    expect(isDefined(1)).toBe(true)
  })

  test('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isNull(1)).toBe(false)
  })

  test('isNil', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(1)).toBe(false)
  })

  test('isStr', () => {
    expect(isStr('')).toBe(true)
    expect(isStr(1)).toBe(false)
    expect(isStr('1')).toBe(true)
  })

  test('isFloat', () => {
    expect(isFloat(1.1)).toBe(true)
    expect(isFloat(1)).toBe(false)
    expect(isFloat('1')).toBe(false)
  })

  test('isBool', () => {
    expect(isBool(true)).toBe(true)
    expect(isBool(false)).toBe(true)
    expect(isBool(1)).toBe(false)
  })

  test('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction({})).toBe(false)
  })

  test('isDate', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate({})).toBe(false)
  })

  test('isInt', () => {
    expect(isInt(1)).toBe(true)
    expect(isInt(1.1)).toBe(false)
    expect(isInt('1')).toBe(false)
  })

  test('isPromise', () => {
    expect(Promise.resolve(100)).toBe(true)
    expect(Promise.reject(100)).toBe(true)
    expect({ then: () => {}, catch: () => {} }).toBe(false)
  })
})
