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
import { PrimitiveAtom } from 'jotai'
import { FormEvent } from 'react'
import { computed, signal, signals, useAction, useValue } from '@srtp/jotai'

type Todo = Readonly<{ title: string; completed: boolean }>

const filterAtom = signal('all')
const todosAtom = signals<Todo>()

const filteredAtom = computed(get => {
  const filter = get(filterAtom)
  const todos = get(todosAtom)
  if (filter === 'all') {
    return todos
  }
  if (filter === 'completed') {
    return todos.filter(atom => get(atom).completed)
  }
  return todos.filter(atom => !get(atom).completed)
})

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
type TodoItemProps = {
  atom: PrimitiveAtom<Todo>
  remove: RemoveFn
}

const TodoItem = ({ atom, remove }: TodoItemProps) => {
  const item = useValue(atom)
  const setItem = useAction(atom)

  const toggleCompleted = () =>
    setItem(props => ({ ...props, completed: !props.completed }))

  return (
    <HStack>
      <Checkbox checked={item.completed} onChange={toggleCompleted}>
        <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
          {item.title}
        </span>
      </Checkbox>
      <CloseButton onClick={() => remove(atom)} />
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
      <TodoItem atom={atom} {...props} />
    </a.div>
  ))
}

const TodoList = () => {
  const setTodos = useAction(todosAtom)

  const remove: RemoveFn = todo =>
    setTodos(prev => prev.filter(item => item !== todo))

  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = e.currentTarget.inputTitle.value
    e.currentTarget.inputTitle.value = ''
    setTodos(prev => [...prev, signal<Todo>({ title, completed: false })])
  }

  return (
    <>
      <form onSubmit={add}>
        <Filter />
        <Input name="inputTitle" placeholder="Type ..." />
        <Filtered remove={remove} />
      </form>
    </>
  )
}

export function JotaiTodoApp() {
  return (
    <VStack>
      <Heading as="h1">Jōtai</Heading>
      <TodoList />
    </VStack>
  )
}
