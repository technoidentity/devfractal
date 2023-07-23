import { delay } from '@srtp/core'
import { state$, useState$ } from '@srtp/local-state'
import { axios } from '@srtp/web'
import React from 'react'

type FetchState = Readonly<{
  data?: unknown
  error?: unknown
  isLoading: boolean
}>

const initial: FetchState = {
  data: undefined,
  error: undefined,
  isLoading: true,
}

const fetchSlice = state$(initial, {
  success(draft, data: unknown) {
    draft.data = data
    draft.error = undefined
    draft.isLoading = false
  },
  error(draft, error: unknown) {
    draft.error = error
    draft.isLoading = false
  },
})

export function useFetch(url: string): FetchState {
  const [state, actions] = useState$(fetchSlice)

  React.useEffect(() => {
    let cancelled = false

    delay(5000)
      .then(async () => axios({ method: 'get', url }))
      .then(([data]) => {
        if (!cancelled) {
          actions.success(data)
        }
      })
      .catch(err => {
        if (!cancelled) {
          actions.error(err)
        }
      })

    return () => {
      cancelled = true
    }
  }, [url, actions])

  return state
}
