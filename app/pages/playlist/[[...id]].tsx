/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, GridItem } from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import type { Video } from '../../common'
import { PlaylistView } from '../../components/PlaylistView'
import { VideoView } from '../../components/VideoView'

interface PlaylistPageProps {
  readonly playlist: readonly Video[]
}

export const getServerSideProps: GetServerSideProps<PlaylistPageProps> = async () => {
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/api/videos')
  const playlist = await res.json()
  // Pass data to the page via props
  return { props: { playlist } }
}

const PlaylistPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ playlist }) => {
  const router = useRouter()
  const { query } = useRouter()
  const id = query.id?.[0]
  const play = query.play === 'true'

  const [autoPlay, setAutoPlay] = React.useState(!!query.play)

  const selectedIndex = React.useMemo(() => {
    if (id === undefined) {
      return 0
    }
    const si = playlist.findIndex(vi => vi.id === +id)

    return si >= 0 ? si : 0
  }, [id])

  const selected = playlist[selectedIndex]

  const handlePlayNext = () => {
    const currentIndex = selectedIndex + 1
    if (currentIndex < playlist.length) {
      setTimeout(() => {
        const vid = playlist[currentIndex]
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        router.push(`/playlist/${vid?.id}?play=${autoPlay}`)
      }, 2000)
    } else {
      router.push('playlist/0')
    }
  }

  const handleEnded = () => {
    if (autoPlay) {
      handlePlayNext()
    }
  }

  return (
    <Grid h="100vh" templateColumns="repeat(3, 1fr)" gap={2}>
      <GridItem colSpan={2} bg="#ffefd5" borderRadius="5px">
        {selected && (
          <VideoView
            initialPlay={play}
            key={selected.id}
            video={selected}
            onWatchAgain={async id => router.push(`/playlist/${id}?play=true`)}
            onPlayNext={handlePlayNext}
            index={selectedIndex}
            onEnded={handleEnded}
            autoPlay={autoPlay}
            onAutoPlay={() => setAutoPlay(!autoPlay)}
          />
        )}
      </GridItem>

      <GridItem colSpan={1} bg="papayawhip">
        <PlaylistView playlist={playlist} selected={selected} />
      </GridItem>
    </Grid>
  )
}

export default PlaylistPage
