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
} from '@chakra-ui/react'
import type { Question } from '../../common/types'

interface QuestionsFormProps {
  readonly questions: readonly Question[]
}

const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions }) => (
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
    </VStack>
  </Flex>
)

export default QuestionsForm
