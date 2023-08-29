import { toError } from '@srtp/core'
import { useErrorBoundary } from 'react-error-boundary'

import { useEvent } from './useEvent'

export function useShowBoundary() {
  const { showBoundary } = useErrorBoundary()

  return useEvent((error: unknown) => {
    showBoundary(toError(error))
  })
}
