import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import type { Video } from '@prisma/client'
// import { useRouter } from 'next/router'

interface VideoListProps {
  videos: Video[]
}

export const VideoList = ({ videos }: VideoListProps) => {
  // const router = useRouter()
  // const id = router.query.id

  return (
    <Container>
      {videos.map((video, idx) => {
        return (
          <Box
            bg="green.200"
            p="4"
            boxSizing="content-box"
            maxW="250px"
            mb="4px"
          >
            <Button
              color="blue.500"
              textDecoration="underline"
            >
              {video.title}
            </Button>
            <Text>{video.description}</Text>
          </Box>
        )
      })}
    </Container>
  )
}
