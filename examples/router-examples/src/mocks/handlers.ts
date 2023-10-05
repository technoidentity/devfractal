import { isNotNull, toInt } from '@srtp/core'
import { rest } from 'msw'
import {
  addContact,
  deleteContact,
  editContactDetails,
  getContactById,
  getContacts,
  searchContact,
} from './contacts'

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    const searchText = req.url.searchParams.get('search')

    if (isNotNull(searchText) && searchText) {
      return res(ctx.json(searchContact(searchText)))
    }

    return res(ctx.json(getContacts()))
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params

    return res(ctx.json(getContactById(toInt(id))))
  }),

  rest.post('/api/users', async (req, res, ctx) => {
    const { name, email, phone, website } = await req.json()

    return res(ctx.json(addContact({ name, email, phone, website })))
  }),

  rest.patch('/api/users/:id', async (req, res, ctx) => {
    const update = await req.json()
    const { id } = req.params

    return res(ctx.json(editContactDetails(toInt(id), update)))
  }),

  rest.delete('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params

    return res(ctx.json(deleteContact(toInt(id))))
  }),
]
