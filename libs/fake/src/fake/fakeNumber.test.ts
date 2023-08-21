import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'
import { fakeNumber } from './fakeNumber'



describe('fake', () => {
  test('number', () => {
    const sp1 = z.number().gt(5);
const sp2 = z.number().gte(5); // alias .min(5)
const sp3 = z.number().lt(5);
const sp4 = z.number().lte(5); // alias .max(5)

const sp5 = z.number().int(); // value must be an integer

const sp6 = z.number().positive(); //     > 0
const sp7 = z.number().nonnegative(); //  >= 0
const sp8 = z.number().negative(); //     < 0
const sp9 = z.number().nonpositive(); //  <= 0

const sp10 = z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)

const sp11 = z.number().finite(); // value must be finite, not Infinity or -Infinity
const sp12 = z.number().safe(); 
const sp13 = z.string()// val

    //const s = fake(schema)

    expect(() => sp1.parse(fakeNumber(sp1))).not.toThrow()
    expect(() => sp2.parse(fakeNumber(sp2))).not.toThrow()
    expect(() => sp3.parse(fakeNumber(sp3))).not.toThrow()
    expect(() => sp4.parse(fakeNumber(sp4))).not.toThrow()
    expect(() => sp5.parse(fakeNumber(sp5))).not.toThrow()
    expect(() => sp6.parse(fakeNumber(sp6))).not.toThrow()
    expect(() => sp7.parse(fakeNumber(sp7))).not.toThrow()
    expect(() => sp8.parse(fakeNumber(sp8))).not.toThrow()
    expect(() => sp9.parse(fakeNumber(sp9))).not.toThrow()
    expect(() => sp10.parse(fakeNumber(sp10))).not.toThrow()
    expect(() => sp11.parse(fakeNumber(sp11))).not.toThrow()
    expect(() => sp12.parse(fakeNumber(sp12))).not.toThrow()
    expect(() => sp13.parse(fakeNumber(sp13))).toThrow()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // vi.spyOn(global.console, 'warn').mockImplementation(() => {})
    // expect(() => fake(z.never()).parse(undefined)).toThrow()
    // expect(console.warn).toHaveBeenCalledTimes(1)
  })
})