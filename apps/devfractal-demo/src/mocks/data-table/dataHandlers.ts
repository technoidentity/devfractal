import { fromSearchParams, isArray, isNotNullish, toInt } from 'devfractal'
import { rest } from 'msw'

import { data } from '@/server-side/products'

import {
  getSearchedProducts,
  getSelectedColumns,
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
            queryParams.show,
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
            queryParams.show,
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

    if (
      queryParams.show === 'paged' &&
      isNotNullish(queryParams.page) &&
      isNotNullish(queryParams.limit)
    ) {
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
    }

    // @TODO: Correct -> modify function definition
    return res(ctx.json(getSelectedColumns(data, queryParams.column)))
  }),
]
