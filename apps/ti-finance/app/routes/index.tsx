import { Link } from '@remix-run/react'

import { useOptionalUser } from '~/utils'

export default function Index() {
  const user = useOptionalUser()
  return (
    <div>
      {user ? (
        <Link to="/ctc">View Ctc for {user.email}</Link>
      ) : (
        <>
          <Link to="/join">Sign up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </div>
  )
}
