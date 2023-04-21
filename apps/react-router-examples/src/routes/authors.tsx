/* eslint-disable @typescript-eslint/naming-convention */
import { HStack } from '@chakra-ui/react'

import type { LoaderFunctionArgs, RouteObject } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'
import { z } from 'zod'
import { For } from '../core/For'
import { loader, useGet } from '../core/useGet'

const AuthorsSpec = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
)

const Authors = () => {
  const authors = useGet(AuthorsSpec)

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
    id: z.number(),
    title: z.string(),
    year: z.number(),
    authorId: z.number(),
  }),
)

const getQueryKey = (params: LoaderFunctionArgs['params']) =>


const AuthorBooks = () => {
  const books = useGet(AuthorBooksSpec)

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

