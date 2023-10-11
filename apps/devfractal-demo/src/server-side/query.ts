import { isDefined, keys, notNil } from 'devfractal'
import type { ProductsResponse } from '@/mocks/data-table/operations'

// @TODO: Clean up -> make fn to append query parameters to base url based on conditions
export async function fetchProducts(params: {
  page: number
  limit: number
  sortBy?: string
  order?: 'asc' | 'desc'
  searchBy?: string
  search?: string
}) {
  // @TODO: Move to utils?
  const fetchUrl = '/api/data/products/?'.concat(
    keys(params)
      .filter(key => isDefined(params[key]))
      .reduce((acc, key) => {
        const value = notNil(params[key])
        return (acc += `&${key}=${value.toString()}`)
      }, ''),
  )

  const data: ProductsResponse = await (await fetch(fetchUrl)).json()

  return data
}

// `/api/data/products/?page=${page}&limit=${limit}${
//         sortBy && order ? `&sortBy=${sortBy}&order=${order}` : ``
//       }${searchBy && search ? `&searchBy=${searchBy}&search=${search}` : ``}`
