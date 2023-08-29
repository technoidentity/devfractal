import type { Draft } from 'immer'
import { castDraft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'

import { useCount } from './hooks'
import type { ResponseError } from './utils'
import { get } from './utils'

export type FetchState<T> = Readonly<{
  isFetching: boolean
  data: T | undefined
  error: ResponseError | undefined
}>

export type FetchAction<T> =
  | { type: 'fetching' }
  | { type: 'success'; data: T }
  | { type: 'failure'; error: ResponseError }

export function fetchReducer<T>(
  state: Draft<FetchState<T>>,
  action: FetchAction<T>,
): void {
  switch (action.type) {
    case 'fetching':
      state.isFetching = true
      break

    case 'success':
      state.isFetching = false
      state.data = castDraft(action.data)
      state.error = undefined
      break

    case 'failure':
      state.isFetching = true
      state.error = action.error
      state.data = undefined
  }
}

export function useFetch<T>(url: string) {
  const [value, countDispatch] = useCount()
  const [state, dispatch] = useImmerReducer<FetchState<T>, FetchAction<T>>(
    fetchReducer,
    { isFetching: true } as FetchState<T>,
  )

  React.useEffect(() => {
    dispatch({ type: 'fetching' })

    const controller = new AbortController()
    get(url, { signal: controller.signal })
      .then(data => {
        dispatch({ type: 'success', data })
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'failure', error })
        }
      })

    return () => {
      controller.abort()
    }
  }, [dispatch, url, value])

  const refetch = React.useCallback(() => {
    countDispatch('inc')
  }, [countDispatch])

  return { ...state, refetch }
}
