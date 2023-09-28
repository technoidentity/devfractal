import { QueryProvider } from '@srtp/query'
import { ErrorFallback, Loading, ThemeProvider } from '@srtp/ui'

import { QueryTaskApp } from './EpQueryTasks'

export const App = () => {
  return (
    <QueryProvider ErrorFallback={ErrorFallback} suspenseFallback={<Loading />}>
      <ThemeProvider>
        <QueryTaskApp />
      </ThemeProvider>
    </QueryProvider>
  )
}
