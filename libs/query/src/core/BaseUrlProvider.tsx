import { configContext } from '@srtp/react'

export type BaseUrlContext = Readonly<{ baseUrl?: string }>

export const { Provider: BaseUrlProvider, useContext: useBaseUrl } =
  configContext<BaseUrlContext>({
    initialValue: {},
    errorMessage: 'useBaseUrl must be used within a BaseUrlProvider',
  })
