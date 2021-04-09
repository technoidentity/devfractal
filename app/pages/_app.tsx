import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import React from 'react'
import { Auth } from '@supabase/ui'
import { supabase } from '../common/initSupabase'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth.UserContextProvider>
  )
}

export default MyApp
