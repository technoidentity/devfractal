import { createEmotionCache, MantineProvider } from '@mantine/core'
import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { ModalsProvider } from '@mantine/modals'
import { StylesPlaceholder } from '@mantine/remix'
import { theme } from '../theme'
import { getUser } from './session.server'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'TI Finance',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  })
}

createEmotionCache({ key: 'mantine' })

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ModalsProvider>
        <html lang="en" className="h-full">
          <head>
            <StylesPlaceholder />
            <Meta />
            <Links />
          </head>
          <body className="h-full">
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
