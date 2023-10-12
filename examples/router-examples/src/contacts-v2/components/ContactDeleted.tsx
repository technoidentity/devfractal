import { Text, VStack } from '@srtp/ui'
import { Link } from 'react-router-dom'

import { rootLink } from '../paths'

export function ContactDeleted() {
  return (
    <VStack className="gap-y-8 justify-center px-8">
      <Text className="rounded-2xl border bg-red-400 text-white p-4 text-xl">
        Contact deleted!
      </Text>
      <Link
        to={rootLink}
        className="rounded-full border bg-gray-100 text-black hover:text-white hover:bg-blue-500 px-4 py-2 w-2/5 mx-auto"
      >
        Home
      </Link>
    </VStack>
  )
}
