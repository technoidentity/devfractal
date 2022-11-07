import { Container, Flex, Heading } from '@chakra-ui/react'

export default function IndexRoute() {
  return (
    <Container>
      <Flex
        h="80vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Heading>Interactive Learning Program</Heading>
        <p>Explore Courses</p>
      </Flex>
    </Container>
  )
}
