import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { createQueryClient } from './queryClient'

type Children = Readonly<{ children: React.ReactNode }>

const queryClient = createQueryClient({
  onError: error => {
    console.error(error)
  },
})

export const QueryProvider = ({ children }: Children) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
