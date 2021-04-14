import type { NextApiRequest, NextApiResponse } from 'next'

const videos = [
  {
    id: 0,
    src: 'http://techslides.com/demos/sample-videos/small.mp4',
    title: 'React components',
    duration: '18s',
  },
  {
    id: 1,
    src:
      'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
    title: 'Styled components',
    duration: '10s',
  },
  {
    id: 2,
    src:
      'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    title: 'React Hooks',
    duration: '17s',
  },
]

export default function getVideos(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(videos)
  }
}
