import { supabase } from './initSupabase'

export async function updateTask(
  id: number,
  title: string,
  description: string,
) {
  const { error } = await supabase
    .from('tasks')
    .update({
      title,
      description,
    })
    .eq('id', id)
    .single()
  return error
}
