import React from 'react'
import { useShowBoundary } from './useShowBoundary'

export const useEvent = <F extends (...args: any[]) => any>(fn: F): F => {
  const ref = React.useRef(fn)
  const showBoundary = useShowBoundary()

  React.useLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return React.useCallback(
    (...args: any) => {
      try {
        return ref.current(...args)
      } catch (error) {
        showBoundary(error)
        throw error // Needed?
      }
    },
    [showBoundary],
  ) as any
}

export const useDeferredEvent = <F extends (...args: any[]) => any>(fn: F) => {
  const [isPending, startTransition] = React.useTransition()

  const deferredFn = useEvent((...args: Parameters<F>) => {
    startTransition(() => {
      // @TODO: need to showBoundary?
      fn(...args)
    })
  })

  return [isPending, deferredFn] as const
}

export function useAsyncEvent<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  onError?: (err: unknown) => void,
): F {
  // @TODO: shoudn't return back promise?
  const showBoundary = useShowBoundary()

  return useEvent((...args: Parameters<F>) =>
    fn(...args).catch(error => {
      onError?.(error)
      showBoundary(error)
    }),
  ) as any
}
