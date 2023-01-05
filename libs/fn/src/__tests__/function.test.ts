/* eslint-disable @typescript-eslint/no-floating-promises */
import { isFloat } from '@srtp/core'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { delay, once, random } from '../function'

describe('function', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(global, 'setTimeout')
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  test('delay', () => {
    const mock = vi.fn()
    delay(mock, 1000)
    expect(mock).not.toBeCalled()
    vi.runAllTimers()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(mock).toBeCalledTimes(1)
  })
  test('once', () => {
    const mock = vi.fn()
    const fn = once(mock)
    fn()
    fn()
    fn()
    expect(mock).toBeCalledTimes(1)
  })
  test('isFloat', () => {
    expect(isFloat(0)).toBeFalsy()
    expect(isFloat(1)).toBeFalsy()
    expect(isFloat(-1)).toBeFalsy()
    expect(isFloat(0.5)).toBeTruthy()
    expect(isFloat(1.5)).toBeTruthy()
    expect(isFloat(-1.6)).toBeTruthy()
  })
  test('random', () => {
    expect(random(1, 5)).toBeGreaterThanOrEqual(1)
    expect(random(1, 5)).toBeLessThan(5)
    expect(isFloat(random(1, 5))).toBeFalsy()
    expect(isFloat(random(1, 5, true))).toBeTruthy()
    expect(isFloat(random(1.2, 5))).toBeTruthy()
    expect(isFloat(random(2, 5.3))).toBeTruthy()
    expect(random(2.2, 5.3)).toBeGreaterThanOrEqual(2.2)
    expect(random(2.2, 5.3)).toBeLessThan(5.3)
  })
})
