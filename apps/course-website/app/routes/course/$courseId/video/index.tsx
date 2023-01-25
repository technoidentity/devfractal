import type { Video } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { VideoView } from '~/components/VideoView'
import { db } from '~/utils/db.server'

type LoaderData = { videos: Video[] }

export const loader: LoaderFunction = async ({ params }) => {
  const courseVideos = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    select: {
      videos: true,
    },
  })
  invariant(courseVideos, `videos related to ${params.courseId} has not found`)
  return json<LoaderData>(courseVideos)
}

export const InitialVideo = () => {
  const { videos } = useLoaderData<LoaderData>()
  return <VideoView video={videos[0]} />
}

export default InitialVideo
