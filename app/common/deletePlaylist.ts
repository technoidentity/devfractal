import { supabase } from './initSupabase'

export async function deletePlaylist(name: string) {
  const { error } = await supabase.from('playlists').delete().eq('name', name)
  return error
}
