import { createQueryClient } from '@srtp/query'

export const queryClient = createQueryClient({
  isProd: import.meta.env.PROD,
  onError: error => {
    console.error(error)
  },
})
