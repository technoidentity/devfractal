/* eslint-disable @typescript-eslint/naming-convention */
import { HStack } from '@chakra-ui/react'

import type { RouteObject } from 'react-router-dom'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { z } from 'zod'
import { For, loader, useGet, useSafeParams } from '../core'

const AuthorsSpec = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
)

const authorsKey = 'authors'
const Authors = () => {
  const authors = useGet(AuthorsSpec, [authorsKey])

  return (
    <HStack align="flex-start" p="5" spacing="80">
      <ul>
        <For
          list={authors}
          render={author => (
            <li>
              <NavLink to={`/authors/${author.id}/books`}>
                {author.name}
              </NavLink>
            </li>
          )}
        />
      </ul>
      <Outlet />
    </HStack>
  )
}

const AuthorBooksSpec = z.array(
  z.object({
    id: z.number().int(),
    title: z.string(),
    year: z.coerce.number(),
    authorId: z.number(),
  }),
)

const ID = z.object({ id: z.coerce.number().int() })

const AuthorBooks = () => {
  const { id } = useSafeParams(ID)

  const books = useGet(AuthorBooksSpec, [authorsKey, id, 'books'])

  return (
    <ul>
      <For list={books} render={book => <li>{book.title}</li>} />
    </ul>
  )
}

export const authorsRouter: RouteObject = {
  path: 'authors',
  Component: Authors,
  loader,
  children: [
    {
      path: ':id/books',
      Component: AuthorBooks,
      loader,
    },
  ],
}
