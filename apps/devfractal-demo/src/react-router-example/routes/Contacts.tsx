import {
  Form,
  Link,
  type Params,
  useLoaderData,
  useParams,
} from 'react-router-dom'
import { isContact } from '../types'
import { ErrorPage } from '../error pages/ErrorPage'

export function Contacts(): JSX.Element {
  const { id }: Params = useParams()
  const contact = useLoaderData()

  if (!isContact(contact)) {
    return <ErrorPage />
  }

  return (
    <main className="my-auto">
      <div className="flex w-[70%] flex-col justify-center gap-y-8 rounded-2xl bg-gray-100 py-16">
        <p className="text-2xl font-semibold">{contact.name}</p>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
        <p>{contact.website}</p>
        <div className="flex justify-evenly p-4">
          <Link
            to={`/contacts/${Number(id)}/edit`}
            className="rounded-full border bg-white px-4 py-2 text-lg "
          >
            Edit
          </Link>

          <Form action="/contacts/:id/destroy">
            <button className="rounded-full border bg-red-500 px-4 py-2 text-lg text-white">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </main>
  )
}
