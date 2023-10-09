import { isNotNull, pipe, toInt } from 'devfractal'
import { rest } from 'msw'
import { getProducts } from './operations'

// @TODO: omit redundant conditional
export const dataHandlers = [
  rest.get('/api/data/products', (req, res, ctx) => {
    const queryParams = pipe(req.url.searchParams.entries(), Object.fromEntries)

    const page = isNotNull(queryParams.page) ? toInt(queryParams.page) : 1
    const limit = isNotNull(queryParams.limit) ? toInt(queryParams.limit) : 10
    const key = isNotNull(queryParams.key) ? queryParams.key : 'title'
    const order = isNotNull(queryParams.order) ? queryParams.order : 'asc'

    return res(ctx.json(getProducts(page, limit, key, order)))
  }),
]
