import { AppProvider } from 'devfractal'
import { ErrorFallback, Loading, queryClient } from '@/config'

export const Provider = ({ children }: React.PropsWithChildren) => (
  <AppProvider
    ErrorFallback={ErrorFallback}
    suspenseFallback={Loading}
    queryClient={queryClient}
  >
    {children}
  </AppProvider>
)
