import { Container, Heading, Text } from '@chakra-ui/react'
import { Video } from '@prisma/client'
import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { db } from '~/utils/db.server'

type LoaderData = { videos: Video[] }

export const loader: LoaderFunction = async ({ params }) => {
  const courseVideos = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      videos: true,
    },
  })
  invariant(courseVideos, `videos related to ${params.courseId} has not found`)
  return json<LoaderData>(courseVideos)
}

export const InitialVideo = () => {
  const { videos } = useLoaderData<LoaderData>()
  return (
    <Container>
      <Heading fontSize="lg" mb="4">
        {videos[0].title}
      </Heading>
      <iframe
        title={videos[0].title}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videos[0].url}`}
        frameBorder="0"
        allowFullScreen
      />
      <Text mt="8px">{videos[0].description}</Text>
    </Container>
  )
}

export default InitialVideo
