import { configContext } from '@srtp/react'
import { type axios } from '@srtp/web'

export type AxiosContext = Readonly<{
  axios: typeof axios
}>

export const { Provider: AxiosProvider, useContext: useAxios } =
  configContext<AxiosContext>({
    errorMessage: 'AxiosProvider should be used',
  })
