import { Box, Button, Spinner } from '@chakra-ui/react'
import type { Draft } from 'immer'
import { castDraft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'

type FetchState<T> = Readonly<{
  isFetching: boolean
  data?: T | undefined
  error?: Error | undefined
}>

type FetchAction<T> =
  | { type: 'setFetching' }
  | { type: 'setData'; data: T }
  | { type: 'setError'; error: Error }

export function fetchReducer<T>(
  state: Draft<FetchState<T>>,
  action: FetchAction<T>,
) {
  switch (action.type) {
    case 'setFetching':
      state.isFetching = true
      break

    case 'setData':
      state.isFetching = false
      state.data = castDraft(action.data)
      state.error = undefined
      break

    case 'setError':
      state.isFetching = true
      state.error = action.error
      state.data = undefined
  }
}

class FetchError extends Error {
  constructor(
    readonly statusText: string,
    readonly statusCode: Response['status'],
    readonly body?: any,
  ) {
    super(`Fetch Error.${statusText}`)
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const simpleFetch = async (url: string) => {
  await delay(1000 + 1000 * Math.random())

  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw new FetchError(response.statusText, response.status, json)
  }

  return json
}

export function useFetch<T>(url: string) {
  const [state, dispatch] = useImmerReducer<FetchState<T>, FetchAction<T>>(
    fetchReducer,
    {
      isFetching: true,
    } as FetchState<T>,
  )

  React.useEffect(() => {
    dispatch({ type: 'setFetching' })

    simpleFetch(url)
      .then(data => {
        dispatch({ type: 'setData', data })
      })
      .catch(error => {
        dispatch({ type: 'setError', error })
      })
  }, [dispatch, url])

  return state
}

const useToggle = (init = false) => {
  const [state, dispatch] = React.useReducer(state => !state, init)

  return [state, dispatch] as const
}

const useCount = (init = 1) => {
  const [count, dispatch] = React.useReducer((state: number) => state + 1, init)

  return [count, dispatch] as const
}

const todosUrl = 'https://jsonplaceholder.typicode.com/todos'

export function Fetch() {
  const [count, inc] = useCount()
  const url = `${todosUrl}/${count}`
  const { isFetching, data, error } = useFetch(url)

  return (
    <>
      {error ? (
        <Box>{error.message}</Box>
      ) : data ? (
        <>
          {isFetching ? <Spinner size="xs" /> : <Box />}
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Button isDisabled={isFetching} onClick={inc}>
            Refetch
          </Button>
        </>
      ) : (
        <Spinner size="xl" />
      )}
    </>
  )
}

export const App = () => {
  const [value, toggle] = useToggle(true)

  return (
    <Box>
      {value && <Fetch />}
      <Button onClick={toggle}>{value ? 'Hide' : 'Show'}</Button>
    </Box>
  )
}
