// context.tsx
import { createContext } from 'react'

export type ServerStyleContextData = Readonly<{
  key: string
  ids: readonly string[]
  css: string
}>

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | undefined
>(undefined)

export type ClientStyleContextData = Readonly<{
  reset(): void
}>

export const ClientStyleContext = createContext<ClientStyleContextData | undefined>(
  undefined,
)
