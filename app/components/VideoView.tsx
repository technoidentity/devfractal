import { Box, chakra, Heading } from '@chakra-ui/react'
import React from 'react'
import type { Video } from '../common'

const ChakraVideo = chakra('video')

export interface VideoViewProps {
  readonly video: Video
}

export const VideoView: React.FC<VideoViewProps> = ({ video }) => (
  <Box>
    <Heading as="h2" p={2}>
      {video.title}
    </Heading>
    <Box position="relative">
      <ChakraVideo position="absolute" width="100%" src={video.src} controls />
    </Box>
  </Box>
)
