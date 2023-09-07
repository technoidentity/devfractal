import { configContext } from '@srtp/react'

export type BaseUrlContext = Readonly<{
  baseUrl: string
}>

export const [BaseUrlProvider, useBaseUrl] = configContext<BaseUrlContext>({
  errorMessage: 'BaseUrlProvider should be used',
})
