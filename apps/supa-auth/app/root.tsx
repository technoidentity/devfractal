import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from '@remix-run/react'
import { createBrowserClient } from '@supabase/auth-helpers-remix'
import React, { useState } from 'react'
import { createServerClient } from './utils/supabase.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  }

  const response = new Response()

  const supabase = createServerClient({ request, response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    },
  )
}

export default function App() {
  const { env, session } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()

  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!),
  )
  const serverAccessToken = session?.access_token

  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        // Remix recalls active loaders after actions complete
        fetcher.submit(null, {
          method: 'post',
          action: '/handle-supabase-auth',
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, fetcher])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase, session }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
