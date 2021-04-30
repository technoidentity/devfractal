import {
  Box,
  Button,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import React, { useState } from 'react'

export interface Question {
  readonly question: string
  readonly option1: string
  readonly option2: string
  readonly option3: string
  readonly option4: string
  readonly answer: string
}
const initialValue = {
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  answer: '',
}
export const CreateQuiz: React.FC = () => {
  const [questionsList, setQuestionsList] = useState<Question>(initialValue)

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target

    setQuestionsList({
      ...questionsList,
      [name]: value,
    })
  }

  //  Reset the values
  const reset = () => {
    setQuestionsList(initialValue)
  }

  // data stored into db
  const handleSubmit = () => {
    // write code to store data into database

    // reset values after storing done
    setQuestionsList(initialValue)
  }

  return (
    <>
      <Box textAlign="center">
        <Heading>Create Quiz</Heading>
      </Box>
      <Box
        textAlign="center"
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
        my={['20px', '30px', '40px']}
        p="40px"
        maxW="100%"
        maxH="100%"
        color="teal"
        borderWidth="1px"
        borderRadius="xl"
        borderColor="Black"
        boxShadow="dark-lg"
      >
        <form onSubmit={handleSubmit} method="POST">
          <FormControl isRequired>
            <FormLabel>Question</FormLabel>
            <Textarea
              value={questionsList.question}
              name="question"
              onChange={handleInputChange}
              placeholder="Question Here...."
              size="sm"
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Option1</FormLabel>
            <Input
              type="text"
              variant="filled"
              placeholder="Option1"
              value={questionsList.option1}
              name="option1"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Option2</FormLabel>
            <Input
              type="text"
              variant="filled"
              placeholder="Option2"
              value={questionsList.option2}
              name="option2"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Option3</FormLabel>
            <Input
              type="text"
              variant="filled"
              placeholder="Option3"
              value={questionsList.option3}
              name="option3"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Option4</FormLabel>
            <Input
              type="text"
              variant="filled"
              placeholder="Option4"
              value={questionsList.option4}
              name="option4"
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired mt={6}>
            <FormLabel>Answer</FormLabel>
            <NumberInput size="md" min={1} max={4}>
              <NumberInputField
                placeholder="Option number like (i.e... 1/2/3/4)"
                value={questionsList.answer}
                name="answer"
                onChange={handleInputChange}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  bg="green.200"
                  _active={{ bg: 'green.300' }}
                  children="+"
                />
                <NumberDecrementStepper
                  bg="red.200"
                  _active={{ bg: 'red.300' }}
                  children="-"
                />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
            size="lg"
            mt={10}
            mx={10}
            _hover={{
              bgGradient: 'linear(to-r, green.500, green.700)',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: 'dark-lg',
            }}
          >
            Create
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
            size="lg"
            mt={10}
            mx={10}
            _hover={{
              bgGradient: 'linear(to-r, red.500, red.700)',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: 'dark-lg',
            }}
            onClick={reset}
          >
            Reset
          </Button>
        </form>
      </Box>
    </>
  )
}
