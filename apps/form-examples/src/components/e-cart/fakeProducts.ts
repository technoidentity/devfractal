import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import type { Product } from './Product'
import { map, pipe, range, toArray } from '@srtp/fn'

export const categories = ['fashion', 'electronics', 'books', 'beauty']

export const createProduct = (): Product => {
  const newValue = faker.number.int({ min: 0, max: categories.length - 1 })
  return {
    id: uuidv4(),
    name: faker.lorem.sentence(3),
    price: faker.number.int({ min: 15, max: 120 }),
    quantity: faker.number.int({ min: 1, max: 20 }),
    category: categories[newValue],
  }
}

export const fakeProductList = (n: number): Product[] =>
  pipe(
    range(0, n),
    map(_ => createProduct()),
    toArray,
  )
