import { Box } from '@chakra-ui/layout'
import React from 'react'
import { AddPlaylistForm } from './AddPlaylistForm'
import type { CreateVideo } from './AddPlaylistVideoForm'
import { AddPlaylistVideoForm } from './AddPlaylistVideoForm'
import { CreateVideoViewList } from './CreateVideoView'
import { PlaylistNameHeader } from './PlaylistNameHeader'
import produce from 'immer'

// export function removeAt<T>(arr: readonly T[], idx: number): readonly T[] {
//   return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
// }

export const CreatePlaylist: React.FC = () => {
  const [playlistName, setPlaylistName] = React.useState('')
  const [videoList, setVideoList] = React.useState<readonly CreateVideo[]>([])
  const [updatedVideo, setUpdatedVideo] = React.useState<
    CreateVideo | undefined
  >(undefined)
  const [formVisibility, set] = React.useState(false)

  const handleSubmit = (pName: string) => {
    setPlaylistName(pName)
  }

  const handleCreateVideo = (video: CreateVideo) => {
    setVideoList([...videoList, video])
    set(false)
    setUpdatedVideo(undefined)
  }

  const handleAdd = () => {
    set(!formVisibility)
  }

  const handleEdit = (video: CreateVideo) => {
    set(true)
    setUpdatedVideo(video)
    const idx = videoList.findIndex(vi => vi.url === video.url)
    const newVideos = produce(videoList, draft => {
      draft.splice(idx, 1)
    })
    setVideoList(newVideos)

    // setVideoList(removeAt(videoList, idx))
  }

  const handleDelete = (url: string) => {
    const filteredVideos = videoList.filter(vi => vi.url !== url)
    setVideoList(filteredVideos)
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
      {formVisibility && (
        <AddPlaylistVideoForm
          onSubmit={handleCreateVideo}
          initialValues={updatedVideo}
        />
      )}
      <CreateVideoViewList
        createVideoViewList={videoList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  )
}
