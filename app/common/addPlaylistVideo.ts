/* eslint-disable @typescript-eslint/naming-convention */
import { supabase } from './initSupabase'

export async function addPlaylistVideo(
  playlistName: string,
  videoTitle: string,
) {
  const {
    data: { playlist_id },
  } = await supabase
    .from('playlists')
    .select('playlist_id')
    .eq('name', playlistName)
    .single()

  const {
    data: { video_id },
  } = await supabase
    .from('videos')
    .select(`video_id`)
    .eq('title', videoTitle)
    .single()

  if (!playlist_id || !video_id) {
    return 'invalid'
  }

  const { error } = await supabase
    .from('playlist_videos')
    .insert({ video_id, playlist_id })
    .single()

  return error
}
