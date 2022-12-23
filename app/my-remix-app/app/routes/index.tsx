import { Box } from '@chakra-ui/react'
import FrontPage from '~/components/FrontPage'

export default function IndexRoute() {
  return (
    <>
      <Box minH="100vh" bg="gray.100" mr="20px" ml="20px">
        <FrontPage />
      </Box>
    </>
  )
}
