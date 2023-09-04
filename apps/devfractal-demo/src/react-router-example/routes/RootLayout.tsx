import { Link, Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import { ContactList } from './ContactList'
import { isContactArray } from '../types'
import { ErrorPage } from '../error pages/ErrorPage'

export function RootLayout(): JSX.Element {
  const contacts = useLoaderData()
  const submit = useSubmit()

  if (!isContactArray(contacts)) {
    return <ErrorPage />
  }

  return (
    <aside className="grid grid-cols-2 px-2 text-center text-black">
      <section className="w-[70%]">
        <form className="space-x-4 border-2 bg-gray-100 p-4">
          <label>
            <input
              className="w-[80%] rounded-full border px-4 py-2"
              type="search"
              name="search"
              placeholder="Search..."
              onChange={e => {
                submit(e.currentTarget.form)
              }}
            />
          </label>
          <Link
            to="/contacts/add"
            className="rounded-lg border bg-white px-4 py-2"
          >
            New
          </Link>
        </form>

        <ContactList contacts={contacts} />
      </section>
      <Outlet />
    </aside>
  )
}
