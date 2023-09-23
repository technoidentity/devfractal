import { getUsers, loadRequest } from './api'
import { AddContact, addContact } from './routes/AddContact'
import { Contacts, deleteContactAction } from './routes/Contacts'
import { DeleteContact } from './routes/DeleteContact'
import { EditContact, editContact } from './routes/EditContact'
import { ErrorPage } from './routes/ErrorPage'
import { RootLayout } from './routes/RootLayout'

export const contactsRouter = [
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
        action: deleteContactAction,
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
      },
      {
        path: '/contacts/add',
        element: <AddContact />,
        action: addContact,
      },
    ],
  },
]
