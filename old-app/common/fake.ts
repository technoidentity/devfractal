/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Chance } from 'chance'
import { map, range } from 'lodash-es'
import { number, string, type, TypeOf } from 'io-ts'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const chance = new Chance()

export const User = type({
  id: number,
  firstName: string,
  lastName: string,
  suffix: string,
  job: string,
})

// eslint-disable-next-line no-redeclare
export type User = TypeOf<typeof User>

export const fakeUsers = (n: number): readonly User[] =>
  map(range(n), () => ({
    id: chance.integer({ min: 1000, max: 1000000 }),
    firstName: chance.first(),
    lastName: chance.last(),
    suffix: chance.suffix(),
    job: chance.sentence({ words: 2 }),
  }))
