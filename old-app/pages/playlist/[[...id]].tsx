/* eslint-disable @typescript-eslint/no-floating-promises */
import { Grid, GridItem, Text } from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { getPlaylistVideos, Video } from '../../common'
import { PlaylistView, VideoView } from '../../components/playlist'

interface PlaylistContext {
  readonly selectedIndex: number
  readonly playlist: readonly Video[]
}

// eslint-disable-next-line no-redeclare
const PlaylistContext = React.createContext<PlaylistContext | undefined>(
  undefined,
)

export const usePlaylist = () => {
  const ctx = React.useContext(PlaylistContext)
  if (ctx === undefined) {
    throw new Error(`use PlaylistContext.Provider somewhere as an ancestor`)
  }

  return ctx
}

export const PlaylistPageView: React.FC = () => {
  const router = useRouter()
  const { selectedIndex, playlist } = usePlaylist()

  React.useEffect(() => {
    setTimeout(() => {
      const vid = playlist[selectedIndex]
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      if (vid) {
        router
          .push(`/playlist/${vid?.id}`)
          .catch(err => <Text>{err.message}</Text>)
      }
    }, 2000)
  }, [selectedIndex])

  const selected = playlist[selectedIndex]

  const handlePlayNext = () => {
    router.push(
      `/playlist/${playlist[
        (selectedIndex + 1) % playlist.length
      ]!.id.toString()}`,
    )
  }
  return (
    <Grid h="100vh" templateColumns="repeat(3, 1fr)" gap={2}>
      <GridItem colSpan={2} bg="#ffefd5" borderRadius="5px">
        {selected && (
          <VideoView
            onPlayNext={handlePlayNext}
            selectedIndex={selectedIndex}
            playlist={playlist}
          />
        )}
      </GridItem>

      <GridItem colSpan={1} bg="papayawhip">
        <PlaylistView playlist={playlist} />
      </GridItem>
    </Grid>
  )
}

interface PlaylistPageProps {
  readonly playlist: readonly Video[]
}

export const getServerSideProps: GetServerSideProps<
  PlaylistPageProps
> = async () => {
  // Fetch data from external API
  // const res = await fetch('http://localhost:3000/api/videos/videos')
  // const playlist = await res.json()
  // Pass data to the page via props

  const playlist = await getPlaylistVideos('hello')
  if (!playlist) {
    return { notFound: true }
  }
  return { props: { playlist } }
}

const PlaylistPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ playlist }) => {
  const router = useRouter()
  const { query } = router
  const id = query.id?.[0]

  const selectedIndex = React.useMemo(() => {
    if (id === undefined) {
      return 0
    }
    const si = playlist.findIndex(vi => vi.id === +id)

    return si >= 0 ? si : 0
  }, [id])

  return (
    <PlaylistContext.Provider value={{ playlist, selectedIndex }}>
      <PlaylistPageView />
    </PlaylistContext.Provider>
  )
}

export default PlaylistPage
