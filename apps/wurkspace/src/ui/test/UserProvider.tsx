/* eslint-disable @typescript-eslint/no-misused-promises */
import { del, post } from '@core/api'
import { isTestMode } from '@core/isTestMode'
import { isEmail } from '@srtp/spec'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import invariant from 'tiny-invariant'

type TestUserContext = Readonly<{
  email?: string
  signIn(email: string): void
  signOut(): void
}>

const TestUserContext = React.createContext<TestUserContext | undefined>(
  undefined,
)

export const useTestUser = (): TestUserContext | undefined => {
  const ctx = React.useContext(TestUserContext)

  return ctx
}

const TestUserProviderView = ({ children }: { children: React.ReactNode }) => {
  invariant(isTestMode())

  const [email, set] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const cookies = parseCookies(null)
    set(cookies['test-login-email'])
  }, [])

  email && invariant(isEmail(email))

  const router = useRouter()

  const signIn = React.useCallback((email: string) => {
    post('/api/test/session', { email })
      .then(() => set(email))
      .catch(err => console.error(err))
  }, [])

  const signOut = React.useCallback(async () => {
    await del('/api/test/session').then(() => {
      set(undefined)
      router.push('/').catch(err => console.error(err))
    })
  }, [router])

  const contextValue = React.useMemo(
    () => ({ email, signIn, signOut }),
    [email, signIn, signOut],
  )

  return (
    <TestUserContext.Provider value={contextValue}>
      {children}
    </TestUserContext.Provider>
  )
}

export const TestUserProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  if (isTestMode()) {
    return <TestUserProviderView>{children}</TestUserProviderView>
  }
  return <>children</>
}
