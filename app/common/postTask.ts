import { supabase } from './initSupabase'

export async function postTask(title: string, description: string) {
  const { error } = await supabase
    .from('tasks')
    .insert({ title, description })
    .single()
  return error
}
