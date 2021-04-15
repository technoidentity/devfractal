import type { NextApiRequest, NextApiResponse } from 'next'

import questions from '../../../common/questions.json'

export default function getQuestions(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    res.status(200).json(questions)
  }
}
