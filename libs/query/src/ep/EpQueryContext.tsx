// import { useEvent } from '@srtp/react'
// import type { QueryKey } from '@tanstack/react-query'
// import React from 'react'

// type EpQueryContextType = Readonly<{
//   baseUrl: string
//   setKey: (key: string, invalidateKey: QueryKey) => void
//   invalidateKeys: Record<string, QueryKey>
// }>

// export const EpQueryContext = React.createContext<
//   EpQueryContextType | undefined
// >(undefined)

// export type EpQueryProviderProps = Readonly<{
//   baseUrl: string
//   children: React.ReactNode
// }>

// export function useInvalidateKeys(key: string) {
//   const context = React.useContext(EpQueryContext)

//   return context?.invalidateKeys[key]
// }

// export const EpQueryProvider = ({
//   baseUrl,
//   children,
// }: EpQueryProviderProps) => {
//   const invalidateKeysRef = React.useRef<Record<string, QueryKey>>({})

//   const setInvalidateKey = useEvent((key: string, invalidateKey: QueryKey) => {
//     invalidateKeysRef.current[key] = invalidateKey
//   })

//   const value = React.useMemo(
//     () => ({
//       baseUrl,
//       invalidateKeys: invalidateKeysRef.current,
//     }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [],
//   )

//   return (
//     <EpQueryContext.Provider value={value}>{children}</EpQueryContext.Provider>
//   )
// }
