import { Button, HStack } from '@chakra-ui/react'
import type { RouteObject } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'

import React from 'react'
import { z } from 'zod'
import { For } from 'src/core'
import { loaderQueryCreator, queryClient, useSafeSearch } from '@srtp/router'

const AuthorsSpec = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
)

const getLoaders = loaderQueryCreator(queryClient, { base: '/api' })

const [authorsLoader, useAuthors] = getLoaders(
  { response: AuthorsSpec },
  () => ['authors'],
)

function useLogOnCommit(message: unknown) {
  React.useEffect(() => {
    console.log(message)
  })
}

const searchSpec = z.object({ name: z.string().optional() })

const Authors = () => {
  const [search, setSearch] = useSafeSearch(searchSpec)
  const [authors] = useAuthors()

  const handleSearch = () => {
    setSearch({ name: 'John' })
  }

  useLogOnCommit(search)

  return (
    <HStack align="flex-start" p="5" spacing="80">
      <Button onClick={handleSearch}>Search</Button>
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

const [booksLoader, useBooks] = getLoaders(
  {
    response: BooksSpec,
    params: z.object({ id: z.coerce.number().int() }),
  },
  ({ id }) => ['authors', id, 'books'],
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
