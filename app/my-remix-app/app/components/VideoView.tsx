import { Flex, Stack } from '@chakra-ui/react'
import { Video } from '@prisma/client'

interface VideoProps {
  video: Video
}

export const VideoView = ({ video }: VideoProps) => {
  const videoUrl = video.url.split('=')
  return (
    <Flex flex={2} p="10px" w="100%" minH="50vh">
      <Stack h="100%" w="100%">
        <iframe
          title={video.title}
          src={`https://www.youtube.com/embed/${videoUrl[1]}`}
          height="100%"
          width="100%"
          frameBorder="0"
          allowFullScreen
        />
      </Stack>
    </Flex>
  )
}
