/* eslint-disable @typescript-eslint/naming-convention */
import { supabase } from './initSupabase'
import type { Video } from './types'

export async function createPlaylist(name: string) {
  const { error } = await supabase.from('playlists').insert({ name }).single()
  return error
}

export async function deletePlaylist(name: string) {
  const { error } = await supabase.from('playlists').delete().eq('name', name)
  return error
}

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

export async function getVideo(id: number) {
  const {
    data: { video_id, title, source, duration },
  } = await supabase
    .from('videos')
    .select(`video_id,title,source,duration`)
    .eq('video_id', id)
    .single()

  return { id: video_id, title, src: source, duration } as Video
}

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

export async function deleteVideo(id: number) {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('video_id', id)
    .single()
  return error
}

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

export async function getPlaylistVideos(playlistName: string) {
  const {
    data: { playlist_id },
  } = await supabase
    .from('playlists')
    .select('playlist_id')
    .eq('name', playlistName)
    .single()

  const { data: videos } = await supabase
    .from('playlist_videos')
    .select('video_id')
    .eq('playlist_id', playlist_id)

  if (videos) {
    const pArray = videos.map(async item => {
      const response = await getVideo(item.video_id)
      return response
    })
    const data = await Promise.all(pArray)

    return data
  }
  return
}
