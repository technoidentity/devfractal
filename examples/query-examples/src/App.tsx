import { QueryProvider } from '@srtp/query'
import { QueryTaskApp } from './EpQueryTasks'
import { ErrorFallback, Loading } from '@/CommonComponents'

export const App = () => {
  return (
    <QueryProvider ErrorFallback={ErrorFallback} suspenseFallback={Loading}>
      <QueryTaskApp />
    </QueryProvider>
  )
}
