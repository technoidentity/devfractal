import { toInt } from '@srtp/core'
import { rest } from 'msw'
import {
  addContact,
  deleteContact,
  editContactDetails,
  getContactById,
  getContacts,
} from './contacts'

export const handlers = [
  rest.get('/api/contacts', (_req, res, ctx) => {
    return res(ctx.json(getContacts()))
  }),

  rest.get('api/contacts/:id', (req, res, ctx) => {
    const { id } = req.params

    return res(ctx.json(getContactById(toInt(id))))
  }),

  rest.post('/api/add', async (req, res, ctx) => {
    const contact = await req.json()

    return res(ctx.json(addContact(contact)))
  }),

  rest.patch('/api/contacts/:id/edit', async (req, res, ctx) => {
    const update = await req.json()
    const { id } = req.params

    return res(ctx.json(editContactDetails(toInt(id), update)))
  }),

  rest.delete('/api/contacts/:id/delete', (req, res, ctx) => {
    const { id } = req.params

    return res(ctx.json(deleteContact(toInt(id))))
  }),
]
