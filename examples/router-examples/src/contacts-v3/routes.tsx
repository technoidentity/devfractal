import { epReactRoutes } from '@srtp/router'

import {
  AddContact,
  ContactDeletedMessage,
  ErrorPage,
  RootLayout,
  UpdateContact,
  ViewContact,
} from './components'

import { contactPaths, rootPath } from './paths'

const contactRoutes = epReactRoutes(contactPaths, {
  contact: {
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

const rootRoutes = epReactRoutes(rootPath, {
  contacts: {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: contactRoutes,
  },
})

export const routes = [rootRoutes[0]]
