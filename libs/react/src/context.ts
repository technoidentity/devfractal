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

export function context<T>({ errorMessage }: { errorMessage: string }) {
  const Context = React.createContext<T | undefined>(undefined)
  const useSafe = () => useSafeContext(Context, errorMessage)

  return [Context.Provider, useSafe] as const
}
