import { Box, Container, Flex, Text } from '@chakra-ui/react'
import type { Course, Video } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { db } from '~/utils/db.server'

type LoaderData = Course & {
  videos: Video[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const courseVideos = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      videos: true,
    },
  })
  invariant(courseVideos, `videos related to ${params.courseId} has not found`)
  return json<LoaderData>(courseVideos)
}

export const VideoList = () => {
  const { id, videos } = useLoaderData<LoaderData>()

  const activeStyle = {
    color: 'red',
  }

  const style = {
    color: 'blue',
    textDecoration: 'underline',
  }

  return (
    <Flex>
      <Container>
        {videos.map((video, idx) => {
          return (
            <Box
              bg="green.200"
              p="4"
              boxSizing="content-box"
              maxW="250px"
              mb="4px"
              key={video.id}
            >
              <NavLink
                to={`/course/${id}/video/${video.id}`}
                style={({ isActive }) => (isActive ? activeStyle : style)}
              >
                {video.title}
              </NavLink>
              <Text>{video.description}</Text>
            </Box>
          )
        })}
      </Container>
      <Outlet />
    </Flex>
  )
}

export default VideoList
