import { products } from '@/server-side/products'

export type ProductsResponse = ReturnType<typeof getProducts>

const getAllProducts = () => products

export const getProducts = (page: number, limit: number) => {
  const endIndex = page * limit
  const startIndex = endIndex - limit

  return {
    products: getAllProducts().slice(startIndex, endIndex),
    currentPage: page,
    totalPages: Math.ceil(getAllProducts().length / limit),
  }
}
