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
import type { Video } from '../../common'

const playbackRates = [0.5, 1, 1.5, 2]

export interface VideoViewProps {
  readonly selectedIndex: number
  readonly playlist: readonly Video[]
  onPlayNext(): void
}

type VideoViewState = {
  readonly playing: boolean
  readonly playbackRate: number
  readonly autoPlay: boolean
  readonly ended: boolean
}

const defaultState: VideoViewState = {
  playing: false,
  playbackRate: 1,
  autoPlay: false,
  ended: false,
}

export const VideoView: React.FC<VideoViewProps> = ({
  playlist,
  selectedIndex,
  onPlayNext,
}) => {
  const [state, set] = React.useState(defaultState)
  const { autoPlay, ended, playbackRate, playing } = state
  const playerRef = React.useRef<ReactPlayer | null>(null)

  const video = playlist[selectedIndex]!
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
          onPlay={() => {
            set(state => ({ ...state, playing: true }))
          }}
          onEnded={() => {
            set(state => ({ ...state, ended: true }))
            if (autoPlay) {
              onPlayNext()
            }
          }}
          playbackRate={playbackRate}
        />
      </Box>
      {ended ? (
        <OverlayControls
          onPlayNext={onPlayNext}
          onWatchAgain={() => playerRef.current?.seekTo(0)}
        />
      ) : null}
      {!autoPlay && (
        <VideoControls
          playerRef={playerRef}
          videoState={state}
          setVideoState={set}
        />
      )}
    </Box>
  )
}

interface OverlayControlsProps {
  onPlayNext(): void
  onWatchAgain(): void
}

export const OverlayControls: React.FC<OverlayControlsProps> = ({
  onPlayNext,
  onWatchAgain,
}) => (
  <HStack spacing="10px" top="50%" left="30%">
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
    <Button
      onClick={onWatchAgain}
      p={2}
      bg="blue.500"
      color="#fff"
      _hover={{ backgroundColor: 'teal', color: 'black' }}
    >
      Watch Again
    </Button>
  </HStack>
)

interface VideoControlsProps {
  readonly playerRef: React.MutableRefObject<ReactPlayer | null>
  readonly videoState: VideoViewState
  readonly setVideoState: React.Dispatch<React.SetStateAction<VideoViewState>>
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  setVideoState,
  playerRef,
  videoState: { autoPlay, playbackRate },
}) => {
  const handleForward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10)
  }
  const handleBackward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  return (
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
              onChange={evt => {
                setVideoState(state => ({
                  ...state,
                  autoPlay: evt.target.checked,
                }))
              }}
            />
          </FormControl>
          <MenuButton as={Button} p={6} rightIcon={<FaChevronDown />}>
            speed {playbackRate}x
          </MenuButton>
        </HStack>
        <MenuList>
          {playbackRates.map((rate, index) => (
            <MenuItem
              key={index}
              onClick={() =>
                setVideoState(state => ({ ...state, playbackRate: rate }))
              }
            >
              {rate}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  )
}
