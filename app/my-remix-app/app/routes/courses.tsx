import type { Course } from '@prisma/client'
import { json, LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

import { Dashboard } from '~/components/Dashboard'
import {
  getUserId,
  getUserSession,
  requireUserId,
} from '~/services/session.server'

type LoaderData = {
  courses: Course[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  console.log(userId)
  if (!userId) {
    return redirect('/')
  }
  const courses = await db.course.findMany()
  return json<LoaderData>({ courses })
}

const CourseList = () => {
  const { courses } = useLoaderData<LoaderData>()

  return <Dashboard courses={courses} />
}

export default CourseList
