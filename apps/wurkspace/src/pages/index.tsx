import { isTestMode } from '@core/isTestMode'
import { useAuth } from '@ui/core/useAuth'
import { Login } from '@ui/login/Login'
import { TestLogin } from '@ui/test'
import { useRouter } from 'next/router'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const [session] = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (session) {
      router.push('/dashboard').catch(err => console.error(err))
    }
  }, [router, session])

  if (session) {
    return null
  }
  return isTestMode() ? <TestLogin /> : <Login />
}

LoginPage.isPublic = true

export default LoginPage
