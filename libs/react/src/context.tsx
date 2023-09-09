/* eslint-disable @typescript-eslint/naming-convention */
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

type ConfigContextProviderProps<T> = Readonly<{
  value?: T
  children?: React.ReactNode
}>

export function configContext<T>({
  initialValue,
  errorMessage,
}: ContextOptions<T>): Readonly<{
  useContext: () => T
  Provider: (props: ConfigContextProviderProps<T>) => JSX.Element
}> {
  const Context = React.createContext<T | undefined>(initialValue)
  const useSafe = () => useSafeContext(Context, errorMessage)

  const Provider = (props: { value?: T; children?: React.ReactNode }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => props.value, [])

    invariant(
      initialValue ?? value,
      'You need to pass `value` to the context provider',
    )

    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }

  return { Provider, useContext: useSafe }
}
