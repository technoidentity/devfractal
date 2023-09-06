import { http, safeFormData } from 'devfractal'
import { Form, Link, redirect, type LoaderFunctionArgs } from 'react-router-dom'
import { baseUrl } from '../data/common'
import { Contact } from '../types'

export const addContact = async ({
  request,
}: LoaderFunctionArgs): Promise<Response> => {
  const newContact = await safeFormData(Contact, request)

  await http.post(Contact, `${baseUrl}/users`, newContact)

  return redirect('/')
}

export function AddContact(): JSX.Element {
  return (
    <main className="my-auto w-[80%] text-lg text-black">
      <Form
        method="post"
        className="flex flex-col gap-y-4 rounded-2xl border bg-gray-100 py-16"
      >
        <div className="flex justify-between px-20">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            className="rounded-full px-4"
          />
        </div>

        <div className="flex justify-between px-20">
          <label htmlFor="phone">Contact:</label>
          <input
            type="text"
            placeholder="Contact"
            id="phone"
            name="contact"
            className="rounded-full px-4"
          />
        </div>

        <div className="flex justify-between px-20">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="rounded-full px-4"
          />
        </div>

        <div className="flex justify-between px-20">
          <label htmlFor="job">Title: </label>
          <input
            type="text"
            placeholder="Job"
            name="job"
            id="job"
            className="rounded-full px-4"
          />
        </div>

        <div className="mt-8 flex justify-evenly">
          <Link
            to="/"
            className="rounded-full border bg-blue-400 px-8 py-2 text-white"
          >
            Save
          </Link>
          <Link to="/" className="rounded-full bg-white px-4 py-2">
            Cancel
          </Link>
        </div>
      </Form>
    </main>
  )
}
