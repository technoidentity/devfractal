import { supabase } from './initSupabase'

export async function postUserAnswers(
  id: string,
  email: string,
  score: number,
) {
  const { error } = await supabase
    .from('useranswers')
    .insert({ user_id: id, email_id: email, score })
    .single()
  return error
}
