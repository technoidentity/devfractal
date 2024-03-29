import { faker } from '@faker-js/faker'
import { chain, map, range } from '@srtp/fn'
import { v4 as uuidv4 } from 'uuid'

import type { Product } from './ProductList'

export const categories = ['fashion', 'electronics', 'books', 'beauty']

export const createProduct = (): Product => {
  const newValue = faker.datatype.number({ min: 0, max: categories.length - 1 })
  return {
    id: uuidv4(),
    name: faker.lorem.sentence(3),
    price: faker.datatype.number({ min: 15, max: 120 }),
    quantity: faker.datatype.number({ min: 1, max: 20 }),
    category: categories[newValue],
  }
}

export const fakeProductList = (n: number): Product[] =>
  chain(
    range(0, n),
    map(_ => createProduct()),
  )
