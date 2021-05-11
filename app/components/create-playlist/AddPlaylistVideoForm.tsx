import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'

export interface CreateVideo {
  readonly title: string
  readonly url: string
  readonly description: string
}

interface AddPlaylistVideoFormProps {
  readonly initialValues?: CreateVideo
  onSubmit(values: CreateVideo): void
}

export const initial = { title: '', url: '', description: '' } as const

export const AddPlaylistVideoForm: React.FC<AddPlaylistVideoFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [video, setVideo] = React.useState<CreateVideo>(
    initialValues || initial,
  )

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    evt.preventDefault()
    onSubmit(video)
    setVideo(initial)
  }

  return (
    <Box>
      <Container mt={8} p={8} boxShadow="0 4px 8px -1px black">
        <form onSubmit={handleSubmit}>
          <FormControl id="playlist" mr={6} isRequired>
            <FormLabel mt={4}>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter Title..."
              value={video.title}
              onChange={evt =>
                setVideo(state => ({ ...state, title: evt.target.value }))
              }
            />
          </FormControl>
          <FormControl id="playlist" mr={6} isRequired>
            <FormLabel mt={4}>Url</FormLabel>
            <Input
              type="url"
              placeholder="Enter url..."
              value={video.url}
              onChange={evt =>
                setVideo(state => ({ ...state, url: evt.target.value }))
              }
            />
          </FormControl>
          <FormControl id="playlist" mr={6} isRequired>
            <FormLabel mt={4}>Description</FormLabel>
            <Textarea
              type="text"
              placeholder="description..."
              value={video.description}
              onChange={evt =>
                setVideo(state => ({
                  ...state,
                  description: evt.target.value,
                }))
              }
            />
          </FormControl>
          <Flex>
            <Button
              pl={8}
              m="0 auto"
              mt="6"
              pr={8}
              colorScheme="teal"
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Container>
      )
    </Box>
  )
}
