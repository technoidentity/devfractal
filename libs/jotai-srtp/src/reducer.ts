import { SliceActions, sliceReducer } from '@srtp/reducer'
import produce, { Draft } from 'immer'
import { useSetAtom } from 'jotai'
import { atomWithReducer } from 'jotai/utils'

export function signalWithReducer<State, Action>(
  initial: State,
  reducer: (state: Draft<State>, action: Action) => void,
) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const r = produce(reducer) as (state: State, action: Action) => State
  return atomWithReducer(initial, r)
}

export function signalSlice<State, S extends SliceActions<State>>(
  initial: State,
  slices: S,
) {
  return signalWithReducer(initial, sliceReducer<State>()(slices))
}

export const useDispatch = useSetAtom
