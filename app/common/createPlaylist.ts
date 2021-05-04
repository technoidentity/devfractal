import { supabase } from './initSupabase'

export async function createPlaylist(name: string) {
  const { error } = await supabase.from('playlists').insert({ name }).single()
  return error
}
