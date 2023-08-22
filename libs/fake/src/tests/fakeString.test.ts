import { describe, expect, test } from 'vitest'
import { z } from 'zod'
import { fakeString } from '../fake/fakeString'

describe('fake', () => {
  test('string', () => {
    const spec1 = z.string().max(5)
    const spec2 = z.string().min(5)
    const spec3 = z.string().length(6)
    const spec4 = z.string().email()
    const spec5 = z.string().url()
    const spec6 = z.string().emoji()
    const spec7 = z.string().uuid()
    const spec10 = z.string().ip()
    const spec11 = z.number()
    const spec12 = z.string().ip({ version: "v4" })

    expect(() => spec1.parse(fakeString(spec1))).not.toThrow()
    expect(() => spec2.parse(fakeString(spec2))).not.toThrow()
    expect(() => spec3.parse(fakeString(spec3))).not.toThrow()
    expect(() => spec4.parse(fakeString(spec4))).not.toThrow()
    expect(() => spec5.parse(fakeString(spec5))).not.toThrow()
    expect(() => spec6.parse(fakeString(spec6))).not.toThrow()
    expect(() => spec7.parse(fakeString(spec7))).not.toThrow()
    expect(() => spec10.parse(fakeString(spec10))).not.toThrow()
    expect(() => spec12.parse(fakeString(spec12))).not.toThrow()
    expect(() => spec11.parse(fakeString(spec11))).toThrow()
  })
})
