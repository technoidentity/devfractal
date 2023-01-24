import { Button, Center, Container, Flex, Image, Title } from '@mantine/core'
import { Sculpture } from '../../../utils/types'

interface CarouselProps {
  sculpture: Sculpture
  showDetails: boolean
  onNextClick(): void
  onShowDetails(): void
}

export const CarouselView = ({
  sculpture,
  showDetails,
  onNextClick,
  onShowDetails,
}: CarouselProps) => {
  return (
    <Center>
      <Flex direction="column" w="300px" mt="30px">
        <Button onClick={onNextClick}>Next</Button>
        <Title order={3} size="md" mt="10px" mb="10px">
          {sculpture.name}
        </Title>
        <Flex direction="column">
          <Button mb="10px" onClick={onShowDetails}>
            {showDetails ? 'Hide details' : 'Show details'}
          </Button>
          {showDetails ? (
            <Container>
              <p>{sculpture.description}</p>
              <Image src={sculpture.url} alt={sculpture.alt} />
            </Container>
          ) : (
            <img src={sculpture.url} alt={sculpture.alt} />
          )}
        </Flex>
      </Flex>
    </Center>
  )
}
