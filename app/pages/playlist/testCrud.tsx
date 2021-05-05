/* eslint-disable no-console */
import { Button } from '@chakra-ui/react'
import React from 'react'
import {
  addPlaylistVideo,
  createPlaylist,
  deletePlaylist,
  deletePlaylistVideo,
  deleteVideo,
  getVideo,
  postVideo,
  updateVideo,
} from '../../common'

const testCrud = () => {
  const onCreatePlaylist = async () => {
    const error = await createPlaylist('hello')

    console.log(error)
  }

  const onAddVideo = async () => {
    const error = await postVideo('xxx', 'yyy', 'zzz')

    console.log(error)
  }

  const onAddPlaylistVideo = async () => {
    const error = await addPlaylistVideo('hello', 'xxx')

    console.log(error)
  }

  const onUpdateVideo = async () => {
    const error = await updateVideo({
      id: 2,
      title: 'xxx1',
      src: 'yyy2',
      duration: 'zzz3',
    })

    console.log(error)
  }
  const onDeletePlaylistVideo = async () => {
    const error = await deletePlaylistVideo('hello', 'xxx1')

    console.log(error)
  }
  const onDeleteVideo = async () => {
    const error = await deleteVideo(2)

    console.log(error)
  }

  const onDeletePlaylist = async () => {
    const error = await deletePlaylist('hello')

    console.log(error)
  }

  const onGetVideo = async () => {
    const video = await getVideo(3)

    console.log(video)
  }

  return (
    <>
      <Button onClick={onCreatePlaylist}>createPlaylist</Button>
      <Button onClick={onAddVideo}>addVideo</Button>
      <Button onClick={onAddPlaylistVideo}>addPlaylistVideo</Button>
      <Button onClick={onUpdateVideo}>updateVideo</Button>
      <Button onClick={onDeletePlaylistVideo}>deletePlaylistVideo</Button>
      <Button onClick={onDeleteVideo}>deleteVideo</Button>
      <Button onClick={onDeletePlaylist}>deletePlaylist</Button>
      <Button onClick={onGetVideo}>getVideo</Button>
    </>
  )
}
export default testCrud
