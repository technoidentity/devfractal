import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import type { Course, Video } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { db } from '~/utils/db.server'


type LoaderData =  Course & {
    videos: Video[];
}


export const loader:LoaderFunction =async({params}) => {
  const courseVideos = await db.course.findUnique({
    where:{
      id:params.courseId
    },
    include:{
      videos:true
    }
  })
  invariant(courseVideos,`videos related to ${params.courseId} has not found`)
  return json<LoaderData>(courseVideos)
}



export const VideoList = () => {
  const {id,videos} = useLoaderData<LoaderData>()

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
            <Link to={`/course/${id}/video/${video.id}`}>{video.title}</Link>
            <Text>{video.description}</Text>
          </Box>
        )
      })}
    </Container>
    <Outlet/>
      </Flex>
  )
}


export default VideoList