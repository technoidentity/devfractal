import { Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

export type ReactProviderProps = Readonly<{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ErrorFallback: React.ComponentType<FallbackProps>
  suspenseFallback: React.ReactNode
  children?: React.ReactNode
}>

export function ReactProvider(props: ReactProviderProps) {
  return (
    <ErrorBoundary FallbackComponent={props.ErrorFallback}>
      <Suspense fallback={props.suspenseFallback}>{props.children}</Suspense>
    </ErrorBoundary>
  )
}
