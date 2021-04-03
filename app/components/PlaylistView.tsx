/* eslint-disable react/jsx-no-bind */
import { Box, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import type { Video } from '../common'

export interface PlaylistItemProps {
  readonly video: Video
  readonly active?: boolean
  onClick(video: Video): void
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  video,
  active,
  onClick,
}) => {
  const activeFeature = active ? { bg: '#e5d7bf' } : {}
  return (
    <Box
      {...activeFeature}
      p={4}
      color="#4c473f"
      borderRadius="10px"
      _hover={{ bg: '#e5d7bf' }}
      onClick={() => onClick(video)}
    >
      <Text fontSize="x-large">{video.title}</Text>
      <Text mt={4}>{video.duration}</Text>
    </Box>
  )
}

export interface PlaylistViewProps {
  readonly playlist: readonly Video[]
  readonly selected?: Video
  onSelected(video: Video): void
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({
  playlist: videoFeatureList,
  selected,
  onSelected,
}) => (
  <Stack margin={6}>
    {videoFeatureList.map((video, index) => (
      <PlaylistItem
        key={index}
        video={video}
        active={video === selected}
        onClick={() => onSelected(video)}
      />
    ))}
  </Stack>
)
