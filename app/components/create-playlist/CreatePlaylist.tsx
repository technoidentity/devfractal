import { Box } from '@chakra-ui/layout'
import React from 'react'
import { AddPlaylistForm } from './AddPlaylistForm'
import { AddPlaylistVideoForm } from './AddPlaylistVideoForm'
import { PlaylistNameHeader } from './PlaylistNameHeader'
import { CreateVideoViewList } from './CreateVideoView'
import type { CreateVideo } from './AddPlaylistVideoForm'

export const CreatePlaylist: React.FC = () => {
  const [playlistName, setPlaylistName] = React.useState('')
  const [createVideoList, setVideoList] = React.useState<
    readonly CreateVideo[]
  >([])
  const [formVisibility, set] = React.useState(false)

  const handleSubmit = (pName: string) => {
    setPlaylistName(pName)
  }

  const handleCreateVideo = (video: CreateVideo) => {
    setVideoList([...createVideoList, video])
    set(false)
  }

  const handleAdd = () => {
    set(!formVisibility)
  }

  return (
    <Box>
      <AddPlaylistForm onSubmit={handleSubmit} />
      {playlistName && (
        <PlaylistNameHeader
          playlistName={playlistName}
          add={formVisibility}
          onClick={handleAdd}
        />
      )}
      {formVisibility && <AddPlaylistVideoForm onSubmit={handleCreateVideo} />}
      <CreateVideoViewList createVideoViewList={createVideoList} />
    </Box>
  )
}
