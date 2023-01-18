import { useUser } from '@supabase/auth-helpers-react'
import { IS_ADMIN } from './constants'

export function useIsAdmin() {
  const user = useUser()

  return user?.id === IS_ADMIN
}
