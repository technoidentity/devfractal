import React from 'react'
import { useErrorBoundary } from 'react-error-boundary'

export const useEvent = <F extends (...args: any[]) => any>(fn: F) => {
  const ref = React.useRef(fn)
  const { showBoundary } = useErrorBoundary()

  React.useLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return React.useCallback(
    (...args: Parameters<F>): ReturnType<F> => {
      try {
        return ref.current(...args)
      } catch (error) {
        showBoundary(error)
        throw error // Needed?
      }
    },
    [showBoundary],
  )
}

export const useDeferredEvent = <F extends (...args: any[]) => any>(fn: F) => {
  const [isPending, startTransition] = React.useTransition()

  const deferredFn = useEvent((...args: Parameters<F>) => {
    return startTransition(() => {
      fn(...args)
    })
  })

  return [isPending, deferredFn] as const
}

export function useAsyncEvent<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  onError?: (err: unknown) => void,
) {
  const { showBoundary } = useErrorBoundary()

  return useEvent((...args: Parameters<F>) =>
    fn(...args).catch(error => {
      onError?.(error)
      showBoundary(error)
    }),
  )
}
