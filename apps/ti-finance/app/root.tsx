import { createEmotionCache, MantineProvider } from '@mantine/core'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import type { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import { ModalsProvider } from '@mantine/modals'
import { StylesPlaceholder } from '@mantine/remix'
import { theme } from '../theme'
import { getUser } from './session.server'

export function meta() {
  return {
    charset: 'utf-8',
    title: 'TI Finance',
    viewport: 'width=device-width,initial-scale=1',
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    user: await getUser(request),
  })
}

createEmotionCache({ key: 'mantine' })

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ModalsProvider>
        <html lang="en">
          <head>
            <StylesPlaceholder />
            <Meta />
            <Links />
          </head>
          <body style={{ minHeight: '100vh' }}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </ModalsProvider>
    </MantineProvider>
  )
}
