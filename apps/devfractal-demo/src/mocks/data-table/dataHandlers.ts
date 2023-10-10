import { isNotNullish, pipe, toInt } from 'devfractal'
import { rest } from 'msw'
import {
  getSearchedProducts,
  getSlicedProducts,
  getSortedProducts,
} from './operations'

import type { Product } from '@/server-side/products'

// @TODO: omit redundant conditional
export const dataHandlers = [
  rest.get('/api/data/products', (req, res, ctx) => {
    const queryParams = pipe(req.url.searchParams.entries(), Object.fromEntries)

    if (
      isNotNullish(queryParams.searchBy) &&
      isNotNullish(queryParams.search)
    ) {
      return res(
        ctx.json(
          getSearchedProducts(
            toInt(queryParams.page),
            toInt(queryParams.limit),
            queryParams.searchBy,
            queryParams.search,
            queryParams.sortBy,
            queryParams.order,
          ),
        ),
      )
    }

    if (isNotNullish(queryParams.sortBy) && isNotNullish(queryParams.order)) {
      return res(
        ctx.json(
          getSortedProducts(
            toInt(queryParams.page),
            toInt(queryParams.limit),
            queryParams.sortBy as keyof Product,
            queryParams.order,
          ),
        ),
      )
    }

    return res(
      ctx.json(
        getSlicedProducts(toInt(queryParams.page), toInt(queryParams.limit)),
      ),
    )
  }),
]
