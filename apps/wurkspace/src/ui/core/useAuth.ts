import { useTestUser } from '@ui/test'
import type { Session } from 'next-auth'
import { signOut as nextAuthSignOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

function fetchSession(email?: string) {
  return async () => {
    const url = email ? `/api/users/${email}` : '/api/auth/session'

    const res = await fetch(url)
    const session = await res.json()
    if (!res.ok) {
      return null
    }

    if (Object.keys(session).length) {
      return session
    }

    return null
  }
}

export const useAuth = (): [Session, boolean] => {
  const ctx = useTestUser()
  const router = useRouter()

  const query = useQuery(['session'], fetchSession(ctx?.email), {
    onSettled(data) {
      if (data) {
        return
      }

      router.push('/').catch(err => console.error(err))
    },
  })

  return [query.data, query.status === 'loading']
}

const realSignOut = () => nextAuthSignOut().catch(err => console.error(err))

export const useSignOut = (): (() => void) => {
  const ctx = useTestUser()

  return ctx?.signOut ?? realSignOut
}
