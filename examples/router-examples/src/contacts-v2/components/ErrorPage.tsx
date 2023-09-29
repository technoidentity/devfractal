import { Text, VStack } from '@srtp/ui'
import { useRouteError } from 'react-router-dom'

export function ErrorPage(): JSX.Element {
  const error = useRouteError()

  console.error(error)

  return (
    <VStack className="h-screen justify-center gap-y-8  text-center text-black">
      <Text className="text-xl italic">Oops!</Text>
      <Text className="text-xl font-semibold">
        Failed to load the requested data!
      </Text>
    </VStack>
  )
}
