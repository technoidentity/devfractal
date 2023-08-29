import { Box, Spinner } from '@chakra-ui/react'
import { Text, VStack } from '@chakra-ui/react'

export const FullPageLoading = () => (
  <VStack>
    <Spinner
      boxSize="md"
      speed="1s"
      thickness="4px"
      emptyColor="gray.200"
      color="gray.500"
      mb={4}
    />
    <Text fontSize="lg" fontWeight="medium" color="gray.700">
      Loading...
    </Text>
  </VStack>
)

export const Loading = () => {
  return <Spinner size="xl" />
}

export const Fetching = () => {
  return <Spinner size="sm" />
}

export const ErrorMessage = ({ error }: { error: Error }) => {
  return (
    <Box fontFamily="mono" fontSize="3xl" fontWeight="semibold" color="red.500">
      {error.message}
    </Box>
  )
}
