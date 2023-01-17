import { IS_ADMIN } from './constants'
import { supabase } from './initSupabase'

export function isAdmin() {
  const userId = supabase.auth.getUser()?.id
  if (!userId) {
    return false
  }
  return userId === IS_ADMIN
}
