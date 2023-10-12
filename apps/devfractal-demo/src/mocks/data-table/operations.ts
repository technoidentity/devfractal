import { pick$ } from 'devfractal'
import { data, type Product, type Products } from '@/server-side/products'
import { iorderBy } from '@/server-side/utils'

export type ProductsResponse = {
  products: Products
  currentPage: number
  totalPages: number
  totalItems: number
  columns: string[]
}

const products: Products = []

// Load data
const intializeProducts = (): void => {
  products.push(...data)
}

intializeProducts()

// Operations

export const getSlicedProducts = (
  page: number,
  limit: number,
  columns: string[],
): ProductsResponse => {
  // @TODO: use paged from array methods
  const endIndex = page * limit
  const startIndex = endIndex - limit

  const totalPages = Math.ceil(products.length / limit)

  return {
    products: products
      .slice(startIndex, endIndex)
      .map(product =>
        pick$(product, ['id', ...(columns as (keyof Product)[])]),
      ),
    currentPage: page,
    totalPages,
    totalItems: products.length,
    columns,
  }
}

export const getSortedProducts = (
  page: number,
  limit: number,
  columns: string[],
  sortKey: keyof Product,
  order: 'asc' | 'desc',
): ProductsResponse => {
  const slicedResult = getSlicedProducts(page, limit, columns)

  return {
    ...slicedResult,
    products: iorderBy(slicedResult.products, sortKey, order),
  }
}

// @TODO: Function overloading?

export const getSearchedProducts = (
  page: number,
  limit: number,
  columns: string[],
  searchBy: keyof Product | 'all',
  search: string,
  sortKey?: keyof Product,
  order?: 'asc' | 'desc',
): ProductsResponse => {
  const result =
    sortKey && order
      ? getSortedProducts(page, limit, columns, sortKey, order)
      : getSlicedProducts(page, limit, columns)

  const products =
    searchBy !== 'all'
      ? result.products.filter(product =>
          product[searchBy]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
      : result.products.filter(product =>
          Object.values(product).some(value =>
            value.toString().toLowerCase().includes(search.toLowerCase()),
          ),
        )

  const totalPages = Math.ceil(products.length / limit)

  return {
    ...result,
    products,
    totalPages,
  }
}
