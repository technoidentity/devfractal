import {
  Button,
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { a, useSpring } from '@react-spring/web'
import Parser from 'html-react-parser'
import { Suspense } from 'react'
import { computed, useAction, useValue } from '@srtp/global-state'
import { atom } from 'jotai'

type PostData = Readonly<{
  by: string
  descendants?: number
  id: number
  kids?: number[]
  parent: number
  score?: number
  text?: string
  time: number
  title?: string
  type: 'comment' | 'story'
  url?: string
}>

const postId = atom(9001)
const postData = computed(async get => {
  const id = get(postId)
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  )
  const data: PostData = await response.json()
  return data
})

function Id() {
  const id = useValue(postId)
  const props = useSpring({ from: { id }, id, reset: true })
  return <a.h1>{props.id.to(Math.round)}</a.h1>
}

function Next() {
  const setPostId = useAction(postId)

  return (
    <Center>
      <Button colorScheme="blue" onClick={() => setPostId(id => id + 1)}>
        →
      </Button>
    </Center>
  )
}

function PostTitle() {
  const { by, text, time, title, url } = useValue(postData)

  return (
    <VStack>
      <Heading as="h2" size="xl">
        {by}
      </Heading>
      <Heading as="h6" size="xs">
        {new Date(time * 1000).toLocaleDateString('en-US')}
      </Heading>
      {title && (
        <Heading as="h4" size="md">
          {title}
        </Heading>
      )}
      {url && (
        <Link color="teal.400" href={url}>
          {url}
        </Link>
      )}
      {text && <Text>{Parser(text)}</Text>}
    </VStack>
  )
}

export function HackerNewsApp() {
  return (
    <Container>
      <Id />
      <div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostTitle />
        </Suspense>
      </div>
      <Next />
    </Container>
  )
}
