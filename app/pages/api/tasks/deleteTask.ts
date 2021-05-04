/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next'
// import type { Task } from '../../../common'
import { supabase } from '../../../common/initSupabase'

export default async function deleteTask(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const id: number = req.body

    const { data, error } = await supabase.from('tasks').delete().eq('id', id)

    res.status(200).json({ data, error })
  }
}
