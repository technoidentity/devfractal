import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'
import { sessionStorage } from '~/services/session.server'
import { login } from './user.server'

type LoginUser = {
  username: string
  id: string
}

export let authenticator = new Authenticator<LoginUser>(sessionStorage, {
  throwOnError: true,
})

const formStrategy = new FormStrategy<LoginUser>(async ({ form, context }) => {
  let username = form.get('username')
  let password = form.get('password')

  invariant(typeof username == 'string', 'username should be string')
  invariant(username.length > 0, 'username must not be empty')

  invariant(typeof password === 'string', 'password should be string')
  invariant(password.length > 0, 'password must not be empty')

  let user = await login({ username, password })
  invariant(user, 'user doesnot exist')
  return user
})

authenticator.use(formStrategy, 'user-pass')
