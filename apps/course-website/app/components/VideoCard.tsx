import { Box, Text } from '@chakra-ui/react'
import type { Video } from '@prisma/client'

interface VideoCardProps {
  video: Video
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Box p="12px" borderRadius={'16px'} boxShadow="0 8px 8px -4px">
      <Text fontWeight={600}>{video.title}</Text>
      <Text color={'gray.600'}>{video.description}</Text>
    </Box>
  )
}
