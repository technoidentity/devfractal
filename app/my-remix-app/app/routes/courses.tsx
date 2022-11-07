import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import type { Course } from '@prisma/client'
import { LoaderFunction, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'
import { db } from '~/utils/db.server'

type LoaderData = {
  courses: Course[]
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { failureRedirect: '/' })
  const courses = await db.course.findMany()
  return json<LoaderData>({ courses })
}

const CourseList = () => {
  const { courses } = useLoaderData<LoaderData>()
  return (
    <>
      <Center>
        <Heading>Courses</Heading>
      </Center>
      <SimpleGrid columns={[2, null, 3]} spacing="20px">
        {courses.map(course => (
          <Container mt="10" key={course.id}>
            <Box
              boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
               0 0  0 2px rgb(255,255,255),
               0.3em 0.3em 1em rgba(0,0,0,0.3);"
              p="30px"
              h="100px"
              boxSizing="content-box"
            >
              <Flex flexDirection="column" gap="2">
                <Heading fontSize="lg" textDecoration="underline">
                  <Link to={`/course/${course.id}/video`}>{course.title}</Link>
                </Heading>
                <Text fontSize="md">{course.description}</Text>
              </Flex>
            </Box>
          </Container>
        ))}
      </SimpleGrid>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default CourseList
