import type { ProductsResponse } from '@/mocks/data-table/operations'

// @TODO: Clean up -> make fn to append query parameters to base url based on conditions
export const fetchProducts = async (
  page: number,
  limit: number,
  sortBy?: string,
  order?: 'asc' | 'desc',
  searchBy?: string,
  search?: string,
) => {
  const data: ProductsResponse = await (
    await fetch(
      `/api/data/products/?page=${page}&limit=${limit}${
        sortBy && order ? `&sortBy=${sortBy}&order=${order}` : ``
      }${searchBy && search ? `&searchBy=${searchBy}&search=${search}` : ``}`,
    )
  ).json()

  return data
}
