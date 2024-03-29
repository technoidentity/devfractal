import {
  Checkbox,
  CloseButton,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react'
import { a, useTransition } from '@react-spring/web'
import { atoms, computed, useAction, useValue } from '@srtp/react'
import type { PrimitiveAtom } from 'jotai'
import { atom } from 'jotai'
import type { FormEvent } from 'react'

type Todo = Readonly<{ title: string; completed: boolean }>

const filterAtom = atom('all')
const todosAtom = atoms<Todo>()

const filteredAtom = computed(get => {
  const filter = get(filterAtom)
  const todos = get(todosAtom)

  return filter === 'all'
    ? todos
    : filter === 'completed'
    ? todos.filter(atom => get(atom).completed)
    : todos.filter(atom => !get(atom).completed)
})

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
type TodoItemProps = {
  signal: PrimitiveAtom<Todo>
  remove: RemoveFn
}

const TodoItem = ({ signal, remove }: TodoItemProps) => {
  const item = useValue(signal)
  const setItem = useAction(signal)

  const toggleCompleted = () =>
    setItem(props => ({ ...props, completed: !props.completed }))

  return (
    <HStack>
      <Checkbox checked={item.completed} onChange={toggleCompleted}>
        <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
          {item.title}
        </span>
      </Checkbox>
      <CloseButton onClick={() => remove(signal)} />
    </HStack>
  )
}

const Filter = () => {
  const filter = useValue(filterAtom)
  const set = useAction(filterAtom)
  return (
    <RadioGroup onChange={set} value={filter}>
      <Radio value="all"> All </Radio>
      <Radio value="completed"> Completed </Radio>
      <Radio value="incompleted"> Incompleted </Radio>
    </RadioGroup>
  )
}

type FilteredType = {
  remove: RemoveFn
}

const Filtered = (props: FilteredType) => {
  const todos = useValue(filteredAtom)

  const transitions = useTransition(todos, {
    keys: todo => todo.toString(),
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  })

  return transitions((style, atom) => (
    <a.div className="item" style={style}>
      <TodoItem signal={atom} {...props} />
    </a.div>
  ))
}

const TodoList = () => {
  const setTodos = useAction(todosAtom)

  const remove: RemoveFn = todo =>
    setTodos(prev => prev.filter(item => item !== todo))

  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const title = e.currentTarget['inputTitle'].value
    e.currentTarget['inputTitle'].value = ''

    setTodos(prev => [...prev, atom<Todo>({ title, completed: false })])
  }

  return (
    <form onSubmit={add}>
      <Filter />
      <Input name="inputTitle" placeholder="Type ..." />
      <Filtered remove={remove} />
    </form>
  )
}

export const JotaiTodoApp = () => (
  <VStack>
    <Heading as="h1">Jōtai</Heading>
    <TodoList />
  </VStack>
)
