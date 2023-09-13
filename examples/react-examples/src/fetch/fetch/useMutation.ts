import type { Draft } from 'immer'
import { castDraft } from 'immer'
import { useImmerReducer } from 'use-immer'

import type { MutationMethod, ResponseError } from './utils'
import { mutation } from './utils'

export type MutationState<T> = Readonly<{
  isMutating: boolean
  data: T | undefined
  error: ResponseError | undefined
}>

export type MutationAction<T> =
  | { type: 'mutating' }
  | { type: 'success'; data: T }
  | { type: 'failure'; error: ResponseError }

export function fetchReducer<T>(
  state: Draft<MutationState<T>>,
  action: MutationAction<T>,
): void {
  switch (action.type) {
    case 'mutating':
      state.isMutating = true
      break

    case 'success':
      state.isMutating = false
      state.data = castDraft(action.data)
      state.error = undefined
      break

    case 'failure':
      state.isMutating = true
      state.error = action.error
      state.data = undefined
  }
}

export function useMutation<T>(method: MutationMethod) {
  const [state, dispatch] = useImmerReducer<
    MutationState<T>,
    MutationAction<T>
  >(fetchReducer, { isMutating: false } as MutationState<T>)

  const mutate = async (url: string, body: unknown) => {
    dispatch({ type: 'mutating' })

    await mutation({ body, method, url })
      .then(data => {
        dispatch({ type: 'success', data })
      })
      .catch(error => {
        dispatch({ type: 'failure', error })
      })
  }

  return [mutate, state] as const
}
