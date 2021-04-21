/* eslint-disable functional/immutable-data */
import React, { useState, useEffect } from 'react'
import { questionsList } from './api/quiz/data'
import ResultsCard from './ResultsCard'
import { Text, Box, VStack, HStack } from '@chakra-ui/react'
import type { QuestionValue } from '../common/types'

import { CodeBlock, atomOneDark } from 'react-code-blocks'

const quiz: React.FC = () => {
  const [showScore, setShowScore] = useState<Boolean>(false)
  const [questionNum, setQuestionNum] = useState(0)
  const [score, setScore] = useState<number>(0)
  const [option, setOption] = useState<string>('')

  const [questionsDetails, setQuestionsDetails] = useState<
    readonly QuestionValue[]
  >([])

  const getOption: () => (
    e: React.MouseEvent<HTMLDivElement> & React.MouseEvent<HTMLButtonElement>,
  ) => void = () => e => {
    setOption(e.currentTarget.innerText)
  }

  const prevPageOptionChange: (question: string) => boolean = (
    question: string | undefined,
  ) => questionsDetails.some(el => el.question === question)

  const nextQuestion: () => () => void = () => () => {
    const nextQuestion = questionNum + 1
    const currentQuestion: string | undefined =
      questionsList.questions[questionNum]?.question

    const answer: string | undefined = questionsList.questions[questionNum]
      ?.answer as string

    if (prevPageOptionChange(currentQuestion as string) && option) {
      const tempState = [...questionsDetails]
      const tempElement = { ...tempState[questionNum] }
      tempElement.answer = option

      // const transformedPoint = { ...tempElement, answer: option }
      // const newObj = { ...tempState, tempElement: transformedPoint }
      tempState[questionNum] = tempElement
      setQuestionsDetails(tempState)
      setOption('')
      // console.log('new obj  :', transformedPoint)
    } else if (
      prevPageOptionChange(currentQuestion as string) &&
      (questionsDetails[questionNum]?.answer as string)
    ) {
      setQuestionsDetails([...questionsDetails])
    } else {
      setQuestionsDetails([
        ...questionsDetails,

        {
          question: questionsList.questions[questionNum]?.question,
          answer: option,
          correctAnswer: questionsList.questions[questionNum]?.choices[
            answer as any
          ] as string,

          isCorrect: false,
        },
      ])
      setOption('')
    }

    if (nextQuestion < questionsList.questions.length) {
      setQuestionNum(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  // Previous Button function
  const prevQuestion: () => () => void = () => () => {
    const prevQuestion = questionNum - 1
    if (prevQuestion >= 0) {
      setQuestionNum(prevQuestion)
    }
  }

  const cA = (answer: String | undefined) =>
    questionsDetails.some(el => el.correctAnswer === answer)

  const checkAnswer = () => {
    // eslint-disable-next-line functional/no-let
    let scoreNum = 0
    questionsDetails.forEach(q => {
      if (cA(q.answer)) {
        scoreNum = scoreNum + 1
        q.isCorrect = true
        setScore(scoreNum)
      }
    })
  }

  // if code snippet is existed
  function displayCodeSnippet(data: string): JSX.Element {
    const question = data
    const codeSnippet = question.split('"')[1]
    // index of the string before the double quote
    const index = question.indexOf('"')
    const plainString = question.substring(0, index - 1)

    const showLineNumbers: Boolean = true
    const wrapLines: Boolean = true
    const codeBlock: Boolean = true
    return (
      <>
        <Box>{plainString}</Box>
        <CodeBlock
          text={codeSnippet}
          language={'java'}
          theme={atomOneDark}
          {...{ showLineNumbers, wrapLines, codeBlock }}
        />
      </>
    )
  }

  useEffect(() => {
    checkAnswer()
  }, [showScore])

  return (
    <>
      <Box
        mx={[
          '50px',
          '100px',
          '150px',
          '200px',
          '250px',
          '300px',
          '350px',
          '400px',
          '450px',
        ]}
        my={['50px', '100px']}
        p="10px"
        maxW="100%"
        maxH="100%"
        color="teal"
        borderWidth="1px"
        borderRadius="xl"
        borderColor="Black"
        boxShadow="dark-lg"
      >
        {showScore ? (
          // Result Card
          <ResultsCard
            testResult={questionsDetails}
            score={score}
            displayCodeSnippet={displayCodeSnippet}
          />
        ) : (
          <Box>
            <VStack>
              <Text fontWeight="bold" fontSize="2xl" letterSpacing="wide">
                {questionNum + 1} /{questionsList.questions.length}
              </Text>
              <Box
                fontSize={['sm', 'md', 'xl', '2xl']}
                fontWeight="bold"
                letterSpacing="-2%"
              >
                {/* Display Question */}

                {questionsList.questions[questionNum]?.question.split('"')[1]
                  ? displayCodeSnippet(
                      questionsList.questions[questionNum]?.question as string,
                    )
                  : questionsList.questions[questionNum]?.question}
              </Box>
              {/* Display Answers Options */}
              {questionsList.questions[questionNum]?.choices.map(
                (answerOption, index) => (
                  <Box
                    key={index}
                    as="button"
                    bg="white"
                    borderRadius="md"
                    borderColor="green.100"
                    borderWidth="2px"
                    color="Black"
                    fontSize={['15px', 'sm', 'md']}
                    fontWeight="bold"
                    _hover={{
                      bgGradient: 'linear(to-r, green.200, teal.500)',
                      color: 'white',
                      boxShadow: 'dark-lg',
                    }}
                    py="10px"
                    maxH="100%"
                    w="450px"
                    maxW="100%"
                    px="4px"
                    onClick={getOption()}
                  >
                    {answerOption}
                  </Box>
                ),
              )}
              <HStack>
                <Box>
                  {/* Previous Button */}
                  <Box
                    as="button"
                    bgGradient="linear(to-r, green.200, teal.500)"
                    borderWidth="1px"
                    borderRadius="xl"
                    borderColor="Black"
                    color="black"
                    letterSpacing="wide"
                    fontWeight="semibold"
                    _hover={{
                      bgGradient: 'linear(to-r, green.200, teal.200)',
                      color: 'black',
                      fontWeight: 'bold',
                      boxShadow: 'dark-lg',
                    }}
                    mr={['2px', '6px', '10px']}
                    h="40px"
                    maxH="60px"
                    my="40px"
                    w={['50px', '100px', '150px', '200px', '250px']}
                    onClick={prevQuestion()}
                  >
                    Prev
                  </Box>
                  {/*  Next Button */}
                  <Box
                    as="button"
                    bgGradient="linear(to-r, green.200, teal.500)"
                    borderWidth="1px"
                    borderRadius="xl"
                    borderColor="Black"
                    color="black"
                    letterSpacing="wide"
                    fontWeight="semibold"
                    _hover={{
                      bgGradient: 'linear(to-r, green.200, teal.200)',
                      color: 'black',
                      fontWeight: 'bold',
                      boxShadow: 'dark-lg',
                    }}
                    mr={['2px', '6px', '10px']}
                    h="40px"
                    maxH="60px"
                    my="40px"
                    w={['50px', '100px', '150px', '200px', '250px']}
                    onClick={nextQuestion()}
                  >
                    {questionNum < questionsList.questions.length - 1
                      ? 'Next'
                      : 'Finish'}
                  </Box>
                </Box>
              </HStack>
            </VStack>
          </Box>
        )}
      </Box>
    </>
  )
}

export default quiz
