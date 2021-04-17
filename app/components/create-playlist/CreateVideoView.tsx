import { Box, Container, Link, Stack, Text } from '@chakra-ui/react'

import NextLink from 'next/link'
import React from 'react'
import type { CreateVideo } from './AddPlaylistVideoForm'

interface CreateVideoViewProps {
  readonly createVideo: Partial<CreateVideo>
}

export const CreateVideoView: React.FC<CreateVideoViewProps> = ({
  createVideo,
}) => (
  <Container>
    <Box
      p={5}
      shadow="lg"
      borderRadius={10}
      borderWidth="1px"
      mt={6}
      borderBottom="4px solid teal"
    >
      <NextLink href="#">
        <Link fontSize={['md', 'lg', 'xl']}>{createVideo.title}</Link>
      </NextLink>
      <Text mt={4}>{createVideo.description}</Text>
    </Box>
  </Container>
)

interface CreateVideoViewListProps {
  readonly createVideoViewList: readonly CreateVideo[]
}

export const CreateVideoViewList: React.FC<CreateVideoViewListProps> = ({
  createVideoViewList,
}) => (
  <Container>
    <Stack spacing={4}>
      {createVideoViewList.map(video => (
        <CreateVideoView key={video.url} createVideo={video} />
      ))}
    </Stack>
  </Container>
)
