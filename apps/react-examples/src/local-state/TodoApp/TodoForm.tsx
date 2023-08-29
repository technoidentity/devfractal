import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { jstr } from '@srtp/core'
import { state } from '@srtp/react'
import type { CreateTodo } from '@srtp/todo'

const initial: CreateTodo = { title: '', completed: false }

const useTodoForm = state(initial, {
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
          <pre>{jstr(todo)}</pre>
        </Box>
      </Box>
    </Flex>
  )
}
