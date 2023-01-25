import type { Video } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { VideoView } from '~/components/VideoView'
import { db } from '~/utils/db.server'

type LoaderData = { video: Video }

export const loader: LoaderFunction = async ({ params }) => {
  const video = await db.video.findUnique({
    where: {
      id: params.videoId,
    },
  })
  invariant(video, `video has not found for id:${params.videoId}`)
  return json<LoaderData>({ video })
}

export const VideoPage = () => {
  const { video } = useLoaderData<LoaderData>()

  return <VideoView video={video} />
}

export default VideoPage
