/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../../../common'
import { supabase } from '../../../common/initSupabase'

export default async function userAnswers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { id, email, score }: User = req.body
    const { data, error } = await supabase
      .from('useranswers')
      .insert({ user_id: id, email_id: email, score })
      .single()
    res.status(200).json({ data, error })
  }
}
