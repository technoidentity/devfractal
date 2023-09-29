import { searchRoutes } from '@srtp/router'

import {
  AddContact,
  ContactDeletedMessage,
  ErrorPage,
  RootLayout,
  UpdateContact,
  ViewContact,
  addContact,
} from './components'

import { remove, one, update, list } from './dataRouter'
import { contactPaths, rootPath } from './paths'

const contactRoutes = searchRoutes(contactPaths, {
  list: {
    element: <ViewContact />,
    loader: one,
    action: remove,
    errorElement: <ErrorPage />,
  },

  update: {
    element: <UpdateContact />,
    loader: one,
    action: update,
  },

  remove: {
    element: <ContactDeletedMessage />,
  },

  add: {
    element: <AddContact />,
    action: addContact,
  },
})

const rootRoutes = searchRoutes(rootPath, {
  root: {
    element: <RootLayout />,
    loader: list,
    action: remove,
    errorElement: <ErrorPage />,
    children: contactRoutes,
  },
})

export const routes = [rootRoutes[0]]
