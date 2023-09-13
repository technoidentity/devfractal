import { Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'

export type AddTodoProps = Readonly<{ onAdd(text: string): void }>

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = React.useState('')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value)
  }

  const submit = () => {
    if (text.trim().length === 0) {
      return
    }

    onAdd(text)
    setText('')
  }

  const keyUp = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      submit()
    }
  }

  return (
    <Flex gap="2">
      <Input
        value={text}
        onChange={handleChange}
        onKeyUp={keyUp}
        focusBorderColor="green"
      />

      <Button onClick={submit} colorScheme="green">
        Add
      </Button>
    </Flex>
  )
}
