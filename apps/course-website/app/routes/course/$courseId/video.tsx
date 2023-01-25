import { Stack } from '@chakra-ui/react'
import type { Course, Video } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'
import invariant from 'tiny-invariant'
import Footer from '~/components/Footer'
import Transcript from '~/components/Transcript'
import { VideoGrid } from '~/components/VideoGrid'
import { MDXComponents } from '~/utils/components'
import { db } from '~/utils/db.server'
import { example } from '~/utils/fs.server'
import { toHtml } from '~/utils/mdx.server'

type CourseVideo = Course & {
  videos: Video[]
}

type LoaderData = {
  courseVideos: CourseVideo
  html: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const courseVideos = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      videos: true,
    },
  })
  const data = await example()
  const html = await toHtml(data)

  invariant(courseVideos != null, 'videos with the courseId has not found')
  return json<LoaderData>({ html, courseVideos })
}

export const VideoList = () => {
  const { courseVideos, html } = useLoaderData<LoaderData>()
  const Component = React.useMemo(() => getMDXComponent(html), [html])

  return (
    <>
      <Stack maxH={'70vh'} direction={{ base: 'column', md: 'row' }}>
        <Outlet />
        <VideoGrid id={courseVideos.id} videos={courseVideos.videos} />
      </Stack>
      <Transcript>
        <Component components={MDXComponents as any} />
      </Transcript>
      <Footer />
    </>
  )
}

export default VideoList
