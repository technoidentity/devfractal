import { supabase } from './initSupabase'

export async function deleteVideo(id: number) {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('video_id', id)
    .single()
  return error
}
