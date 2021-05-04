// this is dummy question form. actual one to be taken from quiz branch

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Auth } from '@supabase/ui'
import React from 'react'
import type { Question } from '../../common'
import { postUserAnswers } from '../../common'
export interface QuestionsFormProps {
  readonly questions: readonly Question[]
}

export const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions }) => {
  const user = Auth.useUser()
  const id = user?.user?.id
  const email = user?.user?.email ?? ''

  // dummy score
  const score = 3

  const toast = useToast()
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    const error = await postUserAnswers(id, email, score)
    if (!error) {
      toast({
        title: 'Your answers are submitted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed to save the answers',
        status: 'error',
        duration: 2000,
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
