// this is dummy question form. actual one to be taken from quiz branch

import React from 'react'

import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  VStack,
  StackDivider,
  Button,
  useToast,
} from '@chakra-ui/react'
import type { Question, User } from '../../common/types'
import { Auth } from '@supabase/ui'

interface QuestionsFormProps {
  readonly questions: readonly Question[]
}

const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions }) => {
  const user = Auth.useUser()
  const id = user?.user?.id
  const email = user?.user?.email ?? ''

  // dummy score
  const score = 3

  const data: User = { id, email, score }

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    const toast = useToast()
    const res = await fetch('/api/pre-interview/postUserAnswers', {
      body: JSON.stringify(data),
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (!error) {
      toast({
        title: 'Your answers are submitted',
        description: 'Thank you',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed to save the answers',
        description: 'Try again',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex alignItems="left" justifyContent="center" m="20">
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box textAlign="left">
          <Heading>Questions</Heading>
        </Box>
        <Stack margin={10}>
          {questions.map(question => (
            <Box
              key={question.id}
              color="#4c473f"
              bg="#ffefd5"
              borderRadius="10px"
              p={7}
              shadow="md"
              borderWidth="1px"
              _hover={{ bg: '#e5d7bf' }}
            >
              <Text>{question.text}</Text>
            </Box>
          ))}
        </Stack>
        <Button
          type="submit"
          bg="lightgreen"
          variantcolor="teal.300"
          variant="outline"
          width="full"
          mt={4}
          onClick={async event => handleSubmit(event)}
        >
          Submit Answers
        </Button>
      </VStack>
    </Flex>
  )
}
export default QuestionsForm
