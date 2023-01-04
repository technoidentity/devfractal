import { supabase } from './initSupabase'

export async function postTask(title: string, description: string) {
  const { error } = await supabase
    .from('tasks')
    .insert({ title, description })
    .single()
  return error
}

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

export async function deleteTask(id: number) {
  const { error } = await supabase.from('tasks').delete().eq('id', id)

  return error
}
