import React from 'react'

export const useEvent = <F extends (...args: any[]) => any>(fn: F) => {
  const ref = React.useRef(fn)

  React.useLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return React.useCallback(
    (...args: Parameters<F>): ReturnType<F> => ref.current(...args),
    [],
  )
}
