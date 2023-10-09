import type { ProductsResponse } from '@/mocks/data-table/operations'
// @TODO: make fn to append query parameters to base url
export const fetchProducts = async (
  page: number,
  limit: number,
  key: string,
  order: 'asc' | 'desc',
) => {
  const data: ProductsResponse = await (
    await fetch(
      `/api/data/products/?page=${page}&limit=${limit}&key=${key}&order=${order}`,
    )
  ).json()

  return data
}
