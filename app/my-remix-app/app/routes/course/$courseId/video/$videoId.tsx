import { Container, Heading, Text } from '@chakra-ui/react'
import type { Video } from '@prisma/client'
import { LoaderFunction,json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { db } from '~/utils/db.server'

type LoaderData = {video:Video}

export const loader:LoaderFunction = async({params}) => {
   const video = await db.video.findUnique({
    where:{
        id:params.videoId
    }
   })
   invariant(video,`video has not found for id:${params.videoId}`)
   return json<LoaderData>({video})
}

export const VideoView = () => {
    const {video} = useLoaderData<LoaderData>()
  return (
    <Container>
      <Heading fontSize="lg" mb="4">
        {video.title}
      </Heading>
      <iframe
        title={video.title}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.url}`}
        frameBorder="0"
        allowFullScreen
      />
      <Text mt="8px">{video.description}</Text>
    </Container>
  )
}

export default VideoView
