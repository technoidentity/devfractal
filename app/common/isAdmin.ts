import { IS_ADMIN } from './constants'
import { supabase } from './initSupabase'

export default function isAdmin() {
  const userId = supabase.auth.user()?.id
  if (!userId) {
    return false
  }
  return userId === IS_ADMIN
}
