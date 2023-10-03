import { epReactRoutes } from '@srtp/router'

import {
  AddContact,
  ContactDeleted,
  ErrorPage,
  RootLayout,
  UpdateContact,
  ViewContact,
} from './components'
import { contactsPaths, rootPath } from './paths'

const contactRoutes = epReactRoutes(contactsPaths, {
  one: {
    element: <ViewContact />,
    errorElement: <ErrorPage />,
  },

  update: {
    element: <UpdateContact />,
  },

  remove: {
    element: <ContactDeleted />,
  },

  add: {
    element: <AddContact />,
  },
})

const rootRoutes = epReactRoutes(rootPath, {
  list: {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: contactRoutes,
  },
})

export const routes = [rootRoutes[0]]
