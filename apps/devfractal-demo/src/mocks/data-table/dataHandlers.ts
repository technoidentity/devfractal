import { isNotNull, toInt } from 'devfractal'
import { rest } from 'msw'
import { getProducts } from './operations'

export const dataHandlers = [
  rest.get('/api/data/products', (req, res, ctx) => {
    const page = isNotNull(req.url.searchParams.get('page'))
      ? toInt(req.url.searchParams.get('page'))
      : 1
    const limit = isNotNull(req.url.searchParams.get('limit'))
      ? toInt(req.url.searchParams.get('limit'))
      : 10

    return res(ctx.json(getProducts(page, limit)))
  }),
]
