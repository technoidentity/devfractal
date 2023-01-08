import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'

export const TodoForm = () => (
  <Flex alignItems="center" justifyContent="center" mt="20px">
    <Box
      w="600px"
      boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);"
      p="30px"
    >
      <form>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input />
        </FormControl>
        <FormControl mt="5px">
          <Checkbox size="md" colorScheme="green">
            Done
          </Checkbox>
        </FormControl>
        <Button colorScheme="blue" type="submit" mt="10px">
          Submit
        </Button>
      </form>
    </Box>
  </Flex>
)
