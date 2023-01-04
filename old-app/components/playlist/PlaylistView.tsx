import { Link, Stack, Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import type { Video } from '../../common'

interface PlaylistItemProps {
  readonly video: Video
  readonly active?: boolean
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ video, active }) => {
  const activeFeature = active ? { bg: '#e5d7bf' } : {}
  return (
    <Box
      {...activeFeature}
      p={4}
      color="#4c473f"
      borderRadius="10px"
      _hover={{ bg: '#e5d7bf' }}
    >
      <NextLink href={`/playlist/${video.id}`}>
        <Link fontSize={['md', 'lg', 'xl']}>{video.title}</Link>
      </NextLink>
      <Text fontSize={['md', 'lg', 'xl']}>{video.duration}</Text>
    </Box>
  )
}

export interface PlaylistViewProps {
  readonly playlist: readonly Video[]
  readonly selected?: Video
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({
  playlist,
  selected,
}) => (
  <Stack margin={6}>
    {playlist.map((video, index) => (
      <PlaylistItem key={index} video={video} active={video === selected} />
    ))}
  </Stack>
)
