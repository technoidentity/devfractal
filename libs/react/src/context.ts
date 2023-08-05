import React from 'react'
import invariant from 'tiny-invariant'

export function useSafeContext<T>(
  context: React.Context<T | undefined>,
  errorMessage: string,
): T {
  const ctx = React.useContext(context)
  invariant(ctx, errorMessage)
  return ctx
}

export type ContextOptions<T> = Readonly<{
  initialValue?: T
  errorMessage: string
}>

export function context<T>({ initialValue, errorMessage }: ContextOptions<T>) {
  const Context = React.createContext<T | undefined>(initialValue)
  const useSafe = () => useSafeContext(Context, errorMessage)

  return [Context.Provider, useSafe] as const
}
