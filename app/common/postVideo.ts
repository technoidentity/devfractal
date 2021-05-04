import { supabase } from './initSupabase'

export async function postVideo(
  title: string,
  source: string,
  duration: string,
) {
  const { error } = await supabase
    .from('videos')
    .insert({
      title,
      source,
      duration,
    })
    .single()
  return error
}
