import { delay } from '@srtp/core'
import { slice, useSlice } from '@srtp/reducer'
import React from 'react'
import axios from 'redaxios'

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

const fetchSlice = slice(initial, {
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
  const [state, actions] = useSlice(fetchSlice)

  React.useEffect(() => {
    let cancelled = false

    delay(5000)
      .then(async () => axios.get(url))
      .then(res => {
        if (!cancelled) {
          actions.success(res.data)
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
