import { Box, Center, Container, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import type { Course } from '@prisma/client'
import { LoaderFunction,json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

type LoaderData = {
  courses: Course[]
}

export const loader:LoaderFunction = async() => {
  const courses = await db.course.findMany()
  return json<LoaderData>({courses})
}

const CourseList = ( ) => {
  const {courses} = useLoaderData<LoaderData>()
  return (
    <>
      <Center>
        <Heading>Courses</Heading>
      </Center>
      <SimpleGrid columns={[2, null, 3]} spacing="20px">
        {courses.map(course => (
          <Container mt="10" key={course.id}>
      <Box bg="blue.200" h="100px" boxSizing="content-box" p="4">
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
        <Outlet/>
      </div>
    </>
  )
}

export default CourseList