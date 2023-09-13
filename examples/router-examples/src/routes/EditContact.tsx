import { safeFormData } from '@srtp/router'
import { http } from '@srtp/web'
import { Form, Link, redirect, type LoaderFunctionArgs } from 'react-router-dom'

import { baseUrl } from '../data/common'
import { Contact } from '../types'
import { useContact, useIdParams } from './hooks'

export const editContact = async ({
  request,
}: LoaderFunctionArgs): Promise<Response> => {
  const updates = safeFormData(Contact, request)

  await http.post(Contact, `${baseUrl}/users`, updates)

  return redirect('/')
}

export function EditContact(): JSX.Element {
  const contact = useContact()
  const { id } = useIdParams()

  return (
    <main className="my-auto w-[80%] text-lg">
      <Form
        method="post"
        className="flex flex-col gap-y-4 rounded-2xl border bg-gray-100 py-16"
      >
        <div className="flex justify-between px-20">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            placeholder={contact.name}
            id="name"
            name="name"
            className="rounded-full px-4"
          />
        </div>

        <div className="flex justify-between px-20">
          <label htmlFor="phone">Contact:</label>
          <input
            type="text"
            placeholder={contact.phone}
            id="phone"
            name="contact"
            className="rounded-full px-4"
          />
        </div>

        <div className="flex justify-between px-20">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder={contact.email}
            id="email"
            name="email"
            className="rounded-full px-4"
          />
        </div>

        <div className="flex justify-between px-20">
          <label htmlFor="job">Title: </label>
          <input
            type="text"
            placeholder={contact.website}
            name="job"
            id="job"
            className="rounded-full px-4"
          />
        </div>

        <div className="mt-8 flex justify-evenly">
          <button
            type="submit"
            className="rounded-full border bg-blue-400 px-8 py-2 text-white"
          >
            Save
          </button>
          <Link
            to={`/contacts/${id}`}
            className="rounded-full bg-white px-4 py-2"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </main>
  )
}
