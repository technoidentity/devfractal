import { HStack } from '@chakra-ui/react'
import type { RouteObject } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'

import type { QueryFunctionContext } from '@tanstack/react-query'
import { z } from 'zod'
import { For, api } from '@core'
import { loaderQuery, queryClient } from '@srtp/router'

const AuthorsSpec = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
)

const queryFn = ({ queryKey }: QueryFunctionContext) =>
  api.get(`/api/${queryKey.join('/')}`)

const [authorsLoader, useAuthors] = loaderQuery(
  queryClient,
  { response: AuthorsSpec },
  () => ({ queryKey: ['authors'], queryFn }),
)

const Authors = () => {
  const [authors] = useAuthors()

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

const BooksSpec = z.array(
  z.object({
    id: z.number().int(),
    title: z.string(),
    year: z.coerce.number(),
    authorId: z.number(),
  }),
)

const [booksLoader, useBooks] = loaderQuery(
  queryClient,
  {
    response: BooksSpec,
    params: z.object({ id: z.coerce.number().int() }),
  },
  ({ id }) => ({ queryKey: ['authors', id, 'books'], queryFn }),
)

const AuthorBooks = () => {
  const [books] = useBooks()

  return (
    <ul>
      <For list={books} render={book => <li>{book.title}</li>} />
    </ul>
  )
}

export const authorsRouter: RouteObject = {
  path: 'authors',
  Component: Authors,
  loader: authorsLoader,
  children: [
    { path: ':id/books', Component: AuthorBooks, loader: booksLoader },
  ],
}
