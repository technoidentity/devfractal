import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Switch,
} from '@chakra-ui/react'
import React from 'react'
import { FaChevronDown, FaFastBackward, FaFastForward } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import type { Video } from '../common'

// const DynamicReactPlayer = dynamic(async () => import('react-player'))

const playbackRates = [0.5, 1, 1.5, 2]
export interface VideoViewProps {
  readonly video: Video
  readonly index: number
  readonly initialPlay: boolean
  readonly autoPlay: boolean
  onWatchAgain(id: number): void
  onPlayNext(): void
  onEnded(): void
  onAutoPlay(): void
}

export const VideoView: React.FC<VideoViewProps> = ({
  video,
  autoPlay,
  onWatchAgain,
  onEnded,
  onPlayNext,
  onAutoPlay,
  initialPlay,
}) => {
  const [ended, setEnded] = React.useState(false)
  const [playing, setPlaying] = React.useState(initialPlay)
  const [playbackRate, setPlaybackRate] = React.useState(1)

  const playerRef = React.useRef<ReactPlayer | null>(null)

  React.useEffect(() => {
    setEnded(false)
  }, [video])

  const handleForward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)
  }
  const handleBackward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  const bg = ended ? { opacity: '0.5' } : {}

  return (
    <Box position="relative" outline="none">
      <Heading as="h2" p={2} fontSize={['md', 'lg', 'xl']}>
        {video.title}
      </Heading>
      <Box {...bg}>
        <ReactPlayer
          position="absolute"
          width="100%"
          height="100%"
          ref={(r: any) => {
            // eslint-disable-next-line functional/immutable-data
            playerRef.current = r
          }}
          muted
          playing={playing}
          url={video.src}
          controls
          onProgress={({ played }) => {
            if (played === 1) {
              setEnded(true)
            } else {
              setEnded(false)
            }
          }}
          onEnded={onEnded}
          playbackRate={playbackRate}
        />
      </Box>
      {ended ? (
        <HStack spacing="10px" position="absolute" top="50%" left="30%">
          {!autoPlay && (
            <Button
              onClick={onPlayNext}
              bg="blue.500"
              color="#fff"
              _hover={{
                backgroundColor: 'teal',
                color: 'black',
                textDecoration: 'underline',
              }}
            >
              <Link>Next</Link>
            </Button>
          )}
          {!autoPlay && (
            <Button
              onClick={() => {
                onWatchAgain(video.id)
                setPlaying(true)
              }}
              p={2}
              bg="blue.500"
              color="#fff"
              _hover={{ backgroundColor: 'teal', color: 'black' }}
            >
              Watch Again
            </Button>
          )}
        </HStack>
      ) : null}
      <Flex bg="#000">
        <HStack m={4} spacing="5px">
          <Button onClick={handleBackward}>
            <FaFastBackward />
          </Button>
          <Button onClick={handleForward}>
            <FaFastForward />
          </Button>
        </HStack>
        <Spacer />
        <Menu>
          <HStack spacing="10px" m={4}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="auto-play" mb="0" color="#fff">
                Autoplay
              </FormLabel>
              <Switch
                size="lg"
                id="auto-play"
                isChecked={autoPlay}
                onChange={onAutoPlay}
              />
            </FormControl>
            <MenuButton as={Button} p={6} rightIcon={<FaChevronDown />}>
              speed {playbackRate}x
            </MenuButton>
          </HStack>
          <MenuList>
            {playbackRates.map((rate, index) => (
              <MenuItem key={index} onClick={() => setPlaybackRate(rate)}>
                {rate}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}
