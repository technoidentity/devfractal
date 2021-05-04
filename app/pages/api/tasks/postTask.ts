import type { NextApiRequest, NextApiResponse } from 'next'
import type { Task } from '../../../common'
import { supabase } from '../../../common/initSupabase'

export default async function postTask(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { title, description }: Task = req.body
    const { data, error } = await supabase
      .from('tasks')
      .insert({ title, description })
      .single()
    res.status(200).json({ data, error })
  }
}
