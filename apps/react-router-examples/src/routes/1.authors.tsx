import { HStack } from '@chakra-ui/react'
import {
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  RouteObject,
  useLoaderData,
} from 'react-router-dom'

import { cast } from '@srtp/spec'
import wretch from 'wretch'
import { z } from 'zod'
import { For } from '../core'

const AuthorsSpec = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
)

const queryFn = ({ queryKey }: { queryKey: readonly unknown[] }) =>
  wretch(`/api/${queryKey.join('/')}`)
    .get()
    .json()

const authorsLoader = () => queryFn({ queryKey: ['authors'] })

const Authors = () => {
  const data = useLoaderData()
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

const booksLoader = (args: LoaderFunctionArgs) => {
  const params = cast(BooksParamsSpec, args.params)
  return queryFn({ queryKey: ['authors', params.id, 'books'] })
}

const AuthorBooks = () => {
  const data = useLoaderData()
  const books = cast(BooksSpec, data)

  return (
    <ul>
      <For list={books} render={book => <li>{book.title}</li>} />
    </ul>
  )
}

export const authorsRouter: RouteObject = {
  path: 'authors',
  loader: authorsLoader,
  Component: Authors,
  children: [
    { path: ':id/books', Component: AuthorBooks, loader: booksLoader },
  ],
}
