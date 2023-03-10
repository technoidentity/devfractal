import { useOutletContext } from '@remix-run/react'

export const action = () => {}

export default function Index() {
  const { supabase, session } = useOutletContext<any>()

  const handleLogin = async () => {
    const data = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
      },
    })
    console.log(data)
  }
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    }
    console.log({ error })
  }
  console.log(supabase.auth.session)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={handleLogin}> Login</button>
        </>
      )}
    </div>
  )
}

// 7UCBBW5LRqli488e
