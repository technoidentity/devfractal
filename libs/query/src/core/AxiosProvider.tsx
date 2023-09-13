import { configContext } from '@srtp/react'
import { axios } from '@srtp/web'

export type AxiosContext = Readonly<{ axios: typeof axios }>

export const { Provider: AxiosProvider, useContext: useAxios } =
  configContext<AxiosContext>({
    initialValue: { axios },
    errorMessage: 'useAxios must be used within an AxiosProvider',
  })
