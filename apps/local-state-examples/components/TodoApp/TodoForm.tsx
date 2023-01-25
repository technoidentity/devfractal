import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { slice } from '@srtp/local-state'
import type { CreateTodo } from '@srtp/todo'
import React from 'react'

const initial: CreateTodo = { title: '', completed: false }

const useTodoForm = slice(initial, {
  update: (state, up: Partial<CreateTodo>) => ({ ...state, ...up }),
})

export const TodoForm = () => {
  const [todo, { update }] = useTodoForm()
  return (
    <Flex alignItems="center" justifyContent="center" mt="20px">
      <Box
        w="600px"
        boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);"
        p="30px"
      >
        <form
          onSubmit={evt => {
            evt.preventDefault()
            console.log({ todo })
          }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              name="title"
              value={todo.title}
              onChange={evt => update({ title: evt.target.value })}
            />
          </FormControl>
          <FormControl mt="5px">
            <Checkbox
              name="completed"
              checked={todo.completed}
              onChange={evt => update({ completed: evt.target.checked })}
              size="md"
              colorScheme="green"
            >
              Done
            </Checkbox>
          </FormControl>
          <Button colorScheme="blue" type="submit" mt="10px">
            Submit
          </Button>
        </form>
        <Box p="2">
          <pre>{JSON.stringify(todo, null, 2)}</pre>
        </Box>
      </Box>
    </Flex>
  )
}
