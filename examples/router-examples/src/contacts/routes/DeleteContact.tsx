import { Text, VStack } from '@srtp/ui'
import { Link } from 'react-router-dom'

export function DeleteContact(): JSX.Element {
  return (
    <VStack className="gap-y-8 justify-center px-8">
      <Text className="rounded-2xl border bg-gray-100 p-4 text-xl">
        Contact deleted!
      </Text>
      <Link
        to="/"
        className="rounded-full border bg-blue-500 px-4 py-2 text-lg text-white w-2/5 mx-auto"
      >
        Home
      </Link>
    </VStack>
  )
}
