/* eslint-disable react/jsx-no-bind */
/* eslint-disable arrow-body-style */
import React from 'react'
import useSWR from 'swr'
import type { Video } from '../common'
import { Playlist } from '../components/Playlist'

const fetcher = async (url: string) => fetch(url).then(async res => res.json())

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error } = useSWR('/api/videos', fetcher)

  if (error) {
    return <div>failed to load</div>
  }
  if (!data) {
    return <div>loading...</div>
  }
  return <Playlist playlist={data as readonly Video[]} />
}

export default Index
