import { isDefined, keys, pick$, urlcat } from 'devfractal'

import type { ProductsResponse } from '@/mocks/data-table/database'

export async function fetchProducts(params: {
  show: 'all' | 'paged'
  page?: number
  limit?: number
  column: string[]
  sortBy?: string
  order?: 'asc' | 'desc'
  searchBy?: string
  search?: string
}) {
  const urlParams = pick$(
    params,
    keys(params).filter(key => isDefined(params[key])),
  )
  const fetchUrl = urlcat('/api/data/products/', '', { ...urlParams })

  const data: ProductsResponse = await (await fetch(fetchUrl)).json()

  return data
}
