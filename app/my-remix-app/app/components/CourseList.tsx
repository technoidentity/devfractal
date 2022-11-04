import { Center, Heading, SimpleGrid } from '@chakra-ui/react'
import type { Course } from '@prisma/client'
import { CourseView } from './CourseView'

interface CourseListProps {
  courses: Course[]
}

export const CourseList = ({ courses }: CourseListProps) => {
  return (
    <>
      <Center>
        <Heading>Courses</Heading>
      </Center>
      <SimpleGrid columns={[2, null, 3]} spacing="20px">
        {courses.map(course => (
          <CourseView key={course.id} course={course} />
        ))}
      </SimpleGrid>
    </>
  )
}
