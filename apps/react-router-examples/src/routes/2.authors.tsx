import { HStack } from '@chakra-ui/react'
import { NavLink, Outlet, RouteObject, useParams } from 'react-router-dom'

import { cast } from '@srtp/spec'
import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import wretch from 'wretch'
import { z } from 'zod'
import { For } from '../core'

const AuthorsSpec = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
)

const queryFn = ({ queryKey }: QueryFunctionContext) =>
  wretch(`/api/${queryKey.join('/')}`)
    .get()
    .json()

const authorsQuery = () => ({ queryKey: ['authors'], queryFn })

const Authors = () => {
  const { data } = useQuery(authorsQuery())
  const authors = cast(AuthorsSpec, data)

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

const BooksParamsSpec = z.object({ id: z.coerce.number().int() })
type BooksParams = z.infer<typeof BooksParamsSpec>

const booksQuery = ({ id }: BooksParams) => ({
  queryKey: ['authors', id, 'books'],
  queryFn: queryFn,
})

const AuthorBooks = () => {
  const params = useParams()
  const { data } = useQuery(booksQuery(cast(BooksParamsSpec, params)))

  const books = cast(BooksSpec, data)
  return (
    <ul>
      <For list={books} render={book => <li>{book.title}</li>} />
    </ul>
  )
}

export const authorsRouter: RouteObject = {
  path: 'authors',
  Component: Authors,
  children: [{ path: ':id/books', Component: AuthorBooks }],
}
