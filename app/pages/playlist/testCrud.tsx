import React from 'react'

import { Button } from '@chakra-ui/react'

import { createPlaylist, postVideo, addPlaylistVideo } from '../../common'

const testCrud = () => {
  const onCreatePlaylist = async () => {
    const error = await createPlaylist('hello')

    // eslint-disable-next-line no-console
    console.log(error)
  }

  const onAddVideo = async () => {
    const error = await postVideo('xxx', 'yyy', 'zzz')

    // eslint-disable-next-line no-console
    console.log(error)
  }

  const onAddPlaylistVideo = async () => {
    const error = await addPlaylistVideo('hello', 'xxx')

    // eslint-disable-next-line no-console
    console.log(error)
  }

  return (
    <>
      <Button onClick={onCreatePlaylist}>createPlaylist</Button>
      <Button onClick={onAddVideo}>addVideo</Button>
      <Button onClick={onAddPlaylistVideo}>addPlaylistVideo</Button>
    </>
  )
}
export default testCrud
