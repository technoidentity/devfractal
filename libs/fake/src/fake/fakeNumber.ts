import { faker } from '@faker-js/faker'
import type { z, ZodNumberCheck } from 'zod'
import invariant from 'tiny-invariant'

type NumType = {
  min: number
  max: number
  multipleOf: number
  isInt: boolean
}

export function fakeNumber(spec: z.ZodTypeAny) {
  const type: string = spec._def.typeName
  invariant(type === 'ZodNumber')

  const checks: ZodNumberCheck[] = spec._def.checks
  let defaultValue: NumType = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    multipleOf: 1,
    isInt: false,
  }

  defaultValue = checks.reduce((Acc: NumType, item: ZodNumberCheck) => {
    if (item.kind === 'min') {
      Acc.min = item.inclusive ? item.value : item.value + 1
      return Acc
    } else if (item.kind === 'max') {
      Acc.max = item.inclusive ? item.value : item.value - 1
      return Acc
    } else if (item.kind === 'multipleOf') {
      Acc.multipleOf = item.value
      return Acc
    } else if (item.kind === 'int') {
      Acc.isInt = true
      return Acc
    } else {
      return Acc
    }
  }, defaultValue)

  if (defaultValue.max < defaultValue.min) {
    ;[defaultValue.min, defaultValue.max] = [defaultValue.max, defaultValue.min]
  }

  let result =
    defaultValue.isInt || Math.floor(Math.random() * 2) === 1
      ? faker.number.int({ min: defaultValue.min, max: defaultValue.max })
      : faker.number.float({ min: defaultValue.min, max: defaultValue.max })

  if (defaultValue.multipleOf !== 1) {
    result = faker.number.int({
      min: defaultValue.min,
      max: defaultValue.max,
    })
    result = result - (result % defaultValue.multipleOf)
  }

  return result
}