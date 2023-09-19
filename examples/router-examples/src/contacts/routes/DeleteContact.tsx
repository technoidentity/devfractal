import { Link, type LoaderFunctionArgs } from 'react-router-dom'

import { api } from '../api'

export const deleteContactAction = async ({ params }: LoaderFunctionArgs) => {
  await api.del$(`users/${params['id']}`)
}

export function DeleteContact(): JSX.Element {
  return (
    <main className="p-16">
      <section className="flex flex-col gap-y-8">
        <div className="rounded-2xl border bg-gray-100 p-4 text-xl">
          Contact deleted!
        </div>
        <div>
          <Link
            to="/"
            className="rounded-full border bg-blue-500 px-4 py-2 text-lg text-white"
          >
            Home
          </Link>
        </div>
      </section>
    </main>
  )
}
