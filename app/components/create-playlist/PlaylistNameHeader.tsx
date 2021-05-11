import { Container, Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FaAngleDown, FaPlus } from 'react-icons/fa'

interface PlaylistNameHeaderProps {
  readonly playlistName: string
  readonly add: boolean
  onClick(add: boolean): void
}

export const PlaylistNameHeader: React.FC<PlaylistNameHeaderProps> = ({
  playlistName,
  add,
  onClick,
}) => (
  <Container mt={4}>
    <Flex justify="space-between">
      <Heading textAlign="center">{playlistName}</Heading>
      <IconButton
        colorScheme="teal"
        aria-label="Add Playlist Name"
        size="md"
        icon={!add ? <FaPlus /> : <FaAngleDown />}
        onClick={() => onClick(add)}
      />
    </Flex>
  </Container>
)
