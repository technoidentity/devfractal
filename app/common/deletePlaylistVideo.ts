/* eslint-disable @typescript-eslint/naming-convention */
import { supabase } from './initSupabase'

export async function deletePlaylistVideo(
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
    .delete()
    .eq('video_id', video_id)
    .eq('playlist_id', playlist_id)

  return error
}
