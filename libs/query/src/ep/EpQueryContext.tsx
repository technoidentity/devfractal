import { context } from '@srtp/react'

type EpQueryContextType = {
  baseUrl?: string
  invalidateKeys: Record<string, string>
}

export const [EpQueryProvider, useEpQueryContext] = context<EpQueryContextType>(
  { errorMessage: 'missing EpQueryProvider' },
)
