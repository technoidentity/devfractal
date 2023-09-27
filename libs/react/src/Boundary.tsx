import { Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

// Make ErrorFallback and suspenseFallback optional later
export type BoundaryProps = Readonly<{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ErrorFallback: React.ComponentType<FallbackProps>
  suspenseFallback: React.ReactNode
  children: React.ReactNode
}>

export const Boundary = (props: BoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={props.ErrorFallback}>
      <Suspense fallback={props.suspenseFallback}>{props.children}</Suspense>
    </ErrorBoundary>
  )
}
