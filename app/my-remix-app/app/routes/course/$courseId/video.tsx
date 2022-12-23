import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/react'
import type { Course, Video } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import Footer from '~/components/Footer'
import Transcript from '~/components/Transcript'
import { VideoGrid } from '~/components/VideoGrid'
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

  return (
    <>
      <Stack maxH={'70vh'} direction={{ base: 'column', md: 'row' }}>
        <Outlet />
        <VideoGrid id={id} videos={videos} />
      </Stack>
      <Transcript />
      <Footer />
    </>
  )
}

export default VideoList
