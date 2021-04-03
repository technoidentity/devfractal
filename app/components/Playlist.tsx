import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import type { Video } from '../common'
import { PlaylistView } from './PlaylistView'
import { VideoView } from './VideoView'

export interface PlaylistProps {
  readonly playlist: readonly Video[]
}

export const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
  const [selected, setSelected] = React.useState(playlist[0])

  return (
    <Grid h="100vh" templateColumns="repeat(3, 1fr)" gap={2}>
      <GridItem colSpan={2} bg="#ffefd5" borderRadius="5px">
        {selected && <VideoView video={selected} />}
      </GridItem>
      <GridItem colSpan={1} bg="papayawhip">
        <PlaylistView
          playlist={playlist}
          selected={selected}
          onSelected={setSelected}
        />
      </GridItem>
    </Grid>
  )
}
