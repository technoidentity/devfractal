import { faker } from '@faker-js/faker'
import { z, type ZodStringCheck } from 'zod'
import { pipe, reduce } from '../../../fn/dist'

const defaultStringSpec = z.object({
  kind: z.string(),
  length: z.number(),
  min: z.number(),
  max: z.number(),
  position: z.union([z.number(), z.undefined()]),
  value: z.string(),
  offset: z.boolean(),
  precision: z.union([z.number(), z.null()]),
  version: z.union([z.literal('v4'), z.literal('v6'), z.undefined()]),
})

export function fakeString(schema: z.ZodTypeAny) {
  let defaultString: z.infer<typeof defaultStringSpec> = {
    kind: 'string',
    length: Math.floor(Math.random() * 10),
    min: 3,
    max: 5,
    position: undefined,
    value: '',
    offset: false,
    precision: null,
    version: 'v4',
  }

  const checks: ZodStringCheck[] = schema._def.checks

  defaultString = pipe(checks, reduce(reducer, defaultString))

  switch (defaultString.kind) {
    case 'length':
      return faker.lorem.word(defaultString.length)
    case 'max':
    case 'min':
      return faker.lorem.word({
        length: { min: defaultString.min, max: defaultString.max },
      })
    case 'url':
      return faker.internet.url()
    case 'uuid':
      return faker.string.uuid()
    case 'email':
      return faker.internet.email()
    case 'ip':
      return defaultString.version === 'v4'
        ? faker.internet.ipv4()
        : faker.internet.ipv6()
    case 'emoji':
      return faker.internet.emoji()
    default:
      return faker.lorem.word(Math.floor(Math.random() * 10))
  }
}

function reducer(acc: z.infer<typeof defaultStringSpec>, item: ZodStringCheck) {
  const type = item.kind
  switch (type) {
    case 'min': {
      acc.kind = 'min'
      acc.min = item.value
      return acc
    }
    case 'max': {
      acc.kind = 'max'
      acc.max = item.value
      return acc
    }
    case 'email': {
      acc.kind = 'email'
      return acc
    }
    case 'length': {
      acc.kind = 'length'
      acc.length = item.value
      return acc
    }
    case 'url': {
      acc.kind = 'url'
      return acc
    }
    case 'emoji': {
      acc.kind = 'emoji'
      return acc
    }
    case 'uuid': {
      acc.kind = 'uuid'
      return acc
    }
    case 'includes': {
      acc.kind = 'includes'
      acc.value = item.value.toString()
      return acc
    }
    case 'startsWith': {
      acc.kind = 'startsWith'
      acc.value = item.value.toString()
      return acc
    }
    case 'endsWith': {
      acc.kind = 'endsWith'
      acc.value = item.value.toString()
      return acc
    }
    case 'ip': {
      acc.kind = 'ip'
      acc.version = item.version
      return acc
    }
    case 'datetime': {
      acc.kind = 'datetime'
      acc.precision = item.precision
      return acc
    }
    case 'regex': {
      acc.kind = 'regex'
      acc.value = item.regex.toString()
      return acc
    }
    default:
      return acc
  }
}
