import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import type { CreateVideo } from './AddPlaylistVideoForm'

interface FormControlsProps {
  onDelete(url: string): void
  readonly video: CreateVideo
  onEdit(video: CreateVideo): void
}

export const FormControls: React.FC<FormControlsProps> = ({
  video,
  onDelete,
  onEdit,
}) => (
  <HStack spacing={4} mt={6}>
    <IconButton
      colorScheme="teal"
      aria-label="Edit"
      size="md"
      icon={<FaEdit />}
      onClick={() => onEdit(video)}
    />
    <IconButton
      colorScheme="teal"
      aria-label="Delete"
      size="md"
      icon={<FaTrash />}
      onClick={() => onDelete(video.url)}
    />
  </HStack>
)

interface CreateVideoViewProps {
  readonly createVideo: CreateVideo
  onEdit(video: CreateVideo): void
  onDelete(url: string): void
}

export const CreateVideoView: React.FC<CreateVideoViewProps> = ({
  createVideo,
  onEdit,
  onDelete,
}) => (
  <Container>
    <Flex direction="column">
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
        <Spacer />
        <FormControls
          video={createVideo}
          onEdit={() => onEdit(createVideo)}
          onDelete={() => onDelete(createVideo.url)}
        />
      </Box>
    </Flex>
  </Container>
)

interface CreateVideoViewListProps {
  readonly createVideoViewList: readonly CreateVideo[]
  onEdit(video: CreateVideo): void
  onDelete(url: string): void
}

export const CreateVideoViewList: React.FC<CreateVideoViewListProps> = ({
  createVideoViewList,
  onEdit,
  onDelete,
}) => (
  <Container>
    <Stack spacing={4}>
      {createVideoViewList.map(video => (
        <CreateVideoView
          key={video.url}
          createVideo={video}
          onEdit={() => onEdit(video)}
          onDelete={() => onDelete(video.url)}
        />
      ))}
    </Stack>
  </Container>
)
