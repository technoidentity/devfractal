import { epRoutes } from '@srtp/router'

import {
  AddContact,
  ContactDeletedMessage,
  ErrorPage,
  RootLayout,
  UpdateContact,
  ViewContact,
} from './components'

import { contactPaths, rootPath } from './paths'

const contactRoutes = epRoutes(contactPaths, {
  list: {
    element: <ViewContact />,
    errorElement: <ErrorPage />,
  },

  update: {
    element: <UpdateContact />,
  },

  remove: {
    element: <ContactDeletedMessage />,
  },

  add: {
    element: <AddContact />,
  },
})

const rootRoutes = epRoutes(rootPath, {
  root: {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: contactRoutes,
  },
})

export const routes = [rootRoutes[0]]
