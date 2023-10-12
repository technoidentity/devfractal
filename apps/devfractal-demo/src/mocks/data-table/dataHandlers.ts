import { fromSearchParams, isArray, isNotNullish, toInt } from 'devfractal'
import { rest } from 'msw'

import {
  getSearchedProducts,
  getSlicedProducts,
  getSortedProducts,
} from './operations'

export const dataHandlers = [
  rest.get('/api/data/products', (req, res, ctx) => {
    const queryParams = fromSearchParams(req.url.searchParams)

    if (
      isNotNullish(queryParams.searchBy) &&
      isNotNullish(queryParams.search)
    ) {
      return res(
        ctx.json(
          getSearchedProducts(
            toInt(queryParams.page),
            toInt(queryParams.limit),
            isArray(queryParams.column)
              ? queryParams.column
              : [queryParams.column],
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
            isArray(queryParams.column)
              ? queryParams.column
              : [queryParams.column],
            queryParams.sortBy,
            queryParams.order,
          ),
        ),
      )
    }

    return res(
      ctx.json(
        getSlicedProducts(
          toInt(queryParams.page),
          toInt(queryParams.limit),
          isArray(queryParams.column)
            ? queryParams.column
            : [queryParams.column],
        ),
      ),
    )
  }),
]
