import React from 'react'
import type { QuestionValue } from '../../common/types'
import { Box, Text } from '@chakra-ui/react'

interface Props {
  readonly score: Number
  readonly testResult: readonly QuestionValue[]
  readonly displayCodeSnippet: (data: string) => JSX.Element
}

const ResultsCard: React.FC<Props> = ({
  score,
  testResult,
  displayCodeSnippet,
}) => (
  <>
    <Box>
      <Text
        fontSize={['sm', 'md', 'xl', '2xl']}
        fontWeight="bold"
        letterSpacing="-2%"
      >
        Test finished
      </Text>
      <Box
        fontWeight="extrabold"
        fontSize={['sm', 'md', 'xl', '3xl']}
        letterSpacing="wide"
        bgGradient="linear(to-l, cyan.700,teal.700)"
        bgClip="text"
      >
        You scored {score} out of {testResult.length}
      </Box>
      <Text
        fontSize={['sm', 'md', 'xl', '2xl']}
        fontWeight="bold"
        letterSpacing="-2%"
        color="blue.900"
      >
        Take a look at the test result
      </Text>
      <Box mt="5">
        {testResult.map((res, index) => (
          <Box key={index}>
            <Box
              fontWeight="bold"
              fontSize="xl"
              letterSpacing="wide"
              color="red.800"
            >
              {/* Display code snippet on the result card */}
              {index + 1} .
              {(res.question as string).split('"')[1]
                ? displayCodeSnippet(res.question as string)
                : res.question}
            </Box>

            <>
              <Box
                my="4"
                fontWeight="semibold"
                fontSize="md"
                letterSpacing="wide"
              >
                Selected answer : {res.answer}
              </Box>
              <Box
                my="4"
                fontWeight="semibold"
                fontSize="md"
                letterSpacing="wide"
              >
                Correct Answer : {res.correctAnswer}
              </Box>
            </>
          </Box>
        ))}
      </Box>
    </Box>
  </>
)

export default ResultsCard
