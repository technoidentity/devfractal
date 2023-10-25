import { fromSearchParams } from 'devfractal'
import { rest } from 'msw'

import { getDataFromTable } from './database'

export const dataHandlers = [
  rest.get('/api/data/products', (req, res, ctx) => {
    const queryParams = fromSearchParams(req.url.searchParams)
    const { show, column, page, limit, sortBy, order, searchBy, search } =
      queryParams

    return res(
      ctx.json(
        getDataFromTable({
          show,
          column,
          page,
          limit,
          sortBy,
          order,
          searchBy,
          search,
        }),
      ),
    )
  }),
]
