import { Code, Text, createQueryClient, createQueryFn } from 'devfractal'
import { Loader2 } from 'lucide-react'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const queryClient: ReturnType<typeof createQueryClient> =
  createQueryClient({
    isProd: import.meta.env.PROD,
    onError: error => {
      console.error(error)
    },
    queryFn: createQueryFn(baseUrl),
  })

export const ErrorFallback = ({ error }: { error: any }) => {
  return (
    <Text className="text-red-500 text-3xl">
      <Code>{JSON.stringify(error, null, 2)}</Code>
    </Text>
  )
}

export const Loading = <Loader2 className="mr-2 h-96 w-96 animate-spin" />
