import { ErrorMessage, Loading } from '@ui/core'
import { useUsers } from '@ui/queries'
import { useRouter } from 'next/router'
import React from 'react'
import { TestLoginView } from './LoginView'
import { useTestUser } from './UserProvider'

export const TestLogin = () => {
  const ctx = useTestUser()
  const { users, error } = useUsers()

  const router = useRouter()

  React.useEffect(() => {
    if (ctx?.email) {
      router.push('/dashboard').catch(err => console.error(err))
    }
  }, [router, ctx?.email])

  if (!ctx) {
    return (
      <h2>
        test login cannot be used without settings NEXT_PUBLIC_TEST_MODE
        environment variable
      </h2>
    )
  }

  if (error) {
    console.log(error)
  }

  if (users) {
    return <TestLoginView users={users} onLogin={ctx.signIn} />
  }

  if (error) {
    return (
      <ErrorMessage error="Unable to fetch users for login(in test mode)" />
    )
  }

  return <Loading />
}
