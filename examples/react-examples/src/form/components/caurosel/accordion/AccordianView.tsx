import { Box, Button, Center, Container, Text, Title } from '@mantine/core'

interface AccordianViewProps {
  showEty: boolean
  showAbout: boolean
  onAboutClick(): void
}

export const AccordionView = ({
  showAbout,
  showEty,
  onAboutClick,
}: AccordianViewProps) => {
  return (
    <>
      <Title order={3} size="md" mt="20px" mb="20px">
        <Center>Almaty, Kazakhstan</Center>
      </Title>
      <Container w="2xl">
        <Box p="4" bg="gray.100" mx="3xl">
          <Title order={4} size="sm">
            About
          </Title>
          {showAbout ? (
            <Text>
              a population of about 2 million, Almaty is Kazakhstan's largest
              city. From 1929 to 1997, it was its capital city.
            </Text>
          ) : (
            <Button color="blackAlpha" mt="10px" onClick={onAboutClick}>
              show
            </Button>
          )}
        </Box>
      </Container>
      <Container w="2xl" mt="40px">
        <Box p="4" bg="gray.100" mx="3xl">
          <Title order={4} size="sm">
            Etymology
          </Title>
          {showEty ? (
            <Text>
              The name comes from алма, the Kazakh word for "apple" and is often
              translated as "full of apples". In fact, the region surrounding
              Almaty is thought to be the ancestral home of the apple, and the
              wild Malus sieversii is considered a likely candidate for the
              ancestor of the modern domestic apple.
            </Text>
          ) : (
            <Button color="blackAlpha" mt="10px" onClick={onAboutClick}>
              show
            </Button>
          )}
        </Box>
      </Container>
    </>
  )
}
