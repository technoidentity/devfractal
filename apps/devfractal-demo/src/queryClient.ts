import { createQueryClient, createQueryFn } from 'devfractal'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const queryClient: ReturnType<typeof createQueryClient> =
  createQueryClient({
    isProd: import.meta.env.PROD,
    onError: error => {
      console.error(error)
    },
    queryFn: createQueryFn(baseUrl),
  })
