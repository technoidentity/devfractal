import { rest } from 'msw'
import { products } from '@/server-side/products'

export const dataHandlers = [
  rest.get('/api/data/products', (_req, res, ctx) => {
    return res(ctx.json(products))
  }),
]
