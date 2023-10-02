import type { ProductsResponse } from '@/mocks/data-table/operations'

export const fetchProducts = async (page: number, limit: number) => {
  const data: ProductsResponse = await (
    await fetch(`/api/data/products/?page=${page}&limit=${limit}`)
  ).json()

  return data
}
