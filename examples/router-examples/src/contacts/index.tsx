import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { getUsers, loadRequest } from './api'
import { AddContact, addContact } from './routes/AddContact'
import { Contacts } from './routes/Contacts'
import { DeleteContact, deleteContactAction } from './routes/DeleteContact'
import { EditContact, editContact } from './routes/EditContact'
import { ErrorPage } from './routes/ErrorPage'
import { RootLayout } from './routes/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: getUsers,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:id',
        element: <Contacts />,
        loader: loadRequest,
        errorElement: <ErrorPage />,
      },
      {
        path: '/contacts/:id/edit',
        element: <EditContact />,
        loader: loadRequest,
        action: editContact,
      },
      {
        path: '/contacts/:id/destroy',
        element: <DeleteContact />,
        action: deleteContactAction,
      },
      {
        path: '/contacts/add',
        element: <AddContact />,
        action: addContact,
      },
    ],
  },
])

export function ContactsApp(): JSX.Element {
  return <RouterProvider router={router} />
}
