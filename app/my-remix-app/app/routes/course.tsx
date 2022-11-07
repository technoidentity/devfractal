import { Heading } from '@chakra-ui/react'
import { Outlet } from '@remix-run/react'

export const CoursePage = () => {
  return (
    <>
      <Heading>Welcome</Heading>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default CoursePage
