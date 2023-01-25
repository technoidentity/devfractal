import type { SpaceProps } from '@chakra-ui/react'
import {
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

interface IBlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

export const BlogTags: React.FC<IBlogTags> = props => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map(tag => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

interface BlogAuthorProps {
  date: Date
  name: string
}

export const BlogAuthor: React.FC<BlogAuthorProps> = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}

interface TranscriptProps {
  children: React.ReactNode
}

const Transcript = ({ children }: TranscriptProps) => {
  return (
    <Container maxW={'7xl'}>
      <Divider marginTop="5" />

      <VStack
        paddingTop="40px"
        paddingLeft="40px"
        paddingRight="40px"
        spacing="2"
        mb="60px"
        alignItems="flex-start"
      >
        <Heading as="h2">What we write about</Heading>

        <Text as="p" fontSize="lg">
          {children}
        </Text>

        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit. */}
        {/* <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text> */}
      </VStack>
    </Container>
  )
}

export default Transcript
