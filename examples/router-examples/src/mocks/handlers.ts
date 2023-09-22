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
  rest.get('https://jsonplaceholder.typicode.com', (_req, res, ctx) => {
    return res(ctx.json(getContacts()))
  }),

  rest.get(
    'https://jsonplaceholder.typicode.com/users/:id',
    (req, res, ctx) => {
      const { id } = req.params

      return res(ctx.json(getContactById(toInt(id))))
    },
  ),

  rest.post(
    'https://jsonplaceholder.typicode.com/users',
    async (req, res, ctx) => {
      const contact = await req.json()

      return res(ctx.json(addContact(contact)))
    },
  ),

  rest.patch(
    'https://jsonplaceholder.typicode.com/users/:id',
    async (req, res, ctx) => {
      const update = await req.json()
      const { id } = req.params

      return res(ctx.json(editContactDetails(toInt(id), update)))
    },
  ),

  rest.delete(
    'https://jsonplaceholder.typicode.com/users/:id',
    (req, res, ctx) => {
      const { id } = req.params

      return res(ctx.json(deleteContact(toInt(id))))
    },
  ),
]
