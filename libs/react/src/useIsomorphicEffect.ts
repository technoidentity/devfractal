import React from 'react'

export const useIsomorphicEffect =
  typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect
