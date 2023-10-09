import { products, type Products } from '@/server-side/products'
import { iorderBy } from '@/server-side/utils'

export type ProductsResponse = ReturnType<typeof getProducts>

// @TODO: Clean up

const getAllProducts = () => products

const getSlicedProducts = (page: number, limit: number) => {
  const endIndex = page * limit
  const startIndex = endIndex - limit

  return getAllProducts().slice(startIndex, endIndex)
}

const getOrderedProducts = (
  products: Products,
  key: keyof Products[number],
  order: 'asc' | 'desc',
) => {
  return iorderBy(products, key, order)
}

export const getProducts = (
  page: number,
  limit: number,
  sortKey: keyof Products[number],
  sortOrder: 'asc' | 'desc',
) => {
  if (!sortKey || !sortOrder) {
    return {
      products: getSlicedProducts(page, limit),
      currentPage: page,
      totalPages: Math.ceil(getAllProducts().length / limit),
    }
  }

  return {
    products: getOrderedProducts(
      getSlicedProducts(page, limit),
      sortKey,
      sortOrder,
    ),
    currentPage: page,
    totalPages: Math.ceil(getAllProducts().length / limit),
  }
}
