import { useErrorBoundary } from 'react-error-boundary'
import { useEvent } from './useEvent'
import { toError } from '@srtp/result'

export function useShowBoundary() {
  const { showBoundary } = useErrorBoundary()

  return useEvent((error: unknown) => {
    showBoundary(toError(error))
  })
}
