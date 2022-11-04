import { Center, Heading, SimpleGrid } from '@chakra-ui/react'
import type { Course } from '@prisma/client'
import { LoaderFunction,json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'


export const CoursePage = () => {
  console.log("helo")
  return (
    <>
    <Heading>Welcome</Heading>
    <div>
    <Outlet/>
    </div>
    </>
  )
}

export default CoursePage