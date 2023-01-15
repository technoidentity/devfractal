import {
  Center,
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
  Spinner,
} from '@chakra-ui/react'
import { queryFn } from '@core/api'
import { useAuth } from '@ui/core/useAuth'
import { Layout } from '@ui/Layout'
import { TestUserProvider } from '@ui/test'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
// Page Loading Indicator
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../../styles/globals.css'

// Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn,
      retry: 0,
      // staleTime: 5000,
      // useErrorBoundary: true
    },
  },
})

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: '#FFFFFF',
          _checked: {
            bg: '#605BFF',
          },
        },
      },
    },
  },
})

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../mocks')
}

const Auth = ({ children }: { children: React.ReactNode }) => {
  const [session] = useAuth()

  if (session?.user) {
    return <>{children}</>
  }

  return (
    <Center>
      <Spinner size="xl" />
    </Center>
  )
}

const isPublicComponent = (Component: NextComponentType<any, any, any>) =>
  'isPublic' in Component && Component.isPublic

function MyApp({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout || (page => page)

  return (
    <TestUserProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: false,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Layout>
              {isPublicComponent(Component) ? (
                <>
                  <Component {...pageProps} />
                </>
              ) : (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              )}
            </Layout>
          </QueryClientProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </TestUserProvider>
  )
}

export default MyApp
