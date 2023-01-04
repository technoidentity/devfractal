/* eslint-disable @typescript-eslint/naming-convention */
// import React from 'react'
// import { useImmerReducer } from 'use-immer'
// import { reducerProvider } from './provider'

export type ReducerObject<State> = Record<
  string,
  (state: State, payload: any) => State
>

type Payload<
  Reducers extends ReducerObject<any>,
  Action extends keyof Reducers,
> = Parameters<Reducers[Action]>[1]

export type ActionResult<
  Reducers extends ReducerObject<any>,
  Action extends keyof Reducers,
> = Payload<Reducers, Action> extends undefined
  ? {
      type: Action
      payload: Payload<Reducers, Action>
    }
  : {
      type: Action
    }

export type ActionsFrom<State, Reducers extends ReducerObject<State>> = {
  [Action in keyof Reducers]: ActionResult<Reducers, Action>
}[keyof Reducers]

type ActionsCreators<State, Reducers extends ReducerObject<State>> = {
  [Action in keyof Reducers]: Payload<Reducers, Action> extends undefined
    ? () => ActionResult<Reducers, Action>
    : (payload: Payload<Reducers, Action>) => ActionResult<Reducers, Action>
}

// type Actions<State, Reducers extends ReducerObject<State>> = {
//   [Action in keyof Reducers]: Payload<Reducers, Action> extends undefined
//     ? () => void
//     : (payload: Payload<Reducers, Action>) => void
// }

type Reducer<State, Reducers extends ReducerObject<State>> = (
  state: State,
  action: ActionsFrom<State, Reducers>,
) => void

export function reducer<State, Reducers extends ReducerObject<State>>(
  initialState: State,
  slices: Reducers,
) {
  const fn: Reducer<State, Reducers> = (state, action) => {
    return slices[action.type](
      state,
      'payload' in action ? action.payload : undefined,
    )
  }

  const actions: ActionsCreators<State, Reducers> = {} as any
  for (const type of Object.keys(slices)) {
    ;(actions as any)[type] = (payload: any) => ({ type, payload })
  }

  return [fn, actions, initialState] as const
}

// export function useSlice<State, Reducers extends ReducerObject<State>>(
//   args: readonly [
//     reducer: Reducer<State, Reducers>,
//     actionCreators: ActionsCreators<State, Reducers>,
//     initialState: State,
//   ],
// ) {
//   const [reducer, actionCreators, initialState] = args
//   const [state, dispatch] = useImmerReducer(reducer, initialState)

//   const actions: Actions<State, Reducers> = React.useMemo(() => {
//     const result = {} as any
//     for (const type of Object.keys(actionCreators)) {
//       result[type] = (...args: any[]) => {
//         dispatch((actionCreators[type] as any)(...args))
//       }
//     }
//     return result
//   }, [actionCreators, dispatch])

//   return [state, actions] as const
// }

// export function reducerHook<State, Reducers extends ReducerObject<State>>(
//   initialState: State,
//   slices: Reducers,
// ) {
//   return () => useSlice(React.useMemo(() => slice(initialState, slices), []))
// }

// export function providerHook<State, Reducers extends ReducerObject<State>>(
//   initialState: State,
//   slices: Reducers,
// ) {
//   const [fn, actions] = slice<State, Reducers>(initialState, slices)

//   const { useValue, ...rest } = reducerProvider(fn, castinitialState)

//   const useSlice = () => {
//     return [useValue(), actions] as const
//   }

//   return {
//     actions,
//     useSlice,
//     useValue,
//     ...rest,
//   }
// }
