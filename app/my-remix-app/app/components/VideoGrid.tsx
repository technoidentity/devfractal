import { Flex, SimpleGrid, Box } from '@chakra-ui/react'
import { Video } from '@prisma/client'
import { NavLink } from '@remix-run/react'
import { VideoCard } from './VideoCard'

interface VideoGridProps {
  id: string
  videos: Video[]
}

export const VideoGrid = ({ id, videos }: VideoGridProps) => {
  return (
    <Flex flex={1}>
      <Box overflow="auto" mt="10px">
        <SimpleGrid columns={{ base: 1 }} spacing={3}>
          {videos.map(video => {
            return (
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: '#FEC8D8',
                        borderRadius: '16px',
                      }
                    : { backgroundColor: 'white' }
                }
                to={`/course/${id}/video/${video.id}`}
              >
                <VideoCard key={video.id} video={video} />
              </NavLink>
            )
          })}
        </SimpleGrid>
      </Box>
    </Flex>
  )
}
