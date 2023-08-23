import { useErrorBoundary } from 'react-error-boundary'
import { useEvent } from './useEvent'
import { toError } from '@srtp/core'

export function useShowBoundary() {
  const { showBoundary } = useErrorBoundary()

  return useEvent((error: unknown) => {
    showBoundary(toError(error))
  })
}
