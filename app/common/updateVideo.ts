import { supabase } from './initSupabase'
import type { Video } from './types'

export async function updateVideo({ id, title, src, duration }: Video) {
  const { error } = await supabase
    .from('videos')
    .update({
      title,
      source: src,
      duration,
    })
    .eq('video_id', id)
    .single()
  return error
}
