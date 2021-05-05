import { supabase } from './initSupabase'

export async function userAnswers(id: number, email: string, score: number) {
  const { error } = await supabase
    .from('useranswers')
    .insert({ user_id: id, email_id: email, score })
    .single()
  return error
}
