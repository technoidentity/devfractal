import type { Course } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

import { Dashboard } from '~/components/Dashboard'
import Unauthorized from '~/components/UnAuthorized'
import { getUserId } from '~/services/session.server'

type LoaderData = {
  courses: Course[]
  userId: string | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (!userId) {
    return null
  } else {
    const courses = await db.course.findMany()
    return json<LoaderData>({ courses, userId })
  }
}

const CourseList = () => {
  const data = useLoaderData<LoaderData>()

  return data !== null ? <Dashboard courses={data.courses} /> : <Unauthorized />
}

export default CourseList
