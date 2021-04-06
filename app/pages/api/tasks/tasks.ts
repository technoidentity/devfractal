import type { NextApiRequest, NextApiResponse } from 'next'

const tasks = [
  {
    id: 0,
    title: 'one',
    description: 'this task deals with handling xyz',
  },
  {
    id: 1,
    title: 'two',
    description: 'this task deals with handling abc',
  },
  {
    id: 2,
    title: 'three',
    description: 'this task deals with handling pqr',
  },
]

export default function getTasks(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(tasks)
}
