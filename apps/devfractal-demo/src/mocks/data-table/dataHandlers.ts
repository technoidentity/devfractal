import { fromSearchParams, toInt } from 'devfractal'
import { rest } from 'msw'

import { deleteRowFromTable, getDataFromTable } from './database'

export const dataHandlers = [
  rest.delete('/api/data/products/delete', (req, res, ctx) => {
    return res(
      ctx.json(deleteRowFromTable(toInt(req.url.searchParams.get('id')))),
    )
  }),

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
