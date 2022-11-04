import { Container, Heading, Text } from '@chakra-ui/react'
import type { Video } from '@prisma/client'

interface VideoViewProps {
  video: Video
}

export const VideoView = ({ video }: VideoViewProps) => {
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
