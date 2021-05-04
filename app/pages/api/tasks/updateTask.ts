import type { NextApiRequest, NextApiResponse } from 'next'
import type { Task } from '../../../common'
import { supabase } from '../../../common/initSupabase'

export default async function updateTask(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { id, title, description }: Task = req.body

    const { data, error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
      })
      .eq('id', id)
      .single()
    res.status(200).json({ data, error })
  }
}
