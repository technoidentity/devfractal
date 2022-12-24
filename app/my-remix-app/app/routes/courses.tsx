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
import Unauthorized from '~/components/UnAuthorized'

type LoaderData = {
  courses: Course[]
  userId: string | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  console.log(userId)
  if (!userId) {
    return null
  } else {
    const courses = await db.course.findMany()
    return json<LoaderData>({ courses, userId })
  }
}

const CourseList = () => {
  const data = useLoaderData<LoaderData>()
  console.log('unauth')

  return data !== null ? <Dashboard courses={data.courses} /> : <Unauthorized />
}

export default CourseList
