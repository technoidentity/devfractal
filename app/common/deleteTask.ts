import { supabase } from './initSupabase'

export async function deleteTask(id: number) {
  const { error } = await supabase.from('tasks').delete().eq('id', id)

  return error
}
