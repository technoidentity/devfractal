import { isEmail, str } from '@srtp/core'
import { api } from '@srtp/next'
import { destroyCookie, setCookie } from 'nookies'
import invariant from 'tiny-invariant'

const loginCookieName = 'test-login-email'
export default api()
  .post(async (req, res) => {
    const email = str(req.body.email)
    invariant(isEmail(email))

    setCookie({ res }, loginCookieName, req.body.email, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    return { email }
  })
  .delete(async (_, res) => {
    destroyCookie({ res }, loginCookieName)
    return undefined
  })
